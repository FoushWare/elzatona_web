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
