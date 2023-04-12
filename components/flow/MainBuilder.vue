<!-- 
  Launch the Designer
 -->
<template>
  <div class="content-end">
    <ul class="flex mr-[300px] gap-4 justify-end p-1">
      <button class="bg-blue mouse rounded px-2">Remove Connection</button>
      <button class="bg-blue mouse rounded px-2">Remove Node</button>
      <!-- <button class="bg-blue mouse rounded px-2" @click="dialogVisible =">
        Logs
      </button> -->
    </ul>
  </div>
  <div class="w-full flex">
    <div class="w-full mt-1 flex">
      <FlowDesigner
        @nodeSelected="nodeSelected"
        :nodeTypes="nodeTypes"
        @nodeAdded="nodeAdded"
      />
    </div>
    <div class="w-[300px]">
      <!-- <textarea v-model="dialogData" class="auto-grow" /> -->

      <div>
        <div class="sm:hidden">
          <label for="tabs" class="sr-only">Select a tab</label>
          <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
          <select
            id="tabs"
            name="tabs"
            class="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option v-for="tab in tabs" :key="tab.name" :selected="tab.current">
              {{ tab.name }}
            </option>
          </select>
        </div>
        <div class="hidden sm:block">
          <nav class="flex space-x-4" aria-label="Tabs">
            <a
              v-for="tab in tabs"
              :key="tab.name"
              :href="tab.href"
              :class="[
                tab.current
                  ? 'bg-gray-100 text-gray-700'
                  : 'text-gray-500 hover:text-gray-700',
                'rounded-md px-3 py-2 text-sm font-medium',
              ]"
              :aria-current="tab.current ? 'page' : undefined"
              >{{ tab.name }}</a
            >
          </nav>
        </div>
        <div id="messages">
          <ul>
            <li v-for="l in dialogData">{{ l }}</li>
          </ul>
        </div>
        <div id="flowJson">
          flow json
          <!-- <ul>
      <li v-for="l in dialogData">{{ l }}</li>
    </ul> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { nodeTypes } = useNodeTypes();
const dialogVisible = ref(false);
const dialogData = ref([]); //defineProps(["flowData"]);

const nodeSelected = (nodeInfo) => {
  console.log(`"Node Selected is  (${nodeInfo.id}, ${nodeInfo.name})`);
  var val = `"Node Selected is  (${nodeInfo.id}, ${nodeInfo.name})`;
  dialogData.value = [...dialogData.value, val];
  //dialogData.value = `"Node Selected is  (${nodeInfo.id}, ${nodeInfo.name})`;
};

const nodeAdded = (nodeInfo) => {
  dialogData.value += `"Node Selected is  (${nodeInfo.id}, ${nodeInfo.name})`;
};

function exportEditor() {
  dialogData.value = editor.value.export();
  dialogVisible.value = true;
}
// watch:{
//   dialogData(old, newVal ) {
//     console.log(newVal);
// nextTick();
//   }
//}

const tabs = [
  { name: "Messages", href: "#messages", current: true },
  { name: "Flow Json.", href: "#flowJson", current: false },
];
</script>
