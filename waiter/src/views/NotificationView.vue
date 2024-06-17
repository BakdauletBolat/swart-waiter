<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import Image from "../components/Image/index.ts";
import Button from "../components/Button/index.ts";
//@ts-ignore
import VueBottomSheet from "@webzlodimir/vue-bottom-sheet";

import YouCalledImage from '../assets/images/youcalled.png';
import NotFoundNotification from '../assets/images/notfoundnotification.png';
import {instance} from "../api";
import NotificationItem, {UserNotification} from "../components/NotificationItem.vue";
import AppHeader from "../components/AppHeader.vue";
import LoadingModal from "../components/LoadingModal.vue";
const notifications = ref<UserNotification[]>([]);

const activeNotification = ref<UserNotification | undefined>(undefined);
const isLoading = ref<boolean>(false);
const readedNotifications = computed(()=>notifications.value.filter(item=>item.attributes.is_read));
const newNotifications = computed(()=>notifications.value.filter(item=>!item.attributes.is_read));
const openedNotificationRef = ref(null);
function loadNotifications() {
  isLoading.value = true;
  instance.get('/api/v1/user/notifications')
      .then(res=>notifications.value=res.data.data).finally(()=>isLoading.value = false);
}



onMounted(()=>{
  loadNotifications();
})

function readNotifications() {
  instance.put('/api/v1/user/notifications/readed')
      .then(res=>console.log(res.data));
}

function openNotification(notification: UserNotification) {
  activeNotification.value = notification;
  openedNotificationRef!.value!.open();
}
</script>

<template>
  <vue-bottom-sheet ref="openedNotificationRef">
      <div class="flex justify-center items-center flex-col p-4">
        <Image class="h-[122px] w-[122px]" :url="YouCalledImage"></Image>
        <h2 class="text-2xl mt-4">Вас позвали</h2>
        <p class="text-sm text-[#9999A1] text-center max-w-[350px] mt-4">
          <div class="flex flex-col">
            <div><span>Стол: </span><span class="text-black">{{activeNotification?.attributes.data.table_name}}</span></div>
            <div><span>Гость: </span><span class="text-black">{{activeNotification?.attributes.data.customer_name}}</span></div>
          </div>
        </p>
        <Button  @click="openedNotificationRef!.close()" container-classes="!justify-center" class="mt-4 !rounded-2xl w-full text-center">Понятно</Button>
      </div>
  </vue-bottom-sheet>
  <AppHeader :show-menu="false" title="Уведомления" :centered="true"></AppHeader>
  <div v-if="isLoading">
    <LoadingModal ></LoadingModal>
  </div>
  <div class="px-4" v-if="notifications.length > 0 || isLoading">
    <div class="mb-4" v-if="newNotifications.length > 0">
      <h2 class="mb-4">Новые</h2>
      <div class="gap-2 flex w-full flex-col">
        <NotificationItem @click="openNotification(notification)" :notification="notification" v-for="notification in newNotifications"></NotificationItem>
      </div>
    </div>
    <div v-if="readedNotifications.length > 0">
      <h2 class="mb-4">Просмотренные</h2>
      <div class="flex gap-2 flex-col">
        <NotificationItem :notification="notification" v-for="notification in readedNotifications"></NotificationItem>
      </div>
    </div>
  </div>
  <div v-else class="min-h-[80vh] flex-col flex justify-center items-center">
    <Image :url="NotFoundNotification" class="w-[200px] h-[200px]"></Image>
    <div class="mt-[60px] px-4">
      <h2 class="text-2xl font-medium text-center">Уведомлений нет</h2>
      <p class="mt-6 text-sm text-[#9999A1] text-center">Здесь будут отображаться запросы столов на оплату или если гости позвали вас</p>
    </div>
  </div>
</template>

<style scoped>

</style>