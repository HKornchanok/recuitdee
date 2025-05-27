# Frontend

This is an Angular-based frontend application built with Nx workspace, featuring state management with NgRx and styling with Tailwind CSS.

## Installation

1. Clone the repository:
2. Install dependencies:

```sh
cd frontend
```

```sh
npm install
```

## Development

To run the development server:

```sh
# Start the development server
npm start
# or
npx nx serve frontend
```

The application will be available at `http://localhost:4200` by default.

> **Important**: Make sure to start the backend server in the `../backend` directory before running the frontend application.

## Building

To create a production build:

```sh
# Create production build
npm run build
# or
npx nx build frontend
```

The build artifacts will be stored in the `dist/` directory.

## Testing

```sh
# Run all tests
npm run test:all

# Run tests for affected files
npm run test

# Run linting
npm run lint
```

### End-to-End Testing

> **Important**: Make sure the backend server is running in the `../backend` directory before running E2E tests.

The project uses Cypress for end-to-end testing. E2E tests are located in the `e2e/` directory and cover critical user flows including:

- Landing page navigation
- Authentication flows (login/signup)
- Theme switching
- Route protection
- Form validations

To run E2E tests:

```sh
npm run e2e
```

Key test scenarios covered:
- Landing page welcome message
- Navigation between pages
- Invalid route handling
- Authentication flows
  - Login attempts (valid/invalid)
  - Sign-up form validation
  - Protected route access
- Theme switching functionality
- Settings page interactions

## Available Scripts

- `npm start` - Start the development server
- `npm run build` - Create a production build
- `npm run test` - Run tests for affected files
- `npm run test:all` - Run all tests
- `npm run lint` - Run linting
- `npm run format` - Format code using Prettier

## Tech Stack

- Angular 19
- NgRx for state management
- Tailwind CSS for styling
- Jest for testing
- ESLint for code linting
- Prettier for code formatting

## Project Structure

- `src/` - Source code
- `libs/` - Shared libraries
- `e2e/` - End-to-end tests
- `public/` - Static assets

## Features

### User Interface

- **Landing Page**
- **Search Page**
- **Favorite Page**
- **Settings Page**

### State Management

#### Auth State (`auth`)

- **Purpose**: Manages user authentication and session
- **Key Features**:
  - User login/logout state
  - User profile information
  - Authentication token management
  - Session persistence

#### Search State (`search`)

- **Purpose**: Manages character search and filtering
- **Key Features**:
  - Search results management
  - Pagination state
  - Filter state (search query, gender, status)
  - Loading and error states
  - Character details caching

#### Favorite State (`favorite`)

- **Purpose**: Manages user's favorite characters
- **Key Features**:
  - Add/remove favorites
  - Favorite list persistence
  - Favorite state synchronization
  - Entity state management for favorites

#### Theme State (`theme`)

- **Purpose**: Manages application theme preferences
- **Key Features**:
  - Dark/Light mode toggle
  - Theme persistence
  - Theme initialization

Each state is managed using NgRx with the following features:

- Reducers for state updates
- Actions for state changes
- Selectors for state access
- Effects for side effects
- Facades for state interaction
- Entity state management where applicable

### Technical Features

- **Modern Architecture**
  - Angular 19 framework
  - Lazy-loaded modules
  - Component-based architecture
  - Responsive design with Tailwind CSS

### Development Features

- **Code Quality**
  - ESLint for code linting
  - Prettier for code formatting
  - Comprehensive testing setup
  - TypeScript for type safety

### Performance

- **Optimization**
  - Lazy loading for better performance
  - Efficient state management
  - Optimized bundle size
  - Fast page loads

