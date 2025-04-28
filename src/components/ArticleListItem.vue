<script setup>
import { defineProps, computed } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  article: {
    type: Object,
    required: true
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
  <article class="article-list-item pb-4" @click="navigateToArticle">
    <div class="border rounded d-block d-md-flex p-4 gap-4">
      <div class="image">
        <img :src="article.image" :alt="article.title" class="rounded img-fluid">
      </div>
      <div class="article-content w-100">
        <div class="d-flex align-items-start justify-content-between gap-3">
          <div class="title">
            <h3>{{ article.title }}</h3>
            <div class="meta-info d-flex align-items-center gap-2 text-muted">
              <span v-if="article.author">By {{ article.author }}</span>
              <span v-if="article.author && article.publishDate">•</span>
              <span v-if="article.publishDate"><em>{{ formattedDate }}</em></span>
              <span v-if="article.type" class="ms-2 badge bg-light text-dark">{{ article.type }}</span>
            </div>
          </div>
          
          <div class="tags text-end">
            <template v-for="(tag, index) in article.tags" :key="index">
              <span :class="['badge', tag.class, 'text-white']">{{ tag.name }}</span>
              <br v-if="index < article.tags.length - 1">
            </template>
          </div>
        </div>

        <hr>

        <div class="article-preview">
          <p>{{ article.preview }}</p>
        </div>
      </div>
    </div>
  </article>
</template>