<script setup lang="ts">
import WaiterCallIcon from "../assets/svg/WaiterCallIcon.vue";
import {ChevronRightIcon} from "@heroicons/vue/24/outline";

export interface UserNotification {
  type: string;
  id: number;
  attributes: {
    user_id: number;
    is_read: boolean;
    data: {
      type: number;
      table_id: number;
      customer_name: string;
      table_name: string;
    };
  };
  included: null | any;
}

defineProps<{
  notification: UserNotification
}>();

</script>

<template>
<div
    :class="{
      '!bg-[#202020]': !notification.attributes.is_read
    }"
    class="bg-[#F4F4F6] cursor-pointer flex items-center gap-4 w-full justify-between p-4 rounded-2xl">
  <div class="flex w-full items-center gap-4">
    <WaiterCallIcon :color="!notification.attributes.is_read ? 'white' : '#66666E'" width="24" height="24"></WaiterCallIcon>
    <div class="w-full">
      <h3
          :class="{
              'text-[#FFB800]': !notification.attributes.is_read
          }"
          class="text-sm font-medium">Вас позвали</h3>
      <div class="flex w-full items-end justify-between">
        <p
            :class="{
    'text-white': !notification.attributes.is_read
      }"
            class="text-[#66666E] text-xs mt-2"><span>Стол: {{notification.attributes.data.table_name}} | </span><span>Гость: {{notification.attributes.data.customer_name}}</span></p>
        <div
            :class="{
    'text-white': !notification.attributes.is_read
      }"
            class="text-[#66666E] text-xs">15:55</div>
      </div>
    </div>
  </div>
  <div v-if="!notification.attributes.is_read">
    <div class="w-6 h-6 rounded bg-[#F4F4F6] flex justify-center items-center">
      <ChevronRightIcon class="w-5 h-5"></ChevronRightIcon>
    </div>
  </div>
</div>
</template>

<style scoped>

</style>