import { Request, Response } from "express";

import { createMemorySchema, updateMemorySchema } from "./memory.validation";

import { MemoryService } from "./memory.service";

const memoryService = new MemoryService();

export async function create(req: Request<{ agentId: string }>, res: Response) {
  try {
    const data = createMemorySchema.parse(req.body);
    const ownerId = req.user.id;
    const agentId = req.params.agentId;
    const memory = await memoryService.create(ownerId, agentId, data);

    return res.status(201).json({
      success: true,
      data: memory,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error,
    });
  }
}

export async function update(
  req: Request<{ agentId: string; memoryId: string }>,
  res: Response,
) {
  try {
    const data = updateMemorySchema.parse(req.body);
    const ownerId = req.user.id;
    const memoryId = req.params.memoryId;
    const agentId = req.params.agentId;

    const memory = await memoryService.update(ownerId, agentId, memoryId, data);

    return res.status(200).json({
      success: true,
      data: memory,
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

    const memories = await memoryService.list(ownerId, agentId);

    return res.status(200).json({
      success: true,
      data: memories,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error,
    });
  }
}

export async function getById(
  req: Request<{ agentId: string; memoryId: string }>,
  res: Response,
) {
  try {
    const ownerId = req.user.id;
    const memoryId = req.params.memoryId;
    const agentId = req.params.agentId;

    const memory = await memoryService.getById(ownerId, agentId, memoryId);

    return res.status(200).json({
      success: true,
      data: memory,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      error,
    });
  }
}

export async function deleteMemory(
  req: Request<{ memoryId: string; agentId: string }>,
  res: Response,
) {
  try {
    const ownerId = req.user.id;
    const memoryId = req.params.memoryId;
    const agentId = req.params.agentId;

    await memoryService.delete(ownerId, agentId, memoryId);

    return res.status(200).json({
      success: true,
      message: "Memory deleted successfully",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
