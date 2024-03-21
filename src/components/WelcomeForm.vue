<template>
    <div>
        <div class="max-w-[380px]">
            <div class="p-4 rounded-lg bg-white">
                <img class="w-full h-[210px] rounded-lg" :src="item.image" />
                <div class="font-medium flex flex-col justify-center items-center text-lg leading-[24px] mt-4">
                    <h2>Добро пожаловать в ресторан </h2>
                    <h2 >{{ item.title }}</h2>
                </div>
                <p class="text-[#9999A1] mt-[8px] text-[14px] leading-[20px] mx-auto max-w-[300px] text-center">{{ item.description }}</p>
                <div class="w-full mt-[24px]" >
                    <Input v-model="name" placeholder="Ваше имя" />
                </div>
            </div>
            <RouterLink :to="{
                name: 'user-guide'
            }">
                <Button class="mt-8 w-full text-center" >Сохранить</Button>
            </RouterLink>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import Button from '../components/Button';
import Input from '../components/Input';

const name = ref('');
defineProps(['item']);
</script>