

UPDATE questions SET type = 'multiple-choice', options = '[{"id":"o1","text":"Stored XSS persists in the database and affects multiple users","isCorrect":true,"explanation":""},{"id":"o2","text":"Reflected XSS occurs immediately and is non-persistent","isCorrect":true,"explanation":""},{"id":"o3","text":"Reflected XSS stores payload in server database","isCorrect":false,"explanation":""},{"id":"o4","text":"Stored XSS is less dangerous than reflected XSS","isCorrect":false,"explanation":""}]' WHERE metadata->>'original_id' = 'sec-08-sec69';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"o1","text":"Use short-lived tokens and refresh them securely","isCorrect":true,"explanation":""},{"id":"o2","text":"Store tokens in memory or HttpOnly cookies","isCorrect":true,"explanation":""},{"id":"o3","text":"Rely solely on localStorage for tokens","isCorrect":false,"explanation":""},{"id":"o4","text":"Invalidate sessions on logout and after inactivity","isCorrect":true,"explanation":""}]' WHERE metadata->>'original_id' = 'sec-08-sec70';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'sec-09-sec71';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"o1","text":"Use X-Frame-Options header","isCorrect":true,"explanation":""},{"id":"o2","text":"Use Content Security Policy frame-ancestors directive","isCorrect":true,"explanation":""},{"id":"o3","text":"Disable JavaScript completely","isCorrect":false,"explanation":""},{"id":"o4","text":"Use secure authentication only","isCorrect":false,"explanation":""}]' WHERE metadata->>'original_id' = 'sec-09-sec72';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'sec-09-sec73';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"o1","text":"Use HTTPS for all communication","isCorrect":true,"explanation":""},{"id":"o2","text":"Validate SSL/TLS certificates","isCorrect":true,"explanation":""},{"id":"o3","text":"Implement HSTS headers","isCorrect":true,"explanation":""},{"id":"o4","text":"Rely only on network-level security","isCorrect":false,"explanation":""}]' WHERE metadata->>'original_id' = 'sec-09-sec74';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'sec-09-sec75';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'sec-09-sec76';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"o1","text":"Encrypts data in transit","isCorrect":true,"explanation":""},{"id":"o2","text":"Prevents eavesdropping and tampering","isCorrect":true,"explanation":""},{"id":"o3","text":"Automatically sanitizes user inputs","isCorrect":false,"explanation":""},{"id":"o4","text":"Provides server authentication","isCorrect":true,"explanation":""}]' WHERE metadata->>'original_id' = 'sec-09-sec77';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'sec-09-sec78';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'sec-09-sec79';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'sec-09-sec80';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'sec-10-sec81';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"o1","text":"Use CSRF tokens in forms","isCorrect":true,"explanation":""},{"id":"o2","text":"Use SameSite cookie attribute","isCorrect":true,"explanation":""},{"id":"o3","text":"Use HTTPS","isCorrect":true,"explanation":""},{"id":"o4","text":"Disable cookies completely","isCorrect":false,"explanation":""}]' WHERE metadata->>'original_id' = 'sec-10-sec82';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"o1","text":"DOM-based XSS executes purely on the client side","isCorrect":true,"explanation":""},{"id":"o2","text":"Stored XSS persists in a database or storage and affects multiple users","isCorrect":true,"explanation":""},{"id":"o3","text":"DOM-based XSS stores payloads on the server","isCorrect":false,"explanation":""},{"id":"o4","text":"Stored XSS only affects a single user","isCorrect":false,"explanation":""}]' WHERE metadata->>'original_id' = 'sec-10-sec83';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'sec-10-sec84';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"o1","text":"Restricts sources of scripts and other resources","isCorrect":true,"explanation":""},{"id":"o2","text":"Helps prevent XSS attacks","isCorrect":true,"explanation":""},{"id":"o3","text":"Replaces the need for input validation","isCorrect":false,"explanation":""},{"id":"o4","text":"Can block inline styles and scripts if configured","isCorrect":true,"explanation":""}]' WHERE metadata->>'original_id' = 'sec-10-sec85';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'sec-10-sec86';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"o1","text":"Prevents cookies from being sent with cross-site requests by default","isCorrect":true,"explanation":""},{"id":"o2","text":"Mitigates CSRF attacks","isCorrect":true,"explanation":""},{"id":"o3","text":"Encrypts cookie contents","isCorrect":false,"explanation":""},{"id":"o4","text":"Prevents cookies from being accessed via JavaScript","isCorrect":false,"explanation":""}]' WHERE metadata->>'original_id' = 'sec-10-sec87';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"o1","text":"Use HttpOnly to prevent JavaScript access","isCorrect":true,"explanation":""},{"id":"o2","text":"Use Secure flag to enforce HTTPS transmission","isCorrect":true,"explanation":""},{"id":"o3","text":"Avoid storing sensitive tokens in localStorage","isCorrect":true,"explanation":""},{"id":"o4","text":"Use SameSite attribute to mitigate CSRF","isCorrect":true,"explanation":""}]' WHERE metadata->>'original_id' = 'sec-10-sec88';