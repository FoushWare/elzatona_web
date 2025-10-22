

UPDATE questions 
SET options = '[{"id":"a","text":"ETag and If-None-Match","isCorrect":true},{"id":"b","text":"Cache-Control: immutable","isCorrect":false},{"id":"c","text":"Last-Modified and If-Match","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering8-8';



UPDATE questions 
SET options = '[{"id":"a","text":"Serves a stale cache immediately and revalidates it in the background","isCorrect":true},{"id":"b","text":"Deletes old cache entries before fetching new ones","isCorrect":false},{"id":"c","text":"Disables revalidation for dynamic pages","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering8-10';



UPDATE questions 
SET options = '[{"id":"a","text":"Time until the largest visible element (image or text block) renders","isCorrect":true},{"id":"b","text":"Total load time of all resources","isCorrect":false},{"id":"c","text":"Delay before the first user input is processed","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering9-2';



UPDATE questions 
SET options = '[{"id":"a","text":"Visual instability caused by unexpected layout movements","isCorrect":true},{"id":"b","text":"Slow data fetching","isCorrect":false},{"id":"c","text":"JavaScript bundle size issues","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering9-4';



UPDATE questions 
SET options = '[{"id":"a","text":"They define quantitative limits (like max JS size or LCP time) to prevent regressions","isCorrect":true},{"id":"b","text":"They automatically compress code bundles","isCorrect":false},{"id":"c","text":"They control the rendering order of components","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering9-8';



UPDATE questions 
SET options = '[{"id":"a","text":"First Input Delay (FID)","isCorrect":true},{"id":"b","text":"Cumulative Layout Shift (CLS)","isCorrect":false},{"id":"c","text":"Time To First Byte (TTFB)","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering9-9';



UPDATE questions 
SET options = '[{"id":"a","text":"HTML is pre-generated and can be cached for near-instant TTFB","isCorrect":true},{"id":"b","text":"The server generates HTML for every request","isCorrect":false},{"id":"c","text":"Users must fetch data before rendering","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering-2';



UPDATE questions 
SET options = '[{"id":"a","text":"Poor SEO due to server-side rendering","isCorrect":false},{"id":"b","text":"Delayed Largest Contentful Paint (LCP) since main content loads after client fetch","isCorrect":true},{"id":"c","text":"Cannot cache responses on a CDN","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering-3';



UPDATE questions 
SET options = '[{"id":"a","text":"Long build times and hitting API request limits","isCorrect":true},{"id":"b","text":"Poor SEO optimization","isCorrect":false},{"id":"c","text":"Increased client-side bundle size","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering-5';



UPDATE questions 
SET options = '[{"id":"a","text":"The server immediately returns a 404 error","isCorrect":false},{"id":"b","text":"The page is generated on-demand and cached for future requests","isCorrect":true},{"id":"c","text":"The user sees a loading spinner until next build","isCorrect":false}]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering-7';