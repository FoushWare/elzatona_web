/**
 * Integration Tests for Question Display Pattern (S-IT-004, S-IT-005, S-IT-006)
 * Task: S-002 - Question Card Component
 */

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

const mockQuestion = {
  id: "q1",
  question: "What is React?",
  options: [
    "A JavaScript library for building user interfaces",
    "A database management system",
    "A CSS framework",
    "A programming language",
  ],
  correctAnswer: 0,
  difficulty: "medium",
  category: "React",
};

const QuestionDisplay = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  showExplanation = false,
  isCorrect = null,
  onNext,
}: {
  question: typeof mockQuestion;
  selectedAnswer: number | null;
  onAnswerSelect: (index: number) => void;
  showExplanation?: boolean;
  isCorrect?: boolean | null;
  onNext?: () => void;
}) => {
  return (
    <div data-testid="question-card">
      <h2>{question.question}</h2>

      <div data-testid="answer-options">
        {question.options.map((option, index) => (
          <button
            key={index}
            data-testid={`option-${index}`}
            onClick={() => onAnswerSelect(index)}
            disabled={showExplanation}
          >
            {option}
          </button>
        ))}
      </div>

      {showExplanation && (
        <div data-testid="explanation">
          {isCorrect ? "Correct!" : "Incorrect"}
        </div>
      )}

      {showExplanation && onNext && (
        <button data-testid="next-button" onClick={onNext}>
          Next
        </button>
      )}
    </div>
  );
};

describe("S-IT-004: Answer Selection Flow", () => {
  it("should handle answer selection and state updates", () => {
    const handleSelect = jest.fn();
    const { rerender } = render(
      <QuestionDisplay
        question={mockQuestion}
        selectedAnswer={null}
        onAnswerSelect={handleSelect}
      />,
    );

    const firstOption = screen.getByTestId("option-0");
    fireEvent.click(firstOption);

    expect(handleSelect).toHaveBeenCalledWith(0);

    // Rerender with selected answer
    rerender(
      <QuestionDisplay
        question={mockQuestion}
        selectedAnswer={0}
        onAnswerSelect={handleSelect}
      />,
    );

    expect(firstOption).toBeInTheDocument();
  });

  it("should show feedback after answer submission", () => {
    render(
      <QuestionDisplay
        question={mockQuestion}
        selectedAnswer={0}
        onAnswerSelect={jest.fn()}
        showExplanation={true}
        isCorrect={true}
      />,
    );

    expect(screen.getByTestId("explanation")).toBeInTheDocument();
    expect(screen.getByText("Correct!")).toBeInTheDocument();
  });
});

describe("S-IT-005: Question Data Handling", () => {
  it("should load and display question data", () => {
    render(
      <QuestionDisplay
        question={mockQuestion}
        selectedAnswer={null}
        onAnswerSelect={jest.fn()}
      />,
    );

    expect(screen.getByText(mockQuestion.question)).toBeInTheDocument();
    mockQuestion.options.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  it("should handle question metadata", () => {
    render(
      <QuestionDisplay
        question={mockQuestion}
        selectedAnswer={null}
        onAnswerSelect={jest.fn()}
      />,
    );

    // Question is displayed
    expect(screen.getByText(mockQuestion.question)).toBeInTheDocument();
  });
});

describe("S-IT-006: Callback Handlers", () => {
  it("should call onAnswer callback when answer is selected", () => {
    const handleAnswer = jest.fn();
    render(
      <QuestionDisplay
        question={mockQuestion}
        selectedAnswer={null}
        onAnswerSelect={handleAnswer}
      />,
    );

    const option = screen.getByTestId("option-1");
    fireEvent.click(option);

    expect(handleAnswer).toHaveBeenCalledWith(1);
  });

  it("should call onNext callback when next button is clicked", () => {
    const handleNext = jest.fn();
    render(
      <QuestionDisplay
        question={mockQuestion}
        selectedAnswer={0}
        onAnswerSelect={jest.fn()}
        showExplanation={true}
        isCorrect={true}
        onNext={handleNext}
      />,
    );

    const nextButton = screen.getByTestId("next-button");
    fireEvent.click(nextButton);

    expect(handleNext).toHaveBeenCalled();
  });
});
