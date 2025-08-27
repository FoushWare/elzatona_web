"use client";

import { useState } from "react";
import Link from "next/link";

interface StudyPlan {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  duration: {
    weeks: number;
    hoursPerWeek: number;
    totalHours: number;
  };
  difficulty: "beginner" | "intermediate" | "advanced";
  color: string;
  features: string[];
  topics: StudyTopic[];
  schedule: StudyWeek[];
  prerequisites: string[];
  outcomes: string[];
  estimatedTimePerDay: number;
  isActive?: boolean;
  progress?: number;
}

interface StudyTopic {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  estimatedHours: number;
  resources: StudyResource[];
  practiceQuestions: string[];
}

interface StudyResource {
  id: string;
  title: string;
  type: "article" | "video" | "practice" | "quiz" | "project";
  url: string;
  description: string;
  estimatedTime: number;
}

interface StudyWeek {
  weekNumber: number;
  title: string;
  description: string;
  topics: string[];
  totalHours: number;
  dailySchedule: DailySchedule[];
}

interface DailySchedule {
  day: number;
  title: string;
  description: string;
  topics: string[];
  estimatedHours: number;
  tasks: StudyTask[];
}

interface StudyTask {
  id: string;
  title: string;
  description: string;
  type: "reading" | "practice" | "quiz" | "project" | "review";
  estimatedTime: number;
  resourceUrl?: string;
}

export default function StudyPlansPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [activePlan, setActivePlan] = useState<string | null>(null);
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);
  const [customization, setCustomization] = useState({
    dailyHours: 2,
    preferredTime: "morning",
    focusAreas: [] as string[],
    skipTopics: [] as string[],
  });

  const plans: StudyPlan[] = [
    {
      id: "one-week-intensive",
      title: "1 Week Intensive Plan",
      subtitle: "2 hours daily for 7 days",
      description:
        "Fast-track your preparation with focused daily sessions covering all essential topics. Perfect for last-minute interview preparation.",
      duration: {
        weeks: 1,
        hoursPerWeek: 14,
        totalHours: 14,
      },
      difficulty: "advanced",
      color: "from-red-500 to-pink-500",
      features: [
        "Structured Learning Path",
        "Progress Tracking",
        "Practice Exercises",
        "Mock Interviews",
        "Daily Assessments",
      ],
      topics: [
        {
          id: "js-fundamentals",
          title: "JavaScript Fundamentals",
          description:
            "Core JavaScript concepts including hoisting, closures, promises, and async/await",
          category: "javascript",
          difficulty: "medium",
          estimatedHours: 4,
          resources: [
            {
              id: "js-hoisting",
              title: "Understanding Hoisting",
              type: "article",
              url: "/questions/quiz/explain-hoisting",
              description: "Learn how hoisting works in JavaScript",
              estimatedTime: 30,
            },
            {
              id: "js-closures",
              title: "Closures Deep Dive",
              type: "practice",
              url: "/questions/javascript/closure",
              description: "Practice closure problems",
              estimatedTime: 45,
            },
          ],
          practiceQuestions: [
            "Explain hoisting in JavaScript",
            "What are closures and how do they work?",
            "Implement Promise.all from scratch",
            "Explain event loop and async/await",
          ],
        },
        {
          id: "react-basics",
          title: "React Core Concepts",
          description:
            "Essential React concepts including hooks, state management, and component lifecycle",
          category: "react",
          difficulty: "medium",
          estimatedHours: 4,
          resources: [
            {
              id: "react-hooks",
              title: "React Hooks Mastery",
              type: "practice",
              url: "/questions/react/hooks",
              description: "Practice React hooks problems",
              estimatedTime: 60,
            },
          ],
          practiceQuestions: [
            "Implement useCounter hook",
            "Explain useEffect dependencies",
            "Build a custom useDebounce hook",
            "State management with useContext",
          ],
        },
        {
          id: "css-styling",
          title: "CSS & Styling",
          description:
            "Advanced CSS concepts including Flexbox, Grid, and responsive design",
          category: "css",
          difficulty: "medium",
          estimatedHours: 3,
          resources: [
            {
              id: "css-layout",
              title: "CSS Layout Techniques",
              type: "practice",
              url: "/questions/user-interface/layout",
              description: "Practice CSS layout problems",
              estimatedTime: 45,
            },
          ],
          practiceQuestions: [
            "Build a responsive navigation",
            "Create a CSS Grid layout",
            "Implement a modal dialog",
            "Build a carousel component",
          ],
        },
        {
          id: "system-design",
          title: "System Design Basics",
          description: "Introduction to frontend system design concepts",
          category: "system-design",
          difficulty: "hard",
          estimatedHours: 3,
          resources: [
            {
              id: "autocomplete",
              title: "Autocomplete System Design",
              type: "practice",
              url: "/questions/system-design/autocomplete",
              description: "Design an autocomplete system",
              estimatedTime: 90,
            },
          ],
          practiceQuestions: [
            "Design an autocomplete component",
            "Build a real-time chat interface",
            "Design a file upload system",
            "Create a search functionality",
          ],
        },
      ],
      schedule: [
        {
          weekNumber: 1,
          title: "Intensive Preparation Week",
          description: "Daily focused sessions covering all essential topics",
          topics: [
            "JavaScript Fundamentals",
            "React Core Concepts",
            "CSS & Styling",
            "System Design Basics",
          ],
          totalHours: 14,
          dailySchedule: [
            {
              day: 1,
              title: "JavaScript Fundamentals Day 1",
              description: "Focus on hoisting, closures, and scope",
              topics: ["JavaScript Fundamentals"],
              estimatedHours: 2,
              tasks: [
                {
                  id: "js-hoisting-study",
                  title: "Study Hoisting Concepts",
                  description:
                    "Read about hoisting and complete practice problems",
                  type: "reading",
                  estimatedTime: 30,
                  resourceUrl: "/questions/quiz/explain-hoisting",
                },
                {
                  id: "js-closures-practice",
                  title: "Practice Closure Problems",
                  description: "Complete closure-related coding challenges",
                  type: "practice",
                  estimatedTime: 45,
                  resourceUrl: "/questions/javascript/closure",
                },
                {
                  id: "js-promises-study",
                  title: "Study Promises and Async/Await",
                  description: "Learn about promises and async programming",
                  type: "reading",
                  estimatedTime: 45,
                },
              ],
            },
          ],
        },
      ],
      prerequisites: [
        "Basic JavaScript knowledge",
        "Familiarity with HTML and CSS",
        "Understanding of web development concepts",
      ],
      outcomes: [
        "Master JavaScript fundamentals",
        "Build React applications confidently",
        "Create responsive web designs",
        "Understand system design principles",
        "Ready for technical interviews",
      ],
      estimatedTimePerDay: 2,
    },
    {
      id: "one-month-balanced",
      title: "1 Month Balanced Plan",
      subtitle: "6 hours weekly for 4 weeks",
      description:
        "Comprehensive preparation with a balanced approach to cover all essential topics thoroughly. Perfect for systematic learning.",
      duration: {
        weeks: 4,
        hoursPerWeek: 6,
        totalHours: 24,
      },
      difficulty: "intermediate",
      color: "from-blue-500 to-purple-500",
      features: [
        "Structured Learning Path",
        "Progress Tracking",
        "Practice Exercises",
        "Resource Library",
        "Community Support",
        "Weekly Assessments",
      ],
      topics: [
        {
          id: "js-comprehensive",
          title: "JavaScript Comprehensive",
          description:
            "Complete JavaScript mastery including ES6+, async programming, and advanced concepts",
          category: "javascript",
          difficulty: "medium",
          estimatedHours: 8,
          resources: [
            {
              id: "js-es6",
              title: "ES6+ Features",
              type: "article",
              url: "/questions/javascript/es6",
              description: "Learn modern JavaScript features",
              estimatedTime: 60,
            },
          ],
          practiceQuestions: [
            "Implement Promise.all from scratch",
            "Build a debounce function",
            "Create a deep clone function",
            "Implement event emitter",
          ],
        },
      ],
      schedule: [
        {
          weekNumber: 1,
          title: "JavaScript Fundamentals & React Basics",
          description: "Build strong foundation in JavaScript and React",
          topics: ["JavaScript Comprehensive"],
          totalHours: 6,
          dailySchedule: [
            {
              day: 1,
              title: "JavaScript ES6+ Features",
              description: "Learn modern JavaScript features",
              topics: ["JavaScript Comprehensive"],
              estimatedHours: 1.5,
              tasks: [
                {
                  id: "es6-study",
                  title: "Study ES6+ Features",
                  description:
                    "Learn about arrow functions, destructuring, and modules",
                  type: "reading",
                  estimatedTime: 45,
                  resourceUrl: "/questions/javascript/es6",
                },
              ],
            },
          ],
        },
      ],
      prerequisites: [
        "Basic JavaScript knowledge",
        "Familiarity with React basics",
        "Understanding of HTML and CSS",
      ],
      outcomes: [
        "Master JavaScript and React",
        "Build complex web applications",
        "Understand system design principles",
        "Confident in technical interviews",
        "Ready for senior-level positions",
      ],
      estimatedTimePerDay: 1.5,
    },
    {
      id: "three-months-comprehensive",
      title: "3 Months Comprehensive Plan",
      subtitle: "3 hours weekly for 12 weeks",
      description:
        "Deep dive into all aspects of frontend development with expert-level preparation and mastery. Perfect for career advancement.",
      duration: {
        weeks: 12,
        hoursPerWeek: 3,
        totalHours: 36,
      },
      difficulty: "advanced",
      color: "from-green-500 to-teal-500",
      features: [
        "Structured Learning Path",
        "Progress Tracking",
        "Practice Exercises",
        "Mock Interviews",
        "Resource Library",
        "Community Support",
        "Expert Mentorship",
        "Portfolio Building",
      ],
      topics: [
        {
          id: "js-mastery",
          title: "JavaScript Mastery",
          description:
            "Complete JavaScript mastery including advanced patterns and performance optimization",
          category: "javascript",
          difficulty: "hard",
          estimatedHours: 12,
          resources: [
            {
              id: "js-advanced-patterns",
              title: "Advanced JavaScript Patterns",
              type: "article",
              url: "/questions/javascript/advanced-patterns",
              description: "Learn advanced JavaScript patterns",
              estimatedTime: 90,
            },
          ],
          practiceQuestions: [
            "Implement a custom event system",
            "Build a module loader",
            "Create a virtual DOM",
            "Implement a state machine",
          ],
        },
      ],
      schedule: [
        {
          weekNumber: 1,
          title: "Month 1: Core Fundamentals & React Mastery",
          description: "Build strong foundation and master React",
          topics: ["JavaScript Mastery"],
          totalHours: 12,
          dailySchedule: [
            {
              day: 1,
              title: "JavaScript Deep Dive",
              description: "Advanced JavaScript concepts",
              topics: ["JavaScript Mastery"],
              estimatedHours: 3,
              tasks: [
                {
                  id: "js-advanced-study",
                  title: "Study Advanced JavaScript",
                  description:
                    "Learn advanced JavaScript patterns and concepts",
                  type: "reading",
                  estimatedTime: 90,
                  resourceUrl: "/questions/javascript/advanced-patterns",
                },
              ],
            },
          ],
        },
      ],
      prerequisites: [
        "Strong JavaScript foundation",
        "React experience",
        "Understanding of web development",
        "Basic system design knowledge",
      ],
      outcomes: [
        "Expert-level JavaScript and React",
        "Master system design principles",
        "Build enterprise applications",
        "Lead technical interviews",
        "Ready for principal-level positions",
      ],
      estimatedTimePerDay: 0.75,
    },
  ];

  const handleStartPlan = (planId: string) => {
    setActivePlan(planId);
    setSelectedPlan(planId);
    // In a real app, this would save to localStorage or database
    localStorage.setItem("activeStudyPlan", planId);
    localStorage.setItem("planStartDate", new Date().toISOString());
  };

  const handleCustomizePlan = (planId: string) => {
    setSelectedPlan(planId);
    setShowCustomizeModal(true);
  };

  const handleSaveCustomization = () => {
    if (selectedPlan) {
      localStorage.setItem(
        `planCustomization_${selectedPlan}`,
        JSON.stringify(customization)
      );
      setShowCustomizeModal(false);
      // Start the customized plan
      handleStartPlan(selectedPlan);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "text-green-600 bg-green-100";
      case "intermediate":
        return "text-blue-600 bg-blue-100";
      case "advanced":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "Beginner";
      case "intermediate":
        return "Intermediate";
      case "advanced":
        return "Advanced";
      default:
        return difficulty;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Interactive Study Plans
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose and customize your study plan. Start learning with structured
            content from GreatFrontend.com
          </p>
        </div>

        {/* Active Plan Banner */}
        {activePlan && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-blue-900">
                  Active Plan: {plans.find((p) => p.id === activePlan)?.title}
                </h3>
                <p className="text-blue-700">
                  Started on{" "}
                  {new Date(
                    localStorage.getItem("planStartDate") || ""
                  ).toLocaleDateString()}
                </p>
              </div>
              <Link
                href={`/study-plans/${activePlan}`}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Continue Learning
              </Link>
            </div>
          </div>
        )}

        {/* Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-lg shadow-lg overflow-hidden border-2 transition-all duration-300 hover:shadow-xl ${
                selectedPlan === plan.id
                  ? "border-blue-500 shadow-blue-100"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              {/* Plan Header */}
              <div className={`bg-gradient-to-r ${plan.color} p-6 text-white`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-bold">{plan.title}</h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                      plan.difficulty
                    )}`}
                  >
                    {getDifficultyBadge(plan.difficulty)}
                  </span>
                </div>
                <p className="text-blue-100 mb-4">{plan.subtitle}</p>
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {plan.duration.totalHours}
                    </div>
                    <div className="text-sm text-blue-100">Total Hours</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {plan.estimatedTimePerDay}
                    </div>
                    <div className="text-sm text-blue-100">Hours/Day</div>
                  </div>
                </div>
              </div>

              {/* Plan Content */}
              <div className="p-6">
                <p className="text-gray-700 mb-6">{plan.description}</p>

                {/* Topics Preview */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Topics Covered
                  </h4>
                  <div className="space-y-2">
                    {plan.topics.slice(0, 3).map((topic) => (
                      <div
                        key={topic.id}
                        className="flex items-center text-sm text-gray-700"
                      >
                        <svg
                          className="w-4 h-4 text-green-500 mr-2 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {topic.title}
                      </div>
                    ))}
                    {plan.topics.length > 3 && (
                      <div className="text-sm text-gray-600">
                        +{plan.topics.length - 3} more topics
                      </div>
                    )}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Features</h4>
                  <ul className="space-y-2">
                    {plan.features.slice(0, 3).map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center text-sm text-gray-700"
                      >
                        <svg
                          className="w-4 h-4 text-green-500 mr-2 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => handleStartPlan(plan.id)}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors duration-200"
                  >
                    Start Plan
                  </button>
                  <button
                    onClick={() => handleCustomizePlan(plan.id)}
                    className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-md font-medium hover:bg-gray-50 transition-colors duration-200"
                  >
                    Customize Plan
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Customization Modal */}
        {showCustomizeModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-xl font-bold mb-4">
                Customize Your Study Plan
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Daily Study Hours
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="8"
                    value={customization.dailyHours}
                    onChange={(e) =>
                      setCustomization({
                        ...customization,
                        dailyHours: parseInt(e.target.value),
                      })
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Study Time
                  </label>
                  <select
                    value={customization.preferredTime}
                    onChange={(e) =>
                      setCustomization({
                        ...customization,
                        preferredTime: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="morning">Morning</option>
                    <option value="afternoon">Afternoon</option>
                    <option value="evening">Evening</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Focus Areas (Optional)
                  </label>
                  <div className="space-y-2">
                    {[
                      "JavaScript",
                      "React",
                      "CSS",
                      "System Design",
                      "Algorithms",
                    ].map((area) => (
                      <label key={area} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={customization.focusAreas.includes(area)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setCustomization({
                                ...customization,
                                focusAreas: [...customization.focusAreas, area],
                              });
                            } else {
                              setCustomization({
                                ...customization,
                                focusAreas: customization.focusAreas.filter(
                                  (a) => a !== area
                                ),
                              });
                            }
                          }}
                          className="mr-2"
                        />
                        {area}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowCustomizeModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveCustomization}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                  Save & Start
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-xl mb-6 opacity-90">
              Choose your study plan and begin your frontend interview
              preparation journey
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                href="/questions"
                className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors duration-200"
              >
                Practice Questions
              </Link>
              <Link
                href="/preparation-guides"
                className="border-2 border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-blue-600 transition-colors duration-200"
              >
                Preparation Guides
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
