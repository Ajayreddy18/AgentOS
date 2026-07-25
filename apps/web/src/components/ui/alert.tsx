import * as React from "react";

import { cn } from "@/lib/utils";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "destructive";
}

export function Alert({
  variant = "default",
  className,
  ...props
}: AlertProps) {
  return (
    <div
      className={cn(
        "rounded-lg border p-4",
        variant === "destructive"
          ? "border-red-500 bg-red-500/10"
          : "border-[hsl(var(--border))] bg-[hsl(var(--card))]",
        className,
      )}
      {...props}
    />
  );
}
