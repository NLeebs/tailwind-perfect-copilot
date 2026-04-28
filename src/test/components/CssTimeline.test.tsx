import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import CssTimeline from "@/components/CssTimeline";

describe("CssTimeline", () => {
  it("renders all 6 era headings", () => {
    render(<CssTimeline />);
    expect(screen.getByText("The birth of CSS")).toBeInTheDocument();
    expect(screen.getByText("The browser wars aftermath")).toBeInTheDocument();
    expect(screen.getByText("Standards renaissance")).toBeInTheDocument();
    expect(screen.getByText("The responsive revolution")).toBeInTheDocument();
    expect(screen.getByText("The modern CSS platform")).toBeInTheDocument();
    expect(screen.getByText("CSS today and beyond")).toBeInTheDocument();
  });

  it("renders year ranges for all eras", () => {
    render(<CssTimeline />);
    expect(screen.getByText("1994 – 1998")).toBeInTheDocument();
    expect(screen.getByText("1999 – 2005")).toBeInTheDocument();
    expect(screen.getByText("2006 – 2010")).toBeInTheDocument();
    expect(screen.getByText("2010 – 2015")).toBeInTheDocument();
    expect(screen.getByText("2015 – 2020")).toBeInTheDocument();
    expect(screen.getByText("2021 – present")).toBeInTheDocument();
  });

  it("renders era descriptions", () => {
    render(<CssTimeline />);
    expect(
      screen.getByText(/Håkon Wium Lie proposed CSS in 1994/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/IE6 dominated the market/)
    ).toBeInTheDocument();
  });

  it("has the first era expanded by default", () => {
    render(<CssTimeline />);
    expect(screen.getAllByRole("button")[0]).toHaveAttribute(
      "aria-expanded",
      "true"
    );
  });

  it("marks all other eras as collapsed by default", () => {
    render(<CssTimeline />);
    const buttons = screen.getAllByRole("button");
    buttons.slice(1).forEach((btn) => {
      expect(btn).toHaveAttribute("aria-expanded", "false");
    });
  });

  it("shows milestone content for the default-expanded first era", () => {
    render(<CssTimeline />);
    expect(
      screen.getByText(/Håkon Lie's original CSS proposal/)
    ).toBeInTheDocument();
  });

  it("expands an era when its button is clicked", () => {
    render(<CssTimeline />);
    const secondButton = screen.getAllByRole("button")[1];
    fireEvent.click(secondButton);
    expect(secondButton).toHaveAttribute("aria-expanded", "true");
  });

  it("collapses the previously expanded era when a new one is opened", () => {
    render(<CssTimeline />);
    const firstButton = screen.getAllByRole("button")[0];
    const secondButton = screen.getAllByRole("button")[1];
    fireEvent.click(secondButton);
    expect(firstButton).toHaveAttribute("aria-expanded", "false");
  });

  it("collapses an era when its button is clicked while already expanded", () => {
    render(<CssTimeline />);
    const firstButton = screen.getAllByRole("button")[0];
    fireEvent.click(firstButton);
    expect(firstButton).toHaveAttribute("aria-expanded", "false");
  });

  it("each button has an aria-controls pointing to a panel element in the DOM", () => {
    render(<CssTimeline />);
    screen.getAllByRole("button").forEach((button) => {
      const panelId = button.getAttribute("aria-controls");
      expect(panelId).toBeTruthy();
      expect(document.getElementById(panelId!)).toBeInTheDocument();
    });
  });
});
