import { useRef } from "react";
import type { TouchEvent, MouseEvent } from "react";

type SwipeOptions = {
  threshold?: number;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onTap?: () => void;
};

export const useSwipe = ({
  threshold = 50,
  onSwipeLeft,
  onSwipeRight,
  onTap,
}: SwipeOptions) => {
  const startX = useRef(0);
  const endX = useRef(0);
  const isDragging = useRef(false);

  const start = (clientX: number) => {
    startX.current = clientX;
    endX.current = clientX;
    isDragging.current = true;
  };

  const move = (clientX: number) => {
    if (!isDragging.current) return;
    endX.current = clientX;
  };

  const end = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const diff = startX.current - endX.current;
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        onSwipeLeft?.();
      } else {
        onSwipeRight?.();
      }
    } else {
      onTap?.();
    }
    startX.current = 0;
    endX.current = 0;
  };

  const onTouchStart = (event: TouchEvent) => {
    const touch = event.touches[0];
    if (!touch) return;
    start(touch.clientX);
  };

  const onTouchMove = (event: TouchEvent) => {
    const touch = event.touches[0];
    if (!touch) return;
    move(touch.clientX);
  };

  const onTouchEnd = () => {
    end();
  };

  const onMouseDown = (event: MouseEvent) => {
    event.preventDefault();
    start(event.clientX);
  };

  const onMouseMove = (event: MouseEvent) => {
    move(event.clientX);
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
