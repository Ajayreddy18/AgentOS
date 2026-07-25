import { Request, Response } from "express";

import {
  createConversationSchema,
  updateConversationSchema,
} from "./conversation.validation";

import { ConversationService } from "./conversation.service";

const conversationService = new ConversationService();

export async function create(req: Request<{ agentId: string }>, res: Response) {
  try {
    const data = createConversationSchema.parse(req.body);

    const ownerId = req.user.id;
    const agentId = req.params.agentId;

    const conversation = await conversationService.create(
      ownerId,
      agentId,
      data,
    );

    return res.status(201).json({
      success: true,
      data: conversation,
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

    const conversations = await conversationService.list(ownerId, agentId);

    return res.status(200).json({
      success: true,
      data: conversations,
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
    conversationId: string;
  }>,
  res: Response,
) {
  try {
    const ownerId = req.user.id;
    const agentId = req.params.agentId;
    const conversationId = req.params.conversationId;

    const conversation = await conversationService.getById(
      ownerId,
      agentId,
      conversationId,
    );

    return res.status(200).json({
      success: true,
      data: conversation,
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
    conversationId: string;
  }>,
  res: Response,
) {
  try {
    const data = updateConversationSchema.parse(req.body);

    const ownerId = req.user.id;
    const agentId = req.params.agentId;
    const conversationId = req.params.conversationId;

    const conversation = await conversationService.update(
      ownerId,
      agentId,
      conversationId,
      data,
    );

    return res.status(200).json({
      success: true,
      data: conversation,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error,
    });
  }
}
export async function deleteConversation(
  req: Request<{
    agentId: string;
    conversationId: string;
  }>,
  res: Response,
) {
  try {
    const ownerId = req.user.id;
    const agentId = req.params.agentId;
    const conversationId = req.params.conversationId;

    await conversationService.delete(ownerId, agentId, conversationId);

    return res.status(200).json({
      success: true,
      message: "Conversation deleted successfully",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
