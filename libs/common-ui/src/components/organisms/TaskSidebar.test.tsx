import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { TaskSidebar } from "./TaskSidebar";

describe("TaskSidebar", () => {
  const files = [
    { id: "a", path: "a.js" },
    { id: "b", path: "b.js" },
  ];
  it("renders files and buttons", () => {
    const onFileSelect = jest.fn();
    const onRun = jest.fn();
    render(
      <TaskSidebar files={files} onFileSelect={onFileSelect} onRun={onRun} />,
    );
    expect(screen.getByText("Files")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Run"));
    expect(onRun).toHaveBeenCalled();
    fireEvent.click(screen.getByText("a.js"));
    expect(onFileSelect).toHaveBeenCalledWith("a");
  });
});
