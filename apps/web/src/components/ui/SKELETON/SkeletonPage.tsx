import Skeleton from "./Skeleton";

interface SkeletonPageProps {
  rows?: number;
}

export default function SkeletonPage({ rows = 5 }: SkeletonPageProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <Skeleton className="h-8 w-56" />

        <Skeleton className="h-4 w-80" />
      </div>

      <div className="space-y-4">
        {Array.from({ length: rows }).map((_, index) => (
          <Skeleton key={index} className="h-16 w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
}
