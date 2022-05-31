<script lang="ts" setup>
import { Position } from "../interfaces/linkedlist";
import { computed } from "vue";

const props = defineProps<{ from: Position; to: Position | null }>();

const cDirection = computed((): [THREE.Vector3, number] => {
  if (props.to == null) {
    return [new THREE.Vector3(0, 0, 0), 0];
  }

  const from: THREE.Vector3 = new THREE.Vector3(
    props.from.x,
    props.from.y,
    props.from.z
  );
  const to: THREE.Vector3 = new THREE.Vector3(
    props.to.x,
    props.to.y,
    props.to.z
  );

  const distance = from.distanceTo(to);

  const direction = new THREE.Vector3();

  direction.subVectors(to, from);

  return [direction, distance - 0.5];
});

const vecToString = (pos: Position | THREE.Vector3): string => {
  return `${pos.x} ${pos.y} ${pos.z}`;
};
</script>

<template>
  <a-entity
    id="arrow_as"
    :arrow="`length: ${cDirection[1]}; direction: ${vecToString(
      cDirection[0]
    )}; headWidth: 0.5 `"
    :visible="to != null"
    :position="vecToString(from)"
  >
  </a-entity>
</template>
