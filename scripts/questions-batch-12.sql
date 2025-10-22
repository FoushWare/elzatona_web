INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '2e0ab70f-f60a-4085-9a85-f69d5e0be128',
          'What are common use cases of useRef hook?',
          'Focus management, scroll control, DOM measurements, media playback, and integrating with non-React libraries.',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"Managing application state","isCorrect":false},{"id":"b","text":"Focus, scroll, measurements, media, and third-party libraries","isCorrect":true},{"id":"c","text":"Replacing useState","isCorrect":false},{"id":"d","text":"Only for class components","isCorrect":false}]',
          NULL,
          'Refs enable imperative interactions with DOM elements that aren’t possible with declarative React alone.',
          NULL,
          ARRAY[]::text[],
          '["react","useref","dom","imperative"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q300","original_type":"multiple-choice","topic":"useRef","subcategory":"React Hooks","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'f5a1e493-4379-4d2e-acc4-d4c4d8756752',
          'What is useImperativeHandle Hook? Give an example.',
          'Exposes custom methods from child to parent via ref, used with `forwardRef` for modals, inputs, etc.',
          'multiple-choice',
          'advanced',
          8,
          NULL,
          NULL,
          'It lets parents control child behavior imperatively while hiding internal implementation.',
          NULL,
          ARRAY[]::text[],
          '["react","useimperativehandle","forwardref","imperative"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q301","original_type":"open-ended","topic":"useImperativeHandle","subcategory":"React Hooks","sample_answers":["```javascript\nconst Dialog = forwardRef((props, ref) => {\n  const [open, setOpen] = useState(false);\n  useImperativeHandle(ref, () => ({ open: () => setOpen(true) }));\n  return open ? <div>Dialog</div> : null;\n});\n// Parent: dialogRef.current.open();\n```","This pattern is essential for reusable component libraries that need to expose controlled APIs."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '09acfb66-8bdf-4ebc-a459-c3006e87ec4c',
          'When should you use useImperativeHandle?',
          'For reusable components that need to expose imperative methods (modals, inputs, scroll containers).',
          'multiple-choice',
          'advanced',
          7,
          '[{"id":"a","text":"For all state management","isCorrect":false},{"id":"b","text":"For modals, inputs, scroll containers in reusable libraries","isCorrect":true},{"id":"c","text":"To replace useEffect","isCorrect":false},{"id":"d","text":"Only in class components","isCorrect":false}]',
          NULL,
          'It’s for when you need to give parents controlled access to child behavior without exposing internals.',
          NULL,
          ARRAY[]::text[],
          '["react","useimperativehandle","component-libraries","api"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q302","original_type":"multiple-choice","topic":"useImperativeHandle","subcategory":"React Hooks","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'f3b57e9a-4a20-4869-a5f4-6527ebc29b81',
          'Is it possible to use useImperativeHandle without forwardRef?',
          'No. `useImperativeHandle` only works when the component is wrapped in `forwardRef`.',
          'true-false',
          'intermediate',
          6,
          '[{"id":"a","text":"True","isCorrect":false},{"id":"b","text":"False","isCorrect":true}]',
          NULL,
          '`forwardRef` is required to pass the ref from parent to child so `useImperativeHandle` can attach methods to it.',
          NULL,
          ARRAY[]::text[],
          '["react","useimperativehandle","forwardref","refs"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q303","original_type":"true-false","topic":"useImperativeHandle","subcategory":"React Hooks","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'dae324fb-68db-4112-8308-484871fae866',
          'How is useMemo different from useCallback?',
          '`useMemo` memoizes values; `useCallback` memoizes functions.',
          'multiple-choice',
          'intermediate',
          7,
          '[{"id":"a","text":"useMemo is for functions; useCallback for values","isCorrect":false},{"id":"b","text":"useMemo memoizes values; useCallback memoizes functions","isCorrect":true},{"id":"c","text":"They are identical","isCorrect":false},{"id":"d","text":"useCallback prevents re-renders of parent","isCorrect":false}]',
          NULL,
          '`useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`.',
          NULL,
          ARRAY[]::text[],
          '["react","usememo","usecallback","performance"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q304","original_type":"multiple-choice","topic":"useMemo vs useCallback","subcategory":"React Hooks","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '4f5f3a87-4e22-4996-823d-d050d33eeea8',
          'Does useMemo prevent re-rendering of child components?',
          'Not directly. But when combined with `React.memo`, it prevents re-renders by preserving prop reference equality.',
          'multiple-choice',
          'advanced',
          7,
          NULL,
          NULL,
          '`useMemo` ensures the value doesn’t change between renders, so `React.memo` can skip child re-renders.',
          NULL,
          ARRAY[]::text[],
          '["react","usememo","react-memo","performance"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q305","original_type":"open-ended","topic":"useMemo","subcategory":"Performance Optimization","sample_answers":["`const data = useMemo(() => compute(data), [data]);` passed to `<Child data={data} />` where `Child = React.memo(...)` prevents re-renders if `data` hasn’t changed.","Alone, `useMemo` only optimizes the parent’s computation; with `React.memo`, it optimizes child rendering too."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'd1fe4e47-520f-412d-affa-d1d9b5cf8333',
          'What is `useCallback` and why is it used?',
          '`useCallback` memoizes function references to prevent unnecessary re-renders of child components.',
          'multiple-choice',
          'intermediate',
          6,
          NULL,
          NULL,
          'Without it, new function instances on every render cause `React.memo` children to re-render unnecessarily.',
          NULL,
          ARRAY[]::text[],
          '["react","usecallback","performance","react-memo"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q306","original_type":"open-ended","topic":"useCallback","subcategory":"React Hooks","sample_answers":["`const handleClick = useCallback(() => { ... }, []);` ensures the function reference stays the same across renders.","Pass `handleClick` to a `React.memo` child to prevent it from re-rendering when parent state changes but the callback hasn’t."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'cc3cf01b-aa27-4227-adab-ba201acc0707',
          'What is the children prop?',
          'The `children` prop is a special prop in React used to pass elements between the opening and closing tags of a component. It is commonly used in layout and wrapper components.

A simple usage of children prop looks as below,
```jsx harmony
function MyDiv({ children }){
    return (
      <div>
        {children}
      </div>;
    );
}
export default function Greeting() {
  return (
    <MyDiv>
      <span>{"Hello"}</span>
      <span>{"World"}</span>
    </MyDiv>
  );
}
```
Here, everything inside `<MyDiv>...</MyDiv>` is passed as children to the custom div component.
The children can be text, JSX elements, fragments, arrays and functions(for advance use case like render props).',
          'multiple-choice',
          'beginner',
          2,
          '[{"id":"a","text":"It passes data from parent to child as a string","isCorrect":false},{"id":"b","text":"It allows components to receive and render nested content between their tags","isCorrect":true},{"id":"c","text":"It is only used for passing numbers","isCorrect":false},{"id":"d","text":"It is an alias for `props.data`","isCorrect":false}]',
          NULL,
          'The `children` prop allows components to wrap other elements, enabling flexible and reusable layout components like modals, cards, or containers.',
          NULL,
          ARRAY[]::text[],
          '["react","children","props","composition"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-026","original_type":"multiple-choice","topic":"Props","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '67dd36d2-211d-4c05-ad4d-2de8187602f3',
          'How to write comments in React?',
          'The comments in React/JSX are similar to JavaScript Multiline comments but are wrapped in curly braces.

**Single-line comments:**
```jsx harmony
<div>
  {/* Single-line comments(In vanilla JavaScript, the single-line comments are represented by double slash(//)) */}
  {`Welcome ${user}, let''s play React`}
</div>
```

**Multi-line comments:**
```jsx harmony
<div>
  {/* Multi-line comments for more than
   one line */}
  {`Welcome ${user}, let''s play React`}
</div>
```
You can use `//` and `/* */` in JS logic, hooks, and functions.',
          'multiple-choice',
          'beginner',
          2,
          '[{"id":"a","text":"Use `//` inside JSX tags","isCorrect":false},{"id":"b","text":"Use `{/* comment */}` for JSX comments","isCorrect":true},{"id":"c","text":"Comments are not allowed in React","isCorrect":false},{"id":"d","text":"Use HTML-style `<!-- -->` comments","isCorrect":false}]',
          NULL,
          'In JSX, comments must be wrapped in `{/* */}`. Regular JS comments (`//`, `/* */`) work only outside JSX expressions.',
          NULL,
          ARRAY[]::text[],
          '["react","comments","jsx","syntax"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-027","original_type":"multiple-choice","topic":"JSX","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'cc326a24-16d5-486e-900c-7ca71a6171c1',
          'What is reconciliation?',
          '`Reconciliation` is the process through which React updates the Browser DOM and makes React work faster. React use a `diffing algorithm` so that component updates are predictable and faster. React would first calculate the difference between the `real DOM` and the copy of DOM `(Virtual DOM)` when there''s an update of components.

React stores a copy of Browser DOM which is called `Virtual DOM`. When we make changes or add data, React creates a new Virtual DOM and compares it with the previous one. This comparison is done by `Diffing Algorithm`.

Now React compares the Virtual DOM with Real DOM. It finds out the changed nodes and updates only the changed nodes in Real DOM leaving the rest nodes as it is. This process is called _Reconciliation_.',
          'multiple-choice',
          'intermediate',
          4,
          '[{"id":"a","text":"The process of converting JSX to JavaScript","isCorrect":false},{"id":"b","text":"React''s algorithm to compare Virtual DOM trees and update only changed real DOM nodes","isCorrect":true},{"id":"c","text":"A method to bundle React components","isCorrect":false},{"id":"d","text":"The act of mounting a component for the first time","isCorrect":false}]',
          NULL,
          'Reconciliation is React''s process of comparing Virtual DOM trees and updating the real DOM efficiently using a diffing algorithm.',
          NULL,
          ARRAY[]::text[],
          '["react","reconciliation","virtual-dom","diffing","rendering"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-028","original_type":"multiple-choice","topic":"Virtual DOM","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '45da9a77-2cf9-4ada-925a-ea60724eef2b',
          'Does the lazy function support named exports?',
          'No, currently `React.lazy` function supports default exports only. If you would like to import modules which are named exports, you can create an intermediate module that reexports it as the default. It also ensures that tree shaking keeps working and don''t pull unused components.

Let''s take a component file which exports multiple named components,
```javascript
// MoreComponents.js
export const SomeComponent = /* ... */;
export const UnusedComponent = /* ... */;
```
and reexport `MoreComponents.js` components in an intermediate file `IntermediateComponent.js`
```javascript
// IntermediateComponent.js
export { SomeComponent as default } from "./MoreComponents.js";
```
Now you can import the module using lazy function as below,
```javascript
import React, { lazy } from "react";
const SomeComponent = lazy(() => import("./IntermediateComponent.js"));
```',
          'true-false',
          'intermediate',
          3,
          '[{"id":"a","text":"True","isCorrect":false},{"id":"b","text":"False","isCorrect":true}]',
          NULL,
          '`React.lazy` only supports default exports. To use named exports, you must re-export them as default in an intermediate file.',
          NULL,
          ARRAY[]::text[],
          '["react","lazy","code-splitting","dynamic-import","named-exports"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-029","original_type":"true-false","topic":"Code Splitting","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '4def32f9-2a7d-4144-9a72-ff428702dd37',
          'Why does React use className instead of the class attribute?',
          'React uses **className** instead of **class** because of a JavaScript naming conflict with the class keyword.
1. `class` is a reserved keyword in JavaScript
   In JavaScript, class is used to define ES6 classes:
   ```js
   class Person {
     constructor(name) {
       this.name = name;
     }
   }
   ```
   If you try to use class as a variable or property name, it will throw a syntax error. Since JSX is just JavaScript with XML-like syntax, using class directly in JSX would break the parser.
2. JSX Is JavaScript
   When you write JSX like this:
   ```jsx
   <div class="btn">Click</div>
   ```
   It will be compiled to:
   ```jsx
   React.createElement(''div'', { class: ''btn'' }, ''Click'');
   ```
   But `class` is invalid in this object literal context (since it clashes with the JS keyword), hence React instead uses className.
   ```jsx
   <div className="btn">Click</div>
   ```
   which compiles to:
   ```jsx
   React.createElement(''div'', { className: ''btn'' }, ''Click'');
   ```
   React then translates `className` to` class` in the final HTML DOM.
3. Aligns with DOM APIs
   In vanilla JavaScript, you interact with element classes using:
   ```js
   element.className = ''my-class'';
   ```
   React follows this convention, staying consistent with the DOM API''s property name rather than HTML’s attribute.',
          'multiple-choice',
          'beginner',
          2,
          '[{"id":"a","text":"Because `class` is a reserved keyword in JavaScript","isCorrect":true},{"id":"b","text":"To make CSS harder to write","isCorrect":false},{"id":"c","text":"Because HTML doesn’t support `class`","isCorrect":false},{"id":"d","text":"It’s a typo that became standard","isCorrect":false}]',
          NULL,
          'React uses `className` because `class` is a reserved keyword in JavaScript, and JSX compiles to JavaScript object literals where `class` would cause a syntax error.',
          NULL,
          ARRAY[]::text[],
          '["react","jsx","classname","class","dom"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-030","original_type":"multiple-choice","topic":"JSX","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'de61d7c3-0be0-477f-ba6e-f616ca1b4ba0',
          'What are Fragments?',
          'It''s a common pattern or practice in React for a component to return multiple elements. _Fragments_ let you group a list of children without adding extra nodes to the DOM.
You need to use either `<Fragment>` or a shorter syntax having empty tag (`<></>`).
Below is the example of how to use fragment inside _Story_ component.
```jsx harmony
function Story({ title, description, date }) {
  return (
    <Fragment>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>{date}</p>
    </Fragment>
  );
}
```
It is also possible to render list of fragments inside a loop with the mandatory **key** attribute supplied.
```jsx harmony
function StoryBook() {
  return stories.map((story) => (
    <Fragment key={story.id}>
      <h2>{story.title}</h2>
      <p>{story.description}</p>
      <p>{story.date}</p>
    </Fragment>
  ));
}
```
Usually, you don''t need to use `<Fragment>` until there is a need of _key_ attribute. The usage of shorter syntax looks like below.
```jsx harmony
function Story({ title, description, date }) {
  return (
    <>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>{date}</p>
    </>
  );
}
```',
          'multiple-choice',
          'beginner',
          2,
          '[{"id":"a","text":"Special components that render nothing","isCorrect":false},{"id":"b","text":"A way to group multiple elements without adding extra DOM nodes","isCorrect":true},{"id":"c","text":"Components that only render on mobile","isCorrect":false},{"id":"d","text":"A type of React error boundary","isCorrect":false}]',
          NULL,
          'Fragments allow grouping multiple elements without adding extra DOM nodes, improving performance and avoiding layout issues.',
          NULL,
          ARRAY[]::text[],
          '["react","fragments","jsx","rendering","dom"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-031","original_type":"multiple-choice","topic":"Fragments","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '061dc276-c935-4240-9916-3f6dd5f71d78',
          'Why are Fragments better than container divs?',
          'Below are the list of reasons to prefer fragments over container DOM elements,
1. Fragments are a bit faster and use less memory by not creating an extra DOM node. This only has a real benefit on very large and deep trees.
2. Some CSS mechanisms like _Flexbox_ and _CSS Grid_ have a special parent-child relationships, and adding divs in the middle makes it hard to keep the desired layout.
3. The DOM Inspector is less cluttered.',
          'multiple-choice',
          'intermediate',
          3,
          '[{"id":"a","text":"They are slower but easier to debug","isCorrect":false},{"id":"b","text":"They prevent CSS layout issues, improve performance, and reduce DOM clutter","isCorrect":true},{"id":"c","text":"They automatically apply styles","isCorrect":false},{"id":"d","text":"They are required for server-side rendering","isCorrect":false}]',
          NULL,
          'Fragments avoid unnecessary DOM nodes, which improves performance, preserves CSS layout (e.g., Flexbox/Grid), and reduces DOM clutter.',
          NULL,
          ARRAY[]::text[],
          '["react","fragments","performance","css","layout"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-032","original_type":"multiple-choice","topic":"Fragments","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'aa77d451-d98e-4be6-9bf9-78f1deb04dfb',
          'What are portals in React?',
          'A Portal is a React feature that enables rendering children into a DOM node that exists outside the parent component''s DOM hierarchy, while still preserving the React component hierarchy. Portals help avoid CSS stacking issues—for example, elements with position: fixed may not behave as expected inside a parent with transform. Portals solve this by rendering content (like modals or tooltips) outside such constrained DOM contexts.
```javascript
ReactDOM.createPortal(child, container);
```
*   `child`: Any valid React node (e.g., JSX, string, fragment).
*   `container`: A real DOM node (e.g., `document.getElementById(''modal-root'')`).
Even though the content renders elsewhere in the DOM, it still behaves like a normal child in React. It has access to context, state, and event handling.

**Example:- Modal:**
```jsx
function Modal({ children }) {
  return ReactDOM.createPortal(
    <div className="modal">{children}</div>,
    document.body)
  );
}
```
The above code will render the modal content into the body element in the HTML, not inside the component''s usual location.',
          'multiple-choice',
          'intermediate',
          4,
          '[{"id":"a","text":"A way to share state between unrelated components","isCorrect":false},{"id":"b","text":"A feature to render children into a different DOM node while preserving React behavior","isCorrect":true},{"id":"c","text":"A method to lazy-load components","isCorrect":false},{"id":"d","text":"An alternative to React Context","isCorrect":false}]',
          NULL,
          'Portals render React children into a DOM node outside the parent hierarchy (e.g., modals into `document.body`), while maintaining React context and event handling.',
          NULL,
          ARRAY[]::text[],
          '["react","portals","modals","dom","rendering"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-033","original_type":"multiple-choice","topic":"Portals","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'b75fb364-02d2-46fe-80f6-3b8380b0c97a',
          'What are stateless components?',
          'If the behaviour of a component is independent of its state then it can be a stateless component. You can use either a function or a class for creating stateless components. But unless you need to use a lifecycle hook in your components, you should go for function components. There are a lot of benefits if you decide to use function components here; they are easy to write, understand, and test, a little faster, and you can avoid the `this` keyword altogether.',
          'multiple-choice',
          'beginner',
          2,
          '[{"id":"a","text":"Components that cannot receive props","isCorrect":false},{"id":"b","text":"Components that don’t manage internal state and render based only on props","isCorrect":true},{"id":"c","text":"Components that are always class-based","isCorrect":false},{"id":"d","text":"Components that throw errors","isCorrect":false}]',
          NULL,
          'Stateless components (now called functional components) don’t manage internal state and are typically pure functions that render based on props.',
          NULL,
          ARRAY[]::text[],
          '["react","stateless","function-components","components"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-034","original_type":"multiple-choice","topic":"Components","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '8e5903ef-3054-447a-baee-116df93351c9',
          'What are stateful components?',
          'If the behaviour of a component is dependent on the _state_ of the component then it can be termed as stateful component. These _stateful components_ are either function components with hooks or _class components_.

Let''s take an example of function stateful component which update the state based on click event,
```javascript
import React, {useState} from ''react'';
const App = (props) => {
const [count, setCount] = useState(0);
handleIncrement() {
  setCount(count+1);
}
return (
  <>
    <button onClick={handleIncrement}>Increment</button>
    <span>Counter: {count}</span>
  </>
  )
}
```',
          'multiple-choice',
          'beginner',
          2,
          '[{"id":"a","text":"Components that never re-render","isCorrect":false},{"id":"b","text":"Components that manage internal state and re-render when it changes","isCorrect":true},{"id":"c","text":"Components that only accept static props","isCorrect":false},{"id":"d","text":"Components that are deprecated","isCorrect":false}]',
          NULL,
          'Stateful components manage internal state using `useState` (function) or `this.state` (class), and re-render when state changes.',
          NULL,
          ARRAY[]::text[],
          '["react","stateful","state","hooks","class-components"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-035","original_type":"multiple-choice","topic":"State","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '0a445998-cc83-4fad-9d1f-96a8e474b907',
          'How to apply validation to props in React?',
          'When the application is running in _development mode_, React will automatically check all props that we set on components to make sure they have _correct type_. If the type is incorrect, React will generate warning messages in the console. It''s disabled in _production mode_ due to performance impact. The mandatory props are defined with `isRequired`.

The set of predefined prop types:
1. `PropTypes.number`
2. `PropTypes.string`
3. `PropTypes.array`
4. `PropTypes.object`
5. `PropTypes.func`
6. `PropTypes.node`
7. `PropTypes.element`
8. `PropTypes.bool`
9. `PropTypes.symbol`
10. `PropTypes.any`

We can define `propTypes` for `User` component as below:
```jsx harmony
import React from "react";
import PropTypes from "prop-types";
class User extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
  };
  render() {
    return (
      <>
        <h1>{`Welcome, ${this.props.name}`}</h1>
        <h2>{`Age, ${this.props.age}`}</h2>
      </>
    );
  }
}
```',
          'multiple-choice',
          'intermediate',
          3,
          '[{"id":"a","text":"Use `PropTypes` from the `prop-types` package to define expected prop types and required props","isCorrect":true},{"id":"b","text":"PropTypes work in production mode for security","isCorrect":false},{"id":"c","text":"Validation is automatic and cannot be customized","isCorrect":false},{"id":"d","text":"PropTypes are built into React since v16","isCorrect":false}]',
          NULL,
          'PropTypes validate prop types in development mode, helping catch bugs early. Required props use `.isRequired`.',
          NULL,
          ARRAY[]::text[],
          '["react","proptypes","validation","type-checking","development"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-036","original_type":"multiple-choice","topic":"Props","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '6b7af07d-8e63-4488-8fbf-5c60d2b2d936',
          'What are the advantages of React?',
          'Below are the list of main advantages of React,
1. Increases the application''s performance with _Virtual DOM_.
2. JSX makes code easy to read and write.
3. It renders both on client and server side (_SSR_).
4. Easy to integrate with frameworks (Angular, Backbone) since it is only a view library.
5. Easy to write unit and integration tests with tools such as Jest.',
          'multiple-choice',
          'beginner',
          2,
          '[{"id":"a","text":"Virtual DOM, JSX, SSR, easy integration, and testability","isCorrect":true},{"id":"b","text":"Two-way data binding and full framework features","isCorrect":false},{"id":"c","text":"Built-in state management and routing","isCorrect":false},{"id":"d","text":"No learning curve for beginners","isCorrect":false}]',
          NULL,
          'React’s key advantages include Virtual DOM for performance, JSX for readability, SSR support, framework agnosticism, and testability.',
          NULL,
          ARRAY[]::text[],
          '["react","advantages","virtual-dom","jsx","ssr"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-037","original_type":"multiple-choice","topic":"React Basics","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'bc5a8a5c-1259-4fd2-b41d-905cf414be53',
          'What are the limitations of React?',
          'Apart from the advantages, there are few limitations of React too,
1. React is just a view library, not a full framework.
2. There is a learning curve for beginners who are new to web development.
3. Integrating React into a traditional MVC framework requires some additional configuration.
4. The code complexity increases with inline templating and JSX.
5. Too many smaller components leading to over engineering or boilerplate.',
          'multiple-choice',
          'beginner',
          2,
          '[{"id":"a","text":"It’s a full framework with built-in routing and state management","isCorrect":false},{"id":"b","text":"It’s just a view library, has a learning curve, and can create boilerplate","isCorrect":true},{"id":"c","text":"It doesn’t support server-side rendering","isCorrect":false},{"id":"d","text":"It’s slower than vanilla JS","isCorrect":false}]',
          NULL,
          'React is only a view library, has a learning curve, requires extra setup for full apps, and can lead to boilerplate with many small components.',
          NULL,
          ARRAY[]::text[],
          '["react","limitations","view-library","jsx","boilerplate"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-038","original_type":"multiple-choice","topic":"React Basics","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '7995bec4-bf26-4493-8a46-205de78994d7',
          'What are the recommended ways for static type checking?',
          'Normally we use _PropTypes library_ (`React.PropTypes` moved to a `prop-types` package since React v15.5) for _type checking_ in the React applications. For large code bases, it is recommended to use _static type checkers_ such as Flow or TypeScript, that perform type checking at compile time and provide auto-completion features.',
          'multiple-choice',
          'intermediate',
          3,
          '[{"id":"a","text":"PropTypes for small apps; TypeScript/Flow for large codebases","isCorrect":true},{"id":"b","text":"Only PropTypes should be used","isCorrect":false},{"id":"c","text":"TypeScript is not compatible with React","isCorrect":false},{"id":"d","text":"Static typing is unnecessary in React","isCorrect":false}]',
          NULL,
          'For small apps, PropTypes suffice; for large codebases, use TypeScript or Flow for compile-time type safety and better tooling.',
          NULL,
          ARRAY[]::text[],
          '["react","typescript","flow","proptypes","type-checking"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-039","original_type":"multiple-choice","topic":"TypeScript","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'a999d2f9-effe-439d-b5c1-0fa8e406e4e9',
          'What is the use of the react-dom package?',
          'The `react-dom` package provides _DOM-specific methods_ that can be used at the top level of your app. Most of the components are not required to use this module. Some of the methods of this package are:
1. `render()`
2. `hydrate()`
3. `unmountComponentAtNode()`
4. `findDOMNode()`
5. `createPortal()`',
          'multiple-choice',
          'beginner',
          2,
          '[{"id":"a","text":"It contains React’s core logic like useState and useEffect","isCorrect":false},{"id":"b","text":"It provides DOM-specific methods like render(), hydrate(), and createPortal()","isCorrect":true},{"id":"c","text":"It’s used for server-side logic only","isCorrect":false},{"id":"d","text":"It’s deprecated in React 18","isCorrect":false}]',
          NULL,
          '`react-dom` provides methods to interact with the browser DOM, such as `render`, `hydrate`, and `createPortal`.',
          NULL,
          ARRAY[]::text[],
          '["react","react-dom","dom","render","hydrate"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-040","original_type":"multiple-choice","topic":"React DOM","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'b2984a5d-807d-4084-9dc1-da1ea6aa91c9',
          'What is ReactDOMServer?',
          'The `ReactDOMServer` object enables you to render components to static markup (typically used on node server). This object is mainly used for _server-side rendering_ (SSR). The following methods can be used in both the server and browser environments:
1. `renderToString()`
2. `renderToStaticMarkup()`

For example, you generally run a Node-based web server like Express, Hapi, or Koa, and you call `renderToString` to render your root component to a string, which you then send as response.
```javascript
// using Express
import { renderToString } from "react-dom/server";
import MyPage from "./MyPage";
app.get("/", (req, res) => {
  res.write(
    "<!DOCTYPE html><html><head><title>My Page</title></head><body>"
  );
  res.write(''<div id="content">'');
  res.write(renderToString(<MyPage />));
  res.write("</div></body></html>");
  res.end();
});
```',
          'multiple-choice',
          'intermediate',
          4,
          '[{"id":"a","text":"A tool for client-side hydration only","isCorrect":false},{"id":"b","text":"An object with methods like renderToString() for server-side rendering","isCorrect":true},{"id":"c","text":"A replacement for react-dom in the browser","isCorrect":false},{"id":"d","text":"Used for testing components","isCorrect":false}]',
          NULL,
          '`ReactDOMServer` provides methods like `renderToString` for server-side rendering, enabling SEO-friendly and fast initial loads.',
          NULL,
          ARRAY[]::text[],
          '["react","ssr","react-dom-server","render-to-string","server-side"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-041","original_type":"multiple-choice","topic":"Server-Side Rendering","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '522d1a9d-c47a-4a34-8a93-82a6afe96464',
          'How to use innerHTML in React?',
          'The `dangerouslySetInnerHTML` attribute is React''s replacement for using `innerHTML` in the browser DOM. Just like `innerHTML`, it is risky to use this attribute considering cross-site scripting (XSS) attacks. You just need to pass a `__html` object as key and HTML text as value.

In this example MyComponent uses `dangerouslySetInnerHTML` attribute for setting HTML markup:
```jsx harmony
function createMarkup() {
  return { __html: "First &middot; Second" };
}
function MyComponent() {
  return <div dangerouslySetInnerHTML={createMarkup()} />;
}
```',
          'multiple-choice',
          'intermediate',
          3,
          '[{"id":"a","text":"Use `innerHTML` directly on JSX elements","isCorrect":false},{"id":"b","text":"Use `dangerouslySetInnerHTML={{ __html: string }}` with caution","isCorrect":true},{"id":"c","text":"It’s not possible to render HTML in React","isCorrect":false},{"id":"d","text":"Use `React.renderHTML()`","isCorrect":false}]',
          NULL,
          '`dangerouslySetInnerHTML` is React’s way to set raw HTML, but it’s dangerous and should be used cautiously to avoid XSS.',
          NULL,
          ARRAY[]::text[],
          '["react","dangerouslysetinnerhtml","xss","dom","security"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-042","original_type":"multiple-choice","topic":"DOM Manipulation","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'bc3282f4-9983-47c9-a57d-7f098d8ea5be',
          'How to apply styles in React?',
          'The `style` attribute accepts a JavaScript object with camelCased properties rather than a CSS string. This is consistent with the DOM style JavaScript property, is more efficient, and prevents XSS security holes.
```jsx harmony
const divStyle = {
  color: "blue",
  backgroundImage: "url(" + imgUrl + ")",
};
function HelloWorldComponent() {
  return <div style={divStyle}>Hello World!</div>;
}
```
Style keys are camelCased in order to be consistent with accessing the properties on DOM nodes in JavaScript (e.g. `node.style.backgroundImage`).',
          'multiple-choice',
          'beginner',
          2,
          '[{"id":"a","text":"Use CSS strings like `style=\"color: blue\"`","isCorrect":false},{"id":"b","text":"Use camelCased JavaScript objects: `style={{ backgroundColor: ''blue'' }}`","isCorrect":true},{"id":"c","text":"Only external CSS files are allowed","isCorrect":false},{"id":"d","text":"Styles must be defined in a separate CSS module","isCorrect":false}]',
          NULL,
          'React uses camelCased JavaScript objects for inline styles (e.g., `backgroundColor`), not CSS strings.',
          NULL,
          ARRAY[]::text[],
          '["react","styles","inline-styles","camelcase","css"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-043","original_type":"multiple-choice","topic":"CSS & Styling","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '900a5cc2-8679-4a3d-ac63-70946f2239a1',
          'How are events different in React?',
          'Handling events in React elements has some syntactic differences:
1. React event handlers are named using camelCase, rather than lowercase.
2. With JSX you pass a function as the event handler, rather than a string.',
          'multiple-choice',
          'beginner',
          2,
          '[{"id":"a","text":"Event names are lowercase and handlers are strings","isCorrect":false},{"id":"b","text":"Event names use camelCase and handlers are functions","isCorrect":true},{"id":"c","text":"Events are handled the same as in HTML","isCorrect":false},{"id":"d","text":"React doesn’t support events","isCorrect":false}]',
          NULL,
          'React uses camelCase for event names (e.g., `onClick`) and passes functions, not strings, as handlers.',
          NULL,
          ARRAY[]::text[],
          '["react","events","event-handling","camelcase","jsx"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-044","original_type":"multiple-choice","topic":"DOM Events","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'e00730d6-a335-4dc0-8bae-d8b7b355700a',
          'What is the impact of using indexes as keys?',
          'Keys should be stable, predictable, and unique so that React can keep track of elements.

In the below code snippet each element''s key will be based on ordering, rather than tied to the data that is being represented. This limits the optimizations that React can do and creates confusing bugs in the application.
```jsx harmony
{
  todos.map((todo, index) => <Todo {...todo} key={index} />);
}
```
If you use element data for unique key, assuming `todo.id` is unique to this list and stable, React would be able to reorder elements without needing to reevaluate them as much.
```jsx harmony
{
  todos.map((todo) => <Todo {...todo} key={todo.id} />);
}
```

**Note:** If you don''t specify `key` prop at all, React will use index as a key''s value while iterating over an array of data.',
          'multiple-choice',
          'intermediate',
          4,
          '[{"id":"a","text":"It’s always safe and recommended","isCorrect":false},{"id":"b","text":"It can cause bugs with reordering or filtering; use stable IDs instead","isCorrect":true},{"id":"c","text":"Keys are optional and have no impact","isCorrect":false},{"id":"d","text":"Indexes improve performance","isCorrect":false}]',
          NULL,
          'Using indexes as keys can cause bugs when lists are reordered or filtered. Use stable IDs instead.',
          NULL,
          ARRAY[]::text[],
          '["react","keys","lists","index","performance"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-045","original_type":"multiple-choice","topic":"Lists and Keys","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '6b67ae21-39be-4fac-b15e-6e8f45637c40',
          'How do you conditionally render components?',
          'In some cases you want to render different components depending on some state. JSX does not render `false` or `undefined`, so you can use conditional _short-circuiting_ to render a given part of your component only if a certain condition is true.
```jsx harmony
const MyComponent = ({ name, address }) => (
  <div>
    <h2>{name}</h2>
    {address && <p>{address}</p>}
  </div>
);
```
If you need an `if-else` condition then use _ternary operator_.
```jsx harmony
const MyComponent = ({ name, address }) => (
  <div>
    <h2>{name}</h2>
    {address ? <p>{address}</p> : <p>{"Address is not available"}</p>}
  </div>
);
```',
          'multiple-choice',
          'beginner',
          2,
          '[{"id":"a","text":"Use `if` statements directly in JSX","isCorrect":false},{"id":"b","text":"Use `&&` for truthy checks and ternary for if-else logic","isCorrect":true},{"id":"c","text":"Conditional rendering is not supported","isCorrect":false},{"id":"d","text":"Always use `switch` statements","isCorrect":false}]',
          NULL,
          'Use `&&` for simple conditions and ternary (`? :`) for if-else in JSX.',
          NULL,
          ARRAY[]::text[],
          '["react","conditional-rendering","ternary","short-circuit","jsx"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-046","original_type":"multiple-choice","topic":"Conditional Rendering","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'b39e5635-5000-4740-9581-eed15dc2e1ec',
          'Why we need to be careful when spreading props on DOM elements?',
          'When we _spread props_ we run into the risk of adding unknown HTML attributes, which is a bad practice. Instead we can use prop destructuring with `...rest` operator, so it will add only required props.
For example,
```jsx harmony
const ComponentA = () => (
  <ComponentB isDisplay={true} className={"componentStyle"} />
);
const ComponentB = ({ isDisplay, ...domProps }) => (
  <div {...domProps}>{"ComponentB"}</div>
);
```',
          'multiple-choice',
          'intermediate',
          3,
          '[{"id":"a","text":"Spreading props is always safe","isCorrect":false},{"id":"b","text":"It can add invalid HTML attributes; destructure to avoid this","isCorrect":true},{"id":"c","text":"DOM elements ignore extra props","isCorrect":false},{"id":"d","text":"You must spread all props for components to work","isCorrect":false}]',
          NULL,
          'Spreading all props onto DOM elements can pass invalid HTML attributes. Destructure to separate DOM props from custom ones.',
          NULL,
          ARRAY[]::text[],
          '["react","spread","props","rest","dom"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-047","original_type":"multiple-choice","topic":"Props","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '4b23519f-b5bc-4c7b-971e-c582f4f3d76b',
          'How do you memoize a component?',
          'Since React v16.6.0, we have a `React.memo`. It provides a higher order component which memoizes component unless the props change. To use it, simply wrap the component using React.memo before you use it.
```js
const MemoComponent = React.memo(function MemoComponent(props) {
  /* render using props */
});
OR;
export default React.memo(MyFunctionComponent);
```',
          'multiple-choice',
          'intermediate',
          4,
          '[{"id":"a","text":"Use `React.memo()` to prevent unnecessary re-renders when props are unchanged","isCorrect":true},{"id":"b","text":"Memoization is only for class components","isCorrect":false},{"id":"c","text":"All components are memoized by default","isCorrect":false},{"id":"d","text":"Use `useMemo` on the component itself","isCorrect":false}]',
          NULL,
          '`React.memo` prevents re-renders of function components when props haven’t changed.',
          NULL,
          ARRAY[]::text[],
          '["react","memo","performance","re-render","optimization"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-048","original_type":"multiple-choice","topic":"Performance Optimization","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '7e8e6cf6-a566-4737-bf8a-4b5f472fc53d',
          'How do you implement Server Side Rendering or SSR?',
          'React is already equipped to handle rendering on Node servers. A special version of the DOM renderer is available, which follows the same pattern as on the client side.
```jsx harmony
import ReactDOMServer from "react-dom/server";
import App from "./App";
ReactDOMServer.renderToString(<App />);
```
This method will output the regular HTML as a string, which can be then placed inside a page body as part of the server response. On the client side, React detects the pre-rendered content and seamlessly picks up where it left off.',
          'multiple-choice',
          'advanced',
          5,
          '[{"id":"a","text":"Render on server with `ReactDOMServer.renderToString()` and hydrate on client","isCorrect":true},{"id":"b","text":"SSR is not supported in React","isCorrect":false},{"id":"c","text":"Use `ReactDOM.render()` on the server","isCorrect":false},{"id":"d","text":"SSR requires a special build of React","isCorrect":false}]',
          NULL,
          'Use `ReactDOMServer.renderToString()` on the server and `hydrateRoot` on the client for SSR.',
          NULL,
          ARRAY[]::text[],
          '["react","ssr","server-side-rendering","react-dom-server","hydration"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-049","original_type":"multiple-choice","topic":"Server-Side Rendering","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '397a57aa-58a8-4094-a7b0-e04e6638ac84',
          'How to enable production mode in React?',
          'You should use Webpack''s `DefinePlugin` method to set `NODE_ENV` to `production`, by which it strip out things like propType validation and extra warnings. Apart from this, if you minify the code, for example, Uglify''s dead-code elimination to strip out development only code and comments, it will drastically reduce the size of your bundle.',
          'multiple-choice',
          'intermediate',
          3,
          '[{"id":"a","text":"Set `NODE_ENV=production` using Webpack’s DefinePlugin","isCorrect":true},{"id":"b","text":"Production mode is enabled by default","isCorrect":false},{"id":"c","text":"Remove all console.log statements manually","isCorrect":false},{"id":"d","text":"Use `--prod` flag in the browser","isCorrect":false}]',
          NULL,
          'Set `NODE_ENV=production` via Webpack’s DefinePlugin to enable optimizations like propType stripping and minification.',
          NULL,
          ARRAY[]::text[],
          '["react","production","webpack","optimization","bundle"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-050","original_type":"multiple-choice","topic":"Build Tools & Workflow","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '94a63eac-101e-4445-83ad-b832f998ee15',
          'Do Hooks replace render props and higher-order components?',
          'Both render props and higher-order components render only a single child but in most of the cases Hooks are a simpler way to serve this by reducing nesting in your tree.',
          'multiple-choice',
          'intermediate',
          4,
          '[{"id":"a","text":"Yes, Hooks completely replace them and are always better","isCorrect":false},{"id":"b","text":"Hooks provide a simpler way to share logic and reduce nesting, but render props and HOCs are still valid patterns","isCorrect":true},{"id":"c","text":"No, Hooks cannot replace render props or HOCs","isCorrect":false},{"id":"d","text":"Hooks only work with class components","isCorrect":false}]',
          NULL,
          'Hooks simplify logic reuse without the nesting issues of render props or HOCs, though all three patterns can coexist.',
          NULL,
          ARRAY[]::text[],
          '["react","hooks","render-props","hoc","composition"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-051","original_type":"multiple-choice","topic":"Hooks","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'b1509e9f-ae7f-4f5c-948b-d647202eb3d5',
          'What is a switching component?',
          'A _switching component_ is a component that renders one of many components. We need to use object to map prop values to components.

For example, a switching component to display different pages based on `page` prop:
```jsx harmony
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import ServicesPage from "./ServicesPage";
import ContactPage from "./ContactPage";
const PAGES = {
  home: HomePage,
  about: AboutPage,
  services: ServicesPage,
  contact: ContactPage,
};
const Page = (props) => {
  const Handler = PAGES[props.page] || ContactPage;
  return <Handler {...props} />;
};
// The keys of the PAGES object can be used in the prop types to catch dev-time errors.
Page.propTypes = {
  page: PropTypes.oneOf(Object.keys(PAGES)).isRequired,
};
```',
          'multiple-choice',
          'intermediate',
          4,
          '[{"id":"a","text":"A component that toggles between light and dark mode","isCorrect":false},{"id":"b","text":"A component that renders one of many components based on a prop using an object map","isCorrect":true},{"id":"c","text":"A component that switches between class and function syntax","isCorrect":false},{"id":"d","text":"A built-in React component for routing","isCorrect":false}]',
          NULL,
          'A switching component uses a mapping object to dynamically render one of several components based on a prop, enabling clean page or view switching.',
          NULL,
          ARRAY[]::text[],
          '["react","switching-component","dynamic-rendering","components"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-052","original_type":"multiple-choice","topic":"Components","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '5d611d24-b2e4-4f94-b2b5-fd3c66255312',
          'What are React Mixins?',
          '_Mixins_ are a way to totally separate components to have a common functionality. Mixins **should not be used** and can be replaced with _higher-order components_ or _decorators_.

One of the most commonly used mixins is `PureRenderMixin`. You might be using it in some components to prevent unnecessary re-renders when the props and state are shallowly equal to the previous props and state:
```javascript
const PureRenderMixin = require("react-addons-pure-render-mixin");
const Button = React.createClass({
  mixins: [PureRenderMixin],
  // ...
});
```
<!-- TODO: mixins are deprecated -->',
          'multiple-choice',
          'intermediate',
          3,
          '[{"id":"a","text":"Mixins are the recommended way to share logic in modern React","isCorrect":false},{"id":"b","text":"Mixins are deprecated and should be replaced with HOCs, render props, or Hooks","isCorrect":true},{"id":"c","text":"Mixins work well with function components","isCorrect":false},{"id":"d","text":"Mixins are required for performance optimization","isCorrect":false}]',
          NULL,
          'Mixins were used in React.createClass to share logic but are deprecated. Modern alternatives include HOCs, render props, and Hooks.',
          NULL,
          ARRAY[]::text[],
          '["react","mixins","deprecated","hoc","reuse"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-053","original_type":"multiple-choice","topic":"Higher-Order Components","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '3a44c0c1-8aa6-44c2-8920-e3b00eac1f52',
          'What are the Pointer Events supported in React?',
          '_Pointer Events_ provide a unified way of handling all input events. In the old days we had a mouse and respective event listeners to handle them but nowadays we have many devices which don''t correlate to having a mouse, like phones with touch surface or pens. We need to remember that these events will only work in browsers that support the _Pointer Events_ specification.

The following event types are now available in _React DOM_:
1. `onPointerDown`
2. `onPointerMove`
3. `onPointerUp`
4. `onPointerCancel`
5. `onGotPointerCapture`
6. `onLostPointerCapture`
7. `onPointerEnter`
8. `onPointerLeave`
9. `onPointerOver`
10. `onPointerOut`',
          'multiple-choice',
          'intermediate',
          3,
          '[{"id":"a","text":"React only supports mouse and touch events separately","isCorrect":false},{"id":"b","text":"React supports Pointer Events like onPointerDown, onPointerMove, etc., for unified input handling","isCorrect":true},{"id":"c","text":"Pointer Events are not supported in React","isCorrect":false},{"id":"d","text":"Pointer Events only work in React Native","isCorrect":false}]',
          NULL,
          'React supports Pointer Events for unified input handling across mouse, touch, and pen devices, but only in browsers that support the Pointer Events API.',
          NULL,
          ARRAY[]::text[],
          '["react","pointer-events","touch","mouse","events"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-054","original_type":"multiple-choice","topic":"DOM Events","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'acdbc93f-14c7-4c89-a956-95df09a73b28',
          'Why should component names start with capital letter?',
          'If you are rendering your component using JSX, the name of that component has to begin with a capital letter otherwise React will throw an error as an unrecognized tag. This convention is because only HTML elements and SVG tags can begin with a lowercase letter.

```jsx harmony
function SomeComponent {
  // Code goes here
}
```
You can define function component whose name starts with lowercase letter, but when it''s imported it should have a capital letter. Here lowercase is fine:
```jsx harmony
function myComponent {
  render() {
    return <div />;
  }
}
export default myComponent;
```
While when imported in another file it should start with capital letter:
```jsx harmony
import MyComponent from "./myComponent";
```',
          'multiple-choice',
          'beginner',
          2,
          '[{"id":"a","text":"It’s a JavaScript syntax requirement","isCorrect":false},{"id":"b","text":"JSX uses lowercase for HTML elements; capital letters distinguish React components","isCorrect":true},{"id":"c","text":"It improves performance","isCorrect":false},{"id":"d","text":"It’s only required for class components","isCorrect":false}]',
          NULL,
          'JSX treats lowercase tags as HTML/SVG elements. Component names must start with a capital letter to be recognized as React components.',
          NULL,
          ARRAY[]::text[],
          '["react","jsx","component-naming","capital-letter"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-055","original_type":"multiple-choice","topic":"JSX","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '24637fbf-8f22-48eb-8017-23897131b1f2',
          'Are custom DOM attributes supported in React v16?',
          'Yes. In the past, React used to ignore unknown DOM attributes. If you wrote JSX with an attribute that React doesn''t recognize, React would just skip it.

For example, let''s take a look at the below attribute:
```jsx harmony
<div mycustomattribute={"something"} />
```
Would render an empty div to the DOM with React v15:
```html
<div />
```
In React v16 any unknown attributes will end up in the DOM:
```html
<div mycustomattribute="something" />
```
This is useful for supplying browser-specific non-standard attributes, trying new DOM APIs, and integrating with opinionated third-party libraries.',
          'true-false',
          'intermediate',
          3,
          '[{"id":"a","text":"True","isCorrect":true},{"id":"b","text":"False","isCorrect":false}]',
          NULL,
          'React v16 passes unknown attributes to the DOM, unlike v15 which ignored them. This enables custom attributes for browser APIs or third-party libraries.',
          NULL,
          ARRAY[]::text[],
          '["react","custom-attributes","react-v16","dom"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-056","original_type":"true-false","topic":"DOM Manipulation","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'acdb29c3-01c6-4bd2-aabc-53ff23dff5ee',
          'How to loop inside JSX?',
          'You can simply use `Array.prototype.map` with ES6 _arrow function_ syntax.

For example, the `items` array of objects is mapped into an array of components:
```jsx harmony
<tbody>
  {items.map((item) => (
    <SomeComponent key={item.id} name={item.name} />
  ))}
</tbody>
```
But you can''t iterate using `for` loop:
```jsx harmony
<tbody>
  for (let i = 0; i < items.length; i++) {
    <SomeComponent key={items[i].id} name={items[i].name} />
  }
</tbody>
```
This is because JSX tags are transpiled into _function calls_, and you can''t use statements inside expressions.',
          'multiple-choice',
          'beginner',
          2,
          '[{"id":"a","text":"Use `for` loops directly in JSX","isCorrect":false},{"id":"b","text":"Use `Array.prototype.map()` to transform arrays into JSX elements","isCorrect":true},{"id":"c","text":"Loops are not supported in JSX","isCorrect":false},{"id":"d","text":"Use `forEach` to render elements","isCorrect":false}]',
          NULL,
          'Use `Array.prototype.map()` to loop in JSX. `for` loops are statements and cannot be used inside JSX expressions.',
          NULL,
          ARRAY[]::text[],
          '["react","jsx","map","loops","arrays"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-057","original_type":"multiple-choice","topic":"Lists and Keys","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '01718ece-1da2-4fed-b2fb-4ca967d6e4a1',
          'How do you access props in attribute quotes?',
          'React (or JSX) doesn''t support variable interpolation inside an attribute value. The below representation won''t work:
```jsx harmony
<img className="image" src="images/{this.props.image}" />
```
But you can put any JS expression inside curly braces as the entire attribute value. So the below expression works:
```jsx harmony
<img className="image" src={"images/" + this.props.image} />
```
Using _template strings_ will also work:
```jsx harmony
<img className="image" src={`images/${this.props.image}`} />
```',
          'multiple-choice',
          'beginner',
          2,
          '[{"id":"a","text":"Use `{this.props.image}` inside quotes like `src=\"images/{this.props.image}\"`","isCorrect":false},{"id":"b","text":"Use expressions like `src={\"images/\" + this.props.image}` or template literals `src={`images/${this.props.image}`}`","isCorrect":true},{"id":"c","text":"Only static strings are allowed in attributes","isCorrect":false},{"id":"d","text":"Use `src={this.props.image}` without any path","isCorrect":false}]',
          NULL,
          'In JSX, attribute values must be JavaScript expressions wrapped in `{}`, not string interpolation with `{}` inside quotes.',
          NULL,
          ARRAY[]::text[],
          '["react","jsx","props","template-strings","attributes"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-058","original_type":"multiple-choice","topic":"Props","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'b75dfa96-1626-49e7-bf53-f088c55e3eb1',
          'What is React PropTypes array with shape?',
          'If you want to pass an array of objects to a component with a particular shape then use `React.PropTypes.shape()` as an argument to `React.PropTypes.arrayOf()`.

```javascript
ReactComponent.propTypes = {
  arrayWithShape: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      color: React.PropTypes.string.isRequired,
      fontSize: React.PropTypes.number.isRequired,
    })
  ).isRequired,
};
```',
          'multiple-choice',
          'intermediate',
          3,
          '[{"id":"a","text":"`PropTypes.array(PropTypes.shape({}))`","isCorrect":false},{"id":"b","text":"`PropTypes.arrayOf(PropTypes.shape({ color: PropTypes.string, fontSize: PropTypes.number }))`","isCorrect":true},{"id":"c","text":"`PropTypes.objectOf(PropTypes.array)`","isCorrect":false},{"id":"d","text":"`PropTypes.shape([PropTypes.object])`","isCorrect":false}]',
          NULL,
          'Use `PropTypes.arrayOf(PropTypes.shape({ ... }))` to validate an array of objects with a specific structure.',
          NULL,
          ARRAY[]::text[],
          '["react","proptypes","validation","array","shape"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-059","original_type":"multiple-choice","topic":"Props","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '01e38b35-eda7-48b2-b565-22d94c195440',
          'How to conditionally apply class attributes?',
          'You shouldn''t use curly braces inside quotes because it is going to be evaluated as a string.
```jsx harmony
<div className="btn-panel {this.props.visible ? ''show'' : ''hidden''}">
```
Instead you need to move curly braces outside (don''t forget to include spaces between class names):
```jsx harmony
<div className={''btn-panel '' + (this.props.visible ? ''show'' : ''hidden'')}>
```
_Template strings_ will also work:
```jsx harmony
<div className={`btn-panel ${this.props.visible ? ''show'' : ''hidden''}`}>
```',
          'multiple-choice',
          'beginner',
          2,
          '[{"id":"a","text":"Use `className=\"btn {visible ? ''active'' : ''''}\"`","isCorrect":false},{"id":"b","text":"Use `className={''btn '' + (visible ? ''active'' : '''')}` or template literals","isCorrect":true},{"id":"c","text":"Conditional classes are not supported","isCorrect":false},{"id":"d","text":"Use CSS-in-JS only for conditional styling","isCorrect":false}]',
          NULL,
          'Class names must be computed as JavaScript expressions outside quotes, using string concatenation or template literals.',
          NULL,
          ARRAY[]::text[],
          '["react","classname","conditional-styling","template-strings"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-060","original_type":"multiple-choice","topic":"CSS & Styling","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '3c8f4cc9-391b-4e18-8915-36c85d49c17b',
          'What is the difference between React and ReactDOM?',
          'The `react` package contains `React.createElement()`, `React.Component`, `React.Children`, and other helpers related to elements and component classes. You can think of these as the isomorphic or universal helpers that you need to build components. The `react-dom` package contains `ReactDOM.render()`, and in `react-dom/server` we have _server-side rendering_ support with `ReactDOMServer.renderToString()` and `ReactDOMServer.renderToStaticMarkup()`.',
          'multiple-choice',
          'intermediate',
          3,
          '[{"id":"a","text":"`react` handles DOM rendering; `react-dom` defines components","isCorrect":false},{"id":"b","text":"`react` provides core element/component APIs; `react-dom` provides DOM and SSR rendering methods","isCorrect":true},{"id":"c","text":"They are the same package","isCorrect":false},{"id":"d","text":"`react-dom` is only for server-side rendering","isCorrect":false}]',
          NULL,
          '`react` contains core helpers for elements and components; `react-dom` contains DOM-specific methods like `render()` and SSR utilities.',
          NULL,
          ARRAY[]::text[],
          '["react","react-dom","isomorphic","rendering"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-061","original_type":"multiple-choice","topic":"React DOM","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '362df4ea-38fa-4186-9976-c302ead8f2f4',
          'Why ReactDOM is separated from React?',
          'The React team worked on extracting all DOM-related features into a separate library called _ReactDOM_. React v0.14 is the first release in which the libraries are split. By looking at some of the packages, `react-native`, `react-art`, `react-canvas`, and `react-three`, it has become clear that the beauty and essence of React has nothing to do with browsers or the DOM.

To build more environments that React can render to, React team planned to split the main React package into two: `react` and `react-dom`. This paves the way to writing components that can be shared between the web version of React and React Native.',
          'multiple-choice',
          'intermediate',
          3,
          '[{"id":"a","text":"To reduce bundle size for web apps","isCorrect":false},{"id":"b","text":"To enable React to work across platforms like web and React Native by separating core from DOM-specific code","isCorrect":true},{"id":"c","text":"Because the DOM API is too complex","isCorrect":false},{"id":"d","text":"ReactDOM is deprecated","isCorrect":false}]',
          NULL,
          'Separating `react` from `react-dom` allows React to target multiple platforms (web, native, etc.) while sharing core logic.',
          NULL,
          ARRAY[]::text[],
          '["react","react-dom","react-native","cross-platform"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-062","original_type":"multiple-choice","topic":"React DOM","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '26df8624-4801-4d5b-88c4-72fe98fac3a7',
          'How to use React label element?',
          'If you try to render a `<label>` element bound to a text input using the standard `for` attribute, then it produces HTML missing that attribute and prints a warning to the console.
```jsx harmony
<label for={''user''}>{''User''}</label>
<input type={''text''} id={''user''} />
```
Since `for` is a reserved keyword in JavaScript, use `htmlFor` instead.
```jsx harmony
<label htmlFor={''user''}>{''User''}</label>
<input type={''text''} id={''user''} />
```',
          'multiple-choice',
          'beginner',
          2,
          '[{"id":"a","text":"Use `for` as in HTML","isCorrect":false},{"id":"b","text":"Use `htmlFor` because `for` is a reserved JavaScript keyword","isCorrect":true},{"id":"c","text":"Labels are not supported in React","isCorrect":false},{"id":"d","text":"Use `labelFor`","isCorrect":false}]',
          NULL,
          'Use `htmlFor` instead of `for` in JSX because `for` is a reserved JavaScript keyword.',
          NULL,
          ARRAY[]::text[],
          '["react","label","htmlfor","forms","accessibility"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-063","original_type":"multiple-choice","topic":"Forms","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '94684fad-1d6c-46df-ae7d-9bebef3014ef',
          'How to combine multiple inline style objects?',
          'You can use _spread operator_ in regular React:
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
```',
          'multiple-choice',
          'intermediate',
          3,
          '[{"id":"a","text":"Use `Object.assign()` only","isCorrect":false},{"id":"b","text":"Use spread operator `{...style1, ...style2}` in React web; array `[style1, style2]` in React Native","isCorrect":true},{"id":"c","text":"Inline styles cannot be combined","isCorrect":false},{"id":"d","text":"Use CSS classes instead","isCorrect":false}]',
          NULL,
          'In React (web), use the spread operator `{...obj1, ...obj2}` to merge style objects. In React Native, use array notation `[obj1, obj2]`.',
          NULL,
          ARRAY[]::text[],
          '["react","inline-styles","spread","styling"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-064","original_type":"multiple-choice","topic":"CSS & Styling","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'd1a13831-abf7-448e-8eaf-2d5f2fb872af',
          'How to re-render the view when the browser is resized?',
          'You can use the `useState` hook to manage the width and height state variables, and the `useEffect` hook to add and remove the `resize` event listener. The `[]` dependency array passed to useEffect ensures that the effect only runs once (on mount) and not on every re-render.
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
```',
          'multiple-choice',
          'intermediate',
          4,
          '[{"id":"a","text":"Use `window.onresize = () => {}` directly in render","isCorrect":false},{"id":"b","text":"Use `useEffect` to add/remove `resize` listener and update state","isCorrect":true},{"id":"c","text":"Resize events are handled automatically by React","isCorrect":false},{"id":"d","text":"Use `setInterval` to check window size","isCorrect":false}]',
          NULL,
          'Use `useEffect` to add a `resize` event listener on mount and remove it on unmount, updating state with new dimensions.',
          NULL,
          ARRAY[]::text[],
          '["react","useeffect","resize","event-listeners","hooks"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-065","original_type":"multiple-choice","topic":"Hooks","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '3b92786c-f573-4708-ab24-596a690cd202',
          'How to pretty print JSON with React?',
          'We can use `<pre>` tag so that the formatting of the `JSON.stringify()` is retained:
```jsx harmony
const data = { name: "John", age: 42 };
function User {
    return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
const container = createRoot(document.getElementById("container"));
container.render(<User />);
```',
          'multiple-choice',
          'beginner',
          2,
          '[{"id":"a","text":"Use `console.log` inside JSX","isCorrect":false},{"id":"b","text":"Use `<pre>{JSON.stringify(data, null, 2)}</pre>` to preserve formatting","isCorrect":true},{"id":"c","text":"JSON cannot be displayed in React","isCorrect":false},{"id":"d","text":"Use `<code>` without `JSON.stringify`","isCorrect":false}]',
          NULL,
          'Wrap `JSON.stringify(data, null, 2)` in a `<pre>` tag to preserve indentation and formatting in the browser.',
          NULL,
          ARRAY[]::text[],
          '["react","json","debugging","pre","stringify"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-066","original_type":"multiple-choice","topic":"Debugging","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '15e3b119-a1d3-452e-adde-4499cf146b03',
          'Why can''t you update props in React?',
          'The React philosophy is that props should be _immutable_(read only) and _top-down_. This means that a parent can send any prop values to a child, but the child can''t modify received props.',
          'multiple-choice',
          'beginner',
          2,
          '[{"id":"a","text":"Props are mutable and can be updated freely","isCorrect":false},{"id":"b","text":"Props are immutable to enforce unidirectional data flow and predictability","isCorrect":true},{"id":"c","text":"Only class components can update props","isCorrect":false},{"id":"d","text":"Props are updated automatically by React","isCorrect":false}]',
          NULL,
          'Props are read-only to enforce unidirectional data flow and prevent side effects. Children must request changes via callbacks.',
          NULL,
          ARRAY[]::text[],
          '["react","props","immutability","data-flow"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-067","original_type":"multiple-choice","topic":"Props","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '59029c3f-a7ed-4d8a-a965-5050fcaeb2d3',
          'How to focus an input element on page load?',
          'You need to use `useEffect` hook to set focus on input field during page load time for functional component.
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
```',
          'multiple-choice',
          'intermediate',
          3,
          '[{"id":"a","text":"Add `autoFocus` prop to the input","isCorrect":true},{"id":"b","text":"Use `useRef` and `useEffect` to manually focus the input","isCorrect":true},{"id":"c","text":"Both `autoFocus` and `useRef`/`useEffect` are valid approaches","isCorrect":true},{"id":"d","text":"It''s not possible to focus on page load","isCorrect":false}]',
          NULL,
          'Use `useRef` to get a reference to the input and `useEffect` to call `.focus()` on mount.',
          NULL,
          ARRAY[]::text[],
          '["react","useeffect","useRef","focus","dom"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-068","original_type":"multiple-choice","topic":"Refs","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );