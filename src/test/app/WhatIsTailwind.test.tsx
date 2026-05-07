import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import WhatIsTailwind from "@/app/what-is-tailwind/page";

describe("What is Tailwind page (Phase 8 rework)", () => {
  it("renders within the slide layout with number 02", () => {
    render(<WhatIsTailwind />);
    expect(screen.getByText("02")).toBeInTheDocument();
  });

  // S2-01 — Philosophy intro section (Section 1)
  it("renders the philosophy intro heading 'A Utility-First CSS Framework'", () => {
    render(<WhatIsTailwind />);
    expect(
      screen.getByRole("heading", { name: /A Utility-First CSS Framework/i })
    ).toBeInTheDocument();
  });

  it("renders the philosophy intro body text mentioning composable utility classes", () => {
    render(<WhatIsTailwind />);
    expect(screen.getByText(/composable/i)).toBeInTheDocument();
    expect(screen.getByText(/utility classes/i)).toBeInTheDocument();
  });

  // S2-02 — Problem cards (Section 2)
  it("renders all three problem card headings (Context Switching, Naming Things Is Hard, CSS Bloat)", () => {
    render(<WhatIsTailwind />);
    expect(
      screen.getByRole("heading", { name: /Context Switching/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Naming Things Is Hard/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /CSS Bloat/i })
    ).toBeInTheDocument();
  });

  // S2-03 — Two-column demo grid wires SemanticButton + UtilityButton
  it("renders both demo column overlines (Semantic CSS, Utility-First Tailwind)", () => {
    render(<WhatIsTailwind />);
    expect(screen.getByText("Semantic CSS")).toBeInTheDocument();
    expect(screen.getByText("Utility-First Tailwind")).toBeInTheDocument();
  });

  it("renders both demo buttons (one from SemanticButton, one from UtilityButton)", () => {
    render(<WhatIsTailwind />);
    const buttons = screen.getAllByRole("button", { name: /^button$/i });
    expect(buttons).toHaveLength(2);
  });

  // S2-04 — Naming card with three CSS class-name stubs in CodeCallout
  it("renders the naming card CodeCallout with .card-header, .card-title, .card-highlighted", () => {
    render(<WhatIsTailwind />);
    // CodeCallout renders a multi-line string with whitespace-pre-wrap; match the
    // single text node containing all three stubs. Use a regex that allows any
    // whitespace (including newlines) between the three rules.
    const callout = screen.getByText(
      /\.card-header\s*\{\}[\s\S]*\.card-title\s*\{\}[\s\S]*\.card-highlighted\s*\{\}/
    );
    expect(callout).toBeInTheDocument();
  });

  // ButtonComparison must no longer be referenced
  it("does not render the legacy ButtonComparison toggle (the show/hide CSS click was removed in D-08)", () => {
    render(<WhatIsTailwind />);
    // After the rework there should be exactly two demo buttons (SemanticButton + UtilityButton).
    // If ButtonComparison were still present there would be additional buttons or duplicate text.
    const buttons = screen.getAllByRole("button", { name: /^button$/i });
    expect(buttons.length).toBeLessThanOrEqual(2);
  });
});
