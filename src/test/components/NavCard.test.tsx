import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import NavCard from "@/components/NavCard";

const defaultProps = {
  number: "01",
  title: "The History of CSS",
  tagline: "From inline styles to the cascade.",
  href: "/history-of-css",
};

describe("NavCard", () => {
  it("renders the slide number badge", () => {
    render(<NavCard {...defaultProps} />);
    expect(screen.getByText("01")).toBeInTheDocument();
  });

  it("renders the title as a heading", () => {
    render(<NavCard {...defaultProps} />);
    expect(
      screen.getByRole("heading", { name: "The History of CSS" })
    ).toBeInTheDocument();
  });

  it("renders the tagline", () => {
    render(<NavCard {...defaultProps} />);
    expect(
      screen.getByText("From inline styles to the cascade.")
    ).toBeInTheDocument();
  });

  it("renders as a link with the correct href", () => {
    render(<NavCard {...defaultProps} />);
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/history-of-css"
    );
  });

  it("renders the arrow indicator", () => {
    render(<NavCard {...defaultProps} />);
    expect(screen.getByText("→")).toBeInTheDocument();
  });
});
