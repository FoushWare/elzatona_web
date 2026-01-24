// Ensure `fetch` is available before any modules load.
// This file is executed by Jest via `setupFiles` (runs before the test framework is installed
// and before modules are required) so it is safe to define globals the app expects.
// Provide a minimal `vi` mock to allow tests that call `vi.mock()` at module scope
// to register their mocks before modules are required. This uses Node's require
// cache to register the provided factory output so subsequent requires return
// the mocked module.
try {
  if (typeof global.vi === 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Module = require('module');
    global.vi = {
      _registered: [],
      mock(moduleName, factory) {
        try {
          // Resolve filename if possible and insert into require.cache
          let resolved = null;
          try {
            resolved = Module._resolveFilename(moduleName, module);
          } catch (e) {
            // ignore resolution errors
          }

          const exports = typeof factory === 'function' ? factory() : factory;

          if (resolved) {
            const m = new Module.Module(resolved, module.parent);
            m.filename = resolved;
            m.exports = exports;
            require.cache[resolved] = m;
          } else {
            this._registered.push({ moduleName, exports });
          }
        } catch (e) {
          // swallow - this is best-effort
        }
      },
      fn() {
        return function() {};
      },
      clearAllMocks() {},
    };
  }
} catch (e) {
  // ignore if require isn't available
}
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

// Monkey-patch Node's module loader to redirect internal Next.js server imports
// to our lightweight mock. This runs early (setupFiles) so it can catch requires
// that happen during module initialization in tests.
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const Module = require('module');
  const path = require('path');

  // Pre-populate require.cache for common Next import specifiers so that
  // `require('next/server')` returns our lightweight mock before any code
  // attempts to import Next internals. This is a best-effort step to avoid
  // Next's own classes from being constructed in the test runtime.
  try {
    const trySpecs = ['next/server', 'next'];
    for (const spec of trySpecs) {
      try {
        const resolved = Module._resolveFilename(spec, module);
        if (resolved && !require.cache[resolved]) {
          const m = new Module.Module(resolved, module.parent);
          m.filename = resolved;
          m.exports = require('./test-utils/mocks/next-server.js');
          require.cache[resolved] = m;
        }
      } catch (_e) {
        // ignore resolution failures
      }
    }
  } catch (_e) {
    // ignore
  }
  const originalLoad = Module._load;
  const mockPath = require.resolve('./test-utils/mocks/next-server.js');

  Module._load = function(request, parent, isMain) {
    try {
      // If request is a module name like 'next' or 'next/server'
      if (typeof request === 'string' && (request === 'next' || request.startsWith('next/') || request === 'next/server' || request.startsWith('next/server') )) {
        return originalLoad.call(this, mockPath, parent, isMain);
      }

      // Attempt to resolve the filename; if it lives under node_modules/next, redirect it.
      try {
        const resolved = Module._resolveFilename(request, parent);
        if (typeof resolved === 'string' && resolved.includes(`${path.sep}node_modules${path.sep}next${path.sep}`)) {
          return originalLoad.call(this, mockPath, parent, isMain);
        }
      } catch (_err) {
        // resolution failed — ignore
      }
    } catch (e) {
      // ignore and fall through to original loader
    }
    return originalLoad.call(this, request, parent, isMain);
  };
} catch (e) {
  // If the module system isn't available or patching fails, continue without monkey-patch
}
