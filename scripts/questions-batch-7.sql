INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'd3161127-632b-4ed7-8d3b-e75cf7d36f7c',
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
          NULL,
          'The destructuring syntax `{ firstName: myName }` creates a variable `myName`, not `firstName`. Attempting to access `firstName` throws a `ReferenceError` because it was never declared.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','dom-manipulation','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-76–100QA-js-q-076","original_type":"multiple-choice","topic":"DOM Manipulation","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.152Z',
          '2025-10-15T03:11:52.152Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'd3c01279-0c00-4faa-bc01-efc5e13b6c8d',
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
          '[{"id":"a","text":"True","isCorrect":true,"explanation":""},{"id":"b","text":"False","isCorrect":false,"explanation":""}]',
          NULL,
          'A pure function always returns the same output for the same inputs and has no side effects. This function meets both criteria.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','dom-manipulation','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-76–100QA-js-q-077","original_type":"true-false","topic":"DOM Manipulation","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.152Z',
          '2025-10-15T03:11:52.152Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '189329c2-5cfd-4de2-b7d3-c69bae8fb517',
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
          NULL,
          'The closure `addFunction` retains access to the `cache` object. All three calls use the key `10` (since `5 * 2 === 10`), so the first logs ''Calculated!'', and the next two log ''From cache!''.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','dom-manipulation','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-76–100QA-js-q-078","original_type":"multiple-choice","topic":"DOM Manipulation","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.152Z',
          '2025-10-15T03:11:52.152Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '902af20a-9f40-4a24-b603-e06023c072b4',
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
          NULL,
          '`for-in` iterates over enumerable property names (string indices). `for-of` iterates over values of iterable objects like arrays.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','dom-manipulation','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-76–100QA-js-q-079","original_type":"multiple-choice","topic":"DOM Manipulation","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.152Z',
          '2025-10-15T03:11:52.152Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '96506c51-ba27-471a-b458-134f2dc78c26',
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
          NULL,
          'Array elements are evaluated at definition time. `1 + 2 = 3`, `1 * 2 = 2`, `1 / 2 = 0.5`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','dom-manipulation','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-76–100QA-js-q-080","original_type":"multiple-choice","topic":"DOM Manipulation","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.152Z',
          '2025-10-15T03:11:52.152Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '614954ac-3567-4979-b11b-40d7c30853e2',
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
          NULL,
          'Missing arguments default to `undefined`. So the template literal becomes `''Hi there, undefined''`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','dom-manipulation','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-76–100QA-js-q-081","original_type":"multiple-choice","topic":"DOM Manipulation","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.152Z',
          '2025-10-15T03:11:52.152Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '90ea0707-6054-4446-bc43-d415416e9512',
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
          NULL,
          '`data.getStatus()` uses `this` bound to `data`, so returns `''🥑''`. Inside the arrow function, `this` refers to the global object, where `status` is `''😎''`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','dom-manipulation','advanced']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-76–100QA-js-q-082","original_type":"multiple-choice","topic":"DOM Manipulation","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.152Z',
          '2025-10-15T03:11:52.152Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'e942e2a9-607a-4282-9640-a808cb65fbbf',
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
          NULL,
          '`person.city` is `undefined`, so `city` is assigned `undefined`. Reassigning `city` doesn’t affect the `person` object.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','dom-manipulation','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-76–100QA-js-q-083","original_type":"multiple-choice","topic":"DOM Manipulation","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.152Z',
          '2025-10-15T03:11:52.152Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'b70ef1d8-48ca-4ee8-a387-4cd948325975',
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
          NULL,
          '`message` is block-scoped to each `if`/`else` block. It is not accessible in the outer function scope, causing a `ReferenceError`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','dom-manipulation','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-76–100QA-js-q-084","original_type":"multiple-choice","topic":"DOM Manipulation","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.152Z',
          '2025-10-15T03:11:52.152Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'f5710bc3-818b-4d2a-81b8-fc8d0f1c2856',
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
          NULL,
          'Each `.then` receives the return value of the previous `.then`. The second `.then` logs the parsed JSON object from `res.json()`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','dom-manipulation','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-76–100QA-js-q-085","original_type":"multiple-choice","topic":"DOM Manipulation","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.152Z',
          '2025-10-15T03:11:52.152Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'ff746963-f4d4-4bf1-a3bd-f448be6142dd',
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
          NULL,
          '`!!name` converts `name` to a boolean. If `name` is truthy, it returns `true`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','dom-manipulation','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-76–100QA-js-q-086","original_type":"multiple-choice","topic":"DOM Manipulation","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.152Z',
          '2025-10-15T03:11:52.152Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '3ec4e197-da0b-4741-90b4-4d3ef47aa1ba',
          'What''s the output of string bracket notation?',
          'What''s the output?

```javascript
console.log(''I want pizza''[0]);
```',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"`\"\"\"`","isCorrect":false,"explanation":""},{"id":"b","text":"`\"I\"`","isCorrect":true,"explanation":""},{"id":"c","text":"`SyntaxError`","isCorrect":false,"explanation":""},{"id":"d","text":"`undefined`","isCorrect":false,"explanation":""}]',
          NULL,
          'Strings are array-like. Index `0` returns the first character `''I''`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','dom-manipulation','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-76–100QA-js-q-087","original_type":"multiple-choice","topic":"DOM Manipulation","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.152Z',
          '2025-10-15T03:11:52.152Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '115caa14-1a0a-48a0-9c29-b9b03d90c955',
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
          NULL,
          'When only one argument is passed, `num2` defaults to `num1` (which is `10`). So `10 + 10 = 20`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','dom-manipulation','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-76–100QA-js-q-088","original_type":"multiple-choice","topic":"DOM Manipulation","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.152Z',
          '2025-10-15T03:11:52.152Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '4c8fb114-3450-435f-9255-caa60d18460f',
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
          NULL,
          '`import * as` creates an object with all exports. Default export is under `default` property; named exports are direct properties.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','dom-manipulation','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-76–100QA-js-q-089","original_type":"multiple-choice","topic":"DOM Manipulation","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.152Z',
          '2025-10-15T03:11:52.152Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '543378f9-ddfd-4acf-ae1a-e86d591b5967',
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
          NULL,
          'Class instances are objects. `typeof` returns `''object''` for all non-null objects.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','dom-manipulation','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-76–100QA-js-q-090","original_type":"multiple-choice","topic":"DOM Manipulation","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.152Z',
          '2025-10-15T03:11:52.152Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '18861eec-46e7-4ddc-9da5-eb82f4778c31',
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
          NULL,
          '`push` returns the new length (a number), not the array. Calling `.push(5)` on a number throws `TypeError`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','dom-manipulation','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-76–100QA-js-q-091","original_type":"multiple-choice","topic":"DOM Manipulation","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.152Z',
          '2025-10-15T03:11:52.152Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '258841c6-af70-452e-b868-127b62d8fba1',
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
          NULL,
          'Regular functions have a `prototype` object. Arrow functions do not; accessing `.prototype` returns `undefined`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','dom-manipulation','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-76–100QA-js-q-092","original_type":"multiple-choice","topic":"DOM Manipulation","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.152Z',
          '2025-10-15T03:11:52.152Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '73237bc7-7a20-4980-a07f-352dad2ba51a',
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
          NULL,
          '`Object.entries` returns `[[''name'', ''Lydia''], [''age'', 21]]`. Destructuring in `for-of` unpacks each pair into `x` and `y`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','dom-manipulation','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-76–100QA-js-q-093","original_type":"multiple-choice","topic":"DOM Manipulation","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.152Z',
          '2025-10-15T03:11:52.152Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '7c531b10-5952-4782-ac41-436e725a7329',
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
          NULL,
          'Rest parameters must be the last parameter. Placing `...args` before `favoriteFruit` is a syntax error.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','dom-manipulation','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-76–100QA-js-q-094","original_type":"multiple-choice","topic":"DOM Manipulation","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.152Z',
          '2025-10-15T03:11:52.152Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '14efa834-17d7-42ca-91c0-81292a1fc8ba',
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
          NULL,
          'ASI inserts a semicolon after `return`, so `a + b` is never executed. The function returns `undefined`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','dom-manipulation','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-76–100QA-js-q-095","original_type":"multiple-choice","topic":"DOM Manipulation","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.152Z',
          '2025-10-15T03:11:52.152Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '8ec7104e-6e30-4afe-ab79-d94c302fe273',
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
          NULL,
          'Classes are just special functions. Reassigning `Person` to a new class changes what `new Person()` creates.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','dom-manipulation','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-76–100QA-js-q-096","original_type":"multiple-choice","topic":"DOM Manipulation","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.152Z',
          '2025-10-15T03:11:52.152Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '3a99b3b0-57d7-4462-9824-a46926c9c90f',
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
          NULL,
          'Symbols are not enumerable. `Object.keys` only returns enumerable string-keyed properties, so it returns an empty array.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','dom-manipulation','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-76–100QA-js-q-097","original_type":"multiple-choice","topic":"DOM Manipulation","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.152Z',
          '2025-10-15T03:11:52.152Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '90b21df6-f998-412b-b8ed-04c1e20af5c6',
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
          NULL,
          '`getList` correctly destructures. `getUser` lacks parentheses around the object literal, so it''s parsed as a block statement with labels, causing `SyntaxError`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','dom-manipulation','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-76–100QA-js-q-098","original_type":"multiple-choice","topic":"DOM Manipulation","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.152Z',
          '2025-10-15T03:11:52.152Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'b511cbbb-6434-4688-9f2b-f943259b4bc9',
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
          NULL,
          'Strings are not callable. Attempting to invoke a string throws a `TypeError`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','dom-manipulation','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-76–100QA-js-q-099","original_type":"multiple-choice","topic":"DOM Manipulation","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.152Z',
          '2025-10-15T03:11:52.152Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'faed58dd-eb3d-47c1-a319-d056ac3079c9',
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
          NULL,
          '`[]` is truthy, so `[] && ''Im''` returns `''Im''`. `''''` is falsy, so `'''' && "n''t"` returns `''''`. Result: `''Impossible! You should see a therapist...''`',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','dom-manipulation','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-76–100QA-js-q-100","original_type":"multiple-choice","topic":"DOM Manipulation","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.152Z',
          '2025-10-15T03:11:52.152Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'ba40152e-b518-4957-9a56-c94ebb574277',
          'What is React?',
          'React (aka React.js or ReactJS) is an **open-source front-end JavaScript library** for building user interfaces based on components. It''s used for handling the view layer in web and mobile applications, and allows developers to create reusable UI components and manage the state of those components efficiently.

React was created by [Jordan Walke](https://github.com/jordwalke), a software engineer at Facebook (now Meta). It was first deployed on Facebook''s News Feed in 2011 and on Instagram in 2012. The library was open-sourced in May 2013 and has since become one of the most popular JavaScript libraries for building modern user interfaces.',
          'multiple-choice',
          'beginner',
          2,
          NULL,
          NULL,
          'React is a declarative, efficient, and flexible JavaScript library for building user interfaces using a component-based architecture.',
          NULL,
          ARRAY[]::text[],
          '["react","library","ui","components","frontend"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-001","original_type":"open-ended","topic":"React Basics","subcategory":"Fundamentals","sample_answers":["React is a JavaScript library for building user interfaces by composing reusable components.","React is an open-source front-end library maintained by Meta for creating interactive UIs with a virtual DOM and unidirectional data flow."],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'b01b4ace-79bb-4592-9b70-b43090898f67',
          'What is the history behind React''s evolution?',
          'The history of ReactJS started in 2010 with the creation of **XHP**. XHP is a PHP extension which improved the syntax of the language such that XML document fragments become valid PHP expressions and the primary purpose was used to create custom and reusable HTML elements.

The main principle of this extension was to make front-end code easier to understand and to help avoid cross-site scripting attacks. The project was successful to prevent the malicious content submitted by the scrubbing user.

But there was a different problem with XHP in which dynamic web applications require many roundtrips to the server, and XHP did not solve this problem. Also, the whole UI was re-rendered for small change in the application. Later, the initial prototype of React is created with the name **FaxJ** by Jordan inspired from XHP. Finally after sometime React has been introduced as a new library into JavaScript world.',
          'multiple-choice',
          'intermediate',
          4,
          NULL,
          NULL,
          'React was inspired by XHP, a PHP extension at Facebook. It evolved to solve performance issues with full re-renders by introducing the Virtual DOM, and has since grown with features like Hooks, Concurrent Mode, and Server Components.',
          NULL,
          ARRAY[]::text[],
          '["react","history","xhp","facebook","evolution"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-002","original_type":"open-ended","topic":"React Basics","subcategory":"History","sample_answers":["React originated from Facebook''s XHP project. Jordan Walke created FaxJS (later React) to bring XHP''s component model to JavaScript with better performance via the Virtual DOM.","React was first used internally at Facebook in 2011, open-sourced in 2013, and evolved through major milestones like React Native (2015), Fiber (2017), Hooks (2019), and React 18 (2022)."],"time_limit":180,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '803176e9-3f72-4a1d-8158-c4c12594a15f',
          'What are the major features of React?',
          'React offers a powerful set of features that have made it one of the most popular JavaScript libraries for building user interfaces:

**Core Features:**
- **Component-Based Architecture**: React applications are built using components - independent, reusable pieces of code that return HTML via a render function.
- **Virtual DOM**: React creates an in-memory data structure cache, computes the resulting differences, and efficiently updates only the changed parts in the browser DOM.
- **JSX (JavaScript XML)**: A syntax extension that allows writing HTML-like code in JavaScript.
- **Unidirectional Data Flow**: Data flows from parent to child components.
- **Declarative UI**: Describe what your UI should look like for a given state.

**Advanced Features:**
- **React Hooks**: Allow using state and other React features in functional components.
- **Context API**: Provides a way to share values between components without explicitly passing props.
- **Error Boundaries**: Components that catch JavaScript errors anywhere in their child component tree.
- **Server-Side Rendering (SSR)**: Enables rendering React components on the server.
- **Concurrent Mode**: A set of new features that help React apps stay responsive.
- **React Server Components**: A new feature that allows components to be rendered entirely on the server.
- **Suspense**: A feature that lets your components "wait" for something before rendering.',
          'multiple-choice',
          'beginner',
          3,
          '[{"id":"a","text":"Component-Based Architecture, Virtual DOM, JSX, Unidirectional Data Flow, Hooks, Context API, Error Boundaries, SSR, Concurrent Mode, Suspense, Server Components","isCorrect":true},{"id":"b","text":"Two-way data binding, templates, dependency injection, directives","isCorrect":false},{"id":"c","text":"Controllers, Models, Views, Services, Filters","isCorrect":false},{"id":"d","text":"Observables, Pipes, Modules, Decorators","isCorrect":false}]',
          NULL,
          'React''s major features include component architecture, Virtual DOM, JSX, unidirectional data flow, Hooks, Context API, Error Boundaries, SSR, Concurrent Mode, Suspense, and Server Components.',
          NULL,
          ARRAY[]::text[],
          '["react","features","virtual-dom","jsx","hooks","context"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-003","original_type":"multiple-choice","topic":"React Basics","subcategory":"Features","sample_answers":[],"time_limit":180,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'd18899d5-e828-4ce8-8453-a49ab1703410',
          'What is JSX?',
          '_JSX_ stands for _JavaScript XML_ and it is an XML-like syntax extension to ECMAScript. Basically it just provides the syntactic sugar for the `React.createElement(type, props, ...children)` function, giving us expressiveness of JavaScript along with HTML like template syntax.

In the example below, the text inside `<h1>` tag is returned as JavaScript function to the render function.

```jsx harmony
export default function App() {
  return <h1 className="greeting">{"Hello, this is a JSX Code!"}</h1>;
}
```

If you don''t use JSX syntax then the respective JavaScript code should be written as below,

```javascript
import { createElement } from "react";
export default function App() {
  return createElement(
    "h1",
    { className: "greeting" },
    "Hello, this is a JSX Code!"
  );
}
```',
          'multiple-choice',
          'beginner',
          2,
          '[{"id":"a","text":"A templating engine like Handlebars","isCorrect":false},{"id":"b","text":"Syntactic sugar for React.createElement()","isCorrect":true},{"id":"c","text":"A new programming language","isCorrect":false},{"id":"d","text":"A CSS preprocessor","isCorrect":false}]',
          NULL,
          'JSX is syntactic sugar for React.createElement(). It allows writing HTML-like syntax in JavaScript, which gets compiled to function calls.',
          NULL,
          ARRAY[]::text[],
          '["react","jsx","syntax","createElement"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-004","original_type":"multiple-choice","topic":"JSX","subcategory":"Syntax","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '2c8c9a6f-33d4-4d87-b124-bb14d856e45d',
          'What is the difference between an Element and a Component?',
          '**Element:**
- A React **Element** is a plain JavaScript object that describes what you want to see on the UI. It represents a DOM node or a component at a specific point in time. 
- Elements are immutable.
- Creating an element is fast and lightweight.

**Component:**
- A **Component** is a function or class that returns an element (or a tree of elements).
- Components can accept inputs (props) and manage their own state.

In summary:
- **Elements** are the smallest building blocks in React—objects that describe what you want to see.
- **Components** are functions or classes that return elements and encapsulate logic, structure, and behavior for parts of your UI.',
          'multiple-choice',
          'intermediate',
          4,
          '[{"id":"a","text":"An element is a function; a component is an object","isCorrect":false},{"id":"b","text":"An element is a plain object describing UI; a component is a function/class that returns elements","isCorrect":true},{"id":"c","text":"Elements are stateful; components are stateless","isCorrect":false},{"id":"d","text":"Components are DOM nodes; elements are virtual","isCorrect":false}]',
          NULL,
          'An element is a plain object describing what should appear on screen. A component is a function or class that returns elements.',
          NULL,
          ARRAY[]::text[],
          '["react","element","component","rendering"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-005","original_type":"multiple-choice","topic":"React Basics","subcategory":"Core Concepts","sample_answers":[],"time_limit":180,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '89455502-b9ea-436b-81ff-130fac6cbe7e',
          'How do you create components in React?',
          'Components are the building blocks of creating User Interfaces(UI) in React. There are two possible ways to create a component.

1. **Function Components:** This is the simplest way to create a component. Those are pure JavaScript functions that accept props object as the one and only one parameter and return React elements to render the output:
   ```jsx harmony
   function Greeting({ message }) {
     return <h1>{`Hello, ${message}`}</h1>;
   }
   ```

2. **Class Components:** You can also use ES6 class to define a component. The above function component can be written as a class component:
   ```jsx harmony
   class Greeting extends React.Component {
     render() {
       return <h1>{`Hello, ${this.props.message}`}</h1>;
     }
   }
   ```',
          'multiple-choice',
          'beginner',
          2,
          '[{"id":"a","text":"Only with classes","isCorrect":false},{"id":"b","text":"Only with functions","isCorrect":false},{"id":"c","text":"With functions or classes","isCorrect":true},{"id":"d","text":"With HTML templates only","isCorrect":false}]',
          NULL,
          'React components can be created as functions or ES6 classes. Function components are preferred in modern React.',
          NULL,
          ARRAY[]::text[],
          '["react","function-component","class-component","components"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-006","original_type":"multiple-choice","topic":"Components","subcategory":"Component Types","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '13038c6b-ae1a-45b0-8dc0-633f82fe2613',
          'When should you use a Class Component over a Function Component?',
          'After the addition of Hooks(i.e. React 16.8 onwards) it is always recommended to use Function components over Class components in React. Because you could use state, lifecycle methods and other features that were only available in class component present in function component too.

But even there are two reasons to use Class components over Function components.
1. If you need a React functionality whose Function component equivalent is not present yet, like Error Boundaries.
2. In older versions, If the component needs _state or lifecycle methods_ then you need to use class component.',
          'multiple-choice',
          'intermediate',
          3,
          '[{"id":"a","text":"Always use class components for performance","isCorrect":false},{"id":"b","text":"Use class components only for Error Boundaries or legacy code","isCorrect":true},{"id":"c","text":"Class components are required for all stateful logic","isCorrect":false},{"id":"d","text":"Function components cannot use props","isCorrect":false}]',
          NULL,
          'Since React 16.8, function components with Hooks are preferred. Class components are mainly needed for Error Boundaries (though third-party libraries like react-error-boundary can avoid this).',
          NULL,
          ARRAY[]::text[],
          '["react","class-component","function-component","hooks","error-boundaries"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-007","original_type":"multiple-choice","topic":"Components","subcategory":"Best Practices","sample_answers":[],"time_limit":180,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '2299fc09-b662-4f3c-867d-ae2249cdb29f',
          'What are Pure Components?',
          'Pure components are the components which render the same output for the same state and props. In function components, you can achieve these pure components through memoized `React.memo()` API wrapping around the component. This API prevents unnecessary re-renders by comparing the previous props and new props using shallow comparison.

In class components, the components extending _`React.PureComponent`_ instead of _`React.Component`_ become the pure components. When props or state changes, _PureComponent_ will do a shallow comparison on both props and state by invoking `shouldComponentUpdate()` lifecycle method.',
          'multiple-choice',
          'intermediate',
          4,
          '[{"id":"a","text":"Components that never re-render","isCorrect":false},{"id":"b","text":"Components that render the same output for the same props/state and avoid unnecessary re-renders","isCorrect":true},{"id":"c","text":"Components that only accept string props","isCorrect":false},{"id":"d","text":"Components that must be written in TypeScript","isCorrect":false}]',
          NULL,
          'Pure components optimize performance by preventing re-renders when props/state haven''t changed. Use React.memo() for function components and PureComponent for class components.',
          NULL,
          ARRAY[]::text[],
          '["react","pure-component","react-memo","performance","re-render"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-008","original_type":"multiple-choice","topic":"Performance Optimization","subcategory":"Optimization","sample_answers":[],"time_limit":240,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '6c5a914f-27db-4f68-9c57-7a064e24286a',
          'What is state in React?',
          '_State_ of a component is an object that holds some information that may change over the lifetime of the component. The important point is whenever the state object changes, the component re-renders.

Let''s take an example of **User** component with `message` state. Here, **useState** hook has been used to add state to the User component and it returns an array with current state and function to update it.

```jsx harmony
import { useState } from "react";
function User() {
  const [message, setMessage] = useState("Welcome to React world");
  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
}
```',
          'multiple-choice',
          'beginner',
          2,
          '[{"id":"a","text":"Immutable data passed from parent components","isCorrect":false},{"id":"b","text":"Mutable data that triggers re-renders when changed","isCorrect":true},{"id":"c","text":"Static configuration for a component","isCorrect":false},{"id":"d","text":"A global store like Redux","isCorrect":false}]',
          NULL,
          'State is mutable data that triggers re-renders when updated. In function components, it''s managed with useState; in class components, with this.state.',
          NULL,
          ARRAY[]::text[],
          '["react","state","useState","component-state"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-009","original_type":"multiple-choice","topic":"State","subcategory":"State Management","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '3c8ba852-af58-417b-82ea-50d859f5c652',
          'What are props in React?',
          '_Props_ are inputs to components. They are single values or objects containing a set of values that are passed to components on creation similar to HTML-tag attributes. Here, the data is passed down from a parent component to a child component.

The primary purpose of props in React is to provide following component functionality:
1. Pass custom data to your component.
2. Trigger state changes.
3. Use via `this.props.reactProp` inside component''s `render()` method.',
          'multiple-choice',
          'beginner',
          2,
          '[{"id":"a","text":"Mutable data managed by the component itself","isCorrect":false},{"id":"b","text":"Read-only inputs passed from parent to child","isCorrect":true},{"id":"c","text":"Global variables accessible anywhere","isCorrect":false},{"id":"d","text":"Event handlers only","isCorrect":false}]',
          NULL,
          'Props are read-only inputs passed from parent to child components to configure behavior or display data.',
          NULL,
          ARRAY[]::text[],
          '["react","props","properties","data-flow"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-010","original_type":"multiple-choice","topic":"Props","subcategory":"Data Flow","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '3eae8362-cd05-48e5-846b-736f5678eeba',
          'What is the difference between state and props?',
          '### State
- Managed within a component
- Mutable
- Local to the component
- Updated with setState/useState

### Props
- Passed from parent component
- Read-only
- Used to configure child components
- Cannot be modified by the child

### Summary Table
| Feature   | State                               | Props                             |
|-----------|-------------------------------------|-----------------------------------|
| Managed by| The component itself                | Parent component                  |
| Mutable   | Yes                                 | No (read-only)                    |
| Scope     | Local to the component              | Passed from parent to child       |
| Usage     | Manage dynamic data and UI changes  | Configure and customize component |
| Update    | Using setState/useState             | Cannot be updated by the component|',
          'multiple-choice',
          'beginner',
          3,
          '[{"id":"a","text":"State is immutable; props are mutable","isCorrect":false},{"id":"b","text":"State is managed internally and mutable; props are passed from parent and read-only","isCorrect":true},{"id":"c","text":"Props can be changed with this.setProps()","isCorrect":false},{"id":"d","text":"State and props are the same thing","isCorrect":false}]',
          NULL,
          'State is mutable and managed internally; props are immutable and passed from parents.',
          NULL,
          ARRAY[]::text[],
          '["react","state","props","data-flow","immutability"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-011","original_type":"multiple-choice","topic":"State","subcategory":"Core Concepts","sample_answers":[],"time_limit":150,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'e94c04bf-74be-4bc0-9105-53ceaf5ca334',
          'What is the difference between HTML and React event handling?',
          'Below are some of the main differences between HTML and React event handling,
1. In HTML, the event name usually represents in _lowercase_ as a convention:
   ```html
   <button onclick="activateLasers()"></button>
   ```
   Whereas in React it follows _camelCase_ convention:
   ```jsx harmony
   <button onClick={activateLasers}>
   ```
2. In HTML, you can return `false` to prevent default behavior:
   ```html
   <a
     href="#"
     onclick=''console.log("The link was clicked."); return false;''
   />
   ```
   Whereas in React you must call `preventDefault()` explicitly:
   ```javascript
   function handleClick(event) {
     event.preventDefault();
     console.log("The link was clicked.");
   }
   ```
3. In HTML, you need to invoke the function by appending `()`
   Whereas in react you should not append `()` with the function name.',
          'multiple-choice',
          'beginner',
          3,
          '[{"id":"a","text":"React uses lowercase event names like HTML","isCorrect":false},{"id":"b","text":"React uses camelCase, requires explicit preventDefault(), and passes function references","isCorrect":true},{"id":"c","text":"React uses strings for event handlers like HTML","isCorrect":false},{"id":"d","text":"React doesn''t support event handling","isCorrect":false}]',
          NULL,
          'React uses camelCase for event names, requires explicit preventDefault(), and passes function references (not strings).',
          NULL,
          ARRAY[]::text[],
          '["react","events","event-handling","camelcase","preventdefault"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-012","original_type":"multiple-choice","topic":"Event Handling","subcategory":"Events","sample_answers":[],"time_limit":150,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '7e7aa6ec-69e7-4f48-a108-7fa487dc55af',
          'What are synthetic events in React?',
          '`SyntheticEvent` is a cross-browser wrapper around the browser''s native event. Its API is same as the browser''s native event, including `stopPropagation()` and `preventDefault()`, except the events work identically across all browsers. The native events can be accessed directly from synthetic events using `nativeEvent` attribute.

Let''s take an example of `BookStore` title search component with the ability to get all native event properties

```js
function BookStore() {
  function handleTitleChange(e) {
    console.log("The new title is:", e.target.value);
    console.log(''Synthetic event:'', e); // React SyntheticEvent
    console.log(''Native event:'', e.nativeEvent); // Browser native event
    e.stopPropagation();
    e.preventDefault();
  }
  return <input name="title" onChange={handleTitleChange} />;
}
```',
          'multiple-choice',
          'intermediate',
          3,
          '[{"id":"a","text":"Native browser events","isCorrect":false},{"id":"b","text":"React''s cross-browser wrapper around native events","isCorrect":true},{"id":"c","text":"Custom events created with Event constructor","isCorrect":false},{"id":"d","text":"Events that only work in development mode","isCorrect":false}]',
          NULL,
          'SyntheticEvent is a React wrapper around native browser events, providing consistent API across browsers.',
          NULL,
          ARRAY[]::text[],
          '["react","synthetic-event","events","cross-browser"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-013","original_type":"multiple-choice","topic":"Event Handling","subcategory":"Events","sample_answers":[],"time_limit":180,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '2a1fc2f7-dac6-4ce8-8f17-a7319a03457d',
          'What are inline conditional expressions?',
          'You can use either _if statements_ or _ternary expressions_ which are available in JS(and JSX in React) to conditionally execute or render expressions. Apart from these approaches, you can also embed any expressions in JSX by wrapping them in curly braces and then followed by JS logical operator `&&`. It is helpful to render elements conditionally within a single line and commonly used for concise logic, especially in JSX rendering.

```jsx harmony
<h1>Hello!</h1>;
{
  messages.length > 0 && !isLogin ? (
    <h2>You have {messages.length} unread messages.</h2>
  ) : (
    <h2>You don''t have unread messages.</h2>
  );
}
```',
          'multiple-choice',
          'beginner',
          2,
          '[{"id":"a","text":"Only if/else blocks outside JSX","isCorrect":false},{"id":"b","text":"Ternary operators and && expressions inside JSX","isCorrect":true},{"id":"c","text":"Switch statements only","isCorrect":false},{"id":"d","text":"No conditional rendering in React","isCorrect":false}]',
          NULL,
          'React supports ternary operators and && for inline conditional rendering in JSX.',
          NULL,
          ARRAY[]::text[],
          '["react","conditional-rendering","ternary","logical-and","jsx"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-014","original_type":"multiple-choice","topic":"Conditional Rendering","subcategory":"Rendering","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '16f93050-bf30-4ca5-a005-5371433a96ab',
          'What is the "key" prop and what is its benefit when used in arrays of elements?',
          'A `key` is a special attribute you **should** include when mapping over arrays to render data. _Key_ prop helps React identify which items have changed, are added, or are removed.

Keys should be unique among its siblings. Most often we use ID from our data as _key_:
```jsx harmony
const todoItems = todos.map((todo) => <li key={todo.id}>{todo.text}</li>);
```

**Benefits of key:**
  *   Enables React to **efficiently update and re-render** components.
  *   Prevents unnecessary re-renders by **reusing** components when possible.
  *   Helps **maintain internal state** of list items correctly.',
          'multiple-choice',
          'intermediate',
          4,
          '[{"id":"a","text":"Keys are only for styling","isCorrect":false},{"id":"b","text":"Keys help React identify changes in lists for efficient updates and state preservation","isCorrect":true},{"id":"c","text":"Keys must be globally unique across the entire app","isCorrect":false},{"id":"d","text":"Keys are optional and have no performance impact","isCorrect":false}]',
          NULL,
          'Keys help React identify which list items have changed, been added, or removed, enabling efficient updates and correct state management.',
          NULL,
          ARRAY[]::text[],
          '["react","key","lists","rendering","performance"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-015","original_type":"multiple-choice","topic":"Lists and Keys","subcategory":"Lists","sample_answers":[],"time_limit":180,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '8b0b8004-fcc3-49bf-927e-3ef05a9503d0',
          'What is Virtual DOM?',
          'The _Virtual DOM_ (VDOM) is a lightweight, in-memory representation of _Real DOM_ used by libraries like React to optimize UI rendering. The representation of a UI is kept in memory and synced with the "real" DOM. It''s a step that happens between the render function being called and the displaying of elements on the screen. This entire process is called _reconciliation_.',
          'multiple-choice',
          'beginner',
          2,
          '[{"id":"a","text":"A real browser DOM node","isCorrect":false},{"id":"b","text":"An in-memory representation of the real DOM for efficient updates","isCorrect":true},{"id":"c","text":"A CSS rendering engine","isCorrect":false},{"id":"d","text":"A database for storing component state","isCorrect":false}]',
          NULL,
          'Virtual DOM is an in-memory representation of the real DOM that enables efficient diffing and minimal updates.',
          NULL,
          ARRAY[]::text[],
          '["react","virtual-dom","reconciliation","performance"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-016","original_type":"multiple-choice","topic":"Virtual DOM","subcategory":"Architecture","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'e579bb7a-982c-4e21-98ce-acf102436784',
          'How does the Virtual DOM work?',
          'The _Virtual DOM_ works in five simple steps.
**1. Initial Render**  
When a UI component renders for the first time, it returns JSX. React uses this structure to create a Virtual DOM tree.
**2. State or Props Change**  
When the component''s state or props change, React creates a new Virtual DOM.
**3. Diffing Algorithm**  
React compares the new Virtual DOM with the previous one.
**4. Reconciliation**  
Based on the diffing results, React decides which parts of the Real DOM should be updated.
**5. Efficient DOM Updates**  
This process makes UI rendering much faster and more efficient.',
          'multiple-choice',
          'intermediate',
          4,
          '[{"id":"a","text":"It replaces the entire real DOM on every change","isCorrect":false},{"id":"b","text":"It creates a new Virtual DOM, diffs it with the old one, and updates only changed real DOM nodes","isCorrect":true},{"id":"c","text":"It uses direct DOM manipulation without any abstraction","isCorrect":false},{"id":"d","text":"It only works in development mode","isCorrect":false}]',
          NULL,
          'React creates a new Virtual DOM on state change, diffs it with the previous one, and updates only the changed parts of the real DOM.',
          NULL,
          ARRAY[]::text[],
          '["react","virtual-dom","diffing","reconciliation","performance"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-017","original_type":"multiple-choice","topic":"Virtual DOM","subcategory":"Architecture","sample_answers":[],"time_limit":240,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'cdde5fb3-8601-4e82-82ea-945b398e32b9',
          'What is the difference between Shadow DOM and Virtual DOM?',
          'The _Shadow DOM_ is a browser technology designed primarily for scoping variables and CSS in _web components_. The _Virtual DOM_ is a concept implemented by libraries in JavaScript on top of browser APIs.

| Feature | Shadow DOM | Virtual DOM |
| --- | --- | --- |
| Purpose | Encapsulation for Web Components | Efficient UI rendering |
| Managed by | Browser | JS frameworks (e.g., React) |
| DOM Type | Part of real DOM (scoped) | In-memory representation |
| Encapsulation | Yes | No |
| Use Case | Web Components, scoped styling | UI diffing and minimal DOM updates |',
          'multiple-choice',
          'intermediate',
          3,
          '[{"id":"a","text":"They are the same thing","isCorrect":false},{"id":"b","text":"Shadow DOM is for Web Components encapsulation; Virtual DOM is for React''s efficient rendering","isCorrect":true},{"id":"c","text":"Virtual DOM is part of the browser; Shadow DOM is a React feature","isCorrect":false},{"id":"d","text":"Both are managed by the browser","isCorrect":false}]',
          NULL,
          'Shadow DOM is a browser feature for encapsulation in Web Components; Virtual DOM is a React concept for efficient rendering.',
          NULL,
          ARRAY[]::text[],
          '["react","shadow-dom","virtual-dom","web-components","encapsulation"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-018","original_type":"multiple-choice","topic":"Virtual DOM","subcategory":"Architecture","sample_answers":[],"time_limit":180,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '0a6758bf-65c2-4b58-bed8-abcb3cec54ca',
          'What is React Fiber?',
          '**React Fiber** is the **new reconciliation engine** in React, introduced in React 16. It''s a complete rewrite of React''s core algorithm(old stack-based algorithm) for rendering and updating the UI. Fiber enhances React''s ability to handle **asynchronous rendering**, **prioritized updates**(assign priority to different types of updates), and **interruption**(ability to pause, abort, or reuse work) of rendering work, enabling smoother and more responsive user interfaces.',
          'multiple-choice',
          'advanced',
          5,
          '[{"id":"a","text":"A new CSS-in-JS library","isCorrect":false},{"id":"b","text":"React''s new reconciliation engine for async rendering and prioritization","isCorrect":true},{"id":"c","text":"A state management library like Redux","isCorrect":false},{"id":"d","text":"A testing utility","isCorrect":false}]',
          NULL,
          'React Fiber is the new reconciliation engine in React 16+ that enables async rendering, prioritization, and interruption for better performance.',
          NULL,
          ARRAY[]::text[],
          '["react","fiber","reconciliation","concurrent-mode","async-rendering"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-019","original_type":"multiple-choice","topic":"React Fiber","subcategory":"Advanced","sample_answers":[],"time_limit":300,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'c8cb6103-ada2-45f7-b25d-d454d8ac1a40',
          'What is the main goal of React Fiber?',
          'The goal of _React Fiber_ is to increase its suitability for areas like animation, layout, and gestures. Its headline feature is **incremental rendering**: the ability to split rendering work into chunks and spread it out over multiple frames.

Its main goals are:
*   **Incremental Rendering** – Breaks work into chunks for smoother updates.
*   **Interruptible Rendering** – Pauses and resumes rendering to keep the UI responsive.
*   **Prioritization** – Handles high-priority updates before low-priority ones.
*   **Concurrency Support** – Enables working on multiple UI versions simultaneously.',
          'multiple-choice',
          'advanced',
          5,
          '[{"id":"a","text":"To replace JSX with templates","isCorrect":false},{"id":"b","text":"To enable incremental, interruptible, and prioritized rendering","isCorrect":true},{"id":"c","text":"To remove the need for components","isCorrect":false},{"id":"d","text":"To make React work only on the server","isCorrect":false}]',
          NULL,
          'React Fiber''s main goal is incremental rendering to enable smoother UIs by breaking work into chunks and prioritizing updates.',
          NULL,
          ARRAY[]::text[],
          '["react","fiber","incremental-rendering","concurrency","performance"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-020","original_type":"multiple-choice","topic":"React Fiber","subcategory":"Advanced","sample_answers":[],"time_limit":300,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '706cce7e-ce00-45f0-bef1-87bf32b0e272',
          'What are controlled components?',
          'A **controlled component** is a React component that **fully manages the form element''s state**(e.g, elements like `<input>`, `<textarea>`, or `<select>`))  using React''s internal state mechanism. i.e, The component does not manage its own internal state — instead, React acts as the single source of truth for form data.

The controlled components will be implemented using the below steps,
1. Initialize the state using `useState` hooks in function components or inside constructor for class components.
2. Set the value of the form element to the respective state variable.
3. Create an event handler(`onChange`) to handle the user input changes through `useState`''s updater function or `setState` from class component.
4. Attach the above event handler to form element''s change or click events',
          'multiple-choice',
          'intermediate',
          4,
          '[{"id":"a","text":"Form elements that manage their own state via the DOM","isCorrect":false},{"id":"b","text":"Form elements whose value is controlled by React state","isCorrect":true},{"id":"c","text":"Components that don''t re-render","isCorrect":false},{"id":"d","text":"Components that can''t use hooks","isCorrect":false}]',
          NULL,
          'Controlled components use React state as the single source of truth for form data, with value and onChange handlers.',
          NULL,
          ARRAY[]::text[],
          '["react","controlled-components","forms","state","input"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-021","original_type":"multiple-choice","topic":"Forms","subcategory":"Forms","sample_answers":[],"time_limit":240,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '87f296ae-abc8-4715-9dec-4ea6a46fc82a',
          'What are uncontrolled components?',
          'The **Uncontrolled components** are form elements (like `<input>`, `<textarea>`, or `<select>`) that **manage their own state internally** via the **DOM**, rather than through React state.

You can query the DOM using a `ref` to find its current value when you need it. This is a bit more like traditional HTML.',
          'multiple-choice',
          'intermediate',
          4,
          '[{"id":"a","text":"Components that use React state for everything","isCorrect":false},{"id":"b","text":"Form elements that manage their own state in the DOM and use refs to access values","isCorrect":true},{"id":"c","text":"Components that are not rendered","isCorrect":false},{"id":"d","text":"Components that can''t have children","isCorrect":false}]',
          NULL,
          'Uncontrolled components store their state in the DOM and use refs to access values when needed.',
          NULL,
          ARRAY[]::text[],
          '["react","uncontrolled-components","forms","refs","dom"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-022","original_type":"multiple-choice","topic":"Forms","subcategory":"Forms","sample_answers":[],"time_limit":240,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '20bfc6fe-4eba-4a16-a01d-9b2bfe10614e',
          'What is the difference between createElement and cloneElement?',
          '#### **createElement:** 
Creates a new React element from scratch. JSX elements will be transpiled to `React.createElement()` functions.

#### **cloneElement:**
 The `cloneElement` method is used to clone an existing React element and optionally adds or overrides props.',
          'multiple-choice',
          'intermediate',
          3,
          '[{"id":"a","text":"Both create new elements from scratch","isCorrect":false},{"id":"b","text":"createElement creates new elements; cloneElement clones existing elements and overrides props","isCorrect":true},{"id":"c","text":"cloneElement is for class components only","isCorrect":false},{"id":"d","text":"createElement is deprecated","isCorrect":false}]',
          NULL,
          'createElement creates new elements; cloneElement clones existing ones and optionally overrides props.',
          NULL,
          ARRAY[]::text[],
          '["react","createelement","cloneelement","elements","jsx"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-023","original_type":"multiple-choice","topic":"React Basics","subcategory":"API","sample_answers":[],"time_limit":180,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'a68b090f-9992-42e0-94fe-86e26d939e16',
          'What is Lifting State Up in React?',
          'When several components need to share the same changing data then it is recommended to _lift the shared state up_ to their closest common ancestor. That means if two child components share the same data from its parent, then move the state to parent instead of maintaining local state in both of the child components.',
          'multiple-choice',
          'intermediate',
          3,
          '[{"id":"a","text":"Moving state to a child component","isCorrect":false},{"id":"b","text":"Moving shared state to the closest common ancestor","isCorrect":true},{"id":"c","text":"Storing state in localStorage","isCorrect":false},{"id":"d","text":"Using global variables for state","isCorrect":false}]',
          NULL,
          'Lifting state up means moving shared state to the closest common ancestor so multiple components can access it.',
          NULL,
          ARRAY[]::text[],
          '["react","lifting-state-up","state","components","data-flow"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-024","original_type":"multiple-choice","topic":"State Management","subcategory":"Patterns","sample_answers":[],"time_limit":180,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '84876688-97ba-415c-8ecb-9810b79b378d',
          'What are Higher-Order Components?',
          'A _higher-order component_ (_HOC_) is a function that takes a component and returns a new enhanced component with additional props, behavior, or data. It''s a design pattern based on React''s compositional nature, allowing you to reuse logic across multiple components without modifying their internals.

```javascript
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```',
          'multiple-choice',
          'intermediate',
          4,
          '[{"id":"a","text":"Components that are higher in the DOM tree","isCorrect":false},{"id":"b","text":"Functions that take a component and return a new enhanced component","isCorrect":true},{"id":"c","text":"Components with more than 100 lines of code","isCorrect":false},{"id":"d","text":"Components that must be class-based","isCorrect":false}]',
          NULL,
          'HOCs are functions that take a component and return a new enhanced component, enabling logic reuse.',
          NULL,
          ARRAY[]::text[],
          '["react","hoc","higher-order-component","composition","reuse"]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"react-q-025","original_type":"multiple-choice","topic":"Higher-Order Components","subcategory":"Patterns","sample_answers":[],"time_limit":240,"related_links":[],"created_by":"system","updated_by":"system","technology":"React"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );