INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '09ca8470-8abb-4c8c-ae84-11d423b64ecc',
          'What is the purpose of the <template> element?',
          'Provide an example of using it with JavaScript.',
          'multiple-choice',
          'advanced',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          '<template> holds HTML markup that is not rendered initially. Example: const template = document.querySelector(''template''); document.body.appendChild(template.content.cloneNode(true));',
          NULL,
          [],
          ARRAY['html','templates','advanced']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"html-07-html92","original_type":"open-ended","topic":"Templates","subcategory":"","sample_answers":["<template> holds HTML markup that is not rendered initially. Example: const template = document.querySelector(''template''); document.body.appendChild(template.content.cloneNode(true));"],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"HTML"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:53:54.819Z',
          '2025-10-15T03:53:54.819Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '45ec6e7a-e131-44b0-873c-4e5bb2f55a95',
          'Explain the difference between <main> and <article>.',
          'When should each be used?',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          '<main> represents the main content of the page. <article> is a self-contained piece of content, like a blog post.',
          NULL,
          [],
          ARRAY['html','html5-elements','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"html-07-html93","original_type":"open-ended","topic":"HTML5 Elements","subcategory":"","sample_answers":["<main> represents the main content of the page. <article> is a self-contained piece of content, like a blog post."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"HTML"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:53:54.819Z',
          '2025-10-15T03:53:54.819Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '92e5b02e-c881-4e78-9bee-bf4bb2088dbd',
          'What is the difference between <output> and <progress>?',
          'Include example of calculating and showing form results.',
          'multiple-choice',
          'advanced',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          '<output> shows calculated values or results (e.g., sum of inputs). <progress> shows task completion percentage.',
          NULL,
          [],
          ARRAY['html','forms-&-output','advanced']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"html-07-html94","original_type":"open-ended","topic":"Forms & Output","subcategory":"","sample_answers":["<output> shows calculated values or results (e.g., sum of inputs). <progress> shows task completion percentage."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"HTML"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:53:54.819Z',
          '2025-10-15T03:53:54.819Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'a252d729-76cc-435d-85e9-a03b2d5a1890',
          'How do <source> and <track> differ when used inside <audio>/<video>?',
          'Explain how multiple formats and captions/subtitles are handled.',
          'multiple-choice',
          'advanced',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          '<source> allows multiple media formats; browser picks supported one. <track> adds captions/subtitles, can be multiple languages.',
          NULL,
          [],
          ARRAY['html','media-elements','advanced']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"html-07-html95","original_type":"open-ended","topic":"Media Elements","subcategory":"","sample_answers":["<source> allows multiple media formats; browser picks supported one. <track> adds captions/subtitles, can be multiple languages."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"HTML"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:53:54.819Z',
          '2025-10-15T03:53:54.819Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'a6900738-3a86-4e9b-9457-d3cbe8da6ba7',
          'Explain the difference between <embed> and <object>.',
          'Include practical use cases and browser support considerations.',
          'multiple-choice',
          'advanced',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          '<embed> directly embeds external content (Flash, PDF), <object> can embed media with fallback content and is more flexible.',
          NULL,
          [],
          ARRAY['html','embedding','advanced']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"html-07-html96","original_type":"open-ended","topic":"Embedding","subcategory":"","sample_answers":["<embed> directly embeds external content (Flash, PDF), <object> can embed media with fallback content and is more flexible."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"HTML"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:53:54.819Z',
          '2025-10-15T03:53:54.819Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '6b70c90d-d76c-47ea-8995-6bd108975d07',
          'What is the difference between <b> and <strong>, and <i> and <em>?',
          'Include semantic meaning and accessibility impact.',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          '<strong> and <em> convey importance and emphasis semantically; <b> and <i> are visual only.',
          NULL,
          [],
          ARRAY['html','text-semantics','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"html-07-html97","original_type":"open-ended","topic":"Text Semantics","subcategory":"","sample_answers":["<strong> and <em> convey importance and emphasis semantically; <b> and <i> are visual only."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"HTML"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:53:54.819Z',
          '2025-10-15T03:53:54.819Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '654d3926-7172-4ab0-be8b-df0f8eb34dc3',
          'Explain how tabindex works and when to use negative values.',
          'Include impact on keyboard navigation and accessibility.',
          'multiple-choice',
          'advanced',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'tabindex=''0'' allows normal focus order, tabindex=''-1'' removes element from tab order but still focusable programmatically.',
          NULL,
          [],
          ARRAY['html','keyboard-navigation','advanced']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"html-07-html98","original_type":"open-ended","topic":"Keyboard Navigation","subcategory":"","sample_answers":["tabindex=''0'' allows normal focus order, tabindex=''-1'' removes element from tab order but still focusable programmatically."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"HTML"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:53:54.819Z',
          '2025-10-15T03:53:54.819Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '571f4120-3461-49ac-858a-8f3469ac164c',
          'What is the difference between <area> and <map>?',
          'Provide an example for creating image maps.',
          'multiple-choice',
          'advanced',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          '<map> defines the image map container; <area> defines clickable regions with href, coords, and shape attributes.',
          NULL,
          [],
          ARRAY['html','image-maps','advanced']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"html-07-html99","original_type":"open-ended","topic":"Image Maps","subcategory":"","sample_answers":["<map> defines the image map container; <area> defines clickable regions with href, coords, and shape attributes."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"HTML"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:53:54.819Z',
          '2025-10-15T03:53:54.819Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '79263805-6cdd-471a-9c2c-c7552c0f5cba',
          'Explain the difference between <meta name=''viewport''> and CSS media queries.',
          'When and why are both needed for responsive design?',
          'multiple-choice',
          'advanced',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'meta viewport sets the initial scaling and width for mobile devices; media queries adjust layout/styles based on device size. Both together enable responsive design.',
          NULL,
          [],
          ARRAY['html','performance-&-layout','advanced']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"html-07-html100","original_type":"open-ended","topic":"Performance & Layout","subcategory":"","sample_answers":["meta viewport sets the initial scaling and width for mobile devices; media queries adjust layout/styles based on device size. Both together enable responsive design."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"HTML"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:53:54.819Z',
          '2025-10-15T03:53:54.819Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '0ae68dff-5e7c-47b8-8125-37191abe881d',
          'What''s the output of hoisting with var and let?',
          'What''s the output?

```javascript
function sayHi() {
  console.log(name);
  console.log(age);
  var name = ''Lydia'';
  let age = 21;
}
sayHi();
```',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"`Lydia` and `undefined`","isCorrect":false,"explanation":"`name` is hoisted but not yet assigned, so it''s `undefined`, not `''Lydia''`."},{"id":"b","text":"`Lydia` and `ReferenceError`","isCorrect":false,"explanation":"`name` is `undefined`, not `''Lydia''`."},{"id":"c","text":"`ReferenceError` and `21`","isCorrect":false,"explanation":"`name` is accessible (as `undefined`), but `age` throws `ReferenceError` before assignment."},{"id":"d","text":"`undefined` and `ReferenceError`","isCorrect":true,"explanation":"Correct: `var` is hoisted and initialized to `undefined`; `let` is in TDZ and throws `ReferenceError`."}]',
          NULL,
          'Within the function, the `name` variable declared with `var` is hoisted and initialized with `undefined`. The `age` variable declared with `let` is hoisted but not initialized, so accessing it before declaration throws a `ReferenceError` due to the temporal dead zone.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','javascript-core-concepts','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-1-25QA-js-q-001","original_type":"multiple-choice","topic":"JavaScript Core Concepts","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.140Z',
          '2025-10-15T03:11:52.147Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'c7c808a7-e934-47c6-a553-4ab3fef3fe67',
          'What''s the output of setTimeout with var vs let in loops?',
          'What''s the output?

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1);
}
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1);
}
```',
          'multiple-choice',
          'advanced',
          10,
          '[{"id":"a","text":"`0 1 2` and `0 1 2`","isCorrect":false,"explanation":""},{"id":"b","text":"`0 1 2` and `3 3 3`","isCorrect":false,"explanation":""},{"id":"c","text":"`3 3 3` and `0 1 2`","isCorrect":true,"explanation":""}]',
          NULL,
          'With `var`, `i` is function-scoped and shared across all callbacks, so all log `3`. With `let`, each iteration has a new block-scoped `i`, so callbacks log `0`, `1`, `2`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','javascript-core-concepts','advanced']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-1-25QA-js-q-002","original_type":"multiple-choice","topic":"JavaScript Core Concepts","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.147Z',
          '2025-10-15T03:11:52.147Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '68f1a62d-5ede-4275-ba47-523460cc25f3',
          'What''s the output of this method vs arrow function?',
          'What''s the output?

```javascript
const shape = {
  radius: 10,
  diameter() {
    return this.radius * 2;
  },
  perimeter: () => 2 * Math.PI * this.radius,
};
console.log(shape.diameter());
console.log(shape.perimeter());
```',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"`20` and `62.83185307179586`","isCorrect":false,"explanation":""},{"id":"b","text":"`20` and `NaN`","isCorrect":true,"explanation":""},{"id":"c","text":"`20` and `63`","isCorrect":false,"explanation":""},{"id":"d","text":"`NaN` and `63`","isCorrect":false,"explanation":""}]',
          NULL,
          'Regular methods have dynamic `this` (bound to `shape`), but arrow functions inherit `this` from the surrounding scope (e.g., `window`), where `radius` is `undefined`, leading to `NaN`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','javascript-core-concepts','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-1-25QA-js-q-003","original_type":"multiple-choice","topic":"JavaScript Core Concepts","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.147Z',
          '2025-10-15T03:11:52.147Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '0af7da11-a853-4b4f-9834-56a40e5f4caf',
          'What''s the output of +true and !''Lydia''?',
          'What''s the output?

```javascript
+true;
!''Lydia'';
```',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"`1` and `false`","isCorrect":true,"explanation":""},{"id":"b","text":"`false` and `NaN`","isCorrect":false,"explanation":""},{"id":"c","text":"`false` and `false`","isCorrect":false,"explanation":""}]',
          NULL,
          'The unary `+` converts `true` to `1`. The string `''Lydia''` is truthy, so `!''Lydia''` is `false`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','javascript-core-concepts','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-1-25QA-js-q-004","original_type":"multiple-choice","topic":"JavaScript Core Concepts","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.147Z',
          '2025-10-15T03:11:52.147Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'fe85094a-66cb-4b30-9cc3-257ffd75c674',
          'Which object property access is valid?',
          'Which one is true?

```javascript
const bird = {
  size: ''small'',
};
const mouse = {
  name: ''Mickey'',
  small: true,
};
```',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"`mouse.bird.size` is not valid","isCorrect":true,"explanation":""},{"id":"b","text":"`mouse[bird.size]` is not valid","isCorrect":false,"explanation":""},{"id":"c","text":"`mouse[bird[\"size\"]]` is not valid","isCorrect":false,"explanation":""},{"id":"d","text":"All of them are valid","isCorrect":false,"explanation":""}]',
          NULL,
          '`mouse.bird.size` fails because `mouse.bird` is `undefined`. Bracket notation like `mouse[bird.size]` evaluates to `mouse[''small'']`, which is valid.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','javascript-core-concepts','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-1-25QA-js-q-005","original_type":"multiple-choice","topic":"JavaScript Core Concepts","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.147Z',
          '2025-10-15T03:11:52.147Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '485cad4f-8cfa-4404-8fb6-0274afe40579',
          'What''s the output when assigning object references?',
          'What''s the output?

```javascript
let c = { greeting: ''Hey!'' };
let d;
d = c;
c.greeting = ''Hello'';
console.log(d.greeting);
```',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"`Hello`","isCorrect":true,"explanation":""},{"id":"b","text":"`Hey!`","isCorrect":false,"explanation":""},{"id":"c","text":"`undefined`","isCorrect":false,"explanation":""},{"id":"d","text":"`ReferenceError`","isCorrect":false,"explanation":""},{"id":"e","text":"`TypeError`","isCorrect":false,"explanation":""}]',
          NULL,
          'Objects are assigned by reference. Modifying `c.greeting` affects `d` because both point to the same object.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','javascript-core-concepts','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-1-25QA-js-q-006","original_type":"multiple-choice","topic":"JavaScript Core Concepts","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.147Z',
          '2025-10-15T03:11:52.147Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'ba8d0e78-a478-4018-bdab-ee93864c049c',
          'What''s the output of == vs === with Number()?',
          'What''s the output?

```javascript
let a = 3;
let b = new Number(3);
let c = 3;
console.log(a == b);
console.log(a === b);
console.log(b === c);
```',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"`true` `false` `true`","isCorrect":false,"explanation":""},{"id":"b","text":"`false` `false` `true`","isCorrect":false,"explanation":""},{"id":"c","text":"`true` `false` `false`","isCorrect":true,"explanation":""},{"id":"d","text":"`false` `true` `true`","isCorrect":false,"explanation":""}]',
          NULL,
          '`==` compares values (3 == 3 → true). `===` compares type and value; `new Number(3)` is an object, not a primitive number, so `===` returns false.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','javascript-core-concepts','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-1-25QA-js-q-007","original_type":"multiple-choice","topic":"JavaScript Core Concepts","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.147Z',
          '2025-10-15T03:11:52.147Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '92aafe07-4050-4d2e-aac4-fea159de5a66',
          'What''s the output of calling a static method on instance?',
          'What''s the output?

```javascript
class Chameleon {
  static colorChange(newColor) {
    this.newColor = newColor;
    return this.newColor;
  }
  constructor({ newColor = ''green'' } = {}) {
    this.newColor = newColor;
  }
}
const freddie = new Chameleon({ newColor: ''purple'' });
console.log(freddie.colorChange(''orange''));
```',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"`orange`","isCorrect":false,"explanation":""},{"id":"b","text":"`purple`","isCorrect":false,"explanation":""},{"id":"c","text":"`green`","isCorrect":false,"explanation":""},{"id":"d","text":"`TypeError`","isCorrect":true,"explanation":""}]',
          NULL,
          'Static methods belong to the class, not instances. Calling `freddie.colorChange()` throws a `TypeError`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','javascript-core-concepts','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-1-25QA-js-q-008","original_type":"multiple-choice","topic":"JavaScript Core Concepts","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.147Z',
          '2025-10-15T03:11:52.147Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'a8989cd4-42ab-4be9-9f66-5ea1acf30de3',
          'What happens with a typo creating a global variable?',
          'What''s the output?

```javascript
let greeting;
greetign = {}; // Typo!
console.log(greetign);
```',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"`{}`","isCorrect":true,"explanation":""},{"id":"b","text":"`ReferenceError: greetign is not defined`","isCorrect":false,"explanation":""},{"id":"c","text":"`undefined`","isCorrect":false,"explanation":""}]',
          NULL,
          'In non-strict mode, assigning to an undeclared variable creates a global property. The typo creates `greetign` on the global object.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','javascript-core-concepts','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-1-25QA-js-q-009","original_type":"multiple-choice","topic":"JavaScript Core Concepts","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.147Z',
          '2025-10-15T03:11:52.147Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '3e04b38f-b20a-47d9-82d8-c59c3b038539',
          'Can you add properties to a function?',
          'What happens when we do this?

```javascript
function bark() {
  console.log(''Woof!'');
}
bark.animal = ''dog'';
```',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"Nothing, this is totally fine!","isCorrect":true,"explanation":""},{"id":"b","text":"`SyntaxError`. You cannot add properties to a function this way.","isCorrect":false,"explanation":""},{"id":"c","text":"`\"Woof\"` gets logged.","isCorrect":false,"explanation":""},{"id":"d","text":"`ReferenceError`","isCorrect":false,"explanation":""}]',
          NULL,
          'Functions are objects in JavaScript, so you can add properties to them. This is valid and causes no error.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','javascript-core-concepts','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-1-25QA-js-q-010","original_type":"multiple-choice","topic":"JavaScript Core Concepts","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.147Z',
          '2025-10-15T03:11:52.147Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '8819846a-1323-4912-84e3-c47ddf1dbfe2',
          'Why does calling method on instance throw TypeError?',
          'What''s the output?

```javascript
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}
const member = new Person(''Lydia'', ''Hallie'');
Person.getFullName = function() {
  return `${this.firstName} ${this.lastName}`;
};
console.log(member.getFullName());
```',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"`TypeError`","isCorrect":true,"explanation":""},{"id":"b","text":"`SyntaxError`","isCorrect":false,"explanation":""},{"id":"c","text":"`Lydia Hallie`","isCorrect":false,"explanation":""},{"id":"d","text":"`undefined` `undefined`","isCorrect":false,"explanation":""}]',
          NULL,
          '`getFullName` is added to the constructor function, not the prototype, so instances don’t inherit it. Calling it on `member` throws `TypeError`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','javascript-core-concepts','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-1-25QA-js-q-011","original_type":"multiple-choice","topic":"JavaScript Core Concepts","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.147Z',
          '2025-10-15T03:11:52.147Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '5b1151ea-7b2b-4d96-8a82-4915dc5aa22c',
          'What''s the output when forgetting ''new'' with constructor?',
          'What''s the output?

```javascript
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}
const lydia = new Person(''Lydia'', ''Hallie'');
const sarah = Person(''Sarah'', ''Smith'');
console.log(lydia);
console.log(sarah);
```',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"`Person {firstName: \"Lydia\", lastName: \"Hallie\"}` and `undefined`","isCorrect":true,"explanation":""},{"id":"b","text":"`Person {firstName: \"Lydia\", lastName: \"Hallie\"}` and `Person {firstName: \"Sarah\", lastName: \"Smith\"}`","isCorrect":false,"explanation":""},{"id":"c","text":"`Person {firstName: \"Lydia\", lastName: \"Hallie\"}` and `{}`","isCorrect":false,"explanation":""},{"id":"d","text":"`Person {firstName: \"Lydia\", lastName: \"Hallie\"}` and `ReferenceError`","isCorrect":false,"explanation":""}]',
          NULL,
          'Without `new`, `this` refers to the global object. `sarah` is `undefined` because the function doesn’t return anything.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','javascript-core-concepts','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-1-25QA-js-q-012","original_type":"multiple-choice","topic":"JavaScript Core Concepts","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.147Z',
          '2025-10-15T03:11:52.147Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '72194339-7308-45bf-87c4-f0c46e079137',
          'What are the three phases of event propagation?',
          'What are the three phases of event propagation?',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"Target > Capturing > Bubbling","isCorrect":false,"explanation":""},{"id":"b","text":"Bubbling > Target > Capturing","isCorrect":false,"explanation":""},{"id":"c","text":"Target > Bubbling > Capturing","isCorrect":false,"explanation":""},{"id":"d","text":"Capturing > Target > Bubbling","isCorrect":true,"explanation":""}]',
          NULL,
          'Event propagation: Capturing (top-down), Target (event target), Bubbling (bottom-up).',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','javascript-core-concepts','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-1-25QA-js-q-013","original_type":"multiple-choice","topic":"JavaScript Core Concepts","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.147Z',
          '2025-10-15T03:11:52.147Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'ad1d2e69-b6aa-4f56-87bb-5d24568d5ea8',
          'Do all objects have prototypes?',
          'All object have prototypes.',
          'true-false',
          'intermediate',
          10,
          '[{"id":"true","text":"True","isCorrect":false},{"id":"false","text":"False","isCorrect":true}]',
          'false',
          'The base object (e.g., created via `Object.create(null)`) has no prototype. Most objects inherit from `Object.prototype`, but not all.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','javascript-core-concepts','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-1-25QA-js-q-014","original_type":"true-false","topic":"JavaScript Core Concepts","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.147Z',
          '2025-10-15T03:11:52.147Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '264b2c72-8279-4a1e-8652-b2895ef58885',
          'What''s the output of adding number and string?',
          'What''s the output?

```javascript
function sum(a, b) {
  return a + b;
}
sum(1, ''2'');
```',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"`NaN`","isCorrect":false,"explanation":""},{"id":"b","text":"`TypeError`","isCorrect":false,"explanation":""},{"id":"c","text":"`\"12\"`","isCorrect":true,"explanation":""},{"id":"d","text":"`3`","isCorrect":false,"explanation":""}]',
          NULL,
          'JavaScript coerces the number `1` to a string and concatenates: `''1'' + ''2''` → `''12''`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','javascript-core-concepts','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-1-25QA-js-q-015","original_type":"multiple-choice","topic":"JavaScript Core Concepts","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.147Z',
          '2025-10-15T03:11:52.147Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'c5d7ccfc-d8e4-43ab-a9a3-3c56396f9002',
          'What''s the output of postfix and prefix increment?',
          'What''s the output?

```javascript
let number = 0;
console.log(number++);
console.log(++number);
console.log(number);
```',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"`1` `1` `2`","isCorrect":false,"explanation":""},{"id":"b","text":"`1` `2` `2`","isCorrect":false,"explanation":""},{"id":"c","text":"`0` `2` `2`","isCorrect":true,"explanation":""},{"id":"d","text":"`0` `1` `2`","isCorrect":false,"explanation":""}]',
          NULL,
          '`number++` returns `0` then increments to `1`. `++number` increments to `2` then returns `2`. Final value is `2`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','javascript-core-concepts','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-1-25QA-js-q-016","original_type":"multiple-choice","topic":"JavaScript Core Concepts","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.147Z',
          '2025-10-15T03:11:52.147Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '3fbcff5e-ba17-4c71-acaf-9c24d2d04dad',
          'What''s the output of tagged template literals?',
          'What''s the output?

```javascript
function getPersonInfo(one, two, three) {
  console.log(one);
  console.log(two);
  console.log(three);
}
const person = ''Lydia'';
const age = 21;
getPersonInfo`${person} is ${age} years old`;
```',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"`\"Lydia\"` `21` `[\"\", \" is \", \" years old\"]`","isCorrect":false,"explanation":""},{"id":"b","text":"`[\"\", \" is \", \" years old\"]` `\"Lydia\"` `21`","isCorrect":true,"explanation":""},{"id":"c","text":"`\"Lydia\"` `[\"\", \" is \", \" years old\"]` `21`","isCorrect":false,"explanation":""}]',
          NULL,
          'In tagged templates, the first argument is an array of string parts. Remaining arguments are expression values.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','javascript-core-concepts','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-1-25QA-js-q-017","original_type":"multiple-choice","topic":"JavaScript Core Concepts","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.147Z',
          '2025-10-15T03:11:52.147Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '30d4f98d-3377-4500-970e-6bd3e32e17d6',
          'What''s the output of comparing object literals?',
          'What''s the output?

```javascript
function checkAge(data) {
  if (data === { age: 18 }) {
    console.log(''You are an adult!'');
  } else if (data == { age: 18 }) {
    console.log(''You are still an adult.'');
  } else {
    console.log(`Hmm.. You don''t have an age I guess`);
  }
}
checkAge({ age: 18 });
```',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"`You are an adult!`","isCorrect":false,"explanation":""},{"id":"b","text":"`You are still an adult.`","isCorrect":false,"explanation":""},{"id":"c","text":"`Hmm.. You don''t have an age I guess`","isCorrect":true,"explanation":""}]',
          NULL,
          'Objects are compared by reference, not value. Two separate `{ age: 18 }` objects are not equal, even with `==`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','javascript-core-concepts','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-1-25QA-js-q-018","original_type":"multiple-choice","topic":"JavaScript Core Concepts","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.147Z',
          '2025-10-15T03:11:52.147Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '2b6dfe53-123d-4e10-ad70-8fc6e6d7263a',
          'What''s typeof of rest parameters?',
          'What''s the output?

```javascript
function getAge(...args) {
  console.log(typeof args);
}
getAge(21);
```',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"`\"number\"`","isCorrect":false,"explanation":""},{"id":"b","text":"`\"array\"`","isCorrect":false,"explanation":""},{"id":"c","text":"`\"object\"`","isCorrect":true,"explanation":""},{"id":"d","text":"`\"NaN\"`","isCorrect":false,"explanation":""}]',
          NULL,
          'Rest parameters collect arguments into an array. Arrays are objects, so `typeof` returns `''object''`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','javascript-core-concepts','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-1-25QA-js-q-019","original_type":"multiple-choice","topic":"JavaScript Core Concepts","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.147Z',
          '2025-10-15T03:11:52.147Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '5e7f2f04-f8e2-4f49-9ea0-b7250bef855f',
          'What''s the output with ''use strict'' and undeclared variable?',
          'What''s the output?

```javascript
function getAge() {
  ''use strict'';
  age = 21;
  console.log(age);
}
getAge();
```',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"`21`","isCorrect":false,"explanation":""},{"id":"b","text":"`undefined`","isCorrect":false,"explanation":""},{"id":"c","text":"`ReferenceError`","isCorrect":true,"explanation":""},{"id":"d","text":"`TypeError`","isCorrect":false,"explanation":""}]',
          NULL,
          'In strict mode, assigning to an undeclared variable throws a `ReferenceError`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','javascript-core-concepts','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-1-25QA-js-q-020","original_type":"multiple-choice","topic":"JavaScript Core Concepts","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.147Z',
          '2025-10-15T03:11:52.147Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'b4d2d61c-4693-4ad3-a388-3d0761dea084',
          'What''s the value of eval(''10*10+5'')?',
          'What''s the value of `sum`?

```javascript
const sum = eval(''10*10+5'');
```',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"`105`","isCorrect":true,"explanation":""},{"id":"b","text":"`\"105\"`","isCorrect":false,"explanation":""},{"id":"c","text":"`TypeError`","isCorrect":false,"explanation":""},{"id":"d","text":"`\"10*10+5\"`","isCorrect":false,"explanation":""}]',
          NULL,
          '`eval` evaluates the string as JavaScript code. `10*10+5` evaluates to the number `105`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','javascript-core-concepts','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-1-25QA-js-q-021","original_type":"multiple-choice","topic":"JavaScript Core Concepts","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.147Z',
          '2025-10-15T03:11:52.147Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '0428d28d-bb6e-40e7-8a88-9878221e148f',
          'How long is sessionStorage data accessible?',
          'How long is cool_secret accessible?

```javascript
sessionStorage.setItem(''cool_secret'', 123);
```',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"Forever, the data doesn''t get lost.","isCorrect":false,"explanation":""},{"id":"b","text":"When the user closes the tab.","isCorrect":true,"explanation":""},{"id":"c","text":"When the user closes the entire browser, not only the tab.","isCorrect":false,"explanation":""},{"id":"d","text":"When the user shuts off their computer.","isCorrect":false,"explanation":""}]',
          NULL,
          '`sessionStorage` data is cleared when the tab is closed.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','javascript-core-concepts','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-1-25QA-js-q-022","original_type":"multiple-choice","topic":"JavaScript Core Concepts","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.147Z',
          '2025-10-15T03:11:52.147Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '6feace90-1de7-462c-a330-78e72ed213a3',
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
          NULL,
          '`var` allows redeclaration. The last assigned value (`10`) is used.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','javascript-core-concepts','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-1-25QA-js-q-023","original_type":"multiple-choice","topic":"JavaScript Core Concepts","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.147Z',
          '2025-10-15T03:11:52.147Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '15bba790-e063-4150-8040-41aad43e0319',
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
          NULL,
          'Object keys are strings, so both `hasOwnProperty(''1'')` and `hasOwnProperty(1)` return `true`. `Set` uses strict equality, so `set.has(''1'')` is `false`, but `set.has(1)` is `true`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','javascript-core-concepts','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-1-25QA-js-q-024","original_type":"multiple-choice","topic":"JavaScript Core Concepts","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.147Z',
          '2025-10-15T03:11:52.147Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '3e2d0225-97f3-4dcc-a98a-783bedd1ca3c',
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
          NULL,
          'Duplicate keys are allowed; the last value wins. The key order remains as first occurrence.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','javascript-core-concepts','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-1-25QA-js-q-025","original_type":"multiple-choice","topic":"JavaScript Core Concepts","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.147Z',
          '2025-10-15T03:11:52.147Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '55d7030f-c718-4b12-820c-6654d2ab5674',
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
          NULL,
          'The `||` operator returns the first truthy value or the last value if all are falsy. `{}` is truthy → `one = {}`. All in `two` are falsy → `two = ''''`. `[]` is truthy → `three = []`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','advanced-javascript','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-101–125QA-js-q-101","original_type":"multiple-choice","topic":"Advanced JavaScript","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.149Z',
          '2025-10-15T03:11:52.149Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'c3944802-5ff9-4ea0-a25f-ca77f6264489',
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
          NULL,
          '`firstFunction`: `.then()` is non-blocking → logs `''second''` first, then resolved value. `secondFunction`: `await` pauses execution → logs resolved value first, then `''second''`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','advanced-javascript','advanced']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-101–125QA-js-q-102","original_type":"multiple-choice","topic":"Advanced JavaScript","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.149Z',
          '2025-10-15T03:11:52.149Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '9ced0ca7-c12a-4c5d-9194-2c0c7152f467',
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
          NULL,
          '`1 + 2 = 3` (number). `''Lydia'' + 2 = ''Lydia2''` (string concat). `{}` + 2 → `''[object Object]2''` (object → string).',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','advanced-javascript','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-101–125QA-js-q-103","original_type":"multiple-choice","topic":"Advanced JavaScript","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.149Z',
          '2025-10-15T03:11:52.149Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '5cba1f0c-1dad-48cb-9042-e43b5b46cdb8',
          'What''s the value of Promise.resolve(5)?',
          'What''s its value?

```javascript
Promise.resolve(5);
```',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"`5`","isCorrect":false,"explanation":""},{"id":"b","text":"`Promise {<pending>: 5}`","isCorrect":false,"explanation":""},{"id":"c","text":"`Promise {<fulfilled>: 5}`","isCorrect":true,"explanation":""},{"id":"d","text":"`Error`","isCorrect":false,"explanation":""}]',
          NULL,
          '`Promise.resolve(5)` returns a **fulfilled** promise with value `5`. It does not return the raw value or a pending promise.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','advanced-javascript','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-101–125QA-js-q-104","original_type":"multiple-choice","topic":"Advanced JavaScript","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.149Z',
          '2025-10-15T03:11:52.149Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'e9f0dd3a-f110-4ee3-9171-f3f8344633bd',
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
          NULL,
          '`person2` defaults to the same object reference as `person`. Since `person1` is also that object, strict equality returns `true`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','advanced-javascript','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-101–125QA-js-q-105","original_type":"multiple-choice","topic":"Advanced JavaScript","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.149Z',
          '2025-10-15T03:11:52.149Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '9ce094cd-bc71-4105-8f5a-c5a4b33c054a',
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
          NULL,
          '`colorConfig.colors` tries to access a property named `colors`, which doesn’t exist → `undefined`. Then `undefined[1]` throws `TypeError`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','advanced-javascript','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-101–125QA-js-q-106","original_type":"multiple-choice","topic":"Advanced JavaScript","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.149Z',
          '2025-10-15T03:11:52.149Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '6c7db0e9-8ea3-483a-aa40-d6cd662621cd',
          'Are two identical heart emojis strictly equal?',
          'What''s its value?

```javascript
console.log(''❤️'' === ''❤️'');
```',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"`true`","isCorrect":true,"explanation":""},{"id":"b","text":"`false`","isCorrect":false,"explanation":""}]',
          NULL,
          'Identical emoji strings have the same Unicode representation, so strict equality returns `true`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','advanced-javascript','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-101–125QA-js-q-107","original_type":"multiple-choice","topic":"Advanced JavaScript","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.149Z',
          '2025-10-15T03:11:52.149Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '75401e2f-3d1c-49bb-88dd-8fecc39e7a6a',
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
          NULL,
          'Only `splice` modifies the original array. `map`, `filter`, `slice` return new arrays. `find` returns an element. `reduce` returns an accumulated value.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','advanced-javascript','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-101–125QA-js-q-108","original_type":"multiple-choice","topic":"Advanced JavaScript","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.149Z',
          '2025-10-15T03:11:52.149Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '8e4926b9-e2ff-45b2-aae2-787c04eeda91',
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
          NULL,
          '`food[0]` is a string (primitive). Assigning it to `info.favoriteFood` copies the value. Reassigning `info.favoriteFood` doesn’t affect the `food` array.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','advanced-javascript','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-101–125QA-js-q-109","original_type":"multiple-choice","topic":"Advanced JavaScript","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.149Z',
          '2025-10-15T03:11:52.149Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '8cad531d-f349-466d-af73-1083986453e5',
          'What does JSON.parse() do?',
          'What does this method do?

```javascript
JSON.parse();
```',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"Parses JSON to a JavaScript value","isCorrect":true,"explanation":""},{"id":"b","text":"Parses a JavaScript object to JSON","isCorrect":false,"explanation":""},{"id":"c","text":"Parses any JavaScript value to JSON","isCorrect":false,"explanation":""},{"id":"d","text":"Parses JSON to a JavaScript object only","isCorrect":false,"explanation":""}]',
          NULL,
          '`JSON.parse()` converts a JSON string into a JavaScript value (object, array, number, etc.).',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','advanced-javascript','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-101–125QA-js-q-110","original_type":"multiple-choice","topic":"Advanced JavaScript","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.149Z',
          '2025-10-15T03:11:52.149Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'e7b32655-aa2f-4b9c-8eef-17d454e8960e',
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
          NULL,
          'The `name` inside `getName` is block-scoped and hoisted but not initialized. Accessing it before declaration throws `ReferenceError` due to TDZ.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','advanced-javascript','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-101–125QA-js-q-111","original_type":"multiple-choice","topic":"Advanced JavaScript","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.149Z',
          '2025-10-15T03:11:52.149Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '3809758a-26ef-4872-955e-4fe550a3889d',
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
          NULL,
          '`yield` returns the entire array. `yield*` delegates to the iterable and yields each element individually, so first value is `''a''`.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','advanced-javascript','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-101–125QA-js-q-112","original_type":"multiple-choice","topic":"Advanced JavaScript","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.149Z',
          '2025-10-15T03:11:52.149Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '60785163-4ee5-4e3c-8dbf-3bc740c7c827',
          'What''s the output of IIFE in template literal?',
          'What''s the output?

```javascript
console.log(`${(x => x)(''I love'')} to program`);
```',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"`I love to program`","isCorrect":true,"explanation":""},{"id":"b","text":"`undefined to program`","isCorrect":false,"explanation":""},{"id":"c","text":"`${(x => x)(''I love'') to program`","isCorrect":false,"explanation":""},{"id":"d","text":"`TypeError`","isCorrect":false,"explanation":""}]',
          NULL,
          'The IIFE `(x => x)(''I love'')` returns `''I love''`, which is interpolated into the string.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','advanced-javascript','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-101–125QA-js-q-113","original_type":"multiple-choice","topic":"Advanced JavaScript","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.149Z',
          '2025-10-15T03:11:52.149Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '49bd2e99-5085-46b5-a25f-3f8da6788f9c',
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
          NULL,
          'The `setInterval` callback holds a reference to the `config` object via closure, preventing garbage collection. The interval continues to run.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','advanced-javascript','advanced']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-101–125QA-js-q-114","original_type":"multiple-choice","topic":"Advanced JavaScript","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.149Z',
          '2025-10-15T03:11:52.149Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'f57ad72f-6663-4367-aa32-744b5a1d17fb',
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
          NULL,
          'Map keys are compared by reference. Only the exact same function reference (`myFunc`) retrieves the value. A new function (`() => ''greeting''`) is a different object.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','advanced-javascript','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-101–125QA-js-q-115","original_type":"multiple-choice","topic":"Advanced JavaScript","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.149Z',
          '2025-10-15T03:11:52.149Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'a4f826a9-9df4-430b-b67c-13b521742d1d',
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
          NULL,
          '`changeAge(person)` mutates the original `person` object (age becomes 22). `changeAgeAndName()` uses a new object, so `person` remains unchanged except for the first call.',
          NULL,
          ARRAY[]::text[],
          ARRAY['javascript','advanced-javascript','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"javascript-101–125QA-js-q-116","original_type":"multiple-choice","topic":"Advanced JavaScript","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"JavaScript"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T03:11:52.149Z',
          '2025-10-15T03:11:52.149Z'
        );;