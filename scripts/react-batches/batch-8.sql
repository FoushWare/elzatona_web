-- Batch 8: Questions 71-80
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES
('d74e341e-4af6-4c2b-99be-f3700368527b', 'How do you apply vendor prefixes to inline styles in React?', 'React _does not_ apply _vendor prefixes_ automatically. You need to add vendor prefixes manually.
```jsx harmony
<div
  style={{
    transform: "rotate(90deg)",
    WebkitTransform: "rotate(90deg)", // note the capital ''W'' here
    msTransform: "rotate(90deg)", // ''ms'' is the only lowercase vendor prefix
  }}
/>
```', 'multiple-choice', 'intermediate', 3, '[{"id":"a","text":"React auto-prefixes all styles","isCorrect":false},{"id":"b","text":"Manually add prefixes like `WebkitTransform` and `msTransform`","isCorrect":true},{"id":"c","text":"Use a CSS-in-JS library only","isCorrect":false},{"id":"d","text":"Prefixes are not needed in modern browsers","isCorrect":false}]', NULL, 'React does not auto-prefix styles. Manually add prefixes like `WebkitTransform` (note capital ''W'') and `msTransform`.', NULL, ARRAY[], ARRAY['react','vendor-prefixes','inline-styles','css','compatibility'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-071","original_type":"multiple-choice","topic":"CSS & Styling","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('9c3a932d-1c8d-433c-bd73-80713dc103c7', 'How to import and export components using React and ES6?', 'You should use default for exporting the components
```jsx harmony
import User from "user";
export default function MyProfile {
    return <User type="customer">//...</User>;
}
```', 'multiple-choice', 'beginner', 2, '[{"id":"a","text":"Only named exports are allowed","isCorrect":false},{"id":"b","text":"Use `export default` for components and `import Name from ''module''`","isCorrect":true},{"id":"c","text":"Components must be exported as constants","isCorrect":false},{"id":"d","text":"Use `require()` and `module.exports`","isCorrect":false}]', NULL, 'Use `export default` for components and `import Name from ''module''` to import them.', NULL, ARRAY[], ARRAY['react','es6','import','export','modules'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-072","original_type":"multiple-choice","topic":"Components","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"759ee497-71fd-4347-9018-c9d62ba7470f"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('1e3494c7-9f4e-4192-a378-cb8b18236668', 'What are the exceptions on React component naming?', 'The component names should start with an uppercase letter but there are few exceptions to this convention. The lowercase tag names with a dot (property accessors) are still considered as valid component names.

For example, the below tag can be compiled to a valid component,
```jsx harmony
     render() {
          return (
            <obj.component/> // `React.createElement(obj.component)`
          )
    }
```', 'multiple-choice', 'intermediate', 3, '[{"id":"a","text":"All component names must be uppercase","isCorrect":false},{"id":"b","text":"Tags with dots like `<obj.component />` are valid because they are property accessors","isCorrect":true},{"id":"c","text":"Lowercase names are allowed for all components","isCorrect":false},{"id":"d","text":"Naming exceptions are not supported","isCorrect":false}]', NULL, 'JSX tags with dots (e.g., `<obj.component />`) are valid because they are treated as property access, not HTML tags.', NULL, ARRAY[], ARRAY['react','jsx','component-naming','exceptions'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-073","original_type":"multiple-choice","topic":"JSX","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"6a7eecc1-7cea-4bfd-84d3-e5ddff1d6624"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('4f8192cf-59c1-4a9a-9e58-cdebaa1944bb', 'Is it possible to use async/await in plain React?', 'Yes, you can use `async/await` in plain React, as long as your JavaScript environment supports ES2017+. Nowadays most modern browsers and build tools support ES2017+ version. If you''re using **Create React App**, **Next.js**, **Remix**, or any modern React setup, `async/await` is supported out of the box through **Babel**.

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
```', 'multiple-choice', 'intermediate', 3, '[{"id":"a","text":"True","isCorrect":true},{"id":"b","text":"False","isCorrect":false}]', NULL, 'Yes, `async/await` is fully supported in modern React environments via Babel transpilation.', NULL, ARRAY[], ARRAY['react','async-await','fetch','hooks','babel'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-074","original_type":"true-false","topic":"Hooks","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"756586f8-23f1-4a1b-a75f-ad7914b047c3"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('d78f65e2-dd45-47bc-b99a-8fb51f87c64f', 'What are the common folder structures for React?', 'There are two common practices for React project file structure.
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
   ```', 'multiple-choice', 'beginner', 2, '[{"id":"a","text":"Only grouping by file type is valid","isCorrect":false},{"id":"b","text":"Group by feature/route or by file type are both common approaches","isCorrect":true},{"id":"c","text":"There is only one official React folder structure","isCorrect":false},{"id":"d","text":"Folder structure doesn''t matter in React","isCorrect":false}]', NULL, 'Common structures are: (1) by feature/route (co-locate related files), or (2) by file type (group all components, all API files, etc.).', NULL, ARRAY[], ARRAY['react','folder-structure','organization','best-practices'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-075","original_type":"multiple-choice","topic":"Project Structure","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('b2829905-8a53-49dc-ae3d-4b55466f78c9', 'What are popular packages for animation?', 'Popular animation packages in the React ecosystem include **React Transition Group** and **React Motion**. These libraries help manage UI transitions, enter/exit animations, and physics-based motion.', 'multiple-choice', 'intermediate', 3, '[{"id":"a","text":"`react-spring`, `framer-motion`, `React Transition Group`, `React Motion`","isCorrect":true},{"id":"b","text":"`animate.css` only","isCorrect":false},{"id":"c","text":"`jQuery.animate()`","isCorrect":false},{"id":"d","text":"CSS animations are the only way","isCorrect":false}]', NULL, 'React Transition Group and React Motion are widely used for declarative animations in React apps, handling mount/unmount transitions and spring-based physics.', NULL, ARRAY[], ARRAY['react','animation','react-transition-group','react-motion','ui'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-076","original_type":"multiple-choice","topic":"Animation","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('1a177123-0e2d-41a8-91f6-2a84501642b8', 'What is the benefit of style modules?', 'Style modules help avoid hardcoding style values in components. Shared values like colors, spacing, and typography should be extracted into dedicated modules for reuse and consistency.

Example:
```javascript
export const colors = { white, black, blue };
export const space = [0, 8, 16, 32, 64];
```

Then import:
```javascript
import { space, colors } from "./styles";
```', 'multiple-choice', 'beginner', 2, '[{"id":"a","text":"They allow dynamic theme switching only","isCorrect":false},{"id":"b","text":"They extract reusable style values (colors, spacing) into shared modules for consistency","isCorrect":true},{"id":"c","text":"They replace CSS entirely","isCorrect":false},{"id":"d","text":"They are only for server-side rendering","isCorrect":false}]', NULL, 'Style modules promote consistency, reduce duplication, and make global design tokens (like spacing or colors) easy to manage and update.', NULL, ARRAY[], ARRAY['react','styling','design-system','constants','css'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-077","original_type":"multiple-choice","topic":"CSS & Styling","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('cfa8999a-5eef-49ac-8e9d-6e5c258f7e51', 'What are popular React-specific linters?', 'ESLint is the standard JavaScript linter. For React, popular plugins include:
- `eslint-plugin-react`: Enforces React best practices (e.g., key usage, prop types)
- `eslint-plugin-jsx-a11y`: Checks accessibility issues in JSX (e.g., alt text, tabIndex)', 'multiple-choice', 'intermediate', 3, '[{"id":"a","text":"`eslint-plugin-react` and `eslint-plugin-jsx-a11y`","isCorrect":true},{"id":"b","text":"`prettier` only","isCorrect":false},{"id":"c","text":"`stylelint` for React","isCorrect":false},{"id":"d","text":"No linters are needed for React","isCorrect":false}]', NULL, '`eslint-plugin-react` and `eslint-plugin-jsx-a11y` are essential for catching React-specific bugs and accessibility issues during development.', NULL, ARRAY[], ARRAY['react','eslint','linting','accessibility','best-practices'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-078","original_type":"multiple-choice","topic":"Build Tools & Workflow","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('c984e7cb-9755-4f7e-8aea-8ccfbeb58f6d', 'What is React Router?', 'React Router is a powerful routing library built on top of React that enables navigation and URL synchronization in single-page applications (SPAs). It allows you to define routes that render specific components based on the current URL.', 'multiple-choice', 'beginner', 2, '[{"id":"a","text":"A state management library like Redux","isCorrect":false},{"id":"b","text":"A routing library for SPAs that syncs URL with UI","isCorrect":true},{"id":"c","text":"A CSS-in-JS solution","isCorrect":false},{"id":"d","text":"A testing utility","isCorrect":false}]', NULL, 'React Router maps URLs to React components, enabling SPA navigation without full page reloads while keeping the UI in sync with the browser address bar.', NULL, ARRAY[], ARRAY['react','react-router','routing','spa','navigation'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-079","original_type":"multiple-choice","topic":"React Router","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('9d874afb-e38a-4da9-a229-39b6ac6dfb1b', 'How is React Router different from the history library?', 'React Router is a wrapper around the `history` library. The `history` library handles interaction with the browser’s `window.history` (via HTML5 history API, hash, or memory). React Router builds on this to provide declarative routing components like `<Route>` and `<Link>`.', 'multiple-choice', 'intermediate', 3, '[{"id":"a","text":"React Router is a standalone browser API","isCorrect":false},{"id":"b","text":"React Router wraps the `history` library to provide declarative React components for routing","isCorrect":true},{"id":"c","text":"The `history` library is only for server-side rendering","isCorrect":false},{"id":"d","text":"They are the same thing","isCorrect":false}]', NULL, 'React Router uses the `history` library under the hood but provides a React-friendly, component-based API for routing.', NULL, ARRAY[], ARRAY['react','react-router','history','routing','browser-api'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-080","original_type":"multiple-choice","topic":"React Router","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z');
