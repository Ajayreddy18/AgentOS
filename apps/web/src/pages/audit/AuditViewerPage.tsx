import { useState } from "react";

import { AuditHeader } from "./components/AuditHeader";
import { AuditTable } from "./components/AuditTable";
import { Pagination } from "./components/AuditPagination";

import { useAuditLogs } from "./hooks/useAuditLogs";

import { ErrorState, EmptyState } from "@/components/feedback";

import { SkeletonPage } from "@/components/ui/SKELETON/";

export function AuditViewerPage() {
  const [page, setPage] = useState(1);

  const {
    data,

    isLoading,

    isError,

    refetch,
  } = useAuditLogs(page);

  if (isLoading) {
    return <SkeletonPage />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Unable to load audit logs"

        description="Please try again."

        onRetry={refetch}
      />
    );
  }

  if (!data || data.items.length === 0) {
    return (
      <EmptyState
        title="No audit logs"

        description="Activity will appear here."
      />
    );
  }

  return (
    <div className="space-y-8">
      <AuditHeader />

      <AuditTable logs={data.items} />

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {data.total} audit events
        </p>

        <Pagination
          page={data.page}

          totalPages={data.totalPages}

          onPrevious={() => setPage((p) => Math.max(1, p - 1))}

          onNext={() => setPage((p) => Math.min(data.totalPages, p + 1))}
        />
      </div>
    </div>
  );
}
