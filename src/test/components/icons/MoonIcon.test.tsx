import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import MoonIcon from "@/components/icons/MoonIcon";

describe("MoonIcon", () => {
  it("renders an SVG element", () => {
    const { container } = render(<MoonIcon />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("uses currentColor for stroke", () => {
    const { container } = render(<MoonIcon />);
    const stroked = container.querySelector("[stroke='currentColor']");
    expect(stroked).toBeInTheDocument();
  });
});
