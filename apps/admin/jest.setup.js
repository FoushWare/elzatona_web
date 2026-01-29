// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// Stub TransformStream for Playwright tests running in Node environment
if (typeof TransformStream === "undefined") {
  function TransformStream() {
    this.readable = { pipeTo: () => Promise.resolve() };
    this.writable = {
      getWriter: () => ({
        write: () => Promise.resolve(),
        close: () => Promise.resolve(),
      }),
    };
  }
  globalThis.TransformStream = TransformStream;
}
