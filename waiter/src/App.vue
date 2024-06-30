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

import {getToken, onMessage} from 'firebase/messaging';
import { messaging } from '@/api/firebase.ts';
import {instance} from "@/api/axios.ts";

const route = useRoute();
const router = useRouter();

const requestNotificationPermission = async () => {
  try {
    const token = await Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log(messaging)
        return getToken(messaging, {
          vapidKey: 'BIogxSuKjOl61cgmkaln6KVgoR4ZoaObfClkiF2V5V7Yf3D2lXsVZb-OqIyCpb0d6CCtmXV2tWj42SrNp6vP3ig'
        });
      } else {
        throw new Error('Permission not granted');
      }
    });
    instance.put('/api/v1/user/token', {
      token: token
    }).catch(e=>console.log(e));
    console.log('FCM Token:', token);
  } catch (error) {
    console.error('Error getting permission or token:', error);
  }
};

onMounted(() => {
  onMessage(messaging, (payload: any) => {
    console.log('Message received. ', payload);
  });
});

onMounted(()=>{
  if (localStorage.getItem('multi_tenant_domain_name') != undefined) {
    start();
  }
  requestNotificationPermission();
  loadRestaurant();
  loadProfile(router);
});

watch(route, (newRoute, _)=>{
  if (newRoute.query?.host != undefined) {
    localStorage.setItem("multi_tenant_domain_name", newRoute.query!.host!.toString())
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
import {useRoute, useRouter} from "vue-router";
import {loadProfile} from "./stores/userStore.ts";
</script>