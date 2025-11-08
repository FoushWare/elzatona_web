

UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'rendering-patterns-rendering2-9';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Hybrid Rendering — mixing SSG, SSR, and ISR depending on route needs","isCorrect":true},{"id":"b","text":"Full Client-Side Rendering only","isCorrect":false},{"id":"c","text":"Single Static HTML rendering","isCorrect":false}]' WHERE metadata->>'original_id' = 'rendering-patterns-rendering2-10';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'rendering-patterns-rendering4-1';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Search engines struggle to index JavaScript-rendered pages","isCorrect":true},{"id":"b","text":"CSR prevents the use of meta tags","isCorrect":false},{"id":"c","text":"CSR makes sites slower for all users","isCorrect":false}]' WHERE metadata->>'original_id' = 'rendering-patterns-rendering4-2';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'rendering-patterns-rendering4-3';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"CSR renders pages on the client, SSR renders them on the server before sending HTML","isCorrect":true},{"id":"b","text":"SSR requires no JavaScript on the client","isCorrect":false},{"id":"c","text":"CSR is faster than SSR in all cases","isCorrect":false}]' WHERE metadata->>'original_id' = 'rendering-patterns-rendering4-4';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'rendering-patterns-rendering4-5';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"A social media share widget inside a static blog post","isCorrect":true},{"id":"b","text":"Static article text with no JavaScript","isCorrect":false},{"id":"c","text":"Server-rendered navigation bar","isCorrect":false}]' WHERE metadata->>'original_id' = 'rendering-patterns-rendering4-6';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'rendering-patterns-rendering4-7';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Astro and Marko","isCorrect":true},{"id":"b","text":"Next.js only","isCorrect":false},{"id":"c","text":"Create React App","isCorrect":false}]' WHERE metadata->>'original_id' = 'rendering-patterns-rendering4-8';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'rendering-patterns-rendering4-9';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"It’s difficult to scale for highly interactive apps like social media feeds","isCorrect":true},{"id":"b","text":"It cannot be used with React","isCorrect":false},{"id":"c","text":"It requires a full backend rewrite","isCorrect":false}]' WHERE metadata->>'original_id' = 'rendering-patterns-rendering4-10';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'rendering-patterns-rendering5-1';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"It regenerates pages on-demand when a user visits an outdated page","isCorrect":true},{"id":"b","text":"It rebuilds the entire website daily","isCorrect":false},{"id":"c","text":"It updates pages manually via admin dashboard","isCorrect":false}]' WHERE metadata->>'original_id' = 'rendering-patterns-rendering5-2';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'rendering-patterns-rendering5-3';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"ISR caches pre-rendered pages at the edge and avoids regenerating on every request","isCorrect":true},{"id":"b","text":"ISR avoids hydration completely","isCorrect":false},{"id":"c","text":"ISR runs entirely on the client","isCorrect":false}]' WHERE metadata->>'original_id' = 'rendering-patterns-rendering5-4';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'rendering-patterns-rendering5-5';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"When content changes are event-driven, such as CMS updates","isCorrect":true},{"id":"b","text":"When your website never changes","isCorrect":false},{"id":"c","text":"When you have no API data","isCorrect":false}]' WHERE metadata->>'original_id' = 'rendering-patterns-rendering5-6';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'rendering-patterns-rendering5-7';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"They allow parts of React components to render on the server without sending unnecessary JavaScript to the client","isCorrect":true},{"id":"b","text":"They replace all client-side interactivity","isCorrect":false},{"id":"c","text":"They only work in static generation","isCorrect":false}]' WHERE metadata->>'original_id' = 'rendering-patterns-rendering5-8';