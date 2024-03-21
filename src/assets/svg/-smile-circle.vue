<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" :width="widthAttr" :height="heightAttr" overflow="visible">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.39746 15.5534C8.64412 15.2206 9.11383 15.1508 9.4466 15.3975C10.1749 15.9373 11.0541 16.25 12 16.25C12.9459 16.25 13.825 15.9373 14.5534 15.3975C14.8861 15.1508 15.3559 15.2206 15.6025 15.5534C15.8492 15.8861 15.7794 16.3559 15.4466 16.6025C14.4742 17.3233 13.285 17.75 12 17.75C10.715 17.75 9.52578 17.3233 8.55337 16.6025C8.22061 16.3559 8.1508 15.8861 8.39746 15.5534Z" fill="#66666E" />
    <path d="M16 10.5C16 11.3284 15.5523 12 15 12C14.4477 12 14 11.3284 14 10.5C14 9.67157 14.4477 9 15 9C15.5523 9 16 9.67157 16 10.5Z" fill="#66666E" />
    <path d="M10 10.5C10 11.3284 9.55228 12 9 12C8.44772 12 8 11.3284 8 10.5C8 9.67157 8.44772 9 9 9C9.55228 9 10 9.67157 10 10.5Z" fill="#66666E" />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2.75C10.3139 2.75 8.73533 3.20043 7.37554 3.98703C7.017 4.19443 6.5582 4.07191 6.3508 3.71337C6.14339 3.35482 6.26591 2.89602 6.62446 2.68862C8.2064 1.77351 10.0432 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12C1.25 10.0432 1.77351 8.2064 2.68862 6.62446C2.89602 6.26591 3.35482 6.14339 3.71337 6.3508C4.07191 6.5582 4.19443 7.017 3.98703 7.37554C3.20043 8.73533 2.75 10.3139 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75Z" fill="#66666E" /></svg>
</template>

<script>
  export default {
    name: 'SmileCircle',

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
