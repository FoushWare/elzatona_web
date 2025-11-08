

UPDATE questions 
SET options = '[{"id":"a","text":"`text-align`","isCorrect":true,"explanation":""},{"id":"b","text":"`align-text`","isCorrect":false,"explanation":""},{"id":"c","text":"`horizontal-align`","isCorrect":false,"explanation":""},{"id":"d","text":"`justify`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css-16-80-css-q77';



UPDATE questions 
SET options = '[{"id":"a","text":"`text-decoration`","isCorrect":true,"explanation":""},{"id":"b","text":"`font-decoration`","isCorrect":false,"explanation":""},{"id":"c","text":"`text-style`","isCorrect":false,"explanation":""},{"id":"d","text":"`underline`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css-16-80-css-q78';



UPDATE questions 
SET options = '[{"id":"a","text":"`text-transform`","isCorrect":true,"explanation":""},{"id":"b","text":"`font-case`","isCorrect":false,"explanation":""},{"id":"c","text":"`text-case`","isCorrect":false,"explanation":""},{"id":"d","text":"`transform-text`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css-16-80-css-q79';



UPDATE questions 
SET options = '[{"id":"a","text":"`list-style-type`","isCorrect":true,"explanation":""},{"id":"b","text":"`marker-type`","isCorrect":false,"explanation":""},{"id":"c","text":"`list-marker`","isCorrect":false,"explanation":""},{"id":"d","text":"`bullet-style`","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css-16-80-css-q80';



UPDATE questions 
SET options = '[{"id":"a","text":"Absolute: px, pt, cm;

 Relative: em, rem, %, vw, vh","isCorrect":true,"explanation":""},{"id":"b","text":"Only pixels are valid","isCorrect":false,"explanation":""},{"id":"c","text":"`em` is absolute;

 `px` is relative","isCorrect":false,"explanation":""},{"id":"d","text":"All units behave the same across devices","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css-41-60-css-q42';



UPDATE questions 
SET options = '[{"id":"a","text":"`RGBa`: 0-255 channels;

 `HEX`: #RRGGBB;

 `HSLa`: hue/saturation/lightness","isCorrect":true,"explanation":""},{"id":"b","text":"HEX supports alpha;