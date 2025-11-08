

UPDATE questions 
SET options = '[{"id":"a","text":"Saga uses Promises;

 Thunk uses Generators","isCorrect":false},{"id":"b","text":"Thunk uses Promises;

 Saga uses Generators","isCorrect":true},{"id":"c","text":"Both are identical","isCorrect":false},{"id":"d","text":"Saga is deprecated","isCorrect":false}]'
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
SET options = '[{"id":"a","text":"Relay uses REST APIs","isCorrect":false},{"id":"b","text":"Relay manages only server state via GraphQL;

 Redux manages all state","isCorrect":true},{"id":"c","text":"Redux requires GraphQL","isCorrect":false},{"id":"d","text":"They are identical","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q134';



UPDATE questions 
SET options = '[{"id":"a","text":"A function that mutates state","isCorrect":false},{"id":"b","text":"A plain object with a `type` property","isCorrect":true},{"id":"c","text":"A class instance","isCorrect":false},{"id":"d","text":"A Promise","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q135';



UPDATE questions 
SET options = '[{"id":"a","text":"React Native uses HTML","isCorrect":false},{"id":"b","text":"React is for web;