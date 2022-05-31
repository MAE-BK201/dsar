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
    store.removeById(markerElement.id);
  });
});

onUnmounted(() => {
  document.removeEventListener("markerFound", (marker: any) => {});
  document.removeEventListener("markerLost", (marker: any) => {});

  for (let v of Object.values(watchers)) {
    clearInterval(v);
  }
});

// const len = ref(2);
// const dir = ref({ x: 0, y: 0, z: 0 });

// setTimeout(() => {
//   console.log("changing");
//   len.value = 3;
// }, 10000);

// setTimeout(() => {
//   console.log("changing dir");
//   dir.value = { x: -2, y: 0, z: 2 };
// }, 10000);
</script>

<template>
  <Modal v-show="store.isModalShowing" />
  <Metadata />
  <a-scene embedded arjs vr-mode-ui="enabled:false" ref="sceneRef">
    <a-assets>
      <a-asset-item id="arrow" src="models/arrow.gltf"></a-asset-item>
    </a-assets>

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
