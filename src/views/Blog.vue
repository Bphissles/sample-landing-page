<script setup>
import { onMounted } from 'vue';
import HeroBanner from '@/components/HeroBanner.vue';
import SectionHeading from '@/components/SectionHeading.vue';
import ArticleListItem from '@/components/ArticleListItem.vue';
import { useRouter } from 'vue-router';
import { useArticleStore } from '@/stores/articleStore';

// Initialize the article store
const articleStore = useArticleStore();

// Fetch all articles when component mounts
onMounted(async () => {
  try {
    await articleStore.fetchAllArticles();
  } catch (err) {
    console.error('Error fetching articles:', err);
  }
});

const router = useRouter();
const pushBlogRoute = (route) => {
  router.push(`/blog/${route}`);
}
</script>

<template>
  <HeroBanner
    heading="BLOG PAGE"
    sub-heading="small Blog"
  />
  
  <div class="container-lg">
    <SectionHeading 
      heading="Them Posts"
      sub-heading="About the Stuff"
      alignment="text-start"
    />

    <div v-if="articleStore.baseStore.isLoading" class="text-center py-4">
      <p>Loading articles...</p>
    </div>
    
    <div v-else-if="articleStore.baseStore.error" class="text-center py-4 text-danger">
      <p>{{ articleStore.baseStore.error }}</p>
    </div>
    
    <template v-else>
      <ArticleListItem 
        v-for="article in articleStore.allArticles" 
        :key="article.id" 
        :article="article" 
      />
    </template>
  </div>
</template>
<style lang="scss" scoped>
/* Styles moved to ArticleListItem component */
</style>