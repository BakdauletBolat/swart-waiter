<script setup lang="ts">
import {onMounted, ref, watch} from "vue";

const props = defineProps<{
  label: string
  id: number
  status: number
}>();

const emit = defineEmits(['onChange'])

const isActive = ref<boolean>(false);

watch(isActive, (newP, _)=>{
  emit('onChange', newP)
})

onMounted(()=>{
  isActive.value = props.status == 3;
});

</script>

<template>
<div class="flex items-center gap-[15px] cursor-pointer" @click="isActive = !isActive">
  <div
      :class="{
        'bg-[#202020] !border-[#202020]': isActive
      }"
      class="flex justify-center items-center border-[2px] rounded-[2px] border-[#9999A1] w-[18px] h-[18px]">
    <div v-if="isActive">
      <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 9.4L0 5.4L1.4 4L4 6.6L10.6 0L12 1.4L4 9.4Z" fill="white"/>
      </svg>
    </div>
  </div>
  <span class="text-sm">{{label}}</span>
</div>
</template>

<style scoped>

</style>