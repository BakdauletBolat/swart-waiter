<script setup lang="ts">
import AppHeader from "../components/AppHeader.vue";
import ToFillItem, {IToFillItem} from "../components/ToFillItem.vue";
import Button from '../components/Button';
import {onMounted, ref} from "vue";
import {instance} from "../api";
import {positions} from "../stores/toFillStore.ts";

export interface IToFillData {
  [key: string]: IToFillItem;
}

const toFillData = ref<IToFillData>({});

const loadToFill = () => {
  instance.get('/api/v1/order/to_serve').then((res)=>{
    toFillData.value = res.data.data;
  }).catch(e=>console.log(e));
}

onMounted(()=>{
  loadToFill()
});

const done = () => {
  instance.put('/api/v1/order/products/status/done', {
    products: positions.value
  })
      .then((res)=>console.log(res))
      .catch((e)=>console.log(e));
}

</script>

<template>
<div>
  <AppHeader :show-menu="false" title="К подаче"></AppHeader>
  <main class="px-4">
    <div class="flex flex-col gap-2">
      <ToFillItem :item="item" v-for="item in toFillData"></ToFillItem>
    </div>
  </main>
  <div class="px-4 fixed w-full bottom-[100px]">
    <Button @click="done" class="w-full" container-classes="!justify-center">Выдано</Button>
  </div>
</div>
</template>

<style scoped>

</style>