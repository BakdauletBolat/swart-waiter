<script setup lang="ts">

import AppHeader from "../../components/AppHeader.vue";
import UserIcon from "../../assets/svg/Profile/UserIcon.vue";
import ProfileNavigationItem from '../../components/Profile/ProfileNavigationItem.vue';
import ChangePassword from "../../assets/svg/Profile/ChangePassword.vue";
import HistoryIcon from "../../assets/svg/Profile/HistoryIcon.vue";
import LanguageIcon from "../../assets/svg/Profile/LanguageIcon.vue";
import LogoutIcon from "../../assets/svg/Profile/LogoutIcon.vue";

const navigations = [
  {
    title: 'Личные данные',
    icon: UserIcon,
    route: {
      name: 'menu-view'
    }
  },
  {
    title: 'Сменить пароль',
    icon: ChangePassword,
    route: {
      name: 'menu-view'
    }
  },
  {
    title: 'История заказов',
    icon: HistoryIcon,
    route: {
      name: 'menu-view'
    }
  },
  {
    title: 'Язык интерфейса',
    icon: LanguageIcon,
    route: {
      name: 'menu-view'
    }
  },
  {
    title: 'Выйти из профиля',
    icon: LogoutIcon,
    route: {
      name: 'menu-view'
    }
  }
];
</script>

<template>
<AppHeader :back-route="{
   name: 'menu-view'
}" :showMenu="false" title="Мой профиль"></AppHeader>
  <div class="px-4 pt-4">
    <div class="flex flex-col gap-2">
      <ProfileNavigationItem class="[&:nth-child(5)]:mt-4" :item="item" v-for="item in navigations"></ProfileNavigationItem>
    </div>
  </div>
</template>
<style scoped>

</style>