import { inlineCode, SlashCommandBuilder } from "discord.js";
import { BasicTextCommand } from "@/types/Commands/BasicTextCommand";

export default new BasicTextCommand({
  data: new SlashCommandBuilder().setName("adbonus").setDescription("Sends mobile ad bonus formulas and multipliers"),
  text: `
The highest unlocked effect on this list is the only effect that applies.
Celestial 7 unlock: ||Ad Bonus has been Nullified||
Celestial 6 unlock: ||${inlineCode("2x")} to Dark Energy||
Celestial 5 unlock: ||${inlineCode("1.5x")} to all Ra-Celestial Memory gain||
Celestial 3 unlock: ||${inlineCode("+5%")} to Glyph rarity||
Celestial 2 unlock: ||${inlineCode("1.5x")} to Relic Shards||
Celestial 1 unlock: ||${inlineCode("2x")} to Reality Machines||
Note that all pre-Reality effects will come back at their respective stages before Reality is unlocked.
Reality Unlocked in current Reality (after your first Reality): ||${inlineCode("2x")} to game speed||
Dilation Unlocked: ||${inlineCode("2x")} to Dilated Time||
10+ Eternities: ||${inlineCode("min(max(EP^0.01, 1.5), 1e10)")} to Eternity Points||
10+ Infinities: ||${inlineCode("max(IP^0.01, 2)")} to Infinity Points||
AD: 2x to Antimatter Dimensions.
And no, ad bonus is not coming to Steam (you simply can't!)`
});
