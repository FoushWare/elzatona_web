"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function StudyPlanDetailPage() {
  const params = useParams();
  const planId = params.id as string;

  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [currentWeek, setCurrentWeek] = useState(1);

  useEffect(() => {
    // Load progress from localStorage
    const savedProgress = localStorage.getItem(`planProgress_${planId}`);
    if (savedProgress) {
      setCompletedTasks(JSON.parse(savedProgress));
    }
  }, [planId]);

  const handleTaskComplete = (taskId: string) => {
    const newCompletedTasks = completedTasks.includes(taskId)
      ? completedTasks.filter((id) => id !== taskId)
      : [...completedTasks, taskId];

    setCompletedTasks(newCompletedTasks);
    localStorage.setItem(
      `planProgress_${planId}`,
      JSON.stringify(newCompletedTasks)
    );
  };

  const getTaskTypeIcon = (type: string) => {
    switch (type) {
      case "reading":
        return "📖";
      case "practice":
        return "💻";
      case "quiz":
        return "❓";
      case "project":
        return "🚀";
      case "review":
        return "📝";
      default:
        return "📋";
    }
  };

  const calculateProgress = (tasks: { id: string }[]) => {
    if (tasks.length === 0) return 0;
    const completed = tasks.filter((task) =>
      completedTasks.includes(task.id)
    ).length;
    return Math.round((completed / tasks.length) * 100);
  };

  // Get plan data based on planId
  const getPlanData = (id: string) => {
    switch (id) {
      case "one-week-intensive":
        return {
          title: "1 Week Intensive Plan",
          subtitle: "2 hours daily for 7 days",
          description:
            "Fast-track your preparation with focused daily sessions covering all essential topics.",
          totalHours: 14,
          weeks: 1,
          hoursPerDay: 2,
          difficulty: "Advanced",
          schedule: [
            {
              day: 1,
              title: "JavaScript Fundamentals Day 1",
              description: "Focus on hoisting, closures, and scope",
              tasks: [
                {
                  id: "js-hoisting-study",
                  title: "Study Hoisting Concepts",
                  description:
                    "Read about hoisting and complete practice problems",
                  type: "reading",
                  time: 30,
                  url: "/questions/quiz/explain-hoisting",
                },
                {
                  id: "js-closures-practice",
                  title: "Practice Closure Problems",
                  description: "Complete closure-related coding challenges",
                  type: "practice",
                  time: 45,
                  url: "/questions/javascript/closure",
                },
                {
                  id: "js-promises-study",
                  title: "Study Promises and Async/Await",
                  description: "Learn about promises and async programming",
                  type: "reading",
                  time: 45,
                  url: "/questions/javascript/promises",
                },
              ],
            },
            {
              day: 2,
              title: "React Fundamentals Day 2",
              description: "Learn React hooks and component patterns",
              tasks: [
                {
                  id: "react-hooks-practice",
                  title: "Practice React Hooks",
                  description: "Complete React hooks exercises",
                  type: "practice",
                  time: 60,
                  url: "/questions/react/hooks",
                },
                {
                  id: "react-concepts-study",
                  title: "Study React State Management",
                  description:
                    "Learn about useState, useContext, and useReducer",
                  type: "practice",
                  time: 60,
                  url: "/questions/react/state-management",
                },
              ],
            },
            {
              day: 3,
              title: "CSS & Layout Day 3",
              description: "Master CSS layout and responsive design",
              tasks: [
                {
                  id: "css-layout-practice",
                  title: "Practice CSS Layout",
                  description: "Complete layout challenges",
                  type: "practice",
                  time: 45,
                  url: "/questions/user-interface/layout",
                },
                {
                  id: "responsive-design-project",
                  title: "CSS Grid & Flexbox Practice",
                  description: "Practice CSS Grid and Flexbox concepts",
                  type: "practice",
                  time: 75,
                  url: "/questions/user-interface/grid-flexbox",
                },
              ],
            },
            {
              day: 4,
              title: "System Design Day 4",
              description: "Learn system design principles",
              tasks: [
                {
                  id: "system-design-practice",
                  title: "Practice System Design",
                  description: "Complete system design problems",
                  type: "practice",
                  time: 90,
                  url: "/questions/system-design/autocomplete",
                },
              ],
            },
            {
              day: 5,
              title: "Advanced JavaScript Day 5",
              description: "Deep dive into advanced JavaScript concepts",
              tasks: [
                {
                  id: "advanced-js-practice",
                  title: "Advanced JavaScript Practice",
                  description: "Complete advanced JavaScript challenges",
                  type: "practice",
                  time: 60,
                },
                {
                  id: "algorithms-practice",
                  title: "Practice Algorithm Problems",
                  description: "Practice algorithm problems in JavaScript",
                  type: "practice",
                  time: 60,
                },
              ],
            },
            {
              day: 6,
              title: "Review & Practice Day 6",
              description: "Review all learned concepts",
              tasks: [
                {
                  id: "concept-review",
                  title: "Review All Concepts",
                  description: "Review all learned concepts",
                  type: "review",
                  time: 60,
                },
                {
                  id: "mock-interview-practice",
                  title: "Practice Mock Interview Questions",
                  description: "Practice with mock interview questions",
                  type: "practice",
                  time: 60,
                },
              ],
            },
            {
              day: 7,
              title: "Final Assessment Day 7",
              description: "Complete final assessment and mock interview",
              tasks: [
                {
                  id: "final-mock-interview",
                  title: "Complete Full Mock Interview",
                  description: "Complete a full mock interview",
                  type: "practice",
                  time: 90,
                },
                {
                  id: "final-review",
                  title: "Quick Review of Key Concepts",
                  description: "Quick review of key concepts",
                  type: "review",
                  time: 30,
                },
              ],
            },
          ],
        };
      case "one-month-balanced":
        return {
          title: "1 Month Balanced Plan",
          subtitle: "6 hours weekly for 4 weeks",
          description:
            "Comprehensive preparation with a balanced approach to cover all essential topics thoroughly.",
          totalHours: 24,
          weeks: 4,
          hoursPerDay: 1.5,
          difficulty: "Intermediate",
          schedule: [
            {
              day: 1,
              title: "Week 1: JavaScript Fundamentals",
              description: "Start with core JavaScript concepts",
              tasks: [
                {
                  id: "js-basics-review",
                  title: "JavaScript Basics Review",
                  description: "Review fundamental JavaScript concepts",
                  type: "reading",
                  time: 45,
                },
                {
                  id: "js-hoisting-practice",
                  title: "Hoisting Practice",
                  description: "Practice hoisting concepts",
                  type: "practice",
                  time: 45,
                  url: "/questions/quiz/explain-hoisting",
                },
              ],
            },
            {
              day: 2,
              title: "Week 1: Advanced JavaScript",
              description: "Deep dive into advanced JavaScript",
              tasks: [
                {
                  id: "js-closures-practice",
                  title: "Closures Practice",
                  description: "Practice closure concepts",
                  type: "practice",
                  time: 60,
                  url: "/questions/javascript/closure",
                },
                {
                  id: "js-promises-practice",
                  title: "Promises Practice",
                  description: "Practice promise and async concepts",
                  type: "practice",
                  time: 60,
                  url: "/questions/javascript/promises",
                },
              ],
            },
            {
              day: 3,
              title: "Week 2: React Fundamentals",
              description: "Learn React core concepts",
              tasks: [
                {
                  id: "react-hooks-practice",
                  title: "React Hooks Practice",
                  description: "Practice React hooks",
                  type: "practice",
                  time: 60,
                  url: "/questions/react/hooks",
                },
                {
                  id: "react-state-practice",
                  title: "State Management Practice",
                  description: "Practice React state management",
                  type: "practice",
                  time: 60,
                  url: "/questions/react/state-management",
                },
              ],
            },
            {
              day: 4,
              title: "Week 2: CSS & Layout",
              description: "Master CSS layout techniques",
              tasks: [
                {
                  id: "css-layout-practice",
                  title: "CSS Layout Practice",
                  description: "Practice CSS layout concepts",
                  type: "practice",
                  time: 45,
                  url: "/questions/user-interface/layout",
                },
                {
                  id: "responsive-design",
                  title: "Responsive Design Project",
                  description: "Build responsive components",
                  type: "project",
                  time: 75,
                },
              ],
            },
            {
              day: 5,
              title: "Week 3: System Design",
              description: "Learn system design principles",
              tasks: [
                {
                  id: "system-design-practice",
                  title: "System Design Practice",
                  description: "Practice system design concepts",
                  type: "practice",
                  time: 90,
                  url: "/questions/system-design/autocomplete",
                },
              ],
            },
            {
              day: 6,
              title: "Week 4: Advanced Topics",
              description: "Cover advanced frontend concepts",
              tasks: [
                {
                  id: "advanced-js-practice",
                  title: "Advanced JavaScript Practice",
                  description: "Practice advanced JavaScript concepts",
                  type: "practice",
                  time: 60,
                },
                {
                  id: "performance-optimization",
                  title: "Performance Optimization",
                  description: "Learn about performance optimization",
                  type: "reading",
                  time: 60,
                },
              ],
            },
            {
              day: 7,
              title: "Week 4: Final Review",
              description: "Comprehensive review and mock interview",
              tasks: [
                {
                  id: "comprehensive-review",
                  title: "Comprehensive Review",
                  description: "Review all learned concepts",
                  type: "review",
                  time: 60,
                },
                {
                  id: "mock-interview",
                  title: "Mock Interview",
                  description: "Complete a full mock interview",
                  type: "practice",
                  time: 90,
                },
              ],
            },
          ],
        };
      case "three-months-comprehensive":
        return {
          title: "3 Months Comprehensive Plan",
          subtitle: "3 hours weekly for 12 weeks",
          description:
            "Thorough preparation covering all aspects of frontend development with extensive practice.",
          totalHours: 36,
          weeks: 12,
          hoursPerDay: 1,
          difficulty: "Beginner",
          schedule: [
            {
              day: 1,
              title: "Week 1: Introduction to Frontend",
              description: "Start your frontend journey",
              tasks: [
                {
                  id: "frontend-intro",
                  title: "Frontend Development Introduction",
                  description: "Learn about frontend development basics",
                  type: "reading",
                  time: 60,
                },
                {
                  id: "html-css-basics",
                  title: "HTML & CSS Basics",
                  description: "Practice HTML and CSS fundamentals",
                  type: "practice",
                  time: 60,
                },
              ],
            },
            {
              day: 2,
              title: "Week 1: JavaScript Introduction",
              description: "Begin learning JavaScript",
              tasks: [
                {
                  id: "js-intro-study",
                  title: "JavaScript Introduction",
                  description: "Learn JavaScript basics and syntax",
                  type: "reading",
                  time: 45,
                },
                {
                  id: "js-basic-practice",
                  title: "Basic JavaScript Practice",
                  description: "Practice basic JavaScript concepts",
                  type: "practice",
                  time: 45,
                },
              ],
            },
            {
              day: 3,
              title: "Week 2: JavaScript Fundamentals",
              description: "Deep dive into JavaScript basics",
              tasks: [
                {
                  id: "js-hoisting-practice",
                  title: "Hoisting Practice",
                  description: "Practice hoisting concepts",
                  type: "practice",
                  time: 45,
                  url: "/questions/quiz/explain-hoisting",
                },
                {
                  id: "js-closures-practice",
                  title: "Closures Practice",
                  description: "Practice closure concepts",
                  type: "practice",
                  time: 45,
                  url: "/questions/javascript/closure",
                },
              ],
            },
            {
              day: 4,
              title: "Week 3: Advanced JavaScript",
              description: "Learn advanced JavaScript concepts",
              tasks: [
                {
                  id: "js-promises-practice",
                  title: "Promises Practice",
                  description: "Practice promise and async concepts",
                  type: "practice",
                  time: 60,
                  url: "/questions/javascript/promises",
                },
                {
                  id: "js-advanced-concepts",
                  title: "Advanced JavaScript Concepts",
                  description: "Learn about prototypes, classes, and modules",
                  type: "reading",
                  time: 60,
                },
              ],
            },
            {
              day: 5,
              title: "Week 4: React Introduction",
              description: "Start learning React",
              tasks: [
                {
                  id: "react-intro",
                  title: "React Introduction",
                  description: "Learn React basics and JSX",
                  type: "reading",
                  time: 60,
                },
                {
                  id: "react-components",
                  title: "React Components",
                  description: "Practice creating React components",
                  type: "practice",
                  time: 60,
                },
              ],
            },
            {
              day: 6,
              title: "Week 5: React Hooks",
              description: "Learn React hooks",
              tasks: [
                {
                  id: "react-hooks-practice",
                  title: "React Hooks Practice",
                  description: "Practice React hooks",
                  type: "practice",
                  time: 60,
                  url: "/questions/react/hooks",
                },
                {
                  id: "react-state-practice",
                  title: "State Management Practice",
                  description: "Practice React state management",
                  type: "practice",
                  time: 60,
                  url: "/questions/react/state-management",
                },
              ],
            },
            {
              day: 7,
              title: "Week 6: CSS & Styling",
              description: "Master CSS and styling",
              tasks: [
                {
                  id: "css-layout-practice",
                  title: "CSS Layout Practice",
                  description: "Practice CSS layout concepts",
                  type: "practice",
                  time: 45,
                  url: "/questions/user-interface/layout",
                },
                {
                  id: "css-advanced",
                  title: "Advanced CSS",
                  description: "Learn advanced CSS techniques",
                  type: "reading",
                  time: 45,
                },
              ],
            },
            {
              day: 8,
              title: "Week 7: System Design",
              description: "Learn system design principles",
              tasks: [
                {
                  id: "system-design-practice",
                  title: "System Design Practice",
                  description: "Practice system design concepts",
                  type: "practice",
                  time: 90,
                  url: "/questions/system-design/autocomplete",
                },
              ],
            },
            {
              day: 9,
              title: "Week 8: Performance & Optimization",
              description: "Learn about performance optimization",
              tasks: [
                {
                  id: "performance-basics",
                  title: "Performance Basics",
                  description: "Learn performance fundamentals",
                  type: "reading",
                  time: 60,
                },
                {
                  id: "optimization-practice",
                  title: "Optimization Practice",
                  description: "Practice optimization techniques",
                  type: "practice",
                  time: 60,
                },
              ],
            },
            {
              day: 10,
              title: "Week 9: Testing & Debugging",
              description: "Learn testing and debugging",
              tasks: [
                {
                  id: "testing-basics",
                  title: "Testing Basics",
                  description: "Learn testing fundamentals",
                  type: "reading",
                  time: 60,
                },
                {
                  id: "debugging-practice",
                  title: "Debugging Practice",
                  description: "Practice debugging techniques",
                  type: "practice",
                  time: 60,
                },
              ],
            },
            {
              day: 11,
              title: "Week 10: Advanced Topics",
              description: "Cover advanced frontend topics",
              tasks: [
                {
                  id: "advanced-concepts",
                  title: "Advanced Concepts",
                  description: "Learn advanced frontend concepts",
                  type: "reading",
                  time: 60,
                },
                {
                  id: "advanced-practice",
                  title: "Advanced Practice",
                  description: "Practice advanced concepts",
                  type: "practice",
                  time: 60,
                },
              ],
            },
            {
              day: 12,
              title: "Week 11-12: Final Preparation",
              description: "Final review and mock interviews",
              tasks: [
                {
                  id: "comprehensive-review",
                  title: "Comprehensive Review",
                  description: "Review all learned concepts",
                  type: "review",
                  time: 120,
                },
                {
                  id: "mock-interviews",
                  title: "Mock Interviews",
                  description: "Complete multiple mock interviews",
                  type: "practice",
                  time: 180,
                },
              ],
            },
          ],
        };
      default:
        return {
          title: "Plan Not Found",
          subtitle: "This study plan doesn't exist",
          description: "Please check the URL and try again.",
          totalHours: 0,
          weeks: 0,
          hoursPerDay: 0,
          difficulty: "Unknown",
          schedule: [],
        };
    }
  };

  const planData = getPlanData(planId);

  const allTasks = planData.schedule.flatMap((day) => day.tasks);
  const totalProgress = calculateProgress(allTasks);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <Link
                href="/study-plans"
                className="text-blue-600 hover:text-blue-800 mb-2 inline-block"
              >
                ← Back to Study Plans
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">
                {planData.title}
              </h1>
              <p className="text-gray-600">{planData.subtitle}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">
                {totalProgress}%
              </div>
              <div className="text-sm text-gray-700 font-medium">Complete</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {planData.totalHours}
              </div>
              <div className="text-sm text-blue-700">Total Hours</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {planData.weeks}
              </div>
              <div className="text-sm text-green-700">Weeks</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {planData.hoursPerDay}
              </div>
              <div className="text-sm text-purple-700">Hours/Day</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {planData.difficulty}
              </div>
              <div className="text-sm text-orange-700">Difficulty</div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold">Overall Progress</h2>
            <span className="text-sm text-gray-700 font-medium">
              {completedTasks.length} of {allTasks.length} tasks completed
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${totalProgress}%` }}
            ></div>
          </div>
        </div>

        {/* Daily Schedule */}
        <div className="space-y-6">
          {planData.schedule.map((day) => (
            <div key={day.day} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Day {day.day}: {day.title}
                  </h3>
                  <p className="text-gray-700">{day.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-700 font-medium">
                    {day.tasks.reduce((sum, task) => sum + task.time, 0)}{" "}
                    minutes
                  </div>
                  <div className="flex items-center">
                    <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                      <div
                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${calculateProgress(day.tasks)}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-700 font-medium">
                      {calculateProgress(day.tasks)}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {day.tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 ${
                      completedTasks.includes(task.id)
                        ? "bg-green-50 border-green-200"
                        : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={completedTasks.includes(task.id)}
                        onChange={() => handleTaskComplete(task.id)}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-xl">
                        {getTaskTypeIcon(task.type)}
                      </span>
                      <div>
                        <div className="font-medium text-gray-900">
                          {task.title}
                        </div>
                        <div className="text-sm text-gray-600">
                          {task.description}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-700 font-medium">
                        {task.time} min
                      </span>
                      {task.url && (
                        <Link
                          href={task.url}
                          className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition-colors"
                        >
                          Start
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white text-center mt-8">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Continue Learning?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Keep up the great work! Practice makes perfect.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              href="/questions"
              className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors duration-200"
            >
              Practice Questions
            </Link>
            <Link
              href="/internal-resources"
              className="border-2 border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-blue-600 transition-colors duration-200"
            >
              Internal Resources
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
