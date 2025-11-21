-- Batch 39: Questions 381-390 (10 questions)
INSERT INTO questions (
  id, title, content, type, difficulty, points, options, correct_answer, 
  explanation, test_cases, hints, tags, metadata, stats, category_id, 
  learning_card_id, is_active, created_at, updated_at, topic_id, time_limit
) VALUES (
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
    NULL,
    'You can prevent component from rendering by returning null based on specific condition. This way it can conditionally render component.



    In the above example, the `greeting` component skips its rendering section by applying condition and returning null value.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":74}'::jsonb,
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
    NULL,
    '**Context** is designed to share data that can be considered **global** for a tree of React components.

    For example, in the code below lets manually thread through a “theme” prop in order to style the Button component.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":75}'::jsonb,
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
    NULL,
    'ContextType is used to consume the context object. The contextType property can be used in two ways,

    1.  **contextType as property of class:**
        The contextType property on a class can be assigned a Context object created by React.createContext(). After that, you can consume the nearest current value of that Context type using this.context in any of the lifecycle methods and render function.

        Lets assign contextType property on MyClass as below,


    2.  **Static field**
        You can use a static class field to initialize your contextType using public class field syntax.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":76}'::jsonb,
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
    NULL,
    'A Consumer is a React component that subscribes to context changes. It requires a function as a child which receives current context value as argument and returns a react node. The value argument passed to the function will be equal to the value prop of the closest Provider for this context above in the tree.

    Lets take a simple example,',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":77}'::jsonb,
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
    NULL,
    'The context uses reference identity to determine when to re-render, there are some gotchas that could trigger unintentional renders in consumers when a provider’s parent re-renders.

    For example, the code below will re-render all consumers every time the Provider re-renders because a new object is always created for value.


    This can be solved by lifting up the value to parent state,',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":78}'::jsonb,
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
    NULL,
    'Refs will not get passed through because ref is not a prop. It is handled differently by React just like **key**. If you add a ref to a HOC, the ref will refer to the outermost container component, not the wrapped component. In this case, you can use Forward Ref API. For example, we can explicitly forward refs to the inner FancyButton component using the React.forwardRef API.

    The below HOC logs all props,


    Let''s use this HOC to log all props that get passed to our “fancy button” component,


    Now let''s create a ref and pass it to FancyButton component. In this case, you can set focus to button element.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":79}'::jsonb,
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
    'Is ref argument available for all functions or class components?',
    'Regular function or class components don’t receive the ref argument, and ref is not available in props either. The second ref argument only exists when you define a component with React.forwardRef call.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Regular function or class components don’t receive the ref argument, and ref is not available in props either. The second ref argument only exists when you define a component with React.forwardRef call.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":80}'::jsonb,
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
    'Why do you need additional care for component libraries while using forward refs?',
    'When you start using forwardRef in a component library, you should treat it as a breaking change and release a new major version of your library. This is because your library likely has a different behavior such as what refs get assigned to, and what types are exported. These changes can break apps and other libraries that depend on the old behavior.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'When you start using forwardRef in a component library, you should treat it as a breaking change and release a new major version of your library. This is because your library likely has a different behavior such as what refs get assigned to, and what types are exported. These changes can break apps and other libraries that depend on the old behavior.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":81}'::jsonb,
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
    NULL,
    'If you don’t use ES6 then you may need to use the create-react-class module instead. For default props, you need to define getDefaultProps() as a function on the passed object. Whereas for initial state, you have to provide a separate getInitialState method that returns the initial state.


    **Note:** If you use createReactClass then auto binding is available for all methods. i.e, You don''t need to use `.bind(this)` with in constructor for event handlers.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":82}'::jsonb,
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
    NULL,
    'Yes, JSX is not mandatory for using React. Actually it is convenient when you don’t want to set up compilation in your build environment. Each JSX element is just syntactic sugar for calling `React.createElement(component, props, ...children)`.

    For example, let us take a greeting example with JSX,


    You can write the same code without JSX as below,',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":83}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  );
