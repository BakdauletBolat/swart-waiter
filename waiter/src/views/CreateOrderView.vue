<script setup lang="ts">
import AppHeader from "../components/AppHeader.vue";
import {useRouter} from "vue-router";
import {formattedPrice} from "../utils";
import {loadCategories, loadProducts, productsGroupedByCategory} from "../stores/productStore.ts";
import {isHaveCart, totalAmount} from "../stores/basketStore.ts";
import BasketIcon from "../assets/svg/BasketIcon.vue";
import {onMounted} from "vue";
import {loadProfile} from "../stores/userStore.ts";
import {loadDiscounts} from "../stores/discountStore.ts";
import SearchInput from '../components/SearchInput';
import StickedScrollTab from "../components/StickedScrollTab";
import {ChevronRightIcon} from "@heroicons/vue/24/outline";

const router = useRouter();


onMounted(()=>{
  loadProducts();
  loadProfile();
  loadCategories();
  loadDiscounts();
});

</script>


<template>
<AppHeader :not-fixed="true" :show-menu="false" :back-route="{
  name: 'menu-view'
}" title="Создание заказа"></AppHeader>
  <div>
    <div class="w-full pb-1">
      <RouterLink :to="{
              name: 'search-view'
            }" class="px-4 left-0 flex w-full">
        <SearchInput class="cursor-pointer w-full"></SearchInput>
      </RouterLink>
    </div>
    <StickedScrollTab :categories="productsGroupedByCategory"></StickedScrollTab>
    <transition name="fade"><div v-if="isHaveCart" class="px-4 w-full bottom-[20px] fixed z-[999]">
      <div @click="()=>{}" class="p-4 cursor-pointer text-center flex justify-between items-center text-white w-full bg-black-100 rounded-2xl ">
        <div class="flex gap-2 items-center">
          <BasketIcon color="white" width="24" height="24"></BasketIcon>
          <div>
            {{totalAmount.totalLength}}
          </div>
          <div class="h-6 w-[1px] bg-white"></div>
          <div>
            {{formattedPrice(totalAmount.totalAmount)}} ₸
          </div>
        </div>
        <ChevronRightIcon class="w-6 h-6"></ChevronRightIcon>
      </div>
    </div>
    </transition>
    <div class="mt-[300px]"></div>
  </div>
</template>

<style scoped>

</style>