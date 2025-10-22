INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '383b3007-6d8b-4a79-9a29-022a0ce809a2',
          'What is the purpose of the “import on visibility” pattern?',
          '“Import on visibility” defers loading of components until they are actually visible in the viewport, reducing the initial load time and improving performance.',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'By only importing components when they come into view, the application avoids loading unnecessary code at startup.',
          NULL,
          [],
          ARRAY['performance-patterns','lazy-loading-components','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-import-on-visibility-9","original_type":"concept","topic":"Lazy Loading Components","subcategory":"","sample_answers":["It delays loading of components until they become visible."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10',
          '2025-10-10'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'f0a97141-ac38-4071-be86-c593e6c79316',
          'Which browser API can be used to detect when an element enters the viewport?',
          'The IntersectionObserver API lets developers detect when elements intersect with the viewport and trigger actions like lazy loading.',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'IntersectionObserver efficiently tracks element visibility changes without heavy scroll listeners.',
          NULL,
          [],
          '["performance-patterns","browser-apis",null]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-import-on-visibility-10","original_type":"concept","topic":"Browser APIs","subcategory":"","sample_answers":["IntersectionObserver"],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10',
          '2025-10-10'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'd42aebdc-9b83-47e2-9666-512dee3d7190',
          'How does “react-loadable-visibility” enhance lazy loading in React?',
          'It combines dynamic imports with visibility detection, ensuring components are only loaded when they are about to appear on screen.',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Instead of pre-loading all lazy components, it waits until the user scrolls to them, saving bandwidth and improving UX.',
          NULL,
          [],
          '["performance-patterns","react-loadable-visibility",null]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-import-on-visibility-11","original_type":"concept","topic":"react-loadable-visibility","subcategory":"","sample_answers":["It lazy loads components only when visible."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10',
          '2025-10-10'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'c401958d-b8a6-4ccc-902b-f61409e2db1e',
          'What is the role of the fallback component in import-on-visibility?',
          'The fallback UI is displayed while the requested module is being fetched, parsed, and executed, giving users feedback instead of a blank screen.',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'The fallback reassures users that loading is in progress, preventing perceived freezes.',
          NULL,
          [],
          ARRAY['performance-patterns','ux-during-lazy-load','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-import-on-visibility-12","original_type":"concept","topic":"UX During Lazy Load","subcategory":"","sample_answers":["It shows a loading indicator during module load."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10',
          '2025-10-10'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '419dcb91-871a-42de-9d44-55f6ba201001',
          'How does import-on-visibility differ from basic dynamic import?',
          'Dynamic import loads modules when triggered by user action, while import-on-visibility loads them automatically when they become visible on screen.',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Import-on-visibility uses viewport detection rather than explicit user events to trigger the import.',
          NULL,
          [],
          '["performance-patterns","import-strategies",null]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-import-on-visibility-13","original_type":"concept","topic":"Import Strategies","subcategory":"","sample_answers":["It loads on visibility, not just user click."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10',
          '2025-10-10'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '6c1e5f16-94ab-4136-956e-5de0134e0f2c',
          'What benefits does import-on-visibility offer for large single-page applications?',
          'It helps reduce main bundle size, optimizes network requests, and improves time-to-interactive (TTI) by loading only visible components.',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Users experience faster initial render and smoother scrolling as code loads progressively.',
          NULL,
          [],
          '["performance-patterns","spa-optimization",null]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-import-on-visibility-14","original_type":"concept","topic":"SPA Optimization","subcategory":"","sample_answers":["Smaller bundles and faster initial render."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10',
          '2025-10-10'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '41e22a90-4edb-49e4-8664-3391b0ecda6a',
          'What happens when the EmojiPicker becomes visible in the viewport using react-loadable-visibility?',
          'The library detects visibility and begins importing the EmojiPicker module, showing a loading indicator until it’s ready.',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'The module import only begins when the element is visible.',
          NULL,
          [],
          ARRAY['performance-patterns','emojipicker-example','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-import-on-visibility-15","original_type":"scenario","topic":"EmojiPicker Example","subcategory":"","sample_answers":["It loads when visible."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10',
          '2025-10-10'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '87cdaaad-a0f8-4a29-89c5-5037d25c5bb4',
          'What are potential drawbacks of import-on-visibility?',
          'Components might have a short delay when they first appear, especially on slow networks, since the import happens only when visible.',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Balancing performance and perceived speed requires good fallback UIs and caching strategies.',
          NULL,
          [],
          '["performance-patterns","visibility-based-loading",null]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-import-on-visibility-16","original_type":"concept","topic":"Visibility-based Loading","subcategory":"","sample_answers":["Visible delay if network is slow."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10',
          '2025-10-10'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '98cd91a9-962b-46b0-8ce2-3c37b583d31b',
          'Understanding Loading Sequence',
          'What is the primary goal of optimizing the loading sequence in web performance?',
          'multiple-choice',
          'beginner',
          10,
          '[{"0":"T","1":"o","2":" ","3":"i","4":"m","5":"p","6":"r","7":"o","8":"v","9":"e","10":" ","11":"S","12":"E","13":"O","14":" ","15":"r","16":"a","17":"n","18":"k","19":"i","20":"n","21":"g","explanation":""},{"0":"T","1":"o","2":" ","3":"e","4":"n","5":"h","6":"a","7":"n","8":"c","9":"e","10":" ","11":"p","12":"e","13":"r","14":"c","15":"e","16":"i","17":"v","18":"e","19":"d","20":" ","21":"p","22":"e","23":"r","24":"f","25":"o","26":"r","27":"m","28":"a","29":"n","30":"c","31":"e","32":" ","33":"a","34":"n","35":"d","36":" ","37":"a","38":"c","39":"h","40":"i","41":"e","42":"v","43":"e","44":" ","45":"b","46":"e","47":"t","48":"t","49":"e","50":"r","51":" ","52":"C","53":"o","54":"r","55":"e","56":" ","57":"W","58":"e","59":"b","60":" ","61":"V","62":"i","63":"t","64":"a","65":"l","66":"s","explanation":""},{"0":"T","1":"o","2":" ","3":"r","4":"e","5":"d","6":"u","7":"c","8":"e","9":" ","10":"t","11":"h","12":"e","13":" ","14":"n","15":"u","16":"m","17":"b","18":"e","19":"r","20":" ","21":"o","22":"f","23":" ","24":"n","25":"e","26":"t","27":"w","28":"o","29":"r","30":"k","31":" ","32":"r","33":"e","34":"q","35":"u","36":"e","37":"s","38":"t","39":"s","explanation":""},{"0":"T","1":"o","2":" ","3":"p","4":"r","5":"e","6":"v","7":"e","8":"n","9":"t","10":" ","11":"C","12":"S","13":"S","14":" ","15":"a","16":"n","17":"d","18":" ","19":"J","20":"S","21":" ","22":"c","23":"o","24":"n","25":"f","26":"l","27":"i","28":"c","29":"t","30":"s","explanation":""}]',
          NULL,
          'Optimizing the loading sequence ensures that critical resources load at the right time, improving perceived performance and metrics like FCP and LCP.',
          NULL,
          [],
          ARRAY['performance-patterns','web-performance','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-loading-sequence-1","original_type":"multiple-choice","topic":"Web Performance","subcategory":"","sample_answers":["To enhance perceived performance and achieve better Core Web Vitals"],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00Z',
          '2025-10-10T00:00:00Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '7efe82b7-3698-4bba-998d-9ab3c7d801c0',
          'Why Optimal Loading Is Difficult',
          'What is one major reason why achieving an optimal loading sequence is challenging?',
          'multiple-choice',
          'intermediate',
          10,
          '[{"0":"B","1":"r","2":"o","3":"w","4":"s","5":"e","6":"r","7":"s","8":" ","9":"f","10":"o","11":"l","12":"l","13":"o","14":"w","15":" ","16":"a","17":" ","18":"s","19":"t","20":"a","21":"n","22":"d","23":"a","24":"r","25":"d","26":" ","27":"u","28":"n","29":"i","30":"v","31":"e","32":"r","33":"s","34":"a","35":"l","36":" ","37":"r","38":"e","39":"s","40":"o","41":"u","42":"r","43":"c","44":"e","45":" ","46":"p","47":"r","48":"i","49":"o","50":"r","51":"i","52":"t","53":"i","54":"z","55":"a","56":"t","57":"i","58":"o","59":"n","60":" ","61":"m","62":"o","63":"d","64":"e","65":"l","explanation":""},{"0":"D","1":"e","2":"v","3":"e","4":"l","5":"o","6":"p","7":"e","8":"r","9":"s","10":" ","11":"a","12":"n","13":"d","14":" ","15":"b","16":"r","17":"o","18":"w","19":"s","20":"e","21":"r","22":"s","23":" ","24":"o","25":"f","26":"t","27":"e","28":"n","29":" ","30":"d","31":"i","32":"f","33":"f","34":"e","35":"r","36":" ","37":"i","38":"n","39":" ","40":"h","41":"o","42":"w","43":" ","44":"t","45":"h","46":"e","47":"y","48":" ","49":"p","50":"r","51":"i","52":"o","53":"r","54":"i","55":"t","56":"i","57":"z","58":"e","59":" ","60":"r","61":"e","62":"s","63":"o","64":"u","65":"r","66":"c","67":"e","68":"s","explanation":""},{"0":"A","1":"l","2":"l","3":" ","4":"t","5":"h","6":"i","7":"r","8":"d","9":"-","10":"p","11":"a","12":"r","13":"t","14":"y","15":" ","16":"s","17":"c","18":"r","19":"i","20":"p","21":"t","22":"s","23":" ","24":"a","25":"u","26":"t","27":"o","28":"m","29":"a","30":"t","31":"i","32":"c","33":"a","34":"l","35":"l","36":"y","37":" ","38":"o","39":"p","40":"t","41":"i","42":"m","43":"i","44":"z","45":"e","46":" ","47":"f","48":"o","49":"r","50":" ","51":"p","52":"e","53":"r","54":"f","55":"o","56":"r","57":"m","58":"a","59":"n","60":"c","61":"e","explanation":""},{"0":"H","1":"T","2":"T","3":"P","4":"/","5":"2","6":" ","7":"a","8":"l","9":"w","10":"a","11":"y","12":"s","13":" ","14":"p","15":"r","16":"o","17":"v","18":"i","19":"d","20":"e","21":"s","22":" ","23":"p","24":"e","25":"r","26":"f","27":"e","28":"c","29":"t","30":" ","31":"p","32":"r","33":"i","34":"o","35":"r","36":"i","37":"t","38":"i","39":"z","40":"a","41":"t","42":"i","43":"o","44":"n","explanation":""}]',
          NULL,
          'Developers often expect browsers to prioritize resources in a specific order, but browsers handle requests differently, leading to suboptimal performance.',
          NULL,
          [],
          '["performance-patterns","loading-challenges",null]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-loading-sequence-2","original_type":"multiple-choice","topic":"Loading Challenges","subcategory":"","sample_answers":["Developers and browsers often differ in how they prioritize resources"],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00Z',
          '2025-10-10T00:00:00Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'caf8e22e-6b2d-4fbe-b46a-d3539bb8efd6',
          'Network and CPU Utilization',
          'What happens if resources are not pipelined correctly in terms of CPU and network usage?',
          'multiple-choice',
          'intermediate',
          10,
          '[{"0":"T","1":"h","2":"e","3":" ","4":"b","5":"r","6":"o","7":"w","8":"s","9":"e","10":"r","11":" ","12":"c","13":"a","14":"c","15":"h","16":"e","17":"s","18":" ","19":"a","20":"l","21":"l","22":" ","23":"r","24":"e","25":"s","26":"o","27":"u","28":"r","29":"c","30":"e","31":"s","32":" ","33":"a","34":"u","35":"t","36":"o","37":"m","38":"a","39":"t","40":"i","41":"c","42":"a","43":"l","44":"l","45":"y","explanation":""},{"0":"T","1":"h","2":"e","3":" ","4":"C","5":"P","6":"U","7":" ","8":"a","9":"n","10":"d","11":" ","12":"n","13":"e","14":"t","15":"w","16":"o","17":"r","18":"k","19":" ","20":"a","21":"r","22":"e","23":" ","24":"a","25":"l","26":"w","27":"a","28":"y","29":"s","30":" ","31":"f","32":"u","33":"l","34":"l","35":"y","36":" ","37":"u","38":"t","39":"i","40":"l","41":"i","42":"z","43":"e","44":"d","explanation":""},{"0":"D","1":"e","2":"a","3":"d","4":" ","5":"t","6":"i","7":"m","8":"e","9":" ","10":"o","11":"c","12":"c","13":"u","14":"r","15":"s","16":" ","17":"o","18":"n","19":" ","20":"e","21":"i","22":"t","23":"h","24":"e","25":"r","26":" ","27":"C","28":"P","29":"U","30":" ","31":"o","32":"r","33":" ","34":"n","35":"e","36":"t","37":"w","38":"o","39":"r","40":"k","41":",","42":" ","43":"c","44":"a","45":"u","46":"s","47":"i","48":"n","49":"g","50":" ","51":"d","52":"e","53":"l","54":"a","55":"y","56":"s","explanation":""},{"0":"L","1":"C","2":"P","3":" ","4":"i","5":"s","6":" ","7":"a","8":"c","9":"h","10":"i","11":"e","12":"v","13":"e","14":"d","15":" ","16":"f","17":"a","18":"s","19":"t","20":"e","21":"r","explanation":""}]',
          NULL,
          'Improper pipelining can lead to idle CPU or network times, where one waits for the other, decreasing efficiency.',
          NULL,
          [],
          '["performance-patterns","network-optimization",null]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-loading-sequence-3","original_type":"multiple-choice","topic":"Network Optimization","subcategory":"","sample_answers":["Dead time occurs on either CPU or network, causing delays"],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00Z',
          '2025-10-10T00:00:00Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'aa510545-ca4b-4c37-8b2d-d33a0ee44d55',
          'Third-Party Scripts Impact',
          'How do third-party scripts usually affect page load performance?',
          'multiple-choice',
          'intermediate',
          10,
          '[{"0":"T","1":"h","2":"e","3":"y","4":" ","5":"o","6":"p","7":"t","8":"i","9":"m","10":"i","11":"z","12":"e","13":" ","14":"t","15":"h","16":"e","17":" ","18":"s","19":"e","20":"q","21":"u","22":"e","23":"n","24":"c","25":"e","26":" ","27":"a","28":"u","29":"t","30":"o","31":"m","32":"a","33":"t","34":"i","35":"c","36":"a","37":"l","38":"l","39":"y","explanation":""},{"0":"T","1":"h","2":"e","3":"y","4":" ","5":"o","6":"f","7":"t","8":"e","9":"n","10":" ","11":"b","12":"l","13":"o","14":"c","15":"k","16":" ","17":"r","18":"e","19":"n","20":"d","21":"e","22":"r","23":"i","24":"n","25":"g","26":" ","27":"a","28":"n","29":"d","30":" ","31":"d","32":"e","33":"l","34":"a","35":"y","36":" ","37":"c","38":"r","39":"i","40":"t","41":"i","42":"c","43":"a","44":"l","45":" ","46":"r","47":"e","48":"s","49":"o","50":"u","51":"r","52":"c","53":"e","54":" ","55":"l","56":"o","57":"a","58":"d","59":"i","60":"n","61":"g","explanation":""},{"0":"T","1":"h","2":"e","3":"y","4":" ","5":"i","6":"m","7":"p","8":"r","9":"o","10":"v","11":"e","12":" ","13":"C","14":"P","15":"U","16":" ","17":"u","18":"t","19":"i","20":"l","21":"i","22":"z","23":"a","24":"t","25":"i","26":"o","27":"n","explanation":""},{"0":"T","1":"h","2":"e","3":"y","4":" ","5":"l","6":"o","7":"a","8":"d","9":" ","10":"a","11":"f","12":"t","13":"e","14":"r","15":" ","16":"a","17":"l","18":"l","19":" ","20":"f","21":"i","22":"r","23":"s","24":"t","25":"-","26":"p","27":"a","28":"r","29":"t","30":"y","31":" ","32":"s","33":"c","34":"r","35":"i","36":"p","37":"t","38":"s","39":" ","40":"b","41":"y","42":" ","43":"d","44":"e","45":"f","46":"a","47":"u","48":"l","49":"t","explanation":""}]',
          NULL,
          'Third-party scripts like ads or analytics often block rendering or delay other resources, harming metrics like FID and LCP.',
          NULL,
          [],
          '["performance-patterns","third-party-performance",null]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-loading-sequence-4","original_type":"multiple-choice","topic":"Third-Party Performance","subcategory":"","sample_answers":["They often block rendering and delay critical resource loading"],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00Z',
          '2025-10-10T00:00:00Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '01a3ea2c-667d-4f0d-9a37-f3975117a86b',
          'Critical CSS Best Practice',
          'What is the best way to handle critical CSS for optimal performance?',
          'multiple-choice',
          'beginner',
          10,
          '[{"0":"L","1":"o","2":"a","3":"d","4":" ","5":"a","6":"l","7":"l","8":" ","9":"C","10":"S","11":"S","12":" ","13":"f","14":"i","15":"l","16":"e","17":"s","18":" ","19":"a","20":"s","21":"y","22":"n","23":"c","24":"h","25":"r","26":"o","27":"n","28":"o","29":"u","30":"s","31":"l","32":"y","explanation":""},{"0":"I","1":"n","2":"l","3":"i","4":"n","5":"e","6":" ","7":"c","8":"r","9":"i","10":"t","11":"i","12":"c","13":"a","14":"l","15":" ","16":"C","17":"S","18":"S","19":" ","20":"a","21":"n","22":"d","23":" ","24":"p","25":"r","26":"e","27":"l","28":"o","29":"a","30":"d","31":" ","32":"i","33":"f","34":" ","35":"e","36":"x","37":"t","38":"e","39":"r","40":"n","41":"a","42":"l","explanation":""},{"0":"S","1":"e","2":"r","3":"v","4":"e","5":" ","6":"a","7":"l","8":"l","9":" ","10":"C","11":"S","12":"S","13":" ","14":"f","15":"r","16":"o","17":"m","18":" ","19":"t","20":"h","21":"i","22":"r","23":"d","24":"-","25":"p","26":"a","27":"r","28":"t","29":"y","30":" ","31":"C","32":"D","33":"N","34":"s","explanation":""},{"0":"L","1":"o","2":"a","3":"d","4":" ","5":"C","6":"S","7":"S","8":" ","9":"a","10":"f","11":"t","12":"e","13":"r","14":" ","15":"a","16":"l","17":"l","18":" ","19":"J","20":"a","21":"v","22":"a","23":"S","24":"c","25":"r","26":"i","27":"p","28":"t","explanation":""}]',
          NULL,
          'Inlining critical CSS ensures faster rendering of above-the-fold content, directly improving FCP and LCP.',
          NULL,
          [],
          ARRAY['performance-patterns','css-optimization','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-loading-sequence-5","original_type":"multiple-choice","topic":"CSS Optimization","subcategory":"","sample_answers":["Inline critical CSS and preload if external"],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00Z',
          '2025-10-10T00:00:00Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'ceae5606-6fbd-4d41-a371-7549dcde953f',
          'Font Loading Strategy',
          'How can developers reduce the delay caused by fetching external fonts?',
          'multiple-choice',
          'intermediate',
          10,
          '[{"0":"U","1":"s","2":"e","3":" ","4":"f","5":"o","6":"n","7":"t","8":" ","9":"p","10":"r","11":"e","12":"c","13":"o","14":"n","15":"n","16":"e","17":"c","18":"t","19":" ","20":"f","21":"o","22":"r","23":" ","24":"e","25":"x","26":"t","27":"e","28":"r","29":"n","30":"a","31":"l","32":" ","33":"d","34":"o","35":"m","36":"a","37":"i","38":"n","39":"s","explanation":""},{"0":"L","1":"o","2":"a","3":"d","4":" ","5":"a","6":"l","7":"l","8":" ","9":"f","10":"o","11":"n","12":"t","13":"s","14":" ","15":"a","16":"f","17":"t","18":"e","19":"r","20":" ","21":"i","22":"n","23":"t","24":"e","25":"r","26":"a","27":"c","28":"t","29":"i","30":"v","31":"i","32":"t","33":"y","34":" ","35":"s","36":"t","37":"a","38":"r","39":"t","40":"s","explanation":""},{"0":"I","1":"n","2":"l","3":"i","4":"n","5":"e","6":" ","7":"a","8":"l","9":"l","10":" ","11":"f","12":"o","13":"n","14":"t","15":" ","16":"f","17":"i","18":"l","19":"e","20":"s","21":" ","22":"d","23":"i","24":"r","25":"e","26":"c","27":"t","28":"l","29":"y","30":" ","31":"i","32":"n","33":"t","34":"o","35":" ","36":"H","37":"T","38":"M","39":"L","explanation":""},{"0":"A","1":"v","2":"o","3":"i","4":"d","5":" ","6":"u","7":"s","8":"i","9":"n","10":"g","11":" ","12":"f","13":"o","14":"n","15":"t","16":" ","17":"f","18":"a","19":"l","20":"l","21":"b","22":"a","23":"c","24":"k","25":"s","explanation":""}]',
          NULL,
          'Using preconnect allows browsers to establish connections early, reducing delay in fetching critical font resources.',
          NULL,
          [],
          '["performance-patterns","fonts-and-preconnect",null]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-loading-sequence-6","original_type":"multiple-choice","topic":"Fonts and Preconnect","subcategory":"","sample_answers":["Use font preconnect for external domains"],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00Z',
          '2025-10-10T00:00:00Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '29a53385-9545-43bf-9966-cfe17bdc7bfb',
          'Image Loading Prioritization',
          'Which images should be prioritized during the initial page load?',
          'multiple-choice',
          'beginner',
          10,
          '[{"0":"B","1":"e","2":"l","3":"o","4":"w","5":" ","6":"t","7":"h","8":"e","9":" ","10":"f","11":"o","12":"l","13":"d","14":" ","15":"i","16":"m","17":"a","18":"g","19":"e","20":"s","explanation":""},{"0":"A","1":"b","2":"o","3":"v","4":"e","5":" ","6":"t","7":"h","8":"e","9":" ","10":"f","11":"o","12":"l","13":"d","14":" ","15":"i","16":"m","17":"a","18":"g","19":"e","20":"s","21":" ","22":"i","23":"n","24":"c","25":"l","26":"u","27":"d","28":"i","29":"n","30":"g","31":" ","32":"t","33":"h","34":"e","35":" ","36":"h","37":"e","38":"r","39":"o","40":" ","41":"i","42":"m","43":"a","44":"g","45":"e","explanation":""},{"0":"A","1":"l","2":"l","3":" ","4":"i","5":"m","6":"a","7":"g","8":"e","9":"s","10":" ","11":"e","12":"q","13":"u","14":"a","15":"l","16":"l","17":"y","explanation":""},{"0":"L","1":"a","2":"z","3":"y","4":"-","5":"l","6":"o","7":"a","8":"d","9":" ","10":"a","11":"l","12":"l","13":" ","14":"i","15":"m","16":"a","17":"g","18":"e","19":"s","explanation":""}]',
          NULL,
          'Above-the-fold (ATF) and hero images directly affect LCP and should be prioritized during initial loading.',
          NULL,
          [],
          ARRAY['performance-patterns','images-and-lcp','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-loading-sequence-7","original_type":"multiple-choice","topic":"Images and LCP","subcategory":"","sample_answers":["Above the fold images including the hero image"],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00Z',
          '2025-10-10T00:00:00Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '3145cb71-bc7b-4699-9559-afa99b89e557',
          'Next.js ScriptLoader Usage',
          'Which Next.js ScriptLoader priority should be used for scripts that run after hydration, such as analytics?',
          'multiple-choice',
          'intermediate',
          10,
          '[{"0":"B","1":"e","2":"f","3":"o","4":"r","5":"e","6":"-","7":"I","8":"n","9":"t","10":"e","11":"r","12":"a","13":"c","14":"t","15":"i","16":"v","17":"e","explanation":""},{"0":"A","1":"f","2":"t","3":"e","4":"r","5":"-","6":"I","7":"n","8":"t","9":"e","10":"r","11":"a","12":"c","13":"t","14":"i","15":"v","16":"e","explanation":""},{"0":"L","1":"a","2":"z","3":"y","4":"-","5":"O","6":"n","7":"l","8":"o","9":"a","10":"d","explanation":""},{"0":"A","1":"s","2":"y","3":"n","4":"c","5":"-","6":"P","7":"r","8":"e","9":"l","10":"o","11":"a","12":"d","explanation":""}]',
          NULL,
          'Scripts like analytics should use ''After-Interactive'' so they load after hydration without blocking critical rendering.',
          NULL,
          [],
          '["performance-patterns","script-loading",null]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-loading-sequence-8","original_type":"multiple-choice","topic":"Script Loading","subcategory":"","sample_answers":["After-Interactive"],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00Z',
          '2025-10-10T00:00:00Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '7c65ac17-f5b0-42cd-aec6-e9e7c48db7bb',
          'Lazy-Onload Scripts',
          'When should you use the ''Lazy-Onload'' priority for third-party scripts in Next.js?',
          'multiple-choice',
          'intermediate',
          10,
          '[{"0":"F","1":"o","2":"r","3":" ","4":"c","5":"r","6":"i","7":"t","8":"i","9":"c","10":"a","11":"l","12":" ","13":"p","14":"o","15":"l","16":"y","17":"f","18":"i","19":"l","20":"l","21":"s","22":" ","23":"a","24":"n","25":"d","26":" ","27":"s","28":"e","29":"c","30":"u","31":"r","32":"i","33":"t","34":"y","35":" ","36":"s","37":"c","38":"r","39":"i","40":"p","41":"t","42":"s","explanation":""},{"0":"F","1":"o","2":"r","3":" ","4":"s","5":"o","6":"c","7":"i","8":"a","9":"l","10":" ","11":"w","12":"i","13":"d","14":"g","15":"e","16":"t","17":"s","18":" ","19":"a","20":"n","21":"d","22":" ","23":"f","24":"e","25":"e","26":"d","27":"b","28":"a","29":"c","30":"k","31":" ","32":"s","33":"c","34":"r","35":"i","36":"p","37":"t","38":"s","explanation":""},{"0":"F","1":"o","2":"r","3":" ","4":"h","5":"y","6":"d","7":"r","8":"a","9":"t","10":"i","11":"o","12":"n","13":"-","14":"r","15":"e","16":"l","17":"a","18":"t","19":"e","20":"d","21":" ","22":"s","23":"c","24":"r","25":"i","26":"p","27":"t","28":"s","explanation":""},{"0":"F","1":"o","2":"r","3":" ","4":"c","5":"r","6":"i","7":"t","8":"i","9":"c","10":"a","11":"l","12":" ","13":"f","14":"o","15":"n","16":"t","17":"s","18":" ","19":"a","20":"n","21":"d","22":" ","23":"C","24":"S","25":"S","explanation":""}]',
          NULL,
          '''Lazy-Onload'' should be used for non-critical third-party scripts like social widgets that can load after all main content.',
          NULL,
          [],
          '["performance-patterns","next.js-script-management",null]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-loading-sequence-9","original_type":"multiple-choice","topic":"Next.js Script Management","subcategory":"","sample_answers":["For social widgets and feedback scripts"],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00Z',
          '2025-10-10T00:00:00Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '75a380c0-1c18-4be9-ac08-3e44435c2dbc',
          'Avoiding Preload Overuse',
          'Why should developers avoid overusing the preload directive?',
          'multiple-choice',
          'intermediate',
          10,
          '[{"0":"I","1":"t","2":" ","3":"c","4":"a","5":"n","6":" ","7":"c","8":"a","9":"u","10":"s","11":"e","12":" ","13":"t","14":"h","15":"e","16":" ","17":"b","18":"r","19":"o","20":"w","21":"s","22":"e","23":"r","24":" ","25":"t","26":"o","27":" ","28":"d","29":"o","30":"w","31":"n","32":"l","33":"o","34":"a","35":"d","36":" ","37":"u","38":"n","39":"n","40":"e","41":"c","42":"e","43":"s","44":"s","45":"a","46":"r","47":"y","48":" ","49":"r","50":"e","51":"s","52":"o","53":"u","54":"r","55":"c","56":"e","57":"s","58":" ","59":"e","60":"a","61":"r","62":"l","63":"y","explanation":""},{"0":"I","1":"t","2":" ","3":"i","4":"m","5":"p","6":"r","7":"o","8":"v","9":"e","10":"s","11":" ","12":"c","13":"a","14":"c","15":"h","16":"i","17":"n","18":"g","19":" ","20":"t","21":"o","22":"o","23":" ","24":"m","25":"u","26":"c","27":"h","explanation":""},{"0":"I","1":"t","2":" ","3":"a","4":"u","5":"t","6":"o","7":"m","8":"a","9":"t","10":"i","11":"c","12":"a","13":"l","14":"l","15":"y","16":" ","17":"p","18":"r","19":"i","20":"o","21":"r","22":"i","23":"t","24":"i","25":"z","26":"e","27":"s","28":" ","29":"r","30":"e","31":"s","32":"o","33":"u","34":"r","35":"c","36":"e","37":"s","38":" ","39":"c","40":"o","41":"r","42":"r","43":"e","44":"c","45":"t","46":"l","47":"y","explanation":""},{"0":"I","1":"t","2":" ","3":"b","4":"l","5":"o","6":"c","7":"k","8":"s","9":" ","10":"a","11":"l","12":"l","13":" ","14":"a","15":"s","16":"y","17":"n","18":"c","19":" ","20":"s","21":"c","22":"r","23":"i","24":"p","25":"t","26":"s","explanation":""}]',
          NULL,
          'Overusing preload can cause browsers to fetch unnecessary resources too early, increasing network congestion and reducing performance.',
          NULL,
          [],
          '["performance-patterns","browser-optimization",null]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-loading-sequence-10","original_type":"multiple-choice","topic":"Browser Optimization","subcategory":"","sample_answers":["It can cause the browser to download unnecessary resources early"],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00Z',
          '2025-10-10T00:00:00Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'b4823d13-fe26-4dbe-beaf-ffe01a4f4367',
          'How does Dynamic Import relate to Bundle Splitting?',
          '### Dynamic Import
Dynamic imports allow us to load JavaScript modules only when needed rather than at initial load. This enables bundle splitting by creating separate chunks for on-demand code.

**Example:**
```js
import(''./EmojiPicker'').then(module => {
  const EmojiPicker = module.default;
  render(<EmojiPicker />);
});
```

**Question:**
Explain how dynamic import statements contribute to bundle splitting and performance optimization.',
          'multiple-choice',
          'advanced',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Dynamic imports allow JavaScript modules to be fetched on demand, automatically creating separate bundles for lazy-loaded components and reducing initial load size.',
          NULL,
          [],
          ARRAY['performance-patterns','dynamic-import','advanced']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-performance-1-pp7","original_type":"open-ended","topic":"Dynamic Import","subcategory":"","sample_answers":["Dynamic imports allow JavaScript modules to be fetched on demand, automatically creating separate bundles for lazy-loaded components and reducing initial load size."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00.000Z',
          '2025-10-10T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '895b834b-1b46-44f3-96f7-b15cef666670',
          'Which of the following statements about Dynamic Import are true?',
          'Select all correct statements related to dynamic imports and bundle splitting.',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"o1","text":"Dynamic imports return a Promise that resolves to the requested module.","isCorrect":true,"explanation":""},{"id":"o2","text":"Dynamic imports always block the initial page render.","isCorrect":false,"explanation":""},{"id":"o3","text":"Webpack automatically creates separate chunks for dynamically imported modules.","isCorrect":true,"explanation":""},{"id":"o4","text":"Dynamic imports are part of the ES2020 specification.","isCorrect":true,"explanation":""}]',
          NULL,
          'Dynamic imports are asynchronous and allow bundlers like Webpack to split code into separate chunks that load only when needed, improving perceived performance.',
          NULL,
          [],
          ARRAY['performance-patterns','dynamic-import','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-performance-1-pp8","original_type":"multiple-choice","topic":"Dynamic Import","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00.000Z',
          '2025-10-10T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '797fedd8-f94a-4c2a-8cde-12375d8f01cb',
          'True or False: Bundle Splitting can be applied manually using Webpack entry points.',
          'Evaluate whether developers can configure multiple entry points in Webpack to create separate bundles manually.',
          'true-false',
          'intermediate',
          10,
          '[{"id":"true","text":"True","isCorrect":false},{"id":"false","text":"False","isCorrect":true}]',
          'false',
          'The correct answer is: True',
          NULL,
          [],
          ARRAY['performance-patterns','webpack-configuration','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-performance-1-pp9","original_type":"true-false","topic":"Webpack Configuration","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00.000Z',
          '2025-10-10T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '1d81c59c-ad7d-4e66-979c-4daa7d5b713f',
          'What is Lazy Loading, and how is it connected to Bundle Splitting?',
          '### Lazy Loading
Lazy loading is a strategy where certain resources or components are loaded only when they’re actually needed. When used with bundle splitting, lazy loading ensures that non-critical chunks are loaded later.

**Example:** React’s `lazy()` and `Suspense` help load components on demand.

**Question:**
Describe how lazy loading works in combination with bundle splitting to improve user experience.',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Lazy loading delays loading of non-critical components. Combined with bundle splitting, it ensures smaller initial bundles and faster interactive experiences.',
          NULL,
          [],
          ARRAY['performance-patterns','lazy-loading','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-performance-1-pp10","original_type":"open-ended","topic":"Lazy Loading","subcategory":"","sample_answers":["Lazy loading delays loading of non-critical components. Combined with bundle splitting, it ensures smaller initial bundles and faster interactive experiences."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00.000Z',
          '2025-10-10T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '0d8518a5-c5de-440b-a527-57dee388a1c6',
          'Which tools or techniques can help automate Bundle Splitting in modern web projects?',
          'Select the correct tools or features that support automatic bundle splitting.',
          'multiple-choice',
          'advanced',
          10,
          '[{"id":"o1","text":"Webpack''s `SplitChunksPlugin`","isCorrect":true,"explanation":""},{"id":"o2","text":"Vite’s pre-bundling mechanism (esbuild)","isCorrect":true,"explanation":""},{"id":"o3","text":"React.lazy() + Suspense","isCorrect":true,"explanation":""},{"id":"o4","text":"HTML inline scripts","isCorrect":false,"explanation":""}]',
          NULL,
          'Tools like Webpack’s SplitChunksPlugin, Rollup, and modern bundlers like Vite handle automatic code-splitting and lazy loading integration.',
          NULL,
          [],
          ARRAY['performance-patterns','bundle-splitting-tools','advanced']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-performance-1-pp11","original_type":"multiple-choice","topic":"Bundle Splitting Tools","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00.000Z',
          '2025-10-10T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '29bad178-6c94-4580-9a22-d0f6ac9cfeb9',
          'What are potential drawbacks of overusing Bundle Splitting?',
          '### Trade-offs
While bundle splitting improves load times, over-splitting can lead to performance issues.

**Possible issues include:**
- Too many network requests
- Increased HTTP overhead
- Caching complexity

**Question:** What are the main drawbacks developers should consider before aggressively splitting bundles?',
          'multiple-choice',
          'advanced',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Excessive splitting can cause too many small network requests, increase latency, and make caching more complex.',
          NULL,
          [],
          ARRAY['performance-patterns','bundle-splitting','advanced']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-performance-1-pp12","original_type":"open-ended","topic":"Bundle Splitting","subcategory":"","sample_answers":["Excessive splitting can cause too many small network requests, increase latency, and make caching more complex."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00.000Z',
          '2025-10-10T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '4d040912-419d-4e16-9a63-0c1eeb82ee1f',
          'Understanding Preload in Web Performance',
          'What is the purpose of using `<link rel="preload">` in a web application?',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"To load critical resources earlier for faster interactivity","isCorrect":true,"explanation":""},{"id":"b","text":"To defer resource loading until needed","isCorrect":false,"explanation":""},{"id":"c","text":"To lazy load components on user interaction","isCorrect":false,"explanation":""}]',
          NULL,
          'Preload helps load critical resources early to improve metrics like Time to Interactive or First Input Delay.',
          NULL,
          [],
          ARRAY['performance-patterns','preload-optimization','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-pre-load-1","original_type":"multiple-choice","topic":"Preload Optimization","subcategory":"","sample_answers":["Preload ensures critical assets are downloaded earlier, speeding up interactivity."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00Z',
          '2025-10-10T00:00:00Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'bcd8c952-b41c-4150-b9a8-8661620d4732',
          'Preload vs Prefetch',
          'What is the main difference between preloading and prefetching resources?',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Preload is for resources needed immediately, prefetch is for resources needed soon","isCorrect":true,"explanation":""},{"id":"b","text":"Prefetch loads higher priority resources than preload","isCorrect":false,"explanation":""},{"id":"c","text":"Preload is always handled automatically by the browser","isCorrect":false,"explanation":""}]',
          NULL,
          'Preload prioritizes resources needed right away; prefetch prepares resources for potential future use.',
          NULL,
          [],
          '["performance-patterns","performance-comparison",null]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-pre-load-2","original_type":"multiple-choice","topic":"Performance Comparison","subcategory":"","sample_answers":["Preload fetches resources needed instantly, while prefetch prepares for later needs."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00Z',
          '2025-10-10T00:00:00Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '916f3c13-6a50-4539-8027-dde238560a69',
          'Webpack Preload Magic Comment',
          'What does adding `/* webpackPreload: true */` to a dynamic import do?',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"It bundles the module into the main chunk","isCorrect":false,"explanation":""},{"id":"b","text":"It adds a `<link rel=''preload''>` tag for that chunk","isCorrect":true,"explanation":""},{"id":"c","text":"It delays loading of the module until user interaction","isCorrect":false,"explanation":""}]',
          NULL,
          'The magic comment tells Webpack to emit a preload link for that resource, so the browser fetches it immediately.',
          NULL,
          [],
          '["performance-patterns","webpack-optimization",null]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-pre-load-3","original_type":"multiple-choice","topic":"Webpack Optimization","subcategory":"","sample_answers":["It signals Webpack to preload that module so it’s available on initial render."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00Z',
          '2025-10-10T00:00:00Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '633de42c-275f-4fe4-b690-e348dc4edce5',
          'Trade-offs of Using Preload',
          'What is a potential downside of preloading too many resources?',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"It can delay critical rendering paths like CSS and hero images","isCorrect":true,"explanation":""},{"id":"b","text":"It causes the browser to ignore other preload hints","isCorrect":false,"explanation":""},{"id":"c","text":"It disables the browser cache for those resources","isCorrect":false,"explanation":""}]',
          NULL,
          'Preloading too many assets can block more important ones, increasing First Contentful Paint time.',
          NULL,
          [],
          '["performance-patterns","performance-trade-offs",null]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-pre-load-4","original_type":"multiple-choice","topic":"Performance Trade-offs","subcategory":"","sample_answers":["Too many preloads can block essential resources and harm performance."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00Z',
          '2025-10-10T00:00:00Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '0b7b8864-9d50-48ad-bb5e-4e1e5ff3d6a0',
          'Preload in Single-Page Applications',
          'In SPAs, when is preloading most useful?',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Preloading helps ensure components needed immediately after page load are ready without waiting for network fetches.',
          NULL,
          [],
          '["performance-patterns","spa-optimization",null]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-pre-load-5","original_type":"open-ended","topic":"SPA Optimization","subcategory":"","sample_answers":["When a component or font must be available instantly on the first render."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00Z',
          '2025-10-10T00:00:00Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'a8dea0b3-c912-4a33-b62e-4b789ca527a5',
          'Preload + Async Hack',
          'What is the goal of combining `<link rel=''preload''>` with `<script async>`?',
          'multiple-choice',
          'advanced',
          10,
          '[{"id":"a","text":"To load a script early without blocking the HTML parser","isCorrect":true,"explanation":""},{"id":"b","text":"To execute the script synchronously","isCorrect":false,"explanation":""},{"id":"c","text":"To delay the script until the user interacts","isCorrect":false,"explanation":""}]',
          NULL,
          'This technique downloads the script as a high-priority resource but doesn’t block parsing while it loads.',
          NULL,
          [],
          ARRAY['performance-patterns','script-optimization','advanced']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-pre-load-6","original_type":"multiple-choice","topic":"Script Optimization","subcategory":"","sample_answers":["It lets browsers fetch scripts early without blocking page rendering."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00Z',
          '2025-10-10T00:00:00Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '5190700c-b7dd-4c1f-80f4-e2fa2af0e57c',
          'Preload in Chrome 95+',
          'How did Chrome 95+ improve the safety of using preload?',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Chrome 95+ fixed queue-jumping behavior, making preload order more predictable relative to other resources.',
          NULL,
          [],
          '["performance-patterns","browser-optimization",null]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-pre-load-7","original_type":"open-ended","topic":"Browser Optimization","subcategory":"","sample_answers":["It made preload ordering more consistent and less likely to block critical resources."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00Z',
          '2025-10-10T00:00:00Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'b5f3311b-ebd6-41b8-a49a-f91c2801a984',
          'Best Practices for Using Preload',
          'Which of the following is a recommended best practice when using preload?',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Use preload sparingly and measure its impact in production","isCorrect":true,"explanation":""},{"id":"b","text":"Preload all JavaScript files to reduce bundle size","isCorrect":false,"explanation":""},{"id":"c","text":"Always preload images before any CSS files","isCorrect":false,"explanation":""}]',
          NULL,
          'Preload should only be used for critical resources and its performance impact should be measured carefully.',
          NULL,
          [],
          '["performance-patterns","optimization-guidelines",null]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-pre-load-8","original_type":"multiple-choice","topic":"Optimization Guidelines","subcategory":"","sample_answers":["Use preload only for critical assets and monitor performance impact."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00Z',
          '2025-10-10T00:00:00Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '78d35a2e-dbf9-414f-a26b-f502c87c440c',
          'Understanding Prefetch in Web Performance',
          'What is the purpose of using `<link rel="prefetch">` in web applications?',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"To load resources that may be needed in the future","isCorrect":true,"explanation":""},{"id":"b","text":"To defer resource loading until the user interacts","isCorrect":false,"explanation":""},{"id":"c","text":"To immediately execute a script when the page loads","isCorrect":false,"explanation":""}]',
          NULL,
          'Prefetch allows browsers to fetch resources that may be needed later, improving responsiveness for upcoming interactions.',
          NULL,
          [],
          ARRAY['performance-patterns','prefetch-optimization','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-prefetch-1","original_type":"multiple-choice","topic":"Prefetch Optimization","subcategory":"","sample_answers":["Prefetch helps reduce perceived latency by loading resources before they are needed."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00Z',
          '2025-10-10T00:00:00Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'f2154ef3-9f8e-4576-94b4-8d757c035978',
          'Prefetch vs Lazy Loading',
          'How does prefetch differ from lazy loading when optimizing resources?',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Prefetch loads resources before they are needed (proactively), while lazy loading loads them only when required (reactively).',
          NULL,
          [],
          '["performance-patterns","prefetch-optimization",null]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-prefetch-2","original_type":"open-ended","topic":"Prefetch Optimization","subcategory":"","sample_answers":["Prefetching anticipates future needs; lazy loading reacts to user actions or visibility."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00Z',
          '2025-10-10T00:00:00Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '6a85dfee-6cfd-4abf-9dda-f7751f88d752',
          'Webpack Prefetch Magic Comment',
          'What is the purpose of adding the `/* webpackPrefetch: true */` comment to a dynamic import?',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"To bundle the file immediately into the main chunk","isCorrect":false,"explanation":""},{"id":"b","text":"To hint the browser to prefetch the resource during idle time","isCorrect":true,"explanation":""},{"id":"c","text":"To force lazy loading of the component","isCorrect":false,"explanation":""}]',
          NULL,
          'The magic comment tells Webpack to include a `<link rel=''prefetch''>` for the specified chunk, allowing the browser to load it in advance.',
          NULL,
          [],
          '["performance-patterns","webpack-optimization",null]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-prefetch-3","original_type":"multiple-choice","topic":"Webpack Optimization","subcategory":"","sample_answers":["It hints the browser to prefetch the module, improving perceived load time."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00Z',
          '2025-10-10T00:00:00Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'e731d002-40bf-49ce-82e1-f8a814123794',
          'Performance Benefit of Prefetch',
          'What happens when a prefetched module is requested by the user?',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"a","text":"It is fetched from cache instantly","isCorrect":true,"explanation":""},{"id":"b","text":"It triggers a network request","isCorrect":false,"explanation":""},{"id":"c","text":"It delays rendering until all resources are loaded","isCorrect":false,"explanation":""}]',
          NULL,
          'Prefetched resources are cached by the browser, allowing instant retrieval when the user requests them.',
          NULL,
          [],
          ARRAY['performance-patterns','prefetch-optimization','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-prefetch-4","original_type":"multiple-choice","topic":"Prefetch Optimization","subcategory":"","sample_answers":["The module loads from cache, minimizing wait time for the user."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00Z',
          '2025-10-10T00:00:00Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'aa17307b-28ca-4a1a-b938-cc7d29edc59b',
          'Prefetching Trade-offs',
          'Why should developers avoid excessive use of prefetching?',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'Overusing prefetch may waste bandwidth and slow down critical resource loading if prefetched assets are never used.',
          NULL,
          [],
          '["performance-patterns","performance-best-practices",null]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-prefetch-5","original_type":"open-ended","topic":"Performance Best Practices","subcategory":"","sample_answers":["Prefetching too many unused resources can waste network bandwidth and harm performance."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00Z',
          '2025-10-10T00:00:00Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '23f46805-ec34-4923-a136-a10670a3234d',
          'When to Prefetch',
          'Which is a good scenario to use prefetching in a web application?',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"For pages or components the user is likely to visit soon","isCorrect":true,"explanation":""},{"id":"b","text":"For every resource in the application","isCorrect":false,"explanation":""},{"id":"c","text":"Only for images in the viewport","isCorrect":false,"explanation":""}]',
          NULL,
          'Prefetching should be used for predictable user paths to balance performance and bandwidth usage.',
          NULL,
          [],
          '["performance-patterns","optimization-scenarios",null]',
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-prefetch-6","original_type":"multiple-choice","topic":"Optimization Scenarios","subcategory":"","sample_answers":["Prefetch resources users are likely to access next to improve perceived speed."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00Z',
          '2025-10-10T00:00:00Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '29787766-09da-48cd-988d-f610f0093ed3',
          'What is the PRPL Pattern?',
          '### PRPL Pattern
The **PRPL Pattern** is a web performance optimization strategy that focuses on making applications load and run efficiently, even on low-end devices or slow networks.

**PRPL** stands for:
- **P**: Push critical resources for the initial route.
- **R**: Render the initial route as soon as possible.
- **P**: Pre-cache assets for future routes.
- **L**: Lazy-load remaining routes and assets.

This approach improves load times, offline experience, and caching efficiency.

**Example:** Progressive Web Apps (PWAs) that use an app shell, service workers, and code-splitting to load only what’s needed.

**Pros:**
- Faster first render.
- Improved caching and offline usability.
- Reduced bandwidth usage.

**Cons:**
- Requires careful bundling and caching strategy.
- Over-pushing or preloading can waste bandwidth.',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'A web performance pattern that optimizes loading by pushing critical resources, rendering fast, pre-caching assets, and lazy-loading the rest.',
          NULL,
          [],
          ARRAY['performance-patterns','prpl-pattern','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-prpl-pp1","original_type":"open-ended","topic":"PRPL Pattern","subcategory":"","sample_answers":["A web performance pattern that optimizes loading by pushing critical resources, rendering fast, pre-caching assets, and lazy-loading the rest."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00.000Z',
          '2025-10-10T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '744ccd94-3691-4055-a492-f7e49b2d4d61',
          'What does each letter in the PRPL acronym stand for?',
          'Choose the correct expansion of PRPL.',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"o1","text":"Push, Render, Pre-cache, Lazy-load","isCorrect":true,"explanation":""},{"id":"o2","text":"Preload, Render, Pre-fetch, Load","isCorrect":false,"explanation":""},{"id":"o3","text":"Push, Render, Preload, Link","isCorrect":false,"explanation":""},{"id":"o4","text":"Prepare, Run, Pre-cache, Load","isCorrect":false,"explanation":""}]',
          NULL,
          'PRPL stands for Push critical resources, Render initial route, Pre-cache assets, and Lazy-load remaining routes.',
          NULL,
          [],
          ARRAY['performance-patterns','prpl-pattern','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-prpl-pp2","original_type":"multiple-choice","topic":"PRPL Pattern","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00.000Z',
          '2025-10-10T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '29a02659-33c7-458f-981d-4a0f0884f103',
          'True or False: The PRPL pattern focuses on optimizing the first route before loading any other resources.',
          'Evaluate the statement about PRPL’s optimization focus.',
          'true-false',
          'beginner',
          10,
          '[{"id":"true","text":"True","isCorrect":false},{"id":"false","text":"False","isCorrect":true}]',
          'false',
          'The correct answer is: True',
          NULL,
          [],
          ARRAY['performance-patterns','prpl-pattern','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-prpl-pp3","original_type":"true-false","topic":"PRPL Pattern","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00.000Z',
          '2025-10-10T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'd0ca6b6a-8c1c-49d4-af92-21b97ac73091',
          'Which of the following technologies does the PRPL pattern often rely on?',
          'Select all the technologies that typically support PRPL pattern implementation.',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"o1","text":"HTTP/2 Server Push","isCorrect":true,"explanation":""},{"id":"o2","text":"Service Workers","isCorrect":true,"explanation":""},{"id":"o3","text":"App Shell Architecture","isCorrect":true,"explanation":""},{"id":"o4","text":"jQuery AJAX for resource loading","isCorrect":false,"explanation":""}]',
          NULL,
          'PRPL commonly uses HTTP/2 server push, service workers for caching, and an app shell for faster rendering.',
          NULL,
          [],
          ARRAY['performance-patterns','prpl-pattern','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-prpl-pp4","original_type":"multiple-choice","topic":"PRPL Pattern","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00.000Z',
          '2025-10-10T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'bc22e89c-f4ec-4fd2-a9c2-5621ca021ed7',
          'Why is code-splitting important in the PRPL pattern?',
          '### Code-Splitting in PRPL
Code-splitting divides the application into smaller, cachable chunks. This helps browsers load only what''s necessary for the current route, improving performance and reducing cache bloat.',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'It ensures only the necessary parts of the app are loaded, improving performance and caching efficiency.',
          NULL,
          [],
          ARRAY['performance-patterns','prpl-pattern','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-prpl-pp5","original_type":"open-ended","topic":"PRPL Pattern","subcategory":"","sample_answers":["It ensures only the necessary parts of the app are loaded, improving performance and caching efficiency."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00.000Z',
          '2025-10-10T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '306a0a51-7885-415d-b10e-40f7a7c8e429',
          'Which step in PRPL involves caching frequently visited routes?',
          'Identify which phase of the PRPL process focuses on pre-caching routes for better offline performance.',
          'multiple-choice',
          'beginner',
          10,
          '[{"id":"o1","text":"Push","isCorrect":false,"explanation":""},{"id":"o2","text":"Render","isCorrect":false,"explanation":""},{"id":"o3","text":"Pre-cache","isCorrect":true,"explanation":""},{"id":"o4","text":"Lazy-load","isCorrect":false,"explanation":""}]',
          NULL,
          'Pre-caching ensures frequently visited routes and assets are stored for quick access and offline use.',
          NULL,
          [],
          ARRAY['performance-patterns','prpl-pattern','beginner']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-prpl-pp6","original_type":"multiple-choice","topic":"PRPL Pattern","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00.000Z',
          '2025-10-10T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '12be95d7-fe57-496a-a1a4-f9b9f1a0720a',
          'What is a potential drawback of pushing too many resources in PRPL?',
          'Select the correct consequence of over-pushing or over-preloading resources.',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"o1","text":"Improved caching performance","isCorrect":false,"explanation":""},{"id":"o2","text":"Wasted bandwidth and filled browser cache","isCorrect":true,"explanation":""},{"id":"o3","text":"Better offline support","isCorrect":false,"explanation":""},{"id":"o4","text":"Reduced initial load time","isCorrect":false,"explanation":""}]',
          NULL,
          'Pushing unnecessary files wastes bandwidth and fills the browser cache, reducing overall performance.',
          NULL,
          [],
          ARRAY['performance-patterns','prpl-pattern','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-prpl-pp7","original_type":"multiple-choice","topic":"PRPL Pattern","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00.000Z',
          '2025-10-10T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '194c027a-61d6-4da7-99a7-c0b1a9743ed7',
          'How does HTTP/2 improve performance for the PRPL pattern?',
          '### HTTP/2 and PRPL
HTTP/2 enables multiplexing — allowing multiple request/response streams over a single TCP connection. This reduces ''head-of-line'' blocking and speeds up resource delivery, which complements PRPL’s ''Push'' and ''Render'' steps.',
          'multiple-choice',
          'advanced',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'HTTP/2 allows multiple requests in one TCP connection, reducing latency and supporting PRPL’s goal of faster initial route rendering.',
          NULL,
          [],
          ARRAY['performance-patterns','prpl-pattern','advanced']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-prpl-pp8","original_type":"open-ended","topic":"PRPL Pattern","subcategory":"","sample_answers":["HTTP/2 allows multiple requests in one TCP connection, reducing latency and supporting PRPL’s goal of faster initial route rendering."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00.000Z',
          '2025-10-10T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          'cb8b633e-6639-4a8a-8849-1d733ec2dc52',
          'What role does the App Shell play in the PRPL pattern?',
          'Identify how the App Shell architecture supports the PRPL pattern.',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"o1","text":"Provides a minimal structure that loads instantly and handles routing","isCorrect":true,"explanation":""},{"id":"o2","text":"Delays rendering until all assets are fetched","isCorrect":false,"explanation":""},{"id":"o3","text":"Caches server responses in memory only","isCorrect":false,"explanation":""},{"id":"o4","text":"Forces the app to reload on each navigation","isCorrect":false,"explanation":""}]',
          NULL,
          'The App Shell delivers the minimal UI structure immediately, allowing PRPL to render the first route quickly and cache other assets later.',
          NULL,
          [],
          ARRAY['performance-patterns','prpl-pattern','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-prpl-pp9","original_type":"multiple-choice","topic":"PRPL Pattern","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00.000Z',
          '2025-10-10T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '74ccd104-acb8-4668-b725-82930c144692',
          'True or False: Service Workers are essential to implement the ''Pre-cache'' and ''Lazy-load'' steps of PRPL.',
          'Assess whether Service Workers are necessary for caching and lazy loading in PRPL.',
          'true-false',
          'intermediate',
          10,
          '[{"id":"true","text":"True","isCorrect":false},{"id":"false","text":"False","isCorrect":true}]',
          'false',
          'The correct answer is: True',
          NULL,
          [],
          ARRAY['performance-patterns','prpl-pattern','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-prpl-pp10","original_type":"true-false","topic":"PRPL Pattern","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00.000Z',
          '2025-10-10T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '69dcfe9d-c6ab-4099-b935-39392f9b1c21',
          'What happens if we preload too many resources in the PRPL pattern?',
          '### Over-Preloading
Preloading too many assets increases competition for bandwidth, delaying critical resources like CSS or hero images and worsening Core Web Vitals such as Largest Contentful Paint (LCP).',
          'multiple-choice',
          'advanced',
          10,
          '[{"id":"a","text":"Option A","isCorrect":false},{"id":"b","text":"Option B","isCorrect":false},{"id":"c","text":"Option C","isCorrect":true},{"id":"d","text":"Option D","isCorrect":false}]',
          'c',
          'It can delay critical rendering assets like CSS and images, worsening user-perceived performance metrics.',
          NULL,
          [],
          ARRAY['performance-patterns','prpl-pattern','advanced']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-prpl-pp11","original_type":"open-ended","topic":"PRPL Pattern","subcategory":"","sample_answers":["It can delay critical rendering assets like CSS and images, worsening user-perceived performance metrics."],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00.000Z',
          '2025-10-10T00:00:00.000Z'
        );

INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
          '50d95791-aa7c-4252-823c-ae9d859bfc71',
          'Which PRPL step directly improves the Time to Interactive (TTI) metric?',
          'Select which part of the PRPL process helps achieve a faster TTI.',
          'multiple-choice',
          'intermediate',
          10,
          '[{"id":"o1","text":"Render initial route quickly","isCorrect":true,"explanation":""},{"id":"o2","text":"Pre-cache assets in background","isCorrect":false,"explanation":""},{"id":"o3","text":"Lazy-load unused modules","isCorrect":false,"explanation":""},{"id":"o4","text":"Push critical resources after render","isCorrect":false,"explanation":""}]',
          NULL,
          'Rendering the initial route early reduces the time before a user can interact, improving TTI.',
          NULL,
          [],
          ARRAY['performance-patterns','prpl-pattern','intermediate']::text[],
          '{"views":0,"attempts":0,"correct_attempts":0,"average_time":0}',
          '{"original_id":"performance-patterns-prpl-pp12","original_type":"multiple-choice","topic":"PRPL Pattern","subcategory":"","sample_answers":[],"time_limit":120,"related_links":[],"created_by":"admin","updated_by":"admin","technology":"Performance"}',
          'db86beef-f5b8-4ffc-93b5-6ba95a360f58',
          true,
          '2025-10-10T00:00:00.000Z',
          '2025-10-10T00:00:00.000Z'
        );;