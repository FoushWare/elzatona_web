

UPDATE questions 
SET options = '[{"id":"a","text":"CSR loads all JavaScript at once, while Islands only hydrate interactive components","isCorrect":true},{"id":"b","text":"Islands Architecture doesn’t support user interactions","isCorrect":false},{"id":"c","text":"CSR is faster than Islands because it’s fully client-driven","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-islandarcheticure-2';



UPDATE questions 
SET options = '[{"id":"a","text":"Next.js","isCorrect":false},{"id":"b","text":"Astro","isCorrect":true},{"id":"c","text":"Nuxt.js","isCorrect":false},{"id":"d","text":"Remix","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-islandarcheticure-4';



UPDATE questions 
SET options = '[{"id":"a","text":"During the initial HTML parsing","isCorrect":false},{"id":"b","text":"After the static HTML has been rendered and the browser is idle","isCorrect":true},{"id":"c","text":"Only after a user clicks a button","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-islandarcheticure-5';



UPDATE questions 
SET options = '[{"id":"a","text":"Highly interactive dashboards","isCorrect":false},{"id":"b","text":"Content-heavy websites like blogs or marketing pages","isCorrect":true},{"id":"c","text":"Real-time gaming apps","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-islandarcheticure-7';



UPDATE questions 
SET options = '[{"id":"a","text":"It serves fully rendered HTML to crawlers before hydration","isCorrect":true},{"id":"b","text":"It delays rendering until user interaction","isCorrect":false},{"id":"c","text":"It hides interactive components from crawlers","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-islandarcheticure-9';



UPDATE questions 
SET options = '[{"id":"a","text":"Reduced latency due to geographical proximity to users","isCorrect":true},{"id":"b","text":"It replaces all client-side rendering logic","isCorrect":false},{"id":"c","text":"It always increases server costs","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-render6-2';



UPDATE questions 
SET options = '[{"id":"a","text":"It hydrates parts of the UI gradually as JavaScript loads or user interacts","isCorrect":true},{"id":"b","text":"It waits until all components are fully loaded before rendering anything","isCorrect":false},{"id":"c","text":"It disables interactivity completely","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-render6-4';



UPDATE questions 
SET options = '[{"id":"a","text":"Resumability skips full rehydration by resuming the app state directly from serialized data","isCorrect":true},{"id":"b","text":"Resumability re-renders everything on the server","isCorrect":false},{"id":"c","text":"They are the same process with different names","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-render6-7';



UPDATE questions 
SET options = '[{"id":"a","text":"Users see parts of the UI sooner while server components load progressively","isCorrect":true},{"id":"b","text":"It delays rendering until all components are ready","isCorrect":false},{"id":"c","text":"It removes the need for client components entirely","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-render6-9';



UPDATE questions 
SET options = '[{"id":"a","text":"Partial Hydration only hydrates selected components, Progressive Hydration hydrates sequentially over time","isCorrect":true},{"id":"b","text":"They are identical processes","isCorrect":false},{"id":"c","text":"Partial Hydration works only on client-side rendering","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-render7-2';