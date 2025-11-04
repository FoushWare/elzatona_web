-- Batch 3: Questions 41-60
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES
('aaf6b912-ea2e-4d70-8ac5-f07c212a35ba', 'What is ReactDOMServer?', 'The `ReactDOMServer` object enables you to render components to static markup (typically used on node server). This object is mainly used for _server-side rendering_ (SSR). The following methods can be used in both the server and browser environments:
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
```', 'multiple-choice', 'intermediate', 4, '[{"id":"a","text":"A tool for client-side hydration only","isCorrect":false},{"id":"b","text":"An object with methods like renderToString() for server-side rendering","isCorrect":true},{"id":"c","text":"A replacement for react-dom in the browser","isCorrect":false},{"id":"d","text":"Used for testing components","isCorrect":false}]', NULL, '`ReactDOMServer` provides methods like `renderToString` for server-side rendering, enabling SEO-friendly and fast initial loads.', NULL, ARRAY[]::text[], ARRAY['react','ssr','react-dom-server','render-to-string','server-side'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-041","original_type":"multiple-choice","topic":"Server-Side Rendering","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('6346aa2b-eacc-486d-b974-ecbd0cd5dbcd', 'How to use innerHTML in React?', 'The `dangerouslySetInnerHTML` attribute is React''s replacement for using `innerHTML` in the browser DOM. Just like `innerHTML`, it is risky to use this attribute considering cross-site scripting (XSS) attacks. You just need to pass a `__html` object as key and HTML text as value.

In this example MyComponent uses `dangerouslySetInnerHTML` attribute for setting HTML markup:
```jsx harmony
function createMarkup() {
  return { __html: "First &middot; Second" };
}
function MyComponent() {
  return <div dangerouslySetInnerHTML={createMarkup()} />;
}
```', 'multiple-choice', 'intermediate', 3, '[{"id":"a","text":"Use `innerHTML` directly on JSX elements","isCorrect":false},{"id":"b","text":"Use `dangerouslySetInnerHTML={{ __html: string }}` with caution","isCorrect":true},{"id":"c","text":"It’s not possible to render HTML in React","isCorrect":false},{"id":"d","text":"Use `React.renderHTML()`","isCorrect":false}]', NULL, '`dangerouslySetInnerHTML` is React’s way to set raw HTML, but it’s dangerous and should be used cautiously to avoid XSS.', NULL, ARRAY[]::text[], ARRAY['react','dangerouslysetinnerhtml','xss','dom','security'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-042","original_type":"multiple-choice","topic":"DOM Manipulation","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('348203e5-c5c4-4a54-b207-6b403b39c135', 'How to apply styles in React?', 'The `style` attribute accepts a JavaScript object with camelCased properties rather than a CSS string. This is consistent with the DOM style JavaScript property, is more efficient, and prevents XSS security holes.
```jsx harmony
const divStyle = {
  color: "blue",
  backgroundImage: "url(" + imgUrl + ")",
};
function HelloWorldComponent() {
  return <div style={divStyle}>Hello World!</div>;
}
```
Style keys are camelCased in order to be consistent with accessing the properties on DOM nodes in JavaScript (e.g. `node.style.backgroundImage`).', 'multiple-choice', 'beginner', 2, '[{"id":"a","text":"Use CSS strings like `style=\\"color: blue\\"`","isCorrect":false},{"id":"b","text":"Use camelCased JavaScript objects: `style={{ backgroundColor: ''blue'' }}`","isCorrect":true},{"id":"c","text":"Only external CSS files are allowed","isCorrect":false},{"id":"d","text":"Styles must be defined in a separate CSS module","isCorrect":false}]', NULL, 'React uses camelCased JavaScript objects for inline styles (e.g., `backgroundColor`), not CSS strings.', NULL, ARRAY[]::text[], ARRAY['react','styles','inline-styles','camelcase','css'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-043","original_type":"multiple-choice","topic":"CSS & Styling","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('487e6aa7-1571-4720-ba4f-10bcac06fc21', 'How are events different in React?', 'Handling events in React elements has some syntactic differences:
1. React event handlers are named using camelCase, rather than lowercase.
2. With JSX you pass a function as the event handler, rather than a string.', 'multiple-choice', 'beginner', 2, '[{"id":"a","text":"Event names are lowercase and handlers are strings","isCorrect":false},{"id":"b","text":"Event names use camelCase and handlers are functions","isCorrect":true},{"id":"c","text":"Events are handled the same as in HTML","isCorrect":false},{"id":"d","text":"React doesn’t support events","isCorrect":false}]', NULL, 'React uses camelCase for event names (e.g., `onClick`) and passes functions, not strings, as handlers.', NULL, ARRAY[]::text[], ARRAY['react','events','event-handling','camelcase','jsx'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-044","original_type":"multiple-choice","topic":"DOM Events","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('d3cf2435-8307-4295-a1b3-878810f9bf10', 'What is the impact of using indexes as keys?', 'Keys should be stable, predictable, and unique so that React can keep track of elements.

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

**Note:** If you don''t specify `key` prop at all, React will use index as a key''s value while iterating over an array of data.', 'multiple-choice', 'intermediate', 4, '[{"id":"a","text":"It’s always safe and recommended","isCorrect":false},{"id":"b","text":"It can cause bugs with reordering or filtering; use stable IDs instead","isCorrect":true},{"id":"c","text":"Keys are optional and have no impact","isCorrect":false},{"id":"d","text":"Indexes improve performance","isCorrect":false}]', NULL, 'Using indexes as keys can cause bugs when lists are reordered or filtered. Use stable IDs instead.', NULL, ARRAY[]::text[], ARRAY['react','keys','lists','index','performance'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-045","original_type":"multiple-choice","topic":"Lists and Keys","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"540c20e9-c800-48de-9185-e611c10d37d5"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('b2607936-f125-499f-af29-161b539b6ea3', 'How do you conditionally render components?', 'In some cases you want to render different components depending on some state. JSX does not render `false` or `undefined`, so you can use conditional _short-circuiting_ to render a given part of your component only if a certain condition is true.
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
```', 'multiple-choice', 'beginner', 2, '[{"id":"a","text":"Use `if` statements directly in JSX","isCorrect":false},{"id":"b","text":"Use `&&` for truthy checks and ternary for if-else logic","isCorrect":true},{"id":"c","text":"Conditional rendering is not supported","isCorrect":false},{"id":"d","text":"Always use `switch` statements","isCorrect":false}]', NULL, 'Use `&&` for simple conditions and ternary (`? :`) for if-else in JSX.', NULL, ARRAY[]::text[], ARRAY['react','conditional-rendering','ternary','short-circuit','jsx'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-046","original_type":"multiple-choice","topic":"Conditional Rendering","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('d4dafbe9-c3ca-44c1-b540-64e2ed92b2ef', 'Why we need to be careful when spreading props on DOM elements?', 'When we _spread props_ we run into the risk of adding unknown HTML attributes, which is a bad practice. Instead we can use prop destructuring with `...rest` operator, so it will add only required props.
For example,
```jsx harmony
const ComponentA = () => (
  <ComponentB isDisplay={true} className={"componentStyle"} />
);
const ComponentB = ({ isDisplay, ...domProps }) => (
  <div {...domProps}>{"ComponentB"}</div>
);
```', 'multiple-choice', 'intermediate', 3, '[{"id":"a","text":"Spreading props is always safe","isCorrect":false},{"id":"b","text":"It can add invalid HTML attributes; destructure to avoid this","isCorrect":true},{"id":"c","text":"DOM elements ignore extra props","isCorrect":false},{"id":"d","text":"You must spread all props for components to work","isCorrect":false}]', NULL, 'Spreading all props onto DOM elements can pass invalid HTML attributes. Destructure to separate DOM props from custom ones.', NULL, ARRAY[]::text[], ARRAY['react','spread','props','rest','dom'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-047","original_type":"multiple-choice","topic":"Props","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"accaeeab-e45f-4999-a647-4e5126bcd487"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('1ee2b86b-bfbb-4f41-8d36-d0598786484f', 'How do you memoize a component?', 'Since React v16.6.0, we have a `React.memo`. It provides a higher order component which memoizes component unless the props change. To use it, simply wrap the component using React.memo before you use it.
```js
const MemoComponent = React.memo(function MemoComponent(props) {
  /* render using props */
});
OR;
export default React.memo(MyFunctionComponent);
```', 'multiple-choice', 'intermediate', 4, '[{"id":"a","text":"Use `React.memo()` to prevent unnecessary re-renders when props are unchanged","isCorrect":true},{"id":"b","text":"Memoization is only for class components","isCorrect":false},{"id":"c","text":"All components are memoized by default","isCorrect":false},{"id":"d","text":"Use `useMemo` on the component itself","isCorrect":false}]', NULL, '`React.memo` prevents re-renders of function components when props haven’t changed.', NULL, ARRAY[]::text[], ARRAY['react','memo','performance','re-render','optimization'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-048","original_type":"multiple-choice","topic":"Performance Optimization","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('c5b3b0f0-27f7-46aa-8fc7-ef71a1ee233d', 'How do you implement Server Side Rendering or SSR?', 'React is already equipped to handle rendering on Node servers. A special version of the DOM renderer is available, which follows the same pattern as on the client side.
```jsx harmony
import ReactDOMServer from "react-dom/server";
import App from "./App";
ReactDOMServer.renderToString(<App />);
```
This method will output the regular HTML as a string, which can be then placed inside a page body as part of the server response. On the client side, React detects the pre-rendered content and seamlessly picks up where it left off.', 'multiple-choice', 'advanced', 5, '[{"id":"a","text":"Render on server with `ReactDOMServer.renderToString()` and hydrate on client","isCorrect":true},{"id":"b","text":"SSR is not supported in React","isCorrect":false},{"id":"c","text":"Use `ReactDOM.render()` on the server","isCorrect":false},{"id":"d","text":"SSR requires a special build of React","isCorrect":false}]', NULL, 'Use `ReactDOMServer.renderToString()` on the server and `hydrateRoot` on the client for SSR.', NULL, ARRAY[]::text[], ARRAY['react','ssr','server-side-rendering','react-dom-server','hydration'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-049","original_type":"multiple-choice","topic":"Server-Side Rendering","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('a47eab13-92bb-47b4-a18d-55525cf78c45', 'How to enable production mode in React?', 'You should use Webpack''s `DefinePlugin` method to set `NODE_ENV` to `production`, by which it strip out things like propType validation and extra warnings. Apart from this, if you minify the code, for example, Uglify''s dead-code elimination to strip out development only code and comments, it will drastically reduce the size of your bundle.', 'multiple-choice', 'intermediate', 3, '[{"id":"a","text":"Set `NODE_ENV=production` using Webpack’s DefinePlugin","isCorrect":true},{"id":"b","text":"Production mode is enabled by default","isCorrect":false},{"id":"c","text":"Remove all console.log statements manually","isCorrect":false},{"id":"d","text":"Use `--prod` flag in the browser","isCorrect":false}]', NULL, 'Set `NODE_ENV=production` via Webpack’s DefinePlugin to enable optimizations like propType stripping and minification.', NULL, ARRAY[]::text[], ARRAY['react','production','webpack','optimization','bundle'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-050","original_type":"multiple-choice","topic":"Build Tools & Workflow","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('9a3e5075-460b-41ad-8b47-be33edfe8371', 'Do Hooks replace render props and higher-order components?', 'Both render props and higher-order components render only a single child but in most of the cases Hooks are a simpler way to serve this by reducing nesting in your tree.', 'multiple-choice', 'intermediate', 4, '[{"id":"a","text":"Yes, Hooks completely replace them and are always better","isCorrect":false},{"id":"b","text":"Hooks provide a simpler way to share logic and reduce nesting, but render props and HOCs are still valid patterns","isCorrect":true},{"id":"c","text":"No, Hooks cannot replace render props or HOCs","isCorrect":false},{"id":"d","text":"Hooks only work with class components","isCorrect":false}]', NULL, 'Hooks simplify logic reuse without the nesting issues of render props or HOCs, though all three patterns can coexist.', NULL, ARRAY[]::text[], ARRAY['react','hooks','render-props','hoc','composition'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-051","original_type":"multiple-choice","topic":"Hooks","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"756586f8-23f1-4a1b-a75f-ad7914b047c3"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('650fe126-f0b5-4b10-b237-c3bd2a6bf6a5', 'What is a switching component?', 'A _switching component_ is a component that renders one of many components. We need to use object to map prop values to components.

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
```', 'multiple-choice', 'intermediate', 4, '[{"id":"a","text":"A component that toggles between light and dark mode","isCorrect":false},{"id":"b","text":"A component that renders one of many components based on a prop using an object map","isCorrect":true},{"id":"c","text":"A component that switches between class and function syntax","isCorrect":false},{"id":"d","text":"A built-in React component for routing","isCorrect":false}]', NULL, 'A switching component uses a mapping object to dynamically render one of several components based on a prop, enabling clean page or view switching.', NULL, ARRAY[]::text[], ARRAY['react','switching-component','dynamic-rendering','components'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-052","original_type":"multiple-choice","topic":"Components","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"759ee497-71fd-4347-9018-c9d62ba7470f"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('f9bbef22-5436-4082-9399-300e16be2f1f', 'What are React Mixins?', '_Mixins_ are a way to totally separate components to have a common functionality. Mixins **should not be used** and can be replaced with _higher-order components_ or _decorators_.

One of the most commonly used mixins is `PureRenderMixin`. You might be using it in some components to prevent unnecessary re-renders when the props and state are shallowly equal to the previous props and state:
```javascript
const PureRenderMixin = require("react-addons-pure-render-mixin");
const Button = React.createClass({
  mixins: [PureRenderMixin],
  // ...
});
```
<!-- TODO: mixins are deprecated -->', 'multiple-choice', 'intermediate', 3, '[{"id":"a","text":"Mixins are the recommended way to share logic in modern React","isCorrect":false},{"id":"b","text":"Mixins are deprecated and should be replaced with HOCs, render props, or Hooks","isCorrect":true},{"id":"c","text":"Mixins work well with function components","isCorrect":false},{"id":"d","text":"Mixins are required for performance optimization","isCorrect":false}]', NULL, 'Mixins were used in React.createClass to share logic but are deprecated. Modern alternatives include HOCs, render props, and Hooks.', NULL, ARRAY[]::text[], ARRAY['react','mixins','deprecated','hoc','reuse'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-053","original_type":"multiple-choice","topic":"Higher-Order Components","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"759ee497-71fd-4347-9018-c9d62ba7470f"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('d4dcaafc-37b2-4665-a6d2-574d0f082519', 'What are the Pointer Events supported in React?', '_Pointer Events_ provide a unified way of handling all input events. In the old days we had a mouse and respective event listeners to handle them but nowadays we have many devices which don''t correlate to having a mouse, like phones with touch surface or pens. We need to remember that these events will only work in browsers that support the _Pointer Events_ specification.

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
10. `onPointerOut`', 'multiple-choice', 'intermediate', 3, '[{"id":"a","text":"React only supports mouse and touch events separately","isCorrect":false},{"id":"b","text":"React supports Pointer Events like onPointerDown, onPointerMove, etc., for unified input handling","isCorrect":true},{"id":"c","text":"Pointer Events are not supported in React","isCorrect":false},{"id":"d","text":"Pointer Events only work in React Native","isCorrect":false}]', NULL, 'React supports Pointer Events for unified input handling across mouse, touch, and pen devices, but only in browsers that support the Pointer Events API.', NULL, ARRAY[]::text[], ARRAY['react','pointer-events','touch','mouse','events'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-054","original_type":"multiple-choice","topic":"DOM Events","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('fff3d4bf-2a20-435e-b84f-8097c898960b', 'Why should component names start with capital letter?', 'If you are rendering your component using JSX, the name of that component has to begin with a capital letter otherwise React will throw an error as an unrecognized tag. This convention is because only HTML elements and SVG tags can begin with a lowercase letter.

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
```', 'multiple-choice', 'beginner', 2, '[{"id":"a","text":"It’s a JavaScript syntax requirement","isCorrect":false},{"id":"b","text":"JSX uses lowercase for HTML elements; capital letters distinguish React components","isCorrect":true},{"id":"c","text":"It improves performance","isCorrect":false},{"id":"d","text":"It’s only required for class components","isCorrect":false}]', NULL, 'JSX treats lowercase tags as HTML/SVG elements. Component names must start with a capital letter to be recognized as React components.', NULL, ARRAY[]::text[], ARRAY['react','jsx','component-naming','capital-letter'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-055","original_type":"multiple-choice","topic":"JSX","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"6a7eecc1-7cea-4bfd-84d3-e5ddff1d6624"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('14b0651c-9422-46ef-819f-c52fd29b8c51', 'Are custom DOM attributes supported in React v16?', 'Yes. In the past, React used to ignore unknown DOM attributes. If you wrote JSX with an attribute that React doesn''t recognize, React would just skip it.

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
This is useful for supplying browser-specific non-standard attributes, trying new DOM APIs, and integrating with opinionated third-party libraries.', 'multiple-choice', 'intermediate', 3, '[{"id":"a","text":"True","isCorrect":true},{"id":"b","text":"False","isCorrect":false}]', NULL, 'React v16 passes unknown attributes to the DOM, unlike v15 which ignored them. This enables custom attributes for browser APIs or third-party libraries.', NULL, ARRAY[]::text[], ARRAY['react','custom-attributes','react-v16','dom'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-056","original_type":"true-false","topic":"DOM Manipulation","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('002e7dfa-1be7-44bb-a4dd-f1ebb221df24', 'How to loop inside JSX?', 'You can simply use `Array.prototype.map` with ES6 _arrow function_ syntax.

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
This is because JSX tags are transpiled into _function calls_, and you can''t use statements inside expressions.', 'multiple-choice', 'beginner', 2, '[{"id":"a","text":"Use `for` loops directly in JSX","isCorrect":false},{"id":"b","text":"Use `Array.prototype.map()` to transform arrays into JSX elements","isCorrect":true},{"id":"c","text":"Loops are not supported in JSX","isCorrect":false},{"id":"d","text":"Use `forEach` to render elements","isCorrect":false}]', NULL, 'Use `Array.prototype.map()` to loop in JSX. `for` loops are statements and cannot be used inside JSX expressions.', NULL, ARRAY[]::text[], ARRAY['react','jsx','map','loops','arrays'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-057","original_type":"multiple-choice","topic":"Lists and Keys","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"540c20e9-c800-48de-9185-e611c10d37d5"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('5bed5845-7790-448b-a3fe-13411cbb83e9', 'How do you access props in attribute quotes?', 'React (or JSX) doesn''t support variable interpolation inside an attribute value. The below representation won''t work:
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
```', 'multiple-choice', 'beginner', 2, '[{"id":"a","text":"Use `{this.props.image}` inside quotes like `src=\\"images/{this.props.image}\\"`","isCorrect":false},{"id":"b","text":"Use expressions like `src={\\"images/\\" + this.props.image}` or template literals `src={`images/${this.props.image}`}`","isCorrect":true},{"id":"c","text":"Only static strings are allowed in attributes","isCorrect":false},{"id":"d","text":"Use `src={this.props.image}` without any path","isCorrect":false}]', NULL, 'In JSX, attribute values must be JavaScript expressions wrapped in `{}`, not string interpolation with `{}` inside quotes.', NULL, ARRAY[]::text[], ARRAY['react','jsx','props','template-strings','attributes'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-058","original_type":"multiple-choice","topic":"Props","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"accaeeab-e45f-4999-a647-4e5126bcd487"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('c3fa141d-112a-44ff-874a-8ec382184f1e', 'What is React PropTypes array with shape?', 'If you want to pass an array of objects to a component with a particular shape then use `React.PropTypes.shape()` as an argument to `React.PropTypes.arrayOf()`.

```javascript
ReactComponent.propTypes = {
  arrayWithShape: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      color: React.PropTypes.string.isRequired,
      fontSize: React.PropTypes.number.isRequired,
    })
  ).isRequired,
};
```', 'multiple-choice', 'intermediate', 3, '[{"id":"a","text":"`PropTypes.array(PropTypes.shape({}))`","isCorrect":false},{"id":"b","text":"`PropTypes.arrayOf(PropTypes.shape({ color: PropTypes.string, fontSize: PropTypes.number }))`","isCorrect":true},{"id":"c","text":"`PropTypes.objectOf(PropTypes.array)`","isCorrect":false},{"id":"d","text":"`PropTypes.shape([PropTypes.object])`","isCorrect":false}]', NULL, 'Use `PropTypes.arrayOf(PropTypes.shape({ ... }))` to validate an array of objects with a specific structure.', NULL, ARRAY[]::text[], ARRAY['react','proptypes','validation','array','shape'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-059","original_type":"multiple-choice","topic":"Props","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"accaeeab-e45f-4999-a647-4e5126bcd487"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('1b99317a-2595-43a1-87d2-a4fbcd56c42d', 'How to conditionally apply class attributes?', 'You shouldn''t use curly braces inside quotes because it is going to be evaluated as a string.
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
```', 'multiple-choice', 'beginner', 2, '[{"id":"a","text":"Use `className=\\"btn {visible ? ''active'' : ''''}\\"`","isCorrect":false},{"id":"b","text":"Use `className={''btn '' + (visible ? ''active'' : '''')}` or template literals","isCorrect":true},{"id":"c","text":"Conditional classes are not supported","isCorrect":false},{"id":"d","text":"Use CSS-in-JS only for conditional styling","isCorrect":false}]', NULL, 'Class names must be computed as JavaScript expressions outside quotes, using string concatenation or template literals.', NULL, ARRAY[]::text[], ARRAY['react','classname','conditional-styling','template-strings'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-060","original_type":"multiple-choice","topic":"CSS & Styling","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z');
