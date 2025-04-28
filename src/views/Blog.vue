<script setup>
import { onMounted, computed } from 'vue';
import HeroBanner from '@/components/HeroBanner.vue';
import SectionHeading from '@/components/SectionHeading.vue';
import ArticleListItem from '@/components/ArticleListItem.vue';
import { useArticleStore } from '@/stores/articleStore';
import { usePageContentStore } from '@/stores/pageContentStore';

// Initialize stores
const articleStore = useArticleStore();
const pageContentStore = usePageContentStore();

// Page content
const pageContent = computed(() => pageContentStore.getPageContent('blog'));
const heroContent = computed(() => pageContent.value?.hero);

// Get section content by ID
const getSection = (sectionId) => {
  if (!pageContent.value || !pageContent.value.sections) return null;
  return pageContent.value.sections.find(section => section.id === sectionId);
};

// Fetch all articles when component mounts
onMounted(async () => {
  try {
    await Promise.all([
      articleStore.fetchAllArticles(),
      pageContentStore.fetchPageContent('blog')
    ]);
  } catch (err) {
    console.error('Error fetching data:', err);
  }
});
</script>

<template>
  <HeroBanner
    :heading="heroContent?.heading"
    :sub-heading="heroContent?.subHeading"
  />
  
  <div class="container-lg">
    <SectionHeading
      :heading="getSection('articles')?.heading"
      :sub-heading="getSection('articles')?.subHeading"
      :alignment="getSection('articles')?.alignment"
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