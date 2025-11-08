

UPDATE questions 
SET options = '[{"id":"a","text":"Access `this.context.store` directly","isCorrect":false},{"id":"b","text":"Use `connect()` from `react-redux`","isCorrect":true},{"id":"c","text":"Import the store and call `store.getState()` in render","isCorrect":false},{"id":"d","text":"Use `useContext(StoreContext)` always","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q116';



UPDATE questions 
SET options = '[{"id":"a","text":"Components handle logic;

 containers render UI","isCorrect":false},{"id":"b","text":"Components are presentational;

 containers are connected to Redux","isCorrect":true},{"id":"c","text":"They are the same","isCorrect":false},{"id":"d","text":"Containers cannot have children","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q117';



UPDATE questions 
SET options = '[{"id":"a","text":"They increase bundle size unnecessarily","isCorrect":false},{"id":"b","text":"They prevent typos and enable better tooling","isCorrect":true},{"id":"c","text":"They are required by the Redux library","isCorrect":false},{"id":"d","text":"They make reducers slower","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q118';



UPDATE questions 
SET options = '[{"id":"a","text":"Only the function form is valid","isCorrect":false},{"id":"b","text":"Function with dispatch, bindActionCreators, or object shorthand","isCorrect":true},{"id":"c","text":"You must always use `bindActionCreators`","isCorrect":false},{"id":"d","text":"Object shorthand doesn’t work with `connect`","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q119';



UPDATE questions 
SET options = '[{"id":"a","text":"All files in one folder","isCorrect":false},{"id":"b","text":"`components/`, `containers/`, `actions/`, `reducers/`, `store/`","isCorrect":true},{"id":"c","text":"Only `src/` and `test/`","isCorrect":false},{"id":"d","text":"No standard structure exists","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q121';



UPDATE questions 
SET options = '[{"id":"a","text":"`call()` dispatches actions;

 `put()` makes API calls","isCorrect":false},{"id":"b","text":"`call()` invokes functions;

 `put()` dispatches actions","isCorrect":true},{"id":"c","text":"Both are used only for logging","isCorrect":false},{"id":"d","text":"`put()` is for database queries","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q124';