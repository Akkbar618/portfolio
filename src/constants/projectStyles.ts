import { BookOpen, Gift, Mic, Shield, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ProjectStyle = {
  gradient: string;
  icon: LucideIcon;
  hoverBorder: string;
};

const projectStyleEntries = [
  {
    slug: "quiz-learnwords",
    style: {
      gradient: "bg-gradient-to-br from-violet-600 to-purple-500",
      icon: BookOpen,
      hoverBorder: "hover:border-violet-500 dark:hover:border-violet-400",
    },
  },
  {
    slug: "loyalist",
    style: {
      gradient: "bg-gradient-to-br from-emerald-500 to-teal-400",
      icon: Gift,
      hoverBorder: "hover:border-emerald-500 dark:hover:border-emerald-400",
    },
  },
  {
    slug: "voicenotes",
    style: {
      gradient: "bg-gradient-to-br from-fuchsia-500 to-pink-500",
      icon: Mic,
      hoverBorder: "hover:border-fuchsia-500 dark:hover:border-fuchsia-400",
    },
  },
  {
    slug: "secbench",
    style: {
      gradient: "bg-gradient-to-br from-amber-500 to-orange-500",
      icon: Shield,
      hoverBorder: "hover:border-amber-500 dark:hover:border-amber-400",
    },
  },
  {
    slug: "money-manager",
    style: {
      gradient: "bg-gradient-to-br from-blue-500 to-cyan-400",
      icon: Wallet,
      hoverBorder: "hover:border-blue-500 dark:hover:border-blue-400",
    },
  },
] as const;

export const projectStylesBySlug: Record<string, ProjectStyle> = Object.fromEntries(
  projectStyleEntries.map((entry) => [entry.slug, entry.style])
);

export const projectStylesList: ProjectStyle[] = projectStyleEntries.map((entry) => entry.style);

export const fallbackProjectStyle: ProjectStyle = {
  gradient: "bg-gray-100",
  icon: BookOpen,
  hoverBorder: "",
};
