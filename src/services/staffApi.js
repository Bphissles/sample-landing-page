/**
 * Staff API Service
 * Handles fetching staff data from JSON file
 */

/**
 * Fetches all staff members from the JSON file
 * @returns {Promise<Array>} Promise that resolves to array of staff objects
 */
export const fetchStaff = async () => {
  try {
    const response = await fetch('/data/staff.json');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch staff data: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching staff data:', error);
    return [];
  }
};
