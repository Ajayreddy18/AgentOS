import type { ReactNode } from "react";

interface Props {
  title: string;
  value: number;
  description: string;
  icon: ReactNode;
}

export function MetricCard({ title, value, description, icon }: Props) {
  return (
    <div
      className="
                rounded-xl
                border
                bg-background
                p-5
                shadow-sm
            "
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>

          <h2 className="mt-2 text-3xl font-bold">{value}</h2>

          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        </div>

        {icon}
      </div>
    </div>
  );
}
