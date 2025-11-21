-- Batch 37: Questions 361-370 (10 questions)
INSERT INTO questions (
  id, title, content, type, difficulty, points, options, correct_answer, 
  explanation, test_cases, hints, tags, metadata, stats, category_id, 
  learning_card_id, is_active, created_at, updated_at, topic_id, time_limit
) VALUES (
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
    NULL,
    'No, `statics` only works with `React.createClass()`:


    But you can write statics inside ES6+ classes as below,


    or writing them outside class as below,',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":54}'::jsonb,
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
    NULL,
    'If the ref callback is defined as an inline function, it will get called twice during updates, first with null and then again with the DOM element. This is because a new instance of the function is created with each render, so React needs to clear the old ref and set up the new one.


    But our expectation is for the ref callback to get called once, when the component mounts. One quick fix is to use the ES7 class property syntax to define the function',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":55}'::jsonb,
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
    NULL,
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
    '{"source":"reference.md","section":"Old Q&A","originalNum":56}'::jsonb,
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
    NULL,
    'React Class Components can be made much more concise using the class field declarations. You can initialize the local state without using the constructor and declare class methods by using arrow functions without the extra need to bind them.

    Let''s take a counter example to demonstrate class field declarations for state without using constructor and methods without binding,',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":57}'::jsonb,
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
    NULL,
    'Error boundaries do not catch errors inside event handlers.

    React doesn’t need error boundaries to recover from errors in event handlers. Unlike the render method and lifecycle methods, the event handlers don’t happen during rendering. So if they throw, React still knows what to display on the screen.

    If you need to catch an error inside an event handler, use the regular JavaScript try / catch statement:


    Note that the above example is demonstrating regular JavaScript behavior and doesn’t use error boundaries.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":58}'::jsonb,
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
    NULL,
    'Try catch block works with imperative code whereas error boundaries are meant for declarative code to render on the screen.

    For example, the try catch block used for below imperative code


    Whereas error boundaries wrap declarative code as below,


    So if an error occurs in a **componentDidUpdate** method caused by a **setState** somewhere deep in the tree, it will still correctly propagate to the closest error boundary.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":59}'::jsonb,
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
    'What is the required method to be defined for a class component?',
    'The `render()` method is the only required method in a class component. i.e, All methods other than render method are optional for a class component.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The `render()` method is the only required method in a class component. i.e, All methods other than render method are optional for a class component.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":60}'::jsonb,
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
    NULL,
    'Below are the list of following types used and return from render method,

    1.  **React elements:** Elements that instruct React to render a DOM node. It includes html elements such as `<div/>` and user defined elements.
    2.  **Arrays and fragments:** Return multiple elements to render as Arrays and Fragments to wrap multiple elements
    3.  **Portals:** Render children into a different DOM subtree.
    4.  **String and numbers:** Render both Strings and Numbers as text nodes in the DOM
    5.  **Booleans or null:** Doesn''t render anything but these types are used to conditionally render content.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":61}'::jsonb,
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
    NULL,
    'The constructor is mainly used for two purposes,

    1.  To initialize local state by assigning object to this.state
    2.  For binding event handler methods to the instance
        For example, the below code covers both the above cases,',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":62}'::jsonb,
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
    'Is it mandatory to define constructor for React component?',
    'No, it is not mandatory. i.e, If you don’t initialize state and you don’t bind methods, you don’t need to implement a constructor for your React component.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'No, it is not mandatory. i.e, If you don’t initialize state and you don’t bind methods, you don’t need to implement a constructor for your React component.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":63}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  );
