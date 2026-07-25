import { Request, Response } from "express";

import { createAgentSchema, updateAgentSchema } from "./agent.validation";

import { AgentService } from "./agent.service";

const agentService = new AgentService();

export async function create(
  req: Request<{ environmentId: string }>,
  res: Response,
) {
  try {
    const data = createAgentSchema.parse(req.body);
    const ownerId = req.user.id;
    const environmentId = req.params.environmentId;
    const agent = await agentService.create(ownerId, environmentId, data);

    return res.status(201).json({
      success: true,
      data: agent,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error,
    });
  }
}

export async function update(
  req: Request<{ agentId: string; environmentId: string }>,
  res: Response,
) {
  try {
    const data = updateAgentSchema.parse(req.body);
    const ownerId = req.user.id;
    const environmentId = req.params.environmentId;
    const agentId = req.params.agentId;

    const agent = await agentService.update(
      ownerId,
      environmentId,
      agentId,
      data,
    );

    return res.status(200).json({
      success: true,
      data: agent,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error,
    });
  }
}

export async function list(
  req: Request<{ environmentId: string }>,
  res: Response,
) {
  try {
    const ownerId = req.user.id;
    const environmentId = req.params.environmentId;

    const agents = await agentService.list(ownerId, environmentId);

    return res.status(200).json({
      success: true,
      data: agents,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error,
    });
  }
}

export async function getById(
  req: Request<{ agentId: string; environmentId: string }>,
  res: Response,
) {
  try {
    const ownerId = req.user.id;
    const environmentId = req.params.environmentId;
    const agentId = req.params.agentId;

    const agent = await agentService.getById(ownerId, environmentId, agentId);

    return res.status(200).json({
      success: true,
      data: agent,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      error,
    });
  }
}

export async function deleteAgent(
  req: Request<{ environmentId: string; agentId: string }>,
  res: Response,
) {
  try {
    const ownerId = req.user.id;
    const environmentId = req.params.environmentId;
    const agentId = req.params.agentId;

    await agentService.delete(ownerId, environmentId, agentId);

    return res.status(200).json({
      success: true,
      message: "Agent deleted successfully",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
