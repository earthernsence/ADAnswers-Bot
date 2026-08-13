import {
  ActionRowBuilder,
  ButtonInteraction,
  ChatInputCommandInteraction,
  italic,
  type MessageActionRowComponentBuilder,
  MessageFlags,
  type RepliableInteraction,
  SlashCommandBuilder,
  type SlashCommandOptionsOnlyBuilder,
  type SlashCommandSubcommandsOnlyBuilder,
  StringSelectMenuInteraction,
  userMention
} from "discord.js";
import { Command } from "./Command";
import type { CustomEmbed } from "@/types/Embeds/CustomEmbed";

type CommandData = SlashCommandBuilder | SlashCommandOptionsOnlyBuilder | SlashCommandSubcommandsOnlyBuilder;

export interface CollectorEmbedCommandProps {
  data: CommandData;
  prefix: string;
  aliases?: Array<string>;
}

/** Anything that can trigger a CollectorEmbedCommand's `handleAction`. */
export type CollectorComponentInteraction = ButtonInteraction | StringSelectMenuInteraction;

/**
 * Base class for commands that reply with an embed plus interactive components (buttons and/or a
 * select menu) that re-render the embed in place to create persistent collector commands.
 *
 * How it works: every component's custom ID encodes everything needed to re-render the embed from
 * scratch (which item is showing, and who's allowed to interact) through a unique interaction ID
 * (see more in `utils_commands.ts`).
 * A single global handler (`ComponentInteraction.ts`) looks up the right command instance via
 * {@link CollectorEmbedCommand.registry} and calls {@link handleComponent}, so there's no
 * per-message state to expire, which allows these components to also never expire & therefore
 * be used at any point of time.
 *
 * A command instance is a singleton, shared across every user who ever runs it. Never
 * store per-request state (the current item, current page, etc.) on `this`. It always has to
 * travel through the encoded custom ID and get resolved fresh on every call, or two users'
 * interactions could cause issues.
 *
 * To make a new command out of this, extend the class and implement the abstract methods below.
 * If your command pages through a `DoublyLinkedList` the same way Achievements/Eternity Challenges do,
 * extend `LinkedListCollectorEmbedCommand` instead; it implements `buildComponents`/`handleAction`
 * on top of this class.
 *
 * @typeParam T - The type of item currently shown by the embed (e.g. an `Achievement`, a page
 * number, an `AlchemyResource`). This does not have to be a raw domain object. If a single ID
 * can mean different things in different contexts (see Secret Achievements' mobile/web lists),
 * make `T` a small view/wrapper that carries that context alongside the underlying value.
 */
export abstract class CollectorEmbedCommand<T> extends Command {
  /** Maps a command's `prefix` to the instance that owns it for the global component handler to look up. */
  static registry = new Map<string, CollectorEmbedCommand<unknown>>();

  protected prefix: string;

  constructor(props: CollectorEmbedCommandProps) {
    // `execute` is overwritten immediately below with `performExecute`, which subclasses can
    // override; Command's constructor just needs something to satisfy its own typing here.
    // oxlint-disable-next-line no-empty-function
    super({ data: props.data, execute: () => {}, aliases: props.aliases });

    this.prefix = props.prefix;
    this.execute = this.performExecute.bind(this);

    CollectorEmbedCommand.registry.set(this.prefix, this as unknown as CollectorEmbedCommand<unknown>);
  }

  // ---------------------------------------------------------------------------------------
  // Abstract: subclasses must implement these.
  // ---------------------------------------------------------------------------------------

  /** Looks up the initial item from the slash command's options. Return `undefined` if nothing matches. */
  protected abstract findInitial(interaction: ChatInputCommandInteraction): T | undefined;

  /** The error text shown when {@link findInitial} comes back empty. */
  protected abstract notFoundText(interaction: ChatInputCommandInteraction): string;

  /** Turns an item into a compact string safe to embed in a custom ID (e.g. `"142"`, `"7x3"`). */
  protected abstract encodeIdentifier(item: T): string;

  /** The inverse of {@link encodeIdentifier} - re-resolves an item from a decoded component click. */
  protected abstract decodeIdentifier(encoded: string): T | undefined;

  /** Builds the embed for a given item. `interaction` may be the original command or a later component interaction. */
  protected abstract buildEmbed(interaction: RepliableInteraction, item: T): CustomEmbed;

  /** Builds every component row shown alongside the embed for a given item. */
  // eslint-disable-next-line no-unused-vars
  protected abstract buildComponents(
    item: T,
    userId: string
  ): Array<ActionRowBuilder<MessageActionRowComponentBuilder>>;

  /**
   * Handles a click/selection. Return the item to re-render the embed with, or `null` if you
   * already fully handled the interaction yourself (e.g. an ephemeral reply that shouldn't touch
   * the underlying embed message).
   */
  protected abstract handleAction(
    interaction: CollectorComponentInteraction,
    action: string,
    item: T
    // eslint-disable-next-line no-unused-vars
  ): Promise<T | null>;

  // All below this *should* be pretty much fully generic & never extended or overridden by
  // subclasses. If they do, a super call should be made as a fallback.

  /**
   * The slash command's `execute` implementation. Handles the not-found case, then replies with
   * the initial embed and its components.
   *
   * Subclasses that need to do something before the normal flow (e.g. Eternity Challenge's
   * standalone `tree` boolean option, Alchemy's separate `info` subcommand) can override this
   * by calling `super.performExecute(interaction)` to fall through to the default behaviour.
   */
  protected async performExecute(interaction: ChatInputCommandInteraction): Promise<void> {
    const initial = this.findInitial(interaction);

    if (!initial) {
      this.error({ interaction, text: this.notFoundText(interaction) });
      return;
    }

    const targetUser = interaction.options.getUser("target") ?? undefined;
    const userId = interaction.user.id;

    const embed = this.buildEmbed(interaction, initial);
    const picture = embed.getAndSetThumbnail();

    await interaction.reply({
      content: targetUser ? `${italic(`Suggested for ${userMention(targetUser.id)}`)}\n` : undefined,
      embeds: [embed.create()],
      files: [picture],
      flags: this.getFlags(interaction),
      components: this.buildComponents(initial, userId)
    });
  }

  /**
   * Handles a click/selection on any component this command produced. Called by the global
   * component handler (`ComponentInteraction.ts`) once it's routed the interaction here via
   * `CollectorEmbedCommand.registry`.
   *
   * @param interaction - The button click or select-menu choice itself
   * @param action - `"prev"`, `"next"`, or a command-specific action string
   * @param encodedUserId - The user ID decoded from the custom ID (i.e. who's allowed to interact)
   * @param encoded - The encoded item identifier decoded from the custom ID (the item that was on
   * screen *before* this interaction)
   */
  // oxlint-disable-next-line max-params
  public async handleComponent(
    interaction: CollectorComponentInteraction,
    action: string,
    encodedUserId: string,
    encoded: string
  ): Promise<void> {
    // I feel okay about including this as an allowed action for any user,
    // since it is a utility thing and if somebody sends the guide intended
    // for somebody else to use, it shouldn't block them from copying.
    if (interaction.user.id !== encodedUserId && action !== "tree") {
      await interaction.reply({ content: "This isn't your embed to control!", flags: MessageFlags.Ephemeral });
      return;
    }

    const item = this.decodeIdentifier(encoded);

    // Realistically shouldn't happen since the bot matches up with all of the game's data, but
    // I'd rather have the protection than not.
    if (!item) {
      await interaction.reply({
        content: "That data seems to be out of date. Try running the command again!",
        flags: MessageFlags.Ephemeral
      });
      return;
    }

    const newItem = await this.handleAction(interaction, action, item);

    // `null` means the subclass already fully handled the interaction (e.g. an ephemeral reply)
    // and the underlying embed message shouldn't be touched.
    if (newItem === null) return;

    const embed = this.buildEmbed(interaction, newItem);
    const image = embed.getAndSetThumbnail();

    await interaction.update({
      embeds: [embed.create()],
      files: [image],
      components: this.buildComponents(newItem, encodedUserId)
    });
  }
}
