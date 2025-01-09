import { Channels } from "../Channels";
import type { CommandInteraction } from "discord.js";
import { Roles } from "../Roles";

export function isUserHelper(interaction: CommandInteraction): boolean | undefined {
  // If the command usage is in a DM, or not the AD server, return true
  if (!interaction.inGuild() || interaction.guildId !== Channels.AntimatterDimensionsServer) return true;

  // Else determine if the user is a helper or not, then return that value
  return interaction.guild?.members.resolve(interaction.user)?.roles.cache.has(Roles.HelperRole);
}