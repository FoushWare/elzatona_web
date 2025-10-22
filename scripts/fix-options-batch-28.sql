 Normalize: preserves useful defaults, fixes inconsistencies","isCorrect":true,"explanation":""},{"id":"b","text":"They are the same","isCorrect":false,"explanation":""},{"id":"c","text":"Normalize removes all margins","isCorrect":false,"explanation":""},{"id":"d","text":"Reset is obsolete","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css21–40-css-q34';



UPDATE questions 
SET options = '[{"id":"a","text":"`clear: left` prevents left floats;

 `clear: right` prevents right floats;

 `clear: both` prevents both","isCorrect":true,"explanation":""},{"id":"b","text":"`clear` only works with `position: absolute`","isCorrect":false,"explanation":""},{"id":"c","text":"`clear` is deprecated","isCorrect":false,"explanation":""},{"id":"d","text":"`clear` affects inline elements","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css21–40-css-q37';



UPDATE questions 
SET options = '[{"id":"a","text":"Alice","isCorrect":false,"explanation":""},{"id":"b","text":"Brown","isCorrect":false,"explanation":""},{"id":"c","text":"Alice Brown","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-common-pattern-2';



UPDATE questions 
SET options = '[{"id":"a","text":"Simple and easy to understand","isCorrect":true,"explanation":""},{"id":"b","text":"Minimal boilerplate code","isCorrect":true,"explanation":""},{"id":"c","text":"Great for small projects","isCorrect":true,"explanation":""},{"id":"d","text":"Highly scalable for large apps","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-common-pattern-3';



UPDATE questions 
SET options = '[{"id":"a","text":"undefined undefined","isCorrect":false,"explanation":""},{"id":"b","text":"John Doe","isCorrect":true,"explanation":""},{"id":"c","text":"[object Object]","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-factory-pattern-10';



UPDATE questions 
SET options = '[{"id":"a","text":"Encapsulation of object creation","isCorrect":true,"explanation":""},{"id":"b","text":"Easier to configure objects dynamically","isCorrect":true,"explanation":""},{"id":"c","text":"No need to repeat object structure","isCorrect":true,"explanation":""},{"id":"d","text":"Faster performance than constructors","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-factory-pattern-11';



UPDATE questions 
SET options = '[{"id":"a","text":"{ key: \"name\", value: \"Alice\" }","isCorrect":false,"explanation":""},{"id":"b","text":"{ name: \"Alice\" }","isCorrect":true,"explanation":""},{"id":"c","text":"undefined","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-factory-pattern-16';



UPDATE questions 
SET options = '[{"id":"a","text":"Total amount of copies: 5, Total amount of books: 5","isCorrect":false,"explanation":""},{"id":"b","text":"Total amount of copies: 3, Total amount of books: 5","isCorrect":false,"explanation":""},{"id":"c","text":"Total amount of copies: 5, Total amount of books: 3","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-flyweight-pattern-18';