<script setup lang="ts">
import {orderStore, otherProducts} from "../../stores/orderStore.ts";
import OrderItem from "./OrderItem.vue";

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
  <div v-for="(item,key) in otherProducts" class="opacity-50">
      <h2 class="font-medium my-4">{{getNameByUUID(key.toString())}}</h2>
      <section class="flex flex-col gap-2">
        <OrderItem v-for="orderItem in item"
                   :order-item="orderItem"
                   class="bg-black-10 rounded-2xl p-3 flex gap-4">
        </OrderItem>
      </section>
    </div>
</template>