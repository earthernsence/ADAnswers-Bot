import { ChoiceTextCommand } from "@/types/Commands/ChoiceTextCommand";
import { link } from "@/utils/utils_commands";
import { SlashCommandBuilder } from "discord.js";

export default new ChoiceTextCommand({
  data: new SlashCommandBuilder()
    .setName("news")
    .setDescription("provides some information about the news ticker")
    .addStringOption(option =>
      option
        .setName("info")
        .setDescription("gives some information about your selected component of the news ticker")
        .setRequired(true)
        .setChoices([
          { name: "list-of-mobile-news", value: "listmobile" },
          { name: "list-of-web-news", value: "listweb" },
          { name: "general-info", value: "info" },
          { name: "games", value: "games" }
        ])
    ),
  possibleText: {
    "listmobile": `${link("List of mobile news messages in the game Antimatter Dimensions", "https://gist.github.com/earthernsence/59410925035a3346092b7aa6b75c2b36")}`,
    "listweb": `${link("List of web news messages in the game Antimatter Dimensions", "https://github.com/IvarK/AntimatterDimensionsSourceCode/blob/master/src/core/secret-formula/news.js")}`,
    // eslint-disable-next-line @stylistic/max-len
    "info": `The news ticker is an art form. Back in the day Antimatter Dimensions used to have a channel called news ticker suggestions, where people would suggest news messages as they saw fit. However, due to the horrible quality of these suggestions, the channel was shut down. However, the legacy of the channel still lives on in game, and you can read all of the messages as they come across the top. They were all community submitted or snuck in by the developers.`,
    "games": `There exists a news ticker in AD that recommends the player to play some other games. These games are as follows:
- ${link("Antimatter Dimensions", "https://ivark.github.io/AntimatterDimensions")},
- ${link("FE000000", "https://dan-simon.github.io/misc/fe000000/")},
- ${link("Trimps", "https://trimps.github.io/")},
- ${link("Mine Defense", "http://scholtek.com/minedefense")},
- ${link("Wizard and Minion Idle", "https://www.kongregate.com/games/Oninou/wami")},
- ${link("Anti-Idle", "https://www.kongregate.com/games/Tukkun/anti-idle-the-game")},
- ${link("Synergism", "https://synergism.cc/")},
- ${link("Universal Paperclips", "https://www.decisionproblem.com/paperclips/index2.html")},
- ${link("Monies^2", "https://sneekxy.nmtechgroup.com/monies2/")},
- ${link("The First Alkahistorian stages 1, 2, and 3", "https://nagshell.github.io/elemental-inception-incremental/")},
- ${link(`Melvor Idle`, `https://melvoridle.com/`)}

If you're looking for more incremental/idle games, visit ${link("galaxy.click", "https://galaxy.click/")}, a website made by an AD player, yhvr!`
  }
});