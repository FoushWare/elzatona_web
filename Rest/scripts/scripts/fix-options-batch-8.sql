

UPDATE questions 
SET options = '[{"id":"a","text":"You must always wrap in a `<div>`","isCorrect":false},{"id":"b","text":"You can return arrays, strings, and numbers directly","isCorrect":true},{"id":"c","text":"Only objects are allowed","isCorrect":false},{"id":"d","text":"Strings cause hydration errors","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q167';



UPDATE questions 
SET options = '[{"id":"a","text":"Call hooks inside loops and conditions","isCorrect":false},{"id":"b","text":"Call hooks only at top level and from React functions","isCorrect":true},{"id":"c","text":"Hooks can be called from any JavaScript function","isCorrect":false},{"id":"d","text":"Order of hook calls doesn’t matter","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q169';



UPDATE questions 
SET options = '[{"id":"a","text":"Flux uses immutable state;

 Redux uses mutable state","isCorrect":false},{"id":"b","text":"Flux: multiple mutable stores, dispatcher;

 Redux: single immutable store, no dispatcher","isCorrect":true},{"id":"c","text":"Redux has multiple dispatchers","isCorrect":false},{"id":"d","text":"They are identical","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q171';



UPDATE questions 
SET options = '[{"id":"a","text":"Requires manual history setup","isCorrect":false},{"id":"b","text":"Component-based, auto history, smaller bundles","isCorrect":true},{"id":"c","text":"Only works with class components","isCorrect":false},{"id":"d","text":"No support for dynamic routes","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q172';



UPDATE questions 
SET options = '[{"id":"a","text":"They catch all errors everywhere","isCorrect":false},{"id":"b","text":"Not in event handlers, async code, SSR, or self-errors","isCorrect":true},{"id":"c","text":"They work in setTimeout callbacks","isCorrect":false},{"id":"d","text":"They catch syntax errors in modules","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q174';



UPDATE questions 
SET options = '[{"id":"a","text":"Only Chrome and Firefox","isCorrect":false},{"id":"b","text":"IE9+ with polyfills","isCorrect":true},{"id":"c","text":"No IE support at all","isCorrect":false},{"id":"d","text":"Requires ES2020","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q180';



UPDATE questions 
SET options = '[{"id":"a","text":"A state management library","isCorrect":false},{"id":"b","text":"A React framework for SSR/SSG with file-based routing and code splitting","isCorrect":true},{"id":"c","text":"A testing framework","isCorrect":false},{"id":"d","text":"Only for static sites","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q185';



UPDATE questions 
SET options = '[{"id":"a","text":"Call it inside a `setTimeout` with 0 delay","isCorrect":false},{"id":"b","text":"Use throttling, debouncing, or requestAnimationFrame","isCorrect":true},{"id":"c","text":"Disable the button permanently","isCorrect":false},{"id":"d","text":"Use `preventDefault()`","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q187';