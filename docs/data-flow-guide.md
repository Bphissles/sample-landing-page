# Data Flow Guide

This guide explains how data flows through the Site Starter application, focusing on the relationship between JSON data files, API services, stores, and components. Understanding this data flow is essential for effectively working with the application.

## Table of Contents

- [Data Flow Overview](#data-flow-overview)
- [JSON Data Files](#json-data-files)
- [API Services](#api-services)
- [Pinia Stores](#pinia-stores)
- [Components](#components)
- [Complete Flow Example](#complete-flow-example)
- [Common Patterns](#common-patterns)
- [Debugging Data Flow](#debugging-data-flow)

## Data Flow Overview

The Site Starter application follows a unidirectional data flow pattern:

1. **JSON Data Files** → Source of truth for application content
2. **API Services** → Fetch and process data from JSON files
3. **Pinia Stores** → Manage state, caching, and provide data to components
4. **Components** → Display data and handle user interactions

This pattern creates a clear separation of concerns and makes the application easier to maintain and debug.

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│                 │    │                 │    │                 │    │                 │
│  JSON Data      │ →  │  API Services   │ →  │  Pinia Stores   │ →  │  Components     │
│                 │    │                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘    └─────────────────┘
```

## JSON Data Files

Located in the `/public/data/` directory, these files store the application content in a structured format.

### Key Data Files

- **articles.json**: Blog article content
- **cards.json**: Card component content
- **page-content.json**: Page-level content (hero banners, section headings)
- **staff.json**: Staff member information
- **carousel.json**: Carousel image data

### Example: articles.json

```json
[
  {
    "id": "getting-started",
    "title": "Getting Started with Vue 3",
    "publishDate": "2023-04-15",
    "type": "tutorial",
    "image": "/images/articles/vue3.jpg",
    "preview": "Learn how to set up your first Vue 3 project with the Composition API.",
    "tags": ["vue", "javascript", "tutorial"],
    "featured": true,
    "content": [
      {
        "type": "paragraph",
        "text": "Vue 3 introduces the Composition API, a new way to organize component logic..."
      },
      {
        "type": "heading",
        "text": "Installation"
      },
      {
        "type": "code",
        "language": "bash",
        "text": "npm create vue@latest"
      }
    ]
  }
]
```

## API Services

Located in the `/src/services/` directory, these modules handle data fetching from JSON files.

### Key Responsibilities

- Fetch data from JSON files
- Handle HTTP errors
- Provide consistent error handling
- Return data in a standardized format

### Example: articleApi.js

```javascript
/**
 * Article API Service
 * Handles fetching article data from JSON file
 */

/**
 * Fetches all articles from the JSON file
 * @returns {Promise<Array>} Promise that resolves to array of article objects
 */
export const fetchAllArticles = async () => {
  try {
    const response = await fetch('/data/articles.json');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch articles: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
};

/**
 * Fetches only featured articles
 * @returns {Promise<Array>} Promise that resolves to array of featured article objects
 */
export const fetchFeaturedArticles = async () => {
  try {
    const articles = await fetchAllArticles();
    return articles.filter(article => article.featured);
  } catch (error) {
    console.error('Error fetching featured articles:', error);
    return [];
  }
};
```

## Pinia Stores

Located in the `/src/stores/` directory, these modules manage application state using Pinia.

### Key Responsibilities

- Store and cache data
- Provide loading and error states
- Expose actions for data operations
- Compute derived data with getters

### Store Types

1. **Base API Store**: A factory function that creates stores with common functionality
2. **Specialized Stores**: Stores that extend the base store with domain-specific features

### Example: articleStore.js

```javascript
import { defineStore } from 'pinia';
import { fetchAllArticles, fetchFeaturedArticles } from '@/services/articleApi';
import { createApiStore } from './apiStore';

// Create a base store using the factory
const useBaseArticleStore = createApiStore('baseArticle', fetchAllArticles);

// Create a specialized article store
export const useArticleStore = defineStore('articleStore', {
  state: () => ({
    baseStore: useBaseArticleStore(),
    featuredArticles: [],
    featuredLoading: false,
    featuredError: null,
    lastFeaturedFetch: null
  }),
  
  getters: {
    // Get all articles from the base store
    allArticles() {
      return this.baseStore.data;
    },
    
    // Check if the base store is loading
    isLoading() {
      return this.baseStore.isLoading;
    },
    
    // Get an article by ID
    getArticleById: (state) => (id) => {
      if (!state.baseStore.data.length) return null;
      return state.baseStore.data.find(article => article.id === id) || null;
    }
  },
  
  actions: {
    // Fetch all articles using the base store
    async fetchAllArticles() {
      return await this.baseStore.fetchData();
    },
    
    // Fetch only featured articles
    async fetchFeaturedArticles(forceRefresh = false) {
      // Return cached data if valid and not forcing refresh
      if (this.lastFeaturedFetch && !forceRefresh) {
        const now = new Date().getTime();
        if (now - this.lastFeaturedFetch < 5 * 60 * 1000) { // 5 minutes cache
          return this.featuredArticles;
        }
      }
      
      // Otherwise fetch fresh data
      try {
        this.featuredLoading = true;
        this.featuredError = null;
        
        this.featuredArticles = await fetchFeaturedArticles();
        this.lastFeaturedFetch = new Date().getTime();
        
        return this.featuredArticles;
      } catch (error) {
        this.featuredError = error.message || 'Failed to fetch featured articles';
        console.error('Featured articles error:', error);
        return [];
      } finally {
        this.featuredLoading = false;
      }
    }
  }
});
```

## Components

Components consume data from stores and render it to the user interface.

### Key Patterns

- Initialize stores with `useStore()`
- Fetch data in `onMounted()` lifecycle hook
- Access store state in templates
- Handle loading and error states

### Example: Blog.vue

```vue
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
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else-if="articleStore.baseStore.error" class="alert alert-danger">
      {{ articleStore.baseStore.error }}
    </div>

    <div v-else>
      <ArticleListItem
        v-for="article in articleStore.allArticles"
        :key="article.id"
        :article="article"
      />
    </div>
  </div>
</template>
```

## Complete Flow Example

Let's trace the complete flow of data for displaying articles on the blog page:

1. **JSON Data**: `/public/data/articles.json` contains an array of article objects
2. **API Service**: `articleApi.js` fetches the article data with `fetchAllArticles()`
3. **Store**: `articleStore.js` calls the API service and stores the result
4. **Component**: `Blog.vue` initializes the store and calls `fetchAllArticles()`
5. **Template**: The component template renders articles using `v-for="article in articleStore.allArticles"`

### Sequence Diagram

```
┌──────────┐          ┌──────────┐          ┌──────────┐          ┌──────────┐
│ Blog.vue │          │articleStore│          │articleApi │          │articles.json│
└────┬─────┘          └─────┬─────┘          └─────┬─────┘          └─────┬─────┘
     │                      │                      │                      │
     │ onMounted()          │                      │                      │
     ├─────────────────────>│                      │                      │
     │                      │                      │                      │
     │                      │ fetchAllArticles()   │                      │
     │                      ├─────────────────────>│                      │
     │                      │                      │                      │
     │                      │                      │ fetch()              │
     │                      │                      ├─────────────────────>│
     │                      │                      │                      │
     │                      │                      │ JSON data            │
     │                      │                      │<─────────────────────┤
     │                      │                      │                      │
     │                      │ articles array       │                      │
     │                      │<─────────────────────┤                      │
     │                      │                      │                      │
     │ store updated        │                      │                      │
     │<─────────────────────┤                      │                      │
     │                      │                      │                      │
     │ render template      │                      │                      │
     ├─────────────────────>│                      │                      │
     │                      │                      │                      │
```

## Common Patterns

### 1. Parallel Data Fetching

When a component needs data from multiple sources, fetch them in parallel:

```javascript
onMounted(async () => {
  await Promise.all([
    articleStore.fetchAllArticles(),
    pageContentStore.fetchPageContent('blog')
  ]);
});
```

### 2. Computed Properties for Derived Data

Use computed properties to derive data from store state:

```javascript
const featuredArticles = computed(() => 
  articleStore.allArticles.filter(article => article.featured)
);
```

### 3. Optional Chaining for Null Safety

Use optional chaining (`?.`) to safely access potentially null properties:

```vue
<h1>{{ article?.title || 'Untitled Article' }}</h1>
```

### 4. Loading and Error States

Always handle loading and error states in your components:

```vue
<div v-if="store.isLoading">Loading...</div>
<div v-else-if="store.error">Error: {{ store.error }}</div>
<div v-else>
  <!-- Content here -->
</div>
```

## Debugging Data Flow

When debugging data flow issues, follow these steps:

### 1. Check the JSON Data

Open the browser's Network tab and look for the JSON file request:
- Is the file being loaded?
- Does it contain the expected data?
- Are there any syntax errors in the JSON?

### 2. Check the API Service

Add console logs to the API service:
```javascript
export const fetchAllArticles = async () => {
  try {
    console.log('Fetching articles...');
    const response = await fetch('/data/articles.json');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch articles: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Articles fetched:', data);
    return data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
};
```

### 3. Check the Store

Use Vue DevTools to inspect the store state:
- Is the data being stored correctly?
- Are the loading and error states correct?
- Are the getters returning the expected values?

### 4. Check the Component

Add computed properties to log the data:
```javascript
const debugArticles = computed(() => {
  console.log('Articles in component:', articleStore.allArticles);
  return articleStore.allArticles;
});
```

### 5. Common Issues and Solutions

- **Empty Array**: Check if the API service is returning data
- **Undefined Properties**: Use optional chaining (`?.`) to handle null values
- **Stale Data**: Check if the store is using cached data when it shouldn't
- **Loading Never Completes**: Check for unhandled promises or errors

---

This guide should help you understand how data flows through the Site Starter application. For more detailed information, refer to the other documentation files in the `docs/` directory.
