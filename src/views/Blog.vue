<script setup>
import { onMounted } from 'vue';
import HeroBanner from '@/components/HeroBanner.vue';
import SectionHeading from '@/components/SectionHeading.vue';
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
      <article 
        v-for="article in articleStore.allArticles" 
        :key="article.id" 
        class="article-card pb-4" 
        @click="pushBlogRoute(article.id)"
      >
        <div class="border rounded d-block d-md-flex p-4 gap-4">
          <div class="image">
            <img :src="article.image" :alt="article.title" class="rounded img-fluid">
          </div>
          <div class="article-content w-100">
            <div class="d-flex align-items-start justify-content-between gap-3">
              
              <div class="title">
                <h3>{{ article.title }}</h3>
                <p><em>{{ new Date(article.publishDate).toLocaleDateString() }}</em></p>
              </div>
              
              <div class="tags text-end">
                <template v-for="(tag, index) in article.tags" :key="index">
                  <span :class="['badge', tag.class, 'text-white']">{{ tag.name }}</span><br v-if="index < article.tags.length - 1">
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
  </div>
</template>
<style lang="scss" scoped>
.article-card {
  cursor: pointer;
}
</style>