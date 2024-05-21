<script setup lang="ts">
import {onMounted, ref} from "vue";
import {loadOrder, orderStore} from "../stores/orderStore.ts";
import ReviewComponent from "../ReviewComponent.vue";
import {loadRestaurant, restorantStore} from "../stores/restorantStore.ts";
import {getFirstElemOrUndefined} from "../utils";
import Input from '../components/Input';
import Button from '../components/Button';
import {instance} from "../api";
import userInformationStore from "../stores/userStore.ts";
import {useRouter} from "vue-router";

onMounted(()=>{
  loadOrder();
  loadRestaurant();
})

const router = useRouter();

const restorauntReview = ref<number>(3);
const waiterReview = ref<number>(4);

const activeReview = ref<number>(0);
const comment = ref<string>('');
const isLoading = ref<boolean>(false);

function createReview() {
  isLoading.value = true;
  instance.post('/api/v1/review', {
    uuid: userInformationStore.store.value?.uuid,
    comment: comment.value,
    data: [
        {
      type: 1,
      rating: restorauntReview.value
    },
      {
        type: 2,
        rating: waiterReview.value
      }]
    }).then(_=>{
        comment.value = '';
        router.push({
          name: 'receipt-view',
          query: {
            token: orderStore.order?.attributes.token
          }
        })
      })
      .catch((e)=>console.log(e))
      .finally(()=>{
        isLoading.value = false;
      });
}

</script>

<template>
<main v-if="orderStore.order != undefined && restorantStore" class="bg-[#F4F4F6] p-4 min-h-screen">
  <h1 class="text-center mt-[30px]">Заказ завершен и оплачен!</h1>
  <p class="text-[#66666E] mt-2 text-sm text-center">Спасибо что воспользовались нашим сервисом по автоматизации ресторанных процессов</p>
  <div class="p-4 bg-white rounded-2xl mt-4">
    <ReviewComponent @updateMain="activeReview = 0" :is-active="activeReview == 0"
                     :image-url="getFirstElemOrUndefined(restorantStore?.attributes.attachments)"
                     title="Оцените ресторан" :count="5" @update="activeReview+=1" v-model="restorauntReview"></ReviewComponent>
    <ReviewComponent @updateMain="activeReview = 1" :is-active="activeReview == 1"
                     title="Оцените обслуживание" @update="activeReview+=1" :count="5" v-model="waiterReview"></ReviewComponent>
    <Input  @click="activeReview = 2" class="mt-[28px]" v-model="comment" placeholder="Оставьте отзыв о ресторане" />
  </div>
  <div class="h-[200px]"></div>
  <div class="fixed left-0 bottom-[20px] w-full">
    <div class="px-4"><Button :loading="isLoading" @click="createReview" class="w-full flex justify-center !rounded-2xl">Отправить</Button></div>
  </div>
</main>
</template>

<style scoped>

</style>