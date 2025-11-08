 [deps]: on change;

 none: every render","isCorrect":true},{"id":"c","text":"Deps are deep-comparison","isCorrect":false},{"id":"d","text":"Effect runs before render","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q287';



UPDATE questions 
SET options = '[{"id":"a","text":"Data fetching and logging","isCorrect":false},{"id":"b","text":"Layout measurements, preventing flicker, synchronous DOM updates","isCorrect":true},{"id":"c","text":"Replacing all useEffect calls","isCorrect":false},{"id":"d","text":"Only for server-side rendering","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q292';



UPDATE questions 
SET options = '[{"id":"a","text":"Managing application state","isCorrect":false},{"id":"b","text":"Focus, scroll, measurements, media, and third-party libraries","isCorrect":true},{"id":"c","text":"Replacing useState","isCorrect":false},{"id":"d","text":"Only for class components","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q300';



UPDATE questions 
SET options = '[{"id":"a","text":"For all state management","isCorrect":false},{"id":"b","text":"For modals, inputs, scroll containers in reusable libraries","isCorrect":true},{"id":"c","text":"To replace useEffect","isCorrect":false},{"id":"d","text":"Only in class components","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q302';



UPDATE questions 
SET options = '[{"id":"a","text":"useMemo is for functions;

 useCallback for values","isCorrect":false},{"id":"b","text":"useMemo memoizes values;

 useCallback memoizes functions","isCorrect":true},{"id":"c","text":"They are identical","isCorrect":false},{"id":"d","text":"useCallback prevents re-renders of parent","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q304';



UPDATE questions 
SET options = '[{"id":"a","text":"It passes data from parent to child as a string","isCorrect":false},{"id":"b","text":"It allows components to receive and render nested content between their tags","isCorrect":true},{"id":"c","text":"It is only used for passing numbers","isCorrect":false},{"id":"d","text":"It is an alias for `props.data`","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-026';



UPDATE questions 
SET options = '[{"id":"a","text":"Use `//` inside JSX tags","isCorrect":false},{"id":"b","text":"Use `{/* comment */}` for JSX comments","isCorrect":true},{"id":"c","text":"Comments are not allowed in React","isCorrect":false},{"id":"d","text":"Use HTML-style `<!-- -->` comments","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-027';