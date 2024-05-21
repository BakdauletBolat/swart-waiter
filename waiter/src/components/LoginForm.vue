<template>
    <div>
        <div class="max-w-[380px]">
            <div class="p-4 rounded-lg bg-white">
                <div class="flex justify-center">
                  <SVGBasketIcon width="128" height="128"></SVGBasketIcon>
                </div>
                <div class="font-medium text-lg text-center flex flex-col justify-center items-center mt-4">
                    <h2>Добро пожаловать в приложение для <br> официантов Smart Waiter!</h2>
                </div>
                <p class="text-[#9999A1] mt-[8px] text-[14px] leading-[20px] mx-auto max-w-[300px] text-center">Введите логин и пароль</p>
                <div class="w-full mt-[24px]" >
                    <PhoneInput @onCompleted="(rawValue: string)=>phone.rawValue = rawValue" v-model:error="phone.error" v-model="phone.value" placeholder="Номер телефона" />
                    <Input class="mt-[24px]" type="password" v-model:error="password.error" v-model="password.value" placeholder="Пароль" ></Input>
                </div>
            </div>
          <Button :class="{
                'justify-center': userStore.isLoading
                }" container-classes="!justify-center" :loading="userStore.isLoading" @click="login" class="mt-8 w-full flex justify-center text-center" >Войти</Button>
        </div>
    </div>
</template>
<script setup lang="ts">
import {reactive} from 'vue';
import SVGBasketIcon from "../assets/svg/SVGBasketIcon.vue";
import Button from '../components/Button';
import PhoneInput from '../components/PhoneInput';
import Input from '../components/Input';
import userStore, {loadProfile, loginUser} from "../stores/userStore.ts";
import {useRouter} from "vue-router";


const router = useRouter();



const login = async () => {
  try {
    const data = await loginUser({
      login: phone.rawValue,
      password: password.value
    });
    localStorage.setItem("access_token", data.token);
    localStorage.setItem("refresh_token", data.refresh_token);
    await loadProfile().then(()=>{
      console.log(userStore.user)
      router.push({
        name: 'main-view'
      })
    });
  }
  catch (e) {
    console.log(e);
  }
}

const phone = reactive({
  rawValue: '',
  value: '+7',
  error: ''
});

const password = reactive({
  value: '',
  error: ''
});
</script>