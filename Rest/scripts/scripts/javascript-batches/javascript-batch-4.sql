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
    );;
