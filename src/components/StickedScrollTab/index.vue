
<script lang="ts" setup>
import FoodCard, {Food} from "../FoodCard/index.ts";
import {onBeforeUnmount, onMounted, ref} from "vue";
import {ICategory} from "../../stores";
import { useScroll } from '@vueuse/core'
import TabSection from "./TabSection.vue";

const {categories} = defineProps<{
      categories: ICategory[]
}>();

const headerTab = ref<HTMLElement>();
const isPinned = ref(false);

const activeSectionIndex = ref<number | null>(0);

const { x } = useScroll(headerTab, { behavior: 'smooth' })

const foodExample: Food = {
  id: 1,
  name: 'Каша овсяная с ягодами',
  description: 'Молоко, геркулес, сахар, масло, соль, клубника, ежевика, грецкий орех',
  price: 2400,
  url: "https://s3-alpha-sig.figma.com/img/48ae/3fad/10e547891ac78464d295eb7d83dd957d?Expires=1711324800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BshNgKx-n0L~ekf-H4AnhtqraCb8qMpRod3CNxhpAguiWEc6rYeNgXpWf5ok0wBmqW7cW3PYPn1gpmiMcZ6~0GaGG5GGhBN0njEYlbMatrtGORzeXFGpbtT7UKzPXuKVDV8HJfOIBPvSnIJ19cCnabv2iccwaoLlx4TnZmEawkW35YZ-FvNqyWvo70KkHaN0YbGMYUF~kK6QU-4ytcmWw9vbMxL-4JM6-fiTrJegqRrL8MGD4oR6QJDR-pCdUOuUARQTi4v6NyCH7FMraeopKW7ODRqK2wUVDo~6kDLqMWDpltIaBR9H4Gn0PthtG67uKryVAw8D-7MGdb8Jta79Ig__"
};

const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (activeSectionIndex.value != entry.target.getAttribute('id')) {
            scrollHeaderSection(parseInt(entry.target.getAttribute('id')!));
            activeSectionIndex.value = parseInt(entry.target.getAttribute('id')!);
          }
        }
      });
    },
    {
      rootMargin: "0px 0px -70% 0px",
    });


const stickObserver = new IntersectionObserver(
    ([e]) => {
      isPinned.value = !e.isIntersecting;
    },
    { threshold: [1] }
);

onMounted(() => {
  observe();
});

onBeforeUnmount(()=>{
  unobserve();
});

const unobserve = () => {
  document.querySelectorAll('.section').forEach((section) => {
    sectionObserver.unobserve(section);
  });
  stickObserver.unobserve(document.querySelector(".sticky-header")!);
}

const observe = () => {
  document.querySelectorAll('.section').forEach((section) => {
    sectionObserver.observe(section);
  });

  stickObserver.observe(document.querySelector(".sticky-header")!);
}


const scrollToSection = (id: number) => {
  const scroll = document.getElementById(id.toString());
  window.scrollTo({
    top: Math.round(scroll!.getBoundingClientRect().top + document.documentElement.scrollTop) - 70,
    behavior: 'smooth'
  })
}

const scrollHeaderSection = (id: number) => {
  let elemsWidth = 0;

  if (id > activeSectionIndex.value!) {
    elemsWidth = document.getElementById('category'+activeSectionIndex.value)!.offsetWidth;
    x.value += elemsWidth;
  }
  else {
    elemsWidth += document.getElementById('category'+activeSectionIndex.value)!.offsetWidth;
    x.value -= elemsWidth;
  }
}

</script>
<template>
  <header ref="headerTab" class="hide-scrollbar flex sticky-header pl-4 py-[10px] -top-[1px] overflow-scroll sticky w-full z-10" :class="{
            'shadow-lg tr-bg rounded-b-[16px]': isPinned
        }">
    <TabSection :id="'category'+index" @click="() => scrollToSection(index)"
                :name="item.name"
                :is-active="activeSectionIndex == index" v-for="(item, index) in categories">
    </TabSection>
  </header>
  <section class="px-4 category-section" v-for="(item, index) in categories" :key="item.id">
      <h2 :id="index.toString()" :class="{
        'pt-[6px]': index == 0
      }" class="section font-medium py-4">{{ item.name }}</h2>
      <section class="grid lg:grid-cols-3 gap-3">
        <FoodCard :food="foodExample" v-for="_ in item.foods">
        </FoodCard>
      </section>
  </section>
</template>

<style scoped>
</style>