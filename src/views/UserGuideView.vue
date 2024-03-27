<template>
    <div class="flex flex-col h-[90vh] justify-center">
        <swiper-container class="w-full" ref="swiperRef" @swiperslidechange="onSlideChange">
            <swiper-slide :key="option.title" v-for="option in options">
                <GuideItemComponent class="w-full h-full flex-col flex justify-center items-center" :item="option">
                </GuideItemComponent>
            </swiper-slide>
        </swiper-container>
        <div class="flex mt-[60px] items-center justify-center gap-[8px]">
            <div class="w-[16px] h-[4px] bg-[#E6E6E9]  rounded-[1px]" :class="{
            'w-[38px] bg-[#FFB800]': index == activeIndex
        }" v-for="index in options.length"></div>
        </div>
        <div class="absolute bottom-[26px] w-full flex  justify-between px-[16px]">
            <div>
                <Transition name="fade">
                    <Button @click="prev" v-if="activeIndex > 1">
                        Назад
                        <template #prepend>
                            <ChevronLeftIcon class="w-[24px] h-[24px]"></ChevronLeftIcon>
                        </template>
                    </Button>
                </Transition>
            </div>
            <div>
                <Button @click="next">
                        <div class="relative" v-if="activeIndex < 4">
                            Далее
                        </div>
                        <div v-else>
                            Начать заказ!
                        </div>
                    <template #append>
                        <ChevronRightIcon class="w-[24px] h-[24px]"></ChevronRightIcon>
                    </template>
                </Button>

            </div>
        </div>
    </div>

</template>
<script setup lang="ts">
import GuideItemComponent, { GuideItem } from '../components/GuideItem';
import Img1 from '../assets/images/guides/1.png';
import Img2 from '../assets/images/guides/2.png';
import Img3 from '../assets/images/guides/3.png';
import Img4 from '../assets/images/guides/4.png';
import Button from '../components/Button';
import { useRouter } from 'vue-router';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline';
import { ref } from 'vue';
import { SwiperContainer, register } from 'swiper/element/bundle';
register();

const activeIndex = ref(1);
const swiperRef = ref<SwiperContainer | null>(null);
const router = useRouter();
const onSlideChange = (e: any) => {
    const index = e.detail[0].activeIndex;
    activeIndex.value = index + 1;
}

const next = () => {
    if (activeIndex.value == 4) {
        navigateToMenu();
        return;
    } 
    swiperRef.value?.swiper.slideNext();
}

const navigateToMenu = () => {
    router.push({name: 'access-location', query: {
        redirect: 'menu'
      }});
}

const prev = () => {
    swiperRef.value?.swiper.slidePrev();
}

const options: GuideItem[] = [
    {
        title: 'Добро пожаловать',
        description: 'Добро пожаловать в сервис по автоматизации ресторанных процессов “Smart Waiter”',
        url: Img1
    },
    {
        title: 'Описание каждого блюда',
        description: 'Ознакомьтесь с меню, выбирайте блюда, читайте подробное описание каждого блюда и добавляйте в корзину',
        url: Img2
    },
    {
        title: 'Вместе заказывать теперь легко',
        description: 'Вы можете видеть заказы всех гостей за столом, итог по стоимости своего заказа и общий. Один гость оплачивает весь чек, но вы видите сколько по стоимости вышел именно ваш заказ с учетом всех скидок и обслуживания',
        url: Img3
    },
    {
        title: 'Отслеживайте статус блюда',
        description: 'Теперь не придется подзывать официанта, чтобы уточнить сколько времени потребуется ждать, вы будете видеть статус каждого блюда у себя в телефоне',
        url: Img4
    }
]
</script>