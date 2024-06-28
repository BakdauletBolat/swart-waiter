<script setup lang="ts">
import BottomBar from "../components/BottomBar.vue";
import {bottomBarNavigation} from "../navigations/bottomBarNavigation.ts";
import {getToken, onMessage} from 'firebase/messaging';
import { messaging } from '../api/firebase.ts';
import {instance} from "../api";
import {onMounted} from "vue";



const requestPermission = async () => {
  try {
    const token = await Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        return getToken(messaging);
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

</script>

<template>
    <div class="flex flex-col h-screen">
      <div @click="requestPermission">Test</div>
      <div class="h-full">
        <RouterView></RouterView>
      </div>
      <div class="h-[80px] w-full fixed bottom-0">
        <BottomBar :navigations="bottomBarNavigation"></BottomBar>
      </div>
    </div>
</template>


