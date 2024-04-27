<script setup lang="ts">
import Button from '../components/Button';
import WaiterCard from "../assets/svg/WaiterCard.vue";
import {useRoute, useRouter} from "vue-router";
import CashIcon from "../assets/svg/CashIcon.vue";
const route = useRoute();
const router = useRouter();
const paymentsTypes = [
  {
    id: 1,
    name: 'Наличными официанту',
    component: CashIcon
  },
  {
    id: 2,
    name: 'Картой официанту',
    component: WaiterCard
  }
]

function navigateTo() {
  router.push({
    name: 'review-view',
    params: {
      orderId: route.params.orderId
    }
  })
}

</script>

<template>
  <main class="bg-[#F4F4F6] p-4 min-h-screen flex flex-col justify-center items-center">
    <div class="bg-white flex h-full flex-col items-center p-4 w-full rounded-3xl">
      <div class="flex items-center flex-col">
        <h2>Способ оплаты: </h2>
        <h2 class="text-[#FFB800]">{{paymentsTypes[parseInt(route.params.pay!.toString())-1].name}}</h2>
      </div>
      <div class="p-[48px] mt-4">
        <component :is="paymentsTypes[parseInt(route.params.pay!.toString())-1].component" width="106" height="106"></component>
      </div>
      <p class="mt-4 text-sm text-[#66666E]">Скоро официант подойдет к вам для оплаты. После оплаты будет сформирован чек, который можно будет скачать, он отобразится у всех пользователей</p>
    </div>
    <Button @click="navigateTo" class="!rounded-2xl  mt-[32px] w-full justify-center flex">Оплачено</Button>
  </main>
</template>

<style scoped>
</style>