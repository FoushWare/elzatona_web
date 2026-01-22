// Setup DOM matchers for Vitest
import "@testing-library/jest-dom";
import { beforeAll, afterAll } from "vitest";

// Start MSW server for tests
import "./setup-msw";

beforeAll(async () => {
  // TODO: Initialize test DB connection, run migrations, seed data
});

afterAll(async () => {
  // TODO: Cleanup test DB, close connections
});
