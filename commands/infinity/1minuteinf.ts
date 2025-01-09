import { CommandInteraction, MessageFlags, SlashCommandBuilder } from "discord.js";
import type { Command } from "@/types/Command";
import { isUserHelper } from "@/utils/utils_commands";

export default {
  data: new SlashCommandBuilder()
    .setName("1minuteinf")
    .setDescription("explains the UI change at infinity in under a minute"),
  execute: async(interaction: CommandInteraction) => {
    if (!interaction) return;

    await interaction.reply({
      // eslint-disable-next-line @stylistic/max-len
      content: `When you infinity in under a minute, the UI changes on the screen. Instead of the Dimensions disappearing, they stay and the Big Crunch button appears on top of them. This is merely visual, and is there to prevent flickering.`,
      flags: isUserHelper(interaction) ? undefined : MessageFlags.Ephemeral,
    });
  }
} satisfies Command;