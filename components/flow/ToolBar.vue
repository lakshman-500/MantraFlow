<!-- 
    List of Different Node TYpes
    read from nodetypes.json => Loaded by Composable
    : SHould be coming from any service end point
    Mandatory Elements of Node:
        1. Name -> unique
        2. Class : should be used to identify which Node Template is to be used when dropped on to Designer
 -->
<template></template>

<script setup>
const { nodeTypes } = useNodeTypes();
</script>
