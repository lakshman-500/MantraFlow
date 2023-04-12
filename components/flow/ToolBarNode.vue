<!-- 
  Node Display 
  1) Icon
  2) Title
  3) Probably a tooltip with more info and usage tips
 -->
<template>
  <div ref="el">
    <component
      :is="nodeType == 'Basic' ? basicComp : altComp"
      :nodeSelected="nodeSelected"
    />
  </div>
</template>

<script setup>
import {
  defineComponent,
  onMounted,
  getCurrentInstance,
  readonly,
  ref,
  nextTick,
} from "vue";

const { nodeTypes } = useNodeTypes();
const nodeType = ref("");

const el = ref(null);
const nodeId = ref(0);
let df = null;

const nodeSelected = ref({});

const dataNode = ref({});

//df = getCurrentInstance().appContext.config.globalProperties.$df.value;

const updateSelect = (value) => {
  dataNode.value.data.method = value;
  df.updateNodeDataFromId(nodeId.value, dataNode.value);
};
const basicComp = ref();
const altComp = ref();
onMounted(async () => {
  df = getCurrentInstance().appContext.config.globalProperties.$df.value;
  await nextTick();
  nodeId.value = el.value.parentElement.parentElement.id.slice(5);
  dataNode.value = df.getNodeFromId(nodeId.value);
  console.log(dataNode.value.name);

  nodeSelected.value = nodeTypes.find((ele) => ele.name == dataNode.value.name);

  console.log(nodeSelected.value);

  if (
    nodeSelected.value.template === undefined ||
    nodeSelected.value.template === null ||
    nodeSelected.value.template === "" ||
    nodeSelected.value.template === "Basic"
  ) {
    nodeType.value = "Basic";
    basicComp.value = resolveComponent("TemplateBasic");
  } else {
    nodeType.value = nodeSelected.value.template;
    altComp.value = resolveComponent("TemplateSendEmail");
  }
  await nextTick();
});
</script>
