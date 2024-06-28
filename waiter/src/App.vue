<template>
  <div class="font-inter">
    <Toast></Toast>
    <LoadingModal v-if="isLoading"></LoadingModal>
    <SidebarModal></SidebarModal>
    <RouterView></RouterView>
  </div>
</template>
<script lang="ts" setup>
import {onMounted, onUnmounted, watch} from "vue";
import {start, stop} from "./api/pusher.ts";

const route = useRoute();

onMounted(()=>{
  if (localStorage.getItem('multi_tenant_domain_name') != undefined) {
    start();
  }
  loadRestaurant();
  loadProfile();
});

watch(route, (newRoute, _)=>{
  if (newRoute.query?.host != undefined) {
    localStorage.setItem("multi_tenant_domain_name", newRoute.query!.host!)
  }
})

onUnmounted(()=>{
  stop();
})

import Toast from "./components/ToastComponent";
import SidebarModal from "./components/SidebarModal/index.ts";
import LoadingModal from "./components/LoadingModal.vue";
import {isLoading} from "./stores";
import {loadRestaurant} from "./stores/restorantStore.ts";
import {useRoute} from "vue-router";
import {loadProfile} from "./stores/userStore.ts";
</script>