import type { AuditLog } from "../types";

interface Props {
  log: AuditLog;
}

export function AuditRow({ log }: Props) {
  return (
    <tr className="border-b">
      <td className="px-5 py-4 capitalize">{log.action}</td>

      <td className="px-5 py-4 font-mono text-xs">{log.userId}</td>

      <td className="px-5 py-4 capitalize">{log.resource}</td>

      <td className="px-5 py-4">{new Date(log.createdAt).toLocaleString()}</td>
    </tr>
  );
}
