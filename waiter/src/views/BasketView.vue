<script setup lang="ts">
import AppHeader from "../components/AppHeader.vue";
import BasketCard from "../components/BasketCard/index.ts";
import {basket, customerBasket, loadBasket, totalAmount} from "../stores/basketStore.ts";
import {onMounted, ref} from "vue";
import {ChevronRightIcon} from "@heroicons/vue/24/outline";
import Button from '../components/Button';
import OrderIcon from "../assets/svg/OrderIcon.vue";
import {instance} from "../api";
import userInformationStore, {loadProfile} from "../stores/userStore.ts";
import {useRoute, useRouter} from "vue-router";
import SVGBasketIcon from "../assets/svg/SVGBasketIcon.vue";
import OtherOrders from "../components/OtherOrders.vue";
import OrderComment from "../components/OrderView/OrderComment.vue";
import LoadingModal from "../components/LoadingModal.vue";

const route = useRoute();

onMounted(()=>{
  basket.value.toCreateTableId = parseInt(route.params.tableId.toString());
  loadBasket();
});

const comment = ref(null);
const router = useRouter();

function navigateMenu() {

}

function createOrder() {
  instance.post('/api/v1/order/waiter', {
    table_id: basket.value.toCreateTableId,
    comment: comment.value
  }).then((res)=>{
      router.push({
          name: 'order-view',
          params: {
            id: res.data.id
          }
      });
  }).catch((_)=>{
    console.log('asd');
  })
}

</script>

<template>
  <LoadingModal v-if="basket.isLoading"></LoadingModal>
  <AppHeader :show-menu="false" :back-route="{name: 'create-order-view'}" title="Корзина"></AppHeader>
  <div class="px-4">
    <div v-if="basket.data != undefined && basket?.data?.length > 0">
      <h2 class="font-medium">Ваш заказ</h2>
      <div class="mt-4 flex flex-col gap-2">
        <BasketCard :good="good" v-for="good in customerBasket"></BasketCard>
      </div>
      <OtherOrders></OtherOrders>
      <OrderComment v-model="comment" class="mt-4"></OrderComment>
    </div>
    <div class="min-h-screen absolute left-0 top-0 flex w-full justify-center items-center" v-else>
      <div class="flex justify-center flex-col items-center">
          <SVGBasketIcon width="202" height="202"></SVGBasketIcon>
          <h2 class="font-medium text-2xl mt-[60px] text-center">Корзина пустая</h2>
          <p class="text-sm text-[#9999A1] mt-[24px] text-center max-w-[220px]">Выберите блюда из меню и они появятся в корзине</p>
      </div>
    </div>
  </div>
  <div>
    <transition name="fade">
      <div class="px-4 w-full bottom-[20px] fixed  z-[999]">
        <Button v-if="basket.data && basket.data?.length>0" classes="items-center" @click="createOrder" class="w-full !rounded-2xl !p-4">
          <template #prepend>
            <OrderIcon color="white" width="24" height="24"></OrderIcon>
          </template>
          <div class="flex gap-2 items-center">
            <div>
              {{totalAmount.totalAmount}} ₸
            </div>
            <div class="h-6 w-[1px] bg-white"></div>
            <div>
             Заказать
            </div>
          </div>
          <template #append>
            <ChevronRightIcon class="w-6 h-6 text-white"></ChevronRightIcon>
          </template>
        </Button>
        <Button v-else classes="items-center" @click="navigateMenu" class="w-full flex justify-center !rounded-2xl !p-4">
          В меню
        </Button>
      </div>
    </transition>
  </div>
  <div class="mt-[300px]"></div>
</template>

<style scoped>

</style>