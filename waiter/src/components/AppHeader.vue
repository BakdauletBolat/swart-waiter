<script lang="ts" setup>
import {ChevronLeftIcon} from "@heroicons/vue/24/outline";
import {RouteParams} from "vue-router";
import {Bars3Icon} from "@heroicons/vue/24/outline";
import {openModal} from "./SidebarModal/index.ts";
defineProps<{
  title: string;
  showMenu: boolean;
  centered?: boolean;
  backRoute?: RouteParams;
  notFixed?: boolean
}>()
</script>
<template>
  <div v-if="!notFixed" class="h-[68px]"></div>
  <header  class="flex bg-white top-0 z-[999] fixed justify-between items-center w-full p-5" :class="{
    '!justify-center': centered,
    '!relative': notFixed
  }">
    <Bars3Icon @click="openModal()" v-if="showMenu" class="cursor-pointer h-6 w-6"></Bars3Icon>
    <RouterLink v-if="backRoute" :to="backRoute">
      <ChevronLeftIcon class="h-6 w-6"></ChevronLeftIcon>
    </RouterLink>
    <h2 class="text-[22px] leading-[28px]">{{title}}</h2>
    <div v-if="!centered" class="h-6 w-6"></div>
  </header>
</template>
<style></style>