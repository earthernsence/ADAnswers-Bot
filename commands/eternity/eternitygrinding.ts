import { BasicTextCommand } from "@/types/Commands/BasicTextCommand";
import { SlashCommandBuilder } from "discord.js";

export default new BasicTextCommand({
  data: new SlashCommandBuilder()
    .setName("eternitygrinding")
    .setDescription("explains the general process of grinding for eternities"),
  text: `
Eternity buyer to 0, crunch (theoretically best to worst) 2e308, 1e154,1e103, 1e77 (all with "x times last" setting)
Test which works the best for you. You might have to adjust the value a little bit. Use ID+active path.
Experiment with DimBoost and Galaxy intervals a bit. I used 0.3 seconds on DimBoosts and 0.1 seconds on Galaxies, which got me the "Eternities are the new Infinity" achievement for 2x faster eternity grinding.
    
If you have TS181, do not use your crunch autobuyer (disable it). All other advice remains the same. 
If you are back here for TS193 eternity grinding, use your normal production tree, just with ID instead of TD (or both, you lousy TS201 users)`
});