import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import WhatIsTailwind from "@/app/what-is-tailwind/page";
import UtilityClasses from "@/app/utility-classes/page";
import ResponsivenessDarkMode from "@/app/responsiveness-dark-mode/page";
import CustomizingTailwind from "@/app/customizing-tailwind/page";
import ConditionalStyling from "@/app/conditional-styling/page";

const allCases = [
  { Component: WhatIsTailwind, number: "02", title: "What is Tailwind?" },
  { Component: UtilityClasses, number: "03", title: "Core Utility Classes" },
  {
    Component: ResponsivenessDarkMode,
    number: "04",
    title: "Responsiveness & Dark Mode",
  },
  { Component: CustomizingTailwind, number: "05", title: "Customizing Tailwind" },
  { Component: ConditionalStyling, number: "06", title: "Conditional Styling" },
] as const;

// Pages that have not yet been implemented — still show the stub placeholder
const stubCases = allCases.filter(({ number }) =>
  ([] as string[]).includes(number)
);

describe("Slide pages", () => {
  allCases.forEach(({ Component, number, title }) => {
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
    });
  });

  if (stubCases.length > 0) {
    describe("Stub pages (content coming soon)", () => {
      stubCases.forEach(({ Component, title }) => {
        it(`${title} shows the content coming soon placeholder`, () => {
          render(<Component />);
          expect(screen.getByText(/content coming soon/i)).toBeInTheDocument();
        });
      });
    });
  }
});

describe("Customizing Tailwind content", () => {
  it("renders the @utility scrollbar-hidden v3 equivalent callout (S5-02)", () => {
    render(<CustomizingTailwind />);
    expect(screen.getByText(/scrollbar-hidden/i)).toBeInTheDocument();
  });

  it("renders the live h1 demo for the @layer base section (S5-03)", () => {
    render(<CustomizingTailwind />);
    expect(screen.getByText(/Live h1 Demo/i)).toBeInTheDocument();
  });
});

describe("Conditional Styling content", () => {
  it("renders all three panel overline labels (S6-01)", () => {
    render(<ConditionalStyling />);
    expect(screen.getByText("CSS VARIANTS")).toBeInTheDocument();
    expect(screen.getByText("GROUP VARIANTS")).toBeInTheDocument();
    expect(screen.getByText("REACT STATE")).toBeInTheDocument();
  });

  it("renders the Panel 3 Toggle button (S6-01)", () => {
    render(<ConditionalStyling />);
    expect(screen.getByRole("button", { name: /^toggle$/i })).toBeInTheDocument();
  });

  it("renders the Toggle Active button in DataActiveDemo (S6-04)", () => {
    render(<ConditionalStyling />);
    expect(screen.getByRole("button", { name: /toggle active/i })).toBeInTheDocument();
  });

  it("renders email input with type email and placeholder (S6-03)", () => {
    render(<ConditionalStyling />);
    const input = screen.getByPlaceholderText("you@example.com");
    expect(input).toHaveAttribute("type", "email");
    expect(input).toHaveAttribute("placeholder", "you@example.com");
  });

  it("clicking Toggle Active adds data-active attribute to the data card (S6-04)", () => {
    render(<ConditionalStyling />);
    const btn = screen.getByRole("button", { name: /toggle active/i });
    fireEvent.click(btn);
    expect(screen.getByText("Status: Active")).toBeInTheDocument();
  });
});
