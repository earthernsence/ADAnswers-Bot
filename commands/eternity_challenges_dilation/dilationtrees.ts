import { inlineCode, SlashCommandBuilder } from "discord.js";
import { ChoiceTextCommand } from "@/types/Commands/ChoiceTextCommand";

export default new ChoiceTextCommand({
  data: new SlashCommandBuilder()
    .setName("dilationtrees")
    .setDescription("provides some recommended Time Dilation study trees for different points in the game")
    .addStringOption(option =>
      option
        .setName("when")
        .setDescription("select an option for where you are in the game")
        .setRequired(true)
        .setChoices([
          { name: "initial-dilations", value: "first" },
          { name: "after-3paths-dilation-upgrade", value: "after3paths" }
        ])
    ),
  possibleText: {
    first: `
Active: ${inlineCode("11-62,time,111,active,151-214,antimatter,222,223,225,228,232,233|0")}
Idle: ${inlineCode("11-62,time,111,idle,151-214,antimatter,222,223,225,228,232,233|0")}
Note: Active will fail for the very first dilation on mobile (and sometimes on web/steam as well).`,
    after3paths: `${inlineCode("11-111,active,151-214,222,223,225,228,232,233|0")}`
  }
});
