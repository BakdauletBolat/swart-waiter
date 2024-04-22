<script setup lang="ts">

import Image from '../components/Image';
import SearchInput from '../components/SearchInput';
import Header from '../components/Header.vue';
import StickedScrollTab from "../components/StickedScrollTab";
import History from '../components/History';
import BasketIcon from "../assets/svg/BasketIcon.vue";
import {ChevronRightIcon} from "@heroicons/vue/24/outline";
import {useRouter} from "vue-router";
import {computed, onMounted, ref} from "vue";
import userInformationStore from "../stores/userInformationStore.ts";
import {getRestoran, Product} from "../api";
import {getFirstElemOrUndefined} from "../utils";
import {Category, loadCategories, loadProducts, menuStore} from "../stores/productStore.ts";
import {isHaveCart, loadBasket, totalAmount} from "../stores/basketStore.ts";
import {discountStore, loadDiscounts} from "../stores/discountStore.ts";


const router = useRouter();


const headerItem = ref({
  title: `Привет, ${userInformationStore.store.value?.name}!`,
  store: {
    name: 'Villa Pasta',
    description: 'Ресторан итальянской кухни',
    address: 'Молдогуловой 32'
  },
  url: 'https://s3-alpha-sig.figma.com/img/dc8d/d16f/eba03ca4cfd8b8e2ad89a8ae1e92a6dd?Expires=1711324800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pbhXBg7JbsU5v0sCBTzKBBGoMa0N7xypTNUDSITWIzbmnNIe11xrsX50FH~X32fdf5FYapSrbhr6oXqOnoSV-F7zxDq3wEXyo8NeFkxMWw847gWiGh4~2cCe8OyTqgnI85Ehw-f4TmVsZYBOrPs7vR4kaYF6obZKgH~q9O3Y3ldXkjVHzewSyWKCFvE-iFIQc55quYqwsIap7UwWCSrzV3cC3CHTYWcciboi-xfc9MyeY9czEKvhT0kvo03ehC34AYUla4LYkewx-IvSzZ6fdClUBMCyyODGLuQmjwiguTB9nqAh1fxCzF121oE88VuILmepDzXL~NHLBXq8cdIudg__'
});

onMounted(()=>{
  getRestoran().then((res)=>{
    headerItem.value.store = {
      name: res.attributes.name,
      description: res.attributes.description,
      address: res.attributes.address
    }
    headerItem.value.url = getFirstElemOrUndefined<string>(res.attributes.attachments)!;
  }).catch(e=>{
    console.log(e);
  });
  loadProducts();
  loadBasket();
  loadCategories();
  loadDiscounts();
});

function navigateToBasket() {
  router.push({
    name: 'basket-view',
    query: {
      table_id: 'hello-world'
    }
  })
}

function  addTo(categories: Category[], toReturn: any[]) {
    categories.forEach(category=>{
      const products = menuStore.products!.data.filter(product=>product.attributes.category_id == category.id);
      if (products.length > 0) {
        toReturn.push({
          category: category,
          products: products
        });
      }

      if (category.children.length > 0) {
        addTo(category.children, toReturn);
      }
    });
}
const productsGroupedByCategory = computed<{
  category: Category,
  products: Product[]
}[]>(()=>{
  if (menuStore.categories != undefined && menuStore.products != undefined) {
      const toReturn: {
        category: Category,
        products: Product[]
      }[] = []
      addTo(menuStore.categories.data, toReturn);
      return toReturn;
  }
  return [];
});

const activeItem = ref<number>(0);

const showHistory = ref<boolean>(false);

</script>

<template>
    <History v-model="activeItem" :histories="discountStore.data" v-model:show="showHistory"></History>
    <div>
        <div class="mb-4">
            <Header :item="headerItem"></Header>
        </div>
        <div class="mb-[6px]">
            <div class="px-4">
              <SearchInput class="mb-4"></SearchInput>
            </div>
            <div class="gap-3 flex pl-4 w-full overflow-scroll hide-scrollbar">
            <Image @click="showHistory=true; activeItem=index" class="w-[154px] h-[88px] flex-shrink-0 rounded-2xl" :url="index.toString()" v-for="(_, index) in discountStore.data"></Image>
        </div>
        </div>
        <StickedScrollTab :categories="productsGroupedByCategory"></StickedScrollTab>
        <transition name="fade"><div v-if="isHaveCart" class="px-4 w-full bottom-[40px] fixed z-[999]">
          <div @click="navigateToBasket" class="p-4 cursor-pointer text-center flex justify-between items-center text-white w-full bg-black-100 rounded-2xl ">
            <div class="flex gap-2 items-center">
              <BasketIcon color="white" width="24" height="24"></BasketIcon>
              <div>
                {{totalAmount.totalLength}}
              </div>
              <div class="h-6 w-[1px] bg-white"></div>
              <div>
                {{totalAmount.totalAmont}} ₸
              </div>
            </div>
            <ChevronRightIcon class="w-6 h-6"></ChevronRightIcon>
          </div>
        </div>
        </transition>
      <div class="mt-[300px]"></div>
    </div>
</template>


