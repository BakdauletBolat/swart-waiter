<template>
    <div class=" flex justify-center items-center flex-col h-screen w-full">
        <div class="max-w-[276px]">
            <div v-if="isLoading" class="flex justify-center">
                <Spinner class="w-[200px]  border-slate-700 h-[200px]"></Spinner>
            </div>
            <div v-else>
                <div v-if="permissionState == 'denied'" class="flex justify-center">
                    <XCircleIcon class="w-[200px] text-red-400 h-[200px]"></XCircleIcon>
                </div>
                <div v-else-if="permissionState == 'granted'" class="flex justify-center">
                    <CheckCircleIcon class="w-[200px] h-[200px] text-green-400"></CheckCircleIcon>
                </div>
                <div v-else class="flex justify-center">
                    <img :src="BasketImage" />
                </div>
            </div>
            <h2 class="mt-[60px] text-[24px] font-medium text-center">Получить геолокацию</h2>
            <p class="text-[#9999A1] text-center mt-[24px]">{{ errorValue }}</p>
            <p class="text-[#9999A1] text-center mt-[24px]">Для работы сервиса Smart Waiter нужно геолокация</p>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import BasketImage from '../assets/images/basket.png';
import { XCircleIcon, CheckCircleIcon } from '@heroicons/vue/24/outline';
import { useRoute, useRouter } from 'vue-router';
import Spinner from '../components/Spinner.vue';
import userInformationStore from "../stores/userInformationStore.ts";

const permissionState = ref('promt');
const router = useRouter();
const route = useRoute();
const errorValue = ref();
const isLoading = ref(false);

onMounted(() => {
    if (permissionState.value == 'promt') {
        isLoading.value = true;
        navigator.geolocation.getCurrentPosition(onSucces, onError);
    }
    permissionListener();
});

const onSucces = (pos: any) => {
    permissionState.value = 'granted';
    isLoading.value = false;
    userInformationStore.setLocation({
      lat: pos.coords.latitude,
      lng: pos.coords.longitude
    });

    if (route.query.redirect != undefined) {
        router.push({
            path: route.query.redirect?.toString()
        });
    }
}

const onError = (error: any) => {
    permissionState.value = 'denied';
    isLoading.value = false;
    errorValue.value = error.message;
    userInformationStore.setErrorLocation(error.message);
}



const permissionListener = () => {
    navigator.permissions
        .query({ name: "geolocation" })
        .then((permissionStatus) => {
            permissionState.value = permissionStatus.state;
            permissionStatus.onchange = () => {
                permissionState.value = permissionStatus.state;
                if (permissionState.value == 'granted') {
                    isLoading.value = true;
                    navigator.geolocation.getCurrentPosition(onSucces, onError);
                }
            };
        });
}

</script>