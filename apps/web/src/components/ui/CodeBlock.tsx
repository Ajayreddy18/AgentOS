import { useState } from "react";

import { Check, Copy } from "lucide-react";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Props {
  language: string;
  code: string;
}

export function CodeBlock({ language, code }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <div className="overflow-hidden rounded-lg border">
      <div
        className="
                    flex
                    items-center
                    justify-between
                    border-b
                    bg-muted
                    px-3
                    py-2
                "
      >
        <span
          className="
                        text-xs
                        font-medium
                        uppercase
                    "
        >
          {language || "text"}
        </span>

        <button
          onClick={handleCopy}
          className="
                        flex
                        items-center
                        gap-1
                        text-xs
                    "
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy
            </>
          )}
        </button>
      </div>

      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          borderRadius: 0,
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
