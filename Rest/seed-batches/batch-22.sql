INSERT INTO questions (
    id, title, content, type, difficulty, points, options, correct_answer, 
    explanation, test_cases, hints, tags, metadata, stats, category_id, 
    learning_card_id, is_active, created_at, updated_at, topic_id, time_limit
  ) VALUES (
      gen_random_uuid(),
      'Do Hooks replace render props and higher order components?',
      'Both render props and higher-order components render only a single child but in most of the cases Hooks are a simpler way to serve this by reducing nesting in your tree.',
      'open-ended',
      'beginner',
      10,
      NULL,
      '',
      'Both render props and higher-order components render only a single child but in most of the cases Hooks are a simpler way to serve this by reducing nesting in your tree.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'core-concepts', 'beginner'],
      '{"source":"reference.md","section":"Core React","originalNum":51}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What is a switching component?',
      '<pre><code>    import HomePage from &quot;./HomePage&quot;;
    import AboutPage from &quot;./AboutPage&quot;;
    import ServicesPage from &quot;./ServicesPage&quot;;
    import ContactPage from &quot;./ContactPage&quot;;

    const PAGES = {
      home: HomePage,
      about: AboutPage,
      services: ServicesPage,
      contact: ContactPage,
    };

    const Page = (props) =&gt; {
      const Handler = PAGES[props.page] || ContactPage;

      return &lt;Handler {...props} /&gt;;
    };

    // The keys of the PAGES object can be used in the prop types to catch dev-time errors.
    Page.propTypes = {
      page: PropTypes.oneOf(Object.keys(PAGES)).isRequired,
    };</code></pre>

A _switching component_ is a component that renders one of many components. We need to use object to map prop values to components.

    For example, a switching component to display different pages based on `page` prop:',
      'open-ended',
      'beginner',
      10,
      NULL,
      '',
      'A _switching component_ is a component that renders one of many components. We need to use object to map prop values to components.

    For example, a switching component to display different pages based on `page` prop:',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'core-concepts', 'beginner'],
      '{"source":"reference.md","section":"Core React","originalNum":52}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What are React Mixins?',
      '<pre><code>    const PureRenderMixin = require(&quot;react-addons-pure-render-mixin&quot;);

    const Button = React.createClass({
      mixins: [PureRenderMixin],
      // ...
    });</code></pre>

_Mixins_ are a way to totally separate components to have a common functionality. Mixins **should not be used** and can be replaced with _higher-order components_ or _decorators_.

    One of the most commonly used mixins is `PureRenderMixin`. You might be using it in some components to prevent unnecessary re-renders when the props and state are shallowly equal to the previous props and state:


     <!-- TODO: mixins are deprecated -->',
      'open-ended',
      'beginner',
      10,
      NULL,
      '',
      '_Mixins_ are a way to totally separate components to have a common functionality. Mixins **should not be used** and can be replaced with _higher-order components_ or _decorators_.

    One of the most commonly used mixins is `PureRenderMixin`. You might be using it in some components to prevent unnecessary re-renders when the props and state are shallowly equal to the previous props and state:


     <!-- TODO: mixins are deprecated -->',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'core-concepts', 'beginner'],
      '{"source":"reference.md","section":"Core React","originalNum":53}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What are the Pointer Events supported in React?',
      '_Pointer Events_ provide a unified way of handling all input events. In the old days we had a mouse and respective event listeners to handle them but nowadays we have many devices which don''t correlate to having a mouse, like phones with touch surface or pens. We need to remember that these events will only work in browsers that support the _Pointer Events_ specification.

    The following event types are now available in _React DOM_:

    1. `onPointerDown`
    2. `onPointerMove`
    3. `onPointerUp`
    4. `onPointerCancel`
    5. `onGotPointerCapture`
    6. `onLostPointerCapture`
    7. `onPointerEnter`
    8. `onPointerLeave`
    9. `onPointerOver`
    10. `onPointerOut`',
      'open-ended',
      'beginner',
      10,
      NULL,
      '',
      '_Pointer Events_ provide a unified way of handling all input events. In the old days we had a mouse and respective event listeners to handle them but nowadays we have many devices which don''t correlate to having a mouse, like phones with touch surface or pens. We need to remember that these events will only work in browsers that support the _Pointer Events_ specification.

    The following event types are now available in _React DOM_:

    1. `onPointerDown`
    2. `onPointerMove`
    3. `onPointerUp`
    4. `onPointerCancel`
    5. `onGotPointerCapture`
    6. `onLostPointerCapture`
    7. `onPointerEnter`
    8. `onPointerLeave`
    9. `onPointerOver`
    10. `onPointerOut`',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'core-concepts', 'beginner'],
      '{"source":"reference.md","section":"Core React","originalNum":54}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'Why should component names start with capital letter?',
      '<pre><code>    import MyComponent from &quot;./myComponent&quot;;</code></pre>

If you are rendering your component using JSX, the name of that component has to begin with a capital letter otherwise React will throw an error as an unrecognized tag. This convention is because only HTML elements and SVG tags can begin with a lowercase letter.


    You can define function component whose name starts with lowercase letter, but when it''s imported it should have a capital letter. Here lowercase is fine:


    While when imported in another file it should start with capital letter:',
      'open-ended',
      'beginner',
      10,
      NULL,
      '',
      'If you are rendering your component using JSX, the name of that component has to begin with a capital letter otherwise React will throw an error as an unrecognized tag. This convention is because only HTML elements and SVG tags can begin with a lowercase letter.


    You can define function component whose name starts with lowercase letter, but when it''s imported it should have a capital letter. Here lowercase is fine:


    While when imported in another file it should start with capital letter:',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'core-concepts', 'beginner'],
      '{"source":"reference.md","section":"Core React","originalNum":55}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'Are custom DOM attributes supported in React v16?',
      'Yes. In the past, React used to ignore unknown DOM attributes. If you wrote JSX with an attribute that React doesn''t recognize, React would just skip it.

    For example, let''s take a look at the below attribute:


    Would render an empty div to the DOM with React v15:


    In React v16 any unknown attributes will end up in the DOM:


    This is useful for supplying browser-specific non-standard attributes, trying new DOM APIs, and integrating with opinionated third-party libraries.',
      'open-ended',
      'beginner',
      10,
      NULL,
      '',
      'Yes. In the past, React used to ignore unknown DOM attributes. If you wrote JSX with an attribute that React doesn''t recognize, React would just skip it.

    For example, let''s take a look at the below attribute:


    Would render an empty div to the DOM with React v15:


    In React v16 any unknown attributes will end up in the DOM:


    This is useful for supplying browser-specific non-standard attributes, trying new DOM APIs, and integrating with opinionated third-party libraries.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'core-concepts', 'beginner'],
      '{"source":"reference.md","section":"Core React","originalNum":56}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'How to loop inside JSX?',
      '<pre><code>    &lt;tbody&gt;
      for (let i = 0; i &lt; items.length; i++) {
        &lt;SomeComponent key={items[i].id} name={items[i].name} /&gt;
      }
    &lt;/tbody&gt;</code></pre>

You can simply use `Array.prototype.map` with ES6 _arrow function_ syntax.

    For example, the `items` array of objects is mapped into an array of components:


    But you can''t iterate using `for` loop:


    This is because JSX tags are transpiled into _function calls_, and you can''t use statements inside expressions. This may change thanks to `do` expressions which are _stage 1 proposal_.',
      'open-ended',
      'beginner',
      10,
      NULL,
      '',
      'You can simply use `Array.prototype.map` with ES6 _arrow function_ syntax.

    For example, the `items` array of objects is mapped into an array of components:


    But you can''t iterate using `for` loop:


    This is because JSX tags are transpiled into _function calls_, and you can''t use statements inside expressions. This may change thanks to `do` expressions which are _stage 1 proposal_.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'core-concepts', 'beginner'],
      '{"source":"reference.md","section":"Core React","originalNum":57}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'How do you access props in attribute quotes?',
      '<pre><code>    &lt;img className=&quot;image&quot; src={`images/${this.props.image}`} /&gt;</code></pre>

React (or JSX) doesn''t support variable interpolation inside an attribute value. The below representation won''t work:


    But you can put any JS expression inside curly braces as the entire attribute value. So the below expression works:


    Using _template strings_ will also work:',
      'open-ended',
      'beginner',
      10,
      NULL,
      '',
      'React (or JSX) doesn''t support variable interpolation inside an attribute value. The below representation won''t work:


    But you can put any JS expression inside curly braces as the entire attribute value. So the below expression works:


    Using _template strings_ will also work:',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'core-concepts', 'beginner'],
      '{"source":"reference.md","section":"Core React","originalNum":58}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What is React proptype array with shape?',
      '<pre><code>    ReactComponent.propTypes = {
      arrayWithShape: React.PropTypes.arrayOf(
        React.PropTypes.shape({
          color: React.PropTypes.string.isRequired,
          fontSize: React.PropTypes.number.isRequired,
        })
      ).isRequired,
    };</code></pre>

If you want to pass an array of objects to a component with a particular shape then use `React.PropTypes.shape()` as an argument to `React.PropTypes.arrayOf()`.',
      'open-ended',
      'beginner',
      10,
      NULL,
      '',
      'If you want to pass an array of objects to a component with a particular shape then use `React.PropTypes.shape()` as an argument to `React.PropTypes.arrayOf()`.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'core-concepts', 'beginner'],
      '{"source":"reference.md","section":"Core React","originalNum":59}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'How to conditionally apply class attributes?',
      'You shouldn''t use curly braces inside quotes because it is going to be evaluated as a string.


    Instead you need to move curly braces outside (don''t forget to include spaces between class names):


    _Template strings_ will also work:',
      'open-ended',
      'beginner',
      10,
      NULL,
      '',
      'You shouldn''t use curly braces inside quotes because it is going to be evaluated as a string.


    Instead you need to move curly braces outside (don''t forget to include spaces between class names):


    _Template strings_ will also work:',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'core-concepts', 'beginner'],
      '{"source":"reference.md","section":"Core React","originalNum":60}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What is the difference between React and ReactDOM?',
      'The `react` package contains `React.createElement()`, `React.Component`, `React.Children`, and other helpers related to elements and component classes. You can think of these as the isomorphic or universal helpers that you need to build components. The `react-dom` package contains `ReactDOM.render()`, and in `react-dom/server` we have _server-side rendering_ support with `ReactDOMServer.renderToString()` and `ReactDOMServer.renderToStaticMarkup()`.',
      'open-ended',
      'beginner',
      10,
      NULL,
      '',
      'The `react` package contains `React.createElement()`, `React.Component`, `React.Children`, and other helpers related to elements and component classes. You can think of these as the isomorphic or universal helpers that you need to build components. The `react-dom` package contains `ReactDOM.render()`, and in `react-dom/server` we have _server-side rendering_ support with `ReactDOMServer.renderToString()` and `ReactDOMServer.renderToStaticMarkup()`.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'core-concepts', 'beginner'],
      '{"source":"reference.md","section":"Core React","originalNum":61}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'Why ReactDOM is separated from React?',
      'The React team worked on extracting all DOM-related features into a separate library called _ReactDOM_. React v0.14 is the first release in which the libraries are split. By looking at some of the packages, `react-native`, `react-art`, `react-canvas`, and `react-three`, it has become clear that the beauty and essence of React has nothing to do with browsers or the DOM.

    To build more environments that React can render to, React team planned to split the main React package into two: `react` and `react-dom`. This paves the way to writing components that can be shared between the web version of React and React Native.',
      'open-ended',
      'beginner',
      10,
      NULL,
      '',
      'The React team worked on extracting all DOM-related features into a separate library called _ReactDOM_. React v0.14 is the first release in which the libraries are split. By looking at some of the packages, `react-native`, `react-art`, `react-canvas`, and `react-three`, it has become clear that the beauty and essence of React has nothing to do with browsers or the DOM.

    To build more environments that React can render to, React team planned to split the main React package into two: `react` and `react-dom`. This paves the way to writing components that can be shared between the web version of React and React Native.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'core-concepts', 'beginner'],
      '{"source":"reference.md","section":"Core React","originalNum":62}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'How to use React label element?',
      '<pre><code>    &lt;label htmlFor={&#039;user&#039;}&gt;{&#039;User&#039;}&lt;/label&gt;
    &lt;input type={&#039;text&#039;} id={&#039;user&#039;} /&gt;</code></pre>

If you try to render a `<label>` element bound to a text input using the standard `for` attribute, then it produces HTML missing that attribute and prints a warning to the console.


    Since `for` is a reserved keyword in JavaScript, use `htmlFor` instead.',
      'open-ended',
      'beginner',
      10,
      NULL,
      '',
      'If you try to render a `<label>` element bound to a text input using the standard `for` attribute, then it produces HTML missing that attribute and prints a warning to the console.


    Since `for` is a reserved keyword in JavaScript, use `htmlFor` instead.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'core-concepts', 'beginner'],
      '{"source":"reference.md","section":"Core React","originalNum":63}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'How to combine multiple inline style objects?',
      '<pre><code>    &lt;button style={[styles.panel.button, styles.panel.submitButton]}&gt;
      {&quot;Submit&quot;}
    &lt;/button&gt;</code></pre>

You can use _spread operator_ in regular React:


    If you''re using React Native then you can use the array notation:',
      'open-ended',
      'beginner',
      10,
      NULL,
      '',
      'You can use _spread operator_ in regular React:


    If you''re using React Native then you can use the array notation:',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'core-concepts', 'beginner'],
      '{"source":"reference.md","section":"Core React","originalNum":64}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'How to re-render the view when the browser is resized?',
      '<pre><code>    class WindowDimensions extends React.Component {
      constructor(props) {
        super(props);
        this.updateDimensions = this.updateDimensions.bind(this);
      }

      componentWillMount() {
        this.updateDimensions();
      }

      componentDidMount() {
        window.addEventListener(&quot;resize&quot;, this.updateDimensions);
      }

      componentWillUnmount() {
        window.removeEventListener(&quot;resize&quot;, this.updateDimensions);
      }

      updateDimensions() {
        this.setState({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      render() {
        return (
          &lt;span&gt;
            {this.state.width} x {this.state.height}
          &lt;/span&gt;
        );
      }
    }</code></pre>

You can use the `useState` hook to manage the width and height state variables, and the `useEffect` hook to add and remove the `resize` event listener. The `[]` dependency array passed to useEffect ensures that the effect only runs once (on mount) and not on every re-render.



    You can listen to the `resize` event in `componentDidMount()` and then update the dimensions (`width` and `height`). You should remove the listener in `componentWillUnmount()` method.',
      'open-ended',
      'beginner',
      10,
      NULL,
      '',
      'You can use the `useState` hook to manage the width and height state variables, and the `useEffect` hook to add and remove the `resize` event listener. The `[]` dependency array passed to useEffect ensures that the effect only runs once (on mount) and not on every re-render.



    You can listen to the `resize` event in `componentDidMount()` and then update the dimensions (`width` and `height`). You should remove the listener in `componentWillUnmount()` method.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'core-concepts', 'beginner'],
      '{"source":"reference.md","section":"Core React","originalNum":65}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'How to pretty print JSON with React?',
      '<pre><code>    const data = { name: &quot;John&quot;, age: 42 };

    class User extends React.Component {
      render() {
        return &lt;pre&gt;{JSON.stringify(data, null, 2)}&lt;/pre&gt;;
      }
    }

    React.render(&lt;User /&gt;, document.getElementById(&quot;container&quot;));</code></pre>

We can use `<pre>` tag so that the formatting of the `JSON.stringify()` is retained:


      <p>


      </p>',
      'open-ended',
      'beginner',
      10,
      NULL,
      '',
      'We can use `<pre>` tag so that the formatting of the `JSON.stringify()` is retained:


      <p>


      </p>',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'core-concepts', 'beginner'],
      '{"source":"reference.md","section":"Core React","originalNum":66}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'Why can''t you update props in React?',
      'The React philosophy is that props should be _immutable_(read only) and _top-down_. This means that a parent can send any prop values to a child, but the child can''t modify received props.',
      'open-ended',
      'beginner',
      10,
      NULL,
      '',
      'The React philosophy is that props should be _immutable_(read only) and _top-down_. This means that a parent can send any prop values to a child, but the child can''t modify received props.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'core-concepts', 'beginner'],
      '{"source":"reference.md","section":"Core React","originalNum":67}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'How to focus an input element on page load?',
      '<pre><code>    class App extends React.Component {
      componentDidMount() {
        this.nameInput.focus();
      }

      render() {
        return (
            &lt;input defaultValue={&quot;Won&#039;t focus&quot;} /&gt;
            &lt;input
              ref={(input) =&gt; (this.nameInput = input)}
              defaultValue={&quot;Will focus&quot;}
            /&gt;
        );
      }
    }

    ReactDOM.render(&lt;App /&gt;, document.getElementById(&quot;app&quot;));</code></pre>

You need to use `useEffect` hook to set focus on input field during page load time for functional component.


      <p>
      You can do it by creating _ref_ for `input` element and using it in `componentDidMount()`:


      </p>',
      'open-ended',
      'beginner',
      10,
      NULL,
      '',
      'You need to use `useEffect` hook to set focus on input field during page load time for functional component.


      <p>
      You can do it by creating _ref_ for `input` element and using it in `componentDidMount()`:


      </p>',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'core-concepts', 'beginner'],
      '{"source":"reference.md","section":"Core React","originalNum":68}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'How can we find the version of React at runtime in the browser?',
      '<pre><code>    const REACT_VERSION = React.version;

    ReactDOM.render(
      document.getElementById(&quot;app&quot;)
    );</code></pre>

You can use `React.version` to get the version.',
      'open-ended',
      'beginner',
      10,
      NULL,
      '',
      'You can use `React.version` to get the version.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'core-concepts', 'beginner'],
      '{"source":"reference.md","section":"Core React","originalNum":69}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'How to add Google Analytics for React Router?',
      '<pre><code>    history.listen(function (location) {
      window.ga(&quot;set&quot;, &quot;page&quot;, location.pathname + location.search);
      window.ga(&quot;send&quot;, &quot;pageview&quot;, location.pathname + location.search);
    });</code></pre>

Add a listener on the `history` object to record each page view:',
      'open-ended',
      'beginner',
      10,
      NULL,
      '',
      'Add a listener on the `history` object to record each page view:',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'core-concepts', 'beginner'],
      '{"source":"reference.md","section":"Core React","originalNum":70}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'How do you apply vendor prefixes to inline styles in React?',
      '<pre><code>      style={{
        transform: &quot;rotate(90deg)&quot;,
        WebkitTransform: &quot;rotate(90deg)&quot;, // note the capital &#039;W&#039; here
        msTransform: &quot;rotate(90deg)&quot;, // &#039;ms&#039; is the only lowercase vendor prefix
      }}
    /&gt;</code></pre>

React _does not_ apply _vendor prefixes_ automatically. You need to add vendor prefixes manually.',
      'open-ended',
      'beginner',
      10,
      NULL,
      '',
      'React _does not_ apply _vendor prefixes_ automatically. You need to add vendor prefixes manually.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'core-concepts', 'beginner'],
      '{"source":"reference.md","section":"Core React","originalNum":71}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'How to import and export components using React and ES6?',
      '<pre><code>
</code></pre>

You should use default for exporting the components


    <p>
    </p>

    With the export specifier, the MyProfile is going to be the member and exported to this module and the same can be imported without mentioning the name in other components.',
      'open-ended',
      'beginner',
      10,
      NULL,
      '',
      'You should use default for exporting the components


    <p>
    </p>

    With the export specifier, the MyProfile is going to be the member and exported to this module and the same can be imported without mentioning the name in other components.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'core-concepts', 'beginner'],
      '{"source":"reference.md","section":"Core React","originalNum":72}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What are the exceptions on React component naming?',
      '<pre><code>         render() {
              return (
                &lt;obj.component/&gt; // `React.createElement(obj.component)`
              )
        }</code></pre>

The component names should start with an uppercase letter but there are few exceptions to this convention. The lowercase tag names with a dot (property accessors) are still considered as valid component names.
    For example, the below tag can be compiled to a valid component,',
      'open-ended',
      'beginner',
      10,
      NULL,
      '',
      'The component names should start with an uppercase letter but there are few exceptions to this convention. The lowercase tag names with a dot (property accessors) are still considered as valid component names.
    For example, the below tag can be compiled to a valid component,',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'core-concepts', 'beginner'],
      '{"source":"reference.md","section":"Core React","originalNum":73}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'Is it possible to use async/await in plain React?',
      '<pre><code>    import { useEffect, useState } from &#039;react&#039;;

    function UserProfile() {
      const [user, setUser] = useState(null);

      useEffect(() =&gt; {
        const fetchUser = async () =&gt; {
          const response = await fetch(&#039;/api/user&#039;);
          const data = await response.json();
          setUser(data);
        };

        fetchUser();
      }, []);

      return user ? &lt;div&gt;Hello, {user.name}&lt;/div&gt; : &lt;div&gt;Loading...&lt;/div&gt;;
    }</code></pre>

Yes, you can use `async/await` in plain React, as long as your JavaScript environment supports ES2017+. Nowadays most modern browsers and build tools support ES2017+ version. If you''re using **Create React App**, **Next.js**, **Remix**, or any modern React setup, `async/await` is supported out of the box through **Babel**.

    ### Example Usage

    But If you''re not using a bundler like **Webpack or Babel**, you will need _Babel_ and [transform-async-to-generator](https://babeljs.io/docs/en/babel-plugin-transform-async-to-generator) plugin. However, React Native ships with Babel and a set of transforms.',
      'open-ended',
      'beginner',
      10,
      NULL,
      '',
      'Yes, you can use `async/await` in plain React, as long as your JavaScript environment supports ES2017+. Nowadays most modern browsers and build tools support ES2017+ version. If you''re using **Create React App**, **Next.js**, **Remix**, or any modern React setup, `async/await` is supported out of the box through **Babel**.

    ### Example Usage

    But If you''re not using a bundler like **Webpack or Babel**, you will need _Babel_ and [transform-async-to-generator](https://babeljs.io/docs/en/babel-plugin-transform-async-to-generator) plugin. However, React Native ships with Babel and a set of transforms.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'core-concepts', 'beginner'],
      '{"source":"reference.md","section":"Core React","originalNum":74}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What are the common folder structures for React?',
      '<pre><code>        api/
        ├─ APIUtils.js
        ├─ APIUtils.test.js
        ├─ ProfileAPI.js
        └─ UserAPI.js
        components/
        ├─ Avatar.js
        ├─ Avatar.css
        ├─ Feed.js
        ├─ Feed.css
        ├─ FeedStory.js
        ├─ FeedStory.test.js
        ├─ Profile.js
        ├─ ProfileHeader.js
        └─ ProfileHeader.css</code></pre>

There are two common practices for React project file structure.

     1.  **Grouping by features or routes:**

        One common way to structure projects is locate CSS, JS, and tests together, grouped by feature or route.


     2.  **Grouping by file type:**

        Another popular way to structure projects is to group similar files together.',
      'open-ended',
      'beginner',
      10,
      NULL,
      '',
      'There are two common practices for React project file structure.

     1.  **Grouping by features or routes:**

        One common way to structure projects is locate CSS, JS, and tests together, grouped by feature or route.


     2.  **Grouping by file type:**

        Another popular way to structure projects is to group similar files together.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'core-concepts', 'beginner'],
      '{"source":"reference.md","section":"Core React","originalNum":75}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What are the popular packages for animation?',
      '_React Transition Group_ and _React Motion_ are popular animation packages in React ecosystem.',
      'open-ended',
      'beginner',
      10,
      NULL,
      '',
      '_React Transition Group_ and _React Motion_ are popular animation packages in React ecosystem.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'core-concepts', 'beginner'],
      '{"source":"reference.md","section":"Core React","originalNum":76}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What is the benefit of styles modules?',
      '<pre><code>    import { space, colors } from &quot;./styles&quot;;</code></pre>

It is recommended to avoid hard coding style values in components. Any values that are likely to be used across different UI components should be extracted into their own modules.

    For example, these styles could be extracted into a separate component:


    And then imported individually in other components:',
      'open-ended',
      'beginner',
      10,
      NULL,
      '',
      'It is recommended to avoid hard coding style values in components. Any values that are likely to be used across different UI components should be extracted into their own modules.

    For example, these styles could be extracted into a separate component:


    And then imported individually in other components:',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'core-concepts', 'beginner'],
      '{"source":"reference.md","section":"Core React","originalNum":77}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What are the popular React-specific linters?',
      'ESLint is a popular JavaScript linter. There are plugins available that analyse specific code styles. One of the most common for React is an npm package called `eslint-plugin-react`. By default, it will check a number of best practices, with rules checking things from keys in iterators to a complete set of prop types.

    Another popular plugin is `eslint-plugin-jsx-a11y`, which will help fix common issues with accessibility. As JSX offers slightly different syntax to regular HTML, issues with `alt` text and `tabindex`, for example, will not be picked up by regular plugins.',
      'open-ended',
      'beginner',
      10,
      NULL,
      '',
      'ESLint is a popular JavaScript linter. There are plugins available that analyse specific code styles. One of the most common for React is an npm package called `eslint-plugin-react`. By default, it will check a number of best practices, with rules checking things from keys in iterators to a complete set of prop types.

    Another popular plugin is `eslint-plugin-jsx-a11y`, which will help fix common issues with accessibility. As JSX offers slightly different syntax to regular HTML, issues with `alt` text and `tabindex`, for example, will not be picked up by regular plugins.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'core-concepts', 'beginner'],
      '{"source":"reference.md","section":"Core React","originalNum":78}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What is React Router?',
      'React Router is a powerful routing library built on top of React that helps you add new screens and flows to your application incredibly quickly, all while keeping the URL in sync with what''s being displayed on the page.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'React Router is a powerful routing library built on top of React that helps you add new screens and flows to your application incredibly quickly, all while keeping the URL in sync with what''s being displayed on the page.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'routing', 'intermediate'],
      '{"source":"reference.md","section":"React Router","originalNum":79}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'How React Router is different from history library?',
      'React Router is a wrapper around the `history` library which handles interaction with the browser''s `window.history` with its browser and hash histories. It also provides memory history which is useful for environments that don''t have global history, such as mobile app development (React Native) and unit testing with Node.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'React Router is a wrapper around the `history` library which handles interaction with the browser''s `window.history` with its browser and hash histories. It also provides memory history which is useful for environments that don''t have global history, such as mobile app development (React Native) and unit testing with Node.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'routing', 'intermediate'],
      '{"source":"reference.md","section":"React Router","originalNum":80}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
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
      '',
      'React Router v6 provides below 4 `<Router>` components:

    1.  `<BrowserRouter>`:Uses the HTML5 history API for standard web apps.
    2.  `<HashRouter>`:Uses hash-based routing for static servers.
    3.  `<MemoryRouter>`:Uses in-memory routing for testing and non-browser environments.
    4.  `<StaticRouter>`:Provides static routing for server-side rendering (SSR).

    The above components will create _browser_, _hash_, _memory_ and _static_ history instances. React Router v6 makes the properties and methods of the `history` instance associated with your router available through the context in the `router` object.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'routing', 'intermediate'],
      '{"source":"reference.md","section":"React Router","originalNum":81}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
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
      '',
      'A history instance has two methods for navigation purpose.

    1.  `push()`
    2.  `replace()`

    If you think of the history as an array of visited locations, `push()` will add a new location to the array and `replace()` will replace the current location in the array with the new one.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'routing', 'intermediate'],
      '{"source":"reference.md","section":"React Router","originalNum":82}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
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
      '',
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
      '{"source":"reference.md","section":"React Router","originalNum":83}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
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
      '',
      'The ability to parse query strings was taken out of React Router v4 because there have been user requests over the years to support different implementation. So the decision has been given to users to choose the implementation they like. The recommended approach is to use query strings library.


    You can also use `URLSearchParams` if you want something native:


    You should use a _polyfill_ for IE11.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'routing', 'intermediate'],
      '{"source":"reference.md","section":"React Router","originalNum":84}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
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
      '',
      'You have to wrap your Route''s in a `<Switch>` block because `<Switch>` is unique in that it renders a route exclusively.

    At first you need to add `Switch` to your imports:


    Then define the routes within `<Switch>` block:',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'routing', 'intermediate'],
      '{"source":"reference.md","section":"React Router","originalNum":85}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
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
      '',
      'While navigating you can pass props to the `history` object:


    The `search` property is used to pass query params in `push()` method.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'routing', 'intermediate'],
      '{"source":"reference.md","section":"React Router","originalNum":86}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
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
      '',
      'A `<Switch>` renders the first child `<Route>` that matches. A `<Route>` with no path always matches. So you just need to simply drop path attribute as below',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'routing', 'intermediate'],
      '{"source":"reference.md","section":"React Router","originalNum":87}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
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
      '',
      'Below are the list of steps to get history object on React Router v4,

    1.  Create a module that exports a `history` object and import this module across the project.

        For example, create `history.js` file:


    2.  You should use the `<Router>` component instead of built-in routers. Import the above `history.js` inside `index.js` file:


    3.  You can also use push method of `history` object similar to built-in history object:',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'routing', 'intermediate'],
      '{"source":"reference.md","section":"React Router","originalNum":88}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
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
      '',
      'The `react-router` package provides `<Redirect>` component in React Router. Rendering a `<Redirect>` will navigate to a new location. Like server-side redirects, the new location will override the current location in the history stack.


      <p>


       </p>',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'routing', 'intermediate'],
      '{"source":"reference.md","section":"React Router","originalNum":89}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
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
      '',
      'The _React Intl_ library makes internationalization in React straightforward, with off-the-shelf components and an API that can handle everything from formatting strings, dates, and numbers, to pluralization. React Intl is part of _FormatJS_ which provides bindings to React via its components and API.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'i18n', 'intermediate'],
      '{"source":"reference.md","section":"React Internationalization","originalNum":90}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What are the main features of React Intl?',
      'Below are the main features of React Intl,

    1.  Display numbers with separators.
    2.  Display dates and times correctly.
    3.  Display dates relative to "now".
    4.  Pluralize labels in strings.
    5.  Support for 150+ languages.
    6.  Runs in the browser and Node.
    7.  Built on standards.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'Below are the main features of React Intl,

    1.  Display numbers with separators.
    2.  Display dates and times correctly.
    3.  Display dates relative to "now".
    4.  Pluralize labels in strings.
    5.  Support for 150+ languages.
    6.  Runs in the browser and Node.
    7.  Built on standards.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'i18n', 'intermediate'],
      '{"source":"reference.md","section":"React Internationalization","originalNum":91}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What are the two ways of formatting in React Intl?',
      '<pre><code>        const messages = defineMessages({
          accountMessage: {
            id: &quot;account&quot;,
            defaultMessage: &quot;The amount is less than minimum balance.&quot;,
          },
        });

        formatMessage(messages.accountMessage);</code></pre>

The library provides two ways to format strings, numbers, and dates:

    1.  **Using react components:**


    2.  **Using an API:**',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'The library provides two ways to format strings, numbers, and dates:

    1.  **Using react components:**


    2.  **Using an API:**',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'i18n', 'intermediate'],
      '{"source":"reference.md","section":"React Internationalization","originalNum":92}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'How to use `<FormattedMessage>` as placeholder using React Intl?',
      '<pre><code>    import React from &quot;react&quot;;
    import { injectIntl, intlShape } from &quot;react-intl&quot;;

    const MyComponent = ({ intl }) =&gt; {
      const placeholder = intl.formatMessage({ id: &quot;messageId&quot; });
      return &lt;input placeholder={placeholder} /&gt;;
    };

    MyComponent.propTypes = {
      intl: intlShape.isRequired,
    };

    export default injectIntl(MyComponent);</code></pre>

The `<Formatted... />` components from `react-intl` return elements, not plain text, so they can''t be used for placeholders, alt text, etc. In that case, you should use lower level API `formatMessage()`. You can inject the `intl` object into your component using `injectIntl()` higher-order component and then format the message using `formatMessage()` available on that object.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'The `<Formatted... />` components from `react-intl` return elements, not plain text, so they can''t be used for placeholders, alt text, etc. In that case, you should use lower level API `formatMessage()`. You can inject the `intl` object into your component using `injectIntl()` higher-order component and then format the message using `formatMessage()` available on that object.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'i18n', 'intermediate'],
      '{"source":"reference.md","section":"React Internationalization","originalNum":93}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'How to access current locale with React Intl?',
      '<pre><code>    import { injectIntl, intlShape } from &quot;react-intl&quot;;

    const MyComponent = ({ intl }) =&gt; (
    );

    MyComponent.propTypes = {
      intl: intlShape.isRequired,
    };

    export default injectIntl(MyComponent);</code></pre>

You can get the current locale in any component of your application using `injectIntl()`:',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'You can get the current locale in any component of your application using `injectIntl()`:',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'i18n', 'intermediate'],
      '{"source":"reference.md","section":"React Internationalization","originalNum":94}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'How to format date using React Intl?',
      '<pre><code>     import { injectIntl, intlShape } from &quot;react-intl&quot;;

     const stringDate = this.props.intl.formatDate(date, {
       year: &quot;numeric&quot;,
       month: &quot;numeric&quot;,
       day: &quot;numeric&quot;,
     });

     const MyComponent = ({ intl }) =&gt; (
     );

     MyComponent.propTypes = {
       intl: intlShape.isRequired,
     };

     export default injectIntl(MyComponent);</code></pre>

The `injectIntl()` higher-order component will give you access to the `formatDate()` method via the props in your component. The method is used internally by instances of `FormattedDate` and it returns the string representation of the formatted date.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'The `injectIntl()` higher-order component will give you access to the `formatDate()` method via the props in your component. The method is used internally by instances of `FormattedDate` and it returns the string representation of the formatted date.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'i18n', 'intermediate'],
      '{"source":"reference.md","section":"React Internationalization","originalNum":95}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What is Shallow Renderer in React testing?',
      '<pre><code>    import ShallowRenderer from &quot;react-test-renderer/shallow&quot;;

    // in your test
    const renderer = new ShallowRenderer();
    renderer.render(&lt;MyComponent /&gt;);

    const result = renderer.getRenderOutput();

    expect(result.type).toBe(&quot;div&quot;);
    expect(result.props.children).toEqual([
      &lt;span className={&quot;heading&quot;}&gt;{&quot;Title&quot;}&lt;/span&gt;,
      &lt;span className={&quot;description&quot;}&gt;{&quot;Description&quot;}&lt;/span&gt;,
    ]);</code></pre>

_Shallow rendering_ is useful for writing unit test cases in React. It lets you render a component _one level deep_ and assert facts about what its render method returns, without worrying about the behavior of child components, which are not instantiated or rendered.

    For example, if you have the following component:


    Then you can assert as follows:',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      '_Shallow rendering_ is useful for writing unit test cases in React. It lets you render a component _one level deep_ and assert facts about what its render method returns, without worrying about the behavior of child components, which are not instantiated or rendered.

    For example, if you have the following component:


    Then you can assert as follows:',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'testing', 'intermediate'],
      '{"source":"reference.md","section":"React Testing","originalNum":96}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What is `TestRenderer` package in React?',
      '<pre><code>    import TestRenderer from &quot;react-test-renderer&quot;;

    const Link = ({ page, children }) =&gt; &lt;a href={page}&gt;{children}&lt;/a&gt;;

    const testRenderer = TestRenderer.create(
      &lt;Link page={&quot;https://www.facebook.com/&quot;}&gt;{&quot;Facebook&quot;}&lt;/Link&gt;
    );

    console.log(testRenderer.toJSON());
    // {
    //   type: &#039;a&#039;,
    //   props: { href: &#039;https://www.facebook.com/&#039; },
    //   children: [ &#039;Facebook&#039; ]
    // }</code></pre>

This package provides a renderer that can be used to render components to pure JavaScript objects, without depending on the DOM or a native mobile environment. This package makes it easy to grab a snapshot of the platform view hierarchy (similar to a DOM tree) rendered by a ReactDOM or React Native without using a browser or `jsdom`.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'This package provides a renderer that can be used to render components to pure JavaScript objects, without depending on the DOM or a native mobile environment. This package makes it easy to grab a snapshot of the platform view hierarchy (similar to a DOM tree) rendered by a ReactDOM or React Native without using a browser or `jsdom`.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'testing', 'intermediate'],
      '{"source":"reference.md","section":"React Testing","originalNum":97}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What is the purpose of ReactTestUtils package?',
      '_ReactTestUtils_ are provided in the `with-addons` package and allow you to perform actions against a simulated DOM for the purpose of unit testing.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      '_ReactTestUtils_ are provided in the `with-addons` package and allow you to perform actions against a simulated DOM for the purpose of unit testing.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'testing', 'intermediate'],
      '{"source":"reference.md","section":"React Testing","originalNum":98}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What is Jest?',
      '_Jest_ is a JavaScript unit testing framework created by Facebook based on Jasmine and provides automated mock creation and a `jsdom` environment. It''s often used for testing components.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      '_Jest_ is a JavaScript unit testing framework created by Facebook based on Jasmine and provides automated mock creation and a `jsdom` environment. It''s often used for testing components.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'testing', 'intermediate'],
      '{"source":"reference.md","section":"React Testing","originalNum":99}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What are the advantages of Jest over Jasmine?',
      'There are couple of advantages compared to Jasmine:

     - Automatically finds tests to execute in your source code.
     - Automatically mocks dependencies when running your tests.
     - Allows you to test asynchronous code synchronously.
     - Runs your tests with a fake DOM implementation (via `jsdom`) so that your tests can be run on the command line.
     - Runs tests in parallel processes so that they finish sooner.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'There are couple of advantages compared to Jasmine:

     - Automatically finds tests to execute in your source code.
     - Automatically mocks dependencies when running your tests.
     - Allows you to test asynchronous code synchronously.
     - Runs your tests with a fake DOM implementation (via `jsdom`) so that your tests can be run on the command line.
     - Runs tests in parallel processes so that they finish sooner.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'testing', 'intermediate'],
      '{"source":"reference.md","section":"React Testing","originalNum":100}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.310Z',
      '2025-11-18T18:46:59.310Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    );