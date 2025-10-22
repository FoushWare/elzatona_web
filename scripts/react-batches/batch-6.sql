-- Batch 6: Questions 51-60
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES
('76afbf0d-c191-4076-ae71-a8311845420b', 'Do Hooks replace render props and higher-order components?', 'Both render props and higher-order components render only a single child but in most of the cases Hooks are a simpler way to serve this by reducing nesting in your tree.', 'multiple-choice', 'intermediate', 4, '[{"id":"a","text":"Yes, Hooks completely replace them and are always better","isCorrect":false},{"id":"b","text":"Hooks provide a simpler way to share logic and reduce nesting, but render props and HOCs are still valid patterns","isCorrect":true},{"id":"c","text":"No, Hooks cannot replace render props or HOCs","isCorrect":false},{"id":"d","text":"Hooks only work with class components","isCorrect":false}]', NULL, 'Hooks simplify logic reuse without the nesting issues of render props or HOCs, though all three patterns can coexist.', NULL, ARRAY[], ARRAY['react','hooks','render-props','hoc','composition'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-051","original_type":"multiple-choice","topic":"Hooks","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"756586f8-23f1-4a1b-a75f-ad7914b047c3"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('a60ccb0d-63ae-4468-999a-04b86fbc7f7f', 'What is a switching component?', 'A _switching component_ is a component that renders one of many components. We need to use object to map prop values to components.

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
```', 'multiple-choice', 'intermediate', 4, '[{"id":"a","text":"A component that toggles between light and dark mode","isCorrect":false},{"id":"b","text":"A component that renders one of many components based on a prop using an object map","isCorrect":true},{"id":"c","text":"A component that switches between class and function syntax","isCorrect":false},{"id":"d","text":"A built-in React component for routing","isCorrect":false}]', NULL, 'A switching component uses a mapping object to dynamically render one of several components based on a prop, enabling clean page or view switching.', NULL, ARRAY[], ARRAY['react','switching-component','dynamic-rendering','components'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-052","original_type":"multiple-choice","topic":"Components","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"759ee497-71fd-4347-9018-c9d62ba7470f"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('63e97117-4137-42c2-8dbc-3482ebbcacdb', 'What are React Mixins?', '_Mixins_ are a way to totally separate components to have a common functionality. Mixins **should not be used** and can be replaced with _higher-order components_ or _decorators_.

One of the most commonly used mixins is `PureRenderMixin`. You might be using it in some components to prevent unnecessary re-renders when the props and state are shallowly equal to the previous props and state:
```javascript
const PureRenderMixin = require("react-addons-pure-render-mixin");
const Button = React.createClass({
  mixins: [PureRenderMixin],
  // ...
});
```
<!-- TODO: mixins are deprecated -->', 'multiple-choice', 'intermediate', 3, '[{"id":"a","text":"Mixins are the recommended way to share logic in modern React","isCorrect":false},{"id":"b","text":"Mixins are deprecated and should be replaced with HOCs, render props, or Hooks","isCorrect":true},{"id":"c","text":"Mixins work well with function components","isCorrect":false},{"id":"d","text":"Mixins are required for performance optimization","isCorrect":false}]', NULL, 'Mixins were used in React.createClass to share logic but are deprecated. Modern alternatives include HOCs, render props, and Hooks.', NULL, ARRAY[], ARRAY['react','mixins','deprecated','hoc','reuse'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-053","original_type":"multiple-choice","topic":"Higher-Order Components","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"759ee497-71fd-4347-9018-c9d62ba7470f"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('4ef47f15-752c-420c-9ff8-bee1d214fe20', 'What are the Pointer Events supported in React?', '_Pointer Events_ provide a unified way of handling all input events. In the old days we had a mouse and respective event listeners to handle them but nowadays we have many devices which don''t correlate to having a mouse, like phones with touch surface or pens. We need to remember that these events will only work in browsers that support the _Pointer Events_ specification.

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
10. `onPointerOut`', 'multiple-choice', 'intermediate', 3, '[{"id":"a","text":"React only supports mouse and touch events separately","isCorrect":false},{"id":"b","text":"React supports Pointer Events like onPointerDown, onPointerMove, etc., for unified input handling","isCorrect":true},{"id":"c","text":"Pointer Events are not supported in React","isCorrect":false},{"id":"d","text":"Pointer Events only work in React Native","isCorrect":false}]', NULL, 'React supports Pointer Events for unified input handling across mouse, touch, and pen devices, but only in browsers that support the Pointer Events API.', NULL, ARRAY[], ARRAY['react','pointer-events','touch','mouse','events'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-054","original_type":"multiple-choice","topic":"DOM Events","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('9eea9dd0-fcbb-4bc5-86bb-ddb7e21d9ea8', 'Why should component names start with capital letter?', 'If you are rendering your component using JSX, the name of that component has to begin with a capital letter otherwise React will throw an error as an unrecognized tag. This convention is because only HTML elements and SVG tags can begin with a lowercase letter.

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
```', 'multiple-choice', 'beginner', 2, '[{"id":"a","text":"It’s a JavaScript syntax requirement","isCorrect":false},{"id":"b","text":"JSX uses lowercase for HTML elements; capital letters distinguish React components","isCorrect":true},{"id":"c","text":"It improves performance","isCorrect":false},{"id":"d","text":"It’s only required for class components","isCorrect":false}]', NULL, 'JSX treats lowercase tags as HTML/SVG elements. Component names must start with a capital letter to be recognized as React components.', NULL, ARRAY[], ARRAY['react','jsx','component-naming','capital-letter'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-055","original_type":"multiple-choice","topic":"JSX","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"6a7eecc1-7cea-4bfd-84d3-e5ddff1d6624"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('413176df-a90a-4c3c-a765-4644289c15d6', 'Are custom DOM attributes supported in React v16?', 'Yes. In the past, React used to ignore unknown DOM attributes. If you wrote JSX with an attribute that React doesn''t recognize, React would just skip it.

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
This is useful for supplying browser-specific non-standard attributes, trying new DOM APIs, and integrating with opinionated third-party libraries.', 'multiple-choice', 'intermediate', 3, '[{"id":"a","text":"True","isCorrect":true},{"id":"b","text":"False","isCorrect":false}]', NULL, 'React v16 passes unknown attributes to the DOM, unlike v15 which ignored them. This enables custom attributes for browser APIs or third-party libraries.', NULL, ARRAY[], ARRAY['react','custom-attributes','react-v16','dom'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-056","original_type":"true-false","topic":"DOM Manipulation","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('1448e75f-0e59-428a-acef-4893efd37b6c', 'How to loop inside JSX?', 'You can simply use `Array.prototype.map` with ES6 _arrow function_ syntax.

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
This is because JSX tags are transpiled into _function calls_, and you can''t use statements inside expressions.', 'multiple-choice', 'beginner', 2, '[{"id":"a","text":"Use `for` loops directly in JSX","isCorrect":false},{"id":"b","text":"Use `Array.prototype.map()` to transform arrays into JSX elements","isCorrect":true},{"id":"c","text":"Loops are not supported in JSX","isCorrect":false},{"id":"d","text":"Use `forEach` to render elements","isCorrect":false}]', NULL, 'Use `Array.prototype.map()` to loop in JSX. `for` loops are statements and cannot be used inside JSX expressions.', NULL, ARRAY[], ARRAY['react','jsx','map','loops','arrays'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-057","original_type":"multiple-choice","topic":"Lists and Keys","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"540c20e9-c800-48de-9185-e611c10d37d5"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('54d862b3-47ea-4d8c-a1c3-ba943fcfdd9f', 'How do you access props in attribute quotes?', 'React (or JSX) doesn''t support variable interpolation inside an attribute value. The below representation won''t work:
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
```', 'multiple-choice', 'beginner', 2, '[{"id":"a","text":"Use `{this.props.image}` inside quotes like `src=\"images/{this.props.image}\"`","isCorrect":false},{"id":"b","text":"Use expressions like `src={\"images/\" + this.props.image}` or template literals `src={`images/${this.props.image}`}`","isCorrect":true},{"id":"c","text":"Only static strings are allowed in attributes","isCorrect":false},{"id":"d","text":"Use `src={this.props.image}` without any path","isCorrect":false}]', NULL, 'In JSX, attribute values must be JavaScript expressions wrapped in `{}`, not string interpolation with `{}` inside quotes.', NULL, ARRAY[], ARRAY['react','jsx','props','template-strings','attributes'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-058","original_type":"multiple-choice","topic":"Props","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"accaeeab-e45f-4999-a647-4e5126bcd487"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('4fc34f97-fa96-4b15-a7c7-d4390edb99b6', 'What is React PropTypes array with shape?', 'If you want to pass an array of objects to a component with a particular shape then use `React.PropTypes.shape()` as an argument to `React.PropTypes.arrayOf()`.

```javascript
ReactComponent.propTypes = {
  arrayWithShape: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      color: React.PropTypes.string.isRequired,
      fontSize: React.PropTypes.number.isRequired,
    })
  ).isRequired,
};
```', 'multiple-choice', 'intermediate', 3, '[{"id":"a","text":"`PropTypes.array(PropTypes.shape({}))`","isCorrect":false},{"id":"b","text":"`PropTypes.arrayOf(PropTypes.shape({ color: PropTypes.string, fontSize: PropTypes.number }))`","isCorrect":true},{"id":"c","text":"`PropTypes.objectOf(PropTypes.array)`","isCorrect":false},{"id":"d","text":"`PropTypes.shape([PropTypes.object])`","isCorrect":false}]', NULL, 'Use `PropTypes.arrayOf(PropTypes.shape({ ... }))` to validate an array of objects with a specific structure.', NULL, ARRAY[], ARRAY['react','proptypes','validation','array','shape'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-059","original_type":"multiple-choice","topic":"Props","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"accaeeab-e45f-4999-a647-4e5126bcd487"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('527db606-d123-491f-abe2-ff7bab27055e', 'How to conditionally apply class attributes?', 'You shouldn''t use curly braces inside quotes because it is going to be evaluated as a string.
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
```', 'multiple-choice', 'beginner', 2, '[{"id":"a","text":"Use `className=\"btn {visible ? ''active'' : ''''}\"`","isCorrect":false},{"id":"b","text":"Use `className={''btn '' + (visible ? ''active'' : '''')}` or template literals","isCorrect":true},{"id":"c","text":"Conditional classes are not supported","isCorrect":false},{"id":"d","text":"Use CSS-in-JS only for conditional styling","isCorrect":false}]', NULL, 'Class names must be computed as JavaScript expressions outside quotes, using string concatenation or template literals.', NULL, ARRAY[], ARRAY['react','classname','conditional-styling','template-strings'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-060","original_type":"multiple-choice","topic":"CSS & Styling","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z');
