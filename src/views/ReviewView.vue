<script setup lang="ts">
import {onMounted, ref} from "vue";
import {loadOrder, orderStore} from "../stores/orderStore.ts";
import ReviewComponent from "../ReviewComponent.vue";
import {loadRestaurant, restorantStore} from "../stores/restorantStore.ts";
import {getFirstElemOrUndefined} from "../utils";


onMounted(()=>{
  loadOrder();
  loadRestaurant();
})

const restorauntReview = ref<number>(3);
const waiterReview = ref<number>(4);

const activeReview = ref<number>(0);

</script>

<template>
<div v-if="orderStore.order != undefined && restorantStore">
  <ReviewComponent @click="activeReview=0" :is-active="activeReview == 0"
                   :image-url="getFirstElemOrUndefined(restorantStore?.attributes.attachments)"
                   title="Оцените ресторан" :count="5" v-model="restorauntReview"></ReviewComponent>
  <ReviewComponent @click="activeReview=1" :is-active="activeReview == 1"
                   title="Оцените обслуживание" :count="5" v-model="waiterReview"></ReviewComponent>
</div>
</template>

<style scoped>

</style>