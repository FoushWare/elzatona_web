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

  // Sample data for the one-week intensive plan
  const planData = {
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
            description: "Read about hoisting and complete practice problems",
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
          },
        ],
      },
      {
        day: 2,
        title: "React Core Concepts",
        description: "Focus on React hooks and state management",
        tasks: [
          {
            id: "react-hooks-practice",
            title: "Practice React Hooks",
            description: "Complete React hooks problems",
            type: "practice",
            time: 60,
            url: "/questions/react/hooks",
          },
          {
            id: "react-state-study",
            title: "Study State Management",
            description: "Learn about useState and useContext",
            type: "reading",
            time: 60,
          },
        ],
      },
      {
        day: 3,
        title: "CSS & Styling",
        description: "Focus on layout and responsive design",
        tasks: [
          {
            id: "css-layout-practice",
            title: "Practice CSS Layout",
            description: "Complete CSS layout challenges",
            type: "practice",
            time: 45,
            url: "/questions/user-interface/layout",
          },
          {
            id: "responsive-design",
            title: "Responsive Design Practice",
            description: "Build responsive components",
            type: "project",
            time: 75,
          },
        ],
      },
      {
        day: 4,
        title: "System Design Introduction",
        description: "Learn basic system design concepts",
        tasks: [
          {
            id: "autocomplete-design",
            title: "Design Autocomplete System",
            description: "Practice autocomplete system design",
            type: "practice",
            time: 90,
            url: "/questions/system-design/autocomplete",
          },
        ],
      },
      {
        day: 5,
        title: "Advanced JavaScript",
        description: "Focus on advanced JavaScript concepts",
        tasks: [
          {
            id: "js-advanced-practice",
            title: "Advanced JavaScript Problems",
            description: "Complete advanced JavaScript challenges",
            type: "practice",
            time: 60,
          },
          {
            id: "js-algorithms",
            title: "JavaScript Algorithms",
            description: "Practice algorithm problems in JavaScript",
            type: "practice",
            time: 60,
          },
        ],
      },
      {
        day: 6,
        title: "Practice & Review",
        description: "Review all concepts and practice problems",
        tasks: [
          {
            id: "comprehensive-review",
            title: "Comprehensive Review",
            description: "Review all learned concepts",
            type: "review",
            time: 60,
          },
          {
            id: "mock-practice",
            title: "Mock Interview Practice",
            description: "Practice with mock interview questions",
            type: "practice",
            time: 60,
          },
        ],
      },
      {
        day: 7,
        title: "Mock Interview & Final Prep",
        description: "Final preparation and mock interview",
        tasks: [
          {
            id: "mock-interview",
            title: "Mock Interview",
            description: "Complete a full mock interview",
            type: "practice",
            time: 90,
          },
          {
            id: "final-review",
            title: "Final Review",
            description: "Quick review of key concepts",
            type: "review",
            time: 30,
          },
        ],
      },
    ],
  };

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
