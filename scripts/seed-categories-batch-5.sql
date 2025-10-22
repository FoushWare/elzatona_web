INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'a87193fc-56b2-475d-a581-9fd61d63fc06',
          'What types of values can `useState` hold?',
          'Any type: primitives, objects, arrays, functions, null, undefined. But objects/arrays require immutability for re-renders.',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"Only strings and numbers","isCorrect":false},{"id":"b","text":"Any type, but objects/arrays must be immutable","isCorrect":true},{"id":"c","text":"Functions are not allowed","isCorrect":false},{"id":"d","text":"Only primitives","isCorrect":false}]',
          NULL,
          'React compares state by reference, so mutating objects/arrays won’t trigger re-renders.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','usestate','state','immutability']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q275","original_type":"multiple-choice","topic":"useState","subcategory":"React Hooks","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '5063b55c-8656-4a81-8c09-2dbc82b57ca7',
          'What happens if you call `useState` conditionally?',
          'React throws a runtime error because hooks must be called in the same order every render.',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Conditional hook calls break React’s internal hook order tracking, causing bugs.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','hooks','conditional','rules-of-hooks']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q276","original_type":"open-ended","topic":"Rules of Hooks","subcategory":"React Hooks","sample_answers":["Calling `useState` inside an `if` statement violates the Rules of Hooks—React can’t match hooks to their state across renders.","Always call hooks at the top level of your component, before any early returns or conditionals."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '428065b8-a32c-4e17-8fec-0f6d43cd249f',
          'Is useState synchronous or asynchronous?',
          '`useState` call is sync; state updates are async (batched). Use `useEffect` to observe new state.',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'State updates are queued and applied before the next render, so logging state right after `setState` shows the old value.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','usestate','asynchronous','batching']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q277","original_type":"open-ended","topic":"State Updates","subcategory":"State Management","sample_answers":["`setCount(count+1); console.log(count);` logs the old value. Use `useEffect(() => { console.log(count); }, [count])` to see the new value.","React batches updates for performance, so state changes are not immediate but are applied before the next render."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'e64720da-2b25-4278-81e9-c9eaba22edab',
          'Can you explain how useState works internally?',
          'React maintains a hook list per component. Each `useState` call corresponds to a slot storing state and update queue.',
          'multiple-choice',
          'advanced',
          8,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Hooks rely on a linked list of state slots; order of calls must be consistent across renders.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','hooks','internal','useState']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q278","original_type":"open-ended","topic":"useState","subcategory":"React Hooks","sample_answers":["React keeps an array of hook states for each component. On first render, `useState` initializes a slot. On updates, it processes the update queue.","The setter function enqueues an update and schedules a re-render. On next render, React applies queued updates in order."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '5c404691-d34d-4fe5-8796-c74f24b0adf2',
          'What is `useReducer`? Why do you use it?',
          '`useReducer` manages complex state logic via actions and a reducer function, similar to Redux.',
          'multiple-choice',
          'intermediate',
          7,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'It’s ideal for state with multiple sub-values, when next state depends on previous, or for complex update logic.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','usereducer','state-management','hooks']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q279","original_type":"open-ended","topic":"useReducer","subcategory":"React Hooks","sample_answers":["`useReducer` centralizes state update logic in a reducer function, making it easier to test and debug complex state transitions.","Use it for forms, shopping carts, or any state that requires multiple related updates in response to user actions."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '3dfaa29b-4c3e-46c3-9ad0-6d0687f1725e',
          'How does `useReducer` work? Explain with an example',
          'Define a reducer function, call `useReducer(reducer, initialState)`, dispatch actions to update state.',
          'multiple-choice',
          'intermediate',
          7,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'The reducer takes current state and an action, returns new state. Dispatch sends actions to the reducer.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','usereducer','example','hooks']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q280","original_type":"open-ended","topic":"useReducer","subcategory":"React Hooks","sample_answers":["```javascript\nfunction reducer(state, action) {\n  switch(action.type) {\n    case ''increment'': return { count: state.count + 1 };\n    default: return state;\n  }\n}\nconst [state, dispatch] = useReducer(reducer, { count: 0 });\n```","Dispatch with `dispatch({ type: ''increment'' })` to trigger state updates through the reducer."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '8e828b68-037e-40d3-a24e-d56b80ae3543',
          'Can you combine `useReducer` with `useContext`?',
          'Yes. Wrap `useReducer` in a Context Provider to create a lightweight global state management system.',
          'true-false',
          'intermediate',
          6,
          '[{"id":"true","text":"True","isCorrect":false},{"id":"false","text":"False","isCorrect":true}]',
          'false',
          'This pattern mimics Redux without external libraries—ideal for medium-sized apps.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','usereducer','usecontext','global-state']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q281","original_type":"true-false","topic":"Context API","subcategory":"State Management","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'd31dfe74-61fc-41b5-9021-5dae8a3a68c2',
          'Can you dispatch multiple actions in a row with useReducer?',
          'Yes. Call `dispatch()` multiple times, or create a custom action that performs multiple state changes.',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Each `dispatch` queues an update; React processes them in order during the next render.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','usereducer','dispatch','actions']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q282","original_type":"open-ended","topic":"useReducer","subcategory":"React Hooks","sample_answers":["`dispatch({type:''inc''}); dispatch({type:''inc''});` increments twice. Or define `case ''inc_twice'': return { count: state.count + 2 };`","Multiple dispatches are batched into a single re-render, ensuring consistent state transitions."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'b501989b-889e-4e73-80d6-2ce3eb0f46c4',
          'How does useContext work? Explain with an example',
          'Create context, provide value via Provider, consume with `useContext` in child components.',
          'multiple-choice',
          'intermediate',
          7,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'The example shows auth state shared across components without prop drilling.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','usecontext','example','authentication']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q283","original_type":"open-ended","topic":"Context API","subcategory":"Context API","sample_answers":["```javascript\nconst AuthContext = createContext();\nfunction AuthProvider({children}) {\n  const [user, setUser] = useState(null);\n  return <AuthContext.Provider value={{user, login, logout}}>{children}</AuthContext.Provider>;\n}\n// In child: const {user, login} = useContext(AuthContext);\n```","This pattern allows any component to access auth state and methods without passing props through every level."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '57439c36-9968-48de-b784-904110deba60',
          'Can you use multiple contexts in one component?',
          'Yes. Call `useContext` once for each context in the same component.',
          'true-false',
          'intermediate',
          5,
          '[{"id":"true","text":"True","isCorrect":false},{"id":"false","text":"False","isCorrect":true}]',
          'false',
          'Components can consume as many contexts as needed by calling `useContext` multiple times.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','multiple-contexts','usecontext','composition']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q284","original_type":"true-false","topic":"Context API","subcategory":"Context API","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '76dab8e7-2370-4797-80a2-e054fd29c0a1',
          'What''s a common pitfall when using useContext with objects?',
          'Providing a new object literal as context value causes unnecessary re-renders of all consumers.',
          'multiple-choice',
          'advanced',
          8,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'React compares context value by reference; a new object on every render triggers all consumers to re-render.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','context-pitfall','re-renders','usememo']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q285","original_type":"open-ended","topic":"Context API","subcategory":"Context API","sample_answers":["Avoid `<Provider value={{user, theme}}>`—instead, lift to state or memoize with `useMemo(() => ({user, theme}), [user, theme])`.","Split contexts by concern (e.g., `UserContext`, `ThemeContext`) to isolate re-renders to only affected components."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '3e6e5e88-9d99-4de2-ba70-6ad3046685aa',
          'What would the context value be for no matching provider?',
          'The default value passed to `createContext(defaultValue)` is returned if no Provider is found.',
          'multiple-choice',
          'intermediate',
          5,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'This is useful for testing components in isolation without wrapping them in a Provider.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','context','default-value','provider']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q286","original_type":"open-ended","topic":"Context API","subcategory":"Context API","sample_answers":["`const ThemeContext = createContext(''light'');` means `useContext(ThemeContext)` returns ''light'' if no Provider is present.","If no default is provided, the context value is `undefined` when no Provider exists."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'd9460164-3f3e-4b57-9517-b5a9a15e489d',
          'How do reactive dependencies in useEffect affect execution?',
          'Empty array: runs once. With deps: runs on mount and when deps change. No array: runs every render.',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"Effect always runs once regardless of deps","isCorrect":false},{"id":"b","text":"[]: once; [deps]: on change; none: every render","isCorrect":true},{"id":"c","text":"Deps are deep-comparison","isCorrect":false},{"id":"d","text":"Effect runs before render","isCorrect":false}]',
          NULL,
          'The dependency array controls when the effect re-runs, based on shallow equality of values.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','useeffect','dependencies','hooks']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q287","original_type":"multiple-choice","topic":"useEffect","subcategory":"React Hooks","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '522e9a5f-1e64-49f4-a0f1-26fceba04e93',
          'When does React invoke setup and cleanup in useEffect?',
          'Setup: after mount or when deps change. Cleanup: before re-running effect or on unmount.',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Cleanup ensures side effects like subscriptions or timers are properly disposed of.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','useeffect','cleanup','lifecycle']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q288","original_type":"open-ended","topic":"useEffect","subcategory":"React Hooks","sample_answers":["Setup runs after the component mounts or when dependencies change. Cleanup runs before the next setup or when the component unmounts.","Example: `useEffect(() => { const id = setInterval(...); return () => clearInterval(id); }, [])` cleans up on unmount."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '324ac1e4-6b20-427c-b2b8-b787c5025670',
          'What happens if you return a Promise from useEffect?',
          'React ignores it. useEffect must return a cleanup function or nothing—not a Promise.',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Async functions return Promises, which useEffect doesn’t handle. Do async work inside the effect, not as the effect itself.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','useeffect','async','promise']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q289","original_type":"open-ended","topic":"useEffect","subcategory":"React Hooks","sample_answers":["Never write `useEffect(async () => { ... })`. Instead, define an async function inside: `useEffect(() => { const fn = async () => { ... }; fn(); }, []);`","Returning a Promise confuses React’s cleanup mechanism and may cause memory leaks or warnings."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '3a7492d1-6945-4cd1-8e2a-1531cefb367b',
          'Can you have multiple useEffect hooks in a single component?',
          'Yes. Multiple useEffect hooks are encouraged to separate unrelated side effects.',
          'true-false',
          'beginner',
          4,
          '[{"id":"true","text":"True","isCorrect":false},{"id":"false","text":"False","isCorrect":true}]',
          'false',
          'Separating effects by concern improves readability and maintainability.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','useeffect','multiple','hooks']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q290","original_type":"true-false","topic":"useEffect","subcategory":"React Hooks","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'ca242db7-b59c-46df-b9b5-fdf93f3aa1f0',
          'How to prevent infinite loops with useEffect?',
          'Ensure state updates in effect don’t depend on values that trigger the effect, or add guards.',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Infinite loops occur when an effect updates state that’s in its dependency array, causing re-runs.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','useeffect','infinite-loop','dependencies']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q291","original_type":"open-ended","topic":"useEffect","subcategory":"React Hooks","sample_answers":["If `useEffect(() => { setCount(count + 1); }, [count]);`, it loops. Fix by removing `count` from deps if update is unconditional, or use updater function.","Add a condition: `if (count < 5) setCount(count + 1);` to break the cycle."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '3d0f4195-5ad7-450b-b9d3-3a9ee5f4045b',
          'What are the use cases of useLayoutEffect?',
          'Reading layout (size/position), preventing visual flicker, synchronously updating DOM before paint.',
          'multiple-choice',
          'advanced',
          7,
          '[{"id":"a","text":"Data fetching and logging","isCorrect":false},{"id":"b","text":"Layout measurements, preventing flicker, synchronous DOM updates","isCorrect":true},{"id":"c","text":"Replacing all useEffect calls","isCorrect":false},{"id":"d","text":"Only for server-side rendering","isCorrect":false}]',
          NULL,
          'It runs synchronously before paint, so use only when necessary to avoid blocking visual updates.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','uselayouteffect','layout','flicker']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q292","original_type":"multiple-choice","topic":"useLayoutEffect","subcategory":"React Hooks","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'e1a6d9df-80ca-4a01-b135-e2cd0ddbf2f7',
          'How does useLayoutEffect work during SSR?',
          'It doesn’t run on the server. Use a polyfill like `useIsomorphicLayoutEffect` for SSR compatibility.',
          'multiple-choice',
          'advanced',
          7,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Since there’s no DOM on the server, `useLayoutEffect` is skipped, but React warns in SSR environments.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','ssr','uselayouteffect','nextjs']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q293","original_type":"open-ended","topic":"useLayoutEffect","subcategory":"Server-Side Rendering","sample_answers":["`const useIsomorphicLayoutEffect = typeof window !== ''undefined'' ? useLayoutEffect : useEffect;` avoids SSR warnings.","In Next.js, always use this pattern for components that render on both server and client."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '3fbddf1d-bb26-46c2-8e8b-6c87bfe43bd0',
          'What happens if you use useLayoutEffect for non-layout logic?',
          'It degrades performance by blocking the browser paint for non-visual work like data fetching or logging.',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Reserve `useLayoutEffect` for layout-critical code; use `useEffect` for everything else.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','uselayouteffect','performance','anti-pattern']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q294","original_type":"open-ended","topic":"useLayoutEffect","subcategory":"React Hooks","sample_answers":["Using `useLayoutEffect` for analytics or API calls delays visual updates unnecessarily. Use `useEffect` instead.","It should only be used when you need to measure or adjust the DOM before the user sees it."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'ac8a96a6-830d-4620-9449-717db2cd2108',
          'How does useLayoutEffect cause layout thrashing?',
          'Repeated read-write DOM operations in `useLayoutEffect` force synchronous reflows, blocking rendering.',
          'multiple-choice',
          'advanced',
          8,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Each DOM read after a write triggers a reflow; doing this in `useLayoutEffect` blocks the main thread.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','layout-thrashing','uselayouteffect','performance']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q295","original_type":"open-ended","topic":"Layout Thrashing","subcategory":"Performance Optimization","sample_answers":["Avoid `const h = el.offsetHeight; el.style.height = h + 10; const newH = el.offsetHeight;` in `useLayoutEffect`—batch reads and writes.","Read all layout values first, compute changes, then apply all writes in one go to minimize reflows."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '7d11ea2e-fc98-4c99-b780-bcea4d3b9b72',
          'How to use useRef to access a DOM element?',
          'Create a ref with `useRef()`, attach to DOM element via `ref` prop, access via `ref.current`.',
          'multiple-choice',
          'beginner',
          5,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Refs provide a way to imperatively interact with DOM elements, like focusing an input.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','useref','dom','focus']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q296","original_type":"open-ended","topic":"useRef","subcategory":"React Hooks","sample_answers":["```javascript\nconst inputRef = useRef();\nreturn <input ref={inputRef} />;\n// Focus: inputRef.current.focus();\n```","Refs are the standard way to access DOM nodes in React without query selectors."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '6b0af543-78f4-494e-a316-092c949fca45',
          'Can you use useRef to persist values across renders?',
          'Yes. `useRef` holds a mutable `.current` value that persists across renders without causing re-renders.',
          'true-false',
          'intermediate',
          5,
          '[{"id":"true","text":"True","isCorrect":false},{"id":"false","text":"False","isCorrect":true}]',
          'false',
          'Unlike `useState`, updating `ref.current` doesn’t trigger a re-render, making it ideal for counters or timers.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','useref','persistence','hooks']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q297","original_type":"true-false","topic":"useRef","subcategory":"React Hooks","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '870defa5-fc5c-40a6-85ae-50472951723e',
          'Can useRef be used to store previous values?',
          'Yes. Update ref in `useEffect` to store previous props or state for comparison.',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'This pattern is common for detecting changes between renders without causing extra re-renders.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','useref','previous-value','hooks']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q298","original_type":"open-ended","topic":"useRef","subcategory":"React Hooks","sample_answers":["```javascript\nconst prevCountRef = useRef();\nuseEffect(() => { prevCountRef.current = count; }, [count]);\nconst prevCount = prevCountRef.current;\n```","This lets you compare current and previous values in render without storing them in state."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'a13ffa31-a409-4621-9048-25179ca4fc00',
          'Is it possible to access a ref in the render method?',
          'Yes, but `ref.current` is `null` during initial render until after the component mounts.',
          'multiple-choice',
          'intermediate',
          5,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Refs are populated after the component mounts, so accessing them in render is usually not useful.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','useref','render','dom']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q299","original_type":"open-ended","topic":"useRef","subcategory":"React Hooks","sample_answers":["`console.log(ref.current)` in render logs `null` on first render. Use `useEffect` to access the DOM node after mount.","Refs should be used in event handlers or effects, not in the render method itself."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '407b84c3-6357-4f16-9c32-d24e47b32289',
          'What are common use cases of useRef hook?',
          'Focus management, scroll control, DOM measurements, media playback, and integrating with non-React libraries.',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"Managing application state","isCorrect":false},{"id":"b","text":"Focus, scroll, measurements, media, and third-party libraries","isCorrect":true},{"id":"c","text":"Replacing useState","isCorrect":false},{"id":"d","text":"Only for class components","isCorrect":false}]',
          NULL,
          'Refs enable imperative interactions with DOM elements that aren’t possible with declarative React alone.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','useref','dom','imperative']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q300","original_type":"multiple-choice","topic":"useRef","subcategory":"React Hooks","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '658d3888-279f-4b98-a1c8-cf33c76437fd',
          'What is useImperativeHandle Hook? Give an example.',
          'Exposes custom methods from child to parent via ref, used with `forwardRef` for modals, inputs, etc.',
          'multiple-choice',
          'advanced',
          8,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'It lets parents control child behavior imperatively while hiding internal implementation.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','useimperativehandle','forwardref','imperative']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q301","original_type":"open-ended","topic":"useImperativeHandle","subcategory":"React Hooks","sample_answers":["```javascript\nconst Dialog = forwardRef((props, ref) => {\n  const [open, setOpen] = useState(false);\n  useImperativeHandle(ref, () => ({ open: () => setOpen(true) }));\n  return open ? <div>Dialog</div> : null;\n});\n// Parent: dialogRef.current.open();\n```","This pattern is essential for reusable component libraries that need to expose controlled APIs."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '5798f29e-c4a5-47da-8baa-39ee3b4a8a66',
          'When should you use useImperativeHandle?',
          'For reusable components that need to expose imperative methods (modals, inputs, scroll containers).',
          'multiple-choice',
          'advanced',
          7,
          '[{"id":"a","text":"For all state management","isCorrect":false},{"id":"b","text":"For modals, inputs, scroll containers in reusable libraries","isCorrect":true},{"id":"c","text":"To replace useEffect","isCorrect":false},{"id":"d","text":"Only in class components","isCorrect":false}]',
          NULL,
          'It’s for when you need to give parents controlled access to child behavior without exposing internals.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','useimperativehandle','component-libraries','api']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q302","original_type":"multiple-choice","topic":"useImperativeHandle","subcategory":"React Hooks","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'bcc498a2-f83a-4366-94a7-32cc76979126',
          'Is it possible to use useImperativeHandle without forwardRef?',
          'No. `useImperativeHandle` only works when the component is wrapped in `forwardRef`.',
          'true-false',
          'intermediate',
          6,
          '[{"id":"true","text":"True","isCorrect":false},{"id":"false","text":"False","isCorrect":true}]',
          'false',
          '`forwardRef` is required to pass the ref from parent to child so `useImperativeHandle` can attach methods to it.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','useimperativehandle','forwardref','refs']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q303","original_type":"true-false","topic":"useImperativeHandle","subcategory":"React Hooks","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'e24b8991-7020-4c7b-ae58-cdd4523e320c',
          'How is useMemo different from useCallback?',
          '`useMemo` memoizes values; `useCallback` memoizes functions.',
          'multiple-choice',
          'intermediate',
          7,
          '[{"id":"a","text":"useMemo is for functions; useCallback for values","isCorrect":false},{"id":"b","text":"useMemo memoizes values; useCallback memoizes functions","isCorrect":true},{"id":"c","text":"They are identical","isCorrect":false},{"id":"d","text":"useCallback prevents re-renders of parent","isCorrect":false}]',
          NULL,
          '`useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','usememo','usecallback','performance']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q304","original_type":"multiple-choice","topic":"useMemo vs useCallback","subcategory":"React Hooks","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '4bcda3a7-6269-45ec-b5df-385cd223b3d5',
          'Does useMemo prevent re-rendering of child components?',
          'Not directly. But when combined with `React.memo`, it prevents re-renders by preserving prop reference equality.',
          'multiple-choice',
          'advanced',
          7,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          '`useMemo` ensures the value doesn’t change between renders, so `React.memo` can skip child re-renders.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','usememo','react-memo','performance']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q305","original_type":"open-ended","topic":"useMemo","subcategory":"Performance Optimization","sample_answers":["`const data = useMemo(() => compute(data), [data]);` passed to `<Child data={data} />` where `Child = React.memo(...)` prevents re-renders if `data` hasn’t changed.","Alone, `useMemo` only optimizes the parent’s computation; with `React.memo`, it optimizes child rendering too."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '34af8801-edee-4eb7-b5b3-66a55d15d23b',
          'What is `useCallback` and why is it used?',
          '`useCallback` memoizes function references to prevent unnecessary re-renders of child components.',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Without it, new function instances on every render cause `React.memo` children to re-render unnecessarily.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','usecallback','performance','react-memo']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q306","original_type":"open-ended","topic":"useCallback","subcategory":"React Hooks","sample_answers":["`const handleClick = useCallback(() => { ... }, []);` ensures the function reference stays the same across renders.","Pass `handleClick` to a `React.memo` child to prevent it from re-rendering when parent state changes but the callback hasn’t."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '9b43e1ec-8cfa-4ecb-a332-1e1712a1ee9d',
          'What is the children prop?',
          'The `children` prop is a special prop in React used to pass elements between the opening and closing tags of a component. It is commonly used in layout and wrapper components.

A simple usage of children prop looks as below,
```jsx harmony
function MyDiv({ children }){
    return (
      <div>
        {children}
      </div>;
    );
}
export default function Greeting() {
  return (
    <MyDiv>
      <span>{"Hello"}</span>
      <span>{"World"}</span>
    </MyDiv>
  );
}
```
Here, everything inside `<MyDiv>...</MyDiv>` is passed as children to the custom div component.
The children can be text, JSX elements, fragments, arrays and functions(for advance use case like render props).',
          'multiple-choice',
          'beginner',
          2,
          '[{"id":"a","text":"It passes data from parent to child as a string","isCorrect":false},{"id":"b","text":"It allows components to receive and render nested content between their tags","isCorrect":true},{"id":"c","text":"It is only used for passing numbers","isCorrect":false},{"id":"d","text":"It is an alias for `props.data`","isCorrect":false}]',
          NULL,
          'The `children` prop allows components to wrap other elements, enabling flexible and reusable layout components like modals, cards, or containers.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','children','props','composition']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-026","original_type":"multiple-choice","topic":"Props","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'ab6f2198-14a2-419e-b89b-72f17858f963',
          'How to write comments in React?',
          'The comments in React/JSX are similar to JavaScript Multiline comments but are wrapped in curly braces.

**Single-line comments:**
```jsx harmony
<div>
  {/* Single-line comments(In vanilla JavaScript, the single-line comments are represented by double slash(//)) */}
  {`Welcome ${user}, let''s play React`}
</div>
```

**Multi-line comments:**
```jsx harmony
<div>
  {/* Multi-line comments for more than
   one line */}
  {`Welcome ${user}, let''s play React`}
</div>
```
You can use `//` and `/* */` in JS logic, hooks, and functions.',
          'multiple-choice',
          'beginner',
          2,
          '[{"id":"a","text":"Use `//` inside JSX tags","isCorrect":false},{"id":"b","text":"Use `{/* comment */}` for JSX comments","isCorrect":true},{"id":"c","text":"Comments are not allowed in React","isCorrect":false},{"id":"d","text":"Use HTML-style `<!-- -->` comments","isCorrect":false}]',
          NULL,
          'In JSX, comments must be wrapped in `{/* */}`. Regular JS comments (`//`, `/* */`) work only outside JSX expressions.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','comments','jsx','syntax']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-027","original_type":"multiple-choice","topic":"JSX","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '572029bc-9993-4fa8-8bac-809e27bf973b',
          'What is reconciliation?',
          '`Reconciliation` is the process through which React updates the Browser DOM and makes React work faster. React use a `diffing algorithm` so that component updates are predictable and faster. React would first calculate the difference between the `real DOM` and the copy of DOM `(Virtual DOM)` when there''s an update of components.

React stores a copy of Browser DOM which is called `Virtual DOM`. When we make changes or add data, React creates a new Virtual DOM and compares it with the previous one. This comparison is done by `Diffing Algorithm`.

Now React compares the Virtual DOM with Real DOM. It finds out the changed nodes and updates only the changed nodes in Real DOM leaving the rest nodes as it is. This process is called _Reconciliation_.',
          'multiple-choice',
          'intermediate',
          4,
          '[{"id":"a","text":"The process of converting JSX to JavaScript","isCorrect":false},{"id":"b","text":"React''s algorithm to compare Virtual DOM trees and update only changed real DOM nodes","isCorrect":true},{"id":"c","text":"A method to bundle React components","isCorrect":false},{"id":"d","text":"The act of mounting a component for the first time","isCorrect":false}]',
          NULL,
          'Reconciliation is React''s process of comparing Virtual DOM trees and updating the real DOM efficiently using a diffing algorithm.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','reconciliation','virtual-dom','diffing','rendering']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-028","original_type":"multiple-choice","topic":"Virtual DOM","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '382be62e-d58d-4f41-aabe-7ab6960736f9',
          'Does the lazy function support named exports?',
          'No, currently `React.lazy` function supports default exports only. If you would like to import modules which are named exports, you can create an intermediate module that reexports it as the default. It also ensures that tree shaking keeps working and don''t pull unused components.

Let''s take a component file which exports multiple named components,
```javascript
// MoreComponents.js
export const SomeComponent = /* ... */;
export const UnusedComponent = /* ... */;
```
and reexport `MoreComponents.js` components in an intermediate file `IntermediateComponent.js`
```javascript
// IntermediateComponent.js
export { SomeComponent as default } from "./MoreComponents.js";
```
Now you can import the module using lazy function as below,
```javascript
import React, { lazy } from "react";
const SomeComponent = lazy(() => import("./IntermediateComponent.js"));
```',
          'true-false',
          'intermediate',
          3,
          '[{"id":"true","text":"True","isCorrect":false},{"id":"false","text":"False","isCorrect":true}]',
          'false',
          '`React.lazy` only supports default exports. To use named exports, you must re-export them as default in an intermediate file.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','lazy','code-splitting','dynamic-import','named-exports']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-029","original_type":"true-false","topic":"Code Splitting","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '1d73e66f-088c-4fb9-b369-402eeea03eaf',
          'Why does React use className instead of the class attribute?',
          'React uses **className** instead of **class** because of a JavaScript naming conflict with the class keyword.
1. `class` is a reserved keyword in JavaScript
   In JavaScript, class is used to define ES6 classes:
   ```js
   class Person {
     constructor(name) {
       this.name = name;
     }
   }
   ```
   If you try to use class as a variable or property name, it will throw a syntax error. Since JSX is just JavaScript with XML-like syntax, using class directly in JSX would break the parser.
2. JSX Is JavaScript
   When you write JSX like this:
   ```jsx
   <div class="btn">Click</div>
   ```
   It will be compiled to:
   ```jsx
   React.createElement(''div'', { class: ''btn'' }, ''Click'');
   ```
   But `class` is invalid in this object literal context (since it clashes with the JS keyword), hence React instead uses className.
   ```jsx
   <div className="btn">Click</div>
   ```
   which compiles to:
   ```jsx
   React.createElement(''div'', { className: ''btn'' }, ''Click'');
   ```
   React then translates `className` to` class` in the final HTML DOM.
3. Aligns with DOM APIs
   In vanilla JavaScript, you interact with element classes using:
   ```js
   element.className = ''my-class'';
   ```
   React follows this convention, staying consistent with the DOM API''s property name rather than HTML’s attribute.',
          'multiple-choice',
          'beginner',
          2,
          '[{"id":"a","text":"Because `class` is a reserved keyword in JavaScript","isCorrect":true},{"id":"b","text":"To make CSS harder to write","isCorrect":false},{"id":"c","text":"Because HTML doesn’t support `class`","isCorrect":false},{"id":"d","text":"It’s a typo that became standard","isCorrect":false}]',
          NULL,
          'React uses `className` because `class` is a reserved keyword in JavaScript, and JSX compiles to JavaScript object literals where `class` would cause a syntax error.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','jsx','classname','class','dom']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-030","original_type":"multiple-choice","topic":"JSX","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '1c2fc260-d219-48c2-8bda-cdb89460c253',
          'What are Fragments?',
          'It''s a common pattern or practice in React for a component to return multiple elements. _Fragments_ let you group a list of children without adding extra nodes to the DOM.
You need to use either `<Fragment>` or a shorter syntax having empty tag (`<></>`).
Below is the example of how to use fragment inside _Story_ component.
```jsx harmony
function Story({ title, description, date }) {
  return (
    <Fragment>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>{date}</p>
    </Fragment>
  );
}
```
It is also possible to render list of fragments inside a loop with the mandatory **key** attribute supplied.
```jsx harmony
function StoryBook() {
  return stories.map((story) => (
    <Fragment key={story.id}>
      <h2>{story.title}</h2>
      <p>{story.description}</p>
      <p>{story.date}</p>
    </Fragment>
  ));
}
```
Usually, you don''t need to use `<Fragment>` until there is a need of _key_ attribute. The usage of shorter syntax looks like below.
```jsx harmony
function Story({ title, description, date }) {
  return (
    <>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>{date}</p>
    </>
  );
}
```',
          'multiple-choice',
          'beginner',
          2,
          '[{"id":"a","text":"Special components that render nothing","isCorrect":false},{"id":"b","text":"A way to group multiple elements without adding extra DOM nodes","isCorrect":true},{"id":"c","text":"Components that only render on mobile","isCorrect":false},{"id":"d","text":"A type of React error boundary","isCorrect":false}]',
          NULL,
          'Fragments allow grouping multiple elements without adding extra DOM nodes, improving performance and avoiding layout issues.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','fragments','jsx','rendering','dom']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-031","original_type":"multiple-choice","topic":"Fragments","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '235e43cf-eadc-42d7-9ae8-47ef170d5470',
          'Why are Fragments better than container divs?',
          'Below are the list of reasons to prefer fragments over container DOM elements,
1. Fragments are a bit faster and use less memory by not creating an extra DOM node. This only has a real benefit on very large and deep trees.
2. Some CSS mechanisms like _Flexbox_ and _CSS Grid_ have a special parent-child relationships, and adding divs in the middle makes it hard to keep the desired layout.
3. The DOM Inspector is less cluttered.',
          'multiple-choice',
          'intermediate',
          3,
          '[{"id":"a","text":"They are slower but easier to debug","isCorrect":false},{"id":"b","text":"They prevent CSS layout issues, improve performance, and reduce DOM clutter","isCorrect":true},{"id":"c","text":"They automatically apply styles","isCorrect":false},{"id":"d","text":"They are required for server-side rendering","isCorrect":false}]',
          NULL,
          'Fragments avoid unnecessary DOM nodes, which improves performance, preserves CSS layout (e.g., Flexbox/Grid), and reduces DOM clutter.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','fragments','performance','css','layout']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-032","original_type":"multiple-choice","topic":"Fragments","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '3a7fe0a9-52bd-460d-9890-c48db71ddff9',
          'What are portals in React?',
          'A Portal is a React feature that enables rendering children into a DOM node that exists outside the parent component''s DOM hierarchy, while still preserving the React component hierarchy. Portals help avoid CSS stacking issues—for example, elements with position: fixed may not behave as expected inside a parent with transform. Portals solve this by rendering content (like modals or tooltips) outside such constrained DOM contexts.
```javascript
ReactDOM.createPortal(child, container);
```
*   `child`: Any valid React node (e.g., JSX, string, fragment).
*   `container`: A real DOM node (e.g., `document.getElementById(''modal-root'')`).
Even though the content renders elsewhere in the DOM, it still behaves like a normal child in React. It has access to context, state, and event handling.

**Example:- Modal:**
```jsx
function Modal({ children }) {
  return ReactDOM.createPortal(
    <div className="modal">{children}</div>,
    document.body)
  );
}
```
The above code will render the modal content into the body element in the HTML, not inside the component''s usual location.',
          'multiple-choice',
          'intermediate',
          4,
          '[{"id":"a","text":"A way to share state between unrelated components","isCorrect":false},{"id":"b","text":"A feature to render children into a different DOM node while preserving React behavior","isCorrect":true},{"id":"c","text":"A method to lazy-load components","isCorrect":false},{"id":"d","text":"An alternative to React Context","isCorrect":false}]',
          NULL,
          'Portals render React children into a DOM node outside the parent hierarchy (e.g., modals into `document.body`), while maintaining React context and event handling.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','portals','modals','dom','rendering']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-033","original_type":"multiple-choice","topic":"Portals","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '63db5a84-b9cd-430e-8c82-e540a37f0da8',
          'What are stateless components?',
          'If the behaviour of a component is independent of its state then it can be a stateless component. You can use either a function or a class for creating stateless components. But unless you need to use a lifecycle hook in your components, you should go for function components. There are a lot of benefits if you decide to use function components here; they are easy to write, understand, and test, a little faster, and you can avoid the `this` keyword altogether.',
          'multiple-choice',
          'beginner',
          2,
          '[{"id":"a","text":"Components that cannot receive props","isCorrect":false},{"id":"b","text":"Components that don’t manage internal state and render based only on props","isCorrect":true},{"id":"c","text":"Components that are always class-based","isCorrect":false},{"id":"d","text":"Components that throw errors","isCorrect":false}]',
          NULL,
          'Stateless components (now called functional components) don’t manage internal state and are typically pure functions that render based on props.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','stateless','function-components','components']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-034","original_type":"multiple-choice","topic":"Components","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '688ff87a-d43e-4f7e-984b-cd27296cf571',
          'What are stateful components?',
          'If the behaviour of a component is dependent on the _state_ of the component then it can be termed as stateful component. These _stateful components_ are either function components with hooks or _class components_.

Let''s take an example of function stateful component which update the state based on click event,
```javascript
import React, {useState} from ''react'';
const App = (props) => {
const [count, setCount] = useState(0);
handleIncrement() {
  setCount(count+1);
}
return (
  <>
    <button onClick={handleIncrement}>Increment</button>
    <span>Counter: {count}</span>
  </>
  )
}
```',
          'multiple-choice',
          'beginner',
          2,
          '[{"id":"a","text":"Components that never re-render","isCorrect":false},{"id":"b","text":"Components that manage internal state and re-render when it changes","isCorrect":true},{"id":"c","text":"Components that only accept static props","isCorrect":false},{"id":"d","text":"Components that are deprecated","isCorrect":false}]',
          NULL,
          'Stateful components manage internal state using `useState` (function) or `this.state` (class), and re-render when state changes.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','stateful','state','hooks','class-components']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-035","original_type":"multiple-choice","topic":"State","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '3e7cc764-b7ff-441e-80b6-ff557298ca1c',
          'How to apply validation to props in React?',
          'When the application is running in _development mode_, React will automatically check all props that we set on components to make sure they have _correct type_. If the type is incorrect, React will generate warning messages in the console. It''s disabled in _production mode_ due to performance impact. The mandatory props are defined with `isRequired`.

The set of predefined prop types:
1. `PropTypes.number`
2. `PropTypes.string`
3. `PropTypes.array`
4. `PropTypes.object`
5. `PropTypes.func`
6. `PropTypes.node`
7. `PropTypes.element`
8. `PropTypes.bool`
9. `PropTypes.symbol`
10. `PropTypes.any`

We can define `propTypes` for `User` component as below:
```jsx harmony
import React from "react";
import PropTypes from "prop-types";
class User extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
  };
  render() {
    return (
      <>
        <h1>{`Welcome, ${this.props.name}`}</h1>
        <h2>{`Age, ${this.props.age}`}</h2>
      </>
    );
  }
}
```',
          'multiple-choice',
          'intermediate',
          3,
          '[{"id":"a","text":"Use `PropTypes` from the `prop-types` package to define expected prop types and required props","isCorrect":true},{"id":"b","text":"PropTypes work in production mode for security","isCorrect":false},{"id":"c","text":"Validation is automatic and cannot be customized","isCorrect":false},{"id":"d","text":"PropTypes are built into React since v16","isCorrect":false}]',
          NULL,
          'PropTypes validate prop types in development mode, helping catch bugs early. Required props use `.isRequired`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','proptypes','validation','type-checking','development']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-036","original_type":"multiple-choice","topic":"Props","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'a8564e7f-1db0-4c2c-90a5-4c132a1c6fed',
          'What are the advantages of React?',
          'Below are the list of main advantages of React,
1. Increases the application''s performance with _Virtual DOM_.
2. JSX makes code easy to read and write.
3. It renders both on client and server side (_SSR_).
4. Easy to integrate with frameworks (Angular, Backbone) since it is only a view library.
5. Easy to write unit and integration tests with tools such as Jest.',
          'multiple-choice',
          'beginner',
          2,
          '[{"id":"a","text":"Virtual DOM, JSX, SSR, easy integration, and testability","isCorrect":true},{"id":"b","text":"Two-way data binding and full framework features","isCorrect":false},{"id":"c","text":"Built-in state management and routing","isCorrect":false},{"id":"d","text":"No learning curve for beginners","isCorrect":false}]',
          NULL,
          'React’s key advantages include Virtual DOM for performance, JSX for readability, SSR support, framework agnosticism, and testability.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','advantages','virtual-dom','jsx','ssr']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-037","original_type":"multiple-choice","topic":"React Basics","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '423b1fe6-a147-4440-b51a-7e50a43cfaae',
          'What are the limitations of React?',
          'Apart from the advantages, there are few limitations of React too,
1. React is just a view library, not a full framework.
2. There is a learning curve for beginners who are new to web development.
3. Integrating React into a traditional MVC framework requires some additional configuration.
4. The code complexity increases with inline templating and JSX.
5. Too many smaller components leading to over engineering or boilerplate.',
          'multiple-choice',
          'beginner',
          2,
          '[{"id":"a","text":"It’s a full framework with built-in routing and state management","isCorrect":false},{"id":"b","text":"It’s just a view library, has a learning curve, and can create boilerplate","isCorrect":true},{"id":"c","text":"It doesn’t support server-side rendering","isCorrect":false},{"id":"d","text":"It’s slower than vanilla JS","isCorrect":false}]',
          NULL,
          'React is only a view library, has a learning curve, requires extra setup for full apps, and can lead to boilerplate with many small components.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','limitations','view-library','jsx','boilerplate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-038","original_type":"multiple-choice","topic":"React Basics","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '49efe208-4a7f-402d-a8f3-5961d3c2bc5f',
          'What are the recommended ways for static type checking?',
          'Normally we use _PropTypes library_ (`React.PropTypes` moved to a `prop-types` package since React v15.5) for _type checking_ in the React applications. For large code bases, it is recommended to use _static type checkers_ such as Flow or TypeScript, that perform type checking at compile time and provide auto-completion features.',
          'multiple-choice',
          'intermediate',
          3,
          '[{"id":"a","text":"PropTypes for small apps; TypeScript/Flow for large codebases","isCorrect":true},{"id":"b","text":"Only PropTypes should be used","isCorrect":false},{"id":"c","text":"TypeScript is not compatible with React","isCorrect":false},{"id":"d","text":"Static typing is unnecessary in React","isCorrect":false}]',
          NULL,
          'For small apps, PropTypes suffice; for large codebases, use TypeScript or Flow for compile-time type safety and better tooling.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','typescript','flow','proptypes','type-checking']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-039","original_type":"multiple-choice","topic":"TypeScript","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'ef1b2539-080b-406b-b7ac-c01f2116a952',
          'What is the use of the react-dom package?',
          'The `react-dom` package provides _DOM-specific methods_ that can be used at the top level of your app. Most of the components are not required to use this module. Some of the methods of this package are:
1. `render()`
2. `hydrate()`
3. `unmountComponentAtNode()`
4. `findDOMNode()`
5. `createPortal()`',
          'multiple-choice',
          'beginner',
          2,
          '[{"id":"a","text":"It contains React’s core logic like useState and useEffect","isCorrect":false},{"id":"b","text":"It provides DOM-specific methods like render(), hydrate(), and createPortal()","isCorrect":true},{"id":"c","text":"It’s used for server-side logic only","isCorrect":false},{"id":"d","text":"It’s deprecated in React 18","isCorrect":false}]',
          NULL,
          '`react-dom` provides methods to interact with the browser DOM, such as `render`, `hydrate`, and `createPortal`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','react-dom','dom','render','hydrate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-040","original_type":"multiple-choice","topic":"React DOM","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '1d77d1f2-6365-4909-ac4b-435b89e9cda3',
          'What is ReactDOMServer?',
          'The `ReactDOMServer` object enables you to render components to static markup (typically used on node server). This object is mainly used for _server-side rendering_ (SSR). The following methods can be used in both the server and browser environments:
1. `renderToString()`
2. `renderToStaticMarkup()`

For example, you generally run a Node-based web server like Express, Hapi, or Koa, and you call `renderToString` to render your root component to a string, which you then send as response.
```javascript
// using Express
import { renderToString } from "react-dom/server";
import MyPage from "./MyPage";
app.get("/", (req, res) => {
  res.write(
    "<!DOCTYPE html><html><head><title>My Page</title></head><body>"
  );
  res.write(''<div id="content">'');
  res.write(renderToString(<MyPage />));
  res.write("</div></body></html>");
  res.end();
});
```',
          'multiple-choice',
          'intermediate',
          4,
          '[{"id":"a","text":"A tool for client-side hydration only","isCorrect":false},{"id":"b","text":"An object with methods like renderToString() for server-side rendering","isCorrect":true},{"id":"c","text":"A replacement for react-dom in the browser","isCorrect":false},{"id":"d","text":"Used for testing components","isCorrect":false}]',
          NULL,
          '`ReactDOMServer` provides methods like `renderToString` for server-side rendering, enabling SEO-friendly and fast initial loads.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','ssr','react-dom-server','render-to-string','server-side']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-041","original_type":"multiple-choice","topic":"Server-Side Rendering","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '639cc89e-bbe0-47bd-89f0-814c54a536c1',
          'How to use innerHTML in React?',
          'The `dangerouslySetInnerHTML` attribute is React''s replacement for using `innerHTML` in the browser DOM. Just like `innerHTML`, it is risky to use this attribute considering cross-site scripting (XSS) attacks. You just need to pass a `__html` object as key and HTML text as value.

In this example MyComponent uses `dangerouslySetInnerHTML` attribute for setting HTML markup:
```jsx harmony
function createMarkup() {
  return { __html: "First &middot; Second" };
}
function MyComponent() {
  return <div dangerouslySetInnerHTML={createMarkup()} />;
}
```',
          'multiple-choice',
          'intermediate',
          3,
          '[{"id":"a","text":"Use `innerHTML` directly on JSX elements","isCorrect":false},{"id":"b","text":"Use `dangerouslySetInnerHTML={{ __html: string }}` with caution","isCorrect":true},{"id":"c","text":"It’s not possible to render HTML in React","isCorrect":false},{"id":"d","text":"Use `React.renderHTML()`","isCorrect":false}]',
          NULL,
          '`dangerouslySetInnerHTML` is React’s way to set raw HTML, but it’s dangerous and should be used cautiously to avoid XSS.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','dangerouslysetinnerhtml','xss','dom','security']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-042","original_type":"multiple-choice","topic":"DOM Manipulation","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'f264c1b8-9327-40ab-80e7-72fd599f79c8',
          'How to apply styles in React?',
          'The `style` attribute accepts a JavaScript object with camelCased properties rather than a CSS string. This is consistent with the DOM style JavaScript property, is more efficient, and prevents XSS security holes.
```jsx harmony
const divStyle = {
  color: "blue",
  backgroundImage: "url(" + imgUrl + ")",
};
function HelloWorldComponent() {
  return <div style={divStyle}>Hello World!</div>;
}
```
Style keys are camelCased in order to be consistent with accessing the properties on DOM nodes in JavaScript (e.g. `node.style.backgroundImage`).',
          'multiple-choice',
          'beginner',
          2,
          '[{"id":"a","text":"Use CSS strings like `style=\"color: blue\"`","isCorrect":false},{"id":"b","text":"Use camelCased JavaScript objects: `style={{ backgroundColor: ''blue'' }}`","isCorrect":true},{"id":"c","text":"Only external CSS files are allowed","isCorrect":false},{"id":"d","text":"Styles must be defined in a separate CSS module","isCorrect":false}]',
          NULL,
          'React uses camelCased JavaScript objects for inline styles (e.g., `backgroundColor`), not CSS strings.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','styles','inline-styles','camelcase','css']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-043","original_type":"multiple-choice","topic":"CSS & Styling","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );;