UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'react-q-001';



UPDATE questions SET type = 'open-ended', options = NULL, correct_answer = NULL WHERE metadata->>'original_id' = 'react-q-002';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Component-Based Architecture, Virtual DOM, JSX, Unidirectional Data Flow, Hooks, Context API, Error Boundaries, SSR, Concurrent Mode, Suspense, Server Components","isCorrect":true},{"id":"b","text":"Two-way data binding, templates, dependency injection, directives","isCorrect":false},{"id":"c","text":"Controllers, Models, Views, Services, Filters","isCorrect":false},{"id":"d","text":"Observables, Pipes, Modules, Decorators","isCorrect":false}]' WHERE metadata->>'original_id' = 'react-q-003';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"A templating engine like Handlebars","isCorrect":false},{"id":"b","text":"Syntactic sugar for React.createElement()","isCorrect":true},{"id":"c","text":"A new programming language","isCorrect":false},{"id":"d","text":"A CSS preprocessor","isCorrect":false}]' WHERE metadata->>'original_id' = 'react-q-004';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"An element is a function;

 a component is an object","isCorrect":false},{"id":"b","text":"An element is a plain object describing UI;

 a component is a function/class that returns elements","isCorrect":true},{"id":"c","text":"Elements are stateful;

 components are stateless","isCorrect":false},{"id":"d","text":"Components are DOM nodes;

 elements are virtual","isCorrect":false}]' WHERE metadata->>'original_id' = 'react-q-005';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Only with classes","isCorrect":false},{"id":"b","text":"Only with functions","isCorrect":false},{"id":"c","text":"With functions or classes","isCorrect":true},{"id":"d","text":"With HTML templates only","isCorrect":false}]' WHERE metadata->>'original_id' = 'react-q-006';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Always use class components for performance","isCorrect":false},{"id":"b","text":"Use class components only for Error Boundaries or legacy code","isCorrect":true},{"id":"c","text":"Class components are required for all stateful logic","isCorrect":false},{"id":"d","text":"Function components cannot use props","isCorrect":false}]' WHERE metadata->>'original_id' = 'react-q-007';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Components that never re-render","isCorrect":false},{"id":"b","text":"Components that render the same output for the same props/state and avoid unnecessary re-renders","isCorrect":true},{"id":"c","text":"Components that only accept string props","isCorrect":false},{"id":"d","text":"Components that must be written in TypeScript","isCorrect":false}]' WHERE metadata->>'original_id' = 'react-q-008';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Immutable data passed from parent components","isCorrect":false},{"id":"b","text":"Mutable data that triggers re-renders when changed","isCorrect":true},{"id":"c","text":"Static configuration for a component","isCorrect":false},{"id":"d","text":"A global store like Redux","isCorrect":false}]' WHERE metadata->>'original_id' = 'react-q-009';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Mutable data managed by the component itself","isCorrect":false},{"id":"b","text":"Read-only inputs passed from parent to child","isCorrect":true},{"id":"c","text":"Global variables accessible anywhere","isCorrect":false},{"id":"d","text":"Event handlers only","isCorrect":false}]' WHERE metadata->>'original_id' = 'react-q-010';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"State is immutable;

 props are mutable","isCorrect":false},{"id":"b","text":"State is managed internally and mutable;

 props are passed from parent and read-only","isCorrect":true},{"id":"c","text":"Props can be changed with this.setProps()","isCorrect":false},{"id":"d","text":"State and props are the same thing","isCorrect":false}]' WHERE metadata->>'original_id' = 'react-q-011';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"React uses lowercase event names like HTML","isCorrect":false},{"id":"b","text":"React uses camelCase, requires explicit preventDefault(), and passes function references","isCorrect":true},{"id":"c","text":"React uses strings for event handlers like HTML","isCorrect":false},{"id":"d","text":"React doesn''t support event handling","isCorrect":false}]' WHERE metadata->>'original_id' = 'react-q-012';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Native browser events","isCorrect":false},{"id":"b","text":"React''s cross-browser wrapper around native events","isCorrect":true},{"id":"c","text":"Custom events created with Event constructor","isCorrect":false},{"id":"d","text":"Events that only work in development mode","isCorrect":false}]' WHERE metadata->>'original_id' = 'react-q-013';



UPDATE questions SET type = 'multiple-choice', options = '[{"id":"a","text":"Only if/else blocks outside JSX","isCorrect":false},{"id":"b","text":"Ternary operators and && expressions inside JSX","isCorrect":true},{"id":"c","text":"Switch statements only","isCorrect":false},{"id":"d","text":"No conditional rendering in React","isCorrect":false}]' WHERE metadata->>'original_id' = 'react-q-014';