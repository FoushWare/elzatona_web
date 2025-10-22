INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '5bc0f138-e636-4c04-8b31-343b8b8c1986',
      'Inheritance with Prototype',
      'In the SuperDog example, how does SuperDog gain access to bark() from Dog?',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"Through Object.assign copying methods","isCorrect":false,"explanation":""},{"id":"b","text":"By extending Dog, SuperDog.prototype.__proto__ points to Dog.prototype","isCorrect":true,"explanation":""},{"id":"c","text":"Each SuperDog has its own bark() copy","isCorrect":false,"explanation":""},{"id":"d","text":"By redefining bark in the constructor","isCorrect":false,"explanation":""}]',
      'c',
      'The correct answer is: By extending Dog, SuperDog.prototype.__proto__ points to Dog.prototype',
      ARRAY[]::text[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-prototype-pattern-61","original_type":"multiple-choice","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.692Z',
      '2025-10-21T22:21:12.692Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '3006fba4-5843-4649-b04f-1d6ec29e2d48',
      'Object.create Use Case',
      'What does Object.create allow you to do?',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'It creates a new object with its prototype explicitly set to the provided object. This lets you directly inherit properties without using classes or constructors.',
      ARRAY[]::text[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-prototype-pattern-62","original_type":"open-ended","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.692Z',
      '2025-10-21T22:21:12.692Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'a3fb7439-302b-4ef8-9124-964079c925f5',
      'Prototype Pattern Advantages',
      'What are two main advantages of the Prototype Pattern?',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'It reduces memory usage by sharing methods across instances. It allows dynamic extension of behavior by modifying the prototype.',
      ARRAY[]::text[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-prototype-pattern-63","original_type":"open-ended","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.692Z',
      '2025-10-21T22:21:12.692Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '50243f54-4d63-4f10-95b2-19cc5e8f0cee',
      'Prototype Pitfalls',
      'Which of the following can be a downside of relying too heavily on prototype chaining?',
      'multiple-choice',
      'advanced',
      10,
      '[{"id":"a","text":"Deep prototype chains can make debugging difficult and slow property lookups","isCorrect":true,"explanation":""},{"id":"b","text":"It prevents dynamic property addition","isCorrect":false,"explanation":""},{"id":"c","text":"It increases memory usage","isCorrect":false,"explanation":""},{"id":"d","text":"It makes objects immutable","isCorrect":false,"explanation":""}]',
      'c',
      'The correct answer is: Deep prototype chains can make debugging difficult and slow property lookups',
      ARRAY[]::text[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','advanced']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-prototype-pattern-64","original_type":"multiple-choice","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.692Z',
      '2025-10-21T22:21:12.692Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '605c505d-62f6-4222-a6a2-47b7bf94805d',
      'Provider Pattern Basics',
      'What problem does the Provider Pattern primarily solve in React applications?',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'It solves the issue of prop drilling by allowing components to access shared state directly through context. It provides a way to make global state or values accessible to deeply nested components without passing props manually.',
      ARRAY[]::text[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-provider-pattern-61","original_type":"open-ended","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.693Z',
      '2025-10-21T22:21:12.693Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'f672cd84-5388-4b82-b8c4-52fcfa66022b',
      'Prop Drilling',
      'Which of the following best describes ''prop drilling''?',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"Passing props through multiple components that don’t use them","isCorrect":true,"explanation":""},{"id":"b","text":"Drilling into the DOM with refs","isCorrect":false,"explanation":""},{"id":"c","text":"Creating deeply nested providers","isCorrect":false,"explanation":""}]',
      'c',
      'The correct answer is: Passing props through multiple components that don’t use them',
      ARRAY[]::text[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-provider-pattern-62","original_type":"multiple-choice","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.693Z',
      '2025-10-21T22:21:12.693Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'd313c9c3-a06c-4c23-952b-76f32bb49576',
      'useContext Hook',
      'In React, how does a component consume values from a Provider?',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'By using the useContext hook with the context object created via React.createContext(). The component calls useContext(SomeContext) to directly access the value provided by the Provider.',
      ARRAY[]::text[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-provider-pattern-63","original_type":"open-ended","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.693Z',
      '2025-10-21T22:21:12.693Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'f36db31a-ad0b-4605-9ede-647068361ec0',
      'Provider Pattern Code',
      'What will be rendered by the Header component in this example?

```jsx
const DataContext = React.createContext();

function App() {
  const data = { title: ''Hello Provider'' };
  return (
    <DataContext.Provider value={data}>
      <Header />
    </DataContext.Provider>
  );
}

function Header() {
  const data = React.useContext(DataContext);
  return <h1>{data.title}</h1>;
}
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"Nothing, React throws an error","isCorrect":false,"explanation":""},{"id":"b","text":"h1 with text ''Hello Provider''","isCorrect":true,"explanation":""},{"id":"c","text":"h1 with text ''undefined''","isCorrect":false,"explanation":""}]',
      'c',
      'The correct answer is: h1 with text ''Hello Provider''',
      ARRAY[]::text[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-provider-pattern-64","original_type":"multiple-choice","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.693Z',
      '2025-10-21T22:21:12.693Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'b9f2b300-e817-406e-8546-3fb2f2d6e67a',
      'Performance Concern',
      'What is a potential downside of overusing the Provider Pattern?',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'All components consuming the context re-render whenever the value changes, which can hurt performance in large apps. It can cause unnecessary re-renders if too much state is stored in a single provider.',
      ARRAY[]::text[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-provider-pattern-65","original_type":"open-ended","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.693Z',
      '2025-10-21T22:21:12.693Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '78e1d02c-991f-4b04-aba3-d405290dc784',
      'Theme Provider Use Case',
      'Why is the Provider Pattern a good fit for managing application themes (dark/light mode)?',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'Because many components need access to the theme, and the Provider allows sharing it globally without prop drilling. It centralizes theme state and makes it easy to toggle or update across the entire app.',
      ARRAY[]::text[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-provider-pattern-66","original_type":"open-ended","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.693Z',
      '2025-10-21T22:21:12.693Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'cf8589ea-de2a-444e-9592-cf4e36faa946',
      'Multiple Providers',
      'How can you avoid unnecessary re-renders when using Providers for frequently changing values?',
      'multiple-choice',
      'advanced',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'By splitting contexts into multiple smaller providers so that components only re-render when the specific value they consume changes. Using memoization or selective context providers to isolate updates.',
      ARRAY[]::text[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','advanced']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-provider-pattern-67","original_type":"open-ended","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.693Z',
      '2025-10-21T22:21:12.693Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '6d0a4051-055c-4d4b-947c-9fbe88a9d1ab',
      'Custom Hook for Context',
      'What is the benefit of creating a custom hook like `useThemeContext()` instead of calling `useContext(ThemeContext)` directly in every component?',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"It enforces correct usage and can throw errors if used outside the provider","isCorrect":true,"explanation":""},{"id":"b","text":"It avoids the need to import useContext at all","isCorrect":false,"explanation":""},{"id":"c","text":"It improves runtime performance automatically","isCorrect":false,"explanation":""}]',
      'c',
      'The correct answer is: It enforces correct usage and can throw errors if used outside the provider',
      ARRAY[]::text[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-provider-pattern-68","original_type":"multiple-choice","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.693Z',
      '2025-10-21T22:21:12.693Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'a2790e4a-d636-45fd-b557-b4c8b35d2993',
      'Provider vs Redux',
      'How does the Provider Pattern differ from using Redux for global state management?',
      'multiple-choice',
      'advanced',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'Provider Pattern with context is simpler and built into React, but doesn’t offer advanced features like middleware, devtools, or predictable reducers. Redux adds structure and tooling, while Context Providers are best for simpler shared state.',
      ARRAY[]::text[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','advanced']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-provider-pattern-69","original_type":"open-ended","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.693Z',
      '2025-10-21T22:21:12.693Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '211d431e-f1e9-4bfc-abfb-a785d3836428',
      'Styled-Components Provider',
      'What role does the ThemeProvider from styled-components play?',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'It provides a theme object via context so that styled components can access theme values without passing them as props. It applies consistent design tokens (colors, spacing, etc.) across the entire component tree.',
      ARRAY[]::text[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-provider-pattern-70","original_type":"open-ended","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.693Z',
      '2025-10-21T22:21:12.693Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '94808f07-cc96-4d60-848a-63368bdaac24',
      'Introduction to Proxy Pattern',
      'What is the Proxy Pattern in JavaScript and how does it differ from directly interacting with an object?',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'No explanation provided.',
      ARRAY[]::text[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-proxy-pattern-66","original_type":"open-ended","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.693Z',
      '2025-10-21T22:21:12.693Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '843ddad8-83ad-4eee-a5de-29246a20ce8d',
      'Basic Proxy Usage',
      'You have an object `person = { name: ''John'', age: 30 }`. Create a proxy that logs whenever any property is accessed.',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'No explanation provided.',
      ARRAY[]::text[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-proxy-pattern-67","original_type":"code","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.693Z',
      '2025-10-21T22:21:12.693Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'af3823c2-f9cd-470a-85ea-fa83c7ad2c2b',
      'Handler Methods',
      'Which two handler methods are most commonly used in JavaScript Proxies?',
      'multiple-choice',
      'beginner',
      10,
      '[{"0":"a","1":"p","2":"p","3":"l","4":"y","5":" ","6":"a","7":"n","8":"d","9":" ","10":"c","11":"o","12":"n","13":"s","14":"t","15":"r","16":"u","17":"c","18":"t","explanation":""},{"0":"g","1":"e","2":"t","3":" ","4":"a","5":"n","6":"d","7":" ","8":"s","9":"e","10":"t","explanation":""},{"0":"d","1":"e","2":"l","3":"e","4":"t","5":"e","6":"P","7":"r","8":"o","9":"p","10":"e","11":"r","12":"t","13":"y","14":" ","15":"a","16":"n","17":"d","18":" ","19":"d","20":"e","21":"f","22":"i","23":"n","24":"e","25":"P","26":"r","27":"o","28":"p","29":"e","30":"r","31":"t","32":"y","explanation":""},{"0":"o","1":"w","2":"n","3":"K","4":"e","5":"y","6":"s","7":" ","8":"a","9":"n","10":"d","11":" ","12":"h","13":"a","14":"s","explanation":""}]',
      'c',
      'No explanation provided.',
      ARRAY[]::text[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-proxy-pattern-68","original_type":"multiple-choice","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.693Z',
      '2025-10-21T22:21:12.693Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '33c1f8f5-a015-4330-9e5b-5d2ebcd8685d',
      'Validation with Proxies',
      'How can the Proxy pattern help with data validation? Give an example.',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'No explanation provided.',
      ARRAY[]::text[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-proxy-pattern-69","original_type":"open-ended","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.693Z',
      '2025-10-21T22:21:12.693Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '70e2062e-72d4-483a-936c-8ad9b24d91c5',
      'Logging Changes',
      'Write a proxy that prevents setting `age` to a non-numeric value and logs attempts with an error message.',
      'multiple-choice',
      'advanced',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'No explanation provided.',
      ARRAY[]::text[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','advanced']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-proxy-pattern-70","original_type":"code","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.693Z',
      '2025-10-21T22:21:12.693Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '93f8a754-8fd0-499e-89a9-efb0a66146a9',
      'Proxy and Non-Existent Properties',
      'When trying to access a property that does not exist, how can a Proxy handler respond?',
      'multiple-choice',
      'intermediate',
      10,
      '[{"0":"T","1":"h","2":"r","3":"o","4":"w","5":" ","6":"a","7":"n","8":" ","9":"e","10":"r","11":"r","12":"o","13":"r","explanation":""},{"0":"R","1":"e","2":"t","3":"u","4":"r","5":"n","6":" ","7":"u","8":"n","9":"d","10":"e","11":"f","12":"i","13":"n","14":"e","15":"d","explanation":""},{"0":"L","1":"o","2":"g","3":" ","4":"a","5":" ","6":"c","7":"u","8":"s","9":"t","10":"o","11":"m","12":" ","13":"m","14":"e","15":"s","16":"s","17":"a","18":"g","19":"e","explanation":""},{"0":"A","1":"n","2":"y","3":" ","4":"o","5":"f","6":" ","7":"t","8":"h","9":"e","10":" ","11":"a","12":"b","13":"o","14":"v","15":"e","16":",","17":" ","18":"d","19":"e","20":"p","21":"e","22":"n","23":"d","24":"i","25":"n","26":"g","27":" ","28":"o","29":"n","30":" ","31":"t","32":"h","33":"e","34":" ","35":"h","36":"a","37":"n","38":"d","39":"l","40":"e","41":"r","42":" ","43":"l","44":"o","45":"g","46":"i","47":"c","explanation":""}]',
      'c',
      'No explanation provided.',
      ARRAY[]::text[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-proxy-pattern-71","original_type":"multiple-choice","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.693Z',
      '2025-10-21T22:21:12.693Z'
    );;
