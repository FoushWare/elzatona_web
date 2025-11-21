-- Batch 1: Questions 1-10 (10 questions)
INSERT INTO questions (
  id, title, content, type, difficulty, points, options, correct_answer, 
  explanation, test_cases, hints, tags, metadata, stats, category_id, 
  learning_card_id, is_active, created_at, updated_at, topic_id, time_limit
) VALUES (
    gen_random_uuid(),
    'What is React?',
    'React (aka React.js or ReactJS) is an **open-source front-end JavaScript library** for building user interfaces based on components. It''s used for handling the view layer in web and mobile applications, and allows developers to create reusable UI components and manage the state of those components efficiently.

    React was created by [Jordan Walke](https://github.com/jordwalke), a software engineer at Facebook (now Meta). It was first deployed on Facebook''s News Feed in 2011 and on Instagram in 2012. The library was open-sourced in May 2013 and has since become one of the most popular JavaScript libraries for building modern user interfaces.',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'React (aka React.js or ReactJS) is an **open-source front-end JavaScript library** for building user interfaces based on components. It''s used for handling the view layer in web and mobile applications, and allows developers to create reusable UI components and manage the state of those components efficiently.

    React was created by [Jordan Walke](https://github.com/jordwalke), a software engineer at Facebook (now Meta). It was first deployed on Facebook''s News Feed in 2011 and on Instagram in 2012. The library was open-sourced in May 2013 and has since become one of the most popular JavaScript libraries for building modern user interfaces.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":1}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.514Z',
    '2025-11-18T20:44:53.514Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is the history behind React evolution?',
    'The history of ReactJS started in 2010 with the creation of **XHP**. XHP is a PHP extension which improved the syntax of the language such that XML document fragments become valid PHP expressions and the primary purpose was used to create custom and reusable HTML elements.

       The main principle of this extension was to make front-end code easier to understand and to help avoid cross-site scripting attacks. The project was successful to prevent the malicious content submitted by the scrubbing user.

       But there was a different problem with XHP in which dynamic web applications require many roundtrips to the server, and XHP did not solve this problem. Also, the whole UI was re-rendered for small change in the application. Later, the initial prototype of React is created with the name **FaxJ** by Jordan inspired from XHP. Finally after sometime React has been introduced as a new library into JavaScript world.

           The evolution of React has a fascinating history that spans over a decade:
    
       **2010-2011: The Origins**
       - The journey began with **XHP**, a PHP extension created at Facebook that allowed HTML components to be used in PHP code
       - XHP improved front-end code readability and helped prevent cross-site scripting (XSS) attacks
       - However, XHP had limitations with dynamic web applications, requiring frequent server roundtrips and complete UI re-renders for small changes

       **2011-2012: Early Development**
       - Jordan Walke created the first prototype called **FaxJS** (later renamed to React), inspired by XHP''s component model
       - The key innovation was bringing XHP''s component model to JavaScript with performance improvements
       - React introduced the Virtual DOM concept to solve the performance issues of full page re-renders
       - First deployed internally on Facebook''s News Feed in 2011 and Instagram in 2012

       **2013: Public Release**
       - React was officially open-sourced at JSConf US in May 2013
       - Initial public reception was mixed, with some developers skeptical about the JSX syntax and the approach of mixing markup with JavaScript

       **2014-2015: Growing Adoption**
       - React Native was announced in 2015, extending React''s paradigm to mobile app development
       - The ecosystem began to grow with tools like Redux for state management
       - Companies beyond Facebook began adopting React for production applications

       **2016-2018: Maturation**
       - React 16 ("Fiber") was released in 2017 with a complete rewrite of the core architecture
       - Introduction of new features like Error Boundaries, Portals, and improved server-side rendering
       - React 16.3 introduced the Context API for easier state management

       **2019-Present: Modern React**
       - React Hooks were introduced in React 16.8 (February 2019), revolutionizing state management in functional components
       - React 17 (October 2020) focused on making React upgrades easier
       - React 18 (March 2022) introduced concurrent rendering and automatic batching
       - React continues to evolve with Server Components, the new React compiler (React Forget), and other performance improvements

       **Note:** JSX, React''s syntax extension, was indeed inspired by XHP''s approach of embedding XML-like syntax in code.',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'The history of ReactJS started in 2010 with the creation of **XHP**. XHP is a PHP extension which improved the syntax of the language such that XML document fragments become valid PHP expressions and the primary purpose was used to create custom and reusable HTML elements.

       The main principle of this extension was to make front-end code easier to understand and to help avoid cross-site scripting attacks. The project was successful to prevent the malicious content submitted by the scrubbing user.

       But there was a different problem with XHP in which dynamic web applications require many roundtrips to the server, and XHP did not solve this problem. Also, the whole UI was re-rendered for small change in the application. Later, the initial prototype of React is created with the name **FaxJ** by Jordan inspired from XHP. Finally after sometime React has been introduced as a new library into JavaScript world.

           The evolution of React has a fascinating history that spans over a decade:
    
       **2010-2011: The Origins**
       - The journey began with **XHP**, a PHP extension created at Facebook that allowed HTML components to be used in PHP code
       - XHP improved front-end code readability and helped prevent cross-site scripting (XSS) attacks
       - However, XHP had limitations with dynamic web applications, requiring frequent server roundtrips and complete UI re-renders for small changes

       **2011-2012: Early Development**
       - Jordan Walke created the first prototype called **FaxJS** (later renamed to React), inspired by XHP''s component model
       - The key innovation was bringing XHP''s component model to JavaScript with performance improvements
       - React introduced the Virtual DOM concept to solve the performance issues of full page re-renders
       - First deployed internally on Facebook''s News Feed in 2011 and Instagram in 2012

       **2013: Public Release**
       - React was officially open-sourced at JSConf US in May 2013
       - Initial public reception was mixed, with some developers skeptical about the JSX syntax and the approach of mixing markup with JavaScript

       **2014-2015: Growing Adoption**
       - React Native was announced in 2015, extending React''s paradigm to mobile app development
       - The ecosystem began to grow with tools like Redux for state management
       - Companies beyond Facebook began adopting React for production applications

       **2016-2018: Maturation**
       - React 16 ("Fiber") was released in 2017 with a complete rewrite of the core architecture
       - Introduction of new features like Error Boundaries, Portals, and improved server-side rendering
       - React 16.3 introduced the Context API for easier state management

       **2019-Present: Modern React**
       - React Hooks were introduced in React 16.8 (February 2019), revolutionizing state management in functional components
       - React 17 (October 2020) focused on making React upgrades easier
       - React 18 (March 2022) introduced concurrent rendering and automatic batching
       - React continues to evolve with Server Components, the new React compiler (React Forget), and other performance improvements

       **Note:** JSX, React''s syntax extension, was indeed inspired by XHP''s approach of embedding XML-like syntax in code.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":2}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.514Z',
    '2025-11-18T20:44:53.514Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What are the major features of React?',
    'React offers a powerful set of features that have made it one of the most popular JavaScript libraries for building user interfaces:

    **Core Features:**

    - **Component-Based Architecture**: React applications are built using components - independent, reusable pieces of code that return HTML via a render function. This modular approach enables better code organization, reusability, and maintenance.

    - **Virtual DOM**: React creates an in-memory data structure cache, computes the resulting differences, and efficiently updates only the changed parts in the browser DOM. This approach significantly improves performance compared to direct DOM manipulation.

    - **JSX (JavaScript XML)**: A syntax extension that allows writing HTML-like code in JavaScript. JSX makes the code more readable and expressive while providing the full power of JavaScript.

    - **Unidirectional Data Flow**: React follows a one-way data binding model where data flows from parent to child components. This makes the code more predictable and easier to debug.

    - **Declarative UI**: React allows you to describe what your UI should look like for a given state, and it handles the DOM updates when the underlying data changes.

    **Advanced Features:**

    - **React Hooks**: Introduced in React 16.8, hooks allow using state and other React features in functional components without writing classes.

    - **Context API**: Provides a way to share values between components without explicitly passing props through every level of the component tree.

    - **Error Boundaries**: Components that catch JavaScript errors anywhere in their child component tree and display fallback UI instead of crashing.

    - **Server-Side Rendering (SSR)**: Enables rendering React components on the server before sending HTML to the client, improving performance and SEO.

    - **Concurrent Mode**: A set of new features (in development) that help React apps stay responsive and gracefully adjust to the user''s device capabilities and network speed.

    - **React Server Components**: A new feature that allows components to be rendered entirely on the server, reducing bundle size and improving performance.

    - **Suspense**: A feature that lets your components "wait" for something before rendering, supporting code-splitting and data fetching with cleaner code.

    These features collectively make React powerful for building everything from small widgets to complex, large-scale web applications.',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'React offers a powerful set of features that have made it one of the most popular JavaScript libraries for building user interfaces:

    **Core Features:**

    - **Component-Based Architecture**: React applications are built using components - independent, reusable pieces of code that return HTML via a render function. This modular approach enables better code organization, reusability, and maintenance.

    - **Virtual DOM**: React creates an in-memory data structure cache, computes the resulting differences, and efficiently updates only the changed parts in the browser DOM. This approach significantly improves performance compared to direct DOM manipulation.

    - **JSX (JavaScript XML)**: A syntax extension that allows writing HTML-like code in JavaScript. JSX makes the code more readable and expressive while providing the full power of JavaScript.

    - **Unidirectional Data Flow**: React follows a one-way data binding model where data flows from parent to child components. This makes the code more predictable and easier to debug.

    - **Declarative UI**: React allows you to describe what your UI should look like for a given state, and it handles the DOM updates when the underlying data changes.

    **Advanced Features:**

    - **React Hooks**: Introduced in React 16.8, hooks allow using state and other React features in functional components without writing classes.

    - **Context API**: Provides a way to share values between components without explicitly passing props through every level of the component tree.

    - **Error Boundaries**: Components that catch JavaScript errors anywhere in their child component tree and display fallback UI instead of crashing.

    - **Server-Side Rendering (SSR)**: Enables rendering React components on the server before sending HTML to the client, improving performance and SEO.

    - **Concurrent Mode**: A set of new features (in development) that help React apps stay responsive and gracefully adjust to the user''s device capabilities and network speed.

    - **React Server Components**: A new feature that allows components to be rendered entirely on the server, reducing bundle size and improving performance.

    - **Suspense**: A feature that lets your components "wait" for something before rendering, supporting code-splitting and data fetching with cleaner code.

    These features collectively make React powerful for building everything from small widgets to complex, large-scale web applications.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":3}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.514Z',
    '2025-11-18T20:44:53.514Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is JSX?',
    '<pre><code>    class App extends React.Component {
      render() {
        return &lt;h1 className=&quot;greeting&quot;&gt;{&quot;Hello, this is a JSX Code!&quot;}&lt;/h1&gt;;
      }
    }</code></pre>

_JSX_ stands for _JavaScript XML_ and it is an XML-like syntax extension to ECMAScript. Basically it just provides the syntactic sugar for the `React.createElement(type, props, ...children)` function, giving us expressiveness of JavaScript along with HTML like template syntax.

    In the example below, the text inside `<h1>` tag is returned as JavaScript function to the render function.


    If you don''t use JSX syntax then the respective JavaScript code should be written as below,


     <p>


     </p>

    **Note:** JSX is stricter than HTML',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    '_JSX_ stands for _JavaScript XML_ and it is an XML-like syntax extension to ECMAScript. Basically it just provides the syntactic sugar for the `React.createElement(type, props, ...children)` function, giving us expressiveness of JavaScript along with HTML like template syntax.

    In the example below, the text inside `<h1>` tag is returned as JavaScript function to the render function.


    If you don''t use JSX syntax then the respective JavaScript code should be written as below,


     <p>


     </p>

    **Note:** JSX is stricter than HTML',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":4}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.514Z',
    '2025-11-18T20:44:53.514Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is the difference between an Element and a Component?',
    '<pre><code>        const Button = ({ handleLogin }) =&gt;
          React.createElement(
            &quot;button&quot;,
            { id: &quot;login-btn&quot;, onClick: handleLogin },
            &quot;Login&quot;
          );</code></pre>

**Element:**
      - A React **Element** is a plain JavaScript object that describes what you want to see on the UI. It represents a DOM node or a component at a specific point in time. 
      - Elements are immutable: once created, you cannot change their properties. Instead, you create new elements to reflect updates.
      - Elements can be nested within other elements through their `props`.
      - Creating an element is a fast, lightweight operation—it does **not** create any actual DOM nodes or render anything to the screen directly.

        **Example (without JSX):**

        **Equivalent JSX syntax:**

        **The object returned by `React.createElement`:**
        Elements are then passed to the React DOM renderer (e.g., `ReactDOM.render()`), which translates them to actual DOM nodes.


      **Component:**
      - A **Component** is a function or class that returns an element (or a tree of elements) to describe part of the UI. Components can accept inputs (called **props**) and manage their own state (in case of class or function components with hooks).
      - Components allow you to split the UI into independent, reusable pieces, each isolated and composable.
      - You can define a component using a function or a class:

        **Example (Function Component with JSX):**

        When JSX is compiled, it''s transformed into a tree of `React.createElement` calls:



      **In summary:**
      - **Elements** are the smallest building blocks in React—objects that describe what you want to see.
      - **Components** are functions or classes that return elements and encapsulate logic, structure, and behavior for parts of your UI.

       > Think of **elements** as the instructions for creating UI, and **components** as reusable blueprints that combine logic and structure to generate those instructions.',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    '**Element:**
      - A React **Element** is a plain JavaScript object that describes what you want to see on the UI. It represents a DOM node or a component at a specific point in time. 
      - Elements are immutable: once created, you cannot change their properties. Instead, you create new elements to reflect updates.
      - Elements can be nested within other elements through their `props`.
      - Creating an element is a fast, lightweight operation—it does **not** create any actual DOM nodes or render anything to the screen directly.

        **Example (without JSX):**

        **Equivalent JSX syntax:**

        **The object returned by `React.createElement`:**
        Elements are then passed to the React DOM renderer (e.g., `ReactDOM.render()`), which translates them to actual DOM nodes.


      **Component:**
      - A **Component** is a function or class that returns an element (or a tree of elements) to describe part of the UI. Components can accept inputs (called **props**) and manage their own state (in case of class or function components with hooks).
      - Components allow you to split the UI into independent, reusable pieces, each isolated and composable.
      - You can define a component using a function or a class:

        **Example (Function Component with JSX):**

        When JSX is compiled, it''s transformed into a tree of `React.createElement` calls:



      **In summary:**
      - **Elements** are the smallest building blocks in React—objects that describe what you want to see.
      - **Components** are functions or classes that return elements and encapsulate logic, structure, and behavior for parts of your UI.

       > Think of **elements** as the instructions for creating UI, and **components** as reusable blueprints that combine logic and structure to generate those instructions.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":5}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.514Z',
    '2025-11-18T20:44:53.514Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How to create components in React?',
    '<pre><code>       class Greeting extends React.Component {
         render() {
           return &lt;h1&gt;{`Hello, ${this.props.message}`}&lt;/h1&gt;;
         }
       }</code></pre>

Components are the building blocks of creating User Interfaces(UI) in React. There are two possible ways to create a component.

    1. **Function Components:** This is the simplest way to create a component. Those are pure JavaScript functions that accept props object as the one and only one parameter and return React elements to render the output:


    2. **Class Components:** You can also use ES6 class to define a component. The above function component can be written as a class component:',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'Components are the building blocks of creating User Interfaces(UI) in React. There are two possible ways to create a component.

    1. **Function Components:** This is the simplest way to create a component. Those are pure JavaScript functions that accept props object as the one and only one parameter and return React elements to render the output:


    2. **Class Components:** You can also use ES6 class to define a component. The above function component can be written as a class component:',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":6}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.514Z',
    '2025-11-18T20:44:53.514Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'When to use a Class Component over a Function Component?',
    '<pre><code>    &quot;use client&quot;;

    import { ErrorBoundary } from &quot;react-error-boundary&quot;;

    &lt;ErrorBoundary fallback={&lt;div&gt;Something went wrong&lt;/div&gt;}&gt;
      &lt;ExampleApplication /&gt;
    &lt;/ErrorBoundary&gt;;</code></pre>

After the addition of Hooks(i.e. React 16.8 onwards) it is always recommended to use Function components over Class components in React. Because you could use state, lifecycle methods and other features that were only available in class component present in function component too.

    But even there are two reasons to use Class components over Function components.

    1. If you need a React functionality whose Function component equivalent is not present yet, like Error Boundaries.
    2. In older versions, If the component needs _state or lifecycle methods_ then you need to use class component.

    So the summary to this question is as follows:

    **Use Function Components:**

    - If you don''t need state or lifecycle methods, and your component is purely presentational.
    - For simplicity, readability, and modern code practices, especially with the use of React Hooks for state and side effects.

    **Use Class Components:**

    - If you need to manage state or use lifecycle methods.
    - In scenarios where backward compatibility or integration with older code is necessary.

    **Note:** You can also use reusable [react error boundary](https://github.com/bvaughn/react-error-boundary) third-party component without writing any class. i.e, No need to use class components for Error boundaries.

    The usage of Error boundaries from the above library is quite straight forward.

    > **_Note when using react-error-boundary:_** ErrorBoundary is a client component. You can only pass props to it that are serializable or use it in files that have a `"use client";` directive.',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'After the addition of Hooks(i.e. React 16.8 onwards) it is always recommended to use Function components over Class components in React. Because you could use state, lifecycle methods and other features that were only available in class component present in function component too.

    But even there are two reasons to use Class components over Function components.

    1. If you need a React functionality whose Function component equivalent is not present yet, like Error Boundaries.
    2. In older versions, If the component needs _state or lifecycle methods_ then you need to use class component.

    So the summary to this question is as follows:

    **Use Function Components:**

    - If you don''t need state or lifecycle methods, and your component is purely presentational.
    - For simplicity, readability, and modern code practices, especially with the use of React Hooks for state and side effects.

    **Use Class Components:**

    - If you need to manage state or use lifecycle methods.
    - In scenarios where backward compatibility or integration with older code is necessary.

    **Note:** You can also use reusable [react error boundary](https://github.com/bvaughn/react-error-boundary) third-party component without writing any class. i.e, No need to use class components for Error boundaries.

    The usage of Error boundaries from the above library is quite straight forward.

    > **_Note when using react-error-boundary:_** ErrorBoundary is a client component. You can only pass props to it that are serializable or use it in files that have a `"use client";` directive.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":7}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.514Z',
    '2025-11-18T20:44:53.514Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What are Pure Components?',
    '<pre><code>    import { memo, useState } from &quot;react&quot;;

    const EmployeeProfile = memo(function EmployeeProfile({ name, email }) {
      return (
        &lt;&gt;
          &lt;p&gt;Name:{name}&lt;/p&gt;
          &lt;p&gt;Email: {email}&lt;/p&gt;
        &lt;/&gt;
      );
    });
    export default function EmployeeRegForm() {
      const [name, setName] = useState(&quot;&quot;);
      const [email, setEmail] = useState(&quot;&quot;);
      return (
        &lt;&gt;
          &lt;label&gt;
            Name:{&quot; &quot;}
            &lt;input value={name} onChange={(e) =&gt; setName(e.target.value)} /&gt;
          &lt;/label&gt;
          &lt;label&gt;
            Email:{&quot; &quot;}
            &lt;input value={email} onChange={(e) =&gt; setEmail(e.target.value)} /&gt;
          &lt;/label&gt;
          &lt;hr /&gt;
          &lt;EmployeeProfile name={name} /&gt;
        &lt;/&gt;
      );
    }</code></pre>

Pure components are the components which render the same output for the same state and props. In function components, you can achieve these pure components through memoized `React.memo()` API wrapping around the component. This API prevents unnecessary re-renders by comparing the previous props and new props using shallow comparison. So it will be helpful for performance optimizations.

    But at the same time, it won''t compare the previous state with the current state because function component itself prevents the unnecessary rendering by default when you set the same state again.

    The syntactic representation of memoized components looks like below,


    Below is the example of how child component(i.e., EmployeeProfile) prevents re-renders for the same props passed by parent component(i.e.,EmployeeRegForm).


    In the above code, the email prop has not been passed to child component. So there won''t be any re-renders for email prop change.

    In class components, the components extending _`React.PureComponent`_ instead of _`React.Component`_ become the pure components. When props or state changes, _PureComponent_ will do a shallow comparison on both props and state by invoking `shouldComponentUpdate()` lifecycle method.

    **Note:** `React.memo()` is a higher-order component.',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'Pure components are the components which render the same output for the same state and props. In function components, you can achieve these pure components through memoized `React.memo()` API wrapping around the component. This API prevents unnecessary re-renders by comparing the previous props and new props using shallow comparison. So it will be helpful for performance optimizations.

    But at the same time, it won''t compare the previous state with the current state because function component itself prevents the unnecessary rendering by default when you set the same state again.

    The syntactic representation of memoized components looks like below,


    Below is the example of how child component(i.e., EmployeeProfile) prevents re-renders for the same props passed by parent component(i.e.,EmployeeRegForm).


    In the above code, the email prop has not been passed to child component. So there won''t be any re-renders for email prop change.

    In class components, the components extending _`React.PureComponent`_ instead of _`React.Component`_ become the pure components. When props or state changes, _PureComponent_ will do a shallow comparison on both props and state by invoking `shouldComponentUpdate()` lifecycle method.

    **Note:** `React.memo()` is a higher-order component.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":8}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.514Z',
    '2025-11-18T20:44:53.514Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is state in React?',
    '<pre><code>    import React from &quot;react&quot;;
    class User extends React.Component {
      constructor(props) {
        super(props);

        this.state = {
          message: &quot;Welcome to React world&quot;,
        };
      }

      render() {
        return (
            &lt;h1&gt;{this.state.message}&lt;/h1&gt;
        );
      }
    }</code></pre>

_State_ of a component is an object that holds some information that may change over the lifetime of the component. The important point is whenever the state object changes, the component re-renders. It is always recommended to make our state as simple as possible and minimize the number of stateful components.

    ![state](images/state.jpg)

    Let''s take an example of **User** component with `message` state. Here, **useState** hook has been used to add state to the User component and it returns an array with current state and function to update it.


    Whenever React calls your component or access `useState` hook, it gives you a snapshot of the state for that particular render.

    <p>


    </p>

    State is similar to props, but it is private and fully controlled by the component ,i.e., it is not accessible to any other component till the owner component decides to pass it.',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    '_State_ of a component is an object that holds some information that may change over the lifetime of the component. The important point is whenever the state object changes, the component re-renders. It is always recommended to make our state as simple as possible and minimize the number of stateful components.

    ![state](images/state.jpg)

    Let''s take an example of **User** component with `message` state. Here, **useState** hook has been used to add state to the User component and it returns an array with current state and function to update it.


    Whenever React calls your component or access `useState` hook, it gives you a snapshot of the state for that particular render.

    <p>


    </p>

    State is similar to props, but it is private and fully controlled by the component ,i.e., it is not accessible to any other component till the owner component decides to pass it.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":9}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.514Z',
    '2025-11-18T20:44:53.514Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What are props in React?',
    '<pre><code>import React from &quot;react&quot;;
import ReactDOM from &quot;react-dom&quot;;

class ChildComponent extends React.Component {
  render() {
    return (
        &lt;p&gt;{this.props.name}&lt;/p&gt;
        &lt;p&gt;{this.props.age}&lt;/p&gt;
        &lt;p&gt;{this.props.gender}&lt;/p&gt;
    );
  }
}

class ParentComponent extends React.Component {
  render() {
    return (
        &lt;ChildComponent name=&quot;John&quot; age=&quot;30&quot; gender=&quot;male&quot; /&gt;
        &lt;ChildComponent name=&quot;Mary&quot; age=&quot;25&quot; gender=&quot;female&quot; /&gt;
    );
  }
}</code></pre>

_Props_ are inputs to components. They are single values or objects containing a set of values that are passed to components on creation similar to HTML-tag attributes. Here, the data is passed down from a parent component to a child component.

    The primary purpose of props in React is to provide following component functionality:

    1. Pass custom data to your component.
    2. Trigger state changes.
    3. Use via `this.props.reactProp` inside component''s `render()` method.

    For example, let us create an element with `reactProp` property:


    This `reactProp` (or whatever you came up with) attribute name then becomes a property attached to React''s native props object which originally already exists on all components created using React library.


    For example, the usage of props in function component looks like below:


The properties from props object can be accessed directly using destructing feature from ES6 (ECMAScript 2015). It is also possible to fallback to default value when the prop value is not specified. The above child component can be simplified like below.


**Note:** The default value won''t be used if you pass `null` or `0` value. i.e, default value is only used if the prop value is missed or `undefined` value has been passed.

     The Props accessed in Class Based Component as below',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    '_Props_ are inputs to components. They are single values or objects containing a set of values that are passed to components on creation similar to HTML-tag attributes. Here, the data is passed down from a parent component to a child component.

    The primary purpose of props in React is to provide following component functionality:

    1. Pass custom data to your component.
    2. Trigger state changes.
    3. Use via `this.props.reactProp` inside component''s `render()` method.

    For example, let us create an element with `reactProp` property:


    This `reactProp` (or whatever you came up with) attribute name then becomes a property attached to React''s native props object which originally already exists on all components created using React library.


    For example, the usage of props in function component looks like below:


The properties from props object can be accessed directly using destructing feature from ES6 (ECMAScript 2015). It is also possible to fallback to default value when the prop value is not specified. The above child component can be simplified like below.


**Note:** The default value won''t be used if you pass `null` or `0` value. i.e, default value is only used if the prop value is missed or `undefined` value has been passed.

     The Props accessed in Class Based Component as below',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":10}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.514Z',
    '2025-11-18T20:44:53.514Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  );

-- Batch 2: Questions 11-20 (10 questions)
INSERT INTO questions (
  id, title, content, type, difficulty, points, options, correct_answer, 
  explanation, test_cases, hints, tags, metadata, stats, category_id, 
  learning_card_id, is_active, created_at, updated_at, topic_id, time_limit
) VALUES (
    gen_random_uuid(),
    'What is the difference between state and props?',
    'In React, both **state** and **props** are plain JavaScript objects, but they serve different purposes and have distinct behaviors:

    ### State
    - **Definition:**  
      State is a data structure that is managed within a component. It represents information that can change over the lifetime of the component.
    - **Mutability:**  
      State is mutable, meaning it can be changed using the setter function (`setState` in class components or the updater function from `useState` in functional components).
    - **Scope:**  
      State is local to the component where it is defined. Only that component can modify its own state.
    - **Usage:**  
      State is typically used for data that needs to change in response to user actions, network responses, or other dynamic events.
    - **Re-rendering:**  
      Updating the state triggers a re-render of the component and its descendants.

    ### Props
    - **Definition:**  
      Props (short for “properties”) are inputs to a component, provided by its parent component.
    - **Mutability:**  
      Props are read-only. A component cannot modify its own props; they are immutable from the component’s perspective.
    - **Scope:**  
      Props are used to pass data and event handlers down the component tree, enabling parent components to configure or communicate with their children.
    - **Usage:**  
      Props are commonly used to make components reusable and configurable. They allow the same component to be rendered with different data or behavior.
    - **Analogy:**  
      Think of props as arguments to a function, whereas state is like variables declared inside the function.

    ### Summary Table

    | Feature   | State                               | Props                             |
    |-----------|-------------------------------------|-----------------------------------|
    | Managed by| The component itself                | Parent component                  |
    | Mutable   | Yes                                 | No (read-only)                    |
    | Scope     | Local to the component              | Passed from parent to child       |
    | Usage     | Manage dynamic data and UI changes  | Configure and customize component |
    | Update    | Using setState/useState             | Cannot be updated by the component|',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'In React, both **state** and **props** are plain JavaScript objects, but they serve different purposes and have distinct behaviors:

    ### State
    - **Definition:**  
      State is a data structure that is managed within a component. It represents information that can change over the lifetime of the component.
    - **Mutability:**  
      State is mutable, meaning it can be changed using the setter function (`setState` in class components or the updater function from `useState` in functional components).
    - **Scope:**  
      State is local to the component where it is defined. Only that component can modify its own state.
    - **Usage:**  
      State is typically used for data that needs to change in response to user actions, network responses, or other dynamic events.
    - **Re-rendering:**  
      Updating the state triggers a re-render of the component and its descendants.

    ### Props
    - **Definition:**  
      Props (short for “properties”) are inputs to a component, provided by its parent component.
    - **Mutability:**  
      Props are read-only. A component cannot modify its own props; they are immutable from the component’s perspective.
    - **Scope:**  
      Props are used to pass data and event handlers down the component tree, enabling parent components to configure or communicate with their children.
    - **Usage:**  
      Props are commonly used to make components reusable and configurable. They allow the same component to be rendered with different data or behavior.
    - **Analogy:**  
      Think of props as arguments to a function, whereas state is like variables declared inside the function.

    ### Summary Table

    | Feature   | State                               | Props                             |
    |-----------|-------------------------------------|-----------------------------------|
    | Managed by| The component itself                | Parent component                  |
    | Mutable   | Yes                                 | No (read-only)                    |
    | Scope     | Local to the component              | Passed from parent to child       |
    | Usage     | Manage dynamic data and UI changes  | Configure and customize component |
    | Update    | Using setState/useState             | Cannot be updated by the component|',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":11}'::jsonb,
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
    'What is the difference between HTML and React event handling?',
    '<pre><code>       function handleClick(event) {
         event.preventDefault();
         console.log(&quot;The link was clicked.&quot;);
       }</code></pre>

Below are some of the main differences between HTML and React event handling,

    1. In HTML, the event name usually represents in _lowercase_ as a convention:


       Whereas in React it follows _camelCase_ convention:


    2. In HTML, you can return `false` to prevent default behavior:


       Whereas in React you must call `preventDefault()` explicitly:


    3. In HTML, you need to invoke the function by appending `()`
       Whereas in react you should not append `()` with the function name. (refer "activateLasers" function in the first point for example)',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'Below are some of the main differences between HTML and React event handling,

    1. In HTML, the event name usually represents in _lowercase_ as a convention:


       Whereas in React it follows _camelCase_ convention:


    2. In HTML, you can return `false` to prevent default behavior:


       Whereas in React you must call `preventDefault()` explicitly:


    3. In HTML, you need to invoke the function by appending `()`
       Whereas in react you should not append `()` with the function name. (refer "activateLasers" function in the first point for example)',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":12}'::jsonb,
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
    'What are synthetic events in React?',
    '<pre><code>    function BookStore() {
      function handleTitleChange(e) {
        console.log(&quot;The new title is:&quot;, e.target.value);
        console.log(&#039;Synthetic event:&#039;, e); // React SyntheticEvent
        console.log(&#039;Native event:&#039;, e.nativeEvent); // Browser native event
        e.stopPropagation();
        e.preventDefault();
      }

      return &lt;input name=&quot;title&quot; onChange={handleTitleChange} /&gt;;
    }</code></pre>

`SyntheticEvent` is a cross-browser wrapper around the browser''s native event. Its API is same as the browser''s native event, including `stopPropagation()` and `preventDefault()`, except the events work identically across all browsers. The native events can be accessed directly from synthetic events using `nativeEvent` attribute.

    Let''s take an example of `BookStore` title search component with the ability to get all native event properties

    
    List of common synthetic events are:

    *   `onClick`
    *   `onChange`
    *   `onSubmit`
    *   `onKeyDown`, `onKeyUp`
    *   `onFocus`, `onBlur`
    *   `onMouseEnter`, `onMouseLeave`
    *   `onTouchStart`, `onTouchEnd`',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    '`SyntheticEvent` is a cross-browser wrapper around the browser''s native event. Its API is same as the browser''s native event, including `stopPropagation()` and `preventDefault()`, except the events work identically across all browsers. The native events can be accessed directly from synthetic events using `nativeEvent` attribute.

    Let''s take an example of `BookStore` title search component with the ability to get all native event properties

    
    List of common synthetic events are:

    *   `onClick`
    *   `onChange`
    *   `onSubmit`
    *   `onKeyDown`, `onKeyUp`
    *   `onFocus`, `onBlur`
    *   `onMouseEnter`, `onMouseLeave`
    *   `onTouchStart`, `onTouchEnd`',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":13}'::jsonb,
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
    'What are inline conditional expressions?',
    '<pre><code>    &lt;h1&gt;Hello!&lt;/h1&gt;;
    {
      messages.length &gt; 0 &amp;&amp; !isLogin ? (
        &lt;h2&gt;You have {messages.length} unread messages.&lt;/h2&gt;
      ) : (
        &lt;h2&gt;You don&#039;t have unread messages.&lt;/h2&gt;
      );
    }</code></pre>

You can use either _if statements_ or _ternary expressions_ which are available in JS(and JSX in React) to conditionally execute or render expressions. Apart from these approaches, you can also embed any expressions in JSX by wrapping them in curly braces and then followed by JS logical operator `&&`. It is helpful to render elements conditionally within a single line and commonly used for concise logic, especially in JSX rendering.',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'You can use either _if statements_ or _ternary expressions_ which are available in JS(and JSX in React) to conditionally execute or render expressions. Apart from these approaches, you can also embed any expressions in JSX by wrapping them in curly braces and then followed by JS logical operator `&&`. It is helpful to render elements conditionally within a single line and commonly used for concise logic, especially in JSX rendering.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":14}'::jsonb,
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
    'What is "key" prop and what is the benefit of using it in arrays of elements?',
    '<pre><code>    const todoItems = todos.map((todo, index) =&gt; (
      &lt;li key={index}&gt;{todo.text}&lt;/li&gt;
    ));</code></pre>

A `key` is a special attribute you **should** include when mapping over arrays to render data. _Key_ prop helps React identify which items have changed, are added, or are removed.

    Keys should be unique among its siblings. Most often we use ID from our data as _key_:


    When you don''t have stable IDs for rendered items, you may use the item _index_ as a _key_ as a last resort:

    **Benefits of key:**
      *   Enables React to **efficiently update and re-render** components.
      *   Prevents unnecessary re-renders by **reusing** components when possible.
      *   Helps **maintain internal state** of list items correctly.

    **Note:**

    1. Using _indexes_ for _keys_ is **not recommended** if the order of items may change. This can negatively impact performance and may cause issues with component state.
    2. If you extract list item as separate component then apply _keys_ on list component instead of `li` tag.
    3. There will be a warning message in the console if the `key` prop is not present on list items.
    4. The key attribute accepts either string or number and internally convert it as string type.
    5. Don''t generate the key on the fly something like `key={Math.random()}`. Because the keys will never match up between re-renders and DOM created everytime.',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'A `key` is a special attribute you **should** include when mapping over arrays to render data. _Key_ prop helps React identify which items have changed, are added, or are removed.

    Keys should be unique among its siblings. Most often we use ID from our data as _key_:


    When you don''t have stable IDs for rendered items, you may use the item _index_ as a _key_ as a last resort:

    **Benefits of key:**
      *   Enables React to **efficiently update and re-render** components.
      *   Prevents unnecessary re-renders by **reusing** components when possible.
      *   Helps **maintain internal state** of list items correctly.

    **Note:**

    1. Using _indexes_ for _keys_ is **not recommended** if the order of items may change. This can negatively impact performance and may cause issues with component state.
    2. If you extract list item as separate component then apply _keys_ on list component instead of `li` tag.
    3. There will be a warning message in the console if the `key` prop is not present on list items.
    4. The key attribute accepts either string or number and internally convert it as string type.
    5. Don''t generate the key on the fly something like `key={Math.random()}`. Because the keys will never match up between re-renders and DOM created everytime.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":15}'::jsonb,
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
    'What is Virtual DOM?',
    'The _Virtual DOM_ (VDOM) is a lightweight, in-memory representation of _Real DOM_ used by libraries like React to optimize UI rendering. The representation of a UI is kept in memory and synced with the "real" DOM. It''s a step that happens between the render function being called and the displaying of elements on the screen. This entire process is called _reconciliation_.',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'The _Virtual DOM_ (VDOM) is a lightweight, in-memory representation of _Real DOM_ used by libraries like React to optimize UI rendering. The representation of a UI is kept in memory and synced with the "real" DOM. It''s a step that happens between the render function being called and the displaying of elements on the screen. This entire process is called _reconciliation_.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":16}'::jsonb,
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
    'How Virtual DOM works?',
    'The _Virtual DOM_ works in five simple steps.

    **1. Initial Render**  
        When a UI component renders for the first time, it returns JSX. React uses this structure to create a Virtual DOM tree, which is a lightweight copy of the actual DOM. This Virtual DOM is then used to build and render the Real DOM in the browser.

    **2. State or Props Change**  
        When the component''s state or props change, React creates a new Virtual DOM reflecting the updated UI. However, it doesn''t immediately update the Real DOM; instead, it works in memory to prepare for an efficient update.
               
      ![vdom](images/vdom1.png)

    **3. Diffing Algorithm**  
        React then compares the new Virtual DOM with the previous one using a process called diffing. It determines what has changed between the two versions and identifies the minimal set of updates needed.
       
       ![vdom2](images/vdom2.png)  

    **4. Reconciliation**  
        Based on the diffing results, React decides which parts of the Real DOM should be updated. It avoids re-rendering the entire DOM and instead updates only the elements that actually changed.
        
       ![vdom3](images/vdom3.png)

    **5. Efficient DOM Updates**  
        This entire process—working with the Virtual DOM, diffing, and selective updating—makes the UI rendering much faster and more efficient than manipulating the Real DOM directly.',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'The _Virtual DOM_ works in five simple steps.

    **1. Initial Render**  
        When a UI component renders for the first time, it returns JSX. React uses this structure to create a Virtual DOM tree, which is a lightweight copy of the actual DOM. This Virtual DOM is then used to build and render the Real DOM in the browser.

    **2. State or Props Change**  
        When the component''s state or props change, React creates a new Virtual DOM reflecting the updated UI. However, it doesn''t immediately update the Real DOM; instead, it works in memory to prepare for an efficient update.
               
      ![vdom](images/vdom1.png)

    **3. Diffing Algorithm**  
        React then compares the new Virtual DOM with the previous one using a process called diffing. It determines what has changed between the two versions and identifies the minimal set of updates needed.
       
       ![vdom2](images/vdom2.png)  

    **4. Reconciliation**  
        Based on the diffing results, React decides which parts of the Real DOM should be updated. It avoids re-rendering the entire DOM and instead updates only the elements that actually changed.
        
       ![vdom3](images/vdom3.png)

    **5. Efficient DOM Updates**  
        This entire process—working with the Virtual DOM, diffing, and selective updating—makes the UI rendering much faster and more efficient than manipulating the Real DOM directly.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":17}'::jsonb,
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
    'What is the difference between Shadow DOM and Virtual DOM?',
    'The _Shadow DOM_ is a browser technology designed primarily for scoping variables and CSS in _web components_. The _Virtual DOM_ is a concept implemented by libraries in JavaScript on top of browser APIs.

    The key differences in a table format shown below:

    | Feature | Shadow DOM | Virtual DOM |
    | --- | --- | --- |
    | Purpose | Encapsulation for Web Components | Efficient UI rendering |
    | Managed by | Browser | JS frameworks (e.g., React) |
    | DOM Type | Part of real DOM (scoped) | In-memory representation |
    | Encapsulation | Yes | No |
    | Use Case | Web Components, scoped styling | UI diffing and minimal DOM updates |',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'The _Shadow DOM_ is a browser technology designed primarily for scoping variables and CSS in _web components_. The _Virtual DOM_ is a concept implemented by libraries in JavaScript on top of browser APIs.

    The key differences in a table format shown below:

    | Feature | Shadow DOM | Virtual DOM |
    | --- | --- | --- |
    | Purpose | Encapsulation for Web Components | Efficient UI rendering |
    | Managed by | Browser | JS frameworks (e.g., React) |
    | DOM Type | Part of real DOM (scoped) | In-memory representation |
    | Encapsulation | Yes | No |
    | Use Case | Web Components, scoped styling | UI diffing and minimal DOM updates |',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":18}'::jsonb,
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
    'What is React Fiber?',
    '**React Fiber** is the **new reconciliation engine** in React, introduced in React 16. It’s a complete rewrite of React’s core algorithm(old stack-based algorithm) for rendering and updating the UI. Fiber enhances React’s ability to handle **asynchronous rendering**, **prioritized updates**(assign priority to different types of updates), and **interruption**(ability to pause, abort, or reuse work) of rendering work, enabling smoother and more responsive user interfaces.',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    '**React Fiber** is the **new reconciliation engine** in React, introduced in React 16. It’s a complete rewrite of React’s core algorithm(old stack-based algorithm) for rendering and updating the UI. Fiber enhances React’s ability to handle **asynchronous rendering**, **prioritized updates**(assign priority to different types of updates), and **interruption**(ability to pause, abort, or reuse work) of rendering work, enabling smoother and more responsive user interfaces.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":19}'::jsonb,
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
    'What is the main goal of React Fiber?',
    'The goal of _React Fiber_ is to increase its suitability for areas like animation, layout, and gestures. Its headline feature is **incremental rendering**: the ability to split rendering work into chunks and spread it out over multiple frames.

    Its main goals are:

    *   **Incremental Rendering** – Breaks work into chunks for smoother updates.
    *   **Interruptible Rendering** – Pauses and resumes rendering to keep the UI responsive.
    *   **Prioritization** – Handles high-priority updates (e.g. animations) before low-priority ones.
    *   **Concurrency Support** – Enables working on multiple UI versions simultaneously.
    *   **Better Error Handling** – Supports component-level error boundaries.
    *   **Suspense Support** – Allows waiting for async data before rendering.
    *   **Improved DevTools** – Enables better debugging and performance tracking.',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'The goal of _React Fiber_ is to increase its suitability for areas like animation, layout, and gestures. Its headline feature is **incremental rendering**: the ability to split rendering work into chunks and spread it out over multiple frames.

    Its main goals are:

    *   **Incremental Rendering** – Breaks work into chunks for smoother updates.
    *   **Interruptible Rendering** – Pauses and resumes rendering to keep the UI responsive.
    *   **Prioritization** – Handles high-priority updates (e.g. animations) before low-priority ones.
    *   **Concurrency Support** – Enables working on multiple UI versions simultaneously.
    *   **Better Error Handling** – Supports component-level error boundaries.
    *   **Suspense Support** – Allows waiting for async data before rendering.
    *   **Improved DevTools** – Enables better debugging and performance tracking.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":20}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.522Z',
    '2025-11-18T20:44:53.522Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  );

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

-- Batch 4: Questions 31-40 (10 questions)
INSERT INTO questions (
  id, title, content, type, difficulty, points, options, correct_answer, 
  explanation, test_cases, hints, tags, metadata, stats, category_id, 
  learning_card_id, is_active, created_at, updated_at, topic_id, time_limit
) VALUES (
    gen_random_uuid(),
    'What are fragments?',
    '<pre><code>    function Story({ title, description, date }) {
      return (
        &lt;&gt;
          &lt;h2&gt;{title}&lt;/h2&gt;
          &lt;p&gt;{description}&lt;/p&gt;
          &lt;p&gt;{date}&lt;/p&gt;
        &lt;/&gt;
      );
    }</code></pre>

It''s a common pattern or practice in React for a component to return multiple elements. _Fragments_ let you group a list of children without adding extra nodes to the DOM.
    You need to use either `<Fragment>` or a shorter syntax having empty tag (`<></>`).

    Below is the example of how to use fragment inside _Story_ component.


    It is also possible to render list of fragments inside a loop with the mandatory **key** attribute supplied.


    Usually, you don''t need to use `<Fragment>` until there is a need of _key_ attribute. The usage of shorter syntax looks like below.',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'It''s a common pattern or practice in React for a component to return multiple elements. _Fragments_ let you group a list of children without adding extra nodes to the DOM.
    You need to use either `<Fragment>` or a shorter syntax having empty tag (`<></>`).

    Below is the example of how to use fragment inside _Story_ component.


    It is also possible to render list of fragments inside a loop with the mandatory **key** attribute supplied.


    Usually, you don''t need to use `<Fragment>` until there is a need of _key_ attribute. The usage of shorter syntax looks like below.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":31}'::jsonb,
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
    'Why fragments are better than container divs?',
    'Below are the list of reasons to prefer fragments over container DOM elements,

    1. Fragments are a bit faster and use less memory by not creating an extra DOM node. This only has a real benefit on very large and deep trees.
    2. Some CSS mechanisms like _Flexbox_ and _CSS Grid_ have a special parent-child relationships, and adding divs in the middle makes it hard to keep the desired layout.
    3. The DOM Inspector is less cluttered.',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'Below are the list of reasons to prefer fragments over container DOM elements,

    1. Fragments are a bit faster and use less memory by not creating an extra DOM node. This only has a real benefit on very large and deep trees.
    2. Some CSS mechanisms like _Flexbox_ and _CSS Grid_ have a special parent-child relationships, and adding divs in the middle makes it hard to keep the desired layout.
    3. The DOM Inspector is less cluttered.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":32}'::jsonb,
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
    'What are portals in React?',
    '<pre><code>    function Modal({ children }) {
      return ReactDOM.createPortal(
        document.body)
      );
    }</code></pre>

A Portal is a React feature that enables rendering children into a DOM node that exists outside the parent component''s DOM hierarchy, while still preserving the React component hierarchy. Portals help avoid CSS stacking issues—for example, elements with position: fixed may not behave as expected inside a parent with transform. Portals solve this by rendering content (like modals or tooltips) outside such constrained DOM contexts.

    *   `child`: Any valid React node (e.g., JSX, string, fragment).
    *   `container`: A real DOM node (e.g., `document.getElementById(''modal-root'')`).

    Even though the content renders elsewhere in the DOM, it still behaves like a normal child in React. It has access to context, state, and event handling.

    **Example:- Modal:**
    The above code will render the modal content into the body element in the HTML, not inside the component''s usual location.',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'A Portal is a React feature that enables rendering children into a DOM node that exists outside the parent component''s DOM hierarchy, while still preserving the React component hierarchy. Portals help avoid CSS stacking issues—for example, elements with position: fixed may not behave as expected inside a parent with transform. Portals solve this by rendering content (like modals or tooltips) outside such constrained DOM contexts.

    *   `child`: Any valid React node (e.g., JSX, string, fragment).
    *   `container`: A real DOM node (e.g., `document.getElementById(''modal-root'')`).

    Even though the content renders elsewhere in the DOM, it still behaves like a normal child in React. It has access to context, state, and event handling.

    **Example:- Modal:**
    The above code will render the modal content into the body element in the HTML, not inside the component''s usual location.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":33}'::jsonb,
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
    'What are stateless components?',
    'If the behaviour of a component is independent of its state then it can be a stateless component. You can use either a function or a class for creating stateless components. But unless you need to use a lifecycle hook in your components, you should go for function components. There are a lot of benefits if you decide to use function components here; they are easy to write, understand, and test, a little faster, and you can avoid the `this` keyword altogether.',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'If the behaviour of a component is independent of its state then it can be a stateless component. You can use either a function or a class for creating stateless components. But unless you need to use a lifecycle hook in your components, you should go for function components. There are a lot of benefits if you decide to use function components here; they are easy to write, understand, and test, a little faster, and you can avoid the `this` keyword altogether.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":34}'::jsonb,
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
    'What are stateful components?',
    '<pre><code>    class App extends Component {
      constructor(props) {
        super(props);
        this.state = { count: 0 };
      }

      handleIncrement() {
        setState({ count: this.state.count + 1 });
      }

      render() {
        &lt;&gt;
          &lt;button onClick={() =&gt; this.handleIncrement}&gt;Increment&lt;/button&gt;
          &lt;span&gt;Count: {count}&lt;/span&gt;
        &lt;/&gt;;
      }
    }</code></pre>

If the behaviour of a component is dependent on the _state_ of the component then it can be termed as stateful component. These _stateful components_ are either function components with hooks or _class components_.

    Let''s take an example of function stateful component which update the state based on click event,


    <p>
    The equivalent class stateful component with a state that gets initialized in the `constructor`.


    </p>',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'If the behaviour of a component is dependent on the _state_ of the component then it can be termed as stateful component. These _stateful components_ are either function components with hooks or _class components_.

    Let''s take an example of function stateful component which update the state based on click event,


    <p>
    The equivalent class stateful component with a state that gets initialized in the `constructor`.


    </p>',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":35}'::jsonb,
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
    'How to apply validation on props in React?',
    '<pre><code>    import React from &quot;react&quot;;
    import PropTypes from &quot;prop-types&quot;;

    function User({ name, age }) {
      return (
        &lt;&gt;
          &lt;h1&gt;{`Welcome, ${name}`}&lt;/h1&gt;
          &lt;h2&gt;{`Age, ${age}`}&lt;/h2&gt;
        &lt;/&gt;
      );
    }

    User.propTypes = {
      name: PropTypes.string.isRequired,
      age: PropTypes.number.isRequired,
    };</code></pre>

When the application is running in _development mode_, React will automatically check all props that we set on components to make sure they have _correct type_. If the type is incorrect, React will generate warning messages in the console. It''s disabled in _production mode_ due to performance impact. The mandatory props are defined with `isRequired`.

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


    **Note:** In React v15.5 _PropTypes_ were moved from `React.PropTypes` to `prop-types` library.

    _The Equivalent Functional Component_',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'When the application is running in _development mode_, React will automatically check all props that we set on components to make sure they have _correct type_. If the type is incorrect, React will generate warning messages in the console. It''s disabled in _production mode_ due to performance impact. The mandatory props are defined with `isRequired`.

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


    **Note:** In React v15.5 _PropTypes_ were moved from `React.PropTypes` to `prop-types` library.

    _The Equivalent Functional Component_',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":36}'::jsonb,
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
    'What are the advantages of React?',
    'Below are the list of main advantages of React,

    1. Increases the application''s performance with _Virtual DOM_.
    2. JSX makes code easy to read and write.
    3. It renders both on client and server side (_SSR_).
    4. Easy to integrate with frameworks (Angular, Backbone) since it is only a view library.
    5. Easy to write unit and integration tests with tools such as Jest.',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'Below are the list of main advantages of React,

    1. Increases the application''s performance with _Virtual DOM_.
    2. JSX makes code easy to read and write.
    3. It renders both on client and server side (_SSR_).
    4. Easy to integrate with frameworks (Angular, Backbone) since it is only a view library.
    5. Easy to write unit and integration tests with tools such as Jest.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":37}'::jsonb,
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
    'What are the limitations of React?',
    'Apart from the advantages, there are few limitations of React too,

    1. React is just a view library, not a full framework.
    2. There is a learning curve for beginners who are new to web development.
    3. Integrating React into a traditional MVC framework requires some additional configuration.
    4. The code complexity increases with inline templating and JSX.
    5. Too many smaller components leading to over engineering or boilerplate.',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'Apart from the advantages, there are few limitations of React too,

    1. React is just a view library, not a full framework.
    2. There is a learning curve for beginners who are new to web development.
    3. Integrating React into a traditional MVC framework requires some additional configuration.
    4. The code complexity increases with inline templating and JSX.
    5. Too many smaller components leading to over engineering or boilerplate.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":38}'::jsonb,
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
    'What are the recommended ways for static type checking?',
    'Normally we use _PropTypes library_ (`React.PropTypes` moved to a `prop-types` package since React v15.5) for _type checking_ in the React applications. For large code bases, it is recommended to use _static type checkers_ such as Flow or TypeScript, that perform type checking at compile time and provide auto-completion features.',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'Normally we use _PropTypes library_ (`React.PropTypes` moved to a `prop-types` package since React v15.5) for _type checking_ in the React applications. For large code bases, it is recommended to use _static type checkers_ such as Flow or TypeScript, that perform type checking at compile time and provide auto-completion features.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":39}'::jsonb,
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
    'What is the use of `react-dom` package?',
    'The `react-dom` package provides _DOM-specific methods_ that can be used at the top level of your app. Most of the components are not required to use this module. Some of the methods of this package are:

    1. `render()`
    2. `hydrate()`
    3. `unmountComponentAtNode()`
    4. `findDOMNode()`
    5. `createPortal()`',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'The `react-dom` package provides _DOM-specific methods_ that can be used at the top level of your app. Most of the components are not required to use this module. Some of the methods of this package are:

    1. `render()`
    2. `hydrate()`
    3. `unmountComponentAtNode()`
    4. `findDOMNode()`
    5. `createPortal()`',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":40}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.522Z',
    '2025-11-18T20:44:53.522Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  );

-- Batch 5: Questions 41-50 (10 questions)
INSERT INTO questions (
  id, title, content, type, difficulty, points, options, correct_answer, 
  explanation, test_cases, hints, tags, metadata, stats, category_id, 
  learning_card_id, is_active, created_at, updated_at, topic_id, time_limit
) VALUES (
    gen_random_uuid(),
    'What is ReactDOMServer?',
    '<pre><code>    // using Express
    import { renderToString } from &quot;react-dom/server&quot;;
    import MyPage from &quot;./MyPage&quot;;

    app.get(&quot;/&quot;, (req, res) =&gt; {
      res.write(
        &quot;&lt;!DOCTYPE html&gt;&lt;html&gt;&lt;head&gt;&lt;title&gt;My Page&lt;/title&gt;&lt;/head&gt;&lt;body&gt;&quot;
      );
      res.write(&#039;&lt;div id=&quot;content&quot;&gt;&#039;);
      res.write(renderToString(&lt;MyPage /&gt;));
      res.write(&quot;&lt;/div&gt;&lt;/body&gt;&lt;/html&gt;&quot;);
      res.end();
    });</code></pre>

The `ReactDOMServer` object enables you to render components to static markup (typically used on node server). This object is mainly used for _server-side rendering_ (SSR). The following methods can be used in both the server and browser environments:

    1. `renderToString()`
    2. `renderToStaticMarkup()`

    For example, you generally run a Node-based web server like Express, Hapi, or Koa, and you call `renderToString` to render your root component to a string, which you then send as response.',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'The `ReactDOMServer` object enables you to render components to static markup (typically used on node server). This object is mainly used for _server-side rendering_ (SSR). The following methods can be used in both the server and browser environments:

    1. `renderToString()`
    2. `renderToStaticMarkup()`

    For example, you generally run a Node-based web server like Express, Hapi, or Koa, and you call `renderToString` to render your root component to a string, which you then send as response.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":41}'::jsonb,
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
    'How to use innerHTML in React?',
    '<pre><code>    function createMarkup() {
      return { __html: &quot;First &amp;middot; Second&quot; };
    }

    function MyComponent() {
      return &lt;div dangerouslySetInnerHTML={createMarkup()} /&gt;;
    }</code></pre>

The `dangerouslySetInnerHTML` attribute is React''s replacement for using `innerHTML` in the browser DOM. Just like `innerHTML`, it is risky to use this attribute considering cross-site scripting (XSS) attacks. You just need to pass a `__html` object as key and HTML text as value.

    In this example MyComponent uses `dangerouslySetInnerHTML` attribute for setting HTML markup:',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'The `dangerouslySetInnerHTML` attribute is React''s replacement for using `innerHTML` in the browser DOM. Just like `innerHTML`, it is risky to use this attribute considering cross-site scripting (XSS) attacks. You just need to pass a `__html` object as key and HTML text as value.

    In this example MyComponent uses `dangerouslySetInnerHTML` attribute for setting HTML markup:',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":42}'::jsonb,
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
    'How to use styles in React?',
    '<pre><code>    const divStyle = {
      color: &quot;blue&quot;,
      backgroundImage: &quot;url(&quot; + imgUrl + &quot;)&quot;,
    };

    function HelloWorldComponent() {
      return &lt;div style={divStyle}&gt;Hello World!&lt;/div&gt;;
    }</code></pre>

The `style` attribute accepts a JavaScript object with camelCased properties rather than a CSS string. This is consistent with the DOM style JavaScript property, is more efficient, and prevents XSS security holes.


    Style keys are camelCased in order to be consistent with accessing the properties on DOM nodes in JavaScript (e.g. `node.style.backgroundImage`).',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'The `style` attribute accepts a JavaScript object with camelCased properties rather than a CSS string. This is consistent with the DOM style JavaScript property, is more efficient, and prevents XSS security holes.


    Style keys are camelCased in order to be consistent with accessing the properties on DOM nodes in JavaScript (e.g. `node.style.backgroundImage`).',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":43}'::jsonb,
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
    'How events are different in React?',
    'Handling events in React elements has some syntactic differences:

    1. React event handlers are named using camelCase, rather than lowercase.
    2. With JSX you pass a function as the event handler, rather than a string.',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'Handling events in React elements has some syntactic differences:

    1. React event handlers are named using camelCase, rather than lowercase.
    2. With JSX you pass a function as the event handler, rather than a string.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":44}'::jsonb,
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
    'What is the impact of indexes as keys?',
    '<pre><code>    {
      todos.map((todo) =&gt; &lt;Todo {...todo} key={todo.id} /&gt;);
    }</code></pre>

Keys should be stable, predictable, and unique so that React can keep track of elements.

    In the below code snippet each element''s key will be based on ordering, rather than tied to the data that is being represented. This limits the optimizations that React can do and creates confusing bugs in the application.


    If you use element data for unique key, assuming `todo.id` is unique to this list and stable, React would be able to reorder elements without needing to reevaluate them as much.


    **Note:** If you don''t specify `key` prop at all, React will use index as a key''s value while iterating over an array of data.',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'Keys should be stable, predictable, and unique so that React can keep track of elements.

    In the below code snippet each element''s key will be based on ordering, rather than tied to the data that is being represented. This limits the optimizations that React can do and creates confusing bugs in the application.


    If you use element data for unique key, assuming `todo.id` is unique to this list and stable, React would be able to reorder elements without needing to reevaluate them as much.


    **Note:** If you don''t specify `key` prop at all, React will use index as a key''s value while iterating over an array of data.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":45}'::jsonb,
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
    'How do you conditionally render components?',
    '<pre><code>    const MyComponent = ({ name, address }) =&gt; (
        &lt;h2&gt;{name}&lt;/h2&gt;
        {address ? &lt;p&gt;{address}&lt;/p&gt; : &lt;p&gt;{&quot;Address is not available&quot;}&lt;/p&gt;}
    );</code></pre>

In some cases you want to render different components depending on some state. JSX does not render `false` or `undefined`, so you can use conditional _short-circuiting_ to render a given part of your component only if a certain condition is true.


    If you need an `if-else` condition then use _ternary operator_.',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'In some cases you want to render different components depending on some state. JSX does not render `false` or `undefined`, so you can use conditional _short-circuiting_ to render a given part of your component only if a certain condition is true.


    If you need an `if-else` condition then use _ternary operator_.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":46}'::jsonb,
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
    'Why we need to be careful when spreading props on DOM elements?',
    '<pre><code>    const ComponentA = () =&gt; (
      &lt;ComponentB isDisplay={true} className={&quot;componentStyle&quot;} /&gt;
    );

    const ComponentB = ({ isDisplay, ...domProps }) =&gt; (
    );</code></pre>

When we _spread props_ we run into the risk of adding unknown HTML attributes, which is a bad practice. Instead we can use prop destructuring with `...rest` operator, so it will add only required props.

    For example,',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'When we _spread props_ we run into the risk of adding unknown HTML attributes, which is a bad practice. Instead we can use prop destructuring with `...rest` operator, so it will add only required props.

    For example,',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":47}'::jsonb,
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
    'How do you memoize a component?',
    '<pre><code>    const MemoComponent = React.memo(function MemoComponent(props) {
      /* render using props */
    });
    OR;
    export default React.memo(MyFunctionComponent);</code></pre>

There are memoize libraries available which can be used on function components.

    For example `moize` library can memoize the component in another component.


    **Update:** Since React v16.6.0, we have a `React.memo`. It provides a higher order component which memoizes component unless the props change. To use it, simply wrap the component using React.memo before you use it.',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'There are memoize libraries available which can be used on function components.

    For example `moize` library can memoize the component in another component.


    **Update:** Since React v16.6.0, we have a `React.memo`. It provides a higher order component which memoizes component unless the props change. To use it, simply wrap the component using React.memo before you use it.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":48}'::jsonb,
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
    'How you implement Server Side Rendering or SSR?',
    '<pre><code>    import ReactDOMServer from &quot;react-dom/server&quot;;
    import App from &quot;./App&quot;;

    ReactDOMServer.renderToString(&lt;App /&gt;);</code></pre>

React is already equipped to handle rendering on Node servers. A special version of the DOM renderer is available, which follows the same pattern as on the client side.


    This method will output the regular HTML as a string, which can be then placed inside a page body as part of the server response. On the client side, React detects the pre-rendered content and seamlessly picks up where it left off.',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'React is already equipped to handle rendering on Node servers. A special version of the DOM renderer is available, which follows the same pattern as on the client side.


    This method will output the regular HTML as a string, which can be then placed inside a page body as part of the server response. On the client side, React detects the pre-rendered content and seamlessly picks up where it left off.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":49}'::jsonb,
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
    'How to enable production mode in React?',
    'You should use Webpack''s `DefinePlugin` method to set `NODE_ENV` to `production`, by which it strip out things like propType validation and extra warnings. Apart from this, if you minify the code, for example, Uglify''s dead-code elimination to strip out development only code and comments, it will drastically reduce the size of your bundle.',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'You should use Webpack''s `DefinePlugin` method to set `NODE_ENV` to `production`, by which it strip out things like propType validation and extra warnings. Apart from this, if you minify the code, for example, Uglify''s dead-code elimination to strip out development only code and comments, it will drastically reduce the size of your bundle.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":50}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.522Z',
    '2025-11-18T20:44:53.522Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  );

-- Batch 6: Questions 51-60 (10 questions)
INSERT INTO questions (
  id, title, content, type, difficulty, points, options, correct_answer, 
  explanation, test_cases, hints, tags, metadata, stats, category_id, 
  learning_card_id, is_active, created_at, updated_at, topic_id, time_limit
) VALUES (
    gen_random_uuid(),
    'Do Hooks replace render props and higher order components?',
    'Both render props and higher-order components render only a single child but in most of the cases Hooks are a simpler way to serve this by reducing nesting in your tree.',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'Both render props and higher-order components render only a single child but in most of the cases Hooks are a simpler way to serve this by reducing nesting in your tree.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":51}'::jsonb,
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
    'What is a switching component?',
    '<pre><code>    import HomePage from &quot;./HomePage&quot;;
    import AboutPage from &quot;./AboutPage&quot;;
    import ServicesPage from &quot;./ServicesPage&quot;;
    import ContactPage from &quot;./ContactPage&quot;;

    const PAGES = {
      home: HomePage,
      about: AboutPage,
      services: ServicesPage,
      contact: ContactPage,
    };

    const Page = (props) =&gt; {
      const Handler = PAGES[props.page] || ContactPage;

      return &lt;Handler {...props} /&gt;;
    };

    // The keys of the PAGES object can be used in the prop types to catch dev-time errors.
    Page.propTypes = {
      page: PropTypes.oneOf(Object.keys(PAGES)).isRequired,
    };</code></pre>

A _switching component_ is a component that renders one of many components. We need to use object to map prop values to components.

    For example, a switching component to display different pages based on `page` prop:',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'A _switching component_ is a component that renders one of many components. We need to use object to map prop values to components.

    For example, a switching component to display different pages based on `page` prop:',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":52}'::jsonb,
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
    'What are React Mixins?',
    '<pre><code>    const PureRenderMixin = require(&quot;react-addons-pure-render-mixin&quot;);

    const Button = React.createClass({
      mixins: [PureRenderMixin],
      // ...
    });</code></pre>

_Mixins_ are a way to totally separate components to have a common functionality. Mixins **should not be used** and can be replaced with _higher-order components_ or _decorators_.

    One of the most commonly used mixins is `PureRenderMixin`. You might be using it in some components to prevent unnecessary re-renders when the props and state are shallowly equal to the previous props and state:


     <!-- TODO: mixins are deprecated -->',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    '_Mixins_ are a way to totally separate components to have a common functionality. Mixins **should not be used** and can be replaced with _higher-order components_ or _decorators_.

    One of the most commonly used mixins is `PureRenderMixin`. You might be using it in some components to prevent unnecessary re-renders when the props and state are shallowly equal to the previous props and state:


     <!-- TODO: mixins are deprecated -->',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":53}'::jsonb,
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
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
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
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":54}'::jsonb,
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
    'Why should component names start with capital letter?',
    '<pre><code>    import MyComponent from &quot;./myComponent&quot;;</code></pre>

If you are rendering your component using JSX, the name of that component has to begin with a capital letter otherwise React will throw an error as an unrecognized tag. This convention is because only HTML elements and SVG tags can begin with a lowercase letter.


    You can define function component whose name starts with lowercase letter, but when it''s imported it should have a capital letter. Here lowercase is fine:


    While when imported in another file it should start with capital letter:',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'If you are rendering your component using JSX, the name of that component has to begin with a capital letter otherwise React will throw an error as an unrecognized tag. This convention is because only HTML elements and SVG tags can begin with a lowercase letter.


    You can define function component whose name starts with lowercase letter, but when it''s imported it should have a capital letter. Here lowercase is fine:


    While when imported in another file it should start with capital letter:',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":55}'::jsonb,
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
    'Are custom DOM attributes supported in React v16?',
    'Yes. In the past, React used to ignore unknown DOM attributes. If you wrote JSX with an attribute that React doesn''t recognize, React would just skip it.

    For example, let''s take a look at the below attribute:


    Would render an empty div to the DOM with React v15:


    In React v16 any unknown attributes will end up in the DOM:


    This is useful for supplying browser-specific non-standard attributes, trying new DOM APIs, and integrating with opinionated third-party libraries.',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'Yes. In the past, React used to ignore unknown DOM attributes. If you wrote JSX with an attribute that React doesn''t recognize, React would just skip it.

    For example, let''s take a look at the below attribute:


    Would render an empty div to the DOM with React v15:


    In React v16 any unknown attributes will end up in the DOM:


    This is useful for supplying browser-specific non-standard attributes, trying new DOM APIs, and integrating with opinionated third-party libraries.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":56}'::jsonb,
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
    'How to loop inside JSX?',
    '<pre><code>    &lt;tbody&gt;
      for (let i = 0; i &lt; items.length; i++) {
        &lt;SomeComponent key={items[i].id} name={items[i].name} /&gt;
      }
    &lt;/tbody&gt;</code></pre>

You can simply use `Array.prototype.map` with ES6 _arrow function_ syntax.

    For example, the `items` array of objects is mapped into an array of components:


    But you can''t iterate using `for` loop:


    This is because JSX tags are transpiled into _function calls_, and you can''t use statements inside expressions. This may change thanks to `do` expressions which are _stage 1 proposal_.',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'You can simply use `Array.prototype.map` with ES6 _arrow function_ syntax.

    For example, the `items` array of objects is mapped into an array of components:


    But you can''t iterate using `for` loop:


    This is because JSX tags are transpiled into _function calls_, and you can''t use statements inside expressions. This may change thanks to `do` expressions which are _stage 1 proposal_.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":57}'::jsonb,
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
    'How do you access props in attribute quotes?',
    '<pre><code>    &lt;img className=&quot;image&quot; src={`images/${this.props.image}`} /&gt;</code></pre>

React (or JSX) doesn''t support variable interpolation inside an attribute value. The below representation won''t work:


    But you can put any JS expression inside curly braces as the entire attribute value. So the below expression works:


    Using _template strings_ will also work:',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'React (or JSX) doesn''t support variable interpolation inside an attribute value. The below representation won''t work:


    But you can put any JS expression inside curly braces as the entire attribute value. So the below expression works:


    Using _template strings_ will also work:',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":58}'::jsonb,
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
    'What is React proptype array with shape?',
    '<pre><code>    ReactComponent.propTypes = {
      arrayWithShape: React.PropTypes.arrayOf(
        React.PropTypes.shape({
          color: React.PropTypes.string.isRequired,
          fontSize: React.PropTypes.number.isRequired,
        })
      ).isRequired,
    };</code></pre>

If you want to pass an array of objects to a component with a particular shape then use `React.PropTypes.shape()` as an argument to `React.PropTypes.arrayOf()`.',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'If you want to pass an array of objects to a component with a particular shape then use `React.PropTypes.shape()` as an argument to `React.PropTypes.arrayOf()`.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":59}'::jsonb,
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
    'How to conditionally apply class attributes?',
    'You shouldn''t use curly braces inside quotes because it is going to be evaluated as a string.


    Instead you need to move curly braces outside (don''t forget to include spaces between class names):


    _Template strings_ will also work:',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'You shouldn''t use curly braces inside quotes because it is going to be evaluated as a string.


    Instead you need to move curly braces outside (don''t forget to include spaces between class names):


    _Template strings_ will also work:',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":60}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.522Z',
    '2025-11-18T20:44:53.522Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  );

-- Batch 7: Questions 61-70 (10 questions)
INSERT INTO questions (
  id, title, content, type, difficulty, points, options, correct_answer, 
  explanation, test_cases, hints, tags, metadata, stats, category_id, 
  learning_card_id, is_active, created_at, updated_at, topic_id, time_limit
) VALUES (
    gen_random_uuid(),
    'What is the difference between React and ReactDOM?',
    'The `react` package contains `React.createElement()`, `React.Component`, `React.Children`, and other helpers related to elements and component classes. You can think of these as the isomorphic or universal helpers that you need to build components. The `react-dom` package contains `ReactDOM.render()`, and in `react-dom/server` we have _server-side rendering_ support with `ReactDOMServer.renderToString()` and `ReactDOMServer.renderToStaticMarkup()`.',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'The `react` package contains `React.createElement()`, `React.Component`, `React.Children`, and other helpers related to elements and component classes. You can think of these as the isomorphic or universal helpers that you need to build components. The `react-dom` package contains `ReactDOM.render()`, and in `react-dom/server` we have _server-side rendering_ support with `ReactDOMServer.renderToString()` and `ReactDOMServer.renderToStaticMarkup()`.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":61}'::jsonb,
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
    'Why ReactDOM is separated from React?',
    'The React team worked on extracting all DOM-related features into a separate library called _ReactDOM_. React v0.14 is the first release in which the libraries are split. By looking at some of the packages, `react-native`, `react-art`, `react-canvas`, and `react-three`, it has become clear that the beauty and essence of React has nothing to do with browsers or the DOM.

    To build more environments that React can render to, React team planned to split the main React package into two: `react` and `react-dom`. This paves the way to writing components that can be shared between the web version of React and React Native.',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'The React team worked on extracting all DOM-related features into a separate library called _ReactDOM_. React v0.14 is the first release in which the libraries are split. By looking at some of the packages, `react-native`, `react-art`, `react-canvas`, and `react-three`, it has become clear that the beauty and essence of React has nothing to do with browsers or the DOM.

    To build more environments that React can render to, React team planned to split the main React package into two: `react` and `react-dom`. This paves the way to writing components that can be shared between the web version of React and React Native.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":62}'::jsonb,
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
    'How to use React label element?',
    '<pre><code>    &lt;label htmlFor={&#039;user&#039;}&gt;{&#039;User&#039;}&lt;/label&gt;
    &lt;input type={&#039;text&#039;} id={&#039;user&#039;} /&gt;</code></pre>

If you try to render a `<label>` element bound to a text input using the standard `for` attribute, then it produces HTML missing that attribute and prints a warning to the console.


    Since `for` is a reserved keyword in JavaScript, use `htmlFor` instead.',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'If you try to render a `<label>` element bound to a text input using the standard `for` attribute, then it produces HTML missing that attribute and prints a warning to the console.


    Since `for` is a reserved keyword in JavaScript, use `htmlFor` instead.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":63}'::jsonb,
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
    'How to combine multiple inline style objects?',
    '<pre><code>    &lt;button style={[styles.panel.button, styles.panel.submitButton]}&gt;
      {&quot;Submit&quot;}
    &lt;/button&gt;</code></pre>

You can use _spread operator_ in regular React:


    If you''re using React Native then you can use the array notation:',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'You can use _spread operator_ in regular React:


    If you''re using React Native then you can use the array notation:',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":64}'::jsonb,
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
    'How to re-render the view when the browser is resized?',
    '<pre><code>    class WindowDimensions extends React.Component {
      constructor(props) {
        super(props);
        this.updateDimensions = this.updateDimensions.bind(this);
      }

      componentWillMount() {
        this.updateDimensions();
      }

      componentDidMount() {
        window.addEventListener(&quot;resize&quot;, this.updateDimensions);
      }

      componentWillUnmount() {
        window.removeEventListener(&quot;resize&quot;, this.updateDimensions);
      }

      updateDimensions() {
        this.setState({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      render() {
        return (
          &lt;span&gt;
            {this.state.width} x {this.state.height}
          &lt;/span&gt;
        );
      }
    }</code></pre>

You can use the `useState` hook to manage the width and height state variables, and the `useEffect` hook to add and remove the `resize` event listener. The `[]` dependency array passed to useEffect ensures that the effect only runs once (on mount) and not on every re-render.



    You can listen to the `resize` event in `componentDidMount()` and then update the dimensions (`width` and `height`). You should remove the listener in `componentWillUnmount()` method.',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'You can use the `useState` hook to manage the width and height state variables, and the `useEffect` hook to add and remove the `resize` event listener. The `[]` dependency array passed to useEffect ensures that the effect only runs once (on mount) and not on every re-render.



    You can listen to the `resize` event in `componentDidMount()` and then update the dimensions (`width` and `height`). You should remove the listener in `componentWillUnmount()` method.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":65}'::jsonb,
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
    'How to pretty print JSON with React?',
    '<pre><code>    const data = { name: &quot;John&quot;, age: 42 };

    class User extends React.Component {
      render() {
        return &lt;pre&gt;{JSON.stringify(data, null, 2)}&lt;/pre&gt;;
      }
    }

    React.render(&lt;User /&gt;, document.getElementById(&quot;container&quot;));</code></pre>

We can use `<pre>` tag so that the formatting of the `JSON.stringify()` is retained:


      <p>


      </p>',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'We can use `<pre>` tag so that the formatting of the `JSON.stringify()` is retained:


      <p>


      </p>',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":66}'::jsonb,
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
    'Why can''t you update props in React?',
    'The React philosophy is that props should be _immutable_(read only) and _top-down_. This means that a parent can send any prop values to a child, but the child can''t modify received props.',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'The React philosophy is that props should be _immutable_(read only) and _top-down_. This means that a parent can send any prop values to a child, but the child can''t modify received props.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":67}'::jsonb,
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
    'How to focus an input element on page load?',
    '<pre><code>    class App extends React.Component {
      componentDidMount() {
        this.nameInput.focus();
      }

      render() {
        return (
            &lt;input defaultValue={&quot;Won&#039;t focus&quot;} /&gt;
            &lt;input
              ref={(input) =&gt; (this.nameInput = input)}
              defaultValue={&quot;Will focus&quot;}
            /&gt;
        );
      }
    }

    ReactDOM.render(&lt;App /&gt;, document.getElementById(&quot;app&quot;));</code></pre>

You need to use `useEffect` hook to set focus on input field during page load time for functional component.


      <p>
      You can do it by creating _ref_ for `input` element and using it in `componentDidMount()`:


      </p>',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'You need to use `useEffect` hook to set focus on input field during page load time for functional component.


      <p>
      You can do it by creating _ref_ for `input` element and using it in `componentDidMount()`:


      </p>',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":68}'::jsonb,
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
    'How can we find the version of React at runtime in the browser?',
    '<pre><code>    const REACT_VERSION = React.version;

    ReactDOM.render(
      document.getElementById(&quot;app&quot;)
    );</code></pre>

You can use `React.version` to get the version.',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'You can use `React.version` to get the version.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":69}'::jsonb,
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
    'How to add Google Analytics for React Router?',
    '<pre><code>    history.listen(function (location) {
      window.ga(&quot;set&quot;, &quot;page&quot;, location.pathname + location.search);
      window.ga(&quot;send&quot;, &quot;pageview&quot;, location.pathname + location.search);
    });</code></pre>

Add a listener on the `history` object to record each page view:',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'Add a listener on the `history` object to record each page view:',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":70}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.522Z',
    '2025-11-18T20:44:53.522Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  );

-- Batch 8: Questions 71-80 (10 questions)
INSERT INTO questions (
  id, title, content, type, difficulty, points, options, correct_answer, 
  explanation, test_cases, hints, tags, metadata, stats, category_id, 
  learning_card_id, is_active, created_at, updated_at, topic_id, time_limit
) VALUES (
    gen_random_uuid(),
    'How do you apply vendor prefixes to inline styles in React?',
    '<pre><code>      style={{
        transform: &quot;rotate(90deg)&quot;,
        WebkitTransform: &quot;rotate(90deg)&quot;, // note the capital &#039;W&#039; here
        msTransform: &quot;rotate(90deg)&quot;, // &#039;ms&#039; is the only lowercase vendor prefix
      }}
    /&gt;</code></pre>

React _does not_ apply _vendor prefixes_ automatically. You need to add vendor prefixes manually.',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'React _does not_ apply _vendor prefixes_ automatically. You need to add vendor prefixes manually.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":71}'::jsonb,
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
    'How to import and export components using React and ES6?',
    '<pre><code>
</code></pre>

You should use default for exporting the components


    <p>
    </p>

    With the export specifier, the MyProfile is going to be the member and exported to this module and the same can be imported without mentioning the name in other components.',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'You should use default for exporting the components


    <p>
    </p>

    With the export specifier, the MyProfile is going to be the member and exported to this module and the same can be imported without mentioning the name in other components.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":72}'::jsonb,
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
    'What are the exceptions on React component naming?',
    '<pre><code>         render() {
              return (
                &lt;obj.component/&gt; // `React.createElement(obj.component)`
              )
        }</code></pre>

The component names should start with an uppercase letter but there are few exceptions to this convention. The lowercase tag names with a dot (property accessors) are still considered as valid component names.
    For example, the below tag can be compiled to a valid component,',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'The component names should start with an uppercase letter but there are few exceptions to this convention. The lowercase tag names with a dot (property accessors) are still considered as valid component names.
    For example, the below tag can be compiled to a valid component,',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":73}'::jsonb,
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
    'Is it possible to use async/await in plain React?',
    '<pre><code>    import { useEffect, useState } from &#039;react&#039;;

    function UserProfile() {
      const [user, setUser] = useState(null);

      useEffect(() =&gt; {
        const fetchUser = async () =&gt; {
          const response = await fetch(&#039;/api/user&#039;);
          const data = await response.json();
          setUser(data);
        };

        fetchUser();
      }, []);

      return user ? &lt;div&gt;Hello, {user.name}&lt;/div&gt; : &lt;div&gt;Loading...&lt;/div&gt;;
    }</code></pre>

Yes, you can use `async/await` in plain React, as long as your JavaScript environment supports ES2017+. Nowadays most modern browsers and build tools support ES2017+ version. If you''re using **Create React App**, **Next.js**, **Remix**, or any modern React setup, `async/await` is supported out of the box through **Babel**.

    ### Example Usage

    But If you''re not using a bundler like **Webpack or Babel**, you will need _Babel_ and [transform-async-to-generator](https://babeljs.io/docs/en/babel-plugin-transform-async-to-generator) plugin. However, React Native ships with Babel and a set of transforms.',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'Yes, you can use `async/await` in plain React, as long as your JavaScript environment supports ES2017+. Nowadays most modern browsers and build tools support ES2017+ version. If you''re using **Create React App**, **Next.js**, **Remix**, or any modern React setup, `async/await` is supported out of the box through **Babel**.

    ### Example Usage

    But If you''re not using a bundler like **Webpack or Babel**, you will need _Babel_ and [transform-async-to-generator](https://babeljs.io/docs/en/babel-plugin-transform-async-to-generator) plugin. However, React Native ships with Babel and a set of transforms.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":74}'::jsonb,
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
    'What are the common folder structures for React?',
    '<pre><code>        api/
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
        └─ ProfileHeader.css</code></pre>

There are two common practices for React project file structure.

     1.  **Grouping by features or routes:**

        One common way to structure projects is locate CSS, JS, and tests together, grouped by feature or route.


     2.  **Grouping by file type:**

        Another popular way to structure projects is to group similar files together.',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'There are two common practices for React project file structure.

     1.  **Grouping by features or routes:**

        One common way to structure projects is locate CSS, JS, and tests together, grouped by feature or route.


     2.  **Grouping by file type:**

        Another popular way to structure projects is to group similar files together.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":75}'::jsonb,
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
    'What are the popular packages for animation?',
    '_React Transition Group_ and _React Motion_ are popular animation packages in React ecosystem.',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    '_React Transition Group_ and _React Motion_ are popular animation packages in React ecosystem.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":76}'::jsonb,
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
    'What is the benefit of styles modules?',
    '<pre><code>    import { space, colors } from &quot;./styles&quot;;</code></pre>

It is recommended to avoid hard coding style values in components. Any values that are likely to be used across different UI components should be extracted into their own modules.

    For example, these styles could be extracted into a separate component:


    And then imported individually in other components:',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'It is recommended to avoid hard coding style values in components. Any values that are likely to be used across different UI components should be extracted into their own modules.

    For example, these styles could be extracted into a separate component:


    And then imported individually in other components:',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":77}'::jsonb,
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
    'What are the popular React-specific linters?',
    'ESLint is a popular JavaScript linter. There are plugins available that analyse specific code styles. One of the most common for React is an npm package called `eslint-plugin-react`. By default, it will check a number of best practices, with rules checking things from keys in iterators to a complete set of prop types.

    Another popular plugin is `eslint-plugin-jsx-a11y`, which will help fix common issues with accessibility. As JSX offers slightly different syntax to regular HTML, issues with `alt` text and `tabindex`, for example, will not be picked up by regular plugins.',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'ESLint is a popular JavaScript linter. There are plugins available that analyse specific code styles. One of the most common for React is an npm package called `eslint-plugin-react`. By default, it will check a number of best practices, with rules checking things from keys in iterators to a complete set of prop types.

    Another popular plugin is `eslint-plugin-jsx-a11y`, which will help fix common issues with accessibility. As JSX offers slightly different syntax to regular HTML, issues with `alt` text and `tabindex`, for example, will not be picked up by regular plugins.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":78}'::jsonb,
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
    'What is React Router?',
    'React Router is a powerful routing library built on top of React that helps you add new screens and flows to your application incredibly quickly, all while keeping the URL in sync with what''s being displayed on the page.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'React Router is a powerful routing library built on top of React that helps you add new screens and flows to your application incredibly quickly, all while keeping the URL in sync with what''s being displayed on the page.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'routing', 'intermediate'],
    '{"source":"reference.md","section":"React Router","originalNum":79}'::jsonb,
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
    'How React Router is different from history library?',
    'React Router is a wrapper around the `history` library which handles interaction with the browser''s `window.history` with its browser and hash histories. It also provides memory history which is useful for environments that don''t have global history, such as mobile app development (React Native) and unit testing with Node.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'React Router is a wrapper around the `history` library which handles interaction with the browser''s `window.history` with its browser and hash histories. It also provides memory history which is useful for environments that don''t have global history, such as mobile app development (React Native) and unit testing with Node.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'routing', 'intermediate'],
    '{"source":"reference.md","section":"React Router","originalNum":80}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.522Z',
    '2025-11-18T20:44:53.522Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  );

-- Batch 9: Questions 81-90 (10 questions)
INSERT INTO questions (
  id, title, content, type, difficulty, points, options, correct_answer, 
  explanation, test_cases, hints, tags, metadata, stats, category_id, 
  learning_card_id, is_active, created_at, updated_at, topic_id, time_limit
) VALUES (
    gen_random_uuid(),
    'What are the `<Router>` components of React Router v6?',
    'React Router v6 provides below 4 `<Router>` components:

    1.  `<BrowserRouter>`:Uses the HTML5 history API for standard web apps.
    2.  `<HashRouter>`:Uses hash-based routing for static servers.
    3.  `<MemoryRouter>`:Uses in-memory routing for testing and non-browser environments.
    4.  `<StaticRouter>`:Provides static routing for server-side rendering (SSR).

    The above components will create _browser_, _hash_, _memory_ and _static_ history instances. React Router v6 makes the properties and methods of the `history` instance associated with your router available through the context in the `router` object.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'React Router v6 provides below 4 `<Router>` components:

    1.  `<BrowserRouter>`:Uses the HTML5 history API for standard web apps.
    2.  `<HashRouter>`:Uses hash-based routing for static servers.
    3.  `<MemoryRouter>`:Uses in-memory routing for testing and non-browser environments.
    4.  `<StaticRouter>`:Provides static routing for server-side rendering (SSR).

    The above components will create _browser_, _hash_, _memory_ and _static_ history instances. React Router v6 makes the properties and methods of the `history` instance associated with your router available through the context in the `router` object.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'routing', 'intermediate'],
    '{"source":"reference.md","section":"React Router","originalNum":81}'::jsonb,
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
    'What is the purpose of `push()` and `replace()` methods of `history`?',
    'A history instance has two methods for navigation purpose.

    1.  `push()`
    2.  `replace()`

    If you think of the history as an array of visited locations, `push()` will add a new location to the array and `replace()` will replace the current location in the array with the new one.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'A history instance has two methods for navigation purpose.

    1.  `push()`
    2.  `replace()`

    If you think of the history as an array of visited locations, `push()` will add a new location to the array and `replace()` will replace the current location in the array with the new one.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'routing', 'intermediate'],
    '{"source":"reference.md","section":"React Router","originalNum":82}'::jsonb,
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
    'How do you programmatically navigate using React Router v4?',
    '<pre><code>        const Button = (props, context) =&gt; (
          &lt;button
            type=&quot;button&quot;
            onClick={() =&gt; {
              context.history.push(&quot;/new-location&quot;);
            }}
          &gt;
            {&quot;Click Me!&quot;}
          &lt;/button&gt;
        );

        Button.contextTypes = {
          history: React.PropTypes.shape({
            push: React.PropTypes.func.isRequired,
          }),
        };</code></pre>

There are three different ways to achieve programmatic routing/navigation within components.

    1.  **Using the `withRouter()` higher-order function:**

        The `withRouter()` higher-order function will inject the history object as a prop of the component. This object provides `push()` and `replace()` methods to avoid the usage of context.


    2.  **Using `<Route>` component and render props pattern:**

        The `<Route>` component passes the same props as `withRouter()`, so you will be able to access the history methods through the history prop.


    3.  **Using context:**

        This option is not recommended and treated as unstable API.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'There are three different ways to achieve programmatic routing/navigation within components.

    1.  **Using the `withRouter()` higher-order function:**

        The `withRouter()` higher-order function will inject the history object as a prop of the component. This object provides `push()` and `replace()` methods to avoid the usage of context.


    2.  **Using `<Route>` component and render props pattern:**

        The `<Route>` component passes the same props as `withRouter()`, so you will be able to access the history methods through the history prop.


    3.  **Using context:**

        This option is not recommended and treated as unstable API.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'routing', 'intermediate'],
    '{"source":"reference.md","section":"React Router","originalNum":83}'::jsonb,
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
    'How to get query parameters in React Router v4?',
    '<pre><code>    const params = new URLSearchParams(props.location.search);
    const foo = params.get(&quot;name&quot;);</code></pre>

The ability to parse query strings was taken out of React Router v4 because there have been user requests over the years to support different implementation. So the decision has been given to users to choose the implementation they like. The recommended approach is to use query strings library.


    You can also use `URLSearchParams` if you want something native:


    You should use a _polyfill_ for IE11.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The ability to parse query strings was taken out of React Router v4 because there have been user requests over the years to support different implementation. So the decision has been given to users to choose the implementation they like. The recommended approach is to use query strings library.


    You can also use `URLSearchParams` if you want something native:


    You should use a _polyfill_ for IE11.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'routing', 'intermediate'],
    '{"source":"reference.md","section":"React Router","originalNum":84}'::jsonb,
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
    'Why you get "Router may have only one child element" warning?',
    '<pre><code>    &lt;Router&gt;
      &lt;Switch&gt;
        &lt;Route {/* ... */} /&gt;
        &lt;Route {/* ... */} /&gt;
      &lt;/Switch&gt;
    &lt;/Router&gt;</code></pre>

You have to wrap your Route''s in a `<Switch>` block because `<Switch>` is unique in that it renders a route exclusively.

    At first you need to add `Switch` to your imports:


    Then define the routes within `<Switch>` block:',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'You have to wrap your Route''s in a `<Switch>` block because `<Switch>` is unique in that it renders a route exclusively.

    At first you need to add `Switch` to your imports:


    Then define the routes within `<Switch>` block:',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'routing', 'intermediate'],
    '{"source":"reference.md","section":"React Router","originalNum":85}'::jsonb,
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
    'How to pass params to `history.push` method in React Router v4?',
    '<pre><code>    this.props.history.push({
      pathname: &quot;/template&quot;,
      search: &quot;?name=sudheer&quot;,
      state: { detail: response.data },
    });</code></pre>

While navigating you can pass props to the `history` object:


    The `search` property is used to pass query params in `push()` method.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'While navigating you can pass props to the `history` object:


    The `search` property is used to pass query params in `push()` method.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'routing', 'intermediate'],
    '{"source":"reference.md","section":"React Router","originalNum":86}'::jsonb,
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
    'How to implement _default_ or _NotFound_ page?',
    '<pre><code>    &lt;Switch&gt;
      &lt;Route exact path=&quot;/&quot; component={Home} /&gt;
      &lt;Route path=&quot;/user&quot; component={User} /&gt;
      &lt;Route component={NotFound} /&gt;
    &lt;/Switch&gt;</code></pre>

A `<Switch>` renders the first child `<Route>` that matches. A `<Route>` with no path always matches. So you just need to simply drop path attribute as below',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'A `<Switch>` renders the first child `<Route>` that matches. A `<Route>` with no path always matches. So you just need to simply drop path attribute as below',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'routing', 'intermediate'],
    '{"source":"reference.md","section":"React Router","originalNum":87}'::jsonb,
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
    'How to get history on React Router v4?',
    '<pre><code>        // some-other-file.js
        import history from &quot;./history&quot;;

        history.push(&quot;/go-here&quot;);</code></pre>

Below are the list of steps to get history object on React Router v4,

    1.  Create a module that exports a `history` object and import this module across the project.

        For example, create `history.js` file:


    2.  You should use the `<Router>` component instead of built-in routers. Import the above `history.js` inside `index.js` file:


    3.  You can also use push method of `history` object similar to built-in history object:',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Below are the list of steps to get history object on React Router v4,

    1.  Create a module that exports a `history` object and import this module across the project.

        For example, create `history.js` file:


    2.  You should use the `<Router>` component instead of built-in routers. Import the above `history.js` inside `index.js` file:


    3.  You can also use push method of `history` object similar to built-in history object:',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'routing', 'intermediate'],
    '{"source":"reference.md","section":"React Router","originalNum":88}'::jsonb,
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
    'How to perform automatic redirect after login?',
    '<pre><code>    import React, { Component } from &quot;react&quot;;
    import { Redirect } from &quot;react-router&quot;;

    export default class LoginComponent extends Component {
      render() {
        if (this.state.isLoggedIn === true) {
          return &lt;Redirect to=&quot;/your/redirect/page&quot; /&gt;;
        } else {
          return &lt;div&gt;{&quot;Login Please&quot;}&lt;/div&gt;;
        }
      }
    }</code></pre>

The `react-router` package provides `<Redirect>` component in React Router. Rendering a `<Redirect>` will navigate to a new location. Like server-side redirects, the new location will override the current location in the history stack.


      <p>


       </p>',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The `react-router` package provides `<Redirect>` component in React Router. Rendering a `<Redirect>` will navigate to a new location. Like server-side redirects, the new location will override the current location in the history stack.


      <p>


       </p>',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'routing', 'intermediate'],
    '{"source":"reference.md","section":"React Router","originalNum":89}'::jsonb,
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
    'What is React Intl?',
    'The _React Intl_ library makes internationalization in React straightforward, with off-the-shelf components and an API that can handle everything from formatting strings, dates, and numbers, to pluralization. React Intl is part of _FormatJS_ which provides bindings to React via its components and API.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The _React Intl_ library makes internationalization in React straightforward, with off-the-shelf components and an API that can handle everything from formatting strings, dates, and numbers, to pluralization. React Intl is part of _FormatJS_ which provides bindings to React via its components and API.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'i18n', 'intermediate'],
    '{"source":"reference.md","section":"React Internationalization","originalNum":90}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.522Z',
    '2025-11-18T20:44:53.522Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  );

-- Batch 10: Questions 91-100 (10 questions)
INSERT INTO questions (
  id, title, content, type, difficulty, points, options, correct_answer, 
  explanation, test_cases, hints, tags, metadata, stats, category_id, 
  learning_card_id, is_active, created_at, updated_at, topic_id, time_limit
) VALUES (
    gen_random_uuid(),
    'What are the main features of React Intl?',
    'Below are the main features of React Intl,

    1.  Display numbers with separators.
    2.  Display dates and times correctly.
    3.  Display dates relative to "now".
    4.  Pluralize labels in strings.
    5.  Support for 150+ languages.
    6.  Runs in the browser and Node.
    7.  Built on standards.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Below are the main features of React Intl,

    1.  Display numbers with separators.
    2.  Display dates and times correctly.
    3.  Display dates relative to "now".
    4.  Pluralize labels in strings.
    5.  Support for 150+ languages.
    6.  Runs in the browser and Node.
    7.  Built on standards.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'i18n', 'intermediate'],
    '{"source":"reference.md","section":"React Internationalization","originalNum":91}'::jsonb,
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
    'What are the two ways of formatting in React Intl?',
    '<pre><code>        const messages = defineMessages({
          accountMessage: {
            id: &quot;account&quot;,
            defaultMessage: &quot;The amount is less than minimum balance.&quot;,
          },
        });

        formatMessage(messages.accountMessage);</code></pre>

The library provides two ways to format strings, numbers, and dates:

    1.  **Using react components:**


    2.  **Using an API:**',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The library provides two ways to format strings, numbers, and dates:

    1.  **Using react components:**


    2.  **Using an API:**',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'i18n', 'intermediate'],
    '{"source":"reference.md","section":"React Internationalization","originalNum":92}'::jsonb,
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
    'How to use `<FormattedMessage>` as placeholder using React Intl?',
    '<pre><code>    import React from &quot;react&quot;;
    import { injectIntl, intlShape } from &quot;react-intl&quot;;

    const MyComponent = ({ intl }) =&gt; {
      const placeholder = intl.formatMessage({ id: &quot;messageId&quot; });
      return &lt;input placeholder={placeholder} /&gt;;
    };

    MyComponent.propTypes = {
      intl: intlShape.isRequired,
    };

    export default injectIntl(MyComponent);</code></pre>

The `<Formatted... />` components from `react-intl` return elements, not plain text, so they can''t be used for placeholders, alt text, etc. In that case, you should use lower level API `formatMessage()`. You can inject the `intl` object into your component using `injectIntl()` higher-order component and then format the message using `formatMessage()` available on that object.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The `<Formatted... />` components from `react-intl` return elements, not plain text, so they can''t be used for placeholders, alt text, etc. In that case, you should use lower level API `formatMessage()`. You can inject the `intl` object into your component using `injectIntl()` higher-order component and then format the message using `formatMessage()` available on that object.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'i18n', 'intermediate'],
    '{"source":"reference.md","section":"React Internationalization","originalNum":93}'::jsonb,
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
    'How to access current locale with React Intl?',
    '<pre><code>    import { injectIntl, intlShape } from &quot;react-intl&quot;;

    const MyComponent = ({ intl }) =&gt; (
    );

    MyComponent.propTypes = {
      intl: intlShape.isRequired,
    };

    export default injectIntl(MyComponent);</code></pre>

You can get the current locale in any component of your application using `injectIntl()`:',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'You can get the current locale in any component of your application using `injectIntl()`:',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'i18n', 'intermediate'],
    '{"source":"reference.md","section":"React Internationalization","originalNum":94}'::jsonb,
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
    'How to format date using React Intl?',
    '<pre><code>     import { injectIntl, intlShape } from &quot;react-intl&quot;;

     const stringDate = this.props.intl.formatDate(date, {
       year: &quot;numeric&quot;,
       month: &quot;numeric&quot;,
       day: &quot;numeric&quot;,
     });

     const MyComponent = ({ intl }) =&gt; (
     );

     MyComponent.propTypes = {
       intl: intlShape.isRequired,
     };

     export default injectIntl(MyComponent);</code></pre>

The `injectIntl()` higher-order component will give you access to the `formatDate()` method via the props in your component. The method is used internally by instances of `FormattedDate` and it returns the string representation of the formatted date.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The `injectIntl()` higher-order component will give you access to the `formatDate()` method via the props in your component. The method is used internally by instances of `FormattedDate` and it returns the string representation of the formatted date.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'i18n', 'intermediate'],
    '{"source":"reference.md","section":"React Internationalization","originalNum":95}'::jsonb,
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
    'What is Shallow Renderer in React testing?',
    '<pre><code>    import ShallowRenderer from &quot;react-test-renderer/shallow&quot;;

    // in your test
    const renderer = new ShallowRenderer();
    renderer.render(&lt;MyComponent /&gt;);

    const result = renderer.getRenderOutput();

    expect(result.type).toBe(&quot;div&quot;);
    expect(result.props.children).toEqual([
      &lt;span className={&quot;heading&quot;}&gt;{&quot;Title&quot;}&lt;/span&gt;,
      &lt;span className={&quot;description&quot;}&gt;{&quot;Description&quot;}&lt;/span&gt;,
    ]);</code></pre>

_Shallow rendering_ is useful for writing unit test cases in React. It lets you render a component _one level deep_ and assert facts about what its render method returns, without worrying about the behavior of child components, which are not instantiated or rendered.

    For example, if you have the following component:


    Then you can assert as follows:',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    '_Shallow rendering_ is useful for writing unit test cases in React. It lets you render a component _one level deep_ and assert facts about what its render method returns, without worrying about the behavior of child components, which are not instantiated or rendered.

    For example, if you have the following component:


    Then you can assert as follows:',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'testing', 'intermediate'],
    '{"source":"reference.md","section":"React Testing","originalNum":96}'::jsonb,
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
    'What is `TestRenderer` package in React?',
    '<pre><code>    import TestRenderer from &quot;react-test-renderer&quot;;

    const Link = ({ page, children }) =&gt; &lt;a href={page}&gt;{children}&lt;/a&gt;;

    const testRenderer = TestRenderer.create(
      &lt;Link page={&quot;https://www.facebook.com/&quot;}&gt;{&quot;Facebook&quot;}&lt;/Link&gt;
    );

    console.log(testRenderer.toJSON());
    // {
    //   type: &#039;a&#039;,
    //   props: { href: &#039;https://www.facebook.com/&#039; },
    //   children: [ &#039;Facebook&#039; ]
    // }</code></pre>

This package provides a renderer that can be used to render components to pure JavaScript objects, without depending on the DOM or a native mobile environment. This package makes it easy to grab a snapshot of the platform view hierarchy (similar to a DOM tree) rendered by a ReactDOM or React Native without using a browser or `jsdom`.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'This package provides a renderer that can be used to render components to pure JavaScript objects, without depending on the DOM or a native mobile environment. This package makes it easy to grab a snapshot of the platform view hierarchy (similar to a DOM tree) rendered by a ReactDOM or React Native without using a browser or `jsdom`.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'testing', 'intermediate'],
    '{"source":"reference.md","section":"React Testing","originalNum":97}'::jsonb,
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
    'What is the purpose of ReactTestUtils package?',
    '_ReactTestUtils_ are provided in the `with-addons` package and allow you to perform actions against a simulated DOM for the purpose of unit testing.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    '_ReactTestUtils_ are provided in the `with-addons` package and allow you to perform actions against a simulated DOM for the purpose of unit testing.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'testing', 'intermediate'],
    '{"source":"reference.md","section":"React Testing","originalNum":98}'::jsonb,
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
    'What is Jest?',
    '_Jest_ is a JavaScript unit testing framework created by Facebook based on Jasmine and provides automated mock creation and a `jsdom` environment. It''s often used for testing components.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    '_Jest_ is a JavaScript unit testing framework created by Facebook based on Jasmine and provides automated mock creation and a `jsdom` environment. It''s often used for testing components.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'testing', 'intermediate'],
    '{"source":"reference.md","section":"React Testing","originalNum":99}'::jsonb,
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
    'What are the advantages of Jest over Jasmine?',
    'There are couple of advantages compared to Jasmine:

     - Automatically finds tests to execute in your source code.
     - Automatically mocks dependencies when running your tests.
     - Allows you to test asynchronous code synchronously.
     - Runs your tests with a fake DOM implementation (via `jsdom`) so that your tests can be run on the command line.
     - Runs tests in parallel processes so that they finish sooner.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'There are couple of advantages compared to Jasmine:

     - Automatically finds tests to execute in your source code.
     - Automatically mocks dependencies when running your tests.
     - Allows you to test asynchronous code synchronously.
     - Runs your tests with a fake DOM implementation (via `jsdom`) so that your tests can be run on the command line.
     - Runs tests in parallel processes so that they finish sooner.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'testing', 'intermediate'],
    '{"source":"reference.md","section":"React Testing","originalNum":100}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.522Z',
    '2025-11-18T20:44:53.522Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  );

-- Batch 11: Questions 101-110 (10 questions)
INSERT INTO questions (
  id, title, content, type, difficulty, points, options, correct_answer, 
  explanation, test_cases, hints, tags, metadata, stats, category_id, 
  learning_card_id, is_active, created_at, updated_at, topic_id, time_limit
) VALUES (
    gen_random_uuid(),
    'Give a simple example of Jest test case',
    '<pre><code>     $ yarn test
     PASS ./sum.test.js
     ✓ adds 1 + 2 to equal 3 (2ms)</code></pre>

Let''s write a test for a function that adds two numbers in `sum.js` file:


     Create a file named `sum.test.js` which contains actual test:


     And then add the following section to your `package.json`:


     Finally, run `yarn test` or `npm test` and Jest will print a result:',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Let''s write a test for a function that adds two numbers in `sum.js` file:


     Create a file named `sum.test.js` which contains actual test:


     And then add the following section to your `package.json`:


     Finally, run `yarn test` or `npm test` and Jest will print a result:',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'testing', 'intermediate'],
    '{"source":"reference.md","section":"React Testing","originalNum":101}'::jsonb,
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
    'What is flux?',
    '**Flux** is an **application architecture** (not a framework or library) designed by Facebook to manage **data flow** in React applications. It was created as an alternative to the traditional **MVC (Model-View-Controller)** pattern, and it emphasizes a **unidirectional data flow** to make state changes more predictable and easier to debug.

       Flux complements React by organizing the way data moves through your application, especially in large-scale or complex projects.

       #### Core Concepts of Flux

       Flux operates using **four key components**, each with a specific responsibility:
       *   **Actions**
             *   Plain JavaScript objects or functions that describe _what happened_ (e.g., user interactions or API responses).
             *   Example: `{ type: ''ADD_TODO'', payload: ''Buy milk'' }`
       *   **Dispatcher**
             *   A central hub that receives actions and **dispatches** them to the appropriate stores.
             *   There is **only one dispatcher** in a Flux application.
       *   **Stores**
             *   Hold the **application state** and business logic.
             *   Respond to actions from the dispatcher and update themselves accordingly.
             *   They **emit change events** that views can listen to.
       *   **Views (React Components)**
             *   Subscribe to stores and **re-render** when the data changes.
             *   They can also trigger new actions (e.g., on user input).


       The workflow between dispatcher, stores and views components with distinct inputs and outputs as follows:

       ![flux](images/flux.png)',
    'open-ended',
    'advanced',
    10,
    NULL,
    NULL,
    '**Flux** is an **application architecture** (not a framework or library) designed by Facebook to manage **data flow** in React applications. It was created as an alternative to the traditional **MVC (Model-View-Controller)** pattern, and it emphasizes a **unidirectional data flow** to make state changes more predictable and easier to debug.

       Flux complements React by organizing the way data moves through your application, especially in large-scale or complex projects.

       #### Core Concepts of Flux

       Flux operates using **four key components**, each with a specific responsibility:
       *   **Actions**
             *   Plain JavaScript objects or functions that describe _what happened_ (e.g., user interactions or API responses).
             *   Example: `{ type: ''ADD_TODO'', payload: ''Buy milk'' }`
       *   **Dispatcher**
             *   A central hub that receives actions and **dispatches** them to the appropriate stores.
             *   There is **only one dispatcher** in a Flux application.
       *   **Stores**
             *   Hold the **application state** and business logic.
             *   Respond to actions from the dispatcher and update themselves accordingly.
             *   They **emit change events** that views can listen to.
       *   **Views (React Components)**
             *   Subscribe to stores and **re-render** when the data changes.
             *   They can also trigger new actions (e.g., on user input).


       The workflow between dispatcher, stores and views components with distinct inputs and outputs as follows:

       ![flux](images/flux.png)',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'state-management', 'advanced'],
    '{"source":"reference.md","section":"React Redux","originalNum":102}'::jsonb,
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
    'What is Redux?',
    'Redux is a predictable state container for JavaScript applications, most commonly used with React. It helps you manage and centralize your application’s state in a single source of truth, enabling easier debugging, testing, and maintenance—especially in large or complex applications. Redux core is tiny library(about 2.5kB gzipped) and has no dependencies.',
    'open-ended',
    'advanced',
    10,
    NULL,
    NULL,
    'Redux is a predictable state container for JavaScript applications, most commonly used with React. It helps you manage and centralize your application’s state in a single source of truth, enabling easier debugging, testing, and maintenance—especially in large or complex applications. Redux core is tiny library(about 2.5kB gzipped) and has no dependencies.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'state-management', 'advanced'],
    '{"source":"reference.md","section":"React Redux","originalNum":103}'::jsonb,
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
    'What are the core principles of Redux?',
    '<pre><code>      function counter(state = 0, action) {
        switch (action.type) {
          case &#039;INCREMENT&#039;:
            return state + 1;
          case &#039;DECREMENT&#039;:
            return state - 1;
          default:
            return state;
        }
      }</code></pre>

Redux follows three fundamental principles:

     1. **Single source of truth:** The state of your whole application is stored in an object tree within a single store. The single state tree makes it easier to keep track of changes over time and debug or inspect the application.
   
     2. **State is read-only:** The only way to change the state is to emit an action, an object describing what happened. This ensures that neither the views nor the network callbacks will ever write directly to the state.
     3. **Changes are made with pure functions(Reducers):** To specify how the state tree is transformed by actions, you write reducers. Reducers are just pure functions that take the previous state and an action as parameters, and return the next state.',
    'open-ended',
    'advanced',
    10,
    NULL,
    NULL,
    'Redux follows three fundamental principles:

     1. **Single source of truth:** The state of your whole application is stored in an object tree within a single store. The single state tree makes it easier to keep track of changes over time and debug or inspect the application.
   
     2. **State is read-only:** The only way to change the state is to emit an action, an object describing what happened. This ensures that neither the views nor the network callbacks will ever write directly to the state.
     3. **Changes are made with pure functions(Reducers):** To specify how the state tree is transformed by actions, you write reducers. Reducers are just pure functions that take the previous state and an action as parameters, and return the next state.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'state-management', 'advanced'],
    '{"source":"reference.md","section":"React Redux","originalNum":104}'::jsonb,
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
    'What are the downsides of Redux compared to Flux?',
    'While Redux offers a powerful and predictable state management solution, it comes with a few trade-offs when compared to Flux. These include:

     1.  **Immutability is essential**  
        Redux enforces a strict immutability model for state updates, which differs from Flux’s more relaxed approach. This means you must avoid mutating state directly. Many Redux-related libraries assume immutability, so your team must be disciplined in writing pure update logic. You can use tools like `redux-immutable-state-invariant`, `Immer`, or `Immutable.js` to help enforce this practice, especially during development.
     2.  **Careful selection of complementary packages**  
        Redux is more minimal by design and provides extension points such as middleware and store enhancers. This has led to a large ecosystem, but it also means you must thoughtfully choose and configure additional packages for features like undo/redo, persistence, or form handling—something Flux explicitly leaves out but may be simpler to manage in smaller setups.
     3.  **Limited static type integration**  
        While Flux has mature support for static type checking with tools like Flow, Redux’s type integration is less seamless. Although TypeScript is commonly used with Redux now, early Flow support was limited, and more boilerplate was required for static type safety. This may affect teams that rely heavily on type systems for large codebases.',
    'open-ended',
    'advanced',
    10,
    NULL,
    NULL,
    'While Redux offers a powerful and predictable state management solution, it comes with a few trade-offs when compared to Flux. These include:

     1.  **Immutability is essential**  
        Redux enforces a strict immutability model for state updates, which differs from Flux’s more relaxed approach. This means you must avoid mutating state directly. Many Redux-related libraries assume immutability, so your team must be disciplined in writing pure update logic. You can use tools like `redux-immutable-state-invariant`, `Immer`, or `Immutable.js` to help enforce this practice, especially during development.
     2.  **Careful selection of complementary packages**  
        Redux is more minimal by design and provides extension points such as middleware and store enhancers. This has led to a large ecosystem, but it also means you must thoughtfully choose and configure additional packages for features like undo/redo, persistence, or form handling—something Flux explicitly leaves out but may be simpler to manage in smaller setups.
     3.  **Limited static type integration**  
        While Flux has mature support for static type checking with tools like Flow, Redux’s type integration is less seamless. Although TypeScript is commonly used with Redux now, early Flow support was limited, and more boilerplate was required for static type safety. This may affect teams that rely heavily on type systems for large codebases.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'state-management', 'advanced'],
    '{"source":"reference.md","section":"React Redux","originalNum":105}'::jsonb,
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
    'What is the difference between `mapStateToProps()` and `mapDispatchToProps()`?',
    '<pre><code>     const mapDispatchToProps = {
       onTodoClick,
     };</code></pre>

`mapStateToProps()` is a utility which helps your component get updated state (which is updated by some other components):


     `mapDispatchToProps()` is a utility which will help your component to fire an action event (dispatching action which may cause change of application state):


     It is recommended to always use the “object shorthand” form for the `mapDispatchToProps`.

     Redux wraps it in another function that looks like (…args) => dispatch(onTodoClick(…args)), and pass that wrapper function as a prop to your component.',
    'open-ended',
    'advanced',
    10,
    NULL,
    NULL,
    '`mapStateToProps()` is a utility which helps your component get updated state (which is updated by some other components):


     `mapDispatchToProps()` is a utility which will help your component to fire an action event (dispatching action which may cause change of application state):


     It is recommended to always use the “object shorthand” form for the `mapDispatchToProps`.

     Redux wraps it in another function that looks like (…args) => dispatch(onTodoClick(…args)), and pass that wrapper function as a prop to your component.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'state-management', 'advanced'],
    '{"source":"reference.md","section":"React Redux","originalNum":106}'::jsonb,
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
    'Can I dispatch an action in reducer?',
    'Dispatching an action within a reducer is an **anti-pattern**. Your reducer should be _without side effects_, simply digesting the action payload and returning a new state object. Adding listeners and dispatching actions within the reducer can lead to chained actions and other side effects.',
    'open-ended',
    'advanced',
    10,
    NULL,
    NULL,
    'Dispatching an action within a reducer is an **anti-pattern**. Your reducer should be _without side effects_, simply digesting the action payload and returning a new state object. Adding listeners and dispatching actions within the reducer can lead to chained actions and other side effects.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'state-management', 'advanced'],
    '{"source":"reference.md","section":"React Redux","originalNum":107}'::jsonb,
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
    'How to access Redux store outside a component?',
    '<pre><code>     store = createStore(myReducer);

     export default store;</code></pre>

You just need to export the store from the module where it created with `createStore()`. Also, it shouldn''t pollute the global window object.',
    'open-ended',
    'advanced',
    10,
    NULL,
    NULL,
    'You just need to export the store from the module where it created with `createStore()`. Also, it shouldn''t pollute the global window object.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'state-management', 'advanced'],
    '{"source":"reference.md","section":"React Redux","originalNum":108}'::jsonb,
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
    'What are the drawbacks of MVW pattern?',
    '1. DOM manipulation is very expensive which causes applications to behave slow and inefficient.
     2. Due to circular dependencies, a complicated model was created around models and views.
     3. Lot of data changes happens for collaborative applications(like Google Docs).
     4. No way to do undo (travel back in time) easily without adding so much extra code.',
    'open-ended',
    'advanced',
    10,
    NULL,
    NULL,
    '1. DOM manipulation is very expensive which causes applications to behave slow and inefficient.
     2. Due to circular dependencies, a complicated model was created around models and views.
     3. Lot of data changes happens for collaborative applications(like Google Docs).
     4. No way to do undo (travel back in time) easily without adding so much extra code.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'state-management', 'advanced'],
    '{"source":"reference.md","section":"React Redux","originalNum":109}'::jsonb,
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
    'Are there any similarities between Redux and RxJS?',
    'These libraries are very different for very different purposes, but there are some vague similarities.

     Redux is a tool for managing state throughout the application. It is usually used as an architecture for UIs. Think of it as an alternative to (half of) Angular. RxJS is a reactive programming library. It is usually used as a tool to accomplish asynchronous tasks in JavaScript. Think of it as an alternative to Promises. Redux uses the Reactive paradigm because the Store is reactive. The Store observes actions from a distance, and changes itself. RxJS also uses the Reactive paradigm, but instead of being an architecture, it gives you basic building blocks, Observables, to accomplish this pattern.',
    'open-ended',
    'advanced',
    10,
    NULL,
    NULL,
    'These libraries are very different for very different purposes, but there are some vague similarities.

     Redux is a tool for managing state throughout the application. It is usually used as an architecture for UIs. Think of it as an alternative to (half of) Angular. RxJS is a reactive programming library. It is usually used as a tool to accomplish asynchronous tasks in JavaScript. Think of it as an alternative to Promises. Redux uses the Reactive paradigm because the Store is reactive. The Store observes actions from a distance, and changes itself. RxJS also uses the Reactive paradigm, but instead of being an architecture, it gives you basic building blocks, Observables, to accomplish this pattern.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'state-management', 'advanced'],
    '{"source":"reference.md","section":"React Redux","originalNum":110}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.522Z',
    '2025-11-18T20:44:53.522Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  );

-- Batch 12: Questions 111-120 (10 questions)
INSERT INTO questions (
  id, title, content, type, difficulty, points, options, correct_answer, 
  explanation, test_cases, hints, tags, metadata, stats, category_id, 
  learning_card_id, is_active, created_at, updated_at, topic_id, time_limit
) VALUES (
    gen_random_uuid(),
    'How to reset state in Redux?',
    '<pre><code>     const appReducer = combineReducers({
       /* your app&#039;s top-level reducers */
     });

     const rootReducer = (state, action) =&gt; {
       if (action.type === &quot;USER_LOGOUT&quot;) {
         Object.keys(state).forEach((key) =&gt; {
           storage.removeItem(`persist:${key}`);
         });

         state = undefined;
       }

       return appReducer(state, action);
     };</code></pre>

You need to write a _root reducer_ in your application which delegate handling the action to the reducer generated by `combineReducers()`.

     For example, let us take `rootReducer()` to return the initial state after `USER_LOGOUT` action. As we know, reducers are supposed to return the initial state when they are called with `undefined` as the first argument, no matter the action.


     In case of using `redux-persist`, you may also need to clean your storage. `redux-persist` keeps a copy of your state in a storage engine. First, you need to import the appropriate storage engine and then, to parse the state before setting it to undefined and clean each storage state key.',
    'open-ended',
    'advanced',
    10,
    NULL,
    NULL,
    'You need to write a _root reducer_ in your application which delegate handling the action to the reducer generated by `combineReducers()`.

     For example, let us take `rootReducer()` to return the initial state after `USER_LOGOUT` action. As we know, reducers are supposed to return the initial state when they are called with `undefined` as the first argument, no matter the action.


     In case of using `redux-persist`, you may also need to clean your storage. `redux-persist` keeps a copy of your state in a storage engine. First, you need to import the appropriate storage engine and then, to parse the state before setting it to undefined and clean each storage state key.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'state-management', 'advanced'],
    '{"source":"reference.md","section":"React Redux","originalNum":111}'::jsonb,
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
    'What is the difference between React context and React Redux?',
    'You can use **Context** in your application directly and is going to be great for passing down data to deeply nested components which what it was designed for.

     Whereas **Redux** is much more powerful and provides a large number of features that the Context API doesn''t provide. Also, React Redux uses context internally but it doesn''t expose this fact in the public API.',
    'open-ended',
    'advanced',
    10,
    NULL,
    NULL,
    'You can use **Context** in your application directly and is going to be great for passing down data to deeply nested components which what it was designed for.

     Whereas **Redux** is much more powerful and provides a large number of features that the Context API doesn''t provide. Also, React Redux uses context internally but it doesn''t expose this fact in the public API.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'state-management', 'advanced'],
    '{"source":"reference.md","section":"React Redux","originalNum":112}'::jsonb,
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
    'Why are Redux state functions called reducers?',
    'Reducers always return the accumulation of the state (based on all previous and current actions). Therefore, they act as a reducer of state. Each time a Redux reducer is called, the state and action are passed as parameters. This state is then reduced (or accumulated) based on the action, and then the next state is returned. You could _reduce_ a collection of actions and an initial state (of the store) on which to perform these actions to get the resulting final state.',
    'open-ended',
    'advanced',
    10,
    NULL,
    NULL,
    'Reducers always return the accumulation of the state (based on all previous and current actions). Therefore, they act as a reducer of state. Each time a Redux reducer is called, the state and action are passed as parameters. This state is then reduced (or accumulated) based on the action, and then the next state is returned. You could _reduce_ a collection of actions and an initial state (of the store) on which to perform these actions to get the resulting final state.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'state-management', 'advanced'],
    '{"source":"reference.md","section":"React Redux","originalNum":113}'::jsonb,
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
    'How to make AJAX request in Redux?',
    '<pre><code>     export function fetchAccount(id) {
       return (dispatch) =&gt; {
         dispatch(setLoadingAccountState()); // Show a loading spinner
         fetch(`/account/${id}`, (response) =&gt; {
           dispatch(doneFetchingAccount()); // Hide loading spinner
           if (response.status === 200) {
             dispatch(setAccount(response.json)); // Use a normal function to set the received state
           } else {
             dispatch(someError);
           }
         });
       };
     }

     function setAccount(data) {
       return { type: &quot;SET_Account&quot;, data: data };
     }</code></pre>

You can use `redux-thunk` middleware which allows you to define async actions.

     Let''s take an example of fetching specific account as an AJAX call using _fetch API_:',
    'open-ended',
    'advanced',
    10,
    NULL,
    NULL,
    'You can use `redux-thunk` middleware which allows you to define async actions.

     Let''s take an example of fetching specific account as an AJAX call using _fetch API_:',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'state-management', 'advanced'],
    '{"source":"reference.md","section":"React Redux","originalNum":114}'::jsonb,
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
    'Should I keep all component''s state in Redux store?',
    'Keep your data in the Redux store, and the UI related state internally in the component.',
    'open-ended',
    'advanced',
    10,
    NULL,
    NULL,
    'Keep your data in the Redux store, and the UI related state internally in the component.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'state-management', 'advanced'],
    '{"source":"reference.md","section":"React Redux","originalNum":115}'::jsonb,
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
    'What is the proper way to access Redux store?',
    '<pre><code>     function MyComponent {
       someMethod() {
         doSomethingWith(this.context.store);
       }
     }</code></pre>

The best way to access your store in a component is to use the `connect()` function, that creates a new component that wraps around your existing one. This pattern is called _Higher-Order Components_, and is generally the preferred way of extending a component''s functionality in React. This allows you to map state and action creators to your component, and have them passed in automatically as your store updates.

     Let''s take an example of `<FilterLink>` component using connect:


     Due to it having quite a few performance optimizations and generally being less likely to cause bugs, the Redux developers almost always recommend using `connect()` over accessing the store directly (using context API).',
    'open-ended',
    'advanced',
    10,
    NULL,
    NULL,
    'The best way to access your store in a component is to use the `connect()` function, that creates a new component that wraps around your existing one. This pattern is called _Higher-Order Components_, and is generally the preferred way of extending a component''s functionality in React. This allows you to map state and action creators to your component, and have them passed in automatically as your store updates.

     Let''s take an example of `<FilterLink>` component using connect:


     Due to it having quite a few performance optimizations and generally being less likely to cause bugs, the Redux developers almost always recommend using `connect()` over accessing the store directly (using context API).',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'state-management', 'advanced'],
    '{"source":"reference.md","section":"React Redux","originalNum":116}'::jsonb,
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
    'What is the difference between component and container in React Redux?',
    '**Component** is a class or function component that describes the presentational part of your application.

     **Container** is an informal term for a component that is connected to a Redux store. Containers _subscribe_ to Redux state updates and _dispatch_ actions, and they usually don''t render DOM elements; they delegate rendering to presentational child components.',
    'open-ended',
    'advanced',
    10,
    NULL,
    NULL,
    '**Component** is a class or function component that describes the presentational part of your application.

     **Container** is an informal term for a component that is connected to a Redux store. Containers _subscribe_ to Redux state updates and _dispatch_ actions, and they usually don''t render DOM elements; they delegate rendering to presentational child components.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'state-management', 'advanced'],
    '{"source":"reference.md","section":"React Redux","originalNum":117}'::jsonb,
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
    'What is the purpose of the constants in Redux?',
    '<pre><code>        import { ADD_TODO } from &quot;./actionTypes&quot;;

        export default (state = [], action) =&gt; {
          switch (action.type) {
            case ADD_TODO:
              return [
                ...state,
                {
                  text: action.text,
                  completed: false,
                },
              ];
            default:
              return state;
          }
        };</code></pre>

Constants allows you to easily find all usages of that specific functionality across the project when you use an IDE. It also prevents you from introducing silly bugs caused by typos – in which case, you will get a `ReferenceError` immediately.

     Normally we will save them in a single file (`constants.js` or `actionTypes.js`).


     In Redux, you use them in two places:

     1. **During action creation:**

        Let''s take `actions.js`:


     2. **In reducers:**

        Let''s create `reducer.js`:',
    'open-ended',
    'advanced',
    10,
    NULL,
    NULL,
    'Constants allows you to easily find all usages of that specific functionality across the project when you use an IDE. It also prevents you from introducing silly bugs caused by typos – in which case, you will get a `ReferenceError` immediately.

     Normally we will save them in a single file (`constants.js` or `actionTypes.js`).


     In Redux, you use them in two places:

     1. **During action creation:**

        Let''s take `actions.js`:


     2. **In reducers:**

        Let''s create `reducer.js`:',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'state-management', 'advanced'],
    '{"source":"reference.md","section":"React Redux","originalNum":118}'::jsonb,
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
    'What are the different ways to write `mapDispatchToProps()`?',
    '<pre><code>     const mapDispatchToProps = { action };</code></pre>

There are a few ways of binding _action creators_ to `dispatch()` in `mapDispatchToProps()`.

     Below are the possible options:




     The third option is just a shorthand for the first one.',
    'open-ended',
    'advanced',
    10,
    NULL,
    NULL,
    'There are a few ways of binding _action creators_ to `dispatch()` in `mapDispatchToProps()`.

     Below are the possible options:




     The third option is just a shorthand for the first one.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'state-management', 'advanced'],
    '{"source":"reference.md","section":"React Redux","originalNum":119}'::jsonb,
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
    'What is the use of the `ownProps` parameter in `mapStateToProps()` and `mapDispatchToProps()`?',
    '<pre><code>     {
       user: &quot;john&quot;;
     }</code></pre>

If the `ownProps` parameter is specified, React Redux will pass the props that were passed to the component into your _connect_ functions. So, if you use a connected component:


     The `ownProps` inside your `mapStateToProps()` and `mapDispatchToProps()` functions will be an object:


     You can use this object to decide what to return from those functions.',
    'open-ended',
    'advanced',
    10,
    NULL,
    NULL,
    'If the `ownProps` parameter is specified, React Redux will pass the props that were passed to the component into your _connect_ functions. So, if you use a connected component:


     The `ownProps` inside your `mapStateToProps()` and `mapDispatchToProps()` functions will be an object:


     You can use this object to decide what to return from those functions.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'state-management', 'advanced'],
    '{"source":"reference.md","section":"React Redux","originalNum":120}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.522Z',
    '2025-11-18T20:44:53.522Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  );

-- Batch 13: Questions 121-130 (10 questions)
INSERT INTO questions (
  id, title, content, type, difficulty, points, options, correct_answer, 
  explanation, test_cases, hints, tags, metadata, stats, category_id, 
  learning_card_id, is_active, created_at, updated_at, topic_id, time_limit
) VALUES (
    gen_random_uuid(),
    'How to structure Redux top level directories?',
    'Most of the applications has several top-level directories as below:

     1. **Components**: Used for _dumb_ components unaware of Redux.
     2. **Containers**: Used for _smart_ components connected to Redux.
     3. **Actions**: Used for all action creators, where file names correspond to part of the app.
     4. **Reducers**: Used for all reducers, where files name correspond to state key.
     5. **Store**: Used for store initialization.

     This structure works well for small and medium size apps.',
    'open-ended',
    'advanced',
    10,
    NULL,
    NULL,
    'Most of the applications has several top-level directories as below:

     1. **Components**: Used for _dumb_ components unaware of Redux.
     2. **Containers**: Used for _smart_ components connected to Redux.
     3. **Actions**: Used for all action creators, where file names correspond to part of the app.
     4. **Reducers**: Used for all reducers, where files name correspond to state key.
     5. **Store**: Used for store initialization.

     This structure works well for small and medium size apps.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'state-management', 'advanced'],
    '{"source":"reference.md","section":"React Redux","originalNum":121}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is redux-saga?',
    '<pre><code>     $ npm install --save redux-saga</code></pre>

`redux-saga` is a library that aims to make side effects (asynchronous things like data fetching and impure things like accessing the browser cache) in React/Redux applications easier and better.

     It is available in NPM:',
    'open-ended',
    'advanced',
    10,
    NULL,
    NULL,
    '`redux-saga` is a library that aims to make side effects (asynchronous things like data fetching and impure things like accessing the browser cache) in React/Redux applications easier and better.

     It is available in NPM:',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'state-management', 'advanced'],
    '{"source":"reference.md","section":"React Redux","originalNum":122}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is the mental model of redux-saga?',
    '_Saga_ is like a separate thread in your application, that''s solely responsible for side effects. `redux-saga` is a redux _middleware_, which means this thread can be started, paused and cancelled from the main application with normal Redux actions, it has access to the full Redux application state and it can dispatch Redux actions as well.',
    'open-ended',
    'advanced',
    10,
    NULL,
    NULL,
    '_Saga_ is like a separate thread in your application, that''s solely responsible for side effects. `redux-saga` is a redux _middleware_, which means this thread can be started, paused and cancelled from the main application with normal Redux actions, it has access to the full Redux application state and it can dispatch Redux actions as well.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'state-management', 'advanced'],
    '{"source":"reference.md","section":"React Redux","originalNum":123}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What are the differences between `call()` and `put()` in redux-saga?',
    '<pre><code>     function* fetchUserSaga(action) {
       // `call` function accepts rest arguments, which will be passed to `api.fetchUser` function.
       // Instructing middleware to call promise, it resolved value will be assigned to `userData` variable
       const userData = yield call(api.fetchUser, action.userId);

       // Instructing middleware to dispatch corresponding action.
       yield put({
         type: &quot;FETCH_USER_SUCCESS&quot;,
         userData,
       });
     }</code></pre>

Both `call()` and `put()` are effect creator functions. `call()` function is used to create effect description, which instructs middleware to call the promise. `put()` function creates an effect, which instructs middleware to dispatch an action to the store.

     Let''s take example of how these effects work for fetching particular user data.',
    'open-ended',
    'advanced',
    10,
    NULL,
    NULL,
    'Both `call()` and `put()` are effect creator functions. `call()` function is used to create effect description, which instructs middleware to call the promise. `put()` function creates an effect, which instructs middleware to dispatch an action to the store.

     Let''s take example of how these effects work for fetching particular user data.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'state-management', 'advanced'],
    '{"source":"reference.md","section":"React Redux","originalNum":124}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is Redux Thunk?',
    '_Redux Thunk_ middleware allows you to write action creators that return a function instead of an action. The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met. The inner function receives the store methods `dispatch()` and `getState()` as parameters.',
    'open-ended',
    'advanced',
    10,
    NULL,
    NULL,
    '_Redux Thunk_ middleware allows you to write action creators that return a function instead of an action. The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met. The inner function receives the store methods `dispatch()` and `getState()` as parameters.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'state-management', 'advanced'],
    '{"source":"reference.md","section":"React Redux","originalNum":125}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What are the differences between `redux-saga` and `redux-thunk`?',
    'Both _Redux Thunk_ and _Redux Saga_ take care of dealing with side effects. In most of the scenarios, Thunk uses _Promises_ to deal with them, whereas Saga uses _Generators_. Thunk is simple to use and Promises are familiar to many developers, Sagas/Generators are more powerful but you will need to learn them. But both middleware can coexist, so you can start with Thunks and introduce Sagas when/if you need them.',
    'open-ended',
    'advanced',
    10,
    NULL,
    NULL,
    'Both _Redux Thunk_ and _Redux Saga_ take care of dealing with side effects. In most of the scenarios, Thunk uses _Promises_ to deal with them, whereas Saga uses _Generators_. Thunk is simple to use and Promises are familiar to many developers, Sagas/Generators are more powerful but you will need to learn them. But both middleware can coexist, so you can start with Thunks and introduce Sagas when/if you need them.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'state-management', 'advanced'],
    '{"source":"reference.md","section":"React Redux","originalNum":126}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is Redux DevTools?',
    '_Redux DevTools_ is a live-editing time travel environment for Redux with hot reloading, action replay, and customizable UI. If you don''t want to bother with installing Redux DevTools and integrating it into your project, consider using Redux DevTools Extension for Chrome and Firefox.',
    'open-ended',
    'advanced',
    10,
    NULL,
    NULL,
    '_Redux DevTools_ is a live-editing time travel environment for Redux with hot reloading, action replay, and customizable UI. If you don''t want to bother with installing Redux DevTools and integrating it into your project, consider using Redux DevTools Extension for Chrome and Firefox.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'state-management', 'advanced'],
    '{"source":"reference.md","section":"React Redux","originalNum":127}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What are the features of Redux DevTools?',
    'Some of the main features of Redux DevTools are below,

     1. Lets you inspect every state and action payload.
     2. Lets you go back in time by _cancelling_ actions.
     3. If you change the reducer code, each _staged_ action will be re-evaluated.
     4. If the reducers throw, you will see during which action this happened, and what the error was.
     5. With `persistState()` store enhancer, you can persist debug sessions across page reloads.',
    'open-ended',
    'advanced',
    10,
    NULL,
    NULL,
    'Some of the main features of Redux DevTools are below,

     1. Lets you inspect every state and action payload.
     2. Lets you go back in time by _cancelling_ actions.
     3. If you change the reducer code, each _staged_ action will be re-evaluated.
     4. If the reducers throw, you will see during which action this happened, and what the error was.
     5. With `persistState()` store enhancer, you can persist debug sessions across page reloads.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'state-management', 'advanced'],
    '{"source":"reference.md","section":"React Redux","originalNum":128}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What are Redux selectors and why use them?',
    '<pre><code>     const getUserData = (state) =&gt; state.user.data;</code></pre>

_Selectors_ are functions that take Redux state as an argument and return some data to pass to the component.

     For example, to get user details from the state:


     These selectors have two main benefits,

     1. The selector can compute derived data, allowing Redux to store the minimal possible state
     2. The selector is not recomputed unless one of its arguments changes',
    'open-ended',
    'advanced',
    10,
    NULL,
    NULL,
    '_Selectors_ are functions that take Redux state as an argument and return some data to pass to the component.

     For example, to get user details from the state:


     These selectors have two main benefits,

     1. The selector can compute derived data, allowing Redux to store the minimal possible state
     2. The selector is not recomputed unless one of its arguments changes',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'state-management', 'advanced'],
    '{"source":"reference.md","section":"React Redux","originalNum":129}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is Redux Form?',
    '_Redux Form_ works with React and Redux to enable a form in React to use Redux to store all of its state. Redux Form can be used with raw HTML5 inputs, but it also works very well with common UI frameworks like Material UI, React Widgets and React Bootstrap.',
    'open-ended',
    'advanced',
    10,
    NULL,
    NULL,
    '_Redux Form_ works with React and Redux to enable a form in React to use Redux to store all of its state. Redux Form can be used with raw HTML5 inputs, but it also works very well with common UI frameworks like Material UI, React Widgets and React Bootstrap.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'state-management', 'advanced'],
    '{"source":"reference.md","section":"React Redux","originalNum":130}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  );

-- Batch 14: Questions 131-140 (10 questions)
INSERT INTO questions (
  id, title, content, type, difficulty, points, options, correct_answer, 
  explanation, test_cases, hints, tags, metadata, stats, category_id, 
  learning_card_id, is_active, created_at, updated_at, topic_id, time_limit
) VALUES (
    gen_random_uuid(),
    'What are the main features of Redux Form?',
    'Some of the main features of Redux Form are:

     1. Field values persistence via Redux store.
     2. Validation (sync/async) and submission.
     3. Formatting, parsing and normalization of field values.',
    'open-ended',
    'advanced',
    10,
    NULL,
    NULL,
    'Some of the main features of Redux Form are:

     1. Field values persistence via Redux store.
     2. Validation (sync/async) and submission.
     3. Formatting, parsing and normalization of field values.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'state-management', 'advanced'],
    '{"source":"reference.md","section":"React Redux","originalNum":131}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How to add multiple middlewares to Redux?',
    '<pre><code>     import { createStore, applyMiddleware } from &quot;redux&quot;;
     const createStoreWithMiddleware = applyMiddleware(
       ReduxThunk,
       logger
     )(createStore);</code></pre>

You can use `applyMiddleware()`.

     For example, you can add `redux-thunk` and `logger` passing them as arguments to `applyMiddleware()`:',
    'open-ended',
    'advanced',
    10,
    NULL,
    NULL,
    'You can use `applyMiddleware()`.

     For example, you can add `redux-thunk` and `logger` passing them as arguments to `applyMiddleware()`:',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'state-management', 'advanced'],
    '{"source":"reference.md","section":"React Redux","originalNum":132}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How to set initial state in Redux?',
    '<pre><code>     const rootReducer = combineReducers({
       todos: todos,
       visibilityFilter: visibilityFilter,
     });

     const initialState = {
       todos: [{ id: 123, name: &quot;example&quot;, completed: false }],
     };

     const store = createStore(rootReducer, initialState);</code></pre>

You need to pass initial state as second argument to createStore:',
    'open-ended',
    'advanced',
    10,
    NULL,
    NULL,
    'You need to pass initial state as second argument to createStore:',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'state-management', 'advanced'],
    '{"source":"reference.md","section":"React Redux","originalNum":133}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How Relay is different from Redux?',
    'Relay is similar to Redux in that they both use a single store. The main difference is that relay only manages state originated from the server, and all access to the state is used via _GraphQL_ queries (for reading data) and mutations (for changing data). Relay caches the data for you and optimizes data fetching for you, by fetching only changed data and nothing more.',
    'open-ended',
    'advanced',
    10,
    NULL,
    NULL,
    'Relay is similar to Redux in that they both use a single store. The main difference is that relay only manages state originated from the server, and all access to the state is used via _GraphQL_ queries (for reading data) and mutations (for changing data). Relay caches the data for you and optimizes data fetching for you, by fetching only changed data and nothing more.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'state-management', 'advanced'],
    '{"source":"reference.md","section":"React Redux","originalNum":134}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is an action in Redux?',
    '<pre><code>     {
       type: ADD_TODO,
       text: &#039;Add todo item&#039;
     }</code></pre>

_Actions_ are plain JavaScript objects or payloads of information that send data from your application to your store. They are the only source of information for the store. Actions must have a type property that indicates the type of action being performed.

     For example, let''s take an action which represents adding a new todo item:',
    'open-ended',
    'advanced',
    10,
    NULL,
    NULL,
    '_Actions_ are plain JavaScript objects or payloads of information that send data from your application to your store. They are the only source of information for the store. Actions must have a type property that indicates the type of action being performed.

     For example, let''s take an action which represents adding a new todo item:',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'state-management', 'advanced'],
    '{"source":"reference.md","section":"React Redux","originalNum":135}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is the difference between React Native and React?',
    '**React** is a JavaScript library, supporting both front end web and being run on the server, for building user interfaces and web applications.

     **React Native** is a mobile framework that compiles to native app components, allowing you to build native mobile applications (iOS, Android, and Windows) in JavaScript that allows you to use React to build your components, and implements React under the hood.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    '**React** is a JavaScript library, supporting both front end web and being run on the server, for building user interfaces and web applications.

     **React Native** is a mobile framework that compiles to native app components, allowing you to build native mobile applications (iOS, Android, and Windows) in JavaScript that allows you to use React to build your components, and implements React under the hood.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'react-native', 'intermediate'],
    '{"source":"reference.md","section":"React Native","originalNum":136}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How to test React Native apps?',
    'React Native can be tested only in mobile simulators like iOS and Android. You can run the app in your mobile using expo app (https://expo.io) Where it syncs using QR code, your mobile and computer should be in same wireless network.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'React Native can be tested only in mobile simulators like iOS and Android. You can run the app in your mobile using expo app (https://expo.io) Where it syncs using QR code, your mobile and computer should be in same wireless network.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'react-native', 'intermediate'],
    '{"source":"reference.md","section":"React Native","originalNum":137}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How to do logging in React Native?',
    '<pre><code>     $ react-native log-ios
     $ react-native log-android</code></pre>

You can use `console.log`, `console.warn`, etc. As of React Native v0.29 you can simply run the following to see logs in the console:',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'You can use `console.log`, `console.warn`, etc. As of React Native v0.29 you can simply run the following to see logs in the console:',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'react-native', 'intermediate'],
    '{"source":"reference.md","section":"React Native","originalNum":138}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How to debug your React Native?',
    'Follow the below steps to debug React Native app:

     1. Run your application in the iOS simulator.
     2. Press `Command + D` and a webpage should open up at `http://localhost:8081/debugger-ui`.
     3. Enable _Pause On Caught Exceptions_ for a better debugging experience.
     4. Press `Command + Option + I` to open the Chrome Developer tools, or open it via `View` -> `Developer` -> `Developer Tools`.
     5. You should now be able to debug as you normally would.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Follow the below steps to debug React Native app:

     1. Run your application in the iOS simulator.
     2. Press `Command + D` and a webpage should open up at `http://localhost:8081/debugger-ui`.
     3. Enable _Pause On Caught Exceptions_ for a better debugging experience.
     4. Press `Command + Option + I` to open the Chrome Developer tools, or open it via `View` -> `Developer` -> `Developer Tools`.
     5. You should now be able to debug as you normally would.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'react-native', 'intermediate'],
    '{"source":"reference.md","section":"React Native","originalNum":139}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is reselect and how it works?',
    '_Reselect_ is a **selector library** (for Redux) which uses _memoization_ concept. It was originally written to compute derived data from Redux-like applications state, but it can''t be tied to any architecture or library.

     Reselect keeps a copy of the last inputs/outputs of the last call, and recomputes the result only if one of the inputs changes. If the same inputs are provided twice in a row, Reselect returns the cached output. It''s memoization and cache are fully customizable.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    '_Reselect_ is a **selector library** (for Redux) which uses _memoization_ concept. It was originally written to compute derived data from Redux-like applications state, but it can''t be tied to any architecture or library.

     Reselect keeps a copy of the last inputs/outputs of the last call, and recomputes the result only if one of the inputs changes. If the same inputs are provided twice in a row, Reselect returns the cached output. It''s memoization and cache are fully customizable.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'integration', 'intermediate'],
    '{"source":"reference.md","section":"React supported libraries & Integration","originalNum":140}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  );

-- Batch 15: Questions 141-150 (10 questions)
INSERT INTO questions (
  id, title, content, type, difficulty, points, options, correct_answer, 
  explanation, test_cases, hints, tags, metadata, stats, category_id, 
  learning_card_id, is_active, created_at, updated_at, topic_id, time_limit
) VALUES (
    gen_random_uuid(),
    'What is Flow?',
    '_Flow_ is a _static type checker_ designed to find type errors in JavaScript. Flow types can express much more fine-grained distinctions than traditional type systems. For example, Flow helps you catch errors involving `null`, unlike most type systems.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    '_Flow_ is a _static type checker_ designed to find type errors in JavaScript. Flow types can express much more fine-grained distinctions than traditional type systems. For example, Flow helps you catch errors involving `null`, unlike most type systems.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'integration', 'intermediate'],
    '{"source":"reference.md","section":"React supported libraries & Integration","originalNum":141}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is the difference between Flow and PropTypes?',
    'Flow is a _static analysis tool_ (static checker) which uses a superset of the language, allowing you to add type annotations to all of your code and catch an entire class of bugs at compile time.

     PropTypes is a _basic type checker_ (runtime checker) which has been patched onto React. It can''t check anything other than the types of the props being passed to a given component. If you want more flexible typechecking for your entire project Flow/TypeScript are appropriate choices.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Flow is a _static analysis tool_ (static checker) which uses a superset of the language, allowing you to add type annotations to all of your code and catch an entire class of bugs at compile time.

     PropTypes is a _basic type checker_ (runtime checker) which has been patched onto React. It can''t check anything other than the types of the props being passed to a given component. If you want more flexible typechecking for your entire project Flow/TypeScript are appropriate choices.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'integration', 'intermediate'],
    '{"source":"reference.md","section":"React supported libraries & Integration","originalNum":142}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How to use Font Awesome icons in React?',
    '<pre><code>        function MyComponent {
          return &lt;div&gt;&lt;i className={&#039;fa fa-spinner&#039;} /&gt;&lt;/div&gt;
        }</code></pre>

The below steps followed to include Font Awesome in React:

     1. Install `font-awesome`:


     2. Import `font-awesome` in your `index.js` file:


     3. Add Font Awesome classes in `className`:',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The below steps followed to include Font Awesome in React:

     1. Install `font-awesome`:


     2. Import `font-awesome` in your `index.js` file:


     3. Add Font Awesome classes in `className`:',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'integration', 'intermediate'],
    '{"source":"reference.md","section":"React supported libraries & Integration","originalNum":143}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is React Dev Tools?',
    '_React Developer Tools_ let you inspect the component hierarchy, including component props and state. It exists both as a browser extension (for Chrome and Firefox), and as a standalone app (works with other environments including Safari, IE, and React Native).

     The official extensions available for different browsers or environments.

     1. **Chrome extension**
     2. **Firefox extension**
     3. **Standalone app** (Safari, React Native, etc)',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    '_React Developer Tools_ let you inspect the component hierarchy, including component props and state. It exists both as a browser extension (for Chrome and Firefox), and as a standalone app (works with other environments including Safari, IE, and React Native).

     The official extensions available for different browsers or environments.

     1. **Chrome extension**
     2. **Firefox extension**
     3. **Standalone app** (Safari, React Native, etc)',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'integration', 'intermediate'],
    '{"source":"reference.md","section":"React supported libraries & Integration","originalNum":144}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'Why is DevTools not loading in Chrome for local files?',
    'If you opened a local HTML file in your browser (`file://...`) then you must first open _Chrome Extensions_ and check `Allow access to file URLs`.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'If you opened a local HTML file in your browser (`file://...`) then you must first open _Chrome Extensions_ and check `Allow access to file URLs`.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'integration', 'intermediate'],
    '{"source":"reference.md","section":"React supported libraries & Integration","originalNum":145}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How to use Polymer in React?',
    '<pre><code>        export default function MyComponent {
          return &lt;calendar-element /&gt;;
        }</code></pre>

You need to follow below steps to use Polymer in React,

     1. Create a Polymer element:


     2. Create the Polymer component HTML tag by importing it in a HTML document, e.g. import it in the `index.html` of your React application:


     3. Use that element in the JSX file:',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'You need to follow below steps to use Polymer in React,

     1. Create a Polymer element:


     2. Create the Polymer component HTML tag by importing it in a HTML document, e.g. import it in the `index.html` of your React application:


     3. Use that element in the JSX file:',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'integration', 'intermediate'],
    '{"source":"reference.md","section":"React supported libraries & Integration","originalNum":146}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What are the advantages of React over Vue.js?',
    'React has the following advantages over Vue.js:

     1. Gives more flexibility in large apps developing.
     2. Easier to test.
     3. Suitable for mobile apps creating.
     4. More information and solutions available.

**Note:** The above list of advantages are purely opinionated and it vary based on the professional experience. But they are helpful as base parameters.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'React has the following advantages over Vue.js:

     1. Gives more flexibility in large apps developing.
     2. Easier to test.
     3. Suitable for mobile apps creating.
     4. More information and solutions available.

**Note:** The above list of advantages are purely opinionated and it vary based on the professional experience. But they are helpful as base parameters.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'integration', 'intermediate'],
    '{"source":"reference.md","section":"React supported libraries & Integration","originalNum":147}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is the difference between React and Angular?',
    'Let''s see the difference between React and Angular in a table format.

     | React                                                                                       | Angular                                                                                                                            |
     | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
     | React is a library and has only the View layer                                              | Angular is a framework and has complete MVC functionality                                                                          |
     | React handles rendering on the server side                                                  | AngularJS renders only on the client side but Angular 2 and above renders on the server side                                       |
     | React uses JSX that looks like HTML in JS which can be confusing                            | Angular follows the template approach for HTML, which makes code shorter and easy to understand                                    |
     | React Native, which is a React type to build mobile applications are faster and more stable | Ionic, Angular''s mobile native app is relatively less stable and slower                                                            |
     | In React, data flows only in one way and hence debugging is easy                            | In Angular, data flows both way i.e it has two-way data binding between children and parent and hence debugging is often difficult |

**Note:** The above list of differences are purely opinionated and it vary based on the professional experience. But they are helpful as base parameters.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Let''s see the difference between React and Angular in a table format.

     | React                                                                                       | Angular                                                                                                                            |
     | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
     | React is a library and has only the View layer                                              | Angular is a framework and has complete MVC functionality                                                                          |
     | React handles rendering on the server side                                                  | AngularJS renders only on the client side but Angular 2 and above renders on the server side                                       |
     | React uses JSX that looks like HTML in JS which can be confusing                            | Angular follows the template approach for HTML, which makes code shorter and easy to understand                                    |
     | React Native, which is a React type to build mobile applications are faster and more stable | Ionic, Angular''s mobile native app is relatively less stable and slower                                                            |
     | In React, data flows only in one way and hence debugging is easy                            | In Angular, data flows both way i.e it has two-way data binding between children and parent and hence debugging is often difficult |

**Note:** The above list of differences are purely opinionated and it vary based on the professional experience. But they are helpful as base parameters.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'integration', 'intermediate'],
    '{"source":"reference.md","section":"React supported libraries & Integration","originalNum":148}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'Why React tab is not showing up in DevTools?',
    'When the page loads, _React DevTools_ sets a global named `__REACT_DEVTOOLS_GLOBAL_HOOK__`, then React communicates with that hook during initialization. If the website is not using React or if React fails to communicate with DevTools then it won''t show up the tab.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'When the page loads, _React DevTools_ sets a global named `__REACT_DEVTOOLS_GLOBAL_HOOK__`, then React communicates with that hook during initialization. If the website is not using React or if React fails to communicate with DevTools then it won''t show up the tab.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'integration', 'intermediate'],
    '{"source":"reference.md","section":"React supported libraries & Integration","originalNum":149}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What are Styled Components?',
    '`styled-components` is a JavaScript library for styling React applications. It removes the mapping between styles and components, and lets you write actual CSS augmented with JavaScript.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    '`styled-components` is a JavaScript library for styling React applications. It removes the mapping between styles and components, and lets you write actual CSS augmented with JavaScript.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'integration', 'intermediate'],
    '{"source":"reference.md","section":"React supported libraries & Integration","originalNum":150}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  );

-- Batch 16: Questions 151-160 (10 questions)
INSERT INTO questions (
  id, title, content, type, difficulty, points, options, correct_answer, 
  explanation, test_cases, hints, tags, metadata, stats, category_id, 
  learning_card_id, is_active, created_at, updated_at, topic_id, time_limit
) VALUES (
    gen_random_uuid(),
    'Give an example of Styled Components?',
    '<pre><code>     &lt;Wrapper&gt;
       &lt;Title&gt;{&quot;Lets start first styled component!&quot;}&lt;/Title&gt;
     &lt;/Wrapper&gt;</code></pre>

Lets create `<Title>` and `<Wrapper>` components with specific styles for each.


     These two variables, `Title` and `Wrapper`, are now components that you can render just like any other react component.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Lets create `<Title>` and `<Wrapper>` components with specific styles for each.


     These two variables, `Title` and `Wrapper`, are now components that you can render just like any other react component.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'integration', 'intermediate'],
    '{"source":"reference.md","section":"React supported libraries & Integration","originalNum":151}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is Relay?',
    'Relay is a JavaScript framework for providing a data layer and client-server communication to web applications using the React view layer.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Relay is a JavaScript framework for providing a data layer and client-server communication to web applications using the React view layer.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'integration', 'intermediate'],
    '{"source":"reference.md","section":"React supported libraries & Integration","originalNum":152}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What are the main features of Reselect library?',
    '<pre><code>     import { createSelector } from &quot;reselect&quot;;

     const shopItemsSelector = (state) =&gt; state.shop.items;
     const taxPercentSelector = (state) =&gt; state.shop.taxPercent;

     const subtotalSelector = createSelector(shopItemsSelector, (items) =&gt;
       items.reduce((acc, item) =&gt; acc + item.value, 0)
     );

     const taxSelector = createSelector(
       subtotalSelector,
       taxPercentSelector,
       (subtotal, taxPercent) =&gt; subtotal * (taxPercent / 100)
     );

     export const totalSelector = createSelector(
       subtotalSelector,
       taxSelector,
       (subtotal, tax) =&gt; ({ total: subtotal + tax })
     );

     let exampleState = {
       shop: {
         taxPercent: 8,
         items: [
           { name: &quot;apple&quot;, value: 1.2 },
           { name: &quot;orange&quot;, value: 0.95 },
         ],
       },
     };

     console.log(subtotalSelector(exampleState)); // 2.15
     console.log(taxSelector(exampleState)); // 0.172
     console.log(totalSelector(exampleState)); // { total: 2.322 }</code></pre>

Let''s see the main features of Reselect library,

     1. Selectors can compute derived data, allowing Redux to store the minimal possible state.
     2. Selectors are efficient. A selector is not recomputed unless one of its arguments changes.
     3. Selectors are composable. They can be used as input to other selectors.

154. #### Give an example of Reselect usage?

     Let''s take calculations and different amounts of a shipment order with the simplified usage of Reselect:',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Let''s see the main features of Reselect library,

     1. Selectors can compute derived data, allowing Redux to store the minimal possible state.
     2. Selectors are efficient. A selector is not recomputed unless one of its arguments changes.
     3. Selectors are composable. They can be used as input to other selectors.

154. #### Give an example of Reselect usage?

     Let''s take calculations and different amounts of a shipment order with the simplified usage of Reselect:',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":153}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'Can Redux only be used with React?',
    'Redux can be used as a data store for any UI layer. The most common usage is with React and React Native, but there are bindings available for Angular, Angular 2, Vue, Mithril, and more. Redux simply provides a subscription mechanism which can be used by any other code.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Redux can be used as a data store for any UI layer. The most common usage is with React and React Native, but there are bindings available for Angular, Angular 2, Vue, Mithril, and more. Redux simply provides a subscription mechanism which can be used by any other code.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":155}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'Do you need to have a particular build tool to use Redux?',
    'Redux is originally written in ES6 and transpiled for production into ES5 with Webpack and Babel. You should be able to use it regardless of your JavaScript build process. Redux also offers a UMD build that can be used directly without any build process at all.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Redux is originally written in ES6 and transpiled for production into ES5 with Webpack and Babel. You should be able to use it regardless of your JavaScript build process. Redux also offers a UMD build that can be used directly without any build process at all.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":156}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How Redux Form `initialValues` get updated from state?',
    '<pre><code>     const InitializeFromStateForm = reduxForm({
       form: &quot;initializeFromState&quot;,
       enableReinitialize: true,
     })(UserEdit);</code></pre>

You need to add `enableReinitialize : true` setting.


     If your `initialValues` prop gets updated, your form will update too.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'You need to add `enableReinitialize : true` setting.


     If your `initialValues` prop gets updated, your form will update too.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":157}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How React PropTypes allow different types for one prop?',
    '<pre><code>     Component.propTypes = {
       size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
     };</code></pre>

You can use `oneOfType()` method of `PropTypes`.

     For example, the height property can be defined with either `string` or `number` type as below:',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'You can use `oneOfType()` method of `PropTypes`.

     For example, the height property can be defined with either `string` or `number` type as below:',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":158}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'Can I import an SVG file as react component?',
    '<pre><code>     import { ReactComponent as Logo } from &quot;./logo.svg&quot;;

     const App = () =&gt; (
         {/* Logo is an actual react component */}
         &lt;Logo /&gt;
     );</code></pre>

You can import SVG directly as component instead of loading it as a file. This feature is available with `react-scripts@2.0.0` and higher.


     **Note**: Don''t forget about the curly braces in the import.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'You can import SVG directly as component instead of loading it as a file. This feature is available with `react-scripts@2.0.0` and higher.


     **Note**: Don''t forget about the curly braces in the import.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":159}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is render hijacking in react?',
    'The concept of render hijacking is the ability to control what a component will output from another component. It means that you decorate your component by wrapping it into a Higher-Order component. By wrapping, you can inject additional props or make other changes, which can cause changing logic of rendering. It does not actually enable hijacking, but by using HOC you make your component behave differently.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The concept of render hijacking is the ability to control what a component will output from another component. It means that you decorate your component by wrapping it into a Higher-Order component. By wrapping, you can inject additional props or make other changes, which can cause changing logic of rendering. It does not actually enable hijacking, but by using HOC you make your component behave differently.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":160}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How to pass numbers to React component?',
    '<pre><code>     import React from &quot;react&quot;;

     const ChildComponent = ({ name, age }) =&gt; {
       return (
         &lt;&gt;
           My Name is {name} and Age is {age}
         &lt;/&gt;
       );
     };

     const ParentComponent = () =&gt; {
       return (
         &lt;&gt;
           &lt;ChildComponent name=&quot;Chetan&quot; age={30} /&gt;
         &lt;/&gt;
       );
     };

     export default ParentComponent;</code></pre>

We can pass `numbers` as `props` to React component using curly braces `{}` where as `strings` in double quotes `""` or single quotes `''''`',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'We can pass `numbers` as `props` to React component using curly braces `{}` where as `strings` in double quotes `""` or single quotes `''''`',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":161}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  );

-- Batch 17: Questions 161-170 (10 questions)
INSERT INTO questions (
  id, title, content, type, difficulty, points, options, correct_answer, 
  explanation, test_cases, hints, tags, metadata, stats, category_id, 
  learning_card_id, is_active, created_at, updated_at, topic_id, time_limit
) VALUES (
    gen_random_uuid(),
    'Do I need to keep all my state into Redux? Should I ever use react internal state?',
    'It is up to the developer''s decision, i.e., it is developer''s job to determine what kinds of state make up your application, and where each piece of state should live. Some users prefer to keep every single piece of data in Redux, to maintain a fully serializable and controlled version of their application at all times. Others prefer to keep non-critical or UI state, such as “is this dropdown currently open”, inside a component''s internal state.

     Below are the rules of thumb to determine what kind of data should be put into Redux

     1. Do other parts of the application care about this data?
     2. Do you need to be able to create further derived data based on this original data?
     3. Is the same data being used to drive multiple components?
     4. Is there value to you in being able to restore this state to a given point in time (ie, time travel debugging)?
     5. Do you want to cache the data (i.e, use what''s in state if it''s already there instead of re-requesting it)?',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'It is up to the developer''s decision, i.e., it is developer''s job to determine what kinds of state make up your application, and where each piece of state should live. Some users prefer to keep every single piece of data in Redux, to maintain a fully serializable and controlled version of their application at all times. Others prefer to keep non-critical or UI state, such as “is this dropdown currently open”, inside a component''s internal state.

     Below are the rules of thumb to determine what kind of data should be put into Redux

     1. Do other parts of the application care about this data?
     2. Do you need to be able to create further derived data based on this original data?
     3. Is the same data being used to drive multiple components?
     4. Is there value to you in being able to restore this state to a given point in time (ie, time travel debugging)?
     5. Do you want to cache the data (i.e, use what''s in state if it''s already there instead of re-requesting it)?',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":162}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is the purpose of registerServiceWorker in React?',
    '<pre><code>     import React from &quot;react&quot;;
     import ReactDOM from &quot;react-dom&quot;;
     import App from &quot;./App&quot;;
     import registerServiceWorker from &quot;./registerServiceWorker&quot;;

     ReactDOM.render(&lt;App /&gt;, document.getElementById(&quot;root&quot;));
     registerServiceWorker();</code></pre>

React creates a service worker for you without any configuration by default. The service worker is a web API that helps you cache your assets and other files so that when the user is offline or on a slow network, he/she can still see results on the screen, as such, it helps you build a better user experience, that''s what you should know about service worker for now. It''s all about adding offline capabilities to your site.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'React creates a service worker for you without any configuration by default. The service worker is a web API that helps you cache your assets and other files so that when the user is offline or on a slow network, he/she can still see results on the screen, as such, it helps you build a better user experience, that''s what you should know about service worker for now. It''s all about adding offline capabilities to your site.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":163}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is React memo function?',
    '<pre><code>     const MyComponent = React.memo(function MyComponent(props) {
       /* only rerenders if props change */
     });</code></pre>

Class components can be restricted from re-rendering when their input props are the same using **PureComponent or shouldComponentUpdate**. Now you can do the same with function components by wrapping them in **React.memo**.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Class components can be restricted from re-rendering when their input props are the same using **PureComponent or shouldComponentUpdate**. Now you can do the same with function components by wrapping them in **React.memo**.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":164}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is React lazy function?',
    '<pre><code>     const OtherComponent = React.lazy(() =&gt; import(&quot;./OtherComponent&quot;));

     function MyComponent() {
       return (
           &lt;OtherComponent /&gt;
       );
     }</code></pre>

The `React.lazy` function lets you render a dynamic import as a regular component. It will automatically load the bundle containing the `OtherComponent` when the component gets rendered. This must return a Promise which resolves to a module with a default export containing a React component.


     **Note:**
     `React.lazy` and `Suspense` is not yet available for server-side rendering. If you want to do code-splitting in a server rendered app, we still recommend React Loadable.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The `React.lazy` function lets you render a dynamic import as a regular component. It will automatically load the bundle containing the `OtherComponent` when the component gets rendered. This must return a Promise which resolves to a module with a default export containing a React component.


     **Note:**
     `React.lazy` and `Suspense` is not yet available for server-side rendering. If you want to do code-splitting in a server rendered app, we still recommend React Loadable.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":165}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How to prevent unnecessary updates using setState?',
    '<pre><code>     getUserProfile = (user) =&gt; {
       const latestAddress = user.address;
       this.setState((state) =&gt; {
         if (state.address === latestAddress) {
           return null;
         } else {
           return { title: latestAddress };
         }
       });
     };</code></pre>

You can compare the current value of the state with an existing state value and decide whether to rerender the page or not. If the values are the same then you need to return **null** to stop re-rendering otherwise return the latest state value.

     For example, the user profile information is conditionally rendered as follows,',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'You can compare the current value of the state with an existing state value and decide whether to rerender the page or not. If the values are the same then you need to return **null** to stop re-rendering otherwise return the latest state value.

     For example, the user profile information is conditionally rendered as follows,',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":166}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How do you render Array, Strings and Numbers in React 16 Version?',
    '<pre><code>     render() {
      return &#039;Welcome to ReactJS questions&#039;;
     }
     // Number
     render() {
      return 2018;
     }</code></pre>

**Arrays**: Unlike older releases, you don''t need to make sure **render** method return a single element in React16. You are able to return multiple sibling elements without a wrapping element by returning an array.

     For example, let us take the below list of developers,


     You can also merge this array of items in another array component.


     **Strings and Numbers:** You can also return string and number type from the render method.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    '**Arrays**: Unlike older releases, you don''t need to make sure **render** method return a single element in React16. You are able to return multiple sibling elements without a wrapping element by returning an array.

     For example, let us take the below list of developers,


     You can also merge this array of items in another array component.


     **Strings and Numbers:** You can also return string and number type from the render method.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":167}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What are hooks?',
    '<pre><code>     import { useState } from &quot;react&quot;;

     function Example() {
       // Declare a new state variable, which we&#039;ll call &quot;count&quot;
       const [count, setCount] = useState(0);

       return (
         &lt;&gt;
           &lt;p&gt;You clicked {count} times&lt;/p&gt;
           &lt;button onClick={() =&gt; setCount(count + 1)}&gt;Click me&lt;/button&gt;
         &lt;/&gt;
       );
     }</code></pre>

Hooks is a special JavaScript function that allows you use state and other React features without writing a class. This pattern has been introduced as a new feature in React 16.8 and helped to isolate the stateful logic from the components.

     Let''s see an example of useState hook:


     **Note:** Hooks can be used inside an existing function component without rewriting the component.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Hooks is a special JavaScript function that allows you use state and other React features without writing a class. This pattern has been introduced as a new feature in React 16.8 and helped to isolate the stateful logic from the components.

     Let''s see an example of useState hook:


     **Note:** Hooks can be used inside an existing function component without rewriting the component.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":168}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What rules need to be followed for hooks?',
    '<pre><code>      //Example1
      function normalFunction() {
        // Incorrect: Can&#039;t call hooks in normal functions
        const [count, setCount] = useState(0); 
      }

      //Example2
      function fetchData(url) {
        // Incorrect: Hooks can&#039;t be used in non-React functions
        const [data, setData] = useState(null);

        useEffect(() =&gt; {
          fetch(url)
            .then((response) =&gt; response.json())
            .then((data) =&gt; setData(data));
        }, [url]);

        return data;
      }</code></pre>

You need to follow two rules in order to use hooks,

     1. **Call Hooks only at the top level of your react functions:** You should always use hooks at the top level of react function before any early returns. i.e, You shouldn’t call Hooks inside loops, conditions, or nested functions. This will ensure that Hooks are called in the same order each time a component renders and it preserves the state of Hooks between multiple re-renders due to `useState` and `useEffect` calls.

     Let''s see the difference using an example,
     **Correct usage:**:
     **Incorrect usage:**:
     The `useState` hook for the country field is being called conditionally within an `if` block. This can lead to inconsistent state behavior and may cause hooks to be called in a different order on each re-render.

     2. **Call Hooks from React Functions only:** You shouldn’t call Hooks from regular JavaScript functions or class components. Instead, you should call them from either function components or custom hooks.

     Let''s find the difference of correct and incorrect usage with below examples,

     **Correct usage:**:
     **Incorrect usage:**:
     In the above incorrect usage example, both `useState` and `useEffect` are used in non-React functions(`normalFunction` and `fetchData`), which is not allowed.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'You need to follow two rules in order to use hooks,

     1. **Call Hooks only at the top level of your react functions:** You should always use hooks at the top level of react function before any early returns. i.e, You shouldn’t call Hooks inside loops, conditions, or nested functions. This will ensure that Hooks are called in the same order each time a component renders and it preserves the state of Hooks between multiple re-renders due to `useState` and `useEffect` calls.

     Let''s see the difference using an example,
     **Correct usage:**:
     **Incorrect usage:**:
     The `useState` hook for the country field is being called conditionally within an `if` block. This can lead to inconsistent state behavior and may cause hooks to be called in a different order on each re-render.

     2. **Call Hooks from React Functions only:** You shouldn’t call Hooks from regular JavaScript functions or class components. Instead, you should call them from either function components or custom hooks.

     Let''s find the difference of correct and incorrect usage with below examples,

     **Correct usage:**:
     **Incorrect usage:**:
     In the above incorrect usage example, both `useState` and `useEffect` are used in non-React functions(`normalFunction` and `fetchData`), which is not allowed.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":169}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How to ensure hooks followed the rules in your project?',
    '<pre><code>        useEffect(() =&gt; {
          // Forgetting `message` will result in incorrect behavior
          console.log(message);
        }, []); // Here `message` should be a dependency</code></pre>

React team released an ESLint plugin called **eslint-plugin-react-hooks** that enforces Hook''s two rules. It is part of Hooks API. You can add this plugin to your project using the below command,


        And apply the below config in your ESLint config file,


        This plugin also provide another important rule through `react-hooks/exhaustive-deps`. It ensures that the dependencies of useEffect, useCallback, and useMemo hooks are correctly listed to avoid potential bugs.

        The recommended `eslint-config-react-app` preset already includes the hooks rules of this plugin.
        For example, the linter enforce proper naming convention for hooks. If you rename your custom hooks which as prefix "use" to something else then linter won''t allow you to call built-in hooks such as useState, useEffect etc inside of your custom hook anymore.

        **Note:** This plugin is intended to use in Create React App by default.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'React team released an ESLint plugin called **eslint-plugin-react-hooks** that enforces Hook''s two rules. It is part of Hooks API. You can add this plugin to your project using the below command,


        And apply the below config in your ESLint config file,


        This plugin also provide another important rule through `react-hooks/exhaustive-deps`. It ensures that the dependencies of useEffect, useCallback, and useMemo hooks are correctly listed to avoid potential bugs.

        The recommended `eslint-config-react-app` preset already includes the hooks rules of this plugin.
        For example, the linter enforce proper naming convention for hooks. If you rename your custom hooks which as prefix "use" to something else then linter won''t allow you to call built-in hooks such as useState, useEffect etc inside of your custom hook anymore.

        **Note:** This plugin is intended to use in Create React App by default.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":170}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What are the differences between Flux and Redux?',
    'Below are the major differences between Flux and Redux

     | Flux                                           | Redux                                      |
     | ---------------------------------------------- | ------------------------------------------ |
     | State is mutable                               | State is immutable                         |
     | The Store contains both state and change logic | The Store and change logic are separate    |
     | There are multiple stores exist                | There is only one store exist              |
     | All the stores are disconnected and flat       | Single store with hierarchical reducers    |
     | It has a singleton dispatcher                  | There is no concept of dispatcher          |
     | React components subscribe to the store        | Container components uses connect function |',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Below are the major differences between Flux and Redux

     | Flux                                           | Redux                                      |
     | ---------------------------------------------- | ------------------------------------------ |
     | State is mutable                               | State is immutable                         |
     | The Store contains both state and change logic | The Store and change logic are separate    |
     | There are multiple stores exist                | There is only one store exist              |
     | All the stores are disconnected and flat       | Single store with hierarchical reducers    |
     | It has a singleton dispatcher                  | There is no concept of dispatcher          |
     | React components subscribe to the store        | Container components uses connect function |',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":171}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  );

-- Batch 18: Questions 171-180 (10 questions)
INSERT INTO questions (
  id, title, content, type, difficulty, points, options, correct_answer, 
  explanation, test_cases, hints, tags, metadata, stats, category_id, 
  learning_card_id, is_active, created_at, updated_at, topic_id, time_limit
) VALUES (
    gen_random_uuid(),
    'What are the benefits of React Router V4?',
    'Below are the main benefits of React Router V4 module,

     1. In React Router v4(version 4), the API is completely about components. A router can be visualized as a single component(`<BrowserRouter>`) which wraps specific child router components(`<Route>`).
     2. You don''t need to manually set history. The router module will take care history by wrapping routes with `<BrowserRouter>` component.
     3. The application size is reduced by adding only the specific router module(Web, core, or native)',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Below are the main benefits of React Router V4 module,

     1. In React Router v4(version 4), the API is completely about components. A router can be visualized as a single component(`<BrowserRouter>`) which wraps specific child router components(`<Route>`).
     2. You don''t need to manually set history. The router module will take care history by wrapping routes with `<BrowserRouter>` component.
     3. The application size is reduced by adding only the specific router module(Web, core, or native)',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":172}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'Can you describe about componentDidCatch lifecycle method signature?',
    '<pre><code>     componentDidCatch(error, info);</code></pre>

The **componentDidCatch** lifecycle method is invoked after an error has been thrown by a descendant component. The method receives two parameters,

     1. error: - The error object which was thrown
     2. info: - An object with a componentStack key contains the information about which component threw the error.

     The method structure would be as follows',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The **componentDidCatch** lifecycle method is invoked after an error has been thrown by a descendant component. The method receives two parameters,

     1. error: - The error object which was thrown
     2. info: - An object with a componentStack key contains the information about which component threw the error.

     The method structure would be as follows',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":173}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'In which scenarios do error boundaries not catch errors?',
    'Below are the cases in which error boundaries don''t work,

     1. Inside Event handlers
     2. Asynchronous code using **setTimeout or requestAnimationFrame** callbacks
     3. During Server side rendering
     4. When errors thrown in the error boundary code itself',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Below are the cases in which error boundaries don''t work,

     1. Inside Event handlers
     2. Asynchronous code using **setTimeout or requestAnimationFrame** callbacks
     3. During Server side rendering
     4. When errors thrown in the error boundary code itself',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":174}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is the behavior of uncaught errors in react 16?',
    'In React 16, errors that were not caught by any error boundary will result in unmounting of the whole React component tree. The reason behind this decision is that it is worse to leave corrupted UI in place than to completely remove it. For example, it is worse for a payments app to display a wrong amount than to render nothing.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'In React 16, errors that were not caught by any error boundary will result in unmounting of the whole React component tree. The reason behind this decision is that it is worse to leave corrupted UI in place than to completely remove it. For example, it is worse for a payments app to display a wrong amount than to render nothing.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":175}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is the proper placement for error boundaries?',
    'The granularity of error boundaries usage is up to the developer based on project needs. You can follow either of these approaches,
     1. You can wrap top-level route components to display a generic error message for the entire application.
     2. You can also wrap individual components in an error boundary to protect them from crashing the rest of the application.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The granularity of error boundaries usage is up to the developer based on project needs. You can follow either of these approaches,
     1. You can wrap top-level route components to display a generic error message for the entire application.
     2. You can also wrap individual components in an error boundary to protect them from crashing the rest of the application.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":176}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is the benefit of component stack trace from error boundary?',
    'Apart from error messages and javascript stack, React16 will display the component stack trace with file names and line numbers using error boundary concept.

     For example, BuggyCounter component displays the component stack trace as below,

     ![stacktrace](images/error_boundary.png)',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Apart from error messages and javascript stack, React16 will display the component stack trace with file names and line numbers using error boundary concept.

     For example, BuggyCounter component displays the component stack trace as below,

     ![stacktrace](images/error_boundary.png)',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":177}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What are default props?',
    '<pre><code>     function MyButton() {
       return &lt;MyButton /&gt;; // props.color will contain red value
     }</code></pre>

The _defaultProps_ can be defined as a property on the component to set the default values for the props. These default props are used when props not supplied(i.e., undefined props), but not for `null` or `0` as props. That means, If you provide null value then it remains null value. It''s the same behavior with 0 as well.

     For example, let us create color default prop for the button component,


     If `props.color` is not provided then it will set the default value to ''red''. i.e, Whenever you try to access the color prop it uses the default value',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The _defaultProps_ can be defined as a property on the component to set the default values for the props. These default props are used when props not supplied(i.e., undefined props), but not for `null` or `0` as props. That means, If you provide null value then it remains null value. It''s the same behavior with 0 as well.

     For example, let us create color default prop for the button component,


     If `props.color` is not provided then it will set the default value to ''red''. i.e, Whenever you try to access the color prop it uses the default value',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":178}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is the purpose of displayName class property?',
    '<pre><code>     function withSubscription(WrappedComponent) {
       class WithSubscription extends React.Component {
         /* ... */
       }
       WithSubscription.displayName = `WithSubscription(${getDisplayName(
         WrappedComponent
       )})`;
       return WithSubscription;
     }
     function getDisplayName(WrappedComponent) {
       return (
         WrappedComponent.displayName || WrappedComponent.name || &quot;Component&quot;
       );
     }</code></pre>

The displayName string is used in debugging messages. Usually, you don’t need to set it explicitly because it’s inferred from the name of the function or class that defines the component. You might want to set it explicitly if you want to display a different name for debugging purposes or when you create a higher-order component.

     For example, To ease debugging, choose a display name that communicates that it’s the result of a withSubscription HOC.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The displayName string is used in debugging messages. Usually, you don’t need to set it explicitly because it’s inferred from the name of the function or class that defines the component. You might want to set it explicitly if you want to display a different name for debugging purposes or when you create a higher-order component.

     For example, To ease debugging, choose a display name that communicates that it’s the result of a withSubscription HOC.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":179}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is the browser support for react applications?',
    'React supports all popular browsers, including Internet Explorer 9 and above, although some polyfills are required for older browsers such as IE 9 and IE 10. If you use **es5-shim and es5-sham** polyfill then it even support old browsers that doesn''t support ES5 methods.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'React supports all popular browsers, including Internet Explorer 9 and above, although some polyfills are required for older browsers such as IE 9 and IE 10. If you use **es5-shim and es5-sham** polyfill then it even support old browsers that doesn''t support ES5 methods.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":180}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is code-splitting?',
    '<pre><code>    import React, { Component } from &quot;react&quot;;

     class App extends Component {
       handleClick = () =&gt; {
         import(&quot;./moduleA&quot;)
           .then(({ moduleA }) =&gt; {
             // Use moduleA
           })
           .catch((err) =&gt; {
             // Handle failure
           });
       };

       render() {
         return (
             &lt;button onClick={this.handleClick}&gt;Load&lt;/button&gt;
         );
       }
     }

     export default App;</code></pre>

Code-Splitting is a feature supported by bundlers like Webpack and Browserify which can create multiple bundles that can be dynamically loaded at runtime. The react project supports code splitting via dynamic import() feature.

     For example, in the below code snippets, it will make moduleA.js and all its unique dependencies as a separate chunk that only loads after the user clicks the ''Load'' button.

     **moduleA.js**


     **App.js**


    <p>


  </p>',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Code-Splitting is a feature supported by bundlers like Webpack and Browserify which can create multiple bundles that can be dynamically loaded at runtime. The react project supports code splitting via dynamic import() feature.

     For example, in the below code snippets, it will make moduleA.js and all its unique dependencies as a separate chunk that only loads after the user clicks the ''Load'' button.

     **moduleA.js**


     **App.js**


    <p>


  </p>',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":181}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  );

-- Batch 19: Questions 181-190 (10 questions)
INSERT INTO questions (
  id, title, content, type, difficulty, points, options, correct_answer, 
  explanation, test_cases, hints, tags, metadata, stats, category_id, 
  learning_card_id, is_active, created_at, updated_at, topic_id, time_limit
) VALUES (
    gen_random_uuid(),
    'What are Keyed Fragments?',
    '<pre><code>     function Glossary(props) {
       return (
         &lt;dl&gt;
           {props.items.map((item) =&gt; (
             // Without the `key`, React will fire a key warning
             &lt;React.Fragment key={item.id}&gt;
               &lt;dt&gt;{item.term}&lt;/dt&gt;
               &lt;dd&gt;{item.description}&lt;/dd&gt;
             &lt;/React.Fragment&gt;
           ))}
         &lt;/dl&gt;
       );
     }</code></pre>

The Fragments declared with the explicit <React.Fragment> syntax may have keys. The general use case is mapping a collection to an array of fragments as below,


     **Note:** key is the only attribute that can be passed to Fragment. In the future, there might be a support for additional attributes, such as event handlers.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The Fragments declared with the explicit <React.Fragment> syntax may have keys. The general use case is mapping a collection to an array of fragments as below,


     **Note:** key is the only attribute that can be passed to Fragment. In the future, there might be a support for additional attributes, such as event handlers.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":182}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'Does React support all HTML attributes?',
    '<pre><code>     &lt;input readOnly={true} /&gt;  // Just like node.readOnly DOM API</code></pre>

As of React 16, both standard or custom DOM attributes are fully supported. Since React components often take both custom and DOM-related props, React uses the camelCase convention just like the DOM APIs.

     Let us take few props with respect to standard HTML attributes,


     These props work similarly to the corresponding HTML attributes, with the exception of the special cases. It also support all SVG attributes.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'As of React 16, both standard or custom DOM attributes are fully supported. Since React components often take both custom and DOM-related props, React uses the camelCase convention just like the DOM APIs.

     Let us take few props with respect to standard HTML attributes,


     These props work similarly to the corresponding HTML attributes, with the exception of the special cases. It also support all SVG attributes.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":183}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'When component props defaults to true?',
    '<pre><code>     &lt;MyInput autocomplete /&gt;

     &lt;MyInput autocomplete={true} /&gt;</code></pre>

If you pass no value for a prop, it defaults to true. This behavior is available so that it matches the behavior of HTML.

     For example, below expressions are equivalent,


     **Note:** It is not recommended to use this approach because it can be confused with the ES6 object shorthand (example, `{name}` which is short for `{name: name}`)',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'If you pass no value for a prop, it defaults to true. This behavior is available so that it matches the behavior of HTML.

     For example, below expressions are equivalent,


     **Note:** It is not recommended to use this approach because it can be confused with the ES6 object shorthand (example, `{name}` which is short for `{name: name}`)',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":184}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is NextJS and major features of it?',
    'Next.js is a popular and lightweight framework for static and server‑rendered applications built with React. It also provides styling and routing solutions. Below are the major features provided by NextJS,

     1. Server-rendered by default
     2. Automatic code splitting for faster page loads
     3. Simple client-side routing (page based)
     4. Webpack-based dev environment which supports (HMR)
     5. Able to implement with Express or any other Node.js HTTP server
     6. Customizable with your own Babel and Webpack configurations',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Next.js is a popular and lightweight framework for static and server‑rendered applications built with React. It also provides styling and routing solutions. Below are the major features provided by NextJS,

     1. Server-rendered by default
     2. Automatic code splitting for faster page loads
     3. Simple client-side routing (page based)
     4. Webpack-based dev environment which supports (HMR)
     5. Able to implement with Express or any other Node.js HTTP server
     6. Customizable with your own Babel and Webpack configurations',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":185}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How do you pass an event handler to a component?',
    '<pre><code>     function Button({ onClick }) {
       return &lt;button onClick={onClick}&gt;Download&lt;/button&gt;;
     }

     export default function downloadExcel() {
       function handleClick() {
         alert(&quot;Downloaded&quot;);
       }

       return &lt;Button onClick={handleClick}&gt;&lt;/Button&gt;;
     }</code></pre>

You can pass event handlers and other functions as props to child components. The functions can be passed to child component as below,',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'You can pass event handlers and other functions as props to child components. The functions can be passed to child component as below,',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":186}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How to prevent a function from being called multiple times?',
    'If you use an event handler such as **onClick or onScroll** and want to prevent the callback from being fired too quickly, then you can limit the rate at which callback is executed. This can be achieved in the below possible ways,

     1. **Throttling:** Changes based on a time based frequency. For example, it can be used using \\_.throttle lodash function
     2. **Debouncing:** Publish changes after a period of inactivity. For example, it can be used using \\_.debounce lodash function
     3. **RequestAnimationFrame throttling:** Changes based on requestAnimationFrame. For example, it can be used using raf-schd lodash function',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'If you use an event handler such as **onClick or onScroll** and want to prevent the callback from being fired too quickly, then you can limit the rate at which callback is executed. This can be achieved in the below possible ways,

     1. **Throttling:** Changes based on a time based frequency. For example, it can be used using \\_.throttle lodash function
     2. **Debouncing:** Publish changes after a period of inactivity. For example, it can be used using \\_.debounce lodash function
     3. **RequestAnimationFrame throttling:** Changes based on requestAnimationFrame. For example, it can be used using raf-schd lodash function',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":187}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How JSX prevents Injection Attacks?',
    '<pre><code>     const name = response.potentiallyMaliciousInput;
     const element = &lt;h1&gt;{name}&lt;/h1&gt;;</code></pre>

React DOM escapes any values embedded in JSX before rendering them. Thus it ensures that you can never inject anything that’s not explicitly written in your application. Everything is converted to a string before being rendered.

     For example, you can embed user input as below,


     This way you can prevent XSS(Cross-site-scripting) attacks in the application.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'React DOM escapes any values embedded in JSX before rendering them. Thus it ensures that you can never inject anything that’s not explicitly written in your application. Everything is converted to a string before being rendered.

     For example, you can embed user input as below,


     This way you can prevent XSS(Cross-site-scripting) attacks in the application.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":188}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How do you update rendered elements?',
    '<pre><code>     function tick() {
       const element = (
           &lt;h1&gt;Hello, world!&lt;/h1&gt;
           &lt;h2&gt;It is {new Date().toLocaleTimeString()}.&lt;/h2&gt;
       );
       ReactDOM.render(element, document.getElementById(&quot;root&quot;));
     }

     setInterval(tick, 1000);</code></pre>

You can update UI(represented by rendered element) by passing the newly created element to ReactDOM''s render method.

     For example, lets take a ticking clock example, where it updates the time by calling render method multiple times,',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'You can update UI(represented by rendered element) by passing the newly created element to ReactDOM''s render method.

     For example, lets take a ticking clock example, where it updates the time by calling render method multiple times,',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":189}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How do you say that props are readonly?',
    '<pre><code>     function capital(amount, interest) {
       return amount + interest;
     }</code></pre>

When you declare a component as a function or a class, it must never modify its own props.

     Let us take a below capital function,


     The above function is called “pure” because it does not attempt to change their inputs, and always return the same result for the same inputs. Hence, React has a single rule saying "All React components must act like pure functions with respect to their props."',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'When you declare a component as a function or a class, it must never modify its own props.

     Let us take a below capital function,


     The above function is called “pure” because it does not attempt to change their inputs, and always return the same result for the same inputs. Hence, React has a single rule saying "All React components must act like pure functions with respect to their props."',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":190}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What are the conditions to safely use the index as a key?',
    'There are three conditions to make sure, it is safe use the index as a key.

     1. The list and items are static– they are not computed and do not change
     2. The items in the list have no ids
     3. The list is never reordered or filtered.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'There are three conditions to make sure, it is safe use the index as a key.

     1. The list and items are static– they are not computed and do not change
     2. The items in the list have no ids
     3. The list is never reordered or filtered.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":191}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  );

-- Batch 20: Questions 191-200 (10 questions)
INSERT INTO questions (
  id, title, content, type, difficulty, points, options, correct_answer, 
  explanation, test_cases, hints, tags, metadata, stats, category_id, 
  learning_card_id, is_active, created_at, updated_at, topic_id, time_limit
) VALUES (
    gen_random_uuid(),
    'Should keys be globally unique?',
    '<pre><code>     function Book(props) {
       const index = (
         &lt;ul&gt;
           {props.pages.map((page) =&gt; (
             &lt;li key={page.id}&gt;{page.title}&lt;/li&gt;
           ))}
         &lt;/ul&gt;
       );
       const content = props.pages.map((page) =&gt; (
           &lt;h3&gt;{page.title}&lt;/h3&gt;
           &lt;p&gt;{page.content}&lt;/p&gt;
           &lt;p&gt;{page.pageNumber}&lt;/p&gt;
       ));
       return (
           {index}
           &lt;hr /&gt;
           {content}
       );
     }</code></pre>

The keys used within arrays should be unique among their siblings but they don’t need to be globally unique. i.e, You can use the same keys with two different arrays.

     For example, the below `Book` component uses two arrays with different arrays,',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The keys used within arrays should be unique among their siblings but they don’t need to be globally unique. i.e, You can use the same keys with two different arrays.

     For example, the below `Book` component uses two arrays with different arrays,',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":192}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is the popular choice for form handling?',
    '`Formik` is a form library for react which provides solutions such as validation, keeping track of the visited fields, and handling form submission.

     In detail, You can categorize them as follows,

     1. Getting values in and out of form state
     2. Validation and error messages
     3. Handling form submission

     It is used to create a scalable, performant, form helper with a minimal API to solve annoying stuff.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    '`Formik` is a form library for react which provides solutions such as validation, keeping track of the visited fields, and handling form submission.

     In detail, You can categorize them as follows,

     1. Getting values in and out of form state
     2. Validation and error messages
     3. Handling form submission

     It is used to create a scalable, performant, form helper with a minimal API to solve annoying stuff.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":193}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What are the advantages of formik over redux form library?',
    'Below are the main reasons to recommend formik over redux form library,

     1. The form state is inherently short-term and local, so tracking it in Redux (or any kind of Flux library) is unnecessary.
     2. Redux-Form calls your entire top-level Redux reducer multiple times ON EVERY SINGLE KEYSTROKE. This way it increases input latency for large apps.
     3. Redux-Form is 22.5 kB minified gzipped whereas Formik is 12.7 kB',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Below are the main reasons to recommend formik over redux form library,

     1. The form state is inherently short-term and local, so tracking it in Redux (or any kind of Flux library) is unnecessary.
     2. Redux-Form calls your entire top-level Redux reducer multiple times ON EVERY SINGLE KEYSTROKE. This way it increases input latency for large apps.
     3. Redux-Form is 22.5 kB minified gzipped whereas Formik is 12.7 kB',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":194}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'Why are you not required to use inheritance?',
    'In React, it is recommended to use composition over inheritance to reuse code between components. Both Props and composition give you all the flexibility you need to customize a component’s look and behavior explicitly and safely.
     Whereas, If you want to reuse non-UI functionality between components, it is suggested to extract it into a separate JavaScript module. Later components import it and use that function, object, or class, without extending it.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'In React, it is recommended to use composition over inheritance to reuse code between components. Both Props and composition give you all the flexibility you need to customize a component’s look and behavior explicitly and safely.
     Whereas, If you want to reuse non-UI functionality between components, it is suggested to extract it into a separate JavaScript module. Later components import it and use that function, object, or class, without extending it.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":195}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'Can I use web components in react application?',
    '<pre><code>     import &quot;./App.css&quot;;
     import &quot;@vaadin/vaadin-date-picker&quot;;
     export default function App() {
       return (
           &lt;vaadin-date-picker label=&quot;When were you born?&quot;&gt;&lt;/vaadin-date-picker&gt;
       );
     }</code></pre>

Yes, you can use web components in a react application. Even though many developers won''t use this combination, it may require especially if you are using third-party UI components that are written using Web Components.

     For example, let us use `Vaadin` date picker web component as below,',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Yes, you can use web components in a react application. Even though many developers won''t use this combination, it may require especially if you are using third-party UI components that are written using Web Components.

     For example, let us use `Vaadin` date picker web component as below,',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":196}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is dynamic import?',
    '<pre><code>     import(&quot;./math&quot;).then((math) =&gt; {
       console.log(math.add(10, 20));
     });</code></pre>

You can achieve code-splitting in your app using dynamic import.

     Let''s take an example of addition,

     1. **Normal Import**


     2. **Dynamic Import**',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'You can achieve code-splitting in your app using dynamic import.

     Let''s take an example of addition,

     1. **Normal Import**


     2. **Dynamic Import**',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":197}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What are loadable components?',
    '<pre><code>     import loadable from &quot;@loadable/component&quot;;

     const OtherComponent = loadable(() =&gt; import(&quot;./OtherComponent&quot;));

     function MyComponent() {
       return (
           &lt;OtherComponent /&gt;
       );
     }</code></pre>

With the release of React 18, React.lazy and Suspense are now available for server-side rendering. However, prior to React 18, it was recommended to use Loadable Components for code-splitting in a server-side rendered app because React.lazy and Suspense were not available for server-side rendering. Loadable Components lets you render a dynamic import as a regular component. For example, you can use Loadable Components to load the OtherComponent in a separate bundle like this:


     Now OtherComponent will be loaded in a separated bundle
     Loadable Components provides additional benefits beyond just code-splitting, such as automatic code reloading, error handling, and preloading. By using Loadable Components, you can ensure that your application loads quickly and efficiently, providing a better user experience for your users.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'With the release of React 18, React.lazy and Suspense are now available for server-side rendering. However, prior to React 18, it was recommended to use Loadable Components for code-splitting in a server-side rendered app because React.lazy and Suspense were not available for server-side rendering. Loadable Components lets you render a dynamic import as a regular component. For example, you can use Loadable Components to load the OtherComponent in a separate bundle like this:


     Now OtherComponent will be loaded in a separated bundle
     Loadable Components provides additional benefits beyond just code-splitting, such as automatic code reloading, error handling, and preloading. By using Loadable Components, you can ensure that your application loads quickly and efficiently, providing a better user experience for your users.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":198}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is suspense component?',
    '<pre><code>        function UserProfile() {
          const user = use(fetchUser()); // throws a promise internally
          return &lt;div&gt;{user.name}&lt;/div&gt;;
        }

        function App() {
          return (
            &lt;Suspense fallback={&lt;div&gt;Loading user...&lt;/div&gt;}&gt;
              &lt;UserProfile /&gt;
            &lt;/Suspense&gt;
          );
        }
</code></pre>

React Suspense is a built-in feature that lets you defer rendering part of your component tree until some condition(asynchronous operation) is met—usually, data or code has finished loading. While waiting, Suspense lets you display a fallback UI like a spinner or placeholder.


     1. Lazy loading components uses suspense feature,


        If the module containing the dynamic import is not yet loaded by the time parent component renders, you must show some fallback content while you’re waiting for it to load using a loading indicator. This can be done using **Suspense** component.
    
        The above component shows fallback UI instead real component until `OtherComponent` is fully loaded.

     2. As an another example, suspend until async data(data fetching) is ready',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'React Suspense is a built-in feature that lets you defer rendering part of your component tree until some condition(asynchronous operation) is met—usually, data or code has finished loading. While waiting, Suspense lets you display a fallback UI like a spinner or placeholder.


     1. Lazy loading components uses suspense feature,


        If the module containing the dynamic import is not yet loaded by the time parent component renders, you must show some fallback content while you’re waiting for it to load using a loading indicator. This can be done using **Suspense** component.
    
        The above component shows fallback UI instead real component until `OtherComponent` is fully loaded.

     2. As an another example, suspend until async data(data fetching) is ready',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":199}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is route based code splitting?',
    '<pre><code>     import { BrowserRouter as Router, Route, Switch } from &quot;react-router-dom&quot;;
     import React, { Suspense, lazy } from &quot;react&quot;;

     const Home = lazy(() =&gt; import(&quot;./routes/Home&quot;));
     const About = lazy(() =&gt; import(&quot;./routes/About&quot;));

     const App = () =&gt; (
       &lt;Router&gt;
         &lt;Suspense fallback={&lt;div&gt;Loading...&lt;/div&gt;}&gt;
           &lt;Switch&gt;
             &lt;Route exact path=&quot;/&quot; component={Home} /&gt;
             &lt;Route path=&quot;/about&quot; component={About} /&gt;
           &lt;/Switch&gt;
         &lt;/Suspense&gt;
       &lt;/Router&gt;
     );</code></pre>

One of the best place to do code splitting is with routes. The entire page is going to re-render at once so users are unlikely to interact with other elements in the page at the same time. Due to this, the user experience won''t be disturbed.

     Let us take an example of route based website using libraries like React Router with React.lazy,


     In the above code, the code splitting will happen at each route level.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'One of the best place to do code splitting is with routes. The entire page is going to re-render at once so users are unlikely to interact with other elements in the page at the same time. Due to this, the user experience won''t be disturbed.

     Let us take an example of route based website using libraries like React Router with React.lazy,


     In the above code, the code splitting will happen at each route level.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":200}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is the purpose of default value in context?',
    '<pre><code>     const MyContext = React.createContext(defaultValue);</code></pre>

The defaultValue argument is only used when a component does not have a matching Provider above it in the tree. This can be helpful for testing components in isolation without wrapping them.

     Below code snippet provides default theme value as Luna.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The defaultValue argument is only used when a component does not have a matching Provider above it in the tree. This can be helpful for testing components in isolation without wrapping them.

     Below code snippet provides default theme value as Luna.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":201}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  );

-- Batch 21: Questions 201-210 (10 questions)
INSERT INTO questions (
  id, title, content, type, difficulty, points, options, correct_answer, 
  explanation, test_cases, hints, tags, metadata, stats, category_id, 
  learning_card_id, is_active, created_at, updated_at, topic_id, time_limit
) VALUES (
    gen_random_uuid(),
    'What is diffing algorithm?',
    'React needs to use algorithms to find out how to efficiently update the UI to match the most recent tree. The diffing algorithms is generating the minimum number of operations to transform one tree into another. However, the algorithms have a complexity in the order of O(n³) where n is the number of elements in the tree.

     In this case, displaying 1000 elements would require in the order of one billion comparisons. This is far too expensive. Instead, React implements a heuristic O(n) algorithm based on two assumptions:

     1. Two elements of different types will produce different trees.
     2. The developer can hint at which child elements may be stable across different renders with a key prop.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'React needs to use algorithms to find out how to efficiently update the UI to match the most recent tree. The diffing algorithms is generating the minimum number of operations to transform one tree into another. However, the algorithms have a complexity in the order of O(n³) where n is the number of elements in the tree.

     In this case, displaying 1000 elements would require in the order of one billion comparisons. This is far too expensive. Instead, React implements a heuristic O(n) algorithm based on two assumptions:

     1. Two elements of different types will produce different trees.
     2. The developer can hint at which child elements may be stable across different renders with a key prop.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":202}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What are the rules covered by diffing algorithm?',
    '<pre><code>     &lt;ul&gt;
       &lt;li key=&quot;2015&quot;&gt;Duke&lt;/li&gt;
       &lt;li key=&quot;2016&quot;&gt;Villanova&lt;/li&gt;
     &lt;/ul&gt;

     &lt;ul&gt;
       &lt;li key=&quot;2014&quot;&gt;Connecticut&lt;/li&gt;
       &lt;li key=&quot;2015&quot;&gt;Duke&lt;/li&gt;
       &lt;li key=&quot;2016&quot;&gt;Villanova&lt;/li&gt;
     &lt;/ul&gt;</code></pre>

When diffing two trees, React first compares the two root elements. The behavior is different depending on the types of the root elements. It covers the below rules during reconciliation algorithm,

     1. **Elements Of Different Types:**
        Whenever the root elements have different types, React will tear down the old tree and build the new tree from scratch. For example, elements <a> to <img>, or from <Article> to <Comment> of different types lead a full rebuild.
     2. **DOM Elements Of The Same Type:**
        When comparing two React DOM elements of the same type, React looks at the attributes of both, keeps the same underlying DOM node, and only updates the changed attributes. Lets take an example with same DOM elements except className attribute,


     3. **Component Elements Of The Same Type:**
        When a component updates, the instance stays the same, so that state is maintained across renders. React updates the props of the underlying component instance to match the new element, and calls componentWillReceiveProps() and componentWillUpdate() on the underlying instance. After that, the render() method is called and the diff algorithm recurses on the previous result and the new result.
     4. **Recursing On Children:**
        when recursing on the children of a DOM node, React just iterates over both lists of children at the same time and generates a mutation whenever there’s a difference. For example, when adding an element at the end of the children, converting between these two trees works well.


     5. **Handling keys:**
        React supports a key attribute. When children have keys, React uses the key to match children in the original tree with children in the subsequent tree. For example, adding a key can make the tree conversion efficient,',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'When diffing two trees, React first compares the two root elements. The behavior is different depending on the types of the root elements. It covers the below rules during reconciliation algorithm,

     1. **Elements Of Different Types:**
        Whenever the root elements have different types, React will tear down the old tree and build the new tree from scratch. For example, elements <a> to <img>, or from <Article> to <Comment> of different types lead a full rebuild.
     2. **DOM Elements Of The Same Type:**
        When comparing two React DOM elements of the same type, React looks at the attributes of both, keeps the same underlying DOM node, and only updates the changed attributes. Lets take an example with same DOM elements except className attribute,


     3. **Component Elements Of The Same Type:**
        When a component updates, the instance stays the same, so that state is maintained across renders. React updates the props of the underlying component instance to match the new element, and calls componentWillReceiveProps() and componentWillUpdate() on the underlying instance. After that, the render() method is called and the diff algorithm recurses on the previous result and the new result.
     4. **Recursing On Children:**
        when recursing on the children of a DOM node, React just iterates over both lists of children at the same time and generates a mutation whenever there’s a difference. For example, when adding an element at the end of the children, converting between these two trees works well.


     5. **Handling keys:**
        React supports a key attribute. When children have keys, React uses the key to match children in the original tree with children in the subsequent tree. For example, adding a key can make the tree conversion efficient,',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":203}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'When do you need to use refs?',
    'There are few use cases to go for refs,

     1. Managing focus, text selection, or media playback.
     2. Triggering imperative animations.
     3. Integrating with third-party DOM libraries.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'There are few use cases to go for refs,

     1. Managing focus, text selection, or media playback.
     2. Triggering imperative animations.
     3. Integrating with third-party DOM libraries.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":204}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'Must prop be named as render for render props?',
    '<pre><code>     Mouse.propTypes = {
       children: PropTypes.func.isRequired,
     };</code></pre>

Even though the pattern named render props, you don’t have to use a prop named render to use this pattern. i.e, Any prop that is a function that a component uses to know what to render is technically a “render prop”. Lets take an example with the children prop for render props,


     Actually children prop doesn’t need to be named in the list of “attributes” in JSX element. Instead, you can keep it directly inside element,


     While using this above technique(without any name), explicitly state that children should be a function in your propTypes.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Even though the pattern named render props, you don’t have to use a prop named render to use this pattern. i.e, Any prop that is a function that a component uses to know what to render is technically a “render prop”. Lets take an example with the children prop for render props,


     Actually children prop doesn’t need to be named in the list of “attributes” in JSX element. Instead, you can keep it directly inside element,


     While using this above technique(without any name), explicitly state that children should be a function in your propTypes.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":205}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What are the problems of using render props with pure components?',
    'If you create a function inside a render method, it negates the purpose of pure component. Because the shallow prop comparison will always return false for new props, and each render in this case will generate a new value for the render prop. You can solve this issue by defining the render function as instance method.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'If you create a function inside a render method, it negates the purpose of pure component. Because the shallow prop comparison will always return false for new props, and each render in this case will generate a new value for the render prop. You can solve this issue by defining the render function as instance method.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":206}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is windowing technique?',
    'Windowing is a technique that only renders a small subset of your rows at any given time, and can dramatically reduce the time it takes to re-render the components as well as the number of DOM nodes created. If your application renders long lists of data then this technique is recommended. Both react-window and react-virtualized are popular windowing libraries which provides several reusable components for displaying lists, grids, and tabular data.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Windowing is a technique that only renders a small subset of your rows at any given time, and can dramatically reduce the time it takes to re-render the components as well as the number of DOM nodes created. If your application renders long lists of data then this technique is recommended. Both react-window and react-virtualized are popular windowing libraries which provides several reusable components for displaying lists, grids, and tabular data.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":207}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How do you print falsy values in JSX?',
    'The falsy values such as false, null, undefined, and true are valid children but they don''t render anything. If you still want to display them then you need to convert it to string. Let''s take an example on how to convert to a string,',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The falsy values such as false, null, undefined, and true are valid children but they don''t render anything. If you still want to display them then you need to convert it to string. Let''s take an example on how to convert to a string,',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":208}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is the typical use case of portals?',
    'React Portals are primarily used to render UI components such as **modals, tooltips, dropdowns, hovercards, and notifications** outside of their parent component''s DOM tree. This helps avoid common CSS issues caused by parent elements, such as:

     *   `**overflow: hidden**` on parent elements clipping or hiding child elements like modals or tooltips,
     *   **stacking context and** `**z-index**` **conflicts** created by parent containers that prevent child elements from appearing above other content.

     That means, you need to visually “break out” of its container. By rendering these UI elements into a separate DOM node (often directly under `<body>`), portals ensure they appear above all other content and are not restricted by the parent’s CSS or layout constraints, resulting in correct positioning and visibility regardless of the parent’s styling.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'React Portals are primarily used to render UI components such as **modals, tooltips, dropdowns, hovercards, and notifications** outside of their parent component''s DOM tree. This helps avoid common CSS issues caused by parent elements, such as:

     *   `**overflow: hidden**` on parent elements clipping or hiding child elements like modals or tooltips,
     *   **stacking context and** `**z-index**` **conflicts** created by parent containers that prevent child elements from appearing above other content.

     That means, you need to visually “break out” of its container. By rendering these UI elements into a separate DOM node (often directly under `<body>`), portals ensure they appear above all other content and are not restricted by the parent’s CSS or layout constraints, resulting in correct positioning and visibility regardless of the parent’s styling.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":209}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How do you set default value for uncontrolled component?',
    '<pre><code>     render() {
       return (
         &lt;form onSubmit={this.handleSubmit}&gt;
           &lt;label&gt;
             User Name:
             &lt;input
               defaultValue=&quot;John&quot;
               type=&quot;text&quot;
               ref={this.input} /&gt;
           &lt;/label&gt;
           &lt;input type=&quot;submit&quot; value=&quot;Submit&quot; /&gt;
         &lt;/form&gt;
       );
     }</code></pre>

In React, the value attribute on form elements will override the value in the DOM. With an uncontrolled component, you might want React to specify the initial value, but leave subsequent updates uncontrolled. To handle this case, you can specify a **defaultValue** attribute instead of **value**.


     The same applies for `select` and `textArea` inputs. But you need to use **defaultChecked** for `checkbox` and `radio` inputs.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'In React, the value attribute on form elements will override the value in the DOM. With an uncontrolled component, you might want React to specify the initial value, but leave subsequent updates uncontrolled. To handle this case, you can specify a **defaultValue** attribute instead of **value**.


     The same applies for `select` and `textArea` inputs. But you need to use **defaultChecked** for `checkbox` and `radio` inputs.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":210}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is your favorite React stack?',
    'Even though the tech stack varies from developer to developer, the most popular stack is used in react boilerplate project code. It mainly uses Redux and redux-saga for state management and asynchronous side-effects, react-router for routing purpose, styled-components for styling react components, axios for invoking REST api, and other supported stack such as webpack, reselect, ESNext, Babel.
     You can clone the project https://github.com/react-boilerplate/react-boilerplate and start working on any new react project.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Even though the tech stack varies from developer to developer, the most popular stack is used in react boilerplate project code. It mainly uses Redux and redux-saga for state management and asynchronous side-effects, react-router for routing purpose, styled-components for styling react components, axios for invoking REST api, and other supported stack such as webpack, reselect, ESNext, Babel.
     You can clone the project https://github.com/react-boilerplate/react-boilerplate and start working on any new react project.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":211}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  );

-- Batch 22: Questions 211-220 (10 questions)
INSERT INTO questions (
  id, title, content, type, difficulty, points, options, correct_answer, 
  explanation, test_cases, hints, tags, metadata, stats, category_id, 
  learning_card_id, is_active, created_at, updated_at, topic_id, time_limit
) VALUES (
    gen_random_uuid(),
    'What is the difference between Real DOM and Virtual DOM?',
    'Below are the main differences between Real DOM and Virtual DOM,

     | Real DOM                             | Virtual DOM                          |
     | ------------------------------------ | ------------------------------------ |
     | Updates are slow                     | Updates are fast                     |
     | DOM manipulation is very expensive.  | DOM manipulation is very easy        |
     | You can update HTML directly.        | You Can’t directly update HTML       |
     | It causes too much of memory wastage | There is no memory wastage           |
     | Creates a new DOM if element updates | It updates the JSX if element update |',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Below are the main differences between Real DOM and Virtual DOM,

     | Real DOM                             | Virtual DOM                          |
     | ------------------------------------ | ------------------------------------ |
     | Updates are slow                     | Updates are fast                     |
     | DOM manipulation is very expensive.  | DOM manipulation is very easy        |
     | You can update HTML directly.        | You Can’t directly update HTML       |
     | It causes too much of memory wastage | There is no memory wastage           |
     | Creates a new DOM if element updates | It updates the JSX if element update |',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":212}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How to add Bootstrap to a react application?',
    '<pre><code>        npm install bootstrap</code></pre>

Bootstrap can be added to your React app in a three possible ways,

     1. Using the Bootstrap CDN:
        This is the easiest way to add bootstrap. Add both bootstrap CSS and JS resources in a head tag.
     2. Bootstrap as Dependency:
        If you are using a build tool or a module bundler such as Webpack, then this is the preferred option for adding Bootstrap to your React application
     3. React Bootstrap Package:
        In this case, you can add Bootstrap to our React app is by using a package that has rebuilt Bootstrap components to work particularly as React components. Below packages are popular in this category,
        1. react-bootstrap
        2. reactstrap',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Bootstrap can be added to your React app in a three possible ways,

     1. Using the Bootstrap CDN:
        This is the easiest way to add bootstrap. Add both bootstrap CSS and JS resources in a head tag.
     2. Bootstrap as Dependency:
        If you are using a build tool or a module bundler such as Webpack, then this is the preferred option for adding Bootstrap to your React application
     3. React Bootstrap Package:
        In this case, you can add Bootstrap to our React app is by using a package that has rebuilt Bootstrap components to work particularly as React components. Below packages are popular in this category,
        1. react-bootstrap
        2. reactstrap',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":213}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'Can you list down top websites or applications using react as front end framework?',
    'Below are the `top 10 websites` using React as their front-end framework,

     1. Facebook
     2. Uber
     3. Instagram
     4. WhatsApp
     5. Khan Academy
     6. Airbnb
     7. Dropbox
     8. Flipboard
     9. Netflix
     10. PayPal',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Below are the `top 10 websites` using React as their front-end framework,

     1. Facebook
     2. Uber
     3. Instagram
     4. WhatsApp
     5. Khan Academy
     6. Airbnb
     7. Dropbox
     8. Flipboard
     9. Netflix
     10. PayPal',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":214}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'Is it recommended to use CSS In JS technique in React?',
    'React does not have any opinion about how styles are defined but if you are a beginner then good starting point is to define your styles in a separate \\*.css file as usual and refer to them using className. This functionality is not part of React but came from third-party libraries. But If you want to try a different approach(CSS-In-JS) then styled-components library is a good option.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'React does not have any opinion about how styles are defined but if you are a beginner then good starting point is to define your styles in a separate \\*.css file as usual and refer to them using className. This functionality is not part of React but came from third-party libraries. But If you want to try a different approach(CSS-In-JS) then styled-components library is a good option.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":215}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'Do I need to rewrite all my class components with hooks?',
    'No. But you can try Hooks in a few components(or new components) without rewriting any existing code. Because there are no plans to remove classes in ReactJS.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'No. But you can try Hooks in a few components(or new components) without rewriting any existing code. Because there are no plans to remove classes in ReactJS.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":216}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is useEffect hook? How to fetch data with React Hooks?',
    '<pre><code>     import React from &quot;react&quot;;

     function App() {
       const [data, setData] = React.useState({ hits: [] });

       React.useEffect(() =&gt; {
         fetch(&quot;http://hn.algolia.com/api/v1/search?query=react&quot;)
           .then((response) =&gt; response.json())
           .then((data) =&gt; setData(data));
       }, []);

       return (
         &lt;ul&gt;
           {data.hits.map((item) =&gt; (
             &lt;li key={item.objectID}&gt;
               &lt;a href={item.url}&gt;{item.title}&lt;/a&gt;
             &lt;/li&gt;
           ))}
         &lt;/ul&gt;
       );
     }

     export default App;</code></pre>

The `useEffect` hook is a React Hook that lets you perform **side effects** in function components. Side effects are operations that interact with the outside world or system and aren''t directly related to rendering UI — such as fetching data, setting up subscriptions, timers, manually manipulating the DOM, etc.

     In function components, useEffect replaces the class component lifecycle methods(`componentDidMount`, `componentDidUpdate` and `componentWillUnmount`) with a single, unified API.     

     **Syntax**
     This effect hook can be used to fetch data from an API and to set the data in the local state of the component with the useState hook’s update function.

     Here is an example of fetching a list of ReactJS articles from an API using fetch.


     A popular way to simplify this is by using the library axios.

     We provided an empty array as second argument to the useEffect hook to avoid activating it on component updates. This way, it only fetches on component mount.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The `useEffect` hook is a React Hook that lets you perform **side effects** in function components. Side effects are operations that interact with the outside world or system and aren''t directly related to rendering UI — such as fetching data, setting up subscriptions, timers, manually manipulating the DOM, etc.

     In function components, useEffect replaces the class component lifecycle methods(`componentDidMount`, `componentDidUpdate` and `componentWillUnmount`) with a single, unified API.     

     **Syntax**
     This effect hook can be used to fetch data from an API and to set the data in the local state of the component with the useState hook’s update function.

     Here is an example of fetching a list of ReactJS articles from an API using fetch.


     A popular way to simplify this is by using the library axios.

     We provided an empty array as second argument to the useEffect hook to avoid activating it on component updates. This way, it only fetches on component mount.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":217}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'Is Hooks cover all use cases for classes?',
    'Hooks doesn''t cover all use cases of classes but there is a plan to add them soon. Currently there are no Hook equivalents to the uncommon **getSnapshotBeforeUpdate** and **componentDidCatch** lifecycles yet.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Hooks doesn''t cover all use cases of classes but there is a plan to add them soon. Currently there are no Hook equivalents to the uncommon **getSnapshotBeforeUpdate** and **componentDidCatch** lifecycles yet.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":218}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is the stable release for hooks support?',
    'React includes a stable implementation of React Hooks in 16.8 release for below packages

     1. React DOM
     2. React DOM Server
     3. React Test Renderer
     4. React Shallow Renderer',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'React includes a stable implementation of React Hooks in 16.8 release for below packages

     1. React DOM
     2. React DOM Server
     3. React Test Renderer
     4. React Shallow Renderer',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":219}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'Why do we use array destructuring (square brackets notation) in `useState`?',
    '<pre><code>     const [user, setUser] = useState(&quot;userProfile&quot;);</code></pre>

When we declare a state variable with `useState`, it returns a pair — an array with two items. The first item is the current value, and the second is a function that updates the value. Using [0] and [1] to access them is a bit confusing because they have a specific meaning. This is why we use array destructuring instead.

     For example, the array index access would look as follows:


     Whereas with array destructuring the variables can be accessed as follows:',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'When we declare a state variable with `useState`, it returns a pair — an array with two items. The first item is the current value, and the second is a function that updates the value. Using [0] and [1] to access them is a bit confusing because they have a specific meaning. This is why we use array destructuring instead.

     For example, the array index access would look as follows:


     Whereas with array destructuring the variables can be accessed as follows:',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":220}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What are the sources used for introducing hooks?',
    'Hooks got the ideas from several different sources. Below are some of them,

     1. Previous experiments with functional APIs in the react-future repository
     2. Community experiments with render prop APIs such as Reactions Component
     3. State variables and state cells in DisplayScript.
     4. Subscriptions in Rx.
     5. Reducer components in ReasonReact.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Hooks got the ideas from several different sources. Below are some of them,

     1. Previous experiments with functional APIs in the react-future repository
     2. Community experiments with render prop APIs such as Reactions Component
     3. State variables and state cells in DisplayScript.
     4. Subscriptions in Rx.
     5. Reducer components in ReasonReact.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":221}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  );

-- Batch 23: Questions 221-230 (10 questions)
INSERT INTO questions (
  id, title, content, type, difficulty, points, options, correct_answer, 
  explanation, test_cases, hints, tags, metadata, stats, category_id, 
  learning_card_id, is_active, created_at, updated_at, topic_id, time_limit
) VALUES (
    gen_random_uuid(),
    'How do you access imperative API of web components?',
    'Web Components often expose an imperative API to implement its functions. You will need to use a **ref** to interact with the DOM node directly if you want to access imperative API of a web component. But if you are using third-party Web Components, the best solution is to write a React component that behaves as a **wrapper** for your Web Component.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Web Components often expose an imperative API to implement its functions. You will need to use a **ref** to interact with the DOM node directly if you want to access imperative API of a web component. But if you are using third-party Web Components, the best solution is to write a React component that behaves as a **wrapper** for your Web Component.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":222}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is formik?',
    'Formik is a small react form library that helps you with the three major problems,

     1. Getting values in and out of form state
     2. Validation and error messages
     3. Handling form submission',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Formik is a small react form library that helps you with the three major problems,

     1. Getting values in and out of form state
     2. Validation and error messages
     3. Handling form submission',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":223}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What are typical middleware choices for handling asynchronous calls in Redux?',
    'Some of the popular middleware choices for handling asynchronous calls in Redux eco system are `Redux Thunk, Redux Promise, Redux Saga`.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Some of the popular middleware choices for handling asynchronous calls in Redux eco system are `Redux Thunk, Redux Promise, Redux Saga`.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":224}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'Do browsers understand JSX code?',
    'No, browsers can''t understand JSX code. You need a transpiler to convert your JSX to regular Javascript that browsers can understand. The most widely used transpiler right now is Babel.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'No, browsers can''t understand JSX code. You need a transpiler to convert your JSX to regular Javascript that browsers can understand. The most widely used transpiler right now is Babel.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":225}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'Describe about data flow in react?',
    'React implements one-way reactive data flow using props which reduce boilerplate and is easier to understand than traditional two-way data binding.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'React implements one-way reactive data flow using props which reduce boilerplate and is easier to understand than traditional two-way data binding.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":226}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is MobX?',
    '<pre><code>     npm install mobx --save
     npm install mobx-react --save</code></pre>

MobX is a simple, scalable and battle tested state management solution for applying functional reactive programming (TFRP). For ReactJS application, you need to install below packages,',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'MobX is a simple, scalable and battle tested state management solution for applying functional reactive programming (TFRP). For ReactJS application, you need to install below packages,',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":227}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What are the differences between Redux and MobX?',
    'Below are the main differences between Redux and MobX,

     | Topic         | Redux                                                         | MobX                                                                   |
     | ------------- | ------------------------------------------------------------- | ---------------------------------------------------------------------- |
     | Definition    | It is a javascript library for managing the application state | It is a library for reactively managing the state of your applications |
     | Programming   | It is mainly written in ES6                                   | It is written in JavaScript(ES5)                                       |
     | Data Store    | There is only one large store exist for data storage          | There is more than one store for storage                               |
     | Usage         | Mainly used for large and complex applications                | Used for simple applications                                           |
     | Performance   | Need to be improved                                           | Provides better performance                                            |
     | How it stores | Uses JS Object to store                                       | Uses observable to store the data                                      |',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Below are the main differences between Redux and MobX,

     | Topic         | Redux                                                         | MobX                                                                   |
     | ------------- | ------------------------------------------------------------- | ---------------------------------------------------------------------- |
     | Definition    | It is a javascript library for managing the application state | It is a library for reactively managing the state of your applications |
     | Programming   | It is mainly written in ES6                                   | It is written in JavaScript(ES5)                                       |
     | Data Store    | There is only one large store exist for data storage          | There is more than one store for storage                               |
     | Usage         | Mainly used for large and complex applications                | Used for simple applications                                           |
     | Performance   | Need to be improved                                           | Provides better performance                                            |
     | How it stores | Uses JS Object to store                                       | Uses observable to store the data                                      |',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":228}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'Should I learn ES6 before learning ReactJS?',
    '<pre><code>        // es 5
        var users = usersList.map(function (user) {
          return &lt;li&gt;{user.name}&lt;/li&gt;;
        });
        // es 6
        const users = usersList.map((user) =&gt; &lt;li&gt;{user.name}&lt;/li&gt;);</code></pre>

No, you don’t have to learn es2015/es6 to learn react. But you may find many resources or React ecosystem uses ES6 extensively. Let''s see some of the frequently used ES6 features,

     1. **Destructuring:** To get props and use them in a component


     2. **Spread operator:** Helps in passing props down into a component


     3. **Arrow functions:** Makes compact syntax',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'No, you don’t have to learn es2015/es6 to learn react. But you may find many resources or React ecosystem uses ES6 extensively. Let''s see some of the frequently used ES6 features,

     1. **Destructuring:** To get props and use them in a component


     2. **Spread operator:** Helps in passing props down into a component


     3. **Arrow functions:** Makes compact syntax',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":229}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is Concurrent Rendering?',
    '<pre><code>     // 1. Part of an app by wrapping with ConcurrentMode
     &lt;React.unstable_ConcurrentMode&gt;
       &lt;Something /&gt;
     &lt;/React.unstable_ConcurrentMode&gt;;

     // 2. Whole app using createRoot
     ReactDOM.unstable_createRoot(domNode).render(&lt;App /&gt;);</code></pre>

The Concurrent rendering makes React apps to be more responsive by rendering component trees without blocking the main UI thread. It allows React to interrupt a long-running render to handle a high-priority event. i.e, When you enabled concurrent Mode, React will keep an eye on other tasks that need to be done, and if there''s something with a higher priority it will pause what it is currently rendering and let the other task finish first. You can enable this in two ways,',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The Concurrent rendering makes React apps to be more responsive by rendering component trees without blocking the main UI thread. It allows React to interrupt a long-running render to handle a high-priority event. i.e, When you enabled concurrent Mode, React will keep an eye on other tasks that need to be done, and if there''s something with a higher priority it will pause what it is currently rendering and let the other task finish first. You can enable this in two ways,',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":230}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is the difference between async mode and concurrent mode?',
    'Both refers the same thing. Previously concurrent Mode being referred to as "Async Mode" by React team. The name has been changed to highlight React’s ability to perform work on different priority levels. So it avoids the confusion from other approaches to Async Rendering.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Both refers the same thing. Previously concurrent Mode being referred to as "Async Mode" by React team. The name has been changed to highlight React’s ability to perform work on different priority levels. So it avoids the confusion from other approaches to Async Rendering.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":231}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  );

-- Batch 24: Questions 231-240 (10 questions)
INSERT INTO questions (
  id, title, content, type, difficulty, points, options, correct_answer, 
  explanation, test_cases, hints, tags, metadata, stats, category_id, 
  learning_card_id, is_active, created_at, updated_at, topic_id, time_limit
) VALUES (
    gen_random_uuid(),
    'Can I use javascript urls in react16.9?',
    '<pre><code>     const companyProfile = {
       website: &quot;javascript: alert(&#039;Your website is hacked&#039;)&quot;,
     };
     // It will log a warning
     &lt;a href={companyProfile.website}&gt;More details&lt;/a&gt;;</code></pre>

Yes, you can use javascript: URLs but it will log a warning in the console. Because URLs starting with javascript: are dangerous by including unsanitized output in a tag like `<a href>` and create a security hole.


     Remember that the future versions will throw an error for javascript URLs.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Yes, you can use javascript: URLs but it will log a warning in the console. Because URLs starting with javascript: are dangerous by including unsanitized output in a tag like `<a href>` and create a security hole.


     Remember that the future versions will throw an error for javascript URLs.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":232}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is the purpose of eslint plugin for hooks?',
    'The ESLint plugin enforces rules of Hooks to avoid bugs. It assumes that any function starting with ”use” and a capital letter right after it is a Hook. In particular, the rule enforces that,

     1. Calls to Hooks are either inside a PascalCase function (assumed to be a component) or another useSomething function (assumed to be a custom Hook).
     2. Hooks are called in the same order on every render.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The ESLint plugin enforces rules of Hooks to avoid bugs. It assumes that any function starting with ”use” and a capital letter right after it is a Hook. In particular, the rule enforces that,

     1. Calls to Hooks are either inside a PascalCase function (assumed to be a component) or another useSomething function (assumed to be a custom Hook).
     2. Hooks are called in the same order on every render.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":233}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is the difference between Imperative and Declarative in React?',
    '<pre><code>     if (this.state.liked) {
       return &lt;blueLike /&gt;;
     } else {
       return &lt;greyLike /&gt;;
     }</code></pre>

Imagine a simple UI component, such as a "Like" button. When you tap it, it turns blue if it was previously grey, and grey if it was previously blue.

     The imperative way of doing this would be:


     Basically, you have to check what is currently on the screen and handle all the changes necessary to redraw it with the current state, including undoing the changes from the previous state. You can imagine how complex this could be in a real-world scenario.

     In contrast, the declarative approach would be:


     Because the declarative approach separates concerns, this part of it only needs to handle how the UI should look in a specific state, and is therefore much simpler to understand.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Imagine a simple UI component, such as a "Like" button. When you tap it, it turns blue if it was previously grey, and grey if it was previously blue.

     The imperative way of doing this would be:


     Basically, you have to check what is currently on the screen and handle all the changes necessary to redraw it with the current state, including undoing the changes from the previous state. You can imagine how complex this could be in a real-world scenario.

     In contrast, the declarative approach would be:


     Because the declarative approach separates concerns, this part of it only needs to handle how the UI should look in a specific state, and is therefore much simpler to understand.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":234}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What are the benefits of using TypeScript with ReactJS?',
    'Below are some of the benefits of using TypeScript with ReactJS,

     1. It is possible to use latest JavaScript features
     2. Use of interfaces for complex type definitions
     3. IDEs such as VS Code was made for TypeScript
     4. Avoid bugs with the ease of readability and Validation',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Below are some of the benefits of using TypeScript with ReactJS,

     1. It is possible to use latest JavaScript features
     2. Use of interfaces for complex type definitions
     3. IDEs such as VS Code was made for TypeScript
     4. Avoid bugs with the ease of readability and Validation',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":235}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How do you make sure that user remains authenticated on page refresh while using Context API State Management?',
    '<pre><code>     const loadUser = async () =&gt; {
       const token = sessionStorage.getItem(&quot;token&quot;);

       if (!token) {
         dispatch({
           type: ERROR,
         });
       }
       setAuthToken(token);

       try {
         const res = await axios(&quot;/api/auth&quot;);

         dispatch({
           type: USER_LOADED,
           payload: res.data.data,
         });
       } catch (err) {
         console.error(err);
       }
     };</code></pre>

When a user logs in and reload, to persist the state generally we add the load user action in the useEffect hooks in the main App.js. While using Redux, loadUser action can be easily accessed.

     **App.js**


     - But while using **Context API**, to access context in App.js, wrap the AuthState in index.js so that App.js can access the auth context. Now whenever the page reloads, no matter what route you are on, the user will be authenticated as **loadUser** action will be triggered on each re-render.

     **index.js**


     **App.js**


     **loadUser**',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'When a user logs in and reload, to persist the state generally we add the load user action in the useEffect hooks in the main App.js. While using Redux, loadUser action can be easily accessed.

     **App.js**


     - But while using **Context API**, to access context in App.js, wrap the AuthState in index.js so that App.js can access the auth context. Now whenever the page reloads, no matter what route you are on, the user will be authenticated as **loadUser** action will be triggered on each re-render.

     **index.js**


     **App.js**


     **loadUser**',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":236}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What are the benefits of new JSX transform?',
    'There are three major benefits of new JSX transform,

     1. It is possible to use JSX without importing React packages
     2. The compiled output might improve the bundle size in a small amount
     3. The future improvements provides the flexibility to reduce the number of concepts to learn React.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'There are three major benefits of new JSX transform,

     1. It is possible to use JSX without importing React packages
     2. The compiled output might improve the bundle size in a small amount
     3. The future improvements provides the flexibility to reduce the number of concepts to learn React.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":237}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How is the new JSX transform different from old transform??',
    '<pre><code>     import { jsx as _jsx } from &quot;react/jsx-runtime&quot;;

     function App() {
       return _jsx(&quot;h1&quot;, { children: &quot;Good morning!!&quot; });
     }</code></pre>

The new JSX transform doesn’t require React to be in scope. i.e, You don''t need to import React package for simple scenarios.

     Let''s take an example to look at the main differences between the old and the new transform,

     **Old Transform:**


     Now JSX transform convert the above code into regular JavaScript as below,


     **New Transform:**

     The new JSX transform doesn''t require any React imports


     Under the hood JSX transform compiles to below code


     **Note:** You still need to import React to use Hooks.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The new JSX transform doesn’t require React to be in scope. i.e, You don''t need to import React package for simple scenarios.

     Let''s take an example to look at the main differences between the old and the new transform,

     **Old Transform:**


     Now JSX transform convert the above code into regular JavaScript as below,


     **New Transform:**

     The new JSX transform doesn''t require any React imports


     Under the hood JSX transform compiles to below code


     **Note:** You still need to import React to use Hooks.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":238}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What are React Server components?',
    'React Server Component is a way to write React component that gets rendered in the server-side with the purpose of improving React app performance. These components allow us to load components from the backend.

     **Note:** React Server Components is still under development and not recommended for production yet.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'React Server Component is a way to write React component that gets rendered in the server-side with the purpose of improving React app performance. These components allow us to load components from the backend.

     **Note:** React Server Components is still under development and not recommended for production yet.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":239}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is prop drilling?',
    'Prop Drilling is the process by which you pass data from one component of the React Component tree to another by going through other components that do not need the data but only help in passing it around.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Prop Drilling is the process by which you pass data from one component of the React Component tree to another by going through other components that do not need the data but only help in passing it around.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":240}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is the difference between useState and useRef hook?',
    '1. useState causes components to re-render after state updates whereas useRef doesn’t cause a component to re-render when the value or state changes.
        Essentially, useRef is like a “box” that can hold a mutable value in its (`.current`) property.
     2. useState allows us to update the state inside components. While useRef allows referencing DOM elements and tracking values.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    '1. useState causes components to re-render after state updates whereas useRef doesn’t cause a component to re-render when the value or state changes.
        Essentially, useRef is like a “box” that can hold a mutable value in its (`.current`) property.
     2. useState allows us to update the state inside components. While useRef allows referencing DOM elements and tracking values.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":241}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  );

-- Batch 25: Questions 241-250 (10 questions)
INSERT INTO questions (
  id, title, content, type, difficulty, points, options, correct_answer, 
  explanation, test_cases, hints, tags, metadata, stats, category_id, 
  learning_card_id, is_active, created_at, updated_at, topic_id, time_limit
) VALUES (
    gen_random_uuid(),
    'What is a wrapper component?',
    '<pre><code>     &lt;MessageWrapperWithTitle title=&quot;My Message&quot; text=&quot;Hello World&quot; /&gt;</code></pre>

A wrapper in React is a component that wraps or surrounds another component or group of components. It can be used for a variety of purposes such as adding additional functionality, styling, or layout to the wrapped components.

     For example, consider a simple component that displays a message:


     We can create a wrapper component that will add a border to the message component:


     Now we can use the MessageWrapper component instead of the Message component and the message will be displayed with a border:


     Wrapper component can also accept its own props and pass them down to the wrapped component, for example, we can create a wrapper component that will add a title to the message component:


     Now we can use the MessageWrapperWithTitle component and pass title props:


     This way, the wrapper component can add additional functionality, styling, or layout to the wrapped component while keeping the wrapped component simple and reusable.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'A wrapper in React is a component that wraps or surrounds another component or group of components. It can be used for a variety of purposes such as adding additional functionality, styling, or layout to the wrapped components.

     For example, consider a simple component that displays a message:


     We can create a wrapper component that will add a border to the message component:


     Now we can use the MessageWrapper component instead of the Message component and the message will be displayed with a border:


     Wrapper component can also accept its own props and pass them down to the wrapped component, for example, we can create a wrapper component that will add a title to the message component:


     Now we can use the MessageWrapperWithTitle component and pass title props:


     This way, the wrapper component can add additional functionality, styling, or layout to the wrapped component while keeping the wrapped component simple and reusable.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":242}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What are the differences between useEffect and useLayoutEffect hooks?',
    'useEffect and useLayoutEffect are both React hooks that can be used to synchronize a component with an external system, such as a browser API or a third-party library. However, there are some key differences between the two:

     - Timing: useEffect runs after the browser has finished painting, while useLayoutEffect runs synchronously before the browser paints. This means that useLayoutEffect can be used to measure and update layout in a way that feels more synchronous to the user.

     - Browser Paint: useEffect allows browser to paint the changes before running the effect, hence it may cause some visual flicker. useLayoutEffect synchronously runs the effect before browser paints and hence it will avoid visual flicker.

     - Execution Order: The order in which multiple useEffect hooks are executed is determined by React and may not be predictable. However, the order in which multiple useLayoutEffect hooks are executed is determined by the order in which they were called.

     - Error handling: useEffect has a built-in mechanism for handling errors that occur during the execution of the effect, so that it does not crash the entire application. useLayoutEffect does not have this mechanism, and errors that occur during the execution of the effect will crash the entire application.

     In general, it''s recommended to use useEffect as much as possible, because it is more performant and less prone to errors. useLayoutEffect should only be used when you need to measure or update layout, and you can''t achieve the same result using useEffect.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'useEffect and useLayoutEffect are both React hooks that can be used to synchronize a component with an external system, such as a browser API or a third-party library. However, there are some key differences between the two:

     - Timing: useEffect runs after the browser has finished painting, while useLayoutEffect runs synchronously before the browser paints. This means that useLayoutEffect can be used to measure and update layout in a way that feels more synchronous to the user.

     - Browser Paint: useEffect allows browser to paint the changes before running the effect, hence it may cause some visual flicker. useLayoutEffect synchronously runs the effect before browser paints and hence it will avoid visual flicker.

     - Execution Order: The order in which multiple useEffect hooks are executed is determined by React and may not be predictable. However, the order in which multiple useLayoutEffect hooks are executed is determined by the order in which they were called.

     - Error handling: useEffect has a built-in mechanism for handling errors that occur during the execution of the effect, so that it does not crash the entire application. useLayoutEffect does not have this mechanism, and errors that occur during the execution of the effect will crash the entire application.

     In general, it''s recommended to use useEffect as much as possible, because it is more performant and less prone to errors. useLayoutEffect should only be used when you need to measure or update layout, and you can''t achieve the same result using useEffect.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":243}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What are the differences between Functional and Class Components?',
    '<pre><code>     function Child(props) {
       return (
         &lt;h1&gt;
           This is a child component and the component name is{props.name}
         &lt;/h1&gt;
       );
     }

     function Parent() {
       return (
           &lt;Child name=&quot;First child component&quot; /&gt;
           &lt;Child name=&quot;Second child component&quot; /&gt;
       );
     }</code></pre>

There are two different ways to create components in ReactJS. The main differences are listed down as below,

     ## 1. Syntax:

     The class components uses ES6 classes to create the components. It uses `render` function to display the HTML content in the webpage.

     The syntax for class component looks like as below.


     **Note:** The **Pascal Case** is the recommended approach to provide naming to a component.

     Functional component has been improved over the years with some added features like Hooks. Here is a syntax for functional component.


     ## 2. State:

     State contains information or data about a component which may change over time.

     In class component, you can update the state when a user interacts with it or server updates the data using the `setState()` method. The initial state is going to be assigned in the `Constructor()` method using the `this.state` object and it is possible to assign different data types such as string, boolean, numbers, etc.

     **A simple example showing how we use the setState() and constructor():**


     You didn''t use state in functional components because it was only supported in class components. But over the years hooks have been implemented in functional components which enables to use state too.

     The `useState()` hook can used to implement state in functional components. It returns an array with two items: the first item is current state and the next one is a function (setState) that updates the value of the current state.

     Let''s see an example to demonstrate the state in functional components,


     ## 3. Props:

     Props are referred to as "properties". The props are passed into React component just like arguments passed to a function. In other words, they are similar to HTML attributes.

     The props are accessible in child class component using `this.props` as shown in below example,


     Props in functional components are similar to that of the class components but the difference is the absence of ''this'' keyword.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'There are two different ways to create components in ReactJS. The main differences are listed down as below,

     ## 1. Syntax:

     The class components uses ES6 classes to create the components. It uses `render` function to display the HTML content in the webpage.

     The syntax for class component looks like as below.


     **Note:** The **Pascal Case** is the recommended approach to provide naming to a component.

     Functional component has been improved over the years with some added features like Hooks. Here is a syntax for functional component.


     ## 2. State:

     State contains information or data about a component which may change over time.

     In class component, you can update the state when a user interacts with it or server updates the data using the `setState()` method. The initial state is going to be assigned in the `Constructor()` method using the `this.state` object and it is possible to assign different data types such as string, boolean, numbers, etc.

     **A simple example showing how we use the setState() and constructor():**


     You didn''t use state in functional components because it was only supported in class components. But over the years hooks have been implemented in functional components which enables to use state too.

     The `useState()` hook can used to implement state in functional components. It returns an array with two items: the first item is current state and the next one is a function (setState) that updates the value of the current state.

     Let''s see an example to demonstrate the state in functional components,


     ## 3. Props:

     Props are referred to as "properties". The props are passed into React component just like arguments passed to a function. In other words, they are similar to HTML attributes.

     The props are accessible in child class component using `this.props` as shown in below example,


     Props in functional components are similar to that of the class components but the difference is the absence of ''this'' keyword.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":244}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is strict mode in React?',
    '<pre><code>     import { StrictMode } from &quot;react&quot;;

     function App() {
       return (
           &lt;Header /&gt;
           &lt;StrictMode&gt;
               &lt;ComponentOne /&gt;
               &lt;ComponentTwo /&gt;
           &lt;/StrictMode&gt;
           &lt;Header /&gt;
       );
     }</code></pre>

`React.StrictMode` is a useful component for highlighting potential problems in an application. Just like `<Fragment>`, `<StrictMode>` does not render any extra DOM elements. It activates additional checks and warnings for its descendants. These checks apply for _development mode_ only.


     In the example above, the _strict mode_ checks apply to `<ComponentOne>` and `<ComponentTwo>` components only. i.e., Part of the application only.

     **Note:** Frameworks such as NextJS has this flag enabled by default.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    '`React.StrictMode` is a useful component for highlighting potential problems in an application. Just like `<Fragment>`, `<StrictMode>` does not render any extra DOM elements. It activates additional checks and warnings for its descendants. These checks apply for _development mode_ only.


     In the example above, the _strict mode_ checks apply to `<ComponentOne>` and `<ComponentTwo>` components only. i.e., Part of the application only.

     **Note:** Frameworks such as NextJS has this flag enabled by default.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":245}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is the benefit of strict mode?',
    'The <StrictMode> will be helpful in the below cases,

     1. To find the bugs caused by impure rendering where the components will re-render twice.
     2. To find the bugs caused by missing cleanup of effects where the components will re-run effects one more extra time.
     3. Identifying components with **unsafe lifecycle methods**.
     4. Warning about **legacy string ref** API usage.
     5. Detecting unexpected **side effects**.
     6. Detecting **legacy context** API.
     7. Warning about deprecated **findDOMNode** usage',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The <StrictMode> will be helpful in the below cases,

     1. To find the bugs caused by impure rendering where the components will re-render twice.
     2. To find the bugs caused by missing cleanup of effects where the components will re-run effects one more extra time.
     3. Identifying components with **unsafe lifecycle methods**.
     4. Warning about **legacy string ref** API usage.
     5. Detecting unexpected **side effects**.
     6. Detecting **legacy context** API.
     7. Warning about deprecated **findDOMNode** usage',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":246}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'Why does strict mode render twice in React?',
    '<pre><code>     const root = createRoot(document.getElementById(&quot;root&quot;));
     root.render(&lt;App /&gt;);</code></pre>

StrictMode renders components twice in development mode(not production) in order to detect any problems with your code and warn you about those problems. This is used to detect accidental side effects in the render phase. If you used `create-react-app` development tool then it automatically enables StrictMode by default.


     If you want to disable this behavior then you can simply remove `strict` mode.


     To detect side effects the following functions are invoked twice:

     1. Function component bodies, excluding the code inside event handlers.
     2. Functions passed to `useState`, `useMemo`, or `useReducer` (any other Hook)
     3. Class component''s `constructor`, `render`, and `shouldComponentUpdate` methods
     4. Class component static `getDerivedStateFromProps` method
     5. State updater functions',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'StrictMode renders components twice in development mode(not production) in order to detect any problems with your code and warn you about those problems. This is used to detect accidental side effects in the render phase. If you used `create-react-app` development tool then it automatically enables StrictMode by default.


     If you want to disable this behavior then you can simply remove `strict` mode.


     To detect side effects the following functions are invoked twice:

     1. Function component bodies, excluding the code inside event handlers.
     2. Functions passed to `useState`, `useMemo`, or `useReducer` (any other Hook)
     3. Class component''s `constructor`, `render`, and `shouldComponentUpdate` methods
     4. Class component static `getDerivedStateFromProps` method
     5. State updater functions',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":247}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What are the rules of JSX?',
    'The below 3 rules needs to be followed while using JSX in a react application.

     1. **Return a single root element**:
        If you are returning multiple elements from a component, wrap them in a single parent element. Otherwise you will receive the below error in your browser console.

        `html Adjacent JSX elements must be wrapped in an enclosing tag.`

     2. **All the tags needs to be closed:**
        Unlike HTML, all tags needs to closed explicitly with in JSX. This rule applies for self-closing tags(like hr, br and img tags) as well.
     3. **Use camelCase naming:**
        It is suggested to use camelCase naming for attributes in JSX. For example, the common attributes of HTML elements such as `class`, `tabindex` will be used as `className` and `tabIndex`.  
        **Note:** There is an exception for `aria-*` and `data-*` attributes which should be lower cased all the time.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The below 3 rules needs to be followed while using JSX in a react application.

     1. **Return a single root element**:
        If you are returning multiple elements from a component, wrap them in a single parent element. Otherwise you will receive the below error in your browser console.

        `html Adjacent JSX elements must be wrapped in an enclosing tag.`

     2. **All the tags needs to be closed:**
        Unlike HTML, all tags needs to closed explicitly with in JSX. This rule applies for self-closing tags(like hr, br and img tags) as well.
     3. **Use camelCase naming:**
        It is suggested to use camelCase naming for attributes in JSX. For example, the common attributes of HTML elements such as `class`, `tabindex` will be used as `className` and `tabIndex`.  
        **Note:** There is an exception for `aria-*` and `data-*` attributes which should be lower cased all the time.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":248}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is the reason behind multiple JSX tags to be wrapped?',
    'Behind the scenes, JSX is transformed into plain javascript objects. It is not possible to return two or more objects from a function without wrapping into an array. This is the reason you can''t simply return two or more JSX tags from a function without
      wrapping them into a single parent tag or a Fragment.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Behind the scenes, JSX is transformed into plain javascript objects. It is not possible to return two or more objects from a function without wrapping into an array. This is the reason you can''t simply return two or more JSX tags from a function without
      wrapping them into a single parent tag or a Fragment.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":249}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How do you prevent mutating array variables?',
    'The preexisting variables outside of the function scope including state, props and context leads to a mutation and they result in unpredictable bugs during the rendering stage. The below points should be taken care while working with arrays variables.

      1. You need to take copy of the original array and perform array operations on it for the rendering purpose. This is called local mutation.
      2. Avoid triggering mutation methods such as push, pop, sort and reverse methods on original array. It is safe to use filter, map and slice method because they create a new array.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The preexisting variables outside of the function scope including state, props and context leads to a mutation and they result in unpredictable bugs during the rendering stage. The below points should be taken care while working with arrays variables.

      1. You need to take copy of the original array and perform array operations on it for the rendering purpose. This is called local mutation.
      2. Avoid triggering mutation methods such as push, pop, sort and reverse methods on original array. It is safe to use filter, map and slice method because they create a new array.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":250}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What are capture phase events?',
    '<pre><code>         &lt;button onClick={(e) =&gt; e.stopPropagation()} /&gt;
         &lt;button onClick={(e) =&gt; e.stopPropagation()} /&gt;</code></pre>

The `onClickCapture` React event is helpful to catch all the events of child elements irrespective of event propagation logic or even if the events propagation stopped. This is useful if you need to log every click events for analytics purpose.

     For example, the below code triggers the click event of parent first followed by second level child eventhough leaf child button elements stops the propagation.


     The event propagation for the above code snippet happens in the following order:

     1. It travels downwards in the DOM tree by calling all `onClickCapture` event handlers.
     2. It executes `onClick` event handler on the target element.
     3. It travels upwards in the DOM tree by call all `onClick` event handlers above to it.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The `onClickCapture` React event is helpful to catch all the events of child elements irrespective of event propagation logic or even if the events propagation stopped. This is useful if you need to log every click events for analytics purpose.

     For example, the below code triggers the click event of parent first followed by second level child eventhough leaf child button elements stops the propagation.


     The event propagation for the above code snippet happens in the following order:

     1. It travels downwards in the DOM tree by calling all `onClickCapture` event handlers.
     2. It executes `onClick` event handler on the target element.
     3. It travels upwards in the DOM tree by call all `onClick` event handlers above to it.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":251}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  );

-- Batch 26: Questions 251-260 (10 questions)
INSERT INTO questions (
  id, title, content, type, difficulty, points, options, correct_answer, 
  explanation, test_cases, hints, tags, metadata, stats, category_id, 
  learning_card_id, is_active, created_at, updated_at, topic_id, time_limit
) VALUES (
    gen_random_uuid(),
    'How does React updates screen in an application?',
    '<pre><code>        import { createRoot } from &quot;react-dom/client&quot;;

        const root = createRoot(document.getElementById(&quot;root&quot;));
        root.render(&lt;App /&gt;);</code></pre>

React updates UI in three steps,

     1. **Triggering or initiating a render:** The component is going to triggered for render in two ways.

        1. **Initial render:** When the app starts, you can trigger the initial render by calling `creatRoot` with the target DOM node followed by invoking component''s `render` method. For example, the following code snippet renders `App` component on root DOM node.


        2. **Re-render when the state updated:** When you update the component state using the state setter function, the componen''t state automatically queues for a render.

     2. **Rendering components:** After triggering a render, React will call your components to display them on the screen. React will call the root component for initial render and call the function component whose state update triggered the render. This is a recursive process for all nested components of the target component.

     3. **Commit changes to DOM:** After calling components, React will modify the DOM for initial render using `appendChild()` DOM API and apply minimal necessary DOM updates for re-renders based on differences between rerenders.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'React updates UI in three steps,

     1. **Triggering or initiating a render:** The component is going to triggered for render in two ways.

        1. **Initial render:** When the app starts, you can trigger the initial render by calling `creatRoot` with the target DOM node followed by invoking component''s `render` method. For example, the following code snippet renders `App` component on root DOM node.


        2. **Re-render when the state updated:** When you update the component state using the state setter function, the componen''t state automatically queues for a render.

     2. **Rendering components:** After triggering a render, React will call your components to display them on the screen. React will call the root component for initial render and call the function component whose state update triggered the render. This is a recursive process for all nested components of the target component.

     3. **Commit changes to DOM:** After calling components, React will modify the DOM for initial render using `appendChild()` DOM API and apply minimal necessary DOM updates for re-renders based on differences between rerenders.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":252}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How does React batch multiple state updates?',
    '<pre><code>      import { useState } from &quot;react&quot;;

      export default function BatchingState() {
        const [count, setCount] = useState(0);
        const [message, setMessage] = useState(&quot;batching&quot;);

        console.log(&quot;Application Rendered&quot;);

        const handleUsers = () =&gt; {
          fetch(&quot;https://jsonplaceholder.typicode.com/users/1&quot;).then(() =&gt; {
            // Automatic Batching re-render only once
            setCount(count + 1);
            setMessage(&quot;users fetched&quot;);
          });
        };

        return (
          &lt;&gt;
            &lt;h1&gt;{count}&lt;/h1&gt;
            &lt;button onClick={handleAsyncFetch}&gt;Click Me!&lt;/button&gt;
          &lt;/&gt;
        );
      }</code></pre>

React prevents component from re-rendering for each and every state update by grouping multiple state updates within an event handler. This strategy improves the application performance and this process known as **batching**. The older version of React only supported batching for browser events whereas React18 supported for asynchronous actions, timeouts and intervals along with native events. This improved version of batching is called **automatic batching**.

      Let''s demonstrate this automatic batching feature with a below example.


      The preceding code updated two state variables with in an event handler. However, React will perform automatic batching feature and the component will be re-rendered only once for better performance.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'React prevents component from re-rendering for each and every state update by grouping multiple state updates within an event handler. This strategy improves the application performance and this process known as **batching**. The older version of React only supported batching for browser events whereas React18 supported for asynchronous actions, timeouts and intervals along with native events. This improved version of batching is called **automatic batching**.

      Let''s demonstrate this automatic batching feature with a below example.


      The preceding code updated two state variables with in an event handler. However, React will perform automatic batching feature and the component will be re-rendered only once for better performance.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":253}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'Is it possible to prevent automatic batching?',
    '<pre><code>      import { flushSync } from &quot;react-dom&quot;;

      const handleClick = () =&gt; {
        flushSync(() =&gt; {
          setClicked(!clicked); //Component will create a re-render here
        });

        setCount(count + 1); // Component will create a re-render again here
      };</code></pre>

Yes, it is possible to prevent automatic batching default behavior. There might be cases where you need to re-render your component after each state update or updating one state depends on another state variable. Considering this situation, React introduced `flushSync` method from `react-dom` API for the usecases where you need to flush state updates to DOM immediately.

      The usage of `flushSync` method within an `onClick` event handler will be looking like as below,


      In the above click handler, React will update DOM at first using flushSync and second time updates DOM because of the counter setter function by avoiding automatic batching.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Yes, it is possible to prevent automatic batching default behavior. There might be cases where you need to re-render your component after each state update or updating one state depends on another state variable. Considering this situation, React introduced `flushSync` method from `react-dom` API for the usecases where you need to flush state updates to DOM immediately.

      The usage of `flushSync` method within an `onClick` event handler will be looking like as below,


      In the above click handler, React will update DOM at first using flushSync and second time updates DOM because of the counter setter function by avoiding automatic batching.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":254}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is React hydration?',
    '<pre><code>      import { hydrateRoot } from &quot;react-dom/client&quot;;
      import App from &quot;./App.js&quot;;

      hydrateRoot(document.getElementById(&quot;root&quot;), &lt;App /&gt;);</code></pre>

React hydration is used to add client-side JavaScript interactivity to pre-rendered static HTML generated by the server. It is used only for server-side rendering(SSR) to enhance the initial rendering time and make it SEO friendly application. This hydration acts as a bridge to reduce the gap between server side and client-side rendering.

      After the page loaded with generated static HTML, React will add application state and interactivity by attaching all event handlers for the respective elements. Let''s demonstrate this with an example.

      Consider that React DOM API(using `renderToString`) generated HTML for `<App>` component which contains `<button>` element to increment the counter.


      The above code generates the below HTML with a header text and button component without any interactivity.


      At this stage `hydrateRoot` API can be used to perform hydration by attaching `onClick` event handler.


      After this step, you are able to run React application on server-side and hydrating the javascript bundle on client-side for smooth user experience and SEO purposes.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'React hydration is used to add client-side JavaScript interactivity to pre-rendered static HTML generated by the server. It is used only for server-side rendering(SSR) to enhance the initial rendering time and make it SEO friendly application. This hydration acts as a bridge to reduce the gap between server side and client-side rendering.

      After the page loaded with generated static HTML, React will add application state and interactivity by attaching all event handlers for the respective elements. Let''s demonstrate this with an example.

      Consider that React DOM API(using `renderToString`) generated HTML for `<App>` component which contains `<button>` element to increment the counter.


      The above code generates the below HTML with a header text and button component without any interactivity.


      At this stage `hydrateRoot` API can be used to perform hydration by attaching `onClick` event handler.


      After this step, you are able to run React application on server-side and hydrating the javascript bundle on client-side for smooth user experience and SEO purposes.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":255}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How do you update objects inside state?',
    '<pre><code>      handleProfileChange(e) {
        setUser({
        ...user,
          [e.target.name]: e.target.value
        });
      }</code></pre>

You cannot update the objects which exists in the state directly. Instead, you should create a fresh new object (or copy from the existing object) and update the latest state using the newly created object. Eventhough JavaScript objects are mutable, you need to treat objects inside state as read-only while updating the state.

      Let''s see this comparison with an example. The issue with regular object mutation approach can be described by updating the user details fields of `Profile` component. The properties of `Profile` component such as firstName, lastName and age details mutated in an event handler as shown below.


      Once you run the application with above user profile component, you can observe that user profile details won''t be update upon entering the input fields.
      This issue can be fixed by creating a new copy of object which includes existing properties through spread syntax(...obj) and add changed values in a single event handler itself as shown below.


      The above event handler is concise instead of maintaining separate event handler for each field. Now, UI displays the updated field values as expected without an issue.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'You cannot update the objects which exists in the state directly. Instead, you should create a fresh new object (or copy from the existing object) and update the latest state using the newly created object. Eventhough JavaScript objects are mutable, you need to treat objects inside state as read-only while updating the state.

      Let''s see this comparison with an example. The issue with regular object mutation approach can be described by updating the user details fields of `Profile` component. The properties of `Profile` component such as firstName, lastName and age details mutated in an event handler as shown below.


      Once you run the application with above user profile component, you can observe that user profile details won''t be update upon entering the input fields.
      This issue can be fixed by creating a new copy of object which includes existing properties through spread syntax(...obj) and add changed values in a single event handler itself as shown below.


      The above event handler is concise instead of maintaining separate event handler for each field. Now, UI displays the updated field values as expected without an issue.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":256}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How do you update nested objects inside state?',
    '<pre><code>      setUser({
        ...user,
        address: {
          ...user.address,
          country: &quot;Germany&quot;,
        },
      });</code></pre>

You cannot simply use spread syntax for all kinds of objects inside state. Because spread syntax is shallow and it copies properties for one level deep only. If the object has nested object structure, UI doesn''t work as expected with regular JavaScript nested property mutation. Let''s demonstrate this behavior with an example of User object which has address nested object inside of it.


      If you try to update the country nested field in a regular javascript fashion(as shown below) then user profile screen won''t be updated with latest value.


      This issue can be fixed by flattening all the fields into a top-level object or create a new object for each nested object and point it to it''s parent object. In this example, first you need to create copy of address object and update it with the latest value. Later, the address object should be linked to parent user object something like below.


      This approach is bit verbose and not easy for deep hierarchical state updates. But this workaround can be used for few levels of nested objects without much hassle.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'You cannot simply use spread syntax for all kinds of objects inside state. Because spread syntax is shallow and it copies properties for one level deep only. If the object has nested object structure, UI doesn''t work as expected with regular JavaScript nested property mutation. Let''s demonstrate this behavior with an example of User object which has address nested object inside of it.


      If you try to update the country nested field in a regular javascript fashion(as shown below) then user profile screen won''t be updated with latest value.


      This issue can be fixed by flattening all the fields into a top-level object or create a new object for each nested object and point it to it''s parent object. In this example, first you need to create copy of address object and update it with the latest value. Later, the address object should be linked to parent user object something like below.


      This approach is bit verbose and not easy for deep hierarchical state updates. But this workaround can be used for few levels of nested objects without much hassle.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":257}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How do you update arrays inside state?',
    '<pre><code>      onClick = {
        [
          ...todos,
          { id: id+1, name: name }
        ]
      }</code></pre>

Eventhough arrays in JavaScript are mutable in nature, you need to treat them as immutable while storing them in a state. That means, similar to objects, the arrays cannot be updated directly inside state. Instead, you need to create a copy of the existing array and then set the state to use newly copied array.

      To ensure that arrays are not mutated, the mutation operations like direct direct assignment(arr[1]=''one''), push, pop, shift, unshift, splice etc methods should be avoided on original array. Instead, you can create a copy of existing array with help of array operations such as filter, map, slice, spread syntax etc.

      For example, the below push operation doesn''t add the new todo to the total todo''s list in an event handler.


      This issue is fixed by replacing push operation with spread syntax where it will create a new array and the UI updated with new todo.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Eventhough arrays in JavaScript are mutable in nature, you need to treat them as immutable while storing them in a state. That means, similar to objects, the arrays cannot be updated directly inside state. Instead, you need to create a copy of the existing array and then set the state to use newly copied array.

      To ensure that arrays are not mutated, the mutation operations like direct direct assignment(arr[1]=''one''), push, pop, shift, unshift, splice etc methods should be avoided on original array. Instead, you can create a copy of existing array with help of array operations such as filter, map, slice, spread syntax etc.

      For example, the below push operation doesn''t add the new todo to the total todo''s list in an event handler.


      This issue is fixed by replacing push operation with spread syntax where it will create a new array and the UI updated with new todo.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":258}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How do you use immer library for state updates?',
    '<pre><code>      import { useImmer } from &quot;use-immer&quot;;
      const [user, setUser] = useImmer({
        name: &quot;John&quot;,
        age: 32,
        address: {
          country: &quot;Singapore&quot;,
          postalCode: 440004,
        },
      });

      //Update user details upon any event
      setUser((draft) =&gt; {
        draft.address.country = &quot;Germany&quot;;
      });</code></pre>

Immer library enforces the immutability of state based on **copy-on-write** mechanism. It uses JavaScript proxy to keep track of updates to immutable states. Immer has 3 main states as below,

      1. **Current state:** It refers to actual state
      2. **Draft state:** All new changes will be applied to this state. In this state, draft is just a proxy of the current state.
      3. **Next state:** It is formed after all mutations applied to the draft state

      Immer can be used by following below instructions,

      1. Install the dependency using `npm install use-immer` command
      2. Replace `useState` hook with `useImmer` hook by importing at the top
      3. The setter function of `useImmer` hook can be used to update the state.

      For example, the mutation syntax of immer library simplifies the nested address object of user state as follows,


      The preceding code enables you to update nested objects with a conceise mutation syntax.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Immer library enforces the immutability of state based on **copy-on-write** mechanism. It uses JavaScript proxy to keep track of updates to immutable states. Immer has 3 main states as below,

      1. **Current state:** It refers to actual state
      2. **Draft state:** All new changes will be applied to this state. In this state, draft is just a proxy of the current state.
      3. **Next state:** It is formed after all mutations applied to the draft state

      Immer can be used by following below instructions,

      1. Install the dependency using `npm install use-immer` command
      2. Replace `useState` hook with `useImmer` hook by importing at the top
      3. The setter function of `useImmer` hook can be used to update the state.

      For example, the mutation syntax of immer library simplifies the nested address object of user state as follows,


      The preceding code enables you to update nested objects with a conceise mutation syntax.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":259}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What are the benefits of preventing the direct state mutations?',
    'What are the benefits of preventing the direct state mutations?',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    NULL,
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":260}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What are the preferred and non-preferred array operations for updating the state?',
    'The below table represent preferred and non-preferred array operations for updating the component state.

      | Action    | Preferred            | Non-preferred              |
      | --------- | -------------------- | -------------------------- |
      | Adding    | concat, [...arr]     | push, unshift              |
      | Removing  | filter, slice        | pop, shift, splice         |
      | Replacing | map                  | splice, arr[i] = someValue |
      | sorting   | copying to new array | reverse, sort              |

      If you use Immer library then you can able to use all array methods without any problem.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The below table represent preferred and non-preferred array operations for updating the component state.

      | Action    | Preferred            | Non-preferred              |
      | --------- | -------------------- | -------------------------- |
      | Adding    | concat, [...arr]     | push, unshift              |
      | Removing  | filter, slice        | pop, shift, splice         |
      | Replacing | map                  | splice, arr[i] = someValue |
      | sorting   | copying to new array | reverse, sort              |

      If you use Immer library then you can able to use all array methods without any problem.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":261}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  );

-- Batch 27: Questions 261-270 (10 questions)
INSERT INTO questions (
  id, title, content, type, difficulty, points, options, correct_answer, 
  explanation, test_cases, hints, tags, metadata, stats, category_id, 
  learning_card_id, is_active, created_at, updated_at, topic_id, time_limit
) VALUES (
    gen_random_uuid(),
    'What will happen by defining nested function components?',
    'Technically it is possible to write nested function components but it is not suggested to write nested function definitions. Because it leads to unexpected bugs and performance issues.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Technically it is possible to write nested function components but it is not suggested to write nested function definitions. Because it leads to unexpected bugs and performance issues.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":262}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'Can I use keys for non-list items?',
    'Keys are primarily used for rendering list items but they are not just for list items. You can also use them React to distinguish components. By default, React uses order of the components in',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Keys are primarily used for rendering list items but they are not just for list items. You can also use them React to distinguish components. By default, React uses order of the components in',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":263}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What are the guidelines to be followed for writing reducers?',
    'There are two guidelines to be taken care while writing reducers in your code.

     1. Reducers must be pure without mutating the state. That means, same input always returns the same output. These reducers run during rendering time similar to state updater functions. So these functions should not send any requests, schedule time outs and any other side effects.

     2. Each action should describe a single user interaction even though there are multiple changes applied to data. For example, if you "reset" registration form which has many user input fields managed by a reducer, it is suggested to send one "reset" action instead of creating separate action for each fields. The proper ordering of actions should reflect the user interactions in the browser and it helps a lot for debugging purpose.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'There are two guidelines to be taken care while writing reducers in your code.

     1. Reducers must be pure without mutating the state. That means, same input always returns the same output. These reducers run during rendering time similar to state updater functions. So these functions should not send any requests, schedule time outs and any other side effects.

     2. Each action should describe a single user interaction even though there are multiple changes applied to data. For example, if you "reset" registration form which has many user input fields managed by a reducer, it is suggested to send one "reset" action instead of creating separate action for each fields. The proper ordering of actions should reflect the user interactions in the browser and it helps a lot for debugging purpose.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":264}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How does ReactJS work behind the scenes?',
    'ReactJS is a powerful JavaScript library for building user interfaces. While it appears simple on the surface, React performs a lot of complex operations behind the scenes to efficiently update the UI. Here''s an overview of how it works internally:

     #### **1. Virtual DOM & Component Rendering**

     React doesn''t manipulate the real DOM directly. Instead, it uses a **Virtual DOM** — a lightweight JavaScript representation of the UI.

     When a component renders (e.g., `<App />`):

        *   React **executes the component function** (e.g., `App()`).
        *   Hooks like `useState` are registered and tracked in order.
        *   React builds a **Virtual DOM tree** from the returned JSX.
        *   This virtual DOM is a **plain JS object** that describes the desired UI.

     This process ensures fast and efficient rendering before React decides how to update the real DOM.

     #### 2. **React Fiber Architecture**

     React’s core engine is called **Fiber**, introduced in React 16. Fiber is a reimplementation of the React reconciliation algorithm with the following capabilities:

        *   Breaks rendering work into **units of work** (fiber nodes).
        *   Enables **interruptible rendering** (important for responsiveness).
        *   Supports **priority scheduling** and **concurrent rendering**.

     Each Fiber node represents a component and stores:

        *   The component type (function/class).
        *   Props, state, and effects.
        *   Links to parent, child, and sibling fibers.

     #### 3. **Reconciliation (Diffing Algorithm)**

     When state or props change:

        *   React re-executes the component to produce a new virtual DOM.
        *   It **compares the new virtual DOM to the previous one** using an efficient diffing algorithm.
        *   React determines the **minimal set of DOM changes** required.

     This process is known as **reconciliation**.

     #### 4. **Commit Phase (Real DOM Updates)**

     Once reconciliation is done:

        *   React enters the **commit phase**.
        *   It applies calculated changes to the **real DOM**.
        *   It also runs side effects like `useEffect` or `useLayoutEffect`.

     This is the only time React interacts directly with the browser DOM.

     #### 5. **Hooks and State Management**

     With Hooks (like `useState`, `useEffect`):

        *   React keeps an **internal list of hooks per component**.
        *   Hooks are identified by their order in the function.
        *   When state updates occur, React re-renders the component and re-runs the hooks in the same order.

     #### 6. **React Scheduler**

     React uses an internal **Scheduler** to control how updates are prioritized:

        *   Urgent tasks like clicks and inputs are processed immediately.
        *   Non-urgent tasks (like data fetching) can be delayed or paused.
        *   This improves responsiveness and allows for **time slicing** in Concurrent Mode.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'ReactJS is a powerful JavaScript library for building user interfaces. While it appears simple on the surface, React performs a lot of complex operations behind the scenes to efficiently update the UI. Here''s an overview of how it works internally:

     #### **1. Virtual DOM & Component Rendering**

     React doesn''t manipulate the real DOM directly. Instead, it uses a **Virtual DOM** — a lightweight JavaScript representation of the UI.

     When a component renders (e.g., `<App />`):

        *   React **executes the component function** (e.g., `App()`).
        *   Hooks like `useState` are registered and tracked in order.
        *   React builds a **Virtual DOM tree** from the returned JSX.
        *   This virtual DOM is a **plain JS object** that describes the desired UI.

     This process ensures fast and efficient rendering before React decides how to update the real DOM.

     #### 2. **React Fiber Architecture**

     React’s core engine is called **Fiber**, introduced in React 16. Fiber is a reimplementation of the React reconciliation algorithm with the following capabilities:

        *   Breaks rendering work into **units of work** (fiber nodes).
        *   Enables **interruptible rendering** (important for responsiveness).
        *   Supports **priority scheduling** and **concurrent rendering**.

     Each Fiber node represents a component and stores:

        *   The component type (function/class).
        *   Props, state, and effects.
        *   Links to parent, child, and sibling fibers.

     #### 3. **Reconciliation (Diffing Algorithm)**

     When state or props change:

        *   React re-executes the component to produce a new virtual DOM.
        *   It **compares the new virtual DOM to the previous one** using an efficient diffing algorithm.
        *   React determines the **minimal set of DOM changes** required.

     This process is known as **reconciliation**.

     #### 4. **Commit Phase (Real DOM Updates)**

     Once reconciliation is done:

        *   React enters the **commit phase**.
        *   It applies calculated changes to the **real DOM**.
        *   It also runs side effects like `useEffect` or `useLayoutEffect`.

     This is the only time React interacts directly with the browser DOM.

     #### 5. **Hooks and State Management**

     With Hooks (like `useState`, `useEffect`):

        *   React keeps an **internal list of hooks per component**.
        *   Hooks are identified by their order in the function.
        *   When state updates occur, React re-renders the component and re-runs the hooks in the same order.

     #### 6. **React Scheduler**

     React uses an internal **Scheduler** to control how updates are prioritized:

        *   Urgent tasks like clicks and inputs are processed immediately.
        *   Non-urgent tasks (like data fetching) can be delayed or paused.
        *   This improves responsiveness and allows for **time slicing** in Concurrent Mode.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":265}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How is `useReducer` Different from `useState`?',
    'There are notable differences between `useState` and `useReducer` hooks.
           
        | Feature               | `useState`                           | `useReducer`                          |
        |-----------------------|--------------------------------------|---------------------------------------|
        | State complexity      | Simple (one variable or flat object) | Complex, multi-part or deeply nested  |
        | Update style          | Direct (e.g. `setState(x)`)          | Through actions (e.g. `dispatch({})`) |
        | Update logic          | In component                         | In reducer function                   |
        | Reusability & testing | Less reusable                        | Highly reusable & testable            |',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'There are notable differences between `useState` and `useReducer` hooks.
           
        | Feature               | `useState`                           | `useReducer`                          |
        |-----------------------|--------------------------------------|---------------------------------------|
        | State complexity      | Simple (one variable or flat object) | Complex, multi-part or deeply nested  |
        | Update style          | Direct (e.g. `setState(x)`)          | Through actions (e.g. `dispatch({})`) |
        | Update logic          | In component                         | In reducer function                   |
        | Reusability & testing | Less reusable                        | Highly reusable & testable            |',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":266}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is useContext? What are the steps to follow for useContext?',
    '<pre><code>        import { useContext } from &#039;react&#039;; 
        function MyComponent() {
            const theme = useContext(ThemeContext); // theme = &quot;dark&quot;
            return &lt;p&gt;Current Theme: {theme}&lt;/p&gt;; 
        }</code></pre>

The `useContext` hook is a built-in React Hook that lets you access the value of a context inside a functional component without needing to wrap it in a <Context.Consumer> component.

     It helps you **avoid prop drilling** (passing props through multiple levels) by allowing components to access shared data like themes, authentication status, or user preferences.

     The usage of useContext involves three main steps:
      #### **Step 1 : Create the Context**
    
        Use `React.createContext()` to create a context object.
    
    
      You typically export this so other components can import it.

      #### **Step 2: Provide the Context Value**
    
        Wrap your component tree (or a part of it) with the `Context.Provider` and pass a `value` prop.
    
    
        Now any component inside `<ThemeContext.Provider>` can access the context value.

        #### **Step 3: Consume the Context with** `**useContext**`
    
        In any functional component **inside the Provider**, use the `useContext` hook:',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The `useContext` hook is a built-in React Hook that lets you access the value of a context inside a functional component without needing to wrap it in a <Context.Consumer> component.

     It helps you **avoid prop drilling** (passing props through multiple levels) by allowing components to access shared data like themes, authentication status, or user preferences.

     The usage of useContext involves three main steps:
      #### **Step 1 : Create the Context**
    
        Use `React.createContext()` to create a context object.
    
    
      You typically export this so other components can import it.

      #### **Step 2: Provide the Context Value**
    
        Wrap your component tree (or a part of it) with the `Context.Provider` and pass a `value` prop.
    
    
        Now any component inside `<ThemeContext.Provider>` can access the context value.

        #### **Step 3: Consume the Context with** `**useContext**`
    
        In any functional component **inside the Provider**, use the `useContext` hook:',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":267}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What are the use cases of useContext hook?',
    'The `useContext` hook in React is used to share data across components without having to pass props manually through each level. Here are some common and effective use cases:

        1.  **Theme Customization**  
            `useContext` can be used to manage application-wide themes, such as light and dark modes, ensuring consistent styling and enabling user-driven customization.
        2.  **Localization and Internationalization**  
            It supports localization by providing translated strings or locale-specific content to components, adapting the application for users in different regions.
        3.  **User Authentication and Session Management**  
            `useContext` allows global access to authentication status and user data. This enables conditional rendering of components and helps manage protected routes or user-specific UI elements.
        4.  **Shared Modal or Sidebar Visibility**  
            It''s ideal for managing the visibility of shared UI components like modals, drawers, or sidebars, especially when their state needs to be controlled from various parts of the app.
        5.  **Combining with** `**useReducer**` **for Global State Management**  
            When combined with `useReducer`, `useContext` becomes a powerful tool for managing more complex global state logic. This pattern helps maintain cleaner, scalable state logic without introducing external libraries like Redux.
             Some of the common use cases of useContext are listed below,',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The `useContext` hook in React is used to share data across components without having to pass props manually through each level. Here are some common and effective use cases:

        1.  **Theme Customization**  
            `useContext` can be used to manage application-wide themes, such as light and dark modes, ensuring consistent styling and enabling user-driven customization.
        2.  **Localization and Internationalization**  
            It supports localization by providing translated strings or locale-specific content to components, adapting the application for users in different regions.
        3.  **User Authentication and Session Management**  
            `useContext` allows global access to authentication status and user data. This enables conditional rendering of components and helps manage protected routes or user-specific UI elements.
        4.  **Shared Modal or Sidebar Visibility**  
            It''s ideal for managing the visibility of shared UI components like modals, drawers, or sidebars, especially when their state needs to be controlled from various parts of the app.
        5.  **Combining with** `**useReducer**` **for Global State Management**  
            When combined with `useReducer`, `useContext` becomes a powerful tool for managing more complex global state logic. This pattern helps maintain cleaner, scalable state logic without introducing external libraries like Redux.
             Some of the common use cases of useContext are listed below,',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":268}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'When to use client and server components?',
    'You can efficiently build nextjs application if you are aware about which part of the application needs to use client components and which other parts needs to use server components. The common cases of both client and server components are listed below:

        **Client components:**
        1. Whenever your need to add interactivity and event listeners such as onClick(), onChange(), etc to the pages
        2. If you need to use State and Lifecycle Effects like useState(), useReducer(), useEffect() etc.
        3. If there is a requirement to use browser-only APIs.
        4. If you need to implement custom hooks that depend on state, effects, or browser-only APIs.
        5. There are React Class components in the pages.

        **Server components:**
        1. If the component logic is about data fetching.
        2. If you need to access backend resources directly.
        3. When you need to keep sensitive information((access tokens, API keys, etc)	) on the server.
        4. If you want reduce client-side JavaScript and placing large dependencies on the server.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'You can efficiently build nextjs application if you are aware about which part of the application needs to use client components and which other parts needs to use server components. The common cases of both client and server components are listed below:

        **Client components:**
        1. Whenever your need to add interactivity and event listeners such as onClick(), onChange(), etc to the pages
        2. If you need to use State and Lifecycle Effects like useState(), useReducer(), useEffect() etc.
        3. If there is a requirement to use browser-only APIs.
        4. If you need to implement custom hooks that depend on state, effects, or browser-only APIs.
        5. There are React Class components in the pages.

        **Server components:**
        1. If the component logic is about data fetching.
        2. If you need to access backend resources directly.
        3. When you need to keep sensitive information((access tokens, API keys, etc)	) on the server.
        4. If you want reduce client-side JavaScript and placing large dependencies on the server.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":269}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What are the differences between page router and app router in nextjs?',
    'What are the differences between page router and app router in nextjs?',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    NULL,
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":270}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'Can you describe the useMemo() Hook?',
    '<pre><code>      import React, { useState, useMemo } from &#039;react&#039;;

      const users = [
        { id: 1, name: &#039;Sudheer&#039; },
        { id: 2, name: &#039;Brendon&#039; },
        { id: 3, name: &#039;Charlie&#039; },
        { id: 4, name: &#039;Dary&#039; },
        { id: 5, name: &#039;Eden&#039; }
      ];

      export default function UserSearch({ users }) {
        const [searchTerm, setSearchTerm] = useState(&#039;&#039;);
        const [counter, setCounter] = useState(0);

        // Memoize the filtered user list based on the search term
        const filteredUsers = useMemo(() =&gt; {
          console.log(&quot;Filtering users...&quot;);
          return users.filter(user =&gt;
            user.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }, [searchTerm]);

        return (
            &lt;h2&gt;Counter: {counter}&lt;/h2&gt;
            &lt;button onClick={() =&gt; setCounter(prev =&gt; prev + 1)}&gt;Increment Counter&lt;/button&gt;

            &lt;h2&gt;Search Users&lt;/h2&gt;
            &lt;input
              type=&quot;text&quot;
              value={searchTerm}
              onChange={(e) =&gt; setSearchTerm(e.target.value)}
              placeholder=&quot;Enter name&quot;
            /&gt;

            &lt;ul&gt;
              {filteredUsers.map(user =&gt; (
                &lt;li key={user.id}&gt;{user.name}&lt;/li&gt;
              ))}
            &lt;/ul&gt;
        );
      }</code></pre>

The `useMemo()` Hook in React is used to **optimize performance** by **memoizing the result of expensive calculations**. It ensures that a function is **only re-executed when its dependencies change**, preventing unnecessary computations on every re-render.

     #### Syntax

      - **`computeExpensiveValue`**:  
      A function that returns the computed result.

     - **`dependencies`**:  
      An array of values that, when changed, will cause the memoized function to re-run.

      If the dependencies haven’t changed since the last render, React returns the **cached result** instead of re-running the function.

      Let''s exaplain the usage of `useMemo` hook with an example of user search and its respective filtered users list.

      #### Example: Memoizing a Filtered List

      In the above example:
        - The filteredUsers list is only recomputed when searchTerm changes.
        - Pressing the "Increment Counter" button does not trigger the filtering logic again, as it''s not a dependency.
        - The console will only log "Filtering users..." when the search term updates.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The `useMemo()` Hook in React is used to **optimize performance** by **memoizing the result of expensive calculations**. It ensures that a function is **only re-executed when its dependencies change**, preventing unnecessary computations on every re-render.

     #### Syntax

      - **`computeExpensiveValue`**:  
      A function that returns the computed result.

     - **`dependencies`**:  
      An array of values that, when changed, will cause the memoized function to re-run.

      If the dependencies haven’t changed since the last render, React returns the **cached result** instead of re-running the function.

      Let''s exaplain the usage of `useMemo` hook with an example of user search and its respective filtered users list.

      #### Example: Memoizing a Filtered List

      In the above example:
        - The filteredUsers list is only recomputed when searchTerm changes.
        - Pressing the "Increment Counter" button does not trigger the filtering logic again, as it''s not a dependency.
        - The console will only log "Filtering users..." when the search term updates.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":271}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  );

-- Batch 28: Questions 271-280 (10 questions)
INSERT INTO questions (
  id, title, content, type, difficulty, points, options, correct_answer, 
  explanation, test_cases, hints, tags, metadata, stats, category_id, 
  learning_card_id, is_active, created_at, updated_at, topic_id, time_limit
) VALUES (
    gen_random_uuid(),
    'Can Hooks be used in class components?',
    'No, Hooks cannot be used inside class components. They are specially designed for function components. This is because hooks depend on the sequence in which they are called during a component’s render, something that''s only guaranteed in functional components. However, both class and function components can coexist in the same application.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'No, Hooks cannot be used inside class components. They are specially designed for function components. This is because hooks depend on the sequence in which they are called during a component’s render, something that''s only guaranteed in functional components. However, both class and function components can coexist in the same application.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":272}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is an updater function? Should an updater function be used in all cases?',
    '<pre><code>     setName(&#039;Sudheer&#039;);</code></pre>

An **updater function** is a form of `setState` where you pass a **function** instead of a direct value. This function receives the **previous state** as an argument and returns the **next state**.
     
     The updater function expression looks like below,
     Here, `prevCount => prevCount + 1` is the updater function.

     In the React community, there''s often a recommendation to use updater functions when updating state that depends on its previous value. This helps prevent unexpected behaviors that can arise from working with outdated or "stale" state.

     While using an updater function is a good habit, it''s not always necessary. In most cases, React batches updates and ensures that the state is up-to-date at the beginning of the event handler, so you typically don’t run into stale state issues during a single synchronous event.
     However, if you’re doing multiple updates to the same state variable within a single handler, using the updater form ensures that each update correctly uses the latest state value, rather than a potentially outdated one.

     **Example: Multiple Updates in One Handler**

     In this example, `a => a + 1` is an **updater function**. React queues these updater functions and applies them sequentially, each using the most recent state value. As a result, the counter will correctly increment by 3.

     In many cases, such as setting state based on user input or assigning static values, you don’t need the updater function:',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'An **updater function** is a form of `setState` where you pass a **function** instead of a direct value. This function receives the **previous state** as an argument and returns the **next state**.
     
     The updater function expression looks like below,
     Here, `prevCount => prevCount + 1` is the updater function.

     In the React community, there''s often a recommendation to use updater functions when updating state that depends on its previous value. This helps prevent unexpected behaviors that can arise from working with outdated or "stale" state.

     While using an updater function is a good habit, it''s not always necessary. In most cases, React batches updates and ensures that the state is up-to-date at the beginning of the event handler, so you typically don’t run into stale state issues during a single synchronous event.
     However, if you’re doing multiple updates to the same state variable within a single handler, using the updater form ensures that each update correctly uses the latest state value, rather than a potentially outdated one.

     **Example: Multiple Updates in One Handler**

     In this example, `a => a + 1` is an **updater function**. React queues these updater functions and applies them sequentially, each using the most recent state value. As a result, the counter will correctly increment by 3.

     In many cases, such as setting state based on user input or assigning static values, you don’t need the updater function:',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":273}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'Can useState take a function as an initial value?',
    '<pre><code>     const [count, setCount] = useState(expensiveComputation());</code></pre>

Yes, `useState` can take a function as an initial value, and this is a useful feature in React called **lazy initialization**. This function is also known as **initializer function**.

     When you call useState(initialValue), you normally pass in a value directly:
     

     But if calculating that initial value is expensive or involves logic, you can pass a function that returns the value:
     
     This function avoids doing heavy computation on every render. If you don''t use this function form and invokes it directly, the function will run everytime the component renders and impact the performance.
     For example, the below usage is not recommended.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Yes, `useState` can take a function as an initial value, and this is a useful feature in React called **lazy initialization**. This function is also known as **initializer function**.

     When you call useState(initialValue), you normally pass in a value directly:
     

     But if calculating that initial value is expensive or involves logic, you can pass a function that returns the value:
     
     This function avoids doing heavy computation on every render. If you don''t use this function form and invokes it directly, the function will run everytime the component renders and impact the performance.
     For example, the below usage is not recommended.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":274}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What types of values can `useState` hold?',
    '<pre><code>     user.name = &quot;Sudheer&quot;; //wrong way
     setUser(prev =&gt; ({ ...prev, name: &#039;Sudheer&#039; })); //correct way</code></pre>

The `useState` hook accepts different types of values.

     *   Primitives: `number`, `string`, `boolean`
     *   Arrays
     *   Objects
     *   Functions
     *   `null` or `undefined`

     But you needs to be cautious with **reference types (objects/arrays)** because React compares old and new values **by reference**, so direct mutations won''t trigger a re-render.
     For example, the correct and wrong ways of state updates as shown below,',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The `useState` hook accepts different types of values.

     *   Primitives: `number`, `string`, `boolean`
     *   Arrays
     *   Objects
     *   Functions
     *   `null` or `undefined`

     But you needs to be cautious with **reference types (objects/arrays)** because React compares old and new values **by reference**, so direct mutations won''t trigger a re-render.
     For example, the correct and wrong ways of state updates as shown below,',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":275}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What happens if you call `useState` conditionally?',
    '<pre><code>     if (someCondition) { 
        const [state, setState] = useState(0); 
     }</code></pre>

As per rules of React Hooks, hooks must be called unconditionally. For example, if you conditionally call it:

     React will throw a runtime error because it **relies on the order of Hook calls**, and conditional logic breaks that order.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'As per rules of React Hooks, hooks must be called unconditionally. For example, if you conditionally call it:

     React will throw a runtime error because it **relies on the order of Hook calls**, and conditional logic breaks that order.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":276}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'Is useState Synchronous or Asynchronous?',
    '<pre><code>        import React, { useState, useEffect } from &#039;react&#039;;

        function Counter() {
        const [count, setCount] = useState(0);
        
        const handleClick = () =&gt; {
        setCount(count + 1);
        console.log(&#039;Clicked count (old):&#039;, count); // Old value
        };
        
        useEffect(() =&gt; {
        console.log(&#039;Updated count:&#039;, count); // New value
        }, [count]); // Only runs when `count` changes
        
        return &lt;button onClick={handleClick}&gt;Count: {count}&lt;/button&gt;;
        }</code></pre>

The `useState` hook is synchronous, but state updates are asynchronous. When you call `useState()`, it runs synchronously and returns the state variable and setter function as tuple.
     This happens immediately during rendering.
     However, the state update function (**setState**) is asynchronous in the sense that it doesn''t update the state immediately.
     React **batches** updates and applies them before the next render. You won’t see the updated value immediately after calling `setState`.
     
     **Example:**
     The > `console.log(count)` prints the **old value**, because the update hasn’t happened yet.
     
     To see the updated state value, you can use `useEffect()` hook. It runs **after the component has re-rendered.**  By the time `useEffect` runs:

        *   The component has been updated.
        *   The **state contains the new value**.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The `useState` hook is synchronous, but state updates are asynchronous. When you call `useState()`, it runs synchronously and returns the state variable and setter function as tuple.
     This happens immediately during rendering.
     However, the state update function (**setState**) is asynchronous in the sense that it doesn''t update the state immediately.
     React **batches** updates and applies them before the next render. You won’t see the updated value immediately after calling `setState`.
     
     **Example:**
     The > `console.log(count)` prints the **old value**, because the update hasn’t happened yet.
     
     To see the updated state value, you can use `useEffect()` hook. It runs **after the component has re-rendered.**  By the time `useEffect` runs:

        *   The component has been updated.
        *   The **state contains the new value**.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":277}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'Can you explain how useState works internally?',
    '<pre><code>        let hookIndex = 0;
        const hooks = [];
        
        function useState(initialValue) {
            const currentIndex = hookIndex;
        
            if (!hooks[currentIndex]) {
                // First render: initialize state
                hooks[currentIndex] = {
                    state: initialValue,
                    queue: [],
                };
            }
        
            const hook = hooks[currentIndex];
        
            // Process queued updates
            hook.queue.forEach(update =&gt; {
                hook.state = update(hook.state);
            });
            hook.queue = [];
        
            // Define updater function
            function setState(action) {
                // action can be new state or function(state) =&gt; new state
                hook.queue.push(typeof action === &#039;function&#039; ? action : () =&gt; action);
                scheduleRender(); // triggers React re-render
            }
        
            hookIndex++;
            return [hook.state, setState];
        }</code></pre>

React’s hooks, including `useState`, rely on some internal machinery that keeps track of state **per component** and **per hook call** during rendering. Here''s a simplified explanation of the internal mechanics:

      #### 1. **Hook List / Linked List**

      *   React maintains a linked list or array of "hook states" for each component.
      *   When a component renders, React keeps track of which hook it is currently processing via a cursor/index.
      *   Each call to `useState()` corresponds to one "slot" in this list.

      #### 2. **State Storage**

      *   Each slot stores:
        *   The current state value.
        *   A queue of pending state updates.

      #### 3. **Initial Render**
        
      *   When the component first renders, React:
         *   Creates a new slot for `useState` with the initial state (e.g., `0`).
         *   Returns `[state, updaterFunction]`.

      #### 4. **Updater Function**
    
      *   The updater function (`setCount`) is a closure that, when called:
        *   Enqueues a state update to React''s internal queue.
        *   Schedules a re-render of the component.
    
      #### 5. **Re-render and State Update**
    
      *   On the next render:
        *   React processes all queued updates for each hook slot.
        *   Updates the stored state value accordingly.
        *   Returns the new state to the component.

      #### 6. **Important: Hook Order**

      *   Hooks must be called in the same order on every render so React can match hook calls to their internal slots.
      *   That’s why you can’t call hooks conditionally.
      
      The pseudocode for internal implementation of `useState` looks like below,',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'React’s hooks, including `useState`, rely on some internal machinery that keeps track of state **per component** and **per hook call** during rendering. Here''s a simplified explanation of the internal mechanics:

      #### 1. **Hook List / Linked List**

      *   React maintains a linked list or array of "hook states" for each component.
      *   When a component renders, React keeps track of which hook it is currently processing via a cursor/index.
      *   Each call to `useState()` corresponds to one "slot" in this list.

      #### 2. **State Storage**

      *   Each slot stores:
        *   The current state value.
        *   A queue of pending state updates.

      #### 3. **Initial Render**
        
      *   When the component first renders, React:
         *   Creates a new slot for `useState` with the initial state (e.g., `0`).
         *   Returns `[state, updaterFunction]`.

      #### 4. **Updater Function**
    
      *   The updater function (`setCount`) is a closure that, when called:
        *   Enqueues a state update to React''s internal queue.
        *   Schedules a re-render of the component.
    
      #### 5. **Re-render and State Update**
    
      *   On the next render:
        *   React processes all queued updates for each hook slot.
        *   Updates the stored state value accordingly.
        *   Returns the new state to the component.

      #### 6. **Important: Hook Order**

      *   Hooks must be called in the same order on every render so React can match hook calls to their internal slots.
      *   That’s why you can’t call hooks conditionally.
      
      The pseudocode for internal implementation of `useState` looks like below,',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":278}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is `useReducer`? Why do you use useReducer?',
    '<pre><code>        const [state, dispatch] = useReducer(reducer, initialState, initFunction);</code></pre>

The `useReducer` hook is a React hook used to manage **complex state logic** inside **functional components**. It is conceptually similar to **Redux**. i.e, Instead of directly updating state like with `useState`, you **dispatch an action** to a **reducer function**, and the reducer returns the new state.

     The `useReducer` hook takes three arguments:


        *   `**reducer**`: A function `(state, action) => newState` that handles how state should change based on the action.
        *   `**initialState**`: The starting state.
        *   `**dispatch**`: A function you call to trigger an update by passing an action.

     The `useReducer` hook is used when:

     *   The **state is complex**, such as nested structures or multiple related values.
     *   State updates depend on the **previous state** and **logic**.
     *   You want to **separate state update logic** from UI code to make it cleaner and testable.
     *   You’re managing features like:
         *   Forms
         *   Wizards / Multi-step flows
         *   Undo/Redo functionality
         *   Shopping cart logic
         *   Toggle & conditional UI logic',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The `useReducer` hook is a React hook used to manage **complex state logic** inside **functional components**. It is conceptually similar to **Redux**. i.e, Instead of directly updating state like with `useState`, you **dispatch an action** to a **reducer function**, and the reducer returns the new state.

     The `useReducer` hook takes three arguments:


        *   `**reducer**`: A function `(state, action) => newState` that handles how state should change based on the action.
        *   `**initialState**`: The starting state.
        *   `**dispatch**`: A function you call to trigger an update by passing an action.

     The `useReducer` hook is used when:

     *   The **state is complex**, such as nested structures or multiple related values.
     *   State updates depend on the **previous state** and **logic**.
     *   You want to **separate state update logic** from UI code to make it cleaner and testable.
     *   You’re managing features like:
         *   Forms
         *   Wizards / Multi-step flows
         *   Undo/Redo functionality
         *   Shopping cart logic
         *   Toggle & conditional UI logic',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":279}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How does `useReducer` works? Explain with an example',
    '<pre><code>      import React, { useReducer } from &#039;react&#039;;

        function Counter() {
          const initialState = { count: 0 };
          const [state, dispatch] = useReducer(counterReducer, initialState);

          return (
              &lt;h2&gt;Count: {state.count}&lt;/h2&gt;
              &lt;button onClick={() =&gt; dispatch({ type: &#039;increment&#039; })}&gt;Increment&lt;/button&gt;
              &lt;button onClick={() =&gt; dispatch({ type: &#039;decrement&#039; })}&gt;Decrement&lt;/button&gt;
              &lt;button onClick={() =&gt; dispatch({ type: &#039;reset&#039; })}&gt;Reset&lt;/button&gt;
          );
        }

      export default Counter;</code></pre>

The `useReducer` hooks works similarly to Redux, where:

        *   You define a **reducer function** to handle state transitions.
        *   You dispatch actions to update the state.
     
     **Counter Example with Increment, Decrement, and Reset:**
     1. Reducer function:

        Define a counter reducer function that takes the current state and an action object with a type, and returns a new state based on that type.
     
     2. Using `useReducer`:
      Invoke `useReducer` with above reducer function along with initial state. Thereafter, you can attach dispatch actions for respective button handlers.
      Once the new state has been returned, React re-renders the component with the updated `state.count`.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The `useReducer` hooks works similarly to Redux, where:

        *   You define a **reducer function** to handle state transitions.
        *   You dispatch actions to update the state.
     
     **Counter Example with Increment, Decrement, and Reset:**
     1. Reducer function:

        Define a counter reducer function that takes the current state and an action object with a type, and returns a new state based on that type.
     
     2. Using `useReducer`:
      Invoke `useReducer` with above reducer function along with initial state. Thereafter, you can attach dispatch actions for respective button handlers.
      Once the new state has been returned, React re-renders the component with the updated `state.count`.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":280}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'Can you combine **useReducer** with **useContext**?',
    '<pre><code>      const AppContext = React.createContext();

      function AppProvider({ children }) {
        const [state, dispatch] = useReducer(reducer, initialState);
        return (
          &lt;AppContext.Provider value={{ state, dispatch }}&gt;
            {children}
          &lt;/AppContext.Provider&gt;
        );
      }</code></pre>

Yes, it''s common to combine **useReducer** with **useContext** to build a lightweight state management system similar to Redux:',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Yes, it''s common to combine **useReducer** with **useContext** to build a lightweight state management system similar to Redux:',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":281}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  );

-- Batch 29: Questions 281-290 (10 questions)
INSERT INTO questions (
  id, title, content, type, difficulty, points, options, correct_answer, 
  explanation, test_cases, hints, tags, metadata, stats, category_id, 
  learning_card_id, is_active, created_at, updated_at, topic_id, time_limit
) VALUES (
    gen_random_uuid(),
    'Can you dispatch multiple actions in a row with useReducer?',
    '<pre><code>     dispatch({ type: &#039;increment_twice&#039; });</code></pre>

Yes, you can dispatch multiple actions in a row using `useReducer` but not directly in one call. You''d have to call dispatch multiple times or create a composite action in your reducer that performs multiple updates based on the action type.
     
     **Example: Dispatching Multiple Actions**
     You can define a custom function with dispatching actions one by one.
     After that, you need to invoke it through event handler
     **Note:** You can also define a custom action type If you want multiple state changes to be handled in one reducer call.
     Then dispatch',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Yes, you can dispatch multiple actions in a row using `useReducer` but not directly in one call. You''d have to call dispatch multiple times or create a composite action in your reducer that performs multiple updates based on the action type.
     
     **Example: Dispatching Multiple Actions**
     You can define a custom function with dispatching actions one by one.
     After that, you need to invoke it through event handler
     **Note:** You can also define a custom action type If you want multiple state changes to be handled in one reducer call.
     Then dispatch',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":282}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How does useContext works? Explain with an example',
    '<pre><code>        // Dashboard.js
        import React from &#039;react&#039;;
        import { useAuth } from &#039;./AuthContext&#039;;
        
        function Dashboard() {
          const { user, logout } = useAuth();
        
          if (!user) {
            return &lt;p&gt;Please login to view the dashboard.&lt;/p&gt;;
          }
        
          return (
              &lt;h2&gt;Dashboard&lt;/h2&gt;
              &lt;p&gt;Logged in as: {user.name}&lt;/p&gt;
              &lt;button onClick={logout}&gt;Logout&lt;/button&gt;
          );
        }
        
        export default Dashboard;</code></pre>

The `useContext` hook can be used for authentication state management across multiple components and pages in a React application.
    
     Let''s build a simple authentication flow with:

        *   **Login and Logout buttons**
        *   Global `AuthContext` to share state
        *   Components that can **access and update** auth status
     
      **1. Create the Auth Context:**

       You can define `AuthProvider` which holds and provides `user`, `login()`, and `logout()` via context.
     **2. Wrap Your App with the Provider:**
       
        Wrap the above created provider in main `App.js` file      
     **3. Home page with login:**
      Read or access user and login details through custom useAuth hook and use it inside home page.

     
     **4. Dashboard with logout:**
      Read or access user and logout details from `useAuth` custom hook and use it inside dashboard page.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The `useContext` hook can be used for authentication state management across multiple components and pages in a React application.
    
     Let''s build a simple authentication flow with:

        *   **Login and Logout buttons**
        *   Global `AuthContext` to share state
        *   Components that can **access and update** auth status
     
      **1. Create the Auth Context:**

       You can define `AuthProvider` which holds and provides `user`, `login()`, and `logout()` via context.
     **2. Wrap Your App with the Provider:**
       
        Wrap the above created provider in main `App.js` file      
     **3. Home page with login:**
      Read or access user and login details through custom useAuth hook and use it inside home page.

     
     **4. Dashboard with logout:**
      Read or access user and logout details from `useAuth` custom hook and use it inside dashboard page.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":283}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'Can You Use Multiple Contexts in One Component?',
    '<pre><code>     import React, { createContext, useContext } from &#039;react&#039;;

      // Step 1: Create two contexts
      const ThemeContext = createContext();
      const UserContext = createContext();

      function Dashboard() {
        // Step 2: Use both contexts
        const theme = useContext(ThemeContext);
        const user = useContext(UserContext);

        return (
            &lt;h1&gt;Welcome, {user.name}&lt;/h1&gt;
            &lt;p&gt;Current theme: {theme}&lt;/p&gt;
        );
      }

      // Step 3: Provide both contexts
      function App() {
        return (
          &lt;ThemeContext.Provider value=&quot;dark&quot;&gt;
            &lt;UserContext.Provider value={{ name: &#039;Sudheer&#039; }}&gt;
              &lt;Dashboard /&gt;
            &lt;/UserContext.Provider&gt;
          &lt;/ThemeContext.Provider&gt;
        );
      }

      export default App;</code></pre>

Yes, it is possible. You can use multiple contexts inside the same component by calling useContext multiple times, once for each context.

     It can be achieved with below steps,

        *   Create multiple contexts using `createContext()`.
        *   Wrap your component tree with multiple `<Provider>`s.
        *   Call `useContext()` separately for each context in the same component.
     
     **Example: Using `ThemeContext` and `UserContext` Together**',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Yes, it is possible. You can use multiple contexts inside the same component by calling useContext multiple times, once for each context.

     It can be achieved with below steps,

        *   Create multiple contexts using `createContext()`.
        *   Wrap your component tree with multiple `<Provider>`s.
        *   Call `useContext()` separately for each context in the same component.
     
     **Example: Using `ThemeContext` and `UserContext` Together**',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":284}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What''s a common pitfall when using useContext with objects?',
    '<pre><code>       const contextValue = useMemo(() =&gt; ({ user, setUser, theme, setTheme }), [user, theme]);</code></pre>

A **common pitfall** when using `useContext` with objects is **triggering unnecessary re-renders** across all consuming components — even when only part of the context value changes.

     When you provide an object as the context value, React compares the entire object reference. If the object changes (even slightly), React assumes the whole context has changed, and **all components using** `useContext(MyContext)` **will re-render**, regardless of whether they use the part that changed.

     **Example:**
     In this case, a change in `theme` will also trigger a re-render in components that only care about `user`.

     This issue can be fixed in two ways,

     **1. Split Contexts**  
     Create separate contexts for unrelated pieces of state:


     **2. Memoize Context Value**  
     Use `useMemo` to prevent unnecessary re-renders:


     However, this only helps if the object structure and dependencies are well controlled.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'A **common pitfall** when using `useContext` with objects is **triggering unnecessary re-renders** across all consuming components — even when only part of the context value changes.

     When you provide an object as the context value, React compares the entire object reference. If the object changes (even slightly), React assumes the whole context has changed, and **all components using** `useContext(MyContext)` **will re-render**, regardless of whether they use the part that changed.

     **Example:**
     In this case, a change in `theme` will also trigger a re-render in components that only care about `user`.

     This issue can be fixed in two ways,

     **1. Split Contexts**  
     Create separate contexts for unrelated pieces of state:


     **2. Memoize Context Value**  
     Use `useMemo` to prevent unnecessary re-renders:


     However, this only helps if the object structure and dependencies are well controlled.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":285}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What would the context value be for no matching provider?',
    '<pre><code>     const AuthContext = React.createContext(); // No default
    
     function Profile() {
       const auth = useContext(AuthContext);
       // auth will be undefined if there&#039;s no AuthContext.Provider
     }</code></pre>

When a component calls `useContext(SomeContext)` but **no matching** `<SomeContext.Provider>` **is present higher up in the component tree**, the **default value** passed to `React.createContext(defaultValue)` is returned.
    
     In this case, `theme` will be ''light''. It''s the default value you provided when you created the context.
    
     **Note:** If you don’t specify a default value, the context value will be undefined when used without a provider:',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'When a component calls `useContext(SomeContext)` but **no matching** `<SomeContext.Provider>` **is present higher up in the component tree**, the **default value** passed to `React.createContext(defaultValue)` is returned.
    
     In this case, `theme` will be ''light''. It''s the default value you provided when you created the context.
    
     **Note:** If you don’t specify a default value, the context value will be undefined when used without a provider:',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":286}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How do reactive dependencies in the useEffect dependency array affect its execution behavior?',
    '<pre><code>          useEffect(() =&gt; {
            // runs after **every** render
          });</code></pre>

The `useEffect` hook accepts an optional dependencies argument that accepts an array of reactive values. The **dependency array** determines **when** the effect runs. i.e, It makes `useEffect` _reactive_ to changes in specified values.

     #### **How Dependency Array Affects Behavior**

     1. **Empty Dependency Array:** `**[]**`


      *   Effect runs **only once** (like `componentDidMount`).
      *   Ignores all state/prop changes.

     2. **With Specific Dependencies:** `**[count, user]**`


       *   Effect runs on **first render**, and
       *   Again **every time** any dependency value changes.

     3. **No Dependency Array (Omitted)**


           *   Effect runs after **every render**, regardless of what changed.
           *   Can lead to **performance issues** if not used carefully.

       React uses shallow comparison of the dependencies. If any value has changed (!==), the effect will re-run.
       
       **Note:** This hook works well when dependencies are primitives or memoized objects/functions.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The `useEffect` hook accepts an optional dependencies argument that accepts an array of reactive values. The **dependency array** determines **when** the effect runs. i.e, It makes `useEffect` _reactive_ to changes in specified values.

     #### **How Dependency Array Affects Behavior**

     1. **Empty Dependency Array:** `**[]**`


      *   Effect runs **only once** (like `componentDidMount`).
      *   Ignores all state/prop changes.

     2. **With Specific Dependencies:** `**[count, user]**`


       *   Effect runs on **first render**, and
       *   Again **every time** any dependency value changes.

     3. **No Dependency Array (Omitted)**


           *   Effect runs after **every render**, regardless of what changed.
           *   Can lead to **performance issues** if not used carefully.

       React uses shallow comparison of the dependencies. If any value has changed (!==), the effect will re-run.
       
       **Note:** This hook works well when dependencies are primitives or memoized objects/functions.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":287}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'When and how often does React invoke the setup and cleanup functions inside a useEffect hook?',
    '1. **Setup Function Execution (`useEffect`)**

         The setup function (or the main function) you pass to `useEffect` runs at specific points:

           1.  **After the component is mounted** (if the dependency array is empty `[]`)
           2.  **After every render** (if no dependency array is provided)
           3.  **After a dependency value changes** (if the dependency array contains variables)

     2. **Cleanup Function Execution (Returned function from `useEffect`)**

        The cleanup function is called **before the effect is re-executed** and when the component **unmounts**.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    '1. **Setup Function Execution (`useEffect`)**

         The setup function (or the main function) you pass to `useEffect` runs at specific points:

           1.  **After the component is mounted** (if the dependency array is empty `[]`)
           2.  **After every render** (if no dependency array is provided)
           3.  **After a dependency value changes** (if the dependency array contains variables)

     2. **Cleanup Function Execution (Returned function from `useEffect`)**

        The cleanup function is called **before the effect is re-executed** and when the component **unmounts**.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":288}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What happens if you return a Promise from useEffect??',
    '<pre><code>      useEffect(() =&gt; {
        const fetchData = async () =&gt; {
          const res = await fetch(&#039;/api&#039;);
          const data = await res.json();
          setData(data);
        };

        fetchData();
      }, []);</code></pre>

You should NOT return a Promise from useEffect. React expects the function passed to useEffect to return either nothing (undefined) or a cleanup function (synchronous function). i.e, It does not expect or handle a returned Promise. If you still return a Promise, React will ignore it silently, and it may lead to bugs or warnings in strict mode.

      **Incorrect:**
      **Correct:**',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'You should NOT return a Promise from useEffect. React expects the function passed to useEffect to return either nothing (undefined) or a cleanup function (synchronous function). i.e, It does not expect or handle a returned Promise. If you still return a Promise, React will ignore it silently, and it may lead to bugs or warnings in strict mode.

      **Incorrect:**
      **Correct:**',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":289}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'Can you have multiple useEffect hooks in a single component?',
    '<pre><code>      useEffect(() =&gt; {
        // Handles API fetch
      }, []);

      useEffect(() =&gt; {
        // Handles event listeners
      }, []);</code></pre>

Yes, multiple useEffect hooks are allowed and recommended when you want to separate concerns.

      Each effect runs independently and helps make code modular and easier to debug.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Yes, multiple useEffect hooks are allowed and recommended when you want to separate concerns.

      Each effect runs independently and helps make code modular and easier to debug.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":289}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How to prevent infinite loops with useEffect?',
    '<pre><code>        useEffect(() =&gt; {
          if (count &lt; 5) {
            setCount(count + 1);
          }
        }, [count]);</code></pre>

Infinite loops happen when the effect updates state that’s listed in its own dependency array, which causes the effect to re-run, updating state again and so on.
        
        **Infinite loop scenario:**
        You need to ensure that setState calls do not depend on values that cause the effect to rerun, or isolate them with a guard.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Infinite loops happen when the effect updates state that’s listed in its own dependency array, which causes the effect to re-run, updating state again and so on.
        
        **Infinite loop scenario:**
        You need to ensure that setState calls do not depend on values that cause the effect to rerun, or isolate them with a guard.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":290}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  );

-- Batch 30: Questions 291-300 (10 questions)
INSERT INTO questions (
  id, title, content, type, difficulty, points, options, correct_answer, 
  explanation, test_cases, hints, tags, metadata, stats, category_id, 
  learning_card_id, is_active, created_at, updated_at, topic_id, time_limit
) VALUES (
    gen_random_uuid(),
    'What are the usecases of useLayoutEffect?',
    '<pre><code>      useLayoutEffect(() =&gt; {
        const width = divRef.current.offsetWidth;
        if (width &lt; 400) {
          divRef.current.style.background = &#039;blue&#039;; // prevents flicker
        }
      }, []);</code></pre>

You need to use `useLayoutEffect` when your effect **must run before the browser paints**, such as:

      *   **Reading layout measurements** (e.g., element size, scroll position)
      *   **Synchronously applying DOM styles** to prevent visual flicker
      *   **Animating layout or transitions**
      *   **Integrating with third-party libraries** that require DOM manipulation

      If there''s no visual or layout dependency, prefer `useEffect` — it''s more performance-friendly.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'You need to use `useLayoutEffect` when your effect **must run before the browser paints**, such as:

      *   **Reading layout measurements** (e.g., element size, scroll position)
      *   **Synchronously applying DOM styles** to prevent visual flicker
      *   **Animating layout or transitions**
      *   **Integrating with third-party libraries** that require DOM manipulation

      If there''s no visual or layout dependency, prefer `useEffect` — it''s more performance-friendly.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":291}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How does useLayoutEffect work during server-side rendering (SSR)?',
    '<pre><code>      const useIsomorphicLayoutEffect =
        typeof window !== &#039;undefined&#039; ? useLayoutEffect : useEffect;</code></pre>

The `useLayoutEffect` hook does **not run on the server**, because there is no DOM. React issues a warning in server environments like Next.js if `useLayoutEffect` is used directly.

     This can be mitigated using a conditional polyfill:


      i.e, Use `useIsomorphicLayoutEffect` in components that render both on client and server.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The `useLayoutEffect` hook does **not run on the server**, because there is no DOM. React issues a warning in server environments like Next.js if `useLayoutEffect` is used directly.

     This can be mitigated using a conditional polyfill:


      i.e, Use `useIsomorphicLayoutEffect` in components that render both on client and server.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":292}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What happens if you use useLayoutEffect for non-layout logic?',
    '<pre><code>      useLayoutEffect(() =&gt; {
        console.log(&quot;Tracking analytics&quot;);
        fetch(&#039;/log-page-view&#039;);
      }, []);</code></pre>

Using `useLayoutEffect` for logic **unrelated to layout or visual DOM changes** (such as logging, data fetching, or analytics) is **not recommended**. It can lead to **performance issues** or even unexpected behavior.

      **Example: Anti-pattern**
      The above usage delays the paint of the UI just to send a network request, which could (and should) be done after paint using useEffect.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Using `useLayoutEffect` for logic **unrelated to layout or visual DOM changes** (such as logging, data fetching, or analytics) is **not recommended**. It can lead to **performance issues** or even unexpected behavior.

      **Example: Anti-pattern**
      The above usage delays the paint of the UI just to send a network request, which could (and should) be done after paint using useEffect.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":293}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How does useLayoutEffect cause layout thrashing?',
    '<pre><code>      function ThrashingComponent() {
        const ref = useRef();

        useLayoutEffect(() =&gt; {
          const height = ref.current.offsetHeight; //Read
          ref.current.style.height = height + 20 + &#039;px&#039;; //Write
          const newHeight = ref.current.offsetHeight; //Read again — forces reflow
        }, []);

        return &lt;div ref={ref}&gt;Hello&lt;/div&gt;;
      }</code></pre>

The `useLayoutEffect` can **cause layout thrashing** when you **repeatedly read and write to the DOM** in ways that force the browser to recalculate layout multiple times per frame. This is because `useLayoutEffect` runs _before the browser paints_, these reflows happen _synchronously_, blocking rendering and degrading performance.

      **Example:**
      In the above code, each read/write cycle triggers synchronous reflows, blocking the main thread and delays UI rendering.

      This issue can be avoided by batching your DOM reads and writes and prevent unnecessary reads after writes.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The `useLayoutEffect` can **cause layout thrashing** when you **repeatedly read and write to the DOM** in ways that force the browser to recalculate layout multiple times per frame. This is because `useLayoutEffect` runs _before the browser paints_, these reflows happen _synchronously_, blocking rendering and degrading performance.

      **Example:**
      In the above code, each read/write cycle triggers synchronous reflows, blocking the main thread and delays UI rendering.

      This issue can be avoided by batching your DOM reads and writes and prevent unnecessary reads after writes.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":294}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How Do You Use useRef to Access a DOM Element in React? Give an example.',
    '<pre><code>        import React, { useRef } from &#039;react&#039;;
        
        function FocusInput() {
          const inputRef = useRef(null); // create the ref
        
          const handleFocus = () =&gt; {
            inputRef.current.focus(); // access DOM element and focus it
          };
        
          return (
              &lt;input type=&quot;text&quot; ref={inputRef} /&gt;
              &lt;button onClick={handleFocus}&gt;Focus the input&lt;/button&gt;
          );
        }</code></pre>

The `useRef` hook is commonly used in React to directly reference and interact with DOM elements — like focusing an input, scrolling to a section, or controlling media elements.
        
        When you assign a ref to a DOM element using useRef, React gives you access to the underlying DOM node via the .current property of the ref object.
        
        **Example: Focus an input**

       **Note:** The DOM reference is only available **after the component has mounted** — typically accessed in `useEffect` or event handlers.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The `useRef` hook is commonly used in React to directly reference and interact with DOM elements — like focusing an input, scrolling to a section, or controlling media elements.
        
        When you assign a ref to a DOM element using useRef, React gives you access to the underlying DOM node via the .current property of the ref object.
        
        **Example: Focus an input**

       **Note:** The DOM reference is only available **after the component has mounted** — typically accessed in `useEffect` or event handlers.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":295}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'Can you use useRef to persist values across renders??',
    '<pre><code>        function Timer() {
          const renderCount = useRef(0);
          useEffect(() =&gt; {
            renderCount.current++;
            console.log(&quot;Render count:&quot;, renderCount.current);
          });
        
          return &lt;div&gt;Check console for render count.&lt;/div&gt;;
        }</code></pre>

Yes, you can use `useRef` to persist values across renders in React. Unlike `useState`, changing `.current` does not cause re-renders, but the value is preserved across renders.
        
        **Example:**',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Yes, you can use `useRef` to persist values across renders in React. Unlike `useState`, changing `.current` does not cause re-renders, but the value is preserved across renders.
        
        **Example:**',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":296}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'Can useRef be used to store previous values?',
    '<pre><code>        import { useEffect, useRef, useState } from &#039;react&#039;;
        
        function PreviousValueExample() {
          const [count, setCount] = useState(0);
          const prevCountRef = useRef();
        
          useEffect(() =&gt; {
            prevCountRef.current = count;
          }, [count]);
        
          const prevCount = prevCountRef.current;
        
          return (
              &lt;p&gt;Current: {count}&lt;/p&gt;
              &lt;p&gt;Previous: {prevCount}&lt;/p&gt;
              &lt;button onClick={() =&gt; setCount(c =&gt; c + 1)}&gt;Increment&lt;/button&gt;
          );
        }</code></pre>

Yes, `useRef` is a common pattern when you want to compare current and previous props or state without causing re-renders.
        
        **Example: Storing previous state value**',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Yes, `useRef` is a common pattern when you want to compare current and previous props or state without causing re-renders.
        
        **Example: Storing previous state value**',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":297}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'Is it possible to access a ref in the render method?',
    '<pre><code>        const divRef = useRef(null);
        
        console.log(divRef.current); // ❌ null on initial render
        return &lt;div ref={divRef}&gt;Hello&lt;/div&gt;;</code></pre>

Yes, you can access a ref in the render method, but what you get from it depends on how you''re using the ref and when in the component lifecycle you''re rendering.
        
        For example, when using ref to access a DOM node (e.g., divRef.current), it''s not immediately available on the first render.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Yes, you can access a ref in the render method, but what you get from it depends on how you''re using the ref and when in the component lifecycle you''re rendering.
        
        For example, when using ref to access a DOM node (e.g., divRef.current), it''s not immediately available on the first render.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":298}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What are the common usecases of useRef hook?',
    'Some of the common cases are:
      *   Automatically focus an input when a component mounts.
      *   Scroll to a specific element.
      *   Measure element dimensions (`offsetWidth`, `clientHeight`).
      *   Control video/audio playback.
      *   Integrate with non-React libraries (like D3 or jQuery).',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Some of the common cases are:
      *   Automatically focus an input when a component mounts.
      *   Scroll to a specific element.
      *   Measure element dimensions (`offsetWidth`, `clientHeight`).
      *   Control video/audio playback.
      *   Integrate with non-React libraries (like D3 or jQuery).',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":299}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is useImperativeHandle Hook? Give an example.',
    '<pre><code>      import React, {
        useRef,
        useState,
        useImperativeHandle,
        forwardRef,
      } from &#039;react&#039;;
      import &#039;./Dialog.css&#039;; 

      const Dialog = forwardRef((props, ref) =&gt; {
        const [isOpen, setIsOpen] = useState(false);
        const [formData, setFormData] = useState(&#039;&#039;);

        useImperativeHandle(ref, () =&gt; ({
          open: () =&gt; setIsOpen(true),
          close: () =&gt; setIsOpen(false),
          reset: () =&gt; setFormData(&#039;&#039;),
        }));

        if (!isOpen) return null;

        return (
            &lt;h2&gt;Dialog&lt;/h2&gt;
            &lt;input
              type=&quot;text&quot;
              value={formData}
              placeholder=&quot;Type something...&quot;
              onChange={(e) =&gt; setFormData(e.target.value)}
            /&gt;
            &lt;br /&gt;
            &lt;button onClick={() =&gt; setIsOpen(false)}&gt;Close&lt;/button&gt;
        );
      });

      function Parent() {
        const dialogRef = useRef();

        return (
            &lt;h1&gt;useImperativeHandle Dialog Example&lt;/h1&gt;
            &lt;button onClick={() =&gt; dialogRef.current.open()}&gt;Open Dialog&lt;/button&gt;
            &lt;button onClick={() =&gt; dialogRef.current.reset()}&gt;Reset Dialog&lt;/button&gt;
            &lt;button onClick={() =&gt; dialogRef.current.close()}&gt;Close Dialog&lt;/button&gt;

            &lt;Dialog ref={dialogRef} /&gt;
        );
      }

      export default Parent;</code></pre>

`useImperativeHandle` is a React Hook that allows a **child component** to expose **custom functions or properties** to its **parent component**, when using `ref`.
      It is typically used with `forwardRef` and is very useful in cases like **modals**, **dialogs**, **custom inputs**, etc., where the parent needs to **control behavior imperatively** (e.g., open, close, reset).

      **Example: Dialog component**',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    '`useImperativeHandle` is a React Hook that allows a **child component** to expose **custom functions or properties** to its **parent component**, when using `ref`.
      It is typically used with `forwardRef` and is very useful in cases like **modals**, **dialogs**, **custom inputs**, etc., where the parent needs to **control behavior imperatively** (e.g., open, close, reset).

      **Example: Dialog component**',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":300}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  );

-- Batch 31: Questions 301-310 (10 questions)
INSERT INTO questions (
  id, title, content, type, difficulty, points, options, correct_answer, 
  explanation, test_cases, hints, tags, metadata, stats, category_id, 
  learning_card_id, is_active, created_at, updated_at, topic_id, time_limit
) VALUES (
    gen_random_uuid(),
    'When should you use useImperativeHandle?',
    'The useImperativeHandler hook will be used in below cases:

      *   You want to expose **imperative methods** from a child component 
            - Custom input controls exposing `focus`, `clear`, or `validate` methods
            - Modal components exposing `open()` and `close()` methods
            - Scroll containers exposing `scrollToTop()` or `scrollToBottom()` methods
      *   You want to **hide internal implementation** but provide controlled external access.
      *   You''re building **reusable component libraries** (e.g., inputs, modals, form controls).',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The useImperativeHandler hook will be used in below cases:

      *   You want to expose **imperative methods** from a child component 
            - Custom input controls exposing `focus`, `clear`, or `validate` methods
            - Modal components exposing `open()` and `close()` methods
            - Scroll containers exposing `scrollToTop()` or `scrollToBottom()` methods
      *   You want to **hide internal implementation** but provide controlled external access.
      *   You''re building **reusable component libraries** (e.g., inputs, modals, form controls).',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":301}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'Is that possible to use useImperativeHandle without forwardRef?',
    '**No.** `useImperativeHandle` only works when the component is wrapped in `forwardRef`. It''s the combination that allows parent components to use a `ref` on a function component.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    '**No.** `useImperativeHandle` only works when the component is wrapped in `forwardRef`. It''s the combination that allows parent components to use a `ref` on a function component.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":302}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How is useMemo different from useCallback?',
    'The following table compares both useMemo and useCallback:

      | Feature | `useMemo` | `useCallback` |
      | --- | --- | --- |
      | **Purpose** | Memoizes the **result of a computation** | Memoizes a **function reference** |
      | **Returns** | A **value** (e.g., result of a function) | A **function** |
      | **Usage** | `useMemo(() => computeValue(), [deps])` | `useCallback(() => doSomething(), [deps])` |
      | **Primary Use Case** | Avoid expensive recalculations | Prevent unnecessary re-creations of functions |
      | **Common Scenario** | Filtering, sorting, calculating derived data | Passing callbacks to child components |
      | **When It''s Useful** | When the value is expensive to compute | When referential equality matters (e.g., props) |
      | **Recomputed When** | Dependencies change | Dependencies change |
      | **Returned Value Type** | Any (number, object, array, etc.) | Always a function |
      | **Overhead** | Slight (evaluates a function and caches result) | Slight (caches a function reference) |',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The following table compares both useMemo and useCallback:

      | Feature | `useMemo` | `useCallback` |
      | --- | --- | --- |
      | **Purpose** | Memoizes the **result of a computation** | Memoizes a **function reference** |
      | **Returns** | A **value** (e.g., result of a function) | A **function** |
      | **Usage** | `useMemo(() => computeValue(), [deps])` | `useCallback(() => doSomething(), [deps])` |
      | **Primary Use Case** | Avoid expensive recalculations | Prevent unnecessary re-creations of functions |
      | **Common Scenario** | Filtering, sorting, calculating derived data | Passing callbacks to child components |
      | **When It''s Useful** | When the value is expensive to compute | When referential equality matters (e.g., props) |
      | **Recomputed When** | Dependencies change | Dependencies change |
      | **Returned Value Type** | Any (number, object, array, etc.) | Always a function |
      | **Overhead** | Slight (evaluates a function and caches result) | Slight (caches a function reference) |',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":303}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'Does useMemo prevent re-rendering of child components?',
    'The `useMemo` hook **does not directly prevent re-rendering of child components**. Its main purpose is to memoize the result of an expensive computation so that it doesn’t get recalculated unless its dependencies change. While this can improve performance, it doesn’t inherently control whether a child component re-renders.
        
        However, `useMemo` **can help prevent re-renders** when the memoized value is passed as a prop to a child component that is wrapped in `React.memo`. In that case, if the memoized value doesn’t change between renders (i.e., it has the same reference), React.memo can skip re-rendering the child. So, while `useMemo` doesn’t stop renders on its own, it **works in combination** with tools like `React.memo` to optimize rendering behavior.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The `useMemo` hook **does not directly prevent re-rendering of child components**. Its main purpose is to memoize the result of an expensive computation so that it doesn’t get recalculated unless its dependencies change. While this can improve performance, it doesn’t inherently control whether a child component re-renders.
        
        However, `useMemo` **can help prevent re-renders** when the memoized value is passed as a prop to a child component that is wrapped in `React.memo`. In that case, if the memoized value doesn’t change between renders (i.e., it has the same reference), React.memo can skip re-rendering the child. So, while `useMemo` doesn’t stop renders on its own, it **works in combination** with tools like `React.memo` to optimize rendering behavior.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":304}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is `useCallback` and why is it used?',
    '<pre><code>        const handleClick = useCallback(() =&gt; {
          console.log(&#039;Button clicked&#039;);
        }, []);</code></pre>

The `useCallback` is a React Hook used to memoize **function definitions** between renders. It returns the same function reference unless its dependencies change. This is especially useful when passing callbacks to optimized child components (e.g. those wrapped in `React.memo`) to prevent unnecessary re-renders.
        
        **Example:**
        
        
        Without `useCallback`, a new function is created on every render, potentially causing child components to re-render unnecessarily.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The `useCallback` is a React Hook used to memoize **function definitions** between renders. It returns the same function reference unless its dependencies change. This is especially useful when passing callbacks to optimized child components (e.g. those wrapped in `React.memo`) to prevent unnecessary re-renders.
        
        **Example:**
        
        
        Without `useCallback`, a new function is created on every render, potentially causing child components to re-render unnecessarily.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":305}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What are Custom React Hooks, and How Can You Develop One?',
    '<pre><code>      function AuthorList() {
        const { data, loading, error } = useFetchData(&#039;https://api.example.com/authors&#039;);

        if (loading) return &lt;p&gt;Loading authors...&lt;/p&gt;;
        if (error) return &lt;p&gt;Error: {error}&lt;/p&gt;;

        return (
          &lt;ul&gt;
            {data.map((author) =&gt; (
              &lt;li key={author.id}&gt;{author.name}&lt;/li&gt;
            ))}
          &lt;/ul&gt;
        );
      }</code></pre>

**Custom Hooks** in React are JavaScript functions that allow you to **extract and reuse component logic** using React’s built-in Hooks like `useState`, `useEffect`, etc.

      They start with the word **"use"** and let you encapsulate logic that multiple components might share—such as fetching data, handling forms, or managing timers—without repeating code.

      Let''s explain the custom hook usage with `useFetchData` example. The `useFetchData` custom Hook is a reusable function in React that simplifies the process of fetching data from an API. It encapsulates common logic such as initiating the fetch request, managing loading and error states, and storing the fetched data. By using built-in Hooks like `useState` and `useEffect`, `useFetchData` provides a clean interface that returns the `data`, `loading`, and `error` values, which can be directly used in components.


      The above custom hook can be used to retrieve users data for `AuthorList`, `ReviewerList` components.

      **Example: AuthorList component**
     
      Some of the benefits of custom hooks are:
       *   Promotes **code reuse**
       *   Keeps components **clean and focused**
       *   Makes complex logic **easier to test and maintain**',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    '**Custom Hooks** in React are JavaScript functions that allow you to **extract and reuse component logic** using React’s built-in Hooks like `useState`, `useEffect`, etc.

      They start with the word **"use"** and let you encapsulate logic that multiple components might share—such as fetching data, handling forms, or managing timers—without repeating code.

      Let''s explain the custom hook usage with `useFetchData` example. The `useFetchData` custom Hook is a reusable function in React that simplifies the process of fetching data from an API. It encapsulates common logic such as initiating the fetch request, managing loading and error states, and storing the fetched data. By using built-in Hooks like `useState` and `useEffect`, `useFetchData` provides a clean interface that returns the `data`, `loading`, and `error` values, which can be directly used in components.


      The above custom hook can be used to retrieve users data for `AuthorList`, `ReviewerList` components.

      **Example: AuthorList component**
     
      Some of the benefits of custom hooks are:
       *   Promotes **code reuse**
       *   Keeps components **clean and focused**
       *   Makes complex logic **easier to test and maintain**',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":306}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How does React Fiber works? Explain in detail.',
    'React Fiber is the **core engine** that enables advanced features like **concurrent rendering**, **prioritization**, and **interruptibility** in React. Here''s how it works:
          
      ### 1. **Fiber Tree Structure**
          
      Each component in your app is represented by a **Fiber node** in a tree structure. A Fiber node contains:
      *   Component type
      *   Props & state
      *   Pointers to parent, child, and sibling nodes
      *   Effect tags to track changes (e.g., update, placement)
      *   This forms the **Fiber Tree**, a data structure React uses instead of the traditional call stack.
          
      ### 2. **Two Phases of Rendering**
          
        #### **A. Render Phase (work-in-progress)**
          
      *   React builds a **work-in-progress Fiber tree**.
      *   It walks through each component (begin phase), calculates what needs to change, and collects side effects (complete phase).
      *   This phase is **interruptible**—React can pause it and resume later.
        #### **B. Commit Phase**
          
      *   React applies changes to the **Real DOM**.
      *   Runs lifecycle methods (e.g., `componentDidMount`, `useEffect`).
      *   This phase is **non-interruptible** but fast.
          
        ### 3. **Work Units and Scheduling**
          
      *   React breaks rendering into **units of work** (small tasks).
      *   These units are scheduled based on **priority** using the **React Scheduler**.
      *   If time runs out (e.g., user starts typing), React can **pause and yield** control back to the browser.
          
        ### 4. **Double Buffering with Two Trees**
          
      *   React maintains two trees:
      *   **Current Tree** – what''s visible on the screen.
      *   **Work-In-Progress Tree** – the next version being built in memory.
      *   Only after the new tree is fully ready, React **commits** it, making it the new current tree.
          
        ### 5. **Concurrency and Prioritization**
          
      *   React can prepare multiple versions of UI at once (e.g., during slow data loading).
      *   Updates can be **assigned priorities**, so urgent updates (like clicks) are handled faster than background work.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'React Fiber is the **core engine** that enables advanced features like **concurrent rendering**, **prioritization**, and **interruptibility** in React. Here''s how it works:
          
      ### 1. **Fiber Tree Structure**
          
      Each component in your app is represented by a **Fiber node** in a tree structure. A Fiber node contains:
      *   Component type
      *   Props & state
      *   Pointers to parent, child, and sibling nodes
      *   Effect tags to track changes (e.g., update, placement)
      *   This forms the **Fiber Tree**, a data structure React uses instead of the traditional call stack.
          
      ### 2. **Two Phases of Rendering**
          
        #### **A. Render Phase (work-in-progress)**
          
      *   React builds a **work-in-progress Fiber tree**.
      *   It walks through each component (begin phase), calculates what needs to change, and collects side effects (complete phase).
      *   This phase is **interruptible**—React can pause it and resume later.
        #### **B. Commit Phase**
          
      *   React applies changes to the **Real DOM**.
      *   Runs lifecycle methods (e.g., `componentDidMount`, `useEffect`).
      *   This phase is **non-interruptible** but fast.
          
        ### 3. **Work Units and Scheduling**
          
      *   React breaks rendering into **units of work** (small tasks).
      *   These units are scheduled based on **priority** using the **React Scheduler**.
      *   If time runs out (e.g., user starts typing), React can **pause and yield** control back to the browser.
          
        ### 4. **Double Buffering with Two Trees**
          
      *   React maintains two trees:
      *   **Current Tree** – what''s visible on the screen.
      *   **Work-In-Progress Tree** – the next version being built in memory.
      *   Only after the new tree is fully ready, React **commits** it, making it the new current tree.
          
        ### 5. **Concurrency and Prioritization**
          
      *   React can prepare multiple versions of UI at once (e.g., during slow data loading).
      *   Updates can be **assigned priorities**, so urgent updates (like clicks) are handled faster than background work.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":307}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'Why should we not update the state directly?',
    '<pre><code>   //Correct
   this.setState({ message: &quot;Hello World&quot; });</code></pre>

If you try to update the state directly then it won''t re-render the component.


   Instead use `setState()` method. It schedules an update to a component''s state object. When state changes, the component responds by re-rendering.


   **Note:** You can directly assign to the state object either in _constructor_ or using latest javascript''s class field declaration syntax.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'If you try to update the state directly then it won''t re-render the component.


   Instead use `setState()` method. It schedules an update to a component''s state object. When state changes, the component responds by re-rendering.


   **Note:** You can directly assign to the state object either in _constructor_ or using latest javascript''s class field declaration syntax.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":1}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is the purpose of callback function as an argument of `setState()`?',
    '<pre><code>    this.setState({ name: &quot;Sudheer&quot; }, () =&gt; {
      console.log(&quot;The name has been updated and the component has re-rendered.&quot;);
    });</code></pre>

The callback function provided as the second argument to `setState` is executed after the state has been updated and the component has re-rendered. Because `setState()` is asynchronous, you cannot reliably perform actions that require the updated state immediately after calling `setState`. The callback ensures your code runs only after the update and re-render are complete.

    #### Example


    #### When to use the callback?

    Use the `setState` callback when you need to perform an action immediately after the DOM has been updated in response to a state change. i.e, The callback is a reliable way to perform actions after a state update and re-render, especially when the timing is critical due to the asynchronous nature of state updates in React. For example, if you need to interact with the updated DOM, trigger analytics, or perform further computations that depend on the new state or rendered output.

    #### Note

    - In modern React (with function components), you can achieve similar effects using the `useEffect` hook to respond to state changes.
    - In class components, you can also use lifecycle methods like `componentDidUpdate` for broader post-update logic.
    - The `setState` callback is still useful for one-off actions that directly follow a specific state change.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The callback function provided as the second argument to `setState` is executed after the state has been updated and the component has re-rendered. Because `setState()` is asynchronous, you cannot reliably perform actions that require the updated state immediately after calling `setState`. The callback ensures your code runs only after the update and re-render are complete.

    #### Example


    #### When to use the callback?

    Use the `setState` callback when you need to perform an action immediately after the DOM has been updated in response to a state change. i.e, The callback is a reliable way to perform actions after a state update and re-render, especially when the timing is critical due to the asynchronous nature of state updates in React. For example, if you need to interact with the updated DOM, trigger analytics, or perform further computations that depend on the new state or rendered output.

    #### Note

    - In modern React (with function components), you can achieve similar effects using the `useEffect` hook to respond to state changes.
    - In class components, you can also use lifecycle methods like `componentDidUpdate` for broader post-update logic.
    - The `setState` callback is still useful for one-off actions that directly follow a specific state change.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":2}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How to bind methods or event handlers in JSX callbacks?',
    '<pre><code>      handleClick() {
          console.log(&#039;SingOut triggered&#039;);
      }
      render() {
          return &lt;button onClick={() =&gt; this.handleClick()}&gt;SignOut&lt;/button&gt;;
      }</code></pre>

There are 3 possible ways to achieve this in class components:

   1. **Binding in Constructor:** In JavaScript classes, the methods are not bound by default. The same rule applies for React event handlers defined as class methods. Normally we bind them in constructor.


   2. **Public class fields syntax:** If you don''t like to use bind approach then _public class fields syntax_ can be used to correctly bind callbacks. The Create React App enables this syntax by default.



   3. **Arrow functions in callbacks:** It is possible to use _arrow functions_ directly in the callbacks.


   **Note:** If the callback is passed as prop to child components, those components might do an extra re-rendering. In those cases, it is preferred to go with `.bind()` or _public class fields syntax_ approach considering performance.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'There are 3 possible ways to achieve this in class components:

   1. **Binding in Constructor:** In JavaScript classes, the methods are not bound by default. The same rule applies for React event handlers defined as class methods. Normally we bind them in constructor.


   2. **Public class fields syntax:** If you don''t like to use bind approach then _public class fields syntax_ can be used to correctly bind callbacks. The Create React App enables this syntax by default.



   3. **Arrow functions in callbacks:** It is possible to use _arrow functions_ directly in the callbacks.


   **Note:** If the callback is passed as prop to child components, those components might do an extra re-rendering. In those cases, it is preferred to go with `.bind()` or _public class fields syntax_ approach considering performance.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":3}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  );

-- Batch 32: Questions 311-320 (10 questions)
INSERT INTO questions (
  id, title, content, type, difficulty, points, options, correct_answer, 
  explanation, test_cases, hints, tags, metadata, stats, category_id, 
  learning_card_id, is_active, created_at, updated_at, topic_id, time_limit
) VALUES (
    gen_random_uuid(),
    'How to pass a parameter to an event handler or callback?',
    '<pre><code>   &lt;button onClick={this.handleClick(id)} /&gt;;
   handleClick = (id) =&gt; () =&gt; {
     console.log(&quot;Hello, your ticket number is&quot;, id);
   };</code></pre>

You can use an _arrow function_ to wrap around an _event handler_ and pass parameters:


   This is an equivalent to calling `.bind`:


   Apart from these two approaches, you can also pass arguments to a function which is defined as arrow function',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'You can use an _arrow function_ to wrap around an _event handler_ and pass parameters:


   This is an equivalent to calling `.bind`:


   Apart from these two approaches, you can also pass arguments to a function which is defined as arrow function',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":4}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is the use of refs?',
    'The _ref_ is used to return a reference to the element. They _should be avoided_ in most cases, however, they can be useful when you need a direct access to the DOM element or an instance of a component.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The _ref_ is used to return a reference to the element. They _should be avoided_ in most cases, however, they can be useful when you need a direct access to the DOM element or an instance of a component.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":5}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How to create refs?',
    '<pre><code>      class SearchBar extends Component {
        constructor(props) {
          super(props);
          this.txtSearch = null;
          this.state = { term: &quot;&quot; };
          this.setInputSearchRef = (e) =&gt; {
            this.txtSearch = e;
          };
        }
        onInputChange(event) {
          this.setState({ term: this.txtSearch.value });
        }
        render() {
          return (
            &lt;input
              value={this.state.term}
              onChange={this.onInputChange.bind(this)}
              ref={this.setInputSearchRef}
            /&gt;
          );
        }
      }</code></pre>

There are two approaches

   1. This is a recently added approach. _Refs_ are created using `React.createRef()` method and attached to React elements via the `ref` attribute. In order to use _refs_ throughout the component, just assign the _ref_ to the instance property within constructor.


   2. You can also use ref callbacks approach regardless of React version. For example, the search bar component''s input element is accessed as follows,

   You can also use _refs_ in function components using **closures**.
   **Note**: You can also use inline ref callbacks even though it is not a recommended approach.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'There are two approaches

   1. This is a recently added approach. _Refs_ are created using `React.createRef()` method and attached to React elements via the `ref` attribute. In order to use _refs_ throughout the component, just assign the _ref_ to the instance property within constructor.


   2. You can also use ref callbacks approach regardless of React version. For example, the search bar component''s input element is accessed as follows,

   You can also use _refs_ in function components using **closures**.
   **Note**: You can also use inline ref callbacks even though it is not a recommended approach.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":6}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What are forward refs?',
    '<pre><code>   const ButtonElement = React.forwardRef((props, ref) =&gt; (
     &lt;button ref={ref} className=&quot;CustomButton&quot;&gt;
       {props.children}
     &lt;/button&gt;
   ));

   // Create ref to the DOM button:
   const ref = React.createRef();
   &lt;ButtonElement ref={ref}&gt;{&quot;Forward Ref&quot;}&lt;/ButtonElement&gt;;</code></pre>

_Ref forwarding_ is a feature that lets some components take a _ref_ they receive, and pass it further down to a child.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    '_Ref forwarding_ is a feature that lets some components take a _ref_ they receive, and pass it further down to a child.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":7}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'Which is preferred option with in callback refs and findDOMNode()?',
    '<pre><code>   class MyComponent extends Component {
     constructor(props) {
       super(props);
       this.node = createRef();
     }
     componentDidMount() {
       this.node.current.scrollIntoView();
     }

     render() {
       return &lt;div ref={this.node} /&gt;;
     }
   }</code></pre>

It is preferred to use _callback refs_ over `findDOMNode()` API. Because `findDOMNode()` prevents certain improvements in React in the future.

   The **legacy** approach of using `findDOMNode`:


   The recommended approach is:',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'It is preferred to use _callback refs_ over `findDOMNode()` API. Because `findDOMNode()` prevents certain improvements in React in the future.

   The **legacy** approach of using `findDOMNode`:


   The recommended approach is:',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":8}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'Why are String Refs legacy?',
    '<pre><code>      class MyComponent extends Component {
        renderRow = (index) =&gt; {
          // This won&#039;t work. Ref will get attached to DataTable rather than MyComponent:
          return &lt;input ref={&quot;input-&quot; + index} /&gt;;

          // This would work though! Callback refs are awesome.
          return &lt;input ref={(input) =&gt; (this[&quot;input-&quot; + index] = input)} /&gt;;
        };

        render() {
          return (
            &lt;DataTable data={this.props.data} renderRow={this.renderRow} /&gt;
          );
        }
      }</code></pre>

If you worked with React before, you might be familiar with an older API where the `ref` attribute is a string, like `ref={''textInput''}`, and the DOM node is accessed as `this.refs.textInput`. We advise against it because _string refs have below issues_, and are considered legacy. String refs were **removed in React v16**.

   1. They _force React to keep track of currently executing component_. This is problematic because it makes react module stateful, and thus causes weird errors when react module is duplicated in the bundle.
   2. They are _not composable_ — if a library puts a ref on the passed child, the user can''t put another ref on it. Callback refs are perfectly composable.
   3. They _don''t work with static analysis_ like Flow. Flow can''t guess the magic that framework does to make the string ref appear on `this.refs`, as well as its type (which could be different). Callback refs are friendlier to static analysis.
   4. It doesn''t work as most people would expect with the "render callback" pattern (e.g. <DataGrid renderRow={this.renderRow} />)',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'If you worked with React before, you might be familiar with an older API where the `ref` attribute is a string, like `ref={''textInput''}`, and the DOM node is accessed as `this.refs.textInput`. We advise against it because _string refs have below issues_, and are considered legacy. String refs were **removed in React v16**.

   1. They _force React to keep track of currently executing component_. This is problematic because it makes react module stateful, and thus causes weird errors when react module is duplicated in the bundle.
   2. They are _not composable_ — if a library puts a ref on the passed child, the user can''t put another ref on it. Callback refs are perfectly composable.
   3. They _don''t work with static analysis_ like Flow. Flow can''t guess the magic that framework does to make the string ref appear on `this.refs`, as well as its type (which could be different). Callback refs are friendlier to static analysis.
   4. It doesn''t work as most people would expect with the "render callback" pattern (e.g. <DataGrid renderRow={this.renderRow} />)',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":9}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What are the different phases of component lifecycle?',
    'The component lifecycle has three distinct lifecycle phases:

    1. **Mounting:** The component is ready to mount in the browser DOM. This phase covers initialization from `constructor()`, `getDerivedStateFromProps()`, `render()`, and `componentDidMount()` lifecycle methods.

    2. **Updating:** In this phase, the component gets updated in two ways, sending the new props and updating the state either from `setState()` or `forceUpdate()`. This phase covers `getDerivedStateFromProps()`, `shouldComponentUpdate()`, `render()`, `getSnapshotBeforeUpdate()` and `componentDidUpdate()` lifecycle methods.

    3. **Unmounting:** In this last phase, the component is not needed and gets unmounted from the browser DOM. This phase includes `componentWillUnmount()` lifecycle method.

    It''s worth mentioning that React internally has a concept of phases when applying changes to the DOM. They are separated as follows

    4. **Render** The component will render without any side effects. This applies to Pure components and in this phase, React can pause, abort, or restart the render.

    5. **Pre-commit** Before the component actually applies the changes to the DOM, there is a moment that allows React to read from the DOM through the `getSnapshotBeforeUpdate()`.

    6. **Commit** React works with the DOM and executes the final lifecycles respectively `componentDidMount()` for mounting, `componentDidUpdate()` for updating, and `componentWillUnmount()` for unmounting.

    React 16.3+ Phases (or an [interactive version](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/))

    ![phases 16.4+](images/phases16.4.png)

    Before React 16.3

    ![phases 16.2](images/phases.png)',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The component lifecycle has three distinct lifecycle phases:

    1. **Mounting:** The component is ready to mount in the browser DOM. This phase covers initialization from `constructor()`, `getDerivedStateFromProps()`, `render()`, and `componentDidMount()` lifecycle methods.

    2. **Updating:** In this phase, the component gets updated in two ways, sending the new props and updating the state either from `setState()` or `forceUpdate()`. This phase covers `getDerivedStateFromProps()`, `shouldComponentUpdate()`, `render()`, `getSnapshotBeforeUpdate()` and `componentDidUpdate()` lifecycle methods.

    3. **Unmounting:** In this last phase, the component is not needed and gets unmounted from the browser DOM. This phase includes `componentWillUnmount()` lifecycle method.

    It''s worth mentioning that React internally has a concept of phases when applying changes to the DOM. They are separated as follows

    4. **Render** The component will render without any side effects. This applies to Pure components and in this phase, React can pause, abort, or restart the render.

    5. **Pre-commit** Before the component actually applies the changes to the DOM, there is a moment that allows React to read from the DOM through the `getSnapshotBeforeUpdate()`.

    6. **Commit** React works with the DOM and executes the final lifecycles respectively `componentDidMount()` for mounting, `componentDidUpdate()` for updating, and `componentWillUnmount()` for unmounting.

    React 16.3+ Phases (or an [interactive version](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/))

    ![phases 16.4+](images/phases16.4.png)

    Before React 16.3

    ![phases 16.2](images/phases.png)',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":10}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What are the lifecycle methods of React?',
    'Before React 16.3

    - **componentWillMount:** Executed before rendering and is used for App level configuration in your root component.
    - **componentDidMount:** Executed after first rendering and here all AJAX requests, DOM or state updates, and set up event listeners should occur.
    - **componentWillReceiveProps:** Executed when particular prop updates to trigger state transitions.
    - **shouldComponentUpdate:** Determines if the component will be updated or not. By default it returns `true`. If you are sure that the component doesn''t need to render after state or props are updated, you can return false value. It is a great place to improve performance as it allows you to prevent a re-render if component receives new prop.
    - **componentWillUpdate:** Executed before re-rendering the component when there are props & state changes confirmed by `shouldComponentUpdate()` which returns true.
    - **componentDidUpdate:** Mostly it is used to update the DOM in response to prop or state changes.
    - **componentWillUnmount:** It will be used to cancel any outgoing network requests, or remove all event listeners associated with the component.

    React 16.3+

    - **getDerivedStateFromProps:** Invoked right before calling `render()` and is invoked on _every_ render. This exists for rare use cases where you need a derived state. Worth reading [if you need derived state](https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html).
    - **componentDidMount:** Executed after first rendering and where all AJAX requests, DOM or state updates, and set up event listeners should occur.
    - **shouldComponentUpdate:** Determines if the component will be updated or not. By default, it returns `true`. If you are sure that the component doesn''t need to render after the state or props are updated, you can return a false value. It is a great place to improve performance as it allows you to prevent a re-render if component receives a new prop.
    - **getSnapshotBeforeUpdate:** Executed right before rendered output is committed to the DOM. Any value returned by this will be passed into `componentDidUpdate()`. This is useful to capture information from the DOM i.e. scroll position.
    - **componentDidUpdate:** Mostly it is used to update the DOM in response to prop or state changes. This will not fire if `shouldComponentUpdate()` returns `false`.
    - **componentWillUnmount** It will be used to cancel any outgoing network requests, or remove all event listeners associated with the component.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Before React 16.3

    - **componentWillMount:** Executed before rendering and is used for App level configuration in your root component.
    - **componentDidMount:** Executed after first rendering and here all AJAX requests, DOM or state updates, and set up event listeners should occur.
    - **componentWillReceiveProps:** Executed when particular prop updates to trigger state transitions.
    - **shouldComponentUpdate:** Determines if the component will be updated or not. By default it returns `true`. If you are sure that the component doesn''t need to render after state or props are updated, you can return false value. It is a great place to improve performance as it allows you to prevent a re-render if component receives new prop.
    - **componentWillUpdate:** Executed before re-rendering the component when there are props & state changes confirmed by `shouldComponentUpdate()` which returns true.
    - **componentDidUpdate:** Mostly it is used to update the DOM in response to prop or state changes.
    - **componentWillUnmount:** It will be used to cancel any outgoing network requests, or remove all event listeners associated with the component.

    React 16.3+

    - **getDerivedStateFromProps:** Invoked right before calling `render()` and is invoked on _every_ render. This exists for rare use cases where you need a derived state. Worth reading [if you need derived state](https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html).
    - **componentDidMount:** Executed after first rendering and where all AJAX requests, DOM or state updates, and set up event listeners should occur.
    - **shouldComponentUpdate:** Determines if the component will be updated or not. By default, it returns `true`. If you are sure that the component doesn''t need to render after the state or props are updated, you can return a false value. It is a great place to improve performance as it allows you to prevent a re-render if component receives a new prop.
    - **getSnapshotBeforeUpdate:** Executed right before rendered output is committed to the DOM. Any value returned by this will be passed into `componentDidUpdate()`. This is useful to capture information from the DOM i.e. scroll position.
    - **componentDidUpdate:** Mostly it is used to update the DOM in response to prop or state changes. This will not fire if `shouldComponentUpdate()` returns `false`.
    - **componentWillUnmount** It will be used to cancel any outgoing network requests, or remove all event listeners associated with the component.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":11}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How to create props proxy for HOC component?',
    '<pre><code>    function HOC(WrappedComponent) {
      return class Test extends Component {
        render() {
          const newProps = {
            title: &quot;New Header&quot;,
            footer: false,
            showFeatureX: false,
            showFeatureY: true,
          };

          return &lt;WrappedComponent {...this.props} {...newProps} /&gt;;
        }
      };
    }</code></pre>

You can add/edit props passed to the component using _props proxy_ pattern like this:',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'You can add/edit props passed to the component using _props proxy_ pattern like this:',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":12}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is context?',
    '<pre><code>    const { Provider, Consumer } = React.createContext(defaultValue);</code></pre>

_Context_ provides a way to pass data through the component tree without having to pass props down manually at every level.

    For example, authenticated users, locale preferences, UI themes need to be accessed in the application by many components.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    '_Context_ provides a way to pass data through the component tree without having to pass props down manually at every level.

    For example, authenticated users, locale preferences, UI themes need to be accessed in the application by many components.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":13}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  );

-- Batch 33: Questions 321-330 (10 questions)
INSERT INTO questions (
  id, title, content, type, difficulty, points, options, correct_answer, 
  explanation, test_cases, hints, tags, metadata, stats, category_id, 
  learning_card_id, is_active, created_at, updated_at, topic_id, time_limit
) VALUES (
    gen_random_uuid(),
    'What is the purpose of using super constructor with props argument?',
    '<pre><code>    class MyComponent extends React.Component {
      constructor(props) {
        super();

        console.log(this.props); // prints undefined

        // but props parameter is still available
        console.log(props); // prints { name: &#039;John&#039;, age: 42 }
      }

      render() {
        // no difference outside constructor
        console.log(this.props); // prints { name: &#039;John&#039;, age: 42 }
      }
    }</code></pre>

A child class constructor cannot make use of `this` reference until the `super()` method has been called. The same applies to ES6 sub-classes as well. The main reason for passing props parameter to `super()` call is to access `this.props` in your child constructors.

    **Passing props:**


    **Not passing props:**


    The above code snippets reveals that `this.props` is different only within the constructor. It would be the same outside the constructor.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'A child class constructor cannot make use of `this` reference until the `super()` method has been called. The same applies to ES6 sub-classes as well. The main reason for passing props parameter to `super()` call is to access `this.props` in your child constructors.

    **Passing props:**


    **Not passing props:**


    The above code snippets reveals that `this.props` is different only within the constructor. It would be the same outside the constructor.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":14}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How to set state with a dynamic key name?',
    '<pre><code>    handleInputChange(event) {
      this.setState({ [event.target.id]: event.target.value })
    }</code></pre>

If you are using ES6 or the Babel transpiler to transform your JSX code then you can accomplish this with _computed property names_.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'If you are using ES6 or the Babel transpiler to transform your JSX code then you can accomplish this with _computed property names_.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":15}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What would be the common mistake of function being called every time the component renders?',
    '<pre><code>    render() {
      // Correct: handleClick is passed as a reference!
      return &lt;button onClick={this.handleClick}&gt;{&#039;Click Me&#039;}&lt;/button&gt;
    }</code></pre>

You need to make sure that function is not being called while passing the function as a parameter.


    Instead, pass the function itself without parenthesis:',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'You need to make sure that function is not being called while passing the function as a parameter.


    Instead, pass the function itself without parenthesis:',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":16}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What are error boundaries in React v16?',
    '<pre><code>    &lt;ErrorBoundary&gt;
      &lt;MyWidget /&gt;
    &lt;/ErrorBoundary&gt;</code></pre>

_Error boundaries_ are components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed.

    A class component becomes an error boundary if it defines a new lifecycle method called `componentDidCatch(error, info)` or `static getDerivedStateFromError() `:


    After that use it as a regular component:',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    '_Error boundaries_ are components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed.

    A class component becomes an error boundary if it defines a new lifecycle method called `componentDidCatch(error, info)` or `static getDerivedStateFromError() `:


    After that use it as a regular component:',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":17}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How are error boundaries handled in React v15?',
    'React v15 provided very basic support for _error boundaries_ using `unstable_handleError` method. It has been renamed to `componentDidCatch` in React v16.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'React v15 provided very basic support for _error boundaries_ using `unstable_handleError` method. It has been renamed to `componentDidCatch` in React v16.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":18}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is the purpose of render method of `react-dom`?',
    '<pre><code>    ReactDOM.render(element, container, [callback])</code></pre>

This method is used to render a React element into the DOM in the supplied container and return a reference to the component. If the React element was previously rendered into container, it will perform an update on it and only mutate the DOM as necessary to reflect the latest changes.


    If the optional callback is provided, it will be executed after the component is rendered or updated.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'This method is used to render a React element into the DOM in the supplied container and return a reference to the component. If the React element was previously rendered into container, it will perform an update on it and only mutate the DOM as necessary to reflect the latest changes.


    If the optional callback is provided, it will be executed after the component is rendered or updated.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":19}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What will happen if you use `setState()` in constructor?',
    'When you use `setState()`, then apart from assigning to the object state React also re-renders the component and all its children. You would get error like this: _Can only update a mounted or mounting component._ So we need to use `this.state` to initialize variables inside constructor.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'When you use `setState()`, then apart from assigning to the object state React also re-renders the component and all its children. You would get error like this: _Can only update a mounted or mounting component._ So we need to use `this.state` to initialize variables inside constructor.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":20}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'Is it good to use `setState()` in `componentWillMount()` method?',
    '<pre><code>    componentDidMount() {
      axios.get(`api/todos`)
        .then((result) =&gt; {
          this.setState({
            messages: [...result.data]
          })
        })
    }</code></pre>

Yes, it is safe to use `setState()` inside `componentWillMount()` method. But at the same it is recommended to avoid async initialization in `componentWillMount()` lifecycle method. `componentWillMount()` is invoked immediately before mounting occurs. It is called before `render()`, therefore setting state in this method will not trigger a re-render. Avoid introducing any side-effects or subscriptions in this method. We need to make sure async calls for component initialization happened in `componentDidMount()` instead of `componentWillMount()`.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Yes, it is safe to use `setState()` inside `componentWillMount()` method. But at the same it is recommended to avoid async initialization in `componentWillMount()` lifecycle method. `componentWillMount()` is invoked immediately before mounting occurs. It is called before `render()`, therefore setting state in this method will not trigger a re-render. Avoid introducing any side-effects or subscriptions in this method. We need to make sure async calls for component initialization happened in `componentDidMount()` instead of `componentWillMount()`.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":21}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What will happen if you use props in initial state?',
    '<pre><code>    class MyComponent extends React.Component {
      constructor(props) {
        super(props);

        this.state = {
          record: [],
        };
      }

      render() {
        return &lt;div&gt;{this.props.inputValue}&lt;/div&gt;;
      }
    }</code></pre>

If the props on the component are changed without the component being refreshed, the new prop value will never be displayed because the constructor function will never update the current state of the component. The initialization of state from props only runs when the component is first created.

    The below component won''t display the updated input value:


    Using props inside render method will update the value:',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'If the props on the component are changed without the component being refreshed, the new prop value will never be displayed because the constructor function will never update the current state of the component. The initialization of state from props only runs when the component is first created.

    The below component won''t display the updated input value:


    Using props inside render method will update the value:',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":22}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How you use decorators in React?',
    '<pre><code>    @setTitle(&quot;Profile&quot;)
    class Profile extends React.Component {
      //....
    }

    /*
      title is a string that will be set as a document title
      WrappedComponent is what our decorator will receive when
      put directly above a component class as seen in the example above
    */
    const setTitle = (title) =&gt; (WrappedComponent) =&gt; {
      return class extends React.Component {
        componentDidMount() {
          document.title = title;
        }

        render() {
          return &lt;WrappedComponent {...this.props} /&gt;;
        }
      };
    };</code></pre>

You can _decorate_ your _class_ components, which is the same as passing the component into a function. **Decorators** are flexible and readable way of modifying component functionality.


    **Note:** Decorators are a feature that didn''t make it into ES7, but are currently a _stage 2 proposal_.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'You can _decorate_ your _class_ components, which is the same as passing the component into a function. **Decorators** are flexible and readable way of modifying component functionality.


    **Note:** Decorators are a feature that didn''t make it into ES7, but are currently a _stage 2 proposal_.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":23}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  );

-- Batch 34: Questions 331-340 (10 questions)
INSERT INTO questions (
  id, title, content, type, difficulty, points, options, correct_answer, 
  explanation, test_cases, hints, tags, metadata, stats, category_id, 
  learning_card_id, is_active, created_at, updated_at, topic_id, time_limit
) VALUES (
    gen_random_uuid(),
    'What is CRA and its benefits?',
    '<pre><code>    # Installation
    $ npm install -g create-react-app

    # Create new project
    $ create-react-app todo-app
    $ cd todo-app

    # Build, test and run
    $ npm run build
    $ npm run test
    $ npm start</code></pre>

The `create-react-app` CLI tool allows you to quickly create & run React applications with no configuration step.

    Let''s create Todo App using _CRA_:


    It includes everything we need to build a React app:

    1. React, JSX, ES6, and Flow syntax support.
    2. Language extras beyond ES6 like the object spread operator.
    3. Autoprefixed CSS, so you don’t need -webkit- or other prefixes.
    4. A fast interactive unit test runner with built-in support for coverage reporting.
    5. A live development server that warns about common mistakes.
    6. A build script to bundle JS, CSS, and images for production, with hashes and sourcemaps.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The `create-react-app` CLI tool allows you to quickly create & run React applications with no configuration step.

    Let''s create Todo App using _CRA_:


    It includes everything we need to build a React app:

    1. React, JSX, ES6, and Flow syntax support.
    2. Language extras beyond ES6 like the object spread operator.
    3. Autoprefixed CSS, so you don’t need -webkit- or other prefixes.
    4. A fast interactive unit test runner with built-in support for coverage reporting.
    5. A live development server that warns about common mistakes.
    6. A build script to bundle JS, CSS, and images for production, with hashes and sourcemaps.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":24}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is the lifecycle methods order in mounting?',
    'The lifecycle methods are called in the following order when an instance of a component is being created and inserted into the DOM.

    1. `constructor()`
    2. `static getDerivedStateFromProps()`
    3. `render()`
    4. `componentDidMount()`',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The lifecycle methods are called in the following order when an instance of a component is being created and inserted into the DOM.

    1. `constructor()`
    2. `static getDerivedStateFromProps()`
    3. `render()`
    4. `componentDidMount()`',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":25}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What are the lifecycle methods going to be deprecated in React v16?',
    'The following lifecycle methods going to be unsafe coding practices and will be more problematic with async rendering.

    1. `componentWillMount()`
    2. `componentWillReceiveProps()`
    3. `componentWillUpdate()`

    Starting with React v16.3 these methods are aliased with `UNSAFE_` prefix, and the unprefixed version will be removed in React v17.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The following lifecycle methods going to be unsafe coding practices and will be more problematic with async rendering.

    1. `componentWillMount()`
    2. `componentWillReceiveProps()`
    3. `componentWillUpdate()`

    Starting with React v16.3 these methods are aliased with `UNSAFE_` prefix, and the unprefixed version will be removed in React v17.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":26}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is the purpose of `getDerivedStateFromProps()` lifecycle method?',
    '<pre><code>    class MyComponent extends React.Component {
      static getDerivedStateFromProps(props, state) {
        // ...
      }
    }</code></pre>

The new static `getDerivedStateFromProps()` lifecycle method is invoked after a component is instantiated as well as before it is re-rendered. It can return an object to update state, or `null` to indicate that the new props do not require any state updates.


    This lifecycle method along with `componentDidUpdate()` covers all the use cases of `componentWillReceiveProps()`.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The new static `getDerivedStateFromProps()` lifecycle method is invoked after a component is instantiated as well as before it is re-rendered. It can return an object to update state, or `null` to indicate that the new props do not require any state updates.


    This lifecycle method along with `componentDidUpdate()` covers all the use cases of `componentWillReceiveProps()`.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":27}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is the purpose of `getSnapshotBeforeUpdate()` lifecycle method?',
    '<pre><code>    class MyComponent extends React.Component {
      getSnapshotBeforeUpdate(prevProps, prevState) {
        // ...
      }
    }</code></pre>

The new `getSnapshotBeforeUpdate()` lifecycle method is called right before DOM updates. The return value from this method will be passed as the third parameter to `componentDidUpdate()`.


    This lifecycle method along with `componentDidUpdate()` covers all the use cases of `componentWillUpdate()`.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The new `getSnapshotBeforeUpdate()` lifecycle method is called right before DOM updates. The return value from this method will be passed as the third parameter to `componentDidUpdate()`.


    This lifecycle method along with `componentDidUpdate()` covers all the use cases of `componentWillUpdate()`.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":28}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is the recommended way for naming components?',
    '<pre><code>    const TodoApp = () =&gt; {
      //...
    };
    export default TodoApp;</code></pre>

It is recommended to name the component by reference instead of using `displayName`.

    Using `displayName` for naming component:


    The **recommended** approach:


    also',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'It is recommended to name the component by reference instead of using `displayName`.

    Using `displayName` for naming component:


    The **recommended** approach:


    also',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":29}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is the recommended ordering of methods in component class?',
    '_Recommended_ ordering of methods from _mounting_ to _render stage_:

    1. `static` methods
    2. `constructor()`
    3. `getChildContext()`
    4. `componentWillMount()`
    5. `componentDidMount()`
    6. `componentWillReceiveProps()`
    7. `shouldComponentUpdate()`
    8. `componentWillUpdate()`
    9. `componentDidUpdate()`
    10. `componentWillUnmount()`
    11. click handlers or event handlers like `onClickSubmit()` or `onChangeDescription()`
    12. getter methods for render like `getSelectReason()` or `getFooterContent()`
    13. optional render methods like `renderNavigation()` or `renderProfilePicture()`
    14. `render()`',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    '_Recommended_ ordering of methods from _mounting_ to _render stage_:

    1. `static` methods
    2. `constructor()`
    3. `getChildContext()`
    4. `componentWillMount()`
    5. `componentDidMount()`
    6. `componentWillReceiveProps()`
    7. `shouldComponentUpdate()`
    8. `componentWillUpdate()`
    9. `componentDidUpdate()`
    10. `componentWillUnmount()`
    11. click handlers or event handlers like `onClickSubmit()` or `onChangeDescription()`
    12. getter methods for render like `getSelectReason()` or `getFooterContent()`
    13. optional render methods like `renderNavigation()` or `renderProfilePicture()`
    14. `render()`',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":30}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'Why we need to pass a function to setState()?',
    '<pre><code>    // Correct
    this.setState((prevState, props) =&gt; ({
      counter: prevState.counter + props.increment,
    }));</code></pre>

The reason behind for this is that `setState()` is an asynchronous operation. React batches state changes for performance reasons, so the state may not change immediately after `setState()` is called. That means you should not rely on the current state when calling `setState()` since you can''t be sure what that state will be. The solution is to pass a function to `setState()`, with the previous state as an argument. By doing this you can avoid issues with the user getting the old state value on access due to the asynchronous nature of `setState()`.

    Let''s say the initial count value is zero. After three consecutive increment operations, the value is going to be incremented only by one.


    If we pass a function to `setState()`, the count gets incremented correctly.


    **(OR)**

    ### Why function is preferred over object for `setState()`?

    React may batch multiple `setState()` calls into a single update for performance. Because `this.props` and `this.state` may be updated asynchronously, you should not rely on their values for calculating the next state.

    This counter example will fail to update as expected:


    The preferred approach is to call `setState()` with function rather than object. That function will receive the previous state as the first argument, and the props at the time the update is applied as the second argument.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The reason behind for this is that `setState()` is an asynchronous operation. React batches state changes for performance reasons, so the state may not change immediately after `setState()` is called. That means you should not rely on the current state when calling `setState()` since you can''t be sure what that state will be. The solution is to pass a function to `setState()`, with the previous state as an argument. By doing this you can avoid issues with the user getting the old state value on access due to the asynchronous nature of `setState()`.

    Let''s say the initial count value is zero. After three consecutive increment operations, the value is going to be incremented only by one.


    If we pass a function to `setState()`, the count gets incremented correctly.


    **(OR)**

    ### Why function is preferred over object for `setState()`?

    React may batch multiple `setState()` calls into a single update for performance. Because `this.props` and `this.state` may be updated asynchronously, you should not rely on their values for calculating the next state.

    This counter example will fail to update as expected:


    The preferred approach is to call `setState()` with function rather than object. That function will receive the previous state as the first argument, and the props at the time the update is applied as the second argument.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":31}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'Why is `isMounted()` an anti-pattern and what is the proper solution?',
    '<pre><code>    if (this.isMounted()) {
      this.setState({...})
    }</code></pre>

The primary use case for `isMounted()` is to avoid calling `setState()` after a component has been unmounted, because it will emit a warning.


    Checking `isMounted()` before calling `setState()` does eliminate the warning, but it also defeats the purpose of the warning. Using `isMounted()` is a code smell because the only reason you would check is because you think you might be holding a reference after the component has unmounted.

    An optimal solution would be to find places where `setState()` might be called after a component has unmounted, and fix them. Such situations most commonly occur due to callbacks, when a component is waiting for some data and gets unmounted before the data arrives. Ideally, any callbacks should be canceled in `componentWillUnmount()`, prior to unmounting.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The primary use case for `isMounted()` is to avoid calling `setState()` after a component has been unmounted, because it will emit a warning.


    Checking `isMounted()` before calling `setState()` does eliminate the warning, but it also defeats the purpose of the warning. Using `isMounted()` is a code smell because the only reason you would check is because you think you might be holding a reference after the component has unmounted.

    An optimal solution would be to find places where `setState()` might be called after a component has unmounted, and fix them. Such situations most commonly occur due to callbacks, when a component is waiting for some data and gets unmounted before the data arrives. Ideally, any callbacks should be canceled in `componentWillUnmount()`, prior to unmounting.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":32}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is the difference between constructor and getInitialState?',
    '<pre><code>    const MyComponent = React.createClass({
      getInitialState() {
        return {
          /* initial state */
        };
      },
    });</code></pre>

You should initialize state in the constructor when using ES6 classes, and `getInitialState()` method when using `React.createClass()`.

    **Using ES6 classes:**


    **Using `React.createClass()`:**


    **Note:** `React.createClass()` is deprecated and removed in React v16. Use plain JavaScript classes instead.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'You should initialize state in the constructor when using ES6 classes, and `getInitialState()` method when using `React.createClass()`.

    **Using ES6 classes:**


    **Using `React.createClass()`:**


    **Note:** `React.createClass()` is deprecated and removed in React v16. Use plain JavaScript classes instead.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":33}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  );

-- Batch 35: Questions 341-350 (10 questions)
INSERT INTO questions (
  id, title, content, type, difficulty, points, options, correct_answer, 
  explanation, test_cases, hints, tags, metadata, stats, category_id, 
  learning_card_id, is_active, created_at, updated_at, topic_id, time_limit
) VALUES (
    gen_random_uuid(),
    'Can you force a component to re-render without calling setState?',
    '<pre><code>    component.forceUpdate(callback);</code></pre>

By default, when your component''s state or props change, your component will re-render. If your `render()` method depends on some other data, you can tell React that the component needs re-rendering by calling `forceUpdate()`.


    It is recommended to avoid all uses of `forceUpdate()` and only read from `this.props` and `this.state` in `render()`.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'By default, when your component''s state or props change, your component will re-render. If your `render()` method depends on some other data, you can tell React that the component needs re-rendering by calling `forceUpdate()`.


    It is recommended to avoid all uses of `forceUpdate()` and only read from `this.props` and `this.state` in `render()`.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":34}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is the difference between `super()` and `super(props)` in React using ES6 classes?',
    '<pre><code>    class MyComponent extends React.Component {
      constructor(props) {
        super();
        console.log(this.props); // undefined
      }
    }</code></pre>

When you want to access `this.props` in `constructor()` then you should pass props to `super()` method.

    **Using `super(props)`:**


    **Using `super()`:**


    Outside `constructor()` both will display same value for `this.props`.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'When you want to access `this.props` in `constructor()` then you should pass props to `super()` method.

    **Using `super(props)`:**


    **Using `super()`:**


    Outside `constructor()` both will display same value for `this.props`.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":35}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is the difference between `setState()` and `replaceState()` methods?',
    'When you use `setState()` the current and previous states are merged. `replaceState()` throws out the current state, and replaces it with only what you provide. Usually `setState()` is used unless you really need to remove all previous keys for some reason. You can also set state to `false`/`null` in `setState()` instead of using `replaceState()`.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'When you use `setState()` the current and previous states are merged. `replaceState()` throws out the current state, and replaces it with only what you provide. Usually `setState()` is used unless you really need to remove all previous keys for some reason. You can also set state to `false`/`null` in `setState()` instead of using `replaceState()`.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":36}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How to listen to state changes?',
    '<pre><code>    componentDidUpdate(object prevProps, object prevState)</code></pre>

The `componentDidUpdate` lifecycle method will be called when state changes. You can compare provided state and props values with current state and props to determine if something meaningful changed.


    **Note:** The previous releases of ReactJS also uses `componentWillUpdate(object nextProps, object nextState)` for state changes. It has been deprecated in latest releases.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The `componentDidUpdate` lifecycle method will be called when state changes. You can compare provided state and props values with current state and props to determine if something meaningful changed.


    **Note:** The previous releases of ReactJS also uses `componentWillUpdate(object nextProps, object nextState)` for state changes. It has been deprecated in latest releases.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":37}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is the recommended approach of removing an array element in React state?',
    '<pre><code>    removeItem(index) {
      this.setState({
        data: this.state.data.filter((item, i) =&gt; i !== index)
      })
    }</code></pre>

The better approach is to use `Array.prototype.filter()` method.

    For example, let''s create a `removeItem()` method for updating the state.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The better approach is to use `Array.prototype.filter()` method.

    For example, let''s create a `removeItem()` method for updating the state.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":38}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'Is it possible to use React without rendering HTML?',
    '<pre><code>    render() {
      return undefined
    }</code></pre>

It is possible. Below are the possible options:




    React version >=16.0.0:



    React version >=16.2.0:



    React version >=18.0.0:',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'It is possible. Below are the possible options:




    React version >=16.0.0:



    React version >=16.2.0:



    React version >=18.0.0:',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":39}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What are the possible ways of updating objects in state?',
    '<pre><code>        this.setState((prevState) =&gt; ({
          user: {
            ...prevState.user,
            age: 42,
          },
        }));</code></pre>

1.  **Calling `setState()` with an object to merge with state:**

        - Using `Object.assign()` to create a copy of the object:


        - Using _spread operator_:


    2.  **Calling `setState()` with a function:**',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    '1.  **Calling `setState()` with an object to merge with state:**

        - Using `Object.assign()` to create a copy of the object:


        - Using _spread operator_:


    2.  **Calling `setState()` with a function:**',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":40}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What are the approaches to include polyfills in your `create-react-app`?',
    '<pre><code>        &lt;script src=&quot;https://cdn.polyfill.io/v2/polyfill.min.js?features=default,Array.prototype.includes&quot;&gt;&lt;/script&gt;</code></pre>

There are approaches to include polyfills in create-react-app,

    1.  **Manual import from `core-js`:**

        Create a file called (something like) `polyfills.js` and import it into root `index.js` file. Run `npm install core-js` or `yarn add core-js` and import your specific required features.


    2.  **Using Polyfill service:**

        Use the polyfill.io CDN to retrieve custom, browser-specific polyfills by adding this line to `index.html`:


        In the above script we had to explicitly request the `Array.prototype.includes` feature as it is not included in the default feature set.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'There are approaches to include polyfills in create-react-app,

    1.  **Manual import from `core-js`:**

        Create a file called (something like) `polyfills.js` and import it into root `index.js` file. Run `npm install core-js` or `yarn add core-js` and import your specific required features.


    2.  **Using Polyfill service:**

        Use the polyfill.io CDN to retrieve custom, browser-specific polyfills by adding this line to `index.html`:


        In the above script we had to explicitly request the `Array.prototype.includes` feature as it is not included in the default feature set.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":41}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How to use https instead of http in create-react-app?',
    '<pre><code>    &quot;scripts&quot;: {
      &quot;start&quot;: &quot;set HTTPS=true &amp;&amp; react-scripts start&quot;
    }</code></pre>

You just need to use `HTTPS=true` configuration. You can edit your `package.json` scripts section:


    or just run `set HTTPS=true && npm start`',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'You just need to use `HTTPS=true` configuration. You can edit your `package.json` scripts section:


    or just run `set HTTPS=true && npm start`',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":42}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How to avoid using relative path imports in create-react-app?',
    '<pre><code>    NODE_PATH=src/app</code></pre>

Create a file called `.env` in the project root and write the import path:


    After that restart the development server. Now you should be able to import anything inside `src/app` without relative paths.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Create a file called `.env` in the project root and write the import path:


    After that restart the development server. Now you should be able to import anything inside `src/app` without relative paths.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":43}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  );

-- Batch 36: Questions 351-360 (10 questions)
INSERT INTO questions (
  id, title, content, type, difficulty, points, options, correct_answer, 
  explanation, test_cases, hints, tags, metadata, stats, category_id, 
  learning_card_id, is_active, created_at, updated_at, topic_id, time_limit
) VALUES (
    gen_random_uuid(),
    'How to update a component every second?',
    '<pre><code>    componentDidMount() {
      this.interval = setInterval(() =&gt; this.setState({ time: Date.now() }), 1000)
    }

    componentWillUnmount() {
      clearInterval(this.interval)
    }</code></pre>

You need to use `setInterval()` to trigger the change, but you also need to clear the timer when the component unmounts to prevent errors and memory leaks.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'You need to use `setInterval()` to trigger the change, but you also need to clear the timer when the component unmounts to prevent errors and memory leaks.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":44}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'Why is a component constructor called only once?',
    'React''s _reconciliation_ algorithm assumes that without any information to the contrary, if a custom component appears in the same place on subsequent renders, it''s the same component as before, so reuses the previous instance rather than creating a new one.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'React''s _reconciliation_ algorithm assumes that without any information to the contrary, if a custom component appears in the same place on subsequent renders, it''s the same component as before, so reuses the previous instance rather than creating a new one.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":45}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How to define constants in React?',
    '<pre><code>    class MyComponent extends React.Component {
      static DEFAULT_PAGINATION = 10;
    }</code></pre>

You can use ES7 `static` field to define constant.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'You can use ES7 `static` field to define constant.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":46}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How to programmatically trigger click event in React?',
    '<pre><code>        this.inputElement.click();</code></pre>

You could use the ref prop to acquire a reference to the underlying `HTMLInputElement` object through a callback, store the reference as a class property, then use that reference to later trigger a click from your event handlers using the `HTMLElement.click` method.

    This can be done in two steps:

    1.  Create ref in render method:


    2.  Apply click event in your event handler:',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'You could use the ref prop to acquire a reference to the underlying `HTMLInputElement` object through a callback, store the reference as a class property, then use that reference to later trigger a click from your event handlers using the `HTMLElement.click` method.

    This can be done in two steps:

    1.  Create ref in render method:


    2.  Apply click event in your event handler:',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":47}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How to make AJAX call and in which component lifecycle methods should I make an AJAX call?',
    '<pre><code>    class MyComponent extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          employees: [],
          error: null,
        };
      }

      componentDidMount() {
        fetch(&quot;https://api.example.com/items&quot;)
          .then((res) =&gt; res.json())
          .then(
            (result) =&gt; {
              this.setState({
                employees: result.employees,
              });
            },
            (error) =&gt; {
              this.setState({ error });
            }
          );
      }

      render() {
        const { error, employees } = this.state;
        if (error) {
          return &lt;div&gt;Error: {error.message}&lt;/div&gt;;
        } else {
          return (
            &lt;ul&gt;
              {employees.map((employee) =&gt; (
                &lt;li key={employee.name}&gt;
                  {employee.name}-{employee.experience}
                &lt;/li&gt;
              ))}
            &lt;/ul&gt;
          );
        }
      }
    }</code></pre>

You can use AJAX libraries such as Axios, jQuery AJAX, and the browser built-in `fetch`. You should fetch data in the `componentDidMount()` lifecycle method. This is so you can use `setState()` to update your component when the data is retrieved.

    For example, the employees list fetched from API and set local state:',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'You can use AJAX libraries such as Axios, jQuery AJAX, and the browser built-in `fetch`. You should fetch data in the `componentDidMount()` lifecycle method. This is so you can use `setState()` to update your component when the data is retrieved.

    For example, the employees list fetched from API and set local state:',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":48}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What are render props?',
    '<pre><code>    &lt;DataProvider render={(data) =&gt; &lt;h1&gt;{`Hello ${data.target}`}&lt;/h1&gt;} /&gt;</code></pre>

**Render Props** is a simple technique for sharing code between components using a prop whose value is a function. The below component uses render prop which returns a React element.


    Libraries such as React Router and DownShift are using this pattern.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    '**Render Props** is a simple technique for sharing code between components using a prop whose value is a function. The below component uses render prop which returns a React element.


    Libraries such as React Router and DownShift are using this pattern.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":49}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How to dispatch an action on load?',
    '<pre><code>    class App extends Component {
      componentDidMount() {
        this.props.fetchData();
      }

      render() {
        return this.props.isLoaded ? (
        ) : (
        );
      }
    }

    const mapStateToProps = (state) =&gt; ({
      isLoaded: state.isLoaded,
    });

    const mapDispatchToProps = { fetchData };

    export default connect(mapStateToProps, mapDispatchToProps)(App);</code></pre>

You can dispatch an action in `componentDidMount()` method and in `render()` method you can verify the data.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'You can dispatch an action in `componentDidMount()` method and in `render()` method you can verify the data.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":50}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How to use `connect()` from React Redux?',
    '<pre><code>        import React from &quot;react&quot;;
        import { connect } from &quot;react-redux&quot;;

        class App extends React.Component {
          render() {
            return &lt;div&gt;{this.props.containerData}&lt;/div&gt;;
          }
        }

        function mapStateToProps(state) {
          return { containerData: state.data };
        }

        export default connect(mapStateToProps)(App);</code></pre>

You need to follow two steps to use your store in your container:

    1.  **Use `mapStateToProps()`:** It maps the state variables from your store to the props that you specify.
    2.  **Connect the above props to your container:** The object returned by the `mapStateToProps` function is connected to the container. You can import `connect()` from `react-redux`.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'You need to follow two steps to use your store in your container:

    1.  **Use `mapStateToProps()`:** It maps the state variables from your store to the props that you specify.
    2.  **Connect the above props to your container:** The object returned by the `mapStateToProps` function is connected to the container. You can import `connect()` from `react-redux`.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":51}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'Whats the purpose of `at` symbol in the Redux connect decorator?',
    '<pre><code>      import React from &quot;react&quot;;
      import * as actionCreators from &quot;./actionCreators&quot;;
      import { bindActionCreators } from &quot;redux&quot;;
      import { connect } from &quot;react-redux&quot;;

      function mapStateToProps(state) {
        return { todos: state.todos };
      }

      function mapDispatchToProps(dispatch) {
        return { actions: bindActionCreators(actionCreators, dispatch) };
      }

      @connect(mapStateToProps, mapDispatchToProps)
      export default class MyApp extends React.Component {
        // ...define your main app here
      }</code></pre>

The **@** symbol is in fact a JavaScript expression used to signify decorators. _Decorators_ make it possible to annotate and modify classes and properties at design time.

    Let''s take an example setting up Redux without and with a decorator.

    - **Without decorator:**


    - **With decorator:**


    The above examples are almost similar except the usage of decorator. The decorator syntax isn''t built into any JavaScript runtimes yet, and is still experimental and subject to change. You can use babel for the decorators support.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The **@** symbol is in fact a JavaScript expression used to signify decorators. _Decorators_ make it possible to annotate and modify classes and properties at design time.

    Let''s take an example setting up Redux without and with a decorator.

    - **Without decorator:**


    - **With decorator:**


    The above examples are almost similar except the usage of decorator. The decorator syntax isn''t built into any JavaScript runtimes yet, and is still experimental and subject to change. You can use babel for the decorators support.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":52}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How to use TypeScript in `create-react-app` application?',
    '<pre><code>         my-app/
         ├─ .gitignore
         ├─ images.d.ts
         ├─ node_modules/
         ├─ public/
         ├─ src/
         │  └─ ...
         ├─ package.json
         ├─ tsconfig.json
         ├─ tsconfig.prod.json
         ├─ tsconfig.test.json
         └─ tslint.json</code></pre>

Starting from react-scripts@3.3.0+ releases onwards, you can now optionally start a new app from a template by appending `--template [template-name]` to the creation command. If you don''t select a template, it will create your project with base template. Remember that templates are always named in the format `cra-template-[template-name]`, here you only need to fill the `[template-name]` section.

        The typeScript can be used in your project by appending `--template typescript` to the creation command.


        But if you are using React Scripting between react-scripts@2.1.0 and react-scripts@3.2.x , there is a built-in support for TypeScript. i.e, `create-react-app` now supports TypeScript natively. You can just pass `--typescript` option as below


         Whereas for lower versions of react scripts, just supply `--scripts-version` option as `react-scripts-ts` while you create a new project. `react-scripts-ts` is a set of adjustments to take the standard `create-react-app` project pipeline and bring TypeScript into the mix.

         Now the project layout should look like the following:',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Starting from react-scripts@3.3.0+ releases onwards, you can now optionally start a new app from a template by appending `--template [template-name]` to the creation command. If you don''t select a template, it will create your project with base template. Remember that templates are always named in the format `cra-template-[template-name]`, here you only need to fill the `[template-name]` section.

        The typeScript can be used in your project by appending `--template typescript` to the creation command.


        But if you are using React Scripting between react-scripts@2.1.0 and react-scripts@3.2.x , there is a built-in support for TypeScript. i.e, `create-react-app` now supports TypeScript natively. You can just pass `--typescript` option as below


         Whereas for lower versions of react scripts, just supply `--scripts-version` option as `react-scripts-ts` while you create a new project. `react-scripts-ts` is a set of adjustments to take the standard `create-react-app` project pipeline and bring TypeScript into the mix.

         Now the project layout should look like the following:',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":53}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  );

-- Batch 37: Questions 361-370 (10 questions)
INSERT INTO questions (
  id, title, content, type, difficulty, points, options, correct_answer, 
  explanation, test_cases, hints, tags, metadata, stats, category_id, 
  learning_card_id, is_active, created_at, updated_at, topic_id, time_limit
) VALUES (
    gen_random_uuid(),
    'Does the statics object work with ES6 classes in React?',
    '<pre><code>    class Component extends React.Component {
       ....
    }

    Component.propTypes = {...}
    Component.someMethod = function(){....}</code></pre>

No, `statics` only works with `React.createClass()`:


    But you can write statics inside ES6+ classes as below,


    or writing them outside class as below,',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'No, `statics` only works with `React.createClass()`:


    But you can write statics inside ES6+ classes as below,


    or writing them outside class as below,',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":54}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'Why are inline ref callbacks or functions not recommended?',
    '<pre><code>    class UserForm extends Component {
      handleSubmit = () =&gt; {
        console.log(&quot;Input Value is: &quot;, this.input.value);
      };

      setSearchInput = (input) =&gt; {
        this.input = input;
      };

      render() {
        return (
          &lt;form onSubmit={this.handleSubmit}&gt;
            &lt;input type=&quot;text&quot; ref={this.setSearchInput} /&gt; // Access DOM input
            in handle submit
            &lt;button type=&quot;submit&quot;&gt;Submit&lt;/button&gt;
          &lt;/form&gt;
        );
      }
    }</code></pre>

If the ref callback is defined as an inline function, it will get called twice during updates, first with null and then again with the DOM element. This is because a new instance of the function is created with each render, so React needs to clear the old ref and set up the new one.


    But our expectation is for the ref callback to get called once, when the component mounts. One quick fix is to use the ES7 class property syntax to define the function',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'If the ref callback is defined as an inline function, it will get called twice during updates, first with null and then again with the DOM element. This is because a new instance of the function is created with each render, so React needs to clear the old ref and set up the new one.


    But our expectation is for the ref callback to get called once, when the component mounts. One quick fix is to use the ES7 class property syntax to define the function',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":55}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What are HOC factory implementations?',
    '<pre><code>    function iiHOC(WrappedComponent) {
      return class Enhancer extends WrappedComponent {
        render() {
          return super.render();
        }
      };
    }</code></pre>

There are two main ways of implementing HOCs in React.

    1.  Props Proxy (PP) and
    2.  Inheritance Inversion (II).

    But they follow different approaches for manipulating the _WrappedComponent_.

    **Props Proxy**

    In this approach, the render method of the HOC returns a React Element of the type of the WrappedComponent. We also pass through the props that the HOC receives, hence the name **Props Proxy**.


    **Inheritance Inversion**

    In this approach, the returned HOC class (Enhancer) extends the WrappedComponent. It is called Inheritance Inversion because instead of the WrappedComponent extending some Enhancer class, it is passively extended by the Enhancer. In this way the relationship between them seems **inverse**.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'There are two main ways of implementing HOCs in React.

    1.  Props Proxy (PP) and
    2.  Inheritance Inversion (II).

    But they follow different approaches for manipulating the _WrappedComponent_.

    **Props Proxy**

    In this approach, the render method of the HOC returns a React Element of the type of the WrappedComponent. We also pass through the props that the HOC receives, hence the name **Props Proxy**.


    **Inheritance Inversion**

    In this approach, the returned HOC class (Enhancer) extends the WrappedComponent. It is called Inheritance Inversion because instead of the WrappedComponent extending some Enhancer class, it is passively extended by the Enhancer. In this way the relationship between them seems **inverse**.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":56}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How to use class field declarations syntax in React classes?',
    '<pre><code>    class Counter extends Component {
      state = { value: 0 };

      handleIncrement = () =&gt; {
        this.setState((prevState) =&gt; ({
          value: prevState.value + 1,
        }));
      };

      handleDecrement = () =&gt; {
        this.setState((prevState) =&gt; ({
          value: prevState.value - 1,
        }));
      };

      render() {
        return (
            {this.state.value}

            &lt;button onClick={this.handleIncrement}&gt;+&lt;/button&gt;
            &lt;button onClick={this.handleDecrement}&gt;-&lt;/button&gt;
        );
      }
    }</code></pre>

React Class Components can be made much more concise using the class field declarations. You can initialize the local state without using the constructor and declare class methods by using arrow functions without the extra need to bind them.

    Let''s take a counter example to demonstrate class field declarations for state without using constructor and methods without binding,',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'React Class Components can be made much more concise using the class field declarations. You can initialize the local state without using the constructor and declare class methods by using arrow functions without the extra need to bind them.

    Let''s take a counter example to demonstrate class field declarations for state without using constructor and methods without binding,',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":57}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'Why do you not need error boundaries for event handlers?',
    '<pre><code>    class MyComponent extends React.Component {
      constructor(props) {
        super(props);
        this.state = { error: null };
        this.handleClick = this.handleClick.bind(this);
      }

      handleClick() {
        try {
          // Do something that could throw
        } catch (error) {
          this.setState({ error });
        }
      }

      render() {
        if (this.state.error) {
          return &lt;h1&gt;Caught an error.&lt;/h1&gt;;
        }
        return &lt;button onClick={this.handleClick}&gt;Click Me&lt;/button&gt;;
      }
    }</code></pre>

Error boundaries do not catch errors inside event handlers.

    React doesn’t need error boundaries to recover from errors in event handlers. Unlike the render method and lifecycle methods, the event handlers don’t happen during rendering. So if they throw, React still knows what to display on the screen.

    If you need to catch an error inside an event handler, use the regular JavaScript try / catch statement:


    Note that the above example is demonstrating regular JavaScript behavior and doesn’t use error boundaries.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Error boundaries do not catch errors inside event handlers.

    React doesn’t need error boundaries to recover from errors in event handlers. Unlike the render method and lifecycle methods, the event handlers don’t happen during rendering. So if they throw, React still knows what to display on the screen.

    If you need to catch an error inside an event handler, use the regular JavaScript try / catch statement:


    Note that the above example is demonstrating regular JavaScript behavior and doesn’t use error boundaries.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":58}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is the difference between try catch block and error boundaries?',
    '<pre><code>    &lt;ErrorBoundary&gt;
      &lt;MyComponent /&gt;
    &lt;/ErrorBoundary&gt;</code></pre>

Try catch block works with imperative code whereas error boundaries are meant for declarative code to render on the screen.

    For example, the try catch block used for below imperative code


    Whereas error boundaries wrap declarative code as below,


    So if an error occurs in a **componentDidUpdate** method caused by a **setState** somewhere deep in the tree, it will still correctly propagate to the closest error boundary.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Try catch block works with imperative code whereas error boundaries are meant for declarative code to render on the screen.

    For example, the try catch block used for below imperative code


    Whereas error boundaries wrap declarative code as below,


    So if an error occurs in a **componentDidUpdate** method caused by a **setState** somewhere deep in the tree, it will still correctly propagate to the closest error boundary.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":59}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is the required method to be defined for a class component?',
    'The `render()` method is the only required method in a class component. i.e, All methods other than render method are optional for a class component.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The `render()` method is the only required method in a class component. i.e, All methods other than render method are optional for a class component.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":60}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What are the possible return types of render method?',
    'Below are the list of following types used and return from render method,

    1.  **React elements:** Elements that instruct React to render a DOM node. It includes html elements such as `<div/>` and user defined elements.
    2.  **Arrays and fragments:** Return multiple elements to render as Arrays and Fragments to wrap multiple elements
    3.  **Portals:** Render children into a different DOM subtree.
    4.  **String and numbers:** Render both Strings and Numbers as text nodes in the DOM
    5.  **Booleans or null:** Doesn''t render anything but these types are used to conditionally render content.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Below are the list of following types used and return from render method,

    1.  **React elements:** Elements that instruct React to render a DOM node. It includes html elements such as `<div/>` and user defined elements.
    2.  **Arrays and fragments:** Return multiple elements to render as Arrays and Fragments to wrap multiple elements
    3.  **Portals:** Render children into a different DOM subtree.
    4.  **String and numbers:** Render both Strings and Numbers as text nodes in the DOM
    5.  **Booleans or null:** Doesn''t render anything but these types are used to conditionally render content.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":61}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is the main purpose of constructor?',
    '<pre><code>    constructor(props) {
      super(props);
      // Don&#039;t call this.setState() here!
      this.state = { counter: 0 };
      this.handleClick = this.handleClick.bind(this);
    }</code></pre>

The constructor is mainly used for two purposes,

    1.  To initialize local state by assigning object to this.state
    2.  For binding event handler methods to the instance
        For example, the below code covers both the above cases,',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The constructor is mainly used for two purposes,

    1.  To initialize local state by assigning object to this.state
    2.  For binding event handler methods to the instance
        For example, the below code covers both the above cases,',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":62}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'Is it mandatory to define constructor for React component?',
    'No, it is not mandatory. i.e, If you don’t initialize state and you don’t bind methods, you don’t need to implement a constructor for your React component.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'No, it is not mandatory. i.e, If you don’t initialize state and you don’t bind methods, you don’t need to implement a constructor for your React component.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":63}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  );

-- Batch 38: Questions 371-380 (10 questions)
INSERT INTO questions (
  id, title, content, type, difficulty, points, options, correct_answer, 
  explanation, test_cases, hints, tags, metadata, stats, category_id, 
  learning_card_id, is_active, created_at, updated_at, topic_id, time_limit
) VALUES (
    gen_random_uuid(),
    'Why should not call setState in componentWillUnmount?',
    'You should not call `setState()` in `componentWillUnmount()` because once a component instance is unmounted, it will never be mounted again.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'You should not call `setState()` in `componentWillUnmount()` because once a component instance is unmounted, it will never be mounted again.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":64}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is the purpose of getDerivedStateFromError?',
    '<pre><code>    class ErrorBoundary extends React.Component {
      constructor(props) {
        super(props);
        this.state = { hasError: false };
      }

      static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
      }

      render() {
        if (this.state.hasError) {
          // You can render any custom fallback UI
          return &lt;h1&gt;Something went wrong.&lt;/h1&gt;;
        }

        return this.props.children;
      }
    }</code></pre>

This lifecycle method is invoked after an error has been thrown by a descendant component. It receives the error that was thrown as a parameter and should return a value to update state.

    The signature of the lifecycle method is as follows,


    Let us take error boundary use case with the above lifecycle method for demonstration purpose,',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'This lifecycle method is invoked after an error has been thrown by a descendant component. It receives the error that was thrown as a parameter and should return a value to update state.

    The signature of the lifecycle method is as follows,


    Let us take error boundary use case with the above lifecycle method for demonstration purpose,',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":65}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is the methods order when component re-rendered?',
    'An update can be caused by changes to props or state. The below methods are called in the following order when a component is being re-rendered.

    1.  static getDerivedStateFromProps()
    2.  shouldComponentUpdate()
    3.  render()
    4.  getSnapshotBeforeUpdate()
    5.  componentDidUpdate()',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'An update can be caused by changes to props or state. The below methods are called in the following order when a component is being re-rendered.

    1.  static getDerivedStateFromProps()
    2.  shouldComponentUpdate()
    3.  render()
    4.  getSnapshotBeforeUpdate()
    5.  componentDidUpdate()',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":66}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What are the methods invoked during error handling?',
    'Below methods are called when there is an error during rendering, in a lifecycle method, or in the constructor of any child component.

    1.  static getDerivedStateFromError()
    2.  componentDidCatch()',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Below methods are called when there is an error during rendering, in a lifecycle method, or in the constructor of any child component.

    1.  static getDerivedStateFromError()
    2.  componentDidCatch()',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":67}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is the purpose of unmountComponentAtNode method?',
    '<pre><code>    ReactDOM.unmountComponentAtNode(container);</code></pre>

This method is available from react-dom package and it removes a mounted React component from the DOM and clean up its event handlers and state. If no component was mounted in the container, calling this function does nothing. Returns true if a component was unmounted and false if there was no component to unmount.

    The method signature would be as follows,',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'This method is available from react-dom package and it removes a mounted React component from the DOM and clean up its event handlers and state. If no component was mounted in the container, calling this function does nothing. Returns true if a component was unmounted and false if there was no component to unmount.

    The method signature would be as follows,',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":68}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What are the limitations with HOCs?',
    '<pre><code>        function enhance(WrappedComponent) {
          class Enhance extends React.Component {
            /*...*/
          }
          // Must know exactly which method(s) to copy :(
          Enhance.staticMethod = WrappedComponent.staticMethod;
          return Enhance;
        }</code></pre>

Higher-order components come with a few caveats apart from its benefits. Below are the few listed in an order,

    1.  **Don’t use HOCs inside the render method:**
        It is not recommended to apply a HOC to a component within the render method of a component.


        The above code impacts on performance by remounting a component that causes the state of that component and all of its children to be lost. Instead, apply HOCs outside the component definition so that the resulting component is created only once.

    2.  **Static methods must be copied over:**
        When you apply a HOC to a component the new component does not have any of the static methods of the original component


        You can overcome this by copying the methods onto the container before returning it,


    3.  **Refs aren’t passed through:**
        For HOCs you need to pass through all props to the wrapped component but this does not work for refs. This is because ref is not really a prop similar to key. In this case you need to use the React.forwardRef API',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Higher-order components come with a few caveats apart from its benefits. Below are the few listed in an order,

    1.  **Don’t use HOCs inside the render method:**
        It is not recommended to apply a HOC to a component within the render method of a component.


        The above code impacts on performance by remounting a component that causes the state of that component and all of its children to be lost. Instead, apply HOCs outside the component definition so that the resulting component is created only once.

    2.  **Static methods must be copied over:**
        When you apply a HOC to a component the new component does not have any of the static methods of the original component


        You can overcome this by copying the methods onto the container before returning it,


    3.  **Refs aren’t passed through:**
        For HOCs you need to pass through all props to the wrapped component but this does not work for refs. This is because ref is not really a prop similar to key. In this case you need to use the React.forwardRef API',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":69}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How to debug forwardRefs in DevTools?',
    '<pre><code>    function logProps(Component) {
      class LogProps extends React.Component {
        // ...
      }

      function forwardRef(props, ref) {
        return &lt;LogProps {...props} forwardedRef={ref} /&gt;;
      }

      // Give this component a more helpful display name in DevTools.
      // e.g. &quot;ForwardRef(logProps(MyComponent))&quot;
      const name = Component.displayName || Component.name;
      forwardRef.displayName = `logProps(${name})`;

      return React.forwardRef(forwardRef);
    }</code></pre>

**React.forwardRef** accepts a render function as parameter and DevTools uses this function to determine what to display for the ref forwarding component.

    For example, If you don''t name the render function or not using displayName property then it will appear as ”ForwardRef” in the DevTools,


    But If you name the render function then it will appear as **”ForwardRef(myFunction)”**


    As an alternative, You can also set displayName property for forwardRef function,',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    '**React.forwardRef** accepts a render function as parameter and DevTools uses this function to determine what to display for the ref forwarding component.

    For example, If you don''t name the render function or not using displayName property then it will appear as ”ForwardRef” in the DevTools,


    But If you name the render function then it will appear as **”ForwardRef(myFunction)”**


    As an alternative, You can also set displayName property for forwardRef function,',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":70}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'Is it good to use arrow functions in render methods?',
    '<pre><code>    class Foo extends Component {
      handleClick() {
        console.log(&quot;Click happened&quot;);
      }
      render() {
        return &lt;button onClick={() =&gt; this.handleClick()}&gt;Click Me&lt;/button&gt;;
      }
    }</code></pre>

Yes, You can use. It is often the easiest way to pass parameters to callback functions. But you need to optimize the performance while using it.


    **Note:** Using an arrow function in render method creates a new function each time the component renders, which may have performance implications',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Yes, You can use. It is often the easiest way to pass parameters to callback functions. But you need to optimize the performance while using it.


    **Note:** Using an arrow function in render method creates a new function each time the component renders, which may have performance implications',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":71}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How do you say that state updates are merged?',
    '<pre><code>     componentDidMount() {
        fetchPosts().then(response =&gt; {
          this.setState({
            posts: response.posts
          });
        });

        fetchComments().then(response =&gt; {
          this.setState({
            comments: response.comments
          });
        });
      }</code></pre>

When you call setState() in the component, React merges the object you provide into the current state.

    For example, let us take a facebook user with posts and comments details as state variables,


    Now you can update them independently with separate `setState()` calls as below,


    As mentioned in the above code snippets, `this.setState({comments})` updates only comments variable without modifying or replacing `posts` variable.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'When you call setState() in the component, React merges the object you provide into the current state.

    For example, let us take a facebook user with posts and comments details as state variables,


    Now you can update them independently with separate `setState()` calls as below,


    As mentioned in the above code snippets, `this.setState({comments})` updates only comments variable without modifying or replacing `posts` variable.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":72}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How do you pass arguments to an event handler?',
    '<pre><code>    &lt;button onClick={(e) =&gt; this.updateUser(userId, e)}&gt;Update User details&lt;/button&gt;
    &lt;button onClick={this.updateUser.bind(this, userId)}&gt;Update User details&lt;/button&gt;</code></pre>

During iterations or loops, it is common to pass an extra parameter to an event handler. This can be achieved through arrow functions or bind method.

    Let us take an example of user details updated in a grid,


    In the both approaches, the synthetic argument `e` is passed as a second argument. You need to pass it explicitly for arrow functions and it will be passed automatically for `bind` method.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'During iterations or loops, it is common to pass an extra parameter to an event handler. This can be achieved through arrow functions or bind method.

    Let us take an example of user details updated in a grid,


    In the both approaches, the synthetic argument `e` is passed as a second argument. You need to pass it explicitly for arrow functions and it will be passed automatically for `bind` method.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":73}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  );

-- Batch 39: Questions 381-390 (10 questions)
INSERT INTO questions (
  id, title, content, type, difficulty, points, options, correct_answer, 
  explanation, test_cases, hints, tags, metadata, stats, category_id, 
  learning_card_id, is_active, created_at, updated_at, topic_id, time_limit
) VALUES (
    gen_random_uuid(),
    'How to prevent component from rendering?',
    '<pre><code>    class User extends React.Component {
      constructor(props) {
        super(props);
        this.state = {loggedIn: false, name: &#039;John&#039;};
      }

      render() {
       return (
             //Prevent component render if it is not loggedIn
             &lt;Greeting loggedIn={this.state.loggedIn} /&gt;
             &lt;UserDetails name={this.state.name}&gt;
       );
      }</code></pre>

You can prevent component from rendering by returning null based on specific condition. This way it can conditionally render component.



    In the above example, the `greeting` component skips its rendering section by applying condition and returning null value.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'You can prevent component from rendering by returning null based on specific condition. This way it can conditionally render component.



    In the above example, the `greeting` component skips its rendering section by applying condition and returning null value.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":74}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'Give an example on How to use context?',
    '<pre><code>    //Lets create a context with a default theme value &quot;luna&quot;
    const ThemeContext = React.createContext(&quot;luna&quot;);
    // Create App component where it uses provider to pass theme value in the tree
    class App extends React.Component {
      render() {
        return (
          &lt;ThemeContext.Provider value=&quot;nova&quot;&gt;
            &lt;Toolbar /&gt;
          &lt;/ThemeContext.Provider&gt;
        );
      }
    }
    // A middle component where you don&#039;t need to pass theme prop anymore
    function Toolbar(props) {
      return (
          &lt;ThemedButton /&gt;
      );
    }
    // Lets read theme value in the button component to use
    class ThemedButton extends React.Component {
      static contextType = ThemeContext;
      render() {
        return &lt;Button theme={this.context} /&gt;;
      }
    }</code></pre>

**Context** is designed to share data that can be considered **global** for a tree of React components.

    For example, in the code below lets manually thread through a “theme” prop in order to style the Button component.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    '**Context** is designed to share data that can be considered **global** for a tree of React components.

    For example, in the code below lets manually thread through a “theme” prop in order to style the Button component.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":75}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How do you use contextType?',
    '<pre><code>        class MyClass extends React.Component {
          static contextType = MyContext;
          render() {
            let value = this.context;
            /* render something based on the value */
          }
        }</code></pre>

ContextType is used to consume the context object. The contextType property can be used in two ways,

    1.  **contextType as property of class:**
        The contextType property on a class can be assigned a Context object created by React.createContext(). After that, you can consume the nearest current value of that Context type using this.context in any of the lifecycle methods and render function.

        Lets assign contextType property on MyClass as below,


    2.  **Static field**
        You can use a static class field to initialize your contextType using public class field syntax.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'ContextType is used to consume the context object. The contextType property can be used in two ways,

    1.  **contextType as property of class:**
        The contextType property on a class can be assigned a Context object created by React.createContext(). After that, you can consume the nearest current value of that Context type using this.context in any of the lifecycle methods and render function.

        Lets assign contextType property on MyClass as below,


    2.  **Static field**
        You can use a static class field to initialize your contextType using public class field syntax.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":76}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is a consumer?',
    '<pre><code>    &lt;MyContext.Consumer&gt;
      {value =&gt; /* render something based on the context value */}
    &lt;/MyContext.Consumer&gt;</code></pre>

A Consumer is a React component that subscribes to context changes. It requires a function as a child which receives current context value as argument and returns a react node. The value argument passed to the function will be equal to the value prop of the closest Provider for this context above in the tree.

    Lets take a simple example,',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'A Consumer is a React component that subscribes to context changes. It requires a function as a child which receives current context value as argument and returns a react node. The value argument passed to the function will be equal to the value prop of the closest Provider for this context above in the tree.

    Lets take a simple example,',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":77}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How do you solve performance corner cases while using context?',
    '<pre><code>    class App extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          value: { something: &quot;something&quot; },
        };
      }

      render() {
        return (
          &lt;Provider value={this.state.value}&gt;
            &lt;Toolbar /&gt;
          &lt;/Provider&gt;
        );
      }
    }</code></pre>

The context uses reference identity to determine when to re-render, there are some gotchas that could trigger unintentional renders in consumers when a provider’s parent re-renders.

    For example, the code below will re-render all consumers every time the Provider re-renders because a new object is always created for value.


    This can be solved by lifting up the value to parent state,',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The context uses reference identity to determine when to re-render, there are some gotchas that could trigger unintentional renders in consumers when a provider’s parent re-renders.

    For example, the code below will re-render all consumers every time the Provider re-renders because a new object is always created for value.


    This can be solved by lifting up the value to parent state,',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":78}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is the purpose of forward ref in HOCs?',
    '<pre><code>    import FancyButton from &quot;./FancyButton&quot;;

    const ref = React.createRef();
    ref.current.focus();
    &lt;FancyButton label=&quot;Click Me&quot; handleClick={handleClick} ref={ref} /&gt;;</code></pre>

Refs will not get passed through because ref is not a prop. It is handled differently by React just like **key**. If you add a ref to a HOC, the ref will refer to the outermost container component, not the wrapped component. In this case, you can use Forward Ref API. For example, we can explicitly forward refs to the inner FancyButton component using the React.forwardRef API.

    The below HOC logs all props,


    Let''s use this HOC to log all props that get passed to our “fancy button” component,


    Now let''s create a ref and pass it to FancyButton component. In this case, you can set focus to button element.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Refs will not get passed through because ref is not a prop. It is handled differently by React just like **key**. If you add a ref to a HOC, the ref will refer to the outermost container component, not the wrapped component. In this case, you can use Forward Ref API. For example, we can explicitly forward refs to the inner FancyButton component using the React.forwardRef API.

    The below HOC logs all props,


    Let''s use this HOC to log all props that get passed to our “fancy button” component,


    Now let''s create a ref and pass it to FancyButton component. In this case, you can set focus to button element.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":79}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'Is ref argument available for all functions or class components?',
    'Regular function or class components don’t receive the ref argument, and ref is not available in props either. The second ref argument only exists when you define a component with React.forwardRef call.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Regular function or class components don’t receive the ref argument, and ref is not available in props either. The second ref argument only exists when you define a component with React.forwardRef call.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":80}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'Why do you need additional care for component libraries while using forward refs?',
    'When you start using forwardRef in a component library, you should treat it as a breaking change and release a new major version of your library. This is because your library likely has a different behavior such as what refs get assigned to, and what types are exported. These changes can break apps and other libraries that depend on the old behavior.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'When you start using forwardRef in a component library, you should treat it as a breaking change and release a new major version of your library. This is because your library likely has a different behavior such as what refs get assigned to, and what types are exported. These changes can break apps and other libraries that depend on the old behavior.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":81}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How to create react class components without ES6?',
    '<pre><code>    var Greeting = createReactClass({
      getDefaultProps: function () {
        return {
          name: &quot;Jhohn&quot;,
        };
      },
      getInitialState: function () {
        return { message: this.props.message };
      },
      handleClick: function () {
        console.log(this.state.message);
      },
      render: function () {
        return &lt;h1&gt;Hello, {this.props.name}&lt;/h1&gt;;
      },
    });</code></pre>

If you don’t use ES6 then you may need to use the create-react-class module instead. For default props, you need to define getDefaultProps() as a function on the passed object. Whereas for initial state, you have to provide a separate getInitialState method that returns the initial state.


    **Note:** If you use createReactClass then auto binding is available for all methods. i.e, You don''t need to use `.bind(this)` with in constructor for event handlers.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'If you don’t use ES6 then you may need to use the create-react-class module instead. For default props, you need to define getDefaultProps() as a function on the passed object. Whereas for initial state, you have to provide a separate getInitialState method that returns the initial state.


    **Note:** If you use createReactClass then auto binding is available for all methods. i.e, You don''t need to use `.bind(this)` with in constructor for event handlers.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":82}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'Is it possible to use react without JSX?',
    '<pre><code>    class Greeting extends React.Component {
      render() {
        return React.createElement(&quot;div&quot;, null, `Hello ${this.props.message}`);
      }
    }

    ReactDOM.render(
      React.createElement(Greeting, { message: &quot;World&quot; }, null),
      document.getElementById(&quot;root&quot;)
    );</code></pre>

Yes, JSX is not mandatory for using React. Actually it is convenient when you don’t want to set up compilation in your build environment. Each JSX element is just syntactic sugar for calling `React.createElement(component, props, ...children)`.

    For example, let us take a greeting example with JSX,


    You can write the same code without JSX as below,',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Yes, JSX is not mandatory for using React. Actually it is convenient when you don’t want to set up compilation in your build environment. Each JSX element is just syntactic sugar for calling `React.createElement(component, props, ...children)`.

    For example, let us take a greeting example with JSX,


    You can write the same code without JSX as below,',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":83}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  );

-- Batch 40: Questions 391-396 (6 questions)
INSERT INTO questions (
  id, title, content, type, difficulty, points, options, correct_answer, 
  explanation, test_cases, hints, tags, metadata, stats, category_id, 
  learning_card_id, is_active, created_at, updated_at, topic_id, time_limit
) VALUES (
    gen_random_uuid(),
    'How do you create HOC using render props?',
    '<pre><code>    function withMouse(Component) {
      return class extends React.Component {
        render() {
          return (
            &lt;Mouse
              render={(mouse) =&gt; &lt;Component {...this.props} mouse={mouse} /&gt;}
            /&gt;
          );
        }
      };
    }</code></pre>

You can implement most higher-order components (HOC) using a regular component with a render prop. For example, if you would prefer to have a withMouse HOC instead of a <Mouse> component, you could easily create one using a regular <Mouse> with a render prop.


    This way render props gives the flexibility of using either pattern.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'You can implement most higher-order components (HOC) using a regular component with a render prop. For example, if you would prefer to have a withMouse HOC instead of a <Mouse> component, you could easily create one using a regular <Mouse> with a render prop.


    This way render props gives the flexibility of using either pattern.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":84}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is react scripts?',
    'The `react-scripts` package is a set of scripts from the create-react-app starter pack which helps you kick off projects without configuring. The `react-scripts start` command sets up the development environment and starts a server, as well as hot module reloading.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The `react-scripts` package is a set of scripts from the create-react-app starter pack which helps you kick off projects without configuring. The `react-scripts start` command sets up the development environment and starts a server, as well as hot module reloading.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":85}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What are the features of create react app?',
    'Below are the list of some of the features provided by create react app.

    1.  React, JSX, ES6, Typescript and Flow syntax support.
    2.  Autoprefixed CSS
    3.  CSS Reset/Normalize
    4.  A live development server
    5.  A fast interactive unit test runner with built-in support for coverage reporting
    6.  A build script to bundle JS, CSS, and images for production, with hashes and sourcemaps
    7.  An offline-first service worker and a web app manifest, meeting all the Progressive Web App criteria.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Below are the list of some of the features provided by create react app.

    1.  React, JSX, ES6, Typescript and Flow syntax support.
    2.  Autoprefixed CSS
    3.  CSS Reset/Normalize
    4.  A live development server
    5.  A fast interactive unit test runner with built-in support for coverage reporting
    6.  A build script to bundle JS, CSS, and images for production, with hashes and sourcemaps
    7.  An offline-first service worker and a web app manifest, meeting all the Progressive Web App criteria.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":86}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is the purpose of renderToNodeStream method?',
    'The `ReactDOMServer#renderToNodeStream` method is used to generate HTML on the server and send the markup down on the initial request for faster page loads. It also helps search engines to crawl your pages easily for SEO purposes.
    **Note:** Remember this method is not available in the browser but only server.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The `ReactDOMServer#renderToNodeStream` method is used to generate HTML on the server and send the markup down on the initial request for faster page loads. It also helps search engines to crawl your pages easily for SEO purposes.
    **Note:** Remember this method is not available in the browser but only server.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":87}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How do you get redux scaffolding using create-react-app?',
    '<pre><code>    npx create-react-app my-app --template redux-typescript</code></pre>

Redux team has provided official redux+js or redux+typescript templates for create-react-app project. The generated project setup includes,
    1.  Redux Toolkit and React-Redux dependencies
    2.  Create and configure Redux store
    3.  React-Redux `<Provider>` passing the store to React components
    4.  Small "counter" example to demo how to add redux logic and React-Redux hooks API to interact with the store from components
        The below commands need to be executed along with template option as below,
    5.  **Javascript template:**
    2.  **Typescript template:**',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Redux team has provided official redux+js or redux+typescript templates for create-react-app project. The generated project setup includes,
    1.  Redux Toolkit and React-Redux dependencies
    2.  Create and configure Redux store
    3.  React-Redux `<Provider>` passing the store to React components
    4.  Small "counter" example to demo how to add redux logic and React-Redux hooks API to interact with the store from components
        The below commands need to be executed along with template option as below,
    5.  **Javascript template:**
    2.  **Typescript template:**',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":88}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is state mutation and how to prevent it?',
    '<pre><code>    class A extends React.component {
      constructor(props) {
        super(props);
        this.state = {
          loading: false
        }
     }

    componentDidMount() {
      let { loading } = this.state;
      loading = (() =&gt; true)(); // Trying to perform an operation and directly saving in a state variable
    }
</code></pre>

`State mutation` happens when you try to update the state of a component without actually using `setState` function. This can happen when you are trying to do some computations using a state variable and unknowingly save the result in the same state variable. This is the main reason why it is advised to return new instances of state variables from the reducers by using Object.assign({}, ...) or spread syntax.

    This can cause unknown issues in the UI as the value of the state variable got updated without telling React to check what all components were being affected from this update and it can cause UI bugs.

    Ex:


    **How to prevent it:** Make sure your state variables are immutable by either enforcing immutability by using plugins like Immutable.js, always using `setState` to make updates, and returning new instances in reducers when sending updated state values.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    '`State mutation` happens when you try to update the state of a component without actually using `setState` function. This can happen when you are trying to do some computations using a state variable and unknowingly save the result in the same state variable. This is the main reason why it is advised to return new instances of state variables from the reducers by using Object.assign({}, ...) or spread syntax.

    This can cause unknown issues in the UI as the value of the state variable got updated without telling React to check what all components were being affected from this update and it can cause UI bugs.

    Ex:


    **How to prevent it:** Make sure your state variables are immutable by either enforcing immutability by using plugins like Immutable.js, always using `setState` to make updates, and returning new instances in reducers when sending updated state values.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":89}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  );
