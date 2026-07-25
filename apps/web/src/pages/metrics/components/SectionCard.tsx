interface Props {
  title: string;

  children: React.ReactNode;
}

export function SectionCard({ title, children }: Props) {
  return (
    <div
      className="
                rounded-xl
                border
                bg-background
                p-6
                shadow-sm
            "
    >
      <h2
        className="
                    mb-5
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
