<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" :width="widthAttr" :height="heightAttr" overflow="visible">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 7.25C12.4142 7.25 12.75 7.58579 12.75 8V11.6893L15.0303 13.9697C15.3232 14.2626 15.3232 14.7374 15.0303 15.0303C14.7374 15.3232 14.2626 15.3232 13.9697 15.0303L11.4697 12.5303C11.329 12.3897 11.25 12.1989 11.25 12V8C11.25 7.58579 11.5858 7.25 12 7.25Z" fill="#66666E" />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2.75C10.3139 2.75 8.73533 3.20043 7.37554 3.98703C7.017 4.19443 6.5582 4.07191 6.3508 3.71337C6.14339 3.35482 6.26591 2.89602 6.62446 2.68862C8.2064 1.77351 10.0432 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12C1.25 10.0432 1.77351 8.2064 2.68862 6.62446C2.89602 6.26591 3.35482 6.14339 3.71337 6.3508C4.07191 6.5582 4.19443 7.017 3.98703 7.37554C3.20043 8.73533 2.75 10.3139 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75Z" fill="#66666E" /></svg>
</template>

<script>
  export default {
    name: 'Clock',

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
