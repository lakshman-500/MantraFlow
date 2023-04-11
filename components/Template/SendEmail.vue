<template>
  <div ref="el" class="border bg-red">
    <p class="border bg-red">{{ nodeSelected.name }}</p>
    <p class="border bg-red">{{ nodeSelected.code }}</p>
    <p class="border bg-red">
      In: {{ nodeSelected.input }}, Out: {{ nodeSelected.output }}
    </p>
  </div>
</template>

<script setup>
const { nodeSelected } = defineProps(["nodeSelected"]);
onMounted(async () => {
  console.log("received node data: " + nodeSelected);
  await nextTick();
});
</script>
