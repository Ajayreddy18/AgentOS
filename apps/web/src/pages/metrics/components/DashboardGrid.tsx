interface Props {
  children: React.ReactNode;
}

export function DashboardGrid({ children }: Props) {
  return <div className="grid gap-6 xl:grid-cols-12">{children}</div>;
}
