<script setup lang="ts">
import Image from './Image';
import Button from './Button';
import {onMounted, ref} from "vue";
import {instance} from "../api";
import userInformationStore from "../stores/userInformationStore.ts";

const waiter = ref(null);

onMounted(()=>{
  instance.post('/api/v1/user/notifications/call_waiter', {
    customer_uuid: userInformationStore.store.value?.uuid
  }).then(res=>{
    waiter.value = res.data;
  })
});




</script>
<template>
  <div class="flex justify-center items-center flex-col p-4">
    <Image class="h-[122px] w-[122px]" :url="undefined"></Image>
    <h2 class="text-2xl mt-4">Александро в пути</h2>
    <p class="text-sm text-[#9999A1] text-center max-w-[350px] mt-4">Официант увидел что вы его позвали, скоро он подойдет к вам</p>
    <Button containerClasses="!justify-center" class="mt-4 !rounded-2xl w-full text-center">Понятно</Button>
  </div>
</template>

<style scoped>

</style>