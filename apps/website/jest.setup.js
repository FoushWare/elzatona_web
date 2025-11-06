import '@testing-library/jest-dom';

// Polyfill for Web APIs needed by Next.js in Node.js test environment
// Next.js requires these globals to be available
if (typeof global.Request === 'undefined') {
  // Use Node.js 18+ built-in fetch API if available
  if (typeof fetch !== 'undefined' && fetch.Request) {
    global.Request = fetch.Request;
    global.Response = fetch.Response;
    global.Headers = fetch.Headers;
  } else {
    // Fallback: Create minimal polyfills
    global.Headers = class Headers {
      constructor(init = {}) {
        this._headers = {};
        if (init) {
          Object.entries(init).forEach(([key, value]) => {
            this._headers[key.toLowerCase()] = value;
          });
        }
      }
      get(name) {
        return this._headers[name.toLowerCase()];
      }
      set(name, value) {
        this._headers[name.toLowerCase()] = value;
      }
      has(name) {
        return name.toLowerCase() in this._headers;
      }
      entries() {
        return Object.entries(this._headers)[Symbol.iterator]();
      }
      *[Symbol.iterator]() {
        for (const [key, value] of Object.entries(this._headers)) {
          yield [key, value];
        }
      }
    };

    global.Request = class Request {
      constructor(input, init = {}) {
        this._url = typeof input === 'string' ? input : input?.url || '';
        this._method = init.method || 'GET';
        this._headers = new global.Headers(init.headers);
        this._body = init.body;
      }
      get url() {
        return this._url;
      }
      get method() {
        return this._method;
      }
      get headers() {
        return this._headers;
      }
      async json() {
        return JSON.parse(this._body || '{}');
      }
    };

    global.Response = class Response {
      constructor(body, init = {}) {
        this._body = body;
        this._status = init.status || 200;
        this._statusText = init.statusText || 'OK';
        this._headers = new global.Headers(init.headers);
        this._ok = this._status >= 200 && this._status < 300;
      }
      get status() {
        return this._status;
      }
      get statusText() {
        return this._statusText;
      }
      get headers() {
        return this._headers;
      }
      get ok() {
        return this._ok;
      }
      async json() {
        if (typeof this._body === 'string') {
          try {
            return JSON.parse(this._body);
          } catch {
            return {};
          }
        }
        // If body is already an object, return it
        if (this._body && typeof this._body === 'object') {
          return this._body;
        }
        return {};
      }
      async text() {
        if (typeof this._body === 'string') {
          return this._body;
        }
        return JSON.stringify(this._body || {});
      }
      static json(body, init = {}) {
        const bodyString = JSON.stringify(body);
        const headers = new global.Headers({
          'Content-Type': 'application/json',
          ...init.headers,
        });
        const response = new global.Response(bodyString, {
          ...init,
          headers,
        });
        // Ensure _body is set for NextResponse compatibility
        response._body = bodyString;
        return response;
      }
    };
  }
}
