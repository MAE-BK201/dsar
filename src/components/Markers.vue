<script lang="ts" setup>
import { v4 } from "uuid";
import { useStore } from "../store";
import Line from "./Line.vue";
import Arrow from "./Arrow.vue";

const markers = [
  "markers/pt-cite.patt",
  "markers/pt-frac1.patt",
  "markers/pt-frac2.patt",
  "markers/pt-frac3.patt",
  "markers/pt-frac4.patt",
];

const store = useStore();

const e = (v: any) => {
  console.log(v);
};

const getData = (id: string) => {
  return store.findById(id)?.[1].data;
};

const getIndex = (id: string) => {
  return store.findById(id)?.[0];
};
</script>

<template>
  <a-marker
    look-at
    :id="'marker-' + idx"
    v-for="(marker, idx) in markers"
    type="pattern"
    :url="marker"
  >
    <a-box
      position="0 0 -0.3"
      material="opacity: 0.5"
      geometry=""
      scale="1 1 1"
    >
      <a-entity
        :text-geometry="`value: ${getIndex(
          'marker-' + idx
        )}; bevelEnabled: true; bevelSize: 0; bevelThickness: 0.03; curveSegments: 11.9; height: 0`"
        position="-0.2 1 0"
        material="color: black"
      ></a-entity>

      <a-entity
        :text-geometry="`value: ${getData(
          'marker-' + idx
        )}; bevelEnabled: true; bevelSize: 0; bevelThickness: 0.03; curveSegments: 11.9; height: 0`"
        position="-0.2 -0.2 0"
        material="color: black"
      ></a-entity>
    </a-box>
  </a-marker>

  <!-- <Line v-for="node in store.getLinkedList" :from="node.pos" :to="node.next == null ? node.pos : node.next.pos" -->
  <!--   color="green" /> -->

  <Arrow
    v-for="node in store.getLinkedList"
    :from="node.pos"
    :to="node.next?.pos ?? null"
  />
  <!-- <template v-for="node in store.getLinkedList"> -->
  <!--   {{ e(node) }} -->
  <!-- </template> -->
</template>
