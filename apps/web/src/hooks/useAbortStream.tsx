import { useRef } from "react";

export function useAbortStream() {
  const controllerRef = useRef<AbortController | null>(null);

  function createController() {
    controllerRef.current = new AbortController();

    return controllerRef.current;
  }

  function abort() {
    controllerRef.current?.abort();

    controllerRef.current = null;
  }

  return {
    createController,

    abort,
  };
}
