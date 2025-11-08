

UPDATE questions 
SET options = '[{"id":"a","text":"`First` `Second` `Third`","isCorrect":false,"explanation":""},{"id":"b","text":"`First` `Third` `Second`","isCorrect":true,"explanation":""},{"id":"c","text":"`Second` `First` `Third`","isCorrect":false,"explanation":""},{"id":"d","text":"`Second` `Third` `First`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-26-50QA-js-q-030';



UPDATE questions 
SET options = '[{"id":"a","text":"Outer `div`","isCorrect":false,"explanation":""},{"id":"b","text":"Inner `div`","isCorrect":false,"explanation":""},{"id":"c","text":"`button`","isCorrect":true,"explanation":""},{"id":"d","text":"An array of all nested elements.","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-26-50QA-js-q-031';



UPDATE questions 
SET options = '[{"id":"a","text":"`p` `div`","isCorrect":true,"explanation":""},{"id":"b","text":"`div` `p`","isCorrect":false,"explanation":""},{"id":"c","text":"`p`","isCorrect":false,"explanation":""},{"id":"d","text":"`div`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-26-50QA-js-q-032';



UPDATE questions 
SET options = '[{"id":"a","text":"`undefined is 21` `Lydia is 21`","isCorrect":false,"explanation":""},{"id":"b","text":"`function` `function`","isCorrect":false,"explanation":""},{"id":"c","text":"`Lydia is 21` `Lydia is 21`","isCorrect":false,"explanation":""},{"id":"d","text":"`Lydia is 21` `function`","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-26-50QA-js-q-033';



UPDATE questions 
SET options = '[{"id":"a","text":"`\"object\"`","isCorrect":false,"explanation":""},{"id":"b","text":"`\"number\"`","isCorrect":true,"explanation":""},{"id":"c","text":"`\"function\"`","isCorrect":false,"explanation":""},{"id":"d","text":"`\"undefined\"`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-26-50QA-js-q-034';



UPDATE questions 
SET options = '[{"id":"a","text":"`0`, `''''`, `undefined`","isCorrect":true,"explanation":""},{"id":"b","text":"`0`, `new Number(0)`, `''''`, `new Boolean(false)`, `undefined`","isCorrect":false,"explanation":""},{"id":"c","text":"`0`, `''''`, `new Boolean(false)`, `undefined`","isCorrect":false,"explanation":""},{"id":"d","text":"All of them are falsy","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-26-50QA-js-q-035';



UPDATE questions 
SET options = '[{"id":"a","text":"`\"number\"`","isCorrect":false,"explanation":""},{"id":"b","text":"`\"string\"`","isCorrect":true,"explanation":""},{"id":"c","text":"`\"object\"`","isCorrect":false,"explanation":""},{"id":"d","text":"`\"undefined\"`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-26-50QA-js-q-036';



UPDATE questions 
SET options = '[{"id":"a","text":"`[1, 2, 3, null x 7, 11]`","isCorrect":false,"explanation":""},{"id":"b","text":"`[1, 2, 3, 11]`","isCorrect":false,"explanation":""},{"id":"c","text":"`[1, 2, 3, empty x 7, 11]`","isCorrect":true,"explanation":""},{"id":"d","text":"`SyntaxError`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-26-50QA-js-q-037';



UPDATE questions 
SET options = '[{"id":"a","text":"`1` `undefined` `2`","isCorrect":true,"explanation":""},{"id":"b","text":"`undefined` `undefined` `undefined`","isCorrect":false,"explanation":""},{"id":"c","text":"`1` `1` `2`","isCorrect":false,"explanation":""},{"id":"d","text":"`1` `undefined` `undefined`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-26-50QA-js-q-038';



UPDATE questions 
SET options = '[{"id":"a","text":"primitive or object","isCorrect":true,"explanation":""},{"id":"b","text":"function or object","isCorrect":false,"explanation":""},{"id":"c","text":"trick question! only objects","isCorrect":false,"explanation":""},{"id":"d","text":"number or object","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-26-50QA-js-q-039';