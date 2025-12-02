#!/usr/bin/env python3
"""
Script to generate SQL migration for copying questions and learning plans from testing database.
"""

import json
import sys
from pathlib import Path

# Questions data from the query result
questions_data = [
    {
        "id": "9461e2ce-d2d4-4f3e-a489-097aee6bdc12",
        "title": "JavaScript Hoisting: var vs let in a function",
        "content": "What is the output of the following JavaScript function call?",
        "code": "function sayHi() {\n\tconsole.log(name);\n\tconsole.log(age);\n\tvar name = 'Lydia';\n\tlet age = 21;\n}\n\nsayHi();",
        "type": "multiple-choice",
        "difficulty": "intermediate",
        "points": 1,
        "correct_answer": None,
        "explanation": "Variables declared with `var` are **hoisted** and initialized with `undefined` in the execution context's creation phase. Variables declared with `let` are also hoisted, but they are not initialized until the line of declaration is executed. Attempting to access them before this point puts them in the **Temporal Dead Zone (TDZ)** and results in a `ReferenceError`.",
        "hints": ["Recall the difference in initialization for `var` vs. `let` during hoisting.", "The `let` variable's uninitialized state is known as the Temporal Dead Zone."],
        "tags": ["javascript", "hoisting", "scope", "var", "let"],
        "stats": {"avgTime": 0, "correct": 0, "attempts": 0},
        "metadata": {"language": "javascript"},
        "resources": [{"url": "https://github.com/lydiahallie/javascript-questions", "type": "article", "title": "JavaScript Questions by Lydia Hallie", "author": "Lydia Hallie", "description": "A long list of (advanced) JavaScript questions, and their explanations ✨"}],
        "topic_id": "09bc12b3-343b-4e65-8e4d-5c5d03f67865",
        "category_id": "b7414324-cc5a-47e4-89f1-6b4a2c46c508",
        "learning_card_id": "b32d66fa-f1a4-4b6d-9f6d-1997af296692",
        "is_active": True,
        "created_at": "2025-11-30 18:22:31.905+00",
        "updated_at": "2025-11-30 19:10:56.509253+00"
    },
    {
        "id": "8ef60770-fce3-44f0-98ce-bc9af30a0844",
        "title": "Async Execution and Scoping: var vs let in loops",
        "content": "What is the output of the following JavaScript code involving loops and `setTimeout`?",
        "code": "for (var i = 0; i < 3; i++) {\n\tsetTimeout(() => console.log(i), 1);\n}\n\nfor (let i = 0; i < 3; i++) {\n\tsetTimeout(() => console.log(i), 1);\n}",
        "type": "multiple-choice",
        "difficulty": "intermediate",
        "points": 1,
        "correct_answer": None,
        "explanation": "In the first loop, `var i` is **globally scoped** (or function-scoped). The `setTimeout` is asynchronous, so the loop completes first. When the callback functions finally execute, `i` has already been incremented to `3`. In the second loop, `let i` is **block-scoped**. For each iteration, a new `i` is created and scoped to that loop block, effectively capturing the values `0`, `1`, and `2` separately for each callback.",
        "hints": ["Remember that `setTimeout` runs asynchronously.", "Recall the difference between `var` (function-scoped) and `let` (block-scoped) in the context of loops."],
        "tags": ["javascript", "scope", "var", "let", "asynchronous"],
        "stats": {"avgTime": 0, "correct": 0, "attempts": 0},
        "metadata": {"language": "javascript"},
        "resources": [{"url": "https://github.com/lydiahallie/javascript-questions", "type": "article", "title": "lydia hallie js questions ", "author": "lydia hallie", "description": "lydia hallie js questions "}],
        "topic_id": "e115212c-6046-4ecb-abab-15fc6e39139b",
        "category_id": "b7414324-cc5a-47e4-89f1-6b4a2c46c508",
        "learning_card_id": "b32d66fa-f1a4-4b6d-9f6d-1997af296692",
        "is_active": True,
        "created_at": "2025-11-30 18:22:32.548+00",
        "updated_at": "2025-11-30 22:26:35.935259+00"
    },
    {
        "id": "2258385d-ffaa-441f-9553-360f6c32304b",
        "title": "Arrow Functions and `this` Context in Objects",
        "content": "What is the output of the following JavaScript code?",
        "code": "const shape = {\n\t\t\tradius: 10,\n\t\t\tdiameter() {\n\t\t\t\treturn this.radius * 2;\n\t\t\t},\n\t\t\tperimeter: () => 2 * Math.PI * this.radius,\n\t\t};\n\t\t\n\t\tconsole.log(shape.diameter());\n\t\tconsole.log(shape.perimeter());",
        "type": "multiple-choice",
        "difficulty": "intermediate",
        "points": 1,
        "correct_answer": None,
        "explanation": "The `diameter` method is a **regular function** (using method shorthand), so its `this` context is correctly bound to the `shape` object, returning $10 * 2 = 20$. The `perimeter` method is an **arrow function**, which does not have its own `this` binding. It inherits `this` from its parent scope, which is typically the global object (or `window` in a browser). Since the global object does not have a `radius` property, `this.radius` evaluates to `undefined`. Multiplying `undefined` by a number results in `NaN`.",
        "hints": ["Review the behavior of `this` in regular functions vs. arrow functions.", "Arrow functions are not suitable for object methods that need access to the object's properties via `this`."],
        "tags": ["javascript", "this", "arrow-functions", "object"],
        "stats": {"avgTime": 0, "correct": 0, "attempts": 0},
        "metadata": {"language": "javascript"},
        "resources": None,
        "topic_id": "b7a95285-86da-45d1-a4fa-aed722dfd950",
        "category_id": "b7414324-cc5a-47e4-89f1-6b4a2c46c508",
        "learning_card_id": "b32d66fa-f1a4-4b6d-9f6d-1997af296692",
        "is_active": True,
        "created_at": "2025-11-30 18:22:32.827+00",
        "updated_at": "2025-12-01 14:52:57.378347+00"
    },
    {
        "id": "07eec43c-8675-4b6d-9b57-529bf8b59e47",
        "title": "Type Coercion: Unary Plus and Logical NOT",
        "content": "What is the output of the following JavaScript expressions?",
        "code": "+true;\n!'Lydia';",
        "type": "multiple-choice",
        "difficulty": "beginner",
        "points": 1,
        "correct_answer": None,
        "explanation": "The **unary plus operator** (`+`) attempts to convert its operand to a number. `true` is coerced to the number `1`. The **logical NOT operator** (`!`) coerces the operand to a boolean and then negates it. The non-empty string `'Lydia'` is a **truthy** value, so `!'Lydia'` evaluates to `!true`, which is `false`.",
        "hints": ["The unary plus is a common way to explicitly convert a boolean to a number.", "All non-empty strings are considered truthy."],
        "tags": ["javascript", "type-coercion", "operators"],
        "stats": {"avgTime": 0, "correct": 0, "attempts": 0},
        "metadata": {"language": "javascript"},
        "resources": None,
        "topic_id": "393e1107-99a6-434a-8b6a-cd35c3afb417",
        "category_id": "b7414324-cc5a-47e4-89f1-6b4a2c46c508",
        "learning_card_id": "b32d66fa-f1a4-4b6d-9f6d-1997af296692",
        "is_active": True,
        "created_at": "2025-11-30 18:22:33.068+00",
        "updated_at": "2025-12-01 14:55:34.290973+00"
    },
    {
        "id": "29ec8f77-83ab-41e4-b8f2-d562e4d79d86",
        "title": "Object Property Access: Dot vs. Bracket Notation",
        "content": "Given the objects `bird` and `mouse`, which property access syntax is **not** valid or will result in an error?",
        "code": "const bird = {\n\t\t\tsize: 'small',\n\t\t};\n\t\t\n\t\tconst mouse = {\n\t\t\tname: 'Mickey',\n\t\t\tsmall: true,\n\t\t};",
        "type": "multiple-choice",
        "difficulty": "intermediate",
        "points": 1,
        "correct_answer": None,
        "explanation": "The dot notation `mouse.bird.size` attempts to access a property named `bird` on the `mouse` object. Since `mouse` does not have a key named `bird`, `mouse.bird` evaluates to `undefined`. Attempting to access `.size` on `undefined` (i.e., `undefined.size`) results in a **`TypeError`** (`Cannot read property 'size' of undefined`). In contrast, bracket notations like `mouse[bird.size]` evaluate the expression inside the brackets first (`bird.size` is 'small') and then use the resulting string as the property key (`mouse['small']`), which is valid.",
        "hints": ["Dot notation requires the key to be known directly, while bracket notation allows expressions.", "Evaluate the expression inside the brackets first."],
        "tags": ["javascript", "object", "property-access", "error-handling"],
        "stats": {"avgTime": 0, "correct": 0, "attempts": 0},
        "metadata": {"language": "javascript"},
        "resources": None,
        "topic_id": "860c2bdb-1bec-4ed1-a7da-dfb5f5c2783b",
        "category_id": "b7414324-cc5a-47e4-89f1-6b4a2c46c508",
        "learning_card_id": "b32d66fa-f1a4-4b6d-9f6d-1997af296692",
        "is_active": True,
        "created_at": "2025-11-30 18:22:33.345+00",
        "updated_at": "2025-12-01 14:57:42.297713+00"
    },
    {
        "id": "21cb8ed9-5fc8-4eba-b1df-84d8aa2c6df6",
        "title": "Object Reference vs. Value Assignment",
        "content": "What is the output of the following JavaScript code?",
        "code": "let c = { greeting: 'Hey!' };\nlet d;\n\nd = c;\nc.greeting = 'Hello';\nconsole.log(d.greeting);",
        "type": "multiple-choice",
        "difficulty": "beginner",
        "points": 1,
        "correct_answer": None,
        "explanation": "In JavaScript, **objects** are assigned and passed by **reference**. When `d = c` is executed, `d` does not get a copy of the object; instead, both variables `c` and `d` point to the *exact same object* in memory. When you modify the object through `c` (`c.greeting = 'Hello'`), the change is visible when accessing the object via `d`.",
        "hints": ["Remember that primitive types (like numbers, strings) are passed by value, but objects are passed by reference."],
        "tags": ["javascript", "object", "reference", "memory"],
        "stats": {"avgTime": 0, "correct": 0, "attempts": 0},
        "metadata": {"language": "javascript"},
        "resources": None,
        "topic_id": "860c2bdb-1bec-4ed1-a7da-dfb5f5c2783b",
        "category_id": "b7414324-cc5a-47e4-89f1-6b4a2c46c508",
        "learning_card_id": "b32d66fa-f1a4-4b6d-9f6d-1997af296692",
        "is_active": True,
        "created_at": "2025-11-30 18:22:34.137+00",
        "updated_at": "2025-12-01 15:01:06.545331+00"
    },
    {
        "id": "183541f6-8ff3-43ea-9152-9102841bb151",
        "title": "Equality Operators: `==` vs. `===` with Object Wrappers",
        "content": "What is the output of the following comparisons?",
        "code": "let a = 3;\nlet b = new Number(3);\nlet c = 3;\n\nconsole.log(a == b);\nconsole.log(a === b);\nconsole.log(b === c);",
        "type": "multiple-choice",
        "difficulty": "intermediate",
        "points": 1,
        "correct_answer": None,
        "explanation": "* `a == b` (`3 == new Number(3)`): The `==` (loose equality) operator performs **type coercion**. The `Number` object is coerced to its primitive value, `3`, so it returns **`true`**.* `a === b` (`3 === new Number(3)`): The `===` (strict equality) operator checks both **value and type**. `a` is a primitive `number`, while `b` is an **object** created by the constructor. Since the types are different, it returns **`false`**.* `b === c` (`new Number(3) === 3`): This is also strict comparison between an object and a primitive number, so it returns **`false`**.",
        "hints": ["The `new Number()` constructor creates an object wrapper, not a primitive number.", "The strict equality operator (`===`) does not perform type coercion."],
        "tags": ["javascript", "equality", "coercion", "object-wrapper"],
        "stats": {"avgTime": 0, "correct": 0, "attempts": 0},
        "metadata": {"language": "javascript"},
        "resources": None,
        "topic_id": "393e1107-99a6-434a-8b6a-cd35c3afb417",
        "category_id": "b7414324-cc5a-47e4-89f1-6b4a2c46c508",
        "learning_card_id": "b32d66fa-f1a4-4b6d-9f6d-1997af296692",
        "is_active": True,
        "created_at": "2025-11-30 18:22:34.387+00",
        "updated_at": "2025-12-01 15:01:48.189952+00"
    },
    {
        "id": "c7f74b8b-04bc-4892-abb8-19d40d14f370",
        "title": "Static Methods in JavaScript Classes",
        "content": "What is the output of the following JavaScript code involving a static class method?",
        "code": "class Chameleon {\n\t\t\tstatic colorChange(newColor) {\n\t\t\t\tthis.newColor = newColor;\n\t\t\t\treturn this.newColor;\n\t\t\t}\n\t\t\n\t\t\tconstructor({ newColor = 'green' } = {}) {\n\t\t\t\tthis.newColor = newColor;\n\t\t\t}\n\t\t}\n\t\t\n\t\tconst freddie = new Chameleon({ newColor: 'purple' });\n\t\tconsole.log(freddie.colorChange('orange'));",
        "type": "multiple-choice",
        "difficulty": "advanced",
        "points": 1,
        "correct_answer": None,
        "explanation": "The `colorChange` method is declared as a **`static`** method. Static methods are methods on the class constructor itself, not on the prototypes of the instances. They are called directly on the class (e.g., `Chameleon.colorChange('orange')`), but cannot be accessed or called on an instance of the class (like `freddie`). Attempting to call a static method on an instance results in a **`TypeError`** because the instance object does not possess that method.",
        "hints": ["Static methods are part of the Class, not the objects created by the Class.", "The class instance's prototype chain does not include static methods."],
        "tags": ["javascript", "class", "static", "es6", "error-handling"],
        "stats": {"avgTime": 0, "correct": 0, "attempts": 0},
        "metadata": {"language": "javascript"},
        "resources": None,
        "topic_id": "9613dcbd-ce03-4797-b4b4-aad5998a255d",
        "category_id": "b7414324-cc5a-47e4-89f1-6b4a2c46c508",
        "learning_card_id": "b32d66fa-f1a4-4b6d-9f6d-1997af296692",
        "is_active": True,
        "created_at": "2025-11-30 18:22:34.636+00",
        "updated_at": "2025-12-01 15:02:58.384736+00"
    },
    {
        "id": "24ee8335-83b8-42e5-8525-81852dd9f24d",
        "title": "Global Variable Creation via Typo (Sloppy Mode)",
        "content": "What is the output of the following JavaScript code?",
        "code": "let greeting;\ngreetign = {}; // Typo!\nconsole.log(greetign);",
        "type": "multiple-choice",
        "difficulty": "intermediate",
        "points": 1,
        "correct_answer": None,
        "explanation": "Due to the typo (`greetign` instead of `greeting`), the code assigns a value to a variable that was never formally declared. In **non-strict mode** (the default 'sloppy mode'), JavaScript implicitly creates a new property on the **global object** (e.g., `window.greetign` in a browser or `global.greetign` in Node) and assigns the empty object `{}` to it. Therefore, `console.log(greetign)` outputs the newly created empty object.",
        "hints": ["This behavior is characteristic of JavaScript's 'sloppy mode'.", "This specific issue is often prevented by using `'use strict'` at the top of a file or function."],
        "tags": ["javascript", "scope", "global", "sloppy-mode", "typo"],
        "stats": {"avgTime": 0, "correct": 0, "attempts": 0},
        "metadata": {"language": "javascript"},
        "resources": None,
        "topic_id": "09bc12b3-343b-4e65-8e4d-5c5d03f67865",
        "category_id": "b7414324-cc5a-47e4-89f1-6b4a2c46c508",
        "learning_card_id": "b32d66fa-f1a4-4b6d-9f6d-1997af296692",
        "is_active": True,
        "created_at": "2025-11-30 18:22:34.914+00",
        "updated_at": "2025-12-01 15:03:59.162278+00"
    },
    {
        "id": "de504f44-f333-4fe0-9a5d-0c8dd023586c",
        "title": "Functions as Objects: Adding Properties",
        "content": "What happens when you try to add a property to a function in JavaScript?",
        "code": "function bark() {\n\t\t\tconsole.log('Woof!');\n\t\t}\n\t\t\n\t\tbark.animal = 'dog';",
        "type": "multiple-choice",
        "difficulty": "beginner",
        "points": 1,
        "correct_answer": None,
        "explanation": "In JavaScript, **functions are first-class objects**. This means they are a special type of object and can have properties assigned to them just like any other object (e.g., arrays or plain objects). This behavior is often used in design patterns, such as memoization or storing configuration related to a specific function.",
        "hints": ["Think about what functions are categorized as in JavaScript's type system."],
        "tags": ["javascript", "function", "object", "first-class-functions"],
        "stats": {"avgTime": 0, "correct": 0, "attempts": 0},
        "metadata": {"language": "javascript"},
        "resources": None,
        "topic_id": "6640aee8-5a40-4166-8a8f-051f547e3e30",
        "category_id": "b7414324-cc5a-47e4-89f1-6b4a2c46c508",
        "learning_card_id": "b32d66fa-f1a4-4b6d-9f6d-1997af296692",
        "is_active": True,
        "created_at": "2025-11-30 18:22:35.197+00",
        "updated_at": "2025-12-01 15:04:41.974078+00"
    }
]

# Learning plans data
plans_data = [
    {"id": "4efcfd67-0249-4e53-b186-69b03d224b16", "name": "1-Day Plan", "description": "A quick 1-day learning plan covering essential topics", "is_active": True, "created_at": "2025-11-21 04:11:24.146321+00", "updated_at": "2025-11-21 04:11:24.146321+00"},
    {"id": "2ebb2666-f3ac-4cf1-97e7-e649e1badbcb", "name": "2-Days Plan", "description": "A 2-day learning plan building on the 1-day plan", "is_active": True, "created_at": "2025-11-21 04:11:24.146321+00", "updated_at": "2025-11-21 04:11:24.146321+00"},
    {"id": "e462c141-4a10-4f7f-b1fb-a5ed37376d4e", "name": "3-Days Plan", "description": "A 3-day learning plan with comprehensive coverage", "is_active": True, "created_at": "2025-11-21 04:11:24.146321+00", "updated_at": "2025-11-21 04:11:24.146321+00"},
    {"id": "99fea3f7-9df8-4b9b-9274-4f430b3a994b", "name": "5-Days Plan", "description": "A 5-day intensive learning plan", "is_active": True, "created_at": "2025-11-21 04:11:24.146321+00", "updated_at": "2025-11-21 04:11:24.146321+00"},
    {"id": "98a4b584-50d9-44f9-b46c-1e864a03b54b", "name": "7-Days Plan", "description": "A week-long comprehensive learning plan", "is_active": True, "created_at": "2025-11-21 04:11:24.146321+00", "updated_at": "2025-11-21 04:11:24.146321+00"},
    {"id": "afc4e6ae-311f-4163-b7e4-c402520e09ab", "name": "14-Days Plan", "description": "A 2-week deep dive learning plan", "is_active": True, "created_at": "2025-11-21 04:11:24.146321+00", "updated_at": "2025-11-21 04:11:24.146321+00"},
    {"id": "d49c0625-8f31-4e86-ac6e-95fa6e9f4df8", "name": "30-Days Plan", "description": "A month-long complete learning plan", "is_active": True, "created_at": "2025-11-21 04:11:24.146321+00", "updated_at": "2025-11-21 04:11:24.146321+00"}
]

def escape_sql_string(s):
    """Escape single quotes for SQL"""
    if s is None:
        return 'NULL'
    return "'" + str(s).replace("'", "''") + "'"

def format_jsonb(value):
    """Format JSONB value for SQL"""
    if value is None:
        return 'NULL'
    return "'" + json.dumps(value).replace("'", "''") + "'::jsonb"

def format_array(value):
    """Format array value for SQL"""
    if value is None:
        return 'NULL'
    return "'{" + ",".join(f'"{v}"' for v in value) + "}'"

# Map question IDs to their options
options_map = {
    "9461e2ce-d2d4-4f3e-a489-097aee6bdc12": [{"id": "A", "text": "Lydia and undefined", "isCorrect": False}, {"id": "B", "text": "Lydia and ReferenceError", "isCorrect": False}, {"id": "C", "text": "ReferenceError and 21", "isCorrect": False}, {"id": "D", "text": "undefined and ReferenceError", "isCorrect": True, "explanation": "Accessing a var before declaration returns undefined (hoisted), while accessing a let variable before declaration throws a ReferenceError (Temporal Dead Zone)."}],
    "8ef60770-fce3-44f0-98ce-bc9af30a0844": [{"id": "A", "text": "0 1 2 and 0 1 2", "isCorrect": False}, {"id": "B", "text": "0 1 2 and 3 3 3", "isCorrect": False}, {"id": "C", "text": "3 3 3 and 0 1 2", "isCorrect": True, "explanation": "The first loop uses `var`, which is function-scoped (or globally scoped outside a function). When the `setTimeout` callbacks run, the loop has already finished and `i` is 3 for all of them. The second loop uses `let`, which is block-scoped, creating a new `i` value for each iteration."}],
    "2258385d-ffaa-441f-9553-360f6c32304b": [{"id": "A", "text": "20 and 62.83185307179586", "isCorrect": False}, {"id": "B", "text": "20 and NaN", "isCorrect": True, "explanation": "The `diameter` is a regular method and `this` refers to the `shape` object (20). The `perimeter` is an arrow function and does not bind its own `this`; it inherits `this` from the surrounding global scope (where `this.radius` is `undefined`), resulting in `NaN`."}, {"id": "C", "text": "20 and 63", "isCorrect": False}, {"id": "D", "text": "NaN and 63", "isCorrect": False}],
    "07eec43c-8675-4b6d-9b57-529bf8b59e47": [{"id": "A", "text": "1 and false", "isCorrect": True, "explanation": "The unary plus operator converts `true` to the number `1`. The string 'Lydia' is a truthy value, so applying the logical NOT operator (`!`) returns `false`."}, {"id": "B", "text": "false and NaN", "isCorrect": False}, {"id": "C", "text": "false and false", "isCorrect": False}],
    "29ec8f77-83ab-41e4-b8f2-d562e4d79d86": [{"id": "A", "text": "`mouse.bird.size` is not valid", "isCorrect": True, "explanation": "Dot notation is evaluated left-to-right. `mouse.bird` returns `undefined` because there is no 'bird' key on `mouse`. Trying to access `.size` on `undefined` throws a `TypeError`."}, {"id": "B", "text": "`mouse[bird.size]` is not valid", "isCorrect": False}, {"id": "C", "text": "`mouse[bird[\"size\"]]` is not valid", "isCorrect": False}, {"id": "D", "text": "All of them are valid", "isCorrect": False}],
    "21cb8ed9-5fc8-4eba-b1df-84d8aa2c6df6": [{"id": "A", "text": "Hello", "isCorrect": True, "explanation": "Objects are assigned by reference. `d` and `c` point to the same object in memory. Changing the object through `c` affects the object referenced by `d`."}, {"id": "B", "text": "Hey!", "isCorrect": False}, {"id": "C", "text": "undefined", "isCorrect": False}, {"id": "D", "text": "ReferenceError", "isCorrect": False}, {"id": "E", "text": "TypeError", "isCorrect": False}],
    "183541f6-8ff3-43ea-9152-9102841bb151": [{"id": "A", "text": "true false true", "isCorrect": False}, {"id": "B", "text": "false false true", "isCorrect": False}, {"id": "C", "text": "true false false", "isCorrect": True, "explanation": "`a == b` (Equality) is true due to coercion of `b`'s value. `a === b` (Strict Equality) is false because `b` is an object and `a` is a primitive number. `b === c` is false for the same reason: they are different types."}, {"id": "D", "text": "false true true", "isCorrect": False}],
    "c7f74b8b-04bc-4892-abb8-19d40d14f370": [{"id": "A", "text": "orange", "isCorrect": False}, {"id": "B", "text": "purple", "isCorrect": False}, {"id": "C", "text": "green", "isCorrect": False}, {"id": "D", "text": "TypeError", "isCorrect": True, "explanation": "Static methods belong only to the class constructor and cannot be called on an instance of the class."}],
    "24ee8335-83b8-42e5-8525-81852dd9f24d": [{"id": "A", "text": "{}", "isCorrect": True, "explanation": "In non-strict mode (sloppy mode), assigning a value to an undeclared variable (due to the typo) implicitly creates a property on the global object, which is then logged."}, {"id": "B", "text": "ReferenceError: greetign is not defined", "isCorrect": False}, {"id": "C", "text": "undefined", "isCorrect": False}],
    "de504f44-f333-4fe0-9a5d-0c8dd023586c": [{"id": "A", "text": "Nothing, this is totally fine!", "isCorrect": True, "explanation": "Functions are a special type of object in JavaScript. You can assign properties to them just like any other object."}, {"id": "B", "text": "SyntaxError. You cannot add properties to a function this way.", "isCorrect": False}, {"id": "C", "text": "\"Woof\" gets logged.", "isCorrect": False}, {"id": "D", "text": "ReferenceError", "isCorrect": False}]
}

sql_lines = [
    "-- Migration to copy questions and learning plans from testing database",
    "-- Temporarily disable foreign key checks",
    "SET session_replication_role = 'replica';",
    "",
    "-- Insert all questions",
    "INSERT INTO questions (id, title, content, code, type, difficulty, points, correct_answer, explanation, hints, tags, stats, metadata, resources, options, topic_id, category_id, learning_card_id, is_active, created_at, updated_at)",
    "VALUES"
]

# Generate VALUES for each question
question_values = []
for q in questions_data:
    code = escape_sql_string(q.get('code'))
    if code == "'NULL'":
        code = 'NULL'
    
    correct_answer = escape_sql_string(q.get('correct_answer'))
    if correct_answer == "'NULL'":
        correct_answer = 'NULL'
    
    explanation = escape_sql_string(q.get('explanation'))
    if explanation == "'NULL'":
        explanation = 'NULL'
    
    topic_id = escape_sql_string(q.get('topic_id'))
    if topic_id == "'NULL'":
        topic_id = 'NULL'
    else:
        topic_id = f"{topic_id}::uuid"
    
    category_id = escape_sql_string(q.get('category_id'))
    if category_id == "'NULL'":
        category_id = 'NULL'
    else:
        category_id = f"{category_id}::uuid"
    
    learning_card_id = escape_sql_string(q.get('learning_card_id'))
    if learning_card_id == "'NULL'":
        learning_card_id = 'NULL'
    else:
        learning_card_id = f"{learning_card_id}::uuid"
    
    # Get options for this question
    options = options_map.get(q['id'], None)
    options_jsonb = format_jsonb(options)
    
    value = f"  ('{q['id']}'::uuid, {escape_sql_string(q['title'])}, {escape_sql_string(q['content'])}, {code}, {escape_sql_string(q['type'])}, {escape_sql_string(q['difficulty'])}, {q['points']}, {correct_answer}, {explanation}, {format_array(q.get('hints'))}, {format_array(q.get('tags'))}, {format_jsonb(q.get('stats'))}, {format_jsonb(q.get('metadata'))}, {format_jsonb(q.get('resources'))}, {options_jsonb}, {topic_id}, {category_id}, {learning_card_id}, {str(q.get('is_active', True)).lower()}, '{q['created_at']}', '{q['updated_at']}')"
    question_values.append(value)

sql_lines.append(",\n".join(question_values))
sql_lines.append("ON CONFLICT (id) DO NOTHING;")
sql_lines.append("")
sql_lines.append("-- Insert all learning plans")
sql_lines.append("INSERT INTO learning_plans (id, name, description, is_active, created_at, updated_at)")
sql_lines.append("VALUES")

# Generate VALUES for each plan
plan_values = []
for p in plans_data:
    value = f"  ('{p['id']}'::uuid, {escape_sql_string(p['name'])}, {escape_sql_string(p['description'])}, {str(p.get('is_active', True)).lower()}, '{p['created_at']}', '{p['updated_at']}')"
    plan_values.append(value)

sql_lines.append(",\n".join(plan_values))
sql_lines.append("ON CONFLICT (id) DO NOTHING;")
sql_lines.append("")
sql_lines.append("-- Re-enable foreign key checks")
sql_lines.append("SET session_replication_role = 'origin';")

# Write to migration file
migration_file = Path(__file__).parent.parent / "Rest" / "migrations" / "20251201161000_insert_questions_and_plans.sql"
migration_file.parent.mkdir(parents=True, exist_ok=True)

with open(migration_file, 'w') as f:
    f.write('\n'.join(sql_lines))

print(f"✅ Generated migration file: {migration_file}")
print(f"   Contains {len(questions_data)} question INSERT statements")
print(f"   Contains {len(plans_data)} learning plan INSERT statements")

