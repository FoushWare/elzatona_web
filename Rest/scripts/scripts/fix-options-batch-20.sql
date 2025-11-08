 `replace()` replaces current entry","isCorrect":true},{"id":"c","text":"Both behave identically","isCorrect":false},{"id":"d","text":"These methods are deprecated in v6","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-082';



UPDATE questions 
SET options = '[{"id":"a","text":"Use `useNavigate` hook","isCorrect":false},{"id":"b","text":"Use `withRouter` HOC or `<Route>` render prop to access `history.push()`","isCorrect":true},{"id":"c","text":"Directly modify `window.location`","isCorrect":false},{"id":"d","text":"Navigation is not possible in v4","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-083';



UPDATE questions 
SET options = '[{"id":"a","text":"`props.query`","isCorrect":false},{"id":"b","text":"Use `query-string` library or `URLSearchParams`","isCorrect":true},{"id":"c","text":"`useParams()` hook","isCorrect":false},{"id":"d","text":"Query params are not supported","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-084';



UPDATE questions 
SET options = '[{"id":"a","text":"You must always use `<Switch>`","isCorrect":false},{"id":"b","text":"`<Router>` requires a single child;

 use `<Switch>` to group routes","isCorrect":true},{"id":"c","text":"This warning is removed in v6","isCorrect":false},{"id":"d","text":"It’s caused by missing `exact` prop","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-085';



UPDATE questions 
SET options = '[{"id":"a","text":"`history.push(''/path'', { param: value })`","isCorrect":false},{"id":"b","text":"`history.push({ pathname: ''/path'', search: ''?q=1'', state: { data } })`","isCorrect":true},{"id":"c","text":"Only strings are allowed","isCorrect":false},{"id":"d","text":"Use URL fragments only","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-086';



UPDATE questions 
SET options = '[{"id":"a","text":"Use `*` path: `<Route path=\"*\" component={NotFound} />`","isCorrect":false},{"id":"b","text":"Place a `<Route>` with no `path` prop last","isCorrect":true},{"id":"c","text":"It’s automatic in v6","isCorrect":false},{"id":"d","text":"Use `useRouteMatch()`","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-087';



UPDATE questions 
SET options = '[{"id":"a","text":"Use `useHistory()` hook","isCorrect":false},{"id":"b","text":"Create a custom `history` instance and pass it to `<Router>`","isCorrect":true},{"id":"c","text":"`window.history` is sufficient","isCorrect":false},{"id":"d","text":"History is not accessible outside components","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-088';



UPDATE questions 
SET options = '[{"id":"a","text":"`window.location.href = ''/dashboard''`","isCorrect":false},{"id":"b","text":"Render `<Redirect to=\"/dashboard\" />` when logged in","isCorrect":true},{"id":"c","text":"Use `history.replace()` only","isCorrect":false},{"id":"d","text":"Redirects are not possible in React","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-089';



UPDATE questions 
SET options = '[{"id":"a","text":"A state management library","isCorrect":false},{"id":"b","text":"An internationalization library for formatting and translations","isCorrect":true},{"id":"c","text":"A routing solution","isCorrect":false},{"id":"d","text":"A testing framework","isCorrect":false}]'
WHERE metadata->>'original_id' = 'react-q-090';