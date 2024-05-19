<script lang="ts" setup>
  const showModal = defineModel<boolean>();
</script>
<template>
  <transition name="fade">
  <div v-if="showModal" class="h-screen z-50 bg-transparent-20 top-0 w-full fixed">
      <div class="w-full h-full absolute"
           v-if="showModal"
           @click="showModal = false"></div>
  </div>
  </transition>
  <transition name="slide">
    <div class="fixed bg-white rounded-tr-2xl rounded-br-2xl w-[90%] h-screen z-[9999]" v-if="showModal">
        <slot></slot>
    </div>
  </transition>
</template>
<style>
.bg-transparent-20 {
  background: #00000033;
}
</style>