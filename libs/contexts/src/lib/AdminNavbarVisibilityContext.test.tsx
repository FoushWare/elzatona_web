import { act, renderHook } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import {
  AdminNavbarVisibilityProvider,
  useAdminNavbarVisibility,
} from "./AdminNavbarVisibilityContext";

describe("AdminNavbarVisibilityContext", () => {
  it("defaults navbar visibility to true", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AdminNavbarVisibilityProvider>{children}</AdminNavbarVisibilityProvider>
    );

    const { result } = renderHook(() => useAdminNavbarVisibility(), {
      wrapper,
    });

    expect(result.current.isNavbarVisible).toBe(true);
  });

  it("updates visibility state", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AdminNavbarVisibilityProvider>{children}</AdminNavbarVisibilityProvider>
    );

    const { result } = renderHook(() => useAdminNavbarVisibility(), {
      wrapper,
    });

    act(() => {
      result.current.setIsNavbarVisible(false);
    });

    expect(result.current.isNavbarVisible).toBe(false);
  });

  it("throws when used outside provider", () => {
    expect(() => renderHook(() => useAdminNavbarVisibility())).toThrowError(
      "useAdminNavbarVisibility must be used within an AdminNavbarVisibilityProvider",
    );
  });
});
