/**
 * Page Content Utilities
 * Helper functions for working with page content data
 */

/**
 * Get a specific section from page content by its ID
 * @param {Object} pageContent - The page content object
 * @param {string} sectionId - The ID of the section to retrieve
 * @returns {Object|null} The section object or null if not found
 */
export const getSection = (pageContent, sectionId) => {
  if (!pageContent || !pageContent.sections) return null;
  return pageContent.sections.find(section => section.id === sectionId);
};

/**
 * Get hero content from page content
 * @param {Object} pageContent - The page content object
 * @returns {Object|null} The hero content or null if not found
 */
export const getHeroContent = (pageContent) => {
  if (!pageContent || !pageContent.hero) return null;
  return pageContent.hero;
};
