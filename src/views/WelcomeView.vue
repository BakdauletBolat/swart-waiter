<template>
    <div class="h-screen bg-[#F4F4F6] w-full">
        <WelcomeForm class="flex flex-col justify-center h-full items-center" :item="welcomeProps"></WelcomeForm>
    </div>
</template>
<script setup lang="ts">
import WelcomeForm from '../components/WelcomeForm.vue';
const welcomeProps = {
    image: 'https://s3-alpha-sig.figma.com/img/dc8d/d16f/eba03ca4cfd8b8e2ad89a8ae1e92a6dd?Expires=1711929600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UkAQN1mAyivLLi7-2eKGnWW3RW31EQWdC0vcnhwtb~1RRuKYWOxmrA~dVFShNYQxj2cKPtE9xgERplQ9ELfFhhtJpTkuiwErt3phD-RXa6YLu5djCdcXqnSmDf82Qmh-FkNWKwHdCQ9c71zZssq5hZ5lLwIHTsERXYhnk9~VoSYj8Quhnp5rbN99s~R6bamYX9diEQP3k8jhSmbdGyfecLVLJKgAfy1gWiNaRynbs5vOuzkfZm9AiVvE7sqrJ6nFa2O0P6SYwW0PDKrr-0W5p5cgAr6dUIGaI-CWjYBN7c7ocdsORpGDKApHA2ZrOJ4IRDauSUlzaOMgP7dstbSYtg__',
    title: 'Villa Pasta!',
    description: 'Для дальнейшей работы c сервисом введите ваше имя'
}
</script>