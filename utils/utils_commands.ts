import { type CommandInteraction, hideLinkEmbed, hyperlink } from "discord.js";
import { Channels } from "../Channels";
import { Roles } from "../Roles";

export function isUserHelper(interaction: CommandInteraction): boolean | undefined {
  // If the command usage is in a DM, or not the AD server, return true
  if (!interaction.inGuild() || interaction.guildId !== Channels.AntimatterDimensionsServer) return true;

  // Else determine if the user is a helper or not, then return that value
  return interaction.guild?.members.resolve(interaction.user)?.roles.cache.has(Roles.HelperRole);
}

// Hides link embeds and masks the URL
export function link(content: string, url: string) {
  return hyperlink(content, hideLinkEmbed(url));
}