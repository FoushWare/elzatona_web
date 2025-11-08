 RGBa does not","isCorrect":false,"explanation":""},{"id":"c","text":"HSLa uses CMYK values","isCorrect":false,"explanation":""},{"id":"d","text":"All formats are identical","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css-41-60-css-q44';



UPDATE questions 
SET options = '[{"id":"a","text":"Reset: removes all styles;

 Normalize: preserves useful defaults, fixes inconsistencies","isCorrect":true,"explanation":""},{"id":"b","text":"They are the same","isCorrect":false,"explanation":""},{"id":"c","text":"Normalize removes all margins","isCorrect":false,"explanation":""},{"id":"d","text":"Reset is obsolete","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css-41-60-css-q46';



UPDATE questions 
SET options = '[{"id":"a","text":"`clear: left` prevents left floats;

 `clear: right` prevents right floats;

 `clear: both` prevents both","isCorrect":true,"explanation":""},{"id":"b","text":"`clear` only works with `position: absolute`","isCorrect":false,"explanation":""},{"id":"c","text":"`clear` is deprecated","isCorrect":false,"explanation":""},{"id":"d","text":"`clear` affects inline elements","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css-41-60-css-q49';



UPDATE questions 
SET options = '[{"id":"a","text":"Inline > ID > Class > Element","isCorrect":true,"explanation":""},{"id":"b","text":"Element > Class > ID > Inline","isCorrect":false,"explanation":""},{"id":"c","text":"All selectors have equal weight","isCorrect":false,"explanation":""},{"id":"d","text":"`!important` has lowest priority","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css-81–100-css-q82';



UPDATE questions 
SET options = '[{"id":"a","text":"`blur()`, `brightness()`, `grayscale()`, `drop-shadow()`","isCorrect":true,"explanation":""},{"id":"b","text":"Only for SVG elements","isCorrect":false,"explanation":""},{"id":"c","text":"Filters require JavaScript","isCorrect":false,"explanation":""},{"id":"d","text":"Not supported in modern browsers","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css-81–100-css-q84';



UPDATE questions 
SET options = '[{"id":"a","text":"`font-family`, `font-size`, `font-weight`, `font-style`, `line-height`","isCorrect":true,"explanation":""},{"id":"b","text":"Only `font-size` and `color`","isCorrect":false,"explanation":""},{"id":"c","text":"`text-font` is the main property","isCorrect":false,"explanation":""},{"id":"d","text":"Fonts cannot be styled with CSS","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css-81–100-css-q85';



UPDATE questions 
SET options = '[{"id":"a","text":"`background-color`, `background-image`, `background-size`, `background-repeat`","isCorrect":true,"explanation":""},{"id":"b","text":"Only `background-color`","isCorrect":false,"explanation":""},{"id":"c","text":"`bg-color` is the standard property","isCorrect":false,"explanation":""},{"id":"d","text":"Backgrounds are handled only by HTML","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css-81–100-css-q86';