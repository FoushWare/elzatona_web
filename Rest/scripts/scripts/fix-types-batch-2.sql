

UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Keys are only for styling","isCorrect":false},{"id":"b","text":"Keys help React identify changes in lists for efficient updates and state preservation","isCorrect":true},{"id":"c","text":"Keys must be globally unique across the entire app","isCorrect":false},{"id":"d","text":"Keys are optional and have no performance impact","isCorrect":false}]' WHERE metadata->>'original_id' = 'react-q-015';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"A real browser DOM node","isCorrect":false},{"id":"b","text":"An in-memory representation of the real DOM for efficient updates","isCorrect":true},{"id":"c","text":"A CSS rendering engine","isCorrect":false},{"id":"d","text":"A database for storing component state","isCorrect":false}]' WHERE metadata->>'original_id' = 'react-q-016';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"It replaces the entire real DOM on every change","isCorrect":false},{"id":"b","text":"It creates a new Virtual DOM, diffs it with the old one, and updates only changed real DOM nodes","isCorrect":true},{"id":"c","text":"It uses direct DOM manipulation without any abstraction","isCorrect":false},{"id":"d","text":"It only works in development mode","isCorrect":false}]' WHERE metadata->>'original_id' = 'react-q-017';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"They are the same thing","isCorrect":false},{"id":"b","text":"Shadow DOM is for Web Components encapsulation;

 Virtual DOM is for React''s efficient rendering","isCorrect":true},{"id":"c","text":"Virtual DOM is part of the browser;

 Shadow DOM is a React feature","isCorrect":false},{"id":"d","text":"Both are managed by the browser","isCorrect":false}]' WHERE metadata->>'original_id' = 'react-q-018';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"A new CSS-in-JS library","isCorrect":false},{"id":"b","text":"React''s new reconciliation engine for async rendering and prioritization","isCorrect":true},{"id":"c","text":"A state management library like Redux","isCorrect":false},{"id":"d","text":"A testing utility","isCorrect":false}]' WHERE metadata->>'original_id' = 'react-q-019';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"To replace JSX with templates","isCorrect":false},{"id":"b","text":"To enable incremental, interruptible, and prioritized rendering","isCorrect":true},{"id":"c","text":"To remove the need for components","isCorrect":false},{"id":"d","text":"To make React work only on the server","isCorrect":false}]' WHERE metadata->>'original_id' = 'react-q-020';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Form elements that manage their own state via the DOM","isCorrect":false},{"id":"b","text":"Form elements whose value is controlled by React state","isCorrect":true},{"id":"c","text":"Components that don''t re-render","isCorrect":false},{"id":"d","text":"Components that can''t use hooks","isCorrect":false}]' WHERE metadata->>'original_id' = 'react-q-021';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Components that use React state for everything","isCorrect":false},{"id":"b","text":"Form elements that manage their own state in the DOM and use refs to access values","isCorrect":true},{"id":"c","text":"Components that are not rendered","isCorrect":false},{"id":"d","text":"Components that can''t have children","isCorrect":false}]' WHERE metadata->>'original_id' = 'react-q-022';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Both create new elements from scratch","isCorrect":false},{"id":"b","text":"createElement creates new elements;

 cloneElement clones existing elements and overrides props","isCorrect":true},{"id":"c","text":"cloneElement is for class components only","isCorrect":false},{"id":"d","text":"createElement is deprecated","isCorrect":false}]' WHERE metadata->>'original_id' = 'react-q-023';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Moving state to a child component","isCorrect":false},{"id":"b","text":"Moving shared state to the closest common ancestor","isCorrect":true},{"id":"c","text":"Storing state in localStorage","isCorrect":false},{"id":"d","text":"Using global variables for state","isCorrect":false}]' WHERE metadata->>'original_id' = 'react-q-024';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Components that are higher in the DOM tree","isCorrect":false},{"id":"b","text":"Functions that take a component and return a new enhanced component","isCorrect":true},{"id":"c","text":"Components with more than 100 lines of code","isCorrect":false},{"id":"d","text":"Components that must be class-based","isCorrect":false}]' WHERE metadata->>'original_id' = 'react-q-025';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'q101';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'q102';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'q103';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Single store, mutable state, async reducers","isCorrect":false},{"id":"b","text":"Multiple stores, read-only state, impure reducers","isCorrect":false},{"id":"c","text":"Single source of truth, read-only state, pure reducer functions","isCorrect":true},{"id":"d","text":"Global state, two-way binding, side-effectful reducers","isCorrect":false}]' WHERE metadata->>'original_id' = 'q104';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Redux allows mutable state by default","isCorrect":false},{"id":"b","text":"Redux requires immutability, careful package selection, and has less mature static type support","isCorrect":true},{"id":"c","text":"Flux is more minimal than Redux","isCorrect":false},{"id":"d","text":"Redux uses two-way data binding","isCorrect":false}]' WHERE metadata->>'original_id' = 'q105';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"`mapStateToProps` dispatches actions;