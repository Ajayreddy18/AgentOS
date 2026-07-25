import { Request, Response } from "express";

import {
  createEnvironmentSchema,
  updateEnvironmentSchema,
} from "./environment.validation";

import { EnvironmentService } from "./environment.service";

const environmentService = new EnvironmentService();

export async function create(
  req: Request<{ projectId: string }>,
  res: Response,
) {
  try {
    const data = createEnvironmentSchema.parse(req.body);
    const ownerId = req.user.id;
    const projectId = req.params.projectId;
    const environment = await environmentService.create(
      ownerId,
      projectId,
      data,
    );

    return res.status(201).json({
      success: true,
      data: environment,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error,
    });
  }
}

export async function update(
  req: Request<{ projectId: string; environmentId: string }>,
  res: Response,
) {
  try {
    const data = updateEnvironmentSchema.parse(req.body);
    const ownerId = req.user.id;
    const environmentId = req.params.environmentId;
    const projectId = req.params.projectId;

    const environment = await environmentService.update(
      ownerId,
      projectId,
      environmentId,
      data,
    );

    return res.status(200).json({
      success: true,
      data: environment,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error,
    });
  }
}

export async function list(req: Request<{ projectId: string }>, res: Response) {
  try {
    const ownerId = req.user.id;
    const projectId = req.params.projectId;

    const environments = await environmentService.list(ownerId, projectId);

    return res.status(200).json({
      success: true,
      data: environments,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error,
    });
  }
}

export async function getById(
  req: Request<{ projectId: string; environmentId: string }>,
  res: Response,
) {
  try {
    const ownerId = req.user.id;
    const environmentId = req.params.environmentId;
    const projectId = req.params.projectId;

    const environment = await environmentService.getById(
      ownerId,
      projectId,
      environmentId,
    );

    return res.status(200).json({
      success: true,
      data: environment,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      error,
    });
  }
}

export async function deleteEnvironment(
  req: Request<{ environmentId: string; projectId: string }>,
  res: Response,
) {
  try {
    const ownerId = req.user.id;
    const environmentId = req.params.environmentId;
    const projectId = req.params.projectId;

    await environmentService.delete(ownerId, projectId, environmentId);

    return res.status(200).json({
      success: true,
      message: "Environment deleted successfully",
    });
  } catch (error) {
    return res.status(404).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
