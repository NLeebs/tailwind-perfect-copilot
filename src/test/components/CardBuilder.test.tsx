import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import CardBuilder from "@/components/CardBuilder";

describe("CardBuilder", () => {
  it("renders without error — contains Tailwind Card heading and body text", () => {
    render(<CardBuilder />);
    expect(screen.getByText("Tailwind Card")).toBeInTheDocument();
    expect(
      screen.getByText("Utilities compose one step at a time.")
    ).toBeInTheDocument();
  });

  it("initial render shows step 0 classes on the card element", () => {
    render(<CardBuilder />);
    // The demo card at step 0 has only "w-full max-w-sm"
    const card = screen.getByText("Tailwind Card").closest("div");
    expect(card).toHaveClass("w-full");
    expect(card).toHaveClass("max-w-sm");
  });

  it("clicking Next button advances to step 1 — card has p-6 in its classes", () => {
    render(<CardBuilder />);
    const nextBtn = screen.getByRole("button", { name: /Next/i });
    fireEvent.click(nextBtn);
    const card = screen.getByText("Tailwind Card").closest("div");
    expect(card).toHaveClass("p-6");
  });

  it("clicking a step node directly (index 3) sets activeStep to 3", () => {
    render(<CardBuilder />);
    // Step node buttons are numbered 1–6; node 4 (index 3) = Color step
    const stepButtons = screen.getAllByRole("button").filter((btn) =>
      btn.textContent?.match(/^[1-6]/)
    );
    fireEvent.click(stepButtons[3]);
    const card = screen.getByText("Tailwind Card").closest("div");
    // Step 3 allClasses includes bg-white
    expect(card).toHaveClass("bg-white");
  });

  it("CodeCallout receives newClasses — at step 0 shows w-full max-w-sm", () => {
    render(<CardBuilder />);
    // CodeCallout renders inside a <p> with font-mono; its text content = newClasses
    const callout = screen.getByText("w-full max-w-sm");
    expect(callout).toBeInTheDocument();
  });

  it("CodeCallout updates to p-6 at step 1 after clicking Next", () => {
    render(<CardBuilder />);
    const nextBtn = screen.getByRole("button", { name: /Next/i });
    fireEvent.click(nextBtn);
    const callout = screen.getByText("p-6");
    expect(callout).toBeInTheDocument();
  });

  it("Prev button is disabled at step 0", () => {
    render(<CardBuilder />);
    const prevBtn = screen.getByRole("button", { name: /Prev/i });
    expect(prevBtn).toBeDisabled();
  });

  it("Next button is disabled at step 5 (last step)", () => {
    render(<CardBuilder />);
    const nextBtn = screen.getByRole("button", { name: /Next/i });
    // Advance 5 times to reach step 5
    for (let i = 0; i < 5; i++) {
      fireEvent.click(nextBtn);
    }
    expect(nextBtn).toBeDisabled();
  });
});
