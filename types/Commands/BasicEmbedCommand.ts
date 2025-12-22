import { type ChatInputCommandInteraction, MessageFlags, type SlashCommandBuilder, type SlashCommandOptionsOnlyBuilder, type SlashCommandSubcommandsOnlyBuilder, italic, userMention } from "discord.js";
import { Command } from "./Command";
import type { CustomEmbed } from "../Embeds/CustomEmbed";
import { isUserHelper } from "@/utils/utils_commands";

interface BasicEmbedCommandProps {
  data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder | SlashCommandSubcommandsOnlyBuilder,
  // eslint-disable-next-line no-unused-vars
  embed: (interaction: ChatInputCommandInteraction) => CustomEmbed,
}

export class BasicEmbedCommand extends Command {
  constructor({ data, embed }: BasicEmbedCommandProps) {
    super({
      data,
      execute: (interaction: ChatInputCommandInteraction) => {
        if (!interaction) return;

        // If the command has a target option, get it and add it to the message.
        const targetUser = interaction.options.getUser("target") ?? undefined;

        const customEmbed = embed(interaction);

        const image = customEmbed.getAndSetThumbnail();

        interaction.reply({
          content: targetUser ? `${italic(`Suggested for ${userMention(targetUser.id)}`)}` : undefined,
          embeds: [customEmbed.create(true)],
          files: [image],
          flags: isUserHelper(interaction) ? undefined : MessageFlags.Ephemeral
        });
      }
    });
  }
}