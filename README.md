# Qantas Test

Qantas Hotel searching page built with Next.js, showcasing hotel information with sorting capabilities.

## Tech Stack

- **Next.js 15.2.2**
- **React 19.0.0**
- **TypeScript**
- **Tailwind CSS**
- **Jest + React Testing Library**
- **Playwright**

## Project Structure


```
src/
  ├── app/             # App Router pages
  ├── components/      # Components
  ├── types/           # TypeScript type definitions
  └── mock/            # Mock data
tests/                 # End-to-end tests
```

## Development Approach

#### Next.js + React
- Built-in TypeScript support
- Zero-config development experience

#### Tailwind CSS
- Rapid development
- No separate CSS files to maintain

#### Unit Tests (Jest)
- Test isolated components and functions
- Includes code coverage reporting

#### End-to-End Tests (Playwright)
- Run across multiple browsers
- Provides visual testing and debugging capabilities


## Scripts

```bash
# Development
npm run dev          # Start development server (with Turbopack)

# Build and Deploy
npm run build        # Build for production
npm run start        # Run production build

# Testing
npm run test:unit    # Run unit tests
npm run test:e2e     # Run end-to-end tests

# Code Quality
npm run lint         # Run ESLint
```


## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



