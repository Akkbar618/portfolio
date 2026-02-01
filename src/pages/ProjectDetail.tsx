import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { projects, type Project, type ProjectScreen } from "@/data/projects";
import { ArrowLeft, Github, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { useEffect, useState, useCallback, useRef } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { CAROUSEL_AUTO_SCROLL_INTERVAL_MS } from "@/constants/ui.constants";
import { fallbackProjectStyle, projectStylesBySlug, type ProjectStyle } from "@/constants/projectStyles";
import { useSwipe } from "@/hooks/useSwipe";
import { toAbsoluteUrl, withBase } from "@/lib/urls";

type CarouselScreenProps = {
  screen: ProjectScreen;
  style: ProjectStyle;
  slideDirection: "left" | "right";
};

const CarouselScreen = ({ screen, style, slideDirection }: CarouselScreenProps) => {
  const IconComponent = style.icon;
  const [imageError, setImageError] = useState(false);
  const imageSrc = screen.image ? withBase(screen.image) : "";

  useEffect(() => {
    setImageError(false);
  }, [screen.image]);

  const showIcon = imageError || !screen.image || screen.image.includes("placeholder");

  return (
    <div className={`bg-white dark:bg-slate-800/50 rounded-[2rem] border-2 border-gray-100 dark:border-slate-700/50 overflow-hidden shadow-lg flex flex-col md:flex-row group ${style.hoverBorder} transition-colors duration-300 ${slideDirection === "left" ? "animate-slide-left" : "animate-slide-right"}`}>
      {/* Gradient Placeholder with Icon/Image */}
      <div className={`flex-1 ${style.gradient} relative flex items-center justify-center p-8 md:p-12 min-h-[300px] md:min-h-[400px] order-1`}>
        <div className="relative w-40 md:w-56 aspect-[9/19] rounded-[2rem] shadow-2xl overflow-hidden border-4 border-white/20 bg-white/10 backdrop-blur-sm flex items-center justify-center">
          {/* If we have a real screen image, show it. Otherwise icon. */}
          {showIcon ? (
            <IconComponent className="w-16 md:w-24 h-16 md:h-24 text-white/40" strokeWidth={1} />
          ) : (
            <img
              src={imageSrc}
              alt={screen.title}
              loading="lazy"
              decoding="async"
              width={900}
              height={1900}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>

      <div className="flex-1 p-6 md:p-12 flex flex-col justify-center items-start order-2">
        <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          {screen.title}
        </h3>
        <p className="text-gray-600 dark:text-slate-300 leading-relaxed text-base md:text-lg">
          {screen.description}
        </p>
      </div>
    </div>
  )
}

type ProjectHeaderProps = {
  project: Project;
};

const ProjectHeader = ({ project }: ProjectHeaderProps) => (
  <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12 pb-6">
      <div className="w-full md:w-1/4 flex justify-start order-1">
        <Link
          to="/"
          state={{ scrollTo: "projects" }}
          className="group inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>
      </div>
      <div className="w-full md:w-1/2 text-center order-2">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-gray-900 dark:text-white mb-3">
          {project.title}
        </h1>
        <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 font-light">
          {project.subtitle}
        </p>
      </div>
      <div className="w-full md:w-1/4 flex justify-end order-3">
        {project.links.github && (
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-black dark:bg-white text-white dark:text-black text-sm font-medium rounded-full hover:opacity-90 transition-opacity shadow-lg shadow-gray-200 dark:shadow-none"
          >
            <Github className="w-5 h-5 mr-2" />
            View on GitHub
          </a>
        )}
      </div>
    </div>
  </section>
);

type ProjectCarouselSectionProps = {
  screens: ProjectScreen[];
  currentIndex: number;
  slideDirection: "left" | "right";
  style: ProjectStyle;
  onNext: () => void;
  onPrev: () => void;
  onSelectIndex: (index: number) => void;
};

const ProjectCarouselSection = ({
  screens,
  currentIndex,
  slideDirection,
  style,
  onNext,
  onPrev,
  onSelectIndex,
}: ProjectCarouselSectionProps) => {
  const activeScreen = screens[currentIndex] ?? screens[0];
  const swipeHandlers = useSwipe({
    onSwipeLeft: onNext,
    onSwipeRight: onPrev,
  });

  return (
    <section className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {screens.length > 0 && activeScreen ? (
          <div className="relative">
            {/* Card Container */}
            <div className="max-w-5xl mx-auto flex items-center gap-4 md:gap-8">
              <button
                onClick={onPrev}
                className="hidden md:flex flex-shrink-0 w-12 h-12 rounded-full border border-gray-200 dark:border-slate-700 items-center justify-center hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors bg-white dark:bg-slate-800/50"
                aria-label="Previous screen"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div
                className="flex-1 select-none cursor-grab active:cursor-grabbing"
                {...swipeHandlers}
              >
                <CarouselScreen
                  key={activeScreen.id}
                  screen={activeScreen}
                  style={style}
                  slideDirection={slideDirection}
                />
              </div>

              <button
                onClick={onNext}
                className="hidden md:flex flex-shrink-0 w-12 h-12 rounded-full border border-gray-200 dark:border-slate-700 items-center justify-center hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors bg-white dark:bg-slate-800/50"
                aria-label="Next screen"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {screens.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    onSelectIndex(idx);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex
                    ? "w-8 bg-gray-900 dark:bg-white"
                    : "w-2 bg-gray-300 dark:bg-slate-600 hover:bg-gray-400 dark:hover:bg-slate-500"
                    }`}
                  aria-label={`Go to screen ${idx + 1}`}
                />
              ))}
            </div>

            <p className="md:hidden text-center text-xs text-gray-400 mt-4">Swipe to explore screens</p>
          </div>
        ) : (
          <div className="text-center text-gray-500">No preview screens available.</div>
        )}
      </div>
    </section>
  );
};

type ProjectDetailsSectionProps = {
  project: Project;
  openFeatureIndex: number | null;
  setOpenFeatureIndex: (index: number | null) => void;
};

const ProjectDetailsSection = ({
  project,
  openFeatureIndex,
  setOpenFeatureIndex,
}: ProjectDetailsSectionProps) => (
  <>
    {/* Separator 2 */}
    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 my-4 sm:my-8">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-700"></div>
    </div>

    {/* Content Section - RESTORED OVERVIEW & CHALLENGE */}
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 pb-20">
        <div className="space-y-6">
          <div className="flex items-center gap-5 md:gap-6">
            <div className="h-px w-6 sm:w-8 md:w-10 bg-gray-300 dark:bg-gray-700"></div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Overview</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
            {project.description}
          </p>
        </div>
        <div className="space-y-6">
          <div className="flex items-center gap-5 md:gap-6">
            <div className="h-px w-6 sm:w-8 md:w-10 bg-gray-300 dark:bg-gray-700"></div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">The Challenge</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
            {project.challenge}
          </p>
        </div>
      </div>

      {/* Separator 3 */}
      <div className="mx-auto w-full max-w-5xl my-4 sm:my-8">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-700"></div>
      </div>

      <div className="pt-6 sm:pt-8 pb-20">
        <div className="flex items-center gap-5 md:gap-6 mb-8">
          <div className="h-px w-8 sm:w-10 md:w-12 bg-gray-300 dark:bg-gray-700"></div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Technologies</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-5 py-2.5 border border-gray-300 dark:border-gray-700 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-gray-900 dark:hover:border-gray-500 transition-colors cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Separator 4 */}
      <div className="mx-auto w-full max-w-5xl my-4 sm:my-8">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-700"></div>
      </div>

      {/* Features Section */}
      <div className="pt-6 sm:pt-8 mb-20">
        <div className="flex items-center gap-5 md:gap-6 mb-8">
          <div className="h-px w-8 sm:w-10 md:w-12 bg-gray-300 dark:bg-gray-700"></div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Key Features</h3>
        </div>

        <div className="flex flex-col">
          {project.features.map((feature, index) => {
            const isOpen = openFeatureIndex === index;
            const buttonId = `feature-toggle-${index}`;
            const panelId = `feature-panel-${index}`;
            return (
              <div
                key={feature.title}
                className="pt-6"
              >
                <button
                  id={buttonId}
                  type="button"
                  onClick={() => setOpenFeatureIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between gap-4 pb-4 text-left group transition-colors hover:text-gray-900 dark:hover:text-gray-200"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  <span className={`text-lg font-medium transition-colors duration-300 ${isOpen ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200"
                    }`}>
                    {feature.title}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 text-gray-400 dark:text-gray-500 transition-transform duration-300 ${isOpen ? "rotate-180 text-gray-900 dark:text-white" : "group-hover:text-gray-600 dark:group-hover:text-gray-300"}`}
                  />
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  aria-hidden={!isOpen}
                  className={`grid transition-[grid-template-rows,opacity] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                >
                  <div className={`overflow-hidden transition-all duration-300 ease-out ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"}`}>
                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-base pr-4 md:pr-12 pb-6">
                      {feature.description}
                    </p>
                  </div>
                </div>
                <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-700"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  </>
);

const ProjectDetail = () => {
  const { slug } = useParams<{ slug?: string }>();
  const projectData = projects.find((p) => p.slug === slug);
  const isNotFound = !projectData;
  const [openFeatureIndex, setOpenFeatureIndex] = useState<number | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('left');
  const intervalRef = useRef<number | null>(null);


  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    setCurrentIndex(0);
    setSlideDirection('left');
  }, [slug]);

  const screens = projectData?.screens || [];
  const totalScreens = screens.length;
  const style = projectData ? (projectStylesBySlug[projectData.slug] ?? fallbackProjectStyle) : fallbackProjectStyle;
  const pageTitle = projectData ? `${projectData.title} | Akbar Azizov` : "Project Not Found | Akbar Azizov";
  const pageDescription = projectData ? projectData.description : "Requested project was not found.";
  const pageUrl = typeof window !== "undefined" ? window.location.href : "";
  const pageImage = toAbsoluteUrl(projectData?.image ?? "/og-image.png");

  const handleNext = useCallback(() => {
    if (totalScreens <= 1) return;
    setSlideDirection('left');
    setCurrentIndex((prev) => (prev + 1) % totalScreens);
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    intervalRef.current = window.setInterval(() => {
      setSlideDirection('left');
      setCurrentIndex((prev) => (prev + 1) % totalScreens);
    }, CAROUSEL_AUTO_SCROLL_INTERVAL_MS);
  }, [totalScreens]);

  const handlePrev = useCallback(() => {
    if (totalScreens <= 1) return;
    setSlideDirection('right');
    setCurrentIndex((prev) => (prev - 1 + totalScreens) % totalScreens);
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    intervalRef.current = window.setInterval(() => {
      setSlideDirection('left');
      setCurrentIndex((prev) => (prev + 1) % totalScreens);
    }, CAROUSEL_AUTO_SCROLL_INTERVAL_MS);
  }, [totalScreens]);

  const handleSelectIndex = useCallback((index: number) => {
    if (totalScreens <= 1) {
      setCurrentIndex(index);
      return;
    }
    setSlideDirection(index > currentIndex ? "left" : "right");
    setCurrentIndex(index);
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    intervalRef.current = window.setInterval(() => {
      setSlideDirection('left');
      setCurrentIndex((prev) => (prev + 1) % totalScreens);
    }, CAROUSEL_AUTO_SCROLL_INTERVAL_MS);
  }, [currentIndex, totalScreens]);

  useEffect(() => {
    if (totalScreens <= 1) return;

    const tick = () => {
      setSlideDirection('left');
      setCurrentIndex((prev) => (prev + 1) % totalScreens);
    };

    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }
    intervalRef.current = window.setInterval(tick, CAROUSEL_AUTO_SCROLL_INTERVAL_MS);

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        if (intervalRef.current) {
          window.clearInterval(intervalRef.current);
        }
        intervalRef.current = window.setInterval(tick, CAROUSEL_AUTO_SCROLL_INTERVAL_MS);
      } else if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [totalScreens]);


  return (
    <MainLayout
      variant="detail"
      className="bg-white dark:bg-[#0E172A] text-gray-900 dark:text-white transition-colors duration-300"
    >
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={pageImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={pageImage} />
      </Helmet>

      <main className="flex-grow">
        {projectData ? (
          <>
            <ProjectHeader project={projectData} />

            {/* Separator 1 */}
            <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 my-3 sm:my-6">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-700"></div>
            </div>

            <ProjectCarouselSection
              screens={screens}
              currentIndex={currentIndex}
              slideDirection={slideDirection}
              style={style}
              onNext={handleNext}
              onPrev={handlePrev}
              onSelectIndex={handleSelectIndex}
            />

            <ProjectDetailsSection
              project={projectData}
              openFeatureIndex={openFeatureIndex}
              setOpenFeatureIndex={setOpenFeatureIndex}
            />
          </>
        ) : (
          <section className="min-h-[60vh] flex items-center justify-center px-6">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold">Project Not Found</h1>
              <Link to="/" state={{ scrollTo: "projects" }} className="text-blue-500 hover:underline">
                Back to Projects
              </Link>
            </div>
          </section>
        )}
      </main>
    </MainLayout>
  );
};

export default ProjectDetail;
