<script setup lang="ts">
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import {getProduct, Product} from "../api/product.ts";
import {getFirstElemOrUndefined} from "../utils";
import Card from "../components/Card.vue";
import {XMarkIcon} from "@heroicons/vue/24/outline";
import FireIcon from "../assets/svg/FireIcon.vue";
import ClockIcon from "../assets/svg/ClockIcon.vue";
import Button from '../components/Button';
import FoodCard from "../components/FoodCard";
import {MinusIcon, PlusIcon} from "@heroicons/vue/24/outline";
import {
  addOrCreate,
  changeQuantityFromBasket,
  checkInBasket,
  getFromBasket,
  removeFromBasket
} from "../stores/basketStore.ts";
import userInformationStore from "../stores/userInformationStore.ts";

const product = ref<Product>();
const isLoading = ref<boolean>(false);
const route = useRoute();

onMounted(()=>{
  isLoading.value = true;
  getProduct(parseInt(route.params.id.toString()))
      .then(res=>product.value = res.data)
      .catch(e=>{
        console.log(e);
      })
      .finally(()=>isLoading.value=false);

});

function changeQuantity(quantity: number) {
  if (quantity <= 0) {
    removeFromBasket(product.value!.id);
  }
  changeQuantityFromBasket({
    cart_id: getFromBasket(product.value!.id).id,
    quantity: quantity
  })
}

</script>

<template>
  <main v-if="product">
    <section class="h-[280px] w-full relative overflow-hidden rounded-bl-2xl rounded-br-2xl">
      <img alt="Photo" class="w-full h-full object-cover" :src="getFirstElemOrUndefined<string>(product!.attributes.images)">
      <RouterLink :to="{
        name: 'menu'
      }" class="cursor-pointer bg-black-100 p-2 absolute rounded-2xl overflow-hidden top-3 right-2">
        <XMarkIcon class="h-6 text-white w-6"></XMarkIcon>
      </RouterLink>
    </section>
    <Card class="mt-6 mx-4">
      <h2 class="font-medium text-[20px] leading-[24px]">{{product.attributes.name.ru}}</h2>
      <span class="text-[#9999A1] text-sm mt-2 block">212 г</span>
      <p class="mt-2">{{product.attributes.description.ru}}</p>
      <div class="mt-4 flex gap-2 justify-between">
        <div class="flex gap-2">
          <div class="p-[6px] bg-[#F4F4F6] rounded-[6px]">
            <FireIcon color="#FF1F00" width="24" height="24"></FireIcon>
          </div>
          <div class="p-[6px] bg-[#F4F4F6] rounded-[6px]">
            <FireIcon color="#FF1F00" width="24" height="24"></FireIcon>
          </div>
          <div class="p-[6px] bg-[#F4F4F6] rounded-[6px]">
            <FireIcon color="#FF1F00" width="24" height="24"></FireIcon>
          </div>
        </div>
        <div class="text-sm gap-2 rounded-lg text-white bg-[#FFB800] flex justify-center items-center px-[10px] py-2">
          <ClockIcon color="white" width="16" height="16"></ClockIcon>
          <span>15-20 мин</span>
        </div>
      </div>
    </Card>
    <Card class="mt-4 mx-4">
      <h4 class="leading-[17px] text-sm">Пищевая ценность</h4>
      <p class="text-[#9999A1] text-xs mt-2">на 100 г</p>
      <div class="flex gap-2 mt-2">
        <div class="bg-[#F4F4F6] p-2 rounded-lg">
          <div class="text-sm ">165</div>
          <div class="text-xs leading-[14.3px] text-[#9999A1] mt-2">ккал</div>
        </div>
        <div class="bg-[#F4F4F6] p-2 rounded-lg">
          <div class="text-sm ">12,5 г</div>
          <div class="text-xs leading-[14.3px] text-[#9999A1] mt-2">белки</div>
        </div>
        <div class="bg-[#F4F4F6] p-2 rounded-lg">
          <div class="text-sm ">8,4 г</div>
          <div class="text-xs leading-[14.3px] text-[#9999A1] mt-2">жиры</div>
        </div>
        <div class="bg-[#F4F4F6] p-2 rounded-lg">
          <div class="text-sm ">9,1 г</div>
          <div class="text-xs leading-[14.3px] text-[#9999A1] mt-2">углеводы</div>
        </div>
      </div>
    </Card>
    <div class="mx-4 mt-6">
      <h2>Вместе с этим берут</h2>
      <div class="mt-4">
        <FoodCard :food="food" v-for="food in product.included.recommendations.data"></FoodCard>
      </div>
    </div>
    <div class="h-[140px]"></div>
    <div class="fixed w-full rounded-tl-2xl rounded-tr-2xl overflow-hidden top-shadow bottom-0 tr-bg pb-[40px] pt-[10px] px-4">
      <div class="w-full flex">
        <div v-if="checkInBasket(product.id)" class="flex gap-[18px] items-center w-full">
          <div @click="changeQuantity(getFromBasket(product.id).attributes.quantity - 1)" class="cursor-pointer p-2 bg-black-100 rounded-2xl"><MinusIcon class="w-6 h-6 text-white"></MinusIcon></div>
          <span>{{getFromBasket(product.id).attributes.quantity}}</span>
          <div @click="changeQuantity(getFromBasket(product.id).attributes.quantity + 1)" class="cursor-pointer p-2 bg-black-100 rounded-2xl"><PlusIcon class="w-6 h-6 text-white"></PlusIcon></div>
        </div>
        <Button class="w-full" @click="addOrCreate({
              product_id: product.id,
              quantity: 1,
              uuid: userInformationStore.store.value!.uuid,
            })">
          <div class="flex gap-2 flex-nowrap">
            <span class="text-nowrap">{{product.attributes.price}} ₸</span>
            <span class="h-6 w-[1px] bg-white"></span>
            <span>Добавить</span>
          </div>
        </Button>
      </div>
    </div>
  </main>
</template>

<style scoped>
.top-shadow {
  box-shadow: 0px -4px 6px 0px #00000026;
}
</style>