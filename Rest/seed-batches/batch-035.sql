-- Batch 35: Questions 341-350 (10 questions)
INSERT INTO questions (
  id, title, content, type, difficulty, points, options, correct_answer, 
  explanation, test_cases, hints, tags, metadata, stats, category_id, 
  learning_card_id, is_active, created_at, updated_at, topic_id, time_limit
) VALUES (
    gen_random_uuid(),
    'Can you force a component to re-render without calling setState?',
    '<pre><code>    component.forceUpdate(callback);</code></pre>

By default, when your component''s state or props change, your component will re-render. If your `render()` method depends on some other data, you can tell React that the component needs re-rendering by calling `forceUpdate()`.


    It is recommended to avoid all uses of `forceUpdate()` and only read from `this.props` and `this.state` in `render()`.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'By default, when your component''s state or props change, your component will re-render. If your `render()` method depends on some other data, you can tell React that the component needs re-rendering by calling `forceUpdate()`.


    It is recommended to avoid all uses of `forceUpdate()` and only read from `this.props` and `this.state` in `render()`.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":34}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is the difference between `super()` and `super(props)` in React using ES6 classes?',
    '<pre><code>    class MyComponent extends React.Component {
      constructor(props) {
        super();
        console.log(this.props); // undefined
      }
    }</code></pre>

When you want to access `this.props` in `constructor()` then you should pass props to `super()` method.

    **Using `super(props)`:**


    **Using `super()`:**


    Outside `constructor()` both will display same value for `this.props`.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'When you want to access `this.props` in `constructor()` then you should pass props to `super()` method.

    **Using `super(props)`:**


    **Using `super()`:**


    Outside `constructor()` both will display same value for `this.props`.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":35}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is the difference between `setState()` and `replaceState()` methods?',
    'When you use `setState()` the current and previous states are merged. `replaceState()` throws out the current state, and replaces it with only what you provide. Usually `setState()` is used unless you really need to remove all previous keys for some reason. You can also set state to `false`/`null` in `setState()` instead of using `replaceState()`.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'When you use `setState()` the current and previous states are merged. `replaceState()` throws out the current state, and replaces it with only what you provide. Usually `setState()` is used unless you really need to remove all previous keys for some reason. You can also set state to `false`/`null` in `setState()` instead of using `replaceState()`.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":36}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How to listen to state changes?',
    '<pre><code>    componentDidUpdate(object prevProps, object prevState)</code></pre>

The `componentDidUpdate` lifecycle method will be called when state changes. You can compare provided state and props values with current state and props to determine if something meaningful changed.


    **Note:** The previous releases of ReactJS also uses `componentWillUpdate(object nextProps, object nextState)` for state changes. It has been deprecated in latest releases.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The `componentDidUpdate` lifecycle method will be called when state changes. You can compare provided state and props values with current state and props to determine if something meaningful changed.


    **Note:** The previous releases of ReactJS also uses `componentWillUpdate(object nextProps, object nextState)` for state changes. It has been deprecated in latest releases.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":37}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is the recommended approach of removing an array element in React state?',
    '<pre><code>    removeItem(index) {
      this.setState({
        data: this.state.data.filter((item, i) =&gt; i !== index)
      })
    }</code></pre>

The better approach is to use `Array.prototype.filter()` method.

    For example, let''s create a `removeItem()` method for updating the state.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The better approach is to use `Array.prototype.filter()` method.

    For example, let''s create a `removeItem()` method for updating the state.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":38}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'Is it possible to use React without rendering HTML?',
    '<pre><code>    render() {
      return undefined
    }</code></pre>

It is possible. Below are the possible options:




    React version >=16.0.0:



    React version >=16.2.0:



    React version >=18.0.0:',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'It is possible. Below are the possible options:




    React version >=16.0.0:



    React version >=16.2.0:



    React version >=18.0.0:',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":39}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What are the possible ways of updating objects in state?',
    '<pre><code>        this.setState((prevState) =&gt; ({
          user: {
            ...prevState.user,
            age: 42,
          },
        }));</code></pre>

1.  **Calling `setState()` with an object to merge with state:**

        - Using `Object.assign()` to create a copy of the object:


        - Using _spread operator_:


    2.  **Calling `setState()` with a function:**',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    '1.  **Calling `setState()` with an object to merge with state:**

        - Using `Object.assign()` to create a copy of the object:


        - Using _spread operator_:


    2.  **Calling `setState()` with a function:**',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":40}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What are the approaches to include polyfills in your `create-react-app`?',
    '<pre><code>        &lt;script src=&quot;https://cdn.polyfill.io/v2/polyfill.min.js?features=default,Array.prototype.includes&quot;&gt;&lt;/script&gt;</code></pre>

There are approaches to include polyfills in create-react-app,

    1.  **Manual import from `core-js`:**

        Create a file called (something like) `polyfills.js` and import it into root `index.js` file. Run `npm install core-js` or `yarn add core-js` and import your specific required features.


    2.  **Using Polyfill service:**

        Use the polyfill.io CDN to retrieve custom, browser-specific polyfills by adding this line to `index.html`:


        In the above script we had to explicitly request the `Array.prototype.includes` feature as it is not included in the default feature set.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'There are approaches to include polyfills in create-react-app,

    1.  **Manual import from `core-js`:**

        Create a file called (something like) `polyfills.js` and import it into root `index.js` file. Run `npm install core-js` or `yarn add core-js` and import your specific required features.


    2.  **Using Polyfill service:**

        Use the polyfill.io CDN to retrieve custom, browser-specific polyfills by adding this line to `index.html`:


        In the above script we had to explicitly request the `Array.prototype.includes` feature as it is not included in the default feature set.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":41}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How to use https instead of http in create-react-app?',
    '<pre><code>    &quot;scripts&quot;: {
      &quot;start&quot;: &quot;set HTTPS=true &amp;&amp; react-scripts start&quot;
    }</code></pre>

You just need to use `HTTPS=true` configuration. You can edit your `package.json` scripts section:


    or just run `set HTTPS=true && npm start`',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'You just need to use `HTTPS=true` configuration. You can edit your `package.json` scripts section:


    or just run `set HTTPS=true && npm start`',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":42}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How to avoid using relative path imports in create-react-app?',
    '<pre><code>    NODE_PATH=src/app</code></pre>

Create a file called `.env` in the project root and write the import path:


    After that restart the development server. Now you should be able to import anything inside `src/app` without relative paths.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Create a file called `.env` in the project root and write the import path:


    After that restart the development server. Now you should be able to import anything inside `src/app` without relative paths.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":43}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  );
