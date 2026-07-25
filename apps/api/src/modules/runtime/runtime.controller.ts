import { Request, Response } from "express";

import { RuntimeService } from "./runtime.service";

const runtimeService = new RuntimeService();

export async function getRuntime(
  req: Request<{ conversationId: string }>,
  res: Response,
) {
  try {
    const ownerId = req.user.id;
    const conversationId = req.params.conversationId;

    const runtime = await runtimeService.load(ownerId, conversationId);

    return res.status(200).json({
      success: true,
      data: runtime,
    });
  } catch (error) {
    console.error("===== RUNTIME CONTROLLER ERROR =====");
    console.error(error);

    return res.status(400).json({
      success: false,
      error: {
        name: error instanceof Error ? error.name : "Unknown",
        message: error instanceof Error ? error.message : error,
        stack: error instanceof Error ? error.stack : undefined,
      },
    });
  }
}
