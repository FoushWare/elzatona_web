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
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '1ea2c3bb-2b9b-4fd9-8e53-e9b8bc06d91f',
      'What''s the value of eval(''10*10+5'')?',
      'What''s the value of `sum`?

```javascript
const sum = eval(''10*10+5'');
```',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"`105`","isCorrect":true,"explanation":""},{"id":"b","text":"`\"105\"`","isCorrect":false,"explanation":""},{"id":"c","text":"`TypeError`","isCorrect":false,"explanation":""},{"id":"d","text":"`\"10*10+5\"`","isCorrect":false,"explanation":""}]',
      'c',
      '`eval` evaluates the string as JavaScript code. `10*10+5` evaluates to the number `105`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','javascript-core-concepts','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-1-25QA-js-q-021","original_type":"multiple-choice","topic":"JavaScript Core Concepts","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.355Z',
      '2025-10-21T22:24:06.355Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'fe403f3e-f922-4fa9-bc6b-358a71542857',
      'How long is sessionStorage data accessible?',
      'How long is cool_secret accessible?

```javascript
sessionStorage.setItem(''cool_secret'', 123);
```',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"Forever, the data doesn''t get lost.","isCorrect":false,"explanation":""},{"id":"b","text":"When the user closes the tab.","isCorrect":true,"explanation":""},{"id":"c","text":"When the user closes the entire browser, not only the tab.","isCorrect":false,"explanation":""},{"id":"d","text":"When the user shuts off their computer.","isCorrect":false,"explanation":""}]',
      'c',
      '`sessionStorage` data is cleared when the tab is closed.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','javascript-core-concepts','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-1-25QA-js-q-022","original_type":"multiple-choice","topic":"JavaScript Core Concepts","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.355Z',
      '2025-10-21T22:24:06.355Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'c9c6a875-6c83-4279-9ebb-6b4ccbd7ea62',
      'What''s the output of redeclaring var?',
      'What''s the output?

```javascript
var num = 8;
var num = 10;
console.log(num);
```',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"`8`","isCorrect":false,"explanation":""},{"id":"b","text":"`10`","isCorrect":true,"explanation":""},{"id":"c","text":"`SyntaxError`","isCorrect":false,"explanation":""},{"id":"d","text":"`ReferenceError`","isCorrect":false,"explanation":""}]',
      'c',
      '`var` allows redeclaration. The last assigned value (`10`) is used.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','javascript-core-concepts','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-1-25QA-js-q-023","original_type":"multiple-choice","topic":"JavaScript Core Concepts","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.355Z',
      '2025-10-21T22:24:06.355Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'fd0f309e-d8ed-42d6-86d5-e968de3f06f9',
      'What''s the output of hasOwnProperty and Set.has with numbers?',
      'What''s the output?

```javascript
const obj = { 1: ''a'', 2: ''b'', 3: ''c'' };
const set = new Set([1, 2, 3, 4, 5]);
obj.hasOwnProperty(''1'');
obj.hasOwnProperty(1);
set.has(''1'');
set.has(1);
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`false` `true` `false` `true`","isCorrect":false,"explanation":""},{"id":"b","text":"`false` `true` `true` `true`","isCorrect":false,"explanation":""},{"id":"c","text":"`true` `true` `false` `true`","isCorrect":true,"explanation":""},{"id":"d","text":"`true` `true` `true` `true`","isCorrect":false,"explanation":""}]',
      'c',
      'Object keys are strings, so both `hasOwnProperty(''1'')` and `hasOwnProperty(1)` return `true`. `Set` uses strict equality, so `set.has(''1'')` is `false`, but `set.has(1)` is `true`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','javascript-core-concepts','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-1-25QA-js-q-024","original_type":"multiple-choice","topic":"JavaScript Core Concepts","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.355Z',
      '2025-10-21T22:24:06.355Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '14715fef-d0e7-4f45-a3cf-e9a09618474c',
      'What''s the output of duplicate object keys?',
      'What''s the output?

```javascript
const obj = { a: ''one'', b: ''two'', a: ''three'' };
console.log(obj);
```',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"`{ a: \"one\", b: \"two\" }`","isCorrect":false,"explanation":""},{"id":"b","text":"`{ b: \"two\", a: \"three\" }`","isCorrect":false,"explanation":""},{"id":"c","text":"`{ a: \"three\", b: \"two\" }`","isCorrect":true,"explanation":""},{"id":"d","text":"`SyntaxError`","isCorrect":false,"explanation":""}]',
      'c',
      'Duplicate keys are allowed; the last value wins. The key order remains as first occurrence.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','javascript-core-concepts','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-1-25QA-js-q-025","original_type":"multiple-choice","topic":"JavaScript Core Concepts","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.355Z',
      '2025-10-21T22:24:06.355Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '2b05ca19-abe6-42a7-96ac-e72d1f636539',
      'What''s the value of one, two, three with logical OR?',
      'What''s the value of output?

```javascript
const one = false || {} || null;
const two = null || false || '''';
const three = [] || 0 || true;
console.log(one, two, three);
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`false` `null` `[]`","isCorrect":false,"explanation":""},{"id":"b","text":"`null` `\"\"` `true`","isCorrect":false,"explanation":""},{"id":"c","text":"`{}` `\"\"` `[]`","isCorrect":true,"explanation":""},{"id":"d","text":"`null` `null` `true`","isCorrect":false,"explanation":""}]',
      'c',
      'The `||` operator returns the first truthy value or the last value if all are falsy. `{}` is truthy → `one = {}`. All in `two` are falsy → `two = ''''`. `[]` is truthy → `three = []`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','advanced-javascript','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-101–125QA-js-q-101","original_type":"multiple-choice","topic":"Advanced JavaScript","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.357Z',
      '2025-10-21T22:24:06.357Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'c6eb1bfe-78ae-4ed9-a9c2-4a1e9cab7327',
      'What''s the output with async/await vs Promise.then?',
      'What''s the value of output?

```javascript
const myPromise = () => Promise.resolve(''I have resolved!'');
function firstFunction() {
  myPromise().then(res => console.log(res));
  console.log(''second'');
}
async function secondFunction() {
  console.log(await myPromise());
  console.log(''second'');
}
firstFunction();
secondFunction();
```',
      'multiple-choice',
      'advanced',
      10,
      '[{"id":"a","text":"`I have resolved!`, `second` and `I have resolved!`, `second`","isCorrect":false,"explanation":""},{"id":"b","text":"`second`, `I have resolved!` and `second`, `I have resolved!`","isCorrect":false,"explanation":""},{"id":"c","text":"`I have resolved!`, `second` and `second`, `I have resolved!`","isCorrect":false,"explanation":""},{"id":"d","text":"`second`, `I have resolved!` and `I have resolved!`, `second`","isCorrect":true,"explanation":""}]',
      'c',
      '`firstFunction`: `.then()` is non-blocking → logs `''second''` first, then resolved value. `secondFunction`: `await` pauses execution → logs resolved value first, then `''second''`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','advanced-javascript','advanced']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-101–125QA-js-q-102","original_type":"multiple-choice","topic":"Advanced JavaScript","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.357Z',
      '2025-10-21T22:24:06.357Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '6982db53-c6dd-43ba-b3d8-ec2749f59e62',
      'What''s the output when adding 2 to Set values?',
      'What''s the value of output?

```javascript
const set = new Set();
set.add(1);
set.add(''Lydia'');
set.add({ name: ''Lydia'' });
for (let item of set) {
  console.log(item + 2);
}
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`3`, `NaN`, `NaN`","isCorrect":false,"explanation":""},{"id":"b","text":"`3`, `7`, `NaN`","isCorrect":false,"explanation":""},{"id":"c","text":"`3`, `Lydia2`, `[object Object]2`","isCorrect":true,"explanation":""},{"id":"d","text":"`\"12\"`, `Lydia2`, `[object Object]2`","isCorrect":false,"explanation":""}]',
      'c',
      '`1 + 2 = 3` (number). `''Lydia'' + 2 = ''Lydia2''` (string concat). `{}` + 2 → `''[object Object]2''` (object → string).',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','advanced-javascript','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-101–125QA-js-q-103","original_type":"multiple-choice","topic":"Advanced JavaScript","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.357Z',
      '2025-10-21T22:24:06.357Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '9b00b28e-4d3e-4123-9f31-f1635fd241b4',
      'What''s the value of Promise.resolve(5)?',
      'What''s its value?

```javascript
Promise.resolve(5);
```',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"`5`","isCorrect":false,"explanation":""},{"id":"b","text":"`Promise {<pending>: 5}`","isCorrect":false,"explanation":""},{"id":"c","text":"`Promise {<fulfilled>: 5}`","isCorrect":true,"explanation":""},{"id":"d","text":"`Error`","isCorrect":false,"explanation":""}]',
      'c',
      '`Promise.resolve(5)` returns a **fulfilled** promise with value `5`. It does not return the raw value or a pending promise.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','advanced-javascript','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-101–125QA-js-q-104","original_type":"multiple-choice","topic":"Advanced JavaScript","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.357Z',
      '2025-10-21T22:24:06.357Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '0580d47d-cd34-4d25-bbdd-4a8fcae5f7db',
      'What''s the output with default parameter referencing outer variable?',
      'What''s its value?

```javascript
function compareMembers(person1, person2 = person) {
  if (person1 !== person2) {
    console.log(''Not the same!'');
  } else {
    console.log(''They are the same!'');
  }
}
const person = { name: ''Lydia'' };
compareMembers(person);
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`Not the same!`","isCorrect":false,"explanation":""},{"id":"b","text":"`They are the same!`","isCorrect":true,"explanation":""},{"id":"c","text":"`ReferenceError`","isCorrect":false,"explanation":""},{"id":"d","text":"`SyntaxError`","isCorrect":false,"explanation":""}]',
      'c',
      '`person2` defaults to the same object reference as `person`. Since `person1` is also that object, strict equality returns `true`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','advanced-javascript','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-101–125QA-js-q-105","original_type":"multiple-choice","topic":"Advanced JavaScript","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.357Z',
      '2025-10-21T22:24:06.357Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '62dce51c-d9e4-4925-b8c9-6cf2247bcb5c',
      'What''s the output with dot notation on object?',
      'What''s its value?

```javascript
const colorConfig = {
  red: true,
  blue: false,
  green: true,
  black: true,
  yellow: false,
};
const colors = [''pink'', ''red'', ''blue''];
console.log(colorConfig.colors[1]);
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`true`","isCorrect":false,"explanation":""},{"id":"b","text":"`false`","isCorrect":false,"explanation":""},{"id":"c","text":"`undefined`","isCorrect":false,"explanation":""},{"id":"d","text":"`TypeError`","isCorrect":true,"explanation":""}]',
      'c',
      '`colorConfig.colors` tries to access a property named `colors`, which doesn’t exist → `undefined`. Then `undefined[1]` throws `TypeError`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','advanced-javascript','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-101–125QA-js-q-106","original_type":"multiple-choice","topic":"Advanced JavaScript","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.357Z',
      '2025-10-21T22:24:06.357Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '3e23136d-2063-4f20-8830-9ad4d345c428',
      'Are two identical heart emojis strictly equal?',
      'What''s its value?

```javascript
console.log(''❤️'' === ''❤️'');
```',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"`true`","isCorrect":true,"explanation":""},{"id":"b","text":"`false`","isCorrect":false,"explanation":""}]',
      'c',
      'Identical emoji strings have the same Unicode representation, so strict equality returns `true`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','advanced-javascript','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-101–125QA-js-q-107","original_type":"multiple-choice","topic":"Advanced JavaScript","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.357Z',
      '2025-10-21T22:24:06.357Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'f12e7f4d-14d3-48d1-b883-f61aa511c844',
      'Which array method modifies the original array?',
      'Which of these methods modifies the original array?

```javascript
const emojis = [''✨'', ''🥑'', ''😍''];
emojis.map(x => x + ''✨'');
emojis.filter(x => x !== ''🥑'');
emojis.find(x => x !== ''🥑'');
emojis.reduce((acc, cur) => acc + ''✨'');
emojis.slice(1, 2, ''✨'');
emojis.splice(1, 2, ''✨'');
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`All of them`","isCorrect":false,"explanation":""},{"id":"b","text":"`map` `reduce` `slice` `splice`","isCorrect":false,"explanation":""},{"id":"c","text":"`map` `slice` `splice`","isCorrect":false,"explanation":""},{"id":"d","text":"`splice`","isCorrect":true,"explanation":""}]',
      'c',
      'Only `splice` modifies the original array. `map`, `filter`, `slice` return new arrays. `find` returns an element. `reduce` returns an accumulated value.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','advanced-javascript','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-101–125QA-js-q-108","original_type":"multiple-choice","topic":"Advanced JavaScript","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.357Z',
      '2025-10-21T22:24:06.357Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '1b0627d5-f37a-4333-abd7-aae3794df8f3',
      'Does reassigning object property affect original array?',
      'What''s the output?

```javascript
const food = [''🍕'', ''🍫'', ''🥑'', ''🍔''];
const info = { favoriteFood: food[0] };
info.favoriteFood = ''🍝'';
console.log(food);
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`[''🍕'', ''🍫'', ''🥑'', ''🍔'']`","isCorrect":true,"explanation":""},{"id":"b","text":"`[''🍝'', ''🍫'', ''🥑'', ''🍔'']`","isCorrect":false,"explanation":""},{"id":"c","text":"`[''🍝'', ''🍕'', ''🍫'', ''🥑'', ''🍔'']`","isCorrect":false,"explanation":""},{"id":"d","text":"`ReferenceError`","isCorrect":false,"explanation":""}]',
      'c',
      '`food[0]` is a string (primitive). Assigning it to `info.favoriteFood` copies the value. Reassigning `info.favoriteFood` doesn’t affect the `food` array.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','advanced-javascript','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-101–125QA-js-q-109","original_type":"multiple-choice","topic":"Advanced JavaScript","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.357Z',
      '2025-10-21T22:24:06.357Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'a66f9be6-9b3b-4162-9657-599260a65d50',
      'What does JSON.parse() do?',
      'What does this method do?

```javascript
JSON.parse();
```',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"Parses JSON to a JavaScript value","isCorrect":true,"explanation":""},{"id":"b","text":"Parses a JavaScript object to JSON","isCorrect":false,"explanation":""},{"id":"c","text":"Parses any JavaScript value to JSON","isCorrect":false,"explanation":""},{"id":"d","text":"Parses JSON to a JavaScript object only","isCorrect":false,"explanation":""}]',
      'c',
      '`JSON.parse()` converts a JSON string into a JavaScript value (object, array, number, etc.).',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','advanced-javascript','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-101–125QA-js-q-110","original_type":"multiple-choice","topic":"Advanced JavaScript","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.357Z',
      '2025-10-21T22:24:06.357Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '42da8cbc-d423-4711-a28b-598512d697e5',
      'What''s the output with TDZ in function scope?',
      'What''s the output?

```javascript
let name = ''Lydia'';
function getName() {
  console.log(name);
  let name = ''Sarah'';
}
getName();
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`Lydia`","isCorrect":false,"explanation":""},{"id":"b","text":"`Sarah`","isCorrect":false,"explanation":""},{"id":"c","text":"`undefined`","isCorrect":false,"explanation":""},{"id":"d","text":"`ReferenceError`","isCorrect":true,"explanation":""}]',
      'c',
      'The `name` inside `getName` is block-scoped and hoisted but not initialized. Accessing it before declaration throws `ReferenceError` due to TDZ.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','advanced-javascript','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-101–125QA-js-q-111","original_type":"multiple-choice","topic":"Advanced JavaScript","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.357Z',
      '2025-10-21T22:24:06.357Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'e23437a3-1932-4b9a-bc12-9d6a59aa42b6',
      'What''s the output of yield vs yield*?',
      'What''s the output?

```javascript
function* generatorOne() {
  yield [''a'', ''b'', ''c''];
}
function* generatorTwo() {
  yield* [''a'', ''b'', ''c''];
}
const one = generatorOne();
const two = generatorTwo();
console.log(one.next().value);
console.log(two.next().value);
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`a` and `a`","isCorrect":false,"explanation":""},{"id":"b","text":"`a` and `undefined`","isCorrect":false,"explanation":""},{"id":"c","text":"`[''a'', ''b'', ''c'']` and `a`","isCorrect":true,"explanation":""},{"id":"d","text":"`a` and `[''a'', ''b'', ''c'']`","isCorrect":false,"explanation":""}]',
      'c',
      '`yield` returns the entire array. `yield*` delegates to the iterable and yields each element individually, so first value is `''a''`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','advanced-javascript','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-101–125QA-js-q-112","original_type":"multiple-choice","topic":"Advanced JavaScript","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.357Z',
      '2025-10-21T22:24:06.357Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '272c4f92-21cb-442b-82b9-1ee47ca303e7',
      'What''s the output of IIFE in template literal?',
      'What''s the output?

```javascript
console.log(`${(x => x)(''I love'')} to program`);
```',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"`I love to program`","isCorrect":true,"explanation":""},{"id":"b","text":"`undefined to program`","isCorrect":false,"explanation":""},{"id":"c","text":"`${(x => x)(''I love'') to program`","isCorrect":false,"explanation":""},{"id":"d","text":"`TypeError`","isCorrect":false,"explanation":""}]',
      'c',
      'The IIFE `(x => x)(''I love'')` returns `''I love''`, which is interpolated into the string.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','advanced-javascript','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-101–125QA-js-q-113","original_type":"multiple-choice","topic":"Advanced JavaScript","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.358Z',
      '2025-10-21T22:24:06.358Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '1c944399-92df-4df6-891c-361165e1dfa6',
      'Does setting config to null stop setInterval?',
      'What will happen?

```javascript
let config = {
  alert: setInterval(() => {
    console.log(''Alert!'');
  }, 1000),
};
config = null;
```',
      'multiple-choice',
      'advanced',
      10,
      '[{"id":"a","text":"The `setInterval` callback won''t be invoked","isCorrect":false,"explanation":""},{"id":"b","text":"The `setInterval` callback gets invoked once","isCorrect":false,"explanation":""},{"id":"c","text":"The `setInterval` callback will still be called every second","isCorrect":true,"explanation":""},{"id":"d","text":"We never invoked `config.alert()`, config is `null`","isCorrect":false,"explanation":""}]',
      'c',
      'The `setInterval` callback holds a reference to the `config` object via closure, preventing garbage collection. The interval continues to run.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','advanced-javascript','advanced']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-101–125QA-js-q-114","original_type":"multiple-choice","topic":"Advanced JavaScript","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.358Z',
      '2025-10-21T22:24:06.358Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'ef33924d-e87a-4fa7-9b15-66d806513123',
      'Which Map.get() returns ''Hello world!''?',
      'Which method(s) will return the value `''Hello world!''`?

```javascript
const myMap = new Map();
const myFunc = () => ''greeting'';
myMap.set(myFunc, ''Hello world!'');
//1
myMap.get(''greeting'');
//2
myMap.get(myFunc);
//3
myMap.get(() => ''greeting'');
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`1`","isCorrect":false,"explanation":""},{"id":"b","text":"`2`","isCorrect":true,"explanation":""},{"id":"c","text":"`2 and 3`","isCorrect":false,"explanation":""},{"id":"d","text":"`All of them`","isCorrect":false,"explanation":""}]',
      'c',
      'Map keys are compared by reference. Only the exact same function reference (`myFunc`) retrieves the value. A new function (`() => ''greeting''`) is a different object.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','advanced-javascript','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-101–125QA-js-q-115","original_type":"multiple-choice","topic":"Advanced JavaScript","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.358Z',
      '2025-10-21T22:24:06.358Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'b1c23f6b-ca7c-4b68-a970-aef34c56cad7',
      'What''s the output after calling functions with default params?',
      'What''s the output?

```javascript
const person = {
  name: ''Lydia'',
  age: 21,
};
const changeAge = (x = { ...person }) => (x.age += 1);
const changeAgeAndName = (x = { ...person }) => {
  x.age += 1;
  x.name = ''Sarah'';
};
changeAge(person);
changeAgeAndName();
console.log(person);
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`{name: \"Sarah\", age: 22}`","isCorrect":false,"explanation":""},{"id":"b","text":"`{name: \"Sarah\", age: 23}`","isCorrect":false,"explanation":""},{"id":"c","text":"`{name: \"Lydia\", age: 22}`","isCorrect":true,"explanation":""},{"id":"d","text":"`{name: \"Lydia\", age: 23}`","isCorrect":false,"explanation":""}]',
      'c',
      '`changeAge(person)` mutates the original `person` object (age becomes 22). `changeAgeAndName()` uses a new object, so `person` remains unchanged except for the first call.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','advanced-javascript','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-101–125QA-js-q-116","original_type":"multiple-choice","topic":"Advanced JavaScript","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.358Z',
      '2025-10-21T22:24:06.358Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'e7c680f2-280e-4e5a-8d74-0b43682d77c5',
      'Which option returns 6 using spread?',
      'Which of the following options will return `6`?

```javascript
function sumValues(x, y, z) {
  return x + y + z;
}
```',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"`sumValues([...1, 2, 3])`","isCorrect":false,"explanation":""},{"id":"b","text":"`sumValues([...[1, 2, 3]])`","isCorrect":false,"explanation":""},{"id":"c","text":"`sumValues(...[1, 2, 3])`","isCorrect":true,"explanation":""},{"id":"d","text":"`sumValues([1, 2, 3])`","isCorrect":false,"explanation":""}]',
      'c',
      '`...[1, 2, 3]` spreads the array into three arguments: `1, 2, 3` → sum is `6`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','advanced-javascript','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-101–125QA-js-q-117","original_type":"multiple-choice","topic":"Advanced JavaScript","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.358Z',
      '2025-10-21T22:24:06.358Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'add8f6ec-f7f6-4bdd-8f4c-49255bc88658',
      'What''s the output with += in array index?',
      'What''s the output?

```javascript
let num = 1;
const list = [''🥳'', ''🤠'', ''🥰'', ''🤪''];
console.log(list[(num += 1)]);
```',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"`🤠`","isCorrect":false,"explanation":""},{"id":"b","text":"`🥰`","isCorrect":true,"explanation":""},{"id":"c","text":"`SyntaxError`","isCorrect":false,"explanation":""},{"id":"d","text":"`ReferenceError`","isCorrect":false,"explanation":""}]',
      'c',
      '`num += 1` increments `num` to `2`. `list[2]` is `''🥰''`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','advanced-javascript','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-101–125QA-js-q-118","original_type":"multiple-choice","topic":"Advanced JavaScript","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.358Z',
      '2025-10-21T22:24:06.358Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '5817b197-dbf2-467d-9330-8707c7ca9b64',
      'What''s the output with optional chaining?',
      'What''s the output?

```javascript
const person = {
  firstName: ''Lydia'',
  lastName: ''Hallie'',
  pet: {
    name: ''Mara'',
    breed: ''Dutch Tulip Hound'',
  },
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  },
};
console.log(person.pet?.name);
console.log(person.pet?.family?.name);
console.log(person.getFullName?.());
console.log(member.getLastName?.());
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`undefined` `undefined` `undefined` `undefined`","isCorrect":false,"explanation":""},{"id":"b","text":"`Mara` `undefined` `Lydia Hallie` `ReferenceError`","isCorrect":true,"explanation":""},{"id":"c","text":"`Mara` `null` `Lydia Hallie` `null`","isCorrect":false,"explanation":""},{"id":"d","text":"`null` `ReferenceError` `null` `ReferenceError`","isCorrect":false,"explanation":""}]',
      'c',
      'Optional chaining safely accesses nested properties. `person.pet?.name` → `''Mara''`. `person.pet?.family?.name` → `undefined`. `person.getFullName?.()` → `''Lydia Hallie''`. `member` is undefined → `ReferenceError`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','advanced-javascript','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-101–125QA-js-q-119","original_type":"multiple-choice","topic":"Advanced JavaScript","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.358Z',
      '2025-10-21T22:24:06.358Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'db171333-c59a-4162-838b-a6b369b2a127',
      'What''s the output with indexOf in if condition?',
      'What''s the output?

```javascript
const groceries = [''banana'', ''apple'', ''peanuts''];
if (groceries.indexOf(''banana'')) {
  console.log(''We have to buy bananas!'');
} else {
  console.log(`We don''t have to buy bananas!`);
}
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`We have to buy bananas!`","isCorrect":false,"explanation":""},{"id":"b","text":"`We don''t have to buy bananas!`","isCorrect":true,"explanation":""},{"id":"c","text":"`undefined`","isCorrect":false,"explanation":""},{"id":"d","text":"`1`","isCorrect":false,"explanation":""}]',
      'c',
      '`indexOf(''banana'')` returns `0`, which is falsy. So the `else` block runs.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','advanced-javascript','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-101–125QA-js-q-120","original_type":"multiple-choice","topic":"Advanced JavaScript","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.358Z',
      '2025-10-21T22:24:06.358Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '52fd0ce9-aad9-4e44-8d64-6eeb6d0e90f6',
      'What''s the output when logging a setter?',
      'What''s the output?

```javascript
const config = {
  languages: [],
  set language(lang) {
    return this.languages.push(lang);
  },
};
console.log(config.language);
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`function language(lang) { this.languages.push(lang }`","isCorrect":false,"explanation":""},{"id":"b","text":"`0`","isCorrect":false,"explanation":""},{"id":"c","text":"`[]`","isCorrect":false,"explanation":""},{"id":"d","text":"`undefined`","isCorrect":true,"explanation":""}]',
      'c',
      'Setters don’t return a value when accessed. Logging a setter property returns `undefined`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','advanced-javascript','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-101–125QA-js-q-121","original_type":"multiple-choice","topic":"Advanced JavaScript","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.358Z',
      '2025-10-21T22:24:06.358Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'f5de1eab-2219-49a4-ab8a-327790210e1f',
      'What''s the output with !typeof comparisons?',
      'What''s the output?

```javascript
const name = ''Lydia Hallie'';
console.log(!typeof name === ''object'');
console.log(!typeof name === ''string'');
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`false` `true`","isCorrect":false,"explanation":""},{"id":"b","text":"`true` `false`","isCorrect":false,"explanation":""},{"id":"c","text":"`false` `false`","isCorrect":true,"explanation":""},{"id":"d","text":"`true` `true`","isCorrect":false,"explanation":""}]',
      'c',
      '`typeof name` is `''string''` (truthy). `!typeof name` is `false`. `false === ''object''` → `false`. `false === ''string''` → `false`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','advanced-javascript','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-101–125QA-js-q-122","original_type":"multiple-choice","topic":"Advanced JavaScript","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.358Z',
      '2025-10-21T22:24:06.358Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'c3ed599a-da15-40ea-899b-7cc61f589402',
      'What''s the output of curried arrow function?',
      'What''s the output?

```javascript
const add = x => y => z => {
  console.log(x, y, z);
  return x + y + z;
};
add(4)(5)(6);
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`4` `5` `6`","isCorrect":true,"explanation":""},{"id":"b","text":"`6` `5` `4`","isCorrect":false,"explanation":""},{"id":"c","text":"`4` `function` `function`","isCorrect":false,"explanation":""},{"id":"d","text":"`undefined` `undefined` `6`","isCorrect":false,"explanation":""}]',
      'c',
      'Each function call returns the next function, closing over previous arguments. Final call logs `4 5 6`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','advanced-javascript','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-101–125QA-js-q-123","original_type":"multiple-choice","topic":"Advanced JavaScript","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.358Z',
      '2025-10-21T22:24:06.358Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '663874bc-af33-4cca-a04c-c3387a2cce5f',
      'What''s the output of async generator with for await?',
      'What''s the output?

```javascript
async function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield Promise.resolve(i);
  }
}
(async () => {
  const gen = range(1, 3);
  for await (const item of gen) {
    console.log(item);
  }
})();
```',
      'multiple-choice',
      'advanced',
      10,
      '[{"id":"a","text":"`Promise {1}` `Promise {2}` `Promise {3}`","isCorrect":false,"explanation":""},{"id":"b","text":"`Promise {<pending>}` `Promise {<pending>}` `Promise {<pending>}`","isCorrect":false,"explanation":""},{"id":"c","text":"`1` `2` `3`","isCorrect":true,"explanation":""},{"id":"d","text":"`undefined` `undefined` `undefined`","isCorrect":false,"explanation":""}]',
      'c',
      '`for await...of` automatically awaits each yielded promise, so the resolved values `1`, `2`, `3` are logged.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','advanced-javascript','advanced']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-101–125QA-js-q-124","original_type":"multiple-choice","topic":"Advanced JavaScript","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.358Z',
      '2025-10-21T22:24:06.358Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '4c9365e4-a89a-4127-b932-91be4d6c2286',
      'What''s the output when passing primitives to object-destructured function?',
      'What''s the output?

```javascript
const myFunc = ({ x, y, z }) => {
  console.log(x, y, z);
};
myFunc(1, 2, 3);
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`1` `2` `3`","isCorrect":false,"explanation":""},{"id":"b","text":"`{1: 1}` `{2: 2}` `{3: 3}`","isCorrect":false,"explanation":""},{"id":"c","text":"`{ 1: undefined }` `undefined` `undefined`","isCorrect":false,"explanation":""},{"id":"d","text":"`undefined` `undefined` `undefined`","isCorrect":true,"explanation":""}]',
      'c',
      '`myFunc` expects an object, but receives numbers. Destructuring `undefined` properties results in `undefined` for `x`, `y`, `z`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','advanced-javascript','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-101–125QA-js-q-125","original_type":"multiple-choice","topic":"Advanced JavaScript","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.358Z',
      '2025-10-21T22:24:06.358Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'eb02d208-4648-4b9f-8138-2e52fb7ab47e',
      'Does the global execution context create global object and ''this''?',
      'The JavaScript global execution context creates two things for you: the global object, and the "this" keyword.',
      'true-false',
      'beginner',
      10,
      '[{"id":"true","text":"True","isCorrect":false},{"id":"false","text":"False","isCorrect":true}]',
      'false',
      'The global execution context creates the global object (e.g., `window` in browsers) and sets `this` to refer to it in non-strict mode.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','es6+-features','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-26-50QA-js-q-026","original_type":"true-false","topic":"ES6+ Features","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.359Z',
      '2025-10-21T22:24:06.359Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'e6d198df-0aa8-4137-a2f3-6b104ab4e58f',
      'What''s the output of loop with continue?',
      'What''s the output?

```javascript
for (let i = 1; i < 5; i++) {
  if (i === 3) continue;
  console.log(i);
}
```',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"`1` `2`","isCorrect":false,"explanation":""},{"id":"b","text":"`1` `2` `3`","isCorrect":false,"explanation":""},{"id":"c","text":"`1` `2` `4`","isCorrect":true,"explanation":""},{"id":"d","text":"`1` `3` `4`","isCorrect":false,"explanation":""}]',
      'c',
      'The `continue` statement skips the current iteration when `i === 3`, so `3` is not logged.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','es6+-features','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-26-50QA-js-q-027","original_type":"multiple-choice","topic":"ES6+ Features","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.359Z',
      '2025-10-21T22:24:06.359Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '5932f9a7-021b-42f4-a5a5-692d72b15faf',
      'Can you add methods to String.prototype?',
      'What''s the output?

```javascript
String.prototype.giveLydiaPizza = () => {
  return ''Just give Lydia pizza already!'';
};
const name = ''Lydia'';
console.log(name.giveLydiaPizza())
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`\"Just give Lydia pizza already!\"`","isCorrect":true,"explanation":""},{"id":"b","text":"`TypeError: not a function`","isCorrect":false,"explanation":""},{"id":"c","text":"`SyntaxError`","isCorrect":false,"explanation":""},{"id":"d","text":"`undefined`","isCorrect":false,"explanation":""}]',
      'c',
      'Primitive strings are automatically wrapped in a `String` object, which inherits methods from `String.prototype`. Thus, the method is accessible.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','es6+-features','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-26-50QA-js-q-028","original_type":"multiple-choice","topic":"ES6+ Features","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.359Z',
      '2025-10-21T22:24:06.359Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '5fb3cc96-e1e6-48e0-b483-017e2a370581',
      'What''s the output when using objects as keys?',
      'What''s the output?

```javascript
const a = {};
const b = { key: ''b'' };
const c = { key: ''c'' };
a[b] = 123;
a[c] = 456;
console.log(a[b]);
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`123`","isCorrect":false,"explanation":""},{"id":"b","text":"`456`","isCorrect":true,"explanation":""},{"id":"c","text":"`undefined`","isCorrect":false,"explanation":""},{"id":"d","text":"`ReferenceError`","isCorrect":false,"explanation":""}]',
      'c',
      'Object keys are converted to strings. Both `b` and `c` become `"[object Object]"`, so the second assignment overwrites the first.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','es6+-features','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-26-50QA-js-q-029","original_type":"multiple-choice","topic":"ES6+ Features","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.359Z',
      '2025-10-21T22:24:06.359Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '41ccfd64-230d-487e-8677-d4a2065e4e5e',
      'What''s the output with setTimeout and call order?',
      'What''s the output?

```javascript
const foo = () => console.log(''First'');
const bar = () => setTimeout(() => console.log(''Second''));
const baz = () => console.log(''Third'');
bar();
foo();
baz();
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`First` `Second` `Third`","isCorrect":false,"explanation":""},{"id":"b","text":"`First` `Third` `Second`","isCorrect":true,"explanation":""},{"id":"c","text":"`Second` `First` `Third`","isCorrect":false,"explanation":""},{"id":"d","text":"`Second` `Third` `First`","isCorrect":false,"explanation":""}]',
      'c',
      '`setTimeout` callbacks are added to the task queue and run after the call stack is empty. So sync logs (`First`, `Third`) appear before `Second`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','es6+-features','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-26-50QA-js-q-030","original_type":"multiple-choice","topic":"ES6+ Features","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.359Z',
      '2025-10-21T22:24:06.359Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '3ddff071-51fd-4160-8050-36e597fe3359',
      'What is event.target when clicking nested elements?',
      'What is the event.target when clicking the button?

```html
<div onclick="console.log(''first div'')">
  <div onclick="console.log(''second div'')">
    <button onclick="console.log(''button'')">
      Click!
    </button>
  </div>
</div>
```',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"Outer `div`","isCorrect":false,"explanation":""},{"id":"b","text":"Inner `div`","isCorrect":false,"explanation":""},{"id":"c","text":"`button`","isCorrect":true,"explanation":""},{"id":"d","text":"An array of all nested elements.","isCorrect":false,"explanation":""}]',
      'c',
      '`event.target` is always the deepest element that triggered the event—in this case, the `<button>`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','es6+-features','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-26-50QA-js-q-031","original_type":"multiple-choice","topic":"ES6+ Features","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.359Z',
      '2025-10-21T22:24:06.359Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'b3c237cf-234e-4882-b8ee-c68adc650299',
      'What''s logged when clicking paragraph with bubbling?',
      'When you click the paragraph, what''s the logged output?

```html
<div onclick="console.log(''div'')">
  <p onclick="console.log(''p'')">
    Click here!
  </p>
</div>
```',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"`p` `div`","isCorrect":true,"explanation":""},{"id":"b","text":"`div` `p`","isCorrect":false,"explanation":""},{"id":"c","text":"`p`","isCorrect":false,"explanation":""},{"id":"d","text":"`div`","isCorrect":false,"explanation":""}]',
      'c',
      'By default, event handlers run in the bubbling phase: from target (`p`) up to ancestors (`div`). So `p` logs first, then `div`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','es6+-features','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-26-50QA-js-q-032","original_type":"multiple-choice","topic":"ES6+ Features","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.359Z',
      '2025-10-21T22:24:06.359Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'f33c6e93-cc42-45e7-b3f5-38a155950414',
      'What''s the output of call vs bind?',
      'What''s the output?

```javascript
const person = { name: ''Lydia'' };
function sayHi(age) {
  return `${this.name} is ${age}`;
}
console.log(sayHi.call(person, 21));
console.log(sayHi.bind(person, 21));
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`undefined is 21` `Lydia is 21`","isCorrect":false,"explanation":""},{"id":"b","text":"`function` `function`","isCorrect":false,"explanation":""},{"id":"c","text":"`Lydia is 21` `Lydia is 21`","isCorrect":false,"explanation":""},{"id":"d","text":"`Lydia is 21` `function`","isCorrect":true,"explanation":""}]',
      'c',
      '`.call()` executes immediately and returns the string. `.bind()` returns a new function (not executed), so `typeof` would be `''function''`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','es6+-features','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-26-50QA-js-q-033","original_type":"multiple-choice","topic":"ES6+ Features","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.359Z',
      '2025-10-21T22:24:06.359Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'f7f93f3d-b710-4886-811a-c6e2301a729e',
      'What''s typeof of IIFE returning number?',
      'What''s the output?

```javascript
function sayHi() {
  return (() => 0)();
}
console.log(typeof sayHi());
```',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"`\"object\"`","isCorrect":false,"explanation":""},{"id":"b","text":"`\"number\"`","isCorrect":true,"explanation":""},{"id":"c","text":"`\"function\"`","isCorrect":false,"explanation":""},{"id":"d","text":"`\"undefined\"`","isCorrect":false,"explanation":""}]',
      'c',
      'The IIFE returns `0`, which is a number. `typeof 0` is `''number''`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','es6+-features','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-26-50QA-js-q-034","original_type":"multiple-choice","topic":"ES6+ Features","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.359Z',
      '2025-10-21T22:24:06.359Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '7c2d774b-2b99-4015-9fc6-72c3f3ce3d6a',
      'Which values are falsy?',
      'Which of these values are falsy?

```javascript
0;
new Number(0);
('''');
('' '');
new Boolean(false);
undefined;
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`0`, `''''`, `undefined`","isCorrect":true,"explanation":""},{"id":"b","text":"`0`, `new Number(0)`, `''''`, `new Boolean(false)`, `undefined`","isCorrect":false,"explanation":""},{"id":"c","text":"`0`, `''''`, `new Boolean(false)`, `undefined`","isCorrect":false,"explanation":""},{"id":"d","text":"All of them are falsy","isCorrect":false,"explanation":""}]',
      'c',
      'Only primitive falsy values count: `0`, `''''`, and `undefined`. `new Number(0)` and `new Boolean(false)` are objects (truthy). `'' ''` is a non-empty string (truthy).',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','es6+-features','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-26-50QA-js-q-035","original_type":"multiple-choice","topic":"ES6+ Features","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.359Z',
      '2025-10-21T22:24:06.359Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'd2f9be2e-eb02-466b-b347-053b67ac9a28',
      'What''s typeof typeof 1?',
      'What''s the output?

```javascript
console.log(typeof typeof 1);
```',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"`\"number\"`","isCorrect":false,"explanation":""},{"id":"b","text":"`\"string\"`","isCorrect":true,"explanation":""},{"id":"c","text":"`\"object\"`","isCorrect":false,"explanation":""},{"id":"d","text":"`\"undefined\"`","isCorrect":false,"explanation":""}]',
      'c',
      '`typeof 1` returns `''number''` (a string). `typeof ''number''` returns `''string''`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','es6+-features','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-26-50QA-js-q-036","original_type":"multiple-choice","topic":"ES6+ Features","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.359Z',
      '2025-10-21T22:24:06.359Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '0abdd7c2-cf51-4d2e-a679-ca0ee0af2b34',
      'What''s the output of sparse array assignment?',
      'What''s the output?

```javascript
const numbers = [1, 2, 3];
numbers[10] = 11;
console.log(numbers);
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`[1, 2, 3, null x 7, 11]`","isCorrect":false,"explanation":""},{"id":"b","text":"`[1, 2, 3, 11]`","isCorrect":false,"explanation":""},{"id":"c","text":"`[1, 2, 3, empty x 7, 11]`","isCorrect":true,"explanation":""},{"id":"d","text":"`SyntaxError`","isCorrect":false,"explanation":""}]',
      'c',
      'Setting an index beyond the current length creates empty slots (not `null`). The array becomes `[1, 2, 3, <7 empty items>, 11]`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','es6+-features','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-26-50QA-js-q-037","original_type":"multiple-choice","topic":"ES6+ Features","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.359Z',
      '2025-10-21T22:24:06.359Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '61fd3547-3f4e-4725-a75a-63a96853a05e',
      'What''s the output with catch block variable shadowing?',
      'What''s the output?

```javascript
(() => {
  let x, y;
  try {
    throw new Error();
  } catch (x) {
    (x = 1), (y = 2);
    console.log(x);
  }
  console.log(x);
  console.log(y);
})();
```',
      'multiple-choice',
      'advanced',
      10,
      '[{"id":"a","text":"`1` `undefined` `2`","isCorrect":true,"explanation":""},{"id":"b","text":"`undefined` `undefined` `undefined`","isCorrect":false,"explanation":""},{"id":"c","text":"`1` `1` `2`","isCorrect":false,"explanation":""},{"id":"d","text":"`1` `undefined` `undefined`","isCorrect":false,"explanation":""}]',
      'c',
      'The `catch` parameter `x` is block-scoped. Assigning `x = 1` affects only the block-scoped `x`. The outer `x` remains `undefined`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','es6+-features','advanced']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-26-50QA-js-q-038","original_type":"multiple-choice","topic":"ES6+ Features","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.359Z',
      '2025-10-21T22:24:06.359Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '1492e3ff-58dd-4e28-8bdb-7d14397c7dca',
      'What are the two fundamental types in JavaScript?',
      'Everything in JavaScript is either a...',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"primitive or object","isCorrect":true,"explanation":""},{"id":"b","text":"function or object","isCorrect":false,"explanation":""},{"id":"c","text":"trick question! only objects","isCorrect":false,"explanation":""},{"id":"d","text":"number or object","isCorrect":false,"explanation":""}]',
      'c',
      'JavaScript has 7 primitive types (`string`, `number`, etc.) and objects. Functions and arrays are objects.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','es6+-features','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-26-50QA-js-q-039","original_type":"multiple-choice","topic":"ES6+ Features","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.359Z',
      '2025-10-21T22:24:06.359Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '1468d179-a9f8-44f7-945f-0c5e8e728571',
      'What''s the output of reduce with initial value?',
      'What''s the output?

```javascript
[[0, 1], [2, 3]].reduce(
  (acc, cur) => {
    return acc.concat(cur);
  },
  [1, 2],
);
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`[0, 1, 2, 3, 1, 2]`","isCorrect":false,"explanation":""},{"id":"b","text":"`[6, 1, 2]`","isCorrect":false,"explanation":""},{"id":"c","text":"`[1, 2, 0, 1, 2, 3]`","isCorrect":true,"explanation":""},{"id":"d","text":"`[1, 2, 6]`","isCorrect":false,"explanation":""}]',
      'c',
      'Initial value is `[1, 2]`. First iteration: `[1,2].concat([0,1])` → `[1,2,0,1]`. Second: `.concat([2,3])` → `[1,2,0,1,2,3]`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','es6+-features','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-26-50QA-js-q-040","original_type":"multiple-choice","topic":"ES6+ Features","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.359Z',
      '2025-10-21T22:24:06.359Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '5e2c509d-c2e8-4f77-a28d-e87d1be532ea',
      'What''s the output of double negation?',
      'What''s the output?

```javascript
!!null;
!!'''';
!!1;
```',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"`false` `true` `false`","isCorrect":false,"explanation":""},{"id":"b","text":"`false` `false` `true`","isCorrect":true,"explanation":""},{"id":"c","text":"`false` `true` `true`","isCorrect":false,"explanation":""},{"id":"d","text":"`true` `true` `false`","isCorrect":false,"explanation":""}]',
      'c',
      '`!!` converts to boolean. `null` and `''''` are falsy → `false`. `1` is truthy → `true`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','es6+-features','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-26-50QA-js-q-041","original_type":"multiple-choice","topic":"ES6+ Features","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.359Z',
      '2025-10-21T22:24:06.359Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '5849ffb4-400a-4f3e-9144-5c7831e3f93a',
      'What does setInterval return?',
      'What does the `setInterval` method return in the browser?

```javascript
setInterval(() => console.log(''Hi''), 1000);
```',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"a unique id","isCorrect":true,"explanation":""},{"id":"b","text":"the amount of milliseconds specified","isCorrect":false,"explanation":""},{"id":"c","text":"the passed function","isCorrect":false,"explanation":""},{"id":"d","text":"`undefined`","isCorrect":false,"explanation":""}]',
      'c',
      '`setInterval` returns a unique numeric ID that can be used with `clearInterval` to stop the timer.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','es6+-features','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-26-50QA-js-q-042","original_type":"multiple-choice","topic":"ES6+ Features","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.359Z',
      '2025-10-21T22:24:06.359Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'd8bc2f1b-1acf-453b-94db-0860d7c7c5a9',
      'What does spreading a string return?',
      'What does this return?

```javascript
[...''Lydia''];
```',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"`[\"L\", \"y\", \"d\", \"i\", \"a\"]`","isCorrect":true,"explanation":""},{"id":"b","text":"`[\"Lydia\"]`","isCorrect":false,"explanation":""},{"id":"c","text":"`[[], \"Lydia\"]`","isCorrect":false,"explanation":""},{"id":"d","text":"`[[\"L\", \"y\", \"d\", \"i\", \"a\"]]`","isCorrect":false,"explanation":""}]',
      'c',
      'Strings are iterable. The spread operator converts them into an array of characters.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','es6+-features','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-26-50QA-js-q-043","original_type":"multiple-choice","topic":"ES6+ Features","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.359Z',
      '2025-10-21T22:24:06.359Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '18f14fa8-f5a7-46cc-892d-22390b653ef7',
      'What''s the output of generator function?',
      'What''s the output?

```javascript
function* generator(i) {
  yield i;
  yield i * 2;
}
const gen = generator(10);
console.log(gen.next().value);
console.log(gen.next().value);
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`[0, 10], [10, 20]`","isCorrect":false,"explanation":""},{"id":"b","text":"`20, 20`","isCorrect":false,"explanation":""},{"id":"c","text":"`10, 20`","isCorrect":true,"explanation":""},{"id":"d","text":"`0, 10 and 10, 20`","isCorrect":false,"explanation":""}]',
      'c',
      'First `next()` yields `10`. Second yields `10 * 2 = 20`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','es6+-features','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-26-50QA-js-q-044","original_type":"multiple-choice","topic":"ES6+ Features","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.359Z',
      '2025-10-21T22:24:06.359Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'ad9ac1e4-d731-41c4-b7b6-8e08f867d8e3',
      'What does Promise.race return?',
      'What does this return?

```javascript
const firstPromise = new Promise((res, rej) => {
  setTimeout(res, 500, ''one'');
});
const secondPromise = new Promise((res, rej) => {
  setTimeout(res, 100, ''two'');
});
Promise.race([firstPromise, secondPromise]).then(res => console.log(res));
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`\"one\"`","isCorrect":false,"explanation":""},{"id":"b","text":"`\"two\"`","isCorrect":true,"explanation":""},{"id":"c","text":"`\"two\" \"one\"`","isCorrect":false,"explanation":""},{"id":"d","text":"`\"one\" \"two\"`","isCorrect":false,"explanation":""}]',
      'c',
      '`Promise.race` resolves with the first promise to settle. `secondPromise` resolves after 100ms, so `''two''` is logged.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','es6+-features','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-26-50QA-js-q-045","original_type":"multiple-choice","topic":"ES6+ Features","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.359Z',
      '2025-10-21T22:24:06.359Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'a90a8ee5-88fa-483e-b9bc-b969a58432af',
      'What''s the output after reassigning object reference?',
      'What''s the output?

```javascript
let person = { name: ''Lydia'' };
const members = [person];
person = null;
console.log(members);
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`null`","isCorrect":false,"explanation":""},{"id":"b","text":"`[null]`","isCorrect":false,"explanation":""},{"id":"c","text":"`[{}]`","isCorrect":false,"explanation":""},{"id":"d","text":"`[{ name: \"Lydia\" }]`","isCorrect":true,"explanation":""}]',
      'c',
      '`members[0]` holds a reference to the original object. Reassigning `person` doesn’t affect that reference.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','es6+-features','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-26-50QA-js-q-046","original_type":"multiple-choice","topic":"ES6+ Features","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.359Z',
      '2025-10-21T22:24:06.359Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '7b543b35-21cb-48f8-974c-2993d6d4b51a',
      'What''s the output of for-in on object?',
      'What''s the output?

```javascript
const person = {
  name: ''Lydia'',
  age: 21,
};
for (const item in person) {
  console.log(item);
}
```',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"`{ name: \"Lydia\" }, { age: 21 }`","isCorrect":false,"explanation":""},{"id":"b","text":"`\"name\", \"age\"`","isCorrect":true,"explanation":""},{"id":"c","text":"`\"Lydia\", 21`","isCorrect":false,"explanation":""},{"id":"d","text":"`[\"name\", \"Lydia\"], [\"age\", 21]`","isCorrect":false,"explanation":""}]',
      'c',
      '`for-in` iterates over enumerable property names (keys), which are strings: `''name''` and `''age''`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','es6+-features','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-26-50QA-js-q-047","original_type":"multiple-choice","topic":"ES6+ Features","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.359Z',
      '2025-10-21T22:24:06.359Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '69125c2f-c787-4c5e-8a99-1d4b26635eb6',
      'What''s the output of mixed number and string addition?',
      'What''s the output?

```javascript
console.log(3 + 4 + ''5'');
```',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"`\"345\"`","isCorrect":false,"explanation":""},{"id":"b","text":"`\"75\"`","isCorrect":true,"explanation":""},{"id":"c","text":"`12`","isCorrect":false,"explanation":""},{"id":"d","text":"`\"12\"`","isCorrect":false,"explanation":""}]',
      'c',
      'Left-to-right: `3 + 4 = 7` (number), then `7 + ''5'' = ''75''` (string concatenation).',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','es6+-features','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-26-50QA-js-q-048","original_type":"multiple-choice","topic":"ES6+ Features","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.359Z',
      '2025-10-21T22:24:06.359Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '33974a7c-c243-4e83-8eb9-2886887397f0',
      'What''s the value of parseInt with invalid characters?',
      'What''s the value of `num`?

```javascript
const num = parseInt(''7*6'', 10);
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`42`","isCorrect":false,"explanation":""},{"id":"b","text":"`\"42\"`","isCorrect":false,"explanation":""},{"id":"c","text":"`7`","isCorrect":true,"explanation":""},{"id":"d","text":"`NaN`","isCorrect":false,"explanation":""}]',
      'c',
      '`parseInt` stops at the first invalid character (`*`), so only `''7''` is parsed → `7`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','es6+-features','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-26-50QA-js-q-049","original_type":"multiple-choice","topic":"ES6+ Features","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.359Z',
      '2025-10-21T22:24:06.359Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'ba933d3b-1c38-4114-b2f5-86aa817d58c2',
      'What''s the output of map returning undefined?',
      'What''s the output?

```javascript
[1, 2, 3].map(num => {
  if (typeof num === ''number'') return;
  return num * 2;
});
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`[]`","isCorrect":false,"explanation":""},{"id":"b","text":"`[null, null, null]`","isCorrect":false,"explanation":""},{"id":"c","text":"`[undefined, undefined, undefined]`","isCorrect":true,"explanation":""},{"id":"d","text":"`[ 3 x empty ]`","isCorrect":false,"explanation":""}]',
      'c',
      'The `if` block returns `undefined` for all numbers. `map` returns `[undefined, undefined, undefined]`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','es6+-features','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-26-50QA-js-q-050","original_type":"multiple-choice","topic":"ES6+ Features","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.363Z',
      '2025-10-21T22:24:06.363Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '92984a96-8c87-4671-abc9-b3b0fc03a9eb',
      'What''s the output when passing objects and primitives to functions?',
      'What''s the output?

```javascript
function getInfo(member, year) {
  member.name = ''Lydia'';
  year = ''1998'';
}
const person = { name: ''Sarah'' };
const birthYear = ''1997'';
getInfo(person, birthYear);
console.log(person, birthYear);
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`{ name: \"Lydia\" }, \"1997\"`","isCorrect":true,"explanation":""},{"id":"b","text":"`{ name: \"Sarah\" }, \"1998\"`","isCorrect":false,"explanation":""},{"id":"c","text":"`{ name: \"Lydia\" }, \"1998\"`","isCorrect":false,"explanation":""},{"id":"d","text":"`{ name: \"Sarah\" }, \"1997\"`","isCorrect":false,"explanation":""}]',
      'c',
      'Objects are passed by reference (copied reference), so modifications inside the function affect the original object. Primitives like strings are passed by value, so reassigning `year` doesn’t affect `birthYear`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','async-programming','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-51-75QA-js-q-051","original_type":"multiple-choice","topic":"Async Programming","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.364Z',
      '2025-10-21T22:24:06.364Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'e78951ed-4d15-4402-a389-687bfd5dae86',
      'What''s the output of throwing a string in try-catch?',
      'What''s the output?

```javascript
function greeting() {
  throw ''Hello world!'';
}
function sayHi() {
  try {
    const data = greeting();
    console.log(''It worked!'', data);
  } catch (e) {
    console.log(''Oh no an error:'', e);
  }
}
sayHi();
```',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"`It worked! Hello world!`","isCorrect":false,"explanation":""},{"id":"b","text":"`Oh no an error: undefined`","isCorrect":false,"explanation":""},{"id":"c","text":"`SyntaxError: can only throw Error objects`","isCorrect":false,"explanation":""},{"id":"d","text":"`Oh no an error: Hello world!`","isCorrect":true,"explanation":""}]',
      'c',
      'You can throw any value in JavaScript, including strings. The `catch` block receives it as `e`, so the string is logged.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','async-programming','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-51-75QA-js-q-052","original_type":"multiple-choice","topic":"Async Programming","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.364Z',
      '2025-10-21T22:24:06.364Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '94ed9300-be6c-4f37-8d72-c9dd087aa8d4',
      'What''s the output when constructor returns an object?',
      'What''s the output?

```javascript
function Car() {
  this.make = ''Lamborghini'';
  return { make: ''Maserati'' };
}
const myCar = new Car();
console.log(myCar.make);
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`\"Lamborghini\"`","isCorrect":false,"explanation":""},{"id":"b","text":"`\"Maserati\"`","isCorrect":true,"explanation":""},{"id":"c","text":"`ReferenceError`","isCorrect":false,"explanation":""},{"id":"d","text":"`TypeError`","isCorrect":false,"explanation":""}]',
      'c',
      'When a constructor explicitly returns an object, that object is used instead of the one created by `new`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','async-programming','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-51-75QA-js-q-053","original_type":"multiple-choice","topic":"Async Programming","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.364Z',
      '2025-10-21T22:24:06.364Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '0bac3154-8397-459f-8572-56fc3d7b8a83',
      'What''s the output of implicit global with let?',
      'What''s the output?

```javascript
(() => {
  let x = (y = 10);
})();
console.log(typeof x);
console.log(typeof y);
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`\"undefined\", \"number\"`","isCorrect":true,"explanation":""},{"id":"b","text":"`\"number\", \"number\"`","isCorrect":false,"explanation":""},{"id":"c","text":"`\"object\", \"number\"`","isCorrect":false,"explanation":""},{"id":"d","text":"`\"number\", \"undefined\"`","isCorrect":false,"explanation":""}]',
      'c',
      '`y = 10` creates a global variable because it’s an unqualified assignment. `x` is block-scoped with `let`, so it’s `undefined` outside the IIFE.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','async-programming','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-51-75QA-js-q-054","original_type":"multiple-choice","topic":"Async Programming","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.364Z',
      '2025-10-21T22:24:06.364Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '552b67a7-d486-459a-bafd-0351d44231b3',
      'What''s the output after deleting a method from prototype?',
      'What''s the output?

```javascript
class Dog {
  constructor(name) {
    this.name = name;
  }
}
Dog.prototype.bark = function() {
  console.log(`Woof I am ${this.name}`);
};
const pet = new Dog(''Mara'');
pet.bark();
delete Dog.prototype.bark;
pet.bark();
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`\"Woof I am Mara\"`, `TypeError`","isCorrect":true,"explanation":""},{"id":"b","text":"`\"Woof I am Mara\"`, `\"Woof I am Mara\"`","isCorrect":false,"explanation":""},{"id":"c","text":"`\"Woof I am Mara\"`, `undefined`","isCorrect":false,"explanation":""},{"id":"d","text":"`TypeError`, `TypeError`","isCorrect":false,"explanation":""}]',
      'c',
      'Deleting a method from the prototype removes it from the prototype chain. Subsequent calls result in `TypeError` because `pet.bark` becomes `undefined`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','async-programming','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-51-75QA-js-q-055","original_type":"multiple-choice","topic":"Async Programming","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.364Z',
      '2025-10-21T22:24:06.364Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'd120f89e-1737-45c6-b9cf-a7ffe2047c45',
      'What''s the output of Set with duplicate values?',
      'What''s the output?

```javascript
const set = new Set([1, 1, 2, 3, 4]);
console.log(set);
```',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"`[1, 1, 2, 3, 4]`","isCorrect":false,"explanation":""},{"id":"b","text":"`[1, 2, 3, 4]`","isCorrect":false,"explanation":""},{"id":"c","text":"`{1, 1, 2, 3, 4}`","isCorrect":false,"explanation":""},{"id":"d","text":"`{1, 2, 3, 4}`","isCorrect":true,"explanation":""}]',
      'c',
      '`Set` only stores unique values. Duplicates are ignored, so the result is `{1, 2, 3, 4}`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','async-programming','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-51-75QA-js-q-056","original_type":"multiple-choice","topic":"Async Programming","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.364Z',
      '2025-10-21T22:24:06.364Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'e0e78aa2-80f0-4da4-89d1-947b59c46084',
      'What''s the output when modifying imported ES module?',
      'What''s the output?

```javascript
// counter.js
let counter = 10;
export default counter;
// index.js
import myCounter from ''./counter'';
myCounter += 1;
console.log(myCounter);
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`10`","isCorrect":false,"explanation":""},{"id":"b","text":"`11`","isCorrect":false,"explanation":""},{"id":"c","text":"`Error`","isCorrect":true,"explanation":""},{"id":"d","text":"`NaN`","isCorrect":false,"explanation":""}]',
      'c',
      'ES module imports are live bindings but read-only. Attempting to reassign `myCounter` throws an error.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','async-programming','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-51-75QA-js-q-057","original_type":"multiple-choice","topic":"Async Programming","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.364Z',
      '2025-10-21T22:24:06.364Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '9f38a214-4650-49d0-a386-f05e91e063f3',
      'What''s the output of delete on const and implicit global?',
      'What''s the output?

```javascript
const name = ''Lydia'';
age = 21;
console.log(delete name);
console.log(delete age);
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`false`, `true`","isCorrect":true,"explanation":""},{"id":"b","text":"`\"Lydia\"`, `21`","isCorrect":false,"explanation":""},{"id":"c","text":"`true`, `true`","isCorrect":false,"explanation":""},{"id":"d","text":"`undefined`, `undefined`","isCorrect":false,"explanation":""}]',
      'c',
      '`delete` returns `false` for variables declared with `const`/`let`/`var`. Implicit globals (like `age`) are properties of the global object and can be deleted (`true`).',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','async-programming','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-51-75QA-js-q-058","original_type":"multiple-choice","topic":"Async Programming","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.364Z',
      '2025-10-21T22:24:06.364Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '7cc4204c-8d64-472a-afe9-c86d5056c53d',
      'What''s the output of array destructuring?',
      'What''s the output?

```javascript
const numbers = [1, 2, 3, 4, 5];
const [y] = numbers;
console.log(y);
```',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"`[[1, 2, 3, 4, 5]]`","isCorrect":false,"explanation":""},{"id":"b","text":"`[1, 2, 3, 4, 5]`","isCorrect":false,"explanation":""},{"id":"c","text":"`1`","isCorrect":true,"explanation":""},{"id":"d","text":"`[1]`","isCorrect":false,"explanation":""}]',
      'c',
      'Array destructuring assigns the first element to `y`, so `1` is logged.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','async-programming','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-51-75QA-js-q-059","original_type":"multiple-choice","topic":"Async Programming","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.364Z',
      '2025-10-21T22:24:06.364Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'b012bc3a-d632-43c2-a687-47339678d172',
      'What''s the output of object spread?',
      'What''s the output?

```javascript
const user = { name: ''Lydia'', age: 21 };
const admin = { admin: true, ...user };
console.log(admin);
```',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"`{ admin: true, user: { name: \"Lydia\", age: 21 } }`","isCorrect":false,"explanation":""},{"id":"b","text":"`{ admin: true, name: \"Lydia\", age: 21 }`","isCorrect":true,"explanation":""},{"id":"c","text":"`{ admin: true, user: [\"Lydia\", 21] }`","isCorrect":false,"explanation":""},{"id":"d","text":"`{ admin: true }`","isCorrect":false,"explanation":""}]',
      'c',
      'The spread operator copies enumerable properties from `user` into `admin`, resulting in a flat object with all keys.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','async-programming','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-51-75QA-js-q-060","original_type":"multiple-choice","topic":"Async Programming","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.365Z',
      '2025-10-21T22:24:06.365Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '49f5feda-7554-4581-b8f7-62261c27d21c',
      'What''s the output of Object.defineProperty and Object.keys?',
      'What''s the output?

```javascript
const person = { name: ''Lydia'' };
Object.defineProperty(person, ''age'', { value: 21 });
console.log(person);
console.log(Object.keys(person));
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`{ name: \"Lydia\", age: 21 }`, `[\"name\", \"age\"]`","isCorrect":false,"explanation":""},{"id":"b","text":"`{ name: \"Lydia\", age: 21 }`, `[\"name\"]`","isCorrect":true,"explanation":""},{"id":"c","text":"`{ name: \"Lydia\"}`, `[\"name\", \"age\"]`","isCorrect":false,"explanation":""},{"id":"d","text":"`{ name: \"Lydia\"}`, `[\"age\"]`","isCorrect":false,"explanation":""}]',
      'c',
      'Properties added via `Object.defineProperty` are non-enumerable by default, so `Object.keys` only returns `[''name'']`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','async-programming','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-51-75QA-js-q-061","original_type":"multiple-choice","topic":"Async Programming","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.365Z',
      '2025-10-21T22:24:06.365Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'e332cbfc-19d4-46a3-8c03-1bcf69b13604',
      'What''s the output of JSON.stringify with replacer array?',
      'What''s the output?

```javascript
const settings = {
  username: ''lydiahallie'',
  level: 19,
  health: 90,
};
const data = JSON.stringify(settings, [''level'', ''health'']);
console.log(data);
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`\"{\"level\":19, \"health\":90}\"`","isCorrect":true,"explanation":""},{"id":"b","text":"`\"{\"username\": \"lydiahallie\"}\"`","isCorrect":false,"explanation":""},{"id":"c","text":"`\"[\"level\", \"health\"]\"`","isCorrect":false,"explanation":""},{"id":"d","text":"`\"{\"username\": \"lydiahallie\", \"level\":19, \"health\":90}\"`","isCorrect":false,"explanation":""}]',
      'c',
      'The replacer array filters which properties are included in the JSON string. Only `''level''` and `''health''` are included.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','async-programming','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-51-75QA-js-q-062","original_type":"multiple-choice","topic":"Async Programming","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.365Z',
      '2025-10-21T22:24:06.365Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '58f5656a-60f1-45c3-99a6-fafe64a149c7',
      'What''s the output of postfix increment in function?',
      'What''s the output?

```javascript
let num = 10;
const increaseNumber = () => num++;
const increasePassedNumber = number => number++;
const num1 = increaseNumber();
const num2 = increasePassedNumber(num1);
console.log(num1);
console.log(num2);
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`10`, `10`","isCorrect":true,"explanation":""},{"id":"b","text":"`10`, `11`","isCorrect":false,"explanation":""},{"id":"c","text":"`11`, `11`","isCorrect":false,"explanation":""},{"id":"d","text":"`11`, `12`","isCorrect":false,"explanation":""}]',
      'c',
      'Postfix `++` returns the original value before incrementing. So both `num1` and `num2` are `10`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','async-programming','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-51-75QA-js-q-063","original_type":"multiple-choice","topic":"Async Programming","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.365Z',
      '2025-10-21T22:24:06.365Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '90f45477-1275-40c1-981c-a2bebba3f523',
      'What''s the output of function with object default parameter?',
      'What''s the output?

```javascript
const value = { number: 10 };
const multiply = (x = { ...value }) => {
  console.log((x.number *= 2));
};
multiply();
multiply();
multiply(value);
multiply(value);
```',
      'multiple-choice',
      'advanced',
      10,
      '[{"id":"a","text":"`20`, `40`, `80`, `160`","isCorrect":false,"explanation":""},{"id":"b","text":"`20`, `40`, `20`, `40`","isCorrect":false,"explanation":""},{"id":"c","text":"`20`, `20`, `20`, `40`","isCorrect":true,"explanation":""},{"id":"d","text":"`NaN`, `NaN`, `20`, `40`","isCorrect":false,"explanation":""}]',
      'c',
      'Default parameters are evaluated at call time, so each call without args gets a new object. But when `value` is passed, mutations persist.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','async-programming','advanced']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-51-75QA-js-q-064","original_type":"multiple-choice","topic":"Async Programming","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.365Z',
      '2025-10-21T22:24:06.365Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '4a0258d8-bcac-45b7-be74-2abc53609b78',
      'What''s the output of reduce without return?',
      'What''s the output?

```javascript
[1, 2, 3, 4].reduce((x, y) => console.log(x, y));
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`1` `2` and `3` `3` and `6` `4`","isCorrect":false,"explanation":""},{"id":"b","text":"`1` `2` and `2` `3` and `3` `4`","isCorrect":false,"explanation":""},{"id":"c","text":"`1` `undefined` and `2` `undefined` and `3` `undefined` and `4` `undefined`","isCorrect":false,"explanation":""},{"id":"d","text":"`1` `2` and `undefined` `3` and `undefined` `4`","isCorrect":true,"explanation":""}]',
      'c',
      'Without a return, the accumulator becomes `undefined` after the first iteration. So logs: `1 2`, then `undefined 3`, then `undefined 4`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','async-programming','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-51-75QA-js-q-065","original_type":"multiple-choice","topic":"Async Programming","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.365Z',
      '2025-10-21T22:24:06.365Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'e2fe9973-5f92-496f-9772-02c2349c3717',
      'Which constructor correctly extends Dog class?',
      'With which constructor can we successfully extend the `Dog` class?

```javascript
class Dog {
  constructor(name) {
    this.name = name;
  }
};
class Labrador extends Dog {
  // 1
  constructor(name, size) {
    this.size = size;
  }
  // 2
  constructor(name, size) {
    super(name);
    this.size = size;
  }
  // 3
  constructor(size) {
    super(name);
    this.size = size;
  }
  // 4
  constructor(name, size) {
    this.name = name;
    this.size = size;
  }
};
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"1","isCorrect":false,"explanation":""},{"id":"b","text":"2","isCorrect":true,"explanation":""},{"id":"c","text":"3","isCorrect":false,"explanation":""},{"id":"d","text":"4","isCorrect":false,"explanation":""}]',
      'c',
      'In derived classes, `super()` must be called before using `this`. Only option 2 does this correctly and passes the right arguments.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','async-programming','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-51-75QA-js-q-066","original_type":"multiple-choice","topic":"Async Programming","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.365Z',
      '2025-10-21T22:24:06.365Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '050c6732-b495-4c18-bb07-6c042cb089fd',
      'What''s the output of ES module import order?',
      'What''s the output?

```javascript
// index.js
console.log(''running index.js'');
import { sum } from ''./sum.js'';
console.log(sum(1, 2));
// sum.js
console.log(''running sum.js'');
export const sum = (a, b) => a + b;
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`running index.js`, `running sum.js`, `3`","isCorrect":false,"explanation":""},{"id":"b","text":"`running sum.js`, `running index.js`, `3`","isCorrect":true,"explanation":""},{"id":"c","text":"`running sum.js`, `3`, `running index.js`","isCorrect":false,"explanation":""},{"id":"d","text":"`running index.js`, `undefined`, `running sum.js`","isCorrect":false,"explanation":""}]',
      'c',
      'ES modules are parsed and executed before the importing module. So `sum.js` runs first.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','async-programming','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-51-75QA-js-q-067","original_type":"multiple-choice","topic":"Async Programming","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.365Z',
      '2025-10-21T22:24:06.365Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'eb983854-0f6e-4a0a-8e5c-dc50c9e58b6a',
      'What''s the output of Symbol equality?',
      'What''s the output?

```javascript
console.log(Number(2) === Number(2));
console.log(Boolean(false) === Boolean(false));
console.log(Symbol(''foo'') === Symbol(''foo''));
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`true`, `true`, `false`","isCorrect":true,"explanation":""},{"id":"b","text":"`false`, `true`, `false`","isCorrect":false,"explanation":""},{"id":"c","text":"`true`, `false`, `true`","isCorrect":false,"explanation":""},{"id":"d","text":"`true`, `true`, `true`","isCorrect":false,"explanation":""}]',
      'c',
      'Every `Symbol()` call creates a unique symbol, even with the same description. So `Symbol(''foo'') === Symbol(''foo'')` is `false`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','async-programming','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-51-75QA-js-q-068","original_type":"multiple-choice","topic":"Async Programming","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.365Z',
      '2025-10-21T22:24:06.365Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '0458e704-2cbd-4360-a053-c17e421ba42d',
      'What''s the output of String.padStart?',
      'What''s the output?

```javascript
const name = ''Lydia Hallie'';
console.log(name.padStart(13));
console.log(name.padStart(2));
```',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"`\"Lydia Hallie\"`, `\"Lydia Hallie\"`","isCorrect":false,"explanation":""},{"id":"b","text":"`\" Lydia Hallie\"`, `\" Lydia Hallie\"`","isCorrect":false,"explanation":""},{"id":"c","text":"`\" Lydia Hallie\"`, `\"Lydia Hallie\"`","isCorrect":true,"explanation":""},{"id":"d","text":"`\"Lydia Hallie\"`, `\"Lyd\"`","isCorrect":false,"explanation":""}]',
      'c',
      '`padStart(13)` adds 1 space (since length is 12). `padStart(2)` does nothing because 2 < 12.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','async-programming','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-51-75QA-js-q-069","original_type":"multiple-choice","topic":"Async Programming","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.365Z',
      '2025-10-21T22:24:06.365Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '8c697119-d9d5-4efc-85aa-88ab2a337011',
      'What''s the output of string concatenation with emojis?',
      'What''s the output?

```javascript
console.log(''🥑'' + ''💻'');
```',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"`\"🥑💻\"`","isCorrect":true,"explanation":""},{"id":"b","text":"`257548`","isCorrect":false,"explanation":""},{"id":"c","text":"A string containing their code points","isCorrect":false,"explanation":""},{"id":"d","text":"Error","isCorrect":false,"explanation":""}]',
      'c',
      'The `+` operator concatenates strings, including emoji strings.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','async-programming','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-51-75QA-js-q-070","original_type":"multiple-choice","topic":"Async Programming","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.365Z',
      '2025-10-21T22:24:06.365Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '759b8c48-0f3c-4340-b186-c48bb8c0e307',
      'How to correctly use generator with yield?',
      'How can we log the values that are commented out after the console.log statement?

```javascript
function* startGame() {
  const answer = yield ''Do you love JavaScript?'';
  if (answer !== ''Yes'') {
    return "Oh wow... Guess we''re done here";
  }
  return ''JavaScript loves you back ❤️'';
}
const game = startGame();
console.log(/* 1 */); // Do you love JavaScript?
console.log(/* 2 */); // JavaScript loves you back ❤️
```',
      'multiple-choice',
      'advanced',
      10,
      '[{"id":"a","text":"`game.next(\"Yes\").value` and `game.next().value`","isCorrect":false,"explanation":""},{"id":"b","text":"`game.next.value(\"Yes\")` and `game.next.value()`","isCorrect":false,"explanation":""},{"id":"c","text":"`game.next().value` and `game.next(\"Yes\").value`","isCorrect":true,"explanation":""},{"id":"d","text":"`game.next.value()` and `game.next.value(\"Yes\")`","isCorrect":false,"explanation":""}]',
      'c',
      'First call `next()` to get the first yield. Then call `next(''Yes'')` to pass the answer and resume execution.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','async-programming','advanced']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-51-75QA-js-q-071","original_type":"multiple-choice","topic":"Async Programming","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.365Z',
      '2025-10-21T22:24:06.365Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '36db8fb9-be24-4057-9e04-f53ac7e802ed',
      'What''s the output of String.raw with newline?',
      'What''s the output?

```javascript
console.log(String.raw`Hello
world`);
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`Hello world!`","isCorrect":false,"explanation":""},{"id":"b","text":"`Hello` <br />&nbsp; &nbsp; &nbsp;`world`","isCorrect":false,"explanation":""},{"id":"c","text":"`Hello\nworld`","isCorrect":true,"explanation":""},{"id":"d","text":"`Hello\n` <br /> &nbsp; &nbsp; &nbsp;`world`","isCorrect":false,"explanation":""}]',
      'c',
      '`String.raw` treats escape sequences as literal text, so the newline character is printed as-is.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','async-programming','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-51-75QA-js-q-072","original_type":"multiple-choice","topic":"Async Programming","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.365Z',
      '2025-10-21T22:24:06.365Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'b3fc068e-5d9e-422e-95b2-20f725398867',
      'What''s the output of async function return?',
      'What''s the output?

```javascript
async function getData() {
  return await Promise.resolve(''I made it!'');
}
const data = getData();
console.log(data);
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`\"I made it!\"`","isCorrect":false,"explanation":""},{"id":"b","text":"`Promise {<resolved>: \"I made it!\"}`","isCorrect":false,"explanation":""},{"id":"c","text":"`Promise {<pending>}`","isCorrect":true,"explanation":""},{"id":"d","text":"`undefined`","isCorrect":false,"explanation":""}]',
      'c',
      'Async functions always return a promise. Since we don’t await `data`, we log the pending promise object.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','async-programming','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-51-75QA-js-q-073","original_type":"multiple-choice","topic":"Async Programming","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.365Z',
      '2025-10-21T22:24:06.365Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'c18ac019-6176-46c8-a787-41572843cc3c',
      'What''s the output of Array.push return value?',
      'What''s the output?

```javascript
function addToList(item, list) {
  return list.push(item);
}
const result = addToList(''apple'', [''banana'']);
console.log(result);
```',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"`[''apple'', ''banana'']`","isCorrect":false,"explanation":""},{"id":"b","text":"`2`","isCorrect":true,"explanation":""},{"id":"c","text":"`true`","isCorrect":false,"explanation":""},{"id":"d","text":"`undefined`","isCorrect":false,"explanation":""}]',
      'c',
      '`Array.prototype.push` returns the new length of the array, not the array itself.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','async-programming','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-51-75QA-js-q-074","original_type":"multiple-choice","topic":"Async Programming","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.365Z',
      '2025-10-21T22:24:06.365Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'd7dc4f2a-c52f-44a3-b8ac-49878baaef78',
      'What''s the output after freezing an object?',
      'What''s the output?

```javascript
const box = { x: 10, y: 20 };
Object.freeze(box);
const shape = box;
shape.x = 100;
console.log(shape);
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`{ x: 100, y: 20 }`","isCorrect":false,"explanation":""},{"id":"b","text":"`{ x: 10, y: 20 }`","isCorrect":true,"explanation":""},{"id":"c","text":"`{ x: 100 }`","isCorrect":false,"explanation":""},{"id":"d","text":"`ReferenceError`","isCorrect":false,"explanation":""}]',
      'c',
      '`Object.freeze` makes an object immutable (shallowly). Assignments to frozen properties are ignored in non-strict mode.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','async-programming','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-51-75QA-js-q-075","original_type":"multiple-choice","topic":"Async Programming","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.365Z',
      '2025-10-21T22:24:06.365Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '1039d644-967d-42ed-a981-a94ef431caf4',
      'What''s the output of destructuring with renaming?',
      'What''s the output?

```javascript
const { firstName: myName } = { firstName: ''Lydia'' };
console.log(firstName);
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`\"Lydia\"`","isCorrect":false,"explanation":""},{"id":"b","text":"`\"myName\"`","isCorrect":false,"explanation":""},{"id":"c","text":"`undefined`","isCorrect":false,"explanation":""},{"id":"d","text":"`ReferenceError`","isCorrect":true,"explanation":""}]',
      'c',
      'The destructuring syntax `{ firstName: myName }` creates a variable `myName`, not `firstName`. Attempting to access `firstName` throws a `ReferenceError` because it was never declared.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','dom-manipulation','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-76–100QA-js-q-076","original_type":"multiple-choice","topic":"DOM Manipulation","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.367Z',
      '2025-10-21T22:24:06.367Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'a3fcdaf1-cf71-4921-89d9-20ab81a8bb85',
      'Is this a pure function?',
      'Is this a pure function?

```javascript
function sum(a, b) {
  return a + b;
}
```',
      'true-false',
      'beginner',
      10,
      '[{"id":"true","text":"True","isCorrect":false},{"id":"false","text":"False","isCorrect":true}]',
      'false',
      'A pure function always returns the same output for the same inputs and has no side effects. This function meets both criteria.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','dom-manipulation','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-76–100QA-js-q-077","original_type":"true-false","topic":"DOM Manipulation","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.367Z',
      '2025-10-21T22:24:06.367Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '7a547d8c-ba22-4a5d-9682-c890da89ddf1',
      'What is the output of this memoized function?',
      'What is the output?

```javascript
const add = () => {
  const cache = {};
  return num => {
    if (num in cache) {
      return `From cache! ${cache[num]}`;
    } else {
      const result = num + 10;
      cache[num] = result;
      return `Calculated! ${result}`;
    }
  };
};
const addFunction = add();
console.log(addFunction(10));
console.log(addFunction(10));
console.log(addFunction(5 * 2));
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`Calculated! 20` `Calculated! 20` `Calculated! 20`","isCorrect":false,"explanation":""},{"id":"b","text":"`Calculated! 20` `From cache! 20` `Calculated! 20`","isCorrect":false,"explanation":""},{"id":"c","text":"`Calculated! 20` `From cache! 20` `From cache! 20`","isCorrect":true,"explanation":""},{"id":"d","text":"`Calculated! 20` `From cache! 20` `Error`","isCorrect":false,"explanation":""}]',
      'c',
      'The closure `addFunction` retains access to the `cache` object. All three calls use the key `10` (since `5 * 2 === 10`), so the first logs ''Calculated!'', and the next two log ''From cache!''.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','dom-manipulation','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-76–100QA-js-q-078","original_type":"multiple-choice","topic":"DOM Manipulation","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.367Z',
      '2025-10-21T22:24:06.367Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'a00f40be-e7ae-41d5-9515-f26dfe10d65d',
      'What is the output of for-in vs for-of on array?',
      'What is the output?

```javascript
const myLifeSummedUp = [''☕'', ''💻'', ''🍷'', ''🍫''];
for (let item in myLifeSummedUp) {
  console.log(item);
}
for (let item of myLifeSummedUp) {
  console.log(item);
}
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`0` `1` `2` `3` and `\"☕\"` `\"💻\"` `\"🍷\"` `\"🍫\"`","isCorrect":true,"explanation":""},{"id":"b","text":"`\"☕\"` `\"💻\"` `\"🍷\"` `\"🍫\"` and `\"☕\"` `\"💻\"` `\"🍷\"` `\"🍫\"`","isCorrect":false,"explanation":""},{"id":"c","text":"`\"☕\"` `\"💻\"` `\"🍷\"` `\"🍫\"` and `0` `1` `2` `3`","isCorrect":false,"explanation":""},{"id":"d","text":"`0` `1` `2` `3` and `{0: \"☕\", 1: \"💻\", 2: \"🍷\", 3: \"🍫\"}`","isCorrect":false,"explanation":""}]',
      'c',
      '`for-in` iterates over enumerable property names (string indices). `for-of` iterates over values of iterable objects like arrays.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','dom-manipulation','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-76–100QA-js-q-079","original_type":"multiple-choice","topic":"DOM Manipulation","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.367Z',
      '2025-10-21T22:24:06.367Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'ddc6bcde-e92a-40bf-80dc-8973f94ca85b',
      'What is the output of array with expressions?',
      'What is the output?

```javascript
const list = [1 + 2, 1 * 2, 1 / 2];
console.log(list);
```',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"`[\"1 + 2\", \"1 * 2\", \"1 / 2\"]`","isCorrect":false,"explanation":""},{"id":"b","text":"`[\"12\", 2, 0.5]`","isCorrect":false,"explanation":""},{"id":"c","text":"`[3, 2, 0.5]`","isCorrect":true,"explanation":""},{"id":"d","text":"`[1, 1, 1]`","isCorrect":false,"explanation":""}]',
      'c',
      'Array elements are evaluated at definition time. `1 + 2 = 3`, `1 * 2 = 2`, `1 / 2 = 0.5`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','dom-manipulation','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-76–100QA-js-q-080","original_type":"multiple-choice","topic":"DOM Manipulation","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.367Z',
      '2025-10-21T22:24:06.367Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '57540b63-3af3-4db0-a4a1-8b30e2c6e1aa',
      'What is the output when calling function without argument?',
      'What is the output?

```javascript
function sayHi(name) {
  return `Hi there, ${name}`;
}
console.log(sayHi());
```',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"`Hi there,`","isCorrect":false,"explanation":""},{"id":"b","text":"`Hi there, undefined`","isCorrect":true,"explanation":""},{"id":"c","text":"`Hi there, null`","isCorrect":false,"explanation":""},{"id":"d","text":"`ReferenceError`","isCorrect":false,"explanation":""}]',
      'c',
      'Missing arguments default to `undefined`. So the template literal becomes `''Hi there, undefined''`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','dom-manipulation','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-76–100QA-js-q-081","original_type":"multiple-choice","topic":"DOM Manipulation","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.367Z',
      '2025-10-21T22:24:06.367Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'b1ec7aaa-0a28-451b-a97c-c5b05bf4fdcb',
      'What is the output with setTimeout, this, and call?',
      'What is the output?

```javascript
var status = ''😎'';
setTimeout(() => {
  const status = ''😍'';
  const data = {
    status: ''🥑'',
    getStatus() {
      return this.status;
    },
  };
  console.log(data.getStatus());
  console.log(data.getStatus.call(this));
}, 0);
```',
      'multiple-choice',
      'advanced',
      10,
      '[{"id":"a","text":"`\"🥑\"` and `\"😍\"`","isCorrect":false,"explanation":""},{"id":"b","text":"`\"🥑\"` and `\"😎\"`","isCorrect":true,"explanation":""},{"id":"c","text":"`\"😍\"` and `\"😎\"`","isCorrect":false,"explanation":""},{"id":"d","text":"`\"😎\"` and `\"😎\"`","isCorrect":false,"explanation":""}]',
      'c',
      '`data.getStatus()` uses `this` bound to `data`, so returns `''🥑''`. Inside the arrow function, `this` refers to the global object, where `status` is `''😎''`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','dom-manipulation','advanced']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-76–100QA-js-q-082","original_type":"multiple-choice","topic":"DOM Manipulation","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.367Z',
      '2025-10-21T22:24:06.367Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '7ed06863-dd16-452e-814f-b87e10c314b8',
      'What is the output after reassigning primitive from object?',
      'What is the output?

```javascript
const person = {
  name: ''Lydia'',
  age: 21,
};
let city = person.city;
city = ''Amsterdam'';
console.log(person);
```',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"`{ name: \"Lydia\", age: 21 }`","isCorrect":true,"explanation":""},{"id":"b","text":"`{ name: \"Lydia\", age: 21, city: \"Amsterdam\" }`","isCorrect":false,"explanation":""},{"id":"c","text":"`{ name: \"Lydia\", age: 21, city: undefined }`","isCorrect":false,"explanation":""},{"id":"d","text":"`\"Amsterdam\"`","isCorrect":false,"explanation":""}]',
      'c',
      '`person.city` is `undefined`, so `city` is assigned `undefined`. Reassigning `city` doesn’t affect the `person` object.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','dom-manipulation','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-76–100QA-js-q-083","original_type":"multiple-choice","topic":"DOM Manipulation","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.367Z',
      '2025-10-21T22:24:06.367Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'ec18b169-b291-4dae-94bf-76b6c4e4f747',
      'What is the output with block-scoped variables in if/else?',
      'What is the output?

```javascript
function checkAge(age) {
  if (age < 18) {
    const message = "Sorry, you''re too young.";
  } else {
    const message = "Yay! You''re old enough!";
  }
  return message;
}
console.log(checkAge(21));
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`\"Sorry, you''re too young.\"`","isCorrect":false,"explanation":""},{"id":"b","text":"`\"Yay! You''re old enough!\"`","isCorrect":false,"explanation":""},{"id":"c","text":"`ReferenceError`","isCorrect":true,"explanation":""},{"id":"d","text":"`undefined`","isCorrect":false,"explanation":""}]',
      'c',
      '`message` is block-scoped to each `if`/`else` block. It is not accessible in the outer function scope, causing a `ReferenceError`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','dom-manipulation','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-76–100QA-js-q-084","original_type":"multiple-choice","topic":"DOM Manipulation","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.367Z',
      '2025-10-21T22:24:06.367Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'c008f729-a29a-4a8a-8729-0673bac8884f',
      'What kind of information gets logged in fetch chain?',
      'What kind of information would get logged?

```javascript
fetch(''https://www.website.com/api/user/1'')
  .then(res => res.json())
  .then(res => console.log(res));
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"The result of the `fetch` method.","isCorrect":false,"explanation":""},{"id":"b","text":"The result of the second invocation of the `fetch` method.","isCorrect":false,"explanation":""},{"id":"c","text":"The result of the callback in the previous `.then()`.","isCorrect":true,"explanation":""},{"id":"d","text":"It would always be undefined.","isCorrect":false,"explanation":""}]',
      'c',
      'Each `.then` receives the return value of the previous `.then`. The second `.then` logs the parsed JSON object from `res.json()`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','dom-manipulation','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-76–100QA-js-q-085","original_type":"multiple-choice","topic":"DOM Manipulation","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.367Z',
      '2025-10-21T22:24:06.367Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'ced9f663-a67e-4d93-9e92-3ac5ba6cf0d6',
      'Which option sets hasName to true without passing true?',
      'Which option is a way to set `hasName` equal to `true`, provided you cannot pass `true` as an argument?

```javascript
function getName(name) {
  const hasName = //
}
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`!!name`","isCorrect":true,"explanation":""},{"id":"b","text":"`name`","isCorrect":false,"explanation":""},{"id":"c","text":"`new Boolean(name)`","isCorrect":false,"explanation":""},{"id":"d","text":"`name.length`","isCorrect":false,"explanation":""}]',
      'c',
      '`!!name` converts `name` to a boolean. If `name` is truthy, it returns `true`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','dom-manipulation','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-76–100QA-js-q-086","original_type":"multiple-choice","topic":"DOM Manipulation","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.367Z',
      '2025-10-21T22:24:06.367Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '008594fd-b758-408e-a6fa-ed1537285528',
      'What''s the output of string bracket notation?',
      'What''s the output?

```javascript
console.log(''I want pizza''[0]);
```',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"`\"\"\"`","isCorrect":false,"explanation":""},{"id":"b","text":"`\"I\"`","isCorrect":true,"explanation":""},{"id":"c","text":"`SyntaxError`","isCorrect":false,"explanation":""},{"id":"d","text":"`undefined`","isCorrect":false,"explanation":""}]',
      'c',
      'Strings are array-like. Index `0` returns the first character `''I''`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','dom-manipulation','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-76–100QA-js-q-087","original_type":"multiple-choice","topic":"DOM Manipulation","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.367Z',
      '2025-10-21T22:24:06.367Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '92c72df6-f6e4-4bd5-a2b6-73fb535c76d8',
      'What''s the output with default parameter referencing another?',
      'What''s the output?

```javascript
function sum(num1, num2 = num1) {
  console.log(num1 + num2);
}
sum(10);
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`NaN`","isCorrect":false,"explanation":""},{"id":"b","text":"`20`","isCorrect":true,"explanation":""},{"id":"c","text":"`ReferenceError`","isCorrect":false,"explanation":""},{"id":"d","text":"`undefined`","isCorrect":false,"explanation":""}]',
      'c',
      'When only one argument is passed, `num2` defaults to `num1` (which is `10`). So `10 + 10 = 20`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','dom-manipulation','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-76–100QA-js-q-088","original_type":"multiple-choice","topic":"DOM Manipulation","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.367Z',
      '2025-10-21T22:24:06.367Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '04a9da85-aafc-4e5b-8101-e092b34078c1',
      'What''s the output of import * as with default and named exports?',
      'What''s the output?

```javascript
// module.js
export default () => ''Hello world'';
export const name = ''Lydia'';
// index.js
import * as data from ''./module'';
console.log(data);
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`{ default: function default(), name: \"Lydia\" }`","isCorrect":true,"explanation":""},{"id":"b","text":"`{ default: function default() }`","isCorrect":false,"explanation":""},{"id":"c","text":"`{ default: \"Hello world\", name: \"Lydia\" }`","isCorrect":false,"explanation":""},{"id":"d","text":"Global object of `module.js`","isCorrect":false,"explanation":""}]',
      'c',
      '`import * as` creates an object with all exports. Default export is under `default` property; named exports are direct properties.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','dom-manipulation','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-76–100QA-js-q-089","original_type":"multiple-choice","topic":"DOM Manipulation","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.367Z',
      '2025-10-21T22:24:06.367Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '8ea96f6f-bebe-4ed9-a14c-8e0a785eb21b',
      'What''s the output of typeof on class instance?',
      'What''s the output?

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }
}
const member = new Person(''John'');
console.log(typeof member);
```',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"`\"class\"`","isCorrect":false,"explanation":""},{"id":"b","text":"`\"function\"`","isCorrect":false,"explanation":""},{"id":"c","text":"`\"object\"`","isCorrect":true,"explanation":""},{"id":"d","text":"`\"string\"`","isCorrect":false,"explanation":""}]',
      'c',
      'Class instances are objects. `typeof` returns `''object''` for all non-null objects.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','dom-manipulation','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-76–100QA-js-q-090","original_type":"multiple-choice","topic":"DOM Manipulation","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.367Z',
      '2025-10-21T22:24:06.367Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'bbf0d015-8da6-43e8-a84e-27c134923c8d',
      'What''s the output when chaining push on array?',
      'What''s the output?

```javascript
let newList = [1, 2, 3].push(4);
console.log(newList.push(5));
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`[1, 2, 3, 4, 5]`","isCorrect":false,"explanation":""},{"id":"b","text":"`[1, 2, 3, 5]`","isCorrect":false,"explanation":""},{"id":"c","text":"`[1, 2, 3, 4]`","isCorrect":false,"explanation":""},{"id":"d","text":"`Error`","isCorrect":true,"explanation":""}]',
      'c',
      '`push` returns the new length (a number), not the array. Calling `.push(5)` on a number throws `TypeError`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','dom-manipulation','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-76–100QA-js-q-091","original_type":"multiple-choice","topic":"DOM Manipulation","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.367Z',
      '2025-10-21T22:24:06.367Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '9c1338fb-6847-48ff-a658-4e4724b29c01',
      'What''s the output of prototype on regular vs arrow function?',
      'What''s the output?

```javascript
function giveLydiaPizza() {
  return ''Here is pizza!'';
}
const giveLydiaChocolate = () =>
  "Here''s chocolate... now go hit the gym already.";
console.log(giveLydiaPizza.prototype);
console.log(giveLydiaChocolate.prototype);
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`{ constructor: ...}` `{ constructor: ...}`","isCorrect":false,"explanation":""},{"id":"b","text":"`{}` `{ constructor: ...}`","isCorrect":false,"explanation":""},{"id":"c","text":"`{ constructor: ...}` `{}`","isCorrect":false,"explanation":""},{"id":"d","text":"`{ constructor: ...}` `undefined`","isCorrect":true,"explanation":""}]',
      'c',
      'Regular functions have a `prototype` object. Arrow functions do not; accessing `.prototype` returns `undefined`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','dom-manipulation','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-76–100QA-js-q-092","original_type":"multiple-choice","topic":"DOM Manipulation","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.367Z',
      '2025-10-21T22:24:06.367Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '4a5fee28-754c-482b-853f-6c353cc6c29d',
      'What''s the output of Object.entries with for-of destructuring?',
      'What''s the output?

```javascript
const person = {
  name: ''Lydia'',
  age: 21,
};
for (const [x, y] of Object.entries(person)) {
  console.log(x, y);
}
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`name` `Lydia` and `age` `21`","isCorrect":true,"explanation":""},{"id":"b","text":"`[\"name\", \"Lydia\"]` and `[\"age\", 21]`","isCorrect":false,"explanation":""},{"id":"c","text":"`[\"name\", \"age\"]` and `undefined`","isCorrect":false,"explanation":""},{"id":"d","text":"`Error`","isCorrect":false,"explanation":""}]',
      'c',
      '`Object.entries` returns `[[''name'', ''Lydia''], [''age'', 21]]`. Destructuring in `for-of` unpacks each pair into `x` and `y`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','dom-manipulation','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-76–100QA-js-q-093","original_type":"multiple-choice","topic":"DOM Manipulation","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.367Z',
      '2025-10-21T22:24:06.367Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '22e89915-03f5-4639-bb75-0f189ade4213',
      'What''s the output with invalid rest parameter placement?',
      'What''s the output?

```javascript
function getItems(fruitList, ...args, favoriteFruit) {
  return [...fruitList, ...args, favoriteFruit]
}
getItems(["banana", "apple"], "pear", "orange")
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`[\"banana\", \"apple\", \"pear\", \"orange\"]`","isCorrect":false,"explanation":""},{"id":"b","text":"`[[\"banana\", \"apple\"], \"pear\", \"orange\"]`","isCorrect":false,"explanation":""},{"id":"c","text":"`[\"banana\", \"apple\", [\"pear\"], \"orange\"]`","isCorrect":false,"explanation":""},{"id":"d","text":"`SyntaxError`","isCorrect":true,"explanation":""}]',
      'c',
      'Rest parameters must be the last parameter. Placing `...args` before `favoriteFruit` is a syntax error.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','dom-manipulation','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-76–100QA-js-q-094","original_type":"multiple-choice","topic":"DOM Manipulation","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.367Z',
      '2025-10-21T22:24:06.367Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '40631791-32fa-4b7f-a3bc-3770c6e437df',
      'What''s the output with return and automatic semicolon insertion?',
      'What''s the output?

```javascript
function nums(a, b) {
  if (a > b) console.log(''a is bigger'');
  else console.log(''b is bigger'');
  return
  a + b;
}
console.log(nums(4, 2));
console.log(nums(1, 2));
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`a is bigger`, `6` and `b is bigger`, `3`","isCorrect":false,"explanation":""},{"id":"b","text":"`a is bigger`, `undefined` and `b is bigger`, `undefined`","isCorrect":true,"explanation":""},{"id":"c","text":"`undefined` and `undefined`","isCorrect":false,"explanation":""},{"id":"d","text":"`SyntaxError`","isCorrect":false,"explanation":""}]',
      'c',
      'ASI inserts a semicolon after `return`, so `a + b` is never executed. The function returns `undefined`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','dom-manipulation','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-76–100QA-js-q-095","original_type":"multiple-choice","topic":"DOM Manipulation","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.367Z',
      '2025-10-21T22:24:06.367Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'c86802f5-2caf-4da9-8b0b-593aa6f3d8ca',
      'What''s the output after reassigning class constructor?',
      'What''s the output?

```javascript
class Person {
  constructor() {
    this.name = ''Lydia'';
  }
}
Person = class AnotherPerson {
  constructor() {
    this.name = ''Sarah'';
  }
};
const member = new Person();
console.log(member.name);
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`\"Lydia\"`","isCorrect":false,"explanation":""},{"id":"b","text":"`\"Sarah\"`","isCorrect":true,"explanation":""},{"id":"c","text":"`Error: cannot redeclare Person`","isCorrect":false,"explanation":""},{"id":"d","text":"`SyntaxError`","isCorrect":false,"explanation":""}]',
      'c',
      'Classes are just special functions. Reassigning `Person` to a new class changes what `new Person()` creates.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','dom-manipulation','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-76–100QA-js-q-096","original_type":"multiple-choice","topic":"DOM Manipulation","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.367Z',
      '2025-10-21T22:24:06.367Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'd89266be-d06b-4ed5-b890-af8041dfd0f6',
      'What''s the output with Symbol keys and Object.keys?',
      'What''s the output?

```javascript
const info = {
  [Symbol(''a'')]: ''b'',
};
console.log(info);
console.log(Object.keys(info));
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`{Symbol(''a''): ''b''}` and `[\"{Symbol(''a'')\"]`","isCorrect":false,"explanation":""},{"id":"b","text":"`{}` and `[]`","isCorrect":false,"explanation":""},{"id":"c","text":"`{ a: \"b\" }` and `[\"a\"]`","isCorrect":false,"explanation":""},{"id":"d","text":"`{Symbol(''a''): ''b''}` and `[]`","isCorrect":true,"explanation":""}]',
      'c',
      'Symbols are not enumerable. `Object.keys` only returns enumerable string-keyed properties, so it returns an empty array.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','dom-manipulation','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-76–100QA-js-q-097","original_type":"multiple-choice","topic":"DOM Manipulation","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.367Z',
      '2025-10-21T22:24:06.367Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '9dcfc9ab-83b3-458c-9cb0-bbc53e2a9ef2',
      'What''s the output with array destructuring and arrow function object return?',
      'What''s the output?

```javascript
const getList = ([x, ...y]) => [x, y]
const getUser = user => { name: user.name, age: user.age }
const list = [1, 2, 3, 4]
const user = { name: "Lydia", age: 21 }
console.log(getList(list))
console.log(getUser(user))
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`[1, [2, 3, 4]]` and `SyntaxError`","isCorrect":true,"explanation":""},{"id":"b","text":"`[1, [2, 3, 4]]` and `{ name: \"Lydia\", age: 21 }`","isCorrect":false,"explanation":""},{"id":"c","text":"`[1, 2, 3, 4]` and `{ name: \"Lydia\", age: 21 }`","isCorrect":false,"explanation":""},{"id":"d","text":"`Error` and `{ name: \"Lydia\", age: 21 }`","isCorrect":false,"explanation":""}]',
      'c',
      '`getList` correctly destructures. `getUser` lacks parentheses around the object literal, so it''s parsed as a block statement with labels, causing `SyntaxError`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','dom-manipulation','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-76–100QA-js-q-098","original_type":"multiple-choice","topic":"DOM Manipulation","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.367Z',
      '2025-10-21T22:24:06.367Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '042c6072-7510-4baa-b23b-2f3bf73c70fc',
      'What''s the output when calling a string as a function?',
      'What''s the output?

```javascript
const name = ''Lydia'';
console.log(name());
```',
      'multiple-choice',
      'beginner',
      10,
      '[{"id":"a","text":"`SyntaxError`","isCorrect":false,"explanation":""},{"id":"b","text":"`ReferenceError`","isCorrect":false,"explanation":""},{"id":"c","text":"`TypeError`","isCorrect":true,"explanation":""},{"id":"d","text":"`undefined`","isCorrect":false,"explanation":""}]',
      'c',
      'Strings are not callable. Attempting to invoke a string throws a `TypeError`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','dom-manipulation','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-76–100QA-js-q-099","original_type":"multiple-choice","topic":"DOM Manipulation","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.367Z',
      '2025-10-21T22:24:06.367Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '3272a643-a744-4b51-84c7-4ca2d7f6347d',
      'What''s the value of output with logical AND in template literal?',
      'What''s the value of output?

```javascript
// 🎉✨ This is my 100th question! ✨🎉
const output = `${[] && ''Im''}possible!
You should${'''' && `n''t`} see a therapist after so much JavaScript lol`;
```',
      'multiple-choice',
      'intermediate',
      10,
      '[{"id":"a","text":"`possible! You should see a therapist after so much JavaScript lol`","isCorrect":false,"explanation":""},{"id":"b","text":"`Impossible! You should see a therapist after so much JavaScript lol`","isCorrect":true,"explanation":""},{"id":"c","text":"`possible! You shouldn''t see a therapist after so much JavaScript lol`","isCorrect":false,"explanation":""},{"id":"d","text":"`Impossible! You shouldn''t see a therapist after so much JavaScript lol`","isCorrect":false,"explanation":""}]',
      'c',
      '`[]` is truthy, so `[] && ''Im''` returns `''Im''`. `''''` is falsy, so `'''' && "n''t"` returns `''''`. Result: `''Impossible! You should see a therapist...''`',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','dom-manipulation','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-76–100QA-js-q-100","original_type":"multiple-choice","topic":"DOM Manipulation","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.367Z',
      '2025-10-21T22:24:06.367Z'
    );