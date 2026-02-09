This folder contains test utilities used by unit/integration (Vitest/Jest) and Playwright E2E tests.

Files:

- `msw-handlers.ts`: Example MSW handlers for common API routes (auth, user).
- `setup-msw.ts`: Vitest-friendly MSW setup that starts/stops the mock server automatically.
- `playwright-auth.ts`: Small helper script to generate Playwright `storageState` files by performing a real login flow.

Quick usage:

1. Run MSW in Vitest tests (ensure `vitest` is used):

```bash
# Install deps if not installed
npm install

# Run vitest (it will pick up the MSW setup file if imported in test setup)
npm run test:unit:vitest
```

2. Generate storage state for Playwright E2E (local):

```bash
# Example: generate website auth state
node -e "require('./tests/utils/playwright-auth').generateStorageState({\
  loginUrl: 'http://localhost:3000/login',\
  email: 'test@example.com',\
  password: 'changeme',\
  outputPath: 'tests/.auth/website.json'\
})"
```

Note: Adjust selectors in `playwright-auth.ts` to match your login form fields.
