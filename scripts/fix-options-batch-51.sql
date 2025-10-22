

UPDATE questions 
SET options = '[{"id":"o1","text":"Push","isCorrect":false,"explanation":""},{"id":"o2","text":"Render","isCorrect":false,"explanation":""},{"id":"o3","text":"Pre-cache","isCorrect":true,"explanation":""},{"id":"o4","text":"Lazy-load","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'performance-patterns-prpl-pp6';



UPDATE questions 
SET options = '[{"id":"o1","text":"Improved caching performance","isCorrect":false,"explanation":""},{"id":"o2","text":"Wasted bandwidth and filled browser cache","isCorrect":true,"explanation":""},{"id":"o3","text":"Better offline support","isCorrect":false,"explanation":""},{"id":"o4","text":"Reduced initial load time","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'performance-patterns-prpl-pp7';



UPDATE questions 
SET options = '[{"id":"o1","text":"Provides a minimal structure that loads instantly and handles routing","isCorrect":true,"explanation":""},{"id":"o2","text":"Delays rendering until all assets are fetched","isCorrect":false,"explanation":""},{"id":"o3","text":"Caches server responses in memory only","isCorrect":false,"explanation":""},{"id":"o4","text":"Forces the app to reload on each navigation","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'performance-patterns-prpl-pp9';



UPDATE questions 
SET options = '[{"id":"o1","text":"Render initial route quickly","isCorrect":true,"explanation":""},{"id":"o2","text":"Pre-cache assets in background","isCorrect":false,"explanation":""},{"id":"o3","text":"Lazy-load unused modules","isCorrect":false,"explanation":""},{"id":"o4","text":"Push critical resources after render","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'performance-patterns-prpl-pp12';



UPDATE questions 
SET options = '[{"id":"o1","text":"Push","isCorrect":true,"explanation":""},{"id":"o2","text":"Render","isCorrect":false,"explanation":""},{"id":"o3","text":"Pre-cache","isCorrect":false,"explanation":""},{"id":"o4","text":"Lazy-load","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'performance-patterns-prpl-pp14';



UPDATE questions 
SET options = '[{"id":"o1","text":"Additional round trips to other domains","isCorrect":true,"explanation":""},{"id":"o2","text":"Bulky or unoptimized JavaScript","isCorrect":true,"explanation":""},{"id":"o3","text":"Blocking rendering of critical resources","isCorrect":true,"explanation":""},{"id":"o4","text":"Always reduces DNS lookup times","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'performance-patterns-third-party-tp2';



UPDATE questions 
SET options = '[{"id":"o1","text":"beforeInteractive","isCorrect":true,"explanation":""},{"id":"o2","text":"afterInteractive","isCorrect":true,"explanation":""},{"id":"o3","text":"lazyOnload","isCorrect":true,"explanation":""},{"id":"o4","text":"documentWrite","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'performance-patterns-third-party-tp7';



UPDATE questions 
SET options = '[{"id":"o1","text":"read()","isCorrect":true,"explanation":""},{"id":"o2","text":"nap()","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'performance-patterns-tree-shaking-ts4';



UPDATE questions 
SET options = '[{"id":"o1","text":"FixedSizeList and VariableSizeList for lists;

 FixedSizeGrid and VariableSizeGrid for grids","isCorrect":true,"explanation":""},{"id":"o2","text":"InfiniteScrollList and TableGrid","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'performance-patterns-virtualization-lv5';