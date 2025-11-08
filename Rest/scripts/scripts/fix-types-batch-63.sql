

UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'system-design-q9';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"o1","text":"Long polling sends repeated HTTP requests to check for updates","isCorrect":true,"explanation":""},{"id":"o2","text":"WebSockets provide full-duplex communication between client and server","isCorrect":true,"explanation":""},{"id":"o3","text":"SSE is a one-way push from server to client","isCorrect":true,"explanation":""},{"id":"o4","text":"WebSockets are always the best choice","isCorrect":false,"explanation":""}]' WHERE metadata->>'original_id' = 'system-design-q10';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"o1","text":"Lazy loading delays loading of code/resources until needed","isCorrect":true,"explanation":""},{"id":"o2","text":"Code splitting divides the app into smaller chunks","isCorrect":true,"explanation":""},{"id":"o3","text":"They are the same concept with different names","isCorrect":false,"explanation":""}]' WHERE metadata->>'original_id' = 'system-design-q11';



UPDATE questions SET type = 'true-false' WHERE metadata->>'original_id' = 'system-design-q12';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'system-design-q13';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"o1","text":"Perceivable","isCorrect":true,"explanation":""},{"id":"o2","text":"Operable","isCorrect":true,"explanation":""},{"id":"o3","text":"Understandable","isCorrect":true,"explanation":""},{"id":"o4","text":"Robust","isCorrect":true,"explanation":""},{"id":"o5","text":"Fast","isCorrect":false,"explanation":""}]' WHERE metadata->>'original_id' = 'system-design-q14';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'system-design-q15';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"o1","text":"Optimistic update: update UI before server confirms","isCorrect":true,"explanation":""},{"id":"o2","text":"Pessimistic update: update UI after server confirms","isCorrect":true,"explanation":""},{"id":"o3","text":"Both approaches are identical","isCorrect":false,"explanation":""}]' WHERE metadata->>'original_id' = 'system-design-q16';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'system-design-q17';



UPDATE questions SET type = 'true-false' WHERE metadata->>'original_id' = 'system-design-q18';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'system-design-q19';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"o1","text":"Micro-frontends allow independent teams to build and deploy parts of the UI","isCorrect":true,"explanation":""},{"id":"o2","text":"Micro-frontends always simplify performance optimization","isCorrect":false,"explanation":""},{"id":"o3","text":"They increase architectural complexity","isCorrect":true,"explanation":""}]' WHERE metadata->>'original_id' = 'system-design-q20';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"1","text":"CSR loads JavaScript first and renders in the browser;

 SSR renders HTML on the server per request;

 SSG pre-renders HTML at build time.","isCorrect":true,"explanation":"CSR delays first render but enables rich interactivity;

 SSR improves SEO and first load but adds server cost;

 SSG is best for static content with CDN delivery."},{"id":"2","text":"CSR is faster than SSR in all cases.","isCorrect":false,"explanation":""},{"id":"3","text":"SSG cannot be cached on CDN.","isCorrect":false,"explanation":""}]' WHERE metadata->>'original_id' = 'system-design-q21';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'system-design-q22';



UPDATE questions SET type = 'true-false' WHERE metadata->>'original_id' = 'system-design-q23';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"1","text":"Lazy loading defers the loading of non-critical resources until they are needed.","isCorrect":true,"explanation":"Helps reduce initial load time and improves perceived performance."},{"id":"2","text":"Lazy loading means loading all resources as early as possible.","isCorrect":false,"explanation":""},{"id":"3","text":"Lazy loading only applies to JavaScript modules, not images.","isCorrect":false,"explanation":""}]' WHERE metadata->>'original_id' = 'system-design-q24';