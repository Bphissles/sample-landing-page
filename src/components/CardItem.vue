<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  card: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="card h-100">
    <div class="card-body">
      <h5 class="card-title">{{ card.title }}</h5>
      <h6 class="card-subtitle mb-2 text-body-secondary">{{ card.subtitle }}</h6>
      
      <!-- Text content -->
      <p v-if="card.type === 'text'" class="card-text">{{ card.content }}</p>
      
      <!-- List content -->
      <ul v-else-if="card.type === 'list'" class="list-group">
        <li v-for="(item, index) in card.items" :key="index" class="list-group-item">{{ item }}</li>
      </ul>
      
      <!-- Links -->
      <div v-if="card.links && card.links.length" class="card-links mt-3">
        <a 
          v-for="(link, index) in card.links" 
          :key="index" 
          :href="link.url" 
          class="card-link"
        >
          {{ link.text }}
        </a>
      </div>
    </div>
  </div>
</template>
