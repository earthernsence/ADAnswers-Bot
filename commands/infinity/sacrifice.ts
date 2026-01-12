import { BasicTextCommand } from "@/types/Commands/BasicTextCommand";
import { SlashCommandBuilder } from "discord.js";

export default new BasicTextCommand({
  data: new SlashCommandBuilder()
    .setName("sacrifice")
    .setDescription("describes dimensional sacrifice, its benefits, and when to do so"),
  // eslint-disable-next-line @stylistic/max-len
  text: `Sacrifice resets all Antimatter Dimensions besides 8th Dimensions, and in return you get a multiplier based on First Dimensions. This effect stacks, and is reset on DimBoost/Galaxy/Infinity/etc. I recommend saccing after you buy 10 8th dims and the multiplier is >2x`
});
