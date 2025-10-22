

UPDATE questions 
SET options = '[{"id":"a","text":"It enforces correct usage and can throw errors if used outside the provider","isCorrect":true,"explanation":""},{"id":"b","text":"It avoids the need to import useContext at all","isCorrect":false,"explanation":""},{"id":"c","text":"It improves runtime performance automatically","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-provider-pattern-68';



UPDATE questions 
SET options = '[{"0":"a","1":"p","2":"p","3":"l","4":"y","5":" ","6":"a","7":"n","8":"d","9":" ","10":"c","11":"o","12":"n","13":"s","14":"t","15":"r","16":"u","17":"c","18":"t","explanation":""},{"0":"g","1":"e","2":"t","3":" ","4":"a","5":"n","6":"d","7":" ","8":"s","9":"e","10":"t","explanation":""},{"0":"d","1":"e","2":"l","3":"e","4":"t","5":"e","6":"P","7":"r","8":"o","9":"p","10":"e","11":"r","12":"t","13":"y","14":" ","15":"a","16":"n","17":"d","18":" ","19":"d","20":"e","21":"f","22":"i","23":"n","24":"e","25":"P","26":"r","27":"o","28":"p","29":"e","30":"r","31":"t","32":"y","explanation":""},{"0":"o","1":"w","2":"n","3":"K","4":"e","5":"y","6":"s","7":" ","8":"a","9":"n","10":"d","11":" ","12":"h","13":"a","14":"s","explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-proxy-pattern-68';



UPDATE questions 
SET options = '[{"0":"T","1":"h","2":"r","3":"o","4":"w","5":" ","6":"a","7":"n","8":" ","9":"e","10":"r","11":"r","12":"o","13":"r","explanation":""},{"0":"R","1":"e","2":"t","3":"u","4":"r","5":"n","6":" ","7":"u","8":"n","9":"d","10":"e","11":"f","12":"i","13":"n","14":"e","15":"d","explanation":""},{"0":"L","1":"o","2":"g","3":" ","4":"a","5":" ","6":"c","7":"u","8":"s","9":"t","10":"o","11":"m","12":" ","13":"m","14":"e","15":"s","16":"s","17":"a","18":"g","19":"e","explanation":""},{"0":"A","1":"n","2":"y","3":" ","4":"o","5":"f","6":" ","7":"t","8":"h","9":"e","10":" ","11":"a","12":"b","13":"o","14":"v","15":"e","16":",","17":" ","18":"d","19":"e","20":"p","21":"e","22":"n","23":"d","24":"i","25":"n","26":"g","27":" ","28":"o","29":"n","30":" ","31":"t","32":"h","33":"e","34":" ","35":"h","36":"a","37":"n","38":"d","39":"l","40":"e","41":"r","42":" ","43":"l","44":"o","45":"g","46":"i","47":"c","explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-proxy-pattern-71';



UPDATE questions 
SET options = '[{"0":"V","1":"a","2":"l","3":"i","4":"d","5":"a","6":"t","7":"i","8":"o","9":"n","10":" ","11":"o","12":"f","13":" ","14":"o","15":"b","16":"j","17":"e","18":"c","19":"t","20":" ","21":"p","22":"r","23":"o","24":"p","25":"e","26":"r","27":"t","28":"i","29":"e","30":"s","explanation":""},{"0":"D","1":"e","2":"b","3":"u","4":"g","5":"g","6":"i","7":"n","8":"g","9":" ","10":"a","11":"n","12":"d","13":" ","14":"l","15":"o","16":"g","17":"g","18":"i","19":"n","20":"g","explanation":""},{"0":"F","1":"o","2":"r","3":"m","4":"a","5":"t","6":"t","7":"i","8":"n","9":"g","10":" ","11":"d","12":"a","13":"t","14":"a","15":" ","16":"b","17":"e","18":"f","19":"o","20":"r","21":"e","22":" ","23":"r","24":"e","25":"t","26":"u","27":"r","28":"n","explanation":""},{"0":"P","1":"e","2":"r","3":"f","4":"o","5":"r","6":"m","7":"a","8":"n","9":"c","10":"e","11":" ","12":"o","13":"p","14":"t","15":"i","16":"m","17":"i","18":"z","19":"a","20":"t","21":"i","22":"o","23":"n","24":" ","25":"i","26":"n","27":" ","28":"c","29":"r","30":"i","31":"t","32":"i","33":"c","34":"a","35":"l","36":" ","37":"c","38":"o","39":"d","40":"e","explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-proxy-pattern-74';



UPDATE questions 
SET options = '[{"id":"a","text":"Prevents modification of the Singleton’s properties","isCorrect":true,"explanation":""},{"id":"b","text":"Allows multiple instances to be created","isCorrect":false,"explanation":""},{"id":"c","text":"Automatically resets the Singleton","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-singleton-pattern-79';



UPDATE questions 
SET options = '[{"id":"a","text":"Both are accessible throughout the application","isCorrect":true,"explanation":""},{"id":"b","text":"Both prevent mutation of values","isCorrect":false,"explanation":""},{"id":"c","text":"Both are automatically garbage collected","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'design-patterns-singleton-pattern-83';



UPDATE questions 
SET options = '[{"id":"o1","text":"<header>, <main>, <footer>, <section>, <article>, <nav>","isCorrect":true,"explanation":""},{"id":"o2","text":"<div>, <span>, <p>, <b>, <i>","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'html-01-html5';



UPDATE questions 
SET options = '[{"id":"a","text":"`Lydia` and `undefined`","isCorrect":false,"explanation":"`name` is hoisted but not yet assigned, so it''s `undefined`, not `''Lydia''`."},{"id":"b","text":"`Lydia` and `ReferenceError`","isCorrect":false,"explanation":"`name` is `undefined`, not `''Lydia''`."},{"id":"c","text":"`ReferenceError` and `21`","isCorrect":false,"explanation":"`name` is accessible (as `undefined`), but `age` throws `ReferenceError` before assignment."},{"id":"d","text":"`undefined` and `ReferenceError`","isCorrect":true,"explanation":"Correct: `var` is hoisted and initialized to `undefined`;

 `let` is in TDZ and throws `ReferenceError`."}]'
WHERE metadata->>'original_id' = 'javascript-1-25QA-js-q-001';



UPDATE questions 
SET options = '[{"id":"a","text":"`0 1 2` and `0 1 2`","isCorrect":false,"explanation":""},{"id":"b","text":"`0 1 2` and `3 3 3`","isCorrect":false,"explanation":""},{"id":"c","text":"`3 3 3` and `0 1 2`","isCorrect":true,"explanation":""}]'
WHERE metadata->>'original_id' = 'javascript-1-25QA-js-q-002';