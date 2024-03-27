<template>
    <article class="bg-[#F4F4F6] p-4 gap-4 rounded-3xl flex">
        <div>
            <Image class="w-[160px] rounded-2xl h-[160px]" :url="getFirstElemOrUndefined<string>(food.attributes.images)"></Image>
        </div>
        <div class="flex flex-col justify-between">
            <section>
                <h3 class="text-sm">{{ food.attributes.name.ru }}</h3>
                <p class="text-[#66666E] text-xs mt-2">{{ food.attributes.description.ru }}</p>
            </section>
          <section v-if="checkInBasket(food.id.toString())">
              <div class="w-full flex items-center justify-between text-center py-2 ">
                <div @click="changeQuantity({
                product_id: food.id.toString(),
                quantity: getFromBasket(food.id.toString()).quantity - 1
                })" class="bg-white cursor-pointer p-2 rounded-2xl"><MinusIcon  class="w-6 h-6"></MinusIcon></div>
                <div>{{getFromBasket(food.id.toString()).quantity}}</div>
                <div @click="changeQuantity({
                product_id: food.id.toString(),
                quantity: getFromBasket(food.id.toString()).quantity + 1
                })" class="bg-white cursor-pointer p-2 rounded-2xl"><PlusIcon class="w-6 h-6"></PlusIcon></div>
              </div>
          </section>
            <section class="mt-2" v-else @click="addGood({
            product_id: food.id.toString(),
            price: food.attributes.price,
            quantity: 1,
            url: getFirstElemOrUndefined<string>(food.attributes.images)!,
            name: food.attributes.name.ru
            })">
                <div class="cursor-pointer w-full bg-white text-center py-2 rounded-2xl">{{ food.attributes.price }} ₸</div>
            </section>
        </div>
    </article>
</template>
<script lang="ts" setup>
import Image from '../Image';
import {PlusIcon, MinusIcon} from "@heroicons/vue/24/outline";
import {addGood, changeQuantity, checkInBasket} from "../../stores";
import {getFromBasket} from "../../stores/basketStore.ts";
import {Product} from "../../api";
import {getFirstElemOrUndefined} from "../../utils";

defineProps<{food: Product}>();
</script>