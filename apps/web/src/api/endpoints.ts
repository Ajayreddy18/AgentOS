export const API = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    profile: "/auth/profile",
    refresh: "/auth/refresh",
    logout: "/auth/logout",
  },

  organizations: "/organizations",

  projects: "/projects",

  environments: "/environments",

  agents: "/agents",

  conversations: "/conversations",

  knowledge: "/knowledge",

  documents: "/documents",

  prompts: "/prompts",

  models: "/models",

  tools: "/tools",

  metrics: "/metrics",
} as const;
