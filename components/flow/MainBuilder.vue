<!-- 
  Launch the Designer
 -->
<template>
  <div
    class=""
  >
    <div class=" sticky top-0 z-50">
     
      <div class="flex justify-between bg-gray-950 py-[8px] top-5 right-[17rem]">
        <button @click="sideNav = !sideNav" type="button" class="rounded px-3 bg-gray-800  border hover:bg-gray-800 ml-4 border-gray-800">
          <img src="@/burger.png" class="w-[25px]">
        </button>
        <div class="flex gap-2">
          <div class="flex gap-2 border border-outline rounded-md items-center border-gray-800">
          <button @click="zoomout" class="bg-gray-800 mouse px-3 rouned-s-md text-white">
            -
          </button>
          <label class="text-gray-400 text-sm">{{zoomLevel}}</label>
          <button @click="zoomin" class="bg-gray-800 mouse px-3 rouned-s-md text-white">
            +
          </button>
        </div>
          <div class="overflow-hidden relative">
	<button class="relative hover:border-dashed text-white text-sm cursor-pointer border border-gray-800 rounded-md bg-gray-800 py-2 px-4 w-full inline-flex items-center">
     	<svg class="fill-white" fill="#FFF" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
        	<path d="M0 0h24v24H0z" fill="none"/>
            <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/>
        </svg>
        <span class="ml-2">Upload Document</span>
        <input
          class="absolute border border-outline flex gap-2 left-0 opacity-0 right-0 rounded-md w-full cursor-pointer"
          type="file"
          ref="doc"
          @change="readFile()"
        />
    </button>
  
</div>
        <button class="bg-gray-800 mouse rounded px-3 text-sm border border-gray-800 text-white">
          Remove Connection
        </button>
        <button class="bg-gray-800 mouse rounded px-3 text-sm border border-gray-800 text-white">
          Remove Node
        </button>
        <button
          @click="addOutput"
          class="bg-gray-800 mouse rounded px-3 text-sm border border-gray-800 text-white"
        >
          + o/p
        </button>
        <button
          @click="deleteOutput"
          class="bg-gray-800 mouse rounded px-3 text-sm border border-gray-800 text-white"
        >
          - o/p
        </button>
        <button @click="sideJson = !sideJson" type="button" class="mr-4 bg-gray-800 mouse rounded px-3 text-sm border border-gray-800 text-white"> <img src="@/apps.png" class="w-[25px]"></button>
       </div>
       <!-- <button class="bg-blue mouse rounded px-2" @click="dialogVisible =">
        Logs
      </button> -->
      </div>
    </div>
    <div class="w-full flex h-screen bg-gray-950 bg-[length:60px] bg-[url('https://storage.googleapis.com/static.helloumi.com/daisho/img/grid.png')]">
      <div class="w-full flex">
        <FlowToolBar v-if="sideNav" @addnode="drag" :nodeTypes="nodeTypes" class="w-[1/4]" />
        <FlowDesigner
          class="w-[3/4]"
          @nodeSelected="nodeSelected"
          @connectionSelected="connectionSelected"
          :nodeTypes="nodeTypes"
          @nodeAdded="nodeAdded"
          @flowDataChanged="flowDataChanged"
          :zoomLevel="zoomLevel"
          :canAddOutput="canAddOutput"
          :flowData="content"
        />
      </div>
      <div v-if="sideJson" class="w-[300px] bg-gray-100 max-h-screen overflow-auto p-3">
        <div class="p-3 bg-white rounded-md">
          <TabGroup>
            <TabList class="flex space-x-2 p-2 bg-gray-100 rounded-md">
              <Tab v-slot="{ selected }">
                <span
                  :class="{
                    ' bg-white text-indigo-500 px-3 py-1 font-medium rounded text-sm outline-none':
                      selected,
                    'rounded-md text-sm px-3 py-1 bg-gray-100 text-black outline-none':
                      !selected,
                  }"
                >
                  Json
                </span></Tab
              >
              <Tab v-slot="{ selected }">
                <span
                  :class="{
                    'bg-white text-indigo-500 px-3 py-1 font-medium rounded text-sm outline-none':
                      selected,
                    'rounded-md text-sm px-3 py-1 bg-gray-100 text-gray-500 outline-none focus:outline-none':
                      !selected,
                  }"
                >
                  Logs
                </span></Tab
              >
              <Tab v-slot="{ selected }">
                <span
                  :class="{
                    'bg-white text-indigo-500 px-3 py-1 font-medium rounded text-sm outline-none':
                      selected,
                    'rounded-md text-sm px-3 py-1 bg-gray-100 text-gray-500 outline-none focus:outline-none':
                      !selected,
                  }"
                >
                  File
                </span></Tab
              >
            </TabList>
            <TabPanels>
              <TabPanel class="text-sm pt-3 text-gray-700">
                {{ flowData }}</TabPanel
              >
              <TabPanel class="text-sm pt-3 text-gray-700">
                <div>
                  <ul>
                    <li
                      v-for="l in dialogData"
                      class="border-b py-2 text-sm border-gray-100"
                    >
                      {{ l }}
                    </li>
                  </ul>
                </div>
              </TabPanel>
              <TabPanel>{{ content }}</TabPanel>
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
  console.log(
    `Node (${nodeInfo.id}, ${nodeInfo.name}, ${nodeInfo.inputs}, ${nodeInfo.outputs})`
  );
  var ostr = JSON.stringify(nodeInfo.outputs);
  console.log("o/p connections: " + ostr);
  var outNodes = {};
  outNodes = JSON.parse(ostr);
  for (let x in outNodes) {
    console.log(x + " : " + outNodes[x]);
    var p = outNodes[x];
    for (let y in p) {
      console.log(y + " : " + p[y]);
      let b = p[y];
      // b.foreach((index, e) => {
      //   console.log("****************** " + JSON.stringify(e[index]));
      // });
      let i = 0;
      while (i < b.length) {
        console.log("****************** " + JSON.stringify(b[i]));
        i++;
      }
    }
  }
  // console.log(
  //   "o/p connections parsed..: " + JSON.stringify(outNodes["output_1"])
  // );
  // console.log("" + JSON.stringify(outNodes[0].connections));

  var val = `Node (${nodeInfo.id}, ${nodeInfo.name})`;
  dialogData.value = [...dialogData.value, val];
};
const connectionSelected = (output_id, input_id, ouput_class, input_class) => {
  console.log("connection selected: " + output_id);
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

const content = ref(null);
const file = ref(null);
const doc = ref(null);
function readFile() {
  console.log("document loaded: " + doc);
  file.value = doc.value.files[0];
  const reader = new FileReader();
  if (file.value.name.includes(".txt") || file.value.name.includes(".json")) {
    reader.onload = (res) => {
      content.value = res.target.result;
      console.log(content.value);
      nextTick();
      //  editor.value.import(content.value);
    };
    reader.onerror = (err) => console.log(err);
    reader.readAsText(file.value);
  } else {
    content.value = "check the console for file output";
    reader.onload = (res) => {
      console.log(res.target.result);
      //console.log(content.value);
      nextTick();
    };
    reader.onerror = (err) => console.log(err);
    reader.readAsText(file.value);
  }
}
const sideNav = ref(true)
const sideJson = ref(false)
</script>
