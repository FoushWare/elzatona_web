

UPDATE questions 
SET options = '[{"id":"o1","text":"Optimistic update: update UI before server confirms","isCorrect":true,"explanation":""},{"id":"o2","text":"Pessimistic update: update UI after server confirms","isCorrect":true,"explanation":""},{"id":"o3","text":"Both approaches are identical","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q16';



UPDATE questions 
SET options = '[{"id":"o1","text":"Micro-frontends allow independent teams to build and deploy parts of the UI","isCorrect":true,"explanation":""},{"id":"o2","text":"Micro-frontends always simplify performance optimization","isCorrect":false,"explanation":""},{"id":"o3","text":"They increase architectural complexity","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q20';



UPDATE questions 
SET options = '[{"id":"1","text":"CSR loads JavaScript first and renders in the browser;

 SSR renders HTML on the server per request;

 SSG pre-renders HTML at build time.","isCorrect":true,"explanation":"CSR delays first render but enables rich interactivity;

 SSR improves SEO and first load but adds server cost;

 SSG is best for static content with CDN delivery."},{"id":"2","text":"CSR is faster than SSR in all cases.","isCorrect":false,"explanation":""},{"id":"3","text":"SSG cannot be cached on CDN.","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q21';



UPDATE questions 
SET options = '[{"id":"1","text":"Lazy loading defers the loading of non-critical resources until they are needed.","isCorrect":true,"explanation":"Helps reduce initial load time and improves perceived performance."},{"id":"2","text":"Lazy loading means loading all resources as early as possible.","isCorrect":false,"explanation":""},{"id":"3","text":"Lazy loading only applies to JavaScript modules, not images.","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q24';



UPDATE questions 
SET options = '[{"id":"o1","text":"Removes unused CSS from the DOM","isCorrect":false,"explanation":""},{"id":"o2","text":"Removes unused JavaScript exports from bundles","isCorrect":true,"explanation":""},{"id":"o3","text":"Shakes DOM nodes to re-render faster","isCorrect":false,"explanation":""},{"id":"o4","text":"Optimizes images automatically","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q25';



UPDATE questions 
SET options = '[{"id":"o1","text":"Prefetch is for resources needed immediately","isCorrect":false,"explanation":""},{"id":"o2","text":"Preload is for resources needed immediately","isCorrect":true,"explanation":""},{"id":"o3","text":"Prefetch is for resources likely needed in future","isCorrect":true,"explanation":""},{"id":"o4","text":"Preload defers resources until user interaction","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q28';