<template>
    <div class="w-full relative">
        <label :for="placeholder"
               class="text-lg left-[15px] text-slate-400 absolute transition-all cursor-text top-1/2 transform -translate-y-1/2"
                :class="{
                    '!text-red-100': error,
                    '!-translate-y-[40px] top-0 text-sm !text-black bg-white p-1': isFocus || model
                }">{{ placeholder }}</label>
        <input ref="el" @accept="onAccept"
               @complete="onCompleted" @input="onInput" :class="{
          'border-red-100': error,
          'border-black': isFocus
        }" @focus="toggleFocus(true)" @blur="toggleFocus(false)" :id="placeholder" v-model="model" class="border focus:outline-none w-full px-4 py-3 rounded-2xl" />
        <div @click="model='+7'" class="cursor-pointer bg-black-100 p-[5px] absolute rounded-lg overflow-hidden top-[14px] right-3">
          <XMarkIcon class="h-[12px] text-white w-[12px]"></XMarkIcon>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useIMask } from 'vue-imask';
import {XMarkIcon} from "@heroicons/vue/24/outline";

defineProps(['placeholder'])
const model = defineModel();
const error = defineModel('error');
const emit = defineEmits(['onCompleted']);

const {el, unmasked} = useIMask({
  mask: "+{7} (000) 000-00-00",
  lazy: true
}, {
onComplete(_) {
  emit('onCompleted', unmasked.value)
},
});


const isFocus = ref(false);

function toggleFocus(value:boolean) {
    isFocus.value = value
}

function onAccept(e: any) {
  console.log(e);
}

function onCompleted(e: any) {
  console.log(e);
}

function onInput(event: any) {
  const value = event.target.value;
  if (value != '') {
    error.value = '';
  }
  else {
    error.value = "Обязательно"
  }
}
</script>