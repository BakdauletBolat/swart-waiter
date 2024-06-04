<script setup lang="ts">
import {Navigation} from "../navigations";
import {useRoute} from "vue-router";

defineProps<{
  navigations: Navigation[]
}>()

const route = useRoute();

const isActive = (navigation_name: string) => {
  return route.name == navigation_name;
}

</script>

<template>
<div class="flex bg-white w-full justify-between items-center gap-2 h-full px-4">
<RouterLink class="flex justify-center flex-col items-center" :to="
  {
    name: item.name
  }" v-for="item in navigations">
  <div class="px-[20px]">
    <div :class="{
      'bg-[#E6E6E9]': isActive(item.name)
    }" class="h-[40px] leading-[16px] w-[40px] flex justify-center items-center rounded-lg">
      <component :is="item.icon" :color="isActive(item.name) ? '#202020' : '#66666E'"></component>
    </div>
  </div>
  <div :class="{
    'text-[#202020]': isActive(item.name)
  }" class="mt-1 text-xs text-[#66666E] font-[600]">{{item.title}}</div>
</RouterLink>
</div>
</template>

<style scoped>

</style>