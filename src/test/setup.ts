import "@testing-library/jest-dom";
import { vi } from "vitest";

const mockIntersectionObserver = vi
  .fn()
  .mockImplementation((callback: IntersectionObserverCallback) => ({
    observe: vi.fn((el: Element) => {
      callback(
        [{ isIntersecting: true, target: el } as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    }),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: mockIntersectionObserver,
});
