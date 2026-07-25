import { CopyButton, MarkdownRenderer } from "@/components/ui";

interface Props {
  role: "system" | "user" | "assistant" | "tool";
  content: string;
}

export function MessageBubble({ role, content }: Props) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`
                    max-w-[75%]
                    rounded-xl
                    px-4
                    py-3
                    whitespace-pre-wrap
                    ${
                      isUser ? "bg-primary text-primary-foreground" : "bg-muted"
                    }
                `}
      >
        {role === "assistant" ? (
          <MarkdownRenderer content={content} />
        ) : (
          content
        )}

        {role === "assistant" && (
          <div className="mt-2 flex justify-end">
            <CopyButton text={content} />
          </div>
        )}
      </div>
    </div>
  );
}
