
<script lang="ts" setup>
import Image from '../components/Image';
import {Bars3Icon} from "@heroicons/vue/24/outline";
import UserIcon from "../assets/svg/UserIcon.vue";
import LocationIcon from "../assets/svg/LocationIcon.vue";
import Modal from '../components/Modal';
import {menuNavigation} from "../navigations";
import {ref} from "vue";
import {useRoute} from "vue-router";
defineProps<{
  item: {
    store: {
      name: string,
      description: string,
      address: string
    }
    title: string,
    url: string
  }
}>();

const showModal = ref(false);
const route = useRoute();

</script>
<template>
  <Modal v-model="showModal">
    <div class="p-3">
      <div class="p-4">Привет, Мария!</div>
      <div
          :class="{
            'bg-black-100 text-white': route.name == navigation.name
          }"
          class="flex items-center rounded-2xl gap-3 p-4" v-for="navigation in menuNavigation">
        <component :color="route.name == navigation.name ? 'white' : 'black' " width="24" height="24" :is="navigation.icon"></component>
        <p>{{navigation.title}}</p>
      </div>
    </div>
  </Modal>
    <main class="relative w-full">
        <div class="absolute items-center leading-7 text-[22px] z-10 justify-between py-[18px] px-4 flex w-full text-white">
          <Bars3Icon @click="showModal=true" class="cursor-pointer h-6 w-6"></Bars3Icon>
          <div>{{item.title}}</div>
          <RouterLink :to="{
            name: 'welcome-page'
          }"><UserIcon color="white" width="24" height="24"></UserIcon></RouterLink>
        </div>
        <div class="absolute items-center justify-center bottom-4 flex-col z-10 px-4 flex w-full text-white">
          <div></div>
          <div class="text-2xl">{{item.store.name}}</div>
          <div class="mt-2 text-xs">{{item.store.description}}</div>
          <div class="flex gap-2 mt-1 items-center">
            <LocationIcon color="white" width="16" height="16"></LocationIcon>
            <div class="text-xs">{{item.store.address}}</div>
          </div>
        </div>
        <div class="h-[210px] relative overflow-hidden rounded-bl-2xl rounded-br-2xl ">
          <div class="black-linear-gradient absolute top-0 w-full h-full"></div>
          <Image class="h-full w-full" :url="item.url"></Image>
        </div>
    </main>
</template>
<style>
.black-linear-gradient {
  background: linear-gradient(0deg, #000000 17.86%, rgba(0, 0, 0, 0) 44.52%);
}
</style>