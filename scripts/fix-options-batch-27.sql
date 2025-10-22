

UPDATE questions 
SET options = '[{"id":"a","text":"`content-box`: width = content only;

 `border-box`: width = content + padding + border","isCorrect":true,"explanation":""},{"id":"b","text":"`border-box` excludes padding","isCorrect":false,"explanation":""},{"id":"c","text":"`box-sizing` has no effect on layout","isCorrect":false,"explanation":""},{"id":"d","text":"Only `content-box` is valid","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css21–40-css-q27';



UPDATE questions 
SET options = '[{"id":"a","text":"`content-box`: width excludes padding/border;

 `border-box`: width includes them","isCorrect":true,"explanation":""},{"id":"b","text":"`border-box` is slower","isCorrect":false,"explanation":""},{"id":"c","text":"They are identical","isCorrect":false,"explanation":""},{"id":"d","text":"`content-box` includes margin","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css21–40-css-q28';



UPDATE questions 
SET options = '[{"id":"a","text":"`a[href^=''https'']`, `a[href$=''.pdf'']`, `a[href*=''css'']`","isCorrect":true,"explanation":""},{"id":"b","text":"Only class selectors can target links","isCorrect":false,"explanation":""},{"id":"c","text":"`a[href=''https'']` matches all HTTPS links","isCorrect":false,"explanation":""},{"id":"d","text":"Attribute selectors are deprecated","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css21–40-css-q30';



UPDATE questions 
SET options = '[{"id":"a","text":"`RGBa`: 0-255 channels;

 `HEX`: #RRGGBB;

 `HSLa`: hue/saturation/lightness","isCorrect":true,"explanation":""},{"id":"b","text":"HEX supports alpha;

 RGBa does not","isCorrect":false,"explanation":""},{"id":"c","text":"HSLa uses CMYK values","isCorrect":false,"explanation":""},{"id":"d","text":"All formats are identical","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css21–40-css-q32';



UPDATE questions 
SET options = '[{"id":"a","text":"Reset: removes all styles;