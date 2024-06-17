<script setup lang="ts">
export interface ITabItem {
  title: string;
  indicatorCount: number;
}
defineProps<{
  item: ITabItem,
  isActive: boolean
}>();
</script>

<template>
<div class="cursor-pointer flex gap-1 w-full rounded-2xl justify-center items-center px-[18px] py-4" :class="{
  'bg-[#202020] text-white': isActive
}">
  <div class="text-sm">{{item.title}}</div>
  <span v-if="item.indicatorCount > 0" class="text-white bg-[#FF1F00] text-[10px] h-4 w-4 flex justify-center items-center rounded-full">{{item.indicatorCount}}</span>
</div>
</template>

<style scoped>

</style>