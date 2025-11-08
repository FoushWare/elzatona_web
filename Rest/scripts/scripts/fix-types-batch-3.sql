 `mapDispatchToProps` reads state","isCorrect":false},{"id":"b","text":"`mapStateToProps` reads state;

 `mapDispatchToProps` dispatches actions","isCorrect":true},{"id":"c","text":"Both are used only for async logic","isCorrect":false},{"id":"d","text":"They are identical in functionality","isCorrect":false}]' WHERE metadata->>'original_id' = 'q106';



UPDATE questions SET type = 'true-false' WHERE metadata->>'original_id' = 'q107';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'q108';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Easy undo, cheap DOM updates, no circular dependencies","isCorrect":false},{"id":"b","text":"Expensive DOM manipulation, circular dependencies, no easy undo","isCorrect":true},{"id":"c","text":"Built-in time-travel debugging","isCorrect":false},{"id":"d","text":"Unidirectional data flow by default","isCorrect":false}]' WHERE metadata->>'original_id' = 'q109';



UPDATE questions SET type = 'true-false' WHERE metadata->>'original_id' = 'q110';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'q111';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Context provides middleware and time-travel debugging","isCorrect":false},{"id":"b","text":"Redux is simpler and built into React","isCorrect":false},{"id":"c","text":"Context is for simple prop drilling;

 Redux is a full state management library with advanced tooling","isCorrect":true},{"id":"d","text":"They are functionally identical","isCorrect":false}]' WHERE metadata->>'original_id' = 'q112';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'q113';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'q114';



UPDATE questions SET type = 'true-false' WHERE metadata->>'original_id' = 'q115';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Access `this.context.store` directly","isCorrect":false},{"id":"b","text":"Use `connect()` from `react-redux`","isCorrect":true},{"id":"c","text":"Import the store and call `store.getState()` in render","isCorrect":false},{"id":"d","text":"Use `useContext(StoreContext)` always","isCorrect":false}]' WHERE metadata->>'original_id' = 'q116';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Components handle logic;

 containers render UI","isCorrect":false},{"id":"b","text":"Components are presentational;

 containers are connected to Redux","isCorrect":true},{"id":"c","text":"They are the same","isCorrect":false},{"id":"d","text":"Containers cannot have children","isCorrect":false}]' WHERE metadata->>'original_id' = 'q117';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"They increase bundle size unnecessarily","isCorrect":false},{"id":"b","text":"They prevent typos and enable better tooling","isCorrect":true},{"id":"c","text":"They are required by the Redux library","isCorrect":false},{"id":"d","text":"They make reducers slower","isCorrect":false}]' WHERE metadata->>'original_id' = 'q118';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Only the function form is valid","isCorrect":false},{"id":"b","text":"Function with dispatch, bindActionCreators, or object shorthand","isCorrect":true},{"id":"c","text":"You must always use `bindActionCreators`","isCorrect":false},{"id":"d","text":"Object shorthand doesn’t work with `connect`","isCorrect":false}]' WHERE metadata->>'original_id' = 'q119';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'q120';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"All files in one folder","isCorrect":false},{"id":"b","text":"`components/`, `containers/`, `actions/`, `reducers/`, `store/`","isCorrect":true},{"id":"c","text":"Only `src/` and `test/`","isCorrect":false},{"id":"d","text":"No standard structure exists","isCorrect":false}]' WHERE metadata->>'original_id' = 'q121';