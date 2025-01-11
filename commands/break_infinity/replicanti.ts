import { SlashCommandBuilder, bold } from "discord.js";
import { BasicTextCommand } from "@/types/Commands/BasicTextCommand";

export default new BasicTextCommand({
  data: new SlashCommandBuilder()
    .setName("replicanti")
    .setDescription("explains what replicanti & replicanti upgrades do"),
  text: `
Replicanti are a mechanic unlocked at 1e140 IP. Excerpted from the pins of <#387799099472216095>:
    
${bold(`Replicanti`)}: Replicanti are a huge boost to Infinity Dimensions. When you reach Infinite replicanti, you can purchase a Replicanti Galaxy. This resets all Replicanti, but in return you gain a free Galaxy.
This behaves like a normal Galaxy. These, along with Replicanti, are reset on Infinity. 
Achievement "Is this safe?" lets you keep 1 RG on Infinity, as well as your Replicanti.
    
${bold(`Replicanti Galaxies (RGs)`)}: These work the same way as regular Galaxies, except they do not impact the cost of regular Galaxies. These are limited by the third replicanti upgrade, and are slow early on.
    
${bold(`Replicanti Upgrades`)}: There are three Replicanti upgrades, Chance/Interval/RGAmount:
- Chance increases the chance that it will replicate a Replicanti on the interval. 
- The interval is the interval on which replication can possibly happen. 
- RGAmount is the amount of RGs you can have at one time.
    `
});