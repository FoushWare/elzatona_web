

UPDATE questions 
SET options = '[{"id":"o1","text":"HTTP","isCorrect":false,"explanation":""},{"id":"o2","text":"HTTPS","isCorrect":true,"explanation":""},{"id":"o3","text":"Both are equally safe","isCorrect":false,"explanation":""},{"id":"o4","text":"Depends on browser","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-06-sec50';



UPDATE questions 
SET options = '[{"id":"o1","text":"Encrypts data between client and server","isCorrect":true,"explanation":""},{"id":"o2","text":"Validates server identity using certificates","isCorrect":true,"explanation":""},{"id":"o3","text":"Blocks phishing emails automatically","isCorrect":false,"explanation":""},{"id":"o4","text":"Prevents cookie theft if Secure flag is set","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-07-sec52';



UPDATE questions 
SET options = '[{"id":"o1","text":"Set Access-Control-Allow-Origin to a specific trusted domain","isCorrect":true,"explanation":""},{"id":"o2","text":"Use credentials (cookies) only when necessary","isCorrect":true,"explanation":""},{"id":"o3","text":"Set Access-Control-Allow-Origin to ''*''","isCorrect":false,"explanation":""},{"id":"o4","text":"Use server-side proxy to handle requests","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-07-sec54';



UPDATE questions 
SET options = '[{"id":"o1","text":"Escape HTML before rendering","isCorrect":true,"explanation":""},{"id":"o2","text":"Sanitize input using libraries like DOMPurify","isCorrect":true,"explanation":""},{"id":"o3","text":"Use dangerouslySetInnerHTML without sanitization","isCorrect":false,"explanation":""},{"id":"o4","text":"Implement Content Security Policy (CSP)","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-07-sec58';



UPDATE questions 
SET options = '[{"id":"o1","text":"Use X-Frame-Options header to deny framing","isCorrect":true,"explanation":""},{"id":"o2","text":"Use Content Security Policy frame-ancestors directive","isCorrect":true,"explanation":""},{"id":"o3","text":"Rely only on HTTPS","isCorrect":false,"explanation":""},{"id":"o4","text":"Implement UI overlays as security measure","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-07-sec60';



UPDATE questions 
SET options = '[{"id":"o1","text":"Use CSRF tokens for forms","isCorrect":true,"explanation":""},{"id":"o2","text":"Validate Origin and Referer headers","isCorrect":true,"explanation":""},{"id":"o3","text":"Rely only on HTTPS","isCorrect":false,"explanation":""},{"id":"o4","text":"Use SameSite attribute on cookies","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-08-sec62';



UPDATE questions 
SET options = '[{"id":"o1","text":"Use authentication tokens like JWT","isCorrect":true,"explanation":""},{"id":"o2","text":"Enforce HTTPS for all API requests","isCorrect":true,"explanation":""},{"id":"o3","text":"Validate all user inputs on the server","isCorrect":true,"explanation":""},{"id":"o4","text":"Rely only on client-side checks","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-08-sec65';



UPDATE questions 
SET options = '[{"id":"o1","text":"Restrict sources of scripts, styles, and media","isCorrect":true,"explanation":""},{"id":"o2","text":"Prevent inline script execution","isCorrect":true,"explanation":""},{"id":"o3","text":"Encrypt cookies automatically","isCorrect":false,"explanation":""},{"id":"o4","text":"Mitigate XSS attacks","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-08-sec67';



UPDATE questions 
SET options = '[{"id":"o1","text":"Stored XSS persists in the database and affects multiple users","isCorrect":true,"explanation":""},{"id":"o2","text":"Reflected XSS occurs immediately and is non-persistent","isCorrect":true,"explanation":""},{"id":"o3","text":"Reflected XSS stores payload in server database","isCorrect":false,"explanation":""},{"id":"o4","text":"Stored XSS is less dangerous than reflected XSS","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-08-sec69';



UPDATE questions 
SET options = '[{"id":"o1","text":"Use short-lived tokens and refresh them securely","isCorrect":true,"explanation":""},{"id":"o2","text":"Store tokens in memory or HttpOnly cookies","isCorrect":true,"explanation":""},{"id":"o3","text":"Rely solely on localStorage for tokens","isCorrect":false,"explanation":""},{"id":"o4","text":"Invalidate sessions on logout and after inactivity","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-08-sec70';