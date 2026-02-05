import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";
import { BackToTop } from "@/components/BackToTop";
import { cn } from "@/lib/utils";

type MainLayoutProps = {
    children: ReactNode;
    variant?: "home" | "detail";
    className?: string;
};

export const MainLayout = ({
    children,
    variant = "home",
    className = "",
}: MainLayoutProps) => {
    return (
        <div className={cn("min-h-screen", className)}>
            <Navbar variant={variant} />
            <main>{children}</main>
            <Footer />
            <BackToTop />
        </div>
    );
};
