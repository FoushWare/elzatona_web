# Website Application Documentation

## Overview

The website application is the main user-facing application built with Next.js App Router.

## Structure

```
apps/website/
├── src/app/                # Next.js App Router pages
├── page-components/        # Page components
├── components/             # App-specific components
├── network/                # API routes and configuration
├── lib/                    # App-specific libraries
├── context/                # App-specific contexts
├── providers/              # React providers
└── utilities/              # App-specific utilities
```

## Key Features

- Guided learning paths
- Practice questions
- Custom roadmaps
- Flashcards
- Problem-solving challenges
- Frontend tasks

## Development

```bash
# Start development server
bun run dev

# Build for production
bun run build

# Run tests
bun run test:unit
```

## Documentation

- [Component Guide](./components.md)
- [API Routes](./api-routes.md)
- [Page Structure](./pages.md)

