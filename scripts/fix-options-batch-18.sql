

UPDATE questions 
SET options = '[{"id":"a","text":"Use `Object.assign()` only","isCorrect":false},{"id":"b","text":"Use spread operator `{...style1, ...style2}` in React web;

 array `[style1, style2]` in React Native","isCorrect":true},{"id":"c","text":"Inline styles cannot be combined","isCorrect":false},{"id":"d","text":"Use CSS classes instead","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-064';



UPDATE questions 
SET options = '[{"id":"a","text":"Use `window.onresize = () => {}` directly in render","isCorrect":false},{"id":"b","text":"Use `useEffect` to add/remove `resize` listener and update state","isCorrect":true},{"id":"c","text":"Resize events are handled automatically by React","isCorrect":false},{"id":"d","text":"Use `setInterval` to check window size","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-065';



UPDATE questions 
SET options = '[{"id":"a","text":"Use `console.log` inside JSX","isCorrect":false},{"id":"b","text":"Use `<pre>{JSON.stringify(data, null, 2)}</pre>` to preserve formatting","isCorrect":true},{"id":"c","text":"JSON cannot be displayed in React","isCorrect":false},{"id":"d","text":"Use `<code>` without `JSON.stringify`","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-066';



UPDATE questions 
SET options = '[{"id":"a","text":"Props are mutable and can be updated freely","isCorrect":false},{"id":"b","text":"Props are immutable to enforce unidirectional data flow and predictability","isCorrect":true},{"id":"c","text":"Only class components can update props","isCorrect":false},{"id":"d","text":"Props are updated automatically by React","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-067';



UPDATE questions 
SET options = '[{"id":"a","text":"Add `autoFocus` prop to the input","isCorrect":true},{"id":"b","text":"Use `useRef` and `useEffect` to manually focus the input","isCorrect":true},{"id":"c","text":"Both `autoFocus` and `useRef`/`useEffect` are valid approaches","isCorrect":true},{"id":"d","text":"It''s not possible to focus on page load","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-068';



UPDATE questions 
SET options = '[{"id":"a","text":"`React.version`","isCorrect":true},{"id":"b","text":"`ReactDOM.version`","isCorrect":false},{"id":"c","text":"`process.env.REACT_VERSION`","isCorrect":false},{"id":"d","text":"`package.json` version","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-069';



UPDATE questions 
SET options = '[{"id":"a","text":"Add GA script to every component","isCorrect":false},{"id":"b","text":"Use `history.listen()` to track location changes and send page views","isCorrect":true},{"id":"c","text":"GA is automatically integrated with React Router","isCorrect":false},{"id":"d","text":"Use `useEffect` in every route component","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-070';



UPDATE questions 
SET options = '[{"id":"a","text":"React auto-prefixes all styles","isCorrect":false},{"id":"b","text":"Manually add prefixes like `WebkitTransform` and `msTransform`","isCorrect":true},{"id":"c","text":"Use a CSS-in-JS library only","isCorrect":false},{"id":"d","text":"Prefixes are not needed in modern browsers","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-071';



UPDATE questions 
SET options = '[{"id":"a","text":"Only named exports are allowed","isCorrect":false},{"id":"b","text":"Use `export default` for components and `import Name from ''module''`","isCorrect":true},{"id":"c","text":"Components must be exported as constants","isCorrect":false},{"id":"d","text":"Use `require()` and `module.exports`","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-072';