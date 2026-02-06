import { useEffect, useState } from "react";
import type { ProjectStyle } from "@/constants/projectStyles";
import type { ProjectSummary } from "@/data/projectsSummary";
import { withBase } from "@/lib/urls";

interface ProjectCardProps {
    project: ProjectSummary;
    style: ProjectStyle;
    slideDirection: "left" | "right";
}

export const ProjectCard = ({ project, style, slideDirection }: ProjectCardProps) => {
    const IconComponent = style.icon;
    const [imageError, setImageError] = useState(false);
    const imageSrc = project.image ? withBase(project.image) : "";
    const showIcon = imageError || !project.image || /placeholder/i.test(project.image);

    useEffect(() => {
        setImageError(false);
    }, [project.image]);

    return (
        <div
            className={`bg-white dark:bg-slate-800/50 rounded-[2rem] border-2 border-gray-100 dark:border-slate-700/50 overflow-hidden shadow-lg flex flex-col md:flex-row group min-h-[360px] md:min-h-[420px] w-full max-w-[980px] mx-auto ${style.hoverBorder} transition-colors duration-300 ${slideDirection === "left" ? "animate-slide-left" : "animate-slide-right"}`}
        >
            {/* Gradient Placeholder with Icon */}
            <div
                className={`w-full md:w-[44%] flex-none ${style.gradient} relative flex items-center justify-center p-8 md:p-12 min-h-[240px] md:min-h-[360px] order-1`}
            >
                <div className="relative w-36 md:w-48 aspect-[9/19] rounded-[2rem] shadow-2xl overflow-hidden border-4 border-white/20 bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    {showIcon ? (
                        <IconComponent className="w-14 md:w-16 h-14 md:h-16 text-white/40" strokeWidth={1} />
                    ) : (
                        <img
                            src={imageSrc}
                            alt={project.title}
                            loading="lazy"
                            decoding="async"
                            width={540}
                            height={1140}
                            onError={() => setImageError(true)}
                            className="w-full h-full object-cover"
                        />
                    )}
                </div>
            </div>

            {/* Text Content */}
            <div className="w-full md:flex-1 min-w-0 p-6 md:p-10 flex flex-col justify-between items-start order-2">
                <div className="w-full space-y-3">
                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                        {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-slate-300 leading-relaxed text-sm md:text-base line-clamp-3 min-h-[3.75rem]">
                        {project.description}
                    </p>
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 min-h-[2.5rem]">
                    {project.technologies.slice(0, 4).map((tech) => (
                        <span
                            key={tech}
                            className="px-4 py-1.5 bg-gray-100 dark:bg-slate-700/80 text-gray-600 dark:text-slate-300 rounded-full text-xs font-medium border border-gray-200 dark:border-slate-600"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};
