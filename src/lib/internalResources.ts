export interface InternalQuestion {
  id: string;
  question: string;
  code?: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
    E?: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D' | 'E';
  explanation: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'javascript' | 'react' | 'css' | 'html' | 'dom' | 'async' | 'es6';
  tags: string[];
  relatedTopics: string[];
}

export interface InternalResource {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  questions: InternalQuestion[];
  totalQuestions: number;
  estimatedTime: number; // in minutes
  prerequisites: string[];
  learningOutcomes: string[];
}

// JavaScript Questions Resource (comprehensive set)
export const javascriptQuestions: InternalQuestion[] = [
  {
    id: "js-1",
    question: "What's the output?",
    code: `function sayHi() {
  console.log(name);
  console.log(age);
  var name = 'Lydia';
  let age = 21;
}

sayHi();`,
    options: {
      A: "Lydia and undefined",
      B: "Lydia and ReferenceError",
      C: "ReferenceError and 21",
      D: "undefined and ReferenceError"
    },
    correctAnswer: "D",
    explanation: "Within the function, we first declare the name variable with the var keyword. This means that the variable gets hoisted (memory space is set up during the creation phase) with the default value of undefined, until we actually get to the line where we define the variable. We haven't defined the variable yet on the line where we try to log the name variable, so it still holds the value of undefined. Variables with the let keyword (and const) are hoisted, but unlike var, don't get initialized. They are not accessible before the line we declare (initialize) them. This is called the 'temporal dead zone'. When we try to access the variables before they are declared, JavaScript throws a ReferenceError.",
    difficulty: "intermediate",
    category: "javascript",
    tags: ["hoisting", "var", "let", "temporal-dead-zone"],
    relatedTopics: ["Variable Declaration", "Scope", "Hoisting"]
  },
  {
    id: "js-2",
    question: "What's the output?",
    code: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1);
}

for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1);
}`,
    options: {
      A: "0 1 2 and 0 1 2",
      B: "0 1 2 and 3 3 3",
      C: "3 3 3 and 0 1 2"
    },
    correctAnswer: "C",
    explanation: "Because of the event queue in JavaScript, the setTimeout callback function is called after the loop has been executed. Since the variable i in the first loop was declared using the var keyword, this value was global. During the loop, we incremented the value of i by 1 each time, using the unary operator ++. By the time the setTimeout callback function was invoked, i was equal to 3 in the first example. In the second loop, the variable i was declared using the let keyword: variables declared with the let (and const) keyword are block-scoped (a block is anything between { }). During each iteration, i will have a new value, and each value is scoped inside the loop.",
    difficulty: "intermediate",
    category: "javascript",
    tags: ["setTimeout", "event-loop", "var", "let", "scope"],
    relatedTopics: ["Asynchronous JavaScript", "Event Loop", "Block Scope"]
  },
  {
    id: "js-3",
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
    options: {
      A: "20 and 62.83185307179586",
      B: "20 and NaN",
      C: "20 and 63",
      D: "NaN and 63"
    },
    correctAnswer: "B",
    explanation: "Note that the value of diameter is a regular function, whereas the value of perimeter is an arrow function. With arrow functions, the this keyword refers to its current surrounding scope, unlike regular functions! This means that when we call perimeter, it doesn't refer to the shape object, but to its surrounding scope (window for example). Since there is no value radius in the scope of the arrow function, this.radius returns undefined which, when multiplied by 2 * Math.PI, results in NaN.",
    difficulty: "intermediate",
    category: "javascript",
    tags: ["this", "arrow-functions", "regular-functions", "scope"],
    relatedTopics: ["This Keyword", "Arrow Functions", "Object Methods"]
  },
  {
    id: "js-4",
    question: "What's the output?",
    code: `+true;
!'Lydia';`,
    options: {
      A: "1 and false",
      B: "false and NaN",
      C: "false and false"
    },
    correctAnswer: "A",
    explanation: "The unary plus tries to convert an operand to a number. true is 1, and false is 0. The string 'Lydia' is a truthy value. What we're actually asking, is 'Is this truthy value falsy?'. This returns false.",
    difficulty: "beginner",
    category: "javascript",
    tags: ["unary-operators", "type-coercion", "truthy-falsy"],
    relatedTopics: ["Type Coercion", "Unary Operators", "Truthy/Falsy Values"]
  },
  {
    id: "js-5",
    question: "Which one is true?",
    code: `const bird = {
  size: 'small',
};

const mouse = {
  name: 'Mickey',
  small: true,
};`,
    options: {
      A: "mouse.bird.size is not valid",
      B: "mouse[bird.size] is not valid",
      C: "mouse[bird['size']] is not valid",
      D: "All of them are valid"
    },
    correctAnswer: "A",
    explanation: "In JavaScript, all object keys are strings (unless it's a Symbol). Even though we might not type them as strings, they are always converted into strings under the hood. JavaScript interprets (or unboxes) statements. When we use bracket notation, it sees the first opening bracket [ and keeps going until it finds the closing bracket ]. Only then, it will evaluate the statement. mouse[bird.size]: First it evaluates bird.size, which is 'small'. mouse['small'] returns true. However, with dot notation, this doesn't happen. mouse does not have a key called bird, which means that mouse.bird is undefined. Then, we ask for the size using dot notation: mouse.bird.size. Since mouse.bird is undefined, we're actually asking undefined.size. This isn't valid, and will throw an error similar to Cannot read property 'size' of undefined.",
    difficulty: "intermediate",
    category: "javascript",
    tags: ["objects", "bracket-notation", "dot-notation", "property-access"],
    relatedTopics: ["Object Properties", "Property Access", "Bracket vs Dot Notation"]
  },
  {
    id: "js-6",
    question: "What's the output?",
    code: `let c = { greeting: 'Hey!' };
let d;

d = c;
c.greeting = 'Hello';
console.log(d.greeting);`,
    options: {
      A: "Hello",
      B: "Hey!",
      C: "undefined",
      D: "ReferenceError",
      E: "TypeError"
    },
    correctAnswer: "A",
    explanation: "In JavaScript, all objects interact by reference when setting them equal to each other. First, variable c holds a value to an object. Later, we assign d with the same reference that c has to the object. When you change one object, you change all of them.",
    difficulty: "beginner",
    category: "javascript",
    tags: ["objects", "reference", "assignment"],
    relatedTopics: ["Object References", "Variable Assignment", "Object Mutability"]
  },
  {
    id: "js-7",
    question: "What's the output?",
    code: `let a = 3;
let b = new Number(3);
let c = 3;

console.log(a == b);
console.log(a === b);
console.log(b === c);`,
    options: {
      A: "true false true",
      B: "false false true",
      C: "true false false",
      D: "false true true"
    },
    correctAnswer: "C",
    explanation: "new Number() is a built-in function constructor. Although it looks like a number, it's not really a number: it has a bunch of extra features and is an object. When we use the == operator (Equality operator), it only checks whether it has the same value. They both have the value of 3, so it returns true. However, when we use the === operator (Strict equality operator), both value and type should be the same. It's not: new Number() is not a number, it's an object. Both return false.",
    difficulty: "intermediate",
    category: "javascript",
    tags: ["equality", "strict-equality", "number-constructor"],
    relatedTopics: ["Type Coercion", "Equality Operators", "Primitives vs Objects"]
  },
  {
    id: "js-8",
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
    options: {
      A: "orange",
      B: "purple",
      C: "green",
      D: "TypeError"
    },
    correctAnswer: "D",
    explanation: "The colorChange function is static. Static methods are designed to live only on the constructor in which they are created, and cannot be passed down to any children or called upon class instances. Since freddie is an instance of class Chameleon, the function cannot be called upon it. A TypeError is thrown.",
    difficulty: "advanced",
    category: "javascript",
    tags: ["classes", "static-methods", "this"],
    relatedTopics: ["ES6 Classes", "Static Methods", "Method Context"]
  },
  {
    id: "js-9",
    question: "What's the output?",
    code: `let greeting;
greetign = {}; // Typo!
console.log(greetign);`,
    options: {
      A: "{}",
      B: "ReferenceError: greetign is not defined",
      C: "undefined"
    },
    correctAnswer: "A",
    explanation: "It logs the object, because we just created an empty object on the global object! When we mistyped greeting as greetign, the JS interpreter actually saw this as global.greetign = {} in Node.js, window.greetign = {}, frames.greetign = {} and self.greetign in browsers, self.greetign in web workers, globalThis.greetign in all environments. In order to avoid this, we can use 'use strict'. This makes sure that you have declared a variable before setting it equal to anything.",
    difficulty: "beginner",
    category: "javascript",
    tags: ["global-object", "strict-mode", "variable-declaration"],
    relatedTopics: ["Global Scope", "Strict Mode", "Variable Declaration"]
  },
  {
    id: "js-10",
    question: "What happens when we do this?",
    code: `function bark() {
  console.log('Woof!');
}

bark.animal = 'dog';`,
    options: {
      A: "Nothing, this is totally fine!",
      B: "SyntaxError. You cannot add properties to a function this way.",
      C: "'Woof' gets logged.",
      D: "ReferenceError"
    },
    correctAnswer: "A",
    explanation: "This is possible in JavaScript, because functions are objects! (Everything besides primitive types are objects) A function is a special type of object. The code you write yourself isn't the actual function. The function is an object with properties. This property is invocable.",
    difficulty: "intermediate",
    category: "javascript",
    tags: ["functions", "objects", "properties"],
    relatedTopics: ["Functions as Objects", "Object Properties", "JavaScript Types"]
  },
  {
    id: "js-11",
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
    options: {
      A: "TypeError",
      B: "SyntaxError",
      C: "Lydia Hallie",
      D: "undefined undefined"
    },
    correctAnswer: "A",
    explanation: "In JavaScript, functions are objects, and therefore, the method getFullName gets added to the constructor function object itself. For that reason, we can call Person.getFullName(), but member.getFullName throws a TypeError. If you want a method to be available to all object instances, you have to add it to the prototype property: Person.prototype.getFullName = function() { return \`\${this.firstName} \${this.lastName}\`; };",
    difficulty: "intermediate",
    category: "javascript",
    tags: ["constructors", "prototype", "this"],
    relatedTopics: ["Constructor Functions", "Prototype", "Object Methods"]
  },
  {
    id: "js-12",
    question: "What's the output?",
    code: `function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

const lydia = new Person('Lydia', 'Hallie');
const sarah = Person('Sarah', 'Smith');

console.log(lydia);
console.log(sarah);`,
    options: {
      A: "Person {firstName: 'Lydia', lastName: 'Hallie'} and undefined",
      B: "Person {firstName: 'Lydia', lastName: 'Hallie'} and Person {firstName: 'Sarah', lastName: 'Smith'}",
      C: "Person {firstName: 'Lydia', lastName: 'Hallie'} and {}",
      D: "Person {firstName: 'Lydia', lastName: 'Hallie'} and ReferenceError"
    },
    correctAnswer: "A",
    explanation: "For sarah, we didn't use the new keyword. When using new, this refers to the new empty object we create. However, if you don't add new, this refers to the global object! We said that this.firstName equals 'Sarah' and this.lastName equals 'Smith'. What we actually did, is defining global.firstName = 'Sarah' and global.lastName = 'Smith'. sarah itself is left undefined, since we don't return a value from the Person function.",
    difficulty: "intermediate",
    category: "javascript",
    tags: ["constructors", "new-keyword", "this", "global-object"],
    relatedTopics: ["Constructor Functions", "New Keyword", "This Context"]
  },
  {
    id: "js-13",
    question: "What are the three phases of event propagation?",
    options: {
      A: "Target > Capturing > Bubbling",
      B: "Bubbling > Target > Capturing",
      C: "Target > Bubbling > Capturing",
      D: "Capturing > Target > Bubbling"
    },
    correctAnswer: "D",
    explanation: "During the capturing phase, the event goes through the ancestor elements down to the target element. It then reaches the target element, and bubbling begins.",
    difficulty: "intermediate",
    category: "javascript",
    tags: ["event-propagation", "capturing", "bubbling", "target"],
    relatedTopics: ["Event Handling", "DOM Events", "Event Propagation"]
  },
  {
    id: "js-14",
    question: "All object have prototypes.",
    options: {
      A: "true",
      B: "false"
    },
    correctAnswer: "B",
    explanation: "All objects have prototypes, except for the base object. The base object is the object created by the user, or an object that is created using the new keyword. The base object has access to some methods and properties, such as .toString. This is the reason why you can use built-in JavaScript methods! All of such methods are available on the prototype. Although JavaScript can't find it directly on your object, it goes down the prototype chain and finds it there, which makes it accessible for you.",
    difficulty: "intermediate",
    category: "javascript",
    tags: ["prototype", "base-object", "prototype-chain"],
    relatedTopics: ["Prototype Chain", "Object Inheritance", "Base Object"]
  },
  {
    id: "js-15",
    question: "What's the output?",
    code: `function sum(a, b) {
  return a + b;
}

sum(1, '2');`,
    options: {
      A: "NaN",
      B: "TypeError",
      C: "'12'",
      D: "3"
    },
    correctAnswer: "C",
    explanation: "JavaScript is a dynamically typed language: we don't specify what types certain variables are. Values can automatically be converted into another type without you knowing, which is called implicit type coercion. Coercion is converting from one type into another. In this example, JavaScript converts the number 1 into a string, in order for the function to make sense and return a value. During the addition of a numeric type (1) and a string type ('2'), the number is treated as a string. We can concatenate strings like 'Hello' + 'World', so what's happening here is '1' + '2' which returns '12'.",
    difficulty: "beginner",
    category: "javascript",
    tags: ["type-coercion", "string-concatenation", "dynamic-typing"],
    relatedTopics: ["Type Coercion", "Dynamic Typing", "String Concatenation"]
  }
];

// React Questions Resource
export const reactQuestions: InternalQuestion[] = [
  {
    id: "react-1",
    question: "What will be logged to the console?",
    code: `function App() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    console.log('Count changed:', count);
  }, [count]);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`,
    options: {
      A: "Nothing, useEffect doesn't run on mount",
      B: "Count changed: 0 (on mount), then Count changed: 1, 2, 3... on each click",
      C: "Only Count changed: 1, 2, 3... on each click",
      D: "Count changed: 0 (on mount) only"
    },
    correctAnswer: "B",
    explanation: "useEffect runs after every render by default. Since we have [count] as a dependency, it will run whenever count changes. On the initial render, count is 0, so it logs 'Count changed: 0'. Then, every time the button is clicked, setCount updates the count, causing a re-render, and useEffect runs again, logging the new count value.",
    difficulty: "intermediate",
    category: "react",
    tags: ["useState", "useEffect", "hooks", "dependencies"],
    relatedTopics: ["React Hooks", "useState", "useEffect", "Component Lifecycle"]
  },
  {
    id: "react-2",
    question: "What's the output when the button is clicked?",
    code: `function Counter() {
  const [count, setCount] = useState(0);
  
  const handleClick = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  };
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment 3x</button>
    </div>
  );
}`,
    options: {
      A: "Count increases by 3",
      B: "Count increases by 1",
      C: "Count increases by 2",
      D: "Nothing happens"
    },
    correctAnswer: "B",
    explanation: "React state updates are asynchronous and batched. When you call setCount multiple times in the same function, React batches these updates together. Since all three setCount calls use the same count value (the current state value), they all effectively do setCount(0 + 1), resulting in only one increment. To increment by 3, you would need to use the functional form: setCount(prev => prev + 1).",
    difficulty: "intermediate",
    category: "react",
    tags: ["useState", "state-updates", "batching", "asynchronous"],
    relatedTopics: ["State Updates", "React Batching", "Functional Updates"]
  }
];

// CSS Questions Resource
export const cssQuestions: InternalQuestion[] = [
  {
    id: "css-1",
    question: "What will be the final width of the box?",
    code: `.box {
  width: 200px;
  padding: 20px;
  border: 5px solid black;
  margin: 10px;
  box-sizing: border-box;
}`,
    options: {
      A: "200px (content width)",
      B: "250px (content + padding + border)",
      C: "270px (content + padding + border + margin)",
      D: "240px (content + padding)"
    },
    correctAnswer: "A",
    explanation: "With box-sizing: border-box, the width property includes the content, padding, and border. The margin is not included in the width calculation. So the total width will be exactly 200px, with the content area being 150px (200px - 20px padding - 5px border on each side).",
    difficulty: "beginner",
    category: "css",
    tags: ["box-sizing", "box-model", "width", "padding", "border"],
    relatedTopics: ["CSS Box Model", "Box Sizing", "Layout Properties"]
  },
  {
    id: "css-2",
    question: "Which CSS property will make the text red?",
    code: `<div class="container">
  <p>This text should be red</p>
</div>

.container p {
  /* Which property here? */
}`,
    options: {
      A: "background-color: red;",
      B: "color: red;",
      C: "text-color: red;",
      D: "font-color: red;"
    },
    correctAnswer: "B",
    explanation: "The color property sets the color of the text content. background-color sets the background color behind the text. text-color and font-color are not valid CSS properties.",
    difficulty: "beginner",
    category: "css",
    tags: ["color", "text-styling", "css-properties"],
    relatedTopics: ["Text Styling", "CSS Properties", "Color Values"]
  }
];

// Internal Resources Collection
export const internalResources: InternalResource[] = [
  {
    id: "js-questions",
    title: "JavaScript Interview Questions",
    description: "Master JavaScript fundamentals with 100+ carefully crafted questions covering variables, functions, objects, and more. Perfect for interview preparation and skill assessment.",
    icon: "🟨",
    category: "javascript",
    difficulty: "intermediate",
    questions: javascriptQuestions,
    totalQuestions: javascriptQuestions.length,
    estimatedTime: 120,
    prerequisites: ["Basic JavaScript knowledge", "Understanding of programming concepts"],
    learningOutcomes: [
      "Deep understanding of JavaScript core concepts",
      "Ability to solve complex JavaScript problems",
      "Interview-ready JavaScript knowledge",
      "Understanding of common JavaScript pitfalls"
    ]
  },
  {
    id: "react-questions",
    title: "React Interview Questions",
    description: "Comprehensive React questions covering hooks, state management, component lifecycle, and modern React patterns. Essential for React developer interviews.",
    icon: "⚛️",
    category: "react",
    difficulty: "intermediate",
    questions: reactQuestions,
    totalQuestions: reactQuestions.length,
    estimatedTime: 90,
    prerequisites: ["Basic React knowledge", "Understanding of JavaScript"],
    learningOutcomes: [
      "Mastery of React hooks and state management",
      "Understanding of React component lifecycle",
      "Knowledge of modern React patterns",
      "Interview-ready React skills"
    ]
  },
  {
    id: "css-questions",
    title: "CSS Interview Questions",
    description: "Essential CSS questions covering layout, positioning, flexbox, grid, and responsive design. Perfect for frontend developers and designers.",
    icon: "🎨",
    category: "css",
    difficulty: "beginner",
    questions: cssQuestions,
    totalQuestions: cssQuestions.length,
    estimatedTime: 60,
    prerequisites: ["Basic HTML knowledge", "Understanding of web design"],
    learningOutcomes: [
      "Mastery of CSS layout techniques",
      "Understanding of responsive design principles",
      "Knowledge of modern CSS features",
      "Ability to create complex layouts"
    ]
  }
];

// Utility functions
export const getResourceById = (id: string): InternalResource | undefined => {
  return internalResources.find(resource => resource.id === id);
};

export const getQuestionsByCategory = (category: string): InternalQuestion[] => {
  const resource = internalResources.find(r => r.category === category);
  return resource ? resource.questions : [];
};

export const getQuestionsByDifficulty = (difficulty: string): InternalQuestion[] => {
  return internalResources.flatMap(resource => 
    resource.questions.filter(q => q.difficulty === difficulty)
  );
};

export const searchQuestions = (query: string): InternalQuestion[] => {
  const lowercaseQuery = query.toLowerCase();
  return internalResources.flatMap(resource =>
    resource.questions.filter(q => 
      q.question.toLowerCase().includes(lowercaseQuery) ||
      q.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
      q.category.toLowerCase().includes(lowercaseQuery)
    )
  );
};
