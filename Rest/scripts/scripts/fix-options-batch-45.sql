

UPDATE questions 
SET options = '[{"id":"a","text":"`a is bigger`, `6` and `b is bigger`, `3`","isCorrect":false,"explanation":""},{"id":"b","text":"`a is bigger`, `undefined` and `b is bigger`, `undefined`","isCorrect":true,"explanation":""},{"id":"c","text":"`undefined` and `undefined`","isCorrect":false,"explanation":""},{"id":"d","text":"`SyntaxError`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-76–100QA-js-q-095';



UPDATE questions 
SET options = '[{"id":"a","text":"`\"Lydia\"`","isCorrect":false,"explanation":""},{"id":"b","text":"`\"Sarah\"`","isCorrect":true,"explanation":""},{"id":"c","text":"`Error: cannot redeclare Person`","isCorrect":false,"explanation":""},{"id":"d","text":"`SyntaxError`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-76–100QA-js-q-096';



UPDATE questions 
SET options = '[{"id":"a","text":"`{Symbol(''a''): ''b''}` and `[\"{Symbol(''a'')\"]`","isCorrect":false,"explanation":""},{"id":"b","text":"`{}` and `[]`","isCorrect":false,"explanation":""},{"id":"c","text":"`{ a: \"b\" }` and `[\"a\"]`","isCorrect":false,"explanation":""},{"id":"d","text":"`{Symbol(''a''): ''b''}` and `[]`","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-76–100QA-js-q-097';



UPDATE questions 
SET options = '[{"id":"a","text":"`[1, [2, 3, 4]]` and `SyntaxError`","isCorrect":true,"explanation":""},{"id":"b","text":"`[1, [2, 3, 4]]` and `{ name: \"Lydia\", age: 21 }`","isCorrect":false,"explanation":""},{"id":"c","text":"`[1, 2, 3, 4]` and `{ name: \"Lydia\", age: 21 }`","isCorrect":false,"explanation":""},{"id":"d","text":"`Error` and `{ name: \"Lydia\", age: 21 }`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-76–100QA-js-q-098';



UPDATE questions 
SET options = '[{"id":"a","text":"`SyntaxError`","isCorrect":false,"explanation":""},{"id":"b","text":"`ReferenceError`","isCorrect":false,"explanation":""},{"id":"c","text":"`TypeError`","isCorrect":true,"explanation":""},{"id":"d","text":"`undefined`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-76–100QA-js-q-099';



UPDATE questions 
SET options = '[{"id":"a","text":"`possible! You should see a therapist after so much JavaScript lol`","isCorrect":false,"explanation":""},{"id":"b","text":"`Impossible! You should see a therapist after so much JavaScript lol`","isCorrect":true,"explanation":""},{"id":"c","text":"`possible! You shouldn''t see a therapist after so much JavaScript lol`","isCorrect":false,"explanation":""},{"id":"d","text":"`Impossible! You shouldn''t see a therapist after so much JavaScript lol`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-76–100QA-js-q-100';



UPDATE questions 
SET options = '[{"id":"a","text":"`generateStaticParams`: App Router;

 `getStaticPaths`: Pages Router","isCorrect":true,"explanation":""},{"id":"b","text":"They are the same function","isCorrect":false,"explanation":""},{"id":"c","text":"`getStaticPaths` works in App Router","isCorrect":false,"explanation":""},{"id":"d","text":"`generateStaticParams` is for SSR","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'next-21-40-nextjs-q25';



UPDATE questions 
SET options = '[{"id":"a","text":"Client-side navigation in Client Components","isCorrect":true,"explanation":""},{"id":"b","text":"Data fetching in Server Components","isCorrect":false,"explanation":""},{"id":"c","text":"Server-side redirects","isCorrect":false,"explanation":""},{"id":"d","text":"Only works in Pages Router","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'next-21-40-nextjs-q29';



UPDATE questions 
SET options = '[{"id":"a","text":"Customize Webpack, Babel, env vars, and experimental features","isCorrect":true,"explanation":""},{"id":"b","text":"Required for every Next.js app","isCorrect":false,"explanation":""},{"id":"c","text":"Only for CSS configuration","isCorrect":false,"explanation":""},{"id":"d","text":"Replaces package.json","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'next-21-40-nextjs-q35';