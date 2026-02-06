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
    title: "VoiceBrain",
    slug: "voicebrain",
    subtitle: "AI Voice Notes for Busy Teams",
    description:
      "Android app for recording meetings and transforming speech into structured summaries, action items, and follow-up reminders.",
    image: "/projects/voicebrain/overview.svg",
    technologies: ["Kotlin", "Jetpack Compose", "Room", "Gemini API"],
  },
  {
    id: 2,
    title: "Market R",
    slug: "market-r",
    subtitle: "Retail Intelligence Platform",
    description:
      "Field operations dashboard that helps merchandisers track sales, stock health, and store execution from a single mobile workflow.",
    image: "/projects/market-r/dashboard.svg",
    technologies: ["Kotlin", "Compose", "Firebase", "Charts"],
  },
  {
    id: 3,
    title: "LLM Security Lab",
    slug: "llm-security",
    subtitle: "Prompt and Policy Risk Scanner",
    description:
      "Security-focused toolkit for testing prompt injections, data leakage paths, and policy violations in GenAI-enabled workflows.",
    image: "/projects/llm-security/risk-map.svg",
    technologies: ["Python", "FastAPI", "OWASP LLM", "OpenTelemetry"],
  },
  {
    id: 4,
    title: "Loyalist",
    slug: "loyalist",
    subtitle: "Loyalty and Rewards Experience",
    description:
      "Customer retention app with digital loyalty wallet, personalized campaigns, and performance analytics for growth teams.",
    image: "/projects/loyalist/wallet.svg",
    technologies: ["Kotlin", "Jetpack Compose", "Clean Architecture", "Firestore"],
  },
] as const satisfies ProjectSummary[];

export type ProjectSlug = (typeof projectsSummary)[number]["slug"];
