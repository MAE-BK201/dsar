export interface Position {
  x: number;
  y: number;
  z: number;
}

export interface IListNode {
  id: string;
  data: number;
  pos: Position;
  next: ListNode | null;
}

export class ListNode implements IListNode {
  public data: number;
  public id: string;
  public pos: Position;
  public next: ListNode | null = null;

  constructor(id: string, data: number, pos: Position) {
    this.data = data;
    this.id = id;
    this.pos = pos;
  }
}

export class LinkedList {
  private head: ListNode | null = null;
  private tail: ListNode | null = null;
  private size: number = 0;
  [Symbol.iterator]() {
    let node = this.head;

    return {
      next() {
        let done = true;
        let val: IListNode | null = null;

        if (node !== null) {
          val = {
            data: node.data,
            id: node.id,
            pos: node.pos,
            next: node.next,
          };
          done = false;
          node = node.next;
        }

        return {
          value: val,
          done: done,
        };
      },
    };
  }

  public append(v: IListNode): ListNode {
    const node = new ListNode(v.id, v.data, v.pos);

    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      if (this.tail) this.tail.next = node;
      this.tail = node;
    }

    this.size++;
    return node;
  }

  public prepend(v: IListNode): ListNode {
    const node = new ListNode(v.id, v.data, v.pos);

    if (!this.size) this.tail = node;
    else {
      node.next = this.head;
    }

    this.head = node;
    this.size++;

    return node;
  }

  public pop(): ListNode | null {
    if (!this.head) return null;

    let temp = this.head;
    let pre = this.head;

    while (temp.next) {
      pre = temp;
      temp = temp.next;
    }

    this.tail = pre;
    this.tail.next = null;
    this.size--;

    if (!this.size) {
      this.head = null;
      this.tail = null;
    }

    return temp;
  }

  public length(): number {
    return this.size;
  }

  public findById(id: string): [number, ListNode] | null {
    let idx = 0;

    for (idx; idx < this.size; idx++) {
      let node = this.index(idx);

      if (node && node.id == id) return [idx, node];
    }

    return null;
  }

  public removeById(id: string): ListNode | null {
    let node = this.head;
    let idx;

    for (idx = 0; idx < this.size; idx++) {
      if (this.index(idx)?.id == id) {
        return this.remove(idx);
      }
    }

    return null;
  }

  public index(idx: number): ListNode | null {
    if (idx < 0 || idx >= this.size) return null;

    let node = this.head;

    for (let i = 0; i < idx; i++) {
      node = node?.next!;
    }

    return node;
  }

  public set(idx: number, v: IListNode): ListNode | null {
    const node = this.index(idx);

    if (!node) return null;

    node.data = v.data;

    node.pos.x = v.pos.x;
    node.pos.y = v.pos.y;
    node.pos.z = v.pos.z;

    node.id = v.id;
    node.next = v.next;

    return node;
  }

  public insert(idx: number, v: IListNode): ListNode | null {
    if (!idx) return this.prepend(v);
    if (idx === this.size) return this.append(v);
    if (idx < 0 || idx > this.size) return null;

    const newNode = new ListNode(v.id, v.data, v.pos);
    const temp = this.index(idx - 1);

    newNode.next = temp?.next!;

    if (temp) {
      temp.next = newNode;
      this.size++;
      return newNode;
    }
    return null;
  }

  public shift(): ListNode | null {
    if (!this.size) return null;

    const node = this.head;

    if (this.head) this.head = this.head.next;

    if (node) node.next = null;
    this.size--;

    if (!this.size) this.tail = null;

    return node;
  }

  public remove(idx: number): ListNode | null {
    if (idx == 0) return this.shift();
    if (idx === this.size - 1) return this.pop();
    if (idx < 0 || idx > this.size) return null;

    const before = this.index(idx - 1);

    const node = before?.next;

    if (node) {
      before.next = node.next;
      node.next = null;
    }

    this.size--;

    return node ?? null;
  }

  public llhead(): ListNode | null {
    let temp = this.head;
    return temp;
  }

  public lltail(): ListNode | null {
    let temp = this.tail;
    return temp;
  }
}

function main() {
  let linkedlist = new LinkedList();
  linkedlist.append(new ListNode("id1", 12, { x: 0, y: 0, z: 0 }));

  linkedlist.append(new ListNode("id2", 54, { x: 0, y: 0, z: 0 }));

  linkedlist.insert(0, new ListNode("id3", 65, { x: 0, y: 0, z: 0 }));
  // console.log(linkedlist.index(0))
  // console.log(JSON.stringify(linkedlist, null, 4))

  // linkedlist.removeById("id2");
  // linkedlist.remove(0);
  console.log("IDX: ", linkedlist.findById("id2"));

  for (let node of linkedlist) {
    console.log("Node: ", node?.id);
  }
}

main();
