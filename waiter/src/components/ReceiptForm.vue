<script setup lang="ts">
import BillIcon from "../assets/svg/BillIcon.vue";
import {loadReceiptOrder, orderStore} from "@/stores/orderStore.ts";
import {formattedPrice, getNumberWithZero} from "@/utils";
import {onMounted} from "vue";

const props =defineProps(['token', 'hideInfo']);

onMounted(()=>{
  loadReceiptOrder(props.token.replace(' ', '+'));
});

function getDate(date?: string) {
  if (date != undefined) {
    const newD = new Date(Date.parse(date!));
    return `${getNumberWithZero(newD.getDate())}.${getNumberWithZero(newD.getMonth())}.${getNumberWithZero(newD.getFullYear())}`
  }
  return '';
}

function getTime(date?: string) {
  if (date != undefined) {
    const newD = new Date(Date.parse(date!));
    return `${getNumberWithZero(newD.getHours())}:${getNumberWithZero(newD.getSeconds())}`
  }
  return '';
}

</script>

<template>
  <div class="bg-white px-4 py-6 rounded-2xl" v-if="orderStore.receiptOrder">
    <div v-if="!hideInfo" class="flex justify-between text-xs text-[#9999A1]">
      <span>{{getDate(orderStore.receiptOrder?.attributes.created_at)}}</span>
      <span>{{getTime(orderStore.receiptOrder?.attributes.created_at)}}</span>
    </div>
    <div v-if="!hideInfo" class="flex flex-col items-center mt-4">
      <BillIcon color="black" width="24" height="24"></BillIcon>
      <h2 class="text-xl mt-2 font-medium">{{orderStore.receiptOrder!.included.restaurant.attributes.name}}</h2>
      <p class="mt-1 text-sm">{{orderStore.receiptOrder!.included.restaurant.attributes.description}}</p>
    </div>
    <div v-if="!hideInfo" class="flex gap-4 text-xs text-[#9999A1] mt-4">
      <span>Стол: {{ orderStore.receiptOrder!.attributes.number }}</span>
      <span>Гостей: {{orderStore.receiptOrder!.included.customer?.data?.length}}</span>
    </div>
    <div class="h-[16px]"></div>
    <div class="w-full">
      <!--      <h2 class="font-medium py-2">{{ getNameByUUID(key.toString()) }}</h2>-->
      <table class="w-full">
        <tbody>
        <tr v-for="position in orderStore.receiptOrder!.included.positions.data">
          <td class="py-2">{{position.included.product.attributes.name.ru}}</td>
          <td class="p-2 align-text-top">{{position.attributes.quantity}}x</td>
          <td class="py-2 text-right align-text-top white-space-pre text-nowrap">{{formattedPrice(position.attributes.price)}} ₸</td>
        </tr>

        </tbody>
      </table>
    </div>
    <div class="dashed-border-gray"></div>
    <div>
      <div class="flex text-sm justify-between mt-4">
        <span>Обслуживание 10%</span>
        <span>{{ orderStore?.receiptOrder?.attributes.computation.service }} ₸</span>
      </div>
      <div class="flex text-sm text-[#FFB800] justify-between mt-4">
        <span>Скидка</span>
        <span>- {{ orderStore?.receiptOrder?.attributes.computation.discount }} ₸</span>
      </div>
      <div class="dashed-border-gray"></div>
      <div class="flex font-bold text-xl justify-between mt-4">
        <span>Итог</span>
        <span>{{ orderStore?.receiptOrder?.attributes.computation.total }} ₸</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>