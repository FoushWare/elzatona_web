'use client';

import { useState } from 'react';

interface Question {
  question: string;
  code?: string;
  options: { A: string; B: string; C: string; D: string };
  correctAnswer: string;
  explanation: string;
}

const webpackToolingQuestions: Question[] = [
  {
    question:
      'What is the primary purpose of Webpack in modern frontend development?',
    code: `
// webpack.config.js
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  }
};`,
    options: {
      A: 'To provide a development server for React applications',
      B: 'To bundle, transform, and optimize JavaScript modules and assets',
      C: 'To replace npm as a package manager',
      D: 'To automatically generate CSS from JavaScript',
    },
    correctAnswer: 'B',
    explanation:
      'Webpack is a module bundler that takes modules with dependencies and generates static assets representing those modules. It bundles JavaScript files, transforms them (using loaders), and optimizes them for production.',
  },
  {
    question:
      'Which Webpack optimization technique is most effective for reducing bundle size?',
    code: `
// webpack.config.js - Code splitting example
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\\\/]node_modules[\\\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          enforce: true
        }
      }
    }
  }
};`,
    options: {
      A: 'Increasing the number of entry points',
      B: 'Implementing code splitting and tree shaking',
      C: 'Using only synchronous imports',
      D: 'Disabling all Webpack optimizations',
    },
    correctAnswer: 'B',
    explanation:
      'Code splitting allows you to split your code into various bundles which can be loaded on demand or in parallel. Tree shaking eliminates dead code. Both techniques significantly reduce bundle size and improve loading performance.',
  },
  {
    question: 'What is the purpose of Webpack loaders?',
    code: `
// webpack.config.js - Loader configuration
module.exports = {
  module: {
    rules: [
      {
        test: /\\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\\.(png|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'images/'
          }
        }
      },
      {
        test: /\\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  }
};`,
    options: {
      A: 'To manage npm package dependencies',
      B: 'To transform and process different types of files',
      C: 'To optimize images automatically',
      D: 'To generate TypeScript definitions',
    },
    correctAnswer: 'B',
    explanation:
      'Loaders are transformations that are applied to the source code of a module. They allow you to preprocess files as you import or "load" them. For example, you can use loaders to transform TypeScript to JavaScript, or to inline images as data URLs.',
  },
  {
    question:
      'Which tool is most effective for analyzing Webpack bundle composition?',
    code: `
// webpack.config.js - Bundle analyzer setup
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: 'bundle-report.html'
    })
  ]
};

// Alternative: webpack-bundle-analyzer CLI
// npx webpack-bundle-analyzer dist/bundle.js`,
    options: {
      A: 'Chrome DevTools Performance tab',
      B: 'webpack-bundle-analyzer',
      C: 'ESLint',
      D: 'Prettier',
    },
    correctAnswer: 'B',
    explanation:
      "webpack-bundle-analyzer is a tool that analyzes your bundle and shows you what's taking up space. It provides an interactive treemap visualization of the contents of all your bundles, helping you identify large dependencies and optimization opportunities.",
  },
  {
    question: 'What is the difference between Webpack plugins and loaders?',
    code: `
// webpack.config.js - Plugins vs Loaders
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  module: {
    rules: [
      // LOADER: Transforms individual files
      {
        test: /\\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    // PLUGIN: Performs actions on the entire bundle
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    })
  ]
};`,
    options: {
      A: 'Loaders work on individual files, plugins work on the entire bundle',
      B: 'Plugins are faster than loaders',
      C: 'Loaders are only for JavaScript files',
      D: 'There is no difference between them',
    },
    correctAnswer: 'A',
    explanation:
      'Loaders transform individual files as they are imported/required. Plugins perform actions on the entire bundle or chunks, such as generating HTML files, extracting CSS, or optimizing the bundle. Loaders work at the module level, plugins work at the bundle level.',
  },
];

export default function WebpackToolingPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const currentQuestion = webpackToolingQuestions[currentQuestionIndex];
  const totalQuestions = webpackToolingQuestions.length;

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setIsCorrect(answer === currentQuestion.correctAnswer);
    setShowAnswer(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowAnswer(false);
      setSelectedAnswer(null);
      setIsCorrect(null);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowAnswer(false);
      setSelectedAnswer(null);
      setIsCorrect(null);
    }
  };

  const handleQuestionSelect = (index: number) => {
    setCurrentQuestionIndex(index);
    setShowAnswer(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Webpack & Tooling
        </h1>
        <p className="text-muted-foreground text-lg">
          Senior frontend interview questions covering Webpack & Tooling,
          CSS-in-JS, React Components & Hooks, State Management, Testing
          strategies, and Web Performance. Essential for senior developer
          interviews.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-foreground">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </span>
          <span className="text-sm text-muted-foreground">
            {Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}%
            Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-card rounded-lg shadow-sm border border-border p-6 mb-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            {currentQuestion.question}
          </h2>

          {currentQuestion.code && (
            <div className="bg-gray-900 text-green-400 p-4 rounded-md mb-4 overflow-x-auto">
              <pre className="text-sm">
                <code>{currentQuestion.code}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Answer Options */}
        <div className="space-y-3 mb-6">
          {Object.entries(currentQuestion.options).map(([key, value]) => (
            <button
              key={key}
              onClick={() => handleAnswerSelect(key)}
              disabled={showAnswer}
              className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                selectedAnswer === key
                  ? isCorrect
                    ? 'bg-green-100 border-green-500 text-green-800'
                    : 'bg-red-100 border-red-500 text-red-800'
                  : showAnswer && key === currentQuestion.correctAnswer
                    ? 'bg-green-100 border-green-500 text-green-800'
                    : 'bg-background border-border hover:bg-muted'
              } ${showAnswer ? 'cursor-default' : 'cursor-pointer'}`}
            >
              <span className="font-medium mr-2">{key}.</span>
              {value}
            </button>
          ))}
        </div>

        {/* Answer Explanation */}
        {showAnswer && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
              {isCorrect ? '✅ Correct!' : '❌ Incorrect'}
            </h3>
            <p className="text-blue-700 dark:text-blue-300">
              {currentQuestion.explanation}
            </p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>

          <button
            onClick={handleNextQuestion}
            disabled={currentQuestionIndex === totalQuestions - 1}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      </div>

      {/* Question Navigation */}
      <div className="bg-card rounded-lg shadow-sm border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Question Navigation
        </h3>
        <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
          {webpackToolingQuestions.map((_, index) => (
            <button
              key={index}
              onClick={() => handleQuestionSelect(index)}
              className={`p-2 text-sm rounded-md transition-colors ${
                index === currentQuestionIndex
                  ? 'bg-blue-600 text-white'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Video Tutorial Section */}
      <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <h3 className="text-xl font-semibold mb-2">
          📹 Video Tutorial Available
        </h3>
        <p className="mb-4 opacity-90">
          Watch our comprehensive tutorial covering JavaScript fundamentals
          including hoisting, scope, closures, and core concepts needed for
          these practice questions.
        </p>
        <a
          href="https://www.youtube.com/watch?v=PeL25__th3s&t=2s"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 bg-white text-blue-600 rounded-md hover:bg-gray-100 transition-colors"
        >
          Watch Tutorial
        </a>
      </div>
    </div>
  );
}
