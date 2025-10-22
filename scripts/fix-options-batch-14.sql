

UPDATE questions 
SET options = '[{"id":"a","text":"The process of converting JSX to JavaScript","isCorrect":false},{"id":"b","text":"React''s algorithm to compare Virtual DOM trees and update only changed real DOM nodes","isCorrect":true},{"id":"c","text":"A method to bundle React components","isCorrect":false},{"id":"d","text":"The act of mounting a component for the first time","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-028';



UPDATE questions 
SET options = '[{"id":"a","text":"Because `class` is a reserved keyword in JavaScript","isCorrect":true},{"id":"b","text":"To make CSS harder to write","isCorrect":false},{"id":"c","text":"Because HTML doesn’t support `class`","isCorrect":false},{"id":"d","text":"It’s a typo that became standard","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-030';



UPDATE questions 
SET options = '[{"id":"a","text":"Special components that render nothing","isCorrect":false},{"id":"b","text":"A way to group multiple elements without adding extra DOM nodes","isCorrect":true},{"id":"c","text":"Components that only render on mobile","isCorrect":false},{"id":"d","text":"A type of React error boundary","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-031';



UPDATE questions 
SET options = '[{"id":"a","text":"They are slower but easier to debug","isCorrect":false},{"id":"b","text":"They prevent CSS layout issues, improve performance, and reduce DOM clutter","isCorrect":true},{"id":"c","text":"They automatically apply styles","isCorrect":false},{"id":"d","text":"They are required for server-side rendering","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-032';



UPDATE questions 
SET options = '[{"id":"a","text":"A way to share state between unrelated components","isCorrect":false},{"id":"b","text":"A feature to render children into a different DOM node while preserving React behavior","isCorrect":true},{"id":"c","text":"A method to lazy-load components","isCorrect":false},{"id":"d","text":"An alternative to React Context","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-033';



UPDATE questions 
SET options = '[{"id":"a","text":"Components that cannot receive props","isCorrect":false},{"id":"b","text":"Components that don’t manage internal state and render based only on props","isCorrect":true},{"id":"c","text":"Components that are always class-based","isCorrect":false},{"id":"d","text":"Components that throw errors","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-034';



UPDATE questions 
SET options = '[{"id":"a","text":"Components that never re-render","isCorrect":false},{"id":"b","text":"Components that manage internal state and re-render when it changes","isCorrect":true},{"id":"c","text":"Components that only accept static props","isCorrect":false},{"id":"d","text":"Components that are deprecated","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-035';



UPDATE questions 
SET options = '[{"id":"a","text":"Use `PropTypes` from the `prop-types` package to define expected prop types and required props","isCorrect":true},{"id":"b","text":"PropTypes work in production mode for security","isCorrect":false},{"id":"c","text":"Validation is automatic and cannot be customized","isCorrect":false},{"id":"d","text":"PropTypes are built into React since v16","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-036';



UPDATE questions 
SET options = '[{"id":"a","text":"Virtual DOM, JSX, SSR, easy integration, and testability","isCorrect":true},{"id":"b","text":"Two-way data binding and full framework features","isCorrect":false},{"id":"c","text":"Built-in state management and routing","isCorrect":false},{"id":"d","text":"No learning curve for beginners","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-037';



UPDATE questions 
SET options = '[{"id":"a","text":"It’s a full framework with built-in routing and state management","isCorrect":false},{"id":"b","text":"It’s just a view library, has a learning curve, and can create boilerplate","isCorrect":true},{"id":"c","text":"It doesn’t support server-side rendering","isCorrect":false},{"id":"d","text":"It’s slower than vanilla JS","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-038';