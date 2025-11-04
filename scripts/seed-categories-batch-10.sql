INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '1f60d5ba-52a7-41a0-b295-38533e27fbae',
          'Drawback of Module Pattern',
          'Which of the following is a drawback of the Module Pattern?',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"It makes code modular and organized","isCorrect":false,"explanation":""},{"id":"b","text":"Private members cannot be accessed or modified without changing the original module","isCorrect":true,"explanation":""},{"id":"c","text":"It always requires classes","isCorrect":false,"explanation":""}]',
          NULL,
          'The correct answer is: Private members cannot be accessed or modified without changing the original module',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-module-pattern-44","original_type":"multiple-choice","topic":"General Design Patterns","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.206Z',
          '2025-10-15T00:47:17.206Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '6812c09d-d7e3-4bf8-ab56-030da0cf03b6',
          'Revealing Module Pattern',
          'What is the difference between the classic Module Pattern and the Revealing Module Pattern?',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'The Revealing Module Pattern maps private functions/variables to a returned object explicitly, improving readability. It makes it clear which functions are public and which remain private.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-module-pattern-45","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["The Revealing Module Pattern maps private functions/variables to a returned object explicitly, improving readability.","It makes it clear which functions are public and which remain private."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.206Z',
          '2025-10-15T00:47:17.206Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'e8412ab7-eb68-49e5-b783-07bda5786235',
          'Debugging Modules',
          'If you forget to return a method in your Module Pattern, what will happen?',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"The method is still accessible globally","isCorrect":false,"explanation":""},{"id":"b","text":"The method remains private and cannot be accessed outside","isCorrect":true,"explanation":""},{"id":"c","text":"JavaScript throws a syntax error","isCorrect":false,"explanation":""}]',
          NULL,
          'The correct answer is: The method remains private and cannot be accessed outside',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-module-pattern-46","original_type":"multiple-choice","topic":"General Design Patterns","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.206Z',
          '2025-10-15T00:47:17.206Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '83a3e0d7-65a4-43bd-83a5-d260f34f044b',
          'Module Pattern vs ES6 Modules',
          'How does the Module Pattern differ from ES6 Modules?',
          'multiple-choice',
          'advanced',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Module Pattern relies on closures and IIFEs for encapsulation, while ES6 Modules are built-in language features with `import` and `export`. ES6 Modules are statically analyzed at compile time, while Module Pattern modules are runtime constructs.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','advanced']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-module-pattern-47","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["Module Pattern relies on closures and IIFEs for encapsulation, while ES6 Modules are built-in language features with `import` and `export`.","ES6 Modules are statically analyzed at compile time, while Module Pattern modules are runtime constructs."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.206Z',
          '2025-10-15T00:47:17.206Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'b68b5eab-ff22-4812-a8c4-47f241d919da',
          'Use Case of Module Pattern',
          'Which scenario is best suited for the Module Pattern?',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"When you want to encapsulate private state in legacy JavaScript without ES6 support","isCorrect":true,"explanation":""},{"id":"b","text":"When you need dynamic imports and tree-shaking","isCorrect":false,"explanation":""},{"id":"c","text":"When you only work with classes","isCorrect":false,"explanation":""}]',
          NULL,
          'The correct answer is: When you want to encapsulate private state in legacy JavaScript without ES6 support',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-module-pattern-48","original_type":"multiple-choice","topic":"General Design Patterns","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.206Z',
          '2025-10-15T00:47:17.206Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '0bf99bb7-3ddf-4951-a46d-c4d2262944f7',
          'Definition of Observer Pattern',
          'What is the Observer Pattern and why is it useful in JavaScript applications?',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'The Observer Pattern allows objects (observers) to subscribe to another object (observable) so they get notified when events occur. It’s useful because it enables decoupling and supports event-driven programming.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-observer-pattern-49","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["The Observer Pattern allows objects (observers) to subscribe to another object (observable) so they get notified when events occur.","It’s useful because it enables decoupling and supports event-driven programming."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.207Z',
          '2025-10-15T00:47:17.207Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'e4967743-e8b7-4026-bee4-54168724fc9b',
          'Core Components of Observer Pattern',
          'Which three components are essential in the Observer Pattern implementation?',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"Publisher, renderer, transformer","isCorrect":false,"explanation":""},{"id":"b","text":"Observers, subscribe/unsubscribe, notify","isCorrect":true,"explanation":""},{"id":"c","text":"State, reducer, dispatcher","isCorrect":false,"explanation":""},{"id":"d","text":"Model, view, controller","isCorrect":false,"explanation":""}]',
          NULL,
          'The correct answer is: Observers, subscribe/unsubscribe, notify',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-observer-pattern-50","original_type":"multiple-choice","topic":"General Design Patterns","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.207Z',
          '2025-10-15T00:47:17.207Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'bbf6e7a9-82ae-43b0-bfd0-3a4c576218f8',
          'Observer Pattern in React',
          'In the example provided, which functions act as observers when subscribed to the observable?',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"handleClick and handleToggle","isCorrect":false,"explanation":""},{"id":"b","text":"logger and toastify","isCorrect":true,"explanation":""},{"id":"c","text":"Button and Switch components","isCorrect":false,"explanation":""},{"id":"d","text":"React lifecycle methods","isCorrect":false,"explanation":""}]',
          NULL,
          'The correct answer is: logger and toastify',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-observer-pattern-51","original_type":"multiple-choice","topic":"General Design Patterns","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.207Z',
          '2025-10-15T00:47:17.207Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'be7e2f46-94b8-4159-9e81-44ce77423e06',
          'Observable Notifications',
          'What happens when the observable''s notify() method is called?',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'It loops through the observers list and invokes each subscribed function with the provided data. All observers receive the event data at the same time.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-observer-pattern-52","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["It loops through the observers list and invokes each subscribed function with the provided data.","All observers receive the event data at the same time."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.207Z',
          '2025-10-15T00:47:17.207Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '176e3c70-99a1-4586-9411-d407f41a6f71',
          'Practical Use Case',
          'Which scenario is a good use case for the Observer Pattern?',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Notifying multiple UI components when new messages arrive","isCorrect":true,"explanation":""},{"id":"b","text":"Rendering static content with no user interaction","isCorrect":false,"explanation":""},{"id":"c","text":"Compiling JavaScript code to ES5","isCorrect":false,"explanation":""},{"id":"d","text":"Sorting a list of numbers","isCorrect":false,"explanation":""}]',
          NULL,
          'The correct answer is: Notifying multiple UI components when new messages arrive',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-observer-pattern-53","original_type":"multiple-choice","topic":"General Design Patterns","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.207Z',
          '2025-10-15T00:47:17.207Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '1f8e6dfa-3b49-4ff2-a748-c38e5388ff09',
          'Observer Pattern vs Pub/Sub',
          'What is the key difference between the Observer Pattern and the Publish/Subscribe (Pub/Sub) pattern?',
          'multiple-choice',
          'advanced',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'In Observer, observers subscribe directly to the observable, creating tight coupling. In Pub/Sub, a mediator (event bus) manages communication, decoupling publishers and subscribers.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','advanced']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-observer-pattern-54","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["In Observer, observers subscribe directly to the observable, creating tight coupling.","In Pub/Sub, a mediator (event bus) manages communication, decoupling publishers and subscribers."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.207Z',
          '2025-10-15T00:47:17.207Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'c56b8ca3-9a34-44ba-8a0f-8edd059b2143',
          'Observer Pattern in RxJS',
          'Which popular JavaScript library uses the Observer Pattern extensively?',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"Redux","isCorrect":false,"explanation":""},{"id":"b","text":"Axios","isCorrect":false,"explanation":""},{"id":"c","text":"RxJS","isCorrect":true,"explanation":""},{"id":"d","text":"Styled Components","isCorrect":false,"explanation":""}]',
          NULL,
          'The correct answer is: RxJS',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-observer-pattern-55","original_type":"multiple-choice","topic":"General Design Patterns","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.207Z',
          '2025-10-15T00:47:17.207Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'd176550f-0909-4ac3-891d-08c2da9aabcf',
          'Performance Concern',
          'What is one potential drawback of the Observer Pattern?',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Observers cannot be removed once added","isCorrect":false,"explanation":""},{"id":"b","text":"Too many or complex observers can cause performance issues during notifications","isCorrect":true,"explanation":""},{"id":"c","text":"Observable cannot notify multiple observers at once","isCorrect":false,"explanation":""},{"id":"d","text":"It cannot work with asynchronous data","isCorrect":false,"explanation":""}]',
          NULL,
          'The correct answer is: Too many or complex observers can cause performance issues during notifications',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-observer-pattern-56","original_type":"multiple-choice","topic":"General Design Patterns","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.207Z',
          '2025-10-15T00:47:17.207Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '5bef3782-cf6c-44e3-9665-4f88f1e741bc',
          'Definition of Prototype Pattern',
          'What is the Prototype Pattern and why is it useful in JavaScript?',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'The Prototype Pattern allows objects to share properties and methods through the prototype chain. It avoids duplication and reduces memory usage by letting instances inherit methods from the prototype instead of redefining them.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-prototype-pattern-57","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["The Prototype Pattern allows objects to share properties and methods through the prototype chain.","It avoids duplication and reduces memory usage by letting instances inherit methods from the prototype instead of redefining them."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.208Z',
          '2025-10-15T00:47:17.208Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '1f811e4f-f5de-4d3f-a3f9-e9c428d899f4',
          'Prototype vs Instance Properties',
          'In the Dog class example, where is the bark() method stored?',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"On each Dog instance","isCorrect":false,"explanation":""},{"id":"b","text":"On Dog.prototype, shared by all instances","isCorrect":true,"explanation":""},{"id":"c","text":"Inside the Dog constructor","isCorrect":false,"explanation":""},{"id":"d","text":"In the global window object","isCorrect":false,"explanation":""}]',
          NULL,
          'The correct answer is: On Dog.prototype, shared by all instances',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-prototype-pattern-58","original_type":"multiple-choice","topic":"General Design Patterns","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.208Z',
          '2025-10-15T00:47:17.208Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'a26bda4d-da39-44f7-b197-28b67375bd44',
          'Adding Properties Dynamically',
          'If you add Dog.prototype.play after creating instances, will existing instances have access to play()?',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Yes, because all instances reference the same prototype","isCorrect":true,"explanation":""},{"id":"b","text":"No, only future instances get it","isCorrect":false,"explanation":""},{"id":"c","text":"It depends on whether the object was frozen","isCorrect":false,"explanation":""},{"id":"d","text":"JavaScript throws an error","isCorrect":false,"explanation":""}]',
          NULL,
          'The correct answer is: Yes, because all instances reference the same prototype',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-prototype-pattern-59","original_type":"multiple-choice","topic":"General Design Patterns","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.208Z',
          '2025-10-15T00:47:17.208Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '2ed52072-3403-4893-b423-4bd58560f905',
          'Prototype Chain',
          'How does JavaScript resolve a property that isn’t found directly on an object?',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'It traverses the prototype chain via __proto__ until it finds the property or reaches null. This process is called prototype chaining.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-prototype-pattern-60","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["It traverses the prototype chain via __proto__ until it finds the property or reaches null.","This process is called prototype chaining."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.208Z',
          '2025-10-15T00:47:17.208Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'dd0b0874-56d8-44a0-aa82-6c13d1fd9be4',
          'Inheritance with Prototype',
          'In the SuperDog example, how does SuperDog gain access to bark() from Dog?',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Through Object.assign copying methods","isCorrect":false,"explanation":""},{"id":"b","text":"By extending Dog, SuperDog.prototype.__proto__ points to Dog.prototype","isCorrect":true,"explanation":""},{"id":"c","text":"Each SuperDog has its own bark() copy","isCorrect":false,"explanation":""},{"id":"d","text":"By redefining bark in the constructor","isCorrect":false,"explanation":""}]',
          NULL,
          'The correct answer is: By extending Dog, SuperDog.prototype.__proto__ points to Dog.prototype',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-prototype-pattern-61","original_type":"multiple-choice","topic":"General Design Patterns","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.208Z',
          '2025-10-15T00:47:17.208Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '8ff141f8-78b0-4a0c-861f-e8353b0da7f1',
          'Object.create Use Case',
          'What does Object.create allow you to do?',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'It creates a new object with its prototype explicitly set to the provided object. This lets you directly inherit properties without using classes or constructors.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-prototype-pattern-62","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["It creates a new object with its prototype explicitly set to the provided object.","This lets you directly inherit properties without using classes or constructors."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.208Z',
          '2025-10-15T00:47:17.208Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '64b1e267-cabb-4189-af43-afb68f1048f4',
          'Prototype Pattern Advantages',
          'What are two main advantages of the Prototype Pattern?',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'It reduces memory usage by sharing methods across instances. It allows dynamic extension of behavior by modifying the prototype.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-prototype-pattern-63","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["It reduces memory usage by sharing methods across instances.","It allows dynamic extension of behavior by modifying the prototype."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.208Z',
          '2025-10-15T00:47:17.208Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '6a0d58b7-d0c9-49fe-8ce1-43ab4911c639',
          'Prototype Pitfalls',
          'Which of the following can be a downside of relying too heavily on prototype chaining?',
          'multiple-choice',
          'advanced',
          10,
          '[{"id":"a","text":"Deep prototype chains can make debugging difficult and slow property lookups","isCorrect":true,"explanation":""},{"id":"b","text":"It prevents dynamic property addition","isCorrect":false,"explanation":""},{"id":"c","text":"It increases memory usage","isCorrect":false,"explanation":""},{"id":"d","text":"It makes objects immutable","isCorrect":false,"explanation":""}]',
          NULL,
          'The correct answer is: Deep prototype chains can make debugging difficult and slow property lookups',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','advanced']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-prototype-pattern-64","original_type":"multiple-choice","topic":"General Design Patterns","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.208Z',
          '2025-10-15T00:47:17.208Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '86991e35-8e3a-4a0b-878e-8e89285688ce',
          'Provider Pattern Basics',
          'What problem does the Provider Pattern primarily solve in React applications?',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'It solves the issue of prop drilling by allowing components to access shared state directly through context. It provides a way to make global state or values accessible to deeply nested components without passing props manually.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-provider-pattern-61","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["It solves the issue of prop drilling by allowing components to access shared state directly through context.","It provides a way to make global state or values accessible to deeply nested components without passing props manually."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.208Z',
          '2025-10-15T00:47:17.208Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '7e384cbe-77bf-4f94-9c39-4b56c382cc2c',
          'Prop Drilling',
          'Which of the following best describes ''prop drilling''?',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"Passing props through multiple components that don’t use them","isCorrect":true,"explanation":""},{"id":"b","text":"Drilling into the DOM with refs","isCorrect":false,"explanation":""},{"id":"c","text":"Creating deeply nested providers","isCorrect":false,"explanation":""}]',
          NULL,
          'The correct answer is: Passing props through multiple components that don’t use them',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-provider-pattern-62","original_type":"multiple-choice","topic":"General Design Patterns","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.208Z',
          '2025-10-15T00:47:17.208Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '8d16fc8a-1f67-4237-83e0-30b18fd65523',
          'useContext Hook',
          'In React, how does a component consume values from a Provider?',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'By using the useContext hook with the context object created via React.createContext(). The component calls useContext(SomeContext) to directly access the value provided by the Provider.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-provider-pattern-63","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["By using the useContext hook with the context object created via React.createContext().","The component calls useContext(SomeContext) to directly access the value provided by the Provider."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.208Z',
          '2025-10-15T00:47:17.208Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '0fe777ee-5506-4191-a0a9-43b3df8e78b1',
          'Provider Pattern Code',
          'What will be rendered by the Header component in this example?

```jsx
const DataContext = React.createContext();

function App() {
  const data = { title: ''Hello Provider'' };
  return (
    <DataContext.Provider value={data}>
      <Header />
    </DataContext.Provider>
  );
}

function Header() {
  const data = React.useContext(DataContext);
  return <h1>{data.title}</h1>;
}
```',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Nothing, React throws an error","isCorrect":false,"explanation":""},{"id":"b","text":"h1 with text ''Hello Provider''","isCorrect":true,"explanation":""},{"id":"c","text":"h1 with text ''undefined''","isCorrect":false,"explanation":""}]',
          NULL,
          'The correct answer is: h1 with text ''Hello Provider''',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-provider-pattern-64","original_type":"multiple-choice","topic":"General Design Patterns","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.208Z',
          '2025-10-15T00:47:17.208Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'd30c14b8-982d-4119-95d7-350c69f65a02',
          'Performance Concern',
          'What is a potential downside of overusing the Provider Pattern?',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'All components consuming the context re-render whenever the value changes, which can hurt performance in large apps. It can cause unnecessary re-renders if too much state is stored in a single provider.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-provider-pattern-65","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["All components consuming the context re-render whenever the value changes, which can hurt performance in large apps.","It can cause unnecessary re-renders if too much state is stored in a single provider."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.208Z',
          '2025-10-15T00:47:17.208Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '1e40d253-104c-47f1-a2e3-f606b3c7c804',
          'Theme Provider Use Case',
          'Why is the Provider Pattern a good fit for managing application themes (dark/light mode)?',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Because many components need access to the theme, and the Provider allows sharing it globally without prop drilling. It centralizes theme state and makes it easy to toggle or update across the entire app.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-provider-pattern-66","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["Because many components need access to the theme, and the Provider allows sharing it globally without prop drilling.","It centralizes theme state and makes it easy to toggle or update across the entire app."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.208Z',
          '2025-10-15T00:47:17.208Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '0f6fd20d-ef4e-4213-bd10-51bd4fd5eada',
          'Multiple Providers',
          'How can you avoid unnecessary re-renders when using Providers for frequently changing values?',
          'multiple-choice',
          'advanced',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'By splitting contexts into multiple smaller providers so that components only re-render when the specific value they consume changes. Using memoization or selective context providers to isolate updates.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','advanced']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-provider-pattern-67","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["By splitting contexts into multiple smaller providers so that components only re-render when the specific value they consume changes.","Using memoization or selective context providers to isolate updates."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.208Z',
          '2025-10-15T00:47:17.208Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'f4d70b0d-869f-446a-8315-9c3ebfeab701',
          'Custom Hook for Context',
          'What is the benefit of creating a custom hook like `useThemeContext()` instead of calling `useContext(ThemeContext)` directly in every component?',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"It enforces correct usage and can throw errors if used outside the provider","isCorrect":true,"explanation":""},{"id":"b","text":"It avoids the need to import useContext at all","isCorrect":false,"explanation":""},{"id":"c","text":"It improves runtime performance automatically","isCorrect":false,"explanation":""}]',
          NULL,
          'The correct answer is: It enforces correct usage and can throw errors if used outside the provider',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-provider-pattern-68","original_type":"multiple-choice","topic":"General Design Patterns","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.208Z',
          '2025-10-15T00:47:17.208Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '16388007-d94c-4cbd-b494-83a4a71341bc',
          'Provider vs Redux',
          'How does the Provider Pattern differ from using Redux for global state management?',
          'multiple-choice',
          'advanced',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Provider Pattern with context is simpler and built into React, but doesn’t offer advanced features like middleware, devtools, or predictable reducers. Redux adds structure and tooling, while Context Providers are best for simpler shared state.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','advanced']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-provider-pattern-69","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["Provider Pattern with context is simpler and built into React, but doesn’t offer advanced features like middleware, devtools, or predictable reducers.","Redux adds structure and tooling, while Context Providers are best for simpler shared state."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.208Z',
          '2025-10-15T00:47:17.208Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '2f6f3afd-0db6-4027-9cba-103194005310',
          'Styled-Components Provider',
          'What role does the ThemeProvider from styled-components play?',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'It provides a theme object via context so that styled components can access theme values without passing them as props. It applies consistent design tokens (colors, spacing, etc.) across the entire component tree.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-provider-pattern-70","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["It provides a theme object via context so that styled components can access theme values without passing them as props.","It applies consistent design tokens (colors, spacing, etc.) across the entire component tree."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.208Z',
          '2025-10-15T00:47:17.208Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'cd2281fc-89cd-4e63-9ad4-d6d0f7cc091b',
          'Introduction to Proxy Pattern',
          'What is the Proxy Pattern in JavaScript and how does it differ from directly interacting with an object?',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'No explanation provided.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-proxy-pattern-66","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.208Z',
          '2025-10-15T00:47:17.208Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '2461b14b-ba97-4b10-8f0e-0bc3e99fc3ab',
          'Basic Proxy Usage',
          'You have an object `person = { name: ''John'', age: 30 }`. Create a proxy that logs whenever any property is accessed.',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'No explanation provided.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-proxy-pattern-67","original_type":"code","topic":"General Design Patterns","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.208Z',
          '2025-10-15T00:47:17.208Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'a4ac0b0a-883f-49f2-8eea-fa218ab40538',
          'Handler Methods',
          'Which two handler methods are most commonly used in JavaScript Proxies?',
          'multiple-choice',
          'beginner',
          10,
          '[{"0":"a","1":"p","2":"p","3":"l","4":"y","5":" ","6":"a","7":"n","8":"d","9":" ","10":"c","11":"o","12":"n","13":"s","14":"t","15":"r","16":"u","17":"c","18":"t","explanation":""},{"0":"g","1":"e","2":"t","3":" ","4":"a","5":"n","6":"d","7":" ","8":"s","9":"e","10":"t","explanation":""},{"0":"d","1":"e","2":"l","3":"e","4":"t","5":"e","6":"P","7":"r","8":"o","9":"p","10":"e","11":"r","12":"t","13":"y","14":" ","15":"a","16":"n","17":"d","18":" ","19":"d","20":"e","21":"f","22":"i","23":"n","24":"e","25":"P","26":"r","27":"o","28":"p","29":"e","30":"r","31":"t","32":"y","explanation":""},{"0":"o","1":"w","2":"n","3":"K","4":"e","5":"y","6":"s","7":" ","8":"a","9":"n","10":"d","11":" ","12":"h","13":"a","14":"s","explanation":""}]',
          NULL,
          'No explanation provided.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-proxy-pattern-68","original_type":"multiple-choice","topic":"General Design Patterns","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.208Z',
          '2025-10-15T00:47:17.208Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'f5f15db3-bb5d-4250-a2b7-99e4866df2bd',
          'Validation with Proxies',
          'How can the Proxy pattern help with data validation? Give an example.',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'No explanation provided.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-proxy-pattern-69","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.208Z',
          '2025-10-15T00:47:17.208Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '347cc746-361b-4e75-a788-e289948518e0',
          'Logging Changes',
          'Write a proxy that prevents setting `age` to a non-numeric value and logs attempts with an error message.',
          'multiple-choice',
          'advanced',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'No explanation provided.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','advanced']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-proxy-pattern-70","original_type":"code","topic":"General Design Patterns","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.208Z',
          '2025-10-15T00:47:17.208Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '84c71d41-9eac-456f-a30e-3056ebae9729',
          'Proxy and Non-Existent Properties',
          'When trying to access a property that does not exist, how can a Proxy handler respond?',
          'multiple-choice',
          'intermediate',
          10,
          '[{"0":"T","1":"h","2":"r","3":"o","4":"w","5":" ","6":"a","7":"n","8":" ","9":"e","10":"r","11":"r","12":"o","13":"r","explanation":""},{"0":"R","1":"e","2":"t","3":"u","4":"r","5":"n","6":" ","7":"u","8":"n","9":"d","10":"e","11":"f","12":"i","13":"n","14":"e","15":"d","explanation":""},{"0":"L","1":"o","2":"g","3":" ","4":"a","5":" ","6":"c","7":"u","8":"s","9":"t","10":"o","11":"m","12":" ","13":"m","14":"e","15":"s","16":"s","17":"a","18":"g","19":"e","explanation":""},{"0":"A","1":"n","2":"y","3":" ","4":"o","5":"f","6":" ","7":"t","8":"h","9":"e","10":" ","11":"a","12":"b","13":"o","14":"v","15":"e","16":",","17":" ","18":"d","19":"e","20":"p","21":"e","22":"n","23":"d","24":"i","25":"n","26":"g","27":" ","28":"o","29":"n","30":" ","31":"t","32":"h","33":"e","34":" ","35":"h","36":"a","37":"n","38":"d","39":"l","40":"e","41":"r","42":" ","43":"l","44":"o","45":"g","46":"i","47":"c","explanation":""}]',
          NULL,
          'No explanation provided.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-proxy-pattern-71","original_type":"multiple-choice","topic":"General Design Patterns","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.208Z',
          '2025-10-15T00:47:17.208Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'f2321444-cc53-4fbf-917f-fa6fdd510053',
          'Reflect with Proxies',
          'What is the role of the `Reflect` object when working with Proxies, and why is it preferred over direct property access?',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'No explanation provided.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-proxy-pattern-72","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.208Z',
          '2025-10-15T00:47:17.208Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'a558cc41-93bf-4924-b09d-50ed60abf117',
          'Refactoring Proxy with Reflect',
          'Rewrite this Proxy handler to use `Reflect.get` and `Reflect.set` instead of direct object manipulation.',
          'multiple-choice',
          'advanced',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'No explanation provided.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','advanced']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-proxy-pattern-73","original_type":"code","topic":"General Design Patterns","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.208Z',
          '2025-10-15T00:47:17.208Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '31ff696b-2471-4802-b114-79a54fddccd6',
          'Proxy Use Cases',
          'Which of the following are valid use cases for the Proxy pattern?',
          'multiple-choice',
          'intermediate',
          10,
          '[{"0":"V","1":"a","2":"l","3":"i","4":"d","5":"a","6":"t","7":"i","8":"o","9":"n","10":" ","11":"o","12":"f","13":" ","14":"o","15":"b","16":"j","17":"e","18":"c","19":"t","20":" ","21":"p","22":"r","23":"o","24":"p","25":"e","26":"r","27":"t","28":"i","29":"e","30":"s","explanation":""},{"0":"D","1":"e","2":"b","3":"u","4":"g","5":"g","6":"i","7":"n","8":"g","9":" ","10":"a","11":"n","12":"d","13":" ","14":"l","15":"o","16":"g","17":"g","18":"i","19":"n","20":"g","explanation":""},{"0":"F","1":"o","2":"r","3":"m","4":"a","5":"t","6":"t","7":"i","8":"n","9":"g","10":" ","11":"d","12":"a","13":"t","14":"a","15":" ","16":"b","17":"e","18":"f","19":"o","20":"r","21":"e","22":" ","23":"r","24":"e","25":"t","26":"u","27":"r","28":"n","explanation":""},{"0":"P","1":"e","2":"r","3":"f","4":"o","5":"r","6":"m","7":"a","8":"n","9":"c","10":"e","11":" ","12":"o","13":"p","14":"t","15":"i","16":"m","17":"i","18":"z","19":"a","20":"t","21":"i","22":"o","23":"n","24":" ","25":"i","26":"n","27":" ","28":"c","29":"r","30":"i","31":"t","32":"i","33":"c","34":"a","35":"l","36":" ","37":"c","38":"o","39":"d","40":"e","explanation":""}]',
          NULL,
          'No explanation provided.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-proxy-pattern-74","original_type":"multiple-choice","topic":"General Design Patterns","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.208Z',
          '2025-10-15T00:47:17.208Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '6d29e425-8581-49e8-bec3-3b16f1611510',
          'Tradeoffs of Proxy',
          'What are the performance tradeoffs of using Proxy objects in large applications?',
          'multiple-choice',
          'advanced',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'No explanation provided.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','advanced']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-proxy-pattern-75","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.208Z',
          '2025-10-15T00:47:17.208Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '28734a40-1c8e-4c5a-b56c-c0836f9660ed',
          'Singleton Basics',
          'What is the main purpose of the Singleton Pattern in JavaScript?',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'To ensure only one instance of a class or object exists and provide a global point of access to it. It’s often used for managing global state across an application.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-singleton-pattern-76","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["To ensure only one instance of a class or object exists and provide a global point of access to it.","It’s often used for managing global state across an application."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.208Z',
          '2025-10-15T00:47:17.208Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '003fa114-2a97-4b5a-94f8-571fb0249af7',
          'Non-Singleton Counter',
          'Why does the initial Counter class implementation in the example fail to meet the Singleton requirements?',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Because multiple instances can still be created using the `new` keyword. The getInstance method doesn’t enforce a single instance.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-singleton-pattern-77","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["Because multiple instances can still be created using the `new` keyword.","The getInstance method doesn’t enforce a single instance."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.208Z',
          '2025-10-15T00:47:17.208Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'fc4465c7-d593-4043-a0c8-972b132066f3',
          'Enforcing a Singleton',
          'How does introducing a private `instance` variable in the constructor ensure only one instance of the class can exist?',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'It checks if an instance already exists and throws an error on subsequent instantiations. This prevents creating multiple instances with `new`.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-singleton-pattern-78","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["It checks if an instance already exists and throws an error on subsequent instantiations.","This prevents creating multiple instances with `new`."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.208Z',
          '2025-10-15T00:47:17.208Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'db866e81-cbd6-438a-902f-ccccb2f43c44',
          'Object.freeze in Singleton',
          'What is the purpose of using `Object.freeze` on a Singleton instance?',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"Prevents modification of the Singleton’s properties","isCorrect":true,"explanation":""},{"id":"b","text":"Allows multiple instances to be created","isCorrect":false,"explanation":""},{"id":"c","text":"Automatically resets the Singleton","isCorrect":false,"explanation":""}]',
          NULL,
          'The correct answer is: Prevents modification of the Singleton’s properties',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-singleton-pattern-79","original_type":"multiple-choice","topic":"General Design Patterns","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.208Z',
          '2025-10-15T00:47:17.208Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'ee71fc1b-7377-41f7-9d53-0c16018ed61e',
          'Singleton in Multiple Modules',
          'In the redButton.js and blueButton.js example, why does clicking either button increment the same counter?',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Because both modules import the same frozen Singleton instance, which is shared globally. The counter state lives in one place and is referenced everywhere.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-singleton-pattern-80","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["Because both modules import the same frozen Singleton instance, which is shared globally.","The counter state lives in one place and is referenced everywhere."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.208Z',
          '2025-10-15T00:47:17.208Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '1ff2c125-fb05-4c89-b64c-691366ec553e',
          'Singleton vs Object Literal',
          'Why might using a simple object literal sometimes be a better option than implementing a Singleton class in JavaScript?',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Because JavaScript objects are naturally passed by reference, so a single object can already behave like a Singleton. Using a class adds unnecessary complexity if you don’t need instantiation control.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-singleton-pattern-81","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["Because JavaScript objects are naturally passed by reference, so a single object can already behave like a Singleton.","Using a class adds unnecessary complexity if you don’t need instantiation control."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.208Z',
          '2025-10-15T00:47:17.208Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'c2391f4b-c78a-47ea-96fc-5b833f253dfc',
          'Testing Challenges',
          'Why can Singletons be difficult to test?',
          'multiple-choice',
          'advanced',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'All tests share the same instance, so modifications in one test affect others. Resetting state between tests can be cumbersome and error-prone.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','advanced']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-singleton-pattern-82","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["All tests share the same instance, so modifications in one test affect others.","Resetting state between tests can be cumbersome and error-prone."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.208Z',
          '2025-10-15T00:47:17.208Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'ccda7a67-8bcd-459c-b444-ba25b9aadc87',
          'Global Behavior',
          'How is the behavior of a Singleton similar to that of a global variable?',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"Both are accessible throughout the application","isCorrect":true,"explanation":""},{"id":"b","text":"Both prevent mutation of values","isCorrect":false,"explanation":""},{"id":"c","text":"Both are automatically garbage collected","isCorrect":false,"explanation":""}]',
          NULL,
          'The correct answer is: Both are accessible throughout the application',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-singleton-pattern-83","original_type":"multiple-choice","topic":"General Design Patterns","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.208Z',
          '2025-10-15T00:47:17.208Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '846d8eb5-0a03-4335-896d-d0f612a99a56',
          'Drawbacks of Singletons',
          'What are some disadvantages of using the Singleton pattern in large JavaScript applications?',
          'multiple-choice',
          'advanced',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'It introduces hidden dependencies across the codebase. It makes testing harder due to shared mutable state. It can act like a global variable, leading to unexpected coupling.',
          NULL,
          [],
          ARRAY['design-patterns','general-design-patterns','advanced']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"design-patterns-singleton-pattern-84","original_type":"open-ended","topic":"General Design Patterns","subcategory":"","sample_answers":["It introduces hidden dependencies across the codebase.","It makes testing harder due to shared mutable state.","It can act like a global variable, leading to unexpected coupling."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Design Patterns"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-15T00:47:17.208Z',
          '2025-10-15T00:47:17.208Z'
        );;