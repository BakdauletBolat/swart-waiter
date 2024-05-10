
<script lang="ts" setup>
import FoodCard from "../FoodCard/index.ts";
import {onBeforeUnmount, onMounted, ref, watch} from "vue";
import TabSection from "./TabSection.vue";
import {Category, menuStore} from "../../stores/productStore.ts";
import {Product} from "../../api";
import LoadingMainMenuComponent from "../LoadingMainMenuComponent.vue";


const props = defineProps<{
      categories: {
        category: Category,
        products: Product[]
      }[]
}>();

const headerTab = ref<HTMLElement>();
const isPinned = ref(false);

const activeSectionIndex = ref<number | null>(0);

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
  const stickyHeaderItems = document.querySelectorAll(".sticky-header");
  stickyHeaderItems.forEach((item)=>{
    stickObserver.unobserve(item);
  })
}

const observe = () => {
  setTimeout(()=>{
    document.querySelectorAll('.section').forEach((section) => {
      sectionObserver.observe(section);
    });
    const stickyHeaderItems = document.querySelectorAll(".sticky-header");
    stickyHeaderItems.forEach((item)=>{
      stickObserver.observe(item);
    })
  }, 1)
}


const scrollToSection = (id: number) => {
  const scrollElement = document.getElementById(id.toString());
  window.scrollTo({
    top: Math.round(scrollElement!.getBoundingClientRect().top + document.documentElement.scrollTop) - 70
  })
}

const scrollHeaderSection = (id: number) => {
  const item = document.getElementById('category'+id);
  item!.scrollIntoView();
}

watch(props, (_, __) => {
  unobserve();
  observe();
})

</script>
<template>
  <LoadingMainMenuComponent v-if="menuStore.isLoadingCategory || menuStore.isLoadingProduct"></LoadingMainMenuComponent>
  <div v-if="categories.length > 0">
    <header ref="headerTab" class="hide-scrollbar  flex sticky-header pl-4 pr-4 py-[10px] -top-[1px] overflow-scroll sticky w-full z-10" :class="{
            'shadow-lg tr-bg rounded-b-[16px]': isPinned
        }">
      <TabSection :id="'category'+index" @click="() => scrollToSection(index)"
                  :name="item.category.name"
                  class="scroll-ml-3 scroll-mr-3"
                  :is-active="activeSectionIndex == index" v-for="(item, index) in categories">
      </TabSection>
    </header>
    <section class="px-4 category-section" v-for="(item, index) in categories" :key="item.category.id">
      <h2 :id="index.toString()" :class="{
        'pt-[6px]': index == 0
      }" class="section font-medium py-4">{{ item.category.name }}</h2>
      <section class="grid lg:grid-cols-3 gap-3">
        <FoodCard :food="product" v-for="product in item.products">
        </FoodCard>
      </section>
    </section>
  </div>

</template>

<style scoped>
</style>