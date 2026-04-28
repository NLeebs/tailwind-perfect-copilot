import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SlideLayout from "@/components/SlideLayout";

describe("SlideLayout", () => {
  it("renders the slide number badge", () => {
    render(<SlideLayout number="01" title="The History of CSS" />);
    expect(screen.getByText("01")).toBeInTheDocument();
  });

  it("renders the title in an h1", () => {
    render(<SlideLayout number="01" title="The History of CSS" />);
    expect(
      screen.getByRole("heading", { level: 1, name: "The History of CSS" })
    ).toBeInTheDocument();
  });

  it("renders a back link to the home page", () => {
    render(<SlideLayout number="01" title="The History of CSS" />);
    expect(
      screen.getByRole("link", { name: /back to overview/i })
    ).toHaveAttribute("href", "/");
  });

  it("renders children when provided", () => {
    render(
      <SlideLayout number="01" title="Test">
        <p>Custom slide content</p>
      </SlideLayout>
    );
    expect(screen.getByText("Custom slide content")).toBeInTheDocument();
  });

  it("shows the fallback when no children are provided", () => {
    render(<SlideLayout number="01" title="Test" />);
    expect(screen.getByText(/content coming soon/i)).toBeInTheDocument();
  });

  it("does not show the fallback when children are provided", () => {
    render(
      <SlideLayout number="01" title="Test">
        <p>Real content</p>
      </SlideLayout>
    );
    expect(screen.queryByText(/content coming soon/i)).not.toBeInTheDocument();
  });
});
