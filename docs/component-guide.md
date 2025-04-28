# Component Guide

## Table of Contents

- [Component Overview](#component-overview)
- [Component Types](#component-types)
- [Component Anatomy](#component-anatomy)
- [Props and Events](#props-and-events)
- [Working with Stores](#working-with-stores)
- [Component Examples](#component-examples)
- [Best Practices](#best-practices)

## Component Overview

Components are the building blocks of the Vue application. Each component encapsulates a piece of the UI with its own template, logic, and styling. The Site Starter project uses Vue 3's Composition API with the `<script setup>` syntax for cleaner, more maintainable components.

## Component Types

The project organizes components into several categories:

### 1. View Components

Located in `src/views/`, these are page-level components that:
- Correspond to routes in the router
- Compose multiple smaller components
- Handle page-level data fetching
- Example: `HomeView.vue`, `Blog.vue`

### 2. UI Components

Located in `src/components/`, these are reusable UI elements:
- **Structural Components**: Layout elements like `HeroBanner.vue`, `SectionHeading.vue`
- **Data Display Components**: Content presenters like `ArticlePreview.vue`, `CardItem.vue`
- **Interactive Components**: User interaction elements like form inputs

### 3. Container Components

These components focus on data fetching and state management:
- Typically wrap presentational components
- Connect to stores
- Handle loading states and errors
- Example: A component that fetches and displays a list of articles

## Component Anatomy

Let's break down a typical component structure:

```vue
<script setup>
// 1. Imports
import { ref, computed, onMounted } from 'vue';
import ChildComponent from './ChildComponent.vue';
import { useStore } from '@/stores/someStore';

// 2. Props and Emits
const props = defineProps({
  title: String,
  items: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['select', 'cancel']);

// 3. State and Store
const store = useStore();
const localState = ref('initial value');

// 4. Computed Properties
const processedItems = computed(() => {
  return props.items.filter(item => item.isActive);
});

// 5. Methods
const handleClick = (item) => {
  localState.value = item.name;
  emit('select', item);
};

// 6. Lifecycle Hooks
onMounted(async () => {
  await store.fetchData();
});
</script>

<template>
  <!-- 7. Template Structure -->
  <div class="component-container">
    <h2>{{ title }}</h2>
    
    <!-- 8. Conditional Rendering -->
    <div v-if="store.isLoading">Loading...</div>
    <div v-else-if="store.error">Error: {{ store.error }}</div>
    
    <!-- 9. List Rendering -->
    <ul v-else>
      <li 
        v-for="item in processedItems" 
        :key="item.id"
        @click="handleClick(item)"
      >
        {{ item.name }}
      </li>
    </ul>
    
    <!-- 10. Child Components -->
    <ChildComponent 
      :data="localState"
      @update="localState = $event"
    />
  </div>
</template>

<style scoped>
/* 11. Component-specific styling */
.component-container {
  padding: 1rem;
  margin-bottom: 1rem;
}
</style>
```

## Props and Events

### Defining Props

Props allow components to receive data from their parent:

```javascript
// Basic props definition
const props = defineProps({
  heading: String,
  subHeading: String,
  alignment: {
    type: String,
    default: 'text-center'
  },
  hasAction: {
    type: Boolean,
    default: false
  }
});
```

### Emitting Events

Events allow components to communicate with their parent:

```javascript
// Define emitted events
const emit = defineEmits(['select', 'update']);

// Emit an event
const handleSelection = (item) => {
  emit('select', item);
};

// Emit with multiple arguments
const handleUpdate = (id, value) => {
  emit('update', { id, value });
};
```

## Working with Stores

Components often need to interact with stores to access shared state:

### Store Initialization

```javascript
import { useArticleStore } from '@/stores/articleStore';

// Initialize the store
const articleStore = useArticleStore();
```

### Data Fetching

```javascript
import { onMounted } from 'vue';

// Fetch data when the component mounts
onMounted(async () => {
  await articleStore.fetchAllArticles();
});
```

### Accessing Store State

```vue
<template>
  <!-- Handle loading state -->
  <div v-if="articleStore.baseStore.isLoading" class="loading">
    Loading articles...
  </div>
  
  <!-- Handle error state -->
  <div v-else-if="articleStore.baseStore.error" class="error">
    Error: {{ articleStore.baseStore.error }}
  </div>
  
  <!-- Display data -->
  <div v-else class="articles">
    <ArticlePreview 
      v-for="article in articleStore.allArticles"
      :key="article.id"
      :article="article"
    />
  </div>
</template>
```

## Component Examples

Let's look at some real examples from the project:

### Example 1: SectionHeading Component

```vue
<script setup>
const props = defineProps({
  heading: String,
  subHeading: String,
  alignment: String,
  hasAction: {
    type: Boolean,
    default: true
  }
});
</script>

<template>
  <div class="section-heading pt-5 my-4" :class="alignment">
    <div class="d-flex align-items-end justify-content-between mb-2">
      <div>
        <h2 v-html="heading"></h2>
        <p><em v-html="subHeading"></em></p>
      </div>
      
      <!-- Action slot for links or buttons -->
      <div v-if="$slots.action || hasAction" class="section-action">
        <slot name="action"></slot>
      </div>
    </div>
    
    <!-- Optional content slot -->
    <slot></slot>
  </div>
</template>
```

**Key Features:**
- Simple presentational component
- Uses props for configuration
- Provides slots for flexible content
- Uses v-html for formatted text

### Example 2: Blog View Component

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

**Key Features:**
- Page-level component
- Uses multiple stores
- Handles loading and error states
- Composes multiple child components
- Uses utility functions for data access

## Best Practices

### Component Design

1. **Single Responsibility**: Each component should do one thing well
   - Bad: A component that fetches data, formats it, and renders complex UI
   - Good: Separate components for data fetching, formatting, and UI elements

2. **Keep Components Small**: Aim for components under 200 lines
   - Break large components into smaller, focused ones
   - Use composition to build complex interfaces

3. **Prop Validation**: Always define prop types and defaults
   ```javascript
   defineProps({
     title: {
       type: String,
       required: true
     },
     count: {
       type: Number,
       default: 0
     }
   });
   ```

4. **Use Computed Properties**: For derived values instead of methods
   ```javascript
   // Good
   const fullName = computed(() => `${firstName.value} ${lastName.value}`);
   
   // Avoid
   const getFullName = () => `${firstName.value} ${lastName.value}`;
   ```

### Component Organization

1. **Logical Grouping**: Group related components in subdirectories
   ```
   components/
   ├── article/
   │   ├── ArticlePreview.vue
   │   └── ArticleListItem.vue
   ├── layout/
   │   ├── HeroBanner.vue
   │   └── SectionHeading.vue
   ```

2. **Consistent Naming**:
   - Use PascalCase for component files: `ArticlePreview.vue`
   - Use descriptive names that indicate purpose

3. **Import Order**:
   - Vue imports first
   - External libraries next
   - Local components
   - Store imports
   - Utility functions

### Performance Considerations

1. **Avoid Expensive Operations in Templates**:
   ```vue
   <!-- Bad -->
   <div v-for="item in items" :key="item.id">
     {{ expensiveCalculation(item) }}
   </div>
   
   <!-- Good -->
   <div v-for="item in processedItems" :key="item.id">
     {{ item.processedValue }}
   </div>
   ```

2. **Use v-once for Static Content**:
   ```vue
   <header v-once>
     <h1>Site Title</h1>
   </header>
   ```

3. **Lazy Load Components**:
   ```javascript
   const HeavyComponent = defineAsyncComponent(() =>
     import('./HeavyComponent.vue')
   );
   ```

### Error Handling

1. **Graceful Degradation**:
   ```vue
   <template>
     <div v-if="error" class="error-state">
       <p>Sorry, we couldn't load the data</p>
       <button @click="retry">Try Again</button>
     </div>
     <div v-else>
       <!-- Normal content -->
     </div>
   </template>
   ```

2. **Default Values**:
   ```javascript
   const data = computed(() => store.data || []);
   ```

3. **Optional Chaining**:
   ```vue
   <h1>{{ article?.title || 'Untitled Article' }}</h1>
   ```

---

This guide should help you understand and work with the component system in the Site Starter project. For more detailed information on Vue 3 components, refer to the [official Vue documentation](https://vuejs.org/guide/essentials/component-basics.html).
