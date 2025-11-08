

UPDATE questions 
SET options = '["Before sending the data request","Immediately on link click","After the data request completes","After component unmount"]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering10-7';



UPDATE questions 
SET options = '["By using setTimeout inside the callback","By returning a Promise that resolves when the DOM update is complete","By pausing the animation manually","By re-rendering the DOM asynchronously"]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering10-8';



UPDATE questions 
SET options = '["componentDidMount()","componentWillUnmount()","shouldComponentUpdate()","getSnapshotBeforeUpdate()"]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering10-9';



UPDATE questions 
SET options = '["Starts a new transition","Forces a DOM re-render","Resolves the update promise for the transition","Triggers a fade-out animation"]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering10-10';



UPDATE questions 
SET options = '["It breaks routing","It prevents componentDidUpdate from firing","It causes components to render twice and disrupts transitions","It disables animation hooks"]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering10-11';



UPDATE questions 
SET options = '["It only supports inline styles","It can’t animate DOM elements","It needs new page HTML before animating","It blocks network requests"]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering10-12';



UPDATE questions 
SET options = '["It improves SEO performance","It reduces memory usage","It offers immediate visual feedback to the user","It prevents animation jank"]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering10-13';



UPDATE questions 
SET options = '["Turn","Turbo","Astro","Remix"]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering10-14';



UPDATE questions 
SET options = '["It performs server rendering","It adds routing capabilities","It animates page navigations via CSS classes","It caches HTML responses"]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering10-15';



UPDATE questions 
SET options = '["turbo:start and turbo:end","turbo:visit, turbo:before-render, turbo:render","turbo:click and turbo:load","animationstart and animationend"]'
WHERE metadata->>'original_id' = 'rendering-patterns-rendering10-16';