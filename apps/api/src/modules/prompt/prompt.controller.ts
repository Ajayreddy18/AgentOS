import { Request, Response } from "express";

import { createPromptSchema, updatePromptSchema } from "./prompt.validation";

import { PromptService } from "./prompt.service";

const promptService = new PromptService();

export async function create(req: Request<{ agentId: string }>, res: Response) {
  try {
    const data = createPromptSchema.parse(req.body);
    const ownerId = req.user.id;
    const agentId = req.params.agentId;
    const prompt = await promptService.create(ownerId, agentId, data);

    return res.status(201).json({
      success: true,
      data: prompt,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error,
    });
  }
}

export async function update(
  req: Request<{ agentId: string; promptId: string }>,
  res: Response,
) {
  try {
    const data = updatePromptSchema.parse(req.body);
    const ownerId = req.user.id;
    const promptId = req.params.promptId;
    const agentId = req.params.agentId;

    const prompt = await promptService.update(ownerId, agentId, promptId, data);

    return res.status(200).json({
      success: true,
      data: prompt,
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

    const prompt = await promptService.list(ownerId, agentId);

    return res.status(200).json({
      success: true,
      data: prompt,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error,
    });
  }
}

export async function getById(
  req: Request<{ agentId: string; promptId: string }>,
  res: Response,
) {
  try {
    const ownerId = req.user.id;
    const promptId = req.params.promptId;
    const agentId = req.params.agentId;

    const prompt = await promptService.getById(ownerId, agentId, promptId);

    return res.status(200).json({
      success: true,
      data: prompt,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      error,
    });
  }
}

export async function deletePrompt(
  req: Request<{ promptId: string; agentId: string }>,
  res: Response,
) {
  try {
    const ownerId = req.user.id;
    const promptId = req.params.promptId;
    const agentId = req.params.agentId;

    await promptService.delete(ownerId, agentId, promptId);

    return res.status(200).json({
      success: true,
      message: "Prompt deleted successfully",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
