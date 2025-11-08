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
      ARRAY[]::text[],
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
      ARRAY[]::text[],
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
      ARRAY[]::text[],
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
      ARRAY[]::text[],
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
      ARRAY[]::text[],
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
      ARRAY[]::text[],
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
      ARRAY[]::text[],
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
      ARRAY[]::text[],
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
      ARRAY[]::text[],
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
      ARRAY[]::text[],
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
      ARRAY[]::text[],
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
      ARRAY[]::text[],
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
      ARRAY[]::text[],
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
      ARRAY[]::text[],
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
      ARRAY[]::text[],
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
      ARRAY[]::text[],
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
      ARRAY[]::text[],
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
      ARRAY[]::text[],
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
      ARRAY[]::text[],
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
      ARRAY[]::text[],
      ARRAY[]::text[],
      ARRAY['design-patterns','general-design-patterns','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"design-patterns-mixin-pattern-40","original_type":"multiple-choice","topic":"General Design Patterns","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"Design Patterns"}',
      '2d6223f9-020c-45e7-a3bd-6aa9b0a6af3c',
      true,
      '2025-10-21T22:21:12.690Z',
      '2025-10-21T22:21:12.690Z'
    );;
