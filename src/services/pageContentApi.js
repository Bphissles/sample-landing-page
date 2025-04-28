/**
 * Page Content API Service
 * Handles fetching page content data from JSON file
 */

/**
 * Fetches all page content from the JSON file
 * @returns {Promise<Object>} Promise that resolves to page content object
 */
export const fetchPageContent = async () => {
  try {
    const response = await fetch('/data/page-content.json');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch page content: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching page content:', error);
    throw error;
  }
};

/**
 * Fetches content for a specific page
 * @param {string} pageName - The name of the page to fetch content for
 * @returns {Promise<Object>} Promise that resolves to the specific page content
 */
export const fetchPageContentByName = async (pageName) => {
  try {
    const allContent = await fetchPageContent();
    return allContent[pageName] || null;
  } catch (error) {
    console.error(`Error fetching content for page ${pageName}:`, error);
    throw error;
  }
};
