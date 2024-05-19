<script setup lang="ts">
import {computed, onMounted, ref, watch} from "vue";
  const timeout = ref<number>(0);
  const interval = ref<any>(null);
  const MAXTIMEOUT = 5000;

  const percent = computed(()=>{
    return 100 * timeout.value / 5000;
  });

  const props = defineProps<{
    index: number,
    activeIndex: number
  }>();

  const emit = defineEmits(['stepNext']);


  watch(()=>props.activeIndex, (changed, _)=>{
      startTimer(changed);
      if (changed > props.index) {
        timeout.value = 5000;
      }
      else {
        timeout.value = 0;
      }
  })

  function startTimer(activeIndex: number) {
    if (props.index == activeIndex) {
      console.log('Started interval')
      timeout.value = 0;
      interval.value = setInterval(()=>{
        timeout.value += 10;
        if (timeout.value >= MAXTIMEOUT) {
          console.log('Stoped interval')
          clearInterval(interval.value);
          emit('stepNext');
        }
      }, 10);
    }
    else {
      if (interval.value != null) {
        console.log('stoped interval')
        clearInterval(interval.value)
      }
    }
  }
  onMounted(()=>{
    startTimer(props.activeIndex);
    if (props.activeIndex > props.index) {
      timeout.value = 5000;
    }
    else {
      timeout.value = 0;
    }
  });
</script>

<template>
  <div class="h-[4px] bg-[#E6E6E9] w-full rounded-[1px]">
    <div class="h-[4px] bg-[#FFB800]" :style="{
          width:  percent+'%'
        }"></div>
  </div>
</template>

<style scoped>

</style>