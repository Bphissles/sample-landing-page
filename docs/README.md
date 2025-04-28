# Site Starter Documentation

This directory contains comprehensive documentation for the Site Starter project. The documentation is organized by topic to help developers understand the architecture, patterns, and best practices used in the project.

## Available Documentation

- [Store Architecture](./store-architecture.md) - Detailed explanation of the Pinia store system, including caching mechanisms, API integration, and usage patterns.
- [API Integration](./api-integration.md) - Comprehensive guide to the API services architecture, including error handling, data fetching patterns, and best practices for extending the system.

## Component Overview

The project includes the following key components:

### Data Display Components

- **ArticlePreview** - Card-style component for displaying article previews on the home page
- **ArticleListItem** - Horizontal list-style component for displaying articles in the blog view
- **CardItem** - Flexible component for displaying different types of card content (text, lists, etc.)

### Data Management

- **Article Store** - Manages article data with specialized handling for featured articles
- **Card Store** - Manages card data with support for different card types
- **Staff Store** - Manages staff member data
- **Carousel Store** - Manages carousel image data

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
