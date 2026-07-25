import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../api/project.api";

import type { CreateProjectInput, UpdateProjectInput } from "./types";

export const projectService = {
  getProjects(organizationId: string) {
    return getProjects(organizationId);
  },

  createProject(organizationId: string, data: CreateProjectInput) {
    return createProject(organizationId, data);
  },

  updateProject(
    organizationId: string,
    projectId: string,
    data: UpdateProjectInput,
  ) {
    return updateProject(organizationId, projectId, data);
  },

  deleteProject(organizationId: string, projectId: string) {
    return deleteProject(organizationId, projectId);
  },
};
