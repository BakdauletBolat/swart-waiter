<script setup lang="ts">

import Image from '../components/Image';
import SearchInput from '../components/SearchInput';
import Header from '../components/Header.vue';
import StickedScrollTab from "../components/StickedScrollTab";
import History from '../components/History';
import BasketIcon from "../assets/svg/BasketIcon.vue";
import {ChevronRightIcon} from "@heroicons/vue/24/outline";
import {basket} from "../stores";
import {useRouter} from "vue-router";
import {computed, onMounted, ref} from "vue";
import userInformationStore from "../stores/userInformationStore.ts";
import {getRestoran, Product} from "../api";
import {getFirstElemOrUndefined} from "../utils";
import {Category, loadCategories, loadProducts, menuStore} from "../stores/productStore.ts";


const router = useRouter();

const branches = [
  {
    url: 'https://s3-alpha-sig.figma.com/img/759a/ee76/e6cc3331129cb98625552d07b3db5f12?Expires=1711324800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jHJjAGrNR5SyfU1xf6nnFED0KhN8bS5ngEuWco5OpD~zfYW66cgcQ-OJP9MZqoLmT4nu9yrTNMHe2XDgo48l76SMWtIuatmElohmr3xxFp2XtRTtVYT-Dv8aKBT7NL8O4mYHIBGTkktSGI9d4gtrMYUlyYf86JaIPdj~gtf379Bv83kzC1pfKxYyiC1sk0ayXzEPFXjDWI5dKVXJzOGSvy1FW8LWZGsmXuaaZNbcdV-Q5nJgRfBmyAV0JTLris5YGSQmhNDeSkny4Ft3Uw-bl6-O67Uy8M28mFspQIWXRHVTuoVxWcezwb8WBDXbkT2pNsxcHsr4WuaeOb7pY5MuIw__'
  },
  {
    url: 'https://s3-alpha-sig.figma.com/img/26e0/aed9/de47154fa5c404233e6957e034de6e59?Expires=1711324800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=iIRSVlHA4rfNw9bEap51EqoaNKvJQvEV1ewXr2zKJxvY2IN1lrFfSTEWBNBORIvDAAojXDoKAnkE1i3ZE4jUCX6C2aw9omkwC5RDGpJaLUGmHFacNyiJQyGuS9Hda1S7XjL2h1j6VxXe0mLJhiH-j0O6ntwFNkTuoBv~Cer25MQRpoLMybHvySbLgmgIRk4~ihQhHZI2lytHPliihPD5vg5dLN-rxEaVsLzlRbVaj6bZjTYb8uY9tMBT61bwiXl9RcARZOC-npFXxkxuUqeiEt2jt0OfqEIG4s4iYIv8u~G3U4VcXUPQDeq8Jdf4UKs~zPWrt0xTxJWYpbBGvR5MnQ__'
  },
  {
    url: 'https://s3-alpha-sig.figma.com/img/4cfe/6397/a2ed72f9096093229cd940b57a3323df?Expires=1711324800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aR06x5js0qsIHgtRkSOvA~ctAsgN8symfzsaysXfubeFHMwjirpytd8OY9LnTBbtVAhDMT-hGQD4HBVcRls15Wc0NY2RvsBRKajOQpqwxhJYAUAX1PCCJFr-mWo8zkQm-gUMhv0kJnjmSwzl4X41rZP6FYIeFyP~RVJvAc20F4oxs1dd6QNTnZHBWYm92xH8AkRn5ZOqwrDRlPHeXouYjTnn19e5F3HzWevOervUPCMJKPDDLw3rQN~ZEJE9fMaj1ncYLntwIsik1CC5VqMCn8KXkJA1QcDL1iL9U3h4NRwPEA1F3cSK~PJgdOn87hNCnuobm8dNOOhtv6re4rsKfw__'
  }
];


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
      name: res.data.attributes.name,
      description: res.data.attributes.description,
      address: res.data.attributes.address
    }
    headerItem.value.url = getFirstElemOrUndefined<string>(res.data.attributes.attachments)!;
  }).catch(e=>{
    console.log(e);
  });
  loadProducts();
  loadCategories();
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

const showHistory = ref<boolean>(false);

</script>

<template>
  <History v-model:show="showHistory"></History>
    <div>
        <div class="mb-4">
            <Header :item="headerItem"></Header>
        </div>
        <div class="mb-[6px]">
            <div class="px-4">
              <SearchInput class="mb-4"></SearchInput>
            </div>
            <div class="gap-3 flex pl-4 w-full overflow-scroll hide-scrollbar">
            <Image class="w-[154px] h-[88px] flex-shrink-0 rounded-2xl" :url="item.url" v-for="item in branches"></Image>
        </div>
        </div>
        <StickedScrollTab :categories="productsGroupedByCategory"></StickedScrollTab>
        <transition name="fade"><div v-if="false" class="px-4 w-full bottom-[40px] fixed z-[999]">
          <div @click="navigateToBasket" class="p-4 cursor-pointer text-center flex justify-between items-center text-white w-full bg-black-100 rounded-2xl ">
            <div class="flex gap-2 items-center">
              <BasketIcon color="white" width="24" height="24"></BasketIcon>
              <div>
                {{basket.data}}
              </div>
              <div class="h-6 w-[1px] bg-white"></div>
              <div>
                {{basket.data}}
              </div>
            </div>
            <ChevronRightIcon class="w-6 h-6"></ChevronRightIcon>
          </div>
        </div></transition>
      <div class="mt-[300px]"></div>
    </div>
</template>


