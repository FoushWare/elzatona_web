-- Batch 1: Questions 1-20
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES
('99b6bd2e-560a-4b6f-bb58-831d14ad74c4', 'What is React?', 'React (aka React.js or ReactJS) is an **open-source front-end JavaScript library** for building user interfaces based on components. It''s used for handling the view layer in web and mobile applications, and allows developers to create reusable UI components and manage the state of those components efficiently.

React was created by [Jordan Walke](https://github.com/jordwalke), a software engineer at Facebook (now Meta). It was first deployed on Facebook''s News Feed in 2011 and on Instagram in 2012. The library was open-sourced in May 2013 and has since become one of the most popular JavaScript libraries for building modern user interfaces.', 'multiple-choice', 'beginner', 2, NULL, NULL, 'React is a declarative, efficient, and flexible JavaScript library for building user interfaces using a component-based architecture.', NULL, ARRAY[]::text[], ARRAY['react','library','ui','components','frontend'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-001","original_type":"open-ended","topic":"React Basics","subcategory":"Fundamentals","sample_answers":["React is a JavaScript library for building user interfaces by composing reusable components.","React is an open-source front-end library maintained by Meta for creating interactive UIs with a virtual DOM and unidirectional data flow."],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"eee69693-8312-4cb1-8bf7-f2c962aae105"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('d19d717c-2a59-4bf7-8a14-a6249110f511', 'What is the history behind React''s evolution?', 'The history of ReactJS started in 2010 with the creation of **XHP**. XHP is a PHP extension which improved the syntax of the language such that XML document fragments become valid PHP expressions and the primary purpose was used to create custom and reusable HTML elements.

The main principle of this extension was to make front-end code easier to understand and to help avoid cross-site scripting attacks. The project was successful to prevent the malicious content submitted by the scrubbing user.

But there was a different problem with XHP in which dynamic web applications require many roundtrips to the server, and XHP did not solve this problem. Also, the whole UI was re-rendered for small change in the application. Later, the initial prototype of React is created with the name **FaxJ** by Jordan inspired from XHP. Finally after sometime React has been introduced as a new library into JavaScript world.', 'multiple-choice', 'intermediate', 4, NULL, NULL, 'React was inspired by XHP, a PHP extension at Facebook. It evolved to solve performance issues with full re-renders by introducing the Virtual DOM, and has since grown with features like Hooks, Concurrent Mode, and Server Components.', NULL, ARRAY[]::text[], ARRAY['react','history','xhp','facebook','evolution'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-002","original_type":"open-ended","topic":"React Basics","subcategory":"History","sample_answers":["React originated from Facebook''s XHP project. Jordan Walke created FaxJS (later React) to bring XHP''s component model to JavaScript with better performance via the Virtual DOM.","React was first used internally at Facebook in 2011, open-sourced in 2013, and evolved through major milestones like React Native (2015), Fiber (2017), Hooks (2019), and React 18 (2022)."],"time_limit":180,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"eee69693-8312-4cb1-8bf7-f2c962aae105"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('0a67e60c-a1d8-4519-ba26-30fa43969eaf', 'What are the major features of React?', 'React offers a powerful set of features that have made it one of the most popular JavaScript libraries for building user interfaces:

**Core Features:**
- **Component-Based Architecture**: React applications are built using components - independent, reusable pieces of code that return HTML via a render function.
- **Virtual DOM**: React creates an in-memory data structure cache, computes the resulting differences, and efficiently updates only the changed parts in the browser DOM.
- **JSX (JavaScript XML)**: A syntax extension that allows writing HTML-like code in JavaScript.
- **Unidirectional Data Flow**: Data flows from parent to child components.
- **Declarative UI**: Describe what your UI should look like for a given state.

**Advanced Features:**
- **React Hooks**: Allow using state and other React features in functional components.
- **Context API**: Provides a way to share values between components without explicitly passing props.
- **Error Boundaries**: Components that catch JavaScript errors anywhere in their child component tree.
- **Server-Side Rendering (SSR)**: Enables rendering React components on the server.
- **Concurrent Mode**: A set of new features that help React apps stay responsive.
- **React Server Components**: A new feature that allows components to be rendered entirely on the server.
- **Suspense**: A feature that lets your components "wait" for something before rendering.', 'multiple-choice', 'beginner', 3, '[{"id":"a","text":"Component-Based Architecture, Virtual DOM, JSX, Unidirectional Data Flow, Hooks, Context API, Error Boundaries, SSR, Concurrent Mode, Suspense, Server Components","isCorrect":true},{"id":"b","text":"Two-way data binding, templates, dependency injection, directives","isCorrect":false},{"id":"c","text":"Controllers, Models, Views, Services, Filters","isCorrect":false},{"id":"d","text":"Observables, Pipes, Modules, Decorators","isCorrect":false}]', NULL, 'React''s major features include component architecture, Virtual DOM, JSX, unidirectional data flow, Hooks, Context API, Error Boundaries, SSR, Concurrent Mode, Suspense, and Server Components.', NULL, ARRAY[]::text[], ARRAY['react','features','virtual-dom','jsx','hooks','context'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-003","original_type":"multiple-choice","topic":"React Basics","subcategory":"Features","sample_answers":[],"time_limit":180,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"eee69693-8312-4cb1-8bf7-f2c962aae105"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('f07e2865-b66d-49d8-b114-ace86752a746', 'What is JSX?', '_JSX_ stands for _JavaScript XML_ and it is an XML-like syntax extension to ECMAScript. Basically it just provides the syntactic sugar for the `React.createElement(type, props, ...children)` function, giving us expressiveness of JavaScript along with HTML like template syntax.

In the example below, the text inside `<h1>` tag is returned as JavaScript function to the render function.

```jsx harmony
export default function App() {
  return <h1 className="greeting">{"Hello, this is a JSX Code!"}</h1>;
}
```

If you don''t use JSX syntax then the respective JavaScript code should be written as below,

```javascript
import { createElement } from "react";
export default function App() {
  return createElement(
    "h1",
    { className: "greeting" },
    "Hello, this is a JSX Code!"
  );
}
```', 'multiple-choice', 'beginner', 2, '[{"id":"a","text":"A templating engine like Handlebars","isCorrect":false},{"id":"b","text":"Syntactic sugar for React.createElement()","isCorrect":true},{"id":"c","text":"A new programming language","isCorrect":false},{"id":"d","text":"A CSS preprocessor","isCorrect":false}]', NULL, 'JSX is syntactic sugar for React.createElement(). It allows writing HTML-like syntax in JavaScript, which gets compiled to function calls.', NULL, ARRAY[]::text[], ARRAY['react','jsx','syntax','createElement'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-004","original_type":"multiple-choice","topic":"JSX","subcategory":"Syntax","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"6a7eecc1-7cea-4bfd-84d3-e5ddff1d6624"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('b9f396c1-2391-4013-879b-e6055423a310', 'What is the difference between an Element and a Component?', '**Element:**
- A React **Element** is a plain JavaScript object that describes what you want to see on the UI. It represents a DOM node or a component at a specific point in time. 
- Elements are immutable.
- Creating an element is fast and lightweight.

**Component:**
- A **Component** is a function or class that returns an element (or a tree of elements).
- Components can accept inputs (props) and manage their own state.

In summary:
- **Elements** are the smallest building blocks in React—objects that describe what you want to see.
- **Components** are functions or classes that return elements and encapsulate logic, structure, and behavior for parts of your UI.', 'multiple-choice', 'intermediate', 4, '[{"id":"a","text":"An element is a function; a component is an object","isCorrect":false},{"id":"b","text":"An element is a plain object describing UI; a component is a function/class that returns elements","isCorrect":true},{"id":"c","text":"Elements are stateful; components are stateless","isCorrect":false},{"id":"d","text":"Components are DOM nodes; elements are virtual","isCorrect":false}]', NULL, 'An element is a plain object describing what should appear on screen. A component is a function or class that returns elements.', NULL, ARRAY[]::text[], ARRAY['react','element','component','rendering'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-005","original_type":"multiple-choice","topic":"React Basics","subcategory":"Core Concepts","sample_answers":[],"time_limit":180,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"eee69693-8312-4cb1-8bf7-f2c962aae105"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('da158bb3-78df-4975-b429-3c4b1751d197', 'How do you create components in React?', 'Components are the building blocks of creating User Interfaces(UI) in React. There are two possible ways to create a component.

1. **Function Components:** This is the simplest way to create a component. Those are pure JavaScript functions that accept props object as the one and only one parameter and return React elements to render the output:
   ```jsx harmony
   function Greeting({ message }) {
     return <h1>{`Hello, ${message}`}</h1>;
   }
   ```

2. **Class Components:** You can also use ES6 class to define a component. The above function component can be written as a class component:
   ```jsx harmony
   class Greeting extends React.Component {
     render() {
       return <h1>{`Hello, ${this.props.message}`}</h1>;
     }
   }
   ```', 'multiple-choice', 'beginner', 2, '[{"id":"a","text":"Only with classes","isCorrect":false},{"id":"b","text":"Only with functions","isCorrect":false},{"id":"c","text":"With functions or classes","isCorrect":true},{"id":"d","text":"With HTML templates only","isCorrect":false}]', NULL, 'React components can be created as functions or ES6 classes. Function components are preferred in modern React.', NULL, ARRAY[]::text[], ARRAY['react','function-component','class-component','components'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-006","original_type":"multiple-choice","topic":"Components","subcategory":"Component Types","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"759ee497-71fd-4347-9018-c9d62ba7470f"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('9d520461-30e9-4c9c-bfa6-11d91cf273c4', 'When should you use a Class Component over a Function Component?', 'After the addition of Hooks(i.e. React 16.8 onwards) it is always recommended to use Function components over Class components in React. Because you could use state, lifecycle methods and other features that were only available in class component present in function component too.

But even there are two reasons to use Class components over Function components.
1. If you need a React functionality whose Function component equivalent is not present yet, like Error Boundaries.
2. In older versions, If the component needs _state or lifecycle methods_ then you need to use class component.', 'multiple-choice', 'intermediate', 3, '[{"id":"a","text":"Always use class components for performance","isCorrect":false},{"id":"b","text":"Use class components only for Error Boundaries or legacy code","isCorrect":true},{"id":"c","text":"Class components are required for all stateful logic","isCorrect":false},{"id":"d","text":"Function components cannot use props","isCorrect":false}]', NULL, 'Since React 16.8, function components with Hooks are preferred. Class components are mainly needed for Error Boundaries (though third-party libraries like react-error-boundary can avoid this).', NULL, ARRAY[]::text[], ARRAY['react','class-component','function-component','hooks','error-boundaries'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-007","original_type":"multiple-choice","topic":"Components","subcategory":"Best Practices","sample_answers":[],"time_limit":180,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"759ee497-71fd-4347-9018-c9d62ba7470f"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('9ba11df1-ef3e-4c39-8d6f-6c9f868a2773', 'What are Pure Components?', 'Pure components are the components which render the same output for the same state and props. In function components, you can achieve these pure components through memoized `React.memo()` API wrapping around the component. This API prevents unnecessary re-renders by comparing the previous props and new props using shallow comparison.

In class components, the components extending _`React.PureComponent`_ instead of _`React.Component`_ become the pure components. When props or state changes, _PureComponent_ will do a shallow comparison on both props and state by invoking `shouldComponentUpdate()` lifecycle method.', 'multiple-choice', 'intermediate', 4, '[{"id":"a","text":"Components that never re-render","isCorrect":false},{"id":"b","text":"Components that render the same output for the same props/state and avoid unnecessary re-renders","isCorrect":true},{"id":"c","text":"Components that only accept string props","isCorrect":false},{"id":"d","text":"Components that must be written in TypeScript","isCorrect":false}]', NULL, 'Pure components optimize performance by preventing re-renders when props/state haven''t changed. Use React.memo() for function components and PureComponent for class components.', NULL, ARRAY[]::text[], ARRAY['react','pure-component','react-memo','performance','re-render'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-008","original_type":"multiple-choice","topic":"Performance Optimization","subcategory":"Optimization","sample_answers":[],"time_limit":240,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('be2ca823-e0b6-4f4e-97a3-9460b8311b39', 'What is state in React?', '_State_ of a component is an object that holds some information that may change over the lifetime of the component. The important point is whenever the state object changes, the component re-renders.

Let''s take an example of **User** component with `message` state. Here, **useState** hook has been used to add state to the User component and it returns an array with current state and function to update it.

```jsx harmony
import { useState } from "react";
function User() {
  const [message, setMessage] = useState("Welcome to React world");
  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
}
```', 'multiple-choice', 'beginner', 2, '[{"id":"a","text":"Immutable data passed from parent components","isCorrect":false},{"id":"b","text":"Mutable data that triggers re-renders when changed","isCorrect":true},{"id":"c","text":"Static configuration for a component","isCorrect":false},{"id":"d","text":"A global store like Redux","isCorrect":false}]', NULL, 'State is mutable data that triggers re-renders when updated. In function components, it''s managed with useState; in class components, with this.state.', NULL, ARRAY[]::text[], ARRAY['react','state','useState','component-state'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-009","original_type":"multiple-choice","topic":"State","subcategory":"State Management","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"ed11a4a3-b4e1-4d70-b69e-4b63e01576c2"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('1e53970a-f67f-47cb-9743-e215bbc12cc2', 'What are props in React?', '_Props_ are inputs to components. They are single values or objects containing a set of values that are passed to components on creation similar to HTML-tag attributes. Here, the data is passed down from a parent component to a child component.

The primary purpose of props in React is to provide following component functionality:
1. Pass custom data to your component.
2. Trigger state changes.
3. Use via `this.props.reactProp` inside component''s `render()` method.', 'multiple-choice', 'beginner', 2, '[{"id":"a","text":"Mutable data managed by the component itself","isCorrect":false},{"id":"b","text":"Read-only inputs passed from parent to child","isCorrect":true},{"id":"c","text":"Global variables accessible anywhere","isCorrect":false},{"id":"d","text":"Event handlers only","isCorrect":false}]', NULL, 'Props are read-only inputs passed from parent to child components to configure behavior or display data.', NULL, ARRAY[]::text[], ARRAY['react','props','properties','data-flow'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-010","original_type":"multiple-choice","topic":"Props","subcategory":"Data Flow","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"accaeeab-e45f-4999-a647-4e5126bcd487"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('ad8be79d-1678-47f1-bb84-68bace632e40', 'What is the difference between state and props?', '### State
- Managed within a component
- Mutable
- Local to the component
- Updated with setState/useState

### Props
- Passed from parent component
- Read-only
- Used to configure child components
- Cannot be modified by the child

### Summary Table
| Feature   | State                               | Props                             |
|-----------|-------------------------------------|-----------------------------------|
| Managed by| The component itself                | Parent component                  |
| Mutable   | Yes                                 | No (read-only)                    |
| Scope     | Local to the component              | Passed from parent to child       |
| Usage     | Manage dynamic data and UI changes  | Configure and customize component |
| Update    | Using setState/useState             | Cannot be updated by the component|', 'multiple-choice', 'beginner', 3, '[{"id":"a","text":"State is immutable; props are mutable","isCorrect":false},{"id":"b","text":"State is managed internally and mutable; props are passed from parent and read-only","isCorrect":true},{"id":"c","text":"Props can be changed with this.setProps()","isCorrect":false},{"id":"d","text":"State and props are the same thing","isCorrect":false}]', NULL, 'State is mutable and managed internally; props are immutable and passed from parents.', NULL, ARRAY[]::text[], ARRAY['react','state','props','data-flow','immutability'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-011","original_type":"multiple-choice","topic":"State","subcategory":"Core Concepts","sample_answers":[],"time_limit":150,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"ed11a4a3-b4e1-4d70-b69e-4b63e01576c2"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('f619e51b-5222-4a27-bca4-8807fe959eab', 'What is the difference between HTML and React event handling?', 'Below are some of the main differences between HTML and React event handling,
1. In HTML, the event name usually represents in _lowercase_ as a convention:
   ```html
   <button onclick="activateLasers()"></button>
   ```
   Whereas in React it follows _camelCase_ convention:
   ```jsx harmony
   <button onClick={activateLasers}>
   ```
2. In HTML, you can return `false` to prevent default behavior:
   ```html
   <a
     href="#"
     onclick=''console.log("The link was clicked."); return false;''
   />
   ```
   Whereas in React you must call `preventDefault()` explicitly:
   ```javascript
   function handleClick(event) {
     event.preventDefault();
     console.log("The link was clicked.");
   }
   ```
3. In HTML, you need to invoke the function by appending `()`
   Whereas in react you should not append `()` with the function name.', 'multiple-choice', 'beginner', 3, '[{"id":"a","text":"React uses lowercase event names like HTML","isCorrect":false},{"id":"b","text":"React uses camelCase, requires explicit preventDefault(), and passes function references","isCorrect":true},{"id":"c","text":"React uses strings for event handlers like HTML","isCorrect":false},{"id":"d","text":"React doesn''t support event handling","isCorrect":false}]', NULL, 'React uses camelCase for event names, requires explicit preventDefault(), and passes function references (not strings).', NULL, ARRAY[]::text[], ARRAY['react','events','event-handling','camelcase','preventdefault'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-012","original_type":"multiple-choice","topic":"Event Handling","subcategory":"Events","sample_answers":[],"time_limit":150,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"2a5901fd-e2ca-4fe3-a914-447622008d02"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('33a347b4-526d-4b73-948a-17f876699bfb', 'What are synthetic events in React?', '`SyntheticEvent` is a cross-browser wrapper around the browser''s native event. Its API is same as the browser''s native event, including `stopPropagation()` and `preventDefault()`, except the events work identically across all browsers. The native events can be accessed directly from synthetic events using `nativeEvent` attribute.

Let''s take an example of `BookStore` title search component with the ability to get all native event properties

```js
function BookStore() {
  function handleTitleChange(e) {
    console.log("The new title is:", e.target.value);
    console.log(''Synthetic event:'', e); // React SyntheticEvent
    console.log(''Native event:'', e.nativeEvent); // Browser native event
    e.stopPropagation();
    e.preventDefault();
  }
  return <input name="title" onChange={handleTitleChange} />;
}
```', 'multiple-choice', 'intermediate', 3, '[{"id":"a","text":"Native browser events","isCorrect":false},{"id":"b","text":"React''s cross-browser wrapper around native events","isCorrect":true},{"id":"c","text":"Custom events created with Event constructor","isCorrect":false},{"id":"d","text":"Events that only work in development mode","isCorrect":false}]', NULL, 'SyntheticEvent is a React wrapper around native browser events, providing consistent API across browsers.', NULL, ARRAY[]::text[], ARRAY['react','synthetic-event','events','cross-browser'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-013","original_type":"multiple-choice","topic":"Event Handling","subcategory":"Events","sample_answers":[],"time_limit":180,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"2a5901fd-e2ca-4fe3-a914-447622008d02"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('3584c71d-c489-4f0a-8ab2-b382494b14da', 'What are inline conditional expressions?', 'You can use either _if statements_ or _ternary expressions_ which are available in JS(and JSX in React) to conditionally execute or render expressions. Apart from these approaches, you can also embed any expressions in JSX by wrapping them in curly braces and then followed by JS logical operator `&&`. It is helpful to render elements conditionally within a single line and commonly used for concise logic, especially in JSX rendering.

```jsx harmony
<h1>Hello!</h1>;
{
  messages.length > 0 && !isLogin ? (
    <h2>You have {messages.length} unread messages.</h2>
  ) : (
    <h2>You don''t have unread messages.</h2>
  );
}
```', 'multiple-choice', 'beginner', 2, '[{"id":"a","text":"Only if/else blocks outside JSX","isCorrect":false},{"id":"b","text":"Ternary operators and && expressions inside JSX","isCorrect":true},{"id":"c","text":"Switch statements only","isCorrect":false},{"id":"d","text":"No conditional rendering in React","isCorrect":false}]', NULL, 'React supports ternary operators and && for inline conditional rendering in JSX.', NULL, ARRAY[]::text[], ARRAY['react','conditional-rendering','ternary','logical-and','jsx'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-014","original_type":"multiple-choice","topic":"Conditional Rendering","subcategory":"Rendering","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('b6bc5a5b-ab41-487f-b3aa-bb88596d82ec', 'What is the "key" prop and what is its benefit when used in arrays of elements?', 'A `key` is a special attribute you **should** include when mapping over arrays to render data. _Key_ prop helps React identify which items have changed, are added, or are removed.

Keys should be unique among its siblings. Most often we use ID from our data as _key_:
```jsx harmony
const todoItems = todos.map((todo) => <li key={todo.id}>{todo.text}</li>);
```

**Benefits of key:**
  *   Enables React to **efficiently update and re-render** components.
  *   Prevents unnecessary re-renders by **reusing** components when possible.
  *   Helps **maintain internal state** of list items correctly.', 'multiple-choice', 'intermediate', 4, '[{"id":"a","text":"Keys are only for styling","isCorrect":false},{"id":"b","text":"Keys help React identify changes in lists for efficient updates and state preservation","isCorrect":true},{"id":"c","text":"Keys must be globally unique across the entire app","isCorrect":false},{"id":"d","text":"Keys are optional and have no performance impact","isCorrect":false}]', NULL, 'Keys help React identify which list items have changed, been added, or removed, enabling efficient updates and correct state management.', NULL, ARRAY[]::text[], ARRAY['react','key','lists','rendering','performance'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-015","original_type":"multiple-choice","topic":"Lists and Keys","subcategory":"Lists","sample_answers":[],"time_limit":180,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"540c20e9-c800-48de-9185-e611c10d37d5"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('c7e24375-02c3-4c0c-85da-6ab414c14936', 'What is Virtual DOM?', 'The _Virtual DOM_ (VDOM) is a lightweight, in-memory representation of _Real DOM_ used by libraries like React to optimize UI rendering. The representation of a UI is kept in memory and synced with the "real" DOM. It''s a step that happens between the render function being called and the displaying of elements on the screen. This entire process is called _reconciliation_.', 'multiple-choice', 'beginner', 2, '[{"id":"a","text":"A real browser DOM node","isCorrect":false},{"id":"b","text":"An in-memory representation of the real DOM for efficient updates","isCorrect":true},{"id":"c","text":"A CSS rendering engine","isCorrect":false},{"id":"d","text":"A database for storing component state","isCorrect":false}]', NULL, 'Virtual DOM is an in-memory representation of the real DOM that enables efficient diffing and minimal updates.', NULL, ARRAY[]::text[], ARRAY['react','virtual-dom','reconciliation','performance'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-016","original_type":"multiple-choice","topic":"Virtual DOM","subcategory":"Architecture","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"0ee220a5-c50b-4c32-afc5-a654931c9fcd"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('d85d4be6-d548-47ed-998b-39dc15e48068', 'How does the Virtual DOM work?', 'The _Virtual DOM_ works in five simple steps.
**1. Initial Render**  
When a UI component renders for the first time, it returns JSX. React uses this structure to create a Virtual DOM tree.
**2. State or Props Change**  
When the component''s state or props change, React creates a new Virtual DOM.
**3. Diffing Algorithm**  
React compares the new Virtual DOM with the previous one.
**4. Reconciliation**  
Based on the diffing results, React decides which parts of the Real DOM should be updated.
**5. Efficient DOM Updates**  
This process makes UI rendering much faster and more efficient.', 'multiple-choice', 'intermediate', 4, '[{"id":"a","text":"It replaces the entire real DOM on every change","isCorrect":false},{"id":"b","text":"It creates a new Virtual DOM, diffs it with the old one, and updates only changed real DOM nodes","isCorrect":true},{"id":"c","text":"It uses direct DOM manipulation without any abstraction","isCorrect":false},{"id":"d","text":"It only works in development mode","isCorrect":false}]', NULL, 'React creates a new Virtual DOM on state change, diffs it with the previous one, and updates only the changed parts of the real DOM.', NULL, ARRAY[]::text[], ARRAY['react','virtual-dom','diffing','reconciliation','performance'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-017","original_type":"multiple-choice","topic":"Virtual DOM","subcategory":"Architecture","sample_answers":[],"time_limit":240,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"0ee220a5-c50b-4c32-afc5-a654931c9fcd"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('88b74ad0-e8f4-45a6-abcc-f7988b839a4f', 'What is the difference between Shadow DOM and Virtual DOM?', 'The _Shadow DOM_ is a browser technology designed primarily for scoping variables and CSS in _web components_. The _Virtual DOM_ is a concept implemented by libraries in JavaScript on top of browser APIs.

| Feature | Shadow DOM | Virtual DOM |
| --- | --- | --- |
| Purpose | Encapsulation for Web Components | Efficient UI rendering |
| Managed by | Browser | JS frameworks (e.g., React) |
| DOM Type | Part of real DOM (scoped) | In-memory representation |
| Encapsulation | Yes | No |
| Use Case | Web Components, scoped styling | UI diffing and minimal DOM updates |', 'multiple-choice', 'intermediate', 3, '[{"id":"a","text":"They are the same thing","isCorrect":false},{"id":"b","text":"Shadow DOM is for Web Components encapsulation; Virtual DOM is for React''s efficient rendering","isCorrect":true},{"id":"c","text":"Virtual DOM is part of the browser; Shadow DOM is a React feature","isCorrect":false},{"id":"d","text":"Both are managed by the browser","isCorrect":false}]', NULL, 'Shadow DOM is a browser feature for encapsulation in Web Components; Virtual DOM is a React concept for efficient rendering.', NULL, ARRAY[]::text[], ARRAY['react','shadow-dom','virtual-dom','web-components','encapsulation'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-018","original_type":"multiple-choice","topic":"Virtual DOM","subcategory":"Architecture","sample_answers":[],"time_limit":180,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"0ee220a5-c50b-4c32-afc5-a654931c9fcd"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('d37eb3d8-1dab-4b68-92a6-837a35a2dee0', 'What is React Fiber?', '**React Fiber** is the **new reconciliation engine** in React, introduced in React 16. It''s a complete rewrite of React''s core algorithm(old stack-based algorithm) for rendering and updating the UI. Fiber enhances React''s ability to handle **asynchronous rendering**, **prioritized updates**(assign priority to different types of updates), and **interruption**(ability to pause, abort, or reuse work) of rendering work, enabling smoother and more responsive user interfaces.', 'multiple-choice', 'advanced', 5, '[{"id":"a","text":"A new CSS-in-JS library","isCorrect":false},{"id":"b","text":"React''s new reconciliation engine for async rendering and prioritization","isCorrect":true},{"id":"c","text":"A state management library like Redux","isCorrect":false},{"id":"d","text":"A testing utility","isCorrect":false}]', NULL, 'React Fiber is the new reconciliation engine in React 16+ that enables async rendering, prioritization, and interruption for better performance.', NULL, ARRAY[]::text[], ARRAY['react','fiber','reconciliation','concurrent-mode','async-rendering'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-019","original_type":"multiple-choice","topic":"React Fiber","subcategory":"Advanced","sample_answers":[],"time_limit":300,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('dfc56626-7d16-4196-baba-9075413fcab8', 'What is the main goal of React Fiber?', 'The goal of _React Fiber_ is to increase its suitability for areas like animation, layout, and gestures. Its headline feature is **incremental rendering**: the ability to split rendering work into chunks and spread it out over multiple frames.

Its main goals are:
*   **Incremental Rendering** – Breaks work into chunks for smoother updates.
*   **Interruptible Rendering** – Pauses and resumes rendering to keep the UI responsive.
*   **Prioritization** – Handles high-priority updates before low-priority ones.
*   **Concurrency Support** – Enables working on multiple UI versions simultaneously.', 'multiple-choice', 'advanced', 5, '[{"id":"a","text":"To replace JSX with templates","isCorrect":false},{"id":"b","text":"To enable incremental, interruptible, and prioritized rendering","isCorrect":true},{"id":"c","text":"To remove the need for components","isCorrect":false},{"id":"d","text":"To make React work only on the server","isCorrect":false}]', NULL, 'React Fiber''s main goal is incremental rendering to enable smoother UIs by breaking work into chunks and prioritizing updates.', NULL, ARRAY[]::text[], ARRAY['react','fiber','incremental-rendering','concurrency','performance'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-020","original_type":"multiple-choice","topic":"React Fiber","subcategory":"Advanced","sample_answers":[],"time_limit":300,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z');
