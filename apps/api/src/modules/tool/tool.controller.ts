import { Request, Response } from "express";

import { createToolSchema, updateToolSchema } from "./tool.validation";

import { ToolService } from "./tool.service";

const toolService = new ToolService();

export async function create(req: Request<{ agentId: string }>, res: Response) {
  try {
    const data = createToolSchema.parse(req.body);

    const ownerId = req.user.id;
    const agentId = req.params.agentId;

    const tool = await toolService.create(ownerId, agentId, data);

    return res.status(201).json({
      success: true,
      data: tool,
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

    const tools = await toolService.list(ownerId, agentId);

    return res.status(200).json({
      success: true,
      data: tools,
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
    toolId: string;
  }>,
  res: Response,
) {
  try {
    const ownerId = req.user.id;
    const agentId = req.params.agentId;
    const toolId = req.params.toolId;

    const tool = await toolService.getById(ownerId, agentId, toolId);

    return res.status(200).json({
      success: true,
      data: tool,
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
    toolId: string;
  }>,
  res: Response,
) {
  try {
    const data = updateToolSchema.parse(req.body);

    const ownerId = req.user.id;
    const agentId = req.params.agentId;
    const toolId = req.params.toolId;

    const tool = await toolService.update(ownerId, agentId, toolId, data);

    return res.status(200).json({
      success: true,
      data: tool,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error,
    });
  }
}
export async function deleteTool(
  req: Request<{
    agentId: string;
    toolId: string;
  }>,
  res: Response,
) {
  try {
    const ownerId = req.user.id;
    const agentId = req.params.agentId;
    const toolId = req.params.toolId;

    await toolService.delete(ownerId, agentId, toolId);

    return res.status(200).json({
      success: true,
      message: "Tool deleted successfully",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
