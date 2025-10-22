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
    );;
