# API Integration Documentation

## Overview

This document provides a comprehensive guide to the API integration architecture implemented in the Site Starter project. The API services are designed to handle data fetching from various sources, with a focus on clean separation of concerns, error handling, and integration with the Pinia store system.

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [API Service Structure](#api-service-structure)
- [Current API Services](#current-api-services)
  - [Article API](#article-api)
  - [Carousel API](#carousel-api)
  - [Staff API](#staff-api)
- [Error Handling](#error-handling)
- [Integration with Stores](#integration-with-stores)
- [Best Practices](#best-practices)
- [Extending the System](#extending-the-system)

## Architecture Overview

The API integration architecture follows these key principles:

1. **Separation of Concerns**: API services are responsible only for data fetching and basic transformation, not state management
2. **Consistent Patterns**: All API services follow the same patterns for fetching, error handling, and data transformation
3. **Promise-Based**: All API methods return Promises for consistent async handling
4. **Error Handling**: Comprehensive error handling with meaningful error messages
5. **Integration with Stores**: API services are designed to work seamlessly with the Pinia store system

## API Service Structure

Each API service follows a consistent structure:

```javascript
/**
 * Service description
 */

/**
 * Function description
 * @param {Type} paramName - Parameter description
 * @returns {Promise<Type>} Return value description
 */
export const functionName = async (params) => {
  try {
    // Fetch data
    const response = await fetch('/path/to/resource');
    
    // Validate response
    if (!response.ok) {
      throw new Error(`Error message: ${response.status} ${response.statusText}`);
    }
    
    // Process and return data
    return await response.json();
  } catch (error) {
    // Error handling
    console.error('Error message:', error);
    return fallbackValue; // Often an empty array or null
  }
};
```

## Current API Services

### Article API

The Article API service handles fetching article data from a JSON file.

#### Key Functions

- `fetchAllArticles()`: Fetches all articles from the JSON file
- `fetchFeaturedArticles()`: Fetches only featured articles (filtered from all articles)

#### Example Usage

```javascript
import { fetchAllArticles, fetchFeaturedArticles } from '@/services/articleApi';

// Fetch all articles
const articles = await fetchAllArticles();

// Fetch only featured articles
const featuredArticles = await fetchFeaturedArticles();
```

#### Implementation Details

The `fetchFeaturedArticles` function reuses `fetchAllArticles` and filters the results, demonstrating composition of API functions for efficiency.

### Carousel API

The Carousel API service handles fetching carousel image data from a JSON file.

#### Key Functions

- `fetchCarouselImages()`: Fetches all carousel images from the JSON file

#### Example Usage

```javascript
import { fetchCarouselImages } from '@/services/carouselApi';

// Fetch carousel images
const images = await fetchCarouselImages();
```

### Staff API

The Staff API service handles fetching staff member data from a JSON file.

#### Key Functions

- `fetchStaff()`: Fetches all staff members from the JSON file

#### Example Usage

```javascript
import { fetchStaff } from '@/services/staffApi';

// Fetch staff members
const staffMembers = await fetchStaff();
```

## Error Handling

API services implement a consistent error handling pattern:

1. **Try-Catch Blocks**: All API calls are wrapped in try-catch blocks
2. **Response Validation**: HTTP responses are validated with the `response.ok` check
3. **Error Logging**: Errors are logged to the console with descriptive messages
4. **Fallback Values**: API methods return fallback values (usually empty arrays) on error
5. **Error Propagation**: Errors can be propagated to the caller when needed

Example:

```javascript
try {
  const response = await fetch('/data/resource.json');
  
  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
  }
  
  return await response.json();
} catch (error) {
  console.error('Error fetching data:', error);
  return []; // Fallback value
}
```

## Integration with Stores

API services are designed to work seamlessly with the Pinia store system:

1. **Store Imports API**: Each store imports the API services it needs
2. **API Functions as Dependencies**: API functions are passed to the store factory
3. **Stores Handle State**: API services focus on data fetching, stores handle state management
4. **Error Handling Cooperation**: API services handle immediate errors, stores handle UI-related error states

Example:

```javascript
// In the store file
import { fetchData } from '@/services/dataApi';
import { createApiStore } from './apiStore';

// Create store with API function as dependency
export const useDataStore = createApiStore('data', fetchData);
```

## Best Practices

### API Service Design

1. **Single Responsibility**: Each API service should focus on a specific domain (articles, users, etc.)
2. **Consistent Naming**: Use consistent naming conventions (`fetchX`, `createX`, `updateX`, `deleteX`)
3. **Comprehensive JSDoc**: Document all functions with JSDoc comments
4. **Error Handling**: Always include proper error handling
5. **Minimal Dependencies**: Keep dependencies between services minimal

### Data Transformation

1. **Keep It Simple**: Perform minimal data transformation in API services
2. **Consistent Return Types**: Ensure consistent return types, even in error cases
3. **Immutability**: Don't mutate input parameters
4. **Validation**: Validate API responses before returning them

### Testing

1. **Mock Fetch**: Use fetch mocking for testing API services
2. **Test Error Cases**: Test both success and error paths
3. **Isolate Tests**: Keep API service tests isolated from store tests

## Extending the System

### Adding a New API Service

1. **Create Service File**: Create a new file in the `services` directory
2. **Follow the Pattern**: Use the same structure as existing services
3. **Document Functions**: Add JSDoc comments to all functions
4. **Implement Error Handling**: Follow the established error handling pattern
5. **Create Associated Store**: Create a store that uses the new API service

### Example: Creating a Products API

```javascript
/**
 * Products API Service
 * Handles fetching product data from JSON file
 */

/**
 * Fetches all products from the JSON file
 * @returns {Promise<Array>} Promise that resolves to array of product objects
 */
export const fetchProducts = async () => {
  try {
    const response = await fetch('/data/products.json');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

/**
 * Fetches a single product by ID
 * @param {string} id - Product ID
 * @returns {Promise<Object|null>} Promise that resolves to product object or null
 */
export const fetchProductById = async (id) => {
  try {
    const products = await fetchProducts();
    return products.find(product => product.id === id) || null;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    return null;
  }
};
```

### Integrating with External APIs

When integrating with external APIs, follow these additional guidelines:

1. **Environment Variables**: Use environment variables for API keys and endpoints
2. **Rate Limiting**: Implement rate limiting for external API calls
3. **Caching**: Consider additional caching strategies for external APIs
4. **Error Handling**: Handle network errors and API-specific error responses
5. **Retry Logic**: Implement retry logic for transient failures

Example with an external API:

```javascript
/**
 * External API Service
 * Handles fetching data from external API
 */

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Fetches data from external API
 * @returns {Promise<Array>} Promise that resolves to array of data objects
 */
export const fetchExternalData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/data`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching external data:', error);
    return [];
  }
};
```

---

This documentation provides a comprehensive guide to the API integration architecture. For specific implementation details, refer to the source code in the `src/services` directory.
