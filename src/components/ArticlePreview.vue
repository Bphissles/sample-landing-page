<script setup>
import { defineProps, computed } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  article: {
    type: Object,
    required: true
  },
  showReadMore: {
    type: Boolean,
    default: true
  }
});

const router = useRouter();

const navigateToArticle = () => {
  router.push(`/blog/${props.article.id}`);
};

// Format the date for display
const formattedDate = computed(() => {
  if (!props.article || !props.article.publishDate) return '';
  return new Date(props.article.publishDate).toLocaleDateString();
});
</script>

<template>
  <div class="article-card border rounded px-4 py-3" @click="navigateToArticle">
    <article>
      <div class="d-flex align-items-center justify-content-between mb-3">
        <p class="mb-0 h3">{{ article.type }}</p>
        <p><em>{{ formattedDate }}</em></p>
      </div>
      <img :src="article.image" :alt="article.title" class="img-fluid rounded">
      <h3 class="my-3">{{ article.title }}</h3>
      <p>{{ article.preview }}</p>
      <div v-if="showReadMore" class="text-end mt-3">
        <RouterLink :to="`/blog/${article.id}`">
          <em>Keep Reading</em>
        </RouterLink>
      </div>
    </article>
  </div>
</template>