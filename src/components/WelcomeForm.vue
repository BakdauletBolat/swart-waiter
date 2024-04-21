<template>
    <div>
        <div class="max-w-[380px]">
            <div class="p-4 rounded-lg bg-white">
              <div v-if="item.image" >
                <img :alt="item.title" class="w-full h-[210px] rounded-lg" :src="item.image" />
              </div>
                <div class="font-medium flex flex-col justify-center items-center text-lg leading-[24px] mt-4">
                    <h2>Добро пожаловать в ресторан </h2>
                    <h2 >{{ item.title }}</h2>
                </div>
                <p class="text-[#9999A1] mt-[8px] text-[14px] leading-[20px] mx-auto max-w-[300px] text-center">{{ item.description }}</p>
                <div class="w-full mt-[24px]" >
                    <Input v-model:error="name.error" v-model="name.value" placeholder="Ваше имя" />
                </div>
            </div>

          <Button container-classes="!justify-center" :loading="isLoading" @click="next" class="mt-8 w-full text-center" >Сохранить</Button>
        </div>
    </div>
</template>
<script setup lang="ts">
import {reactive, ref} from 'vue';
import Button from '../components/Button';
import Input from '../components/Input';
import {useRouter} from "vue-router";
import {createCustomer} from "../api/customer.ts";
import userInformationStore from "../stores/userInformationStore.ts";
import {addToast} from "./ToastComponent/index.ts";
const router = useRouter();

const isLoading = ref<boolean>(false);
const name = reactive({
  value: '',
  error: ''
});


const next = () => {
  if (name.value == '' || name.value == undefined) {
      name.error = 'Обязательно';
      return;
  }
  isLoading.value = true;
  navigator.geolocation.getCurrentPosition((position)=>{
    userInformationStore.setName(name.value);
    userInformationStore.setLocation({
      lat: position.coords.latitude.toString(),
      lng: position.coords.longitude.toString()
    })
    createCustomer({
      uuid:userInformationStore.store.value!.uuid,
      data: {
        device: "mac",
        ip: "127.0.0.1",
        browser: "chrome"
      },
      full_name: userInformationStore.store.value!.name,
      location: userInformationStore.store.value?.location!
    }).then((_)=>{
      router.push({
        name: 'user-guide'
      });
    }).catch(e=>{
      addToast({
        message: e.toString(),
        timeout: 5000
      });
      userInformationStore.setLocation(undefined);
    });
    isLoading.value = false;
  }, (error)=>{
    userInformationStore.setErrorLocation(error.message)
    isLoading.value = false;
    router.push({name: 'access-location', query: {
        redirect: 'user-guide'
      }});
  });
}
defineProps(['item']);
</script>