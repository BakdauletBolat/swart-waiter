<script setup lang="ts">
import StarIcon from "./assets/svg/StarIcon.vue";
import Image from './components/Image';

const review = defineModel<number>();
defineProps<{
  count: number,
  imageUrl?: string,
  title: string,
  isActive: boolean
}>()
</script>

<template>
  <article class="cursor-pointer flex items-center flex-col gap-2" :class="{
    'opacity-50': !isActive
  }">
    <div :class="{
      '!p-[40px]': isActive
    }" class="p-[20px]">
      <Image
          :class="{
          '!w-[122px] !h-[122px]': isActive
        }"
          class="w-[60px] h-[60px] rounded-full" :url="imageUrl"></Image>
    </div>
    <h2 :class="{
      'text-[10px]': !isActive
    }">{{title}}</h2>
    <div class="flex gap-2">
      <StarIcon @click="review=index" class="cursor-pointer" v-for="index in count"
                :width="isActive ? 34 : 24"
                :height="isActive ? 34 : 24"
                :color="index <= review! ? '#FFB800' : '#E6E6E9'"></StarIcon>
    </div>
  </article>

</template>

<style scoped>

</style>