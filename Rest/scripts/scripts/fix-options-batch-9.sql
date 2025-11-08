

UPDATE questions 
SET options = '[{"id":"a","text":"Always safe to use index","isCorrect":false},{"id":"b","text":"Only if list is static, no IDs, and never reordered","isCorrect":true},{"id":"c","text":"Index is preferred over IDs","isCorrect":false},{"id":"d","text":"Keys are optional in static lists","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q191';



UPDATE questions 
SET options = '[{"id":"a","text":"Redux Form is the only option","isCorrect":false},{"id":"b","text":"Formik is a popular lightweight form library","isCorrect":true},{"id":"c","text":"HTML forms are sufficient","isCorrect":false},{"id":"d","text":"Forms don’t need libraries","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q193';



UPDATE questions 
SET options = '[{"id":"a","text":"Redux Form is faster","isCorrect":false},{"id":"b","text":"Formik: local state, better perf, smaller size","isCorrect":true},{"id":"c","text":"Redux Form has fewer features","isCorrect":false},{"id":"d","text":"Formik requires Redux","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q194';



UPDATE questions 
SET options = '[{"id":"a","text":"React compares every possible node pair in O(n³) time","isCorrect":false},{"id":"b","text":"Different types rebuild tree;

 same DOM updates attrs;

 same component updates props;

 keys optimize children diffing","isCorrect":true},{"id":"c","text":"Keys are optional and have no performance impact","isCorrect":false},{"id":"d","text":"Component instances are recreated on every render","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q203';



UPDATE questions 
SET options = '[{"id":"a","text":"For all state management","isCorrect":false},{"id":"b","text":"For focus, animations, and third-party DOM integrations","isCorrect":true},{"id":"c","text":"To replace useState","isCorrect":false},{"id":"d","text":"Only in class components","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q204';



UPDATE questions 
SET options = '[{"id":"a","text":"To improve component reusability","isCorrect":false},{"id":"b","text":"To render modals/tooltips outside parent DOM to avoid CSS clipping and z-index issues","isCorrect":true},{"id":"c","text":"To replace Redux","isCorrect":false},{"id":"d","text":"Only for server-side rendering","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q209';



UPDATE questions 
SET options = '[{"id":"a","text":"Real DOM is faster than Virtual DOM","isCorrect":false},{"id":"b","text":"Real DOM updates are slow/expensive;