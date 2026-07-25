import { Registry, collectDefaultMetrics } from "prom-client";

export const register = new Registry();

register.setDefaultLabels({
  service: "agent-os",
  environment: process.env.NODE_ENV ?? "development",
});

collectDefaultMetrics({
  register,
});
