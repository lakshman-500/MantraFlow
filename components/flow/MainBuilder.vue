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
          <!-- <div id="#messages">
            <ul>
              <li v-for="l in dialogData">{{ l }}</li>
            </ul>
          </div> -->
          <div id="#flowJson">
            {{ flowData }}
            <!-- <ul>
      <li v-for="l in dialogData">{{ l }}</li>
    </ul> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
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
  // { name: "Messages", href: "#messages", current: true },
  { name: "Flow Json.", href: "#flowJson", current: false },
];
</script>
