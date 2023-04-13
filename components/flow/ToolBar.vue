<!-- 
    List of Different Node TYpes
    read from nodetypes.json => Loaded by Composable
    : SHould be coming from any service end point
    Mandatory Elements of Node:
        1. Name -> unique
        2. Class : should be used to identify which Node Template is to be used when dropped on to Designer
 -->
<template>
  <div class="shadow border w-[28rem] mr-10 z-30 bg-gray-100 h-screen p-4">
    <ul>
      <li
        :hidden="index === 0"
        class="drag-drawflow"
        v-for="(n, index) in nodeTypes"
        :key="n"
        draggable="true"
        :data-node="n.code"
        @dragstart="drag($event)"
      >
        <!-- :hidden="`${index} == 0`" -->
        <!-- :style="`background: ${n.color}`" -->
        <div class="px-4 py-3 rounded-md bg-white border-transparent border-gray-200 ring-1 ring-insert ring-gray-200 mb-2" >
          <div class="flex gap-3 items-center">
           
            <img :src="`./${n.icon}.png`" class="w-[35px] h-[35px]" />
          <div>
         <h4 class="mb-1 font-medium text-sm"> {{ n.name }}</h4>
         <p class="text-xs text-gray-500 leading-[1.5]">
          {{ n.description }}
          </p>
        </div>
        </div>
       
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
const { nodeTypes } = defineProps(["nodeTypes"]);

const emits = defineEmits({});
const drag = (ev) => {
  console.log("toolbar : > " + ev);
  emits("addnode", ev);
};
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
  background: white;
  /* transparent; */
}

.node {
  border-radius: 1px;
  border: 1px solid #494949;
  display: block;
  height: 60px;
  line-height: 40px;
  padding: 20px;
  margin: 10px 0px;
  cursor: move;
}
#drawflow_div {
  border: #494949 solid 1px;
  width: 100%;
  height: 690px;
  text-align: initial;
  background: white;
  background-size: 20px 20px;
  background-image: radial-gradient(#dddddd 1px, transparent 1px);
}
</style>
