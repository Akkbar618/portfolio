import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type ThemeMode = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

const THEME_STORAGE_KEY = "theme-mode";

const getSystemTheme = (): ResolvedTheme => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const getStoredMode = (): ThemeMode => {
    if (typeof window === "undefined") return "system";
    try {
        const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
        if (stored === "light" || stored === "dark" || stored === "system") {
            return stored;
        }
    } catch {}
    return "system";
};

type ThemeContextValue = {
    theme: ResolvedTheme;
    mode: ThemeMode;
    toggleTheme: () => void;
    setTheme: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [mode, setMode] = useState<ThemeMode>(() => getStoredMode());
    const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() => {
        const initialMode = getStoredMode();
        return initialMode === "system" ? getSystemTheme() : initialMode;
    });

    useEffect(() => {
        if (typeof window === "undefined") return;
        try {
            window.localStorage.setItem(THEME_STORAGE_KEY, mode);
        } catch {}
    }, [mode]);

    useEffect(() => {
        if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        const apply = () => {
            const nextTheme = mode === "system" ? (mediaQuery.matches ? "dark" : "light") : mode;
            setResolvedTheme(nextTheme);
        };

        apply();
        if (mode !== "system") return;

        if ("addEventListener" in mediaQuery) {
            mediaQuery.addEventListener("change", apply);
            return () => mediaQuery.removeEventListener("change", apply);
        }
        mediaQuery.addListener(apply);
        return () => mediaQuery.removeListener(apply);
    }, [mode]);

    useEffect(() => {
        const root = document.documentElement;
        root.classList.toggle("dark", resolvedTheme === "dark");
    }, [resolvedTheme]);

    const toggleTheme = () => {
        setMode((prev) => {
            if (prev === "system") {
                return resolvedTheme === "dark" ? "light" : "dark";
            }
            return "system";
        });
    };

    const value = useMemo(
        () => ({ theme: resolvedTheme, mode, toggleTheme, setTheme: setMode }),
        [resolvedTheme, mode]
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within ThemeProvider");
    }
    return context;
}
