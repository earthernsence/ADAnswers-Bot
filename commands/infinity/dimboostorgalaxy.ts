import { BasicTextCommand } from "@/types/Commands/BasicTextCommand";
import { SlashCommandBuilder } from "discord.js";

export default new BasicTextCommand({
  data: new SlashCommandBuilder()
    .setName("dimboostorgalaxy")
    .setDescription("tells you if you should do a dimboost or a galaxy reset"),
  text: `Galaxy if you can afford it, Dimboost if you are trying to reach being able to afford it.`
});
