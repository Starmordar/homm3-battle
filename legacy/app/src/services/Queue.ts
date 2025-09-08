interface Node<T> {
  value: T;
  next?: Node<T>;
}

class Queue<T> {
  public length: number;

  private head?: Node<T>;
  private tail?: Node<T>;

  constructor() {
    this.head = this.tail = undefined;
    this.length = 0;
  }

  enqueue(item: T): void {
    const node = { value: item, next: undefined };
    this.length++;

    if (!this.tail) {
      this.tail = this.head = node;
      return;
    }

    this.tail.next = node;
    this.tail = node;
  }

  deque(): T | undefined {
    if (!this.head) return undefined;
    this.length--;

    const node = this.head;
    this.head = this.head.next;

    if (this.length === 0) this.tail = undefined;

    node.next = undefined;
    return node.value;
  }

  peek(): T | undefined {
    return this.head?.value;
  }
}

export default Queue;
