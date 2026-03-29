// Setup DOM matchers for Vitest in Admin App
import "@testing-library/jest-dom/vitest";
import { beforeAll, afterAll, vi } from "vitest";

// Mock Supabase environment variables for tests
process.env.NEXT_PUBLIC_SUPABASE_URL = "http://localhost:54321";
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "mock-anon-key";

// Simple fetch mock if needed by some components
if (!globalThis.fetch) {
  globalThis.fetch = vi.fn() as any;
}

beforeAll(async () => {
  // Admin-specific global setup logic
  // console.log("Admin Test Environment Setup");
});

afterAll(async () => {
  // Admin-specific global cleanup logic
});
