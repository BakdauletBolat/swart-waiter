<script setup lang="ts">
defineProps<{
  time?: string;
  status: number;
  activeStatus: number;
}>();

</script>

<template>
  <div class="flex flex-col items-center">
    <div :class="{
      'bg-black-20': activeStatus < status,
      'bg-white': activeStatus > status,
      'bg-yellow-100 ': status == activeStatus
    }" class="p-2 rounded-lg">
      <div>
        <slot></slot>
      </div>
    </div>
    <div class="mt-0.5 text-xs">{{time ? time : '-'}}</div>
  </div>
</template>

<style scoped>

</style>