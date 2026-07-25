import Skeleton from "./Skeleton";

export default function SkeletonCard() {
  return (
    <div className="rounded-xl border p-6 space-y-4">
      <Skeleton className="h-5 w-1/3" />

      <Skeleton className="h-4 w-full" />

      <Skeleton className="h-4 w-5/6" />

      <Skeleton className="h-10 w-24 mt-4" />
    </div>
  );
}
