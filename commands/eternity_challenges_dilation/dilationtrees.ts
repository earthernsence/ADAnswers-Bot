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
Active: ${inlineCode("11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,121,131,141,151,161,162,171,181,192,201,72,82,92,102,191,211,212,193,213,214,222,223,232,225,233,228|0")}
Idle: ${inlineCode("11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,123,133,143,151,161,162,171,181,192,201,72,82,92,102,191,211,212,193,213,214,222,223,232,225,233,228|0")}
Note: Active will fail for the very first dilation on mobile (and sometimes on web as well).`,
    after3paths: `${inlineCode("11,21,22,31,32,33,41,42,51,61,62,72,71,73,82,81,83,92,91,93,102,103,101,111,121,131,141,151,161,162,171,181,192,191,193,212,211,213,214,222,223,232,225,233,228|0")}`
  }
});
