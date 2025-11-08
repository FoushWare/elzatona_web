

UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"First Input Delay (FID)","isCorrect":true},{"id":"b","text":"Cumulative Layout Shift (CLS)","isCorrect":false},{"id":"c","text":"Time To First Byte (TTFB)","isCorrect":false}]' WHERE metadata->>'original_id' = 'rendering-patterns-rendering9-9';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'rendering-patterns-rendering9-10';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'rendering-patterns-rendering-1';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"HTML is pre-generated and can be cached for near-instant TTFB","isCorrect":true},{"id":"b","text":"The server generates HTML for every request","isCorrect":false},{"id":"c","text":"Users must fetch data before rendering","isCorrect":false}]' WHERE metadata->>'original_id' = 'rendering-patterns-rendering-2';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Poor SEO due to server-side rendering","isCorrect":false},{"id":"b","text":"Delayed Largest Contentful Paint (LCP) since main content loads after client fetch","isCorrect":true},{"id":"c","text":"Cannot cache responses on a CDN","isCorrect":false}]' WHERE metadata->>'original_id' = 'rendering-patterns-rendering-3';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'rendering-patterns-rendering-4';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Long build times and hitting API request limits","isCorrect":true},{"id":"b","text":"Poor SEO optimization","isCorrect":false},{"id":"c","text":"Increased client-side bundle size","isCorrect":false}]' WHERE metadata->>'original_id' = 'rendering-patterns-rendering-5';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'rendering-patterns-rendering-6';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"The server immediately returns a 404 error","isCorrect":false},{"id":"b","text":"The page is generated on-demand and cached for future requests","isCorrect":true},{"id":"c","text":"The user sees a loading spinner until next build","isCorrect":false}]' WHERE metadata->>'original_id' = 'rendering-patterns-rendering-7';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'rendering-patterns-rendering-8';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Largest Contentful Paint (LCP)","isCorrect":true},{"id":"b","text":"Cumulative Layout Shift (CLS)","isCorrect":false},{"id":"c","text":"First Input Delay (FID)","isCorrect":false}]' WHERE metadata->>'original_id' = 'rendering-patterns-rendering-9';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"For highly personalized pages or data that changes per user request","isCorrect":true},{"id":"b","text":"For blogs and documentation","isCorrect":false},{"id":"c","text":"For e-commerce product pages updated daily","isCorrect":false}]' WHERE metadata->>'original_id' = 'rendering-patterns-rendering-10';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'sec-01-sec1';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"o1","text":"DOM-based XSS","isCorrect":true,"explanation":""},{"id":"o2","text":"Reflected XSS","isCorrect":true,"explanation":""},{"id":"o3","text":"Stored XSS","isCorrect":true,"explanation":""},{"id":"o4","text":"SQL Injection","isCorrect":false,"explanation":""}]' WHERE metadata->>'original_id' = 'sec-01-sec2';



UPDATE questions SET type = 'true-false' WHERE metadata->>'original_id' = 'sec-01-sec3';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'sec-01-sec4';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"o1","text":"X-Frame-Options","isCorrect":true,"explanation":""},{"id":"o2","text":"Content-Security-Policy (frame-ancestors)","isCorrect":true,"explanation":""},{"id":"o3","text":"X-Content-Type-Options","isCorrect":false,"explanation":""},{"id":"o4","text":"Strict-Transport-Security","isCorrect":false,"explanation":""}]' WHERE metadata->>'original_id' = 'sec-01-sec5';



UPDATE questions SET type = 'true-false' WHERE metadata->>'original_id' = 'sec-01-sec6';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'sec-01-sec7';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"o1","text":"Avoid dangerouslySetInnerHTML","isCorrect":true,"explanation":""},{"id":"o2","text":"Use DOMPurify or similar sanitizers","isCorrect":true,"explanation":""},{"id":"o3","text":"Use HttpOnly cookies","isCorrect":false,"explanation":""},{"id":"o4","text":"Validate input server-side","isCorrect":true,"explanation":""}]' WHERE metadata->>'original_id' = 'sec-01-sec8';