// v1.0 - Massive frontend tasks and problem-solving seeding script
// Run with: npx tsx src/scripts/seed-massive-content.ts

import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
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

// ==========================================
// Massive Frontend Tasks Collection
// ==========================================

const massiveFrontendTasks = [
  {
    title: 'Build a Spotify Clone with Audio Player',
    description:
      'Create a music streaming application similar to Spotify with playlist management, audio controls, and user authentication.',
    difficulty: 'hard',
    category: 'React',
    tags: ['React', 'Audio API', 'Music', 'Playlists', 'Authentication'],
    starterCode: {
      'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Spotify Clone</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div id="root"></div>
    <script src="index.js"></script>
</body>
</html>`,
      'style.css': `body {
    font-family: 'Circular', 'Helvetica Neue', Arial, sans-serif;
    margin: 0;
    background-color: #191414;
    color: white;
    overflow-x: hidden;
}

.sidebar {
    width: 240px;
    height: 100vh;
    background-color: #000000;
    position: fixed;
    left: 0;
    top: 0;
    padding: 20px;
    box-sizing: border-box;
}

.main-content {
    margin-left: 240px;
    padding: 20px;
    min-height: 100vh;
}

.player-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 80px;
    background-color: #282828;
    display: flex;
    align-items: center;
    padding: 0 20px;
    border-top: 1px solid #404040;
}

.track-info {
    display: flex;
    align-items: center;
    flex: 1;
}

.track-image {
    width: 56px;
    height: 56px;
    background-color: #333;
    margin-right: 15px;
}

.track-details h4 {
    margin: 0 0 5px 0;
    font-size: 14px;
}

.track-details p {
    margin: 0;
    font-size: 12px;
    color: #b3b3b3;
}

.player-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
}

.play-button {
    width: 32px;
    height: 32px;
    background-color: white;
    border: none;
    border-radius: 50%;
    margin: 0 10px;
    cursor: pointer;
}

.volume-controls {
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: flex-end;
}

.playlist-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.playlist-card {
    background-color: #181818;
    border-radius: 8px;
    padding: 20px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.playlist-card:hover {
    background-color: #282828;
}

.playlist-image {
    width: 100%;
    height: 160px;
    background-color: #333;
    border-radius: 4px;
    margin-bottom: 15px;
}

.playlist-title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
}

.playlist-description {
    font-size: 14px;
    color: #b3b3b3;
}`,
      'index.js': `import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

// Mock data
const mockPlaylists = [
  {
    id: 1,
    name: 'Todays Top Hits',
    description: 'The most played songs right now',
    image: 'https://via.placeholder.com/200x200/1db954/ffffff?text=Top+Hits'
  },
  {
    id: 2,
    name: 'Discover Weekly',
    description: 'Your weekly mixtape of fresh music',
    image: 'https://via.placeholder.com/200x200/1db954/ffffff?text=Discover'
  },
  {
    id: 3,
    name: 'Chill Hits',
    description: 'Kick back to the best new and recent chill hits',
    image: 'https://via.placeholder.com/200x200/1db954/ffffff?text=Chill'
  }
];

const mockTracks = [
  {
    id: 1,
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    duration: '3:20',
    album: 'After Hours'
  },
  {
    id: 2,
    title: 'Watermelon Sugar',
    artist: 'Harry Styles',
    duration: '2:54',
    album: 'Fine Line'
  },
  {
    id: 3,
    title: 'Levitating',
    artist: 'Dua Lipa',
    duration: '3:23',
    album: 'Future Nostalgia'
  }
];

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Spotify Clone</h2>
      <nav>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '10px' }}>
            <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Home</a>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Search</a>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Your Library</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

function PlaylistCard({ playlist }) {
  return (
    <div className="playlist-card">
      <div className="playlist-image" style={{ backgroundImage: \`url(\${playlist.image})\` }}></div>
      <div className="playlist-title">{playlist.name}</div>
      <div className="playlist-description">{playlist.description}</div>
    </div>
  );
}

function PlayerBar({ currentTrack, isPlaying, onPlayPause }) {
  return (
    <div className="player-bar">
      <div className="track-info">
        <div className="track-image"></div>
        <div className="track-details">
          <h4>{currentTrack ? currentTrack.title : 'No track selected'}</h4>
          <p>{currentTrack ? currentTrack.artist : 'Select a track to play'}</p>
        </div>
      </div>
      
      <div className="player-controls">
        <button>⏮</button>
        <button className="play-button" onClick={onPlayPause}>
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button>⏭</button>
      </div>
      
      <div className="volume-controls">
        <span>🔊</span>
        <input type="range" min="0" max="100" defaultValue="50" style={{ margin: '0 10px' }} />
      </div>
    </div>
  );
}

function SpotifyClone() {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTrackSelect = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  return (
    <div>
      <Sidebar />
      <div className="main-content">
        <h1>Good afternoon</h1>
        <div className="playlist-grid">
          {mockPlaylists.map(playlist => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </div>
        
        <h2 style={{ marginTop: '40px' }}>Recently played</h2>
        <div style={{ marginTop: '20px' }}>
          {mockTracks.map(track => (
            <div 
              key={track.id} 
              style={{ 
                padding: '10px', 
                cursor: 'pointer',
                backgroundColor: currentTrack?.id === track.id ? '#282828' : 'transparent',
                borderRadius: '4px'
              }}
              onClick={() => handleTrackSelect(track)}
            >
              {track.title} - {track.artist} ({track.duration})
            </div>
          ))}
        </div>
      </div>
      
      <PlayerBar 
        currentTrack={currentTrack} 
        isPlaying={isPlaying} 
        onPlayPause={handlePlayPause} 
      />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<SpotifyClone />);`,
    },
    solutionCode: {
      'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Spotify Clone</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div id="root"></div>
    <script src="index.js"></script>
</body>
</html>`,
      'style.css': `body {
    font-family: 'Circular', 'Helvetica Neue', Arial, sans-serif;
    margin: 0;
    background-color: #191414;
    color: white;
    overflow-x: hidden;
}

.sidebar {
    width: 240px;
    height: 100vh;
    background-color: #000000;
    position: fixed;
    left: 0;
    top: 0;
    padding: 20px;
    box-sizing: border-box;
}

.main-content {
    margin-left: 240px;
    padding: 20px;
    min-height: 100vh;
}

.player-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 80px;
    background-color: #282828;
    display: flex;
    align-items: center;
    padding: 0 20px;
    border-top: 1px solid #404040;
}

.track-info {
    display: flex;
    align-items: center;
    flex: 1;
}

.track-image {
    width: 56px;
    height: 56px;
    background-color: #333;
    margin-right: 15px;
}

.track-details h4 {
    margin: 0 0 5px 0;
    font-size: 14px;
}

.track-details p {
    margin: 0;
    font-size: 12px;
    color: #b3b3b3;
}

.player-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
}

.play-button {
    width: 32px;
    height: 32px;
    background-color: white;
    border: none;
    border-radius: 50%;
    margin: 0 10px;
    cursor: pointer;
}

.volume-controls {
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: flex-end;
}

.playlist-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.playlist-card {
    background-color: #181818;
    border-radius: 8px;
    padding: 20px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.playlist-card:hover {
    background-color: #282828;
}

.playlist-image {
    width: 100%;
    height: 160px;
    background-color: #333;
    border-radius: 4px;
    margin-bottom: 15px;
}

.playlist-title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
}

.playlist-description {
    font-size: 14px;
    color: #b3b3b3;
}`,
      'index.js': `import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

// Mock data
const mockPlaylists = [
  {
    id: 1,
    name: 'Todays Top Hits',
    description: 'The most played songs right now',
    image: 'https://via.placeholder.com/200x200/1db954/ffffff?text=Top+Hits'
  },
  {
    id: 2,
    name: 'Discover Weekly',
    description: 'Your weekly mixtape of fresh music',
    image: 'https://via.placeholder.com/200x200/1db954/ffffff?text=Discover'
  },
  {
    id: 3,
    name: 'Chill Hits',
    description: 'Kick back to the best new and recent chill hits',
    image: 'https://via.placeholder.com/200x200/1db954/ffffff?text=Chill'
  }
];

const mockTracks = [
  {
    id: 1,
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    duration: '3:20',
    album: 'After Hours'
  },
  {
    id: 2,
    title: 'Watermelon Sugar',
    artist: 'Harry Styles',
    duration: '2:54',
    album: 'Fine Line'
  },
  {
    id: 3,
    title: 'Levitating',
    artist: 'Dua Lipa',
    duration: '3:23',
    album: 'Future Nostalgia'
  }
];

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Spotify Clone</h2>
      <nav>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '10px' }}>
            <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Home</a>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Search</a>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Your Library</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

function PlaylistCard({ playlist }) {
  return (
    <div className="playlist-card">
      <div className="playlist-image" style={{ backgroundImage: \`url(\${playlist.image})\` }}></div>
      <div className="playlist-title">{playlist.name}</div>
      <div className="playlist-description">{playlist.description}</div>
    </div>
  );
}

function PlayerBar({ currentTrack, isPlaying, onPlayPause }) {
  return (
    <div className="player-bar">
      <div className="track-info">
        <div className="track-image"></div>
        <div className="track-details">
          <h4>{currentTrack ? currentTrack.title : 'No track selected'}</h4>
          <p>{currentTrack ? currentTrack.artist : 'Select a track to play'}</p>
        </div>
      </div>
      
      <div className="player-controls">
        <button>⏮</button>
        <button className="play-button" onClick={onPlayPause}>
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button>⏭</button>
      </div>
      
      <div className="volume-controls">
        <span>🔊</span>
        <input type="range" min="0" max="100" defaultValue="50" style={{ margin: '0 10px' }} />
      </div>
    </div>
  );
}

function SpotifyClone() {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTrackSelect = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  return (
    <div>
      <Sidebar />
      <div className="main-content">
        <h1>Good afternoon</h1>
        <div className="playlist-grid">
          {mockPlaylists.map(playlist => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </div>
        
        <h2 style={{ marginTop: '40px' }}>Recently played</h2>
        <div style={{ marginTop: '20px' }}>
          {mockTracks.map(track => (
            <div 
              key={track.id} 
              style={{ 
                padding: '10px', 
                cursor: 'pointer',
                backgroundColor: currentTrack?.id === track.id ? '#282828' : 'transparent',
                borderRadius: '4px'
              }}
              onClick={() => handleTrackSelect(track)}
            >
              {track.title} - {track.artist} ({track.duration})
            </div>
          ))}
        </div>
      </div>
      
      <PlayerBar 
        currentTrack={currentTrack} 
        isPlaying={isPlaying} 
        onPlayPause={handlePlayPause} 
      />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<SpotifyClone />);`,
    },
    testCases: [],
    hints: [
      'Use HTML5 Audio API for actual audio playback',
      'Implement playlist management with add/remove functionality',
      'Add search functionality to find tracks and playlists',
      'Consider using a music streaming API like Spotify Web API',
    ],
    requirements: [
      'Display playlists in a grid layout',
      'Show current playing track in the bottom player bar',
      'Implement play/pause controls',
      'Add volume control slider',
      'Make tracks clickable to play them',
    ],
    solutionExplanation:
      'This Spotify clone demonstrates React state management, component composition, and audio player integration. The app uses useState for managing current track and playback state, and includes a sidebar navigation, playlist grid, and persistent player bar.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'Create a Netflix-style Video Streaming App',
    description:
      'Build a video streaming application with movie/show browsing, categories, search functionality, and video player with controls.',
    difficulty: 'hard',
    category: 'React',
    tags: ['React', 'Video API', 'Streaming', 'Categories', 'Search'],
    starterCode: {
      'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Netflix Clone</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div id="root"></div>
    <script src="index.js"></script>
</body>
</html>`,
      'style.css': `body {
    font-family: 'Netflix Sans', Arial, sans-serif;
    margin: 0;
    background-color: #141414;
    color: white;
}

.header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0.7), transparent);
    padding: 20px;
    z-index: 100;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-size: 24px;
    font-weight: bold;
    color: #e50914;
}

.nav-links {
    display: flex;
    gap: 20px;
}

.nav-links a {
    color: white;
    text-decoration: none;
    font-size: 14px;
}

.search-bar {
    display: flex;
    align-items: center;
}

.search-bar input {
    background-color: rgba(0,0,0,0.75);
    border: 1px solid #333;
    color: white;
    padding: 8px 12px;
    border-radius: 4px;
    width: 200px;
}

.hero-section {
    height: 100vh;
    background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://via.placeholder.com/1920x1080/000000/ffffff?text=Hero+Movie');
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.hero-content h1 {
    font-size: 48px;
    margin-bottom: 20px;
}

.hero-content p {
    font-size: 18px;
    margin-bottom: 30px;
    max-width: 600px;
}

.play-button {
    background-color: white;
    color: black;
    border: none;
    padding: 12px 24px;
    font-size: 16px;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 10px;
}

.info-button {
    background-color: rgba(109, 109, 110, 0.7);
    color: white;
    border: none;
    padding: 12px 24px;
    font-size: 16px;
    border-radius: 4px;
    cursor: pointer;
}

.content-section {
    padding: 40px 20px;
}

.section-title {
    font-size: 24px;
    margin-bottom: 20px;
}

.movie-row {
    display: flex;
    gap: 10px;
    overflow-x: auto;
    padding-bottom: 10px;
}

.movie-card {
    min-width: 200px;
    height: 300px;
    background-color: #333;
    border-radius: 4px;
    cursor: pointer;
    transition: transform 0.3s;
    position: relative;
}

.movie-card:hover {
    transform: scale(1.05);
}

.movie-poster {
    width: 100%;
    height: 100%;
    background-color: #555;
    border-radius: 4px;
}

.movie-info {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(transparent, rgba(0,0,0,0.8));
    padding: 20px 10px 10px;
}

.movie-title {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 5px;
}

.movie-year {
    font-size: 12px;
    color: #ccc;
}`,
      'index.js': `import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

// Mock data
const mockMovies = [
  {
    id: 1,
    title: 'Stranger Things',
    year: '2016',
    category: 'Sci-Fi',
    poster: 'https://via.placeholder.com/200x300/000000/ffffff?text=Stranger+Things'
  },
  {
    id: 2,
    title: 'The Crown',
    year: '2016',
    category: 'Drama',
    poster: 'https://via.placeholder.com/200x300/000000/ffffff?text=The+Crown'
  },
  {
    id: 3,
    title: 'Ozark',
    year: '2017',
    category: 'Thriller',
    poster: 'https://via.placeholder.com/200x300/000000/ffffff?text=Ozark'
  },
  {
    id: 4,
    title: 'The Witcher',
    year: '2019',
    category: 'Fantasy',
    poster: 'https://via.placeholder.com/200x300/000000/ffffff?text=The+Witcher'
  },
  {
    id: 5,
    title: 'Bridgerton',
    year: '2020',
    category: 'Romance',
    poster: 'https://via.placeholder.com/200x300/000000/ffffff?text=Bridgerton'
  }
];

const categories = ['Trending Now', 'Sci-Fi', 'Drama', 'Thriller', 'Fantasy', 'Romance'];

function Header({ searchQuery, onSearchChange }) {
  return (
    <div className="header">
      <div className="logo">NETFLIX</div>
      <nav className="nav-links">
        <a href="#">Home</a>
        <a href="#">TV Shows</a>
        <a href="#">Movies</a>
        <a href="#">New & Popular</a>
        <a href="#">My List</a>
      </nav>
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search movies and TV shows"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1>Unlimited movies, TV shows, and more</h1>
        <p>Watch anywhere. Cancel anytime.</p>
        <button className="play-button">▶ Play</button>
        <button className="info-button">ℹ More Info</button>
      </div>
    </div>
  );
}

function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <div className="movie-poster" style={{ backgroundImage: \`url(\${movie.poster})\` }}></div>
      <div className="movie-info">
        <div className="movie-title">{movie.title}</div>
        <div className="movie-year">{movie.year}</div>
      </div>
    </div>
  );
}

function MovieRow({ title, movies }) {
  return (
    <div className="content-section">
      <h2 className="section-title">{title}</h2>
      <div className="movie-row">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

function NetflixClone() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredMovies = mockMovies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <HeroSection />
      
      {categories.map(category => (
        <MovieRow 
          key={category} 
          title={category} 
          movies={searchQuery ? filteredMovies : mockMovies} 
        />
      ))}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<NetflixClone />);`,
    },
    solutionCode: {
      'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Netflix Clone</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div id="root"></div>
    <script src="index.js"></script>
</body>
</html>`,
      'style.css': `body {
    font-family: 'Netflix Sans', Arial, sans-serif;
    margin: 0;
    background-color: #141414;
    color: white;
}

.header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0.7), transparent);
    padding: 20px;
    z-index: 100;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-size: 24px;
    font-weight: bold;
    color: #e50914;
}

.nav-links {
    display: flex;
    gap: 20px;
}

.nav-links a {
    color: white;
    text-decoration: none;
    font-size: 14px;
}

.search-bar {
    display: flex;
    align-items: center;
}

.search-bar input {
    background-color: rgba(0,0,0,0.75);
    border: 1px solid #333;
    color: white;
    padding: 8px 12px;
    border-radius: 4px;
    width: 200px;
}

.hero-section {
    height: 100vh;
    background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://via.placeholder.com/1920x1080/000000/ffffff?text=Hero+Movie');
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.hero-content h1 {
    font-size: 48px;
    margin-bottom: 20px;
}

.hero-content p {
    font-size: 18px;
    margin-bottom: 30px;
    max-width: 600px;
}

.play-button {
    background-color: white;
    color: black;
    border: none;
    padding: 12px 24px;
    font-size: 16px;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 10px;
}

.info-button {
    background-color: rgba(109, 109, 110, 0.7);
    color: white;
    border: none;
    padding: 12px 24px;
    font-size: 16px;
    border-radius: 4px;
    cursor: pointer;
}

.content-section {
    padding: 40px 20px;
}

.section-title {
    font-size: 24px;
    margin-bottom: 20px;
}

.movie-row {
    display: flex;
    gap: 10px;
    overflow-x: auto;
    padding-bottom: 10px;
}

.movie-card {
    min-width: 200px;
    height: 300px;
    background-color: #333;
    border-radius: 4px;
    cursor: pointer;
    transition: transform 0.3s;
    position: relative;
}

.movie-card:hover {
    transform: scale(1.05);
}

.movie-poster {
    width: 100%;
    height: 100%;
    background-color: #555;
    border-radius: 4px;
}

.movie-info {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(transparent, rgba(0,0,0,0.8));
    padding: 20px 10px 10px;
}

.movie-title {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 5px;
}

.movie-year {
    font-size: 12px;
    color: #ccc;
}`,
      'index.js': `import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

// Mock data
const mockMovies = [
  {
    id: 1,
    title: 'Stranger Things',
    year: '2016',
    category: 'Sci-Fi',
    poster: 'https://via.placeholder.com/200x300/000000/ffffff?text=Stranger+Things'
  },
  {
    id: 2,
    title: 'The Crown',
    year: '2016',
    category: 'Drama',
    poster: 'https://via.placeholder.com/200x300/000000/ffffff?text=The+Crown'
  },
  {
    id: 3,
    title: 'Ozark',
    year: '2017',
    category: 'Thriller',
    poster: 'https://via.placeholder.com/200x300/000000/ffffff?text=Ozark'
  },
  {
    id: 4,
    title: 'The Witcher',
    year: '2019',
    category: 'Fantasy',
    poster: 'https://via.placeholder.com/200x300/000000/ffffff?text=The+Witcher'
  },
  {
    id: 5,
    title: 'Bridgerton',
    year: '2020',
    category: 'Romance',
    poster: 'https://via.placeholder.com/200x300/000000/ffffff?text=Bridgerton'
  }
];

const categories = ['Trending Now', 'Sci-Fi', 'Drama', 'Thriller', 'Fantasy', 'Romance'];

function Header({ searchQuery, onSearchChange }) {
  return (
    <div className="header">
      <div className="logo">NETFLIX</div>
      <nav className="nav-links">
        <a href="#">Home</a>
        <a href="#">TV Shows</a>
        <a href="#">Movies</a>
        <a href="#">New & Popular</a>
        <a href="#">My List</a>
      </nav>
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search movies and TV shows"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1>Unlimited movies, TV shows, and more</h1>
        <p>Watch anywhere. Cancel anytime.</p>
        <button className="play-button">▶ Play</button>
        <button className="info-button">ℹ More Info</button>
      </div>
    </div>
  );
}

function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <div className="movie-poster" style={{ backgroundImage: \`url(\${movie.poster})\` }}></div>
      <div className="movie-info">
        <div className="movie-title">{movie.title}</div>
        <div className="movie-year">{movie.year}</div>
      </div>
    </div>
  );
}

function MovieRow({ title, movies }) {
  return (
    <div className="content-section">
      <h2 className="section-title">{title}</h2>
      <div className="movie-row">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

function NetflixClone() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredMovies = mockMovies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <HeroSection />
      
      {categories.map(category => (
        <MovieRow 
          key={category} 
          title={category} 
          movies={searchQuery ? filteredMovies : mockMovies} 
        />
      ))}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<NetflixClone />);`,
    },
    testCases: [],
    hints: [
      'Implement video player with HTML5 video element',
      'Add movie details modal with description and cast',
      'Implement user profiles and watch history',
      'Consider using a movie database API like TMDB',
    ],
    requirements: [
      'Display movies in horizontal scrolling rows',
      'Implement search functionality',
      'Show movie categories and genres',
      'Add hover effects on movie cards',
      'Create responsive design for mobile devices',
    ],
    solutionExplanation:
      'This Netflix clone demonstrates advanced React patterns including state management, component composition, and responsive design. The app features a fixed header with search, hero section, and multiple movie rows with horizontal scrolling.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// ==========================================
// Massive Problem-Solving Tasks Collection
// ==========================================

const massiveProblemSolvingTasks = [
  {
    id: 'problem-solving-025',
    title: 'Binary Tree Level Order Traversal',
    description:
      'Given the root of a binary tree, return the level order traversal of its nodes values (i.e., from left to right, level by level).',
    difficulty: 'medium',
    category: 'Trees',
    tags: ['tree', 'breadth-first-search', 'binary-tree'],
    constraints: [
      'The number of nodes in the tree is in the range [0, 2000].',
      '-1000 <= Node.val <= 1000',
    ],
    examples: [
      {
        input: 'root = [3,9,20,null,null,15,7]',
        output: '[[3],[9,20],[15,7]]',
        explanation: 'Level 0: [3], Level 1: [9,20], Level 2: [15,7]',
      },
      {
        input: 'root = [1]',
        output: '[[1]]',
        explanation: 'Only one node at level 0',
      },
      {
        input: 'root = []',
        output: '[]',
        explanation: 'Empty tree',
      },
    ],
    testCases: [
      {
        input: '[3,9,20,null,null,15,7]',
        expectedOutput: '[[3],[9,20],[15,7]]',
      },
      {
        input: '[1]',
        expectedOutput: '[[1]]',
      },
      {
        input: '[]',
        expectedOutput: '[]',
      },
    ],
    starterCode: `function levelOrder(root) {
    // Your code here
}`,
    solutionCode: `function levelOrder(root) {
    if (!root) return [];
    
    const result = [];
    const queue = [root];
    
    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel = [];
        
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            currentLevel.push(node.val);
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        
        result.push(currentLevel);
    }
    
    return result;
}`,
    hints: [
      'Use BFS (Breadth-First Search) with a queue',
      'Process nodes level by level',
      'Track the size of each level before processing',
      'Time complexity: O(n), Space complexity: O(w) where w is the maximum width',
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: 'seeding-script',
    updatedBy: 'seeding-script',
  },
  {
    id: 'problem-solving-026',
    title: 'Maximum Depth of Binary Tree',
    description:
      'Given the root of a binary tree, return its maximum depth. A binary trees maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.',
    difficulty: 'easy',
    category: 'Trees',
    tags: ['tree', 'depth-first-search', 'binary-tree'],
    constraints: [
      'The number of nodes in the tree is in the range [0, 10^4].',
      '-100 <= Node.val <= 100',
    ],
    examples: [
      {
        input: 'root = [3,9,20,null,null,15,7]',
        output: '3',
        explanation: 'The tree has a maximum depth of 3',
      },
      {
        input: 'root = [1,null,2]',
        output: '2',
        explanation: 'The tree has a maximum depth of 2',
      },
    ],
    testCases: [
      {
        input: '[3,9,20,null,null,15,7]',
        expectedOutput: '3',
      },
      {
        input: '[1,null,2]',
        expectedOutput: '2',
      },
      {
        input: '[]',
        expectedOutput: '0',
      },
    ],
    starterCode: `function maxDepth(root) {
    // Your code here
}`,
    solutionCode: `function maxDepth(root) {
    if (!root) return 0;
    
    const leftDepth = maxDepth(root.left);
    const rightDepth = maxDepth(root.right);
    
    return Math.max(leftDepth, rightDepth) + 1;
}`,
    hints: [
      'Use recursive DFS approach',
      'Base case: return 0 for null nodes',
      'Recursive case: return 1 + max depth of left and right subtrees',
      'Time complexity: O(n), Space complexity: O(h) where h is the height',
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: 'seeding-script',
    updatedBy: 'seeding-script',
  },
  {
    id: 'problem-solving-027',
    title: 'Symmetric Tree',
    description:
      'Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).',
    difficulty: 'easy',
    category: 'Trees',
    tags: ['tree', 'depth-first-search', 'breadth-first-search'],
    constraints: [
      'The number of nodes in the tree is in the range [1, 1000].',
      '-100 <= Node.val <= 100',
    ],
    examples: [
      {
        input: 'root = [1,2,2,3,4,4,3]',
        output: 'true',
        explanation: 'The tree is symmetric around its center',
      },
      {
        input: 'root = [1,2,2,null,3,null,3]',
        output: 'false',
        explanation: 'The tree is not symmetric',
      },
    ],
    testCases: [
      {
        input: '[1,2,2,3,4,4,3]',
        expectedOutput: 'true',
      },
      {
        input: '[1,2,2,null,3,null,3]',
        expectedOutput: 'false',
      },
      {
        input: '[1]',
        expectedOutput: 'true',
      },
    ],
    starterCode: `function isSymmetric(root) {
    // Your code here
}`,
    solutionCode: `function isSymmetric(root) {
    if (!root) return true;
    
    function isMirror(left, right) {
        if (!left && !right) return true;
        if (!left || !right) return false;
        
        return left.val === right.val && 
               isMirror(left.left, right.right) && 
               isMirror(left.right, right.left);
    }
    
    return isMirror(root.left, root.right);
}`,
    hints: [
      'Use recursive approach to compare left and right subtrees',
      'Two trees are symmetric if their left and right children are mirrors',
      'Check if values match and recursively check subtrees',
      'Time complexity: O(n), Space complexity: O(h) where h is the height',
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: 'seeding-script',
    updatedBy: 'seeding-script',
  },
  {
    id: 'problem-solving-028',
    title: 'Path Sum',
    description:
      'Given the root of a binary tree and an integer targetSum, return true if the tree has a root-to-leaf path such that adding up all the values along the path equals targetSum.',
    difficulty: 'easy',
    category: 'Trees',
    tags: ['tree', 'depth-first-search', 'binary-tree'],
    constraints: [
      'The number of nodes in the tree is in the range [0, 5000].',
      '-1000 <= Node.val <= 1000',
      '-1000 <= targetSum <= 1000',
    ],
    examples: [
      {
        input:
          'root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22',
        output: 'true',
        explanation: 'Path 5->4->11->2 sums to 22',
      },
      {
        input: 'root = [1,2,3], targetSum = 5',
        output: 'false',
        explanation: 'No path sums to 5',
      },
    ],
    testCases: [
      {
        input: '[5,4,8,11,null,13,4,7,2,null,null,null,1], 22',
        expectedOutput: 'true',
      },
      {
        input: '[1,2,3], 5',
        expectedOutput: 'false',
      },
      {
        input: '[1,2], 0',
        expectedOutput: 'false',
      },
    ],
    starterCode: `function hasPathSum(root, targetSum) {
    // Your code here
}`,
    solutionCode: `function hasPathSum(root, targetSum) {
    if (!root) return false;
    
    if (!root.left && !root.right) {
        return root.val === targetSum;
    }
    
    const remainingSum = targetSum - root.val;
    return hasPathSum(root.left, remainingSum) || hasPathSum(root.right, remainingSum);
}`,
    hints: [
      'Use recursive DFS approach',
      'Base case: if its a leaf node, check if value equals remaining sum',
      'Recursive case: subtract current value from target and check children',
      'Time complexity: O(n), Space complexity: O(h) where h is the height',
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: 'seeding-script',
    updatedBy: 'seeding-script',
  },
  {
    id: 'problem-solving-029',
    title: 'Construct Binary Tree from Preorder and Inorder Traversal',
    description:
      'Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree and inorder is the inorder traversal of the same tree, construct and return the binary tree.',
    difficulty: 'medium',
    category: 'Trees',
    tags: ['tree', 'array', 'hash-table', 'divide-and-conquer'],
    constraints: [
      '1 <= preorder.length <= 3000',
      'inorder.length == preorder.length',
      '-3000 <= preorder[i], inorder[i] <= 3000',
      'preorder and inorder consist of unique values.',
      'Each value of inorder also appears in preorder.',
    ],
    examples: [
      {
        input: 'preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]',
        output: '[3,9,20,null,null,15,7]',
        explanation: 'The constructed binary tree',
      },
      {
        input: 'preorder = [-1], inorder = [-1]',
        output: '[-1]',
        explanation: 'Single node tree',
      },
    ],
    testCases: [
      {
        input: '[3,9,20,15,7], [9,3,15,20,7]',
        expectedOutput: '[3,9,20,null,null,15,7]',
      },
      {
        input: '[-1], [-1]',
        expectedOutput: '[-1]',
      },
    ],
    starterCode: `function buildTree(preorder, inorder) {
    // Your code here
}`,
    solutionCode: `function buildTree(preorder, inorder) {
    if (preorder.length === 0) return null;
    
    const rootVal = preorder[0];
    const root = new TreeNode(rootVal);
    
    const rootIndex = inorder.indexOf(rootVal);
    
    root.left = buildTree(
        preorder.slice(1, rootIndex + 1),
        inorder.slice(0, rootIndex)
    );
    
    root.right = buildTree(
        preorder.slice(rootIndex + 1),
        inorder.slice(rootIndex + 1)
    );
    
    return root;
}`,
    hints: [
      'First element in preorder is always the root',
      'Find root position in inorder to determine left and right subtrees',
      'Recursively build left and right subtrees',
      'Time complexity: O(n²), Space complexity: O(n)',
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: 'seeding-script',
    updatedBy: 'seeding-script',
  },
];

// ==========================================
// Seeding Functions
// ==========================================

async function seedMassiveFrontendTasks() {
  console.log('🎨 Starting massive frontend tasks seeding...');

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const task of massiveFrontendTasks) {
    try {
      // Check if task already exists
      const existingQuery = query(
        collection(db, 'frontendTasks'),
        where('title', '==', task.title)
      );
      const existingSnapshot = await getDocs(existingQuery);

      if (existingSnapshot.empty) {
        await addDoc(collection(db, 'frontendTasks'), task);
        successCount++;
        console.log(`✅ Added frontend task: ${task.title}`);
      } else {
        skipCount++;
        console.log(`⏭️  Frontend task already exists: ${task.title}`);
      }
    } catch (error) {
      errorCount++;
      console.error(`❌ Error adding frontend task ${task.title}:`, error);
    }
  }

  console.log('🎉 Massive frontend tasks seeding completed!');
  console.log(`📊 Summary:`);
  console.log(`   - Successfully added: ${successCount}`);
  console.log(`   - Skipped (already exist): ${skipCount}`);
  console.log(`   - Errors: ${errorCount}`);
  console.log(`   - Total processed: ${massiveFrontendTasks.length}`);
}

async function seedMassiveProblemSolvingTasks() {
  console.log('🧮 Starting massive problem-solving tasks seeding...');

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const task of massiveProblemSolvingTasks) {
    try {
      // Check if task already exists
      const existingQuery = query(
        collection(db, 'problemSolvingTasks'),
        where('id', '==', task.id)
      );
      const existingSnapshot = await getDocs(existingQuery);

      if (existingSnapshot.empty) {
        await addDoc(collection(db, 'problemSolvingTasks'), task);
        successCount++;
        console.log(`✅ Added problem-solving task: ${task.title}`);
      } else {
        skipCount++;
        console.log(`⏭️  Problem-solving task already exists: ${task.title}`);
      }
    } catch (error) {
      errorCount++;
      console.error(
        `❌ Error adding problem-solving task ${task.title}:`,
        error
      );
    }
  }

  console.log('🎉 Massive problem-solving tasks seeding completed!');
  console.log(`📊 Summary:`);
  console.log(`   - Successfully added: ${successCount}`);
  console.log(`   - Skipped (already exist): ${skipCount}`);
  console.log(`   - Errors: ${errorCount}`);
  console.log(`   - Total processed: ${massiveProblemSolvingTasks.length}`);
}

// ==========================================
// Main Execution
// ==========================================

async function main() {
  console.log('🚀 Starting massive content seeding process...');

  try {
    await seedMassiveFrontendTasks();
    console.log('\\n');
    await seedMassiveProblemSolvingTasks();

    console.log('\\n🎉 All massive content seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error during seeding:', error);
  }
}

main().catch(console.error);
