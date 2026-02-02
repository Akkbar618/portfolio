import { useEffect, useState } from "react";

type ThemeMode = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

const getSystemTheme = (): ResolvedTheme => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export function useTheme() {
    const [mode, setMode] = useState<ThemeMode>("system");
    const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() => getSystemTheme());

    useEffect(() => {
        if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        const apply = () => {
            const nextTheme = mode === "system" ? (mediaQuery.matches ? "dark" : "light") : mode;
            setResolvedTheme(nextTheme);
        };

        apply();
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

    return { theme: resolvedTheme, mode, toggleTheme, setTheme: setMode };
}
