import { Request, Response } from "express";

import { createModelSchema, updateModelSchema } from "./model.validation";

import { ModelService } from "./model.service";

const modelService = new ModelService();

export async function create(req: Request<{ agentId: string }>, res: Response) {
  try {
    const data = createModelSchema.parse(req.body);

    const ownerId = req.user.id;
    const agentId = req.params.agentId;

    const model = await modelService.create(ownerId, agentId, data);

    return res.status(201).json({
      success: true,
      data: model,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error,
    });
  }
}
export async function list(req: Request<{ agentId: string }>, res: Response) {
  try {
    const ownerId = req.user.id;
    const agentId = req.params.agentId;

    const models = await modelService.list(ownerId, agentId);

    return res.status(200).json({
      success: true,
      data: models,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error,
    });
  }
}
export async function getById(
  req: Request<{
    agentId: string;
    modelId: string;
  }>,
  res: Response,
) {
  try {
    const ownerId = req.user.id;
    const agentId = req.params.agentId;
    const modelId = req.params.modelId;

    const model = await modelService.getById(ownerId, agentId, modelId);

    return res.status(200).json({
      success: true,
      data: model,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      error,
    });
  }
}
export async function update(
  req: Request<{
    agentId: string;
    modelId: string;
  }>,
  res: Response,
) {
  try {
    const data = updateModelSchema.parse(req.body);

    const ownerId = req.user.id;
    const agentId = req.params.agentId;
    const modelId = req.params.modelId;

    const model = await modelService.update(ownerId, agentId, modelId, data);

    return res.status(200).json({
      success: true,
      data: model,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error,
    });
  }
}
export async function deleteModel(
  req: Request<{
    agentId: string;
    modelId: string;
  }>,
  res: Response,
) {
  try {
    const ownerId = req.user.id;
    const agentId = req.params.agentId;
    const modelId = req.params.modelId;

    await modelService.delete(ownerId, agentId, modelId);

    return res.status(200).json({
      success: true,
      message: "Model deleted successfully",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
