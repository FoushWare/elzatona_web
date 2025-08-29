these questions will be for phase 1

how many questions here
Senior Frontend Interview – Q&A
Webpack & Tooling

Q: Can you tell me about your experience using Webpack? What is it used for?
A: Webpack is a module bundler. It takes multiple JavaScript files and bundles them into a single file, which is necessary because browsers used to require a <script> tag for each file. Webpack parses files based on imports/exports, bundles them together, and applies optimizations. I’ve used Webpack extensively for setting up projects and configuring builds.

Q: What is tree shaking in Webpack?
A: Tree shaking eliminates unused code from the final bundle. It works with ES6 static imports but not with CommonJS require, since those are evaluated dynamically at runtime.

Q: Have you used tree shaking in production?
A: Yes. Since Webpack v5, tree shaking is enabled by default. However, it only works with ES6 imports. If dependencies or code use require, Webpack can’t tree shake them.

Q: What is a dependency graph in Webpack?
A: It’s the structure Webpack builds starting from an entry point, following all imports, and mapping relationships between modules. It’s used to determine what code should be bundled, optimized, or dropped.

CSS-in-JS

Q: What is CSS-in-JS? Can you give examples of its use cases?
A: CSS-in-JS allows writing CSS directly in JavaScript files. It makes it easy to apply dynamic styles that react to state changes, like toggling colors when clicking a button. Tools like styled-components handle generating classes and injecting them at runtime.

Q: What are disadvantages of CSS-in-JS?
A:

CSS is bundled inside JavaScript, making it harder to cache separately.

Larger JS bundles and potential performance issues.

Debugging is harder since generated classes are hashed.

Risk of cumulative layout shifts (CLS) since CSS loads after JS execution.

Creates deeper component trees in React, which can slow re-renders.

Q: How does CSS-in-JS affect performance?
A:

Reduced caching efficiency.

CLS issues since CSS is applied later.

Extra React components for styled elements deepen the component tree, affecting render performance.

A hybrid approach (static CSS for layout + CSS-in-JS for dynamic parts) is often best.

React – Components & Hooks

Q: What is a Pure Component in React?
A: A Pure Component skips re-renders by shallow comparing props. This was useful with class components, but with hooks, React already optimizes re-renders.

Q: What is an Error Boundary in React?
A: An Error Boundary catches errors in child components and prevents the entire app from breaking. It shows a fallback UI instead of a blank/broken screen.

Q: What is the useEffect hook used for?
A: It’s used to trigger side effects (API calls, logging, localStorage updates) after rendering. Overusing it can cause unnecessary re-renders and performance issues.

Q: Why can’t we use an async function directly in useEffect?
A: Because useEffect expects a cleanup function, but async functions return a promise. React doesn’t know how to handle that promise. Instead, you should define an inner async function and call it inside useEffect.

React – State Management

Q: How would you handle state if you had: backend data, authentication, and global user settings?
A:

Backend data → keep in local component state or lift state slightly if shared.

Authentication → React Context (global availability).

Global settings with complex transitions → use a reducer (e.g., useReducer or Redux).

Q: What’s the difference between essential and derived state?
A: Essential state is the minimal, independent state (e.g., cart items). Derived state can be computed from essential state (e.g., total price).

Q: What are disadvantages of putting state inside React Context?
A: State changes cause all subscribed components to re-render. Solution: split into multiple contexts and keep state as close as possible to where it’s used.

Testing

Q: How would you approach testing a React app with no existing tests?
A:

Add end-to-end (E2E) tests to cover features.

Write unit tests for reusable components.

Use integration tests for critical flows like login or payments.

Avoid meaningless unit tests just for coverage.

Q: How do you balance E2E, unit, and integration tests?
A: E2E tests catch feature issues but don’t pinpoint root causes. Unit/integration tests help localize bugs faster. A balanced pyramid ensures both feature coverage and debuggability.

Q: What is code coverage, and what % is good for frontend?
A: Code coverage measures how much code executes when tests run. For frontend, 60–70% is a healthy balance. 80–90%+ is often overkill. Backend can aim higher (80–95%).

Q: Have you experienced high code coverage requirements?
A: Yes, in finance projects they enforced ~95%. This led to useless tests written only for coverage, showing that strict numbers can hurt productivity.

Web Performance

Q: What is FCP (First Contentful Paint)?
A: It’s the time from navigation until the first content (text/image) is rendered on screen.

Q: What causes poor FCP scores?
A:

Large JS bundles delaying rendering.

No CDN, poor caching, or no compression.

Large CSS blocking rendering.

Q: How would you fix a poor FCP score?
A:

Ensure CDN, caching, and compression.

Analyze bundles to remove unused code.

Apply code splitting (React.lazy, dynamic imports).

Defer or async load non-critical JS.

Q: When would you consider Server-Side Rendering (SSR)?
A:

If app speed or SEO is critical (e.g., e-commerce, news sites).

SSR instantly delivers HTML, improving FCP.

Not worth it for SaaS apps where SEO isn’t critical, since SSR adds complexity.
