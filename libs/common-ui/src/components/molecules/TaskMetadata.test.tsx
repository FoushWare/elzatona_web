import React from "react";
import { render, screen } from "@testing-library/react";
import { TaskMetadata } from "./TaskMetadata";

describe("TaskMetadata", () => {
  it("renders title, author and estimated time", () => {
    render(
      <TaskMetadata
        title="Test Task"
        difficulty="easy"
        estimatedTimeMinutes={10}
        authorName="Jane Doe"
        tags={["tag1"]}
      />,
    );

    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.getByText(/Author:/)).toBeInTheDocument();
    expect(screen.getByText(/Estimated:/)).toBeInTheDocument();
  });
});
