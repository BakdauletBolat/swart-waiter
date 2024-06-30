<script setup lang="ts">
import {loadOrder, orderStore} from "@/stores/orderStore.ts";
import ReceiptForm from "@/components/ReceiptForm.vue";
import Button from "@/components/Button/index.ts";
import {onMounted, ref} from "vue";
import VueBottomSheet from "@webzlodimir/vue-bottom-sheet";
import SelectPaymentMethod from "@/components/OrderView/SelectPaymentMethod.vue";
import {useRoute} from "vue-router";
import AppHeader from "@/components/AppHeader.vue";
import {PlusIcon} from "@heroicons/vue/24/outline";
import {getTime} from "@/utils";
import {addToast} from "@/components/ToastComponent/index.ts";
import {instance} from "@/api";

const myBottomSheet = ref(null);

const route = useRoute();

onMounted(()=>{
  loadOrder(parseInt(route.params.id.toString()))
})


const open = () => {
  //@ts-ignore
  myBottomSheet!.value!.open();
}

const close = () => {
  //@ts-ignore
  myBottomSheet!.value!.close();
  addToast({
    message: "Успешно выполнен заказ",
    timeout: 5000
  });
  pay();

}

const pay = () => {
  instance.put('/api/v1/order/status/waiter', {
    table_id: orderStore.order?.attributes.table_id,
    status: 50
  }).then(res=>{
    console.log(res)
  }).catch(e=>{
    console.log(e);
  })
}

onMounted(()=>{
  loadOrder(parseInt(route.params.id.toString()))
})


</script>

<template>
  <div v-if="orderStore.order">
    <vue-bottom-sheet ref="myBottomSheet">
      <SelectPaymentMethod :tableId="orderStore.order.attributes.table_id"
                           v-if="orderStore.order.attributes.status.value != 40"
                           @close="close"></SelectPaymentMethod>
    </vue-bottom-sheet>
  </div>
  <AppHeader :back-route="{
    name: 'order-view',
    params: {id: route.params.id}}"
    :title="'Стол '+orderStore.order?.attributes.table_id"
    :subtitle="'Активный стол с '+getTime(orderStore.order?.attributes.created_at)"
  >
  </AppHeader>
  <div class="px-4">
    <ReceiptForm v-if="orderStore.order" :hide-info="true" :token="orderStore.order.attributes.token"></ReceiptForm>
    <Button @click="open" class="mt-4 w-full" container-classes="!justify-center">Выбрать способ оплаты</Button>
  </div>
</template>

<style scoped>

</style>