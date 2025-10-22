

UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"To load a script early without blocking the HTML parser","isCorrect":true,"explanation":""},{"id":"b","text":"To execute the script synchronously","isCorrect":false,"explanation":""},{"id":"c","text":"To delay the script until the user interacts","isCorrect":false,"explanation":""}]' WHERE metadata->>'original_id' = 'performance-patterns-pre-load-6';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'performance-patterns-pre-load-7';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Use preload sparingly and measure its impact in production","isCorrect":true,"explanation":""},{"id":"b","text":"Preload all JavaScript files to reduce bundle size","isCorrect":false,"explanation":""},{"id":"c","text":"Always preload images before any CSS files","isCorrect":false,"explanation":""}]' WHERE metadata->>'original_id' = 'performance-patterns-pre-load-8';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"To load resources that may be needed in the future","isCorrect":true,"explanation":""},{"id":"b","text":"To defer resource loading until the user interacts","isCorrect":false,"explanation":""},{"id":"c","text":"To immediately execute a script when the page loads","isCorrect":false,"explanation":""}]' WHERE metadata->>'original_id' = 'performance-patterns-prefetch-1';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'performance-patterns-prefetch-2';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"To bundle the file immediately into the main chunk","isCorrect":false,"explanation":""},{"id":"b","text":"To hint the browser to prefetch the resource during idle time","isCorrect":true,"explanation":""},{"id":"c","text":"To force lazy loading of the component","isCorrect":false,"explanation":""}]' WHERE metadata->>'original_id' = 'performance-patterns-prefetch-3';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"It is fetched from cache instantly","isCorrect":true,"explanation":""},{"id":"b","text":"It triggers a network request","isCorrect":false,"explanation":""},{"id":"c","text":"It delays rendering until all resources are loaded","isCorrect":false,"explanation":""}]' WHERE metadata->>'original_id' = 'performance-patterns-prefetch-4';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'performance-patterns-prefetch-5';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"For pages or components the user is likely to visit soon","isCorrect":true,"explanation":""},{"id":"b","text":"For every resource in the application","isCorrect":false,"explanation":""},{"id":"c","text":"Only for images in the viewport","isCorrect":false,"explanation":""}]' WHERE metadata->>'original_id' = 'performance-patterns-prefetch-6';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'performance-patterns-prpl-pp1';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"o1","text":"Push, Render, Pre-cache, Lazy-load","isCorrect":true,"explanation":""},{"id":"o2","text":"Preload, Render, Pre-fetch, Load","isCorrect":false,"explanation":""},{"id":"o3","text":"Push, Render, Preload, Link","isCorrect":false,"explanation":""},{"id":"o4","text":"Prepare, Run, Pre-cache, Load","isCorrect":false,"explanation":""}]' WHERE metadata->>'original_id' = 'performance-patterns-prpl-pp2';



UPDATE questions SET type = 'true-false' WHERE metadata->>'original_id' = 'performance-patterns-prpl-pp3';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"o1","text":"HTTP/2 Server Push","isCorrect":true,"explanation":""},{"id":"o2","text":"Service Workers","isCorrect":true,"explanation":""},{"id":"o3","text":"App Shell Architecture","isCorrect":true,"explanation":""},{"id":"o4","text":"jQuery AJAX for resource loading","isCorrect":false,"explanation":""}]' WHERE metadata->>'original_id' = 'performance-patterns-prpl-pp4';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'performance-patterns-prpl-pp5';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"o1","text":"Push","isCorrect":false,"explanation":""},{"id":"o2","text":"Render","isCorrect":false,"explanation":""},{"id":"o3","text":"Pre-cache","isCorrect":true,"explanation":""},{"id":"o4","text":"Lazy-load","isCorrect":false,"explanation":""}]' WHERE metadata->>'original_id' = 'performance-patterns-prpl-pp6';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"o1","text":"Improved caching performance","isCorrect":false,"explanation":""},{"id":"o2","text":"Wasted bandwidth and filled browser cache","isCorrect":true,"explanation":""},{"id":"o3","text":"Better offline support","isCorrect":false,"explanation":""},{"id":"o4","text":"Reduced initial load time","isCorrect":false,"explanation":""}]' WHERE metadata->>'original_id' = 'performance-patterns-prpl-pp7';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'performance-patterns-prpl-pp8';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"o1","text":"Provides a minimal structure that loads instantly and handles routing","isCorrect":true,"explanation":""},{"id":"o2","text":"Delays rendering until all assets are fetched","isCorrect":false,"explanation":""},{"id":"o3","text":"Caches server responses in memory only","isCorrect":false,"explanation":""},{"id":"o4","text":"Forces the app to reload on each navigation","isCorrect":false,"explanation":""}]' WHERE metadata->>'original_id' = 'performance-patterns-prpl-pp9';



UPDATE questions SET type = 'true-false' WHERE metadata->>'original_id' = 'performance-patterns-prpl-pp10';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'performance-patterns-prpl-pp11';