<script setup lang="ts">
import OrderNotFoundIcon from "../../assets/svg/OrderNotFoundIcon.vue";
</script>

<template>
    <div class="min-h-screen absolute left-0 top-0 flex w-full justify-center items-center">
      <div class="flex justify-center flex-col items-center">
        <OrderNotFoundIcon ></OrderNotFoundIcon>
        <h2 class="font-medium text-2xl mt-[60px] text-center">Заказ не сделан</h2>
        <p class="text-sm text-[#9999A1] mt-[24px] text-center max-w-[220px]">Выберите блюда из меню, сделайте заказ и он отобразится</p>
      </div>
    </div>
</template>

<style scoped>

</style>