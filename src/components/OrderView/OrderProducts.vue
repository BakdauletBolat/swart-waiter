<script setup lang="ts">
import {customerProducts} from "../../stores/orderStore.ts";
import OrderItem from "./OrderItem.vue";
</script>

<template>
  <section class="flex flex-col gap-2">
    <OrderItem v-for="orderItem in customerProducts"
               :order-item="orderItem"
               class="bg-black-10 rounded-2xl p-3 flex gap-4">
    </OrderItem>
  </section>
</template>

<style scoped>

</style>