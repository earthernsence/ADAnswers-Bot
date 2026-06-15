import { channelMention, SlashCommandBuilder } from "discord.js";
import { BasicTextCommand } from "@/types/Commands/BasicTextCommand";

export default new BasicTextCommand({
  data: new SlashCommandBuilder().setName("dilation").setDescription("Describes the process of dilation"),
  // eslint-disable-next-line @stylistic/max-len
  text: `(Check out the pins in ${channelMention("443492392801140786")}!) If you can reach 1.80e308 IP and then complete the Eternity while Dilated, you will be rewarded with Tachyon Particles. You can dilate as many times as you want, but Tachyon Particles cannot be farmed like other resources. Instead, you can only gain more Tachyon Particles by passing your previous highest antimatter within Time Dilation, and you will only gain more based on your new highest antimatter from this new run.`
});
