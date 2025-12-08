# Admin Application Documentation

## Overview

The admin application is the administrative panel for managing content, users, and system configuration.

## Structure

```
apps/admin/
├── pages/                  # Next.js Pages Router pages
├── components/             # Admin-specific components
├── network/                # API routes and configuration
├── lib/                    # Admin-specific libraries
└── utilities/              # Admin-specific utilities
```

## Key Features

- Content management (cards, plans, categories, topics, questions)
- User management
- Frontend tasks management
- Problem-solving tasks management
- Analytics and reporting

## Development

```bash
# Start development server
bun run dev:admin

# Build for production
bun run build:admin

# Run tests
bun run test
```

## Documentation

- [Content Management](./content-management.md)
- [User Management](./user-management.md)
- [API Routes](./api-routes.md)

