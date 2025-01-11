import { BasicTextCommand } from "@/types/Commands/BasicTextCommand";
import { SlashCommandBuilder } from "discord.js";

export default new BasicTextCommand({
  data: new SlashCommandBuilder()
    .setName("xyproblem")
    .setDescription("links to xyproblem -- an explainer on being direct about what you want to know about"),
  // eslint-disable-next-line @stylistic/max-len
  text: `the XY problem is a simple conundrum that often occurs, especially in AD, when somebody wants to accomplish one thing but says that they want to accomplish another that they believe will help reach their end goal. https://xyproblem.info/`
});