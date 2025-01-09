import { CommandInteraction, SlashCommandBuilder, inlineCode } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("c9")
    .setDescription(`shorthand for ${inlineCode("/challenge c9")}`)
    .addUserOption(user =>
      user
        .setName("target")
        .setDescription("(Optional) Which user would you like to show the information to?")
        .setRequired(false)
    ),
  execute: async(interaction: CommandInteraction) => {
    if (!interaction) return;

    const target = interaction.options.get("target")?.user;
  }
};