import type { ReactNode } from "react";

type Props = {
  title: string;
  description: string;
  action?: ReactNode;
};

export function EmptyState({ title, description, action }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h2 className="text-xl font-semibold">{title}</h2>

      <p className="mt-3 max-w-md opacity-70">{description}</p>

      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
