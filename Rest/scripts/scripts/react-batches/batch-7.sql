-- Batch 7: Questions 61-70
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES
('efefadd2-d15d-45a1-a66b-d75f2ce930a0', 'What is the difference between React and ReactDOM?', 'The `react` package contains `React.createElement()`, `React.Component`, `React.Children`, and other helpers related to elements and component classes. You can think of these as the isomorphic or universal helpers that you need to build components. The `react-dom` package contains `ReactDOM.render()`, and in `react-dom/server` we have _server-side rendering_ support with `ReactDOMServer.renderToString()` and `ReactDOMServer.renderToStaticMarkup()`.', 'multiple-choice', 'intermediate', 3, '[{"id":"a","text":"`react` handles DOM rendering; `react-dom` defines components","isCorrect":false},{"id":"b","text":"`react` provides core element/component APIs; `react-dom` provides DOM and SSR rendering methods","isCorrect":true},{"id":"c","text":"They are the same package","isCorrect":false},{"id":"d","text":"`react-dom` is only for server-side rendering","isCorrect":false}]', NULL, '`react` contains core helpers for elements and components; `react-dom` contains DOM-specific methods like `render()` and SSR utilities.', NULL, ARRAY[], ARRAY['react','react-dom','isomorphic','rendering'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-061","original_type":"multiple-choice","topic":"React DOM","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('5fdaee2f-68ff-42aa-92de-921383e057f1', 'Why ReactDOM is separated from React?', 'The React team worked on extracting all DOM-related features into a separate library called _ReactDOM_. React v0.14 is the first release in which the libraries are split. By looking at some of the packages, `react-native`, `react-art`, `react-canvas`, and `react-three`, it has become clear that the beauty and essence of React has nothing to do with browsers or the DOM.

To build more environments that React can render to, React team planned to split the main React package into two: `react` and `react-dom`. This paves the way to writing components that can be shared between the web version of React and React Native.', 'multiple-choice', 'intermediate', 3, '[{"id":"a","text":"To reduce bundle size for web apps","isCorrect":false},{"id":"b","text":"To enable React to work across platforms like web and React Native by separating core from DOM-specific code","isCorrect":true},{"id":"c","text":"Because the DOM API is too complex","isCorrect":false},{"id":"d","text":"ReactDOM is deprecated","isCorrect":false}]', NULL, 'Separating `react` from `react-dom` allows React to target multiple platforms (web, native, etc.) while sharing core logic.', NULL, ARRAY[], ARRAY['react','react-dom','react-native','cross-platform'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-062","original_type":"multiple-choice","topic":"React DOM","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('5008517b-6fcc-4c3c-8f70-785377d0b47a', 'How to use React label element?', 'If you try to render a `<label>` element bound to a text input using the standard `for` attribute, then it produces HTML missing that attribute and prints a warning to the console.
```jsx harmony
<label for={''user''}>{''User''}</label>
<input type={''text''} id={''user''} />
```
Since `for` is a reserved keyword in JavaScript, use `htmlFor` instead.
```jsx harmony
<label htmlFor={''user''}>{''User''}</label>
<input type={''text''} id={''user''} />
```', 'multiple-choice', 'beginner', 2, '[{"id":"a","text":"Use `for` as in HTML","isCorrect":false},{"id":"b","text":"Use `htmlFor` because `for` is a reserved JavaScript keyword","isCorrect":true},{"id":"c","text":"Labels are not supported in React","isCorrect":false},{"id":"d","text":"Use `labelFor`","isCorrect":false}]', NULL, 'Use `htmlFor` instead of `for` in JSX because `for` is a reserved JavaScript keyword.', NULL, ARRAY[], ARRAY['react','label','htmlfor','forms','accessibility'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-063","original_type":"multiple-choice","topic":"Forms","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('422506bd-a04a-440d-91ff-e49bc405d17b', 'How to combine multiple inline style objects?', 'You can use _spread operator_ in regular React:
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
```', 'multiple-choice', 'intermediate', 3, '[{"id":"a","text":"Use `Object.assign()` only","isCorrect":false},{"id":"b","text":"Use spread operator `{...style1, ...style2}` in React web; array `[style1, style2]` in React Native","isCorrect":true},{"id":"c","text":"Inline styles cannot be combined","isCorrect":false},{"id":"d","text":"Use CSS classes instead","isCorrect":false}]', NULL, 'In React (web), use the spread operator `{...obj1, ...obj2}` to merge style objects. In React Native, use array notation `[obj1, obj2]`.', NULL, ARRAY[], ARRAY['react','inline-styles','spread','styling'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-064","original_type":"multiple-choice","topic":"CSS & Styling","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('b1f850ee-4067-4acc-82b2-b1f3bb2965c5', 'How to re-render the view when the browser is resized?', 'You can use the `useState` hook to manage the width and height state variables, and the `useEffect` hook to add and remove the `resize` event listener. The `[]` dependency array passed to useEffect ensures that the effect only runs once (on mount) and not on every re-render.
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
```', 'multiple-choice', 'intermediate', 4, '[{"id":"a","text":"Use `window.onresize = () => {}` directly in render","isCorrect":false},{"id":"b","text":"Use `useEffect` to add/remove `resize` listener and update state","isCorrect":true},{"id":"c","text":"Resize events are handled automatically by React","isCorrect":false},{"id":"d","text":"Use `setInterval` to check window size","isCorrect":false}]', NULL, 'Use `useEffect` to add a `resize` event listener on mount and remove it on unmount, updating state with new dimensions.', NULL, ARRAY[], ARRAY['react','useeffect','resize','event-listeners','hooks'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-065","original_type":"multiple-choice","topic":"Hooks","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"756586f8-23f1-4a1b-a75f-ad7914b047c3"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('e76313df-3023-42db-876e-a7a015cab5bb', 'How to pretty print JSON with React?', 'We can use `<pre>` tag so that the formatting of the `JSON.stringify()` is retained:
```jsx harmony
const data = { name: "John", age: 42 };
function User {
    return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
const container = createRoot(document.getElementById("container"));
container.render(<User />);
```', 'multiple-choice', 'beginner', 2, '[{"id":"a","text":"Use `console.log` inside JSX","isCorrect":false},{"id":"b","text":"Use `<pre>{JSON.stringify(data, null, 2)}</pre>` to preserve formatting","isCorrect":true},{"id":"c","text":"JSON cannot be displayed in React","isCorrect":false},{"id":"d","text":"Use `<code>` without `JSON.stringify`","isCorrect":false}]', NULL, 'Wrap `JSON.stringify(data, null, 2)` in a `<pre>` tag to preserve indentation and formatting in the browser.', NULL, ARRAY[], ARRAY['react','json','debugging','pre','stringify'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-066","original_type":"multiple-choice","topic":"Debugging","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('281454e3-fed9-4618-9046-bba9a03ae545', 'Why can''t you update props in React?', 'The React philosophy is that props should be _immutable_(read only) and _top-down_. This means that a parent can send any prop values to a child, but the child can''t modify received props.', 'multiple-choice', 'beginner', 2, '[{"id":"a","text":"Props are mutable and can be updated freely","isCorrect":false},{"id":"b","text":"Props are immutable to enforce unidirectional data flow and predictability","isCorrect":true},{"id":"c","text":"Only class components can update props","isCorrect":false},{"id":"d","text":"Props are updated automatically by React","isCorrect":false}]', NULL, 'Props are read-only to enforce unidirectional data flow and prevent side effects. Children must request changes via callbacks.', NULL, ARRAY[], ARRAY['react','props','immutability','data-flow'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-067","original_type":"multiple-choice","topic":"Props","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"accaeeab-e45f-4999-a647-4e5126bcd487"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('8fdcc2ec-4600-4269-bbef-a88b8832669c', 'How to focus an input element on page load?', 'You need to use `useEffect` hook to set focus on input field during page load time for functional component.
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
```', 'multiple-choice', 'intermediate', 3, '[{"id":"a","text":"Add `autoFocus` prop to the input","isCorrect":true},{"id":"b","text":"Use `useRef` and `useEffect` to manually focus the input","isCorrect":true},{"id":"c","text":"Both `autoFocus` and `useRef`/`useEffect` are valid approaches","isCorrect":true},{"id":"d","text":"It''s not possible to focus on page load","isCorrect":false}]', NULL, 'Use `useRef` to get a reference to the input and `useEffect` to call `.focus()` on mount.', NULL, ARRAY[], ARRAY['react','useeffect','useRef','focus','dom'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-068","original_type":"multiple-choice","topic":"Refs","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('b004afe4-6309-4caa-8a5e-e4f47d85f72e', 'How can we find the version of React at runtime in the browser?', 'You can use `React.version` to get the version.
```jsx harmony
const REACT_VERSION = React.version;
ReactDOM.render(
  <div>{`React version: ${REACT_VERSION}`}</div>,
  document.getElementById("app")
);
```', 'multiple-choice', 'beginner', 2, '[{"id":"a","text":"`React.version`","isCorrect":true},{"id":"b","text":"`ReactDOM.version`","isCorrect":false},{"id":"c","text":"`process.env.REACT_VERSION`","isCorrect":false},{"id":"d","text":"`package.json` version","isCorrect":false}]', NULL, 'Access `React.version` to get the current React version at runtime.', NULL, ARRAY[], ARRAY['react','version','debugging','runtime'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-069","original_type":"multiple-choice","topic":"Debugging","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('d645f1cc-57ba-4cd2-ba83-c4e92249c89a', 'How to add Google Analytics for React Router?', 'Add a listener on the `history` object to record each page view:
```javascript
history.listen(function (location) {
  window.ga("set", "page", location.pathname + location.search);
  window.ga("send", "pageview", location.pathname + location.search);
});
```', 'multiple-choice', 'intermediate', 4, '[{"id":"a","text":"Add GA script to every component","isCorrect":false},{"id":"b","text":"Use `history.listen()` to track location changes and send page views","isCorrect":true},{"id":"c","text":"GA is automatically integrated with React Router","isCorrect":false},{"id":"d","text":"Use `useEffect` in every route component","isCorrect":false}]', NULL, 'Use `history.listen()` to track route changes and send page views to Google Analytics.', NULL, ARRAY[], ARRAY['react','react-router','analytics','ga','history'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-070","original_type":"multiple-choice","topic":"React Router","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z');
