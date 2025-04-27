/**
 * Base API Store
 * Provides common functionality for API data caching and management
 */
import { defineStore } from 'pinia';

/**
 * Creates a store for API data with caching
 * @param {string} name - The name of the store
 * @param {Function} fetchFunction - The API function to fetch data
 * @returns {Object} A Pinia store with caching capabilities
 */
export const createApiStore = (name, fetchFunction) => {
  return defineStore(`${name}Store`, {
    state: () => ({
      data: [],
      isLoading: false,
      error: null,
      lastFetched: null,
      // Cache expiration time in milliseconds (default: 5 minutes)
      cacheExpiration: 5 * 60 * 1000
    }),
    
    getters: {
      /**
       * Check if the cache is valid
       * @returns {boolean} True if cache is valid, false otherwise
       */
      isCacheValid() {
        if (!this.lastFetched) return false;
        const now = new Date().getTime();
        return now - this.lastFetched < this.cacheExpiration;
      }
    },
    
    actions: {
      /**
       * Set the cache expiration time
       * @param {number} timeInMilliseconds - Cache expiration time in milliseconds
       */
      setCacheExpiration(timeInMilliseconds) {
        this.cacheExpiration = timeInMilliseconds;
      },
      
      /**
       * Fetch data from API or cache
       * @param {boolean} forceRefresh - Force refresh from API even if cache is valid
       * @returns {Promise<Array>} The fetched data
       */
      async fetchData(forceRefresh = false) {
        // Return cached data if available and not forcing refresh
        if (this.isCacheValid && !forceRefresh) {
          return this.data;
        }
        
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
      },
      
      /**
       * Clear the cache and force a refresh
       * @returns {Promise<Array>} The freshly fetched data
       */
      async refreshData() {
        return this.fetchData(true);
      },
      
      /**
       * Clear all data and reset the store
       */
      clearData() {
        this.data = [];
        this.lastFetched = null;
        this.error = null;
      }
    }
  });
};
