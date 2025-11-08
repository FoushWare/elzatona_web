

UPDATE questions 
SET options = '["It disables animations completely","It enables experimental view transitions with fallback","It triggers full page reloads","It forces server-side rendering"]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering10-17';



UPDATE questions 
SET options = '["View transitions are faster in all cases","Exit animations support cross-page element morphing","View transitions handle shared elements but may delay feedback","Exit animations require the new HTML before starting"]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering10-18';



UPDATE questions 
SET options = '[{"id":"a","text":"Faster Time to First Byte (TTFB)","isCorrect":false},{"id":"b","text":"Higher server load and slower TTFB compared to static rendering","isCorrect":true},{"id":"c","text":"Improved client-side bundle size","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering2-2';



UPDATE questions 
SET options = '[{"id":"a","text":"A marketing blog updated monthly","isCorrect":false},{"id":"b","text":"A dashboard showing real-time user data","isCorrect":true},{"id":"c","text":"A static documentation website","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering2-3';



UPDATE questions 
SET options = '[{"id":"a","text":"React Suspense for data fetching","isCorrect":true},{"id":"b","text":"React Context API","isCorrect":false},{"id":"c","text":"React.memo","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering2-6';



UPDATE questions 
SET options = '[{"id":"a","text":"Edge Rendering happens on globally distributed edge nodes rather than a central server","isCorrect":true},{"id":"b","text":"Edge Rendering always requires a CDN","isCorrect":false},{"id":"c","text":"Edge Rendering only works for static pages","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering2-8';



UPDATE questions 
SET options = '[{"id":"a","text":"Hybrid Rendering — mixing SSG, SSR, and ISR depending on route needs","isCorrect":true},{"id":"b","text":"Full Client-Side Rendering only","isCorrect":false},{"id":"c","text":"Single Static HTML rendering","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering2-10';



UPDATE questions 
SET options = '[{"id":"a","text":"Search engines struggle to index JavaScript-rendered pages","isCorrect":true},{"id":"b","text":"CSR prevents the use of meta tags","isCorrect":false},{"id":"c","text":"CSR makes sites slower for all users","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering4-2';



UPDATE questions 
SET options = '[{"id":"a","text":"CSR renders pages on the client, SSR renders them on the server before sending HTML","isCorrect":true},{"id":"b","text":"SSR requires no JavaScript on the client","isCorrect":false},{"id":"c","text":"CSR is faster than SSR in all cases","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering4-4';



UPDATE questions 
SET options = '[{"id":"a","text":"A social media share widget inside a static blog post","isCorrect":true},{"id":"b","text":"Static article text with no JavaScript","isCorrect":false},{"id":"c","text":"Server-rendered navigation bar","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering4-6';