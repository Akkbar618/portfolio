import { AnimatedSection } from "@/components/AnimatedSection";
import { ANIMATION_DELAYS } from "@/constants/animation.constants";

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

export const TechStack = () => {
    return (
        <AnimatedSection delay={ANIMATION_DELAYS.TECH_STACK}>
            <div className="tech-stack-bar w-full border-y border-gray-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm py-4 md:py-6">
                {/* Horizontal scroll on mobile, centered wrap on desktop */}
                <div className="overflow-x-auto scrollbar-hide md:overflow-visible">
                    <ul className="flex gap-2 md:gap-3 md:flex-wrap md:justify-center items-center list-none m-0 px-5 md:px-4 max-w-6xl mx-auto whitespace-nowrap md:whitespace-normal">
                        {techStack.map((tech) => (
                            <li key={tech}>
                                {/* Chip/Tag style */}
                                <span className="inline-block px-4 py-1.5 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 text-sm font-medium rounded-full border border-gray-200 dark:border-slate-700">
                                    {tech}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </AnimatedSection>
    );
};
