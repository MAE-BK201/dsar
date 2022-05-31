<script setup lang="ts">
import { computed } from "vue";
import { IListNode } from "../interfaces/linkedlist";
import { useStore } from "../store";

const store = useStore();

const reprListNode = (node: IListNode | null): string => {
  if (node == null) return "null";
  let idx = store.findById(node.id)![0];

  return `${idx} | ${node.data}`;
};

const linkedListRepr = computed(() => {
  let repr = "";

  store.getLinkedList.map((node: IListNode) => {
    repr +=
      "[" + reprListNode(node) + "]" + `${node.next != null ? " -> " : ""}`;
  });
  return repr;
});

const llheadRepr = computed(() => {
  let repr = "";
  if (store.getHead === null) return "null";

  let idx = store.findById(store.getHead.id)![0];
  repr += `[${idx} | ${store.getHead.data}] -> [${reprListNode(
    store.getHead.next
  )}]`;

  return repr;
});

const lltailRepr = computed(() => {
  let repr = "";
  if (store.getTail === null) return "null";

  let idx = store.findById(store.getTail.id)![0];
  repr += `[${idx} | ${store.getTail.data}] -> ${store.getTail.next ?? "null"}`;

  return repr;
});
</script>

<template>
  <div class="meta">
    <h2>Linked List Metadata</h2>
    <h4>Attatched Nodes: {{ store.getLinkedList.length }}</h4>
    <h4>LinkedList: {{ linkedListRepr }}</h4>
    <h4>Head: {{ llheadRepr }}</h4>
    <h4>Tail: {{ lltailRepr }}</h4>
  </div>
</template>

<style scoped>
h2,
h4 {
  margin-bottom: 0px;
  margin-top: 6px;
  margin-left: 15px;
}

h4 {
  margin-left: 35px;
}

.meta {
  color: white;
  position: absolute;
  top: 0px;
  display: flex;
  flex-direction: column;
  align-items: start;
}
</style>
