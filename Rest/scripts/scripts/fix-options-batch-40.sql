

UPDATE questions 
SET options = '[{"id":"a","text":"`[]`","isCorrect":false,"explanation":""},{"id":"b","text":"`[null, null, null]`","isCorrect":false,"explanation":""},{"id":"c","text":"`[undefined, undefined, undefined]`","isCorrect":true,"explanation":""},{"id":"d","text":"`[ 3 x empty ]`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-26-50QA-js-q-050';



UPDATE questions 
SET options = '[{"id":"a","text":"`{ name: \"Lydia\" }, \"1997\"`","isCorrect":true,"explanation":""},{"id":"b","text":"`{ name: \"Sarah\" }, \"1998\"`","isCorrect":false,"explanation":""},{"id":"c","text":"`{ name: \"Lydia\" }, \"1998\"`","isCorrect":false,"explanation":""},{"id":"d","text":"`{ name: \"Sarah\" }, \"1997\"`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-51-75QA-js-q-051';



UPDATE questions 
SET options = '[{"id":"a","text":"`It worked! Hello world!`","isCorrect":false,"explanation":""},{"id":"b","text":"`Oh no an error: undefined`","isCorrect":false,"explanation":""},{"id":"c","text":"`SyntaxError: can only throw Error objects`","isCorrect":false,"explanation":""},{"id":"d","text":"`Oh no an error: Hello world!`","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-51-75QA-js-q-052';



UPDATE questions 
SET options = '[{"id":"a","text":"`\"Lamborghini\"`","isCorrect":false,"explanation":""},{"id":"b","text":"`\"Maserati\"`","isCorrect":true,"explanation":""},{"id":"c","text":"`ReferenceError`","isCorrect":false,"explanation":""},{"id":"d","text":"`TypeError`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-51-75QA-js-q-053';



UPDATE questions 
SET options = '[{"id":"a","text":"`\"undefined\", \"number\"`","isCorrect":true,"explanation":""},{"id":"b","text":"`\"number\", \"number\"`","isCorrect":false,"explanation":""},{"id":"c","text":"`\"object\", \"number\"`","isCorrect":false,"explanation":""},{"id":"d","text":"`\"number\", \"undefined\"`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-51-75QA-js-q-054';



UPDATE questions 
SET options = '[{"id":"a","text":"`\"Woof I am Mara\"`, `TypeError`","isCorrect":true,"explanation":""},{"id":"b","text":"`\"Woof I am Mara\"`, `\"Woof I am Mara\"`","isCorrect":false,"explanation":""},{"id":"c","text":"`\"Woof I am Mara\"`, `undefined`","isCorrect":false,"explanation":""},{"id":"d","text":"`TypeError`, `TypeError`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-51-75QA-js-q-055';



UPDATE questions 
SET options = '[{"id":"a","text":"`[1, 1, 2, 3, 4]`","isCorrect":false,"explanation":""},{"id":"b","text":"`[1, 2, 3, 4]`","isCorrect":false,"explanation":""},{"id":"c","text":"`{1, 1, 2, 3, 4}`","isCorrect":false,"explanation":""},{"id":"d","text":"`{1, 2, 3, 4}`","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-51-75QA-js-q-056';



UPDATE questions 
SET options = '[{"id":"a","text":"`10`","isCorrect":false,"explanation":""},{"id":"b","text":"`11`","isCorrect":false,"explanation":""},{"id":"c","text":"`Error`","isCorrect":true,"explanation":""},{"id":"d","text":"`NaN`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-51-75QA-js-q-057';



UPDATE questions 
SET options = '[{"id":"a","text":"`false`, `true`","isCorrect":true,"explanation":""},{"id":"b","text":"`\"Lydia\"`, `21`","isCorrect":false,"explanation":""},{"id":"c","text":"`true`, `true`","isCorrect":false,"explanation":""},{"id":"d","text":"`undefined`, `undefined`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-51-75QA-js-q-058';



UPDATE questions 
SET options = '[{"id":"a","text":"`[[1, 2, 3, 4, 5]]`","isCorrect":false,"explanation":""},{"id":"b","text":"`[1, 2, 3, 4, 5]`","isCorrect":false,"explanation":""},{"id":"c","text":"`1`","isCorrect":true,"explanation":""},{"id":"d","text":"`[1]`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-51-75QA-js-q-059';