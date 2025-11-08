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
    );;
