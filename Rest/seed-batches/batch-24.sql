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
      '',
      'Lets create `<Title>` and `<Wrapper>` components with specific styles for each.


     These two variables, `Title` and `Wrapper`, are now components that you can render just like any other react component.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'integration', 'intermediate'],
      '{"source":"reference.md","section":"React supported libraries & Integration","originalNum":151}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.312Z',
      '2025-11-18T18:46:59.312Z',
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
      '',
      'Relay is a JavaScript framework for providing a data layer and client-server communication to web applications using the React view layer.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'integration', 'intermediate'],
      '{"source":"reference.md","section":"React supported libraries & Integration","originalNum":152}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.312Z',
      '2025-11-18T18:46:59.312Z',
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
      '',
      'Let''s see the main features of Reselect library,

     1. Selectors can compute derived data, allowing Redux to store the minimal possible state.
     2. Selectors are efficient. A selector is not recomputed unless one of its arguments changes.
     3. Selectors are composable. They can be used as input to other selectors.

154. #### Give an example of Reselect usage?

     Let''s take calculations and different amounts of a shipment order with the simplified usage of Reselect:',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":153}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.312Z',
      '2025-11-18T18:46:59.312Z',
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
      '',
      'Redux can be used as a data store for any UI layer. The most common usage is with React and React Native, but there are bindings available for Angular, Angular 2, Vue, Mithril, and more. Redux simply provides a subscription mechanism which can be used by any other code.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":155}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.312Z',
      '2025-11-18T18:46:59.312Z',
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
      '',
      'Redux is originally written in ES6 and transpiled for production into ES5 with Webpack and Babel. You should be able to use it regardless of your JavaScript build process. Redux also offers a UMD build that can be used directly without any build process at all.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":156}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.312Z',
      '2025-11-18T18:46:59.312Z',
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
      '',
      'You need to add `enableReinitialize : true` setting.


     If your `initialValues` prop gets updated, your form will update too.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":157}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.312Z',
      '2025-11-18T18:46:59.312Z',
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
      '',
      'You can use `oneOfType()` method of `PropTypes`.

     For example, the height property can be defined with either `string` or `number` type as below:',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":158}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.312Z',
      '2025-11-18T18:46:59.312Z',
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
      '',
      'You can import SVG directly as component instead of loading it as a file. This feature is available with `react-scripts@2.0.0` and higher.


     **Note**: Don''t forget about the curly braces in the import.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":159}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.312Z',
      '2025-11-18T18:46:59.312Z',
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
      '',
      'The concept of render hijacking is the ability to control what a component will output from another component. It means that you decorate your component by wrapping it into a Higher-Order component. By wrapping, you can inject additional props or make other changes, which can cause changing logic of rendering. It does not actually enable hijacking, but by using HOC you make your component behave differently.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":160}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.312Z',
      '2025-11-18T18:46:59.312Z',
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
      '',
      'We can pass `numbers` as `props` to React component using curly braces `{}` where as `strings` in double quotes `""` or single quotes `''''`',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":161}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.312Z',
      '2025-11-18T18:46:59.312Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'Do I need to keep all my state into Redux? Should I ever use react internal state?',
      'It is up to the developer''s decision, i.e., it is developer''s job to determine what kinds of state make up your application, and where each piece of state should live. Some users prefer to keep every single piece of data in Redux, to maintain a fully serializable and controlled version of their application at all times. Others prefer to keep non-critical or UI state, such as “is this dropdown currently open”, inside a component''s internal state.

     Below are the rules of thumb to determine what kind of data should be put into Redux

     1. Do other parts of the application care about this data?
     2. Do you need to be able to create further derived data based on this original data?
     3. Is the same data being used to drive multiple components?
     4. Is there value to you in being able to restore this state to a given point in time (ie, time travel debugging)?
     5. Do you want to cache the data (i.e, use what''s in state if it''s already there instead of re-requesting it)?',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'It is up to the developer''s decision, i.e., it is developer''s job to determine what kinds of state make up your application, and where each piece of state should live. Some users prefer to keep every single piece of data in Redux, to maintain a fully serializable and controlled version of their application at all times. Others prefer to keep non-critical or UI state, such as “is this dropdown currently open”, inside a component''s internal state.

     Below are the rules of thumb to determine what kind of data should be put into Redux

     1. Do other parts of the application care about this data?
     2. Do you need to be able to create further derived data based on this original data?
     3. Is the same data being used to drive multiple components?
     4. Is there value to you in being able to restore this state to a given point in time (ie, time travel debugging)?
     5. Do you want to cache the data (i.e, use what''s in state if it''s already there instead of re-requesting it)?',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":162}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.312Z',
      '2025-11-18T18:46:59.312Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What is the purpose of registerServiceWorker in React?',
      '<pre><code>     import React from &quot;react&quot;;
     import ReactDOM from &quot;react-dom&quot;;
     import App from &quot;./App&quot;;
     import registerServiceWorker from &quot;./registerServiceWorker&quot;;

     ReactDOM.render(&lt;App /&gt;, document.getElementById(&quot;root&quot;));
     registerServiceWorker();</code></pre>

React creates a service worker for you without any configuration by default. The service worker is a web API that helps you cache your assets and other files so that when the user is offline or on a slow network, he/she can still see results on the screen, as such, it helps you build a better user experience, that''s what you should know about service worker for now. It''s all about adding offline capabilities to your site.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'React creates a service worker for you without any configuration by default. The service worker is a web API that helps you cache your assets and other files so that when the user is offline or on a slow network, he/she can still see results on the screen, as such, it helps you build a better user experience, that''s what you should know about service worker for now. It''s all about adding offline capabilities to your site.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":163}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.312Z',
      '2025-11-18T18:46:59.312Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What is React memo function?',
      '<pre><code>     const MyComponent = React.memo(function MyComponent(props) {
       /* only rerenders if props change */
     });</code></pre>

Class components can be restricted from re-rendering when their input props are the same using **PureComponent or shouldComponentUpdate**. Now you can do the same with function components by wrapping them in **React.memo**.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'Class components can be restricted from re-rendering when their input props are the same using **PureComponent or shouldComponentUpdate**. Now you can do the same with function components by wrapping them in **React.memo**.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":164}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.312Z',
      '2025-11-18T18:46:59.312Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What is React lazy function?',
      '<pre><code>     const OtherComponent = React.lazy(() =&gt; import(&quot;./OtherComponent&quot;));

     function MyComponent() {
       return (
           &lt;OtherComponent /&gt;
       );
     }</code></pre>

The `React.lazy` function lets you render a dynamic import as a regular component. It will automatically load the bundle containing the `OtherComponent` when the component gets rendered. This must return a Promise which resolves to a module with a default export containing a React component.


     **Note:**
     `React.lazy` and `Suspense` is not yet available for server-side rendering. If you want to do code-splitting in a server rendered app, we still recommend React Loadable.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'The `React.lazy` function lets you render a dynamic import as a regular component. It will automatically load the bundle containing the `OtherComponent` when the component gets rendered. This must return a Promise which resolves to a module with a default export containing a React component.


     **Note:**
     `React.lazy` and `Suspense` is not yet available for server-side rendering. If you want to do code-splitting in a server rendered app, we still recommend React Loadable.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":165}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.312Z',
      '2025-11-18T18:46:59.312Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'How to prevent unnecessary updates using setState?',
      '<pre><code>     getUserProfile = (user) =&gt; {
       const latestAddress = user.address;
       this.setState((state) =&gt; {
         if (state.address === latestAddress) {
           return null;
         } else {
           return { title: latestAddress };
         }
       });
     };</code></pre>

You can compare the current value of the state with an existing state value and decide whether to rerender the page or not. If the values are the same then you need to return **null** to stop re-rendering otherwise return the latest state value.

     For example, the user profile information is conditionally rendered as follows,',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'You can compare the current value of the state with an existing state value and decide whether to rerender the page or not. If the values are the same then you need to return **null** to stop re-rendering otherwise return the latest state value.

     For example, the user profile information is conditionally rendered as follows,',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":166}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.312Z',
      '2025-11-18T18:46:59.312Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'How do you render Array, Strings and Numbers in React 16 Version?',
      '<pre><code>     render() {
      return &#039;Welcome to ReactJS questions&#039;;
     }
     // Number
     render() {
      return 2018;
     }</code></pre>

**Arrays**: Unlike older releases, you don''t need to make sure **render** method return a single element in React16. You are able to return multiple sibling elements without a wrapping element by returning an array.

     For example, let us take the below list of developers,


     You can also merge this array of items in another array component.


     **Strings and Numbers:** You can also return string and number type from the render method.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      '**Arrays**: Unlike older releases, you don''t need to make sure **render** method return a single element in React16. You are able to return multiple sibling elements without a wrapping element by returning an array.

     For example, let us take the below list of developers,


     You can also merge this array of items in another array component.


     **Strings and Numbers:** You can also return string and number type from the render method.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":167}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.312Z',
      '2025-11-18T18:46:59.312Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What are hooks?',
      '<pre><code>     import { useState } from &quot;react&quot;;

     function Example() {
       // Declare a new state variable, which we&#039;ll call &quot;count&quot;
       const [count, setCount] = useState(0);

       return (
         &lt;&gt;
           &lt;p&gt;You clicked {count} times&lt;/p&gt;
           &lt;button onClick={() =&gt; setCount(count + 1)}&gt;Click me&lt;/button&gt;
         &lt;/&gt;
       );
     }</code></pre>

Hooks is a special JavaScript function that allows you use state and other React features without writing a class. This pattern has been introduced as a new feature in React 16.8 and helped to isolate the stateful logic from the components.

     Let''s see an example of useState hook:


     **Note:** Hooks can be used inside an existing function component without rewriting the component.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'Hooks is a special JavaScript function that allows you use state and other React features without writing a class. This pattern has been introduced as a new feature in React 16.8 and helped to isolate the stateful logic from the components.

     Let''s see an example of useState hook:


     **Note:** Hooks can be used inside an existing function component without rewriting the component.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":168}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.312Z',
      '2025-11-18T18:46:59.312Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What rules need to be followed for hooks?',
      '<pre><code>      //Example1
      function normalFunction() {
        // Incorrect: Can&#039;t call hooks in normal functions
        const [count, setCount] = useState(0); 
      }

      //Example2
      function fetchData(url) {
        // Incorrect: Hooks can&#039;t be used in non-React functions
        const [data, setData] = useState(null);

        useEffect(() =&gt; {
          fetch(url)
            .then((response) =&gt; response.json())
            .then((data) =&gt; setData(data));
        }, [url]);

        return data;
      }</code></pre>

You need to follow two rules in order to use hooks,

     1. **Call Hooks only at the top level of your react functions:** You should always use hooks at the top level of react function before any early returns. i.e, You shouldn’t call Hooks inside loops, conditions, or nested functions. This will ensure that Hooks are called in the same order each time a component renders and it preserves the state of Hooks between multiple re-renders due to `useState` and `useEffect` calls.

     Let''s see the difference using an example,
     **Correct usage:**:
     **Incorrect usage:**:
     The `useState` hook for the country field is being called conditionally within an `if` block. This can lead to inconsistent state behavior and may cause hooks to be called in a different order on each re-render.

     2. **Call Hooks from React Functions only:** You shouldn’t call Hooks from regular JavaScript functions or class components. Instead, you should call them from either function components or custom hooks.

     Let''s find the difference of correct and incorrect usage with below examples,

     **Correct usage:**:
     **Incorrect usage:**:
     In the above incorrect usage example, both `useState` and `useEffect` are used in non-React functions(`normalFunction` and `fetchData`), which is not allowed.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'You need to follow two rules in order to use hooks,

     1. **Call Hooks only at the top level of your react functions:** You should always use hooks at the top level of react function before any early returns. i.e, You shouldn’t call Hooks inside loops, conditions, or nested functions. This will ensure that Hooks are called in the same order each time a component renders and it preserves the state of Hooks between multiple re-renders due to `useState` and `useEffect` calls.

     Let''s see the difference using an example,
     **Correct usage:**:
     **Incorrect usage:**:
     The `useState` hook for the country field is being called conditionally within an `if` block. This can lead to inconsistent state behavior and may cause hooks to be called in a different order on each re-render.

     2. **Call Hooks from React Functions only:** You shouldn’t call Hooks from regular JavaScript functions or class components. Instead, you should call them from either function components or custom hooks.

     Let''s find the difference of correct and incorrect usage with below examples,

     **Correct usage:**:
     **Incorrect usage:**:
     In the above incorrect usage example, both `useState` and `useEffect` are used in non-React functions(`normalFunction` and `fetchData`), which is not allowed.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":169}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.312Z',
      '2025-11-18T18:46:59.312Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'How to ensure hooks followed the rules in your project?',
      '<pre><code>        useEffect(() =&gt; {
          // Forgetting `message` will result in incorrect behavior
          console.log(message);
        }, []); // Here `message` should be a dependency</code></pre>

React team released an ESLint plugin called **eslint-plugin-react-hooks** that enforces Hook''s two rules. It is part of Hooks API. You can add this plugin to your project using the below command,


        And apply the below config in your ESLint config file,


        This plugin also provide another important rule through `react-hooks/exhaustive-deps`. It ensures that the dependencies of useEffect, useCallback, and useMemo hooks are correctly listed to avoid potential bugs.

        The recommended `eslint-config-react-app` preset already includes the hooks rules of this plugin.
        For example, the linter enforce proper naming convention for hooks. If you rename your custom hooks which as prefix "use" to something else then linter won''t allow you to call built-in hooks such as useState, useEffect etc inside of your custom hook anymore.

        **Note:** This plugin is intended to use in Create React App by default.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'React team released an ESLint plugin called **eslint-plugin-react-hooks** that enforces Hook''s two rules. It is part of Hooks API. You can add this plugin to your project using the below command,


        And apply the below config in your ESLint config file,


        This plugin also provide another important rule through `react-hooks/exhaustive-deps`. It ensures that the dependencies of useEffect, useCallback, and useMemo hooks are correctly listed to avoid potential bugs.

        The recommended `eslint-config-react-app` preset already includes the hooks rules of this plugin.
        For example, the linter enforce proper naming convention for hooks. If you rename your custom hooks which as prefix "use" to something else then linter won''t allow you to call built-in hooks such as useState, useEffect etc inside of your custom hook anymore.

        **Note:** This plugin is intended to use in Create React App by default.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":170}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.312Z',
      '2025-11-18T18:46:59.312Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What are the differences between Flux and Redux?',
      'Below are the major differences between Flux and Redux

     | Flux                                           | Redux                                      |
     | ---------------------------------------------- | ------------------------------------------ |
     | State is mutable                               | State is immutable                         |
     | The Store contains both state and change logic | The Store and change logic are separate    |
     | There are multiple stores exist                | There is only one store exist              |
     | All the stores are disconnected and flat       | Single store with hierarchical reducers    |
     | It has a singleton dispatcher                  | There is no concept of dispatcher          |
     | React components subscribe to the store        | Container components uses connect function |',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'Below are the major differences between Flux and Redux

     | Flux                                           | Redux                                      |
     | ---------------------------------------------- | ------------------------------------------ |
     | State is mutable                               | State is immutable                         |
     | The Store contains both state and change logic | The Store and change logic are separate    |
     | There are multiple stores exist                | There is only one store exist              |
     | All the stores are disconnected and flat       | Single store with hierarchical reducers    |
     | It has a singleton dispatcher                  | There is no concept of dispatcher          |
     | React components subscribe to the store        | Container components uses connect function |',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":171}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.312Z',
      '2025-11-18T18:46:59.312Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What are the benefits of React Router V4?',
      'Below are the main benefits of React Router V4 module,

     1. In React Router v4(version 4), the API is completely about components. A router can be visualized as a single component(`<BrowserRouter>`) which wraps specific child router components(`<Route>`).
     2. You don''t need to manually set history. The router module will take care history by wrapping routes with `<BrowserRouter>` component.
     3. The application size is reduced by adding only the specific router module(Web, core, or native)',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'Below are the main benefits of React Router V4 module,

     1. In React Router v4(version 4), the API is completely about components. A router can be visualized as a single component(`<BrowserRouter>`) which wraps specific child router components(`<Route>`).
     2. You don''t need to manually set history. The router module will take care history by wrapping routes with `<BrowserRouter>` component.
     3. The application size is reduced by adding only the specific router module(Web, core, or native)',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":172}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.312Z',
      '2025-11-18T18:46:59.312Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'Can you describe about componentDidCatch lifecycle method signature?',
      '<pre><code>     componentDidCatch(error, info);</code></pre>

The **componentDidCatch** lifecycle method is invoked after an error has been thrown by a descendant component. The method receives two parameters,

     1. error: - The error object which was thrown
     2. info: - An object with a componentStack key contains the information about which component threw the error.

     The method structure would be as follows',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'The **componentDidCatch** lifecycle method is invoked after an error has been thrown by a descendant component. The method receives two parameters,

     1. error: - The error object which was thrown
     2. info: - An object with a componentStack key contains the information about which component threw the error.

     The method structure would be as follows',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":173}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.312Z',
      '2025-11-18T18:46:59.312Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'In which scenarios do error boundaries not catch errors?',
      'Below are the cases in which error boundaries don''t work,

     1. Inside Event handlers
     2. Asynchronous code using **setTimeout or requestAnimationFrame** callbacks
     3. During Server side rendering
     4. When errors thrown in the error boundary code itself',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'Below are the cases in which error boundaries don''t work,

     1. Inside Event handlers
     2. Asynchronous code using **setTimeout or requestAnimationFrame** callbacks
     3. During Server side rendering
     4. When errors thrown in the error boundary code itself',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":174}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.312Z',
      '2025-11-18T18:46:59.312Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What is the behavior of uncaught errors in react 16?',
      'In React 16, errors that were not caught by any error boundary will result in unmounting of the whole React component tree. The reason behind this decision is that it is worse to leave corrupted UI in place than to completely remove it. For example, it is worse for a payments app to display a wrong amount than to render nothing.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'In React 16, errors that were not caught by any error boundary will result in unmounting of the whole React component tree. The reason behind this decision is that it is worse to leave corrupted UI in place than to completely remove it. For example, it is worse for a payments app to display a wrong amount than to render nothing.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":175}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.312Z',
      '2025-11-18T18:46:59.312Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What is the proper placement for error boundaries?',
      'The granularity of error boundaries usage is up to the developer based on project needs. You can follow either of these approaches,
     1. You can wrap top-level route components to display a generic error message for the entire application.
     2. You can also wrap individual components in an error boundary to protect them from crashing the rest of the application.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'The granularity of error boundaries usage is up to the developer based on project needs. You can follow either of these approaches,
     1. You can wrap top-level route components to display a generic error message for the entire application.
     2. You can also wrap individual components in an error boundary to protect them from crashing the rest of the application.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":176}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.312Z',
      '2025-11-18T18:46:59.312Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What is the benefit of component stack trace from error boundary?',
      'Apart from error messages and javascript stack, React16 will display the component stack trace with file names and line numbers using error boundary concept.

     For example, BuggyCounter component displays the component stack trace as below,

     ![stacktrace](images/error_boundary.png)',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'Apart from error messages and javascript stack, React16 will display the component stack trace with file names and line numbers using error boundary concept.

     For example, BuggyCounter component displays the component stack trace as below,

     ![stacktrace](images/error_boundary.png)',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":177}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.312Z',
      '2025-11-18T18:46:59.312Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What are default props?',
      '<pre><code>     function MyButton() {
       return &lt;MyButton /&gt;; // props.color will contain red value
     }</code></pre>

The _defaultProps_ can be defined as a property on the component to set the default values for the props. These default props are used when props not supplied(i.e., undefined props), but not for `null` or `0` as props. That means, If you provide null value then it remains null value. It''s the same behavior with 0 as well.

     For example, let us create color default prop for the button component,


     If `props.color` is not provided then it will set the default value to ''red''. i.e, Whenever you try to access the color prop it uses the default value',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'The _defaultProps_ can be defined as a property on the component to set the default values for the props. These default props are used when props not supplied(i.e., undefined props), but not for `null` or `0` as props. That means, If you provide null value then it remains null value. It''s the same behavior with 0 as well.

     For example, let us create color default prop for the button component,


     If `props.color` is not provided then it will set the default value to ''red''. i.e, Whenever you try to access the color prop it uses the default value',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":178}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.312Z',
      '2025-11-18T18:46:59.312Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What is the purpose of displayName class property?',
      '<pre><code>     function withSubscription(WrappedComponent) {
       class WithSubscription extends React.Component {
         /* ... */
       }
       WithSubscription.displayName = `WithSubscription(${getDisplayName(
         WrappedComponent
       )})`;
       return WithSubscription;
     }
     function getDisplayName(WrappedComponent) {
       return (
         WrappedComponent.displayName || WrappedComponent.name || &quot;Component&quot;
       );
     }</code></pre>

The displayName string is used in debugging messages. Usually, you don’t need to set it explicitly because it’s inferred from the name of the function or class that defines the component. You might want to set it explicitly if you want to display a different name for debugging purposes or when you create a higher-order component.

     For example, To ease debugging, choose a display name that communicates that it’s the result of a withSubscription HOC.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'The displayName string is used in debugging messages. Usually, you don’t need to set it explicitly because it’s inferred from the name of the function or class that defines the component. You might want to set it explicitly if you want to display a different name for debugging purposes or when you create a higher-order component.

     For example, To ease debugging, choose a display name that communicates that it’s the result of a withSubscription HOC.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":179}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.312Z',
      '2025-11-18T18:46:59.312Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What is the browser support for react applications?',
      'React supports all popular browsers, including Internet Explorer 9 and above, although some polyfills are required for older browsers such as IE 9 and IE 10. If you use **es5-shim and es5-sham** polyfill then it even support old browsers that doesn''t support ES5 methods.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'React supports all popular browsers, including Internet Explorer 9 and above, although some polyfills are required for older browsers such as IE 9 and IE 10. If you use **es5-shim and es5-sham** polyfill then it even support old browsers that doesn''t support ES5 methods.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":180}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.312Z',
      '2025-11-18T18:46:59.312Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What is code-splitting?',
      '<pre><code>    import React, { Component } from &quot;react&quot;;

     class App extends Component {
       handleClick = () =&gt; {
         import(&quot;./moduleA&quot;)
           .then(({ moduleA }) =&gt; {
             // Use moduleA
           })
           .catch((err) =&gt; {
             // Handle failure
           });
       };

       render() {
         return (
             &lt;button onClick={this.handleClick}&gt;Load&lt;/button&gt;
         );
       }
     }

     export default App;</code></pre>

Code-Splitting is a feature supported by bundlers like Webpack and Browserify which can create multiple bundles that can be dynamically loaded at runtime. The react project supports code splitting via dynamic import() feature.

     For example, in the below code snippets, it will make moduleA.js and all its unique dependencies as a separate chunk that only loads after the user clicks the ''Load'' button.

     **moduleA.js**


     **App.js**


    <p>


  </p>',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'Code-Splitting is a feature supported by bundlers like Webpack and Browserify which can create multiple bundles that can be dynamically loaded at runtime. The react project supports code splitting via dynamic import() feature.

     For example, in the below code snippets, it will make moduleA.js and all its unique dependencies as a separate chunk that only loads after the user clicks the ''Load'' button.

     **moduleA.js**


     **App.js**


    <p>


  </p>',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":181}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.312Z',
      '2025-11-18T18:46:59.312Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What are Keyed Fragments?',
      '<pre><code>     function Glossary(props) {
       return (
         &lt;dl&gt;
           {props.items.map((item) =&gt; (
             // Without the `key`, React will fire a key warning
             &lt;React.Fragment key={item.id}&gt;
               &lt;dt&gt;{item.term}&lt;/dt&gt;
               &lt;dd&gt;{item.description}&lt;/dd&gt;
             &lt;/React.Fragment&gt;
           ))}
         &lt;/dl&gt;
       );
     }</code></pre>

The Fragments declared with the explicit <React.Fragment> syntax may have keys. The general use case is mapping a collection to an array of fragments as below,


     **Note:** key is the only attribute that can be passed to Fragment. In the future, there might be a support for additional attributes, such as event handlers.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'The Fragments declared with the explicit <React.Fragment> syntax may have keys. The general use case is mapping a collection to an array of fragments as below,


     **Note:** key is the only attribute that can be passed to Fragment. In the future, there might be a support for additional attributes, such as event handlers.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":182}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.312Z',
      '2025-11-18T18:46:59.312Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'Does React support all HTML attributes?',
      '<pre><code>     &lt;input readOnly={true} /&gt;  // Just like node.readOnly DOM API</code></pre>

As of React 16, both standard or custom DOM attributes are fully supported. Since React components often take both custom and DOM-related props, React uses the camelCase convention just like the DOM APIs.

     Let us take few props with respect to standard HTML attributes,


     These props work similarly to the corresponding HTML attributes, with the exception of the special cases. It also support all SVG attributes.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'As of React 16, both standard or custom DOM attributes are fully supported. Since React components often take both custom and DOM-related props, React uses the camelCase convention just like the DOM APIs.

     Let us take few props with respect to standard HTML attributes,


     These props work similarly to the corresponding HTML attributes, with the exception of the special cases. It also support all SVG attributes.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":183}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.312Z',
      '2025-11-18T18:46:59.312Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'When component props defaults to true?',
      '<pre><code>     &lt;MyInput autocomplete /&gt;

     &lt;MyInput autocomplete={true} /&gt;</code></pre>

If you pass no value for a prop, it defaults to true. This behavior is available so that it matches the behavior of HTML.

     For example, below expressions are equivalent,


     **Note:** It is not recommended to use this approach because it can be confused with the ES6 object shorthand (example, `{name}` which is short for `{name: name}`)',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'If you pass no value for a prop, it defaults to true. This behavior is available so that it matches the behavior of HTML.

     For example, below expressions are equivalent,


     **Note:** It is not recommended to use this approach because it can be confused with the ES6 object shorthand (example, `{name}` which is short for `{name: name}`)',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":184}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.312Z',
      '2025-11-18T18:46:59.312Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What is NextJS and major features of it?',
      'Next.js is a popular and lightweight framework for static and server‑rendered applications built with React. It also provides styling and routing solutions. Below are the major features provided by NextJS,

     1. Server-rendered by default
     2. Automatic code splitting for faster page loads
     3. Simple client-side routing (page based)
     4. Webpack-based dev environment which supports (HMR)
     5. Able to implement with Express or any other Node.js HTTP server
     6. Customizable with your own Babel and Webpack configurations',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'Next.js is a popular and lightweight framework for static and server‑rendered applications built with React. It also provides styling and routing solutions. Below are the major features provided by NextJS,

     1. Server-rendered by default
     2. Automatic code splitting for faster page loads
     3. Simple client-side routing (page based)
     4. Webpack-based dev environment which supports (HMR)
     5. Able to implement with Express or any other Node.js HTTP server
     6. Customizable with your own Babel and Webpack configurations',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":185}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.312Z',
      '2025-11-18T18:46:59.312Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'How do you pass an event handler to a component?',
      '<pre><code>     function Button({ onClick }) {
       return &lt;button onClick={onClick}&gt;Download&lt;/button&gt;;
     }

     export default function downloadExcel() {
       function handleClick() {
         alert(&quot;Downloaded&quot;);
       }

       return &lt;Button onClick={handleClick}&gt;&lt;/Button&gt;;
     }</code></pre>

You can pass event handlers and other functions as props to child components. The functions can be passed to child component as below,',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'You can pass event handlers and other functions as props to child components. The functions can be passed to child component as below,',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":186}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.312Z',
      '2025-11-18T18:46:59.312Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'How to prevent a function from being called multiple times?',
      'If you use an event handler such as **onClick or onScroll** and want to prevent the callback from being fired too quickly, then you can limit the rate at which callback is executed. This can be achieved in the below possible ways,

     1. **Throttling:** Changes based on a time based frequency. For example, it can be used using \\_.throttle lodash function
     2. **Debouncing:** Publish changes after a period of inactivity. For example, it can be used using \\_.debounce lodash function
     3. **RequestAnimationFrame throttling:** Changes based on requestAnimationFrame. For example, it can be used using raf-schd lodash function',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'If you use an event handler such as **onClick or onScroll** and want to prevent the callback from being fired too quickly, then you can limit the rate at which callback is executed. This can be achieved in the below possible ways,

     1. **Throttling:** Changes based on a time based frequency. For example, it can be used using \\_.throttle lodash function
     2. **Debouncing:** Publish changes after a period of inactivity. For example, it can be used using \\_.debounce lodash function
     3. **RequestAnimationFrame throttling:** Changes based on requestAnimationFrame. For example, it can be used using raf-schd lodash function',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":187}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.312Z',
      '2025-11-18T18:46:59.312Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'How JSX prevents Injection Attacks?',
      '<pre><code>     const name = response.potentiallyMaliciousInput;
     const element = &lt;h1&gt;{name}&lt;/h1&gt;;</code></pre>

React DOM escapes any values embedded in JSX before rendering them. Thus it ensures that you can never inject anything that’s not explicitly written in your application. Everything is converted to a string before being rendered.

     For example, you can embed user input as below,


     This way you can prevent XSS(Cross-site-scripting) attacks in the application.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'React DOM escapes any values embedded in JSX before rendering them. Thus it ensures that you can never inject anything that’s not explicitly written in your application. Everything is converted to a string before being rendered.

     For example, you can embed user input as below,


     This way you can prevent XSS(Cross-site-scripting) attacks in the application.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":188}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.312Z',
      '2025-11-18T18:46:59.312Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'How do you update rendered elements?',
      '<pre><code>     function tick() {
       const element = (
           &lt;h1&gt;Hello, world!&lt;/h1&gt;
           &lt;h2&gt;It is {new Date().toLocaleTimeString()}.&lt;/h2&gt;
       );
       ReactDOM.render(element, document.getElementById(&quot;root&quot;));
     }

     setInterval(tick, 1000);</code></pre>

You can update UI(represented by rendered element) by passing the newly created element to ReactDOM''s render method.

     For example, lets take a ticking clock example, where it updates the time by calling render method multiple times,',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'You can update UI(represented by rendered element) by passing the newly created element to ReactDOM''s render method.

     For example, lets take a ticking clock example, where it updates the time by calling render method multiple times,',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":189}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.312Z',
      '2025-11-18T18:46:59.312Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'How do you say that props are readonly?',
      '<pre><code>     function capital(amount, interest) {
       return amount + interest;
     }</code></pre>

When you declare a component as a function or a class, it must never modify its own props.

     Let us take a below capital function,


     The above function is called “pure” because it does not attempt to change their inputs, and always return the same result for the same inputs. Hence, React has a single rule saying "All React components must act like pure functions with respect to their props."',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'When you declare a component as a function or a class, it must never modify its own props.

     Let us take a below capital function,


     The above function is called “pure” because it does not attempt to change their inputs, and always return the same result for the same inputs. Hence, React has a single rule saying "All React components must act like pure functions with respect to their props."',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":190}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.312Z',
      '2025-11-18T18:46:59.312Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What are the conditions to safely use the index as a key?',
      'There are three conditions to make sure, it is safe use the index as a key.

     1. The list and items are static– they are not computed and do not change
     2. The items in the list have no ids
     3. The list is never reordered or filtered.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'There are three conditions to make sure, it is safe use the index as a key.

     1. The list and items are static– they are not computed and do not change
     2. The items in the list have no ids
     3. The list is never reordered or filtered.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":191}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.312Z',
      '2025-11-18T18:46:59.312Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'Should keys be globally unique?',
      '<pre><code>     function Book(props) {
       const index = (
         &lt;ul&gt;
           {props.pages.map((page) =&gt; (
             &lt;li key={page.id}&gt;{page.title}&lt;/li&gt;
           ))}
         &lt;/ul&gt;
       );
       const content = props.pages.map((page) =&gt; (
           &lt;h3&gt;{page.title}&lt;/h3&gt;
           &lt;p&gt;{page.content}&lt;/p&gt;
           &lt;p&gt;{page.pageNumber}&lt;/p&gt;
       ));
       return (
           {index}
           &lt;hr /&gt;
           {content}
       );
     }</code></pre>

The keys used within arrays should be unique among their siblings but they don’t need to be globally unique. i.e, You can use the same keys with two different arrays.

     For example, the below `Book` component uses two arrays with different arrays,',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'The keys used within arrays should be unique among their siblings but they don’t need to be globally unique. i.e, You can use the same keys with two different arrays.

     For example, the below `Book` component uses two arrays with different arrays,',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":192}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.312Z',
      '2025-11-18T18:46:59.312Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What is the popular choice for form handling?',
      '`Formik` is a form library for react which provides solutions such as validation, keeping track of the visited fields, and handling form submission.

     In detail, You can categorize them as follows,

     1. Getting values in and out of form state
     2. Validation and error messages
     3. Handling form submission

     It is used to create a scalable, performant, form helper with a minimal API to solve annoying stuff.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      '`Formik` is a form library for react which provides solutions such as validation, keeping track of the visited fields, and handling form submission.

     In detail, You can categorize them as follows,

     1. Getting values in and out of form state
     2. Validation and error messages
     3. Handling form submission

     It is used to create a scalable, performant, form helper with a minimal API to solve annoying stuff.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":193}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.312Z',
      '2025-11-18T18:46:59.312Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What are the advantages of formik over redux form library?',
      'Below are the main reasons to recommend formik over redux form library,

     1. The form state is inherently short-term and local, so tracking it in Redux (or any kind of Flux library) is unnecessary.
     2. Redux-Form calls your entire top-level Redux reducer multiple times ON EVERY SINGLE KEYSTROKE. This way it increases input latency for large apps.
     3. Redux-Form is 22.5 kB minified gzipped whereas Formik is 12.7 kB',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'Below are the main reasons to recommend formik over redux form library,

     1. The form state is inherently short-term and local, so tracking it in Redux (or any kind of Flux library) is unnecessary.
     2. Redux-Form calls your entire top-level Redux reducer multiple times ON EVERY SINGLE KEYSTROKE. This way it increases input latency for large apps.
     3. Redux-Form is 22.5 kB minified gzipped whereas Formik is 12.7 kB',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":194}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.312Z',
      '2025-11-18T18:46:59.312Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'Why are you not required to use inheritance?',
      'In React, it is recommended to use composition over inheritance to reuse code between components. Both Props and composition give you all the flexibility you need to customize a component’s look and behavior explicitly and safely.
     Whereas, If you want to reuse non-UI functionality between components, it is suggested to extract it into a separate JavaScript module. Later components import it and use that function, object, or class, without extending it.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'In React, it is recommended to use composition over inheritance to reuse code between components. Both Props and composition give you all the flexibility you need to customize a component’s look and behavior explicitly and safely.
     Whereas, If you want to reuse non-UI functionality between components, it is suggested to extract it into a separate JavaScript module. Later components import it and use that function, object, or class, without extending it.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":195}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.312Z',
      '2025-11-18T18:46:59.312Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'Can I use web components in react application?',
      '<pre><code>     import &quot;./App.css&quot;;
     import &quot;@vaadin/vaadin-date-picker&quot;;
     export default function App() {
       return (
           &lt;vaadin-date-picker label=&quot;When were you born?&quot;&gt;&lt;/vaadin-date-picker&gt;
       );
     }</code></pre>

Yes, you can use web components in a react application. Even though many developers won''t use this combination, it may require especially if you are using third-party UI components that are written using Web Components.

     For example, let us use `Vaadin` date picker web component as below,',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'Yes, you can use web components in a react application. Even though many developers won''t use this combination, it may require especially if you are using third-party UI components that are written using Web Components.

     For example, let us use `Vaadin` date picker web component as below,',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":196}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.312Z',
      '2025-11-18T18:46:59.312Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What is dynamic import?',
      '<pre><code>     import(&quot;./math&quot;).then((math) =&gt; {
       console.log(math.add(10, 20));
     });</code></pre>

You can achieve code-splitting in your app using dynamic import.

     Let''s take an example of addition,

     1. **Normal Import**


     2. **Dynamic Import**',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'You can achieve code-splitting in your app using dynamic import.

     Let''s take an example of addition,

     1. **Normal Import**


     2. **Dynamic Import**',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":197}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.312Z',
      '2025-11-18T18:46:59.312Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What are loadable components?',
      '<pre><code>     import loadable from &quot;@loadable/component&quot;;

     const OtherComponent = loadable(() =&gt; import(&quot;./OtherComponent&quot;));

     function MyComponent() {
       return (
           &lt;OtherComponent /&gt;
       );
     }</code></pre>

With the release of React 18, React.lazy and Suspense are now available for server-side rendering. However, prior to React 18, it was recommended to use Loadable Components for code-splitting in a server-side rendered app because React.lazy and Suspense were not available for server-side rendering. Loadable Components lets you render a dynamic import as a regular component. For example, you can use Loadable Components to load the OtherComponent in a separate bundle like this:


     Now OtherComponent will be loaded in a separated bundle
     Loadable Components provides additional benefits beyond just code-splitting, such as automatic code reloading, error handling, and preloading. By using Loadable Components, you can ensure that your application loads quickly and efficiently, providing a better user experience for your users.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'With the release of React 18, React.lazy and Suspense are now available for server-side rendering. However, prior to React 18, it was recommended to use Loadable Components for code-splitting in a server-side rendered app because React.lazy and Suspense were not available for server-side rendering. Loadable Components lets you render a dynamic import as a regular component. For example, you can use Loadable Components to load the OtherComponent in a separate bundle like this:


     Now OtherComponent will be loaded in a separated bundle
     Loadable Components provides additional benefits beyond just code-splitting, such as automatic code reloading, error handling, and preloading. By using Loadable Components, you can ensure that your application loads quickly and efficiently, providing a better user experience for your users.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":198}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.312Z',
      '2025-11-18T18:46:59.312Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What is suspense component?',
      '<pre><code>        function UserProfile() {
          const user = use(fetchUser()); // throws a promise internally
          return &lt;div&gt;{user.name}&lt;/div&gt;;
        }

        function App() {
          return (
            &lt;Suspense fallback={&lt;div&gt;Loading user...&lt;/div&gt;}&gt;
              &lt;UserProfile /&gt;
            &lt;/Suspense&gt;
          );
        }
</code></pre>

React Suspense is a built-in feature that lets you defer rendering part of your component tree until some condition(asynchronous operation) is met—usually, data or code has finished loading. While waiting, Suspense lets you display a fallback UI like a spinner or placeholder.


     1. Lazy loading components uses suspense feature,


        If the module containing the dynamic import is not yet loaded by the time parent component renders, you must show some fallback content while you’re waiting for it to load using a loading indicator. This can be done using **Suspense** component.
    
        The above component shows fallback UI instead real component until `OtherComponent` is fully loaded.

     2. As an another example, suspend until async data(data fetching) is ready',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'React Suspense is a built-in feature that lets you defer rendering part of your component tree until some condition(asynchronous operation) is met—usually, data or code has finished loading. While waiting, Suspense lets you display a fallback UI like a spinner or placeholder.


     1. Lazy loading components uses suspense feature,


        If the module containing the dynamic import is not yet loaded by the time parent component renders, you must show some fallback content while you’re waiting for it to load using a loading indicator. This can be done using **Suspense** component.
    
        The above component shows fallback UI instead real component until `OtherComponent` is fully loaded.

     2. As an another example, suspend until async data(data fetching) is ready',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":199}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.312Z',
      '2025-11-18T18:46:59.312Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What is route based code splitting?',
      '<pre><code>     import { BrowserRouter as Router, Route, Switch } from &quot;react-router-dom&quot;;
     import React, { Suspense, lazy } from &quot;react&quot;;

     const Home = lazy(() =&gt; import(&quot;./routes/Home&quot;));
     const About = lazy(() =&gt; import(&quot;./routes/About&quot;));

     const App = () =&gt; (
       &lt;Router&gt;
         &lt;Suspense fallback={&lt;div&gt;Loading...&lt;/div&gt;}&gt;
           &lt;Switch&gt;
             &lt;Route exact path=&quot;/&quot; component={Home} /&gt;
             &lt;Route path=&quot;/about&quot; component={About} /&gt;
           &lt;/Switch&gt;
         &lt;/Suspense&gt;
       &lt;/Router&gt;
     );</code></pre>

One of the best place to do code splitting is with routes. The entire page is going to re-render at once so users are unlikely to interact with other elements in the page at the same time. Due to this, the user experience won''t be disturbed.

     Let us take an example of route based website using libraries like React Router with React.lazy,


     In the above code, the code splitting will happen at each route level.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'One of the best place to do code splitting is with routes. The entire page is going to re-render at once so users are unlikely to interact with other elements in the page at the same time. Due to this, the user experience won''t be disturbed.

     Let us take an example of route based website using libraries like React Router with React.lazy,


     In the above code, the code splitting will happen at each route level.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":200}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.312Z',
      '2025-11-18T18:46:59.312Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    ),
    (
      gen_random_uuid(),
      'What is the purpose of default value in context?',
      '<pre><code>     const MyContext = React.createContext(defaultValue);</code></pre>

The defaultValue argument is only used when a component does not have a matching Provider above it in the tree. This can be helpful for testing components in isolation without wrapping them.

     Below code snippet provides default theme value as Luna.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'The defaultValue argument is only used when a component does not have a matching Provider above it in the tree. This can be helpful for testing components in isolation without wrapping them.

     Below code snippet provides default theme value as Luna.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":201}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.312Z',
      '2025-11-18T18:46:59.312Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    );