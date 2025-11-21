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
      '',
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
      '{"source":"reference.md","section":"Miscellaneous","originalNum":301}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.313Z',
      '2025-11-18T18:46:59.313Z',
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
      '',
      '**No.** `useImperativeHandle` only works when the component is wrapped in `forwardRef`. It''s the combination that allows parent components to use a `ref` on a function component.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":302}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.313Z',
      '2025-11-18T18:46:59.313Z',
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
      '',
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
      '{"source":"reference.md","section":"Miscellaneous","originalNum":303}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.313Z',
      '2025-11-18T18:46:59.313Z',
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
      '',
      'The `useMemo` hook **does not directly prevent re-rendering of child components**. Its main purpose is to memoize the result of an expensive computation so that it doesn’t get recalculated unless its dependencies change. While this can improve performance, it doesn’t inherently control whether a child component re-renders.
        
        However, `useMemo` **can help prevent re-renders** when the memoized value is passed as a prop to a child component that is wrapped in `React.memo`. In that case, if the memoized value doesn’t change between renders (i.e., it has the same reference), React.memo can skip re-rendering the child. So, while `useMemo` doesn’t stop renders on its own, it **works in combination** with tools like `React.memo` to optimize rendering behavior.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":304}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.313Z',
      '2025-11-18T18:46:59.313Z',
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
      '',
      'The `useCallback` is a React Hook used to memoize **function definitions** between renders. It returns the same function reference unless its dependencies change. This is especially useful when passing callbacks to optimized child components (e.g. those wrapped in `React.memo`) to prevent unnecessary re-renders.
        
        **Example:**
        
        
        Without `useCallback`, a new function is created on every render, potentially causing child components to re-render unnecessarily.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":305}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.313Z',
      '2025-11-18T18:46:59.313Z',
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
      '',
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
      '{"source":"reference.md","section":"Miscellaneous","originalNum":306}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.313Z',
      '2025-11-18T18:46:59.313Z',
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
      '',
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
      '{"source":"reference.md","section":"Miscellaneous","originalNum":307}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.313Z',
      '2025-11-18T18:46:59.313Z',
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
      '',
      'If you try to update the state directly then it won''t re-render the component.


   Instead use `setState()` method. It schedules an update to a component''s state object. When state changes, the component responds by re-rendering.


   **Note:** You can directly assign to the state object either in _constructor_ or using latest javascript''s class field declaration syntax.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":1}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.313Z',
      '2025-11-18T18:46:59.313Z',
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
      '',
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
      '{"source":"reference.md","section":"Old Q&A","originalNum":2}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.313Z',
      '2025-11-18T18:46:59.313Z',
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
      '',
      'There are 3 possible ways to achieve this in class components:

   1. **Binding in Constructor:** In JavaScript classes, the methods are not bound by default. The same rule applies for React event handlers defined as class methods. Normally we bind them in constructor.


   2. **Public class fields syntax:** If you don''t like to use bind approach then _public class fields syntax_ can be used to correctly bind callbacks. The Create React App enables this syntax by default.



   3. **Arrow functions in callbacks:** It is possible to use _arrow functions_ directly in the callbacks.


   **Note:** If the callback is passed as prop to child components, those components might do an extra re-rendering. In those cases, it is preferred to go with `.bind()` or _public class fields syntax_ approach considering performance.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":3}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.313Z',
      '2025-11-18T18:46:59.313Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
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
      '',
      'You can use an _arrow function_ to wrap around an _event handler_ and pass parameters:


   This is an equivalent to calling `.bind`:


   Apart from these two approaches, you can also pass arguments to a function which is defined as arrow function',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":4}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.313Z',
      '2025-11-18T18:46:59.313Z',
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
      '',
      'The _ref_ is used to return a reference to the element. They _should be avoided_ in most cases, however, they can be useful when you need a direct access to the DOM element or an instance of a component.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":5}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.313Z',
      '2025-11-18T18:46:59.313Z',
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
      '',
      'There are two approaches

   1. This is a recently added approach. _Refs_ are created using `React.createRef()` method and attached to React elements via the `ref` attribute. In order to use _refs_ throughout the component, just assign the _ref_ to the instance property within constructor.


   2. You can also use ref callbacks approach regardless of React version. For example, the search bar component''s input element is accessed as follows,

   You can also use _refs_ in function components using **closures**.
   **Note**: You can also use inline ref callbacks even though it is not a recommended approach.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":6}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.313Z',
      '2025-11-18T18:46:59.313Z',
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
      '',
      '_Ref forwarding_ is a feature that lets some components take a _ref_ they receive, and pass it further down to a child.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":7}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.313Z',
      '2025-11-18T18:46:59.313Z',
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
      '',
      'It is preferred to use _callback refs_ over `findDOMNode()` API. Because `findDOMNode()` prevents certain improvements in React in the future.

   The **legacy** approach of using `findDOMNode`:


   The recommended approach is:',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":8}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.313Z',
      '2025-11-18T18:46:59.313Z',
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
      '',
      'If you worked with React before, you might be familiar with an older API where the `ref` attribute is a string, like `ref={''textInput''}`, and the DOM node is accessed as `this.refs.textInput`. We advise against it because _string refs have below issues_, and are considered legacy. String refs were **removed in React v16**.

   1. They _force React to keep track of currently executing component_. This is problematic because it makes react module stateful, and thus causes weird errors when react module is duplicated in the bundle.
   2. They are _not composable_ — if a library puts a ref on the passed child, the user can''t put another ref on it. Callback refs are perfectly composable.
   3. They _don''t work with static analysis_ like Flow. Flow can''t guess the magic that framework does to make the string ref appear on `this.refs`, as well as its type (which could be different). Callback refs are friendlier to static analysis.
   4. It doesn''t work as most people would expect with the "render callback" pattern (e.g. <DataGrid renderRow={this.renderRow} />)',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":9}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.313Z',
      '2025-11-18T18:46:59.313Z',
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
      '',
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
      '{"source":"reference.md","section":"Old Q&A","originalNum":10}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.313Z',
      '2025-11-18T18:46:59.313Z',
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
      '',
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
      '{"source":"reference.md","section":"Old Q&A","originalNum":11}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.313Z',
      '2025-11-18T18:46:59.313Z',
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
      '',
      'You can add/edit props passed to the component using _props proxy_ pattern like this:',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":12}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.313Z',
      '2025-11-18T18:46:59.313Z',
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
      '',
      '_Context_ provides a way to pass data through the component tree without having to pass props down manually at every level.

    For example, authenticated users, locale preferences, UI themes need to be accessed in the application by many components.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":13}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.313Z',
      '2025-11-18T18:46:59.313Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
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
      '',
      'A child class constructor cannot make use of `this` reference until the `super()` method has been called. The same applies to ES6 sub-classes as well. The main reason for passing props parameter to `super()` call is to access `this.props` in your child constructors.

    **Passing props:**


    **Not passing props:**


    The above code snippets reveals that `this.props` is different only within the constructor. It would be the same outside the constructor.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":14}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.313Z',
      '2025-11-18T18:46:59.313Z',
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
      '',
      'If you are using ES6 or the Babel transpiler to transform your JSX code then you can accomplish this with _computed property names_.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":15}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.313Z',
      '2025-11-18T18:46:59.313Z',
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
      '',
      'You need to make sure that function is not being called while passing the function as a parameter.


    Instead, pass the function itself without parenthesis:',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":16}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.313Z',
      '2025-11-18T18:46:59.313Z',
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
      '',
      '_Error boundaries_ are components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed.

    A class component becomes an error boundary if it defines a new lifecycle method called `componentDidCatch(error, info)` or `static getDerivedStateFromError() `:


    After that use it as a regular component:',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":17}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.313Z',
      '2025-11-18T18:46:59.313Z',
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
      '',
      'React v15 provided very basic support for _error boundaries_ using `unstable_handleError` method. It has been renamed to `componentDidCatch` in React v16.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":18}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.313Z',
      '2025-11-18T18:46:59.313Z',
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
      '',
      'This method is used to render a React element into the DOM in the supplied container and return a reference to the component. If the React element was previously rendered into container, it will perform an update on it and only mutate the DOM as necessary to reflect the latest changes.


    If the optional callback is provided, it will be executed after the component is rendered or updated.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":19}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.313Z',
      '2025-11-18T18:46:59.313Z',
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
      '',
      'When you use `setState()`, then apart from assigning to the object state React also re-renders the component and all its children. You would get error like this: _Can only update a mounted or mounting component._ So we need to use `this.state` to initialize variables inside constructor.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":20}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.313Z',
      '2025-11-18T18:46:59.313Z',
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
      '',
      'Yes, it is safe to use `setState()` inside `componentWillMount()` method. But at the same it is recommended to avoid async initialization in `componentWillMount()` lifecycle method. `componentWillMount()` is invoked immediately before mounting occurs. It is called before `render()`, therefore setting state in this method will not trigger a re-render. Avoid introducing any side-effects or subscriptions in this method. We need to make sure async calls for component initialization happened in `componentDidMount()` instead of `componentWillMount()`.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":21}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.313Z',
      '2025-11-18T18:46:59.313Z',
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
      '',
      'If the props on the component are changed without the component being refreshed, the new prop value will never be displayed because the constructor function will never update the current state of the component. The initialization of state from props only runs when the component is first created.

    The below component won''t display the updated input value:


    Using props inside render method will update the value:',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":22}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.313Z',
      '2025-11-18T18:46:59.313Z',
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
      '',
      'You can _decorate_ your _class_ components, which is the same as passing the component into a function. **Decorators** are flexible and readable way of modifying component functionality.


    **Note:** Decorators are a feature that didn''t make it into ES7, but are currently a _stage 2 proposal_.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":23}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.313Z',
      '2025-11-18T18:46:59.313Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
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
      '',
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
      '{"source":"reference.md","section":"Old Q&A","originalNum":24}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.313Z',
      '2025-11-18T18:46:59.313Z',
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
      '',
      'The lifecycle methods are called in the following order when an instance of a component is being created and inserted into the DOM.

    1. `constructor()`
    2. `static getDerivedStateFromProps()`
    3. `render()`
    4. `componentDidMount()`',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":25}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.313Z',
      '2025-11-18T18:46:59.313Z',
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
      '',
      'The following lifecycle methods going to be unsafe coding practices and will be more problematic with async rendering.

    1. `componentWillMount()`
    2. `componentWillReceiveProps()`
    3. `componentWillUpdate()`

    Starting with React v16.3 these methods are aliased with `UNSAFE_` prefix, and the unprefixed version will be removed in React v17.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":26}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.313Z',
      '2025-11-18T18:46:59.313Z',
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
      '',
      'The new static `getDerivedStateFromProps()` lifecycle method is invoked after a component is instantiated as well as before it is re-rendered. It can return an object to update state, or `null` to indicate that the new props do not require any state updates.


    This lifecycle method along with `componentDidUpdate()` covers all the use cases of `componentWillReceiveProps()`.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":27}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.313Z',
      '2025-11-18T18:46:59.313Z',
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
      '',
      'The new `getSnapshotBeforeUpdate()` lifecycle method is called right before DOM updates. The return value from this method will be passed as the third parameter to `componentDidUpdate()`.


    This lifecycle method along with `componentDidUpdate()` covers all the use cases of `componentWillUpdate()`.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":28}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.313Z',
      '2025-11-18T18:46:59.313Z',
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
      '',
      'It is recommended to name the component by reference instead of using `displayName`.

    Using `displayName` for naming component:


    The **recommended** approach:


    also',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":29}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.313Z',
      '2025-11-18T18:46:59.313Z',
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
      '',
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
      '{"source":"reference.md","section":"Old Q&A","originalNum":30}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.313Z',
      '2025-11-18T18:46:59.313Z',
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
      '',
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
      '{"source":"reference.md","section":"Old Q&A","originalNum":31}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.313Z',
      '2025-11-18T18:46:59.313Z',
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
      '',
      'The primary use case for `isMounted()` is to avoid calling `setState()` after a component has been unmounted, because it will emit a warning.


    Checking `isMounted()` before calling `setState()` does eliminate the warning, but it also defeats the purpose of the warning. Using `isMounted()` is a code smell because the only reason you would check is because you think you might be holding a reference after the component has unmounted.

    An optimal solution would be to find places where `setState()` might be called after a component has unmounted, and fix them. Such situations most commonly occur due to callbacks, when a component is waiting for some data and gets unmounted before the data arrives. Ideally, any callbacks should be canceled in `componentWillUnmount()`, prior to unmounting.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":32}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.313Z',
      '2025-11-18T18:46:59.313Z',
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
      '',
      'You should initialize state in the constructor when using ES6 classes, and `getInitialState()` method when using `React.createClass()`.

    **Using ES6 classes:**


    **Using `React.createClass()`:**


    **Note:** `React.createClass()` is deprecated and removed in React v16. Use plain JavaScript classes instead.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":33}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.313Z',
      '2025-11-18T18:46:59.313Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'Can you force a component to re-render without calling setState?',
      '<pre><code>    component.forceUpdate(callback);</code></pre>

By default, when your component''s state or props change, your component will re-render. If your `render()` method depends on some other data, you can tell React that the component needs re-rendering by calling `forceUpdate()`.


    It is recommended to avoid all uses of `forceUpdate()` and only read from `this.props` and `this.state` in `render()`.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'By default, when your component''s state or props change, your component will re-render. If your `render()` method depends on some other data, you can tell React that the component needs re-rendering by calling `forceUpdate()`.


    It is recommended to avoid all uses of `forceUpdate()` and only read from `this.props` and `this.state` in `render()`.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":34}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.313Z',
      '2025-11-18T18:46:59.313Z',
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
      '',
      'When you want to access `this.props` in `constructor()` then you should pass props to `super()` method.

    **Using `super(props)`:**


    **Using `super()`:**


    Outside `constructor()` both will display same value for `this.props`.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":35}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.313Z',
      '2025-11-18T18:46:59.313Z',
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
      '',
      'When you use `setState()` the current and previous states are merged. `replaceState()` throws out the current state, and replaces it with only what you provide. Usually `setState()` is used unless you really need to remove all previous keys for some reason. You can also set state to `false`/`null` in `setState()` instead of using `replaceState()`.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":36}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.313Z',
      '2025-11-18T18:46:59.313Z',
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
      '',
      'The `componentDidUpdate` lifecycle method will be called when state changes. You can compare provided state and props values with current state and props to determine if something meaningful changed.


    **Note:** The previous releases of ReactJS also uses `componentWillUpdate(object nextProps, object nextState)` for state changes. It has been deprecated in latest releases.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":37}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.313Z',
      '2025-11-18T18:46:59.313Z',
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
      '',
      'The better approach is to use `Array.prototype.filter()` method.

    For example, let''s create a `removeItem()` method for updating the state.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":38}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.313Z',
      '2025-11-18T18:46:59.313Z',
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
      '',
      'It is possible. Below are the possible options:




    React version >=16.0.0:



    React version >=16.2.0:



    React version >=18.0.0:',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":39}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.313Z',
      '2025-11-18T18:46:59.313Z',
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
      '',
      '1.  **Calling `setState()` with an object to merge with state:**

        - Using `Object.assign()` to create a copy of the object:


        - Using _spread operator_:


    2.  **Calling `setState()` with a function:**',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":40}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.313Z',
      '2025-11-18T18:46:59.313Z',
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
      '',
      'There are approaches to include polyfills in create-react-app,

    1.  **Manual import from `core-js`:**

        Create a file called (something like) `polyfills.js` and import it into root `index.js` file. Run `npm install core-js` or `yarn add core-js` and import your specific required features.


    2.  **Using Polyfill service:**

        Use the polyfill.io CDN to retrieve custom, browser-specific polyfills by adding this line to `index.html`:


        In the above script we had to explicitly request the `Array.prototype.includes` feature as it is not included in the default feature set.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":41}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.313Z',
      '2025-11-18T18:46:59.313Z',
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
      '',
      'You just need to use `HTTPS=true` configuration. You can edit your `package.json` scripts section:


    or just run `set HTTPS=true && npm start`',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":42}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.313Z',
      '2025-11-18T18:46:59.313Z',
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
      '',
      'Create a file called `.env` in the project root and write the import path:


    After that restart the development server. Now you should be able to import anything inside `src/app` without relative paths.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":43}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.313Z',
      '2025-11-18T18:46:59.313Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    );