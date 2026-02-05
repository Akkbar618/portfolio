import { useRef } from "react";
import type { TouchEvent, MouseEvent } from "react";

type SwipeOptions = {
  threshold?: number;
  tapThreshold?: number;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onTap?: () => void;
};

export const useSwipe = ({
  threshold = 50,
  tapThreshold = 10,
  onSwipeLeft,
  onSwipeRight,
  onTap,
}: SwipeOptions) => {
  const startX = useRef(0);
  const startY = useRef(0);
  const endX = useRef(0);
  const endY = useRef(0);
  const isDragging = useRef(false);

  const start = (clientX: number, clientY: number) => {
    startX.current = clientX;
    startY.current = clientY;
    endX.current = clientX;
    endY.current = clientY;
    isDragging.current = true;
  };

  const move = (clientX: number, clientY: number) => {
    if (!isDragging.current) return;
    endX.current = clientX;
    endY.current = clientY;
  };

  const end = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const diffX = startX.current - endX.current;
    const diffY = startY.current - endY.current;
    const absX = Math.abs(diffX);
    const absY = Math.abs(diffY);

    if (absX > threshold && absX > absY) {
      if (diffX > 0) {
        onSwipeLeft?.();
      } else {
        onSwipeRight?.();
      }
    } else if (absX < tapThreshold && absY < tapThreshold) {
      onTap?.();
    }
    startX.current = 0;
    startY.current = 0;
    endX.current = 0;
    endY.current = 0;
  };

  const onTouchStart = (event: TouchEvent) => {
    const touch = event.touches[0];
    if (!touch) return;
    start(touch.clientX, touch.clientY);
  };

  const onTouchMove = (event: TouchEvent) => {
    const touch = event.touches[0];
    if (!touch) return;
    move(touch.clientX, touch.clientY);
  };

  const onTouchEnd = () => {
    end();
  };

  const onMouseDown = (event: MouseEvent) => {
    event.preventDefault();
    start(event.clientX, event.clientY);
  };

  const onMouseMove = (event: MouseEvent) => {
    move(event.clientX, event.clientY);
  };

  const onMouseUp = () => {
    end();
  };

  const onMouseLeave = () => {
    end();
  };

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseLeave,
  };
};
