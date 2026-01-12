import { BasicTextCommand } from "@/types/Commands/BasicTextCommand";
import { SlashCommandBuilder } from "discord.js";

export default new BasicTextCommand({
  data: new SlashCommandBuilder().setName("adbonus").setDescription("sends ad bonus formulas and multipliers"),
  text: `
The highest unlocked effect on this list, is the only effect that applies
Celestial 7: ||Ad Bonus has been Nullified||
Celestial 6: ||DM: 2||
Celestial 5: ||Memory Gain: 1.5||
Celestial 3: ||Glyph Rarity: +5%||
Celestial 2: ||RS: 1.5||
Celestial 1: ||RM: 2x||
Reality Unlocked in current Reality: ||GS: 2||
Dilation Unlocked: ||DT: 2||
10+ Eternities: ||EP: min(max(EP^0.01, 1.5), 1e10)||
10+ Infintiies: ||IP: max(IP^0.01, 2)||
AD: 2.
And no, ad bonus is not coming to steam (you simply can't!)`
});
