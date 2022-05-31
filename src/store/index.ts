import { defineStore } from "pinia";
import type { Position } from "../interfaces";
import { LinkedList, IListNode } from "../interfaces/linkedlist";

export const useStore = defineStore("main", {
  state: () => ({
    linkedlist: new LinkedList(),
    currentNode: {} as IListNode,
    modalShowing: false,
  }),

  getters: {
    getLinkedList: (state): IListNode[] => {
      let list: IListNode[] = [];

      for (let item of state.linkedlist) {
        list.push(item as IListNode);
      }

      return list;
    },
    getTail: (state) => state.linkedlist.lltail(),
    getHead: (state) => state.linkedlist.llhead(),
    getCurrentNode: (state) => state.currentNode,
    isModalShowing: (state) => state.modalShowing,
  },

  actions: {
    setCurrentNode(node: IListNode) {
      this.currentNode = node;
    },

    appendNode(node: IListNode) {
      this.linkedlist.append(node);
    },

    index(idx: number) {
      this.linkedlist.index(idx);
    },

    removeIdx(idx: number) {
      this.linkedlist.remove(idx);
    },

    removeById(id: string) {
      this.linkedlist.removeById(id);
    },

    prepend(node: IListNode) {
      this.linkedlist.prepend(node);
    },

    insert(idx: number, node: IListNode) {
      this.linkedlist.insert(idx, node);
    },

    findById(id: string) {
      let found = this.linkedlist.findById(id);
      return found;
    },

    updatePosition(id: string, pos: Position) {
      let tuple = this.findById(id);

      if (tuple && tuple[1] !== null) {
        this.linkedlist.set(tuple[0], { ...tuple[1], pos });
      }
    },
    showModal(show: boolean) {
      this.modalShowing = show;
    },
  },
});
