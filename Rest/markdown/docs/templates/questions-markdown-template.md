# Questions Markdown Template

This template shows both simple and GitHub-style markdown formats for creating questions.

## Simple Format

### Multiple Choice Questions

1. What is the capital of France?
   a) London
   b) Berlin
   c) Paris [correct]
   d) Madrid

Explanation: Paris is the capital and largest city of France.
Category: Geography
Learning Path: World Geography
Topic: European Capitals
Tags: #geography #capitals #europe
Difficulty: easy
Points: 3

---

2. Which of the following are JavaScript data types?
   a) String [correct]
   b) Number [correct]
   c) Boolean [correct]
   d) Array

Explanation: String, Number, and Boolean are primitive data types in JavaScript. Array is not a primitive type but a built-in object.
Category: JavaScript Core
Learning Path: JavaScript Fundamentals
Topic: Data Types
Tags: #javascript #datatypes #primitives
Difficulty: beginner
Points: 5

---

## GitHub-Style Format (Recommended for Code Questions)

### Multiple Choice with Code Blocks

###### 1. What's the output?

```javascript
function sayHi() {
  console.log(name);
  console.log(age);
  var name = 'Lydia';
  let age = 21;
}

sayHi();
```

- A: `Lydia` and `undefined`
- B: `Lydia` and `ReferenceError`
- C: `ReferenceError` and `21`
- D: `undefined` and `ReferenceError`

<details><summary><b>Answer</b></summary>
<p>

#### Answer: D

Within the function, we first declare the `name` variable with the `var` keyword. This means that the variable gets hoisted (memory space is set up during the creation phase) with the default value of `undefined`, until we actually get to the line where we define the variable. We haven't defined the variable yet on the line where we try to log the `name` variable, so it still holds the value of `undefined`.

Variables with the `let` keyword (and `const`) are hoisted, but unlike `var`, don't get <i>initialized</i>. They are not accessible before the line we declare (initialize) them. This is called the "temporal dead zone". When we try to access the variables before they are declared, JavaScript throws a `ReferenceError`.

</p>
</details>

Category: JavaScript Core
Learning Path: Advanced JavaScript Concepts
Topic: Hoisting
Tags: #javascript #hoisting #var #let #temporal-dead-zone
Difficulty: intermediate
Points: 8

---

###### 2. What's the output?

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1);
}

for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1);
}
```

- A: `0 1 2` and `0 1 2`
- B: `0 1 2` and `3 3 3`
- C: `3 3 3` and `0 1 2`

<details><summary><b>Answer</b></summary>
<p>

#### Answer: C

Because of the event queue in JavaScript, the `setTimeout` callback function is called _after_ the loop has been executed. Since the variable `i` in the first loop was declared using the `var` keyword, this value was global. During the loop, we incremented the value of `i` by `1` each time, using the unary operator `++`. By the time the `setTimeout` callback function was invoked, `i` was equal to `3` in the first example.

In the second loop, the variable `i` was declared using the `let` keyword: variables declared with the `let` (and `const`) keyword are block-scoped (a block is anything between `{ }`). During each iteration, `i` will have a new value, and each value is scoped inside the loop.

</p>
</details>

Category: JavaScript Core
Learning Path: Advanced JavaScript Concepts
Topic: Event Loop
Tags: #javascript #eventloop #settimeout #var #let #scope
Difficulty: advanced
Points: 10

---

###### 3. What's the output?

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
```

- A: `20` and `62.83185307179586`
- B: `20` and `NaN`
- C: `20` and `63`
- D: `NaN` and `63`

<details><summary><b>Answer</b></summary>
<p>

#### Answer: B

Note that the value of `diameter` is a regular function, whereas the value of `perimeter` is an arrow function.

With arrow functions, the `this` keyword refers to its current surrounding scope, unlike regular functions! This means that when we call `perimeter`, it doesn't refer to the shape object, but to its surrounding scope (window for example).

Since there is no value `radius` in the scope of the arrow function, `this.radius` returns `undefined` which, when multiplied by `2 * Math.PI`, results in `NaN`.

</p>
</details>

Category: JavaScript Core
Learning Path: Advanced JavaScript Concepts
Topic: this Keyword
Tags: #javascript #this #arrow-functions #scope #methods
Difficulty: intermediate
Points: 7

---

## True/False Questions

4. In JavaScript, all variables declared with 'var' are hoisted to the top of their scope.
   True [correct]
   False

Explanation: Variables declared with 'var' are hoisted to the top of their scope and initialized with 'undefined' before code execution.
Category: JavaScript Core
Learning Path: JavaScript Fundamentals
Topic: Hoisting
Tags: #javascript #hoisting #var
Difficulty: beginner
Points: 2

---

## Open-ended Questions

5. Explain the concept of closures in JavaScript and provide a practical example.

Category: JavaScript Core
Learning Path: Advanced JavaScript Concepts
Topic: Closures
Tags: #javascript #closures #scope #functions
Difficulty: intermediate
Points: 10

---

## Code Questions

6. Write a function that returns the factorial of a given number.

```javascript
// Your code here
function factorial(n) {
  // Implement this function
}
```

Category: Data Structures & Algorithms
Learning Path: Algorithm Fundamentals
Topic: Recursion
Tags: #javascript #recursion #factorial #algorithms
Difficulty: beginner
Points: 8

---

## Formatting Guidelines

### Headers

- Use `###### 1. Question` for GitHub-style questions
- Use `1. Question` for simple format
- Use `---` to separate questions

### Code Blocks

- Use ```javascript for JavaScript code
- Use ```python for Python code
- Use ```html for HTML code
- Use ```css for CSS code

### Options

- **Simple format**: Use `a)`, `b)`, `c)`, `d)` with `[correct]` for right answers
- **GitHub format**: Use `- A:`, `- B:`, `- C:`, `- D:` with HTML details for answers

### Metadata (All Optional)

- **Category**: Choose from the categories list
- **Learning Path**: Choose from available learning paths
- **Topic**: Choose from the topics list
- **Tags**: Use `#tag1 #tag2` format
- **Difficulty**: `easy`, `medium`, `hard`, `beginner`, `intermediate`, `advanced`
- **Points**: Number of points (default: 1)
- **Explanation**: Detailed explanation of the answer

### Answer Format

- **Simple**: Mark correct options with `[correct]`
- **GitHub**: Use HTML details/summary with `Answer: X` format

### Remember

- All metadata fields are optional
- Questions will work with minimal information
- Use exact category and topic names from the reference
- Code questions should include test cases when possible
- Open-ended questions should include sample answers
