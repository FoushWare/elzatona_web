

UPDATE questions 
SET options = '[{"id":"o1","text":"Enforce HTTPS and HSTS","isCorrect":true,"explanation":""},{"id":"o2","text":"Validate SSL/TLS certificates","isCorrect":true,"explanation":""},{"id":"o3","text":"Use strong encryption algorithms","isCorrect":true,"explanation":""},{"id":"o4","text":"Rely only on client-side validation","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-03-sec25';



UPDATE questions 
SET options = '[{"id":"o1","text":"Use anti-CSRF tokens in forms","isCorrect":true,"explanation":""},{"id":"o2","text":"Use SameSite cookie attributes","isCorrect":true,"explanation":""},{"id":"o3","text":"Disable HTTPS","isCorrect":false,"explanation":""},{"id":"o4","text":"Validate origin and referer headers","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-04-sec28';



UPDATE questions 
SET options = '[{"id":"o1","text":"Use meta tag in HTML","isCorrect":true,"explanation":""},{"id":"o2","text":"Set HTTP response headers","isCorrect":true,"explanation":""},{"id":"o3","text":"Rely solely on HTTPS","isCorrect":false,"explanation":""},{"id":"o4","text":"Whitelist only trusted sources","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-04-sec31';



UPDATE questions 
SET options = '[{"id":"o1","text":"Set HttpOnly flag","isCorrect":true,"explanation":""},{"id":"o2","text":"Set Secure flag for HTTPS","isCorrect":true,"explanation":""},{"id":"o3","text":"Use SameSite attribute","isCorrect":true,"explanation":""},{"id":"o4","text":"Store passwords directly in cookies","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-04-sec34';



UPDATE questions 
SET options = '[{"id":"o1","text":"Use X-Frame-Options header","isCorrect":true,"explanation":""},{"id":"o2","text":"Use Content Security Policy frame-ancestors directive","isCorrect":true,"explanation":""},{"id":"o3","text":"Obfuscate your buttons with CSS","isCorrect":false,"explanation":""},{"id":"o4","text":"Require user confirmation for critical actions","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-05-sec36';



UPDATE questions 
SET options = '[{"id":"o1","text":"Encrypts traffic between client and server","isCorrect":true,"explanation":""},{"id":"o2","text":"Prevents tampering of data in transit","isCorrect":true,"explanation":""},{"id":"o3","text":"Automatically detects phishing websites","isCorrect":false,"explanation":""},{"id":"o4","text":"Ensures integrity via TLS certificates","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-05-sec38';



UPDATE questions 
SET options = '[{"id":"o1","text":"DOM-based XSS","isCorrect":false,"explanation":""},{"id":"o2","text":"Reflected XSS","isCorrect":false,"explanation":""},{"id":"o3","text":"Stored XSS","isCorrect":true,"explanation":""},{"id":"o4","text":"All are equally dangerous","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-05-sec40';



UPDATE questions 
SET options = '[{"id":"o1","text":"Input validation and sanitization","isCorrect":true,"explanation":""},{"id":"o2","text":"Using HttpOnly cookies","isCorrect":true,"explanation":""},{"id":"o3","text":"Avoid inline scripts and use external scripts","isCorrect":true,"explanation":""},{"id":"o4","text":"Use eval() to encode input","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-05-sec41';



UPDATE questions 
SET options = '[{"id":"o1","text":"Use CSRF tokens in forms and API requests","isCorrect":true,"explanation":""},{"id":"o2","text":"Use SameSite cookies","isCorrect":true,"explanation":""},{"id":"o3","text":"Validate the origin or referer header","isCorrect":true,"explanation":""},{"id":"o4","text":"Rely only on HTTPS","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-06-sec44';



UPDATE questions 
SET options = '[{"id":"o1","text":"X-Frame-Options","isCorrect":true,"explanation":""},{"id":"o2","text":"Content-Security-Policy","isCorrect":false,"explanation":""},{"id":"o3","text":"Strict-Transport-Security","isCorrect":false,"explanation":""},{"id":"o4","text":"X-Content-Type-Options","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'sec-06-sec46';