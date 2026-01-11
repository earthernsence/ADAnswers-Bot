import { bold, SlashCommandBuilder } from "discord.js";
import { BasicTextCommand } from "@/types/Commands/BasicTextCommand";

export default new BasicTextCommand({
  data: new SlashCommandBuilder()
    .setName("oom")
    .setDescription("explains what an OoM (order of magnitude) is"),
  text: `An OoM (or ${bold("O")}rder ${bold("o")}f ${bold("M")}agnitude) is the difference between the exponents of numbers, e.g. 1e100 -> 1e108 is a difference of 8 OoMs.`
});