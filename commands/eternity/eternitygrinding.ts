import { BasicTextCommand } from "@/types/Commands/BasicTextCommand";
import { SlashCommandBuilder } from "discord.js";

export default new BasicTextCommand({
  data: new SlashCommandBuilder()
    .setName("eternitygrinding")
    .setDescription("explains the general process of grinding for eternities"),
  text: `
Eternity buyer to 0 EP, Big Crunch set to (theoretically best to worst) 2e308, 1e154,1e103, 1e77 (all with "x times last" setting)
Test which works the best for you. You might have to adjust the value a little bit. Use Infinity Dimension + Active path.
Experiment with Dimension Boost and Antimatter Galaxy intervals a bit. We recommend 0.3 seconds on Dimension Boosts and 0.1 seconds on Antimatter Galaxies, which can help unlock the "Eternities are the new Infinity" (Achievement 113) achievement for 2x faster Eternity grinding.
    
If you have TS181, do not use your Big Crunch autobuyer (disable it). All other advice remains the same. 
If you are back here for TS193 eternity grinding, use your normal production tree, just with ID instead of TD (or both if you have Time Study 201).`
});
