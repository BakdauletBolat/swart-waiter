<template>
    <div class=" flex justify-center items-center flex-col h-screen w-full px-4">
        <div class="max-w-[276px]">
            <div v-if="isLoading" class="flex justify-center">
                <Spinner class="w-[200px]  border-slate-700 h-[200px]"></Spinner>
            </div>
            <div v-else class="w-full flex justify-center">
                <NotLocationAccessSVG></NotLocationAccessSVG>
            </div>
            <h2 class="mt-4 font-medium text-center">Разрешите сайту использовать вашу геопозицию</h2>
            <p class="text-[#9999A1] text-sm text-center mt-2">Для начала работы необходимо предоставить доступ к вашей геопозиции</p>
        </div>
      <Button @click="navigate" class="flex mt-[32px] justify-center w-full">Повторить попытку</Button>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Spinner from '../components/Spinner.vue';
import userInformationStore from "../stores/userInformationStore.ts";
import NotLocationAccessSVG from "../assets/svg/NotLocationAccessSVG.vue";
import Button from '../components/Button';
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

function navigate() {
  router.push({
    path: route.query.redirect?.toString()
  });
}

const onSucces = (pos: any) => {
    permissionState.value = 'granted';
    isLoading.value = false;
    userInformationStore.setLocation({
      lat: pos.coords.latitude,
      lng: pos.coords.longitude
    });

    if (route.query.redirect != undefined) {
        navigate();
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