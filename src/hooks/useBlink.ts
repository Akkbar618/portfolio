import { useEffect, useRef, useState } from "react";

export const BLINK_ON_DURATION = 3000;
export const BLINK_OFF_DURATION = 1000;
export const BLINK_CYCLE_DURATION = BLINK_ON_DURATION + BLINK_OFF_DURATION;

export const getBlinkState = (now = Date.now()) =>
    now % BLINK_CYCLE_DURATION < BLINK_ON_DURATION;

export const getNextBlinkDelay = (now = Date.now()) => {
    const timeInCycle = now % BLINK_CYCLE_DURATION;
    if (timeInCycle < BLINK_ON_DURATION) {
        return BLINK_ON_DURATION - timeInCycle;
    }
    return BLINK_CYCLE_DURATION - timeInCycle;
};

export const useBlink = () => {
    const [isVisible, setIsVisible] = useState(() => getBlinkState());
    const [reduceMotion, setReduceMotion] = useState(false);
    const timeoutRef = useRef<number | null>(null);

    const clearTimer = () => {
        if (timeoutRef.current !== null) {
            window.clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    };

    const scheduleNext = () => {
        clearTimer();
        const now = Date.now();
        const nextDelay = getNextBlinkDelay(now);
        setIsVisible((prev) => {
            const next = getBlinkState(now);
            return prev === next ? prev : next;
        });
        timeoutRef.current = window.setTimeout(() => {
            setIsVisible((prev) => {
                const next = getBlinkState();
                return prev === next ? prev : next;
            });
            scheduleNext();
        }, nextDelay);
    };

    useEffect(() => {
        if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
            return;
        }
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        const handleChange = () => setReduceMotion(mediaQuery.matches);
        handleChange();
        if ("addEventListener" in mediaQuery) {
            mediaQuery.addEventListener("change", handleChange);
            return () => mediaQuery.removeEventListener("change", handleChange);
        }
        mediaQuery.addListener(handleChange);
        return () => mediaQuery.removeListener(handleChange);
    }, []);

    useEffect(() => {
        if (reduceMotion) {
            clearTimer();
            setIsVisible(true);
            return;
        }

        const handleVisibility = () => {
            if (document.hidden) {
                clearTimer();
                return;
            }
            scheduleNext();
        };

        scheduleNext();
        document.addEventListener("visibilitychange", handleVisibility);

        return () => {
            clearTimer();
            document.removeEventListener("visibilitychange", handleVisibility);
        };
    }, [reduceMotion]);

    return isVisible;
};
