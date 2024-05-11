<script setup lang="ts">
import {orderStore, customerProducts} from "../../stores/orderStore.ts";
import {formattedPrice} from "../../utils";


function getUserTotal(): number {
  let total = 0;
  customerProducts.value.forEach((product)=>{
    total+=product.attributes.price * product.attributes.quantity;
  });
  return total;
}
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
  <div class="flex mt-4 font-medium justify-between ">
    <div>Сумма вашего заказа</div>
    <p>{{formattedPrice(getUserTotal())}} ₸</p>
  </div>
  <div class="dashed-border-gray"></div>
  <div class="flex text-[20px] mt-4 font-medium justify-between">
    <div>Всего за стол</div>
    <div>{{formattedPrice(orderStore.order?.attributes.computation.total)}} ₸</div>
  </div>
  <div class="w-full h-[25px] mt-[32px]">
    <div  class="w-full h-full background-order"></div>
  </div>
  <div class="mt-[150px]"></div>
</section>
</template>

<style scoped>
.background-order {
  //background: url("./assets/ordertotal.png");
}
</style>