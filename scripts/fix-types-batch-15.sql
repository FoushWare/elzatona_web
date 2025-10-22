

UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Special components that render nothing","isCorrect":false},{"id":"b","text":"A way to group multiple elements without adding extra DOM nodes","isCorrect":true},{"id":"c","text":"Components that only render on mobile","isCorrect":false},{"id":"d","text":"A type of React error boundary","isCorrect":false}]' WHERE metadata->>'original_id' = 'react-q-031';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"They are slower but easier to debug","isCorrect":false},{"id":"b","text":"They prevent CSS layout issues, improve performance, and reduce DOM clutter","isCorrect":true},{"id":"c","text":"They automatically apply styles","isCorrect":false},{"id":"d","text":"They are required for server-side rendering","isCorrect":false}]' WHERE metadata->>'original_id' = 'react-q-032';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"A way to share state between unrelated components","isCorrect":false},{"id":"b","text":"A feature to render children into a different DOM node while preserving React behavior","isCorrect":true},{"id":"c","text":"A method to lazy-load components","isCorrect":false},{"id":"d","text":"An alternative to React Context","isCorrect":false}]' WHERE metadata->>'original_id' = 'react-q-033';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Components that cannot receive props","isCorrect":false},{"id":"b","text":"Components that don’t manage internal state and render based only on props","isCorrect":true},{"id":"c","text":"Components that are always class-based","isCorrect":false},{"id":"d","text":"Components that throw errors","isCorrect":false}]' WHERE metadata->>'original_id' = 'react-q-034';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Components that never re-render","isCorrect":false},{"id":"b","text":"Components that manage internal state and re-render when it changes","isCorrect":true},{"id":"c","text":"Components that only accept static props","isCorrect":false},{"id":"d","text":"Components that are deprecated","isCorrect":false}]' WHERE metadata->>'original_id' = 'react-q-035';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Use `PropTypes` from the `prop-types` package to define expected prop types and required props","isCorrect":true},{"id":"b","text":"PropTypes work in production mode for security","isCorrect":false},{"id":"c","text":"Validation is automatic and cannot be customized","isCorrect":false},{"id":"d","text":"PropTypes are built into React since v16","isCorrect":false}]' WHERE metadata->>'original_id' = 'react-q-036';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Virtual DOM, JSX, SSR, easy integration, and testability","isCorrect":true},{"id":"b","text":"Two-way data binding and full framework features","isCorrect":false},{"id":"c","text":"Built-in state management and routing","isCorrect":false},{"id":"d","text":"No learning curve for beginners","isCorrect":false}]' WHERE metadata->>'original_id' = 'react-q-037';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"It’s a full framework with built-in routing and state management","isCorrect":false},{"id":"b","text":"It’s just a view library, has a learning curve, and can create boilerplate","isCorrect":true},{"id":"c","text":"It doesn’t support server-side rendering","isCorrect":false},{"id":"d","text":"It’s slower than vanilla JS","isCorrect":false}]' WHERE metadata->>'original_id' = 'react-q-038';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"PropTypes for small apps;

 TypeScript/Flow for large codebases","isCorrect":true},{"id":"b","text":"Only PropTypes should be used","isCorrect":false},{"id":"c","text":"TypeScript is not compatible with React","isCorrect":false},{"id":"d","text":"Static typing is unnecessary in React","isCorrect":false}]' WHERE metadata->>'original_id' = 'react-q-039';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"It contains React’s core logic like useState and useEffect","isCorrect":false},{"id":"b","text":"It provides DOM-specific methods like render(), hydrate(), and createPortal()","isCorrect":true},{"id":"c","text":"It’s used for server-side logic only","isCorrect":false},{"id":"d","text":"It’s deprecated in React 18","isCorrect":false}]' WHERE metadata->>'original_id' = 'react-q-040';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"A tool for client-side hydration only","isCorrect":false},{"id":"b","text":"An object with methods like renderToString() for server-side rendering","isCorrect":true},{"id":"c","text":"A replacement for react-dom in the browser","isCorrect":false},{"id":"d","text":"Used for testing components","isCorrect":false}]' WHERE metadata->>'original_id' = 'react-q-041';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Use `innerHTML` directly on JSX elements","isCorrect":false},{"id":"b","text":"Use `dangerouslySetInnerHTML={{ __html: string }}` with caution","isCorrect":true},{"id":"c","text":"It’s not possible to render HTML in React","isCorrect":false},{"id":"d","text":"Use `React.renderHTML()`","isCorrect":false}]' WHERE metadata->>'original_id' = 'react-q-042';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Use CSS strings like `style=\"color: blue\"`","isCorrect":false},{"id":"b","text":"Use camelCased JavaScript objects: `style={{ backgroundColor: ''blue'' }}`","isCorrect":true},{"id":"c","text":"Only external CSS files are allowed","isCorrect":false},{"id":"d","text":"Styles must be defined in a separate CSS module","isCorrect":false}]' WHERE metadata->>'original_id' = 'react-q-043';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Event names are lowercase and handlers are strings","isCorrect":false},{"id":"b","text":"Event names use camelCase and handlers are functions","isCorrect":true},{"id":"c","text":"Events are handled the same as in HTML","isCorrect":false},{"id":"d","text":"React doesn’t support events","isCorrect":false}]' WHERE metadata->>'original_id' = 'react-q-044';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"It’s always safe and recommended","isCorrect":false},{"id":"b","text":"It can cause bugs with reordering or filtering;

 use stable IDs instead","isCorrect":true},{"id":"c","text":"Keys are optional and have no impact","isCorrect":false},{"id":"d","text":"Indexes improve performance","isCorrect":false}]' WHERE metadata->>'original_id' = 'react-q-045';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Use `if` statements directly in JSX","isCorrect":false},{"id":"b","text":"Use `&&` for truthy checks and ternary for if-else logic","isCorrect":true},{"id":"c","text":"Conditional rendering is not supported","isCorrect":false},{"id":"d","text":"Always use `switch` statements","isCorrect":false}]' WHERE metadata->>'original_id' = 'react-q-046';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Spreading props is always safe","isCorrect":false},{"id":"b","text":"It can add invalid HTML attributes;

 destructure to avoid this","isCorrect":true},{"id":"c","text":"DOM elements ignore extra props","isCorrect":false},{"id":"d","text":"You must spread all props for components to work","isCorrect":false}]' WHERE metadata->>'original_id' = 'react-q-047';