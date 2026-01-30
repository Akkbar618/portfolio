import { useState, useRef } from "react";
import { projects } from "@/data/projects";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ANIMATION_DELAYS } from "@/constants/animation.constants";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Mail,
  Send,
  Github,
  Linkedin,
  Download,
  ChevronLeft,
  ChevronRight,
  Menu,
  Smartphone,
  Bot,
  Shield,
  Gift,
} from "lucide-react";

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const projectsRef = useRef<HTMLDivElement>(null);

  const techStack = [
    "Kotlin",
    "Jetpack Compose",
    "OpenAI API",
    "Gemini",
    "Room",
    "Clean Architecture",
    "Hilt",
    "Coroutines",
  ];

  const stats = [
    { value: "4+", label: "AI Projects" },
    { value: "15+", label: "Screens Migrated" },
    { value: "200+", label: "Test Cases" },
  ];

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contacts" },
  ];

  // Gradients and icons for project placeholders
  const projectStyles = [
    { gradient: "bg-gradient-to-br from-violet-500 to-fuchsia-500", icon: Bot, accent: "text-violet-600", hoverBorder: "hover:border-violet-500" },
    { gradient: "bg-gradient-to-br from-blue-500 to-cyan-400", icon: Smartphone, accent: "text-blue-600", hoverBorder: "hover:border-blue-500" },
    { gradient: "bg-gradient-to-br from-amber-500 to-orange-500", icon: Shield, accent: "text-amber-600", hoverBorder: "hover:border-amber-500" },
    { gradient: "bg-gradient-to-br from-emerald-500 to-teal-400", icon: Gift, accent: "text-emerald-600", hoverBorder: "hover:border-emerald-500" },
  ];

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  const scrollProjects = (direction: 'left' | 'right') => {
    if (projectsRef.current) {
      const cardWidth = 880;
      const currentScroll = projectsRef.current.scrollLeft;
      const targetScroll = direction === 'left'
        ? currentScroll - cardWidth
        : currentScroll + cardWidth;

      projectsRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-gray-900 antialiased overflow-x-hidden font-sans">
      {/* Glass Header */}
      <nav className="fixed w-full z-50 top-0 start-0 bg-white/70 backdrop-blur-lg border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="#" className="flex items-center space-x-3">
              <span className="self-center text-xl font-bold whitespace-nowrap uppercase tracking-wider">
                &lt;Dev. Portfolio /&gt;
              </span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:block">
              <ul className="font-medium flex flex-row space-x-8">
                <li>
                  <a href="#home" className="block py-2 px-3 text-black font-semibold">Home</a>
                </li>
                <li>
                  <a href="#about" className="block py-2 px-3 text-gray-600 hover:text-black transition-colors">About</a>
                </li>
                <li>
                  <a href="#projects" className="block py-2 px-3 text-gray-600 hover:text-black transition-colors">Projects</a>
                </li>
                <li>
                  <a href="#contact" className="block py-2 px-3 text-gray-600 hover:text-black transition-colors">Contacts</a>
                </li>
              </ul>
            </div>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <button className="md:hidden text-gray-500 p-2 w-10 h-10 inline-flex items-center justify-center rounded-lg hover:bg-gray-100" aria-label="Открыть меню">
                  <Menu className="w-5 h-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] bg-white border-gray-200">
                <SheetHeader>
                  <SheetTitle className="text-gray-900">Меню</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4 mt-8">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={handleNavClick}
                      className="text-lg text-gray-600 hover:text-black transition-colors py-2"
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* Hero Section with Mesh Gradient */}
      <section
        id="home"
        className="relative pt-24 pb-16 md:pt-32 md:pb-32 overflow-hidden hero-gradient"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#f8f9fa] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1 space-y-6 text-center md:text-left">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-tight">
                I'm <span className="underline decoration-4 decoration-gray-400 underline-offset-8">Akbar Azizov</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600">
                  Android Developer
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-lg mx-auto md:mx-0 font-medium">
                Building AI-Powered Mobile Apps
              </p>
              <p className="text-lg text-gray-500 max-w-lg mx-auto md:mx-0">
                Engineering reliable, privacy-aware AI integrations for mobile. Bridging the gap between LLMs and Android production code.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4 w-full sm:w-auto">
                <a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="h-12 px-6 bg-black text-white font-medium rounded-full hover:opacity-90 transition-opacity text-center flex items-center justify-center"
                >
                  Selected Works
                </a>
                <a
                  href="/CV_Akbar_Azizov_Kotlin&Compose_EN.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-12 px-6 bg-transparent border border-gray-900 text-gray-900 font-medium rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                >
                  Download CV
                  <Download className="w-4 h-4" strokeWidth={2} />
                </a>
              </div>
            </div>
            <div className="flex-1 flex justify-center md:justify-end relative">
              <div className="w-80 h-auto md:w-[380px] relative">
                <img
                  src="/avatar.png"
                  alt="Akbar Azizov"
                  className="w-full h-auto object-contain"
                />
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f8f9fa] to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Bar */}
      <AnimatedSection delay={ANIMATION_DELAYS.TECH_STACK}>
        <div className="w-full border-y border-gray-200 bg-white py-6 overflow-hidden">
          <ul className="flex flex-wrap justify-center items-center list-none m-0 p-0 max-w-6xl mx-auto px-4">
            {techStack.map((tech, index) => (
              <li
                key={tech}
                className="flex items-center text-gray-500 text-sm font-medium uppercase tracking-[0.05em]"
              >
                <span className="px-2 md:px-4">{tech}</span>
                {index < techStack.length - 1 && (
                  <span className="text-gray-300">•</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </AnimatedSection>

      {/* About Section */}
      <AnimatedSection delay={ANIMATION_DELAYS.ABOUT_SECTION}>
        <section id="about" className="py-24 bg-[#f8f9fa] relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-black text-center md:text-left">About me</h2>
              <div className="space-y-8 text-gray-700 leading-loose text-lg md:text-xl font-light">
                <p>
                  I don't just integrate AI into mobile apps; I engineer them to be reliable, testable, and production-ready. My approach combines solid Android fundamentals (MVVM, Clean Arch) with practical AI implementation—structured outputs, multi-provider strategies, and offline-first storage. Currently completing my Master's in CS while building the next generation of intelligent mobile products.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-8 pt-12 border-t border-gray-200">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center md:text-left">
                    <div className="text-4xl md:text-5xl font-black text-gray-900 mb-2">{stat.value}</div>
                    <div className="text-xs md:text-sm text-gray-500 uppercase tracking-widest font-semibold">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Selected Works Section */}
      <AnimatedSection delay={ANIMATION_DELAYS.PROJECTS_SECTION}>
        <section id="projects" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-4xl md:text-6xl font-black mb-4">Selected Works</h2>
              <p className="text-gray-500 text-lg">A showcase of mobile applications and solutions.</p>
            </div>
            <div className="hidden md:flex gap-4 items-center">
              <button
                onClick={() => scrollProjects('left')}
                className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-6 h-6 text-gray-900" strokeWidth={2} />
              </button>
              <button
                onClick={() => scrollProjects('right')}
                className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                aria-label="Next project"
              >
                <ChevronRight className="w-6 h-6 text-gray-900" strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* Horizontal Scrolling Cards */}
          <div
            ref={projectsRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 px-4 sm:px-6 lg:px-8 md:pb-16 scrollbar-hide"
          >

            {projects.slice(0, 4).map((project, index) => {
              const style = projectStyles[index % projectStyles.length];
              const IconComponent = style.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={project.id}
                  className={`flex-none w-[90vw] md:w-[850px] snap-center bg-white rounded-[2rem] border-2 border-gray-100 overflow-hidden shadow-xl flex flex-col md:flex-row group ${style.hoverBorder} transition-colors duration-300`}
                >
                  {/* Text Content */}
                  <div className={`flex-1 p-8 md:p-12 flex flex-col justify-center items-start ${isEven ? 'order-2 md:order-1' : 'order-2'}`}>
                    <span className={`text-xs font-bold tracking-widest ${style.accent} mb-3 uppercase`}>
                      {project.technologies[0]}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{project.title}</h3>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                      {project.description.length > 200
                        ? project.description.substring(0, 200) + '...'
                        : project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-semibold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Gradient Placeholder with Icon */}
                  <div className={`flex-1 ${style.gradient} relative flex items-center justify-center p-12 ${isEven ? 'order-1 md:order-2' : 'order-1'}`}>
                    <div className="relative w-48 md:w-56 aspect-[9/19] rounded-[2rem] shadow-2xl overflow-hidden border-4 border-white/20 bg-white/10 backdrop-blur-sm transform group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
                      <IconComponent className="w-20 h-20 text-white/60" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </AnimatedSection>

      {/* Unified Footer */}
      <AnimatedSection delay={ANIMATION_DELAYS.CONTACT_SECTION}>
        <footer id="contact" className="py-16 bg-[#f8f9fa]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-semibold text-gray-900 mb-12">
              Ready to build something intelligent?
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <a
                href="mailto:akbar02work@gmail.com"
                className="h-12 flex items-center justify-center gap-2 px-4 border-2 border-blue-500 rounded-full text-blue-600 font-medium hover:bg-blue-500 hover:text-white transition-all duration-200"
              >
                <Mail className="w-5 h-5" strokeWidth={2} />
                Email Me
              </a>
              <a
                href="https://t.me/Akbar02Work"
                target="_blank"
                rel="noopener noreferrer"
                className="h-12 flex items-center justify-center gap-2 px-4 border-2 border-[#0088CC] rounded-full text-[#0088CC] font-medium hover:bg-[#0088CC] hover:text-white transition-all duration-200"
              >
                <Send className="w-5 h-5" strokeWidth={2} />
                Telegram
              </a>
              <a
                href="https://github.com/Akkbar618"
                target="_blank"
                rel="noopener noreferrer"
                className="h-12 flex items-center justify-center gap-2 px-4 border-2 border-gray-900 rounded-full text-gray-900 font-medium hover:bg-gray-900 hover:text-white transition-all duration-200"
              >
                <Github className="w-5 h-5" strokeWidth={2} />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/akbar02work"
                target="_blank"
                rel="noopener noreferrer"
                className="h-12 flex items-center justify-center gap-2 px-4 border-2 border-[#0077B5] rounded-full text-[#0077B5] font-medium hover:bg-[#0077B5] hover:text-white transition-all duration-200"
              >
                <Linkedin className="w-5 h-5" strokeWidth={2} />
                LinkedIn
              </a>
            </div>
          </div>
        </footer>
      </AnimatedSection>
    </div>
  );
};

export default Index;
