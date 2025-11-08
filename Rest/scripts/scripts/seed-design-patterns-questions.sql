INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '3aef395c-0a3d-4aa0-9b65-423f45f7f86d',
      'Definition of Common Pattern',
      'What is the ''Common Pattern'' in JavaScript object creation?',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'It’s the simplest way of creating objects in JavaScript using object literals or basic functions. It involves manually defining properties and methods without abstraction.',
      ARRAY[]::jsonb[],
      ARRAY['Think about `{}` object literals.','No abstraction, no factories.']::text[],
      ARRAY['design-patterns','common-pattern','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-common-pattern-1","original_type":"open-ended","topic":"Common Pattern","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.678Z',
      '2025-10-21T22:21:12.684Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'fc8ad93c-306c-4ee6-9499-eb4ba9d2b78f',
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
      'c',
      'The correct answer is: Alice Brown',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-common-pattern-2","original_type":"multiple-choice","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.684Z',
      '2025-10-21T22:21:12.684Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '841012f0-7861-4743-81ec-f0357cc5c9b7',
      'Pros of Common Pattern',
      'Which of the following are advantages of the Common Pattern?',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"Simple and easy to understand","isCorrect":true,"explanation":""},{"id":"b","text":"Minimal boilerplate code","isCorrect":true,"explanation":""},{"id":"c","text":"Great for small projects","isCorrect":true,"explanation":""},{"id":"d","text":"Highly scalable for large apps","isCorrect":false,"explanation":""}]',
      'c',
      'The correct answer is: Simple and easy to understand',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-common-pattern-3","original_type":"multiple-choice","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.684Z',
      '2025-10-21T22:21:12.684Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'd2f85e66-6d04-4a0b-8d81-568aedb15f21',
      'Cons of Common Pattern',
      'What is a major drawback of the Common Pattern?',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'It doesn’t scale well because every object must be defined manually. Code duplication increases with many similar objects.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-common-pattern-4","original_type":"open-ended","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.684Z',
      '2025-10-21T22:21:12.684Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '321d58aa-ee3e-48d3-9448-e650e0708326',
      'Repetition Problem',
      'Why might using the Common Pattern cause problems when creating many similar objects?',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'Because you need to repeat the same properties and methods for each object. It leads to duplication and makes changes harder to maintain.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-common-pattern-5","original_type":"open-ended","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.684Z',
      '2025-10-21T22:21:12.684Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '37382645-ba38-4258-b35f-f78f48c87cfe',
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
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-common-pattern-6","original_type":"open-ended","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.684Z',
      '2025-10-21T22:21:12.684Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '924f199b-6167-4954-9051-e42f48871aec',
      'Best Use Case',
      'When is it appropriate to use the Common Pattern?',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'For very small apps or scripts where only one or two objects are needed. When performance and scalability aren’t concerns.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-common-pattern-7","original_type":"open-ended","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.684Z',
      '2025-10-21T22:21:12.684Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '4686385c-e798-482f-a2b3-2aa18ae41152',
      'Transition to Other Patterns',
      'Why do developers often move from the Common Pattern to the Factory Pattern or Constructor Pattern?',
      'multiple-choice',
      'advanced',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'Because as applications grow, manually creating objects becomes repetitive and hard to maintain. Factories and constructors provide abstraction and scalability.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','advanced']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-common-pattern-8","original_type":"open-ended","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.684Z',
      '2025-10-21T22:21:12.684Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'ef0249e3-1d6b-4407-8f7a-bbf77a799f5f',
      'Definition of Factory Pattern',
      'What is the Factory Pattern in JavaScript?',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'It’s a design pattern where a function (factory function) creates and returns objects without using the `new` keyword. It provides an abstraction for object creation.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','factory-pattern','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-factory-pattern-9","original_type":"open-ended","topic":"Factory Pattern","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.685Z',
      '2025-10-21T22:21:12.686Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'a6226bb1-d153-4d01-9918-205d0ab33237',
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
      'c',
      'The correct answer is: John Doe',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-factory-pattern-10","original_type":"multiple-choice","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.686Z',
      '2025-10-21T22:21:12.686Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '9ce5ee57-95ee-4860-b041-cb1e70fed4bf',
      'Pros of Factory Pattern',
      'Which of the following are benefits of using the Factory Pattern?',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"Encapsulation of object creation","isCorrect":true,"explanation":""},{"id":"b","text":"Easier to configure objects dynamically","isCorrect":true,"explanation":""},{"id":"c","text":"No need to repeat object structure","isCorrect":true,"explanation":""},{"id":"d","text":"Faster performance than constructors","isCorrect":false,"explanation":""}]',
      'c',
      'The correct answer is: Encapsulation of object creation',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-factory-pattern-11","original_type":"multiple-choice","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.686Z',
      '2025-10-21T22:21:12.686Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '6965b9f6-5a05-4d32-b95e-238fea5e8e26',
      'Cons of Factory Pattern',
      'What is a major drawback of using the Factory Pattern in JavaScript?',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'It can be less memory efficient since new objects are created each time without shared methods. May add unnecessary abstraction for simple cases.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-factory-pattern-12","original_type":"open-ended","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.686Z',
      '2025-10-21T22:21:12.686Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '2eef3b31-6054-455a-be01-7395cc625088',
      'When to Use',
      'When should the Factory Pattern be used instead of the Common Pattern?',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'When creating many similar objects that need custom configurations. When object creation depends on environment or dynamic input.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-factory-pattern-13","original_type":"open-ended","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.686Z',
      '2025-10-21T22:21:12.686Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '2fe0479f-e0a4-452c-ae57-e6de84afc4cc',
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
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-factory-pattern-14","original_type":"open-ended","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.686Z',
      '2025-10-21T22:21:12.686Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '297617ab-1f6a-44ee-bc41-74598dac15ad',
      'Comparison with Constructor Pattern',
      'How does the Factory Pattern differ from the Constructor Pattern in JavaScript?',
      'multiple-choice',
      'advanced',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'Factory Pattern uses plain functions to return objects, while Constructor Pattern uses classes or functions with `new`. Factories don’t require `this` or `new` keyword.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','advanced']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-factory-pattern-15","original_type":"open-ended","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.686Z',
      '2025-10-21T22:21:12.686Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'ed5f7407-c3e2-48bb-ac97-b727ff010726',
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
      'c',
      'The correct answer is: { name: "Alice" }',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-factory-pattern-16","original_type":"multiple-choice","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.686Z',
      '2025-10-21T22:21:12.686Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '10046ec4-d44d-4d2f-a943-dbcb90c454a9',
      'Definition of Flyweight Pattern',
      'What is the Flyweight Pattern, and why is it useful?',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'It’s a structural design pattern that minimizes memory usage by sharing common object data instead of creating duplicates. It’s useful when creating a large number of similar objects, e.g., books with the same ISBN.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','flyweight-pattern','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-flyweight-pattern-17","original_type":"open-ended","topic":"Flyweight Pattern","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.688Z',
      '2025-10-21T22:21:12.688Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '211a13f1-a0d5-4272-9a15-a89648f10088',
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
      'c',
      'The correct answer is: Total amount of copies: 5, Total amount of books: 3',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-flyweight-pattern-18","original_type":"multiple-choice","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.688Z',
      '2025-10-21T22:21:12.688Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'be9ed4b4-78d6-4a83-bafb-1379f48901d3',
      'Advantages of Flyweight Pattern',
      'Which of the following are advantages of the Flyweight Pattern?',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"Reduced memory usage by reusing objects","isCorrect":true,"explanation":""},{"id":"b","text":"Improved performance for large-scale applications","isCorrect":true,"explanation":""},{"id":"c","text":"Simplifies debugging","isCorrect":false,"explanation":""},{"id":"d","text":"Reduces network latency","isCorrect":false,"explanation":""}]',
      'c',
      'The correct answer is: Reduced memory usage by reusing objects',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-flyweight-pattern-19","original_type":"multiple-choice","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.688Z',
      '2025-10-21T22:21:12.688Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '9ca56304-35f5-45db-a47f-32bfadef4b3c',
      'Disadvantages of Flyweight Pattern',
      'What is a drawback of using the Flyweight Pattern?',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'It can increase code complexity by adding an extra layer of object management. Modern hardware often has enough memory, so the benefit may be negligible in many applications.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-flyweight-pattern-20","original_type":"open-ended","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.688Z',
      '2025-10-21T22:21:12.688Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'e5825a12-1fc0-41f4-9b01-fde2e05041be',
      'Flyweight vs Factory Pattern',
      'How does the Flyweight Pattern differ from the Factory Pattern?',
      'multiple-choice',
      'advanced',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'Factory Pattern abstracts object creation, while Flyweight Pattern focuses on sharing existing objects to save memory. Factory decides *how* to create, Flyweight decides *whether to reuse*.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','advanced']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-flyweight-pattern-21","original_type":"open-ended","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.688Z',
      '2025-10-21T22:21:12.688Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '96366962-2c14-44e3-b580-96687437457f',
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
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','advanced']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-flyweight-pattern-22","original_type":"open-ended","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.688Z',
      '2025-10-21T22:21:12.688Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '34f5678b-3ae0-47d9-95c4-48b7ca7a246d',
      'When to Use Flyweight',
      'In which situation would the Flyweight Pattern be the best choice?',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"When creating thousands of objects that share common properties","isCorrect":true,"explanation":""},{"id":"b","text":"When creating a single instance of a service","isCorrect":false,"explanation":""},{"id":"c","text":"When caching API responses","isCorrect":false,"explanation":""},{"id":"d","text":"When setting up event delegation in DOM","isCorrect":false,"explanation":""}]',
      'c',
      'The correct answer is: When creating thousands of objects that share common properties',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-flyweight-pattern-23","original_type":"multiple-choice","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.688Z',
      '2025-10-21T22:21:12.688Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'c13edeaf-a2b4-4eaa-bcd5-75eaae01ecf5',
      'Flyweight Pattern in Modern JS',
      'Why is the Flyweight Pattern considered less critical in modern JavaScript applications compared to older times?',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'Because modern devices have large amounts of memory (RAM), so optimizing object count is less often necessary. JavaScript engines also optimize memory allocation internally.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-flyweight-pattern-24","original_type":"open-ended","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.688Z',
      '2025-10-21T22:21:12.688Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '6db93df7-1114-4500-9564-26c779e75173',
      'Definition of Mediator Pattern',
      'What is the Mediator Pattern, and why is it useful?',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'It’s a behavioral design pattern that centralizes communication between objects instead of letting them reference each other directly. It reduces many-to-many relationships into one-to-many, improving code organization and reducing coupling.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','mediator-pattern','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-mediator-pattern-25","original_type":"open-ended","topic":"Mediator Pattern","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.689Z',
      '2025-10-21T22:21:12.689Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '8add29fe-fda6-4cfa-b9ab-12da8e2a325f',
      'Mediator Pattern Analogy',
      'Which analogy best describes the Mediator Pattern?',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"A librarian managing which books readers can borrow","isCorrect":false,"explanation":""},{"id":"b","text":"An air traffic controller guiding planes so they don’t talk to each other directly","isCorrect":true,"explanation":""},{"id":"c","text":"A teacher grading exams","isCorrect":false,"explanation":""},{"id":"d","text":"A vending machine dispensing products","isCorrect":false,"explanation":""}]',
      'c',
      'The correct answer is: An air traffic controller guiding planes so they don’t talk to each other directly',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-mediator-pattern-26","original_type":"multiple-choice","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.689Z',
      '2025-10-21T22:21:12.689Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '44258719-ad69-4ef9-aacb-7d0db06242f8',
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
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-mediator-pattern-27","original_type":"open-ended","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.689Z',
      '2025-10-21T22:21:12.689Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '17b525e9-75d4-49c0-8ee2-fe97ecdd4cd7',
      'Express Middleware as Mediator',
      'How does Express.js middleware act as a mediator in the request-response cycle?',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'Middleware functions act as mediators by receiving requests, modifying them, and passing them along to the next function in the chain. They centralize control, preventing each handler from directly depending on others.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-mediator-pattern-28","original_type":"open-ended","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.689Z',
      '2025-10-21T22:21:12.689Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '28639369-2a2b-4d69-b3b2-82da1bb3cb86',
      'Advantages of Mediator Pattern',
      'Which of the following are advantages of using the Mediator Pattern?',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"Reduces coupling between components","isCorrect":true,"explanation":""},{"id":"b","text":"Simplifies many-to-many relationships","isCorrect":true,"explanation":""},{"id":"c","text":"Always improves performance","isCorrect":false,"explanation":""},{"id":"d","text":"Provides a single point of communication","isCorrect":true,"explanation":""}]',
      'c',
      'The correct answer is: Reduces coupling between components',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-mediator-pattern-29","original_type":"multiple-choice","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.689Z',
      '2025-10-21T22:21:12.689Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'a8a90d2a-c241-4a28-8184-cac047644887',
      'Disadvantages of Mediator Pattern',
      'What is a potential disadvantage of the Mediator Pattern?',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'The mediator can become a God Object if it grows too complex, containing too much business logic. It introduces an extra layer of indirection, which can make debugging harder.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-mediator-pattern-30","original_type":"open-ended","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.689Z',
      '2025-10-21T22:21:12.689Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '3b0927d1-65aa-401c-baac-64de8027423e',
      'Mediator vs Observer',
      'How does the Mediator Pattern differ from the Observer Pattern?',
      'multiple-choice',
      'advanced',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'Observer Pattern is event-driven, where subscribers listen to changes. Mediator centralizes interactions by routing communication between participants. Mediator reduces direct object references, Observer reduces direct polling.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','advanced']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-mediator-pattern-31","original_type":"open-ended","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.689Z',
      '2025-10-21T22:21:12.689Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'f8982faf-e445-41df-aecd-4a486540f632',
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
      'c',
      'The correct answer is: Request has test header: true',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-mediator-pattern-32","original_type":"multiple-choice","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.689Z',
      '2025-10-21T22:21:12.689Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'a812fbbb-fee0-4d83-98ba-3d1aa96e8fe1',
      'Definition of Mixin Pattern',
      'What is the Mixin Pattern and why is it used?',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'A mixin is an object containing reusable functionality that can be added to another object or class without inheritance. It allows sharing behavior across classes without forming rigid inheritance hierarchies.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','mixin-pattern','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-mixin-pattern-33","original_type":"open-ended","topic":"Mixin Pattern","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.690Z',
      '2025-10-21T22:21:12.690Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '8bcd1c9d-4a25-4413-8064-888c9904ddea',
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
      'c',
      'The correct answer is: Woof!',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-mixin-pattern-34","original_type":"multiple-choice","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.690Z',
      '2025-10-21T22:21:12.690Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '07c15d3a-cdb1-4246-beec-4ce5b6892fb2',
      'Mixins vs Inheritance',
      'How does the Mixin Pattern differ from classical inheritance?',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'Inheritance creates a parent-child relationship between classes, while mixins simply copy functionality into another class. Mixins allow horizontal code reuse across unrelated classes, inheritance enforces vertical hierarchy.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-mixin-pattern-35","original_type":"open-ended","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.690Z',
      '2025-10-21T22:21:12.690Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '33d08a04-37f9-4533-86b1-d521b4b6da37',
      'Chaining Mixins',
      'In the example with `animalFunctionality` and `dogFunctionality`, why does Dog end up with both `bark()` and `walk()` methods?',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'Because `Object.assign(dogFunctionality, animalFunctionality)` merged animal methods into dogFunctionality, then `Object.assign(Dog.prototype, dogFunctionality)` added all methods to Dog’s prototype. This effectively chained multiple mixins together.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-mixin-pattern-36","original_type":"open-ended","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.690Z',
      '2025-10-21T22:21:12.690Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '940fbc21-8ef2-4608-8bfe-e7fe95cc8c85',
      'Real World Browser Example',
      'Which of the following are examples of mixins in the browser Window object?',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"setTimeout and setInterval (from WindowOrWorkerGlobalScope)","isCorrect":true,"explanation":""},{"id":"b","text":"onbeforeunload (from WindowEventHandlers)","isCorrect":true,"explanation":""},{"id":"c","text":"document.querySelector","isCorrect":false,"explanation":""},{"id":"d","text":"console.log","isCorrect":false,"explanation":""}]',
      'c',
      'The correct answer is: setTimeout and setInterval (from WindowOrWorkerGlobalScope)',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-mixin-pattern-37","original_type":"multiple-choice","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.690Z',
      '2025-10-21T22:21:12.690Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '78199a2f-9949-4328-91d8-550f9572dbbb',
      'Disadvantages of Mixins',
      'What are potential disadvantages of using Mixins?',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'They can cause prototype pollution, making it unclear where a function originated. They can introduce naming conflicts if two mixins define the same property. In React, they added complexity, leading the team to recommend HOCs and Hooks instead.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-mixin-pattern-38","original_type":"open-ended","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.690Z',
      '2025-10-21T22:21:12.690Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'd922295e-1f0d-45c8-aab7-c7e1a9792fd6',
      'Mixin vs Higher Order Components',
      'Why did React discourage mixins in favor of Higher Order Components (HOCs) and later Hooks?',
      'multiple-choice',
      'advanced',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'Mixins often lead to implicit dependencies and complexity, while HOCs and Hooks are more explicit, composable, and predictable. Hooks allow better reusability and cleaner separation of concerns than mixins.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','advanced']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-mixin-pattern-39","original_type":"open-ended","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.690Z',
      '2025-10-21T22:21:12.690Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '718d58e0-8755-4ea2-a375-031c6a3e7d8d',
      'Debugging Mixins',
      'If you accidentally overwrite a method from another mixin when using `Object.assign`, what will happen?',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"Both methods are preserved","isCorrect":false,"explanation":""},{"id":"b","text":"The last assigned method overwrites the previous one","isCorrect":true,"explanation":""},{"id":"c","text":"JavaScript throws an error","isCorrect":false,"explanation":""}]',
      'c',
      'The correct answer is: The last assigned method overwrites the previous one',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-mixin-pattern-40","original_type":"multiple-choice","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.690Z',
      '2025-10-21T22:21:12.690Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '9d78af40-3638-42c3-995f-ffb61ca55a0c',
      'Definition of Module Pattern',
      'What is the Module Pattern in JavaScript and why is it used?',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'The Module Pattern is a design pattern that uses closures to create private and public encapsulation. It is used to avoid polluting the global scope and to create reusable, maintainable code structures.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-module-pattern-41","original_type":"open-ended","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.690Z',
      '2025-10-21T22:21:12.690Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'd7cbfd0d-20a5-49c9-9de2-ef4006f5f7b5',
      'Basic Module Syntax',
      'Which of the following correctly implements a simple Module Pattern in JavaScript?',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"function Module() { var x = 10; return x; }","isCorrect":false,"explanation":""},{"id":"b","text":"var Module = (function(){ var privateVar = 10; return { get: function(){ return privateVar; } }; })();","isCorrect":true,"explanation":""},{"id":"c","text":"let Module = class { constructor(){ this.x = 10; } }","isCorrect":false,"explanation":""}]',
      'c',
      'The correct answer is: var Module = (function(){ var privateVar = 10; return { get: function(){ return privateVar; } }; })();',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-module-pattern-42","original_type":"multiple-choice","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.690Z',
      '2025-10-21T22:21:12.690Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '913131d6-9cc0-4ea3-af3a-1f3ad2c236dd',
      'Encapsulation in Module Pattern',
      'How does the Module Pattern achieve encapsulation?',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'By using an Immediately Invoked Function Expression (IIFE) to create a private scope. Only the returned object exposes public members, while variables/functions inside the closure remain private.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-module-pattern-43","original_type":"open-ended","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.690Z',
      '2025-10-21T22:21:12.690Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '4ae99cf3-2dc0-4f1b-9465-4f5f4cb0b55e',
      'Drawback of Module Pattern',
      'Which of the following is a drawback of the Module Pattern?',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"It makes code modular and organized","isCorrect":false,"explanation":""},{"id":"b","text":"Private members cannot be accessed or modified without changing the original module","isCorrect":true,"explanation":""},{"id":"c","text":"It always requires classes","isCorrect":false,"explanation":""}]',
      'c',
      'The correct answer is: Private members cannot be accessed or modified without changing the original module',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-module-pattern-44","original_type":"multiple-choice","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.690Z',
      '2025-10-21T22:21:12.690Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'd6b4f27d-1bf5-42bf-8ddd-2945c2be1348',
      'Revealing Module Pattern',
      'What is the difference between the classic Module Pattern and the Revealing Module Pattern?',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'The Revealing Module Pattern maps private functions/variables to a returned object explicitly, improving readability. It makes it clear which functions are public and which remain private.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-module-pattern-45","original_type":"open-ended","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.690Z',
      '2025-10-21T22:21:12.690Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '5a35f2dc-ea34-4b91-b752-4800eb53e5ce',
      'Debugging Modules',
      'If you forget to return a method in your Module Pattern, what will happen?',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"The method is still accessible globally","isCorrect":false,"explanation":""},{"id":"b","text":"The method remains private and cannot be accessed outside","isCorrect":true,"explanation":""},{"id":"c","text":"JavaScript throws a syntax error","isCorrect":false,"explanation":""}]',
      'c',
      'The correct answer is: The method remains private and cannot be accessed outside',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-module-pattern-46","original_type":"multiple-choice","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.690Z',
      '2025-10-21T22:21:12.690Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '26448ae5-99b4-4207-86d5-19f582dd119d',
      'Module Pattern vs ES6 Modules',
      'How does the Module Pattern differ from ES6 Modules?',
      'multiple-choice',
      'advanced',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'Module Pattern relies on closures and IIFEs for encapsulation, while ES6 Modules are built-in language features with `import` and `export`. ES6 Modules are statically analyzed at compile time, while Module Pattern modules are runtime constructs.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','advanced']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-module-pattern-47","original_type":"open-ended","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.690Z',
      '2025-10-21T22:21:12.690Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '8f5d0c12-4d72-44e6-9229-623f126ddd78',
      'Use Case of Module Pattern',
      'Which scenario is best suited for the Module Pattern?',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"When you want to encapsulate private state in legacy JavaScript without ES6 support","isCorrect":true,"explanation":""},{"id":"b","text":"When you need dynamic imports and tree-shaking","isCorrect":false,"explanation":""},{"id":"c","text":"When you only work with classes","isCorrect":false,"explanation":""}]',
      'c',
      'The correct answer is: When you want to encapsulate private state in legacy JavaScript without ES6 support',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-module-pattern-48","original_type":"multiple-choice","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.690Z',
      '2025-10-21T22:21:12.690Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '835ea354-8e45-4b91-a80f-51254ccece3e',
      'Definition of Observer Pattern',
      'What is the Observer Pattern and why is it useful in JavaScript applications?',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'The Observer Pattern allows objects (observers) to subscribe to another object (observable) so they get notified when events occur. It’s useful because it enables decoupling and supports event-driven programming.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-observer-pattern-49","original_type":"open-ended","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.691Z',
      '2025-10-21T22:21:12.691Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '1706eeac-35f9-43f3-ab05-dc56de36d233',
      'Core Components of Observer Pattern',
      'Which three components are essential in the Observer Pattern implementation?',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"Publisher, renderer, transformer","isCorrect":false,"explanation":""},{"id":"b","text":"Observers, subscribe/unsubscribe, notify","isCorrect":true,"explanation":""},{"id":"c","text":"State, reducer, dispatcher","isCorrect":false,"explanation":""},{"id":"d","text":"Model, view, controller","isCorrect":false,"explanation":""}]',
      'c',
      'The correct answer is: Observers, subscribe/unsubscribe, notify',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-observer-pattern-50","original_type":"multiple-choice","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.691Z',
      '2025-10-21T22:21:12.691Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'a8b8a796-bb49-41c9-a1cc-9cb3a79bac7f',
      'Observer Pattern in React',
      'In the example provided, which functions act as observers when subscribed to the observable?',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"handleClick and handleToggle","isCorrect":false,"explanation":""},{"id":"b","text":"logger and toastify","isCorrect":true,"explanation":""},{"id":"c","text":"Button and Switch components","isCorrect":false,"explanation":""},{"id":"d","text":"React lifecycle methods","isCorrect":false,"explanation":""}]',
      'c',
      'The correct answer is: logger and toastify',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-observer-pattern-51","original_type":"multiple-choice","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.691Z',
      '2025-10-21T22:21:12.691Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '1e4ebd6b-18f9-46a8-b5df-a31c3b6bdea9',
      'Observable Notifications',
      'What happens when the observable''s notify() method is called?',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'It loops through the observers list and invokes each subscribed function with the provided data. All observers receive the event data at the same time.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-observer-pattern-52","original_type":"open-ended","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.691Z',
      '2025-10-21T22:21:12.691Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'fa1858c4-80eb-4351-a713-875bb7ea0d11',
      'Practical Use Case',
      'Which scenario is a good use case for the Observer Pattern?',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"Notifying multiple UI components when new messages arrive","isCorrect":true,"explanation":""},{"id":"b","text":"Rendering static content with no user interaction","isCorrect":false,"explanation":""},{"id":"c","text":"Compiling JavaScript code to ES5","isCorrect":false,"explanation":""},{"id":"d","text":"Sorting a list of numbers","isCorrect":false,"explanation":""}]',
      'c',
      'The correct answer is: Notifying multiple UI components when new messages arrive',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-observer-pattern-53","original_type":"multiple-choice","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.692Z',
      '2025-10-21T22:21:12.692Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '275e6a10-3bb0-46cb-850b-6b0442b25682',
      'Observer Pattern vs Pub/Sub',
      'What is the key difference between the Observer Pattern and the Publish/Subscribe (Pub/Sub) pattern?',
      'multiple-choice',
      'advanced',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'In Observer, observers subscribe directly to the observable, creating tight coupling. In Pub/Sub, a mediator (event bus) manages communication, decoupling publishers and subscribers.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','advanced']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-observer-pattern-54","original_type":"open-ended","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.692Z',
      '2025-10-21T22:21:12.692Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '73c5569a-33f3-4766-b1ab-ffa7b9f777e7',
      'Observer Pattern in RxJS',
      'Which popular JavaScript library uses the Observer Pattern extensively?',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"Redux","isCorrect":false,"explanation":""},{"id":"b","text":"Axios","isCorrect":false,"explanation":""},{"id":"c","text":"RxJS","isCorrect":true,"explanation":""},{"id":"d","text":"Styled Components","isCorrect":false,"explanation":""}]',
      'c',
      'The correct answer is: RxJS',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-observer-pattern-55","original_type":"multiple-choice","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.692Z',
      '2025-10-21T22:21:12.692Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'cb645945-6f66-4c66-a407-be239662f367',
      'Performance Concern',
      'What is one potential drawback of the Observer Pattern?',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"Observers cannot be removed once added","isCorrect":false,"explanation":""},{"id":"b","text":"Too many or complex observers can cause performance issues during notifications","isCorrect":true,"explanation":""},{"id":"c","text":"Observable cannot notify multiple observers at once","isCorrect":false,"explanation":""},{"id":"d","text":"It cannot work with asynchronous data","isCorrect":false,"explanation":""}]',
      'c',
      'The correct answer is: Too many or complex observers can cause performance issues during notifications',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-observer-pattern-56","original_type":"multiple-choice","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.692Z',
      '2025-10-21T22:21:12.692Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'b757c98d-0c44-4ed5-9c1e-6e17ab4cfc07',
      'Definition of Prototype Pattern',
      'What is the Prototype Pattern and why is it useful in JavaScript?',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'The Prototype Pattern allows objects to share properties and methods through the prototype chain. It avoids duplication and reduces memory usage by letting instances inherit methods from the prototype instead of redefining them.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-prototype-pattern-57","original_type":"open-ended","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.692Z',
      '2025-10-21T22:21:12.692Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '1e6aa7c6-2e73-4f94-bb7d-1b2371534b17',
      'Prototype vs Instance Properties',
      'In the Dog class example, where is the bark() method stored?',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"On each Dog instance","isCorrect":false,"explanation":""},{"id":"b","text":"On Dog.prototype, shared by all instances","isCorrect":true,"explanation":""},{"id":"c","text":"Inside the Dog constructor","isCorrect":false,"explanation":""},{"id":"d","text":"In the global window object","isCorrect":false,"explanation":""}]',
      'c',
      'The correct answer is: On Dog.prototype, shared by all instances',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-prototype-pattern-58","original_type":"multiple-choice","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.692Z',
      '2025-10-21T22:21:12.692Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'e5e255cb-6475-4fd4-b242-694e775c78ee',
      'Adding Properties Dynamically',
      'If you add Dog.prototype.play after creating instances, will existing instances have access to play()?',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"Yes, because all instances reference the same prototype","isCorrect":true,"explanation":""},{"id":"b","text":"No, only future instances get it","isCorrect":false,"explanation":""},{"id":"c","text":"It depends on whether the object was frozen","isCorrect":false,"explanation":""},{"id":"d","text":"JavaScript throws an error","isCorrect":false,"explanation":""}]',
      'c',
      'The correct answer is: Yes, because all instances reference the same prototype',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-prototype-pattern-59","original_type":"multiple-choice","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.692Z',
      '2025-10-21T22:21:12.692Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '24e17cf9-025c-4d41-ad7f-afcb4dd68b19',
      'Prototype Chain',
      'How does JavaScript resolve a property that isn’t found directly on an object?',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'It traverses the prototype chain via __proto__ until it finds the property or reaches null. This process is called prototype chaining.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-prototype-pattern-60","original_type":"open-ended","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.692Z',
      '2025-10-21T22:21:12.692Z'
    );

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
      ARRAY[]::jsonb[],
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
      ARRAY[]::jsonb[],
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
      ARRAY[]::jsonb[],
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
      ARRAY[]::jsonb[],
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
      ARRAY[]::jsonb[],
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
      ARRAY[]::jsonb[],
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
      ARRAY[]::jsonb[],
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
      ARRAY[]::jsonb[],
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
      ARRAY[]::jsonb[],
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
      ARRAY[]::jsonb[],
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
      ARRAY[]::jsonb[],
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
      ARRAY[]::jsonb[],
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
      ARRAY[]::jsonb[],
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
      ARRAY[]::jsonb[],
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
      ARRAY[]::jsonb[],
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
      ARRAY[]::jsonb[],
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
      ARRAY[]::jsonb[],
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
      ARRAY[]::jsonb[],
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
      ARRAY[]::jsonb[],
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
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-proxy-pattern-71","original_type":"multiple-choice","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.693Z',
      '2025-10-21T22:21:12.693Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'e43ec5f2-a67e-488a-ad02-1367254a4736',
      'Reflect with Proxies',
      'What is the role of the `Reflect` object when working with Proxies, and why is it preferred over direct property access?',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'No explanation provided.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-proxy-pattern-72","original_type":"open-ended","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.693Z',
      '2025-10-21T22:21:12.693Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'af5af989-a0c1-4d79-b3a3-6a7e55a33bf9',
      'Refactoring Proxy with Reflect',
      'Rewrite this Proxy handler to use `Reflect.get` and `Reflect.set` instead of direct object manipulation.',
      'multiple-choice',
      'advanced',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'No explanation provided.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','advanced']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-proxy-pattern-73","original_type":"code","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.693Z',
      '2025-10-21T22:21:12.693Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'caaefebc-e461-4bcc-8414-c81f1e9a8ee8',
      'Proxy Use Cases',
      'Which of the following are valid use cases for the Proxy pattern?',
      'multiple-choice',
      'intermediate',
      10,
      '[{"0":"V","1":"a","2":"l","3":"i","4":"d","5":"a","6":"t","7":"i","8":"o","9":"n","10":" ","11":"o","12":"f","13":" ","14":"o","15":"b","16":"j","17":"e","18":"c","19":"t","20":" ","21":"p","22":"r","23":"o","24":"p","25":"e","26":"r","27":"t","28":"i","29":"e","30":"s","explanation":""},{"0":"D","1":"e","2":"b","3":"u","4":"g","5":"g","6":"i","7":"n","8":"g","9":" ","10":"a","11":"n","12":"d","13":" ","14":"l","15":"o","16":"g","17":"g","18":"i","19":"n","20":"g","explanation":""},{"0":"F","1":"o","2":"r","3":"m","4":"a","5":"t","6":"t","7":"i","8":"n","9":"g","10":" ","11":"d","12":"a","13":"t","14":"a","15":" ","16":"b","17":"e","18":"f","19":"o","20":"r","21":"e","22":" ","23":"r","24":"e","25":"t","26":"u","27":"r","28":"n","explanation":""},{"0":"P","1":"e","2":"r","3":"f","4":"o","5":"r","6":"m","7":"a","8":"n","9":"c","10":"e","11":" ","12":"o","13":"p","14":"t","15":"i","16":"m","17":"i","18":"z","19":"a","20":"t","21":"i","22":"o","23":"n","24":" ","25":"i","26":"n","27":" ","28":"c","29":"r","30":"i","31":"t","32":"i","33":"c","34":"a","35":"l","36":" ","37":"c","38":"o","39":"d","40":"e","explanation":""}]',
      'c',
      'No explanation provided.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-proxy-pattern-74","original_type":"multiple-choice","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.693Z',
      '2025-10-21T22:21:12.693Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '0f409381-a0fa-4c30-811a-f28891298d4d',
      'Tradeoffs of Proxy',
      'What are the performance tradeoffs of using Proxy objects in large applications?',
      'multiple-choice',
      'advanced',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'No explanation provided.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','advanced']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-proxy-pattern-75","original_type":"open-ended","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.693Z',
      '2025-10-21T22:21:12.693Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '2ae2b7a3-a25d-434f-84e3-a2cda5f1f414',
      'Singleton Basics',
      'What is the main purpose of the Singleton Pattern in JavaScript?',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'To ensure only one instance of a class or object exists and provide a global point of access to it. It’s often used for managing global state across an application.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-singleton-pattern-76","original_type":"open-ended","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.694Z',
      '2025-10-21T22:21:12.694Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '1fc00561-3761-40e2-bae0-5c181ce9374f',
      'Non-Singleton Counter',
      'Why does the initial Counter class implementation in the example fail to meet the Singleton requirements?',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'Because multiple instances can still be created using the `new` keyword. The getInstance method doesn’t enforce a single instance.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-singleton-pattern-77","original_type":"open-ended","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.694Z',
      '2025-10-21T22:21:12.694Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'e32b9830-dcc2-49f4-94cf-499526885738',
      'Enforcing a Singleton',
      'How does introducing a private `instance` variable in the constructor ensure only one instance of the class can exist?',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'It checks if an instance already exists and throws an error on subsequent instantiations. This prevents creating multiple instances with `new`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-singleton-pattern-78","original_type":"open-ended","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.694Z',
      '2025-10-21T22:21:12.694Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'c3c04150-3d87-4444-bdc1-df2e5f1c440c',
      'Object.freeze in Singleton',
      'What is the purpose of using `Object.freeze` on a Singleton instance?',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"Prevents modification of the Singleton’s properties","isCorrect":true,"explanation":""},{"id":"b","text":"Allows multiple instances to be created","isCorrect":false,"explanation":""},{"id":"c","text":"Automatically resets the Singleton","isCorrect":false,"explanation":""}]',
      'c',
      'The correct answer is: Prevents modification of the Singleton’s properties',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-singleton-pattern-79","original_type":"multiple-choice","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.694Z',
      '2025-10-21T22:21:12.694Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'f22aa757-2054-474e-8246-69c05f2d945e',
      'Singleton in Multiple Modules',
      'In the redButton.js and blueButton.js example, why does clicking either button increment the same counter?',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'Because both modules import the same frozen Singleton instance, which is shared globally. The counter state lives in one place and is referenced everywhere.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-singleton-pattern-80","original_type":"open-ended","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.694Z',
      '2025-10-21T22:21:12.694Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '4a7a590f-380d-4e6c-8c86-bc532d8b4dea',
      'Singleton vs Object Literal',
      'Why might using a simple object literal sometimes be a better option than implementing a Singleton class in JavaScript?',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'Because JavaScript objects are naturally passed by reference, so a single object can already behave like a Singleton. Using a class adds unnecessary complexity if you don’t need instantiation control.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-singleton-pattern-81","original_type":"open-ended","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.694Z',
      '2025-10-21T22:21:12.694Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '2e023e97-31c9-4db1-b508-f7a0cbdd2bf4',
      'Testing Challenges',
      'Why can Singletons be difficult to test?',
      'multiple-choice',
      'advanced',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'All tests share the same instance, so modifications in one test affect others. Resetting state between tests can be cumbersome and error-prone.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','advanced']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-singleton-pattern-82","original_type":"open-ended","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.694Z',
      '2025-10-21T22:21:12.694Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '4055203a-8902-468e-9e23-9f9341d65a2b',
      'Global Behavior',
      'How is the behavior of a Singleton similar to that of a global variable?',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"Both are accessible throughout the application","isCorrect":true,"explanation":""},{"id":"b","text":"Both prevent mutation of values","isCorrect":false,"explanation":""},{"id":"c","text":"Both are automatically garbage collected","isCorrect":false,"explanation":""}]',
      'c',
      'The correct answer is: Both are accessible throughout the application',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-singleton-pattern-83","original_type":"multiple-choice","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.694Z',
      '2025-10-21T22:21:12.694Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'a6df5e6c-072f-4f8b-be81-fdeaf9f6fa0f',
      'Drawbacks of Singletons',
      'What are some disadvantages of using the Singleton pattern in large JavaScript applications?',
      'multiple-choice',
      'advanced',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'It introduces hidden dependencies across the codebase. It makes testing harder due to shared mutable state. It can act like a global variable, leading to unexpected coupling.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','advanced']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-singleton-pattern-84","original_type":"open-ended","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.694Z',
      '2025-10-21T22:21:12.694Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'bb7b07a0-aa20-434d-8832-263a2d834615',
      'Singleton Alternatives in React',
      'What are common alternatives to using Singletons for global state in React applications?',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'React Context API State management libraries such as Redux, Zustand, or MobX.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-singleton-pattern-85","original_type":"open-ended","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.694Z',
      '2025-10-21T22:21:12.694Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '5a39680b-87a5-44d6-a13f-1dccbe88f3b2',
      'What is Static Import in JavaScript modules?',
      'Static Import uses the ES2015 `import` keyword to bring in code from another module. These imports are bundled at build time and included in the initial JavaScript bundle, meaning they are executed as soon as the module is loaded.',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'No explanation provided.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-static-import-57","original_type":"mcq","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.695Z',
      '2025-10-21T22:21:12.695Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '71a26589-3d71-4e33-97e8-0d32f8f47495',
      'How does static import affect bundle size and performance?',
      'All statically imported modules are bundled into the main JavaScript file (e.g., `main.bundle.js` in Webpack). Larger bundles can slow down initial page load, since the browser must download, parse, and execute everything before rendering the UI.',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'Static imports increase bundle size since everything is loaded upfront. They can hurt performance by delaying time-to-interactive, especially on slow networks or devices. Using too many static imports for rarely used components leads to wasted resources.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-static-import-58","original_type":"open-ended","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.695Z',
      '2025-10-21T22:21:12.695Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '2bbf81a1-ded5-4e8e-9564-c6dd5ccb04cf',
      'In the chat app example, which components were statically imported?',
      'In the given example, the `App` component statically imports `UserInfo`, `ChatList`, and `ChatInput`. The `ChatInput` component itself statically imports `EmojiPicker`.',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'No explanation provided.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-static-import-59","original_type":"mcq","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.695Z',
      '2025-10-21T22:21:12.695Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '661ed0e4-c4f4-4352-a645-03fae0089534',
      'What is the main drawback of using only static imports in a React app?',
      'If every component and dependency is statically imported, the initial bundle can become very large. This delays rendering since the browser must download and parse all modules before showing any content.',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'Slower initial load due to larger bundle size. Worse performance on mobile or slow networks. Even components not immediately needed are still loaded upfront.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-static-import-60","original_type":"open-ended","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.695Z',
      '2025-10-21T22:21:12.695Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '874c5f1f-f8e0-4215-8713-3d1bc58d15ad',
      'How does Webpack handle static imports?',
      'Webpack bundles all statically imported modules into the main bundle file. For example, `main.bundle.js` might include every statically imported component from the source code.',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'No explanation provided.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-static-import-61","original_type":"mcq","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.695Z',
      '2025-10-21T22:21:12.695Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '6714b708-dab0-4292-a189-d73e1e641c1e',
      'When should you avoid static imports?',
      'Avoid static imports for components that are not immediately necessary on page load, such as modals, tooltips, or rarely used features. Instead, load them dynamically to improve performance.',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'When the component is behind a user action (e.g., clicking a button). When the component is not critical for the initial render. When optimizing for smaller bundle sizes and faster loads.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-static-import-62","original_type":"open-ended","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.695Z',
      '2025-10-21T22:21:12.695Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '58077c09-1f0d-43b2-a6f6-0cde2af7421e',
      'Compare Static Import vs Dynamic Import.',
      'Static import loads all modules upfront at build time, increasing initial bundle size. Dynamic import (`import()`) loads modules only when needed (e.g., on user interaction), improving load performance but adding runtime overhead.',
      'multiple-choice',
      'advanced',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'Static imports are eager, dynamic imports are lazy. Static imports bundle everything, dynamic imports support code-splitting. Static imports run immediately, dynamic imports return a promise.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','advanced']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-static-import-63","original_type":"open-ended","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.695Z',
      '2025-10-21T22:21:12.695Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '0fe47939-e7c0-4ce0-af89-2a37915a8aff',
      'What performance optimization can replace some static imports in the chat app example?',
      'Instead of statically importing the `EmojiPicker`, we can dynamically import it when the user opens the emoji panel. This reduces initial bundle size and speeds up app load.',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
      'c',
      'No explanation provided.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-static-import-64","original_type":"mcq","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.695Z',
      '2025-10-21T22:21:12.695Z'
    );