<!-- 
  Launch the Designer
 -->
<template>
  <div class="content-end">
    <ul class="flex mr-[300px] gap-4 justify-end p-1">
      <div class="flex gap-3 border border-outline">
        <button @click="zoomout" class="bg-blue mouse rounded px-2">-</button>
        <label>zoom</label>
        <button @click="zoomin" class="bg-blue mouse rounded px-2">+</button>
      </div>
      <button class="bg-blue mouse rounded px-2">Remove Connection</button>
      <button class="bg-blue mouse rounded px-2">Remove Node</button>
      <button @click="addOutput" class="bg-blue mouse rounded px-2">
        + o/p
      </button>
      <button @click="deleteOutput" class="bg-blue mouse rounded px-2">
        - o/p
      </button>
      <!-- <button class="bg-blue mouse rounded px-2" @click="dialogVisible =">
        Logs
      </button> -->
    </ul>
  </div>
  <div class="w-full flex">
    <div class="w-full mt-1 flex">
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
    <div class="w-[300px]">
      <TabGroup>
        <TabList class="flex gap-4">
          <Tab><div class="bg-blue p-1">Flow JSON</div></Tab>
          <Tab><div class="bg-blue p-1">Logs</div></Tab>
        </TabList>
        <TabPanels>
          <TabPanel> {{ flowData }}</TabPanel>
          <TabPanel>
            <div>
              <ul>
                <li v-for="l in dialogData">{{ l }}</li>
              </ul>
            </div>
          </TabPanel>
          <TabPanel>Content 3</TabPanel>
        </TabPanels>
      </TabGroup>
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
