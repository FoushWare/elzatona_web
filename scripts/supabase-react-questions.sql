-- React Questions Seeding SQL
-- Execute this SQL in your Supabase SQL Editor after creating the questions table

-- ==============================================
-- STEP 1: CREATE QUESTIONS TABLE (if not exists)
-- ==============================================

CREATE TABLE IF NOT EXISTS questions (
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  content TEXT NOT NULL,
  type VARCHAR(50) CHECK (type IN ('open-ended', 'multiple-choice', 'true-false', 'code-completion', 'debugging')),
  category VARCHAR(100),
  subcategory VARCHAR(100),
  topic VARCHAR(100),
  difficulty VARCHAR(20) CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  learning_card_id VARCHAR(50),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by VARCHAR(100) DEFAULT 'system',
  updated_by VARCHAR(100) DEFAULT 'system',
  tags TEXT[],
  explanation TEXT,
  points INTEGER DEFAULT 1,
  time_limit INTEGER DEFAULT 120,
  sample_answers TEXT[],
  options JSONB,
  correct_answer TEXT,
  hints TEXT[],
  related_links TEXT[]
);

-- Enable RLS
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY IF NOT EXISTS "Service role can manage questions" ON questions FOR ALL USING (
  auth.role() = 'service_role'
);

CREATE POLICY IF NOT EXISTS "Public can read questions" ON questions FOR SELECT USING (true);

-- ==============================================
-- STEP 2: SAMPLE REACT QUESTIONS INSERTION
-- ==============================================

-- Clear existing questions
DELETE FROM questions WHERE category = 'React';

-- Insert sample React questions
INSERT INTO questions (
  id, title, content, type, category, subcategory, topic, difficulty, 
  learning_card_id, is_active, created_by, updated_by, tags, explanation, 
  points, time_limit, sample_answers
) VALUES 
(
  'react-q-001',
  'What is React?',
  'React (aka React.js or ReactJS) is an **open-source front-end JavaScript library** for building user interfaces based on components. It''s used for handling the view layer in web and mobile applications, and allows developers to create reusable UI components and manage the state of those components efficiently.

React was created by [Jordan Walke](https://github.com/jordwalke), a software engineer at Facebook (now Meta). It was first deployed on Facebook''s News Feed in 2011 and on Instagram in 2012. The library was open-sourced in May 2013 and has since become one of the most popular JavaScript libraries for building modern user interfaces.',
  'open-ended',
  'React',
  'Fundamentals',
  'React Basics',
  'beginner',
  'card-frameworks',
  true,
  'system',
  'system',
  ARRAY['react', 'library', 'ui', 'components', 'frontend'],
  'React is a declarative, efficient, and flexible JavaScript library for building user interfaces using a component-based architecture.',
  2,
  120,
  ARRAY[
    'React is a JavaScript library for building user interfaces by composing reusable components.',
    'React is an open-source front-end library maintained by Meta for creating interactive UIs with a virtual DOM and unidirectional data flow.'
  ]
),
(
  'react-q-002',
  'What is the children prop?',
  'The `children` prop is a special prop in React used to pass elements between the opening and closing tags of a component. It is commonly used in layout and wrapper components.

A simple usage of children prop looks as below,
```jsx harmony
function MyDiv({ children }){
    return (
      <div>
        {children}
      </div>;
    );
}
export default function Greeting() {
  return (
    <MyDiv>
      <span>{"Hello"}</span>
      <span>{"World"}</span>
    </MyDiv>
  );
}
```
Here, everything inside `<MyDiv>...</MyDiv>` is passed as children to the custom div component.
The children can be text, JSX elements, fragments, arrays and functions(for advance use case like render props).',
  'multiple-choice',
  'React',
  'Props',
  'Props',
  'beginner',
  'card-frameworks',
  true,
  'system',
  'system',
  ARRAY['react', 'children', 'props', 'composition'],
  'The `children` prop allows components to wrap other elements, enabling flexible and reusable layout components like modals, cards, or containers.',
  2,
  120,
  ARRAY[
    'It allows components to receive and render nested content between their tags',
    'The children prop enables component composition and flexible layouts'
  ]
),
(
  'react-q-003',
  'What is JSX?',
  'JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files. It stands for "JavaScript XML" and is used with React to describe what the UI should look like.

JSX makes it easier to write and maintain React components by allowing you to use familiar HTML syntax while still having the full power of JavaScript.',
  'open-ended',
  'React',
  'Fundamentals',
  'JSX',
  'beginner',
  'card-frameworks',
  true,
  'system',
  'system',
  ARRAY['react', 'jsx', 'syntax', 'html', 'javascript'],
  'JSX is a syntax extension that lets you write HTML-like code in JavaScript, making React components more readable and maintainable.',
  2,
  120,
  ARRAY[
    'JSX is a syntax extension for JavaScript that allows writing HTML-like code in React components',
    'JSX stands for JavaScript XML and provides a more intuitive way to describe UI structure'
  ]
),
(
  'react-q-004',
  'What is the Virtual DOM?',
  'The Virtual DOM is a programming concept where an ideal, or "virtual", representation of a UI is kept in memory and synced with the "real" DOM by a library such as ReactDOM. This process is called reconciliation.

The Virtual DOM provides several benefits:
- **Performance**: Changes to the Virtual DOM are faster than direct DOM manipulation
- **Efficiency**: React can batch multiple updates and only update the parts of the DOM that actually changed
- **Predictability**: The Virtual DOM makes it easier to reason about how your UI will look at any given time',
  'open-ended',
  'React',
  'Core Concepts',
  'Virtual DOM',
  'intermediate',
  'card-frameworks',
  true,
  'system',
  'system',
  ARRAY['react', 'virtual-dom', 'performance', 'reconciliation'],
  'The Virtual DOM is React''s in-memory representation of the actual DOM, enabling efficient updates and better performance through reconciliation.',
  3,
  180,
  ARRAY[
    'Virtual DOM is an in-memory representation of the real DOM that React uses for efficient updates',
    'It allows React to batch changes and only update the parts of the DOM that actually changed'
  ]
),
(
  'react-q-005',
  'What are React Hooks?',
  'React Hooks are functions that let you use state and other React features in functional components. They were introduced in React 16.8 and allow you to write functional components with state and lifecycle methods.

Common hooks include:
- `useState`: For managing component state
- `useEffect`: For side effects and lifecycle methods
- `useContext`: For consuming context
- `useReducer`: For complex state management
- Custom hooks: For sharing stateful logic between components',
  'open-ended',
  'React',
  'Hooks',
  'Hooks',
  'intermediate',
  'card-frameworks',
  true,
  'system',
  'system',
  ARRAY['react', 'hooks', 'functional-components', 'state'],
  'React Hooks are functions that enable functional components to use state and other React features, making them more powerful and reusable.',
  3,
  180,
  ARRAY[
    'Hooks are functions that let you use state and lifecycle features in functional components',
    'They provide a way to reuse stateful logic between components without changing component hierarchy'
  ]
);

-- ==============================================
-- STEP 3: VERIFICATION QUERIES
-- ==============================================

-- Check total questions count
SELECT 'Total Questions' as metric, COUNT(*) as count FROM questions;

-- Check questions by difficulty
SELECT difficulty, COUNT(*) as count 
FROM questions 
WHERE difficulty IS NOT NULL 
GROUP BY difficulty 
ORDER BY 
  CASE difficulty 
    WHEN 'beginner' THEN 1 
    WHEN 'intermediate' THEN 2 
    WHEN 'advanced' THEN 3 
  END;

-- Check questions by type
SELECT type, COUNT(*) as count 
FROM questions 
WHERE type IS NOT NULL 
GROUP BY type 
ORDER BY count DESC;

-- Check questions by topic
SELECT topic, COUNT(*) as count 
FROM questions 
WHERE topic IS NOT NULL 
GROUP BY topic 
ORDER BY count DESC;

-- Check questions by category
SELECT category, COUNT(*) as count 
FROM questions 
WHERE category IS NOT NULL 
GROUP BY category 
ORDER BY count DESC;

-- Sample questions with details
SELECT 
  id,
  title,
  difficulty,
  topic,
  points,
  time_limit,
  array_length(tags, 1) as tag_count
FROM questions 
ORDER BY created_at 
LIMIT 10;


