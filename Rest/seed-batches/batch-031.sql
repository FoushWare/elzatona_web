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
