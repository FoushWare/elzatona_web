-- Batch 4: Questions 31-40
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES
('e2e49ca5-215f-4ba8-a2af-2340776f5331', 'What are Fragments?', 'It''s a common pattern or practice in React for a component to return multiple elements. _Fragments_ let you group a list of children without adding extra nodes to the DOM.
You need to use either `<Fragment>` or a shorter syntax having empty tag (`<></>`).
Below is the example of how to use fragment inside _Story_ component.
```jsx harmony
function Story({ title, description, date }) {
  return (
    <Fragment>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>{date}</p>
    </Fragment>
  );
}
```
It is also possible to render list of fragments inside a loop with the mandatory **key** attribute supplied.
```jsx harmony
function StoryBook() {
  return stories.map((story) => (
    <Fragment key={story.id}>
      <h2>{story.title}</h2>
      <p>{story.description}</p>
      <p>{story.date}</p>
    </Fragment>
  ));
}
```
Usually, you don''t need to use `<Fragment>` until there is a need of _key_ attribute. The usage of shorter syntax looks like below.
```jsx harmony
function Story({ title, description, date }) {
  return (
    <>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>{date}</p>
    </>
  );
}
```', 'multiple-choice', 'beginner', 2, '[{"id":"a","text":"Special components that render nothing","isCorrect":false},{"id":"b","text":"A way to group multiple elements without adding extra DOM nodes","isCorrect":true},{"id":"c","text":"Components that only render on mobile","isCorrect":false},{"id":"d","text":"A type of React error boundary","isCorrect":false}]', NULL, 'Fragments allow grouping multiple elements without adding extra DOM nodes, improving performance and avoiding layout issues.', NULL, ARRAY[]::text[], ARRAY['react','fragments','jsx','rendering','dom'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-031","original_type":"multiple-choice","topic":"Fragments","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('eff9aa29-dc4b-4b5f-b4de-5b4b239400bd', 'Why are Fragments better than container divs?', 'Below are the list of reasons to prefer fragments over container DOM elements,
1. Fragments are a bit faster and use less memory by not creating an extra DOM node. This only has a real benefit on very large and deep trees.
2. Some CSS mechanisms like _Flexbox_ and _CSS Grid_ have a special parent-child relationships, and adding divs in the middle makes it hard to keep the desired layout.
3. The DOM Inspector is less cluttered.', 'multiple-choice', 'intermediate', 3, '[{"id":"a","text":"They are slower but easier to debug","isCorrect":false},{"id":"b","text":"They prevent CSS layout issues, improve performance, and reduce DOM clutter","isCorrect":true},{"id":"c","text":"They automatically apply styles","isCorrect":false},{"id":"d","text":"They are required for server-side rendering","isCorrect":false}]', NULL, 'Fragments avoid unnecessary DOM nodes, which improves performance, preserves CSS layout (e.g., Flexbox/Grid), and reduces DOM clutter.', NULL, ARRAY[]::text[], ARRAY['react','fragments','performance','css','layout'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-032","original_type":"multiple-choice","topic":"Fragments","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('fbf66136-a9be-4a91-8940-a2611c2737d9', 'What are portals in React?', 'A Portal is a React feature that enables rendering children into a DOM node that exists outside the parent component''s DOM hierarchy, while still preserving the React component hierarchy. Portals help avoid CSS stacking issues—for example, elements with position: fixed may not behave as expected inside a parent with transform. Portals solve this by rendering content (like modals or tooltips) outside such constrained DOM contexts.
```javascript
ReactDOM.createPortal(child, container);
```
*   `child`: Any valid React node (e.g., JSX, string, fragment).
*   `container`: A real DOM node (e.g., `document.getElementById(''modal-root'')`).
Even though the content renders elsewhere in the DOM, it still behaves like a normal child in React. It has access to context, state, and event handling.

**Example:- Modal:**
```jsx
function Modal({ children }) {
  return ReactDOM.createPortal(
    <div className="modal">{children}</div>,
    document.body)
  );
}
```
The above code will render the modal content into the body element in the HTML, not inside the component''s usual location.', 'multiple-choice', 'intermediate', 4, '[{"id":"a","text":"A way to share state between unrelated components","isCorrect":false},{"id":"b","text":"A feature to render children into a different DOM node while preserving React behavior","isCorrect":true},{"id":"c","text":"A method to lazy-load components","isCorrect":false},{"id":"d","text":"An alternative to React Context","isCorrect":false}]', NULL, 'Portals render React children into a DOM node outside the parent hierarchy (e.g., modals into `document.body`), while maintaining React context and event handling.', NULL, ARRAY[]::text[], ARRAY['react','portals','modals','dom','rendering'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-033","original_type":"multiple-choice","topic":"Portals","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('8650929c-0934-4ea9-95e6-87e173a0a21f', 'What are stateless components?', 'If the behaviour of a component is independent of its state then it can be a stateless component. You can use either a function or a class for creating stateless components. But unless you need to use a lifecycle hook in your components, you should go for function components. There are a lot of benefits if you decide to use function components here; they are easy to write, understand, and test, a little faster, and you can avoid the `this` keyword altogether.', 'multiple-choice', 'beginner', 2, '[{"id":"a","text":"Components that cannot receive props","isCorrect":false},{"id":"b","text":"Components that don’t manage internal state and render based only on props","isCorrect":true},{"id":"c","text":"Components that are always class-based","isCorrect":false},{"id":"d","text":"Components that throw errors","isCorrect":false}]', NULL, 'Stateless components (now called functional components) don’t manage internal state and are typically pure functions that render based on props.', NULL, ARRAY[]::text[], ARRAY['react','stateless','function-components','components'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-034","original_type":"multiple-choice","topic":"Components","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"759ee497-71fd-4347-9018-c9d62ba7470f"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('102de2ee-1d6f-4065-822c-13baae58e438', 'What are stateful components?', 'If the behaviour of a component is dependent on the _state_ of the component then it can be termed as stateful component. These _stateful components_ are either function components with hooks or _class components_.

Let''s take an example of function stateful component which update the state based on click event,
```javascript
import React, {useState} from ''react'';
const App = (props) => {
const [count, setCount] = useState(0);
handleIncrement() {
  setCount(count+1);
}
return (
  <>
    <button onClick={handleIncrement}>Increment</button>
    <span>Counter: {count}</span>
  </>
  )
}
```', 'multiple-choice', 'beginner', 2, '[{"id":"a","text":"Components that never re-render","isCorrect":false},{"id":"b","text":"Components that manage internal state and re-render when it changes","isCorrect":true},{"id":"c","text":"Components that only accept static props","isCorrect":false},{"id":"d","text":"Components that are deprecated","isCorrect":false}]', NULL, 'Stateful components manage internal state using `useState` (function) or `this.state` (class), and re-render when state changes.', NULL, ARRAY[]::text[], ARRAY['react','stateful','state','hooks','class-components'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-035","original_type":"multiple-choice","topic":"State","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"ed11a4a3-b4e1-4d70-b69e-4b63e01576c2"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('c9f3fdfd-cd0f-452a-87b0-6bcb58a5d918', 'How to apply validation to props in React?', 'When the application is running in _development mode_, React will automatically check all props that we set on components to make sure they have _correct type_. If the type is incorrect, React will generate warning messages in the console. It''s disabled in _production mode_ due to performance impact. The mandatory props are defined with `isRequired`.

The set of predefined prop types:
1. `PropTypes.number`
2. `PropTypes.string`
3. `PropTypes.array`
4. `PropTypes.object`
5. `PropTypes.func`
6. `PropTypes.node`
7. `PropTypes.element`
8. `PropTypes.bool`
9. `PropTypes.symbol`
10. `PropTypes.any`

We can define `propTypes` for `User` component as below:
```jsx harmony
import React from "react";
import PropTypes from "prop-types";
class User extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
  };
  render() {
    return (
      <>
        <h1>{`Welcome, ${this.props.name}`}</h1>
        <h2>{`Age, ${this.props.age}`}</h2>
      </>
    );
  }
}
```', 'multiple-choice', 'intermediate', 3, '[{"id":"a","text":"Use `PropTypes` from the `prop-types` package to define expected prop types and required props","isCorrect":true},{"id":"b","text":"PropTypes work in production mode for security","isCorrect":false},{"id":"c","text":"Validation is automatic and cannot be customized","isCorrect":false},{"id":"d","text":"PropTypes are built into React since v16","isCorrect":false}]', NULL, 'PropTypes validate prop types in development mode, helping catch bugs early. Required props use `.isRequired`.', NULL, ARRAY[]::text[], ARRAY['react','proptypes','validation','type-checking','development'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-036","original_type":"multiple-choice","topic":"Props","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"accaeeab-e45f-4999-a647-4e5126bcd487"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('3ae22e40-9bc8-46f5-aa1f-e896f6d52a62', 'What are the advantages of React?', 'Below are the list of main advantages of React,
1. Increases the application''s performance with _Virtual DOM_.
2. JSX makes code easy to read and write.
3. It renders both on client and server side (_SSR_).
4. Easy to integrate with frameworks (Angular, Backbone) since it is only a view library.
5. Easy to write unit and integration tests with tools such as Jest.', 'multiple-choice', 'beginner', 2, '[{"id":"a","text":"Virtual DOM, JSX, SSR, easy integration, and testability","isCorrect":true},{"id":"b","text":"Two-way data binding and full framework features","isCorrect":false},{"id":"c","text":"Built-in state management and routing","isCorrect":false},{"id":"d","text":"No learning curve for beginners","isCorrect":false}]', NULL, 'React’s key advantages include Virtual DOM for performance, JSX for readability, SSR support, framework agnosticism, and testability.', NULL, ARRAY[]::text[], ARRAY['react','advantages','virtual-dom','jsx','ssr'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-037","original_type":"multiple-choice","topic":"React Basics","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"eee69693-8312-4cb1-8bf7-f2c962aae105"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('02bcf3eb-117c-4afd-a9ce-39bdd4d7e010', 'What are the limitations of React?', 'Apart from the advantages, there are few limitations of React too,
1. React is just a view library, not a full framework.
2. There is a learning curve for beginners who are new to web development.
3. Integrating React into a traditional MVC framework requires some additional configuration.
4. The code complexity increases with inline templating and JSX.
5. Too many smaller components leading to over engineering or boilerplate.', 'multiple-choice', 'beginner', 2, '[{"id":"a","text":"It’s a full framework with built-in routing and state management","isCorrect":false},{"id":"b","text":"It’s just a view library, has a learning curve, and can create boilerplate","isCorrect":true},{"id":"c","text":"It doesn’t support server-side rendering","isCorrect":false},{"id":"d","text":"It’s slower than vanilla JS","isCorrect":false}]', NULL, 'React is only a view library, has a learning curve, requires extra setup for full apps, and can lead to boilerplate with many small components.', NULL, ARRAY[]::text[], ARRAY['react','limitations','view-library','jsx','boilerplate'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-038","original_type":"multiple-choice","topic":"React Basics","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"eee69693-8312-4cb1-8bf7-f2c962aae105"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('4d5d2d08-552e-4b49-b9ab-99abe1736afe', 'What are the recommended ways for static type checking?', 'Normally we use _PropTypes library_ (`React.PropTypes` moved to a `prop-types` package since React v15.5) for _type checking_ in the React applications. For large code bases, it is recommended to use _static type checkers_ such as Flow or TypeScript, that perform type checking at compile time and provide auto-completion features.', 'multiple-choice', 'intermediate', 3, '[{"id":"a","text":"PropTypes for small apps; TypeScript/Flow for large codebases","isCorrect":true},{"id":"b","text":"Only PropTypes should be used","isCorrect":false},{"id":"c","text":"TypeScript is not compatible with React","isCorrect":false},{"id":"d","text":"Static typing is unnecessary in React","isCorrect":false}]', NULL, 'For small apps, PropTypes suffice; for large codebases, use TypeScript or Flow for compile-time type safety and better tooling.', NULL, ARRAY[]::text[], ARRAY['react','typescript','flow','proptypes','type-checking'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-039","original_type":"multiple-choice","topic":"TypeScript","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('308b2705-d4f7-4584-aad2-3d5bc0214b3f', 'What is the use of the react-dom package?', 'The `react-dom` package provides _DOM-specific methods_ that can be used at the top level of your app. Most of the components are not required to use this module. Some of the methods of this package are:
1. `render()`
2. `hydrate()`
3. `unmountComponentAtNode()`
4. `findDOMNode()`
5. `createPortal()`', 'multiple-choice', 'beginner', 2, '[{"id":"a","text":"It contains React’s core logic like useState and useEffect","isCorrect":false},{"id":"b","text":"It provides DOM-specific methods like render(), hydrate(), and createPortal()","isCorrect":true},{"id":"c","text":"It’s used for server-side logic only","isCorrect":false},{"id":"d","text":"It’s deprecated in React 18","isCorrect":false}]', NULL, '`react-dom` provides methods to interact with the browser DOM, such as `render`, `hydrate`, and `createPortal`.', NULL, ARRAY[]::text[], ARRAY['react','react-dom','dom','render','hydrate'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-040","original_type":"multiple-choice","topic":"React DOM","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z');
