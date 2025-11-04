INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '30abb774-f5e3-43c6-871d-eba08d72daf9',
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
          NULL,
          'Within the function, the `name` variable declared with `var` is hoisted and initialized with `undefined`. The `age` variable declared with `let` is hoisted but not initialized, so accessing it before declaration throws a `ReferenceError` due to the temporal dead zone.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','javascript-core-concepts','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-1-25QA-js-q-001","original_type":"multiple-choice","topic":"JavaScript Core Concepts","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.140Z',
          '2025-10-15T03:11:52.147Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'ec3305e3-4703-484e-a052-70429cee63b1',
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
          NULL,
          'With `var`, `i` is function-scoped and shared across all callbacks, so all log `3`. With `let`, each iteration has a new block-scoped `i`, so callbacks log `0`, `1`, `2`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','javascript-core-concepts','advanced']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-1-25QA-js-q-002","original_type":"multiple-choice","topic":"JavaScript Core Concepts","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.147Z',
          '2025-10-15T03:11:52.147Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '58f3b64a-1a74-494e-8fb7-ae4d4ceb88c7',
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
          NULL,
          'Regular methods have dynamic `this` (bound to `shape`), but arrow functions inherit `this` from the surrounding scope (e.g., `window`), where `radius` is `undefined`, leading to `NaN`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','javascript-core-concepts','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-1-25QA-js-q-003","original_type":"multiple-choice","topic":"JavaScript Core Concepts","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.147Z',
          '2025-10-15T03:11:52.147Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '51f3a143-4a82-40a6-a0f8-0b5b1d35f75e',
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
          NULL,
          'The unary `+` converts `true` to `1`. The string `''Lydia''` is truthy, so `!''Lydia''` is `false`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','javascript-core-concepts','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-1-25QA-js-q-004","original_type":"multiple-choice","topic":"JavaScript Core Concepts","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.147Z',
          '2025-10-15T03:11:52.147Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'cc38c928-7d60-41a2-ad77-f848e61ecd85',
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
          NULL,
          '`mouse.bird.size` fails because `mouse.bird` is `undefined`. Bracket notation like `mouse[bird.size]` evaluates to `mouse[''small'']`, which is valid.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','javascript-core-concepts','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-1-25QA-js-q-005","original_type":"multiple-choice","topic":"JavaScript Core Concepts","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.147Z',
          '2025-10-15T03:11:52.147Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '64c111ab-7603-4767-8b0b-9db2d84e6ed2',
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
          NULL,
          'Objects are assigned by reference. Modifying `c.greeting` affects `d` because both point to the same object.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','javascript-core-concepts','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-1-25QA-js-q-006","original_type":"multiple-choice","topic":"JavaScript Core Concepts","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.147Z',
          '2025-10-15T03:11:52.147Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '640b91f1-0e11-4df2-bf23-6da7ea1c18ec',
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
          NULL,
          '`==` compares values (3 == 3 → true). `===` compares type and value; `new Number(3)` is an object, not a primitive number, so `===` returns false.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','javascript-core-concepts','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-1-25QA-js-q-007","original_type":"multiple-choice","topic":"JavaScript Core Concepts","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.147Z',
          '2025-10-15T03:11:52.147Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '0946c9f9-9e18-4912-bb08-627a43aeeaa8',
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
          NULL,
          'Static methods belong to the class, not instances. Calling `freddie.colorChange()` throws a `TypeError`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','javascript-core-concepts','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-1-25QA-js-q-008","original_type":"multiple-choice","topic":"JavaScript Core Concepts","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.147Z',
          '2025-10-15T03:11:52.147Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'd7487146-d6ec-4cfb-9080-0236727d790c',
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
          NULL,
          'In non-strict mode, assigning to an undeclared variable creates a global property. The typo creates `greetign` on the global object.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','javascript-core-concepts','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-1-25QA-js-q-009","original_type":"multiple-choice","topic":"JavaScript Core Concepts","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.147Z',
          '2025-10-15T03:11:52.147Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '2e8c12a8-3a1f-4b52-a3aa-f772fcc4f969',
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
          NULL,
          'Functions are objects in JavaScript, so you can add properties to them. This is valid and causes no error.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','javascript-core-concepts','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-1-25QA-js-q-010","original_type":"multiple-choice","topic":"JavaScript Core Concepts","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.147Z',
          '2025-10-15T03:11:52.147Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '849d2fae-fcf7-4d4b-92c0-da0051496e56',
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
          NULL,
          '`getFullName` is added to the constructor function, not the prototype, so instances don’t inherit it. Calling it on `member` throws `TypeError`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','javascript-core-concepts','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-1-25QA-js-q-011","original_type":"multiple-choice","topic":"JavaScript Core Concepts","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.147Z',
          '2025-10-15T03:11:52.147Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'ece5f959-1eed-4681-8213-62a97a98eaec',
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
          NULL,
          'Without `new`, `this` refers to the global object. `sarah` is `undefined` because the function doesn’t return anything.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','javascript-core-concepts','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-1-25QA-js-q-012","original_type":"multiple-choice","topic":"JavaScript Core Concepts","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.147Z',
          '2025-10-15T03:11:52.147Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'ece21a6a-fd9b-4d3d-8162-18b75a5ba83d',
          'What are the three phases of event propagation?',
          'What are the three phases of event propagation?',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"Target > Capturing > Bubbling","isCorrect":false,"explanation":""},{"id":"b","text":"Bubbling > Target > Capturing","isCorrect":false,"explanation":""},{"id":"c","text":"Target > Bubbling > Capturing","isCorrect":false,"explanation":""},{"id":"d","text":"Capturing > Target > Bubbling","isCorrect":true,"explanation":""}]',
          NULL,
          'Event propagation: Capturing (top-down), Target (event target), Bubbling (bottom-up).',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','javascript-core-concepts','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-1-25QA-js-q-013","original_type":"multiple-choice","topic":"JavaScript Core Concepts","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.147Z',
          '2025-10-15T03:11:52.147Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '1d76c5c0-028f-44f8-b024-d6e752e3ff80',
          'Do all objects have prototypes?',
          'All object have prototypes.',
          'true-false',
          'intermediate',
          10,
          '[{"id":"a","text":"True","isCorrect":false,"explanation":""},{"id":"b","text":"False","isCorrect":true,"explanation":""}]',
          NULL,
          'The base object (e.g., created via `Object.create(null)`) has no prototype. Most objects inherit from `Object.prototype`, but not all.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','javascript-core-concepts','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-1-25QA-js-q-014","original_type":"true-false","topic":"JavaScript Core Concepts","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.147Z',
          '2025-10-15T03:11:52.147Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '462390cc-788e-474f-b279-c4b237f36c5d',
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
          NULL,
          'JavaScript coerces the number `1` to a string and concatenates: `''1'' + ''2''` → `''12''`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','javascript-core-concepts','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-1-25QA-js-q-015","original_type":"multiple-choice","topic":"JavaScript Core Concepts","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.147Z',
          '2025-10-15T03:11:52.147Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '7fd1ca59-bc61-427b-858d-6ac34e27a64d',
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
          NULL,
          '`number++` returns `0` then increments to `1`. `++number` increments to `2` then returns `2`. Final value is `2`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','javascript-core-concepts','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-1-25QA-js-q-016","original_type":"multiple-choice","topic":"JavaScript Core Concepts","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.147Z',
          '2025-10-15T03:11:52.147Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '6e50c3bd-bb18-4bfb-af72-3e56ccd31d2b',
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
          NULL,
          'In tagged templates, the first argument is an array of string parts. Remaining arguments are expression values.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','javascript-core-concepts','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-1-25QA-js-q-017","original_type":"multiple-choice","topic":"JavaScript Core Concepts","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.147Z',
          '2025-10-15T03:11:52.147Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '383ec5bc-23ac-442f-9a52-52fe406ac4ae',
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
          NULL,
          'Objects are compared by reference, not value. Two separate `{ age: 18 }` objects are not equal, even with `==`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','javascript-core-concepts','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-1-25QA-js-q-018","original_type":"multiple-choice","topic":"JavaScript Core Concepts","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.147Z',
          '2025-10-15T03:11:52.147Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'b0952557-90e4-4383-a67f-a87446981b62',
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
          NULL,
          'Rest parameters collect arguments into an array. Arrays are objects, so `typeof` returns `''object''`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','javascript-core-concepts','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-1-25QA-js-q-019","original_type":"multiple-choice","topic":"JavaScript Core Concepts","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.147Z',
          '2025-10-15T03:11:52.147Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '70df3a6d-6eee-4c53-9329-ecf7dc5b17c7',
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
          NULL,
          'In strict mode, assigning to an undeclared variable throws a `ReferenceError`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','javascript-core-concepts','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-1-25QA-js-q-020","original_type":"multiple-choice","topic":"JavaScript Core Concepts","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.147Z',
          '2025-10-15T03:11:52.147Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'f9b26f48-2be0-4229-a390-1d6d1725dec5',
          'What''s the value of eval(''10*10+5'')?',
          'What''s the value of `sum`?

```javascript
const sum = eval(''10*10+5'');
```',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"`105`","isCorrect":true,"explanation":""},{"id":"b","text":"`\"105\"`","isCorrect":false,"explanation":""},{"id":"c","text":"`TypeError`","isCorrect":false,"explanation":""},{"id":"d","text":"`\"10*10+5\"`","isCorrect":false,"explanation":""}]',
          NULL,
          '`eval` evaluates the string as JavaScript code. `10*10+5` evaluates to the number `105`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','javascript-core-concepts','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-1-25QA-js-q-021","original_type":"multiple-choice","topic":"JavaScript Core Concepts","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.147Z',
          '2025-10-15T03:11:52.147Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'f0bfdde4-224b-4e25-9116-cb9d67b827ab',
          'How long is sessionStorage data accessible?',
          'How long is cool_secret accessible?

```javascript
sessionStorage.setItem(''cool_secret'', 123);
```',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"Forever, the data doesn''t get lost.","isCorrect":false,"explanation":""},{"id":"b","text":"When the user closes the tab.","isCorrect":true,"explanation":""},{"id":"c","text":"When the user closes the entire browser, not only the tab.","isCorrect":false,"explanation":""},{"id":"d","text":"When the user shuts off their computer.","isCorrect":false,"explanation":""}]',
          NULL,
          '`sessionStorage` data is cleared when the tab is closed.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','javascript-core-concepts','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-1-25QA-js-q-022","original_type":"multiple-choice","topic":"JavaScript Core Concepts","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.147Z',
          '2025-10-15T03:11:52.147Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '44611ab8-4504-4a3c-acba-5b7d76c9f5dc',
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
          NULL,
          '`var` allows redeclaration. The last assigned value (`10`) is used.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','javascript-core-concepts','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-1-25QA-js-q-023","original_type":"multiple-choice","topic":"JavaScript Core Concepts","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.147Z',
          '2025-10-15T03:11:52.147Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '682725c3-7da4-4df6-b2e5-d3adc7670cfd',
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
          NULL,
          'Object keys are strings, so both `hasOwnProperty(''1'')` and `hasOwnProperty(1)` return `true`. `Set` uses strict equality, so `set.has(''1'')` is `false`, but `set.has(1)` is `true`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','javascript-core-concepts','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-1-25QA-js-q-024","original_type":"multiple-choice","topic":"JavaScript Core Concepts","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.147Z',
          '2025-10-15T03:11:52.147Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '9aa05f23-8e50-46f7-b63b-0519e130fdd8',
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
          NULL,
          'Duplicate keys are allowed; the last value wins. The key order remains as first occurrence.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','javascript-core-concepts','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-1-25QA-js-q-025","original_type":"multiple-choice","topic":"JavaScript Core Concepts","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.147Z',
          '2025-10-15T03:11:52.147Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '7c633dde-e6c0-4549-af08-616da190de91',
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
          NULL,
          'The `||` operator returns the first truthy value or the last value if all are falsy. `{}` is truthy → `one = {}`. All in `two` are falsy → `two = ''''`. `[]` is truthy → `three = []`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','advanced-javascript','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-101–125QA-js-q-101","original_type":"multiple-choice","topic":"Advanced JavaScript","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.149Z',
          '2025-10-15T03:11:52.149Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'bf395802-832f-43c8-8db1-7bf9b8790bf8',
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
          NULL,
          '`firstFunction`: `.then()` is non-blocking → logs `''second''` first, then resolved value. `secondFunction`: `await` pauses execution → logs resolved value first, then `''second''`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','advanced-javascript','advanced']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-101–125QA-js-q-102","original_type":"multiple-choice","topic":"Advanced JavaScript","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.149Z',
          '2025-10-15T03:11:52.149Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '0a5c3b21-9679-4c09-99ba-ad2eb0733fb7',
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
          NULL,
          '`1 + 2 = 3` (number). `''Lydia'' + 2 = ''Lydia2''` (string concat). `{}` + 2 → `''[object Object]2''` (object → string).',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','advanced-javascript','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-101–125QA-js-q-103","original_type":"multiple-choice","topic":"Advanced JavaScript","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.149Z',
          '2025-10-15T03:11:52.149Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'cef07a7c-29d8-413b-a813-991305d27385',
          'What''s the value of Promise.resolve(5)?',
          'What''s its value?

```javascript
Promise.resolve(5);
```',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"`5`","isCorrect":false,"explanation":""},{"id":"b","text":"`Promise {<pending>: 5}`","isCorrect":false,"explanation":""},{"id":"c","text":"`Promise {<fulfilled>: 5}`","isCorrect":true,"explanation":""},{"id":"d","text":"`Error`","isCorrect":false,"explanation":""}]',
          NULL,
          '`Promise.resolve(5)` returns a **fulfilled** promise with value `5`. It does not return the raw value or a pending promise.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','advanced-javascript','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-101–125QA-js-q-104","original_type":"multiple-choice","topic":"Advanced JavaScript","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.149Z',
          '2025-10-15T03:11:52.149Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '98581c0c-17e8-4e03-8828-93e31833f645',
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
          NULL,
          '`person2` defaults to the same object reference as `person`. Since `person1` is also that object, strict equality returns `true`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','advanced-javascript','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-101–125QA-js-q-105","original_type":"multiple-choice","topic":"Advanced JavaScript","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.149Z',
          '2025-10-15T03:11:52.149Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '817abccd-ece3-4f6d-a6b4-ce7493c53d98',
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
          NULL,
          '`colorConfig.colors` tries to access a property named `colors`, which doesn’t exist → `undefined`. Then `undefined[1]` throws `TypeError`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','advanced-javascript','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-101–125QA-js-q-106","original_type":"multiple-choice","topic":"Advanced JavaScript","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.149Z',
          '2025-10-15T03:11:52.149Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '8d41a311-481e-4a53-ab06-56fe2762be67',
          'Are two identical heart emojis strictly equal?',
          'What''s its value?

```javascript
console.log(''❤️'' === ''❤️'');
```',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"`true`","isCorrect":true,"explanation":""},{"id":"b","text":"`false`","isCorrect":false,"explanation":""}]',
          NULL,
          'Identical emoji strings have the same Unicode representation, so strict equality returns `true`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','advanced-javascript','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-101–125QA-js-q-107","original_type":"multiple-choice","topic":"Advanced JavaScript","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.149Z',
          '2025-10-15T03:11:52.149Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '16e79c2f-74bf-41d7-803b-902f09ad6df8',
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
          NULL,
          'Only `splice` modifies the original array. `map`, `filter`, `slice` return new arrays. `find` returns an element. `reduce` returns an accumulated value.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','advanced-javascript','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-101–125QA-js-q-108","original_type":"multiple-choice","topic":"Advanced JavaScript","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.149Z',
          '2025-10-15T03:11:52.149Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '021adc0e-6572-4b84-b424-cac1c866eb27',
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
          NULL,
          '`food[0]` is a string (primitive). Assigning it to `info.favoriteFood` copies the value. Reassigning `info.favoriteFood` doesn’t affect the `food` array.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','advanced-javascript','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-101–125QA-js-q-109","original_type":"multiple-choice","topic":"Advanced JavaScript","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.149Z',
          '2025-10-15T03:11:52.149Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'db823005-2d89-4a16-8457-bdd52a460bbe',
          'What does JSON.parse() do?',
          'What does this method do?

```javascript
JSON.parse();
```',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"Parses JSON to a JavaScript value","isCorrect":true,"explanation":""},{"id":"b","text":"Parses a JavaScript object to JSON","isCorrect":false,"explanation":""},{"id":"c","text":"Parses any JavaScript value to JSON","isCorrect":false,"explanation":""},{"id":"d","text":"Parses JSON to a JavaScript object only","isCorrect":false,"explanation":""}]',
          NULL,
          '`JSON.parse()` converts a JSON string into a JavaScript value (object, array, number, etc.).',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','advanced-javascript','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-101–125QA-js-q-110","original_type":"multiple-choice","topic":"Advanced JavaScript","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.149Z',
          '2025-10-15T03:11:52.149Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '2afbcb50-608b-4d2d-b693-60da4f634499',
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
          NULL,
          'The `name` inside `getName` is block-scoped and hoisted but not initialized. Accessing it before declaration throws `ReferenceError` due to TDZ.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','advanced-javascript','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-101–125QA-js-q-111","original_type":"multiple-choice","topic":"Advanced JavaScript","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.149Z',
          '2025-10-15T03:11:52.149Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '86798ac0-c214-48c2-81c1-bb8e2aff5b46',
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
          NULL,
          '`yield` returns the entire array. `yield*` delegates to the iterable and yields each element individually, so first value is `''a''`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','advanced-javascript','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-101–125QA-js-q-112","original_type":"multiple-choice","topic":"Advanced JavaScript","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.149Z',
          '2025-10-15T03:11:52.149Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '04a36e97-7f74-4f4c-971c-5c47201893d8',
          'What''s the output of IIFE in template literal?',
          'What''s the output?

```javascript
console.log(`${(x => x)(''I love'')} to program`);
```',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"`I love to program`","isCorrect":true,"explanation":""},{"id":"b","text":"`undefined to program`","isCorrect":false,"explanation":""},{"id":"c","text":"`${(x => x)(''I love'') to program`","isCorrect":false,"explanation":""},{"id":"d","text":"`TypeError`","isCorrect":false,"explanation":""}]',
          NULL,
          'The IIFE `(x => x)(''I love'')` returns `''I love''`, which is interpolated into the string.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','advanced-javascript','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-101–125QA-js-q-113","original_type":"multiple-choice","topic":"Advanced JavaScript","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.149Z',
          '2025-10-15T03:11:52.149Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'b43f1dc7-b4fa-4166-8916-176a6a1a79c2',
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
          NULL,
          'The `setInterval` callback holds a reference to the `config` object via closure, preventing garbage collection. The interval continues to run.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','advanced-javascript','advanced']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-101–125QA-js-q-114","original_type":"multiple-choice","topic":"Advanced JavaScript","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.149Z',
          '2025-10-15T03:11:52.149Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '4ad64fe3-827a-4373-81dc-68904d8a4176',
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
          NULL,
          'Map keys are compared by reference. Only the exact same function reference (`myFunc`) retrieves the value. A new function (`() => ''greeting''`) is a different object.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','advanced-javascript','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-101–125QA-js-q-115","original_type":"multiple-choice","topic":"Advanced JavaScript","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.149Z',
          '2025-10-15T03:11:52.149Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '00c95775-f02c-4f63-9f92-aa0a6ccba96a',
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
          NULL,
          '`changeAge(person)` mutates the original `person` object (age becomes 22). `changeAgeAndName()` uses a new object, so `person` remains unchanged except for the first call.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','advanced-javascript','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-101–125QA-js-q-116","original_type":"multiple-choice","topic":"Advanced JavaScript","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.149Z',
          '2025-10-15T03:11:52.149Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'dee3bd4b-c8aa-48ac-a370-6d6c24c265b3',
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
          NULL,
          '`...[1, 2, 3]` spreads the array into three arguments: `1, 2, 3` → sum is `6`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','advanced-javascript','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-101–125QA-js-q-117","original_type":"multiple-choice","topic":"Advanced JavaScript","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.149Z',
          '2025-10-15T03:11:52.149Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '72cb979d-1873-4c1d-a161-ed9e63368198',
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
          NULL,
          '`num += 1` increments `num` to `2`. `list[2]` is `''🥰''`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','advanced-javascript','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-101–125QA-js-q-118","original_type":"multiple-choice","topic":"Advanced JavaScript","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.150Z',
          '2025-10-15T03:11:52.150Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'a2629605-e27f-4493-ba13-5a5ab1141ee0',
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
          NULL,
          'Optional chaining safely accesses nested properties. `person.pet?.name` → `''Mara''`. `person.pet?.family?.name` → `undefined`. `person.getFullName?.()` → `''Lydia Hallie''`. `member` is undefined → `ReferenceError`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','advanced-javascript','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-101–125QA-js-q-119","original_type":"multiple-choice","topic":"Advanced JavaScript","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.150Z',
          '2025-10-15T03:11:52.150Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'aeea8c6b-c01a-4a37-bece-0e30963cfb06',
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
          NULL,
          '`indexOf(''banana'')` returns `0`, which is falsy. So the `else` block runs.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','advanced-javascript','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-101–125QA-js-q-120","original_type":"multiple-choice","topic":"Advanced JavaScript","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.150Z',
          '2025-10-15T03:11:52.150Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'd2252dc8-8a64-412c-9d61-dd690f2a7357',
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
          NULL,
          'Setters don’t return a value when accessed. Logging a setter property returns `undefined`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','advanced-javascript','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-101–125QA-js-q-121","original_type":"multiple-choice","topic":"Advanced JavaScript","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.150Z',
          '2025-10-15T03:11:52.150Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '791ffe5c-0be2-4ebc-b1ab-e0497b3cc595',
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
          NULL,
          '`typeof name` is `''string''` (truthy). `!typeof name` is `false`. `false === ''object''` → `false`. `false === ''string''` → `false`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','advanced-javascript','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-101–125QA-js-q-122","original_type":"multiple-choice","topic":"Advanced JavaScript","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.150Z',
          '2025-10-15T03:11:52.150Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'dcc8eea5-e9c9-4f14-9232-a77d757395e3',
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
          NULL,
          'Each function call returns the next function, closing over previous arguments. Final call logs `4 5 6`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','advanced-javascript','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-101–125QA-js-q-123","original_type":"multiple-choice","topic":"Advanced JavaScript","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.150Z',
          '2025-10-15T03:11:52.150Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'f884d174-7df1-40c7-be5a-5255e24c2c26',
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
          NULL,
          '`for await...of` automatically awaits each yielded promise, so the resolved values `1`, `2`, `3` are logged.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','advanced-javascript','advanced']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-101–125QA-js-q-124","original_type":"multiple-choice","topic":"Advanced JavaScript","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.150Z',
          '2025-10-15T03:11:52.150Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'feb70f90-5c20-476a-b675-7cfcc1b3b274',
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
          NULL,
          '`myFunc` expects an object, but receives numbers. Destructuring `undefined` properties results in `undefined` for `x`, `y`, `z`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','advanced-javascript','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-101–125QA-js-q-125","original_type":"multiple-choice","topic":"Advanced JavaScript","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.150Z',
          '2025-10-15T03:11:52.150Z'
        );