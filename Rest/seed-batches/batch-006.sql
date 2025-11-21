-- Batch 6: Questions 51-60 (10 questions)
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
    NULL,
    'Both render props and higher-order components render only a single child but in most of the cases Hooks are a simpler way to serve this by reducing nesting in your tree.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":51}'::jsonb,
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
    NULL,
    'A _switching component_ is a component that renders one of many components. We need to use object to map prop values to components.

    For example, a switching component to display different pages based on `page` prop:',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":52}'::jsonb,
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
    NULL,
    '_Mixins_ are a way to totally separate components to have a common functionality. Mixins **should not be used** and can be replaced with _higher-order components_ or _decorators_.

    One of the most commonly used mixins is `PureRenderMixin`. You might be using it in some components to prevent unnecessary re-renders when the props and state are shallowly equal to the previous props and state:


     <!-- TODO: mixins are deprecated -->',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":53}'::jsonb,
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
    NULL,
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
    '{"source":"reference.md","section":"Core React","originalNum":54}'::jsonb,
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
    'Why should component names start with capital letter?',
    '<pre><code>    import MyComponent from &quot;./myComponent&quot;;</code></pre>

If you are rendering your component using JSX, the name of that component has to begin with a capital letter otherwise React will throw an error as an unrecognized tag. This convention is because only HTML elements and SVG tags can begin with a lowercase letter.


    You can define function component whose name starts with lowercase letter, but when it''s imported it should have a capital letter. Here lowercase is fine:


    While when imported in another file it should start with capital letter:',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'If you are rendering your component using JSX, the name of that component has to begin with a capital letter otherwise React will throw an error as an unrecognized tag. This convention is because only HTML elements and SVG tags can begin with a lowercase letter.


    You can define function component whose name starts with lowercase letter, but when it''s imported it should have a capital letter. Here lowercase is fine:


    While when imported in another file it should start with capital letter:',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":55}'::jsonb,
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
    NULL,
    'Yes. In the past, React used to ignore unknown DOM attributes. If you wrote JSX with an attribute that React doesn''t recognize, React would just skip it.

    For example, let''s take a look at the below attribute:


    Would render an empty div to the DOM with React v15:


    In React v16 any unknown attributes will end up in the DOM:


    This is useful for supplying browser-specific non-standard attributes, trying new DOM APIs, and integrating with opinionated third-party libraries.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":56}'::jsonb,
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
    NULL,
    'You can simply use `Array.prototype.map` with ES6 _arrow function_ syntax.

    For example, the `items` array of objects is mapped into an array of components:


    But you can''t iterate using `for` loop:


    This is because JSX tags are transpiled into _function calls_, and you can''t use statements inside expressions. This may change thanks to `do` expressions which are _stage 1 proposal_.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":57}'::jsonb,
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
    'How do you access props in attribute quotes?',
    '<pre><code>    &lt;img className=&quot;image&quot; src={`images/${this.props.image}`} /&gt;</code></pre>

React (or JSX) doesn''t support variable interpolation inside an attribute value. The below representation won''t work:


    But you can put any JS expression inside curly braces as the entire attribute value. So the below expression works:


    Using _template strings_ will also work:',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'React (or JSX) doesn''t support variable interpolation inside an attribute value. The below representation won''t work:


    But you can put any JS expression inside curly braces as the entire attribute value. So the below expression works:


    Using _template strings_ will also work:',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":58}'::jsonb,
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
    NULL,
    'If you want to pass an array of objects to a component with a particular shape then use `React.PropTypes.shape()` as an argument to `React.PropTypes.arrayOf()`.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":59}'::jsonb,
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
    'How to conditionally apply class attributes?',
    'You shouldn''t use curly braces inside quotes because it is going to be evaluated as a string.


    Instead you need to move curly braces outside (don''t forget to include spaces between class names):


    _Template strings_ will also work:',
    'open-ended',
    'beginner',
    10,
    NULL,
    NULL,
    'You shouldn''t use curly braces inside quotes because it is going to be evaluated as a string.


    Instead you need to move curly braces outside (don''t forget to include spaces between class names):


    _Template strings_ will also work:',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'core-concepts', 'beginner'],
    '{"source":"reference.md","section":"Core React","originalNum":60}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.522Z',
    '2025-11-18T20:44:53.522Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  );
