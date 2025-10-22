-- Batch 2: Questions 21-40
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES
('7474797a-fef8-4586-9ce1-f506805239da', 'What are controlled components?', 'A **controlled component** is a React component that **fully manages the form element''s state**(e.g, elements like `<input>`, `<textarea>`, or `<select>`))  using React''s internal state mechanism. i.e, The component does not manage its own internal state — instead, React acts as the single source of truth for form data.

The controlled components will be implemented using the below steps,
1. Initialize the state using `useState` hooks in function components or inside constructor for class components.
2. Set the value of the form element to the respective state variable.
3. Create an event handler(`onChange`) to handle the user input changes through `useState`''s updater function or `setState` from class component.
4. Attach the above event handler to form element''s change or click events', 'multiple-choice', 'intermediate', 4, '[{"id":"a","text":"Form elements that manage their own state via the DOM","isCorrect":false},{"id":"b","text":"Form elements whose value is controlled by React state","isCorrect":true},{"id":"c","text":"Components that don''t re-render","isCorrect":false},{"id":"d","text":"Components that can''t use hooks","isCorrect":false}]', NULL, 'Controlled components use React state as the single source of truth for form data, with value and onChange handlers.', NULL, ARRAY[]::text[], ARRAY['react','controlled-components','forms','state','input'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-021","original_type":"multiple-choice","topic":"Forms","subcategory":"Forms","sample_answers":[],"time_limit":240,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('0e585624-5635-46f9-a751-6e947fc658ca', 'What are uncontrolled components?', 'The **Uncontrolled components** are form elements (like `<input>`, `<textarea>`, or `<select>`) that **manage their own state internally** via the **DOM**, rather than through React state.

You can query the DOM using a `ref` to find its current value when you need it. This is a bit more like traditional HTML.', 'multiple-choice', 'intermediate', 4, '[{"id":"a","text":"Components that use React state for everything","isCorrect":false},{"id":"b","text":"Form elements that manage their own state in the DOM and use refs to access values","isCorrect":true},{"id":"c","text":"Components that are not rendered","isCorrect":false},{"id":"d","text":"Components that can''t have children","isCorrect":false}]', NULL, 'Uncontrolled components store their state in the DOM and use refs to access values when needed.', NULL, ARRAY[]::text[], ARRAY['react','uncontrolled-components','forms','refs','dom'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-022","original_type":"multiple-choice","topic":"Forms","subcategory":"Forms","sample_answers":[],"time_limit":240,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('95708f97-e15c-425a-8913-144ce63a631c', 'What is the difference between createElement and cloneElement?', '#### **createElement:** 
Creates a new React element from scratch. JSX elements will be transpiled to `React.createElement()` functions.

#### **cloneElement:**
 The `cloneElement` method is used to clone an existing React element and optionally adds or overrides props.', 'multiple-choice', 'intermediate', 3, '[{"id":"a","text":"Both create new elements from scratch","isCorrect":false},{"id":"b","text":"createElement creates new elements; cloneElement clones existing elements and overrides props","isCorrect":true},{"id":"c","text":"cloneElement is for class components only","isCorrect":false},{"id":"d","text":"createElement is deprecated","isCorrect":false}]', NULL, 'createElement creates new elements; cloneElement clones existing ones and optionally overrides props.', NULL, ARRAY[]::text[], ARRAY['react','createelement','cloneelement','elements','jsx'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-023","original_type":"multiple-choice","topic":"React Basics","subcategory":"API","sample_answers":[],"time_limit":180,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"eee69693-8312-4cb1-8bf7-f2c962aae105"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('8741bf32-d274-466e-907a-990481aa251d', 'What is Lifting State Up in React?', 'When several components need to share the same changing data then it is recommended to _lift the shared state up_ to their closest common ancestor. That means if two child components share the same data from its parent, then move the state to parent instead of maintaining local state in both of the child components.', 'multiple-choice', 'intermediate', 3, '[{"id":"a","text":"Moving state to a child component","isCorrect":false},{"id":"b","text":"Moving shared state to the closest common ancestor","isCorrect":true},{"id":"c","text":"Storing state in localStorage","isCorrect":false},{"id":"d","text":"Using global variables for state","isCorrect":false}]', NULL, 'Lifting state up means moving shared state to the closest common ancestor so multiple components can access it.', NULL, ARRAY[]::text[], ARRAY['react','lifting-state-up','state','components','data-flow'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-024","original_type":"multiple-choice","topic":"State Management","subcategory":"Patterns","sample_answers":[],"time_limit":180,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"ed11a4a3-b4e1-4d70-b69e-4b63e01576c2"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('85357c2d-7ea2-46b9-9e05-9bca288126a4', 'What are Higher-Order Components?', 'A _higher-order component_ (_HOC_) is a function that takes a component and returns a new enhanced component with additional props, behavior, or data. It''s a design pattern based on React''s compositional nature, allowing you to reuse logic across multiple components without modifying their internals.

```javascript
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```', 'multiple-choice', 'intermediate', 4, '[{"id":"a","text":"Components that are higher in the DOM tree","isCorrect":false},{"id":"b","text":"Functions that take a component and return a new enhanced component","isCorrect":true},{"id":"c","text":"Components with more than 100 lines of code","isCorrect":false},{"id":"d","text":"Components that must be class-based","isCorrect":false}]', NULL, 'HOCs are functions that take a component and return a new enhanced component, enabling logic reuse.', NULL, ARRAY[]::text[], ARRAY['react','hoc','higher-order-component','composition','reuse'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-025","original_type":"multiple-choice","topic":"Higher-Order Components","subcategory":"Patterns","sample_answers":[],"time_limit":240,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"759ee497-71fd-4347-9018-c9d62ba7470f"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('6e2c2e2c-68dc-4319-8c9c-46ddcf02c435', 'What is the children prop?', 'The `children` prop is a special prop in React used to pass elements between the opening and closing tags of a component. It is commonly used in layout and wrapper components.

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
The children can be text, JSX elements, fragments, arrays and functions(for advance use case like render props).', 'multiple-choice', 'beginner', 2, '[{"id":"a","text":"It passes data from parent to child as a string","isCorrect":false},{"id":"b","text":"It allows components to receive and render nested content between their tags","isCorrect":true},{"id":"c","text":"It is only used for passing numbers","isCorrect":false},{"id":"d","text":"It is an alias for `props.data`","isCorrect":false}]', NULL, 'The `children` prop allows components to wrap other elements, enabling flexible and reusable layout components like modals, cards, or containers.', NULL, ARRAY[]::text[], ARRAY['react','children','props','composition'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-026","original_type":"multiple-choice","topic":"Props","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"accaeeab-e45f-4999-a647-4e5126bcd487"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('a3fec705-5095-4c73-964d-bb3f5dc8c6a0', 'How to write comments in React?', 'The comments in React/JSX are similar to JavaScript Multiline comments but are wrapped in curly braces.

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
You can use `//` and `/* */` in JS logic, hooks, and functions.', 'multiple-choice', 'beginner', 2, '[{"id":"a","text":"Use `//` inside JSX tags","isCorrect":false},{"id":"b","text":"Use `{/* comment */}` for JSX comments","isCorrect":true},{"id":"c","text":"Comments are not allowed in React","isCorrect":false},{"id":"d","text":"Use HTML-style `<!-- -->` comments","isCorrect":false}]', NULL, 'In JSX, comments must be wrapped in `{/* */}`. Regular JS comments (`//`, `/* */`) work only outside JSX expressions.', NULL, ARRAY[]::text[], ARRAY['react','comments','jsx','syntax'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-027","original_type":"multiple-choice","topic":"JSX","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"6a7eecc1-7cea-4bfd-84d3-e5ddff1d6624"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('9c8dedaf-f1c8-40a8-bbda-e8e408c2216d', 'What is reconciliation?', '`Reconciliation` is the process through which React updates the Browser DOM and makes React work faster. React use a `diffing algorithm` so that component updates are predictable and faster. React would first calculate the difference between the `real DOM` and the copy of DOM `(Virtual DOM)` when there''s an update of components.

React stores a copy of Browser DOM which is called `Virtual DOM`. When we make changes or add data, React creates a new Virtual DOM and compares it with the previous one. This comparison is done by `Diffing Algorithm`.

Now React compares the Virtual DOM with Real DOM. It finds out the changed nodes and updates only the changed nodes in Real DOM leaving the rest nodes as it is. This process is called _Reconciliation_.', 'multiple-choice', 'intermediate', 4, '[{"id":"a","text":"The process of converting JSX to JavaScript","isCorrect":false},{"id":"b","text":"React''s algorithm to compare Virtual DOM trees and update only changed real DOM nodes","isCorrect":true},{"id":"c","text":"A method to bundle React components","isCorrect":false},{"id":"d","text":"The act of mounting a component for the first time","isCorrect":false}]', NULL, 'Reconciliation is React''s process of comparing Virtual DOM trees and updating the real DOM efficiently using a diffing algorithm.', NULL, ARRAY[]::text[], ARRAY['react','reconciliation','virtual-dom','diffing','rendering'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-028","original_type":"multiple-choice","topic":"Virtual DOM","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"0ee220a5-c50b-4c32-afc5-a654931c9fcd"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('92285054-4fe3-4338-a97a-c05b6c15ff1c', 'Does the lazy function support named exports?', 'No, currently `React.lazy` function supports default exports only. If you would like to import modules which are named exports, you can create an intermediate module that reexports it as the default. It also ensures that tree shaking keeps working and don''t pull unused components.

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
```', 'multiple-choice', 'intermediate', 3, '[{"id":"a","text":"True","isCorrect":false},{"id":"b","text":"False","isCorrect":true}]', NULL, '`React.lazy` only supports default exports. To use named exports, you must re-export them as default in an intermediate file.', NULL, ARRAY[]::text[], ARRAY['react','lazy','code-splitting','dynamic-import','named-exports'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-029","original_type":"true-false","topic":"Code Splitting","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('f6ee082f-302c-404d-846c-48f17206c245', 'Why does React use className instead of the class attribute?', 'React uses **className** instead of **class** because of a JavaScript naming conflict with the class keyword.
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
   React follows this convention, staying consistent with the DOM API''s property name rather than HTML’s attribute.', 'multiple-choice', 'beginner', 2, '[{"id":"a","text":"Because `class` is a reserved keyword in JavaScript","isCorrect":true},{"id":"b","text":"To make CSS harder to write","isCorrect":false},{"id":"c","text":"Because HTML doesn’t support `class`","isCorrect":false},{"id":"d","text":"It’s a typo that became standard","isCorrect":false}]', NULL, 'React uses `className` because `class` is a reserved keyword in JavaScript, and JSX compiles to JavaScript object literals where `class` would cause a syntax error.', NULL, ARRAY[]::text[], ARRAY['react','jsx','classname','class','dom'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-030","original_type":"multiple-choice","topic":"JSX","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"6a7eecc1-7cea-4bfd-84d3-e5ddff1d6624"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('c62dbe59-95ed-46c9-b274-70d99b9bad7f', 'What are Fragments?', 'It''s a common pattern or practice in React for a component to return multiple elements. _Fragments_ let you group a list of children without adding extra nodes to the DOM.
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
```', 'multiple-choice', 'beginner', 2, '[{"id":"a","text":"Special components that render nothing","isCorrect":false},{"id":"b","text":"A way to group multiple elements without adding extra DOM nodes","isCorrect":true},{"id":"c","text":"Components that only render on mobile","isCorrect":false},{"id":"d","text":"A type of React error boundary","isCorrect":false}]', NULL, 'Fragments allow grouping multiple elements without adding extra DOM nodes, improving performance and avoiding layout issues.', NULL, ARRAY[]::text[], ARRAY['react','fragments','jsx','rendering','dom'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-031","original_type":"multiple-choice","topic":"Fragments","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('b469fb7a-869b-4b74-8f15-26e53572a422', 'Why are Fragments better than container divs?', 'Below are the list of reasons to prefer fragments over container DOM elements,
1. Fragments are a bit faster and use less memory by not creating an extra DOM node. This only has a real benefit on very large and deep trees.
2. Some CSS mechanisms like _Flexbox_ and _CSS Grid_ have a special parent-child relationships, and adding divs in the middle makes it hard to keep the desired layout.
3. The DOM Inspector is less cluttered.', 'multiple-choice', 'intermediate', 3, '[{"id":"a","text":"They are slower but easier to debug","isCorrect":false},{"id":"b","text":"They prevent CSS layout issues, improve performance, and reduce DOM clutter","isCorrect":true},{"id":"c","text":"They automatically apply styles","isCorrect":false},{"id":"d","text":"They are required for server-side rendering","isCorrect":false}]', NULL, 'Fragments avoid unnecessary DOM nodes, which improves performance, preserves CSS layout (e.g., Flexbox/Grid), and reduces DOM clutter.', NULL, ARRAY[]::text[], ARRAY['react','fragments','performance','css','layout'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-032","original_type":"multiple-choice","topic":"Fragments","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('abfb8643-6cc8-4cd9-88e5-382b0ed34667', 'What are portals in React?', 'A Portal is a React feature that enables rendering children into a DOM node that exists outside the parent component''s DOM hierarchy, while still preserving the React component hierarchy. Portals help avoid CSS stacking issues—for example, elements with position: fixed may not behave as expected inside a parent with transform. Portals solve this by rendering content (like modals or tooltips) outside such constrained DOM contexts.
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
The above code will render the modal content into the body element in the HTML, not inside the component''s usual location.', 'multiple-choice', 'intermediate', 4, '[{"id":"a","text":"A way to share state between unrelated components","isCorrect":false},{"id":"b","text":"A feature to render children into a different DOM node while preserving React behavior","isCorrect":true},{"id":"c","text":"A method to lazy-load components","isCorrect":false},{"id":"d","text":"An alternative to React Context","isCorrect":false}]', NULL, 'Portals render React children into a DOM node outside the parent hierarchy (e.g., modals into `document.body`), while maintaining React context and event handling.', NULL, ARRAY[]::text[], ARRAY['react','portals','modals','dom','rendering'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-033","original_type":"multiple-choice","topic":"Portals","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('eda77dc9-9ba9-447e-978c-fe541b434fc7', 'What are stateless components?', 'If the behaviour of a component is independent of its state then it can be a stateless component. You can use either a function or a class for creating stateless components. But unless you need to use a lifecycle hook in your components, you should go for function components. There are a lot of benefits if you decide to use function components here; they are easy to write, understand, and test, a little faster, and you can avoid the `this` keyword altogether.', 'multiple-choice', 'beginner', 2, '[{"id":"a","text":"Components that cannot receive props","isCorrect":false},{"id":"b","text":"Components that don’t manage internal state and render based only on props","isCorrect":true},{"id":"c","text":"Components that are always class-based","isCorrect":false},{"id":"d","text":"Components that throw errors","isCorrect":false}]', NULL, 'Stateless components (now called functional components) don’t manage internal state and are typically pure functions that render based on props.', NULL, ARRAY[]::text[], ARRAY['react','stateless','function-components','components'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-034","original_type":"multiple-choice","topic":"Components","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"759ee497-71fd-4347-9018-c9d62ba7470f"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('973e982b-75d4-4ab4-a93d-567babd410ce', 'What are stateful components?', 'If the behaviour of a component is dependent on the _state_ of the component then it can be termed as stateful component. These _stateful components_ are either function components with hooks or _class components_.

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
```', 'multiple-choice', 'beginner', 2, '[{"id":"a","text":"Components that never re-render","isCorrect":false},{"id":"b","text":"Components that manage internal state and re-render when it changes","isCorrect":true},{"id":"c","text":"Components that only accept static props","isCorrect":false},{"id":"d","text":"Components that are deprecated","isCorrect":false}]', NULL, 'Stateful components manage internal state using `useState` (function) or `this.state` (class), and re-render when state changes.', NULL, ARRAY[]::text[], ARRAY['react','stateful','state','hooks','class-components'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-035","original_type":"multiple-choice","topic":"State","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"ed11a4a3-b4e1-4d70-b69e-4b63e01576c2"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('83a12482-27e7-43ef-bd19-d6cba01e0b96', 'How to apply validation to props in React?', 'When the application is running in _development mode_, React will automatically check all props that we set on components to make sure they have _correct type_. If the type is incorrect, React will generate warning messages in the console. It''s disabled in _production mode_ due to performance impact. The mandatory props are defined with `isRequired`.

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
```', 'multiple-choice', 'intermediate', 3, '[{"id":"a","text":"Use `PropTypes` from the `prop-types` package to define expected prop types and required props","isCorrect":true},{"id":"b","text":"PropTypes work in production mode for security","isCorrect":false},{"id":"c","text":"Validation is automatic and cannot be customized","isCorrect":false},{"id":"d","text":"PropTypes are built into React since v16","isCorrect":false}]', NULL, 'PropTypes validate prop types in development mode, helping catch bugs early. Required props use `.isRequired`.', NULL, ARRAY[]::text[], ARRAY['react','proptypes','validation','type-checking','development'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-036","original_type":"multiple-choice","topic":"Props","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"accaeeab-e45f-4999-a647-4e5126bcd487"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('5464ec78-e484-4145-b88f-b3ea662c0824', 'What are the advantages of React?', 'Below are the list of main advantages of React,
1. Increases the application''s performance with _Virtual DOM_.
2. JSX makes code easy to read and write.
3. It renders both on client and server side (_SSR_).
4. Easy to integrate with frameworks (Angular, Backbone) since it is only a view library.
5. Easy to write unit and integration tests with tools such as Jest.', 'multiple-choice', 'beginner', 2, '[{"id":"a","text":"Virtual DOM, JSX, SSR, easy integration, and testability","isCorrect":true},{"id":"b","text":"Two-way data binding and full framework features","isCorrect":false},{"id":"c","text":"Built-in state management and routing","isCorrect":false},{"id":"d","text":"No learning curve for beginners","isCorrect":false}]', NULL, 'React’s key advantages include Virtual DOM for performance, JSX for readability, SSR support, framework agnosticism, and testability.', NULL, ARRAY[]::text[], ARRAY['react','advantages','virtual-dom','jsx','ssr'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-037","original_type":"multiple-choice","topic":"React Basics","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"eee69693-8312-4cb1-8bf7-f2c962aae105"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('b91feca3-d36e-40cf-b983-91a1de8ab943', 'What are the limitations of React?', 'Apart from the advantages, there are few limitations of React too,
1. React is just a view library, not a full framework.
2. There is a learning curve for beginners who are new to web development.
3. Integrating React into a traditional MVC framework requires some additional configuration.
4. The code complexity increases with inline templating and JSX.
5. Too many smaller components leading to over engineering or boilerplate.', 'multiple-choice', 'beginner', 2, '[{"id":"a","text":"It’s a full framework with built-in routing and state management","isCorrect":false},{"id":"b","text":"It’s just a view library, has a learning curve, and can create boilerplate","isCorrect":true},{"id":"c","text":"It doesn’t support server-side rendering","isCorrect":false},{"id":"d","text":"It’s slower than vanilla JS","isCorrect":false}]', NULL, 'React is only a view library, has a learning curve, requires extra setup for full apps, and can lead to boilerplate with many small components.', NULL, ARRAY[]::text[], ARRAY['react','limitations','view-library','jsx','boilerplate'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-038","original_type":"multiple-choice","topic":"React Basics","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"eee69693-8312-4cb1-8bf7-f2c962aae105"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('c744e296-f0e2-4580-a723-22612b589c23', 'What are the recommended ways for static type checking?', 'Normally we use _PropTypes library_ (`React.PropTypes` moved to a `prop-types` package since React v15.5) for _type checking_ in the React applications. For large code bases, it is recommended to use _static type checkers_ such as Flow or TypeScript, that perform type checking at compile time and provide auto-completion features.', 'multiple-choice', 'intermediate', 3, '[{"id":"a","text":"PropTypes for small apps; TypeScript/Flow for large codebases","isCorrect":true},{"id":"b","text":"Only PropTypes should be used","isCorrect":false},{"id":"c","text":"TypeScript is not compatible with React","isCorrect":false},{"id":"d","text":"Static typing is unnecessary in React","isCorrect":false}]', NULL, 'For small apps, PropTypes suffice; for large codebases, use TypeScript or Flow for compile-time type safety and better tooling.', NULL, ARRAY[]::text[], ARRAY['react','typescript','flow','proptypes','type-checking'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-039","original_type":"multiple-choice","topic":"TypeScript","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('2f1c8294-3d4e-4f8f-9d6a-a9a2cbf94da4', 'What is the use of the react-dom package?', 'The `react-dom` package provides _DOM-specific methods_ that can be used at the top level of your app. Most of the components are not required to use this module. Some of the methods of this package are:
1. `render()`
2. `hydrate()`
3. `unmountComponentAtNode()`
4. `findDOMNode()`
5. `createPortal()`', 'multiple-choice', 'beginner', 2, '[{"id":"a","text":"It contains React’s core logic like useState and useEffect","isCorrect":false},{"id":"b","text":"It provides DOM-specific methods like render(), hydrate(), and createPortal()","isCorrect":true},{"id":"c","text":"It’s used for server-side logic only","isCorrect":false},{"id":"d","text":"It’s deprecated in React 18","isCorrect":false}]', NULL, '`react-dom` provides methods to interact with the browser DOM, such as `render`, `hydrate`, and `createPortal`.', NULL, ARRAY[]::text[], ARRAY['react','react-dom','dom','render','hydrate'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-040","original_type":"multiple-choice","topic":"React DOM","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z');
