class HealthService {
  getHealth() {
    return {
      status: "ok",
      service: "AgentOS API",
      timestamp: new Date().toISOString(),
    };
  }
}

export default new HealthService();
