# Frontend Fundamentals - Questions Bank

## Question 1: CSS Display Properties

**Question:** What is the difference between `display: block`, `display: inline`, and `display: inline-block` in CSS?

**Answer:**

- **`display: block`**: Elements take up the full width of their container, start on a new line, and can have width/height set. Examples: `<div>`, `<p>`, `<h1>`
- **`display: inline`**: Elements only take up as much width as their content, don't start on a new line, and cannot have width/height set. Examples: `<span>`, `<a>`, `<strong>`
- **`display: inline-block`**: Combines both - elements flow inline like inline elements but can have width/height set like block elements. Perfect for creating horizontal layouts with control over dimensions.

---

## Question 2: HTML Semantic Elements

**Question:** What are semantic HTML elements and why are they important?

**Answer:**
Semantic HTML elements clearly describe their meaning and purpose to both browsers and developers.

**Examples:**

- `<header>`: Page or section header
- `<nav>`: Navigation links
- `<main>`: Main content of the page
- `<article>`: Self-contained content
- `<section>`: Thematic grouping of content
- `<aside>`: Sidebar or related content
- `<footer>`: Page or section footer

**Benefits:**

- **Accessibility**: Screen readers understand content structure
- **SEO**: Search engines better understand content
- **Maintainability**: Code is self-documenting
- **Styling**: Easier to target with CSS

---

## Question 3: JavaScript Variables

**Question:** Explain the difference between `var`, `let`, and `const` in JavaScript.

**Answer:**

- **`var`**: Function-scoped, can be redeclared, hoisted with `undefined` value. Can cause issues with block scope.
- **`let`**: Block-scoped, cannot be redeclared in same scope, hoisted but not initialized (temporal dead zone).
- **`const`**: Block-scoped, cannot be redeclared or reassigned, must be initialized when declared.

**Examples:**

```javascript
// var - function scoped
function example() {
  if (true) {
    var x = 1;
  }
  console.log(x); // 1 (accessible)
}

// let - block scoped
function example() {
  if (true) {
    let y = 1;
  }
  console.log(y); // ReferenceError
}

// const - block scoped, immutable
const z = 1;
z = 2; // TypeError
```

---

## Question 4: CSS Box Model

**Question:** Explain the CSS Box Model and its components.

**Answer:**
The CSS Box Model describes how elements are rendered and consists of four parts:

1. **Content**: The actual content (text, images, etc.)
2. **Padding**: Space between content and border
3. **Border**: Line around the padding
4. **Margin**: Space outside the border

**Box-sizing property:**

- **`content-box`** (default): Width/height applies only to content
- **`border-box`**: Width/height includes content, padding, and border

**Example:**

```css
.box {
  width: 200px;
  padding: 20px;
  border: 5px solid black;
  margin: 10px;
  box-sizing: border-box; /* Total width = 200px */
}
```

---

## Question 5: JavaScript Functions

**Question:** What is the difference between function declarations and function expressions?

**Answer:**

- **Function Declaration**: Hoisted completely, can be called before declaration
- **Function Expression**: Not hoisted, cannot be called before declaration

**Examples:**

```javascript
// Function Declaration (hoisted)
console.log(sayHello()); // "Hello!" (works)

function sayHello() {
  return 'Hello!';
}

// Function Expression (not hoisted)
console.log(sayGoodbye()); // ReferenceError

const sayGoodbye = function () {
  return 'Goodbye!';
};
```

---

## Question 6: CSS Selectors

**Question:** Explain different types of CSS selectors with examples.

**Answer:**

- **Element selector**: `p { color: blue; }`
- **Class selector**: `.my-class { font-size: 16px; }`
- **ID selector**: `#my-id { background: red; }`
- **Attribute selector**: `input[type="text"] { border: 1px solid; }`
- **Descendant selector**: `div p { margin: 0; }`
- **Child selector**: `div > p { color: green; }`
- **Adjacent sibling**: `h1 + p { margin-top: 0; }`
- **General sibling**: `h1 ~ p { color: gray; }`
- **Pseudo-class**: `a:hover { text-decoration: underline; }`
- **Pseudo-element**: `p::before { content: "→ "; }`

---

## Question 7: JavaScript Arrays

**Question:** What are the main array methods in JavaScript and their purposes?

**Answer:**
**Mutating methods (change original array):**

- `push()`: Add element to end
- `pop()`: Remove element from end
- `shift()`: Remove element from beginning
- `unshift()`: Add element to beginning
- `splice()`: Add/remove elements at specific index

**Non-mutating methods (return new array):**

- `map()`: Transform each element
- `filter()`: Create new array with elements that pass test
- `reduce()`: Reduce array to single value
- `slice()`: Extract portion of array
- `concat()`: Combine arrays

**Example:**

```javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(x => x * 2); // [2, 4, 6, 8, 10]
const evens = numbers.filter(x => x % 2 === 0); // [2, 4]
const sum = numbers.reduce((acc, x) => acc + x, 0); // 15
```

---

## Question 8: CSS Flexbox

**Question:** How do you center content using Flexbox?

**Answer:**

```css
.container {
  display: flex;
  justify-content: center; /* Horizontal centering */
  align-items: center; /* Vertical centering */
  height: 100vh; /* Full viewport height */
}
```

**Flexbox properties:**

- **`justify-content`**: Controls horizontal alignment (flex-start, center, flex-end, space-between, space-around)
- **`align-items`**: Controls vertical alignment (flex-start, center, flex-end, stretch, baseline)
- **`flex-direction`**: Controls main axis direction (row, column, row-reverse, column-reverse)
- **`flex-wrap`**: Controls wrapping (nowrap, wrap, wrap-reverse)

---

## Question 9: JavaScript Objects

**Question:** How do you create and manipulate objects in JavaScript?

**Answer:**
**Object creation:**

```javascript
// Object literal
const person = {
  name: 'John',
  age: 30,
  greet() {
    return `Hello, I'm ${this.name}`;
  },
};

// Constructor function
function Person(name, age) {
  this.name = name;
  this.age = age;
}

// Class (ES6)
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return `Hello, I'm ${this.name}`;
  }
}
```

**Object manipulation:**

```javascript
// Access properties
person.name; // "John"
person['name']; // "John"

// Add/modify properties
person.city = 'New York';
person['city'] = 'New York';

// Delete properties
delete person.age;

// Object methods
Object.keys(person); // ["name", "age", "greet"]
Object.values(person); // ["John", 30, function]
Object.entries(person); // [["name", "John"], ["age", 30], ["greet", function]]
```

---

## Question 10: CSS Responsive Design

**Question:** How do you make a website responsive using CSS?

**Answer:**
**1. Viewport Meta Tag:**

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

**2. Flexible Grid:**

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}
```

**3. Flexible Images:**

```css
img {
  max-width: 100%;
  height: auto;
}
```

**4. Media Queries:**

```css
/* Mobile first approach */
.container {
  padding: 10px;
}

/* Tablet */
@media (min-width: 768px) {
  .container {
    padding: 20px;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    padding: 40px;
    max-width: 1200px;
    margin: 0 auto;
  }
}
```

**5. Flexible Typography:**

```css
h1 {
  font-size: clamp(1.5rem, 4vw, 3rem);
}
```

---

## Question 11: Critical Rendering Path

**Question:** In the critical rendering path, is CSS rendered before or after the DOM is constructed?

**Answer:**
CSS is rendered before the DOM. It is synchronous and blocking, meaning all CSS must be interpreted and any rules calculated before the browser can start parsing and rendering the HTML.

**Critical Rendering Path Steps:**

1. HTML parsing and DOM construction
2. CSS parsing and CSSOM construction (blocking)
3. Render tree construction
4. Layout (reflow)
5. Paint
6. Composite

---

## Question 12: HTML and CSS Rendering

**Question:** Is HTML rendered incrementally? Can we say the same about CSS?

**Answer:**
Yes, HTML is rendered incrementally as it is being parsed. However, CSS is "all or nothing" because it has a global namespace. The browser must interpret all CSS and calculate all possible rules that could apply to any element before it can proceed.

**Why CSS is blocking:**

- CSS has a global scope
- Rules can affect any element
- Browser needs complete CSS to determine final styles
- Prevents FOUC (Flash of Unstyled Content)

---

## Question 13: Script Loading Attributes

**Question:** What is the difference between async and defer attributes on a script tag?

**Answer:**
Both allow a script to be downloaded in the background without blocking HTML parsing.

**async:**

- Script is executed as soon as it is downloaded
- Can happen at any time, potentially before or after DOMContentLoaded
- Execution order is not guaranteed
- Use for independent scripts

**defer:**

- Script is executed only after HTML is fully parsed
- Just before the DOMContentLoaded event
- Execution order of deferred scripts is maintained
- ES6 modules are deferred by default

**Example:**

```html
<script src="script1.js" async></script>
<script src="script2.js" defer></script>
```

---

## Question 14: Browser Data Storage

**Question:** What are three ways to store data in the browser?

**Answer:**

**1. Cookies:**

- Small (~4KB)
- Sent with every HTTP request
- Great for authentication (if HTTP-only)
- Can have an expiration date
- Accessible via document.cookie

**2. Local Storage:**

- Larger storage limit (typically ~5MB)
- Persists indefinitely until explicitly cleared
- Accessible to client-side JavaScript
- Synchronous API

**3. Session Storage:**

- Similar to local storage but cleared when browser tab/window closes
- Useful for temporary data like form inputs during a session
- Same API as localStorage

**Example:**

```javascript
// Cookies
document.cookie = 'username=john; expires=Thu, 18 Dec 2024 12:00:00 UTC';

// Local Storage
localStorage.setItem('user', JSON.stringify({ name: 'John', age: 30 }));
const user = JSON.parse(localStorage.getItem('user'));

// Session Storage
sessionStorage.setItem('tempData', 'temporary value');
```

---

## Question 15: JavaScript 'this' Keyword

**Question:** Explain the this keyword in JavaScript.

**Answer:**
The value of `this` depends on how a function is called:

**1. Global scope (non-strict mode):**

```javascript
console.log(this); // window object
```

**2. Object method:**

```javascript
const obj = {
  name: 'John',
  greet() {
    console.log(this.name); // 'John'
  },
};
obj.greet();
```

**3. Event handler:**

```javascript
button.addEventListener('click', function () {
  console.log(this); // button element
});
```

**4. Explicit binding (call, apply, bind):**

```javascript
function greet() {
  console.log(this.name);
}

const person = { name: 'Alice' };
greet.call(person); // 'Alice'
greet.apply(person); // 'Alice'
const boundGreet = greet.bind(person);
boundGreet(); // 'Alice'
```

**5. Arrow functions:**

```javascript
const obj = {
  name: 'John',
  greet: () => {
    console.log(this.name); // undefined (inherits from lexical scope)
  },
};
```

---

## Question 16: Event Loop

**Question:** Describe the steps in an Event Loop tick.

**Answer:**
The Event Loop processes tasks in this order:

**1. Execute the Call Stack:**

- Run all synchronous code until the call stack is empty

**2. Process the Microtask Queue:**

- Execute all microtasks (promise callbacks, queueMicrotask)
- This queue must be completely emptied before moving on
- Higher priority than macrotasks

**3. Render:**

- Update the UI if necessary
- Only happens if needed (60fps target)

**4. Process the Macrotask Queue:**

- Take one task from the macrotask queue (setTimeout, setInterval, I/O callbacks)
- Execute it completely

**5. Repeat:**

- Go back to step 1

**Example:**

```javascript
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
// Output: 1, 4, 3, 2
```

---

## Question 17: Interview Success Strategies

**Question:** What are the five key mistakes developers make in interviews, and how can they stand out?

**Answer:**

**1. Implementation Focus vs. Pattern Thinking:**

- **Mistake**: Just talking about code (e.g., "I used Redux")
- **Better Approach**: Talk about the underlying patterns and best practices first (e.g., "State management strategies include..."). Show you understand the "why."

**2. Surface Knowledge vs. Technical Deep Dive:**

- **Mistake**: Using buzzwords without understanding
- **Better Approach**: Go beyond buzzwords. Explain the why behind best practices (e.g., why WebP is better than PNG, how the Event Loop works)

**3. Console.Log vs. Professional Debugging:**

- **Mistake**: Relying only on console.log for debugging
- **Better Approach**: Master your tools. Use the browser debugger, network tab, and IDE debugging features. Know how to debug in different environments (frontend, backend, Docker)

**4. Vague Statements vs. Knowing Your Numbers:**

- **Mistake**: Saying "the bundle was big" or "performance was slow"
- **Better Approach**: Be specific. Instead of "the bundle was big," say "the bundle was 1.2MB, and we brought it down to 300kB by...". Reference industry standards (e.g., "Google aims for >65% test coverage")

**5. Code Focus vs. Systems Focus:**

- **Mistake**: Thinking only about your individual ticket
- **Better Approach**: Think beyond your ticket. Understand the entire system architecture, the CI/CD pipeline, and how your work fits into the bigger picture. Be able to draw a diagram of your previous system.

**How to Stand Out:**

**Technical Excellence:**

- Demonstrate deep understanding of fundamentals
- Show knowledge of performance implications
- Discuss trade-offs and alternatives
- Reference specific metrics and benchmarks

**Problem-Solving Approach:**

- Ask clarifying questions before coding
- Think out loud about your approach
- Consider edge cases and error handling
- Discuss testing strategies

**Communication Skills:**

- Explain complex concepts simply
- Use analogies when appropriate
- Be honest about what you don't know
- Show enthusiasm for learning

**System Thinking:**

- Understand the bigger picture
- Consider scalability and maintainability
- Discuss deployment and monitoring
- Think about user experience impact

**Example of Good Interview Response:**

**Question**: "How would you optimize a slow React application?"

**Good Answer**: "First, I'd measure the current performance using React DevTools Profiler and Lighthouse to identify bottlenecks. Common issues I'd look for include:

1. **Bundle Size**: If the initial bundle is over 200KB, I'd implement code splitting with React.lazy() for route-based splitting
2. **Re-renders**: I'd use React.memo() for expensive components and useCallback/useMemo for expensive calculations
3. **Images**: I'd implement next/image for automatic optimization and WebP format conversion
4. **API Calls**: I'd add request deduplication and implement proper caching strategies

I'd prioritize based on Core Web Vitals - focusing on LCP first if it's over 2.5s, then CLS if it's over 0.1. The goal would be to get LCP under 1.2s and CLS under 0.05 for a good user experience score."

---

## Question 18: JavaScript Variable Hoisting

**Question:** What's the output of this code?

```javascript
console.log(typeof name);
var name = 'John';
```

**Answer:**

The output is `undefined`.

**Explanation:**

In JavaScript, variable declarations using `var` are hoisted to the top of their scope, but their initialization is not. This means the variable `name` exists but has the value `undefined` until the assignment line is reached.

The code is effectively interpreted as:

```javascript
var name; // hoisted declaration
console.log(typeof name); // undefined
name = 'John'; // assignment
```

---

## Question 19: JavaScript Function Hoisting

**Question:** What's the output of this code?

```javascript
sayHello();

function sayHello() {
  console.log('Hello!');
}
```

**Answer:**

The output is `Hello!`.

**Explanation:**

Function declarations are fully hoisted in JavaScript, meaning both the declaration and the function body are moved to the top of their scope. This allows you to call a function before it's declared in the code.

---

## Question 20: JavaScript `let` and `const` Block Scoping

**Question:** What's the output of this code?

```javascript
if (true) {
  let x = 1;
  const y = 2;
  var z = 3;
}

console.log(x); // ?
console.log(y); // ?
console.log(z); // ?
```

**Answer:**

The code will throw a `ReferenceError` for `x` and `y`, but `z` will output `3`.

**Explanation:**

- `let` and `const` are block-scoped, meaning they only exist within the `if` block
- `var` is function-scoped (or globally-scoped), so it's accessible outside the block
- Trying to access `x` or `y` outside their block scope throws a `ReferenceError`

---

## Question 21: JavaScript Array Methods

**Question:** What's the output of this code?

```javascript
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(num => num * 2);
const filtered = numbers.filter(num => num > 2);
const sum = numbers.reduce((acc, num) => acc + num, 0);

console.log(doubled);
console.log(filtered);
console.log(sum);
```

**Answer:**

The output is:

```
[2, 4, 6, 8, 10]
[3, 4, 5]
15
```

**Explanation:**

- `map()` creates a new array with each element transformed by the function
- `filter()` creates a new array with only elements that pass the test
- `reduce()` reduces the array to a single value by applying a function to each element

---

## Question 22: JavaScript Object Destructuring

**Question:** What's the output of this code?

```javascript
const person = {
  name: 'Alice',
  age: 30,
  city: 'New York',
};

const { name, age, city: location } = person;

console.log(name, age, location);
```

**Answer:**

The output is `Alice 30 New York`.

**Explanation:**

Object destructuring allows you to extract properties from objects into variables. The syntax `city: location` renames the `city` property to `location` in the destructured variable.

---

## Question 23: JavaScript Template Literals

**Question:** What's the output of this code?

```javascript
const name = 'World';
const age = 25;

const message = `Hello, ${name}! You are ${age} years old.`;
console.log(message);
```

**Answer:**

The output is `Hello, World! You are 25 years old.`

**Explanation:**

Template literals (backticks) allow string interpolation using `${}` syntax. They can contain expressions that are evaluated and converted to strings.

---

## Question 24: JavaScript Arrow Functions vs Regular Functions

**Question:** What's the output of this code?

```javascript
const obj = {
  name: 'Test',
  regularFunction: function () {
    console.log(this.name);
  },
  arrowFunction: () => {
    console.log(this.name);
  },
};

obj.regularFunction();
obj.arrowFunction();
```

**Answer:**

The output is `Test` and `undefined`.

**Explanation:**

- Regular functions have their own `this` context, which refers to the object calling the method
- Arrow functions inherit `this` from their lexical scope (the surrounding context), not from where they're called
- In this case, the arrow function's `this` refers to the global scope where `name` is undefined

---

## Question 25: JavaScript Object Reference vs Value

**Question:** What's the output of this code?

```javascript
let c = { greeting: 'Hey!' };
let d;

d = c;
c.greeting = 'Hello';
console.log(d.greeting);
```

**Answer:**

The output is `Hello`.

**Explanation:**

In JavaScript, all objects interact by reference when setting them equal to each other.

First, variable `c` holds a value to an object. Later, we assign `d` with the same reference that `c` has to the object.

When you change one object, you change all of them.

---

## Question 26: JavaScript Number Constructor vs Primitive

**Question:** What's the output of this code?

```javascript
let a = 3;
let b = new Number(3);
let c = 3;

console.log(a == b);
console.log(a === b);
console.log(b === c);
```

**Answer:**

The output is `true false false`.

**Explanation:**

`new Number()` is a built-in function constructor. Although it looks like a number, it's not really a number: it has a bunch of extra features and is an object.

When we use the `==` operator (Equality operator), it only checks whether it has the same value. They both have the value of `3`, so it returns `true`.

However, when we use the `===` operator (Strict equality operator), both value and type should be the same. It's not: `new Number()` is not a number, it's an object. Both return `false`.

---

## Question 27: JavaScript Functions as Objects

**Question:** What happens when we do this?

```javascript
function bark() {
  console.log('Woof!');
}

bark.animal = 'dog';
```

**Answer:**

Nothing, this is totally fine!

**Explanation:**

This is possible in JavaScript, because functions are objects! (Everything besides primitive types are objects)

A function is a special type of object. The code you write yourself isn't the actual function. The function is an object with properties. This property is invocable.

---

## Question 28: JavaScript Object Property Iteration

**Question:** What's the output of this code?

```javascript
const person = {
  name: 'Lydia',
  age: 21,
};

for (const item in person) {
  console.log(item);
}
```

**Answer:**

The output is `name` and `age`.

**Explanation:**

With a `for-in` loop, we can iterate through object keys, in this case `name` and `age`. Under the hood, object keys are strings (or Symbols). On every loop, we set the value of `item` equal to the current key it's iterating over. First, `item` is equal to `"name"`, and gets logged. Then, `item` is equal to `"age"`, which gets logged.

---

## Question 29: JavaScript Array Empty Slots

**Question:** What's the output of this code?

```javascript
const arr = [1, 2, 3];
arr[10] = 11;
console.log(arr);
```

**Answer:**

The output is `[1, 2, 3, empty × 7, 11]`.

**Explanation:**

When you set a value to an element in an array that exceeds the length of the array, JavaScript creates something called "empty slots". These actually have the value of `undefined`, but you'll see something like:

`[1, 2, 3, empty × 7, 11]`

depending on where you run it (it's different for every browser, node, etc.)

---

## Question 30: JavaScript Rest Parameters

**Question:** What's the output of this code?

```javascript
function getAge(...args) {
  console.log(typeof args);
}

getAge(21);
```

**Answer:**

The output is `object`.

**Explanation:**

The rest parameter (`...args`) lets us "collect" all remaining arguments into an array. An array is an object, so `typeof args` returns `"object"`.

---

## Question 31: JavaScript `this` Context Loss

**Question:** What's the output of this code?

```javascript
const obj = {
  a: 'Hello',
  b: function () {
    console.log(this.a);
  },
};

const c = obj.b;
c();
```

**Answer:**

The output is `undefined`.

**Explanation:**

When you assign `obj.b` to `c`, you're not calling the function, you're just assigning the function reference. When you call `c()`, it's called in the global context, so `this` refers to the global object (or `undefined` in strict mode). Since there's no `a` property on the global object, it returns `undefined`.

---

## Question 32: JavaScript Function Hoisting vs Expression

**Question:** What's the output of this code?

```javascript
sayHi();

function sayHi() {
  console.log('Hey!');
}

var sayHi = function () {
  console.log('Hi!');
};
```

**Answer:**

The output is `Hey!`.

**Explanation:**

Function declarations are hoisted, but function expressions are not. The function declaration `function sayHi()` is hoisted to the top of its scope, so when we call `sayHi()` before its declaration, it works and logs `"Hey!"`.

The function expression `var sayHi = function()` is not hoisted, so it doesn't affect the first call.

---

## Question 33: JavaScript Closure and Variable Capture

**Question:** What's the output of this code?

```javascript
function createIncrement() {
  let count = 0;
  function increment() {
    count++;
  }
  let message = `Count is ${count}`;
  function log() {
    console.log(message);
  }
  return [increment, log];
}

const [increment, log] = createIncrement();
increment();
increment();
increment();
log();
```

**Answer:**

The output is `Count is 0`.

**Explanation:**

The `message` variable is created when the `createIncrement` function is called, and at that time, `count` is `0`. Even though `increment` is called multiple times, the `message` variable is not updated because it was captured at the time of creation.

---

## Question 34: JavaScript Array Method Chaining

**Question:** What's the output of this code?

```javascript
const numbers = [1, 2, 3, 4, 5];
const result = numbers.map(num => num * 2).filter(num => num > 5);
console.log(result);
```

**Answer:**

The output is `[6, 8, 10]`.

**Explanation:**

The `map` method creates a new array with each element multiplied by 2: `[2, 4, 6, 8, 10]`.

The `filter` method then filters out elements that are not greater than 5, leaving `[6, 8, 10]`.

---

## Question 35: JavaScript Global Object and Typos

**Question:** What's the output of this code?

```javascript
let greeting;
greetign = {}; // Typo!
console.log(greetign);
```

**Answer:**

The output is `{}`.

**Explanation:**

It logs the object, because we just created an empty object on the global object! When we mistyped `greeting` as `greetign`, the JS interpreter actually saw this as:

1. `global.greetign = {}` in Node.js
2. `window.greetign = {}`, `frames.greetign = {}` and `self.greetign` in browsers.
3. `self.greetign` in web workers.
4. `globalThis.greetign` in all environments.

In order to avoid this, we can use `"use strict"`. This makes sure that you have declared a variable before setting it equal to anything.

---

## Question 36: JavaScript Type Coercion

**Question:** What's the output of this code?

```javascript
function sum(a, b) {
  return a + b;
}

sum(1, '2');
```

**Answer:**

The output is `"12"`.

**Explanation:**

JavaScript is a **dynamically typed language**: we don't specify what types certain variables are. Values can automatically be converted into another type without you knowing, which is called _implicit type coercion_. **Coercion** is converting from one type into another.

In this example, JavaScript converts the number `1` into a string, in order for the function to make sense and return a value. During the addition of a numeric type (`1`) and a string type (`'2'`), the number is treated as a string. We can concatenate strings like `"Hello" + "World"`, so what's happening here is `"1" + "2"` which returns `"12"`.

---

## Question 37: JavaScript Postfix vs Prefix Operators

**Question:** What's the output of this code?

```javascript
let number = 0;
console.log(number++);
console.log(++number);
console.log(number);
```

**Answer:**

The output is `0 2 2`.

**Explanation:**

The **postfix** unary operator `++`:

1. Returns the value (this returns `0`)
2. Increments the value (number is now `1`)

The **prefix** unary operator `++`:

1. Increments the value (number is now `2`)
2. Returns the value (this returns `2`)

This returns `0 2 2`.

---

## Question 38: JavaScript Object Comparison

**Question:** What's the output of this code?

```javascript
function checkAge(data) {
  if (data === { age: 18 }) {
    console.log('You are an adult!');
  } else if (data == { age: 18 }) {
    console.log('You are still an adult.');
  } else {
    console.log(`Hmm.. You don't have an age I guess`);
  }
}

checkAge({ age: 18 });
```

**Answer:**

The output is `Hmm.. You don't have an age I guess`.

**Explanation:**

When testing equality, primitives are compared by their _value_, while objects are compared by their _reference_. JavaScript checks if the objects have a reference to the same location in memory.

The two objects that we are comparing don't have that: the object we passed as a parameter refers to a different location in memory than the object we used for checking equality.

This is why both `{ age: 18 } === { age: 18 }` and `{ age: 18 } == { age: 18 }` return `false`.

---

## Question 39: JavaScript `typeof` Operator

**Question:** What's the output of this code?

```javascript
console.log(typeof typeof 1);
```

**Answer:**

The output is `"string"`.

**Explanation:**

`typeof 1` returns `"number"`. `typeof "number"` returns `"string"`.

The `typeof` operator always returns a string, so `typeof typeof` will always return `"string"`.

---

## Question 40: JavaScript Strict Mode

**Question:** What's the output of this code?

```javascript
function getAge() {
  'use strict';
  age = 21;
  console.log(age);
}

getAge();
```

**Answer:**

The code will throw a `ReferenceError`.

**Explanation:**

With `"use strict"`, you can't reference undeclared variables. We never declared the variable `age`, and since we use `"use strict"`, it will throw a reference error. If we didn't use `"use strict"`, it would have worked, since the property `age` would have gotten added to the global object.

---

## Question 41: JavaScript Constructor Functions

**Question:** What's the output of this code?

```javascript
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

const lydia = new Person('Lydia', 'Hallie');
const sarah = Person('Sarah', 'Smith');

console.log(lydia);
console.log(sarah);
```

**Answer:**

The output is `Person {firstName: "Lydia", lastName: "Hallie"}` and `undefined`.

**Explanation:**

For `sarah`, we didn't use the `new` keyword. When using `new`, `this` refers to the new empty object we create. However, if you don't add `new`, `this` refers to the global object!

We said that `this.firstName` equals `"Sarah"` and `this.lastName` equals `"Smith"`. What we actually did, is defining `global.firstName = 'Sarah'` and `global.lastName = 'Smith'`. `sarah` itself is left `undefined`, since we don't return a value from the `Person` function.

---

## Question 42: JavaScript Event Propagation

**Question:** What are the three phases of event propagation?

**Answer:**

The three phases are: Capturing > Target > Bubbling.

**Explanation:**

During the **capturing** phase, the event goes through the ancestor elements down to the target element. It then reaches the **target** element, and **bubbling** begins.

The event first travels down the DOM tree (capturing phase), reaches the target element (target phase), and then travels back up the DOM tree (bubbling phase).

---

## Question 43: JavaScript Object Prototypes

**Question:** Do all objects have prototypes?

**Answer:**

No, not all objects have prototypes.

**Explanation:**

All objects have prototypes, except for the **base object**. The base object is the object created by the user, or an object that is created using the `new` keyword. The base object has access to some methods and properties, such as `.toString`. This is the reason why you can use built-in JavaScript methods! All of such methods are available on the prototype. Although JavaScript can't find it directly on your object, it goes down the prototype chain and finds it there, which makes it accessible for you.

---

## Question 44: JavaScript Tagged Template Literals

**Question:** What's the output of this code?

```javascript
function getPersonInfo(one, two, three) {
  console.log(one);
  console.log(two);
  console.log(three);
}

const person = 'Lydia';
const age = 21;

getPersonInfo`${person} is ${age} years old`;
```

**Answer:**

The output is `["", " is ", " years old"]`, `"Lydia"`, `21`.

**Explanation:**

If you use tagged template literals, the value of the first argument is always an array of the string values. The remaining arguments get the values of the passed expressions!

The first argument is an array containing the string parts: `["", " is ", " years old"]`, the second argument is the first expression value `"Lydia"`, and the third argument is the second expression value `21`.

---

## Question 45: JavaScript Array Methods and Mutation

**Question:** What's the output of this code?

```javascript
const numbers = [1, 2, 3];
numbers[9] = 11;
console.log(numbers);
```

**Answer:**

The output is `[1, 2, 3, empty × 6, 11]`.

**Explanation:**

When you set a value to an element in an array that exceeds the length of the array, JavaScript creates something called "empty slots". These actually have the value of `undefined`, but you'll see something like:

`[1, 2, 3, empty × 6, 11]`

depending on where you run it (it's different for every browser, node, etc.)

---

## Question 46

**What's the output?**

```javascript
let c = { greeting: 'Hey!' };
let d;

d = c;
c.greeting = 'Hello';
console.log(d.greeting);
```

**A:** `Hello`  
**B:** `Hey!`  
**C:** `undefined`  
**D:** `ReferenceError`

**Answer:** A

**Explanation:** In JavaScript, all objects interact by reference when setting them equal to each other. When you change one object, you change all of them.

---

## Question 47

**What's the output?**

```javascript
let a = 3;
let b = new Number(3);
let c = 3;

console.log(a == b);
console.log(a === b);
console.log(b === c);
```

**A:** `true` `false` `true`  
**B:** `false` `false` `true`  
**C:** `true` `false` `false`  
**D:** `false` `true` `true`

**Answer:** C

**Explanation:** `new Number()` is a built-in function constructor. Although it looks like a number, it's not really a number: it has a bunch of extra features and is an object. When we use the `==` operator, it only checks whether it has the same value. They both have the value of `3`, so it returns `true`. However, when we use the `===` operator, both value and type should be the same. It's not: `new Number()` is not a number, it's an object.

---

## Question 48

**What's the output?**

```javascript
class Chameleon {
  static colorChange(newColor) {
    this.newColor = newColor;
    return this.newColor;
  }

  constructor({ newColor = 'green' } = {}) {
    this.newColor = newColor;
  }
}

const freddie = new Chameleon({ newColor: 'purple' });
console.log(freddie.colorChange('orange'));
```

**A:** `orange`  
**B:** `purple`  
**C:** `green`  
**D:** `TypeError`

**Answer:** D

**Explanation:** The `colorChange` function is static. Static methods are designed to live only on the constructor in which they are created, and cannot be passed down to any children or called upon class instances. Since `freddie` is an instance of class `Chameleon`, the static method cannot be called upon it.

---

## Question 49

**What's the output?**

```javascript
let greeting;
greetign = {}; // Typo!
console.log(greetign);
```

**A:** `{}`  
**B:** `ReferenceError: greetign is not defined`  
**C:** `undefined`

**Answer:** A

**Explanation:** It logs the object, because we just created an empty object on the global object! When we mistyped `greeting` as `greetign`, the JS interpreter actually saw this as `global.greetign = {}` (or `window.greetign = {}` in a browser).

---

## Question 50

**What happens when we do this?**

```javascript
function bark() {
  console.log('Woof!');
}

bark.animal = 'dog';
```

**A:** Nothing, this is totally fine!  
**B:** `SyntaxError`. You cannot add properties to a function this way.  
**C:** `"Woof!"` gets logged.  
**D:** `ReferenceError`

**Answer:** A

**Explanation:** This is possible in JavaScript, because functions are objects! (Everything besides primitive types are objects) A function is a special type of object. The code you write isn't the actual function. The function is an object with properties. This property is callable.

---

## Question 51

**What's the output?**

```javascript
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

const member = new Person('Lydia', 'Hallie');
Person.getFullName = function () {
  return `${this.firstName} ${this.lastName}`;
};

console.log(member.getFullName());
```

**A:** `TypeError`  
**B:** `SyntaxError`  
**C:** `Lydia Hallie`  
**D:** `undefined undefined`

**Answer:** A

**Explanation:** You can't add properties to a constructor like you can with regular objects. If you want to add a feature to all objects at once, you have to use the prototype instead.

---

## Question 52

**What's the output?**

```javascript
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

const lydia = new Person('Lydia', 'Hallie');
const sarah = Person('Sarah', 'Smith');

console.log(lydia);
console.log(sarah);
```

**A:** `Person {firstName: "Lydia", lastName: "Hallie"}` and `undefined`  
**B:** `Person {firstName: "Lydia", lastName: "Hallie"}` and `Person {firstName: "Sarah", lastName: "Smith"}`  
**C:** `Person {firstName: "Lydia", lastName: "Hallie"}` and `{}`  
**D:** `Person {firstName: "Lydia", lastName: "Hallie"}` and `ReferenceError`

**Answer:** A

**Explanation:** For `sarah`, we didn't use the `new` keyword. When using `new`, `this` refers to the new empty object we create. However, if you don't add `new`, `this` refers to the **global object**! We said that `this.firstName` equals `"Sarah"` and `this.lastName` equals `"Smith"`. What we actually did, is defining `global.firstName = 'Sarah'` and `global.lastName = 'Smith'`. `sarah` itself is left `undefined`.

---

## Question 53

**What are the three phases of event propagation?**

**A:** Target > Capturing > Bubbling  
**B:** Bubbling > Target > Capturing  
**C:** Target > Bubbling > Capturing  
**D:** Capturing > Target > Bubbling

**Answer:** D

**Explanation:** During the **capturing** phase, the event goes through the ancestor elements down to the target element. It then reaches the **target** element, and **bubbling** begins.

---

## Question 54

**All object have prototypes.**

**A:** true  
**B:** false

**Answer:** B

**Explanation:** All objects have prototypes, except for the **base object**. The base object is the object created by the user, or an object that is created using the `new` keyword. The base object has access to some methods and properties, such as `.toString`. This is the reason why you can use built-in JavaScript methods! All of such methods are available on the prototype.

---

## Question 55

**What's the output?**

```javascript
function sum(a, b) {
  return a + b;
}

sum(1, '2');
```

**A:** `NaN`  
**B:** `TypeError`  
**C:** `"12"`  
**D:** `3`

**Answer:** C

**Explanation:** JavaScript is a **dynamically typed language**: we don't specify what types certain variables are. Values can automatically be converted into another type without you knowing, which is called _implicit type coercion_. **Coercion** is converting from one type into another. In this example, JavaScript converts the number `1` into a string, in order for the function to make sense and return a value. During the addition of a numeric type (`1`) and a string type (`'2'`), the number is treated as a string.

---

## Question 56

**What's the output?**

```javascript
let number = 0;
console.log(number++);
console.log(++number);
console.log(number);
```

**A:** `1` `1` `2`  
**B:** `1` `2` `2`  
**C:** `0` `2` `2`  
**D:** `0` `1` `2`

**Answer:** C

**Explanation:** The **postfix** unary operator `++`:

1. Returns the value (this returns `0`)
2. Increments the value (number is now `1`)

The **prefix** unary operator `++`:

1. Increments the value (number is now `2`)
2. Returns the value (this returns `2`)

This returns `0 2 2`.

---

## Question 57

**What's the output?**

```javascript
function getPersonInfo(one, two, three) {
  console.log(one);
  console.log(two);
  console.log(three);
}

const person = 'Lydia';
const age = 21;

getPersonInfo`${person} is ${age} years old`;
```

**A:** `"Lydia"` `21` `["", " is ", " years old"]`  
**B:** `["", " is ", " years old"]` `"Lydia"` `21`  
**C:** `"Lydia"` `["", " is ", " years old"]` `21`

**Answer:** B

**Explanation:** If you use tagged template literals, the value of the first argument is always an array of the string values. The remaining arguments get the values of the passed expressions!

---

## Question 58

**What's the output?**

```javascript
function checkAge(data) {
  if (data === { age: 18 }) {
    console.log('You are an adult!');
  } else if (data == { age: 18 }) {
    console.log('You are still an adult.');
  } else {
    console.log(`Hmm.. You don't have an age I guess`);
  }
}

checkAge({ age: 18 });
```

**A:** `You are an adult!`  
**B:** `You are still an adult.`  
**C:** `Hmm.. You don't have an age I guess`

**Answer:** C

**Explanation:** When testing equality, primitives are compared by their _value_, while objects are compared by their _reference_. JavaScript checks if the objects have a reference to the same location in memory. The two objects that we are comparing don't have that: the object we passed as a parameter refers to a different location in memory than the object we used for checking equality.

---

## Question 59

**What's the output?**

```javascript
function getAge(...args) {
  console.log(typeof args);
}

getAge(21);
```

**A:** `"number"`  
**B:** `"array"`  
**C:** `"object"`  
**D:** `"NaN"`

**Answer:** C

**Explanation:** The rest parameter (`...args`) lets us "collect" all remaining arguments into an array. An array is an object, so `typeof args` returns `"object"`.

---

## Question 60

**What's the output?**

```javascript
function getAge() {
  'use strict';
  age = 21;
  console.log(age);
}

getAge();
```

**A:** `21`  
**B:** `undefined`  
**C:** `ReferenceError`  
**D:** `TypeError`

**Answer:** C

**Explanation:** With `"use strict"`, you can't reference undeclared variables. We would get a `ReferenceError` saying `age is not defined`.

---

## Question 61

**What's the value of `sum`?**

```javascript
const sum = eval('10*10+5');
```

**A:** `"105"`  
**B:** `105`  
**C:** `TypeError`  
**D:** `"10*10+5"`

**Answer:** B

**Explanation:** `eval` evaluates codes that's passed as a string. If it's an expression, like in this case, it evaluates the expression. The expression is `10 * 10 + 5`. This returns the number `105`.

---

## Question 62

**How long is `cool_secret` accessible?**

```javascript
sessionStorage.setItem('cool_secret', 123);
```

**A:** Forever, the data doesn't get lost.  
**B:** When the user closes the tab.  
**C:** When the user closes the entire browser, not only the tab.  
**D:** When the user shuts off their computer.

**Answer:** B

**Explanation:** The data stored in `sessionStorage` gets removed after closing the _tab_. If you used `localStorage`, the data would've been there forever, unless for example `localStorage.clear()` is invoked.

---

## Question 63

**What's the output?**

```javascript
var num = 8;
var num = 10;

console.log(num);
```

**A:** `8`  
**B:** `10`  
**C:** `SyntaxError`  
**D:** `ReferenceError`

**Answer:** B

**Explanation:** With the `var` keyword, you can declare multiple variables with the same name. The variable will then hold the latest value. You cannot do this with `let` or `const` since they're block-scoped.

---

## Question 64

**What's the output?**

```javascript
const obj = { 1: 'a', 2: 'b', 3: 'c' };
const set = new Set([1, 2, 3, 4, 5]);

obj.hasOwnProperty('1');
obj.hasOwnProperty(1);
set.has('1');
set.has(1);
```

**A:** `false` `true` `false` `true`  
**B:** `false` `true` `true` `true`  
**C:** `true` `true` `false` `true`  
**D:** `true` `true` `true` `true`

**Answer:** C

**Explanation:** All object keys (excluding Symbols) are strings under the hood, even if you don't type it yourself as a string. This is why `obj.hasOwnProperty('1')` also returns `true`. It doesn't work that way for a set. There is no `'1'` in our set: `set.has('1')` returns `false`. It has the numeric type `1`, `set.has(1)` returns `true`.

---

## Question 65

**What's the output?**

```javascript
const obj = { a: 'one', b: 'two', a: 'three' };
console.log(obj);
```

**A:** `{ a: "one", b: "two" }`  
**B:** `{ b: "two", a: "three" }`  
**C:** `{ a: "three", b: "two" }`  
**D:** `SyntaxError`

**Answer:** C

**Explanation:** If you have two keys with the same name, the key will be replaced. It will still be in its first position, but with the last specified value.


---

## Question 66

**What's the output?**

\`\`\`javascript
const person = { name: 'Lydia' };

function sayHi(age) {
  return \`${this.name} is ${age}\`;
}

console.log(sayHi.call(person, 21));
console.log(sayHi.bind(person, 21));
\`\`\`

**A:** \`undefined is 21\` \`Lydia is 21\`  
**B:** \`function\` \`function\`  
**C:** \`Lydia is 21\` \`Lydia is 21\`  
**D:** \`Lydia is 21\` \`function\`

**Answer:** D

**Explanation:** With both, we can pass the object to which we want the \`this\` keyword to refer to. However, \`.call\` is also _executed immediately_!

\`.bind.\` returns a _copy_ of the function, but with a bound context! It is not executed immediately.


---

## Question 67

**What's the output?**

\`\`\`javascript
const numbers = [1, 2, 3];
numbers[10] = 11;
console.log(numbers);
\`\`\`

**A:** \`[1, 2, 3, 7 x null, 11]\`  
**B:** \`[1, 2, 3, 11]\`  
**C:** \`[1, 2, 3, 7 x empty, 11]\`  
**D:** \`SyntaxError\`

**Answer:** C

**Explanation:** When you set a value to an element in an array that exceeds the length of the array, JavaScript creates something called "empty slots". These actually have the value of \`undefined\`, but you'll see something like:

\`[1, 2, 3, 7 x empty, 11]\`

depending on where you run it (it's different for every browser, node, etc.)


---

## Question 68

**What's the output?**

\`\`\`javascript
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
\`\`\`

**A:** \`1\` \`undefined\` \`2\`  
**B:** \`undefined\` \`undefined\` \`undefined\`  
**C:** \`1\` \`1\` \`2\`  
**D:** \`1\` \`undefined\` \`undefined\`

**Answer:** A

**Explanation:** The \`catch\` block receives the argument \`x\`. This is not the same \`x\` as the variable when we pass arguments. This variable \`x\` is block-scoped.

Later, we set this block-scoped variable equal to \`1\`, and set the value of the variable \`y\`. Now, we log the block-scoped variable \`x\`, which equals \`1\`.

Outside of the \`catch\` block, \`x\` is still \`undefined\`, and \`y\` is \`2\`. When we want to \`console.log(x)\` outside of the \`catch\` block, it returns \`undefined\`, and \`y\` returns \`2\`.


---

## Question 69

**What's the output?**

\`\`\`javascript
[[0, 1], [2, 3]].reduce(
  (acc, cur) => {
    return acc.concat(cur);
  },
  [1, 2],
);
\`\`\`

**A:** \`[0, 1, 2, 3, 1, 2]\`  
**B:** \`[6, 1, 2]\`  
**C:** \`[1, 2, 0, 1, 2, 3]\`  
**D:** \`[1, 2, 6]\`

**Answer:** C

**Explanation:** \`[1, 2]\` is our initial value. This is the value we start with, and the value of the very first \`acc\`. During the first round, \`acc\` is \`[1, 2]\`, and \`cur\` is \`[0, 1]\`. We concatenate them, which results in \`[1, 2, 0, 1]\`.

Then, \`acc\` is \`[1, 2, 0, 1]\`, and \`cur\` is \`[2, 3]\`. We concatenate them, and get \`[1, 2, 0, 1, 2, 3]\`.


---

## Question 70

**What's the output?**

\`\`\`javascript
!!null;
!!'';
!!1;
\`\`\`

**A:** \`false\` \`true\` \`false\`  
**B:** \`false\` \`false\` \`true\`  
**C:** \`false\` \`true\` \`true\`  
**D:** \`true\` \`true\` \`false\`

**Answer:** B

**Explanation:** \`null\` is falsy. \`!null\` returns \`true\`. \`!true\` returns \`false\`.

\`''\` is falsy. \`!''\` returns \`true\`. \`!true\` returns \`false\`.

\`1\` is truthy. \`!1\` returns \`false\`. \`!false\` returns \`true\`.


---

## Question 71

**What's the output?**

\`\`\`javascript
const user = {
  email: 'my@email.com',
  updateEmail: email => {
    this.email = email
  }
}

user.updateEmail('new@email.com')
console.log(user.email)
\`\`\`

**A:** \`my@email.com\`  
**B:** \`new@email.com\`  
**C:** \`undefined\`  
**D:** \`ReferenceError\`

**Answer:** A

**Explanation:** The \`updateEmail\` function is an arrow function, and is not bound to the \`user\` object. This means that the \`this\` keyword is not referring to the \`user\` object, but refers to the global scope in this case. The value of \`email\` within the \`user\` object does not get updated. When logging the value of \`user.email\`, the original value of \`my@email.com\` gets returned.


---

## Question 72

**What's the output?**

\`\`\`javascript
const promise1 = Promise.resolve('First');
const promise2 = Promise.resolve('Second');
const promise3 = Promise.reject('Third');
const promise4 = Promise.resolve('Fourth');

const runPromises = async () => {
  const res1 = await Promise.all([promise1, promise2]);
  const res2 = await Promise.all([promise3, promise4]);
  return [res1, res2];
};

runPromises()
  .then(res => console.log(res))
  .catch(err => console.log(err));
\`\`\`

**A:** \`[['First', 'Second'], ['Fourth']]\`  
**B:** \`[['First', 'Second'], ['Third', 'Fourth']]\`  
**C:** \`[['First', 'Second']]\`  
**D:** \`'Third'\`

**Answer:** D

**Explanation:** The \`Promise.all\` method runs the passed promises in parallel. If one promise fails, the \`Promise.all\` method _rejects_ with the value of the rejected promise. In this case, \`promise3\` is rejected with the value \`"Third"\`. We're catching the rejected value in the chained \`catch\` method on the \`runPromises\` invocation to catch any errors within the \`runPromises\` function. Only \`"Third"\` gets logged, since \`promise3\` is rejected with this value.


---

## Question 73

**What's the output?**

\`\`\`javascript
const myPromise = Promise.resolve(Promise.resolve('Promise!'));

function funcOne() {
  myPromise.then(res => res).then(res => console.log(res));
  setTimeout(() => console.log('Timeout!'), 0);
  console.log('Last line!');
}

async function funcTwo() {
  const res = await myPromise;
  console.log(await res);
  setTimeout(() => console.log('Timeout!'), 0);
  console.log('Last line!');
}

funcOne();
funcTwo();
\`\`\`

**A:** \`Promise! Last line! Promise! Last line! Timeout! Timeout!\`  
**B:** \`Last line! Promise! Last line! Promise! Timeout! Timeout!\`  
**C:** \`Promise! Last line! Last line! Promise! Timeout! Timeout!\`  
**D:** \`Last line! Promise! Last line! Promise! Timeout! Timeout!\`

**Answer:** B

**Explanation:** First, we invoke \`funcOne\`. On the first line of \`funcOne\`, we call the \`myPromise\` promise, which is an _asynchronous_ operation. The code continues running, and doesn't wait for the promise. The next line is the \`setTimeout\` function, from the **Timer** module, which is also an _asynchronous_ operation. The code continues running and doesn't wait for the timeout. The next line is \`console.log('Last line!')\`, which gets logged immediately.

Then, we invoke \`funcTwo\`. The variable \`res\` gets the value of the awaited \`myPromise\` promise. Since we use \`await\`, we pause the execution of the function until the promise gets resolved. The \`res\` variable now has the \`"Promise!"\` value. \`console.log(await res)\` logs \`"Promise!"\`. The next line is the \`setTimeout\` function, which is an _asynchronous_ operation. The code continues running and doesn't wait for the timeout. The next line is \`console.log('Last line!')\`, which gets logged immediately.

After the \`setTimeout\` timer in both functions expires, \`"Timeout!"\` gets logged.


---

## Question 74

**What's the output?**

\`\`\`javascript
const name = 'Lydia Hallie';
const age = 21;

console.log(Number.isNaN(name));
console.log(Number.isNaN(age));

console.log(isNaN(name));
console.log(isNaN(age));
\`\`\`

**A:** \`true\` \`false\` \`true\` \`false\`  
**B:** \`true\` \`false\` \`false\` \`false\`  
**C:** \`false\` \`false\` \`true\` \`false\`  
**D:** \`false\` \`true\` \`false\` \`true\`

**Answer:** C

**Explanation:** With the \`Number.isNaN\` method, you can check if the value you pass is a _numeric value_ and equal to \`NaN\`. \`name\` is not a numeric value, so \`Number.isNaN(name)\` returns \`false\`. \`age\` is a numeric value, but is not equal to \`NaN\`, so \`Number.isNaN(age)\` returns \`false\`.

With the \`isNaN\` method, you can check if the value is not a number. \`name\` is not a number, so \`isNaN(name)\` returns \`true\`. \`age\` is a number, so \`isNaN(age)\` returns \`false\`.


---

## Question 75

**What's the output?**

\`\`\`javascript
const randomValue = 21;

function getInfo() {
  console.log(typeof randomValue);
  const randomValue = 'Lydia Hallie';
}

getInfo();
\`\`\`

**A:** \`"number"\`  
**B:** \`"string"\`  
**C:** \`"undefined"\`  
**D:** \`ReferenceError\`

**Answer:** D

**Explanation:** Variables declared with the \`const\` keyword are not accessible before they are initialized, this is called the _temporal dead zone_. In the \`getInfo\` function, on the first line, we try to access the \`randomValue\` variable before it is declared. The \`const\` variable is not accessible before its declaration, this throws a \`ReferenceError\`. If we had used \`var\` instead of \`const\`, the variable would have been hoisted.


---

## Question 76

**What's the output?**

\`\`\`javascript
function createMember({ email, address = {} }) {
  return {
    email,
    address: address ? address : null
  };
}

const member = createMember({ email: 'my@email.com' });
console.log(member);
\`\`\`

**A:** \`{ email: "my@email.com", address: null }\`  
**B:** \`{ email: "my@email.com" }\`  
**C:** \`{ email: "my@email.com", address: {} }\`  
**D:** \`{ email: "my@email.com", address: undefined }\`

**Answer:** C

**Explanation:** The default value of \`address\` is an empty object \`{}\`. When we set the variable \`member\` equal to the object returned by the \`createMember\` function, we didn't pass a value for the address, which means that the value of the address is the default empty object \`{}\`. An empty object is a truthy value, which means that the condition of the \`address ? address : null\` conditional returns \`true\`. The value of the address is the empty object \`{}\`.


---

## Question 77

**What's the output?**

\`\`\`javascript
let randomValue = { name: 'Lydia' };
randomValue = 23;

if (!typeof randomValue === 'string') {
  console.log("It's not a string!");
} else {
  console.log("Yay it's a string!");
}
\`\`\`

**A:** \`It's not a string!\`  
**B:** \`Yay it's a string!\`  
**C:** \`TypeError\`  
**D:** \`undefined\`

**Answer:** B

**Explanation:** The condition within the \`if\` statement checks whether the value of \`!typeof randomValue\` is equal to \`"string"\`. The \`!\` operator converts the value to a boolean value. If the value is truthy, the returned value will be \`false\`, if the value is falsy, the returned value will be \`true\`. In this case, the returned value of \`typeof randomValue\` is the truthy value \`"number"\`, meaning that the value of \`!typeof randomValue\` is the boolean value \`false\`.

\`!typeof randomValue === "string"\` always returns false, since we're actually checking \`false === "string"\`. Since the condition returned \`false\`, the code block of the \`else\` statement gets run, and \`Yay it's a string!\` gets logged.


---

## Question 78

**What's the output?**

\`\`\`javascript
const myPromise = Promise.resolve(Promise.resolve('Promise!'));

function funcOne() {
  myPromise.then(res => res).then(res => console.log(res));
  setTimeout(() => console.log('Timeout!'), 0);
  console.log('Last line!');
}

async function funcTwo() {
  const res = await myPromise;
  console.log(await res);
  setTimeout(() => console.log('Timeout!'), 0);
  console.log('Last line!');
}

funcOne();
funcTwo();
\`\`\`

**A:** \`Promise! Last line! Promise! Last line! Timeout! Timeout!\`  
**B:** \`Last line! Promise! Last line! Promise! Timeout! Timeout!\`  
**C:** \`Promise! Last line! Last line! Promise! Timeout! Timeout!\`  
**D:** \`Last line! Promise! Last line! Promise! Timeout! Timeout!\`

**Answer:** B

**Explanation:** First, we invoke \`funcOne\`. On the first line of \`funcOne\`, we call the \`myPromise\` promise, which is an _asynchronous_ operation. The code continues running, and doesn't wait for the promise. The next line is the \`setTimeout\` function, from the **Timer** module, which is also an _asynchronous_ operation. The code continues running and doesn't wait for the timeout. The next line is \`console.log('Last line!')\`, which gets logged immediately.

Then, we invoke \`funcTwo\`. The variable \`res\` gets the value of the awaited \`myPromise\` promise. Since we use \`await\`, we pause the execution of the function until the promise gets resolved. The \`res\` variable now has the \`"Promise!"\` value. \`console.log(await res)\` logs \`"Promise!"\`. The next line is the \`setTimeout\` function, which is an _asynchronous_ operation. The code continues running and doesn't wait for the timeout. The next line is \`console.log('Last line!')\`, which gets logged immediately.

After the \`setTimeout\` timer in both functions expires, \`"Timeout!"\` gets logged.


---

## Question 79

**What's the output?**

\`\`\`javascript
const name = 'Lydia Hallie';
const age = 21;

console.log(Number.isNaN(name));
console.log(Number.isNaN(age));

console.log(isNaN(name));
console.log(isNaN(age));
\`\`\`

**A:** \`true\` \`false\` \`true\` \`false\`  
**B:** \`true\` \`false\` \`false\` \`false\`  
**C:** \`false\` \`false\` \`true\` \`false\`  
**D:** \`false\` \`true\` \`false\` \`true\`

**Answer:** C

**Explanation:** With the \`Number.isNaN\` method, you can check if the value you pass is a _numeric value_ and equal to \`NaN\`. \`name\` is not a numeric value, so \`Number.isNaN(name)\` returns \`false\`. \`age\` is a numeric value, but is not equal to \`NaN\`, so \`Number.isNaN(age)\` returns \`false\`.

With the \`isNaN\` method, you can check if the value is not a number. \`name\` is not a number, so \`isNaN(name)\` returns \`true\`. \`age\` is a number, so \`isNaN(age)\` returns \`false\`.


---

## Question 80

**What's the output?**

\`\`\`javascript
const randomValue = 21;

function getInfo() {
  console.log(typeof randomValue);
  const randomValue = 'Lydia Hallie';
}

getInfo();
\`\`\`

**A:** \`"number"\`  
**B:** \`"string"\`  
**C:** \`"undefined"\`  
**D:** \`ReferenceError\`

**Answer:** D

**Explanation:** Variables declared with the \`const\` keyword are not accessible before they are initialized, this is called the _temporal dead zone_. In the \`getInfo\` function, on the first line, we try to access the \`randomValue\` variable before it is declared. The \`const\` variable is not accessible before its declaration, this throws a \`ReferenceError\`. If we had used \`var\` instead of \`const\`, the variable would have been hoisted.


---

## Question 81: JavaScript Hoisting with var and let

**Question:** What's the output of the following code?

\`\`\`javascript
function sayHi() {
  console.log(name);
  console.log(age);
  var name = 'Lydia';
  let age = 21;
}

sayHi();
\`\`\`

**A:** \`Lydia\` and \`undefined\`  
**B:** \`Lydia\` and \`ReferenceError\`  
**C:** \`ReferenceError\` and \`21\`  
**D:** \`undefined\` and \`ReferenceError\`

**Answer:** D

**Explanation:** Within the function, we first declare the \`name\` variable with the \`var\` keyword. This means that the variable gets hoisted (memory space is set up during the creation phase) with the default value of \`undefined\`, until we actually get to the line where we define the variable. We haven't defined the variable yet on the line where we try to log the \`name\` variable, so it still holds the value of \`undefined\`.

Variables with the \`let\` keyword (and \`const\`) are hoisted, but unlike \`var\`, don't get _initialized_. They are not accessible before the line we declare (initialize) them. This is called the "temporal dead zone". When we try to access the variables before they are declared, JavaScript throws a \`ReferenceError\`.

---

## Question 82: for loop with var vs let

**Question:** What's the output of the following code?

\`\`\`javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1);
}

for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1);
}
\`\`\`

**A:** \`0 1 2\` and \`0 1 2\`  
**B:** \`0 1 2\` and \`3 3 3\`  
**C:** \`3 3 3\` and \`0 1 2\`

**Answer:** C

**Explanation:** Because of the event queue in JavaScript, the \`setTimeout\` callback function is called _after_ the loop has been executed. Since the variable \`i\` in the first loop was declared using the \`var\` keyword, this value was global. During the loop, we incremented the value of \`i\` by \`1\` each time, using the unary operator \`++\`. By the time the \`setTimeout\` callback function was invoked, \`i\` was equal to \`3\` in the first example.

In the second loop, the variable \`i\` was declared using the \`let\` keyword: variables declared with the \`let\` (and \`const\`) keyword are block-scoped (a block is anything between \`{ }\`). During each iteration, \`i\` will have a new value, and each value is scoped inside the loop.

---

## Question 83: Arrow Functions and this binding

**Question:** What's the output of the following code?

\`\`\`javascript
const shape = {
  radius: 10,
  diameter() {
    return this.radius * 2;
  },
  perimeter: () => 2 * Math.PI * this.radius,
};

console.log(shape.diameter());
console.log(shape.perimeter());
\`\`\`

**A:** \`20\` and \`62.83185307179586\`  
**B:** \`20\` and \`NaN\`  
**C:** \`20\` and \`63\`  
**D:** \`NaN\` and \`63\`

**Answer:** B

**Explanation:** Note that the value of \`diameter\` is a regular function, whereas the value of \`perimeter\` is an arrow function.

With arrow functions, the \`this\` keyword refers to its current surrounding scope, unlike regular functions! This means that when we call \`perimeter\`, it doesn't refer to the shape object, but to its surrounding scope (window for example).

Since there is no value \`radius\` in the scope of the arrow function, \`this.radius\` returns \`undefined\` which, when multiplied by \`2 * Math.PI\`, results in \`NaN\`.

---

## Question 84: Unary Plus Operator

**Question:** What's the output of the following code?

\`\`\`javascript
+true;
!'Lydia';
\`\`\`

**A:** \`1\` and \`false\`  
**B:** \`false\` and \`NaN\`  
**C:** \`false\` and \`false\`

**Answer:** A

**Explanation:** The unary plus tries to convert an operand to a number. \`true\` is \`1\`, and \`false\` is \`0\`.

The string \`'Lydia'\` is a truthy value. What we're actually asking, is "Is this truthy value falsy?". This returns \`false\`.

---

## Question 85: Object Property Access

**Question:** Which one is true?

\`\`\`javascript
const bird = {
  size: 'small',
};

const mouse = {
  name: 'Mickey',
  small: true,
};
\`\`\`

**A:** \`mouse.bird.size\` is not valid  
**B:** \`mouse[bird.size]\` is not valid  
**C:** \`mouse[bird["size"]]\` is not valid  
**D:** All of them are valid

**Answer:** A

**Explanation:** In JavaScript, all object keys are strings (unless it's a Symbol). Even though we might not _type_ them as strings, they are always converted into strings under the hood.

JavaScript interprets (or unboxes) statements. When we use bracket notation, it sees the first opening bracket \`[\` and keeps going until it finds the closing bracket \`]\`. Only then, it will evaluate the statement.

\`mouse[bird.size]\`: First it evaluates \`bird.size\`, which is \`"small"\`. \`mouse["small"]\` returns \`true\`

However, with dot notation, this doesn't happen. \`mouse\` does not have a key called \`bird\`, which means that \`mouse.bird\` is \`undefined\`. Then, we ask for the \`size\` using dot notation: \`mouse.bird.size\`. Since \`mouse.bird\` is \`undefined\`, we're actually asking \`undefined.size\`. This isn't valid, and will throw a \`TypeError\`.

---

## Question 86: Object Reference vs Value

**Question:** What's the output of the following code?

\`\`\`javascript
let c = { greeting: 'Hey!' };
let d;

d = c;
c.greeting = 'Hello';
console.log(d.greeting);
\`\`\`

**A:** \`Hello\`  
**B:** \`Hey!\`  
**C:** \`undefined\`  
**D:** \`ReferenceError\`  
**E:** \`TypeError\`

**Answer:** A

**Explanation:** In JavaScript, all objects interact by _reference_ when setting them equal to each other.

First, variable \`c\` holds a value to an object. Later, we assign \`d\` with the same reference that \`c\` has to the object.

When you change one object, you change all of them.

---

## Question 87: Function Constructor vs Regular Function

**Question:** What's the output of the following code?

\`\`\`javascript
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

const lydia = new Person('Lydia', 'Hallie');
const sarah = Person('Sarah', 'Smith');

console.log(lydia);
console.log(sarah);
\`\`\`

**A:** \`Person {firstName: "Lydia", lastName: "Hallie"}\` and \`undefined\`  
**B:** \`Person {firstName: "Lydia", lastName: "Hallie"}\` and \`Person {firstName: "Sarah", lastName: "Smith"}\`  
**C:** \`Person {firstName: "Lydia", lastName: "Hallie"}\` and \`{}\`  
**D:** \`Person {firstName: "Lydia", lastName: "Hallie"}\` and \`ReferenceError\`

**Answer:** A

**Explanation:** For \`sarah\`, we didn't use the \`new\` keyword. When using \`new\`, \`this\` refers to the new empty object we create. However, if you don't add \`new\`, \`this\` refers to the **global object**!

We said that \`this.firstName\` equals \`"Sarah"\` and \`this.lastName\` equals \`"Smith"\`. What we actually did, is defining \`global.firstName = 'Sarah'\` and \`global.lastName = 'Smith'\`. \`sarah\` itself is left \`undefined\`, since we don't return a value from the \`Person\` function.

---

## Question 88: Static Methods in Classes

**Question:** What's the output of the following code?

\`\`\`javascript
class Chameleon {
  static colorChange(newColor) {
    this.newColor = newColor;
    return this.newColor;
  }

  constructor({ newColor = 'green' } = {}) {
    this.newColor = newColor;
  }
}

const freddie = new Chameleon({ newColor: 'purple' });
console.log(freddie.colorChange('orange'));
\`\`\`

**A:** \`orange\`  
**B:** \`purple\`  
**C:** \`green\`  
**D:** \`TypeError\`

**Answer:** D

**Explanation:** The \`colorChange\` function is static. Static methods are designed to live only on the constructor in which they are created, and cannot be passed down to any children or called upon class instances. Since \`freddie\` is an instance of class Chameleon, the function cannot be called upon it. A \`TypeError\` is thrown.

---

## Question 89: Global Object Property Creation

**Question:** What's the output of the following code?

\`\`\`javascript
let greeting;
greetign = {}; // Typo!
console.log(greetign);
\`\`\`

**A:** \`{}\`  
**B:** \`ReferenceError: greetign is not defined\`  
**C:** \`undefined\`

**Answer:** A

**Explanation:** It logs the object, because we just created an empty object on the global object! When we mistyped \`greeting\` as \`greetign\`, the JS interpreter actually saw this as:

1. \`global.greetign = {}\` in Node.js
2. \`window.greetign = {}\`, \`frames.greetign = {}\` and \`self.greetign\` in browsers.
3. \`self.greetign\` in web workers.
4. \`globalThis.greetign\` in all environments.

In order to avoid this, we can use \`"use strict"\`. This makes sure that you have declared a variable before setting it equal to anything.

---

## Question 90: Function Methods and Prototypes

**Question:** What's the output of the following code?

\`\`\`javascript
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

const member = new Person('Lydia', 'Hallie');
Person.getFullName = function () {
  return \`${this.firstName} ${this.lastName}\`;
};

console.log(member.getFullName());
\`\`\`

**A:** \`TypeError\`  
**B:** \`SyntaxError\`  
**C:** \`Lydia Hallie\`  
**D:** \`undefined undefined\`

**Answer:** A

**Explanation:** In JavaScript, functions are objects, and therefore, the method \`getFullName\` gets added to the constructor function object itself. For that reason, we can call \`Person.getFullName()\`, but \`member.getFullName\` throws a \`TypeError\`.

If you want a method to be available to all object instances, you have to add it to the prototype property:

\`\`\`js
Person.prototype.getFullName = function () {
  return \`${this.firstName} ${this.lastName}\`;
};
\`\`\`

## Question 91

The JavaScript global execution context creates two things for you: the global object, and the "this" keyword.

**A:** true  
**B:** false  
**C:** it depends

**Answer:** A

**Explanation:** The base execution context is the global execution context: it's what's accessible everywhere in your code.

## Question 92

What's the output?

```javascript
for (let i = 1; i < 5; i++) {
  if (i === 3) continue;
  console.log(i);
}
```

**A:** `1` `2`  
**B:** `1` `2` `3`  
**C:** `1` `2` `4`  
**D:** `1` `3` `4`

**Answer:** C

**Explanation:** The `continue` statement skips an iteration if a certain condition returns `true`.

## Question 93

What's the output?

```javascript
String.prototype.giveLydiaPizza = () => {
  return 'Just give Lydia pizza already!';
};

const name = 'Lydia';

console.log(name.giveLydiaPizza());
```

**A:** `"Just give Lydia pizza already!"`  
**B:** `TypeError: not a function`  
**C:** `SyntaxError`  
**D:** `undefined`

**Answer:** A

**Explanation:** `String` is a built-in constructor, that we can add properties to. I just added a method to its prototype. Primitive strings are automatically converted into a string object, generated by the string prototype function. So, all strings (string objects) have access to that method!

## Question 94

What's the output?

```javascript
const a = {};
const b = { key: 'b' };
const c = { key: 'c' };

a[b] = 123;
a[c] = 456;

console.log(a[b]);
```

**A:** `123`  
**B:** `456`  
**C:** `undefined`  
**D:** `ReferenceError`

**Answer:** B

**Explanation:** Object keys are automatically converted into strings. We are trying to set an object as a key to object `a`, with the value of `123`. However, when we stringify an object, it becomes `"[object Object]"`. So what we are saying here, is that `a["[object Object]"] = 123`. Then, we can try to do the same again. `c` is another object that we are implicitly stringifying. So then, `a["[object Object]"] = 456`. Then, we log `a[b]`, which is actually `a["[object Object]"]`. We just set that to `456`, so it returns `456`.

## Question 95

What's the output?

```javascript
const foo = () => console.log('First');
const bar = () => setTimeout(() => console.log('Second'));
const baz = () => console.log('Third');

bar();
foo();
baz();
```

**A:** `First` `Second` `Third`  
**B:** `First` `Third` `Second`  
**C:** `Second` `First` `Third`  
**D:** `Second` `Third` `First`

**Answer:** B

**Explanation:** We have a `setTimeout` function and invoked it first. Yet, it was logged last. This is because in browsers, we don't just have the runtime engine, we also have something called a `WebAPI`. The `WebAPI` gives us the `setTimeout` function to start with, and for example the DOM. After the _callback_ is pushed to the WebAPI, the `setTimeout` function itself (but not the callback!) is popped off the stack. Now, `foo` gets invoked, and `"First"` is being logged. `foo` is popped off the stack, and `baz` gets invoked. `"Third"` gets logged. The WebAPI can't just add stuff to the stack whenever it's ready. Instead, it pushes the callback function to something called the _queue_. This is where an event loop starts to work. An **event loop** looks at the stack and task queue. If the stack is empty, it takes the first thing on the queue and pushes it onto the stack. `bar` gets invoked, `"Second"` gets logged, and it's popped off the stack.

## Question 96

What is the event.target when clicking the button?

```html
<div onclick="console.log('first div')">
  <div onclick="console.log('second div')">
    <button onclick="console.log('button')">Click!</button>
  </div>
</div>
```

**A:** Outer `div`  
**B:** Inner `div`  
**C:** `button`  
**D:** An array of all nested elements.

**Answer:** C

**Explanation:** The deepest nested element that caused the event is the target of the event. You can stop bubbling by `event.stopPropagation`

## Question 97

When you click the paragraph, what's the logged output?

```html
<div onclick="console.log('div')">
  <p onclick="console.log('p')">Click here!</p>
</div>
```

**A:** `p` `div`  
**B:** `div` `p`  
**C:** `p`  
**D:** An error will occur.

**Answer:** A

**Explanation:** If we click `p`, we see two logs: `p` and `div`. During event propagation, there are 3 phases: capturing, target, and bubbling. By default, event handlers are executed in the bubbling phase (unless you set `useCapture` to `true`). We go from the deepest nested element outwards.

## Question 98

What's the output?

```javascript
const person = { name: 'Lydia' };

function sayHi(age) {
  console.log(`${this.name} is ${age}`);
}

sayHi.call(person, 21);
sayHi.bind(person, 21);
```

**A:** `undefined is 21` `Lydia is 21`  
**B:** `function` `function`  
**C:** `Lydia is 21` `Lydia is 21`  
**D:** `Lydia is 21` `function`

**Answer:** D

**Explanation:** With both, we can pass the object to which we want the `this` keyword to refer to. However, `.call` is also _executed immediately_! `.bind` returns a _copy_ of the function, but with a bound context! It is not executed immediately.

## Question 99

What's the output?

```javascript
function sayHi() {
  return (() => 0)();
}

typeof sayHi();
```

**A:** `"object"`  
**B:** `"number"`  
**C:** `"function"`  
**D:** `"undefined"`

**Answer:** B

**Explanation:** The `sayHi` function returns the returned value of an immediately invoked function expression (IIFE). This function returned `0`, which is type `"number"`. FYI: there are only 7 built-in types: `null`, `undefined`, `boolean`, `number`, `string`, `object`, and `symbol`. `"function"` is not a type, since functions are objects, it's of type `"object"`.

## Question 100

Which of these values are falsy?

```javascript
0;
new Number(0);
('');
(' ');
new Boolean(false);
undefined;
```

**A:** `0`, `''`, `undefined`  
**B:** `0`, `new Number(0)`, `''`, `new Boolean(false)`, `undefined`  
**C:** `0`, `''`, `new Boolean(false)`, `undefined`  
**D:** All of them are falsy

**Answer:** A

**Explanation:** There are only 6 falsy values: `undefined`, `null`, `NaN`, `0`, `''` (empty string), and `false`. Function constructors like `new Number` and `new Boolean` are truthy.
