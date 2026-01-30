/**
 * Animation configuration constants
 * Centralized values for consistent animation timing across the application
 */

export const ANIMATION_DELAYS = {
  TECH_STACK: 100,
  ABOUT_SECTION: 150,
  PROJECTS_SECTION: 200,
  CONTACT_SECTION: 250,
} as const;

export const ANIMATION_TRANSLATE = {
  Y_OFFSET: '2rem', // 32px
} as const;

export const ANIMATION_DURATION = {
  DEFAULT: 700,
} as const;
