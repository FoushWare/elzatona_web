

UPDATE questions 
SET options = '[{"id":"a","text":"`\"🥑💻\"`","isCorrect":true,"explanation":""},{"id":"b","text":"`257548`","isCorrect":false,"explanation":""},{"id":"c","text":"A string containing their code points","isCorrect":false,"explanation":""},{"id":"d","text":"Error","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-51-75QA-js-q-070';



UPDATE questions 
SET options = '[{"id":"a","text":"`game.next(\"Yes\").value` and `game.next().value`","isCorrect":false,"explanation":""},{"id":"b","text":"`game.next.value(\"Yes\")` and `game.next.value()`","isCorrect":false,"explanation":""},{"id":"c","text":"`game.next().value` and `game.next(\"Yes\").value`","isCorrect":true,"explanation":""},{"id":"d","text":"`game.next.value()` and `game.next.value(\"Yes\")`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-51-75QA-js-q-071';



UPDATE questions 
SET options = '[{"id":"a","text":"`Hello world!`","isCorrect":false,"explanation":""},{"id":"b","text":"`Hello` <br />&nbsp;

 &nbsp;

 &nbsp;

`world`","isCorrect":false,"explanation":""},{"id":"c","text":"`Hello\nworld`","isCorrect":true,"explanation":""},{"id":"d","text":"`Hello\n` <br /> &nbsp;

 &nbsp;

 &nbsp;

`world`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-51-75QA-js-q-072';



UPDATE questions 
SET options = '[{"id":"a","text":"`\"I made it!\"`","isCorrect":false,"explanation":""},{"id":"b","text":"`Promise {<resolved>: \"I made it!\"}`","isCorrect":false,"explanation":""},{"id":"c","text":"`Promise {<pending>}`","isCorrect":true,"explanation":""},{"id":"d","text":"`undefined`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-51-75QA-js-q-073';