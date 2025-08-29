export interface JavaScriptQuestion {
  id: number;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
  code?: string;
}

export const javascriptQuestions: JavaScriptQuestion[] = [
  {
    id: 1,
    question: "What's the output?",
    code: `function sayHi() {
  console.log(name);
  console.log(age);
  var name = 'Lydia';
  let age = 21;
}

sayHi();`,
    options: [
      "Lydia and undefined",
      "Lydia and ReferenceError", 
      "ReferenceError and 21",
      "undefined and ReferenceError"
    ],
    answer: "D",
    explanation: "Within the function, we first declare the `name` variable with the `var` keyword. This means that the variable gets hoisted (memory space is set up during the creation phase) with the default value of `undefined`, until we actually get to the line where we define the variable. We haven't defined the variable yet on the line where we try to log the `name` variable, so it still holds the value of `undefined`. Variables with the `let` keyword (and `const`) are hoisted, but unlike `var`, don't get initialized. They are not accessible before the line we declare (initialize) them. This is called the \"temporal dead zone\". When we try to access the variables before they are declared, JavaScript throws a `ReferenceError`."
  },
  {
    id: 2,
    question: "What's the output?",
    code: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1);
}

for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1);
}`,
    options: [
      "0 1 2 and 0 1 2",
      "0 1 2 and 3 3 3",
      "3 3 3 and 0 1 2"
    ],
    answer: "C",
    explanation: "Because of the event queue in JavaScript, the `setTimeout` callback function is called after the loop has been executed. Since the variable `i` in the first loop was declared using the `var` keyword, this value was global. During the loop, we incremented the value of `i` by `1` each time, using the unary operator `++`. By the time the `setTimeout` callback function was invoked, `i` was equal to `3` in the first example. In the second loop, the variable `i` was declared using the `let` keyword: variables declared with the `let` (and `const`) keyword are block-scoped (a block is anything between `{ }`). During each iteration, `i` will have a new value, and each value is scoped inside the loop."
  },
  {
    id: 3,
    question: "What's the output?",
    code: `const shape = {
  radius: 10,
  diameter() {
    return this.radius * 2;
  },
  perimeter: () => 2 * Math.PI * this.radius,
};

console.log(shape.diameter());
console.log(shape.perimeter());`,
    options: [
      "20 and 62.83185307179586",
      "20 and NaN",
      "20 and 63",
      "NaN and 63"
    ],
    answer: "B",
    explanation: "Note that the value of `diameter` is a regular function, whereas the value of `perimeter` is an arrow function. With arrow functions, the `this` keyword refers to its current surrounding scope, unlike regular functions! This means that when we call `perimeter`, it doesn't refer to the shape object, but to its surrounding scope (window for example). Since there is no value `radius` in the scope of the arrow function, `this.radius` returns `undefined` which, when multiplied by `2 * Math.PI`, results in `NaN`."
  },
  {
    id: 4,
    question: "What's the output?",
    code: `+true;
!'Lydia';`,
    options: [
      "1 and false",
      "false and NaN",
      "false and false"
    ],
    answer: "A",
    explanation: "The unary plus tries to convert an operand to a number. `true` is `1`, and `false` is `0`. The string `'Lydia'` is a truthy value. What we're actually asking, is \"Is this truthy value falsy?\". This returns `false`."
  },
  {
    id: 5,
    question: "Which one is true?",
    code: `const bird = {
  size: 'small',
};

const mouse = {
  name: 'Mickey',
  small: true,
};`,
    options: [
      "mouse.bird.size is not valid",
      "mouse[bird.size] is not valid",
      "mouse[bird[\"size\"]] is not valid",
      "All of them are valid"
    ],
    answer: "A",
    explanation: "In JavaScript, all object keys are strings (unless it's a Symbol). Even though we might not type them as strings, they are always converted into strings under the hood. JavaScript interprets (or unboxes) statements. When we use bracket notation, it sees the first opening bracket `[` and keeps going until it finds the closing bracket `]`. Only then, it will evaluate the statement. `mouse[bird.size]`: First it evaluates `bird.size`, which is `\"small\"`. `mouse[\"small\"]` returns `true`. However, with dot notation, this doesn't happen. `mouse` does not have a key called `bird`, which means that `mouse.bird` is `undefined`. Then, we ask for the `size` using dot notation: `mouse.bird.size`. Since `mouse.bird` is `undefined`, we're actually asking `undefined.size`. This isn't valid, and will throw an error similar to `Cannot read property \"size\" of undefined`."
  },
  {
    id: 6,
    question: "What's the output?",
    code: `let c = { greeting: 'Hey!' };
let d;

d = c;
c.greeting = 'Hello';
console.log(d.greeting);`,
    options: [
      "Hello",
      "Hey!",
      "undefined",
      "ReferenceError",
      "TypeError"
    ],
    answer: "A",
    explanation: "In JavaScript, all objects interact by reference when setting them equal to each other. First, variable `c` holds a value to an object. Later, we assign `d` with the same reference that `c` has to the object. When you change one object, you change all of them."
  },
  {
    id: 7,
    question: "What's the output?",
    code: `let a = 3;
let b = new Number(3);
let c = 3;

console.log(a == b);
console.log(a === b);
console.log(b === c);`,
    options: [
      "true false true",
      "false false true",
      "true false false",
      "false true true"
    ],
    answer: "C",
    explanation: "`new Number()` is a built-in function constructor. Although it looks like a number, it's not really a number: it has a bunch of extra features and is an object. When we use the `==` operator (Equality operator), it only checks whether it has the same value. They both have the value of `3`, so it returns `true`. However, when we use the `===` operator (Strict equality operator), both value and type should be the same. It's not: `new Number()` is not a number, it's an object. Both return `false`."
  },
  {
    id: 8,
    question: "What's the output?",
    code: `class Chameleon {
  static colorChange(newColor) {
    this.newColor = newColor;
    return this.newColor;
  }

  constructor({ newColor = 'green' } = {}) {
    this.newColor = newColor;
  }
}

const freddie = new Chameleon({ newColor: 'purple' });
console.log(freddie.colorChange('orange'));`,
    options: [
      "orange",
      "purple",
      "green",
      "TypeError"
    ],
    answer: "D",
    explanation: "The `colorChange` function is static. Static methods are designed to live only on the constructor in which they are created, and cannot be passed down to any children or called upon class instances. Since `freddie` is an instance of class Chameleon, the function cannot be called upon it. A `TypeError` is thrown."
  },
  {
    id: 9,
    question: "What's the output?",
    code: `let greeting;
greetign = {}; // Typo!
console.log(greetign);`,
    options: [
      "{}",
      "ReferenceError: greetign is not defined",
      "undefined"
    ],
    answer: "A",
    explanation: "It logs the object, because we just created an empty object on the global object! When we mistyped `greeting` as `greetign`, the JS interpreter actually saw this as `global.greetign = {}` in Node.js, `window.greetign = {}` in browsers, etc. In order to avoid this, we can use `\"use strict\"`. This makes sure that you have declared a variable before setting it equal to anything."
  },
  {
    id: 10,
    question: "What happens when we do this?",
    code: `function bark() {
  console.log('Woof!');
}

bark.animal = 'dog';`,
    options: [
      "Nothing, this is totally fine!",
      "SyntaxError. You cannot add properties to a function this way.",
      "\"Woof\" gets logged.",
      "ReferenceError"
    ],
    answer: "A",
    explanation: "This is possible in JavaScript, because functions are objects! (Everything besides primitive types are objects) A function is a special type of object. The code you write yourself isn't the actual function. The function is an object with properties. This property is invocable."
  },
  {
    id: 11,
    question: "What's the output?",
    code: `function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

const member = new Person('Lydia', 'Hallie');
Person.getFullName = function() {
  return \`\${this.firstName} \${this.lastName}\`;
};

console.log(member.getFullName());`,
    options: [
      "TypeError",
      "SyntaxError",
      "Lydia Hallie",
      "undefined undefined"
    ],
    answer: "A",
    explanation: "In JavaScript, functions are objects, and therefore, the method `getFullName` gets added to the constructor function object itself. For that reason, we can call `Person.getFullName()`, but `member.getFullName` throws a `TypeError`. If you want a method to be available to all object instances, you have to add it to the prototype property: `Person.prototype.getFullName = function() { return \`\${this.firstName} \${this.lastName}\`; };`"
  },
  {
    id: 12,
    question: "What's the output?",
    code: `function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

const lydia = new Person('Lydia', 'Hallie');
const sarah = Person('Sarah', 'Smith');

console.log(lydia);
console.log(sarah);`,
    options: [
      "Person {firstName: \"Lydia\", lastName: \"Hallie\"} and undefined",
      "Person {firstName: \"Lydia\", lastName: \"Hallie\"} and Person {firstName: \"Sarah\", lastName: \"Smith\"}",
      "Person {firstName: \"Lydia\", lastName: \"Hallie\"} and {}",
      "Person {firstName: \"Lydia\", lastName: \"Hallie\"} and ReferenceError"
    ],
    answer: "A",
    explanation: "For `sarah`, we didn't use the `new` keyword. When using `new`, `this` refers to the new empty object we create. However, if you don't add `new`, `this` refers to the global object! We said that `this.firstName` equals `\"Sarah\"` and `this.lastName` equals `\"Smith\"`. What we actually did, is defining `global.firstName = 'Sarah'` and `global.lastName = 'Smith'`. `sarah` itself is left `undefined`, since we don't return a value from the `Person` function."
  },
  {
    id: 13,
    question: "What are the three phases of event propagation?",
    options: [
      "Target > Capturing > Bubbling",
      "Bubbling > Target > Capturing",
      "Target > Bubbling > Capturing",
      "Capturing > Target > Bubbling"
    ],
    answer: "D",
    explanation: "During the capturing phase, the event goes through the ancestor elements down to the target element. It then reaches the target element, and bubbling begins."
  },
  {
    id: 14,
    question: "All object have prototypes.",
    options: [
      "true",
      "false"
    ],
    answer: "B",
    explanation: "All objects have prototypes, except for the base object. The base object is the object created by the user, or an object that is created using the `new` keyword. The base object has access to some methods and properties, such as `.toString`. This is the reason why you can use built-in JavaScript methods! All of such methods are available on the prototype. Although JavaScript can't find it directly on your object, it goes down the prototype chain and finds it there, which makes it accessible for you."
  },
  {
    id: 15,
    question: "What's the output?",
    code: `function sum(a, b) {
  return a + b;
}

sum(1, '2');`,
    options: [
      "NaN",
      "TypeError",
      "\"12\"",
      "3"
    ],
    answer: "C",
    explanation: "JavaScript is a dynamically typed language: we don't specify what types certain variables are. Values can automatically be converted into another type without you knowing, which is called implicit type coercion. Coercion is converting from one type into another. In this example, JavaScript converts the number `1` into a string, in order for the function to make sense and return a value. During the addition of a numeric type (`1`) and a string type (`'2'`), the number is treated as a string. We can concatenate strings like `\"Hello\" + \"World\"`, so what's happening here is `\"1\" + \"2\"` which returns `\"12\"`."
  },
  {
    id: 16,
    question: "What's the output?",
    code: `let number = 0;
console.log(number++);
console.log(++number);
console.log(number);`,
    options: [
      "1 1 2",
      "1 2 2",
      "0 2 2",
      "0 1 2"
    ],
    answer: "C",
    explanation: "The postfix unary operator `++`: 1. Returns the value (this returns `0`) 2. Increments the value (number is now `1`) The prefix unary operator `++`: 1. Increments the value (number is now `2`) 2. Returns the value (this returns `2`) This returns `0 2 2`."
  },
  {
    id: 17,
    question: "What's the output?",
    code: `function getPersonInfo(one, two, three) {
  console.log(one);
  console.log(two);
  console.log(three);
}

const person = 'Lydia';
const age = 21;

getPersonInfo\`\${person} is \${age} years old\`;`,
    options: [
      "\"Lydia\" 21 [\"\", \" is \", \" years old\"]",
      "[\"\", \" is \", \" years old\"] \"Lydia\" 21",
      "\"Lydia\" [\"\", \" is \", \" years old\"] 21"
    ],
    answer: "B",
    explanation: "If you use tagged template literals, the value of the first argument is always an array of the string values. The remaining arguments get the values of the passed expressions!"
  },
  {
    id: 18,
    question: "What's the output?",
    code: `function checkAge(data) {
  if (data === { age: 18 }) {
    console.log('You are an adult!');
  } else if (data == { age: 18 }) {
    console.log('You are still an adult.');
  } else {
    console.log(\`Hmm.. You don't have an age I guess\`);
  }
}

checkAge({ age: 18 });`,
    options: [
      "You are an adult!",
      "You are still an adult.",
      "Hmm.. You don't have an age I guess"
    ],
    answer: "C",
    explanation: "When testing equality, primitives are compared by their value, while objects are compared by their reference. JavaScript checks if the objects have a reference to the same location in memory. The two objects that we are comparing don't have that: the object we passed as a parameter refers to a different location in memory than the object we used in order to check equality. This is why both `{ age: 18 } === { age: 18 }` and `{ age: 18 } == { age: 18 }` return `false`."
  },
  {
    id: 19,
    question: "What's the output?",
    code: `function getAge(...args) {
  console.log(typeof args);
}

getAge(21);`,
    options: [
      "\"number\"",
      "\"array\"",
      "\"object\"",
      "\"NaN\""
    ],
    answer: "C",
    explanation: "The rest parameter (`...args`) lets us \"collect\" all remaining arguments into an array. An array is an object, so `typeof args` returns `\"object\"`"
  },
  {
    id: 20,
    question: "What's the output?",
    code: `function getAge() {
  'use strict';
  age = 21;
  console.log(age);
}

getAge();`,
    options: [
      "21",
      "undefined",
      "ReferenceError",
      "TypeError"
    ],
    answer: "C",
    explanation: "With `\"use strict\"`, you can make sure that you don't accidentally declare global variables. We never declared the variable `age`, and since we use `\"use strict\"`, it will throw a reference error. If we didn't use `\"use strict\"`, it would have worked, since the property `age` would have gotten added to the global object."
  },
  {
    id: 21,
    question: "What's the output?",
    code: `function sayHi() {
  return (() => 0)();
}

typeof sayHi();`,
    options: [
      "\"object\"",
      "\"number\"",
      "\"function\"",
      "\"undefined\""
    ],
    answer: "B",
    explanation: "The `sayHi` function returns the returned value of an immediately invoked function expression (IIFE). This function returned `0`, which is type `\"number\"`. In JavaScript, there are only 7 built-in types: `undefined`, `null`, `boolean`, `number`, `string`, `object`, and `symbol`. `\"function\"` is not a type, since functions are objects, it's of type `\"object\"`."
  },
  {
    id: 22,
    question: "Which of these values are falsy?",
    code: `0;
new Number(0);
('');
(' ');
new Boolean(false);
undefined;`,
    options: [
      "0, '', undefined",
      "0, new Number(0), '', new Boolean(false), undefined",
      "0, '', new Boolean(false), undefined",
      "All of them are falsy"
    ],
    answer: "A",
    explanation: "There are only 6 falsy values: `undefined`, `null`, `NaN`, `0`, `\"\"` (empty string), and `false`. Function constructors like `new Number` and `new Boolean` are truthy."
  },
  {
    id: 23,
    question: "What's the output?",
    code: `console.log(typeof typeof 1);`,
    options: [
      "\"number\"",
      "\"string\"",
      "\"object\"",
      "\"undefined\""
    ],
    answer: "B",
    explanation: "`typeof 1` returns `\"number\"`. `typeof \"number\"` returns `\"string\"`."
  },
  {
    id: 24,
    question: "What's the output?",
    code: `const numbers = [1, 2, 3];
numbers[10] = 11;
console.log(numbers);`,
    options: [
      "[1, 2, 3, 7 x empty, 11]",
      "[1, 2, 3, 11]",
      "[1, 2, 3, 7 x null, 11]",
      "[1, 2, 3, 7 x undefined, 11]"
    ],
    answer: "A",
    explanation: "When you set a value to an element in an array that exceeds the length of the array, JavaScript creates something called \"empty slots\". These actually have the value of `undefined`, but you'll see something like: `[1, 2, 3, 7 x empty, 11]` depending on where you run it (it's different for every browser, node, etc.)"
  },
  {
    id: 25,
    question: "What's the output?",
    code: `(() => {
  let x, y;
  try {
    throw new Error();
  } catch (x) {
    (x = 1), (y = 2);
    console.log(x);
  }
  console.log(x);
  console.log(y);
})();`,
    options: [
      "1 undefined 2",
      "undefined undefined undefined",
      "1 1 2",
      "1 undefined undefined"
    ],
    answer: "A",
    explanation: "The `catch` block receives the argument `x`. This is not the same `x` as the variable when we pass arguments. This variable `x` is block-scoped. Later, we set this block-scoped variable equal to `1`, and set the value of variable `y`. Now, we log the block-scoped variable `x`, which equals `1`. Outside of the `catch` block, `x` is still `undefined`, and `y` is `2`. So when we want to `console.log(x)` outside of the `catch` block, it returns `undefined`, and `y` returns `2`."
  },
  {
    id: 26,
    question: "What's the output?",
    code: `[[0, 1], [2, 3]].reduce(
  (acc, cur) => {
    return acc.concat(cur);
  },
  [1, 2],
);`,
    options: [
      "[0, 1, 2, 3, 1, 2]",
      "[6, 1, 2]",
      "[1, 2, 0, 1, 2, 3]",
      "[1, 2, 6]"
    ],
    answer: "C",
    explanation: "`[1, 2]` is our initial value. This is the value we start with, and the value of the very first `acc`. During the first round, `acc` is `[1, 2]`, and `cur` is `[0, 1]`. We concatenate them, which results in `[1, 2, 0, 1]`. During the second round, `acc` is `[1, 2, 0, 1]`, and `cur` is `[2, 3]`. We concatenate them, and get `[1, 2, 0, 1, 2, 3]`."
  },
  {
    id: 27,
    question: "What's the output?",
    code: `!!null;
!!'';
!!1;`,
    options: [
      "false true false",
      "false false true",
      "false true true",
      "true true false"
    ],
    answer: "B",
    explanation: "`null` is falsy. `!null` returns `true`. `!true` returns `false`. `\"\"` (empty string) is falsy. `!\"\"` returns `true`. `!true` returns `false`. `1` is truthy. `!1` returns `false`. `!false` returns `true`."
  },
  {
    id: 28,
    question: "What's the output?",
    code: `setInterval(() => console.log('Hi'), 1000);`,
    options: [
      "A unique id",
      "The amount of milliseconds specified",
      "The passed function",
      "undefined"
    ],
    answer: "A",
    explanation: "It returns a unique id. This id can be used to clear that interval with the `clearInterval()` function."
  },
  {
    id: 29,
    question: "What's the output?",
    code: `[...'Lydia'];`,
    options: [
      "[\"L\", \"y\", \"d\", \"i\", \"a\"]",
      "[\"Lydia\"]",
      "[[], \"Lydia\"]",
      "[[\"L\", \"y\", \"d\", \"i\", \"a\"]]"
    ],
    answer: "A",
    explanation: "A string is an iterable. The spread operator maps every character of an iterable to one element."
  },
  {
    id: 30,
    question: "What's the output?",
    code: `function* generator(i) {
  yield i;
  yield i * 2;
}

const gen = generator(10);

console.log(gen.next().value);
console.log(gen.next().value);`,
    options: [
      "[0, 10], [10, 20]",
      "20, 20",
      "10, 20",
      "0, 10 and 10, 20"
    ],
    answer: "C",
    explanation: "Regular functions can't be stopped mid-way after invocation. However, a generator function can be \"stopped\" mid-way, and later continue from where it stopped. Every time a generator function encounters a `yield` keyword, the function yields the value specified after it. Note that the generator doesn't return the value, it yields the value. First, we initialize the generator function with `i` equal to `10`. We invoke the generator function using the `next()` method. The first time we invoke the generator function, `i` is equal to `10`. It encounters the first `yield` keyword, and yields the value of `i`. The generator is now \"paused\", and `10` gets logged. Then, we invoke the function again with the `next()` method. It starts to continue from where it stopped previously, still with `i` equal to `10`. Now, it encounters the next `yield` keyword, and yields `i * 2`. `i` is equal to `10`, so it yields `10 * 2`, which is `20`. This results in `10, 20`."
  },
  {
    id: 31,
    question: "What's the output?",
    code: `const firstPromise = new Promise((res, rej) => {
  setTimeout(res, 500, 'one');
});

const secondPromise = new Promise((res, rej) => {
  setTimeout(res, 100, 'two');
});

Promise.race([firstPromise, secondPromise]).then(res => console.log(res));`,
    options: [
      "\"one\"",
      "\"two\"",
      "\"two\" \"one\"",
      "\"one\" \"two\""
    ],
    answer: "B",
    explanation: "When we pass multiple promises to the `Promise.race` method, it resolves/rejects the first promise that resolves/rejects. To the `setTimeout` method, we pass a timer: 500ms for the first promise (`firstPromise`), and 100ms for the second promise (`secondPromise`). This means that the `secondPromise` resolves first with the value of `'two'`. `res` now holds the value of `'two'`, which gets logged."
  },
  {
    id: 32,
    question: "What's the output?",
    code: `let person = { name: 'Lydia' };
const members = [person];
person = null;

console.log(members);`,
    options: [
      "null",
      "[null]",
      "[{}]",
      "[{ name: \"Lydia\" }]"
    ],
    answer: "D",
    explanation: "First, we declare a variable `person` with the value of an object that has a `name` property. Then we declare a variable called `members`. We set the first element of that array equal to the value of the `person` variable. Objects interact by reference when setting them equal to each other. When you assign a reference from one variable to another, you make a copy of that reference. (note that they don't have the same reference!) Then, we set the variable `person` equal to `null`. We are only modifying the value of the `person` variable, and not the first element in the array, since that element has a different (copied) reference to the object. The first element in `members` array still holds its reference to the original object. When we log the `members` array, the first element still holds the value of the object, which gets logged."
  },
  {
    id: 33,
    question: "What's the output?",
    code: `const person = {
  name: 'Lydia',
  age: 21,
};

for (const item in person) {
  console.log(item);
}`,
    options: [
      "{ name: \"Lydia\" }, { age: 21 }",
      "\"name\", \"age\"",
      "\"Lydia\", 21",
      "[\"name\", \"Lydia\"], [\"age\", 21]"
    ],
    answer: "B",
    explanation: "With a `for-in` loop, we can iterate through object keys, in this case `name` and `age`. Under the hood, object keys are strings (or Symbols). On every loop, we set the value of `item` equal to the current key it's iterating over. First, `item` is equal to `\"name\"` and gets logged. Then, `item` is equal to `\"age\"`, which gets logged."
  },
  {
    id: 34,
    question: "What's the output?",
    code: `console.log(3 + 4 + '5');`,
    options: [
      "\"345\"",
      "\"75\"",
      "12",
      "\"12\""
    ],
    answer: "B",
    explanation: "Operator associativity is the order in which the compiler evaluates the expressions, either left-to-right or right-to-left. This only happens if all operators have the same precedence. We only have one type of operator: `+`. For addition, it is left-to-right. `3 + 4` gets evaluated first. This results in number `7`. `7 + '5'` results in `\"75\"` because of coercion. JavaScript converts the number `7` into a string, see question 15. We can concatenate two strings together. `\"7\" + \"5\"` results in `\"75\"`."
  },
  {
    id: 35,
    question: "What's the value of num?",
    code: `const num = parseInt('7*6', 10);`,
    options: [
      "42",
      "\"42\"",
      "7",
      "NaN"
    ],
    answer: "C",
    explanation: "Only the first numbers in the string are returned. Based on the radix (the second argument in order to specify what type of number we want to parse it to: base 10, hexadecimal, octal, binary, etc.), `parseInt` checks whether the characters in the string are valid. Once it encounters a character that isn't a valid number in the radix, it stops parsing and ignores the following characters. `*` is not a valid number. It only parses `\"7\"` into the decimal `7`. `num` now holds the value of `7`."
  },
  {
    id: 36,
    question: "What's the output?",
    code: `[1, 2, 3].map(num => {
  if (typeof num === 'number') return;
  return num * 2;
});`,
    options: [
      "[]",
      "[null, null, null]",
      "[undefined, undefined, undefined]",
      "[ 3 x empty ]"
    ],
    answer: "C",
    explanation: "When mapping over the array, the value of `num` is equal to the element it's currently iterating over. In this case, all the numbers in the array are of type `number`, so the condition `typeof num === \"number\"` returns `true`. The function returns `undefined` for every iteration. When you return `undefined`, it gets mapped, so the resulting array contains `undefined` for every element."
  },
  {
    id: 37,
    question: "What's the output?",
    code: `function getInfo(member, year) {
  member.name = 'Lydia';
  year = '1998';
}

const person = { name: 'Sarah' };
const birthYear = '1997';

getInfo(person, birthYear);

console.log(person, birthYear);`,
    options: [
      "{ name: \"Lydia\" }, \"1997\"",
      "{ name: \"Sarah\" }, \"1998\"",
      "{ name: \"Lydia\" }, \"1998\"",
      "{ name: \"Sarah\" }, \"1997\""
    ],
    answer: "A",
    explanation: "Arguments are passed by value, unless their value is a reference, then they're passed by reference. `birthYear` is passed by value, since it's a string, not a reference. When we pass arguments by value, a copy of that value is created (see question 46). The variable `birthYear` has a reference to the value `\"1997\"`. The argument `year` also has a reference to the value `\"1997\"`, but it's not the same value as `birthYear`'s reference to `\"1997\"`. When we update the value of `year` by setting `year` equal to `\"1998\"`, we are only updating the value of `year`. `birthYear` is still equal to `\"1997\"`. The value of `person` is an object. The argument `member` has a (copied) reference to the same object. When we modify the property the object that `member` has a reference to, the value of `person` will also be modified, since they both have a reference to the same object. `person`'s `name` property is now equal to the value `\"Lydia\"`."
  },
  {
    id: 38,
    question: "What's the output?",
    code: `function greeting() {
  throw 'Hello world!';
}

function sayHi() {
  try {
    const data = greeting();
    console.log('It worked!', data);
  } catch (e) {
    console.log('Oh no an error:', e);
  }
}

sayHi();`,
    options: [
      "It worked! Hello world!",
      "Oh no an error: undefined",
      "SyntaxError: can only throw Error objects",
      "Oh no an error: Hello world!"
    ],
    answer: "D",
    explanation: "With the `throw` statement, we can create custom errors. With this statement, you can throw exceptions. An exception can be a string, a number, a boolean or an object. In this case, our exception is the string `'Hello world!'`. With the `catch` block, we can specify what to do if an exception is thrown in the try block. An exception is thrown: the string `'Hello world!'`. `e` is now equal to that string, which we log. This results in `'Oh an error: Hello world!'`."
  },
  {
    id: 39,
    question: "What's the output?",
    code: `function Car() {
  this.make = 'Lamborghini';
  return { make: 'Maserati' };
}

const myCar = new Car();
console.log(myCar.make);`,
    options: [
      "\"Lamborghini\"",
      "\"Maserati\"",
      "ReferenceError",
      "TypeError"
    ],
    answer: "B",
    explanation: "When you return a property, the value of the property is equal to the returned value, not the value set in the constructor function. We return the string `\"Maserati\"`, so `myCar.make` is equal to `\"Maserati\"`."
  },
  {
    id: 40,
    question: "What's the output?",
    code: `(() => {
  let x = (y = 10);
})();

console.log(typeof x);
console.log(typeof y);`,
    options: [
      "\"undefined\", \"number\"",
      "\"number\", \"number\"",
      "\"object\", \"number\"",
      "\"number\", \"undefined\""
    ],
    answer: "A",
    explanation: "`let x = y = 10;` is actually shorthand for: `y = 10; let x = y;` When we set `y` equal to `10`, we actually add a property `y` to the global object (`window` in browser, `global` in Node). In a browser, `global.y` is equal to `10`. Then, we declare a variable `x` with the value of `y`, which is `10`. Variables declared with `let` have block scope, they are only defined within the block they're declared in; the immediately invoked function expression (IIFE) in this case. When we use the `typeof` operator, the operand `x` is not defined: we are trying to access `x` outside of the block it's declared in. This means that `x` is not defined. The value of `typeof x` is equal to `\"undefined\"`. However, we created a global variable `y` when setting `y` equal to `10`. This value is accessible anywhere in our code. `y` is defined, and holds a value of type `\"number\"`, so `typeof y` returns `\"number\"`."
  },
  {
    id: 41,
    question: "What's the output?",
    code: `class Chameleon {
  static colorChange(newColor) {
    this.newColor = newColor;
    return this.newColor;
  }

  constructor({ newColor = 'green' } = {}) {
    this.newColor = newColor;
  }
}

const freddie = new Chameleon({ newColor: 'purple' });
freddie.colorChange('orange');`,
    options: [
      "orange",
      "purple",
      "green",
      "TypeError"
    ],
    answer: "D",
    explanation: "The `colorChange` function is static. Static methods are designed to live only on the constructor in which they are created, and cannot be passed down to any children or called upon class instances. Since `freddie` is an instance of class `Chameleon`, the static method cannot be called upon it. A `TypeError` is thrown."
  },
  {
    id: 42,
    question: "What's the output?",
    code: `let greeting;
greetign = {}; // Typo!
console.log(greetign);`,
    options: [
      "{}",
      "ReferenceError: greetign is not defined",
      "undefined",
      "1"
    ],
    answer: "A",
    explanation: "It logs the object, because we just created an empty object on the global object! When we mistyped `greeting` as `greetign`, the JS interpreter actually saw this as `global.greetign = {}` (or `window.greetign = {}` in a browser). In order to avoid this, we can use `\"use strict\"`. This makes sure that you have to declare a variable before you can use it."
  },
  {
    id: 43,
    question: "What happens when we do this?",
    code: `function bark() {
  console.log('Woof!');
}

bark.animal = 'dog';`,
    options: [
      "Nothing, this is totally fine!",
      "SyntaxError. You cannot add properties to a function this way.",
      "\"Woof!\" gets logged.",
      "ReferenceError"
    ],
    answer: "A",
    explanation: "This is possible in JavaScript, because functions are objects! (Everything besides primitive types are objects) A function is a special type of object. The code you write isn't the actual function. The function is an object with properties. This property is invokable."
  },
  {
    id: 44,
    question: "What's the output?",
    code: `function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

const member = new Person('Lydia', 'Hallie');
Person.getFullName = function() {
  return \`\${this.firstName} \${this.lastName}\`;
};

console.log(member.getFullName());`,
    options: [
      "TypeError",
      "SyntaxError",
      "Lydia Hallie",
      "undefined undefined"
    ],
    answer: "A",
    explanation: "You cannot add properties to a constructor like you can with regular objects. If you want to add a feature to all objects at once, you have to use the prototype instead. So in this case, Person.prototype.getFullName = function() { return this.firstName + ' ' + this.lastName; } would have made member.getFullName() work. Why is this beneficial? Say that we added this method to the constructor itself. Maybe not every Person instance needed this method. This would waste a lot of memory space, since they would still have that property, which takes up memory for each instance. Instead, if we add it to the prototype, we just have it at one spot in memory, yet they all have access to it!"
  },
  {
    id: 45,
    question: "What's the output?",
    code: `function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

const lydia = new Person('Lydia', 'Hallie');
const sarah = Person('Sarah', 'Smith');

console.log(lydia);
console.log(sarah);`,
    options: [
      "Person {firstName: \"Lydia\", lastName: \"Hallie\"} and undefined",
      "Person {firstName: \"Lydia\", lastName: \"Hallie\"} and Person {firstName: \"Sarah\", lastName: \"Smith\"}",
      "Person {firstName: \"Lydia\", lastName: \"Hallie\"} and {}",
      "Person {firstName: \"Lydia\", lastName: \"Hallie\"} and ReferenceError"
    ],
    answer: "A",
    explanation: "For `sarah`, we didn't use the `new` keyword. When using `new`, `this` refers to the new empty object we create. However, if you don't add `new`, `this` refers to the **global object**! We said that `this.firstName` equals `\"Sarah\"` and `this.lastName` equals `\"Smith\"`. What we actually did, is defining `global.firstName = 'Sarah'` and `global.lastName = 'Smith'`. `sarah` itself is left `undefined`, since we don't return a value from the `Person` function."
  },
  {
    id: 46,
    question: "What are the three phases of event propagation?",
    options: [
      "Target > Capturing > Bubbling",
      "Bubbling > Target > Capturing",
      "Target > Bubbling > Capturing",
      "Capturing > Target > Bubbling"
    ],
    answer: "D",
    explanation: "During the **capturing** phase, the event goes through the ancestor elements down to the target element. It then reaches the **target** element, and **bubbling** begins."
  },
  {
    id: 47,
    question: "All object have prototypes.",
    options: [
      "true",
      "false"
    ],
    answer: "B",
    explanation: "All objects have prototypes, except for the **base object**. The base object is the object created by the user, or an object that is created using the `new` keyword. The base object has access to some methods and properties, such as `.toString`. This is the reason why you can use built-in JavaScript methods! All of such methods are available on the prototype. Although JavaScript can't find it directly on your object, it goes down the prototype chain and finds it there, which makes it accessible for you."
  },
  {
    id: 48,
    question: "What's the output?",
    code: `function sum(a, b) {
  return a + b;
}

sum(1, '2');`,
    options: [
      "NaN",
      "TypeError",
      "\"12\"",
      "3"
    ],
    answer: "C",
    explanation: "JavaScript is a **dynamically typed language**: we don't specify what types certain variables are. Values can automatically be converted into another type without you knowing, which is called _implicit type coercion_. **Coercion** is converting from one type into another. In this example, JavaScript converts the number `1` into a string, in order for the function to make sense and return a value. During the addition of a numeric type (`1`) and a string type (`'2'`), the number is treated as a string. We can concatenate strings like `\"Hello\" + \"World\"`, so what's happening here is `\"1\" + \"2\"` which returns `\"12\"`."
  },
  {
    id: 49,
    question: "What's the output?",
    code: `let number = 0;
console.log(number++);
console.log(++number);
console.log(number);`,
    options: [
      "1 1 2",
      "1 2 2",
      "0 2 2",
      "0 1 2"
    ],
    answer: "C",
    explanation: "The **postfix** unary operator `++`: 1. Returns the value (this returns `0`) 2. Increments the value (number is now `1`) The **prefix** unary operator `++`: 1. Increments the value (number is now `2`) 2. Returns the value (this returns `2`) This returns `0 2 2`."
  },
  {
    id: 50,
    question: "What's the output?",
    code: `function getPersonInfo(one, two, three) {
  console.log(one);
  console.log(two);
  console.log(three);
}

const person = 'Lydia';
const age = 21;

getPersonInfo\`\${person} is \${age} years old\`;`,
    options: [
      "\"Lydia is 21 years old\" undefined undefined",
      "[\"\", \" is \", \" years old\"] \"Lydia\" 21",
      "\"Lydia\" 21 [\"\", \" is \", \" years old\"]",
      "Error"
    ],
    answer: "B",
    explanation: "If you use tagged template literals, the value of the first argument is always an array of the string values. The remaining arguments get the values of the passed expressions!"
  },
  {
    id: 51,
    question: "What's the output?",
    code: `function checkAge(data) {
  if (data === { age: 18 }) {
    console.log('You are an adult!');
  } else if (data == { age: 18 }) {
    console.log('You are still an adult.');
  } else {
    console.log(\`Hmm.. You don't have an age I guess\`);
  }
}

checkAge({ age: 18 });`,
    options: [
      "You are an adult!",
      "You are still an adult.",
      "Hmm.. You don't have an age I guess",
      "ReferenceError"
    ],
    answer: "C",
    explanation: "When testing equality, primitives are compared by their value, while objects are compared by their reference. JavaScript checks if the objects have a reference to the same location in memory. The two objects that we are comparing don't have that: the object we passed as a parameter refers to a different location in memory than the object we used in order to check equality. This is why both `{ age: 18 } === { age: 18 }` and `{ age: 18 } == { age: 18 }` return `false`."
  },
  {
    id: 52,
    question: "What's the output?",
    code: `function getAge(...args) {
  console.log(typeof args);
}

getAge(21);`,
    options: [
      "\"number\"",
      "\"array\"",
      "\"object\"",
      "\"NaN\""
    ],
    answer: "C",
    explanation: "The rest parameter (`...args`) lets us \"collect\" all remaining arguments into an array. An array is an object, so `typeof args` returns `\"object\"`."
  },
  {
    id: 53,
    question: "What's the output?",
    code: `function getAge() {
  'use strict';
  age = 21;
  console.log(age);
}

getAge();`,
    options: [
      "21",
      "undefined",
      "ReferenceError",
      "TypeError"
    ],
    answer: "C",
    explanation: "With `\"use strict\"`, you can make sure that you don't accidentally declare global variables. We never declared the variable `age`, and since we use `\"use strict\"`, it will throw a reference error. If we didn't use `\"use strict\"`, it would have worked, since the property `age` would have gotten added to the global object."
  },
  {
    id: 54,
    question: "What's the output?",
    code: `const sum = eval('10*10+5');`,
    options: [
      "105",
      "\"105\"",
      "TypeError",
      "10*10+5"
    ],
    answer: "A",
    explanation: "`eval` evaluates codes that's passed as a string. If it's an expression, like in this case, it evaluates the expression. The expression is `10 * 10 + 5`. This returns the number `105`."
  },
  {
    id: 55,
    question: "How long is cool_secret accessible?",
    code: `sessionStorage.setItem('cool_secret', 123);`,
    options: [
      "Forever, the data doesn't get lost.",
      "When the user closes the tab.",
      "When the user closes the entire browser, not just the tab.",
      "When the user shuts off their computer."
    ],
    answer: "B",
    explanation: "The data stored in `sessionStorage` gets removed after closing the tab. If you used `localStorage`, the data would've been there forever, unless for example `localStorage.clear()` is invoked."
  },
  {
    id: 56,
    question: "What's the output?",
    code: `var num = 8;
var num = 10;

console.log(num);`,
    options: [
      "8",
      "10",
      "SyntaxError",
      "ReferenceError"
    ],
    answer: "B",
    explanation: "With the `var` keyword, you can declare multiple variables with the same name. The variable will then retain its latest value. You cannot do this with `let` or `const` since they're block-scoped."
  },
  {
    id: 57,
    question: "What's the output?",
    code: `const obj = { 1: 'a', 2: 'b', 3: 'c' };
const set = new Set([1, 2, 3, 4, 5]);

obj.hasOwnProperty('1');
obj.hasOwnProperty(1);
set.has('1');
set.has(1);`,
    options: [
      "false true false true",
      "false true true true",
      "true true false true",
      "true true true false"
    ],
    answer: "C",
    explanation: "All object keys (excluding Symbols) are strings under the hood, even if you don't type it yourself as a string. This is why `obj.hasOwnProperty('1')` also returns `true`. It doesn't work that way for a set. There is no `'1'` in our set: `set.has('1')` returns `false`. It has the numeric type `1`, `set.has(1)` returns `true`."
  },
  {
    id: 58,
    question: "What's the output?",
    code: `const obj = { a: 'one', b: 'two', a: 'three' };
console.log(obj);`,
    options: [
      "{ a: \"one\", b: \"two\" }",
      "{ b: \"two\", a: \"three\" }",
      "{ a: \"three\", b: \"two\" }",
      "SyntaxError"
    ],
    answer: "C",
    explanation: "If you have two keys with the same name, the key will be replaced. It will still be in its first position, but with the last specified value."
  },
  {
    id: 59,
    question: "The JavaScript global execution context creates two things for you: the global object, and the \"this\" keyword.",
    options: [
      "true",
      "false",
      "it depends"
    ],
    answer: "A",
    explanation: "The base execution context is the global execution context: it's what's accessible everywhere in your code."
  },
  {
    id: 60,
    question: "What's the output?",
    code: `for (let i = 1; i < 5; i++) {
  if (i === 3) continue;
  console.log(i);
}`,
    options: [
      "1 2",
      "1 2 3",
      "1 2 4",
      "1 3 4"
    ],
    answer: "C",
    explanation: "The `continue` statement skips an iteration if a certain condition returns `true`."
  },
  {
    id: 61,
    question: "What's the output?",
    code: `String.prototype.giveLydiaPizza = () => {
  return 'Just give Lydia pizza already!';
};

const name = 'Lydia';

name.giveLydiaPizza();`,
    options: [
      "\"Just give Lydia pizza already!\"",
      "TypeError: not a function",
      "SyntaxError",
      "undefined"
    ],
    answer: "A",
    explanation: "String is a built-in constructor, which we can add properties to. I just added a method to its prototype. Primitive strings are automatically converted into a string object, generated by the string prototype function. So, all strings (string objects) have access to that method!"
  },
  {
    id: 62,
    question: "What's the output?",
    code: `const a = {};
const b = { key: 'b' };
const c = { key: 'c' };

a[b] = 123;
a[c] = 456;

console.log(a[b]);`,
    options: [
      "123",
      "456",
      "undefined",
      "ReferenceError"
    ],
    answer: "B",
    explanation: "Object keys are automatically converted into strings. We are trying to set an object as a key to object `a`, with the value of `123`. However, when we stringify an object, it becomes `\"[object Object]\"`. So what we are saying here, is that `a[\"[object Object]\"] = 123`. Then, we can try to do the same again. `c` is another object that we are implicitly stringifying. So then, `a[\"[object Object]\"] = 456`. Then, we log `a[b]`, which is actually `a[\"[object Object]\"]`. We just set that to `456`, so it returns `456`."
  },
  {
    id: 63,
    question: "What's the output?",
    code: `const foo = () => console.log('First');
const bar = () => setTimeout(() => console.log('Second'));
const baz = () => console.log('Third');

bar();
foo();
baz();`,
    options: [
      "First Second Third",
      "First Third Second",
      "Second First Third",
      "Third First Second"
    ],
    answer: "B",
    explanation: "We have a `setTimeout` function and invoked it first. Yet, it was logged last. This is because in browsers, we don't just have the runtime engine, we also have something called a `WebAPI`. The `WebAPI` gives us the `setTimeout` function to start with, and for example the DOM. After the callback is pushed to the WebAPI, the `setTimeout` function itself (but not the callback!) is popped off the stack."
  },
  {
    id: 64,
    question: "What's the output?",
    code: `<div onclick=\"console.log('div')\">
  <p onclick=\"console.log('p')\">
    Click here!
  </p>
</div>`,
    options: [
      "p div",
      "div p",
      "p",
      "div"
    ],
    answer: "A",
    explanation: "If we click `p`, we see two logs: `p` and `div`. During event propagation, there are 3 phases: capturing, target, and bubbling. By default, event handlers are executed in the bubbling phase (unless you set `useCapture` to `true`). It goes from the deepest nested element outwards."
  },
  {
    id: 65,
    question: "What's the output?",
    code: `const person = { name: 'Lydia' };

function sayHi(age) {
  console.log(\`\${this.name} is \${age}\`);
}

sayHi.call(person, 21);
sayHi.bind(person, 21);`,
    options: [
      "undefined is 21 Lydia is 21",
      "function function",
      "Lydia is 21 Lydia is 21",
      "Lydia is 21 function"
    ],
    answer: "D",
    explanation: "With both, we can pass the object we want `this` to refer to. However, `.call` is also executed immediately! `.bind` returns a copy of the function, but with a bound context! It is not executed immediately."
  },
  {
    id: 66,
    question: "What's the output?",
    code: `function sayHi() {
  return (() => 0)();
}

typeof sayHi();`,
    options: [
      "\"object\"",
      "\"number\"",
      "\"function\"",
      "\"undefined\""
    ],
    answer: "B",
    explanation: "The `sayHi` function returns the returned value of an immediately invoked function expression (IIFE). This function returned `0`, which is type `\"number\"`. In JavaScript, there are only 7 built-in types: `undefined`, `null`, `boolean`, `number`, `string`, `object`, and `symbol`. `\"function\"` is not a type, since functions are objects, it's of type `\"object\"`."
  },
  {
    id: 67,
    question: "Which of these values are falsy?",
    code: `0;
new Number(0);
('');
(' ');
new Boolean(false);
undefined;`,
    options: [
      "0, '', undefined",
      "0, new Number(0), '', new Boolean(false), undefined",
      "0, '', new Boolean(false), undefined",
      "All of them are falsy"
    ],
    answer: "A",
    explanation: "There are only 6 falsy values: `undefined`, `null`, `NaN`, `0`, `\"\"` (empty string), and `false`. Function constructors like `new Number` and `new Boolean` are truthy."
  },
  {
    id: 68,
    question: "What's the output?",
    code: `console.log(typeof typeof 1);`,
    options: [
      "\"number\"",
      "\"string\"",
      "\"object\"",
      "\"undefined\""
    ],
    answer: "B",
    explanation: "`typeof 1` returns `\"number\"`. `typeof \"number\"` returns `\"string\"`."
  },
  {
    id: 69,
    question: "What's the output?",
    code: `const numbers = [1, 2, 3];
numbers[10] = 11;
console.log(numbers);`,
    options: [
      "[1, 2, 3, 7 x empty, 11]",
      "[1, 2, 3, 11]",
      "[1, 2, 3, 7 x null, 11]",
      "[1, 2, 3, 7 x undefined, 11]"
    ],
    answer: "A",
    explanation: "When you set a value to an element in an array that exceeds the length of the array, JavaScript creates something called \"empty slots\". These actually have the value of `undefined`, but you'll see something like: `[1, 2, 3, 7 x empty, 11]` depending on where you run it (it's different for every browser, node, etc.)"
  },
  {
    id: 70,
    question: "What's the output?",
    code: `(() => {
  let x, y;
  try {
    throw new Error();
  } catch (x) {
    (x = 1), (y = 2);
    console.log(x);
  }
  console.log(x);
  console.log(y);
})();`,
    options: [
      "1 undefined 2",
      "undefined undefined undefined",
      "1 1 2",
      "1 undefined undefined"
    ],
    answer: "A",
    explanation: "The `catch` block receives the argument `x`. This is not the same `x` as the variable when we pass arguments. This variable `x` is block-scoped. Later, we set this block-scoped variable equal to `1`, and set the value of variable `y`. Now, we log the block-scoped variable `x`, which equals `1`. Outside of the `catch` block, `x` is still `undefined`, and `y` is `2`. So when we want to `console.log(x)` outside of the `catch` block, it returns `undefined`, and `y` returns `2`."
  },
  {
    id: 71,
    question: "What's the output?",
    code: `[[0, 1], [2, 3]].reduce(
  (acc, cur) => {
    return acc.concat(cur);
  },
  [1, 2],
);`,
    options: [
      "[0, 1, 2, 3, 1, 2]",
      "[6, 1, 2]",
      "[1, 2, 0, 1, 2, 3]",
      "[1, 2, 6]"
    ],
    answer: "C",
    explanation: "`[1, 2]` is our initial value. This is the value we start with, and the value of the very first `acc`. During the first round, `acc` is `[1, 2]`, and `cur` is `[0, 1]`. We concatenate them, which results in `[1, 2, 0, 1]`. During the second round, `acc` is `[1, 2, 0, 1]`, and `cur` is `[2, 3]`. We concatenate them, and get `[1, 2, 0, 1, 2, 3]`."
  },
  {
    id: 72,
    question: "What's the output?",
    code: `!!null;
!!'';
!!1;`,
    options: [
      "false true false",
      "false false true",
      "false true true",
      "true true false"
    ],
    answer: "B",
    explanation: "`null` is falsy. `!null` returns `true`. `!true` returns `false`. `\"\"` (empty string) is falsy. `!\"\"` returns `true`. `!true` returns `false`. `1` is truthy. `!1` returns `false`. `!false` returns `true`."
  },
  {
    id: 73,
    question: "What's the output?",
    code: `setInterval(() => console.log('Hi'), 1000);`,
    options: [
      "A unique id",
      "The amount of milliseconds specified",
      "The passed function",
      "undefined"
    ],
    answer: "A",
    explanation: "It returns a unique id. This id can be used to clear that interval with the `clearInterval()` function."
  },
  {
    id: 74,
    question: "What's the output?",
    code: `[...'Lydia'];`,
    options: [
      "[\"L\", \"y\", \"d\", \"i\", \"a\"]",
      "[\"Lydia\"]",
      "[[], \"Lydia\"]",
      "[[\"L\", \"y\", \"d\", \"i\", \"a\"]]"
    ],
    answer: "A",
    explanation: "A string is an iterable. The spread operator maps every character of an iterable to one element."
  },
  {
    id: 75,
    question: "What's the output?",
    code: `function* generator(i) {
  yield i;
  yield i * 2;
}

const gen = generator(10);

console.log(gen.next().value);
console.log(gen.next().value);`,
    options: [
      "[0, 10], [10, 20]",
      "20, 20",
      "10, 20",
      "0, 10 and 10, 20"
    ],
    answer: "C",
    explanation: "Regular functions can't be stopped mid-way after invocation. However, a generator function can be \"stopped\" mid-way, and later continue from where it stopped. Every time a generator function encounters a `yield` keyword, the function yields the value specified after it. Note that the generator doesn't return the value, it yields the value. First, we initialize the generator function with `i` equal to `10`. We invoke the generator function using the `next()` method. The first time we invoke the generator function, `i` is equal to `10`. It encounters the first `yield` keyword, and yields the value of `i`. The generator is now \"paused\", and `10` gets logged. Then, we invoke the function again with the `next()` method. It starts to continue from where it stopped previously, still with `i` equal to `10`. Now, it encounters the next `yield` keyword, and yields `i * 2`. `i` is equal to `10`, so it yields `10 * 2`, which is `20`. This results in `10, 20`."
  },
  {
    id: 76,
    question: "What's the output?",
    code: `const firstPromise = new Promise((res, rej) => {
  setTimeout(res, 500, 'one');
});

const secondPromise = new Promise((res, rej) => {
  setTimeout(res, 100, 'two');
});

Promise.race([firstPromise, secondPromise]).then(res => console.log(res));`,
    options: [
      "\"one\"",
      "\"two\"",
      "\"two\" \"one\"",
      "\"one\" \"two\""
    ],
    answer: "B",
    explanation: "When we pass multiple promises to the `Promise.race` method, it resolves/rejects the first promise that resolves/rejects. To the `setTimeout` method, we pass a timer: 500ms for the first promise (`firstPromise`), and 100ms for the second promise (`secondPromise`). This means that the `secondPromise` resolves first with the value of `'two'`. `res` now holds the value of `'two'`, which gets logged."
  },
  {
    id: 77,
    question: "What's the output?",
    code: `let person = { name: 'Lydia' };
const members = [person];
person = null;

console.log(members);`,
    options: [
      "null",
      "[null]",
      "[{}]",
      "[{ name: \"Lydia\" }]"
    ],
    answer: "D",
    explanation: "First, we declare a variable `person` with the value of an object that has a `name` property. Then we declare a variable called `members`. We set the first element of that array equal to the value of the `person` variable. Objects interact by reference when setting them equal to each other. When you assign a reference from one variable to another, you make a copy of that reference. (note that they don't have the same reference!) Then, we set the variable `person` equal to `null`. We are only modifying the value of the `person` variable, and not the first element in the array, since that element has a different (copied) reference to the object. The first element in `members` array still holds its reference to the original object. When we log the `members` array, the first element still holds the value of the object, which gets logged."
  },
  {
    id: 78,
    question: "What's the output?",
    code: `const person = {
  name: 'Lydia',
  age: 21,
};

for (const item in person) {
  console.log(item);
}`,
    options: [
      "{ name: \"Lydia\" }, { age: 21 }",
      "\"name\", \"age\"",
      "\"Lydia\", 21",
      "[\"name\", \"Lydia\"], [\"age\", 21]"
    ],
    answer: "B",
    explanation: "With a `for-in` loop, we can iterate through object keys, in this case `name` and `age`. Under the hood, object keys are strings (or Symbols). On every loop, we set the value of `item` equal to the current key it's iterating over. First, `item` is equal to `\"name\"` and gets logged. Then, `item` is equal to `\"age\"`, which gets logged."
  },
  {
    id: 79,
    question: "What's the output?",
    code: `console.log(3 + 4 + '5');`,
    options: [
      "\"345\"",
      "\"75\"",
      "12",
      "\"12\""
    ],
    answer: "B",
    explanation: "Operator associativity is the order in which the compiler evaluates the expressions, either left-to-right or right-to-left. This only happens if all operators have the same precedence. We only have one type of operator: `+`. For addition, it is left-to-right. `3 + 4` gets evaluated first. This results in number `7`. `7 + '5'` results in `\"75\"` because of coercion. JavaScript converts the number `7` into a string, see question 15. We can concatenate two strings together. `\"7\" + \"5\"` results in `\"75\"`."
  },
  {
    id: 80,
    question: "What's the value of num?",
    code: `const num = parseInt('7*6', 10);`,
    options: [
      "42",
      "\"42\"",
      "7",
      "NaN"
    ],
    answer: "C",
    explanation: "Only the first numbers in the string are returned. Based on the radix (the second argument in order to specify what type of number we want to parse it to: base 10, hexadecimal, octal, binary, etc.), `parseInt` checks whether the characters in the string are valid. Once it encounters a character that isn't a valid number in the radix, it stops parsing and ignores the following characters. `*` is not a valid number. It only parses `\"7\"` into the decimal `7`. `num` now holds the value of `7`."
  },
  {
    id: 81,
    question: "What's the output?",
    code: `[1, 2, 3].map(num => {
  if (typeof num === 'number') return;
  return num * 2;
});`,
    options: [
      "[]",
      "[null, null, null]",
      "[undefined, undefined, undefined]",
      "[ 3 x empty ]"
    ],
    answer: "C",
    explanation: "When mapping over the array, the value of `num` is equal to the element it's currently iterating over. In this case, all the numbers in the array are of type `number`, so the condition `typeof num === \"number\"` returns `true`. The function returns `undefined` for every iteration. When you return `undefined`, it gets mapped, so the resulting array contains `undefined` for every element."
  },
  {
    id: 82,
    question: "What's the output?",
    code: `function getInfo(member, year) {
  member.name = 'Lydia';
  year = '1998';
}

const person = { name: 'Sarah' };
const birthYear = '1997';

getInfo(person, birthYear);

console.log(person, birthYear);`,
    options: [
      "{ name: \"Lydia\" }, \"1997\"",
      "{ name: \"Sarah\" }, \"1998\"",
      "{ name: \"Lydia\" }, \"1998\"",
      "{ name: \"Sarah\" }, \"1997\""
    ],
    answer: "A",
    explanation: "Arguments are passed by value, unless their value is a reference, then they're passed by reference. `birthYear` is passed by value, since it's a string, not a reference. When we pass arguments by value, a copy of that value is created (see question 46). The variable `birthYear` has a reference to the value `\"1997\"`. The argument `year` also has a reference to the value `\"1997\"`, but it's not the same value as `birthYear`'s reference to `\"1997\"`. When we update the value of `year` by setting `year` equal to `\"1998\"`, we are only updating the value of `year`. `birthYear` is still equal to `\"1997\"`. The value of `person` is an object. The argument `member` has a (copied) reference to the same object. When we modify the property the object that `member` has a reference to, the value of `person` will also be modified, since they both have a reference to the same object. `person`'s `name` property is now equal to the value `\"Lydia\"`."
  },
  {
    id: 83,
    question: "What's the output?",
    code: `function greeting() {
  throw 'Hello world!';
}

function sayHi() {
  try {
    const data = greeting();
    console.log('It worked!', data);
  } catch (e) {
    console.log('Oh no an error:', e);
  }
}

sayHi();`,
    options: [
      "It worked! Hello world!",
      "Oh no an error: undefined",
      "SyntaxError: can only throw Error objects",
      "Oh no an error: Hello world!"
    ],
    answer: "D",
    explanation: "With the `throw` statement, we can create custom errors. With this statement, you can throw exceptions. An exception can be a string, a number, a boolean or an object. In this case, our exception is the string `'Hello world!'`. With the `catch` block, we can specify what to do if an exception is thrown in the try block. An exception is thrown: the string `'Hello world!'`. `e` is now equal to that string, which we log. This results in `'Oh an error: Hello world!'`."
  },
  {
    id: 84,
    question: "What's the output?",
    code: `function Car() {
  this.make = 'Lamborghini';
  return { make: 'Maserati' };
}

const myCar = new Car();
console.log(myCar.make);`,
    options: [
      "\"Lamborghini\"",
      "\"Maserati\"",
      "ReferenceError",
      "TypeError"
    ],
    answer: "B",
    explanation: "When you return a property, the value of the property is equal to the returned value, not the value set in the constructor function. We return the string `\"Maserati\"`, so `myCar.make` is equal to `\"Maserati\"`."
  },
  {
    id: 85,
    question: "What's the output?",
    code: `(() => {
  let x = (y = 10);
})();

console.log(typeof x);
console.log(typeof y);`,
    options: [
      "\"undefined\", \"number\"",
      "\"number\", \"number\"",
      "\"object\", \"number\"",
      "\"number\", \"undefined\""
    ],
    answer: "A",
    explanation: "`let x = y = 10;` is actually shorthand for: `y = 10; let x = y;` When we set `y` equal to `10`, we actually add a property `y` to the global object (`window` in browser, `global` in Node). In a browser, `global.y` is equal to `10`. Then, we declare a variable `x` with the value of `y`, which is `10`. Variables declared with `let` have block scope, they are only defined within the block they're declared in; the immediately invoked function expression (IIFE) in this case. When we use the `typeof` operator, the operand `x` is not defined: we are trying to access `x` outside of the block it's declared in. This means that `x` is not defined. The value of `typeof x` is equal to `\"undefined\"`. However, we created a global variable `y` when setting `y` equal to `10`. This value is accessible anywhere in our code. `y` is defined, and holds a value of type `\"number\"`, so `typeof y` returns `\"number\"`."
  },
  {
    id: 86,
    question: "What's the output?",
    code: `class Chameleon {
  static colorChange(newColor) {
    this.newColor = newColor;
    return this.newColor;
  }

  constructor({ newColor = 'green' } = {}) {
    this.newColor = newColor;
  }
}

const freddie = new Chameleon({ newColor: 'purple' });
freddie.colorChange('orange');`,
    options: [
      "orange",
      "purple",
      "green",
      "TypeError"
    ],
    answer: "D",
    explanation: "The `colorChange` function is static. Static methods are designed to live only on the constructor in which they are created, and cannot be passed down to any children or called upon class instances. Since `freddie` is an instance of class `Chameleon`, the static method cannot be called upon it. A `TypeError` is thrown."
  },
  {
    id: 87,
    question: "What's the output?",
    code: `let greeting;
greetign = {}; // Typo!
console.log(greetign);`,
    options: [
      "{}",
      "ReferenceError: greetign is not defined",
      "undefined",
      "1"
    ],
    answer: "A",
    explanation: "It logs the object, because we just created an empty object on the global object! When we mistyped `greeting` as `greetign`, the JS interpreter actually saw this as `global.greetign = {}` (or `window.greetign = {}` in a browser). In order to avoid this, we can use `\"use strict\"`. This makes sure that you have to declare a variable before you can use it."
  },
  {
    id: 88,
    question: "What happens when we do this?",
    code: `function bark() {
  console.log('Woof!');
}

bark.animal = 'dog';`,
    options: [
      "Nothing, this is totally fine!",
      "SyntaxError. You cannot add properties to a function this way.",
      "\"Woof!\" gets logged.",
      "ReferenceError"
    ],
    answer: "A",
    explanation: "This is possible in JavaScript, because functions are objects! (Everything besides primitive types are objects) A function is a special type of object. The code you write isn't the actual function. The function is an object with properties. This property is invokable."
  },
  {
    id: 89,
    question: "What's the output?",
    code: `function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

const member = new Person('Lydia', 'Hallie');
Person.getFullName = function() {
  return \`\${this.firstName} \${this.lastName}\`;
};

console.log(member.getFullName());`,
    options: [
      "TypeError",
      "SyntaxError",
      "Lydia Hallie",
      "undefined undefined"
    ],
    answer: "A",
    explanation: "You cannot add properties to a constructor like you can with regular objects. If you want to add a feature to all objects at once, you have to use the prototype instead. So in this case, `Person.prototype.getFullName = function() { return \`\${this.firstName} \${this.lastName}\`; }` would have made `member.getFullName()` work. Why is this beneficial? Say that we added this method to the constructor itself. Maybe not every `Person` instance needed this method. This would waste a lot of memory space, since they would still have that property, which takes up memory for each instance. Instead, if we add it to the prototype, we just have it at one spot in memory, yet they all have access to it!"
  },
  {
    id: 90,
    question: "What's the output?",
    code: `function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

const lydia = new Person('Lydia', 'Hallie');
const sarah = Person('Sarah', 'Smith');

console.log(lydia);
console.log(sarah);`,
    options: [
      "Person {firstName: \"Lydia\", lastName: \"Hallie\"} and undefined",
      "Person {firstName: \"Lydia\", lastName: \"Hallie\"} and Person {firstName: \"Sarah\", lastName: \"Smith\"}",
      "Person {firstName: \"Lydia\", lastName: \"Hallie\"} and {}",
      "Person {firstName: \"Lydia\", lastName: \"Hallie\"} and ReferenceError"
    ],
    answer: "A",
    explanation: "For `sarah`, we didn't use the `new` keyword. When using `new`, `this` refers to the new empty object we create. However, if you don't add `new`, `this` refers to the **global object**! We said that `this.firstName` equals `\"Sarah\"` and `this.lastName` equals `\"Smith\"`. What we actually did, is defining `global.firstName = 'Sarah'` and `global.lastName = 'Smith'`. `sarah` itself is left `undefined`, since we don't return a value from the `Person` function."
  },
  {
    id: 91,
    question: "What are the three phases of event propagation?",
    options: [
      "Target > Capturing > Bubbling",
      "Bubbling > Target > Capturing",
      "Target > Bubbling > Capturing",
      "Capturing > Target > Bubbling"
    ],
    answer: "D",
    explanation: "During the **capturing** phase, the event goes through the ancestor elements down to the target element. It then reaches the **target** element, and **bubbling** begins."
  },
  {
    id: 92,
    question: "All object have prototypes.",
    options: [
      "true",
      "false"
    ],
    answer: "B",
    explanation: "All objects have prototypes, except for the **base object**. The base object is the object created by the user, or an object that is created using the `new` keyword. The base object has access to some methods and properties, such as `.toString`. This is the reason why you can use built-in JavaScript methods! All of such methods are available on the prototype. Although JavaScript can't find it directly on your object, it goes down the prototype chain and finds it there, which makes it accessible for you."
  },
  {
    id: 93,
    question: "What's the output?",
    code: `function sum(a, b) {
  return a + b;
}

sum(1, '2');`,
    options: [
      "NaN",
      "TypeError",
      "\"12\"",
      "3"
    ],
    answer: "C",
    explanation: "JavaScript is a **dynamically typed language**: we don't specify what types certain variables are. Values can automatically be converted into another type without you knowing, which is called _implicit type coercion_. **Coercion** is converting from one type into another. In this example, JavaScript converts the number `1` into a string, in order for the function to make sense and return a value. During the addition of a numeric type (`1`) and a string type (`'2'`), the number is treated as a string. We can concatenate strings like `\"Hello\" + \"World\"`, so what's happening here is `\"1\" + \"2\"` which returns `\"12\"`."
  },
  {
    id: 94,
    question: "What's the output?",
    code: `let number = 0;
console.log(number++);
console.log(++number);
console.log(number);`,
    options: [
      "1 1 2",
      "1 2 2",
      "0 2 2",
      "0 1 2"
    ],
    answer: "C",
    explanation: "The **postfix** unary operator `++`: 1. Returns the value (this returns `0`) 2. Increments the value (number is now `1`) The **prefix** unary operator `++`: 1. Increments the value (number is now `2`) 2. Returns the value (this returns `2`) This returns `0 2 2`."
  },
  {
    id: 95,
    question: "What's the output?",
    code: `function getPersonInfo(one, two, three) {
  console.log(one);
  console.log(two);
  console.log(three);
}

const person = 'Lydia';
const age = 21;

getPersonInfo\`\${person} is \${age} years old\`;`,
    options: [
      "\"Lydia is 21 years old\" undefined undefined",
      "[\"\", \" is \", \" years old\"] \"Lydia\" 21",
      "\"Lydia\" 21 [\"\", \" is \", \" years old\"]",
      "Error"
    ],
    answer: "B",
    explanation: "If you use tagged template literals, the value of the first argument is always an array of the string values. The remaining arguments get the values of the passed expressions!"
  },
  {
    id: 96,
    question: "What's the output?",
    code: `function checkAge(data) {
  if (data === { age: 18 }) {
    console.log('You are an adult!');
  } else if (data == { age: 18 }) {
    console.log('You are still an adult.');
  } else {
    console.log(\`Hmm.. You don't have an age I guess\`);
  }
}

checkAge({ age: 18 });`,
    options: [
      "You are an adult!",
      "You are still an adult.",
      "Hmm.. You don't have an age I guess",
      "ReferenceError"
    ],
    answer: "C",
    explanation: "When testing equality, primitives are compared by their value, while objects are compared by their reference. JavaScript checks if the objects have a reference to the same location in memory. The two objects that we are comparing don't have that: the object we passed as a parameter refers to a different location in memory than the object we used in order to check equality. This is why both `{ age: 18 } === { age: 18 }` and `{ age: 18 } == { age: 18 }` return `false`."
  },
  {
    id: 97,
    question: "What's the output?",
    code: `function getAge(...args) {
  console.log(typeof args);
}

getAge(21);`,
    options: [
      "\"number\"",
      "\"array\"",
      "\"object\"",
      "\"NaN\""
    ],
    answer: "C",
    explanation: "The rest parameter (`...args`) lets us \"collect\" all remaining arguments into an array. An array is an object, so `typeof args` returns `\"object\"`."
  },
  {
    id: 98,
    question: "What's the output?",
    code: `function getAge() {
  'use strict';
  age = 21;
  console.log(age);
}

getAge();`,
    options: [
      "21",
      "undefined",
      "ReferenceError",
      "TypeError"
    ],
    answer: "C",
    explanation: "With `\"use strict\"`, you can make sure that you don't accidentally declare global variables. We never declared the variable `age`, and since we use `\"use strict\"`, it will throw a reference error. If we didn't use `\"use strict\"`, it would have worked, since the property `age` would have gotten added to the global object."
  },
  {
    id: 99,
    question: "What's the output?",
    code: `const sum = eval('10*10+5');`,
    options: [
      "105",
      "\"105\"",
      "TypeError",
      "10*10+5"
    ],
    answer: "A",
    explanation: "`eval` evaluates codes that's passed as a string. If it's an expression, like in this case, it evaluates the expression. The expression is `10 * 10 + 5`. This returns the number `105`."
  },
  {
    id: 100,
    question: "How long is cool_secret accessible?",
    code: `sessionStorage.setItem('cool_secret', 123);`,
    options: [
      "Forever, the data doesn't get lost.",
      "When the user closes the tab.",
      "When the user closes the entire browser, not just the tab.",
      "When the user shuts off their computer."
    ],
    answer: "B",
    explanation: "The data stored in `sessionStorage` gets removed after closing the tab. If you used `localStorage`, the data would've been there forever, unless for example `localStorage.clear()` is invoked."
  },
  {
    id: 101,
    question: "What's the output?",
    code: `var num = 8;
var num = 10;

console.log(num);`,
    options: [
      "8",
      "10",
      "SyntaxError",
      "ReferenceError"
    ],
    answer: "B",
    explanation: "With the `var` keyword, you can declare multiple variables with the same name. The variable will then retain its latest value. You cannot do this with `let` or `const` since they're block-scoped."
  },
  {
    id: 102,
    question: "What's the output?",
    code: `const obj = { 1: 'a', 2: 'b', 3: 'c' };
const set = new Set([1, 2, 3, 4, 5]);

obj.hasOwnProperty('1');
obj.hasOwnProperty(1);
set.has('1');
set.has(1);`,
    options: [
      "false true false true",
      "false true true true",
      "true true false true",
      "true true true false"
    ],
    answer: "C",
    explanation: "All object keys (excluding Symbols) are strings under the hood, even if you don't type it yourself as a string. This is why `obj.hasOwnProperty('1')` also returns `true`. It doesn't work that way for a set. There is no `'1'` in our set: `set.has('1')` returns `false`. It has the numeric type `1`, `set.has(1)` returns `true`."
  },
  {
    id: 103,
    question: "What's the output?",
    code: `const obj = { a: 'one', b: 'two', a: 'three' };
console.log(obj);`,
    options: [
      "{ a: \"one\", b: \"two\" }",
      "{ b: \"two\", a: \"three\" }",
      "{ a: \"three\", b: \"two\" }",
      "SyntaxError"
    ],
    answer: "C",
    explanation: "If you have two keys with the same name, the key will be replaced. It will still be in its first position, but with the last specified value."
  },
  {
    id: 104,
    question: "The JavaScript global execution context creates two things for you: the global object, and the \"this\" keyword.",
    options: [
      "true",
      "false",
      "it depends"
    ],
    answer: "A",
    explanation: "The base execution context is the global execution context: it's what's accessible everywhere in your code."
  },
  {
    id: 105,
    question: "What's the output?",
    code: `for (let i = 1; i < 5; i++) {
  if (i === 3) continue;
  console.log(i);
}`,
    options: [
      "1 2",
      "1 2 3",
      "1 2 4",
      "1 3 4"
    ],
    answer: "C",
    explanation: "The `continue` statement skips an iteration if a certain condition returns `true`."
  },
  {
    id: 106,
    question: "What's the output?",
    code: `String.prototype.giveLydiaPizza = () => {
  return 'Just give Lydia pizza already!';
};

const name = 'Lydia';

name.giveLydiaPizza();`,
    options: [
      "\"Just give Lydia pizza already!\"",
      "TypeError: not a function",
      "SyntaxError",
      "undefined"
    ],
    answer: "A",
    explanation: "String is a built-in constructor, which we can add properties to. I just added a method to its prototype. Primitive strings are automatically converted into a string object, generated by the string prototype function. So, all strings (string objects) have access to that method!"
  },
  {
    id: 107,
    question: "What's the output?",
    code: `const a = {};
const b = { key: 'b' };
const c = { key: 'c' };

a[b] = 123;
a[c] = 456;

console.log(a[b]);`,
    options: [
      "123",
      "456",
      "undefined",
      "ReferenceError"
    ],
    answer: "B",
    explanation: "Object keys are automatically converted into strings. We are trying to set an object as a key to object `a`, with the value of `123`. However, when we stringify an object, it becomes `\"[object Object]\"`. So what we are saying here, is that `a[\"[object Object]\"] = 123`. Then, we can try to do the same again. `c` is another object that we are implicitly stringifying. So then, `a[\"[object Object]\"] = 456`. Then, we log `a[b]`, which is actually `a[\"[object Object]\"]`. We just set that to `456`, so it returns `456`."
  },
  {
    id: 108,
    question: "What's the output?",
    code: `const foo = () => console.log('First');
const bar = () => setTimeout(() => console.log('Second'));
const baz = () => console.log('Third');

bar();
foo();
baz();`,
    options: [
      "First Second Third",
      "First Third Second",
      "Second First Third",
      "Third First Second"
    ],
    answer: "B",
    explanation: "We have a `setTimeout` function and invoked it first. Yet, it was logged last. This is because in browsers, we don't just have the runtime engine, we also have something called a `WebAPI`. The `WebAPI` gives us the `setTimeout` function to start with, and for example the DOM. After the callback is pushed to the WebAPI, the `setTimeout` function itself (but not the callback!) is popped off the stack."
  },
  {
    id: 109,
    question: "What's the output?",
    code: `<div onclick=\"console.log('div')\">
  <p onclick=\"console.log('p')\">
    Click here!
  </p>
</div>`,
    options: [
      "p div",
      "div p",
      "p",
      "div"
    ],
    answer: "A",
    explanation: "If we click `p`, we see two logs: `p` and `div`. During event propagation, there are 3 phases: capturing, target, and bubbling. By default, event handlers are executed in the bubbling phase (unless you set `useCapture` to `true`). It goes from the deepest nested element outwards."
  },
  {
    id: 110,
    question: "What's the output?",
    code: `const person = { name: 'Lydia' };

function sayHi(age) {
  console.log(\`\${this.name} is \${age}\`);
}

sayHi.call(person, 21);
sayHi.bind(person, 21);`,
    options: [
      "undefined is 21 Lydia is 21",
      "function function",
      "Lydia is 21 Lydia is 21",
      "Lydia is 21 function"
    ],
    answer: "D",
    explanation: "With both, we can pass the object we want `this` to refer to. However, `.call` is also executed immediately! `.bind` returns a copy of the function, but with a bound context! It is not executed immediately."
  },
  {
    id: 111,
    question: "What's the output?",
    code: `function sayHi() {
  return (() => 0)();
}

typeof sayHi();`,
    options: [
      "\"object\"",
      "\"number\"",
      "\"function\"",
      "\"undefined\""
    ],
    answer: "B",
    explanation: "The `sayHi` function returns the returned value of an immediately invoked function expression (IIFE). This function returned `0`, which is type `\"number\"`. In JavaScript, there are only 7 built-in types: `undefined`, `null`, `boolean`, `number`, `string`, `object`, and `symbol`. `\"function\"` is not a type, since functions are objects, it's of type `\"object\"`."
  },
  {
    id: 112,
    question: "Which of these values are falsy?",
    code: `0;
new Number(0);
('');
(' ');
new Boolean(false);
undefined;`,
    options: [
      "0, '', undefined",
      "0, new Number(0), '', new Boolean(false), undefined",
      "0, '', new Boolean(false), undefined",
      "All of them are falsy"
    ],
    answer: "A",
    explanation: "There are only 6 falsy values: `undefined`, `null`, `NaN`, `0`, `\"\"` (empty string), and `false`. Function constructors like `new Number` and `new Boolean` are truthy."
  },
  {
    id: 113,
    question: "What's the output?",
    code: `console.log(typeof typeof 1);`,
    options: [
      "\"number\"",
      "\"string\"",
      "\"object\"",
      "\"undefined\""
    ],
    answer: "B",
    explanation: "`typeof 1` returns `\"number\"`. `typeof \"number\"` returns `\"string\"`."
  },
  {
    id: 114,
    question: "What's the output?",
    code: `const numbers = [1, 2, 3];
numbers[10] = 11;
console.log(numbers);`,
    options: [
      "[1, 2, 3, 7 x empty, 11]",
      "[1, 2, 3, 11]",
      "[1, 2, 3, 7 x null, 11]",
      "[1, 2, 3, 7 x undefined, 11]"
    ],
    answer: "A",
    explanation: "When you set a value to an element in an array that exceeds the length of the array, JavaScript creates something called \"empty slots\". These actually have the value of `undefined`, but you'll see something like: `[1, 2, 3, 7 x empty, 11]` depending on where you run it (it's different for every browser, node, etc.)"
  },
  {
    id: 115,
    question: "What's the output?",
    code: `(() => {
  let x, y;
  try {
    throw new Error();
  } catch (x) {
    (x = 1), (y = 2);
    console.log(x);
  }
  console.log(x);
  console.log(y);
})();`,
    options: [
      "1 undefined 2",
      "undefined undefined undefined",
      "1 1 2",
      "1 undefined undefined"
    ],
    answer: "A",
    explanation: "The `catch` block receives the argument `x`. This is not the same `x` as the variable when we pass arguments. This variable `x` is block-scoped. Later, we set this block-scoped variable equal to `1`, and set the value of variable `y`. Now, we log the block-scoped variable `x`, which equals `1`. Outside of the `catch` block, `x` is still `undefined`, and `y` is `2`. So when we want to `console.log(x)` outside of the `catch` block, it returns `undefined`, and `y` returns `2`."
  },
  {
    id: 116,
    question: "What's the output?",
    code: `[[0, 1], [2, 3]].reduce(
  (acc, cur) => {
    return acc.concat(cur);
  },
  [1, 2],
);`,
    options: [
      "[0, 1, 2, 3, 1, 2]",
      "[6, 1, 2]",
      "[1, 2, 0, 1, 2, 3]",
      "[1, 2, 6]"
    ],
    answer: "C",
    explanation: "`[1, 2]` is our initial value. This is the value we start with, and the value of the very first `acc`. During the first round, `acc` is `[1, 2]`, and `cur` is `[0, 1]`. We concatenate them, which results in `[1, 2, 0, 1]`. During the second round, `acc` is `[1, 2, 0, 1]`, and `cur` is `[2, 3]`. We concatenate them, and get `[1, 2, 0, 1, 2, 3]`."
  },
  {
    id: 117,
    question: "What's the output?",
    code: `!!null;
!!'';
!!1;`,
    options: [
      "false true false",
      "false false true",
      "false true true",
      "true true false"
    ],
    answer: "B",
    explanation: "`null` is falsy. `!null` returns `true`. `!true` returns `false`. `\"\"` (empty string) is falsy. `!\"\"` returns `true`. `!true` returns `false`. `1` is truthy. `!1` returns `false`. `!false` returns `true`."
  },
  {
    id: 118,
    question: "What's the output?",
    code: `setInterval(() => console.log('Hi'), 1000);`,
    options: [
      "A unique id",
      "The amount of milliseconds specified",
      "The passed function",
      "undefined"
    ],
    answer: "A",
    explanation: "It returns a unique id. This id can be used to clear that interval with the `clearInterval()` function."
  },
  {
    id: 119,
    question: "What's the output?",
    code: `[...'Lydia'];`,
    options: [
      "[\"L\", \"y\", \"d\", \"i\", \"a\"]",
      "[\"Lydia\"]",
      "[[], \"Lydia\"]",
      "[[\"L\", \"y\", \"d\", \"i\", \"a\"]]"
    ],
    answer: "A",
    explanation: "A string is an iterable. The spread operator maps every character of an iterable to one element."
  },
  {
    id: 120,
    question: "What's the output?",
    code: `function* generator(i) {
  yield i;
  yield i * 2;
}

const gen = generator(10);

console.log(gen.next().value);
console.log(gen.next().value);`,
    options: [
      "[0, 10], [10, 20]",
      "20, 20",
      "10, 20",
      "0, 10 and 10, 20"
    ],
    answer: "C",
    explanation: "Regular functions can't be stopped mid-way after invocation. However, a generator function can be \"stopped\" mid-way, and later continue from where it stopped. Every time a generator function encounters a `yield` keyword, the function yields the value specified after it. Note that the generator doesn't return the value, it yields the value. First, we initialize the generator function with `i` equal to `10`. We invoke the generator function using the `next()` method. The first time we invoke the generator function, `i` is equal to `10`. It encounters the first `yield` keyword, and yields the value of `i`. The generator is now \"paused\", and `10` gets logged. Then, we invoke the function again with the `next()` method. It starts to continue from where it stopped previously, still with `i` equal to `10`. Now, it encounters the next `yield` keyword, and yields `i * 2`. `i` is equal to `10`, so it yields `10 * 2`, which is `20`. This results in `10, 20`."
  },
  {
    id: 121,
    question: "What's the output?",
    code: `(() => {
  let x, y;
  try {
    throw new Error();
  } catch (x) {
    (x = 1), (y = 2);
    console.log(x);
  }
  console.log(x);
  console.log(y);
})();`,
    options: [
      "1 undefined 2",
      "undefined undefined undefined",
      "1 1 2",
      "1 undefined undefined"
    ],
    answer: "A",
    explanation: "The `catch` block receives the argument `x`. This is not the same `x` as the variable when we pass arguments. This variable `x` is block-scoped. Later, we set this block-scoped variable equal to `1`, and set the value of variable `y`. Now, we log the block-scoped variable `x`, which equals `1`. Outside of the `catch` block, `x` is still `undefined`, and `y` is `2`. So when we want to `console.log(x)` outside of the `catch` block, it returns `undefined`, and `y` returns `2`."
  },
  {
    id: 122,
    question: "What's the output?",
    code: `[[0, 1], [2, 3]].reduce(
  (acc, cur) => {
    return acc.concat(cur);
  },
  [1, 2],
);`,
    options: [
      "[0, 1, 2, 3, 1, 2]",
      "[6, 1, 2]",
      "[1, 2, 0, 1, 2, 3]",
      "[1, 2, 6]"
    ],
    answer: "C",
    explanation: "`[1, 2]` is our initial value. This is the value we start with, and the value of the very first `acc`. During the first round, `acc` is `[1, 2]`, and `cur` is `[0, 1]`. We concatenate them, which results in `[1, 2, 0, 1]`. During the second round, `acc` is `[1, 2, 0, 1]`, and `cur` is `[2, 3]`. We concatenate them, and get `[1, 2, 0, 1, 2, 3]`."
  },
  {
    id: 123,
    question: "What's the output?",
    code: `!!null;
!!'';
!!1;`,
    options: [
      "false true false",
      "false false true",
      "false true true",
      "true true false"
    ],
    answer: "B",
    explanation: "`null` is falsy. `!null` returns `true`. `!true` returns `false`. `\"\"` (empty string) is falsy. `!\"\"` returns `true`. `!true` returns `false`. `1` is truthy. `!1` returns `false`. `!false` returns `true`."
  },
  {
    id: 124,
    question: "What's the output?",
    code: `setInterval(() => console.log('Hi'), 1000);`,
    options: [
      "A unique id",
      "The amount of milliseconds specified",
      "The passed function",
      "undefined"
    ],
    answer: "A",
    explanation: "It returns a unique id. This id can be used to clear that interval with the `clearInterval()` function."
  },
  {
    id: 125,
    question: "What's the output?",
    code: `[...'Lydia'];`,
    options: [
      "[\"L\", \"y\", \"d\", \"i\", \"a\"]",
      "[\"Lydia\"]",
      "[[], \"Lydia\"]",
      "[[\"L\", \"y\", \"d\", \"i\", \"a\"]]"
    ],
    answer: "A",
    explanation: "A string is an iterable. The spread operator maps every character of an iterable to one element."
  },
  {
    id: 126,
    question: "What's the output?",
    code: `function* generator(i) {
  yield i;
  yield i * 2;
}

const gen = generator(10);

console.log(gen.next().value);
console.log(gen.next().value);`,
    options: [
      "[0, 10], [10, 20]",
      "20, 20",
      "10, 20",
      "0, 10 and 10, 20"
    ],
    answer: "C",
    explanation: "Regular functions can't be stopped mid-way after invocation. However, a generator function can be \"stopped\" mid-way, and later continue from where it stopped. Every time a generator function encounters a `yield` keyword, the function yields the value specified after it. Note that the generator doesn't return the value, it yields the value. First, we initialize the generator function with `i` equal to `10`. We invoke the generator function using the `next()` method. The first time we invoke the generator function, `i` is equal to `10`. It encounters the first `yield` keyword, and yields the value of `i`. The generator is now \"paused\", and `10` gets logged. Then, we invoke the function again with the `next()` method. It starts to continue from where it stopped previously, still with `i` equal to `10`. Now, it encounters the next `yield` keyword, and yields `i * 2`. `i` is equal to `10`, so it yields `10 * 2`, which is `20`. This results in `10, 20`."
  },
  {
    id: 127,
    question: "What's the output?",
    code: `const firstPromise = new Promise((res, rej) => {
  setTimeout(res, 500, 'one');
});

const secondPromise = new Promise((res, rej) => {
  setTimeout(res, 100, 'two');
});

Promise.race([firstPromise, secondPromise]).then(res => console.log(res));`,
    options: [
      "\"one\"",
      "\"two\"",
      "\"two\" \"one\"",
      "\"one\" \"two\""
    ],
    answer: "B",
    explanation: "When we pass multiple promises to the `Promise.race` method, it resolves/rejects the first promise that resolves/rejects. To the `setTimeout` method, we pass a timer: 500ms for the first promise (`firstPromise`), and 100ms for the second promise (`secondPromise`). This means that the `secondPromise` resolves first with the value of `'two'`. `res` now holds the value of `'two'`, which gets logged."
  },
  {
    id: 128,
    question: "What's the output?",
    code: `let person = { name: 'Lydia' };
const members = [person];
person = null;

console.log(members);`,
    options: [
      "null",
      "[null]",
      "[{}]",
      "[{ name: \"Lydia\" }]"
    ],
    answer: "D",
    explanation: "First, we declare a variable `person` with the value of an object that has a `name` property. Then we declare a variable called `members`. We set the first element of that array equal to the value of the `person` variable. Objects interact by reference when setting them equal to each other. When you assign a reference from one variable to another, you make a copy of that reference. (note that they don't have the same reference!) Then, we set the variable `person` equal to `null`. We're only modifying the value of the variable `person`, and not the first element in the array, since that element has a different (copied) reference to the object. The first element in `members` array still holds its reference to the original object. When we log the `members` array, the first element still holds the value of the object, which gets logged."
  },
  {
    id: 129,
    question: "What's the output?",
    code: `const person = {
  name: 'Lydia',
  age: 21,
};

for (const item in person) {
  console.log(item);
}`,
    options: [
      "{ name: \"Lydia\" }, { age: 21 }",
      "\"name\", \"age\"",
      "\"Lydia\", 21",
      "[\"name\", \"Lydia\"], [\"age\", 21]"
    ],
    answer: "B",
    explanation: "With a `for-in` loop, we can iterate through object keys, in this case `name` and `age`. Under the hood, object keys are strings (or Symbols). On every loop, we set the value of `item` equal to the current key it's iterating over. First, `item` is equal to `\"name\"` and gets logged. Then, `item` is equal to `\"age\"` and gets logged."
  },
  {
    id: 130,
    question: "What's the output?",
    code: `console.log(3 + 4 + '5');`,
    options: [
      "\"345\"",
      "\"75\"",
      "12",
      "\"39\""
    ],
    answer: "B",
    explanation: "Operator associativity is the order in which the compiler evaluates the expressions, either left-to-right or right-to-left. This only happens if all operators have the same precedence. We only have one operator here: `+`. For addition, it is left-to-right. `3 + 4` gets evaluated first. This results in number `7`. `7 + '5'` results in `\"75\"` because of coercion. JavaScript converts the number `7` into a string, see question 15. We can concatenate two strings using the `+`operator. `\"7\" + \"5\"` results in `\"75\"`."
  },
  {
    id: 131,
    question: "What's the value of num?",
    code: `const num = parseInt('7*6', 10);`,
    options: [
      "42",
      "\"42\"",
      "7",
      "NaN"
    ],
    answer: "C",
    explanation: "Only the first numbers in the string are returned. Based on the radix (the second argument in order to specify what type of number we want to parse it to: base 10, hexadecimal, octal, binary, etc.), `parseInt` checks whether the characters in the string are valid. Once it encounters a character that isn't a valid number in the radix, it stops parsing and ignores the following characters. `*` is not a valid number. It only parses `\"7\"` into the decimal `7`. `num` now holds the value of `7`."
  },
  {
    id: 132,
    question: "What's the output?",
    code: `[1, 2, 3].map(num => {
  if (typeof num === 'number') return;
  return num * 2;
});`,
    options: [
      "[]",
      "[null, null, null]",
      "[undefined, undefined, undefined]",
      "[3 empty slots]"
    ],
    answer: "C",
    explanation: "When mapping over the array, the value of `num` is equal to the element it's currently iterating over. In this case, the elements are numbers, so the condition `typeof num === \"number\"` returns `true`. The map function creates a new array and inserts the values returned from the function. However, no value is returned. When we don't return a value from a function, the function returns `undefined`. For every element in the array, the function block gets called, so for each element we return `undefined`."
  },
  {
    id: 133,
    question: "What's the output?",
    code: `function getInfo(member, year) {
  member.name = 'Lydia';
  year = '1998';
}

const person = { name: 'Sarah' };
const birthYear = '1997';

getInfo(person, birthYear);

console.log(person, birthYear);`,
    options: [
      "{ name: \"Lydia\" }, \"1997\"",
      "{ name: \"Sarah\" }, \"1998\"",
      "{ name: \"Lydia\" }, \"1998\"",
      "{ name: \"Sarah\" }, \"1997\""
    ],
    answer: "A",
    explanation: "Arguments are passed by value, unless their value is an object, in which case they're passed by reference. `birthYear` is passed by value, since it's a string, not an object. When we pass arguments by value, a copy of that value is created (see question 46). The variable `birthYear` has a reference to the value `\"1997\"`. The argument `year` also has a reference to the value `\"1997\"`, but it's not the same value as `birthYear`'s reference to `\"1997\"`. When we update the value of `year` by setting `year` equal to `\"1998\"`, we are only updating the value of `year`. `birthYear` is still equal to `\"1997\"`. The value of `person` is an object. The argument `member` has a (copied) reference to the same object. When we modify the property the object that `member` has a reference to, the value of `person` will also be modified, since they both have a reference to the same object. `person`'s `name` property is now equal to the value `\"Lydia\"`."
  },
  {
    id: 134,
    question: "What's the output?",
    code: `function greeting() {
  throw 'Hello world!';
}

function sayHi() {
  try {
    const data = greeting();
    console.log('It worked!', data);
  } catch (e) {
    console.log('Oh no an error:', e);
  }
}

sayHi();`,
    options: [
      "It worked! Hello world!",
      "Oh no an error: undefined",
      "SyntaxError: can only throw Error objects",
      "Oh no an error: Hello world!"
    ],
    answer: "D",
    explanation: "With the `throw` statement, we can create custom errors. With this statement, you can throw exceptions. An exception can be a string, a number, a boolean or an object. In this case, our exception is the string `'Hello world!'`. With the `catch` block, we can specify what to do if an exception is thrown in the try block. An exception is thrown: the string `'Hello world!'`. `e` is now equal to that string, which we log. This results in `'Oh an error: Hello world!'`."
  },
  {
    id: 135,
    question: "What's the output?",
    code: `function Car() {
  this.make = 'Lamborghini';
  return { make: 'Maserati' };
}

const myCar = new Car();
console.log(myCar.make);`,
    options: [
      "\"Lamborghini\"",
      "\"Maserati\"",
      "ReferenceError",
      "TypeError"
    ],
    answer: "B",
    explanation: "When you return a property, the value of the property is equal to the returned value, not the value set in the constructor function. We return the string `\"Maserati\"`, so `myCar.make` is equal to `\"Maserati\"`."
  },
  {
    id: 136,
    question: "What's the output?",
    code: `(() => {
  let x = (y = 10);
})();

console.log(typeof x);
console.log(typeof y);`,
    options: [
      "\"undefined\", \"number\"",
      "\"number\", \"number\"",
      "\"object\", \"number\"",
      "\"number\", \"undefined\""
    ],
    answer: "A",
    explanation: "`let x = y = 10;` is actually shorthand for: `y = 10; let x = y;` When we set `y` equal to `10`, we actually add a property `y` to the global object (`window` in browser, `global` in Node). In a browser, `global.y` equals `10`. Then, we declare a variable `x` with the value of `y`, which is `10`. Variables declared with the `let` keyword are block scoped, they are only defined within the block they're declared in; the immediately invoked function expression (IIFE) in this case. When we use the `typeof` operator, the operand `x` is not defined: we're trying to access `x` outside of the block it's declared in. This means that `x` is not defined. When a value is not assigned, it has the type `\"undefined\"`. `console.log(typeof x)` returns `\"undefined\"`. However, we created a global variable `y` when setting `y` equal to `10`. This value is accessible anywhere in our code. `y` is defined, and holds a value of type `\"number\"`, so `console.log(typeof y)` returns `\"number\"`."
  },
  {
    id: 137,
    question: "What's the output?",
    code: `const numbers = [1, 2, 3];
numbers[10] = 11;
console.log(numbers);`,
    options: [
      "[1, 2, 3, 7 x empty, 11]",
      "[1, 2, 3, 11]",
      "[1, 2, 3, 7 x null, 11]",
      "[1, 2, 3, 7 x undefined, 11]"
    ],
    answer: "A",
    explanation: "When you set a value to an element in an array that exceeds the length of the array, JavaScript creates something called \"empty slots\". These actually have the value of `undefined`, but you'll see something like: `[1, 2, 3, 7 x empty, 11]` depending on where you run it (it's different for every browser, node, etc.)"
  },
  {
    id: 138,
    question: "What's the output?",
    code: `(() => {
  let x, y;
  try {
    throw new Error();
  } catch (x) {
    (x = 1), (y = 2);
    console.log(x);
  }
  console.log(x);
  console.log(y);
})();`,
    options: [
      "1 undefined 2",
      "undefined undefined undefined",
      "1 1 2",
      "1 undefined undefined"
    ],
    answer: "A",
    explanation: "The `catch` block receives the argument `x`. This is not the same `x` as the variable when we pass arguments. This variable `x` is block-scoped. Later, we set this block-scoped variable equal to `1`, and set the value of variable `y`. Now, we log the block-scoped variable `x`, which equals `1`. Outside of the `catch` block, `x` is still `undefined`, and `y` is `2`. So when we want to `console.log(x)` outside of the `catch` block, it returns `undefined`, and `y` returns `2`."
  },
  {
    id: 139,
    question: "What's the output?",
    code: `[[0, 1], [2, 3]].reduce(
  (acc, cur) => {
    return acc.concat(cur);
  },
  [1, 2],
);`,
    options: [
      "[0, 1, 2, 3, 1, 2]",
      "[6, 1, 2]",
      "[1, 2, 0, 1, 2, 3]",
      "[1, 2, 6]"
    ],
    answer: "C",
    explanation: "`[1, 2]` is our initial value. This is the value we start with, and the value of the very first `acc`. During the first round, `acc` is `[1, 2]`, and `cur` is `[0, 1]`. We concatenate them, which results in `[1, 2, 0, 1]`. During the second round, `acc` is `[1, 2, 0, 1]`, and `cur` is `[2, 3]`. We concatenate them, and get `[1, 2, 0, 1, 2, 3]`."
  },
  {
    id: 140,
    question: "What's the output?",
    code: `!!null;
!!'';
!!1;`,
    options: [
      "false true false",
      "false false true",
      "false true true",
      "true true false"
    ],
    answer: "B",
    explanation: "`null` is falsy. `!null` returns `true`. `!true` returns `false`. `\"\"` (empty string) is falsy. `!\"\"` returns `true`. `!true` returns `false`. `1` is truthy. `!1` returns `false`. `!false` returns `true`."
  },
  {
    id: 141,
    question: "What's the output?",
    code: `setInterval(() => console.log('Hi'), 1000);`,
    options: [
      "A unique id",
      "The amount of milliseconds specified",
      "The passed function",
      "undefined"
    ],
    answer: "A",
    explanation: "It returns a unique id. This id can be used to clear that interval with the `clearInterval()` function."
  },
  {
    id: 142,
    question: "What's the output?",
    code: `[...'Lydia'];`,
    options: [
      "[\"L\", \"y\", \"d\", \"i\", \"a\"]",
      "[\"Lydia\"]",
      "[[], \"Lydia\"]",
      "[[\"L\", \"y\", \"d\", \"i\", \"a\"]]"
    ],
    answer: "A",
    explanation: "A string is an iterable. The spread operator maps every character of an iterable to one element."
  },
  {
    id: 143,
    question: "What's the output?",
    code: `function* generator(i) {
  yield i;
  yield i * 2;
}

const gen = generator(10);

console.log(gen.next().value);
console.log(gen.next().value);`,
    options: [
      "[0, 10], [10, 20]",
      "20, 20",
      "10, 20",
      "0, 10 and 10, 20"
    ],
    answer: "C",
    explanation: "Regular functions can't be stopped mid-way after invocation. However, a generator function can be \"stopped\" mid-way, and later continue from where it stopped. Every time a generator function encounters a `yield` keyword, the function yields the value specified after it. Note that the generator doesn't return the value, it yields the value. First, we initialize the generator function with `i` equal to `10`. We invoke the generator function using the `next()` method. The first time we invoke the generator function, `i` is equal to `10`. It encounters the first `yield` keyword, and yields the value of `i`. The generator is now \"paused\", and `10` gets logged. Then, we invoke the function again with the `next()` method. It starts to continue from where it stopped previously, still with `i` equal to `10`. Now, it encounters the next `yield` keyword, and yields `i * 2`. `i` is equal to `10`, so it yields `10 * 2`, which is `20`. This results in `10, 20`."
  },
  {
    id: 144,
    question: "What's the output?",
    code: `const firstPromise = new Promise((res, rej) => {
  setTimeout(res, 500, 'one');
});

const secondPromise = new Promise((res, rej) => {
  setTimeout(res, 100, 'two');
});

Promise.race([firstPromise, secondPromise]).then(res => console.log(res));`,
    options: [
      "\"one\"",
      "\"two\"",
      "\"two\" \"one\"",
      "\"one\" \"two\""
    ],
    answer: "B",
    explanation: "When we pass multiple promises to the `Promise.race` method, it resolves/rejects the first promise that resolves/rejects. To the `setTimeout` method, we pass a timer: 500ms for the first promise (`firstPromise`), and 100ms for the second promise (`secondPromise`). This means that the `secondPromise` resolves first with the value of `'two'`. `res` now holds the value of `'two'`, which gets logged."
  },
  {
    id: 145,
    question: "What's the output?",
    code: `let person = { name: 'Lydia' };
const members = [person];
person = null;

console.log(members);`,
    options: [
      "null",
      "[null]",
      "[{}]",
      "[{ name: \"Lydia\" }]"
    ],
    answer: "D",
    explanation: "First, we declare a variable `person` with the value of an object that has a `name` property. Then we declare a variable called `members`. We set the first element of that array equal to the value of the `person` variable. Objects interact by reference when setting them equal to each other. When you assign a reference from one variable to another, you make a copy of that reference. (note that they don't have the same reference!) Then, we set the variable `person` equal to `null`. We're only modifying the value of the variable `person`, and not the first element in the array, since that element has a different (copied) reference to the object. The first element in `members` array still holds its reference to the original object. When we log the `members` array, the first element still holds the value of the object, which gets logged."
  },
  {
    id: 146,
    question: "What's the output?",
    code: `const person = {
  name: 'Lydia',
  age: 21,
};

for (const item in person) {
  console.log(item);
}`,
    options: [
      "{ name: \"Lydia\" }, { age: 21 }",
      "\"name\", \"age\"",
      "\"Lydia\", 21",
      "[\"name\", \"Lydia\"], [\"age\", 21]"
    ],
    answer: "B",
    explanation: "With a `for-in` loop, we can iterate through object keys, in this case `name` and `age`. Under the hood, object keys are strings (or Symbols). On every loop, we set the value of `item` equal to the current key it's iterating over. First, `item` is equal to `\"name\"` and gets logged. Then, `item` is equal to `\"age\"` and gets logged."
  },
  {
    id: 147,
    question: "What's the output?",
    code: `console.log(3 + 4 + '5');`,
    options: [
      "\"345\"",
      "\"75\"",
      "12",
      "\"39\""
    ],
    answer: "B",
    explanation: "Operator associativity is the order in which the compiler evaluates the expressions, either left-to-right or right-to-left. This only happens if all operators have the same precedence. We only have one operator here: `+`. For addition, it is left-to-right. `3 + 4` gets evaluated first. This results in number `7`. `7 + '5'` results in `\"75\"` because of coercion. JavaScript converts the number `7` into a string, see question 15. We can concatenate two strings using the `+`operator. `\"7\" + \"5\"` results in `\"75\"`."
  },
  {
    id: 148,
    question: "What's the value of num?",
    code: `const num = parseInt('7*6', 10);`,
    options: [
      "42",
      "\"42\"",
      "7",
      "NaN"
    ],
    answer: "C",
    explanation: "Only the first numbers in the string are returned. Based on the radix (the second argument in order to specify what type of number we want to parse it to: base 10, hexadecimal, octal, binary, etc.), `parseInt` checks whether the characters in the string are valid. Once it encounters a character that isn't a valid number in the radix, it stops parsing and ignores the following characters. `*` is not a valid number. It only parses `\"7\"` into the decimal `7`. `num` now holds the value of `7`."
  },
  {
    id: 149,
    question: "What's the output?",
    code: `[1, 2, 3].map(num => {
  if (typeof num === 'number') return;
  return num * 2;
});`,
    options: [
      "[]",
      "[null, null, null]",
      "[undefined, undefined, undefined]",
      "[3 empty slots]"
    ],
    answer: "C",
    explanation: "When mapping over the array, the value of `num` is equal to the element it's currently iterating over. In this case, the elements are numbers, so the condition `typeof num === \"number\"` returns `true`. The map function creates a new array and inserts the values returned from the function. However, no value is returned. When we don't return a value from a function, the function returns `undefined`. For every element in the array, the function block gets called, so for each element we return `undefined`."
  },
  {
    id: 150,
    question: "What's the output?",
    code: `function getInfo(member, year) {
  member.name = 'Lydia';
  year = '1998';
}

const person = { name: 'Sarah' };
const birthYear = '1997';

getInfo(person, birthYear);

console.log(person, birthYear);`,
    options: [
      "{ name: \"Lydia\" }, \"1997\"",
      "{ name: \"Sarah\" }, \"1998\"",
      "{ name: \"Lydia\" }, \"1998\"",
      "{ name: \"Sarah\" }, \"1997\""
    ],
    answer: "A",
    explanation: "Arguments are passed by value, unless their value is an object, in which case they're passed by reference. `birthYear` is passed by value, since it's a string, not an object. When we pass arguments by value, a copy of that value is created (see question 46). The variable `birthYear` has a reference to the value `\"1997\"`. The argument `year` also has a reference to the value `\"1997\"`, but it's not the same value as `birthYear`'s reference to `\"1997\"`. When we update the value of `year` by setting `year` equal to `\"1998\"`, we are only updating the value of `year`. `birthYear` is still equal to `\"1997\"`. The value of `person` is an object. The argument `member` has a (copied) reference to the same object. When we modify the property the object that `member` has a reference to, the value of `person` will also be modified, since they both have a reference to the same object. `person`'s `name` property is now equal to the value `\"Lydia\"`."
  },
  {
    id: 151,
    question: "What's the output?",
    code: `function greeting() {
  throw 'Hello world!';
}

function sayHi() {
  try {
    const data = greeting();
    console.log('It worked!', data);
  } catch (e) {
    console.log('Oh no an error:', e);
  }
}

sayHi();`,
    options: [
      "It worked! Hello world!",
      "Oh no an error: undefined",
      "SyntaxError: can only throw Error objects",
      "Oh no an error: Hello world!"
    ],
    answer: "D",
    explanation: "With the `throw` statement, we can create custom errors. With this statement, you can throw exceptions. An exception can be a string, a number, a boolean or an object. In this case, our exception is the string `'Hello world!'`. With the `catch` block, we can specify what to do if an exception is thrown in the try block. An exception is thrown: the string `'Hello world!'`. `e` is now equal to that string, which we log. This results in `'Oh an error: Hello world!'`."
  },
  {
    id: 152,
    question: "What's the output?",
    code: `function Car() {
  this.make = 'Lamborghini';
  return { make: 'Maserati' };
}

const myCar = new Car();
console.log(myCar.make);`,
    options: [
      "\"Lamborghini\"",
      "\"Maserati\"",
      "ReferenceError",
      "TypeError"
    ],
    answer: "B",
    explanation: "When you return a property, the value of the property is equal to the returned value, not the value set in the constructor function. We return the string `\"Maserati\"`, so `myCar.make` is equal to `\"Maserati\"`."
  },
  {
    id: 153,
    question: "What's the output?",
    code: `(() => {
  let x = (y = 10);
})();

console.log(typeof x);
console.log(typeof y);`,
    options: [
      "\"undefined\", \"number\"",
      "\"number\", \"number\"",
      "\"object\", \"number\"",
      "\"number\", \"undefined\""
    ],
    answer: "A",
    explanation: "`let x = y = 10;` is actually shorthand for: `y = 10; let x = y;` When we set `y` equal to `10`, we actually add a property `y` to the global object (`window` in browser, `global` in Node). In a browser, `global.y` equals `10`. Then, we declare a variable `x` with the value of `y`, which is `10`. Variables declared with the `let` keyword are block scoped, they are only defined within the block they're declared in; the immediately invoked function expression (IIFE) in this case. When we use the `typeof` operator, the operand `x` is not defined: we're trying to access `x` outside of the block it's declared in. This means that `x` is not defined. When a value is not assigned, it has the type `\"undefined\"`. `console.log(typeof x)` returns `\"undefined\"`. However, we created a global variable `y` when setting `y` equal to `10`. This value is accessible anywhere in our code. `y` is defined, and holds a value of type `\"number\"`, so `console.log(typeof y)` returns `\"number\"`."
  },
  {
    id: 154,
    question: "What's the output?",
    code: `const numbers = [1, 2, 3];
numbers[10] = 11;
console.log(numbers);`,
    options: [
      "[1, 2, 3, 7 x empty, 11]",
      "[1, 2, 3, 11]",
      "[1, 2, 3, 7 x null, 11]",
      "[1, 2, 3, 7 x undefined, 11]"
    ],
    answer: "A",
    explanation: "When you set a value to an element in an array that exceeds the length of the array, JavaScript creates something called \"empty slots\". These actually have the value of `undefined`, but you'll see something like: `[1, 2, 3, 7 x empty, 11]` depending on where you run it (it's different for every browser, node, etc.)"
  },
  {
    id: 155,
    question: "What's the output?",
    code: `(() => {
  let x, y;
  try {
    throw new Error();
  } catch (x) {
    (x = 1), (y = 2);
    console.log(x);
  }
  console.log(x);
  console.log(y);
})();`,
    options: [
      "1 undefined 2",
      "undefined undefined undefined",
      "1 1 2",
      "1 undefined undefined"
    ],
    answer: "A",
    explanation: "The `catch` block receives the argument `x`. This is not the same `x` as the variable when we pass arguments. This variable `x` is block-scoped. Later, we set this block-scoped variable equal to `1`, and set the value of variable `y`. Now, we log the block-scoped variable `x`, which equals `1`. Outside of the `catch` block, `x` is still `undefined`, and `y` is `2`. So when we want to `console.log(x)` outside of the `catch` block, it returns `undefined`, and `y` returns `2`."
  }
];

export function getJavaScriptQuestions(): JavaScriptQuestion[] {
  return javascriptQuestions;
}

export function getJavaScriptQuestionById(id: number): JavaScriptQuestion | undefined {
  return javascriptQuestions.find(q => q.id === id);
}
