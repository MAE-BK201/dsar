<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <a-scene embedded arjs>
    <!-- <a-marker type="pattern" url="./assets/pattern-89.patt"> -->
    <a-marker preset="hiro">
      <!-- <a-entity -->
      <!--   position="0 0 0" -->
      <!--   scale="0.05 0.05 0.05" -->
      <!--   gltf-model="https://arjs-cors-proxy.herokuapp.com/https://raw.githack.com/AR-js-org/AR.js/master/aframe/examples/image-tracking/nft/trex/scene.gltf" -->
      <!-- /> -->
      <a-box />
    </a-marker>
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
