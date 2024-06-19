import { ApplicationCommandType, CommandInteraction } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";

export const adbonus: Command = {
  name: "adbonus",
  description: "Sends ad bonus formulas/multipliers",
  type: ApplicationCommandType.ChatInput,
  run: async(interaction: CommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    // eslint-disable-next-line max-len
    const content: string = `
Disabled in cel7
DM: 2
Memory Gain: 1.5
Rarity: +5%
RS: 1.5
GS: 2
DT: 2
EP: min(max(EP^0.01, 1.5), 1e10)
IP: max(IP^0.01, 2)
AD: 2.
And no, ad bonus is not coming to steam (you simply can't!)`;

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};
