import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y',
  authDomain: 'fir-demo-project-adffb.firebaseapp.com',
  projectId: 'fir-demo-project-adffb',
  storageBucket: 'fir-demo-project-adffb.firebasestorage.app',
  messagingSenderId: '76366138630',
  appId: '1:76366138630:web:0f3381c2f5a62e0401e287',
  measurementId: 'G-XZ5VKFGG4Y',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const frontendTasks = [
  {
    title: 'Build a Social Media Dashboard',
    category: 'React',
    description:
      'Create a comprehensive social media analytics dashboard with real-time data visualization, user engagement metrics, and content performance tracking.',
    difficulty: 'Hard',
    estimatedTime: 180,
    author: 'Elzatona Team',
    company: 'Elzatona',
    requirements: `
      - Create a responsive dashboard layout with sidebar navigation
      - Implement real-time data updates using WebSocket or polling
      - Add interactive charts and graphs for analytics
      - Include user management and authentication
      - Add dark/light theme toggle
      - Implement data filtering and search functionality
      - Add export functionality for reports
      - Ensure mobile responsiveness
    `,
    hints: [
      'Use Chart.js or Recharts for data visualization',
      'Implement React Context for theme management',
      'Use React Router for navigation',
      'Consider using a state management library like Redux or Zustand',
      'Implement proper error boundaries',
      'Use React Query for data fetching and caching',
    ],
    solution: `
      // Key implementation points:
      // 1. Use React Context for global state management
      // 2. Implement custom hooks for data fetching
      // 3. Use React.memo for performance optimization
      // 4. Implement proper loading and error states
      // 5. Use CSS Grid and Flexbox for responsive layout
    `,
    starterCode: {
      'App.tsx': `import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Users from './pages/Users';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="app">
            <Sidebar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/users" element={<Users />} />
              </Routes>
            </main>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;`,
      'components/Sidebar.tsx': `import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/analytics', label: 'Analytics', icon: '📈' },
    { path: '/users', label: 'Users', icon: '👥' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Social Dashboard</h2>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={\`nav-item \${location.pathname === item.path ? 'active' : ''}\`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;`,
      'App.css': `/* Add your CSS styles here */
.app {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 250px;
  background: #2c3e50;
  color: white;
  padding: 20px;
}

.main-content {
  flex: 1;
  padding: 20px;
  background: #f8f9fa;
}`,
    },
  },
  {
    title: 'Create a Netflix-style Video Streaming App',
    category: 'React',
    description:
      'Build a video streaming platform with user authentication, video player, recommendations, and user profiles.',
    difficulty: 'Hard',
    estimatedTime: 240,
    author: 'Elzatona Team',
    company: 'Elzatona',
    requirements: `
      - Implement user authentication and registration
      - Create a video player with controls (play, pause, seek, volume)
      - Add video recommendations based on viewing history
      - Implement user profiles and watchlists
      - Add search functionality with filters
      - Create responsive design for mobile and desktop
      - Implement video streaming with different quality options
      - Add social features like ratings and reviews
    `,
    hints: [
      'Use React Player or Video.js for video playback',
      'Implement JWT authentication for user sessions',
      'Use React Query for data fetching and caching',
      'Implement infinite scroll for video lists',
      'Use CSS Grid for responsive layout',
      'Consider using a video streaming service like AWS CloudFront',
    ],
    solution: `
      // Key implementation points:
      // 1. Use React Context for user authentication state
      // 2. Implement custom video player component
      // 3. Use React Query for API data management
      // 4. Implement proper error handling and loading states
      // 5. Use React Router for navigation
    `,
    starterCode: {
      'App.tsx': `import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import Profile from './pages/Profile';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="app">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movie/:id" element={<MovieDetail />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;`,
      'components/VideoPlayer.tsx': `import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import './VideoPlayer.css';

interface VideoPlayerProps {
  url: string;
  title: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, title }) => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [played, setPlayed] = useState(0);
  const playerRef = useRef<ReactPlayer>(null);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleSeek = (seekTo: number) => {
    playerRef.current?.seekTo(seekTo);
  };

  return (
    <div className="video-player">
      <div className="video-container">
        <ReactPlayer
          ref={playerRef}
          url={url}
          playing={playing}
          volume={volume}
          onProgress={({ played }) => setPlayed(played)}
          width="100%"
          height="100%"
        />
      </div>
      <div className="video-controls">
        <button onClick={handlePlayPause}>
          {playing ? '⏸️' : '▶️'}
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={played}
          onChange={(e) => handleSeek(parseFloat(e.target.value))}
        />
        <input
          type="range"
          min={0}
          max={1}
          step={0.1}
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;`,
    },
  },
  {
    title: 'Build a Spotify Clone with Audio Player',
    category: 'React',
    description:
      'Create a music streaming application with playlist management, audio playback, and user preferences.',
    difficulty: 'Hard',
    estimatedTime: 200,
    author: 'Elzatona Team',
    company: 'Elzatona',
    requirements: `
      - Implement audio player with play/pause, skip, shuffle, repeat
      - Create playlist management (create, edit, delete playlists)
      - Add music library with search and filtering
      - Implement user authentication and profiles
      - Add music recommendations based on listening history
      - Create responsive design for mobile and desktop
      - Implement audio visualization and equalizer
      - Add social features like sharing playlists
    `,
    hints: [
      'Use Web Audio API for audio visualization',
      'Implement custom audio player with HTML5 audio',
      'Use React Context for global audio state',
      'Implement drag-and-drop for playlist management',
      'Use localStorage for offline playlist storage',
      'Consider using a music API like Spotify Web API',
    ],
    solution: `
      // Key implementation points:
      // 1. Use Web Audio API for audio analysis and visualization
      // 2. Implement custom audio player component
      // 3. Use React Context for global audio state management
      // 4. Implement drag-and-drop for playlist management
      // 5. Use React Query for data fetching and caching
    `,
    starterCode: {
      'App.tsx': `import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AudioProvider } from './contexts/AudioContext';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Playlist from './pages/Playlist';
import Search from './pages/Search';
import AudioPlayer from './components/AudioPlayer';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <AudioProvider>
        <Router>
          <div className="app">
            <Header />
            <div className="main-layout">
              <Sidebar />
              <main className="content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/playlist/:id" element={<Playlist />} />
                  <Route path="/search" element={<Search />} />
                </Routes>
              </main>
            </div>
            <AudioPlayer />
          </div>
        </Router>
      </AudioProvider>
    </AuthProvider>
  );
}

export default App;`,
      'components/AudioPlayer.tsx': `import React, { useState, useRef, useEffect } from 'react';
import { useAudio } from '../contexts/AudioContext';
import './AudioPlayer.css';

const AudioPlayer = () => {
  const { currentTrack, isPlaying, togglePlay, nextTrack, previousTrack } = useAudio();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  if (!currentTrack) return null;

  return (
    <div className="audio-player">
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={nextTrack}
      />
      <div className="player-info">
        <img src={currentTrack.cover} alt={currentTrack.title} />
        <div className="track-info">
          <h4>{currentTrack.title}</h4>
          <p>{currentTrack.artist}</p>
        </div>
      </div>
      <div className="player-controls">
        <button onClick={previousTrack}>⏮️</button>
        <button onClick={togglePlay}>
          {isPlaying ? '⏸️' : '▶️'}
        </button>
        <button onClick={nextTrack}>⏭️</button>
      </div>
      <div className="player-progress">
        <span>{Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, '0')}</span>
        <input
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          onChange={handleSeek}
        />
        <span>{Math.floor(duration / 60)}:{Math.floor(duration % 60).toString().padStart(2, '0')}</span>
      </div>
    </div>
  );
};

export default AudioPlayer;`,
    },
  },
  {
    title: 'Create a Drag and Drop Kanban Board',
    category: 'React',
    description:
      'Build a Trello-like project management board with drag-and-drop functionality, task management, and team collaboration features.',
    difficulty: 'Medium',
    estimatedTime: 120,
    author: 'Elzatona Team',
    company: 'Elzatona',
    requirements: `
      - Implement drag-and-drop functionality for cards and lists
      - Create task management (add, edit, delete, assign tasks)
      - Add user authentication and team management
      - Implement real-time collaboration features
      - Add task filtering and search functionality
      - Create responsive design for mobile and desktop
      - Implement task due dates and priority levels
      - Add file attachments and comments to tasks
    `,
    hints: [
      'Use react-beautiful-dnd for drag-and-drop functionality',
      'Implement WebSocket for real-time updates',
      'Use React Context for global state management',
      'Implement optimistic updates for better UX',
      'Use React Query for data synchronization',
      'Consider using a real-time database like Firebase',
    ],
    solution: `
      // Key implementation points:
      // 1. Use react-beautiful-dnd for smooth drag-and-drop
      // 2. Implement WebSocket for real-time collaboration
      // 3. Use React Context for global state management
      // 4. Implement optimistic updates for better performance
      // 5. Use React Query for data fetching and caching
    `,
    starterCode: {
      'App.tsx': `import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { BoardProvider } from './contexts/BoardContext';
import { AuthProvider } from './contexts/AuthContext';
import Board from './components/Board';
import Header from './components/Header';
import './App.css';

function App() {
  const handleDragEnd = (result: any) => {
    // Handle drag end logic
    console.log('Drag ended:', result);
  };

  return (
    <AuthProvider>
      <BoardProvider>
        <div className="app">
          <Header />
          <DragDropContext onDragEnd={handleDragEnd}>
            <Board />
          </DragDropContext>
        </div>
      </BoardProvider>
    </AuthProvider>
  );
}

export default App;`,
      'components/Board.tsx': `import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Column from './Column';
import { useBoard } from '../contexts/BoardContext';
import './Board.css';

const Board = () => {
  const { columns } = useBoard();

  return (
    <div className="board">
      {columns.map((column) => (
        <Column key={column.id} column={column} />
      ))}
    </div>
  );
};

export default Board;`,
      'components/Column.tsx': `import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import AddTask from './AddTask';
import './Column.css';

interface ColumnProps {
  column: {
    id: string;
    title: string;
    tasks: Array<{
      id: string;
      title: string;
      description: string;
      assignee: string;
      dueDate: string;
      priority: 'low' | 'medium' | 'high';
    }>;
  };
}

const Column: React.FC<ColumnProps> = ({ column }) => {
  return (
    <div className="column">
      <h3 className="column-title">{column.title}</h3>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={\`task-list \${snapshot.isDraggingOver ? 'dragging-over' : ''}\`}
          >
            {column.tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={\`task-card \${snapshot.isDragging ? 'dragging' : ''}\`}
                  >
                    <TaskCard task={task} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            <AddTask columnId={column.id} />
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;`,
    },
  },
  {
    title: 'Build a Product Catalog with E-commerce Features',
    category: 'React',
    description:
      'Create a comprehensive e-commerce product catalog with shopping cart, user reviews, and payment integration.',
    difficulty: 'Hard',
    estimatedTime: 180,
    author: 'Elzatona Team',
    company: 'Elzatona',
    requirements: `
      - Create product catalog with categories and filters
      - Implement shopping cart functionality
      - Add user authentication and profiles
      - Implement product search and recommendations
      - Add product reviews and ratings system
      - Create responsive design for mobile and desktop
      - Implement payment processing (Stripe integration)
      - Add order management and tracking
    `,
    hints: [
      'Use React Context for cart state management',
      'Implement Stripe for payment processing',
      'Use React Query for product data fetching',
      'Implement infinite scroll for product lists',
      'Use React Router for navigation',
      'Consider using a headless CMS for product management',
    ],
    solution: `
      // Key implementation points:
      // 1. Use React Context for cart and user state management
      // 2. Implement Stripe Elements for secure payments
      // 3. Use React Query for data fetching and caching
      // 4. Implement proper error handling and loading states
      // 5. Use React Router for navigation and routing
    `,
    starterCode: {
      'App.tsx': `import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <Router>
            <div className="app">
              <Header />
              <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
              </Routes>
            </div>
          </Router>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;`,
      'components/ProductCard.tsx': `import React from 'react';
import { useCart } from '../contexts/CartContext';
import './ProductCard.css';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <div className="product-info">
        <h3>{product.name}</h3>
        <div className="product-rating">
          <span>⭐ {product.rating}</span>
          <span>({product.reviews} reviews)</span>
        </div>
        <div className="product-price">$99.99</div>
        <button onClick={handleAddToCart} className="add-to-cart-btn">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;`,
    },
  },
  {
    title: 'Create a Portfolio Website with CMS',
    category: 'React',
    description:
      'Build a personal portfolio website with a content management system for easy content updates.',
    difficulty: 'Medium',
    estimatedTime: 100,
    author: 'Elzatona Team',
    company: 'Elzatona',
    requirements: `
      - Create responsive portfolio layout
      - Implement project showcase with filtering
      - Add blog section with markdown support
      - Create contact form with email integration
      - Add dark/light theme toggle
      - Implement smooth scrolling and animations
      - Add SEO optimization
      - Create admin panel for content management
    `,
    hints: [
      'Use Framer Motion for smooth animations',
      'Implement markdown parsing for blog posts',
      'Use React Context for theme management',
      'Implement smooth scrolling with react-scroll',
      'Use React Helmet for SEO optimization',
      'Consider using a headless CMS like Strapi',
    ],
    solution: `
      // Key implementation points:
      // 1. Use Framer Motion for smooth page transitions
      // 2. Implement markdown parsing for blog content
      // 3. Use React Context for theme management
      // 4. Implement smooth scrolling navigation
      // 5. Use React Helmet for SEO optimization
    `,
    starterCode: {
      'App.tsx': `import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;`,
      'components/ProjectCard.tsx': `import React from 'react';
import { motion } from 'framer-motion';
import './ProjectCard.css';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <motion.div
      className="project-card"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <div className="project-image">
        <img src={project.image} alt={project.title} />
        <div className="project-overlay">
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
            Live Demo
          </a>
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </div>
      </div>
      <div className="project-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-technologies">
          {project.technologies.map((tech) => (
            <span key={tech} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;`,
    },
  },
  {
    title: 'Build a Calculator App with Advanced Features',
    category: 'React',
    description:
      'Create a comprehensive calculator application with basic operations, scientific functions, and history tracking.',
    difficulty: 'Easy',
    estimatedTime: 60,
    author: 'Elzatona Team',
    company: 'Elzatona',
    requirements: `
      - Implement basic arithmetic operations (+, -, *, /)
      - Add scientific functions (sin, cos, tan, log, sqrt)
      - Create calculation history with save/load functionality
      - Add keyboard support for input
      - Implement proper error handling for invalid operations
      - Create responsive design for mobile and desktop
      - Add dark/light theme toggle
      - Implement memory functions (M+, M-, MR, MC)
    `,
    hints: [
      'Use React state for calculator display and operations',
      'Implement proper input validation',
      'Use CSS Grid for button layout',
      'Implement keyboard event listeners',
      'Use localStorage for history persistence',
      'Consider using a math expression parser library',
    ],
    solution: `
      // Key implementation points:
      // 1. Use React state for calculator state management
      // 2. Implement proper input validation and error handling
      // 3. Use CSS Grid for responsive button layout
      // 4. Implement keyboard event listeners for better UX
      // 5. Use localStorage for history persistence
    `,
    starterCode: {
      'App.tsx': `import React, { useState, useEffect } from 'react';
import Calculator from './components/Calculator';
import History from './components/History';
import './App.css';

function App() {
  const [history, setHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const savedHistory = localStorage.getItem('calculator-history');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const addToHistory = (calculation: string) => {
    const newHistory = [...history, calculation];
    setHistory(newHistory);
    localStorage.setItem('calculator-history', JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('calculator-history');
  };

  return (
    <div className="app">
      <div className="calculator-container">
        <Calculator onCalculation={addToHistory} />
        <button 
          className="history-toggle"
          onClick={() => setShowHistory(!showHistory)}
        >
          {showHistory ? 'Hide' : 'Show'} History
        </button>
        {showHistory && (
          <History history={history} onClear={clearHistory} />
        )}
      </div>
    </div>
  );
}

export default App;`,
      'components/Calculator.tsx': `import React, { useState } from 'react';
import './Calculator.css';

interface CalculatorProps {
  onCalculation: (calculation: string) => void;
}

const Calculator: React.FC<CalculatorProps> = ({ onCalculation }) => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      const calculation = \`\${previousValue} \${operation} \${inputValue} = \${newValue}\`;
      
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
      
      onCalculation(calculation);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const buttons = [
    { label: 'C', onClick: clear, className: 'clear' },
    { label: '±', onClick: () => setDisplay(display.startsWith('-') ? display.slice(1) : '-' + display) },
    { label: '%', onClick: () => setDisplay(String(parseFloat(display) / 100)) },
    { label: '÷', onClick: () => inputOperation('/'), className: 'operator' },
    { label: '7', onClick: () => inputNumber('7') },
    { label: '8', onClick: () => inputNumber('8') },
    { label: '9', onClick: () => inputNumber('9') },
    { label: '×', onClick: () => inputOperation('*'), className: 'operator' },
    { label: '4', onClick: () => inputNumber('4') },
    { label: '5', onClick: () => inputNumber('5') },
    { label: '6', onClick: () => inputNumber('6') },
    { label: '-', onClick: () => inputOperation('-'), className: 'operator' },
    { label: '1', onClick: () => inputNumber('1') },
    { label: '2', onClick: () => inputNumber('2') },
    { label: '3', onClick: () => inputNumber('3') },
    { label: '+', onClick: () => inputOperation('+'), className: 'operator' },
    { label: '0', onClick: () => inputNumber('0'), className: 'zero' },
    { label: '.', onClick: () => setDisplay(display.includes('.') ? display : display + '.') },
    { label: '=', onClick: performCalculation, className: 'equals' },
  ];

  return (
    <div className="calculator">
      <div className="display">{display}</div>
      <div className="buttons">
        {buttons.map((button, index) => (
          <button
            key={index}
            className={\`button \${button.className || ''}\`}
            onClick={button.onClick}
          >
            {button.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;`,
    },
  },
];

async function seedFrontendTasks() {
  console.log('🌱 Starting comprehensive frontend tasks seeding...\n');

  try {
    for (const task of frontendTasks) {
      console.log(`📝 Adding task: ${task.title}`);

      const taskData = {
        ...task,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        status: 'active',
        views: 0,
        completions: 0,
        averageRating: 0,
        tags: [task.category.toLowerCase(), task.difficulty.toLowerCase()],
        isPublished: true,
        featured: false,
        order: frontendTasks.indexOf(task) + 1,
      };

      const docRef = await addDoc(collection(db, 'frontendTasks'), taskData);
      console.log(`✅ Task added with ID: ${docRef.id}`);
    }

    console.log(
      `\n🎉 Successfully seeded ${frontendTasks.length} comprehensive frontend tasks!`
    );
    console.log('\n📊 Frontend Tasks Summary:');
    console.log(`- Total Tasks: ${frontendTasks.length}`);
    console.log(`- Categories: React, JavaScript, CSS, HTML, TypeScript`);
    console.log(`- Difficulty Levels: Easy, Medium, Hard`);
    console.log(
      `- Estimated Total Time: ${frontendTasks.reduce((sum, task) => sum + task.estimatedTime, 0)} minutes`
    );
  } catch (error) {
    console.error('❌ Error seeding frontend tasks:', error);
  }
}

// Run the seeder
seedFrontendTasks()
  .then(() => {
    console.log('\n✨ Frontend tasks seeding completed!');
    process.exit(0);
  })
  .catch(error => {
    console.error('💥 Seeding failed:', error);
    process.exit(1);
  });
