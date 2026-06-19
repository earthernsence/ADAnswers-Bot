import { ChoiceTextCommand } from "@/types/Commands/ChoiceTextCommand";
import { SlashCommandBuilder } from "discord.js";

export default new ChoiceTextCommand({
  data: new SlashCommandBuilder()
    .setName("antitables")
    .setDescription("Displays a guide on how to complete the Antitables achivement (Achievement 43).")
    .addStringOption(option =>
      option
        .setName("game-stage")
        .setDescription("At what point in the game would you like a guide for?")
        .setRequired(true)
        .setChoices([
          { name: "pre-break-infinity", value: "prebreak" },
          { name: "post-break-infinity", value: "postbreak" },
          { name: "post-first-eternity", value: "posteternity" },
          { name: "post-first-reality", value: "postreality" }
        ])
    ),
  possibleText: {
    // eslint-disable-next-line @stylistic/max-len
    prebreak: `Enter C8 and do 5 Dimension Boosts to unlock Sacrifice, then try to get as much Sacrifice multiplier as you can without completing the challenge. Disable all autobuyers and Sacrifice again to reset your Dimensions. Then, toggle Until 10 next to tickspeed and buy 1 of each Dimension. Then toggle Buy 1 back, and buy 10 2nd dims. Continue up from 3rd to 8th dim, buying just enough Dimensions to get the Dimension Multiplier (the number below the dimension name) higher than the last. If you complete the challenge too quickly to get the multipliers in ascending order, you can try to do it in a normal infinity.`,
    // eslint-disable-next-line @stylistic/max-len
    postbreak: `Get as many Antimatter Galaxies as you can and a few Dimension Boosts. Disable the Antimatter Dimension 1-7 autobuyers. Dimension Boost once. Buy as many AD2s as you need to pass the multiplier of AD1. Continue up from 3rd to 8th dim, buying just enough Dimensions to get the Dimension Multiplier (the number below the dimension name) higher than the last. 
  If your 1st dimension multiplier raises too quickly, you may be unable to complete the achievement until you reach 1.8e308 IP. If this is the case, don't worry, you don't need it to progress.`,
    // eslint-disable-next-line @stylistic/max-len
    posteternity: `Respec out of all of your Time Studies. Get as many Antimatter Galaxies as you can and a few Dimension Boosts. Disable the Big Crunch, Eternity, Dimension Boost, Antimatter Galaxy, and Antimatter Dimension 1-7 autobuyers. Do a Dimension Boost, and your 1st Antimatter Dimension's Dimension Multiplier (the number below the dimension name) should be the lowest, followed by the 2nd Antimatter Dimension. If it's not, buy 2nd Antimatter Dimensions until it is, otherwise, continue up from 3rd to 7th Antimatter Dimension, buying just enough Dimensions to get the Dimension Multiplier higher than the last. If you have reached Dilation, you can try this strategy within that.`,
    // eslint-disable-next-line @stylistic/max-len
    postreality: `Make sure that you have the START perk. Then, get as many achievements as possible before antitables. Your achievement autocompleter will eventually automatically unlock antitables. Do note that you do not need to complete antitables to Reality with the START perk.`
  }
});
