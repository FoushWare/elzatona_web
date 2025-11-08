INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '9200bc91-a3c1-4337-97f2-a0d99486ebe7',
          'What is React?',
          'React (aka React.js or ReactJS) is an **open-source front-end JavaScript library** for building user interfaces based on components. It''s used for handling the view layer in web and mobile applications, and allows developers to create reusable UI components and manage the state of those components efficiently.

React was created by [Jordan Walke](https://github.com/jordwalke), a software engineer at Facebook (now Meta). It was first deployed on Facebook''s News Feed in 2011 and on Instagram in 2012. The library was open-sourced in May 2013 and has since become one of the most popular JavaScript libraries for building modern user interfaces.',
          'multiple-choice',
          'beginner',
          2,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'React is a declarative, efficient, and flexible JavaScript library for building user interfaces using a component-based architecture.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','library','ui','components','frontend']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-001","original_type":"open-ended","topic":"React Basics","subcategory":"Fundamentals","sample_answers":["React is a JavaScript library for building user interfaces by composing reusable components.","React is an open-source front-end library maintained by Meta for creating interactive UIs with a virtual DOM and unidirectional data flow."],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'dee0767e-36d9-46f0-882e-dac3dd9aaba2',
          'What is the history behind React''s evolution?',
          'The history of ReactJS started in 2010 with the creation of **XHP**. XHP is a PHP extension which improved the syntax of the language such that XML document fragments become valid PHP expressions and the primary purpose was used to create custom and reusable HTML elements.

The main principle of this extension was to make front-end code easier to understand and to help avoid cross-site scripting attacks. The project was successful to prevent the malicious content submitted by the scrubbing user.

But there was a different problem with XHP in which dynamic web applications require many roundtrips to the server, and XHP did not solve this problem. Also, the whole UI was re-rendered for small change in the application. Later, the initial prototype of React is created with the name **FaxJ** by Jordan inspired from XHP. Finally after sometime React has been introduced as a new library into JavaScript world.',
          'multiple-choice',
          'intermediate',
          4,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'React was inspired by XHP, a PHP extension at Facebook. It evolved to solve performance issues with full re-renders by introducing the Virtual DOM, and has since grown with features like Hooks, Concurrent Mode, and Server Components.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','history','xhp','facebook','evolution']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-002","original_type":"open-ended","topic":"React Basics","subcategory":"History","sample_answers":["React originated from Facebook''s XHP project. Jordan Walke created FaxJS (later React) to bring XHP''s component model to JavaScript with better performance via the Virtual DOM.","React was first used internally at Facebook in 2011, open-sourced in 2013, and evolved through major milestones like React Native (2015), Fiber (2017), Hooks (2019), and React 18 (2022)."],"time_limit":180,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'a44caacf-fc2d-4a8d-8c21-a169ab01c4dd',
          'What are the major features of React?',
          'React offers a powerful set of features that have made it one of the most popular JavaScript libraries for building user interfaces:

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
- **Suspense**: A feature that lets your components "wait" for something before rendering.',
          'multiple-choice',
          'beginner',
          3,
          '[{"id":"a","text":"Component-Based Architecture, Virtual DOM, JSX, Unidirectional Data Flow, Hooks, Context API, Error Boundaries, SSR, Concurrent Mode, Suspense, Server Components","isCorrect":true},{"id":"b","text":"Two-way data binding, templates, dependency injection, directives","isCorrect":false},{"id":"c","text":"Controllers, Models, Views, Services, Filters","isCorrect":false},{"id":"d","text":"Observables, Pipes, Modules, Decorators","isCorrect":false}]',
          NULL,
          'React''s major features include component architecture, Virtual DOM, JSX, unidirectional data flow, Hooks, Context API, Error Boundaries, SSR, Concurrent Mode, Suspense, and Server Components.',
          NULL,
          ARRAY[]::text[],
          '["react","features","virtual-dom","jsx","hooks","context"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-003","original_type":"multiple-choice","topic":"React Basics","subcategory":"Features","sample_answers":[],"time_limit":180,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '89dd2dc1-c4aa-4e30-9bcc-bfefeb9cd269',
          'What is JSX?',
          '_JSX_ stands for _JavaScript XML_ and it is an XML-like syntax extension to ECMAScript. Basically it just provides the syntactic sugar for the `React.createElement(type, props, ...children)` function, giving us expressiveness of JavaScript along with HTML like template syntax.

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
```',
          'multiple-choice',
          'beginner',
          2,
          '[{"id":"a","text":"A templating engine like Handlebars","isCorrect":false},{"id":"b","text":"Syntactic sugar for React.createElement()","isCorrect":true},{"id":"c","text":"A new programming language","isCorrect":false},{"id":"d","text":"A CSS preprocessor","isCorrect":false}]',
          NULL,
          'JSX is syntactic sugar for React.createElement(). It allows writing HTML-like syntax in JavaScript, which gets compiled to function calls.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','jsx','syntax','createElement']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-004","original_type":"multiple-choice","topic":"JSX","subcategory":"Syntax","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '29560bcb-8f55-4cb2-86ad-541ee30bf1a9',
          'What is the difference between an Element and a Component?',
          '**Element:**
- A React **Element** is a plain JavaScript object that describes what you want to see on the UI. It represents a DOM node or a component at a specific point in time. 
- Elements are immutable.
- Creating an element is fast and lightweight.

**Component:**
- A **Component** is a function or class that returns an element (or a tree of elements).
- Components can accept inputs (props) and manage their own state.

In summary:
- **Elements** are the smallest building blocks in React—objects that describe what you want to see.
- **Components** are functions or classes that return elements and encapsulate logic, structure, and behavior for parts of your UI.',
          'multiple-choice',
          'intermediate',
          4,
          '[{"id":"a","text":"An element is a function; a component is an object","isCorrect":false},{"id":"b","text":"An element is a plain object describing UI; a component is a function/class that returns elements","isCorrect":true},{"id":"c","text":"Elements are stateful; components are stateless","isCorrect":false},{"id":"d","text":"Components are DOM nodes; elements are virtual","isCorrect":false}]',
          NULL,
          'An element is a plain object describing what should appear on screen. A component is a function or class that returns elements.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','element','component','rendering']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-005","original_type":"multiple-choice","topic":"React Basics","subcategory":"Core Concepts","sample_answers":[],"time_limit":180,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'ae7cb4f1-037a-4821-9aa8-7d8eb0c9518e',
          'How do you create components in React?',
          'Components are the building blocks of creating User Interfaces(UI) in React. There are two possible ways to create a component.

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
   ```',
          'multiple-choice',
          'beginner',
          2,
          '[{"id":"a","text":"Only with classes","isCorrect":false},{"id":"b","text":"Only with functions","isCorrect":false},{"id":"c","text":"With functions or classes","isCorrect":true},{"id":"d","text":"With HTML templates only","isCorrect":false}]',
          NULL,
          'React components can be created as functions or ES6 classes. Function components are preferred in modern React.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','function-component','class-component','components']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-006","original_type":"multiple-choice","topic":"Components","subcategory":"Component Types","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '0f455016-95d2-4a09-8b4e-89e7040c1fc5',
          'When should you use a Class Component over a Function Component?',
          'After the addition of Hooks(i.e. React 16.8 onwards) it is always recommended to use Function components over Class components in React. Because you could use state, lifecycle methods and other features that were only available in class component present in function component too.

But even there are two reasons to use Class components over Function components.
1. If you need a React functionality whose Function component equivalent is not present yet, like Error Boundaries.
2. In older versions, If the component needs _state or lifecycle methods_ then you need to use class component.',
          'multiple-choice',
          'intermediate',
          3,
          '[{"id":"a","text":"Always use class components for performance","isCorrect":false},{"id":"b","text":"Use class components only for Error Boundaries or legacy code","isCorrect":true},{"id":"c","text":"Class components are required for all stateful logic","isCorrect":false},{"id":"d","text":"Function components cannot use props","isCorrect":false}]',
          NULL,
          'Since React 16.8, function components with Hooks are preferred. Class components are mainly needed for Error Boundaries (though third-party libraries like react-error-boundary can avoid this).',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','class-component','function-component','hooks','error-boundaries']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-007","original_type":"multiple-choice","topic":"Components","subcategory":"Best Practices","sample_answers":[],"time_limit":180,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '98984a15-1ce8-420e-9515-b5aab8845835',
          'What are Pure Components?',
          'Pure components are the components which render the same output for the same state and props. In function components, you can achieve these pure components through memoized `React.memo()` API wrapping around the component. This API prevents unnecessary re-renders by comparing the previous props and new props using shallow comparison.

In class components, the components extending _`React.PureComponent`_ instead of _`React.Component`_ become the pure components. When props or state changes, _PureComponent_ will do a shallow comparison on both props and state by invoking `shouldComponentUpdate()` lifecycle method.',
          'multiple-choice',
          'intermediate',
          4,
          '[{"id":"a","text":"Components that never re-render","isCorrect":false},{"id":"b","text":"Components that render the same output for the same props/state and avoid unnecessary re-renders","isCorrect":true},{"id":"c","text":"Components that only accept string props","isCorrect":false},{"id":"d","text":"Components that must be written in TypeScript","isCorrect":false}]',
          NULL,
          'Pure components optimize performance by preventing re-renders when props/state haven''t changed. Use React.memo() for function components and PureComponent for class components.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','pure-component','react-memo','performance','re-render']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-008","original_type":"multiple-choice","topic":"Performance Optimization","subcategory":"Optimization","sample_answers":[],"time_limit":240,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '62766e37-7c27-423c-a4cf-63744eb7ed69',
          'What is state in React?',
          '_State_ of a component is an object that holds some information that may change over the lifetime of the component. The important point is whenever the state object changes, the component re-renders.

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
```',
          'multiple-choice',
          'beginner',
          2,
          '[{"id":"a","text":"Immutable data passed from parent components","isCorrect":false},{"id":"b","text":"Mutable data that triggers re-renders when changed","isCorrect":true},{"id":"c","text":"Static configuration for a component","isCorrect":false},{"id":"d","text":"A global store like Redux","isCorrect":false}]',
          NULL,
          'State is mutable data that triggers re-renders when updated. In function components, it''s managed with useState; in class components, with this.state.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','state','useState','component-state']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-009","original_type":"multiple-choice","topic":"State","subcategory":"State Management","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '0ee2bbaf-8f68-40e5-adc6-4a6e172bd76b',
          'What are props in React?',
          '_Props_ are inputs to components. They are single values or objects containing a set of values that are passed to components on creation similar to HTML-tag attributes. Here, the data is passed down from a parent component to a child component.

The primary purpose of props in React is to provide following component functionality:
1. Pass custom data to your component.
2. Trigger state changes.
3. Use via `this.props.reactProp` inside component''s `render()` method.',
          'multiple-choice',
          'beginner',
          2,
          '[{"id":"a","text":"Mutable data managed by the component itself","isCorrect":false},{"id":"b","text":"Read-only inputs passed from parent to child","isCorrect":true},{"id":"c","text":"Global variables accessible anywhere","isCorrect":false},{"id":"d","text":"Event handlers only","isCorrect":false}]',
          NULL,
          'Props are read-only inputs passed from parent to child components to configure behavior or display data.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','props','properties','data-flow']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-010","original_type":"multiple-choice","topic":"Props","subcategory":"Data Flow","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '40e0cb90-e163-4e52-8155-ee1067d3f8fe',
          'What is the difference between state and props?',
          '### State
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
| Update    | Using setState/useState             | Cannot be updated by the component|',
          'multiple-choice',
          'beginner',
          3,
          '[{"id":"a","text":"State is immutable; props are mutable","isCorrect":false},{"id":"b","text":"State is managed internally and mutable; props are passed from parent and read-only","isCorrect":true},{"id":"c","text":"Props can be changed with this.setProps()","isCorrect":false},{"id":"d","text":"State and props are the same thing","isCorrect":false}]',
          NULL,
          'State is mutable and managed internally; props are immutable and passed from parents.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','state','props','data-flow','immutability']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-011","original_type":"multiple-choice","topic":"State","subcategory":"Core Concepts","sample_answers":[],"time_limit":150,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'bc701eff-6aeb-47f8-b0ba-bbdc092de338',
          'What is the difference between HTML and React event handling?',
          'Below are some of the main differences between HTML and React event handling,
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
   Whereas in react you should not append `()` with the function name.',
          'multiple-choice',
          'beginner',
          3,
          '[{"id":"a","text":"React uses lowercase event names like HTML","isCorrect":false},{"id":"b","text":"React uses camelCase, requires explicit preventDefault(), and passes function references","isCorrect":true},{"id":"c","text":"React uses strings for event handlers like HTML","isCorrect":false},{"id":"d","text":"React doesn''t support event handling","isCorrect":false}]',
          NULL,
          'React uses camelCase for event names, requires explicit preventDefault(), and passes function references (not strings).',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','events','event-handling','camelcase','preventdefault']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-012","original_type":"multiple-choice","topic":"Event Handling","subcategory":"Events","sample_answers":[],"time_limit":150,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'e0c40524-36f9-4932-bda4-f4db13ee9d24',
          'What are synthetic events in React?',
          '`SyntheticEvent` is a cross-browser wrapper around the browser''s native event. Its API is same as the browser''s native event, including `stopPropagation()` and `preventDefault()`, except the events work identically across all browsers. The native events can be accessed directly from synthetic events using `nativeEvent` attribute.

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
```',
          'multiple-choice',
          'intermediate',
          3,
          '[{"id":"a","text":"Native browser events","isCorrect":false},{"id":"b","text":"React''s cross-browser wrapper around native events","isCorrect":true},{"id":"c","text":"Custom events created with Event constructor","isCorrect":false},{"id":"d","text":"Events that only work in development mode","isCorrect":false}]',
          NULL,
          'SyntheticEvent is a React wrapper around native browser events, providing consistent API across browsers.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','synthetic-event','events','cross-browser']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-013","original_type":"multiple-choice","topic":"Event Handling","subcategory":"Events","sample_answers":[],"time_limit":180,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '52ef629a-9cc3-4326-becd-1cc45ae54a2f',
          'What are inline conditional expressions?',
          'You can use either _if statements_ or _ternary expressions_ which are available in JS(and JSX in React) to conditionally execute or render expressions. Apart from these approaches, you can also embed any expressions in JSX by wrapping them in curly braces and then followed by JS logical operator `&&`. It is helpful to render elements conditionally within a single line and commonly used for concise logic, especially in JSX rendering.

```jsx harmony
<h1>Hello!</h1>;
{
  messages.length > 0 && !isLogin ? (
    <h2>You have {messages.length} unread messages.</h2>
  ) : (
    <h2>You don''t have unread messages.</h2>
  );
}
```',
          'multiple-choice',
          'beginner',
          2,
          '[{"id":"a","text":"Only if/else blocks outside JSX","isCorrect":false},{"id":"b","text":"Ternary operators and && expressions inside JSX","isCorrect":true},{"id":"c","text":"Switch statements only","isCorrect":false},{"id":"d","text":"No conditional rendering in React","isCorrect":false}]',
          NULL,
          'React supports ternary operators and && for inline conditional rendering in JSX.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','conditional-rendering','ternary','logical-and','jsx']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-014","original_type":"multiple-choice","topic":"Conditional Rendering","subcategory":"Rendering","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'de163512-f656-461b-96ea-f1fba78c9372',
          'What is the "key" prop and what is its benefit when used in arrays of elements?',
          'A `key` is a special attribute you **should** include when mapping over arrays to render data. _Key_ prop helps React identify which items have changed, are added, or are removed.

Keys should be unique among its siblings. Most often we use ID from our data as _key_:
```jsx harmony
const todoItems = todos.map((todo) => <li key={todo.id}>{todo.text}</li>);
```

**Benefits of key:**
  *   Enables React to **efficiently update and re-render** components.
  *   Prevents unnecessary re-renders by **reusing** components when possible.
  *   Helps **maintain internal state** of list items correctly.',
          'multiple-choice',
          'intermediate',
          4,
          '[{"id":"a","text":"Keys are only for styling","isCorrect":false},{"id":"b","text":"Keys help React identify changes in lists for efficient updates and state preservation","isCorrect":true},{"id":"c","text":"Keys must be globally unique across the entire app","isCorrect":false},{"id":"d","text":"Keys are optional and have no performance impact","isCorrect":false}]',
          NULL,
          'Keys help React identify which list items have changed, been added, or removed, enabling efficient updates and correct state management.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','key','lists','rendering','performance']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-015","original_type":"multiple-choice","topic":"Lists and Keys","subcategory":"Lists","sample_answers":[],"time_limit":180,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '01a46ae2-b15e-4331-9544-471d247e143d',
          'What is Virtual DOM?',
          'The _Virtual DOM_ (VDOM) is a lightweight, in-memory representation of _Real DOM_ used by libraries like React to optimize UI rendering. The representation of a UI is kept in memory and synced with the "real" DOM. It''s a step that happens between the render function being called and the displaying of elements on the screen. This entire process is called _reconciliation_.',
          'multiple-choice',
          'beginner',
          2,
          '[{"id":"a","text":"A real browser DOM node","isCorrect":false},{"id":"b","text":"An in-memory representation of the real DOM for efficient updates","isCorrect":true},{"id":"c","text":"A CSS rendering engine","isCorrect":false},{"id":"d","text":"A database for storing component state","isCorrect":false}]',
          NULL,
          'Virtual DOM is an in-memory representation of the real DOM that enables efficient diffing and minimal updates.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','virtual-dom','reconciliation','performance']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-016","original_type":"multiple-choice","topic":"Virtual DOM","subcategory":"Architecture","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '319c294c-0ad6-49ff-baa9-d7fece743145',
          'How does the Virtual DOM work?',
          'The _Virtual DOM_ works in five simple steps.
**1. Initial Render**  
When a UI component renders for the first time, it returns JSX. React uses this structure to create a Virtual DOM tree.
**2. State or Props Change**  
When the component''s state or props change, React creates a new Virtual DOM.
**3. Diffing Algorithm**  
React compares the new Virtual DOM with the previous one.
**4. Reconciliation**  
Based on the diffing results, React decides which parts of the Real DOM should be updated.
**5. Efficient DOM Updates**  
This process makes UI rendering much faster and more efficient.',
          'multiple-choice',
          'intermediate',
          4,
          '[{"id":"a","text":"It replaces the entire real DOM on every change","isCorrect":false},{"id":"b","text":"It creates a new Virtual DOM, diffs it with the old one, and updates only changed real DOM nodes","isCorrect":true},{"id":"c","text":"It uses direct DOM manipulation without any abstraction","isCorrect":false},{"id":"d","text":"It only works in development mode","isCorrect":false}]',
          NULL,
          'React creates a new Virtual DOM on state change, diffs it with the previous one, and updates only the changed parts of the real DOM.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','virtual-dom','diffing','reconciliation','performance']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-017","original_type":"multiple-choice","topic":"Virtual DOM","subcategory":"Architecture","sample_answers":[],"time_limit":240,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'a3717946-4b2c-495a-9fb5-457193520929',
          'What is the difference between Shadow DOM and Virtual DOM?',
          'The _Shadow DOM_ is a browser technology designed primarily for scoping variables and CSS in _web components_. The _Virtual DOM_ is a concept implemented by libraries in JavaScript on top of browser APIs.

| Feature | Shadow DOM | Virtual DOM |
| --- | --- | --- |
| Purpose | Encapsulation for Web Components | Efficient UI rendering |
| Managed by | Browser | JS frameworks (e.g., React) |
| DOM Type | Part of real DOM (scoped) | In-memory representation |
| Encapsulation | Yes | No |
| Use Case | Web Components, scoped styling | UI diffing and minimal DOM updates |',
          'multiple-choice',
          'intermediate',
          3,
          '[{"id":"a","text":"They are the same thing","isCorrect":false},{"id":"b","text":"Shadow DOM is for Web Components encapsulation; Virtual DOM is for React''s efficient rendering","isCorrect":true},{"id":"c","text":"Virtual DOM is part of the browser; Shadow DOM is a React feature","isCorrect":false},{"id":"d","text":"Both are managed by the browser","isCorrect":false}]',
          NULL,
          'Shadow DOM is a browser feature for encapsulation in Web Components; Virtual DOM is a React concept for efficient rendering.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','shadow-dom','virtual-dom','web-components','encapsulation']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-018","original_type":"multiple-choice","topic":"Virtual DOM","subcategory":"Architecture","sample_answers":[],"time_limit":180,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'f46a6bee-1dee-4935-a806-875ee2a09583',
          'What is React Fiber?',
          '**React Fiber** is the **new reconciliation engine** in React, introduced in React 16. It''s a complete rewrite of React''s core algorithm(old stack-based algorithm) for rendering and updating the UI. Fiber enhances React''s ability to handle **asynchronous rendering**, **prioritized updates**(assign priority to different types of updates), and **interruption**(ability to pause, abort, or reuse work) of rendering work, enabling smoother and more responsive user interfaces.',
          'multiple-choice',
          'advanced',
          5,
          '[{"id":"a","text":"A new CSS-in-JS library","isCorrect":false},{"id":"b","text":"React''s new reconciliation engine for async rendering and prioritization","isCorrect":true},{"id":"c","text":"A state management library like Redux","isCorrect":false},{"id":"d","text":"A testing utility","isCorrect":false}]',
          NULL,
          'React Fiber is the new reconciliation engine in React 16+ that enables async rendering, prioritization, and interruption for better performance.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','fiber','reconciliation','concurrent-mode','async-rendering']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-019","original_type":"multiple-choice","topic":"React Fiber","subcategory":"Advanced","sample_answers":[],"time_limit":300,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '983554fa-e51a-46b1-8d28-7c2f3c7c5767',
          'What is the main goal of React Fiber?',
          'The goal of _React Fiber_ is to increase its suitability for areas like animation, layout, and gestures. Its headline feature is **incremental rendering**: the ability to split rendering work into chunks and spread it out over multiple frames.

Its main goals are:
*   **Incremental Rendering** – Breaks work into chunks for smoother updates.
*   **Interruptible Rendering** – Pauses and resumes rendering to keep the UI responsive.
*   **Prioritization** – Handles high-priority updates before low-priority ones.
*   **Concurrency Support** – Enables working on multiple UI versions simultaneously.',
          'multiple-choice',
          'advanced',
          5,
          '[{"id":"a","text":"To replace JSX with templates","isCorrect":false},{"id":"b","text":"To enable incremental, interruptible, and prioritized rendering","isCorrect":true},{"id":"c","text":"To remove the need for components","isCorrect":false},{"id":"d","text":"To make React work only on the server","isCorrect":false}]',
          NULL,
          'React Fiber''s main goal is incremental rendering to enable smoother UIs by breaking work into chunks and prioritizing updates.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','fiber','incremental-rendering','concurrency','performance']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-020","original_type":"multiple-choice","topic":"React Fiber","subcategory":"Advanced","sample_answers":[],"time_limit":300,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '304f25cb-922a-4272-b620-eab54ddc4bcc',
          'What are controlled components?',
          'A **controlled component** is a React component that **fully manages the form element''s state**(e.g, elements like `<input>`, `<textarea>`, or `<select>`))  using React''s internal state mechanism. i.e, The component does not manage its own internal state — instead, React acts as the single source of truth for form data.

The controlled components will be implemented using the below steps,
1. Initialize the state using `useState` hooks in function components or inside constructor for class components.
2. Set the value of the form element to the respective state variable.
3. Create an event handler(`onChange`) to handle the user input changes through `useState`''s updater function or `setState` from class component.
4. Attach the above event handler to form element''s change or click events',
          'multiple-choice',
          'intermediate',
          4,
          '[{"id":"a","text":"Form elements that manage their own state via the DOM","isCorrect":false},{"id":"b","text":"Form elements whose value is controlled by React state","isCorrect":true},{"id":"c","text":"Components that don''t re-render","isCorrect":false},{"id":"d","text":"Components that can''t use hooks","isCorrect":false}]',
          NULL,
          'Controlled components use React state as the single source of truth for form data, with value and onChange handlers.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','controlled-components','forms','state','input']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-021","original_type":"multiple-choice","topic":"Forms","subcategory":"Forms","sample_answers":[],"time_limit":240,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '98b3305a-6a56-45e0-aad5-12bcd01752ad',
          'What are uncontrolled components?',
          'The **Uncontrolled components** are form elements (like `<input>`, `<textarea>`, or `<select>`) that **manage their own state internally** via the **DOM**, rather than through React state.

You can query the DOM using a `ref` to find its current value when you need it. This is a bit more like traditional HTML.',
          'multiple-choice',
          'intermediate',
          4,
          '[{"id":"a","text":"Components that use React state for everything","isCorrect":false},{"id":"b","text":"Form elements that manage their own state in the DOM and use refs to access values","isCorrect":true},{"id":"c","text":"Components that are not rendered","isCorrect":false},{"id":"d","text":"Components that can''t have children","isCorrect":false}]',
          NULL,
          'Uncontrolled components store their state in the DOM and use refs to access values when needed.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','uncontrolled-components','forms','refs','dom']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-022","original_type":"multiple-choice","topic":"Forms","subcategory":"Forms","sample_answers":[],"time_limit":240,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'aba8d0c4-7a1e-4b07-af62-845ee76020c7',
          'What is the difference between createElement and cloneElement?',
          '#### **createElement:** 
Creates a new React element from scratch. JSX elements will be transpiled to `React.createElement()` functions.

#### **cloneElement:**
 The `cloneElement` method is used to clone an existing React element and optionally adds or overrides props.',
          'multiple-choice',
          'intermediate',
          3,
          '[{"id":"a","text":"Both create new elements from scratch","isCorrect":false},{"id":"b","text":"createElement creates new elements; cloneElement clones existing elements and overrides props","isCorrect":true},{"id":"c","text":"cloneElement is for class components only","isCorrect":false},{"id":"d","text":"createElement is deprecated","isCorrect":false}]',
          NULL,
          'createElement creates new elements; cloneElement clones existing ones and optionally overrides props.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','createelement','cloneelement','elements','jsx']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-023","original_type":"multiple-choice","topic":"React Basics","subcategory":"API","sample_answers":[],"time_limit":180,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '7ed851f8-b6dd-4f40-889d-c6d64d94348d',
          'What is Lifting State Up in React?',
          'When several components need to share the same changing data then it is recommended to _lift the shared state up_ to their closest common ancestor. That means if two child components share the same data from its parent, then move the state to parent instead of maintaining local state in both of the child components.',
          'multiple-choice',
          'intermediate',
          3,
          '[{"id":"a","text":"Moving state to a child component","isCorrect":false},{"id":"b","text":"Moving shared state to the closest common ancestor","isCorrect":true},{"id":"c","text":"Storing state in localStorage","isCorrect":false},{"id":"d","text":"Using global variables for state","isCorrect":false}]',
          NULL,
          'Lifting state up means moving shared state to the closest common ancestor so multiple components can access it.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','lifting-state-up','state','components','data-flow']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-024","original_type":"multiple-choice","topic":"State Management","subcategory":"Patterns","sample_answers":[],"time_limit":180,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '083f539f-0ed9-4508-a9a8-1992fbb82c49',
          'What are Higher-Order Components?',
          'A _higher-order component_ (_HOC_) is a function that takes a component and returns a new enhanced component with additional props, behavior, or data. It''s a design pattern based on React''s compositional nature, allowing you to reuse logic across multiple components without modifying their internals.

```javascript
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```',
          'multiple-choice',
          'intermediate',
          4,
          '[{"id":"a","text":"Components that are higher in the DOM tree","isCorrect":false},{"id":"b","text":"Functions that take a component and return a new enhanced component","isCorrect":true},{"id":"c","text":"Components with more than 100 lines of code","isCorrect":false},{"id":"d","text":"Components that must be class-based","isCorrect":false}]',
          NULL,
          'HOCs are functions that take a component and return a new enhanced component, enabling logic reuse.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','hoc','higher-order-component','composition','reuse']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-025","original_type":"multiple-choice","topic":"Higher-Order Components","subcategory":"Patterns","sample_answers":[],"time_limit":240,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '61e95f0b-eeb1-48d8-a603-7d2c41b3acbb',
          'Give a simple example of Jest test case',
          'Let''s write a test for a function that adds two numbers in `sum.js` file:

```javascript
const sum = (a, b) => a + b;

export default sum;
```

Create a file named `sum.test.js` which contains actual test:

```javascript
import sum from "./sum";

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});
```

And then add the following section to your `package.json`:

```json
{
  "scripts": {
    "test": "jest"
  }
}
```

Finally, run `yarn test` or `npm test` and Jest will print a result.',
          'multiple-choice',
          'beginner',
          5,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'This is a basic Jest test case demonstrating how to test a pure function using `expect().toBe()`. Jest automatically finds files ending in `.test.js` and runs them when the `test` script is executed.',
          NULL,
          ARRAY[]::text[],
          ARRAY['jest','testing','unit-testing','javascript']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q101","original_type":"open-ended","topic":"Unit Testing","subcategory":"Jest","sample_answers":["A Jest test file imports the function to test, uses `test()` to define a test case, and asserts expected behavior with `expect().toBe()`.","The test verifies that `sum(1, 2)` returns `3`, and Jest runs it via `npm test` after configuring the script in `package.json`."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '3cc40b44-4552-4f12-a09d-c140a790e0e1',
          'What is Flux?',
          'Flux is an application architecture (not a framework or library) designed by Facebook to manage data flow in React applications. It emphasizes a unidirectional data flow using four key components: Actions, Dispatcher, Stores, and Views (React Components).',
          'multiple-choice',
          'intermediate',
          8,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Flux enforces unidirectional data flow: Views trigger Actions → Dispatcher broadcasts Actions → Stores update → Views re-render. This makes state changes predictable and easier to debug.',
          NULL,
          ARRAY[]::text[],
          ARRAY['flux','react','architecture','state-management']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q102","original_type":"open-ended","topic":"Flux Architecture","subcategory":"Design Patterns","sample_answers":["Flux is an architecture that uses a unidirectional data flow with Actions, a central Dispatcher, Stores for state, and React Views that respond to store changes.","Unlike MVC, Flux avoids two-way binding and ensures data flows in one direction, improving traceability and reducing side effects."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'f8397665-77e9-482f-9c41-a4ba6048bd06',
          'What is Redux?',
          'Redux is a predictable state container for JavaScript applications, most commonly used with React. It helps manage and centralize application state in a single source of truth.',
          'multiple-choice',
          'beginner',
          5,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Redux provides a centralized store for application state, updated only via pure reducer functions in response to dispatched actions. It enables time-travel debugging and predictable state changes.',
          NULL,
          ARRAY[]::text[],
          ARRAY['redux','state-management','react','javascript']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q103","original_type":"open-ended","topic":"Redux","subcategory":"State Management","sample_answers":["Redux is a state management library that stores the entire app state in a single immutable object tree, updated only by dispatching actions to pure reducer functions.","It offers a single source of truth, read-only state, and changes via pure functions—making apps easier to test, debug, and scale."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '932d852c-4854-4cf5-a75a-b925f16ea817',
          'What are the core principles of Redux?',
          'Redux follows three fundamental principles:
1. Single source of truth
2. State is read-only
3. Changes are made with pure functions (Reducers)',
          'multiple-choice',
          'beginner',
          6,
          '[{"id":"a","text":"Single store, mutable state, async reducers","isCorrect":false},{"id":"b","text":"Multiple stores, read-only state, impure reducers","isCorrect":false},{"id":"c","text":"Single source of truth, read-only state, pure reducer functions","isCorrect":true},{"id":"d","text":"Global state, two-way binding, side-effectful reducers","isCorrect":false}]',
          NULL,
          'The three principles ensure predictability: (1) all state in one store, (2) state changed only by dispatching actions, (3) reducers are pure functions that return new state.',
          NULL,
          ARRAY[]::text[],
          ARRAY['redux','principles','state-management']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q104","original_type":"multiple-choice","topic":"Redux","subcategory":"State Management","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '7d2b1ef1-8d51-44eb-a7d2-3e3a283a28e7',
          'What are the downsides of Redux compared to Flux?',
          'While Redux offers a powerful state management solution, it comes with trade-offs compared to Flux, including strict immutability, need for complementary packages, and less seamless static type integration.',
          'multiple-choice',
          'intermediate',
          7,
          '[{"id":"a","text":"Redux allows mutable state by default","isCorrect":false},{"id":"b","text":"Redux requires immutability, careful package selection, and has less mature static type support","isCorrect":true},{"id":"c","text":"Flux is more minimal than Redux","isCorrect":false},{"id":"d","text":"Redux uses two-way data binding","isCorrect":false}]',
          NULL,
          'Redux requires immutability discipline, careful middleware selection, and historically had weaker static typing support than Flux with Flow.',
          NULL,
          ARRAY[]::text[],
          ARRAY['redux','flux','comparison','state-management']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q105","original_type":"multiple-choice","topic":"Redux","subcategory":"State Management","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '28d6eddf-0211-4cf2-a348-471d4d70918e',
          'What is the difference between `mapStateToProps()` and `mapDispatchToProps()`?',
          '`mapStateToProps()` connects Redux state to component props. `mapDispatchToProps()` connects action dispatchers to component props.',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"`mapStateToProps` dispatches actions; `mapDispatchToProps` reads state","isCorrect":false},{"id":"b","text":"`mapStateToProps` reads state; `mapDispatchToProps` dispatches actions","isCorrect":true},{"id":"c","text":"Both are used only for async logic","isCorrect":false},{"id":"d","text":"They are identical in functionality","isCorrect":false}]',
          NULL,
          '`mapStateToProps` reads from the store; `mapDispatchToProps` dispatches actions. The object shorthand form is preferred for `mapDispatchToProps`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react-redux','connect','mapstatetoprops','mapdispatchtoprops']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q106","original_type":"multiple-choice","topic":"React Redux","subcategory":"State Management","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '7eb792f5-bf35-408d-b0da-83618f5b99d0',
          'Can I dispatch an action in a reducer?',
          'Dispatching an action within a reducer is an anti-pattern. Reducers should be pure functions without side effects.',
          'true-false',
          'intermediate',
          4,
          '[{"id":"true","text":"True","isCorrect":false},{"id":"false","text":"False","isCorrect":true}]',
          'false',
          'Reducers must be pure: no side effects, no API calls, no dispatching. Dispatching inside a reducer breaks predictability and can cause infinite loops.',
          NULL,
          ARRAY[]::text[],
          ARRAY['redux','reducers','side-effects','anti-pattern']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q107","original_type":"true-false","topic":"Redux","subcategory":"State Management","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'd08446e8-833c-401a-908f-3a8874f3274d',
          'How to access Redux store outside a component?',
          'You can export the store instance from the module where it was created using `createStore()`.',
          'multiple-choice',
          'intermediate',
          5,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Export the store from its creation file and import it where needed. Avoid attaching it to `window` in production.',
          NULL,
          ARRAY[]::text[],
          ARRAY['redux','store','outside-component']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q108","original_type":"open-ended","topic":"Redux","subcategory":"State Management","sample_answers":["Export the store from the file where `createStore()` is called, then import it in other modules to use `store.dispatch()` or `store.getState()`.","Example: `export default createStore(reducer);` then `import store from ''./store'';`"],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '07e9a3df-6432-4632-83c7-83059c1d9836',
          'What are the drawbacks of MVW pattern?',
          'Drawbacks include expensive DOM manipulation, circular dependencies, difficulty handling collaborative data changes, and lack of easy undo functionality.',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"Easy undo, cheap DOM updates, no circular dependencies","isCorrect":false},{"id":"b","text":"Expensive DOM manipulation, circular dependencies, no easy undo","isCorrect":true},{"id":"c","text":"Built-in time-travel debugging","isCorrect":false},{"id":"d","text":"Unidirectional data flow by default","isCorrect":false}]',
          NULL,
          'MVW (Model-View-Whatever) inherits MVC’s issues: tight coupling, hard-to-debug state, and no built-in time-travel or undo.',
          NULL,
          ARRAY[]::text[],
          ARRAY['mvc','mvvm','mvw','architecture']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q109","original_type":"multiple-choice","topic":"MVC & MVVM","subcategory":"Design Patterns","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '90fd5606-2155-40c8-9e6c-abfe3b969009',
          'Are there any similarities between Redux and RxJS?',
          'Both use reactive programming concepts, but Redux is for state management architecture, while RxJS is a library for asynchronous programming with Observables.',
          'true-false',
          'advanced',
          5,
          '[{"id":"true","text":"True","isCorrect":false},{"id":"false","text":"False","isCorrect":true}]',
          'false',
          'Both are reactive: Redux store reacts to actions; RxJS streams react to events. But Redux is architectural; RxJS is a utility library.',
          NULL,
          ARRAY[]::text[],
          ARRAY['redux','rxjs','reactive','observables']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q110","original_type":"true-false","topic":"Reactive Programming","subcategory":"Functional Programming","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'f5c09afe-1ce3-4b23-93f5-aad7f432ea14',
          'How to reset state in Redux?',
          'Use a root reducer that returns `undefined` state on a logout action, causing reducers to return initial state.',
          'multiple-choice',
          'advanced',
          8,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Wrap the combined reducer in a root reducer that sets state to `undefined` on `USER_LOGOUT`, triggering all reducers to return initial state.',
          NULL,
          ARRAY[]::text[],
          ARRAY['redux','reset-state','logout','root-reducer']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q111","original_type":"open-ended","topic":"Redux","subcategory":"State Management","sample_answers":["Create a root reducer that checks for a ''USER_LOGOUT'' action and passes `undefined` as state to the main reducer, which then returns initial state.","If using `redux-persist`, also clear persisted storage keys before resetting state."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '6f713666-14d7-4bca-b926-28895193c07e',
          'What is the difference between React Context and React Redux?',
          'Context is for passing data to deeply nested components; Redux is a full state management solution with dev tools, middleware, and time-travel debugging.',
          'multiple-choice',
          'intermediate',
          7,
          '[{"id":"a","text":"Context provides middleware and time-travel debugging","isCorrect":false},{"id":"b","text":"Redux is simpler and built into React","isCorrect":false},{"id":"c","text":"Context is for simple prop drilling; Redux is a full state management library with advanced tooling","isCorrect":true},{"id":"d","text":"They are functionally identical","isCorrect":false}]',
          NULL,
          'Context is built-in but lacks Redux’s ecosystem (middleware, DevTools, etc.). Redux uses Context internally but offers more features.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','context','redux','state-management']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q112","original_type":"multiple-choice","topic":"Context API vs Redux","subcategory":"State Management","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'cd5ac8c2-9df2-4e4a-b3fd-2481b705a480',
          'Why are Redux state functions called reducers?',
          'Because they reduce a collection of actions and an initial state to a final state, similar to the `reduce()` array method.',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Like `Array.prototype.reduce()`, Redux reducers accumulate state by applying each action to the previous state.',
          NULL,
          ARRAY[]::text[],
          ARRAY['redux','reducers','functional-programming']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q113","original_type":"open-ended","topic":"Redux","subcategory":"State Management","sample_answers":["Reducers ''reduce'' a sequence of actions and an initial state into a final state, just like the reduce() function in functional programming.","Each action is applied to the current state to produce the next state, accumulating the result over time."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '24e09b22-deaf-47d3-a34a-3f5379cdf12f',
          'How to make AJAX request in Redux?',
          'Use middleware like `redux-thunk` to write async action creators that dispatch actions based on API responses.',
          'multiple-choice',
          'intermediate',
          8,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'With `redux-thunk`, action creators return a function that receives `dispatch` and can perform async logic before dispatching actions.',
          NULL,
          ARRAY[]::text[],
          ARRAY['redux','ajax','async','redux-thunk']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q114","original_type":"open-ended","topic":"Async Actions","subcategory":"State Management","sample_answers":["Use `redux-thunk` middleware to return a function from an action creator. Inside, dispatch a ''loading'' action, make the API call, then dispatch success or error actions.","Example: `export const fetchUser = (id) => async (dispatch) => { dispatch({type: ''LOADING''}); const res = await fetch(...); dispatch({type: ''SUCCESS'', payload: res}); }`"],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '69a0fe99-ce14-479a-a2c4-fad5423e0be9',
          'Should I keep all component''s state in Redux store?',
          'No. Keep global or shared state in Redux; keep UI or local state (e.g., form inputs, dropdown open state) in the component.',
          'true-false',
          'beginner',
          4,
          '[{"id":"true","text":"True","isCorrect":false},{"id":"false","text":"False","isCorrect":true}]',
          'false',
          'Only put state in Redux if it’s shared across components or needs to persist. Local UI state should stay in the component.',
          NULL,
          ARRAY[]::text[],
          ARRAY['redux','state','best-practices']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q115","original_type":"true-false","topic":"Redux Best Practices","subcategory":"State Management","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'cb04f5a1-ce01-4aa4-a59a-b406d3a0ed47',
          'What is the proper way to access Redux store in a component?',
          'Use the `connect()` function from `react-redux` to create a higher-order component that injects state and dispatch props.',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"Access `this.context.store` directly","isCorrect":false},{"id":"b","text":"Use `connect()` from `react-redux`","isCorrect":true},{"id":"c","text":"Import the store and call `store.getState()` in render","isCorrect":false},{"id":"d","text":"Use `useContext(StoreContext)` always","isCorrect":false}]',
          NULL,
          '`connect()` is the recommended way—it’s optimized and avoids direct store access via context.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react-redux','connect','hoc']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q116","original_type":"multiple-choice","topic":"React Redux","subcategory":"State Management","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '2d84026e-ad16-49a3-b410-6a62c839bd05',
          'What is the difference between component and container in React Redux?',
          'Components are presentational (dumb); containers are connected to Redux (smart) and handle data fetching and dispatching.',
          'multiple-choice',
          'beginner',
          5,
          '[{"id":"a","text":"Components handle logic; containers render UI","isCorrect":false},{"id":"b","text":"Components are presentational; containers are connected to Redux","isCorrect":true},{"id":"c","text":"They are the same","isCorrect":false},{"id":"d","text":"Containers cannot have children","isCorrect":false}]',
          NULL,
          'Containers are connected to Redux; components are pure UI. Modern React often uses hooks instead of this pattern.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','redux','container','presentational']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q117","original_type":"multiple-choice","topic":"React Redux","subcategory":"State Management","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'db20de3d-3f6a-4f07-be54-0c175202a2e5',
          'What is the purpose of constants in Redux?',
          'Constants (action types) prevent typos, enable IDE search, and centralize action type definitions.',
          'multiple-choice',
          'beginner',
          5,
          '[{"id":"a","text":"They increase bundle size unnecessarily","isCorrect":false},{"id":"b","text":"They prevent typos and enable better tooling","isCorrect":true},{"id":"c","text":"They are required by the Redux library","isCorrect":false},{"id":"d","text":"They make reducers slower","isCorrect":false}]',
          NULL,
          'Using constants like `ADD_TODO` instead of string literals avoids bugs from typos and makes refactoring easier.',
          NULL,
          ARRAY[]::text[],
          ARRAY['redux','constants','action-types']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q118","original_type":"multiple-choice","topic":"Redux","subcategory":"State Management","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '4cc3c31f-aef0-4533-9d03-124cabdc68bc',
          'What are the different ways to write `mapDispatchToProps()`?',
          'You can write it as a function with `dispatch`, use `bindActionCreators`, or use the object shorthand.',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"Only the function form is valid","isCorrect":false},{"id":"b","text":"Function with dispatch, bindActionCreators, or object shorthand","isCorrect":true},{"id":"c","text":"You must always use `bindActionCreators`","isCorrect":false},{"id":"d","text":"Object shorthand doesn’t work with `connect`","isCorrect":false}]',
          NULL,
          'The object shorthand `{ action }` is preferred—it’s concise and automatically binds dispatch.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react-redux','mapdispatchtoprops','bindactioncreators']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q119","original_type":"multiple-choice","topic":"React Redux","subcategory":"State Management","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'f515feaa-d016-474b-a3b0-ecc1b0a164d3',
          'What is the use of `ownProps` in `mapStateToProps` and `mapDispatchToProps`?',
          '`ownProps` contains the props passed to the connected component, allowing conditional mapping based on those props.',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'If your component is used as `<MyComp id={5} />`, then `ownProps` will be `{ id: 5 }` inside the `map` functions.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react-redux','ownprops','connect']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q120","original_type":"open-ended","topic":"React Redux","subcategory":"State Management","sample_answers":["`ownProps` lets you access the original props passed to the connected component, so you can filter state or bind actions based on those props.","Example: `mapStateToProps = (state, ownProps) => ({ user: state.users[ownProps.userId] })`"],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '280804b2-2c07-4783-bcec-01974c906083',
          'How to structure Redux top-level directories?',
          'Common structure: `components/`, `containers/`, `actions/`, `reducers/`, `store/`.',
          'multiple-choice',
          'beginner',
          5,
          '[{"id":"a","text":"All files in one folder","isCorrect":false},{"id":"b","text":"`components/`, `containers/`, `actions/`, `reducers/`, `store/`","isCorrect":true},{"id":"c","text":"Only `src/` and `test/`","isCorrect":false},{"id":"d","text":"No standard structure exists","isCorrect":false}]',
          NULL,
          'This structure separates concerns: dumb components, smart containers, action creators, reducers, and store setup.',
          NULL,
          ARRAY[]::text[],
          ARRAY['redux','structure','project-organization']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q121","original_type":"multiple-choice","topic":"Redux Project Structure","subcategory":"State Management","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '821323d8-cbb7-4a2a-b4d9-0825cef34612',
          'What is redux-saga?',
          '`redux-saga` is a middleware for handling side effects in Redux using generator functions.',
          'multiple-choice',
          'intermediate',
          7,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'It uses ES6 generators to manage complex async flows (e.g., cancellable requests, race conditions) in a declarative way.',
          NULL,
          ARRAY[]::text[],
          ARRAY['redux','saga','middleware','side-effects']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q122","original_type":"open-ended","topic":"Redux Saga","subcategory":"State Management","sample_answers":["`redux-saga` is a Redux middleware that uses generator functions to handle side effects like API calls, allowing complex async logic to be testable and cancellable.","It treats side effects as separate ''sagas'' that listen for actions and perform tasks using effects like `call()` and `put()`."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '34a723cb-4460-473b-91d9-24237de0d88f',
          'What is the mental model of redux-saga?',
          'A saga is like a background thread that handles side effects, started/paused/cancelled via Redux actions.',
          'multiple-choice',
          'advanced',
          8,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Sagas run in the background, watch for actions, and can dispatch new actions—all while being testable and cancellable.',
          NULL,
          ARRAY[]::text[],
          ARRAY['redux-saga','generators','side-effects']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q123","original_type":"open-ended","topic":"Redux Saga","subcategory":"State Management","sample_answers":["Think of a saga as a daemon process that lives alongside your app, listening for dispatched actions and performing side effects in response.","It’s a separate thread of execution managed by Redux middleware, using generators for async control flow."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '21a56a96-a443-4996-85cd-12f5335da2b7',
          'What are the differences between `call()` and `put()` in redux-saga?',
          '`call()` invokes a function (e.g., API call); `put()` dispatches an action to the store.',
          'multiple-choice',
          'intermediate',
          7,
          '[{"id":"a","text":"`call()` dispatches actions; `put()` makes API calls","isCorrect":false},{"id":"b","text":"`call()` invokes functions; `put()` dispatches actions","isCorrect":true},{"id":"c","text":"Both are used only for logging","isCorrect":false},{"id":"d","text":"`put()` is for database queries","isCorrect":false}]',
          NULL,
          '`call(fn, ...args)` is for invoking functions; `put(action)` is for dispatching actions.',
          NULL,
          ARRAY[]::text[],
          ARRAY['redux-saga','call','put','effects']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q124","original_type":"multiple-choice","topic":"Redux Saga","subcategory":"State Management","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '739edf01-6feb-452d-bb39-25a059846cdb',
          'What is Redux Thunk?',
          'Redux Thunk is middleware that allows action creators to return a function instead of an action object, enabling async logic.',
          'multiple-choice',
          'beginner',
          6,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'The thunk function receives `dispatch` and `getState`, allowing conditional or delayed dispatch.',
          NULL,
          ARRAY[]::text[],
          ARRAY['redux','thunk','middleware','async']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q125","original_type":"open-ended","topic":"Redux Thunk","subcategory":"State Management","sample_answers":["Redux Thunk lets you write action creators that return a function, which can perform async operations and dispatch actions when needed.","It’s the simplest way to handle async logic in Redux, using functions instead of plain action objects."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );;