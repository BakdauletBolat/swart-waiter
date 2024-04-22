<script setup lang="ts">
import Button from '../components/Button';
import BillIcon from "../assets/svg/BillIcon.vue";
</script>

<template>
<main class="bg-[#F4F4F6] p-4 min-h-screen">
  <div class="bg-white px-4 py-6 rounded-2xl">
    <div class="flex justify-between text-xs text-[#9999A1]">
      <span>15.06.2024</span>
      <span>15:55</span>
    </div>
    <div class="flex flex-col items-center mt-4">
      <BillIcon color="black" width="24" height="24"></BillIcon>
      <h2 class="text-xl mt-2 font-medium">Villa Pasta</h2>
      <p class="mt-1 text-sm">Ресторан итальянской кухни</p>
    </div>
    <div class="flex gap-4 text-xs text-[#9999A1] mt-4">
      <span>Стол: 5</span>
      <span>Гостей: 3</span>
    </div>
    <div class="h-[16px]"></div>
    <div class="w-full">
      <h2 class="font-medium py-2">Мария</h2>
      <table class="w-full">
        <tbody>
          <tr>
            <td class="py-2">Каша овсяная с ягодами</td>
            <td class="p-2 align-text-top">х2</td>
            <td class="py-2 text-right align-text-top text-nowrap">4 800 ₸</td>
          </tr>
          <tr>
            <td class="py-2">Завтрак в горшочке</td>
            <td class="p-2 align-text-top">х1</td>
            <td class="py-2 text-right align-text-top text-nowrap">4 800 ₸</td>
          </tr>
          <tr>
            <td class="py-2">Каша овсяная с ягодами и каким нибудь очень длинным названием</td>
            <td class="p-2 align-text-top">х2</td>
            <td class="py-2 text-right align-text-top text-nowrap">4 800 ₸</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="dashed-border-gray"></div>
    <div class="flex text-sm justify-between mt-4">
      <span>Обслуживание 10%</span>
      <span>720 ₸</span>
    </div>
    <div class="flex text-sm text-[#FFB800] justify-between mt-4">
      <span>Скидка</span>
      <span>- 200 ₸</span>
    </div>
    <div class="dashed-border-gray"></div>
    <div class="flex font-bold text-xl justify-between mt-4">
      <span>Итог</span>
      <span>7 720 ₸</span>
    </div>
  </div>
  <div class="fixed w-full left-0 bottom-[40px] px-4">
    <Button class="w-full flex justify-center">
      Скачать чек
    </Button>
  </div>
</main>
</template>

<style scoped>

</style>