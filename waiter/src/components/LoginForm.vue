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
                    <Input v-model:error="phone.error" v-model="phone.rawValue" placeholder="Логин" ></Input>
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
import Input from '../components/Input';
import userStore, {loadProfile, loginUser} from "../stores/userStore.ts";
import {useRouter} from "vue-router";
import {addToast} from "./ToastComponent/index.ts";


const router = useRouter();

const login = async () => {
    userStore.isLoading = true;
    loginUser({
      login: phone.rawValue,
      password: password.value
    }).then(res=>{
      localStorage.setItem("access_token", res.token);
      localStorage.setItem("refresh_token", res.refresh_token);
      loadProfile(router).then(()=>{
        router.push({
          name: 'menu-view'
        })
      });
    }).finally(()=>{
      userStore.isLoading=false;
    }).catch(e=>{
      addToast({
        message: e.response.data.message,
        timeout: 5000
      })
    });
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