INSERT INTO questions (
    id, title, content, type, difficulty, points, options, correct_answer, 
    explanation, test_cases, hints, tags, metadata, stats, category_id, 
    learning_card_id, is_active, created_at, updated_at, topic_id, time_limit
  ) VALUES (
      gen_random_uuid(),
      'What''s its value?',
      '<pre><code><code>const</code> colorConfig = {
  red: <code>true</code>,
  blue: <code>false</code>,
  green: <code>true</code>,
  black: <code>true</code>,
  yellow: <code>false</code>,
};

<code>const</code> colors = [''pink'', ''red'', ''blue''];

consoleonsole.loge>.log(colorConfig.colors[1]);</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"truetrue","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"falsefalse","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"<code>undefined</code>","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"<code>TypeError</code>","isCorrect":true,"explanation":"Correct."}]',
      '<code>TypeError</code>',
      '<code>In</code> JavaScript, we have two ways to access properties on an <code>object</code>: bracket notation, or dot notation. <code>In</code> <code>this</code> example, we use dot notation (colorConfig.colorsolors) instead <code>of</code> bracket notation (colorConfig["colors"]).

With dot notation, JavaScript tries to find the property on the <code>object</code> with that exact name. <code>In</code> <code>this</code> example, JavaScript tries to find a property called colors on the colorConfig <code>object</code>. There is no property called colors, so <code>this</code> returns <code>undefined</code>. Then, we <code>try</code> to access the value <code>of</code> the first element by using [1]. We cannot <code>do</code> <code>this</code> on a value that''s <code>undefined</code>, so it throws a <code>TypeError</code>: Cannot read property ''1'' <code>of</code> undefinede> <code>undefined</code>.

JavaScript interprets (or unboxes) statements. When we use bracket notation, it sees the first opening bracket [ and keeps going until it finds the closing bracket ]. Only then, it will evaluate the statement. <code>If</code> we would''ve used colorConfig[colors[1]], it would have returned the value <code>of</code> the red property on the colorConfig <code>object</code>.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'basics', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.291Z',
      '2025-11-18T18:46:59.291Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s its value?',
      '<pre><code>consoleonsole.loge>.log(''❤️'' === ''❤️'');

- A: truetrue
- B: falsefalse

<details><summary><b>Answer</b></summary>
<p>

#### Answer: A

Under the hood, emojis are unicodes. The unicodes <code>for</code> the heart emoji is "U+2764 U+FE0F". These are always the same <code>for</code> the same emojis, so we''re comparing two equal strings to each other, which returns <code>true</code>.

</p>
</details>

---

###### 108. Which <code>of</code> these methods modifies the original <code>array</code>?

<code>const</code> emojis = [''✨'', ''🥑'', ''😍''];

emojis.mapde><code>map</code>(x => x + ''✨'');
emojis.filter(x => x !== ''🥑'');
emojis.find(x => x !== ''🥑'');
emojis.reduce((acc, cur) => acc + ''✨'');
emojis.slice(1, 2, ''✨'');
emojis.splice(1, 2, ''✨'');</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"All <code>of</code> them them","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"mape><code>map</code> reduce slice splice","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"mape><code>map</code> slice splice","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"splice","isCorrect":true,"explanation":"Correct."}]',
      'splice',
      'Under the hood, emojis are unicodes. The unicodes <code>for</code> the heart emoji is "U+2764 U+FE0F". These are always the same <code>for</code> the same emojis, so we''re comparing two equal strings to each other, which returns <code>true</code>.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'data-structures', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.291Z',
      '2025-11-18T18:46:59.291Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>const</code> food = [''🍕'', ''🍫'', ''🥑'', ''🍔''];
<code>const</code> info = { favoriteFood: food[0] };

info.favoriteFood = ''🍝'';

consoleonsole.loge>.log(food);</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"[''🍕'', ''🍫'', ''🥑'', ''🍔'']","isCorrect":true,"explanation":"Correct."},{"id":"o2","text":"[''🍝'', ''🍫'', ''🥑'', ''🍔'']","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"[''🍝'', ''🍕'', ''🍫'', ''🥑'', ''🍔'']","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"<code>ReferenceError</code>","isCorrect":false,"explanation":"Incorrect."}]',
      '[''🍕'', ''🍫'', ''🥑'', ''🍔'']',
      'We <code>set</code> the value <code>of</code> the favoriteFood property on the infoinfo <code>object</code> equal to the stringde>ing with the pizza emoji, ''🍕''. A stringde>ing is a primitive data type. <code>In</code> JavaScript, primitive data types don''t interact by reference.

<code>In</code> JavaScript, primitive data types (everything that''s not an <code>object</code>) interact by _value_. <code>In</code> <code>this</code> casede>ase, we <code>set</code> the value <code>of</code> the favoriteFood property on the infoinfo <code>object</code> equal to the value <code>of</code> the first element <code>in</code> the food <code>array</code>, the stringde>ing with the pizza emoji <code>in</code> <code>this</code> casede>ase (''🍕''). A stringde>ing is a primitive data type, and interact by value (see my [blogpost](https://www.theavocoder.com/complete-javascript/2018/12/21/by-value-vs-by-reference) <code>if</code> you''re interested <code>in</code> learning more)

Then, we change the value <code>of</code> the favoriteFood property on the infoinfo <code>object</code>. The food <code>array</code> hasn''t changed, since the value <code>of</code> favoriteFood was merely a _copy_ <code>of</code> the value <code>of</code> the first element <code>in</code> the <code>array</code>, and doesn''t have a reference to the same spot <code>in</code> memory <code>as</code> the element on food[0]. When we log food, it''s still the original <code>array</code>, [''🍕'', ''🍫'', ''🥑'', ''🍔''].',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'basics', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.291Z',
      '2025-11-18T18:46:59.291Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What does <code>this</code> method <code>do</code>?',
      '<code>JSON.parse</code>.parseparse();',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"Parses JSON to a JavaScript value","isCorrect":true,"explanation":"Correct."},{"id":"o2","text":"Parses a JavaScript <code>object</code> to JSON","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"Parses any JavaScript value to JSON","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"Parses JSON to a JavaScript <code>object</code> only","isCorrect":false,"explanation":"Incorrect."}]',
      'Parses JSON to a JavaScript value',
      'With the <code>JSON.parse</code>()rse.parseparse() method, we can parse JSON <code>string</code> to a JavaScript value.

// Stringifying a <code>number</code> into valid JSON, then parsing the JSON <code>string</code> to a JavaScript value:
<code>const</code> jsonNumber = JSON.stringifyingifyingify(4); // ''4''
<code>JSON.parse</code>.parse(jsonNumber); // 4

// Stringifying an <code>array</code> value into valid JSON, then parsing the JSON <code>string</code> to a JavaScript value:
<code>const</code> jsonArray = JSON.stringifyingifyingify([1, 2, 3]); // ''[1, 2, 3]''
<code>JSON.parse</code>.parse(jsonArray); // [1, 2, 3]

// Stringifying an <code>object</code>  into valid JSON, then parsing the JSON <code>string</code> to a JavaScript value:
<code>const</code> jsonArray = JSON.stringifyingifyingify({ name: ''Lydia'' }); // ''{"name":"Lydia"}''
<code>JSON.parse</code>.parse(jsonArray); // { name: ''Lydia'' }',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'basics', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.291Z',
      '2025-11-18T18:46:59.291Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>let</code> name = ''Lydia'';

<code>function</code> getName() {
  consoleonsole.loge>.log(name);
  <code>let</code> name = ''Sarah'';
}

getName();</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"Lydia","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"Sarah","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"<code>undefined</code>","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"<code>ReferenceError</code>","isCorrect":true,"explanation":"Correct."}]',
      '<code>ReferenceError</code>',
      'Each <code>function</code> has its own _execution context_ (or _scope_). The getName <code>function</code> first looks within its own context (scope) to see <code>if</code> it contains the variable name we''re trying to access. <code>In</code> <code>this</code> <code>case</code>, the getName <code>function</code> contains its own name variable: we declare the variable name with the letlet keyword, and with the value <code>of</code> ''Sarah''.

Variables with the letlet keyword (and constconst) are hoisted, but unlike varvar, don''t get <i>initialized</i>. They are not accessible before the line we declare (initialize) them. <code>This</code> is called the "temporal dead zone". When we <code>try</code> to access the variables before they are declared, JavaScript throws a <code>ReferenceError</code>.

<code>If</code> we wouldn''t have declared the name variable within the getName <code>function</code>, the javascript engine would''ve looked down the _scope chain_. The outer scope has a variable called name with the value <code>of</code> Lydia. <code>In</code> that <code>case</code>, it would''ve logged Lydia.

<code>let</code> name = ''Lydia'';

<code>function</code> getName() {
  consoleonsole.loge>.log(name);
}

getName(); // Lydia',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'basics', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.291Z',
      '2025-11-18T18:46:59.291Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>function</code>* generatorOne() {
  <code>yield</code> [''a'', ''b'', ''c''];
}

<code>function</code>* generatorTwo() {
  <code>yield</code>* [''a'', ''b'', ''c''];
}

<code>const</code> one = generatorOne();
<code>const</code> two = generatorTwo();

consoleonsole.loge>.log(one.nexte>next().value);
consoleonsole.loge>.log(two.nexte>next().value);</code></pre>',
      'multiple-choice',
      'advanced',
      20,
      '[{"id":"o1","text":"a and a","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"a and <code>undefined</code>","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"[''a'', ''b'', ''c''] and a","isCorrect":true,"explanation":"Correct."},{"id":"o4","text":"a and [''a'', ''b'', ''c'']","isCorrect":false,"explanation":"Incorrect."}]',
      '[''a'', ''b'', ''c''] and a',
      'With the yieldyield keyword, we yieldyield values <code>in</code> a generator <code>function</code>. With the <code>yield</code>*ield* keyword, we can <code>yield</code> values <code>from</code> another generator <code>function</code>, or iterable <code>object</code> (<code>for</code> example an <code>array</code>).

<code>In</code> generatorOne, we <code>yield</code> the entire <code>array</code> [''a'', ''b'', ''c''] using the yieldyield keyword. The value <code>of</code> value property on the <code>object</code> returned by the next method on one (one.next().valueode>e>next().value) is equal to the entire <code>array</code> [''a'', ''b'', ''c''].

consoleonsole.loge>.log(one.nexte>next().value); // [''a'', ''b'', ''c'']
consoleonsole.loge>.log(one.nexte>next().value); // undefinede>ined

<code>In</code> generatorTwo, we use the <code>yield</code>*ield* keyword. <code>This</code> means that the first yielded value <code>of</code> two, is equal to the first yielded value <code>in</code> the iterator. The iterator is the <code>array</code> [''a'', ''b'', ''c'']. The first yielded value is a, so the first time we call two.next().valueode>e>next().value, a is returned.

consoleonsole.loge>.log(two.nexte>next().value); // ''a''
consoleonsole.loge>.log(two.nexte>next().value); // ''b''
consoleonsole.loge>.log(two.nexte>next().value); // ''c''
consoleonsole.loge>.log(two.nexte>next().value); // undefinede>ined',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'generators', 'difficult'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.291Z',
      '2025-11-18T18:46:59.291Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      'consoleonsole.loge>.log(${(x =&gt; x)(''I love'')} to program);',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"I love to program","isCorrect":true,"explanation":"Correct."},{"id":"o2","text":"<code>undefined</code> to program to program","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"${(x =&gt; x)(''I love'') to program","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"<code>TypeError</code>","isCorrect":false,"explanation":"Incorrect."}]',
      'I love to program',
      'Expressions within template literals are evaluated first. <code>This</code> means that the stringde>ing will contain the returned value <code>of</code> the expression, the immediately invoked <code>function</code> (x =&gt; x)(''I love'') <code>in</code> <code>this</code> casede>ase. We pass the value ''I love'' <code>as</code> an argument to the x =&gt; x arrow <code>function</code>. x is equal to ''I love'', which gets returned. <code>This</code> results <code>in</code> I love to program.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'basics', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.291Z',
      '2025-11-18T18:46:59.291Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What will happen?',
      '<pre><code><code>let</code> config = {
  alert: <code>setInterval</code>(() => {
    consoleonsole.loge>.log(''Alert!'');
  }, 1000),
};

config = <code>null</code>;</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"The setIntervalerval callback won''t be invoked","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"The setIntervalerval callback gets invoked once","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"The setIntervalerval callback will still be called every second","isCorrect":true,"explanation":"Correct."},{"id":"o4","text":"We never invoked config.alert()ertalert(), config is nullnull","isCorrect":false,"explanation":"Incorrect."}]',
      'The setIntervalerval callback will still be called every second',
      'Normally when we <code>set</code> objects equal to nullnull, those objects get _garbage collected_ <code>as</code> there is no reference anymore to that <code>object</code>. However, since the callback <code>function</code> within setIntervalode>de><code>setInterval</code> is an arrow <code>function</code> (thus bound to the config <code>object</code>), the callback <code>function</code> still holds a reference to the config <code>object</code>. 
<code>As</code> long <code>as</code> there is a reference, the <code>object</code> won''t get garbage collected. 
Since <code>this</code> is an interval, setting config to nullnull or delete-ing config.alertalert won''t garbage-collect the interval, so the interval will still be called. 
It should be cleared with <code>clearInterval</code>(config.alert)onfig.alert) to remove it <code>from</code> memory.
Since it was not cleared, the setIntervalode>de><code>setInterval</code> callback <code>function</code> will still get invoked every 1000ms (1s).',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'data-structures', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.291Z',
      '2025-11-18T18:46:59.291Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'Which method(s) will <code>return</code> the value ''Hello world!''?',
      '<pre><code><code>const</code> myMap = <code>new</code> Mapde><code>Map</code>();
<code>const</code> myFunc = () => ''greeting'';

myMap.setde><code>set</code>(myFunc, ''Hello world!'');

//1
myMap.get(''greeting'');
//2
myMap.get(myFunc);
//3
myMap.get(() => ''greeting'');</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"1","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"2","isCorrect":true,"explanation":"Correct."},{"id":"o3","text":"2 and 3","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"All <code>of</code> them","isCorrect":false,"explanation":"Incorrect."}]',
      '2',
      'When adding a key/value pair using the sete><code>set</code> method, the key will be the value <code>of</code> the first argument passed to the sete><code>set</code> <code>function</code>, and the value will be the second argument passed to the sete><code>set</code> <code>function</code>. The key is the _function_ () =&gt; ''greeting''ing'' <code>in</code> <code>this</code> casede>ase, and the value ''Hello world''. myMap is now { () =&gt; ''greeting'' =&gt; ''Hello world!'' }lo world!'' }.

1 is wrong, since the key is not ''greeting''ing'' but () =&gt; ''greeting''ing''.
3 is wrong, since we''re creating a <code>new</code> <code>function</code> by passing it <code>as</code> a parameter to the get method. <code>Object</code> interacts by _reference_. Functions are objects, which is why two functions are never strictly equal, even <code>if</code> they are identical: they have a reference to a different spot <code>in</code> memory.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'data-structures', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.291Z',
      '2025-11-18T18:46:59.291Z',
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

<code>const</code> changeAge = (x = { ...person }) => (x.age += 1);
<code>const</code> changeAgeAndName = (x = { ...person }) => {
  x.age += 1;
  x.name = ''Sarah'';
};

changeAge(person);
changeAgeAndName();

consoleonsole.loge>.log(person);</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"{name: \\"Sarah\\", age: 22}","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"{name: \\"Sarah\\", age: 23}","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"{name: \\"Lydia\\", age: 22}","isCorrect":true,"explanation":"Correct."},{"id":"o4","text":"{name: \\"Lydia\\", age: 23}","isCorrect":false,"explanation":"Incorrect."}]',
      '{name: "Lydia", age: 22}',
      'Both the changeAge and changeAgeAndName functions have a <code>default</code> parameter, namely a _newly_ created <code>object</code> { ...person }son }. <code>This</code> <code>object</code> has copies <code>of</code> all the key/values <code>in</code> the person <code>object</code>.

First, we invoke the changeAge <code>function</code> and pass the person <code>object</code> <code>as</code> its argument. <code>This</code> <code>function</code> increases the value <code>of</code> the age property by 1. person is now { name: "Lydia", age: 22 }.

Then, we invoke the changeAgeAndName <code>function</code>, however we don''t pass a parameter. Instead, the value <code>of</code> x is equal to a _new_ <code>object</code>: { ...person }son }. Since it''s a <code>new</code> <code>object</code>, it doesn''t affect the values <code>of</code> the properties on the person <code>object</code>. person is still equal to { name: "Lydia", age: 22 }.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'es6+-features', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.291Z',
      '2025-11-18T18:46:59.291Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'Which <code>of</code> the following options will <code>return</code> 6?',
      '<pre><code><code>function</code> sumValues(x, y, z) {
  <code>return</code> x + y + z;
}</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"sumValues([...1, 2, 3])","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"sumValues([...[1, 2, 3]])","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"sumValues(...[1, 2, 3])","isCorrect":true,"explanation":"Correct."},{"id":"o4","text":"sumValues([1, 2, 3])","isCorrect":false,"explanation":"Incorrect."}]',
      'sumValues(...[1, 2, 3])',
      'With the spread operator ..., we can _spread_ iterables to individual elements. The sumValues <code>function</code> receives three arguments: x, y and z. ...[1, 2, 3] will result <code>in</code> 1, 2, 3, which we pass to the sumValues <code>function</code>.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'basics', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.291Z',
      '2025-11-18T18:46:59.291Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>let</code> num = 1;
<code>const</code> list = [''🥳'', ''🤠'', ''🥰'', ''🤪''];

consoleonsole.loge>.log(list[(num += 1)]);</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"🤠","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"🥰","isCorrect":true,"explanation":"Correct."},{"id":"o3","text":"<code>SyntaxError</code>","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"<code>ReferenceError</code>","isCorrect":false,"explanation":"Incorrect."}]',
      '🥰',
      'With the += operator, we''re incrementing the value <code>of</code> num by 1. num had the initial value 1, so 1 + 1 is 2. The item on the second index <code>in</code> the list <code>array</code> is 🥰, <code>console</code>.log(list[2])nsole.loge>.log(list[2]) prints 🥰.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'basics', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.291Z',
      '2025-11-18T18:46:59.291Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>const</code> person = {
  firstName: ''Lydia'',
  lastName: ''Hallie'',
  pet: {
    name: ''Mara'',
    breed: ''Dutch Tulip Hound'',
  },
  getFullName() {
    <code>return</code> ${<code>this</code>.firstName} ${<code>this</code>.lastName}} ${<code>this</code>.lastName};
  },
};

consoleonsole.loge>.log(person.pet?.name);
consoleonsole.loge>.log(person.pet?.family?.name);
consoleonsole.loge>.log(person.getFullName?.());
consoleonsole.loge>.log(member.getLastName?.());</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"<code>undefined</code> <code>undefined</code> <code>undefined</code> <code>undefined</code>","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"Mara <code>undefined</code> Lydia Hallie <code>ReferenceError</code>","isCorrect":true,"explanation":"Correct."},{"id":"o3","text":"Mara nullnull Lydia Hallie nullnull","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"nullnull <code>ReferenceError</code> nullnull <code>ReferenceError</code>","isCorrect":false,"explanation":"Incorrect."}]',
      'Mara <code>undefined</code> Lydia Hallie <code>ReferenceError</code>',
      'With the optional chaining operator ?., we no longer have to explicitly check whether the deeper nested values are valid or not. <code>If</code> we''re trying to access a property on an <code>undefined</code> or nullnull value (_nullish_), the expression short-circuits and returns <code>undefined</code>.

person.pet?.name/?.name: person has a property named pet: person.pet.pet is not nullish. It has a property called name, and returns Mara.
person.pet?.family?.name.family?.name: person has a property named pet: person.pet.pet is not nullish. pet does _not_ have a property called family, person.pet.family.family is nullish. The expression returns <code>undefined</code>.
person.getFullName?.()e?.(): person has a property named getFullName: person.getFullName()amellName() is not nullish and can get invoked, which returns Lydia Hallie.
member.getLastName?.()e?.(): variable member is non-existent therefore a <code>ReferenceError</code> gets thrown!',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'this-binding', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.291Z',
      '2025-11-18T18:46:59.291Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>const</code> groceries = [''banana'', ''apple'', ''peanuts''];

<code>if</code> (groceries.indexOf(''banana'')) {
  consoleonsole.loge>.log(''We have to buy bananas!'');
} <code>else</code> {
  consoleonsole.loge>.log(We don''t have to buy bananas!);
}</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"We have to buy bananas!","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"We don''t have to buy bananas","isCorrect":true,"explanation":"Correct."},{"id":"o3","text":"<code>undefined</code>","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"1","isCorrect":false,"explanation":"Incorrect."}]',
      'We don''t have to buy bananas',
      'We passed the condition groceries.indexOf("banana")e>ndexOf("banana") to the <code>if</code>-statement. groceries.indexOf("banana")e>ndexOf("banana") returns 0, which is a falsy value. Since the condition <code>in</code> the <code>if</code>-statement is falsy, the code <code>in</code> the elseelse block runs, and We don''t have to buy bananas! gets logged.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'basics', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.291Z',
      '2025-11-18T18:46:59.291Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>const</code> config = {
  languages: [],
  <code>set</code> language(lang) {
    <code>return</code> <code>this</code>.languagenguages.push(lang);
  },
};

consoleonsole.loge>.log(config.language);</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"<code>function</code> language(lang) { <code>this</code>.languages.push(lang }de>.languages.push(lang }","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"0","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"[]","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"<code>undefined</code>","isCorrect":true,"explanation":"Correct."}]',
      '<code>undefined</code>',
      'The language method is a setter. Setters don''t hold an actual value, their purpose is to _modify_ properties. When calling a setter method, <code>undefined</code> gets returned.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'data-structures', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.291Z',
      '2025-11-18T18:46:59.291Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>const</code> name = ''Lydia Hallie'';

consoleonsole.loge>.log(!<code>typeof</code> name === ''<code>object</code>'');
consoleonsole.loge>.log(!<code>typeof</code> name === ''<code>string</code>'');</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"falsefalse truetrue","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"truetrue falsefalse","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"falsefalse falsefalse","isCorrect":true,"explanation":"Correct."},{"id":"o4","text":"truetrue truetrue","isCorrect":false,"explanation":"Incorrect."}]',
      'falsefalse falsefalse',
      '<code>typeof</code> nameode><code>of</code> name returns "<code>string</code>"ring". The <code>string</code> "<code>string</code>"ring" is a truthy value, so !<code>typeof</code> nameode><code>of</code> name returns the <code>boolean</code> value falsefalse. <code>false</code> === "<code>object</code>"=== "<code>object</code>" and <code>false</code> === "<code>string</code>"=== "<code>string</code>" both returnfalsefalse.

(<code>If</code> we wanted to check whether the type was (un)equal to a certain type, we should''ve written !== instead <code>of</code> !typeofypeofode><code>of</code>)',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'basics', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.291Z',
      '2025-11-18T18:46:59.291Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>const</code> add = x => y => z => {
  consoleonsole.loge>.log(x, y, z);
  <code>return</code> x + y + z;
};

add(4)(5)(6);</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"4 5 6","isCorrect":true,"explanation":"Correct."},{"id":"o2","text":"6 5 4","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"4 functionction functionction","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"<code>undefined</code> <code>undefined</code> 6","isCorrect":false,"explanation":"Incorrect."}]',
      '4 5 6',
      'The add <code>function</code> returns an arrow <code>function</code>, which returns an arrow <code>function</code>, which returns an arrow <code>function</code> (still with me?). The first <code>function</code> receives an argument x with the value <code>of</code> 4. We invoke the second <code>function</code>, which receives an argument y with the value 5. Then we invoke the third <code>function</code>, which receives an argument z with the value 6. When we''re trying to access the value x, y and z within the last arrow <code>function</code>, the JS engine goes up the scope chain <code>in</code> order to find the values <code>for</code> x and y accordingly. <code>This</code> returns 4 5 6.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'basics', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.291Z',
      '2025-11-18T18:46:59.291Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>async</code> <code>function</code>* range(start, end) {
  <code>for</code> (<code>let</code> i = start; i <= end; i++) {
    <code>yield</code> <code>Promise</code>.resolve(i);
  }
}

(asyncasync () => {
  <code>const</code> gen = range(1, 3);
  <code>for</code> <code>await</code> (<code>const</code> item <code>of</code> gen) {
    consoleonsole.loge>.log(item);
  }
})();</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"<code>Promise</code> {1}e {1} <code>Promise</code> {2}e {2} <code>Promise</code> {3}e {3}","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"<code>Promise</code> {&lt;pending&gt;} {<pending>} <code>Promise</code> {&lt;pending&gt;} {<pending>} <code>Promise</code> {&lt;pending&gt;} {<pending>}","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"1 2 3","isCorrect":true,"explanation":"Correct."},{"id":"o4","text":"<code>undefined</code> <code>undefined</code> <code>undefined</code>","isCorrect":false,"explanation":"Incorrect."}]',
      '1 2 3',
      'The generator <code>function</code> range returns an <code>async</code> <code>object</code> with promises <code>for</code> each item <code>in</code> the range we pass: <code>Promise</code>{1}se{1}, <code>Promise</code>{2}se{2}, <code>Promise</code>{3}se{3}. We <code>set</code> the variable gen equal to the <code>async</code> <code>object</code>, after which we loop over it using a <code>for</code> <code>await</code> ... ofawait ... <code>of</code> loop. We <code>set</code> the variable item equal to the returned <code>Promise</code> values: first <code>Promise</code>{1}se{1}, then <code>Promise</code>{2}se{2}, then <code>Promise</code>{3}se{3}. Since we''re _awaiting_ the value <code>of</code> item, the resolved <code>promise</code>, the resolved _values_ <code>of</code> the promises get returned: 1, 2, then 3.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'async/await', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.291Z',
      '2025-11-18T18:46:59.291Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>const</code> myFunc = ({ x, y, z }) => {
  consoleonsole.loge>.log(x, y, z);
};

myFunc(1, 2, 3);</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"1 2 3","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"{1: 1} {2: 2} {3: 3}","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"{ 1: <code>undefined</code> }ned } <code>undefined</code> <code>undefined</code>","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"<code>undefined</code> <code>undefined</code> <code>undefined</code>","isCorrect":true,"explanation":"Correct."}]',
      '<code>undefined</code> <code>undefined</code> <code>undefined</code>',
      'myFunc expects an <code>object</code> with properties x, y and z <code>as</code> its argument. Since we''re only passing three separate numeric values (1, 2, 3) instead <code>of</code> one <code>object</code> with properties x, y and z ({x: 1, y: 2, z: 3}), x, y and z have their <code>default</code> value <code>of</code> <code>undefined</code>.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'basics', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.291Z',
      '2025-11-18T18:46:59.291Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>function</code> getFine(speed, amount) {
  <code>const</code> formattedSpeed = <code>new</code> Intl.NumberFormat(''en-US'', {
    style: ''unit'',
    unit: ''mile-per-hour''
  }).format(speed);

  <code>const</code> formattedAmount = <code>new</code> Intl.NumberFormat(''en-US'', {
    style: ''currency'',
    currency: ''USD''
  }).format(amount);

  <code>return</code> The driver drove ${formattedSpeed} and has to pay ${formattedAmount};
}

consoleonsole.loge>.log(getFine(130, 300))</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"The driver drove 130 and has to pay 300","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"The driver drove 130 mph and has to pay \\\\$300.00","isCorrect":true,"explanation":"Correct."},{"id":"o3","text":"The driver drove <code>undefined</code> and has to pay <code>undefined</code>","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"The driver drove 130.00 and has to pay 300.00","isCorrect":false,"explanation":"Incorrect."}]',
      'The driver drove 130 mph and has to pay \\$300.00',
      'With the Intl.NumberFormatormat method, we can format numeric values to any locale. We format the numeric value 130 to the en-US locale <code>as</code> a unit <code>in</code> mile-per-hour, which results <code>in</code> 130 mph. The numeric value 300 to the en-US locale <code>as</code> a currency <code>in</code> USD results <code>in</code> $300.00.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'basics', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.291Z',
      '2025-11-18T18:46:59.291Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>const</code> spookyItems = [''👻'', ''🎃'', ''🕸''];
({ item: spookyItems[3] } = { item: ''💀'' });

consoleonsole.loge>.log(spookyItems);</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"[\\"👻\\", \\"🎃\\", \\"🕸\\"]","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"[\\"👻\\", \\"🎃\\", \\"🕸\\", \\"💀\\"]","isCorrect":true,"explanation":"Correct."},{"id":"o3","text":"[\\"👻\\", \\"🎃\\", \\"🕸\\", { item: \\"💀\\" }]","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"[\\"👻\\", \\"🎃\\", \\"🕸\\", \\"[<code>object</code> <code>Object</code>]\\"]e> <code>Object</code>]\\"]","isCorrect":false,"explanation":"Incorrect."}]',
      '["👻", "🎃", "🕸", "💀"]',
      'By destructuring objects, we can unpack values <code>from</code> the right-hand <code>object</code>, and assign the unpacked value to the value <code>of</code> the same property name on the left-hand <code>object</code>. <code>In</code> <code>this</code> <code>case</code>, we''re assigning the value "💀" to spookyItems[3]. <code>This</code> means that we''re modifying the spookyItems <code>array</code>, we''re adding the "💀" to it. When logging spookyItems, ["👻", "🎃", "🕸", "💀"] gets logged.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'basics', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.291Z',
      '2025-11-18T18:46:59.291Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>const</code> name = ''Lydia Hallie'';
<code>const</code> age = 21;

consoleonsole.loge>.log(<code>Number</code>.isNaN(name));
consoleonsole.loge>.log(<code>Number</code>.isNaN(age));

consoleonsole.loge>.log(isNaN(name));
consoleonsole.loge>.log(isNaN(age));</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"truetrue falsefalse truetrue falsefalse","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"truetrue falsefalse falsefalse falsefalse","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"falsefalse falsefalse truetrue falsefalse","isCorrect":true,"explanation":"Correct."},{"id":"o4","text":"falsefalse truetrue falsefalse truetrue","isCorrect":false,"explanation":"Incorrect."}]',
      'falsefalse falsefalse truetrue falsefalse',
      'With the <code>Number</code>.isNaN/.isNaNde><code>NaN</code> method, you can check <code>if</code> the value you pass is a _numeric value_ and equal to NaNe><code>NaN</code>. name is not a numeric value, so <code>Number</code>.isNaN(name).isNaNde><code>NaN</code>(name) returns falsefalse. age is a numeric value, but is not equal to NaNe><code>NaN</code>, so <code>Number</code>.isNaN(age).isNaNde><code>NaN</code>(age) returns falsefalse.

With the isNaNe><code>NaN</code> method, you can check <code>if</code> the value you pass is not a <code>number</code>. name is not a <code>number</code>, so isNaN(name)/(name) returns <code>true</code>. age is a <code>number</code>, so isNaN(age)(age) returns falsefalse.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'basics', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.291Z',
      '2025-11-18T18:46:59.291Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>const</code> randomValue = 21;

<code>function</code> getInfo() {
  consoleonsole.loge>.log(<code>typeof</code> randomValue);
  <code>const</code> randomValue = ''Lydia Hallie'';
}

getInfo();</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"\\"<code>number</code>\\"mber\\"","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"\\"<code>string</code>\\"ring\\"","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"<code>undefined</code>","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"<code>ReferenceError</code>","isCorrect":true,"explanation":"Correct."}]',
      '<code>ReferenceError</code>',
      'Variables declared with the constconst keyword are not referenceable before their initialization: <code>this</code> is called the _temporal dead zone_. <code>In</code> the getInfoInfo <code>function</code>, the variable randomValue is scoped <code>in</code> the functional scope <code>of</code> getInfoInfo. On the line where we want to log the value <code>of</code> <code>typeof</code> randomValueode><code>of</code> randomValue, the variable randomValue isn''t initialized yet: a <code>ReferenceError</code> gets thrown! The engine didn''t go down the scope chain since we declared the variable randomValue <code>in</code> the getInfoInfo <code>function</code>.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'basics', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.291Z',
      '2025-11-18T18:46:59.291Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>const</code> myPromise = <code>Promise</code>.resolve(''Woah some cool data'');

(asyncasync () => {
  <code>try</code> {
    consoleonsole.loge>.log(<code>await</code> myPromise);
  } <code>catch</code> {
    <code>throw</code> <code>new</code> <code>Error</code>(Oops didn''t work);
  } <code>finally</code> {
    consoleonsole.loge>.log(''Oh <code>finally</code>!'');
  }
})();</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"Woah some cool data","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"Oh <code>finally</code>!ally!","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"Woah some cool data Oh <code>finally</code>!ally!","isCorrect":true,"explanation":"Correct."},{"id":"o4","text":"Oops didn''t work Oh <code>finally</code>!ally!","isCorrect":false,"explanation":"Incorrect."}]',
      'Woah some cool data Oh <code>finally</code>!ally!',
      '<code>In</code> the trye><code>try</code> block, we''re logging the awaited value <code>of</code> the myPromise variable: "Woah some cool data". Since no errors were thrown <code>in</code> the trye><code>try</code> block, the code <code>in</code> the catchcatch block doesn''t run. The code <code>in</code> the finallynallyinally block _always_ runs, "Oh <code>finally</code>!"llyinally!" gets logged.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'async/await', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.291Z',
      '2025-11-18T18:46:59.291Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>const</code> emojis = [''🥑'', [''✨'', ''✨'', [''🍕'', ''🍕'']]];

consoleonsole.loge>.log(emojis.flat(1));</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"[''🥑'', [''✨'', ''✨'', [''🍕'', ''🍕'']]]","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"[''🥑'', ''✨'', ''✨'', [''🍕'', ''🍕'']]","isCorrect":true,"explanation":"Correct."},{"id":"o3","text":"[''🥑'', [''✨'', ''✨'', ''🍕'', ''🍕'']]","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"[''🥑'', ''✨'', ''✨'', ''🍕'', ''🍕'']","isCorrect":false,"explanation":"Incorrect."}]',
      '[''🥑'', ''✨'', ''✨'', [''🍕'', ''🍕'']]',
      'With the flat method, we can create a <code>new</code>, flattened <code>array</code>. The depth <code>of</code> the flattened <code>array</code> depends on the value that we pass. <code>In</code> <code>this</code> <code>case</code>, we passed the value 1 (which we didn''t have to, that''s the <code>default</code> value), meaning that only the arrays on the first depth will be concatenated. [''🥑''] and [''✨'', ''✨'', [''🍕'', ''🍕'']] <code>in</code> <code>this</code> <code>case</code>. Concatenating these two arrays results <code>in</code> [''🥑'', ''✨'', ''✨'', [''🍕'', ''🍕'']].',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'basics', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.292Z',
      '2025-11-18T18:46:59.292Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>class</code> Counter {
  constconstructor() {
    <code>this</code>.count = 0;
  }

  increment() {
    <code>this</code>.count++;
  }
}

<code>const</code> counterOne = <code>new</code> Counter();
counterOne.incrementrement();
counterOne.incrementrement();

<code>const</code> counterTwo = counterOne;
counterTwo.incrementrement();

consoleonsole.loge>.log(counterOne.count);</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"0","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"1","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"2","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"3","isCorrect":true,"explanation":"Correct."}]',
      '3',
      'counterOne is an instance <code>of</code> the Counter <code>class</code>. The counter <code>class</code> contains a count property on its constructor, and an incrementcrement method. First, we invoked the incrementcrement method twice by calling counterOne.increment()ent/ode>increment(). Currently, counterOne.countcount is 2.

<img src="https://i.imgur.com/KxLlTm9.png" width="400">

Then, we create a <code>new</code> variable counterTwo, and <code>set</code> it equal to counterOne. Since objects interact by reference, we''re just creating a <code>new</code> reference to the same spot <code>in</code> memory that counterOne points to. Since it has the same spot <code>in</code> memory, any changes made to the <code>object</code> that counterTwo has a reference to, also apply to counterOne. Currently, counterTwo.countcount is 2.

We invoke counterTwo.increment()ent/ode>increment(), which sets count to 3. Then, we log the count on counterOne, which logs 3.

<img src="https://i.imgur.com/BNBHXmc.png" width="400">',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'classes', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.292Z',
      '2025-11-18T18:46:59.292Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>const</code> myPromise = <code>Promise</code>.resolve(<code>Promise</code>.resolve(''<code>Promise</code>''));

<code>function</code> funcOne() {
  <code>setTimeout</code>(() => consoleonsole.loge>.log(''Timeout 1!''), 0);
  myPromise.then(res => res).then(res => consoleonsole.loge>.log(${res} 1!));
  consoleonsole.loge>.log(''Last line 1!'');
}

<code>async</code> <code>function</code> funcTwo() {
  <code>const</code> res = <code>await</code> myPromise;
  consoleonsole.loge>.log(${res} 2!)
  <code>setTimeout</code>(() => consoleonsole.loge>.log(''Timeout 2!''), 0);
  consoleonsole.loge>.log(''Last line 2!'');
}

funcOne();
funcTwo();</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"<code>Promise</code> 1! Last line 1! <code>Promise</code> 2! Last line 2! Timeout 1! Timeout 2! 2! Timeout 1! Timeout 2!","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"Last line 1! Timeout 1! <code>Promise</code> 1! Last line 2! Promise2! Timeout 2! mise2! Timeout 2!","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"Last line 1! <code>Promise</code> 2! Last line 2! <code>Promise</code> 1! Timeout 1! Timeout 2! 1! Timeout 1! Timeout 2!","isCorrect":true,"explanation":"Correct."},{"id":"o4","text":"Timeout 1! <code>Promise</code> 1! Last line 1! <code>Promise</code> 2! Timeout 2! Last line 2!! Timeout 2! Last line 2!","isCorrect":false,"explanation":"Incorrect."}]',
      'Last line 1! <code>Promise</code> 2! Last line 2! <code>Promise</code> 1! Timeout 1! Timeout 2! 1! Timeout 1! Timeout 2!',
      'First, we invoke funcOne. On the first line <code>of</code> funcOne, we call the _asynchronous_ setTimeoutmeout <code>function</code>, <code>from</code> which the callback is sent to the Web API. (see my article on the event loop <a href="https://dev.to/lydiahallie/javascript-visualized-event-loop-3dif">here</a>.)

Then we call the myPromiseomise <code>promise</code>, which is an _asynchronous_ operation. Pay attention, that now only the first then clause was added to the microtask queue.

Both the <code>promise</code> and the timeout are asynchronous operations, the <code>function</code> keeps on running <code>while</code> it''s busy completing the <code>promise</code> and handling the setTimeoutmeout callback. <code>This</code> means that Last line 1!ne 1! gets logged first, since <code>this</code> is not an asynchonous operation. 

Since the callstack is not empty yet, the setTimeoutmeout <code>function</code> and <code>promise</code> <code>in</code> funcOne cannot get added to the callstack yet.

<code>In</code> funcTwo, the variable res gets Promiseomise because <code>Promise</code>.resolve(<code>Promise</code>.resolve(''<code>Promise</code>''))ode><code>Promise</code>.resolve(''<code>Promise</code>'')) is equivalent to <code>Promise</code>.resolve(''<code>Promise</code>'')resolve(''<code>Promise</code>'') since resolving a <code>promise</code> just resolves it''s value. The awaitawait <code>in</code> <code>this</code> line stops the execution <code>of</code> the <code>function</code> until it receives the resolution <code>of</code> the <code>promise</code> and then keeps on running synchronously until completion, so <code>Promise</code> 2!se 2! and then Last line 2!ne 2! are logged and the setTimeoutmeout is sent to the Web API. <code>If</code> the first then clause <code>in</code> funcOne had its own log statement, it would be printed before <code>Promise</code> 2!se 2!. Howewer, it executed silently and put the second then clause <code>in</code> microtask queue. So, the second clause will be printed after <code>Promise</code> 2!se 2!.

Then the call stack is empty. Promises are _microtasks_ so they are resolved first when the call stack is empty so <code>Promise</code> 1!se 1! gets to be logged.

Now, since funcTwo popped off the call stack, the call stack is empty. The callbacks waiting <code>in</code> the queue (() =&gt; <code>console</code>.log("Timeout 1!").loge>.log("Timeout 1!") <code>from</code> funcOne, and () =&gt; <code>console</code>.log("Timeout 2!").loge>.log("Timeout 2!") <code>from</code> funcTwo) get added to the call stack one by one. The first callback logs Timeout 1!, and gets popped off the stack. Then, the second callback logs Timeout 2!, and gets popped off the stack.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'async/await', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.292Z',
      '2025-11-18T18:46:59.292Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'How can we invoke sum <code>in</code> sum.jse>.js <code>from</code> index.js?dex.js?',
      '<pre><code>// sum.js
<code>export</code> <code>default</code> <code>function</code> sum(x) {
  <code>return</code> x + x;
}

// index.js
<code>import</code> * <code>as</code> sum <code>from</code> ''./sum'';</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"sum(4)","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"sum.sum(4)um(4)","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"sum.<code>default</code>(4)ltefault(4)","isCorrect":true,"explanation":"Correct."},{"id":"o4","text":"<code>Default</code> aren''t imported with *, only named exports","isCorrect":false,"explanation":"Incorrect."}]',
      'sum.<code>default</code>(4)ltefault(4)',
      'With the asterisk *, we <code>import</code> all exported values <code>from</code> that file, both <code>default</code> and named. <code>If</code> we had the following file:

// info.js
<code>export</code> <code>const</code> name = ''Lydia'';
<code>export</code> <code>const</code> age = 21;
<code>export</code> <code>default</code> ''I love JavaScript'';

// index.js
<code>import</code> * <code>as</code> info <code>from</code> ''./info'';
consoleonsole.loge>.log(info);

The following would get logged:

{
  <code>default</code>: "I love JavaScript",
  name: "Lydia",
  age: 21
}

<code>For</code> the sum example, it means that the imported value sum looks like <code>this</code>:

{ <code>default</code>: <code>function</code> sum(x) { <code>return</code> x + x } }

We can invoke <code>this</code> <code>function</code>, by calling sum.defaultfaultefault',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'modules', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.292Z',
      '2025-11-18T18:46:59.292Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>const</code> handler = {
  <code>set</code>: () => consoleonsole.loge>.log(''Added a <code>new</code> property!''),
  get: () => consoleonsole.loge>.log(''Accessed a property!''),
};

<code>const</code> person = <code>new</code> Proxy({}, handler);

person.name = ''Lydia'';
person.name;</code></pre>',
      'multiple-choice',
      'advanced',
      20,
      '[{"id":"o1","text":"Added a <code>new</code> property!e> property!","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"Accessed a property!","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"Added a <code>new</code> property!e> property! Accessed a property!","isCorrect":true,"explanation":"Correct."},{"id":"o4","text":"Nothing gets logged","isCorrect":false,"explanation":"Incorrect."}]',
      'Added a <code>new</code> property!e> property! Accessed a property!',
      'With a Proxy <code>object</code>, we can add custom behavior to an <code>object</code> that we pass to it <code>as</code> the second argument. <code>In</code> <code>this</code> casede>ase, we pass the handler <code>object</code> which contains two properties: sete><code>set</code> and get. sete><code>set</code> gets invoked whenever we _set_ property values, and get gets invoked whenever we _get_ (access) property values.

The first argument is an empty <code>object</code> {}, which is the value <code>of</code> person. To <code>this</code> <code>object</code>, the custom behavior specified <code>in</code> the handler <code>object</code> gets added. <code>If</code> we add a property to the person <code>object</code>, sete><code>set</code> will get invoked. <code>If</code> we access a property on the person <code>object</code>, get gets invoked.

First, we added a <code>new</code> property name to the proxy <code>object</code> (person.name = "Lydia"e> = "Lydia"). sete><code>set</code> gets invoked, and logs "Added a <code>new</code> property!" property!".

Then, we access a property value on the proxy <code>object</code>, and the get property on the handler <code>object</code> is invoked. "Accessed a property!" gets logged.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'data-structures', 'difficult'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.292Z',
      '2025-11-18T18:46:59.292Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'Which <code>of</code> the following will modify the person <code>object</code>?',
      '<pre><code><code>const</code> person = { name: ''Lydia Hallie'' };

ObjectObject.seal.seal(person);</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"person.name = \\"Evan Bacon\\"\\"Evan Bacon\\"","isCorrect":true,"explanation":"Correct."},{"id":"o2","text":"person.age = 21 = 21","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"delete person.name.name","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"<code>Object</code>.assign(person, { age: 21 })ode>assign(person, { age: 21 })","isCorrect":false,"explanation":"Incorrect."}]',
      'person.name = "Evan Bacon""Evan Bacon"',
      'With <code>Object</code>.sealObject.seal.seal we can prevent <code>new</code> properties <code>from</code> being _added_, or existing properties to be _removed_.

However, you can still modify the value <code>of</code> existing properties.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'basics', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.292Z',
      '2025-11-18T18:46:59.292Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'Which <code>of</code> the following will modify the person <code>object</code>?',
      '<pre><code><code>const</code> person = {
  name: ''Lydia Hallie'',
  address: {
    street: ''100 Main St'',
  },
};

ObjectObject.freezefreeze(person);</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"person.name = \\"Evan Bacon\\"\\"Evan Bacon\\"","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"delete person.addressdress","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"person.address.street = \\"101 Main St\\"et = \\"101 Main St\\"","isCorrect":true,"explanation":"Correct."},{"id":"o4","text":"person.pet = { name: \\"Mara\\" }me: \\"Mara\\" }","isCorrect":false,"explanation":"Incorrect."}]',
      'person.address.street = "101 Main St"et = "101 Main St"',
      'The <code>Object</code>.freezeObject.freezefreeze method _freezes_ an <code>object</code>. No properties can be added, modified, or removed.

However, it only _shallowly_ freezes the <code>object</code>, meaning that only _direct_ properties on the <code>object</code> are frozen. <code>If</code> the property is another <code>object</code>, like address <code>in</code> <code>this</code> <code>case</code>, the properties on that <code>object</code> aren''t frozen, and can be modified.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'basics', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.292Z',
      '2025-11-18T18:46:59.292Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>const</code> add = x => x + x;

<code>function</code> myFunc(num = 2, value = add(num)) {
  consoleonsole.loge>.log(num, value);
}

myFunc();
myFunc(3);</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"2 4 and 3 6","isCorrect":true,"explanation":"Correct."},{"id":"o2","text":"2 NaNe><code>NaN</code> and 3 NaNe><code>NaN</code>","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"2 ErrorError and 3 6","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"2 4 and 3 ErrorError","isCorrect":false,"explanation":"Incorrect."}]',
      '2 4 and 3 6',
      'First, we invoked myFunc()unc() without passing any arguments. Since we didn''t pass arguments, num and value got their <code>default</code> values: num is 2, and value is the returned value <code>of</code> the <code>function</code> add. To the add <code>function</code>, we pass num <code>as</code> an argument, which had the value <code>of</code> 2. add returns 4, which is the value <code>of</code> value.

Then, we invoked myFunc(3) and passed the value 3 <code>as</code> the value <code>for</code> the argument num. We didn''t pass an argument <code>for</code> value. Since we didn''t pass a value <code>for</code> the value argument, it got the <code>default</code> value: the returned value <code>of</code> the add <code>function</code>. To add, we pass num, which has the value <code>of</code> 3. add returns 6, which is the value <code>of</code> value.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'basics', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.292Z',
      '2025-11-18T18:46:59.292Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>class</code> Counter {
  #<code>number</code> = 10

  increment() {
    <code>this</code>.#<code>number</code>++
  }

  getNum() {
    <code>return</code> <code>this</code>.#<code>number</code>
  }
}

<code>const</code> counter = <code>new</code> Counter()
counter.incrementrement()

consoleonsole.loge>.log(counter.#<code>number</code>)</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"10","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"11","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"<code>undefined</code>","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"<code>SyntaxError</code>","isCorrect":true,"explanation":"Correct."}]',
      '<code>SyntaxError</code>',
      '<code>In</code> ES2020, we can add private variables <code>in</code> classes by using the #. We cannot access these variables outside <code>of</code> the <code>class</code>. When we <code>try</code> to log counter.#numberumber, a <code>SyntaxError</code> gets thrown: we cannot access it outside the Counter <code>class</code>!',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'classes', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.292Z',
      '2025-11-18T18:46:59.292Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s missing?',
      '<pre><code><code>const</code> teams = [
  { name: ''Team 1'', members: [''Paul'', ''Lisa''] },
  { name: ''Team 2'', members: [''Laura'', ''Tim''] },
];

<code>function</code>* getMembers(members) {
  <code>for</code> (<code>let</code> i = 0; i < members.length; i++) {
    <code>yield</code> members[i];
  }
}

<code>function</code>* getTeams(teams) {
  <code>for</code> (<code>let</code> i = 0; i < teams.length; i++) {
    // ✨ SOMETHING IS MISSING HERE ✨
  }
}

<code>const</code> obj = getTeams(teams);
obj.nexte>next(); // { value: "Paul", done: <code>false</code> }
obj.nexte>next(); // { value: "Lisa", done: <code>false</code> }</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"<code>yield</code> getMembers(teams[i].members)[i].members)","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"<code>yield</code>* getMembers(teams[i].members)[i].members)","isCorrect":true,"explanation":"Correct."},{"id":"o3","text":"<code>return</code> getMembers(teams[i].members)[i].members)","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"<code>return</code> <code>yield</code> getMembers(teams[i].members)Members(teams[i].members)","isCorrect":false,"explanation":"Incorrect."}]',
      '<code>yield</code>* getMembers(teams[i].members)[i].members)',
      '<code>In</code> order to iterate over the members <code>in</code> each element <code>in</code> the teams <code>array</code>, we need to pass teams[i].membersmbers to the getMembers generator <code>function</code>. The generator <code>function</code> returns a generator <code>object</code>. <code>In</code> order to iterate over each element <code>in</code> <code>this</code> generator <code>object</code>, we need to use <code>yield</code>*ield*.

<code>If</code> we would''ve written yieldyield, <code>return</code> <code>yield</code>/ <code>yield</code>, or returneturn, the entire generator <code>function</code> would''ve gotten returned the first time we called the next method.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'generators', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.292Z',
      '2025-11-18T18:46:59.292Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>const</code> person = {
  name: ''Lydia Hallie'',
  hobbies: [''coding''],
};

<code>function</code> addHobby(hobby, hobbies = person.hobbies) {
  hobbies.push(hobby);
  <code>return</code> hobbies;
}

addHobby(''running'', []);
addHobby(''dancing'');
addHobby(''baking'', person.hobbies);

consoleonsole.loge>.log(person.hobbies);</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"[\\"coding\\"]","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"[\\"coding\\", \\"dancing\\"]","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"[\\"coding\\", \\"dancing\\", \\"baking\\"]","isCorrect":true,"explanation":"Correct."},{"id":"o4","text":"[\\"coding\\", \\"running\\", \\"dancing\\", \\"baking\\"]","isCorrect":false,"explanation":"Incorrect."}]',
      '["coding", "dancing", "baking"]',
      'The addHobby <code>function</code> receives two arguments, hobby and hobbies with the <code>default</code> value <code>of</code> the hobbies <code>array</code> on the person <code>object</code>.

First, we invoke the addHobby <code>function</code>, and pass "running" <code>as</code> the value <code>for</code> hobby and an empty <code>array</code> <code>as</code> the value <code>for</code> hobbies. Since we pass an empty <code>array</code> <code>as</code> the value <code>for</code> hobbies, "running" gets added to <code>this</code> empty <code>array</code>.

Then, we invoke the addHobby <code>function</code>, and pass "dancing" <code>as</code> the value <code>for</code> hobby. We didn''t pass a value <code>for</code> hobbies, so it gets the <code>default</code> value, the hobbies property on the person <code>object</code>. We push the hobby dancing to the person.hobbiesbbies <code>array</code>.

Last, we invoke the addHobby <code>function</code>, and pass "baking" <code>as</code> the value <code>for</code> hobby, and the person.hobbiesbbies <code>array</code> <code>as</code> the value <code>for</code> hobbies. We push the hobby baking to the person.hobbiesbbies <code>array</code>.

After pushing dancing and baking, the value <code>of</code> person.hobbiesbbies is ["coding", "dancing", "baking"]',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'basics', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.292Z',
      '2025-11-18T18:46:59.292Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>class</code> Bird {
  constconstructor() {
    consoleonsole.loge>.log("I''m a bird. 🦢");
  }
}

<code>class</code> Flamingo <code>extends</code> Bird {
  constconstructor() {
    consoleonsole.loge>.log("I''m pink. 🌸");
    supersuper();
  }
}

<code>const</code> pet = <code>new</code> Flamingo();</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"I''m pink. 🌸","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"I''m pink. 🌸 I''m a bird. 🦢","isCorrect":true,"explanation":"Correct."},{"id":"o3","text":"I''m a bird. 🦢 I''m pink. 🌸","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"Nothing, we didn''t call any method","isCorrect":false,"explanation":"Incorrect."}]',
      'I''m pink. 🌸 I''m a bird. 🦢',
      'We create the variable pet which is an instance <code>of</code> the Flamingoingo <code>class</code>. When we instantiate <code>this</code> instance, the constructor on Flamingoingo gets called. First, "I''m pink. 🌸"/k. 🌸" gets logged, after which we call <code>super</code>()persuper(). <code>super</code>()persuper() calls the constructor <code>of</code> the parent <code>class</code>, Bird. The constructor <code>in</code> Bird gets called, and logs "I''m a bird. 🦢".',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'classes', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.292Z',
      '2025-11-18T18:46:59.292Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'Which <code>of</code> the options result(s) <code>in</code> an <code>error</code>?',
      '<pre><code><code>const</code> emojis = [''🎄'', ''🎅🏼'', ''🎁'', ''⭐''];

/* 1 */ emojis.push(''🦌'');
/* 2 */ emojis.splice(0, 2);
/* 3 */ emojis = [...emojis, ''🥂''];
/* 4 */ emojis.length = 0;</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"1","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"1 and 2","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"3 and 4","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"3","isCorrect":true,"explanation":"Correct."}]',
      '3',
      'The constconst keyword simply means we cannot _redeclare_ the value <code>of</code> that variable, it''s _read-only_. However, the value itself isn''t immutable. The properties on the emojis <code>array</code> can be modified, <code>for</code> example by pushing <code>new</code> values, splicing them, or setting the length <code>of</code> the <code>array</code> to 0.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'es6+-features', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.292Z',
      '2025-11-18T18:46:59.292Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What <code>do</code> we need to add to the person <code>object</code> to get ["Lydia Hallie", 21] <code>as</code> the output <code>of</code> [...person]rson]?',
      '<pre><code><code>const</code> person = {
  name: "Lydia Hallie",
  age: 21
}

[...person] // ["Lydia Hallie", 21]</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"Nothing, <code>object</code> are iterable by <code>default</code>","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"*[<code>Symbol</code>.iterator]() { <code>for</code> (<code>let</code> x <code>in</code> <code>this</code>) <code>yield</code>* <code>this</code>[x] } (<code>let</code> x <code>in</code> <code>this</code>) <code>yield</code>* <code>this</code>[x] }","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"*[<code>Symbol</code>.iterator]() { <code>yield</code>* <code>Object</code>.values(<code>this</code>) }de><code>yield</code>* ObjectObject.valuesvalues(<code>this</code>) }","isCorrect":true,"explanation":"Correct."},{"id":"o4","text":"*[<code>Symbol</code>.iterator]() { <code>for</code> (<code>let</code> x <code>in</code> <code>this</code>) <code>yield</code> <code>this</code> }or (<code>let</code> x <code>in</code> <code>this</code>) <code>yield</code> <code>this</code> }","isCorrect":false,"explanation":"Incorrect."}]',
      '*[<code>Symbol</code>.iterator]() { <code>yield</code>* <code>Object</code>.values(<code>this</code>) }de><code>yield</code>* ObjectObject.valuesvalues(<code>this</code>) }',
      'Objects aren''t iterable by <code>default</code>. An iterable is an iterable <code>if</code> the iterator protocol is present. We can add <code>this</code> manually by adding the iterator <code>symbol</code> [<code>Symbol</code>.iterator]e>.iterator], which has to <code>return</code> a generator <code>object</code>, <code>for</code> example by making it a generator <code>function</code> *[<code>Symbol</code>.iterator]() {}de>.iterator]() {}. <code>This</code> generator <code>function</code> has to <code>yield</code> the <code>Object</code>.valuesObject.valuesvalues <code>of</code> the person <code>object</code> <code>if</code> we want it to <code>return</code> the <code>array</code> ["Lydia Hallie", 21]: <code>yield</code>* <code>Object</code>.values(<code>this</code>)bjectObject.valuesvalues(<code>this</code>).',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'es6+-features', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.292Z',
      '2025-11-18T18:46:59.292Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>let</code> count = 0;
<code>const</code> nums = [0, 1, 2, 3];

nums.forEach(num => {
	<code>if</code> (num) count += 1
})

consoleonsole.loge>.log(count)</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"1","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"2","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"3","isCorrect":true,"explanation":"Correct."},{"id":"o4","text":"4","isCorrect":false,"explanation":"Incorrect."}]',
      '3',
      'The ifde><code>if</code> condition within the forEachrEach loop checks whether the value <code>of</code> num is truthy or falsy. Since the first <code>number</code> <code>in</code> the nums <code>array</code> is 0, a falsy value, the ifde><code>if</code> statement''s code block won''t be executed. count only gets incremented <code>for</code> the other 3 numbers <code>in</code> the nums <code>array</code>, 1, 2 and 3. Since count gets incremented by 1 3 times, the value <code>of</code> count is 3.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'basics', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.292Z',
      '2025-11-18T18:46:59.292Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>function</code> getFruit(fruits) {
	consoleonsole.loge>.log(fruits?.[1]?.[1])
}

getFruit([[''🍊'', ''🍌''], [''🍍'']])
getFruit()
getFruit([[''🍍''], [''🍊'', ''🍌'']])</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"nullnull, <code>undefined</code>, 🍌","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"[], nullnull, 🍌","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"[], [], 🍌","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"<code>undefined</code>, <code>undefined</code>, 🍌","isCorrect":true,"explanation":"Correct."}]',
      '<code>undefined</code>, <code>undefined</code>, 🍌',
      'The ? allows us to optionally access deeper nested properties within objects. We''re trying to log the item on index 1 within the subarray that''s on index 1 <code>of</code> the fruits <code>array</code>. <code>If</code> the subarray on index 1 <code>in</code> the fruits <code>array</code> doesn''t exist, it''ll simply <code>return</code> undefinede>ined. <code>If</code> the subarray on index 1 <code>in</code> the fruits <code>array</code> exists, but <code>this</code> subarray doesn''t have an item on its 1 index, it''ll also <code>return</code> undefinede>ined. 

First, we''re trying to log the second item <code>in</code> the [''🍍''] subarray <code>of</code> [[''🍊'', ''🍌''], [''🍍'']]. <code>This</code> subarray only contains one item, which means there is no item on index 1, and returns undefinede>ined.

Then, we''re invoking the getFruits <code>function</code> without passing a value <code>as</code> an argument, which means that fruits has a value <code>of</code> undefinede>ined by <code>default</code>. Since we''re conditionally chaining the item on index 1 offruits, it returns undefinede>ined since <code>this</code> item on index 1 does not exist. 

Lastly, we''re trying to log the second item <code>in</code> the [''🍊'', ''🍌''] subarray <code>of</code> [''🍍''], [''🍊'', ''🍌'']. The item on index 1 within <code>this</code> subarray is 🍌, which gets logged.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'basics', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.292Z',
      '2025-11-18T18:46:59.292Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>class</code> Calc {
	constconstructor() {
		<code>this</code>.count = 0 
	}

	increase() {
		<code>this</code>.count++
	}
}

<code>const</code> calc = <code>new</code> Calc()
<code>new</code> Calc().increasecrease()

consoleonsole.loge>.log(calc.count)</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"0","isCorrect":true,"explanation":"Correct."},{"id":"o2","text":"1","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"<code>undefined</code>","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"<code>ReferenceError</code>","isCorrect":false,"explanation":"Incorrect."}]',
      '0',
      'We <code>set</code> the variable calc equal to a <code>new</code> instance <code>of</code> the Calc <code>class</code>. Then, we instantiate a <code>new</code> instance <code>of</code> Calc, and invoke the increase method on <code>this</code> instance. Since the count property is within the constructor <code>of</code> the Calc <code>class</code>, the count property is not shared on the prototype <code>of</code> Calc. <code>This</code> means that the value <code>of</code> count has not been updated <code>for</code> the instance calc points to, count is still 0.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'classes', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.292Z',
      '2025-11-18T18:46:59.292Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>const</code> user = {
	email: "e@mail.com",
	password: "12345"
}

<code>const</code> updateUser = ({ email, password }) => {
	<code>if</code> (email) {
		ObjectObject.assignassign(user, { email })
	}

	<code>if</code> (password) {
		user.password = password
	}

	<code>return</code> user
}

<code>const</code> updatedUser = updateUser({ email: "<code>new</code>@email.com" })

consoleonsole.loge>.log(updatedUser === user)</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"falsefalse","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"truetrue","isCorrect":true,"explanation":"Correct."},{"id":"o3","text":"<code>TypeError</code>","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"<code>ReferenceError</code>","isCorrect":false,"explanation":"Incorrect."}]',
      'truetrue',
      'The updateUser <code>function</code> updates the values <code>of</code> the email and password properties on user, <code>if</code> their values are passed to the <code>function</code>, after which the <code>function</code> returns the user <code>object</code>. The returned value <code>of</code> the updateUser <code>function</code> is the user <code>object</code>, which means that the value <code>of</code> updatedUser is a reference to the same user <code>object</code> that user points to. updatedUser === user equals truetrue.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'basics', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.292Z',
      '2025-11-18T18:46:59.292Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>const</code> fruit = [''🍌'', ''🍊'', ''🍎'']

fruit.slice(0, 1)
fruit.splice(0, 1)
fruit.unshift(''🍇'')

consoleonsole.loge>.log(fruit)</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"[''🍌'', ''🍊'', ''🍎'']","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"[''🍊'', ''🍎'']","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"[''🍇'', ''🍊'', ''🍎'']","isCorrect":true,"explanation":"Correct."},{"id":"o4","text":"[''🍇'', ''🍌'', ''🍊'', ''🍎'']","isCorrect":false,"explanation":"Incorrect."}]',
      '[''🍇'', ''🍊'', ''🍎'']',
      'First, we invoke the slice method on the fruit <code>array</code>. The slice method does not modify the original <code>array</code>, but returns the value that it sliced off the <code>array</code>: the banana emoji.
Then, we invoke the splice method on the fruit <code>array</code>. The splice method does modify the original <code>array</code>, which means that the fruit <code>array</code> now consists <code>of</code> [''🍊'', ''🍎''].
At last, we invoke the unshift method on the fruit <code>array</code>, which modifies the original <code>array</code> by adding the provided value, ‘🍇’ <code>in</code> <code>this</code> casede>ase,  <code>as</code> the first element <code>in</code> the <code>array</code>.  The fruit <code>array</code> now consists <code>of</code> [''🍇'', ''🍊'', ''🍎''].',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'basics', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.292Z',
      '2025-11-18T18:46:59.292Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>const</code> animals = {};
<code>let</code> dog = { emoji: ''🐶'' }
<code>let</code> cat = { emoji: ''🐈'' }

animals[dog] = { ...dog, name: "Mara" }
animals[cat] = { ...cat, name: "Sara" }

consoleonsole.loge>.log(animals[dog])</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"{ emoji: \\"🐶\\", name: \\"Mara\\" }","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"{ emoji: \\"🐈\\", name: \\"Sara\\" }","isCorrect":true,"explanation":"Correct."},{"id":"o3","text":"<code>undefined</code>","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"<code>ReferenceError</code>","isCorrect":false,"explanation":"Incorrect."}]',
      '{ emoji: "🐈", name: "Sara" }',
      '<code>Object</code> keys are converted to strings. 

Since the value <code>of</code>  dog is an <code>object</code>,  animals[dog] actually means that we’re creating a <code>new</code> property called "[<code>object</code> <code>Object</code>]"de> <code>Object</code>]" equal to the <code>new</code> <code>object</code>. animals["[<code>object</code> <code>Object</code>]"]e> <code>Object</code>]"] is now equal to { emoji: "🐶", name: "Mara"}.

cat is also an <code>object</code>, which means that animals[cat] actually means that we’re overwriting the value <code>of</code>  animals["[<code>object</code> <code>Object</code>]"]e> <code>Object</code>]"] with the <code>new</code> cat properties. 

Logging animals[dog], or actually animals["[<code>object</code> <code>Object</code>]"]e> <code>Object</code>]"] since converting the dog <code>object</code> to a <code>string</code> results "[<code>object</code> <code>Object</code>]"de> <code>Object</code>]", returns the { emoji: "🐈", name: "Sara" }.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'es6+-features', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.292Z',
      '2025-11-18T18:46:59.292Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>const</code> user = {
	email: "my@email.com",
	updateEmail: email => {
		<code>this</code>.email = email
	}
}

user.updateEmail("<code>new</code>@email.com")
consoleonsole.loge>.log(user.email)</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"my@email.com.com","isCorrect":true,"explanation":"Correct."},{"id":"o2","text":"<code>new</code>@email.come>@email.com","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"<code>undefined</code>","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"<code>ReferenceError</code>","isCorrect":false,"explanation":"Incorrect."}]',
      'my@email.com.com',
      'The updateEmail <code>function</code> is an arrow <code>function</code>, and is not bound to the user <code>object</code>. <code>This</code> means that the thisthis keyword is not referring to the user <code>object</code>, but refers to  the <code>global</code> scope <code>in</code> <code>this</code> <code>case</code>. The value <code>of</code> email within the user <code>object</code> does not get updated. When logging the value <code>of</code> user.emailemail, the original value <code>of</code> my@email.com.com gets returned.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'this-binding', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.292Z',
      '2025-11-18T18:46:59.292Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>const</code> promise1 = <code>Promise</code>.resolve(''First'')
<code>const</code> promise2 = <code>Promise</code>.resolve(''Second'')
<code>const</code> promise3 = <code>Promise</code>.reject(''Third'')
<code>const</code> promise4 = <code>Promise</code>.resolve(''Fourth'')

<code>const</code> runPromises = asyncasync () => {
	<code>const</code> res1 = <code>await</code> <code>Promise</code>.all([promise1, promise2])
	<code>const</code> res2  = <code>await</code> <code>Promise</code>.all([promise3, promise4])
	<code>return</code> [res1, res2]
}

runPromises()ises()
	.then(res => consoleonsole.loge>.log(res))
	.catchcatch(err => consoleonsole.loge>.log(err))</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"[[''First'', ''Second''], [''Fourth'']]","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"[[''First'', ''Second''], [''Third'', ''Fourth'']]","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"[[''First'', ''Second'']]","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"''Third''","isCorrect":true,"explanation":"Correct."}]',
      '''Third''',
      'The <code>Promise</code>.alle.all method runs the passed promises <code>in</code> parallel. <code>If</code> one <code>promise</code> fails, the <code>Promise</code>.alle.all method _rejects_ with the value <code>of</code> the rejected <code>promise</code>. <code>In</code> <code>this</code> <code>case</code>, promise3mise3 is rejected with the value "Third". We’re catching the rejected value <code>in</code> the chained catchcatch method on the runPromisesmises invocation to <code>catch</code> any errors  within the runPromisesmises <code>function</code>. Only "Third" gets logged, since promise3mise3 is rejected with <code>this</code> value.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'async/await', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.292Z',
      '2025-11-18T18:46:59.292Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What should the value <code>of</code> method be to log { name: "Lydia", age: 22 }?',
      '<pre><code><code>const</code> keys = ["name", "age"]
<code>const</code> values = ["Lydia", 22]

<code>const</code> method = /* ?? */
<code>Object</code>[method](keys.mapde><code>map</code>((_, i) => {
	<code>return</code> [keys[i], values[i]]
})) // { name: "Lydia", age: 22 }</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"entries","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"values","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"fromEntries","isCorrect":true,"explanation":"Correct."},{"id":"o4","text":"forEach","isCorrect":false,"explanation":"Incorrect."}]',
      'fromEntries',
      'The fromEntries method turns a 2d <code>array</code> into an <code>object</code>. The first element <code>in</code> each subarray will be the key, and the second element <code>in</code> each subarray will be the value. <code>In</code> <code>this</code> <code>case</code>, we’re mapping over the keys <code>array</code>, which returns an <code>array</code> that the first element is the item on the key <code>array</code> on the current index, and the second element is the item <code>of</code> the values <code>array</code> on the current index. 

<code>This</code> creates an <code>array</code> <code>of</code> subarrays containing the correct keys and values, which results <code>in</code> { name: "Lydia", age: 22 }',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'data-structures', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.292Z',
      '2025-11-18T18:46:59.292Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>const</code> createMember = ({ email, address = {}}) => {
	<code>const</code> validEmail = /.+\\@.+\\..+/.test(email)
	<code>if</code> (!validEmail) <code>throw</code> <code>new</code> <code>Error</code>("Valid email pls")

	<code>return</code> {
		email,
		address: address ? address : <code>null</code>
	}
}

<code>const</code> member = createMember({ email: "my@email.com" })
consoleonsole.loge>.log(member)</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"{ email: \\"my@email.com\\", address: <code>null</code> }ress: <code>null</code> }","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"{ email: \\"my@email.com\\" }om\\" }","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"{ email: \\"my@email.com\\", address: {} }ddress: {} }","isCorrect":true,"explanation":"Correct."},{"id":"o4","text":"{ email: \\"my@email.com\\", address: <code>undefined</code> } <code>undefined</code> }","isCorrect":false,"explanation":"Incorrect."}]',
      '{ email: "my@email.com", address: {} }ddress: {} }',
      'The <code>default</code> value <code>of</code> address is an empty <code>object</code> {}. When we <code>set</code> the variable member equal to the <code>object</code> returned by the createMember <code>function</code>, we didn''t pass a value <code>for</code> the address, which means that the value <code>of</code> the address is the <code>default</code> empty <code>object</code> {}. An empty <code>object</code> is a truthy value, which means that the condition <code>of</code> the address ? address : nullnull conditional returns truetrue. The value <code>of</code> the address is the empty <code>object</code> {}.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'basics', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.292Z',
      '2025-11-18T18:46:59.292Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    ),
    (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>let</code> randomValue = { name: "Lydia" }
randomValue = 23

<code>if</code> (!<code>typeof</code> randomValue === "<code>string</code>") {
	consoleonsole.loge>.log("It''s not a <code>string</code>!")
} <code>else</code> {
	consoleonsole.loge>.log("Yay it''s a <code>string</code>!")
}</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"It''s not a <code>string</code>!ring!","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"Yay it''s a <code>string</code>!ring!","isCorrect":true,"explanation":"Correct."},{"id":"o3","text":"<code>TypeError</code>","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"<code>undefined</code>","isCorrect":false,"explanation":"Incorrect."}]',
      'Yay it''s a <code>string</code>!ring!',
      'The condition within the ifde><code>if</code> statement checks whether the value <code>of</code> !<code>typeof</code> randomValueode><code>of</code> randomValue is equal to "<code>string</code>"ring". The ! operator converts the value to a <code>boolean</code> value. <code>If</code> the value is truthy, the returned value will be falsefalse, <code>if</code> the value is falsy, the returned value will be truetrue. <code>In</code> <code>this</code> <code>case</code>, the returned value <code>of</code> <code>typeof</code> randomValueode><code>of</code> randomValue is the truthy value "<code>number</code>"mber", meaning that the value <code>of</code> !<code>typeof</code> randomValueode><code>of</code> randomValue is the <code>boolean</code> value falsefalse.

!<code>typeof</code> randomValue === "<code>string</code>" randomValue === "<code>string</code>" always returns <code>false</code>, since we''re actually checking <code>false</code> === "<code>string</code>"=== "<code>string</code>". Since the condition returned falsefalse, the code block <code>of</code> the elseelse statement gets run, and Yay it''s a <code>string</code>!ring! gets logged.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'basics', 'intermediate'],
      '{}',
      NULL,
      'b7414324-cc5a-47e4-89f1-6b4a2c46c508',
      NULL,
      true,
      '2025-11-18T18:46:59.292Z',
      '2025-11-18T18:46:59.292Z',
      '6640aee8-5a40-4166-8a8f-051f547e3e30',
      300
    );