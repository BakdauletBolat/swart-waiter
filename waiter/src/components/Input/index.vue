<template>
    <div class="w-full relative">
        <label :for="placeholder"
               class="text-lg left-[15px] text-slate-400 absolute transition-all cursor-text top-1/2 transform -translate-y-1/2"
                :class="{
                    '!text-red-100': error,
                    '!-translate-y-[40px] top-0 text-sm !text-black bg-white p-1': isFocus || model
                }">{{ placeholder }}</label>
        <input :type="type == 'password' ? 'password' : 'text'" @input="onInput" :class="{
          'border-red-100': error,
          'border-black': isFocus
        }" @focus="toggleFocus(true)" @blur="toggleFocus(false)" :id="placeholder" v-model="model" class="border focus:outline-none w-full px-4 py-3 rounded-2xl" />
      <div v-if="type != undefined && type == 'password'" class="cursor-pointer" @click="statusType=!statusType">
        <PasswordHideSwitcher class="absolute top-[14px] right-3"></PasswordHideSwitcher>
      </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import PasswordHideSwitcher from "../../assets/svg/PasswordHideSwitcher.vue";

defineProps<{
  placeholder: string;
  type?: string
}>()
const model = defineModel();
const error = defineModel('error');

const statusType = ref(true);
const isFocus = ref(false);

function toggleFocus(value:boolean) {
    isFocus.value = value
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