INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '7e0d3f5e-17b3-4bf7-b153-721ad43e8f10',
          'What is the difference between ''resetting'' and ''normalizing'' CSS?',
          'Resetting removes all default browser styles. Normalizing makes styles consistent across browsers while preserving useful defaults.',
          'multiple-choice',
          'intermediate',
          7,
          '[{"id":"a","text":"Reset: removes all styles; Normalize: preserves useful defaults, fixes inconsistencies","isCorrect":true,"explanation":""},{"id":"b","text":"They are the same","isCorrect":false,"explanation":""},{"id":"c","text":"Normalize removes all margins","isCorrect":false,"explanation":""},{"id":"d","text":"Reset is obsolete","isCorrect":false,"explanation":""}]',
          NULL,
          'Normalize.css is preferred for modern projects—it fixes browser inconsistencies without stripping all defaults.',
          NULL,
          [],
          ARRAY['css','css-fundamentals','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"css21–40-css-q34","original_type":"multiple-choice","topic":"CSS Fundamentals","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"CSS"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '42f3b80a-3528-4e88-a726-f8a375df62dc',
          'Explain CSS Block Formatting Context (BFC).',
          'A BFC is an isolated rendering area where block-level boxes are laid out without affecting outside elements. Created by `overflow: hidden`, `float`, `display: flow-root`, etc.',
          'multiple-choice',
          'advanced',
          8,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'BFCs prevent margin collapse and contain floated children—essential for complex layouts.',
          NULL,
          [],
          ARRAY['css','css-layout','advanced']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"css21–40-css-q35","original_type":"open-ended","topic":"CSS Layout","subcategory":"","sample_answers":["A BFC isolates layout: margins don’t collapse with outside elements, and floated children are contained. Create one with `overflow: hidden` or `display: flow-root`.","Use BFC to fix common issues: parent height collapse with floats, or unwanted margin merging between adjacent blocks."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"CSS"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'df252313-2e42-466e-94e5-3ddb2e370977',
          'What is the float property and what does it do?',
          '`float` places an element to the left or right of its container, allowing text and inline elements to wrap around it.',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Floats were used for layouts before Flexbox/Grid but are now mainly for text wrapping (e.g., images in articles).',
          NULL,
          [],
          ARRAY['css','css-layout','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"css21–40-css-q36","original_type":"open-ended","topic":"CSS Layout","subcategory":"","sample_answers":["`float: left` moves an element to the left, with content wrapping on the right. Common for image captions in text.","Floats take elements out of normal flow—use `clear` or BFC to manage layout consequences."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"CSS"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'd23c7440-f10b-4fbd-af69-29f513ab623a',
          'Describe the clear property in CSS.',
          '`clear` specifies which sides of an element cannot have floating elements, preventing overlap.',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"`clear: left` prevents left floats; `clear: right` prevents right floats; `clear: both` prevents both","isCorrect":true,"explanation":""},{"id":"b","text":"`clear` only works with `position: absolute`","isCorrect":false,"explanation":""},{"id":"c","text":"`clear` is deprecated","isCorrect":false,"explanation":""},{"id":"d","text":"`clear` affects inline elements","isCorrect":false,"explanation":""}]',
          NULL,
          '`clear: both` forces an element below all floated siblings—essential for footer placement after floated columns.',
          NULL,
          [],
          ARRAY['css','css-layout','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"css21–40-css-q37","original_type":"multiple-choice","topic":"CSS Layout","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"CSS"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '35a4eba4-0b84-484f-b7de-92a2f3d1712e',
          'Explain the purpose of clearing floats in CSS.',
          'Clearing floats ensures that non-floated elements (like footers) appear below floated content instead of wrapping beside it.',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Without clearing, containers collapse and subsequent elements wrap around floats—`clear` or modern layout methods fix this.',
          NULL,
          [],
          ARRAY['css','css-layout','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"css21–40-css-q38","original_type":"open-ended","topic":"CSS Layout","subcategory":"","sample_answers":["Use `clear: both` on a footer to ensure it appears below floated sidebars. Modern alternative: use Flexbox/Grid instead of floats for layout.","The clearfix hack (`overflow: hidden` or `::after { clear: both }`) contains floats within a parent container."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"CSS"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '7e5b360d-c7a2-4837-9aae-667294c24fa3',
          'What is a clearfix in CSS?',
          'A clearfix is a technique to contain floated children within a parent container, preventing height collapse.',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Modern solution: `display: flow-root` creates a BFC. Legacy: `::after { content: ''''; clear: both; }`.',
          NULL,
          [],
          ARRAY['css','css-layout','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"css21–40-css-q39","original_type":"open-ended","topic":"CSS Layout","subcategory":"","sample_answers":["A clearfix forces a parent to wrap floated children. Modern method: `parent { display: flow-root; }`. Legacy: use a `::after` pseudo-element with `clear: both`.","Without clearfix, a parent with only floated children has zero height—clearfix fixes this layout issue."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"CSS"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '67f0e116-9ac0-43ee-b37a-ec06e104d8dd',
          'Does `overflow: hidden` create a new block formatting context?',
          'Yes. `overflow: hidden` (and any non-`visible` overflow value) creates a new Block Formatting Context (BFC).',
          'true-false',
          'advanced',
          7,
          '[{"id":"true","text":"True","isCorrect":false},{"id":"false","text":"False","isCorrect":true}]',
          'false',
          'This is why `overflow: hidden` contains floats and prevents margin collapse—it creates a new BFC.',
          NULL,
          [],
          ARRAY['css','css-layout','advanced']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"css21–40-css-q40","original_type":"true-false","topic":"CSS Layout","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"CSS"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '23726538-47e1-4c7c-8dcb-8a95ef828c67',
          'Definition of Common Pattern',
          'What is the ''Common Pattern'' in JavaScript object creation?',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'It’s the simplest way of creating objects in JavaScript using object literals or basic functions. It involves manually defining properties and methods without abstraction.',
          NULL,
          ["Think about `{}` object literals.","No abstraction, no factories."],
          ARRAY['design-patterns','common-pattern','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-common-pattern-1","original_type":"open-ended","topic":"Common Pattern","subcategory":"","sample_answers":["It’s the simplest way of creating objects in JavaScript using object literals or basic functions.","It involves manually defining properties and methods without abstraction."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.203Z',
          '2025-10-15T00:47:17.204Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '55f2b82b-20d2-48bd-95c7-7375da088171',
          'Code Output - Object Literal',
          'What will this code log?

```js
const user = {
  firstName: ''Alice'',
  lastName: ''Brown'',
  fullName: function() {
    return this.firstName + '' '' + this.lastName;
  }
};

console.log(user.fullName());
```',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"Alice","isCorrect":false,"explanation":""},{"id":"b","text":"Brown","isCorrect":false,"explanation":""},{"id":"c","text":"Alice Brown","isCorrect":true,"explanation":""}]',
          NULL,
          'The correct answer is: Alice Brown',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-common-pattern-2","original_type":"multiple-choice","topic":"General Design Patterns","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.204Z',
          '2025-10-15T00:47:17.204Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'a1e864df-cc17-4b29-ac7a-8246b6fc8a2e',
          'Pros of Common Pattern',
          'Which of the following are advantages of the Common Pattern?',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"Simple and easy to understand","isCorrect":true,"explanation":""},{"id":"b","text":"Minimal boilerplate code","isCorrect":true,"explanation":""},{"id":"c","text":"Great for small projects","isCorrect":true,"explanation":""},{"id":"d","text":"Highly scalable for large apps","isCorrect":false,"explanation":""}]',
          NULL,
          'The correct answer is: Simple and easy to understand',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-common-pattern-3","original_type":"multiple-choice","topic":"General Design Patterns","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.204Z',
          '2025-10-15T00:47:17.204Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '474d793c-b57a-4f53-b20f-2372daa3614e',
          'Cons of Common Pattern',
          'What is a major drawback of the Common Pattern?',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'It doesn’t scale well because every object must be defined manually. Code duplication increases with many similar objects.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-common-pattern-4","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["It doesn’t scale well because every object must be defined manually.","Code duplication increases with many similar objects."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.204Z',
          '2025-10-15T00:47:17.204Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'accf9ab6-733a-4fdc-bf24-1d0711aecba1',
          'Repetition Problem',
          'Why might using the Common Pattern cause problems when creating many similar objects?',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Because you need to repeat the same properties and methods for each object. It leads to duplication and makes changes harder to maintain.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-common-pattern-5","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["Because you need to repeat the same properties and methods for each object.","It leads to duplication and makes changes harder to maintain."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.204Z',
          '2025-10-15T00:47:17.204Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '569ea46b-4f2f-4e19-affd-c9c47da6a89c',
          'Debugging Common Pattern',
          'Find the bug in this code:

```js
const car = {
  brand: ''Toyota'',
  model: ''Corolla'',
  getDetails: () => `${this.brand} ${this.model}`
};

console.log(car.getDetails());
```',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'The arrow function doesn’t bind `this` properly, so `this.brand` and `this.model` are undefined. Use a regular function instead of an arrow function.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-common-pattern-6","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["The arrow function doesn’t bind `this` properly, so `this.brand` and `this.model` are undefined.","Use a regular function instead of an arrow function."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.204Z',
          '2025-10-15T00:47:17.204Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'ead0fbab-6f94-4f45-8a2d-8bd3bf740c48',
          'Best Use Case',
          'When is it appropriate to use the Common Pattern?',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'For very small apps or scripts where only one or two objects are needed. When performance and scalability aren’t concerns.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-common-pattern-7","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["For very small apps or scripts where only one or two objects are needed.","When performance and scalability aren’t concerns."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.204Z',
          '2025-10-15T00:47:17.204Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'e00d8514-6cdd-4ac2-a87a-d87aac0ede71',
          'Transition to Other Patterns',
          'Why do developers often move from the Common Pattern to the Factory Pattern or Constructor Pattern?',
          'multiple-choice',
          'advanced',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Because as applications grow, manually creating objects becomes repetitive and hard to maintain. Factories and constructors provide abstraction and scalability.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','advanced']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-common-pattern-8","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["Because as applications grow, manually creating objects becomes repetitive and hard to maintain.","Factories and constructors provide abstraction and scalability."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.204Z',
          '2025-10-15T00:47:17.204Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '5b748340-6680-4cff-941e-6c159ca0abc8',
          'Definition of Factory Pattern',
          'What is the Factory Pattern in JavaScript?',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'It’s a design pattern where a function (factory function) creates and returns objects without using the `new` keyword. It provides an abstraction for object creation.',
          NULL,
          [],
          ARRAY['design-patterns','factory-pattern','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-factory-pattern-9","original_type":"open-ended","topic":"Factory Pattern","subcategory":"","sample_answers":["It’s a design pattern where a function (factory function) creates and returns objects without using the `new` keyword.","It provides an abstraction for object creation."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.205Z',
          '2025-10-15T00:47:17.205Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '048f6026-9c40-40d9-9522-0bb1b1ab05aa',
          'Factory Pattern Example',
          'What will this code log?

```js
const createUser = ({ firstName, lastName, email }) => ({
  firstName,
  lastName,
  email,
  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
});

const user = createUser({ firstName: ''John'', lastName: ''Doe'', email: ''john@doe.com'' });

console.log(user.fullName());
```',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"undefined undefined","isCorrect":false,"explanation":""},{"id":"b","text":"John Doe","isCorrect":true,"explanation":""},{"id":"c","text":"[object Object]","isCorrect":false,"explanation":""}]',
          NULL,
          'The correct answer is: John Doe',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-factory-pattern-10","original_type":"multiple-choice","topic":"General Design Patterns","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.205Z',
          '2025-10-15T00:47:17.205Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'b4d5edfa-6212-4c0c-9abb-1d43a08a9d8f',
          'Pros of Factory Pattern',
          'Which of the following are benefits of using the Factory Pattern?',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"Encapsulation of object creation","isCorrect":true,"explanation":""},{"id":"b","text":"Easier to configure objects dynamically","isCorrect":true,"explanation":""},{"id":"c","text":"No need to repeat object structure","isCorrect":true,"explanation":""},{"id":"d","text":"Faster performance than constructors","isCorrect":false,"explanation":""}]',
          NULL,
          'The correct answer is: Encapsulation of object creation',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-factory-pattern-11","original_type":"multiple-choice","topic":"General Design Patterns","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.205Z',
          '2025-10-15T00:47:17.205Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '8092c520-38db-4844-86da-5b11412b35b7',
          'Cons of Factory Pattern',
          'What is a major drawback of using the Factory Pattern in JavaScript?',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'It can be less memory efficient since new objects are created each time without shared methods. May add unnecessary abstraction for simple cases.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-factory-pattern-12","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["It can be less memory efficient since new objects are created each time without shared methods.","May add unnecessary abstraction for simple cases."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.205Z',
          '2025-10-15T00:47:17.205Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '25918f02-8e48-4a4d-9cc4-42c93f4e1c2a',
          'When to Use',
          'When should the Factory Pattern be used instead of the Common Pattern?',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'When creating many similar objects that need custom configurations. When object creation depends on environment or dynamic input.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-factory-pattern-13","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["When creating many similar objects that need custom configurations.","When object creation depends on environment or dynamic input."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.205Z',
          '2025-10-15T00:47:17.205Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'c4a8b30e-b7fe-41eb-bc07-8723f6324f08',
          'Debugging Factory Pattern',
          'What is wrong with this code?

```js
const createCar = (brand, model) => {
  this.brand = brand;
  this.model = model;
  return { brand, model };
};

const car = createCar(''Toyota'', ''Corolla'');
console.log(car.brand);
```',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Using `this` inside a factory function doesn’t work as expected because factory functions don’t use `new`. The correct approach is just returning `{ brand, model }` without `this`.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-factory-pattern-14","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["Using `this` inside a factory function doesn’t work as expected because factory functions don’t use `new`.","The correct approach is just returning `{ brand, model }` without `this`."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.205Z',
          '2025-10-15T00:47:17.205Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'ce6a2454-dd0e-4c15-bb65-7f086d0e8fb5',
          'Comparison with Constructor Pattern',
          'How does the Factory Pattern differ from the Constructor Pattern in JavaScript?',
          'multiple-choice',
          'advanced',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Factory Pattern uses plain functions to return objects, while Constructor Pattern uses classes or functions with `new`. Factories don’t require `this` or `new` keyword.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','advanced']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-factory-pattern-15","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["Factory Pattern uses plain functions to return objects, while Constructor Pattern uses classes or functions with `new`.","Factories don’t require `this` or `new` keyword."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.205Z',
          '2025-10-15T00:47:17.205Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '148db706-e177-4ed5-ae24-972c5a80d9c7',
          'Dynamic Factory Example',
          'What will this return?

```js
const createObjectFromArray = ([key, value]) => ({
  [key]: value,
});

console.log(createObjectFromArray(["name", "Alice"]));
```',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"{ key: \"name\", value: \"Alice\" }","isCorrect":false,"explanation":""},{"id":"b","text":"{ name: \"Alice\" }","isCorrect":true,"explanation":""},{"id":"c","text":"undefined","isCorrect":false,"explanation":""}]',
          NULL,
          'The correct answer is: { name: "Alice" }',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-factory-pattern-16","original_type":"multiple-choice","topic":"General Design Patterns","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.205Z',
          '2025-10-15T00:47:17.205Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '7bd3551b-f43c-404a-af6e-e4fded279d43',
          'Definition of Flyweight Pattern',
          'What is the Flyweight Pattern, and why is it useful?',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'It’s a structural design pattern that minimizes memory usage by sharing common object data instead of creating duplicates. It’s useful when creating a large number of similar objects, e.g., books with the same ISBN.',
          NULL,
          [],
          ARRAY['design-patterns','flyweight-pattern','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-flyweight-pattern-17","original_type":"open-ended","topic":"Flyweight Pattern","subcategory":"","sample_answers":["It’s a structural design pattern that minimizes memory usage by sharing common object data instead of creating duplicates.","It’s useful when creating a large number of similar objects, e.g., books with the same ISBN."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.205Z',
          '2025-10-15T00:47:17.205Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'bc3e5dd4-0136-468f-824f-3d988f29ac2d',
          'Flyweight Example Output',
          'What will this code log?

```js
console.log("Total amount of copies: ", bookList.length);
console.log("Total amount of books: ", isbnNumbers.size);
```
After adding 5 copies of 3 different books, what is the output?',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"Total amount of copies: 5, Total amount of books: 5","isCorrect":false,"explanation":""},{"id":"b","text":"Total amount of copies: 3, Total amount of books: 5","isCorrect":false,"explanation":""},{"id":"c","text":"Total amount of copies: 5, Total amount of books: 3","isCorrect":true,"explanation":""}]',
          NULL,
          'The correct answer is: Total amount of copies: 5, Total amount of books: 3',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-flyweight-pattern-18","original_type":"multiple-choice","topic":"General Design Patterns","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.205Z',
          '2025-10-15T00:47:17.205Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'a9413635-aae0-4c1a-930a-516dcefd95d2',
          'Advantages of Flyweight Pattern',
          'Which of the following are advantages of the Flyweight Pattern?',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Reduced memory usage by reusing objects","isCorrect":true,"explanation":""},{"id":"b","text":"Improved performance for large-scale applications","isCorrect":true,"explanation":""},{"id":"c","text":"Simplifies debugging","isCorrect":false,"explanation":""},{"id":"d","text":"Reduces network latency","isCorrect":false,"explanation":""}]',
          NULL,
          'The correct answer is: Reduced memory usage by reusing objects',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-flyweight-pattern-19","original_type":"multiple-choice","topic":"General Design Patterns","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.205Z',
          '2025-10-15T00:47:17.205Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '1b277978-ecf5-43d7-b83d-4e7b66e07c15',
          'Disadvantages of Flyweight Pattern',
          'What is a drawback of using the Flyweight Pattern?',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'It can increase code complexity by adding an extra layer of object management. Modern hardware often has enough memory, so the benefit may be negligible in many applications.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-flyweight-pattern-20","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["It can increase code complexity by adding an extra layer of object management.","Modern hardware often has enough memory, so the benefit may be negligible in many applications."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.205Z',
          '2025-10-15T00:47:17.205Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'c8424140-3f75-4b7a-b212-a361cb18360f',
          'Flyweight vs Factory Pattern',
          'How does the Flyweight Pattern differ from the Factory Pattern?',
          'multiple-choice',
          'advanced',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Factory Pattern abstracts object creation, while Flyweight Pattern focuses on sharing existing objects to save memory. Factory decides *how* to create, Flyweight decides *whether to reuse*.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','advanced']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-flyweight-pattern-21","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["Factory Pattern abstracts object creation, while Flyweight Pattern focuses on sharing existing objects to save memory.","Factory decides *how* to create, Flyweight decides *whether to reuse*."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.205Z',
          '2025-10-15T00:47:17.205Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'a477c2e4-45f1-4b89-9471-9f6603efd202',
          'Fix the Bug',
          'What’s wrong with this implementation?

```js
const isbnNumbers = new Set();

const createBook = (title, author, isbn) => {
  const book = isbnNumbers.has(isbn);
  if (book) {
    return book;
  } else {
    const book = new Book(title, author, isbn);
    isbnNumbers.add(isbn);
    return book;
  }
};
```',
          'multiple-choice',
          'advanced',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'The code incorrectly treats `isbnNumbers.has(isbn)` as the book object, but it returns a boolean. A `Map` or dictionary should be used to store ISBN → Book mappings, not just a `Set`.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','advanced']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-flyweight-pattern-22","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["The code incorrectly treats `isbnNumbers.has(isbn)` as the book object, but it returns a boolean.","A `Map` or dictionary should be used to store ISBN → Book mappings, not just a `Set`."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.205Z',
          '2025-10-15T00:47:17.205Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '96573e2d-8869-4a55-8ba4-97598a906b70',
          'When to Use Flyweight',
          'In which situation would the Flyweight Pattern be the best choice?',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"When creating thousands of objects that share common properties","isCorrect":true,"explanation":""},{"id":"b","text":"When creating a single instance of a service","isCorrect":false,"explanation":""},{"id":"c","text":"When caching API responses","isCorrect":false,"explanation":""},{"id":"d","text":"When setting up event delegation in DOM","isCorrect":false,"explanation":""}]',
          NULL,
          'The correct answer is: When creating thousands of objects that share common properties',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-flyweight-pattern-23","original_type":"multiple-choice","topic":"General Design Patterns","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.205Z',
          '2025-10-15T00:47:17.205Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '764c4bbf-394b-4c4e-9344-20d4e70ffa96',
          'Flyweight Pattern in Modern JS',
          'Why is the Flyweight Pattern considered less critical in modern JavaScript applications compared to older times?',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Because modern devices have large amounts of memory (RAM), so optimizing object count is less often necessary. JavaScript engines also optimize memory allocation internally.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-flyweight-pattern-24","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["Because modern devices have large amounts of memory (RAM), so optimizing object count is less often necessary.","JavaScript engines also optimize memory allocation internally."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.205Z',
          '2025-10-15T00:47:17.205Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'f3dfd217-cd2d-401f-85f1-33c0932d4236',
          'Definition of Mediator Pattern',
          'What is the Mediator Pattern, and why is it useful?',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'It’s a behavioral design pattern that centralizes communication between objects instead of letting them reference each other directly. It reduces many-to-many relationships into one-to-many, improving code organization and reducing coupling.',
          NULL,
          [],
          ARRAY['design-patterns','mediator-pattern','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-mediator-pattern-25","original_type":"open-ended","topic":"Mediator Pattern","subcategory":"","sample_answers":["It’s a behavioral design pattern that centralizes communication between objects instead of letting them reference each other directly.","It reduces many-to-many relationships into one-to-many, improving code organization and reducing coupling."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.205Z',
          '2025-10-15T00:47:17.205Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'a661d58b-9608-4afb-a191-9d7409b82398',
          'Mediator Pattern Analogy',
          'Which analogy best describes the Mediator Pattern?',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"A librarian managing which books readers can borrow","isCorrect":false,"explanation":""},{"id":"b","text":"An air traffic controller guiding planes so they don’t talk to each other directly","isCorrect":true,"explanation":""},{"id":"c","text":"A teacher grading exams","isCorrect":false,"explanation":""},{"id":"d","text":"A vending machine dispensing products","isCorrect":false,"explanation":""}]',
          NULL,
          'The correct answer is: An air traffic controller guiding planes so they don’t talk to each other directly',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-mediator-pattern-26","original_type":"multiple-choice","topic":"General Design Patterns","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.205Z',
          '2025-10-15T00:47:17.205Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'de6d5c73-9029-4dd9-84a9-e90ed93f4641',
          'Chatroom Example',
          'In the following code, how does the User class send messages?

```js
class User {
  constructor(name, chatroom) {
    this.name = name;
    this.chatroom = chatroom;
  }

  send(message) {
    this.chatroom.logMessage(this, message);
  }
}
```
',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'The User calls the `send` method, which forwards the message to the mediator (`chatroom`) instead of directly to another user. The ChatRoom logs the message with the sender’s name and timestamp.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-mediator-pattern-27","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["The User calls the `send` method, which forwards the message to the mediator (`chatroom`) instead of directly to another user.","The ChatRoom logs the message with the sender’s name and timestamp."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.205Z',
          '2025-10-15T00:47:17.205Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'eeaa4ed2-0152-4a03-8bd5-505b07dbe571',
          'Express Middleware as Mediator',
          'How does Express.js middleware act as a mediator in the request-response cycle?',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Middleware functions act as mediators by receiving requests, modifying them, and passing them along to the next function in the chain. They centralize control, preventing each handler from directly depending on others.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-mediator-pattern-28","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["Middleware functions act as mediators by receiving requests, modifying them, and passing them along to the next function in the chain.","They centralize control, preventing each handler from directly depending on others."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.205Z',
          '2025-10-15T00:47:17.205Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'f7f94b7d-5df4-4e72-b6d1-7d63e5d3f97c',
          'Advantages of Mediator Pattern',
          'Which of the following are advantages of using the Mediator Pattern?',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Reduces coupling between components","isCorrect":true,"explanation":""},{"id":"b","text":"Simplifies many-to-many relationships","isCorrect":true,"explanation":""},{"id":"c","text":"Always improves performance","isCorrect":false,"explanation":""},{"id":"d","text":"Provides a single point of communication","isCorrect":true,"explanation":""}]',
          NULL,
          'The correct answer is: Reduces coupling between components',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-mediator-pattern-29","original_type":"multiple-choice","topic":"General Design Patterns","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.205Z',
          '2025-10-15T00:47:17.205Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '70cb76b4-da18-45f8-9400-12da0e707af6',
          'Disadvantages of Mediator Pattern',
          'What is a potential disadvantage of the Mediator Pattern?',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'The mediator can become a God Object if it grows too complex, containing too much business logic. It introduces an extra layer of indirection, which can make debugging harder.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-mediator-pattern-30","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["The mediator can become a God Object if it grows too complex, containing too much business logic.","It introduces an extra layer of indirection, which can make debugging harder."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.205Z',
          '2025-10-15T00:47:17.205Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '6d7f5dcc-80f9-4840-a7df-541ff91cda96',
          'Mediator vs Observer',
          'How does the Mediator Pattern differ from the Observer Pattern?',
          'multiple-choice',
          'advanced',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Observer Pattern is event-driven, where subscribers listen to changes. Mediator centralizes interactions by routing communication between participants. Mediator reduces direct object references, Observer reduces direct polling.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','advanced']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-mediator-pattern-31","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["Observer Pattern is event-driven, where subscribers listen to changes. Mediator centralizes interactions by routing communication between participants.","Mediator reduces direct object references, Observer reduces direct polling."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.205Z',
          '2025-10-15T00:47:17.205Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '29004a21-d8f8-4ade-90a7-cb35aa119d1e',
          'Debugging Middleware Flow',
          'Given this Express code:

```js
app.use(
  "/",
  (req, res, next) => {
    req.headers["test-header"] = 1234;
    next();
  },
  (req, res, next) => {
    console.log(`Request has test header: ${!!req.headers["test-header"]}`);
    next();
  }
);
```
What will the second middleware log?',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"Request has test header: false","isCorrect":false,"explanation":""},{"id":"b","text":"Request has test header: true","isCorrect":true,"explanation":""},{"id":"c","text":"Request has test header: undefined","isCorrect":false,"explanation":""}]',
          NULL,
          'The correct answer is: Request has test header: true',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-mediator-pattern-32","original_type":"multiple-choice","topic":"General Design Patterns","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.205Z',
          '2025-10-15T00:47:17.205Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'f004f4fb-83ec-422f-9df6-26aae856816c',
          'Definition of Mixin Pattern',
          'What is the Mixin Pattern and why is it used?',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'A mixin is an object containing reusable functionality that can be added to another object or class without inheritance. It allows sharing behavior across classes without forming rigid inheritance hierarchies.',
          NULL,
          [],
          ARRAY['design-patterns','mixin-pattern','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-mixin-pattern-33","original_type":"open-ended","topic":"Mixin Pattern","subcategory":"","sample_answers":["A mixin is an object containing reusable functionality that can be added to another object or class without inheritance.","It allows sharing behavior across classes without forming rigid inheritance hierarchies."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.206Z',
          '2025-10-15T00:47:17.206Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '10a92506-466a-49e8-b81e-8d1a6aa5d6d7',
          'Dog Example with Mixins',
          'Given the following code:

```js
class Dog {
  constructor(name) {
    this.name = name;
  }
}

const dogFunctionality = {
  bark: () => console.log("Woof!"),
  wagTail: () => console.log("Wagging my tail!"),
};

Object.assign(Dog.prototype, dogFunctionality);

const pet1 = new Dog("Daisy");
pet1.bark();
```
What will be logged when `pet1.bark()` is executed?',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"undefined","isCorrect":false,"explanation":""},{"id":"b","text":"Woof!","isCorrect":true,"explanation":""},{"id":"c","text":"Error: bark is not a function","isCorrect":false,"explanation":""}]',
          NULL,
          'The correct answer is: Woof!',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-mixin-pattern-34","original_type":"multiple-choice","topic":"General Design Patterns","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.206Z',
          '2025-10-15T00:47:17.206Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '2ebea418-c710-4187-a733-cfc773f6f863',
          'Mixins vs Inheritance',
          'How does the Mixin Pattern differ from classical inheritance?',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Inheritance creates a parent-child relationship between classes, while mixins simply copy functionality into another class. Mixins allow horizontal code reuse across unrelated classes, inheritance enforces vertical hierarchy.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-mixin-pattern-35","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["Inheritance creates a parent-child relationship between classes, while mixins simply copy functionality into another class.","Mixins allow horizontal code reuse across unrelated classes, inheritance enforces vertical hierarchy."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.206Z',
          '2025-10-15T00:47:17.206Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'f1e520f3-8892-4b96-b9ab-576d7985ba11',
          'Chaining Mixins',
          'In the example with `animalFunctionality` and `dogFunctionality`, why does Dog end up with both `bark()` and `walk()` methods?',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Because `Object.assign(dogFunctionality, animalFunctionality)` merged animal methods into dogFunctionality, then `Object.assign(Dog.prototype, dogFunctionality)` added all methods to Dog’s prototype. This effectively chained multiple mixins together.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-mixin-pattern-36","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["Because `Object.assign(dogFunctionality, animalFunctionality)` merged animal methods into dogFunctionality, then `Object.assign(Dog.prototype, dogFunctionality)` added all methods to Dog’s prototype.","This effectively chained multiple mixins together."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.206Z',
          '2025-10-15T00:47:17.206Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '2b7cab82-db2e-4e62-9774-167a4c2c7485',
          'Real World Browser Example',
          'Which of the following are examples of mixins in the browser Window object?',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"setTimeout and setInterval (from WindowOrWorkerGlobalScope)","isCorrect":true,"explanation":""},{"id":"b","text":"onbeforeunload (from WindowEventHandlers)","isCorrect":true,"explanation":""},{"id":"c","text":"document.querySelector","isCorrect":false,"explanation":""},{"id":"d","text":"console.log","isCorrect":false,"explanation":""}]',
          NULL,
          'The correct answer is: setTimeout and setInterval (from WindowOrWorkerGlobalScope)',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-mixin-pattern-37","original_type":"multiple-choice","topic":"General Design Patterns","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.206Z',
          '2025-10-15T00:47:17.206Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '7014b56a-222d-46bb-bebc-f8aabdd0ae81',
          'Disadvantages of Mixins',
          'What are potential disadvantages of using Mixins?',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'They can cause prototype pollution, making it unclear where a function originated. They can introduce naming conflicts if two mixins define the same property. In React, they added complexity, leading the team to recommend HOCs and Hooks instead.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-mixin-pattern-38","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["They can cause prototype pollution, making it unclear where a function originated.","They can introduce naming conflicts if two mixins define the same property.","In React, they added complexity, leading the team to recommend HOCs and Hooks instead."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.206Z',
          '2025-10-15T00:47:17.206Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '55a7ceaf-74e1-49b5-9d03-d5b7a3c4ce40',
          'Mixin vs Higher Order Components',
          'Why did React discourage mixins in favor of Higher Order Components (HOCs) and later Hooks?',
          'multiple-choice',
          'advanced',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Mixins often lead to implicit dependencies and complexity, while HOCs and Hooks are more explicit, composable, and predictable. Hooks allow better reusability and cleaner separation of concerns than mixins.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','advanced']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-mixin-pattern-39","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["Mixins often lead to implicit dependencies and complexity, while HOCs and Hooks are more explicit, composable, and predictable.","Hooks allow better reusability and cleaner separation of concerns than mixins."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.206Z',
          '2025-10-15T00:47:17.206Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'c93dfbf6-c144-457d-8961-3160ca0dcdf2',
          'Debugging Mixins',
          'If you accidentally overwrite a method from another mixin when using `Object.assign`, what will happen?',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"Both methods are preserved","isCorrect":false,"explanation":""},{"id":"b","text":"The last assigned method overwrites the previous one","isCorrect":true,"explanation":""},{"id":"c","text":"JavaScript throws an error","isCorrect":false,"explanation":""}]',
          NULL,
          'The correct answer is: The last assigned method overwrites the previous one',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-mixin-pattern-40","original_type":"multiple-choice","topic":"General Design Patterns","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.206Z',
          '2025-10-15T00:47:17.206Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '8c1ad6e7-9036-4c84-addc-d0a707aaa9ab',
          'Definition of Module Pattern',
          'What is the Module Pattern in JavaScript and why is it used?',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'The Module Pattern is a design pattern that uses closures to create private and public encapsulation. It is used to avoid polluting the global scope and to create reusable, maintainable code structures.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-module-pattern-41","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["The Module Pattern is a design pattern that uses closures to create private and public encapsulation.","It is used to avoid polluting the global scope and to create reusable, maintainable code structures."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.206Z',
          '2025-10-15T00:47:17.206Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '3ae6d0dc-5434-450c-adfd-b241c35d5103',
          'Basic Module Syntax',
          'Which of the following correctly implements a simple Module Pattern in JavaScript?',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"function Module() { var x = 10; return x; }","isCorrect":false,"explanation":""},{"id":"b","text":"var Module = (function(){ var privateVar = 10; return { get: function(){ return privateVar; } }; })();","isCorrect":true,"explanation":""},{"id":"c","text":"let Module = class { constructor(){ this.x = 10; } }","isCorrect":false,"explanation":""}]',
          NULL,
          'The correct answer is: var Module = (function(){ var privateVar = 10; return { get: function(){ return privateVar; } }; })();',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-module-pattern-42","original_type":"multiple-choice","topic":"General Design Patterns","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.206Z',
          '2025-10-15T00:47:17.206Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '5c3a320b-7805-4a24-9d2c-941e23d9be39',
          'Encapsulation in Module Pattern',
          'How does the Module Pattern achieve encapsulation?',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'By using an Immediately Invoked Function Expression (IIFE) to create a private scope. Only the returned object exposes public members, while variables/functions inside the closure remain private.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-module-pattern-43","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["By using an Immediately Invoked Function Expression (IIFE) to create a private scope.","Only the returned object exposes public members, while variables/functions inside the closure remain private."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.206Z',
          '2025-10-15T00:47:17.206Z'
        );;