

UPDATE questions SET type = 'multiple-choice', options = '["Before sending the data request","Immediately on link click","After the data request completes","After component unmount"]' WHERE metadata->>'original_id' = 'rendering-patterns-rendering10-7';



UPDATE questions SET type = 'multiple-choice', options = '["By using setTimeout inside the callback","By returning a Promise that resolves when the DOM update is complete","By pausing the animation manually","By re-rendering the DOM asynchronously"]' WHERE metadata->>'original_id' = 'rendering-patterns-rendering10-8';



UPDATE questions SET type = 'multiple-choice', options = '["componentDidMount()","componentWillUnmount()","shouldComponentUpdate()","getSnapshotBeforeUpdate()"]' WHERE metadata->>'original_id' = 'rendering-patterns-rendering10-9';



UPDATE questions SET type = 'multiple-choice', options = '["Starts a new transition","Forces a DOM re-render","Resolves the update promise for the transition","Triggers a fade-out animation"]' WHERE metadata->>'original_id' = 'rendering-patterns-rendering10-10';



UPDATE questions SET type = 'multiple-choice', options = '["It breaks routing","It prevents componentDidUpdate from firing","It causes components to render twice and disrupts transitions","It disables animation hooks"]' WHERE metadata->>'original_id' = 'rendering-patterns-rendering10-11';



UPDATE questions SET type = 'multiple-choice', options = '["It only supports inline styles","It can’t animate DOM elements","It needs new page HTML before animating","It blocks network requests"]' WHERE metadata->>'original_id' = 'rendering-patterns-rendering10-12';



UPDATE questions SET type = 'multiple-choice', options = '["It improves SEO performance","It reduces memory usage","It offers immediate visual feedback to the user","It prevents animation jank"]' WHERE metadata->>'original_id' = 'rendering-patterns-rendering10-13';



UPDATE questions SET type = 'multiple-choice', options = '["Turn","Turbo","Astro","Remix"]' WHERE metadata->>'original_id' = 'rendering-patterns-rendering10-14';



UPDATE questions SET type = 'multiple-choice', options = '["It performs server rendering","It adds routing capabilities","It animates page navigations via CSS classes","It caches HTML responses"]' WHERE metadata->>'original_id' = 'rendering-patterns-rendering10-15';



UPDATE questions SET type = 'multiple-choice', options = '["turbo:start and turbo:end","turbo:visit, turbo:before-render, turbo:render","turbo:click and turbo:load","animationstart and animationend"]' WHERE metadata->>'original_id' = 'rendering-patterns-rendering10-16';



UPDATE questions SET type = 'multiple-choice', options = '["It disables animations completely","It enables experimental view transitions with fallback","It triggers full page reloads","It forces server-side rendering"]' WHERE metadata->>'original_id' = 'rendering-patterns-rendering10-17';



UPDATE questions SET type = 'multiple-choice', options = '["View transitions are faster in all cases","Exit animations support cross-page element morphing","View transitions handle shared elements but may delay feedback","Exit animations require the new HTML before starting"]' WHERE metadata->>'original_id' = 'rendering-patterns-rendering10-18';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'rendering-patterns-rendering2-1';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Faster Time to First Byte (TTFB)","isCorrect":false},{"id":"b","text":"Higher server load and slower TTFB compared to static rendering","isCorrect":true},{"id":"c","text":"Improved client-side bundle size","isCorrect":false}]' WHERE metadata->>'original_id' = 'rendering-patterns-rendering2-2';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"A marketing blog updated monthly","isCorrect":false},{"id":"b","text":"A dashboard showing real-time user data","isCorrect":true},{"id":"c","text":"A static documentation website","isCorrect":false}]' WHERE metadata->>'original_id' = 'rendering-patterns-rendering2-3';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'rendering-patterns-rendering2-4';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'rendering-patterns-rendering2-5';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"React Suspense for data fetching","isCorrect":true},{"id":"b","text":"React Context API","isCorrect":false},{"id":"c","text":"React.memo","isCorrect":false}]' WHERE metadata->>'original_id' = 'rendering-patterns-rendering2-6';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'rendering-patterns-rendering2-7';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Edge Rendering happens on globally distributed edge nodes rather than a central server","isCorrect":true},{"id":"b","text":"Edge Rendering always requires a CDN","isCorrect":false},{"id":"c","text":"Edge Rendering only works for static pages","isCorrect":false}]' WHERE metadata->>'original_id' = 'rendering-patterns-rendering2-8';