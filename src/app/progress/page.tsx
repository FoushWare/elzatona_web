"use client";

import { useState, useEffect } from "react";
import { 
  LearningItem, 
  LearningGoal, 
  ProgressStats, 
  LearningRecommendation,
  sampleLearningItems,
  sampleLearningGoals,
  calculateProgressStats,
  getLearningRecommendations,
  getCategoryIcon,
  getDifficultyColor,
  getDifficultyBgColor,
  getPriorityColor,
  getPriorityBgColor,
  formatTime
} from "@/lib/progress";

export default function ProgressPage() {
  const [learningItems, setLearningItems] = useState<LearningItem[]>(sampleLearningItems);
  const [learningGoals, setLearningGoals] = useState<LearningGoal[]>(sampleLearningGoals);
  const [activeTab, setActiveTab] = useState<"overview" | "learning-items" | "goals" | "recommendations">("overview");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterDifficulty, setFilterDifficulty] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const progressStats = calculateProgressStats(learningItems);
  const recommendations = getLearningRecommendations(learningItems);

  const toggleItemCompletion = (itemId: string) => {
    setLearningItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { 
              ...item, 
              isCompleted: !item.isCompleted,
              completedAt: !item.isCompleted ? new Date() : undefined
            }
          : item
      )
    );
  };

  const updateActualTime = (itemId: string, timeSpent: number) => {
    setLearningItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, actualTimeSpent: timeSpent }
          : item
      )
    );
  };

  const filteredItems = learningItems.filter(item => {
    const matchesCategory = filterCategory === "all" || item.category === filterCategory;
    const matchesDifficulty = filterDifficulty === "all" || item.difficulty === filterDifficulty;
    const matchesStatus = filterStatus === "all" || 
      (filterStatus === "completed" && item.isCompleted) ||
      (filterStatus === "pending" && !item.isCompleted);
    const matchesSearch = searchQuery === "" || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesDifficulty && matchesStatus && matchesSearch;
  });

  const categories = Array.from(new Set(learningItems.map(item => item.category)));
  const difficulties = ["beginner", "intermediate", "advanced"];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Learning Progress Tracker</h1>
          <p className="text-gray-400 mt-2">
            Track your learning journey and prepare for frontend interviews
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex space-x-1 mb-8">
          {[
            { id: "overview", label: "Overview", icon: "📊" },
            { id: "learning-items", label: "Learning Items", icon: "📚" },
            { id: "goals", label: "Goals", icon: "🎯" },
            { id: "recommendations", label: "Recommendations", icon: "💡" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Progress Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Items</p>
                    <p className="text-2xl font-bold">{progressStats.totalItems}</p>
                  </div>
                  <div className="text-3xl">📚</div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Completed</p>
                    <p className="text-2xl font-bold text-green-400">{progressStats.completedItems}</p>
                  </div>
                  <div className="text-3xl">✅</div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Progress</p>
                    <p className="text-2xl font-bold text-blue-400">{progressStats.completionPercentage}%</p>
                  </div>
                  <div className="text-3xl">📈</div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Time Spent</p>
                    <p className="text-2xl font-bold text-yellow-400">
                      {formatTime(progressStats.totalActualTime)}
                    </p>
                  </div>
                  <div className="text-3xl">⏱️</div>
                </div>
              </div>
            </div>

            {/* Progress Bars */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Category Progress */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Progress by Category</h3>
                <div className="space-y-4">
                  {Object.entries(progressStats.categoryBreakdown).map(([category, stats]) => (
                    <div key={category}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span>{getCategoryIcon(category)}</span>
                          <span className="capitalize">{category}</span>
                        </div>
                        <span className="text-sm text-gray-400">
                          {stats.completed}/{stats.total} ({stats.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${stats.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Difficulty Progress */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Progress by Difficulty</h3>
                <div className="space-y-4">
                  {Object.entries(progressStats.difficultyBreakdown).map(([difficulty, stats]) => (
                    <div key={difficulty}>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`capitalize ${getDifficultyColor(difficulty)}`}>
                          {difficulty}
                        </span>
                        <span className="text-sm text-gray-400">
                          {stats.completed}/{stats.total} ({stats.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${getDifficultyBgColor(difficulty)}`}
                          style={{ width: `${stats.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {learningItems
                  .filter(item => item.isCompleted)
                  .sort((a, b) => new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime())
                  .slice(0, 5)
                  .map(item => (
                    <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
                      <span className="text-green-400">✅</span>
                      <div className="flex-1">
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-gray-400">
                          Completed {new Date(item.completedAt!).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="text-sm text-gray-400">
                        {formatTime(item.estimatedTime)}
                      </span>
                    </div>
                  ))}
                {learningItems.filter(item => item.isCompleted).length === 0 && (
                  <p className="text-gray-400 text-center py-4">
                    No completed items yet. Start learning to see your progress!
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "learning-items" && (
          <div className="space-y-6">
            {/* Filters and Search */}
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-gray-300"
                  >
                    <option value="all">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {getCategoryIcon(category)} {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Difficulty</label>
                  <select
                    value={filterDifficulty}
                    onChange={(e) => setFilterDifficulty(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-gray-300"
                  >
                    <option value="all">All Difficulties</option>
                    {difficulties.map(difficulty => (
                      <option key={difficulty} value={difficulty}>
                        {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-gray-300"
                  >
                    <option value="all">All Items</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Search</label>
                  <input
                    type="text"
                    placeholder="Search items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-gray-300"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-gray-400">
                  Showing {filteredItems.length} of {learningItems.length} items
                </p>
                <div className="text-sm text-gray-400">
                  Total estimated time: {formatTime(filteredItems.reduce((sum, item) => sum + item.estimatedTime, 0))}
                </div>
              </div>
            </div>

            {/* Learning Items Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredItems.map(item => (
                <div key={item.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{getCategoryIcon(item.category)}</span>
                      <div>
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                        <p className="text-gray-400 text-sm capitalize">
                          {item.category} • {item.subCategory}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyBgColor(item.difficulty)}`}>
                        {item.difficulty}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityBgColor(item.priority)}`}>
                        {item.priority}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-4">{item.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                    {item.tags.length > 3 && (
                      <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-xs">
                        +{item.tags.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>⏱️ {formatTime(item.estimatedTime)}</span>
                      {item.actualTimeSpent && (
                        <span>⏱️ {formatTime(item.actualTimeSpent)}</span>
                      )}
                    </div>

                    <div className="flex items-center space-x-3">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={item.isCompleted}
                          onChange={() => toggleItemCompletion(item.id)}
                          className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm">Complete</span>
                      </label>
                    </div>
                  </div>

                  {item.isCompleted && (
                    <div className="mt-4 p-3 bg-green-900/20 border border-green-700 rounded-lg">
                      <div className="flex items-center space-x-2 text-green-400">
                        <span>✅</span>
                        <span className="text-sm font-medium">Completed</span>
                        <span className="text-gray-400">
                          on {new Date(item.completedAt!).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-lg font-medium text-gray-200 mb-2">No items found</h3>
                <p className="text-gray-400">
                  Try adjusting your filters or search query
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === "goals" && (
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Learning Goals</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {learningGoals.map(goal => {
                  const goalItems = learningItems.filter(item => goal.learningItems.includes(item.id));
                  const completedItems = goalItems.filter(item => item.isCompleted).length;
                  const progress = goalItems.length > 0 ? (completedItems / goalItems.length) * 100 : 0;
                  const daysLeft = Math.ceil((new Date(goal.targetDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));

                  return (
                    <div key={goal.id} className="bg-gray-700 rounded-lg p-6 border border-gray-600">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-lg mb-2">{goal.title}</h4>
                          <p className="text-gray-300 text-sm mb-3">{goal.description}</p>
                        </div>
                        <div className="text-2xl">🎯</div>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Progress</span>
                          <span className="text-blue-400">{completedItems}/{goalItems.length} items</span>
                        </div>
                        <div className="w-full bg-gray-600 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-400">Target Date</p>
                          <p className="font-medium">
                            {new Date(goal.targetDate).toLocaleDateString()}
                            {daysLeft > 0 && (
                              <span className="text-yellow-400 ml-2">({daysLeft} days left)</span>
                            )}
                            {daysLeft <= 0 && (
                              <span className="text-red-400 ml-2">(Overdue)</span>
                            )}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400">Time Goal</p>
                          <p className="font-medium">{goal.targetHours}h</p>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-600">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">Goal Items</span>
                          <span className="text-sm text-gray-400">{progress.toFixed(0)}%</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {goalItems.slice(0, 3).map(item => (
                            <span 
                              key={item.id} 
                              className={`px-2 py-1 rounded-full text-xs ${
                                item.isCompleted 
                                  ? 'bg-green-600 text-white' 
                                  : 'bg-gray-600 text-gray-300'
                              }`}
                            >
                              {item.title}
                            </span>
                          ))}
                          {goalItems.length > 3 && (
                            <span className="px-2 py-1 bg-gray-600 text-gray-300 rounded-full text-xs">
                              +{goalItems.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === "recommendations" && (
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Recommended Next Steps</h3>
              <p className="text-gray-400 mb-6">
                Based on your current progress, here are the items we recommend you tackle next:
              </p>
              
              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <div key={rec.id} className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="text-2xl">{index + 1}</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg mb-2">{rec.title}</h4>
                          <p className="text-gray-300 text-sm mb-3">{rec.reason}</p>
                          <div className="flex items-center space-x-4 text-sm">
                            <span className={`px-2 py-1 rounded-full ${getDifficultyBgColor(rec.difficulty)}`}>
                              {rec.difficulty}
                            </span>
                            <span className={`px-2 py-1 rounded-full ${getPriorityBgColor(rec.priority)}`}>
                              {rec.priority} priority
                            </span>
                            <span className="text-gray-400">⏱️ {formatTime(rec.estimatedTime)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-3xl">{getCategoryIcon(rec.category)}</div>
                    </div>
                  </div>
                ))}
              </div>

              {recommendations.length === 0 && (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🎉</div>
                  <h3 className="text-lg font-medium text-gray-200 mb-2">All caught up!</h3>
                  <p className="text-gray-400">
                    You've completed all available learning items. Great job!
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
