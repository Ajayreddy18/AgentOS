import { Request, Response } from "express";

import {
  createKnowledgeSchema,
  updateKnowledgeSchema,
} from "./knowledge.validation";

import { KnowledgeService } from "./knowledge.service";
import { searchKnowledgeSchema } from "./knowledge.search.validation";

const knowledgeService = new KnowledgeService();

export async function create(req: Request<{ agentId: string }>, res: Response) {
  try {
    const data = createKnowledgeSchema.parse(req.body);
    const ownerId = req.user.id;
    const agentId = req.params.agentId;
    const knowledge = await knowledgeService.create(ownerId, agentId, data);

    return res.status(201).json({
      success: true,
      data: knowledge,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error,
    });
  }
}

export async function update(
  req: Request<{ agentId: string; knowledgeId: string }>,
  res: Response,
) {
  try {
    const data = updateKnowledgeSchema.parse(req.body);
    const ownerId = req.user.id;
    const knowledgeId = req.params.knowledgeId;
    const agentId = req.params.agentId;

    const knowledge = await knowledgeService.update(
      ownerId,
      agentId,
      knowledgeId,
      data,
    );

    return res.status(200).json({
      success: true,
      data: knowledge,
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

    const knowledges = await knowledgeService.list(ownerId, agentId);

    return res.status(200).json({
      success: true,
      data: knowledges,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error,
    });
  }
}

export async function getById(
  req: Request<{ agentId: string; knowledgeId: string }>,
  res: Response,
) {
  try {
    const ownerId = req.user.id;
    const knowledgeId = req.params.knowledgeId;
    const agentId = req.params.agentId;

    const knowledge = await knowledgeService.getById(
      ownerId,
      agentId,
      knowledgeId,
    );

    return res.status(200).json({
      success: true,
      data: knowledge,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      error,
    });
  }
}

export async function deleteKnowledge(
  req: Request<{ knowledgeId: string; agentId: string }>,
  res: Response,
) {
  try {
    const ownerId = req.user.id;
    const knowledgeId = req.params.knowledgeId;
    const agentId = req.params.agentId;

    await knowledgeService.delete(ownerId, agentId, knowledgeId);

    return res.status(200).json({
      success: true,
      message: "Knowledge deleted successfully",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function search(req: Request<{ agentId: string }>, res: Response) {
  try {
    const data = searchKnowledgeSchema.parse(req.body);

    const ownerId = req.user.id;
    const agentId = req.params.agentId;

    const results = await knowledgeService.search(ownerId, agentId, data);

    return res.status(200).json({
      success: true,
      data: results,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error,
    });
  }
}
