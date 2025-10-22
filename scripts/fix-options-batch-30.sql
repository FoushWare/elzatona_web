 }","isCorrect":false,"explanation":""},{"id":"b","text":"var Module = (function(){ var privateVar = 10;

 return { get: function(){ return privateVar;

 } };

 })();

","isCorrect":true,"explanation":""},{"id":"c","text":"let Module = class { constructor(){ this.x = 10;

 } }","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-module-pattern-42';



UPDATE questions 
SET options = '[{"id":"a","text":"It makes code modular and organized","isCorrect":false,"explanation":""},{"id":"b","text":"Private members cannot be accessed or modified without changing the original module","isCorrect":true,"explanation":""},{"id":"c","text":"It always requires classes","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-module-pattern-44';



UPDATE questions 
SET options = '[{"id":"a","text":"The method is still accessible globally","isCorrect":false,"explanation":""},{"id":"b","text":"The method remains private and cannot be accessed outside","isCorrect":true,"explanation":""},{"id":"c","text":"JavaScript throws a syntax error","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-module-pattern-46';



UPDATE questions 
SET options = '[{"id":"a","text":"When you want to encapsulate private state in legacy JavaScript without ES6 support","isCorrect":true,"explanation":""},{"id":"b","text":"When you need dynamic imports and tree-shaking","isCorrect":false,"explanation":""},{"id":"c","text":"When you only work with classes","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-module-pattern-48';



UPDATE questions 
SET options = '[{"id":"a","text":"Publisher, renderer, transformer","isCorrect":false,"explanation":""},{"id":"b","text":"Observers, subscribe/unsubscribe, notify","isCorrect":true,"explanation":""},{"id":"c","text":"State, reducer, dispatcher","isCorrect":false,"explanation":""},{"id":"d","text":"Model, view, controller","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-observer-pattern-50';