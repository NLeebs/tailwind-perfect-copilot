import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import UtilityButton from "@/components/UtilityButton";

describe("UtilityButton", () => {
  it("renders the utility button labelled 'Button'", () => {
    render(<UtilityButton />);
    expect(
      screen.getByRole("button", { name: /^button$/i })
    ).toBeInTheDocument();
  });

  it("applies TAILWIND_BTN_CLASSES to the rendered button (single-source const)", () => {
    render(<UtilityButton />);
    const btn = screen.getByRole("button", { name: /^button$/i });
    // Sample three signature classes from TAILWIND_BTN_CLASSES that prove the const is wired.
    expect(btn).toHaveClass("bg-cyan-500");
    expect(btn).toHaveClass("dark:bg-cyan-600");
    expect(btn).toHaveClass("3xl:text-xl");
  });

  it("renders CodeCallout containing TAILWIND_BTN_CLASSES text", () => {
    render(<UtilityButton />);
    // bg-cyan-500 is a distinctive fragment of TAILWIND_BTN_CLASSES.
    expect(screen.getByText(/bg-cyan-500/)).toBeInTheDocument();
  });
});
