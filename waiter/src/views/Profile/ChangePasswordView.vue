<script setup lang="ts">
import Input from '../../components/Input';
import AppHeader from "../../components/AppHeader.vue";
import Button from "../../components/Button/index.ts";
import {ref} from "vue";
import {instance} from "../../api";
import {useRouter} from "vue-router";

const router = useRouter();

const currentPassword = ref('');
const newPassword = ref('');
const newPassword2 = ref('');

const diffError = ref<string | null>(null);


const changePassword = () => {
  if (newPassword.value != newPassword2.value) {
    diffError.value = 'Ошибка'
    return;
  }
  instance.put('/api/v1/user/profile/password', {
    password: newPassword.value,
    password_confirmation: newPassword2.value
  }).then(_=>{
    router.push({
      name: 'profile-view'
    })
  }).catch(e=>{
    console.log(e);
  })
}

</script>



<template>
  <AppHeader :back-route="{
    name: 'profile-view'
  }" title="Смена пароля" :show-menu="false" ></AppHeader>
<div class="px-4 mt-4">
  <Input v-model="currentPassword" type="password" placeholder="Текущий пароль"></Input>
  <Input v-model="newPassword" class="mt-4" type="password" placeholder="Новый пароль"></Input>
  <Input v-model="newPassword2" v-model:error="diffError" class="mt-4" type="password" placeholder="Повторите новый пароль"></Input>
  <Button class="w-full mt-4" container-classes="!justify-center" @click="changePassword">Сохранить изменение</Button>
</div>
</template>

<style scoped>

</style>