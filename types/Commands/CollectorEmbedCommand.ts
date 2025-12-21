
import { type ActionRowBuilder, ButtonBuilder, italic, userMention } from "@discordjs/builders";
import {
  type Awaitable,
  type ButtonInteraction,
  type ChatInputCommandInteraction,
  ComponentType,
  type InteractionReplyOptions,
  MessageComponentInteraction,
  MessageFlags,
  type SlashCommandBuilder,
  type SlashCommandOptionsOnlyBuilder
} from "discord.js";
import { Command } from "./Command";
import type { CustomEmbed } from "../Embeds/CustomEmbed";
import { isUserHelper } from "@/utils/utils_commands";

interface CollectorEmbedCommandProps {
  data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder,
  /* eslint-disable no-unused-vars */
  embed: (interaction: ChatInputCommandInteraction, expirationTimestamp: number) => CustomEmbed,
  components: (disabled: boolean, expirationTimestamp: number) => ActionRowBuilder<ButtonBuilder>,
  onCollect: (i: ButtonInteraction) => Awaitable<void>,
  onEnd: (interaction: ChatInputCommandInteraction) => Awaitable<void>
  /* eslint-enable no-unused-vars */
}

export class CollectorEmbedCommand extends Command {
  constructor({ data, embed, components, onCollect, onEnd }: CollectorEmbedCommandProps) {
    super({
      data,
      execute: async(interaction: ChatInputCommandInteraction) => {
        if (!interaction) return;

        // If the command has a target option, get it and add it to the message.
        const targetUser = interaction.options.getUser("target") ?? undefined;
        const expirationTimestamp = Math.floor((Date.now() + 60000) / 1000);
        const user = interaction.member === null ? interaction.user : interaction.member.user;

        if (!user) {
          this.error({
            interaction,
            text: `There was an issue running this command.`
          });

          return;
        }

        const customEmbed = embed(interaction, expirationTimestamp);
        const initialImage = customEmbed.getAndSetThumbnail();

        const initialContent: InteractionReplyOptions = {
          content: targetUser ? `${italic(`Suggested for ${userMention(targetUser.id)}`)}\n` : undefined,
          embeds: [customEmbed.create()],
          files: [initialImage],
          flags: isUserHelper(interaction) ? undefined : MessageFlags.Ephemeral,
          components: [components(false, expirationTimestamp)]
        };

        // These filters need fairly verbose conditions, in order to not have the interactions overlap when running multiple collectors.
        const filter = (i: MessageComponentInteraction) => i.customId.endsWith(String(expirationTimestamp));

        const sentReply = await interaction.reply(initialContent);

        const collector = sentReply.createMessageComponentCollector({ componentType: ComponentType.Button, filter, time: 60000 });

        collector.on("collect", onCollect);
        collector.on("end", onEnd);
      }
    });
  }
}