<script setup lang="ts">
import Button from '../components/Button';
import BillIcon from "../assets/svg/BillIcon.vue";
import {onMounted} from "vue";
import {loadOrder, loadOrderProducts, orderStore, otherProducts} from "../stores/orderStore.ts";
import {loadRestaurant, restorantStore} from "../stores/restorantStore.ts";

onMounted(()=>{
  loadOrder();
  loadOrderProducts();
  loadRestaurant()
});

function getNameByUUID(uuid: string) {
  let name = '';
  orderStore.products.forEach((item)=>{
    if (item.attributes.waiter_id != null && item.attributes.waiter_id == parseInt(uuid)) {
      //@ts-ignore
      name = item.included.waiter.attributes.first_name;
    }
    else if (item.included.customer?.attributes.uuid == uuid) {
      name = item.included.customer.attributes.full_name;
    }
  });
  return name;
}


</script>

<template>
<main class="bg-[#F4F4F6] p-4 min-h-screen">
  <div class="bg-white px-4 py-6 rounded-2xl">
    <div class="flex justify-between text-xs text-[#9999A1]">
      <span>15.06.2024</span>
      <span>15:55</span>
    </div>
    <div class="flex flex-col items-center mt-4" v-if="restorantStore">
      <BillIcon color="black" width="24" height="24"></BillIcon>
      <h2 class="text-xl mt-2 font-medium">{{restorantStore?.attributes.name}}</h2>
      <p class="mt-1 text-sm">{{restorantStore?.attributes.description}}</p>
    </div>
    <div class="flex gap-4 text-xs text-[#9999A1] mt-4">
      <span>Стол: {{ orderStore?.order?.attributes.number }}</span>
      <span>Гостей: {{orderStore.products.length}}</span>
    </div>
    <div class="h-[16px]"></div>
    <div class="w-full" v-if="orderStore?.products" v-for="(products, key) in otherProducts">
      <h2 class="font-medium py-2">{{ getNameByUUID(key.toString()) }}</h2>
      <table class="w-full">
        <tbody>

          <tr v-for="product in products">
            <td class="py-2">{{product.included.product.attributes.name.ru}}</td>
            <td class="p-2 align-text-top">{{product.attributes.quantity}}x</td>
            <td class="py-2 text-right align-text-top text-nowrap">{{product.attributes.price}} ₸</td>
          </tr>

        </tbody>
      </table>
    </div>
    <div class="dashed-border-gray"></div>
    <div v-if="orderStore?.order">
      <div class="flex text-sm justify-between mt-4">
        <span>Обслуживание 10%</span>
        <span>{{ orderStore?.order?.attributes.computation.service }} ₸</span>
      </div>
      <div class="flex text-sm text-[#FFB800] justify-between mt-4">
        <span>Скидка</span>
        <span>- {{ orderStore?.order?.attributes.computation.discount }} ₸</span>
      </div>
      <div class="dashed-border-gray"></div>
      <div class="flex font-bold text-xl justify-between mt-4">
        <span>Итог</span>
        <span>{{ orderStore?.order?.attributes.computation.total }} ₸</span>
      </div>
    </div>
  </div>
  <div class="fixed w-full left-0 bottom-[40px] px-4">
    <Button class="w-full flex justify-center">
      Скачать чек
    </Button>
  </div>
  <div class="h-[100px]"></div>
</main>
</template>

<style scoped>

</style>