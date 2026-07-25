import ReactMarkdown from "react-markdown";

import remarkGfm from "remark-gfm";

import { CodeBlock } from "./CodeBlock";

interface Props {
  content: string;
}

export function MarkdownRenderer({ content }: Props) {
  return (
    <div
      className="
                prose
                prose-sm
                dark:prose-invert
                max-w-none
            "
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}

        components={{
          code({
            className,

            children,

            ...props
          }) {
            const match = /language-(\w+)/.exec(className || "");

            if (match) {
              return (
                <CodeBlock
                  language={match[1]}

                  code={String(children).replace(/\n$/, "")}
                />
              );
            }

            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
