<script setup lang="ts">
import {basket, otherBaskets} from "../stores/basketStore.ts";
import userInformationStore from "../stores/userStore.ts";
import BasketCard from "./BasketCard/index.ts";

function getNameByUUID(uuid: string) {
  let name = '';
  basket.value.data?.forEach((item)=>{
    if (item.attributes.waiter_id != null && item.attributes.waiter_id == parseInt(uuid)) {
      //@ts-ignore
      name = item.included.waiter.attributes.first_name;
    }
    else if (item.included.customer?.attributes.uuid == uuid) {
      name = item.included.customer.attributes.full_name;
    }
  });
  return name;
}

</script>
<template>
  <div v-for="(item,key) in otherBaskets" class="opacity-50 pointer-events-none">
    <div v-if="key.toString()!=userInformationStore.store.value!.uuid">
      <h2 class="font-medium my-4">{{getNameByUUID(key.toString())}}</h2>
      <div class="mt-4 flex flex-col gap-2">
        <BasketCard :good="good" v-for="good in item"></BasketCard>
      </div>
    </div>
  </div>
</template>
<style scoped>

</style>