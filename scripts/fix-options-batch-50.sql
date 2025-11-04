

UPDATE questions 
SET options = '[{"id":"a","text":"It bundles the module into the main chunk","isCorrect":false,"explanation":""},{"id":"b","text":"It adds a `<link rel=''preload''>` tag for that chunk","isCorrect":true,"explanation":""},{"id":"c","text":"It delays loading of the module until user interaction","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'performance-patterns-pre-load-3';



UPDATE questions 
SET options = '[{"id":"a","text":"It can delay critical rendering paths like CSS and hero images","isCorrect":true,"explanation":""},{"id":"b","text":"It causes the browser to ignore other preload hints","isCorrect":false,"explanation":""},{"id":"c","text":"It disables the browser cache for those resources","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'performance-patterns-pre-load-4';



UPDATE questions 
SET options = '[{"id":"a","text":"To load a script early without blocking the HTML parser","isCorrect":true,"explanation":""},{"id":"b","text":"To execute the script synchronously","isCorrect":false,"explanation":""},{"id":"c","text":"To delay the script until the user interacts","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'performance-patterns-pre-load-6';



UPDATE questions 
SET options = '[{"id":"a","text":"Use preload sparingly and measure its impact in production","isCorrect":true,"explanation":""},{"id":"b","text":"Preload all JavaScript files to reduce bundle size","isCorrect":false,"explanation":""},{"id":"c","text":"Always preload images before any CSS files","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'performance-patterns-pre-load-8';



UPDATE questions 
SET options = '[{"id":"a","text":"To load resources that may be needed in the future","isCorrect":true,"explanation":""},{"id":"b","text":"To defer resource loading until the user interacts","isCorrect":false,"explanation":""},{"id":"c","text":"To immediately execute a script when the page loads","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'performance-patterns-prefetch-1';



UPDATE questions 
SET options = '[{"id":"a","text":"To bundle the file immediately into the main chunk","isCorrect":false,"explanation":""},{"id":"b","text":"To hint the browser to prefetch the resource during idle time","isCorrect":true,"explanation":""},{"id":"c","text":"To force lazy loading of the component","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'performance-patterns-prefetch-3';



UPDATE questions 
SET options = '[{"id":"a","text":"It is fetched from cache instantly","isCorrect":true,"explanation":""},{"id":"b","text":"It triggers a network request","isCorrect":false,"explanation":""},{"id":"c","text":"It delays rendering until all resources are loaded","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'performance-patterns-prefetch-4';



UPDATE questions 
SET options = '[{"id":"a","text":"For pages or components the user is likely to visit soon","isCorrect":true,"explanation":""},{"id":"b","text":"For every resource in the application","isCorrect":false,"explanation":""},{"id":"c","text":"Only for images in the viewport","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'performance-patterns-prefetch-6';



UPDATE questions 
SET options = '[{"id":"o1","text":"Push, Render, Pre-cache, Lazy-load","isCorrect":true,"explanation":""},{"id":"o2","text":"Preload, Render, Pre-fetch, Load","isCorrect":false,"explanation":""},{"id":"o3","text":"Push, Render, Preload, Link","isCorrect":false,"explanation":""},{"id":"o4","text":"Prepare, Run, Pre-cache, Load","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'performance-patterns-prpl-pp2';



UPDATE questions 
SET options = '[{"id":"o1","text":"HTTP/2 Server Push","isCorrect":true,"explanation":""},{"id":"o2","text":"Service Workers","isCorrect":true,"explanation":""},{"id":"o3","text":"App Shell Architecture","isCorrect":true,"explanation":""},{"id":"o4","text":"jQuery AJAX for resource loading","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'performance-patterns-prpl-pp4';