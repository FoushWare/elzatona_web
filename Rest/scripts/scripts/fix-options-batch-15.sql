

UPDATE questions 
SET options = '[{"id":"a","text":"PropTypes for small apps;

 TypeScript/Flow for large codebases","isCorrect":true},{"id":"b","text":"Only PropTypes should be used","isCorrect":false},{"id":"c","text":"TypeScript is not compatible with React","isCorrect":false},{"id":"d","text":"Static typing is unnecessary in React","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-039';



UPDATE questions 
SET options = '[{"id":"a","text":"It contains React’s core logic like useState and useEffect","isCorrect":false},{"id":"b","text":"It provides DOM-specific methods like render(), hydrate(), and createPortal()","isCorrect":true},{"id":"c","text":"It’s used for server-side logic only","isCorrect":false},{"id":"d","text":"It’s deprecated in React 18","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-040';



UPDATE questions 
SET options = '[{"id":"a","text":"A tool for client-side hydration only","isCorrect":false},{"id":"b","text":"An object with methods like renderToString() for server-side rendering","isCorrect":true},{"id":"c","text":"A replacement for react-dom in the browser","isCorrect":false},{"id":"d","text":"Used for testing components","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-041';



UPDATE questions 
SET options = '[{"id":"a","text":"Use `innerHTML` directly on JSX elements","isCorrect":false},{"id":"b","text":"Use `dangerouslySetInnerHTML={{ __html: string }}` with caution","isCorrect":true},{"id":"c","text":"It’s not possible to render HTML in React","isCorrect":false},{"id":"d","text":"Use `React.renderHTML()`","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-042';



UPDATE questions 
SET options = '[{"id":"a","text":"Use CSS strings like `style=\"color: blue\"`","isCorrect":false},{"id":"b","text":"Use camelCased JavaScript objects: `style={{ backgroundColor: ''blue'' }}`","isCorrect":true},{"id":"c","text":"Only external CSS files are allowed","isCorrect":false},{"id":"d","text":"Styles must be defined in a separate CSS module","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-043';



UPDATE questions 
SET options = '[{"id":"a","text":"Event names are lowercase and handlers are strings","isCorrect":false},{"id":"b","text":"Event names use camelCase and handlers are functions","isCorrect":true},{"id":"c","text":"Events are handled the same as in HTML","isCorrect":false},{"id":"d","text":"React doesn’t support events","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-044';



UPDATE questions 
SET options = '[{"id":"a","text":"It’s always safe and recommended","isCorrect":false},{"id":"b","text":"It can cause bugs with reordering or filtering;

 use stable IDs instead","isCorrect":true},{"id":"c","text":"Keys are optional and have no impact","isCorrect":false},{"id":"d","text":"Indexes improve performance","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-045';



UPDATE questions 
SET options = '[{"id":"a","text":"Use `if` statements directly in JSX","isCorrect":false},{"id":"b","text":"Use `&&` for truthy checks and ternary for if-else logic","isCorrect":true},{"id":"c","text":"Conditional rendering is not supported","isCorrect":false},{"id":"d","text":"Always use `switch` statements","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-046';