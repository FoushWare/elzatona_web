

UPDATE questions 
SET options = '[{"id":"a","text":"Astro and Marko","isCorrect":true},{"id":"b","text":"Next.js only","isCorrect":false},{"id":"c","text":"Create React App","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering4-8';



UPDATE questions 
SET options = '[{"id":"a","text":"It’s difficult to scale for highly interactive apps like social media feeds","isCorrect":true},{"id":"b","text":"It cannot be used with React","isCorrect":false},{"id":"c","text":"It requires a full backend rewrite","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering4-10';



UPDATE questions 
SET options = '[{"id":"a","text":"It regenerates pages on-demand when a user visits an outdated page","isCorrect":true},{"id":"b","text":"It rebuilds the entire website daily","isCorrect":false},{"id":"c","text":"It updates pages manually via admin dashboard","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering5-2';



UPDATE questions 
SET options = '[{"id":"a","text":"ISR caches pre-rendered pages at the edge and avoids regenerating on every request","isCorrect":true},{"id":"b","text":"ISR avoids hydration completely","isCorrect":false},{"id":"c","text":"ISR runs entirely on the client","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering5-4';



UPDATE questions 
SET options = '[{"id":"a","text":"When content changes are event-driven, such as CMS updates","isCorrect":true},{"id":"b","text":"When your website never changes","isCorrect":false},{"id":"c","text":"When you have no API data","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering5-6';



UPDATE questions 
SET options = '[{"id":"a","text":"They allow parts of React components to render on the server without sending unnecessary JavaScript to the client","isCorrect":true},{"id":"b","text":"They replace all client-side interactivity","isCorrect":false},{"id":"c","text":"They only work in static generation","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering5-8';



UPDATE questions 
SET options = '[{"id":"a","text":"When your page depends on highly personalized data that changes per user request","isCorrect":true},{"id":"b","text":"When the content is static and rarely changes","isCorrect":false},{"id":"c","text":"When build times are slow","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering5-10';



UPDATE questions 
SET options = '[{"id":"a","text":"Cache-Control: must-revalidate","isCorrect":true},{"id":"b","text":"Cache-Control: immutable","isCorrect":false},{"id":"c","text":"ETag: strong","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering8-2';



UPDATE questions 
SET options = '[{"id":"a","text":"It stores static assets closer to the user geographically to reduce latency","isCorrect":true},{"id":"b","text":"It only caches dynamic content for faster hydration","isCorrect":false},{"id":"c","text":"It disables browser caching entirely","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering8-4';



UPDATE questions 
SET options = '[{"id":"a","text":"It ensures browsers fetch updated assets when changes occur","isCorrect":true},{"id":"b","text":"It prevents caching altogether","isCorrect":false},{"id":"c","text":"It slows down content delivery","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering8-6';