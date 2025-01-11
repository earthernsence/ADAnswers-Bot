import { BasicTextCommand } from "@/types/Commands/BasicTextCommand";
import { SlashCommandBuilder } from "discord.js";

export default new BasicTextCommand({
  data: new SlashCommandBuilder()
    .setName("firstsplit")
    .setDescription("describes early-eternity pre-TS171 time study progress at the first split"),
  text: `AD when it lets you get further down the tree, ID when you have 7 spare TT, TD when you can afford 171 as well`
});