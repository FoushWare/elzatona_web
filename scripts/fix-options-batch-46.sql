

UPDATE questions 
SET options = '[{"id":"a","text":"Expo: managed workflow, prebuilt modules, cloud services;

 React Native: bare workflow, full native control","isCorrect":true,"explanation":""},{"id":"b","text":"Expo doesn’t support custom native code","isCorrect":false,"explanation":""},{"id":"c","text":"React Native is only for iOS","isCorrect":false,"explanation":""},{"id":"d","text":"Expo is deprecated","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'next-21-40-nextjs-q40';



UPDATE questions 
SET options = '[{"id":"a","text":"SSG: build-time render;

 SSR: per-request render","isCorrect":true,"explanation":""},{"id":"b","text":"SSR is always faster than SSG","isCorrect":false,"explanation":""},{"id":"c","text":"SSG doesn’t support dynamic data","isCorrect":false,"explanation":""},{"id":"d","text":"They are the same","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'next-61-80-nextjs-q63';



UPDATE questions 
SET options = '[{"id":"a","text":"`generateStaticParams`: App Router;

 `getStaticPaths`: Pages Router","isCorrect":true,"explanation":""},{"id":"b","text":"They are the same function","isCorrect":false,"explanation":""},{"id":"c","text":"`getStaticPaths` works in App Router","isCorrect":false,"explanation":""},{"id":"d","text":"`generateStaticParams` is for SSR","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'next-61-80-nextjs-q70';



UPDATE questions 
SET options = '[{"id":"a","text":"Client-side navigation in Client Components","isCorrect":true,"explanation":""},{"id":"b","text":"Data fetching in Server Components","isCorrect":false,"explanation":""},{"id":"c","text":"Server-side redirects","isCorrect":false,"explanation":""},{"id":"d","text":"Only works in Pages Router","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'next-61-80-nextjs-q74';



UPDATE questions 
SET options = '[{"id":"a","text":"Customize Webpack, Babel, env vars, and experimental features","isCorrect":true,"explanation":""},{"id":"b","text":"Required for every Next.js app","isCorrect":false,"explanation":""},{"id":"c","text":"Only for CSS configuration","isCorrect":false,"explanation":""},{"id":"d","text":"Replaces package.json","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'next-61-80-nextjs-q78';



UPDATE questions 
SET options = '[{"id":"a","text":"File-based routing, SSR/SSG, API routes, image optimization, middleware","isCorrect":true,"explanation":""},{"id":"b","text":"Only client-side rendering","isCorrect":false,"explanation":""},{"id":"c","text":"No built-in routing","isCorrect":false,"explanation":""},{"id":"d","text":"Requires manual Webpack configuration","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'next1-20-nextjs-q2';



UPDATE questions 
SET options = '[{"id":"a","text":"File-based routing in pages/ or app/ directories","isCorrect":true,"explanation":""},{"id":"b","text":"Manual route configuration with React Router","isCorrect":false,"explanation":""},{"id":"c","text":"Only hash-based routing","isCorrect":false,"explanation":""},{"id":"d","text":"Routing requires server setup","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'next1-20-nextjs-q5';