import { BasicTextCommand } from "@/types/Commands/BasicTextCommand";
import { SlashCommandBuilder } from "discord.js";

export default new BasicTextCommand({
  data: new SlashCommandBuilder()
    .setName("galaxyboost")
    .setDescription(
      "Compares the boost from 100 tickspeed upgrades with 0 Antimatter Galaxies and 1 Antimatter Galaxy"
    ),
  // eslint-disable-next-line @stylistic/max-len
  text: `One Antimatter Galaxy increases the Tickspeed bonus per upgrade from x1.1245 to x1.1445. This increase in the number is applied to every upgrade and every Antimatter Dimension. That means that each Tickspeed upgrade (1.1445 / 1.1245) ^ 8 ~= x1.15146 times as strong, and each Tickspeed upgrade multiplies with each other.
A hundred Tickspeed upgrades will amount to being a 1.15146 ^ 100 = x1333735 times as strong, with only 5 of them amounting to a first Dimension Boost worth of value, x2. This doesn't account for the new purchases you are going to get, which will additionally improve your antimatter gain even further. This boost will only get better as you progress, so don't underestimate Galaxy strength!`
});
