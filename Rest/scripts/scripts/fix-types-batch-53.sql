

UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Resumability skips full rehydration by resuming the app state directly from serialized data","isCorrect":true},{"id":"b","text":"Resumability re-renders everything on the server","isCorrect":false},{"id":"c","text":"They are the same process with different names","isCorrect":false}]' WHERE metadata->>'original_id' = 'rendering-patterns-render6-7';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'rendering-patterns-render6-8';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Users see parts of the UI sooner while server components load progressively","isCorrect":true},{"id":"b","text":"It delays rendering until all components are ready","isCorrect":false},{"id":"c","text":"It removes the need for client components entirely","isCorrect":false}]' WHERE metadata->>'original_id' = 'rendering-patterns-render6-9';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'rendering-patterns-render6-10';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'rendering-patterns-render7-1';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Partial Hydration only hydrates selected components, Progressive Hydration hydrates sequentially over time","isCorrect":true},{"id":"b","text":"They are identical processes","isCorrect":false},{"id":"c","text":"Partial Hydration works only on client-side rendering","isCorrect":false}]' WHERE metadata->>'original_id' = 'rendering-patterns-render7-2';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'rendering-patterns-render7-3';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"On pages with many navigation routes where user intent can be predicted","isCorrect":true},{"id":"b","text":"On static single-page apps with no dynamic routing","isCorrect":false},{"id":"c","text":"When caching is disabled entirely","isCorrect":false}]' WHERE metadata->>'original_id' = 'rendering-patterns-render7-4';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'rendering-patterns-render7-5';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"It allows components to wait for data before rendering while showing fallback UI","isCorrect":true},{"id":"b","text":"It blocks all rendering until the entire app loads","isCorrect":false},{"id":"c","text":"It only works for routing, not data fetching","isCorrect":false}]' WHERE metadata->>'original_id' = 'rendering-patterns-render7-6';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'rendering-patterns-render7-7';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Concurrent rendering can pause and resume renders, synchronous rendering blocks until completion","isCorrect":true},{"id":"b","text":"Concurrent rendering executes faster JavaScript","isCorrect":false},{"id":"c","text":"Synchronous rendering can handle multiple threads","isCorrect":false}]' WHERE metadata->>'original_id' = 'rendering-patterns-render7-8';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'rendering-patterns-render7-9';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"They improve initial load but can serve outdated content until revalidated","isCorrect":true},{"id":"b","text":"They slow down page loads by increasing bundle size","isCorrect":false},{"id":"c","text":"They disable interactivity on the client","isCorrect":false}]' WHERE metadata->>'original_id' = 'rendering-patterns-render7-10';



UPDATE questions SET type = 'multiple-choice', options = '["To animate data fetching operations","To transition visual changes between DOM states smoothly","To handle form validation errors visually","To optimize network requests"]' WHERE metadata->>'original_id' = 'rendering-patterns-rendering10-1';



UPDATE questions SET type = 'multiple-choice', options = '["document.animateTransition()","window.beginViewChange()","document.startViewTransition()","window.transitionTo()"]' WHERE metadata->>'original_id' = 'rendering-patterns-rendering10-2';



UPDATE questions SET type = 'multiple-choice', options = '["Preloads all CSS animations","Takes a screenshot of the current DOM","Stores a snapshot of localStorage","Pauses all event listeners"]' WHERE metadata->>'original_id' = 'rendering-patterns-rendering10-3';



UPDATE questions SET type = 'multiple-choice', options = '["::before and ::after","::view-transition-old(root) and ::view-transition-new(root)","::transition-old and ::transition-new","::prev-state and ::next-state"]' WHERE metadata->>'original_id' = 'rendering-patterns-rendering10-4';



UPDATE questions SET type = 'multiple-choice', options = '["It defines a CSS keyframe","It assigns an animation ID for transitions","It uniquely identifies elements for smooth state transitions","It determines animation duration"]' WHERE metadata->>'original_id' = 'rendering-patterns-rendering10-5';



UPDATE questions SET type = 'multiple-choice', options = '["The DOM remains interactive","The DOM becomes non-interactive until the callback resolves","Only CSS changes are blocked","Event listeners are temporarily removed"]' WHERE metadata->>'original_id' = 'rendering-patterns-rendering10-6';