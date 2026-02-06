import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useCarouselController } from "@/hooks/useCarouselController";

const setVisibilityState = (state: DocumentVisibilityState) => {
  Object.defineProperty(document, "visibilityState", {
    configurable: true,
    value: state,
  });
};

describe("useCarouselController", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    setVisibilityState("visible");
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("advances automatically with interval", () => {
    const { result } = renderHook(() =>
      useCarouselController({ totalItems: 3, autoScrollMs: 1000 })
    );

    expect(result.current.currentIndex).toBe(0);
    expect(result.current.slideDirection).toBe("left");

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.currentIndex).toBe(1);

    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(result.current.currentIndex).toBe(0);
  });

  it("supports next/prev and direct index navigation", () => {
    const { result } = renderHook(() =>
      useCarouselController({ totalItems: 4, autoScrollMs: 5000 })
    );

    act(() => {
      result.current.handleNext();
    });
    expect(result.current.currentIndex).toBe(1);
    expect(result.current.slideDirection).toBe("left");

    act(() => {
      result.current.handlePrev();
    });
    expect(result.current.currentIndex).toBe(0);
    expect(result.current.slideDirection).toBe("right");

    act(() => {
      result.current.goToIndex(3);
    });
    expect(result.current.currentIndex).toBe(3);
  });

  it("resets to index 0 when slug key changes", () => {
    const { result, rerender } = renderHook(
      ({ slug }) =>
        useCarouselController({
          totalItems: 3,
          autoScrollMs: 5000,
          onSlugChange: slug,
        }),
      { initialProps: { slug: "one" } }
    );

    act(() => {
      result.current.goToIndex(2);
    });
    expect(result.current.currentIndex).toBe(2);

    rerender({ slug: "two" });
    expect(result.current.currentIndex).toBe(0);
    expect(result.current.slideDirection).toBe("left");
  });

  it("pauses auto-scroll when document is hidden", () => {
    const { result } = renderHook(() =>
      useCarouselController({ totalItems: 3, autoScrollMs: 1000 })
    );

    expect(result.current.currentIndex).toBe(0);

    act(() => {
      setVisibilityState("hidden");
      document.dispatchEvent(new Event("visibilitychange"));
      vi.advanceTimersByTime(3000);
    });
    expect(result.current.currentIndex).toBe(0);

    act(() => {
      setVisibilityState("visible");
      document.dispatchEvent(new Event("visibilitychange"));
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.currentIndex).toBe(1);
  });
});
