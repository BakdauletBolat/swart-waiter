<script setup lang="ts">
import ClockIcon from "../assets/svg/ClockIcon.vue";
import BillIcon from "../assets/svg/BillIcon.vue";
import SmileCircleIcon from "../assets/svg/SmileCircleIcon.vue";
import {ITable} from "../stores/orderStore.ts";
import {formattedPrice, getNumberWithZero} from "../utils";
import {PlusIcon} from "@heroicons/vue/24/outline";

defineProps<{
  item: ITable;
  status: number;
}>();

const getDate = (create_date: string) => {
  const date = new Date(create_date);
  return `${getNumberWithZero(date.getHours())}:${getNumberWithZero(date.getMinutes())}`;
}

</script>

<template>
  <div class="bg-[#F4F4F6] p-4 rounded-2xl">
    <div v-if="status != 1" class="w-full flex items-center gap-4">
      <div
          :class="{'!bg-[#FF1F00] !text-white': status == 2}"
          class="rounded-xl bg-[#FFB800] h-[60px] w-[60px] flex justify-center items-center">
        {{item.attributes.cabin_id}}
      </div>
      <div class="flex gap-2 flex-col">
        <div class="flex items-center gap-2">
          <ClockIcon width="17" height="17" color="#9999A1"></ClockIcon>
          <span>{{getDate(item.included.order.attributes.created_at)}}</span>
        </div>
        <div class="flex items-center gap-2">
          <SmileCircleIcon width="17" height="17" color="#9999A1"></SmileCircleIcon>
          <span>5</span>
        </div>
        <div class="flex items-center gap-2">
          <BillIcon width="17" height="17" color="#9999A1"></BillIcon>
          <span>{{formattedPrice(item.included.order.attributes.computation.total)}} ₸</span>
        </div>
      </div>
    </div>
    <div class="flex justify-between items-center" v-else>
      <div
          class="rounded-xl h-[60px] w-[60px] flex justify-center items-center">
        {{item.attributes.cabin_id}}
      </div>
      <div class="h-[40px] w-[40px] flex justify-center items-center">
        <PlusIcon class="h-6 w-6"></PlusIcon>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>