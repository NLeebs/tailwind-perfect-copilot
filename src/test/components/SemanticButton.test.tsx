import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SemanticButton from "@/components/SemanticButton";

describe("SemanticButton", () => {
  it("renders the semantic .btn button", () => {
    render(<SemanticButton />);
    expect(
      screen.getByRole("button", { name: /^button$/i })
    ).toBeInTheDocument();
  });

  it("renders BTN_CSS_DEFINITION callout without any click (always visible — D-08)", () => {
    render(<SemanticButton />);
    // BTN_CSS_DEFINITION is the class selector — callout shows the .btn name on initial render.
    expect(screen.getByText(/\.btn/)).toBeInTheDocument();
  });

  it("does not render any toggle/show-css button (D-08 removes click-to-reveal)", () => {
    render(<SemanticButton />);
    // Only the demo .btn button should exist; no second toggle control.
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(1);
  });
});
