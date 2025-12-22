import { ChatInputCommandInteraction, MessageFlags, SlashCommandBuilder } from "discord.js";
import { Command } from "@/types/Commands/Command";
import { getLogBase } from "@/utils/utils_math";
import { isUserHelper } from "@/utils/utils_commands";

export default new Command({
  data: new SlashCommandBuilder()
    .setName("rm")
    .setDescription("calculates the amount of EP needed for a provided RM amount (2 < x < 1000)")
    .addIntegerOption(option =>
      option
        .setName("rm")
        .setDescription("the amount of RM you want to know the EP requirement for")
        .setRequired(true)
        .setMinValue(2)
        .setMaxValue(1000)
    ),
  execute: (interaction: ChatInputCommandInteraction) => {
    if (!interaction) return;

    const rmValue = interaction.options.getInteger("rm", true);

    const eternityPointsNeeded = Math.ceil(Math.min(
      4000 * (getLogBase(1000, rmValue) + 1),
      4000 / 27 * (rmValue + 26)
    ));

    interaction.reply({
      content: `After your first Reality, before any multipliers, to get ${rmValue} RM, you need e${eternityPointsNeeded} EP.`,
      flags: isUserHelper(interaction) ? undefined : MessageFlags.Ephemeral
    });
  }
});