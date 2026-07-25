import { Request, Response } from "express";

import { createProjectSchema, updateProjectSchema } from "./project.validation";

import { ProjectService } from "./project.service";

const projectService = new ProjectService();

export async function create(
  req: Request<{ organizationId: string }>,
  res: Response,
) {
  try {
    const ownerId = req.user.id;
    const organizationId = req.params.organizationId;
    const data = createProjectSchema.parse(req.body);

    const project = await projectService.create(ownerId, organizationId, data);

    return res.status(201).json({
      success: true,
      data: project,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error,
    });
  }
}

export async function list(
  req: Request<{ organizationId: string }>,
  res: Response,
) {
  try {
    const ownerId = req.user.id;
    const organizationId = req.params.organizationId;

    const projects = await projectService.list(ownerId, organizationId);

    return res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error,
    });
  }
}

export async function getById(
  req: Request<{ organizationId: string; projectId: string }>,
  res: Response,
) {
  try {
    const ownerId = req.user.id;
    const organizationId = req.params.organizationId;
    const projectId = req.params.projectId;

    const project = await projectService.getById(
      ownerId,
      organizationId,
      projectId,
    );

    return res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      error,
    });
  }
}

export async function update(
  req: Request<{ organizationId: string; projectId: string }>,
  res: Response,
) {
  try {
    const ownerId = req.user.id;
    const organizationId = req.params.organizationId;
    const projectId = req.params.projectId;

    const data = updateProjectSchema.parse(req.body);

    const project = await projectService.update(
      ownerId,
      organizationId,
      projectId,
      data,
    );

    return res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error,
    });
  }
}

export async function deleteProject(
  req: Request<{ organizationId: string; projectId: string }>,
  res: Response,
) {
  try {
    const ownerId = req.user.id;
    const organizationId = req.params.organizationId;
    const projectId = req.params.projectId;

    await projectService.delete(ownerId, organizationId, projectId);

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    return res.status(404).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
