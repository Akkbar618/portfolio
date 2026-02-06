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
    challenge:
      "Customer interviews were full of valuable context, but teams lost details between calls and follow-up tasks. The goal was to turn long voice recordings into concise, searchable outputs without adding friction to the workflow.",
    features: [
      {
        title: "Realtime transcription pipeline",
        description:
          "Streaming speech-to-text with speaker markers and offline retry support keeps notes reliable even in unstable network conditions.",
      },
      {
        title: "AI action extractor",
        description:
          "Summarization flow identifies decisions, owners, and deadlines so teams can export ready-to-use action lists in seconds.",
      },
      {
        title: "Searchable session archive",
        description:
          "Room-backed local cache with lightweight indexing makes it fast to find a quote, topic, or task from historical sessions.",
      },
    ],
    screens: [
      {
        id: "vb-1",
        title: "Session Overview",
        description:
          "Daily session timeline with status badges, audio duration, and quick access to latest transcript summaries.",
        image: "/projects/voicebrain/overview.svg",
      },
      {
        id: "vb-2",
        title: "Live Transcription",
        description:
          "Low-latency transcript stream with speaker separation, confidence cues, and inline correction before publishing.",
        image: "/projects/voicebrain/transcribe.svg",
      },
      {
        id: "vb-3",
        title: "AI Insights",
        description:
          "Auto-generated key points and follow-up tasks with one-tap sharing to chat, email, or issue tracking tools.",
        image: "/projects/voicebrain/insights.svg",
      },
    ],
    links: {
      github: "https://github.com/Akkbar618",
    },
  },
  "market-r": {
    challenge:
      "Retail teams had fragmented reports across spreadsheets and messaging threads, making it difficult to react quickly to stock gaps and store-level performance drops.",
    features: [
      {
        title: "Store performance dashboard",
        description:
          "Realtime KPI widgets show sell-through, out-of-stock trends, and category momentum by region and channel.",
      },
      {
        title: "Catalog health workflow",
        description:
          "Data-quality checks highlight missing media, broken pricing, and inventory anomalies before they impact conversion.",
      },
      {
        title: "Alert-driven execution",
        description:
          "Priority alerts route issues to the right owner with severity levels, deadlines, and clear resolution history.",
      },
    ],
    screens: [
      {
        id: "mr-1",
        title: "Revenue Dashboard",
        description:
          "Executive view with conversion, basket size, and target attainment split by chain, city, and date range.",
        image: "/projects/market-r/dashboard.svg",
      },
      {
        id: "mr-2",
        title: "Catalog Health",
        description:
          "Issue feed for assortment completeness and pricing parity with suggested actions and ownership tracking.",
        image: "/projects/market-r/catalog.svg",
      },
      {
        id: "mr-3",
        title: "Smart Alerts",
        description:
          "Notification center with filters for stockout spikes, promo failures, and critical shelf-compliance risks.",
        image: "/projects/market-r/alerts.svg",
      },
    ],
    links: {
      github: "https://github.com/Akkbar618",
    },
  },
  "llm-security": {
    challenge:
      "As GenAI features moved into production, teams lacked a practical way to audit prompt attacks and policy drift before incidents reached users.",
    features: [
      {
        title: "Prompt attack simulator",
        description:
          "Structured test cases for injection, jailbreak, and exfiltration attempts provide repeatable risk scoring per model.",
      },
      {
        title: "Policy compliance checks",
        description:
          "Response validation compares outputs against policy rules and flags hallucinations, unsafe advice, and sensitive leakage.",
      },
      {
        title: "Incident timeline",
        description:
          "Unified event log with traces and metadata helps teams analyze regressions and verify mitigation rollout quality.",
      },
    ],
    screens: [
      {
        id: "llm-1",
        title: "Risk Map",
        description:
          "Heatmap of model endpoints and attack vectors prioritized by exploitability and expected impact.",
        image: "/projects/llm-security/risk-map.svg",
      },
      {
        id: "llm-2",
        title: "Policy Check",
        description:
          "Policy control panel showing pass/fail evidence, remediation hints, and confidence levels for each test suite.",
        image: "/projects/llm-security/policy-check.svg",
      },
      {
        id: "llm-3",
        title: "Incident Timeline",
        description:
          "Chronological stream of prompt sessions, blocked responses, and investigator notes for postmortem analysis.",
        image: "/projects/llm-security/incident-log.svg",
      },
    ],
    links: {
      github: "https://github.com/Akkbar618",
    },
  },
  loyalist: {
    challenge:
      "Existing loyalty systems were transactional and generic. The product needed to raise retention by making rewards personal, timely, and measurable across mobile campaigns.",
    features: [
      {
        title: "Digital rewards wallet",
        description:
          "Users can track points, vouchers, and progress toward tier upgrades in one fast-loading, offline-capable mobile screen.",
      },
      {
        title: "Segment-based campaigns",
        description:
          "Growth teams launch campaigns by behavior segment and lifecycle stage with reusable templates and scheduling controls.",
      },
      {
        title: "Retention analytics",
        description:
          "Dashboards connect campaign actions to repeat purchase rate, redemption lift, and customer lifetime value changes.",
      },
    ],
    screens: [
      {
        id: "loy-1",
        title: "Rewards Wallet",
        description:
          "Personalized wallet shows active offers, tier progress, and one-tap redemption at checkout.",
        image: "/projects/loyalist/wallet.svg",
      },
      {
        id: "loy-2",
        title: "Campaign Builder",
        description:
          "Campaign creation flow with audience filters, offer previews, and timing controls for rapid iteration.",
        image: "/projects/loyalist/campaigns.svg",
      },
      {
        id: "loy-3",
        title: "Retention Analytics",
        description:
          "Cohort and funnel views expose retention gains after targeted offers and loyalty tier nudges.",
        image: "/projects/loyalist/analytics.svg",
      },
    ],
    links: {
      github: "https://github.com/Akkbar618",
      playStore: "https://play.google.com/store/apps",
    },
  },
};

export const projects: Project[] = projectsSummary.map((summary) => ({
  ...summary,
  ...projectDetails[summary.slug],
}));
