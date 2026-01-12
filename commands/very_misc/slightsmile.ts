import { BasicTextCommand } from "@/types/Commands/BasicTextCommand";
import { SlashCommandBuilder } from "discord.js";

export default new BasicTextCommand({
  data: new SlashCommandBuilder().setName("slightsmile").setDescription("kaj no"),
  text: `\u{1F642}`
});
