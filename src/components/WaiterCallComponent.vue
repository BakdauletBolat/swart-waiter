<script setup lang="ts">
import Image from './Image';
import Button from './Button';
</script>
<template>
  <div class="flex justify-center items-center flex-col p-4">
    <Image class="h-[122px] w-[122px]" :url="null"></Image>
    <h2 class="text-2xl mt-4">Александро в пути</h2>
    <p class="text-sm text-[#9999A1] text-center max-w-[350px] mt-4">Официант увидел что вы его позвали, скоро он подойдет к вам</p>
    <Button containerClasses="!justify-center" class="mt-4 !rounded-2xl w-full text-center">Понятно</Button>
  </div>
</template>

<style scoped>

</style>