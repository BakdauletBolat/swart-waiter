<template>
    <div>
        <div class="max-w-[316px] mx-auto">
            <div class="flex justify-center items-center">
                <img class="w-[200px]" :src="item.url" />
            </div>
            <h2 class="mt-[60px] text-[24px] leading-[29px] font-medium text-center">{{ item.title }}</h2>
            <p class="text-[#9999A1] leading-[20px] text-[14px] text-center mt-[24px]">{{ item.description }}</p>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { GuideItem } from '.';

defineProps<{
    item: GuideItem
}>()
</script>