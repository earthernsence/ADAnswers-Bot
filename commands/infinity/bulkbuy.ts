import { CommandInteraction, MessageFlags, SlashCommandBuilder } from "discord.js";
import type { Command } from "@/types/Command";
import { isUserHelper } from "@/utils/utils_commands";

export default {
  data: new SlashCommandBuilder()
    .setName("bulkbuy")
    .setDescription("describes bulk buy"),
  execute: async(interaction: CommandInteraction) => {
    if (!interaction) return;

    const content: string = `
This allows you to buy more than one set (ONLY on buy 10s) in one interval. This helps speed up runs overall when using autobuyers. At 512 bulk for all autobuyers bulk buy is maximised.
Another explanation, courtesy of the mobile how to play: Once the interval of a Dimension Autobuyer is maxed, all future upgrades will double the amount the autobuyer purchases per tick. This can be disabled.`;

    await interaction.reply({
      content,
      flags: isUserHelper(interaction) ? undefined : MessageFlags.Ephemeral,
    });
  }
} satisfies Command;