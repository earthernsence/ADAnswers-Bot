import { BasicTextCommand } from "@/types/Commands/BasicTextCommand";
import { SlashCommandBuilder } from "discord.js";

export default new BasicTextCommand({
  data: new SlashCommandBuilder()
    .setName("respec")
    .setDescription('describes what the "respec" button does at the top of the time study page'),
  text: `It resets your Time Studies and refunds all the TT when you next Eternity. There are no costs or downsides to doing this, just remember to redistribute your TT after Eternity!`
});
