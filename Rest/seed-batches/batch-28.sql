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
      '',
      'You need to use `setInterval()` to trigger the change, but you also need to clear the timer when the component unmounts to prevent errors and memory leaks.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":44}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.313Z',
      '2025-11-18T18:46:59.313Z',
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
      '',
      'React''s _reconciliation_ algorithm assumes that without any information to the contrary, if a custom component appears in the same place on subsequent renders, it''s the same component as before, so reuses the previous instance rather than creating a new one.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":45}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.313Z',
      '2025-11-18T18:46:59.313Z',
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
      '',
      'You can use ES7 `static` field to define constant.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":46}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.314Z',
      '2025-11-18T18:46:59.314Z',
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
      '',
      'You could use the ref prop to acquire a reference to the underlying `HTMLInputElement` object through a callback, store the reference as a class property, then use that reference to later trigger a click from your event handlers using the `HTMLElement.click` method.

    This can be done in two steps:

    1.  Create ref in render method:


    2.  Apply click event in your event handler:',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":47}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.314Z',
      '2025-11-18T18:46:59.314Z',
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
      '',
      'You can use AJAX libraries such as Axios, jQuery AJAX, and the browser built-in `fetch`. You should fetch data in the `componentDidMount()` lifecycle method. This is so you can use `setState()` to update your component when the data is retrieved.

    For example, the employees list fetched from API and set local state:',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":48}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.314Z',
      '2025-11-18T18:46:59.314Z',
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
      '',
      '**Render Props** is a simple technique for sharing code between components using a prop whose value is a function. The below component uses render prop which returns a React element.


    Libraries such as React Router and DownShift are using this pattern.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":49}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.314Z',
      '2025-11-18T18:46:59.314Z',
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
      '',
      'You can dispatch an action in `componentDidMount()` method and in `render()` method you can verify the data.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":50}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.314Z',
      '2025-11-18T18:46:59.314Z',
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
      '',
      'You need to follow two steps to use your store in your container:

    1.  **Use `mapStateToProps()`:** It maps the state variables from your store to the props that you specify.
    2.  **Connect the above props to your container:** The object returned by the `mapStateToProps` function is connected to the container. You can import `connect()` from `react-redux`.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":51}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.314Z',
      '2025-11-18T18:46:59.314Z',
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
      '',
      'The **@** symbol is in fact a JavaScript expression used to signify decorators. _Decorators_ make it possible to annotate and modify classes and properties at design time.

    Let''s take an example setting up Redux without and with a decorator.

    - **Without decorator:**


    - **With decorator:**


    The above examples are almost similar except the usage of decorator. The decorator syntax isn''t built into any JavaScript runtimes yet, and is still experimental and subject to change. You can use babel for the decorators support.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":52}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.314Z',
      '2025-11-18T18:46:59.314Z',
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
      '',
      'Starting from react-scripts@3.3.0+ releases onwards, you can now optionally start a new app from a template by appending `--template [template-name]` to the creation command. If you don''t select a template, it will create your project with base template. Remember that templates are always named in the format `cra-template-[template-name]`, here you only need to fill the `[template-name]` section.

        The typeScript can be used in your project by appending `--template typescript` to the creation command.


        But if you are using React Scripting between react-scripts@2.1.0 and react-scripts@3.2.x , there is a built-in support for TypeScript. i.e, `create-react-app` now supports TypeScript natively. You can just pass `--typescript` option as below


         Whereas for lower versions of react scripts, just supply `--scripts-version` option as `react-scripts-ts` while you create a new project. `react-scripts-ts` is a set of adjustments to take the standard `create-react-app` project pipeline and bring TypeScript into the mix.

         Now the project layout should look like the following:',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":53}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.314Z',
      '2025-11-18T18:46:59.314Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'Does the statics object work with ES6 classes in React?',
      '<pre><code>    class Component extends React.Component {
       ....
    }

    Component.propTypes = {...}
    Component.someMethod = function(){....}</code></pre>

No, `statics` only works with `React.createClass()`:


    But you can write statics inside ES6+ classes as below,


    or writing them outside class as below,',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'No, `statics` only works with `React.createClass()`:


    But you can write statics inside ES6+ classes as below,


    or writing them outside class as below,',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":54}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.314Z',
      '2025-11-18T18:46:59.314Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'Why are inline ref callbacks or functions not recommended?',
      '<pre><code>    class UserForm extends Component {
      handleSubmit = () =&gt; {
        console.log(&quot;Input Value is: &quot;, this.input.value);
      };

      setSearchInput = (input) =&gt; {
        this.input = input;
      };

      render() {
        return (
          &lt;form onSubmit={this.handleSubmit}&gt;
            &lt;input type=&quot;text&quot; ref={this.setSearchInput} /&gt; // Access DOM input
            in handle submit
            &lt;button type=&quot;submit&quot;&gt;Submit&lt;/button&gt;
          &lt;/form&gt;
        );
      }
    }</code></pre>

If the ref callback is defined as an inline function, it will get called twice during updates, first with null and then again with the DOM element. This is because a new instance of the function is created with each render, so React needs to clear the old ref and set up the new one.


    But our expectation is for the ref callback to get called once, when the component mounts. One quick fix is to use the ES7 class property syntax to define the function',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'If the ref callback is defined as an inline function, it will get called twice during updates, first with null and then again with the DOM element. This is because a new instance of the function is created with each render, so React needs to clear the old ref and set up the new one.


    But our expectation is for the ref callback to get called once, when the component mounts. One quick fix is to use the ES7 class property syntax to define the function',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":55}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.314Z',
      '2025-11-18T18:46:59.314Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What are HOC factory implementations?',
      '<pre><code>    function iiHOC(WrappedComponent) {
      return class Enhancer extends WrappedComponent {
        render() {
          return super.render();
        }
      };
    }</code></pre>

There are two main ways of implementing HOCs in React.

    1.  Props Proxy (PP) and
    2.  Inheritance Inversion (II).

    But they follow different approaches for manipulating the _WrappedComponent_.

    **Props Proxy**

    In this approach, the render method of the HOC returns a React Element of the type of the WrappedComponent. We also pass through the props that the HOC receives, hence the name **Props Proxy**.


    **Inheritance Inversion**

    In this approach, the returned HOC class (Enhancer) extends the WrappedComponent. It is called Inheritance Inversion because instead of the WrappedComponent extending some Enhancer class, it is passively extended by the Enhancer. In this way the relationship between them seems **inverse**.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'There are two main ways of implementing HOCs in React.

    1.  Props Proxy (PP) and
    2.  Inheritance Inversion (II).

    But they follow different approaches for manipulating the _WrappedComponent_.

    **Props Proxy**

    In this approach, the render method of the HOC returns a React Element of the type of the WrappedComponent. We also pass through the props that the HOC receives, hence the name **Props Proxy**.


    **Inheritance Inversion**

    In this approach, the returned HOC class (Enhancer) extends the WrappedComponent. It is called Inheritance Inversion because instead of the WrappedComponent extending some Enhancer class, it is passively extended by the Enhancer. In this way the relationship between them seems **inverse**.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":56}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.314Z',
      '2025-11-18T18:46:59.314Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'How to use class field declarations syntax in React classes?',
      '<pre><code>    class Counter extends Component {
      state = { value: 0 };

      handleIncrement = () =&gt; {
        this.setState((prevState) =&gt; ({
          value: prevState.value + 1,
        }));
      };

      handleDecrement = () =&gt; {
        this.setState((prevState) =&gt; ({
          value: prevState.value - 1,
        }));
      };

      render() {
        return (
            {this.state.value}

            &lt;button onClick={this.handleIncrement}&gt;+&lt;/button&gt;
            &lt;button onClick={this.handleDecrement}&gt;-&lt;/button&gt;
        );
      }
    }</code></pre>

React Class Components can be made much more concise using the class field declarations. You can initialize the local state without using the constructor and declare class methods by using arrow functions without the extra need to bind them.

    Let''s take a counter example to demonstrate class field declarations for state without using constructor and methods without binding,',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'React Class Components can be made much more concise using the class field declarations. You can initialize the local state without using the constructor and declare class methods by using arrow functions without the extra need to bind them.

    Let''s take a counter example to demonstrate class field declarations for state without using constructor and methods without binding,',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":57}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.314Z',
      '2025-11-18T18:46:59.314Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'Why do you not need error boundaries for event handlers?',
      '<pre><code>    class MyComponent extends React.Component {
      constructor(props) {
        super(props);
        this.state = { error: null };
        this.handleClick = this.handleClick.bind(this);
      }

      handleClick() {
        try {
          // Do something that could throw
        } catch (error) {
          this.setState({ error });
        }
      }

      render() {
        if (this.state.error) {
          return &lt;h1&gt;Caught an error.&lt;/h1&gt;;
        }
        return &lt;button onClick={this.handleClick}&gt;Click Me&lt;/button&gt;;
      }
    }</code></pre>

Error boundaries do not catch errors inside event handlers.

    React doesn’t need error boundaries to recover from errors in event handlers. Unlike the render method and lifecycle methods, the event handlers don’t happen during rendering. So if they throw, React still knows what to display on the screen.

    If you need to catch an error inside an event handler, use the regular JavaScript try / catch statement:


    Note that the above example is demonstrating regular JavaScript behavior and doesn’t use error boundaries.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'Error boundaries do not catch errors inside event handlers.

    React doesn’t need error boundaries to recover from errors in event handlers. Unlike the render method and lifecycle methods, the event handlers don’t happen during rendering. So if they throw, React still knows what to display on the screen.

    If you need to catch an error inside an event handler, use the regular JavaScript try / catch statement:


    Note that the above example is demonstrating regular JavaScript behavior and doesn’t use error boundaries.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":58}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.314Z',
      '2025-11-18T18:46:59.314Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What is the difference between try catch block and error boundaries?',
      '<pre><code>    &lt;ErrorBoundary&gt;
      &lt;MyComponent /&gt;
    &lt;/ErrorBoundary&gt;</code></pre>

Try catch block works with imperative code whereas error boundaries are meant for declarative code to render on the screen.

    For example, the try catch block used for below imperative code


    Whereas error boundaries wrap declarative code as below,


    So if an error occurs in a **componentDidUpdate** method caused by a **setState** somewhere deep in the tree, it will still correctly propagate to the closest error boundary.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'Try catch block works with imperative code whereas error boundaries are meant for declarative code to render on the screen.

    For example, the try catch block used for below imperative code


    Whereas error boundaries wrap declarative code as below,


    So if an error occurs in a **componentDidUpdate** method caused by a **setState** somewhere deep in the tree, it will still correctly propagate to the closest error boundary.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":59}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.314Z',
      '2025-11-18T18:46:59.314Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What is the required method to be defined for a class component?',
      'The `render()` method is the only required method in a class component. i.e, All methods other than render method are optional for a class component.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'The `render()` method is the only required method in a class component. i.e, All methods other than render method are optional for a class component.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":60}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.314Z',
      '2025-11-18T18:46:59.314Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What are the possible return types of render method?',
      'Below are the list of following types used and return from render method,

    1.  **React elements:** Elements that instruct React to render a DOM node. It includes html elements such as `<div/>` and user defined elements.
    2.  **Arrays and fragments:** Return multiple elements to render as Arrays and Fragments to wrap multiple elements
    3.  **Portals:** Render children into a different DOM subtree.
    4.  **String and numbers:** Render both Strings and Numbers as text nodes in the DOM
    5.  **Booleans or null:** Doesn''t render anything but these types are used to conditionally render content.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'Below are the list of following types used and return from render method,

    1.  **React elements:** Elements that instruct React to render a DOM node. It includes html elements such as `<div/>` and user defined elements.
    2.  **Arrays and fragments:** Return multiple elements to render as Arrays and Fragments to wrap multiple elements
    3.  **Portals:** Render children into a different DOM subtree.
    4.  **String and numbers:** Render both Strings and Numbers as text nodes in the DOM
    5.  **Booleans or null:** Doesn''t render anything but these types are used to conditionally render content.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":61}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.314Z',
      '2025-11-18T18:46:59.314Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What is the main purpose of constructor?',
      '<pre><code>    constructor(props) {
      super(props);
      // Don&#039;t call this.setState() here!
      this.state = { counter: 0 };
      this.handleClick = this.handleClick.bind(this);
    }</code></pre>

The constructor is mainly used for two purposes,

    1.  To initialize local state by assigning object to this.state
    2.  For binding event handler methods to the instance
        For example, the below code covers both the above cases,',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'The constructor is mainly used for two purposes,

    1.  To initialize local state by assigning object to this.state
    2.  For binding event handler methods to the instance
        For example, the below code covers both the above cases,',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":62}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.314Z',
      '2025-11-18T18:46:59.314Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'Is it mandatory to define constructor for React component?',
      'No, it is not mandatory. i.e, If you don’t initialize state and you don’t bind methods, you don’t need to implement a constructor for your React component.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'No, it is not mandatory. i.e, If you don’t initialize state and you don’t bind methods, you don’t need to implement a constructor for your React component.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":63}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.314Z',
      '2025-11-18T18:46:59.314Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'Why should not call setState in componentWillUnmount?',
      'You should not call `setState()` in `componentWillUnmount()` because once a component instance is unmounted, it will never be mounted again.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'You should not call `setState()` in `componentWillUnmount()` because once a component instance is unmounted, it will never be mounted again.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":64}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.314Z',
      '2025-11-18T18:46:59.314Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What is the purpose of getDerivedStateFromError?',
      '<pre><code>    class ErrorBoundary extends React.Component {
      constructor(props) {
        super(props);
        this.state = { hasError: false };
      }

      static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
      }

      render() {
        if (this.state.hasError) {
          // You can render any custom fallback UI
          return &lt;h1&gt;Something went wrong.&lt;/h1&gt;;
        }

        return this.props.children;
      }
    }</code></pre>

This lifecycle method is invoked after an error has been thrown by a descendant component. It receives the error that was thrown as a parameter and should return a value to update state.

    The signature of the lifecycle method is as follows,


    Let us take error boundary use case with the above lifecycle method for demonstration purpose,',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'This lifecycle method is invoked after an error has been thrown by a descendant component. It receives the error that was thrown as a parameter and should return a value to update state.

    The signature of the lifecycle method is as follows,


    Let us take error boundary use case with the above lifecycle method for demonstration purpose,',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":65}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.314Z',
      '2025-11-18T18:46:59.314Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What is the methods order when component re-rendered?',
      'An update can be caused by changes to props or state. The below methods are called in the following order when a component is being re-rendered.

    1.  static getDerivedStateFromProps()
    2.  shouldComponentUpdate()
    3.  render()
    4.  getSnapshotBeforeUpdate()
    5.  componentDidUpdate()',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'An update can be caused by changes to props or state. The below methods are called in the following order when a component is being re-rendered.

    1.  static getDerivedStateFromProps()
    2.  shouldComponentUpdate()
    3.  render()
    4.  getSnapshotBeforeUpdate()
    5.  componentDidUpdate()',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":66}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.314Z',
      '2025-11-18T18:46:59.314Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What are the methods invoked during error handling?',
      'Below methods are called when there is an error during rendering, in a lifecycle method, or in the constructor of any child component.

    1.  static getDerivedStateFromError()
    2.  componentDidCatch()',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'Below methods are called when there is an error during rendering, in a lifecycle method, or in the constructor of any child component.

    1.  static getDerivedStateFromError()
    2.  componentDidCatch()',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":67}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.314Z',
      '2025-11-18T18:46:59.314Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What is the purpose of unmountComponentAtNode method?',
      '<pre><code>    ReactDOM.unmountComponentAtNode(container);</code></pre>

This method is available from react-dom package and it removes a mounted React component from the DOM and clean up its event handlers and state. If no component was mounted in the container, calling this function does nothing. Returns true if a component was unmounted and false if there was no component to unmount.

    The method signature would be as follows,',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'This method is available from react-dom package and it removes a mounted React component from the DOM and clean up its event handlers and state. If no component was mounted in the container, calling this function does nothing. Returns true if a component was unmounted and false if there was no component to unmount.

    The method signature would be as follows,',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":68}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.314Z',
      '2025-11-18T18:46:59.314Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What are the limitations with HOCs?',
      '<pre><code>        function enhance(WrappedComponent) {
          class Enhance extends React.Component {
            /*...*/
          }
          // Must know exactly which method(s) to copy :(
          Enhance.staticMethod = WrappedComponent.staticMethod;
          return Enhance;
        }</code></pre>

Higher-order components come with a few caveats apart from its benefits. Below are the few listed in an order,

    1.  **Don’t use HOCs inside the render method:**
        It is not recommended to apply a HOC to a component within the render method of a component.


        The above code impacts on performance by remounting a component that causes the state of that component and all of its children to be lost. Instead, apply HOCs outside the component definition so that the resulting component is created only once.

    2.  **Static methods must be copied over:**
        When you apply a HOC to a component the new component does not have any of the static methods of the original component


        You can overcome this by copying the methods onto the container before returning it,


    3.  **Refs aren’t passed through:**
        For HOCs you need to pass through all props to the wrapped component but this does not work for refs. This is because ref is not really a prop similar to key. In this case you need to use the React.forwardRef API',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'Higher-order components come with a few caveats apart from its benefits. Below are the few listed in an order,

    1.  **Don’t use HOCs inside the render method:**
        It is not recommended to apply a HOC to a component within the render method of a component.


        The above code impacts on performance by remounting a component that causes the state of that component and all of its children to be lost. Instead, apply HOCs outside the component definition so that the resulting component is created only once.

    2.  **Static methods must be copied over:**
        When you apply a HOC to a component the new component does not have any of the static methods of the original component


        You can overcome this by copying the methods onto the container before returning it,


    3.  **Refs aren’t passed through:**
        For HOCs you need to pass through all props to the wrapped component but this does not work for refs. This is because ref is not really a prop similar to key. In this case you need to use the React.forwardRef API',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":69}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.314Z',
      '2025-11-18T18:46:59.314Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'How to debug forwardRefs in DevTools?',
      '<pre><code>    function logProps(Component) {
      class LogProps extends React.Component {
        // ...
      }

      function forwardRef(props, ref) {
        return &lt;LogProps {...props} forwardedRef={ref} /&gt;;
      }

      // Give this component a more helpful display name in DevTools.
      // e.g. &quot;ForwardRef(logProps(MyComponent))&quot;
      const name = Component.displayName || Component.name;
      forwardRef.displayName = `logProps(${name})`;

      return React.forwardRef(forwardRef);
    }</code></pre>

**React.forwardRef** accepts a render function as parameter and DevTools uses this function to determine what to display for the ref forwarding component.

    For example, If you don''t name the render function or not using displayName property then it will appear as ”ForwardRef” in the DevTools,


    But If you name the render function then it will appear as **”ForwardRef(myFunction)”**


    As an alternative, You can also set displayName property for forwardRef function,',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      '**React.forwardRef** accepts a render function as parameter and DevTools uses this function to determine what to display for the ref forwarding component.

    For example, If you don''t name the render function or not using displayName property then it will appear as ”ForwardRef” in the DevTools,


    But If you name the render function then it will appear as **”ForwardRef(myFunction)”**


    As an alternative, You can also set displayName property for forwardRef function,',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":70}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.314Z',
      '2025-11-18T18:46:59.314Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'Is it good to use arrow functions in render methods?',
      '<pre><code>    class Foo extends Component {
      handleClick() {
        console.log(&quot;Click happened&quot;);
      }
      render() {
        return &lt;button onClick={() =&gt; this.handleClick()}&gt;Click Me&lt;/button&gt;;
      }
    }</code></pre>

Yes, You can use. It is often the easiest way to pass parameters to callback functions. But you need to optimize the performance while using it.


    **Note:** Using an arrow function in render method creates a new function each time the component renders, which may have performance implications',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'Yes, You can use. It is often the easiest way to pass parameters to callback functions. But you need to optimize the performance while using it.


    **Note:** Using an arrow function in render method creates a new function each time the component renders, which may have performance implications',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":71}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.314Z',
      '2025-11-18T18:46:59.314Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'How do you say that state updates are merged?',
      '<pre><code>     componentDidMount() {
        fetchPosts().then(response =&gt; {
          this.setState({
            posts: response.posts
          });
        });

        fetchComments().then(response =&gt; {
          this.setState({
            comments: response.comments
          });
        });
      }</code></pre>

When you call setState() in the component, React merges the object you provide into the current state.

    For example, let us take a facebook user with posts and comments details as state variables,


    Now you can update them independently with separate `setState()` calls as below,


    As mentioned in the above code snippets, `this.setState({comments})` updates only comments variable without modifying or replacing `posts` variable.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'When you call setState() in the component, React merges the object you provide into the current state.

    For example, let us take a facebook user with posts and comments details as state variables,


    Now you can update them independently with separate `setState()` calls as below,


    As mentioned in the above code snippets, `this.setState({comments})` updates only comments variable without modifying or replacing `posts` variable.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":72}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.314Z',
      '2025-11-18T18:46:59.314Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'How do you pass arguments to an event handler?',
      '<pre><code>    &lt;button onClick={(e) =&gt; this.updateUser(userId, e)}&gt;Update User details&lt;/button&gt;
    &lt;button onClick={this.updateUser.bind(this, userId)}&gt;Update User details&lt;/button&gt;</code></pre>

During iterations or loops, it is common to pass an extra parameter to an event handler. This can be achieved through arrow functions or bind method.

    Let us take an example of user details updated in a grid,


    In the both approaches, the synthetic argument `e` is passed as a second argument. You need to pass it explicitly for arrow functions and it will be passed automatically for `bind` method.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'During iterations or loops, it is common to pass an extra parameter to an event handler. This can be achieved through arrow functions or bind method.

    Let us take an example of user details updated in a grid,


    In the both approaches, the synthetic argument `e` is passed as a second argument. You need to pass it explicitly for arrow functions and it will be passed automatically for `bind` method.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":73}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.314Z',
      '2025-11-18T18:46:59.314Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'How to prevent component from rendering?',
      '<pre><code>    class User extends React.Component {
      constructor(props) {
        super(props);
        this.state = {loggedIn: false, name: &#039;John&#039;};
      }

      render() {
       return (
             //Prevent component render if it is not loggedIn
             &lt;Greeting loggedIn={this.state.loggedIn} /&gt;
             &lt;UserDetails name={this.state.name}&gt;
       );
      }</code></pre>

You can prevent component from rendering by returning null based on specific condition. This way it can conditionally render component.



    In the above example, the `greeting` component skips its rendering section by applying condition and returning null value.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'You can prevent component from rendering by returning null based on specific condition. This way it can conditionally render component.



    In the above example, the `greeting` component skips its rendering section by applying condition and returning null value.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":74}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.314Z',
      '2025-11-18T18:46:59.314Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'Give an example on How to use context?',
      '<pre><code>    //Lets create a context with a default theme value &quot;luna&quot;
    const ThemeContext = React.createContext(&quot;luna&quot;);
    // Create App component where it uses provider to pass theme value in the tree
    class App extends React.Component {
      render() {
        return (
          &lt;ThemeContext.Provider value=&quot;nova&quot;&gt;
            &lt;Toolbar /&gt;
          &lt;/ThemeContext.Provider&gt;
        );
      }
    }
    // A middle component where you don&#039;t need to pass theme prop anymore
    function Toolbar(props) {
      return (
          &lt;ThemedButton /&gt;
      );
    }
    // Lets read theme value in the button component to use
    class ThemedButton extends React.Component {
      static contextType = ThemeContext;
      render() {
        return &lt;Button theme={this.context} /&gt;;
      }
    }</code></pre>

**Context** is designed to share data that can be considered **global** for a tree of React components.

    For example, in the code below lets manually thread through a “theme” prop in order to style the Button component.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      '**Context** is designed to share data that can be considered **global** for a tree of React components.

    For example, in the code below lets manually thread through a “theme” prop in order to style the Button component.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":75}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.314Z',
      '2025-11-18T18:46:59.314Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'How do you use contextType?',
      '<pre><code>        class MyClass extends React.Component {
          static contextType = MyContext;
          render() {
            let value = this.context;
            /* render something based on the value */
          }
        }</code></pre>

ContextType is used to consume the context object. The contextType property can be used in two ways,

    1.  **contextType as property of class:**
        The contextType property on a class can be assigned a Context object created by React.createContext(). After that, you can consume the nearest current value of that Context type using this.context in any of the lifecycle methods and render function.

        Lets assign contextType property on MyClass as below,


    2.  **Static field**
        You can use a static class field to initialize your contextType using public class field syntax.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'ContextType is used to consume the context object. The contextType property can be used in two ways,

    1.  **contextType as property of class:**
        The contextType property on a class can be assigned a Context object created by React.createContext(). After that, you can consume the nearest current value of that Context type using this.context in any of the lifecycle methods and render function.

        Lets assign contextType property on MyClass as below,


    2.  **Static field**
        You can use a static class field to initialize your contextType using public class field syntax.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":76}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.314Z',
      '2025-11-18T18:46:59.314Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What is a consumer?',
      '<pre><code>    &lt;MyContext.Consumer&gt;
      {value =&gt; /* render something based on the context value */}
    &lt;/MyContext.Consumer&gt;</code></pre>

A Consumer is a React component that subscribes to context changes. It requires a function as a child which receives current context value as argument and returns a react node. The value argument passed to the function will be equal to the value prop of the closest Provider for this context above in the tree.

    Lets take a simple example,',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'A Consumer is a React component that subscribes to context changes. It requires a function as a child which receives current context value as argument and returns a react node. The value argument passed to the function will be equal to the value prop of the closest Provider for this context above in the tree.

    Lets take a simple example,',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":77}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.314Z',
      '2025-11-18T18:46:59.314Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'How do you solve performance corner cases while using context?',
      '<pre><code>    class App extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          value: { something: &quot;something&quot; },
        };
      }

      render() {
        return (
          &lt;Provider value={this.state.value}&gt;
            &lt;Toolbar /&gt;
          &lt;/Provider&gt;
        );
      }
    }</code></pre>

The context uses reference identity to determine when to re-render, there are some gotchas that could trigger unintentional renders in consumers when a provider’s parent re-renders.

    For example, the code below will re-render all consumers every time the Provider re-renders because a new object is always created for value.


    This can be solved by lifting up the value to parent state,',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'The context uses reference identity to determine when to re-render, there are some gotchas that could trigger unintentional renders in consumers when a provider’s parent re-renders.

    For example, the code below will re-render all consumers every time the Provider re-renders because a new object is always created for value.


    This can be solved by lifting up the value to parent state,',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":78}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.314Z',
      '2025-11-18T18:46:59.314Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What is the purpose of forward ref in HOCs?',
      '<pre><code>    import FancyButton from &quot;./FancyButton&quot;;

    const ref = React.createRef();
    ref.current.focus();
    &lt;FancyButton label=&quot;Click Me&quot; handleClick={handleClick} ref={ref} /&gt;;</code></pre>

Refs will not get passed through because ref is not a prop. It is handled differently by React just like **key**. If you add a ref to a HOC, the ref will refer to the outermost container component, not the wrapped component. In this case, you can use Forward Ref API. For example, we can explicitly forward refs to the inner FancyButton component using the React.forwardRef API.

    The below HOC logs all props,


    Let''s use this HOC to log all props that get passed to our “fancy button” component,


    Now let''s create a ref and pass it to FancyButton component. In this case, you can set focus to button element.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'Refs will not get passed through because ref is not a prop. It is handled differently by React just like **key**. If you add a ref to a HOC, the ref will refer to the outermost container component, not the wrapped component. In this case, you can use Forward Ref API. For example, we can explicitly forward refs to the inner FancyButton component using the React.forwardRef API.

    The below HOC logs all props,


    Let''s use this HOC to log all props that get passed to our “fancy button” component,


    Now let''s create a ref and pass it to FancyButton component. In this case, you can set focus to button element.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":79}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.314Z',
      '2025-11-18T18:46:59.314Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'Is ref argument available for all functions or class components?',
      'Regular function or class components don’t receive the ref argument, and ref is not available in props either. The second ref argument only exists when you define a component with React.forwardRef call.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'Regular function or class components don’t receive the ref argument, and ref is not available in props either. The second ref argument only exists when you define a component with React.forwardRef call.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":80}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.314Z',
      '2025-11-18T18:46:59.314Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'Why do you need additional care for component libraries while using forward refs?',
      'When you start using forwardRef in a component library, you should treat it as a breaking change and release a new major version of your library. This is because your library likely has a different behavior such as what refs get assigned to, and what types are exported. These changes can break apps and other libraries that depend on the old behavior.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'When you start using forwardRef in a component library, you should treat it as a breaking change and release a new major version of your library. This is because your library likely has a different behavior such as what refs get assigned to, and what types are exported. These changes can break apps and other libraries that depend on the old behavior.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":81}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.314Z',
      '2025-11-18T18:46:59.314Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'How to create react class components without ES6?',
      '<pre><code>    var Greeting = createReactClass({
      getDefaultProps: function () {
        return {
          name: &quot;Jhohn&quot;,
        };
      },
      getInitialState: function () {
        return { message: this.props.message };
      },
      handleClick: function () {
        console.log(this.state.message);
      },
      render: function () {
        return &lt;h1&gt;Hello, {this.props.name}&lt;/h1&gt;;
      },
    });</code></pre>

If you don’t use ES6 then you may need to use the create-react-class module instead. For default props, you need to define getDefaultProps() as a function on the passed object. Whereas for initial state, you have to provide a separate getInitialState method that returns the initial state.


    **Note:** If you use createReactClass then auto binding is available for all methods. i.e, You don''t need to use `.bind(this)` with in constructor for event handlers.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'If you don’t use ES6 then you may need to use the create-react-class module instead. For default props, you need to define getDefaultProps() as a function on the passed object. Whereas for initial state, you have to provide a separate getInitialState method that returns the initial state.


    **Note:** If you use createReactClass then auto binding is available for all methods. i.e, You don''t need to use `.bind(this)` with in constructor for event handlers.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":82}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.314Z',
      '2025-11-18T18:46:59.314Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'Is it possible to use react without JSX?',
      '<pre><code>    class Greeting extends React.Component {
      render() {
        return React.createElement(&quot;div&quot;, null, `Hello ${this.props.message}`);
      }
    }

    ReactDOM.render(
      React.createElement(Greeting, { message: &quot;World&quot; }, null),
      document.getElementById(&quot;root&quot;)
    );</code></pre>

Yes, JSX is not mandatory for using React. Actually it is convenient when you don’t want to set up compilation in your build environment. Each JSX element is just syntactic sugar for calling `React.createElement(component, props, ...children)`.

    For example, let us take a greeting example with JSX,


    You can write the same code without JSX as below,',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'Yes, JSX is not mandatory for using React. Actually it is convenient when you don’t want to set up compilation in your build environment. Each JSX element is just syntactic sugar for calling `React.createElement(component, props, ...children)`.

    For example, let us take a greeting example with JSX,


    You can write the same code without JSX as below,',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":83}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.314Z',
      '2025-11-18T18:46:59.314Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'How do you create HOC using render props?',
      '<pre><code>    function withMouse(Component) {
      return class extends React.Component {
        render() {
          return (
            &lt;Mouse
              render={(mouse) =&gt; &lt;Component {...this.props} mouse={mouse} /&gt;}
            /&gt;
          );
        }
      };
    }</code></pre>

You can implement most higher-order components (HOC) using a regular component with a render prop. For example, if you would prefer to have a withMouse HOC instead of a <Mouse> component, you could easily create one using a regular <Mouse> with a render prop.


    This way render props gives the flexibility of using either pattern.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'You can implement most higher-order components (HOC) using a regular component with a render prop. For example, if you would prefer to have a withMouse HOC instead of a <Mouse> component, you could easily create one using a regular <Mouse> with a render prop.


    This way render props gives the flexibility of using either pattern.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":84}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.314Z',
      '2025-11-18T18:46:59.314Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What is react scripts?',
      'The `react-scripts` package is a set of scripts from the create-react-app starter pack which helps you kick off projects without configuring. The `react-scripts start` command sets up the development environment and starts a server, as well as hot module reloading.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'The `react-scripts` package is a set of scripts from the create-react-app starter pack which helps you kick off projects without configuring. The `react-scripts start` command sets up the development environment and starts a server, as well as hot module reloading.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":85}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.314Z',
      '2025-11-18T18:46:59.314Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What are the features of create react app?',
      'Below are the list of some of the features provided by create react app.

    1.  React, JSX, ES6, Typescript and Flow syntax support.
    2.  Autoprefixed CSS
    3.  CSS Reset/Normalize
    4.  A live development server
    5.  A fast interactive unit test runner with built-in support for coverage reporting
    6.  A build script to bundle JS, CSS, and images for production, with hashes and sourcemaps
    7.  An offline-first service worker and a web app manifest, meeting all the Progressive Web App criteria.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'Below are the list of some of the features provided by create react app.

    1.  React, JSX, ES6, Typescript and Flow syntax support.
    2.  Autoprefixed CSS
    3.  CSS Reset/Normalize
    4.  A live development server
    5.  A fast interactive unit test runner with built-in support for coverage reporting
    6.  A build script to bundle JS, CSS, and images for production, with hashes and sourcemaps
    7.  An offline-first service worker and a web app manifest, meeting all the Progressive Web App criteria.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":86}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.314Z',
      '2025-11-18T18:46:59.314Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What is the purpose of renderToNodeStream method?',
      'The `ReactDOMServer#renderToNodeStream` method is used to generate HTML on the server and send the markup down on the initial request for faster page loads. It also helps search engines to crawl your pages easily for SEO purposes.
    **Note:** Remember this method is not available in the browser but only server.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'The `ReactDOMServer#renderToNodeStream` method is used to generate HTML on the server and send the markup down on the initial request for faster page loads. It also helps search engines to crawl your pages easily for SEO purposes.
    **Note:** Remember this method is not available in the browser but only server.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":87}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.314Z',
      '2025-11-18T18:46:59.314Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'How do you get redux scaffolding using create-react-app?',
      '<pre><code>    npx create-react-app my-app --template redux-typescript</code></pre>

Redux team has provided official redux+js or redux+typescript templates for create-react-app project. The generated project setup includes,
    1.  Redux Toolkit and React-Redux dependencies
    2.  Create and configure Redux store
    3.  React-Redux `<Provider>` passing the store to React components
    4.  Small "counter" example to demo how to add redux logic and React-Redux hooks API to interact with the store from components
        The below commands need to be executed along with template option as below,
    5.  **Javascript template:**
    2.  **Typescript template:**',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'Redux team has provided official redux+js or redux+typescript templates for create-react-app project. The generated project setup includes,
    1.  Redux Toolkit and React-Redux dependencies
    2.  Create and configure Redux store
    3.  React-Redux `<Provider>` passing the store to React components
    4.  Small "counter" example to demo how to add redux logic and React-Redux hooks API to interact with the store from components
        The below commands need to be executed along with template option as below,
    5.  **Javascript template:**
    2.  **Typescript template:**',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":88}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.314Z',
      '2025-11-18T18:46:59.314Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What is state mutation and how to prevent it?',
      '<pre><code>    class A extends React.component {
      constructor(props) {
        super(props);
        this.state = {
          loading: false
        }
     }

    componentDidMount() {
      let { loading } = this.state;
      loading = (() =&gt; true)(); // Trying to perform an operation and directly saving in a state variable
    }
</code></pre>

`State mutation` happens when you try to update the state of a component without actually using `setState` function. This can happen when you are trying to do some computations using a state variable and unknowingly save the result in the same state variable. This is the main reason why it is advised to return new instances of state variables from the reducers by using Object.assign({}, ...) or spread syntax.

    This can cause unknown issues in the UI as the value of the state variable got updated without telling React to check what all components were being affected from this update and it can cause UI bugs.

    Ex:


    **How to prevent it:** Make sure your state variables are immutable by either enforcing immutability by using plugins like Immutable.js, always using `setState` to make updates, and returning new instances in reducers when sending updated state values.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      '`State mutation` happens when you try to update the state of a component without actually using `setState` function. This can happen when you are trying to do some computations using a state variable and unknowingly save the result in the same state variable. This is the main reason why it is advised to return new instances of state variables from the reducers by using Object.assign({}, ...) or spread syntax.

    This can cause unknown issues in the UI as the value of the state variable got updated without telling React to check what all components were being affected from this update and it can cause UI bugs.

    Ex:


    **How to prevent it:** Make sure your state variables are immutable by either enforcing immutability by using plugins like Immutable.js, always using `setState` to make updates, and returning new instances in reducers when sending updated state values.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'legacy', 'intermediate'],
      '{"source":"reference.md","section":"Old Q&A","originalNum":89}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.314Z',
      '2025-11-18T18:46:59.314Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    );