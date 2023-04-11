<template>
  <div ref="el" class="border bg-blue">
    <p class="border bg-blue">{{ nodeSelected.name }}</p>
    <p class="border bg-blue">{{ nodeSelected.code }}</p>
    <p class="border bg-blue">
      In: {{ nodeSelected.input }}, Out: {{ nodeSelected.output }}
    </p>
  </div>
</template>

<script setup>
const { nodeSelected } = defineProps(["nodeSelected"]);
const myComp = ref();
onMounted(async () => {
  console.log("received node data: " + nodeSelected);
  await nextTick();
});
</script>
