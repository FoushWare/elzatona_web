

UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Allows faster direct DOM manipulation","isCorrect":false},{"id":"b","text":"Enables predictable re-renders, debugging, and performance optimizations","isCorrect":true},{"id":"c","text":"Reduces bundle size","isCorrect":false},{"id":"d","text":"Makes code more verbose","isCorrect":false}]' WHERE metadata->>'original_id' = 'q260';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Use `push` and `splice` for performance","isCorrect":false},{"id":"b","text":"Preferred: concat/spread/filter/map;

 Non-preferred: push/pop/splice/sort","isCorrect":true},{"id":"c","text":"All array methods are safe","isCorrect":false},{"id":"d","text":"Only `slice` is safe","isCorrect":false}]' WHERE metadata->>'original_id' = 'q261';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'q262';



UPDATE questions SET type = 'true-false' WHERE metadata->>'original_id' = 'q263';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Reducers can make API calls","isCorrect":false},{"id":"b","text":"Reducers must be pure;

 actions should represent single user intents","isCorrect":true},{"id":"c","text":"Each state field needs its own action","isCorrect":false},{"id":"d","text":"Reducers should mutate state for performance","isCorrect":false}]' WHERE metadata->>'original_id' = 'q264';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'q265';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"useReducer is only for Redux","isCorrect":false},{"id":"b","text":"useState: simple state;

 useReducer: complex state with centralized logic","isCorrect":true},{"id":"c","text":"useState cannot hold objects","isCorrect":false},{"id":"d","text":"useReducer causes more re-renders","isCorrect":false}]' WHERE metadata->>'original_id' = 'q266';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'q267';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Only for passing props to immediate children","isCorrect":false},{"id":"b","text":"Theme, auth, i18n, modals, and global state with useReducer","isCorrect":true},{"id":"c","text":"Replacing all useState calls","isCorrect":false},{"id":"d","text":"Only for class components","isCorrect":false}]' WHERE metadata->>'original_id' = 'q268';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Use client components for all data fetching","isCorrect":false},{"id":"b","text":"Client: interactivity/state;

 Server: data fetching/sensitive logic","isCorrect":true},{"id":"c","text":"Server components can use useState","isCorrect":false},{"id":"d","text":"Client components are always faster","isCorrect":false}]' WHERE metadata->>'original_id' = 'q269';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'q270';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'q271';



UPDATE questions SET type = 'true-false' WHERE metadata->>'original_id' = 'q272';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'q273';



UPDATE questions SET type = 'true-false' WHERE metadata->>'original_id' = 'q274';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Only strings and numbers","isCorrect":false},{"id":"b","text":"Any type, but objects/arrays must be immutable","isCorrect":true},{"id":"c","text":"Functions are not allowed","isCorrect":false},{"id":"d","text":"Only primitives","isCorrect":false}]' WHERE metadata->>'original_id' = 'q275';