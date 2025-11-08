

UPDATE questions SET type = 'true-false' WHERE metadata->>'original_id' = 'sec-01-sec9';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'sec-02-sec10';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"o1","text":"Use anti-CSRF tokens in forms","isCorrect":true,"explanation":""},{"id":"o2","text":"Validate the Origin and Referer headers","isCorrect":true,"explanation":""},{"id":"o3","text":"Enable HttpOnly cookies","isCorrect":false,"explanation":""},{"id":"o4","text":"Require user confirmation for critical actions","isCorrect":true,"explanation":""}]' WHERE metadata->>'original_id' = 'sec-02-sec11';



UPDATE questions SET type = 'true-false' WHERE metadata->>'original_id' = 'sec-02-sec12';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'sec-02-sec13';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"o1","text":"Strict-Transport-Security","isCorrect":true,"explanation":""},{"id":"o2","text":"X-Content-Type-Options","isCorrect":true,"explanation":""},{"id":"o3","text":"X-Frame-Options","isCorrect":true,"explanation":""},{"id":"o4","text":"X-Powered-By","isCorrect":false,"explanation":""}]' WHERE metadata->>'original_id' = 'sec-02-sec14';



UPDATE questions SET type = 'true-false' WHERE metadata->>'original_id' = 'sec-02-sec15';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'sec-02-sec16';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"o1","text":"Set HttpOnly flag","isCorrect":true,"explanation":""},{"id":"o2","text":"Set Secure flag","isCorrect":true,"explanation":""},{"id":"o3","text":"Use SameSite=strict","isCorrect":true,"explanation":""},{"id":"o4","text":"Store sensitive info in localStorage","isCorrect":false,"explanation":""}]' WHERE metadata->>'original_id' = 'sec-02-sec17';



UPDATE questions SET type = 'true-false' WHERE metadata->>'original_id' = 'sec-02-sec18';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'sec-03-sec19';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"o1","text":"Use X-Frame-Options: DENY or SAMEORIGIN","isCorrect":true,"explanation":""},{"id":"o2","text":"Use Content Security Policy frame-ancestors","isCorrect":true,"explanation":""},{"id":"o3","text":"Disable JavaScript entirely","isCorrect":false,"explanation":""},{"id":"o4","text":"Detect and prevent iframes using JS","isCorrect":true,"explanation":""}]' WHERE metadata->>'original_id' = 'sec-03-sec20';



UPDATE questions SET type = 'true-false' WHERE metadata->>'original_id' = 'sec-03-sec21';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"o1","text":"Use React’s JSX variable escaping","isCorrect":true,"explanation":""},{"id":"o2","text":"Sanitize any HTML before using dangerouslySetInnerHTML","isCorrect":true,"explanation":""},{"id":"o3","text":"Avoid inline event handlers","isCorrect":true,"explanation":""},{"id":"o4","text":"Store all sensitive data in localStorage","isCorrect":false,"explanation":""}]' WHERE metadata->>'original_id' = 'sec-03-sec22';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'sec-03-sec23';



UPDATE questions SET type = 'true-false' WHERE metadata->>'original_id' = 'sec-03-sec24';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"o1","text":"Enforce HTTPS and HSTS","isCorrect":true,"explanation":""},{"id":"o2","text":"Validate SSL/TLS certificates","isCorrect":true,"explanation":""},{"id":"o3","text":"Use strong encryption algorithms","isCorrect":true,"explanation":""},{"id":"o4","text":"Rely only on client-side validation","isCorrect":false,"explanation":""}]' WHERE metadata->>'original_id' = 'sec-03-sec25';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'sec-03-sec26';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'sec-04-sec27';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"o1","text":"Use anti-CSRF tokens in forms","isCorrect":true,"explanation":""},{"id":"o2","text":"Use SameSite cookie attributes","isCorrect":true,"explanation":""},{"id":"o3","text":"Disable HTTPS","isCorrect":false,"explanation":""},{"id":"o4","text":"Validate origin and referer headers","isCorrect":true,"explanation":""}]' WHERE metadata->>'original_id' = 'sec-04-sec28';