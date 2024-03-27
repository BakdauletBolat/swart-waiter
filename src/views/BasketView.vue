<script setup lang="ts">
import AppHeader from "../components/AppHeader.vue";
import BasketCard from "../components/BasketCard/index.ts";
import {basket} from "../stores";
</script>

<template>
  <AppHeader :back-route="{name: 'menu'}" title="Корзина"></AppHeader>
  <div class="px-4">
    <h2 class="font-medium">Ваш заказ</h2>
    <div class="mt-4 flex flex-col gap-2">
      <BasketCard :good="good" v-for="good in basket.goods"></BasketCard>
    </div>
  </div>
</template>

<style scoped>

</style>