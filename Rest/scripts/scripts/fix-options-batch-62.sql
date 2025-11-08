

UPDATE questions 
SET options = '[{"id":"o1","text":"Encrypts data in transit","isCorrect":true,"explanation":""},{"id":"o2","text":"Authenticates the server using certificates","isCorrect":true,"explanation":""},{"id":"o3","text":"Prevents phishing attacks","isCorrect":false,"explanation":""},{"id":"o4","text":"Prevents unauthorized data tampering","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-11-sec94';



UPDATE questions 
SET options = '[{"id":"o1","text":"User input is reflected without sanitization","isCorrect":true,"explanation":""},{"id":"o2","text":"Using dangerouslySetInnerHTML without sanitation","isCorrect":true,"explanation":""},{"id":"o3","text":"Input validation for forms","isCorrect":false,"explanation":""},{"id":"o4","text":"Content loaded dynamically from unknown sources","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-11-sec95';



UPDATE questions 
SET options = '[{"id":"o1","text":"Prevents JavaScript from accessing the cookie","isCorrect":true,"explanation":""},{"id":"o2","text":"Encrypts cookie contents","isCorrect":false,"explanation":""},{"id":"o3","text":"Prevents cookies from being sent over HTTP","isCorrect":false,"explanation":""},{"id":"o4","text":"Automatically rotates session cookies","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-11-sec97';



UPDATE questions 
SET options = '[{"id":"o1","text":"Automatically escapes data in JSX expressions","isCorrect":true,"explanation":""},{"id":"o2","text":"Prevents execution of scripts in user content","isCorrect":true,"explanation":""},{"id":"o3","text":"Replaces the need for server-side validation","isCorrect":false,"explanation":""},{"id":"o4","text":"Removes all HTML from user input","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-11-sec99';



UPDATE questions 
SET options = '[{"id":"o1","text":"Offset-based pagination","isCorrect":true,"explanation":""},{"id":"o2","text":"Cursor-based pagination","isCorrect":true,"explanation":""},{"id":"o3","text":"Infinite scrolling","isCorrect":true,"explanation":""},{"id":"o4","text":"Randomized pagination","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q1';



UPDATE questions 
SET options = '[{"id":"o1","text":"SSR improves SEO but requires servers to render each request","isCorrect":true,"explanation":""},{"id":"o2","text":"CSR improves interactivity but may delay first paint","isCorrect":true,"explanation":""},{"id":"o3","text":"SSG pre-renders content, making it very fast for static pages","isCorrect":true,"explanation":""},{"id":"o4","text":"CSR is always better than SSR","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q4';



UPDATE questions 
SET options = '[{"id":"o1","text":"Use WebP or AVIF formats","isCorrect":true,"explanation":""},{"id":"o2","text":"Lazy load images below the fold","isCorrect":true,"explanation":""},{"id":"o3","text":"Serve images via CDN with caching","isCorrect":true,"explanation":""},{"id":"o4","text":"Always use raw PNGs without compression","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q7';



UPDATE questions 
SET options = '[{"id":"o1","text":"Long polling sends repeated HTTP requests to check for updates","isCorrect":true,"explanation":""},{"id":"o2","text":"WebSockets provide full-duplex communication between client and server","isCorrect":true,"explanation":""},{"id":"o3","text":"SSE is a one-way push from server to client","isCorrect":true,"explanation":""},{"id":"o4","text":"WebSockets are always the best choice","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q10';



UPDATE questions 
SET options = '[{"id":"o1","text":"Lazy loading delays loading of code/resources until needed","isCorrect":true,"explanation":""},{"id":"o2","text":"Code splitting divides the app into smaller chunks","isCorrect":true,"explanation":""},{"id":"o3","text":"They are the same concept with different names","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q11';



UPDATE questions 
SET options = '[{"id":"o1","text":"Perceivable","isCorrect":true,"explanation":""},{"id":"o2","text":"Operable","isCorrect":true,"explanation":""},{"id":"o3","text":"Understandable","isCorrect":true,"explanation":""},{"id":"o4","text":"Robust","isCorrect":true,"explanation":""},{"id":"o5","text":"Fast","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q14';