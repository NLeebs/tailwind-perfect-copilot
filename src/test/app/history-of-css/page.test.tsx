import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import HistoryOfCSS from "@/app/history-of-css/page";

describe("History of CSS page", () => {
  it("renders within the slide layout with number 01", () => {
    render(<HistoryOfCSS />);
    expect(screen.getByText("01")).toBeInTheDocument();
  });

  it("renders the page heading", () => {
    render(<HistoryOfCSS />);
    expect(
      screen.getByRole("heading", { level: 1, name: "The History of CSS" })
    ).toBeInTheDocument();
  });

  it("renders the back navigation link", () => {
    render(<HistoryOfCSS />);
    expect(
      screen.getByRole("link", { name: /back to overview/i })
    ).toHaveAttribute("href", "/");
  });

  it("renders the CSS timeline with all 6 eras", () => {
    render(<HistoryOfCSS />);
    expect(screen.getByText("The birth of CSS")).toBeInTheDocument();
    expect(screen.getByText("CSS today and beyond")).toBeInTheDocument();
  });
});
