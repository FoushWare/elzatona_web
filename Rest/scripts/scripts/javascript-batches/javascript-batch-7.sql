INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'c86802f5-2caf-4da9-8b0b-593aa6f3d8ca',
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
      'c',
      'Classes are just special functions. Reassigning `Person` to a new class changes what `new Person()` creates.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','dom-manipulation','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-76–100QA-js-q-096","original_type":"multiple-choice","topic":"DOM Manipulation","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.367Z',
      '2025-10-21T22:24:06.367Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      'd89266be-d06b-4ed5-b890-af8041dfd0f6',
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
      'c',
      'Symbols are not enumerable. `Object.keys` only returns enumerable string-keyed properties, so it returns an empty array.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','dom-manipulation','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-76–100QA-js-q-097","original_type":"multiple-choice","topic":"DOM Manipulation","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.367Z',
      '2025-10-21T22:24:06.367Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '9dcfc9ab-83b3-458c-9cb0-bbc53e2a9ef2',
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
      'c',
      '`getList` correctly destructures. `getUser` lacks parentheses around the object literal, so it''s parsed as a block statement with labels, causing `SyntaxError`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','dom-manipulation','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-76–100QA-js-q-098","original_type":"multiple-choice","topic":"DOM Manipulation","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.367Z',
      '2025-10-21T22:24:06.367Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '042c6072-7510-4baa-b23b-2f3bf73c70fc',
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
      'c',
      'Strings are not callable. Attempting to invoke a string throws a `TypeError`.',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','dom-manipulation','beginner']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-76–100QA-js-q-099","original_type":"multiple-choice","topic":"DOM Manipulation","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.367Z',
      '2025-10-21T22:24:06.367Z'
    );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '3272a643-a744-4b51-84c7-4ca2d7f6347d',
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
      'c',
      '`[]` is truthy, so `[] && ''Im''` returns `''Im''`. `''''` is falsy, so `'''' && "n''t"` returns `''''`. Result: `''Impossible! You should see a therapist...''`',
      ARRAY[]::jsonb[],
      ARRAY[]::text[],
      ARRAY['javascript','dom-manipulation','intermediate']::text[],
      '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
      '{"original_id":"javascript-76–100QA-js-q-100","original_type":"multiple-choice","topic":"DOM Manipulation","sample_answers":[],"time_limit":60,"related_links":[],"created_by":"system","updated_by":"system","technology":"JavaScript"}',
      '70970873-3e49-46ec-91e0-2777ff9b9b42',
      true,
      '2025-10-21T22:24:06.367Z',
      '2025-10-21T22:24:06.367Z'
    );;
