import { ApplicationCommandType, CommandInteraction } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";

export const site: Command = {
  name: "site",
  description: "Says the game site + link to android / steam versions",
  type: ApplicationCommandType.ChatInput,
  run: async(interaction: CommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    // eslint-disable-next-line max-len
    const content: string = `
Web: https://ivark.github.io/AntimatterDimensions
Android version: <https://play.google.com/store/apps/details?id=kajfosz.antimatterdimensions>
Steam: <https://store.steampowered.com/app/1399720/Antimatter_Dimensions/>`;

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};
