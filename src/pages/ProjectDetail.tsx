import { useParams, Link } from "react-router-dom";
import { projects } from "@/data/projects";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  const heroAnimation = useScrollAnimation();
  const descAnimation = useScrollAnimation();
  const techAnimation = useScrollAnimation();
  const featuresAnimation = useScrollAnimation();

  if (!project) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Проект не найден</h1>
          <Link
            to="/#projects"
            className="inline-block px-6 py-3 border border-foreground hover:bg-foreground hover:text-background transition-all"
          >
            Вернуться к проектам
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-6 md:px-12 lg:px-24 border-b border-border">
        <Link to="/" className="text-lg font-semibold tracking-tight">
          Имя Фамилия
        </Link>
        <Link
          to="/#projects"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Назад к проектам
        </Link>
      </header>

      {/* Hero */}
      <section
        ref={heroAnimation.ref}
        className={`px-6 py-12 md:px-12 lg:px-24 md:py-16 transition-all duration-700 ${
          heroAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="max-w-5xl mx-auto">
          <div className="aspect-video bg-muted overflow-hidden border border-border mb-8">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover grayscale"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">{project.title}</h1>
        </div>
      </section>

      {/* Description */}
      <section
        ref={descAnimation.ref}
        className={`px-6 py-12 md:px-12 lg:px-24 bg-card border-y border-border transition-all duration-700 delay-100 ${
          descAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">О проекте</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {project.description}
          </p>
        </div>
      </section>

      {/* Technologies */}
      <section
        ref={techAnimation.ref}
        className={`px-6 py-12 md:px-12 lg:px-24 transition-all duration-700 delay-200 ${
          techAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Технологии</h2>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-card border border-border text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        ref={featuresAnimation.ref}
        className={`px-6 py-12 md:px-12 lg:px-24 bg-card border-y border-border transition-all duration-700 delay-300 ${
          featuresAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Ключевые функции</h2>
          <ul className="grid md:grid-cols-2 gap-4">
            {project.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-muted-foreground">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Links */}
      <section className="px-6 py-12 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Ссылки</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-4 text-center font-medium border border-foreground hover:bg-foreground hover:text-background transition-all"
              >
                GitHub
              </a>
            )}
            {project.links.playStore && (
              <a
                href={project.links.playStore}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-4 text-center font-medium bg-foreground text-background hover:opacity-90 transition-opacity"
              >
                Play Store
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Back Button */}
      <section className="px-6 py-12 md:px-12 lg:px-24 border-t border-border">
        <div className="max-w-5xl mx-auto text-center">
          <Link
            to="/#projects"
            className="inline-block px-8 py-3 border border-foreground hover:bg-foreground hover:text-background transition-all"
          >
            ← Все проекты
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
