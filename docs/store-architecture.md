# Store Architecture Documentation

## Overview

This document provides a comprehensive guide to the Pinia store architecture implemented in the Site Starter project. The store system is designed to efficiently manage application state, handle API calls, and implement intelligent caching to improve performance.

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Base API Store](#base-api-store)
- [Specialized Stores](#specialized-stores)
  - [Article Store](#article-store)
  - [Carousel Store](#carousel-store)
  - [Staff Store](#staff-store)
  - [Card Store](#card-store)
  - [Page Content Store](#page-content-store)
- [Usage in Components](#usage-in-components)
- [Best Practices](#best-practices)
- [Extending the System](#extending-the-system)

## Architecture Overview

The store architecture follows a modular approach with a base factory function that creates stores with common functionality. This design provides several benefits:

- **Code Reusability**: Common functionality is defined once and reused across stores
- **Consistent API**: All stores follow the same patterns for data fetching and caching
- **Type Safety**: Stores provide well-defined interfaces for components to consume
- **Maintainability**: Changes to core functionality can be made in one place

The architecture consists of:

1. **Base API Store Factory**: A function that creates stores with common caching and data fetching capabilities
2. **Specialized Stores**: Stores built using the factory that add domain-specific functionality
3. **Component Integration**: Vue components that consume the stores

## Base API Store

The base API store (`apiStore.js`) is a factory function that creates Pinia stores with common functionality for API data management.

### Key Features

- **Intelligent Caching**: Stores data with configurable expiration times
- **Loading States**: Tracks loading state for UI feedback
- **Error Handling**: Consistent error handling across all API calls
- **Force Refresh**: Ability to bypass cache and fetch fresh data

### Implementation

```javascript
// Example of the createApiStore factory function
export const createApiStore = (name, fetchFunction) => {
  return defineStore(`${name}Store`, {
    state: () => ({
      data: [],
      isLoading: false,
      error: null,
      lastFetched: null,
      cacheExpiration: 5 * 60 * 1000 // 5 minutes default
    }),
    
    getters: {
      isCacheValid() {
        if (!this.lastFetched) return false;
        const now = new Date().getTime();
        return now - this.lastFetched < this.cacheExpiration;
      }
    },
    
    actions: {
      async fetchData(forceRefresh = false) {
        // Return cached data if valid and not forcing refresh
        if (this.isCacheValid && !forceRefresh) {
          return this.data;
        }
        
        // Otherwise fetch fresh data
        try {
          this.isLoading = true;
          this.error = null;
          
          const result = await fetchFunction();
          this.data = result;
          this.lastFetched = new Date().getTime();
          
          return result;
        } catch (err) {
          this.error = err.message || 'Failed to fetch data';
          console.error(`${name} store error:`, err);
          return [];
        } finally {
          this.isLoading = false;
        }
      }
      // Additional actions omitted for brevity
    }
  });
};
```

## Specialized Stores

### Article Store

The article store (`articleStore.js`) extends the base API store with additional functionality specific to articles.

#### Key Features

- **All Articles**: Fetches and caches all articles
- **Featured Articles**: Specialized handling for featured articles
- **Article by ID**: Retrieves specific articles by ID
- **Optimized Fetching**: Uses cached data when possible to avoid redundant API calls

#### Implementation

```javascript
// Example of the article store with specialized functionality
export const useArticleStore = defineStore('articleStore', {
  state: () => ({
    baseStore: useBaseArticleStore(),
    featuredArticles: [],
    isFeaturedLoading: false,
    featuredError: null,
    lastFeaturedFetched: null
  }),
  
  getters: {
    allArticles() {
      return this.baseStore.data;
    },
    // Additional getters omitted for brevity
  },
  
  actions: {
    async fetchAllArticles(forceRefresh = false) {
      return await this.baseStore.fetchData(forceRefresh);
    },
    
    async fetchFeaturedArticles(forceRefresh = false) {
      // Implementation details omitted for brevity
    },
    
    async getArticleById(id, forceRefresh = false) {
      // Implementation details omitted for brevity
    }
  }
});
```

### Carousel Store

The carousel store (`carouselStore.js`) uses the base API store to manage carousel image data.

#### Key Features

- **Simple Implementation**: Uses the base store without additional customization
- **Cached Images**: Efficiently caches carousel images to improve performance

#### Implementation

```javascript
// Example of the carousel store using the base API store directly
export const useCarouselStore = createApiStore('carousel', fetchCarouselImages);
```

### Staff Store

The staff store (`staffStore.js`) uses the base API store to manage staff member data.

#### Key Features

- **Simple Implementation**: Uses the base store without additional customization
- **Cached Staff Data**: Efficiently caches staff data to improve performance

#### Implementation

```javascript
// Example of the staff store using the base API store directly
export const useStaffStore = createApiStore('staff', fetchStaff);
```

### Card Store

The card store (`cardStore.js`) manages card content data used throughout the application. Cards are used to display various types of content in a consistent format.

#### Key Features

- **All Cards**: Fetches and caches all cards from the JSON file
- **Card by ID**: Retrieves specific cards by ID
- **Flexible Card Types**: Supports different card types (text, list) through a unified interface

#### Implementation

```javascript
// Example of the card store with specialized functionality
export const useCardStore = defineStore('cardStore', {
  state: () => ({
    baseStore: useBaseCardStore()
  }),
  
  getters: {
    allCards() {
      return this.baseStore.data;
    },
    
    isLoading() {
      return this.baseStore.isLoading;
    },
    
    error() {
      return this.baseStore.error;
    }
  },
  
  actions: {
    async fetchAllCards(forceRefresh = false) {
      return await this.baseStore.fetchData(forceRefresh);
    },
    
    getCardById(id) {
      if (!this.baseStore.data.length) return null;
      return this.baseStore.data.find(card => card.id === id) || null;
    }
  }
});
```

#### Data Structure

The card data is stored in `public/data/cards.json` with the following structure:

```json
[
  {
    "id": "card1",
    "title": "Getting Started",
    "subtitle": "Quick Introduction",
    "type": "text",
    "content": "Welcome to our platform!",
    "links": [
      { "text": "Documentation", "url": "#documentation" },
      { "text": "Tutorials", "url": "#tutorials" }
    ]
  },
  {
    "id": "card2",
    "title": "Key Features",
    "subtitle": "What We Offer",
    "type": "list",
    "items": [
      "Responsive design templates",
      "Interactive components",
      "Performance optimization"
    ]
  }
]
```

### Page Content Store

The page content store manages page-level content such as hero banners and section headings. This allows for centralized management of page content that can be easily updated without modifying component code.

#### Data Structure

The page content data is stored in `/public/data/page-content.json` and follows this structure:

```json
{
  "home": {
    "hero": {
      "heading": "WELCOME TO OUR SITE",
      "subHeading": "Discover our services and products"
    },
    "sections": [
      {
        "id": "intro",
        "heading": "Our Vision",
        "subHeading": "What we're building",
        "alignment": "text-center"
      },
      {
        "id": "blog",
        "heading": "Latest Articles",
        "subHeading": "Stay updated with our news",
        "alignment": "text-start",
        "hasAction": true,
        "actionLink": "/blog",
        "actionText": "Full Blog"
      }
    ]
  },
  "blog": {
    "hero": {
      "heading": "OUR BLOG",
      "subHeading": "Insights and updates"
    },
    "sections": [
      {
        "id": "articles",
        "heading": "All Articles",
        "subHeading": "Latest content from our team",
        "alignment": "text-start"
      }
    ]
  }
}
```

#### API Service

The page content API service (`pageContentApi.js`) provides methods for fetching all page content or content for a specific page:

```javascript
// Fetch all page content
const allContent = await fetchPageContent();

// Fetch content for a specific page
const homeContent = await fetchPageContentByName('home');
```

#### Implementation

```javascript
// Example of the page content store
export const usePageContentStore = defineStore('pageContentStore', {
  state: () => ({
    data: {},
    isLoading: false,
    error: null,
    lastFetched: null
  }),
  
  getters: {
    getPageContent(pageName) {
      return this.data[pageName];
    },
    
    getSection(pageName, sectionId) {
      const pageContent = this.getPageContent(pageName);
      return pageContent.sections.find(section => section.id === sectionId);
    }
  },
  
  actions: {
    async fetchAllContent(forceRefresh = false) {
      // Implementation details omitted for brevity
    },
    
    async fetchPageContent(pageName, forceRefresh = false) {
      // Implementation details omitted for brevity
    }
  }
});
```

#### Usage

```javascript
import { usePageContentStore } from '@/stores/pageContentStore';

const pageContentStore = usePageContentStore();

// Fetch all page content
await pageContentStore.fetchAllContent();

// Fetch content for a specific page
await pageContentStore.fetchPageContent('home');

// Access page content
const homeContent = pageContentStore.getPageContent('home');

// Get a specific section by ID
const blogSection = pageContentStore.getSection('home', 'blog');

// Access hero content directly
const heroContent = pageContentStore.getPageContent('home')?.hero;
```

## Usage in Components

Components use the stores by importing and initializing them, then accessing their state, getters, and actions.

### Example: HomeView Component

```javascript
// Import stores
import { useCarouselStore } from '@/stores/carouselStore';
import { useArticleStore } from '@/stores/articleStore';
import { useStaffStore } from '@/stores/staffStore';
import { useCardStore } from '@/stores/cardStore';
import { usePageContentStore } from '@/stores/pageContentStore';

// Initialize stores
const carouselStore = useCarouselStore();
const articleStore = useArticleStore();
const staffStore = useStaffStore();
const cardStore = useCardStore();
const pageContentStore = usePageContentStore();

// Fetch data when component mounts
onMounted(async () => {
  await Promise.all([
    carouselStore.fetchData(),
    articleStore.fetchFeaturedArticles(),
    staffStore.fetchData(),
    cardStore.fetchAllCards(),
    pageContentStore.fetchAllContent()
  ]);
});

// In template, access store state
// <div v-if="carouselStore.isLoading">Loading...</div>
// <div v-for="image in carouselStore.data" :key="image.id">...</div>
```

### Example: Blog Component

```javascript
// Import article store
import { useArticleStore } from '@/stores/articleStore';

// Initialize store
const articleStore = useArticleStore();

// Fetch all articles
onMounted(async () => {
  await articleStore.fetchAllArticles();
});

// In template, access store state
// <div v-if="articleStore.baseStore.isLoading">Loading...</div>
// <div v-for="article in articleStore.allArticles" :key="article.id">...</div>
```

## Best Practices

### When to Use Stores

- **Shared State**: Use stores for state that needs to be shared between components
- **API Data**: Use stores for data fetched from APIs that may be used in multiple places
- **Complex Logic**: Use stores for state that requires complex business logic

### When Not to Use Stores

- **Component-Specific State**: Keep component-specific state in the component
- **Form State**: Form state is often better managed within the form component
- **Ephemeral State**: Temporary state that doesn't need to persist

### Performance Considerations

- **Cache Expiration**: Adjust cache expiration times based on data volatility
- **Force Refresh**: Use force refresh sparingly, only when fresh data is critical
- **Parallel Fetching**: Fetch multiple data sources in parallel using `Promise.all`

## Extending the System

### Adding a New Store

1. **Create API Service**: Create a service function that fetches the data
2. **Create Store File**: Create a new store file in the `stores` directory
3. **Implement Store**: Use the `createApiStore` factory or extend it with custom functionality
4. **Use in Components**: Import and use the store in components

### Example: Creating a New Products Store

```javascript
// 1. Create API service (productsApi.js)
export const fetchProducts = async () => {
  const response = await fetch('/data/products.json');
  return await response.json();
};

// 2. Create store file (productStore.js)
import { fetchProducts } from '@/services/productsApi';
import { createApiStore } from './apiStore';

// 3. Implement store
export const useProductStore = createApiStore('products', fetchProducts);

// 4. Use in component
import { useProductStore } from '@/stores/productStore';
const productStore = useProductStore();
await productStore.fetchData();
```

### Customizing Cache Behavior

You can customize cache behavior for specific stores:

```javascript
// Set longer cache time for rarely changing data
const productStore = useProductStore();
productStore.setCacheExpiration(30 * 60 * 1000); // 30 minutes

// Force refresh for time-sensitive data
await productStore.fetchData(true); // Force refresh
```

---

This documentation provides a comprehensive guide to the store architecture. For specific implementation details, refer to the source code in the `src/stores` directory.
