import { useEffect, useRef, useState } from "react";

export function useAutoScroll(dependency: unknown) {
  const containerRef = useRef<HTMLDivElement>(null);

  const bottomRef = useRef<HTMLDivElement>(null);

  const [autoScroll, setAutoScroll] = useState(true);

  useEffect(() => {
    function handleScroll() {
      const container = containerRef.current;

      if (!container) {
        return;
      }

      const distanceFromBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight;

      setAutoScroll(distanceFromBottom < 100);
    }

    const container = containerRef.current;

    if (!container) {
      return;
    }
    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!autoScroll) {
      return;
    }

    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [dependency, autoScroll]);

  return {
    containerRef,
    bottomRef,
  };
}
