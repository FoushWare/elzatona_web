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
      ARRAY[]::text[],
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
      ARRAY[]::text[],
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
      ARRAY[]::text[],
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
      ARRAY[]::text[],
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
      ARRAY[]::text[],
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
      ARRAY[]::text[],
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
      ARRAY[]::text[],
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
      ARRAY[]::text[],
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
      ARRAY[]::text[],
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
      ARRAY[]::text[],
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
      ARRAY[]::text[],
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
      ARRAY[]::text[],
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
      ARRAY[]::text[],
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
      ARRAY[]::text[],
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
      ARRAY[]::text[],
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
      ARRAY[]::text[],
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
      ARRAY[]::text[],
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
      ARRAY[]::text[],
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
      ARRAY[]::text[],
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
      ARRAY[]::text[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-flyweight-pattern-20","original_type":"open-ended","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.688Z',
      '2025-10-21T22:21:12.688Z'
    );;
