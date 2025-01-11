import { BasicTextCommand } from "@/types/Commands/BasicTextCommand";
import { SlashCommandBuilder } from "discord.js";

export default new BasicTextCommand({
  data: new SlashCommandBuilder()
    .setName("5hours")
    .setDescription("explains the long-running 5 hours joke"),
  // eslint-disable-next-line @stylistic/max-len
  text: `The 5 hours joke is a reference to an even older joke from a time when AD updates were quite frequent. As a response to that, Acamaeda made a news message suggestion: "Antimatter Dimensions: the next update is always 5 hours away. Always." and the rest is history.`
});