import { render, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NotFound from "../pages/NotFound";
import { describe, it, expect, vi, afterEach } from "vitest";

describe("NotFound Benchmark", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("measures render time and ensures no console.error", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const start = performance.now();
    const iterations = 100;

    for (let i = 0; i < iterations; i++) {
      const { unmount } = render(
        <MemoryRouter initialEntries={["/non-existent"]}>
          <NotFound />
        </MemoryRouter>
      );
      unmount();
    }

    const end = performance.now();
    const duration = end - start;

    console.log(`Rendered ${iterations} times in ${duration.toFixed(2)}ms`);

    // Verify that console.error was NOT called
    expect(consoleSpy).not.toHaveBeenCalled();
  });
});
