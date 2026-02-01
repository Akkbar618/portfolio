import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    }
  }, [location.pathname]);

  return (
    <MainLayout
      variant="detail"
      className="bg-white dark:bg-[#0E172A] text-gray-900 dark:text-white transition-colors duration-300"
    >
      <main className="flex-grow flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">404</h1>
          <p className="mb-4 text-xl text-gray-500 dark:text-slate-400">Oops! Page not found</p>
          <Link to="/" state={{ scrollTo: "home" }} className="text-blue-500 hover:underline">
            Return to Home
          </Link>
        </div>
      </main>
    </MainLayout>
  );
};

export default NotFound;
