<script setup>
const props = defineProps({
  heading: String,
  subHeading: String,
  image: {
    type: String,
    default: 'https://picsum.photos/1600/360'
  }
})
</script>

<template>
  <div class="hero-banner" :style="{ backgroundImage: `url(${image})` }">
    <div class="w-100 hero-banner bg-dark bg-opacity-50">
      <div class="container-lg text-white">
        <h1 v-html="heading"></h1>
        <p v-html="subHeading"></p>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  .hero-banner {
    background-repeat: no-repeat;
    background-size: cover;
    height: 360px;
    display: flex;
    align-items: center;
  }
</style>