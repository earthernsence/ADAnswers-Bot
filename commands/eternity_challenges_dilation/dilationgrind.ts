import { inlineCode, SlashCommandBuilder } from "discord.js";
import { BasicTextCommand } from "@/types/Commands/BasicTextCommand";

export default new BasicTextCommand({
  data: new SlashCommandBuilder()
    .setName("dilationgrind")
    .setDescription("Explains the general process to reach Time Dilation"),
  // eslint-disable-next-line @stylistic/max-len
  text: `Getting the last few TT to unlock Dilation can be slow. Use the tree ${inlineCode("11-62, time, 111, active, 151-214, infinity, 222, 224, 226, 227, 232, 234")}. After reaching e1300 EP, do a long run and only Eternity once you'll get to 12900 TT. If you have low Eternities and Banked Infinities (such as 1.1e5 / 1e8, respectively), it helps to spend a few minutes grinding infinities at the start of said long run.`
});
