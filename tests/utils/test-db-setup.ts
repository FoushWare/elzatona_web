// Setup DOM matchers for Vitest
import "@testing-library/jest-dom";
import { beforeAll, afterAll } from "vitest";

// Start MSW server for tests
import "./setup-msw";

beforeAll(async () => {
  // Global setup logic
});

afterAll(async () => {
  // Global cleanup logic
});
