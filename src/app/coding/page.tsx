"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  codingChallenges,
  getChallengesByCategory,
  getChallengesByDifficulty,
} from "@/lib/codingChallenges";

export default function CodingPage() {
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "frontend" | "problem-solving"
  >("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    "all" | "easy" | "medium" | "hard"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChallenges = useMemo(() => {
    let filtered = codingChallenges;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = getChallengesByCategory(selectedCategory);
    }

    // Filter by difficulty
    if (selectedDifficulty !== "all") {
      filtered = filtered.filter(
        (challenge) => challenge.difficulty === selectedDifficulty
      );
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (challenge) =>
          challenge.title.toLowerCase().includes(query) ||
          challenge.description.toLowerCase().includes(query) ||
          challenge.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [selectedCategory, selectedDifficulty, searchQuery]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "badge-success";
      case "medium":
        return "badge-warning";
      case "hard":
        return "badge-destructive";
      default:
        return "badge-secondary";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "frontend":
        return "🎨";
      case "problem-solving":
        return "🧮";
      default:
        return "💻";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4 tracking-tight">
              Coding Challenges
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Practice your coding skills with interactive challenges. Write
              code, run tests, and improve your problem-solving abilities.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search challenges..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input w-full pl-10"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Category and Difficulty Filters */}
          <div className="flex flex-wrap gap-4">
            {/* Category Filter */}
            <div className="flex-1 min-w-48">
              <label className="form-label">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) =>
                  setSelectedCategory(e.target.value as "all" | "frontend" | "problem-solving")
                }
                className="form-input"
              >
                <option value="all">All Categories</option>
                <option value="frontend">Frontend Challenges</option>
                <option value="problem-solving">Problem Solving</option>
              </select>
            </div>

            {/* Difficulty Filter */}
            <div className="flex-1 min-w-48">
              <label className="form-label">Difficulty</label>
              <select
                value={selectedDifficulty}
                onChange={(e) =>
                  setSelectedDifficulty(e.target.value as "all" | "easy" | "medium" | "hard")
                }
                className="form-input"
              >
                <option value="all">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {codingChallenges.length}
            </div>
            <div className="text-sm text-muted-foreground">Total Challenges</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-success mb-1">
              {codingChallenges.filter((c) => c.difficulty === "easy").length}
            </div>
            <div className="text-sm text-muted-foreground">Easy</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-warning mb-1">
              {codingChallenges.filter((c) => c.difficulty === "medium").length}
            </div>
            <div className="text-sm text-muted-foreground">Medium</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-destructive mb-1">
              {codingChallenges.filter((c) => c.difficulty === "hard").length}
            </div>
            <div className="text-sm text-muted-foreground">Hard</div>
          </div>
        </div>

        {/* Challenges Grid */}
        {filteredChallenges.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No challenges found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or filters.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChallenges.map((challenge) => (
              <div
                key={challenge.id}
                className="card cursor-pointer transition-smooth"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">
                        {getCategoryIcon(challenge.category)}
                      </span>
                      <h3 className="text-lg font-semibold text-card-foreground leading-tight">
                        {challenge.title}
                      </h3>
                    </div>
                    <span className={`badge ${getDifficultyColor(challenge.difficulty)}`}>
                      {challenge.difficulty}
                    </span>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3 leading-relaxed">
                    {challenge.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {challenge.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                    {challenge.tags.length > 3 && (
                      <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded font-medium">
                        +{challenge.tags.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <span className="font-medium">
                      {challenge.estimatedTime} min
                    </span>
                    <span className="font-medium">
                      {challenge.completionRate}% success rate
                    </span>
                  </div>

                  <Link
                    href={`/coding/${challenge.id}`}
                    className="btn-primary w-full text-center"
                  >
                    Start Challenge
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
