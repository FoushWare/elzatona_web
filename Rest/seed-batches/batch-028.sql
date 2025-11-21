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
