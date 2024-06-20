import { ApplicationCommandType, CommandInteraction } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";

export const crunchbutton: Command = {
  name: "crunchbutton",
  description: "Explains the various changes to the crunch button at 5e11 IP",
  type: ApplicationCommandType.ChatInput,
  run: async(interaction: CommandInteraction) => {
    if (!interaction) return;

    // eslint-disable-next-line max-len
    const content: string = `When you buy the "Galaxies are 50% stronger" upgrade for 5e11 IP, the Crunch button will no longer show the IP/min stats.\nThis change is implemented because it's now more efficient to wait until you reach the next Galaxy before you Crunch. As a result, you will no longer be able to predict the exact amount of IP you will receive.\nThe IP colour indicates whether you will gain less (red), roughly the same amount (white), or more (green) IP compared to your current total.`;

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};
