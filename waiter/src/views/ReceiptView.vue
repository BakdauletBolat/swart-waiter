<script setup lang="ts">
import Button from '../components/Button';
import {useRoute} from "vue-router";
import ReceiptForm from "@/components/ReceiptForm.vue";


const route = useRoute();


//
// function getNameByUUID(uuid: string) {
//   let name = '';
//   orderStore.products.forEach((item)=>{
//     if (item.attributes.waiter_id != null && item.attributes.waiter_id == parseInt(uuid)) {
//       //@ts-ignore
//       name = item.included.waiter.attributes.first_name;
//     }
//     else if (item.included.customer?.attributes.uuid == uuid) {
//       name = item.included.customer.attributes.full_name;
//     }
//   });
//   return name;
// }


</script>

<template>
<main class="bg-[#F4F4F6] p-4 min-h-screen">
  <ReceiptForm :token="route.params.token"></ReceiptForm>
  <div class="fixed w-full left-0 bottom-[20px] px-4">
    <Button class="w-full flex justify-center">
      Скачать чек
    </Button>
  </div>
  <div class="h-[100px]"></div>
</main>
</template>

<style scoped>

</style>