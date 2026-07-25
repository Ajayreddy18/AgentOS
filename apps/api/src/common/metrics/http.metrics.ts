import { Counter, Gauge, Histogram } from "prom-client";

import { register } from "./metrics";

export const httpRequestsTotal = new Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",

  labelNames: ["method", "route", "status_code"],

  registers: [register],
});

export const httpRequestDuration = new Histogram({
  name: "http_request_duration_seconds",

  help: "HTTP request duration",

  labelNames: ["method", "route", "status_code"],

  buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2, 5],

  registers: [register],
});

export const activeHttpRequests = new Gauge({
  name: "http_active_requests",

  help: "Current active HTTP requests",

  registers: [register],
});
