import { useState } from "react";

import { Button } from "@/components/ui";

interface Props {
  text: string;
}

export function CopyButton({ text }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <Button size="sm" variant="outline" onClick={handleCopy}>
      {copied ? "Copied!" : "Copy"}
    </Button>
  );
}
