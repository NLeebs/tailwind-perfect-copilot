import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import DataActiveDemo from "@/components/DataActiveDemo";

describe("DataActiveDemo", () => {
  it("renders without error — shows initial inactive status", () => {
    render(<DataActiveDemo />);
    expect(screen.getByText("Status: Inactive")).toBeInTheDocument();
  });

  it("renders the Toggle Active button", () => {
    render(<DataActiveDemo />);
    expect(
      screen.getByRole("button", { name: /toggle active/i })
    ).toBeInTheDocument();
  });

  it("renders the data-active CodeCallout", () => {
    render(<DataActiveDemo />);
    // DATA_CALLOUT has \n — rendered as two lines via whitespace-pre-wrap
    // Both class names should appear in the rendered callout text
    expect(
      screen.getByText(/data-active:bg-purple-600/)
    ).toBeInTheDocument();
  });

  it("renders headless UI explanation text", () => {
    render(<DataActiveDemo />);
    expect(
      screen.getByText(/Headless UI libraries/i)
    ).toBeInTheDocument();
  });

  it("clicking Toggle Active changes status to Active", () => {
    render(<DataActiveDemo />);
    const btn = screen.getByRole("button", { name: /toggle active/i });
    fireEvent.click(btn);
    expect(screen.getByText("Status: Active")).toBeInTheDocument();
  });

  it("clicking Toggle Active adds data-active attribute to the card", () => {
    render(<DataActiveDemo />);
    const statusText = screen.getByText("Status: Inactive");
    // The card is the ancestor div with rounded-xl and data-active behavior
    const card = statusText.closest("div[class*='rounded-xl']");
    expect(card).not.toHaveAttribute("data-active");
    const btn = screen.getByRole("button", { name: /toggle active/i });
    fireEvent.click(btn);
    const activeCard = screen.getByText("Status: Active").closest("div[class*='rounded-xl']");
    expect(activeCard).toHaveAttribute("data-active");
  });

  it("clicking Toggle Active twice removes data-active attribute", () => {
    render(<DataActiveDemo />);
    const btn = screen.getByRole("button", { name: /toggle active/i });
    fireEvent.click(btn);
    fireEvent.click(btn);
    expect(screen.getByText("Status: Inactive")).toBeInTheDocument();
    const card = screen.getByText("Status: Inactive").closest("div[class*='rounded-xl']");
    expect(card).not.toHaveAttribute("data-active");
  });
});
