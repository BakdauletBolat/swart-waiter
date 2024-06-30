<script setup lang="ts">
import {orderStore, customerProducts} from "../../stores/orderStore.ts";
import {formattedPrice} from "../../utils";
import {restorantStore} from "../../stores";
import image from '../../assets/images/ordertotal.png';

</script>

<template>
<section>
  <h2 class="font-medium pt-4">Ваш заказ</h2>
  <div class="flex justify-between mt-4 text-sm">
    <div>Обслуживание 10%</div>
    <p>{{formattedPrice(orderStore.order?.attributes.computation.service)}} ₸</p>
  </div>
  <div class="flex text-[#FFB800] mt-4 justify-between text-sm">
    <div>Скидка</div>
    <p>- {{formattedPrice(orderStore.order?.attributes.computation.discount)}} ₸</p>
  </div>
  <div class="dashed-border-gray"></div>
  <div class="flex text-[20px] mt-4 font-medium justify-between">
    <div>Всего за стол</div>
    <div>{{formattedPrice(orderStore.order?.attributes.computation.total)}} ₸</div>
  </div>
  <div class="w-full h-[25px] mt-[32px]">
    <div  class="w-full h-full background-order" :style="{ backgroundImage: 'url(' + image + ')' }"></div>
  </div>
</section>
</template>

<style scoped>
</style>