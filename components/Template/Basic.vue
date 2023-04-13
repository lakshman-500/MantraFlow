<template>
  <div class="title-box color-black">
    <div class="flex gap-4 py-3 px-2">
      <img :src="`./${nodeSelected.icon}.png`" class="w-[20px] h-[20px]" />
      <div>{{ nodeSelected.name }}</div>
    </div>
  </div>
  <div ref="el" class="border bg-blue">
    <!-- <p class="border bg-blue">{{ nodeSelected.name }}</p> -->
    <p class="border bg-blue">{{ nodeSelected.code }}</p>
    <p class="border bg-blue">
      In: {{ nodeSelected.input }} &amp; Out: {{ nodeSelected.output }}
    </p>
    <TemplateBasicDialog :header="'Sample Dialog'">
      <template #nodeDialogTemplate>
        <div class="mt-2">
          <p class="text-sm text-gray-500">Have a good Day</p>
        </div>
        <!-- <TemplateSendMailComp /> -->
      </template>
    </TemplateBasicDialog>
    <!-- <select>
      <option>dadsf</option>
      <option>sdfd</option>
      <option>dadsf</option>
    </select> -->
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
<!-- <style scoped>
.drawflow .drawflow-node {
  border-radius: 50%;
  background: yellow;
  border: 1px solid #494949;
  color: white;
  min-width: 250px;
  min-height: 250px;
}

.drawflow .drawflow-node.selected {
  background: orange;
  border: 2px solid rgb(62, 250, 0);
}
</style> -->
