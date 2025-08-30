"use client";

import { useState } from "react";
import Link from "next/link";

interface SystemDesignFeature {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedTime: number;
  tags: string[];
  steps: string[];
  diagrams: string[];
  keyConcepts: string[];
  relatedTopics: string[];
  isCompleted?: boolean;
}

// Sample system design features - you can expand this with actual content
const systemDesignFeatures: SystemDesignFeature[] = [
  {
    id: "facebook-feed",
    title: "Facebook News Feed",
    description:
      "Design a real-time news feed system that shows personalized content to millions of users with low latency and high availability.",
    videoUrl: "https://www.youtube.com/watch?v=example1",
    thumbnail: "/api/placeholder/400/225",
    difficulty: "advanced",
    estimatedTime: 45,
    tags: ["Real-time", "Personalization", "Caching", "CDN", "Database"],
    steps: [
      "Define requirements and constraints",
      "Design high-level architecture",
      "Plan data models and storage",
      "Design caching strategy",
      "Implement real-time updates",
      "Optimize for performance",
    ],
    diagrams: [
      "System Architecture Diagram",
      "Data Flow Diagram",
      "Caching Strategy Diagram",
      "Database Schema",
    ],
    keyConcepts: [
      "Event-driven architecture",
      "Content delivery networks",
      "Database sharding",
      "Real-time messaging",
      "Personalization algorithms",
    ],
    relatedTopics: [
      "Real-time Systems",
      "Personalization",
      "Caching Strategies",
    ],
  },
  {
    id: "netflix-streaming",
    title: "Netflix Video Streaming",
    description:
      "Build a video streaming platform that can serve millions of concurrent users with adaptive bitrate streaming and global content delivery.",
    videoUrl: "https://www.youtube.com/watch?v=example2",
    thumbnail: "/api/placeholder/400/225",
    difficulty: "advanced",
    estimatedTime: 60,
    tags: [
      "Video Streaming",
      "CDN",
      "Adaptive Bitrate",
      "Load Balancing",
      "Microservices",
    ],
    steps: [
      "Define streaming requirements",
      "Design content delivery network",
      "Implement adaptive bitrate streaming",
      "Plan microservices architecture",
      "Design recommendation system",
      "Optimize for global scale",
    ],
    diagrams: [
      "CDN Architecture",
      "Adaptive Streaming Flow",
      "Microservices Diagram",
      "Global Distribution Map",
    ],
    keyConcepts: [
      "Adaptive bitrate streaming",
      "Content delivery networks",
      "Microservices architecture",
      "Load balancing",
      "Geographic distribution",
    ],
    relatedTopics: ["Video Streaming", "CDN", "Microservices"],
  },
  {
    id: "google-search",
    title: "Google Search Engine",
    description:
      "Design a search engine that can index billions of web pages and return relevant results in milliseconds.",
    videoUrl: "https://www.youtube.com/watch?v=example3",
    thumbnail: "/api/placeholder/400/225",
    difficulty: "advanced",
    estimatedTime: 75,
    tags: ["Search", "Indexing", "Ranking", "Distributed Systems", "Caching"],
    steps: [
      "Define search requirements",
      "Design web crawler system",
      "Plan indexing strategy",
      "Implement ranking algorithm",
      "Design distributed architecture",
      "Optimize for speed and relevance",
    ],
    diagrams: [
      "Search Architecture",
      "Indexing Process",
      "Ranking Algorithm",
      "Distributed System Map",
    ],
    keyConcepts: [
      "Web crawling",
      "Inverted indexing",
      "PageRank algorithm",
      "Distributed systems",
      "Query processing",
    ],
    relatedTopics: [
      "Search Algorithms",
      "Distributed Systems",
      "Information Retrieval",
    ],
  },
  {
    id: "uber-matching",
    title: "Uber Driver-Rider Matching",
    description:
      "Design a real-time matching system that connects drivers with riders efficiently while considering location, availability, and preferences.",
    videoUrl: "https://www.youtube.com/watch?v=example4",
    thumbnail: "/api/placeholder/400/225",
    difficulty: "intermediate",
    estimatedTime: 40,
    tags: [
      "Real-time Matching",
      "Geolocation",
      "Load Balancing",
      "Microservices",
    ],
    steps: [
      "Define matching requirements",
      "Design location tracking system",
      "Implement matching algorithm",
      "Plan real-time communication",
      "Design payment integration",
      "Optimize for efficiency",
    ],
    diagrams: [
      "Matching System Architecture",
      "Location Tracking Flow",
      "Real-time Communication",
      "Payment Integration",
    ],
    keyConcepts: [
      "Real-time matching",
      "Geolocation services",
      "Load balancing",
      "Real-time communication",
      "Payment processing",
    ],
    relatedTopics: ["Real-time Systems", "Geolocation", "Matching Algorithms"],
  },
  {
    id: "twitter-timeline",
    title: "Twitter Timeline",
    description:
      "Design a social media timeline that shows tweets from followed users in real-time with infinite scroll and engagement features.",
    videoUrl: "https://www.youtube.com/watch?v=example5",
    thumbnail: "/api/placeholder/400/225",
    difficulty: "intermediate",
    estimatedTime: 50,
    tags: [
      "Social Media",
      "Real-time",
      "Infinite Scroll",
      "Caching",
      "Database",
    ],
    steps: [
      "Define timeline requirements",
      "Design data models",
      "Implement real-time updates",
      "Plan caching strategy",
      "Design infinite scroll",
      "Optimize for performance",
    ],
    diagrams: [
      "Timeline Architecture",
      "Data Flow Diagram",
      "Caching Strategy",
      "Real-time Updates Flow",
    ],
    keyConcepts: [
      "Real-time updates",
      "Infinite scroll",
      "Caching strategies",
      "Database optimization",
      "Social graph",
    ],
    relatedTopics: ["Social Media", "Real-time Systems", "Caching"],
  },
];

export default function SystemDesignPage() {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [showStatistics, setShowStatistics] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    "all" | "beginner" | "intermediate" | "advanced"
  >("all");
  const [selectedTag, setSelectedTag] = useState("all");

  // Filter features based on search and filters
  const filteredFeatures = systemDesignFeatures.filter((feature) => {
    const matchesSearch =
      searchQuery === "" ||
      feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feature.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feature.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesDifficulty =
      selectedDifficulty === "all" || feature.difficulty === selectedDifficulty;
    const matchesTag =
      selectedTag === "all" || feature.tags.includes(selectedTag);

    return matchesSearch && matchesDifficulty && matchesTag;
  });

  // Get unique tags for filter
  const allTags = Array.from(
    new Set(systemDesignFeatures.flatMap((feature) => feature.tags))
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "text-success bg-success/20";
      case "intermediate":
        return "text-warning bg-warning/20";
      case "advanced":
        return "text-destructive bg-destructive/20";
      default:
        return "text-muted-foreground bg-muted";
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Frontend System Design
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Master frontend system design with real-world examples from YouTube
            tutorials
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="https://www.youtube.com/playlist?list=PLI9W87-Dqn7j_x6QtR6sUjycJR7nQLBqT"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
            >
              <span>📺</span>
              <span>Watch YouTube Playlist</span>
            </Link>
          </div>
          
          {/* Toggle Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowStatistics(!showStatistics)}
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              {showStatistics ? "Hide Statistics" : "Show Statistics"}
              <span className="ml-2">📊</span>
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
              <span className="ml-2">🔍</span>
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 transition-all duration-300 ${
          showStatistics ? 'block' : 'hidden md:grid'
        }`}>
          <div className="bg-card rounded-lg shadow-sm border border-border p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {systemDesignFeatures.length}
            </div>
            <div className="text-card-foreground font-medium">
              System Designs
            </div>
          </div>
          <div className="bg-card rounded-lg shadow-sm border border-border p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {systemDesignFeatures.reduce(
                (sum, feature) => sum + feature.estimatedTime,
                0
              )}
            </div>
            <div className="text-card-foreground font-medium">
              Total Minutes
            </div>
          </div>
          <div className="bg-card rounded-lg shadow-sm border border-border p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {systemDesignFeatures.filter((f) => f.isCompleted).length}
            </div>
            <div className="text-card-foreground font-medium">Completed</div>
          </div>
          <div className="bg-card rounded-lg shadow-sm border border-border p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {allTags.length}
            </div>
            <div className="text-card-foreground font-medium">
              Topics Covered
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className={`bg-card rounded-lg shadow-sm border border-border p-6 mb-8 transition-all duration-300 ${
          showFilters ? 'block' : 'hidden md:block'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="search"
                className="block text-sm font-medium text-card-foreground mb-2"
              >
                Search System Designs
              </label>
              <input
                type="text"
                id="search"
                placeholder="Search by title, description, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
              />
            </div>
            <div>
              <label
                htmlFor="difficulty"
                className="block text-sm font-medium text-card-foreground mb-2"
              >
                Difficulty
              </label>
              <select
                id="difficulty"
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value as any)}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
              >
                <option value="all">All Difficulties</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="tag"
                className="block text-sm font-medium text-card-foreground mb-2"
              >
                Topic
              </label>
              <select
                id="tag"
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
              >
                <option value="all">All Topics</option>
                {allTags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* System Design Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredFeatures.map((feature) => (
            <div
              key={feature.id}
              className="bg-card rounded-lg shadow-sm border border-border p-6 hover:shadow-md transition-shadow"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-foreground hover:text-blue-600 cursor-pointer">
                  {feature.title}
                </h3>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(
                      feature.difficulty
                    )}`}
                  >
                    {feature.difficulty}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground mb-4">
                {feature.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {feature.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded dark:bg-blue-900/20 dark:text-blue-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Key Information */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-sm">
                  <span className="text-muted-foreground">⏱️ Duration:</span>
                  <span className="ml-1 font-medium">
                    {feature.estimatedTime} min
                  </span>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">📊 Steps:</span>
                  <span className="ml-1 font-medium">
                    {feature.steps.length}
                  </span>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">📐 Diagrams:</span>
                  <span className="ml-1 font-medium">
                    {feature.diagrams.length}
                  </span>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">💡 Concepts:</span>
                  <span className="ml-1 font-medium">
                    {feature.keyConcepts.length}
                  </span>
                </div>
              </div>

              {/* Key Concepts Preview */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-card-foreground mb-2">
                  Key Concepts:
                </h4>
                <div className="flex flex-wrap gap-1">
                  {feature.keyConcepts.slice(0, 3).map((concept) => (
                    <span
                      key={concept}
                      className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded"
                    >
                      {concept}
                    </span>
                  ))}
                  {feature.keyConcepts.length > 3 && (
                    <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded">
                      +{feature.keyConcepts.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    Watch Video
                  </button>
                  <button className="px-4 py-2 border border-border text-foreground rounded-lg hover:bg-accent transition-colors text-sm">
                    View Details
                  </button>
                </div>
                {feature.isCompleted && (
                  <span className="text-green-600 text-sm font-medium">
                    ✅ Completed
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredFeatures.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No system designs found
            </h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or filters
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedDifficulty("all");
                setSelectedTag("all");
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Master System Design?
            </h2>
            <p className="text-xl mb-6 opacity-90">
              Start with these real-world examples and build your system design
              skills
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                href="https://www.youtube.com/playlist?list=PLI9W87-Dqn7j_x6QtR6sUjycJR7nQLBqT"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-background text-primary px-6 py-3 rounded-md font-medium hover:bg-background/90 transition-colors duration-200"
              >
                Start Learning
              </Link>
              <Link
                href="/practice/advanced"
                className="border-2 border-primary-foreground text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary-foreground hover:text-primary transition-colors duration-200"
              >
                Advanced Topics
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
