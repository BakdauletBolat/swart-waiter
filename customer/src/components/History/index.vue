<script lang="ts" setup>
import HistoryBullet from "./HistoryBullet.vue";
import {XMarkIcon} from "@heroicons/vue/24/outline";
import {getFirstElemOrUndefined} from "../../utils";

const show = defineModel('show');
defineProps(['histories']);

  const activeItem = defineModel({
    default: 0
  });


  function prev() {
    if (activeItem.value == 0) {
      return;
    }
    activeItem.value -= 1;
  }
  function next() {
    if (activeItem.value == 1) {
      return;
    }
    activeItem.value += 1;
  }
</script>
<template>
  <Transition name="fade">
  <div v-if="show" class="z-[9999] fixed top-0 h-screen w-full bg-black-100">
    <div class="px-4 w-full absolute top-[52px] z-50 flex gap-2">
      <HistoryBullet @step-next="next" :active-index="activeItem" :index="index" v-for="(_, index) in histories"></HistoryBullet>
    </div>
    <div @click="show=false" class="cursor-pointer p-2 top-[72px] absolute rounded-2xl bg-black-100 right-4 z-[9999]">
      <XMarkIcon class="w-6 h-6 text-white"></XMarkIcon>
    </div>
    <div @click="prev" class="cursor-pointer left-0 z-20 w-[20%] h-screen absolute"></div>
    <div @click="next" class="right-0 cursor-pointer z-20 w-[20%] h-screen absolute"></div>
      <div class="w-full h-full">
        <div class="top-[128px] absolute px-4 text-white">
          <h1 class="leading-[38px] text-[32px] font-medium">{{histories[activeItem].attributes.title}}</h1>
          <p class="text-[20px] leading-[24.2px] mt-6">{{histories[activeItem].attributes.description}}</p>
        </div>
        <img :alt="histories[activeItem].attributes.title" class="w-full h-full object-cover" :src="getFirstElemOrUndefined(histories[activeItem].attributes.attachments)" />
      </div>
  </div>
  </Transition>
</template>
<style></style>