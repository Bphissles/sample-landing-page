<script setup>
import { onMounted, computed } from 'vue';
import HeroBanner from '@/components/HeroBanner.vue';
import SectionHeading from '@/components/SectionHeading.vue';
import ArticleListItem from '@/components/ArticleListItem.vue';
import { useArticleStore } from '@/stores/articleStore';
import { usePageContentStore } from '@/stores/pageContentStore';
import { getSection, getHeroContent } from '@/utils/pageContentUtils';

// Initialize stores
const articleStore = useArticleStore();
const pageContentStore = usePageContentStore();

// Page content
const pageContent = computed(() => pageContentStore.getPageContent('blog'));
const heroContent = computed(() => getHeroContent(pageContent.value));

// Create a wrapper function for getSection that uses the current pageContent
const getSectionFromCurrentPage = (sectionId) => getSection(pageContent.value, sectionId);

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
    :image="heroContent?.image"
  />
  
  <div class="container-lg">
    <SectionHeading
      :heading="getSectionFromCurrentPage('articles')?.heading"
      :sub-heading="getSectionFromCurrentPage('articles')?.subHeading"
      :alignment="getSectionFromCurrentPage('articles')?.alignment"
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