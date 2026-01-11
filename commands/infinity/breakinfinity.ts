import { inlineCode, SlashCommandBuilder, spoiler } from "discord.js";
import { BasicTextCommand } from "@/types/Commands/BasicTextCommand";

export default new BasicTextCommand({
  data: new SlashCommandBuilder()
    .setName("breakinfinity")
    .setDescription("describes break infinity"),
  // eslint-disable-next-line @stylistic/max-len
  text: `Break Infinity is unlocked by getting the Big Crunch autobuyer to its maximum interval of 0.10 seconds. When you Break Infinity, ${spoiler("you are able to get past 1.8e308 Antimatter")} and more upgrades are unlocked. See more in the pins of the respective channel.
For the recommended upgrade order use ${inlineCode("/bugo")}.`
});

