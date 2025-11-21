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
      '',
      'React (aka React.js or ReactJS) is an **open-source front-end JavaScript library** for building user interfaces based on components. It''s used for handling the view layer in web and mobile applications, and allows developers to create reusable UI components and manage the state of those components efficiently.

    React was created by [Jordan Walke](https://github.com/jordwalke), a software engineer at Facebook (now Meta). It was first deployed on Facebook''s News Feed in 2011 and on Instagram in 2012. The library was open-sourced in May 2013 and has since become one of the most popular JavaScript libraries for building modern user interfaces.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'core-concepts', 'beginner'],
      '{"source":"reference.md","section":"Core React","originalNum":1}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.309Z',
      '2025-11-18T18:46:59.309Z',
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
      '',
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
      '{"source":"reference.md","section":"Core React","originalNum":2}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.309Z',
      '2025-11-18T18:46:59.309Z',
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
      '',
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
      '{"source":"reference.md","section":"Core React","originalNum":3}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.309Z',
      '2025-11-18T18:46:59.309Z',
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
      '',
      '_JSX_ stands for _JavaScript XML_ and it is an XML-like syntax extension to ECMAScript. Basically it just provides the syntactic sugar for the `React.createElement(type, props, ...children)` function, giving us expressiveness of JavaScript along with HTML like template syntax.

    In the example below, the text inside `<h1>` tag is returned as JavaScript function to the render function.


    If you don''t use JSX syntax then the respective JavaScript code should be written as below,


     <p>


     </p>

    **Note:** JSX is stricter than HTML',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'core-concepts', 'beginner'],
      '{"source":"reference.md","section":"Core React","originalNum":4}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.309Z',
      '2025-11-18T18:46:59.309Z',
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
      '',
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
      '{"source":"reference.md","section":"Core React","originalNum":5}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.309Z',
      '2025-11-18T18:46:59.309Z',
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
      '',
      'Components are the building blocks of creating User Interfaces(UI) in React. There are two possible ways to create a component.

    1. **Function Components:** This is the simplest way to create a component. Those are pure JavaScript functions that accept props object as the one and only one parameter and return React elements to render the output:


    2. **Class Components:** You can also use ES6 class to define a component. The above function component can be written as a class component:',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'core-concepts', 'beginner'],
      '{"source":"reference.md","section":"Core React","originalNum":6}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.309Z',
      '2025-11-18T18:46:59.309Z',
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
      '',
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
      '{"source":"reference.md","section":"Core React","originalNum":7}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.309Z',
      '2025-11-18T18:46:59.309Z',
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
      '',
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
      '{"source":"reference.md","section":"Core React","originalNum":8}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.309Z',
      '2025-11-18T18:46:59.309Z',
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
      '',
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
      '{"source":"reference.md","section":"Core React","originalNum":9}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.309Z',
      '2025-11-18T18:46:59.309Z',
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
      '',
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
      '{"source":"reference.md","section":"Core React","originalNum":10}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.309Z',
      '2025-11-18T18:46:59.309Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
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
      '',
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
      '{"source":"reference.md","section":"Core React","originalNum":11}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.309Z',
      '2025-11-18T18:46:59.309Z',
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
      '',
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
      '{"source":"reference.md","section":"Core React","originalNum":12}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.309Z',
      '2025-11-18T18:46:59.309Z',
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
      '',
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
      '{"source":"reference.md","section":"Core React","originalNum":13}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.309Z',
      '2025-11-18T18:46:59.309Z',
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
      '',
      'You can use either _if statements_ or _ternary expressions_ which are available in JS(and JSX in React) to conditionally execute or render expressions. Apart from these approaches, you can also embed any expressions in JSX by wrapping them in curly braces and then followed by JS logical operator `&&`. It is helpful to render elements conditionally within a single line and commonly used for concise logic, especially in JSX rendering.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'core-concepts', 'beginner'],
      '{"source":"reference.md","section":"Core React","originalNum":14}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.309Z',
      '2025-11-18T18:46:59.309Z',
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
      '',
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
      '{"source":"reference.md","section":"Core React","originalNum":15}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.309Z',
      '2025-11-18T18:46:59.309Z',
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
      '',
      'The _Virtual DOM_ (VDOM) is a lightweight, in-memory representation of _Real DOM_ used by libraries like React to optimize UI rendering. The representation of a UI is kept in memory and synced with the "real" DOM. It''s a step that happens between the render function being called and the displaying of elements on the screen. This entire process is called _reconciliation_.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'core-concepts', 'beginner'],
      '{"source":"reference.md","section":"Core React","originalNum":16}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.309Z',
      '2025-11-18T18:46:59.309Z',
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
      '',
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
      '{"source":"reference.md","section":"Core React","originalNum":17}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.309Z',
      '2025-11-18T18:46:59.309Z',
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
      '',
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
      '{"source":"reference.md","section":"Core React","originalNum":18}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.309Z',
      '2025-11-18T18:46:59.309Z',
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
      '',
      '**React Fiber** is the **new reconciliation engine** in React, introduced in React 16. It’s a complete rewrite of React’s core algorithm(old stack-based algorithm) for rendering and updating the UI. Fiber enhances React’s ability to handle **asynchronous rendering**, **prioritized updates**(assign priority to different types of updates), and **interruption**(ability to pause, abort, or reuse work) of rendering work, enabling smoother and more responsive user interfaces.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'core-concepts', 'beginner'],
      '{"source":"reference.md","section":"Core React","originalNum":19}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.309Z',
      '2025-11-18T18:46:59.309Z',
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
      '',
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
      '{"source":"reference.md","section":"Core React","originalNum":20}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.309Z',
      '2025-11-18T18:46:59.309Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
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
      '',
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
      '{"source":"reference.md","section":"Core React","originalNum":21}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.309Z',
      '2025-11-18T18:46:59.309Z',
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
      '',
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
      '{"source":"reference.md","section":"Core React","originalNum":22}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.309Z',
      '2025-11-18T18:46:59.309Z',
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
      '',
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
      '{"source":"reference.md","section":"Core React","originalNum":23}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.309Z',
      '2025-11-18T18:46:59.309Z',
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
      '',
      'When several components need to share the same changing data then it is recommended to _lift the shared state up_ to their closest common ancestor. That means if two child components share the same data from its parent, then move the state to parent instead of maintaining local state in both of the child components.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'core-concepts', 'beginner'],
      '{"source":"reference.md","section":"Core React","originalNum":24}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.309Z',
      '2025-11-18T18:46:59.309Z',
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
      '',
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
      '{"source":"reference.md","section":"Core React","originalNum":25}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.309Z',
      '2025-11-18T18:46:59.309Z',
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
      '',
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
      '{"source":"reference.md","section":"Core React","originalNum":26}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.309Z',
      '2025-11-18T18:46:59.309Z',
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
      '',
      'The comments in React/JSX are similar to JavaScript Multiline comments but are wrapped in curly braces.

    **Single-line comments:**


    **Multi-line comments:**


    You can use `//` and `/* */` in JS logic, hooks, and functions.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'core-concepts', 'beginner'],
      '{"source":"reference.md","section":"Core React","originalNum":27}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.309Z',
      '2025-11-18T18:46:59.309Z',
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
      '',
      '`Reconciliation` is the process through which React updates the Browser DOM and makes React work faster. React use a `diffing algorithm` so that component updates are predictable and faster. React would first calculate the difference between the `real DOM` and the copy of DOM `(Virtual DOM)` when there''s an update of components.
    React stores a copy of Browser DOM which is called `Virtual DOM`. When we make changes or add data, React creates a new Virtual DOM and compares it with the previous one. This comparison is done by `Diffing Algorithm`.
    Now React compares the Virtual DOM with Real DOM. It finds out the changed nodes and updates only the changed nodes in Real DOM leaving the rest nodes as it is. This process is called _Reconciliation_.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'core-concepts', 'beginner'],
      '{"source":"reference.md","section":"Core React","originalNum":28}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.309Z',
      '2025-11-18T18:46:59.309Z',
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
      '',
      'No, currently `React.lazy` function supports default exports only. If you would like to import modules which are named exports, you can create an intermediate module that reexports it as the default. It also ensures that tree shaking keeps working and don’t pull unused components.
    Let''s take a component file which exports multiple named components,


    and reexport `MoreComponents.js` components in an intermediate file `IntermediateComponent.js`


    Now you can import the module using lazy function as below,',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'core-concepts', 'beginner'],
      '{"source":"reference.md","section":"Core React","originalNum":29}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
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
      '',
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
      '{"source":"reference.md","section":"Core React","originalNum":30}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
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
      '',
      'It''s a common pattern or practice in React for a component to return multiple elements. _Fragments_ let you group a list of children without adding extra nodes to the DOM.
    You need to use either `<Fragment>` or a shorter syntax having empty tag (`<></>`).

    Below is the example of how to use fragment inside _Story_ component.


    It is also possible to render list of fragments inside a loop with the mandatory **key** attribute supplied.


    Usually, you don''t need to use `<Fragment>` until there is a need of _key_ attribute. The usage of shorter syntax looks like below.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'core-concepts', 'beginner'],
      '{"source":"reference.md","section":"Core React","originalNum":31}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
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
      '',
      'Below are the list of reasons to prefer fragments over container DOM elements,

    1. Fragments are a bit faster and use less memory by not creating an extra DOM node. This only has a real benefit on very large and deep trees.
    2. Some CSS mechanisms like _Flexbox_ and _CSS Grid_ have a special parent-child relationships, and adding divs in the middle makes it hard to keep the desired layout.
    3. The DOM Inspector is less cluttered.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'core-concepts', 'beginner'],
      '{"source":"reference.md","section":"Core React","originalNum":32}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
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
      '',
      'A Portal is a React feature that enables rendering children into a DOM node that exists outside the parent component''s DOM hierarchy, while still preserving the React component hierarchy. Portals help avoid CSS stacking issues—for example, elements with position: fixed may not behave as expected inside a parent with transform. Portals solve this by rendering content (like modals or tooltips) outside such constrained DOM contexts.

    *   `child`: Any valid React node (e.g., JSX, string, fragment).
    *   `container`: A real DOM node (e.g., `document.getElementById(''modal-root'')`).

    Even though the content renders elsewhere in the DOM, it still behaves like a normal child in React. It has access to context, state, and event handling.

    **Example:- Modal:**
    The above code will render the modal content into the body element in the HTML, not inside the component''s usual location.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'core-concepts', 'beginner'],
      '{"source":"reference.md","section":"Core React","originalNum":33}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
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
      '',
      'If the behaviour of a component is independent of its state then it can be a stateless component. You can use either a function or a class for creating stateless components. But unless you need to use a lifecycle hook in your components, you should go for function components. There are a lot of benefits if you decide to use function components here; they are easy to write, understand, and test, a little faster, and you can avoid the `this` keyword altogether.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'core-concepts', 'beginner'],
      '{"source":"reference.md","section":"Core React","originalNum":34}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
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
      '',
      'If the behaviour of a component is dependent on the _state_ of the component then it can be termed as stateful component. These _stateful components_ are either function components with hooks or _class components_.

    Let''s take an example of function stateful component which update the state based on click event,


    <p>
    The equivalent class stateful component with a state that gets initialized in the `constructor`.


    </p>',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'core-concepts', 'beginner'],
      '{"source":"reference.md","section":"Core React","originalNum":35}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
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
      '',
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
      '{"source":"reference.md","section":"Core React","originalNum":36}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
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
      '',
      'Below are the list of main advantages of React,

    1. Increases the application''s performance with _Virtual DOM_.
    2. JSX makes code easy to read and write.
    3. It renders both on client and server side (_SSR_).
    4. Easy to integrate with frameworks (Angular, Backbone) since it is only a view library.
    5. Easy to write unit and integration tests with tools such as Jest.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'core-concepts', 'beginner'],
      '{"source":"reference.md","section":"Core React","originalNum":37}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
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
      '',
      'Apart from the advantages, there are few limitations of React too,

    1. React is just a view library, not a full framework.
    2. There is a learning curve for beginners who are new to web development.
    3. Integrating React into a traditional MVC framework requires some additional configuration.
    4. The code complexity increases with inline templating and JSX.
    5. Too many smaller components leading to over engineering or boilerplate.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'core-concepts', 'beginner'],
      '{"source":"reference.md","section":"Core React","originalNum":38}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
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
      '',
      'Normally we use _PropTypes library_ (`React.PropTypes` moved to a `prop-types` package since React v15.5) for _type checking_ in the React applications. For large code bases, it is recommended to use _static type checkers_ such as Flow or TypeScript, that perform type checking at compile time and provide auto-completion features.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'core-concepts', 'beginner'],
      '{"source":"reference.md","section":"Core React","originalNum":39}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
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
      '',
      'The `react-dom` package provides _DOM-specific methods_ that can be used at the top level of your app. Most of the components are not required to use this module. Some of the methods of this package are:

    1. `render()`
    2. `hydrate()`
    3. `unmountComponentAtNode()`
    4. `findDOMNode()`
    5. `createPortal()`',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'core-concepts', 'beginner'],
      '{"source":"reference.md","section":"Core React","originalNum":40}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
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
      '',
      'The `ReactDOMServer` object enables you to render components to static markup (typically used on node server). This object is mainly used for _server-side rendering_ (SSR). The following methods can be used in both the server and browser environments:

    1. `renderToString()`
    2. `renderToStaticMarkup()`

    For example, you generally run a Node-based web server like Express, Hapi, or Koa, and you call `renderToString` to render your root component to a string, which you then send as response.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'core-concepts', 'beginner'],
      '{"source":"reference.md","section":"Core React","originalNum":41}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
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
      '',
      'The `dangerouslySetInnerHTML` attribute is React''s replacement for using `innerHTML` in the browser DOM. Just like `innerHTML`, it is risky to use this attribute considering cross-site scripting (XSS) attacks. You just need to pass a `__html` object as key and HTML text as value.

    In this example MyComponent uses `dangerouslySetInnerHTML` attribute for setting HTML markup:',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'core-concepts', 'beginner'],
      '{"source":"reference.md","section":"Core React","originalNum":42}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
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
      '',
      'The `style` attribute accepts a JavaScript object with camelCased properties rather than a CSS string. This is consistent with the DOM style JavaScript property, is more efficient, and prevents XSS security holes.


    Style keys are camelCased in order to be consistent with accessing the properties on DOM nodes in JavaScript (e.g. `node.style.backgroundImage`).',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'core-concepts', 'beginner'],
      '{"source":"reference.md","section":"Core React","originalNum":43}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
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
      '',
      'Handling events in React elements has some syntactic differences:

    1. React event handlers are named using camelCase, rather than lowercase.
    2. With JSX you pass a function as the event handler, rather than a string.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'core-concepts', 'beginner'],
      '{"source":"reference.md","section":"Core React","originalNum":44}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
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
      '',
      'Keys should be stable, predictable, and unique so that React can keep track of elements.

    In the below code snippet each element''s key will be based on ordering, rather than tied to the data that is being represented. This limits the optimizations that React can do and creates confusing bugs in the application.


    If you use element data for unique key, assuming `todo.id` is unique to this list and stable, React would be able to reorder elements without needing to reevaluate them as much.


    **Note:** If you don''t specify `key` prop at all, React will use index as a key''s value while iterating over an array of data.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'core-concepts', 'beginner'],
      '{"source":"reference.md","section":"Core React","originalNum":45}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
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
      '',
      'In some cases you want to render different components depending on some state. JSX does not render `false` or `undefined`, so you can use conditional _short-circuiting_ to render a given part of your component only if a certain condition is true.


    If you need an `if-else` condition then use _ternary operator_.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'core-concepts', 'beginner'],
      '{"source":"reference.md","section":"Core React","originalNum":46}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
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
      '',
      'When we _spread props_ we run into the risk of adding unknown HTML attributes, which is a bad practice. Instead we can use prop destructuring with `...rest` operator, so it will add only required props.

    For example,',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'core-concepts', 'beginner'],
      '{"source":"reference.md","section":"Core React","originalNum":47}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
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
      '',
      'There are memoize libraries available which can be used on function components.

    For example `moize` library can memoize the component in another component.


    **Update:** Since React v16.6.0, we have a `React.memo`. It provides a higher order component which memoizes component unless the props change. To use it, simply wrap the component using React.memo before you use it.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'core-concepts', 'beginner'],
      '{"source":"reference.md","section":"Core React","originalNum":48}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
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
      '',
      'React is already equipped to handle rendering on Node servers. A special version of the DOM renderer is available, which follows the same pattern as on the client side.


    This method will output the regular HTML as a string, which can be then placed inside a page body as part of the server response. On the client side, React detects the pre-rendered content and seamlessly picks up where it left off.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'core-concepts', 'beginner'],
      '{"source":"reference.md","section":"Core React","originalNum":49}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
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
      '',
      'You should use Webpack''s `DefinePlugin` method to set `NODE_ENV` to `production`, by which it strip out things like propType validation and extra warnings. Apart from this, if you minify the code, for example, Uglify''s dead-code elimination to strip out development only code and comments, it will drastically reduce the size of your bundle.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'core-concepts', 'beginner'],
      '{"source":"reference.md","section":"Core React","originalNum":50}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    );