

UPDATE questions 
SET options = '[{"id":"o1","text":"localStorage persists data indefinitely across sessions","isCorrect":true,"explanation":""},{"id":"o2","text":"sessionStorage persists data only for the session","isCorrect":true,"explanation":""},{"id":"o3","text":"IndexedDB is useful for storing large structured data","isCorrect":true,"explanation":""},{"id":"o4","text":"localStorage automatically syncs with the server","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q60';



UPDATE questions 
SET options = '[{"id":"o1","text":"JWT is self-contained, includes claims, can be verified without server","isCorrect":true,"explanation":""},{"id":"o2","text":"Opaque tokens are random identifiers, require server to validate","isCorrect":true,"explanation":""},{"id":"o3","text":"JWT cannot be used in SPAs","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q76';



UPDATE questions 
SET options = '[{"id":"o1","text":"Authentication verifies user identity","isCorrect":true,"explanation":""},{"id":"o2","text":"Authorization determines access level or permissions","isCorrect":true,"explanation":""},{"id":"o3","text":"They are the same","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q79';



UPDATE questions 
SET options = '[{"id":"o1","text":"Missing alt text on images","isCorrect":true,"explanation":""},{"id":"o2","text":"Poor color contrast","isCorrect":true,"explanation":""},{"id":"o3","text":"Non-focusable interactive elements","isCorrect":true,"explanation":""},{"id":"o4","text":"Using semantic HTML","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q84';



UPDATE questions 
SET options = '[{"id":"o1","text":"i18n is the process of designing for multiple languages","isCorrect":true,"explanation":""},{"id":"o2","text":"l10n is the process of adapting content for a specific locale","isCorrect":true,"explanation":""},{"id":"o3","text":"i18n and l10n are the same","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q86';



UPDATE questions 
SET options = '[{"id":"o1","text":"Progressive enhancement starts with basic functionality and adds features for modern browsers","isCorrect":true,"explanation":""},{"id":"o2","text":"Graceful degradation starts with full features and reduces functionality for older browsers","isCorrect":true,"explanation":""},{"id":"o3","text":"They are exactly the same","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q89';



UPDATE questions 
SET options = '[{"id":"o1","text":"AppCache was limited and inflexible","isCorrect":true,"explanation":""},{"id":"o2","text":"Service Worker provides programmable caching and background sync","isCorrect":true,"explanation":""},{"id":"o3","text":"Both are actively supported","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q104';



UPDATE questions 
SET options = '[{"id":"o1","text":"Authentication verifies who the user is","isCorrect":true,"explanation":""},{"id":"o2","text":"Authorization decides what the user can access","isCorrect":true,"explanation":""},{"id":"o3","text":"They are the same thing","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q111';



UPDATE questions 
SET options = '[{"id":"o1","text":"Strict: cookie only sent for same-site requests","isCorrect":true,"explanation":""},{"id":"o2","text":"Lax: cookie sent for same-site and top-level navigations","isCorrect":true,"explanation":""},{"id":"o3","text":"None: cookie sent in all requests but must be Secure","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q118';



UPDATE questions 
SET options = '[{"id":"o1","text":"Synthetic monitoring simulates user interactions with scripts","isCorrect":true,"explanation":""},{"id":"o2","text":"RUM measures actual user interactions","isCorrect":true,"explanation":""},{"id":"o3","text":"Synthetic monitoring always gives more accurate results than RUM","isCorrect":false,"explanation":""},{"id":"o4","text":"RUM does not work for frontend applications","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'system-design-q133';