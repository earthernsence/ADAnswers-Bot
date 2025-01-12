import { ChatInputCommandInteraction, MessageFlags, SlashCommandBuilder, type SlashCommandOptionsOnlyBuilder } from "discord.js";
import { ErrorCustomEmbed } from "../Embeds/ErrorCustomEmbed";

// Commands are made up of two parts: the data and the execute function.
// Data holds all the information that's useful for determining what will be passed in to the execute function,
// like arguments or other options. Execute handles the processing of data and the response to the user.
interface CommandProps {
  data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder,
  // eslint-disable-next-line no-unused-vars
  execute: (interaction: ChatInputCommandInteraction) => void,
}

interface CommandErrorProps {
  interaction: ChatInputCommandInteraction,
  text: string,
}

// This is a super generic command class that can easily be extended.
// Generally, we'll extend this class if there's a really repetitive command type,
// otherwise, this class itself can be used to create a command (see /challenge) for that case.
export class Command {
  data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder;
  // eslint-disable-next-line no-unused-vars
  execute: (interaction: ChatInputCommandInteraction) => void;

  constructor({ data, execute }: CommandProps) {
    this.data = data;
    this.execute = execute;
  }

  public error({ interaction, text }: CommandErrorProps) {
    const embed = new ErrorCustomEmbed({
      interaction,
      text,
    });

    const image = embed.getAndSetThumbnail();

    interaction.reply({
      embeds: [embed.create()],
      files: [image],
      flags: MessageFlags.Ephemeral
    });
  }
}