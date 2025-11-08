INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '2fd72ca5-a3f9-47b4-877a-b2e22e7ff1f1',
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
          ARRAY['react','events','event-handling','camelcase','jsx']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-044","original_type":"multiple-choice","topic":"DOM Events","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'bd086f2e-c89e-49aa-94ce-ca41103e3b94',
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
          ARRAY['react','keys','lists','index','performance']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-045","original_type":"multiple-choice","topic":"Lists and Keys","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '09f0c3f5-6f48-4b9a-8c60-cf0ce5356696',
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
          ARRAY['react','conditional-rendering','ternary','short-circuit','jsx']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-046","original_type":"multiple-choice","topic":"Conditional Rendering","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'f2810704-a4a7-4816-80d9-70c8e46a9474',
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
          ARRAY['react','spread','props','rest','dom']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-047","original_type":"multiple-choice","topic":"Props","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '44cc6ae6-c210-4b07-a627-e41f0b4d8863',
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
          ARRAY['react','memo','performance','re-render','optimization']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-048","original_type":"multiple-choice","topic":"Performance Optimization","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'dc36a068-2fad-49de-bd26-acf6e20d8a4c',
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
          ARRAY['react','ssr','server-side-rendering','react-dom-server','hydration']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-049","original_type":"multiple-choice","topic":"Server-Side Rendering","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '6dddec1a-bff9-4364-980f-b9f2f4b831a1',
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
          ARRAY['react','production','webpack','optimization','bundle']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-050","original_type":"multiple-choice","topic":"Build Tools & Workflow","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'ceecb117-6fa8-4683-a851-c4ea19c6004e',
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
          ARRAY['react','hooks','render-props','hoc','composition']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-051","original_type":"multiple-choice","topic":"Hooks","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '6b8e1d32-65e8-478c-9571-29b8a691d160',
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
          ARRAY['react','switching-component','dynamic-rendering','components']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-052","original_type":"multiple-choice","topic":"Components","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'bd42e97b-1c81-48d8-90a6-d51aa6e93ee2',
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
          ARRAY['react','mixins','deprecated','hoc','reuse']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-053","original_type":"multiple-choice","topic":"Higher-Order Components","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'e03c9b9f-2b08-443c-be08-3d9f75d1040d',
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
          ARRAY['react','pointer-events','touch','mouse','events']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-054","original_type":"multiple-choice","topic":"DOM Events","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '9155b25d-9848-409a-8054-efdeaeb7c505',
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
          ARRAY['react','jsx','component-naming','capital-letter']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-055","original_type":"multiple-choice","topic":"JSX","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'bb060471-e902-45d3-9387-68d15247af89',
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
          '[{"id":"true","text":"True","isCorrect":false},{"id":"false","text":"False","isCorrect":true}]',
          'false',
          'React v16 passes unknown attributes to the DOM, unlike v15 which ignored them. This enables custom attributes for browser APIs or third-party libraries.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','custom-attributes','react-v16','dom']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-056","original_type":"true-false","topic":"DOM Manipulation","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'e1c80530-2e20-49b3-8369-d385ced18133',
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
          ARRAY['react','jsx','map','loops','arrays']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-057","original_type":"multiple-choice","topic":"Lists and Keys","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'ace4ac9f-997f-465d-8c0c-e22f23e072c8',
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
          ARRAY['react','jsx','props','template-strings','attributes']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-058","original_type":"multiple-choice","topic":"Props","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '6fcc6a7a-c374-45c1-98be-b16c68cb9545',
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
          ARRAY['react','proptypes','validation','array','shape']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-059","original_type":"multiple-choice","topic":"Props","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'd2b9f5c5-e770-49d2-821d-e50b8e2a7dcd',
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
          ARRAY['react','classname','conditional-styling','template-strings']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-060","original_type":"multiple-choice","topic":"CSS & Styling","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '27d97146-f1aa-46af-b93e-17c500845749',
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
          ARRAY['react','react-dom','isomorphic','rendering']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-061","original_type":"multiple-choice","topic":"React DOM","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'f43019cd-551f-4ecd-a32a-7e9b63bb1a54',
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
          ARRAY['react','react-dom','react-native','cross-platform']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-062","original_type":"multiple-choice","topic":"React DOM","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '27190122-0e7f-4993-894c-1373302c3a45',
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
          ARRAY['react','label','htmlfor','forms','accessibility']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-063","original_type":"multiple-choice","topic":"Forms","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '04ff2406-649f-453b-95e6-f4824fe72d6c',
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
          ARRAY['react','inline-styles','spread','styling']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-064","original_type":"multiple-choice","topic":"CSS & Styling","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'bdb52294-1a4a-452a-89d7-1d8d0f90cbd4',
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
          ARRAY['react','useeffect','resize','event-listeners','hooks']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-065","original_type":"multiple-choice","topic":"Hooks","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '0dc8aa06-caf5-4af9-b093-1126cc3a42ba',
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
          ARRAY['react','json','debugging','pre','stringify']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-066","original_type":"multiple-choice","topic":"Debugging","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'f93c3486-090e-4987-8f31-af4d8e259323',
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
          ARRAY['react','props','immutability','data-flow']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-067","original_type":"multiple-choice","topic":"Props","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '7594892b-3180-478e-9c6d-3774426ef685',
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
          ARRAY['react','useeffect','useRef','focus','dom']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-068","original_type":"multiple-choice","topic":"Refs","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '399b06b5-8f0d-4222-b087-5e5fedcbfe94',
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
          ARRAY['react','version','debugging','runtime']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-069","original_type":"multiple-choice","topic":"Debugging","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '73231176-89f0-402a-a1d7-425170ed569b',
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
          ARRAY['react','react-router','analytics','ga','history']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-070","original_type":"multiple-choice","topic":"React Router","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '64c2b6d4-9054-4eec-a4bb-fa60a9db328f',
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
          ARRAY['react','vendor-prefixes','inline-styles','css','compatibility']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-071","original_type":"multiple-choice","topic":"CSS & Styling","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '42ecad22-7e25-44c3-99be-3bb49399bb4c',
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
          ARRAY['react','es6','import','export','modules']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-072","original_type":"multiple-choice","topic":"Components","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '927ff7a0-294d-4633-bc35-6ea40baffe1b',
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
          ARRAY['react','jsx','component-naming','exceptions']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-073","original_type":"multiple-choice","topic":"JSX","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'd630bc0c-e17e-4ada-9591-3fec6bbe5549',
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
          '[{"id":"true","text":"True","isCorrect":false},{"id":"false","text":"False","isCorrect":true}]',
          'false',
          'Yes, `async/await` is fully supported in modern React environments via Babel transpilation.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','async-await','fetch','hooks','babel']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-074","original_type":"true-false","topic":"Hooks","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '331cc3e9-7f0b-4b19-8fc0-e1718a1ae067',
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
          ARRAY['react','folder-structure','organization','best-practices']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-075","original_type":"multiple-choice","topic":"Project Structure","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'f2317399-d4fc-43c7-90b9-56e63c3c2e89',
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
          ARRAY['react','animation','react-transition-group','react-motion','ui']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-076","original_type":"multiple-choice","topic":"Animation","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'fad92ca4-b701-4e19-bc2e-905c591b702d',
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
          ARRAY['react','styling','design-system','constants','css']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-077","original_type":"multiple-choice","topic":"CSS & Styling","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '55071e87-d22b-48df-8bf1-6aea97cf876d',
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
          ARRAY['react','eslint','linting','accessibility','best-practices']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-078","original_type":"multiple-choice","topic":"Build Tools & Workflow","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '7ba45388-81b5-4745-87fd-9f2cdd29a01c',
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
          ARRAY['react','react-router','routing','spa','navigation']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-079","original_type":"multiple-choice","topic":"React Router","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '22491f34-3fa1-4cb8-aa57-a31415bccbeb',
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
          ARRAY['react','react-router','history','routing','browser-api']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-080","original_type":"multiple-choice","topic":"React Router","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '88bdbcd0-9e27-4350-86c3-1d7368d807e9',
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
          '40c68f4a-701c-42ea-a1d3-1adf6361110e',
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
          ARRAY['react','react-router','history','navigation','browser-api']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-082","original_type":"multiple-choice","topic":"React Router","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '7c40777f-ec5a-4942-bd8d-2777c11dd95b',
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
          ARRAY['react','react-router','navigation','programmatic','v4']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-083","original_type":"multiple-choice","topic":"React Router","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '5348a0d0-55ee-4a5c-a1e5-6995c3e8375e',
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
          ARRAY['react','react-router','query-parameters','url-search-params','v4']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-084","original_type":"multiple-choice","topic":"React Router","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'a140bfc9-12e2-49bb-bcac-07e02c7683d4',
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
          ARRAY['react','react-router','switch','routing','error']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-085","original_type":"multiple-choice","topic":"React Router","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '95c1e2e4-50d7-4ff8-9c31-32543a72c315',
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
          '0a575284-1498-44dd-bd4c-121180d506d0',
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
          ARRAY['react','react-router','not-found','404','default-route']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-087","original_type":"multiple-choice","topic":"React Router","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'b460b047-c0ae-45c7-a9e6-768ee29b144f',
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
          ARRAY['react','react-router','history','custom-history','v4']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-088","original_type":"multiple-choice","topic":"React Router","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'ee496e43-efa8-4432-8e4f-030394ecf636',
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
          ARRAY['react','react-router','redirect','authentication','login']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-089","original_type":"multiple-choice","topic":"React Router","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'edd6752a-dd78-473f-8b3f-f0738d96d103',
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
          ARRAY['react','intl','i18n','formatjs','localization']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-090","original_type":"multiple-choice","topic":"React Intl","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '79985f92-ef2e-447f-8a1f-a5cf537bbbdc',
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
          ARRAY['react','intl','i18n','formatting','localization']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-091","original_type":"multiple-choice","topic":"React Intl","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '94285012-2a99-49ba-974a-1dbc12d1f9ca',
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
          'dd910d20-f34d-422f-ae06-f46c962b439f',
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
          ARRAY['react','intl','placeholder','formatmessage','useintl']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-093","original_type":"multiple-choice","topic":"React Intl","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );;