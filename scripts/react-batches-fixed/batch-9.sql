-- Batch 9: Questions 81-90
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES
('d210addf-ec2b-4c7c-871d-1f71384ec346', 'What are the <Router> components of React Router v6?', 'React Router v6 provides four main `<Router>` components:
1. `<BrowserRouter>`: Uses HTML5 history API (standard web apps)
2. `<HashRouter>`: Uses URL hash for static servers
3. `<MemoryRouter>`: In-memory routing (testing, React Native)
4. `<StaticRouter>`: For server-side rendering (SSR)', 'multiple-choice', 'intermediate', 4, '[{"id":"a","text":"`<BrowserRouter>`, `<HashRouter>`, `<MemoryRouter>`, `<StaticRouter>`","isCorrect":true},{"id":"b","text":"`<Router>`, `<Route>`, `<Link>`, `<NavLink>`","isCorrect":false},{"id":"c","text":"Only `<BrowserRouter>` exists in v6","isCorrect":false},{"id":"d","text":"`<Router>` is removed in v6","isCorrect":false}]', NULL, 'Each Router component creates a different type of history instance (browser, hash, memory, static) for different environments.', NULL, ARRAY[]::text[], ARRAY['react','react-router','router','v6','ssr','native'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-081","original_type":"multiple-choice","topic":"React Router","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('9dc5178d-f64e-4f64-8653-98c31972e9b4', 'What is the purpose of push and replace methods of history?', 'The `history` object has two navigation methods:
- `push()`: Adds a new entry to the browser history stack
- `replace()`: Replaces the current entry in the history stack

This affects browser back/forward behavior.', 'multiple-choice', 'intermediate', 3, '[{"id":"a","text":"`push()` replaces current URL; `replace()` adds to history","isCorrect":false},{"id":"b","text":"`push()` adds to history stack; `replace()` replaces current entry","isCorrect":true},{"id":"c","text":"Both behave identically","isCorrect":false},{"id":"d","text":"These methods are deprecated in v6","isCorrect":false}]', NULL, '`push()` adds to history (user can go back); `replace()` overwrites current history (no back to previous).', NULL, ARRAY[]::text[], ARRAY['react','react-router','history','navigation','browser-api'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-082","original_type":"multiple-choice","topic":"React Router","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('92bd38ce-26bd-4d41-b95c-c63c65435308', 'How do you programmatically navigate using React Router v4?', 'In React Router v4, programmatic navigation can be done via:
1. `withRouter()` HOC (injects `history` prop)
2. `<Route>` render prop (passes `history`)
3. Context (not recommended)

Example with `withRouter`:
```jsx
const Button = withRouter(({ history }) => (
  <button onClick={() => history.push(''/new'')}>Go</button>
));
```', 'multiple-choice', 'intermediate', 4, '[{"id":"a","text":"Use `useNavigate` hook","isCorrect":false},{"id":"b","text":"Use `withRouter` HOC or `<Route>` render prop to access `history.push()`","isCorrect":true},{"id":"c","text":"Directly modify `window.location`","isCorrect":false},{"id":"d","text":"Navigation is not possible in v4","isCorrect":false}]', NULL, 'In v4, `withRouter` or render props were used to access the `history` object for programmatic navigation.', NULL, ARRAY[]::text[], ARRAY['react','react-router','navigation','programmatic','v4'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-083","original_type":"multiple-choice","topic":"React Router","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('0a9aaa80-bd3d-47c8-9d59-ed33f7ba1293', 'How do you get query parameters in React Router v4?', 'React Router v4 removed built-in query string parsing. Recommended approaches:
- Use `query-string` library: `queryString.parse(props.location.search)`
- Use native `URLSearchParams`: `new URLSearchParams(props.location.search).get(''name'')`

Note: `URLSearchParams` requires a polyfill for IE11.', 'multiple-choice', 'intermediate', 3, '[{"id":"a","text":"`props.query`","isCorrect":false},{"id":"b","text":"Use `query-string` library or `URLSearchParams`","isCorrect":true},{"id":"c","text":"`useParams()` hook","isCorrect":false},{"id":"d","text":"Query params are not supported","isCorrect":false}]', NULL, 'React Router v4 delegates query parsing to userland libraries like `query-string` or native `URLSearchParams`.', NULL, ARRAY[]::text[], ARRAY['react','react-router','query-parameters','url-search-params','v4'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-084","original_type":"multiple-choice","topic":"React Router","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('5f78f4c9-2f64-402a-ba90-9752e9164ff0', 'Why do you get a "Router may have only one child element" warning?', 'In React Router, `<Router>` expects a single child. To render multiple routes, wrap them in a `<Switch>` (v5) or use direct nesting (v6). The `<Switch>` renders only the first matching `<Route>`.

Example:
```jsx
<Router>
  <Switch>
    <Route path="/" component={Home} />
    <Route component={NotFound} />
  </Switch>
</Router>
```', 'multiple-choice', 'intermediate', 3, '[{"id":"a","text":"You must always use `<Switch>`","isCorrect":false},{"id":"b","text":"`<Router>` requires a single child; use `<Switch>` to group routes","isCorrect":true},{"id":"c","text":"This warning is removed in v6","isCorrect":false},{"id":"d","text":"It’s caused by missing `exact` prop","isCorrect":false}]', NULL, 'The `<Router>` component requires exactly one child. Use `<Switch>` (v5) or direct route nesting (v6) to group multiple routes.', NULL, ARRAY[]::text[], ARRAY['react','react-router','switch','routing','error'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-085","original_type":"multiple-choice","topic":"React Router","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('80f5ed65-8c97-4d7a-b8b3-1dbd3af470e7', 'How do you pass params to the history.push method in React Router v4?', 'When using `history.push()`, you can pass an object with `pathname`, `search` (query), and `state`:
```javascript
this.props.history.push({
  pathname: ''/template'',
  search: ''?name=sudheer'',
  state: { detail: response.data }
});
```', 'multiple-choice', 'intermediate', 4, '[{"id":"a","text":"`history.push(''/path'', { param: value })`","isCorrect":false},{"id":"b","text":"`history.push({ pathname: ''/path'', search: ''?q=1'', state: { data } })`","isCorrect":true},{"id":"c","text":"Only strings are allowed","isCorrect":false},{"id":"d","text":"Use URL fragments only","isCorrect":false}]', NULL, '`history.push()` accepts an object with `pathname`, `search` (for query params), and `state` (for transient data).', NULL, ARRAY[]::text[], ARRAY['react','react-router','history','navigation','state','query'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-086","original_type":"multiple-choice","topic":"React Router","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('a5aa2c89-2fae-4eb4-b610-4de759256d93', 'How do you implement a default or NotFound page?', 'In React Router, a `<Route>` without a `path` prop always matches. Place it last to catch unmatched routes:
```jsx
<Switch>
  <Route exact path="/" component={Home} />
  <Route path="/user" component={User} />
  <Route component={NotFound} />
</Switch>
```', 'multiple-choice', 'intermediate', 3, '[{"id":"a","text":"Use `*` path: `<Route path=\"*\" component={NotFound} />`","isCorrect":false},{"id":"b","text":"Place a `<Route>` with no `path` prop last","isCorrect":true},{"id":"c","text":"It’s automatic in v6","isCorrect":false},{"id":"d","text":"Use `useRouteMatch()`","isCorrect":false}]', NULL, 'A `<Route>` with no `path` acts as a fallback and should be placed last to handle unmatched URLs.', NULL, ARRAY[]::text[], ARRAY['react','react-router','not-found','404','default-route'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-087","original_type":"multiple-choice","topic":"React Router","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('ae569fd8-d52e-498f-ac48-8c2acf6d5fab', 'How do you get history in React Router v4?', 'To access the `history` object outside components in v4:
1. Create a `history.js` file with `createBrowserHistory()`
2. Use `<Router history={history}>` instead of `<BrowserRouter>`
3. Import `history` anywhere to call `history.push()`', 'multiple-choice', 'advanced', 5, '[{"id":"a","text":"Use `useHistory()` hook","isCorrect":false},{"id":"b","text":"Create a custom `history` instance and pass it to `<Router>`","isCorrect":true},{"id":"c","text":"`window.history` is sufficient","isCorrect":false},{"id":"d","text":"History is not accessible outside components","isCorrect":false}]', NULL, 'Creating a standalone `history` instance allows programmatic navigation from anywhere, not just components.', NULL, ARRAY[]::text[], ARRAY['react','react-router','history','custom-history','v4'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-088","original_type":"multiple-choice","topic":"React Router","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('8679896c-013e-4849-b522-3857dbb28de6', 'How do you perform an automatic redirect after login?', 'Use React Router’s `<Redirect>` component to navigate after login:
```jsx
function Login() {
  if (isLoggedIn) {
    return <Redirect to="/dashboard" />;
  }
  return <LoginForm />;
}
```
In v6, use the `useNavigate` hook instead.', 'multiple-choice', 'intermediate', 3, '[{"id":"a","text":"`window.location.href = ''/dashboard''`","isCorrect":false},{"id":"b","text":"Render `<Redirect to=\"/dashboard\" />` when logged in","isCorrect":true},{"id":"c","text":"Use `history.replace()` only","isCorrect":false},{"id":"d","text":"Redirects are not possible in React","isCorrect":false}]', NULL, '`<Redirect>` replaces the current location with a new one, useful for post-login redirects.', NULL, ARRAY[]::text[], ARRAY['react','react-router','redirect','authentication','login'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-089","original_type":"multiple-choice","topic":"React Router","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('d4a32dc5-c492-402d-ab94-9edb24c5ad0d', 'What is React Intl?', 'React Intl is a library for internationalization (i18n) in React apps, part of the FormatJS project. It provides components and APIs for formatting strings, dates, numbers, and handling plurals across 150+ languages.', 'multiple-choice', 'intermediate', 3, '[{"id":"a","text":"A state management library","isCorrect":false},{"id":"b","text":"An internationalization library for formatting and translations","isCorrect":true},{"id":"c","text":"A routing solution","isCorrect":false},{"id":"d","text":"A testing framework","isCorrect":false}]', NULL, 'React Intl enables robust internationalization with off-the-shelf components for formatting and translations.', NULL, ARRAY[]::text[], ARRAY['react','intl','i18n','formatjs','localization'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-090","original_type":"multiple-choice","topic":"React Intl","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z');
