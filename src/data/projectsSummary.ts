export type ProjectSummary = {
  id: number;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  image: string;
  technologies: string[];
};

export const projectsSummary = [
  {
    id: 1,
    title: "Coming Soon...",
    slug: "voicebrain",
    subtitle: "Coming Soon...",
    description: "Coming Soon...",
    image: "/projects/project-placeholder-1.png",
    technologies: ["Coming Soon..."],
  },
  {
    id: 2,
    title: "Coming Soon...",
    slug: "market-r",
    subtitle: "Coming Soon...",
    description: "Coming Soon...",
    image: "/projects/project-placeholder-2.png",
    technologies: ["Coming Soon..."],
  },
  {
    id: 3,
    title: "Coming Soon...",
    slug: "llm-security",
    subtitle: "Coming Soon...",
    description: "Coming Soon...",
    image: "/projects/project-placeholder-3.png",
    technologies: ["Coming Soon..."],
  },
  {
    id: 4,
    title: "Coming Soon...",
    slug: "loyalist",
    subtitle: "Coming Soon...",
    description: "Coming Soon...",
    image: "/projects/project-placeholder-4.png",
    technologies: ["Coming Soon..."],
  },
] as const satisfies ProjectSummary[];

export type ProjectSlug = (typeof projectsSummary)[number]["slug"];
