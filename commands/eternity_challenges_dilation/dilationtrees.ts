import { codeBlock, SlashCommandBuilder } from "discord.js";
import { ChoiceTextCommand } from "@/types/Commands/ChoiceTextCommand";

export default new ChoiceTextCommand({
  data: new SlashCommandBuilder()
    .setName("dilationtrees")
    .setDescription("Provides some recommended Time Dilation study trees for different points in the game")
    .addStringOption(option =>
      option
        .setName("when")
        .setDescription("Select an option for where you are in the game...")
        .setRequired(true)
        .setChoices([
          { name: "initial-dilations", value: "first" },
          { name: "after-3paths-dilation-upgrade", value: "after3paths" }
        ])
    ),
  possibleText: {
    first: `
Active: ${codeBlock("11-62, time, 111, active, 151-214, antimatter, 222, 223, 225, 228, 232, 233 | 0")}
Idle: ${codeBlock("11-62, time, 111, idle, 151-214, antimatter, 222, 223, 225, 228, 232, 233 | 0")}
Note: Active will fail for the very first Dilated Eternity on mobile (and sometimes on web/steam as well).`,
    after3paths: `${codeBlock("11-111, active, 151-214, 222, 223, 225, 228, 232, 233 | 0")}`
  }
});
