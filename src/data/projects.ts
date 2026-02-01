import { projectsSummary, type ProjectSlug, type ProjectSummary } from "./projectsSummary";

export interface ProjectFeature {
  title: string;
  description: string;
}

export interface ProjectScreen {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface Project extends ProjectSummary {
  challenge: string;
  features: ProjectFeature[];
  screens: ProjectScreen[];
  links: {
    github?: string;
    playStore?: string;
  };
}

type ProjectDetails = Pick<Project, "challenge" | "features" | "screens" | "links">;

const projectDetails: Record<ProjectSlug, ProjectDetails> = {
  voicebrain: {
    challenge: "Coming Soon...",
    features: [
      {
        title: "Coming Soon...",
        description: "Coming Soon...",
      },
    ],
    screens: [
      {
        id: "vb-1",
        title: "Coming Soon...",
        description: "Coming Soon...",
        image: "/projects/project-placeholder-1.png",
      },
      {
        id: "vb-2",
        title: "Coming Soon...",
        description: "Coming Soon...",
        image: "/projects/project-placeholder-1.png",
      },
      {
        id: "vb-3",
        title: "Coming Soon...",
        description: "Coming Soon...",
        image: "/projects/project-placeholder-1.png",
      },
    ],
    links: {
      github: "https://github.com/Akkbar618",
    },
  },
  "market-r": {
    challenge: "Coming Soon...",
    features: [
      {
        title: "Coming Soon...",
        description: "Coming Soon...",
      },
    ],
    screens: [
      {
        id: "mr-1",
        title: "Coming Soon...",
        description: "Coming Soon...",
        image: "/projects/project-placeholder-2.png",
      },
      {
        id: "mr-2",
        title: "Coming Soon...",
        description: "Coming Soon...",
        image: "/projects/project-placeholder-2.png",
      },
      {
        id: "mr-3",
        title: "Coming Soon...",
        description: "Coming Soon...",
        image: "/projects/project-placeholder-2.png",
      },
    ],
    links: {
      github: "https://github.com/Akkbar618",
    },
  },
  "llm-security": {
    challenge: "Coming Soon...",
    features: [
      {
        title: "Coming Soon...",
        description: "Coming Soon...",
      },
    ],
    screens: [
      {
        id: "llm-1",
        title: "Coming Soon...",
        description: "Coming Soon...",
        image: "/projects/project-placeholder-3.png",
      },
      {
        id: "llm-2",
        title: "Coming Soon...",
        description: "Coming Soon...",
        image: "/projects/project-placeholder-3.png",
      },
      {
        id: "llm-3",
        title: "Coming Soon...",
        description: "Coming Soon...",
        image: "/projects/project-placeholder-3.png",
      },
    ],
    links: {
      github: "https://github.com/Akkbar618",
    },
  },
  loyalist: {
    challenge: "Coming Soon...",
    features: [
      {
        title: "Coming Soon...",
        description: "Coming Soon...",
      },
    ],
    screens: [
      {
        id: "loy-1",
        title: "Coming Soon...",
        description: "Coming Soon...",
        image: "/projects/project-placeholder-4.png",
      },
      {
        id: "loy-2",
        title: "Coming Soon...",
        description: "Coming Soon...",
        image: "/projects/project-placeholder-4.png",
      },
      {
        id: "loy-3",
        title: "Coming Soon...",
        description: "Coming Soon...",
        image: "/projects/project-placeholder-4.png",
      },
    ],
    links: {
      github: "https://github.com/Akkbar618",
      playStore: "https://play.google.com",
    },
  },
};

export const projects: Project[] = projectsSummary.map((summary) => ({
  ...summary,
  ...projectDetails[summary.slug],
}));
