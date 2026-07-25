export interface LivenessResponse {
  status: "alive";
  timestamp: string;
}

export interface ReadinessResponse {
  status: "ready" | "not_ready";

  checks: {
    database: "up" | "down";
  };

  timestamp: string;
}
