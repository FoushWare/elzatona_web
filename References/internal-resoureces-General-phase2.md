General Frontend Q&A - Phase 2

Q1: What is the difference between cookies, localStorage, and sessionStorage in the browser?
A:

Cookies: ~4KB limit, sent with every HTTP request (good for authentication). Can have expiry, work server + client side.

localStorage: Larger limit, persists indefinitely, great for persisting user settings (e.g., dark theme).

sessionStorage: Cleared when tab/browser is closed. Useful for temporary state like form inputs.

Q2: If you are setting up a new frontend application, what optimizations would you put in place to make it performant?
A:

Polyfills → Ensure modern JS features work in older browsers.

Bundling & Compression → Use gzip/br compression to shrink payload size.

Minification/Uglification → Remove whitespace, shorten variable names, reduce bundle size.

Source Maps → Keep debugging possible in production.

Code Splitting → Only load JavaScript needed for the initial page.

Other optimizations → CDN usage, image/font optimization.

Tree shaking: Eliminates unused code, works best with ES6 imports.

Q3: You are building a frontend app with very large images (e.g., eCommerce). How would you optimize them?
A:

Serve images at the smallest needed dimensions.

Use compression and remove metadata.

Prefer WebP over PNG/JPEG for better performance.

Host via a CDN.

Use lazy loading or load on scroll.

Always set width/height to avoid layout shifts.

Use srcset to deliver device-appropriate image sizes.

Q4: How would you manage code quality in a large-scale frontend application?
A:

Linting & Formatting → ESLint, Prettier, TS Lint.

Testing → Unit tests + E2E tests.

Dependency Scanning → Monitor vulnerabilities in node_modules.

Accessibility (a11y) checks with linters.

Performance monitoring → Lighthouse, Sentry for Core Web Vitals.

Q5: What is an XSS (Cross-Site Scripting) attack and how do you prevent it?
A:

Attack: Attacker injects malicious JavaScript into the app (e.g., via comments). When other users load it, it executes on their browser.

Prevention:

Sanitize inputs → Prevent script injection into the DB.

Avoid rendering raw HTML/JS from user input (e.g., dangerouslySetInnerHTML in React).

Q6: Can you explain how a CDN works? What are pros and cons?
A:

CDN (Content Delivery Network) = network of distributed servers caching your static assets (JS, CSS, images).

Users fetch assets from the closest geographical edge location → lower latency, faster performance.

Pros: Faster load times, less server load, good caching.

Cons: Added cost/complexity, reliance on 3rd-party infra.

Popular providers: AWS CloudFront, Cloudflare, Azure CDN.

Q7: What are micro-frontends and when would you use them?
A:

Micro-frontends = splitting a monolithic frontend into smaller, independent applications combined in a "shell".

Each sub-app can be owned/deployed by separate teams.

Use cases: Large teams (30+ engineers), scaling deployments, avoiding blocking between teams.

Trade-off: Adds significant complexity (shared state, tooling, infra). Only worth it at scale.
