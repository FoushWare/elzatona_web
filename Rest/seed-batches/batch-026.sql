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
