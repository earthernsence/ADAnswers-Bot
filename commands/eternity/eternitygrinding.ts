import { channelMention, inlineCode, SlashCommandBuilder } from "discord.js";
import { BasicTextCommand } from "@/types/Commands/BasicTextCommand";
import { Channels } from "@/utils/utils_channels";

export default new BasicTextCommand({
  data: new SlashCommandBuilder()
    .setName("eternitygrinding")
    .setDescription("Explains the general process of grinding for eternities"),
  text: `
- Time Studies: Infinity Dimension / Active (minimum 40 Time Theorems w/ tree ${inlineCode("11, 22, 32, 42, 51, 61, infinity | 0")})
- Autobuyers:
  - Eternity: 0 EP
  - Antimatter Galaxy: 0 or 0.1 seconds
  - Dimension Boost: either off or at 0.3 seconds
  - Big Crunch: 1e20, 1e41, or 1e53 "x times highest" IP (later on: 1e284 times highest); disabled with Time Study 181
- Ensure your Eternity Upgrade based on IC times is capped at 6.38e14x (see pins in ${channelMention(Channels.EternityToEC1)})
- Gold M / Max (on mobile: also hold "Max all" in the Infinity Dimensions tab while M is sticky)
- Set update rate to 33ms`
});
