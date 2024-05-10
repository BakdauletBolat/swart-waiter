<script setup lang="ts">
defineProps<{
  isActive: boolean,
  name: string
}>()
</script>

<template>
  <div class="unselectable white-space-pre  py-[14px] text-sm text-nowrap text-[#66666E] px-[19.2px] rounded-[16px] cursor-pointer" :class="{
            'bg-[#202020] !text-white': isActive
        }">
    {{ name }}
  </div>
</template>

<style scoped>
.white-space-pre {
  white-space: pre;
}
</style>