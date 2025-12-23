import type { ContextMenuCommandBuilder, MessageContextMenuCommandInteraction } from "discord.js";

interface ContextMenuCommandProps {
  data: ContextMenuCommandBuilder,
  // eslint-disable-next-line no-unused-vars
  execute: (interaction: MessageContextMenuCommandInteraction) => void;
  aliases?: Array<string>;
}

export class ContextMenuCommand {
  declare data: ContextMenuCommandBuilder;
  // eslint-disable-next-line no-unused-vars
  execute: (interaction: MessageContextMenuCommandInteraction) => void;
  aliases: Array<string>;

  constructor({ data, execute, aliases }: ContextMenuCommandProps) {
    this.data = data;
    this.execute = execute;
    this.aliases = aliases ?? [];
  }

  public error() {
    console.log("Some sort of issue here");
  }
}