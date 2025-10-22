

UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'sec-10-sec89';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"o1","text":"Use JSX curly braces to escape content","isCorrect":true,"explanation":""},{"id":"o2","text":"Sanitize any user-generated HTML before using dangerouslySetInnerHTML","isCorrect":true,"explanation":""},{"id":"o3","text":"Use external scripts instead of inline scripts","isCorrect":true,"explanation":""},{"id":"o4","text":"Store session tokens in localStorage without encryption","isCorrect":false,"explanation":""}]' WHERE metadata->>'original_id' = 'sec-10-sec90';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'sec-11-sec91';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"o1","text":"Use X-Frame-Options header to deny framing","isCorrect":true,"explanation":""},{"id":"o2","text":"Use Content Security Policy frame-ancestors directive","isCorrect":true,"explanation":""},{"id":"o3","text":"Ensure HTTPS is used","isCorrect":false,"explanation":""},{"id":"o4","text":"Use JavaScript frame-busting techniques","isCorrect":true,"explanation":""}]' WHERE metadata->>'original_id' = 'sec-11-sec92';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'sec-11-sec93';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"o1","text":"Encrypts data in transit","isCorrect":true,"explanation":""},{"id":"o2","text":"Authenticates the server using certificates","isCorrect":true,"explanation":""},{"id":"o3","text":"Prevents phishing attacks","isCorrect":false,"explanation":""},{"id":"o4","text":"Prevents unauthorized data tampering","isCorrect":true,"explanation":""}]' WHERE metadata->>'original_id' = 'sec-11-sec94';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"o1","text":"User input is reflected without sanitization","isCorrect":true,"explanation":""},{"id":"o2","text":"Using dangerouslySetInnerHTML without sanitation","isCorrect":true,"explanation":""},{"id":"o3","text":"Input validation for forms","isCorrect":false,"explanation":""},{"id":"o4","text":"Content loaded dynamically from unknown sources","isCorrect":true,"explanation":""}]' WHERE metadata->>'original_id' = 'sec-11-sec95';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'sec-11-sec96';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"o1","text":"Prevents JavaScript from accessing the cookie","isCorrect":true,"explanation":""},{"id":"o2","text":"Encrypts cookie contents","isCorrect":false,"explanation":""},{"id":"o3","text":"Prevents cookies from being sent over HTTP","isCorrect":false,"explanation":""},{"id":"o4","text":"Automatically rotates session cookies","isCorrect":false,"explanation":""}]' WHERE metadata->>'original_id' = 'sec-11-sec97';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'sec-11-sec98';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"o1","text":"Automatically escapes data in JSX expressions","isCorrect":true,"explanation":""},{"id":"o2","text":"Prevents execution of scripts in user content","isCorrect":true,"explanation":""},{"id":"o3","text":"Replaces the need for server-side validation","isCorrect":false,"explanation":""},{"id":"o4","text":"Removes all HTML from user input","isCorrect":false,"explanation":""}]' WHERE metadata->>'original_id' = 'sec-11-sec99';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'sec-11-sec100';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"o1","text":"Offset-based pagination","isCorrect":true,"explanation":""},{"id":"o2","text":"Cursor-based pagination","isCorrect":true,"explanation":""},{"id":"o3","text":"Infinite scrolling","isCorrect":true,"explanation":""},{"id":"o4","text":"Randomized pagination","isCorrect":false,"explanation":""}]' WHERE metadata->>'original_id' = 'system-design-q1';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'system-design-q2';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'system-design-q3';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"o1","text":"SSR improves SEO but requires servers to render each request","isCorrect":true,"explanation":""},{"id":"o2","text":"CSR improves interactivity but may delay first paint","isCorrect":true,"explanation":""},{"id":"o3","text":"SSG pre-renders content, making it very fast for static pages","isCorrect":true,"explanation":""},{"id":"o4","text":"CSR is always better than SSR","isCorrect":false,"explanation":""}]' WHERE metadata->>'original_id' = 'system-design-q4';



UPDATE questions SET type = 'true-false' WHERE metadata->>'original_id' = 'system-design-q5';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'system-design-q6';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"o1","text":"Use WebP or AVIF formats","isCorrect":true,"explanation":""},{"id":"o2","text":"Lazy load images below the fold","isCorrect":true,"explanation":""},{"id":"o3","text":"Serve images via CDN with caching","isCorrect":true,"explanation":""},{"id":"o4","text":"Always use raw PNGs without compression","isCorrect":false,"explanation":""}]' WHERE metadata->>'original_id' = 'system-design-q7';



UPDATE questions SET type = 'true-false' WHERE metadata->>'original_id' = 'system-design-q8';