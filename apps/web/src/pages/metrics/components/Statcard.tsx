import type { ReactNode } from "react";

interface Props {
  title: string;
  value: ReactNode;
  subtitle?: string;
  icon?: React.ElementType;
  color?: string;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color = "text-primary",
}: Props) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm text-muted-foreground">{title}</div>

          <div className="mt-2 text-3xl font-bold">{value}</div>

          {subtitle && (
            <div className="mt-2 text-xs text-muted-foreground">{subtitle}</div>
          )}
        </div>

        {Icon && (
          <div className={`rounded-lg bg-muted p-3 ${color}`}>
            <Icon className="h-6 w-6" />
          </div>
        )}
      </div>
    </div>
  );
}
