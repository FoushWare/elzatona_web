import React from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

describe("Dialog", () => {
  it("does not render when closed", () => {
    render(
      <Dialog open={false}>
        <DialogContent>Hidden content</DialogContent>
      </Dialog>,
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders with elevated stacking order when open", () => {
    render(
      <Dialog open>
        <DialogContent>Visible content</DialogContent>
      </Dialog>,
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveClass("z-[100]");
  });

  it("closes when the backdrop button is clicked", () => {
    const onOpenChange = vi.fn();

    render(
      <Dialog open onOpenChange={onOpenChange}>
        <DialogContent>Visible content</DialogContent>
      </Dialog>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Close dialog" }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("closes when escape is pressed on the backdrop", () => {
    const onOpenChange = vi.fn();

    render(
      <Dialog open onOpenChange={onOpenChange}>
        <DialogContent>Visible content</DialogContent>
      </Dialog>,
    );

    fireEvent.keyDown(screen.getByRole("button", { name: "Close dialog" }), {
      key: "Escape",
    });

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("renders dialog content, header, title, description, footer, and trigger", () => {
    render(
      <Dialog open>
        <DialogContent className="content-class">
          <DialogHeader className="header-class">
            <DialogTitle className="title-class">Title</DialogTitle>
            <DialogDescription className="description-class">
              Description
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="footer-class">
            <DialogTrigger className="trigger-class">Trigger</DialogTrigger>
          </DialogFooter>
        </DialogContent>
      </Dialog>,
    );

    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Trigger")).toBeInTheDocument();
    expect(screen.getByText("Title")).toHaveClass("title-class");
    expect(screen.getByText("Description")).toHaveClass("description-class");
    expect(screen.getByText("Trigger")).toHaveClass("trigger-class");
    expect(screen.getByText("Title").closest("div")).toHaveClass(
      "header-class",
    );
    expect(screen.getByText("Trigger").closest("div")).toHaveClass(
      "footer-class",
    );
  });
});
