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
    );;
