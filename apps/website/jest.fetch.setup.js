// Ensure `fetch` is available before any modules load.
// This file is executed by Jest via `setupFiles` (runs before the test framework is installed
// and before modules are required) so it is safe to define globals the app expects.
try {
  if (typeof global.fetch === "undefined") {
    // Prefer node-fetch if available
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const nodeFetch = require("node-fetch");
    if (nodeFetch) {
      // node-fetch export is a function; wrap to accept relative URLs used in tests
      const rawFetch = nodeFetch;
      global.fetch = (input, init) => {
        let url = typeof input === "string" ? input : input?.url || "";
        // If URL is relative, prefix with a localhost origin so node-fetch accepts it
        if (url.startsWith("/")) url = `http://localhost${url}`;
        return rawFetch(url, init);
      };
      // node-fetch v2 exposes Headers/Request/Response on export
      if (!global.Headers && nodeFetch.Headers) global.Headers = nodeFetch.Headers;
      if (!global.Request && nodeFetch.Request) global.Request = nodeFetch.Request;
      if (!global.Response && nodeFetch.Response) global.Response = nodeFetch.Response;
    }
  }
} catch (e) {
  // No-op; tests will pick up the fetch polyfill in jest.setup.js as fallback
}
