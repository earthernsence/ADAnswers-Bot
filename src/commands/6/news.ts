import { ApplicationCommandOptionType, ApplicationCommandType, CommandInteraction } from "discord.js";
import { isHelper, link } from "../../functions/Misc";
import { Command } from "../../command";

export const news: Command = {
  name: "news",
  description: "Args: `listmobile`, `listweb`, `info`. Explains what the news ticker is and where it came from",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "info",
      description: "What information about news do you want to see?",
      required: true,
      type: ApplicationCommandOptionType.String,
      choices: [
        { name: "listmobile", value: "listmobile" },
        { name: "listweb", value: "listweb" },
        { name: "info", value: "info" },
        { name: "games", value: "games" },
      ]
    }
  ],
  run: async(interaction: CommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    let content: string;
    const info = interaction.options.getString("info", true);

    switch (info) {
      case "listmobile":
        content = `${link("List of mobile news messages in the game Antimatter Dimensions (from Wikipedia)", "https://gist.github.com/earthernsence/2661619a3e4ca8089709f9fe19395f77")}`;
        break;
      case "listweb":
        content = `${link("List of web news messages in the game Antimatter Dimensions (from Wikipedia)", "https://github.com/IvarK/AntimatterDimensionsSourceCode/blob/master/src/core/secret-formula/news.js")}`;
        break;
      case "info":
        // eslint-disable-next-line max-len
        content = `The news ticker is an art form. Back in the day Antimatter Dimensions used to have a channel called news ticker suggestions, where people would suggest news messages as they saw fit. However, due to the horrible quality of these suggestions, the channel was shut down. However, the legacy of the channel still lives on in game, and you can read all of the messages as they come across the top. They were all community submitted or snuck in by the developers. For a list of them for mobile, use \`/news listmobile\`. For a list of them for web, use \`/news listweb\`.`;
        break;
      case "games":
        content = `There exists a news ticker in AD that recommends the player to play some other games. These games are as follows:
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

If you're looking for more incremental/idle games, visit ${link("galaxy.click", "https://galaxy.click/")}, a website made by an AD player, yhvr!`;
        break;
      default:
        content = "Unknown news arg";
        break;
    }

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};