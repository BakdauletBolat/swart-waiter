<script setup lang="ts">

import AppHeader from "@/components/AppHeader.vue";
import Button from "@/components/Button/index.ts";
import {onMounted} from "vue";
import LoadingModal from "../components/LoadingModal.vue";
import {loadOrder, orderStore, otherProducts} from "../stores/orderStore.ts";
import  "@webzlodimir/vue-bottom-sheet/dist/style.css";
import {useRoute, useRouter} from "vue-router";
import OrderTotal from "@/components/OrderView/OrderTotal.vue";
import OtherOrderProducts from "@/components/OrderView/OtherOrderProducts.vue";
import OrderProducts from "@/components/OrderView/OrderProducts.vue";
import OrderNotFound from "@/components/OrderView/OrderNotFound.vue";
import {PlusIcon} from "@heroicons/vue/24/outline";
import {getNumberWithZero, getTime} from "@/utils";


const router = useRouter();
const route = useRoute();

onMounted(()=>{
  loadOrder(parseInt(route.params.id.toString()))
})




</script>
<template>
  <LoadingModal v-if="orderStore.isLoadingOrder"></LoadingModal>
  <AppHeader
      :back-route="{name: 'table-view'}"
      :title="'Стол '+orderStore.order?.attributes.table_id"
      :subtitle="'Активный стол с '+getTime(orderStore.order?.attributes.created_at)"
  >
    <template v-slot:actions>
      <RouterLink v-if="orderStore.order" :to="{
        name: 'create-order-view',
        params: {
          tableId: orderStore.order?.id
        }
      }" class="cursor-pointer">
        <PlusIcon class="h-6 w-6"></PlusIcon>
      </RouterLink>
    </template>
  </AppHeader>
  <main class="px-4" v-if="orderStore.products.length > 0 && orderStore.order">
    <h2 class="font-medium my-4">Ваш заказ</h2>
    <OrderProducts></OrderProducts>
    <div class="w-full bg-[#E6E6E9] h-[1px] my-4"></div>
    <section class="mt-4">
      <h2 v-if="orderStore.order.included.comments.data.length > 0" class="font-medium">Комментарий к заказу</h2>
      <p class="text-sm text-[#9999A1]">{{orderStore.order?.included?.comments?.data?.map((item)=>item.attributes.comment).join(', ')}}</p>
    </section>
    <OtherOrderProducts></OtherOrderProducts>
    <OrderTotal class="mt-4"></OrderTotal>
    <Button @click="router.push({
    name: 'order-pay-view',
    params: {
      id: orderStore.order.id
    }
    })" class="mt-[30px] w-full" container-classes="!justify-center">Рассчитать стол</Button>
    <div class="mt-[150px]"></div>
  </main>
  <OrderNotFound v-else></OrderNotFound>
</template>