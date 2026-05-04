import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import DataActiveDemo from "@/components/DataActiveDemo";

describe("DataActiveDemo", () => {
  it("renders without error — shows DATA ATTRIBUTE and CLASSES overlines", () => {
    render(<DataActiveDemo />);
    expect(screen.getByText("DATA ATTRIBUTE")).toBeInTheDocument();
    expect(screen.getByText("CLASSES")).toBeInTheDocument();
  });

  it("renders the Toggle Active button", () => {
    render(<DataActiveDemo />);
    expect(
      screen.getByRole("button", { name: /Toggle Active/i })
    ).toBeInTheDocument();
  });

  it("initial render shows Status: Inactive in the card", () => {
    render(<DataActiveDemo />);
    expect(screen.getByText(/Status: Inactive/i)).toBeInTheDocument();
  });

  it("clicking Toggle Active changes status to Active", () => {
    render(<DataActiveDemo />);
    const btn = screen.getByRole("button", { name: /Toggle Active/i });
    fireEvent.click(btn);
    expect(screen.getByText(/Status: Active/i)).toBeInTheDocument();
  });

  it("clicking Toggle Active twice returns to Inactive", () => {
    render(<DataActiveDemo />);
    const btn = screen.getByRole("button", { name: /Toggle Active/i });
    fireEvent.click(btn);
    fireEvent.click(btn);
    expect(screen.getByText(/Status: Inactive/i)).toBeInTheDocument();
  });

  it("card element has data-active attribute when isActive is true", () => {
    render(<DataActiveDemo />);
    const btn = screen.getByRole("button", { name: /Toggle Active/i });
    // Initially no data-active attribute
    const statusText = screen.getByText(/Status: Inactive/i);
    const card = statusText.closest("[class*='rounded-xl']");
    expect(card).not.toHaveAttribute("data-active");
    // After click, data-active attribute should be present
    fireEvent.click(btn);
    expect(card).toHaveAttribute("data-active");
  });

  it("card element does NOT have data-active attribute when isActive is false", () => {
    render(<DataActiveDemo />);
    const statusText = screen.getByText(/Status: Inactive/i);
    const card = statusText.closest("[class*='rounded-xl']");
    expect(card).not.toHaveAttribute("data-active");
  });

  it("CodeCallout renders DATA_CALLOUT value with data-active class strings", () => {
    render(<DataActiveDemo />);
    // DATA_CALLOUT = "data-active:bg-purple-600\ndata-active:text-white"
    // whitespace-pre-wrap means \n renders as a line break — text content contains both strings
    expect(
      screen.getByText(/data-active:bg-purple-600/)
    ).toBeInTheDocument();
  });

  it("renders headless UI helper paragraph", () => {
    render(<DataActiveDemo />);
    expect(
      screen.getByText(/Headless UI libraries/i)
    ).toBeInTheDocument();
  });
});
