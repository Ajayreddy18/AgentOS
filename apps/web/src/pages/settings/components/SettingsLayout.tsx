import type { ReactNode } from "react";

interface Props {
  sidebar: ReactNode;

  children: ReactNode;
}

export function SettingsLayout({
  sidebar,

  children,
}: Props) {
  return (
    <div className="grid gap-8 lg:grid-cols-4">
      <aside>{sidebar}</aside>

      <main className="space-y-6 lg:col-span-3">{children}</main>
    </div>
  );
}
