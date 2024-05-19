<script setup lang="ts">
import {IOrderProduct} from "../../stores/orderStore.ts";
import {formattedPrice, getFirstElemOrUndefined, getNumberWithZero} from "../../utils";
import OrderStatus from "../OrderStatus.vue";
import Image from '../Image';
import OrderIcon from "../../assets/svg/OrderIcon.vue";
import CookingIcon from "../../assets/svg/CookingIcon.vue";
import RunningIcon from "../../assets/svg/RunningIcon.vue";
import {openOrderStatus} from "./index.ts";
defineProps<{
  orderItem: IOrderProduct | any
}>();

function getTimeFromProduct(value: number, statuses: any[]): string{
  const objs = statuses.filter(item=>item.attributes.status.value==value);
  if (objs.length >= 1) {
    const date = new Date(Date.parse(objs[0].attributes.created_at.toString()));
    return `${getNumberWithZero(date.getHours())}:${getNumberWithZero(date.getMinutes())}`
  }
  return '-'
}


</script>
<template>
  <article class="bg-black-10 rounded-2xl p-3 flex gap-4">
    <div class="w-[82px] h-[82px] object-cover flex-shrink-0 rounded-lg overflow-hidden">
      <Image class="w-full h-full" :url="getFirstElemOrUndefined(orderItem.included.product.attributes.images)"></Image>
    </div>
    <div class="w-full">
      <header class="text-sm flex justify-between">
        <h3>{{ orderItem.included.product.attributes.name.ru }}</h3>
        <p class="text-xs">х{{orderItem.attributes.quantity}}</p>
      </header>
      <div class="flex justify-between items-center mt-2">
        <div class="flex gap-1">
          <OrderStatus @click="openOrderStatus(orderItem.attributes.status.value)" :time="getTimeFromProduct(1, orderItem.included.statuses.data)" :status="1" :active-status="orderItem.attributes.status.value">
            <OrderIcon color="black" width="16" height="16"></OrderIcon>
          </OrderStatus>
          <div class="h-[2px] mt-4 rounded min-w-[22px] bg-black"></div>
          <OrderStatus @click="openOrderStatus(orderItem.attributes.status.value)" :time="getTimeFromProduct(2, orderItem.included.statuses.data)"  :status="2" :active-status="orderItem.attributes.status.value">
            <CookingIcon color="black" width="16" height="16"></CookingIcon>
          </OrderStatus>
          <div class="h-[2px] mt-4 rounded min-w-[22px] bg-black"></div>
          <OrderStatus @click="openOrderStatus(orderItem.attributes.status.value)" :time="getTimeFromProduct(3, orderItem.included.statuses.data)" :active-status="orderItem.attributes.status.value" :status="3">
            <RunningIcon color="black"  width="16" height="16"></RunningIcon>
          </OrderStatus>
        </div>
        <div>{{formattedPrice(orderItem.attributes.price)}} ₸</div>
      </div>
    </div>
  </article>
</template>

<style scoped>

</style>