<template>
    <article class="bg-[#F4F4F6] p-4 gap-4 rounded-3xl flex">
        <div>
            <Image class="w-[160px] rounded-2xl h-[160px]" :url="food.url"></Image>
        </div>
        <div class="flex flex-col justify-between">
            <section>
                <h3 class="text-sm">{{ food.name }}</h3>
                <p class="text-[#66666E] text-xs mt-2">{{ food.description }}</p>
            </section>
            <section>
                <div class="w-full bg-white text-center py-2 rounded-2xl">{{ food.price }} ₸</div>
            </section>
        </div>
    </article>
</template>
<script lang="ts" setup>
import { Food } from '.';
import Image from '../Image';
defineProps<{food: Food}>();
</script>