-- Batch 5: Questions 41-50 (10 questions)
INSERT INTO questions (
  id, title, content, type, difficulty, points, options, correct_answer, 
  explanation, test_cases, hints, tags, metadata, stats, category_id, 
  learning_card_id, is_active, created_at, updated_at, topic_id, time_limit
) VALUES (
    gen_random_uuid(),
    'What is ReactDOMServer?',
    '<pre><code>    // using Express
    import { renderToString } from &quot;react-dom/server&quot;;
    import MyPage from &quot;./MyPage&quot;;

    app.get(&quot;/&quot;, (req, res) =&gt; {
      res.write(
        &quot;&lt;!DOCTYPE html&gt;&lt;html&gt;&lt;head&gt;&lt;title&gt;My Page&lt;/title&gt;&lt;/head&gt;&lt;body&gt;&quot;
      );
      res.write(&#039;&lt;div id=&quot;content&quot;&gt;&#039;);
      res.write(renderToString(&lt;MyPage /&gt;));
      res.write(&quot;&lt;/div&gt;&lt;/body&gt;&lt;/html&gt;&quot;);
      res.end();
    });</code></pre>

The `ReactDOMServer` object enables you to render components to static markup (typically used on node server). This object is mainly used for _server-side rendering_ (SSR). The following methods can be used in both the server and browser environments:

    1. `renderToString()`
    2. `renderToStaticMarkup()`

    For example, you generally run a Node-based web server like Express, Hapi, or Koa, and you call `renderToString` to render your root component to a string, which you then send as response.',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'The `ReactDOMServer` object enables you to render components to static markup (typically used on node server). This object is mainly used for _server-side rendering_ (SSR). The following methods can be used in both the server and browser environments:

    1. `renderToString()`
    2. `renderToStaticMarkup()`

    For example, you generally run a Node-based web server like Express, Hapi, or Koa, and you call `renderToString` to render your root component to a string, which you then send as response.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":41}'::jsonb,
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
    'How to use innerHTML in React?',
    '<pre><code>    function createMarkup() {
      return { __html: &quot;First &amp;middot; Second&quot; };
    }

    function MyComponent() {
      return &lt;div dangerouslySetInnerHTML={createMarkup()} /&gt;;
    }</code></pre>

The `dangerouslySetInnerHTML` attribute is React''s replacement for using `innerHTML` in the browser DOM. Just like `innerHTML`, it is risky to use this attribute considering cross-site scripting (XSS) attacks. You just need to pass a `__html` object as key and HTML text as value.

    In this example MyComponent uses `dangerouslySetInnerHTML` attribute for setting HTML markup:',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'The `dangerouslySetInnerHTML` attribute is React''s replacement for using `innerHTML` in the browser DOM. Just like `innerHTML`, it is risky to use this attribute considering cross-site scripting (XSS) attacks. You just need to pass a `__html` object as key and HTML text as value.

    In this example MyComponent uses `dangerouslySetInnerHTML` attribute for setting HTML markup:',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":42}'::jsonb,
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
    'How to use styles in React?',
    '<pre><code>    const divStyle = {
      color: &quot;blue&quot;,
      backgroundImage: &quot;url(&quot; + imgUrl + &quot;)&quot;,
    };

    function HelloWorldComponent() {
      return &lt;div style={divStyle}&gt;Hello World!&lt;/div&gt;;
    }</code></pre>

The `style` attribute accepts a JavaScript object with camelCased properties rather than a CSS string. This is consistent with the DOM style JavaScript property, is more efficient, and prevents XSS security holes.


    Style keys are camelCased in order to be consistent with accessing the properties on DOM nodes in JavaScript (e.g. `node.style.backgroundImage`).',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'The `style` attribute accepts a JavaScript object with camelCased properties rather than a CSS string. This is consistent with the DOM style JavaScript property, is more efficient, and prevents XSS security holes.


    Style keys are camelCased in order to be consistent with accessing the properties on DOM nodes in JavaScript (e.g. `node.style.backgroundImage`).',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":43}'::jsonb,
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
    'How events are different in React?',
    'Handling events in React elements has some syntactic differences:

    1. React event handlers are named using camelCase, rather than lowercase.
    2. With JSX you pass a function as the event handler, rather than a string.',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'Handling events in React elements has some syntactic differences:

    1. React event handlers are named using camelCase, rather than lowercase.
    2. With JSX you pass a function as the event handler, rather than a string.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":44}'::jsonb,
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
    'What is the impact of indexes as keys?',
    '<pre><code>    {
      todos.map((todo) =&gt; &lt;Todo {...todo} key={todo.id} /&gt;);
    }</code></pre>

Keys should be stable, predictable, and unique so that React can keep track of elements.

    In the below code snippet each element''s key will be based on ordering, rather than tied to the data that is being represented. This limits the optimizations that React can do and creates confusing bugs in the application.


    If you use element data for unique key, assuming `todo.id` is unique to this list and stable, React would be able to reorder elements without needing to reevaluate them as much.


    **Note:** If you don''t specify `key` prop at all, React will use index as a key''s value while iterating over an array of data.',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'Keys should be stable, predictable, and unique so that React can keep track of elements.

    In the below code snippet each element''s key will be based on ordering, rather than tied to the data that is being represented. This limits the optimizations that React can do and creates confusing bugs in the application.


    If you use element data for unique key, assuming `todo.id` is unique to this list and stable, React would be able to reorder elements without needing to reevaluate them as much.


    **Note:** If you don''t specify `key` prop at all, React will use index as a key''s value while iterating over an array of data.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":45}'::jsonb,
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
    'How do you conditionally render components?',
    '<pre><code>    const MyComponent = ({ name, address }) =&gt; (
        &lt;h2&gt;{name}&lt;/h2&gt;
        {address ? &lt;p&gt;{address}&lt;/p&gt; : &lt;p&gt;{&quot;Address is not available&quot;}&lt;/p&gt;}
    );</code></pre>

In some cases you want to render different components depending on some state. JSX does not render `false` or `undefined`, so you can use conditional _short-circuiting_ to render a given part of your component only if a certain condition is true.


    If you need an `if-else` condition then use _ternary operator_.',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'In some cases you want to render different components depending on some state. JSX does not render `false` or `undefined`, so you can use conditional _short-circuiting_ to render a given part of your component only if a certain condition is true.


    If you need an `if-else` condition then use _ternary operator_.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":46}'::jsonb,
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
    'Why we need to be careful when spreading props on DOM elements?',
    '<pre><code>    const ComponentA = () =&gt; (
      &lt;ComponentB isDisplay={true} className={&quot;componentStyle&quot;} /&gt;
    );

    const ComponentB = ({ isDisplay, ...domProps }) =&gt; (
    );</code></pre>

When we _spread props_ we run into the risk of adding unknown HTML attributes, which is a bad practice. Instead we can use prop destructuring with `...rest` operator, so it will add only required props.

    For example,',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'When we _spread props_ we run into the risk of adding unknown HTML attributes, which is a bad practice. Instead we can use prop destructuring with `...rest` operator, so it will add only required props.

    For example,',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":47}'::jsonb,
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
    'How do you memoize a component?',
    '<pre><code>    const MemoComponent = React.memo(function MemoComponent(props) {
      /* render using props */
    });
    OR;
    export default React.memo(MyFunctionComponent);</code></pre>

There are memoize libraries available which can be used on function components.

    For example `moize` library can memoize the component in another component.


    **Update:** Since React v16.6.0, we have a `React.memo`. It provides a higher order component which memoizes component unless the props change. To use it, simply wrap the component using React.memo before you use it.',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'There are memoize libraries available which can be used on function components.

    For example `moize` library can memoize the component in another component.


    **Update:** Since React v16.6.0, we have a `React.memo`. It provides a higher order component which memoizes component unless the props change. To use it, simply wrap the component using React.memo before you use it.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":48}'::jsonb,
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
    'How you implement Server Side Rendering or SSR?',
    '<pre><code>    import ReactDOMServer from &quot;react-dom/server&quot;;
    import App from &quot;./App&quot;;

    ReactDOMServer.renderToString(&lt;App /&gt;);</code></pre>

React is already equipped to handle rendering on Node servers. A special version of the DOM renderer is available, which follows the same pattern as on the client side.


    This method will output the regular HTML as a string, which can be then placed inside a page body as part of the server response. On the client side, React detects the pre-rendered content and seamlessly picks up where it left off.',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'React is already equipped to handle rendering on Node servers. A special version of the DOM renderer is available, which follows the same pattern as on the client side.


    This method will output the regular HTML as a string, which can be then placed inside a page body as part of the server response. On the client side, React detects the pre-rendered content and seamlessly picks up where it left off.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":49}'::jsonb,
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
    'How to enable production mode in React?',
    'You should use Webpack''s `DefinePlugin` method to set `NODE_ENV` to `production`, by which it strip out things like propType validation and extra warnings. Apart from this, if you minify the code, for example, Uglify''s dead-code elimination to strip out development only code and comments, it will drastically reduce the size of your bundle.',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'You should use Webpack''s `DefinePlugin` method to set `NODE_ENV` to `production`, by which it strip out things like propType validation and extra warnings. Apart from this, if you minify the code, for example, Uglify''s dead-code elimination to strip out development only code and comments, it will drastically reduce the size of your bundle.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":50}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.522Z',
    '2025-11-18T20:44:53.522Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  );
