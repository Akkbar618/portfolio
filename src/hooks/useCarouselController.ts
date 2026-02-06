import { useCallback, useEffect, useRef, useState } from "react";
import { CAROUSEL_AUTO_SCROLL_INTERVAL_MS } from "@/constants/ui.constants";

export type SlideDirection = "left" | "right";

type UseCarouselOptions = {
  totalItems: number;
  autoScrollMs?: number;
  onSlugChange?: string;
};

const normalizeIndex = (index: number, totalItems: number) => {
  if (totalItems <= 0) return 0;
  return ((index % totalItems) + totalItems) % totalItems;
};

export const useCarouselController = ({
  totalItems,
  autoScrollMs = CAROUSEL_AUTO_SCROLL_INTERVAL_MS,
  onSlugChange,
}: UseCarouselOptions) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<SlideDirection>("left");
  const intervalRef = useRef<number | null>(null);

  const clearAutoScroll = useCallback(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startAutoScroll = useCallback(() => {
    clearAutoScroll();
    if (totalItems <= 1 || autoScrollMs <= 0) return;

    intervalRef.current = window.setInterval(() => {
      setSlideDirection("left");
      setCurrentIndex((prev) => normalizeIndex(prev + 1, totalItems));
    }, autoScrollMs);
  }, [autoScrollMs, clearAutoScroll, totalItems]);

  const resetAutoScroll = useCallback(() => {
    startAutoScroll();
  }, [startAutoScroll]);

  const handleNext = useCallback(() => {
    if (totalItems <= 1) return;
    setSlideDirection("left");
    setCurrentIndex((prev) => normalizeIndex(prev + 1, totalItems));
    resetAutoScroll();
  }, [resetAutoScroll, totalItems]);

  const handlePrev = useCallback(() => {
    if (totalItems <= 1) return;
    setSlideDirection("right");
    setCurrentIndex((prev) => normalizeIndex(prev - 1, totalItems));
    resetAutoScroll();
  }, [resetAutoScroll, totalItems]);

  const goToIndex = useCallback(
    (nextIndex: number, direction?: SlideDirection) => {
      if (totalItems <= 0) return;
      const normalized = normalizeIndex(nextIndex, totalItems);

      if (totalItems > 1) {
        const inferredDirection =
          direction ?? (normalized > currentIndex ? "left" : "right");
        setSlideDirection(inferredDirection);
      }

      setCurrentIndex(normalized);

      if (totalItems > 1) {
        resetAutoScroll();
      }
    },
    [currentIndex, resetAutoScroll, totalItems]
  );

  useEffect(() => {
    if (totalItems <= 0) {
      setCurrentIndex(0);
      clearAutoScroll();
      return;
    }

    setCurrentIndex((prev) => normalizeIndex(prev, totalItems));
  }, [clearAutoScroll, totalItems]);

  useEffect(() => {
    setCurrentIndex(0);
    setSlideDirection("left");
    startAutoScroll();
  }, [onSlugChange, startAutoScroll]);

  useEffect(() => {
    if (totalItems <= 1 || autoScrollMs <= 0) {
      clearAutoScroll();
      return;
    }

    startAutoScroll();

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        startAutoScroll();
      } else {
        clearAutoScroll();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      clearAutoScroll();
    };
  }, [autoScrollMs, clearAutoScroll, startAutoScroll, totalItems]);

  return {
    currentIndex,
    slideDirection,
    handleNext,
    handlePrev,
    goToIndex,
  };
};
