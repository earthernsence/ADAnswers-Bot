import { type ChatInputCommandInteraction, type SlashCommandOptionsOnlyBuilder } from "discord.js";
import { Command } from "./Command";

interface ChoiceTextCommandProps {
  data: SlashCommandOptionsOnlyBuilder;
  possibleText: Record<string, string>;
}

export class ChoiceTextCommand extends Command {
  constructor({ data, possibleText }: ChoiceTextCommandProps) {
    super({
      data,
      execute: (interaction: ChatInputCommandInteraction) => {
        if (!interaction) return;

        const choice = interaction.options.getString(data.options[0]!.toJSON().name);

        if (!choice || !possibleText[choice]) {
          this.error({ interaction, text: `Invalid choice of ${choice}!` });
          return;
        }

        const content = possibleText[choice];

        interaction.reply({
          content,
          flags: this.getFlags(interaction)
        });
      }
    });
  }
}
