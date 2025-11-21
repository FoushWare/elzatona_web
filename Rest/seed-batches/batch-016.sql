-- Batch 16: Questions 151-160 (10 questions)
INSERT INTO questions (
  id, title, content, type, difficulty, points, options, correct_answer, 
  explanation, test_cases, hints, tags, metadata, stats, category_id, 
  learning_card_id, is_active, created_at, updated_at, topic_id, time_limit
) VALUES (
    gen_random_uuid(),
    'Give an example of Styled Components?',
    '<pre><code>     &lt;Wrapper&gt;
       &lt;Title&gt;{&quot;Lets start first styled component!&quot;}&lt;/Title&gt;
     &lt;/Wrapper&gt;</code></pre>

Lets create `<Title>` and `<Wrapper>` components with specific styles for each.


     These two variables, `Title` and `Wrapper`, are now components that you can render just like any other react component.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Lets create `<Title>` and `<Wrapper>` components with specific styles for each.


     These two variables, `Title` and `Wrapper`, are now components that you can render just like any other react component.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'integration', 'intermediate'],
    '{"source":"reference.md","section":"React supported libraries & Integration","originalNum":151}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is Relay?',
    'Relay is a JavaScript framework for providing a data layer and client-server communication to web applications using the React view layer.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Relay is a JavaScript framework for providing a data layer and client-server communication to web applications using the React view layer.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'integration', 'intermediate'],
    '{"source":"reference.md","section":"React supported libraries & Integration","originalNum":152}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What are the main features of Reselect library?',
    '<pre><code>     import { createSelector } from &quot;reselect&quot;;

     const shopItemsSelector = (state) =&gt; state.shop.items;
     const taxPercentSelector = (state) =&gt; state.shop.taxPercent;

     const subtotalSelector = createSelector(shopItemsSelector, (items) =&gt;
       items.reduce((acc, item) =&gt; acc + item.value, 0)
     );

     const taxSelector = createSelector(
       subtotalSelector,
       taxPercentSelector,
       (subtotal, taxPercent) =&gt; subtotal * (taxPercent / 100)
     );

     export const totalSelector = createSelector(
       subtotalSelector,
       taxSelector,
       (subtotal, tax) =&gt; ({ total: subtotal + tax })
     );

     let exampleState = {
       shop: {
         taxPercent: 8,
         items: [
           { name: &quot;apple&quot;, value: 1.2 },
           { name: &quot;orange&quot;, value: 0.95 },
         ],
       },
     };

     console.log(subtotalSelector(exampleState)); // 2.15
     console.log(taxSelector(exampleState)); // 0.172
     console.log(totalSelector(exampleState)); // { total: 2.322 }</code></pre>

Let''s see the main features of Reselect library,

     1. Selectors can compute derived data, allowing Redux to store the minimal possible state.
     2. Selectors are efficient. A selector is not recomputed unless one of its arguments changes.
     3. Selectors are composable. They can be used as input to other selectors.

154. #### Give an example of Reselect usage?

     Let''s take calculations and different amounts of a shipment order with the simplified usage of Reselect:',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Let''s see the main features of Reselect library,

     1. Selectors can compute derived data, allowing Redux to store the minimal possible state.
     2. Selectors are efficient. A selector is not recomputed unless one of its arguments changes.
     3. Selectors are composable. They can be used as input to other selectors.

154. #### Give an example of Reselect usage?

     Let''s take calculations and different amounts of a shipment order with the simplified usage of Reselect:',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":153}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'Can Redux only be used with React?',
    'Redux can be used as a data store for any UI layer. The most common usage is with React and React Native, but there are bindings available for Angular, Angular 2, Vue, Mithril, and more. Redux simply provides a subscription mechanism which can be used by any other code.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Redux can be used as a data store for any UI layer. The most common usage is with React and React Native, but there are bindings available for Angular, Angular 2, Vue, Mithril, and more. Redux simply provides a subscription mechanism which can be used by any other code.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":155}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'Do you need to have a particular build tool to use Redux?',
    'Redux is originally written in ES6 and transpiled for production into ES5 with Webpack and Babel. You should be able to use it regardless of your JavaScript build process. Redux also offers a UMD build that can be used directly without any build process at all.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Redux is originally written in ES6 and transpiled for production into ES5 with Webpack and Babel. You should be able to use it regardless of your JavaScript build process. Redux also offers a UMD build that can be used directly without any build process at all.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":156}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How Redux Form `initialValues` get updated from state?',
    '<pre><code>     const InitializeFromStateForm = reduxForm({
       form: &quot;initializeFromState&quot;,
       enableReinitialize: true,
     })(UserEdit);</code></pre>

You need to add `enableReinitialize : true` setting.


     If your `initialValues` prop gets updated, your form will update too.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'You need to add `enableReinitialize : true` setting.


     If your `initialValues` prop gets updated, your form will update too.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":157}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How React PropTypes allow different types for one prop?',
    '<pre><code>     Component.propTypes = {
       size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
     };</code></pre>

You can use `oneOfType()` method of `PropTypes`.

     For example, the height property can be defined with either `string` or `number` type as below:',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'You can use `oneOfType()` method of `PropTypes`.

     For example, the height property can be defined with either `string` or `number` type as below:',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":158}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'Can I import an SVG file as react component?',
    '<pre><code>     import { ReactComponent as Logo } from &quot;./logo.svg&quot;;

     const App = () =&gt; (
         {/* Logo is an actual react component */}
         &lt;Logo /&gt;
     );</code></pre>

You can import SVG directly as component instead of loading it as a file. This feature is available with `react-scripts@2.0.0` and higher.


     **Note**: Don''t forget about the curly braces in the import.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'You can import SVG directly as component instead of loading it as a file. This feature is available with `react-scripts@2.0.0` and higher.


     **Note**: Don''t forget about the curly braces in the import.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":159}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'What is render hijacking in react?',
    'The concept of render hijacking is the ability to control what a component will output from another component. It means that you decorate your component by wrapping it into a Higher-Order component. By wrapping, you can inject additional props or make other changes, which can cause changing logic of rendering. It does not actually enable hijacking, but by using HOC you make your component behave differently.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The concept of render hijacking is the ability to control what a component will output from another component. It means that you decorate your component by wrapping it into a Higher-Order component. By wrapping, you can inject additional props or make other changes, which can cause changing logic of rendering. It does not actually enable hijacking, but by using HOC you make your component behave differently.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":160}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  ),
    (
    gen_random_uuid(),
    'How to pass numbers to React component?',
    '<pre><code>     import React from &quot;react&quot;;

     const ChildComponent = ({ name, age }) =&gt; {
       return (
         &lt;&gt;
           My Name is {name} and Age is {age}
         &lt;/&gt;
       );
     };

     const ParentComponent = () =&gt; {
       return (
         &lt;&gt;
           &lt;ChildComponent name=&quot;Chetan&quot; age={30} /&gt;
         &lt;/&gt;
       );
     };

     export default ParentComponent;</code></pre>

We can pass `numbers` as `props` to React component using curly braces `{}` where as `strings` in double quotes `""` or single quotes `''''`',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'We can pass `numbers` as `props` to React component using curly braces `{}` where as `strings` in double quotes `""` or single quotes `''''`',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":161}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  );
