import Skeleton from "./Skeleton";

interface SkeletonTableProps {
  rows?: number;
  columns?: number;
}

export default function SkeletonTable({
  rows = 6,
  columns = 5,
}: SkeletonTableProps) {
  return (
    <div className="space-y-4">
      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0,1fr))`,
        }}
      >
        {Array.from({ length: columns }).map((_, index) => (
          <Skeleton key={index} className="h-5" />
        ))}
      </div>

      {Array.from({ length: rows }).map((_, row) => (
        <div
          key={row}
          className="grid gap-4"
          style={{
            gridTemplateColumns: `repeat(${columns}, minmax(0,1fr))`,
          }}
        >
          {Array.from({ length: columns }).map((_, col) => (
            <Skeleton key={col} className="h-10" />
          ))}
        </div>
      ))}
    </div>
  );
}
