import { ChatInputCommandInteraction, SlashCommandBuilder, type SlashCommandOptionsOnlyBuilder } from "discord.js";

// Commands are made up of two parts: the data and the execute function.
// Data holds all the information that's useful for determining what will be passed in to the execute function,
// like arguments or other options. Execute handles the processing of data and the response to the user.
interface CommandProps {
  data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder,
  // eslint-disable-next-line no-unused-vars
  execute: (interaction: ChatInputCommandInteraction) => void,
}

export class Command {
  data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder;
  // eslint-disable-next-line no-unused-vars
  execute: (interaction: ChatInputCommandInteraction) => void;

  constructor({ data, execute }: CommandProps) {
    this.data = data;
    this.execute = execute;
  }
}