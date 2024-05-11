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
        <div class="flex flex-col justify-between w-full">
            <RouterLink :to="{
                        name: 'food-detail',
                        params: {
                          id: food.id
                        }}">
                <h3 class="text-sm">{{ food.attributes.name.ru }}</h3>
                <p class="text-[#66666E] text-xs mt-2">{{ food.attributes.description.ru }}</p>
                <div class="text-xs text-[#9999A1] mt-2" v-if="checkInBasket(food.id)">{{  formattedPrice(getFromBasket(food.id).attributes.price) }} ₸</div>
            </RouterLink>
            <div v-if="checkInBasket(food.id)">
              <ChangeBasketCardComponent :show-price="false" :good="getFromBasket(food.id)"></ChangeBasketCardComponent>
            </div>
            <section v-else class="mt-2 w-full" @click="addOrCreate({
              product_id: food.id,
              quantity: 1,
              uuid: userInformationStore.store.value!.uuid
            })">
                <div class="cursor-pointer w-full bg-white text-center flex justify-center items-center py-2 rounded-2xl">
                  <div>{{formattedPrice(food.attributes.price)}} ₸</div>
                </div>
            </section>
        </div>
    </article>
</template>
<script lang="ts" setup>
import Image from '../Image';
import {Product} from "../../api";
import {formattedPrice, getFirstElemOrUndefined} from "../../utils";
import {addOrCreate, checkInBasket, getFromBasket} from "../../stores/basketStore.ts";
import ChangeBasketCardComponent from "../BasketCard/ChangeBasketCardComponent.vue";
import userInformationStore from "../../stores/userInformationStore.ts";
defineProps<{food: Product}>();
</script>