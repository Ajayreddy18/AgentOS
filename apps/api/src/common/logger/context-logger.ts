import type { Logger } from "pino";

import { baseLogger } from "./base-logger";
import { RequestContextService } from "../context/request-context";

type LogLevel = "info" | "warn" | "error" | "debug" | "fatal";

class ContextLogger {
  constructor(private readonly logger: Logger) {}

  private mergeContext(data?: Record<string, unknown>) {
    const context = RequestContextService.get();

    return {
      ...(context ?? {}),
      ...(data ?? {}),
    };
  }

  private log(
    level: LogLevel,
    objOrMsg?: unknown,
    msg?: string,
    ...args: unknown[]
  ) {
    // Error object
    if (objOrMsg instanceof Error) {
      this.logger[level](
        this.mergeContext({
          err: objOrMsg,
        }),
        msg,
        ...args,
      );
      return;
    }

    // Object + message
    if (objOrMsg && typeof objOrMsg === "object") {
      this.logger[level](
        this.mergeContext(objOrMsg as Record<string, unknown>),
        msg,
        ...args,
      );
      return;
    }

    // Message only
    this.logger[level](this.mergeContext(), objOrMsg as string, msg, ...args);
  }

  info(objOrMsg?: unknown, msg?: string, ...args: unknown[]) {
    this.log("info", objOrMsg, msg, ...args);
  }

  warn(objOrMsg?: unknown, msg?: string, ...args: unknown[]) {
    this.log("warn", objOrMsg, msg, ...args);
  }

  error(objOrMsg?: unknown, msg?: string, ...args: unknown[]) {
    this.log("error", objOrMsg, msg, ...args);
  }

  debug(objOrMsg?: unknown, msg?: string, ...args: unknown[]) {
    this.log("debug", objOrMsg, msg, ...args);
  }

  fatal(objOrMsg?: unknown, msg?: string, ...args: unknown[]) {
    this.log("fatal", objOrMsg, msg, ...args);
  }
}

export const logger = new ContextLogger(baseLogger);
