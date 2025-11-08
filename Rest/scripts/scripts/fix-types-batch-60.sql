

UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'sec-06-sec49';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"o1","text":"HTTP","isCorrect":false,"explanation":""},{"id":"o2","text":"HTTPS","isCorrect":true,"explanation":""},{"id":"o3","text":"Both are equally safe","isCorrect":false,"explanation":""},{"id":"o4","text":"Depends on browser","isCorrect":false,"explanation":""}]' WHERE metadata->>'original_id' = 'sec-06-sec50';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'sec-07-sec51';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"o1","text":"Encrypts data between client and server","isCorrect":true,"explanation":""},{"id":"o2","text":"Validates server identity using certificates","isCorrect":true,"explanation":""},{"id":"o3","text":"Blocks phishing emails automatically","isCorrect":false,"explanation":""},{"id":"o4","text":"Prevents cookie theft if Secure flag is set","isCorrect":true,"explanation":""}]' WHERE metadata->>'original_id' = 'sec-07-sec52';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'sec-07-sec53';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"o1","text":"Set Access-Control-Allow-Origin to a specific trusted domain","isCorrect":true,"explanation":""},{"id":"o2","text":"Use credentials (cookies) only when necessary","isCorrect":true,"explanation":""},{"id":"o3","text":"Set Access-Control-Allow-Origin to ''*''","isCorrect":false,"explanation":""},{"id":"o4","text":"Use server-side proxy to handle requests","isCorrect":true,"explanation":""}]' WHERE metadata->>'original_id' = 'sec-07-sec54';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'sec-07-sec55';



UPDATE questions SET type = 'true-false' WHERE metadata->>'original_id' = 'sec-07-sec56';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'sec-07-sec57';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"o1","text":"Escape HTML before rendering","isCorrect":true,"explanation":""},{"id":"o2","text":"Sanitize input using libraries like DOMPurify","isCorrect":true,"explanation":""},{"id":"o3","text":"Use dangerouslySetInnerHTML without sanitization","isCorrect":false,"explanation":""},{"id":"o4","text":"Implement Content Security Policy (CSP)","isCorrect":true,"explanation":""}]' WHERE metadata->>'original_id' = 'sec-07-sec58';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'sec-07-sec59';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"o1","text":"Use X-Frame-Options header to deny framing","isCorrect":true,"explanation":""},{"id":"o2","text":"Use Content Security Policy frame-ancestors directive","isCorrect":true,"explanation":""},{"id":"o3","text":"Rely only on HTTPS","isCorrect":false,"explanation":""},{"id":"o4","text":"Implement UI overlays as security measure","isCorrect":false,"explanation":""}]' WHERE metadata->>'original_id' = 'sec-07-sec60';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'sec-08-sec61';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"o1","text":"Use CSRF tokens for forms","isCorrect":true,"explanation":""},{"id":"o2","text":"Validate Origin and Referer headers","isCorrect":true,"explanation":""},{"id":"o3","text":"Rely only on HTTPS","isCorrect":false,"explanation":""},{"id":"o4","text":"Use SameSite attribute on cookies","isCorrect":true,"explanation":""}]' WHERE metadata->>'original_id' = 'sec-08-sec62';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'sec-08-sec63';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'sec-08-sec64';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"o1","text":"Use authentication tokens like JWT","isCorrect":true,"explanation":""},{"id":"o2","text":"Enforce HTTPS for all API requests","isCorrect":true,"explanation":""},{"id":"o3","text":"Validate all user inputs on the server","isCorrect":true,"explanation":""},{"id":"o4","text":"Rely only on client-side checks","isCorrect":false,"explanation":""}]' WHERE metadata->>'original_id' = 'sec-08-sec65';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'sec-08-sec66';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"o1","text":"Restrict sources of scripts, styles, and media","isCorrect":true,"explanation":""},{"id":"o2","text":"Prevent inline script execution","isCorrect":true,"explanation":""},{"id":"o3","text":"Encrypt cookies automatically","isCorrect":false,"explanation":""},{"id":"o4","text":"Mitigate XSS attacks","isCorrect":true,"explanation":""}]' WHERE metadata->>'original_id' = 'sec-08-sec67';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'sec-08-sec68';