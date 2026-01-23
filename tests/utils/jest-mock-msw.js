// Minimal MSW-like behavior implemented without msw dependency.
// This file monkeypatches global.fetch to intercept specific API routes used by tests.
const originalFetch = global.fetch || (async (input, init) => new global.Response(null, { status: 501 }));

beforeAll(() => {
  global.__jest_mock_msw_original_fetch = originalFetch;
  // Use jest.fn so tests can mock global.fetch
  global.fetch = jest.fn(async (input, init = {}) => {
    const url = typeof input === 'string' ? input : input?.url || '';
    try {
      const pathname = new URL(url, 'http://localhost').pathname;
      const method = (init && init.method) || (input && input.method) || 'GET';

      // Intercept login
      if (pathname.includes('/api/auth/login') && method.toUpperCase() === 'POST') {
        let body = {};
        try {
          if (init && init.body) {
            body = typeof init.body === 'string' ? JSON.parse(init.body) : init.body;
          }
        } catch (_e) {
          body = {};
        }
        const email = (body && body.email) || 'test@example.com';
        return { status: 200, ok: true, json: async () => ({ user: { id: 'test-user', email }, token: 'fake-token' }) };
      }

      // Intercept /api/user
      if (pathname.includes('/api/user') && method.toUpperCase() === 'GET') {
        return { status: 200, ok: true, json: async () => ({ id: 'test-user', email: 'test@example.com', name: 'Test User' }) };
      }

      // Not handled: fallback to original fetch
      return originalFetch(input, init);
    } catch (err) {
      return originalFetch(input, init);
    }
  });
});

afterEach(() => {
  // No-op for now — tests can reset handlers by restoring fetch if needed
});

afterAll(() => {
  if (global.__jest_mock_msw_original_fetch) {
    global.fetch = global.__jest_mock_msw_original_fetch;
    delete global.__jest_mock_msw_original_fetch;
  }
});

module.exports = {};
