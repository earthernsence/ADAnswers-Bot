import type { DoublyLinkedList, DoublyLinkedListNode } from "@/types/DoublyLinkedList";

/**
 * Gets the next/previous value from a DoublyLinkedList node, wrapping around to the other end
 * of the list at the boundaries instead of stopping.
 *
 * Used by any CollectorEmbedCommand backed by a DoublyLinkedList (Achievements, Eternity
 * Challenges, Secret Achievements) inside its `handleAction` prev/next branches.
 */
export function wrappingListNeighbor<T>(list: DoublyLinkedList<T>, node: DoublyLinkedListNode<T>, forward: boolean): T {
  const neighbour = forward ? node.next : node.prev;
  if (neighbour) return neighbour.value;

  const wrapped = forward ? list.getFirstValue() : list.getLastValue();
  return wrapped ? wrapped.value : node.value;
}

/**
 * Gets the next/previous value from a plain array, wrapping around at the boundaries.
 *
 * Used by any CollectorEmbedCommand backed by a fixed array rather than a DoublyLinkedList
 * (Meta's page numbers, Help's page keys). If it can't find anything, it will fall back to
 * the current content.
 *
 * @param keyOf - Identifies an item for the equality check. Defaults to comparing items
 * directly, which is fine for arrays of primitives (numbers, strings); pass a key extractor for
 * arrays of objects
 */
// oxlint-disable-next-line max-params
export function wrappingArrayNeighbor<T>(
  array: ReadonlyArray<T>,
  current: T,
  forward: boolean,
  // eslint-disable-next-line no-unused-vars
  keyOf: (item: T) => unknown = item => item
): T {
  const index = array.findIndex(item => keyOf(item) === keyOf(current));
  if (index === -1 || array.length === 0) return current;

  const nextIndex = (index + (forward ? 1 : -1) + array.length) % array.length;
  return array[nextIndex] ?? current;
}
