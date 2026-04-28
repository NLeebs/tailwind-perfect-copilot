import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import ThemeToggle from "@/components/ThemeToggle";

describe("ThemeToggle", () => {
  beforeEach(() => {
    document.documentElement.classList.remove("dark");
    localStorage.clear();
  });

  it("renders a button with an accessible label", () => {
    render(<ThemeToggle />);
    expect(
      screen.getByRole("button", { name: /toggle light\/dark mode/i })
    ).toBeInTheDocument();
  });

  it("renders an SVG icon", () => {
    const { container } = render(<ThemeToggle />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("adds the dark class to the document element when clicked from light mode", async () => {
    render(<ThemeToggle />);
    await act(async () => {
      fireEvent.click(screen.getByRole("button"));
    });
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("removes the dark class when clicked from dark mode", async () => {
    document.documentElement.classList.add("dark");
    render(<ThemeToggle />);
    await act(async () => {
      fireEvent.click(screen.getByRole("button"));
    });
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("saves 'dark' to localStorage when enabling dark mode", async () => {
    render(<ThemeToggle />);
    await act(async () => {
      fireEvent.click(screen.getByRole("button"));
    });
    expect(localStorage.getItem("theme")).toBe("dark");
  });

  it("saves 'light' to localStorage when disabling dark mode", async () => {
    document.documentElement.classList.add("dark");
    render(<ThemeToggle />);
    await act(async () => {
      fireEvent.click(screen.getByRole("button"));
    });
    expect(localStorage.getItem("theme")).toBe("light");
  });
});
