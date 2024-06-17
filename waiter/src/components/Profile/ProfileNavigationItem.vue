<script setup lang="ts">
import {ChevronRightIcon} from "@heroicons/vue/24/outline";

export interface NavigationItem {
  title: string
  route: {
    name: string
  },
  icon: any
}
defineProps<{
  item: NavigationItem
}>();
</script>

<template>
<RouterLink :to="item.route" class="hover:bg-[#dedee3] bg-[#F4F4F6] p-4 flex rounded-2xl items-center justify-between">
  <div class="flex items-center gap-4">
    <component :is="item.icon"></component>
    <div>{{item.title}}</div>
  </div>
  <div>
  <ChevronRightIcon class="w-5 h-5"></ChevronRightIcon>
  </div>
</RouterLink>
</template>

<style scoped>

</style>