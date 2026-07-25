import * as environmentApi from "../api/environment.api";

import type { CreateEnvironmentInput, UpdateEnvironmentInput } from "./types";

export const environmentService = {
  getEnvironments(projectId: string) {
    return environmentApi.getEnvironments(projectId);
  },

  createEnvironment(projectId: string, data: CreateEnvironmentInput) {
    return environmentApi.createEnvironment(projectId, data);
  },

  updateEnvironment(
    projectId: string,
    environmentId: string,
    data: UpdateEnvironmentInput,
  ) {
    return environmentApi.updateEnvironment(projectId, environmentId, data);
  },

  deleteEnvironment(projectId: string, environmentId: string) {
    return environmentApi.deleteEnvironment(projectId, environmentId);
  },
};
