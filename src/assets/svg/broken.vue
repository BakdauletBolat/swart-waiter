<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" :width="widthAttr" :height="heightAttr" overflow="visible">
    <path d="M9.17065 4C9.58249 2.83481 10.6937 2 11.9999 2C13.3062 2 14.4174 2.83481 14.8292 4" stroke="#66666E" stroke-width="1.5" stroke-linecap="round" />
    <path d="M20.5 6H3.49991" stroke="#66666E" stroke-width="1.5" stroke-linecap="round" />
    <path d="M18.3734 15.3991C18.1964 18.054 18.1079 19.3815 17.2429 20.1907C16.3779 21 15.0475 21 12.3867 21H11.6133C8.95251 21 7.62211 21 6.7571 20.1907C5.89209 19.3815 5.80359 18.054 5.6266 15.3991L5.16666 8.5M18.8333 8.5L18.6333 11.5" stroke="#66666E" stroke-width="1.5" stroke-linecap="round" />
    <path d="M9.5 11L10 16" stroke="#66666E" stroke-width="1.5" stroke-linecap="round" />
    <path d="M14.5 11L14 16" stroke="#66666E" stroke-width="1.5" stroke-linecap="round" /></svg>
</template>

<script>
  export default {
    name: 'Broken',

    props: {
      width: {
        type: String,
        required: false
      },

      height: {
        type: String,
        required: false
      },

      size: {
        type: String,
        required: false
      }
    },

    computed: {
      widthAttr() {
        if (this.height) return undefined;
        if (this.size) return this.size;
        return this.width || "24px";
      },

      heightAttr() {
        if (this.width) return undefined;
        if (this.size) return this.size;
        return this.height || "24px";
      }
    }
  }
</script>
