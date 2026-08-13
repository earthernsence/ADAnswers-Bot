import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  type MessageActionRowComponentBuilder,
  MessageFlags
} from "discord.js";
import { type CollectorComponentInteraction, CollectorEmbedCommand } from "./CollectorEmbedCommand";
import type { DoublyLinkedList, DoublyLinkedListNode } from "@/types/DoublyLinkedList";
import { buildCustomId } from "@/utils/utils_commands";
import { wrappingListNeighbor } from "@/utils/utils_component_navigation";

/**
 * Specialized `CollectorEmbedCommand` for the common case: paging through a single
 * `DoublyLinkedList<T>` with a Previous/Next button pair, wrapping around at the ends.
 * `Achievements` and `EternityChallenge` are both this shape.
 *
 * Implement `resolveList`/`findNode`/`getButtonLabel` and this handles `buildComponents` and the
 * prev/next branch of `handleAction` for you. If your command needs extra buttons beyond
 * Previous/Next (see EternityChallenge's "Copy Tree"), override `extraButtons` and
 * `handleExtraAction`.
 *
 * Not every list-backed command fits this shape, though. If the same ID can mean different
 * things depending on context (Secret Achievements' mobile/web lists, where an achievement's
 * neighbours differ per list), that command's notion of "the current item" includes the content &
 * the list involved. In that case, extend `CollectorEmbedCommand` directly instead of fighting this
 * class's single-list assumption. See `secretachievements.ts` for more on that.
 */
export abstract class LinkedListCollectorEmbedCommand<T> extends CollectorEmbedCommand<T> {
  /** The list `item` belongs to. Almost always a constant - only varies if a command has more than one list (see the class doc). */
  protected abstract resolveList(item: T): DoublyLinkedList<T>;

  /** Finds `item`'s node within its resolved list, so neighbours can be looked up. */
  protected abstract findNode(item: T): DoublyLinkedListNode<T> | undefined;

  /** The short label shown in a Previous/Next button's text (e.g. `"142"`, `"EC7x2"`). */
  protected abstract getButtonLabel(item: T): string;

  /** Extra buttons appended after Previous/Next. Default: none. */
  // eslint-disable-next-line no-unused-vars
  protected extraButtons(item: T, userId: string): Array<ButtonBuilder> {
    return [];
  }

  /**
   * Handles a click on one of {@link extraButtons}. Return `true` once handled (and make sure to
   * reply/update the interaction yourself), or `false` to let the base report it as unknown.
   */
  // oxlint-disable-next-line require-await
  protected async handleExtraAction(
    // eslint-disable-next-line no-unused-vars
    interaction: CollectorComponentInteraction,
    // eslint-disable-next-line no-unused-vars
    action: string,
    // eslint-disable-next-line no-unused-vars
    item: T
  ): Promise<boolean> {
    return false;
  }

  protected buildComponents(item: T, userId: string): Array<ActionRowBuilder<MessageActionRowComponentBuilder>> {
    const node = this.findNode(item);
    if (!node) return [];

    const list = this.resolveList(item);
    const previousItem = wrappingListNeighbor(list, node, false);
    const nextItem = wrappingListNeighbor(list, node, true);
    const encoded = this.encodeIdentifier(item);

    return [
      new ActionRowBuilder<ButtonBuilder>().addComponents(
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
        ...this.extraButtons(item, userId)
      )
    ];
  }

  protected async handleAction(interaction: CollectorComponentInteraction, action: string, item: T): Promise<T | null> {
    if (action === "prev" || action === "next") {
      const node = this.findNode(item);
      if (!node) return null;

      return wrappingListNeighbor(this.resolveList(item), node, action === "next");
    }

    const handled = await this.handleExtraAction(interaction, action, item);

    if (!handled) {
      await interaction.reply({ content: "That button doesn't do anything (yet)!", flags: MessageFlags.Ephemeral });
    }

    return null;
  }
}
