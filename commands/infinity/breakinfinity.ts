import { CommandInteraction, MessageFlags, SlashCommandBuilder, inlineCode, spoiler } from "discord.js";
import type { Command } from "@/types/Command";
import { isUserHelper } from "@/utils/utils_commands";

export default {
  data: new SlashCommandBuilder()
    .setName("breakinfinity")
    .setDescription("describes break infinity"),
  execute: async(interaction: CommandInteraction) => {
    if (!interaction) return;

    // eslint-disable-next-line @stylistic/max-len
    const content: string = `Break Infinity is unlocked by getting the Big Crunch autobuyer to its maximum interval of 0.10 seconds. When you Break Infinity, ${spoiler("you are able to get past 1.8e308 Antimatter")} and more upgrades are unlocked. See more in the pins of the respective channel.
For the recommended upgrade order use ${inlineCode("/bugo")}.`;

    await interaction.reply({
      content,
      flags: isUserHelper(interaction) ? undefined : MessageFlags.Ephemeral,
    });
  }
} satisfies Command;