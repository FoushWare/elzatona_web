

UPDATE questions 
SET options = '[{"id":"a","text":"State management and routing","isCorrect":false},{"id":"b","text":"Number/date formatting, plurals, relative time, 150+ languages","isCorrect":true},{"id":"c","text":"Only string translation","isCorrect":false},{"id":"d","text":"CSS-in-JS theming","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-091';



UPDATE questions 
SET options = '[{"id":"a","text":"Only components are supported","isCorrect":false},{"id":"b","text":"Components (`<FormattedMessage>`) and API (`formatMessage`)","isCorrect":true},{"id":"c","text":"Only the API is supported","isCorrect":false},{"id":"d","text":"Use `Intl` global object only","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-092';



UPDATE questions 
SET options = '[{"id":"a","text":"Use `<FormattedMessage>` directly in placeholder","isCorrect":false},{"id":"b","text":"Use `intl.formatMessage()` for placeholders and alt text","isCorrect":true},{"id":"c","text":"Placeholders don’t support i18n","isCorrect":false},{"id":"d","text":"Use `dangerouslySetInnerHTML`","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-093';



UPDATE questions 
SET options = '[{"id":"a","text":"`navigator.language`","isCorrect":false},{"id":"b","text":"`intl.locale` from `injectIntl` or `useIntl`","isCorrect":true},{"id":"c","text":"`process.env.LOCALE`","isCorrect":false},{"id":"d","text":"Locale is not accessible","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-094';



UPDATE questions 
SET options = '[{"id":"a","text":"Jest requires more configuration than Jasmine","isCorrect":false},{"id":"b","text":"Jest has no mocking support","isCorrect":false},{"id":"c","text":"Jest auto-discovers tests, mocks dependencies, supports async, uses jsdom, and runs tests in parallel","isCorrect":true},{"id":"d","text":"Jasmine runs tests faster than Jest","isCorrect":false}]'
WHERE metadata->>'original_id' = 'q100';



UPDATE questions 
SET options = '[{"id":"a","text":"Inline, internal, and external","isCorrect":true,"explanation":""},{"id":"b","text":"Only external","isCorrect":false,"explanation":""},{"id":"c","text":"Only inline","isCorrect":false,"explanation":""},{"id":"d","text":"CSS cannot be applied to HTML","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css-1-css-q3';



UPDATE questions 
SET options = '[{"id":"a","text":"border-radius, box-shadow, gradients, RGBA, new selectors","isCorrect":true,"explanation":""},{"id":"b","text":"Only new color formats","isCorrect":false,"explanation":""},{"id":"c","text":"CSS3 removed all vendor prefixes","isCorrect":false,"explanation":""},{"id":"d","text":"CSS3 is not supported in modern browsers","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css-1-css-q5';



UPDATE questions 
SET options = '[{"id":"a","text":"Universal, element, class, ID, attribute, pseudo-classes, pseudo-elements, combinators","isCorrect":true,"explanation":""},{"id":"b","text":"Only class and ID","isCorrect":false,"explanation":""},{"id":"c","text":"Selectors are optional in CSS","isCorrect":false,"explanation":""},{"id":"d","text":"Pseudo-elements are the same as pseudo-classes","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css-1-css-q6';



UPDATE questions 
SET options = '[{"id":"a","text":"Pseudo-classes: element states;

 Pseudo-elements: virtual parts of elements","isCorrect":true,"explanation":""},{"id":"b","text":"They are identical","isCorrect":false,"explanation":""},{"id":"c","text":"Pseudo-elements can’t insert content","isCorrect":false,"explanation":""},{"id":"d","text":"Pseudo-classes require double colons","isCorrect":false,"explanation":""}]'
WHERE metadata->>'original_id' = 'css-1-css-q8';