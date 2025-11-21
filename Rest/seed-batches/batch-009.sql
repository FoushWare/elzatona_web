-- Batch 9: Questions 81-90 (10 questions)
INSERT INTO questions (
  id, title, content, type, difficulty, points, options, correct_answer, 
  explanation, test_cases, hints, tags, metadata, stats, category_id, 
  learning_card_id, is_active, created_at, updated_at, topic_id, time_limit
) VALUES (
    gen_random_uuid(),
    'What are the `<Router>` components of React Router v6?',
    'React Router v6 provides below 4 `<Router>` components:

    1.  `<BrowserRouter>`:Uses the HTML5 history API for standard web apps.
    2.  `<HashRouter>`:Uses hash-based routing for static servers.
    3.  `<MemoryRouter>`:Uses in-memory routing for testing and non-browser environments.
    4.  `<StaticRouter>`:Provides static routing for server-side rendering (SSR).

    The above components will create _browser_, _hash_, _memory_ and _static_ history instances. React Router v6 makes the properties and methods of the `history` instance associated with your router available through the context in the `router` object.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'React Router v6 provides below 4 `<Router>` components:

    1.  `<BrowserRouter>`:Uses the HTML5 history API for standard web apps.
    2.  `<HashRouter>`:Uses hash-based routing for static servers.
    3.  `<MemoryRouter>`:Uses in-memory routing for testing and non-browser environments.
    4.  `<StaticRouter>`:Provides static routing for server-side rendering (SSR).

    The above components will create _browser_, _hash_, _memory_ and _static_ history instances. React Router v6 makes the properties and methods of the `history` instance associated with your router available through the context in the `router` object.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'routing', 'intermediate'],
    '{"source":"reference.md","section":"React Router","originalNum":81}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.522Z',
    '2025-11-18T20:44:53.522Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is the purpose of `push()` and `replace()` methods of `history`?',
    'A history instance has two methods for navigation purpose.

    1.  `push()`
    2.  `replace()`

    If you think of the history as an array of visited locations, `push()` will add a new location to the array and `replace()` will replace the current location in the array with the new one.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'A history instance has two methods for navigation purpose.

    1.  `push()`
    2.  `replace()`

    If you think of the history as an array of visited locations, `push()` will add a new location to the array and `replace()` will replace the current location in the array with the new one.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'routing', 'intermediate'],
    '{"source":"reference.md","section":"React Router","originalNum":82}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.522Z',
    '2025-11-18T20:44:53.522Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How do you programmatically navigate using React Router v4?',
    '<pre><code>        const Button = (props, context) =&gt; (
          &lt;button
            type=&quot;button&quot;
            onClick={() =&gt; {
              context.history.push(&quot;/new-location&quot;);
            }}
          &gt;
            {&quot;Click Me!&quot;}
          &lt;/button&gt;
        );

        Button.contextTypes = {
          history: React.PropTypes.shape({
            push: React.PropTypes.func.isRequired,
          }),
        };</code></pre>

There are three different ways to achieve programmatic routing/navigation within components.

    1.  **Using the `withRouter()` higher-order function:**

        The `withRouter()` higher-order function will inject the history object as a prop of the component. This object provides `push()` and `replace()` methods to avoid the usage of context.


    2.  **Using `<Route>` component and render props pattern:**

        The `<Route>` component passes the same props as `withRouter()`, so you will be able to access the history methods through the history prop.


    3.  **Using context:**

        This option is not recommended and treated as unstable API.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'There are three different ways to achieve programmatic routing/navigation within components.

    1.  **Using the `withRouter()` higher-order function:**

        The `withRouter()` higher-order function will inject the history object as a prop of the component. This object provides `push()` and `replace()` methods to avoid the usage of context.


    2.  **Using `<Route>` component and render props pattern:**

        The `<Route>` component passes the same props as `withRouter()`, so you will be able to access the history methods through the history prop.


    3.  **Using context:**

        This option is not recommended and treated as unstable API.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'routing', 'intermediate'],
    '{"source":"reference.md","section":"React Router","originalNum":83}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.522Z',
    '2025-11-18T20:44:53.522Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How to get query parameters in React Router v4?',
    '<pre><code>    const params = new URLSearchParams(props.location.search);
    const foo = params.get(&quot;name&quot;);</code></pre>

The ability to parse query strings was taken out of React Router v4 because there have been user requests over the years to support different implementation. So the decision has been given to users to choose the implementation they like. The recommended approach is to use query strings library.


    You can also use `URLSearchParams` if you want something native:


    You should use a _polyfill_ for IE11.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The ability to parse query strings was taken out of React Router v4 because there have been user requests over the years to support different implementation. So the decision has been given to users to choose the implementation they like. The recommended approach is to use query strings library.


    You can also use `URLSearchParams` if you want something native:


    You should use a _polyfill_ for IE11.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'routing', 'intermediate'],
    '{"source":"reference.md","section":"React Router","originalNum":84}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.522Z',
    '2025-11-18T20:44:53.522Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'Why you get "Router may have only one child element" warning?',
    '<pre><code>    &lt;Router&gt;
      &lt;Switch&gt;
        &lt;Route {/* ... */} /&gt;
        &lt;Route {/* ... */} /&gt;
      &lt;/Switch&gt;
    &lt;/Router&gt;</code></pre>

You have to wrap your Route''s in a `<Switch>` block because `<Switch>` is unique in that it renders a route exclusively.

    At first you need to add `Switch` to your imports:


    Then define the routes within `<Switch>` block:',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'You have to wrap your Route''s in a `<Switch>` block because `<Switch>` is unique in that it renders a route exclusively.

    At first you need to add `Switch` to your imports:


    Then define the routes within `<Switch>` block:',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'routing', 'intermediate'],
    '{"source":"reference.md","section":"React Router","originalNum":85}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.522Z',
    '2025-11-18T20:44:53.522Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How to pass params to `history.push` method in React Router v4?',
    '<pre><code>    this.props.history.push({
      pathname: &quot;/template&quot;,
      search: &quot;?name=sudheer&quot;,
      state: { detail: response.data },
    });</code></pre>

While navigating you can pass props to the `history` object:


    The `search` property is used to pass query params in `push()` method.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'While navigating you can pass props to the `history` object:


    The `search` property is used to pass query params in `push()` method.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'routing', 'intermediate'],
    '{"source":"reference.md","section":"React Router","originalNum":86}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.522Z',
    '2025-11-18T20:44:53.522Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How to implement _default_ or _NotFound_ page?',
    '<pre><code>    &lt;Switch&gt;
      &lt;Route exact path=&quot;/&quot; component={Home} /&gt;
      &lt;Route path=&quot;/user&quot; component={User} /&gt;
      &lt;Route component={NotFound} /&gt;
    &lt;/Switch&gt;</code></pre>

A `<Switch>` renders the first child `<Route>` that matches. A `<Route>` with no path always matches. So you just need to simply drop path attribute as below',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'A `<Switch>` renders the first child `<Route>` that matches. A `<Route>` with no path always matches. So you just need to simply drop path attribute as below',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'routing', 'intermediate'],
    '{"source":"reference.md","section":"React Router","originalNum":87}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.522Z',
    '2025-11-18T20:44:53.522Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How to get history on React Router v4?',
    '<pre><code>        // some-other-file.js
        import history from &quot;./history&quot;;

        history.push(&quot;/go-here&quot;);</code></pre>

Below are the list of steps to get history object on React Router v4,

    1.  Create a module that exports a `history` object and import this module across the project.

        For example, create `history.js` file:


    2.  You should use the `<Router>` component instead of built-in routers. Import the above `history.js` inside `index.js` file:


    3.  You can also use push method of `history` object similar to built-in history object:',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Below are the list of steps to get history object on React Router v4,

    1.  Create a module that exports a `history` object and import this module across the project.

        For example, create `history.js` file:


    2.  You should use the `<Router>` component instead of built-in routers. Import the above `history.js` inside `index.js` file:


    3.  You can also use push method of `history` object similar to built-in history object:',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'routing', 'intermediate'],
    '{"source":"reference.md","section":"React Router","originalNum":88}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.522Z',
    '2025-11-18T20:44:53.522Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How to perform automatic redirect after login?',
    '<pre><code>    import React, { Component } from &quot;react&quot;;
    import { Redirect } from &quot;react-router&quot;;

    export default class LoginComponent extends Component {
      render() {
        if (this.state.isLoggedIn === true) {
          return &lt;Redirect to=&quot;/your/redirect/page&quot; /&gt;;
        } else {
          return &lt;div&gt;{&quot;Login Please&quot;}&lt;/div&gt;;
        }
      }
    }</code></pre>

The `react-router` package provides `<Redirect>` component in React Router. Rendering a `<Redirect>` will navigate to a new location. Like server-side redirects, the new location will override the current location in the history stack.


      <p>


       </p>',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The `react-router` package provides `<Redirect>` component in React Router. Rendering a `<Redirect>` will navigate to a new location. Like server-side redirects, the new location will override the current location in the history stack.


      <p>


       </p>',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'routing', 'intermediate'],
    '{"source":"reference.md","section":"React Router","originalNum":89}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.522Z',
    '2025-11-18T20:44:53.522Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is React Intl?',
    'The _React Intl_ library makes internationalization in React straightforward, with off-the-shelf components and an API that can handle everything from formatting strings, dates, and numbers, to pluralization. React Intl is part of _FormatJS_ which provides bindings to React via its components and API.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The _React Intl_ library makes internationalization in React straightforward, with off-the-shelf components and an API that can handle everything from formatting strings, dates, and numbers, to pluralization. React Intl is part of _FormatJS_ which provides bindings to React via its components and API.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'i18n', 'intermediate'],
    '{"source":"reference.md","section":"React Internationalization","originalNum":90}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.522Z',
    '2025-11-18T20:44:53.522Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  );
