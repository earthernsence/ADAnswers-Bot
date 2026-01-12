import { BasicTextCommand } from "@/types/Commands/BasicTextCommand";
import { SlashCommandBuilder } from "discord.js";

export default new BasicTextCommand({
  data: new SlashCommandBuilder()
    .setName("galaxyboost")
    .setDescription("compares the boost from 100 tickspeed upgrades with 0 galaxies and 1 galaxy"),
  // eslint-disable-next-line @stylistic/max-len
  text: "The top equation shows the power of 0 galaxies and 100 tickspeed upgrades, while the bottom equation shows the power of just 1 galaxy and 100 tickspeed upgrades. The boost is about ~5.8x, and it will only get better! https://i.imgur.com/X026AsW.png"
});
