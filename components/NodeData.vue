<script setup>
const { nodeTypes } = useNodeTypes();

const emits = defineEmits(["emitnode"]);

const addnode = (ev, f) => {
  let mobile_item_selec = "";
  let mobile_last_move = null;
  if (ev.type === "touchstart") {
    mobile_item_selec = ev.target
      .closest(".drag-drawflow")
      .getAttribute("data-node");
  } else {
    console.log(ev.target.getAttribute("data-node"));
    ev.dataTransfer.setData("node", ev.target.getAttribute("data-node"));
  }
  console.log(mobile_item_selec);
  console.log(f.name);
  emits("emitnode", ev, f, mobile_item_selec);
};
</script>

<template>
  <div class="w-full">
    <p
      class="drag-drawflow mb-4 border border-blue rounded px-3 py-1"
      v-for="f in nodeTypes"
      :key="f"
      draggable="true"
      :data-node="f.item"
      @dragstart="addnode($event, f)"
    >
      {{ f.name }} --
    </p>
  </div>
</template>
