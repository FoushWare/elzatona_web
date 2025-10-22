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
    );;
