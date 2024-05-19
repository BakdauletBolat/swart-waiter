<template>
  <div class="font-inter">
    <Toast></Toast>
    <LoadingModal v-if="isLoading"></LoadingModal>
    <SidebarModal></SidebarModal>
    <RouterView></RouterView>
  </div>
</template>
<script lang="ts" setup>
import {onMounted, onUnmounted} from "vue";
import {start, stop} from "./api/pusher.ts";

onMounted(()=>{
  if (localStorage.getItem('multi_tenant_domain_name') != undefined) {
    start();
  }
  loadRestaurant();
});

onUnmounted(()=>{
  stop();
})

import Toast from "./components/ToastComponent/index.ts";
import SidebarModal from "./components/SidebarModal/index.ts";
import LoadingModal from "./components/LoadingModal.vue";
import {isLoading} from "./stores";
import {loadRestaurant} from "./stores/restorantStore.ts";
</script>