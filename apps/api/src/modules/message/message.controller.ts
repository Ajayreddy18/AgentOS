import { Request, Response } from "express";

import { createMessageSchema, updateMessageSchema } from "./message.validation";

import { MessageService } from "./message.service";

const messageService = new MessageService();

export async function create(
  req: Request<{ conversationId: string }>,
  res: Response,
) {
  try {
    const data = createMessageSchema.parse(req.body);

    const ownerId = req.user.id;
    const conversationId = req.params.conversationId;

    const message = await messageService.create(ownerId, conversationId, data);

    return res.status(201).json({
      success: true,
      data: message,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error,
    });
  }
}
export async function list(
  req: Request<{ conversationId: string }>,
  res: Response,
) {
  try {
    const ownerId = req.user.id;
    const conversationId = req.params.conversationId;

    const messages = await messageService.list(ownerId, conversationId);

    return res.status(200).json({
      success: true,
      data: messages,
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
    conversationId: string;
    messageId: string;
  }>,
  res: Response,
) {
  try {
    const ownerId = req.user.id;
    const conversationId = req.params.conversationId;
    const messageId = req.params.messageId;

    const message = await messageService.getById(
      ownerId,
      conversationId,
      messageId,
    );

    return res.status(200).json({
      success: true,
      data: message,
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
    conversationId: string;
    messageId: string;
  }>,
  res: Response,
) {
  try {
    const data = updateMessageSchema.parse(req.body);

    const ownerId = req.user.id;
    const conversationId = req.params.conversationId;
    const messageId = req.params.messageId;

    const message = await messageService.update(
      ownerId,
      conversationId,
      messageId,
      data,
    );

    return res.status(200).json({
      success: true,
      data: message,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error,
    });
  }
}
export async function deleteMessage(
  req: Request<{
    conversationId: string;
    messageId: string;
  }>,
  res: Response,
) {
  try {
    const ownerId = req.user.id;
    const conversationId = req.params.conversationId;
    const messageId = req.params.messageId;

    await messageService.delete(ownerId, conversationId, messageId);

    return res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
