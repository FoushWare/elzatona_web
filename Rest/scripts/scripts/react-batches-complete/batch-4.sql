-- Batch 4: Questions 61-80
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES
('9b529b3c-786e-471e-822b-3d5793444221', 'What is the difference between React and ReactDOM?', 'The `react` package contains `React.createElement()`, `React.Component`, `React.Children`, and other helpers related to elements and component classes. You can think of these as the isomorphic or universal helpers that you need to build components. The `react-dom` package contains `ReactDOM.render()`, and in `react-dom/server` we have _server-side rendering_ support with `ReactDOMServer.renderToString()` and `ReactDOMServer.renderToStaticMarkup()`.', 'multiple-choice', 'intermediate', 3, '[{"id":"a","text":"`react` handles DOM rendering; `react-dom` defines components","isCorrect":false},{"id":"b","text":"`react` provides core element/component APIs; `react-dom` provides DOM and SSR rendering methods","isCorrect":true},{"id":"c","text":"They are the same package","isCorrect":false},{"id":"d","text":"`react-dom` is only for server-side rendering","isCorrect":false}]', NULL, '`react` contains core helpers for elements and components; `react-dom` contains DOM-specific methods like `render()` and SSR utilities.', NULL, ARRAY[]::text[], ARRAY['react','react-dom','isomorphic','rendering'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-061","original_type":"multiple-choice","topic":"React DOM","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('f575f06d-6fa4-436f-9d28-e19703ab8ed7', 'Why ReactDOM is separated from React?', 'The React team worked on extracting all DOM-related features into a separate library called _ReactDOM_. React v0.14 is the first release in which the libraries are split. By looking at some of the packages, `react-native`, `react-art`, `react-canvas`, and `react-three`, it has become clear that the beauty and essence of React has nothing to do with browsers or the DOM.

To build more environments that React can render to, React team planned to split the main React package into two: `react` and `react-dom`. This paves the way to writing components that can be shared between the web version of React and React Native.', 'multiple-choice', 'intermediate', 3, '[{"id":"a","text":"To reduce bundle size for web apps","isCorrect":false},{"id":"b","text":"To enable React to work across platforms like web and React Native by separating core from DOM-specific code","isCorrect":true},{"id":"c","text":"Because the DOM API is too complex","isCorrect":false},{"id":"d","text":"ReactDOM is deprecated","isCorrect":false}]', NULL, 'Separating `react` from `react-dom` allows React to target multiple platforms (web, native, etc.) while sharing core logic.', NULL, ARRAY[]::text[], ARRAY['react','react-dom','react-native','cross-platform'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-062","original_type":"multiple-choice","topic":"React DOM","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('b3fc3a69-fc80-40f8-a6fa-df33e1b87ce3', 'How to use React label element?', 'If you try to render a `<label>` element bound to a text input using the standard `for` attribute, then it produces HTML missing that attribute and prints a warning to the console.
```jsx harmony
<label for={''user''}>{''User''}</label>
<input type={''text''} id={''user''} />
```
Since `for` is a reserved keyword in JavaScript, use `htmlFor` instead.
```jsx harmony
<label htmlFor={''user''}>{''User''}</label>
<input type={''text''} id={''user''} />
```', 'multiple-choice', 'beginner', 2, '[{"id":"a","text":"Use `for` as in HTML","isCorrect":false},{"id":"b","text":"Use `htmlFor` because `for` is a reserved JavaScript keyword","isCorrect":true},{"id":"c","text":"Labels are not supported in React","isCorrect":false},{"id":"d","text":"Use `labelFor`","isCorrect":false}]', NULL, 'Use `htmlFor` instead of `for` in JSX because `for` is a reserved JavaScript keyword.', NULL, ARRAY[]::text[], ARRAY['react','label','htmlfor','forms','accessibility'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-063","original_type":"multiple-choice","topic":"Forms","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('8bfd95ff-784b-4425-be39-338193583d72', 'How to combine multiple inline style objects?', 'You can use _spread operator_ in regular React:
```jsx harmony
<button style={{ ...styles.panel.button, ...styles.panel.submitButton }}>
  {"Submit"}
</button>
```
If you''re using React Native then you can use the array notation:
```jsx harmony
<button style={[styles.panel.button, styles.panel.submitButton]}>
  {"Submit"}
</button>
```', 'multiple-choice', 'intermediate', 3, '[{"id":"a","text":"Use `Object.assign()` only","isCorrect":false},{"id":"b","text":"Use spread operator `{...style1, ...style2}` in React web; array `[style1, style2]` in React Native","isCorrect":true},{"id":"c","text":"Inline styles cannot be combined","isCorrect":false},{"id":"d","text":"Use CSS classes instead","isCorrect":false}]', NULL, 'In React (web), use the spread operator `{...obj1, ...obj2}` to merge style objects. In React Native, use array notation `[obj1, obj2]`.', NULL, ARRAY[]::text[], ARRAY['react','inline-styles','spread','styling'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-064","original_type":"multiple-choice","topic":"CSS & Styling","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('f4852a5f-71c8-4794-93ab-4ab873b81a70', 'How to re-render the view when the browser is resized?', 'You can use the `useState` hook to manage the width and height state variables, and the `useEffect` hook to add and remove the `resize` event listener. The `[]` dependency array passed to useEffect ensures that the effect only runs once (on mount) and not on every re-render.
```javascript
import React, { useState, useEffect } from "react";
function WindowDimensions() {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    function handleResize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <span>
      {dimensions.width} x {dimensions.height}
    </span>
  );
}
```', 'multiple-choice', 'intermediate', 4, '[{"id":"a","text":"Use `window.onresize = () => {}` directly in render","isCorrect":false},{"id":"b","text":"Use `useEffect` to add/remove `resize` listener and update state","isCorrect":true},{"id":"c","text":"Resize events are handled automatically by React","isCorrect":false},{"id":"d","text":"Use `setInterval` to check window size","isCorrect":false}]', NULL, 'Use `useEffect` to add a `resize` event listener on mount and remove it on unmount, updating state with new dimensions.', NULL, ARRAY[]::text[], ARRAY['react','useeffect','resize','event-listeners','hooks'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-065","original_type":"multiple-choice","topic":"Hooks","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"756586f8-23f1-4a1b-a75f-ad7914b047c3"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('cd378e9a-02a4-4a4c-8d06-1e8291c7fa5f', 'How to pretty print JSON with React?', 'We can use `<pre>` tag so that the formatting of the `JSON.stringify()` is retained:
```jsx harmony
const data = { name: "John", age: 42 };
function User {
    return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
const container = createRoot(document.getElementById("container"));
container.render(<User />);
```', 'multiple-choice', 'beginner', 2, '[{"id":"a","text":"Use `console.log` inside JSX","isCorrect":false},{"id":"b","text":"Use `<pre>{JSON.stringify(data, null, 2)}</pre>` to preserve formatting","isCorrect":true},{"id":"c","text":"JSON cannot be displayed in React","isCorrect":false},{"id":"d","text":"Use `<code>` without `JSON.stringify`","isCorrect":false}]', NULL, 'Wrap `JSON.stringify(data, null, 2)` in a `<pre>` tag to preserve indentation and formatting in the browser.', NULL, ARRAY[]::text[], ARRAY['react','json','debugging','pre','stringify'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-066","original_type":"multiple-choice","topic":"Debugging","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('9dd7d3d0-99c3-4266-9f22-736d2c78995e', 'Why can''t you update props in React?', 'The React philosophy is that props should be _immutable_(read only) and _top-down_. This means that a parent can send any prop values to a child, but the child can''t modify received props.', 'multiple-choice', 'beginner', 2, '[{"id":"a","text":"Props are mutable and can be updated freely","isCorrect":false},{"id":"b","text":"Props are immutable to enforce unidirectional data flow and predictability","isCorrect":true},{"id":"c","text":"Only class components can update props","isCorrect":false},{"id":"d","text":"Props are updated automatically by React","isCorrect":false}]', NULL, 'Props are read-only to enforce unidirectional data flow and prevent side effects. Children must request changes via callbacks.', NULL, ARRAY[]::text[], ARRAY['react','props','immutability','data-flow'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-067","original_type":"multiple-choice","topic":"Props","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"accaeeab-e45f-4999-a647-4e5126bcd487"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('3ec05f07-74dd-4d10-9d63-fd4069acc2b1', 'How to focus an input element on page load?', 'You need to use `useEffect` hook to set focus on input field during page load time for functional component.
```jsx harmony
import React, { useEffect, useRef } from "react";
const App = () => {
  const inputElRef = useRef(null);
  useEffect(() => {
    inputElRef.current.focus();
  }, []);
  return (
    <div>
      <input defaultValue={"Won''t focus"} />
      <input ref={inputElRef} defaultValue={"Will focus"} />
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById("app"));
```', 'multiple-choice', 'intermediate', 3, '[{"id":"a","text":"Add `autoFocus` prop to the input","isCorrect":true},{"id":"b","text":"Use `useRef` and `useEffect` to manually focus the input","isCorrect":true},{"id":"c","text":"Both `autoFocus` and `useRef`/`useEffect` are valid approaches","isCorrect":true},{"id":"d","text":"It''s not possible to focus on page load","isCorrect":false}]', NULL, 'Use `useRef` to get a reference to the input and `useEffect` to call `.focus()` on mount.', NULL, ARRAY[]::text[], ARRAY['react','useeffect','useRef','focus','dom'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-068","original_type":"multiple-choice","topic":"Refs","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('8e6ca3dc-1226-4bab-b02d-6c373f6666d1', 'How can we find the version of React at runtime in the browser?', 'You can use `React.version` to get the version.
```jsx harmony
const REACT_VERSION = React.version;
ReactDOM.render(
  <div>{`React version: ${REACT_VERSION}`}</div>,
  document.getElementById("app")
);
```', 'multiple-choice', 'beginner', 2, '[{"id":"a","text":"`React.version`","isCorrect":true},{"id":"b","text":"`ReactDOM.version`","isCorrect":false},{"id":"c","text":"`process.env.REACT_VERSION`","isCorrect":false},{"id":"d","text":"`package.json` version","isCorrect":false}]', NULL, 'Access `React.version` to get the current React version at runtime.', NULL, ARRAY[]::text[], ARRAY['react','version','debugging','runtime'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-069","original_type":"multiple-choice","topic":"Debugging","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('59f4f81f-86af-44e9-8a0b-95b886eb28e3', 'How to add Google Analytics for React Router?', 'Add a listener on the `history` object to record each page view:
```javascript
history.listen(function (location) {
  window.ga("set", "page", location.pathname + location.search);
  window.ga("send", "pageview", location.pathname + location.search);
});
```', 'multiple-choice', 'intermediate', 4, '[{"id":"a","text":"Add GA script to every component","isCorrect":false},{"id":"b","text":"Use `history.listen()` to track location changes and send page views","isCorrect":true},{"id":"c","text":"GA is automatically integrated with React Router","isCorrect":false},{"id":"d","text":"Use `useEffect` in every route component","isCorrect":false}]', NULL, 'Use `history.listen()` to track route changes and send page views to Google Analytics.', NULL, ARRAY[]::text[], ARRAY['react','react-router','analytics','ga','history'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-070","original_type":"multiple-choice","topic":"React Router","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('e482318b-d1be-433b-843d-504188cc18f6', 'How do you apply vendor prefixes to inline styles in React?', 'React _does not_ apply _vendor prefixes_ automatically. You need to add vendor prefixes manually.
```jsx harmony
<div
  style={{
    transform: "rotate(90deg)",
    WebkitTransform: "rotate(90deg)", // note the capital ''W'' here
    msTransform: "rotate(90deg)", // ''ms'' is the only lowercase vendor prefix
  }}
/>
```', 'multiple-choice', 'intermediate', 3, '[{"id":"a","text":"React auto-prefixes all styles","isCorrect":false},{"id":"b","text":"Manually add prefixes like `WebkitTransform` and `msTransform`","isCorrect":true},{"id":"c","text":"Use a CSS-in-JS library only","isCorrect":false},{"id":"d","text":"Prefixes are not needed in modern browsers","isCorrect":false}]', NULL, 'React does not auto-prefix styles. Manually add prefixes like `WebkitTransform` (note capital ''W'') and `msTransform`.', NULL, ARRAY[]::text[], ARRAY['react','vendor-prefixes','inline-styles','css','compatibility'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-071","original_type":"multiple-choice","topic":"CSS & Styling","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('2368b9dc-61bc-4b9f-b27a-0d5f06906af3', 'How to import and export components using React and ES6?', 'You should use default for exporting the components
```jsx harmony
import User from "user";
export default function MyProfile {
    return <User type="customer">//...</User>;
}
```', 'multiple-choice', 'beginner', 2, '[{"id":"a","text":"Only named exports are allowed","isCorrect":false},{"id":"b","text":"Use `export default` for components and `import Name from ''module''`","isCorrect":true},{"id":"c","text":"Components must be exported as constants","isCorrect":false},{"id":"d","text":"Use `require()` and `module.exports`","isCorrect":false}]', NULL, 'Use `export default` for components and `import Name from ''module''` to import them.', NULL, ARRAY[]::text[], ARRAY['react','es6','import','export','modules'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-072","original_type":"multiple-choice","topic":"Components","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"759ee497-71fd-4347-9018-c9d62ba7470f"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('8e0f5ecd-4bf3-41a8-b377-2b7d8a6040f8', 'What are the exceptions on React component naming?', 'The component names should start with an uppercase letter but there are few exceptions to this convention. The lowercase tag names with a dot (property accessors) are still considered as valid component names.

For example, the below tag can be compiled to a valid component,
```jsx harmony
     render() {
          return (
            <obj.component/> // `React.createElement(obj.component)`
          )
    }
```', 'multiple-choice', 'intermediate', 3, '[{"id":"a","text":"All component names must be uppercase","isCorrect":false},{"id":"b","text":"Tags with dots like `<obj.component />` are valid because they are property accessors","isCorrect":true},{"id":"c","text":"Lowercase names are allowed for all components","isCorrect":false},{"id":"d","text":"Naming exceptions are not supported","isCorrect":false}]', NULL, 'JSX tags with dots (e.g., `<obj.component />`) are valid because they are treated as property access, not HTML tags.', NULL, ARRAY[]::text[], ARRAY['react','jsx','component-naming','exceptions'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-073","original_type":"multiple-choice","topic":"JSX","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"6a7eecc1-7cea-4bfd-84d3-e5ddff1d6624"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('fbb13989-3648-4862-a84e-37b046cbdc89', 'Is it possible to use async/await in plain React?', 'Yes, you can use `async/await` in plain React, as long as your JavaScript environment supports ES2017+. Nowadays most modern browsers and build tools support ES2017+ version. If you''re using **Create React App**, **Next.js**, **Remix**, or any modern React setup, `async/await` is supported out of the box through **Babel**.

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
```', 'multiple-choice', 'intermediate', 3, '[{"id":"a","text":"True","isCorrect":true},{"id":"b","text":"False","isCorrect":false}]', NULL, 'Yes, `async/await` is fully supported in modern React environments via Babel transpilation.', NULL, ARRAY[]::text[], ARRAY['react','async-await','fetch','hooks','babel'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-074","original_type":"true-false","topic":"Hooks","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"756586f8-23f1-4a1b-a75f-ad7914b047c3"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('1168404c-d1bf-4bad-913e-97394fe5f86e', 'What are the common folder structures for React?', 'There are two common practices for React project file structure.
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
   ```', 'multiple-choice', 'beginner', 2, '[{"id":"a","text":"Only grouping by file type is valid","isCorrect":false},{"id":"b","text":"Group by feature/route or by file type are both common approaches","isCorrect":true},{"id":"c","text":"There is only one official React folder structure","isCorrect":false},{"id":"d","text":"Folder structure doesn''t matter in React","isCorrect":false}]', NULL, 'Common structures are: (1) by feature/route (co-locate related files), or (2) by file type (group all components, all API files, etc.).', NULL, ARRAY[]::text[], ARRAY['react','folder-structure','organization','best-practices'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-075","original_type":"multiple-choice","topic":"Project Structure","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('1f987555-ad88-48d0-87a4-45635a849624', 'What are popular packages for animation?', 'Popular animation packages in the React ecosystem include **React Transition Group** and **React Motion**. These libraries help manage UI transitions, enter/exit animations, and physics-based motion.', 'multiple-choice', 'intermediate', 3, '[{"id":"a","text":"`react-spring`, `framer-motion`, `React Transition Group`, `React Motion`","isCorrect":true},{"id":"b","text":"`animate.css` only","isCorrect":false},{"id":"c","text":"`jQuery.animate()`","isCorrect":false},{"id":"d","text":"CSS animations are the only way","isCorrect":false}]', NULL, 'React Transition Group and React Motion are widely used for declarative animations in React apps, handling mount/unmount transitions and spring-based physics.', NULL, ARRAY[]::text[], ARRAY['react','animation','react-transition-group','react-motion','ui'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-076","original_type":"multiple-choice","topic":"Animation","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('11874f95-23ac-41ea-84c3-d77f83816282', 'What is the benefit of style modules?', 'Style modules help avoid hardcoding style values in components. Shared values like colors, spacing, and typography should be extracted into dedicated modules for reuse and consistency.

Example:
```javascript
export const colors = { white, black, blue };
export const space = [0, 8, 16, 32, 64];
```

Then import:
```javascript
import { space, colors } from "./styles";
```', 'multiple-choice', 'beginner', 2, '[{"id":"a","text":"They allow dynamic theme switching only","isCorrect":false},{"id":"b","text":"They extract reusable style values (colors, spacing) into shared modules for consistency","isCorrect":true},{"id":"c","text":"They replace CSS entirely","isCorrect":false},{"id":"d","text":"They are only for server-side rendering","isCorrect":false}]', NULL, 'Style modules promote consistency, reduce duplication, and make global design tokens (like spacing or colors) easy to manage and update.', NULL, ARRAY[]::text[], ARRAY['react','styling','design-system','constants','css'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-077","original_type":"multiple-choice","topic":"CSS & Styling","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('d47f39d3-f156-4b47-befd-82d31c92831f', 'What are popular React-specific linters?', 'ESLint is the standard JavaScript linter. For React, popular plugins include:
- `eslint-plugin-react`: Enforces React best practices (e.g., key usage, prop types)
- `eslint-plugin-jsx-a11y`: Checks accessibility issues in JSX (e.g., alt text, tabIndex)', 'multiple-choice', 'intermediate', 3, '[{"id":"a","text":"`eslint-plugin-react` and `eslint-plugin-jsx-a11y`","isCorrect":true},{"id":"b","text":"`prettier` only","isCorrect":false},{"id":"c","text":"`stylelint` for React","isCorrect":false},{"id":"d","text":"No linters are needed for React","isCorrect":false}]', NULL, '`eslint-plugin-react` and `eslint-plugin-jsx-a11y` are essential for catching React-specific bugs and accessibility issues during development.', NULL, ARRAY[]::text[], ARRAY['react','eslint','linting','accessibility','best-practices'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-078","original_type":"multiple-choice","topic":"Build Tools & Workflow","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('8272372e-3dcb-4fa0-bb38-9414194c4222', 'What is React Router?', 'React Router is a powerful routing library built on top of React that enables navigation and URL synchronization in single-page applications (SPAs). It allows you to define routes that render specific components based on the current URL.', 'multiple-choice', 'beginner', 2, '[{"id":"a","text":"A state management library like Redux","isCorrect":false},{"id":"b","text":"A routing library for SPAs that syncs URL with UI","isCorrect":true},{"id":"c","text":"A CSS-in-JS solution","isCorrect":false},{"id":"d","text":"A testing utility","isCorrect":false}]', NULL, 'React Router maps URLs to React components, enabling SPA navigation without full page reloads while keeping the UI in sync with the browser address bar.', NULL, ARRAY[]::text[], ARRAY['react','react-router','routing','spa','navigation'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-079","original_type":"multiple-choice","topic":"React Router","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('cb20343d-db04-468a-bf3f-762c39e6608e', 'How is React Router different from the history library?', 'React Router is a wrapper around the `history` library. The `history` library handles interaction with the browser’s `window.history` (via HTML5 history API, hash, or memory). React Router builds on this to provide declarative routing components like `<Route>` and `<Link>`.', 'multiple-choice', 'intermediate', 3, '[{"id":"a","text":"React Router is a standalone browser API","isCorrect":false},{"id":"b","text":"React Router wraps the `history` library to provide declarative React components for routing","isCorrect":true},{"id":"c","text":"The `history` library is only for server-side rendering","isCorrect":false},{"id":"d","text":"They are the same thing","isCorrect":false}]', NULL, 'React Router uses the `history` library under the hood but provides a React-friendly, component-based API for routing.', NULL, ARRAY[]::text[], ARRAY['react','react-router','history','routing','browser-api'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-080","original_type":"multiple-choice","topic":"React Router","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z');
