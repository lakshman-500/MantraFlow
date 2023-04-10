<template>

    <div class="mx-auto mt-4 max-w-7xl space-y-4 px-4 xs:px-8 sm:px-10 lg:px-16 pb-16 w-4/5">
        <div class="mt-32 flex">

          <!--Node Types List..-->
          <div class="shadow border w-64 mr-10 z-30 h-[290px]">
       
              <p class="drag-drawflow mb-4 border border-blue rounded px-3 py-1"
           v-for="f in nodeTypes" :key="f" 
           draggable="true"
             :data-node="f.item" @dragstart="drag($event)"                        
             >
             
                   <div class="node flex" :style="`background: ${f.color}`"  >         
                             
                    <img class="w-7" src="~/assets/images/i1.png"  />
                    {{ f.name }}   
                </div>
                <!-- {{ f.name }} -->
            </p>  
            <!-- <NodeData/>   -->
             <!-- @add-node="(d)=>addNode(d)"/>   -->
      
          </div>

          <!--Drawing Board-->
          <div  class="w-full bg-white">
            <!-- <div class="shadow border w-full overflow-hidden mb-5 cursor-pointer h-[600px]">
              <div class="h-full"> -->
                <div id="drawflow_div" ref="drawflow_div"
                 @drop="drop($event)" @dragover="allowDrop($event)"
                >                  
                </div>
              <!-- </div>
            </div> -->
          </div>

        </div>
    </div>


</template>

<!-- <template>
    <div id="drawflow_div"></div>
</template> -->

<script setup>
import Drawflow from 'drawflow'
import styleDrawflow from 'drawflow/dist/drawflow.min.css?inline'
import { onMounted, shallowRef, h, getCurrentInstance, render, readonly, ref } from 'vue'
import BaseNode from './flow/BaseNode.vue'

const {nodeTypes} = useNodeTypes()

const editor = shallowRef({})
const internalInstance = getCurrentInstance()
const Vue = { version: 3, h, render };

internalInstance.appContext.app._context.config.globalProperties.$df = editor;
const getImage = (s)=>{
    return "~/assets/images/" + s + ".png";
}
onMounted(() => {
    console.log("Mounted..")
    var elements = document.getElementsByClassName('drag-drawflow');
      for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('touchend', drop, false);
        elements[i].addEventListener('touchmove', positionMobile, false);
        elements[i].addEventListener('touchstart', drag, false );
      }


   const id = document.getElementById("drawflow_div");
    editor.value = new Drawflow(id, Vue, internalInstance.appContext.app._context);
    editor.value.start();

    editor.value.registerNode('BaseNode', BaseNode, {}, {});
    editor.value.addNode('test', 1, 2, 100, 300, 'test', {}, '<div>He l lo</div>');
    editor.value.addNode('BaseNode', 1, 2, 150, 320, 'test', {}, 'BaseNode', 'vue');

});
   
const drag = (ev) => {
      if (ev.type === "touchstart") {
        mobile_item_selec = ev.target.closest(".drag-drawflow").getAttribute('data-node');
      } else {
        console.log(ev.target.getAttribute('data-node'))
      ev.dataTransfer.setData("node", ev.target.getAttribute('data-node'));
      }
    }

 const drop = (ev) => {
      if (ev.type === "touchend") {
        var parentdrawflow = document.elementFromPoint( mobile_last_move.touches[0].clientX, mobile_last_move.touches[0].clientY).closest("#drawflow");
        if(parentdrawflow != null) {
                 console.log("printing mobile_item_selec: " +mobile_item_selec)
          addNodeToDrawFlow(mobile_item_selec, mobile_last_move.touches[0].clientX, mobile_last_move.touches[0].clientY);
        }
        mobile_item_selec = '';
      } else {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("node");
          console.log("printing data: " + data)
        addNodeToDrawFlow(data, ev.clientX, ev.clientY);
      }

    }
    const allowDrop = (ev) => {
      ev.preventDefault();
    }

       let mobile_item_selec = '';
   let mobile_last_move = null;
   function positionMobile(ev) {
     mobile_last_move = ev;
   }
 
//    const  addNode = (n)=>{
//         // console.log(n);
//         drag(n);
//    }

   function addNodeToDrawFlow(name, pos_x, pos_y) {
      pos_x = pos_x * ( editor.value.precanvas.clientWidth / (editor.value.precanvas.clientWidth * editor.value.zoom)) - (editor.value.precanvas.getBoundingClientRect().x * ( editor.value.precanvas.clientWidth / (editor.value.precanvas.clientWidth * editor.value.zoom)));
      pos_y = pos_y * ( editor.value.precanvas.clientHeight / (editor.value.precanvas.clientHeight * editor.value.zoom)) - (editor.value.precanvas.getBoundingClientRect().y * ( editor.value.precanvas.clientHeight / (editor.value.precanvas.clientHeight * editor.value.zoom)));
    
      const nodeSelected = listNodes.find(ele => ele.item == name);
      editor.value.addNode(name, nodeSelected.input,  nodeSelected.output, pos_x, pos_y, name, {}, name, 'vue');
      
    }

</script>


<style scoped>
#drawflow_div {
    width: 100%;
    height: 600px ;
    border: 1px solid red;
}
</style>