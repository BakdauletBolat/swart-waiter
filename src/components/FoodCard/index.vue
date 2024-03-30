<template>
    <article class="bg-[#F4F4F6] p-4 gap-4 rounded-3xl flex">
        <RouterLink :to="{
      name: 'food-detail',
      params: {
        id: food.id
      }
    }">
            <Image class="w-[160px] rounded-2xl h-[160px]" :url="getFirstElemOrUndefined<string>(food.attributes.images)"></Image>
        </RouterLink>
        <div class="flex flex-col justify-between">
            <RouterLink :to="{
                        name: 'food-detail',
                        params: {
                          id: food.id
                        }}">
                <h3 class="text-sm">{{ food.attributes.name.ru }}</h3>
                <p class="text-[#66666E] text-xs mt-2">{{ food.attributes.description.ru }}</p>
            </RouterLink>
            <section class="mt-2" @click="addOrCreate({
            product_id: food.id,
            quantity: 1,
            uuid: userInformationStore.store.value!.uuid,
            })">
                <div class="cursor-pointer w-full bg-white text-center py-2 rounded-2xl">{{ food.attributes.price }} ₸</div>
            </section>
        </div>
    </article>
</template>
<script lang="ts" setup>
import Image from '../Image';
import {Product} from "../../api";
import {getFirstElemOrUndefined} from "../../utils";
import {addOrCreate} from "../../stores";
import userInformationStore from "../../stores/userInformationStore.ts";

defineProps<{food: Product}>();
</script>