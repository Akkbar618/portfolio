import { useEffect, useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Hero } from "@/components/sections/Hero";
import { TechStack } from "@/components/sections/TechStack";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { MainLayout } from "@/components/layout/MainLayout";

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Handle state-driven navigation (e.g., from ProjectDetail)
  useLayoutEffect(() => {
    const scrollTo = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (!scrollTo) return;

    const rafId = window.requestAnimationFrame(() => {
      if (scrollTo === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const element = document.getElementById(scrollTo);
        element?.scrollIntoView({ behavior: "smooth" });
      }
      navigate(location.pathname, { replace: true, state: null });
    });

    return () => window.cancelAnimationFrame(rafId);
  }, [location.pathname, location.state, navigate]);

  useLayoutEffect(() => {
    const navEntry = performance.getEntriesByType("navigation")[0];
    const isReload =
      navEntry && "type" in navEntry && navEntry.type === "reload";

    if (isReload) {
      const saved = sessionStorage.getItem("scrollY");
      if (saved) {
        window.scrollTo({ top: Number(saved), behavior: "auto" });
      }
    }
  }, []);

  useEffect(() => {
    let rafId = 0;

    const saveScroll = () => {
      sessionStorage.setItem("scrollY", String(window.scrollY));
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        saveScroll();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pagehide", saveScroll);

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pagehide", saveScroll);
    };
  }, []);

  return (
    <MainLayout
      variant="home"
      className="bg-[#f8f9fa] dark:bg-slate-950 text-gray-900 dark:text-slate-100 antialiased overflow-x-hidden font-sans transition-colors duration-300"
    >
      <Hero />
      <TechStack />
      <About />
      <Projects />
    </MainLayout>
  );
};

export default Index;
