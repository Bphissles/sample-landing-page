<script setup>
  import Github from '@/components/icons/social/Github.vue'
  import Instagram from '@/components/icons/social/Instagram.vue'
</script>
<template>
  <hr>
  <div class="person-card d-md-flex gap-3 align-items-center mb-4">
    <div class="text-center">
      <img src="https://picsum.photos/150" alt="" class="rounded-circle">
    </div>
    <div class="details">
      <p><strong><em>Name</em></strong> Title</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, iure itaque? Qui rem voluptatibus aliquid debitis excepturi laborum fugit ipsa hic corporis facilis, nisi et quidem iste id dolorum ex, praesentium eaque sit aperiam incidunt?</p>
      <div class="socials d-flex mt-2">
        <div class="social-icon d-flex gap-3">
          <Github />
          <Instagram />
        </div>
      </div>
    </div>
  </div>
</template>