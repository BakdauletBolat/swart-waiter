<script setup lang="ts">

import AppHeader from "../components/AppHeader.vue";
import OrderStatus from "../components/OrderStatus.vue";
import OrderIcon from "../assets/svg/OrderIcon.vue";
import CookingIcon from "../assets/svg/CookingIcon.vue";
import RunningIcon from "../assets/svg/RunningIcon.vue";
import {ChevronRightIcon} from "@heroicons/vue/24/outline";
import Button from "../components/Button/index.ts";
import {onMounted} from "vue";
import {customerProducts, loadOrder, loadOrderProducts, orderStore, otherProducts} from "../stores/orderStore.ts";
//@ts-ignore
import VueBottomSheet from "@webzlodimir/vue-bottom-sheet";
import Image from '../components/Image';
import  "@webzlodimir/vue-bottom-sheet/dist/style.css";
import { ref } from "vue";
import {getFirstElemOrUndefined} from "../utils";
import CashIcon from "../assets/svg/CashIcon.vue";
import WaiterCard from "../assets/svg/WaiterCard.vue";
import {instance} from "../api";
import {useRouter} from "vue-router";
import SVGBasketIcon from "../assets/svg/SVGBasketIcon.vue";
import userInformationStore from "../stores/userInformationStore.ts";

const myBottomSheet = ref(null);
const router = useRouter();

const open = () => {
  //@ts-ignore
  myBottomSheet!.value!.open();
}


const activeIndex = ref<number>(1);
const isLoading = ref<boolean>(false);

onMounted(()=>{
  loadOrderProducts()
  loadOrder()
})

function changeActiveIndex(index: number) {
  activeIndex.value = index;
}

function putPaymentType() {
  isLoading.value = true;
  instance.put('/api/v1/order/pay/customer', {
    pay: activeIndex.value
  }).then(_=>{
    router.push({
      name: 'payment-view',
      params: {
        pay: activeIndex.value,
        orderId: orderStore.order?.id
      }
    })
  }).catch(e=>console.log(e))
      .finally(()=>{
    isLoading.value = false;
  });
}

function navigateMenu() {
  router.push({
    name: 'menu'
  });
}


function getNameByUUID(uuid: string) {
    let name = '';
    orderStore.products.forEach((item)=>{
      if (item.included.customer.attributes.uuid == uuid) {
        name = item.included.customer.attributes.full_name;
      }
    });
    return name;
}


</script>

<template>
  <AppHeader :show-menu="true" title="Заказ"></AppHeader>
  <vue-bottom-sheet ref="myBottomSheet">
    <div class="p-4">
      <h1 class="font-medium">Выберите способ оплаты</h1>
      <div class="mt-4">
        <div @click="changeActiveIndex(1)" class="cursor-pointer bg-[#F4F4F6] px-[8px] py-[12px] justify-between flex items-center rounded-2xl">
          <div class="flex gap-4 items-center">
            <CashIcon width="40" height="40"></CashIcon>
            <div>Наличными официанту</div>
          </div>
          <div class="p-[14px]">
            <div
                :class="{
                  '!border-black': activeIndex == 1
                }"
                class="w-[20px] h-[20px] border-2 flex  items-center justify-center border-[#9999A1] rounded-full">
              <div v-if="activeIndex == 1" class="w-[10px] h-[10px] bg-black rounded-full"></div>
            </div>
          </div>
        </div>
        <div @click="changeActiveIndex(2)" class="bg-[#F4F4F6] cursor-pointer justify-between px-[8px] py-[12px] flex items-center mt-2 rounded-2xl">
          <div class="flex gap-4 items-center">
            <WaiterCard width="40" height="40"></WaiterCard>
            <div>Картой официанту</div>
          </div>
          <div class="p-[14px]">
            <div
                :class="{
                  '!border-black': activeIndex == 2
                }"
                class="w-[20px] h-[20px] border-2 flex items-center justify-center border-[#9999A1] rounded-full">
              <div v-if="activeIndex == 2" class="w-[10px] h-[10px] bg-black rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="border border-dashed border-[#E6E6E9] mt-4"></div>
      <div class="mt-4 text-xl font-bold flex justify-between">
        <div class="">К оплате</div>
        <div>{{orderStore.order?.attributes.computation.total}} ₸</div>
      </div>
      <div class="mt-4">
        <Button :loading="isLoading" @click="putPaymentType"
                :class="{
                'justify-center': isLoading
                }"
                class="w-full flex !rounded-2xl !p-4">
          <template #prepend>
            <OrderIcon color="white" width="24" height="24"></OrderIcon>
          </template>
          <div class="flex gap-2 items-center">
            <div>
              {{orderStore.order?.attributes.computation.total}} ₸
            </div>
            <div class="h-6 w-[1px] bg-white"></div>
            <div>
              Продолжить
            </div>
          </div>
          <template #append>
            <ChevronRightIcon class="w-6 h-6 text-white"></ChevronRightIcon>
          </template>
        </Button>
      </div>
    </div>
  </vue-bottom-sheet>
  <main class="px-4" v-if="orderStore.products.length > 0">
    <section class="text-xs bg-black-10 p-3 flex flex-col items-center justify-center rounded-2xl">
      <div><span class="text-[#9999A1]">Номер заказа</span> ТН2353 </div>
      <div><span class="text-[#9999A1]">Официант </span>Мария</div>
    </section>
    <h2 class="font-medium my-4">Ваш заказ</h2>

    <section class="flex flex-col gap-2">
      <article v-for="orderItem in customerProducts" class="bg-black-10 rounded-2xl p-3 flex gap-4">
        <div class="w-[82px] h-[82px] object-cover flex-shrink-0 rounded-lg overflow-hidden">
        <Image :url="getFirstElemOrUndefined(orderItem.included.product.attributes.images)"></Image>
        </div>
        <div class="w-full">
          <header class="text-sm flex justify-between">
            <h3>{{ orderItem.included.product.attributes.name.ru }}</h3>
            <p class="text-xs">х{{orderItem.attributes.quantity}}</p>
          </header>
          <div class="flex justify-between items-center mt-2">
            <div class="flex gap-1">
              <OrderStatus :time="'18:55'" :status="1" :active-status="orderItem.attributes.status.value">
                <OrderIcon color="black" width="16" height="16"></OrderIcon>
              </OrderStatus>
              <div class="h-[2px] mt-4 rounded min-w-[22px] bg-black"></div>
              <OrderStatus :time="'19:00'"  :status="2" :active-status="orderItem.attributes.status.value">
                <CookingIcon color="black" width="16" height="16"></CookingIcon>
              </OrderStatus>
              <div class="h-[2px] mt-4 rounded min-w-[22px] bg-black"></div>
              <OrderStatus :status="3" :active-status="orderItem.attributes.status.value">
                <RunningIcon color="black"  width="16" height="16"></RunningIcon>
              </OrderStatus>
            </div>
            <div>{{orderItem.attributes.price}} ₸</div>
          </div>
        </div>
      </article>
    </section>

    <section class="mt-4">
      <h2 class="font-medium">Комментарий к заказу</h2>
      <p class="text-sm text-[#9999A1]">Принесите пожалуйста салфетки и какие нибудь дополнительные приборы</p>
    </section>
    <div class="w-full bg-[#E6E6E9] h-[1px] my-4"></div>
    <div v-for="(item,key) in otherProducts" class="opacity-50">
      <div v-if="key.toString()!=userInformationStore.store.value!.uuid">
        <h2 class="font-medium my-4">{{getNameByUUID(key.toString())}}</h2>
        <section class="flex flex-col gap-2">
          <article v-for="orderItem in item" class="bg-black-10 rounded-2xl p-3 flex gap-4">
            <div class="w-[82px] h-[82px] object-cover flex-shrink-0 rounded-lg overflow-hidden">
              <Image :url="getFirstElemOrUndefined(orderItem.included.product.attributes.images)"></Image>
            </div>
            <div class="w-full">
              <header class="text-sm flex justify-between">
                <h3>{{ orderItem.included!.product.attributes.name.ru }}</h3>
                <p class="text-xs">х{{orderItem.attributes.quantity}}</p>
              </header>
              <div class="flex justify-between items-center mt-2">
                <div class="flex gap-1">
                  <OrderStatus :time="'18:55'" :status="1" :active-status="orderItem.attributes.status.value">
                    <OrderIcon color="black" width="16" height="16"></OrderIcon>
                  </OrderStatus>
                  <div class="h-[2px] mt-4 rounded min-w-[22px] bg-black"></div>
                  <OrderStatus :time="'19:00'"  :status="2" :active-status="orderItem.attributes.status.value">
                    <CookingIcon color="black" width="16" height="16"></CookingIcon>
                  </OrderStatus>
                  <div class="h-[2px] mt-4 rounded min-w-[22px] bg-black"></div>
                  <OrderStatus :status="3" :active-status="orderItem.attributes.status.value">
                    <RunningIcon color="black"  width="16" height="16"></RunningIcon>
                  </OrderStatus>
                </div>
                <div>{{orderItem.attributes.price}} ₸</div>
              </div>
            </div>
          </article>
        </section>
      </div>
    </div>
    <section class="mt-4">
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
  </main>
  <div v-else>
    <div class="min-h-screen absolute left-0 top-0 flex w-full justify-center items-center">
      <div class="flex justify-center flex-col items-center">
        <SVGBasketIcon width="202" height="202"></SVGBasketIcon>
        <h2 class="font-medium text-2xl mt-[60px] text-center">Корзина пустая</h2>
        <p class="text-sm text-[#9999A1] mt-[24px] text-center max-w-[220px]">Выберите блюда из меню и они появятся в корзине</p>
      </div>
    </div>
  </div>
  <div>
    <transition name="fade">
      <div class="px-4 w-full bottom-[40px] fixed  z-[999]">
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
        <Button v-else @click="navigateMenu">
          В меню
        </Button>
      </div>
    </transition>
  </div>
</template>

<style>
.bottom-sheet__draggable-thumb {
  background: #9999A1!important;
}
.background-order {
  height:30px;
  background-size: contain;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  background-repeat: repeat;
  background-clip: content-box;
  background-image: url("vuec.svg");
}
.dashed-box {
  background-image: repeating-linear-gradient(0deg, #E6E6E9, #E6E6E9 12px, transparent 12px, transparent 22px, #E6E6E9 22px), repeating-linear-gradient(90deg, #E6E6E9, #E6E6E9 12px, transparent 12px, transparent 22px, #E6E6E9 22px), repeating-linear-gradient(180deg, #E6E6E9, #E6E6E9 12px, transparent 12px, transparent 22px, #E6E6E9 22px), repeating-linear-gradient(270deg, #E6E6E9, #E6E6E9 12px, transparent 12px, transparent 22px, #E6E6E9 22px);
  background-size: 1px 100%, 100% 1px, 1px 100% , 100% 1px;
  background-position: 0 0, 0 0, 100% 0, 0 100%;
  background-repeat: no-repeat;
}
</style>