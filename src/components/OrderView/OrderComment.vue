<script setup lang="ts">
import {ChevronRightIcon} from "@heroicons/vue/24/outline";
//@ts-ignore run
import VueBottomSheet from "@webzlodimir/vue-bottom-sheet";
import {ref} from 'vue';
import Button from '../Button';


const model = defineModel<string | null>();
const bottomSheet = ref(null);

const open = () => {
  //@ts-ignore
  bottomSheet!.value!.open();
}

const close = () => {
  //@ts-ignore
  bottomSheet!.value!.close();
}

</script>

<template>
  <div>
    <vue-bottom-sheet ref="bottomSheet">
      <div class="p-4">
        <h2 class="font-medium">Комментарий к заказу</h2>
        <textarea class="border mt-[16px] focus:outline-none w-full px-4 py-3 rounded-2xl" v-model="model" placeholder="Комментарий"/>
        <Button class="w-full flex justify-center mt-[24px]" @click="close">Сохранить</Button>
      </div>
    </vue-bottom-sheet>
    <div @click="open" class="flex items-center justify-between cursor-pointer">
      <div>
        <h2 class="font-medium">Комментарий к заказу</h2>
        <p class="text-sm text-[#9999A1]">{{model}}</p>
      </div>
      <div class="p-[5px] rounded-lg bg-[#F4F4F6]">
        <ChevronRightIcon class="w-[20px]"></ChevronRightIcon>
      </div>
    </div>
  </div>


</template>