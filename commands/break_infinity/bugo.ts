import { BasicTextCommand } from "@/types/Commands/BasicTextCommand";
import { SlashCommandBuilder } from "discord.js";

export default new BasicTextCommand({
  data: new SlashCommandBuilder()
    .setName("bugo")
    .setDescription("sends message containing the recommended break infinity upgrade order"),
  text: `https://cdn.discordapp.com/attachments/351479640755404820/1090075280862888046/bugo-v2.png`,
});