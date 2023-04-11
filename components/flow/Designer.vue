<template>
  <div
    class="mx-auto mt-4 max-w-7xl space-y-4 px-4 xs:px-8 sm:px-10 lg:px-16 pb-16 w-4/5"
  >
    <div class="mt-32 flex">
      <!--Node Types List..-->

      <div class="shadow border w-64 mr-10 z-30 h-[290px] bg-red-100">
        <ul>
          <li
            class="drag-drawflow mb-4"
            v-for="n in nodeTypes"
            :key="n"
            draggable="true"
            :data-node="n.item"
            @dragstart="drag($event)"
          >
            <div class="node flex" :style="`background: ${n.color}`">
              <!-- <img class="w-7" src="~/assets/images/i1.png"  /> -->
              {{ n.name }}
            </div>
          </li>
        </ul>
      </div>

      <!--Drawing Board-->
      <div class="w-full bg-white">
        <div
          id="drawflow_div"
          ref="drawflow_div"
          @drop="drop($event)"
          @dragover="allowDrop($event)"
        ></div>
      </div>
    </div>
  </div>
</template>

<!-- <template>
    <div id="drawflow_div"></div>
</template> -->

<script setup>
import Drawflow from "drawflow";
import styleDrawflow from "drawflow/dist/drawflow.min.css?inline";

import {
  onMounted,
  shallowRef,
  h,
  getCurrentInstance,
  render,
  readonly,
  ref,
} from "vue";
import ToolBarNode from "./ToolBarNode.vue";

const { nodeTypes } = useNodeTypes();

const editor = shallowRef({});
const internalInstance = getCurrentInstance();
const Vue = { version: 3, h, render };

internalInstance.appContext.app._context.config.globalProperties.$df = editor;
const getImage = (s) => {
  return "~/assets/images/" + s + ".png";
};
const dialogVisible = ref(false);
const dialogData = ref({});

onMounted(() => {
  var elements = document.getElementsByClassName("drag-drawflow");
  for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener("touchend", drop, false);
    elements[i].addEventListener("touchmove", positionMobile, false);
    elements[i].addEventListener("touchstart", drag, false);
  }

  const id = document.getElementById("drawflow_div");
  editor.value = new Drawflow(
    id,
    Vue,
    internalInstance.appContext.app._context
  );
  editor.value.start();

  editor.value.registerNode("ToolBarNode", ToolBarNode, {}, {});
  // editor.value.registerNode("Node2", Node2, {}, {});
  // editor.value.registerNode("Node3", Node3, {}, {});

  //  editor.value.import({"drawflow":{"Home":{"data":{"5":{"id":5,"name":"Node2","data":{"script":"(req,res) => {\n console.log(req);\n}"},"class":"Node2","html":"Node2","typenode":"vue","inputs":{"input_1":{"connections":[{"node":"6","input":"output_1"}]}},"outputs":{"output_1":{"connections":[]},"output_2":{"connections":[]}},"pos_x":1000,"pos_y":117},"6":{"id":6,"name":"Node1","data":{"url":"localhost/add", "method": "post"},"class":"Node1","html":"Node1","typenode":"vue","inputs":{},"outputs":{"output_1":{"connections":[{"node":"5","output":"input_1"}]}},"pos_x":137,"pos_y":89}}}}})
});

function exportEditor() {
  dialogData.value = editor.value.export();
  dialogVisible.value = true;
}

const drag = (ev) => {
  if (ev.type === "touchstart") {
    mobile_item_selec = ev.target
      .closest(".drag-drawflow")
      .getAttribute("data-node");
  } else {
    ev.dataTransfer.setData("node", ev.target.getAttribute("data-node"));
  }
};
const drop = (ev) => {
  if (ev.type === "touchend") {
    var parentdrawflow = document
      .elementFromPoint(
        mobile_last_move.touches[0].clientX,
        mobile_last_move.touches[0].clientY
      )
      .closest("#drawflow");
    if (parentdrawflow != null) {
      addNodeToDrawFlow(
        mobile_item_selec,
        mobile_last_move.touches[0].clientX,
        mobile_last_move.touches[0].clientY
      );
    }
    mobile_item_selec = "";
  } else {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("node");
    addNodeToDrawFlow(data, ev.clientX, ev.clientY);
  }
};
const allowDrop = (ev) => {
  ev.preventDefault();
};

let mobile_item_selec = "";
let mobile_last_move = null;
function positionMobile(ev) {
  mobile_last_move = ev;
}

function addNodeToDrawFlow(name, pos_x, pos_y) {
  pos_x =
    pos_x *
      (editor.value.precanvas.clientWidth /
        (editor.value.precanvas.clientWidth * editor.value.zoom)) -
    editor.value.precanvas.getBoundingClientRect().x *
      (editor.value.precanvas.clientWidth /
        (editor.value.precanvas.clientWidth * editor.value.zoom));
  pos_y =
    pos_y *
      (editor.value.precanvas.clientHeight /
        (editor.value.precanvas.clientHeight * editor.value.zoom)) -
    editor.value.precanvas.getBoundingClientRect().y *
      (editor.value.precanvas.clientHeight /
        (editor.value.precanvas.clientHeight * editor.value.zoom));

  const nodeSelected = nodeTypes.find((ele) => ele.item == name);
  editor.value.addNode(
    nodeSelected.name,
    nodeSelected.input,
    nodeSelected.output,
    pos_x,
    pos_y,
    name,
    {},
    "ToolBarNode",
    "vue"
  );

  // editor.value.addNode(
  //   name,
  //   nodeSelected.input,
  //   nodeSelected.output,
  //   pos_x,
  //   pos_y,
  //   "ToolBarNode",
  //   {},
  //   name,
  //   "vue"
  // );
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #494949;
}
.container {
  min-height: calc(100vh - 100px);
}
.column {
  border-right: 1px solid #494949;
}
.column ul {
  padding-inline-start: 0px;
  padding: 10px 10px;
}
.column li {
  background: transparent;
}

.node {
  border-radius: 8px;
  border: 2px solid #494949;
  display: block;
  height: 60px;
  line-height: 40px;
  padding: 10px;
  margin: 10px 0px;
  cursor: move;
}
#drawflow_div {
  width: 100%;
  height: 690px;
  text-align: initial;
  background: #2b2c30;
  background-size: 20px 20px;
  background-image: radial-gradient(#494949 1px, transparent 1px);
}
</style>
