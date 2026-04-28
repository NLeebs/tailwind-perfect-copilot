import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Home from "@/app/page";

describe("Home page", () => {
  it("renders the main talk title", () => {
    render(<Home />);
    expect(screen.getByText("Tailwind CSS")).toBeInTheDocument();
  });

  it("renders the speaker attribution", () => {
    render(<Home />);
    expect(
      screen.getByText(/A Talk by Nathan Lieberman/i)
    ).toBeInTheDocument();
  });

  it("renders all 6 slide topic cards", () => {
    render(<Home />);
    expect(screen.getByText("The History of CSS")).toBeInTheDocument();
    expect(screen.getByText("What is Tailwind?")).toBeInTheDocument();
    expect(screen.getByText("Tailwind Utility Classes")).toBeInTheDocument();
    expect(screen.getByText("Responsiveness & Dark Mode")).toBeInTheDocument();
    expect(screen.getByText("Customizing Tailwind")).toBeInTheDocument();
    expect(screen.getByText("Conditional Styling")).toBeInTheDocument();
  });

  it("renders the correct hrefs for all topic cards", () => {
    render(<Home />);
    const hrefs = screen
      .getAllByRole("link")
      .map((l) => l.getAttribute("href"));
    expect(hrefs).toContain("/history-of-css");
    expect(hrefs).toContain("/what-is-tailwind");
    expect(hrefs).toContain("/utility-classes");
    expect(hrefs).toContain("/responsiveness-dark-mode");
    expect(hrefs).toContain("/customizing-tailwind");
    expect(hrefs).toContain("/conditional-styling");
  });

  it("renders slide numbers for the first and last cards", () => {
    render(<Home />);
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("06")).toBeInTheDocument();
  });
});
