'use client';

import { useState, useMemo } from 'react';
import { podcastShows, podcastCategories } from '@/lib/podcasts';
import Link from 'next/link';

export default function PodcastsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredPodcasts = useMemo(() => {
    let filtered = podcastShows;

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            🎧 Podcasts
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover amazing frontend development podcasts. Click any podcast to
            listen on Apple Podcasts.
          </p>
        </div>

        {/* Filter and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Category Filter */}
          <div className="flex-1">
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {podcastCategories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.icon} {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search podcasts..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            Showing {filteredPodcasts.length} podcast
            {filteredPodcasts.length !== 1 ? 's' : ''}
            {selectedCategory !== 'all' &&
              ` in ${podcastCategories.find(c => c.id === selectedCategory)?.name}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>

        {/* Podcast Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredPodcasts.map(podcast => (
            <div
              key={podcast.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-200 dark:border-gray-700"
            >
              {/* Podcast Image */}
              <div className="p-6 pb-4">
                {/* Podcast Artwork */}
                <div className="w-full h-56 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 relative overflow-hidden shadow-lg border-2 border-gray-200 dark:border-gray-600">
                  {podcast.thumbnail ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={podcast.thumbnail}
                      alt={podcast.title}
                      className="w-full h-full object-cover rounded-xl"
                      loading="lazy"
                      onError={e => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling.style.display =
                          'flex';
                      }}
                    />
                  ) : null}
                  <div
                    className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl"
                    style={{ display: podcast.thumbnail ? 'none' : 'flex' }}
                  >
                    <span className="text-6xl">🎧</span>
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-10 rounded-xl"></div>
                </div>

                {/* Podcast Info */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    {podcast.episodeCount} Episodes
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {podcast.language}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {podcast.title}
                </h3>

                {/* Host */}
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  by {podcast.host}
                </p>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {podcast.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {podcast.tags.slice(0, 4).map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                  {podcast.tags.length > 4 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs">
                      +{podcast.tags.length - 4} more
                    </span>
                  )}
                </div>

                {/* Last Updated */}
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                  Last updated: {podcast.lastUpdated}
                </p>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <a
                    href={podcast.externalLinks.apple}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium text-center"
                  >
                    🎧 Listen on Apple Podcasts
                  </a>
                  {podcast.externalLinks.website && (
                    <a
                      href={podcast.externalLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 text-sm font-medium"
                    >
                      🌐 Website
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredPodcasts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No podcasts found
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Try adjusting your search terms or filters to find what
              you&apos;re looking for.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center py-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Want to add your podcast?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            We&apos;re always looking for high-quality frontend development
            podcasts to feature
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
}
