import React from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Dialog, DialogContent } from "./dialog";

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
});
