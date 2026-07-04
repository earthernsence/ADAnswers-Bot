import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command } from "./Command";

interface BasicTextCommandProps {
  data: SlashCommandBuilder;
  text: string;
}

export class BasicTextCommand extends Command {
  constructor({ data, text }: BasicTextCommandProps) {
    super({
      data,
      execute: (interaction: ChatInputCommandInteraction) => {
        if (!interaction) return;

        interaction.reply({
          content: text,
          flags: this.getFlags(interaction)
        });
      }
    });
  }
}
