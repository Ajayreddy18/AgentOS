import Skeleton from "./Skeleton";

interface SkeletonChatProps {
  messages?: number;
}

export default function SkeletonChat({ messages = 6 }: SkeletonChatProps) {
  return (
    <div className="flex h-full flex-col">
      {/* Chat Header */}
      <div className="border-b p-4">
        <Skeleton className="h-6 w-48" />
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-6 overflow-auto p-6">
        {Array.from({ length: messages }).map((_, index) => {
          const assistant = index % 2 === 0;

          return (
            <div
              key={index}
              className={`flex ${assistant ? "justify-start" : "justify-end"}`}
            >
              <div className="max-w-[70%] space-y-2">
                <Skeleton className="h-4 w-24" />

                <Skeleton className="h-4 w-64" />

                <Skeleton className="h-4 w-52" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="border-t p-4">
        <Skeleton className="h-12 w-full rounded-xl" />
      </div>
    </div>
  );
}
