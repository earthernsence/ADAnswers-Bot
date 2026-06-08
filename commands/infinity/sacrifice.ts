import { BasicTextCommand } from "@/types/Commands/BasicTextCommand";
import { SlashCommandBuilder } from "discord.js";

export default new BasicTextCommand({
  data: new SlashCommandBuilder()
    .setName("sacrifice")
    .setDescription("describes dimensional sacrifice, its benefits, and when to do so"),
  // eslint-disable-next-line @stylistic/max-len
  text: `
Sacrifice resets all Antimatter Dimensions besides 8th Dimensions, and in return you get a multiplier based on First Dimensions. This effect stacks, and is reset on DimBoost/Galaxy/Infinity/etc. I recommend saccing after you buy 10 8th dims and the multiplier is >2x.
Sacrifice uses the following formulas:

For the rewards of Achievements 32 / 57 / 88:
- Pre- ||Infinity Challenge 2|| (base formula: \`(log_10(AD1) / 10) ^ 2.0\`): Add \`0.2\` to exponent
- Post- ||Infinity Challenge 2|| (base formula: \`AD1 ^ 0.008\`): Add \`0.001\` to exponent

For ||Time Study 228||:
- Pre- ||Infinity Challenge 2|| (base formula: \`(log_10(AD1) / 10) ^ 2.0\`): Add \`0.4\` to exponent
- Post- ||Infinity Challenge 2|| (base formula: \`AD1 ^ 0.008\`): Add \`0.002\` to exponent`
});
