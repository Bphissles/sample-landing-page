# Getting Started Guide

## Table of Contents

- [Project Overview](#project-overview)
- [Setting Up Your Development Environment](#setting-up-your-development-environment)
- [Project Structure Explained](#project-structure-explained)
- [Key Concepts](#key-concepts)
- [Making Your First Change](#making-your-first-change)
- [Common Tasks](#common-tasks)
- [Troubleshooting](#troubleshooting)

## Project Overview

Site Starter is a modern Vue 3 web application template built with:

- **Vue 3** with Composition API for reactive UI components
- **Pinia** for state management
- **Vue Router** for navigation
- **Bootstrap 5** for responsive styling
- **SCSS** for advanced styling capabilities

The project follows a data-driven approach where most content is stored in JSON files and accessed through a consistent API and store pattern.

## Setting Up Your Development Environment

### Prerequisites

- Node.js (v18.20.5 or later)
- npm (v10.8.2 or later)

### Installation Steps

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd site-starter
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Access the application**:
   Open your browser and navigate to `http://localhost:5173`

## Project Structure Explained

Here's a breakdown of the key directories and their purpose:

```
site-starter/
├── public/              # Static assets served as-is
│   ├── data/            # JSON data files
│   │   ├── articles.json
│   │   ├── cards.json
│   │   ├── page-content.json
│   │   └── ...
│   └── images/          # Image assets
├── src/                 # Application source code
│   ├── assets/          # Compiled assets
│   │   └── scss/        # SCSS style files
│   ├── components/      # Reusable Vue components
│   ├── services/        # API service modules
│   ├── stores/          # Pinia store modules
│   ├── utils/           # Utility functions
│   ├── views/           # Page components
│   ├── App.vue          # Root component
│   ├── main.js          # Application entry point
│   └── router.js        # Route definitions
├── docs/                # Documentation
└── ...                  # Configuration files
```

### Key Files for Beginners

- `src/main.js`: Application entry point
- `src/App.vue`: Root component that includes the router view
- `src/router.js`: Defines all application routes
- `src/views/HomeView.vue`: Home page component
- `public/data/*.json`: Data files that power the application

## Key Concepts

### 1. Data-Driven Architecture

The application follows a data-driven approach where content is stored in JSON files:

- `articles.json`: Blog article content
- `cards.json`: Card component content
- `page-content.json`: Page-level content (hero banners, section headings)

This approach separates content from presentation, making it easier to update content without changing code.

### 2. Service Layer

The service layer (`src/services/`) handles data fetching from JSON files:

```javascript
// Example: articleApi.js
export const fetchAllArticles = async () => {
  try {
    const response = await fetch('/data/articles.json');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch articles: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
};
```

Services are responsible for:
- Fetching data from JSON files
- Handling fetch errors
- Returning data or fallback values

### 3. Store Pattern

Stores (`src/stores/`) manage application state using Pinia:

```javascript
// Example: simplified store
export const useArticleStore = defineStore('articleStore', {
  state: () => ({
    articles: [],
    isLoading: false,
    error: null
  }),
  
  actions: {
    async fetchAllArticles() {
      this.isLoading = true;
      try {
        this.articles = await fetchAllArticles();
      } catch (error) {
        this.error = error.message;
      } finally {
        this.isLoading = false;
      }
    }
  }
});
```

Stores provide:
- Centralized state management
- Caching of fetched data
- Loading and error states
- Actions for data operations

### 4. Component Hierarchy

Components are organized into:

- **Views**: Full page components (`src/views/`)
- **Components**: Reusable UI elements (`src/components/`)

Components use the Composition API with `<script setup>`:

```vue
<script setup>
import { onMounted } from 'vue';
import { useArticleStore } from '@/stores/articleStore';

const articleStore = useArticleStore();

onMounted(async () => {
  await articleStore.fetchAllArticles();
});
</script>

<template>
  <div v-if="articleStore.isLoading">Loading...</div>
  <div v-else-if="articleStore.error">Error: {{ articleStore.error }}</div>
  <div v-else>
    <!-- Content here -->
  </div>
</template>
```

## Making Your First Change

Let's walk through a simple change to understand the workflow:

### Task: Update a Section Heading

1. **Locate the data file**:
   Open `public/data/page-content.json`

2. **Find the section to update**:
   Look for the section with the ID you want to change:
   ```json
   {
     "id": "intro",
     "heading": "Our Vision",
     "subHeading": "What we're building"
   }
   ```

3. **Make your change**:
   Update the heading or subHeading text

4. **Save and test**:
   The change should appear immediately in the running application

### Task: Add a New Component

1. **Create a new component file**:
   Create `src/components/InfoBox.vue`

2. **Implement the component**:
   ```vue
   <script setup>
   defineProps({
     title: String,
     content: String
   });
   </script>

   <template>
     <div class="info-box p-3 mb-3 border rounded">
       <h4>{{ title }}</h4>
       <p>{{ content }}</p>
     </div>
   </template>
   ```

3. **Use the component**:
   Import and use it in a view:
   ```vue
   <script setup>
   import InfoBox from '@/components/InfoBox.vue';
   </script>

   <template>
     <InfoBox 
       title="Important Information" 
       content="This is some important content for users."
     />
   </template>
   ```

## Common Tasks

### Adding a New Page

1. Create a new view component in `src/views/`
2. Add a route in `src/router.js`:
   ```javascript
   {
     path: '/new-page',
     name: 'NewPage',
     component: () => import('@/views/NewPage.vue')
   }
   ```

### Adding a New Data Type

1. Create a JSON file in `public/data/`
2. Create an API service in `src/services/`
3. Create a store in `src/stores/`
4. Use the store in your components

### Styling Components

1. Create or update SCSS files in `src/assets/scss/`
2. Import the styles in the main SCSS file
3. Use classes in your components

## Troubleshooting

### Common Issues

#### "Cannot read properties of undefined"

This usually means you're trying to access a property on an object that doesn't exist yet. Use optional chaining:

```javascript
// Instead of this:
const title = article.metadata.title;

// Do this:
const title = article?.metadata?.title;
```

#### Store data not loading

Check these common issues:

1. Verify the API service function is working
2. Make sure you're calling the store action in `onMounted`
3. Check the network tab for failed requests
4. Verify the JSON file path is correct

#### Component not rendering

1. Check for console errors
2. Verify the component is properly imported
3. Check conditional rendering (`v-if`, `v-show`)
4. Verify props are passed correctly

### Getting Help

If you're stuck:

1. Check the documentation in the `docs/` directory
2. Look at similar components for examples
3. Use Vue DevTools to inspect the component state
4. Ask a senior developer for guidance

---

This guide should help you get started with the Site Starter project. For more detailed information, refer to the other documentation files in the `docs/` directory.
