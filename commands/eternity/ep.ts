import { ChatInputCommandInteraction, MessageFlags, SlashCommandBuilder } from "discord.js";
import { Command } from "@/types/Commands/Command";
import { getLogBase } from "@/utils/utils_math";
import { isUserHelper } from "@/utils/utils_commands";

export default new Command({
  data: new SlashCommandBuilder()
    .setName("ep")
    .setDescription("calculates the amount of IP needed for a provided EP amount (2 < x < 1000")
    .addIntegerOption(option =>
      option
        .setName("ep")
        .setDescription("the amount of EP you want to know the IP requirement for")
        .setRequired(true)
        .setMinValue(2)
        .setMaxValue(1000)
    ),
  execute: (interaction: ChatInputCommandInteraction) => {
    if (!interaction) return;

    const epValue = interaction.options.getInteger("ep", true);

    const infinityPointsNeeded = Math.ceil(308 * getLogBase(5, epValue) + 215.6);

    interaction.reply({
      content: `Before any multipliers, to get ${epValue} EP, you need e${infinityPointsNeeded} IP.`,
      flags: isUserHelper(interaction) ? undefined : MessageFlags.Ephemeral
    });
  }
});