<!-- 
  Launch the Designer
 -->
<template>
  <div class="h-screen bg-gray-950 bg-[length:60px] bg-[url('https://storage.googleapis.com/static.helloumi.com/daisho/img/grid.png')]">
  <div class="">
    <ul class="flex gap-3 fixed top-5 right-[17rem]">
      <div class="flex gap-2 border border-outline rounded-md">
        <button @click="zoomout" class="bg-gray-100 mouse px-2 rouned-s-md">-</button>
        <label class="text-gray-100 text-sm">zoom</label>
        <button @click="zoomin" class="bg-gray-100 mouse px-2 rouned-s-md">+</button>
      </div>
      <button class="bg-gray-100 mouse rounded px-2 text-sm">Remove Connection</button>
      <button class="bg-gray-100 mouse rounded px-2 text-sm">Remove Node</button>
      <button @click="addOutput" class="bg-gray-100 mouse rounded px-2 text-sm">
        + o/p
      </button>
      <button @click="deleteOutput" class="bg-gray-100 mouse rounded px-2 text-sm">
        - o/p
      </button>
      <!-- <button class="bg-blue mouse rounded px-2" @click="dialogVisible =">
        Logs
      </button> -->
    </ul>
  </div>
  <div class="w-full flex">
    <div class="w-full flex">
      <FlowToolBar @addnode="drag" :nodeTypes="nodeTypes" class="w-[1/4]" />
      <FlowDesigner
        class="w-[3/4]"
        @nodeSelected="nodeSelected"
        :nodeTypes="nodeTypes"
        @nodeAdded="nodeAdded"
        @flowDataChanged="flowDataChanged"
        :zoomLevel="zoomLevel"
        :canAddOutput="canAddOutput"
      />
    </div>
    <div class="w-[300px] bg-gray-100 max-h-screen overflow-auto p-3">
      <div class="p-3 bg-white rounded-md ">
      <TabGroup>
        <TabList class="flex space-x-2 p-2 bg-gray-100 rounded-md">
          <Tab v-slot="{ selected }">
            <span
          :class="{ ' bg-white text-indigo-500 px-3 py-1 font-medium rounded text-sm outline-none': selected, 'rounded-md text-sm px-3 py-1 bg-gray-100 text-black outline-none': !selected }"
        >
          Flow Json
        </span></Tab>
        <Tab v-slot="{ selected }">
            <span
          :class="{ 'bg-white text-indigo-500 px-3 py-1 font-medium rounded text-sm outline-none': selected, 'rounded-md text-sm px-3 py-1 bg-gray-100 text-gray-500 outline-none focus:outline-none': !selected }"
        >
          Logs
        </span></Tab>
        </TabList>
        <TabPanels>
          <TabPanel class="text-sm pt-3 text-gray-700"> {{ flowData }}</TabPanel>
          <TabPanel  class="text-sm pt-3 text-gray-700">
            <div>
              <ul >
                <li v-for="l in dialogData" class="border-b py-2 text-sm border-gray-100">{{ l }}</li>
              </ul>
            </div>
          </TabPanel>
          <TabPanel>Content 3</TabPanel>
        </TabPanels>
      </TabGroup>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
const { nodeTypes } = useNodeTypes();
const dialogVisible = ref(false);
const dialogData = ref([]); //defineProps(["flowData"]);
const flowData = ref([]); ///defineProps({ data: String });
const flowDataChanged = (data) => {
  console.log("received......>> " + data);
  flowData.value = data;
  nextTick();
};
const nodeSelected = (nodeInfo) => {
  console.log(`Node (${nodeInfo.id}, ${nodeInfo.name})`);
  var val = `Node (${nodeInfo.id}, ${nodeInfo.name})`;
  dialogData.value = [...dialogData.value, val];
};

const canAddOutput = ref(0);
const zoomLevel = ref(0.1);
function zoomin() {
  zoomLevel.value += 0.1;
}
function zoomout() {
  zoomLevel.value -= 0.1;
}
function deleteOutput() {}
function addOutput() {
  console.log("Add Output called..");
  canAddOutput.value++;
}

const drag = (ev) => {
  console.log(ev.target);

  if (ev.type === "touchstart") {
    mobile_item_selec = ev.target
      .closest(".drag-drawflow")
      .getAttribute("data-node");
  } else {
    ev.dataTransfer.setData("node", ev.target.getAttribute("data-node"));
  }
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
