INSERT INTO questions (
    id, title, content, type, difficulty, points, options, correct_answer, 
    explanation, test_cases, hints, tags, metadata, stats, category_id, 
    learning_card_id, is_active, created_at, updated_at, topic_id, time_limit
  ) VALUES (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>function</code> sayHi() {
  <code>console</code>.log(name);
  <code>console</code>.log(age);
  <code>var</code> name = ''Lydia'';
  <code>let</code> age = 21;
}

sayHi();</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"Lydia and <code>undefined</code>","isCorrect":false,"explanation":"Incorrect. letlet variables are not accessible before declaration."},{"id":"o2","text":"Lydia and <code>ReferenceError</code>","isCorrect":false,"explanation":"Incorrect. varvar is hoisted with <code>undefined</code>."},{"id":"o3","text":"<code>ReferenceError</code> and 21","isCorrect":false,"explanation":"Incorrect. varvar is hoisted, letlet throws <code>ReferenceError</code>."},{"id":"o4","text":"<code>undefined</code> and <code>ReferenceError</code>","isCorrect":true,"explanation":"Correct. varvar is hoisted with undefinede>ined, letlet throws <code>ReferenceError</code> <code>in</code> temporal dead zone."}]',
      '<code>undefined</code> and <code>ReferenceError</code>',
      'Within the <code>function</code>, we first declare the name variable with the <code>var</code> keyword. <code>This</code> means that the variable gets hoisted (memory space is <code>set</code> up during the creation phase) with the <code>default</code> value <code>of</code> <code>undefined</code>, until we actually get to the line where we define the variable. We haven''t defined the variable yet on the line where we <code>try</code> to log the name variable, so it still holds the value <code>of</code> <code>undefined</code>. Variables with the <code>let</code> keyword (and <code>const</code>) are hoisted, but unlike <code>var</code>, don''t get initialized. They are not accessible before the line we declare (initialize) them. <code>This</code> is called the "temporal dead zone". When we <code>try</code> to access the variables before they are declared, JavaScript throws a <code>ReferenceError</code>.',
      NULL,
      ARRAY['Consider JavaScript execution context and hoisting', 'Think about scope and variable declarations', 'Remember ES6+ features vs ES5 behavior'],
      ARRAY['javascript', 'basics', 'hoisting', 'var', 'let', 'temporal-dead-zone', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.289Z',
      '2025-11-18T18:46:59.289Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>for</code> (<code>var</code> i = 0; i < 3; i++) {
  <code>setTimeout</code>(() => <code>console</code>.log(i), 1);
}

<code>for</code> (<code>let</code> i = 0; i < 3; i++) {
  <code>setTimeout</code>(() => <code>console</code>.log(i), 1);
}</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"0 1 2 and <0 1 2","isCorrect":false,"explanation":"Incorrect. varvar creates closure issues with <code>async</code> callbacks."},{"id":"o2","text":"0 1 2 and <3 3 3","isCorrect":false,"explanation":"Incorrect. letlet creates block scope <code>for</code> each iteration."},{"id":"o3","text":"3 3 3 and <0 1 2","isCorrect":true,"explanation":"Correct. varvar is <code>function</code>-scoped (all callbacks see final value), letlet is block-scoped (each iteration has its own value)."}]',
      '3 3 3 and <0 1 2',
      'Because <code>of</code> the event queue <code>in</code> JavaScript, the <code>setTimeout</code> callback <code>function</code> is called after the loop has been executed. Since the variable i <code>in</code> the first loop was declared using the <code>var</code> keyword, <code>this</code> value was <code>global</code>. During the loop, we incremented the value <code>of</code> i by 1 each time, using the unary operator ++. By the time the <code>setTimeout</code> callback <code>function</code> was invoked, i was equal to 3 <code>in</code> the first example. <code>In</code> the second loop, the variable i was declared using the <code>let</code> keyword: variables declared with the <code>let</code> (and <code>const</code>) keyword are block-scoped (a block is anything between { }). During each iteration, i will have a <code>new</code> value, and each value is scoped inside the loop.',
      NULL,
      ARRAY['Consider JavaScript execution context and hoisting', 'Think about scope and variable declarations', 'Remember ES6+ features vs ES5 behavior'],
      ARRAY['javascript', 'basics', 'var', 'let', 'closures', 'event-loop', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.289Z',
      '2025-11-18T18:46:59.289Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>const</code> shape = {
  radius: 10,
  diameter() {
    <code>return</code> <code>this</code>.radius * 2;
  },
  perimeter: () => 2 * <code>Math</code>.PI * <code>this</code>.radius,
};

<code>console</code>.log(shape.diameter());
<code>console</code>.log(shape.perimeter());</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"20 and <62.83185307179586","isCorrect":false,"explanation":"Incorrect. Arrow functions don''t bind thisthis to the <code>object</code>."},{"id":"o2","text":"20 and <code>NaN</code>","isCorrect":true,"explanation":"Correct. Regular <code>function</code> binds thisthis to shape, arrow <code>function</code> doesn''t (<code>this</code>.radius is <code>undefined</code>)."},{"id":"o3","text":"20 and <63","isCorrect":false,"explanation":"Incorrect. Arrow <code>function</code> doesn''t have access to shape''s radius."},{"id":"o4","text":"<code>NaN</code> and <63","isCorrect":false,"explanation":"Incorrect. Regular <code>function</code> works correctly."}]',
      '20 and <code>NaN</code>',
      'Note that the value <code>of</code> diameter is a regular <code>function</code>, whereas the value <code>of</code> perimeter is an arrow <code>function</code>. With arrow functions, the <code>this</code> keyword refers to its current surrounding scope, unlike regular functions! <code>This</code> means that when we call perimeter, it doesn''t refer to the shape <code>object</code>, but to its surrounding scope (<code>window</code> <code>for</code> example). Since there is no value radius <code>in</code> the scope <code>of</code> the arrow <code>function</code>, <code>this</code>.radius returns <code>undefined</code> which, when multiplied by 2 * <code>Math</code>.PI, results <code>in</code> <code>NaN</code>.',
      NULL,
      ARRAY['Consider JavaScript execution context and hoisting', 'Think about scope and variable declarations', 'Remember ES6+ features vs ES5 behavior'],
      ARRAY['javascript', 'basics', 'this', 'arrow-functions', 'methods', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.289Z',
      '2025-11-18T18:46:59.289Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>function</code> sayHi() {
  consoleonsole.loge>.log(name);
  consoleonsole.loge>.log(age);
  <code>var</code> name = ''Lydia'';
  <code>let</code> age = 21;
}

sayHi();</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"Lydia and <code>undefined</code>","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"Lydia and <code>ReferenceError</code>","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"<code>ReferenceError</code> and 21","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"<code>undefined</code> and <code>ReferenceError</code>","isCorrect":true,"explanation":"Correct."}]',
      '<code>undefined</code> and <code>ReferenceError</code>',
      'Within the <code>function</code>, we first declare the name variable with the varvar keyword. <code>This</code> means that the variable gets hoisted (memory space is <code>set</code> up during the creation phase) with the <code>default</code> value <code>of</code> <code>undefined</code>, until we actually get to the line where we define the variable. We haven''t defined the variable yet on the line where we <code>try</code> to log the name variable, so it still holds the value <code>of</code> <code>undefined</code>.

Variables with the letlet keyword (and constconst) are hoisted, but unlike varvar, don''t get <i>initialized</i>. They are not accessible before the line we declare (initialize) them. <code>This</code> is called the "temporal dead zone". When we <code>try</code> to access the variables before they are declared, JavaScript throws a <code>ReferenceError</code>.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'basics', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.289Z',
      '2025-11-18T18:46:59.289Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>for</code> (<code>var</code> i = 0; i < 3; i++) {
  <code>setTimeout</code>(() => consoleonsole.loge>.log(i), 1);
}

<code>for</code> (<code>let</code> i = 0; i < 3; i++) {
  <code>setTimeout</code>(() => consoleonsole.loge>.log(i), 1);
}</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"0 1 2 and 0 1 2","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"0 1 2 and 3 3 3","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"3 3 3 and 0 1 2","isCorrect":true,"explanation":"Correct."}]',
      '3 3 3 and 0 1 2',
      'Because <code>of</code> the event queue <code>in</code> JavaScript, the setTimeoutmeout callback <code>function</code> is called _after_ the loop has been executed. Since the variable i <code>in</code> the first loop was declared using the varvar keyword, <code>this</code> value was <code>global</code>. During the loop, we incremented the value <code>of</code> i by 1 each time, using the unary operator ++. By the time the setTimeoutmeout callback <code>function</code> was invoked, i was equal to 3 <code>in</code> the first example.

<code>In</code> the second loop, the variable i was declared using the letlet keyword: variables declared with the letlet (and constconst) keyword are block-scoped (a block is anything between { }). During each iteration, i will have a <code>new</code> value, and each value is scoped inside the loop.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'data-structures', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.289Z',
      '2025-11-18T18:46:59.289Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>const</code> shape = {
  radius: 10,
  diameter() {
    <code>return</code> <code>this</code>.radius * 2;
  },
  perimeter: () => 2 * <code>Math</code>.PI * <code>this</code>.radius,
};

consoleonsole.loge>.log(shape.diameterameter());
consoleonsole.loge>.log(shape.perimeterimeter());</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"20 and 62.83185307179586","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"20 and NaNe><code>NaN</code>","isCorrect":true,"explanation":"Correct."},{"id":"o3","text":"20 and 63","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"NaNe><code>NaN</code> and 63","isCorrect":false,"explanation":"Incorrect."}]',
      '20 and NaNe><code>NaN</code>',
      'Note that the value <code>of</code> diameter is a regular <code>function</code>, whereas the value <code>of</code> perimeter is an arrow <code>function</code>.

With arrow functions, the thisthis keyword refers to its current surrounding scope, unlike regular functions! <code>This</code> means that when we call perimeter, it doesn''t refer to the shape <code>object</code>, but to its surrounding scope (windowindow <code>for</code> example).

Since there is no value radius <code>in</code> the scope <code>of</code> the arrow <code>function</code>, <code>this</code>.radius.radius returns undefinede>ined which, when multiplied by 2 * <code>Math</code>.PIe>.PI, results <code>in</code> NaNe><code>NaN</code>.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'this-binding', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.289Z',
      '2025-11-18T18:46:59.289Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '+<code>true</code>;
!''Lydia'';',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"1 and falsefalse","isCorrect":true,"explanation":"Correct."},{"id":"o2","text":"falsefalse and NaNe><code>NaN</code>","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"falsefalse and falsefalse","isCorrect":false,"explanation":"Incorrect."}]',
      '1 and falsefalse',
      'The unary plus tries to convert an operand to a <code>number</code>. truetrue is 1, and falsefalse is 0.

The <code>string</code> ''Lydia'' is a truthy value. What we''re actually asking, is "Is <code>this</code> truthy value falsy?". <code>This</code> returns falsefalse.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'basics', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.289Z',
      '2025-11-18T18:46:59.289Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'Which one is <code>true</code>?',
      '<pre><code><code>const</code> bird = {
  size: ''small'',
};

<code>const</code> mouse = {
  name: ''Mickey'',
  small: <code>true</code>,
};</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"mouse.bird.size.size is not valid","isCorrect":true,"explanation":"Correct."},{"id":"o2","text":"mouse[bird.size]size] is not valid","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"mouse[bird[\\"size\\"]] is not valid","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"All <code>of</code> them are valid","isCorrect":false,"explanation":"Incorrect."}]',
      'mouse.bird.size.size is not valid',
      '<code>In</code> JavaScript, all <code>object</code> keys are strings (unless it''s a <code>Symbol</code>). Even though we might not _type_ them <code>as</code> strings, they are always converted into strings under the hood.

JavaScript interprets (or unboxes) statements. When we use bracket notation, it sees the first opening bracket [ and keeps going until it finds the closing bracket ]. Only then, it will evaluate the statement.

mouse[bird.size]size]: First it evaluates bird.size.size, which is "small". mouse["small"] returns truetrue

However, with dot notation, <code>this</code> doesn''t happen. mouse does not have a key called bird, which means that mouse.bird.bird is <code>undefined</code>. Then, we ask <code>for</code> the size using dot notation: mouse.bird.size.size. Since mouse.bird.bird is <code>undefined</code>, we''re actually asking <code>undefined</code>.size.size. <code>This</code> isn''t valid, and will <code>throw</code> an <code>error</code> similar to Cannot read property "size" <code>of</code> undefinede> <code>undefined</code>.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'basics', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.289Z',
      '2025-11-18T18:46:59.289Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>let</code> c = { greeting: ''Hey!'' };
<code>let</code> d;

d = c;
c.greeting = ''Hello'';
consoleonsole.loge>.log(d.greeting);

- A: Hello
- B: Hey!
- C: <code>undefined</code>
- D: <code>ReferenceError</code>
- E: <code>TypeError</code>

<details><summary><b>Answer</b></summary>
<p>

#### Answer: A

<code>In</code> JavaScript, all objects interact by _reference_ when setting them equal to each other.

First, variable c holds a value to an <code>object</code>. Later, we assign d with the same reference that c has to the <code>object</code>.

<img src="https://i.imgur.com/ko5k0fs.png" width="200">

When you change one <code>object</code>, you change all <code>of</code> them.

</p>
</details>

---

###### 7. What''s the output?

<code>let</code> a = 3;
<code>let</code> b = <code>new</code> <code>Number</code>(3);
<code>let</code> c = 3;

consoleonsole.loge>.log(a == b);
consoleonsole.loge>.log(a === b);
consoleonsole.loge>.log(b === c);</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"truetrue falsefalse truetrue","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"falsefalse falsefalse truetrue","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"truetrue falsefalse falsefalse","isCorrect":true,"explanation":"Correct."},{"id":"o4","text":"falsefalse truetrue truetrue","isCorrect":false,"explanation":"Incorrect."}]',
      'truetrue falsefalse falsefalse',
      '<code>In</code> JavaScript, all objects interact by _reference_ when setting them equal to each other.

First, variable c holds a value to an <code>object</code>. Later, we assign d with the same reference that c has to the <code>object</code>.

<img src="https://i.imgur.com/ko5k0fs.png" width="200">

When you change one <code>object</code>, you change all <code>of</code> them.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'data-structures', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.289Z',
      '2025-11-18T18:46:59.289Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>class</code> Chameleon {
  static colorChange(newColor) {
    <code>this</code>.newColorwColor = newColor;
    <code>return</code> <code>this</code>.newColorwColor;
  }

  constructor({ newColor = ''green'' } = {}) {
    <code>this</code>.newColorwColor = newColor;
  }
}

<code>const</code> freddie = <code>new</code> Chameleon({ newColor: ''purple'' });
consoleonsole.loge>.log(freddie.colorChange(''orange''));</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"orange","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"purple","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"green","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"<code>TypeError</code>","isCorrect":true,"explanation":"Correct."}]',
      '<code>TypeError</code>',
      'The colorChange <code>function</code> is static. Static methods are designed to live only on the constructor <code>in</code> which they are created, and cannot be passed down to any children or called upon <code>class</code> instances. Since freddie is an instance <code>of</code> <code>class</code> Chameleon, the <code>function</code> cannot be called upon it. A <code>TypeError</code> is thrown.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'classes', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.289Z',
      '2025-11-18T18:46:59.289Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>let</code> greeting;
greetign = {}; // Typo!
consoleonsole.loge>.log(greetign);</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"{}","isCorrect":true,"explanation":"Correct."},{"id":"o2","text":"<code>ReferenceError</code>: greetign is not defined","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"<code>undefined</code>","isCorrect":false,"explanation":"Incorrect."}]',
      '{}',
      'It logs the <code>object</code>, because we just created an empty <code>object</code> on the <code>global</code> <code>object</code>! When we mistyped greetinge>ing <code>as</code> greetign, the JS interpreter actually saw <code>this</code> <code>as</code>:

1. <code>global</code>.greetign = {}ode>.greetign = {} <code>in</code> Node.js
2. <code>window</code>.greetign = {}ndow.greetign = {}, frames.greetign = {} = {} and self.greetignetign <code>in</code> browsers.
3. self.greetignetign <code>in</code> web workers.
4. globalThis.greetignThis.greetign <code>in</code> all environments.

<code>In</code> order to avoid <code>this</code>, we can use "use strict". <code>This</code> makes sure that you have declared a variable before setting it equal to anything.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'basics', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.289Z',
      '2025-11-18T18:46:59.289Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What happens when we <code>do</code> <code>this</code>?',
      '<pre><code><code>function</code> bark() {
  consoleonsole.loge>.log(''Woof!'');
}

bark.animal = ''dog'';</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"Nothing, <code>this</code> is totally fine!","isCorrect":true,"explanation":"Correct."},{"id":"o2","text":"<code>SyntaxError</code>. You cannot add properties to a <code>function</code> <code>this</code> way.","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"\\"Woof\\" gets logged.","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"<code>ReferenceError</code>","isCorrect":false,"explanation":"Incorrect."}]',
      'Nothing, <code>this</code> is totally fine!',
      '<code>This</code> is possible <code>in</code> JavaScript, because functions are objects! (Everything besides primitive types are objects)

A <code>function</code> is a special type <code>of</code> <code>object</code>. The code you write yourself isn''t the actual <code>function</code>. The <code>function</code> is an <code>object</code> with properties. <code>This</code> property is invocable.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'basics', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.289Z',
      '2025-11-18T18:46:59.289Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>function</code> Person(firstName, lastName) {
  <code>this</code>.firstName = firstName;
  <code>this</code>.lastName = lastName;
}

<code>const</code> member = <code>new</code> Person(''Lydia'', ''Hallie'');
Person.getFullName = functionnction() {
  <code>return</code> ${<code>this</code>.firstName} ${<code>this</code>.lastName}} ${<code>this</code>.lastName};
};

consoleonsole.loge>.log(member.getFullNamellName());</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"<code>TypeError</code>","isCorrect":true,"explanation":"Correct."},{"id":"o2","text":"<code>SyntaxError</code>","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"Lydia Hallie","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"<code>undefined</code> <code>undefined</code>","isCorrect":false,"explanation":"Incorrect."}]',
      '<code>TypeError</code>',
      '<code>In</code> JavaScript, functions are objects, and therefore, the method getFullName gets added to the constructor <code>function</code> <code>object</code> itself. <code>For</code> that reason, we can call Person.getFullName()amellName(), but member.getFullNamelName throws a <code>TypeError</code>. 

<code>If</code> you want a method to be available to all <code>object</code> instances, you have to add it to the prototype property:

js
Person.prototype.getFullName = functionnction() {
  <code>return</code> ${<code>this</code>.firstName} ${<code>this</code>.lastName}} ${<code>this</code>.lastName};
};',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'this-binding', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.289Z',
      '2025-11-18T18:46:59.289Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>function</code> Person(firstName, lastName) {
  <code>this</code>.firstName = firstName;
  <code>this</code>.lastName = lastName;
}

<code>const</code> lydia = <code>new</code> Person(''Lydia'', ''Hallie'');
<code>const</code> sarah = Person(''Sarah'', ''Smith'');

consoleonsole.loge>.log(lydia);
consoleonsole.loge>.log(sarah);</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"Person {firstName: \\"Lydia\\", lastName: \\"Hallie\\"} and <code>undefined</code>","isCorrect":true,"explanation":"Correct."},{"id":"o2","text":"Person {firstName: \\"Lydia\\", lastName: \\"Hallie\\"} and Person {firstName: \\"Sarah\\", lastName: \\"Smith\\"}","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"Person {firstName: \\"Lydia\\", lastName: \\"Hallie\\"} and {}","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"Person {firstName: \\"Lydia\\", lastName: \\"Hallie\\"} and <code>ReferenceError</code>","isCorrect":false,"explanation":"Incorrect."}]',
      'Person {firstName: "Lydia", lastName: "Hallie"} and <code>undefined</code>',
      '<code>For</code> sarah, we didn''t use the newe><code>new</code> keyword. When using newe><code>new</code>, thisthis refers to the <code>new</code> empty <code>object</code> we create. However, <code>if</code> you don''t add newe><code>new</code>, thisthis refers to the **<code>global</code> <code>object</code>**!

We said that <code>this</code>.firstNamee>.firstName equals "Sarah" and <code>this</code>.lastNamede>.lastName equals "Smith". What we actually did, is defining <code>global</code>.firstName = ''Sarah''irstName = ''Sarah'' and <code>global</code>.lastName = ''Smith''lastName = ''Smith''. sarah itself is left <code>undefined</code>, since we don''t <code>return</code> a value <code>from</code> the Person <code>function</code>.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'this-binding', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.289Z',
      '2025-11-18T18:46:59.289Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>function</code> sum(a, b) {
  <code>return</code> a + b;
}

sum(1, ''2'');</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"NaNe><code>NaN</code>","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"<code>TypeError</code>","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"\\"12\\"","isCorrect":true,"explanation":"Correct."},{"id":"o4","text":"3","isCorrect":false,"explanation":"Incorrect."}]',
      '"12"',
      'JavaScript is a **dynamically typed language**: we don''t specify what types certain variables are. Values can automatically be converted into another type without you knowing, which is called _implicit type coercion_. **Coercion** is converting <code>from</code> one type into another.

<code>In</code> <code>this</code> example, JavaScript converts the <code>number</code> 1 into a stringde>ing, <code>in</code> order <code>for</code> the <code>function</code> to make sense and <code>return</code> a value. During the addition <code>of</code> a numeric type (1) and a stringde>ing type (''2''), the <code>number</code> is treated <code>as</code> a stringde>ing. We can concatenate stringde>ings like "Hello" + "World", so what''s happening here is "1" + "2" which returns "12".',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'basics', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.289Z',
      '2025-11-18T18:46:59.289Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>let</code> <code>number</code> = 0;
consoleonsole.loge>.log(<code>number</code>++);
consoleonsole.loge>.log(++<code>number</code>);
consoleonsole.loge>.log(<code>number</code>);</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"1 1 2","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"1 2 2","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"0 2 2","isCorrect":true,"explanation":"Correct."},{"id":"o4","text":"0 1 2","isCorrect":false,"explanation":"Incorrect."}]',
      '0 2 2',
      'The **postfix** unary operator ++:

1. Returns the value (<code>this</code> returns 0)
2. Increments the value (<code>number</code> is now 1)

The **prefix** unary operator ++:

1. Increments the value (<code>number</code> is now 2)
2. Returns the value (<code>this</code> returns 2)

<code>This</code> returns 0 2 2.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'basics', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.290Z',
      '2025-11-18T18:46:59.290Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>function</code> getPersonInfo(one, two, three) {
  consoleonsole.loge>.log(one);
  consoleonsole.loge>.log(two);
  consoleonsole.loge>.log(three);
}

<code>const</code> person = ''Lydia'';
<code>const</code> age = 21;

getPersonInfo${person} is ${age} years old;</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"\\"Lydia\\" 21 [\\"\\", \\" is \\", \\" years old\\"]","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"[\\"\\", \\" is \\", \\" years old\\"] \\"Lydia\\" 21","isCorrect":true,"explanation":"Correct."},{"id":"o3","text":"\\"Lydia\\" [\\"\\", \\" is \\", \\" years old\\"] 21","isCorrect":false,"explanation":"Incorrect."}]',
      '["", " is ", " years old"] "Lydia" 21',
      '<code>If</code> you use tagged template literals, the value <code>of</code> the first argument is always an <code>array</code> <code>of</code> the <code>string</code> values. The remaining arguments get the values <code>of</code> the passed expressions!',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'basics', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.290Z',
      '2025-11-18T18:46:59.290Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>function</code> checkAge(data) {
  <code>if</code> (data === { age: 18 }) {
    consoleonsole.loge>.log(''You are an adult!'');
  } <code>else</code> <code>if</code> (data == { age: 18 }) {
    consoleonsole.loge>.log(''You are still an adult.'');
  } <code>else</code> {
    consoleonsole.loge>.log(Hmm.. You don''t have an age I guess);
  }
}

checkAge({ age: 18 });</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"You are an adult!","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"You are still an adult.","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"Hmm.. You don''t have an age I guess","isCorrect":true,"explanation":"Correct."}]',
      'Hmm.. You don''t have an age I guess',
      'When testing equality, primitives are compared by their _value_, <code>while</code> objects are compared by their _reference_. JavaScript checks <code>if</code> the objects have a reference to the same location <code>in</code> memory.

The two objects that we are comparing don''t have that: the <code>object</code> we passed <code>as</code> a parameter refers to a different location <code>in</code> memory than the <code>object</code> we used <code>in</code> order to check equality.

<code>This</code> is why both { age: 18 } === { age: 18 } and { age: 18 } == { age: 18 } <code>return</code> falsefalse.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'basics', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.290Z',
      '2025-11-18T18:46:59.290Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>function</code> getAge(...args) {
  consoleonsole.loge>.log(<code>typeof</code> args);
}

getAge(21);</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"\\"<code>number</code>\\"mber\\"","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"\\"<code>array</code>\\"rray\\"","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"\\"<code>object</code>\\"ject\\"","isCorrect":true,"explanation":"Correct."},{"id":"o4","text":"\\"<code>NaN</code>\\"<code>NaN</code>\\"","isCorrect":false,"explanation":"Incorrect."}]',
      '"<code>object</code>"ject"',
      'The rest parameter (...args.args) lets us "collect" all remaining arguments into an <code>array</code>. An <code>array</code> is an <code>object</code>, so <code>typeof</code> args args returns "<code>object</code>"ject"',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'es6+-features', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.290Z',
      '2025-11-18T18:46:59.290Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>function</code> getAge() {
  ''use strict'';
  age = 21;
  consoleonsole.loge>.log(age);
}

getAge();</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"21","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"<code>undefined</code>","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"<code>ReferenceError</code>","isCorrect":true,"explanation":"Correct."},{"id":"o4","text":"<code>TypeError</code>","isCorrect":false,"explanation":"Incorrect."}]',
      '<code>ReferenceError</code>',
      'With "use strict", you can make sure that you don''t accidentally declare <code>global</code> variables. We never declared the variable age, and since we use "use strict", it will <code>throw</code> a reference <code>error</code>. <code>If</code> we didn''t use "use strict", it would have worked, since the property age would have gotten added to the <code>global</code> <code>object</code>.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'basics', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.290Z',
      '2025-11-18T18:46:59.290Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the value <code>of</code> sum?',
      '<code>const</code> sum = eval(''10*10+5'');',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"105","isCorrect":true,"explanation":"Correct."},{"id":"o2","text":"\\"105\\"","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"<code>TypeError</code>","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"\\"10*10+5\\"","isCorrect":false,"explanation":"Incorrect."}]',
      '105',
      'eval evaluates code that''s passed <code>as</code> a stringde>ing. <code>If</code> it''s an expression, like <code>in</code> <code>this</code> casede>ase, it evaluates the expression. The expression is 10 * 10 + 5. <code>This</code> returns the <code>number</code> 105.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'basics', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.290Z',
      '2025-11-18T18:46:59.290Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'How long is cool_secret accessible?',
      'sessionStorage.setItem(''cool_secret'', 123);',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"Forever, the data doesn''t get lost.","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"When the user closes the tab.","isCorrect":true,"explanation":"Correct."},{"id":"o3","text":"When the user closes the entire browser, not only the tab.","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"When the user shuts off their computer.","isCorrect":false,"explanation":"Incorrect."}]',
      'When the user closes the tab.',
      'The data stored <code>in</code> sessionStorage is removed after closing the _tab_.

<code>If</code> you used localStorage, the data would''ve been there forever, unless <code>for</code> example localStorage.clear()earclear() is invoked.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'data-structures', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.290Z',
      '2025-11-18T18:46:59.290Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>var</code> num = 8;
<code>var</code> num = 10;

consoleonsole.loge>.log(num);</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"8","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"10","isCorrect":true,"explanation":"Correct."},{"id":"o3","text":"<code>SyntaxError</code>","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"<code>ReferenceError</code>","isCorrect":false,"explanation":"Incorrect."}]',
      '10',
      'With the varvar keyword, you can declare multiple variables with the same name. The variable will then hold the latest value.

You cannot <code>do</code> <code>this</code> with letlet or constconst since they''re block-scoped and therefore can''t be redeclared.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'basics', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.290Z',
      '2025-11-18T18:46:59.290Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>const</code> obj = { 1: ''a'', 2: ''b'', 3: ''c'' };
<code>const</code> <code>set</code> = <code>new</code> <code>Set</code>([1, 2, 3, 4, 5]);

obj.hase>.hasOwnProperty(''1'');
obj.hase>.hasOwnProperty(1);
<code>set</code>.has(''1'');
<code>set</code>.has(1);</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"falsefalse truetrue falsefalse truetrue","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"falsefalse truetrue truetrue truetrue","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"truetrue truetrue falsefalse truetrue","isCorrect":true,"explanation":"Correct."},{"id":"o4","text":"truetrue truetrue truetrue truetrue","isCorrect":false,"explanation":"Incorrect."}]',
      'truetrue truetrue falsefalse truetrue',
      'All <code>object</code> keys (excluding Symbols) are stringde>ings under the hood, even <code>if</code> you don''t type it yourself <code>as</code> a stringde>ing. <code>This</code> is why obj.hasOwnProperty(''1'')asOwnPropertye>OwnProperty(''1'') also returns <code>true</code>.

It doesn''t work that way <code>for</code> a <code>set</code>. There is no ''1'' <code>in</code> our <code>set</code>: <code>set</code>.has(''1'')de>.hasode><code>as</code>(''1'') returns falsefalse. It has the numeric type 1, <code>set</code>.has(1).hasode><code>as</code>(1) returns truetrue.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'data-structures', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.290Z',
      '2025-11-18T18:46:59.290Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>const</code> obj = { a: ''one'', b: ''two'', a: ''three'' };
consoleonsole.loge>.log(obj);</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"{ a: \\"one\\", b: \\"two\\" }","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"{ b: \\"two\\", a: \\"three\\" }","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"{ a: \\"three\\", b: \\"two\\" }","isCorrect":true,"explanation":"Correct."},{"id":"o4","text":"<code>SyntaxError</code>","isCorrect":false,"explanation":"Incorrect."}]',
      '{ a: "three", b: "two" }',
      '<code>If</code> you have two keys with the same name, the key will be replaced. It will still be <code>in</code> its first position, but with the last specified value.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'basics', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.290Z',
      '2025-11-18T18:46:59.290Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>for</code> (<code>let</code> i = 1; i < 5; i++) {
  <code>if</code> (i === 3) <code>continue</code>;
  consoleonsole.loge>.log(i);
}</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"1 2","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"1 2 3","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"1 2 4","isCorrect":true,"explanation":"Correct."},{"id":"o4","text":"1 3 4","isCorrect":false,"explanation":"Incorrect."}]',
      '1 2 4',
      'The continuetinue statement skips an iteration <code>if</code> a certain condition returns truetrue.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'basics', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.290Z',
      '2025-11-18T18:46:59.290Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>String</code>.prototype.giveLydiaPizza = () => {
  <code>return</code> ''Just give Lydia pizza already!'';
};

<code>const</code> name = ''Lydia'';

consoleonsole.loge>.log(name.giveLydiaPizzaaPizza())</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"\\"Just give Lydia pizza already!\\"","isCorrect":true,"explanation":"Correct."},{"id":"o2","text":"<code>TypeError</code>: not a functionction","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"<code>SyntaxError</code>","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"<code>undefined</code>","isCorrect":false,"explanation":"Incorrect."}]',
      '"Just give Lydia pizza already!"',
      'Stringtringde>ing is a built-<code>in</code> constructor, that we can add properties to. I just added a method to its prototype. Primitive stringde>ings are automatically converted into a stringde>ing <code>object</code>, generated by the stringde>ing prototype <code>function</code>. So, all stringde>ings (stringde>ing objects) have access to that method!',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'prototypes', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.290Z',
      '2025-11-18T18:46:59.290Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>const</code> a = {};
<code>const</code> b = { key: ''b'' };
<code>const</code> c = { key: ''c'' };

a[b] = 123;
a[c] = 456;

consoleonsole.loge>.log(a[b]);</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"123","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"456","isCorrect":true,"explanation":"Correct."},{"id":"o3","text":"<code>undefined</code>","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"<code>ReferenceError</code>","isCorrect":false,"explanation":"Incorrect."}]',
      '456',
      '<code>Object</code> keys are automatically converted into strings. We are trying to <code>set</code> an <code>object</code> <code>as</code> a key to <code>object</code> a, with the value <code>of</code> 123.

However, when we stringify an <code>object</code>, it becomes "[<code>object</code> <code>Object</code>]"de> <code>Object</code>]". So what we are saying here, is that a["[<code>object</code> <code>Object</code>]"] = 123de><code>Object</code>]"] = 123. Then, we can <code>try</code> to <code>do</code> the same again. c is another <code>object</code> that we are implicitly stringifying. So then, a["[<code>object</code> <code>Object</code>]"] = 456de><code>Object</code>]"] = 456.

Then, we log a[b], which is actually a["[<code>object</code> <code>Object</code>]"]e> <code>Object</code>]"]. We just <code>set</code> that to 456, so it returns 456.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'basics', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.290Z',
      '2025-11-18T18:46:59.290Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>const</code> foo = () => consoleonsole.loge>.log(''First'');
<code>const</code> bar = () => <code>setTimeout</code>(() => consoleonsole.loge>.log(''Second''));
<code>const</code> baz = () => consoleonsole.loge>.log(''Third'');

bar();
foo();
baz();</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"First Second Third","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"First Third Second","isCorrect":true,"explanation":"Correct."},{"id":"o3","text":"Second First Third","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"Second Third First","isCorrect":false,"explanation":"Incorrect."}]',
      'First Third Second',
      'We have a setTimeoutmeout <code>function</code> and invoked it first. Yet, it was logged last.

<code>This</code> is because <code>in</code> browsers, we don''t just have the runtime engine, we also have something called a WebAPI. The WebAPI gives us the setTimeoutmeout <code>function</code> to start with, and <code>for</code> example the DOM.

After the _callback_ is pushed to the WebAPI, the setTimeoutmeout <code>function</code> itself (but not the callback!) is popped off the stack.

<img src="https://i.imgur.com/X5wsHOg.png" width="200">

Now, foo gets invoked, and "First" is being logged.

<img src="https://i.imgur.com/Pvc0dGq.png" width="200">

foo is popped off the stack, and baz gets invoked. "Third" gets logged.

<img src="https://i.imgur.com/WhA2bCP.png" width="200">

The WebAPI can''t just add stuff to the stack whenever it''s ready. Instead, it pushes the callback <code>function</code> to something called the _queue_.

<img src="https://i.imgur.com/NSnDZmU.png" width="200">

<code>This</code> is where an event loop starts to work. An **event loop** looks at the stack and task queue. <code>If</code> the stack is empty, it takes the first thing on the queue and pushes it onto the stack.

<img src="https://i.imgur.com/uyiScAI.png" width="200">

bar gets invoked, "Second" gets logged, and it''s popped off the stack.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'data-structures', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.290Z',
      '2025-11-18T18:46:59.290Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>const</code> person = { name: ''Lydia'' };

<code>function</code> sayHi(age) {
  <code>return</code> ${<code>this</code>.name} is ${age}e>.name} is ${age};
}

consoleonsole.loge>.log(sayHi.call(person, 21));
consoleonsole.loge>.log(sayHi.bind(person, 21));</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"<code>undefined</code> is 21/ is 21 Lydia is 21","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"functionction functionction","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"Lydia is 21 Lydia is 21","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"Lydia is 21 functionction","isCorrect":true,"explanation":"Correct."}]',
      'Lydia is 21 functionction',
      'With both, we can pass the <code>object</code> to which we want the thisthis keyword to refer to. However, .call.call is also _executed immediately_!

.bind.bind. returns a _copy_ <code>of</code> the <code>function</code>, but with a bound context! It is not executed immediately.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'this-binding', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.290Z',
      '2025-11-18T18:46:59.290Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>function</code> sayHi() {
  <code>return</code> (() => 0)();
}

consoleonsole.loge>.log(<code>typeof</code> sayHi());</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"\\"<code>object</code>\\"ject\\"","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"\\"<code>number</code>\\"mber\\"","isCorrect":true,"explanation":"Correct."},{"id":"o3","text":"\\"<code>function</code>\\"tion\\"","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"\\"<code>undefined</code>\\"ined\\"","isCorrect":false,"explanation":"Incorrect."}]',
      '"<code>number</code>"mber"',
      'The sayHi <code>function</code> returns the returned value <code>of</code> the immediately invoked <code>function</code> expression (IIFE). <code>This</code> <code>function</code> returned 0, which is type "<code>number</code>"mber".
	
FYI: typeofypeofode><code>of</code> can <code>return</code> the following list <code>of</code> values: <code>undefined</code>, booleanolean, numberumber, bigint, stringtring, symbolymbol, functionction and objectbject. Note that <code>typeof</code> nullode><code>of</code> <code>null</code> returns "<code>object</code>"ject".',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'basics', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.290Z',
      '2025-11-18T18:46:59.290Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'Which <code>of</code> these values are falsy?',
      '0;
<code>new</code> <code>Number</code>(0);
('''');
('' '');
<code>new</code> <code>Boolean</code>(<code>false</code>);
<code>undefined</code>;',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"0, '''', <code>undefined</code>","isCorrect":true,"explanation":"Correct."},{"id":"o2","text":"0, <code>new</code> <code>Number</code>(0)e> <code>Number</code>(0), '''', <code>new</code> <code>Boolean</code>(<code>false</code>)ode><code>Boolean</code>(<code>false</code>), <code>undefined</code>","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"0, '''', <code>new</code> <code>Boolean</code>(<code>false</code>)ode><code>Boolean</code>(<code>false</code>), <code>undefined</code>","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"All <code>of</code> them are falsy","isCorrect":false,"explanation":"Incorrect."}]',
      '0, '''', <code>undefined</code>',
      'There are 8 falsy values:

- <code>undefined</code>
- nullnull
- NaNe><code>NaN</code>
- falsefalse
- '''' (empty <code>string</code>)
- 0
- -0
- 0n (BigInt(0))

<code>Function</code> constructors, like <code>new</code> <code>Number</code> <code>Number</code> and <code>new</code> Booleanode> <code>Boolean</code> are truthy.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'basics', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.290Z',
      '2025-11-18T18:46:59.290Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      'consoleonsole.loge>.log(<code>typeof</code> <code>typeof</code> 1);',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"\\"<code>number</code>\\"mber\\"","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"\\"<code>string</code>\\"ring\\"","isCorrect":true,"explanation":"Correct."},{"id":"o3","text":"\\"<code>object</code>\\"ject\\"","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"\\"<code>undefined</code>\\"ined\\"","isCorrect":false,"explanation":"Incorrect."}]',
      '"<code>string</code>"ring"',
      '<code>typeof</code> 1eof 1 returns "<code>number</code>"mber".
<code>typeof</code> "<code>number</code>"de> "<code>number</code>" returns "<code>string</code>"ring"',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'basics', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.290Z',
      '2025-11-18T18:46:59.290Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>const</code> numbers = [1, 2, 3];
numbers[10] = 11;
consoleonsole.loge>.log(numbers);</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"[1, 2, 3, <code>null</code> x 7, 11]de> x 7, 11]","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"[1, 2, 3, 11]","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"[1, 2, 3, empty x 7, 11]","isCorrect":true,"explanation":"Correct."},{"id":"o4","text":"<code>SyntaxError</code>","isCorrect":false,"explanation":"Incorrect."}]',
      '[1, 2, 3, empty x 7, 11]',
      'When you <code>set</code> a value to an element <code>in</code> an <code>array</code> that exceeds the length <code>of</code> the <code>array</code>, JavaScript creates something called "empty slots". These actually have the value <code>of</code> undefinede>ined, but you will see something like:

[1, 2, 3, empty x 7, 11]

depending on where you run it (it''s different <code>for</code> every browser, node, etc.)',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'basics', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.290Z',
      '2025-11-18T18:46:59.290Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code>(() => {
  <code>let</code> x, y;
  <code>try</code> {
    <code>throw</code> <code>new</code> ErrorError();
  } <code>catch</code> (x) {
    (x = 1), (y = 2);
    consoleonsole.loge>.log(x);
  }
  consoleonsole.loge>.log(x);
  consoleonsole.loge>.log(y);
})();</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"1 <code>undefined</code> 2","isCorrect":true,"explanation":"Correct."},{"id":"o2","text":"<code>undefined</code> <code>undefined</code> <code>undefined</code>","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"1 1 2","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"1 <code>undefined</code> <code>undefined</code>","isCorrect":false,"explanation":"Incorrect."}]',
      '1 <code>undefined</code> 2',
      'The catchcatch block receives the argument x. <code>This</code> is not the same x <code>as</code> the variable when we pass arguments. <code>This</code> variable x is block-scoped.

Later, we <code>set</code> <code>this</code> block-scoped variable equal to 1, and <code>set</code> the value <code>of</code> the variable y. Now, we log the block-scoped variable x, which is equal to 1.

Outside <code>of</code> the catchcatch block, x is still <code>undefined</code>, and y is 2. When we want to <code>console</code>.log(x)onsole.loge>.log(x) outside <code>of</code> the catchcatch block, it returns <code>undefined</code>, and y returns 2.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'basics', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.290Z',
      '2025-11-18T18:46:59.290Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '[[0, 1], [2, 3]].reduce(
  (acc, cur) => {
    <code>return</code> acc.concat(cur);
  },
  [1, 2],
);',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"[0, 1, 2, 3, 1, 2]","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"[6, 1, 2]","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"[1, 2, 0, 1, 2, 3]","isCorrect":true,"explanation":"Correct."},{"id":"o4","text":"[1, 2, 6]","isCorrect":false,"explanation":"Incorrect."}]',
      '[1, 2, 0, 1, 2, 3]',
      '[1, 2] is our initial value. <code>This</code> is the value we start with, and the value <code>of</code> the very first acc. During the first round, acc is [1,2], and cur is [0, 1]. We concatenate them, which results <code>in</code> [1, 2, 0, 1].

Then, [1, 2, 0, 1] is acc and [2, 3] is cur. We concatenate them, and get [1, 2, 0, 1, 2, 3]',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'basics', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.290Z',
      '2025-11-18T18:46:59.290Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '!!<code>null</code>;
!!'''';
!!1;',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"falsefalse truetrue falsefalse","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"falsefalse falsefalse truetrue","isCorrect":true,"explanation":"Correct."},{"id":"o3","text":"falsefalse truetrue truetrue","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"truetrue truetrue falsefalse","isCorrect":false,"explanation":"Incorrect."}]',
      'falsefalse falsefalse truetrue',
      'nullnull is falsy. !nullnull returns truetrue. !truetrue returns falsefalse.

"" is falsy. !"" returns truetrue. !truetrue returns falsefalse.

1 is truthy. !1 returns falsefalse. !falsefalse returns truetrue.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'basics', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.290Z',
      '2025-11-18T18:46:59.290Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What does the setIntervalerval method <code>return</code> <code>in</code> the browser?',
      '<code>setInterval</code>(() => consoleonsole.loge>.log(''Hi''), 1000);',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"a unique id","isCorrect":true,"explanation":"Correct."},{"id":"o2","text":"the amount <code>of</code> milliseconds specified","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"the passed <code>function</code>","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"<code>undefined</code>","isCorrect":false,"explanation":"Incorrect."}]',
      'a unique id',
      'It returns a unique id. <code>This</code> id can be used to clear that interval with the <code>clearInterval</code>()valterval() <code>function</code>.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'data-structures', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.290Z',
      '2025-11-18T18:46:59.290Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What does <code>this</code> <code>return</code>?',
      '[...''Lydia''];',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"[\\"L\\", \\"y\\", \\"d\\", \\"i\\", \\"a\\"]","isCorrect":true,"explanation":"Correct."},{"id":"o2","text":"[\\"Lydia\\"]","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"[[], \\"Lydia\\"]","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"[[\\"L\\", \\"y\\", \\"d\\", \\"i\\", \\"a\\"]]","isCorrect":false,"explanation":"Incorrect."}]',
      '["L", "y", "d", "i", "a"]',
      'A <code>string</code> is an iterable. The spread operator maps every character <code>of</code> an iterable to one element.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'es6+-features', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.290Z',
      '2025-11-18T18:46:59.290Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>function</code>* generator(i) {
  <code>yield</code> i;
  <code>yield</code> i * 2;
}

<code>const</code> gen = generator(10);

consoleonsole.loge>.log(gen.nexte>next().value);
consoleonsole.loge>.log(gen.nexte>next().value);</code></pre>',
      'multiple-choice',
      'advanced',
      20,
      '[{"id":"o1","text":"[0, 10], [10, 20]","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"20, 20","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"10, 20","isCorrect":true,"explanation":"Correct."},{"id":"o4","text":"0, 10 and 10, 20","isCorrect":false,"explanation":"Incorrect."}]',
      '10, 20',
      'Regular functions cannot be stopped mid-way after invocation. However, a generator <code>function</code> can be "stopped" midway, and later continuee>inue <code>from</code> where it stopped. Every time a generator <code>function</code> encounters a yieldyield keyword, the <code>function</code> yields the value specified after it. Note that the generator <code>function</code> <code>in</code> that <code>case</code> doesn’t _return_ the value, it _yields_ the value.

First, we initialize the generator <code>function</code> with i equal to 10. We invoke the generator <code>function</code> using the next()ext() method. The first time we invoke the generator <code>function</code>, i is equal to 10. It encounters the first yieldyield keyword: it yields the value <code>of</code> i. The generator is now "paused", and 10 gets logged.

Then, we invoke the <code>function</code> again with the next()ext() method. It starts to continuee>inue where it stopped previously, still with i equal to 10. Now, it encounters the next yieldyield keyword, and yields i * 2. i is equal to 10, so it returns 10 * 2, which is 20. <code>This</code> results <code>in</code> 10, 20.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'generators', 'difficult'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.290Z',
      '2025-11-18T18:46:59.290Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What does <code>this</code> <code>return</code>?',
      '<pre><code><code>const</code> firstPromise = <code>new</code> <code>Promise</code>((res, rej) => {
  <code>setTimeout</code>(res, 500, ''one'');
});

<code>const</code> secondPromise = <code>new</code> <code>Promise</code>((res, rej) => {
  <code>setTimeout</code>(res, 100, ''two'');
});

<code>Promise</code>.race([firstPromise, secondPromise]).then(res => consoleonsole.loge>.log(res));</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"\\"one\\"","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"\\"two\\"","isCorrect":true,"explanation":"Correct."},{"id":"o3","text":"\\"two\\" \\"one\\"","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"\\"one\\" \\"two\\"","isCorrect":false,"explanation":"Incorrect."}]',
      '"two"',
      'When we pass multiple promises to the <code>Promise</code>.race.race method, it resolves/rejects the _first_ <code>promise</code> that resolves/rejects. To the setTimeoutmeout method, we pass a timer: 500ms <code>for</code> the first <code>promise</code> (firstPromiseomise), and 100ms <code>for</code> the second <code>promise</code> (secondPromiseomise). <code>This</code> means that the secondPromiseomise resolves first with the value <code>of</code> ''two''. res now holds the value <code>of</code> ''two'', which gets logged.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'async/await', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.290Z',
      '2025-11-18T18:46:59.290Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>let</code> person = { name: ''Lydia'' };
<code>const</code> members = [person];
person = <code>null</code>;

consoleonsole.loge>.log(members);</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"nullnull","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"[<code>null</code>]<code>null</code>]","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"[{}]","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"[{ name: \\"Lydia\\" }]","isCorrect":true,"explanation":"Correct."}]',
      '[{ name: "Lydia" }]',
      'First, we declare a variable person with the value <code>of</code> an <code>object</code> that has a name property.

<img src="https://i.imgur.com/TML1MbS.png" width="200">

Then, we declare a variable called members. We <code>set</code> the first element <code>of</code> that <code>array</code> equal to the value <code>of</code> the person variable. Objects interact by _reference_ when setting them equal to each other. When you assign a reference <code>from</code> one variable to another, you make a _copy_ <code>of</code> that reference. (note that they don''t have the _same_ reference!)

<img src="https://i.imgur.com/FSG5K3F.png" width="300">

Then, we <code>set</code> the variable person equal to nullnull.

<img src="https://i.imgur.com/sYjcsMT.png" width="300">

We are only modifying the value <code>of</code> the person variable, and not the first element <code>in</code> the <code>array</code>, since that element has a different (copied) reference to the <code>object</code>. The first element <code>in</code> members still holds its reference to the original <code>object</code>. When we log the members <code>array</code>, the first element still holds the value <code>of</code> the <code>object</code>, which gets logged.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'basics', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.290Z',
      '2025-11-18T18:46:59.290Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>const</code> person = {
  name: ''Lydia'',
  age: 21,
};

<code>for</code> (<code>const</code> item <code>in</code> person) {
  consoleonsole.loge>.log(item);
}</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"{ name: \\"Lydia\\" }, { age: 21 }","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"\\"name\\", \\"age\\"","isCorrect":true,"explanation":"Correct."},{"id":"o3","text":"\\"Lydia\\", 21","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"[\\"name\\", \\"Lydia\\"], [\\"age\\", 21]","isCorrect":false,"explanation":"Incorrect."}]',
      '"name", "age"',
      'With a <code>for</code>-inor-<code>in</code> loop, we can iterate through <code>object</code> keys, <code>in</code> <code>this</code> <code>case</code> name and age. Under the hood, <code>object</code> keys are strings (<code>if</code> they''re not a <code>Symbol</code>). On every loop, we <code>set</code> the value <code>of</code> item equal to the current key it’s iterating over. First, item is equal to name, and gets logged. Then, item is equal to age, which gets logged.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'basics', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.290Z',
      '2025-11-18T18:46:59.290Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      'consoleonsole.loge>.log(3 + 4 + ''5'');',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"\\"345\\"","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"\\"75\\"","isCorrect":true,"explanation":"Correct."},{"id":"o3","text":"12","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"\\"12\\"","isCorrect":false,"explanation":"Incorrect."}]',
      '"75"',
      'Operator associativity is the order <code>in</code> which the compiler evaluates the expressions, either left-to-right or right-to-left. <code>This</code> only happens <code>if</code> all operators have the _same_ precedence. We only have one type <code>of</code> operator: +. <code>For</code> addition, the associativity is left-to-right.

3 + 4 gets evaluated first. <code>This</code> results <code>in</code> the <code>number</code> 7.

7 + ''5'' results <code>in</code> "75" because <code>of</code> coercion. JavaScript converts the <code>number</code> 7 into a stringde>ing, see question 15. We can concatenate two stringde>ings using the +operator. "7" + "5" results <code>in</code> "75".',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'basics', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.290Z',
      '2025-11-18T18:46:59.290Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the value <code>of</code> num?',
      '<code>const</code> num = parseInt(''7*6'', 10);',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"42","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"\\"42\\"","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"7","isCorrect":true,"explanation":"Correct."},{"id":"o4","text":"NaNe><code>NaN</code>","isCorrect":false,"explanation":"Incorrect."}]',
      '7',
      'Only the first <code>number</code> <code>in</code> the stringde>ing is returned. Based on the _radix_ (the second argument <code>in</code> order to specify what type <code>of</code> <code>number</code> we want to parse it to: base 10, hexadecimal, octal, binary, etc.), the parseInt checks whether the characters <code>in</code> the stringde>ing are valid. Once it encounters a character that isn''t a valid <code>number</code> <code>in</code> the radix, it stops parsing and ignores the following characters.

* is not a valid <code>number</code>. It only parses "7" into the decimal 7. num now holds the value <code>of</code> 7.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'basics', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.290Z',
      '2025-11-18T18:46:59.290Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '[1, 2, 3].mapde><code>map</code>(num => {
  <code>if</code> (<code>typeof</code> num === ''<code>number</code>'') <code>return</code>;
  <code>return</code> num * 2;
});',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"[]","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"[<code>null</code>, <code>null</code>, <code>null</code>] <code>null</code>, <code>null</code>]","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"[<code>undefined</code>, <code>undefined</code>, <code>undefined</code>]efined, <code>undefined</code>]","isCorrect":true,"explanation":"Correct."},{"id":"o4","text":"[ 3 x empty ]","isCorrect":false,"explanation":"Incorrect."}]',
      '[<code>undefined</code>, <code>undefined</code>, <code>undefined</code>]efined, <code>undefined</code>]',
      'When mapping over the <code>array</code>, the value <code>of</code> num is equal to the element it’s currently looping over. <code>In</code> <code>this</code> <code>case</code>, the elements are numbers, so the condition <code>of</code> the <code>if</code> statement <code>typeof</code> num === "<code>number</code>"f num === "<code>number</code>" returns truetrue. The <code>map</code> <code>function</code> creates a <code>new</code> <code>array</code> and inserts the values returned <code>from</code> the <code>function</code>.

However, we don’t <code>return</code> a value. When we don’t <code>return</code> a value <code>from</code> the <code>function</code>, the <code>function</code> returns undefinede>ined. <code>For</code> every element <code>in</code> the <code>array</code>, the <code>function</code> block gets called, so <code>for</code> each element we <code>return</code> undefinede>ined.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'data-structures', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.290Z',
      '2025-11-18T18:46:59.290Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>function</code> getInfo(member, year) {
  member.name = ''Lydia'';
  year = ''1998'';
}

<code>const</code> person = { name: ''Sarah'' };
<code>const</code> birthYear = ''1997'';

getInfo(person, birthYear);

consoleonsole.loge>.log(person, birthYear);</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"{ name: \\"Lydia\\" }, \\"1997\\"","isCorrect":true,"explanation":"Correct."},{"id":"o2","text":"{ name: \\"Sarah\\" }, \\"1998\\"","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"{ name: \\"Lydia\\" }, \\"1998\\"","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"{ name: \\"Sarah\\" }, \\"1997\\"","isCorrect":false,"explanation":"Incorrect."}]',
      '{ name: "Lydia" }, "1997"',
      'Arguments are passed by _value_, unless their value is an <code>object</code>, then they''re passed by _reference_. birthYear is passed by value, since it''s a <code>string</code>, not an <code>object</code>. When we pass arguments by value, a _copy_ <code>of</code> that value is created (see question 46).

The variable birthYear has a reference to the value "1997". The argument year also has a reference to the value "1997", but it''s not the same value <code>as</code> birthYear has a reference to. When we update the value <code>of</code> year by setting year equal to "1998", we are only updating the value <code>of</code> year. birthYear is still equal to "1997".

The value <code>of</code> person is an <code>object</code>. The argument member has a (copied) reference to the _same_ <code>object</code>. When we modify a property <code>of</code> the <code>object</code> member has a reference to, the value <code>of</code> person will also be modified, since they both have a reference to the same <code>object</code>. person''s name property is now equal to the value "Lydia"',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'basics', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.290Z',
      '2025-11-18T18:46:59.290Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>function</code> greeting() {
  <code>throw</code> ''Hello world!'';
}

<code>function</code> sayHi() {
  <code>try</code> {
    <code>const</code> data = greeting();
    consoleonsole.loge>.log(''It worked!'', data);
  } <code>catch</code> (e) {
    consoleonsole.loge>.log(''Oh no an <code>error</code>:'', e);
  }
}

sayHi();</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"It worked! Hello world!","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"Oh no an <code>error</code>: <code>undefined</code>: <code>undefined</code>","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"<code>SyntaxError</code>: can only <code>throw</code> <code>Error</code> objectshrow <code>Error</code> objects","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"Oh no an <code>error</code>: Hello world!Hello world!","isCorrect":true,"explanation":"Correct."}]',
      'Oh no an <code>error</code>: Hello world!Hello world!',
      'With the throwthrow statement, we can create custom errors. With <code>this</code> statement, you can <code>throw</code> exceptions. An exception can be a <b>stringde>ing</b>, a <b><code>number</code></b>, a <b><code>boolean</code></b> or an <b><code>object</code></b>. <code>In</code> <code>this</code> <code>case</code>, our exception is the stringde>ing ''Hello world!''.

With the catchcatch statement, we can specify what to <code>do</code> <code>if</code> an exception is thrown <code>in</code> the trye><code>try</code> block. An exception is thrown: the stringde>ing ''Hello world!''. e is now equal to that stringde>ing, which we log. <code>This</code> results <code>in</code> ''Oh an <code>error</code>: Hello world!''ello world!''.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'basics', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.290Z',
      '2025-11-18T18:46:59.290Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>function</code> Car() {
  <code>this</code>.make = ''Lamborghini'';
  <code>return</code> { make: ''Maserati'' };
}

<code>const</code> myCar = <code>new</code> Car();
consoleonsole.loge>.log(myCar.make);</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"\\"Lamborghini\\"","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"\\"Maserati\\"","isCorrect":true,"explanation":"Correct."},{"id":"o3","text":"<code>ReferenceError</code>","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"<code>TypeError</code>","isCorrect":false,"explanation":"Incorrect."}]',
      '"Maserati"',
      'When a constructor <code>function</code> is called with the newe><code>new</code> keyword, it creates an <code>object</code> and sets the thisthis keyword to refer to that <code>object</code>. By <code>default</code>, <code>if</code> the constructor <code>function</code> doesn''t explicitly <code>return</code> anything, it will <code>return</code> the newly created <code>object</code>.

<code>In</code> <code>this</code> <code>case</code>, the constructor <code>function</code> Car explicitly returns a <code>new</code> <code>object</code> with make <code>set</code> to "Maserati", which overrides the <code>default</code> behavior. Therefore, when <code>new</code> Car()/ Car() is called, the _returned_ <code>object</code> is assigned to myCar, resulting <code>in</code> the output being "Maserati" when myCar.make.make is accessed.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'this-binding', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.290Z',
      '2025-11-18T18:46:59.290Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code>(() => {
  <code>let</code> x = (y = 10);
})();

consoleonsole.loge>.log(<code>typeof</code> x);
consoleonsole.loge>.log(<code>typeof</code> y);</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"\\"<code>undefined</code>\\", \\"<code>number</code>\\"\\", \\"<code>number</code>\\"","isCorrect":true,"explanation":"Correct."},{"id":"o2","text":"\\"<code>number</code>\\", \\"<code>number</code>\\"\\", \\"<code>number</code>\\"","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"\\"<code>object</code>\\", \\"<code>number</code>\\"\\", \\"<code>number</code>\\"","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"\\"<code>number</code>\\", \\"<code>undefined</code>\\" \\"<code>undefined</code>\\"","isCorrect":false,"explanation":"Incorrect."}]',
      '"<code>undefined</code>", "<code>number</code>"", "<code>number</code>"',
      '<code>let</code> x = (y = 10); = (y = 10); is actually shorthand <code>for</code>:

y = 10;
<code>let</code> x = y;

When we <code>set</code> y equal to 10, we actually add a property y to the <code>global</code> <code>object</code> (windowindowindow <code>in</code> the browser, globallobal <code>in</code> Node). <code>In</code> a browser, <code>window</code>.ydowindow.y is now equal to 10.

Then, we declare a variable x with the value <code>of</code> y, which is 10. Variables declared with the letlet keyword are _block scoped_, they are only defined within the block they''re declared <code>in</code>; the immediately invoked <code>function</code> expression (IIFE) <code>in</code> <code>this</code> <code>case</code>. When we use the typeofypeofode><code>of</code> operator, the operand x is not defined: we are trying to access x outside <code>of</code> the block it''s declared <code>in</code>. <code>This</code> means that x is not defined. Values who haven''t been assigned a value or declared are <code>of</code> type "<code>undefined</code>"inede>ined". <code>console</code>.log(<code>typeof</code> x)sole.loge>.log(typeofode><code>of</code> x) returns "<code>undefined</code>"inede>ined".

However, we created a <code>global</code> variable y when setting y equal to 10. <code>This</code> value is accessible anywhere <code>in</code> our code. y is defined, and holds a value <code>of</code> type "<code>number</code>"mber". <code>console</code>.log(<code>typeof</code> y)sole.loge>.log(typeofode><code>of</code> y) returns "<code>number</code>"mber".',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'basics', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.290Z',
      '2025-11-18T18:46:59.290Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    );