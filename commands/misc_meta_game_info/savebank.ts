import { BasicTextCommand } from "@/types/Commands/BasicTextCommand";
import { SlashCommandBuilder } from "discord.js";
import { link } from "@/utils/utils_commands";

export default new BasicTextCommand({
  data: new SlashCommandBuilder()
    .setName("savebank")
    .setDescription("sends a link to Buck's online save bank"),
  text: `Check out ${link("Buck's save bank", "https://buck4437.github.io/save-bank/")}! If you've lost your save, try here and see if there's one close to your progress.`
});