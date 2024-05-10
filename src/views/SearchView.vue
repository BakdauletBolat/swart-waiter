<script setup lang="ts">
import {loadCategories, loadProducts, searched, searchText} from "../stores/productStore.ts";
import {nextTick, onMounted, ref} from "vue";
import {getFirstElemOrUndefined} from "../utils";
import Image from '../components/Image';
import {ArrowLeftIcon, XMarkIcon} from "@heroicons/vue/24/outline";
import SearchNotFound from "../assets/svg/SearchNotFound.vue";

const searchTextRef = ref<any>(null);

onMounted(()=>{
  nextTick(()=>{
    searchTextRef.value!.focus();
  });
  loadCategories();
  loadProducts();
})
</script>

<template>
  <RouterLink :to="{
    name: 'menu'
  }" class="p-2 cursor-pointer z-20 absolute top-4 left-2">
    <ArrowLeftIcon  class="w-[24px] h-[24px]"></ArrowLeftIcon>
  </RouterLink>
  <div class="p-2 cursor-pointer z-20 absolute top-4 right-2" @click="searchText=''">
    <XMarkIcon  class="w-[24px] h-[24px]"></XMarkIcon>
  </div>
<input ref="searchTextRef" class="h-[72px] outline-none relative z-10 w-full px-[56px] border-b" v-model="searchText" />
 <div class="px-4" v-if="searched.length > 0">
   <div v-for="grouped in searched">
     <h2 class="py-4 font-medium">{{grouped.category.name}}</h2>
     <div v-for="product in grouped.products">
       <section class="flex gap-4 py-2 items-center">
         <Image class="w-[56px] flex-shrink-0 h-[56px]" :url="getFirstElemOrUndefined(product.attributes.images)"></Image>
         <div>
           <h3>{{product.attributes.name.ru}}</h3>
           <p class="text-sm text-[#66666E]">{{product.attributes.description.ru}}</p>
         </div>
       </section>
     </div>
   </div>
 </div>
  <div v-else class="fixed top-0 flex min-h-screen w-full justify-center items-center">
    <div>
      <SearchNotFound></SearchNotFound>
      <p class="text-[#9999A1] text-sm mt-[60px] text-center max-w-[200px]">По вашему запросу ничего не найдено</p>
    </div>
  </div>
</template>

<style scoped>

</style>