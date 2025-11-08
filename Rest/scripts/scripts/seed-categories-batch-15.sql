INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '32e43bed-3448-4221-9f19-98f25a765f98',
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
          NULL,
          'ES modules are parsed and executed before the importing module. So `sum.js` runs first.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','async-programming','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-51-75QA-js-q-067","original_type":"multiple-choice","topic":"Async Programming","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.151Z',
          '2025-10-15T03:11:52.151Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '0e28e7a6-e455-4dbc-b1a6-07ca4b15d12e',
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
          NULL,
          'Every `Symbol()` call creates a unique symbol, even with the same description. So `Symbol(''foo'') === Symbol(''foo'')` is `false`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','async-programming','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-51-75QA-js-q-068","original_type":"multiple-choice","topic":"Async Programming","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.151Z',
          '2025-10-15T03:11:52.151Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'bb092098-22be-481e-985c-d9897a01e316',
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
          NULL,
          '`padStart(13)` adds 1 space (since length is 12). `padStart(2)` does nothing because 2 < 12.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','async-programming','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-51-75QA-js-q-069","original_type":"multiple-choice","topic":"Async Programming","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.151Z',
          '2025-10-15T03:11:52.151Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'd6f053b8-05ce-460d-be57-184d25b1a86e',
          'What''s the output of string concatenation with emojis?',
          'What''s the output?

```javascript
console.log(''🥑'' + ''💻'');
```',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"`\"🥑💻\"`","isCorrect":true,"explanation":""},{"id":"b","text":"`257548`","isCorrect":false,"explanation":""},{"id":"c","text":"A string containing their code points","isCorrect":false,"explanation":""},{"id":"d","text":"Error","isCorrect":false,"explanation":""}]',
          NULL,
          'The `+` operator concatenates strings, including emoji strings.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','async-programming','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-51-75QA-js-q-070","original_type":"multiple-choice","topic":"Async Programming","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.151Z',
          '2025-10-15T03:11:52.151Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '65e490ea-2ae3-42b2-bda8-daa367526eff',
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
          NULL,
          'First call `next()` to get the first yield. Then call `next(''Yes'')` to pass the answer and resume execution.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','async-programming','advanced']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-51-75QA-js-q-071","original_type":"multiple-choice","topic":"Async Programming","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.151Z',
          '2025-10-15T03:11:52.151Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'd5382c74-7544-4eb5-b146-2ec5a4216eba',
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
          NULL,
          '`String.raw` treats escape sequences as literal text, so the newline character is printed as-is.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','async-programming','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-51-75QA-js-q-072","original_type":"multiple-choice","topic":"Async Programming","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.151Z',
          '2025-10-15T03:11:52.151Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'f13931ea-acd9-49a0-9c2a-87a35942d5e9',
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
          NULL,
          'Async functions always return a promise. Since we don’t await `data`, we log the pending promise object.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','async-programming','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-51-75QA-js-q-073","original_type":"multiple-choice","topic":"Async Programming","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.151Z',
          '2025-10-15T03:11:52.151Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'dde03bc4-94a6-48ac-8d4d-e58ebe75c9a9',
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
          NULL,
          '`Array.prototype.push` returns the new length of the array, not the array itself.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','async-programming','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-51-75QA-js-q-074","original_type":"multiple-choice","topic":"Async Programming","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.151Z',
          '2025-10-15T03:11:52.151Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '9f7c65d2-a946-41dd-aae0-beece6bf42a7',
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
          NULL,
          '`Object.freeze` makes an object immutable (shallowly). Assignments to frozen properties are ignored in non-strict mode.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','async-programming','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-51-75QA-js-q-075","original_type":"multiple-choice","topic":"Async Programming","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.151Z',
          '2025-10-15T03:11:52.151Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'c1709bb9-a63d-4b9f-a415-e076f990a5d8',
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
          'eb80a2af-7900-4b65-82ea-c2aa7c6d05af',
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
          '4476e863-6645-48b5-ad41-551031142bf7',
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
          '8034c7fb-0092-48d9-9cbc-443b707f99cd',
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
          '604a8cad-6f25-4234-a7a4-784063e2adf1',
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
          '1d01d0d8-efe0-4539-8756-a7732ea90314',
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
          '2d7b53c4-c9ff-4c29-9631-0b62acb3c3ff',
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
          '64a85de2-f7a2-4261-8c21-a61b9fa5bc71',
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
          '57fc433b-fff2-4c3f-ab48-42a4455e78d8',
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
          '996bf347-b206-4791-8c9c-4bc493071e9d',
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
          '0634bb51-9a75-4846-971d-4a92be24e438',
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
          'd4b5a441-29d3-4ea6-9f33-95d39e9adf26',
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
          '376cea91-e397-4b80-b6d4-ed020af14c36',
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
          '9a8fb7a4-d09b-40c5-8a4c-7cb14e913ff1',
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
          '8c5007cd-14eb-4cea-a5e3-9a6195eb4989',
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
          '052b28f2-2280-4b10-8b58-e446ad672061',
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
          '9161735a-f8fe-47aa-a6c3-b5c320b86363',
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
          '271ff291-1e69-46f2-84f0-4fd12bad55ce',
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
          '65940ff4-7a93-48b3-a75c-643fbeabc881',
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
          '46490b78-0f1d-46ba-8012-f8ce75936e5d',
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
          'fac1a8aa-57f8-4cf4-b225-cce14eb3928f',
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
          'b4db405d-7a4f-481a-8191-9998ef658fa0',
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
          'c73dbfe9-298d-4f8c-a6a3-fededbf14ca8',
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
          '604c59fe-e09d-440c-9123-f7db41272b07',
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
          '051eaee5-bdb9-42e6-b89e-c680e4512b68',
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
          'e39665b9-0f4e-489b-80a7-ef0e47cbef8e',
          'What is the App Router in Next.js?',
          'The App Router is a new routing system in Next.js 13+ based on the `app/` directory, React Server Components, and nested layouts.',
          'multiple-choice',
          'advanced',
          8,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'It replaces the Pages Router with a more powerful, server-first architecture that supports streaming, partial rendering, and built-in data fetching.',
          NULL,
          [],
          ARRAY['nextjs','app-router','advanced']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"next-21-40-nextjs-q21","original_type":"open-ended","topic":"App Router","subcategory":"","sample_answers":["The App Router uses the `app/` directory with file-based routing, React Server Components by default, and supports nested layouts via `layout.js` files.","It enables features like streaming with Suspense, automatic code splitting, and colocation of components, data, and styles."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Next.js"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'd3cfa46b-e4e6-4f32-89f9-d593722a07b7',
          'How do you handle loading states in the App Router?',
          'Use the `loading.js` file in a route segment to show a loading UI while data is being fetched. It works with React Suspense.',
          'multiple-choice',
          'intermediate',
          7,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          '`loading.js` provides an instant loading UI without client-side JavaScript, improving perceived performance.',
          NULL,
          [],
          ARRAY['nextjs','loading-states','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"next-21-40-nextjs-q22","original_type":"open-ended","topic":"Loading States","subcategory":"","sample_answers":["Create `app/dashboard/loading.js` that exports a component. Next.js shows it immediately while the `page.js` data loads.","This is built on React Suspense—no need for `useState` or `useEffect` to manage loading states manually."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Next.js"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '190f1007-1e16-4b1a-a1d1-869faebd2041',
          'What is the purpose of error.js in the App Router?',
          'The `error.js` file defines an error boundary for a route segment, catching errors in Server and Client Components and displaying a fallback UI.',
          'multiple-choice',
          'intermediate',
          7,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'It uses React error boundaries under the hood and can be reset with the `error.reset()` function.',
          NULL,
          [],
          ARRAY['nextjs','error-handling','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"next-21-40-nextjs-q23","original_type":"open-ended","topic":"Error Handling","subcategory":"","sample_answers":["`error.js` exports a Client Component that receives `error` and `reset` props. It catches errors in the route segment and lets users retry.","Unlike Pages Router, error boundaries are file-based and automatically scoped to the route."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Next.js"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'df828274-aa0c-47a9-a3d6-035566e62169',
          'How do you implement nested layouts in Next.js App Router?',
          'Create `layout.js` files in nested folders. Each layout wraps its child routes, enabling persistent UI like headers and sidebars.',
          'multiple-choice',
          'intermediate',
          7,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Layouts are Server Components by default and can fetch data. They persist across route changes, improving performance.',
          NULL,
          [],
          ARRAY['nextjs','layouts','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"next-21-40-nextjs-q24","original_type":"open-ended","topic":"Layouts","subcategory":"","sample_answers":["In `app/dashboard/layout.js`, return a layout with a sidebar. All pages in `app/dashboard/` will be wrapped by it.","Layouts can be nested: `app/layout.js` → `app/dashboard/layout.js` → `app/dashboard/settings/page.js`."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Next.js"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '4409a30d-2138-462a-9140-7235af8cb1fe',
          'What is the difference between `generateStaticParams` and `getStaticPaths`?',
          '`generateStaticParams` is used in App Router for dynamic routes with SSG. `getStaticPaths` is the Pages Router equivalent.',
          'multiple-choice',
          'intermediate',
          7,
          '[{"id":"a","text":"`generateStaticParams`: App Router; `getStaticPaths`: Pages Router","isCorrect":true,"explanation":""},{"id":"b","text":"They are the same function","isCorrect":false,"explanation":""},{"id":"c","text":"`getStaticPaths` works in App Router","isCorrect":false,"explanation":""},{"id":"d","text":"`generateStaticParams` is for SSR","isCorrect":false,"explanation":""}]',
          NULL,
          'Both define which dynamic routes to pre-render at build time.',
          NULL,
          [],
          ARRAY['nextjs','static-site-generation-(ssg)','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"next-21-40-nextjs-q25","original_type":"multiple-choice","topic":"Static Site Generation (SSG)","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Next.js"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'c44fe14c-283e-46ea-970d-b19b18467485',
          'How do you handle dynamic routes in the App Router?',
          'Use dynamic segments like `app/users/[id]/page.js`. Fetch data using `params.id` in the Server Component.',
          'multiple-choice',
          'intermediate',
          7,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'The `params` object is passed to `page.js`, `layout.js`, and other route handlers automatically.',
          NULL,
          [],
          ARRAY['nextjs','dynamic-routes','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"next-21-40-nextjs-q26","original_type":"open-ended","topic":"Dynamic Routes","subcategory":"","sample_answers":["Create `app/blog/[slug]/page.js`. The `slug` is available via `params.slug` in the component: `export default async function Page({ params }) { ... }`","Use `generateStaticParams` to pre-render dynamic routes at build time for SSG."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Next.js"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'e7b8f935-b4e5-4193-af97-51d292236832',
          'What is the purpose of the `not-found.js` file?',
          '`not-found.js` defines a custom 404 page for a route segment when `notFound()` is thrown or a route doesn’t exist.',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'It’s the App Router equivalent of `pages/404.js` but scoped to route segments.',
          NULL,
          [],
          ARRAY['nextjs','error-handling','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"next-21-40-nextjs-q27","original_type":"open-ended","topic":"Error Handling","subcategory":"","sample_answers":["Create `app/not-found.js` for a global 404, or `app/blog/not-found.js` for blog-specific 404s.","Call `notFound()` from `next/navigation` in a Server Component to trigger it programmatically."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Next.js"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '919a0081-ae91-4e74-8af3-684377752123',
          'How do you redirect in Next.js App Router?',
          'Use `redirect()` from `next/navigation` in Server Components, or `useRouter().push()` in Client Components.',
          'multiple-choice',
          'intermediate',
          7,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          '`redirect()` is for server-side redirects (e.g., auth checks); `useRouter` is for client-side navigation.',
          NULL,
          [],
          ARRAY['nextjs','redirects','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"next-21-40-nextjs-q28","original_type":"open-ended","topic":"Redirects","subcategory":"","sample_answers":["In a Server Component: `import { redirect } from ''next/navigation''; if (!user) redirect(''/login'');`","In a Client Component: `const router = useRouter(); router.push(''/dashboard'');`"],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Next.js"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'd5f6fb88-0574-4f37-882a-582eb1ea85a7',
          'What is the `useRouter` hook used for?',
          '`useRouter` provides client-side navigation methods like `push`, `replace`, and `refresh` in Client Components.',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"Client-side navigation in Client Components","isCorrect":true,"explanation":""},{"id":"b","text":"Data fetching in Server Components","isCorrect":false,"explanation":""},{"id":"c","text":"Server-side redirects","isCorrect":false,"explanation":""},{"id":"d","text":"Only works in Pages Router","isCorrect":false,"explanation":""}]',
          NULL,
          'It’s the App Router equivalent of `next/router` but with the same API.',
          NULL,
          [],
          ARRAY['nextjs','client-side-navigation','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"next-21-40-nextjs-q29","original_type":"multiple-choice","topic":"Client-Side Navigation","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Next.js"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '18fb4ab9-61ff-4130-939f-f520976f9f08',
          'How do you handle environment variables in Next.js?',
          'Prefix with `NEXT_PUBLIC_` to expose to the browser; others are server-only. Load from `.env.local`.',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Non-prefixed variables are only available in Server Components and API routes—never exposed to client.',
          NULL,
          [],
          ARRAY['nextjs','environment-variables','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"next-21-40-nextjs-q30","original_type":"open-ended","topic":"Environment Variables","subcategory":"","sample_answers":["`NEXT_PUBLIC_API_URL` is available in the browser; `DATABASE_URL` is only in server code—keeping secrets safe.","Use `.env.local` for local development; Vercel lets you set env vars in the project dashboard."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Next.js"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '0c8f8376-cfda-49d3-b23d-eda35cb0304a',
          'What is the difference between `resolving` and `fetching` in Next.js?',
          'Resolving is determining which route to render. Fetching is retrieving data for that route.',
          'multiple-choice',
          'advanced',
          8,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Next.js first resolves the route (e.g., `/blog/[slug]`), then fetches data for it using Server Components.',
          NULL,
          [],
          ARRAY['nextjs','app-router-internals','advanced']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"next-21-40-nextjs-q31","original_type":"open-ended","topic":"App Router Internals","subcategory":"","sample_answers":["Resolving matches the URL to a file in `app/`. Fetching runs the Server Component to get data and render HTML.","These phases enable streaming: the shell renders while data fetches in parallel."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Next.js"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '3c34acad-ab83-4c5c-91c6-e9d8eaafc514',
          'How does Next.js handle caching?',
          'Next.js extends `fetch()` with automatic caching, revalidation, and deduping. Use `cache`, `next.revalidate`, and `next.tags` options.',
          'multiple-choice',
          'advanced',
          9,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Caching is opt-in via `fetch` options, replacing `getStaticProps`/`getServerSideProps`.',
          NULL,
          [],
          ARRAY['nextjs','caching','advanced']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"next-21-40-nextjs-q32","original_type":"open-ended","topic":"Caching","subcategory":"","sample_answers":["`fetch(url, { next: { revalidate: 60 } })` caches for 60 seconds. `fetch(url, { cache: ''no-store'' })` disables caching for SSR.","Use `tags` for on-demand revalidation: `fetch(url, { next: { tags: [''posts''] } })` then `revalidateTag(''posts'')` in an API route."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Next.js"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '6b19f361-e20d-4175-942f-e4f84e7ac09a',
          'What is on-demand revalidation in Next.js?',
          'On-demand revalidation allows you to purge cached data and regenerate pages after build time using `revalidateTag` or `revalidatePath`.',
          'multiple-choice',
          'advanced',
          8,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'It’s the App Router equivalent of ISR but triggered manually via API routes or webhooks.',
          NULL,
          [],
          ARRAY['nextjs','incremental-static-regeneration','advanced']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"next-21-40-nextjs-q33","original_type":"open-ended","topic":"Incremental Static Regeneration","subcategory":"","sample_answers":["Tag a `fetch` with `next: { tags: [''product-123''] }`. Later, call `revalidateTag(''product-123'')` in an API route to update the page.","Useful for CMS webhooks, e-commerce inventory updates, or admin actions that require immediate content refresh."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Next.js"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '9bec6864-8308-40f4-a7ba-4964fcc063f6',
          'How do you implement middleware in Next.js?',
          'Create a `middleware.js` file in the root or route segment. It runs before requests and can rewrite, redirect, or add headers.',
          'multiple-choice',
          'intermediate',
          7,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Middleware is ideal for authentication, A/B testing, i18n, and bot protection.',
          NULL,
          [],
          ARRAY['nextjs','middleware','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"next-21-40-nextjs-q34","original_type":"open-ended","topic":"Middleware","subcategory":"","sample_answers":["```js\nexport { default } from ''next-auth/middleware'';\nexport const config = { matcher: [''/dashboard/:path*''] };\n```","Use `NextRequest` to inspect cookies, headers, or URL, then `NextResponse.rewrite()` or `redirect()` as needed."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Next.js"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '0046e667-8a9b-46ba-8dc8-eab485662c9c',
          'What is the purpose of `next.config.js`?',
          '`next.config.js` customizes Next.js build settings like Webpack, Babel, environment variables, and experimental features.',
          'multiple-choice',
          'intermediate',
          6,
          '[{"id":"a","text":"Customize Webpack, Babel, env vars, and experimental features","isCorrect":true,"explanation":""},{"id":"b","text":"Required for every Next.js app","isCorrect":false,"explanation":""},{"id":"c","text":"Only for CSS configuration","isCorrect":false,"explanation":""},{"id":"d","text":"Replaces package.json","isCorrect":false,"explanation":""}]',
          NULL,
          'It’s optional but powerful for advanced customization without ejecting.',
          NULL,
          [],
          ARRAY['nextjs','next.js-configuration','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"next-21-40-nextjs-q35","original_type":"multiple-choice","topic":"Next.js Configuration","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Next.js"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'c8db49b6-27b4-465c-938d-68018778408d',
          'How does Next.js optimize images?',
          'Next.js uses the `next/image` component to automatically optimize images (resize, compress, modern formats) and lazy-load them.',
          'multiple-choice',
          'intermediate',
          7,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'It reduces bandwidth, improves LCP, and prevents layout shift with automatic sizing.',
          NULL,
          [],
          ARRAY['nextjs','image-optimization','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"next-21-40-nextjs-q36","original_type":"open-ended","topic":"Image Optimization","subcategory":"","sample_answers":["`next/image` serves optimized WebP/AVIF, resizes based on device, and lazy-loads offscreen images—no config needed.","It integrates with CDNs and local file storage, and supports blur-up placeholders."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Next.js"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2024-01-01T00:00:00.000Z',
          '2024-01-01T00:00:00.000Z'
        );;