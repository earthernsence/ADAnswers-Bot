import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  ChatInputCommandInteraction,
  italic,
  MessageFlags,
  type RepliableInteraction,
  SlashCommandBuilder,
  type SlashCommandOptionsOnlyBuilder,
  type SlashCommandSubcommandsOnlyBuilder,
  userMention
} from "discord.js";
import type { DoublyLinkedList, DoublyLinkedListNode } from "@/types/DoublyLinkedList";
import { buildCustomId } from "@/utils/utils_commands";
import { Command } from "./Command";
import type { CustomEmbed } from "@/types/Embeds/CustomEmbed";

type CommandData = SlashCommandBuilder | SlashCommandOptionsOnlyBuilder | SlashCommandSubcommandsOnlyBuilder;

interface CollectorEmbedCommandProps<T> {
  data: CommandData;
  /** Short, unique routing key embedded in every button's custom ID (e.g. `"ach"`, `"ec"`). */
  prefix: string;
  /** The list this command lets a user page through. */
  list: DoublyLinkedList<T>;
  aliases?: Array<string>;
}

/**
 * Base class for commands that reply with an embed + Previous/Next buttons letting a user page
 * through a {@link DoublyLinkedList}, where the buttons work forever - not just for the lifetime
 * of a message component collector.
 *
 * How it works: every button's custom ID encodes everything needed to redraw the embed from
 * scratch (which item is showing, and who's allowed to click) - see utils_commands. A
 * single global button handler (see `ButtonInteraction.ts`) looks up the right command instance
 * via {@link CollectorEmbedCommand.registry} and calls {@link handleButton}, so there's no
 * per-message state to expire, and clicking a button on a month-old embed works exactly the same
 * as clicking one that was posted a second ago.
 *
 * To make a new command out of this, extend the class and implement the abstract methods below -
 * they're the only command-specific pieces. Everything else (option-not-found handling, button
 * construction, navigation wraparound, authorization) is shared.
 *
 * @typeParam T - The type of item stored in the list (e.g. `Achievement`, `EternityChallenge`).
 */
export abstract class CollectorEmbedCommand<T> extends Command {
  /** Maps a command's `prefix` to the instance that owns it, for the global button handler to look up. */
  static registry = new Map<string, CollectorEmbedCommand<unknown>>();

  protected prefix: string;
  protected list: DoublyLinkedList<T>;

  constructor(props: CollectorEmbedCommandProps<T>) {
    // `execute` is overwritten immediately below with `performExecute`, which subclasses can
    // override; Command's constructor just needs something to satisfy its own typing here.
    super({ data: props.data, execute: () => {}, aliases: props.aliases });

    this.prefix = props.prefix;
    this.list = props.list;
    this.execute = this.performExecute.bind(this);

    CollectorEmbedCommand.registry.set(this.prefix, this as unknown as CollectorEmbedCommand<unknown>);
  }

  // ---------------------------------------------------------------------------------------
  // Abstract - subclasses must implement these. Each one is the command-specific equivalent
  // of a piece of logic that used to be duplicated across every collector-embed command.
  // ---------------------------------------------------------------------------------------

  /** Looks up the initial item from the slash command's options. Return `undefined` if nothing matches. */
  protected abstract findInitial(interaction: ChatInputCommandInteraction): DoublyLinkedListNode<T> | undefined;

  /** The error text shown when {@link findInitial} comes back empty. */
  protected abstract notFoundText(interaction: ChatInputCommandInteraction): string;

  /** Turns an item into a compact string safe to embed in a custom ID (e.g. `"142"`, `"7-3"`). */
  protected abstract encodeIdentifier(item: T): string;

  /** The inverse of {@link encodeIdentifier} - re-finds the node from a decoded button click. */
  protected abstract decodeIdentifier(encoded: string): DoublyLinkedListNode<T> | undefined;

  /** Builds the embed for a given item. `interaction` may be the original command or a later button click. */
  protected abstract buildEmbed(interaction: RepliableInteraction, item: T): CustomEmbed;

  /** The short label shown in a neighbour-preview, e.g. a Previous/Next button's text (`"142"`, `"EC7"`). */
  protected abstract getButtonLabel(item: T): string;

  // ---------------------------------------------------------------------------------------
  // Optional hooks - override only if a command needs extra buttons beyond Previous/Next
  // (e.g. Eternity Challenge's "Copy Tree" button).
  // ---------------------------------------------------------------------------------------

  /** Extra buttons to append after Previous/Next. Default: none. */
  // eslint-disable-next-line no-unused-vars
  protected extraButtons(item: T, userId: string): Array<ButtonBuilder> {
    return [];
  }

  /**
   * Handles a click on one of {@link extraButtons}. Return `true` once handled (and make sure to
   * reply/update the interaction yourself), or `false` to let the base class report it as unknown.
   */
  // eslint-disable-next-line no-unused-vars
  protected async handleExtraAction(interaction: ButtonInteraction, action: string, item: T): Promise<boolean> {
    return false;
  }

  // ---------------------------------------------------------------------------------------
  // Shared logic - fully generic, no subclass ever needs to touch this.
  // ---------------------------------------------------------------------------------------

  /** Gets the next/previous node, wrapping around to the other end of the list at the boundaries. */
  protected getNext(current: DoublyLinkedListNode<T>, forward: boolean): DoublyLinkedListNode<T> {
    const neighbour = forward ? current.next : current.prev;

    if (neighbour) return neighbour;

    const wrapped = forward ? this.list.getFirstValue() : this.list.getLastValue();
    return wrapped ?? current;
  }

  private buildButtons(current: DoublyLinkedListNode<T>, userId: string): ActionRowBuilder<ButtonBuilder> {
    const previousItem = this.getNext(current, false).value;
    const nextItem = this.getNext(current, true).value;
    const encoded = this.encodeIdentifier(current.value);

    return new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId(buildCustomId(this.prefix, "prev", userId, encoded))
        .setEmoji({ name: "◀️" })
        .setLabel(`Previous (${this.getButtonLabel(previousItem)})`)
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId(buildCustomId(this.prefix, "next", userId, encoded))
        .setEmoji({ name: "▶️" })
        .setLabel(`Next (${this.getButtonLabel(nextItem)})`)
        .setStyle(ButtonStyle.Primary),
      ...this.extraButtons(current.value, userId)
    );
  }

  /**
   * The slash command's `execute` implementation. Handles the not-found case, then replies with
   * the initial embed and its navigation buttons.
   *
   * Subclasses that need to do something before the normal flow (e.g. Eternity Challenge's
   * standalone `tree` boolean option) can override this - just call `super.performExecute(interaction)`
   * to fall through to the default behaviour.
   */
  protected async performExecute(interaction: ChatInputCommandInteraction): Promise<void> {
    const initial = this.findInitial(interaction);

    if (!initial) {
      this.error({ interaction, text: this.notFoundText(interaction) });
      return;
    }

    const targetUser = interaction.options.getUser("target") ?? undefined;
    const userId = interaction.user.id;

    const embed = this.buildEmbed(interaction, initial.value);
    const picture = embed.getAndSetThumbnail();

    await interaction.reply({
      content: targetUser ? `${italic(`Suggested for ${userMention(targetUser.id)}`)}\n` : undefined,
      embeds: [embed.create()],
      files: [picture],
      flags: this.getFlags(interaction),
      components: [this.buildButtons(initial, userId)]
    });
  }

  /**
   * Handles a click on any button this command produced. Called by the global button handler
   * (`ButtonInteraction.ts`) once it's routed the click here via `CollectorEmbedCommand.registry`.
   *
   * @param interaction - The button click itself.
   * @param action - `"prev"`, `"next"`, or a command-specific extra action string.
   * @param encodedUserId - The user ID decoded from the custom ID (i.e. who's allowed to click).
   * @param encoded - The encoded item identifier decoded from the custom ID.
   */
  public async handleButton(
    interaction: ButtonInteraction,
    action: string,
    encodedUserId: string,
    encoded: string
  ): Promise<void> {
    if (interaction.user.id !== encodedUserId) {
      await interaction.reply({ content: "This isn't your embed to control!", flags: MessageFlags.Ephemeral });
      return;
    }

    const node = this.decodeIdentifier(encoded);

    if (!node) {
      await interaction.reply({
        content: "That data seems to be out of date - try running the command again!",
        flags: MessageFlags.Ephemeral
      });
      return;
    }

    if (action !== "prev" && action !== "next") {
      const handled = await this.handleExtraAction(interaction, action, node.value);

      if (!handled) {
        await interaction.reply({ content: "That button doesn't do anything (yet)!", flags: MessageFlags.Ephemeral });
      }

      return;
    }

    const nextNode = this.getNext(node, action === "next");
    const embed = this.buildEmbed(interaction, nextNode.value);
    const image = embed.getAndSetThumbnail();

    await interaction.update({
      embeds: [embed.create()],
      files: [image],
      components: [this.buildButtons(nextNode, encodedUserId)]
    });
  }
}