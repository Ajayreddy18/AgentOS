import { useMetricsDashboard } from "./hooks/useMetricsDashboard";

import { WorkspaceOverview } from "./components/WorkspaceOverview";
import { AIUsagePanel } from "./components/AIUsagePanel";
import { ExecutionPanel } from "./components/ExecutionPanel";
import { OperationsPanel } from "./components/OperationsPanel";
import { SystemHealth } from "./components/SystemHealth";

import { SuccessRateCard } from "./components/SuccessRateCard";
import { AvgMessagesCard } from "./components/AvgMessagesCard";
import { LatencyCard } from "./components/LatencyCard";
import { RuntimeEventsCard } from "./components/RuntimeEventsCard";

import { AIUsageTrendChart } from "./components/AIUsageTrendChart";
import { ToolExecutionChart } from "./components/ToolExecutionChart";
import { PipelineChart } from "./components/PipelineChart";
import { WorkspaceInsights } from "./components/WorkspaceInsights";

import { RecentActivity } from "./components/RecentActivity";
import { ModelUsageCard } from "./components/ModelUsageCard";
import { PerformanceScore } from "./components/PerformanceScore";
import { CostEstimationCard } from "./components/CostEstimationCard";

import { LoadingAnalytics } from "./components/LoadingAnalytics";
import { ErrorAnalytics } from "./components/ErrorAnalytics";
import { EmptyAnalyticsState } from "./components/EmptyAnalyticsState";
import { AnalyticsFooter } from "./components/AnalyticsFooter";

export function MetricsDashboardPage() {
  const {
    data,

    isLoading,

    isError,

    refetch,
  } = useMetricsDashboard();

  if (isLoading) {
    return <LoadingAnalytics />;
  }

  if (isError) {
    return <ErrorAnalytics onRetry={refetch} />;
  }

  if (!data) {
    return <EmptyAnalyticsState />;
  }

  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>

        <p className="mt-2 text-muted-foreground">
          Observe the health, usage, performance and operational metrics of your
          AI workspace.
        </p>
      </div>

      {/* KPI Overview */}

      <WorkspaceOverview metrics={data} />

      {/* Main Panels */}

      <div className="grid gap-6 lg:grid-cols-2">
        <AIUsagePanel metrics={data} />

        <ExecutionPanel metrics={data} />

        <OperationsPanel metrics={data} />

        <SystemHealth metrics={data} />
      </div>

      {/* Charts */}

      <div className="grid gap-6 lg:grid-cols-2">
        <AIUsageTrendChart metrics={data} />

        <ToolExecutionChart metrics={data} />

        <PipelineChart metrics={data} />

        <WorkspaceInsights metrics={data} />
      </div>

      {/* KPI Cards */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <SuccessRateCard metrics={data} />

        <AvgMessagesCard metrics={data} />

        <LatencyCard metrics={data} />

        <RuntimeEventsCard metrics={data} />
      </div>

      {/* Detailed Analytics */}

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentActivity metrics={data} />

        <ModelUsageCard metrics={data} />
      </div>

      {/* AI Performance */}

      <div className="grid gap-6 lg:grid-cols-2">
        <PerformanceScore metrics={data} />

        <CostEstimationCard metrics={data} />
      </div>

      {/* Footer */}

      <AnalyticsFooter />
    </div>
  );
}
