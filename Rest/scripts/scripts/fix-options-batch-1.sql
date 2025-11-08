UPDATE questions 
SET options = '[{"id":"a","text":"Component-Based Architecture, Virtual DOM, JSX, Unidirectional Data Flow, Hooks, Context API, Error Boundaries, SSR, Concurrent Mode, Suspense, Server Components","isCorrect":true},{"id":"b","text":"Two-way data binding, templates, dependency injection, directives","isCorrect":false},{"id":"c","text":"Controllers, Models, Views, Services, Filters","isCorrect":false},{"id":"d","text":"Observables, Pipes, Modules, Decorators","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-003';



UPDATE questions 
SET options = '[{"id":"a","text":"A templating engine like Handlebars","isCorrect":false},{"id":"b","text":"Syntactic sugar for React.createElement()","isCorrect":true},{"id":"c","text":"A new programming language","isCorrect":false},{"id":"d","text":"A CSS preprocessor","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-004';



UPDATE questions 
SET options = '[{"id":"a","text":"An element is a function;

 a component is an object","isCorrect":false},{"id":"b","text":"An element is a plain object describing UI;

 a component is a function/class that returns elements","isCorrect":true},{"id":"c","text":"Elements are stateful;

 components are stateless","isCorrect":false},{"id":"d","text":"Components are DOM nodes;

 elements are virtual","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-005';



UPDATE questions 
SET options = '[{"id":"a","text":"Only with classes","isCorrect":false},{"id":"b","text":"Only with functions","isCorrect":false},{"id":"c","text":"With functions or classes","isCorrect":true},{"id":"d","text":"With HTML templates only","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-006';



UPDATE questions 
SET options = '[{"id":"a","text":"Always use class components for performance","isCorrect":false},{"id":"b","text":"Use class components only for Error Boundaries or legacy code","isCorrect":true},{"id":"c","text":"Class components are required for all stateful logic","isCorrect":false},{"id":"d","text":"Function components cannot use props","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-007';



UPDATE questions 
SET options = '[{"id":"a","text":"Components that never re-render","isCorrect":false},{"id":"b","text":"Components that render the same output for the same props/state and avoid unnecessary re-renders","isCorrect":true},{"id":"c","text":"Components that only accept string props","isCorrect":false},{"id":"d","text":"Components that must be written in TypeScript","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-008';