<script lang="ts" setup>
import {menuNavigation} from "../../navigations";
import {showModal, closeModal, showWaiterCall} from "./index.ts";
import {RouteLocationRaw, useRoute, useRouter} from "vue-router";
import Modal from "../Modal/index.ts";
import VueBottomSheet from "@webzlodimir/vue-bottom-sheet";
import WaiterCallComponent from "../WaiterCallComponent.vue";
const route = useRoute();
const router = useRouter();

const navigateTo = (to: RouteLocationRaw) => {
  router.push(to);
  closeModal();
}

</script>
<template>
  <vue-bottom-sheet ref="showWaiterCall">
      <WaiterCallComponent></WaiterCallComponent>
  </vue-bottom-sheet>
  <Modal v-model="showModal">
    <div class="p-3">
      <div class="p-4">Привет, Мария!</div>
      <div
          :class="{
            'bg-black-100 text-white': route.name == navigation.name
          }"
          class="cursor-pointer rounded-2xl  p-4" v-for="navigation in menuNavigation">
        <div v-if="navigation.isFunction" class="flex items-center gap-3" @click="navigation.onClick">
          <component :color="route.name == navigation.name ? 'white' : 'black' " width="24" height="24" :is="navigation.icon"></component>
          <p>{{navigation.title}}</p>
        </div>
        <div @click="navigateTo({
             name: navigation.name
          })" class="flex items-center gap-3" v-else>
          <component :color="route.name == navigation.name ? 'white' : 'black' " width="24" height="24" :is="navigation.icon"></component>
          <p>{{navigation.title}}</p>
        </div>
      </div>
    </div>
  </Modal>
</template>
