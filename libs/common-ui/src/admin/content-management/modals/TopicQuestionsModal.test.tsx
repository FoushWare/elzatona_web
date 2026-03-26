import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { TopicQuestionsModal } from "./TopicQuestionsModal";

describe("TopicQuestionsModal", () => {
  const mockTopic = { id: "topic-1", name: "Test Topic" } as any;
  const mockPlan = { id: "plan-1", name: "Test Plan" } as any;
  const mockQuestions = [
    {
      id: "q-1",
      title: "Question 1",
      topic_id: "topic-1",
      difficulty: "beginner",
      type: "multiple-choice",
    },
    {
      id: "q-2",
      title: "Question 2",
      topic_id: "topic-1",
      difficulty: "intermediate",
      type: "true-false",
    },
    {
      id: "q-3",
      title: "Question 3",
      topic_id: "other-topic",
      difficulty: "hard",
      type: "multiple-choice",
    },
  ] as any[];

  const defaultProps = {
    isOpen: true,
    onOpenChange: vi.fn(),
    topic: mockTopic,
    plan: mockPlan,
    questions: mockQuestions,
    selectedQuestions: new Set(["q-1"]),
    onToggleQuestion: vi.fn(),
    onSelectAll: vi.fn(),
    onDeselectAll: vi.fn(),
    onAddSelected: vi.fn(),
    onCancel: vi.fn(),
  };

  it("renders correctly with questions for the selected topic", () => {
    render(<TopicQuestionsModal {...defaultProps} />);

    expect(screen.getByText("Question 1")).toBeInTheDocument();
    expect(screen.getByText("Question 2")).toBeInTheDocument();
    expect(screen.queryByText("Question 3")).not.toBeInTheDocument();
  });

  it("shows initial selection correctly", () => {
    render(<TopicQuestionsModal {...defaultProps} />);

    const checkboxes = screen.getAllByRole("checkbox");
    // One for "Select All", and one for each question in topic (2)
    // q-1 is selected, q-2 is not
    expect(checkboxes[1]).toBeChecked(); // q-1
    expect(checkboxes[2]).not.toBeChecked(); // q-2
  });

  it("calls onToggleQuestion when a question is clicked", () => {
    render(<TopicQuestionsModal {...defaultProps} />);

    fireEvent.click(screen.getByText("Question 2"));
    expect(defaultProps.onToggleQuestion).toHaveBeenCalledWith("q-2");
  });

  it("calls onAddSelected when add button is clicked", () => {
    render(<TopicQuestionsModal {...defaultProps} />);

    const addButton = screen.getByText(/Add 1 Questions to Plan/i);
    fireEvent.click(addButton);
    expect(defaultProps.onAddSelected).toHaveBeenCalled();
  });
});
