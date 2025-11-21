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
