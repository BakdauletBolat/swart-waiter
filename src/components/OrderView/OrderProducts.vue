<script setup lang="ts">
import {customerProducts} from "../../stores/orderStore.ts";
import OrderItem from "./OrderItem.vue";
import Button from "../Button/index.ts";
import {activeStatus, closeOrderStatus, orderStatusRef} from "./index.ts";
//@ts-ignore
import VueBottomSheet from "@webzlodimir/vue-bottom-sheet";
import OrderStatusFirst from "../../assets/svg/OrderStatusFirst.vue";
import OrderStatusSecond from "../../assets/svg/OrderStatusSecond.vue";
import OrderStatusThird from "../../assets/svg/OrderStatusThird.vue";

const orderStatuses = [
  {
    icon: OrderStatusFirst,
    title: 'Заказ оформлен',
    description: 'Ваш заказ увидели и скоро передадут на кухню                                 '
  },
  {
    icon: OrderStatusSecond,
    title: 'Блюдо готовится',
    description: 'Блюдо уже готовят на кухне, после его передадут официанту и он примчит к вам'
  },
  {
    icon: OrderStatusThird,
    title: 'Блюдо выносят',
    description: 'Официант уже торопится, с минуты на минуту заказ будет у вас                 '
  }
]
</script>

<template>
  <vue-bottom-sheet ref="orderStatusRef">
    <div class="flex px-4 pb-[40px] flex-col items-center justify-center">
      <component :is="orderStatuses[activeStatus].icon"></component>
      <h2 class="text-2xl mt-4">{{orderStatuses[activeStatus].title}}</h2>
      <p class="mt-4 text-sm text-[#9999A1]">{{orderStatuses[activeStatus].description}}</p>
      <Button @click="closeOrderStatus" class="mt-6 w-full justify-center flex">Понятно</Button>
    </div>
  </vue-bottom-sheet>
  <section class="flex flex-col gap-2">
    <OrderItem v-for="orderItem in customerProducts"
               :order-item="orderItem"
               class="bg-black-10 rounded-2xl p-3 flex gap-4">
    </OrderItem>
  </section>
</template>

<style scoped>

</style>