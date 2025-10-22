 Virtual DOM enables fast, minimal updates","isCorrect":true},{"id":"c","text":"Virtual DOM directly manipulates HTML","isCorrect":false},{"id":"d","text":"They are the same","isCorrect":false}]'
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
SET options = '[{"id":"a","text":"Redux uses observables;

 MobX uses reducers","isCorrect":false},{"id":"b","text":"Redux: single immutable store, explicit;

 MobX: multiple mutable stores, automatic","isCorrect":true},{"id":"c","text":"They are identical","isCorrect":false},{"id":"d","text":"MobX requires more boilerplate","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q228';



UPDATE questions 
SET options = '[{"id":"a","text":"Slower development","isCorrect":false},{"id":"b","text":"Type safety, IDE support, fewer bugs, better refactoring","isCorrect":true},{"id":"c","text":"Only for backend","isCorrect":false},{"id":"d","text":"Increases bundle size significantly","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q235';



UPDATE questions 
SET options = '[{"id":"a","text":"Requires explicit React import","isCorrect":false},{"id":"b","text":"No React import needed, smaller bundles, simpler learning","isCorrect":true},{"id":"c","text":"Only works with class components","isCorrect":false},{"id":"d","text":"Increases bundle size","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q237';



UPDATE questions 
SET options = '[{"id":"a","text":"Both cause re-renders","isCorrect":false},{"id":"b","text":"useState causes re-renders;