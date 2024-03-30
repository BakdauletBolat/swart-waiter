<template>
    <article class="bg-[#F4F4F6] p-3 gap-4 rounded-2xl flex">
        <div>
            <Image class="w-[82px] rounded-2xl h-[82px]" :url="good.url"></Image>
        </div>
        <div class="flex flex-col justify-between w-full">
            <section>
                <h3 class="text-sm">{{ good }}</h3>
            </section>
<!--          <section class="flex items-center justify-between">-->
<!--              <div class="w-full flex items-center gap-4 text-center py-2 ">-->
<!--                <div @click="changeQuantity({-->
<!--                product_id: good.product_id,-->
<!--                quantity: good.quantity - 1-->
<!--                })" class="bg-white cursor-pointer p-1 rounded-2xl"><MinusIcon  class="w-5 h-5"></MinusIcon></div>-->
<!--                <div>{{good.quantity}}</div>-->
<!--                <div @click="changeQty(good)" class="bg-white cursor-pointer p-1 rounded-2xl"><PlusIcon class="w-5 h-5"></PlusIcon></div>-->
<!--              </div>-->
<!--            <div class="font-medium text-nowrap">-->
<!--              {{good.price * good.quantity}} ₸-->
<!--            </div>-->
<!--          </section>-->
        </div>
    </article>
</template>
<script lang="ts" setup>
import Image from '../Image';
import {PlusIcon, MinusIcon} from "@heroicons/vue/24/outline";
import {changeQuantity, IGood} from "../../stores";
defineProps<{good: IGood}>();

const emit = defineEmits(['changedQuantity']);

function changeQty(good: IGood) {
  console.log(good);
}
</script>