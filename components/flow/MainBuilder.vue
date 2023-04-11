<!-- 
  Launch the Designer
 -->
<template>
  <div>
    <FlowDesigner @nodeSelected="nodeSelected" :nodeTypes="nodeTypes" />
  </div>
</template>

<script setup>
const { nodeTypes } = useNodeTypes();

const nodeSelected = (nodeInfo) => {
  console.log(`"Node Selected is  (${nodeInfo.id}, ${nodeInfo.name})`);
};
</script>
