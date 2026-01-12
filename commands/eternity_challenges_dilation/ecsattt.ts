import { ChatInputCommandInteraction, MessageFlags, SlashCommandBuilder } from "discord.js";
import { isUserHelper, pluralise, quantify } from "@/utils/utils_commands";
import { Command } from "@/types/Commands/Command";
import { ecsAtTTAmount } from "@/utils/game_data/recommended_time_study_paths";
import { enumerate } from "@/utils/utils_formatting";

export default new Command({
  data: new SlashCommandBuilder()
    .setName("ecsattt")
    .setDescription("provides a list of the recommended Eternity Challenge completions at a given Time Theorem amount")
    .addIntegerOption(option =>
      option.setName("total-time-theorems").setDescription("your total time theorems").setRequired(true).setMinValue(1)
    ),
  execute: (interaction: ChatInputCommandInteraction) => {
    if (!interaction) return;

    const timeTheorems = interaction.options.getInteger("total-time-theorems", true);
    const response = ecsAtTTAmount(timeTheorems);

    const content = `
At ${quantify("total Time Theorem", timeTheorems, 1e5)}, you should have: ${response.completions}.
${response.nextECs.length >= 0 ? `Next recommended ${pluralise("Eternity Challenge", response.nextECs.length)}: ${enumerate(response.nextECs, "conjunction")} at ${response.nextChallengeTT} total Time Theorems` : ""}`;

    interaction.reply({
      content,
      flags: isUserHelper(interaction) ? undefined : MessageFlags.Ephemeral
    });
  }
});
