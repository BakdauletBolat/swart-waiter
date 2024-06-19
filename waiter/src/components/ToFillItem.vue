<script setup lang="ts">

import CheckBox from "./CheckBox.vue";
import {IToFillItem, pushPositions, removePositions} from "../stores/toFillStore.ts";

defineProps<{
  item: IToFillItem
}>()

const onChange = (isActive: boolean, id: number) => {
    if (isActive) {
      pushPositions(id)
    }
    else {
      removePositions(id);
    }

}

</script>

<template>
  <div class="p-4 border rounded-lg border-[#E6E6E9]">
    <h2 class="font-medium">Стол {{item.table.cabin_id}}</h2>
    <div class="mt-4 flex flex-col gap-2">
      <div class="flex justify-between p-[7px]" v-for="p in item.positions">
        <CheckBox @onInit="(isActive: boolean)=>onChange(isActive, p.id)" :id="p.id"
                  @onChange="(isActive: boolean)=>onChange(isActive, p.id)"
                  :status="p.status"
                  :label="p.product.name.ru"
                  ></CheckBox>
        <div class="text-sm">x{{p.quantity}}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>