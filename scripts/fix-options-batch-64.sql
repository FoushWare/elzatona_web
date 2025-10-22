

UPDATE questions 
SET options = '[{"id":"o1","text":"Semantic HTML improves SEO","isCorrect":true,"explanation":""},{"id":"o2","text":"Semantic HTML is ignored by screen readers","isCorrect":false,"explanation":""},{"id":"o3","text":"Semantic HTML improves accessibility for keyboard and screen reader users","isCorrect":true,"explanation":""},{"id":"o4","text":"Semantic HTML automatically optimizes bundle size","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q30';



UPDATE questions 
SET options = '[{"id":"o1","text":"Client repeatedly sends requests at a fixed interval","isCorrect":false,"explanation":""},{"id":"o2","text":"Client sends a request, server responds only when new data is available, then client repeats","isCorrect":true,"explanation":""},{"id":"o3","text":"Client uses WebSocket connection for continuous streaming","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q35';



UPDATE questions 
SET options = '[{"id":"o1","text":"SSE is unidirectional (server -> client)","isCorrect":true,"explanation":""},{"id":"o2","text":"WebSocket is bidirectional (client <-> server)","isCorrect":true,"explanation":""},{"id":"o3","text":"SSE requires a persistent TCP connection like WebSocket","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q37';



UPDATE questions 
SET options = '[{"id":"o1","text":"REST returns fixed data structures per endpoint","isCorrect":true,"explanation":""},{"id":"o2","text":"GraphQL allows client to request exactly the fields needed","isCorrect":true,"explanation":""},{"id":"o3","text":"GraphQL cannot support real-time updates","isCorrect":false,"explanation":""},{"id":"o4","text":"REST APIs can never be cached","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q39';



UPDATE questions 
SET options = '[{"id":"o1","text":"Offset-based: simple, can have duplicates","isCorrect":true,"explanation":""},{"id":"o2","text":"Cursor-based: more reliable for dynamic data","isCorrect":true,"explanation":""},{"id":"o3","text":"Infinite scroll: UX-friendly but can be tricky to manage state","isCorrect":true,"explanation":""},{"id":"o4","text":"All approaches are identical in performance","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q43';



UPDATE questions 
SET options = '[{"id":"o1","text":"Reflow recalculates layout and can trigger repaint","isCorrect":true,"explanation":""},{"id":"o2","text":"Repaint only redraws pixels without layout calculation","isCorrect":true,"explanation":""},{"id":"o3","text":"Reflow and repaint are the same","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q46';



UPDATE questions 
SET options = '[{"id":"o1","text":"Infinite scroll automatically loads more content as user scrolls","isCorrect":true,"explanation":""},{"id":"o2","text":"Pros: improves UX for browsing feeds, keeps engagement high","isCorrect":true,"explanation":""},{"id":"o3","text":"Cons: harder to track scroll position and can impact memory","isCorrect":true,"explanation":""},{"id":"o4","text":"Infinite scroll replaces the need for backend pagination","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q50';



UPDATE questions 
SET options = '[{"id":"o1","text":"Controlled components have state managed by React via props","isCorrect":true,"explanation":""},{"id":"o2","text":"Uncontrolled components manage state internally using refs","isCorrect":true,"explanation":""},{"id":"o3","text":"Controlled components are faster than uncontrolled in all cases","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q52';



UPDATE questions 
SET options = '[{"id":"o1","text":"Local state is component-specific","isCorrect":true,"explanation":""},{"id":"o2","text":"Global state is shared across multiple components","isCorrect":true,"explanation":""},{"id":"o3","text":"Server state comes from APIs and must be synchronized","isCorrect":true,"explanation":""},{"id":"o4","text":"All states are automatically synchronized with the server","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q54';



UPDATE questions 
SET options = '[{"id":"o1","text":"REST endpoints return fixed data structures","isCorrect":true,"explanation":""},{"id":"o2","text":"GraphQL allows querying only required fields","isCorrect":true,"explanation":""},{"id":"o3","text":"GraphQL eliminates the need for pagination","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q57';