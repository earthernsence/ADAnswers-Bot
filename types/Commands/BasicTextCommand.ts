import { ChatInputCommandInteraction, MessageFlags, SlashCommandBuilder } from "discord.js";
import { Command } from "./Command";
import { isUserHelper } from "@/utils/utils_commands";

interface BasicTextCommandProps {
  data: SlashCommandBuilder,
  text: string,
}

export class BasicTextCommand extends Command {
  constructor({ data, text }: BasicTextCommandProps) {
    super({
      data,
      execute: (interaction: ChatInputCommandInteraction) => {
        if (!interaction) return;

        interaction.reply({
          content: text,
          flags: isUserHelper(interaction) ? undefined : MessageFlags.Ephemeral,
        });
      }
    });
  }
}