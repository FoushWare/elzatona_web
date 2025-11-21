-- Batch 14: Questions 131-140 (10 questions)
INSERT INTO questions (
  id, title, content, type, difficulty, points, options, correct_answer, 
  explanation, test_cases, hints, tags, metadata, stats, category_id, 
  learning_card_id, is_active, created_at, updated_at, topic_id, time_limit
) VALUES (
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
    NULL,
    'Some of the main features of Redux Form are:

     1. Field values persistence via Redux store.
     2. Validation (sync/async) and submission.
     3. Formatting, parsing and normalization of field values.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'state-management', 'advanced'],
    '{"source":"reference.md","section":"React Redux","originalNum":131}'::jsonb,
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
    NULL,
    'You can use `applyMiddleware()`.

     For example, you can add `redux-thunk` and `logger` passing them as arguments to `applyMiddleware()`:',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'state-management', 'advanced'],
    '{"source":"reference.md","section":"React Redux","originalNum":132}'::jsonb,
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
    NULL,
    'You need to pass initial state as second argument to createStore:',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'state-management', 'advanced'],
    '{"source":"reference.md","section":"React Redux","originalNum":133}'::jsonb,
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
    'How Relay is different from Redux?',
    'Relay is similar to Redux in that they both use a single store. The main difference is that relay only manages state originated from the server, and all access to the state is used via _GraphQL_ queries (for reading data) and mutations (for changing data). Relay caches the data for you and optimizes data fetching for you, by fetching only changed data and nothing more.',
    'open-ended',
    'advanced',
    10,
    NULL,
    NULL,
    'Relay is similar to Redux in that they both use a single store. The main difference is that relay only manages state originated from the server, and all access to the state is used via _GraphQL_ queries (for reading data) and mutations (for changing data). Relay caches the data for you and optimizes data fetching for you, by fetching only changed data and nothing more.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'state-management', 'advanced'],
    '{"source":"reference.md","section":"React Redux","originalNum":134}'::jsonb,
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
    NULL,
    '_Actions_ are plain JavaScript objects or payloads of information that send data from your application to your store. They are the only source of information for the store. Actions must have a type property that indicates the type of action being performed.

     For example, let''s take an action which represents adding a new todo item:',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'state-management', 'advanced'],
    '{"source":"reference.md","section":"React Redux","originalNum":135}'::jsonb,
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
    'What is the difference between React Native and React?',
    '**React** is a JavaScript library, supporting both front end web and being run on the server, for building user interfaces and web applications.

     **React Native** is a mobile framework that compiles to native app components, allowing you to build native mobile applications (iOS, Android, and Windows) in JavaScript that allows you to use React to build your components, and implements React under the hood.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    '**React** is a JavaScript library, supporting both front end web and being run on the server, for building user interfaces and web applications.

     **React Native** is a mobile framework that compiles to native app components, allowing you to build native mobile applications (iOS, Android, and Windows) in JavaScript that allows you to use React to build your components, and implements React under the hood.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'react-native', 'intermediate'],
    '{"source":"reference.md","section":"React Native","originalNum":136}'::jsonb,
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
    'How to test React Native apps?',
    'React Native can be tested only in mobile simulators like iOS and Android. You can run the app in your mobile using expo app (https://expo.io) Where it syncs using QR code, your mobile and computer should be in same wireless network.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'React Native can be tested only in mobile simulators like iOS and Android. You can run the app in your mobile using expo app (https://expo.io) Where it syncs using QR code, your mobile and computer should be in same wireless network.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'react-native', 'intermediate'],
    '{"source":"reference.md","section":"React Native","originalNum":137}'::jsonb,
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
    'How to do logging in React Native?',
    '<pre><code>     $ react-native log-ios
     $ react-native log-android</code></pre>

You can use `console.log`, `console.warn`, etc. As of React Native v0.29 you can simply run the following to see logs in the console:',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'You can use `console.log`, `console.warn`, etc. As of React Native v0.29 you can simply run the following to see logs in the console:',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'react-native', 'intermediate'],
    '{"source":"reference.md","section":"React Native","originalNum":138}'::jsonb,
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
    NULL,
    'Follow the below steps to debug React Native app:

     1. Run your application in the iOS simulator.
     2. Press `Command + D` and a webpage should open up at `http://localhost:8081/debugger-ui`.
     3. Enable _Pause On Caught Exceptions_ for a better debugging experience.
     4. Press `Command + Option + I` to open the Chrome Developer tools, or open it via `View` -> `Developer` -> `Developer Tools`.
     5. You should now be able to debug as you normally would.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'react-native', 'intermediate'],
    '{"source":"reference.md","section":"React Native","originalNum":139}'::jsonb,
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
    'What is reselect and how it works?',
    '_Reselect_ is a **selector library** (for Redux) which uses _memoization_ concept. It was originally written to compute derived data from Redux-like applications state, but it can''t be tied to any architecture or library.

     Reselect keeps a copy of the last inputs/outputs of the last call, and recomputes the result only if one of the inputs changes. If the same inputs are provided twice in a row, Reselect returns the cached output. It''s memoization and cache are fully customizable.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    '_Reselect_ is a **selector library** (for Redux) which uses _memoization_ concept. It was originally written to compute derived data from Redux-like applications state, but it can''t be tied to any architecture or library.

     Reselect keeps a copy of the last inputs/outputs of the last call, and recomputes the result only if one of the inputs changes. If the same inputs are provided twice in a row, Reselect returns the cached output. It''s memoization and cache are fully customizable.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'integration', 'intermediate'],
    '{"source":"reference.md","section":"React supported libraries & Integration","originalNum":140}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  );
