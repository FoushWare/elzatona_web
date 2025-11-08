INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '761b646e-4375-4227-9e77-7939d67ec03a',
          'What are the differences between `redux-saga` and `redux-thunk`?',
          'Thunk uses Promises and is simple; Saga uses Generators and is powerful for complex flows.',
          'multiple-choice',
          'intermediate',
          8,
          '[{"id":"a","text":"Saga uses Promises; Thunk uses Generators","isCorrect":false},{"id":"b","text":"Thunk uses Promises; Saga uses Generators","isCorrect":true},{"id":"c","text":"Both are identical","isCorrect":false},{"id":"d","text":"Saga is deprecated","isCorrect":false}]',
          NULL,
          'Thunk is easier for simple cases; Saga is better for complex async logic (cancellation, race conditions, etc.).',
          NULL,
          ARRAY[]::text[],
          ARRAY['redux','thunk','saga','middleware']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q126","original_type":"multiple-choice","topic":"Redux Middleware","subcategory":"State Management","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '01645e0d-031b-47db-97c9-bfd670af3354',
          'What is Redux DevTools?',
          'Redux DevTools is a time-travel debugging environment for Redux with action replay and hot reloading.',
          'multiple-choice',
          'beginner',
          5,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'It lets you inspect every action and state change, rewind, and replay actions—great for debugging.',
          NULL,
          ARRAY[]::text[],
          ARRAY['redux','devtools','debugging','time-travel']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q127","original_type":"open-ended","topic":"Redux DevTools","subcategory":"State Management","sample_answers":["Redux DevTools is a browser extension or library that provides a UI to inspect Redux store changes, dispatch actions manually, and travel back in time.","It shows a timeline of actions, lets you cancel past actions, and re-evaluates state when reducer code changes."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '0626f51a-78a5-490c-9e49-9cce5e383248',
          'What are the features of Redux DevTools?',
          'Features include state/action inspection, time travel, reducer hot reloading, error tracking, and state persistence.',
          'multiple-choice',
          'beginner',
          6,
          '[{"id":"a","text":"Only shows console logs","isCorrect":false},{"id":"b","text":"State inspection, time travel, hot reloading, error tracking, persistence","isCorrect":true},{"id":"c","text":"Replaces the need for unit tests","isCorrect":false},{"id":"d","text":"Only works in production","isCorrect":false}]',
          NULL,
          'Key features: inspect state/actions, cancel actions (time travel), hot reload reducers, see errors, persist debug sessions.',
          NULL,
          ARRAY[]::text[],
          ARRAY['redux-devtools','debugging','features']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q128","original_type":"multiple-choice","topic":"Redux DevTools","subcategory":"State Management","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '4b4efb57-083c-49bc-83c4-7158501f989d',
          'What are Redux selectors and why use them?',
          'Selectors are functions that compute derived data from Redux state. They enable memoization and reduce redundant calculations.',
          'multiple-choice',
          'intermediate',
          7,
          '[{"id":"a","text":"They directly mutate the Redux state","isCorrect":false},{"id":"b","text":"They compute derived data and memoize results for performance","isCorrect":true},{"id":"c","text":"They replace reducers","isCorrect":false},{"id":"d","text":"They are only for async logic","isCorrect":false}]',
          NULL,
          'Selectors compute derived data (e.g., filtered lists) and memoize results to avoid recomputation unless inputs change.',
          NULL,
          ARRAY[]::text[],
          ARRAY['redux','selectors','reselect','memoization']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q129","original_type":"multiple-choice","topic":"Reselect","subcategory":"State Management","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '0c0c7577-4284-48f1-9517-737ccb2b02c2',
          'What is Redux Form?',
          'Redux Form is a library that manages form state in Redux, handling values, validation, and submission.',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'It stores all form state (values, errors, touched fields) in Redux, enabling complex form logic and persistence.',
          NULL,
          ARRAY[]::text[],
          ARRAY['redux-form','forms','validation']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q130","original_type":"open-ended","topic":"Redux Form","subcategory":"State Management","sample_answers":["Redux Form integrates with React and Redux to keep all form state (input values, validation errors, submission status) in the Redux store.","It provides higher-order components and action creators to manage form lifecycle and validation."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '9ef8e351-a560-400f-b90f-f71e23127e68',
          'What are the main features of Redux Form?',
          'Features include field value persistence, sync/async validation, and formatting/parsing of field values.',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"Only basic input binding","isCorrect":false},{"id":"b","text":"Field persistence, validation, formatting/parsing","isCorrect":true},{"id":"c","text":"Replaces React components","isCorrect":false},{"id":"d","text":"Only works with class components","isCorrect":false}]',
          NULL,
          'It handles form state, validation (sync and async), and data transformation (formatting, parsing, normalization).',
          NULL,
          ARRAY[]::text[],
          ARRAY['redux-form','features','validation']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q131","original_type":"multiple-choice","topic":"Redux Form","subcategory":"State Management","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '480737ae-a76e-4fab-9899-f6a466421cfa',
          'How to add multiple middlewares to Redux?',
          'Use `applyMiddleware()` from Redux, passing all middleware functions as arguments.',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          '`applyMiddleware(thunk, logger)(createStore)` chains multiple middleware functions.',
          NULL,
          ARRAY[]::text[],
          ARRAY['redux','middleware','applymiddleware']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q132","original_type":"open-ended","topic":"Redux Middleware","subcategory":"State Management","sample_answers":["Use `applyMiddleware(middleware1, middleware2)(createStore)` to compose multiple middleware functions when creating the store.","Example: `const store = createStore(reducer, applyMiddleware(thunk, logger));`"],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'b978add4-c896-474c-a66e-7922d2c87bd3',
          'How to set initial state in Redux?',
          'Pass the initial state as the second argument to `createStore()`.',
          'multiple-choice',
          'beginner',
          5,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          '`createStore(reducer, initialState)` sets the starting state of the store.',
          NULL,
          ARRAY[]::text[],
          ARRAY['redux','initial-state','createstore']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q133","original_type":"open-ended","topic":"Redux Store","subcategory":"State Management","sample_answers":["Call `createStore(rootReducer, initialState)` where `initialState` is a plain object matching your state shape.","This is useful for server-side rendering or preloading data from localStorage."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '3656885b-03f2-4b83-950a-ef0a512fe05d',
          'How is Relay different from Redux?',
          'Relay manages only server-originated state via GraphQL; Redux manages all application state.',
          'multiple-choice',
          'advanced',
          8,
          '[{"id":"a","text":"Relay uses REST APIs","isCorrect":false},{"id":"b","text":"Relay manages only server state via GraphQL; Redux manages all state","isCorrect":true},{"id":"c","text":"Redux requires GraphQL","isCorrect":false},{"id":"d","text":"They are identical","isCorrect":false}]',
          NULL,
          'Relay is GraphQL-specific and handles caching/optimization automatically; Redux is general-purpose.',
          NULL,
          ARRAY[]::text[],
          ARRAY['relay','redux','graphql','state-management']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q134","original_type":"multiple-choice","topic":"Relay vs Redux","subcategory":"State Management","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '7b57833d-41f1-440f-aa84-0c02a9a4a9ad',
          'What is an action in Redux?',
          'An action is a plain JavaScript object with a `type` property that describes what happened.',
          'multiple-choice',
          'beginner',
          5,
          '[{"id":"a","text":"A function that mutates state","isCorrect":false},{"id":"b","text":"A plain object with a `type` property","isCorrect":true},{"id":"c","text":"A class instance","isCorrect":false},{"id":"d","text":"A Promise","isCorrect":false}]',
          NULL,
          'Actions are payloads of information sent to the store. They must have a `type` string.',
          NULL,
          ARRAY[]::text[],
          ARRAY['redux','actions','flux-standard-action']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q135","original_type":"multiple-choice","topic":"Redux Actions","subcategory":"State Management","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '83329d6d-c270-498e-88ac-59110afe5d15',
          'What is the difference between React Native and React?',
          'React is for web UIs; React Native compiles to native mobile components for iOS/Android.',
          'multiple-choice',
          'beginner',
          5,
          '[{"id":"a","text":"React Native uses HTML","isCorrect":false},{"id":"b","text":"React is for web; React Native is for native mobile apps","isCorrect":true},{"id":"c","text":"React Native cannot use JavaScript","isCorrect":false},{"id":"d","text":"They are the same library","isCorrect":false}]',
          NULL,
          'React targets the DOM; React Native targets native mobile APIs using platform-specific components.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','react-native','mobile']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q136","original_type":"multiple-choice","topic":"React Native Basics","subcategory":"Core Concepts","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'd5fa77dc-5ad1-47b3-979c-62df27b143b5',
          'How to test React Native apps?',
          'Test using iOS/Android simulators or real devices via Expo, which syncs using QR codes over the same network.',
          'multiple-choice',
          'beginner',
          5,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Expo simplifies testing by allowing you to scan a QR code to run the app on a physical device connected to the same Wi-Fi.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react-native','expo','testing','simulator']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q137","original_type":"open-ended","topic":"React Native Testing","subcategory":"Testing & Debugging","sample_answers":["Use Expo to run your app on a real device by scanning a QR code, or use iOS/Android simulators from Xcode or Android Studio.","Ensure your computer and mobile device are on the same network when using Expo for live reloading."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'f0051664-8d02-478b-befb-18daaedd11c5',
          'How to do logging in React Native?',
          'Use `console.log()`, and view logs with `react-native log-ios` or `react-native log-android`.',
          'multiple-choice',
          'beginner',
          4,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Standard `console` methods work, and logs can be viewed via CLI commands or Chrome DevTools.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react-native','logging','console']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q138","original_type":"open-ended","topic":"React Native Debugging","subcategory":"Testing & Debugging","sample_answers":["Use `console.log()` in your code, then run `react-native log-ios` or `react-native log-android` to see output in the terminal.","You can also debug in Chrome DevTools by enabling remote debugging in the developer menu."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '63469036-63c3-4964-9845-2e8d214b0174',
          'How to debug your React Native?',
          'Use the in-app developer menu (Cmd+D on iOS simulator), then open Chrome DevTools at `http://localhost:8081/debugger-ui`.',
          'multiple-choice',
          'beginner',
          5,
          '[{"id":"a","text":"Only use Xcode debugger","isCorrect":false},{"id":"b","text":"Use Cmd+D in simulator, then Chrome DevTools at localhost:8081/debugger-ui","isCorrect":true},{"id":"c","text":"Debugging is not supported","isCorrect":false},{"id":"d","text":"Use Firefox only","isCorrect":false}]',
          NULL,
          'The debug workflow involves opening the dev menu, enabling remote JS debugging, and using Chrome DevTools.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react-native','debugging','devtools']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q139","original_type":"multiple-choice","topic":"React Native Debugging","subcategory":"Testing & Debugging","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'f82fc720-4ead-4d2a-8e58-6cbcea0ab2fa',
          'What is Reselect and how it works?',
          'Reselect is a selector library that uses memoization to avoid recomputing derived data unless inputs change.',
          'multiple-choice',
          'intermediate',
          7,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'It caches the last result and arguments; if inputs are the same, it returns the cached output without recomputing.',
          NULL,
          ARRAY[]::text[],
          ARRAY['reselect','selectors','memoization','redux']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q140","original_type":"open-ended","topic":"Reselect","subcategory":"State Management","sample_answers":["Reselect creates memoized selectors that only recompute when their input arguments change, improving performance in Redux apps.","It uses a `createSelector` function that takes input selectors and a result function, caching the output for identical inputs."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '176d22fd-2628-45a0-9454-175f41636782',
          'What is Flow?',
          'Flow is a static type checker for JavaScript that catches type errors at compile time.',
          'multiple-choice',
          'beginner',
          5,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Flow analyzes code with type annotations to find bugs like null dereferences before runtime.',
          NULL,
          ARRAY[]::text[],
          ARRAY['flow','typescript','static-typing','javascript']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q141","original_type":"open-ended","topic":"Static Type Checking","subcategory":"TypeScript Basics","sample_answers":["Flow is a static analysis tool that adds type annotations to JavaScript and checks for type errors during development.","It helps catch common bugs like calling methods on null or passing wrong argument types."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '47a0910b-386d-4403-b8a6-75e8f86890de',
          'What is the difference between Flow and PropTypes?',
          'Flow is a static type checker (compile-time); PropTypes is a runtime type checker for React component props.',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"PropTypes is static; Flow is runtime","isCorrect":false},{"id":"b","text":"Flow is static (compile-time); PropTypes is runtime (only for props)","isCorrect":true},{"id":"c","text":"Both are identical","isCorrect":false},{"id":"d","text":"PropTypes can check entire codebase","isCorrect":false}]',
          NULL,
          'Flow checks all code at build time; PropTypes only checks component props at runtime and is less comprehensive.',
          NULL,
          ARRAY[]::text[],
          ARRAY['flow','proptypes','typing','react']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q142","original_type":"multiple-choice","topic":"Static vs Runtime Typing","subcategory":"TypeScript Basics","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'd76142e0-236b-4972-ae4b-9317746812cc',
          'How to use Font Awesome icons in React?',
          'Install `font-awesome`, import CSS in `index.js`, and use `<i className="fa fa-icon-name" />`.',
          'multiple-choice',
          'beginner',
          5,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Font Awesome provides icon fonts; you include the CSS and use class names in JSX.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','font-awesome','icons','css']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q143","original_type":"open-ended","topic":"Third-Party Libraries","subcategory":"React Basics","sample_answers":["Install `font-awesome` via npm, import the CSS file in your entry point, then use `<i className=\"fa fa-spinner\" />` in components.","Note: Modern apps often use SVG-based icon libraries like `react-icons` instead of font-based ones."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '8d0a41b1-fcf9-4077-8268-190f7e7787bc',
          'What is React Dev Tools?',
          'React DevTools is a browser extension or standalone app for inspecting React component hierarchy, props, and state.',
          'multiple-choice',
          'beginner',
          5,
          '[{"id":"a","text":"A code formatter","isCorrect":false},{"id":"b","text":"A tool to inspect React components, props, and state","isCorrect":true},{"id":"c","text":"Only works with Angular","isCorrect":false},{"id":"d","text":"A testing framework","isCorrect":false}]',
          NULL,
          'It lets you explore the component tree, view props/state, and profile performance.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react-devtools','debugging','chrome-extension']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q144","original_type":"multiple-choice","topic":"React Developer Tools","subcategory":"React Basics","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '699d9036-3d5d-49ec-b82b-44839ab59bef',
          'Why is DevTools not loading in Chrome for local files?',
          'Because Chrome blocks extensions from accessing `file://` URLs by default. You must enable ''Allow access to file URLs'' in extension settings.',
          'multiple-choice',
          'beginner',
          4,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Chrome extensions are sandboxed; you must manually allow file URL access in `chrome://extensions`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react-devtools','chrome','file-urls']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q145","original_type":"open-ended","topic":"React Developer Tools","subcategory":"React Basics","sample_answers":["Open `chrome://extensions`, find React DevTools, and check ''Allow access to file URLs'' to enable it for local HTML files.","Alternatively, serve your app via a local server (e.g., `npx serve`) instead of opening `file://` directly."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '798d0d49-d1bd-422b-82f1-f915053cb9a4',
          'How to use Polymer in React?',
          'Create a Polymer element, import it in HTML, and use the custom element tag in JSX.',
          'multiple-choice',
          'advanced',
          8,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'React can render custom elements defined by Polymer by treating them as regular HTML tags.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','polymer','web-components']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q146","original_type":"open-ended","topic":"Web Components","subcategory":"Integration","sample_answers":["Define a Polymer element, import its HTML file in your main `index.html`, then use `<calendar-element />` in your React JSX.","Note: You may need to handle event naming differences (e.g., `onMyEvent` vs `onmyevent`) and property binding carefully."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '01424bdf-819d-4b18-bf78-d36edf361ac9',
          'What are the advantages of React over Vue.js?',
          'React offers more flexibility in large apps, easier testing, better mobile support (React Native), and a larger ecosystem.',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"Vue has better mobile support","isCorrect":false},{"id":"b","text":"React offers more flexibility, easier testing, React Native, and larger ecosystem","isCorrect":true},{"id":"c","text":"Vue is harder to learn","isCorrect":false},{"id":"d","text":"React has no advantages","isCorrect":false}]',
          NULL,
          'These are common perceived advantages, though both frameworks are capable.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','vue','comparison','ecosystem']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q147","original_type":"multiple-choice","topic":"React Ecosystem","subcategory":"React Basics","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '900ef983-a446-4532-a106-2714d56ab2ea',
          'What is the difference between React and Angular?',
          'React is a UI library with JSX and unidirectional data flow; Angular is a full framework with templates and two-way binding.',
          'multiple-choice',
          'intermediate',
          7,
          '[{"id":"a","text":"React is a full framework like Angular","isCorrect":false},{"id":"b","text":"React is a library (View only); Angular is a full framework (MVC)","isCorrect":true},{"id":"c","text":"Angular uses JSX","isCorrect":false},{"id":"d","text":"React has two-way data binding","isCorrect":false}]',
          NULL,
          'React is view-only, uses JavaScript syntax (JSX), and has one-way data flow. Angular is a full MVC framework with HTML templates and two-way binding.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','angular','comparison','frameworks']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q148","original_type":"multiple-choice","topic":"Framework Comparison","subcategory":"React Basics","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '896bfa0b-cd07-4d60-9688-f19db2a1f379',
          'Why React tab is not showing up in DevTools?',
          'Because the page isn’t using React, or React failed to initialize and communicate with DevTools.',
          'multiple-choice',
          'beginner',
          5,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'DevTools detects React via a global hook set during React initialization. If React isn’t loaded or is in production mode, the tab won’t appear.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react-devtools','debugging','setup']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q149","original_type":"open-ended","topic":"React Developer Tools","subcategory":"React Basics","sample_answers":["The React DevTools tab appears only if React is loaded on the page and not in production mode. Check that you’re using a development build of React.","If using a bundler, ensure React is included and the app is running in development mode."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'd10a7391-bcb2-4ac3-af91-f98b4eb74d88',
          'What are Styled Components?',
          '`styled-components` is a CSS-in-JS library that lets you write actual CSS in JavaScript to style React components.',
          'multiple-choice',
          'beginner',
          6,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'It removes the mapping between styles and components by generating unique class names and injecting styles automatically.',
          NULL,
          ARRAY[]::text[],
          ARRAY['styled-components','css-in-js','react','styling']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q150","original_type":"open-ended","topic":"Styled Components","subcategory":"CSS-in-JS","sample_answers":["`styled-components` allows you to write CSS inside JavaScript template literals, creating styled React components with automatic scoping and vendor prefixing.","Example: `const Title = styled.h1\\`color: red;\\`;` creates a component that renders an `<h1>` with red text."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'b5568611-e3bb-4e00-9a84-15c07a3c13a1',
          'Give an example of Styled Components',
          'Create styled `Title` and `Wrapper` components using `styled.h1` and `styled.section` with CSS inside backticks.',
          'multiple-choice',
          'beginner',
          6,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Styled Components uses tagged template literals to define styles, creating components that apply those styles when rendered.',
          NULL,
          ARRAY[]::text[],
          ARRAY['styled-components','example','react','css']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q151","original_type":"open-ended","topic":"Styled Components","subcategory":"CSS-in-JS","sample_answers":["```javascript\nimport styled from ''styled-components'';\nconst Title = styled.h1`\n  font-size: 1.5em;\n  color: palevioletred;\n`;\nconst Wrapper = styled.section`\n  padding: 4em;\n  background: papayawhip;\n`;\n// Usage: <Wrapper><Title>Hello</Title></Wrapper>\n```","The `styled` function takes a tag name and returns a component that renders that tag with the specified styles."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'a82f5aa6-c1f6-41ba-86c1-89c9e8a3a2a6',
          'Give an example of Styled Components?',
          'Create styled `<Title>` and `<Wrapper>` components using `styled.h1` and `styled.section` with CSS inside backticks.

```javascript
import React from "react";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;
```

Usage:
```jsx
<Wrapper>
  <Title>{"Lets start first styled component!"}</Title>
</Wrapper>
```',
          'multiple-choice',
          'beginner',
          6,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Styled Components uses tagged template literals to define scoped CSS that is automatically injected and applied to React components.',
          NULL,
          ARRAY[]::text[],
          ARRAY['styled-components','css-in-js','react','styling']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q151","original_type":"open-ended","topic":"Styled Components","subcategory":"CSS-in-JS","sample_answers":["The `styled` function creates a new React component with encapsulated styles. Example: `const Title = styled.h1\\`color: red;\\`;` renders an `<h1>` with red text.","Styled Components generates unique class names to avoid style collisions and supports dynamic styling via props."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'a5f0e67e-f629-4e7f-b4b7-d03896ad66ef',
          'What is Relay?',
          'Relay is a JavaScript framework for providing a data layer and client-server communication to web applications using the React view layer.',
          'multiple-choice',
          'advanced',
          8,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Relay is a GraphQL client that manages server-originated state, handles caching, and optimizes data fetching for React applications.',
          NULL,
          ARRAY[]::text[],
          ARRAY['relay','graphql','react','data-fetching']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q152","original_type":"open-ended","topic":"Relay","subcategory":"State Management","sample_answers":["Relay is a GraphQL-based data-fetching framework for React that automatically manages caching, pagination, and mutations with strong typing.","Unlike Redux, Relay only stores data fetched from a GraphQL server and uses declarative queries to specify component data needs."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '5068a08f-b24e-4a7f-9402-9f44c8dd02ba',
          'What are the main features of Reselect library?',
          '1. Selectors compute derived data
2. Selectors are efficient (memoized)
3. Selectors are composable',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"It replaces reducers","isCorrect":false},{"id":"b","text":"It provides memoized, composable selectors for derived data","isCorrect":true},{"id":"c","text":"It handles async actions","isCorrect":false},{"id":"d","text":"It manages global state outside Redux","isCorrect":false}]',
          NULL,
          'Reselect enables performant derived data computation in Redux apps through memoized, composable selector functions.',
          NULL,
          ARRAY[]::text[],
          ARRAY['reselect','selectors','redux','memoization']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q153","original_type":"multiple-choice","topic":"Reselect","subcategory":"State Management","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'e787b158-88d9-4a15-92c3-88f2a303fca3',
          'Give an example of Reselect usage?',
          'Use `createSelector` to build memoized selectors for subtotal, tax, and total from shop state.',
          'multiple-choice',
          'intermediate',
          8,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Reselect’s `createSelector` takes input selectors and a result function, caching output until inputs change.',
          NULL,
          ARRAY[]::text[],
          ARRAY['reselect','redux','selectors','example']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q154","original_type":"open-ended","topic":"Reselect","subcategory":"State Management","sample_answers":["```javascript\nimport { createSelector } from ''reselect'';\nconst items = state => state.shop.items;\nconst subtotal = createSelector(items, i => i.reduce((a, b) => a + b.value, 0));\n```","Selectors can be composed: tax depends on subtotal, total depends on both—each recomputes only when its dependencies change."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '994c0cd2-7ccd-4921-978d-746a4181f11d',
          'Can Redux only be used with React?',
          'No. Redux is a standalone state container that can be used with any UI layer (Angular, Vue, etc.) or even without a UI.',
          'true-false',
          'beginner',
          4,
          '[{"id":"true","text":"True","isCorrect":false},{"id":"false","text":"False","isCorrect":true}]',
          'false',
          'Redux provides a subscription mechanism that any library or framework can use to listen to state changes.',
          NULL,
          ARRAY[]::text[],
          ARRAY['redux','framework-agnostic','state-management']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q155","original_type":"true-false","topic":"Redux","subcategory":"State Management","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '069e4f2c-643c-4ba3-80c1-a255e810f809',
          'Do you need a particular build tool to use Redux?',
          'No. Redux offers ES5 UMD builds that work without any build process, though it’s commonly used with modern tooling.',
          'true-false',
          'beginner',
          3,
          '[{"id":"true","text":"True","isCorrect":false},{"id":"false","text":"False","isCorrect":true}]',
          'false',
          'Redux provides multiple builds (ESM, CJS, UMD) and works with or without Webpack, Babel, etc.',
          NULL,
          ARRAY[]::text[],
          ARRAY['redux','build-tools','umd','bundling']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q156","original_type":"true-false","topic":"Redux","subcategory":"State Management","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '8a76a70c-ec80-42b0-8181-f57d7c9f7bc0',
          'How does Redux Form `initialValues` get updated from state?',
          'Set `enableReinitialize: true` in the `reduxForm` config to allow `initialValues` prop updates to reset the form.',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'By default, Redux Form initializes only once. `enableReinitialize: true` makes it responsive to `initialValues` prop changes.',
          NULL,
          ARRAY[]::text[],
          ARRAY['redux-form','initialvalues','react','forms']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q157","original_type":"open-ended","topic":"Redux Form","subcategory":"State Management","sample_answers":["Pass `enableReinitialize: true` to the `reduxForm()` HOC to allow the form to reinitialize when the `initialValues` prop changes.","Example: `const Form = reduxForm({ form: ''user'', enableReinitialize: true })(UserForm);`"],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '533e508d-96c0-421a-af27-3cfe81e5bb31',
          'How do React PropTypes allow different types for one prop?',
          'Use `PropTypes.oneOfType([PropTypes.string, PropTypes.number])` to accept multiple types for a single prop.',
          'multiple-choice',
          'beginner',
          5,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          '`PropTypes.oneOfType` accepts an array of type validators, allowing flexible prop definitions.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','proptypes','validation','typing']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q158","original_type":"open-ended","topic":"PropTypes","subcategory":"React Basics","sample_answers":["Use `PropTypes.oneOfType([PropTypes.string, PropTypes.number])` to allow a prop to be either a string or a number.","This is useful for props like `size` that might accept ''large'' (string) or 24 (number)."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '6a9af3e1-6a03-49ea-a89c-bbd7a7caa5b5',
          'Can I import an SVG file as a React component?',
          'Yes, with `react-scripts@2.0.0+`, use `import { ReactComponent as Logo } from ''./logo.svg'';` to treat SVGs as components.',
          'true-false',
          'beginner',
          4,
          '[{"id":"true","text":"True","isCorrect":false},{"id":"false","text":"False","isCorrect":true}]',
          'false',
          'CRA supports importing SVGs as React components, enabling props, styling, and tree-shaking.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','svg','assets','create-react-app']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q159","original_type":"true-false","topic":"Asset Handling","subcategory":"React Basics","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '9f0a0c60-c5d1-4350-8090-9b9fae353a95',
          'What is render hijacking in React?',
          'Render hijacking is controlling a component’s output by wrapping it in a Higher-Order Component (HOC) to inject props or logic.',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'It’s not true hijacking—just composition via HOCs to alter rendering behavior conditionally.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','hoc','render-hijacking','composition']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q160","original_type":"open-ended","topic":"Higher-Order Components","subcategory":"React Basics","sample_answers":["Render hijacking uses HOCs to wrap a component and modify its output by injecting props or conditional logic.","Example: A HOC that wraps a component and only renders it if the user is authenticated."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '77965af0-39e4-4608-8a58-f1425597c155',
          'How to pass numbers to React component?',
          'Pass numbers using curly braces: `<Child age={30} />`. Strings use quotes: `<Child name="Chetan" />`.',
          'multiple-choice',
          'beginner',
          4,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'JSX expressions inside `{}` are evaluated as JavaScript, so numbers, booleans, and objects must be wrapped in braces.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','props','javascript','jsx']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q161","original_type":"open-ended","topic":"Props","subcategory":"React Basics","sample_answers":["Use `<Component count={42} />` to pass the number 42. The braces tell JSX to evaluate the expression as JavaScript.","Never use quotes for numbers: `<Component count=\"42\" />` passes the string ''42'', not the number."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'afe70056-1f0d-4d70-b08a-dee36d89254f',
          'Do I need to keep all my state in Redux? Should I use React internal state?',
          'No. Use Redux for global/shared state; use React component state for local/UI state (e.g., dropdown open/closed).',
          'multiple-choice',
          'intermediate',
          7,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Ask: Is this state shared? Needed for debugging? Used in multiple components? If not, keep it local.',
          NULL,
          ARRAY[]::text[],
          ARRAY['redux','react-state','best-practices','state-management']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q162","original_type":"open-ended","topic":"Redux Best Practices","subcategory":"State Management","sample_answers":["Keep global, shared, or persistent state in Redux. Keep transient UI state (e.g., form input, modal open) in component state.","Rules of thumb: if only one component cares, or it’s ephemeral, use useState. If multiple components or time-travel matters, use Redux."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'a41a0efb-4fb4-43ed-9159-d32bdfa1ac07',
          'What is the purpose of registerServiceWorker in React?',
          'It registers a service worker to cache assets, enabling offline functionality and improved performance.',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'The service worker caches static assets so the app works offline or on slow networks.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','service-worker','pwa','offline']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q163","original_type":"open-ended","topic":"PWAs (Progressive Web Apps)","subcategory":"Performance & Monitoring","sample_answers":["`registerServiceWorker()` sets up a service worker that caches the app shell and assets, enabling offline use and faster repeat visits.","It’s part of Create React App’s PWA support—users can install the app and use it without internet."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'e9a4c8af-5cb6-43fe-b7ec-ffb472c0d4cc',
          'What is React memo function?',
          '`React.memo` is a higher-order component that prevents re-renders of function components when props haven’t changed.',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'It’s the functional component equivalent of `PureComponent` for class components.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','memo','performance','optimization']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q164","original_type":"open-ended","topic":"Performance Optimization","subcategory":"React Basics","sample_answers":["`React.memo(MyComponent)` returns a memoized version that only re-renders if props change (shallow comparison by default).","Use it to optimize expensive components that receive the same props frequently."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'e541fd1f-106a-4918-a4ee-72b26252f44e',
          'What is React lazy function?',
          '`React.lazy` lets you load components dynamically via `import()` for code-splitting.',
          'multiple-choice',
          'intermediate',
          7,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'It returns a promise that resolves to a component, which must be rendered inside `Suspense`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','lazy','code-splitting','dynamic-import']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q165","original_type":"open-ended","topic":"Code Splitting","subcategory":"React Basics","sample_answers":["`const LazyComp = React.lazy(() => import(''./LazyComp''));` loads the component only when needed, reducing initial bundle size.","Must be used with `<Suspense fallback={...}>` to show a loading state while the chunk loads."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'c59b1b5b-572d-4f0d-a8b1-693c21d82c05',
          'How to prevent unnecessary updates using setState?',
          'In functional `setState`, return `null` if the new state equals the current state to skip re-rendering.',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Returning `null` from functional `setState` tells React to skip the update and re-render.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','setstate','optimization','performance']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q166","original_type":"open-ended","topic":"State Management","subcategory":"React Basics","sample_answers":["In `setState((state) => { if (state.x === newX) return null; else return { x: newX }; })`, returning `null` prevents re-render.","This is useful for avoiding redundant updates when new data matches current state."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'ae9ce6e7-4ca8-4d7b-ab48-2a90e24a1b59',
          'How do you render Arrays, Strings, and Numbers in React 16+?',
          'React 16+ allows returning arrays, strings, and numbers directly from `render()` without a wrapper element.',
          'multiple-choice',
          'beginner',
          5,
          '[{"id":"a","text":"You must always wrap in a `<div>`","isCorrect":false},{"id":"b","text":"You can return arrays, strings, and numbers directly","isCorrect":true},{"id":"c","text":"Only objects are allowed","isCorrect":false},{"id":"d","text":"Strings cause hydration errors","isCorrect":false}]',
          NULL,
          'Before React 16, `render()` had to return a single root element. Now it can return arrays, strings, or numbers.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','fragments','rendering','arrays']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q167","original_type":"multiple-choice","topic":"Fragments & Rendering","subcategory":"React Basics","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '86b42956-47c5-4525-913c-f35ee1a5578a',
          'What are hooks?',
          'Hooks are functions that let you use state and other React features in function components without classes.',
          'multiple-choice',
          'beginner',
          5,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Hooks like `useState` and `useEffect` enable stateful logic in functional components.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','hooks','useState','function-components']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q168","original_type":"open-ended","topic":"React Hooks","subcategory":"React Hooks","sample_answers":["Hooks are functions like `useState` and `useEffect` that let function components manage state and side effects.","They allow extracting stateful logic into reusable custom hooks, improving code organization."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '06aece6c-497b-4c3b-bf4c-d524fbb151f9',
          'What rules need to be followed for hooks?',
          '1. Call hooks only at the top level
2. Call hooks only from React functions (components or custom hooks)',
          'multiple-choice',
          'intermediate',
          7,
          '[{"id":"a","text":"Call hooks inside loops and conditions","isCorrect":false},{"id":"b","text":"Call hooks only at top level and from React functions","isCorrect":true},{"id":"c","text":"Hooks can be called from any JavaScript function","isCorrect":false},{"id":"d","text":"Order of hook calls doesn’t matter","isCorrect":false}]',
          NULL,
          'These rules ensure hooks are called in the same order every render, preserving state consistency.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','hooks','rules-of-hooks','eslint']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q169","original_type":"multiple-choice","topic":"Rules of Hooks","subcategory":"React Hooks","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '6e3e4c17-ff53-4968-a0d6-63078b83c316',
          'How to ensure hooks follow the rules in your project?',
          'Use the `eslint-plugin-react-hooks` ESLint plugin with the `react-hooks/rules-of-hooks` rule enabled.',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'This plugin enforces the two rules of hooks and is included by default in Create React App.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','hooks','eslint','linting']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q170","original_type":"open-ended","topic":"Rules of Hooks","subcategory":"React Hooks","sample_answers":["Install `eslint-plugin-react-hooks` and enable `react-hooks/rules-of-hooks` in ESLint config to catch violations at build time.","The plugin also includes `exhaustive-deps` to validate effect dependencies."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '9592aa78-2e24-4bca-b115-2a2efe06f931',
          'What are the differences between Flux and Redux?',
          'Flux has multiple mutable stores and a dispatcher; Redux has a single immutable store and no dispatcher.',
          'multiple-choice',
          'intermediate',
          8,
          '[{"id":"a","text":"Flux uses immutable state; Redux uses mutable state","isCorrect":false},{"id":"b","text":"Flux: multiple mutable stores, dispatcher; Redux: single immutable store, no dispatcher","isCorrect":true},{"id":"c","text":"Redux has multiple dispatchers","isCorrect":false},{"id":"d","text":"They are identical","isCorrect":false}]',
          NULL,
          'Redux simplifies Flux by using a single store, pure reducers, and no dispatcher.',
          NULL,
          ARRAY[]::text[],
          ARRAY['flux','redux','comparison','architecture']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q171","original_type":"multiple-choice","topic":"Flux vs Redux","subcategory":"State Management","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '90caf549-5a9c-4e96-88b6-68dec1a78f03',
          'What are the benefits of React Router V4?',
          '1. Component-based API
2. Automatic history management
3. Smaller bundle size via modular imports',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"Requires manual history setup","isCorrect":false},{"id":"b","text":"Component-based, auto history, smaller bundles","isCorrect":true},{"id":"c","text":"Only works with class components","isCorrect":false},{"id":"d","text":"No support for dynamic routes","isCorrect":false}]',
          NULL,
          'React Router v4 treats routes as components, simplifying composition and reducing boilerplate.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react-router','routing','v4','components']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q172","original_type":"multiple-choice","topic":"React Router","subcategory":"React Router","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'f9848e17-11ee-4101-828f-8e2a1b6789e2',
          'Describe the componentDidCatch lifecycle method signature',
          '`componentDidCatch(error, info)` receives the error object and an info object with a componentStack.',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'This method is called after an error is thrown in a child component tree.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','error-boundaries','componentdidcatch','lifecycle']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q173","original_type":"open-ended","topic":"Error Boundaries","subcategory":"Error Handling","sample_answers":["`componentDidCatch(error, info)` where `error` is the thrown error and `info.componentStack` shows the component hierarchy.","Used in error boundary components to log errors and display fallback UI."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '884877fe-fd2a-46ba-8372-f587b20cca39',
          'In which scenarios do error boundaries not catch errors?',
          '1. Event handlers
2. Async code (setTimeout)
3. Server-side rendering
4. Errors in the error boundary itself',
          'multiple-choice',
          'intermediate',
          7,
          '[{"id":"a","text":"They catch all errors everywhere","isCorrect":false},{"id":"b","text":"Not in event handlers, async code, SSR, or self-errors","isCorrect":true},{"id":"c","text":"They work in setTimeout callbacks","isCorrect":false},{"id":"d","text":"They catch syntax errors in modules","isCorrect":false}]',
          NULL,
          'Error boundaries only catch errors during rendering, in lifecycle methods, and in constructors.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','error-boundaries','limitations','debugging']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q174","original_type":"multiple-choice","topic":"Error Boundaries","subcategory":"Error Handling","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );;