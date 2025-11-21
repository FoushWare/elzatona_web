-- Batch 36: Questions 351-360 (10 questions)
INSERT INTO questions (
  id, title, content, type, difficulty, points, options, correct_answer, 
  explanation, test_cases, hints, tags, metadata, stats, category_id, 
  learning_card_id, is_active, created_at, updated_at, topic_id, time_limit
) VALUES (
    gen_random_uuid(),
    'How to update a component every second?',
    '<pre><code>    componentDidMount() {
      this.interval = setInterval(() =&gt; this.setState({ time: Date.now() }), 1000)
    }

    componentWillUnmount() {
      clearInterval(this.interval)
    }</code></pre>

You need to use `setInterval()` to trigger the change, but you also need to clear the timer when the component unmounts to prevent errors and memory leaks.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'You need to use `setInterval()` to trigger the change, but you also need to clear the timer when the component unmounts to prevent errors and memory leaks.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":44}'::jsonb,
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
    'Why is a component constructor called only once?',
    'React''s _reconciliation_ algorithm assumes that without any information to the contrary, if a custom component appears in the same place on subsequent renders, it''s the same component as before, so reuses the previous instance rather than creating a new one.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'React''s _reconciliation_ algorithm assumes that without any information to the contrary, if a custom component appears in the same place on subsequent renders, it''s the same component as before, so reuses the previous instance rather than creating a new one.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":45}'::jsonb,
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
    'How to define constants in React?',
    '<pre><code>    class MyComponent extends React.Component {
      static DEFAULT_PAGINATION = 10;
    }</code></pre>

You can use ES7 `static` field to define constant.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'You can use ES7 `static` field to define constant.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":46}'::jsonb,
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
    'How to programmatically trigger click event in React?',
    '<pre><code>        this.inputElement.click();</code></pre>

You could use the ref prop to acquire a reference to the underlying `HTMLInputElement` object through a callback, store the reference as a class property, then use that reference to later trigger a click from your event handlers using the `HTMLElement.click` method.

    This can be done in two steps:

    1.  Create ref in render method:


    2.  Apply click event in your event handler:',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'You could use the ref prop to acquire a reference to the underlying `HTMLInputElement` object through a callback, store the reference as a class property, then use that reference to later trigger a click from your event handlers using the `HTMLElement.click` method.

    This can be done in two steps:

    1.  Create ref in render method:


    2.  Apply click event in your event handler:',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":47}'::jsonb,
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
    'How to make AJAX call and in which component lifecycle methods should I make an AJAX call?',
    '<pre><code>    class MyComponent extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          employees: [],
          error: null,
        };
      }

      componentDidMount() {
        fetch(&quot;https://api.example.com/items&quot;)
          .then((res) =&gt; res.json())
          .then(
            (result) =&gt; {
              this.setState({
                employees: result.employees,
              });
            },
            (error) =&gt; {
              this.setState({ error });
            }
          );
      }

      render() {
        const { error, employees } = this.state;
        if (error) {
          return &lt;div&gt;Error: {error.message}&lt;/div&gt;;
        } else {
          return (
            &lt;ul&gt;
              {employees.map((employee) =&gt; (
                &lt;li key={employee.name}&gt;
                  {employee.name}-{employee.experience}
                &lt;/li&gt;
              ))}
            &lt;/ul&gt;
          );
        }
      }
    }</code></pre>

You can use AJAX libraries such as Axios, jQuery AJAX, and the browser built-in `fetch`. You should fetch data in the `componentDidMount()` lifecycle method. This is so you can use `setState()` to update your component when the data is retrieved.

    For example, the employees list fetched from API and set local state:',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'You can use AJAX libraries such as Axios, jQuery AJAX, and the browser built-in `fetch`. You should fetch data in the `componentDidMount()` lifecycle method. This is so you can use `setState()` to update your component when the data is retrieved.

    For example, the employees list fetched from API and set local state:',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":48}'::jsonb,
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
    'What are render props?',
    '<pre><code>    &lt;DataProvider render={(data) =&gt; &lt;h1&gt;{`Hello ${data.target}`}&lt;/h1&gt;} /&gt;</code></pre>

**Render Props** is a simple technique for sharing code between components using a prop whose value is a function. The below component uses render prop which returns a React element.


    Libraries such as React Router and DownShift are using this pattern.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    '**Render Props** is a simple technique for sharing code between components using a prop whose value is a function. The below component uses render prop which returns a React element.


    Libraries such as React Router and DownShift are using this pattern.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":49}'::jsonb,
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
    'How to dispatch an action on load?',
    '<pre><code>    class App extends Component {
      componentDidMount() {
        this.props.fetchData();
      }

      render() {
        return this.props.isLoaded ? (
        ) : (
        );
      }
    }

    const mapStateToProps = (state) =&gt; ({
      isLoaded: state.isLoaded,
    });

    const mapDispatchToProps = { fetchData };

    export default connect(mapStateToProps, mapDispatchToProps)(App);</code></pre>

You can dispatch an action in `componentDidMount()` method and in `render()` method you can verify the data.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'You can dispatch an action in `componentDidMount()` method and in `render()` method you can verify the data.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":50}'::jsonb,
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
    'How to use `connect()` from React Redux?',
    '<pre><code>        import React from &quot;react&quot;;
        import { connect } from &quot;react-redux&quot;;

        class App extends React.Component {
          render() {
            return &lt;div&gt;{this.props.containerData}&lt;/div&gt;;
          }
        }

        function mapStateToProps(state) {
          return { containerData: state.data };
        }

        export default connect(mapStateToProps)(App);</code></pre>

You need to follow two steps to use your store in your container:

    1.  **Use `mapStateToProps()`:** It maps the state variables from your store to the props that you specify.
    2.  **Connect the above props to your container:** The object returned by the `mapStateToProps` function is connected to the container. You can import `connect()` from `react-redux`.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'You need to follow two steps to use your store in your container:

    1.  **Use `mapStateToProps()`:** It maps the state variables from your store to the props that you specify.
    2.  **Connect the above props to your container:** The object returned by the `mapStateToProps` function is connected to the container. You can import `connect()` from `react-redux`.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":51}'::jsonb,
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
    'Whats the purpose of `at` symbol in the Redux connect decorator?',
    '<pre><code>      import React from &quot;react&quot;;
      import * as actionCreators from &quot;./actionCreators&quot;;
      import { bindActionCreators } from &quot;redux&quot;;
      import { connect } from &quot;react-redux&quot;;

      function mapStateToProps(state) {
        return { todos: state.todos };
      }

      function mapDispatchToProps(dispatch) {
        return { actions: bindActionCreators(actionCreators, dispatch) };
      }

      @connect(mapStateToProps, mapDispatchToProps)
      export default class MyApp extends React.Component {
        // ...define your main app here
      }</code></pre>

The **@** symbol is in fact a JavaScript expression used to signify decorators. _Decorators_ make it possible to annotate and modify classes and properties at design time.

    Let''s take an example setting up Redux without and with a decorator.

    - **Without decorator:**


    - **With decorator:**


    The above examples are almost similar except the usage of decorator. The decorator syntax isn''t built into any JavaScript runtimes yet, and is still experimental and subject to change. You can use babel for the decorators support.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The **@** symbol is in fact a JavaScript expression used to signify decorators. _Decorators_ make it possible to annotate and modify classes and properties at design time.

    Let''s take an example setting up Redux without and with a decorator.

    - **Without decorator:**


    - **With decorator:**


    The above examples are almost similar except the usage of decorator. The decorator syntax isn''t built into any JavaScript runtimes yet, and is still experimental and subject to change. You can use babel for the decorators support.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":52}'::jsonb,
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
    'How to use TypeScript in `create-react-app` application?',
    '<pre><code>         my-app/
         ├─ .gitignore
         ├─ images.d.ts
         ├─ node_modules/
         ├─ public/
         ├─ src/
         │  └─ ...
         ├─ package.json
         ├─ tsconfig.json
         ├─ tsconfig.prod.json
         ├─ tsconfig.test.json
         └─ tslint.json</code></pre>

Starting from react-scripts@3.3.0+ releases onwards, you can now optionally start a new app from a template by appending `--template [template-name]` to the creation command. If you don''t select a template, it will create your project with base template. Remember that templates are always named in the format `cra-template-[template-name]`, here you only need to fill the `[template-name]` section.

        The typeScript can be used in your project by appending `--template typescript` to the creation command.


        But if you are using React Scripting between react-scripts@2.1.0 and react-scripts@3.2.x , there is a built-in support for TypeScript. i.e, `create-react-app` now supports TypeScript natively. You can just pass `--typescript` option as below


         Whereas for lower versions of react scripts, just supply `--scripts-version` option as `react-scripts-ts` while you create a new project. `react-scripts-ts` is a set of adjustments to take the standard `create-react-app` project pipeline and bring TypeScript into the mix.

         Now the project layout should look like the following:',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Starting from react-scripts@3.3.0+ releases onwards, you can now optionally start a new app from a template by appending `--template [template-name]` to the creation command. If you don''t select a template, it will create your project with base template. Remember that templates are always named in the format `cra-template-[template-name]`, here you only need to fill the `[template-name]` section.

        The typeScript can be used in your project by appending `--template typescript` to the creation command.


        But if you are using React Scripting between react-scripts@2.1.0 and react-scripts@3.2.x , there is a built-in support for TypeScript. i.e, `create-react-app` now supports TypeScript natively. You can just pass `--typescript` option as below


         Whereas for lower versions of react scripts, just supply `--scripts-version` option as `react-scripts-ts` while you create a new project. `react-scripts-ts` is a set of adjustments to take the standard `create-react-app` project pipeline and bring TypeScript into the mix.

         Now the project layout should look like the following:',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":53}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  );
