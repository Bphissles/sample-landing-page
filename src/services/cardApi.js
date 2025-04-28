/**
 * Card API Service
 * Handles fetching card data from JSON file
 */

/**
 * Fetches all cards from the JSON file
 * @returns {Promise<Array>} Promise that resolves to array of card objects
 */
export const fetchAllCards = async () => {
  try {
    const response = await fetch('/data/cards.json');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch cards: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching cards:', error);
    throw error;
  }
};
