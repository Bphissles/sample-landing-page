/**
 * Carousel API Service
 * Handles fetching carousel image data from JSON file
 */

/**
 * Fetches carousel images data from the JSON file
 * @returns {Promise<Array>} Promise that resolves to array of image objects
 */
export const fetchCarouselImages = async () => {
  try {
    const response = await fetch('/data/carousel-images.json');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch carousel images: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching carousel images:', error);
    return [];
  }
};
