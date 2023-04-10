<script setup>
const { flow } = useFlow();

const emits = defineEmits(["addNode"]);

const addNode = (f) => {
  console.log("emit : add ..");
  emits("addNode", f);
};
</script>

<template>
  <div class="w-full">
    <p
      class="drag-drawflow mb-4 border border-blue rounded px-3 py-1"
      v-for="f in flow"
      :key="f"
      draggable="true"
      :data-node="n.item"
      @dragstart="addNode(f)"
    >
      {{ f.name }}
    </p>
  </div>
</template>
