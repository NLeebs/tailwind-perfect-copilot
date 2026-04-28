import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import WhatIsTailwind from "@/app/what-is-tailwind/page";
import UtilityClasses from "@/app/utility-classes/page";
import ResponsivenessDarkMode from "@/app/responsiveness-dark-mode/page";
import CustomizingTailwind from "@/app/customizing-tailwind/page";
import ConditionalStyling from "@/app/conditional-styling/page";

const cases = [
  { Component: WhatIsTailwind, number: "02", title: "What is Tailwind?" },
  { Component: UtilityClasses, number: "03", title: "Tailwind Utility Classes" },
  {
    Component: ResponsivenessDarkMode,
    number: "04",
    title: "Responsiveness & Dark Mode",
  },
  { Component: CustomizingTailwind, number: "05", title: "Customizing Tailwind" },
  { Component: ConditionalStyling, number: "06", title: "Conditional Styling" },
] as const;

describe("Empty slide pages", () => {
  cases.forEach(({ Component, number, title }) => {
    describe(title, () => {
      it(`renders slide number ${number}`, () => {
        render(<Component />);
        expect(screen.getByText(number)).toBeInTheDocument();
      });

      it("renders the correct page heading", () => {
        render(<Component />);
        expect(
          screen.getByRole("heading", { level: 1, name: title })
        ).toBeInTheDocument();
      });

      it("shows the content coming soon placeholder", () => {
        render(<Component />);
        expect(screen.getByText(/content coming soon/i)).toBeInTheDocument();
      });
    });
  });
});
