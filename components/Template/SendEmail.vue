
 <template>
    <div class="title-box color-black">
    <b>{{ nodeSelected.name }}</b>
  </div>
  <div ref="el" class="border bg-red">
            <p class="border bg-red">
      <div>
        <input  class="color-black" placeholder="Email Address"/>        
        </div>
    </p>
      <TemplateBasicDialog :header="'Send Email...'">
      <template #nodeDialogTemplate>      
        <TemplateSendMailComp />
      </template>
    </TemplateBasicDialog>
  </div>
</template>

<script setup>
const { nodeSelected } = defineProps(["nodeSelected"]);
onMounted(async () => {
  console.log("received node data: " + nodeSelected);
  await nextTick();
});
</script>  

