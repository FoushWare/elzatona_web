-- Batch 10: Questions 91-100 (10 questions)
INSERT INTO questions (
  id, title, content, type, difficulty, points, options, correct_answer, 
  explanation, test_cases, hints, tags, metadata, stats, category_id, 
  learning_card_id, is_active, created_at, updated_at, topic_id, time_limit
) VALUES (
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
    NULL,
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
    '{"source":"reference.md","section":"React Internationalization","originalNum":91}'::jsonb,
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
    NULL,
    'The library provides two ways to format strings, numbers, and dates:

    1.  **Using react components:**


    2.  **Using an API:**',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'i18n', 'intermediate'],
    '{"source":"reference.md","section":"React Internationalization","originalNum":92}'::jsonb,
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
    NULL,
    'The `<Formatted... />` components from `react-intl` return elements, not plain text, so they can''t be used for placeholders, alt text, etc. In that case, you should use lower level API `formatMessage()`. You can inject the `intl` object into your component using `injectIntl()` higher-order component and then format the message using `formatMessage()` available on that object.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'i18n', 'intermediate'],
    '{"source":"reference.md","section":"React Internationalization","originalNum":93}'::jsonb,
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
    NULL,
    'You can get the current locale in any component of your application using `injectIntl()`:',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'i18n', 'intermediate'],
    '{"source":"reference.md","section":"React Internationalization","originalNum":94}'::jsonb,
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
    NULL,
    'The `injectIntl()` higher-order component will give you access to the `formatDate()` method via the props in your component. The method is used internally by instances of `FormattedDate` and it returns the string representation of the formatted date.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'i18n', 'intermediate'],
    '{"source":"reference.md","section":"React Internationalization","originalNum":95}'::jsonb,
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
    NULL,
    '_Shallow rendering_ is useful for writing unit test cases in React. It lets you render a component _one level deep_ and assert facts about what its render method returns, without worrying about the behavior of child components, which are not instantiated or rendered.

    For example, if you have the following component:


    Then you can assert as follows:',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'testing', 'intermediate'],
    '{"source":"reference.md","section":"React Testing","originalNum":96}'::jsonb,
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
    NULL,
    'This package provides a renderer that can be used to render components to pure JavaScript objects, without depending on the DOM or a native mobile environment. This package makes it easy to grab a snapshot of the platform view hierarchy (similar to a DOM tree) rendered by a ReactDOM or React Native without using a browser or `jsdom`.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'testing', 'intermediate'],
    '{"source":"reference.md","section":"React Testing","originalNum":97}'::jsonb,
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
    'What is the purpose of ReactTestUtils package?',
    '_ReactTestUtils_ are provided in the `with-addons` package and allow you to perform actions against a simulated DOM for the purpose of unit testing.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    '_ReactTestUtils_ are provided in the `with-addons` package and allow you to perform actions against a simulated DOM for the purpose of unit testing.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'testing', 'intermediate'],
    '{"source":"reference.md","section":"React Testing","originalNum":98}'::jsonb,
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
    'What is Jest?',
    '_Jest_ is a JavaScript unit testing framework created by Facebook based on Jasmine and provides automated mock creation and a `jsdom` environment. It''s often used for testing components.',
    'open-ended',
    'intermediate',
    10,
    NULL,
    NULL,
    '_Jest_ is a JavaScript unit testing framework created by Facebook based on Jasmine and provides automated mock creation and a `jsdom` environment. It''s often used for testing components.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'testing', 'intermediate'],
    '{"source":"reference.md","section":"React Testing","originalNum":99}'::jsonb,
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
    NULL,
    'There are couple of advantages compared to Jasmine:

     - Automatically finds tests to execute in your source code.
     - Automatically mocks dependencies when running your tests.
     - Allows you to test asynchronous code synchronously.
     - Runs your tests with a fake DOM implementation (via `jsdom`) so that your tests can be run on the command line.
     - Runs tests in parallel processes so that they finish sooner.',
    NULL,
    ARRAY[]::text[],
    ARRAY['react', 'testing', 'intermediate'],
    '{"source":"reference.md","section":"React Testing","originalNum":100}'::jsonb,
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '1d54dd10-68fe-4ea9-874e-c960930e0402',
    NULL,
    true,
    '2025-11-18T20:44:53.522Z',
    '2025-11-18T20:44:53.522Z',
    'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
    300
  );
