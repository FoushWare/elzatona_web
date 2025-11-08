

UPDATE questions 
SET options = '[{"id":"a","text":"Descendant ( ), child (>), adjacent (+), general sibling (~)","isCorrect":true,"explanation":""},{"id":"b","text":"Only child and descendant","isCorrect":false,"explanation":""},{"id":"c","text":"Combinators are deprecated","isCorrect":false,"explanation":""},{"id":"d","text":"Adjacent sibling selects all following siblings","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css-1-css-q9';



UPDATE questions 
SET options = '[{"id":"a","text":"Class is for one element;

 ID is for many","isCorrect":false,"explanation":""},{"id":"b","text":"Class can be reused;

 ID should be unique","isCorrect":true,"explanation":""},{"id":"c","text":"They are functionally identical","isCorrect":false,"explanation":""},{"id":"d","text":"ID selectors are faster in all browsers","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css-1-css-q10';



UPDATE questions 
SET options = '[{"id":"a","text":"Flexbox: 1D, content-first;

 Grid: 2D, layout-first","isCorrect":true,"explanation":""},{"id":"b","text":"Grid is only for mobile","isCorrect":false,"explanation":""},{"id":"c","text":"Flexbox replaces Grid","isCorrect":false,"explanation":""},{"id":"d","text":"They are identical","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css-1-css-q14';



UPDATE questions 
SET options = '[{"id":"a","text":"`visibility: hidden` preserves space;

 `display: none` removes from flow","isCorrect":true,"explanation":""},{"id":"b","text":"They are identical","isCorrect":false,"explanation":""},{"id":"c","text":"`display: none` preserves space","isCorrect":false,"explanation":""},{"id":"d","text":"`visibility: hidden` triggers reflow","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css-1-css-q18';



UPDATE questions 
SET options = '[{"id":"a","text":"static, relative, absolute, fixed, sticky","isCorrect":true,"explanation":""},{"id":"b","text":"Only absolute and relative","isCorrect":false,"explanation":""},{"id":"c","text":"`fixed` is relative to parent","isCorrect":false,"explanation":""},{"id":"d","text":"`sticky` doesn’t require a threshold","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css-1-css-q20';



UPDATE questions 
SET options = '[{"id":"a","text":"`block`, `inline`, `inline-block`, `flex`, `grid`, `none`, `table`","isCorrect":true,"explanation":""},{"id":"b","text":"Only `block` and `inline`","isCorrect":false,"explanation":""},{"id":"c","text":"`display` has no effect on layout","isCorrect":false,"explanation":""},{"id":"d","text":"`display: hidden` is valid","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css-16-80-css-q61';