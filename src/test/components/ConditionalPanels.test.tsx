import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ConditionalPanels from "@/components/ConditionalPanels";

describe("ConditionalPanels", () => {
  it("renders all three panel overline labels", () => {
    render(<ConditionalPanels />);
    expect(screen.getByText("CSS VARIANTS")).toBeInTheDocument();
    expect(screen.getByText("GROUP VARIANTS")).toBeInTheDocument();
    expect(screen.getByText("REACT STATE")).toBeInTheDocument();
  });

  it("renders Panel 1 with hover class callout text", () => {
    render(<ConditionalPanels />);
    // CodeCallout for Panel 1 shows HOVER_CLASSES value
    expect(
      screen.getByText("hover:bg-sky-50 dark:hover:bg-slate-700")
    ).toBeInTheDocument();
  });

  it("renders Panel 2 with group-hover class callout text", () => {
    render(<ConditionalPanels />);
    // CodeCallout for Panel 2 shows GROUP_CALLOUT value
    expect(screen.getByText(/group-hover:scale-105/)).toBeInTheDocument();
  });

  it("renders Panel 3 in inactive state initially — shows Status: Inactive", () => {
    render(<ConditionalPanels />);
    expect(screen.getByText("Status: Inactive")).toBeInTheDocument();
  });

  it("renders Toggle button in Panel 3", () => {
    render(<ConditionalPanels />);
    expect(screen.getByRole("button", { name: /^toggle$/i })).toBeInTheDocument();
  });

  it("clicking Toggle button switches Panel 3 to active state — shows Status: Active", () => {
    render(<ConditionalPanels />);
    const toggleBtn = screen.getByRole("button", { name: /^toggle$/i });
    fireEvent.click(toggleBtn);
    expect(screen.getByText("Status: Active")).toBeInTheDocument();
  });

  it("clicking Toggle button twice returns to inactive state — shows Status: Inactive", () => {
    render(<ConditionalPanels />);
    const toggleBtn = screen.getByRole("button", { name: /^toggle$/i });
    fireEvent.click(toggleBtn);
    fireEvent.click(toggleBtn);
    expect(screen.getByText("Status: Inactive")).toBeInTheDocument();
  });

  it("Panel 3 card has active background class after clicking Toggle", () => {
    render(<ConditionalPanels />);
    const toggleBtn = screen.getByRole("button", { name: /^toggle$/i });
    // Find the Panel 3 card — it contains the Status text
    const statusText = screen.getByText("Status: Inactive");
    const card = statusText.closest("div");
    expect(card).not.toHaveClass("bg-blue-500");
    fireEvent.click(toggleBtn);
    const activeStatusText = screen.getByText("Status: Active");
    const activeCard = activeStatusText.closest("div");
    expect(activeCard).toHaveClass("bg-blue-500");
  });
});
