import type { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

export function SectionCard({ title, children }: Props) {
  return (
    <div
      className="
                rounded-lg
                border
                bg-card
                p-6
                shadow-sm
            "
    >
      <h2
        className="
                    mb-4
                    text-lg
                    font-semibold
                "
      >
        {title}
      </h2>

      {children}
    </div>
  );
}
