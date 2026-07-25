import { Request, Response } from "express";

import { runtimeEventService } from "./runtime-event.instance";

export async function list(
  req: Request<{ conversationId: string }>,
  res: Response,
) {
  try {
    const ownerId = req.user.id;

    const events = await runtimeEventService.list(
      ownerId,
      req.params.conversationId,
    );

    return res.status(200).json({
      success: true,

      data: events,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,

      error,
    });
  }
}
