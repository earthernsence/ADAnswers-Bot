import { type ChatInputCommandInteraction, MessageFlags, type SlashCommandBuilder, type SlashCommandOptionsOnlyBuilder } from "discord.js";
import type { AnyEmbed } from "../Embeds/AnyEmbedType";
import { Command } from "./Command";
import { isUserHelper } from "@/utils/utils_commands";

interface BasicEmbedCommandProps {
  data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder,
  // eslint-disable-next-line no-unused-vars
  embed: (interaction: ChatInputCommandInteraction) => AnyEmbed,
}

export class BasicEmbedCommand extends Command {
  constructor({ data, embed }: BasicEmbedCommandProps) {
    super({
      data,
      execute: (interaction: ChatInputCommandInteraction) => {
        if (!interaction) return;

        const customEmbed = embed(interaction);

        const image = customEmbed.getAndSetThumbnail();

        interaction.reply({
          embeds: [customEmbed.create(true)],
          files: [image],
          flags: isUserHelper(interaction) ? undefined : MessageFlags.Ephemeral
        });
      }
    });
  }
}