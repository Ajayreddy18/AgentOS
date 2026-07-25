import type { AuditLog } from "../types";

import { AuditRow } from "./AuditRow";

interface Props {
  logs: AuditLog[];
}

export function AuditTable({ logs }: Props) {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <table className="w-full">
        <thead className="border-b bg-muted">
          <tr>
            <th className="px-5 py-3 text-left">Action</th>

            <th className="px-5 py-3 text-left">Actor</th>

            <th className="px-5 py-3 text-left">Resource</th>

            <th className="px-5 py-3 text-left">Timestamp</th>
          </tr>
        </thead>

        <tbody>
          {logs.map((log) => (
            <AuditRow
              key={log.id}

              log={log}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
