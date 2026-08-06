import { type CommandInteraction, hideLinkEmbed, hyperlink, type RepliableInteraction, User } from "discord.js";
import { Channels } from "./utils_channels";
import { format } from "./utils_formatting";
import { Roles } from "./utils_roles";

export function isUserHelper(interaction: CommandInteraction): boolean | undefined {
  // If the command usage is in a DM, or not the AD server, return true
  if (!interaction.inGuild() || interaction.guildId !== Channels.AntimatterDimensionsServer) return true;

  // Else determine if the user is a helper or not, then return that value
  return interaction.guild?.members.resolve(interaction.user)?.roles.cache.has(Roles.HelperRole);
}

export function authorTitle(interaction: RepliableInteraction): string {
  const user: User = interaction.member === null ? interaction.user : (interaction.member.user as User);

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
  if (Math.abs(count) === 1) {
    return word;
  }
  return `${word}s`;
}

export function quantify(word: string, count: number, shouldFormat = true): string {
  if (shouldFormat) return `${format(count, 2)} ${pluralise(word, count)}`;
  return `${count} ${pluralise(word, count)}`;
}

/**
 * Encoding/decoding for the custom IDs used by {@link CollectorEmbedCommand} buttons.
 *
 * Scheme: `{prefix}:{action}:{userId}:{encoded}`
 * - `prefix`  - routes the click to the right command via `CollectorEmbedCommand.registry`.
 * - `action`  - `"prev"` / `"next"` for navigation, or a command-specific string (e.g. `"tree"`)
 *               for any extra buttons a subclass adds.
 * - `userId`  - the Discord snowflake of whoever ran the original slash command. Anyone else
 *               clicking gets rejected.
 * - `encoded` - a compact, command-specific representation of the item currently on screen
 *               (e.g. `"142"` for an achievement ID, `"7x3"` for challenge/completion).
 *
 * Discord caps custom IDs at 100 characters; this scheme comfortably fits even with a full
 * snowflake and a multi-part identifier embedded.
 */

export interface ParsedCustomId {
  prefix: string;
  action: string;
  userId: string;
  encoded: string;
}

export function buildCustomId(prefix: string, action: string, userId: string, encoded: string): string {
  return `${prefix}:${action}:${userId}:${encoded}`;
}

export function parseCustomId(customId: string): ParsedCustomId {
  const [prefix, action, userId, ...rest] = customId.split(":");

  // Rejoined in case an encoded identifier ever needs to contain a colon of its own.
  return { prefix, action, userId, encoded: rest.join(":") };
}
