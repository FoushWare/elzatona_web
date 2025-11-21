-- Batch 20: Questions 191-200 (10 questions)
INSERT INTO questions (
  id, title, content, type, difficulty, points, options, correct_answer, 
  explanation, test_cases, hints, tags, metadata, stats, category_id, 
  learning_card_id, is_active, created_at, updated_at, topic_id, time_limit
) VALUES (
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
    NULL,
    'The keys used within arrays should be unique among their siblings but they don’t need to be globally unique. i.e, You can use the same keys with two different arrays.

     For example, the below `Book` component uses two arrays with different arrays,',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":192}'::jsonb,
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
    NULL,
    '`Formik` is a form library for react which provides solutions such as validation, keeping track of the visited fields, and handling form submission.

     In detail, You can categorize them as follows,

     1. Getting values in and out of form state
     2. Validation and error messages
     3. Handling form submission

     It is used to create a scalable, performant, form helper with a minimal API to solve annoying stuff.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":193}'::jsonb,
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
    'What are the advantages of formik over redux form library?',
    'Below are the main reasons to recommend formik over redux form library,

     1. The form state is inherently short-term and local, so tracking it in Redux (or any kind of Flux library) is unnecessary.
     2. Redux-Form calls your entire top-level Redux reducer multiple times ON EVERY SINGLE KEYSTROKE. This way it increases input latency for large apps.
     3. Redux-Form is 22.5 kB minified gzipped whereas Formik is 12.7 kB',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Below are the main reasons to recommend formik over redux form library,

     1. The form state is inherently short-term and local, so tracking it in Redux (or any kind of Flux library) is unnecessary.
     2. Redux-Form calls your entire top-level Redux reducer multiple times ON EVERY SINGLE KEYSTROKE. This way it increases input latency for large apps.
     3. Redux-Form is 22.5 kB minified gzipped whereas Formik is 12.7 kB',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":194}'::jsonb,
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
    'Why are you not required to use inheritance?',
    'In React, it is recommended to use composition over inheritance to reuse code between components. Both Props and composition give you all the flexibility you need to customize a component’s look and behavior explicitly and safely.
     Whereas, If you want to reuse non-UI functionality between components, it is suggested to extract it into a separate JavaScript module. Later components import it and use that function, object, or class, without extending it.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'In React, it is recommended to use composition over inheritance to reuse code between components. Both Props and composition give you all the flexibility you need to customize a component’s look and behavior explicitly and safely.
     Whereas, If you want to reuse non-UI functionality between components, it is suggested to extract it into a separate JavaScript module. Later components import it and use that function, object, or class, without extending it.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":195}'::jsonb,
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
    NULL,
    'Yes, you can use web components in a react application. Even though many developers won''t use this combination, it may require especially if you are using third-party UI components that are written using Web Components.

     For example, let us use `Vaadin` date picker web component as below,',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":196}'::jsonb,
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
    NULL,
    'You can achieve code-splitting in your app using dynamic import.

     Let''s take an example of addition,

     1. **Normal Import**


     2. **Dynamic Import**',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":197}'::jsonb,
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
    NULL,
    'With the release of React 18, React.lazy and Suspense are now available for server-side rendering. However, prior to React 18, it was recommended to use Loadable Components for code-splitting in a server-side rendered app because React.lazy and Suspense were not available for server-side rendering. Loadable Components lets you render a dynamic import as a regular component. For example, you can use Loadable Components to load the OtherComponent in a separate bundle like this:


     Now OtherComponent will be loaded in a separated bundle
     Loadable Components provides additional benefits beyond just code-splitting, such as automatic code reloading, error handling, and preloading. By using Loadable Components, you can ensure that your application loads quickly and efficiently, providing a better user experience for your users.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":198}'::jsonb,
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
    NULL,
    'React Suspense is a built-in feature that lets you defer rendering part of your component tree until some condition(asynchronous operation) is met—usually, data or code has finished loading. While waiting, Suspense lets you display a fallback UI like a spinner or placeholder.


     1. Lazy loading components uses suspense feature,


        If the module containing the dynamic import is not yet loaded by the time parent component renders, you must show some fallback content while you’re waiting for it to load using a loading indicator. This can be done using **Suspense** component.
    
        The above component shows fallback UI instead real component until `OtherComponent` is fully loaded.

     2. As an another example, suspend until async data(data fetching) is ready',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":199}'::jsonb,
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
    NULL,
    'One of the best place to do code splitting is with routes. The entire page is going to re-render at once so users are unlikely to interact with other elements in the page at the same time. Due to this, the user experience won''t be disturbed.

     Let us take an example of route based website using libraries like React Router with React.lazy,


     In the above code, the code splitting will happen at each route level.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":200}'::jsonb,
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
    'What is the purpose of default value in context?',
    '<pre><code>     const MyContext = React.createContext(defaultValue);</code></pre>

The defaultValue argument is only used when a component does not have a matching Provider above it in the tree. This can be helpful for testing components in isolation without wrapping them.

     Below code snippet provides default theme value as Luna.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'The defaultValue argument is only used when a component does not have a matching Provider above it in the tree. This can be helpful for testing components in isolation without wrapping them.

     Below code snippet provides default theme value as Luna.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'miscellaneous', 'intermediate'],
    '{"source":"reference.md","section":"Miscellaneous","originalNum":201}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.523Z',
    '2025-11-18T20:44:53.523Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  );
