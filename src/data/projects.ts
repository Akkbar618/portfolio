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
  "quiz-learnwords": {
    challenge:
      "Learning new vocabulary requires consistent practice and repetition. The goal was to create an engaging quiz-based app that makes memorization fun and tracks progress over time.",
    features: [
      {
        title: "Interactive quizzes",
        description:
          "Multiple quiz formats including multiple choice, typing, and flashcards to reinforce vocabulary learning.",
      },
      {
        title: "Progress tracking",
        description:
          "Detailed statistics show mastery level per word, study streaks, and areas that need more practice.",
      },
      {
        title: "Custom word lists",
        description:
          "Import or create custom word lists for different languages or specialized vocabulary sets.",
      },
    ],
    screens: [
      {
        id: "ql-1",
        title: "Quiz Screen",
        description:
          "Main quiz interface with word cards, answer options, and real-time feedback.",
        image: "/projects/quiz-learnwords/placeholder.png",
      },
    ],
    links: {
      github: "https://github.com/Akkbar618/Quiz_LearnWords",
    },
  },
  loyalist: {
    challenge:
      "Service businesses needed a modern loyalty system that goes beyond simple point collection to create personalized customer experiences and measurable retention improvements.",
    features: [
      {
        title: "Digital rewards wallet",
        description:
          "Customers track points, vouchers, and tier progress in a fast-loading, offline-capable mobile screen.",
      },
      {
        title: "Campaign management",
        description:
          "Business owners create targeted campaigns with audience filters, offer previews, and scheduling controls.",
      },
      {
        title: "Retention analytics",
        description:
          "Dashboards connect campaign actions to repeat visits, redemption rates, and customer lifetime value.",
      },
    ],
    screens: [
      {
        id: "loy-1",
        title: "Rewards Dashboard",
        description:
          "Overview of active rewards, point balance, and available offers.",
        image: "/projects/loyalist/placeholder.png",
      },
    ],
    links: {
      github: "https://github.com/Akkbar618/LoyalistTest",
    },
  },
  voicenotes: {
    challenge:
      "Voice recordings are useful but hard to search and organize. The app transforms spoken thoughts into structured, searchable notes with AI-generated summaries.",
    features: [
      {
        title: "One-tap recording",
        description:
          "Start recording instantly with visual feedback and automatic silence detection.",
      },
      {
        title: "AI transcription",
        description:
          "Automatic speech-to-text conversion with support for multiple AI providers (Gemini, OpenAI).",
      },
      {
        title: "Smart summaries",
        description:
          "AI-generated titles and key points for each note, making it easy to find important information.",
      },
    ],
    screens: [
      {
        id: "vn-1",
        title: "Recording Screen",
        description:
          "Main recording interface with waveform visualization and quick actions.",
        image: "/projects/voicenotes/placeholder.png",
      },
    ],
    links: {
      github: "https://github.com/Akkbar618/VoiceNotes",
    },
  },
  secbench: {
    challenge:
      "As LLMs move into production, teams need systematic ways to test for prompt injection vulnerabilities and evaluate defense effectiveness before incidents reach users.",
    features: [
      {
        title: "Jailbreak attack library",
        description:
          "Curated dataset of adversarial prompts covering multiple attack categories and jailbreak templates.",
      },
      {
        title: "T.R.I.A.D. defense system",
        description:
          "Three-layer defense architecture designed to detect and block malicious inputs before they reach the model.",
      },
      {
        title: "Benchmark reports",
        description:
          "Detailed metrics comparing protected vs unprotected configurations with pass/fail evidence per test case.",
      },
    ],
    screens: [
      {
        id: "sb-1",
        title: "Benchmark Dashboard",
        description:
          "Overview of test results, attack success rates, and defense effectiveness metrics.",
        image: "/projects/secbench/placeholder.png",
      },
    ],
    links: {
      github: "https://github.com/Akkbar618/secbench-25",
    },
  },
  "money-manager": {
    challenge:
      "Personal finance tracking apps are often overcomplicated. This pet project focuses on simplicity — quick expense entry, clear category breakdowns, and useful charts.",
    features: [
      {
        title: "Quick expense entry",
        description:
          "Add transactions in seconds with smart category suggestions and recent entries.",
      },
      {
        title: "Budget tracking",
        description:
          "Set monthly budgets per category and get visual progress indicators.",
      },
      {
        title: "Charts and insights",
        description:
          "Visual breakdowns of spending patterns by category, time period, and trends.",
      },
    ],
    screens: [
      {
        id: "mm-1",
        title: "Dashboard",
        description:
          "Main screen with balance overview, recent transactions, and spending chart.",
        image: "/projects/money-manager/placeholder.png",
      },
    ],
    links: {
      github: "https://github.com/Akkbar618/Money_Manager_20",
    },
  },
};

export const projects: Project[] = projectsSummary.map((summary) => ({
  ...summary,
  ...projectDetails[summary.slug],
}));
