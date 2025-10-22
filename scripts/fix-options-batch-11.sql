 useRef does not","isCorrect":true},{"id":"c","text":"useRef is only for DOM elements","isCorrect":false},{"id":"d","text":"useState cannot hold objects","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q241';



UPDATE questions 
SET options = '[{"id":"a","text":"useEffect runs before paint;

 useLayoutEffect after","isCorrect":false},{"id":"b","text":"useEffect runs after paint;

 useLayoutEffect runs before paint synchronously","isCorrect":true},{"id":"c","text":"They are identical","isCorrect":false},{"id":"d","text":"useLayoutEffect is deprecated","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q243';



UPDATE questions 
SET options = '[{"id":"a","text":"Functional components can''t use state","isCorrect":false},{"id":"b","text":"Functional use Hooks;

 Class use lifecycle methods and this","isCorrect":true},{"id":"c","text":"Class components are faster","isCorrect":false},{"id":"d","text":"Functional components can''t receive props","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q244';



UPDATE questions 
SET options = '[{"id":"a","text":"Improves production performance","isCorrect":false},{"id":"b","text":"Detects side effects, unsafe lifecycles, legacy APIs, and missing cleanup","isCorrect":true},{"id":"c","text":"Reduces bundle size","isCorrect":false},{"id":"d","text":"Only for class components","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q246';



UPDATE questions 
SET options = '[{"id":"a","text":"Tags don''t need to be closed","isCorrect":false},{"id":"b","text":"Single root, closed tags, camelCase attributes","isCorrect":true},{"id":"c","text":"Use class instead of className","isCorrect":false},{"id":"d","text":"Multiple roots are allowed","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q248';



UPDATE questions 
SET options = '[{"id":"a","text":"Allows faster direct DOM manipulation","isCorrect":false},{"id":"b","text":"Enables predictable re-renders, debugging, and performance optimizations","isCorrect":true},{"id":"c","text":"Reduces bundle size","isCorrect":false},{"id":"d","text":"Makes code more verbose","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q260';



UPDATE questions 
SET options = '[{"id":"a","text":"Use `push` and `splice` for performance","isCorrect":false},{"id":"b","text":"Preferred: concat/spread/filter/map;