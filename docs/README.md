# Site Starter Documentation

This directory contains comprehensive documentation for the Site Starter project. The documentation is organized by topic to help developers understand the architecture, patterns, and best practices used in the project.

## Available Documentation

- [Store Architecture](./store-architecture.md) - Details about the Pinia store implementation and patterns
  - Includes information on the base API store factory pattern
  - Documents article, carousel, staff, card, and page content stores
  - Provides usage examples to the API services architecture, including error handling, data fetching patterns, and best practices for extending the system.
- [API Integration](./api-integration.md) - Comprehensive guide to the API services architecture, including error handling, data fetching patterns, and best practices for extending the system.

## Component Overview

The project includes the following key components:

### Data Display Components

- **Article Components**: `ArticlePreview.vue`, `ArticleListItem.vue` - Display article previews in different formats
- **Card Components**: `CardItem.vue` - Displays card content from the card store
- **Staff Components**: `StaffEntry.vue` - Displays staff member information
- **Page Structure Components**: 
  - `SectionHeading.vue` - Data-driven section headings with optional action slots
  - `HeroBanner.vue` - Data-driven hero banners for page headers

### Data Management

- **Article Store** - Manages article data with specialized handling for featured articles
- **Card Store** - Manages card data with support for different card types
- **Staff Store** - Manages staff member data
- **Carousel Store** - Manages carousel image data
- **Page Content Store** - Manages page-level content for hero banners and section headings

## Data-Driven Architecture

The application uses a data-driven approach with JSON files stored in `/public/data/`:

- `articles.json` - Article content with structured content blocks
- `carousel.json` - Carousel slide data
- `staff.json` - Staff member information
- `cards.json` - Card content data
- `page-content.json` - Page-level content for hero banners and section headings

## Documentation Guidelines

When adding new documentation:

1. Create a focused Markdown file for each major topic
2. Use clear headings and subheadings for easy navigation
3. Include code examples where appropriate
4. Update this README with links to new documentation files
5. Follow a consistent style across all documentation

## Future Documentation

The following documentation is planned for future addition:

- Component Architecture - Detailed explanation of component design patterns and reusability
- Routing System - Navigation and route management
- Styling Guidelines - SCSS organization and theming approach
- Testing Strategy - Unit and integration testing approach
