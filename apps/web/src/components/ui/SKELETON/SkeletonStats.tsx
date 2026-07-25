import Skeleton from "./Skeleton";

interface SkeletonStatsProps {
  cards?: number;
}

export default function SkeletonStats({ cards = 4 }: SkeletonStatsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: cards }).map((_, index) => (
        <div key={index} className="rounded-xl border p-6 space-y-4">
          <Skeleton className="h-4 w-1/2" />

          <Skeleton className="h-10 w-20" />

          <Skeleton className="h-3 w-full" />
        </div>
      ))}
    </div>
  );
}
