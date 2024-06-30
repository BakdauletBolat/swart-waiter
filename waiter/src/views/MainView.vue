<script setup lang="ts">
import BottomBar from "../components/BottomBar.vue";
import {bottomBarNavigation} from "../navigations/bottomBarNavigation.ts";


</script>

<template>
    <div class="flex flex-col h-screen">
      <div class="h-full">
        <RouterView></RouterView>
      </div>
      <div class="h-[80px] w-full fixed bottom-0">
        <BottomBar :navigations="bottomBarNavigation"></BottomBar>
      </div>
    </div>
</template>


