<script setup lang="ts">

import AppHeader from "../components/AppHeader.vue";
import OrderIcon from "../assets/svg/OrderIcon.vue";
import {ChevronRightIcon} from "@heroicons/vue/24/outline";
import Button from "../components/Button/index.ts";
import {onMounted} from "vue";
import LoadingModal from "../components/LoadingModal.vue";
import {loadOrder, loadOrderProducts, orderStore} from "../stores/orderStore.ts";
//@ts-ignore
import VueBottomSheet from "@webzlodimir/vue-bottom-sheet";
import  "@webzlodimir/vue-bottom-sheet/dist/style.css";
import { ref } from "vue";
import {useRouter} from "vue-router";
import OrderTotal from "../components/OrderView/OrderTotal.vue";
import OtherOrderProducts from "../components/OrderView/OtherOrderProducts.vue";
import OrderProducts from "../components/OrderView/OrderProducts.vue";
import OrderNotFound from "../components/OrderView/OrderNotFound.vue";
import SelectPaymentMethod from "../components/OrderView/SelectPaymentMethod.vue";
import {loadWaiter, waiter} from "../components/SidebarModal/index.ts";

const myBottomSheet = ref(null);
const router = useRouter();

const open = () => {
  //@ts-ignore
  myBottomSheet!.value!.open();
}


const close = () => {
  //@ts-ignore
  myBottomSheet!.value!.close();
}

onMounted(()=>{
  loadOrderProducts()
  loadOrder();
  loadWaiter();
})

function navigateMenu() {
  router.push({
    name: 'menu'
  });
}
</script>
<template>
  <LoadingModal v-if="orderStore.isLoadingOrder"></LoadingModal>
  <AppHeader :show-menu="true" title="Заказ"></AppHeader>
  <vue-bottom-sheet ref="myBottomSheet">
    <SelectPaymentMethod @close="close"></SelectPaymentMethod>
  </vue-bottom-sheet>
  <main class="px-4" v-if="orderStore.products.length > 0">
    <section class="text-xs bg-black-10 p-3 flex flex-col items-center justify-center rounded-2xl">
      <div><span class="text-[#9999A1]">Номер заказа</span> ТН2353 </div>
      <div v-if="waiter"><span class="text-[#9999A1]">Официант </span>{{waiter.attributes.first_name}}</div>
    </section>
    <h2 class="font-medium my-4">Ваш заказ</h2>
    <OrderProducts></OrderProducts>
    <div class="w-full bg-[#E6E6E9] h-[1px] my-4"></div>
    <OtherOrderProducts></OtherOrderProducts>
    <div class="w-full bg-[#E6E6E9] h-[1px] my-4"></div>
    <section class="mt-4">
      <h2 class="font-medium">Комментарий к заказу</h2>
      <p class="text-sm text-[#9999A1]">Test comment</p>
    </section>
    <OrderTotal class="mt-4"></OrderTotal>
  </main>
  <OrderNotFound v-else></OrderNotFound>
  <div>
    <transition name="fade">
      <div class="px-4 w-full bottom-[20px] fixed  z-[999]">
        <Button v-if="orderStore.products.length > 0" @click="open" class="w-full !rounded-2xl !p-4">
          <template #prepend>
            <OrderIcon color="white" width="24" height="24"></OrderIcon>
          </template>
          <div class="flex gap-2 items-center">
            <div>
              {{orderStore.order?.attributes.computation.total}} ₸
            </div>
            <div class="h-6 w-[1px] bg-white"></div>
            <div>
              Оплатить стол
            </div>
          </div>
          <template #append>
            <ChevronRightIcon class="w-6 h-6 text-white"></ChevronRightIcon>
          </template>
        </Button>
        <Button class="w-full flex justify-center" v-else @click="navigateMenu">
          В меню
        </Button>
      </div>
    </transition>
  </div>
</template>