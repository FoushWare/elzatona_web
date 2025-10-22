-- Batch 1: Questions 1-10
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES
('06937e60-45e9-49d6-b4ac-dca65c4371b1', 'What is React?', 'React (aka React.js or ReactJS) is an **open-source front-end JavaScript library** for building user interfaces based on components. It''s used for handling the view layer in web and mobile applications, and allows developers to create reusable UI components and manage the state of those components efficiently.

React was created by [Jordan Walke](https://github.com/jordwalke), a software engineer at Facebook (now Meta). It was first deployed on Facebook''s News Feed in 2011 and on Instagram in 2012. The library was open-sourced in May 2013 and has since become one of the most popular JavaScript libraries for building modern user interfaces.', 'multiple-choice', 'beginner', 2, NULL, NULL, 'React is a declarative, efficient, and flexible JavaScript library for building user interfaces using a component-based architecture.', NULL, ARRAY[]::text[], ARRAY['react','library','ui','components','frontend'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-001","original_type":"open-ended","topic":"React Basics","subcategory":"Fundamentals","sample_answers":["React is a JavaScript library for building user interfaces by composing reusable components.","React is an open-source front-end library maintained by Meta for creating interactive UIs with a virtual DOM and unidirectional data flow."],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"eee69693-8312-4cb1-8bf7-f2c962aae105"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('f7fb0584-cce8-4c99-a89e-7636808d3208', 'What is the history behind React''s evolution?', 'The history of ReactJS started in 2010 with the creation of **XHP**. XHP is a PHP extension which improved the syntax of the language such that XML document fragments become valid PHP expressions and the primary purpose was used to create custom and reusable HTML elements.

The main principle of this extension was to make front-end code easier to understand and to help avoid cross-site scripting attacks. The project was successful to prevent the malicious content submitted by the scrubbing user.

But there was a different problem with XHP in which dynamic web applications require many roundtrips to the server, and XHP did not solve this problem. Also, the whole UI was re-rendered for small change in the application. Later, the initial prototype of React is created with the name **FaxJ** by Jordan inspired from XHP. Finally after sometime React has been introduced as a new library into JavaScript world.', 'multiple-choice', 'intermediate', 4, NULL, NULL, 'React was inspired by XHP, a PHP extension at Facebook. It evolved to solve performance issues with full re-renders by introducing the Virtual DOM, and has since grown with features like Hooks, Concurrent Mode, and Server Components.', NULL, ARRAY[]::text[], ARRAY['react','history','xhp','facebook','evolution'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-002","original_type":"open-ended","topic":"React Basics","subcategory":"History","sample_answers":["React originated from Facebook''s XHP project. Jordan Walke created FaxJS (later React) to bring XHP''s component model to JavaScript with better performance via the Virtual DOM.","React was first used internally at Facebook in 2011, open-sourced in 2013, and evolved through major milestones like React Native (2015), Fiber (2017), Hooks (2019), and React 18 (2022)."],"time_limit":180,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"eee69693-8312-4cb1-8bf7-f2c962aae105"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('5e837a24-abc1-4610-91a4-6303fa2099cd', 'What are the major features of React?', 'React offers a powerful set of features that have made it one of the most popular JavaScript libraries for building user interfaces:

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
('6b87d9c2-2969-4318-898e-a333d7f8c5ab', 'What is JSX?', '_JSX_ stands for _JavaScript XML_ and it is an XML-like syntax extension to ECMAScript. Basically it just provides the syntactic sugar for the `React.createElement(type, props, ...children)` function, giving us expressiveness of JavaScript along with HTML like template syntax.

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
('3cebd3d8-52c6-41da-bbf1-e3b17ffd9831', 'What is the difference between an Element and a Component?', '**Element:**
- A React **Element** is a plain JavaScript object that describes what you want to see on the UI. It represents a DOM node or a component at a specific point in time. 
- Elements are immutable.
- Creating an element is fast and lightweight.

**Component:**
- A **Component** is a function or class that returns an element (or a tree of elements).
- Components can accept inputs (props) and manage their own state.

In summary:
- **Elements** are the smallest building blocks in React—objects that describe what you want to see.
- **Components** are functions or classes that return elements and encapsulate logic, structure, and behavior for parts of your UI.', 'multiple-choice', 'intermediate', 4, '[{"id":"a","text":"An element is a function; a component is an object","isCorrect":false},{"id":"b","text":"An element is a plain object describing UI; a component is a function/class that returns elements","isCorrect":true},{"id":"c","text":"Elements are stateful; components are stateless","isCorrect":false},{"id":"d","text":"Components are DOM nodes; elements are virtual","isCorrect":false}]', NULL, 'An element is a plain object describing what should appear on screen. A component is a function or class that returns elements.', NULL, ARRAY[]::text[], ARRAY['react','element','component','rendering'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-005","original_type":"multiple-choice","topic":"React Basics","subcategory":"Core Concepts","sample_answers":[],"time_limit":180,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"eee69693-8312-4cb1-8bf7-f2c962aae105"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('57623256-7b61-42f0-ac07-ff06bf35c3ac', 'How do you create components in React?', 'Components are the building blocks of creating User Interfaces(UI) in React. There are two possible ways to create a component.

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
('fb6c34eb-99f0-4f43-846a-3829a89310cd', 'When should you use a Class Component over a Function Component?', 'After the addition of Hooks(i.e. React 16.8 onwards) it is always recommended to use Function components over Class components in React. Because you could use state, lifecycle methods and other features that were only available in class component present in function component too.

But even there are two reasons to use Class components over Function components.
1. If you need a React functionality whose Function component equivalent is not present yet, like Error Boundaries.
2. In older versions, If the component needs _state or lifecycle methods_ then you need to use class component.', 'multiple-choice', 'intermediate', 3, '[{"id":"a","text":"Always use class components for performance","isCorrect":false},{"id":"b","text":"Use class components only for Error Boundaries or legacy code","isCorrect":true},{"id":"c","text":"Class components are required for all stateful logic","isCorrect":false},{"id":"d","text":"Function components cannot use props","isCorrect":false}]', NULL, 'Since React 16.8, function components with Hooks are preferred. Class components are mainly needed for Error Boundaries (though third-party libraries like react-error-boundary can avoid this).', NULL, ARRAY[]::text[], ARRAY['react','class-component','function-component','hooks','error-boundaries'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-007","original_type":"multiple-choice","topic":"Components","subcategory":"Best Practices","sample_answers":[],"time_limit":180,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"759ee497-71fd-4347-9018-c9d62ba7470f"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('4f2519c9-52f7-4627-b6c2-b012a7ebfa64', 'What are Pure Components?', 'Pure components are the components which render the same output for the same state and props. In function components, you can achieve these pure components through memoized `React.memo()` API wrapping around the component. This API prevents unnecessary re-renders by comparing the previous props and new props using shallow comparison.

In class components, the components extending _`React.PureComponent`_ instead of _`React.Component`_ become the pure components. When props or state changes, _PureComponent_ will do a shallow comparison on both props and state by invoking `shouldComponentUpdate()` lifecycle method.', 'multiple-choice', 'intermediate', 4, '[{"id":"a","text":"Components that never re-render","isCorrect":false},{"id":"b","text":"Components that render the same output for the same props/state and avoid unnecessary re-renders","isCorrect":true},{"id":"c","text":"Components that only accept string props","isCorrect":false},{"id":"d","text":"Components that must be written in TypeScript","isCorrect":false}]', NULL, 'Pure components optimize performance by preventing re-renders when props/state haven''t changed. Use React.memo() for function components and PureComponent for class components.', NULL, ARRAY[]::text[], ARRAY['react','pure-component','react-memo','performance','re-render'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-008","original_type":"multiple-choice","topic":"Performance Optimization","subcategory":"Optimization","sample_answers":[],"time_limit":240,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('c325c28b-f9ca-4125-bddb-82ce4c259c69', 'What is state in React?', '_State_ of a component is an object that holds some information that may change over the lifetime of the component. The important point is whenever the state object changes, the component re-renders.

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
('894e8b43-bc05-46d5-82e4-f76e5f26b9ed', 'What are props in React?', '_Props_ are inputs to components. They are single values or objects containing a set of values that are passed to components on creation similar to HTML-tag attributes. Here, the data is passed down from a parent component to a child component.

The primary purpose of props in React is to provide following component functionality:
1. Pass custom data to your component.
2. Trigger state changes.
3. Use via `this.props.reactProp` inside component''s `render()` method.', 'multiple-choice', 'beginner', 2, '[{"id":"a","text":"Mutable data managed by the component itself","isCorrect":false},{"id":"b","text":"Read-only inputs passed from parent to child","isCorrect":true},{"id":"c","text":"Global variables accessible anywhere","isCorrect":false},{"id":"d","text":"Event handlers only","isCorrect":false}]', NULL, 'Props are read-only inputs passed from parent to child components to configure behavior or display data.', NULL, ARRAY[]::text[], ARRAY['react','props','properties','data-flow'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-010","original_type":"multiple-choice","topic":"Props","subcategory":"Data Flow","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"accaeeab-e45f-4999-a647-4e5126bcd487"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z');
