'use client';

import { useState } from 'react';
import { DailyVideoCall } from '@/components/DailyVideoCall';
import { AIInterviewerAgent } from '@/components/AIInterviewerAgent';
import { PageHeader } from '@/components/PageHeader';

interface InterviewRoom {
  id: string;
  name: string;
  url: string;
  topic: string;
  duration: number;
}

export default function ScheduleInterviewPage() {
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const [room, setRoom] = useState<InterviewRoom | null>(null);
  const [userName, setUserName] = useState('');
  const [interviewTopic, setInterviewTopic] = useState('Frontend Development');
  const [interviewDuration, setInterviewDuration] = useState(30);
  const [isAgentReady, setIsAgentReady] = useState(false);
  const [agentError, setAgentError] = useState<string | null>(null);

  const createInterviewRoom = async () => {
    if (!userName.trim()) {
      alert('Please enter your name');
      return;
    }

    setIsCreatingRoom(true);
    setAgentError(null);

    try {
      const response = await fetch('/api/daily/create-room', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: interviewTopic,
          duration: interviewDuration,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setRoom(data.room);
      } else {
        throw new Error(data.error || 'Failed to create interview room');
      }
    } catch (error) {
      console.error('Error creating room:', error);
      setAgentError(
        error instanceof Error
          ? error.message
          : 'Failed to create interview room'
      );
    } finally {
      setIsCreatingRoom(false);
    }
  };

  const leaveInterview = () => {
    setRoom(null);
    setIsAgentReady(false);
    setAgentError(null);
  };

  const handleAgentReady = () => {
    setIsAgentReady(true);
  };

  const handleAgentError = (error: string) => {
    setAgentError(error);
  };

  if (room) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PageHeader
          title="AI Mock Interview"
          description="Practice your skills with our AI interviewer"
        />

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Agent Status */}
            {agentError && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-red-600 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                  <span className="text-red-800 font-medium">
                    AI Agent Error:
                  </span>
                </div>
                <p className="text-red-700 mt-1">{agentError}</p>
              </div>
            )}

            {/* Interview Room */}
            <DailyVideoCall
              roomUrl={room.url}
              userName={userName}
              onLeave={leaveInterview}
              className="mb-6"
            />

            {/* AI Interviewer Agent */}
            <AIInterviewerAgent
              roomUrl={room.url}
              onAgentReady={handleAgentReady}
              onAgentError={handleAgentError}
            />

            {/* Interview Info */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Interview Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Topic:</span>
                  <p className="text-gray-600">{room.topic}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Duration:</span>
                  <p className="text-gray-600">{room.duration} minutes</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">AI Status:</span>
                  <p className="text-gray-600">
                    {isAgentReady ? '✅ Ready' : '⏳ Connecting...'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Schedule AI Mock Interview"
        description="Practice your skills with our AI interviewer in a live video session"
      />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                AI Mock Interview
              </h2>
              <p className="text-gray-600">
                Get real-time feedback from our AI interviewer in a live video
                session
              </p>
            </div>

            <form
              onSubmit={e => {
                e.preventDefault();
                createInterviewRoom();
              }}
              className="space-y-6"
            >
              {/* User Name */}
              <div>
                <label
                  htmlFor="userName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Your Name *
                </label>
                <input
                  type="text"
                  id="userName"
                  value={userName}
                  onChange={e => setUserName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your name"
                  required
                />
              </div>

              {/* Interview Topic */}
              <div>
                <label
                  htmlFor="topic"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Interview Topic
                </label>
                <select
                  id="topic"
                  value={interviewTopic}
                  onChange={e => setInterviewTopic(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Frontend Development">
                    Frontend Development
                  </option>
                  <option value="React">React</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="CSS">CSS</option>
                  <option value="TypeScript">TypeScript</option>
                  <option value="Web Performance">Web Performance</option>
                  <option value="System Design">System Design</option>
                </select>
              </div>

              {/* Interview Duration */}
              <div>
                <label
                  htmlFor="duration"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Interview Duration
                </label>
                <select
                  id="duration"
                  value={interviewDuration}
                  onChange={e => setInterviewDuration(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={15}>15 minutes</option>
                  <option value={30}>30 minutes</option>
                  <option value={45}>45 minutes</option>
                  <option value={60}>60 minutes</option>
                </select>
              </div>

              {/* Features */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-medium text-blue-900 mb-2">
                  What to Expect:
                </h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Live video interview with AI interviewer</li>
                  <li>• Real-time voice interaction</li>
                  <li>• Instant feedback on your answers</li>
                  <li>• Adaptive questioning based on your responses</li>
                  <li>• Professional interview experience</li>
                </ul>
              </div>

              {/* Create Room Button */}
              <button
                type="submit"
                disabled={isCreatingRoom}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isCreatingRoom ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating Interview Room...
                  </div>
                ) : (
                  'Start AI Mock Interview'
                )}
              </button>
            </form>

            {/* Requirements */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="font-medium text-gray-900 mb-3">Requirements:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Webcam and microphone
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Stable internet connection
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Modern web browser
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Quiet environment
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
