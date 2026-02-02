import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { HelmetProvider } from "react-helmet-async";
import { PageLoader } from "@/components/ui/PageLoader";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Index from "./pages/Index";

// Lazy load secondary pages
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => (
  <HelmetProvider>
    <ErrorBoundary>
      <Sonner />
      <BrowserRouter
        basename={import.meta.env.BASE_URL}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  </HelmetProvider>
);

export default App;
