INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '88146ce2-9a4a-49ae-97a3-ec62ab53c532',
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
          '60085d5f-952c-4083-b0fd-e9bc8c4f80e1',
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
          'f433f80a-0cd4-4384-b92d-c56d9516658d',
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
          '629a8014-8ddd-45b4-8b36-b68f5956abcb',
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
          '2ea196c2-16df-40db-8137-fa637d4bdbca',
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
          'd9303177-baf4-4cef-87a0-54cf4ceefe77',
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
          '75f96632-3b75-4c5e-b9fa-5db826f7a834',
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
          '269980e4-f184-4a97-a31a-c0b40d56d176',
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
          '2843b3e2-04e9-4cf1-acb4-2c94f32b5ae2',
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

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '991c4319-35c8-40aa-9bb1-9d5bf760869b',
          'Does the global execution context create global object and ''this''?',
          'The JavaScript global execution context creates two things for you: the global object, and the "this" keyword.',
          'true-false',
          'beginner',
          10,
          '[{"id":"true","text":"True","isCorrect":false},{"id":"false","text":"False","isCorrect":true}]',
          'false',
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
          'f6474fac-088f-491a-931f-fb172a73660f',
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
          'da450cfd-2025-47b8-8423-d5a5e1100b5a',
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
          '76ed00b1-59f7-4745-96c0-2d416e67f85f',
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
          '715e8c86-6dc6-474e-b367-ac30237adb41',
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
          '10eabf5d-31fa-4ef1-b1be-18d610264f20',
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
          'a6b5b5c8-3ab6-4451-b3e0-fbc9c329f0f7',
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
          '697a57d8-f8dc-48a7-98d6-16bb704e9900',
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
          '170d9c44-b1b6-4f62-a05c-7a2cc6788c26',
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
          'aba8c652-fe2b-4e95-8552-7bdea99a337f',
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
          '304bd820-bb86-4ad7-ac3b-b8bbd000d6b4',
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
          '006f0181-0bda-4c99-ae7e-7a4893a415e9',
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
          '92ef66e3-b150-49a8-9ab6-ca62f6079c54',
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
          '0f623dae-77b2-4fe7-96aa-afb00f594b48',
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
          'f1990c57-1143-4f89-874d-8fd54b63a6a1',
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
          '14c3574d-44f2-4cc9-9e62-017c7875e223',
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
          '44a05be4-801f-4e01-b05c-ea8521f1d092',
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
          'ef1e0944-4f99-4ccf-85a7-a461eadd28d3',
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
          'b44ac25e-b66d-4927-aa1f-6582684f3454',
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
          'a7060987-b5a5-4ad4-816c-9c73114825f7',
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
          'e38eff59-27ea-4c63-a370-cdb7165704cb',
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
          '45ad592e-6d97-4f12-a0f2-60d1a7243dc4',
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
          '5812d581-293c-4b46-b9ec-0423228c36bf',
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
          'bdfd8e0f-3ce1-4281-9975-5cd21a5bb19d',
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
          'af906cf8-9ced-4180-97df-3bac5a3f6e8d',
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
          '75a904b1-bcd7-4712-8fb9-77763405d6a2',
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
          '8b23516e-8585-4f2e-9625-04a66a3c6991',
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
          '49d4d21f-a268-499a-8350-4d3a50be1642',
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
          'ea144121-84bc-4995-ad53-cb572a9a643a',
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
          '66a0b419-33a6-463f-bac5-274d385f7ec4',
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
          'a6d168f6-983d-4334-8f16-519e3201b356',
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
          '4a1863e8-7882-4323-b9fd-a3694b5cc9b6',
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
          '47456e94-0449-460d-b13d-6e93542c1c27',
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
          '7be37b9e-fa67-476e-8300-1f5b7a7a6516',
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
          '232c2964-ff09-48fa-86c1-393dc843684a',
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
          '86b6dc23-a0d1-4530-9c85-431897adc320',
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
          '98ec3071-a065-4c8b-ba5b-d8df0b3113a7',
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
          'c854e34c-7023-4a0a-8b3a-2f05e7b7e417',
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
          'f9de1ada-0dab-43f1-8446-59b2eed8dd7d',
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
          '4c27b2fa-8dda-4c84-a794-2cebe222d843',
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
          'dff3d861-ade8-42f8-9db4-5b46bdf0ac13',
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
        );;