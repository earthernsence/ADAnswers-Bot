import { channelMention, SlashCommandBuilder } from "discord.js";
import { BasicTextCommand } from "@/types/Commands/BasicTextCommand";
import { Channels } from "@/utils/utils_channels";

export default new BasicTextCommand({
  data: new SlashCommandBuilder()
    .setName("eternityprogression")
    .setDescription("Describes the general progression of the game after Eternity, pre-ECs"),
  text: `
1. First Eternity's EP on TD1
2. (Buying Time Study 21 path + enabling RESPEC at the top of the Time Study page) Buy all the Time Theorems you can with antimatter & Infinity Points, then Eternity at e426IP for 3EP. Spend all EP on TT. You should have 11 total Time Theorems.
3. (Buy up to TS42) Buy Time Theorems as they become available. Then Eternity at e500IP for 4 EP & buy another EP Time Theorem. You should have 14 total Time Theorems.
4. (Buy TS51) Continue to buy Time Theorems as they become available. Then Eternity at e614IP for 8EP & buy another EP Time Theorem. You should have 17 total Time Theorems.
5. Buy TS61, then get 100 Eternities to complete the early Eternity Milestones.
    
Afterwards, check out [this flowchart](https://i.imgur.com/pdmy3bN.png) (also pinned in ${channelMention(Channels.EternityToEC1)}). The pins in that channel can be a massive help!`
});
