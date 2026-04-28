import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SunIcon from "@/components/icons/SunIcon";

describe("SunIcon", () => {
  it("renders an SVG element", () => {
    const { container } = render(<SunIcon />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("uses currentColor for stroke", () => {
    const { container } = render(<SunIcon />);
    const stroked = container.querySelector("[stroke='currentColor']");
    expect(stroked).toBeInTheDocument();
  });
});
