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
      '',
      'Let''s write a test for a function that adds two numbers in `sum.js` file:


     Create a file named `sum.test.js` which contains actual test:


     And then add the following section to your `package.json`:


     Finally, run `yarn test` or `npm test` and Jest will print a result:',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'testing', 'intermediate'],
      '{"source":"reference.md","section":"React Testing","originalNum":101}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
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
      '',
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
      '{"source":"reference.md","section":"React Redux","originalNum":102}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.311Z',
      '2025-11-18T18:46:59.311Z',
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
      '',
      'Redux is a predictable state container for JavaScript applications, most commonly used with React. It helps you manage and centralize your application’s state in a single source of truth, enabling easier debugging, testing, and maintenance—especially in large or complex applications. Redux core is tiny library(about 2.5kB gzipped) and has no dependencies.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'state-management', 'advanced'],
      '{"source":"reference.md","section":"React Redux","originalNum":103}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.311Z',
      '2025-11-18T18:46:59.311Z',
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
      '',
      'Redux follows three fundamental principles:

     1. **Single source of truth:** The state of your whole application is stored in an object tree within a single store. The single state tree makes it easier to keep track of changes over time and debug or inspect the application.
   
     2. **State is read-only:** The only way to change the state is to emit an action, an object describing what happened. This ensures that neither the views nor the network callbacks will ever write directly to the state.
     3. **Changes are made with pure functions(Reducers):** To specify how the state tree is transformed by actions, you write reducers. Reducers are just pure functions that take the previous state and an action as parameters, and return the next state.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'state-management', 'advanced'],
      '{"source":"reference.md","section":"React Redux","originalNum":104}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.311Z',
      '2025-11-18T18:46:59.311Z',
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
      '',
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
      '{"source":"reference.md","section":"React Redux","originalNum":105}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.311Z',
      '2025-11-18T18:46:59.311Z',
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
      '',
      '`mapStateToProps()` is a utility which helps your component get updated state (which is updated by some other components):


     `mapDispatchToProps()` is a utility which will help your component to fire an action event (dispatching action which may cause change of application state):


     It is recommended to always use the “object shorthand” form for the `mapDispatchToProps`.

     Redux wraps it in another function that looks like (…args) => dispatch(onTodoClick(…args)), and pass that wrapper function as a prop to your component.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'state-management', 'advanced'],
      '{"source":"reference.md","section":"React Redux","originalNum":106}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.311Z',
      '2025-11-18T18:46:59.311Z',
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
      '',
      'Dispatching an action within a reducer is an **anti-pattern**. Your reducer should be _without side effects_, simply digesting the action payload and returning a new state object. Adding listeners and dispatching actions within the reducer can lead to chained actions and other side effects.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'state-management', 'advanced'],
      '{"source":"reference.md","section":"React Redux","originalNum":107}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.311Z',
      '2025-11-18T18:46:59.311Z',
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
      '',
      'You just need to export the store from the module where it created with `createStore()`. Also, it shouldn''t pollute the global window object.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'state-management', 'advanced'],
      '{"source":"reference.md","section":"React Redux","originalNum":108}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.311Z',
      '2025-11-18T18:46:59.311Z',
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
      '',
      '1. DOM manipulation is very expensive which causes applications to behave slow and inefficient.
     2. Due to circular dependencies, a complicated model was created around models and views.
     3. Lot of data changes happens for collaborative applications(like Google Docs).
     4. No way to do undo (travel back in time) easily without adding so much extra code.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'state-management', 'advanced'],
      '{"source":"reference.md","section":"React Redux","originalNum":109}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.311Z',
      '2025-11-18T18:46:59.311Z',
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
      '',
      'These libraries are very different for very different purposes, but there are some vague similarities.

     Redux is a tool for managing state throughout the application. It is usually used as an architecture for UIs. Think of it as an alternative to (half of) Angular. RxJS is a reactive programming library. It is usually used as a tool to accomplish asynchronous tasks in JavaScript. Think of it as an alternative to Promises. Redux uses the Reactive paradigm because the Store is reactive. The Store observes actions from a distance, and changes itself. RxJS also uses the Reactive paradigm, but instead of being an architecture, it gives you basic building blocks, Observables, to accomplish this pattern.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'state-management', 'advanced'],
      '{"source":"reference.md","section":"React Redux","originalNum":110}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.311Z',
      '2025-11-18T18:46:59.311Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'How to reset state in Redux?',
      '<pre><code>     const appReducer = combineReducers({
       /* your app&#039;s top-level reducers */
     });

     const rootReducer = (state, action) =&gt; {
       if (action.type === &quot;USER_LOGOUT&quot;) {
         Object.keys(state).forEach((key) =&gt; {
           storage.removeItem(`persist:${key}`);
         });

         state = undefined;
       }

       return appReducer(state, action);
     };</code></pre>

You need to write a _root reducer_ in your application which delegate handling the action to the reducer generated by `combineReducers()`.

     For example, let us take `rootReducer()` to return the initial state after `USER_LOGOUT` action. As we know, reducers are supposed to return the initial state when they are called with `undefined` as the first argument, no matter the action.


     In case of using `redux-persist`, you may also need to clean your storage. `redux-persist` keeps a copy of your state in a storage engine. First, you need to import the appropriate storage engine and then, to parse the state before setting it to undefined and clean each storage state key.',
      'open-ended',
      'advanced',
      10,
      NULL,
      '',
      'You need to write a _root reducer_ in your application which delegate handling the action to the reducer generated by `combineReducers()`.

     For example, let us take `rootReducer()` to return the initial state after `USER_LOGOUT` action. As we know, reducers are supposed to return the initial state when they are called with `undefined` as the first argument, no matter the action.


     In case of using `redux-persist`, you may also need to clean your storage. `redux-persist` keeps a copy of your state in a storage engine. First, you need to import the appropriate storage engine and then, to parse the state before setting it to undefined and clean each storage state key.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'state-management', 'advanced'],
      '{"source":"reference.md","section":"React Redux","originalNum":111}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.311Z',
      '2025-11-18T18:46:59.311Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What is the difference between React context and React Redux?',
      'You can use **Context** in your application directly and is going to be great for passing down data to deeply nested components which what it was designed for.

     Whereas **Redux** is much more powerful and provides a large number of features that the Context API doesn''t provide. Also, React Redux uses context internally but it doesn''t expose this fact in the public API.',
      'open-ended',
      'advanced',
      10,
      NULL,
      '',
      'You can use **Context** in your application directly and is going to be great for passing down data to deeply nested components which what it was designed for.

     Whereas **Redux** is much more powerful and provides a large number of features that the Context API doesn''t provide. Also, React Redux uses context internally but it doesn''t expose this fact in the public API.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'state-management', 'advanced'],
      '{"source":"reference.md","section":"React Redux","originalNum":112}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.311Z',
      '2025-11-18T18:46:59.311Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'Why are Redux state functions called reducers?',
      'Reducers always return the accumulation of the state (based on all previous and current actions). Therefore, they act as a reducer of state. Each time a Redux reducer is called, the state and action are passed as parameters. This state is then reduced (or accumulated) based on the action, and then the next state is returned. You could _reduce_ a collection of actions and an initial state (of the store) on which to perform these actions to get the resulting final state.',
      'open-ended',
      'advanced',
      10,
      NULL,
      '',
      'Reducers always return the accumulation of the state (based on all previous and current actions). Therefore, they act as a reducer of state. Each time a Redux reducer is called, the state and action are passed as parameters. This state is then reduced (or accumulated) based on the action, and then the next state is returned. You could _reduce_ a collection of actions and an initial state (of the store) on which to perform these actions to get the resulting final state.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'state-management', 'advanced'],
      '{"source":"reference.md","section":"React Redux","originalNum":113}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.311Z',
      '2025-11-18T18:46:59.311Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'How to make AJAX request in Redux?',
      '<pre><code>     export function fetchAccount(id) {
       return (dispatch) =&gt; {
         dispatch(setLoadingAccountState()); // Show a loading spinner
         fetch(`/account/${id}`, (response) =&gt; {
           dispatch(doneFetchingAccount()); // Hide loading spinner
           if (response.status === 200) {
             dispatch(setAccount(response.json)); // Use a normal function to set the received state
           } else {
             dispatch(someError);
           }
         });
       };
     }

     function setAccount(data) {
       return { type: &quot;SET_Account&quot;, data: data };
     }</code></pre>

You can use `redux-thunk` middleware which allows you to define async actions.

     Let''s take an example of fetching specific account as an AJAX call using _fetch API_:',
      'open-ended',
      'advanced',
      10,
      NULL,
      '',
      'You can use `redux-thunk` middleware which allows you to define async actions.

     Let''s take an example of fetching specific account as an AJAX call using _fetch API_:',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'state-management', 'advanced'],
      '{"source":"reference.md","section":"React Redux","originalNum":114}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.311Z',
      '2025-11-18T18:46:59.311Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'Should I keep all component''s state in Redux store?',
      'Keep your data in the Redux store, and the UI related state internally in the component.',
      'open-ended',
      'advanced',
      10,
      NULL,
      '',
      'Keep your data in the Redux store, and the UI related state internally in the component.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'state-management', 'advanced'],
      '{"source":"reference.md","section":"React Redux","originalNum":115}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.311Z',
      '2025-11-18T18:46:59.311Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What is the proper way to access Redux store?',
      '<pre><code>     function MyComponent {
       someMethod() {
         doSomethingWith(this.context.store);
       }
     }</code></pre>

The best way to access your store in a component is to use the `connect()` function, that creates a new component that wraps around your existing one. This pattern is called _Higher-Order Components_, and is generally the preferred way of extending a component''s functionality in React. This allows you to map state and action creators to your component, and have them passed in automatically as your store updates.

     Let''s take an example of `<FilterLink>` component using connect:


     Due to it having quite a few performance optimizations and generally being less likely to cause bugs, the Redux developers almost always recommend using `connect()` over accessing the store directly (using context API).',
      'open-ended',
      'advanced',
      10,
      NULL,
      '',
      'The best way to access your store in a component is to use the `connect()` function, that creates a new component that wraps around your existing one. This pattern is called _Higher-Order Components_, and is generally the preferred way of extending a component''s functionality in React. This allows you to map state and action creators to your component, and have them passed in automatically as your store updates.

     Let''s take an example of `<FilterLink>` component using connect:


     Due to it having quite a few performance optimizations and generally being less likely to cause bugs, the Redux developers almost always recommend using `connect()` over accessing the store directly (using context API).',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'state-management', 'advanced'],
      '{"source":"reference.md","section":"React Redux","originalNum":116}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.311Z',
      '2025-11-18T18:46:59.311Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What is the difference between component and container in React Redux?',
      '**Component** is a class or function component that describes the presentational part of your application.

     **Container** is an informal term for a component that is connected to a Redux store. Containers _subscribe_ to Redux state updates and _dispatch_ actions, and they usually don''t render DOM elements; they delegate rendering to presentational child components.',
      'open-ended',
      'advanced',
      10,
      NULL,
      '',
      '**Component** is a class or function component that describes the presentational part of your application.

     **Container** is an informal term for a component that is connected to a Redux store. Containers _subscribe_ to Redux state updates and _dispatch_ actions, and they usually don''t render DOM elements; they delegate rendering to presentational child components.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'state-management', 'advanced'],
      '{"source":"reference.md","section":"React Redux","originalNum":117}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.311Z',
      '2025-11-18T18:46:59.311Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What is the purpose of the constants in Redux?',
      '<pre><code>        import { ADD_TODO } from &quot;./actionTypes&quot;;

        export default (state = [], action) =&gt; {
          switch (action.type) {
            case ADD_TODO:
              return [
                ...state,
                {
                  text: action.text,
                  completed: false,
                },
              ];
            default:
              return state;
          }
        };</code></pre>

Constants allows you to easily find all usages of that specific functionality across the project when you use an IDE. It also prevents you from introducing silly bugs caused by typos – in which case, you will get a `ReferenceError` immediately.

     Normally we will save them in a single file (`constants.js` or `actionTypes.js`).


     In Redux, you use them in two places:

     1. **During action creation:**

        Let''s take `actions.js`:


     2. **In reducers:**

        Let''s create `reducer.js`:',
      'open-ended',
      'advanced',
      10,
      NULL,
      '',
      'Constants allows you to easily find all usages of that specific functionality across the project when you use an IDE. It also prevents you from introducing silly bugs caused by typos – in which case, you will get a `ReferenceError` immediately.

     Normally we will save them in a single file (`constants.js` or `actionTypes.js`).


     In Redux, you use them in two places:

     1. **During action creation:**

        Let''s take `actions.js`:


     2. **In reducers:**

        Let''s create `reducer.js`:',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'state-management', 'advanced'],
      '{"source":"reference.md","section":"React Redux","originalNum":118}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.311Z',
      '2025-11-18T18:46:59.311Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What are the different ways to write `mapDispatchToProps()`?',
      '<pre><code>     const mapDispatchToProps = { action };</code></pre>

There are a few ways of binding _action creators_ to `dispatch()` in `mapDispatchToProps()`.

     Below are the possible options:




     The third option is just a shorthand for the first one.',
      'open-ended',
      'advanced',
      10,
      NULL,
      '',
      'There are a few ways of binding _action creators_ to `dispatch()` in `mapDispatchToProps()`.

     Below are the possible options:




     The third option is just a shorthand for the first one.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'state-management', 'advanced'],
      '{"source":"reference.md","section":"React Redux","originalNum":119}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.311Z',
      '2025-11-18T18:46:59.311Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What is the use of the `ownProps` parameter in `mapStateToProps()` and `mapDispatchToProps()`?',
      '<pre><code>     {
       user: &quot;john&quot;;
     }</code></pre>

If the `ownProps` parameter is specified, React Redux will pass the props that were passed to the component into your _connect_ functions. So, if you use a connected component:


     The `ownProps` inside your `mapStateToProps()` and `mapDispatchToProps()` functions will be an object:


     You can use this object to decide what to return from those functions.',
      'open-ended',
      'advanced',
      10,
      NULL,
      '',
      'If the `ownProps` parameter is specified, React Redux will pass the props that were passed to the component into your _connect_ functions. So, if you use a connected component:


     The `ownProps` inside your `mapStateToProps()` and `mapDispatchToProps()` functions will be an object:


     You can use this object to decide what to return from those functions.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'state-management', 'advanced'],
      '{"source":"reference.md","section":"React Redux","originalNum":120}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.311Z',
      '2025-11-18T18:46:59.311Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'How to structure Redux top level directories?',
      'Most of the applications has several top-level directories as below:

     1. **Components**: Used for _dumb_ components unaware of Redux.
     2. **Containers**: Used for _smart_ components connected to Redux.
     3. **Actions**: Used for all action creators, where file names correspond to part of the app.
     4. **Reducers**: Used for all reducers, where files name correspond to state key.
     5. **Store**: Used for store initialization.

     This structure works well for small and medium size apps.',
      'open-ended',
      'advanced',
      10,
      NULL,
      '',
      'Most of the applications has several top-level directories as below:

     1. **Components**: Used for _dumb_ components unaware of Redux.
     2. **Containers**: Used for _smart_ components connected to Redux.
     3. **Actions**: Used for all action creators, where file names correspond to part of the app.
     4. **Reducers**: Used for all reducers, where files name correspond to state key.
     5. **Store**: Used for store initialization.

     This structure works well for small and medium size apps.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'state-management', 'advanced'],
      '{"source":"reference.md","section":"React Redux","originalNum":121}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.311Z',
      '2025-11-18T18:46:59.311Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What is redux-saga?',
      '<pre><code>     $ npm install --save redux-saga</code></pre>

`redux-saga` is a library that aims to make side effects (asynchronous things like data fetching and impure things like accessing the browser cache) in React/Redux applications easier and better.

     It is available in NPM:',
      'open-ended',
      'advanced',
      10,
      NULL,
      '',
      '`redux-saga` is a library that aims to make side effects (asynchronous things like data fetching and impure things like accessing the browser cache) in React/Redux applications easier and better.

     It is available in NPM:',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'state-management', 'advanced'],
      '{"source":"reference.md","section":"React Redux","originalNum":122}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.311Z',
      '2025-11-18T18:46:59.311Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What is the mental model of redux-saga?',
      '_Saga_ is like a separate thread in your application, that''s solely responsible for side effects. `redux-saga` is a redux _middleware_, which means this thread can be started, paused and cancelled from the main application with normal Redux actions, it has access to the full Redux application state and it can dispatch Redux actions as well.',
      'open-ended',
      'advanced',
      10,
      NULL,
      '',
      '_Saga_ is like a separate thread in your application, that''s solely responsible for side effects. `redux-saga` is a redux _middleware_, which means this thread can be started, paused and cancelled from the main application with normal Redux actions, it has access to the full Redux application state and it can dispatch Redux actions as well.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'state-management', 'advanced'],
      '{"source":"reference.md","section":"React Redux","originalNum":123}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.311Z',
      '2025-11-18T18:46:59.311Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What are the differences between `call()` and `put()` in redux-saga?',
      '<pre><code>     function* fetchUserSaga(action) {
       // `call` function accepts rest arguments, which will be passed to `api.fetchUser` function.
       // Instructing middleware to call promise, it resolved value will be assigned to `userData` variable
       const userData = yield call(api.fetchUser, action.userId);

       // Instructing middleware to dispatch corresponding action.
       yield put({
         type: &quot;FETCH_USER_SUCCESS&quot;,
         userData,
       });
     }</code></pre>

Both `call()` and `put()` are effect creator functions. `call()` function is used to create effect description, which instructs middleware to call the promise. `put()` function creates an effect, which instructs middleware to dispatch an action to the store.

     Let''s take example of how these effects work for fetching particular user data.',
      'open-ended',
      'advanced',
      10,
      NULL,
      '',
      'Both `call()` and `put()` are effect creator functions. `call()` function is used to create effect description, which instructs middleware to call the promise. `put()` function creates an effect, which instructs middleware to dispatch an action to the store.

     Let''s take example of how these effects work for fetching particular user data.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'state-management', 'advanced'],
      '{"source":"reference.md","section":"React Redux","originalNum":124}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.311Z',
      '2025-11-18T18:46:59.311Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What is Redux Thunk?',
      '_Redux Thunk_ middleware allows you to write action creators that return a function instead of an action. The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met. The inner function receives the store methods `dispatch()` and `getState()` as parameters.',
      'open-ended',
      'advanced',
      10,
      NULL,
      '',
      '_Redux Thunk_ middleware allows you to write action creators that return a function instead of an action. The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met. The inner function receives the store methods `dispatch()` and `getState()` as parameters.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'state-management', 'advanced'],
      '{"source":"reference.md","section":"React Redux","originalNum":125}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.311Z',
      '2025-11-18T18:46:59.311Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What are the differences between `redux-saga` and `redux-thunk`?',
      'Both _Redux Thunk_ and _Redux Saga_ take care of dealing with side effects. In most of the scenarios, Thunk uses _Promises_ to deal with them, whereas Saga uses _Generators_. Thunk is simple to use and Promises are familiar to many developers, Sagas/Generators are more powerful but you will need to learn them. But both middleware can coexist, so you can start with Thunks and introduce Sagas when/if you need them.',
      'open-ended',
      'advanced',
      10,
      NULL,
      '',
      'Both _Redux Thunk_ and _Redux Saga_ take care of dealing with side effects. In most of the scenarios, Thunk uses _Promises_ to deal with them, whereas Saga uses _Generators_. Thunk is simple to use and Promises are familiar to many developers, Sagas/Generators are more powerful but you will need to learn them. But both middleware can coexist, so you can start with Thunks and introduce Sagas when/if you need them.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'state-management', 'advanced'],
      '{"source":"reference.md","section":"React Redux","originalNum":126}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.311Z',
      '2025-11-18T18:46:59.311Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What is Redux DevTools?',
      '_Redux DevTools_ is a live-editing time travel environment for Redux with hot reloading, action replay, and customizable UI. If you don''t want to bother with installing Redux DevTools and integrating it into your project, consider using Redux DevTools Extension for Chrome and Firefox.',
      'open-ended',
      'advanced',
      10,
      NULL,
      '',
      '_Redux DevTools_ is a live-editing time travel environment for Redux with hot reloading, action replay, and customizable UI. If you don''t want to bother with installing Redux DevTools and integrating it into your project, consider using Redux DevTools Extension for Chrome and Firefox.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'state-management', 'advanced'],
      '{"source":"reference.md","section":"React Redux","originalNum":127}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.311Z',
      '2025-11-18T18:46:59.311Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What are the features of Redux DevTools?',
      'Some of the main features of Redux DevTools are below,

     1. Lets you inspect every state and action payload.
     2. Lets you go back in time by _cancelling_ actions.
     3. If you change the reducer code, each _staged_ action will be re-evaluated.
     4. If the reducers throw, you will see during which action this happened, and what the error was.
     5. With `persistState()` store enhancer, you can persist debug sessions across page reloads.',
      'open-ended',
      'advanced',
      10,
      NULL,
      '',
      'Some of the main features of Redux DevTools are below,

     1. Lets you inspect every state and action payload.
     2. Lets you go back in time by _cancelling_ actions.
     3. If you change the reducer code, each _staged_ action will be re-evaluated.
     4. If the reducers throw, you will see during which action this happened, and what the error was.
     5. With `persistState()` store enhancer, you can persist debug sessions across page reloads.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'state-management', 'advanced'],
      '{"source":"reference.md","section":"React Redux","originalNum":128}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.311Z',
      '2025-11-18T18:46:59.311Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What are Redux selectors and why use them?',
      '<pre><code>     const getUserData = (state) =&gt; state.user.data;</code></pre>

_Selectors_ are functions that take Redux state as an argument and return some data to pass to the component.

     For example, to get user details from the state:


     These selectors have two main benefits,

     1. The selector can compute derived data, allowing Redux to store the minimal possible state
     2. The selector is not recomputed unless one of its arguments changes',
      'open-ended',
      'advanced',
      10,
      NULL,
      '',
      '_Selectors_ are functions that take Redux state as an argument and return some data to pass to the component.

     For example, to get user details from the state:


     These selectors have two main benefits,

     1. The selector can compute derived data, allowing Redux to store the minimal possible state
     2. The selector is not recomputed unless one of its arguments changes',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'state-management', 'advanced'],
      '{"source":"reference.md","section":"React Redux","originalNum":129}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.311Z',
      '2025-11-18T18:46:59.311Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What is Redux Form?',
      '_Redux Form_ works with React and Redux to enable a form in React to use Redux to store all of its state. Redux Form can be used with raw HTML5 inputs, but it also works very well with common UI frameworks like Material UI, React Widgets and React Bootstrap.',
      'open-ended',
      'advanced',
      10,
      NULL,
      '',
      '_Redux Form_ works with React and Redux to enable a form in React to use Redux to store all of its state. Redux Form can be used with raw HTML5 inputs, but it also works very well with common UI frameworks like Material UI, React Widgets and React Bootstrap.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'state-management', 'advanced'],
      '{"source":"reference.md","section":"React Redux","originalNum":130}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.311Z',
      '2025-11-18T18:46:59.311Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What are the main features of Redux Form?',
      'Some of the main features of Redux Form are:

     1. Field values persistence via Redux store.
     2. Validation (sync/async) and submission.
     3. Formatting, parsing and normalization of field values.',
      'open-ended',
      'advanced',
      10,
      NULL,
      '',
      'Some of the main features of Redux Form are:

     1. Field values persistence via Redux store.
     2. Validation (sync/async) and submission.
     3. Formatting, parsing and normalization of field values.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'state-management', 'advanced'],
      '{"source":"reference.md","section":"React Redux","originalNum":131}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.311Z',
      '2025-11-18T18:46:59.311Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'How to add multiple middlewares to Redux?',
      '<pre><code>     import { createStore, applyMiddleware } from &quot;redux&quot;;
     const createStoreWithMiddleware = applyMiddleware(
       ReduxThunk,
       logger
     )(createStore);</code></pre>

You can use `applyMiddleware()`.

     For example, you can add `redux-thunk` and `logger` passing them as arguments to `applyMiddleware()`:',
      'open-ended',
      'advanced',
      10,
      NULL,
      '',
      'You can use `applyMiddleware()`.

     For example, you can add `redux-thunk` and `logger` passing them as arguments to `applyMiddleware()`:',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'state-management', 'advanced'],
      '{"source":"reference.md","section":"React Redux","originalNum":132}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.311Z',
      '2025-11-18T18:46:59.311Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'How to set initial state in Redux?',
      '<pre><code>     const rootReducer = combineReducers({
       todos: todos,
       visibilityFilter: visibilityFilter,
     });

     const initialState = {
       todos: [{ id: 123, name: &quot;example&quot;, completed: false }],
     };

     const store = createStore(rootReducer, initialState);</code></pre>

You need to pass initial state as second argument to createStore:',
      'open-ended',
      'advanced',
      10,
      NULL,
      '',
      'You need to pass initial state as second argument to createStore:',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'state-management', 'advanced'],
      '{"source":"reference.md","section":"React Redux","originalNum":133}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.311Z',
      '2025-11-18T18:46:59.311Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'How Relay is different from Redux?',
      'Relay is similar to Redux in that they both use a single store. The main difference is that relay only manages state originated from the server, and all access to the state is used via _GraphQL_ queries (for reading data) and mutations (for changing data). Relay caches the data for you and optimizes data fetching for you, by fetching only changed data and nothing more.',
      'open-ended',
      'advanced',
      10,
      NULL,
      '',
      'Relay is similar to Redux in that they both use a single store. The main difference is that relay only manages state originated from the server, and all access to the state is used via _GraphQL_ queries (for reading data) and mutations (for changing data). Relay caches the data for you and optimizes data fetching for you, by fetching only changed data and nothing more.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'state-management', 'advanced'],
      '{"source":"reference.md","section":"React Redux","originalNum":134}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.311Z',
      '2025-11-18T18:46:59.311Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What is an action in Redux?',
      '<pre><code>     {
       type: ADD_TODO,
       text: &#039;Add todo item&#039;
     }</code></pre>

_Actions_ are plain JavaScript objects or payloads of information that send data from your application to your store. They are the only source of information for the store. Actions must have a type property that indicates the type of action being performed.

     For example, let''s take an action which represents adding a new todo item:',
      'open-ended',
      'advanced',
      10,
      NULL,
      '',
      '_Actions_ are plain JavaScript objects or payloads of information that send data from your application to your store. They are the only source of information for the store. Actions must have a type property that indicates the type of action being performed.

     For example, let''s take an action which represents adding a new todo item:',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'state-management', 'advanced'],
      '{"source":"reference.md","section":"React Redux","originalNum":135}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.311Z',
      '2025-11-18T18:46:59.311Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What is the difference between React Native and React?',
      '**React** is a JavaScript library, supporting both front end web and being run on the server, for building user interfaces and web applications.

     **React Native** is a mobile framework that compiles to native app components, allowing you to build native mobile applications (iOS, Android, and Windows) in JavaScript that allows you to use React to build your components, and implements React under the hood.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      '**React** is a JavaScript library, supporting both front end web and being run on the server, for building user interfaces and web applications.

     **React Native** is a mobile framework that compiles to native app components, allowing you to build native mobile applications (iOS, Android, and Windows) in JavaScript that allows you to use React to build your components, and implements React under the hood.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'react-native', 'intermediate'],
      '{"source":"reference.md","section":"React Native","originalNum":136}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.311Z',
      '2025-11-18T18:46:59.311Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'How to test React Native apps?',
      'React Native can be tested only in mobile simulators like iOS and Android. You can run the app in your mobile using expo app (https://expo.io) Where it syncs using QR code, your mobile and computer should be in same wireless network.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'React Native can be tested only in mobile simulators like iOS and Android. You can run the app in your mobile using expo app (https://expo.io) Where it syncs using QR code, your mobile and computer should be in same wireless network.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'react-native', 'intermediate'],
      '{"source":"reference.md","section":"React Native","originalNum":137}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.311Z',
      '2025-11-18T18:46:59.311Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'How to do logging in React Native?',
      '<pre><code>     $ react-native log-ios
     $ react-native log-android</code></pre>

You can use `console.log`, `console.warn`, etc. As of React Native v0.29 you can simply run the following to see logs in the console:',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'You can use `console.log`, `console.warn`, etc. As of React Native v0.29 you can simply run the following to see logs in the console:',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'react-native', 'intermediate'],
      '{"source":"reference.md","section":"React Native","originalNum":138}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.311Z',
      '2025-11-18T18:46:59.311Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'How to debug your React Native?',
      'Follow the below steps to debug React Native app:

     1. Run your application in the iOS simulator.
     2. Press `Command + D` and a webpage should open up at `http://localhost:8081/debugger-ui`.
     3. Enable _Pause On Caught Exceptions_ for a better debugging experience.
     4. Press `Command + Option + I` to open the Chrome Developer tools, or open it via `View` -> `Developer` -> `Developer Tools`.
     5. You should now be able to debug as you normally would.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'Follow the below steps to debug React Native app:

     1. Run your application in the iOS simulator.
     2. Press `Command + D` and a webpage should open up at `http://localhost:8081/debugger-ui`.
     3. Enable _Pause On Caught Exceptions_ for a better debugging experience.
     4. Press `Command + Option + I` to open the Chrome Developer tools, or open it via `View` -> `Developer` -> `Developer Tools`.
     5. You should now be able to debug as you normally would.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'react-native', 'intermediate'],
      '{"source":"reference.md","section":"React Native","originalNum":139}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.311Z',
      '2025-11-18T18:46:59.311Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What is reselect and how it works?',
      '_Reselect_ is a **selector library** (for Redux) which uses _memoization_ concept. It was originally written to compute derived data from Redux-like applications state, but it can''t be tied to any architecture or library.

     Reselect keeps a copy of the last inputs/outputs of the last call, and recomputes the result only if one of the inputs changes. If the same inputs are provided twice in a row, Reselect returns the cached output. It''s memoization and cache are fully customizable.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      '_Reselect_ is a **selector library** (for Redux) which uses _memoization_ concept. It was originally written to compute derived data from Redux-like applications state, but it can''t be tied to any architecture or library.

     Reselect keeps a copy of the last inputs/outputs of the last call, and recomputes the result only if one of the inputs changes. If the same inputs are provided twice in a row, Reselect returns the cached output. It''s memoization and cache are fully customizable.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'integration', 'intermediate'],
      '{"source":"reference.md","section":"React supported libraries & Integration","originalNum":140}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.311Z',
      '2025-11-18T18:46:59.311Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What is Flow?',
      '_Flow_ is a _static type checker_ designed to find type errors in JavaScript. Flow types can express much more fine-grained distinctions than traditional type systems. For example, Flow helps you catch errors involving `null`, unlike most type systems.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      '_Flow_ is a _static type checker_ designed to find type errors in JavaScript. Flow types can express much more fine-grained distinctions than traditional type systems. For example, Flow helps you catch errors involving `null`, unlike most type systems.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'integration', 'intermediate'],
      '{"source":"reference.md","section":"React supported libraries & Integration","originalNum":141}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.311Z',
      '2025-11-18T18:46:59.311Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What is the difference between Flow and PropTypes?',
      'Flow is a _static analysis tool_ (static checker) which uses a superset of the language, allowing you to add type annotations to all of your code and catch an entire class of bugs at compile time.

     PropTypes is a _basic type checker_ (runtime checker) which has been patched onto React. It can''t check anything other than the types of the props being passed to a given component. If you want more flexible typechecking for your entire project Flow/TypeScript are appropriate choices.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'Flow is a _static analysis tool_ (static checker) which uses a superset of the language, allowing you to add type annotations to all of your code and catch an entire class of bugs at compile time.

     PropTypes is a _basic type checker_ (runtime checker) which has been patched onto React. It can''t check anything other than the types of the props being passed to a given component. If you want more flexible typechecking for your entire project Flow/TypeScript are appropriate choices.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'integration', 'intermediate'],
      '{"source":"reference.md","section":"React supported libraries & Integration","originalNum":142}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.311Z',
      '2025-11-18T18:46:59.311Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'How to use Font Awesome icons in React?',
      '<pre><code>        function MyComponent {
          return &lt;div&gt;&lt;i className={&#039;fa fa-spinner&#039;} /&gt;&lt;/div&gt;
        }</code></pre>

The below steps followed to include Font Awesome in React:

     1. Install `font-awesome`:


     2. Import `font-awesome` in your `index.js` file:


     3. Add Font Awesome classes in `className`:',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'The below steps followed to include Font Awesome in React:

     1. Install `font-awesome`:


     2. Import `font-awesome` in your `index.js` file:


     3. Add Font Awesome classes in `className`:',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'integration', 'intermediate'],
      '{"source":"reference.md","section":"React supported libraries & Integration","originalNum":143}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.311Z',
      '2025-11-18T18:46:59.311Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What is React Dev Tools?',
      '_React Developer Tools_ let you inspect the component hierarchy, including component props and state. It exists both as a browser extension (for Chrome and Firefox), and as a standalone app (works with other environments including Safari, IE, and React Native).

     The official extensions available for different browsers or environments.

     1. **Chrome extension**
     2. **Firefox extension**
     3. **Standalone app** (Safari, React Native, etc)',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      '_React Developer Tools_ let you inspect the component hierarchy, including component props and state. It exists both as a browser extension (for Chrome and Firefox), and as a standalone app (works with other environments including Safari, IE, and React Native).

     The official extensions available for different browsers or environments.

     1. **Chrome extension**
     2. **Firefox extension**
     3. **Standalone app** (Safari, React Native, etc)',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'integration', 'intermediate'],
      '{"source":"reference.md","section":"React supported libraries & Integration","originalNum":144}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.311Z',
      '2025-11-18T18:46:59.311Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'Why is DevTools not loading in Chrome for local files?',
      'If you opened a local HTML file in your browser (`file://...`) then you must first open _Chrome Extensions_ and check `Allow access to file URLs`.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'If you opened a local HTML file in your browser (`file://...`) then you must first open _Chrome Extensions_ and check `Allow access to file URLs`.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'integration', 'intermediate'],
      '{"source":"reference.md","section":"React supported libraries & Integration","originalNum":145}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.311Z',
      '2025-11-18T18:46:59.311Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'How to use Polymer in React?',
      '<pre><code>        export default function MyComponent {
          return &lt;calendar-element /&gt;;
        }</code></pre>

You need to follow below steps to use Polymer in React,

     1. Create a Polymer element:


     2. Create the Polymer component HTML tag by importing it in a HTML document, e.g. import it in the `index.html` of your React application:


     3. Use that element in the JSX file:',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'You need to follow below steps to use Polymer in React,

     1. Create a Polymer element:


     2. Create the Polymer component HTML tag by importing it in a HTML document, e.g. import it in the `index.html` of your React application:


     3. Use that element in the JSX file:',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'integration', 'intermediate'],
      '{"source":"reference.md","section":"React supported libraries & Integration","originalNum":146}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.311Z',
      '2025-11-18T18:46:59.311Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What are the advantages of React over Vue.js?',
      'React has the following advantages over Vue.js:

     1. Gives more flexibility in large apps developing.
     2. Easier to test.
     3. Suitable for mobile apps creating.
     4. More information and solutions available.

**Note:** The above list of advantages are purely opinionated and it vary based on the professional experience. But they are helpful as base parameters.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'React has the following advantages over Vue.js:

     1. Gives more flexibility in large apps developing.
     2. Easier to test.
     3. Suitable for mobile apps creating.
     4. More information and solutions available.

**Note:** The above list of advantages are purely opinionated and it vary based on the professional experience. But they are helpful as base parameters.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'integration', 'intermediate'],
      '{"source":"reference.md","section":"React supported libraries & Integration","originalNum":147}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.311Z',
      '2025-11-18T18:46:59.311Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What is the difference between React and Angular?',
      'Let''s see the difference between React and Angular in a table format.

     | React                                                                                       | Angular                                                                                                                            |
     | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
     | React is a library and has only the View layer                                              | Angular is a framework and has complete MVC functionality                                                                          |
     | React handles rendering on the server side                                                  | AngularJS renders only on the client side but Angular 2 and above renders on the server side                                       |
     | React uses JSX that looks like HTML in JS which can be confusing                            | Angular follows the template approach for HTML, which makes code shorter and easy to understand                                    |
     | React Native, which is a React type to build mobile applications are faster and more stable | Ionic, Angular''s mobile native app is relatively less stable and slower                                                            |
     | In React, data flows only in one way and hence debugging is easy                            | In Angular, data flows both way i.e it has two-way data binding between children and parent and hence debugging is often difficult |

**Note:** The above list of differences are purely opinionated and it vary based on the professional experience. But they are helpful as base parameters.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'Let''s see the difference between React and Angular in a table format.

     | React                                                                                       | Angular                                                                                                                            |
     | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
     | React is a library and has only the View layer                                              | Angular is a framework and has complete MVC functionality                                                                          |
     | React handles rendering on the server side                                                  | AngularJS renders only on the client side but Angular 2 and above renders on the server side                                       |
     | React uses JSX that looks like HTML in JS which can be confusing                            | Angular follows the template approach for HTML, which makes code shorter and easy to understand                                    |
     | React Native, which is a React type to build mobile applications are faster and more stable | Ionic, Angular''s mobile native app is relatively less stable and slower                                                            |
     | In React, data flows only in one way and hence debugging is easy                            | In Angular, data flows both way i.e it has two-way data binding between children and parent and hence debugging is often difficult |

**Note:** The above list of differences are purely opinionated and it vary based on the professional experience. But they are helpful as base parameters.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'integration', 'intermediate'],
      '{"source":"reference.md","section":"React supported libraries & Integration","originalNum":148}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.311Z',
      '2025-11-18T18:46:59.311Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'Why React tab is not showing up in DevTools?',
      'When the page loads, _React DevTools_ sets a global named `__REACT_DEVTOOLS_GLOBAL_HOOK__`, then React communicates with that hook during initialization. If the website is not using React or if React fails to communicate with DevTools then it won''t show up the tab.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'When the page loads, _React DevTools_ sets a global named `__REACT_DEVTOOLS_GLOBAL_HOOK__`, then React communicates with that hook during initialization. If the website is not using React or if React fails to communicate with DevTools then it won''t show up the tab.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'integration', 'intermediate'],
      '{"source":"reference.md","section":"React supported libraries & Integration","originalNum":149}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.311Z',
      '2025-11-18T18:46:59.311Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What are Styled Components?',
      '`styled-components` is a JavaScript library for styling React applications. It removes the mapping between styles and components, and lets you write actual CSS augmented with JavaScript.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      '`styled-components` is a JavaScript library for styling React applications. It removes the mapping between styles and components, and lets you write actual CSS augmented with JavaScript.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'integration', 'intermediate'],
      '{"source":"reference.md","section":"React supported libraries & Integration","originalNum":150}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.311Z',
      '2025-11-18T18:46:59.311Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    );