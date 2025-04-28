# Site Starter

A modern Vue 3 web application starter template with Bootstrap styling, Pinia state management, and modular architecture. This project provides a solid foundation for building responsive web applications with efficient data management and component reusability.

## Prerequisites

- Node.js (v18.20.5 or later)
- npm (v10.8.2 or later)

## Key Features

- Vue 3 with Composition API
- Vite for fast development and optimized builds
- Pinia state management with caching
- Vue Router for client-side routing
- Bootstrap 5 for responsive styling
- SCSS for advanced styling capabilities
- Modular API services architecture
- Carousel component with Splide.js

## Project Structure

```
src/
├── assets/           # Static assets and global styles
│   └── scss/         # SCSS styles and variables
├── components/       # Reusable Vue components
│   ├── icons/        # SVG icon components
│   └── navigation/   # Navigation-related components
├── router/           # Vue Router configuration
├── services/         # API services for data fetching
├── stores/           # Pinia stores for state management
└── views/            # Page components
public/
├── data/             # JSON data files for mock APIs
└── images/           # Public image assets
docs/                 # Project documentation
```

## Notable Packages

- **Vue 3** (v3.5.13) - Progressive JavaScript framework
- **Pinia** (v2.3.1) - Intuitive, type-safe store for Vue
- **Vue Router** (v4.5.0) - Official router for Vue.js
- **Bootstrap** (v5.3.3) - CSS framework for responsive design
- **Vue Splide** (v0.6.12) - Vue component for the Splide slider/carousel
- **Sass** (v1.84.0) - CSS preprocessor for advanced styling
- **Vite** (v6.0.11) - Next generation frontend tooling

## Getting Started

### Installation

```sh
# Clone the repository
git clone <repository-url>
cd site-starter

# Install dependencies
npm install
```

### Development

```sh
# Start development server with hot-reload
npm run dev
```

The application will be available at http://localhost:5173 by default.

### Building for Production

```sh
# Compile and minify for production
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```sh
# Preview the production build
npm run preview
```

## Architecture

This project follows a modular architecture with clean separation of concerns:

- **Components**: Reusable UI elements
- **Views**: Page-level components
- **Stores**: State management with Pinia
- **Services**: API integration and data fetching
- **Router**: Navigation and routing

## Documentation

Detailed documentation is available in the `docs` directory:

- [Store Architecture](./docs/store-architecture.md) - Pinia store system with caching
- [API Integration](./docs/api-integration.md) - API services architecture and patterns

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) for the best development experience.

## Customize Configuration

See [Vite Configuration Reference](https://vitejs.dev/config/) for customizing the build configuration.
