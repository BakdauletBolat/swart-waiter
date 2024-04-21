<template>
   <div class="flex relative">
     <article ref="el"
              :class="{
                '-translate-x-[82px]': isSwiped
              }"
              class="bg-[#F4F4F6] z-50 w-full h-full border-2 border-[#F4F4F6]  p-3 gap-4 rounded-2xl flex">
       <div>
         <Image class="w-[82px] rounded-2xl h-[82px]" :url="undefined"></Image>
       </div>
       <div class="flex flex-col justify-between w-full">
         <section>
           <h3 class="text-sm">{{good.included.product?.attributes.name.ru}}</h3>
         </section>
         <ChangeBasketCardComponent :show-price="true" :good="good"></ChangeBasketCardComponent>
       </div>
     </article>
     <div @click="remove(good.id)" class="absolute flex justify-end pr-[29px] items-center w-full rounded-2xl bg-[#FF1F00] h-full">
       <RemoveIcon color="white" width="24" height="24"></RemoveIcon>
     </div>
   </div>
</template>
<script lang="ts" setup>
import Image from '../Image';
import {ICardItem, removeFromBasket} from "../../stores/basketStore.ts";
import {useSwipe} from "@vueuse/core";
import {ref, watchEffect} from "vue";
import RemoveIcon from "../../assets/svg/RemoveIcon.vue";
import ChangeBasketCardComponent from "./ChangeBasketCardComponent.vue";

defineProps<{good: ICardItem}>();
const el = ref(null);
const isSwiped = ref(0);
const {  lengthX  } = useSwipe(el);
watchEffect(()=>{
  if (lengthX.value + lengthX.value > 80) {
    isSwiped.value = lengthX.value;
  }
  else {
    isSwiped.value = 0;
  }
})

function remove(pk: number) {
  removeFromBasket(pk)
}

</script>