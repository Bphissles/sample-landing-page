<script setup>
  import Github from '@/components/icons/social/Github.vue'
  import Instagram from '@/components/icons/social/Instagram.vue'
  
  // Define props for staff data
  const props = defineProps({
    name: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    bio: {
      type: String,
      required: true
    },
    socials: {
      type: Object,
      default: () => ({
        github: '',
        instagram: ''
      })
    }
  });
</script>
<template>
  <hr>
  <div class="person-card d-md-flex gap-3 align-items-center mb-4">
    <div class="text-center">
      <img :src="image" :alt="name" class="rounded-circle">
    </div>
    <div class="details">
      <p><strong><em>{{ name }}</em></strong> {{ title }}</p>
      <p>{{ bio }}</p>
      <div class="socials d-flex mt-2">
        <div class="social-icon d-flex gap-3">
          <a v-if="socials.github" :href="socials.github" target="_blank" rel="noopener noreferrer">
            <Github />
          </a>
          <a v-if="socials.instagram" :href="socials.instagram" target="_blank" rel="noopener noreferrer">
            <Instagram />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  svg {
    width: 25px;
    height: 25px;
  }
</style>