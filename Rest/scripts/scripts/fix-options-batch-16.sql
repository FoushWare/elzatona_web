

UPDATE questions 
SET options = '[{"id":"a","text":"Spreading props is always safe","isCorrect":false},{"id":"b","text":"It can add invalid HTML attributes;

 destructure to avoid this","isCorrect":true},{"id":"c","text":"DOM elements ignore extra props","isCorrect":false},{"id":"d","text":"You must spread all props for components to work","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-047';



UPDATE questions 
SET options = '[{"id":"a","text":"Use `React.memo()` to prevent unnecessary re-renders when props are unchanged","isCorrect":true},{"id":"b","text":"Memoization is only for class components","isCorrect":false},{"id":"c","text":"All components are memoized by default","isCorrect":false},{"id":"d","text":"Use `useMemo` on the component itself","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-048';



UPDATE questions 
SET options = '[{"id":"a","text":"Render on server with `ReactDOMServer.renderToString()` and hydrate on client","isCorrect":true},{"id":"b","text":"SSR is not supported in React","isCorrect":false},{"id":"c","text":"Use `ReactDOM.render()` on the server","isCorrect":false},{"id":"d","text":"SSR requires a special build of React","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-049';



UPDATE questions 
SET options = '[{"id":"a","text":"Set `NODE_ENV=production` using Webpack’s DefinePlugin","isCorrect":true},{"id":"b","text":"Production mode is enabled by default","isCorrect":false},{"id":"c","text":"Remove all console.log statements manually","isCorrect":false},{"id":"d","text":"Use `--prod` flag in the browser","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-050';



UPDATE questions 
SET options = '[{"id":"a","text":"Yes, Hooks completely replace them and are always better","isCorrect":false},{"id":"b","text":"Hooks provide a simpler way to share logic and reduce nesting, but render props and HOCs are still valid patterns","isCorrect":true},{"id":"c","text":"No, Hooks cannot replace render props or HOCs","isCorrect":false},{"id":"d","text":"Hooks only work with class components","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-051';



UPDATE questions 
SET options = '[{"id":"a","text":"A component that toggles between light and dark mode","isCorrect":false},{"id":"b","text":"A component that renders one of many components based on a prop using an object map","isCorrect":true},{"id":"c","text":"A component that switches between class and function syntax","isCorrect":false},{"id":"d","text":"A built-in React component for routing","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-052';



UPDATE questions 
SET options = '[{"id":"a","text":"Mixins are the recommended way to share logic in modern React","isCorrect":false},{"id":"b","text":"Mixins are deprecated and should be replaced with HOCs, render props, or Hooks","isCorrect":true},{"id":"c","text":"Mixins work well with function components","isCorrect":false},{"id":"d","text":"Mixins are required for performance optimization","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-053';



UPDATE questions 
SET options = '[{"id":"a","text":"React only supports mouse and touch events separately","isCorrect":false},{"id":"b","text":"React supports Pointer Events like onPointerDown, onPointerMove, etc., for unified input handling","isCorrect":true},{"id":"c","text":"Pointer Events are not supported in React","isCorrect":false},{"id":"d","text":"Pointer Events only work in React Native","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-054';



UPDATE questions 
SET options = '[{"id":"a","text":"It’s a JavaScript syntax requirement","isCorrect":false},{"id":"b","text":"JSX uses lowercase for HTML elements;