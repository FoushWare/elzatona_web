INSERT INTO questions (
    id, title, content, type, difficulty, points, options, correct_answer, 
    explanation, test_cases, hints, tags, metadata, stats, category_id, 
    learning_card_id, is_active, created_at, updated_at, topic_id, time_limit
  ) VALUES (
      gen_random_uuid(),
      'What is diffing algorithm?',
      'React needs to use algorithms to find out how to efficiently update the UI to match the most recent tree. The diffing algorithms is generating the minimum number of operations to transform one tree into another. However, the algorithms have a complexity in the order of O(n³) where n is the number of elements in the tree.

     In this case, displaying 1000 elements would require in the order of one billion comparisons. This is far too expensive. Instead, React implements a heuristic O(n) algorithm based on two assumptions:

     1. Two elements of different types will produce different trees.
     2. The developer can hint at which child elements may be stable across different renders with a key prop.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'React needs to use algorithms to find out how to efficiently update the UI to match the most recent tree. The diffing algorithms is generating the minimum number of operations to transform one tree into another. However, the algorithms have a complexity in the order of O(n³) where n is the number of elements in the tree.

     In this case, displaying 1000 elements would require in the order of one billion comparisons. This is far too expensive. Instead, React implements a heuristic O(n) algorithm based on two assumptions:

     1. Two elements of different types will produce different trees.
     2. The developer can hint at which child elements may be stable across different renders with a key prop.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":202}',
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
      'What are the rules covered by diffing algorithm?',
      '<pre><code>     &lt;ul&gt;
       &lt;li key=&quot;2015&quot;&gt;Duke&lt;/li&gt;
       &lt;li key=&quot;2016&quot;&gt;Villanova&lt;/li&gt;
     &lt;/ul&gt;

     &lt;ul&gt;
       &lt;li key=&quot;2014&quot;&gt;Connecticut&lt;/li&gt;
       &lt;li key=&quot;2015&quot;&gt;Duke&lt;/li&gt;
       &lt;li key=&quot;2016&quot;&gt;Villanova&lt;/li&gt;
     &lt;/ul&gt;</code></pre>

When diffing two trees, React first compares the two root elements. The behavior is different depending on the types of the root elements. It covers the below rules during reconciliation algorithm,

     1. **Elements Of Different Types:**
        Whenever the root elements have different types, React will tear down the old tree and build the new tree from scratch. For example, elements <a> to <img>, or from <Article> to <Comment> of different types lead a full rebuild.
     2. **DOM Elements Of The Same Type:**
        When comparing two React DOM elements of the same type, React looks at the attributes of both, keeps the same underlying DOM node, and only updates the changed attributes. Lets take an example with same DOM elements except className attribute,


     3. **Component Elements Of The Same Type:**
        When a component updates, the instance stays the same, so that state is maintained across renders. React updates the props of the underlying component instance to match the new element, and calls componentWillReceiveProps() and componentWillUpdate() on the underlying instance. After that, the render() method is called and the diff algorithm recurses on the previous result and the new result.
     4. **Recursing On Children:**
        when recursing on the children of a DOM node, React just iterates over both lists of children at the same time and generates a mutation whenever there’s a difference. For example, when adding an element at the end of the children, converting between these two trees works well.


     5. **Handling keys:**
        React supports a key attribute. When children have keys, React uses the key to match children in the original tree with children in the subsequent tree. For example, adding a key can make the tree conversion efficient,',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'When diffing two trees, React first compares the two root elements. The behavior is different depending on the types of the root elements. It covers the below rules during reconciliation algorithm,

     1. **Elements Of Different Types:**
        Whenever the root elements have different types, React will tear down the old tree and build the new tree from scratch. For example, elements <a> to <img>, or from <Article> to <Comment> of different types lead a full rebuild.
     2. **DOM Elements Of The Same Type:**
        When comparing two React DOM elements of the same type, React looks at the attributes of both, keeps the same underlying DOM node, and only updates the changed attributes. Lets take an example with same DOM elements except className attribute,


     3. **Component Elements Of The Same Type:**
        When a component updates, the instance stays the same, so that state is maintained across renders. React updates the props of the underlying component instance to match the new element, and calls componentWillReceiveProps() and componentWillUpdate() on the underlying instance. After that, the render() method is called and the diff algorithm recurses on the previous result and the new result.
     4. **Recursing On Children:**
        when recursing on the children of a DOM node, React just iterates over both lists of children at the same time and generates a mutation whenever there’s a difference. For example, when adding an element at the end of the children, converting between these two trees works well.


     5. **Handling keys:**
        React supports a key attribute. When children have keys, React uses the key to match children in the original tree with children in the subsequent tree. For example, adding a key can make the tree conversion efficient,',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":203}',
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
      'When do you need to use refs?',
      'There are few use cases to go for refs,

     1. Managing focus, text selection, or media playback.
     2. Triggering imperative animations.
     3. Integrating with third-party DOM libraries.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'There are few use cases to go for refs,

     1. Managing focus, text selection, or media playback.
     2. Triggering imperative animations.
     3. Integrating with third-party DOM libraries.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":204}',
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
      'Must prop be named as render for render props?',
      '<pre><code>     Mouse.propTypes = {
       children: PropTypes.func.isRequired,
     };</code></pre>

Even though the pattern named render props, you don’t have to use a prop named render to use this pattern. i.e, Any prop that is a function that a component uses to know what to render is technically a “render prop”. Lets take an example with the children prop for render props,


     Actually children prop doesn’t need to be named in the list of “attributes” in JSX element. Instead, you can keep it directly inside element,


     While using this above technique(without any name), explicitly state that children should be a function in your propTypes.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'Even though the pattern named render props, you don’t have to use a prop named render to use this pattern. i.e, Any prop that is a function that a component uses to know what to render is technically a “render prop”. Lets take an example with the children prop for render props,


     Actually children prop doesn’t need to be named in the list of “attributes” in JSX element. Instead, you can keep it directly inside element,


     While using this above technique(without any name), explicitly state that children should be a function in your propTypes.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":205}',
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
      'What are the problems of using render props with pure components?',
      'If you create a function inside a render method, it negates the purpose of pure component. Because the shallow prop comparison will always return false for new props, and each render in this case will generate a new value for the render prop. You can solve this issue by defining the render function as instance method.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'If you create a function inside a render method, it negates the purpose of pure component. Because the shallow prop comparison will always return false for new props, and each render in this case will generate a new value for the render prop. You can solve this issue by defining the render function as instance method.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":206}',
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
      'What is windowing technique?',
      'Windowing is a technique that only renders a small subset of your rows at any given time, and can dramatically reduce the time it takes to re-render the components as well as the number of DOM nodes created. If your application renders long lists of data then this technique is recommended. Both react-window and react-virtualized are popular windowing libraries which provides several reusable components for displaying lists, grids, and tabular data.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'Windowing is a technique that only renders a small subset of your rows at any given time, and can dramatically reduce the time it takes to re-render the components as well as the number of DOM nodes created. If your application renders long lists of data then this technique is recommended. Both react-window and react-virtualized are popular windowing libraries which provides several reusable components for displaying lists, grids, and tabular data.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":207}',
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
      'How do you print falsy values in JSX?',
      'The falsy values such as false, null, undefined, and true are valid children but they don''t render anything. If you still want to display them then you need to convert it to string. Let''s take an example on how to convert to a string,',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'The falsy values such as false, null, undefined, and true are valid children but they don''t render anything. If you still want to display them then you need to convert it to string. Let''s take an example on how to convert to a string,',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":208}',
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
      'What is the typical use case of portals?',
      'React Portals are primarily used to render UI components such as **modals, tooltips, dropdowns, hovercards, and notifications** outside of their parent component''s DOM tree. This helps avoid common CSS issues caused by parent elements, such as:

     *   `**overflow: hidden**` on parent elements clipping or hiding child elements like modals or tooltips,
     *   **stacking context and** `**z-index**` **conflicts** created by parent containers that prevent child elements from appearing above other content.

     That means, you need to visually “break out” of its container. By rendering these UI elements into a separate DOM node (often directly under `<body>`), portals ensure they appear above all other content and are not restricted by the parent’s CSS or layout constraints, resulting in correct positioning and visibility regardless of the parent’s styling.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'React Portals are primarily used to render UI components such as **modals, tooltips, dropdowns, hovercards, and notifications** outside of their parent component''s DOM tree. This helps avoid common CSS issues caused by parent elements, such as:

     *   `**overflow: hidden**` on parent elements clipping or hiding child elements like modals or tooltips,
     *   **stacking context and** `**z-index**` **conflicts** created by parent containers that prevent child elements from appearing above other content.

     That means, you need to visually “break out” of its container. By rendering these UI elements into a separate DOM node (often directly under `<body>`), portals ensure they appear above all other content and are not restricted by the parent’s CSS or layout constraints, resulting in correct positioning and visibility regardless of the parent’s styling.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":209}',
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
      'How do you set default value for uncontrolled component?',
      '<pre><code>     render() {
       return (
         &lt;form onSubmit={this.handleSubmit}&gt;
           &lt;label&gt;
             User Name:
             &lt;input
               defaultValue=&quot;John&quot;
               type=&quot;text&quot;
               ref={this.input} /&gt;
           &lt;/label&gt;
           &lt;input type=&quot;submit&quot; value=&quot;Submit&quot; /&gt;
         &lt;/form&gt;
       );
     }</code></pre>

In React, the value attribute on form elements will override the value in the DOM. With an uncontrolled component, you might want React to specify the initial value, but leave subsequent updates uncontrolled. To handle this case, you can specify a **defaultValue** attribute instead of **value**.


     The same applies for `select` and `textArea` inputs. But you need to use **defaultChecked** for `checkbox` and `radio` inputs.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'In React, the value attribute on form elements will override the value in the DOM. With an uncontrolled component, you might want React to specify the initial value, but leave subsequent updates uncontrolled. To handle this case, you can specify a **defaultValue** attribute instead of **value**.


     The same applies for `select` and `textArea` inputs. But you need to use **defaultChecked** for `checkbox` and `radio` inputs.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":210}',
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
      'What is your favorite React stack?',
      'Even though the tech stack varies from developer to developer, the most popular stack is used in react boilerplate project code. It mainly uses Redux and redux-saga for state management and asynchronous side-effects, react-router for routing purpose, styled-components for styling react components, axios for invoking REST api, and other supported stack such as webpack, reselect, ESNext, Babel.
     You can clone the project https://github.com/react-boilerplate/react-boilerplate and start working on any new react project.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'Even though the tech stack varies from developer to developer, the most popular stack is used in react boilerplate project code. It mainly uses Redux and redux-saga for state management and asynchronous side-effects, react-router for routing purpose, styled-components for styling react components, axios for invoking REST api, and other supported stack such as webpack, reselect, ESNext, Babel.
     You can clone the project https://github.com/react-boilerplate/react-boilerplate and start working on any new react project.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":211}',
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
      'What is the difference between Real DOM and Virtual DOM?',
      'Below are the main differences between Real DOM and Virtual DOM,

     | Real DOM                             | Virtual DOM                          |
     | ------------------------------------ | ------------------------------------ |
     | Updates are slow                     | Updates are fast                     |
     | DOM manipulation is very expensive.  | DOM manipulation is very easy        |
     | You can update HTML directly.        | You Can’t directly update HTML       |
     | It causes too much of memory wastage | There is no memory wastage           |
     | Creates a new DOM if element updates | It updates the JSX if element update |',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'Below are the main differences between Real DOM and Virtual DOM,

     | Real DOM                             | Virtual DOM                          |
     | ------------------------------------ | ------------------------------------ |
     | Updates are slow                     | Updates are fast                     |
     | DOM manipulation is very expensive.  | DOM manipulation is very easy        |
     | You can update HTML directly.        | You Can’t directly update HTML       |
     | It causes too much of memory wastage | There is no memory wastage           |
     | Creates a new DOM if element updates | It updates the JSX if element update |',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":212}',
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
      'How to add Bootstrap to a react application?',
      '<pre><code>        npm install bootstrap</code></pre>

Bootstrap can be added to your React app in a three possible ways,

     1. Using the Bootstrap CDN:
        This is the easiest way to add bootstrap. Add both bootstrap CSS and JS resources in a head tag.
     2. Bootstrap as Dependency:
        If you are using a build tool or a module bundler such as Webpack, then this is the preferred option for adding Bootstrap to your React application
     3. React Bootstrap Package:
        In this case, you can add Bootstrap to our React app is by using a package that has rebuilt Bootstrap components to work particularly as React components. Below packages are popular in this category,
        1. react-bootstrap
        2. reactstrap',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'Bootstrap can be added to your React app in a three possible ways,

     1. Using the Bootstrap CDN:
        This is the easiest way to add bootstrap. Add both bootstrap CSS and JS resources in a head tag.
     2. Bootstrap as Dependency:
        If you are using a build tool or a module bundler such as Webpack, then this is the preferred option for adding Bootstrap to your React application
     3. React Bootstrap Package:
        In this case, you can add Bootstrap to our React app is by using a package that has rebuilt Bootstrap components to work particularly as React components. Below packages are popular in this category,
        1. react-bootstrap
        2. reactstrap',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":213}',
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
      'Can you list down top websites or applications using react as front end framework?',
      'Below are the `top 10 websites` using React as their front-end framework,

     1. Facebook
     2. Uber
     3. Instagram
     4. WhatsApp
     5. Khan Academy
     6. Airbnb
     7. Dropbox
     8. Flipboard
     9. Netflix
     10. PayPal',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'Below are the `top 10 websites` using React as their front-end framework,

     1. Facebook
     2. Uber
     3. Instagram
     4. WhatsApp
     5. Khan Academy
     6. Airbnb
     7. Dropbox
     8. Flipboard
     9. Netflix
     10. PayPal',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":214}',
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
      'Is it recommended to use CSS In JS technique in React?',
      'React does not have any opinion about how styles are defined but if you are a beginner then good starting point is to define your styles in a separate \\*.css file as usual and refer to them using className. This functionality is not part of React but came from third-party libraries. But If you want to try a different approach(CSS-In-JS) then styled-components library is a good option.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'React does not have any opinion about how styles are defined but if you are a beginner then good starting point is to define your styles in a separate \\*.css file as usual and refer to them using className. This functionality is not part of React but came from third-party libraries. But If you want to try a different approach(CSS-In-JS) then styled-components library is a good option.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":215}',
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
      'Do I need to rewrite all my class components with hooks?',
      'No. But you can try Hooks in a few components(or new components) without rewriting any existing code. Because there are no plans to remove classes in ReactJS.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'No. But you can try Hooks in a few components(or new components) without rewriting any existing code. Because there are no plans to remove classes in ReactJS.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":216}',
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
      'What is useEffect hook? How to fetch data with React Hooks?',
      '<pre><code>     import React from &quot;react&quot;;

     function App() {
       const [data, setData] = React.useState({ hits: [] });

       React.useEffect(() =&gt; {
         fetch(&quot;http://hn.algolia.com/api/v1/search?query=react&quot;)
           .then((response) =&gt; response.json())
           .then((data) =&gt; setData(data));
       }, []);

       return (
         &lt;ul&gt;
           {data.hits.map((item) =&gt; (
             &lt;li key={item.objectID}&gt;
               &lt;a href={item.url}&gt;{item.title}&lt;/a&gt;
             &lt;/li&gt;
           ))}
         &lt;/ul&gt;
       );
     }

     export default App;</code></pre>

The `useEffect` hook is a React Hook that lets you perform **side effects** in function components. Side effects are operations that interact with the outside world or system and aren''t directly related to rendering UI — such as fetching data, setting up subscriptions, timers, manually manipulating the DOM, etc.

     In function components, useEffect replaces the class component lifecycle methods(`componentDidMount`, `componentDidUpdate` and `componentWillUnmount`) with a single, unified API.     

     **Syntax**
     This effect hook can be used to fetch data from an API and to set the data in the local state of the component with the useState hook’s update function.

     Here is an example of fetching a list of ReactJS articles from an API using fetch.


     A popular way to simplify this is by using the library axios.

     We provided an empty array as second argument to the useEffect hook to avoid activating it on component updates. This way, it only fetches on component mount.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'The `useEffect` hook is a React Hook that lets you perform **side effects** in function components. Side effects are operations that interact with the outside world or system and aren''t directly related to rendering UI — such as fetching data, setting up subscriptions, timers, manually manipulating the DOM, etc.

     In function components, useEffect replaces the class component lifecycle methods(`componentDidMount`, `componentDidUpdate` and `componentWillUnmount`) with a single, unified API.     

     **Syntax**
     This effect hook can be used to fetch data from an API and to set the data in the local state of the component with the useState hook’s update function.

     Here is an example of fetching a list of ReactJS articles from an API using fetch.


     A popular way to simplify this is by using the library axios.

     We provided an empty array as second argument to the useEffect hook to avoid activating it on component updates. This way, it only fetches on component mount.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":217}',
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
      'Is Hooks cover all use cases for classes?',
      'Hooks doesn''t cover all use cases of classes but there is a plan to add them soon. Currently there are no Hook equivalents to the uncommon **getSnapshotBeforeUpdate** and **componentDidCatch** lifecycles yet.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'Hooks doesn''t cover all use cases of classes but there is a plan to add them soon. Currently there are no Hook equivalents to the uncommon **getSnapshotBeforeUpdate** and **componentDidCatch** lifecycles yet.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":218}',
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
      'What is the stable release for hooks support?',
      'React includes a stable implementation of React Hooks in 16.8 release for below packages

     1. React DOM
     2. React DOM Server
     3. React Test Renderer
     4. React Shallow Renderer',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'React includes a stable implementation of React Hooks in 16.8 release for below packages

     1. React DOM
     2. React DOM Server
     3. React Test Renderer
     4. React Shallow Renderer',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":219}',
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
      'Why do we use array destructuring (square brackets notation) in `useState`?',
      '<pre><code>     const [user, setUser] = useState(&quot;userProfile&quot;);</code></pre>

When we declare a state variable with `useState`, it returns a pair — an array with two items. The first item is the current value, and the second is a function that updates the value. Using [0] and [1] to access them is a bit confusing because they have a specific meaning. This is why we use array destructuring instead.

     For example, the array index access would look as follows:


     Whereas with array destructuring the variables can be accessed as follows:',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'When we declare a state variable with `useState`, it returns a pair — an array with two items. The first item is the current value, and the second is a function that updates the value. Using [0] and [1] to access them is a bit confusing because they have a specific meaning. This is why we use array destructuring instead.

     For example, the array index access would look as follows:


     Whereas with array destructuring the variables can be accessed as follows:',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":220}',
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
      'What are the sources used for introducing hooks?',
      'Hooks got the ideas from several different sources. Below are some of them,

     1. Previous experiments with functional APIs in the react-future repository
     2. Community experiments with render prop APIs such as Reactions Component
     3. State variables and state cells in DisplayScript.
     4. Subscriptions in Rx.
     5. Reducer components in ReasonReact.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'Hooks got the ideas from several different sources. Below are some of them,

     1. Previous experiments with functional APIs in the react-future repository
     2. Community experiments with render prop APIs such as Reactions Component
     3. State variables and state cells in DisplayScript.
     4. Subscriptions in Rx.
     5. Reducer components in ReasonReact.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":221}',
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
      'How do you access imperative API of web components?',
      'Web Components often expose an imperative API to implement its functions. You will need to use a **ref** to interact with the DOM node directly if you want to access imperative API of a web component. But if you are using third-party Web Components, the best solution is to write a React component that behaves as a **wrapper** for your Web Component.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'Web Components often expose an imperative API to implement its functions. You will need to use a **ref** to interact with the DOM node directly if you want to access imperative API of a web component. But if you are using third-party Web Components, the best solution is to write a React component that behaves as a **wrapper** for your Web Component.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":222}',
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
      'What is formik?',
      'Formik is a small react form library that helps you with the three major problems,

     1. Getting values in and out of form state
     2. Validation and error messages
     3. Handling form submission',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'Formik is a small react form library that helps you with the three major problems,

     1. Getting values in and out of form state
     2. Validation and error messages
     3. Handling form submission',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":223}',
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
      'What are typical middleware choices for handling asynchronous calls in Redux?',
      'Some of the popular middleware choices for handling asynchronous calls in Redux eco system are `Redux Thunk, Redux Promise, Redux Saga`.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'Some of the popular middleware choices for handling asynchronous calls in Redux eco system are `Redux Thunk, Redux Promise, Redux Saga`.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":224}',
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
      'Do browsers understand JSX code?',
      'No, browsers can''t understand JSX code. You need a transpiler to convert your JSX to regular Javascript that browsers can understand. The most widely used transpiler right now is Babel.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'No, browsers can''t understand JSX code. You need a transpiler to convert your JSX to regular Javascript that browsers can understand. The most widely used transpiler right now is Babel.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":225}',
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
      'Describe about data flow in react?',
      'React implements one-way reactive data flow using props which reduce boilerplate and is easier to understand than traditional two-way data binding.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'React implements one-way reactive data flow using props which reduce boilerplate and is easier to understand than traditional two-way data binding.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":226}',
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
      'What is MobX?',
      '<pre><code>     npm install mobx --save
     npm install mobx-react --save</code></pre>

MobX is a simple, scalable and battle tested state management solution for applying functional reactive programming (TFRP). For ReactJS application, you need to install below packages,',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'MobX is a simple, scalable and battle tested state management solution for applying functional reactive programming (TFRP). For ReactJS application, you need to install below packages,',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":227}',
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
      'What are the differences between Redux and MobX?',
      'Below are the main differences between Redux and MobX,

     | Topic         | Redux                                                         | MobX                                                                   |
     | ------------- | ------------------------------------------------------------- | ---------------------------------------------------------------------- |
     | Definition    | It is a javascript library for managing the application state | It is a library for reactively managing the state of your applications |
     | Programming   | It is mainly written in ES6                                   | It is written in JavaScript(ES5)                                       |
     | Data Store    | There is only one large store exist for data storage          | There is more than one store for storage                               |
     | Usage         | Mainly used for large and complex applications                | Used for simple applications                                           |
     | Performance   | Need to be improved                                           | Provides better performance                                            |
     | How it stores | Uses JS Object to store                                       | Uses observable to store the data                                      |',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'Below are the main differences between Redux and MobX,

     | Topic         | Redux                                                         | MobX                                                                   |
     | ------------- | ------------------------------------------------------------- | ---------------------------------------------------------------------- |
     | Definition    | It is a javascript library for managing the application state | It is a library for reactively managing the state of your applications |
     | Programming   | It is mainly written in ES6                                   | It is written in JavaScript(ES5)                                       |
     | Data Store    | There is only one large store exist for data storage          | There is more than one store for storage                               |
     | Usage         | Mainly used for large and complex applications                | Used for simple applications                                           |
     | Performance   | Need to be improved                                           | Provides better performance                                            |
     | How it stores | Uses JS Object to store                                       | Uses observable to store the data                                      |',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":228}',
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
      'Should I learn ES6 before learning ReactJS?',
      '<pre><code>        // es 5
        var users = usersList.map(function (user) {
          return &lt;li&gt;{user.name}&lt;/li&gt;;
        });
        // es 6
        const users = usersList.map((user) =&gt; &lt;li&gt;{user.name}&lt;/li&gt;);</code></pre>

No, you don’t have to learn es2015/es6 to learn react. But you may find many resources or React ecosystem uses ES6 extensively. Let''s see some of the frequently used ES6 features,

     1. **Destructuring:** To get props and use them in a component


     2. **Spread operator:** Helps in passing props down into a component


     3. **Arrow functions:** Makes compact syntax',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'No, you don’t have to learn es2015/es6 to learn react. But you may find many resources or React ecosystem uses ES6 extensively. Let''s see some of the frequently used ES6 features,

     1. **Destructuring:** To get props and use them in a component


     2. **Spread operator:** Helps in passing props down into a component


     3. **Arrow functions:** Makes compact syntax',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":229}',
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
      'What is Concurrent Rendering?',
      '<pre><code>     // 1. Part of an app by wrapping with ConcurrentMode
     &lt;React.unstable_ConcurrentMode&gt;
       &lt;Something /&gt;
     &lt;/React.unstable_ConcurrentMode&gt;;

     // 2. Whole app using createRoot
     ReactDOM.unstable_createRoot(domNode).render(&lt;App /&gt;);</code></pre>

The Concurrent rendering makes React apps to be more responsive by rendering component trees without blocking the main UI thread. It allows React to interrupt a long-running render to handle a high-priority event. i.e, When you enabled concurrent Mode, React will keep an eye on other tasks that need to be done, and if there''s something with a higher priority it will pause what it is currently rendering and let the other task finish first. You can enable this in two ways,',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'The Concurrent rendering makes React apps to be more responsive by rendering component trees without blocking the main UI thread. It allows React to interrupt a long-running render to handle a high-priority event. i.e, When you enabled concurrent Mode, React will keep an eye on other tasks that need to be done, and if there''s something with a higher priority it will pause what it is currently rendering and let the other task finish first. You can enable this in two ways,',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":230}',
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
      'What is the difference between async mode and concurrent mode?',
      'Both refers the same thing. Previously concurrent Mode being referred to as "Async Mode" by React team. The name has been changed to highlight React’s ability to perform work on different priority levels. So it avoids the confusion from other approaches to Async Rendering.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'Both refers the same thing. Previously concurrent Mode being referred to as "Async Mode" by React team. The name has been changed to highlight React’s ability to perform work on different priority levels. So it avoids the confusion from other approaches to Async Rendering.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":231}',
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
      'Can I use javascript urls in react16.9?',
      '<pre><code>     const companyProfile = {
       website: &quot;javascript: alert(&#039;Your website is hacked&#039;)&quot;,
     };
     // It will log a warning
     &lt;a href={companyProfile.website}&gt;More details&lt;/a&gt;;</code></pre>

Yes, you can use javascript: URLs but it will log a warning in the console. Because URLs starting with javascript: are dangerous by including unsanitized output in a tag like `<a href>` and create a security hole.


     Remember that the future versions will throw an error for javascript URLs.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'Yes, you can use javascript: URLs but it will log a warning in the console. Because URLs starting with javascript: are dangerous by including unsanitized output in a tag like `<a href>` and create a security hole.


     Remember that the future versions will throw an error for javascript URLs.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":232}',
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
      'What is the purpose of eslint plugin for hooks?',
      'The ESLint plugin enforces rules of Hooks to avoid bugs. It assumes that any function starting with ”use” and a capital letter right after it is a Hook. In particular, the rule enforces that,

     1. Calls to Hooks are either inside a PascalCase function (assumed to be a component) or another useSomething function (assumed to be a custom Hook).
     2. Hooks are called in the same order on every render.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'The ESLint plugin enforces rules of Hooks to avoid bugs. It assumes that any function starting with ”use” and a capital letter right after it is a Hook. In particular, the rule enforces that,

     1. Calls to Hooks are either inside a PascalCase function (assumed to be a component) or another useSomething function (assumed to be a custom Hook).
     2. Hooks are called in the same order on every render.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":233}',
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
      'What is the difference between Imperative and Declarative in React?',
      '<pre><code>     if (this.state.liked) {
       return &lt;blueLike /&gt;;
     } else {
       return &lt;greyLike /&gt;;
     }</code></pre>

Imagine a simple UI component, such as a "Like" button. When you tap it, it turns blue if it was previously grey, and grey if it was previously blue.

     The imperative way of doing this would be:


     Basically, you have to check what is currently on the screen and handle all the changes necessary to redraw it with the current state, including undoing the changes from the previous state. You can imagine how complex this could be in a real-world scenario.

     In contrast, the declarative approach would be:


     Because the declarative approach separates concerns, this part of it only needs to handle how the UI should look in a specific state, and is therefore much simpler to understand.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'Imagine a simple UI component, such as a "Like" button. When you tap it, it turns blue if it was previously grey, and grey if it was previously blue.

     The imperative way of doing this would be:


     Basically, you have to check what is currently on the screen and handle all the changes necessary to redraw it with the current state, including undoing the changes from the previous state. You can imagine how complex this could be in a real-world scenario.

     In contrast, the declarative approach would be:


     Because the declarative approach separates concerns, this part of it only needs to handle how the UI should look in a specific state, and is therefore much simpler to understand.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":234}',
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
      'What are the benefits of using TypeScript with ReactJS?',
      'Below are some of the benefits of using TypeScript with ReactJS,

     1. It is possible to use latest JavaScript features
     2. Use of interfaces for complex type definitions
     3. IDEs such as VS Code was made for TypeScript
     4. Avoid bugs with the ease of readability and Validation',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'Below are some of the benefits of using TypeScript with ReactJS,

     1. It is possible to use latest JavaScript features
     2. Use of interfaces for complex type definitions
     3. IDEs such as VS Code was made for TypeScript
     4. Avoid bugs with the ease of readability and Validation',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":235}',
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
      'How do you make sure that user remains authenticated on page refresh while using Context API State Management?',
      '<pre><code>     const loadUser = async () =&gt; {
       const token = sessionStorage.getItem(&quot;token&quot;);

       if (!token) {
         dispatch({
           type: ERROR,
         });
       }
       setAuthToken(token);

       try {
         const res = await axios(&quot;/api/auth&quot;);

         dispatch({
           type: USER_LOADED,
           payload: res.data.data,
         });
       } catch (err) {
         console.error(err);
       }
     };</code></pre>

When a user logs in and reload, to persist the state generally we add the load user action in the useEffect hooks in the main App.js. While using Redux, loadUser action can be easily accessed.

     **App.js**


     - But while using **Context API**, to access context in App.js, wrap the AuthState in index.js so that App.js can access the auth context. Now whenever the page reloads, no matter what route you are on, the user will be authenticated as **loadUser** action will be triggered on each re-render.

     **index.js**


     **App.js**


     **loadUser**',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'When a user logs in and reload, to persist the state generally we add the load user action in the useEffect hooks in the main App.js. While using Redux, loadUser action can be easily accessed.

     **App.js**


     - But while using **Context API**, to access context in App.js, wrap the AuthState in index.js so that App.js can access the auth context. Now whenever the page reloads, no matter what route you are on, the user will be authenticated as **loadUser** action will be triggered on each re-render.

     **index.js**


     **App.js**


     **loadUser**',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":236}',
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
      'What are the benefits of new JSX transform?',
      'There are three major benefits of new JSX transform,

     1. It is possible to use JSX without importing React packages
     2. The compiled output might improve the bundle size in a small amount
     3. The future improvements provides the flexibility to reduce the number of concepts to learn React.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'There are three major benefits of new JSX transform,

     1. It is possible to use JSX without importing React packages
     2. The compiled output might improve the bundle size in a small amount
     3. The future improvements provides the flexibility to reduce the number of concepts to learn React.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":237}',
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
      'How is the new JSX transform different from old transform??',
      '<pre><code>     import { jsx as _jsx } from &quot;react/jsx-runtime&quot;;

     function App() {
       return _jsx(&quot;h1&quot;, { children: &quot;Good morning!!&quot; });
     }</code></pre>

The new JSX transform doesn’t require React to be in scope. i.e, You don''t need to import React package for simple scenarios.

     Let''s take an example to look at the main differences between the old and the new transform,

     **Old Transform:**


     Now JSX transform convert the above code into regular JavaScript as below,


     **New Transform:**

     The new JSX transform doesn''t require any React imports


     Under the hood JSX transform compiles to below code


     **Note:** You still need to import React to use Hooks.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'The new JSX transform doesn’t require React to be in scope. i.e, You don''t need to import React package for simple scenarios.

     Let''s take an example to look at the main differences between the old and the new transform,

     **Old Transform:**


     Now JSX transform convert the above code into regular JavaScript as below,


     **New Transform:**

     The new JSX transform doesn''t require any React imports


     Under the hood JSX transform compiles to below code


     **Note:** You still need to import React to use Hooks.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":238}',
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
      'What are React Server components?',
      'React Server Component is a way to write React component that gets rendered in the server-side with the purpose of improving React app performance. These components allow us to load components from the backend.

     **Note:** React Server Components is still under development and not recommended for production yet.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'React Server Component is a way to write React component that gets rendered in the server-side with the purpose of improving React app performance. These components allow us to load components from the backend.

     **Note:** React Server Components is still under development and not recommended for production yet.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":239}',
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
      'What is prop drilling?',
      'Prop Drilling is the process by which you pass data from one component of the React Component tree to another by going through other components that do not need the data but only help in passing it around.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'Prop Drilling is the process by which you pass data from one component of the React Component tree to another by going through other components that do not need the data but only help in passing it around.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":240}',
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
      'What is the difference between useState and useRef hook?',
      '1. useState causes components to re-render after state updates whereas useRef doesn’t cause a component to re-render when the value or state changes.
        Essentially, useRef is like a “box” that can hold a mutable value in its (`.current`) property.
     2. useState allows us to update the state inside components. While useRef allows referencing DOM elements and tracking values.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      '1. useState causes components to re-render after state updates whereas useRef doesn’t cause a component to re-render when the value or state changes.
        Essentially, useRef is like a “box” that can hold a mutable value in its (`.current`) property.
     2. useState allows us to update the state inside components. While useRef allows referencing DOM elements and tracking values.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":241}',
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
      'What is a wrapper component?',
      '<pre><code>     &lt;MessageWrapperWithTitle title=&quot;My Message&quot; text=&quot;Hello World&quot; /&gt;</code></pre>

A wrapper in React is a component that wraps or surrounds another component or group of components. It can be used for a variety of purposes such as adding additional functionality, styling, or layout to the wrapped components.

     For example, consider a simple component that displays a message:


     We can create a wrapper component that will add a border to the message component:


     Now we can use the MessageWrapper component instead of the Message component and the message will be displayed with a border:


     Wrapper component can also accept its own props and pass them down to the wrapped component, for example, we can create a wrapper component that will add a title to the message component:


     Now we can use the MessageWrapperWithTitle component and pass title props:


     This way, the wrapper component can add additional functionality, styling, or layout to the wrapped component while keeping the wrapped component simple and reusable.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'A wrapper in React is a component that wraps or surrounds another component or group of components. It can be used for a variety of purposes such as adding additional functionality, styling, or layout to the wrapped components.

     For example, consider a simple component that displays a message:


     We can create a wrapper component that will add a border to the message component:


     Now we can use the MessageWrapper component instead of the Message component and the message will be displayed with a border:


     Wrapper component can also accept its own props and pass them down to the wrapped component, for example, we can create a wrapper component that will add a title to the message component:


     Now we can use the MessageWrapperWithTitle component and pass title props:


     This way, the wrapper component can add additional functionality, styling, or layout to the wrapped component while keeping the wrapped component simple and reusable.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":242}',
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
      'What are the differences between useEffect and useLayoutEffect hooks?',
      'useEffect and useLayoutEffect are both React hooks that can be used to synchronize a component with an external system, such as a browser API or a third-party library. However, there are some key differences between the two:

     - Timing: useEffect runs after the browser has finished painting, while useLayoutEffect runs synchronously before the browser paints. This means that useLayoutEffect can be used to measure and update layout in a way that feels more synchronous to the user.

     - Browser Paint: useEffect allows browser to paint the changes before running the effect, hence it may cause some visual flicker. useLayoutEffect synchronously runs the effect before browser paints and hence it will avoid visual flicker.

     - Execution Order: The order in which multiple useEffect hooks are executed is determined by React and may not be predictable. However, the order in which multiple useLayoutEffect hooks are executed is determined by the order in which they were called.

     - Error handling: useEffect has a built-in mechanism for handling errors that occur during the execution of the effect, so that it does not crash the entire application. useLayoutEffect does not have this mechanism, and errors that occur during the execution of the effect will crash the entire application.

     In general, it''s recommended to use useEffect as much as possible, because it is more performant and less prone to errors. useLayoutEffect should only be used when you need to measure or update layout, and you can''t achieve the same result using useEffect.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'useEffect and useLayoutEffect are both React hooks that can be used to synchronize a component with an external system, such as a browser API or a third-party library. However, there are some key differences between the two:

     - Timing: useEffect runs after the browser has finished painting, while useLayoutEffect runs synchronously before the browser paints. This means that useLayoutEffect can be used to measure and update layout in a way that feels more synchronous to the user.

     - Browser Paint: useEffect allows browser to paint the changes before running the effect, hence it may cause some visual flicker. useLayoutEffect synchronously runs the effect before browser paints and hence it will avoid visual flicker.

     - Execution Order: The order in which multiple useEffect hooks are executed is determined by React and may not be predictable. However, the order in which multiple useLayoutEffect hooks are executed is determined by the order in which they were called.

     - Error handling: useEffect has a built-in mechanism for handling errors that occur during the execution of the effect, so that it does not crash the entire application. useLayoutEffect does not have this mechanism, and errors that occur during the execution of the effect will crash the entire application.

     In general, it''s recommended to use useEffect as much as possible, because it is more performant and less prone to errors. useLayoutEffect should only be used when you need to measure or update layout, and you can''t achieve the same result using useEffect.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":243}',
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
      'What are the differences between Functional and Class Components?',
      '<pre><code>     function Child(props) {
       return (
         &lt;h1&gt;
           This is a child component and the component name is{props.name}
         &lt;/h1&gt;
       );
     }

     function Parent() {
       return (
           &lt;Child name=&quot;First child component&quot; /&gt;
           &lt;Child name=&quot;Second child component&quot; /&gt;
       );
     }</code></pre>

There are two different ways to create components in ReactJS. The main differences are listed down as below,

     ## 1. Syntax:

     The class components uses ES6 classes to create the components. It uses `render` function to display the HTML content in the webpage.

     The syntax for class component looks like as below.


     **Note:** The **Pascal Case** is the recommended approach to provide naming to a component.

     Functional component has been improved over the years with some added features like Hooks. Here is a syntax for functional component.


     ## 2. State:

     State contains information or data about a component which may change over time.

     In class component, you can update the state when a user interacts with it or server updates the data using the `setState()` method. The initial state is going to be assigned in the `Constructor()` method using the `this.state` object and it is possible to assign different data types such as string, boolean, numbers, etc.

     **A simple example showing how we use the setState() and constructor():**


     You didn''t use state in functional components because it was only supported in class components. But over the years hooks have been implemented in functional components which enables to use state too.

     The `useState()` hook can used to implement state in functional components. It returns an array with two items: the first item is current state and the next one is a function (setState) that updates the value of the current state.

     Let''s see an example to demonstrate the state in functional components,


     ## 3. Props:

     Props are referred to as "properties". The props are passed into React component just like arguments passed to a function. In other words, they are similar to HTML attributes.

     The props are accessible in child class component using `this.props` as shown in below example,


     Props in functional components are similar to that of the class components but the difference is the absence of ''this'' keyword.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'There are two different ways to create components in ReactJS. The main differences are listed down as below,

     ## 1. Syntax:

     The class components uses ES6 classes to create the components. It uses `render` function to display the HTML content in the webpage.

     The syntax for class component looks like as below.


     **Note:** The **Pascal Case** is the recommended approach to provide naming to a component.

     Functional component has been improved over the years with some added features like Hooks. Here is a syntax for functional component.


     ## 2. State:

     State contains information or data about a component which may change over time.

     In class component, you can update the state when a user interacts with it or server updates the data using the `setState()` method. The initial state is going to be assigned in the `Constructor()` method using the `this.state` object and it is possible to assign different data types such as string, boolean, numbers, etc.

     **A simple example showing how we use the setState() and constructor():**


     You didn''t use state in functional components because it was only supported in class components. But over the years hooks have been implemented in functional components which enables to use state too.

     The `useState()` hook can used to implement state in functional components. It returns an array with two items: the first item is current state and the next one is a function (setState) that updates the value of the current state.

     Let''s see an example to demonstrate the state in functional components,


     ## 3. Props:

     Props are referred to as "properties". The props are passed into React component just like arguments passed to a function. In other words, they are similar to HTML attributes.

     The props are accessible in child class component using `this.props` as shown in below example,


     Props in functional components are similar to that of the class components but the difference is the absence of ''this'' keyword.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":244}',
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
      'What is strict mode in React?',
      '<pre><code>     import { StrictMode } from &quot;react&quot;;

     function App() {
       return (
           &lt;Header /&gt;
           &lt;StrictMode&gt;
               &lt;ComponentOne /&gt;
               &lt;ComponentTwo /&gt;
           &lt;/StrictMode&gt;
           &lt;Header /&gt;
       );
     }</code></pre>

`React.StrictMode` is a useful component for highlighting potential problems in an application. Just like `<Fragment>`, `<StrictMode>` does not render any extra DOM elements. It activates additional checks and warnings for its descendants. These checks apply for _development mode_ only.


     In the example above, the _strict mode_ checks apply to `<ComponentOne>` and `<ComponentTwo>` components only. i.e., Part of the application only.

     **Note:** Frameworks such as NextJS has this flag enabled by default.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      '`React.StrictMode` is a useful component for highlighting potential problems in an application. Just like `<Fragment>`, `<StrictMode>` does not render any extra DOM elements. It activates additional checks and warnings for its descendants. These checks apply for _development mode_ only.


     In the example above, the _strict mode_ checks apply to `<ComponentOne>` and `<ComponentTwo>` components only. i.e., Part of the application only.

     **Note:** Frameworks such as NextJS has this flag enabled by default.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":245}',
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
      'What is the benefit of strict mode?',
      'The <StrictMode> will be helpful in the below cases,

     1. To find the bugs caused by impure rendering where the components will re-render twice.
     2. To find the bugs caused by missing cleanup of effects where the components will re-run effects one more extra time.
     3. Identifying components with **unsafe lifecycle methods**.
     4. Warning about **legacy string ref** API usage.
     5. Detecting unexpected **side effects**.
     6. Detecting **legacy context** API.
     7. Warning about deprecated **findDOMNode** usage',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'The <StrictMode> will be helpful in the below cases,

     1. To find the bugs caused by impure rendering where the components will re-render twice.
     2. To find the bugs caused by missing cleanup of effects where the components will re-run effects one more extra time.
     3. Identifying components with **unsafe lifecycle methods**.
     4. Warning about **legacy string ref** API usage.
     5. Detecting unexpected **side effects**.
     6. Detecting **legacy context** API.
     7. Warning about deprecated **findDOMNode** usage',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":246}',
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
      'Why does strict mode render twice in React?',
      '<pre><code>     const root = createRoot(document.getElementById(&quot;root&quot;));
     root.render(&lt;App /&gt;);</code></pre>

StrictMode renders components twice in development mode(not production) in order to detect any problems with your code and warn you about those problems. This is used to detect accidental side effects in the render phase. If you used `create-react-app` development tool then it automatically enables StrictMode by default.


     If you want to disable this behavior then you can simply remove `strict` mode.


     To detect side effects the following functions are invoked twice:

     1. Function component bodies, excluding the code inside event handlers.
     2. Functions passed to `useState`, `useMemo`, or `useReducer` (any other Hook)
     3. Class component''s `constructor`, `render`, and `shouldComponentUpdate` methods
     4. Class component static `getDerivedStateFromProps` method
     5. State updater functions',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'StrictMode renders components twice in development mode(not production) in order to detect any problems with your code and warn you about those problems. This is used to detect accidental side effects in the render phase. If you used `create-react-app` development tool then it automatically enables StrictMode by default.


     If you want to disable this behavior then you can simply remove `strict` mode.


     To detect side effects the following functions are invoked twice:

     1. Function component bodies, excluding the code inside event handlers.
     2. Functions passed to `useState`, `useMemo`, or `useReducer` (any other Hook)
     3. Class component''s `constructor`, `render`, and `shouldComponentUpdate` methods
     4. Class component static `getDerivedStateFromProps` method
     5. State updater functions',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":247}',
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
      'What are the rules of JSX?',
      'The below 3 rules needs to be followed while using JSX in a react application.

     1. **Return a single root element**:
        If you are returning multiple elements from a component, wrap them in a single parent element. Otherwise you will receive the below error in your browser console.

        `html Adjacent JSX elements must be wrapped in an enclosing tag.`

     2. **All the tags needs to be closed:**
        Unlike HTML, all tags needs to closed explicitly with in JSX. This rule applies for self-closing tags(like hr, br and img tags) as well.
     3. **Use camelCase naming:**
        It is suggested to use camelCase naming for attributes in JSX. For example, the common attributes of HTML elements such as `class`, `tabindex` will be used as `className` and `tabIndex`.  
        **Note:** There is an exception for `aria-*` and `data-*` attributes which should be lower cased all the time.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'The below 3 rules needs to be followed while using JSX in a react application.

     1. **Return a single root element**:
        If you are returning multiple elements from a component, wrap them in a single parent element. Otherwise you will receive the below error in your browser console.

        `html Adjacent JSX elements must be wrapped in an enclosing tag.`

     2. **All the tags needs to be closed:**
        Unlike HTML, all tags needs to closed explicitly with in JSX. This rule applies for self-closing tags(like hr, br and img tags) as well.
     3. **Use camelCase naming:**
        It is suggested to use camelCase naming for attributes in JSX. For example, the common attributes of HTML elements such as `class`, `tabindex` will be used as `className` and `tabIndex`.  
        **Note:** There is an exception for `aria-*` and `data-*` attributes which should be lower cased all the time.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":248}',
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
      'What is the reason behind multiple JSX tags to be wrapped?',
      'Behind the scenes, JSX is transformed into plain javascript objects. It is not possible to return two or more objects from a function without wrapping into an array. This is the reason you can''t simply return two or more JSX tags from a function without
      wrapping them into a single parent tag or a Fragment.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'Behind the scenes, JSX is transformed into plain javascript objects. It is not possible to return two or more objects from a function without wrapping into an array. This is the reason you can''t simply return two or more JSX tags from a function without
      wrapping them into a single parent tag or a Fragment.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":249}',
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
      'How do you prevent mutating array variables?',
      'The preexisting variables outside of the function scope including state, props and context leads to a mutation and they result in unpredictable bugs during the rendering stage. The below points should be taken care while working with arrays variables.

      1. You need to take copy of the original array and perform array operations on it for the rendering purpose. This is called local mutation.
      2. Avoid triggering mutation methods such as push, pop, sort and reverse methods on original array. It is safe to use filter, map and slice method because they create a new array.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'The preexisting variables outside of the function scope including state, props and context leads to a mutation and they result in unpredictable bugs during the rendering stage. The below points should be taken care while working with arrays variables.

      1. You need to take copy of the original array and perform array operations on it for the rendering purpose. This is called local mutation.
      2. Avoid triggering mutation methods such as push, pop, sort and reverse methods on original array. It is safe to use filter, map and slice method because they create a new array.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":250}',
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
      'What are capture phase events?',
      '<pre><code>         &lt;button onClick={(e) =&gt; e.stopPropagation()} /&gt;
         &lt;button onClick={(e) =&gt; e.stopPropagation()} /&gt;</code></pre>

The `onClickCapture` React event is helpful to catch all the events of child elements irrespective of event propagation logic or even if the events propagation stopped. This is useful if you need to log every click events for analytics purpose.

     For example, the below code triggers the click event of parent first followed by second level child eventhough leaf child button elements stops the propagation.


     The event propagation for the above code snippet happens in the following order:

     1. It travels downwards in the DOM tree by calling all `onClickCapture` event handlers.
     2. It executes `onClick` event handler on the target element.
     3. It travels upwards in the DOM tree by call all `onClick` event handlers above to it.',
      'open-ended',
      'intermediate',
      10,
      NULL,
      '',
      'The `onClickCapture` React event is helpful to catch all the events of child elements irrespective of event propagation logic or even if the events propagation stopped. This is useful if you need to log every click events for analytics purpose.

     For example, the below code triggers the click event of parent first followed by second level child eventhough leaf child button elements stops the propagation.


     The event propagation for the above code snippet happens in the following order:

     1. It travels downwards in the DOM tree by calling all `onClickCapture` event handlers.
     2. It executes `onClick` event handler on the target element.
     3. It travels upwards in the DOM tree by call all `onClick` event handlers above to it.',
      NULL,
      ARRAY[]::text[],
      ARRAY['react', 'miscellaneous', 'intermediate'],
      '{"source":"reference.md","section":"Miscellaneous","originalNum":251}',
      NULL,
      '1d54dd10-68fe-4ea9-874e-c960930e0402',
      NULL,
      true,
      '2025-11-18T18:46:59.312Z',
      '2025-11-18T18:46:59.312Z',
      'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      300
    );