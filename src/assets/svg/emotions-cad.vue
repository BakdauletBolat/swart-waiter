<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" :width="widthAttr" :height="heightAttr" overflow="visible">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.39746 17.4466C8.64412 17.7794 9.11383 17.8492 9.4466 17.6025C10.1749 17.0627 11.0541 16.75 12 16.75C12.9459 16.75 13.825 17.0627 14.5534 17.6025C14.8861 17.8492 15.3559 17.7794 15.6025 17.4466C15.8492 17.1139 15.7794 16.6441 15.4466 16.3975C14.4742 15.6767 13.285 15.25 12 15.25C10.715 15.25 9.52578 15.6767 8.55337 16.3975C8.22061 16.6441 8.1508 17.1139 8.39746 17.4466Z" fill="#66666E" />
    <ellipse cx="15" cy="10.5" rx="1" ry="1.5" fill="#66666E" />
    <ellipse cx="9" cy="10.5" rx="1" ry="1.5" fill="#66666E" />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2.75C10.3139 2.75 8.73533 3.20043 7.37554 3.98703C7.017 4.19443 6.5582 4.07191 6.3508 3.71337C6.14339 3.35482 6.26591 2.89602 6.62446 2.68862C8.2064 1.77351 10.0432 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12C1.25 10.0432 1.77351 8.2064 2.68862 6.62446C2.89602 6.26591 3.35482 6.14339 3.71337 6.3508C4.07191 6.5582 4.19443 7.017 3.98703 7.37554C3.20043 8.73533 2.75 10.3139 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75Z" fill="#66666E" /></svg>
</template>

<script>
  export default {
    name: 'EmotionsCad',

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
