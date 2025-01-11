import { type ChatInputCommandInteraction, MessageFlags } from "discord.js";
import { type SlashCommandOptionsOnlyBuilder, italic, userMention } from "@discordjs/builders";
import type { AntimatterChallengeCustomEmbed } from "../Embeds/AntimatterChallengeCustomEmbed";
import { Command } from "./Command";
import type { InfinityChallengeCustomEmbed } from "../Embeds/InfinityChallengeCustomEmbed";
import { isUserHelper } from "@/utils/utils_commands";

interface ChallengeShorthandCommandProps {
  data: SlashCommandOptionsOnlyBuilder,
  // eslint-disable-next-line no-unused-vars
  embed: (interaction: ChatInputCommandInteraction) => AntimatterChallengeCustomEmbed | InfinityChallengeCustomEmbed,
}

export class ChallengeShorthandCommand extends Command {
  constructor({ data, embed }: ChallengeShorthandCommandProps) {
    super({
      data,
      execute: (interaction: ChatInputCommandInteraction) => {
        if (!interaction) return;

        const target = interaction.options.getUser("target");

        const customEmbed = embed(interaction);

        const image = customEmbed.getAndSetThumbnail();

        interaction.reply({
          content: target ? `${italic(`Suggested for ${userMention(target.id)}`)}` : undefined,
          embeds: [customEmbed.create(true)],
          files: [image],
          flags: isUserHelper(interaction) ? undefined : MessageFlags.Ephemeral
        });
      }
    });
  }
}