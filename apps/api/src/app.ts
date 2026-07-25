import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import healthRoutes from "./common/health/health.routes.js";
import routes from "./routes/index.js";
import metricsRoutes from "./common/metrics/metrics.routes.js";
import runtimeRoutes from "./modules/runtime/runtime.routes.js";
import metricsDashboardRoutes from "./modules/metrics/metrics.routes.js";
import { auditRoutes } from "./modules/audit/index.js";
import { settingsRoutes } from "./modules/settings";

import { errorMiddleware } from "./common/middleware/error.middleware.js";
import { requestIdMiddleware } from "./common/middleware/request-id.middleware.js";
import { requestContextMiddleware } from "./common/context/request-context.middleware.js";
import { requestLoggingMiddleware } from "./common/middleware/request-logging.middleware.js";
import { httpMetricsMiddleware } from "./common/middleware/http-metrics.middleware.js";
import { rateLimitMiddleware } from "./common/rate-limit/limit.middleware.js";
import { corsOptions } from "./config/cors.js";
import { securityHeadersMiddleware } from "./common/middleware/security-headers.middleware.js";
import compression from "compression";

const app = express();

app.set("trust proxy", true);
app.set("etag", false);
app.disable("x-powered-by");

app.use(requestIdMiddleware);
app.use(requestContextMiddleware);

app.use(rateLimitMiddleware);

app.use(httpMetricsMiddleware);

app.use(requestLoggingMiddleware);

app.use(cors(corsOptions));

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
    frameguard: {
      action: "deny",
    },
    noSniff: true,
    referrerPolicy: {
      policy: "strict-origin-when-cross-origin",
    },
  }),
);

app.use(compression());

app.use(securityHeadersMiddleware);

app.use(morgan("dev"));

app.use(
  express.json({
    limit: "1mb",
  }),
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "1mb",
  }),
);

app.use("/health", healthRoutes);
app.use("/metrics", metricsRoutes);
app.use("/api/v1", runtimeRoutes);
app.use("/api/v1/metrics", metricsDashboardRoutes);
app.use("/api/v1/audit", auditRoutes);
app.use("/api/v1/settings", settingsRoutes);

app.use("/api/v1", routes);

app.use(errorMiddleware);

export default app;
