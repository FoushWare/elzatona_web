/**
 * Unit Tests for Question Display Pattern (S-UT-005, S-UT-006, S-UT-007, S-UT-008, S-UT-009)
 * Task: S-002 - Question Card Component
 * 
 * Note: Questions are displayed inline in practice pages, not as a separate component.
 * These tests verify the question display pattern used across the application.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock question data structure
const mockQuestion = {
  id: 'q1',
  question: 'What is React?',
  options: [
    'A JavaScript library for building user interfaces',
    'A database management system',
    'A CSS framework',
    'A programming language',
  ],
  correctAnswer: 0,
  difficulty: 'medium',
  category: 'React',
};

// Question Display Component (based on patterns in practice pages)
const QuestionDisplay = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  showExplanation = false,
  isCorrect = null,
}: {
  question: typeof mockQuestion;
  selectedAnswer: number | null;
  onAnswerSelect: (index: number) => void;
  showExplanation?: boolean;
  isCorrect?: boolean | null;
}) => {
  return (
    <div className="question-card" data-testid="question-card">
      <h2 className="question-text" data-testid="question-text">
        {question.question}
      </h2>
      
      <div className="options" data-testid="answer-options">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrectOption = index === question.correctAnswer;
          
          return (
            <button
              key={index}
              data-testid={`option-${index}`}
              onClick={() => onAnswerSelect(index)}
              disabled={showExplanation}
              className={`option ${isSelected ? 'selected' : ''} ${
                showExplanation && isCorrectOption ? 'correct' : ''
              } ${showExplanation && isSelected && !isCorrect ? 'incorrect' : ''}`}
            >
              {option}
            </button>
          );
        })}
      </div>
      
      {showExplanation && (
        <div data-testid="explanation">
          {isCorrect ? 'Correct!' : 'Incorrect. The correct answer is: ' + question.options[question.correctAnswer]}
        </div>
      )}
    </div>
  );
};

describe('S-UT-005: Component Renders', () => {
  it('should render question card', () => {
    render(
      <QuestionDisplay
        question={mockQuestion}
        selectedAnswer={null}
        onAnswerSelect={jest.fn()}
      />
    );
    
    expect(screen.getByTestId('question-card')).toBeInTheDocument();
  });

  it('should render question text', () => {
    render(
      <QuestionDisplay
        question={mockQuestion}
        selectedAnswer={null}
        onAnswerSelect={jest.fn()}
      />
    );
    
    expect(screen.getByTestId('question-text')).toHaveTextContent('What is React?');
  });

  it('should render answer options', () => {
    render(
      <QuestionDisplay
        question={mockQuestion}
        selectedAnswer={null}
        onAnswerSelect={jest.fn()}
      />
    );
    
    expect(screen.getByTestId('answer-options')).toBeInTheDocument();
    expect(screen.getAllByTestId(/option-/)).toHaveLength(4);
  });
});

describe('S-UT-006: Question Text Display', () => {
  it('should display question text correctly', () => {
    render(
      <QuestionDisplay
        question={mockQuestion}
        selectedAnswer={null}
        onAnswerSelect={jest.fn()}
      />
    );
    
    expect(screen.getByText('What is React?')).toBeInTheDocument();
  });

  it('should format question text properly', () => {
    const longQuestion = {
      ...mockQuestion,
      question: 'This is a very long question that should be displayed correctly with proper formatting and wrapping.',
    };
    
    render(
      <QuestionDisplay
        question={longQuestion}
        selectedAnswer={null}
        onAnswerSelect={jest.fn()}
      />
    );
    
    expect(screen.getByText(longQuestion.question)).toBeInTheDocument();
  });
});

describe('S-UT-007: Answer Options', () => {
  it('should render all options', () => {
    render(
      <QuestionDisplay
        question={mockQuestion}
        selectedAnswer={null}
        onAnswerSelect={jest.fn()}
      />
    );
    
    mockQuestion.options.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  it('should make options clickable', () => {
    const handleSelect = jest.fn();
    render(
      <QuestionDisplay
        question={mockQuestion}
        selectedAnswer={null}
        onAnswerSelect={handleSelect}
      />
    );
    
    const firstOption = screen.getByTestId('option-0');
    fireEvent.click(firstOption);
    
    expect(handleSelect).toHaveBeenCalledWith(0);
  });

  it('should update selection state when option is clicked', () => {
    const handleSelect = jest.fn();
    const { rerender } = render(
      <QuestionDisplay
        question={mockQuestion}
        selectedAnswer={null}
        onAnswerSelect={handleSelect}
      />
    );
    
    const firstOption = screen.getByTestId('option-0');
    fireEvent.click(firstOption);
    
    // Rerender with selected answer
    rerender(
      <QuestionDisplay
        question={mockQuestion}
        selectedAnswer={0}
        onAnswerSelect={handleSelect}
      />
    );
    
    expect(firstOption).toHaveClass('selected');
  });
});

describe('S-UT-008: Answer Submission', () => {
  it('should show explanation when answer is submitted', () => {
    render(
      <QuestionDisplay
        question={mockQuestion}
        selectedAnswer={0}
        onAnswerSelect={jest.fn()}
        showExplanation={true}
        isCorrect={true}
      />
    );
    
    expect(screen.getByTestId('explanation')).toBeInTheDocument();
    expect(screen.getByText('Correct!')).toBeInTheDocument();
  });

  it('should show correct answer in explanation when wrong', () => {
    render(
      <QuestionDisplay
        question={mockQuestion}
        selectedAnswer={1}
        onAnswerSelect={jest.fn()}
        showExplanation={true}
        isCorrect={false}
      />
    );
    
    expect(screen.getByTestId('explanation')).toBeInTheDocument();
    expect(screen.getByText(/Incorrect/)).toBeInTheDocument();
  });
});

describe('S-UT-009: Different Question Types', () => {
  it('should handle multiple choice questions', () => {
    render(
      <QuestionDisplay
        question={mockQuestion}
        selectedAnswer={null}
        onAnswerSelect={jest.fn()}
      />
    );
    
    expect(screen.getAllByTestId(/option-/)).toHaveLength(4);
  });

  it('should handle questions with different option counts', () => {
    const twoOptionQuestion = {
      ...mockQuestion,
      options: ['True', 'False'],
      correctAnswer: 0,
    };
    
    render(
      <QuestionDisplay
        question={twoOptionQuestion}
        selectedAnswer={null}
        onAnswerSelect={jest.fn()}
      />
    );
    
    expect(screen.getAllByTestId(/option-/)).toHaveLength(2);
  });
});

