

UPDATE questions SET type = 'multiple-choice', options = '[{"id":"o1","text":"Removes unused CSS from the DOM","isCorrect":false,"explanation":""},{"id":"o2","text":"Removes unused JavaScript exports from bundles","isCorrect":true,"explanation":""},{"id":"o3","text":"Shakes DOM nodes to re-render faster","isCorrect":false,"explanation":""},{"id":"o4","text":"Optimizes images automatically","isCorrect":false,"explanation":""}]' WHERE metadata->>'original_id' = 'system-design-q25';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'system-design-q26';



UPDATE questions SET type = 'true-false' WHERE metadata->>'original_id' = 'system-design-q27';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"o1","text":"Prefetch is for resources needed immediately","isCorrect":false,"explanation":""},{"id":"o2","text":"Preload is for resources needed immediately","isCorrect":true,"explanation":""},{"id":"o3","text":"Prefetch is for resources likely needed in future","isCorrect":true,"explanation":""},{"id":"o4","text":"Preload defers resources until user interaction","isCorrect":false,"explanation":""}]' WHERE metadata->>'original_id' = 'system-design-q28';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'system-design-q29';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"o1","text":"Semantic HTML improves SEO","isCorrect":true,"explanation":""},{"id":"o2","text":"Semantic HTML is ignored by screen readers","isCorrect":false,"explanation":""},{"id":"o3","text":"Semantic HTML improves accessibility for keyboard and screen reader users","isCorrect":true,"explanation":""},{"id":"o4","text":"Semantic HTML automatically optimizes bundle size","isCorrect":false,"explanation":""}]' WHERE metadata->>'original_id' = 'system-design-q30';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'system-design-q31';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'system-design-q32';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'system-design-q33';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'system-design-q34';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"o1","text":"Client repeatedly sends requests at a fixed interval","isCorrect":false,"explanation":""},{"id":"o2","text":"Client sends a request, server responds only when new data is available, then client repeats","isCorrect":true,"explanation":""},{"id":"o3","text":"Client uses WebSocket connection for continuous streaming","isCorrect":false,"explanation":""}]' WHERE metadata->>'original_id' = 'system-design-q35';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'system-design-q36';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"o1","text":"SSE is unidirectional (server -> client)","isCorrect":true,"explanation":""},{"id":"o2","text":"WebSocket is bidirectional (client <-> server)","isCorrect":true,"explanation":""},{"id":"o3","text":"SSE requires a persistent TCP connection like WebSocket","isCorrect":false,"explanation":""}]' WHERE metadata->>'original_id' = 'system-design-q37';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'system-design-q38';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"o1","text":"REST returns fixed data structures per endpoint","isCorrect":true,"explanation":""},{"id":"o2","text":"GraphQL allows client to request exactly the fields needed","isCorrect":true,"explanation":""},{"id":"o3","text":"GraphQL cannot support real-time updates","isCorrect":false,"explanation":""},{"id":"o4","text":"REST APIs can never be cached","isCorrect":false,"explanation":""}]' WHERE metadata->>'original_id' = 'system-design-q39';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'system-design-q40';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'system-design-q41';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'system-design-q42';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"o1","text":"Offset-based: simple, can have duplicates","isCorrect":true,"explanation":""},{"id":"o2","text":"Cursor-based: more reliable for dynamic data","isCorrect":true,"explanation":""},{"id":"o3","text":"Infinite scroll: UX-friendly but can be tricky to manage state","isCorrect":true,"explanation":""},{"id":"o4","text":"All approaches are identical in performance","isCorrect":false,"explanation":""}]' WHERE metadata->>'original_id' = 'system-design-q43';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'system-design-q44';