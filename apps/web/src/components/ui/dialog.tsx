export type AppDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
};

export function AppDialog({
  open,
  onOpenChange,
  title,
  children,
}: AppDialogProps) {
  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={() => onOpenChange(false)}
      />

      <div
        className="
                    fixed
                    left-1/2
                    top-1/2
                    -translate-x-1/2
                    -translate-y-1/2
                    z-50
                    w-[500px]
                    rounded-xl
                    border
                    bg-black
                    text-white
                    p-6
                "
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold">{title}</h2>

        <div className="mt-4">{children}</div>
      </div>
    </>
  );
}
