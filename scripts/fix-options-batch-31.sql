

UPDATE questions 
SET options = '[{"id":"a","text":"handleClick and handleToggle","isCorrect":false,"explanation":""},{"id":"b","text":"logger and toastify","isCorrect":true,"explanation":""},{"id":"c","text":"Button and Switch components","isCorrect":false,"explanation":""},{"id":"d","text":"React lifecycle methods","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-observer-pattern-51';



UPDATE questions 
SET options = '[{"id":"a","text":"Notifying multiple UI components when new messages arrive","isCorrect":true,"explanation":""},{"id":"b","text":"Rendering static content with no user interaction","isCorrect":false,"explanation":""},{"id":"c","text":"Compiling JavaScript code to ES5","isCorrect":false,"explanation":""},{"id":"d","text":"Sorting a list of numbers","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-observer-pattern-53';



UPDATE questions 
SET options = '[{"id":"a","text":"Redux","isCorrect":false,"explanation":""},{"id":"b","text":"Axios","isCorrect":false,"explanation":""},{"id":"c","text":"RxJS","isCorrect":true,"explanation":""},{"id":"d","text":"Styled Components","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-observer-pattern-55';



UPDATE questions 
SET options = '[{"id":"a","text":"Observers cannot be removed once added","isCorrect":false,"explanation":""},{"id":"b","text":"Too many or complex observers can cause performance issues during notifications","isCorrect":true,"explanation":""},{"id":"c","text":"Observable cannot notify multiple observers at once","isCorrect":false,"explanation":""},{"id":"d","text":"It cannot work with asynchronous data","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-observer-pattern-56';



UPDATE questions 
SET options = '[{"id":"a","text":"On each Dog instance","isCorrect":false,"explanation":""},{"id":"b","text":"On Dog.prototype, shared by all instances","isCorrect":true,"explanation":""},{"id":"c","text":"Inside the Dog constructor","isCorrect":false,"explanation":""},{"id":"d","text":"In the global window object","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-prototype-pattern-58';



UPDATE questions 
SET options = '[{"id":"a","text":"Yes, because all instances reference the same prototype","isCorrect":true,"explanation":""},{"id":"b","text":"No, only future instances get it","isCorrect":false,"explanation":""},{"id":"c","text":"It depends on whether the object was frozen","isCorrect":false,"explanation":""},{"id":"d","text":"JavaScript throws an error","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-prototype-pattern-59';



UPDATE questions 
SET options = '[{"id":"a","text":"Through Object.assign copying methods","isCorrect":false,"explanation":""},{"id":"b","text":"By extending Dog, SuperDog.prototype.__proto__ points to Dog.prototype","isCorrect":true,"explanation":""},{"id":"c","text":"Each SuperDog has its own bark() copy","isCorrect":false,"explanation":""},{"id":"d","text":"By redefining bark in the constructor","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-prototype-pattern-61';



UPDATE questions 
SET options = '[{"id":"a","text":"Deep prototype chains can make debugging difficult and slow property lookups","isCorrect":true,"explanation":""},{"id":"b","text":"It prevents dynamic property addition","isCorrect":false,"explanation":""},{"id":"c","text":"It increases memory usage","isCorrect":false,"explanation":""},{"id":"d","text":"It makes objects immutable","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-prototype-pattern-64';



UPDATE questions 
SET options = '[{"id":"a","text":"Passing props through multiple components that don’t use them","isCorrect":true,"explanation":""},{"id":"b","text":"Drilling into the DOM with refs","isCorrect":false,"explanation":""},{"id":"c","text":"Creating deeply nested providers","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-provider-pattern-62';



UPDATE questions 
SET options = '[{"id":"a","text":"Nothing, React throws an error","isCorrect":false,"explanation":""},{"id":"b","text":"h1 with text ''Hello Provider''","isCorrect":true,"explanation":""},{"id":"c","text":"h1 with text ''undefined''","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-provider-pattern-64';