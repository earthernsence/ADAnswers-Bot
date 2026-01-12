import { BasicTextCommand } from "@/types/Commands/BasicTextCommand";
import { SlashCommandBuilder } from "discord.js";

export default new BasicTextCommand({
  data: new SlashCommandBuilder()
    .setName("justask")
    .setDescription("sends a link to justask, a guide on properly asking questions"),
  text: `please just ask your question. don't ask to ask. don't ask for topic experts or DMs. don't ping random users. skip the formalities and ask away! https://dontasktoask.com/`
});
