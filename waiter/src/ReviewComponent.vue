<script setup lang="ts">
import StarIcon from "./assets/svg/StarIcon.vue";
import Image from './components/Image';

const review = defineModel<number>();
defineProps<{
  count: number,
  imageUrl?: string,
  title: string,
  isActive: boolean
}>();
const emit = defineEmits(['update', 'updateMain'])
function updateReview(newR: number) {
  review.value = newR;
  emit('update');
}



</script>

<template>
  <article class="flex items-center flex-col gap-2" :class="{
    'opacity-50': !isActive
  }">
    <div @click="emit('updateMain')" :class="{
      '!p-[40px]': isActive
    }" class="p-[20px] cursor-pointer transition-all">
      <Image
          :class="{
          '!w-[122px] !h-[122px]': isActive
        }"
          class="w-[60px] h-[60px] rounded-full transition-all" :url="imageUrl"></Image>
    </div>
    <h2 :class="{
      'text-[10px] transition-all': !isActive
    }">{{title}}</h2>
    <div class="flex gap-2">
      <StarIcon @click="updateReview(index)" class="cursor-pointer" v-for="index in count"
                :width="isActive ? 34 : 24"
                :height="isActive ? 34 : 24"
                :color="index <= review! ? '#FFB800' : '#E6E6E9'"></StarIcon>
    </div>
  </article>

</template>

<style scoped>

</style>