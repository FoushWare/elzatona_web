UPDATE questions 
SET options = '[{"id":"a","text":"Component-Based Architecture, Virtual DOM, JSX, Unidirectional Data Flow, Hooks, Context API, Error Boundaries, SSR, Concurrent Mode, Suspense, Server Components","isCorrect":true},{"id":"b","text":"Two-way data binding, templates, dependency injection, directives","isCorrect":false},{"id":"c","text":"Controllers, Models, Views, Services, Filters","isCorrect":false},{"id":"d","text":"Observables, Pipes, Modules, Decorators","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-003';

UPDATE questions 
SET options = '[{"id":"a","text":"A templating engine like Handlebars","isCorrect":false},{"id":"b","text":"Syntactic sugar for React.createElement()","isCorrect":true},{"id":"c","text":"A new programming language","isCorrect":false},{"id":"d","text":"A CSS preprocessor","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-004';

UPDATE questions 
SET options = '[{"id":"a","text":"An element is a function; a component is an object","isCorrect":false},{"id":"b","text":"An element is a plain object describing UI; a component is a function/class that returns elements","isCorrect":true},{"id":"c","text":"Elements are stateful; components are stateless","isCorrect":false},{"id":"d","text":"Components are DOM nodes; elements are virtual","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-005';

UPDATE questions 
SET options = '[{"id":"a","text":"Only with classes","isCorrect":false},{"id":"b","text":"Only with functions","isCorrect":false},{"id":"c","text":"With functions or classes","isCorrect":true},{"id":"d","text":"With HTML templates only","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-006';

UPDATE questions 
SET options = '[{"id":"a","text":"Always use class components for performance","isCorrect":false},{"id":"b","text":"Use class components only for Error Boundaries or legacy code","isCorrect":true},{"id":"c","text":"Class components are required for all stateful logic","isCorrect":false},{"id":"d","text":"Function components cannot use props","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-007';

UPDATE questions 
SET options = '[{"id":"a","text":"Components that never re-render","isCorrect":false},{"id":"b","text":"Components that render the same output for the same props/state and avoid unnecessary re-renders","isCorrect":true},{"id":"c","text":"Components that only accept string props","isCorrect":false},{"id":"d","text":"Components that must be written in TypeScript","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-008';

UPDATE questions 
SET options = '[{"id":"a","text":"Immutable data passed from parent components","isCorrect":false},{"id":"b","text":"Mutable data that triggers re-renders when changed","isCorrect":true},{"id":"c","text":"Static configuration for a component","isCorrect":false},{"id":"d","text":"A global store like Redux","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-009';

UPDATE questions 
SET options = '[{"id":"a","text":"Mutable data managed by the component itself","isCorrect":false},{"id":"b","text":"Read-only inputs passed from parent to child","isCorrect":true},{"id":"c","text":"Global variables accessible anywhere","isCorrect":false},{"id":"d","text":"Event handlers only","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-010';

UPDATE questions 
SET options = '[{"id":"a","text":"State is immutable; props are mutable","isCorrect":false},{"id":"b","text":"State is managed internally and mutable; props are passed from parent and read-only","isCorrect":true},{"id":"c","text":"Props can be changed with this.setProps()","isCorrect":false},{"id":"d","text":"State and props are the same thing","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-011';

UPDATE questions 
SET options = '[{"id":"a","text":"React uses lowercase event names like HTML","isCorrect":false},{"id":"b","text":"React uses camelCase, requires explicit preventDefault(), and passes function references","isCorrect":true},{"id":"c","text":"React uses strings for event handlers like HTML","isCorrect":false},{"id":"d","text":"React doesn''t support event handling","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-012';

UPDATE questions 
SET options = '[{"id":"a","text":"Native browser events","isCorrect":false},{"id":"b","text":"React''s cross-browser wrapper around native events","isCorrect":true},{"id":"c","text":"Custom events created with Event constructor","isCorrect":false},{"id":"d","text":"Events that only work in development mode","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-013';

UPDATE questions 
SET options = '[{"id":"a","text":"Only if/else blocks outside JSX","isCorrect":false},{"id":"b","text":"Ternary operators and && expressions inside JSX","isCorrect":true},{"id":"c","text":"Switch statements only","isCorrect":false},{"id":"d","text":"No conditional rendering in React","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-014';

UPDATE questions 
SET options = '[{"id":"a","text":"Keys are only for styling","isCorrect":false},{"id":"b","text":"Keys help React identify changes in lists for efficient updates and state preservation","isCorrect":true},{"id":"c","text":"Keys must be globally unique across the entire app","isCorrect":false},{"id":"d","text":"Keys are optional and have no performance impact","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-015';

UPDATE questions 
SET options = '[{"id":"a","text":"A real browser DOM node","isCorrect":false},{"id":"b","text":"An in-memory representation of the real DOM for efficient updates","isCorrect":true},{"id":"c","text":"A CSS rendering engine","isCorrect":false},{"id":"d","text":"A database for storing component state","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-016';

UPDATE questions 
SET options = '[{"id":"a","text":"It replaces the entire real DOM on every change","isCorrect":false},{"id":"b","text":"It creates a new Virtual DOM, diffs it with the old one, and updates only changed real DOM nodes","isCorrect":true},{"id":"c","text":"It uses direct DOM manipulation without any abstraction","isCorrect":false},{"id":"d","text":"It only works in development mode","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-017';

UPDATE questions 
SET options = '[{"id":"a","text":"They are the same thing","isCorrect":false},{"id":"b","text":"Shadow DOM is for Web Components encapsulation; Virtual DOM is for React''s efficient rendering","isCorrect":true},{"id":"c","text":"Virtual DOM is part of the browser; Shadow DOM is a React feature","isCorrect":false},{"id":"d","text":"Both are managed by the browser","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-018';

UPDATE questions 
SET options = '[{"id":"a","text":"A new CSS-in-JS library","isCorrect":false},{"id":"b","text":"React''s new reconciliation engine for async rendering and prioritization","isCorrect":true},{"id":"c","text":"A state management library like Redux","isCorrect":false},{"id":"d","text":"A testing utility","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-019';

UPDATE questions 
SET options = '[{"id":"a","text":"To replace JSX with templates","isCorrect":false},{"id":"b","text":"To enable incremental, interruptible, and prioritized rendering","isCorrect":true},{"id":"c","text":"To remove the need for components","isCorrect":false},{"id":"d","text":"To make React work only on the server","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-020';

UPDATE questions 
SET options = '[{"id":"a","text":"Form elements that manage their own state via the DOM","isCorrect":false},{"id":"b","text":"Form elements whose value is controlled by React state","isCorrect":true},{"id":"c","text":"Components that don''t re-render","isCorrect":false},{"id":"d","text":"Components that can''t use hooks","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-021';

UPDATE questions 
SET options = '[{"id":"a","text":"Components that use React state for everything","isCorrect":false},{"id":"b","text":"Form elements that manage their own state in the DOM and use refs to access values","isCorrect":true},{"id":"c","text":"Components that are not rendered","isCorrect":false},{"id":"d","text":"Components that can''t have children","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-022';

UPDATE questions 
SET options = '[{"id":"a","text":"Both create new elements from scratch","isCorrect":false},{"id":"b","text":"createElement creates new elements; cloneElement clones existing elements and overrides props","isCorrect":true},{"id":"c","text":"cloneElement is for class components only","isCorrect":false},{"id":"d","text":"createElement is deprecated","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-023';

UPDATE questions 
SET options = '[{"id":"a","text":"Moving state to a child component","isCorrect":false},{"id":"b","text":"Moving shared state to the closest common ancestor","isCorrect":true},{"id":"c","text":"Storing state in localStorage","isCorrect":false},{"id":"d","text":"Using global variables for state","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-024';

UPDATE questions 
SET options = '[{"id":"a","text":"Components that are higher in the DOM tree","isCorrect":false},{"id":"b","text":"Functions that take a component and return a new enhanced component","isCorrect":true},{"id":"c","text":"Components with more than 100 lines of code","isCorrect":false},{"id":"d","text":"Components that must be class-based","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-025';

UPDATE questions 
SET options = '[{"id":"a","text":"Single store, mutable state, async reducers","isCorrect":false},{"id":"b","text":"Multiple stores, read-only state, impure reducers","isCorrect":false},{"id":"c","text":"Single source of truth, read-only state, pure reducer functions","isCorrect":true},{"id":"d","text":"Global state, two-way binding, side-effectful reducers","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q104';

UPDATE questions 
SET options = '[{"id":"a","text":"Redux allows mutable state by default","isCorrect":false},{"id":"b","text":"Redux requires immutability, careful package selection, and has less mature static type support","isCorrect":true},{"id":"c","text":"Flux is more minimal than Redux","isCorrect":false},{"id":"d","text":"Redux uses two-way data binding","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q105';

UPDATE questions 
SET options = '[{"id":"a","text":"`mapStateToProps` dispatches actions; `mapDispatchToProps` reads state","isCorrect":false},{"id":"b","text":"`mapStateToProps` reads state; `mapDispatchToProps` dispatches actions","isCorrect":true},{"id":"c","text":"Both are used only for async logic","isCorrect":false},{"id":"d","text":"They are identical in functionality","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q106';

UPDATE questions 
SET options = '[{"id":"a","text":"Easy undo, cheap DOM updates, no circular dependencies","isCorrect":false},{"id":"b","text":"Expensive DOM manipulation, circular dependencies, no easy undo","isCorrect":true},{"id":"c","text":"Built-in time-travel debugging","isCorrect":false},{"id":"d","text":"Unidirectional data flow by default","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q109';

UPDATE questions 
SET options = '[{"id":"a","text":"Context provides middleware and time-travel debugging","isCorrect":false},{"id":"b","text":"Redux is simpler and built into React","isCorrect":false},{"id":"c","text":"Context is for simple prop drilling; Redux is a full state management library with advanced tooling","isCorrect":true},{"id":"d","text":"They are functionally identical","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q112';

UPDATE questions 
SET options = '[{"id":"a","text":"Access `this.context.store` directly","isCorrect":false},{"id":"b","text":"Use `connect()` from `react-redux`","isCorrect":true},{"id":"c","text":"Import the store and call `store.getState()` in render","isCorrect":false},{"id":"d","text":"Use `useContext(StoreContext)` always","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q116';

UPDATE questions 
SET options = '[{"id":"a","text":"Components handle logic; containers render UI","isCorrect":false},{"id":"b","text":"Components are presentational; containers are connected to Redux","isCorrect":true},{"id":"c","text":"They are the same","isCorrect":false},{"id":"d","text":"Containers cannot have children","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q117';

UPDATE questions 
SET options = '[{"id":"a","text":"They increase bundle size unnecessarily","isCorrect":false},{"id":"b","text":"They prevent typos and enable better tooling","isCorrect":true},{"id":"c","text":"They are required by the Redux library","isCorrect":false},{"id":"d","text":"They make reducers slower","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q118';

UPDATE questions 
SET options = '[{"id":"a","text":"Only the function form is valid","isCorrect":false},{"id":"b","text":"Function with dispatch, bindActionCreators, or object shorthand","isCorrect":true},{"id":"c","text":"You must always use `bindActionCreators`","isCorrect":false},{"id":"d","text":"Object shorthand doesn’t work with `connect`","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q119';

UPDATE questions 
SET options = '[{"id":"a","text":"All files in one folder","isCorrect":false},{"id":"b","text":"`components/`, `containers/`, `actions/`, `reducers/`, `store/`","isCorrect":true},{"id":"c","text":"Only `src/` and `test/`","isCorrect":false},{"id":"d","text":"No standard structure exists","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q121';

UPDATE questions 
SET options = '[{"id":"a","text":"`call()` dispatches actions; `put()` makes API calls","isCorrect":false},{"id":"b","text":"`call()` invokes functions; `put()` dispatches actions","isCorrect":true},{"id":"c","text":"Both are used only for logging","isCorrect":false},{"id":"d","text":"`put()` is for database queries","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q124';

UPDATE questions 
SET options = '[{"id":"a","text":"Saga uses Promises; Thunk uses Generators","isCorrect":false},{"id":"b","text":"Thunk uses Promises; Saga uses Generators","isCorrect":true},{"id":"c","text":"Both are identical","isCorrect":false},{"id":"d","text":"Saga is deprecated","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q126';

UPDATE questions 
SET options = '[{"id":"a","text":"Only shows console logs","isCorrect":false},{"id":"b","text":"State inspection, time travel, hot reloading, error tracking, persistence","isCorrect":true},{"id":"c","text":"Replaces the need for unit tests","isCorrect":false},{"id":"d","text":"Only works in production","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q128';

UPDATE questions 
SET options = '[{"id":"a","text":"They directly mutate the Redux state","isCorrect":false},{"id":"b","text":"They compute derived data and memoize results for performance","isCorrect":true},{"id":"c","text":"They replace reducers","isCorrect":false},{"id":"d","text":"They are only for async logic","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q129';

UPDATE questions 
SET options = '[{"id":"a","text":"Only basic input binding","isCorrect":false},{"id":"b","text":"Field persistence, validation, formatting/parsing","isCorrect":true},{"id":"c","text":"Replaces React components","isCorrect":false},{"id":"d","text":"Only works with class components","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q131';

UPDATE questions 
SET options = '[{"id":"a","text":"Relay uses REST APIs","isCorrect":false},{"id":"b","text":"Relay manages only server state via GraphQL; Redux manages all state","isCorrect":true},{"id":"c","text":"Redux requires GraphQL","isCorrect":false},{"id":"d","text":"They are identical","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q134';

UPDATE questions 
SET options = '[{"id":"a","text":"A function that mutates state","isCorrect":false},{"id":"b","text":"A plain object with a `type` property","isCorrect":true},{"id":"c","text":"A class instance","isCorrect":false},{"id":"d","text":"A Promise","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q135';

UPDATE questions 
SET options = '[{"id":"a","text":"React Native uses HTML","isCorrect":false},{"id":"b","text":"React is for web; React Native is for native mobile apps","isCorrect":true},{"id":"c","text":"React Native cannot use JavaScript","isCorrect":false},{"id":"d","text":"They are the same library","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q136';

UPDATE questions 
SET options = '[{"id":"a","text":"Only use Xcode debugger","isCorrect":false},{"id":"b","text":"Use Cmd+D in simulator, then Chrome DevTools at localhost:8081/debugger-ui","isCorrect":true},{"id":"c","text":"Debugging is not supported","isCorrect":false},{"id":"d","text":"Use Firefox only","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q139';

UPDATE questions 
SET options = '[{"id":"a","text":"PropTypes is static; Flow is runtime","isCorrect":false},{"id":"b","text":"Flow is static (compile-time); PropTypes is runtime (only for props)","isCorrect":true},{"id":"c","text":"Both are identical","isCorrect":false},{"id":"d","text":"PropTypes can check entire codebase","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q142';

UPDATE questions 
SET options = '[{"id":"a","text":"A code formatter","isCorrect":false},{"id":"b","text":"A tool to inspect React components, props, and state","isCorrect":true},{"id":"c","text":"Only works with Angular","isCorrect":false},{"id":"d","text":"A testing framework","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q144';

UPDATE questions 
SET options = '[{"id":"a","text":"Vue has better mobile support","isCorrect":false},{"id":"b","text":"React offers more flexibility, easier testing, React Native, and larger ecosystem","isCorrect":true},{"id":"c","text":"Vue is harder to learn","isCorrect":false},{"id":"d","text":"React has no advantages","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q147';

UPDATE questions 
SET options = '[{"id":"a","text":"React is a full framework like Angular","isCorrect":false},{"id":"b","text":"React is a library (View only); Angular is a full framework (MVC)","isCorrect":true},{"id":"c","text":"Angular uses JSX","isCorrect":false},{"id":"d","text":"React has two-way data binding","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q148';

UPDATE questions 
SET options = '[{"id":"a","text":"It replaces reducers","isCorrect":false},{"id":"b","text":"It provides memoized, composable selectors for derived data","isCorrect":true},{"id":"c","text":"It handles async actions","isCorrect":false},{"id":"d","text":"It manages global state outside Redux","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q153';

UPDATE questions 
SET options = '[{"id":"a","text":"You must always wrap in a `<div>`","isCorrect":false},{"id":"b","text":"You can return arrays, strings, and numbers directly","isCorrect":true},{"id":"c","text":"Only objects are allowed","isCorrect":false},{"id":"d","text":"Strings cause hydration errors","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q167';

UPDATE questions 
SET options = '[{"id":"a","text":"Call hooks inside loops and conditions","isCorrect":false},{"id":"b","text":"Call hooks only at top level and from React functions","isCorrect":true},{"id":"c","text":"Hooks can be called from any JavaScript function","isCorrect":false},{"id":"d","text":"Order of hook calls doesn’t matter","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q169';

UPDATE questions 
SET options = '[{"id":"a","text":"Flux uses immutable state; Redux uses mutable state","isCorrect":false},{"id":"b","text":"Flux: multiple mutable stores, dispatcher; Redux: single immutable store, no dispatcher","isCorrect":true},{"id":"c","text":"Redux has multiple dispatchers","isCorrect":false},{"id":"d","text":"They are identical","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q171';

UPDATE questions 
SET options = '[{"id":"a","text":"Requires manual history setup","isCorrect":false},{"id":"b","text":"Component-based, auto history, smaller bundles","isCorrect":true},{"id":"c","text":"Only works with class components","isCorrect":false},{"id":"d","text":"No support for dynamic routes","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q172';

UPDATE questions 
SET options = '[{"id":"a","text":"They catch all errors everywhere","isCorrect":false},{"id":"b","text":"Not in event handlers, async code, SSR, or self-errors","isCorrect":true},{"id":"c","text":"They work in setTimeout callbacks","isCorrect":false},{"id":"d","text":"They catch syntax errors in modules","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q174';

UPDATE questions 
SET options = '[{"id":"a","text":"Only Chrome and Firefox","isCorrect":false},{"id":"b","text":"IE9+ with polyfills","isCorrect":true},{"id":"c","text":"No IE support at all","isCorrect":false},{"id":"d","text":"Requires ES2020","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q180';

UPDATE questions 
SET options = '[{"id":"a","text":"A state management library","isCorrect":false},{"id":"b","text":"A React framework for SSR/SSG with file-based routing and code splitting","isCorrect":true},{"id":"c","text":"A testing framework","isCorrect":false},{"id":"d","text":"Only for static sites","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q185';

UPDATE questions 
SET options = '[{"id":"a","text":"Call it inside a `setTimeout` with 0 delay","isCorrect":false},{"id":"b","text":"Use throttling, debouncing, or requestAnimationFrame","isCorrect":true},{"id":"c","text":"Disable the button permanently","isCorrect":false},{"id":"d","text":"Use `preventDefault()`","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q187';

UPDATE questions 
SET options = '[{"id":"a","text":"Always safe to use index","isCorrect":false},{"id":"b","text":"Only if list is static, no IDs, and never reordered","isCorrect":true},{"id":"c","text":"Index is preferred over IDs","isCorrect":false},{"id":"d","text":"Keys are optional in static lists","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q191';

UPDATE questions 
SET options = '[{"id":"a","text":"Redux Form is the only option","isCorrect":false},{"id":"b","text":"Formik is a popular lightweight form library","isCorrect":true},{"id":"c","text":"HTML forms are sufficient","isCorrect":false},{"id":"d","text":"Forms don’t need libraries","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q193';

UPDATE questions 
SET options = '[{"id":"a","text":"Redux Form is faster","isCorrect":false},{"id":"b","text":"Formik: local state, better perf, smaller size","isCorrect":true},{"id":"c","text":"Redux Form has fewer features","isCorrect":false},{"id":"d","text":"Formik requires Redux","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q194';

UPDATE questions 
SET options = '[{"id":"a","text":"React compares every possible node pair in O(n³) time","isCorrect":false},{"id":"b","text":"Different types rebuild tree; same DOM updates attrs; same component updates props; keys optimize children diffing","isCorrect":true},{"id":"c","text":"Keys are optional and have no performance impact","isCorrect":false},{"id":"d","text":"Component instances are recreated on every render","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q203';

UPDATE questions 
SET options = '[{"id":"a","text":"For all state management","isCorrect":false},{"id":"b","text":"For focus, animations, and third-party DOM integrations","isCorrect":true},{"id":"c","text":"To replace useState","isCorrect":false},{"id":"d","text":"Only in class components","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q204';

UPDATE questions 
SET options = '[{"id":"a","text":"To improve component reusability","isCorrect":false},{"id":"b","text":"To render modals/tooltips outside parent DOM to avoid CSS clipping and z-index issues","isCorrect":true},{"id":"c","text":"To replace Redux","isCorrect":false},{"id":"d","text":"Only for server-side rendering","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q209';

UPDATE questions 
SET options = '[{"id":"a","text":"Real DOM is faster than Virtual DOM","isCorrect":false},{"id":"b","text":"Real DOM updates are slow/expensive; Virtual DOM enables fast, minimal updates","isCorrect":true},{"id":"c","text":"Virtual DOM directly manipulates HTML","isCorrect":false},{"id":"d","text":"They are the same","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q212';

UPDATE questions 
SET options = '[{"id":"a","text":"Only via CDN","isCorrect":false},{"id":"b","text":"CDN, npm install, or React wrappers like react-bootstrap","isCorrect":true},{"id":"c","text":"Bootstrap is built into React","isCorrect":false},{"id":"d","text":"Only with Sass","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q213';

UPDATE questions 
SET options = '[{"id":"a","text":"Only from Angular","isCorrect":false},{"id":"b","text":"From react-future, render props, DisplayScript, Rx, and ReasonReact","isCorrect":true},{"id":"c","text":"Invented from scratch with no prior art","isCorrect":false},{"id":"d","text":"Based on Vue composition API","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q221';

UPDATE questions 
SET options = '[{"id":"a","text":"Only Redux Thunk","isCorrect":false},{"id":"b","text":"Redux Thunk, Redux Saga, Redux Promise","isCorrect":true},{"id":"c","text":"Middleware is not needed for async","isCorrect":false},{"id":"d","text":"Only Redux Saga","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q224';

UPDATE questions 
SET options = '[{"id":"a","text":"Redux uses observables; MobX uses reducers","isCorrect":false},{"id":"b","text":"Redux: single immutable store, explicit; MobX: multiple mutable stores, automatic","isCorrect":true},{"id":"c","text":"They are identical","isCorrect":false},{"id":"d","text":"MobX requires more boilerplate","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q228';

UPDATE questions 
SET options = '[{"id":"a","text":"Slower development","isCorrect":false},{"id":"b","text":"Type safety, IDE support, fewer bugs, better refactoring","isCorrect":true},{"id":"c","text":"Only for backend","isCorrect":false},{"id":"d","text":"Increases bundle size significantly","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q235';

UPDATE questions 
SET options = '[{"id":"a","text":"Requires explicit React import","isCorrect":false},{"id":"b","text":"No React import needed, smaller bundles, simpler learning","isCorrect":true},{"id":"c","text":"Only works with class components","isCorrect":false},{"id":"d","text":"Increases bundle size","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q237';

UPDATE questions 
SET options = '[{"id":"a","text":"Both cause re-renders","isCorrect":false},{"id":"b","text":"useState causes re-renders; useRef does not","isCorrect":true},{"id":"c","text":"useRef is only for DOM elements","isCorrect":false},{"id":"d","text":"useState cannot hold objects","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q241';

UPDATE questions 
SET options = '[{"id":"a","text":"useEffect runs before paint; useLayoutEffect after","isCorrect":false},{"id":"b","text":"useEffect runs after paint; useLayoutEffect runs before paint synchronously","isCorrect":true},{"id":"c","text":"They are identical","isCorrect":false},{"id":"d","text":"useLayoutEffect is deprecated","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q243';

UPDATE questions 
SET options = '[{"id":"a","text":"Functional components can''t use state","isCorrect":false},{"id":"b","text":"Functional use Hooks; Class use lifecycle methods and this","isCorrect":true},{"id":"c","text":"Class components are faster","isCorrect":false},{"id":"d","text":"Functional components can''t receive props","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q244';

UPDATE questions 
SET options = '[{"id":"a","text":"Improves production performance","isCorrect":false},{"id":"b","text":"Detects side effects, unsafe lifecycles, legacy APIs, and missing cleanup","isCorrect":true},{"id":"c","text":"Reduces bundle size","isCorrect":false},{"id":"d","text":"Only for class components","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q246';

UPDATE questions 
SET options = '[{"id":"a","text":"Tags don''t need to be closed","isCorrect":false},{"id":"b","text":"Single root, closed tags, camelCase attributes","isCorrect":true},{"id":"c","text":"Use class instead of className","isCorrect":false},{"id":"d","text":"Multiple roots are allowed","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q248';

UPDATE questions 
SET options = '[{"id":"a","text":"Allows faster direct DOM manipulation","isCorrect":false},{"id":"b","text":"Enables predictable re-renders, debugging, and performance optimizations","isCorrect":true},{"id":"c","text":"Reduces bundle size","isCorrect":false},{"id":"d","text":"Makes code more verbose","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q260';

UPDATE questions 
SET options = '[{"id":"a","text":"Use `push` and `splice` for performance","isCorrect":false},{"id":"b","text":"Preferred: concat/spread/filter/map; Non-preferred: push/pop/splice/sort","isCorrect":true},{"id":"c","text":"All array methods are safe","isCorrect":false},{"id":"d","text":"Only `slice` is safe","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q261';

UPDATE questions 
SET options = '[{"id":"a","text":"Reducers can make API calls","isCorrect":false},{"id":"b","text":"Reducers must be pure; actions should represent single user intents","isCorrect":true},{"id":"c","text":"Each state field needs its own action","isCorrect":false},{"id":"d","text":"Reducers should mutate state for performance","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q264';

UPDATE questions 
SET options = '[{"id":"a","text":"useReducer is only for Redux","isCorrect":false},{"id":"b","text":"useState: simple state; useReducer: complex state with centralized logic","isCorrect":true},{"id":"c","text":"useState cannot hold objects","isCorrect":false},{"id":"d","text":"useReducer causes more re-renders","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q266';

UPDATE questions 
SET options = '[{"id":"a","text":"Only for passing props to immediate children","isCorrect":false},{"id":"b","text":"Theme, auth, i18n, modals, and global state with useReducer","isCorrect":true},{"id":"c","text":"Replacing all useState calls","isCorrect":false},{"id":"d","text":"Only for class components","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q268';

UPDATE questions 
SET options = '[{"id":"a","text":"Use client components for all data fetching","isCorrect":false},{"id":"b","text":"Client: interactivity/state; Server: data fetching/sensitive logic","isCorrect":true},{"id":"c","text":"Server components can use useState","isCorrect":false},{"id":"d","text":"Client components are always faster","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q269';

UPDATE questions 
SET options = '[{"id":"a","text":"Only strings and numbers","isCorrect":false},{"id":"b","text":"Any type, but objects/arrays must be immutable","isCorrect":true},{"id":"c","text":"Functions are not allowed","isCorrect":false},{"id":"d","text":"Only primitives","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q275';

UPDATE questions 
SET options = '[{"id":"a","text":"Effect always runs once regardless of deps","isCorrect":false},{"id":"b","text":"[]: once; [deps]: on change; none: every render","isCorrect":true},{"id":"c","text":"Deps are deep-comparison","isCorrect":false},{"id":"d","text":"Effect runs before render","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q287';

UPDATE questions 
SET options = '[{"id":"a","text":"Data fetching and logging","isCorrect":false},{"id":"b","text":"Layout measurements, preventing flicker, synchronous DOM updates","isCorrect":true},{"id":"c","text":"Replacing all useEffect calls","isCorrect":false},{"id":"d","text":"Only for server-side rendering","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q292';

UPDATE questions 
SET options = '[{"id":"a","text":"Managing application state","isCorrect":false},{"id":"b","text":"Focus, scroll, measurements, media, and third-party libraries","isCorrect":true},{"id":"c","text":"Replacing useState","isCorrect":false},{"id":"d","text":"Only for class components","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q300';

UPDATE questions 
SET options = '[{"id":"a","text":"For all state management","isCorrect":false},{"id":"b","text":"For modals, inputs, scroll containers in reusable libraries","isCorrect":true},{"id":"c","text":"To replace useEffect","isCorrect":false},{"id":"d","text":"Only in class components","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q302';

UPDATE questions 
SET options = '[{"id":"a","text":"useMemo is for functions; useCallback for values","isCorrect":false},{"id":"b","text":"useMemo memoizes values; useCallback memoizes functions","isCorrect":true},{"id":"c","text":"They are identical","isCorrect":false},{"id":"d","text":"useCallback prevents re-renders of parent","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q304';

UPDATE questions 
SET options = '[{"id":"a","text":"It passes data from parent to child as a string","isCorrect":false},{"id":"b","text":"It allows components to receive and render nested content between their tags","isCorrect":true},{"id":"c","text":"It is only used for passing numbers","isCorrect":false},{"id":"d","text":"It is an alias for `props.data`","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-026';

UPDATE questions 
SET options = '[{"id":"a","text":"Use `//` inside JSX tags","isCorrect":false},{"id":"b","text":"Use `{/* comment */}` for JSX comments","isCorrect":true},{"id":"c","text":"Comments are not allowed in React","isCorrect":false},{"id":"d","text":"Use HTML-style `<!-- -->` comments","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-027';

UPDATE questions 
SET options = '[{"id":"a","text":"The process of converting JSX to JavaScript","isCorrect":false},{"id":"b","text":"React''s algorithm to compare Virtual DOM trees and update only changed real DOM nodes","isCorrect":true},{"id":"c","text":"A method to bundle React components","isCorrect":false},{"id":"d","text":"The act of mounting a component for the first time","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-028';

UPDATE questions 
SET options = '[{"id":"a","text":"Because `class` is a reserved keyword in JavaScript","isCorrect":true},{"id":"b","text":"To make CSS harder to write","isCorrect":false},{"id":"c","text":"Because HTML doesn’t support `class`","isCorrect":false},{"id":"d","text":"It’s a typo that became standard","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-030';

UPDATE questions 
SET options = '[{"id":"a","text":"Special components that render nothing","isCorrect":false},{"id":"b","text":"A way to group multiple elements without adding extra DOM nodes","isCorrect":true},{"id":"c","text":"Components that only render on mobile","isCorrect":false},{"id":"d","text":"A type of React error boundary","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-031';

UPDATE questions 
SET options = '[{"id":"a","text":"They are slower but easier to debug","isCorrect":false},{"id":"b","text":"They prevent CSS layout issues, improve performance, and reduce DOM clutter","isCorrect":true},{"id":"c","text":"They automatically apply styles","isCorrect":false},{"id":"d","text":"They are required for server-side rendering","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-032';

UPDATE questions 
SET options = '[{"id":"a","text":"A way to share state between unrelated components","isCorrect":false},{"id":"b","text":"A feature to render children into a different DOM node while preserving React behavior","isCorrect":true},{"id":"c","text":"A method to lazy-load components","isCorrect":false},{"id":"d","text":"An alternative to React Context","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-033';

UPDATE questions 
SET options = '[{"id":"a","text":"Components that cannot receive props","isCorrect":false},{"id":"b","text":"Components that don’t manage internal state and render based only on props","isCorrect":true},{"id":"c","text":"Components that are always class-based","isCorrect":false},{"id":"d","text":"Components that throw errors","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-034';

UPDATE questions 
SET options = '[{"id":"a","text":"Components that never re-render","isCorrect":false},{"id":"b","text":"Components that manage internal state and re-render when it changes","isCorrect":true},{"id":"c","text":"Components that only accept static props","isCorrect":false},{"id":"d","text":"Components that are deprecated","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-035';

UPDATE questions 
SET options = '[{"id":"a","text":"Use `PropTypes` from the `prop-types` package to define expected prop types and required props","isCorrect":true},{"id":"b","text":"PropTypes work in production mode for security","isCorrect":false},{"id":"c","text":"Validation is automatic and cannot be customized","isCorrect":false},{"id":"d","text":"PropTypes are built into React since v16","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-036';

UPDATE questions 
SET options = '[{"id":"a","text":"Virtual DOM, JSX, SSR, easy integration, and testability","isCorrect":true},{"id":"b","text":"Two-way data binding and full framework features","isCorrect":false},{"id":"c","text":"Built-in state management and routing","isCorrect":false},{"id":"d","text":"No learning curve for beginners","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-037';

UPDATE questions 
SET options = '[{"id":"a","text":"It’s a full framework with built-in routing and state management","isCorrect":false},{"id":"b","text":"It’s just a view library, has a learning curve, and can create boilerplate","isCorrect":true},{"id":"c","text":"It doesn’t support server-side rendering","isCorrect":false},{"id":"d","text":"It’s slower than vanilla JS","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-038';

UPDATE questions 
SET options = '[{"id":"a","text":"PropTypes for small apps; TypeScript/Flow for large codebases","isCorrect":true},{"id":"b","text":"Only PropTypes should be used","isCorrect":false},{"id":"c","text":"TypeScript is not compatible with React","isCorrect":false},{"id":"d","text":"Static typing is unnecessary in React","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-039';

UPDATE questions 
SET options = '[{"id":"a","text":"It contains React’s core logic like useState and useEffect","isCorrect":false},{"id":"b","text":"It provides DOM-specific methods like render(), hydrate(), and createPortal()","isCorrect":true},{"id":"c","text":"It’s used for server-side logic only","isCorrect":false},{"id":"d","text":"It’s deprecated in React 18","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-040';

UPDATE questions 
SET options = '[{"id":"a","text":"A tool for client-side hydration only","isCorrect":false},{"id":"b","text":"An object with methods like renderToString() for server-side rendering","isCorrect":true},{"id":"c","text":"A replacement for react-dom in the browser","isCorrect":false},{"id":"d","text":"Used for testing components","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-041';

UPDATE questions 
SET options = '[{"id":"a","text":"Use `innerHTML` directly on JSX elements","isCorrect":false},{"id":"b","text":"Use `dangerouslySetInnerHTML={{ __html: string }}` with caution","isCorrect":true},{"id":"c","text":"It’s not possible to render HTML in React","isCorrect":false},{"id":"d","text":"Use `React.renderHTML()`","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-042';

UPDATE questions 
SET options = '[{"id":"a","text":"Use CSS strings like `style=\"color: blue\"`","isCorrect":false},{"id":"b","text":"Use camelCased JavaScript objects: `style={{ backgroundColor: ''blue'' }}`","isCorrect":true},{"id":"c","text":"Only external CSS files are allowed","isCorrect":false},{"id":"d","text":"Styles must be defined in a separate CSS module","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-043';

UPDATE questions 
SET options = '[{"id":"a","text":"Event names are lowercase and handlers are strings","isCorrect":false},{"id":"b","text":"Event names use camelCase and handlers are functions","isCorrect":true},{"id":"c","text":"Events are handled the same as in HTML","isCorrect":false},{"id":"d","text":"React doesn’t support events","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-044';

UPDATE questions 
SET options = '[{"id":"a","text":"It’s always safe and recommended","isCorrect":false},{"id":"b","text":"It can cause bugs with reordering or filtering; use stable IDs instead","isCorrect":true},{"id":"c","text":"Keys are optional and have no impact","isCorrect":false},{"id":"d","text":"Indexes improve performance","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-045';

UPDATE questions 
SET options = '[{"id":"a","text":"Use `if` statements directly in JSX","isCorrect":false},{"id":"b","text":"Use `&&` for truthy checks and ternary for if-else logic","isCorrect":true},{"id":"c","text":"Conditional rendering is not supported","isCorrect":false},{"id":"d","text":"Always use `switch` statements","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-046';

UPDATE questions 
SET options = '[{"id":"a","text":"Spreading props is always safe","isCorrect":false},{"id":"b","text":"It can add invalid HTML attributes; destructure to avoid this","isCorrect":true},{"id":"c","text":"DOM elements ignore extra props","isCorrect":false},{"id":"d","text":"You must spread all props for components to work","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-047';

UPDATE questions 
SET options = '[{"id":"a","text":"Use `React.memo()` to prevent unnecessary re-renders when props are unchanged","isCorrect":true},{"id":"b","text":"Memoization is only for class components","isCorrect":false},{"id":"c","text":"All components are memoized by default","isCorrect":false},{"id":"d","text":"Use `useMemo` on the component itself","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-048';

UPDATE questions 
SET options = '[{"id":"a","text":"Render on server with `ReactDOMServer.renderToString()` and hydrate on client","isCorrect":true},{"id":"b","text":"SSR is not supported in React","isCorrect":false},{"id":"c","text":"Use `ReactDOM.render()` on the server","isCorrect":false},{"id":"d","text":"SSR requires a special build of React","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-049';

UPDATE questions 
SET options = '[{"id":"a","text":"Set `NODE_ENV=production` using Webpack’s DefinePlugin","isCorrect":true},{"id":"b","text":"Production mode is enabled by default","isCorrect":false},{"id":"c","text":"Remove all console.log statements manually","isCorrect":false},{"id":"d","text":"Use `--prod` flag in the browser","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-050';

UPDATE questions 
SET options = '[{"id":"a","text":"Yes, Hooks completely replace them and are always better","isCorrect":false},{"id":"b","text":"Hooks provide a simpler way to share logic and reduce nesting, but render props and HOCs are still valid patterns","isCorrect":true},{"id":"c","text":"No, Hooks cannot replace render props or HOCs","isCorrect":false},{"id":"d","text":"Hooks only work with class components","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-051';

UPDATE questions 
SET options = '[{"id":"a","text":"A component that toggles between light and dark mode","isCorrect":false},{"id":"b","text":"A component that renders one of many components based on a prop using an object map","isCorrect":true},{"id":"c","text":"A component that switches between class and function syntax","isCorrect":false},{"id":"d","text":"A built-in React component for routing","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-052';

UPDATE questions 
SET options = '[{"id":"a","text":"Mixins are the recommended way to share logic in modern React","isCorrect":false},{"id":"b","text":"Mixins are deprecated and should be replaced with HOCs, render props, or Hooks","isCorrect":true},{"id":"c","text":"Mixins work well with function components","isCorrect":false},{"id":"d","text":"Mixins are required for performance optimization","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-053';

UPDATE questions 
SET options = '[{"id":"a","text":"React only supports mouse and touch events separately","isCorrect":false},{"id":"b","text":"React supports Pointer Events like onPointerDown, onPointerMove, etc., for unified input handling","isCorrect":true},{"id":"c","text":"Pointer Events are not supported in React","isCorrect":false},{"id":"d","text":"Pointer Events only work in React Native","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-054';

UPDATE questions 
SET options = '[{"id":"a","text":"It’s a JavaScript syntax requirement","isCorrect":false},{"id":"b","text":"JSX uses lowercase for HTML elements; capital letters distinguish React components","isCorrect":true},{"id":"c","text":"It improves performance","isCorrect":false},{"id":"d","text":"It’s only required for class components","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-055';

UPDATE questions 
SET options = '[{"id":"a","text":"Use `for` loops directly in JSX","isCorrect":false},{"id":"b","text":"Use `Array.prototype.map()` to transform arrays into JSX elements","isCorrect":true},{"id":"c","text":"Loops are not supported in JSX","isCorrect":false},{"id":"d","text":"Use `forEach` to render elements","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-057';

UPDATE questions 
SET options = '[{"id":"a","text":"Use `{this.props.image}` inside quotes like `src=\"images/{this.props.image}\"`","isCorrect":false},{"id":"b","text":"Use expressions like `src={\"images/\" + this.props.image}` or template literals `src={`images/${this.props.image}`}`","isCorrect":true},{"id":"c","text":"Only static strings are allowed in attributes","isCorrect":false},{"id":"d","text":"Use `src={this.props.image}` without any path","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-058';

UPDATE questions 
SET options = '[{"id":"a","text":"`PropTypes.array(PropTypes.shape({}))`","isCorrect":false},{"id":"b","text":"`PropTypes.arrayOf(PropTypes.shape({ color: PropTypes.string, fontSize: PropTypes.number }))`","isCorrect":true},{"id":"c","text":"`PropTypes.objectOf(PropTypes.array)`","isCorrect":false},{"id":"d","text":"`PropTypes.shape([PropTypes.object])`","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-059';

UPDATE questions 
SET options = '[{"id":"a","text":"Use `className=\"btn {visible ? ''active'' : ''''}\"`","isCorrect":false},{"id":"b","text":"Use `className={''btn '' + (visible ? ''active'' : '''')}` or template literals","isCorrect":true},{"id":"c","text":"Conditional classes are not supported","isCorrect":false},{"id":"d","text":"Use CSS-in-JS only for conditional styling","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-060';

UPDATE questions 
SET options = '[{"id":"a","text":"`react` handles DOM rendering; `react-dom` defines components","isCorrect":false},{"id":"b","text":"`react` provides core element/component APIs; `react-dom` provides DOM and SSR rendering methods","isCorrect":true},{"id":"c","text":"They are the same package","isCorrect":false},{"id":"d","text":"`react-dom` is only for server-side rendering","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-061';

UPDATE questions 
SET options = '[{"id":"a","text":"To reduce bundle size for web apps","isCorrect":false},{"id":"b","text":"To enable React to work across platforms like web and React Native by separating core from DOM-specific code","isCorrect":true},{"id":"c","text":"Because the DOM API is too complex","isCorrect":false},{"id":"d","text":"ReactDOM is deprecated","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-062';

UPDATE questions 
SET options = '[{"id":"a","text":"Use `for` as in HTML","isCorrect":false},{"id":"b","text":"Use `htmlFor` because `for` is a reserved JavaScript keyword","isCorrect":true},{"id":"c","text":"Labels are not supported in React","isCorrect":false},{"id":"d","text":"Use `labelFor`","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-063';

UPDATE questions 
SET options = '[{"id":"a","text":"Use `Object.assign()` only","isCorrect":false},{"id":"b","text":"Use spread operator `{...style1, ...style2}` in React web; array `[style1, style2]` in React Native","isCorrect":true},{"id":"c","text":"Inline styles cannot be combined","isCorrect":false},{"id":"d","text":"Use CSS classes instead","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-064';

UPDATE questions 
SET options = '[{"id":"a","text":"Use `window.onresize = () => {}` directly in render","isCorrect":false},{"id":"b","text":"Use `useEffect` to add/remove `resize` listener and update state","isCorrect":true},{"id":"c","text":"Resize events are handled automatically by React","isCorrect":false},{"id":"d","text":"Use `setInterval` to check window size","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-065';

UPDATE questions 
SET options = '[{"id":"a","text":"Use `console.log` inside JSX","isCorrect":false},{"id":"b","text":"Use `<pre>{JSON.stringify(data, null, 2)}</pre>` to preserve formatting","isCorrect":true},{"id":"c","text":"JSON cannot be displayed in React","isCorrect":false},{"id":"d","text":"Use `<code>` without `JSON.stringify`","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-066';

UPDATE questions 
SET options = '[{"id":"a","text":"Props are mutable and can be updated freely","isCorrect":false},{"id":"b","text":"Props are immutable to enforce unidirectional data flow and predictability","isCorrect":true},{"id":"c","text":"Only class components can update props","isCorrect":false},{"id":"d","text":"Props are updated automatically by React","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-067';

UPDATE questions 
SET options = '[{"id":"a","text":"Add `autoFocus` prop to the input","isCorrect":true},{"id":"b","text":"Use `useRef` and `useEffect` to manually focus the input","isCorrect":true},{"id":"c","text":"Both `autoFocus` and `useRef`/`useEffect` are valid approaches","isCorrect":true},{"id":"d","text":"It''s not possible to focus on page load","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-068';

UPDATE questions 
SET options = '[{"id":"a","text":"`React.version`","isCorrect":true},{"id":"b","text":"`ReactDOM.version`","isCorrect":false},{"id":"c","text":"`process.env.REACT_VERSION`","isCorrect":false},{"id":"d","text":"`package.json` version","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-069';

UPDATE questions 
SET options = '[{"id":"a","text":"Add GA script to every component","isCorrect":false},{"id":"b","text":"Use `history.listen()` to track location changes and send page views","isCorrect":true},{"id":"c","text":"GA is automatically integrated with React Router","isCorrect":false},{"id":"d","text":"Use `useEffect` in every route component","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-070';

UPDATE questions 
SET options = '[{"id":"a","text":"React auto-prefixes all styles","isCorrect":false},{"id":"b","text":"Manually add prefixes like `WebkitTransform` and `msTransform`","isCorrect":true},{"id":"c","text":"Use a CSS-in-JS library only","isCorrect":false},{"id":"d","text":"Prefixes are not needed in modern browsers","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-071';

UPDATE questions 
SET options = '[{"id":"a","text":"Only named exports are allowed","isCorrect":false},{"id":"b","text":"Use `export default` for components and `import Name from ''module''`","isCorrect":true},{"id":"c","text":"Components must be exported as constants","isCorrect":false},{"id":"d","text":"Use `require()` and `module.exports`","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-072';

UPDATE questions 
SET options = '[{"id":"a","text":"All component names must be uppercase","isCorrect":false},{"id":"b","text":"Tags with dots like `<obj.component />` are valid because they are property accessors","isCorrect":true},{"id":"c","text":"Lowercase names are allowed for all components","isCorrect":false},{"id":"d","text":"Naming exceptions are not supported","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-073';

UPDATE questions 
SET options = '[{"id":"a","text":"Only grouping by file type is valid","isCorrect":false},{"id":"b","text":"Group by feature/route or by file type are both common approaches","isCorrect":true},{"id":"c","text":"There is only one official React folder structure","isCorrect":false},{"id":"d","text":"Folder structure doesn''t matter in React","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-075';

UPDATE questions 
SET options = '[{"id":"a","text":"`react-spring`, `framer-motion`, `React Transition Group`, `React Motion`","isCorrect":true},{"id":"b","text":"`animate.css` only","isCorrect":false},{"id":"c","text":"`jQuery.animate()`","isCorrect":false},{"id":"d","text":"CSS animations are the only way","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-076';

UPDATE questions 
SET options = '[{"id":"a","text":"They allow dynamic theme switching only","isCorrect":false},{"id":"b","text":"They extract reusable style values (colors, spacing) into shared modules for consistency","isCorrect":true},{"id":"c","text":"They replace CSS entirely","isCorrect":false},{"id":"d","text":"They are only for server-side rendering","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-077';

UPDATE questions 
SET options = '[{"id":"a","text":"`eslint-plugin-react` and `eslint-plugin-jsx-a11y`","isCorrect":true},{"id":"b","text":"`prettier` only","isCorrect":false},{"id":"c","text":"`stylelint` for React","isCorrect":false},{"id":"d","text":"No linters are needed for React","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-078';

UPDATE questions 
SET options = '[{"id":"a","text":"A state management library like Redux","isCorrect":false},{"id":"b","text":"A routing library for SPAs that syncs URL with UI","isCorrect":true},{"id":"c","text":"A CSS-in-JS solution","isCorrect":false},{"id":"d","text":"A testing utility","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-079';

UPDATE questions 
SET options = '[{"id":"a","text":"React Router is a standalone browser API","isCorrect":false},{"id":"b","text":"React Router wraps the `history` library to provide declarative React components for routing","isCorrect":true},{"id":"c","text":"The `history` library is only for server-side rendering","isCorrect":false},{"id":"d","text":"They are the same thing","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-080';

UPDATE questions 
SET options = '[{"id":"a","text":"`<BrowserRouter>`, `<HashRouter>`, `<MemoryRouter>`, `<StaticRouter>`","isCorrect":true},{"id":"b","text":"`<Router>`, `<Route>`, `<Link>`, `<NavLink>`","isCorrect":false},{"id":"c","text":"Only `<BrowserRouter>` exists in v6","isCorrect":false},{"id":"d","text":"`<Router>` is removed in v6","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-081';

UPDATE questions 
SET options = '[{"id":"a","text":"`push()` replaces current URL; `replace()` adds to history","isCorrect":false},{"id":"b","text":"`push()` adds to history stack; `replace()` replaces current entry","isCorrect":true},{"id":"c","text":"Both behave identically","isCorrect":false},{"id":"d","text":"These methods are deprecated in v6","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-082';

UPDATE questions 
SET options = '[{"id":"a","text":"Use `useNavigate` hook","isCorrect":false},{"id":"b","text":"Use `withRouter` HOC or `<Route>` render prop to access `history.push()`","isCorrect":true},{"id":"c","text":"Directly modify `window.location`","isCorrect":false},{"id":"d","text":"Navigation is not possible in v4","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-083';

UPDATE questions 
SET options = '[{"id":"a","text":"`props.query`","isCorrect":false},{"id":"b","text":"Use `query-string` library or `URLSearchParams`","isCorrect":true},{"id":"c","text":"`useParams()` hook","isCorrect":false},{"id":"d","text":"Query params are not supported","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-084';

UPDATE questions 
SET options = '[{"id":"a","text":"You must always use `<Switch>`","isCorrect":false},{"id":"b","text":"`<Router>` requires a single child; use `<Switch>` to group routes","isCorrect":true},{"id":"c","text":"This warning is removed in v6","isCorrect":false},{"id":"d","text":"It’s caused by missing `exact` prop","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-085';

UPDATE questions 
SET options = '[{"id":"a","text":"`history.push(''/path'', { param: value })`","isCorrect":false},{"id":"b","text":"`history.push({ pathname: ''/path'', search: ''?q=1'', state: { data } })`","isCorrect":true},{"id":"c","text":"Only strings are allowed","isCorrect":false},{"id":"d","text":"Use URL fragments only","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-086';

UPDATE questions 
SET options = '[{"id":"a","text":"Use `*` path: `<Route path=\"*\" component={NotFound} />`","isCorrect":false},{"id":"b","text":"Place a `<Route>` with no `path` prop last","isCorrect":true},{"id":"c","text":"It’s automatic in v6","isCorrect":false},{"id":"d","text":"Use `useRouteMatch()`","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-087';

UPDATE questions 
SET options = '[{"id":"a","text":"Use `useHistory()` hook","isCorrect":false},{"id":"b","text":"Create a custom `history` instance and pass it to `<Router>`","isCorrect":true},{"id":"c","text":"`window.history` is sufficient","isCorrect":false},{"id":"d","text":"History is not accessible outside components","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-088';

UPDATE questions 
SET options = '[{"id":"a","text":"`window.location.href = ''/dashboard''`","isCorrect":false},{"id":"b","text":"Render `<Redirect to=\"/dashboard\" />` when logged in","isCorrect":true},{"id":"c","text":"Use `history.replace()` only","isCorrect":false},{"id":"d","text":"Redirects are not possible in React","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-089';

UPDATE questions 
SET options = '[{"id":"a","text":"A state management library","isCorrect":false},{"id":"b","text":"An internationalization library for formatting and translations","isCorrect":true},{"id":"c","text":"A routing solution","isCorrect":false},{"id":"d","text":"A testing framework","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-090';

UPDATE questions 
SET options = '[{"id":"a","text":"State management and routing","isCorrect":false},{"id":"b","text":"Number/date formatting, plurals, relative time, 150+ languages","isCorrect":true},{"id":"c","text":"Only string translation","isCorrect":false},{"id":"d","text":"CSS-in-JS theming","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-091';

UPDATE questions 
SET options = '[{"id":"a","text":"Only components are supported","isCorrect":false},{"id":"b","text":"Components (`<FormattedMessage>`) and API (`formatMessage`)","isCorrect":true},{"id":"c","text":"Only the API is supported","isCorrect":false},{"id":"d","text":"Use `Intl` global object only","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-092';

UPDATE questions 
SET options = '[{"id":"a","text":"Use `<FormattedMessage>` directly in placeholder","isCorrect":false},{"id":"b","text":"Use `intl.formatMessage()` for placeholders and alt text","isCorrect":true},{"id":"c","text":"Placeholders don’t support i18n","isCorrect":false},{"id":"d","text":"Use `dangerouslySetInnerHTML`","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-093';

UPDATE questions 
SET options = '[{"id":"a","text":"`navigator.language`","isCorrect":false},{"id":"b","text":"`intl.locale` from `injectIntl` or `useIntl`","isCorrect":true},{"id":"c","text":"`process.env.LOCALE`","isCorrect":false},{"id":"d","text":"Locale is not accessible","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-094';

UPDATE questions 
SET options = '[{"id":"a","text":"Jest requires more configuration than Jasmine","isCorrect":false},{"id":"b","text":"Jest has no mocking support","isCorrect":false},{"id":"c","text":"Jest auto-discovers tests, mocks dependencies, supports async, uses jsdom, and runs tests in parallel","isCorrect":true},{"id":"d","text":"Jasmine runs tests faster than Jest","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q100';

UPDATE questions 
SET options = '[{"id":"a","text":"Inline, internal, and external","isCorrect":true,"explanation":""},{"id":"b","text":"Only external","isCorrect":false,"explanation":""},{"id":"c","text":"Only inline","isCorrect":false,"explanation":""},{"id":"d","text":"CSS cannot be applied to HTML","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css-1-css-q3';

UPDATE questions 
SET options = '[{"id":"a","text":"border-radius, box-shadow, gradients, RGBA, new selectors","isCorrect":true,"explanation":""},{"id":"b","text":"Only new color formats","isCorrect":false,"explanation":""},{"id":"c","text":"CSS3 removed all vendor prefixes","isCorrect":false,"explanation":""},{"id":"d","text":"CSS3 is not supported in modern browsers","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css-1-css-q5';

UPDATE questions 
SET options = '[{"id":"a","text":"Universal, element, class, ID, attribute, pseudo-classes, pseudo-elements, combinators","isCorrect":true,"explanation":""},{"id":"b","text":"Only class and ID","isCorrect":false,"explanation":""},{"id":"c","text":"Selectors are optional in CSS","isCorrect":false,"explanation":""},{"id":"d","text":"Pseudo-elements are the same as pseudo-classes","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css-1-css-q6';

UPDATE questions 
SET options = '[{"id":"a","text":"Pseudo-classes: element states; Pseudo-elements: virtual parts of elements","isCorrect":true,"explanation":""},{"id":"b","text":"They are identical","isCorrect":false,"explanation":""},{"id":"c","text":"Pseudo-elements can’t insert content","isCorrect":false,"explanation":""},{"id":"d","text":"Pseudo-classes require double colons","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css-1-css-q8';

UPDATE questions 
SET options = '[{"id":"a","text":"Descendant ( ), child (>), adjacent (+), general sibling (~)","isCorrect":true,"explanation":""},{"id":"b","text":"Only child and descendant","isCorrect":false,"explanation":""},{"id":"c","text":"Combinators are deprecated","isCorrect":false,"explanation":""},{"id":"d","text":"Adjacent sibling selects all following siblings","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css-1-css-q9';

UPDATE questions 
SET options = '[{"id":"a","text":"Class is for one element; ID is for many","isCorrect":false,"explanation":""},{"id":"b","text":"Class can be reused; ID should be unique","isCorrect":true,"explanation":""},{"id":"c","text":"They are functionally identical","isCorrect":false,"explanation":""},{"id":"d","text":"ID selectors are faster in all browsers","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css-1-css-q10';

UPDATE questions 
SET options = '[{"id":"a","text":"Flexbox: 1D, content-first; Grid: 2D, layout-first","isCorrect":true,"explanation":""},{"id":"b","text":"Grid is only for mobile","isCorrect":false,"explanation":""},{"id":"c","text":"Flexbox replaces Grid","isCorrect":false,"explanation":""},{"id":"d","text":"They are identical","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css-1-css-q14';

UPDATE questions 
SET options = '[{"id":"a","text":"`visibility: hidden` preserves space; `display: none` removes from flow","isCorrect":true,"explanation":""},{"id":"b","text":"They are identical","isCorrect":false,"explanation":""},{"id":"c","text":"`display: none` preserves space","isCorrect":false,"explanation":""},{"id":"d","text":"`visibility: hidden` triggers reflow","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css-1-css-q18';

UPDATE questions 
SET options = '[{"id":"a","text":"static, relative, absolute, fixed, sticky","isCorrect":true,"explanation":""},{"id":"b","text":"Only absolute and relative","isCorrect":false,"explanation":""},{"id":"c","text":"`fixed` is relative to parent","isCorrect":false,"explanation":""},{"id":"d","text":"`sticky` doesn’t require a threshold","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css-1-css-q20';

UPDATE questions 
SET options = '[{"id":"a","text":"`block`, `inline`, `inline-block`, `flex`, `grid`, `none`, `table`","isCorrect":true,"explanation":""},{"id":"b","text":"Only `block` and `inline`","isCorrect":false,"explanation":""},{"id":"c","text":"`display` has no effect on layout","isCorrect":false,"explanation":""},{"id":"d","text":"`display: hidden` is valid","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css-16-80-css-q61';

UPDATE questions 
SET options = '[{"id":"a","text":"Responsive: fluid, continuous adaptation; Adaptive: fixed layouts at breakpoints","isCorrect":true,"explanation":""},{"id":"b","text":"They are identical","isCorrect":false,"explanation":""},{"id":"c","text":"Adaptive uses only percentages","isCorrect":false,"explanation":""},{"id":"d","text":"Responsive requires JavaScript","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css-16-80-css-q62';

UPDATE questions 
SET options = '[{"id":"a","text":"`@media`, `@import`, `@font-face`, `@keyframes`","isCorrect":true,"explanation":""},{"id":"b","text":"At-rules are invalid in modern CSS","isCorrect":false,"explanation":""},{"id":"c","text":"`@rule` is the correct syntax","isCorrect":false,"explanation":""},{"id":"d","text":"Only `@media` is an at-rule","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css-16-80-css-q66';

UPDATE questions 
SET options = '[{"id":"a","text":"`font-family`","isCorrect":true,"explanation":""},{"id":"b","text":"`font-face`","isCorrect":false,"explanation":""},{"id":"c","text":"`font-style`","isCorrect":false,"explanation":""},{"id":"d","text":"`font`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css-16-80-css-q70';

UPDATE questions 
SET options = '[{"id":"a","text":"`font-style`","isCorrect":true,"explanation":""},{"id":"b","text":"`font-variant`","isCorrect":false,"explanation":""},{"id":"c","text":"`text-transform`","isCorrect":false,"explanation":""},{"id":"d","text":"`font-weight`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css-16-80-css-q71';

UPDATE questions 
SET options = '[{"id":"a","text":"`font-variant`","isCorrect":true,"explanation":""},{"id":"b","text":"`text-transform: capitalize`","isCorrect":false,"explanation":""},{"id":"c","text":"`font-style: small-caps`","isCorrect":false,"explanation":""},{"id":"d","text":"`text-variant`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css-16-80-css-q72';

UPDATE questions 
SET options = '[{"id":"a","text":"`font-weight`","isCorrect":true,"explanation":""},{"id":"b","text":"`font-style`","isCorrect":false,"explanation":""},{"id":"c","text":"`text-bold`","isCorrect":false,"explanation":""},{"id":"d","text":"`font-emphasis`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css-16-80-css-q73';

UPDATE questions 
SET options = '[{"id":"a","text":"`letter-spacing`","isCorrect":true,"explanation":""},{"id":"b","text":"`word-spacing`","isCorrect":false,"explanation":""},{"id":"c","text":"`text-spacing`","isCorrect":false,"explanation":""},{"id":"d","text":"`char-spacing`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css-16-80-css-q74';

UPDATE questions 
SET options = '[{"id":"a","text":"`word-spacing`","isCorrect":true,"explanation":""},{"id":"b","text":"`letter-spacing`","isCorrect":false,"explanation":""},{"id":"c","text":"`text-indent`","isCorrect":false,"explanation":""},{"id":"d","text":"`line-height`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css-16-80-css-q75';

UPDATE questions 
SET options = '[{"id":"a","text":"`text-indent`","isCorrect":true,"explanation":""},{"id":"b","text":"`margin-left`","isCorrect":false,"explanation":""},{"id":"c","text":"`padding-left`","isCorrect":false,"explanation":""},{"id":"d","text":"`first-line-indent`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css-16-80-css-q76';

UPDATE questions 
SET options = '[{"id":"a","text":"`text-align`","isCorrect":true,"explanation":""},{"id":"b","text":"`align-text`","isCorrect":false,"explanation":""},{"id":"c","text":"`horizontal-align`","isCorrect":false,"explanation":""},{"id":"d","text":"`justify`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css-16-80-css-q77';

UPDATE questions 
SET options = '[{"id":"a","text":"`text-decoration`","isCorrect":true,"explanation":""},{"id":"b","text":"`font-decoration`","isCorrect":false,"explanation":""},{"id":"c","text":"`text-style`","isCorrect":false,"explanation":""},{"id":"d","text":"`underline`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css-16-80-css-q78';

UPDATE questions 
SET options = '[{"id":"a","text":"`text-transform`","isCorrect":true,"explanation":""},{"id":"b","text":"`font-case`","isCorrect":false,"explanation":""},{"id":"c","text":"`text-case`","isCorrect":false,"explanation":""},{"id":"d","text":"`transform-text`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css-16-80-css-q79';

UPDATE questions 
SET options = '[{"id":"a","text":"`list-style-type`","isCorrect":true,"explanation":""},{"id":"b","text":"`marker-type`","isCorrect":false,"explanation":""},{"id":"c","text":"`list-marker`","isCorrect":false,"explanation":""},{"id":"d","text":"`bullet-style`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css-16-80-css-q80';

UPDATE questions 
SET options = '[{"id":"a","text":"Absolute: px, pt, cm; Relative: em, rem, %, vw, vh","isCorrect":true,"explanation":""},{"id":"b","text":"Only pixels are valid","isCorrect":false,"explanation":""},{"id":"c","text":"`em` is absolute; `px` is relative","isCorrect":false,"explanation":""},{"id":"d","text":"All units behave the same across devices","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css-41-60-css-q42';

UPDATE questions 
SET options = '[{"id":"a","text":"`RGBa`: 0-255 channels; `HEX`: #RRGGBB; `HSLa`: hue/saturation/lightness","isCorrect":true,"explanation":""},{"id":"b","text":"HEX supports alpha; RGBa does not","isCorrect":false,"explanation":""},{"id":"c","text":"HSLa uses CMYK values","isCorrect":false,"explanation":""},{"id":"d","text":"All formats are identical","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css-41-60-css-q44';

UPDATE questions 
SET options = '[{"id":"a","text":"Reset: removes all styles; Normalize: preserves useful defaults, fixes inconsistencies","isCorrect":true,"explanation":""},{"id":"b","text":"They are the same","isCorrect":false,"explanation":""},{"id":"c","text":"Normalize removes all margins","isCorrect":false,"explanation":""},{"id":"d","text":"Reset is obsolete","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css-41-60-css-q46';

UPDATE questions 
SET options = '[{"id":"a","text":"`clear: left` prevents left floats; `clear: right` prevents right floats; `clear: both` prevents both","isCorrect":true,"explanation":""},{"id":"b","text":"`clear` only works with `position: absolute`","isCorrect":false,"explanation":""},{"id":"c","text":"`clear` is deprecated","isCorrect":false,"explanation":""},{"id":"d","text":"`clear` affects inline elements","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css-41-60-css-q49';

UPDATE questions 
SET options = '[{"id":"a","text":"Inline > ID > Class > Element","isCorrect":true,"explanation":""},{"id":"b","text":"Element > Class > ID > Inline","isCorrect":false,"explanation":""},{"id":"c","text":"All selectors have equal weight","isCorrect":false,"explanation":""},{"id":"d","text":"`!important` has lowest priority","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css-81–100-css-q82';

UPDATE questions 
SET options = '[{"id":"a","text":"`blur()`, `brightness()`, `grayscale()`, `drop-shadow()`","isCorrect":true,"explanation":""},{"id":"b","text":"Only for SVG elements","isCorrect":false,"explanation":""},{"id":"c","text":"Filters require JavaScript","isCorrect":false,"explanation":""},{"id":"d","text":"Not supported in modern browsers","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css-81–100-css-q84';

UPDATE questions 
SET options = '[{"id":"a","text":"`font-family`, `font-size`, `font-weight`, `font-style`, `line-height`","isCorrect":true,"explanation":""},{"id":"b","text":"Only `font-size` and `color`","isCorrect":false,"explanation":""},{"id":"c","text":"`text-font` is the main property","isCorrect":false,"explanation":""},{"id":"d","text":"Fonts cannot be styled with CSS","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css-81–100-css-q85';

UPDATE questions 
SET options = '[{"id":"a","text":"`background-color`, `background-image`, `background-size`, `background-repeat`","isCorrect":true,"explanation":""},{"id":"b","text":"Only `background-color`","isCorrect":false,"explanation":""},{"id":"c","text":"`bg-color` is the standard property","isCorrect":false,"explanation":""},{"id":"d","text":"Backgrounds are handled only by HTML","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css-81–100-css-q86';

UPDATE questions 
SET options = '[{"id":"a","text":"`static`, `relative`, `absolute`, `fixed`, `sticky`","isCorrect":true,"explanation":""},{"id":"b","text":"Only `absolute` and `relative`","isCorrect":false,"explanation":""},{"id":"c","text":"`position: float` is valid","isCorrect":false,"explanation":""},{"id":"d","text":"`sticky` is deprecated","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css-81–100-css-q91';

UPDATE questions 
SET options = '[{"id":"a","text":"`linear-gradient()`, `radial-gradient()`, `conic-gradient()`","isCorrect":true,"explanation":""},{"id":"b","text":"Only solid colors are allowed","isCorrect":false,"explanation":""},{"id":"c","text":"Gradients require SVG","isCorrect":false,"explanation":""},{"id":"d","text":"Not supported in modern browsers","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css-81–100-css-q93';

UPDATE questions 
SET options = '[{"id":"a","text":"`-webkit-` (Chrome/Safari), `-moz-` (Firefox), `-ms-` (IE/Edge), `-o-` (Opera)","isCorrect":true,"explanation":""},{"id":"b","text":"Vendor prefixes are no longer needed","isCorrect":false,"explanation":""},{"id":"c","text":"All browsers use the same prefix","isCorrect":false,"explanation":""},{"id":"d","text":"Prefixes are part of the official CSS spec","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css-81–100-css-q98';

UPDATE questions 
SET options = '[{"id":"a","text":"`relative`: offsets in flow; `absolute`: removed from flow, relative to positioned ancestor","isCorrect":true,"explanation":""},{"id":"b","text":"`absolute` is always relative to the body","isCorrect":false,"explanation":""},{"id":"c","text":"`relative` removes the element from layout","isCorrect":false,"explanation":""},{"id":"d","text":"They behave identically","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css21–40-css-q21';

UPDATE questions 
SET options = '[{"id":"a","text":"Absolute: px, pt, cm; Relative: em, rem, %, vw, vh","isCorrect":true,"explanation":""},{"id":"b","text":"Only pixels are valid","isCorrect":false,"explanation":""},{"id":"c","text":"`em` is absolute; `px` is relative","isCorrect":false,"explanation":""},{"id":"d","text":"All units behave the same across devices","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css21–40-css-q23';

UPDATE questions 
SET options = '[{"id":"a","text":"Pseudo-elements: virtual parts (e.g., ::before); Pseudo-classes: element states (e.g., :hover)","isCorrect":true,"explanation":""},{"id":"b","text":"They are the same","isCorrect":false,"explanation":""},{"id":"c","text":"Pseudo-classes insert content","isCorrect":false,"explanation":""},{"id":"d","text":"Pseudo-elements require JavaScript","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css21–40-css-q25';

UPDATE questions 
SET options = '[{"id":"a","text":"`content-box`: width = content only; `border-box`: width = content + padding + border","isCorrect":true,"explanation":""},{"id":"b","text":"`border-box` excludes padding","isCorrect":false,"explanation":""},{"id":"c","text":"`box-sizing` has no effect on layout","isCorrect":false,"explanation":""},{"id":"d","text":"Only `content-box` is valid","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css21–40-css-q27';

UPDATE questions 
SET options = '[{"id":"a","text":"`content-box`: width excludes padding/border; `border-box`: width includes them","isCorrect":true,"explanation":""},{"id":"b","text":"`border-box` is slower","isCorrect":false,"explanation":""},{"id":"c","text":"They are identical","isCorrect":false,"explanation":""},{"id":"d","text":"`content-box` includes margin","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css21–40-css-q28';

UPDATE questions 
SET options = '[{"id":"a","text":"`a[href^=''https'']`, `a[href$=''.pdf'']`, `a[href*=''css'']`","isCorrect":true,"explanation":""},{"id":"b","text":"Only class selectors can target links","isCorrect":false,"explanation":""},{"id":"c","text":"`a[href=''https'']` matches all HTTPS links","isCorrect":false,"explanation":""},{"id":"d","text":"Attribute selectors are deprecated","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css21–40-css-q30';

UPDATE questions 
SET options = '[{"id":"a","text":"`RGBa`: 0-255 channels; `HEX`: #RRGGBB; `HSLa`: hue/saturation/lightness","isCorrect":true,"explanation":""},{"id":"b","text":"HEX supports alpha; RGBa does not","isCorrect":false,"explanation":""},{"id":"c","text":"HSLa uses CMYK values","isCorrect":false,"explanation":""},{"id":"d","text":"All formats are identical","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css21–40-css-q32';

UPDATE questions 
SET options = '[{"id":"a","text":"Reset: removes all styles; Normalize: preserves useful defaults, fixes inconsistencies","isCorrect":true,"explanation":""},{"id":"b","text":"They are the same","isCorrect":false,"explanation":""},{"id":"c","text":"Normalize removes all margins","isCorrect":false,"explanation":""},{"id":"d","text":"Reset is obsolete","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css21–40-css-q34';

UPDATE questions 
SET options = '[{"id":"a","text":"`clear: left` prevents left floats; `clear: right` prevents right floats; `clear: both` prevents both","isCorrect":true,"explanation":""},{"id":"b","text":"`clear` only works with `position: absolute`","isCorrect":false,"explanation":""},{"id":"c","text":"`clear` is deprecated","isCorrect":false,"explanation":""},{"id":"d","text":"`clear` affects inline elements","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css21–40-css-q37';

UPDATE questions 
SET options = '[{"id":"a","text":"Alice","isCorrect":false,"explanation":""},{"id":"b","text":"Brown","isCorrect":false,"explanation":""},{"id":"c","text":"Alice Brown","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-common-pattern-2';

UPDATE questions 
SET options = '[{"id":"a","text":"Simple and easy to understand","isCorrect":true,"explanation":""},{"id":"b","text":"Minimal boilerplate code","isCorrect":true,"explanation":""},{"id":"c","text":"Great for small projects","isCorrect":true,"explanation":""},{"id":"d","text":"Highly scalable for large apps","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-common-pattern-3';

UPDATE questions 
SET options = '[{"id":"a","text":"undefined undefined","isCorrect":false,"explanation":""},{"id":"b","text":"John Doe","isCorrect":true,"explanation":""},{"id":"c","text":"[object Object]","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-factory-pattern-10';

UPDATE questions 
SET options = '[{"id":"a","text":"Encapsulation of object creation","isCorrect":true,"explanation":""},{"id":"b","text":"Easier to configure objects dynamically","isCorrect":true,"explanation":""},{"id":"c","text":"No need to repeat object structure","isCorrect":true,"explanation":""},{"id":"d","text":"Faster performance than constructors","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-factory-pattern-11';

UPDATE questions 
SET options = '[{"id":"a","text":"{ key: \"name\", value: \"Alice\" }","isCorrect":false,"explanation":""},{"id":"b","text":"{ name: \"Alice\" }","isCorrect":true,"explanation":""},{"id":"c","text":"undefined","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-factory-pattern-16';

UPDATE questions 
SET options = '[{"id":"a","text":"Total amount of copies: 5, Total amount of books: 5","isCorrect":false,"explanation":""},{"id":"b","text":"Total amount of copies: 3, Total amount of books: 5","isCorrect":false,"explanation":""},{"id":"c","text":"Total amount of copies: 5, Total amount of books: 3","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-flyweight-pattern-18';

UPDATE questions 
SET options = '[{"id":"a","text":"Reduced memory usage by reusing objects","isCorrect":true,"explanation":""},{"id":"b","text":"Improved performance for large-scale applications","isCorrect":true,"explanation":""},{"id":"c","text":"Simplifies debugging","isCorrect":false,"explanation":""},{"id":"d","text":"Reduces network latency","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-flyweight-pattern-19';

UPDATE questions 
SET options = '[{"id":"a","text":"When creating thousands of objects that share common properties","isCorrect":true,"explanation":""},{"id":"b","text":"When creating a single instance of a service","isCorrect":false,"explanation":""},{"id":"c","text":"When caching API responses","isCorrect":false,"explanation":""},{"id":"d","text":"When setting up event delegation in DOM","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-flyweight-pattern-23';

UPDATE questions 
SET options = '[{"id":"a","text":"A librarian managing which books readers can borrow","isCorrect":false,"explanation":""},{"id":"b","text":"An air traffic controller guiding planes so they don’t talk to each other directly","isCorrect":true,"explanation":""},{"id":"c","text":"A teacher grading exams","isCorrect":false,"explanation":""},{"id":"d","text":"A vending machine dispensing products","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-mediator-pattern-26';

UPDATE questions 
SET options = '[{"id":"a","text":"Reduces coupling between components","isCorrect":true,"explanation":""},{"id":"b","text":"Simplifies many-to-many relationships","isCorrect":true,"explanation":""},{"id":"c","text":"Always improves performance","isCorrect":false,"explanation":""},{"id":"d","text":"Provides a single point of communication","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-mediator-pattern-29';

UPDATE questions 
SET options = '[{"id":"a","text":"Request has test header: false","isCorrect":false,"explanation":""},{"id":"b","text":"Request has test header: true","isCorrect":true,"explanation":""},{"id":"c","text":"Request has test header: undefined","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-mediator-pattern-32';

UPDATE questions 
SET options = '[{"id":"a","text":"undefined","isCorrect":false,"explanation":""},{"id":"b","text":"Woof!","isCorrect":true,"explanation":""},{"id":"c","text":"Error: bark is not a function","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-mixin-pattern-34';

UPDATE questions 
SET options = '[{"id":"a","text":"setTimeout and setInterval (from WindowOrWorkerGlobalScope)","isCorrect":true,"explanation":""},{"id":"b","text":"onbeforeunload (from WindowEventHandlers)","isCorrect":true,"explanation":""},{"id":"c","text":"document.querySelector","isCorrect":false,"explanation":""},{"id":"d","text":"console.log","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-mixin-pattern-37';

UPDATE questions 
SET options = '[{"id":"a","text":"Both methods are preserved","isCorrect":false,"explanation":""},{"id":"b","text":"The last assigned method overwrites the previous one","isCorrect":true,"explanation":""},{"id":"c","text":"JavaScript throws an error","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-mixin-pattern-40';

UPDATE questions 
SET options = '[{"id":"a","text":"function Module() { var x = 10; return x; }","isCorrect":false,"explanation":""},{"id":"b","text":"var Module = (function(){ var privateVar = 10; return { get: function(){ return privateVar; } }; })();","isCorrect":true,"explanation":""},{"id":"c","text":"let Module = class { constructor(){ this.x = 10; } }","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-module-pattern-42';

UPDATE questions 
SET options = '[{"id":"a","text":"It makes code modular and organized","isCorrect":false,"explanation":""},{"id":"b","text":"Private members cannot be accessed or modified without changing the original module","isCorrect":true,"explanation":""},{"id":"c","text":"It always requires classes","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-module-pattern-44';

UPDATE questions 
SET options = '[{"id":"a","text":"The method is still accessible globally","isCorrect":false,"explanation":""},{"id":"b","text":"The method remains private and cannot be accessed outside","isCorrect":true,"explanation":""},{"id":"c","text":"JavaScript throws a syntax error","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-module-pattern-46';

UPDATE questions 
SET options = '[{"id":"a","text":"When you want to encapsulate private state in legacy JavaScript without ES6 support","isCorrect":true,"explanation":""},{"id":"b","text":"When you need dynamic imports and tree-shaking","isCorrect":false,"explanation":""},{"id":"c","text":"When you only work with classes","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-module-pattern-48';

UPDATE questions 
SET options = '[{"id":"a","text":"Publisher, renderer, transformer","isCorrect":false,"explanation":""},{"id":"b","text":"Observers, subscribe/unsubscribe, notify","isCorrect":true,"explanation":""},{"id":"c","text":"State, reducer, dispatcher","isCorrect":false,"explanation":""},{"id":"d","text":"Model, view, controller","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-observer-pattern-50';

UPDATE questions 
SET options = '[{"id":"a","text":"handleClick and handleToggle","isCorrect":false,"explanation":""},{"id":"b","text":"logger and toastify","isCorrect":true,"explanation":""},{"id":"c","text":"Button and Switch components","isCorrect":false,"explanation":""},{"id":"d","text":"React lifecycle methods","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-observer-pattern-51';

UPDATE questions 
SET options = '[{"id":"a","text":"Notifying multiple UI components when new messages arrive","isCorrect":true,"explanation":""},{"id":"b","text":"Rendering static content with no user interaction","isCorrect":false,"explanation":""},{"id":"c","text":"Compiling JavaScript code to ES5","isCorrect":false,"explanation":""},{"id":"d","text":"Sorting a list of numbers","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-observer-pattern-53';

UPDATE questions 
SET options = '[{"id":"a","text":"Redux","isCorrect":false,"explanation":""},{"id":"b","text":"Axios","isCorrect":false,"explanation":""},{"id":"c","text":"RxJS","isCorrect":true,"explanation":""},{"id":"d","text":"Styled Components","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-observer-pattern-55';

UPDATE questions 
SET options = '[{"id":"a","text":"Observers cannot be removed once added","isCorrect":false,"explanation":""},{"id":"b","text":"Too many or complex observers can cause performance issues during notifications","isCorrect":true,"explanation":""},{"id":"c","text":"Observable cannot notify multiple observers at once","isCorrect":false,"explanation":""},{"id":"d","text":"It cannot work with asynchronous data","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-observer-pattern-56';

UPDATE questions 
SET options = '[{"id":"a","text":"On each Dog instance","isCorrect":false,"explanation":""},{"id":"b","text":"On Dog.prototype, shared by all instances","isCorrect":true,"explanation":""},{"id":"c","text":"Inside the Dog constructor","isCorrect":false,"explanation":""},{"id":"d","text":"In the global window object","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-prototype-pattern-58';

UPDATE questions 
SET options = '[{"id":"a","text":"Yes, because all instances reference the same prototype","isCorrect":true,"explanation":""},{"id":"b","text":"No, only future instances get it","isCorrect":false,"explanation":""},{"id":"c","text":"It depends on whether the object was frozen","isCorrect":false,"explanation":""},{"id":"d","text":"JavaScript throws an error","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-prototype-pattern-59';

UPDATE questions 
SET options = '[{"id":"a","text":"Through Object.assign copying methods","isCorrect":false,"explanation":""},{"id":"b","text":"By extending Dog, SuperDog.prototype.__proto__ points to Dog.prototype","isCorrect":true,"explanation":""},{"id":"c","text":"Each SuperDog has its own bark() copy","isCorrect":false,"explanation":""},{"id":"d","text":"By redefining bark in the constructor","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-prototype-pattern-61';

UPDATE questions 
SET options = '[{"id":"a","text":"Deep prototype chains can make debugging difficult and slow property lookups","isCorrect":true,"explanation":""},{"id":"b","text":"It prevents dynamic property addition","isCorrect":false,"explanation":""},{"id":"c","text":"It increases memory usage","isCorrect":false,"explanation":""},{"id":"d","text":"It makes objects immutable","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-prototype-pattern-64';

UPDATE questions 
SET options = '[{"id":"a","text":"Passing props through multiple components that don’t use them","isCorrect":true,"explanation":""},{"id":"b","text":"Drilling into the DOM with refs","isCorrect":false,"explanation":""},{"id":"c","text":"Creating deeply nested providers","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-provider-pattern-62';

UPDATE questions 
SET options = '[{"id":"a","text":"Nothing, React throws an error","isCorrect":false,"explanation":""},{"id":"b","text":"h1 with text ''Hello Provider''","isCorrect":true,"explanation":""},{"id":"c","text":"h1 with text ''undefined''","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-provider-pattern-64';

UPDATE questions 
SET options = '[{"id":"a","text":"It enforces correct usage and can throw errors if used outside the provider","isCorrect":true,"explanation":""},{"id":"b","text":"It avoids the need to import useContext at all","isCorrect":false,"explanation":""},{"id":"c","text":"It improves runtime performance automatically","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-provider-pattern-68';

UPDATE questions 
SET options = '[{"0":"a","1":"p","2":"p","3":"l","4":"y","5":" ","6":"a","7":"n","8":"d","9":" ","10":"c","11":"o","12":"n","13":"s","14":"t","15":"r","16":"u","17":"c","18":"t","explanation":""},{"0":"g","1":"e","2":"t","3":" ","4":"a","5":"n","6":"d","7":" ","8":"s","9":"e","10":"t","explanation":""},{"0":"d","1":"e","2":"l","3":"e","4":"t","5":"e","6":"P","7":"r","8":"o","9":"p","10":"e","11":"r","12":"t","13":"y","14":" ","15":"a","16":"n","17":"d","18":" ","19":"d","20":"e","21":"f","22":"i","23":"n","24":"e","25":"P","26":"r","27":"o","28":"p","29":"e","30":"r","31":"t","32":"y","explanation":""},{"0":"o","1":"w","2":"n","3":"K","4":"e","5":"y","6":"s","7":" ","8":"a","9":"n","10":"d","11":" ","12":"h","13":"a","14":"s","explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-proxy-pattern-68';

UPDATE questions 
SET options = '[{"0":"T","1":"h","2":"r","3":"o","4":"w","5":" ","6":"a","7":"n","8":" ","9":"e","10":"r","11":"r","12":"o","13":"r","explanation":""},{"0":"R","1":"e","2":"t","3":"u","4":"r","5":"n","6":" ","7":"u","8":"n","9":"d","10":"e","11":"f","12":"i","13":"n","14":"e","15":"d","explanation":""},{"0":"L","1":"o","2":"g","3":" ","4":"a","5":" ","6":"c","7":"u","8":"s","9":"t","10":"o","11":"m","12":" ","13":"m","14":"e","15":"s","16":"s","17":"a","18":"g","19":"e","explanation":""},{"0":"A","1":"n","2":"y","3":" ","4":"o","5":"f","6":" ","7":"t","8":"h","9":"e","10":" ","11":"a","12":"b","13":"o","14":"v","15":"e","16":",","17":" ","18":"d","19":"e","20":"p","21":"e","22":"n","23":"d","24":"i","25":"n","26":"g","27":" ","28":"o","29":"n","30":" ","31":"t","32":"h","33":"e","34":" ","35":"h","36":"a","37":"n","38":"d","39":"l","40":"e","41":"r","42":" ","43":"l","44":"o","45":"g","46":"i","47":"c","explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-proxy-pattern-71';

UPDATE questions 
SET options = '[{"0":"V","1":"a","2":"l","3":"i","4":"d","5":"a","6":"t","7":"i","8":"o","9":"n","10":" ","11":"o","12":"f","13":" ","14":"o","15":"b","16":"j","17":"e","18":"c","19":"t","20":" ","21":"p","22":"r","23":"o","24":"p","25":"e","26":"r","27":"t","28":"i","29":"e","30":"s","explanation":""},{"0":"D","1":"e","2":"b","3":"u","4":"g","5":"g","6":"i","7":"n","8":"g","9":" ","10":"a","11":"n","12":"d","13":" ","14":"l","15":"o","16":"g","17":"g","18":"i","19":"n","20":"g","explanation":""},{"0":"F","1":"o","2":"r","3":"m","4":"a","5":"t","6":"t","7":"i","8":"n","9":"g","10":" ","11":"d","12":"a","13":"t","14":"a","15":" ","16":"b","17":"e","18":"f","19":"o","20":"r","21":"e","22":" ","23":"r","24":"e","25":"t","26":"u","27":"r","28":"n","explanation":""},{"0":"P","1":"e","2":"r","3":"f","4":"o","5":"r","6":"m","7":"a","8":"n","9":"c","10":"e","11":" ","12":"o","13":"p","14":"t","15":"i","16":"m","17":"i","18":"z","19":"a","20":"t","21":"i","22":"o","23":"n","24":" ","25":"i","26":"n","27":" ","28":"c","29":"r","30":"i","31":"t","32":"i","33":"c","34":"a","35":"l","36":" ","37":"c","38":"o","39":"d","40":"e","explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-proxy-pattern-74';

UPDATE questions 
SET options = '[{"id":"a","text":"Prevents modification of the Singleton’s properties","isCorrect":true,"explanation":""},{"id":"b","text":"Allows multiple instances to be created","isCorrect":false,"explanation":""},{"id":"c","text":"Automatically resets the Singleton","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-singleton-pattern-79';

UPDATE questions 
SET options = '[{"id":"a","text":"Both are accessible throughout the application","isCorrect":true,"explanation":""},{"id":"b","text":"Both prevent mutation of values","isCorrect":false,"explanation":""},{"id":"c","text":"Both are automatically garbage collected","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-singleton-pattern-83';

UPDATE questions 
SET options = '[{"id":"o1","text":"<header>, <main>, <footer>, <section>, <article>, <nav>","isCorrect":true,"explanation":""},{"id":"o2","text":"<div>, <span>, <p>, <b>, <i>","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'html-01-html5';

UPDATE questions 
SET options = '[{"id":"a","text":"`Lydia` and `undefined`","isCorrect":false,"explanation":"`name` is hoisted but not yet assigned, so it''s `undefined`, not `''Lydia''`."},{"id":"b","text":"`Lydia` and `ReferenceError`","isCorrect":false,"explanation":"`name` is `undefined`, not `''Lydia''`."},{"id":"c","text":"`ReferenceError` and `21`","isCorrect":false,"explanation":"`name` is accessible (as `undefined`), but `age` throws `ReferenceError` before assignment."},{"id":"d","text":"`undefined` and `ReferenceError`","isCorrect":true,"explanation":"Correct: `var` is hoisted and initialized to `undefined`; `let` is in TDZ and throws `ReferenceError`."}]'
WHERE metadata->>'original_id' = 'javascript-1-25QA-js-q-001';

UPDATE questions 
SET options = '[{"id":"a","text":"`0 1 2` and `0 1 2`","isCorrect":false,"explanation":""},{"id":"b","text":"`0 1 2` and `3 3 3`","isCorrect":false,"explanation":""},{"id":"c","text":"`3 3 3` and `0 1 2`","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-1-25QA-js-q-002';

UPDATE questions 
SET options = '[{"id":"a","text":"`20` and `62.83185307179586`","isCorrect":false,"explanation":""},{"id":"b","text":"`20` and `NaN`","isCorrect":true,"explanation":""},{"id":"c","text":"`20` and `63`","isCorrect":false,"explanation":""},{"id":"d","text":"`NaN` and `63`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-1-25QA-js-q-003';

UPDATE questions 
SET options = '[{"id":"a","text":"`1` and `false`","isCorrect":true,"explanation":""},{"id":"b","text":"`false` and `NaN`","isCorrect":false,"explanation":""},{"id":"c","text":"`false` and `false`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-1-25QA-js-q-004';

UPDATE questions 
SET options = '[{"id":"a","text":"`mouse.bird.size` is not valid","isCorrect":true,"explanation":""},{"id":"b","text":"`mouse[bird.size]` is not valid","isCorrect":false,"explanation":""},{"id":"c","text":"`mouse[bird[\"size\"]]` is not valid","isCorrect":false,"explanation":""},{"id":"d","text":"All of them are valid","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-1-25QA-js-q-005';

UPDATE questions 
SET options = '[{"id":"a","text":"`Hello`","isCorrect":true,"explanation":""},{"id":"b","text":"`Hey!`","isCorrect":false,"explanation":""},{"id":"c","text":"`undefined`","isCorrect":false,"explanation":""},{"id":"d","text":"`ReferenceError`","isCorrect":false,"explanation":""},{"id":"e","text":"`TypeError`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-1-25QA-js-q-006';

UPDATE questions 
SET options = '[{"id":"a","text":"`true` `false` `true`","isCorrect":false,"explanation":""},{"id":"b","text":"`false` `false` `true`","isCorrect":false,"explanation":""},{"id":"c","text":"`true` `false` `false`","isCorrect":true,"explanation":""},{"id":"d","text":"`false` `true` `true`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-1-25QA-js-q-007';

UPDATE questions 
SET options = '[{"id":"a","text":"`orange`","isCorrect":false,"explanation":""},{"id":"b","text":"`purple`","isCorrect":false,"explanation":""},{"id":"c","text":"`green`","isCorrect":false,"explanation":""},{"id":"d","text":"`TypeError`","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-1-25QA-js-q-008';

UPDATE questions 
SET options = '[{"id":"a","text":"`{}`","isCorrect":true,"explanation":""},{"id":"b","text":"`ReferenceError: greetign is not defined`","isCorrect":false,"explanation":""},{"id":"c","text":"`undefined`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-1-25QA-js-q-009';

UPDATE questions 
SET options = '[{"id":"a","text":"Nothing, this is totally fine!","isCorrect":true,"explanation":""},{"id":"b","text":"`SyntaxError`. You cannot add properties to a function this way.","isCorrect":false,"explanation":""},{"id":"c","text":"`\"Woof\"` gets logged.","isCorrect":false,"explanation":""},{"id":"d","text":"`ReferenceError`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-1-25QA-js-q-010';

UPDATE questions 
SET options = '[{"id":"a","text":"`TypeError`","isCorrect":true,"explanation":""},{"id":"b","text":"`SyntaxError`","isCorrect":false,"explanation":""},{"id":"c","text":"`Lydia Hallie`","isCorrect":false,"explanation":""},{"id":"d","text":"`undefined` `undefined`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-1-25QA-js-q-011';

UPDATE questions 
SET options = '[{"id":"a","text":"`Person {firstName: \"Lydia\", lastName: \"Hallie\"}` and `undefined`","isCorrect":true,"explanation":""},{"id":"b","text":"`Person {firstName: \"Lydia\", lastName: \"Hallie\"}` and `Person {firstName: \"Sarah\", lastName: \"Smith\"}`","isCorrect":false,"explanation":""},{"id":"c","text":"`Person {firstName: \"Lydia\", lastName: \"Hallie\"}` and `{}`","isCorrect":false,"explanation":""},{"id":"d","text":"`Person {firstName: \"Lydia\", lastName: \"Hallie\"}` and `ReferenceError`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-1-25QA-js-q-012';

UPDATE questions 
SET options = '[{"id":"a","text":"Target > Capturing > Bubbling","isCorrect":false,"explanation":""},{"id":"b","text":"Bubbling > Target > Capturing","isCorrect":false,"explanation":""},{"id":"c","text":"Target > Bubbling > Capturing","isCorrect":false,"explanation":""},{"id":"d","text":"Capturing > Target > Bubbling","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-1-25QA-js-q-013';

UPDATE questions 
SET options = '[{"id":"a","text":"`NaN`","isCorrect":false,"explanation":""},{"id":"b","text":"`TypeError`","isCorrect":false,"explanation":""},{"id":"c","text":"`\"12\"`","isCorrect":true,"explanation":""},{"id":"d","text":"`3`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-1-25QA-js-q-015';

UPDATE questions 
SET options = '[{"id":"a","text":"`1` `1` `2`","isCorrect":false,"explanation":""},{"id":"b","text":"`1` `2` `2`","isCorrect":false,"explanation":""},{"id":"c","text":"`0` `2` `2`","isCorrect":true,"explanation":""},{"id":"d","text":"`0` `1` `2`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-1-25QA-js-q-016';

UPDATE questions 
SET options = '[{"id":"a","text":"`\"Lydia\"` `21` `[\"\", \" is \", \" years old\"]`","isCorrect":false,"explanation":""},{"id":"b","text":"`[\"\", \" is \", \" years old\"]` `\"Lydia\"` `21`","isCorrect":true,"explanation":""},{"id":"c","text":"`\"Lydia\"` `[\"\", \" is \", \" years old\"]` `21`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-1-25QA-js-q-017';

UPDATE questions 
SET options = '[{"id":"a","text":"`You are an adult!`","isCorrect":false,"explanation":""},{"id":"b","text":"`You are still an adult.`","isCorrect":false,"explanation":""},{"id":"c","text":"`Hmm.. You don''t have an age I guess`","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-1-25QA-js-q-018';

UPDATE questions 
SET options = '[{"id":"a","text":"`\"number\"`","isCorrect":false,"explanation":""},{"id":"b","text":"`\"array\"`","isCorrect":false,"explanation":""},{"id":"c","text":"`\"object\"`","isCorrect":true,"explanation":""},{"id":"d","text":"`\"NaN\"`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-1-25QA-js-q-019';

UPDATE questions 
SET options = '[{"id":"a","text":"`21`","isCorrect":false,"explanation":""},{"id":"b","text":"`undefined`","isCorrect":false,"explanation":""},{"id":"c","text":"`ReferenceError`","isCorrect":true,"explanation":""},{"id":"d","text":"`TypeError`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-1-25QA-js-q-020';

UPDATE questions 
SET options = '[{"id":"a","text":"`105`","isCorrect":true,"explanation":""},{"id":"b","text":"`\"105\"`","isCorrect":false,"explanation":""},{"id":"c","text":"`TypeError`","isCorrect":false,"explanation":""},{"id":"d","text":"`\"10*10+5\"`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-1-25QA-js-q-021';

UPDATE questions 
SET options = '[{"id":"a","text":"Forever, the data doesn''t get lost.","isCorrect":false,"explanation":""},{"id":"b","text":"When the user closes the tab.","isCorrect":true,"explanation":""},{"id":"c","text":"When the user closes the entire browser, not only the tab.","isCorrect":false,"explanation":""},{"id":"d","text":"When the user shuts off their computer.","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-1-25QA-js-q-022';

UPDATE questions 
SET options = '[{"id":"a","text":"`8`","isCorrect":false,"explanation":""},{"id":"b","text":"`10`","isCorrect":true,"explanation":""},{"id":"c","text":"`SyntaxError`","isCorrect":false,"explanation":""},{"id":"d","text":"`ReferenceError`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-1-25QA-js-q-023';

UPDATE questions 
SET options = '[{"id":"a","text":"`false` `true` `false` `true`","isCorrect":false,"explanation":""},{"id":"b","text":"`false` `true` `true` `true`","isCorrect":false,"explanation":""},{"id":"c","text":"`true` `true` `false` `true`","isCorrect":true,"explanation":""},{"id":"d","text":"`true` `true` `true` `true`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-1-25QA-js-q-024';

UPDATE questions 
SET options = '[{"id":"a","text":"`{ a: \"one\", b: \"two\" }`","isCorrect":false,"explanation":""},{"id":"b","text":"`{ b: \"two\", a: \"three\" }`","isCorrect":false,"explanation":""},{"id":"c","text":"`{ a: \"three\", b: \"two\" }`","isCorrect":true,"explanation":""},{"id":"d","text":"`SyntaxError`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-1-25QA-js-q-025';

UPDATE questions 
SET options = '[{"id":"a","text":"`false` `null` `[]`","isCorrect":false,"explanation":""},{"id":"b","text":"`null` `\"\"` `true`","isCorrect":false,"explanation":""},{"id":"c","text":"`{}` `\"\"` `[]`","isCorrect":true,"explanation":""},{"id":"d","text":"`null` `null` `true`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-101–125QA-js-q-101';

UPDATE questions 
SET options = '[{"id":"a","text":"`I have resolved!`, `second` and `I have resolved!`, `second`","isCorrect":false,"explanation":""},{"id":"b","text":"`second`, `I have resolved!` and `second`, `I have resolved!`","isCorrect":false,"explanation":""},{"id":"c","text":"`I have resolved!`, `second` and `second`, `I have resolved!`","isCorrect":false,"explanation":""},{"id":"d","text":"`second`, `I have resolved!` and `I have resolved!`, `second`","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-101–125QA-js-q-102';

UPDATE questions 
SET options = '[{"id":"a","text":"`3`, `NaN`, `NaN`","isCorrect":false,"explanation":""},{"id":"b","text":"`3`, `7`, `NaN`","isCorrect":false,"explanation":""},{"id":"c","text":"`3`, `Lydia2`, `[object Object]2`","isCorrect":true,"explanation":""},{"id":"d","text":"`\"12\"`, `Lydia2`, `[object Object]2`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-101–125QA-js-q-103';

UPDATE questions 
SET options = '[{"id":"a","text":"`5`","isCorrect":false,"explanation":""},{"id":"b","text":"`Promise {<pending>: 5}`","isCorrect":false,"explanation":""},{"id":"c","text":"`Promise {<fulfilled>: 5}`","isCorrect":true,"explanation":""},{"id":"d","text":"`Error`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-101–125QA-js-q-104';

UPDATE questions 
SET options = '[{"id":"a","text":"`Not the same!`","isCorrect":false,"explanation":""},{"id":"b","text":"`They are the same!`","isCorrect":true,"explanation":""},{"id":"c","text":"`ReferenceError`","isCorrect":false,"explanation":""},{"id":"d","text":"`SyntaxError`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-101–125QA-js-q-105';

UPDATE questions 
SET options = '[{"id":"a","text":"`true`","isCorrect":false,"explanation":""},{"id":"b","text":"`false`","isCorrect":false,"explanation":""},{"id":"c","text":"`undefined`","isCorrect":false,"explanation":""},{"id":"d","text":"`TypeError`","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-101–125QA-js-q-106';

UPDATE questions 
SET options = '[{"id":"a","text":"`true`","isCorrect":true,"explanation":""},{"id":"b","text":"`false`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-101–125QA-js-q-107';

UPDATE questions 
SET options = '[{"id":"a","text":"`All of them`","isCorrect":false,"explanation":""},{"id":"b","text":"`map` `reduce` `slice` `splice`","isCorrect":false,"explanation":""},{"id":"c","text":"`map` `slice` `splice`","isCorrect":false,"explanation":""},{"id":"d","text":"`splice`","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-101–125QA-js-q-108';

UPDATE questions 
SET options = '[{"id":"a","text":"`[''🍕'', ''🍫'', ''🥑'', ''🍔'']`","isCorrect":true,"explanation":""},{"id":"b","text":"`[''🍝'', ''🍫'', ''🥑'', ''🍔'']`","isCorrect":false,"explanation":""},{"id":"c","text":"`[''🍝'', ''🍕'', ''🍫'', ''🥑'', ''🍔'']`","isCorrect":false,"explanation":""},{"id":"d","text":"`ReferenceError`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-101–125QA-js-q-109';

UPDATE questions 
SET options = '[{"id":"a","text":"Parses JSON to a JavaScript value","isCorrect":true,"explanation":""},{"id":"b","text":"Parses a JavaScript object to JSON","isCorrect":false,"explanation":""},{"id":"c","text":"Parses any JavaScript value to JSON","isCorrect":false,"explanation":""},{"id":"d","text":"Parses JSON to a JavaScript object only","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-101–125QA-js-q-110';

UPDATE questions 
SET options = '[{"id":"a","text":"`Lydia`","isCorrect":false,"explanation":""},{"id":"b","text":"`Sarah`","isCorrect":false,"explanation":""},{"id":"c","text":"`undefined`","isCorrect":false,"explanation":""},{"id":"d","text":"`ReferenceError`","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-101–125QA-js-q-111';

UPDATE questions 
SET options = '[{"id":"a","text":"`a` and `a`","isCorrect":false,"explanation":""},{"id":"b","text":"`a` and `undefined`","isCorrect":false,"explanation":""},{"id":"c","text":"`[''a'', ''b'', ''c'']` and `a`","isCorrect":true,"explanation":""},{"id":"d","text":"`a` and `[''a'', ''b'', ''c'']`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-101–125QA-js-q-112';

UPDATE questions 
SET options = '[{"id":"a","text":"`I love to program`","isCorrect":true,"explanation":""},{"id":"b","text":"`undefined to program`","isCorrect":false,"explanation":""},{"id":"c","text":"`${(x => x)(''I love'') to program`","isCorrect":false,"explanation":""},{"id":"d","text":"`TypeError`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-101–125QA-js-q-113';

UPDATE questions 
SET options = '[{"id":"a","text":"The `setInterval` callback won''t be invoked","isCorrect":false,"explanation":""},{"id":"b","text":"The `setInterval` callback gets invoked once","isCorrect":false,"explanation":""},{"id":"c","text":"The `setInterval` callback will still be called every second","isCorrect":true,"explanation":""},{"id":"d","text":"We never invoked `config.alert()`, config is `null`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-101–125QA-js-q-114';

UPDATE questions 
SET options = '[{"id":"a","text":"`1`","isCorrect":false,"explanation":""},{"id":"b","text":"`2`","isCorrect":true,"explanation":""},{"id":"c","text":"`2 and 3`","isCorrect":false,"explanation":""},{"id":"d","text":"`All of them`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-101–125QA-js-q-115';

UPDATE questions 
SET options = '[{"id":"a","text":"`{name: \"Sarah\", age: 22}`","isCorrect":false,"explanation":""},{"id":"b","text":"`{name: \"Sarah\", age: 23}`","isCorrect":false,"explanation":""},{"id":"c","text":"`{name: \"Lydia\", age: 22}`","isCorrect":true,"explanation":""},{"id":"d","text":"`{name: \"Lydia\", age: 23}`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-101–125QA-js-q-116';

UPDATE questions 
SET options = '[{"id":"a","text":"`sumValues([...1, 2, 3])`","isCorrect":false,"explanation":""},{"id":"b","text":"`sumValues([...[1, 2, 3]])`","isCorrect":false,"explanation":""},{"id":"c","text":"`sumValues(...[1, 2, 3])`","isCorrect":true,"explanation":""},{"id":"d","text":"`sumValues([1, 2, 3])`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-101–125QA-js-q-117';

UPDATE questions 
SET options = '[{"id":"a","text":"`🤠`","isCorrect":false,"explanation":""},{"id":"b","text":"`🥰`","isCorrect":true,"explanation":""},{"id":"c","text":"`SyntaxError`","isCorrect":false,"explanation":""},{"id":"d","text":"`ReferenceError`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-101–125QA-js-q-118';

UPDATE questions 
SET options = '[{"id":"a","text":"`undefined` `undefined` `undefined` `undefined`","isCorrect":false,"explanation":""},{"id":"b","text":"`Mara` `undefined` `Lydia Hallie` `ReferenceError`","isCorrect":true,"explanation":""},{"id":"c","text":"`Mara` `null` `Lydia Hallie` `null`","isCorrect":false,"explanation":""},{"id":"d","text":"`null` `ReferenceError` `null` `ReferenceError`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-101–125QA-js-q-119';

UPDATE questions 
SET options = '[{"id":"a","text":"`We have to buy bananas!`","isCorrect":false,"explanation":""},{"id":"b","text":"`We don''t have to buy bananas!`","isCorrect":true,"explanation":""},{"id":"c","text":"`undefined`","isCorrect":false,"explanation":""},{"id":"d","text":"`1`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-101–125QA-js-q-120';

UPDATE questions 
SET options = '[{"id":"a","text":"`function language(lang) { this.languages.push(lang }`","isCorrect":false,"explanation":""},{"id":"b","text":"`0`","isCorrect":false,"explanation":""},{"id":"c","text":"`[]`","isCorrect":false,"explanation":""},{"id":"d","text":"`undefined`","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-101–125QA-js-q-121';

UPDATE questions 
SET options = '[{"id":"a","text":"`false` `true`","isCorrect":false,"explanation":""},{"id":"b","text":"`true` `false`","isCorrect":false,"explanation":""},{"id":"c","text":"`false` `false`","isCorrect":true,"explanation":""},{"id":"d","text":"`true` `true`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-101–125QA-js-q-122';

UPDATE questions 
SET options = '[{"id":"a","text":"`4` `5` `6`","isCorrect":true,"explanation":""},{"id":"b","text":"`6` `5` `4`","isCorrect":false,"explanation":""},{"id":"c","text":"`4` `function` `function`","isCorrect":false,"explanation":""},{"id":"d","text":"`undefined` `undefined` `6`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-101–125QA-js-q-123';

UPDATE questions 
SET options = '[{"id":"a","text":"`Promise {1}` `Promise {2}` `Promise {3}`","isCorrect":false,"explanation":""},{"id":"b","text":"`Promise {<pending>}` `Promise {<pending>}` `Promise {<pending>}`","isCorrect":false,"explanation":""},{"id":"c","text":"`1` `2` `3`","isCorrect":true,"explanation":""},{"id":"d","text":"`undefined` `undefined` `undefined`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-101–125QA-js-q-124';

UPDATE questions 
SET options = '[{"id":"a","text":"`1` `2` `3`","isCorrect":false,"explanation":""},{"id":"b","text":"`{1: 1}` `{2: 2}` `{3: 3}`","isCorrect":false,"explanation":""},{"id":"c","text":"`{ 1: undefined }` `undefined` `undefined`","isCorrect":false,"explanation":""},{"id":"d","text":"`undefined` `undefined` `undefined`","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-101–125QA-js-q-125';

UPDATE questions 
SET options = '[{"id":"a","text":"`1` `2`","isCorrect":false,"explanation":""},{"id":"b","text":"`1` `2` `3`","isCorrect":false,"explanation":""},{"id":"c","text":"`1` `2` `4`","isCorrect":true,"explanation":""},{"id":"d","text":"`1` `3` `4`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-26-50QA-js-q-027';

UPDATE questions 
SET options = '[{"id":"a","text":"`\"Just give Lydia pizza already!\"`","isCorrect":true,"explanation":""},{"id":"b","text":"`TypeError: not a function`","isCorrect":false,"explanation":""},{"id":"c","text":"`SyntaxError`","isCorrect":false,"explanation":""},{"id":"d","text":"`undefined`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-26-50QA-js-q-028';

UPDATE questions 
SET options = '[{"id":"a","text":"`123`","isCorrect":false,"explanation":""},{"id":"b","text":"`456`","isCorrect":true,"explanation":""},{"id":"c","text":"`undefined`","isCorrect":false,"explanation":""},{"id":"d","text":"`ReferenceError`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-26-50QA-js-q-029';

UPDATE questions 
SET options = '[{"id":"a","text":"`First` `Second` `Third`","isCorrect":false,"explanation":""},{"id":"b","text":"`First` `Third` `Second`","isCorrect":true,"explanation":""},{"id":"c","text":"`Second` `First` `Third`","isCorrect":false,"explanation":""},{"id":"d","text":"`Second` `Third` `First`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-26-50QA-js-q-030';

UPDATE questions 
SET options = '[{"id":"a","text":"Outer `div`","isCorrect":false,"explanation":""},{"id":"b","text":"Inner `div`","isCorrect":false,"explanation":""},{"id":"c","text":"`button`","isCorrect":true,"explanation":""},{"id":"d","text":"An array of all nested elements.","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-26-50QA-js-q-031';

UPDATE questions 
SET options = '[{"id":"a","text":"`p` `div`","isCorrect":true,"explanation":""},{"id":"b","text":"`div` `p`","isCorrect":false,"explanation":""},{"id":"c","text":"`p`","isCorrect":false,"explanation":""},{"id":"d","text":"`div`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-26-50QA-js-q-032';

UPDATE questions 
SET options = '[{"id":"a","text":"`undefined is 21` `Lydia is 21`","isCorrect":false,"explanation":""},{"id":"b","text":"`function` `function`","isCorrect":false,"explanation":""},{"id":"c","text":"`Lydia is 21` `Lydia is 21`","isCorrect":false,"explanation":""},{"id":"d","text":"`Lydia is 21` `function`","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-26-50QA-js-q-033';

UPDATE questions 
SET options = '[{"id":"a","text":"`\"object\"`","isCorrect":false,"explanation":""},{"id":"b","text":"`\"number\"`","isCorrect":true,"explanation":""},{"id":"c","text":"`\"function\"`","isCorrect":false,"explanation":""},{"id":"d","text":"`\"undefined\"`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-26-50QA-js-q-034';

UPDATE questions 
SET options = '[{"id":"a","text":"`0`, `''''`, `undefined`","isCorrect":true,"explanation":""},{"id":"b","text":"`0`, `new Number(0)`, `''''`, `new Boolean(false)`, `undefined`","isCorrect":false,"explanation":""},{"id":"c","text":"`0`, `''''`, `new Boolean(false)`, `undefined`","isCorrect":false,"explanation":""},{"id":"d","text":"All of them are falsy","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-26-50QA-js-q-035';

UPDATE questions 
SET options = '[{"id":"a","text":"`\"number\"`","isCorrect":false,"explanation":""},{"id":"b","text":"`\"string\"`","isCorrect":true,"explanation":""},{"id":"c","text":"`\"object\"`","isCorrect":false,"explanation":""},{"id":"d","text":"`\"undefined\"`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-26-50QA-js-q-036';

UPDATE questions 
SET options = '[{"id":"a","text":"`[1, 2, 3, null x 7, 11]`","isCorrect":false,"explanation":""},{"id":"b","text":"`[1, 2, 3, 11]`","isCorrect":false,"explanation":""},{"id":"c","text":"`[1, 2, 3, empty x 7, 11]`","isCorrect":true,"explanation":""},{"id":"d","text":"`SyntaxError`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-26-50QA-js-q-037';

UPDATE questions 
SET options = '[{"id":"a","text":"`1` `undefined` `2`","isCorrect":true,"explanation":""},{"id":"b","text":"`undefined` `undefined` `undefined`","isCorrect":false,"explanation":""},{"id":"c","text":"`1` `1` `2`","isCorrect":false,"explanation":""},{"id":"d","text":"`1` `undefined` `undefined`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-26-50QA-js-q-038';

UPDATE questions 
SET options = '[{"id":"a","text":"primitive or object","isCorrect":true,"explanation":""},{"id":"b","text":"function or object","isCorrect":false,"explanation":""},{"id":"c","text":"trick question! only objects","isCorrect":false,"explanation":""},{"id":"d","text":"number or object","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-26-50QA-js-q-039';

UPDATE questions 
SET options = '[{"id":"a","text":"`[0, 1, 2, 3, 1, 2]`","isCorrect":false,"explanation":""},{"id":"b","text":"`[6, 1, 2]`","isCorrect":false,"explanation":""},{"id":"c","text":"`[1, 2, 0, 1, 2, 3]`","isCorrect":true,"explanation":""},{"id":"d","text":"`[1, 2, 6]`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-26-50QA-js-q-040';

UPDATE questions 
SET options = '[{"id":"a","text":"`false` `true` `false`","isCorrect":false,"explanation":""},{"id":"b","text":"`false` `false` `true`","isCorrect":true,"explanation":""},{"id":"c","text":"`false` `true` `true`","isCorrect":false,"explanation":""},{"id":"d","text":"`true` `true` `false`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-26-50QA-js-q-041';

UPDATE questions 
SET options = '[{"id":"a","text":"a unique id","isCorrect":true,"explanation":""},{"id":"b","text":"the amount of milliseconds specified","isCorrect":false,"explanation":""},{"id":"c","text":"the passed function","isCorrect":false,"explanation":""},{"id":"d","text":"`undefined`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-26-50QA-js-q-042';

UPDATE questions 
SET options = '[{"id":"a","text":"`[\"L\", \"y\", \"d\", \"i\", \"a\"]`","isCorrect":true,"explanation":""},{"id":"b","text":"`[\"Lydia\"]`","isCorrect":false,"explanation":""},{"id":"c","text":"`[[], \"Lydia\"]`","isCorrect":false,"explanation":""},{"id":"d","text":"`[[\"L\", \"y\", \"d\", \"i\", \"a\"]]`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-26-50QA-js-q-043';

UPDATE questions 
SET options = '[{"id":"a","text":"`[0, 10], [10, 20]`","isCorrect":false,"explanation":""},{"id":"b","text":"`20, 20`","isCorrect":false,"explanation":""},{"id":"c","text":"`10, 20`","isCorrect":true,"explanation":""},{"id":"d","text":"`0, 10 and 10, 20`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-26-50QA-js-q-044';

UPDATE questions 
SET options = '[{"id":"a","text":"`\"one\"`","isCorrect":false,"explanation":""},{"id":"b","text":"`\"two\"`","isCorrect":true,"explanation":""},{"id":"c","text":"`\"two\" \"one\"`","isCorrect":false,"explanation":""},{"id":"d","text":"`\"one\" \"two\"`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-26-50QA-js-q-045';

UPDATE questions 
SET options = '[{"id":"a","text":"`null`","isCorrect":false,"explanation":""},{"id":"b","text":"`[null]`","isCorrect":false,"explanation":""},{"id":"c","text":"`[{}]`","isCorrect":false,"explanation":""},{"id":"d","text":"`[{ name: \"Lydia\" }]`","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-26-50QA-js-q-046';

UPDATE questions 
SET options = '[{"id":"a","text":"`{ name: \"Lydia\" }, { age: 21 }`","isCorrect":false,"explanation":""},{"id":"b","text":"`\"name\", \"age\"`","isCorrect":true,"explanation":""},{"id":"c","text":"`\"Lydia\", 21`","isCorrect":false,"explanation":""},{"id":"d","text":"`[\"name\", \"Lydia\"], [\"age\", 21]`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-26-50QA-js-q-047';

UPDATE questions 
SET options = '[{"id":"a","text":"`\"345\"`","isCorrect":false,"explanation":""},{"id":"b","text":"`\"75\"`","isCorrect":true,"explanation":""},{"id":"c","text":"`12`","isCorrect":false,"explanation":""},{"id":"d","text":"`\"12\"`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-26-50QA-js-q-048';

UPDATE questions 
SET options = '[{"id":"a","text":"`42`","isCorrect":false,"explanation":""},{"id":"b","text":"`\"42\"`","isCorrect":false,"explanation":""},{"id":"c","text":"`7`","isCorrect":true,"explanation":""},{"id":"d","text":"`NaN`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-26-50QA-js-q-049';

UPDATE questions 
SET options = '[{"id":"a","text":"`[]`","isCorrect":false,"explanation":""},{"id":"b","text":"`[null, null, null]`","isCorrect":false,"explanation":""},{"id":"c","text":"`[undefined, undefined, undefined]`","isCorrect":true,"explanation":""},{"id":"d","text":"`[ 3 x empty ]`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-26-50QA-js-q-050';

UPDATE questions 
SET options = '[{"id":"a","text":"`{ name: \"Lydia\" }, \"1997\"`","isCorrect":true,"explanation":""},{"id":"b","text":"`{ name: \"Sarah\" }, \"1998\"`","isCorrect":false,"explanation":""},{"id":"c","text":"`{ name: \"Lydia\" }, \"1998\"`","isCorrect":false,"explanation":""},{"id":"d","text":"`{ name: \"Sarah\" }, \"1997\"`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-51-75QA-js-q-051';

UPDATE questions 
SET options = '[{"id":"a","text":"`It worked! Hello world!`","isCorrect":false,"explanation":""},{"id":"b","text":"`Oh no an error: undefined`","isCorrect":false,"explanation":""},{"id":"c","text":"`SyntaxError: can only throw Error objects`","isCorrect":false,"explanation":""},{"id":"d","text":"`Oh no an error: Hello world!`","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-51-75QA-js-q-052';

UPDATE questions 
SET options = '[{"id":"a","text":"`\"Lamborghini\"`","isCorrect":false,"explanation":""},{"id":"b","text":"`\"Maserati\"`","isCorrect":true,"explanation":""},{"id":"c","text":"`ReferenceError`","isCorrect":false,"explanation":""},{"id":"d","text":"`TypeError`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-51-75QA-js-q-053';

UPDATE questions 
SET options = '[{"id":"a","text":"`\"undefined\", \"number\"`","isCorrect":true,"explanation":""},{"id":"b","text":"`\"number\", \"number\"`","isCorrect":false,"explanation":""},{"id":"c","text":"`\"object\", \"number\"`","isCorrect":false,"explanation":""},{"id":"d","text":"`\"number\", \"undefined\"`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-51-75QA-js-q-054';

UPDATE questions 
SET options = '[{"id":"a","text":"`\"Woof I am Mara\"`, `TypeError`","isCorrect":true,"explanation":""},{"id":"b","text":"`\"Woof I am Mara\"`, `\"Woof I am Mara\"`","isCorrect":false,"explanation":""},{"id":"c","text":"`\"Woof I am Mara\"`, `undefined`","isCorrect":false,"explanation":""},{"id":"d","text":"`TypeError`, `TypeError`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-51-75QA-js-q-055';

UPDATE questions 
SET options = '[{"id":"a","text":"`[1, 1, 2, 3, 4]`","isCorrect":false,"explanation":""},{"id":"b","text":"`[1, 2, 3, 4]`","isCorrect":false,"explanation":""},{"id":"c","text":"`{1, 1, 2, 3, 4}`","isCorrect":false,"explanation":""},{"id":"d","text":"`{1, 2, 3, 4}`","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-51-75QA-js-q-056';

UPDATE questions 
SET options = '[{"id":"a","text":"`10`","isCorrect":false,"explanation":""},{"id":"b","text":"`11`","isCorrect":false,"explanation":""},{"id":"c","text":"`Error`","isCorrect":true,"explanation":""},{"id":"d","text":"`NaN`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-51-75QA-js-q-057';

UPDATE questions 
SET options = '[{"id":"a","text":"`false`, `true`","isCorrect":true,"explanation":""},{"id":"b","text":"`\"Lydia\"`, `21`","isCorrect":false,"explanation":""},{"id":"c","text":"`true`, `true`","isCorrect":false,"explanation":""},{"id":"d","text":"`undefined`, `undefined`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-51-75QA-js-q-058';

UPDATE questions 
SET options = '[{"id":"a","text":"`[[1, 2, 3, 4, 5]]`","isCorrect":false,"explanation":""},{"id":"b","text":"`[1, 2, 3, 4, 5]`","isCorrect":false,"explanation":""},{"id":"c","text":"`1`","isCorrect":true,"explanation":""},{"id":"d","text":"`[1]`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-51-75QA-js-q-059';

UPDATE questions 
SET options = '[{"id":"a","text":"`{ admin: true, user: { name: \"Lydia\", age: 21 } }`","isCorrect":false,"explanation":""},{"id":"b","text":"`{ admin: true, name: \"Lydia\", age: 21 }`","isCorrect":true,"explanation":""},{"id":"c","text":"`{ admin: true, user: [\"Lydia\", 21] }`","isCorrect":false,"explanation":""},{"id":"d","text":"`{ admin: true }`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-51-75QA-js-q-060';

UPDATE questions 
SET options = '[{"id":"a","text":"`{ name: \"Lydia\", age: 21 }`, `[\"name\", \"age\"]`","isCorrect":false,"explanation":""},{"id":"b","text":"`{ name: \"Lydia\", age: 21 }`, `[\"name\"]`","isCorrect":true,"explanation":""},{"id":"c","text":"`{ name: \"Lydia\"}`, `[\"name\", \"age\"]`","isCorrect":false,"explanation":""},{"id":"d","text":"`{ name: \"Lydia\"}`, `[\"age\"]`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-51-75QA-js-q-061';

UPDATE questions 
SET options = '[{"id":"a","text":"`\"{\"level\":19, \"health\":90}\"`","isCorrect":true,"explanation":""},{"id":"b","text":"`\"{\"username\": \"lydiahallie\"}\"`","isCorrect":false,"explanation":""},{"id":"c","text":"`\"[\"level\", \"health\"]\"`","isCorrect":false,"explanation":""},{"id":"d","text":"`\"{\"username\": \"lydiahallie\", \"level\":19, \"health\":90}\"`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-51-75QA-js-q-062';

UPDATE questions 
SET options = '[{"id":"a","text":"`10`, `10`","isCorrect":true,"explanation":""},{"id":"b","text":"`10`, `11`","isCorrect":false,"explanation":""},{"id":"c","text":"`11`, `11`","isCorrect":false,"explanation":""},{"id":"d","text":"`11`, `12`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-51-75QA-js-q-063';

UPDATE questions 
SET options = '[{"id":"a","text":"`20`, `40`, `80`, `160`","isCorrect":false,"explanation":""},{"id":"b","text":"`20`, `40`, `20`, `40`","isCorrect":false,"explanation":""},{"id":"c","text":"`20`, `20`, `20`, `40`","isCorrect":true,"explanation":""},{"id":"d","text":"`NaN`, `NaN`, `20`, `40`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-51-75QA-js-q-064';

UPDATE questions 
SET options = '[{"id":"a","text":"`1` `2` and `3` `3` and `6` `4`","isCorrect":false,"explanation":""},{"id":"b","text":"`1` `2` and `2` `3` and `3` `4`","isCorrect":false,"explanation":""},{"id":"c","text":"`1` `undefined` and `2` `undefined` and `3` `undefined` and `4` `undefined`","isCorrect":false,"explanation":""},{"id":"d","text":"`1` `2` and `undefined` `3` and `undefined` `4`","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-51-75QA-js-q-065';

UPDATE questions 
SET options = '[{"id":"a","text":"1","isCorrect":false,"explanation":""},{"id":"b","text":"2","isCorrect":true,"explanation":""},{"id":"c","text":"3","isCorrect":false,"explanation":""},{"id":"d","text":"4","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-51-75QA-js-q-066';

UPDATE questions 
SET options = '[{"id":"a","text":"`running index.js`, `running sum.js`, `3`","isCorrect":false,"explanation":""},{"id":"b","text":"`running sum.js`, `running index.js`, `3`","isCorrect":true,"explanation":""},{"id":"c","text":"`running sum.js`, `3`, `running index.js`","isCorrect":false,"explanation":""},{"id":"d","text":"`running index.js`, `undefined`, `running sum.js`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-51-75QA-js-q-067';

UPDATE questions 
SET options = '[{"id":"a","text":"`true`, `true`, `false`","isCorrect":true,"explanation":""},{"id":"b","text":"`false`, `true`, `false`","isCorrect":false,"explanation":""},{"id":"c","text":"`true`, `false`, `true`","isCorrect":false,"explanation":""},{"id":"d","text":"`true`, `true`, `true`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-51-75QA-js-q-068';

UPDATE questions 
SET options = '[{"id":"a","text":"`\"Lydia Hallie\"`, `\"Lydia Hallie\"`","isCorrect":false,"explanation":""},{"id":"b","text":"`\" Lydia Hallie\"`, `\" Lydia Hallie\"`","isCorrect":false,"explanation":""},{"id":"c","text":"`\" Lydia Hallie\"`, `\"Lydia Hallie\"`","isCorrect":true,"explanation":""},{"id":"d","text":"`\"Lydia Hallie\"`, `\"Lyd\"`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-51-75QA-js-q-069';

UPDATE questions 
SET options = '[{"id":"a","text":"`\"🥑💻\"`","isCorrect":true,"explanation":""},{"id":"b","text":"`257548`","isCorrect":false,"explanation":""},{"id":"c","text":"A string containing their code points","isCorrect":false,"explanation":""},{"id":"d","text":"Error","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-51-75QA-js-q-070';

UPDATE questions 
SET options = '[{"id":"a","text":"`game.next(\"Yes\").value` and `game.next().value`","isCorrect":false,"explanation":""},{"id":"b","text":"`game.next.value(\"Yes\")` and `game.next.value()`","isCorrect":false,"explanation":""},{"id":"c","text":"`game.next().value` and `game.next(\"Yes\").value`","isCorrect":true,"explanation":""},{"id":"d","text":"`game.next.value()` and `game.next.value(\"Yes\")`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-51-75QA-js-q-071';

UPDATE questions 
SET options = '[{"id":"a","text":"`Hello world!`","isCorrect":false,"explanation":""},{"id":"b","text":"`Hello` <br />&nbsp; &nbsp; &nbsp;`world`","isCorrect":false,"explanation":""},{"id":"c","text":"`Hello\nworld`","isCorrect":true,"explanation":""},{"id":"d","text":"`Hello\n` <br /> &nbsp; &nbsp; &nbsp;`world`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-51-75QA-js-q-072';

UPDATE questions 
SET options = '[{"id":"a","text":"`\"I made it!\"`","isCorrect":false,"explanation":""},{"id":"b","text":"`Promise {<resolved>: \"I made it!\"}`","isCorrect":false,"explanation":""},{"id":"c","text":"`Promise {<pending>}`","isCorrect":true,"explanation":""},{"id":"d","text":"`undefined`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-51-75QA-js-q-073';

UPDATE questions 
SET options = '[{"id":"a","text":"`[''apple'', ''banana'']`","isCorrect":false,"explanation":""},{"id":"b","text":"`2`","isCorrect":true,"explanation":""},{"id":"c","text":"`true`","isCorrect":false,"explanation":""},{"id":"d","text":"`undefined`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-51-75QA-js-q-074';

UPDATE questions 
SET options = '[{"id":"a","text":"`{ x: 100, y: 20 }`","isCorrect":false,"explanation":""},{"id":"b","text":"`{ x: 10, y: 20 }`","isCorrect":true,"explanation":""},{"id":"c","text":"`{ x: 100 }`","isCorrect":false,"explanation":""},{"id":"d","text":"`ReferenceError`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-51-75QA-js-q-075';

UPDATE questions 
SET options = '[{"id":"a","text":"`\"Lydia\"`","isCorrect":false,"explanation":""},{"id":"b","text":"`\"myName\"`","isCorrect":false,"explanation":""},{"id":"c","text":"`undefined`","isCorrect":false,"explanation":""},{"id":"d","text":"`ReferenceError`","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-76–100QA-js-q-076';

UPDATE questions 
SET options = '[{"id":"a","text":"`Calculated! 20` `Calculated! 20` `Calculated! 20`","isCorrect":false,"explanation":""},{"id":"b","text":"`Calculated! 20` `From cache! 20` `Calculated! 20`","isCorrect":false,"explanation":""},{"id":"c","text":"`Calculated! 20` `From cache! 20` `From cache! 20`","isCorrect":true,"explanation":""},{"id":"d","text":"`Calculated! 20` `From cache! 20` `Error`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-76–100QA-js-q-078';

UPDATE questions 
SET options = '[{"id":"a","text":"`0` `1` `2` `3` and `\"☕\"` `\"💻\"` `\"🍷\"` `\"🍫\"`","isCorrect":true,"explanation":""},{"id":"b","text":"`\"☕\"` `\"💻\"` `\"🍷\"` `\"🍫\"` and `\"☕\"` `\"💻\"` `\"🍷\"` `\"🍫\"`","isCorrect":false,"explanation":""},{"id":"c","text":"`\"☕\"` `\"💻\"` `\"🍷\"` `\"🍫\"` and `0` `1` `2` `3`","isCorrect":false,"explanation":""},{"id":"d","text":"`0` `1` `2` `3` and `{0: \"☕\", 1: \"💻\", 2: \"🍷\", 3: \"🍫\"}`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-76–100QA-js-q-079';

UPDATE questions 
SET options = '[{"id":"a","text":"`[\"1 + 2\", \"1 * 2\", \"1 / 2\"]`","isCorrect":false,"explanation":""},{"id":"b","text":"`[\"12\", 2, 0.5]`","isCorrect":false,"explanation":""},{"id":"c","text":"`[3, 2, 0.5]`","isCorrect":true,"explanation":""},{"id":"d","text":"`[1, 1, 1]`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-76–100QA-js-q-080';

UPDATE questions 
SET options = '[{"id":"a","text":"`Hi there,`","isCorrect":false,"explanation":""},{"id":"b","text":"`Hi there, undefined`","isCorrect":true,"explanation":""},{"id":"c","text":"`Hi there, null`","isCorrect":false,"explanation":""},{"id":"d","text":"`ReferenceError`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-76–100QA-js-q-081';

UPDATE questions 
SET options = '[{"id":"a","text":"`\"🥑\"` and `\"😍\"`","isCorrect":false,"explanation":""},{"id":"b","text":"`\"🥑\"` and `\"😎\"`","isCorrect":true,"explanation":""},{"id":"c","text":"`\"😍\"` and `\"😎\"`","isCorrect":false,"explanation":""},{"id":"d","text":"`\"😎\"` and `\"😎\"`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-76–100QA-js-q-082';

UPDATE questions 
SET options = '[{"id":"a","text":"`{ name: \"Lydia\", age: 21 }`","isCorrect":true,"explanation":""},{"id":"b","text":"`{ name: \"Lydia\", age: 21, city: \"Amsterdam\" }`","isCorrect":false,"explanation":""},{"id":"c","text":"`{ name: \"Lydia\", age: 21, city: undefined }`","isCorrect":false,"explanation":""},{"id":"d","text":"`\"Amsterdam\"`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-76–100QA-js-q-083';

UPDATE questions 
SET options = '[{"id":"a","text":"`\"Sorry, you''re too young.\"`","isCorrect":false,"explanation":""},{"id":"b","text":"`\"Yay! You''re old enough!\"`","isCorrect":false,"explanation":""},{"id":"c","text":"`ReferenceError`","isCorrect":true,"explanation":""},{"id":"d","text":"`undefined`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-76–100QA-js-q-084';

UPDATE questions 
SET options = '[{"id":"a","text":"The result of the `fetch` method.","isCorrect":false,"explanation":""},{"id":"b","text":"The result of the second invocation of the `fetch` method.","isCorrect":false,"explanation":""},{"id":"c","text":"The result of the callback in the previous `.then()`.","isCorrect":true,"explanation":""},{"id":"d","text":"It would always be undefined.","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-76–100QA-js-q-085';

UPDATE questions 
SET options = '[{"id":"a","text":"`!!name`","isCorrect":true,"explanation":""},{"id":"b","text":"`name`","isCorrect":false,"explanation":""},{"id":"c","text":"`new Boolean(name)`","isCorrect":false,"explanation":""},{"id":"d","text":"`name.length`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-76–100QA-js-q-086';

UPDATE questions 
SET options = '[{"id":"a","text":"`\"\"\"`","isCorrect":false,"explanation":""},{"id":"b","text":"`\"I\"`","isCorrect":true,"explanation":""},{"id":"c","text":"`SyntaxError`","isCorrect":false,"explanation":""},{"id":"d","text":"`undefined`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-76–100QA-js-q-087';

UPDATE questions 
SET options = '[{"id":"a","text":"`NaN`","isCorrect":false,"explanation":""},{"id":"b","text":"`20`","isCorrect":true,"explanation":""},{"id":"c","text":"`ReferenceError`","isCorrect":false,"explanation":""},{"id":"d","text":"`undefined`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-76–100QA-js-q-088';

UPDATE questions 
SET options = '[{"id":"a","text":"`{ default: function default(), name: \"Lydia\" }`","isCorrect":true,"explanation":""},{"id":"b","text":"`{ default: function default() }`","isCorrect":false,"explanation":""},{"id":"c","text":"`{ default: \"Hello world\", name: \"Lydia\" }`","isCorrect":false,"explanation":""},{"id":"d","text":"Global object of `module.js`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-76–100QA-js-q-089';

UPDATE questions 
SET options = '[{"id":"a","text":"`\"class\"`","isCorrect":false,"explanation":""},{"id":"b","text":"`\"function\"`","isCorrect":false,"explanation":""},{"id":"c","text":"`\"object\"`","isCorrect":true,"explanation":""},{"id":"d","text":"`\"string\"`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-76–100QA-js-q-090';

UPDATE questions 
SET options = '[{"id":"a","text":"`[1, 2, 3, 4, 5]`","isCorrect":false,"explanation":""},{"id":"b","text":"`[1, 2, 3, 5]`","isCorrect":false,"explanation":""},{"id":"c","text":"`[1, 2, 3, 4]`","isCorrect":false,"explanation":""},{"id":"d","text":"`Error`","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-76–100QA-js-q-091';

UPDATE questions 
SET options = '[{"id":"a","text":"`{ constructor: ...}` `{ constructor: ...}`","isCorrect":false,"explanation":""},{"id":"b","text":"`{}` `{ constructor: ...}`","isCorrect":false,"explanation":""},{"id":"c","text":"`{ constructor: ...}` `{}`","isCorrect":false,"explanation":""},{"id":"d","text":"`{ constructor: ...}` `undefined`","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-76–100QA-js-q-092';

UPDATE questions 
SET options = '[{"id":"a","text":"`name` `Lydia` and `age` `21`","isCorrect":true,"explanation":""},{"id":"b","text":"`[\"name\", \"Lydia\"]` and `[\"age\", 21]`","isCorrect":false,"explanation":""},{"id":"c","text":"`[\"name\", \"age\"]` and `undefined`","isCorrect":false,"explanation":""},{"id":"d","text":"`Error`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-76–100QA-js-q-093';

UPDATE questions 
SET options = '[{"id":"a","text":"`[\"banana\", \"apple\", \"pear\", \"orange\"]`","isCorrect":false,"explanation":""},{"id":"b","text":"`[[\"banana\", \"apple\"], \"pear\", \"orange\"]`","isCorrect":false,"explanation":""},{"id":"c","text":"`[\"banana\", \"apple\", [\"pear\"], \"orange\"]`","isCorrect":false,"explanation":""},{"id":"d","text":"`SyntaxError`","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-76–100QA-js-q-094';

UPDATE questions 
SET options = '[{"id":"a","text":"`a is bigger`, `6` and `b is bigger`, `3`","isCorrect":false,"explanation":""},{"id":"b","text":"`a is bigger`, `undefined` and `b is bigger`, `undefined`","isCorrect":true,"explanation":""},{"id":"c","text":"`undefined` and `undefined`","isCorrect":false,"explanation":""},{"id":"d","text":"`SyntaxError`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-76–100QA-js-q-095';

UPDATE questions 
SET options = '[{"id":"a","text":"`\"Lydia\"`","isCorrect":false,"explanation":""},{"id":"b","text":"`\"Sarah\"`","isCorrect":true,"explanation":""},{"id":"c","text":"`Error: cannot redeclare Person`","isCorrect":false,"explanation":""},{"id":"d","text":"`SyntaxError`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-76–100QA-js-q-096';

UPDATE questions 
SET options = '[{"id":"a","text":"`{Symbol(''a''): ''b''}` and `[\"{Symbol(''a'')\"]`","isCorrect":false,"explanation":""},{"id":"b","text":"`{}` and `[]`","isCorrect":false,"explanation":""},{"id":"c","text":"`{ a: \"b\" }` and `[\"a\"]`","isCorrect":false,"explanation":""},{"id":"d","text":"`{Symbol(''a''): ''b''}` and `[]`","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-76–100QA-js-q-097';

UPDATE questions 
SET options = '[{"id":"a","text":"`[1, [2, 3, 4]]` and `SyntaxError`","isCorrect":true,"explanation":""},{"id":"b","text":"`[1, [2, 3, 4]]` and `{ name: \"Lydia\", age: 21 }`","isCorrect":false,"explanation":""},{"id":"c","text":"`[1, 2, 3, 4]` and `{ name: \"Lydia\", age: 21 }`","isCorrect":false,"explanation":""},{"id":"d","text":"`Error` and `{ name: \"Lydia\", age: 21 }`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-76–100QA-js-q-098';

UPDATE questions 
SET options = '[{"id":"a","text":"`SyntaxError`","isCorrect":false,"explanation":""},{"id":"b","text":"`ReferenceError`","isCorrect":false,"explanation":""},{"id":"c","text":"`TypeError`","isCorrect":true,"explanation":""},{"id":"d","text":"`undefined`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-76–100QA-js-q-099';

UPDATE questions 
SET options = '[{"id":"a","text":"`possible! You should see a therapist after so much JavaScript lol`","isCorrect":false,"explanation":""},{"id":"b","text":"`Impossible! You should see a therapist after so much JavaScript lol`","isCorrect":true,"explanation":""},{"id":"c","text":"`possible! You shouldn''t see a therapist after so much JavaScript lol`","isCorrect":false,"explanation":""},{"id":"d","text":"`Impossible! You shouldn''t see a therapist after so much JavaScript lol`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-76–100QA-js-q-100';

UPDATE questions 
SET options = '[{"id":"a","text":"`generateStaticParams`: App Router; `getStaticPaths`: Pages Router","isCorrect":true,"explanation":""},{"id":"b","text":"They are the same function","isCorrect":false,"explanation":""},{"id":"c","text":"`getStaticPaths` works in App Router","isCorrect":false,"explanation":""},{"id":"d","text":"`generateStaticParams` is for SSR","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'next-21-40-nextjs-q25';

UPDATE questions 
SET options = '[{"id":"a","text":"Client-side navigation in Client Components","isCorrect":true,"explanation":""},{"id":"b","text":"Data fetching in Server Components","isCorrect":false,"explanation":""},{"id":"c","text":"Server-side redirects","isCorrect":false,"explanation":""},{"id":"d","text":"Only works in Pages Router","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'next-21-40-nextjs-q29';

UPDATE questions 
SET options = '[{"id":"a","text":"Customize Webpack, Babel, env vars, and experimental features","isCorrect":true,"explanation":""},{"id":"b","text":"Required for every Next.js app","isCorrect":false,"explanation":""},{"id":"c","text":"Only for CSS configuration","isCorrect":false,"explanation":""},{"id":"d","text":"Replaces package.json","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'next-21-40-nextjs-q35';

UPDATE questions 
SET options = '[{"id":"a","text":"Expo: managed workflow, prebuilt modules, cloud services; React Native: bare workflow, full native control","isCorrect":true,"explanation":""},{"id":"b","text":"Expo doesn’t support custom native code","isCorrect":false,"explanation":""},{"id":"c","text":"React Native is only for iOS","isCorrect":false,"explanation":""},{"id":"d","text":"Expo is deprecated","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'next-21-40-nextjs-q40';

UPDATE questions 
SET options = '[{"id":"a","text":"SSG: build-time render; SSR: per-request render","isCorrect":true,"explanation":""},{"id":"b","text":"SSR is always faster than SSG","isCorrect":false,"explanation":""},{"id":"c","text":"SSG doesn’t support dynamic data","isCorrect":false,"explanation":""},{"id":"d","text":"They are the same","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'next-61-80-nextjs-q63';

UPDATE questions 
SET options = '[{"id":"a","text":"`generateStaticParams`: App Router; `getStaticPaths`: Pages Router","isCorrect":true,"explanation":""},{"id":"b","text":"They are the same function","isCorrect":false,"explanation":""},{"id":"c","text":"`getStaticPaths` works in App Router","isCorrect":false,"explanation":""},{"id":"d","text":"`generateStaticParams` is for SSR","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'next-61-80-nextjs-q70';

UPDATE questions 
SET options = '[{"id":"a","text":"Client-side navigation in Client Components","isCorrect":true,"explanation":""},{"id":"b","text":"Data fetching in Server Components","isCorrect":false,"explanation":""},{"id":"c","text":"Server-side redirects","isCorrect":false,"explanation":""},{"id":"d","text":"Only works in Pages Router","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'next-61-80-nextjs-q74';

UPDATE questions 
SET options = '[{"id":"a","text":"Customize Webpack, Babel, env vars, and experimental features","isCorrect":true,"explanation":""},{"id":"b","text":"Required for every Next.js app","isCorrect":false,"explanation":""},{"id":"c","text":"Only for CSS configuration","isCorrect":false,"explanation":""},{"id":"d","text":"Replaces package.json","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'next-61-80-nextjs-q78';

UPDATE questions 
SET options = '[{"id":"a","text":"File-based routing, SSR/SSG, API routes, image optimization, middleware","isCorrect":true,"explanation":""},{"id":"b","text":"Only client-side rendering","isCorrect":false,"explanation":""},{"id":"c","text":"No built-in routing","isCorrect":false,"explanation":""},{"id":"d","text":"Requires manual Webpack configuration","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'next1-20-nextjs-q2';

UPDATE questions 
SET options = '[{"id":"a","text":"File-based routing in pages/ or app/ directories","isCorrect":true,"explanation":""},{"id":"b","text":"Manual route configuration with React Router","isCorrect":false,"explanation":""},{"id":"c","text":"Only hash-based routing","isCorrect":false,"explanation":""},{"id":"d","text":"Routing requires server setup","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'next1-20-nextjs-q5';

UPDATE questions 
SET options = '[{"id":"a","text":"Serverless functions in pages/api or app/api that handle HTTP requests","isCorrect":true,"explanation":""},{"id":"b","text":"Only for client-side logic","isCorrect":false,"explanation":""},{"id":"c","text":"Require Express.js","isCorrect":false,"explanation":""},{"id":"d","text":"Not supported in Next.js","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'next1-20-nextjs-q9';

UPDATE questions 
SET options = '[{"id":"a","text":"Runs before request completion; can rewrite, redirect, or modify headers","isCorrect":true,"explanation":""},{"id":"b","text":"Only for client-side logic","isCorrect":false,"explanation":""},{"id":"c","text":"Replaces API routes","isCorrect":false,"explanation":""},{"id":"d","text":"Not supported in App Router","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'next1-20-nextjs-q12';

UPDATE questions 
SET options = '[{"id":"a","text":"Customize Webpack, Babel, env vars, and experimental features","isCorrect":true,"explanation":""},{"id":"b","text":"Required for every Next.js app","isCorrect":false,"explanation":""},{"id":"c","text":"Only for CSS configuration","isCorrect":false,"explanation":""},{"id":"d","text":"Replaces package.json","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'next1-20-nextjs-q14';

UPDATE questions 
SET options = '[{"id":"a","text":"Bracket-based routes like [id].js for dynamic data","isCorrect":true,"explanation":""},{"id":"b","text":"Only static routes are supported","isCorrect":false,"explanation":""},{"id":"c","text":"Require manual React Router setup","isCorrect":false,"explanation":""},{"id":"d","text":"Not compatible with SSR","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'next1-20-nextjs-q16';

UPDATE questions 
SET options = '[{"id":"a","text":"SSG: build-time render; SSR: per-request render","isCorrect":true,"explanation":""},{"id":"b","text":"SSR is always faster than SSG","isCorrect":false,"explanation":""},{"id":"c","text":"SSG doesn’t support dynamic data","isCorrect":false,"explanation":""},{"id":"d","text":"They are the same","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'next1-20-nextjs-q18';

UPDATE questions 
SET options = '[{"id":"a","text":"SSG: build-time render; SSR: per-request render","isCorrect":true,"explanation":""},{"id":"b","text":"SSR is always faster than SSG","isCorrect":false,"explanation":""},{"id":"c","text":"SSG doesn’t support dynamic data","isCorrect":false,"explanation":""},{"id":"d","text":"They are the same","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'next41-60-nextjs-q43';

UPDATE questions 
SET options = '[{"id":"a","text":"`generateStaticParams`: App Router; `getStaticPaths`: Pages Router","isCorrect":true,"explanation":""},{"id":"b","text":"They are the same function","isCorrect":false,"explanation":""},{"id":"c","text":"`getStaticPaths` works in App Router","isCorrect":false,"explanation":""},{"id":"d","text":"`generateStaticParams` is for SSR","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'next41-60-nextjs-q50';

UPDATE questions 
SET options = '[{"id":"a","text":"Client-side navigation in Client Components","isCorrect":true,"explanation":""},{"id":"b","text":"Data fetching in Server Components","isCorrect":false,"explanation":""},{"id":"c","text":"Server-side redirects","isCorrect":false,"explanation":""},{"id":"d","text":"Only works in Pages Router","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'next41-60-nextjs-q54';

UPDATE questions 
SET options = '[{"id":"a","text":"Customize Webpack, Babel, env vars, and experimental features","isCorrect":true,"explanation":""},{"id":"b","text":"Required for every Next.js app","isCorrect":false,"explanation":""},{"id":"c","text":"Only for CSS configuration","isCorrect":false,"explanation":""},{"id":"d","text":"Replaces package.json","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'next41-60-nextjs-q58';

UPDATE questions 
SET options = '[{"id":"o1","text":"Reduced time to First Contentful Paint (FCP)","isCorrect":true,"explanation":""},{"id":"o2","text":"Reduced Time To Interactive (TTI)","isCorrect":true,"explanation":""},{"id":"o3","text":"Larger initial download size","isCorrect":false,"explanation":""},{"id":"o4","text":"Improved perceived performance on slower networks","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'performance-patterns-bundle-splitting-pp2';

UPDATE questions 
SET options = '[{"id":"m1","text":"First Contentful Paint (FCP)","isCorrect":true,"explanation":""},{"id":"m2","text":"Largest Contentful Paint (LCP)","isCorrect":true,"explanation":""},{"id":"m3","text":"Cumulative Layout Shift (CLS)","isCorrect":false,"explanation":""},{"id":"m4","text":"Time To Interactive (TTI)","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'performance-patterns-bundle-splitting-pp4';

UPDATE questions 
SET options = '[{"id":"c1","text":"The time it takes for all content to be painted and interactive after the bundle loads","isCorrect":true,"explanation":""},{"id":"c2","text":"The time between a user''s first input and a response","isCorrect":false,"explanation":""},{"id":"c3","text":"The time it takes to fetch the HTML document from the server","isCorrect":false,"explanation":""},{"id":"c4","text":"The total JavaScript execution time","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'performance-patterns-bundle-splitting-pp6';

UPDATE questions 
SET options = '[{"0":"T","1":"o","2":" ","3":"i","4":"m","5":"p","6":"r","7":"o","8":"v","9":"e","10":" ","11":"S","12":"E","13":"O","14":" ","15":"r","16":"a","17":"n","18":"k","19":"i","20":"n","21":"g","explanation":""},{"0":"T","1":"o","2":" ","3":"e","4":"n","5":"h","6":"a","7":"n","8":"c","9":"e","10":" ","11":"p","12":"e","13":"r","14":"c","15":"e","16":"i","17":"v","18":"e","19":"d","20":" ","21":"p","22":"e","23":"r","24":"f","25":"o","26":"r","27":"m","28":"a","29":"n","30":"c","31":"e","32":" ","33":"a","34":"n","35":"d","36":" ","37":"a","38":"c","39":"h","40":"i","41":"e","42":"v","43":"e","44":" ","45":"b","46":"e","47":"t","48":"t","49":"e","50":"r","51":" ","52":"C","53":"o","54":"r","55":"e","56":" ","57":"W","58":"e","59":"b","60":" ","61":"V","62":"i","63":"t","64":"a","65":"l","66":"s","explanation":""},{"0":"T","1":"o","2":" ","3":"r","4":"e","5":"d","6":"u","7":"c","8":"e","9":" ","10":"t","11":"h","12":"e","13":" ","14":"n","15":"u","16":"m","17":"b","18":"e","19":"r","20":" ","21":"o","22":"f","23":" ","24":"n","25":"e","26":"t","27":"w","28":"o","29":"r","30":"k","31":" ","32":"r","33":"e","34":"q","35":"u","36":"e","37":"s","38":"t","39":"s","explanation":""},{"0":"T","1":"o","2":" ","3":"p","4":"r","5":"e","6":"v","7":"e","8":"n","9":"t","10":" ","11":"C","12":"S","13":"S","14":" ","15":"a","16":"n","17":"d","18":" ","19":"J","20":"S","21":" ","22":"c","23":"o","24":"n","25":"f","26":"l","27":"i","28":"c","29":"t","30":"s","explanation":""}]'
WHERE metadata->>'original_id' = 'performance-patterns-loading-sequence-1';

UPDATE questions 
SET options = '[{"0":"B","1":"r","2":"o","3":"w","4":"s","5":"e","6":"r","7":"s","8":" ","9":"f","10":"o","11":"l","12":"l","13":"o","14":"w","15":" ","16":"a","17":" ","18":"s","19":"t","20":"a","21":"n","22":"d","23":"a","24":"r","25":"d","26":" ","27":"u","28":"n","29":"i","30":"v","31":"e","32":"r","33":"s","34":"a","35":"l","36":" ","37":"r","38":"e","39":"s","40":"o","41":"u","42":"r","43":"c","44":"e","45":" ","46":"p","47":"r","48":"i","49":"o","50":"r","51":"i","52":"t","53":"i","54":"z","55":"a","56":"t","57":"i","58":"o","59":"n","60":" ","61":"m","62":"o","63":"d","64":"e","65":"l","explanation":""},{"0":"D","1":"e","2":"v","3":"e","4":"l","5":"o","6":"p","7":"e","8":"r","9":"s","10":" ","11":"a","12":"n","13":"d","14":" ","15":"b","16":"r","17":"o","18":"w","19":"s","20":"e","21":"r","22":"s","23":" ","24":"o","25":"f","26":"t","27":"e","28":"n","29":" ","30":"d","31":"i","32":"f","33":"f","34":"e","35":"r","36":" ","37":"i","38":"n","39":" ","40":"h","41":"o","42":"w","43":" ","44":"t","45":"h","46":"e","47":"y","48":" ","49":"p","50":"r","51":"i","52":"o","53":"r","54":"i","55":"t","56":"i","57":"z","58":"e","59":" ","60":"r","61":"e","62":"s","63":"o","64":"u","65":"r","66":"c","67":"e","68":"s","explanation":""},{"0":"A","1":"l","2":"l","3":" ","4":"t","5":"h","6":"i","7":"r","8":"d","9":"-","10":"p","11":"a","12":"r","13":"t","14":"y","15":" ","16":"s","17":"c","18":"r","19":"i","20":"p","21":"t","22":"s","23":" ","24":"a","25":"u","26":"t","27":"o","28":"m","29":"a","30":"t","31":"i","32":"c","33":"a","34":"l","35":"l","36":"y","37":" ","38":"o","39":"p","40":"t","41":"i","42":"m","43":"i","44":"z","45":"e","46":" ","47":"f","48":"o","49":"r","50":" ","51":"p","52":"e","53":"r","54":"f","55":"o","56":"r","57":"m","58":"a","59":"n","60":"c","61":"e","explanation":""},{"0":"H","1":"T","2":"T","3":"P","4":"/","5":"2","6":" ","7":"a","8":"l","9":"w","10":"a","11":"y","12":"s","13":" ","14":"p","15":"r","16":"o","17":"v","18":"i","19":"d","20":"e","21":"s","22":" ","23":"p","24":"e","25":"r","26":"f","27":"e","28":"c","29":"t","30":" ","31":"p","32":"r","33":"i","34":"o","35":"r","36":"i","37":"t","38":"i","39":"z","40":"a","41":"t","42":"i","43":"o","44":"n","explanation":""}]'
WHERE metadata->>'original_id' = 'performance-patterns-loading-sequence-2';

UPDATE questions 
SET options = '[{"0":"T","1":"h","2":"e","3":" ","4":"b","5":"r","6":"o","7":"w","8":"s","9":"e","10":"r","11":" ","12":"c","13":"a","14":"c","15":"h","16":"e","17":"s","18":" ","19":"a","20":"l","21":"l","22":" ","23":"r","24":"e","25":"s","26":"o","27":"u","28":"r","29":"c","30":"e","31":"s","32":" ","33":"a","34":"u","35":"t","36":"o","37":"m","38":"a","39":"t","40":"i","41":"c","42":"a","43":"l","44":"l","45":"y","explanation":""},{"0":"T","1":"h","2":"e","3":" ","4":"C","5":"P","6":"U","7":" ","8":"a","9":"n","10":"d","11":" ","12":"n","13":"e","14":"t","15":"w","16":"o","17":"r","18":"k","19":" ","20":"a","21":"r","22":"e","23":" ","24":"a","25":"l","26":"w","27":"a","28":"y","29":"s","30":" ","31":"f","32":"u","33":"l","34":"l","35":"y","36":" ","37":"u","38":"t","39":"i","40":"l","41":"i","42":"z","43":"e","44":"d","explanation":""},{"0":"D","1":"e","2":"a","3":"d","4":" ","5":"t","6":"i","7":"m","8":"e","9":" ","10":"o","11":"c","12":"c","13":"u","14":"r","15":"s","16":" ","17":"o","18":"n","19":" ","20":"e","21":"i","22":"t","23":"h","24":"e","25":"r","26":" ","27":"C","28":"P","29":"U","30":" ","31":"o","32":"r","33":" ","34":"n","35":"e","36":"t","37":"w","38":"o","39":"r","40":"k","41":",","42":" ","43":"c","44":"a","45":"u","46":"s","47":"i","48":"n","49":"g","50":" ","51":"d","52":"e","53":"l","54":"a","55":"y","56":"s","explanation":""},{"0":"L","1":"C","2":"P","3":" ","4":"i","5":"s","6":" ","7":"a","8":"c","9":"h","10":"i","11":"e","12":"v","13":"e","14":"d","15":" ","16":"f","17":"a","18":"s","19":"t","20":"e","21":"r","explanation":""}]'
WHERE metadata->>'original_id' = 'performance-patterns-loading-sequence-3';

UPDATE questions 
SET options = '[{"0":"T","1":"h","2":"e","3":"y","4":" ","5":"o","6":"p","7":"t","8":"i","9":"m","10":"i","11":"z","12":"e","13":" ","14":"t","15":"h","16":"e","17":" ","18":"s","19":"e","20":"q","21":"u","22":"e","23":"n","24":"c","25":"e","26":" ","27":"a","28":"u","29":"t","30":"o","31":"m","32":"a","33":"t","34":"i","35":"c","36":"a","37":"l","38":"l","39":"y","explanation":""},{"0":"T","1":"h","2":"e","3":"y","4":" ","5":"o","6":"f","7":"t","8":"e","9":"n","10":" ","11":"b","12":"l","13":"o","14":"c","15":"k","16":" ","17":"r","18":"e","19":"n","20":"d","21":"e","22":"r","23":"i","24":"n","25":"g","26":" ","27":"a","28":"n","29":"d","30":" ","31":"d","32":"e","33":"l","34":"a","35":"y","36":" ","37":"c","38":"r","39":"i","40":"t","41":"i","42":"c","43":"a","44":"l","45":" ","46":"r","47":"e","48":"s","49":"o","50":"u","51":"r","52":"c","53":"e","54":" ","55":"l","56":"o","57":"a","58":"d","59":"i","60":"n","61":"g","explanation":""},{"0":"T","1":"h","2":"e","3":"y","4":" ","5":"i","6":"m","7":"p","8":"r","9":"o","10":"v","11":"e","12":" ","13":"C","14":"P","15":"U","16":" ","17":"u","18":"t","19":"i","20":"l","21":"i","22":"z","23":"a","24":"t","25":"i","26":"o","27":"n","explanation":""},{"0":"T","1":"h","2":"e","3":"y","4":" ","5":"l","6":"o","7":"a","8":"d","9":" ","10":"a","11":"f","12":"t","13":"e","14":"r","15":" ","16":"a","17":"l","18":"l","19":" ","20":"f","21":"i","22":"r","23":"s","24":"t","25":"-","26":"p","27":"a","28":"r","29":"t","30":"y","31":" ","32":"s","33":"c","34":"r","35":"i","36":"p","37":"t","38":"s","39":" ","40":"b","41":"y","42":" ","43":"d","44":"e","45":"f","46":"a","47":"u","48":"l","49":"t","explanation":""}]'
WHERE metadata->>'original_id' = 'performance-patterns-loading-sequence-4';

UPDATE questions 
SET options = '[{"0":"L","1":"o","2":"a","3":"d","4":" ","5":"a","6":"l","7":"l","8":" ","9":"C","10":"S","11":"S","12":" ","13":"f","14":"i","15":"l","16":"e","17":"s","18":" ","19":"a","20":"s","21":"y","22":"n","23":"c","24":"h","25":"r","26":"o","27":"n","28":"o","29":"u","30":"s","31":"l","32":"y","explanation":""},{"0":"I","1":"n","2":"l","3":"i","4":"n","5":"e","6":" ","7":"c","8":"r","9":"i","10":"t","11":"i","12":"c","13":"a","14":"l","15":" ","16":"C","17":"S","18":"S","19":" ","20":"a","21":"n","22":"d","23":" ","24":"p","25":"r","26":"e","27":"l","28":"o","29":"a","30":"d","31":" ","32":"i","33":"f","34":" ","35":"e","36":"x","37":"t","38":"e","39":"r","40":"n","41":"a","42":"l","explanation":""},{"0":"S","1":"e","2":"r","3":"v","4":"e","5":" ","6":"a","7":"l","8":"l","9":" ","10":"C","11":"S","12":"S","13":" ","14":"f","15":"r","16":"o","17":"m","18":" ","19":"t","20":"h","21":"i","22":"r","23":"d","24":"-","25":"p","26":"a","27":"r","28":"t","29":"y","30":" ","31":"C","32":"D","33":"N","34":"s","explanation":""},{"0":"L","1":"o","2":"a","3":"d","4":" ","5":"C","6":"S","7":"S","8":" ","9":"a","10":"f","11":"t","12":"e","13":"r","14":" ","15":"a","16":"l","17":"l","18":" ","19":"J","20":"a","21":"v","22":"a","23":"S","24":"c","25":"r","26":"i","27":"p","28":"t","explanation":""}]'
WHERE metadata->>'original_id' = 'performance-patterns-loading-sequence-5';

UPDATE questions 
SET options = '[{"0":"U","1":"s","2":"e","3":" ","4":"f","5":"o","6":"n","7":"t","8":" ","9":"p","10":"r","11":"e","12":"c","13":"o","14":"n","15":"n","16":"e","17":"c","18":"t","19":" ","20":"f","21":"o","22":"r","23":" ","24":"e","25":"x","26":"t","27":"e","28":"r","29":"n","30":"a","31":"l","32":" ","33":"d","34":"o","35":"m","36":"a","37":"i","38":"n","39":"s","explanation":""},{"0":"L","1":"o","2":"a","3":"d","4":" ","5":"a","6":"l","7":"l","8":" ","9":"f","10":"o","11":"n","12":"t","13":"s","14":" ","15":"a","16":"f","17":"t","18":"e","19":"r","20":" ","21":"i","22":"n","23":"t","24":"e","25":"r","26":"a","27":"c","28":"t","29":"i","30":"v","31":"i","32":"t","33":"y","34":" ","35":"s","36":"t","37":"a","38":"r","39":"t","40":"s","explanation":""},{"0":"I","1":"n","2":"l","3":"i","4":"n","5":"e","6":" ","7":"a","8":"l","9":"l","10":" ","11":"f","12":"o","13":"n","14":"t","15":" ","16":"f","17":"i","18":"l","19":"e","20":"s","21":" ","22":"d","23":"i","24":"r","25":"e","26":"c","27":"t","28":"l","29":"y","30":" ","31":"i","32":"n","33":"t","34":"o","35":" ","36":"H","37":"T","38":"M","39":"L","explanation":""},{"0":"A","1":"v","2":"o","3":"i","4":"d","5":" ","6":"u","7":"s","8":"i","9":"n","10":"g","11":" ","12":"f","13":"o","14":"n","15":"t","16":" ","17":"f","18":"a","19":"l","20":"l","21":"b","22":"a","23":"c","24":"k","25":"s","explanation":""}]'
WHERE metadata->>'original_id' = 'performance-patterns-loading-sequence-6';

UPDATE questions 
SET options = '[{"0":"B","1":"e","2":"l","3":"o","4":"w","5":" ","6":"t","7":"h","8":"e","9":" ","10":"f","11":"o","12":"l","13":"d","14":" ","15":"i","16":"m","17":"a","18":"g","19":"e","20":"s","explanation":""},{"0":"A","1":"b","2":"o","3":"v","4":"e","5":" ","6":"t","7":"h","8":"e","9":" ","10":"f","11":"o","12":"l","13":"d","14":" ","15":"i","16":"m","17":"a","18":"g","19":"e","20":"s","21":" ","22":"i","23":"n","24":"c","25":"l","26":"u","27":"d","28":"i","29":"n","30":"g","31":" ","32":"t","33":"h","34":"e","35":" ","36":"h","37":"e","38":"r","39":"o","40":" ","41":"i","42":"m","43":"a","44":"g","45":"e","explanation":""},{"0":"A","1":"l","2":"l","3":" ","4":"i","5":"m","6":"a","7":"g","8":"e","9":"s","10":" ","11":"e","12":"q","13":"u","14":"a","15":"l","16":"l","17":"y","explanation":""},{"0":"L","1":"a","2":"z","3":"y","4":"-","5":"l","6":"o","7":"a","8":"d","9":" ","10":"a","11":"l","12":"l","13":" ","14":"i","15":"m","16":"a","17":"g","18":"e","19":"s","explanation":""}]'
WHERE metadata->>'original_id' = 'performance-patterns-loading-sequence-7';

UPDATE questions 
SET options = '[{"0":"B","1":"e","2":"f","3":"o","4":"r","5":"e","6":"-","7":"I","8":"n","9":"t","10":"e","11":"r","12":"a","13":"c","14":"t","15":"i","16":"v","17":"e","explanation":""},{"0":"A","1":"f","2":"t","3":"e","4":"r","5":"-","6":"I","7":"n","8":"t","9":"e","10":"r","11":"a","12":"c","13":"t","14":"i","15":"v","16":"e","explanation":""},{"0":"L","1":"a","2":"z","3":"y","4":"-","5":"O","6":"n","7":"l","8":"o","9":"a","10":"d","explanation":""},{"0":"A","1":"s","2":"y","3":"n","4":"c","5":"-","6":"P","7":"r","8":"e","9":"l","10":"o","11":"a","12":"d","explanation":""}]'
WHERE metadata->>'original_id' = 'performance-patterns-loading-sequence-8';

UPDATE questions 
SET options = '[{"0":"F","1":"o","2":"r","3":" ","4":"c","5":"r","6":"i","7":"t","8":"i","9":"c","10":"a","11":"l","12":" ","13":"p","14":"o","15":"l","16":"y","17":"f","18":"i","19":"l","20":"l","21":"s","22":" ","23":"a","24":"n","25":"d","26":" ","27":"s","28":"e","29":"c","30":"u","31":"r","32":"i","33":"t","34":"y","35":" ","36":"s","37":"c","38":"r","39":"i","40":"p","41":"t","42":"s","explanation":""},{"0":"F","1":"o","2":"r","3":" ","4":"s","5":"o","6":"c","7":"i","8":"a","9":"l","10":" ","11":"w","12":"i","13":"d","14":"g","15":"e","16":"t","17":"s","18":" ","19":"a","20":"n","21":"d","22":" ","23":"f","24":"e","25":"e","26":"d","27":"b","28":"a","29":"c","30":"k","31":" ","32":"s","33":"c","34":"r","35":"i","36":"p","37":"t","38":"s","explanation":""},{"0":"F","1":"o","2":"r","3":" ","4":"h","5":"y","6":"d","7":"r","8":"a","9":"t","10":"i","11":"o","12":"n","13":"-","14":"r","15":"e","16":"l","17":"a","18":"t","19":"e","20":"d","21":" ","22":"s","23":"c","24":"r","25":"i","26":"p","27":"t","28":"s","explanation":""},{"0":"F","1":"o","2":"r","3":" ","4":"c","5":"r","6":"i","7":"t","8":"i","9":"c","10":"a","11":"l","12":" ","13":"f","14":"o","15":"n","16":"t","17":"s","18":" ","19":"a","20":"n","21":"d","22":" ","23":"C","24":"S","25":"S","explanation":""}]'
WHERE metadata->>'original_id' = 'performance-patterns-loading-sequence-9';

UPDATE questions 
SET options = '[{"0":"I","1":"t","2":" ","3":"c","4":"a","5":"n","6":" ","7":"c","8":"a","9":"u","10":"s","11":"e","12":" ","13":"t","14":"h","15":"e","16":" ","17":"b","18":"r","19":"o","20":"w","21":"s","22":"e","23":"r","24":" ","25":"t","26":"o","27":" ","28":"d","29":"o","30":"w","31":"n","32":"l","33":"o","34":"a","35":"d","36":" ","37":"u","38":"n","39":"n","40":"e","41":"c","42":"e","43":"s","44":"s","45":"a","46":"r","47":"y","48":" ","49":"r","50":"e","51":"s","52":"o","53":"u","54":"r","55":"c","56":"e","57":"s","58":" ","59":"e","60":"a","61":"r","62":"l","63":"y","explanation":""},{"0":"I","1":"t","2":" ","3":"i","4":"m","5":"p","6":"r","7":"o","8":"v","9":"e","10":"s","11":" ","12":"c","13":"a","14":"c","15":"h","16":"i","17":"n","18":"g","19":" ","20":"t","21":"o","22":"o","23":" ","24":"m","25":"u","26":"c","27":"h","explanation":""},{"0":"I","1":"t","2":" ","3":"a","4":"u","5":"t","6":"o","7":"m","8":"a","9":"t","10":"i","11":"c","12":"a","13":"l","14":"l","15":"y","16":" ","17":"p","18":"r","19":"i","20":"o","21":"r","22":"i","23":"t","24":"i","25":"z","26":"e","27":"s","28":" ","29":"r","30":"e","31":"s","32":"o","33":"u","34":"r","35":"c","36":"e","37":"s","38":" ","39":"c","40":"o","41":"r","42":"r","43":"e","44":"c","45":"t","46":"l","47":"y","explanation":""},{"0":"I","1":"t","2":" ","3":"b","4":"l","5":"o","6":"c","7":"k","8":"s","9":" ","10":"a","11":"l","12":"l","13":" ","14":"a","15":"s","16":"y","17":"n","18":"c","19":" ","20":"s","21":"c","22":"r","23":"i","24":"p","25":"t","26":"s","explanation":""}]'
WHERE metadata->>'original_id' = 'performance-patterns-loading-sequence-10';

UPDATE questions 
SET options = '[{"id":"o1","text":"Dynamic imports return a Promise that resolves to the requested module.","isCorrect":true,"explanation":""},{"id":"o2","text":"Dynamic imports always block the initial page render.","isCorrect":false,"explanation":""},{"id":"o3","text":"Webpack automatically creates separate chunks for dynamically imported modules.","isCorrect":true,"explanation":""},{"id":"o4","text":"Dynamic imports are part of the ES2020 specification.","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'performance-patterns-performance-1-pp8';

UPDATE questions 
SET options = '[{"id":"o1","text":"Webpack''s `SplitChunksPlugin`","isCorrect":true,"explanation":""},{"id":"o2","text":"Vite’s pre-bundling mechanism (esbuild)","isCorrect":true,"explanation":""},{"id":"o3","text":"React.lazy() + Suspense","isCorrect":true,"explanation":""},{"id":"o4","text":"HTML inline scripts","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'performance-patterns-performance-1-pp11';

UPDATE questions 
SET options = '[{"id":"a","text":"To load critical resources earlier for faster interactivity","isCorrect":true,"explanation":""},{"id":"b","text":"To defer resource loading until needed","isCorrect":false,"explanation":""},{"id":"c","text":"To lazy load components on user interaction","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'performance-patterns-pre-load-1';

UPDATE questions 
SET options = '[{"id":"a","text":"Preload is for resources needed immediately, prefetch is for resources needed soon","isCorrect":true,"explanation":""},{"id":"b","text":"Prefetch loads higher priority resources than preload","isCorrect":false,"explanation":""},{"id":"c","text":"Preload is always handled automatically by the browser","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'performance-patterns-pre-load-2';

UPDATE questions 
SET options = '[{"id":"a","text":"It bundles the module into the main chunk","isCorrect":false,"explanation":""},{"id":"b","text":"It adds a `<link rel=''preload''>` tag for that chunk","isCorrect":true,"explanation":""},{"id":"c","text":"It delays loading of the module until user interaction","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'performance-patterns-pre-load-3';

UPDATE questions 
SET options = '[{"id":"a","text":"It can delay critical rendering paths like CSS and hero images","isCorrect":true,"explanation":""},{"id":"b","text":"It causes the browser to ignore other preload hints","isCorrect":false,"explanation":""},{"id":"c","text":"It disables the browser cache for those resources","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'performance-patterns-pre-load-4';

UPDATE questions 
SET options = '[{"id":"a","text":"To load a script early without blocking the HTML parser","isCorrect":true,"explanation":""},{"id":"b","text":"To execute the script synchronously","isCorrect":false,"explanation":""},{"id":"c","text":"To delay the script until the user interacts","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'performance-patterns-pre-load-6';

UPDATE questions 
SET options = '[{"id":"a","text":"Use preload sparingly and measure its impact in production","isCorrect":true,"explanation":""},{"id":"b","text":"Preload all JavaScript files to reduce bundle size","isCorrect":false,"explanation":""},{"id":"c","text":"Always preload images before any CSS files","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'performance-patterns-pre-load-8';

UPDATE questions 
SET options = '[{"id":"a","text":"To load resources that may be needed in the future","isCorrect":true,"explanation":""},{"id":"b","text":"To defer resource loading until the user interacts","isCorrect":false,"explanation":""},{"id":"c","text":"To immediately execute a script when the page loads","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'performance-patterns-prefetch-1';

UPDATE questions 
SET options = '[{"id":"a","text":"To bundle the file immediately into the main chunk","isCorrect":false,"explanation":""},{"id":"b","text":"To hint the browser to prefetch the resource during idle time","isCorrect":true,"explanation":""},{"id":"c","text":"To force lazy loading of the component","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'performance-patterns-prefetch-3';

UPDATE questions 
SET options = '[{"id":"a","text":"It is fetched from cache instantly","isCorrect":true,"explanation":""},{"id":"b","text":"It triggers a network request","isCorrect":false,"explanation":""},{"id":"c","text":"It delays rendering until all resources are loaded","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'performance-patterns-prefetch-4';

UPDATE questions 
SET options = '[{"id":"a","text":"For pages or components the user is likely to visit soon","isCorrect":true,"explanation":""},{"id":"b","text":"For every resource in the application","isCorrect":false,"explanation":""},{"id":"c","text":"Only for images in the viewport","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'performance-patterns-prefetch-6';

UPDATE questions 
SET options = '[{"id":"o1","text":"Push, Render, Pre-cache, Lazy-load","isCorrect":true,"explanation":""},{"id":"o2","text":"Preload, Render, Pre-fetch, Load","isCorrect":false,"explanation":""},{"id":"o3","text":"Push, Render, Preload, Link","isCorrect":false,"explanation":""},{"id":"o4","text":"Prepare, Run, Pre-cache, Load","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'performance-patterns-prpl-pp2';

UPDATE questions 
SET options = '[{"id":"o1","text":"HTTP/2 Server Push","isCorrect":true,"explanation":""},{"id":"o2","text":"Service Workers","isCorrect":true,"explanation":""},{"id":"o3","text":"App Shell Architecture","isCorrect":true,"explanation":""},{"id":"o4","text":"jQuery AJAX for resource loading","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'performance-patterns-prpl-pp4';

UPDATE questions 
SET options = '[{"id":"o1","text":"Push","isCorrect":false,"explanation":""},{"id":"o2","text":"Render","isCorrect":false,"explanation":""},{"id":"o3","text":"Pre-cache","isCorrect":true,"explanation":""},{"id":"o4","text":"Lazy-load","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'performance-patterns-prpl-pp6';

UPDATE questions 
SET options = '[{"id":"o1","text":"Improved caching performance","isCorrect":false,"explanation":""},{"id":"o2","text":"Wasted bandwidth and filled browser cache","isCorrect":true,"explanation":""},{"id":"o3","text":"Better offline support","isCorrect":false,"explanation":""},{"id":"o4","text":"Reduced initial load time","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'performance-patterns-prpl-pp7';

UPDATE questions 
SET options = '[{"id":"o1","text":"Provides a minimal structure that loads instantly and handles routing","isCorrect":true,"explanation":""},{"id":"o2","text":"Delays rendering until all assets are fetched","isCorrect":false,"explanation":""},{"id":"o3","text":"Caches server responses in memory only","isCorrect":false,"explanation":""},{"id":"o4","text":"Forces the app to reload on each navigation","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'performance-patterns-prpl-pp9';

UPDATE questions 
SET options = '[{"id":"o1","text":"Render initial route quickly","isCorrect":true,"explanation":""},{"id":"o2","text":"Pre-cache assets in background","isCorrect":false,"explanation":""},{"id":"o3","text":"Lazy-load unused modules","isCorrect":false,"explanation":""},{"id":"o4","text":"Push critical resources after render","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'performance-patterns-prpl-pp12';

UPDATE questions 
SET options = '[{"id":"o1","text":"Push","isCorrect":true,"explanation":""},{"id":"o2","text":"Render","isCorrect":false,"explanation":""},{"id":"o3","text":"Pre-cache","isCorrect":false,"explanation":""},{"id":"o4","text":"Lazy-load","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'performance-patterns-prpl-pp14';

UPDATE questions 
SET options = '[{"id":"o1","text":"Additional round trips to other domains","isCorrect":true,"explanation":""},{"id":"o2","text":"Bulky or unoptimized JavaScript","isCorrect":true,"explanation":""},{"id":"o3","text":"Blocking rendering of critical resources","isCorrect":true,"explanation":""},{"id":"o4","text":"Always reduces DNS lookup times","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'performance-patterns-third-party-tp2';

UPDATE questions 
SET options = '[{"id":"o1","text":"beforeInteractive","isCorrect":true,"explanation":""},{"id":"o2","text":"afterInteractive","isCorrect":true,"explanation":""},{"id":"o3","text":"lazyOnload","isCorrect":true,"explanation":""},{"id":"o4","text":"documentWrite","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'performance-patterns-third-party-tp7';

UPDATE questions 
SET options = '[{"id":"o1","text":"read()","isCorrect":true,"explanation":""},{"id":"o2","text":"nap()","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'performance-patterns-tree-shaking-ts4';

UPDATE questions 
SET options = '[{"id":"o1","text":"FixedSizeList and VariableSizeList for lists; FixedSizeGrid and VariableSizeGrid for grids","isCorrect":true,"explanation":""},{"id":"o2","text":"InfiniteScrollList and TableGrid","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'performance-patterns-virtualization-lv5';

UPDATE questions 
SET options = '[{"id":"a","text":"CSR loads all JavaScript at once, while Islands only hydrate interactive components","isCorrect":true},{"id":"b","text":"Islands Architecture doesn’t support user interactions","isCorrect":false},{"id":"c","text":"CSR is faster than Islands because it’s fully client-driven","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-islandarcheticure-2';

UPDATE questions 
SET options = '[{"id":"a","text":"Next.js","isCorrect":false},{"id":"b","text":"Astro","isCorrect":true},{"id":"c","text":"Nuxt.js","isCorrect":false},{"id":"d","text":"Remix","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-islandarcheticure-4';

UPDATE questions 
SET options = '[{"id":"a","text":"During the initial HTML parsing","isCorrect":false},{"id":"b","text":"After the static HTML has been rendered and the browser is idle","isCorrect":true},{"id":"c","text":"Only after a user clicks a button","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-islandarcheticure-5';

UPDATE questions 
SET options = '[{"id":"a","text":"Highly interactive dashboards","isCorrect":false},{"id":"b","text":"Content-heavy websites like blogs or marketing pages","isCorrect":true},{"id":"c","text":"Real-time gaming apps","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-islandarcheticure-7';

UPDATE questions 
SET options = '[{"id":"a","text":"It serves fully rendered HTML to crawlers before hydration","isCorrect":true},{"id":"b","text":"It delays rendering until user interaction","isCorrect":false},{"id":"c","text":"It hides interactive components from crawlers","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-islandarcheticure-9';

UPDATE questions 
SET options = '[{"id":"a","text":"Reduced latency due to geographical proximity to users","isCorrect":true},{"id":"b","text":"It replaces all client-side rendering logic","isCorrect":false},{"id":"c","text":"It always increases server costs","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-render6-2';

UPDATE questions 
SET options = '[{"id":"a","text":"It hydrates parts of the UI gradually as JavaScript loads or user interacts","isCorrect":true},{"id":"b","text":"It waits until all components are fully loaded before rendering anything","isCorrect":false},{"id":"c","text":"It disables interactivity completely","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-render6-4';

UPDATE questions 
SET options = '[{"id":"a","text":"Resumability skips full rehydration by resuming the app state directly from serialized data","isCorrect":true},{"id":"b","text":"Resumability re-renders everything on the server","isCorrect":false},{"id":"c","text":"They are the same process with different names","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-render6-7';

UPDATE questions 
SET options = '[{"id":"a","text":"Users see parts of the UI sooner while server components load progressively","isCorrect":true},{"id":"b","text":"It delays rendering until all components are ready","isCorrect":false},{"id":"c","text":"It removes the need for client components entirely","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-render6-9';

UPDATE questions 
SET options = '[{"id":"a","text":"Partial Hydration only hydrates selected components, Progressive Hydration hydrates sequentially over time","isCorrect":true},{"id":"b","text":"They are identical processes","isCorrect":false},{"id":"c","text":"Partial Hydration works only on client-side rendering","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-render7-2';

UPDATE questions 
SET options = '[{"id":"a","text":"On pages with many navigation routes where user intent can be predicted","isCorrect":true},{"id":"b","text":"On static single-page apps with no dynamic routing","isCorrect":false},{"id":"c","text":"When caching is disabled entirely","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-render7-4';

UPDATE questions 
SET options = '[{"id":"a","text":"It allows components to wait for data before rendering while showing fallback UI","isCorrect":true},{"id":"b","text":"It blocks all rendering until the entire app loads","isCorrect":false},{"id":"c","text":"It only works for routing, not data fetching","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-render7-6';

UPDATE questions 
SET options = '[{"id":"a","text":"Concurrent rendering can pause and resume renders, synchronous rendering blocks until completion","isCorrect":true},{"id":"b","text":"Concurrent rendering executes faster JavaScript","isCorrect":false},{"id":"c","text":"Synchronous rendering can handle multiple threads","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-render7-8';

UPDATE questions 
SET options = '[{"id":"a","text":"They improve initial load but can serve outdated content until revalidated","isCorrect":true},{"id":"b","text":"They slow down page loads by increasing bundle size","isCorrect":false},{"id":"c","text":"They disable interactivity on the client","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-render7-10';

UPDATE questions 
SET options = '["To animate data fetching operations","To transition visual changes between DOM states smoothly","To handle form validation errors visually","To optimize network requests"]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering10-1';

UPDATE questions 
SET options = '["document.animateTransition()","window.beginViewChange()","document.startViewTransition()","window.transitionTo()"]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering10-2';

UPDATE questions 
SET options = '["Preloads all CSS animations","Takes a screenshot of the current DOM","Stores a snapshot of localStorage","Pauses all event listeners"]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering10-3';

UPDATE questions 
SET options = '["::before and ::after","::view-transition-old(root) and ::view-transition-new(root)","::transition-old and ::transition-new","::prev-state and ::next-state"]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering10-4';

UPDATE questions 
SET options = '["It defines a CSS keyframe","It assigns an animation ID for transitions","It uniquely identifies elements for smooth state transitions","It determines animation duration"]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering10-5';

UPDATE questions 
SET options = '["The DOM remains interactive","The DOM becomes non-interactive until the callback resolves","Only CSS changes are blocked","Event listeners are temporarily removed"]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering10-6';

UPDATE questions 
SET options = '["Before sending the data request","Immediately on link click","After the data request completes","After component unmount"]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering10-7';

UPDATE questions 
SET options = '["By using setTimeout inside the callback","By returning a Promise that resolves when the DOM update is complete","By pausing the animation manually","By re-rendering the DOM asynchronously"]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering10-8';

UPDATE questions 
SET options = '["componentDidMount()","componentWillUnmount()","shouldComponentUpdate()","getSnapshotBeforeUpdate()"]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering10-9';

UPDATE questions 
SET options = '["Starts a new transition","Forces a DOM re-render","Resolves the update promise for the transition","Triggers a fade-out animation"]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering10-10';

UPDATE questions 
SET options = '["It breaks routing","It prevents componentDidUpdate from firing","It causes components to render twice and disrupts transitions","It disables animation hooks"]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering10-11';

UPDATE questions 
SET options = '["It only supports inline styles","It can’t animate DOM elements","It needs new page HTML before animating","It blocks network requests"]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering10-12';

UPDATE questions 
SET options = '["It improves SEO performance","It reduces memory usage","It offers immediate visual feedback to the user","It prevents animation jank"]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering10-13';

UPDATE questions 
SET options = '["Turn","Turbo","Astro","Remix"]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering10-14';

UPDATE questions 
SET options = '["It performs server rendering","It adds routing capabilities","It animates page navigations via CSS classes","It caches HTML responses"]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering10-15';

UPDATE questions 
SET options = '["turbo:start and turbo:end","turbo:visit, turbo:before-render, turbo:render","turbo:click and turbo:load","animationstart and animationend"]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering10-16';

UPDATE questions 
SET options = '["It disables animations completely","It enables experimental view transitions with fallback","It triggers full page reloads","It forces server-side rendering"]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering10-17';

UPDATE questions 
SET options = '["View transitions are faster in all cases","Exit animations support cross-page element morphing","View transitions handle shared elements but may delay feedback","Exit animations require the new HTML before starting"]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering10-18';

UPDATE questions 
SET options = '[{"id":"a","text":"Faster Time to First Byte (TTFB)","isCorrect":false},{"id":"b","text":"Higher server load and slower TTFB compared to static rendering","isCorrect":true},{"id":"c","text":"Improved client-side bundle size","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering2-2';

UPDATE questions 
SET options = '[{"id":"a","text":"A marketing blog updated monthly","isCorrect":false},{"id":"b","text":"A dashboard showing real-time user data","isCorrect":true},{"id":"c","text":"A static documentation website","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering2-3';

UPDATE questions 
SET options = '[{"id":"a","text":"React Suspense for data fetching","isCorrect":true},{"id":"b","text":"React Context API","isCorrect":false},{"id":"c","text":"React.memo","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering2-6';

UPDATE questions 
SET options = '[{"id":"a","text":"Edge Rendering happens on globally distributed edge nodes rather than a central server","isCorrect":true},{"id":"b","text":"Edge Rendering always requires a CDN","isCorrect":false},{"id":"c","text":"Edge Rendering only works for static pages","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering2-8';

UPDATE questions 
SET options = '[{"id":"a","text":"Hybrid Rendering — mixing SSG, SSR, and ISR depending on route needs","isCorrect":true},{"id":"b","text":"Full Client-Side Rendering only","isCorrect":false},{"id":"c","text":"Single Static HTML rendering","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering2-10';

UPDATE questions 
SET options = '[{"id":"a","text":"Search engines struggle to index JavaScript-rendered pages","isCorrect":true},{"id":"b","text":"CSR prevents the use of meta tags","isCorrect":false},{"id":"c","text":"CSR makes sites slower for all users","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering4-2';

UPDATE questions 
SET options = '[{"id":"a","text":"CSR renders pages on the client, SSR renders them on the server before sending HTML","isCorrect":true},{"id":"b","text":"SSR requires no JavaScript on the client","isCorrect":false},{"id":"c","text":"CSR is faster than SSR in all cases","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering4-4';

UPDATE questions 
SET options = '[{"id":"a","text":"A social media share widget inside a static blog post","isCorrect":true},{"id":"b","text":"Static article text with no JavaScript","isCorrect":false},{"id":"c","text":"Server-rendered navigation bar","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering4-6';

UPDATE questions 
SET options = '[{"id":"a","text":"Astro and Marko","isCorrect":true},{"id":"b","text":"Next.js only","isCorrect":false},{"id":"c","text":"Create React App","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering4-8';

UPDATE questions 
SET options = '[{"id":"a","text":"It’s difficult to scale for highly interactive apps like social media feeds","isCorrect":true},{"id":"b","text":"It cannot be used with React","isCorrect":false},{"id":"c","text":"It requires a full backend rewrite","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering4-10';

UPDATE questions 
SET options = '[{"id":"a","text":"It regenerates pages on-demand when a user visits an outdated page","isCorrect":true},{"id":"b","text":"It rebuilds the entire website daily","isCorrect":false},{"id":"c","text":"It updates pages manually via admin dashboard","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering5-2';

UPDATE questions 
SET options = '[{"id":"a","text":"ISR caches pre-rendered pages at the edge and avoids regenerating on every request","isCorrect":true},{"id":"b","text":"ISR avoids hydration completely","isCorrect":false},{"id":"c","text":"ISR runs entirely on the client","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering5-4';

UPDATE questions 
SET options = '[{"id":"a","text":"When content changes are event-driven, such as CMS updates","isCorrect":true},{"id":"b","text":"When your website never changes","isCorrect":false},{"id":"c","text":"When you have no API data","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering5-6';

UPDATE questions 
SET options = '[{"id":"a","text":"They allow parts of React components to render on the server without sending unnecessary JavaScript to the client","isCorrect":true},{"id":"b","text":"They replace all client-side interactivity","isCorrect":false},{"id":"c","text":"They only work in static generation","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering5-8';

UPDATE questions 
SET options = '[{"id":"a","text":"When your page depends on highly personalized data that changes per user request","isCorrect":true},{"id":"b","text":"When the content is static and rarely changes","isCorrect":false},{"id":"c","text":"When build times are slow","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering5-10';

UPDATE questions 
SET options = '[{"id":"a","text":"Cache-Control: must-revalidate","isCorrect":true},{"id":"b","text":"Cache-Control: immutable","isCorrect":false},{"id":"c","text":"ETag: strong","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering8-2';

UPDATE questions 
SET options = '[{"id":"a","text":"It stores static assets closer to the user geographically to reduce latency","isCorrect":true},{"id":"b","text":"It only caches dynamic content for faster hydration","isCorrect":false},{"id":"c","text":"It disables browser caching entirely","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering8-4';

UPDATE questions 
SET options = '[{"id":"a","text":"It ensures browsers fetch updated assets when changes occur","isCorrect":true},{"id":"b","text":"It prevents caching altogether","isCorrect":false},{"id":"c","text":"It slows down content delivery","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering8-6';

UPDATE questions 
SET options = '[{"id":"a","text":"ETag and If-None-Match","isCorrect":true},{"id":"b","text":"Cache-Control: immutable","isCorrect":false},{"id":"c","text":"Last-Modified and If-Match","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering8-8';

UPDATE questions 
SET options = '[{"id":"a","text":"Serves a stale cache immediately and revalidates it in the background","isCorrect":true},{"id":"b","text":"Deletes old cache entries before fetching new ones","isCorrect":false},{"id":"c","text":"Disables revalidation for dynamic pages","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering8-10';

UPDATE questions 
SET options = '[{"id":"a","text":"Time until the largest visible element (image or text block) renders","isCorrect":true},{"id":"b","text":"Total load time of all resources","isCorrect":false},{"id":"c","text":"Delay before the first user input is processed","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering9-2';

UPDATE questions 
SET options = '[{"id":"a","text":"Visual instability caused by unexpected layout movements","isCorrect":true},{"id":"b","text":"Slow data fetching","isCorrect":false},{"id":"c","text":"JavaScript bundle size issues","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering9-4';

UPDATE questions 
SET options = '[{"id":"a","text":"They define quantitative limits (like max JS size or LCP time) to prevent regressions","isCorrect":true},{"id":"b","text":"They automatically compress code bundles","isCorrect":false},{"id":"c","text":"They control the rendering order of components","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering9-8';

UPDATE questions 
SET options = '[{"id":"a","text":"First Input Delay (FID)","isCorrect":true},{"id":"b","text":"Cumulative Layout Shift (CLS)","isCorrect":false},{"id":"c","text":"Time To First Byte (TTFB)","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering9-9';

UPDATE questions 
SET options = '[{"id":"a","text":"HTML is pre-generated and can be cached for near-instant TTFB","isCorrect":true},{"id":"b","text":"The server generates HTML for every request","isCorrect":false},{"id":"c","text":"Users must fetch data before rendering","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering-2';

UPDATE questions 
SET options = '[{"id":"a","text":"Poor SEO due to server-side rendering","isCorrect":false},{"id":"b","text":"Delayed Largest Contentful Paint (LCP) since main content loads after client fetch","isCorrect":true},{"id":"c","text":"Cannot cache responses on a CDN","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering-3';

UPDATE questions 
SET options = '[{"id":"a","text":"Long build times and hitting API request limits","isCorrect":true},{"id":"b","text":"Poor SEO optimization","isCorrect":false},{"id":"c","text":"Increased client-side bundle size","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering-5';

UPDATE questions 
SET options = '[{"id":"a","text":"The server immediately returns a 404 error","isCorrect":false},{"id":"b","text":"The page is generated on-demand and cached for future requests","isCorrect":true},{"id":"c","text":"The user sees a loading spinner until next build","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering-7';

UPDATE questions 
SET options = '[{"id":"a","text":"Largest Contentful Paint (LCP)","isCorrect":true},{"id":"b","text":"Cumulative Layout Shift (CLS)","isCorrect":false},{"id":"c","text":"First Input Delay (FID)","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering-9';

UPDATE questions 
SET options = '[{"id":"a","text":"For highly personalized pages or data that changes per user request","isCorrect":true},{"id":"b","text":"For blogs and documentation","isCorrect":false},{"id":"c","text":"For e-commerce product pages updated daily","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering-10';

UPDATE questions 
SET options = '[{"id":"o1","text":"DOM-based XSS","isCorrect":true,"explanation":""},{"id":"o2","text":"Reflected XSS","isCorrect":true,"explanation":""},{"id":"o3","text":"Stored XSS","isCorrect":true,"explanation":""},{"id":"o4","text":"SQL Injection","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-01-sec2';

UPDATE questions 
SET options = '[{"id":"o1","text":"X-Frame-Options","isCorrect":true,"explanation":""},{"id":"o2","text":"Content-Security-Policy (frame-ancestors)","isCorrect":true,"explanation":""},{"id":"o3","text":"X-Content-Type-Options","isCorrect":false,"explanation":""},{"id":"o4","text":"Strict-Transport-Security","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-01-sec5';

UPDATE questions 
SET options = '[{"id":"o1","text":"Avoid dangerouslySetInnerHTML","isCorrect":true,"explanation":""},{"id":"o2","text":"Use DOMPurify or similar sanitizers","isCorrect":true,"explanation":""},{"id":"o3","text":"Use HttpOnly cookies","isCorrect":false,"explanation":""},{"id":"o4","text":"Validate input server-side","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-01-sec8';

UPDATE questions 
SET options = '[{"id":"o1","text":"Use anti-CSRF tokens in forms","isCorrect":true,"explanation":""},{"id":"o2","text":"Validate the Origin and Referer headers","isCorrect":true,"explanation":""},{"id":"o3","text":"Enable HttpOnly cookies","isCorrect":false,"explanation":""},{"id":"o4","text":"Require user confirmation for critical actions","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-02-sec11';

UPDATE questions 
SET options = '[{"id":"o1","text":"Strict-Transport-Security","isCorrect":true,"explanation":""},{"id":"o2","text":"X-Content-Type-Options","isCorrect":true,"explanation":""},{"id":"o3","text":"X-Frame-Options","isCorrect":true,"explanation":""},{"id":"o4","text":"X-Powered-By","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-02-sec14';

UPDATE questions 
SET options = '[{"id":"o1","text":"Set HttpOnly flag","isCorrect":true,"explanation":""},{"id":"o2","text":"Set Secure flag","isCorrect":true,"explanation":""},{"id":"o3","text":"Use SameSite=strict","isCorrect":true,"explanation":""},{"id":"o4","text":"Store sensitive info in localStorage","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-02-sec17';

UPDATE questions 
SET options = '[{"id":"o1","text":"Use X-Frame-Options: DENY or SAMEORIGIN","isCorrect":true,"explanation":""},{"id":"o2","text":"Use Content Security Policy frame-ancestors","isCorrect":true,"explanation":""},{"id":"o3","text":"Disable JavaScript entirely","isCorrect":false,"explanation":""},{"id":"o4","text":"Detect and prevent iframes using JS","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-03-sec20';

UPDATE questions 
SET options = '[{"id":"o1","text":"Use React’s JSX variable escaping","isCorrect":true,"explanation":""},{"id":"o2","text":"Sanitize any HTML before using dangerouslySetInnerHTML","isCorrect":true,"explanation":""},{"id":"o3","text":"Avoid inline event handlers","isCorrect":true,"explanation":""},{"id":"o4","text":"Store all sensitive data in localStorage","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-03-sec22';

UPDATE questions 
SET options = '[{"id":"o1","text":"Enforce HTTPS and HSTS","isCorrect":true,"explanation":""},{"id":"o2","text":"Validate SSL/TLS certificates","isCorrect":true,"explanation":""},{"id":"o3","text":"Use strong encryption algorithms","isCorrect":true,"explanation":""},{"id":"o4","text":"Rely only on client-side validation","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-03-sec25';

UPDATE questions 
SET options = '[{"id":"o1","text":"Use anti-CSRF tokens in forms","isCorrect":true,"explanation":""},{"id":"o2","text":"Use SameSite cookie attributes","isCorrect":true,"explanation":""},{"id":"o3","text":"Disable HTTPS","isCorrect":false,"explanation":""},{"id":"o4","text":"Validate origin and referer headers","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-04-sec28';

UPDATE questions 
SET options = '[{"id":"o1","text":"Use meta tag in HTML","isCorrect":true,"explanation":""},{"id":"o2","text":"Set HTTP response headers","isCorrect":true,"explanation":""},{"id":"o3","text":"Rely solely on HTTPS","isCorrect":false,"explanation":""},{"id":"o4","text":"Whitelist only trusted sources","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-04-sec31';

UPDATE questions 
SET options = '[{"id":"o1","text":"Set HttpOnly flag","isCorrect":true,"explanation":""},{"id":"o2","text":"Set Secure flag for HTTPS","isCorrect":true,"explanation":""},{"id":"o3","text":"Use SameSite attribute","isCorrect":true,"explanation":""},{"id":"o4","text":"Store passwords directly in cookies","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-04-sec34';

UPDATE questions 
SET options = '[{"id":"o1","text":"Use X-Frame-Options header","isCorrect":true,"explanation":""},{"id":"o2","text":"Use Content Security Policy frame-ancestors directive","isCorrect":true,"explanation":""},{"id":"o3","text":"Obfuscate your buttons with CSS","isCorrect":false,"explanation":""},{"id":"o4","text":"Require user confirmation for critical actions","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-05-sec36';

UPDATE questions 
SET options = '[{"id":"o1","text":"Encrypts traffic between client and server","isCorrect":true,"explanation":""},{"id":"o2","text":"Prevents tampering of data in transit","isCorrect":true,"explanation":""},{"id":"o3","text":"Automatically detects phishing websites","isCorrect":false,"explanation":""},{"id":"o4","text":"Ensures integrity via TLS certificates","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-05-sec38';

UPDATE questions 
SET options = '[{"id":"o1","text":"DOM-based XSS","isCorrect":false,"explanation":""},{"id":"o2","text":"Reflected XSS","isCorrect":false,"explanation":""},{"id":"o3","text":"Stored XSS","isCorrect":true,"explanation":""},{"id":"o4","text":"All are equally dangerous","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-05-sec40';

UPDATE questions 
SET options = '[{"id":"o1","text":"Input validation and sanitization","isCorrect":true,"explanation":""},{"id":"o2","text":"Using HttpOnly cookies","isCorrect":true,"explanation":""},{"id":"o3","text":"Avoid inline scripts and use external scripts","isCorrect":true,"explanation":""},{"id":"o4","text":"Use eval() to encode input","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-05-sec41';

UPDATE questions 
SET options = '[{"id":"o1","text":"Use CSRF tokens in forms and API requests","isCorrect":true,"explanation":""},{"id":"o2","text":"Use SameSite cookies","isCorrect":true,"explanation":""},{"id":"o3","text":"Validate the origin or referer header","isCorrect":true,"explanation":""},{"id":"o4","text":"Rely only on HTTPS","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-06-sec44';

UPDATE questions 
SET options = '[{"id":"o1","text":"X-Frame-Options","isCorrect":true,"explanation":""},{"id":"o2","text":"Content-Security-Policy","isCorrect":false,"explanation":""},{"id":"o3","text":"Strict-Transport-Security","isCorrect":false,"explanation":""},{"id":"o4","text":"X-Content-Type-Options","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-06-sec46';

UPDATE questions 
SET options = '[{"id":"o1","text":"HTTP","isCorrect":false,"explanation":""},{"id":"o2","text":"HTTPS","isCorrect":true,"explanation":""},{"id":"o3","text":"Both are equally safe","isCorrect":false,"explanation":""},{"id":"o4","text":"Depends on browser","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-06-sec50';

UPDATE questions 
SET options = '[{"id":"o1","text":"Encrypts data between client and server","isCorrect":true,"explanation":""},{"id":"o2","text":"Validates server identity using certificates","isCorrect":true,"explanation":""},{"id":"o3","text":"Blocks phishing emails automatically","isCorrect":false,"explanation":""},{"id":"o4","text":"Prevents cookie theft if Secure flag is set","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-07-sec52';

UPDATE questions 
SET options = '[{"id":"o1","text":"Set Access-Control-Allow-Origin to a specific trusted domain","isCorrect":true,"explanation":""},{"id":"o2","text":"Use credentials (cookies) only when necessary","isCorrect":true,"explanation":""},{"id":"o3","text":"Set Access-Control-Allow-Origin to ''*''","isCorrect":false,"explanation":""},{"id":"o4","text":"Use server-side proxy to handle requests","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-07-sec54';

UPDATE questions 
SET options = '[{"id":"o1","text":"Escape HTML before rendering","isCorrect":true,"explanation":""},{"id":"o2","text":"Sanitize input using libraries like DOMPurify","isCorrect":true,"explanation":""},{"id":"o3","text":"Use dangerouslySetInnerHTML without sanitization","isCorrect":false,"explanation":""},{"id":"o4","text":"Implement Content Security Policy (CSP)","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-07-sec58';

UPDATE questions 
SET options = '[{"id":"o1","text":"Use X-Frame-Options header to deny framing","isCorrect":true,"explanation":""},{"id":"o2","text":"Use Content Security Policy frame-ancestors directive","isCorrect":true,"explanation":""},{"id":"o3","text":"Rely only on HTTPS","isCorrect":false,"explanation":""},{"id":"o4","text":"Implement UI overlays as security measure","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-07-sec60';

UPDATE questions 
SET options = '[{"id":"o1","text":"Use CSRF tokens for forms","isCorrect":true,"explanation":""},{"id":"o2","text":"Validate Origin and Referer headers","isCorrect":true,"explanation":""},{"id":"o3","text":"Rely only on HTTPS","isCorrect":false,"explanation":""},{"id":"o4","text":"Use SameSite attribute on cookies","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-08-sec62';

UPDATE questions 
SET options = '[{"id":"o1","text":"Use authentication tokens like JWT","isCorrect":true,"explanation":""},{"id":"o2","text":"Enforce HTTPS for all API requests","isCorrect":true,"explanation":""},{"id":"o3","text":"Validate all user inputs on the server","isCorrect":true,"explanation":""},{"id":"o4","text":"Rely only on client-side checks","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-08-sec65';

UPDATE questions 
SET options = '[{"id":"o1","text":"Restrict sources of scripts, styles, and media","isCorrect":true,"explanation":""},{"id":"o2","text":"Prevent inline script execution","isCorrect":true,"explanation":""},{"id":"o3","text":"Encrypt cookies automatically","isCorrect":false,"explanation":""},{"id":"o4","text":"Mitigate XSS attacks","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-08-sec67';

UPDATE questions 
SET options = '[{"id":"o1","text":"Stored XSS persists in the database and affects multiple users","isCorrect":true,"explanation":""},{"id":"o2","text":"Reflected XSS occurs immediately and is non-persistent","isCorrect":true,"explanation":""},{"id":"o3","text":"Reflected XSS stores payload in server database","isCorrect":false,"explanation":""},{"id":"o4","text":"Stored XSS is less dangerous than reflected XSS","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-08-sec69';

UPDATE questions 
SET options = '[{"id":"o1","text":"Use short-lived tokens and refresh them securely","isCorrect":true,"explanation":""},{"id":"o2","text":"Store tokens in memory or HttpOnly cookies","isCorrect":true,"explanation":""},{"id":"o3","text":"Rely solely on localStorage for tokens","isCorrect":false,"explanation":""},{"id":"o4","text":"Invalidate sessions on logout and after inactivity","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-08-sec70';

UPDATE questions 
SET options = '[{"id":"o1","text":"Use X-Frame-Options header","isCorrect":true,"explanation":""},{"id":"o2","text":"Use Content Security Policy frame-ancestors directive","isCorrect":true,"explanation":""},{"id":"o3","text":"Disable JavaScript completely","isCorrect":false,"explanation":""},{"id":"o4","text":"Use secure authentication only","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-09-sec72';

UPDATE questions 
SET options = '[{"id":"o1","text":"Use HTTPS for all communication","isCorrect":true,"explanation":""},{"id":"o2","text":"Validate SSL/TLS certificates","isCorrect":true,"explanation":""},{"id":"o3","text":"Implement HSTS headers","isCorrect":true,"explanation":""},{"id":"o4","text":"Rely only on network-level security","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-09-sec74';

UPDATE questions 
SET options = '[{"id":"o1","text":"Encrypts data in transit","isCorrect":true,"explanation":""},{"id":"o2","text":"Prevents eavesdropping and tampering","isCorrect":true,"explanation":""},{"id":"o3","text":"Automatically sanitizes user inputs","isCorrect":false,"explanation":""},{"id":"o4","text":"Provides server authentication","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-09-sec77';

UPDATE questions 
SET options = '[{"id":"o1","text":"Use CSRF tokens in forms","isCorrect":true,"explanation":""},{"id":"o2","text":"Use SameSite cookie attribute","isCorrect":true,"explanation":""},{"id":"o3","text":"Use HTTPS","isCorrect":true,"explanation":""},{"id":"o4","text":"Disable cookies completely","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-10-sec82';

UPDATE questions 
SET options = '[{"id":"o1","text":"DOM-based XSS executes purely on the client side","isCorrect":true,"explanation":""},{"id":"o2","text":"Stored XSS persists in a database or storage and affects multiple users","isCorrect":true,"explanation":""},{"id":"o3","text":"DOM-based XSS stores payloads on the server","isCorrect":false,"explanation":""},{"id":"o4","text":"Stored XSS only affects a single user","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-10-sec83';

UPDATE questions 
SET options = '[{"id":"o1","text":"Restricts sources of scripts and other resources","isCorrect":true,"explanation":""},{"id":"o2","text":"Helps prevent XSS attacks","isCorrect":true,"explanation":""},{"id":"o3","text":"Replaces the need for input validation","isCorrect":false,"explanation":""},{"id":"o4","text":"Can block inline styles and scripts if configured","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-10-sec85';

UPDATE questions 
SET options = '[{"id":"o1","text":"Prevents cookies from being sent with cross-site requests by default","isCorrect":true,"explanation":""},{"id":"o2","text":"Mitigates CSRF attacks","isCorrect":true,"explanation":""},{"id":"o3","text":"Encrypts cookie contents","isCorrect":false,"explanation":""},{"id":"o4","text":"Prevents cookies from being accessed via JavaScript","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-10-sec87';

UPDATE questions 
SET options = '[{"id":"o1","text":"Use HttpOnly to prevent JavaScript access","isCorrect":true,"explanation":""},{"id":"o2","text":"Use Secure flag to enforce HTTPS transmission","isCorrect":true,"explanation":""},{"id":"o3","text":"Avoid storing sensitive tokens in localStorage","isCorrect":true,"explanation":""},{"id":"o4","text":"Use SameSite attribute to mitigate CSRF","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-10-sec88';

UPDATE questions 
SET options = '[{"id":"o1","text":"Use JSX curly braces to escape content","isCorrect":true,"explanation":""},{"id":"o2","text":"Sanitize any user-generated HTML before using dangerouslySetInnerHTML","isCorrect":true,"explanation":""},{"id":"o3","text":"Use external scripts instead of inline scripts","isCorrect":true,"explanation":""},{"id":"o4","text":"Store session tokens in localStorage without encryption","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-10-sec90';

UPDATE questions 
SET options = '[{"id":"o1","text":"Use X-Frame-Options header to deny framing","isCorrect":true,"explanation":""},{"id":"o2","text":"Use Content Security Policy frame-ancestors directive","isCorrect":true,"explanation":""},{"id":"o3","text":"Ensure HTTPS is used","isCorrect":false,"explanation":""},{"id":"o4","text":"Use JavaScript frame-busting techniques","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-11-sec92';

UPDATE questions 
SET options = '[{"id":"o1","text":"Encrypts data in transit","isCorrect":true,"explanation":""},{"id":"o2","text":"Authenticates the server using certificates","isCorrect":true,"explanation":""},{"id":"o3","text":"Prevents phishing attacks","isCorrect":false,"explanation":""},{"id":"o4","text":"Prevents unauthorized data tampering","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-11-sec94';

UPDATE questions 
SET options = '[{"id":"o1","text":"User input is reflected without sanitization","isCorrect":true,"explanation":""},{"id":"o2","text":"Using dangerouslySetInnerHTML without sanitation","isCorrect":true,"explanation":""},{"id":"o3","text":"Input validation for forms","isCorrect":false,"explanation":""},{"id":"o4","text":"Content loaded dynamically from unknown sources","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-11-sec95';

UPDATE questions 
SET options = '[{"id":"o1","text":"Prevents JavaScript from accessing the cookie","isCorrect":true,"explanation":""},{"id":"o2","text":"Encrypts cookie contents","isCorrect":false,"explanation":""},{"id":"o3","text":"Prevents cookies from being sent over HTTP","isCorrect":false,"explanation":""},{"id":"o4","text":"Automatically rotates session cookies","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-11-sec97';

UPDATE questions 
SET options = '[{"id":"o1","text":"Automatically escapes data in JSX expressions","isCorrect":true,"explanation":""},{"id":"o2","text":"Prevents execution of scripts in user content","isCorrect":true,"explanation":""},{"id":"o3","text":"Replaces the need for server-side validation","isCorrect":false,"explanation":""},{"id":"o4","text":"Removes all HTML from user input","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-11-sec99';

UPDATE questions 
SET options = '[{"id":"o1","text":"Offset-based pagination","isCorrect":true,"explanation":""},{"id":"o2","text":"Cursor-based pagination","isCorrect":true,"explanation":""},{"id":"o3","text":"Infinite scrolling","isCorrect":true,"explanation":""},{"id":"o4","text":"Randomized pagination","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q1';

UPDATE questions 
SET options = '[{"id":"o1","text":"SSR improves SEO but requires servers to render each request","isCorrect":true,"explanation":""},{"id":"o2","text":"CSR improves interactivity but may delay first paint","isCorrect":true,"explanation":""},{"id":"o3","text":"SSG pre-renders content, making it very fast for static pages","isCorrect":true,"explanation":""},{"id":"o4","text":"CSR is always better than SSR","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q4';

UPDATE questions 
SET options = '[{"id":"o1","text":"Use WebP or AVIF formats","isCorrect":true,"explanation":""},{"id":"o2","text":"Lazy load images below the fold","isCorrect":true,"explanation":""},{"id":"o3","text":"Serve images via CDN with caching","isCorrect":true,"explanation":""},{"id":"o4","text":"Always use raw PNGs without compression","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q7';

UPDATE questions 
SET options = '[{"id":"o1","text":"Long polling sends repeated HTTP requests to check for updates","isCorrect":true,"explanation":""},{"id":"o2","text":"WebSockets provide full-duplex communication between client and server","isCorrect":true,"explanation":""},{"id":"o3","text":"SSE is a one-way push from server to client","isCorrect":true,"explanation":""},{"id":"o4","text":"WebSockets are always the best choice","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q10';

UPDATE questions 
SET options = '[{"id":"o1","text":"Lazy loading delays loading of code/resources until needed","isCorrect":true,"explanation":""},{"id":"o2","text":"Code splitting divides the app into smaller chunks","isCorrect":true,"explanation":""},{"id":"o3","text":"They are the same concept with different names","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q11';

UPDATE questions 
SET options = '[{"id":"o1","text":"Perceivable","isCorrect":true,"explanation":""},{"id":"o2","text":"Operable","isCorrect":true,"explanation":""},{"id":"o3","text":"Understandable","isCorrect":true,"explanation":""},{"id":"o4","text":"Robust","isCorrect":true,"explanation":""},{"id":"o5","text":"Fast","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q14';

UPDATE questions 
SET options = '[{"id":"o1","text":"Optimistic update: update UI before server confirms","isCorrect":true,"explanation":""},{"id":"o2","text":"Pessimistic update: update UI after server confirms","isCorrect":true,"explanation":""},{"id":"o3","text":"Both approaches are identical","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q16';

UPDATE questions 
SET options = '[{"id":"o1","text":"Micro-frontends allow independent teams to build and deploy parts of the UI","isCorrect":true,"explanation":""},{"id":"o2","text":"Micro-frontends always simplify performance optimization","isCorrect":false,"explanation":""},{"id":"o3","text":"They increase architectural complexity","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q20';

UPDATE questions 
SET options = '[{"id":"1","text":"CSR loads JavaScript first and renders in the browser; SSR renders HTML on the server per request; SSG pre-renders HTML at build time.","isCorrect":true,"explanation":"CSR delays first render but enables rich interactivity; SSR improves SEO and first load but adds server cost; SSG is best for static content with CDN delivery."},{"id":"2","text":"CSR is faster than SSR in all cases.","isCorrect":false,"explanation":""},{"id":"3","text":"SSG cannot be cached on CDN.","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q21';

UPDATE questions 
SET options = '[{"id":"1","text":"Lazy loading defers the loading of non-critical resources until they are needed.","isCorrect":true,"explanation":"Helps reduce initial load time and improves perceived performance."},{"id":"2","text":"Lazy loading means loading all resources as early as possible.","isCorrect":false,"explanation":""},{"id":"3","text":"Lazy loading only applies to JavaScript modules, not images.","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q24';

UPDATE questions 
SET options = '[{"id":"o1","text":"Removes unused CSS from the DOM","isCorrect":false,"explanation":""},{"id":"o2","text":"Removes unused JavaScript exports from bundles","isCorrect":true,"explanation":""},{"id":"o3","text":"Shakes DOM nodes to re-render faster","isCorrect":false,"explanation":""},{"id":"o4","text":"Optimizes images automatically","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q25';

UPDATE questions 
SET options = '[{"id":"o1","text":"Prefetch is for resources needed immediately","isCorrect":false,"explanation":""},{"id":"o2","text":"Preload is for resources needed immediately","isCorrect":true,"explanation":""},{"id":"o3","text":"Prefetch is for resources likely needed in future","isCorrect":true,"explanation":""},{"id":"o4","text":"Preload defers resources until user interaction","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q28';

UPDATE questions 
SET options = '[{"id":"o1","text":"Semantic HTML improves SEO","isCorrect":true,"explanation":""},{"id":"o2","text":"Semantic HTML is ignored by screen readers","isCorrect":false,"explanation":""},{"id":"o3","text":"Semantic HTML improves accessibility for keyboard and screen reader users","isCorrect":true,"explanation":""},{"id":"o4","text":"Semantic HTML automatically optimizes bundle size","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q30';

UPDATE questions 
SET options = '[{"id":"o1","text":"Client repeatedly sends requests at a fixed interval","isCorrect":false,"explanation":""},{"id":"o2","text":"Client sends a request, server responds only when new data is available, then client repeats","isCorrect":true,"explanation":""},{"id":"o3","text":"Client uses WebSocket connection for continuous streaming","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q35';

UPDATE questions 
SET options = '[{"id":"o1","text":"SSE is unidirectional (server -> client)","isCorrect":true,"explanation":""},{"id":"o2","text":"WebSocket is bidirectional (client <-> server)","isCorrect":true,"explanation":""},{"id":"o3","text":"SSE requires a persistent TCP connection like WebSocket","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q37';

UPDATE questions 
SET options = '[{"id":"o1","text":"REST returns fixed data structures per endpoint","isCorrect":true,"explanation":""},{"id":"o2","text":"GraphQL allows client to request exactly the fields needed","isCorrect":true,"explanation":""},{"id":"o3","text":"GraphQL cannot support real-time updates","isCorrect":false,"explanation":""},{"id":"o4","text":"REST APIs can never be cached","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q39';

UPDATE questions 
SET options = '[{"id":"o1","text":"Offset-based: simple, can have duplicates","isCorrect":true,"explanation":""},{"id":"o2","text":"Cursor-based: more reliable for dynamic data","isCorrect":true,"explanation":""},{"id":"o3","text":"Infinite scroll: UX-friendly but can be tricky to manage state","isCorrect":true,"explanation":""},{"id":"o4","text":"All approaches are identical in performance","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q43';

UPDATE questions 
SET options = '[{"id":"o1","text":"Reflow recalculates layout and can trigger repaint","isCorrect":true,"explanation":""},{"id":"o2","text":"Repaint only redraws pixels without layout calculation","isCorrect":true,"explanation":""},{"id":"o3","text":"Reflow and repaint are the same","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q46';

UPDATE questions 
SET options = '[{"id":"o1","text":"Infinite scroll automatically loads more content as user scrolls","isCorrect":true,"explanation":""},{"id":"o2","text":"Pros: improves UX for browsing feeds, keeps engagement high","isCorrect":true,"explanation":""},{"id":"o3","text":"Cons: harder to track scroll position and can impact memory","isCorrect":true,"explanation":""},{"id":"o4","text":"Infinite scroll replaces the need for backend pagination","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q50';

UPDATE questions 
SET options = '[{"id":"o1","text":"Controlled components have state managed by React via props","isCorrect":true,"explanation":""},{"id":"o2","text":"Uncontrolled components manage state internally using refs","isCorrect":true,"explanation":""},{"id":"o3","text":"Controlled components are faster than uncontrolled in all cases","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q52';

UPDATE questions 
SET options = '[{"id":"o1","text":"Local state is component-specific","isCorrect":true,"explanation":""},{"id":"o2","text":"Global state is shared across multiple components","isCorrect":true,"explanation":""},{"id":"o3","text":"Server state comes from APIs and must be synchronized","isCorrect":true,"explanation":""},{"id":"o4","text":"All states are automatically synchronized with the server","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q54';

UPDATE questions 
SET options = '[{"id":"o1","text":"REST endpoints return fixed data structures","isCorrect":true,"explanation":""},{"id":"o2","text":"GraphQL allows querying only required fields","isCorrect":true,"explanation":""},{"id":"o3","text":"GraphQL eliminates the need for pagination","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q57';

UPDATE questions 
SET options = '[{"id":"o1","text":"localStorage persists data indefinitely across sessions","isCorrect":true,"explanation":""},{"id":"o2","text":"sessionStorage persists data only for the session","isCorrect":true,"explanation":""},{"id":"o3","text":"IndexedDB is useful for storing large structured data","isCorrect":true,"explanation":""},{"id":"o4","text":"localStorage automatically syncs with the server","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q60';

UPDATE questions 
SET options = '[{"id":"o1","text":"JWT is self-contained, includes claims, can be verified without server","isCorrect":true,"explanation":""},{"id":"o2","text":"Opaque tokens are random identifiers, require server to validate","isCorrect":true,"explanation":""},{"id":"o3","text":"JWT cannot be used in SPAs","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q76';

UPDATE questions 
SET options = '[{"id":"o1","text":"Authentication verifies user identity","isCorrect":true,"explanation":""},{"id":"o2","text":"Authorization determines access level or permissions","isCorrect":true,"explanation":""},{"id":"o3","text":"They are the same","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q79';

UPDATE questions 
SET options = '[{"id":"o1","text":"Missing alt text on images","isCorrect":true,"explanation":""},{"id":"o2","text":"Poor color contrast","isCorrect":true,"explanation":""},{"id":"o3","text":"Non-focusable interactive elements","isCorrect":true,"explanation":""},{"id":"o4","text":"Using semantic HTML","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q84';

UPDATE questions 
SET options = '[{"id":"o1","text":"i18n is the process of designing for multiple languages","isCorrect":true,"explanation":""},{"id":"o2","text":"l10n is the process of adapting content for a specific locale","isCorrect":true,"explanation":""},{"id":"o3","text":"i18n and l10n are the same","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q86';

UPDATE questions 
SET options = '[{"id":"o1","text":"Progressive enhancement starts with basic functionality and adds features for modern browsers","isCorrect":true,"explanation":""},{"id":"o2","text":"Graceful degradation starts with full features and reduces functionality for older browsers","isCorrect":true,"explanation":""},{"id":"o3","text":"They are exactly the same","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q89';

UPDATE questions 
SET options = '[{"id":"o1","text":"AppCache was limited and inflexible","isCorrect":true,"explanation":""},{"id":"o2","text":"Service Worker provides programmable caching and background sync","isCorrect":true,"explanation":""},{"id":"o3","text":"Both are actively supported","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q104';

UPDATE questions 
SET options = '[{"id":"o1","text":"Authentication verifies who the user is","isCorrect":true,"explanation":""},{"id":"o2","text":"Authorization decides what the user can access","isCorrect":true,"explanation":""},{"id":"o3","text":"They are the same thing","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q111';

UPDATE questions 
SET options = '[{"id":"o1","text":"Strict: cookie only sent for same-site requests","isCorrect":true,"explanation":""},{"id":"o2","text":"Lax: cookie sent for same-site and top-level navigations","isCorrect":true,"explanation":""},{"id":"o3","text":"None: cookie sent in all requests but must be Secure","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q118';

UPDATE questions 
SET options = '[{"id":"o1","text":"Synthetic monitoring simulates user interactions with scripts","isCorrect":true,"explanation":""},{"id":"o2","text":"RUM measures actual user interactions","isCorrect":true,"explanation":""},{"id":"o3","text":"Synthetic monitoring always gives more accurate results than RUM","isCorrect":false,"explanation":""},{"id":"o4","text":"RUM does not work for frontend applications","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q133';

UPDATE questions 
SET options = '[{"id":"o1","text":"Proactive monitoring aims to detect issues before users are impacted","isCorrect":true,"explanation":""},{"id":"o2","text":"Reactive monitoring only responds after an issue is reported","isCorrect":true,"explanation":""},{"id":"o3","text":"Proactive monitoring is not possible for frontend apps","isCorrect":false,"explanation":""},{"id":"o4","text":"Reactive monitoring uses tools like alerts and dashboards","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q140';

UPDATE questions 
SET options = '[{"id":"o1","text":"Unit tests: small, fast, isolated","isCorrect":true,"explanation":""},{"id":"o2","text":"Integration tests: verify modules working together","isCorrect":true,"explanation":""},{"id":"o3","text":"E2E tests: full system flows in browser","isCorrect":true,"explanation":""},{"id":"o4","text":"E2E tests should replace unit tests","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q151';

UPDATE questions 
SET options = '[{"id":"o1","text":"Cypress: developer-friendly, great debugging UX","isCorrect":true,"explanation":""},{"id":"o2","text":"Playwright: cross-browser automation and parallelism","isCorrect":true,"explanation":""},{"id":"o3","text":"Selenium: mature but heavier and more complex to manage","isCorrect":true,"explanation":""},{"id":"o4","text":"None of the above are used for E2E","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q154';

UPDATE questions 
SET options = '[{"id":"o1","text":"Run lint and unit tests locally before PR","isCorrect":true,"explanation":""},{"id":"o2","text":"Run full E2E suite in CI (not required for every local dev run)","isCorrect":true,"explanation":""},{"id":"o3","text":"Skip build step in CI","isCorrect":false,"explanation":""},{"id":"o4","text":"Run heavy integration tests only in CI pipelines","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q156';

UPDATE questions 
SET options = '[{"id":"o1","text":"Fail CI build on critical lint or test failures","isCorrect":true,"explanation":""},{"id":"o2","text":"Block merge unless coverage meets threshold (e.g., >80%)","isCorrect":true,"explanation":""},{"id":"o3","text":"Ignore E2E failures permanently","isCorrect":false,"explanation":""},{"id":"o4","text":"Publish test reports and comments on PR for visibility","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q160';