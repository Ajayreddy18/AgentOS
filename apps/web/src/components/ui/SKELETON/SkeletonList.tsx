import Skeleton from "./Skeleton";

interface SkeletonListProps {
  items?: number;
}

export default function SkeletonList({ items = 6 }: SkeletonListProps) {
  return (
    <div className="space-y-4">
      {Array.from({ length: items }).map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-4 rounded-lg border p-4"
        >
          <Skeleton className="h-12 w-12 rounded-full" />

          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/3" />

            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
