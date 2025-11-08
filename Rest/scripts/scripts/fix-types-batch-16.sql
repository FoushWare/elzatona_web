

UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Use `React.memo()` to prevent unnecessary re-renders when props are unchanged","isCorrect":true},{"id":"b","text":"Memoization is only for class components","isCorrect":false},{"id":"c","text":"All components are memoized by default","isCorrect":false},{"id":"d","text":"Use `useMemo` on the component itself","isCorrect":false}]' WHERE metadata->>'original_id' = 'react-q-048';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Render on server with `ReactDOMServer.renderToString()` and hydrate on client","isCorrect":true},{"id":"b","text":"SSR is not supported in React","isCorrect":false},{"id":"c","text":"Use `ReactDOM.render()` on the server","isCorrect":false},{"id":"d","text":"SSR requires a special build of React","isCorrect":false}]' WHERE metadata->>'original_id' = 'react-q-049';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Set `NODE_ENV=production` using Webpack’s DefinePlugin","isCorrect":true},{"id":"b","text":"Production mode is enabled by default","isCorrect":false},{"id":"c","text":"Remove all console.log statements manually","isCorrect":false},{"id":"d","text":"Use `--prod` flag in the browser","isCorrect":false}]' WHERE metadata->>'original_id' = 'react-q-050';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Yes, Hooks completely replace them and are always better","isCorrect":false},{"id":"b","text":"Hooks provide a simpler way to share logic and reduce nesting, but render props and HOCs are still valid patterns","isCorrect":true},{"id":"c","text":"No, Hooks cannot replace render props or HOCs","isCorrect":false},{"id":"d","text":"Hooks only work with class components","isCorrect":false}]' WHERE metadata->>'original_id' = 'react-q-051';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"A component that toggles between light and dark mode","isCorrect":false},{"id":"b","text":"A component that renders one of many components based on a prop using an object map","isCorrect":true},{"id":"c","text":"A component that switches between class and function syntax","isCorrect":false},{"id":"d","text":"A built-in React component for routing","isCorrect":false}]' WHERE metadata->>'original_id' = 'react-q-052';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Mixins are the recommended way to share logic in modern React","isCorrect":false},{"id":"b","text":"Mixins are deprecated and should be replaced with HOCs, render props, or Hooks","isCorrect":true},{"id":"c","text":"Mixins work well with function components","isCorrect":false},{"id":"d","text":"Mixins are required for performance optimization","isCorrect":false}]' WHERE metadata->>'original_id' = 'react-q-053';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"React only supports mouse and touch events separately","isCorrect":false},{"id":"b","text":"React supports Pointer Events like onPointerDown, onPointerMove, etc., for unified input handling","isCorrect":true},{"id":"c","text":"Pointer Events are not supported in React","isCorrect":false},{"id":"d","text":"Pointer Events only work in React Native","isCorrect":false}]' WHERE metadata->>'original_id' = 'react-q-054';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"It’s a JavaScript syntax requirement","isCorrect":false},{"id":"b","text":"JSX uses lowercase for HTML elements;

 capital letters distinguish React components","isCorrect":true},{"id":"c","text":"It improves performance","isCorrect":false},{"id":"d","text":"It’s only required for class components","isCorrect":false}]' WHERE metadata->>'original_id' = 'react-q-055';



UPDATE questions SET type = 'true-false' WHERE metadata->>'original_id' = 'react-q-056';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Use `for` loops directly in JSX","isCorrect":false},{"id":"b","text":"Use `Array.prototype.map()` to transform arrays into JSX elements","isCorrect":true},{"id":"c","text":"Loops are not supported in JSX","isCorrect":false},{"id":"d","text":"Use `forEach` to render elements","isCorrect":false}]' WHERE metadata->>'original_id' = 'react-q-057';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Use `{this.props.image}` inside quotes like `src=\"images/{this.props.image}\"`","isCorrect":false},{"id":"b","text":"Use expressions like `src={\"images/\" + this.props.image}` or template literals `src={`images/${this.props.image}`}`","isCorrect":true},{"id":"c","text":"Only static strings are allowed in attributes","isCorrect":false},{"id":"d","text":"Use `src={this.props.image}` without any path","isCorrect":false}]' WHERE metadata->>'original_id' = 'react-q-058';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"`PropTypes.array(PropTypes.shape({}))`","isCorrect":false},{"id":"b","text":"`PropTypes.arrayOf(PropTypes.shape({ color: PropTypes.string, fontSize: PropTypes.number }))`","isCorrect":true},{"id":"c","text":"`PropTypes.objectOf(PropTypes.array)`","isCorrect":false},{"id":"d","text":"`PropTypes.shape([PropTypes.object])`","isCorrect":false}]' WHERE metadata->>'original_id' = 'react-q-059';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Use `className=\"btn {visible ? ''active'' : ''''}\"`","isCorrect":false},{"id":"b","text":"Use `className={''btn '' + (visible ? ''active'' : '''')}` or template literals","isCorrect":true},{"id":"c","text":"Conditional classes are not supported","isCorrect":false},{"id":"d","text":"Use CSS-in-JS only for conditional styling","isCorrect":false}]' WHERE metadata->>'original_id' = 'react-q-060';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"`react` handles DOM rendering;

 `react-dom` defines components","isCorrect":false},{"id":"b","text":"`react` provides core element/component APIs;

 `react-dom` provides DOM and SSR rendering methods","isCorrect":true},{"id":"c","text":"They are the same package","isCorrect":false},{"id":"d","text":"`react-dom` is only for server-side rendering","isCorrect":false}]' WHERE metadata->>'original_id' = 'react-q-061';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"To reduce bundle size for web apps","isCorrect":false},{"id":"b","text":"To enable React to work across platforms like web and React Native by separating core from DOM-specific code","isCorrect":true},{"id":"c","text":"Because the DOM API is too complex","isCorrect":false},{"id":"d","text":"ReactDOM is deprecated","isCorrect":false}]' WHERE metadata->>'original_id' = 'react-q-062';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Use `for` as in HTML","isCorrect":false},{"id":"b","text":"Use `htmlFor` because `for` is a reserved JavaScript keyword","isCorrect":true},{"id":"c","text":"Labels are not supported in React","isCorrect":false},{"id":"d","text":"Use `labelFor`","isCorrect":false}]' WHERE metadata->>'original_id' = 'react-q-063';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Use `Object.assign()` only","isCorrect":false},{"id":"b","text":"Use spread operator `{...style1, ...style2}` in React web;