const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Sample frontend tasks based on Elzatona-web-ui Firebase data
const frontendTasks = [
  {
    title: 'Social Media Dashboard',
    description:
      'Build a comprehensive social media dashboard with user profiles, posts, comments, and real-time updates. Include features like following/unfollowing users, creating posts, and viewing activity feeds.',
    difficulty: 'hard',
    category: 'React',
    estimated_time: 180,
    author: 'Elzatona Team',
    company: 'Elzatona',
    requirements:
      'Create a full-stack social media dashboard with React frontend, user authentication, real-time updates, and responsive design. Include features for user profiles, posts, comments, likes, and following system.',
    hints: [
      'Use React hooks for state management',
      'Implement real-time updates with WebSockets or polling',
      'Create reusable components for posts and user profiles',
      'Use Context API or Redux for global state',
      'Implement proper error handling and loading states',
    ],
    solution: '// Complete solution will be provided after implementation',
    starter_code: `import React, { useState, useEffect } from 'react';

const SocialMediaDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Your implementation here

  return (
    <div className="dashboard">
      <h1>Social Media Dashboard</h1>
      {/* Your components here */}
    </div>
  );
};

export default SocialMediaDashboard;`,
    files: JSON.stringify([
      {
        id: '1',
        name: 'SocialMediaDashboard.tsx',
        type: 'tsx',
        content: '// Main dashboard component',
        isEntryPoint: true,
      },
      {
        id: '2',
        name: 'Post.tsx',
        type: 'tsx',
        content: '// Post component',
        isEntryPoint: false,
      },
      {
        id: '3',
        name: 'UserProfile.tsx',
        type: 'tsx',
        content: '// User profile component',
        isEntryPoint: false,
      },
    ]),
    test_cases: JSON.stringify([
      {
        id: '1',
        description: 'Should render dashboard with posts',
        input: {},
        expectedOutput: 'Dashboard with posts visible',
        type: 'component',
      },
      {
        id: '2',
        description: 'Should allow creating new posts',
        input: { postText: 'Hello World' },
        expectedOutput: 'New post created and visible',
        type: 'component',
      },
    ]),
    tags: ['react', 'dashboard', 'social-media', 'real-time', 'authentication'],
  },
  {
    title: 'Netflix-style Video Streaming App',
    description:
      'Create a video streaming application similar to Netflix with video player, recommendations, user profiles, and watchlist functionality.',
    difficulty: 'hard',
    category: 'React',
    estimated_time: 240,
    author: 'Elzatona Team',
    company: 'Elzatona',
    requirements:
      'Build a video streaming app with video player controls, movie/show browsing, recommendations based on viewing history, user profiles, and watchlist management.',
    hints: [
      'Use video.js or custom video player',
      'Implement lazy loading for video thumbnails',
      'Create smooth scrolling carousels',
      'Use local storage for watchlist',
      'Implement search and filtering',
    ],
    solution: '// Complete solution will be provided after implementation',
    starter_code: `import React, { useState, useEffect } from 'react';
import VideoPlayer from './components/VideoPlayer';

const NetflixClone = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [watchlist, setWatchlist] = useState([]);

  // Your implementation here

  return (
    <div className="netflix-clone">
      <header className="header">
        {/* Navigation and search */}
      </header>
      <main className="main-content">
        {/* Movie carousels and video player */}
      </main>
    </div>
  );
};

export default NetflixClone;`,
    files: JSON.stringify([
      {
        id: '1',
        name: 'NetflixClone.tsx',
        type: 'tsx',
        content: '// Main app component',
        isEntryPoint: true,
      },
      {
        id: '2',
        name: 'VideoPlayer.tsx',
        type: 'tsx',
        content: '// Video player component',
        isEntryPoint: false,
      },
      {
        id: '3',
        name: 'MovieCard.tsx',
        type: 'tsx',
        content: '// Movie card component',
        isEntryPoint: false,
      },
    ]),
    test_cases: JSON.stringify([
      {
        id: '1',
        description: 'Should play video when movie is selected',
        input: { movieId: '123' },
        expectedOutput: 'Video player starts playing',
        type: 'component',
      },
      {
        id: '2',
        description: 'Should add movie to watchlist',
        input: { movieId: '123' },
        expectedOutput: 'Movie added to watchlist',
        type: 'component',
      },
    ]),
    tags: [
      'react',
      'video',
      'streaming',
      'netflix',
      'player',
      'recommendations',
    ],
  },
  {
    title: 'Spotify Clone with Audio Player',
    description:
      'Build a music streaming application with audio player controls, playlist management, search functionality, and user authentication.',
    difficulty: 'hard',
    category: 'React',
    estimated_time: 200,
    author: 'Elzatona Team',
    company: 'Elzatona',
    requirements:
      'Create a music streaming app with audio player, playlist creation/management, music search, user authentication, and responsive design.',
    hints: [
      'Use Web Audio API for audio playback',
      'Implement playlist drag-and-drop functionality',
      'Create custom audio controls',
      'Use Context API for music state management',
      'Implement keyboard shortcuts for playback',
    ],
    solution: '// Complete solution will be provided after implementation',
    starter_code: `import React, { useState, useEffect } from 'react';
import AudioPlayer from './components/AudioPlayer';

const SpotifyClone = () => {
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Your implementation here

  return (
    <div className="spotify-clone">
      <aside className="sidebar">
        {/* Playlists and navigation */}
      </aside>
      <main className="main-content">
        {/* Song list and search */}
      </main>
      <footer className="player-footer">
        {/* Audio player controls */}
      </footer>
    </div>
  );
};

export default SpotifyClone;`,
    files: JSON.stringify([
      {
        id: '1',
        name: 'SpotifyClone.tsx',
        type: 'tsx',
        content: '// Main app component',
        isEntryPoint: true,
      },
      {
        id: '2',
        name: 'AudioPlayer.tsx',
        type: 'tsx',
        content: '// Audio player component',
        isEntryPoint: false,
      },
      {
        id: '3',
        name: 'Playlist.tsx',
        type: 'tsx',
        content: '// Playlist component',
        isEntryPoint: false,
      },
    ]),
    test_cases: JSON.stringify([
      {
        id: '1',
        description: 'Should play selected song',
        input: { songId: '123' },
        expectedOutput: 'Song starts playing',
        type: 'component',
      },
      {
        id: '2',
        description: 'Should create new playlist',
        input: { playlistName: 'My Playlist' },
        expectedOutput: 'New playlist created',
        type: 'component',
      },
    ]),
    tags: ['react', 'audio', 'music', 'spotify', 'playlist', 'player'],
  },
  {
    title: 'Drag and Drop Kanban Board',
    description:
      'Create a Kanban board application with drag-and-drop functionality for task management, including columns, cards, and user assignments.',
    difficulty: 'medium',
    category: 'React',
    estimated_time: 120,
    author: 'Elzatona Team',
    company: 'Elzatona',
    requirements:
      'Build a Kanban board with drag-and-drop functionality, task creation/editing, column management, and user assignment features.',
    hints: [
      'Use react-beautiful-dnd or @dnd-kit for drag-and-drop',
      'Implement local state management with Context API',
      'Create reusable Card and Column components',
      'Add form validation for task creation',
      'Implement keyboard shortcuts for quick actions',
    ],
    solution: '// Complete solution will be provided after implementation',
    starter_code: `import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const KanbanBoard = () => {
  const [columns, setColumns] = useState([
    { id: 'todo', title: 'To Do', tasks: [] },
    { id: 'in-progress', title: 'In Progress', tasks: [] },
    { id: 'done', title: 'Done', tasks: [] }
  ]);

  // Your implementation here

  return (
    <div className="kanban-board">
      <DragDropContext onDragEnd={handleDragEnd}>
        {columns.map(column => (
          <div key={column.id} className="column">
            <h3>{column.title}</h3>
            {/* Task cards */}
          </div>
        ))}
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;`,
    files: JSON.stringify([
      {
        id: '1',
        name: 'KanbanBoard.tsx',
        type: 'tsx',
        content: '// Main board component',
        isEntryPoint: true,
      },
      {
        id: '2',
        name: 'TaskCard.tsx',
        type: 'tsx',
        content: '// Task card component',
        isEntryPoint: false,
      },
      {
        id: '3',
        name: 'Column.tsx',
        type: 'tsx',
        content: '// Column component',
        isEntryPoint: false,
      },
    ]),
    test_cases: JSON.stringify([
      {
        id: '1',
        description: 'Should move task between columns',
        input: { taskId: '123', fromColumn: 'todo', toColumn: 'in-progress' },
        expectedOutput: 'Task moved to new column',
        type: 'component',
      },
      {
        id: '2',
        description: 'Should create new task',
        input: { title: 'New Task', description: 'Task description' },
        expectedOutput: 'New task created',
        type: 'component',
      },
    ]),
    tags: ['react', 'kanban', 'drag-drop', 'task-management', 'productivity'],
  },
  {
    title: 'Product Catalog with E-commerce Features',
    description:
      'Build an e-commerce product catalog with shopping cart, wishlist, product filtering, and checkout functionality.',
    difficulty: 'medium',
    category: 'React',
    estimated_time: 150,
    author: 'Elzatona Team',
    company: 'Elzatona',
    requirements:
      'Create an e-commerce product catalog with product listing, filtering, search, shopping cart, wishlist, and basic checkout flow.',
    hints: [
      'Use React Context for cart state management',
      'Implement product filtering and search',
      'Create responsive product grid layout',
      'Add form validation for checkout',
      'Use local storage for cart persistence',
    ],
    solution: '// Complete solution will be provided after implementation',
    starter_code: `import React, { useState, useContext } from 'react';
import { CartContext } from './context/CartContext';

const ProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [filters, setFilters] = useState({});

  // Your implementation here

  return (
    <div className="product-catalog">
      <header className="header">
        {/* Search and filters */}
      </header>
      <main className="main-content">
        {/* Product grid */}
      </main>
      <aside className="cart-sidebar">
        {/* Shopping cart */}
      </aside>
    </div>
  );
};

export default ProductCatalog;`,
    files: JSON.stringify([
      {
        id: '1',
        name: 'ProductCatalog.tsx',
        type: 'tsx',
        content: '// Main catalog component',
        isEntryPoint: true,
      },
      {
        id: '2',
        name: 'ProductCard.tsx',
        type: 'tsx',
        content: '// Product card component',
        isEntryPoint: false,
      },
      {
        id: '3',
        name: 'ShoppingCart.tsx',
        type: 'tsx',
        content: '// Shopping cart component',
        isEntryPoint: false,
      },
    ]),
    test_cases: JSON.stringify([
      {
        id: '1',
        description: 'Should add product to cart',
        input: { productId: '123', quantity: 2 },
        expectedOutput: 'Product added to cart',
        type: 'component',
      },
      {
        id: '2',
        description: 'Should filter products by category',
        input: { category: 'electronics' },
        expectedOutput: 'Only electronics products shown',
        type: 'component',
      },
    ]),
    tags: ['react', 'ecommerce', 'catalog', 'shopping-cart', 'filtering'],
  },
  {
    title: 'Portfolio Website with CMS',
    description:
      'Create a personal portfolio website with a content management system for managing projects, blog posts, and personal information.',
    difficulty: 'medium',
    category: 'React',
    estimated_time: 100,
    author: 'Elzatona Team',
    company: 'Elzatona',
    requirements:
      'Build a portfolio website with project showcase, blog section, contact form, and admin panel for content management.',
    hints: [
      'Use React Router for navigation',
      'Implement markdown support for blog posts',
      'Create responsive design with mobile-first approach',
      'Add dark/light theme toggle',
      'Use local storage for theme persistence',
    ],
    solution: '// Complete solution will be provided after implementation',
    starter_code: `import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const PortfolioWebsite = () => {
  const [theme, setTheme] = useState('light');
  const [projects, setProjects] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);

  // Your implementation here

  return (
    <Router>
      <div className={\`portfolio \${theme}\`}>
        <nav className="navigation">
          {/* Navigation menu */}
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
};

export default PortfolioWebsite;`,
    files: JSON.stringify([
      {
        id: '1',
        name: 'PortfolioWebsite.tsx',
        type: 'tsx',
        content: '// Main portfolio component',
        isEntryPoint: true,
      },
      {
        id: '2',
        name: 'ProjectCard.tsx',
        type: 'tsx',
        content: '// Project card component',
        isEntryPoint: false,
      },
      {
        id: '3',
        name: 'BlogPost.tsx',
        type: 'tsx',
        content: '// Blog post component',
        isEntryPoint: false,
      },
    ]),
    test_cases: JSON.stringify([
      {
        id: '1',
        description: 'Should toggle theme between light and dark',
        input: { theme: 'dark' },
        expectedOutput: 'Theme changed to dark mode',
        type: 'component',
      },
      {
        id: '2',
        description: 'Should display project details',
        input: { projectId: '123' },
        expectedOutput: 'Project details shown',
        type: 'component',
      },
    ]),
    tags: ['react', 'portfolio', 'cms', 'blog', 'responsive', 'theme'],
  },
  {
    title: 'Calculator App with Advanced Features',
    description:
      'Build a calculator application with basic arithmetic operations, scientific functions, history tracking, and keyboard support.',
    difficulty: 'easy',
    category: 'React',
    estimated_time: 60,
    author: 'Elzatona Team',
    company: 'Elzatona',
    requirements:
      'Create a calculator with basic operations (+, -, *, /), scientific functions, calculation history, and keyboard input support.',
    hints: [
      'Use useState for calculator state',
      'Implement proper operator precedence',
      'Add keyboard event listeners',
      'Create history storage with local storage',
      'Handle edge cases like division by zero',
    ],
    solution: '// Complete solution will be provided after implementation',
    starter_code: `import React, { useState, useEffect } from 'react';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  // Your implementation here

  return (
    <div className="calculator">
      <div className="display">{display}</div>
      <div className="buttons">
        {/* Calculator buttons */}
      </div>
    </div>
  );
};

export default Calculator;`,
    files: JSON.stringify([
      {
        id: '1',
        name: 'Calculator.tsx',
        type: 'tsx',
        content: '// Main calculator component',
        isEntryPoint: true,
      },
      {
        id: '2',
        name: 'Button.tsx',
        type: 'tsx',
        content: '// Calculator button component',
        isEntryPoint: false,
      },
      {
        id: '3',
        name: 'History.tsx',
        type: 'tsx',
        content: '// Calculation history component',
        isEntryPoint: false,
      },
    ]),
    test_cases: JSON.stringify([
      {
        id: '1',
        description: 'Should perform basic addition',
        input: { operation: '2 + 3' },
        expectedOutput: '5',
        type: 'function',
      },
      {
        id: '2',
        description: 'Should handle division by zero',
        input: { operation: '5 / 0' },
        expectedOutput: 'Error',
        type: 'function',
      },
    ]),
    tags: ['react', 'calculator', 'math', 'keyboard', 'history'],
  },
];

async function seedFrontendTasks() {
  console.log('🚀 Starting to seed frontend tasks...');

  try {
    // Insert frontend tasks
    const { data, error } = await supabase
      .from('frontend_tasks')
      .insert(frontendTasks);

    if (error) {
      console.error('❌ Error seeding frontend tasks:', error);
      return;
    }

    console.log(
      `✅ Successfully seeded ${frontendTasks.length} frontend tasks!`
    );

    // Verify the data was inserted
    const { data: insertedTasks, error: fetchError } = await supabase
      .from('frontend_tasks')
      .select('id, title, category, difficulty')
      .eq('is_active', true);

    if (fetchError) {
      console.error('❌ Error fetching inserted tasks:', fetchError);
      return;
    }

    console.log('📊 Inserted tasks summary:');
    console.table(insertedTasks);

    // Show category breakdown
    const categoryBreakdown = insertedTasks.reduce((acc, task) => {
      acc[task.category] = (acc[task.category] || 0) + 1;
      return acc;
    }, {});

    console.log('📈 Category breakdown:', categoryBreakdown);
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

// Run the seeding function
seedFrontendTasks();
