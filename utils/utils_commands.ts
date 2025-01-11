import { type CommandInteraction, User, hideLinkEmbed, hyperlink } from "discord.js";
import { Channels } from "../Channels";
import { Roles } from "../Roles";

export function isUserHelper(interaction: CommandInteraction): boolean | undefined {
  // If the command usage is in a DM, or not the AD server, return true
  if (!interaction.inGuild() || interaction.guildId !== Channels.AntimatterDimensionsServer) return true;

  // Else determine if the user is a helper or not, then return that value
  return interaction.guild?.members.resolve(interaction.user)?.roles.cache.has(Roles.HelperRole);
}

export function authorTitle(interaction: CommandInteraction): string {
  const user: User = interaction.member === null ? interaction.user : interaction.member.user as User;

  return authorTitleFromUser(user);
}

export function authorTitleFromUser(user: User): string {
  const hasDiscriminator: boolean = user.discriminator !== "0";

  if (hasDiscriminator) return `${user.username}#${user.discriminator}`;
  return `${user.username}`;
}

// Hides link embeds and masks the URL
export function link(content: string, url: string) {
  return hyperlink(content, hideLinkEmbed(url));
}

export function pluralise(word: string, count: number) {
  if (count === 1) {
    return word;
  }
  return `${word}s`;
}

export function quantify(word: string, count: number): string {
  return `${count} ${pluralise(word, count)}`;
}
