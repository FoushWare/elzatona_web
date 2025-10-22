INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '19fd06cf-abae-43ce-9d3a-5a2ee3d9363f',
          'Does the global execution context create global object and ''this''?',
          'The JavaScript global execution context creates two things for you: the global object, and the "this" keyword.',
          'true-false',
          'beginner',
          10,
          '[{"id":"a","text":"True","isCorrect":true,"explanation":""},{"id":"b","text":"False","isCorrect":false,"explanation":""},{"id":"c","text":"It depends","isCorrect":false,"explanation":""}]',
          NULL,
          'The global execution context creates the global object (e.g., `window` in browsers) and sets `this` to refer to it in non-strict mode.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','es6+-features','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-26-50QA-js-q-026","original_type":"true-false","topic":"ES6+ Features","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.150Z',
          '2025-10-15T03:11:52.150Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '0c19c659-826c-43d0-a427-4ef4e0bbef3c',
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
          NULL,
          'The `continue` statement skips the current iteration when `i === 3`, so `3` is not logged.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','es6+-features','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-26-50QA-js-q-027","original_type":"multiple-choice","topic":"ES6+ Features","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.150Z',
          '2025-10-15T03:11:52.150Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'f0b68591-c922-4e26-9ee9-23e804e5201f',
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
          NULL,
          'Primitive strings are automatically wrapped in a `String` object, which inherits methods from `String.prototype`. Thus, the method is accessible.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','es6+-features','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-26-50QA-js-q-028","original_type":"multiple-choice","topic":"ES6+ Features","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.150Z',
          '2025-10-15T03:11:52.150Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '0e40ff0f-ccfd-48c7-aebf-88ee6e185e51',
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
          NULL,
          'Object keys are converted to strings. Both `b` and `c` become `"[object Object]"`, so the second assignment overwrites the first.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','es6+-features','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-26-50QA-js-q-029","original_type":"multiple-choice","topic":"ES6+ Features","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.150Z',
          '2025-10-15T03:11:52.150Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '4f57e351-45c1-49ef-b3ab-f0a0c0392336',
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
          NULL,
          '`setTimeout` callbacks are added to the task queue and run after the call stack is empty. So sync logs (`First`, `Third`) appear before `Second`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','es6+-features','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-26-50QA-js-q-030","original_type":"multiple-choice","topic":"ES6+ Features","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.150Z',
          '2025-10-15T03:11:52.150Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '71c6990e-a970-4e91-87f0-467f36b6ad65',
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
          NULL,
          '`event.target` is always the deepest element that triggered the event—in this case, the `<button>`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','es6+-features','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-26-50QA-js-q-031","original_type":"multiple-choice","topic":"ES6+ Features","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.150Z',
          '2025-10-15T03:11:52.150Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '7f406186-c889-4cb2-98ae-7ed151e438f4',
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
          NULL,
          'By default, event handlers run in the bubbling phase: from target (`p`) up to ancestors (`div`). So `p` logs first, then `div`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','es6+-features','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-26-50QA-js-q-032","original_type":"multiple-choice","topic":"ES6+ Features","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.150Z',
          '2025-10-15T03:11:52.150Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '67ac5fb4-38f0-4bd7-990b-dcea02d0a888',
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
          NULL,
          '`.call()` executes immediately and returns the string. `.bind()` returns a new function (not executed), so `typeof` would be `''function''`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','es6+-features','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-26-50QA-js-q-033","original_type":"multiple-choice","topic":"ES6+ Features","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.150Z',
          '2025-10-15T03:11:52.150Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '1dbf7fd5-0044-499c-97cf-a96da2a8815b',
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
          NULL,
          'The IIFE returns `0`, which is a number. `typeof 0` is `''number''`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','es6+-features','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-26-50QA-js-q-034","original_type":"multiple-choice","topic":"ES6+ Features","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.150Z',
          '2025-10-15T03:11:52.150Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '04f6bf55-1f35-402b-ad7a-bcb5b3c29c00',
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
          NULL,
          'Only primitive falsy values count: `0`, `''''`, and `undefined`. `new Number(0)` and `new Boolean(false)` are objects (truthy). `'' ''` is a non-empty string (truthy).',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','es6+-features','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-26-50QA-js-q-035","original_type":"multiple-choice","topic":"ES6+ Features","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.150Z',
          '2025-10-15T03:11:52.150Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '3e81528d-6644-4673-82a4-1c1e3d0d60d3',
          'What''s typeof typeof 1?',
          'What''s the output?

```javascript
console.log(typeof typeof 1);
```',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"`\"number\"`","isCorrect":false,"explanation":""},{"id":"b","text":"`\"string\"`","isCorrect":true,"explanation":""},{"id":"c","text":"`\"object\"`","isCorrect":false,"explanation":""},{"id":"d","text":"`\"undefined\"`","isCorrect":false,"explanation":""}]',
          NULL,
          '`typeof 1` returns `''number''` (a string). `typeof ''number''` returns `''string''`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','es6+-features','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-26-50QA-js-q-036","original_type":"multiple-choice","topic":"ES6+ Features","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.150Z',
          '2025-10-15T03:11:52.150Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '4ab60057-2a54-465f-acae-8dff635229f5',
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
          NULL,
          'Setting an index beyond the current length creates empty slots (not `null`). The array becomes `[1, 2, 3, <7 empty items>, 11]`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','es6+-features','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-26-50QA-js-q-037","original_type":"multiple-choice","topic":"ES6+ Features","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.150Z',
          '2025-10-15T03:11:52.150Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'df8577e7-f89f-41fc-ac06-ddc487e09918',
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
          NULL,
          'The `catch` parameter `x` is block-scoped. Assigning `x = 1` affects only the block-scoped `x`. The outer `x` remains `undefined`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','es6+-features','advanced']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-26-50QA-js-q-038","original_type":"multiple-choice","topic":"ES6+ Features","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.150Z',
          '2025-10-15T03:11:52.150Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'f73188de-0a8a-4a5c-8519-233aca2d77f5',
          'What are the two fundamental types in JavaScript?',
          'Everything in JavaScript is either a...',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"primitive or object","isCorrect":true,"explanation":""},{"id":"b","text":"function or object","isCorrect":false,"explanation":""},{"id":"c","text":"trick question! only objects","isCorrect":false,"explanation":""},{"id":"d","text":"number or object","isCorrect":false,"explanation":""}]',
          NULL,
          'JavaScript has 7 primitive types (`string`, `number`, etc.) and objects. Functions and arrays are objects.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','es6+-features','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-26-50QA-js-q-039","original_type":"multiple-choice","topic":"ES6+ Features","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.150Z',
          '2025-10-15T03:11:52.150Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '6e8c8a23-f63c-4a7e-9b19-868a7a66d2a2',
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
          NULL,
          'Initial value is `[1, 2]`. First iteration: `[1,2].concat([0,1])` → `[1,2,0,1]`. Second: `.concat([2,3])` → `[1,2,0,1,2,3]`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','es6+-features','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-26-50QA-js-q-040","original_type":"multiple-choice","topic":"ES6+ Features","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.150Z',
          '2025-10-15T03:11:52.150Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'eaf25e42-34ab-4b41-af60-e8c8f7c2ffdb',
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
          NULL,
          '`!!` converts to boolean. `null` and `''''` are falsy → `false`. `1` is truthy → `true`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','es6+-features','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-26-50QA-js-q-041","original_type":"multiple-choice","topic":"ES6+ Features","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.150Z',
          '2025-10-15T03:11:52.150Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'e7f4e694-1bcd-4e2f-b628-51d3a9f15b75',
          'What does setInterval return?',
          'What does the `setInterval` method return in the browser?

```javascript
setInterval(() => console.log(''Hi''), 1000);
```',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"a unique id","isCorrect":true,"explanation":""},{"id":"b","text":"the amount of milliseconds specified","isCorrect":false,"explanation":""},{"id":"c","text":"the passed function","isCorrect":false,"explanation":""},{"id":"d","text":"`undefined`","isCorrect":false,"explanation":""}]',
          NULL,
          '`setInterval` returns a unique numeric ID that can be used with `clearInterval` to stop the timer.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','es6+-features','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-26-50QA-js-q-042","original_type":"multiple-choice","topic":"ES6+ Features","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.150Z',
          '2025-10-15T03:11:52.150Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '811953b8-75f1-431d-9e12-bcb3cc5f6941',
          'What does spreading a string return?',
          'What does this return?

```javascript
[...''Lydia''];
```',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"`[\"L\", \"y\", \"d\", \"i\", \"a\"]`","isCorrect":true,"explanation":""},{"id":"b","text":"`[\"Lydia\"]`","isCorrect":false,"explanation":""},{"id":"c","text":"`[[], \"Lydia\"]`","isCorrect":false,"explanation":""},{"id":"d","text":"`[[\"L\", \"y\", \"d\", \"i\", \"a\"]]`","isCorrect":false,"explanation":""}]',
          NULL,
          'Strings are iterable. The spread operator converts them into an array of characters.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','es6+-features','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-26-50QA-js-q-043","original_type":"multiple-choice","topic":"ES6+ Features","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.150Z',
          '2025-10-15T03:11:52.150Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '4928f55b-d6e3-4675-a188-f47ef9b9f155',
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
          NULL,
          'First `next()` yields `10`. Second yields `10 * 2 = 20`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','es6+-features','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-26-50QA-js-q-044","original_type":"multiple-choice","topic":"ES6+ Features","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.150Z',
          '2025-10-15T03:11:52.150Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '32abb554-3263-4b69-bb64-e085f46f61fd',
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
          NULL,
          '`Promise.race` resolves with the first promise to settle. `secondPromise` resolves after 100ms, so `''two''` is logged.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','es6+-features','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-26-50QA-js-q-045","original_type":"multiple-choice","topic":"ES6+ Features","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.150Z',
          '2025-10-15T03:11:52.150Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '86671de0-17ff-4a22-a7e3-13ea4bde676c',
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
          NULL,
          '`members[0]` holds a reference to the original object. Reassigning `person` doesn’t affect that reference.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','es6+-features','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-26-50QA-js-q-046","original_type":"multiple-choice","topic":"ES6+ Features","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.150Z',
          '2025-10-15T03:11:52.150Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'c0b41a7a-0a26-4d2d-98e6-7d1a756eaacd',
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
          NULL,
          '`for-in` iterates over enumerable property names (keys), which are strings: `''name''` and `''age''`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','es6+-features','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-26-50QA-js-q-047","original_type":"multiple-choice","topic":"ES6+ Features","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.150Z',
          '2025-10-15T03:11:52.150Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '7b5ed6dd-f3e0-43be-ab66-361018d511b2',
          'What''s the output of mixed number and string addition?',
          'What''s the output?

```javascript
console.log(3 + 4 + ''5'');
```',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"`\"345\"`","isCorrect":false,"explanation":""},{"id":"b","text":"`\"75\"`","isCorrect":true,"explanation":""},{"id":"c","text":"`12`","isCorrect":false,"explanation":""},{"id":"d","text":"`\"12\"`","isCorrect":false,"explanation":""}]',
          NULL,
          'Left-to-right: `3 + 4 = 7` (number), then `7 + ''5'' = ''75''` (string concatenation).',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','es6+-features','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-26-50QA-js-q-048","original_type":"multiple-choice","topic":"ES6+ Features","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.150Z',
          '2025-10-15T03:11:52.150Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '9089e757-bc89-43ac-9f9f-d6c1e994afcc',
          'What''s the value of parseInt with invalid characters?',
          'What''s the value of `num`?

```javascript
const num = parseInt(''7*6'', 10);
```',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"`42`","isCorrect":false,"explanation":""},{"id":"b","text":"`\"42\"`","isCorrect":false,"explanation":""},{"id":"c","text":"`7`","isCorrect":true,"explanation":""},{"id":"d","text":"`NaN`","isCorrect":false,"explanation":""}]',
          NULL,
          '`parseInt` stops at the first invalid character (`*`), so only `''7''` is parsed → `7`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','es6+-features','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-26-50QA-js-q-049","original_type":"multiple-choice","topic":"ES6+ Features","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.150Z',
          '2025-10-15T03:11:52.150Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '9397da6d-4822-4dda-b8fb-598f3ecca536',
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
          NULL,
          'The `if` block returns `undefined` for all numbers. `map` returns `[undefined, undefined, undefined]`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','es6+-features','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-26-50QA-js-q-050","original_type":"multiple-choice","topic":"ES6+ Features","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.150Z',
          '2025-10-15T03:11:52.150Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '7bc91582-41a5-4828-be4a-870102cc1739',
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
          NULL,
          'Objects are passed by reference (copied reference), so modifications inside the function affect the original object. Primitives like strings are passed by value, so reassigning `year` doesn’t affect `birthYear`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','async-programming','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-51-75QA-js-q-051","original_type":"multiple-choice","topic":"Async Programming","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.151Z',
          '2025-10-15T03:11:52.151Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '659bbbae-a445-4677-b120-61b06eb2f9da',
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
          NULL,
          'You can throw any value in JavaScript, including strings. The `catch` block receives it as `e`, so the string is logged.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','async-programming','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-51-75QA-js-q-052","original_type":"multiple-choice","topic":"Async Programming","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.151Z',
          '2025-10-15T03:11:52.151Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'c868b4b8-8a24-4980-98fc-e73323bfe189',
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
          NULL,
          'When a constructor explicitly returns an object, that object is used instead of the one created by `new`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','async-programming','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-51-75QA-js-q-053","original_type":"multiple-choice","topic":"Async Programming","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.151Z',
          '2025-10-15T03:11:52.151Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '0a63fa97-61b7-4cc9-9af7-66fc8fc4ad9f',
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
          NULL,
          '`y = 10` creates a global variable because it’s an unqualified assignment. `x` is block-scoped with `let`, so it’s `undefined` outside the IIFE.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','async-programming','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-51-75QA-js-q-054","original_type":"multiple-choice","topic":"Async Programming","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.151Z',
          '2025-10-15T03:11:52.151Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '07f45d29-538f-4923-bae5-ad982a9d3360',
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
          NULL,
          'Deleting a method from the prototype removes it from the prototype chain. Subsequent calls result in `TypeError` because `pet.bark` becomes `undefined`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','async-programming','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-51-75QA-js-q-055","original_type":"multiple-choice","topic":"Async Programming","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.151Z',
          '2025-10-15T03:11:52.151Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'f1759b0b-9361-47c2-a77d-b1fda51ec6ef',
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
          NULL,
          '`Set` only stores unique values. Duplicates are ignored, so the result is `{1, 2, 3, 4}`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','async-programming','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-51-75QA-js-q-056","original_type":"multiple-choice","topic":"Async Programming","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.151Z',
          '2025-10-15T03:11:52.151Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '508ac39e-9cf6-44ed-87a7-439d3301fcd7',
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
          NULL,
          'ES module imports are live bindings but read-only. Attempting to reassign `myCounter` throws an error.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','async-programming','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-51-75QA-js-q-057","original_type":"multiple-choice","topic":"Async Programming","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.151Z',
          '2025-10-15T03:11:52.151Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'c008748a-d440-4ea3-b2c6-b90691f231e9',
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
          NULL,
          '`delete` returns `false` for variables declared with `const`/`let`/`var`. Implicit globals (like `age`) are properties of the global object and can be deleted (`true`).',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','async-programming','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-51-75QA-js-q-058","original_type":"multiple-choice","topic":"Async Programming","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.151Z',
          '2025-10-15T03:11:52.151Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '9efade8d-f4fe-4d6d-a1e1-533c0cc9e92c',
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
          NULL,
          'Array destructuring assigns the first element to `y`, so `1` is logged.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','async-programming','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-51-75QA-js-q-059","original_type":"multiple-choice","topic":"Async Programming","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.151Z',
          '2025-10-15T03:11:52.151Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '169b94b6-dbd0-449a-891a-dcf602f25ec3',
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
          NULL,
          'The spread operator copies enumerable properties from `user` into `admin`, resulting in a flat object with all keys.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','async-programming','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-51-75QA-js-q-060","original_type":"multiple-choice","topic":"Async Programming","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.151Z',
          '2025-10-15T03:11:52.151Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'fb000e90-b62c-4a59-bd69-e61cf0253f16',
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
          NULL,
          'Properties added via `Object.defineProperty` are non-enumerable by default, so `Object.keys` only returns `[''name'']`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','async-programming','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-51-75QA-js-q-061","original_type":"multiple-choice","topic":"Async Programming","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.151Z',
          '2025-10-15T03:11:52.151Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'e1d45235-d43a-430e-bc77-40b63515a235',
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
          NULL,
          'The replacer array filters which properties are included in the JSON string. Only `''level''` and `''health''` are included.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','async-programming','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-51-75QA-js-q-062","original_type":"multiple-choice","topic":"Async Programming","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.151Z',
          '2025-10-15T03:11:52.151Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '8fc2620f-450d-4559-9b3c-4c0c63c07256',
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
          NULL,
          'Postfix `++` returns the original value before incrementing. So both `num1` and `num2` are `10`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','async-programming','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-51-75QA-js-q-063","original_type":"multiple-choice","topic":"Async Programming","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.151Z',
          '2025-10-15T03:11:52.151Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '0c516a5b-6c3d-4669-be12-0b33a91e5603',
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
          NULL,
          'Default parameters are evaluated at call time, so each call without args gets a new object. But when `value` is passed, mutations persist.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','async-programming','advanced']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-51-75QA-js-q-064","original_type":"multiple-choice","topic":"Async Programming","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.151Z',
          '2025-10-15T03:11:52.151Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'eac60f16-7bdd-4b8f-b74f-b46d0384e356',
          'What''s the output of reduce without return?',
          'What''s the output?

```javascript
[1, 2, 3, 4].reduce((x, y) => console.log(x, y));
```',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"`1` `2` and `3` `3` and `6` `4`","isCorrect":false,"explanation":""},{"id":"b","text":"`1` `2` and `2` `3` and `3` `4`","isCorrect":false,"explanation":""},{"id":"c","text":"`1` `undefined` and `2` `undefined` and `3` `undefined` and `4` `undefined`","isCorrect":false,"explanation":""},{"id":"d","text":"`1` `2` and `undefined` `3` and `undefined` `4`","isCorrect":true,"explanation":""}]',
          NULL,
          'Without a return, the accumulator becomes `undefined` after the first iteration. So logs: `1 2`, then `undefined 3`, then `undefined 4`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','async-programming','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-51-75QA-js-q-065","original_type":"multiple-choice","topic":"Async Programming","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.151Z',
          '2025-10-15T03:11:52.151Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '207f352a-efc9-482c-876c-ceec4e043bf0',
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
          NULL,
          'In derived classes, `super()` must be called before using `this`. Only option 2 does this correctly and passes the right arguments.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','async-programming','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-51-75QA-js-q-066","original_type":"multiple-choice","topic":"Async Programming","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.151Z',
          '2025-10-15T03:11:52.151Z'
        );
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '14ff2abe-d87d-4d81-bcc7-35457d5cb8f0',
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
          '57b8bd67-00c3-42f8-8bb0-42bf7a8d769c',
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
          'd279525f-0a8e-47ba-b8d4-b3e2e1843755',
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
          'e1be899d-37e2-42e7-8ca9-c14cf663eead',
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
          '16d46f41-ed46-4442-8bbd-61511fc93cdb',
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
          '111d4bbf-cd8b-45c6-8060-301f0224f4d7',
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
          '57dbe0b5-562a-4565-83b5-9f37828c92a3',
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
          '1c8ac4c0-b33a-4640-bde6-c7555330b5c9',
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
          'c9517e71-ca87-4e18-89f2-1b67058b5198',
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