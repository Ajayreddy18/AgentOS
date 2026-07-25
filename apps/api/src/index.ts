import "./config/env";
import app from "./app.js";
import { logger } from "./common/logger/logger";
import { startBackgroundJobs } from "./common/jobs/job.bootstrap";

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, async () => {
  logger.info(
    {
      port: PORT,
    },
    "Server Started",
  );

  await startBackgroundJobs();
});

process.on("uncaughtException", (error) => {
  logger.fatal({ error }, "Uncaught Exception");

  process.exit(1);
});

process.on("unhandledRejection", (error) => {
  logger.fatal({ error }, "Unhandled Promise Rejection");

  process.exit(1);
});

const gracefulShutdown = async () => {
  logger.info("Graceful shutdown started");

  server.close(() => {
    logger.info("HTTP server closed");

    process.exit(0);
  });

  setTimeout(() => {
    logger.error("Forced shutdown");
    process.exit(1);
  }, 10000);
};

process.on("SIGINT", gracefulShutdown);

process.on("SIGTERM", gracefulShutdown);
