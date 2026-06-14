import { BasicTextCommand } from "@/types/Commands/BasicTextCommand";
import { SlashCommandBuilder } from "discord.js";

export default new BasicTextCommand({
  data: new SlashCommandBuilder()
    .setName("firstsplit")
    .setDescription("describes early-eternity pre-TS171 Time Study progress at the first split (Dimension split)"),
  text: `Antimatter Dimension when it lets you get further down the tree, Infinity Dimension when you have 7 spare TT, Time Dimension when you can afford 171 as well`
});
