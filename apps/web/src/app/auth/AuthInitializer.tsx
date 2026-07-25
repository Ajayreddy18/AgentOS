import type { ReactNode } from "react";

import { useInitializeAuth } from "@/app/hooks/useInitializeAuth";

type Props = {
  children: ReactNode;
};

export function AuthInitializer({ children }: Props) {
  useInitializeAuth();

  return <>{children}</>;
}
