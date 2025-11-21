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
