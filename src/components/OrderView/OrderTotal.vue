<script setup lang="ts">
import {orderStore} from "../../stores/orderStore.ts";
</script>

<template>
<section>
  <h2 class="font-medium pt-4">Ваш заказ</h2>
  <div class="flex justify-between mt-4 text-sm">
    <div>Обслуживание 10%</div>
    <p>{{orderStore.order?.attributes.computation.service}} ₸</p>
  </div>
  <div class="flex text-[#FFB800] mt-4 justify-between text-sm">
    <div>Скидка</div>
    <p>- {{orderStore.order?.attributes.computation.discount}} ₸</p>
  </div>
  <div class="flex mt-4 font-medium justify-between ">
    <div>Сумма вашего заказа</div>
    <p>{{orderStore.order?.attributes.computation.summa}} ₸</p>
  </div>
  <div class="dashed-border-gray"></div>
  <div class="flex text-[20px] mt-4 font-medium justify-between">
    <div>Всего за стол</div>
    <div>{{orderStore.order?.attributes.computation.total}} ₸</div>
  </div>
  <div class="mt-[100px]">
    <img alt="" class="background-order"/>
  </div>
</section>
</template>

<style scoped>

</style>