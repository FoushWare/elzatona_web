-- Batch 5: Questions 41-50
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES
('b19e2dc7-20c9-4210-a36d-081078bb6e95', 'What is ReactDOMServer?', 'The `ReactDOMServer` object enables you to render components to static markup (typically used on node server). This object is mainly used for _server-side rendering_ (SSR). The following methods can be used in both the server and browser environments:
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
```', 'multiple-choice', 'intermediate', 4, '[{"id":"a","text":"A tool for client-side hydration only","isCorrect":false},{"id":"b","text":"An object with methods like renderToString() for server-side rendering","isCorrect":true},{"id":"c","text":"A replacement for react-dom in the browser","isCorrect":false},{"id":"d","text":"Used for testing components","isCorrect":false}]', NULL, '`ReactDOMServer` provides methods like `renderToString` for server-side rendering, enabling SEO-friendly and fast initial loads.', NULL, ARRAY[], ARRAY['react','ssr','react-dom-server','render-to-string','server-side'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-041","original_type":"multiple-choice","topic":"Server-Side Rendering","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('a280afc6-365d-4781-b3a1-493c6b2af39d', 'How to use innerHTML in React?', 'The `dangerouslySetInnerHTML` attribute is React''s replacement for using `innerHTML` in the browser DOM. Just like `innerHTML`, it is risky to use this attribute considering cross-site scripting (XSS) attacks. You just need to pass a `__html` object as key and HTML text as value.

In this example MyComponent uses `dangerouslySetInnerHTML` attribute for setting HTML markup:
```jsx harmony
function createMarkup() {
  return { __html: "First &middot; Second" };
}
function MyComponent() {
  return <div dangerouslySetInnerHTML={createMarkup()} />;
}
```', 'multiple-choice', 'intermediate', 3, '[{"id":"a","text":"Use `innerHTML` directly on JSX elements","isCorrect":false},{"id":"b","text":"Use `dangerouslySetInnerHTML={{ __html: string }}` with caution","isCorrect":true},{"id":"c","text":"It’s not possible to render HTML in React","isCorrect":false},{"id":"d","text":"Use `React.renderHTML()`","isCorrect":false}]', NULL, '`dangerouslySetInnerHTML` is React’s way to set raw HTML, but it’s dangerous and should be used cautiously to avoid XSS.', NULL, ARRAY[], ARRAY['react','dangerouslysetinnerhtml','xss','dom','security'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-042","original_type":"multiple-choice","topic":"DOM Manipulation","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('7075be3b-3f63-4866-819e-b698327178c3', 'How to apply styles in React?', 'The `style` attribute accepts a JavaScript object with camelCased properties rather than a CSS string. This is consistent with the DOM style JavaScript property, is more efficient, and prevents XSS security holes.
```jsx harmony
const divStyle = {
  color: "blue",
  backgroundImage: "url(" + imgUrl + ")",
};
function HelloWorldComponent() {
  return <div style={divStyle}>Hello World!</div>;
}
```
Style keys are camelCased in order to be consistent with accessing the properties on DOM nodes in JavaScript (e.g. `node.style.backgroundImage`).', 'multiple-choice', 'beginner', 2, '[{"id":"a","text":"Use CSS strings like `style=\"color: blue\"`","isCorrect":false},{"id":"b","text":"Use camelCased JavaScript objects: `style={{ backgroundColor: ''blue'' }}`","isCorrect":true},{"id":"c","text":"Only external CSS files are allowed","isCorrect":false},{"id":"d","text":"Styles must be defined in a separate CSS module","isCorrect":false}]', NULL, 'React uses camelCased JavaScript objects for inline styles (e.g., `backgroundColor`), not CSS strings.', NULL, ARRAY[], ARRAY['react','styles','inline-styles','camelcase','css'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-043","original_type":"multiple-choice","topic":"CSS & Styling","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('4cc6f550-b41c-41fd-9d02-beb0d800f106', 'How are events different in React?', 'Handling events in React elements has some syntactic differences:
1. React event handlers are named using camelCase, rather than lowercase.
2. With JSX you pass a function as the event handler, rather than a string.', 'multiple-choice', 'beginner', 2, '[{"id":"a","text":"Event names are lowercase and handlers are strings","isCorrect":false},{"id":"b","text":"Event names use camelCase and handlers are functions","isCorrect":true},{"id":"c","text":"Events are handled the same as in HTML","isCorrect":false},{"id":"d","text":"React doesn’t support events","isCorrect":false}]', NULL, 'React uses camelCase for event names (e.g., `onClick`) and passes functions, not strings, as handlers.', NULL, ARRAY[], ARRAY['react','events','event-handling','camelcase','jsx'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-044","original_type":"multiple-choice","topic":"DOM Events","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('755f5359-d5bd-49f5-9d95-f5484a6217b8', 'What is the impact of using indexes as keys?', 'Keys should be stable, predictable, and unique so that React can keep track of elements.

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

**Note:** If you don''t specify `key` prop at all, React will use index as a key''s value while iterating over an array of data.', 'multiple-choice', 'intermediate', 4, '[{"id":"a","text":"It’s always safe and recommended","isCorrect":false},{"id":"b","text":"It can cause bugs with reordering or filtering; use stable IDs instead","isCorrect":true},{"id":"c","text":"Keys are optional and have no impact","isCorrect":false},{"id":"d","text":"Indexes improve performance","isCorrect":false}]', NULL, 'Using indexes as keys can cause bugs when lists are reordered or filtered. Use stable IDs instead.', NULL, ARRAY[], ARRAY['react','keys','lists','index','performance'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-045","original_type":"multiple-choice","topic":"Lists and Keys","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"540c20e9-c800-48de-9185-e611c10d37d5"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('d33a3019-aef3-4ad1-b61f-756b94e7bcd5', 'How do you conditionally render components?', 'In some cases you want to render different components depending on some state. JSX does not render `false` or `undefined`, so you can use conditional _short-circuiting_ to render a given part of your component only if a certain condition is true.
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
```', 'multiple-choice', 'beginner', 2, '[{"id":"a","text":"Use `if` statements directly in JSX","isCorrect":false},{"id":"b","text":"Use `&&` for truthy checks and ternary for if-else logic","isCorrect":true},{"id":"c","text":"Conditional rendering is not supported","isCorrect":false},{"id":"d","text":"Always use `switch` statements","isCorrect":false}]', NULL, 'Use `&&` for simple conditions and ternary (`? :`) for if-else in JSX.', NULL, ARRAY[], ARRAY['react','conditional-rendering','ternary','short-circuit','jsx'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-046","original_type":"multiple-choice","topic":"Conditional Rendering","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('c080ee2f-ed9b-4884-a61d-52dde3a58672', 'Why we need to be careful when spreading props on DOM elements?', 'When we _spread props_ we run into the risk of adding unknown HTML attributes, which is a bad practice. Instead we can use prop destructuring with `...rest` operator, so it will add only required props.
For example,
```jsx harmony
const ComponentA = () => (
  <ComponentB isDisplay={true} className={"componentStyle"} />
);
const ComponentB = ({ isDisplay, ...domProps }) => (
  <div {...domProps}>{"ComponentB"}</div>
);
```', 'multiple-choice', 'intermediate', 3, '[{"id":"a","text":"Spreading props is always safe","isCorrect":false},{"id":"b","text":"It can add invalid HTML attributes; destructure to avoid this","isCorrect":true},{"id":"c","text":"DOM elements ignore extra props","isCorrect":false},{"id":"d","text":"You must spread all props for components to work","isCorrect":false}]', NULL, 'Spreading all props onto DOM elements can pass invalid HTML attributes. Destructure to separate DOM props from custom ones.', NULL, ARRAY[], ARRAY['react','spread','props','rest','dom'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-047","original_type":"multiple-choice","topic":"Props","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"accaeeab-e45f-4999-a647-4e5126bcd487"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('f64b77dc-ca10-4bd6-9eea-6f5527e8066c', 'How do you memoize a component?', 'Since React v16.6.0, we have a `React.memo`. It provides a higher order component which memoizes component unless the props change. To use it, simply wrap the component using React.memo before you use it.
```js
const MemoComponent = React.memo(function MemoComponent(props) {
  /* render using props */
});
OR;
export default React.memo(MyFunctionComponent);
```', 'multiple-choice', 'intermediate', 4, '[{"id":"a","text":"Use `React.memo()` to prevent unnecessary re-renders when props are unchanged","isCorrect":true},{"id":"b","text":"Memoization is only for class components","isCorrect":false},{"id":"c","text":"All components are memoized by default","isCorrect":false},{"id":"d","text":"Use `useMemo` on the component itself","isCorrect":false}]', NULL, '`React.memo` prevents re-renders of function components when props haven’t changed.', NULL, ARRAY[], ARRAY['react','memo','performance','re-render','optimization'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-048","original_type":"multiple-choice","topic":"Performance Optimization","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('404bcbc3-e07a-45e0-af5b-f64370596f29', 'How do you implement Server Side Rendering or SSR?', 'React is already equipped to handle rendering on Node servers. A special version of the DOM renderer is available, which follows the same pattern as on the client side.
```jsx harmony
import ReactDOMServer from "react-dom/server";
import App from "./App";
ReactDOMServer.renderToString(<App />);
```
This method will output the regular HTML as a string, which can be then placed inside a page body as part of the server response. On the client side, React detects the pre-rendered content and seamlessly picks up where it left off.', 'multiple-choice', 'advanced', 5, '[{"id":"a","text":"Render on server with `ReactDOMServer.renderToString()` and hydrate on client","isCorrect":true},{"id":"b","text":"SSR is not supported in React","isCorrect":false},{"id":"c","text":"Use `ReactDOM.render()` on the server","isCorrect":false},{"id":"d","text":"SSR requires a special build of React","isCorrect":false}]', NULL, 'Use `ReactDOMServer.renderToString()` on the server and `hydrateRoot` on the client for SSR.', NULL, ARRAY[], ARRAY['react','ssr','server-side-rendering','react-dom-server','hydration'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-049","original_type":"multiple-choice","topic":"Server-Side Rendering","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('c0cf1ee5-2ce1-4f9d-924d-5b766e105523', 'How to enable production mode in React?', 'You should use Webpack''s `DefinePlugin` method to set `NODE_ENV` to `production`, by which it strip out things like propType validation and extra warnings. Apart from this, if you minify the code, for example, Uglify''s dead-code elimination to strip out development only code and comments, it will drastically reduce the size of your bundle.', 'multiple-choice', 'intermediate', 3, '[{"id":"a","text":"Set `NODE_ENV=production` using Webpack’s DefinePlugin","isCorrect":true},{"id":"b","text":"Production mode is enabled by default","isCorrect":false},{"id":"c","text":"Remove all console.log statements manually","isCorrect":false},{"id":"d","text":"Use `--prod` flag in the browser","isCorrect":false}]', NULL, 'Set `NODE_ENV=production` via Webpack’s DefinePlugin to enable optimizations like propType stripping and minification.', NULL, ARRAY[], ARRAY['react','production','webpack','optimization','bundle'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-050","original_type":"multiple-choice","topic":"Build Tools & Workflow","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z');
