# Local Development Flow

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (or Bun)
- Supabase account and project
- Git

### Initial Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Elzatona-web
   ```

2. **Install dependencies**

   ```bash
   bun install
   # or
   npm install
   ```

3. **Set up environment variables**

   ```bash
   # Copy example files
   cp .env.example .env.local
   cp .env.test.local.example .env.test.local
   cp .env.dev.local.example .env.dev.local

   # Fill in your Supabase credentials
   # See docs/flows/environment-setup.md for details
   ```

4. **Start development server**

   ```bash
   # Production environment (default)
   bun run dev

   # Test environment
   bun run dev:test

   # Development environment
   bun run dev:dev
   ```

## 📋 Development Commands

### Website Development

```bash
# Start website in production mode
bun run dev

# Start website in test mode
bun run dev:test

# Start website in development mode
bun run dev:dev

# Start with reduced memory (for 8GB RAM systems)
bun run dev:light

# Start admin panel
bun run dev:admin
```

### Building

```bash
# Build website
bun run build

# Build admin
bun run build:admin

# Build all apps
bun run build:all

# Check build without errors
bun run build:check
```

### Testing

```bash
# Run all tests
bun run test

# Run unit tests
bun run test:unit

# Run integration tests
bun run test:integration

# Run E2E tests
bun run test:e2e

# Run tests for specific library
bun run test:ui
bun run test:auth
bun run test:database
bun run test:utils
```

### Code Quality

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

## 🔄 Development Workflow

### 1. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 2. Make Changes

- Write code following project structure
- Add tests for new features
- Update documentation if needed

### 3. Test Your Changes

```bash
# Run tests
bun run test

# Check types
bun run type-check

# Lint code
bun run lint
```

### 4. Commit Changes

```bash
git add .
git commit -m "feat: your feature description"
```

### 5. Push and Create PR

```bash
git push origin feature/your-feature-name
# Create PR on GitHub
```

## 🏗️ Project Structure

See [docs/structure.md](../structure.md) for detailed project structure.

## 📚 Additional Resources

- [Environment Setup](environment-setup.md)
- [Testing Guide](../testing.md)
- [CI/CD Pipeline](ci-cd-pipeline.md)
- [Deployment Flow](deployment.md)
