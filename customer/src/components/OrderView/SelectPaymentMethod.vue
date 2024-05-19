<script setup lang="ts">
import {orderStore} from "../../stores/orderStore.ts";
import {ref} from "vue";
import {instance} from "../../api";
import userInformationStore from "../../stores/userInformationStore.ts";
import {useRouter} from "vue-router";
import CashIcon from "../../assets/svg/CashIcon.vue";
import WaiterCard from "../../assets/svg/WaiterCard.vue";
import Button from '../Button';
import OrderIcon from "../../assets/svg/OrderIcon.vue";
import {ChevronRightIcon} from "@heroicons/vue/24/outline";

const isLoading = ref<boolean>(false);
const activeIndex = ref<number>(1);
const router = useRouter();
const emit = defineEmits(['close'])

function changeActiveIndex(index: number) {
  activeIndex.value = index;
}




function putPaymentType() {
  isLoading.value = true;
  instance.put('/api/v1/order/pay/customer', {
    pay: activeIndex.value,
    customer_uuid: userInformationStore.store.value?.uuid
  }).then(_=>{
    emit('close');
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


</script>

<template>
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
</template>

<style scoped>

</style>