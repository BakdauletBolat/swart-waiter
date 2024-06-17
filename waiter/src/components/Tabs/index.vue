<script setup lang="ts">
import TabItem, {ITabItem} from "./TabItem.vue";

defineProps<{
  tabs: ITabItem,
  activeTabIndex: number
}>();

const emit = defineEmits(['onChangeTab']);

</script>

<template>
    <div class="flex w-full">
      <TabItem @click="emit('onChangeTab', index)" :is-active="activeTabIndex == parseInt(index)"
               :item="item"
               v-for="(item, index) in tabs"></TabItem>
    </div>
</template>

<style scoped>

</style>