import {
  Gauge,
  Counter,
  Histogram,
  Registry,
  collectDefaultMetrics,
} from "prom-client";

export const metricsRegistry = new Registry();

collectDefaultMetrics({
  register: metricsRegistry,
});

/* ---------------------------------------
 * HTTP Metrics
 * -------------------------------------*/

export const httpRequestsTotal = new Counter({
  name: "http_requests_total",
  help: "Total HTTP requests",
  labelNames: ["method", "route", "status_code"],
  registers: [metricsRegistry],
});

export const httpRequestDuration = new Histogram({
  name: "http_request_duration_seconds",
  help: "HTTP request duration",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2, 5],
  registers: [metricsRegistry],
});

/* ---------------------------------------
 * Chat Metrics
 * -------------------------------------*/

export const chatRequestsTotal = new Counter({
  name: "chat_requests_total",
  help: "Total chat requests",
  registers: [metricsRegistry],
});

export const chatDuration = new Histogram({
  name: "chat_duration_seconds",
  help: "Chat pipeline duration",
  buckets: [0.1, 0.25, 0.5, 1, 2, 5, 10, 20, 30],
  registers: [metricsRegistry],
});

/* ---------------------------------------
 * Streaming Chat Metrics
 * -------------------------------------*/

export const chatStreamRequestsTotal = new Counter({
  name: "chat_stream_requests_total",
  help: "Total streaming chat requests",
  registers: [metricsRegistry],
});

export const chatStreamDuration = new Histogram({
  name: "chat_stream_duration_seconds",
  help: "Streaming chat duration",
  buckets: [0.1, 0.25, 0.5, 1, 2, 5, 10, 20, 30, 60],
  registers: [metricsRegistry],
});

export const chatStreamFirstTokenDuration = new Histogram({
  name: "chat_stream_first_token_duration_seconds",
  help: "Time taken to receive first streamed token",
  buckets: [0.01, 0.05, 0.1, 0.25, 0.5, 1, 2, 5],
  registers: [metricsRegistry],
});

export const chatStreamAbortedTotal = new Counter({
  name: "chat_stream_aborted_total",
  help: "Total aborted streaming responses",
  registers: [metricsRegistry],
});

export const chatStreamTokensTotal = new Counter({
  name: "chat_stream_tokens_total",
  help: "Total streamed text chunks",
  registers: [metricsRegistry],
});

/* ---------------------------------------
 * LLM Metrics
 * -------------------------------------*/

export const llmRequestsTotal = new Counter({
  name: "llm_requests_total",
  help: "Total LLM requests",
  labelNames: ["provider", "model", "status"],
  registers: [metricsRegistry],
});

export const llmRequestDuration = new Histogram({
  name: "llm_request_duration_seconds",
  help: "LLM request duration",
  labelNames: ["provider", "model"],
  buckets: [0.1, 0.25, 0.5, 1, 2, 5, 10, 20, 30],
  registers: [metricsRegistry],
});

/* ---------------------------------------
 * Tool Metrics
 * -------------------------------------*/

export const toolExecutionTotal = new Counter({
  name: "tool_execution_total",
  help: "Total tool executions",
  labelNames: ["tool", "status"],
  registers: [metricsRegistry],
});

export const toolExecutionDuration = new Histogram({
  name: "tool_execution_duration_seconds",
  help: "Tool execution duration",
  labelNames: ["tool"],
  buckets: [0.001, 0.01, 0.05, 0.1, 0.25, 0.5, 1, 2, 5],
  registers: [metricsRegistry],
});

/* ---------------------------------------
 * Retrieval Metrics
 * -------------------------------------*/

export const retrievalDuration = new Histogram({
  name: "retrieval_duration_seconds",
  help: "Knowledge retrieval duration",
  registers: [metricsRegistry],
});

/* ---------------------------------------
 * Memory Metrics
 * -------------------------------------*/

export const memoryRetrievalDuration = new Histogram({
  name: "memory_retrieval_duration_seconds",
  help: "Memory retrieval duration",
  registers: [metricsRegistry],
});

export const memoryExtractionDuration = new Histogram({
  name: "memory_extraction_duration_seconds",
  help: "Memory extraction duration",
  registers: [metricsRegistry],
});

/* ---------------------------------------
 * Planner Metrics
 * -------------------------------------*/

export const plannerStepsTotal = new Counter({
  name: "planner_steps_total",
  help: "Total planner steps",
  registers: [metricsRegistry],
});

export const plannerFailuresTotal = new Counter({
  name: "planner_failures_total",
  help: "Planner failures",
  registers: [metricsRegistry],
});

export const backgroundJobsTotal = new Counter({
  name: "background_jobs_total",
  help: "Total background jobs processed",
  labelNames: ["job", "status"],
  registers: [metricsRegistry],
});

export const backgroundJobDuration = new Histogram({
  name: "background_job_duration_seconds",
  help: "Background job execution duration",
  labelNames: ["job"],
  buckets: [0.05, 0.1, 0.25, 0.5, 1, 2, 5, 10],
  registers: [metricsRegistry],
});

export const backgroundJobRetries = new Counter({
  name: "background_job_retries_total",
  help: "Total background job retries",
  labelNames: ["job"],
  registers: [metricsRegistry],
});

export const backgroundJobsQueued = new Gauge({
  name: "background_jobs_queued",
  help: "Current queued background jobs",
  registers: [metricsRegistry],
});
