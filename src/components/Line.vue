<script lang="ts" setup>
import { Position } from "../interfaces";
defineProps<{ from: Position; to: Position; color: string }>();

const posToString = (pos: Position) => {
  return `${pos.x} ${pos.y} ${pos.z}`;
};
</script>

<template>
  <a-entity id="line" :line="`start: ${posToString(from)}; end: ${posToString(
    to!
  )}; color: ${color}`"></a-entity>

</template>
