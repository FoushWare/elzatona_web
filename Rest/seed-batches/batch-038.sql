-- Batch 38: Questions 371-380 (10 questions)
INSERT INTO questions (
  id, title, content, type, difficulty, points, options, correct_answer, 
  explanation, test_cases, hints, tags, metadata, stats, category_id, 
  learning_card_id, is_active, created_at, updated_at, topic_id, time_limit
) VALUES (
    gen_random_uuid(),
    'Why should not call setState in componentWillUnmount?',
    'You should not call `setState()` in `componentWillUnmount()` because once a component instance is unmounted, it will never be mounted again.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'You should not call `setState()` in `componentWillUnmount()` because once a component instance is unmounted, it will never be mounted again.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":64}'::jsonb,
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
    NULL,
    'This lifecycle method is invoked after an error has been thrown by a descendant component. It receives the error that was thrown as a parameter and should return a value to update state.

    The signature of the lifecycle method is as follows,


    Let us take error boundary use case with the above lifecycle method for demonstration purpose,',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":65}'::jsonb,
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
    NULL,
    'An update can be caused by changes to props or state. The below methods are called in the following order when a component is being re-rendered.

    1.  static getDerivedStateFromProps()
    2.  shouldComponentUpdate()
    3.  render()
    4.  getSnapshotBeforeUpdate()
    5.  componentDidUpdate()',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":66}'::jsonb,
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
    'What are the methods invoked during error handling?',
    'Below methods are called when there is an error during rendering, in a lifecycle method, or in the constructor of any child component.

    1.  static getDerivedStateFromError()
    2.  componentDidCatch()',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'Below methods are called when there is an error during rendering, in a lifecycle method, or in the constructor of any child component.

    1.  static getDerivedStateFromError()
    2.  componentDidCatch()',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":67}'::jsonb,
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
    'What is the purpose of unmountComponentAtNode method?',
    '<pre><code>    ReactDOM.unmountComponentAtNode(container);</code></pre>

This method is available from react-dom package and it removes a mounted React component from the DOM and clean up its event handlers and state. If no component was mounted in the container, calling this function does nothing. Returns true if a component was unmounted and false if there was no component to unmount.

    The method signature would be as follows,',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    'This method is available from react-dom package and it removes a mounted React component from the DOM and clean up its event handlers and state. If no component was mounted in the container, calling this function does nothing. Returns true if a component was unmounted and false if there was no component to unmount.

    The method signature would be as follows,',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":68}'::jsonb,
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
    NULL,
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
    '{"source":"reference.md","section":"Old Q&A","originalNum":69}'::jsonb,
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
    NULL,
    '**React.forwardRef** accepts a render function as parameter and DevTools uses this function to determine what to display for the ref forwarding component.

    For example, If you don''t name the render function or not using displayName property then it will appear as ”ForwardRef” in the DevTools,


    But If you name the render function then it will appear as **”ForwardRef(myFunction)”**


    As an alternative, You can also set displayName property for forwardRef function,',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":70}'::jsonb,
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
    NULL,
    'Yes, You can use. It is often the easiest way to pass parameters to callback functions. But you need to optimize the performance while using it.


    **Note:** Using an arrow function in render method creates a new function each time the component renders, which may have performance implications',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":71}'::jsonb,
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
    NULL,
    'When you call setState() in the component, React merges the object you provide into the current state.

    For example, let us take a facebook user with posts and comments details as state variables,


    Now you can update them independently with separate `setState()` calls as below,


    As mentioned in the above code snippets, `this.setState({comments})` updates only comments variable without modifying or replacing `posts` variable.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":72}'::jsonb,
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
    NULL,
    'During iterations or loops, it is common to pass an extra parameter to an event handler. This can be achieved through arrow functions or bind method.

    Let us take an example of user details updated in a grid,


    In the both approaches, the synthetic argument `e` is passed as a second argument. You need to pass it explicitly for arrow functions and it will be passed automatically for `bind` method.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'legacy', 'intermediate'],
    '{"source":"reference.md","section":"Old Q&A","originalNum":73}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.524Z',
    '2025-11-18T20:44:53.524Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  );
