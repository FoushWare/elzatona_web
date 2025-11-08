

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
SET options = '[{"id":"a","text":"`mapStateToProps` dispatches actions;

 `mapDispatchToProps` reads state","isCorrect":false},{"id":"b","text":"`mapStateToProps` reads state;

 `mapDispatchToProps` dispatches actions","isCorrect":true},{"id":"c","text":"Both are used only for async logic","isCorrect":false},{"id":"d","text":"They are identical in functionality","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q106';



UPDATE questions 
SET options = '[{"id":"a","text":"Easy undo, cheap DOM updates, no circular dependencies","isCorrect":false},{"id":"b","text":"Expensive DOM manipulation, circular dependencies, no easy undo","isCorrect":true},{"id":"c","text":"Built-in time-travel debugging","isCorrect":false},{"id":"d","text":"Unidirectional data flow by default","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q109';



UPDATE questions 
SET options = '[{"id":"a","text":"Context provides middleware and time-travel debugging","isCorrect":false},{"id":"b","text":"Redux is simpler and built into React","isCorrect":false},{"id":"c","text":"Context is for simple prop drilling;

 Redux is a full state management library with advanced tooling","isCorrect":true},{"id":"d","text":"They are functionally identical","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q112';