<script setup lang="ts">
import {MinusIcon, PlusIcon} from "@heroicons/vue/24/outline";
import {changeQuantityFromBasket, ICardItem, removeFromBasket} from "../../stores/basketStore.ts";
import {formattedPrice} from "../../utils";

const props = defineProps<{good: ICardItem, showPrice: boolean}>();

function changeQuantity(quantity: number) {
  if (quantity <= 0) {
    removeFromBasket(props.good.id);
  }
  changeQuantityFromBasket({
    cart_id: props.good.id,
    quantity: quantity
  })
}

</script>

<template>
  <section class="flex items-center justify-between">
    <div class="w-full flex items-center gap-4 text-center py-2 ">
      <div @click="changeQuantity(good.attributes.quantity - 1)" class="bg-white cursor-pointer p-1 rounded-lg"><MinusIcon  class="w-5 h-5"></MinusIcon></div>
      <div>{{good.attributes.quantity}}</div>
      <div @click="changeQuantity(good.attributes.quantity + 1)" class="bg-white cursor-pointer p-1 rounded-lg"><PlusIcon class="w-5 h-5"></PlusIcon></div>
    </div>
    <div class="font-medium white-space-pre text-nowrap" v-if="showPrice">
      {{formattedPrice(good.attributes.price * good.attributes.quantity)}} ₸
    </div>
  </section>
</template>

<style scoped>

</style>