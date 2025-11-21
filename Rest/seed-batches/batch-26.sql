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
      '',
      'React updates UI in three steps,

     1. **Triggering or initiating a render:** The component is going to triggered for render in two ways.

        1. **Initial render:** When the app starts, you can trigger the initial render by calling `creatRoot` with the target DOM node followed by invoking component''s `render` method. For example, the following code snippet renders `App` component on root DOM node.


        2. **Re-render when the state updated:** When you update the component state using the state setter function, the componen''t state automatically queues for a render.

     2. **Rendering components:** After triggering a render, React will call your components to display them on the screen. React will call the root component for initial render and call the function component whose state update triggered the render. This is a recursive process for all nested components of the target component.

     3. **Commit changes to DOM:** After calling components, React will modify the DOM for initial render using `appendChild()` DOM API and apply minimal necessary DOM updates for re-renders based on differences between rerenders.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":252}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.312Z',
      '2025-11-18T18:46:59.312Z',
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
      '',
      'React prevents component from re-rendering for each and every state update by grouping multiple state updates within an event handler. This strategy improves the application performance and this process known as **batching**. The older version of React only supported batching for browser events whereas React18 supported for asynchronous actions, timeouts and intervals along with native events. This improved version of batching is called **automatic batching**.

      Let''s demonstrate this automatic batching feature with a below example.


      The preceding code updated two state variables with in an event handler. However, React will perform automatic batching feature and the component will be re-rendered only once for better performance.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":253}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.312Z',
      '2025-11-18T18:46:59.312Z',
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
      '',
      'Yes, it is possible to prevent automatic batching default behavior. There might be cases where you need to re-render your component after each state update or updating one state depends on another state variable. Considering this situation, React introduced `flushSync` method from `react-dom` API for the usecases where you need to flush state updates to DOM immediately.

      The usage of `flushSync` method within an `onClick` event handler will be looking like as below,


      In the above click handler, React will update DOM at first using flushSync and second time updates DOM because of the counter setter function by avoiding automatic batching.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":254}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.312Z',
      '2025-11-18T18:46:59.312Z',
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
      '',
      'React hydration is used to add client-side JavaScript interactivity to pre-rendered static HTML generated by the server. It is used only for server-side rendering(SSR) to enhance the initial rendering time and make it SEO friendly application. This hydration acts as a bridge to reduce the gap between server side and client-side rendering.

      After the page loaded with generated static HTML, React will add application state and interactivity by attaching all event handlers for the respective elements. Let''s demonstrate this with an example.

      Consider that React DOM API(using `renderToString`) generated HTML for `<App>` component which contains `<button>` element to increment the counter.


      The above code generates the below HTML with a header text and button component without any interactivity.


      At this stage `hydrateRoot` API can be used to perform hydration by attaching `onClick` event handler.


      After this step, you are able to run React application on server-side and hydrating the javascript bundle on client-side for smooth user experience and SEO purposes.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":255}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.312Z',
      '2025-11-18T18:46:59.312Z',
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
      '',
      'You cannot update the objects which exists in the state directly. Instead, you should create a fresh new object (or copy from the existing object) and update the latest state using the newly created object. Eventhough JavaScript objects are mutable, you need to treat objects inside state as read-only while updating the state.

      Let''s see this comparison with an example. The issue with regular object mutation approach can be described by updating the user details fields of `Profile` component. The properties of `Profile` component such as firstName, lastName and age details mutated in an event handler as shown below.


      Once you run the application with above user profile component, you can observe that user profile details won''t be update upon entering the input fields.
      This issue can be fixed by creating a new copy of object which includes existing properties through spread syntax(...obj) and add changed values in a single event handler itself as shown below.


      The above event handler is concise instead of maintaining separate event handler for each field. Now, UI displays the updated field values as expected without an issue.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":256}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.312Z',
      '2025-11-18T18:46:59.312Z',
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
      '',
      'You cannot simply use spread syntax for all kinds of objects inside state. Because spread syntax is shallow and it copies properties for one level deep only. If the object has nested object structure, UI doesn''t work as expected with regular JavaScript nested property mutation. Let''s demonstrate this behavior with an example of User object which has address nested object inside of it.


      If you try to update the country nested field in a regular javascript fashion(as shown below) then user profile screen won''t be updated with latest value.


      This issue can be fixed by flattening all the fields into a top-level object or create a new object for each nested object and point it to it''s parent object. In this example, first you need to create copy of address object and update it with the latest value. Later, the address object should be linked to parent user object something like below.


      This approach is bit verbose and not easy for deep hierarchical state updates. But this workaround can be used for few levels of nested objects without much hassle.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":257}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.312Z',
      '2025-11-18T18:46:59.312Z',
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
      '',
      'Eventhough arrays in JavaScript are mutable in nature, you need to treat them as immutable while storing them in a state. That means, similar to objects, the arrays cannot be updated directly inside state. Instead, you need to create a copy of the existing array and then set the state to use newly copied array.

      To ensure that arrays are not mutated, the mutation operations like direct direct assignment(arr[1]=''one''), push, pop, shift, unshift, splice etc methods should be avoided on original array. Instead, you can create a copy of existing array with help of array operations such as filter, map, slice, spread syntax etc.

      For example, the below push operation doesn''t add the new todo to the total todo''s list in an event handler.


      This issue is fixed by replacing push operation with spread syntax where it will create a new array and the UI updated with new todo.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":258}',
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
      '',
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
      '{"source":"reference.md","section":"Miscellaneous","originalNum":259}',
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
      'What are the benefits of preventing the direct state mutations?',
      'What are the benefits of preventing the direct state mutations?',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      '',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":260}',
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
      '',
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
      '{"source":"reference.md","section":"Miscellaneous","originalNum":261}',
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
      'What will happen by defining nested function components?',
      'Technically it is possible to write nested function components but it is not suggested to write nested function definitions. Because it leads to unexpected bugs and performance issues.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'Technically it is possible to write nested function components but it is not suggested to write nested function definitions. Because it leads to unexpected bugs and performance issues.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":262}',
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
      'Can I use keys for non-list items?',
      'Keys are primarily used for rendering list items but they are not just for list items. You can also use them React to distinguish components. By default, React uses order of the components in',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'Keys are primarily used for rendering list items but they are not just for list items. You can also use them React to distinguish components. By default, React uses order of the components in',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":263}',
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
      'What are the guidelines to be followed for writing reducers?',
      'There are two guidelines to be taken care while writing reducers in your code.

     1. Reducers must be pure without mutating the state. That means, same input always returns the same output. These reducers run during rendering time similar to state updater functions. So these functions should not send any requests, schedule time outs and any other side effects.

     2. Each action should describe a single user interaction even though there are multiple changes applied to data. For example, if you "reset" registration form which has many user input fields managed by a reducer, it is suggested to send one "reset" action instead of creating separate action for each fields. The proper ordering of actions should reflect the user interactions in the browser and it helps a lot for debugging purpose.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'There are two guidelines to be taken care while writing reducers in your code.

     1. Reducers must be pure without mutating the state. That means, same input always returns the same output. These reducers run during rendering time similar to state updater functions. So these functions should not send any requests, schedule time outs and any other side effects.

     2. Each action should describe a single user interaction even though there are multiple changes applied to data. For example, if you "reset" registration form which has many user input fields managed by a reducer, it is suggested to send one "reset" action instead of creating separate action for each fields. The proper ordering of actions should reflect the user interactions in the browser and it helps a lot for debugging purpose.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":264}',
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
      '',
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
      '{"source":"reference.md","section":"Miscellaneous","originalNum":265}',
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
      '',
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
      '{"source":"reference.md","section":"Miscellaneous","originalNum":266}',
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
      '',
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
      '{"source":"reference.md","section":"Miscellaneous","originalNum":267}',
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
      '',
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
      '{"source":"reference.md","section":"Miscellaneous","originalNum":268}',
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
      '',
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
      '{"source":"reference.md","section":"Miscellaneous","originalNum":269}',
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
      'What are the differences between page router and app router in nextjs?',
      'What are the differences between page router and app router in nextjs?',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      '',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":270}',
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
      '',
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
      '{"source":"reference.md","section":"Miscellaneous","originalNum":271}',
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
      'Can Hooks be used in class components?',
      'No, Hooks cannot be used inside class components. They are specially designed for function components. This is because hooks depend on the sequence in which they are called during a component’s render, something that''s only guaranteed in functional components. However, both class and function components can coexist in the same application.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'No, Hooks cannot be used inside class components. They are specially designed for function components. This is because hooks depend on the sequence in which they are called during a component’s render, something that''s only guaranteed in functional components. However, both class and function components can coexist in the same application.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":272}',
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
      '',
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
      '{"source":"reference.md","section":"Miscellaneous","originalNum":273}',
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
      '',
      'Yes, `useState` can take a function as an initial value, and this is a useful feature in React called **lazy initialization**. This function is also known as **initializer function**.

     When you call useState(initialValue), you normally pass in a value directly:
     

     But if calculating that initial value is expensive or involves logic, you can pass a function that returns the value:
     
     This function avoids doing heavy computation on every render. If you don''t use this function form and invokes it directly, the function will run everytime the component renders and impact the performance.
     For example, the below usage is not recommended.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":274}',
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
      '',
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
      '{"source":"reference.md","section":"Miscellaneous","originalNum":275}',
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
      '',
      'As per rules of React Hooks, hooks must be called unconditionally. For example, if you conditionally call it:

     React will throw a runtime error because it **relies on the order of Hook calls**, and conditional logic breaks that order.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":276}',
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
      '',
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
      '{"source":"reference.md","section":"Miscellaneous","originalNum":277}',
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
      '',
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
      '{"source":"reference.md","section":"Miscellaneous","originalNum":278}',
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
      '',
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
      '{"source":"reference.md","section":"Miscellaneous","originalNum":279}',
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
      '',
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
      '{"source":"reference.md","section":"Miscellaneous","originalNum":280}',
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
      '',
      'Yes, it''s common to combine **useReducer** with **useContext** to build a lightweight state management system similar to Redux:',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":281}',
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
      '',
      'Yes, you can dispatch multiple actions in a row using `useReducer` but not directly in one call. You''d have to call dispatch multiple times or create a composite action in your reducer that performs multiple updates based on the action type.
     
     **Example: Dispatching Multiple Actions**
     You can define a custom function with dispatching actions one by one.
     After that, you need to invoke it through event handler
     **Note:** You can also define a custom action type If you want multiple state changes to be handled in one reducer call.
     Then dispatch',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":282}',
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
      '',
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
      '{"source":"reference.md","section":"Miscellaneous","originalNum":283}',
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
      '',
      'Yes, it is possible. You can use multiple contexts inside the same component by calling useContext multiple times, once for each context.

     It can be achieved with below steps,

        *   Create multiple contexts using `createContext()`.
        *   Wrap your component tree with multiple `<Provider>`s.
        *   Call `useContext()` separately for each context in the same component.
     
     **Example: Using `ThemeContext` and `UserContext` Together**',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":284}',
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
      '',
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
      '{"source":"reference.md","section":"Miscellaneous","originalNum":285}',
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
      '',
      'When a component calls `useContext(SomeContext)` but **no matching** `<SomeContext.Provider>` **is present higher up in the component tree**, the **default value** passed to `React.createContext(defaultValue)` is returned.
    
     In this case, `theme` will be ''light''. It''s the default value you provided when you created the context.
    
     **Note:** If you don’t specify a default value, the context value will be undefined when used without a provider:',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":286}',
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
      '',
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
      '{"source":"reference.md","section":"Miscellaneous","originalNum":287}',
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
      '',
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
      '{"source":"reference.md","section":"Miscellaneous","originalNum":288}',
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
      '',
      'You should NOT return a Promise from useEffect. React expects the function passed to useEffect to return either nothing (undefined) or a cleanup function (synchronous function). i.e, It does not expect or handle a returned Promise. If you still return a Promise, React will ignore it silently, and it may lead to bugs or warnings in strict mode.

      **Incorrect:**
      **Correct:**',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":289}',
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
      '',
      'Yes, multiple useEffect hooks are allowed and recommended when you want to separate concerns.

      Each effect runs independently and helps make code modular and easier to debug.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":289}',
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
      '',
      'Infinite loops happen when the effect updates state that’s listed in its own dependency array, which causes the effect to re-run, updating state again and so on.
        
        **Infinite loop scenario:**
        You need to ensure that setState calls do not depend on values that cause the effect to rerun, or isolate them with a guard.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":290}',
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
      '',
      'You need to use `useLayoutEffect` when your effect **must run before the browser paints**, such as:

      *   **Reading layout measurements** (e.g., element size, scroll position)
      *   **Synchronously applying DOM styles** to prevent visual flicker
      *   **Animating layout or transitions**
      *   **Integrating with third-party libraries** that require DOM manipulation

      If there''s no visual or layout dependency, prefer `useEffect` — it''s more performance-friendly.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":291}',
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
      '',
      'The `useLayoutEffect` hook does **not run on the server**, because there is no DOM. React issues a warning in server environments like Next.js if `useLayoutEffect` is used directly.

     This can be mitigated using a conditional polyfill:


      i.e, Use `useIsomorphicLayoutEffect` in components that render both on client and server.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":292}',
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
      '',
      'Using `useLayoutEffect` for logic **unrelated to layout or visual DOM changes** (such as logging, data fetching, or analytics) is **not recommended**. It can lead to **performance issues** or even unexpected behavior.

      **Example: Anti-pattern**
      The above usage delays the paint of the UI just to send a network request, which could (and should) be done after paint using useEffect.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":293}',
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
      '',
      'The `useLayoutEffect` can **cause layout thrashing** when you **repeatedly read and write to the DOM** in ways that force the browser to recalculate layout multiple times per frame. This is because `useLayoutEffect` runs _before the browser paints_, these reflows happen _synchronously_, blocking rendering and degrading performance.

      **Example:**
      In the above code, each read/write cycle triggers synchronous reflows, blocking the main thread and delays UI rendering.

      This issue can be avoided by batching your DOM reads and writes and prevent unnecessary reads after writes.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":294}',
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
      '',
      'The `useRef` hook is commonly used in React to directly reference and interact with DOM elements — like focusing an input, scrolling to a section, or controlling media elements.
        
        When you assign a ref to a DOM element using useRef, React gives you access to the underlying DOM node via the .current property of the ref object.
        
        **Example: Focus an input**

       **Note:** The DOM reference is only available **after the component has mounted** — typically accessed in `useEffect` or event handlers.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":295}',
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
      '',
      'Yes, you can use `useRef` to persist values across renders in React. Unlike `useState`, changing `.current` does not cause re-renders, but the value is preserved across renders.
        
        **Example:**',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":296}',
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
      '',
      'Yes, `useRef` is a common pattern when you want to compare current and previous props or state without causing re-renders.
        
        **Example: Storing previous state value**',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":297}',
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
      '',
      'Yes, you can access a ref in the render method, but what you get from it depends on how you''re using the ref and when in the component lifecycle you''re rendering.
        
        For example, when using ref to access a DOM node (e.g., divRef.current), it''s not immediately available on the first render.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":298}',
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
      '',
      'Some of the common cases are:
      *   Automatically focus an input when a component mounts.
      *   Scroll to a specific element.
      *   Measure element dimensions (`offsetWidth`, `clientHeight`).
      *   Control video/audio playback.
      *   Integrate with non-React libraries (like D3 or jQuery).',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":299}',
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
      '',
      '`useImperativeHandle` is a React Hook that allows a **child component** to expose **custom functions or properties** to its **parent component**, when using `ref`.
      It is typically used with `forwardRef` and is very useful in cases like **modals**, **dialogs**, **custom inputs**, etc., where the parent needs to **control behavior imperatively** (e.g., open, close, reset).

      **Example: Dialog component**',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":300}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.313Z',
      '2025-11-18T18:46:59.313Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    );