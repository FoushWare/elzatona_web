INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'bada6a29-dc6a-4348-8a12-bcd29d36746e',
          'How to access the current locale with React Intl?',
          'Access the current locale using the `intl` object from `injectIntl` (HOC) or `useIntl` (hook):
```jsx
const MyComponent = ({ intl }) => (
  <div>Current locale: {intl.locale}</div>
);
export default injectIntl(MyComponent);
// or with hook:
// const { locale } = useIntl();
```',
          'multiple-choice',
          'intermediate',
          3,
          '[{"id":"a","text":"`navigator.language`","isCorrect":false},{"id":"b","text":"`intl.locale` from `injectIntl` or `useIntl`","isCorrect":true},{"id":"c","text":"`process.env.LOCALE`","isCorrect":false},{"id":"d","text":"Locale is not accessible","isCorrect":false}]',
          NULL,
          'The `intl` object (from HOC or hook) provides access to the current locale via `intl.locale`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','intl','locale','useintl','injectintl']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-094","original_type":"multiple-choice","topic":"React Intl","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '92be2a63-f843-4be3-a035-538b8cdb865f',
          'How to format date using React Intl?',
          'Use the `injectIntl()` HOC to access `formatDate()` via props. It returns a string representation of the formatted date.

```jsx
import { injectIntl, intlShape } from "react-intl";

const MyComponent = ({ intl }) => {
  const stringDate = intl.formatDate(new Date(), {
    year: "numeric",
    month: "numeric",
    day: "numeric"
  });
  return <div>{`The formatted date is ${stringDate}`}</div>;
};

MyComponent.propTypes = { intl: intlShape.isRequired };
export default injectIntl(MyComponent);
```',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          '`injectIntl` injects the `intl` object into a component’s props, which includes `formatDate`, `formatNumber`, and other localization utilities.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','react-intl','i18n','date-formatting','internationalization']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q95","original_type":"open-ended","topic":"Internationalization (i18n)","subcategory":"Internationalization (i18n)","sample_answers":["Use `injectIntl` to wrap your component and access `intl.formatDate()` with options like `{ year: ''numeric'', month: ''short'' }`.","Alternatively, in modern React, use the `useIntl()` hook instead of `injectIntl` for function components."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'a8c2eff5-4125-4dee-9bd9-c47d846f1780',
          'What is Shallow Renderer in React testing?',
          'Shallow rendering renders a component one level deep without rendering child components, useful for unit testing isolated behavior.',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Shallow rendering lets you test a component’s output without instantiating or rendering its children, isolating the unit under test.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','testing','shallow-rendering','unit-test']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q96","original_type":"open-ended","topic":"React Testing","subcategory":"Unit Testing","sample_answers":["Shallow rendering tests only the current component’s render output, ignoring child component logic—ideal for pure unit tests.","It’s provided by `react-test-renderer/shallow` and useful for asserting structure without DOM or side effects."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'aacafd7a-d6b6-4c12-bbe9-76d70836bb8f',
          'What is the `TestRenderer` package in React?',
          '`TestRenderer` renders React components to plain JavaScript objects (not DOM), enabling snapshot testing without a browser or jsdom.',
          'multiple-choice',
          'intermediate',
          7,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'It converts a React element tree into a serializable JavaScript object, perfect for snapshot comparisons in Jest.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','testrenderer','snapshot-testing','testing']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q97","original_type":"open-ended","topic":"React Testing","subcategory":"Unit Testing","sample_answers":["`TestRenderer.create(<MyComponent />)` returns a renderer whose `.toJSON()` output can be snapshotted and compared across test runs.","Unlike DOM-based testing, it works in Node.js environments and supports both ReactDOM and React Native components."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'c37989fc-9a59-4552-a0ab-58a58aec4713',
          'What is the purpose of ReactTestUtils package?',
          '`ReactTestUtils` provides utilities to simulate DOM interactions and inspect component behavior in unit tests.',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'It includes methods like `Simulate.click()` and `findRenderedDOMComponentWithTag()` for testing event handling and component structure.',
          NULL,
          ARRAY[]::text[],
          ARRAY['react','reacttestutils','testing','dom-simulation']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q98","original_type":"open-ended","topic":"React Testing","subcategory":"Unit Testing","sample_answers":["`ReactTestUtils` allows you to trigger synthetic events (e.g., clicks) and traverse rendered component trees for assertions.","Though largely superseded by React Testing Library and `@testing-library/react`, it was foundational in early React testing."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '81a5185b-d015-4aaf-857a-1dce312d34e8',
          'What is Jest?',
          'Jest is a JavaScript testing framework created by Facebook, based on Jasmine, with built-in mocking, snapshot testing, and jsdom support.',
          'multiple-choice',
          'beginner',
          5,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Jest requires minimal configuration, runs tests in parallel, and integrates seamlessly with React via `@testing-library/react` or snapshot testing.',
          NULL,
          ARRAY[]::text[],
          ARRAY['jest','testing','facebook','javascript','unit-testing']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q99","original_type":"open-ended","topic":"Jest","subcategory":"Unit Testing","sample_answers":["Jest is a zero-config test runner with built-in assertion library, mocking, coverage reports, and snapshot capabilities.","It uses `jsdom` to simulate a browser environment, enabling DOM-based tests to run in Node.js."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'a620fa85-240d-45f2-beb9-bdd520319201',
          'What are the advantages of Jest over Jasmine?',
          'Jest offers automatic test discovery, auto-mocking, better async support, jsdom integration, and parallel test execution.',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"Jest requires more configuration than Jasmine","isCorrect":false},{"id":"b","text":"Jest has no mocking support","isCorrect":false},{"id":"c","text":"Jest auto-discovers tests, mocks dependencies, supports async, uses jsdom, and runs tests in parallel","isCorrect":true},{"id":"d","text":"Jasmine runs tests faster than Jest","isCorrect":false}]',
          NULL,
          'Jest builds on Jasmine’s syntax but adds modern DX features like auto-mocking, snapshot testing, and zero-config setup.',
          NULL,
          ARRAY[]::text[],
          ARRAY['jest','jasmine','testing','comparison']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"q100","original_type":"multiple-choice","topic":"Jest","subcategory":"Unit Testing","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'c0fc6444-edd0-4ed2-bfd9-f852802203a4',
          'What is CSS?',
          'CSS stands for Cascading Style Sheets. It is used to define styles for web pages, including design, layout, and responsiveness across devices.',
          'multiple-choice',
          'beginner',
          3,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'CSS separates content (HTML) from presentation, enabling consistent, maintainable, and responsive designs.',
          NULL,
          [],
          ARRAY['css','css-fundamentals','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"css-1-css-q1","original_type":"open-ended","topic":"CSS Fundamentals","subcategory":"","sample_answers":["CSS (Cascading Style Sheets) controls the visual appearance of HTML elements—layout, colors, fonts, spacing, and responsiveness.","Its primary purpose is to decouple styling from structure, making websites easier to maintain and scale."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"CSS"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '5e35fd1c-41a4-4140-b96d-a1413e3fb435',
          'What is the use of CSS ruleset?',
          'A CSS ruleset consists of a selector and a declaration block. The selector targets HTML elements, and the declaration block contains property-value pairs that define styling.',
          'multiple-choice',
          'beginner',
          4,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Each ruleset applies styles to selected elements. Declarations must end with a semicolon (except the last one), and properties define visual characteristics.',
          NULL,
          [],
          ARRAY['css','css-fundamentals','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"css-1-css-q2","original_type":"open-ended","topic":"CSS Fundamentals","subcategory":"","sample_answers":["A CSS ruleset has two parts: a selector (e.g., `h1`) and a declaration block (e.g., `{ color: red; font-size: 2em; }`).","It tells the browser which elements to style and how to style them using property-value pairs."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"CSS"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '31b05b6c-e5a8-4b9d-ab11-0a7fb766d5ae',
          'What are the possible ways to apply CSS styles to a web page?',
          'There are three primary methods: inline styles (via `style` attribute), internal/embedded styles (in `<style>` tag), and external stylesheets (via `<link>`).',
          'multiple-choice',
          'beginner',
          5,
          '[{"id":"a","text":"Inline, internal, and external","isCorrect":true,"explanation":""},{"id":"b","text":"Only external","isCorrect":false,"explanation":""},{"id":"c","text":"Only inline","isCorrect":false,"explanation":""},{"id":"d","text":"CSS cannot be applied to HTML","isCorrect":false,"explanation":""}]',
          NULL,
          'External stylesheets are preferred for maintainability, caching, and separation of concerns. Inline styles have highest specificity but hurt reusability.',
          NULL,
          [],
          ARRAY['css','css-fundamentals','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"css-1-css-q3","original_type":"multiple-choice","topic":"CSS Fundamentals","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"CSS"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '21fb7ebc-a5f9-45a4-9bbe-3cfdb6167280',
          'What does the cascading portion of CSS mean?',
          'Cascading refers to how CSS resolves conflicting rules by applying styles based on origin, specificity, and order—allowing author styles to override browser defaults.',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Styles cascade from browser defaults → user styles → author styles. Higher-specificity or later-defined rules override earlier ones.',
          NULL,
          [],
          ARRAY['css','css-fundamentals','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"css-1-css-q4","original_type":"open-ended","topic":"CSS Fundamentals","subcategory":"","sample_answers":["Cascading determines which styles win when multiple rules apply. Author styles override browser defaults, and more specific selectors override less specific ones.","It’s the ''C'' in CSS—rules flow down and combine based on priority, not just order."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"CSS"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '4bf5ba77-974a-4105-bacf-303090e48654',
          'Explain new features in CSS3?',
          'CSS3 introduced selectors (`:nth-child`, `[attr^=]`), pseudo-classes (`:target`, `:not`), colors (RGBA, HSLA), rounded corners (`border-radius`), shadows (`box-shadow`, `text-shadow`), gradients, and multiple backgrounds.',
          'multiple-choice',
          'intermediate',
          7,
          '[{"id":"a","text":"border-radius, box-shadow, gradients, RGBA, new selectors","isCorrect":true,"explanation":""},{"id":"b","text":"Only new color formats","isCorrect":false,"explanation":""},{"id":"c","text":"CSS3 removed all vendor prefixes","isCorrect":false,"explanation":""},{"id":"d","text":"CSS3 is not supported in modern browsers","isCorrect":false,"explanation":""}]',
          NULL,
          'CSS3 modularized the spec and added powerful visual and layout capabilities without requiring JavaScript.',
          NULL,
          [],
          ARRAY['css','css3-features','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"css-1-css-q5","original_type":"multiple-choice","topic":"CSS3 Features","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"CSS"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '43abdf63-f480-4adc-948a-e20d4e15d4a1',
          'What are the CSS selectors?',
          'CSS selectors target HTML elements for styling. Types include: universal (`*`), element (`p`), class (`.class`), ID (`#id`), attribute (`[type=''text'']`), pseudo-classes (`:hover`), pseudo-elements (`::before`), and combinators (`>`, `+`, `~`).',
          'multiple-choice',
          'intermediate',
          7,
          '[{"id":"a","text":"Universal, element, class, ID, attribute, pseudo-classes, pseudo-elements, combinators","isCorrect":true,"explanation":""},{"id":"b","text":"Only class and ID","isCorrect":false,"explanation":""},{"id":"c","text":"Selectors are optional in CSS","isCorrect":false,"explanation":""},{"id":"d","text":"Pseudo-elements are the same as pseudo-classes","isCorrect":false,"explanation":""}]',
          NULL,
          'Selectors form the foundation of CSS—they determine which elements receive which styles.',
          NULL,
          [],
          ARRAY['css','selectors','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"css-1-css-q6","original_type":"multiple-choice","topic":"Selectors","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"CSS"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '0cedfc58-989b-4fa1-bf40-fce89390c76a',
          'What is contextual selector?',
          'A contextual selector (or descendant selector) targets an element based on its ancestor context, e.g., `table p` selects `<p>` inside `<table>`.',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'It styles elements only when they appear within a specific structural context in the HTML tree.',
          NULL,
          [],
          ARRAY['css','selectors','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"css-1-css-q7","original_type":"open-ended","topic":"Selectors","subcategory":"","sample_answers":["`table p` applies styles only to paragraphs that are descendants of a table—useful for scoped styling.","Contextual selectors increase specificity and reduce unintended side effects."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"CSS"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'f3a2a2ad-cb07-493a-9cee-0fae4e482867',
          'What is the difference between Pseudo-classes and pseudo-elements?',
          'Pseudo-classes (e.g., `:hover`, `:nth-child`) style elements in specific states. Pseudo-elements (e.g., `::before`, `::first-line`) style parts of an element that aren’t real HTML nodes.',
          'multiple-choice',
          'intermediate',
          7,
          '[{"id":"a","text":"Pseudo-classes: element states; Pseudo-elements: virtual parts of elements","isCorrect":true,"explanation":""},{"id":"b","text":"They are identical","isCorrect":false,"explanation":""},{"id":"c","text":"Pseudo-elements can’t insert content","isCorrect":false,"explanation":""},{"id":"d","text":"Pseudo-classes require double colons","isCorrect":false,"explanation":""}]',
          NULL,
          'Pseudo-classes target existing elements in special states; pseudo-elements create virtual content or style subparts.',
          NULL,
          [],
          ARRAY['css','selectors','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"css-1-css-q8","original_type":"multiple-choice","topic":"Selectors","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"CSS"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'ce590a4e-7e51-4b02-a21b-2029f25a5911',
          'What is Combinator selector?',
          'Combinators connect selectors to define relationships: descendant (space), child (`>`), adjacent sibling (`+`), and general sibling (`~`).',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"Descendant ( ), child (>), adjacent (+), general sibling (~)","isCorrect":true,"explanation":""},{"id":"b","text":"Only child and descendant","isCorrect":false,"explanation":""},{"id":"c","text":"Combinators are deprecated","isCorrect":false,"explanation":""},{"id":"d","text":"Adjacent sibling selects all following siblings","isCorrect":false,"explanation":""}]',
          NULL,
          'Combinators enable precise targeting based on element relationships in the DOM tree.',
          NULL,
          [],
          ARRAY['css','selectors','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"css-1-css-q9","original_type":"multiple-choice","topic":"Selectors","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"CSS"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'b19320eb-72c4-474b-bbc1-eb3632a51431',
          'What is the difference between class selectors and id selectors?',
          'Class selectors (`.class`) can be reused on multiple elements. ID selectors (`#id`) should be unique to a single element per page.',
          'multiple-choice',
          'beginner',
          5,
          '[{"id":"a","text":"Class is for one element; ID is for many","isCorrect":false,"explanation":""},{"id":"b","text":"Class can be reused; ID should be unique","isCorrect":true,"explanation":""},{"id":"c","text":"They are functionally identical","isCorrect":false,"explanation":""},{"id":"d","text":"ID selectors are faster in all browsers","isCorrect":false,"explanation":""}]',
          NULL,
          'IDs have higher specificity than classes. While HTML allows duplicate IDs, it’s invalid and breaks accessibility and JavaScript.',
          NULL,
          [],
          ARRAY['css','selectors','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"css-1-css-q10","original_type":"multiple-choice","topic":"Selectors","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"CSS"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '08ceb094-f9de-4a27-84e0-47c482ba7540',
          'What is the difference between the “nth-child()” and “nth-of-type()” selectors?',
          '`nth-child(n)` counts all siblings; `nth-of-type(n)` counts only siblings of the same element type.',
          'multiple-choice',
          'intermediate',
          7,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          '`p:nth-of-type(2)` selects the second `<p>` among only `<p>` siblings, ignoring other elements.',
          NULL,
          [],
          ARRAY['css','selectors','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"css-1-css-q11","original_type":"open-ended","topic":"Selectors","subcategory":"","sample_answers":["`div:nth-child(2)` selects the second child if it’s a `<div>`. `div:nth-of-type(2)` selects the second `<div>` regardless of other siblings.","Use `nth-of-type` when you care about element type; use `nth-child` when position among all siblings matters."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"CSS"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '381abe5c-9c4a-4097-bc56-e9441c1a6b46',
          'Explain CSS grid layout with example?',
          'CSS Grid is a two-dimensional layout system for rows and columns. Use `display: grid`, `grid-template-columns`, `grid-template-rows`, and `grid-area` for complex layouts.',
          'multiple-choice',
          'advanced',
          9,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Grid excels at page-level layouts with precise control over alignment, sizing, and layering.',
          NULL,
          [],
          ARRAY['css','css-grid','advanced']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"css-1-css-q12","original_type":"open-ended","topic":"CSS Grid","subcategory":"","sample_answers":["```css\n.grid { display: grid; grid-template-columns: 1fr 2fr; gap: 10px; }\n``` creates a two-column layout where the second column is twice as wide.","Grid is ideal for dashboards, image galleries, and complex responsive designs that require both row and column control."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"CSS"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '96ad5239-27ae-4152-a065-66415c820830',
          'What is CSS flexbox? Write all the properties of the flexbox?',
          'Flexbox is a one-dimensional layout model for distributing space and aligning items in rows or columns. Key properties: `flex-direction`, `justify-content`, `align-items`, `flex-wrap`, `order`, `flex-grow`, `flex-shrink`.',
          'multiple-choice',
          'intermediate',
          8,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Flexbox simplifies alignment and distribution of space among items in a container, even when their size is unknown or dynamic.',
          NULL,
          [],
          ARRAY['css','css-flexbox','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"css-1-css-q13","original_type":"open-ended","topic":"CSS Flexbox","subcategory":"","sample_answers":["Use `display: flex` on a container. Control direction with `flex-direction`, alignment with `justify-content` (main axis) and `align-items` (cross axis).","Flexbox is perfect for navigation bars, card layouts, and centering content—both horizontally and vertically."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"CSS"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '07908fe6-4a62-487d-bc62-5924ab4676a6',
          'When to use CSS grid and flexbox?',
          'Use Flexbox for one-dimensional layouts (rows OR columns). Use Grid for two-dimensional layouts (rows AND columns). Flexbox is content-first; Grid is layout-first.',
          'multiple-choice',
          'intermediate',
          7,
          '[{"id":"a","text":"Flexbox: 1D, content-first; Grid: 2D, layout-first","isCorrect":true,"explanation":""},{"id":"b","text":"Grid is only for mobile","isCorrect":false,"explanation":""},{"id":"c","text":"Flexbox replaces Grid","isCorrect":false,"explanation":""},{"id":"d","text":"They are identical","isCorrect":false,"explanation":""}]',
          NULL,
          'Flexbox handles dynamic content in a single dimension; Grid handles complex, predefined layouts in two dimensions.',
          NULL,
          [],
          ARRAY['css','css-layout','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"css-1-css-q14","original_type":"multiple-choice","topic":"CSS Layout","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"CSS"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '8e55b8ce-fbe2-49d9-bdc3-6310daf88100',
          'What is CSS BEM?',
          'BEM (Block Element Modifier) is a naming convention: `.block`, `.block__element`, `.block__element--modifier` for maintainable, scoped CSS.',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'BEM reduces specificity conflicts, improves readability, and enables reusable, modular components.',
          NULL,
          [],
          ARRAY['css','css-methodologies','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"css-1-css-q15","original_type":"open-ended","topic":"CSS Methodologies","subcategory":"","sample_answers":["`.card`, `.card__title`, `.card__title--large` clearly shows hierarchy and state without deep nesting or high specificity.","BEM makes CSS predictable and scalable in large teams and projects."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"CSS"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '7bace3a5-9037-402b-965c-deafc9f6e6bd',
          'What are the benefits of using CSS sprites?',
          'CSS sprites combine multiple images into one to reduce HTTP requests, improving load performance (though less critical with HTTP/2).',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Sprites reduce network overhead by loading one image instead of many, especially useful for icon sets.',
          NULL,
          [],
          ARRAY['css','css-performance','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"css-1-css-q16","original_type":"open-ended","topic":"CSS Performance","subcategory":"","sample_answers":["Combine icons into one sprite image, then use `background-position` to show the correct part—reducing HTTP requests from 10 to 1.","With HTTP/2, sprites are less necessary, but still useful for hover states and reducing connection overhead."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"CSS"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '89eebb62-f8ea-41d5-b829-583fd19b1e7e',
          'What is tweening in CSS?',
          'Tweening (in-betweening) is generating intermediate frames between two states for smooth animations, achieved via CSS `@keyframes` and `animation`.',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'CSS animations automatically interpolate between keyframes to create fluid motion without JavaScript.',
          NULL,
          [],
          ARRAY['css','css-animations','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"css-1-css-q17","original_type":"open-ended","topic":"CSS Animations","subcategory":"","sample_answers":["`@keyframes slide { from { margin-left: 100%; } to { margin-left: 0; } }` creates smooth sliding via tweening.","Tweening is handled by the browser’s rendering engine—no manual frame calculation needed."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"CSS"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'ae533a19-9cbc-479d-a8b5-82939968f53c',
          'Explain the difference between `visibility: hidden;` and `display: none;`?',
          '`visibility: hidden` hides the element but preserves its space in the layout. `display: none` removes it from the layout flow entirely.',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"`visibility: hidden` preserves space; `display: none` removes from flow","isCorrect":true,"explanation":""},{"id":"b","text":"They are identical","isCorrect":false,"explanation":""},{"id":"c","text":"`display: none` preserves space","isCorrect":false,"explanation":""},{"id":"d","text":"`visibility: hidden` triggers reflow","isCorrect":false,"explanation":""}]',
          NULL,
          'Use `visibility: hidden` to hide but keep layout; use `display: none` to remove completely (triggers reflow).',
          NULL,
          [],
          ARRAY['css','css-box-model','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"css-1-css-q18","original_type":"multiple-choice","topic":"CSS Box Model","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"CSS"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'cca38096-1e2a-49f8-a3cf-f693d6e699b1',
          'What is the purpose of the `z-index` and how a stacking context is formed?',
          '`z-index` controls stack order of positioned elements. A stacking context is created by `position` (non-static), `opacity < 1`, `transform`, `z-index`, etc.',
          'multiple-choice',
          'advanced',
          8,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Elements with higher `z-index` appear on top, but only within their stacking context. Nested contexts are isolated.',
          NULL,
          [],
          ARRAY['css','css-positioning','advanced']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"css-1-css-q19","original_type":"open-ended","topic":"CSS Positioning","subcategory":"","sample_answers":["`z-index` only works on positioned elements (`relative`, `absolute`, etc.). A new stacking context is formed by `transform`, `opacity`, or `isolation: isolate`.","Child `z-index` values are relative to their parent’s stacking context, not the global stack."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"CSS"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'fdb39663-2275-4a93-b561-cbba5ff1319b',
          'Explain CSS position Property?',
          '`position` values: `static` (default), `relative` (offset from normal position), `absolute` (relative to nearest positioned ancestor), `fixed` (relative to viewport), `sticky` (hybrid of relative and fixed).',
          'multiple-choice',
          'intermediate',
          7,
          '[{"id":"a","text":"static, relative, absolute, fixed, sticky","isCorrect":true,"explanation":""},{"id":"b","text":"Only absolute and relative","isCorrect":false,"explanation":""},{"id":"c","text":"`fixed` is relative to parent","isCorrect":false,"explanation":""},{"id":"d","text":"`sticky` doesn’t require a threshold","isCorrect":false,"explanation":""}]',
          NULL,
          'Positioning controls how elements are placed in the document flow and relative to other elements or the viewport.',
          NULL,
          [],
          ARRAY['css','css-positioning','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"css-1-css-q20","original_type":"multiple-choice","topic":"CSS Positioning","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"CSS"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '0f4a94fe-9795-4d21-aa01-15b40ee8ef35',
          'List display property values in CSS?',
          'The `display` property controls how an element is rendered. Common values: `block`, `inline`, `inline-block`, `flex`, `grid`, `none`, `table`, etc.',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"`block`, `inline`, `inline-block`, `flex`, `grid`, `none`, `table`","isCorrect":true,"explanation":""},{"id":"b","text":"Only `block` and `inline`","isCorrect":false,"explanation":""},{"id":"c","text":"`display` has no effect on layout","isCorrect":false,"explanation":""},{"id":"d","text":"`display: hidden` is valid","isCorrect":false,"explanation":""}]',
          NULL,
          '`display` defines the outer and inner display type of an element, controlling layout behavior and flow.',
          NULL,
          [],
          ARRAY['css','display-property','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"css-16-80-css-q61","original_type":"multiple-choice","topic":"Display Property","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"CSS"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '90178bc4-b9af-4507-a4a9-86a581d6371a',
          'How is responsive design different from adaptive design?',
          'Responsive design uses fluid grids and media queries to adapt continuously. Adaptive design uses fixed layouts for specific breakpoints.',
          'multiple-choice',
          'intermediate',
          7,
          '[{"id":"a","text":"Responsive: fluid, continuous adaptation; Adaptive: fixed layouts at breakpoints","isCorrect":true,"explanation":""},{"id":"b","text":"They are identical","isCorrect":false,"explanation":""},{"id":"c","text":"Adaptive uses only percentages","isCorrect":false,"explanation":""},{"id":"d","text":"Responsive requires JavaScript","isCorrect":false,"explanation":""}]',
          NULL,
          'Responsive is fluid and flexible; adaptive serves predefined layouts based on device detection or viewport size.',
          NULL,
          [],
          ARRAY['css','responsive-design','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"css-16-80-css-q62","original_type":"multiple-choice","topic":"Responsive Design","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"CSS"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '8143f397-d6c6-4fd8-a1a8-3e4ec5b03caf',
          'What is retina graphics? How to handle images for retina screens?',
          'Retina displays have high pixel density. Use `srcset`, `picture`, or media queries to serve higher-resolution images conditionally.',
          'multiple-choice',
          'advanced',
          8,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Serving 2x images to high-DPR devices improves sharpness without bloating bandwidth for standard screens.',
          NULL,
          [],
          ARRAY['css','images','advanced']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"css-16-80-css-q63","original_type":"open-ended","topic":"Images","subcategory":"","sample_answers":["Use `<img src=\"image.jpg\" srcset=\"image@2x.jpg 2x\">` to let the browser choose the right image based on device pixel ratio.","For art direction, use the `<picture>` element with media queries to serve different crops or formats per viewport."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"CSS"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'd396476b-2633-467b-bd35-2a85fc095934',
          'Is there any reason to use translate() instead of absolute positioning?',
          'Yes. `translate()` triggers compositing (GPU) without reflow/repaint, making animations smoother. Absolute positioning triggers layout recalculations.',
          'true-false',
          'advanced',
          8,
          '[{"id":"true","text":"True","isCorrect":false},{"id":"false","text":"False","isCorrect":true}]',
          'false',
          '`transform: translate()` is compositor-only; `position: absolute` with `top/left` triggers layout, paint, and composite.',
          NULL,
          [],
          ARRAY['css','css-performance','advanced']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"css-16-80-css-q64","original_type":"true-false","topic":"CSS Performance","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"CSS"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '97bc9023-58b2-48e3-8e85-b528a930c00f',
          'Can the translate() function move an element on the z-axis?',
          'No. `translate()` is 2D. Use `translateZ()` or `translate3d()` for z-axis movement.',
          'true-false',
          'intermediate',
          5,
          '[{"id":"true","text":"True","isCorrect":false},{"id":"false","text":"False","isCorrect":true}]',
          'false',
          '`translate(x, y)` is shorthand for 2D. For 3D, use `translate3d(x, y, z)` or `translateZ(z)`.',
          NULL,
          [],
          ARRAY['css','css-transforms','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"css-16-80-css-q65","original_type":"true-false","topic":"CSS Transforms","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"CSS"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'affea5be-448e-4c42-98ef-fa2344e3d20e',
          'What is an At-Rule in CSS?',
          'At-rules (`@...`) instruct CSS on how to behave. Examples: `@media`, `@import`, `@font-face`, `@keyframes`.',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"`@media`, `@import`, `@font-face`, `@keyframes`","isCorrect":true,"explanation":""},{"id":"b","text":"At-rules are invalid in modern CSS","isCorrect":false,"explanation":""},{"id":"c","text":"`@rule` is the correct syntax","isCorrect":false,"explanation":""},{"id":"d","text":"Only `@media` is an at-rule","isCorrect":false,"explanation":""}]',
          NULL,
          'At-rules begin with `@` and define conditional or structural behavior in CSS.',
          NULL,
          [],
          ARRAY['css','css-fundamentals','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"css-16-80-css-q66","original_type":"multiple-choice","topic":"CSS Fundamentals","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"CSS"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'aaabe078-4ed1-4d22-bb1e-e17de2dedb15',
          'How can the gap under an image be removed?',
          'Images are inline by default, causing a gap for descenders. Fix with `display: block` or `vertical-align: top/bottom`.',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'The gap is reserved for text descenders (like ''g'', ''y''). Making the image block-level removes it.',
          NULL,
          [],
          ARRAY['css','css-box-model','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"css-16-80-css-q67","original_type":"open-ended","topic":"CSS Box Model","subcategory":"","sample_answers":["Set `img { display: block; }` to remove the gap caused by inline alignment.","Alternatively, use `img { vertical-align: top; }` to align the image to the top of the line box."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"CSS"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '792e5139-8c52-4611-900d-bcb420a38682',
          'What is progressive rendering?',
          'Progressive rendering improves perceived load time by displaying content as it becomes available (e.g., lazy loading, above-the-fold first).',
          'multiple-choice',
          'advanced',
          8,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'It prioritizes critical content to give users immediate feedback while non-critical assets load later.',
          NULL,
          [],
          ARRAY['css','css-performance','advanced']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"css-16-80-css-q68","original_type":"open-ended","topic":"CSS Performance","subcategory":"","sample_answers":["Techniques include lazy-loading images, inlining critical CSS, and flushing HTML early from the server.","Above-the-fold rendering sends only the visible portion of the page first, improving time-to-interactive."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"CSS"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'cb2cfffb-4fc8-4b37-8ecf-c90a1bf890bc',
          'What is mobile-first CSS? How does it differ from responsive design?',
          'Mobile-first is a responsive strategy that starts with base styles for mobile, then enhances for larger screens using `min-width` media queries.',
          'multiple-choice',
          'intermediate',
          7,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Mobile-first reduces unnecessary styles on mobile and improves performance by avoiding overrides.',
          NULL,
          [],
          ARRAY['css','responsive-design','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"css-16-80-css-q69","original_type":"open-ended","topic":"Responsive Design","subcategory":"","sample_answers":["Base styles apply to mobile; `@media (min-width: 768px) { ... }` adds desktop enhancements. This is more efficient than desktop-first with `max-width` overrides.","Mobile-first enforces content prioritization and results in cleaner, more maintainable CSS."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"CSS"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '83ff2ee3-e1ee-4dfa-809c-d6d84aaab832',
          'Which property changes the font face?',
          'The `font-family` property specifies the font face.',
          'multiple-choice',
          'beginner',
          4,
          '[{"id":"a","text":"`font-family`","isCorrect":true,"explanation":""},{"id":"b","text":"`font-face`","isCorrect":false,"explanation":""},{"id":"c","text":"`font-style`","isCorrect":false,"explanation":""},{"id":"d","text":"`font`","isCorrect":false,"explanation":""}]',
          NULL,
          '`font-family` defines a prioritized list of fonts, with fallbacks to system fonts.',
          NULL,
          [],
          ARRAY['css','css-typography','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"css-16-80-css-q70","original_type":"multiple-choice","topic":"CSS Typography","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"CSS"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'bc927775-89cc-4850-a7ca-b888707736c8',
          'Which property makes text italic or oblique?',
          'The `font-style` property makes text italic (`italic`) or oblique (`oblique`).',
          'multiple-choice',
          'beginner',
          4,
          '[{"id":"a","text":"`font-style`","isCorrect":true,"explanation":""},{"id":"b","text":"`font-variant`","isCorrect":false,"explanation":""},{"id":"c","text":"`text-transform`","isCorrect":false,"explanation":""},{"id":"d","text":"`font-weight`","isCorrect":false,"explanation":""}]',
          NULL,
          '`font-style: italic` uses true italic fonts; `oblique` slants the regular font.',
          NULL,
          [],
          ARRAY['css','css-typography','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"css-16-80-css-q71","original_type":"multiple-choice","topic":"CSS Typography","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"CSS"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '5bdd94ae-ea68-44f8-b6c9-83cca92a138d',
          'Which property creates a small-caps effect?',
          'The `font-variant` property with `small-caps` creates small capital letters.',
          'multiple-choice',
          'intermediate',
          5,
          '[{"id":"a","text":"`font-variant`","isCorrect":true,"explanation":""},{"id":"b","text":"`text-transform: capitalize`","isCorrect":false,"explanation":""},{"id":"c","text":"`font-style: small-caps`","isCorrect":false,"explanation":""},{"id":"d","text":"`text-variant`","isCorrect":false,"explanation":""}]',
          NULL,
          '`font-variant: small-caps` renders lowercase letters as smaller uppercase glyphs.',
          NULL,
          [],
          ARRAY['css','css-typography','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"css-16-80-css-q72","original_type":"multiple-choice","topic":"CSS Typography","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"CSS"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'df8aa218-1b02-4e12-8612-ca075325a402',
          'Which property controls font boldness?',
          'The `font-weight` property controls how bold or light a font appears (e.g., `normal`, `bold`, `400`, `700`).',
          'multiple-choice',
          'beginner',
          4,
          '[{"id":"a","text":"`font-weight`","isCorrect":true,"explanation":""},{"id":"b","text":"`font-style`","isCorrect":false,"explanation":""},{"id":"c","text":"`text-bold`","isCorrect":false,"explanation":""},{"id":"d","text":"`font-emphasis`","isCorrect":false,"explanation":""}]',
          NULL,
          'Values range from 100 (thin) to 900 (black); `normal` = 400, `bold` = 700.',
          NULL,
          [],
          ARRAY['css','css-typography','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"css-16-80-css-q73","original_type":"multiple-choice","topic":"CSS Typography","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"CSS"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '07e17640-a75e-4d05-a1cb-50017c80a092',
          'Which property adjusts space between letters?',
          'The `letter-spacing` property adds or subtracts space between characters.',
          'multiple-choice',
          'intermediate',
          5,
          '[{"id":"a","text":"`letter-spacing`","isCorrect":true,"explanation":""},{"id":"b","text":"`word-spacing`","isCorrect":false,"explanation":""},{"id":"c","text":"`text-spacing`","isCorrect":false,"explanation":""},{"id":"d","text":"`char-spacing`","isCorrect":false,"explanation":""}]',
          NULL,
          'Positive values increase spacing; negative values tighten it (use cautiously).',
          NULL,
          [],
          ARRAY['css','css-typography','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"css-16-80-css-q74","original_type":"multiple-choice","topic":"CSS Typography","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"CSS"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'a4546c6d-b60a-415a-9b5b-746150f9b905',
          'Which property adjusts space between words?',
          'The `word-spacing` property adds or subtracts space between words.',
          'multiple-choice',
          'intermediate',
          5,
          '[{"id":"a","text":"`word-spacing`","isCorrect":true,"explanation":""},{"id":"b","text":"`letter-spacing`","isCorrect":false,"explanation":""},{"id":"c","text":"`text-indent`","isCorrect":false,"explanation":""},{"id":"d","text":"`line-height`","isCorrect":false,"explanation":""}]',
          NULL,
          'Useful for adjusting readability in justified text or tight layouts.',
          NULL,
          [],
          ARRAY['css','css-typography','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"css-16-80-css-q75","original_type":"multiple-choice","topic":"CSS Typography","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"CSS"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '796281de-affe-4c7d-a819-5451bc3bbf72',
          'Which property indents the first line of a paragraph?',
          'The `text-indent` property indents the first line of text.',
          'multiple-choice',
          'beginner',
          4,
          '[{"id":"a","text":"`text-indent`","isCorrect":true,"explanation":""},{"id":"b","text":"`margin-left`","isCorrect":false,"explanation":""},{"id":"c","text":"`padding-left`","isCorrect":false,"explanation":""},{"id":"d","text":"`first-line-indent`","isCorrect":false,"explanation":""}]',
          NULL,
          'Commonly used in print-style layouts to indicate new paragraphs.',
          NULL,
          [],
          ARRAY['css','css-typography','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"css-16-80-css-q76","original_type":"multiple-choice","topic":"CSS Typography","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"CSS"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '0d56abcb-ce84-4c6d-9385-3f6b705018e2',
          'Which property aligns text?',
          'The `text-align` property aligns text horizontally (`left`, `right`, `center`, `justify`).',
          'multiple-choice',
          'beginner',
          4,
          '[{"id":"a","text":"`text-align`","isCorrect":true,"explanation":""},{"id":"b","text":"`align-text`","isCorrect":false,"explanation":""},{"id":"c","text":"`horizontal-align`","isCorrect":false,"explanation":""},{"id":"d","text":"`justify`","isCorrect":false,"explanation":""}]',
          NULL,
          'Applies to block-level elements; aligns inline content within the block.',
          NULL,
          [],
          ARRAY['css','css-typography','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"css-16-80-css-q77","original_type":"multiple-choice","topic":"CSS Typography","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"CSS"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '4cbad365-264a-4406-a393-0ade53e70f6a',
          'Which property underlines, overlines, or strikes through text?',
          'The `text-decoration` property controls underline, overline, line-through, and blink effects.',
          'multiple-choice',
          'intermediate',
          5,
          '[{"id":"a","text":"`text-decoration`","isCorrect":true,"explanation":""},{"id":"b","text":"`font-decoration`","isCorrect":false,"explanation":""},{"id":"c","text":"`text-style`","isCorrect":false,"explanation":""},{"id":"d","text":"`underline`","isCorrect":false,"explanation":""}]',
          NULL,
          'Modern syntax allows control over style, color, and thickness of the decoration line.',
          NULL,
          [],
          ARRAY['css','css-typography','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"css-16-80-css-q78","original_type":"multiple-choice","topic":"CSS Typography","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"CSS"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'fc073c90-6db7-4d87-b816-4d2c4ed08973',
          'Which property capitalizes or changes text case?',
          'The `text-transform` property converts text to uppercase, lowercase, or capitalized form.',
          'multiple-choice',
          'intermediate',
          5,
          '[{"id":"a","text":"`text-transform`","isCorrect":true,"explanation":""},{"id":"b","text":"`font-case`","isCorrect":false,"explanation":""},{"id":"c","text":"`text-case`","isCorrect":false,"explanation":""},{"id":"d","text":"`transform-text`","isCorrect":false,"explanation":""}]',
          NULL,
          'Useful for ensuring consistent casing without changing HTML content.',
          NULL,
          [],
          ARRAY['css','css-typography','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"css-16-80-css-q79","original_type":"multiple-choice","topic":"CSS Typography","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"CSS"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '2f5b84ea-dd43-44fc-bb48-c85925cfecb8',
          'Which property controls list marker appearance?',
          'The `list-style-type` property sets the marker shape for list items (e.g., `disc`, `circle`, `square`, `decimal`).',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"`list-style-type`","isCorrect":true,"explanation":""},{"id":"b","text":"`marker-type`","isCorrect":false,"explanation":""},{"id":"c","text":"`list-marker`","isCorrect":false,"explanation":""},{"id":"d","text":"`bullet-style`","isCorrect":false,"explanation":""}]',
          NULL,
          'Also supports custom images via `list-style-image` and position via `list-style-position`.',
          NULL,
          [],
          ARRAY['css','lists','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"css-16-80-css-q80","original_type":"multiple-choice","topic":"Lists","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"CSS"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'cf04fa57-9747-4634-a433-48d2590d8715',
          'What are CSS counters?',
          'CSS counters automatically number elements (e.g., sections, list items) using `counter-reset`, `counter-increment`, and `content` with `counter()`.',
          'multiple-choice',
          'intermediate',
          7,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Counters let you auto-number content without JavaScript—ideal for outlines, legal documents, or nested lists.',
          NULL,
          [],
          ARRAY['css','css-selectors','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"css-41-60-css-q41","original_type":"open-ended","topic":"CSS Selectors","subcategory":"","sample_answers":["Use `counter-reset: section;` on a parent, then `counter-increment: section;` and `content: ''Section '' counter(section);` in `::before` to auto-number headings.","CSS counters are perfect for creating dynamic numbering in documentation or multi-level lists without manual updates."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"CSS"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '41bd7a4b-5771-4d3f-befc-799c9ae02bbe',
          'How do you specify units in CSS? What are the different types?',
          'CSS units include absolute (px, pt, cm) and relative (em, rem, %, vw, vh) units for defining lengths, sizes, and spacing.',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"Absolute: px, pt, cm; Relative: em, rem, %, vw, vh","isCorrect":true,"explanation":""},{"id":"b","text":"Only pixels are valid","isCorrect":false,"explanation":""},{"id":"c","text":"`em` is absolute; `px` is relative","isCorrect":false,"explanation":""},{"id":"d","text":"All units behave the same across devices","isCorrect":false,"explanation":""}]',
          NULL,
          'Relative units scale with context (e.g., `em` with font-size, `vw` with viewport width); absolute units are fixed.',
          NULL,
          [],
          ARRAY['css','css-fundamentals','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"css-41-60-css-q42","original_type":"multiple-choice","topic":"CSS Fundamentals","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"CSS"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '56bbca1c-c071-477b-941e-3ccc7259ab96',
          'Which unit would you prefer among px, em, %, or rem and why?',
          '`px` gives precise control; `em` is relative to parent font-size; `%` is relative to parent size; `rem` is relative to root font-size and avoids compounding.',
          'multiple-choice',
          'intermediate',
          7,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          '`rem` is preferred for scalability and accessibility; `px` for fixed sizes; avoid `em` for layout due to compounding.',
          NULL,
          [],
          ARRAY['css','css-fundamentals','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"css-41-60-css-q43","original_type":"open-ended","topic":"CSS Fundamentals","subcategory":"","sample_answers":["`rem` is best for consistent scaling (relative to root font-size). `px` is fine for borders or fixed elements. Avoid `em` in layout to prevent nesting issues.","Use `%` for fluid containers, `vw`/`vh` for full-viewport elements, and `rem` for typography and spacing."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"CSS"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );;