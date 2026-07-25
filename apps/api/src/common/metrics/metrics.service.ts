import { metricsRegistry } from "./metrics.registry";

export class MetricsService {
  async getMetrics() {
    return metricsRegistry.metrics();
  }

  getContentType() {
    return metricsRegistry.contentType;
  }
}
