<template>
    <button :disabled="loading || isDisabled" :class="{
        '!bg-[#1D1B201F] !text-[#1D1B20]': loading
    }" class="bg-black-100 active:bg-[#3b3b3b] rounded-lg text-white px-[24px] py-4">
        <div v-if="loading">
           <Spinner class="h-4 w-4"></Spinner>
        </div>
        <div v-else class="flex justify-between gap-2" :class="[containerClasses]">
            <div class="flex gap-2">
              <slot name="prepend"></slot>
              <slot></slot>
            </div>
            <slot name="append"></slot>
        </div>
    </button>
</template>
<script lang="ts" setup>
import Spinner from '../Spinner.vue';
defineProps<{
    loading?: boolean,
    isDisabled?: boolean,
    containerClasses?: string
}>();
</script>
