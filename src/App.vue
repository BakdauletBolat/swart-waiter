<template>
  <div class="font-inter">
    <Toast></Toast>
    <LoadingModal v-if="isLoading"></LoadingModal>
    <SidebarModal></SidebarModal>
    <RouterView></RouterView>
  </div>
</template>
<script lang="ts" setup>
import Toast from "./components/ToastComponent/index.ts";
import SidebarModal from "./components/SidebarModal/index.ts";
import LoadingModal from "./components/LoadingModal.vue";
import {isLoading} from "./stores";
</script>