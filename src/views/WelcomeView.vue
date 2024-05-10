<template>
    <div class="h-screen bg-[#F4F4F6] w-full">
        <WelcomeForm v-if="welcomeProps" class="flex flex-col justify-center h-full items-center" :item="welcomeProps"></WelcomeForm>
    </div>
</template>
<script setup lang="ts">
import WelcomeForm from '../components/WelcomeForm.vue';
import {getRestoran} from "../api";
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {getFirstElemOrUndefined} from "../utils";
import {start} from "../api/pusher.ts";

const route = useRoute();

const welcomeProps = ref<{
  title: string;
  image?: string;
  description: string;
}>();

onMounted(async ()=>{
  if (route.query.host != null ) {
    localStorage.setItem('multi_tenant_domain_name', route.query.host!.toString()!);
    start();
  }
  if (route.query.hash != null) {
    localStorage.setItem('table', route.query.hash!.toString().replace(' ', '+'));
  }

  getRestoran().then(res=>{
    welcomeProps.value = {
      title: res.attributes.name,
      image: getFirstElemOrUndefined<string>(res.attributes.attachments),
      description: res.attributes.description
    }
  });
});


</script>