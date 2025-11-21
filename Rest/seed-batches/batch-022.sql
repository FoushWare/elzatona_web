-- Batch 22: Questions 211-220 (10 questions)
INSERT INTO questions (
  id, title, content, type, difficulty, points, options, correct_answer, 
  explanation, test_cases, hints, tags, metadata, stats, category_id, 
  learning_card_id, is_active, created_at, updated_at, topic_id, time_limit
) VALUES (
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
    NULL,
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
    '{"source":"reference.md","section":"Miscellaneous","originalNum":212}'::jsonb,
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
    NULL,
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
    '{"source":"reference.md","section":"Miscellaneous","originalNum":213}'::jsonb,
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
    NULL,
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
    '{"source":"reference.md","section":"Miscellaneous","originalNum":214}'::jsonb,
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
    'Is it recommended to use CSS In JS technique in React?',
    'React does not have any opinion about how styles are defined but if you are a beginner then good starting point is to define your styles in a separate \\*.css file as usual and refer to them using className. This functionality is not part of React but came from third-party libraries. But If you want to try a different approach(CSS-In-JS) then styled-components library is a good option.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'React does not have any opinion about how styles are defined but if you are a beginner then good starting point is to define your styles in a separate \\*.css file as usual and refer to them using className. This functionality is not part of React but came from third-party libraries. But If you want to try a different approach(CSS-In-JS) then styled-components library is a good option.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":215}'::jsonb,
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
    'Do I need to rewrite all my class components with hooks?',
    'No. But you can try Hooks in a few components(or new components) without rewriting any existing code. Because there are no plans to remove classes in ReactJS.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'No. But you can try Hooks in a few components(or new components) without rewriting any existing code. Because there are no plans to remove classes in ReactJS.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":216}'::jsonb,
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
    NULL,
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
    '{"source":"reference.md","section":"Miscellaneous","originalNum":217}'::jsonb,
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
    'Is Hooks cover all use cases for classes?',
    'Hooks doesn''t cover all use cases of classes but there is a plan to add them soon. Currently there are no Hook equivalents to the uncommon **getSnapshotBeforeUpdate** and **componentDidCatch** lifecycles yet.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Hooks doesn''t cover all use cases of classes but there is a plan to add them soon. Currently there are no Hook equivalents to the uncommon **getSnapshotBeforeUpdate** and **componentDidCatch** lifecycles yet.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":218}'::jsonb,
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
    NULL,
    'React includes a stable implementation of React Hooks in 16.8 release for below packages

     1. React DOM
     2. React DOM Server
     3. React Test Renderer
     4. React Shallow Renderer',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":219}'::jsonb,
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
    'Why do we use array destructuring (square brackets notation) in `useState`?',
    '<pre><code>     const [user, setUser] = useState(&quot;userProfile&quot;);</code></pre>

When we declare a state variable with `useState`, it returns a pair — an array with two items. The first item is the current value, and the second is a function that updates the value. Using [0] and [1] to access them is a bit confusing because they have a specific meaning. This is why we use array destructuring instead.

     For example, the array index access would look as follows:


     Whereas with array destructuring the variables can be accessed as follows:',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'When we declare a state variable with `useState`, it returns a pair — an array with two items. The first item is the current value, and the second is a function that updates the value. Using [0] and [1] to access them is a bit confusing because they have a specific meaning. This is why we use array destructuring instead.

     For example, the array index access would look as follows:


     Whereas with array destructuring the variables can be accessed as follows:',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":220}'::jsonb,
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
    NULL,
    'Hooks got the ideas from several different sources. Below are some of them,

     1. Previous experiments with functional APIs in the react-future repository
     2. Community experiments with render prop APIs such as Reactions Component
     3. State variables and state cells in DisplayScript.
     4. Subscriptions in Rx.
     5. Reducer components in ReasonReact.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":221}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  );
