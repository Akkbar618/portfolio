export const ROUTES = {
  HOME: "/",
  PROJECT_DETAIL: "/projects/:slug",
  EASTER: "/easter",
} as const;

export const PROJECT_DETAIL_PREFIX = "/projects/";

export const buildProjectUrl = (slug: string) =>
  `${PROJECT_DETAIL_PREFIX}${slug}`;
