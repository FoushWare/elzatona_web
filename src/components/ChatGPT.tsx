"use client";

import { useState } from "react";
import { MessageCircle, X, Send, Bot, User, Lightbulb } from "lucide-react";
import { CHATGPT_CONFIG, ChatMessage } from "@/lib/chatgpt-config";

export default function ChatGPT() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      content: CHATGPT_CONFIG.WELCOME_MESSAGE,
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue,
      role: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Call the ChatGPT API
      const response = await fetch('/api/chatgpt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: messages
            .filter(msg => msg.role !== 'system')
            .map(msg => ({ role: msg.role, content: msg.content }))
            .concat({ role: 'user', content: inputValue })
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get response');
      }

      const data = await response.json();
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: data.choices[0].message.content,
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('ChatGPT API error:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: error instanceof Error ? error.message : CHATGPT_CONFIG.ERROR_MESSAGES.API_ERROR,
        role: "assistant",
        timestamp: new Date(),
        isError: true,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
        aria-label="Open AI Chat Assistant"
      >
        <MessageCircle size={24} />
      </button>

      {/* Chat Popup */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-4 md:p-6">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={toggleChat}
          />
          
          {/* Chat Window */}
          <div className="relative w-full max-w-md h-[500px] md:h-[600px] bg-white dark:bg-gray-800 rounded-t-2xl shadow-2xl flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-semibold">AI Learning Assistant</h3>
                  <p className="text-xs text-blue-100">Powered by ChatGPT</p>
                </div>
              </div>
              <button
                onClick={toggleChat}
                className="p-1 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot size={16} className="text-white" />
                    </div>
                  )}
                  
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                      message.role === "user"
                        ? "bg-blue-500 text-white rounded-br-md"
                        : message.isError
                        ? "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-md"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>

                  {message.role === "user" && (
                    <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <User size={16} className="text-gray-600 dark:text-gray-300" />
                    </div>
                  )}
                </div>
              ))}
              
              {/* Suggested Questions */}
              {messages.length === 1 && (
                <div className="space-y-2">
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center">💡 Try asking:</p>
                  <div className="grid grid-cols-1 gap-2">
                    {CHATGPT_CONFIG.SUGGESTED_QUESTIONS.slice(0, 3).map((question, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setInputValue(question);
                          // Auto-submit the suggested question
                          const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
                          setInputValue(question);
                          setTimeout(() => {
                            const userMessage: ChatMessage = {
                              id: Date.now().toString(),
                              content: question,
                              role: "user",
                              timestamp: new Date(),
                            };
                            setMessages(prev => [...prev, userMessage]);
                            setInputValue("");
                            setIsLoading(true);
                            
                            // Call API with the suggested question
                            fetch('/api/chatgpt', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({
                                messages: [{ role: 'user', content: question }]
                              }),
                            })
                            .then(response => response.json())
                            .then(data => {
                              const aiResponse: ChatMessage = {
                                id: (Date.now() + 1).toString(),
                                content: data.choices[0].message.content,
                                role: "assistant",
                                timestamp: new Date(),
                              };
                              setMessages(prev => [...prev, aiResponse]);
                            })
                            .catch(error => {
                              const errorMessage: ChatMessage = {
                                id: (Date.now() + 1).toString(),
                                content: error.message || CHATGPT_CONFIG.ERROR_MESSAGES.API_ERROR,
                                role: "assistant",
                                timestamp: new Date(),
                                isError: true,
                              };
                              setMessages(prev => [...prev, errorMessage]);
                            })
                            .finally(() => setIsLoading(false));
                          }, 100);
                        }}
                        className="text-left p-3 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg transition-colors text-sm text-blue-700 dark:text-blue-300"
                      >
                        <div className="flex items-center gap-2">
                          <Lightbulb size={14} className="text-blue-500" />
                          <span>{question}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot size={16} className="text-white" />
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl rounded-bl-md px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything about frontend development..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Send size={16} />
                </button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                Ask about HTML, CSS, JavaScript, React, or interview prep!
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
