

UPDATE questions 
SET options = '[{"id":"a","text":"`static`, `relative`, `absolute`, `fixed`, `sticky`","isCorrect":true,"explanation":""},{"id":"b","text":"Only `absolute` and `relative`","isCorrect":false,"explanation":""},{"id":"c","text":"`position: float` is valid","isCorrect":false,"explanation":""},{"id":"d","text":"`sticky` is deprecated","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css-81–100-css-q91';



UPDATE questions 
SET options = '[{"id":"a","text":"`linear-gradient()`, `radial-gradient()`, `conic-gradient()`","isCorrect":true,"explanation":""},{"id":"b","text":"Only solid colors are allowed","isCorrect":false,"explanation":""},{"id":"c","text":"Gradients require SVG","isCorrect":false,"explanation":""},{"id":"d","text":"Not supported in modern browsers","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css-81–100-css-q93';



UPDATE questions 
SET options = '[{"id":"a","text":"`-webkit-` (Chrome/Safari), `-moz-` (Firefox), `-ms-` (IE/Edge), `-o-` (Opera)","isCorrect":true,"explanation":""},{"id":"b","text":"Vendor prefixes are no longer needed","isCorrect":false,"explanation":""},{"id":"c","text":"All browsers use the same prefix","isCorrect":false,"explanation":""},{"id":"d","text":"Prefixes are part of the official CSS spec","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css-81–100-css-q98';



UPDATE questions 
SET options = '[{"id":"a","text":"`relative`: offsets in flow;

 `absolute`: removed from flow, relative to positioned ancestor","isCorrect":true,"explanation":""},{"id":"b","text":"`absolute` is always relative to the body","isCorrect":false,"explanation":""},{"id":"c","text":"`relative` removes the element from layout","isCorrect":false,"explanation":""},{"id":"d","text":"They behave identically","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css21–40-css-q21';



UPDATE questions 
SET options = '[{"id":"a","text":"Absolute: px, pt, cm;

 Relative: em, rem, %, vw, vh","isCorrect":true,"explanation":""},{"id":"b","text":"Only pixels are valid","isCorrect":false,"explanation":""},{"id":"c","text":"`em` is absolute;

 `px` is relative","isCorrect":false,"explanation":""},{"id":"d","text":"All units behave the same across devices","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css21–40-css-q23';



UPDATE questions 
SET options = '[{"id":"a","text":"Pseudo-elements: virtual parts (e.g., ::before);

 Pseudo-classes: element states (e.g., :hover)","isCorrect":true,"explanation":""},{"id":"b","text":"They are the same","isCorrect":false,"explanation":""},{"id":"c","text":"Pseudo-classes insert content","isCorrect":false,"explanation":""},{"id":"d","text":"Pseudo-elements require JavaScript","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css21–40-css-q25';