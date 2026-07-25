import { Request, Response, NextFunction } from "express";

import { ChatService } from "./chat.service";
import { chatSchema } from "./chat.validation";
import { logger } from "../../common/logger/logger";
import { AppError } from "../../common/errors/app-error";

const chatService = new ChatService();

export async function chat(
  req: Request<{ conversationId: string }>,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = chatSchema.parse(req.body);

    const response = await chatService.chat(
      req.user.id,
      req.params.conversationId,
      data,
    );

    return res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    next(error);
  }
}

export async function chatStream(
  req: Request<{ conversationId: string }>,
  res: Response,
) {
  try {
    const data = chatSchema.parse(req.body);

    const ownerId = req.user.id;
    const conversationId = req.params.conversationId;
    const abortController = new AbortController();

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.on("close", () => {
      if (!res.writableEnded) {
        logger.info(
          {
            conversationId,
          },
          "Client disconnected",
        );

        abortController.abort();
      }
    });

    const stream = chatService.chatStream(
      ownerId,
      conversationId,
      data,
      abortController.signal,
    );

    for await (const event of stream) {
      res.write(`data: ${JSON.stringify(event)}\n\n`);
    }

    res.write(
      `data: ${JSON.stringify({
        type: "done",
      })}\n\n`,
    );

    res.end();
  } catch (error) {
    res.write(
      `data: ${JSON.stringify({
        type: "error",
        message:
          error instanceof AppError ? error.message : "Internal Server error",
      })}\n\n`,
    );

    res.end();
  }
}
