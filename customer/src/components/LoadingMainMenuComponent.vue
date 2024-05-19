<script setup lang="ts">
</script>

<template>
  <div>
    <header class="flex px-4 gap-2">
      <div class="w-[83px] rounded-2xl animate-pulse  h-[48px] bg-gray-400" v-for="_ in Array.from([1,2,3,4])"></div>
    </header>
    <section class="p-4" v-for="(item, index) in Array.from([1,2,3,4])" :key="item">
      <h2 :id="index.toString()" :class="{
        'pt-[6px]': index == 0
      }" class="bg-gray-400 h-[30px] animate-pulse w-[100px] rounded"></h2>
      <section class="grid mt-4 lg:grid-cols-3 gap-3">
        <div class="flex gap-4" v-for="_ in Array.from([1,2])">
          <div class="h-[160px] flex-shrink-0 rounded-2xl w-[160px] bg-gray-400"></div>
          <div class="w-full">
            <h2 class="bg-gray-400 h-[30px] animate-pulse w-[200px] rounded"></h2>
            <p class="mt-2 bg-gray-400 h-[100px] animate-pulse w-full rounded"></p>
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<style scoped>

</style>