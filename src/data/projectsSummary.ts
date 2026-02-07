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
    title: "Quiz LearnWords",
    slug: "quiz-learnwords",
    subtitle: "Vocabulary Learning App",
    description:
      "Android app for learning new words through interactive quizzes with spaced repetition and progress tracking.",
    image: "/projects/quiz-learnwords/placeholder.png",
    technologies: ["Kotlin", "Jetpack Compose", "Room", "Material 3"],
  },
  {
    id: 2,
    title: "Loyalist",
    slug: "loyalist",
    subtitle: "Loyalty & Rewards Platform",
    description:
      "Service sector loyalty platform with digital rewards wallet, customer retention analytics, and campaign management.",
    image: "/projects/loyalist/placeholder.png",
    technologies: ["Kotlin", "Jetpack Compose", "Firebase", "Clean Architecture"],
  },
  {
    id: 3,
    title: "VoiceNotes",
    slug: "voicenotes",
    subtitle: "AI Voice Notes",
    description:
      "AI-powered voice notes app for Android. Record your thoughts, get instant transcription and smart summaries.",
    image: "/projects/voicenotes/placeholder.png",
    technologies: ["Kotlin", "Jetpack Compose", "Gemini API", "Room"],
  },
  {
    id: 4,
    title: "SecBench-25",
    slug: "secbench",
    subtitle: "LLM Security Benchmark",
    description:
      "Security benchmark framework for evaluating LLM vulnerability to jailbreak attacks and multi-layer defense systems.",
    image: "/projects/secbench/placeholder.png",
    technologies: ["Python", "LangChain", "OpenAI API", "Pytest"],
  },
  {
    id: 5,
    title: "Money Manager",
    slug: "money-manager",
    subtitle: "Personal Finance Tracker",
    description:
      "Pet project for tracking personal expenses, income, and budgets with charts and category breakdowns.",
    image: "/projects/money-manager/placeholder.png",
    technologies: ["Kotlin", "Jetpack Compose", "Room", "Charts"],
  },
] as const satisfies ProjectSummary[];

export type ProjectSlug = (typeof projectsSummary)[number]["slug"];
