INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '036a2cbb-bfa0-4213-a781-273c49f86d62',
          'How can we find the version of React at runtime in the browser?',
          'You can use `React.version` to get the version.
```jsx harmony
const REACT_VERSION = React.version;
ReactDOM.render(
  <div>{`React version: ${REACT_VERSION}`}</div>,
  document.getElementById("app")
);
```',
          'multiple-choice',
          'beginner',
          2,
          '[{"id":"a","text":"`React.version`","isCorrect":true},{"id":"b","text":"`ReactDOM.version`","isCorrect":false},{"id":"c","text":"`process.env.REACT_VERSION`","isCorrect":false},{"id":"d","text":"`package.json` version","isCorrect":false}]',
          NULL,
          'Access `React.version` to get the current React version at runtime.',
          NULL,
          ARRAY[]::text[],
          '["react","version","debugging","runtime"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-069","original_type":"multiple-choice","topic":"Debugging","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '0fb9cb22-f623-4699-8869-45355a1be117',
          'How to add Google Analytics for React Router?',
          'Add a listener on the `history` object to record each page view:
```javascript
history.listen(function (location) {
  window.ga("set", "page", location.pathname + location.search);
  window.ga("send", "pageview", location.pathname + location.search);
});
```',
          'multiple-choice',
          'intermediate',
          4,
          '[{"id":"a","text":"Add GA script to every component","isCorrect":false},{"id":"b","text":"Use `history.listen()` to track location changes and send page views","isCorrect":true},{"id":"c","text":"GA is automatically integrated with React Router","isCorrect":false},{"id":"d","text":"Use `useEffect` in every route component","isCorrect":false}]',
          NULL,
          'Use `history.listen()` to track route changes and send page views to Google Analytics.',
          NULL,
          ARRAY[]::text[],
          '["react","react-router","analytics","ga","history"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-070","original_type":"multiple-choice","topic":"React Router","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '97a6d68f-6709-4bdf-9015-b8d7dc6a0959',
          'How do you apply vendor prefixes to inline styles in React?',
          'React _does not_ apply _vendor prefixes_ automatically. You need to add vendor prefixes manually.
```jsx harmony
<div
  style={{
    transform: "rotate(90deg)",
    WebkitTransform: "rotate(90deg)", // note the capital ''W'' here
    msTransform: "rotate(90deg)", // ''ms'' is the only lowercase vendor prefix
  }}
/>
```',
          'multiple-choice',
          'intermediate',
          3,
          '[{"id":"a","text":"React auto-prefixes all styles","isCorrect":false},{"id":"b","text":"Manually add prefixes like `WebkitTransform` and `msTransform`","isCorrect":true},{"id":"c","text":"Use a CSS-in-JS library only","isCorrect":false},{"id":"d","text":"Prefixes are not needed in modern browsers","isCorrect":false}]',
          NULL,
          'React does not auto-prefix styles. Manually add prefixes like `WebkitTransform` (note capital ''W'') and `msTransform`.',
          NULL,
          ARRAY[]::text[],
          '["react","vendor-prefixes","inline-styles","css","compatibility"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-071","original_type":"multiple-choice","topic":"CSS & Styling","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'af34e828-26ad-4cd0-a44a-0c7106d23f3f',
          'How to import and export components using React and ES6?',
          'You should use default for exporting the components
```jsx harmony
import User from "user";
export default function MyProfile {
    return <User type="customer">//...</User>;
}
```',
          'multiple-choice',
          'beginner',
          2,
          '[{"id":"a","text":"Only named exports are allowed","isCorrect":false},{"id":"b","text":"Use `export default` for components and `import Name from ''module''`","isCorrect":true},{"id":"c","text":"Components must be exported as constants","isCorrect":false},{"id":"d","text":"Use `require()` and `module.exports`","isCorrect":false}]',
          NULL,
          'Use `export default` for components and `import Name from ''module''` to import them.',
          NULL,
          ARRAY[]::text[],
          '["react","es6","import","export","modules"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-072","original_type":"multiple-choice","topic":"Components","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '252e0b60-f566-4266-bde8-6bed7499b3eb',
          'What are the exceptions on React component naming?',
          'The component names should start with an uppercase letter but there are few exceptions to this convention. The lowercase tag names with a dot (property accessors) are still considered as valid component names.

For example, the below tag can be compiled to a valid component,
```jsx harmony
     render() {
          return (
            <obj.component/> // `React.createElement(obj.component)`
          )
    }
```',
          'multiple-choice',
          'intermediate',
          3,
          '[{"id":"a","text":"All component names must be uppercase","isCorrect":false},{"id":"b","text":"Tags with dots like `<obj.component />` are valid because they are property accessors","isCorrect":true},{"id":"c","text":"Lowercase names are allowed for all components","isCorrect":false},{"id":"d","text":"Naming exceptions are not supported","isCorrect":false}]',
          NULL,
          'JSX tags with dots (e.g., `<obj.component />`) are valid because they are treated as property access, not HTML tags.',
          NULL,
          ARRAY[]::text[],
          '["react","jsx","component-naming","exceptions"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-073","original_type":"multiple-choice","topic":"JSX","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '1f92119d-42e0-4df1-aa49-3170f2ea87ed',
          'Is it possible to use async/await in plain React?',
          'Yes, you can use `async/await` in plain React, as long as your JavaScript environment supports ES2017+. Nowadays most modern browsers and build tools support ES2017+ version. If you''re using **Create React App**, **Next.js**, **Remix**, or any modern React setup, `async/await` is supported out of the box through **Babel**.

### Example Usage
```jsx
import { useEffect, useState } from ''react'';
function UserProfile() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(''/api/user'');
      const data = await response.json();
      setUser(data);
    };
    fetchUser();
  }, []);
  return user ? <div>Hello, {user.name}</div> : <div>Loading...</div>;
}
```',
          'true-false',
          'intermediate',
          3,
          '[{"id":"a","text":"True","isCorrect":true},{"id":"b","text":"False","isCorrect":false}]',
          NULL,
          'Yes, `async/await` is fully supported in modern React environments via Babel transpilation.',
          NULL,
          ARRAY[]::text[],
          '["react","async-await","fetch","hooks","babel"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-074","original_type":"true-false","topic":"Hooks","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'db829092-bedd-4a3a-9746-d041815b8f68',
          'What are the common folder structures for React?',
          'There are two common practices for React project file structure.
1.  **Grouping by features or routes:**
   One common way to structure projects is locate CSS, JS, and tests together, grouped by feature or route.
   ```
   common/
   ├─ Avatar.js
   ├─ Avatar.css
   ├─ APIUtils.js
   └─ APIUtils.test.js
   feed/
   ├─ index.js
   ├─ Feed.js
   ├─ Feed.css
   ├─ FeedStory.js
   ├─ FeedStory.test.js
   └─ FeedAPI.js
   profile/
   ├─ index.js
   ├─ Profile.js
   ├─ ProfileHeader.js
   ├─ ProfileHeader.css
   └─ ProfileAPI.js
   ```
2.  **Grouping by file type:**
   Another popular way to structure projects is to group similar files together.
   ```
   api/
   ├─ APIUtils.js
   ├─ APIUtils.test.js
   ├─ ProfileAPI.js
   └─ UserAPI.js
   components/
   ├─ Avatar.js
   ├─ Avatar.css
   ├─ Feed.js
   ├─ Feed.css
   ├─ FeedStory.js
   ├─ FeedStory.test.js
   ├─ Profile.js
   ├─ ProfileHeader.js
   └─ ProfileHeader.css
   ```',
          'multiple-choice',
          'beginner',
          2,
          '[{"id":"a","text":"Only grouping by file type is valid","isCorrect":false},{"id":"b","text":"Group by feature/route or by file type are both common approaches","isCorrect":true},{"id":"c","text":"There is only one official React folder structure","isCorrect":false},{"id":"d","text":"Folder structure doesn''t matter in React","isCorrect":false}]',
          NULL,
          'Common structures are: (1) by feature/route (co-locate related files), or (2) by file type (group all components, all API files, etc.).',
          NULL,
          ARRAY[]::text[],
          '["react","folder-structure","organization","best-practices"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-075","original_type":"multiple-choice","topic":"Project Structure","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '24e5aef8-5f5b-421e-bcde-5b21ac653fb7',
          'What are popular packages for animation?',
          'Popular animation packages in the React ecosystem include **React Transition Group** and **React Motion**. These libraries help manage UI transitions, enter/exit animations, and physics-based motion.',
          'multiple-choice',
          'intermediate',
          3,
          '[{"id":"a","text":"`react-spring`, `framer-motion`, `React Transition Group`, `React Motion`","isCorrect":true},{"id":"b","text":"`animate.css` only","isCorrect":false},{"id":"c","text":"`jQuery.animate()`","isCorrect":false},{"id":"d","text":"CSS animations are the only way","isCorrect":false}]',
          NULL,
          'React Transition Group and React Motion are widely used for declarative animations in React apps, handling mount/unmount transitions and spring-based physics.',
          NULL,
          ARRAY[]::text[],
          '["react","animation","react-transition-group","react-motion","ui"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-076","original_type":"multiple-choice","topic":"Animation","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '27804f54-5a4d-459c-b741-8f9954315a6a',
          'What is the benefit of style modules?',
          'Style modules help avoid hardcoding style values in components. Shared values like colors, spacing, and typography should be extracted into dedicated modules for reuse and consistency.

Example:
```javascript
export const colors = { white, black, blue };
export const space = [0, 8, 16, 32, 64];
```

Then import:
```javascript
import { space, colors } from "./styles";
```',
          'multiple-choice',
          'beginner',
          2,
          '[{"id":"a","text":"They allow dynamic theme switching only","isCorrect":false},{"id":"b","text":"They extract reusable style values (colors, spacing) into shared modules for consistency","isCorrect":true},{"id":"c","text":"They replace CSS entirely","isCorrect":false},{"id":"d","text":"They are only for server-side rendering","isCorrect":false}]',
          NULL,
          'Style modules promote consistency, reduce duplication, and make global design tokens (like spacing or colors) easy to manage and update.',
          NULL,
          ARRAY[]::text[],
          '["react","styling","design-system","constants","css"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-077","original_type":"multiple-choice","topic":"CSS & Styling","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '177d8243-56ea-4161-90f2-f50af77f67b1',
          'What are popular React-specific linters?',
          'ESLint is the standard JavaScript linter. For React, popular plugins include:
- `eslint-plugin-react`: Enforces React best practices (e.g., key usage, prop types)
- `eslint-plugin-jsx-a11y`: Checks accessibility issues in JSX (e.g., alt text, tabIndex)',
          'multiple-choice',
          'intermediate',
          3,
          '[{"id":"a","text":"`eslint-plugin-react` and `eslint-plugin-jsx-a11y`","isCorrect":true},{"id":"b","text":"`prettier` only","isCorrect":false},{"id":"c","text":"`stylelint` for React","isCorrect":false},{"id":"d","text":"No linters are needed for React","isCorrect":false}]',
          NULL,
          '`eslint-plugin-react` and `eslint-plugin-jsx-a11y` are essential for catching React-specific bugs and accessibility issues during development.',
          NULL,
          ARRAY[]::text[],
          '["react","eslint","linting","accessibility","best-practices"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-078","original_type":"multiple-choice","topic":"Build Tools & Workflow","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '52c8a1a4-9d4b-4050-b259-b6f76da2ac67',
          'What is React Router?',
          'React Router is a powerful routing library built on top of React that enables navigation and URL synchronization in single-page applications (SPAs). It allows you to define routes that render specific components based on the current URL.',
          'multiple-choice',
          'beginner',
          2,
          '[{"id":"a","text":"A state management library like Redux","isCorrect":false},{"id":"b","text":"A routing library for SPAs that syncs URL with UI","isCorrect":true},{"id":"c","text":"A CSS-in-JS solution","isCorrect":false},{"id":"d","text":"A testing utility","isCorrect":false}]',
          NULL,
          'React Router maps URLs to React components, enabling SPA navigation without full page reloads while keeping the UI in sync with the browser address bar.',
          NULL,
          ARRAY[]::text[],
          '["react","react-router","routing","spa","navigation"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-079","original_type":"multiple-choice","topic":"React Router","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '0845b8a5-725f-408e-ac99-f4bc50879ab7',
          'How is React Router different from the history library?',
          'React Router is a wrapper around the `history` library. The `history` library handles interaction with the browser’s `window.history` (via HTML5 history API, hash, or memory). React Router builds on this to provide declarative routing components like `<Route>` and `<Link>`.',
          'multiple-choice',
          'intermediate',
          3,
          '[{"id":"a","text":"React Router is a standalone browser API","isCorrect":false},{"id":"b","text":"React Router wraps the `history` library to provide declarative React components for routing","isCorrect":true},{"id":"c","text":"The `history` library is only for server-side rendering","isCorrect":false},{"id":"d","text":"They are the same thing","isCorrect":false}]',
          NULL,
          'React Router uses the `history` library under the hood but provides a React-friendly, component-based API for routing.',
          NULL,
          ARRAY[]::text[],
          '["react","react-router","history","routing","browser-api"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-080","original_type":"multiple-choice","topic":"React Router","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '20ebddec-2bf3-4d3d-909a-035d8ff7d7b1',
          'What are the <Router> components of React Router v6?',
          'React Router v6 provides four main `<Router>` components:
1. `<BrowserRouter>`: Uses HTML5 history API (standard web apps)
2. `<HashRouter>`: Uses URL hash for static servers
3. `<MemoryRouter>`: In-memory routing (testing, React Native)
4. `<StaticRouter>`: For server-side rendering (SSR)',
          'multiple-choice',
          'intermediate',
          4,
          '[{"id":"a","text":"`<BrowserRouter>`, `<HashRouter>`, `<MemoryRouter>`, `<StaticRouter>`","isCorrect":true},{"id":"b","text":"`<Router>`, `<Route>`, `<Link>`, `<NavLink>`","isCorrect":false},{"id":"c","text":"Only `<BrowserRouter>` exists in v6","isCorrect":false},{"id":"d","text":"`<Router>` is removed in v6","isCorrect":false}]',
          NULL,
          'Each Router component creates a different type of history instance (browser, hash, memory, static) for different environments.',
          NULL,
          ARRAY[]::text[],
          '["react","react-router","router","v6","ssr","native"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-081","original_type":"multiple-choice","topic":"React Router","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '825bb07f-4bb9-4ca0-a070-f541c1b5d39c',
          'What is the purpose of push and replace methods of history?',
          'The `history` object has two navigation methods:
- `push()`: Adds a new entry to the browser history stack
- `replace()`: Replaces the current entry in the history stack

This affects browser back/forward behavior.',
          'multiple-choice',
          'intermediate',
          3,
          '[{"id":"a","text":"`push()` replaces current URL; `replace()` adds to history","isCorrect":false},{"id":"b","text":"`push()` adds to history stack; `replace()` replaces current entry","isCorrect":true},{"id":"c","text":"Both behave identically","isCorrect":false},{"id":"d","text":"These methods are deprecated in v6","isCorrect":false}]',
          NULL,
          '`push()` adds to history (user can go back); `replace()` overwrites current history (no back to previous).',
          NULL,
          ARRAY[]::text[],
          '["react","react-router","history","navigation","browser-api"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-082","original_type":"multiple-choice","topic":"React Router","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'f121e934-615d-4e93-9b60-700e45c3c08d',
          'How do you programmatically navigate using React Router v4?',
          'In React Router v4, programmatic navigation can be done via:
1. `withRouter()` HOC (injects `history` prop)
2. `<Route>` render prop (passes `history`)
3. Context (not recommended)

Example with `withRouter`:
```jsx
const Button = withRouter(({ history }) => (
  <button onClick={() => history.push(''/new'')}>Go</button>
));
```',
          'multiple-choice',
          'intermediate',
          4,
          '[{"id":"a","text":"Use `useNavigate` hook","isCorrect":false},{"id":"b","text":"Use `withRouter` HOC or `<Route>` render prop to access `history.push()`","isCorrect":true},{"id":"c","text":"Directly modify `window.location`","isCorrect":false},{"id":"d","text":"Navigation is not possible in v4","isCorrect":false}]',
          NULL,
          'In v4, `withRouter` or render props were used to access the `history` object for programmatic navigation.',
          NULL,
          ARRAY[]::text[],
          '["react","react-router","navigation","programmatic","v4"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-083","original_type":"multiple-choice","topic":"React Router","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '35481657-b43e-41db-bad9-509f53c51dfe',
          'How do you get query parameters in React Router v4?',
          'React Router v4 removed built-in query string parsing. Recommended approaches:
- Use `query-string` library: `queryString.parse(props.location.search)`
- Use native `URLSearchParams`: `new URLSearchParams(props.location.search).get(''name'')`

Note: `URLSearchParams` requires a polyfill for IE11.',
          'multiple-choice',
          'intermediate',
          3,
          '[{"id":"a","text":"`props.query`","isCorrect":false},{"id":"b","text":"Use `query-string` library or `URLSearchParams`","isCorrect":true},{"id":"c","text":"`useParams()` hook","isCorrect":false},{"id":"d","text":"Query params are not supported","isCorrect":false}]',
          NULL,
          'React Router v4 delegates query parsing to userland libraries like `query-string` or native `URLSearchParams`.',
          NULL,
          ARRAY[]::text[],
          '["react","react-router","query-parameters","url-search-params","v4"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-084","original_type":"multiple-choice","topic":"React Router","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'c926da2a-7eec-4417-a350-d33edaa1ed2f',
          'Why do you get a "Router may have only one child element" warning?',
          'In React Router, `<Router>` expects a single child. To render multiple routes, wrap them in a `<Switch>` (v5) or use direct nesting (v6). The `<Switch>` renders only the first matching `<Route>`.

Example:
```jsx
<Router>
  <Switch>
    <Route path="/" component={Home} />
    <Route component={NotFound} />
  </Switch>
</Router>
```',
          'multiple-choice',
          'intermediate',
          3,
          '[{"id":"a","text":"You must always use `<Switch>`","isCorrect":false},{"id":"b","text":"`<Router>` requires a single child; use `<Switch>` to group routes","isCorrect":true},{"id":"c","text":"This warning is removed in v6","isCorrect":false},{"id":"d","text":"It’s caused by missing `exact` prop","isCorrect":false}]',
          NULL,
          'The `<Router>` component requires exactly one child. Use `<Switch>` (v5) or direct route nesting (v6) to group multiple routes.',
          NULL,
          ARRAY[]::text[],
          '["react","react-router","switch","routing","error"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-085","original_type":"multiple-choice","topic":"React Router","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '9dfa8d4f-1de3-48ef-9db2-6d68eed82f91',
          'How do you pass params to the history.push method in React Router v4?',
          'When using `history.push()`, you can pass an object with `pathname`, `search` (query), and `state`:
```javascript
this.props.history.push({
  pathname: ''/template'',
  search: ''?name=sudheer'',
  state: { detail: response.data }
});
```',
          'multiple-choice',
          'intermediate',
          4,
          '[{"id":"a","text":"`history.push(''/path'', { param: value })`","isCorrect":false},{"id":"b","text":"`history.push({ pathname: ''/path'', search: ''?q=1'', state: { data } })`","isCorrect":true},{"id":"c","text":"Only strings are allowed","isCorrect":false},{"id":"d","text":"Use URL fragments only","isCorrect":false}]',
          NULL,
          '`history.push()` accepts an object with `pathname`, `search` (for query params), and `state` (for transient data).',
          NULL,
          ARRAY[]::text[],
          '["react","react-router","history","navigation","state","query"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-086","original_type":"multiple-choice","topic":"React Router","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '3d94cddc-49c0-4f8a-962c-5fb3cd3667ad',
          'How do you implement a default or NotFound page?',
          'In React Router, a `<Route>` without a `path` prop always matches. Place it last to catch unmatched routes:
```jsx
<Switch>
  <Route exact path="/" component={Home} />
  <Route path="/user" component={User} />
  <Route component={NotFound} />
</Switch>
```',
          'multiple-choice',
          'intermediate',
          3,
          '[{"id":"a","text":"Use `*` path: `<Route path=\"*\" component={NotFound} />`","isCorrect":false},{"id":"b","text":"Place a `<Route>` with no `path` prop last","isCorrect":true},{"id":"c","text":"It’s automatic in v6","isCorrect":false},{"id":"d","text":"Use `useRouteMatch()`","isCorrect":false}]',
          NULL,
          'A `<Route>` with no `path` acts as a fallback and should be placed last to handle unmatched URLs.',
          NULL,
          ARRAY[]::text[],
          '["react","react-router","not-found","404","default-route"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-087","original_type":"multiple-choice","topic":"React Router","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '05aa85ee-d8b7-4261-97cb-f81b5471a29e',
          'How do you get history in React Router v4?',
          'To access the `history` object outside components in v4:
1. Create a `history.js` file with `createBrowserHistory()`
2. Use `<Router history={history}>` instead of `<BrowserRouter>`
3. Import `history` anywhere to call `history.push()`',
          'multiple-choice',
          'advanced',
          5,
          '[{"id":"a","text":"Use `useHistory()` hook","isCorrect":false},{"id":"b","text":"Create a custom `history` instance and pass it to `<Router>`","isCorrect":true},{"id":"c","text":"`window.history` is sufficient","isCorrect":false},{"id":"d","text":"History is not accessible outside components","isCorrect":false}]',
          NULL,
          'Creating a standalone `history` instance allows programmatic navigation from anywhere, not just components.',
          NULL,
          ARRAY[]::text[],
          '["react","react-router","history","custom-history","v4"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-088","original_type":"multiple-choice","topic":"React Router","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '911b2ade-9ab8-4ee1-9407-bc2303f3d97f',
          'How do you perform an automatic redirect after login?',
          'Use React Router’s `<Redirect>` component to navigate after login:
```jsx
function Login() {
  if (isLoggedIn) {
    return <Redirect to="/dashboard" />;
  }
  return <LoginForm />;
}
```
In v6, use the `useNavigate` hook instead.',
          'multiple-choice',
          'intermediate',
          3,
          '[{"id":"a","text":"`window.location.href = ''/dashboard''`","isCorrect":false},{"id":"b","text":"Render `<Redirect to=\"/dashboard\" />` when logged in","isCorrect":true},{"id":"c","text":"Use `history.replace()` only","isCorrect":false},{"id":"d","text":"Redirects are not possible in React","isCorrect":false}]',
          NULL,
          '`<Redirect>` replaces the current location with a new one, useful for post-login redirects.',
          NULL,
          ARRAY[]::text[],
          '["react","react-router","redirect","authentication","login"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-089","original_type":"multiple-choice","topic":"React Router","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '6038c7a2-e34e-437c-a82b-289531816891',
          'What is React Intl?',
          'React Intl is a library for internationalization (i18n) in React apps, part of the FormatJS project. It provides components and APIs for formatting strings, dates, numbers, and handling plurals across 150+ languages.',
          'multiple-choice',
          'intermediate',
          3,
          '[{"id":"a","text":"A state management library","isCorrect":false},{"id":"b","text":"An internationalization library for formatting and translations","isCorrect":true},{"id":"c","text":"A routing solution","isCorrect":false},{"id":"d","text":"A testing framework","isCorrect":false}]',
          NULL,
          'React Intl enables robust internationalization with off-the-shelf components for formatting and translations.',
          NULL,
          ARRAY[]::text[],
          '["react","intl","i18n","formatjs","localization"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-090","original_type":"multiple-choice","topic":"React Intl","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'f6ec9cf7-720f-46f4-9561-35dd5d58dda5',
          'What are the main features of React Intl?',
          'React Intl features include:
1. Formatting numbers with separators
2. Displaying dates/times correctly
3. Relative time formatting (e.g., "2 hours ago")
4. Pluralization support
5. 150+ language support
6. Works in browser and Node
7. Built on Unicode standards',
          'multiple-choice',
          'intermediate',
          3,
          '[{"id":"a","text":"State management and routing","isCorrect":false},{"id":"b","text":"Number/date formatting, plurals, relative time, 150+ languages","isCorrect":true},{"id":"c","text":"Only string translation","isCorrect":false},{"id":"d","text":"CSS-in-JS theming","isCorrect":false}]',
          NULL,
          'React Intl handles all common i18n needs: number/date formatting, plurals, relative time, and multi-language support.',
          NULL,
          ARRAY[]::text[],
          '["react","intl","i18n","formatting","localization"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-091","original_type":"multiple-choice","topic":"React Intl","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '27588122-1ab1-4000-ac43-83d09b681301',
          'What are the two ways of formatting in React Intl?',
          'React Intl provides two formatting approaches:
1. **Components**: `<FormattedMessage id="msg" defaultMessage="Hello" />`
2. **API**: `formatMessage({ id: ''msg'', defaultMessage: ''Hello'' })` via `injectIntl` or `useIntl` hook',
          'multiple-choice',
          'intermediate',
          3,
          '[{"id":"a","text":"Only components are supported","isCorrect":false},{"id":"b","text":"Components (`<FormattedMessage>`) and API (`formatMessage`)","isCorrect":true},{"id":"c","text":"Only the API is supported","isCorrect":false},{"id":"d","text":"Use `Intl` global object only","isCorrect":false}]',
          NULL,
          'Use components for JSX; use the API (`formatMessage`) for placeholders, alt text, or dynamic values.',
          NULL,
          ARRAY[]::text[],
          '["react","intl","formatmessage","useintl","components","api"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-092","original_type":"multiple-choice","topic":"React Intl","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '42df7e38-3645-411b-850c-dd67bc618d19',
          'How to use FormattedMessage as a placeholder with React Intl?',
          '`<Formatted... />` components return elements, not strings, so they can’t be used for placeholders or alt text. Instead, use the `formatMessage` API from the `intl` object (via `injectIntl` or `useIntl`).

Example:
```jsx
const MyComponent = ({ intl }) => (
  <input placeholder={intl.formatMessage({ id: ''msg'' })} />
);
```',
          'multiple-choice',
          'advanced',
          4,
          '[{"id":"a","text":"Use `<FormattedMessage>` directly in placeholder","isCorrect":false},{"id":"b","text":"Use `intl.formatMessage()` for placeholders and alt text","isCorrect":true},{"id":"c","text":"Placeholders don’t support i18n","isCorrect":false},{"id":"d","text":"Use `dangerouslySetInnerHTML`","isCorrect":false}]',
          NULL,
          'For non-JSX contexts (placeholders, alt), use `intl.formatMessage()` instead of `<FormattedMessage>`.',
          NULL,
          ARRAY[]::text[],
          '["react","intl","placeholder","formatmessage","useintl"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-093","original_type":"multiple-choice","topic":"React Intl","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'bbbdce54-c376-4598-baab-6f08e6de12dd',
          'How to access the current locale with React Intl?',
          'Access the current locale using the `intl` object from `injectIntl` (HOC) or `useIntl` (hook):
```jsx
const MyComponent = ({ intl }) => (
  <div>Current locale: {intl.locale}</div>
);
export default injectIntl(MyComponent);
// or with hook:
// const { locale } = useIntl();
```',
          'multiple-choice',
          'intermediate',
          3,
          '[{"id":"a","text":"`navigator.language`","isCorrect":false},{"id":"b","text":"`intl.locale` from `injectIntl` or `useIntl`","isCorrect":true},{"id":"c","text":"`process.env.LOCALE`","isCorrect":false},{"id":"d","text":"Locale is not accessible","isCorrect":false}]',
          NULL,
          'The `intl` object (from HOC or hook) provides access to the current locale via `intl.locale`.',
          NULL,
          ARRAY[]::text[],
          '["react","intl","locale","useintl","injectintl"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-094","original_type":"multiple-choice","topic":"React Intl","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'b3450676-1a8d-4cd3-b360-872190f4fc42',
          'How to format date using React Intl?',
          'Use the `injectIntl()` HOC to access `formatDate()` via props. It returns a string representation of the formatted date.

```jsx
import { injectIntl, intlShape } from "react-intl";

const MyComponent = ({ intl }) => {
  const stringDate = intl.formatDate(new Date(), {
    year: "numeric",
    month: "numeric",
    day: "numeric"
  });
  return <div>{`The formatted date is ${stringDate}`}</div>;
};

MyComponent.propTypes = { intl: intlShape.isRequired };
export default injectIntl(MyComponent);
```',
          'multiple-choice',
          'intermediate',
          6,
          NULL,
          NULL,
          '`injectIntl` injects the `intl` object into a component’s props, which includes `formatDate`, `formatNumber`, and other localization utilities.',
          NULL,
          ARRAY[]::text[],
          '["react","react-intl","i18n","date-formatting","internationalization"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q95","original_type":"open-ended","topic":"Internationalization (i18n)","subcategory":"Internationalization (i18n)","sample_answers":["Use `injectIntl` to wrap your component and access `intl.formatDate()` with options like `{ year: ''numeric'', month: ''short'' }`.","Alternatively, in modern React, use the `useIntl()` hook instead of `injectIntl` for function components."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'b2fe9c2d-b8ef-47b6-a204-cd76f0882164',
          'What is Shallow Renderer in React testing?',
          'Shallow rendering renders a component one level deep without rendering child components, useful for unit testing isolated behavior.',
          'multiple-choice',
          'intermediate',
          6,
          NULL,
          NULL,
          'Shallow rendering lets you test a component’s output without instantiating or rendering its children, isolating the unit under test.',
          NULL,
          ARRAY[]::text[],
          '["react","testing","shallow-rendering","unit-test"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q96","original_type":"open-ended","topic":"React Testing","subcategory":"Unit Testing","sample_answers":["Shallow rendering tests only the current component’s render output, ignoring child component logic—ideal for pure unit tests.","It’s provided by `react-test-renderer/shallow` and useful for asserting structure without DOM or side effects."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '299e0d0f-d0c5-4ae1-8d55-b24a609b99b0',
          'What is the `TestRenderer` package in React?',
          '`TestRenderer` renders React components to plain JavaScript objects (not DOM), enabling snapshot testing without a browser or jsdom.',
          'multiple-choice',
          'intermediate',
          7,
          NULL,
          NULL,
          'It converts a React element tree into a serializable JavaScript object, perfect for snapshot comparisons in Jest.',
          NULL,
          ARRAY[]::text[],
          '["react","testrenderer","snapshot-testing","testing"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q97","original_type":"open-ended","topic":"React Testing","subcategory":"Unit Testing","sample_answers":["`TestRenderer.create(<MyComponent />)` returns a renderer whose `.toJSON()` output can be snapshotted and compared across test runs.","Unlike DOM-based testing, it works in Node.js environments and supports both ReactDOM and React Native components."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '86e63190-11d0-4d0a-a22b-e7898c948e3c',
          'What is the purpose of ReactTestUtils package?',
          '`ReactTestUtils` provides utilities to simulate DOM interactions and inspect component behavior in unit tests.',
          'multiple-choice',
          'intermediate',
          6,
          NULL,
          NULL,
          'It includes methods like `Simulate.click()` and `findRenderedDOMComponentWithTag()` for testing event handling and component structure.',
          NULL,
          ARRAY[]::text[],
          '["react","reacttestutils","testing","dom-simulation"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q98","original_type":"open-ended","topic":"React Testing","subcategory":"Unit Testing","sample_answers":["`ReactTestUtils` allows you to trigger synthetic events (e.g., clicks) and traverse rendered component trees for assertions.","Though largely superseded by React Testing Library and `@testing-library/react`, it was foundational in early React testing."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'a134aeeb-89b0-4faf-9e60-57383cc1615a',
          'What is Jest?',
          'Jest is a JavaScript testing framework created by Facebook, based on Jasmine, with built-in mocking, snapshot testing, and jsdom support.',
          'multiple-choice',
          'beginner',
          5,
          NULL,
          NULL,
          'Jest requires minimal configuration, runs tests in parallel, and integrates seamlessly with React via `@testing-library/react` or snapshot testing.',
          NULL,
          ARRAY[]::text[],
          '["jest","testing","facebook","javascript","unit-testing"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q99","original_type":"open-ended","topic":"Jest","subcategory":"Unit Testing","sample_answers":["Jest is a zero-config test runner with built-in assertion library, mocking, coverage reports, and snapshot capabilities.","It uses `jsdom` to simulate a browser environment, enabling DOM-based tests to run in Node.js."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '495d6bb4-0193-4762-9a08-c60ade7ed30d',
          'What are the advantages of Jest over Jasmine?',
          'Jest offers automatic test discovery, auto-mocking, better async support, jsdom integration, and parallel test execution.',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"Jest requires more configuration than Jasmine","isCorrect":false},{"id":"b","text":"Jest has no mocking support","isCorrect":false},{"id":"c","text":"Jest auto-discovers tests, mocks dependencies, supports async, uses jsdom, and runs tests in parallel","isCorrect":true},{"id":"d","text":"Jasmine runs tests faster than Jest","isCorrect":false}]',
          NULL,
          'Jest builds on Jasmine’s syntax but adds modern DX features like auto-mocking, snapshot testing, and zero-config setup.',
          NULL,
          ARRAY[]::text[],
          '["jest","jasmine","testing","comparison"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q100","original_type":"multiple-choice","topic":"Jest","subcategory":"Unit Testing","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '5c60e91b-e93f-48c1-a481-431943cc967e',
          'What is the App Router in Next.js?',
          'The App Router is a new routing system in Next.js 13+ based on the `app/` directory, React Server Components, and nested layouts.',
          'multiple-choice',
          'advanced',
          8,
          NULL,
          NULL,
          'It replaces the Pages Router with a more powerful, server-first architecture that supports streaming, partial rendering, and built-in data fetching.',
          NULL,
          [],
          ARRAY['nextjs','app-router','advanced']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"next-21-40-nextjs-q21","original_type":"open-ended","topic":"App Router","subcategory":"","sample_answers":["The App Router uses the `app/` directory with file-based routing, React Server Components by default, and supports nested layouts via `layout.js` files.","It enables features like streaming with Suspense, automatic code splitting, and colocation of components, data, and styles."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Next.js"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '7f83c7b4-d5a0-499f-910b-572650235888',
          'How do you handle loading states in the App Router?',
          'Use the `loading.js` file in a route segment to show a loading UI while data is being fetched. It works with React Suspense.',
          'multiple-choice',
          'intermediate',
          7,
          NULL,
          NULL,
          '`loading.js` provides an instant loading UI without client-side JavaScript, improving perceived performance.',
          NULL,
          [],
          ARRAY['nextjs','loading-states','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"next-21-40-nextjs-q22","original_type":"open-ended","topic":"Loading States","subcategory":"","sample_answers":["Create `app/dashboard/loading.js` that exports a component. Next.js shows it immediately while the `page.js` data loads.","This is built on React Suspense—no need for `useState` or `useEffect` to manage loading states manually."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Next.js"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '77e168d1-6e29-4ded-9739-f3c683384db4',
          'What is the purpose of error.js in the App Router?',
          'The `error.js` file defines an error boundary for a route segment, catching errors in Server and Client Components and displaying a fallback UI.',
          'multiple-choice',
          'intermediate',
          7,
          NULL,
          NULL,
          'It uses React error boundaries under the hood and can be reset with the `error.reset()` function.',
          NULL,
          [],
          ARRAY['nextjs','error-handling','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"next-21-40-nextjs-q23","original_type":"open-ended","topic":"Error Handling","subcategory":"","sample_answers":["`error.js` exports a Client Component that receives `error` and `reset` props. It catches errors in the route segment and lets users retry.","Unlike Pages Router, error boundaries are file-based and automatically scoped to the route."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Next.js"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '255fc8fc-0d0f-4062-9376-f4e339d88da9',
          'How do you implement nested layouts in Next.js App Router?',
          'Create `layout.js` files in nested folders. Each layout wraps its child routes, enabling persistent UI like headers and sidebars.',
          'multiple-choice',
          'intermediate',
          7,
          NULL,
          NULL,
          'Layouts are Server Components by default and can fetch data. They persist across route changes, improving performance.',
          NULL,
          [],
          ARRAY['nextjs','layouts','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"next-21-40-nextjs-q24","original_type":"open-ended","topic":"Layouts","subcategory":"","sample_answers":["In `app/dashboard/layout.js`, return a layout with a sidebar. All pages in `app/dashboard/` will be wrapped by it.","Layouts can be nested: `app/layout.js` → `app/dashboard/layout.js` → `app/dashboard/settings/page.js`."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Next.js"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '4ee36f36-9c29-4e8a-a8b7-03371912023e',
          'What is the difference between `generateStaticParams` and `getStaticPaths`?',
          '`generateStaticParams` is used in App Router for dynamic routes with SSG. `getStaticPaths` is the Pages Router equivalent.',
          'multiple-choice',
          'intermediate',
          7,
          '[{"id":"a","text":"`generateStaticParams`: App Router; `getStaticPaths`: Pages Router","isCorrect":true,"explanation":""},{"id":"b","text":"They are the same function","isCorrect":false,"explanation":""},{"id":"c","text":"`getStaticPaths` works in App Router","isCorrect":false,"explanation":""},{"id":"d","text":"`generateStaticParams` is for SSR","isCorrect":false,"explanation":""}]',
          NULL,
          'Both define which dynamic routes to pre-render at build time.',
          NULL,
          [],
          ARRAY['nextjs','static-site-generation-(ssg)','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"next-21-40-nextjs-q25","original_type":"multiple-choice","topic":"Static Site Generation (SSG)","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Next.js"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'bdbc3c61-7a29-49e1-acb7-af2f67dc14b1',
          'How do you handle dynamic routes in the App Router?',
          'Use dynamic segments like `app/users/[id]/page.js`. Fetch data using `params.id` in the Server Component.',
          'multiple-choice',
          'intermediate',
          7,
          NULL,
          NULL,
          'The `params` object is passed to `page.js`, `layout.js`, and other route handlers automatically.',
          NULL,
          [],
          ARRAY['nextjs','dynamic-routes','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"next-21-40-nextjs-q26","original_type":"open-ended","topic":"Dynamic Routes","subcategory":"","sample_answers":["Create `app/blog/[slug]/page.js`. The `slug` is available via `params.slug` in the component: `export default async function Page({ params }) { ... }`","Use `generateStaticParams` to pre-render dynamic routes at build time for SSG."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Next.js"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'a685bd86-2cc4-4bf6-98c7-e3e7fbff5ef8',
          'What is the purpose of the `not-found.js` file?',
          '`not-found.js` defines a custom 404 page for a route segment when `notFound()` is thrown or a route doesn’t exist.',
          'multiple-choice',
          'intermediate',
          6,
          NULL,
          NULL,
          'It’s the App Router equivalent of `pages/404.js` but scoped to route segments.',
          NULL,
          [],
          ARRAY['nextjs','error-handling','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"next-21-40-nextjs-q27","original_type":"open-ended","topic":"Error Handling","subcategory":"","sample_answers":["Create `app/not-found.js` for a global 404, or `app/blog/not-found.js` for blog-specific 404s.","Call `notFound()` from `next/navigation` in a Server Component to trigger it programmatically."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Next.js"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'da1ee088-611e-42d9-86f0-7376ce88cc6d',
          'How do you redirect in Next.js App Router?',
          'Use `redirect()` from `next/navigation` in Server Components, or `useRouter().push()` in Client Components.',
          'multiple-choice',
          'intermediate',
          7,
          NULL,
          NULL,
          '`redirect()` is for server-side redirects (e.g., auth checks); `useRouter` is for client-side navigation.',
          NULL,
          [],
          ARRAY['nextjs','redirects','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"next-21-40-nextjs-q28","original_type":"open-ended","topic":"Redirects","subcategory":"","sample_answers":["In a Server Component: `import { redirect } from ''next/navigation''; if (!user) redirect(''/login'');`","In a Client Component: `const router = useRouter(); router.push(''/dashboard'');`"],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Next.js"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '75d14071-85f4-4edc-bad0-21ed507971a6',
          'What is the `useRouter` hook used for?',
          '`useRouter` provides client-side navigation methods like `push`, `replace`, and `refresh` in Client Components.',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"Client-side navigation in Client Components","isCorrect":true,"explanation":""},{"id":"b","text":"Data fetching in Server Components","isCorrect":false,"explanation":""},{"id":"c","text":"Server-side redirects","isCorrect":false,"explanation":""},{"id":"d","text":"Only works in Pages Router","isCorrect":false,"explanation":""}]',
          NULL,
          'It’s the App Router equivalent of `next/router` but with the same API.',
          NULL,
          [],
          ARRAY['nextjs','client-side-navigation','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"next-21-40-nextjs-q29","original_type":"multiple-choice","topic":"Client-Side Navigation","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Next.js"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'db516c87-a916-42fe-ab11-5b825c9582c4',
          'How do you handle environment variables in Next.js?',
          'Prefix with `NEXT_PUBLIC_` to expose to the browser; others are server-only. Load from `.env.local`.',
          'multiple-choice',
          'intermediate',
          6,
          NULL,
          NULL,
          'Non-prefixed variables are only available in Server Components and API routes—never exposed to client.',
          NULL,
          [],
          ARRAY['nextjs','environment-variables','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"next-21-40-nextjs-q30","original_type":"open-ended","topic":"Environment Variables","subcategory":"","sample_answers":["`NEXT_PUBLIC_API_URL` is available in the browser; `DATABASE_URL` is only in server code—keeping secrets safe.","Use `.env.local` for local development; Vercel lets you set env vars in the project dashboard."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Next.js"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '1f7d305a-ead8-48de-8bf3-60086220422b',
          'What is the difference between `resolving` and `fetching` in Next.js?',
          'Resolving is determining which route to render. Fetching is retrieving data for that route.',
          'multiple-choice',
          'advanced',
          8,
          NULL,
          NULL,
          'Next.js first resolves the route (e.g., `/blog/[slug]`), then fetches data for it using Server Components.',
          NULL,
          [],
          ARRAY['nextjs','app-router-internals','advanced']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"next-21-40-nextjs-q31","original_type":"open-ended","topic":"App Router Internals","subcategory":"","sample_answers":["Resolving matches the URL to a file in `app/`. Fetching runs the Server Component to get data and render HTML.","These phases enable streaming: the shell renders while data fetches in parallel."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Next.js"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '6b695c7d-5818-430f-a7fe-3263d1bf81ae',
          'How does Next.js handle caching?',
          'Next.js extends `fetch()` with automatic caching, revalidation, and deduping. Use `cache`, `next.revalidate`, and `next.tags` options.',
          'multiple-choice',
          'advanced',
          9,
          NULL,
          NULL,
          'Caching is opt-in via `fetch` options, replacing `getStaticProps`/`getServerSideProps`.',
          NULL,
          [],
          ARRAY['nextjs','caching','advanced']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"next-21-40-nextjs-q32","original_type":"open-ended","topic":"Caching","subcategory":"","sample_answers":["`fetch(url, { next: { revalidate: 60 } })` caches for 60 seconds. `fetch(url, { cache: ''no-store'' })` disables caching for SSR.","Use `tags` for on-demand revalidation: `fetch(url, { next: { tags: [''posts''] } })` then `revalidateTag(''posts'')` in an API route."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Next.js"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '06d720bb-fda8-4432-8950-e9eb641bf151',
          'What is on-demand revalidation in Next.js?',
          'On-demand revalidation allows you to purge cached data and regenerate pages after build time using `revalidateTag` or `revalidatePath`.',
          'multiple-choice',
          'advanced',
          8,
          NULL,
          NULL,
          'It’s the App Router equivalent of ISR but triggered manually via API routes or webhooks.',
          NULL,
          [],
          ARRAY['nextjs','incremental-static-regeneration','advanced']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"next-21-40-nextjs-q33","original_type":"open-ended","topic":"Incremental Static Regeneration","subcategory":"","sample_answers":["Tag a `fetch` with `next: { tags: [''product-123''] }`. Later, call `revalidateTag(''product-123'')` in an API route to update the page.","Useful for CMS webhooks, e-commerce inventory updates, or admin actions that require immediate content refresh."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Next.js"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'a04dc7ec-a701-4e72-8894-48e6d9b34d22',
          'How do you implement middleware in Next.js?',
          'Create a `middleware.js` file in the root or route segment. It runs before requests and can rewrite, redirect, or add headers.',
          'multiple-choice',
          'intermediate',
          7,
          NULL,
          NULL,
          'Middleware is ideal for authentication, A/B testing, i18n, and bot protection.',
          NULL,
          [],
          ARRAY['nextjs','middleware','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"next-21-40-nextjs-q34","original_type":"open-ended","topic":"Middleware","subcategory":"","sample_answers":["```js\nexport { default } from ''next-auth/middleware'';\nexport const config = { matcher: [''/dashboard/:path*''] };\n```","Use `NextRequest` to inspect cookies, headers, or URL, then `NextResponse.rewrite()` or `redirect()` as needed."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Next.js"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'ecbd9c46-a6fe-4e3e-ad80-e72ee9960008',
          'What is the purpose of `next.config.js`?',
          '`next.config.js` customizes Next.js build settings like Webpack, Babel, environment variables, and experimental features.',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"Customize Webpack, Babel, env vars, and experimental features","isCorrect":true,"explanation":""},{"id":"b","text":"Required for every Next.js app","isCorrect":false,"explanation":""},{"id":"c","text":"Only for CSS configuration","isCorrect":false,"explanation":""},{"id":"d","text":"Replaces package.json","isCorrect":false,"explanation":""}]',
          NULL,
          'It’s optional but powerful for advanced customization without ejecting.',
          NULL,
          [],
          ARRAY['nextjs','next.js-configuration','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"next-21-40-nextjs-q35","original_type":"multiple-choice","topic":"Next.js Configuration","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Next.js"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '2831bfb9-1ac1-4cf9-93f2-52031c5511ad',
          'How does Next.js optimize images?',
          'Next.js uses the `next/image` component to automatically optimize images (resize, compress, modern formats) and lazy-load them.',
          'multiple-choice',
          'intermediate',
          7,
          NULL,
          NULL,
          'It reduces bandwidth, improves LCP, and prevents layout shift with automatic sizing.',
          NULL,
          [],
          ARRAY['nextjs','image-optimization','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"next-21-40-nextjs-q36","original_type":"open-ended","topic":"Image Optimization","subcategory":"","sample_answers":["`next/image` serves optimized WebP/AVIF, resizes based on device, and lazy-loads offscreen images—no config needed.","It integrates with CDNs and local file storage, and supports blur-up placeholders."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Next.js"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'c7b4045f-04bd-4f8f-a1f2-a76586c98fed',
          'What is the difference between `next/image` and `next/future/image`?',
          '`next/future/image` was an experimental version in Next.js 12. It’s now stable and available as `next/image` in Next.js 13+.',
          'true-false',
          'intermediate',
          5,
          '[{"id":"a","text":"False","isCorrect":true,"explanation":""},{"id":"b","text":"True","isCorrect":false,"explanation":""}]',
          NULL,
          'As of Next.js 13, `next/image` is the stable, recommended component.',
          NULL,
          [],
          ARRAY['nextjs','image-optimization','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"next-21-40-nextjs-q37","original_type":"true-false","topic":"Image Optimization","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Next.js"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '33ba5ad2-d3e3-4c0f-b2de-9bceacb07996',
          'How do you deploy a Next.js app?',
          'Deploy to Vercel (official platform), Netlify, AWS, or any Node.js-compatible host. Vercel provides automatic SSR/SSG, edge functions, and preview deployments.',
          'multiple-choice',
          'intermediate',
          6,
          NULL,
          NULL,
          'Vercel is optimized for Next.js with zero-config deployments and Git integration.',
          NULL,
          [],
          ARRAY['nextjs','deployment-on-vercel','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"next-21-40-nextjs-q38","original_type":"open-ended","topic":"Deployment on Vercel","subcategory":"","sample_answers":["Push to GitHub and deploy on Vercel for automatic builds, preview URLs, and edge network caching.","For self-hosting, run `next build` and `next start` on a Node.js server—but you lose edge functions and ISR."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Next.js"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );