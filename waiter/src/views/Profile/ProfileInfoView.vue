<script setup lang="ts">
import Image from '../../components/Image';
import AppHeader from "../../components/AppHeader.vue";
import userStore from "../../stores/userStore.ts";
import Input from "../../components/Input/index.ts";
import {ref, watch} from "vue";
import Button from "../../components/Button/index.ts";


const name = ref<string | null>(null);

watch(userStore, (newUserStore, _)=>{
  name.value = newUserStore.user?.attributes.first_name
});

const changeProfileInfo = () => {
  // instance.put('/api/v1/user/profile/password', {
  //   name: newPassword.value,
  //   password_confirmation: newPassword2.value
  // }).then(_=>{
  //   router.push({
  //     name: 'profile-view'
  //   })
  // }).catch(e=>{
  //   console.log(e);
  // })
}

</script>

<template>
<AppHeader title="Мой профиль" :back-route="{
name: 'profile-view'
}" :show-menu="false">
</AppHeader>
  <main>
    <div class="mt-4 w-full flex-col flex justify-center items-center">
      <Image class="w-[178px] h-[178px] rounded-full" :url="userStore.user?.attributes.logo"></Image>
      <div class="text-center text-[#006AE6] mt-2">Изменить фото</div>
    </div>
    <div class="px-4 mt-[30px]">
      <Input v-model="name"  placeholder="Имя"></Input>
      <Button class="w-full mt-4" container-classes="!justify-center" @click="changeProfileInfo">Сохранить изменение</Button>
    </div>

  </main>
</template>

<style scoped>

</style>