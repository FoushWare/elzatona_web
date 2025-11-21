-- Batch 3: Questions 21-30 (10 questions)
INSERT INTO questions (
  id, title, content, type, difficulty, points, options, correct_answer, 
  explanation, test_cases, hints, tags, metadata, stats, category_id, 
  learning_card_id, is_active, created_at, updated_at, topic_id, time_limit
) VALUES (
    gen_random_uuid(),
    'What are controlled components?',
    '<pre><code>   import React, { useState } from &quot;react&quot;;

   function UserProfile() {
     const [username, setUsername] = useState(&quot;&quot;);

     const handleChange = (e) =&gt; {
       setUsername(e.target.value);
     };

     return (
       &lt;form&gt;
         &lt;label&gt;
           Name:
           &lt;input type=&quot;text&quot; value={username} onChange={handleChange} /&gt;
         &lt;/label&gt;
       &lt;/form&gt;
     );
   }</code></pre>

A **controlled component** is a React component that **fully manages the form element''s state**(e.g, elements like `<input>`, `<textarea>`, or `<select>`))  using React''s internal state mechanism. i.e, The component does not manage its own internal state — instead, React acts as the single source of truth for form data.

    The controlled components will be implemented using the below steps,

    1. Initialize the state using `useState` hooks in function components or inside constructor for class components.
    2. Set the value of the form element to the respective state variable.
    3. Create an event handler(`onChange`) to handle the user input changes through `useState`''s updater function or `setState` from class component.
    4. Attach the above event handler to form element''s change or click events

    **Note:** React re-renders the component every time the input value changes.

   For example, the name input field updates the username using `handleChange` event handler as below,

   In these components, DOM does not hold the actual data instead React does.
   
   **Benefits:**

   *   Easy to implement **validation**, **conditional formatting**, or **live feedback**.
   *   Full control over form data.
   *   Easier to test and debug because the data is centralized in the component’s state.',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'A **controlled component** is a React component that **fully manages the form element''s state**(e.g, elements like `<input>`, `<textarea>`, or `<select>`))  using React''s internal state mechanism. i.e, The component does not manage its own internal state — instead, React acts as the single source of truth for form data.

    The controlled components will be implemented using the below steps,

    1. Initialize the state using `useState` hooks in function components or inside constructor for class components.
    2. Set the value of the form element to the respective state variable.
    3. Create an event handler(`onChange`) to handle the user input changes through `useState`''s updater function or `setState` from class component.
    4. Attach the above event handler to form element''s change or click events

    **Note:** React re-renders the component every time the input value changes.

   For example, the name input field updates the username using `handleChange` event handler as below,

   In these components, DOM does not hold the actual data instead React does.
   
   **Benefits:**

   *   Easy to implement **validation**, **conditional formatting**, or **live feedback**.
   *   Full control over form data.
   *   Easier to test and debug because the data is centralized in the component’s state.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":21}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.522Z',
    '2025-11-18T20:44:53.522Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What are uncontrolled components?',
    '<pre><code>    class UserProfile extends React.Component {
      constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.input = React.createRef();
      }

      handleSubmit(event) {
        alert(&quot;A name was submitted: &quot; + this.input.current.value);
        event.preventDefault();
      }

      render() {
        return (
          &lt;form onSubmit={this.handleSubmit}&gt;
            &lt;label&gt;
              {&quot;Name:&quot;}
              &lt;input type=&quot;text&quot; ref={this.input} /&gt;
            &lt;/label&gt;
            &lt;input type=&quot;submit&quot; value=&quot;Submit&quot; /&gt;
          &lt;/form&gt;
        );
      }
    }</code></pre>

The **Uncontrolled components** are form elements (like `<input>`, `<textarea>`, or `<select>`) that **manage their own state internally** via the **DOM**, rather than through React state.
    You can query the DOM using a `ref` to find its current value when you need it. This is a bit more like traditional HTML.

    The uncontrolled components will be implemented using the below steps,

    1. Create a ref using `useRef` react hook in function component or `React.createRef()` in class based component.
    2. Attach this `ref` to the form element.
    3. The form element value can be accessed directly through `ref` in event handlers or `componentDidMount` for class components

    In the below UserProfile component, the `username` input is accessed using ref.

    **Note:** Here, DOM is in charge of the value. React only accesses the value when needed (via `ref`).

    **Benefits:**
     *   **Less boilerplate** — no need for `useState` and `onChange`.
     *   Useful for **quick form setups** or when integrating with **non-React code**.
     *   Slightly better **performance** in very large forms (fewer re-renders).

    In most cases, it''s recommend to use controlled components to implement forms. In a controlled component, form data is handled by a React component. The alternative is uncontrolled components, where form data is handled by the DOM itself.

    <p>


    </p>',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'The **Uncontrolled components** are form elements (like `<input>`, `<textarea>`, or `<select>`) that **manage their own state internally** via the **DOM**, rather than through React state.
    You can query the DOM using a `ref` to find its current value when you need it. This is a bit more like traditional HTML.

    The uncontrolled components will be implemented using the below steps,

    1. Create a ref using `useRef` react hook in function component or `React.createRef()` in class based component.
    2. Attach this `ref` to the form element.
    3. The form element value can be accessed directly through `ref` in event handlers or `componentDidMount` for class components

    In the below UserProfile component, the `username` input is accessed using ref.

    **Note:** Here, DOM is in charge of the value. React only accesses the value when needed (via `ref`).

    **Benefits:**
     *   **Less boilerplate** — no need for `useState` and `onChange`.
     *   Useful for **quick form setups** or when integrating with **non-React code**.
     *   Slightly better **performance** in very large forms (fewer re-renders).

    In most cases, it''s recommend to use controlled components to implement forms. In a controlled component, form data is handled by a React component. The alternative is uncontrolled components, where form data is handled by the DOM itself.

    <p>


    </p>',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":22}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.522Z',
    '2025-11-18T20:44:53.522Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is the difference between createElement and cloneElement?',
    '<pre><code>    const button = &lt;button className=&quot;btn&quot;&gt;Click Me&lt;/button&gt;;
    const cloned = React.cloneElement(button, { className: &#039;btn-primary&#039; });
    // Result: &lt;button className=&quot;btn-primary&quot;&gt;Click Me&lt;/button&gt;</code></pre>

Both `React.createElement` and `React.cloneElement` are used to work with React elements, but they serve different purposes.

    #### **createElement:** 
    Creates a new React element from scratch. JSX elements will be transpiled to `React.createElement()` functions to create React elements which are going to be used for the object representation of UI.
    **Syntax:**
    **Example:**
    #### **cloneElement:**
     The `cloneElement` method is used to clone an existing React element and optionally adds or overrides props.

    **Syntax:**
    **Example:**',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'Both `React.createElement` and `React.cloneElement` are used to work with React elements, but they serve different purposes.

    #### **createElement:** 
    Creates a new React element from scratch. JSX elements will be transpiled to `React.createElement()` functions to create React elements which are going to be used for the object representation of UI.
    **Syntax:**
    **Example:**
    #### **cloneElement:**
     The `cloneElement` method is used to clone an existing React element and optionally adds or overrides props.

    **Syntax:**
    **Example:**',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":23}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.522Z',
    '2025-11-18T20:44:53.522Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is Lifting State Up in React?',
    'When several components need to share the same changing data then it is recommended to _lift the shared state up_ to their closest common ancestor. That means if two child components share the same data from its parent, then move the state to parent instead of maintaining local state in both of the child components.',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'When several components need to share the same changing data then it is recommended to _lift the shared state up_ to their closest common ancestor. That means if two child components share the same data from its parent, then move the state to parent instead of maintaining local state in both of the child components.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":24}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.522Z',
    '2025-11-18T20:44:53.522Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What are Higher-Order Components?',
    '<pre><code>    import React from &#039;react&#039;;
    import withAuth from &#039;./withAuth&#039;;

    function Dashboard() {
      return &lt;h1&gt;Welcome to the Dashboard!&lt;/h1&gt;;
    }

    // Wrap Dashboard with withAuth HOC
    export default withAuth(Dashboard);</code></pre>

A _higher-order component_ (_HOC_) is a function that takes a component and returns a new enhanced component with additional props, behavior, or data. It’s a design pattern based on React’s compositional nature, allowing you to reuse logic across multiple components without modifying their internals.

    We consider HOCs **pure components** because they don’t mutate or copy behavior from the original component—they simply **wrap it**, enhance it, and pass through the necessary props. The wrapped component remains decoupled and reusable.

    Let''s take an example of a `withAuth` higher-order component (HOC) in React. This HOC will check if a user is authenticated and either render the wrapped component if authenticated or redirect (or show a message) if not.

    **withAuth HOC Example:**
    **Usage**

    HOC can be used for many use cases:

    1. Code reuse, logic and bootstrap abstraction (e.g., fetching data, permissions, theming).
    2. Render hijacking (e.g., conditional rendering or layout changes).
    3. State abstraction and manipulation(e.g., handling form logic).
    4. Props manipulation(e.g., injecting additional props or filtering them).
    
    Some of the real-world examples of HOCs in react eco-system:
    1. connect() from react-redux
    2. withRouter() from React Router v5
    3. withTranslation() from react-i18next
    4. withApollo() from Apollo client
    5. withFormik from Formik library
    6. withTheme from styled components',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'A _higher-order component_ (_HOC_) is a function that takes a component and returns a new enhanced component with additional props, behavior, or data. It’s a design pattern based on React’s compositional nature, allowing you to reuse logic across multiple components without modifying their internals.

    We consider HOCs **pure components** because they don’t mutate or copy behavior from the original component—they simply **wrap it**, enhance it, and pass through the necessary props. The wrapped component remains decoupled and reusable.

    Let''s take an example of a `withAuth` higher-order component (HOC) in React. This HOC will check if a user is authenticated and either render the wrapped component if authenticated or redirect (or show a message) if not.

    **withAuth HOC Example:**
    **Usage**

    HOC can be used for many use cases:

    1. Code reuse, logic and bootstrap abstraction (e.g., fetching data, permissions, theming).
    2. Render hijacking (e.g., conditional rendering or layout changes).
    3. State abstraction and manipulation(e.g., handling form logic).
    4. Props manipulation(e.g., injecting additional props or filtering them).
    
    Some of the real-world examples of HOCs in react eco-system:
    1. connect() from react-redux
    2. withRouter() from React Router v5
    3. withTranslation() from react-i18next
    4. withApollo() from Apollo client
    5. withFormik from Formik library
    6. withTheme from styled components',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":25}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.522Z',
    '2025-11-18T20:44:53.522Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is children prop?',
    '<pre><code>    const MyDiv = React.createClass({
      render: function () {
        return &lt;div&gt;{this.props.children}&lt;/div&gt;;
      },
    });

    ReactDOM.render(
      &lt;MyDiv&gt;
        &lt;span&gt;{&quot;Hello&quot;}&lt;/span&gt;
        &lt;span&gt;{&quot;World&quot;}&lt;/span&gt;
      &lt;/MyDiv&gt;,
      node
    );</code></pre>

The `children` prop is a special prop in React used to pass elements between the opening and closing tags of a component. It is commonly used in layout and wrapper componnents. 

    A simple usage of children prop looks as below,

    Here, everything inside `<MyDiv>...</MyDiv>` is passed as children to the custom div component.

    The children can be text, JSX elements, fragments, arrays and functions(for advance use case like render props).

    <p>


    </p>

    **Note:** There are several methods available in the legacy React API to work with this prop. These include `React.Children.map`, `React.Children.forEach`, `React.Children.count`, `React.Children.only`, `React.Children.toArray`.',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'The `children` prop is a special prop in React used to pass elements between the opening and closing tags of a component. It is commonly used in layout and wrapper componnents. 

    A simple usage of children prop looks as below,

    Here, everything inside `<MyDiv>...</MyDiv>` is passed as children to the custom div component.

    The children can be text, JSX elements, fragments, arrays and functions(for advance use case like render props).

    <p>


    </p>

    **Note:** There are several methods available in the legacy React API to work with this prop. These include `React.Children.map`, `React.Children.forEach`, `React.Children.count`, `React.Children.only`, `React.Children.toArray`.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":26}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.522Z',
    '2025-11-18T20:44:53.522Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How to write comments in React?',
    '<pre><code>      {/* Multi-line comments for more than
       one line */}
      {`Welcome ${user}, let&#039;s play React`}</code></pre>

The comments in React/JSX are similar to JavaScript Multiline comments but are wrapped in curly braces.

    **Single-line comments:**


    **Multi-line comments:**


    You can use `//` and `/* */` in JS logic, hooks, and functions.',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'The comments in React/JSX are similar to JavaScript Multiline comments but are wrapped in curly braces.

    **Single-line comments:**


    **Multi-line comments:**


    You can use `//` and `/* */` in JS logic, hooks, and functions.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":27}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.522Z',
    '2025-11-18T20:44:53.522Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is reconciliation?',
    '`Reconciliation` is the process through which React updates the Browser DOM and makes React work faster. React use a `diffing algorithm` so that component updates are predictable and faster. React would first calculate the difference between the `real DOM` and the copy of DOM `(Virtual DOM)` when there''s an update of components.
    React stores a copy of Browser DOM which is called `Virtual DOM`. When we make changes or add data, React creates a new Virtual DOM and compares it with the previous one. This comparison is done by `Diffing Algorithm`.
    Now React compares the Virtual DOM with Real DOM. It finds out the changed nodes and updates only the changed nodes in Real DOM leaving the rest nodes as it is. This process is called _Reconciliation_.',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    '`Reconciliation` is the process through which React updates the Browser DOM and makes React work faster. React use a `diffing algorithm` so that component updates are predictable and faster. React would first calculate the difference between the `real DOM` and the copy of DOM `(Virtual DOM)` when there''s an update of components.
    React stores a copy of Browser DOM which is called `Virtual DOM`. When we make changes or add data, React creates a new Virtual DOM and compares it with the previous one. This comparison is done by `Diffing Algorithm`.
    Now React compares the Virtual DOM with Real DOM. It finds out the changed nodes and updates only the changed nodes in Real DOM leaving the rest nodes as it is. This process is called _Reconciliation_.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":28}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.522Z',
    '2025-11-18T20:44:53.522Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'Does the lazy function support named exports?',
    '<pre><code>    import React, { lazy } from &quot;react&quot;;
    const SomeComponent = lazy(() =&gt; import(&quot;./IntermediateComponent.js&quot;));</code></pre>

No, currently `React.lazy` function supports default exports only. If you would like to import modules which are named exports, you can create an intermediate module that reexports it as the default. It also ensures that tree shaking keeps working and don’t pull unused components.
    Let''s take a component file which exports multiple named components,


    and reexport `MoreComponents.js` components in an intermediate file `IntermediateComponent.js`


    Now you can import the module using lazy function as below,',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'No, currently `React.lazy` function supports default exports only. If you would like to import modules which are named exports, you can create an intermediate module that reexports it as the default. It also ensures that tree shaking keeps working and don’t pull unused components.
    Let''s take a component file which exports multiple named components,


    and reexport `MoreComponents.js` components in an intermediate file `IntermediateComponent.js`


    Now you can import the module using lazy function as below,',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":29}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.522Z',
    '2025-11-18T20:44:53.522Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'Why React uses `className` over `class` attribute?',
    '<pre><code>        element.className = &#039;my-class&#039;;</code></pre>

React uses **className** instead of **class** because of a JavaScript naming conflict with the class keyword.

    1. `class` is a reserved keyword in JavaScript
        In JavaScript, class is used to define ES6 classes:
      
        If you try to use class as a variable or property name, it will throw a syntax error. Since JSX is just JavaScript with XML-like syntax, using class directly in JSX would break the parser.

    2. JSX Is JavaScript
    
        When you write JSX like this:
        It will be compiled to:
        But `class` is invalid in this object literal context (since it clashes with the JS keyword), hence React instead uses className.
        which compiles to:
        React then translates `className` to` class` in the final HTML DOM.

    3. Aligns with DOM APIs
        In vanilla JavaScript, you interact with element classes using:
        React follows this convention, staying consistent with the DOM API''s property name rather than HTML’s attribute.',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'React uses **className** instead of **class** because of a JavaScript naming conflict with the class keyword.

    1. `class` is a reserved keyword in JavaScript
        In JavaScript, class is used to define ES6 classes:
      
        If you try to use class as a variable or property name, it will throw a syntax error. Since JSX is just JavaScript with XML-like syntax, using class directly in JSX would break the parser.

    2. JSX Is JavaScript
    
        When you write JSX like this:
        It will be compiled to:
        But `class` is invalid in this object literal context (since it clashes with the JS keyword), hence React instead uses className.
        which compiles to:
        React then translates `className` to` class` in the final HTML DOM.

    3. Aligns with DOM APIs
        In vanilla JavaScript, you interact with element classes using:
        React follows this convention, staying consistent with the DOM API''s property name rather than HTML’s attribute.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":30}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.522Z',
    '2025-11-18T20:44:53.522Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  );
