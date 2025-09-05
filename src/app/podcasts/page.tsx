'use client';

import { useState, useMemo } from 'react';
import {
  podcastEpisodes,
  podcastCategories,
  PodcastEpisode,
} from '@/lib/podcasts';

export default function PodcastsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPodcast, setSelectedPodcast] = useState<PodcastEpisode | null>(
    null
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const filteredPodcasts = useMemo(() => {
    let filtered = podcastEpisodes;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(
        podcast => podcast.category === selectedCategory
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        podcast =>
          podcast.title.toLowerCase().includes(query) ||
          podcast.description.toLowerCase().includes(query) ||
          podcast.tags.some(tag => tag.toLowerCase().includes(query)) ||
          podcast.host?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleTimeUpdate = (e: React.ChangeEvent<HTMLAudioElement>) => {
    setCurrentTime(e.currentTarget.currentTime);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleLoadedMetadata = (e: React.ChangeEvent<HTMLAudioElement>) => {
    setDuration(e.currentTarget.duration);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    // Note: In a real implementation, you'd update the audio element's currentTime
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            🎧 Podcasts
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Listen to insightful tech podcasts, career advice, and industry
            insights. Learn from experts and stay updated with the latest
            trends.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search podcasts..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white dark:border-gray-600"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700'
              }`}
            >
              All Categories
            </button>
            {podcastCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700'
                }`}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            {filteredPodcasts.length} podcast
            {filteredPodcasts.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Podcast Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredPodcasts.map(podcast => (
            <div
              key={podcast.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-200 dark:border-gray-700"
            >
              {/* Podcast Thumbnail */}
              <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 rounded-t-xl flex items-center justify-center">
                <div className="text-6xl text-white opacity-80">🎧</div>
                <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                  {podcast.duration}
                </div>
              </div>

              {/* Podcast Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
                    {
                      podcastCategories.find(cat => cat.id === podcast.category)
                        ?.name
                    }
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {podcast.publishDate}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {podcast.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                  {podcast.description}
                </p>

                {/* Host Info */}
                {podcast.host && (
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center mr-3">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {podcast.host.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Host
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {podcast.host}
                      </p>
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {podcast.tags.slice(0, 3).map(tag => (
                    <span
                      key={tag}
                      className="inline-block px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                  {podcast.tags.length > 3 && (
                    <span className="inline-block px-2 py-1 text-xs font-medium text-gray-500 dark:text-gray-500">
                      +{podcast.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedPodcast(podcast)}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
                  >
                    🎧 Listen Now
                  </button>
                  {podcast.externalLinks.apple && (
                    <a
                      href={podcast.externalLinks.apple}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 text-sm font-medium"
                    >
                      📱 Apple
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Audio Player Modal */}
        {selectedPodcast && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Player Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {selectedPodcast.title}
                  </h2>
                  <button
                    onClick={() => setSelectedPodcast(null)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  {selectedPodcast.host} • {selectedPodcast.duration} •{' '}
                  {selectedPodcast.publishDate}
                </p>
              </div>

              {/* Player Content */}
              <div className="p-6">
                {/* Audio Player */}
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <button
                      onClick={handlePlayPause}
                      className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-200"
                    >
                      {isPlaying ? (
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                        </svg>
                      ) : (
                        <svg
                          className="w-6 h-6 ml-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      )}
                    </button>
                    <div className="flex-1">
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max={duration || 0}
                        value={currentTime}
                        onChange={handleSeek}
                        className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                {/* Podcast Description */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Description
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {selectedPodcast.description}
                  </p>
                </div>

                {/* External Links */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Listen on
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedPodcast.externalLinks.apple && (
                      <a
                        href={selectedPodcast.externalLinks.apple}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
                      >
                        🍎 Apple Podcasts
                      </a>
                    )}
                    {selectedPodcast.externalLinks.spotify && (
                      <a
                        href={selectedPodcast.externalLinks.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                      >
                        🎵 Spotify
                      </a>
                    )}
                    {selectedPodcast.externalLinks.youtube && (
                      <a
                        href={selectedPodcast.externalLinks.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                      >
                        📺 YouTube
                      </a>
                    )}
                    {selectedPodcast.externalLinks.website && (
                      <a
                        href={selectedPodcast.externalLinks.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                      >
                        🌐 Website
                      </a>
                    )}
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPodcast.tags.map(tag => (
                      <span
                        key={tag}
                        className="inline-block px-3 py-1 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
