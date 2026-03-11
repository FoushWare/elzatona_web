// Setup DOM matchers for Vitest
import "@testing-library/jest-dom";
import { beforeAll, afterAll } from "vitest";

// Use MSW server for tests
import "./setup-msw";

// Patch fetch and Request for node.js environment since MSW v1 and undici have issues with relative URLs
const nodeFetch = require("node-fetch");
const { Request: NodeRequest } = nodeFetch;

const BASE_URL = "http://localhost:3000";

const originalFetch = globalThis.fetch;
const OriginalRequest = globalThis.Request;

// Patch Request
globalThis.Request = class extends OriginalRequest {
  constructor(input: any, init?: any) {
    if (typeof input === "string" && input.startsWith("/")) {
      input = `${BASE_URL}${input}`;
    }
    super(input, init);
  }
} as any;

// Patch fetch
globalThis.fetch = async (url: any, options: any) => {
  if (typeof url === "string" && url.startsWith("/")) {
    url = `${BASE_URL}${url}`;
  }
  // Use node-fetch for better MSW compatibility in some node versions
  return nodeFetch(url, options);
};

beforeAll(async () => {
  // Global setup logic
});

afterAll(async () => {
  // Global cleanup logic
});
