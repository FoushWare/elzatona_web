

UPDATE questions 
SET options = '[{"id":"a","text":"It replaces the entire real DOM on every change","isCorrect":false},{"id":"b","text":"It creates a new Virtual DOM, diffs it with the old one, and updates only changed real DOM nodes","isCorrect":true},{"id":"c","text":"It uses direct DOM manipulation without any abstraction","isCorrect":false},{"id":"d","text":"It only works in development mode","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-017';



UPDATE questions 
SET options = '[{"id":"a","text":"They are the same thing","isCorrect":false},{"id":"b","text":"Shadow DOM is for Web Components encapsulation;

 Virtual DOM is for React''s efficient rendering","isCorrect":true},{"id":"c","text":"Virtual DOM is part of the browser;

 Shadow DOM is a React feature","isCorrect":false},{"id":"d","text":"Both are managed by the browser","isCorrect":false}]'
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
SET options = '[{"id":"a","text":"Both create new elements from scratch","isCorrect":false},{"id":"b","text":"createElement creates new elements;

 cloneElement clones existing elements and overrides props","isCorrect":true},{"id":"c","text":"cloneElement is for class components only","isCorrect":false},{"id":"d","text":"createElement is deprecated","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-023';