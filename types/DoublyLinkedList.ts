/* eslint-disable no-unused-vars */

export class DoublyLinkedListNode<T> {
  public value: T;
  // eslint-disable-next-line no-use-before-define
  public next: DoublyLinkedListNode<T> | null = null;
  // eslint-disable-next-line no-use-before-define
  public prev: DoublyLinkedListNode<T> | null = null;

  constructor(data: T) {
    this.value = data;
  }
}

interface IDoublyLinkedList<T> {
  insertAtBeginning: (value: T) => DoublyLinkedListNode<T>,
  insertAtEnd: (value: T) => DoublyLinkedListNode<T>,
  deleteNode: (node: DoublyLinkedListNode<T>) => void,
  traverse: () => T[],
  size: () => number,
  search: (comparison: (value: T) => boolean) => DoublyLinkedListNode<T> | null,
  getFirstValue: () => DoublyLinkedListNode<T> | null,
  getLastValue: () => DoublyLinkedListNode<T> | null,
}

export class DoublyLinkedList<T> implements IDoublyLinkedList<T> {
  private head: DoublyLinkedListNode<T> | null = null;
  private tail: DoublyLinkedListNode<T> | null = null;

  constructor(initialValues?: Array<T>) {
    if (initialValues) {
      for (const value of initialValues) {
        this.insertAtEnd(value);
      }
    }
  }

  public insertAtBeginning(value: T): DoublyLinkedListNode<T> {
    const node = new DoublyLinkedListNode(value);

    if (this.head) {
      // If the list already has some values, we need to shift things over.
      this.head.prev = node;
      node.next = this.head;
      this.head = node;
    } else {
      // If the list doesn't have any values, this new value becomes the head.
      this.head = node;
    }

    return node;
  }

  public insertAtEnd(value: T): DoublyLinkedListNode<T> {
    const newNode = new DoublyLinkedListNode(value);

    if (this.head) {
      // If the list already has some values, we need to find the last node and set its "next" value to our new node.
      const getLastNode = (node: DoublyLinkedListNode<T>): DoublyLinkedListNode<T> => (node.next ? getLastNode(node.next) : node);

      const lastNode = getLastNode(this.head);

      newNode.prev = lastNode;
      lastNode.next = newNode;
    } else {
      // If the list doesn't have any values, this new value becomes the head.
      this.head = newNode;
    }

    return newNode;
  }

  public deleteNode(node: DoublyLinkedListNode<T>): void {
    if (node.prev) {
      const previousNode = node.prev;
      previousNode.next = node.next;
    } else {
      this.head = node.next;
    }
  }

  public traverse(): T[] {
    const values: T[] = [];
    let currentNode = this.head;

    while (currentNode) {
      values.push(currentNode.value);
      currentNode = currentNode.next;
    }

    return values;
  }

  public size(): number {
    return this.traverse().length;
  }

  public search(comparison: (value: T) => boolean): DoublyLinkedListNode<T> | null {
    const compare = (node: DoublyLinkedListNode<T>): DoublyLinkedListNode<T> | null => {
      if (comparison(node.value)) return node;

      return node.next ? compare(node.next) : null;
    };

    return this.head ? compare(this.head) : null;
  }

  public getFirstValue(): DoublyLinkedListNode<T> | null {
    return this.head;
  }

  public getLastValue(): DoublyLinkedListNode<T> | null {
    return this.tail;
  }

  public partition(splitter: DoublyLinkedListNode<T>): Array<Array<T>> {
    const listAsArray = this.traverse();

    const indexToSplit = listAsArray.indexOf(splitter.value);

    if (indexToSplit === -1) throw new Error(`That value (${splitter.value}) isn't in the list to partition!`);

    const firstPart = listAsArray.slice(0, indexToSplit);
    const secondPart = listAsArray.slice(indexToSplit);

    return [firstPart, secondPart];
  }
}