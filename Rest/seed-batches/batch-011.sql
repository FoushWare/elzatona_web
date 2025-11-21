-- Batch 11: Questions 101-110 (10 questions)
INSERT INTO questions (
  id, title, content, type, difficulty, points, options, correct_answer, 
  explanation, test_cases, hints, tags, metadata, stats, category_id, 
  learning_card_id, is_active, created_at, updated_at, topic_id, time_limit
) VALUES (
    gen_random_uuid(),
    'Give a simple example of Jest test case',
    '<pre><code>     $ yarn test
     PASS ./sum.test.js
     ✓ adds 1 + 2 to equal 3 (2ms)</code></pre>

Let''s write a test for a function that adds two numbers in `sum.js` file:


     Create a file named `sum.test.js` which contains actual test:


     And then add the following section to your `package.json`:


     Finally, run `yarn test` or `npm test` and Jest will print a result:',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Let''s write a test for a function that adds two numbers in `sum.js` file:


     Create a file named `sum.test.js` which contains actual test:


     And then add the following section to your `package.json`:


     Finally, run `yarn test` or `npm test` and Jest will print a result:',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'testing', 'intermediate'],
    '{"source":"reference.md","section":"React Testing","originalNum":101}'::jsonb,
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
    'What is flux?',
    '**Flux** is an **application architecture** (not a framework or library) designed by Facebook to manage **data flow** in React applications. It was created as an alternative to the traditional **MVC (Model-View-Controller)** pattern, and it emphasizes a **unidirectional data flow** to make state changes more predictable and easier to debug.

       Flux complements React by organizing the way data moves through your application, especially in large-scale or complex projects.

       #### Core Concepts of Flux

       Flux operates using **four key components**, each with a specific responsibility:
       *   **Actions**
             *   Plain JavaScript objects or functions that describe _what happened_ (e.g., user interactions or API responses).
             *   Example: `{ type: ''ADD_TODO'', payload: ''Buy milk'' }`
       *   **Dispatcher**
             *   A central hub that receives actions and **dispatches** them to the appropriate stores.
             *   There is **only one dispatcher** in a Flux application.
       *   **Stores**
             *   Hold the **application state** and business logic.
             *   Respond to actions from the dispatcher and update themselves accordingly.
             *   They **emit change events** that views can listen to.
       *   **Views (React Components)**
             *   Subscribe to stores and **re-render** when the data changes.
             *   They can also trigger new actions (e.g., on user input).


       The workflow between dispatcher, stores and views components with distinct inputs and outputs as follows:

       ![flux](images/flux.png)',
    'open-ended',
    'advanced',
    10,
    NULL,
    NULL,
    '**Flux** is an **application architecture** (not a framework or library) designed by Facebook to manage **data flow** in React applications. It was created as an alternative to the traditional **MVC (Model-View-Controller)** pattern, and it emphasizes a **unidirectional data flow** to make state changes more predictable and easier to debug.

       Flux complements React by organizing the way data moves through your application, especially in large-scale or complex projects.

       #### Core Concepts of Flux

       Flux operates using **four key components**, each with a specific responsibility:
       *   **Actions**
             *   Plain JavaScript objects or functions that describe _what happened_ (e.g., user interactions or API responses).
             *   Example: `{ type: ''ADD_TODO'', payload: ''Buy milk'' }`
       *   **Dispatcher**
             *   A central hub that receives actions and **dispatches** them to the appropriate stores.
             *   There is **only one dispatcher** in a Flux application.
       *   **Stores**
             *   Hold the **application state** and business logic.
             *   Respond to actions from the dispatcher and update themselves accordingly.
             *   They **emit change events** that views can listen to.
       *   **Views (React Components)**
             *   Subscribe to stores and **re-render** when the data changes.
             *   They can also trigger new actions (e.g., on user input).


       The workflow between dispatcher, stores and views components with distinct inputs and outputs as follows:

       ![flux](images/flux.png)',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'state-management', 'advanced'],
    '{"source":"reference.md","section":"React Redux","originalNum":102}'::jsonb,
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
    'What is Redux?',
    'Redux is a predictable state container for JavaScript applications, most commonly used with React. It helps you manage and centralize your application’s state in a single source of truth, enabling easier debugging, testing, and maintenance—especially in large or complex applications. Redux core is tiny library(about 2.5kB gzipped) and has no dependencies.',
    'open-ended',
    'advanced',
    10,
    NULL,
    NULL,
    'Redux is a predictable state container for JavaScript applications, most commonly used with React. It helps you manage and centralize your application’s state in a single source of truth, enabling easier debugging, testing, and maintenance—especially in large or complex applications. Redux core is tiny library(about 2.5kB gzipped) and has no dependencies.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'state-management', 'advanced'],
    '{"source":"reference.md","section":"React Redux","originalNum":103}'::jsonb,
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
    'What are the core principles of Redux?',
    '<pre><code>      function counter(state = 0, action) {
        switch (action.type) {
          case &#039;INCREMENT&#039;:
            return state + 1;
          case &#039;DECREMENT&#039;:
            return state - 1;
          default:
            return state;
        }
      }</code></pre>

Redux follows three fundamental principles:

     1. **Single source of truth:** The state of your whole application is stored in an object tree within a single store. The single state tree makes it easier to keep track of changes over time and debug or inspect the application.
   
     2. **State is read-only:** The only way to change the state is to emit an action, an object describing what happened. This ensures that neither the views nor the network callbacks will ever write directly to the state.
     3. **Changes are made with pure functions(Reducers):** To specify how the state tree is transformed by actions, you write reducers. Reducers are just pure functions that take the previous state and an action as parameters, and return the next state.',
    'open-ended',
    'advanced',
    10,
    NULL,
    NULL,
    'Redux follows three fundamental principles:

     1. **Single source of truth:** The state of your whole application is stored in an object tree within a single store. The single state tree makes it easier to keep track of changes over time and debug or inspect the application.
   
     2. **State is read-only:** The only way to change the state is to emit an action, an object describing what happened. This ensures that neither the views nor the network callbacks will ever write directly to the state.
     3. **Changes are made with pure functions(Reducers):** To specify how the state tree is transformed by actions, you write reducers. Reducers are just pure functions that take the previous state and an action as parameters, and return the next state.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'state-management', 'advanced'],
    '{"source":"reference.md","section":"React Redux","originalNum":104}'::jsonb,
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
    'What are the downsides of Redux compared to Flux?',
    'While Redux offers a powerful and predictable state management solution, it comes with a few trade-offs when compared to Flux. These include:

     1.  **Immutability is essential**  
        Redux enforces a strict immutability model for state updates, which differs from Flux’s more relaxed approach. This means you must avoid mutating state directly. Many Redux-related libraries assume immutability, so your team must be disciplined in writing pure update logic. You can use tools like `redux-immutable-state-invariant`, `Immer`, or `Immutable.js` to help enforce this practice, especially during development.
     2.  **Careful selection of complementary packages**  
        Redux is more minimal by design and provides extension points such as middleware and store enhancers. This has led to a large ecosystem, but it also means you must thoughtfully choose and configure additional packages for features like undo/redo, persistence, or form handling—something Flux explicitly leaves out but may be simpler to manage in smaller setups.
     3.  **Limited static type integration**  
        While Flux has mature support for static type checking with tools like Flow, Redux’s type integration is less seamless. Although TypeScript is commonly used with Redux now, early Flow support was limited, and more boilerplate was required for static type safety. This may affect teams that rely heavily on type systems for large codebases.',
    'open-ended',
    'advanced',
    10,
    NULL,
    NULL,
    'While Redux offers a powerful and predictable state management solution, it comes with a few trade-offs when compared to Flux. These include:

     1.  **Immutability is essential**  
        Redux enforces a strict immutability model for state updates, which differs from Flux’s more relaxed approach. This means you must avoid mutating state directly. Many Redux-related libraries assume immutability, so your team must be disciplined in writing pure update logic. You can use tools like `redux-immutable-state-invariant`, `Immer`, or `Immutable.js` to help enforce this practice, especially during development.
     2.  **Careful selection of complementary packages**  
        Redux is more minimal by design and provides extension points such as middleware and store enhancers. This has led to a large ecosystem, but it also means you must thoughtfully choose and configure additional packages for features like undo/redo, persistence, or form handling—something Flux explicitly leaves out but may be simpler to manage in smaller setups.
     3.  **Limited static type integration**  
        While Flux has mature support for static type checking with tools like Flow, Redux’s type integration is less seamless. Although TypeScript is commonly used with Redux now, early Flow support was limited, and more boilerplate was required for static type safety. This may affect teams that rely heavily on type systems for large codebases.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'state-management', 'advanced'],
    '{"source":"reference.md","section":"React Redux","originalNum":105}'::jsonb,
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
    'What is the difference between `mapStateToProps()` and `mapDispatchToProps()`?',
    '<pre><code>     const mapDispatchToProps = {
       onTodoClick,
     };</code></pre>

`mapStateToProps()` is a utility which helps your component get updated state (which is updated by some other components):


     `mapDispatchToProps()` is a utility which will help your component to fire an action event (dispatching action which may cause change of application state):


     It is recommended to always use the “object shorthand” form for the `mapDispatchToProps`.

     Redux wraps it in another function that looks like (…args) => dispatch(onTodoClick(…args)), and pass that wrapper function as a prop to your component.',
    'open-ended',
    'advanced',
    10,
    NULL,
    NULL,
    '`mapStateToProps()` is a utility which helps your component get updated state (which is updated by some other components):


     `mapDispatchToProps()` is a utility which will help your component to fire an action event (dispatching action which may cause change of application state):


     It is recommended to always use the “object shorthand” form for the `mapDispatchToProps`.

     Redux wraps it in another function that looks like (…args) => dispatch(onTodoClick(…args)), and pass that wrapper function as a prop to your component.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'state-management', 'advanced'],
    '{"source":"reference.md","section":"React Redux","originalNum":106}'::jsonb,
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
    'Can I dispatch an action in reducer?',
    'Dispatching an action within a reducer is an **anti-pattern**. Your reducer should be _without side effects_, simply digesting the action payload and returning a new state object. Adding listeners and dispatching actions within the reducer can lead to chained actions and other side effects.',
    'open-ended',
    'advanced',
    10,
    NULL,
    NULL,
    'Dispatching an action within a reducer is an **anti-pattern**. Your reducer should be _without side effects_, simply digesting the action payload and returning a new state object. Adding listeners and dispatching actions within the reducer can lead to chained actions and other side effects.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'state-management', 'advanced'],
    '{"source":"reference.md","section":"React Redux","originalNum":107}'::jsonb,
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
    'How to access Redux store outside a component?',
    '<pre><code>     store = createStore(myReducer);

     export default store;</code></pre>

You just need to export the store from the module where it created with `createStore()`. Also, it shouldn''t pollute the global window object.',
    'open-ended',
    'advanced',
    10,
    NULL,
    NULL,
    'You just need to export the store from the module where it created with `createStore()`. Also, it shouldn''t pollute the global window object.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'state-management', 'advanced'],
    '{"source":"reference.md","section":"React Redux","originalNum":108}'::jsonb,
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
    'What are the drawbacks of MVW pattern?',
    '1. DOM manipulation is very expensive which causes applications to behave slow and inefficient.
     2. Due to circular dependencies, a complicated model was created around models and views.
     3. Lot of data changes happens for collaborative applications(like Google Docs).
     4. No way to do undo (travel back in time) easily without adding so much extra code.',
    'open-ended',
    'advanced',
    10,
    NULL,
    NULL,
    '1. DOM manipulation is very expensive which causes applications to behave slow and inefficient.
     2. Due to circular dependencies, a complicated model was created around models and views.
     3. Lot of data changes happens for collaborative applications(like Google Docs).
     4. No way to do undo (travel back in time) easily without adding so much extra code.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'state-management', 'advanced'],
    '{"source":"reference.md","section":"React Redux","originalNum":109}'::jsonb,
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
    'Are there any similarities between Redux and RxJS?',
    'These libraries are very different for very different purposes, but there are some vague similarities.

     Redux is a tool for managing state throughout the application. It is usually used as an architecture for UIs. Think of it as an alternative to (half of) Angular. RxJS is a reactive programming library. It is usually used as a tool to accomplish asynchronous tasks in JavaScript. Think of it as an alternative to Promises. Redux uses the Reactive paradigm because the Store is reactive. The Store observes actions from a distance, and changes itself. RxJS also uses the Reactive paradigm, but instead of being an architecture, it gives you basic building blocks, Observables, to accomplish this pattern.',
    'open-ended',
    'advanced',
    10,
    NULL,
    NULL,
    'These libraries are very different for very different purposes, but there are some vague similarities.

     Redux is a tool for managing state throughout the application. It is usually used as an architecture for UIs. Think of it as an alternative to (half of) Angular. RxJS is a reactive programming library. It is usually used as a tool to accomplish asynchronous tasks in JavaScript. Think of it as an alternative to Promises. Redux uses the Reactive paradigm because the Store is reactive. The Store observes actions from a distance, and changes itself. RxJS also uses the Reactive paradigm, but instead of being an architecture, it gives you basic building blocks, Observables, to accomplish this pattern.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'state-management', 'advanced'],
    '{"source":"reference.md","section":"React Redux","originalNum":110}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.522Z',
    '2025-11-18T20:44:53.522Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  );
