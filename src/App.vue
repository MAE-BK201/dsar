<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import type { Position } from "./interfaces/linkedlist";
import { useStore } from "./store";
import Markers from "./components/Markers.vue";
import Modal from "./components/Modal.vue";
import Metadata from "./components/Metadata.vue";

let sceneRef = ref(null);
let data = ref(0);

const store = useStore();

let watchers: Record<string, number> = {};

onMounted(() => {
  document.addEventListener("markerFound", (marker: any) => {
    let markerElement = marker.target;

    const node = {
      id: markerElement.id,
      data: data.value,
      pos: { ...(markerElement.object3D.position as Position) },
      next: null,
    };

    if (store.findById(markerElement.id) == null) {
      store.setCurrentNode(node);
      store.showModal(true);
    }

    watchers[markerElement.id] = setInterval(() => {
      store.updatePosition(markerElement.id, markerElement.object3D.position);
    }, 500);
  });

  document.addEventListener("markerLost", (marker: any) => {
    let markerElement = marker.target;
    for (let [key, watch] of Object.entries(watchers)) {
      if (key == markerElement.id) clearInterval(watch);
    }
    store.showModal(false)
    store.removeById(markerElement.id);
  });
});

onUnmounted(() => {
  document.removeEventListener("markerFound", (marker: any) => { });
  document.removeEventListener("markerLost", (marker: any) => { });

  for (let v of Object.values(watchers)) {
    clearInterval(v);
  }
});

</script>

<template>
  <Modal v-show="store.isModalShowing" />
  <Metadata />
  <a-scene embedded arjs vr-mode-ui="enabled:false" ref="sceneRef">

    <Markers />
    <a-entity camera />
  </a-scene>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
