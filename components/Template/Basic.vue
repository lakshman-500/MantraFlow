<template>
  <div>
  <div class="text-gray-900">
    <div class="flex gap-4 mb-6 items-center">
      <img :src="`./${nodeSelected.icon}.png`"  class="w-[40px] h-[40px]" />
      <h4 class="text-2xl font-medium">{{ nodeSelected.name }}</h4>
    </div>
  </div>
  <div ref="el" class="border  border-dashed border-gray-400 rounded-md p-2">
    <!-- <p class="border bg-blue">{{ nodeSelected.name }}</p> -->
    <p class="border bg-indigo-500 text-xl mb-1 p-2 rounded-md text-center">{{ nodeSelected.code }}</p>
    <p class="border bg-green-500 text-xl mb-1 p-2 rounded-md text-center">
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
