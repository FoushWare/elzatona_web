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
