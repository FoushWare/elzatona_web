INSERT INTO questions (
    id, title, content, type, difficulty, points, options, correct_answer, 
    explanation, test_cases, hints, tags, metadata, stats, category_id, 
    learning_card_id, is_active, created_at, updated_at, topic_id, time_limit
  ) VALUES (
      gen_random_uuid(),
      'What''s the output?',
      '<pre><code><code>class</code> Dog {
  constructor(name) {
    <code>this</code>.name = name;
  }
}

Dog.prototype.bark = functionnction() {
  consoleonsole.loge>.log(Woof I am ${<code>this</code>.name}/.name});
};

<code>const</code> pet = <code>new</code> Dog(''Mara'');

pet.barke>bark();

delete Dog.prototype.bark;

pet.barke>bark();</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"\\"Woof I am Mara\\", <code>TypeError</code>","isCorrect":true,"explanation":"Correct."},{"id":"o2","text":"\\"Woof I am Mara\\", \\"Woof I am Mara\\"","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"\\"Woof I am Mara\\", <code>undefined</code>","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"<code>TypeError</code>, <code>TypeError</code>","isCorrect":false,"explanation":"Incorrect."}]',
      '"Woof I am Mara", <code>TypeError</code>',
      'We can delete properties <code>from</code> objects using the delete keyword, also on the prototype. By deleting a property on the prototype, it is not available anymore <code>in</code> the prototype chain. <code>In</code> <code>this</code> <code>case</code>, the bark <code>function</code> is not available anymore on the prototype after delete Dog.prototype.bark.bark, yet we still <code>try</code> to access it.

When we <code>try</code> to invoke something that is not a <code>function</code>, a <code>TypeError</code> is thrown. <code>In</code> <code>this</code> <code>case</code> <code>TypeError</code>: pet.bark is not a functiont a <code>function</code>, since pet.bark.bark is undefinede>ined.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'classes', 'intermediate'],
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
      '<pre><code><code>const</code> <code>set</code> = <code>new</code> <code>Set</code>([1, 1, 2, 3, 4]);

consoleonsole.loge>.log(<code>set</code>);</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"[1, 1, 2, 3, 4]","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"[1, 2, 3, 4]","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"{1, 1, 2, 3, 4}","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"{1, 2, 3, 4}","isCorrect":true,"explanation":"Correct."}]',
      '{1, 2, 3, 4}',
      'The Sete><code>Set</code> <code>object</code> is a collection <code>of</code> _unique_ values: a value can only occur once <code>in</code> a <code>set</code>.

We passed the iterable [1, 1, 2, 3, 4] with a duplicate value 1. Since we cannot have two <code>of</code> the same values <code>in</code> a <code>set</code>, one <code>of</code> them is removed. <code>This</code> results <code>in</code> {1, 2, 3, 4}.',
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
      '<pre><code>// counter.js
<code>let</code> counter = 10;
<code>export</code> <code>default</code> counter;

// index.js
<code>import</code> myCounter <code>from</code> ''./counter'';

myCounter += 1;

consoleonsole.loge>.log(myCounter);</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"10","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"11","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"ErrorError","isCorrect":true,"explanation":"Correct."},{"id":"o4","text":"NaNe><code>NaN</code>","isCorrect":false,"explanation":"Incorrect."}]',
      'ErrorError',
      'An imported module is _read-only_: you cannot modify the imported module. Only the module that exports them can change its value.

When we <code>try</code> to increment the value <code>of</code> myCounter, it throws an <code>error</code>: myCounter is read-only and cannot be modified.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'modules', 'intermediate'],
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
      '<pre><code><code>const</code> name = ''Lydia'';
age = 21;

consoleonsole.loge>.log(delete name);
consoleonsole.loge>.log(delete age);</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"falsefalse, truetrue","isCorrect":true,"explanation":"Correct."},{"id":"o2","text":"\\"Lydia\\", 21","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"truetrue, truetrue","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"<code>undefined</code>, <code>undefined</code>","isCorrect":false,"explanation":"Incorrect."}]',
      'falsefalse, truetrue',
      'The deletelete operator returns a <code>boolean</code> value: truetrue on a successful deletion, <code>else</code> it''ll <code>return</code> falsefalse. However, variables declared with the varvar, constconst, or letlet keywords cannot be deleted using the deletelete operator.

The name variable was declared with a constconst keyword, so its deletion is not successful: falsefalse is returned. When we <code>set</code> age equal to 21, we actually added a property called age to the <code>global</code> <code>object</code>. You can successfully delete properties <code>from</code> objects <code>this</code> way, also the <code>global</code> <code>object</code>, so delete agee age returns truetrue.',
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
      '<pre><code><code>const</code> numbers = [1, 2, 3, 4, 5];
<code>const</code> [y] = numbers;

consoleonsole.loge>.log(y);</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"[[1, 2, 3, 4, 5]]","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"[1, 2, 3, 4, 5]","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"1","isCorrect":true,"explanation":"Correct."},{"id":"o4","text":"[1]","isCorrect":false,"explanation":"Incorrect."}]',
      '1',
      'We can unpack values <code>from</code> arrays or properties <code>from</code> objects through destructuring. <code>For</code> example:

[a, b] = [1, 2];

<img src="https://i.imgur.com/ADFpVop.png" width="200">

The value <code>of</code> a is now 1, and the value <code>of</code> b is now 2. What we actually did <code>in</code> the question, is:

[y] = [1, 2, 3, 4, 5];

<img src="https://i.imgur.com/NzGkMNk.png" width="200">

<code>This</code> means that the value <code>of</code> y is equal to the first value <code>in</code> the <code>array</code>, which is the <code>number</code> 1. When we log y, 1 is returned.',
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
      '<pre><code><code>const</code> user = { name: ''Lydia'', age: 21 };
<code>const</code> admin = { admin: <code>true</code>, ...user };

consoleonsole.loge>.log(admin);</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"{ admin: <code>true</code>, user: { name: \\"Lydia\\", age: 21 } } age: 21 } }","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"{ admin: <code>true</code>, name: \\"Lydia\\", age: 21 }\\", age: 21 }","isCorrect":true,"explanation":"Correct."},{"id":"o3","text":"{ admin: <code>true</code>, user: [\\"Lydia\\", 21] }ydia\\", 21] }","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"{ admin: <code>true</code> }rue }","isCorrect":false,"explanation":"Incorrect."}]',
      '{ admin: <code>true</code>, name: "Lydia", age: 21 }", age: 21 }',
      'It''s possible to combine objects using the spread operator .... It lets you create copies <code>of</code> the key/value pairs <code>of</code> one <code>object</code>, and add them to another <code>object</code>. <code>In</code> <code>this</code> <code>case</code>, we create copies <code>of</code> the user <code>object</code>, and add them to the adminde><code>in</code> <code>object</code>. The adminde><code>in</code> <code>object</code> now contains the copied key/value pairs, which results <code>in</code> { admin: <code>true</code>, name: "Lydia", age: 21 } name: "Lydia", age: 21 }.',
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
      '<pre><code><code>const</code> person = { name: ''Lydia'' };

ObjectObject.definePropertyoperty(person, ''age'', { value: 21 });

consoleonsole.loge>.log(person);
consoleonsole.loge>.log(ObjectObject.keys.keys(person));</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"{ name: \\"Lydia\\", age: 21 }, [\\"name\\", \\"age\\"]","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"{ name: \\"Lydia\\", age: 21 }, [\\"name\\"]","isCorrect":true,"explanation":"Correct."},{"id":"o3","text":"{ name: \\"Lydia\\"}, [\\"name\\", \\"age\\"]","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"{ name: \\"Lydia\\"}, [\\"age\\"]","isCorrect":false,"explanation":"Incorrect."}]',
      '{ name: "Lydia", age: 21 }, ["name"]',
      'With the definePropertyde>eProperty method, we can add <code>new</code> properties to an <code>object</code>, or modify existing ones. When we add a property to an <code>object</code> using the definePropertyde>eProperty method, they are by <code>default</code> _not enumerable_. The <code>Object</code>.keysObject.keys.keys method returns all _enumerable_ property names <code>from</code> an <code>object</code>, <code>in</code> <code>this</code> <code>case</code> only "name".

Properties added using the definePropertyde>eProperty method are immutable by <code>default</code>. You can override <code>this</code> behavior using the writable, configurable and enumerable properties. <code>This</code> way, the definePropertyde>eProperty method gives you a lot more control over the properties you''re adding to an <code>object</code>.',
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
      '<pre><code><code>const</code> settings = {
  username: ''lydiahallie'',
  level: 19,
  health: 90,
};

<code>const</code> data = JSON.stringifyingify(settings, [''level'', ''health'']);
consoleonsole.loge>.log(data);</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"\\"{\\"level\\":19, \\"health\\":90}\\"","isCorrect":true,"explanation":"Correct."},{"id":"o2","text":"\\"{\\"username\\": \\"lydiahallie\\"}\\"","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"\\"[\\"level\\", \\"health\\"]\\"","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"\\"{\\"username\\": \\"lydiahallie\\", \\"level\\":19, \\"health\\":90}\\"","isCorrect":false,"explanation":"Incorrect."}]',
      '"{"level":19, "health":90}"',
      'The second argument <code>of</code> JSON.stringifyngifyingifyingde>ingify is the _replacer_. The replacer can either be a <code>function</code> or an <code>array</code>, and lets you control what and how the values should be stringde>ingified.

<code>If</code> the replacer is an _array_, only the property names included <code>in</code> the <code>array</code> will be added to the JSON stringde>ing. <code>In</code> <code>this</code> <code>case</code>, only the properties with the names "level" and "health" are included, "username" is excluded. data is now equal to "{"level":19, "health":90}".

<code>If</code> the replacer is a _function_, <code>this</code> <code>function</code> gets called on every property <code>in</code> the <code>object</code> you''re stringde>ingifying. The value returned <code>from</code> <code>this</code> <code>function</code> will be the value <code>of</code> the property when it''s added to the JSON stringde>ing. <code>If</code> the value is undefinede>ined, <code>this</code> property is excluded <code>from</code> the JSON stringde>ing.',
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
      '<pre><code><code>let</code> num = 10;

<code>const</code> increaseNumber = () => num++;
<code>const</code> increasePassedNumber = <code>number</code> => <code>number</code>++;

<code>const</code> num1 = increaseNumber();
<code>const</code> num2 = increasePassedNumber(num1);

consoleonsole.loge>.log(num1);
consoleonsole.loge>.log(num2);</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"10, 10","isCorrect":true,"explanation":"Correct."},{"id":"o2","text":"10, 11","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"11, 11","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"11, 12","isCorrect":false,"explanation":"Incorrect."}]',
      '10, 10',
      'The unary operator ++ _first returns_ the value <code>of</code> the operand, _then increments_ the value <code>of</code> the operand. The value <code>of</code> num1 is 10, since the increaseNumber <code>function</code> first returns the value <code>of</code> num, which is 10, and only increments the value <code>of</code> num afterward.

num2 is 10, since we passed num1 to the increasePassedNumber. numberumber is equal to 10(the value <code>of</code> num1). Again, the unary operator ++ _first returns_ the value <code>of</code> the operand, _then increments_ the value <code>of</code> the operand. The value <code>of</code> numberumber is 10, so num2 is equal to 10.',
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
      '<pre><code><code>const</code> value = { <code>number</code>: 10 };

<code>const</code> multiply = (x = { ...value }) => {
  consoleonsole.loge>.log((x.numbernumber *= 2));
};

multiply();
multiply();
multiply(value);
multiply(value);</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"20, 40, 80, 160","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"20, 40, 20, 40","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"20, 20, 20, 40","isCorrect":true,"explanation":"Correct."},{"id":"o4","text":"NaNe><code>NaN</code>, NaNe><code>NaN</code>, 20, 40","isCorrect":false,"explanation":"Incorrect."}]',
      '20, 20, 20, 40',
      '<code>In</code> ES6, we can initialize parameters with a <code>default</code> value. The value <code>of</code> the parameter will be the <code>default</code> value, <code>if</code> no other value has been passed to the <code>function</code>, or <code>if</code> the value <code>of</code> the parameter is "<code>undefined</code>"ined". <code>In</code> <code>this</code> <code>case</code>, we spread the properties <code>of</code> the value <code>object</code> into a <code>new</code> <code>object</code>, so x has the <code>default</code> value <code>of</code> { <code>number</code>: 10 }/: 10 }.

The <code>default</code> argument is evaluated at _call time_! Every time we call the <code>function</code>, a _new_ <code>object</code> is created. We invoke the multiply <code>function</code> the first two times without passing a value: x has the <code>default</code> value <code>of</code> { <code>number</code>: 10 }/: 10 }. We then log the multiplied value <code>of</code> that <code>number</code>, which is 20.

The third time we invoke multiply, we <code>do</code> pass an argument: the <code>object</code> called value. The *= operator is actually shorthand <code>for</code> x.<code>number</code> = x.<code>number</code> * 2ber = x.numbernumber * 2: we modify the value <code>of</code> x.numberumbernumber, and log the multiplied value 20.

The fourth time, we pass the value <code>object</code> again. x.numberumbernumber was previously modified to 20, so x.<code>number</code> *= 2number *= 2 logs 40.',
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
      '[1, 2, 3, 4].reduce((x, y) => consoleonsole.loge>.log(x, y));',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"1 2 and 3 3 and 6 4","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"1 2 and 2 3 and 3 4","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"1 <code>undefined</code> and 2 <code>undefined</code> and 3 <code>undefined</code> and 4 <code>undefined</code>","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"1 2 and <code>undefined</code> 3 and <code>undefined</code> 4","isCorrect":true,"explanation":"Correct."}]',
      '1 2 and <code>undefined</code> 3 and <code>undefined</code> 4',
      'The first argument that the reduce method receives is the _accumulator_, x <code>in</code> <code>this</code> <code>case</code>. The second argument is the _current value_, y. With the reduce method, we execute a callback <code>function</code> on every element <code>in</code> the <code>array</code>, which could ultimately result <code>in</code> one single value.

<code>In</code> <code>this</code> example, we are not returning any values, we are simply logging the values <code>of</code> the accumulator and the current value.

The value <code>of</code> the accumulator is equal to the previously returned value <code>of</code> the callback <code>function</code>. <code>If</code> you don''t pass the optional initialValuee>itialValue argument to the reduce method, the accumulator is equal to the first element on the first call.

On the first call, the accumulator (x) is 1, and the current value (y) is 2. We don''t <code>return</code> <code>from</code> the callback <code>function</code>, we log the accumulator, and the current values: 1 and 2 get logged.

<code>If</code> you don''t <code>return</code> a value <code>from</code> a <code>function</code>, it returns undefinede>ined. On the next call, the accumulator is undefinede>ined, and the current value is 3. undefinede>ined and 3 get logged.

On the fourth call, we again don''t <code>return</code> <code>from</code> the callback <code>function</code>. The accumulator is again undefinede>ined, and the current value is 4. undefinede>ined and 4 get logged.',
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
      'With which constructor can we successfully extend the Dog <code>class</code>?',
      '<pre><code><code>class</code> Dog {
  constructor(name) {
    <code>this</code>.name = name;
  }
};

<code>class</code> Labrador <code>extends</code> Dog {
  // 1
  constructor(name, size) {
    <code>this</code>.size = size;
  }
  // 2
  constructor(name, size) {
    <code>super</code>(name);
    <code>this</code>.size = size;
  }
  // 3
  constructor(size) {
    <code>super</code>(name);
    <code>this</code>.size = size;
  }
  // 4
  constructor(name, size) {
    <code>this</code>.name = name;
    <code>this</code>.size = size;
  }

};</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"1","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"2","isCorrect":true,"explanation":"Correct."},{"id":"o3","text":"3","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"4","isCorrect":false,"explanation":"Incorrect."}]',
      '2',
      '<code>In</code> a derived classde>ass, you cannot access the thisthis keyword before calling supersuper. <code>If</code> you <code>try</code> to <code>do</code> that, it will <code>throw</code> a <code>ReferenceError</code>: 1 and 4 would <code>throw</code> a reference <code>error</code>.

With the supersuper keyword, we call that parent classde>ass''s constructor with the given arguments. The parent''s constructor receives the name argument, so we need to pass name to supersuper.

The Labradore>dor classde>ass receives two arguments, name since it <code>extends</code> Dog, and size <code>as</code> an extra property on the Labradore>dor classde>ass. They both need to be passed to the constructor <code>function</code> on Labradore>dor, which is done correctly using constructor 2.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'classes', 'intermediate'],
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
      '<pre><code>// index.js
consoleonsole.loge>.log(''running index.js'');
<code>import</code> { sum } <code>from</code> ''./sum.js'';
consoleonsole.loge>.log(sum(1, 2));

// sum.js
consoleonsole.loge>.log(''running sum.js'');
<code>export</code> <code>const</code> sum = (a, b) => a + b;</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"running index.jse>.js, running sum.jse>.js, 3","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"running sum.jse>.js, running index.jse>.js, 3","isCorrect":true,"explanation":"Correct."},{"id":"o3","text":"running sum.jse>.js, 3, running index.jse>.js","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"running index.jse>.js, <code>undefined</code>, running sum.jse>.js","isCorrect":false,"explanation":"Incorrect."}]',
      'running sum.jse>.js, running index.jse>.js, 3',
      'With the importmport keyword, all imported modules are _pre-parsed_. <code>This</code> means that the imported modules get run _first_, and the code <code>in</code> the file that imports the module gets executed _after_.

<code>This</code> is a difference between require()ire() <code>in</code> CommonJS and importmport! With require()ire(), you can load dependencies on demand <code>while</code> the code is being run. <code>If</code> we had used require instead <code>of</code> importmport, running index.jse>g index.js, running sum.jsode>g sum.js, 3 would have been logged to the <code>console</code>.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'modules', 'intermediate'],
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
      '<pre><code>consoleonsole.loge>.log(<code>Number</code>(2) === <code>Number</code>(2));
consoleonsole.loge>.log(<code>Boolean</code>(<code>false</code>) === <code>Boolean</code>(<code>false</code>));
consoleonsole.loge>.log(<code>Symbol</code>(''foo'') === <code>Symbol</code>(''foo''));</code></pre>',
      'multiple-choice',
      'advanced',
      20,
      '[{"id":"o1","text":"truetrue, truetrue, falsefalse","isCorrect":true,"explanation":"Correct."},{"id":"o2","text":"falsefalse, truetrue, falsefalse","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"truetrue, falsefalse, truetrue","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"truetrue, truetrue, truetrue","isCorrect":false,"explanation":"Incorrect."}]',
      'truetrue, truetrue, falsefalse',
      'Every <code>Symbol</code> is entirely unique. The purpose <code>of</code> the argument passed to the <code>Symbol</code> is to give the <code>Symbol</code> a description. The value <code>of</code> the <code>Symbol</code> is not dependent on the passed argument. <code>As</code> we test equality, we are creating two entirely <code>new</code> symbols: the first <code>Symbol</code>(''foo'')(''foo''), and the second <code>Symbol</code>(''foo'')(''foo''). These two values are unique and not equal to each other, <code>Symbol</code>(''foo'') === <code>Symbol</code>(''foo'')<code>Symbol</code>(''foo'') returns falsefalse.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'basics', 'difficult'],
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
      '<pre><code><code>const</code> name = ''Lydia Hallie'';
consoleonsole.loge>.log(name.padStart(13));
consoleonsole.loge>.log(name.padStart(2));</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"\\"Lydia Hallie\\", \\"Lydia Hallie\\"","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"\\" Lydia Hallie\\", \\" Lydia Hallie\\" (\\"[13x whitespace]Lydia Hallie\\", \\"[2x whitespace]Lydia Hallie\\")","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"\\" Lydia Hallie\\", \\"Lydia Hallie\\" (\\"[1x whitespace]Lydia Hallie\\", \\"Lydia Hallie\\")","isCorrect":true,"explanation":"Correct."},{"id":"o4","text":"\\"Lydia Hallie\\", \\"Lyd\\",","isCorrect":false,"explanation":"Incorrect."}]',
      '" Lydia Hallie", "Lydia Hallie" ("[1x whitespace]Lydia Hallie", "Lydia Hallie")',
      'With the padStart method, we can add padding to the beginning <code>of</code> a <code>string</code>. The value passed to <code>this</code> method is the _total_ length <code>of</code> the <code>string</code> together with the padding. The <code>string</code> "Lydia Hallie" has a length <code>of</code> 12. name.padStart(13)t(13) inserts 1 space at the start <code>of</code> the <code>string</code>, because 12 + 1 is 13.

<code>If</code> the argument passed to the padStart method is smaller than the length <code>of</code> the <code>array</code>, no padding will be added.',
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
      'consoleonsole.loge>.log(''🥑'' + ''💻'');',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"\\"🥑💻\\"","isCorrect":true,"explanation":"Correct."},{"id":"o2","text":"257548","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"A <code>string</code> containing their code points","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"<code>Error</code>","isCorrect":false,"explanation":"Incorrect."}]',
      '"🥑💻"',
      'With the + operator, you can concatenate stringde>ings. <code>In</code> <code>this</code> <code>case</code>, we are concatenating the stringde>ing "🥑" with the stringde>ing "💻", resulting <code>in</code> "🥑💻".',
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
      'How can we log the values that are commented out after the consoleonsole.loge>.log statement?',
      '<pre><code><code>function</code>* startGame() {
  <code>const</code> answer = <code>yield</code> ''<code>Do</code> you love JavaScript?'';
  <code>if</code> (answer !== ''Yes'') {
    <code>return</code> "Oh wow... Guess we''re done here";
  }
  <code>return</code> ''JavaScript loves you back ❤️'';
}

<code>const</code> game = startGame();
consoleonsole.loge>.log(/* 1 */); // <code>Do</code> you love JavaScript?
consoleonsole.loge>.log(/* 2 */); // JavaScript loves you back ❤️</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"game.next(\\"Yes\\").value\\"Yes\\").value and game.next().valueode>e>next().value","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"game.next.value(\\"Yes\\").value(\\"Yes\\") and game.next.value()ode>.valuevalue()","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"game.next().valueode>e>next().value and game.next(\\"Yes\\").value\\"Yes\\").value","isCorrect":true,"explanation":"Correct."},{"id":"o4","text":"game.next.value()ode>.valuevalue() and game.next.value(\\"Yes\\").value(\\"Yes\\")","isCorrect":false,"explanation":"Incorrect."}]',
      'game.next().valueode>e>next().value and game.next("Yes").value"Yes").value',
      'A generator <code>function</code> "pauses" its execution when it sees the yieldyield keyword. First, we have to <code>let</code> the <code>function</code> <code>yield</code> the stringde>ing "<code>Do</code> you love JavaScript?", which can be done by calling game.next().valueode>e>next().value.

Every line is executed, until it finds the first yieldyield keyword. There is a yieldyield keyword on the first line within the <code>function</code>: the execution stops with the first <code>yield</code>! _This means that the variable answer is not defined yet!_

When we call game.next("Yes").value"Yes").value, the previous yieldyield is replaced with the value <code>of</code> the parameters passed to the next()ext() <code>function</code>, "Yes" <code>in</code> <code>this</code> <code>case</code>. The value <code>of</code> the variable answer is now equal to "Yes". The condition <code>of</code> the <code>if</code>-statement returns falsefalse, and JavaScript loves you back ❤️ gets logged.',
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
      'consoleonsole.loge>.log(<code>String</code>.rawHello\\nworld);',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"Hello world!","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"Hello <br />&nbsp; &nbsp; &nbsp;world","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"Hello\\\\nworld","isCorrect":true,"explanation":"Correct."},{"id":"o4","text":"Hello\\\\n <br /> &nbsp; &nbsp; &nbsp;world","isCorrect":false,"explanation":"Incorrect."}]',
      'Hello\\nworld',
      '<code>String</code>.rawgde>ing.raw returns a stringde>ing where the escapes (\\n, \\v, \\t etc.) are ignored! Backslashes can be an issue since you could end up with something like:

 <code>const</code> path = ode> path = C:\\Documents\\Projects\\table.html 

Which would result <code>in</code>:

<code>in</code>:

"C:DocumentsProjects able.html"

With <code>String</code>.rawgde>ing.raw, it would simply ignore the escape and print:

nt:

C:\\Documents\\Projects\\table.html

<code>In</code> <code>this</code> <code>case</code>, the <code>string</code> is ode> <code>case</code>, the stringde>ing is Hello\\nworld, which gets logged.',
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
      '<pre><code><code>async</code> <code>function</code> getData() {
  <code>return</code> <code>await</code> <code>Promise</code>.resolve(''I made it!'');
}

<code>const</code> data = getData();
consoleonsole.loge>.log(data);</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"\\"I made it!\\"","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"<code>Promise</code> {&lt;resolved&gt;: \\"I made it!\\"}I made it!\\"}","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"<code>Promise</code> {&lt;pending&gt;} {<pending>}","isCorrect":true,"explanation":"Correct."},{"id":"o4","text":"<code>undefined</code>","isCorrect":false,"explanation":"Incorrect."}]',
      '<code>Promise</code> {&lt;pending&gt;} {<pending>}',
      'An <code>async</code> <code>function</code> always returns a <code>promise</code>. The awaitawait still has to wait <code>for</code> the <code>promise</code> to resolve: a pending <code>promise</code> gets returned when we call getData()ata() <code>in</code> order to <code>set</code> data equal to it.

<code>If</code> we wanted to get access to the resolved value "I made it", we could have used the .then()hene>then() method on data:

data.then(res =&gt; <code>console</code>.log(res))consoleonsole.loge>.log(res))

<code>This</code> would''ve logged "I made it!"',
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
      '<pre><code><code>function</code> addToList(item, list) {
  <code>return</code> list.push(item);
}

<code>const</code> result = addToList(''apple'', [''banana'']);
consoleonsole.loge>.log(result);</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"[''apple'', ''banana'']","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"2","isCorrect":true,"explanation":"Correct."},{"id":"o3","text":"truetrue","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"<code>undefined</code>","isCorrect":false,"explanation":"Incorrect."}]',
      '2',
      'The .push()ushe>push() method returns the _length_ <code>of</code> the <code>new</code> <code>array</code>! Previously, the <code>array</code> contained one element (the <code>string</code> "banana") and had a length <code>of</code> 1. After adding the <code>string</code> "apple" to the <code>array</code>, the <code>array</code> contains two elements, and has a length <code>of</code> 2. <code>This</code> gets returned <code>from</code> the addToList <code>function</code>.

The push method modifies the original <code>array</code>. <code>If</code> you wanted to <code>return</code> the _array_ <code>from</code> the <code>function</code> rather than the _length <code>of</code> the array_, you should have returned list after pushing item to it.',
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
      '<pre><code><code>const</code> box = { x: 10, y: 20 };

ObjectObject.freezefreeze(box);

<code>const</code> shape = box;
shape.x = 100;

consoleonsole.loge>.log(shape);</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"{ x: 100, y: 20 }","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"{ x: 10, y: 20 }","isCorrect":true,"explanation":"Correct."},{"id":"o3","text":"{ x: 100 }","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"<code>ReferenceError</code>","isCorrect":false,"explanation":"Incorrect."}]',
      '{ x: 10, y: 20 }',
      '<code>Object</code>.freezeObject.freezefreeze makes it impossible to add, remove, or modify properties <code>of</code> an <code>object</code> (unless the property''s value is another <code>object</code>).

When we create the variable shape and <code>set</code> it equal to the frozen <code>object</code> box, shape also refers to a frozen <code>object</code>. You can check whether an <code>object</code> is frozen by using <code>Object</code>.isFrozende>.isFrozen. <code>In</code> <code>this</code> <code>case</code>, <code>Object</code>.isFrozen(shape)e>.isFrozen(shape) would <code>return</code> <code>true</code>, since the variable shape has a reference to a frozen <code>object</code>.

Since shape is frozen, and since the value <code>of</code> x is not an <code>object</code>, we cannot modify the property x. x is still equal to 10, and { x: 10, y: 20 } gets logged.',
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
      '<pre><code><code>const</code> { firstName: myName } = { firstName: ''Lydia'' };

consoleonsole.loge>.log(firstName);</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"\\"Lydia\\"","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"\\"myName\\"","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"<code>undefined</code>","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"<code>ReferenceError</code>","isCorrect":true,"explanation":"Correct."}]',
      '<code>ReferenceError</code>',
      'By using [destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) syntax we can unpack values <code>from</code> arrays, or properties <code>from</code> objects, into distinct variables:

<code>const</code> { firstName } = { firstName: ''Lydia'' };
// ES5 version:
// <code>var</code> firstName = { firstName: ''Lydia'' }.firstName;

consoleonsole.loge>.log(firstName); // "Lydia"

Also, a property can be unpacked <code>from</code> an <code>object</code> and assigned to a variable with a different name than the <code>object</code> property:

<code>const</code> { firstName: myName } = { firstName: ''Lydia'' };
// ES5 version:
// <code>var</code> myName = { firstName: ''Lydia'' }.firstName;

consoleonsole.loge>.log(myName); // "Lydia"
consoleonsole.loge>.log(firstName); // Uncaught <code>ReferenceError</code>: firstName is not defined

Therefore, firstName does not exist <code>as</code> a variable, thus attempting to access its value will raise a <code>ReferenceError</code>.

**Note:** Be aware <code>of</code> the <code>global</code> scope/ scope properties:

<code>const</code> { name: myName } = { name: ''Lydia'' };

consoleonsole.loge>.log(myName); // "lydia"
consoleonsole.loge>.log(name); // "" ----- Browser e.g. Chrome
consoleonsole.loge>.log(name); // <code>ReferenceError</code>: name is not defined  ----- NodeJS


Whenever Javascript is unable to find a variable within the _current scope_, it climbs up the [Scope chain](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch3.md) and searches <code>for</code> it and <code>if</code> it reaches the top-level scope, aka **<code>Global</code> scope**, and still doesn''t find it, it will <code>throw</code> a <code>ReferenceError</code>.

- <code>In</code> **Browsers** such <code>as</code> _Chrome_, name is a _deprecated <code>global</code> scope property_. <code>In</code> <code>this</code> example, the code is running inside _global scope_ and there is no user-defined local variable <code>for</code> name, therefore it searches the predefined _variables/properties_ <code>in</code> the <code>global</code> scope which is <code>in</code> the casede>ase <code>of</code> browsers, it searches through windowindowindow <code>object</code> and it will extract the [windowindow.name](https://developer.mozilla.org/en-US/docs/Web/API/Windowindow/name) value which is equal to an **empty stringde>ing**.

- <code>In</code> **NodeJS**, there is no such property on the globallobal <code>object</code>, thus attempting to access a non-existent variable will raise a [<code>ReferenceError</code>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Not_defined).',
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
      'Is <code>this</code> a pure <code>function</code>?',
      '<pre><code><code>function</code> sum(a, b) {
  <code>return</code> a + b;
}

- A: Yes
- B: No

<details><summary><b>Answer</b></summary>
<p>

#### Answer: A

A pure <code>function</code> is a <code>function</code> that _always_ returns the same result, <code>if</code> the same arguments are passed.

The sum <code>function</code> always returns the same result. <code>If</code> we pass 1 and 2, it will _always_ <code>return</code> 3 without side effects. <code>If</code> we pass 5 and 10, it will _always_ <code>return</code> 15, and so on. <code>This</code> is the definition <code>of</code> a pure <code>function</code>.

</p>
</details>

---

###### 78. What is the output?

<code>const</code> add = () => {
  <code>const</code> cache = {};
  <code>return</code> num => {
    <code>if</code> (num <code>in</code> cache) {
      <code>return</code> <code>From</code> cache! ${cache[num]}{cache[num]};
    } <code>else</code> {
      <code>const</code> result = num + 10;
      cache[num] = result;
      <code>return</code> Calculated! ${result};
    }
  };
};

<code>const</code> addFunction = add();
consoleonsole.loge>.log(addFunction(10));
consoleonsole.loge>.log(addFunction(10));
consoleonsole.loge>.log(addFunction(5 * 2));</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"Calculated! 20 Calculated! 20 Calculated! 20","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"Calculated! 20 <code>From</code> cache! 20e> cache! 20 Calculated! 20","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"Calculated! 20 <code>From</code> cache! 20e> cache! 20 <code>From</code> cache! 20e> cache! 20","isCorrect":true,"explanation":"Correct."},{"id":"o4","text":"Calculated! 20 <code>From</code> cache! 20e> cache! 20 ErrorError","isCorrect":false,"explanation":"Incorrect."}]',
      'Calculated! 20 <code>From</code> cache! 20e> cache! 20 <code>From</code> cache! 20e> cache! 20',
      'A pure <code>function</code> is a <code>function</code> that _always_ returns the same result, <code>if</code> the same arguments are passed.

The sum <code>function</code> always returns the same result. <code>If</code> we pass 1 and 2, it will _always_ <code>return</code> 3 without side effects. <code>If</code> we pass 5 and 10, it will _always_ <code>return</code> 15, and so on. <code>This</code> is the definition <code>of</code> a pure <code>function</code>.',
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
      'What is the output?',
      '<pre><code><code>const</code> myLifeSummedUp = [''☕'', ''💻'', ''🍷'', ''🍫''];

<code>for</code> (<code>let</code> item <code>in</code> myLifeSummedUp) {
  consoleonsole.loge>.log(item);
}

<code>for</code> (<code>let</code> item <code>of</code> myLifeSummedUp) {
  consoleonsole.loge>.log(item);
}</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"0 1 2 3 and \\"☕\\" \\"💻\\" \\"🍷\\" \\"🍫\\"","isCorrect":true,"explanation":"Correct."},{"id":"o2","text":"\\"☕\\" \\"💻\\" \\"🍷\\" \\"🍫\\" and \\"☕\\" \\"💻\\" \\"🍷\\" \\"🍫\\"","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"\\"☕\\" \\"💻\\" \\"🍷\\" \\"🍫\\" and 0 1 2 3","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"0 1 2 3 and {0: \\"☕\\", 1: \\"💻\\", 2: \\"🍷\\", 3: \\"🍫\\"}","isCorrect":false,"explanation":"Incorrect."}]',
      '0 1 2 3 and "☕" "💻" "🍷" "🍫"',
      'With a _for-in_ loop, we can iterate over **enumerable** properties. <code>In</code> an <code>array</code>, the enumerable properties are the "keys" <code>of</code> <code>array</code> elements, which are actually their indexes. You could see an <code>array</code> <code>as</code>:

{0: "☕", 1: "💻", 2: "🍷", 3: "🍫"}

Where the keys are the enumerable properties. 0 1 2 3 get logged.

With a _for-of_ loop, we can iterate over **iterables**. An <code>array</code> is an iterable. When we iterate over the <code>array</code>, the variable "item" is equal to the element it''s currently iterating over, "☕" "💻" "🍷" "🍫" get logged.',
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
      'What is the output?',
      '<pre><code><code>const</code> list = [1 + 2, 1 * 2, 1 / 2];
consoleonsole.loge>.log(list);</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"[\\"1 + 2\\", \\"1 * 2\\", \\"1 / 2\\"]","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"[\\"12\\", 2, 0.5]","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"[3, 2, 0.5]","isCorrect":true,"explanation":"Correct."},{"id":"o4","text":"[1, 1, 1]","isCorrect":false,"explanation":"Incorrect."}]',
      '[3, 2, 0.5]',
      '<code>Array</code> elements can hold any value. Numbers, strings, objects, other arrays, <code>null</code>, <code>boolean</code> values, <code>undefined</code>, and other expressions such <code>as</code> dates, functions, and calculations.

The element will be equal to the returned value. 1 + 2 returns 3, 1 * 2 returns 2, and 1 / 2 returns 0.5.',
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
      'What is the output?',
      '<pre><code><code>function</code> sayHi(name) {
  <code>return</code> Hi there, ${name};
}

consoleonsole.loge>.log(sayHi());</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"Hi there,","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"Hi there, <code>undefined</code>","isCorrect":true,"explanation":"Correct."},{"id":"o3","text":"Hi there, nullnull","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"<code>ReferenceError</code>","isCorrect":false,"explanation":"Incorrect."}]',
      'Hi there, <code>undefined</code>',
      'By <code>default</code>, arguments have the value <code>of</code> <code>undefined</code>, unless a value has been passed to the <code>function</code>. <code>In</code> <code>this</code> <code>case</code>, we didn''t pass a value <code>for</code> the name argument. name is equal to <code>undefined</code> which gets logged.

<code>In</code> ES6, we can overwrite <code>this</code> <code>default</code> <code>undefined</code> value with <code>default</code> parameters. <code>For</code> example:

<code>function</code> sayHi(name = "Lydia") { ... }ia") { ... }

<code>In</code> <code>this</code> <code>case</code>, <code>if</code> we didn''t pass a value or <code>if</code> we passed <code>undefined</code>, name would always be equal to the <code>string</code> Lydia',
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
      'What is the output?',
      '<pre><code><code>var</code> status = ''😎'';

<code>setTimeout</code>(() => {
  <code>const</code> status = ''😍'';

  <code>const</code> data = {
    status: ''🥑'',
    getStatus() {
      <code>return</code> <code>this</code>.status;
    },
  };

  consoleonsole.loge>.log(data.getStatusStatus());
  consoleonsole.loge>.log(data.getStatus.call(<code>this</code>));
}, 0);</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"\\"🥑\\" and \\"😍\\"","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"\\"🥑\\" and \\"😎\\"","isCorrect":true,"explanation":"Correct."},{"id":"o3","text":"\\"😍\\" and \\"😎\\"","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"\\"😎\\" and \\"😎\\"","isCorrect":false,"explanation":"Incorrect."}]',
      '"🥑" and "😎"',
      'The value <code>of</code> the thisthis keyword is dependent on where you use it. <code>In</code> a **method**, like the getStatus method, the thisthis keyword refers to _the <code>object</code> that the method belongs to_. The method belongs to the data <code>object</code>, so thisthis refers to the data <code>object</code>. When we log <code>this</code>.status.status, the status property on the data <code>object</code> gets logged, which is "🥑".

With the call method, we can change the <code>object</code> to which the thisthis keyword refers. <code>In</code> **functions**, the thisthis keyword refers to the _the <code>object</code> that the <code>function</code> belongs to_. We declared the setTimeoutmeout <code>function</code> on the _global object_, so within the setTimeoutmeout <code>function</code>, the thisthis keyword refers to the _global object_. On the <code>global</code> <code>object</code>, there is a variable called _status_ with the value <code>of</code> "😎". When logging <code>this</code>.status.status, "😎" gets logged.',
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
      'What is the output?',
      '<pre><code><code>const</code> person = {
  name: ''Lydia'',
  age: 21,
};

<code>let</code> city = person.city;
city = ''Amsterdam'';

consoleonsole.loge>.log(person);</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"{ name: \\"Lydia\\", age: 21 }","isCorrect":true,"explanation":"Correct."},{"id":"o2","text":"{ name: \\"Lydia\\", age: 21, city: \\"Amsterdam\\" }","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"{ name: \\"Lydia\\", age: 21, city: <code>undefined</code> }ned }","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"\\"Amsterdam\\"","isCorrect":false,"explanation":"Incorrect."}]',
      '{ name: "Lydia", age: 21 }',
      'We <code>set</code> the variable city equal to the value <code>of</code> the property called city on the person <code>object</code>. There is no property on <code>this</code> <code>object</code> called city, so the variable city has the value <code>of</code> <code>undefined</code>.

Note that we are _not_ referencing the person <code>object</code> itself! We simply <code>set</code> the variable city equal to the current value <code>of</code> the city property on the person <code>object</code>.

Then, we <code>set</code> city equal to the <code>string</code> "Amsterdam". <code>This</code> doesn''t change the person <code>object</code>: there is no reference to that <code>object</code>.

When logging the person <code>object</code>, the unmodified <code>object</code> gets returned.',
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
      'What is the output?',
      '<pre><code><code>function</code> checkAge(age) {
  <code>if</code> (age < 18) {
    <code>const</code> message = "Sorry, you''re too young.";
  } <code>else</code> {
    <code>const</code> message = "Yay! You''re old enough!";
  }

  <code>return</code> message;
}

consoleonsole.loge>.log(checkAge(21));</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"\\"Sorry, you''re too young.\\"","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"\\"Yay! You''re old enough!\\"","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"<code>ReferenceError</code>","isCorrect":true,"explanation":"Correct."},{"id":"o4","text":"<code>undefined</code>","isCorrect":false,"explanation":"Incorrect."}]',
      '<code>ReferenceError</code>',
      'Variables with the constconst and letlet keywords are _block-scoped_. A block is anything between curly brackets ({ }). <code>In</code> <code>this</code> <code>case</code>, the curly brackets <code>of</code> the <code>if</code>/<code>else</code> statements. You cannot reference a variable outside <code>of</code> the block it''s declared <code>in</code>, a <code>ReferenceError</code> gets thrown.',
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
      'What kind <code>of</code> information would get logged?',
      '<pre><code>fetch(''https://www.website.com/api/user/1'')
  .then(res => res.jsone>json())
  .then(res => consoleonsole.loge>.log(res));</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"The result <code>of</code> the fetch method.","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"The result <code>of</code> the second invocation <code>of</code> the fetch method.","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"The result <code>of</code> the callback <code>in</code> the previous .then()hene>then().","isCorrect":true,"explanation":"Correct."},{"id":"o4","text":"It would always be <code>undefined</code>.","isCorrect":false,"explanation":"Incorrect."}]',
      'The result <code>of</code> the callback <code>in</code> the previous .then()hene>then().',
      'The value <code>of</code> res <code>in</code> the second .then.then is equal to the returned value <code>of</code> the previous .then.then. You can keep chaining .then.thens like <code>this</code>, where the value is passed to the next handler.',
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
      'Which option is a way to <code>set</code> hasNamesName equal to truetrue, provided you cannot pass truetrue <code>as</code> an argument?',
      '<pre><code><code>function</code> getName(name) {
  <code>const</code> hasName = //
}</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"!!name","isCorrect":true,"explanation":"Correct."},{"id":"o2","text":"name","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"<code>new</code> <code>Boolean</code>(name)<code>Boolean</code>(name)","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"name.lengthength","isCorrect":false,"explanation":"Incorrect."}]',
      '!!name',
      'With !!name, we determine whether the value <code>of</code> name is truthy or falsy. <code>If</code> the name is truthy, which we want to test <code>for</code>, !name returns falsefalse. !falsefalse (which is what !!name practically is) returns truetrue.

By setting hasName equal to name, you <code>set</code> hasName equal to whatever value you passed to the getName <code>function</code>, not the <code>boolean</code> value truetrue.

<code>new</code> <code>Boolean</code>(<code>true</code>)<code>Boolean</code>(<code>true</code>) returns an <code>object</code> wrapper, not the <code>boolean</code> value itself.

name.lengthength returns the length <code>of</code> the passed argument, not whether it''s truetrue.',
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
      'consoleonsole.loge>.log(''I want pizza''[0]);',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"\\"\\"\\"","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"\\"I\\"","isCorrect":true,"explanation":"Correct."},{"id":"o3","text":"<code>SyntaxError</code>","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"<code>undefined</code>","isCorrect":false,"explanation":"Incorrect."}]',
      '"I"',
      '<code>In</code> order to get a character at a specific index <code>of</code> a stringde>ing, you can use bracket notation. The first character <code>in</code> the stringde>ing has index 0, and so on. <code>In</code> <code>this</code> <code>case</code>, we want to get the element with index 0, the character "I'', which gets logged.

Note that <code>this</code> method is not supported <code>in</code> IE7 and below. <code>In</code> that <code>case</code>, use .charAt()rAtcharAt().',
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
      '<pre><code><code>function</code> sum(num1, num2 = num1) {
  consoleonsole.loge>.log(num1 + num2);
}

sum(10);</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"NaNe><code>NaN</code>","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"20","isCorrect":true,"explanation":"Correct."},{"id":"o3","text":"<code>ReferenceError</code>","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"<code>undefined</code>","isCorrect":false,"explanation":"Incorrect."}]',
      '20',
      'You can <code>set</code> a <code>default</code> parameter''s value equal to another parameter <code>of</code> the <code>function</code>, <code>as</code> long <code>as</code> they''ve been defined _before_ the <code>default</code> parameter. We pass the value 10 to the sum <code>function</code>. <code>If</code> the sum <code>function</code> only receives 1 argument, it means that the value <code>for</code> num2 is not passed, and the value <code>of</code> num1 is equal to the passed value 10 <code>in</code> <code>this</code> casede>ase. The <code>default</code> value <code>of</code> num2 is the value <code>of</code> num1, which is 10. num1 + num2 returns 20.

<code>If</code> you''re trying to <code>set</code> a <code>default</code> parameter''s value equal to a parameter that is defined _after_ (to the right), the parameter''s value hasn''t been initialized yet, which will <code>throw</code> an <code>error</code>.',
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
      '<pre><code>// module.js
<code>export</code> defaultefault () => ''Hello world'';
<code>export</code> <code>const</code> name = ''Lydia'';

// index.js
<code>import</code> * <code>as</code> data <code>from</code> ''./module'';

consoleonsole.loge>.log(data);</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"{ <code>default</code>: <code>function</code> <code>default</code>(), name: \\"Lydia\\" }defaultefault(), name: \\"Lydia\\" }","isCorrect":true,"explanation":"Correct."},{"id":"o2","text":"{ <code>default</code>: <code>function</code> <code>default</code>() }nction defaultefault() }","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"{ <code>default</code>: \\"Hello world\\", name: \\"Lydia\\" }e: \\"Lydia\\" }","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"<code>Global</code> <code>object</code> <code>of</code> module.jse>.js","isCorrect":false,"explanation":"Incorrect."}]',
      '{ <code>default</code>: <code>function</code> <code>default</code>(), name: "Lydia" }defaultefault(), name: "Lydia" }',
      'With the <code>import</code> * <code>as</code> namee> * <code>as</code> name syntax, we <code>import</code> _all exports_ <code>from</code> the module.jse>.js file into the index.jse>.js file <code>as</code> a <code>new</code> <code>object</code> called data is created. <code>In</code> the module.jse>.js file, there are two exports: the <code>default</code> <code>export</code>, and a named <code>export</code>. The <code>default</code> <code>export</code> is a <code>function</code> that returns the <code>string</code> "Hello World", and the named <code>export</code> is a variable called name which has the value <code>of</code> the <code>string</code> "Lydia".

The data <code>object</code> has a defaultfault property <code>for</code> the <code>default</code> <code>export</code>, other properties have the names <code>of</code> the named exports and their corresponding values.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'modules', 'intermediate'],
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
      '<pre><code><code>class</code> Person {
  constructor(name) {
    <code>this</code>.name = name;
  }
}

<code>const</code> member = <code>new</code> Person(''John'');
consoleonsole.loge>.log(<code>typeof</code> member);</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"\\"<code>class</code>\\"lass\\"","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"\\"<code>function</code>\\"tion\\"","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"\\"<code>object</code>\\"ject\\"","isCorrect":true,"explanation":"Correct."},{"id":"o4","text":"\\"<code>string</code>\\"ring\\"","isCorrect":false,"explanation":"Incorrect."}]',
      '"<code>object</code>"ject"',
      'Classes are syntactical sugar <code>for</code> <code>function</code> constructors. The equivalent <code>of</code> the Person classde>ass <code>as</code> a <code>function</code> constructor would be:

<code>function</code> Person(name) {
  <code>this</code>.name = name;
}

Calling a <code>function</code> constructor with newe><code>new</code> results <code>in</code> the creation <code>of</code> an instance <code>of</code> Person, typeofypeofode><code>of</code> keyword returns "<code>object</code>"ject" <code>for</code> an instance. <code>typeof</code> memberode><code>of</code> member returns "<code>object</code>"ject".',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'classes', 'intermediate'],
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
      '<pre><code><code>let</code> newList = [1, 2, 3].push(4);

consoleonsole.loge>.log(newList.push(5));</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"[1, 2, 3, 4, 5]","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"[1, 2, 3, 5]","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"[1, 2, 3, 4]","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"ErrorError","isCorrect":true,"explanation":"Correct."}]',
      'ErrorError',
      'The .push.push method returns the _new length_ <code>of</code> the <code>array</code>, not the <code>array</code> itself! By setting newListwList equal to [1, 2, 3].push(4)sh(4), we <code>set</code> newListwList equal to the <code>new</code> length <code>of</code> the <code>array</code>: 4.

Then, we <code>try</code> to use the .push.push method on newListwList. Since newListwList is the numerical value 4, we cannot use the .push.push method: a <code>TypeError</code> is thrown.',
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
      '<pre><code><code>function</code> giveLydiaPizza() {
  <code>return</code> ''Here is pizza!'';
}

<code>const</code> giveLydiaChocolate = () =>
  "Here''s chocolate... now go hit the gym already.";

consoleonsole.loge>.log(giveLydiaPizza.prototype);
consoleonsole.loge>.log(giveLydiaChocolate.prototype);</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"{ constructor: ...} { constructor: ...}","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"{} { constructor: ...}","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"{ constructor: ...} {}","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"{ constructor: ...} <code>undefined</code>","isCorrect":true,"explanation":"Correct."}]',
      '{ constructor: ...} <code>undefined</code>',
      'Regular functions, such <code>as</code> the giveLydiaPizza <code>function</code>, have a prototype property, which is an <code>object</code> (prototype <code>object</code>) with a constructor property. Arrow functions however, such <code>as</code> the giveLydiaChocolate <code>function</code>, <code>do</code> not have <code>this</code> prototype property. <code>undefined</code> gets returned when trying to access the prototype property using giveLydiaChocolate.prototypeotype.',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'prototypes', 'intermediate'],
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

<code>for</code> (<code>const</code> [x, y] <code>of</code> ObjectObject.entriesntries(person)) {
  consoleonsole.loge>.log(x, y);
}</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"name Lydia and age 21","isCorrect":true,"explanation":"Correct."},{"id":"o2","text":"[\\"name\\", \\"Lydia\\"] and [\\"age\\", 21]","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"[\\"name\\", \\"age\\"] and <code>undefined</code>","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"ErrorError","isCorrect":false,"explanation":"Incorrect."}]',
      'name Lydia and age 21',
      '<code>Object</code>.entries(person)ct.entriesntries(person) returns an <code>array</code> <code>of</code> nested arrays, containing the keys and objects:

[ [ ''name'', ''Lydia'' ], [ ''age'', 21 ] ]

Using the <code>for</code>-ofor-<code>of</code> loop, we can iterate over each element <code>in</code> the <code>array</code>, the subarrays <code>in</code> <code>this</code> <code>case</code>. We can destructure the subarrays instantly <code>in</code> the <code>for</code>-<code>of</code> loop, using <code>const</code> [x, y] [x, y]. x is equal to the first element <code>in</code> the subarray, y is equal to the second element <code>in</code> the subarray.

The first subarray is [ "name", "Lydia" ], with x equal to "name", and y equal to "Lydia", which get logged.
The second subarray is [ "age", 21 ], with x equal to "age", and y equal to 21, which get logged.',
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
      '<pre><code><code>function</code> getItems(fruitList, ...args, favoriteFruit) {
  <code>return</code> [...fruitList, ...args, favoriteFruit]
}

getItems(["banana", "apple"], "pear", "orange")</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"[\\"banana\\", \\"apple\\", \\"pear\\", \\"orange\\"]","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"[[\\"banana\\", \\"apple\\"], \\"pear\\", \\"orange\\"]","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"[\\"banana\\", \\"apple\\", [\\"pear\\"], \\"orange\\"]","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"<code>SyntaxError</code>","isCorrect":true,"explanation":"Correct."}]',
      '<code>SyntaxError</code>',
      '...args.args is a rest parameter. The rest parameter''s value is an <code>array</code> containing all remaining arguments, **and can only be the last parameter**! <code>In</code> <code>this</code> example, the rest parameter was the second parameter. <code>This</code> is not possible, and will <code>throw</code> a syntax <code>error</code>.

<code>function</code> getItems(fruitList, favoriteFruit, ...args) {
  <code>return</code> [...fruitList, ...args, favoriteFruit];
}

getItems([''banana'', ''apple''], ''pear'', ''orange'');

The above example works. <code>This</code> returns the <code>array</code> [ ''banana'', ''apple'', ''orange'', ''pear'' ]',
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
      'What''s the output?',
      '<pre><code><code>function</code> nums(a, b) {
  <code>if</code> (a > b) consoleonsole.loge>.log(''a is bigger'');
  <code>else</code> consoleonsole.loge>.log(''b is bigger'');
  <code>return</code>
  a + b;
}

consoleonsole.loge>.log(nums(4, 2));
consoleonsole.loge>.log(nums(1, 2));</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"a is bigger, 6 and b is bigger, 3","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"a is bigger, <code>undefined</code> and b is bigger, <code>undefined</code>","isCorrect":true,"explanation":"Correct."},{"id":"o3","text":"<code>undefined</code> and <code>undefined</code>","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"<code>SyntaxError</code>","isCorrect":false,"explanation":"Incorrect."}]',
      'a is bigger, <code>undefined</code> and b is bigger, <code>undefined</code>',
      '<code>In</code> JavaScript, we don''t _have_ to write the semicolon (;) explicitly, however the JavaScript engine still adds them after statements. <code>This</code> is called **Automatic Semicolon Insertion**. A statement can <code>for</code> example be variables, or keywords like throwthrow, returneturn, breakbreak, etc.

Here, we wrote a returneturn statement, and another value a + b on a _new line_. However, since it''s a <code>new</code> line, the engine doesn''t know that it''s actually the value that we wanted to <code>return</code>. Instead, it automatically added a semicolon after returneturn. You could see <code>this</code> <code>as</code>:

<code>return</code>;
a + b;

<code>This</code> means that a + b is never reached, since a <code>function</code> stops running after the returneturn keyword. <code>If</code> no value gets returned, like here, the <code>function</code> returns <code>undefined</code>. Note that there is no automatic insertion after <code>if</code>/<code>else</code>/<code>else</code> statements!',
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
      '<pre><code><code>class</code> Person {
  constconstructor() {
    <code>this</code>.name = ''Lydia'';
  }
}

Person = <code>class</code> AnotherPerson {
  constconstructor() {
    <code>this</code>.name = ''Sarah'';
  }
};

<code>const</code> member = <code>new</code> Person();
consoleonsole.loge>.log(member.name);</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"\\"Lydia\\"","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"\\"Sarah\\"","isCorrect":true,"explanation":"Correct."},{"id":"o3","text":"<code>Error</code>: cannot redeclare Personclare Person","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"<code>SyntaxError</code>","isCorrect":false,"explanation":"Incorrect."}]',
      '"Sarah"',
      'We can <code>set</code> classes equal to other classes/<code>function</code> constructors. <code>In</code> <code>this</code> <code>case</code>, we <code>set</code> Person equal to AnotherPerson. The name on <code>this</code> constructor is Sarah, so the name property on the <code>new</code> Person instance member is "Sarah".',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'classes', 'intermediate'],
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
      '<pre><code><code>const</code> info = {
  [<code>Symbol</code>(''a'')]: ''b'',
};

consoleonsole.loge>.log(info);
consoleonsole.loge>.log(ObjectObject.keys.keys(info));</code></pre>',
      'multiple-choice',
      'advanced',
      20,
      '[{"id":"o1","text":"{<code>Symbol</code>(''a''): ''b''}(''a''): ''b''} and [\\"{<code>Symbol</code>(''a'')\\"](''a'')\\"]","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"{} and []","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"{ a: \\"b\\" } and [\\"a\\"]","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"{<code>Symbol</code>(''a''): ''b''}(''a''): ''b''} and []","isCorrect":true,"explanation":"Correct."}]',
      '{<code>Symbol</code>(''a''): ''b''}(''a''): ''b''} and []',
      'A <code>Symbol</code> is not _enumerable_. The ObjectObject.keys.keys method returns all _enumerable_ key properties on an <code>object</code>. The <code>Symbol</code> won''t be visible, and an empty <code>array</code> is returned. When logging the entire <code>object</code>, all properties will be visible, even non-enumerable ones.

<code>This</code> is one <code>of</code> the many qualities <code>of</code> a <code>symbol</code>: besides representing an entirely unique value (which prevents accidental name collision on objects, <code>for</code> example when working with 2 libraries that want to add properties to the same <code>object</code>), you can also "hide" properties on objects <code>this</code> way (although not entirely. You can still access symbols using the <code>Object</code>.getOwnPropertySymbols()nPropertySymbolsymbols()bols() method).',
      NULL,
      ARRAY['Consider JavaScript execution context and behavior', 'Think about scope, hoisting, and closures', 'Remember ES6+ features and their differences <code>from</code> ES5'],
      ARRAY['javascript', 'basics', 'difficult'],
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
      '<pre><code><code>const</code> getList = ([x, ...y]) => [x, y]
<code>const</code> getUser = user => { name: user.name, age: user.age }

<code>const</code> list = [1, 2, 3, 4]
<code>const</code> user = { name: "Lydia", age: 21 }

consoleonsole.loge>.log(getList(list))
consoleonsole.loge>.log(getUser(user))</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"[1, [2, 3, 4]] and <code>SyntaxError</code>","isCorrect":true,"explanation":"Correct."},{"id":"o2","text":"[1, [2, 3, 4]] and { name: \\"Lydia\\", age: 21 }","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"[1, 2, 3, 4] and { name: \\"Lydia\\", age: 21 }","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"ErrorError and { name: \\"Lydia\\", age: 21 }","isCorrect":false,"explanation":"Incorrect."}]',
      '[1, [2, 3, 4]] and <code>SyntaxError</code>',
      'The getList <code>function</code> receives an <code>array</code> <code>as</code> its argument. Between the parentheses <code>of</code> the getList <code>function</code>, we destructure <code>this</code> <code>array</code> right away. You could see <code>this</code> <code>as</code>:

[x, ...y] = [1, 2, 3, 4][1, 2, 3, 4]

With the rest parameter ...yde>.y, we put all "remaining" arguments <code>in</code> an <code>array</code>. The remaining arguments are 2, 3 and 4 <code>in</code> <code>this</code> casede>ase. The value <code>of</code> y is an <code>array</code>, containing all the rest parameters. The value <code>of</code> x is equal to 1 <code>in</code> <code>this</code> casede>ase, so when we log [x, y], [1, [2, 3, 4]] gets logged.

The getUser <code>function</code> receives an <code>object</code>. With arrow functions, we don''t _have_ to write curly brackets <code>if</code> we just <code>return</code> one value. However, <code>if</code> you want to instantly <code>return</code> an _object_ <code>from</code> an arrow <code>function</code>, you have to write it between parentheses, otherwise everything between the two braces will be interpreted <code>as</code> a block statement. <code>In</code> <code>this</code> casede>ase the code between the braces is not a valid JavaScript code, so a <code>SyntaxError</code> gets thrown. 

The following <code>function</code> would have returned an <code>object</code>:

<code>const</code> getUser = user =&gt; ({ name: user.name, age: user.age }), age: user.age })',
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
      'What''s the output?',
      '<pre><code><code>const</code> name = ''Lydia'';

consoleonsole.loge>.log(name());</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"<code>SyntaxError</code>","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"<code>ReferenceError</code>","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"<code>TypeError</code>","isCorrect":true,"explanation":"Correct."},{"id":"o4","text":"<code>undefined</code>","isCorrect":false,"explanation":"Incorrect."}]',
      '<code>TypeError</code>',
      'The variable name holds the value <code>of</code> a <code>string</code>, which is not a <code>function</code>, and thus cannot be invoked.

TypeErrors get thrown when a value is not <code>of</code> the expected type. JavaScript expected name to be a <code>function</code> since we''re trying to invoke it. It was a <code>string</code> however, so a <code>TypeError</code> gets thrown: name is not a <code>function</code>!

SyntaxErrors get thrown when you''ve written something that isn''t valid JavaScript, <code>for</code> example when you''ve written the word returneturn <code>as</code> retrun.
ReferenceErrors get thrown when JavaScript isn''t able to find a reference to a value that you''re trying to access.',
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
      'What''s the value <code>of</code> output?',
      '<pre><code>// 🎉✨ <code>This</code> is my 100th question! ✨🎉

<code>const</code> output = ${[] &amp;&amp; ''Im''}possible!
You should${'''' &amp;&amp; n''t} see a therapist after so much JavaScript lol;</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"possible! You should see a therapist after so much JavaScript lol","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"Impossible! You should see a therapist after so much JavaScript lol","isCorrect":true,"explanation":"Correct."},{"id":"o3","text":"possible! You shouldn''t see a therapist after so much JavaScript lol","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"Impossible! You shouldn''t see a therapist after so much JavaScript lol","isCorrect":false,"explanation":"Incorrect."}]',
      'Impossible! You should see a therapist after so much JavaScript lol',
      '[] is a truthy value. With the &amp;&amp; operator, the right-hand value will be returned <code>if</code> the left-hand value is a truthy value. <code>In</code> <code>this</code> <code>case</code>, the left-hand value [] is a truthy value, so "Im'' gets returned.

"" is a falsy value. <code>If</code> the left-hand value is falsy, nothing gets returned. n''t doesn''t get returned.',
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
      'What''s the value <code>of</code> output?',
      '<pre><code><code>const</code> one = <code>false</code> || {} || <code>null</code>;
<code>const</code> two = <code>null</code> || <code>false</code> || '''';
<code>const</code> three = [] || 0 || <code>true</code>;

consoleonsole.loge>.log(one, two, three);</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"falsefalse nullnull []","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"nullnull \\"\\" truetrue","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"{} \\"\\" []","isCorrect":true,"explanation":"Correct."},{"id":"o4","text":"nullnull nullnull truetrue","isCorrect":false,"explanation":"Incorrect."}]',
      '{} "" []',
      'With the || operator, we can <code>return</code> the first truthy operand. <code>If</code> all values are falsy, the last operand gets returned.

(<code>false</code> || {} || <code>null</code>) {} || <code>null</code>): the empty <code>object</code> {} is a truthy value. <code>This</code> is the first (and only) truthy value, which gets returned. one is equal to {}.

(<code>null</code> || <code>false</code> || "")<code>false</code> || ""): all operands are falsy values. <code>This</code> means that the last operand, "" gets returned. two is equal to "".

([] || 0 || ""): the empty <code>array</code>[] is a truthy value. <code>This</code> is the first truthy value, which gets returned. three is equal to [].',
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
      'What''s the value <code>of</code> output?',
      '<pre><code><code>const</code> myPromise = () => <code>Promise</code>.resolve(''I have resolved!'');

<code>function</code> firstFunction() {
  myPromise()mise().then(res => consoleonsole.loge>.log(res));
  consoleonsole.loge>.log(''second'');
}

<code>async</code> <code>function</code> secondFunction() {
  consoleonsole.loge>.log(<code>await</code> myPromise()mise());
  consoleonsole.loge>.log(''second'');
}

firstFunction();
secondFunction();</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"I have resolved!, second and I have resolved!, second","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"second, I have resolved! and second, I have resolved!","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"I have resolved!, second and second, I have resolved!","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"second, I have resolved! and I have resolved!, second","isCorrect":true,"explanation":"Correct."}]',
      'second, I have resolved! and I have resolved!, second',
      'With a <code>promise</code>, we basically say _I want to execute <code>this</code> <code>function</code>, but I''ll put it aside <code>for</code> now <code>while</code> it''s running since <code>this</code> might take a <code>while</code>. Only when a certain value is resolved (or rejected), and when the call stack is empty, I want to use <code>this</code> value._

We can get <code>this</code> value with both .then.then and the awaitawait keywords <code>in</code> an asyncasync <code>function</code>. Although we can get a <code>promise</code>''s value with both .then.then and awaitawait, they work a bit differently.

<code>In</code> the firstFunction, we (sort <code>of</code>) put the myPromise <code>function</code> aside <code>while</code> it was running, but continued running the other code, which is <code>console</code>.log(''second'')sole.loge>.log(''second'') <code>in</code> <code>this</code> <code>case</code>. Then, the <code>function</code> resolved with the stringde>ing I have resolved, which then got logged after it saw that the callstack was empty.

With the <code>await</code> keyword <code>in</code> secondFunction, we literally pause the execution <code>of</code> an <code>async</code> <code>function</code> until the value has been resolved before moving to the next line.

<code>This</code> means that it waited <code>for</code> the myPromise to resolve with the value I have resolved, and only once that happened, we moved to the next line: second got logged.',
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
      'What''s the value <code>of</code> output?',
      '<pre><code><code>const</code> <code>set</code> = <code>new</code> Setde><code>Set</code>();

<code>set</code>.add(1);
<code>set</code>.add(''Lydia'');
<code>set</code>.add({ name: ''Lydia'' });

<code>for</code> (<code>let</code> item <code>of</code> <code>set</code>) {
  consoleonsole.loge>.log(item + 2);
}</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"3, NaNe><code>NaN</code>, NaNe><code>NaN</code>","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"3, 7, NaNe><code>NaN</code>","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"3, Lydia2, [<code>object</code> <code>Object</code>]2de> <code>Object</code>]2","isCorrect":true,"explanation":"Correct."},{"id":"o4","text":"\\"12\\", Lydia2, [<code>object</code> <code>Object</code>]2de> <code>Object</code>]2","isCorrect":false,"explanation":"Incorrect."}]',
      '3, Lydia2, [<code>object</code> <code>Object</code>]2de> <code>Object</code>]2',
      'The + operator is not only used <code>for</code> adding numerical values, but we can also use it to concatenate stringde>ings. Whenever the JavaScript engine sees that one or more values are not a <code>number</code>, it coerces the <code>number</code> into a stringde>ing.

The first one is 1, which is a numerical value. 1 + 2 returns the <code>number</code> 3.

However, the second one is a stringde>ing "Lydia". "Lydia" is a stringde>ing and 2 is a <code>number</code>: 2 gets coerced into a stringde>ing. "Lydia" and "2" get concatenated, which results <code>in</code> the stringde>ing "Lydia2".

{ name: "Lydia" } is an <code>object</code>. Neither a <code>number</code> nor an <code>object</code> is a stringde>ing, so it stringde>ingifies both. Whenever we stringde>ingify a regular <code>object</code>, it becomes "[<code>object</code> <code>Object</code>]"de> <code>Object</code>]". "[<code>object</code> <code>Object</code>]"de> <code>Object</code>]" concatenated with "2" becomes "[<code>object</code> <code>Object</code>]2"e> <code>Object</code>]2".',
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
      'What''s its value?',
      '<code>Promise</code>.resolve(5);',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"5","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"<code>Promise</code> {&lt;pending&gt;: 5}pending>: 5}","isCorrect":false,"explanation":"Incorrect."},{"id":"o3","text":"<code>Promise</code> {&lt;fulfilled&gt;: 5}lfilled>: 5}","isCorrect":true,"explanation":"Correct."},{"id":"o4","text":"ErrorError","isCorrect":false,"explanation":"Incorrect."}]',
      '<code>Promise</code> {&lt;fulfilled&gt;: 5}lfilled>: 5}',
      'We can pass any type <code>of</code> value we want to <code>Promise</code>.resolveode>.resolve, either a <code>promise</code> or a non-<code>promise</code>. The method itself returns a <code>promise</code> with the resolved value (&lt;fulfilled&gt;). <code>If</code> you pass a regular <code>function</code>, it''ll be a resolved <code>promise</code> with a regular value. <code>If</code> you pass a <code>promise</code>, it''ll be a resolved <code>promise</code> with the resolved value <code>of</code> that passed <code>promise</code>.

<code>In</code> <code>this</code> <code>case</code>, we just passed the numerical value 5. It returns a resolved <code>promise</code> with the value 5.',
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
      'What''s its value?',
      '<pre><code><code>function</code> compareMembers(person1, person2 = person) {
  <code>if</code> (person1 !== person2) {
    consoleonsole.loge>.log(''Not the same!'');
  } <code>else</code> {
    consoleonsole.loge>.log(''They are the same!'');
  }
}

<code>const</code> person = { name: ''Lydia'' };

compareMembers(person);</code></pre>',
      'multiple-choice',
      'intermediate',
      15,
      '[{"id":"o1","text":"Not the same!","isCorrect":false,"explanation":"Incorrect."},{"id":"o2","text":"They are the same!","isCorrect":true,"explanation":"Correct."},{"id":"o3","text":"<code>ReferenceError</code>","isCorrect":false,"explanation":"Incorrect."},{"id":"o4","text":"<code>SyntaxError</code>","isCorrect":false,"explanation":"Incorrect."}]',
      'They are the same!',
      'Objects are passed by reference. When we check objects <code>for</code> strict equality (===), we''re comparing their references.

We <code>set</code> the <code>default</code> value <code>for</code> person2 equal to the person <code>object</code>, and passed the person <code>object</code> <code>as</code> the value <code>for</code> person1.

<code>This</code> means that both values have a reference to the same spot <code>in</code> memory, thus they are equal.

The code block <code>in</code> the elseelse statement gets run, and They are the same! gets logged.',
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
    );