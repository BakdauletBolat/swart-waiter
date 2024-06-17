<script setup lang="ts">
import Tabs from '../components/Tabs/index.vue';
import {onMounted, ref, watch} from "vue";
import {ITabItem} from "../components/Tabs/TabItem.vue";
import {loadTables, orderStore} from "../stores/orderStore.ts";
import AppHeader from "../components/AppHeader.vue";
import OrderTableItem from "../components/OrderTableItem.vue";
import Spinner from "../components/Spinner.vue";

const activeTabIndex = ref<number>(0);

const tabsCollection = ref<ITabItem[]>([{
  indicatorCount: 0,
  title: 'Активные'
},
  {
    indicatorCount: 0,
    title: 'Свободные'
  },
  {
    indicatorCount: 0,
    title: 'Резерв'
  }]);

const onChangeTab = (index: number) => {
  activeTabIndex.value = index;
}


onMounted(()=>{
  loadTables(activeTabIndex.value);
})



watch(activeTabIndex, () => {
  loadTables(activeTabIndex.value);
});

watch(orderStore, (newV)=>{
    tabsCollection.value[activeTabIndex.value].indicatorCount = newV.tables.length;
});

</script>

<template>
  <AppHeader title="Столы" :show-menu="false" :centered="true"></AppHeader>
  <div class="px-4">
    <Tabs @onChangeTab="onChangeTab" :active-tab-index="activeTabIndex" :tabs="tabsCollection"></Tabs>
    <div :class="{
      'opacity-10': orderStore.isLoadingTables
    }" class="pt-4 relative" >
      <div class="absolute h-full top-0 w-full flex justify-center items-center p-4" v-if="orderStore.isLoadingTables">
        <Spinner></Spinner>
      </div>
     <div class="flex flex-col w-full gap-4">
       <OrderTableItem :status="activeTabIndex" :item="item" v-for="item in orderStore.tables"></OrderTableItem>
     </div>
    </div>
  </div>
<!--  {{orderStore.order}}-->
</template>

<style scoped>

</style>