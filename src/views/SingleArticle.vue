<script setup>
import SectionHeading from '@/components/SectionHeading.vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const slug = ref(route.params.slug);
</script>
<template>
  <img src="https://picsum.photos/1800/200" alt="">
  <div class="container-lg">
    <SectionHeading 
      :heading="slug"
      sub-heading="publish date"
    />

    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa dolor eius quo quis! Voluptatibus optio magnam a, voluptatem, ipsam natus eos atque, alias ad possimus qui neque ut. Accusantium, sapiente culpa? Numquam at pariatur odio consequatur quos tempore minima optio! Nisi quis sed modi ducimus voluptate saepe dolorum exercitationem enim incidunt, impedit accusamus optio! Id deleniti hic ab fugiat debitis asperiores non, esse deserunt facere voluptatem consectetur dolor maxime neque accusantium alias pariatur odio? Velit?</p>
    <br>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa dolor eius quo quis! Voluptatibus optio magnam a, voluptatem, ipsam natus eos atque, alias ad possimus qui neque ut. Accusantium, sapiente culpa? Numquam at pariatur odio consequatur quos tempore minima optio! Nisi quis sed modi ducimus voluptate saepe dolorum exercitationem enim incidunt, impedit accusamus optio! Id deleniti hic ab fugiat debitis asperiores non, esse deserunt facere voluptatem consectetur dolor maxime neque accusantium alias pariatur odio? Velit?</p>
    <br>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa dolor eius quo quis! Voluptatibus optio magnam a, voluptatem, ipsam natus eos atque, alias ad possimus qui neque ut. Accusantium, sapiente culpa? Numquam at pariatur odio consequatur quos tempore minima optio! Nisi quis sed modi ducimus voluptate saepe dolorum exercitationem enim incidunt, impedit accusamus optio! Id deleniti hic ab fugiat debitis asperiores non, esse deserunt facere voluptatem consectetur dolor maxime neque accusantium alias pariatur odio? Velit?</p>
  </div>
</template>