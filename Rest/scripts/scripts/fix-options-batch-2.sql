

UPDATE questions 
SET options = '[{"id":"a","text":"Immutable data passed from parent components","isCorrect":false},{"id":"b","text":"Mutable data that triggers re-renders when changed","isCorrect":true},{"id":"c","text":"Static configuration for a component","isCorrect":false},{"id":"d","text":"A global store like Redux","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-009';



UPDATE questions 
SET options = '[{"id":"a","text":"Mutable data managed by the component itself","isCorrect":false},{"id":"b","text":"Read-only inputs passed from parent to child","isCorrect":true},{"id":"c","text":"Global variables accessible anywhere","isCorrect":false},{"id":"d","text":"Event handlers only","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-010';



UPDATE questions 
SET options = '[{"id":"a","text":"State is immutable;

 props are mutable","isCorrect":false},{"id":"b","text":"State is managed internally and mutable;

 props are passed from parent and read-only","isCorrect":true},{"id":"c","text":"Props can be changed with this.setProps()","isCorrect":false},{"id":"d","text":"State and props are the same thing","isCorrect":false}]'
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