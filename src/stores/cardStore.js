/**
 * Card Store
 * Manages card data with caching
 */
import { defineStore } from 'pinia';
import { fetchAllCards } from '@/services/cardApi';
import { createApiStore } from './apiStore';

// Create base card store using the API store factory
const useBaseCardStore = createApiStore('cards', fetchAllCards);

/**
 * Card store with additional functionality
 */
export const useCardStore = defineStore('cardStore', {
  state: () => ({
    // Use composition to include the base store functionality
    baseStore: useBaseCardStore()
  }),
  
  getters: {
    /**
     * Get all cards from the base store
     */
    allCards() {
      return this.baseStore.data;
    },
    
    /**
     * Check if cards are loading
     */
    isLoading() {
      return this.baseStore.isLoading;
    },
    
    /**
     * Get any error from the base store
     */
    error() {
      return this.baseStore.error;
    }
  },
  
  actions: {
    /**
     * Fetch all cards using the base store
     */
    async fetchAllCards(forceRefresh = false) {
      return await this.baseStore.fetchData(forceRefresh);
    },
    
    /**
     * Get a single card by ID
     */
    getCardById(id) {
      if (!this.baseStore.data.length) return null;
      return this.baseStore.data.find(card => card.id === id) || null;
    },
    
    /**
     * Clear all card data
     */
    clearData() {
      this.baseStore.clearData();
    }
  }
});
