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
 * Fetches only featured articles from the JSON file
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
