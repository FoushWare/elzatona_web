// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// Set default test environment variables if not already set
// This prevents errors when environment variables are missing
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  process.env.NEXT_PUBLIC_SUPABASE_URL =
    process.env.TEST_SUPABASE_URL || "https://test-project.supabase.co";
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY =
    process.env.TEST_SUPABASE_ANON_KEY || "test-anon-key";
}

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  process.env.SUPABASE_SERVICE_ROLE_KEY =
    process.env.TEST_SUPABASE_SERVICE_ROLE_KEY || "test-service-role-key";
}

// Replace placeholder values with defaults
if (
  process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("your-project") ||
  process.env.NEXT_PUBLIC_SUPABASE_URL === "https://placeholder.supabase.co"
) {
  process.env.NEXT_PUBLIC_SUPABASE_URL = "https://test-project.supabase.co";
}

if (
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.includes("your-anon-key") ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === "placeholder-anon-key"
) {
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "test-anon-key";
}

if (
  process.env.SUPABASE_SERVICE_ROLE_KEY?.includes("your-service-role-key") ||
  process.env.SUPABASE_SERVICE_ROLE_KEY === "placeholder-service-role-key"
) {
  process.env.SUPABASE_SERVICE_ROLE_KEY = "test-service-role-key";
}
