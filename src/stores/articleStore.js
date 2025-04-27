/**
 * Article Store
 * Manages article data with caching
 */
import { defineStore } from 'pinia';
import { fetchAllArticles, fetchFeaturedArticles } from '@/services/articleApi';
import { createApiStore } from './apiStore';

// Create base article store using the API store factory
const useBaseArticleStore = createApiStore('articles', fetchAllArticles);

/**
 * Article store with additional functionality for featured articles
 */
export const useArticleStore = defineStore('articleStore', {
  state: () => ({
    // Use composition to include the base store functionality
    baseStore: useBaseArticleStore(),
    featuredArticles: [],
    isFeaturedLoading: false,
    featuredError: null,
    lastFeaturedFetched: null
  }),
  
  getters: {
    /**
     * Get all articles from the base store
     */
    allArticles() {
      return this.baseStore.data;
    },
    
    /**
     * Check if the featured articles cache is valid
     */
    isFeaturedCacheValid() {
      if (!this.lastFeaturedFetched) return false;
      const now = new Date().getTime();
      return now - this.lastFeaturedFetched < this.baseStore.cacheExpiration;
    },
    
    /**
     * Check if any articles are loading
     */
    isLoading() {
      return this.baseStore.isLoading || this.isFeaturedLoading;
    }
  },
  
  actions: {
    /**
     * Fetch all articles using the base store
     */
    async fetchAllArticles(forceRefresh = false) {
      return await this.baseStore.fetchData(forceRefresh);
    },
    
    /**
     * Fetch only featured articles
     */
    async fetchFeaturedArticles(forceRefresh = false) {
      // Return cached featured articles if available and not forcing refresh
      if (this.isFeaturedCacheValid && !forceRefresh) {
        return this.featuredArticles;
      }
      
      try {
        this.isFeaturedLoading = true;
        this.featuredError = null;
        
        // If we already have all articles cached, filter them
        if (this.baseStore.isCacheValid && !forceRefresh && this.baseStore.data.length > 0) {
          this.featuredArticles = this.baseStore.data.filter(article => article.featured);
        } else {
          // Otherwise fetch featured articles directly
          this.featuredArticles = await fetchFeaturedArticles();
        }
        
        this.lastFeaturedFetched = new Date().getTime();
        return this.featuredArticles;
      } catch (err) {
        this.featuredError = err.message || 'Failed to fetch featured articles';
        console.error('Featured articles error:', err);
        return [];
      } finally {
        this.isFeaturedLoading = false;
      }
    },
    
    /**
     * Get a single article by ID
     */
    async getArticleById(id, forceRefresh = false) {
      // First check if we have it in the current data
      if (this.baseStore.data.length > 0 && !forceRefresh) {
        const article = this.baseStore.data.find(article => article.id === id);
        if (article) return article;
      }
      
      // If not found or forcing refresh, fetch all articles
      await this.fetchAllArticles(forceRefresh);
      return this.baseStore.data.find(article => article.id === id) || null;
    },
    
    /**
     * Clear all article data
     */
    clearAllData() {
      this.baseStore.clearData();
      this.featuredArticles = [];
      this.lastFeaturedFetched = null;
      this.featuredError = null;
    }
  }
});
