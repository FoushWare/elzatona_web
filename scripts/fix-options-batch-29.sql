

UPDATE questions 
SET options = '[{"id":"a","text":"Reduced memory usage by reusing objects","isCorrect":true,"explanation":""},{"id":"b","text":"Improved performance for large-scale applications","isCorrect":true,"explanation":""},{"id":"c","text":"Simplifies debugging","isCorrect":false,"explanation":""},{"id":"d","text":"Reduces network latency","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-flyweight-pattern-19';



UPDATE questions 
SET options = '[{"id":"a","text":"When creating thousands of objects that share common properties","isCorrect":true,"explanation":""},{"id":"b","text":"When creating a single instance of a service","isCorrect":false,"explanation":""},{"id":"c","text":"When caching API responses","isCorrect":false,"explanation":""},{"id":"d","text":"When setting up event delegation in DOM","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-flyweight-pattern-23';



UPDATE questions 
SET options = '[{"id":"a","text":"A librarian managing which books readers can borrow","isCorrect":false,"explanation":""},{"id":"b","text":"An air traffic controller guiding planes so they don’t talk to each other directly","isCorrect":true,"explanation":""},{"id":"c","text":"A teacher grading exams","isCorrect":false,"explanation":""},{"id":"d","text":"A vending machine dispensing products","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-mediator-pattern-26';



UPDATE questions 
SET options = '[{"id":"a","text":"Reduces coupling between components","isCorrect":true,"explanation":""},{"id":"b","text":"Simplifies many-to-many relationships","isCorrect":true,"explanation":""},{"id":"c","text":"Always improves performance","isCorrect":false,"explanation":""},{"id":"d","text":"Provides a single point of communication","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-mediator-pattern-29';



UPDATE questions 
SET options = '[{"id":"a","text":"Request has test header: false","isCorrect":false,"explanation":""},{"id":"b","text":"Request has test header: true","isCorrect":true,"explanation":""},{"id":"c","text":"Request has test header: undefined","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-mediator-pattern-32';



UPDATE questions 
SET options = '[{"id":"a","text":"undefined","isCorrect":false,"explanation":""},{"id":"b","text":"Woof!","isCorrect":true,"explanation":""},{"id":"c","text":"Error: bark is not a function","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-mixin-pattern-34';



UPDATE questions 
SET options = '[{"id":"a","text":"setTimeout and setInterval (from WindowOrWorkerGlobalScope)","isCorrect":true,"explanation":""},{"id":"b","text":"onbeforeunload (from WindowEventHandlers)","isCorrect":true,"explanation":""},{"id":"c","text":"document.querySelector","isCorrect":false,"explanation":""},{"id":"d","text":"console.log","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-mixin-pattern-37';



UPDATE questions 
SET options = '[{"id":"a","text":"Both methods are preserved","isCorrect":false,"explanation":""},{"id":"b","text":"The last assigned method overwrites the previous one","isCorrect":true,"explanation":""},{"id":"c","text":"JavaScript throws an error","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-mixin-pattern-40';



UPDATE questions 
SET options = '[{"id":"a","text":"function Module() { var x = 10;

 return x;