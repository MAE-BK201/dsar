<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useStore } from "../store";
import { IListNode } from "../interfaces/linkedlist";

const store = useStore();

let insert = reactive({
  data: null,
  idx: null,
});

let add = reactive({
  data: null,
});

let selection = ref("addMode");

const addNode = () => {
  const node: IListNode = JSON.parse(JSON.stringify(store.getCurrentNode));

  node.data = add.data! as number;
  store.appendNode(node);

  store.showModal(false);
};

const insertNode = () => {
  const node = JSON.parse(JSON.stringify(store.getCurrentNode));

  node.data = insert.data;

  if (Object.keys(node)) {
    store.insert(insert.idx!, node);
    store.showModal(false);
  }
};
</script>

<template>
  <div class="modal">
    <div class="dialog">
      <h3>Marker Detected what to do?</h3>
      <div>
        <input
          id="add"
          type="radio"
          name="addMode"
          value="addMode"
          v-model="selection"
        />
        <label :style="{ 'margin-right': '25px' }" for="add">Add Node</label>

        <input
          id="insert"
          type="radio"
          name="insertMode"
          value="insertMode"
          v-model="selection"
        />
        <label for="insert">Insert Node</label>
      </div>

      <div class="content">
        <div v-show="selection == 'addMode'">
          <input
            type="number"
            v-model="add.data"
            placeholder="Enter node data"
          />
          <button @click="addNode">Add Node</button>
        </div>

        <div v-show="selection == 'insertMode'">
          <input
            type="number"
            v-model="insert.data"
            placeholder="Enter node data"
          />

          <input
            type="number"
            v-model="insert.idx"
            placeholder="Enter position to insert"
          />
          <button @click="insertNode">Insert Node</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  width: 100%;
  overflow: hidden;
  height: 100%;
  position: absolute;
  background: rgba(49, 49, 49, 0.678);
  backdrop-filter: blur(55px);
  z-index: 99;
  top: 0px;
  left: 0px;
  display: grid;
  place-items: center;
}

.dialog {
  padding: 5px;
  border-radius: 5px;
  width: 80%;
  max-width: 400px;
  max-height: 40%;
  /* height: 100%; */
  background: white;
  position: relative;
  display: flex;
  flex-direction: column;
}

.dialog .footer {
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 100%;
  padding: 15px;
}

button {
  padding: 5px;
  margin-right: 10px;
}

.insert {
  margin-left: 5px;
  padding: 3px;
}
</style>
