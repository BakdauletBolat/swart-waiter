<script lang="ts" setup>
import {ChevronLeftIcon} from "@heroicons/vue/24/outline";
import {RouteParams} from "vue-router";
import {Bars3Icon} from "@heroicons/vue/24/outline";
import {openModal} from "./SidebarModal/index.ts";
defineProps<{
  title: string;
  showMenu?: boolean;
  backRoute?: RouteParams;
  notFixed?: boolean;
  actions?: boolean;
  subtitle?: string;
}>()
</script>
<template>
  <div v-if="!notFixed" class="h-[68px]" :class="{
    '!h-[84px]': subtitle
  }"></div>
  <header  class="grid grid-cols-3 bg-white top-0 z-[999] fixed justify-between items-center w-full p-5" :class="{
    '!relative': notFixed
  }">
    <Bars3Icon @click="openModal()" v-if="showMenu" class="cursor-pointer h-6 w-6"></Bars3Icon>
    <div>
      <RouterLink v-if="backRoute" :to="backRoute">
        <ChevronLeftIcon  class="h-6 w-6"></ChevronLeftIcon>
      </RouterLink>
    </div>
    <div>
      <h2 class="text-[22px] text-nowrap leading-[28px] text-center">{{title}}</h2>
      <p v-if="subtitle" class="text-xs text-[#66666E]">{{subtitle}}</p>
    </div>
    <div class="actions flex items-center justify-end">
      <slot name="actions"></slot>
    </div>
  </header>
</template>
<style></style>