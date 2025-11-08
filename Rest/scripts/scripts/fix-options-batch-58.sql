

UPDATE questions 
SET options = '[{"id":"a","text":"Largest Contentful Paint (LCP)","isCorrect":true},{"id":"b","text":"Cumulative Layout Shift (CLS)","isCorrect":false},{"id":"c","text":"First Input Delay (FID)","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering-9';



UPDATE questions 
SET options = '[{"id":"a","text":"For highly personalized pages or data that changes per user request","isCorrect":true},{"id":"b","text":"For blogs and documentation","isCorrect":false},{"id":"c","text":"For e-commerce product pages updated daily","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering-10';



UPDATE questions 
SET options = '[{"id":"o1","text":"DOM-based XSS","isCorrect":true,"explanation":""},{"id":"o2","text":"Reflected XSS","isCorrect":true,"explanation":""},{"id":"o3","text":"Stored XSS","isCorrect":true,"explanation":""},{"id":"o4","text":"SQL Injection","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-01-sec2';



UPDATE questions 
SET options = '[{"id":"o1","text":"X-Frame-Options","isCorrect":true,"explanation":""},{"id":"o2","text":"Content-Security-Policy (frame-ancestors)","isCorrect":true,"explanation":""},{"id":"o3","text":"X-Content-Type-Options","isCorrect":false,"explanation":""},{"id":"o4","text":"Strict-Transport-Security","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-01-sec5';



UPDATE questions 
SET options = '[{"id":"o1","text":"Avoid dangerouslySetInnerHTML","isCorrect":true,"explanation":""},{"id":"o2","text":"Use DOMPurify or similar sanitizers","isCorrect":true,"explanation":""},{"id":"o3","text":"Use HttpOnly cookies","isCorrect":false,"explanation":""},{"id":"o4","text":"Validate input server-side","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-01-sec8';



UPDATE questions 
SET options = '[{"id":"o1","text":"Use anti-CSRF tokens in forms","isCorrect":true,"explanation":""},{"id":"o2","text":"Validate the Origin and Referer headers","isCorrect":true,"explanation":""},{"id":"o3","text":"Enable HttpOnly cookies","isCorrect":false,"explanation":""},{"id":"o4","text":"Require user confirmation for critical actions","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-02-sec11';



UPDATE questions 
SET options = '[{"id":"o1","text":"Strict-Transport-Security","isCorrect":true,"explanation":""},{"id":"o2","text":"X-Content-Type-Options","isCorrect":true,"explanation":""},{"id":"o3","text":"X-Frame-Options","isCorrect":true,"explanation":""},{"id":"o4","text":"X-Powered-By","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-02-sec14';



UPDATE questions 
SET options = '[{"id":"o1","text":"Set HttpOnly flag","isCorrect":true,"explanation":""},{"id":"o2","text":"Set Secure flag","isCorrect":true,"explanation":""},{"id":"o3","text":"Use SameSite=strict","isCorrect":true,"explanation":""},{"id":"o4","text":"Store sensitive info in localStorage","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-02-sec17';



UPDATE questions 
SET options = '[{"id":"o1","text":"Use X-Frame-Options: DENY or SAMEORIGIN","isCorrect":true,"explanation":""},{"id":"o2","text":"Use Content Security Policy frame-ancestors","isCorrect":true,"explanation":""},{"id":"o3","text":"Disable JavaScript entirely","isCorrect":false,"explanation":""},{"id":"o4","text":"Detect and prevent iframes using JS","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-03-sec20';



UPDATE questions 
SET options = '[{"id":"o1","text":"Use React’s JSX variable escaping","isCorrect":true,"explanation":""},{"id":"o2","text":"Sanitize any HTML before using dangerouslySetInnerHTML","isCorrect":true,"explanation":""},{"id":"o3","text":"Avoid inline event handlers","isCorrect":true,"explanation":""},{"id":"o4","text":"Store all sensitive data in localStorage","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-03-sec22';