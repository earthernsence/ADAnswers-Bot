import { SlashCommandBuilder, spoiler } from "discord.js";
import { BasicTextCommand } from "@/types/Commands/BasicTextCommand";

export default new BasicTextCommand({
  data: new SlashCommandBuilder()
    .setName("galaxyscaling")
    .setDescription("explains the change in Antimatter Galaxy cost scaling at 100 and 800"),
  // eslint-disable-next-line @stylistic/max-len
  text: `Above 100 AGs, the cost between Galaxies will go up by 2 per galaxy (i.e. 62 for 101, then 64 for 102, etc). This is called Distant scaling, hence the name change to "Distant Antimatter Galaxies". (800 AG spoilers) ${spoiler(`Above 800 AGs, the *total* cost increases by another 0.2%, on top of Distant scaling. This is called Remote scaling, hence the name change to "Remote Antimatter Galaxies"`)}.`
});
