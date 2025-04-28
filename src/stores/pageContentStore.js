/**
 * Page Content Store
 * Manages page content data with caching
 */
import { defineStore } from 'pinia';
import { fetchPageContent, fetchPageContentByName } from '@/services/pageContentApi';

export const usePageContentStore = defineStore('pageContentStore', {
  state: () => ({
    allContent: null,
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
    },
    
    getPageContent() {
      return (pageName) => {
        if (!this.allContent) return null;
        return this.allContent[pageName] || null;
      };
    },
    
    getSection() {
      return (pageName, sectionId) => {
        const pageContent = this.getPageContent(pageName);
        if (!pageContent || !pageContent.sections) return null;
        
        return pageContent.sections.find(section => section.id === sectionId) || null;
      };
    }
  },
  
  actions: {
    async fetchAllContent(forceRefresh = false) {
      // Return cached data if valid and not forcing refresh
      if (this.isCacheValid && this.allContent && !forceRefresh) {
        return this.allContent;
      }
      
      // Otherwise fetch fresh data
      try {
        this.isLoading = true;
        this.error = null;
        
        const result = await fetchPageContent();
        this.allContent = result;
        this.lastFetched = new Date().getTime();
        
        return result;
      } catch (err) {
        this.error = err.message || 'Failed to fetch page content';
        console.error('Page content store error:', err);
        return null;
      } finally {
        this.isLoading = false;
      }
    },
    
    async fetchPageContent(pageName, forceRefresh = false) {
      // First try to get from cache if available
      if (this.isCacheValid && this.allContent && !forceRefresh) {
        return this.getPageContent(pageName);
      }
      
      // Otherwise fetch all content
      await this.fetchAllContent(forceRefresh);
      return this.getPageContent(pageName);
    },
    
    setCacheExpiration(milliseconds) {
      this.cacheExpiration = milliseconds;
    },
    
    clearCache() {
      this.allContent = null;
      this.lastFetched = null;
      this.error = null;
    }
  }
});
