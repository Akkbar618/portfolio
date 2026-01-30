import projectImg1 from "@/assets/project-placeholder-1.png";
import projectImg2 from "@/assets/project-placeholder-2.png";
import projectImg3 from "@/assets/project-placeholder-3.png";
import projectImg4 from "@/assets/project-placeholder-4.png";

export interface Project {
  id: number;
  title: string;
  slug: string;
  image: string;
  description: string;
  technologies: string[];
  features: string[];
  links: {
    github?: string;
    playStore?: string;
  };
}

export const projects: Project[] = [
  {
    id: 1,
    title: "VoiceBrain",
    slug: "voicebrain",
    image: projectImg1,
    description:
      "An AI-powered voice note app with offline-first architecture. Implements 'Bring Your Own Key' pattern and Strategy pattern for switching between OpenAI and Gemini providers.",
    technologies: ["Kotlin", "Compose", "OpenAI API", "Gemini", "Room", "Hilt"],
    features: [
      "Implemented robust 'Bring Your Own Key' architecture",
      "Designed structured JSON outputs for reliable AI parsing",
      "Built offline-first local storage with Room",
      "Multi-provider AI strategy (OpenAI + Gemini)",
      "Voice-to-text with intelligent processing",
      "Privacy-focused: all API keys stored locally",
    ],
    links: {
      github: "https://github.com/Akkbar618",
    },
  },
  {
    id: 2,
    title: "Market-R",
    slug: "market-r",
    image: projectImg2,
    description:
      "Commercial Android application for a major retailer. Focused on migrating legacy XML code to modern Jetpack Compose UI.",
    technologies: ["Android SDK", "Jetpack Compose", "MVVM", "Retrofit"],
    features: [
      "Migrated 15+ legacy XML screens to Jetpack Compose",
      "Reduced module crash rate by implementing strict Unidirectional Data Flow",
      "Optimized UI rendering performance by 25%",
      "Implemented reusable component library",
      "Enhanced user experience with Material 3 design",
      "Integrated REST API for product catalog",
    ],
    links: {
      github: "https://github.com/Akkbar618",
    },
  },
  {
    id: 3,
    title: "LLM Security Framework",
    slug: "llm-security",
    image: projectImg3,
    description:
      "Research project focusing on the reliability and safety of AI integrations in mobile environments.",
    technologies: ["Python", "LLMs", "Security", "Evaluation"],
    features: [
      "Created evaluation framework with 200+ jailbreak test prompts",
      "Analyzed reliability of structured outputs across models",
      "Benchmarked GPT-4, Claude, and Gemini for mobile use cases",
      "Published findings on AI safety in production apps",
      "Developed best practices for prompt engineering",
      "Tested edge cases and failure modes",
    ],
    links: {
      github: "https://github.com/Akkbar618",
    },
  },
  {
    id: 4,
    title: "Loyalist",
    slug: "loyalist",
    image: projectImg4,
    description:
      "A cross-platform loyalty management system helping businesses retain customers through digital rewards.",
    technologies: ["Kotlin Multiplatform", "Compose", "Firebase"],
    features: [
      "Designed reusable UI component system used across 3 modules",
      "Implemented real-time data sync with Firebase",
      "Built QR code scanning for reward redemption",
      "Created admin dashboard for business owners",
      "Push notifications for special offers",
      "Analytics dashboard for customer insights",
    ],
    links: {
      github: "https://github.com/Akkbar618",
      playStore: "https://play.google.com",
    },
  },
];
