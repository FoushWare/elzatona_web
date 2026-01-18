/**
 * Jest setup for database library tests
 */

// Mock Supabase client globally
jest.mock("@supabase/supabase-js", () => ({
  createClient: jest.fn(() => ({
    from: jest.fn(),
    auth: {
      signIn: jest.fn(),
      signOut: jest.fn(),
      user: jest.fn(),
    },
  })),
}));

// Set test environment variables
process.env.NEXT_PUBLIC_SUPABASE_URL = "https://test.supabase.co";
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "test-anon-key";
process.env.SUPABASE_SERVICE_ROLE_KEY = "test-service-role-key";

// Extend Jest matchers if needed
expect.extend({
  toBeValidDate(received) {
    const pass = received instanceof Date && !isNaN(received.getTime());
    return {
      pass,
      message: () =>
        pass
          ? `expected ${received} not to be a valid Date`
          : `expected ${received} to be a valid Date`,
    };
  },
});
