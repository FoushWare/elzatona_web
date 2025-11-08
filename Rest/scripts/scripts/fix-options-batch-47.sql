

UPDATE questions 
SET options = '[{"id":"a","text":"Serverless functions in pages/api or app/api that handle HTTP requests","isCorrect":true,"explanation":""},{"id":"b","text":"Only for client-side logic","isCorrect":false,"explanation":""},{"id":"c","text":"Require Express.js","isCorrect":false,"explanation":""},{"id":"d","text":"Not supported in Next.js","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'next1-20-nextjs-q9';



UPDATE questions 
SET options = '[{"id":"a","text":"Runs before request completion;

 can rewrite, redirect, or modify headers","isCorrect":true,"explanation":""},{"id":"b","text":"Only for client-side logic","isCorrect":false,"explanation":""},{"id":"c","text":"Replaces API routes","isCorrect":false,"explanation":""},{"id":"d","text":"Not supported in App Router","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'next1-20-nextjs-q12';



UPDATE questions 
SET options = '[{"id":"a","text":"Customize Webpack, Babel, env vars, and experimental features","isCorrect":true,"explanation":""},{"id":"b","text":"Required for every Next.js app","isCorrect":false,"explanation":""},{"id":"c","text":"Only for CSS configuration","isCorrect":false,"explanation":""},{"id":"d","text":"Replaces package.json","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'next1-20-nextjs-q14';



UPDATE questions 
SET options = '[{"id":"a","text":"Bracket-based routes like [id].js for dynamic data","isCorrect":true,"explanation":""},{"id":"b","text":"Only static routes are supported","isCorrect":false,"explanation":""},{"id":"c","text":"Require manual React Router setup","isCorrect":false,"explanation":""},{"id":"d","text":"Not compatible with SSR","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'next1-20-nextjs-q16';



UPDATE questions 
SET options = '[{"id":"a","text":"SSG: build-time render;

 SSR: per-request render","isCorrect":true,"explanation":""},{"id":"b","text":"SSR is always faster than SSG","isCorrect":false,"explanation":""},{"id":"c","text":"SSG doesn’t support dynamic data","isCorrect":false,"explanation":""},{"id":"d","text":"They are the same","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'next1-20-nextjs-q18';



UPDATE questions 
SET options = '[{"id":"a","text":"SSG: build-time render;

 SSR: per-request render","isCorrect":true,"explanation":""},{"id":"b","text":"SSR is always faster than SSG","isCorrect":false,"explanation":""},{"id":"c","text":"SSG doesn’t support dynamic data","isCorrect":false,"explanation":""},{"id":"d","text":"They are the same","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'next41-60-nextjs-q43';



UPDATE questions 
SET options = '[{"id":"a","text":"`generateStaticParams`: App Router;