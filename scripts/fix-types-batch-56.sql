

UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'rendering-patterns-rendering5-9';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"When your page depends on highly personalized data that changes per user request","isCorrect":true},{"id":"b","text":"When the content is static and rarely changes","isCorrect":false},{"id":"c","text":"When build times are slow","isCorrect":false}]' WHERE metadata->>'original_id' = 'rendering-patterns-rendering5-10';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'rendering-patterns-rendering8-1';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Cache-Control: must-revalidate","isCorrect":true},{"id":"b","text":"Cache-Control: immutable","isCorrect":false},{"id":"c","text":"ETag: strong","isCorrect":false}]' WHERE metadata->>'original_id' = 'rendering-patterns-rendering8-2';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'rendering-patterns-rendering8-3';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"It stores static assets closer to the user geographically to reduce latency","isCorrect":true},{"id":"b","text":"It only caches dynamic content for faster hydration","isCorrect":false},{"id":"c","text":"It disables browser caching entirely","isCorrect":false}]' WHERE metadata->>'original_id' = 'rendering-patterns-rendering8-4';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'rendering-patterns-rendering8-5';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"It ensures browsers fetch updated assets when changes occur","isCorrect":true},{"id":"b","text":"It prevents caching altogether","isCorrect":false},{"id":"c","text":"It slows down content delivery","isCorrect":false}]' WHERE metadata->>'original_id' = 'rendering-patterns-rendering8-6';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'rendering-patterns-rendering8-7';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"ETag and If-None-Match","isCorrect":true},{"id":"b","text":"Cache-Control: immutable","isCorrect":false},{"id":"c","text":"Last-Modified and If-Match","isCorrect":false}]' WHERE metadata->>'original_id' = 'rendering-patterns-rendering8-8';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'rendering-patterns-rendering8-9';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Serves a stale cache immediately and revalidates it in the background","isCorrect":true},{"id":"b","text":"Deletes old cache entries before fetching new ones","isCorrect":false},{"id":"c","text":"Disables revalidation for dynamic pages","isCorrect":false}]' WHERE metadata->>'original_id' = 'rendering-patterns-rendering8-10';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'rendering-patterns-rendering9-1';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Time until the largest visible element (image or text block) renders","isCorrect":true},{"id":"b","text":"Total load time of all resources","isCorrect":false},{"id":"c","text":"Delay before the first user input is processed","isCorrect":false}]' WHERE metadata->>'original_id' = 'rendering-patterns-rendering9-2';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'rendering-patterns-rendering9-3';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Visual instability caused by unexpected layout movements","isCorrect":true},{"id":"b","text":"Slow data fetching","isCorrect":false},{"id":"c","text":"JavaScript bundle size issues","isCorrect":false}]' WHERE metadata->>'original_id' = 'rendering-patterns-rendering9-4';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'rendering-patterns-rendering9-5';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'rendering-patterns-rendering9-6';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'rendering-patterns-rendering9-7';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"They define quantitative limits (like max JS size or LCP time) to prevent regressions","isCorrect":true},{"id":"b","text":"They automatically compress code bundles","isCorrect":false},{"id":"c","text":"They control the rendering order of components","isCorrect":false}]' WHERE metadata->>'original_id' = 'rendering-patterns-rendering9-8';