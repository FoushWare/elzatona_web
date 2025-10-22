-- Batch 2: Questions 11-20
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES
('65b4a3e8-f389-484b-9573-aaa8e54ff1e4', 'What is the difference between state and props?', '### State
- Managed within a component
- Mutable
- Local to the component
- Updated with setState/useState

### Props
- Passed from parent component
- Read-only
- Used to configure child components
- Cannot be modified by the child

### Summary Table
| Feature   | State                               | Props                             |
|-----------|-------------------------------------|-----------------------------------|
| Managed by| The component itself                | Parent component                  |
| Mutable   | Yes                                 | No (read-only)                    |
| Scope     | Local to the component              | Passed from parent to child       |
| Usage     | Manage dynamic data and UI changes  | Configure and customize component |
| Update    | Using setState/useState             | Cannot be updated by the component|', 'multiple-choice', 'beginner', 3, '[{"id":"a","text":"State is immutable; props are mutable","isCorrect":false},{"id":"b","text":"State is managed internally and mutable; props are passed from parent and read-only","isCorrect":true},{"id":"c","text":"Props can be changed with this.setProps()","isCorrect":false},{"id":"d","text":"State and props are the same thing","isCorrect":false}]', NULL, 'State is mutable and managed internally; props are immutable and passed from parents.', NULL, ARRAY[], ARRAY['react','state','props','data-flow','immutability'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-011","original_type":"multiple-choice","topic":"State","subcategory":"Core Concepts","sample_answers":[],"time_limit":150,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"ed11a4a3-b4e1-4d70-b69e-4b63e01576c2"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('0bf552f6-4ff3-40da-9479-3d09ad7910ec', 'What is the difference between HTML and React event handling?', 'Below are some of the main differences between HTML and React event handling,
1. In HTML, the event name usually represents in _lowercase_ as a convention:
   ```html
   <button onclick="activateLasers()"></button>
   ```
   Whereas in React it follows _camelCase_ convention:
   ```jsx harmony
   <button onClick={activateLasers}>
   ```
2. In HTML, you can return `false` to prevent default behavior:
   ```html
   <a
     href="#"
     onclick=''console.log("The link was clicked."); return false;''
   />
   ```
   Whereas in React you must call `preventDefault()` explicitly:
   ```javascript
   function handleClick(event) {
     event.preventDefault();
     console.log("The link was clicked.");
   }
   ```
3. In HTML, you need to invoke the function by appending `()`
   Whereas in react you should not append `()` with the function name.', 'multiple-choice', 'beginner', 3, '[{"id":"a","text":"React uses lowercase event names like HTML","isCorrect":false},{"id":"b","text":"React uses camelCase, requires explicit preventDefault(), and passes function references","isCorrect":true},{"id":"c","text":"React uses strings for event handlers like HTML","isCorrect":false},{"id":"d","text":"React doesn''t support event handling","isCorrect":false}]', NULL, 'React uses camelCase for event names, requires explicit preventDefault(), and passes function references (not strings).', NULL, ARRAY[], ARRAY['react','events','event-handling','camelcase','preventdefault'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-012","original_type":"multiple-choice","topic":"Event Handling","subcategory":"Events","sample_answers":[],"time_limit":150,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"2a5901fd-e2ca-4fe3-a914-447622008d02"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('7762ebe6-9f62-4a5d-8621-a47f8e3f371f', 'What are synthetic events in React?', '`SyntheticEvent` is a cross-browser wrapper around the browser''s native event. Its API is same as the browser''s native event, including `stopPropagation()` and `preventDefault()`, except the events work identically across all browsers. The native events can be accessed directly from synthetic events using `nativeEvent` attribute.

Let''s take an example of `BookStore` title search component with the ability to get all native event properties

```js
function BookStore() {
  function handleTitleChange(e) {
    console.log("The new title is:", e.target.value);
    console.log(''Synthetic event:'', e); // React SyntheticEvent
    console.log(''Native event:'', e.nativeEvent); // Browser native event
    e.stopPropagation();
    e.preventDefault();
  }
  return <input name="title" onChange={handleTitleChange} />;
}
```', 'multiple-choice', 'intermediate', 3, '[{"id":"a","text":"Native browser events","isCorrect":false},{"id":"b","text":"React''s cross-browser wrapper around native events","isCorrect":true},{"id":"c","text":"Custom events created with Event constructor","isCorrect":false},{"id":"d","text":"Events that only work in development mode","isCorrect":false}]', NULL, 'SyntheticEvent is a React wrapper around native browser events, providing consistent API across browsers.', NULL, ARRAY[], ARRAY['react','synthetic-event','events','cross-browser'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-013","original_type":"multiple-choice","topic":"Event Handling","subcategory":"Events","sample_answers":[],"time_limit":180,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"2a5901fd-e2ca-4fe3-a914-447622008d02"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('f8eaf250-4bf3-4b63-860e-327da6c22e20', 'What are inline conditional expressions?', 'You can use either _if statements_ or _ternary expressions_ which are available in JS(and JSX in React) to conditionally execute or render expressions. Apart from these approaches, you can also embed any expressions in JSX by wrapping them in curly braces and then followed by JS logical operator `&&`. It is helpful to render elements conditionally within a single line and commonly used for concise logic, especially in JSX rendering.

```jsx harmony
<h1>Hello!</h1>;
{
  messages.length > 0 && !isLogin ? (
    <h2>You have {messages.length} unread messages.</h2>
  ) : (
    <h2>You don''t have unread messages.</h2>
  );
}
```', 'multiple-choice', 'beginner', 2, '[{"id":"a","text":"Only if/else blocks outside JSX","isCorrect":false},{"id":"b","text":"Ternary operators and && expressions inside JSX","isCorrect":true},{"id":"c","text":"Switch statements only","isCorrect":false},{"id":"d","text":"No conditional rendering in React","isCorrect":false}]', NULL, 'React supports ternary operators and && for inline conditional rendering in JSX.', NULL, ARRAY[], ARRAY['react','conditional-rendering','ternary','logical-and','jsx'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-014","original_type":"multiple-choice","topic":"Conditional Rendering","subcategory":"Rendering","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('9b68fb48-28df-4c86-81c2-2af42e0ec2ce', 'What is the "key" prop and what is its benefit when used in arrays of elements?', 'A `key` is a special attribute you **should** include when mapping over arrays to render data. _Key_ prop helps React identify which items have changed, are added, or are removed.

Keys should be unique among its siblings. Most often we use ID from our data as _key_:
```jsx harmony
const todoItems = todos.map((todo) => <li key={todo.id}>{todo.text}</li>);
```

**Benefits of key:**
  *   Enables React to **efficiently update and re-render** components.
  *   Prevents unnecessary re-renders by **reusing** components when possible.
  *   Helps **maintain internal state** of list items correctly.', 'multiple-choice', 'intermediate', 4, '[{"id":"a","text":"Keys are only for styling","isCorrect":false},{"id":"b","text":"Keys help React identify changes in lists for efficient updates and state preservation","isCorrect":true},{"id":"c","text":"Keys must be globally unique across the entire app","isCorrect":false},{"id":"d","text":"Keys are optional and have no performance impact","isCorrect":false}]', NULL, 'Keys help React identify which list items have changed, been added, or removed, enabling efficient updates and correct state management.', NULL, ARRAY[], ARRAY['react','key','lists','rendering','performance'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-015","original_type":"multiple-choice","topic":"Lists and Keys","subcategory":"Lists","sample_answers":[],"time_limit":180,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"540c20e9-c800-48de-9185-e611c10d37d5"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('ab6517c0-8591-4ccb-8f49-3c80fd38fed0', 'What is Virtual DOM?', 'The _Virtual DOM_ (VDOM) is a lightweight, in-memory representation of _Real DOM_ used by libraries like React to optimize UI rendering. The representation of a UI is kept in memory and synced with the "real" DOM. It''s a step that happens between the render function being called and the displaying of elements on the screen. This entire process is called _reconciliation_.', 'multiple-choice', 'beginner', 2, '[{"id":"a","text":"A real browser DOM node","isCorrect":false},{"id":"b","text":"An in-memory representation of the real DOM for efficient updates","isCorrect":true},{"id":"c","text":"A CSS rendering engine","isCorrect":false},{"id":"d","text":"A database for storing component state","isCorrect":false}]', NULL, 'Virtual DOM is an in-memory representation of the real DOM that enables efficient diffing and minimal updates.', NULL, ARRAY[], ARRAY['react','virtual-dom','reconciliation','performance'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-016","original_type":"multiple-choice","topic":"Virtual DOM","subcategory":"Architecture","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"0ee220a5-c50b-4c32-afc5-a654931c9fcd"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('b92c9095-f905-46c9-9315-7035067e988e', 'How does the Virtual DOM work?', 'The _Virtual DOM_ works in five simple steps.
**1. Initial Render**  
When a UI component renders for the first time, it returns JSX. React uses this structure to create a Virtual DOM tree.
**2. State or Props Change**  
When the component''s state or props change, React creates a new Virtual DOM.
**3. Diffing Algorithm**  
React compares the new Virtual DOM with the previous one.
**4. Reconciliation**  
Based on the diffing results, React decides which parts of the Real DOM should be updated.
**5. Efficient DOM Updates**  
This process makes UI rendering much faster and more efficient.', 'multiple-choice', 'intermediate', 4, '[{"id":"a","text":"It replaces the entire real DOM on every change","isCorrect":false},{"id":"b","text":"It creates a new Virtual DOM, diffs it with the old one, and updates only changed real DOM nodes","isCorrect":true},{"id":"c","text":"It uses direct DOM manipulation without any abstraction","isCorrect":false},{"id":"d","text":"It only works in development mode","isCorrect":false}]', NULL, 'React creates a new Virtual DOM on state change, diffs it with the previous one, and updates only the changed parts of the real DOM.', NULL, ARRAY[], ARRAY['react','virtual-dom','diffing','reconciliation','performance'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-017","original_type":"multiple-choice","topic":"Virtual DOM","subcategory":"Architecture","sample_answers":[],"time_limit":240,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"0ee220a5-c50b-4c32-afc5-a654931c9fcd"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('5c3dd7ce-70fe-45f3-a053-1f9d239ec761', 'What is the difference between Shadow DOM and Virtual DOM?', 'The _Shadow DOM_ is a browser technology designed primarily for scoping variables and CSS in _web components_. The _Virtual DOM_ is a concept implemented by libraries in JavaScript on top of browser APIs.

| Feature | Shadow DOM | Virtual DOM |
| --- | --- | --- |
| Purpose | Encapsulation for Web Components | Efficient UI rendering |
| Managed by | Browser | JS frameworks (e.g., React) |
| DOM Type | Part of real DOM (scoped) | In-memory representation |
| Encapsulation | Yes | No |
| Use Case | Web Components, scoped styling | UI diffing and minimal DOM updates |', 'multiple-choice', 'intermediate', 3, '[{"id":"a","text":"They are the same thing","isCorrect":false},{"id":"b","text":"Shadow DOM is for Web Components encapsulation; Virtual DOM is for React''s efficient rendering","isCorrect":true},{"id":"c","text":"Virtual DOM is part of the browser; Shadow DOM is a React feature","isCorrect":false},{"id":"d","text":"Both are managed by the browser","isCorrect":false}]', NULL, 'Shadow DOM is a browser feature for encapsulation in Web Components; Virtual DOM is a React concept for efficient rendering.', NULL, ARRAY[], ARRAY['react','shadow-dom','virtual-dom','web-components','encapsulation'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-018","original_type":"multiple-choice","topic":"Virtual DOM","subcategory":"Architecture","sample_answers":[],"time_limit":180,"related_links":[],"created_by":"system","updated_by":"system","topic_id":"0ee220a5-c50b-4c32-afc5-a654931c9fcd"}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('5a81e90c-a1d0-4d71-9c4f-648d6650cb9a', 'What is React Fiber?', '**React Fiber** is the **new reconciliation engine** in React, introduced in React 16. It''s a complete rewrite of React''s core algorithm(old stack-based algorithm) for rendering and updating the UI. Fiber enhances React''s ability to handle **asynchronous rendering**, **prioritized updates**(assign priority to different types of updates), and **interruption**(ability to pause, abort, or reuse work) of rendering work, enabling smoother and more responsive user interfaces.', 'multiple-choice', 'advanced', 5, '[{"id":"a","text":"A new CSS-in-JS library","isCorrect":false},{"id":"b","text":"React''s new reconciliation engine for async rendering and prioritization","isCorrect":true},{"id":"c","text":"A state management library like Redux","isCorrect":false},{"id":"d","text":"A testing utility","isCorrect":false}]', NULL, 'React Fiber is the new reconciliation engine in React 16+ that enables async rendering, prioritization, and interruption for better performance.', NULL, ARRAY[], ARRAY['react','fiber','reconciliation','concurrent-mode','async-rendering'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-019","original_type":"multiple-choice","topic":"React Fiber","subcategory":"Advanced","sample_answers":[],"time_limit":300,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('79d2b9cd-9f80-4a9e-ae99-7ae339e2a67d', 'What is the main goal of React Fiber?', 'The goal of _React Fiber_ is to increase its suitability for areas like animation, layout, and gestures. Its headline feature is **incremental rendering**: the ability to split rendering work into chunks and spread it out over multiple frames.

Its main goals are:
*   **Incremental Rendering** – Breaks work into chunks for smoother updates.
*   **Interruptible Rendering** – Pauses and resumes rendering to keep the UI responsive.
*   **Prioritization** – Handles high-priority updates before low-priority ones.
*   **Concurrency Support** – Enables working on multiple UI versions simultaneously.', 'multiple-choice', 'advanced', 5, '[{"id":"a","text":"To replace JSX with templates","isCorrect":false},{"id":"b","text":"To enable incremental, interruptible, and prioritized rendering","isCorrect":true},{"id":"c","text":"To remove the need for components","isCorrect":false},{"id":"d","text":"To make React work only on the server","isCorrect":false}]', NULL, 'React Fiber''s main goal is incremental rendering to enable smoother UIs by breaking work into chunks and prioritizing updates.', NULL, ARRAY[], ARRAY['react','fiber','incremental-rendering','concurrency','performance'], '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}', '{"original_id":"react-q-020","original_type":"multiple-choice","topic":"React Fiber","subcategory":"Advanced","sample_answers":[],"time_limit":300,"related_links":[],"created_by":"system","updated_by":"system","topic_id":null}', 'ca612436-af48-4e3f-a7fd-f9a9b2c52374', true, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z');
