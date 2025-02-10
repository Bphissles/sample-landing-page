<script setup>
const props = defineProps({
  heading: String,
  subHeading: String,
  alignment: String
})
</script>
<template>
  <div class="section-heading align-items-end pt-5 my-4" :class="alignment">
    <h2 v-html="heading"></h2>
    <p><em v-html="subHeading"></em></p>
  </div>
</template>