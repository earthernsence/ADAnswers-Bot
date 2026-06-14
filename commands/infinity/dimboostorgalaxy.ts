import { BasicTextCommand } from "@/types/Commands/BasicTextCommand";
import { SlashCommandBuilder } from "discord.js";

export default new BasicTextCommand({
  data: new SlashCommandBuilder()
    .setName("dimboostorgalaxy")
    .setDescription("Tells you if you should do a Dimension Boost or an Antimatter Galaxy reset"),
  text: `Galaxy if you can afford it, Dimboost if you are trying to reach being able to afford it.`
});
