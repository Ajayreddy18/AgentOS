interface Props {
  leftTitle: string;

  leftValue: number | string;

  rightTitle: string;

  rightValue: number | string;
}

export function StatComparison({
  leftTitle,

  leftValue,

  rightTitle,

  rightValue,
}: Props) {
  return (
    <div className="grid grid-cols-2 divide-x rounded-xl border">
      <div className="p-4 text-center">
        <div className="text-xs uppercase tracking-wide text-muted-foreground">
          {leftTitle}
        </div>

        <div className="mt-2 text-3xl font-bold">{leftValue}</div>
      </div>

      <div className="p-4 text-center">
        <div className="text-xs uppercase tracking-wide text-muted-foreground">
          {rightTitle}
        </div>

        <div className="mt-2 text-3xl font-bold">{rightValue}</div>
      </div>
    </div>
  );
}
