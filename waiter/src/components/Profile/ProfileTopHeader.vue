<script setup lang="ts">
import {User} from "../../stores/userStore.ts";
import Image from "../Image";
import Button from '../Button';
import SettingsIcon from "../../assets/svg/SettingsIcon.vue";
import {useRouter} from "vue-router";

const router = useRouter();

defineProps<{
  user: User
}>()
</script>

<template>
  <div class="px-4 ">
    <div class="flex justify-between items-center py-4">
      <div class="flex items-center justify-center gap-2">
        <Image class="w-[48px] h-[48px] rounded-full" :url="user.attributes.logo"></Image>
        <div>
          <h2 class="text-[22px] leading-[28px]">{{user.attributes.first_name}}</h2>
          <p class="text-[#66666E] text-sm mt-[2px]">+7 (777) 567 56 56</p>
        </div>
      </div>
      <RouterLink :to="{
        name: 'profile-view'
      }">
        <SettingsIcon></SettingsIcon>
      </RouterLink>
    </div>
    <Button @click="router.push({
      name: 'table-view',
      query: {
        is_free_table: 'true'
      }
    })" class="w-full" container-classes="!justify-center">Создать заказ</Button>
  </div>
</template>

<style scoped>

</style>