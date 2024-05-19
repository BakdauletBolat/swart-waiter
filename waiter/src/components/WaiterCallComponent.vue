<script setup lang="ts">
import Image from './Image';
import Button from './Button';
import {closeWaiterCall, waiter} from "./SidebarModal/index.ts";

</script>
<template>
  <div class="flex justify-center items-center flex-col p-4">
    <Image class="h-[122px] w-[122px]" :url="waiter?.attributes != undefined ? waiter?.attributes?.logo : undefined"></Image>
    <h2 class="text-2xl mt-4">{{waiter?.attributes != null ? waiter?.attributes?.first_name+" в пути" : 'Официант принимает заказ'}} </h2>
    <p class="text-sm text-[#9999A1] text-center max-w-[350px] mt-4">Официант увидел что вы его позвали, скоро он подойдет к вам</p>
    <Button  @click="closeWaiterCall"  containerClasses="!justify-center" class="mt-4 !rounded-2xl w-full text-center">Понятно</Button>
  </div>
</template>