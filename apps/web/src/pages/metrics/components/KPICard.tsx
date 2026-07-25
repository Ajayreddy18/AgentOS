import type { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  value: number | string;
  icon: LucideIcon;
  subtitle?: string;
  color?: string;
  trend?: React.ReactNode;
}

export function KPICard({
  title,
  value,
  icon: Icon,
  subtitle,
  color = "text-primary",
  trend,
}: Props) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>

          <h2 className="mt-2 text-3xl font-bold">{value}</h2>

          {subtitle && (
            <p className="mt-2 text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>

        <div className={`rounded-lg bg-muted p-3 ${color}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>

      {trend && <div className="mt-4">{trend}</div>}
    </div>
  );
}
