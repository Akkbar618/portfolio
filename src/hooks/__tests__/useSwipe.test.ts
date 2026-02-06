import { act, renderHook } from "@testing-library/react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { describe, expect, it, vi } from "vitest";
import { useSwipe } from "@/hooks/useSwipe";

const mouseEvent = (
  clientX: number,
  clientY: number
): ReactMouseEvent => ({
  clientX,
  clientY,
  preventDefault: vi.fn(),
} as unknown as ReactMouseEvent);

describe("useSwipe", () => {
  it("triggers left swipe callback for horizontal drag to left", () => {
    const onSwipeLeft = vi.fn();
    const { result } = renderHook(() =>
      useSwipe({ threshold: 30, onSwipeLeft })
    );

    act(() => {
      result.current.onMouseDown(mouseEvent(200, 100));
      result.current.onMouseMove(mouseEvent(120, 105));
      result.current.onMouseUp();
    });

    expect(onSwipeLeft).toHaveBeenCalledTimes(1);
  });

  it("triggers right swipe callback for horizontal drag to right", () => {
    const onSwipeRight = vi.fn();
    const { result } = renderHook(() =>
      useSwipe({ threshold: 30, onSwipeRight })
    );

    act(() => {
      result.current.onMouseDown(mouseEvent(100, 100));
      result.current.onMouseMove(mouseEvent(170, 98));
      result.current.onMouseUp();
    });

    expect(onSwipeRight).toHaveBeenCalledTimes(1);
  });

  it("triggers tap callback when movement stays under tap threshold", () => {
    const onTap = vi.fn();
    const { result } = renderHook(() =>
      useSwipe({ tapThreshold: 10, onTap })
    );

    act(() => {
      result.current.onMouseDown(mouseEvent(100, 100));
      result.current.onMouseMove(mouseEvent(104, 106));
      result.current.onMouseUp();
    });

    expect(onTap).toHaveBeenCalledTimes(1);
  });

  it("does not treat vertical drag as horizontal swipe", () => {
    const onSwipeLeft = vi.fn();
    const onSwipeRight = vi.fn();
    const { result } = renderHook(() =>
      useSwipe({ threshold: 30, onSwipeLeft, onSwipeRight })
    );

    act(() => {
      result.current.onMouseDown(mouseEvent(150, 100));
      result.current.onMouseMove(mouseEvent(148, 180));
      result.current.onMouseUp();
    });

    expect(onSwipeLeft).not.toHaveBeenCalled();
    expect(onSwipeRight).not.toHaveBeenCalled();
  });
});
