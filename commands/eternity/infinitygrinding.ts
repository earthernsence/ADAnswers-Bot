import { bold, inlineCode, SlashCommandBuilder } from "discord.js";
import { ChoiceTextCommand } from "@/types/Commands/ChoiceTextCommand";

export default new ChoiceTextCommand({
  data: new SlashCommandBuilder()
    .setName("infinitygrinding")
    .setDescription("provides a guide on how to grind infinities.")
    .addStringOption(option =>
      option
        .setName("when")
        .setDescription("part of the game you're in. pre = pre achievement 87, post = post achievement 97")
        .setRequired(true)
        .setChoices([
          { name: "pre-a87", value: "pre" },
          { name: "post-a87", value: "post" }
        ])
    ),
  possibleText: {
    // eslint-disable-next-line @stylistic/max-len
    pre: `You can use the Time study 32 to gain more Infinities on Crunch based on Dimension Boosts. To take advantage of TS 32 you need to have as many Dimension Boosts when you Crunch as possible. However Antimatter Galaxies reset the amount of Dimboosts so you want to disable the Antimatter Galaxy autobuyer. After that set Dimboost autobuyer to buy max dimboosts every 0 seconds and set Crunch autobuyer to something like 0.1-1.0 seconds between Crunches depending on how long it takes to buy Dimboosts.`,
    post: `
Crunch autobuyer on 5 seconds (because of the reward from a87 (and for help with attaining this achievement, use ${inlineCode(`/infinitygrinding pre-a87`)})), and make sure you have TS32 for the extra multiplier based on DimBoosts.
If grinding for EC4, make ${bold("sure")} you are using Idle path before wasting time here!
If grinding for banked infinities, make sure to be using TS191!`
  }
});
