<template>
  <div ref="el" class="border bg-red">
    <p class="border bg-red">{{ nodeSelected.name }}</p>    
    <p class="border bg-red">
      <div>
        <input  class="color-black" placeholder="Email Address"/>        
        </div>
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
