import React from "react";
import ReactDOM from "react-dom/client";

import "@fontsource-variable/geist/index.css";

import "./index.css";
import "@/api/interceptors";

import App from "./App";

import { ThemeProvider } from "./app/theme/theme-provider";
import { QueryProvider } from "./app/query/query-provider";
import { AuthInitializer } from "./app/auth/AuthInitializer";
import { AppErrorBoundary } from "@/components/error/AppErrorBoundary";

import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppErrorBoundary>
      <QueryProvider>
        <ThemeProvider>
          <AuthInitializer>
            <App />
          </AuthInitializer>

          <Toaster position="top-right" richColors />
        </ThemeProvider>
      </QueryProvider>
    </AppErrorBoundary>
  </React.StrictMode>,
);
