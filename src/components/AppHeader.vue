<script lang="ts" setup>
import {ChevronLeftIcon} from "@heroicons/vue/24/outline";
import {RouteParams} from "vue-router";
defineProps<{
  title: string;
  backRoute: RouteParams
}>()
</script>
<template>
  <header class="flex bg-white justify-between items-center w-full p-5">
  <RouterLink :to="backRoute">
    <ChevronLeftIcon class="h-6 w-6"></ChevronLeftIcon>
  </RouterLink>
    <h2>{{title}}</h2>
    <div class="h-6 w-6"></div>
  </header>
</template>
<style></style>