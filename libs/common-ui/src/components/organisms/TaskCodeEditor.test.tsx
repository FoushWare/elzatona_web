import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { TaskCodeEditor } from "./TaskCodeEditor";

describe("TaskCodeEditor", () => {
  const files = [
    { id: "f1", path: "a.js", content: "A" },
    { id: "f2", path: "b.js", content: "B" },
  ];

  it("renders tabs and textarea and calls onFileChange", () => {
    const onFileChange = jest.fn();
    render(
      <TaskCodeEditor
        files={files}
        activeFileId={"f1"}
        onFileChange={onFileChange}
      />,
    );
    expect(screen.getByText("a.js")).toBeInTheDocument();
    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "changed" } });
    expect(onFileChange).toHaveBeenCalledWith("f1", "changed");
    // switch tab
    fireEvent.click(screen.getByText("b.js"));
    expect(screen.getByText("b.js")).toBeInTheDocument();
  });
});
