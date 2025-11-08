

UPDATE questions 
SET options = '[{"id":"a","text":"All component names must be uppercase","isCorrect":false},{"id":"b","text":"Tags with dots like `<obj.component />` are valid because they are property accessors","isCorrect":true},{"id":"c","text":"Lowercase names are allowed for all components","isCorrect":false},{"id":"d","text":"Naming exceptions are not supported","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-073';



UPDATE questions 
SET options = '[{"id":"a","text":"Only grouping by file type is valid","isCorrect":false},{"id":"b","text":"Group by feature/route or by file type are both common approaches","isCorrect":true},{"id":"c","text":"There is only one official React folder structure","isCorrect":false},{"id":"d","text":"Folder structure doesn''t matter in React","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-075';



UPDATE questions 
SET options = '[{"id":"a","text":"`react-spring`, `framer-motion`, `React Transition Group`, `React Motion`","isCorrect":true},{"id":"b","text":"`animate.css` only","isCorrect":false},{"id":"c","text":"`jQuery.animate()`","isCorrect":false},{"id":"d","text":"CSS animations are the only way","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-076';



UPDATE questions 
SET options = '[{"id":"a","text":"They allow dynamic theme switching only","isCorrect":false},{"id":"b","text":"They extract reusable style values (colors, spacing) into shared modules for consistency","isCorrect":true},{"id":"c","text":"They replace CSS entirely","isCorrect":false},{"id":"d","text":"They are only for server-side rendering","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-077';



UPDATE questions 
SET options = '[{"id":"a","text":"`eslint-plugin-react` and `eslint-plugin-jsx-a11y`","isCorrect":true},{"id":"b","text":"`prettier` only","isCorrect":false},{"id":"c","text":"`stylelint` for React","isCorrect":false},{"id":"d","text":"No linters are needed for React","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-078';



UPDATE questions 
SET options = '[{"id":"a","text":"A state management library like Redux","isCorrect":false},{"id":"b","text":"A routing library for SPAs that syncs URL with UI","isCorrect":true},{"id":"c","text":"A CSS-in-JS solution","isCorrect":false},{"id":"d","text":"A testing utility","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-079';



UPDATE questions 
SET options = '[{"id":"a","text":"React Router is a standalone browser API","isCorrect":false},{"id":"b","text":"React Router wraps the `history` library to provide declarative React components for routing","isCorrect":true},{"id":"c","text":"The `history` library is only for server-side rendering","isCorrect":false},{"id":"d","text":"They are the same thing","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-080';



UPDATE questions 
SET options = '[{"id":"a","text":"`<BrowserRouter>`, `<HashRouter>`, `<MemoryRouter>`, `<StaticRouter>`","isCorrect":true},{"id":"b","text":"`<Router>`, `<Route>`, `<Link>`, `<NavLink>`","isCorrect":false},{"id":"c","text":"Only `<BrowserRouter>` exists in v6","isCorrect":false},{"id":"d","text":"`<Router>` is removed in v6","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-081';



UPDATE questions 
SET options = '[{"id":"a","text":"`push()` replaces current URL;

 `replace()` adds to history","isCorrect":false},{"id":"b","text":"`push()` adds to history stack;