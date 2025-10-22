INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '2f3134fe-81d3-4987-b013-d9ca7d3ce2c6',
      'What''s the output of hoisting with var and let?',
      'What''s the output?

```javascript
function sayHi() {
  console.log(name);
  console.log(age);
  var name = ''Lydia'';
  let age = 21;
}
sayHi();
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`Lydia` and `undefined`","isCorrect":false,"explanation":"`name` is hoisted but not yet assigned, so it''s `undefined`, not `''Lydia''`."},{"id":"b","text":"`Lydia` and `ReferenceError`","isCorrect":false,"explanation":"`name` is `undefined`, not `''Lydia''`."},{"id":"c","text":"`ReferenceError` and `21`","isCorrect":false,"explanation":"`name` is accessible (as `undefined`), but `age` throws `ReferenceError` before assignment."},{"id":"d","text":"`undefined` and `ReferenceError`","isCorrect":true,"explanation":"Correct: `var` is hoisted and initialized to `undefined`; `let` is in TDZ and throws `ReferenceError`."}]',
      'c',
      'Within the function, the `name` variable declared with `var` is hoisted and initialized with `undefined`. The `age` variable declared with `let` is hoisted but not initialized, so accessing it before declaration throws a `ReferenceError` due to the temporal dead zone.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','javascript-core-concepts','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-1-25QA-js-q-001","original_type":"multiple-choice","topic":"JavaScript Core Concepts","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.351Z',
      '2025-10-21T22:24:06.353Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '3e4dcfdf-b253-4976-a60e-43460005ef00',
      'What''s the output of setTimeout with var vs let in loops?',
      'What''s the output?

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1);
}
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1);
}
```',
      'multiple-choice',
      'advanced',
      10,
      '[{"id":"a","text":"`0 1 2` and `0 1 2`","isCorrect":false,"explanation":""},{"id":"b","text":"`0 1 2` and `3 3 3`","isCorrect":false,"explanation":""},{"id":"c","text":"`3 3 3` and `0 1 2`","isCorrect":true,"explanation":""}]',
      'c',
      'With `var`, `i` is function-scoped and shared across all callbacks, so all log `3`. With `let`, each iteration has a new block-scoped `i`, so callbacks log `0`, `1`, `2`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','javascript-core-concepts','advanced']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-1-25QA-js-q-002","original_type":"multiple-choice","topic":"JavaScript Core Concepts","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.353Z',
      '2025-10-21T22:24:06.353Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '21f17a4d-d549-446e-8588-94b450edc8e9',
      'What''s the output of this method vs arrow function?',
      'What''s the output?

```javascript
const shape = {
  radius: 10,
  diameter() {
    return this.radius * 2;
  },
  perimeter: () => 2 * Math.PI * this.radius,
};
console.log(shape.diameter());
console.log(shape.perimeter());
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`20` and `62.83185307179586`","isCorrect":false,"explanation":""},{"id":"b","text":"`20` and `NaN`","isCorrect":true,"explanation":""},{"id":"c","text":"`20` and `63`","isCorrect":false,"explanation":""},{"id":"d","text":"`NaN` and `63`","isCorrect":false,"explanation":""}]',
      'c',
      'Regular methods have dynamic `this` (bound to `shape`), but arrow functions inherit `this` from the surrounding scope (e.g., `window`), where `radius` is `undefined`, leading to `NaN`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','javascript-core-concepts','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-1-25QA-js-q-003","original_type":"multiple-choice","topic":"JavaScript Core Concepts","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.353Z',
      '2025-10-21T22:24:06.353Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '3767adb4-5e73-40b9-a930-7a674b0c17d4',
      'What''s the output of +true and !''Lydia''?',
      'What''s the output?

```javascript
+true;
!''Lydia'';
```',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"`1` and `false`","isCorrect":true,"explanation":""},{"id":"b","text":"`false` and `NaN`","isCorrect":false,"explanation":""},{"id":"c","text":"`false` and `false`","isCorrect":false,"explanation":""}]',
      'c',
      'The unary `+` converts `true` to `1`. The string `''Lydia''` is truthy, so `!''Lydia''` is `false`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','javascript-core-concepts','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-1-25QA-js-q-004","original_type":"multiple-choice","topic":"JavaScript Core Concepts","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.353Z',
      '2025-10-21T22:24:06.353Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'a69d015c-0b0b-4001-92d2-c24c2b76c425',
      'Which object property access is valid?',
      'Which one is true?

```javascript
const bird = {
  size: ''small'',
};
const mouse = {
  name: ''Mickey'',
  small: true,
};
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`mouse.bird.size` is not valid","isCorrect":true,"explanation":""},{"id":"b","text":"`mouse[bird.size]` is not valid","isCorrect":false,"explanation":""},{"id":"c","text":"`mouse[bird[\"size\"]]` is not valid","isCorrect":false,"explanation":""},{"id":"d","text":"All of them are valid","isCorrect":false,"explanation":""}]',
      'c',
      '`mouse.bird.size` fails because `mouse.bird` is `undefined`. Bracket notation like `mouse[bird.size]` evaluates to `mouse[''small'']`, which is valid.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','javascript-core-concepts','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-1-25QA-js-q-005","original_type":"multiple-choice","topic":"JavaScript Core Concepts","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.353Z',
      '2025-10-21T22:24:06.353Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '09f164c0-c09f-4cd1-8aa4-1b70f2e61766',
      'What''s the output when assigning object references?',
      'What''s the output?

```javascript
let c = { greeting: ''Hey!'' };
let d;
d = c;
c.greeting = ''Hello'';
console.log(d.greeting);
```',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"`Hello`","isCorrect":true,"explanation":""},{"id":"b","text":"`Hey!`","isCorrect":false,"explanation":""},{"id":"c","text":"`undefined`","isCorrect":false,"explanation":""},{"id":"d","text":"`ReferenceError`","isCorrect":false,"explanation":""},{"id":"e","text":"`TypeError`","isCorrect":false,"explanation":""}]',
      'c',
      'Objects are assigned by reference. Modifying `c.greeting` affects `d` because both point to the same object.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','javascript-core-concepts','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-1-25QA-js-q-006","original_type":"multiple-choice","topic":"JavaScript Core Concepts","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.353Z',
      '2025-10-21T22:24:06.353Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'da283611-c178-4945-b9f2-b79dd2114061',
      'What''s the output of == vs === with Number()?',
      'What''s the output?

```javascript
let a = 3;
let b = new Number(3);
let c = 3;
console.log(a == b);
console.log(a === b);
console.log(b === c);
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`true` `false` `true`","isCorrect":false,"explanation":""},{"id":"b","text":"`false` `false` `true`","isCorrect":false,"explanation":""},{"id":"c","text":"`true` `false` `false`","isCorrect":true,"explanation":""},{"id":"d","text":"`false` `true` `true`","isCorrect":false,"explanation":""}]',
      'c',
      '`==` compares values (3 == 3 → true). `===` compares type and value; `new Number(3)` is an object, not a primitive number, so `===` returns false.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','javascript-core-concepts','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-1-25QA-js-q-007","original_type":"multiple-choice","topic":"JavaScript Core Concepts","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.353Z',
      '2025-10-21T22:24:06.353Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '026cbac7-8714-4032-a8f3-3a68ef01891a',
      'What''s the output of calling a static method on instance?',
      'What''s the output?

```javascript
class Chameleon {
  static colorChange(newColor) {
    this.newColor = newColor;
    return this.newColor;
  }
  constructor({ newColor = ''green'' } = {}) {
    this.newColor = newColor;
  }
}
const freddie = new Chameleon({ newColor: ''purple'' });
console.log(freddie.colorChange(''orange''));
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`orange`","isCorrect":false,"explanation":""},{"id":"b","text":"`purple`","isCorrect":false,"explanation":""},{"id":"c","text":"`green`","isCorrect":false,"explanation":""},{"id":"d","text":"`TypeError`","isCorrect":true,"explanation":""}]',
      'c',
      'Static methods belong to the class, not instances. Calling `freddie.colorChange()` throws a `TypeError`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','javascript-core-concepts','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-1-25QA-js-q-008","original_type":"multiple-choice","topic":"JavaScript Core Concepts","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.353Z',
      '2025-10-21T22:24:06.353Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '00510272-370a-4092-a482-cfb5bc1a60e7',
      'What happens with a typo creating a global variable?',
      'What''s the output?

```javascript
let greeting;
greetign = {}; // Typo!
console.log(greetign);
```',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"`{}`","isCorrect":true,"explanation":""},{"id":"b","text":"`ReferenceError: greetign is not defined`","isCorrect":false,"explanation":""},{"id":"c","text":"`undefined`","isCorrect":false,"explanation":""}]',
      'c',
      'In non-strict mode, assigning to an undeclared variable creates a global property. The typo creates `greetign` on the global object.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','javascript-core-concepts','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-1-25QA-js-q-009","original_type":"multiple-choice","topic":"JavaScript Core Concepts","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.353Z',
      '2025-10-21T22:24:06.353Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'd0f4182a-ad21-4384-95f3-c0a231848e7a',
      'Can you add properties to a function?',
      'What happens when we do this?

```javascript
function bark() {
  console.log(''Woof!'');
}
bark.animal = ''dog'';
```',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"Nothing, this is totally fine!","isCorrect":true,"explanation":""},{"id":"b","text":"`SyntaxError`. You cannot add properties to a function this way.","isCorrect":false,"explanation":""},{"id":"c","text":"`\"Woof\"` gets logged.","isCorrect":false,"explanation":""},{"id":"d","text":"`ReferenceError`","isCorrect":false,"explanation":""}]',
      'c',
      'Functions are objects in JavaScript, so you can add properties to them. This is valid and causes no error.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','javascript-core-concepts','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-1-25QA-js-q-010","original_type":"multiple-choice","topic":"JavaScript Core Concepts","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.353Z',
      '2025-10-21T22:24:06.353Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '0df33625-81e1-4aa3-b47b-c6fa5cbc9e58',
      'Why does calling method on instance throw TypeError?',
      'What''s the output?

```javascript
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}
const member = new Person(''Lydia'', ''Hallie'');
Person.getFullName = function() {
  return `${this.firstName} ${this.lastName}`;
};
console.log(member.getFullName());
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`TypeError`","isCorrect":true,"explanation":""},{"id":"b","text":"`SyntaxError`","isCorrect":false,"explanation":""},{"id":"c","text":"`Lydia Hallie`","isCorrect":false,"explanation":""},{"id":"d","text":"`undefined` `undefined`","isCorrect":false,"explanation":""}]',
      'c',
      '`getFullName` is added to the constructor function, not the prototype, so instances don’t inherit it. Calling it on `member` throws `TypeError`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','javascript-core-concepts','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-1-25QA-js-q-011","original_type":"multiple-choice","topic":"JavaScript Core Concepts","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.355Z',
      '2025-10-21T22:24:06.355Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '58add195-d803-4dc6-9546-4c0e8a17ff3d',
      'What''s the output when forgetting ''new'' with constructor?',
      'What''s the output?

```javascript
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}
const lydia = new Person(''Lydia'', ''Hallie'');
const sarah = Person(''Sarah'', ''Smith'');
console.log(lydia);
console.log(sarah);
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`Person {firstName: \"Lydia\", lastName: \"Hallie\"}` and `undefined`","isCorrect":true,"explanation":""},{"id":"b","text":"`Person {firstName: \"Lydia\", lastName: \"Hallie\"}` and `Person {firstName: \"Sarah\", lastName: \"Smith\"}`","isCorrect":false,"explanation":""},{"id":"c","text":"`Person {firstName: \"Lydia\", lastName: \"Hallie\"}` and `{}`","isCorrect":false,"explanation":""},{"id":"d","text":"`Person {firstName: \"Lydia\", lastName: \"Hallie\"}` and `ReferenceError`","isCorrect":false,"explanation":""}]',
      'c',
      'Without `new`, `this` refers to the global object. `sarah` is `undefined` because the function doesn’t return anything.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','javascript-core-concepts','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-1-25QA-js-q-012","original_type":"multiple-choice","topic":"JavaScript Core Concepts","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.355Z',
      '2025-10-21T22:24:06.355Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '9aa7f558-b171-4b68-9a4f-79e8220ea310',
      'What are the three phases of event propagation?',
      'What are the three phases of event propagation?',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"Target > Capturing > Bubbling","isCorrect":false,"explanation":""},{"id":"b","text":"Bubbling > Target > Capturing","isCorrect":false,"explanation":""},{"id":"c","text":"Target > Bubbling > Capturing","isCorrect":false,"explanation":""},{"id":"d","text":"Capturing > Target > Bubbling","isCorrect":true,"explanation":""}]',
      'c',
      'Event propagation: Capturing (top-down), Target (event target), Bubbling (bottom-up).',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','javascript-core-concepts','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-1-25QA-js-q-013","original_type":"multiple-choice","topic":"JavaScript Core Concepts","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.355Z',
      '2025-10-21T22:24:06.355Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '744cb913-eff6-4ce4-93ee-a89b5bad8d79',
      'Do all objects have prototypes?',
      'All object have prototypes.',
      'true-false',
      'intermediate',
      10,
      '[{"id":"true","text":"True","isCorrect":false},{"id":"false","text":"False","isCorrect":true}]',
      'false',
      'The base object (e.g., created via `Object.create(null)`) has no prototype. Most objects inherit from `Object.prototype`, but not all.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','javascript-core-concepts','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-1-25QA-js-q-014","original_type":"true-false","topic":"JavaScript Core Concepts","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.355Z',
      '2025-10-21T22:24:06.355Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'cfbbb094-1ad6-485f-b073-3c41e8171efd',
      'What''s the output of adding number and string?',
      'What''s the output?

```javascript
function sum(a, b) {
  return a + b;
}
sum(1, ''2'');
```',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"`NaN`","isCorrect":false,"explanation":""},{"id":"b","text":"`TypeError`","isCorrect":false,"explanation":""},{"id":"c","text":"`\"12\"`","isCorrect":true,"explanation":""},{"id":"d","text":"`3`","isCorrect":false,"explanation":""}]',
      'c',
      'JavaScript coerces the number `1` to a string and concatenates: `''1'' + ''2''` → `''12''`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','javascript-core-concepts','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-1-25QA-js-q-015","original_type":"multiple-choice","topic":"JavaScript Core Concepts","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.355Z',
      '2025-10-21T22:24:06.355Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '8e314947-8564-40c3-a8a1-9b2d6b740041',
      'What''s the output of postfix and prefix increment?',
      'What''s the output?

```javascript
let number = 0;
console.log(number++);
console.log(++number);
console.log(number);
```',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"`1` `1` `2`","isCorrect":false,"explanation":""},{"id":"b","text":"`1` `2` `2`","isCorrect":false,"explanation":""},{"id":"c","text":"`0` `2` `2`","isCorrect":true,"explanation":""},{"id":"d","text":"`0` `1` `2`","isCorrect":false,"explanation":""}]',
      'c',
      '`number++` returns `0` then increments to `1`. `++number` increments to `2` then returns `2`. Final value is `2`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','javascript-core-concepts','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-1-25QA-js-q-016","original_type":"multiple-choice","topic":"JavaScript Core Concepts","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.355Z',
      '2025-10-21T22:24:06.355Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'e77e02ee-84d3-4d06-a6f4-6f86d8b1f4a7',
      'What''s the output of tagged template literals?',
      'What''s the output?

```javascript
function getPersonInfo(one, two, three) {
  console.log(one);
  console.log(two);
  console.log(three);
}
const person = ''Lydia'';
const age = 21;
getPersonInfo`${person} is ${age} years old`;
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`\"Lydia\"` `21` `[\"\", \" is \", \" years old\"]`","isCorrect":false,"explanation":""},{"id":"b","text":"`[\"\", \" is \", \" years old\"]` `\"Lydia\"` `21`","isCorrect":true,"explanation":""},{"id":"c","text":"`\"Lydia\"` `[\"\", \" is \", \" years old\"]` `21`","isCorrect":false,"explanation":""}]',
      'c',
      'In tagged templates, the first argument is an array of string parts. Remaining arguments are expression values.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','javascript-core-concepts','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-1-25QA-js-q-017","original_type":"multiple-choice","topic":"JavaScript Core Concepts","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.355Z',
      '2025-10-21T22:24:06.355Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '7d470e8a-2912-4fe1-95b0-c0d8e0ff3cfe',
      'What''s the output of comparing object literals?',
      'What''s the output?

```javascript
function checkAge(data) {
  if (data === { age: 18 }) {
    console.log(''You are an adult!'');
  } else if (data == { age: 18 }) {
    console.log(''You are still an adult.'');
  } else {
    console.log(`Hmm.. You don''t have an age I guess`);
  }
}
checkAge({ age: 18 });
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`You are an adult!`","isCorrect":false,"explanation":""},{"id":"b","text":"`You are still an adult.`","isCorrect":false,"explanation":""},{"id":"c","text":"`Hmm.. You don''t have an age I guess`","isCorrect":true,"explanation":""}]',
      'c',
      'Objects are compared by reference, not value. Two separate `{ age: 18 }` objects are not equal, even with `==`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','javascript-core-concepts','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-1-25QA-js-q-018","original_type":"multiple-choice","topic":"JavaScript Core Concepts","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.355Z',
      '2025-10-21T22:24:06.355Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'bf74f5f2-58f6-4514-a8cc-02c6c23010dc',
      'What''s typeof of rest parameters?',
      'What''s the output?

```javascript
function getAge(...args) {
  console.log(typeof args);
}
getAge(21);
```',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"`\"number\"`","isCorrect":false,"explanation":""},{"id":"b","text":"`\"array\"`","isCorrect":false,"explanation":""},{"id":"c","text":"`\"object\"`","isCorrect":true,"explanation":""},{"id":"d","text":"`\"NaN\"`","isCorrect":false,"explanation":""}]',
      'c',
      'Rest parameters collect arguments into an array. Arrays are objects, so `typeof` returns `''object''`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','javascript-core-concepts','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-1-25QA-js-q-019","original_type":"multiple-choice","topic":"JavaScript Core Concepts","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.355Z',
      '2025-10-21T22:24:06.355Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '8025bdf6-9dd3-4ce9-a544-803f158a8d5b',
      'What''s the output with ''use strict'' and undeclared variable?',
      'What''s the output?

```javascript
function getAge() {
  ''use strict'';
  age = 21;
  console.log(age);
}
getAge();
```',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"`21`","isCorrect":false,"explanation":""},{"id":"b","text":"`undefined`","isCorrect":false,"explanation":""},{"id":"c","text":"`ReferenceError`","isCorrect":true,"explanation":""},{"id":"d","text":"`TypeError`","isCorrect":false,"explanation":""}]',
      'c',
      'In strict mode, assigning to an undeclared variable throws a `ReferenceError`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','javascript-core-concepts','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-1-25QA-js-q-020","original_type":"multiple-choice","topic":"JavaScript Core Concepts","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.355Z',
      '2025-10-21T22:24:06.355Z'
    );;
