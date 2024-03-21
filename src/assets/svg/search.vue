<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" :width="widthAttr" :height="heightAttr" overflow="visible">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M17.9697 17.9697C18.2626 17.6768 18.7374 17.6768 19.0303 17.9697L22.5303 21.4697C22.8232 21.7626 22.8232 22.2374 22.5303 22.5303C22.2374 22.8232 21.7626 22.8232 21.4697 22.5303L17.9697 19.0303C17.6768 18.7374 17.6768 18.2626 17.9697 17.9697Z" fill="#66666E" />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.5 2.75C9.905 2.75 8.41179 3.17608 7.12554 3.92014C6.767 4.12754 6.3082 4.00502 6.1008 3.64648C5.89339 3.28793 6.01591 2.82913 6.37446 2.62173C7.88286 1.74916 9.63427 1.25 11.5 1.25C17.1609 1.25 21.75 5.83908 21.75 11.5C21.75 17.1609 17.1609 21.75 11.5 21.75C5.83908 21.75 1.25 17.1609 1.25 11.5C1.25 9.63427 1.74916 7.88286 2.62173 6.37446C2.82913 6.01591 3.28793 5.89339 3.64648 6.1008C4.00502 6.3082 4.12754 6.767 3.92014 7.12554C3.17608 8.41179 2.75 9.905 2.75 11.5C2.75 16.3325 6.66751 20.25 11.5 20.25C16.3325 20.25 20.25 16.3325 20.25 11.5C20.25 6.66751 16.3325 2.75 11.5 2.75Z" fill="#66666E" /></svg>
</template>

<script>
  export default {
    name: 'Search',

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
