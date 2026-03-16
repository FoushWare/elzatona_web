# Elzatona Web

A comprehensive platform for frontend developers to practice coding challenges and prepare for technical interviews.

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ or **Bun**
- **Database** - PostgreSQL (Supabase), MongoDB, MySQL, or Firebase
- **Git**

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd Elzatona-web

# Install dependencies
bun install
# or
npm install

# Set up environment variables
cp .env.example .env.local
cp .env.test.local.example .env.test.local
cp .env.dev.local.example .env.dev.local

# Fill in your database credentials in .env.local
# Set DATABASE_TYPE environment variable (postgresql, mongodb, mysql, or firebase)
# See docs/flows/environment-setup.md for details

# Start development server
bun run dev
```

Visit `http://localhost:3000` to see the application.

## 🧪 Testing & Quality Assurance

### Running All Tests

```bash
npm run test
# or
bun run test
```

### Running E2E Tests

```bash
npm run test:e2e
# or
bun run test:e2e
```

### Generating Coverage Report

```bash
npm run test -- --coverage
# or
bun run test --coverage
```

Coverage reports are generated in the `coverage/` directory. Ensure coverage is ≥90% for constitution compliance.

### SonarQube Quality Gate

Run SonarQube scan and verify quality gate passes:

```bash
# See docs/SONARQUBE_MCP_SETUP.md for setup
npx sonar-scanner
```

### Test Summary & Documentation

- See `refactoring-plans/specs/database-abstraction-testing-tasks.md` for full test plan
- Coverage badge and summary are updated automatically after CI runs

## 📚 Documentation

### Getting Started

- **[Local Development Flow](docs/flows/local-development.md)** - Complete guide to local development
- **[Environment Setup](docs/flows/environment-setup.md)** - How to configure environment variables
- **[Project Structure](docs/structure.md)** - Detailed project structure and organization

### Development Flows

- **[Local Development](docs/flows/local-development.md)** - Development workflow and commands
- **[CI/CD Pipeline](docs/flows/ci-cd-pipeline.md)** - Continuous integration and deployment
- **[Environment Setup](docs/flows/environment-setup.md)** - Environment configuration guide

### Application-Specific Docs

- **[Website Documentation](docs/website/)** - Website application documentation
- **[Admin Documentation](docs/admin/)** - Admin panel documentation
- **[Libraries Documentation](docs/libs/)** - Shared libraries documentation

### General Documentation

- **[Security Guide](docs/SECURITY.md)** - Security best practices and pipeline
- **[Testing Guide](docs/TESTING_SUMMARY.md)** - Testing strategy and coverage
- **[Database Schema](docs/database/questions-schema.md)** - Database structure

## 🔌 API Documentation

Both applications provide interactive API documentation powered by Swagger UI:

### Website API Documentation

Access the interactive API documentation for the public-facing website:

```
http://localhost:3000/api-docs
```

**Available Endpoints:**

- **Authentication** - Session management, logout
- **Questions** - Practice questions, validation, statistics
- **Categories & Topics** - Browse question categories and topics
- **Learning Paths** - Structured learning paths
- **Guided Learning** - Guided learning plans and sections
- **Progress** - User progress tracking
- **Flashcards** - Flashcard management
- **Frontend Tasks** - Frontend coding challenges
- **Code Execution** - Code compilation and testing

### Admin API Documentation

Access the interactive API documentation for the admin panel:

```
http://localhost:3001/api-docs
```

**Available Endpoints:**

- **Dashboard** - Admin dashboard statistics
- **Authentication** - Admin login and session management
- **Users** - User management
- **Frontend Tasks** - CRUD operations for frontend coding tasks
- **Problem Solving** - CRUD operations for problem-solving questions
- **Learning Cards** - Learning card management
- **Questions** - Question management
- **Categories & Topics** - Category and topic management

### Using Swagger UI

1. **Start the development servers:**

   ```bash
   # Website (runs on port 3000)
   bun run dev

   # Admin (runs on port 3001)
   bun run dev:admin
   ```

2. **Navigate to the API docs:**
   - Website: Open `http://localhost:3000/api-docs`
   - Admin: Open `http://localhost:3001/api-docs`

3. **Explore endpoints:**
   - Click on any endpoint to view details
   - View request/response schemas
   - See required parameters and body structure
   - Check authentication requirements

4. **Test endpoints:**
   - Click "Try it out" button on any endpoint
   - Fill in required parameters
   - For authenticated endpoints, click "Authorize" and enter your JWT token
   - Click "Execute" to send the request
   - View the response in real-time

5. **Authentication:**
   - Many endpoints require authentication
   - Obtain a JWT token by logging in first
   - Click the "Authorize" button at the top
   - Enter: `Bearer YOUR_JWT_TOKEN`
   - Click "Authorize" to apply to all requests

### OpenAPI Specification

The raw OpenAPI 3.0 specifications are also available:

- Website: `http://localhost:3000/api/swagger`
- Admin: `http://localhost:3001/api/swagger`

You can import these into tools like Postman, Insomnia, or API testing frameworks.

## 🏗️ Project Structure

This is an **Nx monorepo** with the following structure:

```
Elzatona-web/
├── apps/
│   ├── website/          # Main website (Next.js App Router)
│   └── admin/            # Admin panel (Next.js Pages Router)
├── libs/
│   ├── components/       # Shared React components
│   ├── hooks/            # Shared React hooks
│   ├── types/            # Shared TypeScript types
│   ├── contexts/         # Shared React contexts
│   ├── utilities/        # Shared utilities and scripts
│   ├── ui/               # UI component library
│   ├── auth/             # Authentication utilities
│   └── database/         # Database utilities
├── docs/                 # Documentation
│   ├── website/          # Website-specific docs
│   ├── admin/            # Admin-specific docs
│   ├── libs/             # Library-specific docs
│   └── flows/            # Development flows
└── tests/                # E2E tests
```

See [docs/structure.md](docs/structure.md) for detailed structure.

## 🛠️ Development

### Available Scripts

#### Development

```bash
# Start website (production environment)
bun run dev

# Start website (test environment)
bun run dev:test

# Start website (development environment)
bun run dev:dev

# Start admin panel
bun run dev:admin

# Start with reduced memory (8GB RAM systems)
bun run dev:light
```

#### Building

```bash
# Build website
bun run build

# Build admin
bun run build:admin

# Build all apps
bun run build:all

# Check build
bun run build:check
```

#### Testing

```bash
# Run all tests
bun run test

# Run unit tests
bun run test:unit

# Run integration tests
bun run test:integration

# Run E2E tests
bun run test:e2e
```

#### Code Quality

```bash
# Lint all files
bun run lint:all

# Lint and fix
bun run lint:fix

# Type check
bun run type-check

# Format code
bun run format
```

See [docs/flows/local-development.md](docs/flows/local-development.md) for complete development guide.

## 🔐 Environment Variables

### Required Variables

Create `.env.local` with the following:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Application Environment
APP_ENV=production
NEXT_PUBLIC_APP_ENV=production

# Admin User
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your-password
```

### Environment Files

- `.env.example` - Template for production environment
- `.env.test.local.example` - Template for test environment
- `.env.dev.local.example` - Template for development environment

See [docs/flows/environment-setup.md](docs/flows/environment-setup.md) for complete setup guide.

## 🔄 CI/CD Pipeline

The project uses GitHub Actions for CI/CD:

- **CodeQL Analysis** - Security vulnerability scanning
- **SonarCloud** - Code quality and security analysis
- **Secret Scanning** - Automatic secret detection and fixing

See [docs/flows/ci-cd-pipeline.md](docs/flows/ci-cd-pipeline.md) for pipeline details.

## 🧪 Testing

### Test Structure

Tests are co-located with their source files:

```
Component.tsx
Component.test.tsx              # Unit tests
Component.integration.test.tsx  # Integration tests
```

### Running Tests

```bash
# All tests
bun run test

# Unit tests only
bun run test:unit

# Integration tests only
bun run test:integration

# E2E tests
bun run test:e2e
```

See [docs/TESTING_SUMMARY.md](docs/TESTING_SUMMARY.md) for testing strategy.

## 📦 Import Paths

### Shared Libraries

```typescript
// Components
import { Button, Card } from "@elzatona/components";

// Hooks
import { useCards, usePlans } from "@elzatona/hooks";

// Types
import { LearningCard, UnifiedQuestion } from "@elzatona/types";

// Contexts
import { AuthProvider } from "@elzatona/contexts";

// Utilities
import { formatDate } from "@elzatona/utilities";
```

### App-Specific

```typescript
// Website app
import { Component } from "@/components/Component";
import { utility } from "@/lib/utility";

// Admin app
import { Component } from "@/components/Component";
```

## 🔒 Security

### Security Pipeline

- **Pre-commit hooks** - GitGuardian secret scanning (catches secrets before they leave your machine)
- **Pre-push hooks** - Secret scanning, linting, type checking
- **GitHub Actions** - CodeQL, SonarCloud, secret scanning
- **Git Hooks** - Automatic security checks

### GitGuardian Setup (Pre-commit Secret Detection)

The pre-commit hook includes GitGuardian (`ggshield`) to catch secrets before they're committed:

1. **Install GitGuardian CLI:**

   ```bash
   pipx install ggshield
   # Or: brew install ggshield
   ```

2. **Authenticate (optional but recommended):**

   ```bash
   ggshield auth login
   # Or set GITGUARDIAN_API_KEY environment variable
   ```

3. **The pre-commit hook will automatically scan staged files** for secrets. If not authenticated, it will show a warning but allow the commit (pre-push hook will still scan).

### Best Practices

- Never commit `.env.local` files
- Use environment variables for secrets
- Run security scans before pushing
- Review security alerts regularly
- Set up GitGuardian authentication for full protection

See [docs/SECURITY.md](docs/SECURITY.md) for complete security guide.

## 📖 Additional Resources

- **[Local Development Guide](docs/flows/local-development.md)**
- **[Environment Setup](docs/flows/environment-setup.md)**
- **[CI/CD Pipeline](docs/flows/ci-cd-pipeline.md)**
- **[Project Structure](docs/structure.md)**
- **[Security Guide](docs/SECURITY.md)**
- **[Testing Guide](docs/TESTING_SUMMARY.md)**
- **[Database Abstraction Layer](docs/DATABASE_ABSTRACTION_MIGRATION_COMPLETED.md)**
- **[Code Review Report](docs/DATABASE_ABSTRACTION_CODE_REVIEW.md)**

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Commit and push
5. Create a pull request

## 📝 License

[Add your license here]

## 🆘 Support

For issues and questions:

- Check [documentation](docs/)
- Review [troubleshooting guide](docs/flows/local-development.md#troubleshooting)
- Open an issue on GitHub

# test change
