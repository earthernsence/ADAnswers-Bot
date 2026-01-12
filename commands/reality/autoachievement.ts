import { inlineCode, SlashCommandBuilder } from "discord.js";
import { ChoiceTextCommand } from "@/types/Commands/ChoiceTextCommand";

export default new ChoiceTextCommand({
  data: new SlashCommandBuilder()
    .setName("autoachievement")
    .setDescription("explains some information about the auto-achievement system post-Reality")
    .addStringOption(option =>
      option
        .setName("info")
        .setDescription("gives some information about your selected component of the auto-achievement system")
        .setRequired(true)
        .setChoices([
          { name: "general-information", value: "intro" },
          { name: "regain-speed", value: "speed" },
          { name: "regain-order", value: "order" },
          { name: "disabling", value: "disable" }
        ])
    ),
  possibleText: {
    /* eslint-disable @stylistic/max-len */
    intro: `
When you make a new Reality, you will lose all of the achievements you earned up to this point, from the first 13 rows. 
Once you have purchased the ${inlineCode("START")} perk in the perk tree (See ${inlineCode("/perks")} for more information), you will begin to regain all the achievements you have unlocked before Reality. This means that certain achievements that are time-consuming (eg: "Don't you dare sleep") or potentially impossible (eg: "We COULD afford 9") can be completed automatically by just waiting.`,

    speed: `You will initially autocomplete 1 achievement every 30 minutes. This interval can be decreased by purchasing the yellow ${inlineCode("ACH")} perks in the perk tab. Once you purchase the ${inlineCode("ACHNR")} perk, achievements will never reset, and your achievement autocompleter becomes redundant.`,

    order: `
When the timer in the achievements tab reaches 0, it will immediately complete the next achievement going in order from left to right, top to bottom. 
The first achievement that will be autocompleted is "You have to start somewhere", and the last one will be "This is what I have to do to get rid of you". Achievements that will be automatically completed appear yellow. 
Achievements that have already been completed are skipped. This means that if you can complete various trivial achievements early on (eg: every achievement involving completing challenges quickly), then you can reduce the amount of time required to autocomplete late achievements. The amount of time remaining until all achievements are automatically completed is shown below the achievement timer.`,

    disable: `
It is occasionally useful to temporarily disable the Achievement autocompleter. The most important use of this is to meet the unlock requirement of "Paradoxically Attain", although it can also be used in some niche cases to manually complete an achievement faster than the Autocompleter. 
To disable Auto Achievements, navigate to the Achievements tab, and click the "Auto Achievements: ON" button to set it to "OFF". The timer will continue ticking down, but it will stop itself at 0. Then, you can complete an Eternity or whatever achievement you were going for. To re-enable Auto Achievements, click again on the "Auto Achievements" button to turn it back to "ON". If the timer had hit 0, you will immediately autocomplete another achievement.`
  }
});
