// Setup DOM matchers for Vitest
import "@testing-library/jest-dom";
import { beforeAll, afterAll } from "vitest";

// Use MSW server for tests
import "./setup-msw";

// Patch fetch for node.js environment since MSW v1 has issues intercepting native fetch in Node 18+
const nodeFetch = require("node-fetch");

const originalFetch = globalThis.fetch;

globalThis.fetch = async (url: any, options: any) => {
  // If we're calling our own API routes safely
  if (typeof url === "string" && url.startsWith("http")) {
    return nodeFetch(url, options);
  }

  const finalUrl =
    typeof url === "string" && url.startsWith("/")
      ? `http://localhost:3000${url}`
      : url;

  return nodeFetch(finalUrl, options);
};

beforeAll(async () => {
  // Global setup logic
});

afterAll(async () => {
  // Global cleanup logic
});
