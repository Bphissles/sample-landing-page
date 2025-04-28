<script setup>
import SectionHeading from '@/components/SectionHeading.vue';
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useArticleStore } from '@/stores/articleStore';
import { usePageContentStore } from '@/stores/pageContentStore';
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

const route = useRoute();
const slug = ref(route.params.slug);
const articleStore = useArticleStore();
const pageContentStore = usePageContentStore();
const article = ref(null);
const isLoading = ref(true);
const error = ref(null);

// Page content
const pageContent = computed(() => pageContentStore.getPageContent('article'));
const heroContent = computed(() => pageContent.value?.hero || { heading: 'ARTICLE DETAILS', subHeading: 'In-depth content' });

// Format the date for display
const formattedDate = computed(() => {
  if (!article.value || !article.value.publishDate) return '';
  return new Date(article.value.publishDate).toLocaleDateString();
});

// Configure marked to use highlight.js for code highlighting
marked.setOptions({
  highlight: function(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value;
    }
    return hljs.highlightAuto(code).value;
  },
  breaks: true,
  gfm: true
});

// Render code blocks with syntax highlighting
const renderCodeBlock = (block) => {
  if (!block.language) return `<pre><code>${block.text}</code></pre>`;
  
  try {
    const highlighted = hljs.highlight(block.text, { language: block.language }).value;
    return `<pre><code class="hljs language-${block.language}">${highlighted}</code></pre>`;
  } catch (e) {
    console.warn('Failed to highlight code:', e);
    return `<pre><code>${block.text}</code></pre>`;
  }
};

// Fetch the article data when component mounts
onMounted(async () => {
  isLoading.value = true;
  error.value = null;
  
  try {
    // Fetch data in parallel
    const [fetchedArticle] = await Promise.all([
      articleStore.getArticleById(slug.value),
      pageContentStore.fetchPageContent('article')
    ]);
    
    if (fetchedArticle) {
      article.value = fetchedArticle;
    } else {
      error.value = 'Article not found';
    }
  } catch (err) {
    error.value = err.message || 'Error loading article';
    console.error('Error fetching article:', err);
  } finally {
    isLoading.value = false;
  }
});
</script>
<template>
  <!-- Loading state -->
  <div v-if="isLoading" class="container-lg py-5 text-center">
    <p>Loading article...</p>
  </div>
  
  <!-- Error state -->
  <div v-else-if="error" class="container-lg py-5 text-center text-danger">
    <p>{{ error }}</p>
  </div>
  
  <!-- Article content -->
  <template v-else-if="article">
    <!-- Use the article image if available, otherwise use a placeholder -->
    <img :src="article.image || 'https://picsum.photos/2400/300'" :alt="article.title" class="img-fluid w-100" style="max-height: 400px; object-fit: cover;">
    
    <div class="container-lg">
      <!-- Article header -->
      <div class="article-header my-4">
        <SectionHeading 
          :heading="article.title"
          :sub-heading="article.type + ' • ' + formattedDate"
        />
        
        <!-- Author info -->
        <div class="author-info text-muted mb-3">
          <span v-if="article.author">By {{ article.author }}</span>
        </div>
        
        <!-- Tags -->
        <div class="mb-4 d-flex gap-2 flex-wrap">
          <span 
            v-for="(tag, index) in article.tags" 
            :key="index"
            :class="['badge', tag.class, 'text-white']"
          >
            {{ tag.name }}
          </span>
        </div>
      </div>
      
      <!-- Article preview as intro paragraph -->
      <p class="lead">{{ article.preview }}</p>
      
      <hr>
      
      <!-- Article content -->
      <div class="article-content" v-if="article.content && article.content.length">
        <div v-for="(block, index) in article.content" :key="index" class="content-block mb-4">
          <!-- Paragraph -->
          <p v-if="block.type === 'paragraph'" class="mb-4">{{ block.text }}</p>
          
          <!-- Heading -->
          <h2 v-else-if="block.type === 'heading'" class="mt-5 mb-4">{{ block.text }}</h2>
          
          <!-- Code block -->
          <div v-else-if="block.type === 'code'" class="code-block mb-4">
            <div v-if="block.language" class="code-language small text-end text-muted mb-2">{{ block.language }}</div>
            <div v-html="renderCodeBlock(block)" class="rounded p-3 bg-light"></div>
          </div>
          
          <!-- Image -->
          <figure v-else-if="block.type === 'image'" class="mb-4">
            <img :src="block.url" :alt="block.caption || ''" class="img-fluid rounded">
            <figcaption v-if="block.caption" class="text-center text-muted mt-2">{{ block.caption }}</figcaption>
          </figure>
          
          <!-- List -->
          <ul v-else-if="block.type === 'list' && block.items" class="mb-4">
            <li v-for="(item, itemIndex) in block.items" :key="itemIndex">{{ item }}</li>
          </ul>
          
          <!-- Quote -->
          <blockquote v-else-if="block.type === 'quote'" class="blockquote border-start border-4 ps-4 py-2 mb-4">
            <p class="mb-0">{{ block.text }}</p>
            <footer v-if="block.attribution" class="blockquote-footer mt-2">{{ block.attribution }}</footer>
          </blockquote>
          
          <!-- Default for unknown block types -->
          <div v-else class="mb-4">{{ block.text }}</div>
        </div>
      </div>
      
      <!-- Fallback content if no structured content is available -->
      <div v-else class="article-content">
        <p>This article doesn't have structured content yet. Check back later for updates.</p>
      </div>
      
      <!-- Article footer -->
      <div class="article-footer mt-5 pt-4 border-top">
        <div class="d-flex justify-content-between align-items-center">
          <div class="share-buttons">
            <span class="me-2">Share:</span>
            <button class="btn btn-sm btn-outline-primary me-2">Twitter</button>
            <button class="btn btn-sm btn-outline-primary me-2">Facebook</button>
            <button class="btn btn-sm btn-outline-primary">LinkedIn</button>
          </div>
          
          <div class="related-articles">
            <RouterLink to="/blog" class="btn btn-outline-secondary">More Articles</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <!-- Fallback if no article and no error -->
  <div v-else class="container-lg py-5 text-center">
    <p>No article found</p>
  </div>
</template>