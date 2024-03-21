<template>
    <div class="h-screen bg-[#F4F4F6] w-full">
        <WelcomeForm class="flex flex-col justify-center h-full items-center" :item="welcomeProps"></WelcomeForm>
    </div>
</template>
<script setup lang="ts">
import WelcomeForm from '../components/WelcomeForm.vue';
const welcomeProps = {
    image: 'https://s3-alpha-sig.figma.com/img/dc8d/d16f/eba03ca4cfd8b8e2ad89a8ae1e92a6dd?Expires=1710720000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=h0dkLBcS8Nar47a0sesb0LRIjbiaVqjBkUR2Ii8yVwhGQ3aqFTsaRmefamGwdQ4WBBHOwn99BDkDHMibzWn6br8v-EDFyJCUIWrb1Okv21fro7mHzx9B3tyvLU-94H4sICyjHSvrEamHDn1-pVg0~8aikYjeAlWR~6IaVeowffKsgKx7-bWpeMueVIlqg24mL3mGxQrA7z~BA4k~HPLZHl1CkNwx5dANPBhK78QtflcrrwP-N8VO9LOmVJe6ScO4MArr2JLLCPEgDAiub35CBuKUxmsreiZdVb7Sl50LaVrJWWU6H4XLWp2eM08LPMQcnrCrpwONgRKEZZKVfoM-2A__',
    title: 'Villa Pasta!',
    description: 'Для дальнейшей работы c сервисом введите ваше имя'
}
</script>