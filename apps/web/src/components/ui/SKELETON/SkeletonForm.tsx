import Skeleton from "./Skeleton";

interface SkeletonFormProps {
  fields?: number;
}

export default function SkeletonForm({ fields = 5 }: SkeletonFormProps) {
  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="space-y-3">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-4 w-80" />
      </div>

      {/* Form */}
      <div className="rounded-xl border p-6 space-y-6">
        {Array.from({ length: fields }).map((_, index) => (
          <div key={index} className="space-y-2">
            <Skeleton className="h-4 w-28" />

            <Skeleton className="h-11 w-full rounded-lg" />
          </div>
        ))}

        <div className="flex justify-end gap-3 pt-4">
          <Skeleton className="h-10 w-24 rounded-lg" />

          <Skeleton className="h-10 w-28 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
