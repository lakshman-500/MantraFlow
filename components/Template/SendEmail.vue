
 <template>
  <div>
    <div class="text-gray-900">
    <div class="flex gap-4 mb-6 items-center">
      <img :src="`./${nodeSelected.icon}.png`"  class="w-[40px] h-[40px]" />
      <h4 class="text-2xl font-medium ">{{ nodeSelected.name }}</h4>
    </div>
  </div>
  <div ref="el" class="border border-dashed border-gray-400 rounded-md p-2">
 
      <div>
        <input  class="px-3 mb-2 block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-gray-400 ring-1 ring-inset  placeholder:text-gray-500 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Email Address"/>        
        </div>
      <TemplateBasicDialog :header="'Send Email...'">
      <template #nodeDialogTemplate>      
        <TemplateSendMailComp />
      </template>
    </TemplateBasicDialog>
  </div>
  </div>
</template>

<script setup>
const { nodeSelected } = defineProps(["nodeSelected"]);
onMounted(async () => {
  console.log("received node data: " + nodeSelected);
  await nextTick();
});
</script>  

